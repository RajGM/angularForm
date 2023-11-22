import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './create-product/create-product.component';

export const routes: Routes = [
    { path: 'products', component: ProductsComponent, title:"Product List" },
    { path: 'create-product', component: CreateProductComponent, title:"Create Product" },
    { path: '', redirectTo: '/products', pathMatch: 'full' } // Redirect to 'products' as the default route
  ];
  