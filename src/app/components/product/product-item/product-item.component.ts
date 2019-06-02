import { ProductService } from '../../../services/product.service';
import { ProductCardComponent } from '../product-view-card/product-view-card.component';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: any;
  @Input() view: string;
  constructor(private modalService: NgbModal, private productService: ProductService) { }

  ngOnInit() {
  }

  public openProductDetails() {
    const modalRef = this.modalService.open(ProductCardComponent);
    modalRef.componentInstance.product = this.product;
    this.productService.updateProduct(this.product);
  }

  @HostListener('click')
  public deleteProduct(event: any) {
      event.stopPropagation();
      this.productService.removeProduct(this.product);
  }
}
