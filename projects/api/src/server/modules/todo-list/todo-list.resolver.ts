import { FilterArgs, GraphQLServiceOptions, RoleEnum, Roles, ServiceOptions } from '@lenne.tech/nest-server';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { TodoItemCreateInput } from '../todo-item/inputs/todo-item-create.input';
import { TodoItem } from '../todo-item/todo-item.model';
import { TodoListCreateInput } from './inputs/todo-list-create.input';
import { TodoListInput } from './inputs/todo-list.input';
import { FindAndCountTodoListsResult } from './outputs/find-and-count-todo-lists-result.output';
import { TodoList } from './todo-list.model';
import { TodoListService } from './todo-list.service';

/**
 * Resolver to process with TodoList data
 */
@Roles(RoleEnum.ADMIN)
@Resolver(() => TodoList)
export class TodoListResolver {
  /**
   * Import services
   */
  constructor(
    private readonly todoListService: TodoListService,
    @Inject('PUB_SUB') protected readonly pubSub: PubSub
  ) {}

  // ===========================================================================
  // Queries
  // ===========================================================================

  /**
   * Get and total count TodoLists (via filter)
   */
  @Roles(RoleEnum.S_USER)
  @Query(() => FindAndCountTodoListsResult, { description: 'Find TodoLists (via filter)' })
  async findAndCountTodoLists(
    @GraphQLServiceOptions({ gqlPath: 'findAndCountTodoLists.items' }) serviceOptions: ServiceOptions,
    @Args() args?: FilterArgs
  ) {
    return await this.todoListService.findAndCount(args, {
      ...serviceOptions,
      inputType: FilterArgs,
    });
  }

  /**
   * Get TodoLists (via filter)
   */
  @Roles(RoleEnum.S_USER)
  @Query(() => [TodoList], { description: 'Find TodoLists (via filter)' })
  async findTodoLists(@GraphQLServiceOptions() serviceOptions: ServiceOptions, @Args() args?: FilterArgs) {
    return await this.todoListService.find(args, {
      ...serviceOptions,
      inputType: FilterArgs,
    });
  }

  /**
   * Get TodoList via ID
   */
  @Roles(RoleEnum.S_USER)
  @Query(() => TodoList, { description: 'Get TodoList with specified ID' })
  async getTodoList(
    @GraphQLServiceOptions() serviceOptions: ServiceOptions,
    @Args('id') id: string
  ): Promise<TodoList> {
    return await this.todoListService.get(id, serviceOptions);
  }

  // ===========================================================================
  // Mutations
  // ===========================================================================

  /**
   * Add new item to TodoList
   */
  @Roles(RoleEnum.S_USER)
  @Mutation(() => TodoItem, { description: 'Add new item to TodoList' })
  async addItemToTodoList(
    @GraphQLServiceOptions() serviceOptions: ServiceOptions,
    @Args('listId') id: string,
    @Args('input') input: TodoItemCreateInput
  ): Promise<TodoItem> {
    return await this.todoListService.addItem(id, input, {
      ...serviceOptions,
      inputType: TodoItemCreateInput,
      roles: [RoleEnum.ADMIN, RoleEnum.S_CREATOR],
    });
  }

  /**
   * Create new TodoList
   */
  @Roles(RoleEnum.S_USER)
  @Mutation(() => TodoList, { description: 'Create a new TodoList' })
  async createTodoList(
    @GraphQLServiceOptions() serviceOptions: ServiceOptions,
    @Args('input') input: TodoListCreateInput
  ): Promise<TodoList> {
    return await this.todoListService.create(input, {
      ...serviceOptions,
      inputType: TodoListCreateInput,
    });
  }

  /**
   * Delete existing TodoList
   */
  @Roles(RoleEnum.S_USER)
  @Mutation(() => TodoList, { description: 'Delete existing TodoList' })
  async deleteTodoList(
    @GraphQLServiceOptions() serviceOptions: ServiceOptions,
    @Args('id') id: string
  ): Promise<TodoList> {
    return await this.todoListService.delete(id, {
      ...serviceOptions,
      roles: [RoleEnum.ADMIN, RoleEnum.S_CREATOR],
    });
  }

  /**
   * Remove item from TodoList
   */
  @Roles(RoleEnum.S_USER)
  @Mutation(() => TodoItem, { description: 'Remove item from TodoList' })
  async removeItemFromTodoList(
    @GraphQLServiceOptions() serviceOptions: ServiceOptions,
    @Args('listId') listId: string,
    @Args('itemId') itemId: string
  ): Promise<TodoItem> {
    return await this.todoListService.removeItem(listId, itemId, {
      ...serviceOptions,
      roles: [RoleEnum.ADMIN, RoleEnum.S_CREATOR],
    });
  }

  /**
   * Update existing TodoList
   */
  @Roles(RoleEnum.S_USER)
  @Mutation(() => TodoList, { description: 'Update existing TodoList' })
  async updateTodoList(
    @GraphQLServiceOptions() serviceOptions: ServiceOptions,
    @Args('id') id: string,
    @Args('input') input: TodoListInput
  ): Promise<TodoList> {
    return await this.todoListService.update(id, input, {
      ...serviceOptions,
      inputType: TodoListInput,
      roles: [RoleEnum.ADMIN, RoleEnum.S_CREATOR],
    });
  }
}
