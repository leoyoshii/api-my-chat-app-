import {NestFactory} from '@nestjs/core'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import {AppModule} from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('My Chat Application - Swagger')
    .setDescription('The')
    .setVersion('1.0')
    .addTag('chat')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000)
}
bootstrap()
