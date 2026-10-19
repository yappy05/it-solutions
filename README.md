# Digital Card API

Backend цифровой визитки на NestJS, TypeScript, GraphQL и Prisma

## Запуск

```bash
cp .env.example .env
npm ci
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run start:dev
```

Apollo Sandbox доступен на `http://localhost:3000/graphql`

## Тесты

`npm test` запускает unit-тесты сервисного слоя. Интеграционные проверки выполняются против SQLite через Prisma

## Архитектура

GraphQL resolver делегирует запрос сервису, сервис работает через PrismaService, а схема и миграции находятся в Prisma. Seed идемпотентно пересоздаёт демонстрационный профиль. Связанные сущности загружаются одним запросом Prisma с include

## Запрос

```graphql
query {
  profile {
    name
    description
    skills {
      name
    }
    experience: experiences {
      company
      position
      period
    }
    projects {
      name
      url
    }
  }
}
```
