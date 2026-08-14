<?php

namespace App\Controller\Api\Catalog;

use App\Http\Presenter\ServicePresenter;
use App\Repository\ServiceRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/services', name: 'api_services_list', methods: ['GET'])]
class ServiceListController
{
    public function __construct(private readonly ServiceRepository $serviceRepository)
    {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $page = max(1, $request->query->getInt('page', 1));
        $pageSize = min(50, max(1, $request->query->getInt('pageSize', 20)));

        [$items, $total] = $this->serviceRepository->findActivePaginated($page, $pageSize);

        return new JsonResponse([
            'items' => array_map(ServicePresenter::toArray(...), $items),
            'total' => $total,
            'page' => $page,
            'pageSize' => $pageSize,
        ]);
    }
}
