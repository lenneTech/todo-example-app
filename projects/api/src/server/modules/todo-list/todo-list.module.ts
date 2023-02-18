import { ConfigService } from '@lenne.tech/nest-server';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import { TodoItemModule } from '../todo-item/todo-item.module';
import { TodoItemService } from '../todo-item/todo-item.service';
import { UserModule } from '../user/user.module';
import { TodoList, TodoListSchema } from './todo-list.model';
import { TodoListResolver } from './todo-list.resolver';
import { TodoListService } from './todo-list.service';

/**
 * TodoList module
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: TodoList.name, schema: TodoListSchema }]),
    forwardRef(() => UserModule),
    forwardRef(() => TodoItemModule),
  ],
  controllers: [],
  providers: [
    ConfigService,
    TodoListResolver,
    TodoListService,
    TodoItemService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: [MongooseModule, TodoListResolver, TodoListService],
})
export class TodoListModule {}
