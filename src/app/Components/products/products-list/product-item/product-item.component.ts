import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/product.model';
import { EventDrivenService } from 'src/app/Services/event.driven.service';
import { ProductActionsTypes } from 'src/app/State/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | null = null;
  constructor(private eventDrivenService: EventDrivenService) {}

  ngOnInit(): void {}

  onSelect(product: Product) {
    this.eventDrivenService.publishEvent({
      type: ProductActionsTypes.SELECT_PRODUCT,
      payload: product,
    });
  }

  onDelete(product: Product) {
    this.eventDrivenService.publishEvent({
      type: ProductActionsTypes.DELETE_PRODUCT,
      payload: product,
    });
  }

  onEdit(product: Product) {
    this.eventDrivenService.publishEvent({
      type: ProductActionsTypes.EDIT_PRODUCT,
      payload: product,
    });
  }
}
