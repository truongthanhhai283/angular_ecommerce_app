import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cart-item';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { UserData } from 'src/app/models/user-data';
import { ErrorHandler } from 'src/app/shared/error-handler';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  _registerUrl = `http://localhost:3000/auth/register`;
  _loginUrl = `http://localhost:3000/auth/login`;
  _userUrl = `http://localhost:3000/auth/current-user`;
  _profileUrl = `http://localhost:3000/profile`;
  private _usersURL = `http://localhost:3000/auth/system-users`;
  private _userDataURL = `http://localhost:3000/auth/user-main-data`;
  private imageChangeUrl = `http://localhost:3000/profile/userprofile/changeprofileimage`;
  private newImageUrl = `http://localhost:3000/profile/userprofile/setprofileimage`;
  private contactUrl = `http://localhost:3000/contacts/new-mail`;
  private errorHandler: ErrorHandler = new ErrorHandler();

  public currentUser: User;
  public profile: Profile;
  public cart: Cart;
  public cartItem: CartItem;
  public username: string;

  register(data: any): Observable<any> {
    try {
      return this.http.post<any>(this._registerUrl, data);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  pUserData() {
    if (this.isLoggedIn()) {
      this.prepareUserData().subscribe((uData: UserData) => {
        this.profile = uData.profile;
        this.username = `${uData.profile.firstName} ${uData.profile.lastName}`;
        this.cartItem = uData.cartItem;
        this.cart = uData.cart;
      });
      this.getCurrentUser().subscribe((resUser) => {
        this.currentUser = resUser;
      });
    }
  }

  login(data: any): Observable<any> {
    try {
      return this.http.post<any>(this._loginUrl, data);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  userLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  prepareUserData(): Observable<UserData> {
    try {
      return this.http.get<any>(this._userDataURL);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  messageContact(messageForm: any): Observable<void> {
    try {
      return this.http.post<void>(this.contactUrl, messageForm);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }

  getCurrentUser() {
    try {
      return this.http.get<any>(this._userUrl);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getSystemtUser(): Observable<User[]> {
    try {
      return this.http.get<any>(this._usersURL);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserProfile(): Observable<Profile> {
    try {
      return this.http.get<Profile>(this._profileUrl);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }
}
