import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const skills = [
  'Node.js',
  'TypeScript',
  'NestJS',
  'PostgreSQL',
  'PostGIS',
  'Redis',
  'Kafka',
  'RabbitMQ',
  'Docker',
  'Kubernetes',
  'KEDA',
  'HPA',
  'GraphQL',
  'REST API',
  'WebSocket',
  'gRPC',
  'OpenTelemetry',
  'Prometheus',
  'Grafana',
  'Jest',
  'Testcontainers',
  'Git',
  'CI/CD',
  'Python',
  'React',
  'LLM API',
];

async function main(): Promise<void> {
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
      name: 'Сергей Танчук',
      description:
        'Backend-разработчик с 4 годами коммерческой разработки на Node.js и TypeScript. Проектирую и довожу продукты от коммуникации с бизнесом и UML-моделей до деплоя в Kubernetes. Специализируюсь на NestJS, PostgreSQL, распределённых системах, интеграциях и event-driven архитектуре. Telegram: @seytuc.',
      githubUrl: 'https://github.com/yappy05',
      skills: { create: skills.map((name) => ({ name })) },
      experiences: {
        create: [
          {
            company: 'Домклик',
            position: 'Backend-разработчик (Node.js)',
            period: 'Июль 2024 — настоящее время',
            achievements:
              'Внутренняя платформа онлайн-оценки недвижимости. Реализовал геопоиск объектов-аналогов в PostgreSQL/PostGIS с GiST-индексами для 10+ млн объектов; graceful degradation с fallback на последнее валидное состояние; event-driven pipeline на Kafka до 250 тыс. заявок в сутки с идемпотентной обработкой и сохранением порядка событий; integration layer для кадастровых и банковских сервисов с adapter pattern, retry, circuit breaker; partitioning, BRIN и retention для истории оценок; distributed tracing через OpenTelemetry и correlation ID; integration-тесты PostgreSQL и Kafka через Testcontainers.',
          },
          {
            company: 'B2B-платформа корпоративных трансферов',
            position: 'Backend-разработчик (Node.js)',
            period: 'Проектный опыт',
            achievements:
              'Разработал геосервис на Redis Geo для поиска водителей; realtime-чаты заказчика и водителя через WebSocket; платежные интеграции и корпоративные подписки с идемпотентными webhook; горизонтальное масштабирование worker-ов через KEDA/HPA по RabbitMQ; асинхронные уведомления через RabbitMQ с retry, exponential backoff и DLQ.',
          },
        ],
      },
      projects: {
        create: [
          { name: 'Платформа онлайн-оценки недвижимости', url: 'https://github.com/yappy05' },
          { name: 'B2B-платформа корпоративных трансферов', url: 'https://github.com/yappy05' },
        ],
      },
    },
  });
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
