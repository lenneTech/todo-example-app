import { Helper, Standard } from '@lenne.tech/ng-base/shared';

export class TodoItem extends Standard {
  id: string = undefined;
  createdAt: Date = undefined;
  title: string = undefined;
  checked: boolean = undefined;

  public override map(data: Partial<this> | { [key: string]: any }): this {
    Helper.map(data, this);
    return this;
  }
}
