import { RenderMode } from '@angular/ssr';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { logedGuard } from './core/guards/loged/loged.guard';

import { provideRoutes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Auth Routes
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [logedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Register',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
        title: 'Login',
      },
      {
        path: 'forget',
        loadComponent: () =>
          import(
            './pages/forgetpassword/forgetpassword/forgetpassword.component'
          ).then((m) => m.ForgetpasswordComponent),
        title: 'forget',
      },
    ],
  },

  // Main App Routes
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: 'Home',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
        title: 'Cart',
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./pages/product/product.component').then(
            (m) => m.ProductComponent
          ),
        title: 'Product',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
        title: 'allorders',
      },
      {
        path: 'cashpayment',
        loadComponent: () =>
          import('./pages/cashpayment/cashpayment.component').then(
            (m) => m.CashpaymentComponent
          ),
        title: 'cashpayment',
      },
      {
        path: 'brand',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'Brands',
      },
      {
        path: 'wishList',
        loadComponent: () =>
          import('./pages/whishlist/whishlist.component').then(
            (m) => m.WhishlistComponent
          ),
        title: 'wishList',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
        title: 'Checkout',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./pages/details/details.component').then(
            (m) => m.DetailsComponent
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/notfound/notfound.component').then(
            (m) => m.NotfoundComponent
          ),
      },
    ],
  },
];
