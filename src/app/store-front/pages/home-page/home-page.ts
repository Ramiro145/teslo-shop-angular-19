import { Component, inject } from '@angular/core';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductsService } from '@products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from "@shared/components/pagination/pagination";
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {

  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  // activatedRoute = inject(ActivatedRoute);

  // currentPage = toSignal(
  //   this.activatedRoute.queryParamMap.pipe(
  //     map(params => (params.get('page') ? +params.get('page')! : 1)),
  //     //? evaluar NaN
  //     map(page => (isNaN(page) ? 1 : page))
  //   ),
  //   {
  //     initialValue: 1,
  //   }
  // )


  productsResource = rxResource({
    //? restar 1 para el offset (sino saltaria 9 productos)
    params: () => ({page: this.paginationService.currentPage() - 1}),
    stream: ({params}) => {
      return this.productsService.getProduct({
        offset: params.page * 9
      });
    }
  })




}
