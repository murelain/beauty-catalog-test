
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CatalogListComponent } from './../../components/catalog-list/catalog-list.component';
import { ProductCardComponent } from './../../components/product/product-view-card/product-view-card.component';
import { ProductItemComponent } from './../../components/product/product-item/product-item.component';
import { ProductFormComponent } from './../../components/product/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CatalogListComponent
  }
];

@NgModule({
  declarations: [
    CatalogListComponent,
    // ProductCardComponent,
    // ProductFormComponent,
    ProductItemComponent,
    
  ],
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule, FormsModule],
  exports: [RouterModule, CommonModule],
  // entryComponents: [ProductCardComponent, ProductFormComponent],
})
export default class CatalogModule { }
