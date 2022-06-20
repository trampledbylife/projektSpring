import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './admin/users/users.component';
import { ProductsComponent } from './admin/products/products.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { StatsComponent } from './admin/stats/stats.component';
import { ShoppageComponent } from './shoppage/shoppage.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { AdminGuardService } from './service/admin-guard.service';
import { RegisterComponent } from './register/register.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ShipmentpageComponent } from './shipmentpage/shipmentpage.component';
import { SummarypageComponent } from './summarypage/summarypage.component';

const routes: Routes = [
  { path: 'admin/users', component: UsersComponent, canActivate:[AdminGuardService] },
  { path: 'admin/products', component: ProductsComponent, canActivate:[AdminGuardService] },
  { path: 'admin/orders', component: OrdersComponent, canActivate:[AdminGuardService] },
  { path: 'admin/stats', component: StatsComponent, canActivate:[AdminGuardService] },
  { path: 'cart/shipment', component: ShipmentpageComponent, canActivate:[AuthGaurdService]  },
  { path: 'account/summary', component: SummarypageComponent, canActivate:[AuthGaurdService]  },
  { path: 'account', component: AccountSettingsComponent, canActivate:[AuthGaurdService] },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGaurdService] },
  { path: 'shop', component: ShoppageComponent },
  { path: '', component: ShoppageComponent },
  { path: 'item', component: ProductpageComponent,  },
  { path: 'cart', component: CartpageComponent,  },
  { path: 'register', component: RegisterComponent  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
