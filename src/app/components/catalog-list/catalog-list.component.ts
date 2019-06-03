import { ProductModel } from './../../product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss'],
  // animations: [
  //   trigger('myInsertRemoveTrigger', [
  //     transition(':enter', [
  //       style({ opacity: 0, height: 0 }),
  //       animate('.3s', style({ opacity: 1,  height: '100%' })),
  //     ]),
  //     transition(':leave', [
  //       animate('.2s', style({ opacity: 0, height: 0 })),
  //     ])
  //   ])
  // ]
})


export class CatalogListComponent implements OnInit {


  public isListViewActive = true;
  public productsObservable: Observable<ProductModel[]>;
  public isLoading = false;

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.productsObservable = this.productService.productsObservable;
    this.productsObservable.subscribe(res => {
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });
  }

  public toggleView() {
    this.isListViewActive = !this.isListViewActive;
  }

  public addNewProduct() {
    this.productService.addProductModal()
      .subscribe(res => {
        this.loadProducts();
      });
  }

}
