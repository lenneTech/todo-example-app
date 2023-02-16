import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { TodoRoutingModule } from './todo-routing.module';
import { BaseModule } from '@lenne.tech/ng-base';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateListModalComponent } from './modals/create-list-modal/create-list-modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponentsModule } from '@lenne.tech/ng-base/base-components';

@NgModule({
  declarations: [TodoComponent, ListComponent, DetailComponent, CreateListModalComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    BaseModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    BaseComponentsModule,
  ],
})
export class TodoModule {}
