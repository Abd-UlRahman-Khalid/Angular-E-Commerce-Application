import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private httpClint:HttpClient) { }

getAllProducts():Observable<any>
{
 return  this.httpClint.get("https://ecommerce.routemisr.com/api/v1/products")
} 

getSpecificProduct(id:string):Observable<any>
{
 return  this.httpClint.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
} 
}
