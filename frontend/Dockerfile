#### Stage 1: Build the angular application
FROM node:lts-alpine AS DEV_ENV

MAINTAINER Young Gyu Park <ygpark2@gmail.com>

# Home Linux
ENV UID=1000
ENV GID=1000
ENV WORKDIR /app

WORKDIR ${WORKDIR}

RUN chown -R node:node ${WORKDIR}

USER node

COPY --chown=node:node . ${WORKDIR}

RUN yarn install
