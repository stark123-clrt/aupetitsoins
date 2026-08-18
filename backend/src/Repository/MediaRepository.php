<?php

namespace App\Repository;

use App\Entity\Media;
use App\Entity\Service;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Media>
 */
class MediaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Media::class);
    }

    /**
     * @return Media[]
     */
    public function findByServiceOrdered(Service $service): array
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.service = :service')
            ->setParameter('service', $service)
            ->orderBy('m.position', 'ASC')
            ->addOrderBy('m.createdAt', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * @return Media[]
     */
    public function findRecent(int $limit): array
    {
        return $this->createQueryBuilder('m')
            ->innerJoin('m.service', 's')
            ->addSelect('s')
            ->andWhere('s.active = true')
            ->orderBy('m.createdAt', 'DESC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }
}
