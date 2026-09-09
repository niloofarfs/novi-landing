# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS build

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable \
    && corepack prepare pnpm@8.15.9 --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ARG NEXT_PUBLIC_BOOKING_URL
ARG NEXT_PUBLIC_POSTHOG_KEY=""

ENV NEXT_PUBLIC_BOOKING_URL=${NEXT_PUBLIC_BOOKING_URL}
ENV NEXT_PUBLIC_POSTHOG_KEY=${NEXT_PUBLIC_POSTHOG_KEY}

RUN test -n "${NEXT_PUBLIC_BOOKING_URL}"

RUN pnpm typecheck \
    && pnpm lint:eslint \
    && pnpm build


FROM caddy:2.11-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/out /srv
