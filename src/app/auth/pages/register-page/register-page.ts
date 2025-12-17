
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { RegisterRequest } from '../../interfaces/auth-response.interface';


type RegisterForm = {
  fullName:FormControl<string>
  email:FormControl<string>
  password:FormControl<string>
}

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {

  //?sin aceptación de valores nulos en el formulario
  fb = inject(NonNullableFormBuilder)
  router = inject(Router);
  http = inject(HttpClient)
  authService = inject(AuthService);

  hasError = signal(false);

  registerForm = this.fb.group<RegisterForm>({
    fullName: this.fb.control('', { validators: [Validators.required] }),
    email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
    password: this.fb.control('', { validators: [Validators.required, Validators.minLength(6)] }),
  })


  onSubmit(){
    if(this.registerForm.invalid){
      this.hasError.set(true)
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);
      return
    }

    const payload:RegisterRequest = this.registerForm.getRawValue();

    this.authService.register(payload).subscribe(isAuthenticated => {
       if(isAuthenticated){
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);
    });



  }

}
