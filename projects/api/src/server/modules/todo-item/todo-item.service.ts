import { ConfigService, CrudService } from '@lenne.tech/nest-server';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItem, TodoItemDocument } from './todo-item.model';

/**
 * TodoItem service
 */
@Injectable()
export class TodoItemService extends CrudService<TodoItem> {
  // ===================================================================================================================
  // Injections
  // ===================================================================================================================

  /**
   * Constructor for injecting services
   *
   * Hints:
   * To resolve circular dependencies, integrate services as follows:
   * @Inject(forwardRef(() => XxxService)) protected readonly xxxService: XxxService
   */
  constructor(
    protected override readonly configService: ConfigService,
    @InjectModel('TodoItem') protected readonly todoItemModel: Model<TodoItemDocument>
  ) {
    super({ configService: configService, mainDbModel: todoItemModel, mainModelConstructor: TodoItem });
  }
}
