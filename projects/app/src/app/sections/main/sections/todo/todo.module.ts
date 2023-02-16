import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { TodoRoutingModule } from './todo-routing.module';
import { BaseModule } from '@lenne.tech/ng-base';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodoComponent, ListComponent, DetailComponent],
  imports: [CommonModule, TodoRoutingModule, BaseModule, ReactiveFormsModule, FormsModule],
})
export class TodoModule {}
