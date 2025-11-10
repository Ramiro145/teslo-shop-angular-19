import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
})
export class Pagination {


  currentPage = input<number>(1);
  pages = input(0);

  //? linkedsignal para tratar problema de signals
  activePage = linkedSignal(this.currentPage)


  getPagesList = computed(() => {
    console.log({length: this.pages()});
    return Array.from({length: this.pages()}, (_, i) => i + 1)
  })

}
