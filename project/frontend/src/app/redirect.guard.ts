import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { KorisnikService } from './korisnik.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  constructor(private router: Router, private servis: KorisnikService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.servis.trenutnoUlogovan()){
        let tip = this.servis.trenutnoUlogovanTip();
        if(tip == 0) this.router.navigate(['poljoprivrednik']);
        if(tip == 1) this.router.navigate(['preduzece']);
        if(tip == 2) this.router.navigate(['admin']);
        
        return false;
      }
      else{
        return true;
      }
  }
}
