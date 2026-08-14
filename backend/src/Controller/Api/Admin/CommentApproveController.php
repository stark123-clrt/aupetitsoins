<?php

namespace App\Controller\Api\Admin;

use App\Http\Presenter\CommentPresenter;
use App\Http\ProblemJsonResponse;
use App\Repository\CommentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/admin/comments/{id}/approve', name: 'api_admin_comments_approve', methods: ['PATCH'])]
class CommentApproveController
{
    public function __construct(
        private readonly CommentRepository $commentRepository,
        private readonly EntityManagerInterface $entityManager,
    ) {
    }

    public function __invoke(string $id): Response
    {
        $comment = $this->commentRepository->find($id);

        if (null === $comment) {
            return new ProblemJsonResponse(404, 'Comment not found');
        }

        $comment->setApproved(true);
        $this->entityManager->flush();

        return new JsonResponse(CommentPresenter::toArray($comment));
    }
}
