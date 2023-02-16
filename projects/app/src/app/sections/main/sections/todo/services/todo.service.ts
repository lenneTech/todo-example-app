import { Injectable } from '@angular/core';
import { FindArgs, GraphQLPlusService } from '@lenne.tech/ng-base/shared';
import { TodoListInput } from '../interfaces/todo-list-input.interface';
import { TodoItem } from '../models/todo-item.model';
import { Observable } from 'rxjs';
import { TodoList } from '../models/todo-list.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService extends GraphQLPlusService {
  getAllLists(args?: FindArgs): Observable<TodoList[]> {
    return this.graphQl('findTodoLists', {
      arguments: { ...args },
      fields: ['id', 'createdAt', 'title', 'description'],
      model: TodoList,
    });
  }

  getList(id: string): Observable<TodoList> {
    return this.graphQl('getTodoList', {
      arguments: { id },
      fields: ['id', 'createdAt', 'title', 'description', { items: ['id', 'title', 'checked'] }],
      model: TodoList,
    });
  }

  createList(input: TodoListInput): Observable<TodoList> {
    return this.graphQl('createTodoList', {
      arguments: { input },
      fields: ['id', 'createdAt', 'title', 'description'],
      model: TodoList,
    });
  }

  updateList(input: TodoListInput): Observable<TodoList> {
    return this.graphQl('updateTodoList', {
      arguments: { input },
      fields: ['id', 'createdAt', 'title', 'description'],
      model: TodoList,
    });
  }

  deleteList(id: string): Observable<TodoList> {
    return this.graphQl('deleteTodoList', {
      arguments: { id },
      fields: ['id'],
      model: TodoList,
    });
  }

  addItemToList(listId: string, item: TodoItem): Observable<TodoItem> {
    return this.graphQl('addItemToTodoList', {
      arguments: { listId, item },
      fields: ['id', 'title', 'checked'],
      model: TodoItem,
    });
  }

  removeItemFromList(listId: string, itemId: string): Observable<TodoItem> {
    return this.graphQl('removeItemToTodoList', {
      arguments: { listId, itemId },
      fields: ['id'],
      model: TodoItem,
    });
  }

  updateItem(id: string, input: TodoItem): Observable<TodoItem> {
    return this.graphQl('updateTodoItem', {
      arguments: { id, input },
      fields: ['id', 'title', 'checked'],
      model: TodoItem,
    });
  }
}
