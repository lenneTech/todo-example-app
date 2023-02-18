import { Field, ObjectType } from '@nestjs/graphql';
import { TodoItem } from '../todo-item.model';

@ObjectType({ description: 'Result of find and count TodoItems' })
export class FindAndCountTodoItemsResult {
  @Field(() => [TodoItem], { description: 'Found TodoItems' })
  items: TodoItem[];

  @Field({ description: 'Total count (skip/offset and limit/take are ignored in the count)' })
  totalCount: number;
}
