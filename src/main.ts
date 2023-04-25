import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter, HttpExceptionFilter } from './core/interceptors/http-exception.filter';
import {  AppConfig } from './utils/AppConfig';
import { getIpAddress } from './utils/getIpAddress';
async function bootstrap() {
  const port = AppConfig.get('port')
  const prefix = AppConfig.get('prefix')
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix(prefix, { exclude: ['/'] })

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  await app.listen(port);
  console.log(`running at: http://${getIpAddress()}:${port}/${prefix}`)
}
console.log('DATABASE_HOST',AppConfig.get('DATABASE_HOST'),process.env.DATABASE_HOST)
bootstrap();
