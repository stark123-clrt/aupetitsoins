<?php

namespace App\Controller\Api\Auth;

use Symfony\Component\Routing\Attribute\Route;

/**
 * This route is never actually executed: the "login" firewall's json_login
 * authenticator intercepts the request first. It only needs to exist so the
 * router does not 404 before the firewall gets a chance to run.
 */
#[Route('/api/auth/login', name: 'api_auth_login', methods: ['POST'])]
class LoginController
{
    public function __invoke(): never
    {
        throw new \LogicException('This route should be intercepted by the "login" firewall.');
    }
}
