import { ProductModel } from './../product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProductFormComponent } from '../components/product/product-form/product-form.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productsTotal: Number;
  public viewsTotal: Number;
  public productsObservable: Observable<ProductModel[]>;
  public inProgress = false;

  constructor(private http: HttpClient, private modalService: NgbModal) {
    this.productsObservable = this.getProducts();
  }


  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('/api/products');
  }

  private addProduct(product: ProductModel) {
    return this.http.post('/api/products', product);
  }

  addProductModal(): Observable<any> {

    return new Observable(o => {
      this.modalService.open(ProductFormComponent)
        .result
        .then(
          newProductForm => {
            this.inProgress = true;
            this.addProduct(newProductForm.getRawValue())
              .subscribe(
                res => {
                  this.productsObservable = this.getProducts();
                  o.next(res);
                },
                () => {
                  console.log('Error occured while adding product');
                },
                () => {
                  this.inProgress = false;
                });
          })
        .catch(err => {
          this.inProgress = false;
          console.log('Product has not been added');
        });
    });
  }

  removeProduct(product: ProductModel) {
    if (!product) {
      return;
    }
    this.inProgress = true;
    this.http.delete(`/api/products/${product.id}`)
      .subscribe(
        () => {
          this.productsObservable = this.getProducts();
        },
        err => {
          console.log('Error occured while deleting');
        },
        () => {
          console.log('product deleted');
          this.inProgress = false;
        });
  }

  get totalProductsCount(): Observable<any> {
    return new Observable(o => {
      this.productsObservable.subscribe(
        list => {
          o.next(list.length);
        },
        err => {
          console.log('Error occured while getting total count');
        });
    });
  }

  get totalViewsCount(): Observable<any> {
    return new Observable(o => {
      this.productsObservable.subscribe(
        list => {
          const count = list.reduce((views, product) => {
            return views + product.views;
          }, 0);
          o.next(count);
        },
        err => {
          console.log('Error occured while getting views count');
        });
    });
  }

  updateProduct(product: ProductModel) {
    product.views += 1;
    this.http.post('/api/products', product).subscribe(() => {
      // suppose we get an actual result, meanwhile simulating it here
      return of(product);
    },
      err => {
        console.log('Error occured while getting total count');
      });
  }


}
