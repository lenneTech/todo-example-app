import { Field, ObjectType } from '@nestjs/graphql';
import { TodoList } from '../todo-list.model';

@ObjectType({ description: 'Result of find and count TodoLists' })
export class FindAndCountTodoListsResult {
  @Field(() => [TodoList], { description: 'Found TodoLists' })
  items: TodoList[];

  @Field({ description: 'Total count (skip/offset and limit/take are ignored in the count)' })
  totalCount: number;
}
