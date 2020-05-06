import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductPageModule) },
  { path: 'productdetail', loadChildren: () => import('./productdetail/productdetail.module').then(m => m.ProductDetailPageModule) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule) },
  { path: 'sellmyproduct', loadChildren: () => import('./sellmyproduct/sellmyproduct.module').then(m => m.SellmyproductPageModule) },
  { path: 'cart-modal', loadChildren: () => import('./cart/cart-modal.module').then(m => m.CartModalPageModule) },
  { path: 'sellmyproductlist', loadChildren: () => import('./sellmyproduct/sellmyproductlist.module').then(m => m.SellmyproductlistPageModule) },
  { path: 'sellerproductlist', loadChildren: () => import('./product/sellerproductlist.module').then(m => m.SellerproductlistPageModule) },
  { path: 'cartbasket', loadChildren: () => import('./cart/cartbasket.module').then(m => m.CartbasketPageModule) },
  { path: 'address', loadChildren: () => import('./account/address/address.module').then(m => m.AddressPageModule) },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
