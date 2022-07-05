import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './admin/users/users.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdduserComponent } from './admin/users/adduser/adduser.component';
import { ViewuserComponent } from './admin/users/viewuser/viewuser.component';
import { ProductsComponent } from './admin/products/products.component';
import { AddproductComponent } from './admin/products/addproduct/addproduct.component';
import { ViewproductComponent } from './admin/products/viewproduct/viewproduct.component';
import { ShoppageComponent } from './shoppage/shoppage.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthHttpInterceptorService } from './service/auth-http-interceptor.service';
import { RegisterComponent } from './register/register.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { ShipmentpageComponent } from './shipmentpage/shipmentpage.component';
import { SummarypageComponent } from './summarypage/summarypage.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { VieworderComponent } from './admin/orders/vieworder/vieworder.component';
import { OrderdetailsComponent } from './summarypage/orderdetails/orderdetails.component';
import { FooterComponent } from './footer/footer.component';
import { StatsComponent } from './admin/stats/stats.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UsersComponent,
    AdduserComponent,
    ViewuserComponent,
    ProductsComponent,
    AddproductComponent,
    ViewproductComponent,
    ShoppageComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    ProductpageComponent,
    AccountSettingsComponent,
    CartpageComponent,
    ShipmentpageComponent,
    SummarypageComponent,
    OrdersComponent,
    VieworderComponent,
    OrderdetailsComponent,
    FooterComponent,
    StatsComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
	ChartsModule
  ],
  providers: [
    {  
      provide:HTTP_INTERCEPTORS, useClass:AuthHttpInterceptorService, multi:true 
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
