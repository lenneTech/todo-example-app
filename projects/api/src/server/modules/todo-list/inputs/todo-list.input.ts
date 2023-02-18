import { CoreInput, Restricted, RoleEnum } from '@lenne.tech/nest-server';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

/**
 * TodoList input
 */
@Restricted(RoleEnum.ADMIN)
@InputType({ description: 'Input data to update an existing TodoList' })
export class TodoListInput extends CoreInput {
  // ===================================================================================================================
  // Properties
  // ===================================================================================================================

  /**
   * Title of TodoList
   */
  @Restricted(RoleEnum.S_EVERYONE)
  @Field(() => String, {
    description: 'Title of TodoList',
    nullable: true,
  })
  @IsOptional()
  title?: string = undefined;

  /**
   * Description of TodoList
   */
  @Restricted(RoleEnum.S_EVERYONE)
  @Field(() => String, {
    description: 'Description of TodoList',
    nullable: true,
  })
  @IsOptional()
  description?: string = undefined;

  /**
   * ItemsId of TodoList
   */
  @Restricted(RoleEnum.S_EVERYONE)
  @Field(() => [String], {
    description: 'ItemsId of TodoList',
    nullable: true,
  })
  @IsOptional()
  items?: string[] = undefined;
}
