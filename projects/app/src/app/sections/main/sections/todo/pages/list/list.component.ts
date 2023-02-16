import { Component, OnInit } from '@angular/core';
import { CreateListModalComponent } from '../../modals/create-list-modal/create-list-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from '../../services/todo.service';
import { firstValueFrom, Observable } from 'rxjs';
import { TodoList } from '../../models/todo-list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  lists: Observable<TodoList[]>;

  constructor(private modalService: NgbModal, private todoService: TodoService) {}

  ngOnInit() {
    this.getAllLists();
  }

  getAllLists() {
    this.lists = this.todoService.getAllLists();
  }

  createNewList(): void {
    const modalRef = this.modalService.open(CreateListModalComponent);
    modalRef.closed.subscribe({
      next: async result => {
        await firstValueFrom(this.todoService.createList(result));
      },
    });
  }

  async deleteList(id: string) {
    await firstValueFrom(this.todoService.deleteList(id));
  }
}
