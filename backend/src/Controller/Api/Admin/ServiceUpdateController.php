<?php

namespace App\Controller\Api\Admin;

use App\Entity\Enum\ServiceCategory;
use App\Http\Presenter\ServicePresenter;
use App\Http\ProblemJsonResponse;
use App\Repository\ServiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/admin/services/{id}', name: 'api_admin_services_update', methods: ['PATCH'])]
class ServiceUpdateController
{
    public function __construct(
        private readonly ServiceRepository $serviceRepository,
        private readonly EntityManagerInterface $entityManager,
    ) {
    }

    public function __invoke(string $id, Request $request): Response
    {
        $service = $this->serviceRepository->find($id);

        if (null === $service) {
            return new ProblemJsonResponse(404, 'Service not found');
        }

        $payload = json_decode($request->getContent(), true) ?? [];
        $violations = [];

        if (array_key_exists('title', $payload)) {
            $title = trim((string) $payload['title']);
            if ('' === $title || mb_strlen($title) > 120) {
                $violations[] = ['field' => 'title', 'message' => 'Must be between 1 and 120 characters.'];
            } else {
                $service->setTitle($title);
            }
        }

        if (array_key_exists('description', $payload)) {
            $description = trim((string) $payload['description']);
            if ('' === $description) {
                $violations[] = ['field' => 'description', 'message' => 'Must not be empty.'];
            } else {
                $service->setDescription($description);
            }
        }

        if (array_key_exists('priceHtCents', $payload)) {
            if (!is_int($payload['priceHtCents']) || $payload['priceHtCents'] < 0) {
                $violations[] = ['field' => 'priceHtCents', 'message' => 'Must be a non-negative integer (cents).'];
            } else {
                $service->setPriceHtCents($payload['priceHtCents']);
            }
        }

        if (array_key_exists('vatRate', $payload)) {
            if (!is_numeric($payload['vatRate'])) {
                $violations[] = ['field' => 'vatRate', 'message' => 'Must be numeric.'];
            } else {
                $service->setVatRate((string) $payload['vatRate']);
            }
        }

        if (array_key_exists('durationMinutes', $payload)) {
            if (!is_int($payload['durationMinutes']) || $payload['durationMinutes'] < 1) {
                $violations[] = ['field' => 'durationMinutes', 'message' => 'Must be a positive integer.'];
            } else {
                $service->setDurationMinutes($payload['durationMinutes']);
            }
        }

        if (array_key_exists('category', $payload)) {
            $category = is_string($payload['category']) ? ServiceCategory::tryFrom($payload['category']) : null;
            if (null === $category) {
                $violations[] = ['field' => 'category', 'message' => 'Must be one of: ' . implode(', ', array_column(ServiceCategory::cases(), 'value'))];
            } else {
                $service->setCategory($category);
            }
        }

        if (array_key_exists('active', $payload)) {
            $service->setActive((bool) $payload['active']);
        }

        if ([] !== $violations) {
            return new ProblemJsonResponse(422, 'Validation failed', null, $violations);
        }

        $this->entityManager->flush();

        return new JsonResponse(ServicePresenter::toDetailArray($service));
    }
}
