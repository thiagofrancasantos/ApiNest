import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'], // opcional
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // aqui forçamos o overload certo
    (this.$on as (event: 'beforeExit', callback: () => Promise<void>) => void)(
      'beforeExit',
      async () => {
        await app.close();
      },
    );
  }
}
