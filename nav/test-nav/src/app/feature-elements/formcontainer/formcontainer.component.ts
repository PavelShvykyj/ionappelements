import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-formcontainer',
  templateUrl: './formcontainer.component.html',
  styleUrls: ['./formcontainer.component.scss'],
})
export class FormcontainerComponent implements OnInit {
  @Input()
  title: string;

  constructor() { }

  ngOnInit() {}

}
