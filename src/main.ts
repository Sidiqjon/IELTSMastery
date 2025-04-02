import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors({
    origin: '*', 
    methods: '*', 
    allowedHeaders: '*', 
    credentials: true, 
  });
  
  const config = new DocumentBuilder()
  .setTitle('IELTS Mastery')
  .setDescription('The IELTS Mastery API description')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',  
    in: 'header',
  },
  'JWT-Auth')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server running on port ${process.env.PORT ?? 3000}`);
  });
}
bootstrap();
