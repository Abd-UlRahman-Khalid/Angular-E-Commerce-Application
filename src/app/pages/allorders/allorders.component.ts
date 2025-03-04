import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CartService } from '../../core/services/cart/cart.service';
import { IOrders } from '../../shared/interfaces/iorders';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);
  private readonly cartService = inject(CartService);

  ownerId: string = '';
  orders: IOrders[] = [];

  ngOnInit(): void {
    this.getOwnerID();
  }

  getOwnerID(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.ownerId = res.data.cartOwner;
        this.getOrders(this.ownerId);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getOrders(id: string): void {
    this.ordersService.getUsersOreder(id).subscribe({
      next: (res) => {
        console.log(res);
        this.orders = res;
      },
    });
  }
}
