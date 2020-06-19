FROM node:12-slim

RUN mkdir /srv/fx-sales-invoice-calculator && chown node:node /srv/fx-sales-invoice-calculator

USER node

WORKDIR /srv/fx-sales-invoice-calculator

COPY --chown=node:node package.json package-lock.json ./

RUN npm install --quiet

COPY . .
