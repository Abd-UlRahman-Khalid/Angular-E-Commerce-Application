import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { WhishingService } from '../../core/services/whishing/whishing.service';

@Component({
  selector: 'app-product',
  imports: [
    RouterLink,
    TitleCasePipe,
    CurrencyPipe,
    SearchPipe,
    FormsModule,
    SlicePipe,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);
  private readonly whishingService = inject(WhishingService);

  products: IProduct[] = [];
  hamada: string = '';
  sortKey: string = 'price';
  sortOrder: string = 'asc';

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  addToWhishing(id: string): void {
    this.whishingService.addProductToWhishingList(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  addToCard(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Fresh Cart');
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  sortProducts() {
    console.log('Sorting by:', this.sortKey, 'Order:', this.sortOrder);

    if (!this.sortKey || !this.sortOrder) {
      console.error('SortKey or SortOrder is missing!');
      return;
    }

    this.products = [...this.products].sort((a, b) => {
      let aValue = a[this.sortKey as keyof IProduct];
      let bValue = b[this.sortKey as keyof IProduct];

      if (typeof aValue === 'string') {
        return this.sortOrder === 'asc'
          ? (aValue as string).localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue as string);
      } else {
        return this.sortOrder === 'asc' ? +aValue - +bValue : +bValue - +aValue;
      }
    });
  }

  // Fix trackBy function
  trackById(index: number, item: IProduct): string {
    return item.id;
  }
}
