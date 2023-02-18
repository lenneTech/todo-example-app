import { CoreInput, Restricted, RoleEnum } from '@lenne.tech/nest-server';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

/**
 * TodoItem input
 */
@Restricted(RoleEnum.ADMIN)
@InputType({ description: 'Input data to update an existing TodoItem' })
export class TodoItemInput extends CoreInput {
  // ===================================================================================================================
  // Properties
  // ===================================================================================================================

  /**
   * Title of TodoItem
   */
  @Restricted(RoleEnum.S_EVERYONE)
  @Field(() => String, {
    description: 'Title of TodoItem',
    nullable: true,
  })
  @IsOptional()
  title?: string = undefined;

  /**
   * Checked of TodoItem
   */
  @Restricted(RoleEnum.S_EVERYONE)
  @Field(() => Boolean, {
    description: 'Checked of TodoItem',
    nullable: true,
  })
  @IsOptional()
  checked?: boolean = undefined;
}
