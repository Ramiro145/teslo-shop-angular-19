import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { CanMatch, CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { AuthService } from "@auth/services/auth.service";
import { filter, firstValueFrom, map, take } from "rxjs";




export const isAdminGuard:CanMatchFn = async (
  route:Route,
  segments:UrlSegment[]
) => {

  const authService = inject(AuthService);


  //esperamos el la autenticación
  await firstValueFrom(authService.checkStatus());

  return authService.isAdmin()


  //?alternativa

  // const router = inject(Router);

  //convierte signal a observable
  // return toObservable(authService.authStatus).pipe(

       //filtramos hasta que deje de estar en checking
  //   filter(status => status != 'checking'),

  //   take(1),

  //   map(() => {
  //     const user = authService.user();

  //     if(!user){
  //       router.navigate(['/login'])
  //       return false;
  //     }

  //     const isAdmin = user.roles.includes('admin');

  //     if(!isAdmin){
  //       router.navigate(['/login'])
  //       return false
  //     }

  //     return true;

  //   })

  // )

}
