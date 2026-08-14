<?php

namespace App\Entity;

use App\Entity\Enum\ServiceCategory;
use App\Repository\ServiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: ServiceRepository::class)]
class Service
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    private ?Uuid $id = null;

    #[ORM\Column(length: 120)]
    private string $title;

    #[ORM\Column(length: 140, unique: true)]
    private string $slug;

    #[ORM\Column(type: 'text')]
    private string $description;

    #[ORM\Column]
    private int $priceHtCents;

    #[ORM\Column(type: 'decimal', precision: 4, scale: 2)]
    private string $vatRate;

    #[ORM\Column]
    private int $durationMinutes;

    #[ORM\Column(length: 20, enumType: ServiceCategory::class)]
    private ServiceCategory $category;

    #[ORM\Column]
    private bool $active = true;

    /** @var Collection<int, Media> */
    #[ORM\OneToMany(targetEntity: Media::class, mappedBy: 'service', orphanRemoval: true)]
    private Collection $media;

    /** @var Collection<int, Comment> */
    #[ORM\OneToMany(targetEntity: Comment::class, mappedBy: 'service', orphanRemoval: true)]
    private Collection $comments;

    public function __construct(
        string $title,
        string $slug,
        string $description,
        int $priceHtCents,
        string $vatRate,
        int $durationMinutes,
        ServiceCategory $category,
    ) {
        $this->title = $title;
        $this->slug = $slug;
        $this->description = $description;
        $this->priceHtCents = $priceHtCents;
        $this->vatRate = $vatRate;
        $this->durationMinutes = $durationMinutes;
        $this->category = $category;
        $this->media = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPriceHtCents(): int
    {
        return $this->priceHtCents;
    }

    public function setPriceHtCents(int $priceHtCents): static
    {
        $this->priceHtCents = $priceHtCents;

        return $this;
    }

    public function getVatRate(): string
    {
        return $this->vatRate;
    }

    public function setVatRate(string $vatRate): static
    {
        $this->vatRate = $vatRate;

        return $this;
    }

    public function getDurationMinutes(): int
    {
        return $this->durationMinutes;
    }

    public function setDurationMinutes(int $durationMinutes): static
    {
        $this->durationMinutes = $durationMinutes;

        return $this;
    }

    public function getCategory(): ServiceCategory
    {
        return $this->category;
    }

    public function setCategory(ServiceCategory $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): static
    {
        $this->active = $active;

        return $this;
    }

    /**
     * @return Collection<int, Media>
     */
    public function getMedia(): Collection
    {
        return $this->media;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }
}
