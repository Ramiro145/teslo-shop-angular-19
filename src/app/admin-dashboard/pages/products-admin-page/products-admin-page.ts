import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTable } from "@products/components/product-table/product-table";
import { ProductsService } from '@products/services/products.service';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, Pagination],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage {


    productsService = inject(ProductsService);
    paginationService = inject(PaginationService);
    productsPerPage = signal(10);

    onSelectionChange(event:Event){

      const target = event.target as HTMLSelectElement;

      this.productsPerPage.set(Number(target.value));

    }

    productsResource = rxResource({
    //? restar 1 para el offset (sino saltaría 9 productos)
    params: () => ({page: this.paginationService.currentPage() - 1, limit: this.productsPerPage()}),
    stream: ({params}) => {
      return this.productsService.getProduct({
        offset: params.page * 9,
        limit: params.limit
      });
    }
  })


}
