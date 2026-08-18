<?php

namespace App\Http\Presenter;

use App\Entity\Media;

final class MediaPresenter
{
    public static function toArray(Media $media): array
    {
        return [
            'id' => (string) $media->getId(),
            'type' => $media->getType()->value,
            'url' => $media->getUrl(),
            'position' => $media->getPosition(),
            'createdAt' => $media->getCreatedAt()->format(DATE_ATOM),
        ];
    }

    public static function toArrayWithService(Media $media): array
    {
        return [
            ...self::toArray($media),
            'serviceTitle' => $media->getService()->getTitle(),
            'serviceSlug' => $media->getService()->getSlug(),
        ];
    }
}
