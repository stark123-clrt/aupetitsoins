<?php

namespace App\Http\Presenter;

use App\Entity\Service;

final class ServicePresenter
{
    public static function toArray(Service $service): array
    {
        return [
            'id' => (string) $service->getId(),
            'title' => $service->getTitle(),
            'slug' => $service->getSlug(),
            'description' => $service->getDescription(),
            'priceHtCents' => $service->getPriceHtCents(),
            'vatRate' => (float) $service->getVatRate(),
            'durationMinutes' => $service->getDurationMinutes(),
            'category' => $service->getCategory()->value,
            'active' => $service->isActive(),
        ];
    }

    public static function toDetailArray(Service $service): array
    {
        $media = $service->getMedia()->toArray();
        usort($media, static fn ($a, $b) => $a->getPosition() <=> $b->getPosition() ?: $a->getCreatedAt() <=> $b->getCreatedAt());

        return [
            ...self::toArray($service),
            'media' => array_map(MediaPresenter::toArray(...), $media),
        ];
    }
}
