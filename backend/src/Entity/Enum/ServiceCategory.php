<?php

namespace App\Entity\Enum;

enum ServiceCategory: string
{
    case MENAGE = 'MENAGE';
    case GARDE_ENFANT = 'GARDE_ENFANT';
    case AIDE_ADMIN = 'AIDE_ADMIN';
}
