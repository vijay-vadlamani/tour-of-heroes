import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';



@Injectable()
export class HeroService {

  private baseUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
  ) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.baseUrl)
                    .toPromise()
                    .then(response => response.json().data as Hero[])
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  // Implementation of getting the data with latency do mimic real life data
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
                    .toPromise()
                    .then(response => response.json().data as Hero)
                    .catch(this.handleError);
  }

  update(hero: Hero) {
    const url = `${this.baseUrl}/${hero.id}`;
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
               .toPromise()
               .then(() => hero)
               .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
  return this.http
    .post(this.baseUrl, JSON.stringify({name: name}), {headers: this.headers})
    .toPromise()
    .then(res => res.json().data as Hero)
    .catch(this.handleError);
}

  delete(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.http
               .delete(url, {headers: this.headers})
               .toPromise()
               .then(() => null)
               .catch(this.handleError);
  }

}
