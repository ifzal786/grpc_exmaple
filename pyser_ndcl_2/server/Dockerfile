# syntax=docker/dockerfile:1

FROM python:3.10-bullseye

WORKDIR /server
RUN pip3 --version
COPY . .
RUN pip3 install -r requirements.txt
CMD [ "python3", "server.py"]
