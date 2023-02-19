import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { firstValueFrom } from 'rxjs';
import { TodoList } from '../../models/todo-list.model';
import { TodoItem } from '../../models/todo-item.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  input: FormControl;
  list: TodoList;
  listId: string;

  constructor(private route: ActivatedRoute, private todoService: TodoService) {}

  ngOnInit(): void {
    this.input = new FormControl<any>('');

    this.route.params.subscribe({
      next: params => {
        if (params['id']) {
          this.listId = params['id'];
          this.getListById(params['id']);
        }
      },
    });
  }

  async getListById(id: string) {
    this.list = await firstValueFrom(this.todoService.getList(id));
  }

  addTodo() {
    if (!this.input.value) {
      return;
    }

    this.todoService.addItemToList(this.listId, TodoItem.map({ title: this.input.value, checked: false })).subscribe({
      next: () => {
        this.input.reset();
        this.getListById(this.listId);
      },
    });
  }

  updateItem(item: TodoItem) {
    this.todoService.updateItem(item.id, TodoItem.map({ checked: item.checked })).subscribe({
      next: () => {
        this.getListById(this.listId);
      },
    });
  }

  deleteTodo(id: string) {
    this.todoService.removeItemFromList(this.listId, id).subscribe({
      next: () => {
        this.getListById(this.listId);
      },
    });
  }

  identify(index: number, item: TodoItem) {
    return item.id;
  }
}
