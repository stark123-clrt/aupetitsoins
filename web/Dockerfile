FROM node:22-slim AS base
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV DATABASE_URL="file:./data/aupetitsoin.db"
ENV SESSION_SECRET="build-time-placeholder"
RUN npx prisma generate
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Absolute path: SQLite/Prisma resolves a relative "file:" URL relative to
# prisma/schema.prisma, not the working directory, which would silently put
# the database outside of the /app/data volume mount. Coolify env vars still
# override this if needed.
ENV DATABASE_URL="file:/app/data/aupetitsoin.db"

RUN groupadd -r nodejs && useradd -r -g nodejs nextjs

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY docker/entrypoint.sh /usr/local/bin/docker-entrypoint

RUN mkdir -p /app/data /app/public/uploads/media \
    && chown -R nextjs:nodejs /app/data /app/public/uploads /app/.next \
    && chmod +x /usr/local/bin/docker-entrypoint

USER nextjs
EXPOSE 3000

ENTRYPOINT ["docker-entrypoint"]
CMD ["npm", "run", "start"]
