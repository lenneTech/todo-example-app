import { Restricted, RoleEnum } from '@lenne.tech/nest-server';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { TodoItemInput } from './todo-item.input';

/**
 * TodoItem create input
 */
@Restricted(RoleEnum.ADMIN)
@InputType({ description: 'Input data to create a new TodoItem' })
export class TodoItemCreateInput extends TodoItemInput {
  // ===================================================================================================================
  // Properties
  // ===================================================================================================================

  /**
   * Title of TodoItem
   */
  @Restricted(RoleEnum.S_EVERYONE)
  @Field(() => String, {
    description: 'Title of TodoItem',
    nullable: false,
  })
  override title: string = undefined;

  /**
   * Checked of TodoItem
   */
  @Restricted(RoleEnum.S_EVERYONE)
  @Field(() => Boolean, {
    description: 'Checked of TodoItem',
    nullable: true,
  })
  @IsOptional()
  override checked?: boolean = undefined;
}
