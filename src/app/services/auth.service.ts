import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { delay, map } from "rxjs/operators";
import	{	Storage	}	from	'@ionic/storage';

interface Usertoken {
  username: string, 
  token: string
}
interface SimulatedResponse {
  loginStatus: 'OK' | 'ERROR',
  usertoken?: Usertoken,
  errorMessage?: string
}

// --- Simulación de respuestas ---//
const BodySimulatedResponseLoginOK: SimulatedResponse = {
  loginStatus: 'OK',
  usertoken: {
    username: 'curso',
    token: 'asdfasart4385u34tfsg4tgrfw5g3'
  }
};

const BodySimulatedResponseLoginERROR: SimulatedResponse = {
  loginStatus: 'ERROR',
  errorMessage: 'Invalid Credentials'
};

const ResponseLoginOk$: Observable<SimulatedResponse> = Observable.create(
  emmitter => {emmitter.next(BodySimulatedResponseLoginOK); emmitter.complete()}
).pipe(delay(1000));

const ResponseLoginERROR$: Observable<SimulatedResponse> = Observable.create(
  emmitter => {emmitter.next(BodySimulatedResponseLoginERROR); emmitter.complete()}
).pipe(delay(1000));
// --- Fin de simulación de respuestas ---//

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usertoken: Usertoken;
  private lastLoginErrorMessage: string;

  constructor(
    private	storage:	Storage
  ) { 
    this.usertoken = {
      username: '',
      token: ''
    };
    this.lastLoginErrorMessage = null;
    
  }

  /**
   * Método que simula un proceso de login. Las credenciales correctas son usuario: curso, password: ionic
   * 
   * @param user 
   * @return Observable<boolean> Observable que emite true si el proceso de login ha ido bien y emite false si ha ido mal
   */
  login(user: {username: string, password: string}): Observable<boolean> {
    
    if (user.username === 'curso' && user.password === 'ionic') { 
      // Simulamos que hemos recibido la respuesta ResponseLoginOk$
      // Cambiamos la respuesta por un true
      return ResponseLoginOk$.pipe(
        map(
          respuesta => {
            this.usertoken = respuesta.usertoken;
            this.lastLoginErrorMessage = null;
            this.storage.set('username',respuesta.usertoken.username);
            this.storage.set('token', respuesta.usertoken.token);
            return true;
          })
      );
    } else {
      // Simulamos que hemos recibido la respuesta ResponseLoginERROR$.
      // Cambiamos la respuesta por un false
      return ResponseLoginERROR$.pipe(
        map(
          respuesta => {
            this.lastLoginErrorMessage = respuesta.errorMessage;
            return false;
          }
        )
      );
    }
  }

  logout() {
    this.usertoken = {
      username: '',
      token: ''
    };
    this.storage.remove('username');
    this.storage.remove('token');
  }

  isLogged(): boolean {
    if(this.storage.get('token')) {
      return true;
    } else {
      return false;
    }
  }

  getLastLoginErrorMessage(): string {
    return this.lastLoginErrorMessage;
  }

}
