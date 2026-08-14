<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260814193645 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE comment (id UUID NOT NULL, author_name VARCHAR(80) NOT NULL, content TEXT NOT NULL, approved BOOLEAN NOT NULL, created_at TIMESTAMP(0) WITH TIME ZONE NOT NULL, service_id UUID NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX IDX_9474526CED5CA9E6 ON comment (service_id)');
        $this->addSql('CREATE TABLE media (id UUID NOT NULL, type VARCHAR(10) NOT NULL, url VARCHAR(255) NOT NULL, position INT NOT NULL, created_at TIMESTAMP(0) WITH TIME ZONE NOT NULL, service_id UUID NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX IDX_6A2CA10CED5CA9E6 ON media (service_id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE NOT DEFERRABLE');
        $this->addSql('ALTER TABLE media ADD CONSTRAINT FK_6A2CA10CED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE NOT DEFERRABLE');
        $this->addSql('ALTER TABLE address DROP CONSTRAINT fk_d4e6f81a76ed395');
        $this->addSql('ALTER TABLE availability DROP CONSTRAINT fk_3fb7a2bfab9a1716');
        $this->addSql('ALTER TABLE intervenant DROP CONSTRAINT fk_73d0145ca76ed395');
        $this->addSql('ALTER TABLE invoice DROP CONSTRAINT fk_90651744b83297e7');
        $this->addSql('ALTER TABLE refund DROP CONSTRAINT fk_5b2c1458b83297e7');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT fk_42c8495519eb6921');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT fk_42c84955ed5ca9e6');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT fk_42c84955ab9a1716');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT fk_42c84955f5b7af75');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT fk_42c84955f0c13f52');
        $this->addSql('ALTER TABLE reservation_status_history DROP CONSTRAINT fk_3a5e46f7b83297e7');
        $this->addSql('ALTER TABLE slot_hold DROP CONSTRAINT fk_c1e3a79061778466');
        $this->addSql('ALTER TABLE slot_hold DROP CONSTRAINT fk_c1e3a790a76ed395');
        $this->addSql('DROP TABLE address');
        $this->addSql('DROP TABLE availability');
        $this->addSql('DROP TABLE cancellation_policy');
        $this->addSql('DROP TABLE intervenant');
        $this->addSql('DROP TABLE invoice');
        $this->addSql('DROP TABLE processed_webhook_event');
        $this->addSql('DROP TABLE refund');
        $this->addSql('DROP TABLE reservation');
        $this->addSql('DROP TABLE reservation_status_history');
        $this->addSql('DROP TABLE slot_hold');
        $this->addSql('DROP INDEX uniq_8d93d649708dc647');
        $this->addSql('ALTER TABLE "user" DROP phone');
        $this->addSql('ALTER TABLE "user" DROP email_verified_at');
        $this->addSql('ALTER TABLE "user" DROP stripe_customer_id');
        $this->addSql('ALTER TABLE "user" DROP deleted_at');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE address (id UUID NOT NULL, label VARCHAR(50) NOT NULL, street VARCHAR(255) NOT NULL, postal_code VARCHAR(10) NOT NULL, city VARCHAR(100) NOT NULL, instructions TEXT DEFAULT NULL, user_id UUID NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX idx_d4e6f81a76ed395 ON address (user_id)');
        $this->addSql('CREATE TABLE availability (id UUID NOT NULL, starts_at TIMESTAMP(0) WITH TIME ZONE NOT NULL, ends_at TIMESTAMP(0) WITH TIME ZONE NOT NULL, intervenant_id UUID NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE UNIQUE INDEX uniq_intervenant_starts_at ON availability (intervenant_id, starts_at)');
        $this->addSql('CREATE INDEX idx_3fb7a2bfab9a1716 ON availability (intervenant_id)');
        $this->addSql('CREATE TABLE cancellation_policy (id UUID NOT NULL, label VARCHAR(80) NOT NULL, rules JSONB NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE TABLE intervenant (id UUID NOT NULL, display_name VARCHAR(120) NOT NULL, active BOOLEAN NOT NULL, user_id UUID DEFAULT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX idx_73d0145ca76ed395 ON intervenant (user_id)');
        $this->addSql('CREATE TABLE invoice (id UUID NOT NULL, number VARCHAR(30) NOT NULL, amount_ttc_cents INT NOT NULL, pdf_path VARCHAR(255) NOT NULL, issued_at TIMESTAMP(0) WITH TIME ZONE NOT NULL, reservation_id UUID NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE UNIQUE INDEX uniq_9065174496901f54 ON invoice (number)');
        $this->addSql('CREATE INDEX idx_90651744b83297e7 ON invoice (reservation_id)');
        $this->addSql('CREATE TABLE processed_webhook_event (stripe_event_id VARCHAR(60) NOT NULL, type VARCHAR(80) NOT NULL, processed_at TIMESTAMP(0) WITH TIME ZONE NOT NULL, PRIMARY KEY (stripe_event_id))');
        $this->addSql('CREATE TABLE refund (id UUID NOT NULL, stripe_refund_id VARCHAR(50) NOT NULL, amount_cents INT NOT NULL, reason TEXT DEFAULT NULL, created_at TIMESTAMP(0) WITH TIME ZONE NOT NULL, reservation_id UUID NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX idx_5b2c1458b83297e7 ON refund (reservation_id)');
        $this->addSql('CREATE TABLE reservation (id UUID NOT NULL, status VARCHAR(30) NOT NULL, appointment_starts_at TIMESTAMP(0) WITH TIME ZONE NOT NULL, appointment_ends_at TIMESTAMP(0) WITH TIME ZONE NOT NULL, price_ttc_cents INT NOT NULL, vat_rate NUMERIC(4, 2) NOT NULL, stripe_payment_intent_id VARCHAR(50) DEFAULT NULL, stripe_setup_intent_id VARCHAR(50) DEFAULT NULL, stripe_payment_method_id VARCHAR(50) DEFAULT NULL, idempotency_key VARCHAR(64) DEFAULT NULL, created_at TIMESTAMP(0) WITH TIME ZONE NOT NULL, client_id UUID NOT NULL, service_id UUID NOT NULL, intervenant_id UUID NOT NULL, address_id UUID NOT NULL, cancellation_policy_id UUID DEFAULT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX idx_42c84955ed5ca9e6 ON reservation (service_id)');
        $this->addSql('CREATE UNIQUE INDEX uniq_42c849557fd1c147 ON reservation (idempotency_key)');
        $this->addSql('CREATE INDEX idx_42c8495519eb6921 ON reservation (client_id)');
        $this->addSql('CREATE INDEX idx_42c84955ab9a1716 ON reservation (intervenant_id)');
        $this->addSql('CREATE INDEX idx_42c84955f5b7af75 ON reservation (address_id)');
        $this->addSql('CREATE INDEX idx_42c84955f0c13f52 ON reservation (cancellation_policy_id)');
        $this->addSql('CREATE UNIQUE INDEX uniq_intervenant_appointment_starts_at ON reservation (intervenant_id, appointment_starts_at)');
        $this->addSql('CREATE TABLE reservation_status_history (id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL, from_status VARCHAR(30) DEFAULT NULL, to_status VARCHAR(30) NOT NULL, actor VARCHAR(10) NOT NULL, actor_id UUID DEFAULT NULL, reason TEXT DEFAULT NULL, created_at TIMESTAMP(0) WITH TIME ZONE NOT NULL, reservation_id UUID NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX idx_3a5e46f7b83297e7 ON reservation_status_history (reservation_id)');
        $this->addSql('CREATE TABLE slot_hold (id UUID NOT NULL, expires_at TIMESTAMP(0) WITH TIME ZONE NOT NULL, availability_id UUID NOT NULL, user_id UUID NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX idx_c1e3a790a76ed395 ON slot_hold (user_id)');
        $this->addSql('CREATE UNIQUE INDEX uniq_c1e3a79061778466 ON slot_hold (availability_id)');
        $this->addSql('ALTER TABLE address ADD CONSTRAINT fk_d4e6f81a76ed395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE availability ADD CONSTRAINT fk_3fb7a2bfab9a1716 FOREIGN KEY (intervenant_id) REFERENCES intervenant (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE intervenant ADD CONSTRAINT fk_73d0145ca76ed395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE invoice ADD CONSTRAINT fk_90651744b83297e7 FOREIGN KEY (reservation_id) REFERENCES reservation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE refund ADD CONSTRAINT fk_5b2c1458b83297e7 FOREIGN KEY (reservation_id) REFERENCES reservation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT fk_42c8495519eb6921 FOREIGN KEY (client_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT fk_42c84955ed5ca9e6 FOREIGN KEY (service_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT fk_42c84955ab9a1716 FOREIGN KEY (intervenant_id) REFERENCES intervenant (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT fk_42c84955f5b7af75 FOREIGN KEY (address_id) REFERENCES address (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT fk_42c84955f0c13f52 FOREIGN KEY (cancellation_policy_id) REFERENCES cancellation_policy (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation_status_history ADD CONSTRAINT fk_3a5e46f7b83297e7 FOREIGN KEY (reservation_id) REFERENCES reservation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot_hold ADD CONSTRAINT fk_c1e3a79061778466 FOREIGN KEY (availability_id) REFERENCES availability (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot_hold ADD CONSTRAINT fk_c1e3a790a76ed395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526CED5CA9E6');
        $this->addSql('ALTER TABLE media DROP CONSTRAINT FK_6A2CA10CED5CA9E6');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE media');
        $this->addSql('ALTER TABLE "user" ADD phone VARCHAR(20) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD email_verified_at TIMESTAMP(0) WITH TIME ZONE DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD stripe_customer_id VARCHAR(50) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD deleted_at TIMESTAMP(0) WITH TIME ZONE DEFAULT NULL');
        $this->addSql('CREATE UNIQUE INDEX uniq_8d93d649708dc647 ON "user" (stripe_customer_id)');
    }
}
