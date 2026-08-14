<?php

namespace App\Controller\Api\Catalog;

use App\Http\Presenter\CommentPresenter;
use App\Http\ProblemJsonResponse;
use App\Repository\CommentRepository;
use App\Repository\ServiceRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/services/{slug}/comments', name: 'api_services_comments_list', methods: ['GET'])]
class CommentListController
{
    public function __construct(
        private readonly ServiceRepository $serviceRepository,
        private readonly CommentRepository $commentRepository,
    ) {
    }

    public function __invoke(string $slug): Response
    {
        $service = $this->serviceRepository->findActiveBySlug($slug);

        if (null === $service) {
            return new ProblemJsonResponse(404, 'Service not found', sprintf('No active service found with slug "%s".', $slug));
        }

        $comments = $this->commentRepository->findApprovedByService($service);

        return new JsonResponse([
            'items' => array_map(CommentPresenter::toArray(...), $comments),
        ]);
    }
}
