<?php

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api/me', name: 'api_me', methods: ['GET'])]
class MeController
{
    public function __invoke(#[CurrentUser] User $user): JsonResponse
    {
        return new JsonResponse([
            'id' => (string) $user->getId(),
            'email' => $user->getEmail(),
            'fullName' => $user->getFullName(),
            'role' => $user->getRole()->value,
            'createdAt' => $user->getCreatedAt()->format(DATE_ATOM),
        ]);
    }
}
