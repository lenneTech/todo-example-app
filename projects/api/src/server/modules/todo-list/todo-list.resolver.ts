import { FilterArgs, GraphQLUser, RoleEnum, Roles } from '@lenne.tech/nest-server';
import { Inject } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { TodoItemCreateInput } from '../todo-item/inputs/todo-item-create.input';
import { TodoItem } from '../todo-item/todo-item.model';
import { User } from '../user/user.model';
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
  @Roles(RoleEnum.ADMIN)
  @Query(() => FindAndCountTodoListsResult, { description: 'Find TodoLists (via filter)' })
  async findAndCountTodoLists(@Info() info: GraphQLResolveInfo, @Args() args?: FilterArgs) {
    return await this.todoListService.findAndCount(args, {
      fieldSelection: { info, select: 'findAndCountTodoLists.items' },
      inputType: FilterArgs,
    });
  }

  /**
   * Get TodoLists (via filter)
   */
  @Roles(RoleEnum.S_USER)
  @Query(() => [TodoList], { description: 'Find TodoLists (via filter)' })
  async findTodoLists(@Info() info: GraphQLResolveInfo, @GraphQLUser() user: User, @Args() args?: FilterArgs) {
    return await this.todoListService.find(args, {
      currentUser: user,
      fieldSelection: { info, select: 'findTodoLists' },
      inputType: FilterArgs,
    });
  }

  /**
   * Get TodoList via ID
   */
  @Roles(RoleEnum.S_USER)
  @Query(() => TodoList, { description: 'Get TodoList with specified ID' })
  async getTodoList(
    @Info() info: GraphQLResolveInfo,
    @GraphQLUser() user: User,
    @Args('id') id: string
  ): Promise<TodoList> {
    return await this.todoListService.get(id, {
      currentUser: user,
      fieldSelection: { info, select: 'getTodoList' },
    });
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
    @Info() info: GraphQLResolveInfo,
    @GraphQLUser() user: User,
    @Args('listId') id: string,
    @Args('input') input: TodoItemCreateInput
  ): Promise<TodoItem> {
    return await this.todoListService.addItem(id, input, {
      currentUser: user,
      fieldSelection: { info, select: 'addItemToTodoList' },
      inputType: TodoListInput,
      // roles: [RoleEnum.ADMIN, RoleEnum.S_CREATOR],
    });
  }

  /**
   * Create new TodoList
   */
  @Roles(RoleEnum.S_USER)
  @Mutation(() => TodoList, { description: 'Create a new TodoList' })
  async createTodoList(
    @Info() info: GraphQLResolveInfo,
    @GraphQLUser() user: User,
    @Args('input') input: TodoListCreateInput
  ): Promise<TodoList> {
    return await this.todoListService.create(input, {
      currentUser: user,
      fieldSelection: { info, select: 'createTodoList' },
      inputType: TodoListCreateInput,
    });
  }

  /**
   * Delete existing TodoList
   */
  @Roles(RoleEnum.S_USER)
  @Mutation(() => TodoList, { description: 'Delete existing TodoList' })
  async deleteTodoList(
    @Info() info: GraphQLResolveInfo,
    @GraphQLUser() user: User,
    @Args('id') id: string
  ): Promise<TodoList> {
    return await this.todoListService.delete(id, {
      currentUser: user,
      fieldSelection: { info, select: 'deleteTodoList' },
      roles: [RoleEnum.ADMIN, RoleEnum.S_CREATOR],
    });
  }

  /**
   * Remove item from TodoList
   */
  @Roles(RoleEnum.S_USER)
  @Mutation(() => TodoItem, { description: 'Remove item from TodoList' })
  async removeItemFromTodoList(
    @Info() info: GraphQLResolveInfo,
    @GraphQLUser() user: User,
    @Args('listId') listId: string,
    @Args('itemId') itemId: string
  ): Promise<TodoItem> {
    return await this.todoListService.removeItem(listId, itemId, {
      currentUser: user,
      fieldSelection: { info, select: 'removeItemFromTodoList' },
      roles: [RoleEnum.ADMIN, RoleEnum.S_CREATOR],
    });
  }

  /**
   * Update existing TodoList
   */
  @Roles(RoleEnum.S_USER)
  @Mutation(() => TodoList, { description: 'Update existing TodoList' })
  async updateTodoList(
    @Info() info: GraphQLResolveInfo,
    @GraphQLUser() user: User,
    @Args('id') id: string,
    @Args('input') input: TodoListInput
  ): Promise<TodoList> {
    return await this.todoListService.update(id, input, {
      currentUser: user,
      fieldSelection: { info, select: 'updateTodoList' },
      inputType: TodoListInput,
      roles: [RoleEnum.ADMIN, RoleEnum.S_CREATOR],
    });
  }
}
