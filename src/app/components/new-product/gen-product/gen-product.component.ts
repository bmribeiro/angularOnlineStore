import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gen-product',
  templateUrl: './gen-product.component.html',
  styleUrl: './gen-product.component.css'
})
export class GenProductComponent {

  // FormGroup
  formGroup!: FormGroup;
  isSubmitted = false;

  @Input() showGenProduct: boolean = false;

  @Output() productSelectedEmitter = new EventEmitter<boolean>();

  constructor(){

    this.formGroup = new FormGroup({
      'productName': new FormControl(''),
      'productDescription': new FormControl(''),
    });
  }

  printFormGroup(){
    this.isSubmitted = true;
    this.productSelectedEmitter.emit(true);
  }
   

}
