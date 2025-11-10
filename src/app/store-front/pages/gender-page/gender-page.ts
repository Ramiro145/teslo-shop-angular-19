import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductsService } from '@products/services/products.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { map } from 'rxjs';
import { Pagination } from "@shared/components/pagination/pagination";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, Pagination],
  templateUrl: './gender-page.html',
})
export class GenderPage {

  paginationService = inject(PaginationService);


  activatedRoute = inject(ActivatedRoute);

  productsService = inject(ProductsService);

  //reaciona al cambio de url en la misma pagina
  gender = toSignal(
    this.activatedRoute.params.pipe(
      map(({gender}) => gender)
    )
  );


  productGenderResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage() - 1,
      gender: this.gender()
    }),
    stream: ({params}) => {
      return this.productsService.getProduct({
        gender: params.gender,
        offset: params.page * 9
      });
    }
  })

}
