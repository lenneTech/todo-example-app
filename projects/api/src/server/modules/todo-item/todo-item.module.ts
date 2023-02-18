import { ConfigService } from '@lenne.tech/nest-server';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import { UserModule } from '../user/user.module';
import { TodoItem, TodoItemSchema } from './todo-item.model';
import { TodoItemResolver } from './todo-item.resolver';
import { TodoItemService } from './todo-item.service';

/**
 * TodoItem module
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: TodoItem.name, schema: TodoItemSchema }]), forwardRef(() => UserModule)],
  controllers: [],
  providers: [
    ConfigService,
    TodoItemResolver,
    TodoItemService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: [MongooseModule, TodoItemResolver, TodoItemService],
})
export class TodoItemModule {}
