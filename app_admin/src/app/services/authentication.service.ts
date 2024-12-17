import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { Authresponse } from '../models/authresponse';
import { TripDataService } from './trip-data.service';
import { Observable, firstValueFrom } from 'rxjs'; 


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject (BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  public getToken(): string | null {
    return this.storage.getItem('travlr-token');
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public async login(user: User): Promise<void> {
    const authResp = await firstValueFrom(this.tripDataService.login(user));
    this.saveToken(authResp.token);
  }

  public async register(user: User): Promise<void> {
    const authResp = await firstValueFrom(this.tripDataService.login(user));
    this.saveToken(authResp.token);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser(): User | null {
    if(this.isLoggedIn()) {
      const token = this.getToken();
      if (!token) {
        return null;
      }
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        email: payload.email,
        name: payload.name
      } as User;
    }
    return null;
  }
}
