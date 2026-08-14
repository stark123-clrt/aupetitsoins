<?php

namespace App\Repository;

use App\Entity\Service;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Service>
 */
class ServiceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Service::class);
    }

    /**
     * @return array{0: Service[], 1: int}
     */
    public function findActivePaginated(int $page, int $pageSize): array
    {
        $qb = $this->createQueryBuilder('s')
            ->andWhere('s.active = true')
            ->orderBy('s.title', 'ASC')
            ->setFirstResult(($page - 1) * $pageSize)
            ->setMaxResults($pageSize);

        $paginator = new Paginator($qb);

        return [iterator_to_array($paginator), count($paginator)];
    }

    public function findActiveBySlug(string $slug): ?Service
    {
        return $this->findOneBy(['slug' => $slug, 'active' => true]);
    }

    public function findActiveById(string $id): ?Service
    {
        return $this->findOneBy(['id' => $id, 'active' => true]);
    }
}
