# Stage 1 (named "builder"): Production React Build
FROM node:14-alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY ts*.json ./
COPY src src
COPY deployment deployment
COPY .env .env
RUN npm run build

FROM node:14-alpine
ENV NODE_ENV=production
RUN apk add --no-cache tini
WORKDIR /usr/src/app
RUN chown node:node .
USER node
COPY package*.json ./
COPY openapi.yml ./
RUN npm install
COPY --from=builder /usr/src/app/dist/ dist/
EXPOSE ${PORT}
ENTRYPOINT [ "/sbin/tini","--", "node", "dist/app.js" ]
