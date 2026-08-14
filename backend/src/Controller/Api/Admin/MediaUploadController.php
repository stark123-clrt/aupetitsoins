<?php

namespace App\Controller\Api\Admin;

use App\Entity\Enum\MediaType;
use App\Entity\Media;
use App\Http\Presenter\MediaPresenter;
use App\Http\ProblemJsonResponse;
use App\Repository\ServiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\String\Slugger\AsciiSlugger;

#[Route('/api/admin/services/{id}/media', name: 'api_admin_media_upload', methods: ['POST'])]
class MediaUploadController
{
    private const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
    private const VIDEO_MIME_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
    private const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
    private const MAX_VIDEO_BYTES = 200 * 1024 * 1024;

    public function __construct(
        private readonly ServiceRepository $serviceRepository,
        private readonly EntityManagerInterface $entityManager,
        private readonly KernelInterface $kernel,
    ) {
    }

    public function __invoke(string $id, Request $request): Response
    {
        $service = $this->serviceRepository->find($id);

        if (null === $service) {
            return new ProblemJsonResponse(404, 'Service not found');
        }

        $file = $request->files->get('file');

        if (null === $file || !$file->isValid()) {
            return new ProblemJsonResponse(422, 'Validation failed', null, [
                ['field' => 'file', 'message' => 'A valid file upload is required.'],
            ]);
        }

        $mimeType = $file->getMimeType();
        $type = match (true) {
            in_array($mimeType, self::IMAGE_MIME_TYPES, true) => MediaType::PHOTO,
            in_array($mimeType, self::VIDEO_MIME_TYPES, true) => MediaType::VIDEO,
            default => null,
        };

        if (null === $type) {
            return new ProblemJsonResponse(422, 'Validation failed', null, [
                ['field' => 'file', 'message' => 'Unsupported file type. Allowed: JPEG/PNG/WebP images or MP4/WebM/MOV videos.'],
            ]);
        }

        $maxBytes = MediaType::PHOTO === $type ? self::MAX_IMAGE_BYTES : self::MAX_VIDEO_BYTES;
        if ($file->getSize() > $maxBytes) {
            return new ProblemJsonResponse(422, 'Validation failed', null, [
                ['field' => 'file', 'message' => sprintf('File exceeds the %dMB limit.', (int) ($maxBytes / 1024 / 1024))],
            ]);
        }

        $slugger = new AsciiSlugger();
        $filename = $slugger->slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME))->lower();
        $newFilename = sprintf('%s-%s.%s', $filename, bin2hex(random_bytes(6)), $file->guessExtension());

        $uploadDir = $this->kernel->getProjectDir() . '/public/uploads/media';
        $file->move($uploadDir, $newFilename);

        $position = count($service->getMedia());
        $media = new Media($service, $type, '/uploads/media/' . $newFilename, $position);

        $this->entityManager->persist($media);
        $this->entityManager->flush();

        return new JsonResponse(MediaPresenter::toArray($media), 201);
    }
}
