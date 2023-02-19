import { equalIds, mapClasses, Restricted, RoleEnum } from '@lenne.tech/nest-server';
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
   *
   * Check roles, prepare or remove properties
   * Return undefined if the whole object should not be returned or throw an exception to stop the whole request
   */
  override securityCheck(user: User, force?: boolean) {
    // In force mode or for admins everything is allowed
    if (force || user?.hasRole(RoleEnum.ADMIN)) {
      return this;
    }

    // Usually only the creator has access to the object
    if (!equalIds(user, this.createdBy)) {
      return undefined;
    }

    // Check permissions for properties of this object and return the object afterwards
    return this;
  }
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
