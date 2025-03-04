import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';

import { CategoriesService } from '../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ICategories } from '../../shared/interfaces/icategories';
import {
  CurrencyPipe,
  DatePipe,
  JsonPipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { WhishingService } from '../../core/services/whishing/whishing.service';

@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    UpperCasePipe,
    TitleCasePipe,
    SlicePipe,
    CurrencyPipe,

    SearchPipe,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);
  private readonly whishingService = inject(WhishingService);

  hamada: string = '';
  myDate: any = new Date();

  products: IProduct[] = [];
  categories: ICategories[] = [];

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoriesData();
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

  getCategoriesData() {
    // showLoading

    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        // hideLoading
      },
      error: (err) => {
        console.log(err);
        // hideLoading
      },
    });
  }

  addToCard(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
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

  scrollToSection() {
    const element = document.getElementById('targetSection');
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
    }
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
}
