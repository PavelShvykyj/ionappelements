import { AfterContentInit, Component, ContentChild, Input, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formcell',
  templateUrl: './formcell.component.html',
  styleUrls: ['./formcell.component.scss'],
})
export class FormcellComponent {
  @Input()
  label: string;

  @ContentChild(FormControlName)
  formControl: FormControlName;

  constructor()  {}
}
