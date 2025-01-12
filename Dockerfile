FROM node:22.12.0-alpine AS builder

WORKDIR /var/www

ARG BASE_API_URL="${BASE_API_URL}"
ARG BASE_YANDEX_API_URL="${BASE_YANDEX_API_URL}"
ARG YANDEX_REDIRECT_URI="${YANDEX_REDIRECT_URI}"
ARG YANDEX_CLIENT_ID="${YANDEX_CLIENT_ID}"
ARG YANDEX_CLIENT_SECRET="${YANDEX_CLIENT_SECRET}"

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:22.12.0-alpine

WORKDIR /var/www

COPY --from=builder /var/www/node_modules ./node_modules
COPY --from=builder /var/www/dist ./dist

COPY package.json yarn.lock ./

ENV BASE_API_URL="${BASE_API_URL}"
ENV BASE_YANDEX_API_URL="${BASE_YANDEX_API_URL}"
ENV YANDEX_REDIRECT_URI="${YANDEX_REDIRECT_URI}"
ENV YANDEX_CLIENT_ID="${YANDEX_CLIENT_ID}"
ENV YANDEX_CLIENT_SECRET="${YANDEX_CLIENT_SECRET}"

EXPOSE 4173

CMD ["yarn", "preview"]
