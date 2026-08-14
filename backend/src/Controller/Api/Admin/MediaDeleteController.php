<?php

namespace App\Controller\Api\Admin;

use App\Http\ProblemJsonResponse;
use App\Repository\MediaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/admin/media/{id}', name: 'api_admin_media_delete', methods: ['DELETE'])]
class MediaDeleteController
{
    public function __construct(
        private readonly MediaRepository $mediaRepository,
        private readonly EntityManagerInterface $entityManager,
        private readonly KernelInterface $kernel,
    ) {
    }

    public function __invoke(string $id): Response
    {
        $media = $this->mediaRepository->find($id);

        if (null === $media) {
            return new ProblemJsonResponse(404, 'Media not found');
        }

        $path = $this->kernel->getProjectDir() . '/public' . $media->getUrl();
        if (is_file($path)) {
            @unlink($path);
        }

        $this->entityManager->remove($media);
        $this->entityManager->flush();

        return new Response(null, 204);
    }
}
