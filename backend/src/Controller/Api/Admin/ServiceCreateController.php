<?php

namespace App\Controller\Api\Admin;

use App\Entity\Enum\ServiceCategory;
use App\Entity\Service;
use App\Http\Presenter\ServicePresenter;
use App\Http\ProblemJsonResponse;
use App\Repository\ServiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/admin/services', name: 'api_admin_services_create', methods: ['POST'])]
class ServiceCreateController
{
    public function __construct(
        private readonly ServiceRepository $serviceRepository,
        private readonly EntityManagerInterface $entityManager,
    ) {
    }

    public function __invoke(Request $request): Response
    {
        $payload = json_decode($request->getContent(), true) ?? [];

        $title = trim((string) ($payload['title'] ?? ''));
        $description = trim((string) ($payload['description'] ?? ''));
        $priceHtCents = $payload['priceHtCents'] ?? null;
        $vatRate = $payload['vatRate'] ?? null;
        $durationMinutes = $payload['durationMinutes'] ?? null;
        $categoryValue = $payload['category'] ?? null;

        $violations = [];
        if ('' === $title || mb_strlen($title) > 120) {
            $violations[] = ['field' => 'title', 'message' => 'Must be between 1 and 120 characters.'];
        }
        if ('' === $description) {
            $violations[] = ['field' => 'description', 'message' => 'Must not be empty.'];
        }
        if (!is_int($priceHtCents) || $priceHtCents < 0) {
            $violations[] = ['field' => 'priceHtCents', 'message' => 'Must be a non-negative integer (cents).'];
        }
        if (!is_numeric($vatRate)) {
            $violations[] = ['field' => 'vatRate', 'message' => 'Must be numeric.'];
        }
        if (!is_int($durationMinutes) || $durationMinutes < 1) {
            $violations[] = ['field' => 'durationMinutes', 'message' => 'Must be a positive integer.'];
        }
        $category = null;
        if (!is_string($categoryValue) || null === ($category = ServiceCategory::tryFrom($categoryValue))) {
            $violations[] = ['field' => 'category', 'message' => 'Must be one of: ' . implode(', ', array_column(ServiceCategory::cases(), 'value'))];
        }

        if ([] !== $violations) {
            return new ProblemJsonResponse(422, 'Validation failed', null, $violations);
        }

        $slug = $this->uniqueSlug($title);

        $service = new Service($title, $slug, $description, (int) $priceHtCents, (string) $vatRate, (int) $durationMinutes, $category);
        $service->setActive((bool) ($payload['active'] ?? true));

        $this->entityManager->persist($service);
        $this->entityManager->flush();

        return new JsonResponse(ServicePresenter::toDetailArray($service), 201);
    }

    private function uniqueSlug(string $title): string
    {
        $base = strtolower((string) preg_replace('/[^a-z0-9]+/i', '-', $title));
        $base = trim($base, '-') ?: 'service';

        $slug = $base;
        $suffix = 2;
        while (null !== $this->serviceRepository->findOneBy(['slug' => $slug])) {
            $slug = $base . '-' . $suffix++;
        }

        return $slug;
    }
}
