import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, ValidationPipe, VersioningType } from '@nestjs/common';
import { AllExceptionsFilter } from './handler/exceptions/AllException.filter';
import { TransformResponse } from './handler/interceptor/TransformResponse.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3000;
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      stopAtFirstError: true,
      transform: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalInterceptors(new TransformResponse());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
  });
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
