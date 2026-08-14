<?php

namespace App\Controller\Api\Catalog;

use App\Entity\Comment;
use App\Http\Presenter\CommentPresenter;
use App\Http\ProblemJsonResponse;
use App\Repository\ServiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/services/{slug}/comments', name: 'api_services_comments_create', methods: ['POST'])]
class CommentCreateController
{
    public function __construct(
        private readonly ServiceRepository $serviceRepository,
        private readonly EntityManagerInterface $entityManager,
    ) {
    }

    public function __invoke(string $slug, Request $request): Response
    {
        $service = $this->serviceRepository->findActiveBySlug($slug);

        if (null === $service) {
            return new ProblemJsonResponse(404, 'Service not found', sprintf('No active service found with slug "%s".', $slug));
        }

        $payload = json_decode($request->getContent(), true) ?? [];
        $authorName = trim((string) ($payload['authorName'] ?? ''));
        $content = trim((string) ($payload['content'] ?? ''));

        $violations = [];
        if ('' === $authorName || mb_strlen($authorName) > 80) {
            $violations[] = ['field' => 'authorName', 'message' => 'Must be between 1 and 80 characters.'];
        }
        if ('' === $content || mb_strlen($content) > 2000) {
            $violations[] = ['field' => 'content', 'message' => 'Must be between 1 and 2000 characters.'];
        }

        if ([] !== $violations) {
            return new ProblemJsonResponse(422, 'Validation failed', null, $violations);
        }

        $comment = new Comment($service, $authorName, $content);
        $this->entityManager->persist($comment);
        $this->entityManager->flush();

        return new JsonResponse(CommentPresenter::toArray($comment), 201);
    }
}
