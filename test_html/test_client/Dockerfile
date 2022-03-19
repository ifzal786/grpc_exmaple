# syntax=docker/dockerfile:1

FROM python:3.10-bullseye

WORKDIR /client
COPY . .
CMD [ "python3", "-m", "http.server", "8081"]
