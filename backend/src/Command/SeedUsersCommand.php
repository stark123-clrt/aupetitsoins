<?php

namespace App\Command;

use App\Entity\Enum\UserRole;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(name: 'app:seed-users', description: 'Seed the admin account')]
class SeedUsersCommand extends Command
{
    private const DEMO_PASSWORD = 'demo1234';

    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly UserRepository $userRepository,
        private readonly UserPasswordHasherInterface $passwordHasher,
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $email = 'aissata@aupetitsoin.fr';

        if (null !== $this->userRepository->findOneBy(['email' => $email])) {
            $io->success('Admin account already exists.');

            return Command::SUCCESS;
        }

        $user = new User($email, 'Aïssata Diallo', UserRole::ADMIN);
        $user->setPasswordHash($this->passwordHasher->hashPassword($user, self::DEMO_PASSWORD));
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $io->success(sprintf('Admin account created. Password: %s', self::DEMO_PASSWORD));

        return Command::SUCCESS;
    }
}
