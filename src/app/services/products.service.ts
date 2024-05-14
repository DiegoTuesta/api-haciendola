import { Injectable } from '@angular/core';
// import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../config/config';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = appConfig.hostApi+'/products';
  // private http = inject(HttpClient)
  constructor(private http:HttpClient) {
  }

  getProducts(){
    return this.http.get(this.apiUrl);
  }

  getProduct(id:string){
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createProduct(product:ProductModel){
    return this.http.post(this.apiUrl,product);
  }

  updateProduct(product:ProductModel, id:string){
    return this.http.put(`${this.apiUrl}/${id}`,product);
  }

  deleteProduct(id:string){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
