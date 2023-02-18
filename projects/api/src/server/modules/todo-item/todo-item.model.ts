import { mapClasses, Restricted, RoleEnum } from '@lenne.tech/nest-server';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema as MongooseSchema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { PersistenceModel } from '../../common/models/persistence.model';
import { User } from '../user/user.model';

export type TodoItemDocument = TodoItem & Document;

/**
 * TodoItem model
 */
@Restricted(RoleEnum.ADMIN)
@ObjectType({ description: 'TodoItem' })
@MongooseSchema({ timestamps: true })
export class TodoItem extends PersistenceModel {
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
  @Prop()
  title: string = undefined;

  /**
   * Checked of TodoItem
   */
  @Restricted(RoleEnum.S_EVERYONE)
  @Field(() => Boolean, {
    description: 'Checked of TodoItem',
    nullable: true,
  })
  @Prop()
  checked: boolean = undefined;

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
    return this;
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

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
