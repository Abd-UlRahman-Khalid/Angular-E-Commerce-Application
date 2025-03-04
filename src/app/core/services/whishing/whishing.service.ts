import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhishingService {
  constructor(private httpClient: HttpClient) {}

  addProductToWhishingList(id: string): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        productId: id,
      }
    );
  }

  deleteItemFromWhishingList(id: string): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`
    );
  }

  getWhishingListItems(): Observable<any> {
    return this.httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/wishlist'
    );
  }
}
