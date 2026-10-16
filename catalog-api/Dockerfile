FROM node:20-alpine AS base
WORKDIR /app
COPY package.json ./
RUN npm install

FROM base AS test
RUN npm test


FROM base AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY server.js ./
EXPOSE 5000


HEALTHCHECK --interval=15s --timeout=3s CMD wget -qO- http://localhost:5000/health || exit 1

USER node
CMD ["node", "server.js"]
