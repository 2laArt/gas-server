import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'keyword',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: true,
    exposedHeaders: ['Content-Type'],
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  });
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('GAS')
    .setDescription('api documentation')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 4200);
}
bootstrap();

// process.env.IP
