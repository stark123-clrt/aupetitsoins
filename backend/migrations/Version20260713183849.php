<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260713183849 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE address (id UUID NOT NULL, label VARCHAR(50) NOT NULL, street VARCHAR(255) NOT NULL, postal_code VARCHAR(10) NOT NULL, city VARCHAR(100) NOT NULL, instructions TEXT DEFAULT NULL, user_id UUID NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX IDX_D4E6F81A76ED395 ON address (user_id)');
        $this->addSql('CREATE TABLE availability (id UUID NOT NULL, starts_at TIMESTAMP(0) WITH TIME ZONE NOT NULL, ends_at TIMESTAMP(0) WITH TIME ZONE NOT NULL, intervenant_id UUID NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX IDX_3FB7A2BFAB9A1716 ON availability (intervenant_id)');
        $this->addSql('CREATE UNIQUE INDEX uniq_intervenant_starts_at ON availability (intervenant_id, starts_at)');
        $this->addSql('CREATE TABLE intervenant (id UUID NOT NULL, display_name VARCHAR(120) NOT NULL, active BOOLEAN NOT NULL, user_id UUID DEFAULT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX IDX_73D0145CA76ED395 ON intervenant (user_id)');
        $this->addSql('CREATE TABLE service (id UUID NOT NULL, title VARCHAR(120) NOT NULL, slug VARCHAR(140) NOT NULL, description TEXT NOT NULL, price_ht_cents INT NOT NULL, vat_rate NUMERIC(4, 2) NOT NULL, duration_minutes INT NOT NULL, category VARCHAR(20) NOT NULL, active BOOLEAN NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_E19D9AD2989D9B62 ON service (slug)');
        $this->addSql('CREATE TABLE "user" (id UUID NOT NULL, email VARCHAR(180) NOT NULL, password_hash VARCHAR(255) NOT NULL, role VARCHAR(10) NOT NULL, full_name VARCHAR(120) NOT NULL, phone VARCHAR(20) DEFAULT NULL, email_verified_at TIMESTAMP(0) WITH TIME ZONE DEFAULT NULL, stripe_customer_id VARCHAR(50) DEFAULT NULL, created_at TIMESTAMP(0) WITH TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITH TIME ZONE DEFAULT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649708DC647 ON "user" (stripe_customer_id)');
        $this->addSql('ALTER TABLE address ADD CONSTRAINT FK_D4E6F81A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE');
        $this->addSql('ALTER TABLE availability ADD CONSTRAINT FK_3FB7A2BFAB9A1716 FOREIGN KEY (intervenant_id) REFERENCES intervenant (id) NOT DEFERRABLE');
        $this->addSql('ALTER TABLE intervenant ADD CONSTRAINT FK_73D0145CA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT chk_user_role CHECK (role IN (\'CLIENT\', \'ADMIN\'))');
        $this->addSql('ALTER TABLE service ADD CONSTRAINT chk_service_category CHECK (category IN (\'MENAGE\', \'GARDE_ENFANT\', \'AIDE_ADMIN\'))');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT chk_user_role');
        $this->addSql('ALTER TABLE service DROP CONSTRAINT chk_service_category');
        $this->addSql('ALTER TABLE address DROP CONSTRAINT FK_D4E6F81A76ED395');
        $this->addSql('ALTER TABLE availability DROP CONSTRAINT FK_3FB7A2BFAB9A1716');
        $this->addSql('ALTER TABLE intervenant DROP CONSTRAINT FK_73D0145CA76ED395');
        $this->addSql('DROP TABLE address');
        $this->addSql('DROP TABLE availability');
        $this->addSql('DROP TABLE intervenant');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE "user"');
    }
}
