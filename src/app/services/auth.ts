import {Inject, Injectable} from '@angular/core';
import {UserCredentials} from '../interfaces';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential
} from '@angular/fire/auth';
import {BehaviorSubject, Observable, Subscriber} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public loggedUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(@Inject(Auth) private readonly auth: Auth, private readonly router: Router) {
    this.auth.onAuthStateChanged(async (user: User | null): Promise<void> => {
      this.loggedUser.next(user);
      await this.router.navigate([user === undefined ? 'login' : 'manage'])
    });
  }

  /**
   * This function is used by canActivate routes, only accessible if the user is logged in
   * @param next next route to evaluate
   * @param state state of the router at the moment
   * @return true if you can go to next route, UrlTree to login page if not
   */
  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return new Observable((observer: Subscriber<boolean | UrlTree>): void => {
      const nextValue: boolean | UrlTree = this.loggedUser ? true : this.router.createUrlTree(['login']);
      observer.next(nextValue)
    });
  }

  public googleLogin(): void {
    signInWithPopup(this.auth, new GoogleAuthProvider()).then(async (result: UserCredential): Promise<void> => {
      this.loggedUser.next(result.user);
      await this.router.navigate(['manage']);
    });
  }

  public login(userdata: UserCredentials): void {
    signInWithEmailAndPassword(this.auth, userdata.email, userdata.password).then(async (result: UserCredential): Promise<void> => {
      this.loggedUser.next(result.user);
      await this.router.navigate(['manage']);
    });
  }

  public registerUser(userdata: UserCredentials): void {
    createUserWithEmailAndPassword(this.auth, userdata.email, userdata.password).then(async (result: UserCredential): Promise<void> => {
      await this.router.navigate(['login']);
    }).catch((error: any): void => {
      console.log(error);
    });
  }

  public async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['login']);
  }

}
