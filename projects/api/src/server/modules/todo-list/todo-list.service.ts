import { ConfigService, CrudService, getStringIds, ServiceOptions } from '@lenne.tech/nest-server';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Model } from 'mongoose';
import { TodoItemCreateInput } from '../todo-item/inputs/todo-item-create.input';
import { TodoItem } from '../todo-item/todo-item.model';
import { TodoItemService } from '../todo-item/todo-item.service';
import { TodoListCreateInput } from './inputs/todo-list-create.input';
import { TodoListInput } from './inputs/todo-list.input';
import { TodoList, TodoListDocument } from './todo-list.model';

/**
 * TodoList service
 */
@Injectable()
export class TodoListService extends CrudService<TodoList, TodoListCreateInput, TodoListInput> {
  // ===================================================================================================================
  // Properties
  // ===================================================================================================================

  // ===================================================================================================================
  // Injections
  // ===================================================================================================================

  /**
   * Constructor for injecting services
   *
   * Hints:
   * To resolve circular dependencies, integrate services as follows:
   * @Inject(forwardRef(() => XxxService)) protected readonly xxxService: XxxService
   */
  constructor(
    protected override readonly configService: ConfigService,
    @InjectModel('TodoList') protected readonly todoListModel: Model<TodoListDocument>,
    @Inject('PUB_SUB') protected readonly pubSub: PubSub,
    @Inject(forwardRef(() => TodoItemService)) protected readonly todoItemService: TodoItemService
  ) {
    super({ configService: configService, mainDbModel: todoListModel, mainModelConstructor: TodoList });
  }

  // ===================================================================================================================
  // Methods
  // ===================================================================================================================

  /**
   * Add item to List
   */
  async addItem(id: string, input: TodoItemCreateInput, serviceOptions?: ServiceOptions): Promise<TodoItem> {
    // Get and check TodoList
    const todoList = await this.get(id, serviceOptions);
    if (!todoList) {
      throw new NotFoundException(`TodoList not found with ID: ${id}`);
    }

    // Create new TodoItem
    // We use "force" here because the roles in the serviceOptions are intended for the TodoList and not for the TodoItem
    // To be able to do without "force", the serviceOptions would have to be adapted accordingly
    const todoItem = await this.todoItemService.createForce(input, serviceOptions);
    if (!todoItem) {
      throw new NotFoundException(`Could not create TodoItem`);
    }

    // Add item to TodoList and save changes
    if (!todoList.items?.length) {
      todoList.items = [];
    }
    todoList.items.push(todoItem);

    // Save updated list
    // We use "raw" here because the roles in the serviceOptions are intended for the TodoItem and not for the TodoList
    // To be able to do without "raw", the serviceOptions would have to be adapted accordingly
    await this.updateRaw(id, { items: getStringIds(todoList.items) }, serviceOptions);

    // Return added TodoItem
    return todoItem;
  }

  /**
   * Remove item from List
   */
  async removeItem(listId: string, itemId: string, serviceOptions?: ServiceOptions): Promise<TodoItem> {
    // Get and check TodoList
    const todoList = await this.get(listId, serviceOptions);
    if (!todoList) {
      throw new NotFoundException(`TodoList not found with ID: ${listId}`);
    }

    // Get item
    const todoItem = todoList.items?.find((item) => getStringIds(item) === itemId);
    if (!todoItem) {
      throw new NotFoundException(`Could not find TodoItem in TodoList`);
    }

    // Delete item
    const deletedTodoItem = await this.todoItemService.delete(itemId, serviceOptions);
    if (!deletedTodoItem) {
      throw new NotFoundException(`Could not find TodoItem`);
    }

    // Remove item from list
    todoList.items = todoList.items.filter((item) => getStringIds(item) !== itemId);

    // Save updated list
    // We use "raw" here because the roles in the serviceOptions are intended for the TodoItem and not for the TodoList
    // To be able to do without "raw", the serviceOptions would have to be adapted accordingly
    await this.updateRaw(listId, { items: getStringIds(todoList.items) }, serviceOptions);

    // Return removed TodoItem
    return deletedTodoItem;
  }
}
