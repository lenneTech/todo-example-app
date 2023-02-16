import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Helper } from '@lenne.tech/ng-base/shared';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  list = {
    id: Helper.getUID(),
    title: 'Abc',
    description: 'Lorem ipsum',
    createdAt: new Date(),
  };

  todos = [
    {
      id: Helper.getUID(),
      title: 'abc',
      checked: true,
    },
    {
      id: Helper.getUID(),
      title: 'abc',
      checked: false,
    },
    {
      id: Helper.getUID(),
      title: 'abc',
      checked: true,
    },
    {
      id: Helper.getUID(),
      title: 'abc',
      checked: true,
    },
  ];

  input: FormControl;

  constructor() {}

  ngOnInit(): void {
    this.input = new FormControl<any>('');
  }

  addTodo() {
    if (!this.input.value) {
      return;
    }

    this.todos.push({
      id: Helper.getUID(),
      title: this.input.value,
      checked: false,
    });

    this.input.reset();
  }

  deleteTodo(id: string) {
    this.todos.splice(
      this.todos.findIndex(e => e.id === id),
      1
    );
  }
}
