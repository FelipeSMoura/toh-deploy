import { Injectable } from '@angular/core';
import { Hero } from './hero.model';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = `${environment.baseUrl}/heroes`;

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token')}),
  };

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(() => this.log('obtida a lista de herois')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
    // return of (HEROES);
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap(() => this.log(`obtido heroi id=${id}.`)),
      catchError(this.handleError<Hero>('getHero'))
    );
  }

  // updateHero(hero: Hero): Observable<Hero> {
  //   const url = `${this.heroesUrl}/${hero.id}`;
  //   return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
  //    tap(() => this.log(`obtido heroi id=${id}.`)),
  //   catchError(this.handleError<Hero>('getHero'))
  // }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      // loga no console
      console.log(error);
      // loga no message o erro
      this.log(`${operation} failed: ${error.message}`);
      // retornar um objeto do mesmo tipo de onde veio o erro
      return of(result as T);
    };
  }

}
