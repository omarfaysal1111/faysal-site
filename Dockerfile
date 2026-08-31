# syntax=docker/dockerfile:1

# ---- build ----
FROM node:22-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Builds the Node target (dist/standalone) instead of the Cloudflare Workers output.
ENV DEPLOY_TARGET=node
ENV NODE_ENV=production
RUN npx vinext build

# ---- runtime ----
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY --from=builder /app/dist/standalone ./

USER node
EXPOSE 3000
CMD ["node", "server.js"]
