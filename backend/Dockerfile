FROM openjdk:17-jdk-slim AS DEV_ENV

MAINTAINER Young Gyu Park <ygpark2@gmail.com>

# Home Linux
ENV UID=1000
ENV GID=1000

RUN set -x && \
    addgroup --gid $GID appuser && \
    adduser --uid $UID --ingroup appuser appuser

