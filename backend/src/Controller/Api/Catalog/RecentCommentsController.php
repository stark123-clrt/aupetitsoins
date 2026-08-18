<?php

namespace App\Controller\Api\Catalog;

use App\Http\Presenter\CommentPresenter;
use App\Repository\CommentRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/comments/recent', name: 'api_comments_recent', methods: ['GET'])]
class RecentCommentsController
{
    public function __construct(private readonly CommentRepository $commentRepository)
    {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $limit = min(20, max(1, $request->query->getInt('limit', 6)));

        return new JsonResponse([
            'items' => array_map(
                CommentPresenter::toArrayWithService(...),
                $this->commentRepository->findRecentApproved($limit)
            ),
        ]);
    }
}
