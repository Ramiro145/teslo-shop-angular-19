import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard],
  templateUrl: './gender-page.html',
})
export class GenderPage {



  activatedRoute = inject(ActivatedRoute);

  productsService = inject(ProductsService);

  //reaciona al cambio de url en la misma pagina
  gender = toSignal(
    this.activatedRoute.params.pipe(
      map(({gender}) => gender)
    )
  );


  productGenderResource = rxResource({
    params: this.gender,
    stream: ({params}) => {
      console.log(params);
      return this.productsService.getProduct({
        gender: params
      });
    }
  })

}
