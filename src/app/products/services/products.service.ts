import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '@products/interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


const baseUrl = environment.baseUrl;


interface Options {
  limit?:number;
  offset?:number;
  gender?:string;
}

@Injectable({providedIn: 'root'})
export class ProductsService {

  private http = inject(HttpClient);

  getProduct(options:Options):Observable<ProductsResponse>{

    const { limit = 9, offset = 0, gender = '' } = options;


    return this.http.get<ProductsResponse>(`${baseUrl}/products`, {
      params : {
        limit : limit,
        gender : gender,
        offset : offset
      }
    })
    .pipe(
      tap(resp => console.log(resp))
    );
  }


  getProductImage (imageString:string){

    return this.http.get(`${baseUrl}/files/product/${imageString}`)

  }


  getProductByIdSlug(id:string):Observable<Product>{

    return this.http.get<Product>(`${baseUrl}/products/${id}`);


  }


}
