import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '@lenne.tech/ng-base/shared';

@Component({
  selector: 'app-create-list-modal',
  templateUrl: './create-list-modal.component.html',
  styleUrls: ['./create-list-modal.component.scss'],
})
export class CreateListModalComponent implements OnInit {
  form: FormGroup;
  constructor(public activeModal: NgbActiveModal, private formsService: FormsService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup<any>({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  submitCreate() {
    if (this.form.invalid) {
      this.formsService.validateAllFormFields(this.form);
      return;
    }

    this.activeModal.close(this.form.value);
  }
}
