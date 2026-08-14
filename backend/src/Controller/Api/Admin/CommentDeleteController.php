<?php

namespace App\Controller\Api\Admin;

use App\Http\ProblemJsonResponse;
use App\Repository\CommentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/admin/comments/{id}', name: 'api_admin_comments_delete', methods: ['DELETE'])]
class CommentDeleteController
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

        $this->entityManager->remove($comment);
        $this->entityManager->flush();

        return new Response(null, 204);
    }
}
