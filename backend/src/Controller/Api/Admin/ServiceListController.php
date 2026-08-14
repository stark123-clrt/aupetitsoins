<?php

namespace App\Controller\Api\Admin;

use App\Http\Presenter\ServicePresenter;
use App\Repository\ServiceRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/admin/services', name: 'api_admin_services_list', methods: ['GET'])]
class ServiceListController
{
    public function __construct(private readonly ServiceRepository $serviceRepository)
    {
    }

    public function __invoke(): JsonResponse
    {
        $services = $this->serviceRepository->findBy([], ['title' => 'ASC']);

        return new JsonResponse([
            'items' => array_map(ServicePresenter::toDetailArray(...), $services),
        ]);
    }
}
