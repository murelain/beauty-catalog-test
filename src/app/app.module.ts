
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { FakeDbService } from './fake-db/fake-db.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductCardComponent } from './components/product/product-view-card/product-view-card.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductCardComponent,
    ProductFormComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModalModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(FakeDbService, {
      delay: 300,
      passThruUnknownUrl: true
    })
  ],
  providers: [],
  entryComponents: [ProductCardComponent, ProductFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
