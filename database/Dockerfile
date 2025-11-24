FROM postgres:18.1-alpine3.22

COPY init.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_PASSWORD=mysecretpassword
ENV POSTGRES_USER=postgres

EXPOSE 5432