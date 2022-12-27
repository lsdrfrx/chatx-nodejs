import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';

const DB_URI = process.env.DB_URI
  ? process.env.DB_URI
  : 'mongodb://admin:admin@localhost:27017';

@Module({
  imports: [MongooseModule.forRoot(DB_URI), AuthModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
