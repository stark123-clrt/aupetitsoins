<?php

namespace App\Controller\Api\Catalog;

use App\Http\Presenter\ServicePresenter;
use App\Http\ProblemJsonResponse;
use App\Repository\ServiceRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/services/{slug}', name: 'api_services_detail', methods: ['GET'])]
class ServiceDetailController
{
    public function __construct(private readonly ServiceRepository $serviceRepository)
    {
    }

    public function __invoke(string $slug): Response
    {
        $service = $this->serviceRepository->findActiveBySlug($slug);

        if (null === $service) {
            return new ProblemJsonResponse(
                404,
                'Service not found',
                sprintf('No active service found with slug "%s".', $slug)
            );
        }

        return new JsonResponse(ServicePresenter::toDetailArray($service));
    }
}
