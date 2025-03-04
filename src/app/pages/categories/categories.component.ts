import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/icategories';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, SearchPipe, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);

  categories: ICategories[] = [];
  hamada: string = '';

  ngOnInit(): void {
    this.getCategoryData();
  }

  getCategoryData() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);

        this.categories = res.data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
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
}
