import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public totalProducts: any;
  public totalViews: any;
  public isLoading = false;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.isLoading = true;
    zip(
      this.productService.totalProductsCount,
      this.productService.totalViewsCount
    )
      .subscribe(
        res => {
        this.totalProducts = res[0];
        this.totalViews = res[1];
        this.isLoading = false;
      });
  }

}
