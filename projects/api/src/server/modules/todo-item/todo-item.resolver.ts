import { GraphQLServiceOptions, RoleEnum, Roles, ServiceOptions } from '@lenne.tech/nest-server';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { TodoItemInput } from './inputs/todo-item.input';
import { TodoItem } from './todo-item.model';
import { TodoItemService } from './todo-item.service';

/**
 * Resolver to process with TodoItem data
 */
@Roles(RoleEnum.ADMIN)
@Resolver(() => TodoItem)
export class TodoItemResolver {
  /**
   * Import services
   */
  constructor(
    private readonly todoItemService: TodoItemService,
    @Inject('PUB_SUB') protected readonly pubSub: PubSub
  ) {}

  // ===========================================================================
  // Mutations
  // ===========================================================================

  /**
   * Update existing TodoItem
   */
  @Roles(RoleEnum.S_USER)
  @Mutation(() => TodoItem, { description: 'Update existing TodoItem' })
  async updateTodoItem(
    @GraphQLServiceOptions() serviceOptions: ServiceOptions,
    @Args('id') id: string,
    @Args('input') input: TodoItemInput
  ): Promise<TodoItem> {
    return await this.todoItemService.update(id, input, {
      ...serviceOptions,
      inputType: TodoItemInput,
      roles: [RoleEnum.ADMIN, RoleEnum.S_CREATOR],
    });
  }
}
