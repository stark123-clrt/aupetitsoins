<?php

namespace App\Controller\Api\Admin;

use App\Http\Presenter\CommentPresenter;
use App\Repository\CommentRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/admin/comments', name: 'api_admin_comments_list', methods: ['GET'])]
class CommentListController
{
    public function __construct(private readonly CommentRepository $commentRepository)
    {
    }

    public function __invoke(): JsonResponse
    {
        return new JsonResponse([
            'items' => array_map(CommentPresenter::toArray(...), $this->commentRepository->findAllOrdered()),
        ]);
    }
}
