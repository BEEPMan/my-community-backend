import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const frontendUrl = configService.get<string>('FRONTEND_URL');

  // Enable CORS for all origins
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();