import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CartService } from '../../core/services/cart/cart.service';

import { CurrencyPipe, NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { IUserData } from '../../shared/interfaces/iuser-data';
import { IOrders } from '../../shared/interfaces/iorders';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, NgIf],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);

  ownerId: string = '';
  lastItem: number = 0;
  orders: IOrders[] = [];
  ordersDetais: IOrders[] = [];
  userData: IUserData = {} as IUserData;

  ngOnInit(): void {
    this.userData = this.authService.getUserData();

    this.getOrders(this.userData.id);
  }

  getOrders(id: string): void {
    this.ordersService.getUsersOreder(id).subscribe({
      next: (res) => {
        this.orders = res[res.length - 1]?.cartItems || [];
        console.log(this.orders);
      },
    });
  }
}
