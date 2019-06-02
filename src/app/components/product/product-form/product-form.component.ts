import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  newProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image_url: new FormControl('', Validators.required),
    about: new FormControl('', Validators.required),
    views: new FormControl(0),
  });

  constructor(private activeModal: NgbActiveModal) { }


  public onSave() {
    const controls = this.newProductForm.controls;
    if (this.newProductForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    } else {
      this.activeModal.close(this.newProductForm);
    }

  }

  public hasError(key: string): boolean {
    if (key === undefined === null) {
      return null;
    }
    const input = this.newProductForm.get(key);
    return input.errors && (input.dirty || input.touched);
  }

  ngOnInit() {
  }


}
