#!/bin/sh
set -e

if [ ! -f config/jwt/private.pem ]; then
	echo "No JWT keypair found, generating one..."
	php bin/console lexik:jwt:generate-keypair --no-interaction
fi

php bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration

php bin/console cache:clear --env=prod --no-warmup
php bin/console cache:warmup --env=prod

exec "$@"
