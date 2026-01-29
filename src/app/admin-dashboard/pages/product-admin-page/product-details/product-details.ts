import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductCarousel } from '@products/components/product-carousel/product-carousel';
import { Product } from '@products/interfaces/product.interface';
import { FormUtils } from '@utils/form-utils';
import { Size } from '../../../../products/interfaces/product.interface';
import { FormErrorLabel } from "@shared/components/form-error-label/form-error-label";

@Component({
  selector: 'product-details',
  imports: [ProductCarousel, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {

  product = input.required<Product>();

  fb = inject(FormBuilder);

  sizes = ['XS','S','M','L','XL','XXL'];

  productForm = this.fb.group({
    title: ['',Validators.required],
    description:['',Validators.required],
    slug:['',[Validators.required,Validators.pattern(FormUtils.slugPattern)]],
    price:[0,[Validators.required,Validators.min(0)]],
    stock:[0,[Validators.required,Validators.min(0)]],
    sizes:[['']],
    images:[[]],
    tags:[''],
    gender:['men',[Validators.required,Validators.pattern(/men|woman|kid|unisex/)]]
  })

  ngOnInit(): void {
    this.setFormValue(this.product())
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

  onSubmit(){
    const isValid = this.productForm.valid;

    console.log(this.productForm.value, {isValid})
  }

}
