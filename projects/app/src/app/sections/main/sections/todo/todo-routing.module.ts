import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.component';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
        pathMatch: 'full',
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
