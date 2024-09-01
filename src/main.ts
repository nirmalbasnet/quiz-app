import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api/v1');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Quiz App')
    .setDescription('The quiz app possible APIs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Please enter token`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    exposedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(process.env.PORT || parseInt(configService.get('APP_PORT')));
}
bootstrap();
