<?php

namespace App\Command;

use App\Entity\Enum\ServiceCategory;
use App\Entity\Service;
use App\Repository\ServiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(name: 'app:seed-services', description: 'Seed the initial service catalog')]
class SeedServicesCommand extends Command
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly ServiceRepository $serviceRepository,
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $catalog = [
            ['Ménage classique 2h', 'menage-classique-2h', "Entretien courant de votre logement : dépoussiérage, sols, sanitaires et cuisine. Idéal pour un maintien régulier de la propreté.", 5900, '10.00', 120, ServiceCategory::MENAGE, true],
            ['Grand ménage 4h', 'grand-menage-4h', "Nettoyage en profondeur : vitres, plinthes, électroménager, recoins. Parfait pour un printemps ou une remise en état.", 11600, '10.00', 240, ServiceCategory::MENAGE, true],
            ['Repassage à domicile 2h', 'repassage-domicile-2h', "Repassage soigné de votre linge à votre domicile, pliage et rangement inclus.", 5400, '10.00', 120, ServiceCategory::MENAGE, true],
            ["Garde d'enfant (+3 ans) après l'école", 'garde-enfant-apres-ecole', "Sortie d'école, goûter, aide aux devoirs et activités jusqu'au retour des parents. Enfants de plus de 3 ans.", 4600, '5.50', 180, ServiceCategory::GARDE_ENFANT, true],
            ["Garde d'enfant soirée", 'garde-enfant-soiree', "Baby-sitting en soirée : repas, bain, coucher. Un intervenant de confiance pour vos sorties.", 4200, '5.50', 180, ServiceCategory::GARDE_ENFANT, true],
            ["Garde d'enfant journée complète", 'garde-enfant-journee', "Prise en charge sur une journée complète pendant les vacances scolaires, activités incluses.", 9800, '5.50', 480, ServiceCategory::GARDE_ENFANT, false],
            ['Aide administrative 1h', 'aide-administrative-1h', "Tri du courrier, classement, aide aux démarches en ligne et rédaction de courriers.", 3500, '20.00', 60, ServiceCategory::AIDE_ADMIN, true],
            ['Accompagnement démarches CAF / impôts', 'accompagnement-demarches', "Accompagnement personnalisé pour vos déclarations et dossiers administratifs complexes.", 6000, '20.00', 90, ServiceCategory::AIDE_ADMIN, true],
        ];

        $created = 0;
        $skipped = 0;

        foreach ($catalog as [$title, $slug, $description, $priceHtCents, $vatRate, $durationMinutes, $category, $active]) {
            if (null !== $this->serviceRepository->findOneBy(['slug' => $slug])) {
                ++$skipped;
                continue;
            }

            $service = new Service($title, $slug, $description, $priceHtCents, $vatRate, $durationMinutes, $category);
            $service->setActive($active);
            $this->entityManager->persist($service);
            ++$created;
        }

        $this->entityManager->flush();

        $io->success(sprintf('%d service(s) created, %d already existing (skipped).', $created, $skipped));

        return Command::SUCCESS;
    }
}
