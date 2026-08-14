<?php

namespace App\Http;

use Symfony\Component\HttpFoundation\JsonResponse;

class ProblemJsonResponse extends JsonResponse
{
    public function __construct(int $status, string $title, ?string $detail = null, array $violations = [])
    {
        $data = [
            'type' => 'about:blank',
            'title' => $title,
            'status' => $status,
        ];

        if (null !== $detail) {
            $data['detail'] = $detail;
        }

        if ([] !== $violations) {
            $data['violations'] = $violations;
        }

        parent::__construct($data, $status, ['Content-Type' => 'application/problem+json']);
    }
}
