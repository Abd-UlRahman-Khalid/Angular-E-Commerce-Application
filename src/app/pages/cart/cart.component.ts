import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { error } from 'console';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);

  cardDetails: ICart = {} as ICart;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cardDetails = res.data;
        console.log(res.data.cartOwner);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeItem(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeSpecificCartItem(id).subscribe({
          next: (res) => {
            console.log(res);
            // get Data
            this.cardDetails = res.data;
            Swal.fire({
              title: 'Deleted!',
              text: 'Your Item has been deleted.',
              icon: 'success',
            });
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
  }
  clearItems(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Clear it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe({
          next: (res) => {
            console.log(res);
            if (res.message === 'success') {
              this.cardDetails = {} as ICart;
              Swal.fire({
                title: 'Cleared!',
                text: 'Your cart has been Cleared.',
                icon: 'success',
              });
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
  }
  updateCount(id: string, count: number): void {
    this.cartService.updateProductQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res);
        // getCartData
        this.cardDetails = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
