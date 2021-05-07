import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/product.model';
import { ProductsService } from 'src/app/Services/products.service';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import {
  DataStateEnum,
  AppDataState,
  ProductActionsTypes,
  ActionEvent,
} from 'src/app/State/product.state';
import { Router } from '@angular/router';
import { EventDrivenService } from 'src/app/Services/event.driven.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private eventDrivenService: EventDrivenService
  ) {}

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe(
      (actionEvent: ActionEvent) => {
        this.onActionEvent(actionEvent);
      }
    );
    this.onGetAllProducts();
  }

  onGetAllProducts() {
    this.products$ = this.productService.getAllProduct().pipe(
      map((data) => {
        let result: AppDataState<Product[]> = {
          dataState: DataStateEnum.LOADED,
          data: data,
        };
        return result;
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.errorMessage })
      )
    );
  }

  onGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProduct().pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data } as AppDataState<
          Product[]
        >;
      }),
      startWith({ datastate: DataStateEnum.LOADING } as AppDataState<
        Product[]
      >),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.errorMessage })
      )
    );
  }

  onGetAvailableProducts() {
    this.products$ = this.productService.getAvailableProduct().pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data } as AppDataState<
          Product[]
        >;
      }),
      startWith({ datastate: DataStateEnum.LOADING } as AppDataState<
        Product[]
      >),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.errorMessage })
      )
    );
  }

  onSearch(dataForm: any) {
    this.products$ = this.productService.searchProducts(dataForm.keyword).pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data } as AppDataState<
          Product[]
        >;
      }),
      startWith({ datastate: DataStateEnum.LOADING } as AppDataState<
        Product[]
      >),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.errorMessage })
      )
    );
  }

  onSelect(p: Product) {
    this.productService.selectProducts(p).subscribe((data) => {
      p.selected = data.selected;
    });
  }

  onDelete(p: Product) {
    let validation = confirm('are sure to delete this line?');
    if (validation) {
      this.productService.deleteProducts(p).subscribe((data) => {
        this.onGetAllProducts();
      });
    }
  }

  onNewProduct() {
    this.router.navigateByUrl('/newProduct');
  }

  onEdit(product: Product) {
    this.router.navigateByUrl('/editProduct/' + product.id);
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS:
        this.onGetAllProducts();
        break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS:
        this.onGetSelectedProducts();
        break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:
        this.onGetAvailableProducts();
        break;
      case ProductActionsTypes.SEARCH_PRODUCTS:
        this.onSearch($event.payload);
        break;
      case ProductActionsTypes.NEW_PRODUCT:
        this.onNewProduct();
        break;

      case ProductActionsTypes.SELECT_PRODUCT:
        this.onSelect($event.payload);
        break;

      case ProductActionsTypes.EDIT_PRODUCT:
        this.onEdit($event.payload);
        break;

      case ProductActionsTypes.DELETE_PRODUCT:
        this.onDelete($event.payload);
        break;
    }
    console.log($event);
  }
}
