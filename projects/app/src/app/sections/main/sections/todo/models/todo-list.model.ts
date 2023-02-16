import { Helper, Standard } from '@lenne.tech/ng-base/shared';
import { TodoItem } from './todo-item.model';

export class TodoList extends Standard {
  id: string = undefined;
  createdAt: Date = undefined;
  title: string = undefined;
  description: boolean = undefined;
  items: TodoItem[] = [];

  public override map(data: Partial<this> | { [key: string]: any }): this {
    Helper.map(data, this);
    if (this.items) {
      this.items = Helper.maps(data.items, TodoItem);
    }
    return this;
  }
}
