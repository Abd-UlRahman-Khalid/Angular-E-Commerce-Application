import { Component, inject, OnInit } from '@angular/core';
import { WhishingService } from '../../core/services/whishing/whishing.service';
import { IWhish } from '../../shared/interfaces/iwhish';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-whishlist',
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './whishlist.component.html',
  styleUrl: './whishlist.component.scss',
})
export class WhishlistComponent implements OnInit {
  private readonly whishingService = inject(WhishingService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);

  whishItems: IWhish = {} as IWhish;

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

  ngOnInit(): void {
    this.getWhishingItems();
  }

  getWhishingItems(): void {
    this.whishingService.getWhishingListItems().subscribe({
      next: (res) => {
        console.log(res);
        this.whishItems = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteItem(id: string): void {
    this.whishingService.deleteItemFromWhishingList(id).subscribe({
      next: (res) => {
        console.log(res);
        this.whishItems = res;
      },
      error: (error) => {
        console.log(error);
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
}
