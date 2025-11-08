import { Component, inject, OnInit, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/services/products.service';
import { of } from 'rxjs';
import { ProductCard } from "@products/components/product-card/product-card";
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page',
  imports: [ ProductCarousel],
  templateUrl: './product-page.html',
})
export class ProductPage implements OnInit{

  productService = inject(ProductsService);


  productIdSlug = inject(ActivatedRoute).snapshot.params['idSlug'];

  idSlug = signal<string>('');

  ngOnInit(): void {
    this.idSlug.set(this.productIdSlug);
  }

  //rxResource
  productResource = rxResource<Product | null,string>({
    params: this.idSlug,
    stream: ({params}) => {
      if(!params) return of(null);
      return this.productService.getProductByIdSlug(params);
    }
  })


}
