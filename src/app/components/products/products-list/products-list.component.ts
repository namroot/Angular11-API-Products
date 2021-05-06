import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Model/product.model';
import {
  ActionEvent,
  AppDataState,
  DataStateEnum,
  ProductActionsTypes,
} from 'src/app/State/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;

  readonly DataStateEnum = DataStateEnum;

  constructor() {}

  ngOnInit(): void {}
}
