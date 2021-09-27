import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Product) {
    this.productForm = this.createProductForm(this.data);
  }

  ngOnInit(): void {
  }

  get formControls() {
    return this.productForm.controls;
  }

  private createProductForm(product: Product = new Product()) {
    return this.fb.group({
      id: [product.id],
      name: [product.name, [Validators.required, Validators.minLength(3)]],
      price: [product.price, [Validators.required, Validators.min(0)]],
      quantity: [product.quantity, [Validators.required, Validators.min(0)]],
      energyEfficiency: [product.energyEfficiency],
      isOrganic: [product.isOrganic],
      isRecyclable: [product.isRecyclable]
    })
  }
}
