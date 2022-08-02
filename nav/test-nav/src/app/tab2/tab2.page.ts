import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  @ViewChild('emailcontrol', { static: false }) emailIonInput: IonInput;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordconfirm: ['', Validators.required],
    });
  }

  public get emailControl(): AbstractControl {
    const control = this.form.get('email');
    return control;
  }

  ngOnInit(): void {}

  ionViewDidEnter() {
    this.emailIonInput.setFocus();
  }

  onInputFocus(focusEvent) {
    focusEvent.target.getInputElement().then((el) => {
      el.select();
    });
  }
}
