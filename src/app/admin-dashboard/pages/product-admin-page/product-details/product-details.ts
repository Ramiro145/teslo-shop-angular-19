import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductCarousel } from '@products/components/product-carousel/product-carousel';
import { Product } from '@products/interfaces/product.interface';
import { FormUtils } from '@utils/form-utils';
import { Size } from '../../../../products/interfaces/product.interface';
import { FormErrorLabel } from "@shared/components/form-error-label/form-error-label";
import { ProductsService } from '@products/services/products.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'product-details',
  imports: [ProductCarousel, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {

  product = input.required<Product>();

  fb = inject(FormBuilder);

  productsService = inject(ProductsService);

  wasSaved = signal(false);

  imageFileList: FileList | undefined;

  tempImages = signal<string[]>([])

  imagesToShow = computed(()=>{
    if(this.tempImages().length > 0){
      return this.tempImages()
    }

    return this.product().images ?? [];
  })

  action = signal('');

  router = inject(Router);

  sizes = ['XS','S','M','L','XL','XXL'];

  productForm = this.fb.group({
    title: ['',Validators.required],
    description:['',Validators.required],
    slug:['',[Validators.required,Validators.pattern(FormUtils.slugPattern)]],
    price:[0,[Validators.required,Validators.min(0)]],
    stock:[0,[Validators.required,Validators.min(0)]],
    sizes:[['']],
    images:[['']],
    tags:[''],
    gender:['men',[Validators.required,Validators.pattern(/men|woman|kid|unisex/)]]
  })

  ngOnInit(): void {
    this.setFormValue(this.product())
    console.log(this.product().images)
  }

  setFormValue(formLike:Partial<Product>){
    // this.productForm.patchValue(formLike as any)
    this.productForm.reset(formLike as any)
    this.productForm.patchValue({tags:formLike.tags?.join(',')})
  }


  onSizeClicked(size:string){

    const currentSizes = this.productForm.value.sizes ?? [];

    if(currentSizes.includes(size)){
      currentSizes.splice(currentSizes.indexOf(size),1);
    }else{
      currentSizes.push(size);
    }

    this.productForm.patchValue({sizes:currentSizes})

  }

  async onSubmit(){

    const isValid = this.productForm.valid;

    this.productForm.markAllAsTouched();

    if(!isValid) return;

    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: formValue.tags?.toLowerCase().split(',').map(tag => tag.trim()) ?? []
    }

    if(this.product().id === 'new'){
      //crear producto

      const product = await firstValueFrom(
        this.productsService.createProduct(productLike)
      )

      this.wasSaved.set(true);
      this.action.set('Producto creado correctamente')

      setTimeout(() => {
        this.wasSaved.set(false)
        this.router.navigate(['/admin/products',product.id]);
      }, 1500);




    }else{

      await firstValueFrom(
        this.productsService.updateProduct(this.product().id,productLike)
      )

      this.wasSaved.set(true);
      this.action.set('Datos actualizados correctamente')

      setTimeout(() => {
        this.wasSaved.set(false)
      }, 3000);

    }


  }

  onFilesChanged(event:Event){
    //? fileList - objeto con lista de elementos
    const fileList = (event.target as HTMLInputElement).files;

    this.imageFileList = fileList ?? undefined;

    this.tempImages.set([]);

    const imageUrls = Array.from(fileList ?? []).map(file => URL.createObjectURL(file))

    this.tempImages.set(imageUrls);

  }





}
