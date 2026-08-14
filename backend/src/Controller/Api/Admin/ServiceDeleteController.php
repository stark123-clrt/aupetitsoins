<?php

namespace App\Controller\Api\Admin;

use App\Http\ProblemJsonResponse;
use App\Repository\ServiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/admin/services/{id}', name: 'api_admin_services_delete', methods: ['DELETE'])]
class ServiceDeleteController
{
    public function __construct(
        private readonly ServiceRepository $serviceRepository,
        private readonly EntityManagerInterface $entityManager,
    ) {
    }

    public function __invoke(string $id): Response
    {
        $service = $this->serviceRepository->find($id);

        if (null === $service) {
            return new ProblemJsonResponse(404, 'Service not found');
        }

        $this->entityManager->remove($service);
        $this->entityManager->flush();

        return new Response(null, 204);
    }
}
