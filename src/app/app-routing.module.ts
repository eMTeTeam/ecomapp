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
  { path: 'sellmyproductlist', loadChildren: () => import('./sellmyproduct/sellmyproductlist.module').then(m => m.SellmyproductlistPageModule) },
  { path: 'sellerproductlist', loadChildren: () => import('./product/sellerproductlist.module').then(m => m.SellerproductlistPageModule) },
  { path: 'cartbasket', loadChildren: () => import('./cart/cartbasket.module').then(m => m.CartbasketPageModule) },
  { path: 'address', loadChildren: () => import('./account/address/address.module').then(m => m.AddressPageModule) },
  { path: 'allproductslist', loadChildren: () => import('./sellmyproduct/allproductslist.module').then(m => m.AllproductslistPageModule) },
  { path: 'myorders', loadChildren: () => import('./myorders/myorders.module').then(m => m.MyordersPageModule) },
  { path: 'myordersdetail', loadChildren: () => import('./myorders/myordersdetail.module').then(m => m.MyordersdetailPageModule) },
  { path: 'addresslist', loadChildren: () => import('./account/address/addresslist.module').then(m => m.AddresslistPageModule) },
  { path: 'review-modal', loadChildren: () => import('./sellmyproduct/review-modal/review-modal.module').then(m => m.ReviewModalPageModule) },
  { path: 'notification', loadChildren: () => import('./notifications/notification.module').then(m => m.NotificationPageModule) },
  { path: 'notification-list', loadChildren: () => import('./notifications/notification-list.module').then(m => m.NotificationListPageModule) },
  { path: 'userprofile', loadChildren: () => import('./account/userprofile/userprofile.module').then(m => m.UserprofilePageModule) },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
