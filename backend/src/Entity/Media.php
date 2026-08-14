<?php

namespace App\Entity;

use App\Entity\Enum\MediaType;
use App\Repository\MediaRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: MediaRepository::class)]
class Media
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    private ?Uuid $id = null;

    #[ORM\ManyToOne(targetEntity: Service::class, inversedBy: 'media')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private Service $service;

    #[ORM\Column(length: 10, enumType: MediaType::class)]
    private MediaType $type;

    #[ORM\Column(length: 255)]
    private string $url;

    #[ORM\Column]
    private int $position = 0;

    #[ORM\Column(type: 'datetimetz_immutable')]
    private \DateTimeImmutable $createdAt;

    public function __construct(Service $service, MediaType $type, string $url, int $position = 0)
    {
        $this->service = $service;
        $this->type = $type;
        $this->url = $url;
        $this->position = $position;
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getService(): Service
    {
        return $this->service;
    }

    public function getType(): MediaType
    {
        return $this->type;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function getPosition(): int
    {
        return $this->position;
    }

    public function setPosition(int $position): static
    {
        $this->position = $position;

        return $this;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }
}
