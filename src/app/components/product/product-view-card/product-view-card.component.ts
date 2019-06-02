import { ProductService } from '../../../services/product.service';
import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-view-card',
  templateUrl: './product-view-card.component.html',
  styleUrls: ['./product-view-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: any;

  constructor(private productService: ProductService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
