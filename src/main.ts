import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: 'http://localhost:8000/' });
  /**
   * wildcard origin is not recommended, consider using
   * app.enableCors({ origin: 'https://your.origin/' })
   */

  const options = new DocumentBuilder()
    .setTitle('NestJS with MongoDB skeleton')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(app.get(ConfigService).get('port'));
}
bootstrap();
