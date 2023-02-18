import { mapClasses, Restricted, RoleEnum } from '@lenne.tech/nest-server';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema as MongooseSchema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { PersistenceModel } from '../../common/models/persistence.model';
import { TodoItem } from '../todo-item/todo-item.model';
import { User } from '../user/user.model';

export type TodoListDocument = TodoList & Document;

/**
 * TodoList model
 */
@Restricted(RoleEnum.ADMIN)
@ObjectType({ description: 'TodoList' })
@MongooseSchema({ timestamps: true })
export class TodoList extends PersistenceModel {
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
  @Prop()
  title: string = undefined;

  /**
   * Description of TodoList
   */
  @Restricted(RoleEnum.S_EVERYONE)
  @Field(() => String, {
    description: 'Description of TodoList',
    nullable: true,
  })
  @Prop()
  description: string = undefined;

  /**
   * Items of TodoList
   */
  @Restricted(RoleEnum.S_EVERYONE)
  @Field(() => [TodoItem], {
    description: 'Items of TodoList',
    nullable: true,
  })
  @Prop([{ type: Schema.Types.ObjectId, ref: 'TodoItem' }])
  items: TodoItem[] = undefined;

  // ===================================================================================================================
  // Methods
  // ===================================================================================================================

  /**
   * Initialize instance with default values instead of undefined
   */
  override init() {
    super.init();
    // this.xxx = [];
    return this;
  }

  /**
   * Map input
   *
   * Hint: Non-primitive variables should always be mapped (see mapClasses / mapClassesAsync in ModelHelper)
   */
  override map(input) {
    super.map(input);
    return mapClasses(input, { items: TodoItem }, this);
  }

  /**
   * Verification of the user's rights to access the properties of this object
   */
  override securityCheck(user: User, force?: boolean) {
    if (force || user?.hasRole(RoleEnum.ADMIN)) {
      return this;
    }
    // Check rights for properties of this object
    return this;
  }
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
