import { Restricted, RoleEnum } from '@lenne.tech/nest-server';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { TodoListInput } from './todo-list.input';

/**
 * TodoList create input
 */
@Restricted(RoleEnum.ADMIN)
@InputType({ description: 'Input data to create a new TodoList' })
export class TodoListCreateInput extends TodoListInput {
  // ===================================================================================================================
  // Properties
  // ===================================================================================================================

  /**
   * Title of TodoList
   */
  @Restricted(RoleEnum.S_EVERYONE)
  @Field(() => String, {
    description: 'Title of TodoList',
    nullable: false,
  })
  override title: string = undefined;

  /**
   * Description of TodoList
   */
  @Restricted(RoleEnum.S_EVERYONE)
  @Field(() => String, {
    description: 'Description of TodoList',
    nullable: true,
  })
  @IsOptional()
  override description?: string = undefined;

  /**
   * ItemsId of TodoList
   */
  @Restricted(RoleEnum.S_EVERYONE)
  @Field(() => [String], {
    description: 'ItemsId of TodoList',
    nullable: true,
  })
  @IsOptional()
  override items?: string[] = undefined;
}
