FROM dunglas/frankenphp:1-php8.3 AS app

RUN install-php-extensions \
        pdo_pgsql \
        intl \
        zip \
        opcache \
        sodium

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

ENV APP_ENV=prod
ENV SERVER_NAME=":80"
ENV JWT_SECRET_KEY=/app/config/jwt/private.pem
ENV JWT_PUBLIC_KEY=/app/config/jwt/public.pem

COPY composer.json composer.lock symfony.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction

COPY . .
COPY docker/Caddyfile /etc/frankenphp/Caddyfile
COPY docker/entrypoint.sh /usr/local/bin/docker-entrypoint
COPY docker/uploads.ini /usr/local/etc/php/conf.d/uploads.ini

RUN composer dump-autoload --classmap-authoritative --no-dev \
    && touch .env \
    && mkdir -p var/cache var/log config/jwt public/uploads/media \
    && chown -R www-data:www-data var config/jwt public \
    && chmod +x /usr/local/bin/docker-entrypoint

EXPOSE 80

ENTRYPOINT ["docker-entrypoint"]
CMD ["frankenphp", "run", "--config", "/etc/frankenphp/Caddyfile"]
