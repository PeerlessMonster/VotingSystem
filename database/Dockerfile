FROM postgres:18.1-alpine3.22

# `docker-compose.dev.yml` 中指定 context 为 `./database`，相对路径从该目录开始
COPY init.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_PASSWORD=mysecretpassword
ENV POSTGRES_USER=postgres

EXPOSE 5432