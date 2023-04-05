import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const getToken = localStorage.getItem('token')

      if (getToken != null) {
        resolve(true)
      } else {
        this.router.navigateByUrl('/login')
        resolve(false)
      }
    })
  }

  /*   login(){
    const getToken =localStorage.getItem('token');

    if(getToken != null){
      return true
    }
    this.router.navigateByUrl('/login')
    return false;
  } */
}
