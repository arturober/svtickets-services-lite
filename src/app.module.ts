import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { CommonsModule } from './commons/commons.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';
import { ConfigModule } from '@nestjs/config';
import configuration from './app.config';

@Module({
  imports: [
    EventsModule,
    CommonsModule,
    MikroOrmModule.forRoot(mikroOrmConfig),
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
