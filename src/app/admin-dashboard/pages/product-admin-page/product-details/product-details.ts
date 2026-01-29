import { Component, input } from '@angular/core';
import { ProductCarousel } from '@products/components/product-carousel/product-carousel';
import { Product } from '@products/interfaces/product.interface';

@Component({
  selector: 'product-details',
  imports: [ProductCarousel],
  templateUrl: './product-details.html',
})
export class ProductDetails {

  product = input.required<Product>();

}
