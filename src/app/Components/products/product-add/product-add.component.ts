import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EventDrivenService } from 'src/app/Services/event.driven.service';
import { ProductsService } from 'src/app/Services/products.service';
import { ProductActionsTypes } from 'src/app/State/product.state';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productFormGroup?: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private eventDrivenService: EventDrivenService
  ) {}

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required],
    }) as FormGroup;
  }

  onSaveProduct() {
    this.submitted = true;

    if (this.productFormGroup?.invalid) return;

    this.productService.save(this.productFormGroup?.value).subscribe((data) => {
      this.eventDrivenService.publishEvent({
        type: ProductActionsTypes.PRODUCT_ADDED,
      });
      alert('update with success');
      this.router.navigateByUrl('/products');
    });
  }
}
