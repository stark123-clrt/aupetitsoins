<?php

namespace App\Controller\Api\Auth;

use Symfony\Component\Routing\Attribute\Route;

/**
 * This route is never actually executed: the "refresh" firewall's refresh-jwt
 * authenticator intercepts the request first. It only needs to exist so the
 * router does not 404 before the firewall gets a chance to run.
 */
#[Route('/api/auth/refresh', name: 'api_auth_refresh', methods: ['POST'])]
class RefreshController
{
    public function __invoke(): never
    {
        throw new \LogicException('This route should be intercepted by the "refresh" firewall.');
    }
}
