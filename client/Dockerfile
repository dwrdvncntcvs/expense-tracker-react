FROM node:lts-slim

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 8080

RUN pnpm build

CMD ["pnpm", "preview"]