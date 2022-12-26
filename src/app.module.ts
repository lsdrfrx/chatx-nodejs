import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';

const DB_URI = process.env.DB_URI
  ? process.env.DB_URI
  : 'mongodb://admin:admin@localhost:27017';

@Module({
  imports: [MongooseModule.forRoot(DB_URI), AuthModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
