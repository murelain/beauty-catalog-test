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
  public isLoading = false;

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
        .then(res => {
          this.addProduct(res.getRawValue()).subscribe(res2 => {
            this.productsObservable = this.getProducts();
            o.next(res2);
          });
        });

    })
  }

  removeProduct(product: any) {
    return this.http.delete(`/api/products/${product.id}`).subscribe(() => {
       this.productsObservable = this.getProducts();
    });
  }

  get totalProductsCount():Observable<any> {
    return new Observable(o => {
      this.productsObservable.subscribe(list => {
       o.next(list.length);
     });
   });
 }

  get totalViewsCount(): Observable<any>{
    return new Observable(o => {
       this.productsObservable.subscribe(list => {
        const count = list.reduce((views, product) => {
          return views + product.views;
        }, 0);
        o.next(count);
      });
    });
  }

  updateProduct(product: any) {
    product.views += 1;
    return this.http.post('/api/products', product).subscribe(() => {
      //suppose we get an actual result, meanwhile simulating it here
      return of(product);
    });
  }


}
