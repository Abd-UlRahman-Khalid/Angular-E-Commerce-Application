import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }

  myToken:any=localStorage.getItem('userToken');

  addProductToCart(id:string):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/cart', 
    {
      "productId": id  
    }
)
  }
  getLoggedUserCart():Observable<any>{
    return this.httpClient.get("https://ecommerce.routemisr.com/api/v1/cart"
)
  }

  removeSpecificCartItem(id:string):Observable<any>{
  return  this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)
  }
  
  clearCart():Observable<any>{
    return  this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
    }

updateProductQuantity(id:string,newCount:number):Observable<any>{
  return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      "count": newCount
  }
  )
  }
}

// post, put ---> url(api) , body , -----options header

//get, delet ---->url(api)  , -----options header 