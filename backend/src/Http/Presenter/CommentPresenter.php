<?php

namespace App\Http\Presenter;

use App\Entity\Comment;

final class CommentPresenter
{
    public static function toArray(Comment $comment): array
    {
        return [
            'id' => (string) $comment->getId(),
            'serviceId' => (string) $comment->getService()->getId(),
            'authorName' => $comment->getAuthorName(),
            'content' => $comment->getContent(),
            'approved' => $comment->isApproved(),
            'createdAt' => $comment->getCreatedAt()->format(DATE_ATOM),
        ];
    }
}
