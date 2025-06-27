# 1. Стадия — сборка приложения
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Копируем весь проект
COPY . .

# Собираем Next.js-приложение
RUN yarn build

# 2. Стадия — минимальный рантайм
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Устанавливаем только прод-зависимости
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Копируем собранный проект
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/tailwind.config.ts ./
COPY --from=builder /app/postcss.config.mjs ./

# Открываем порт 3000
EXPOSE 3000

# Запускаем production-сервер
CMD ["yarn", "start"]
