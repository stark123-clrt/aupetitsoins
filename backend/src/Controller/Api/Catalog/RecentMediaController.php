<?php

namespace App\Controller\Api\Catalog;

use App\Http\Presenter\MediaPresenter;
use App\Repository\MediaRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/media/recent', name: 'api_media_recent', methods: ['GET'])]
class RecentMediaController
{
    public function __construct(private readonly MediaRepository $mediaRepository)
    {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $limit = min(20, max(1, $request->query->getInt('limit', 6)));

        return new JsonResponse([
            'items' => array_map(
                MediaPresenter::toArrayWithService(...),
                $this->mediaRepository->findRecent($limit)
            ),
        ]);
    }
}
