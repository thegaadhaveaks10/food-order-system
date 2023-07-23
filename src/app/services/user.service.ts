import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/model/user';
import { HttpClient } from '@angular/common/http';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { USER_LOGIN_URL } from '../shared/constants/url';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable: Observable<User>;

  constructor(private httpClient: HttpClient) { 
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.httpClient.post<User>(USER_LOGIN_URL, userLogin).pipe(tap({
      next: (user) => {
        // alert(`Welcome to Ambato ${user.name}!`);
      },
      error: (errorResponse) => {
        alert(errorResponse.error);
      }
    }));
  }
}
