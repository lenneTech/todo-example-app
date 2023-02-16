import { Component, OnInit } from '@angular/core';
import { Helper } from '@lenne.tech/ng-base/shared';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  list = [
    {
      id: Helper.getUID(),
      title: 'Abc',
      description: 'Lorem ipsum',
      createdAt: new Date(),
    },
    {
      id: Helper.getUID(),
      title: 'Abc',
      description: 'Lorem ipsum',
      createdAt: new Date(),
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
