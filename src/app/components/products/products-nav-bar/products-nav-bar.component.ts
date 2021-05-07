import { Component, OnInit } from '@angular/core';
import { EventDrivenService } from 'src/app/Services/event.driven.service';
import { ProductActionsTypes } from 'src/app/State/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css'],
})
export class ProductsNavBarComponent implements OnInit {
  // @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();

  constructor(private eventDrivenService: EventDrivenService) {}

  ngOnInit(): void {}

  onGetAllProducts() {
    // this.productEventEmitter.emit({
    //   type: ProductActionsTypes.GET_ALL_PRODUCTS,
    // });
    this.eventDrivenService.publishEvent({
      type: ProductActionsTypes.GET_ALL_PRODUCTS,
    });
  }

  onGetSelectedProducts() {
    // this.productEventEmitter.emit({
    //   type: ProductActionsTypes.GET_SELECTED_PRODUCTS,
    // });
    this.eventDrivenService.publishEvent({
      type: ProductActionsTypes.GET_SELECTED_PRODUCTS,
    });
  }

  onGetAvailableProducts() {
    // this.productEventEmitter.emit({
    //   type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS,
    // });
    this.eventDrivenService.publishEvent({
      type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS,
    });
  }

  onNewProduct() {
    //this.productEventEmitter.emit({ type: ProductActionsTypes.NEW_PRODUCT });
    this.eventDrivenService.publishEvent({
      type: ProductActionsTypes.NEW_PRODUCT,
    });
  }

  onSearch(dataForm: any) {
    // this.productEventEmitter.emit({
    //   type: ProductActionsTypes.SEARCH_PRODUCTS,
    //   payload: dataForm,
    // });
    this.eventDrivenService.publishEvent({
      type: ProductActionsTypes.SEARCH_PRODUCTS,
      payload: dataForm,
    });
  }
}
