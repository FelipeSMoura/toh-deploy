import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero.model';
import { HeroService } from './hero.service';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const heroes: Hero[] = [
      { id: 1, name: 'heroi1' },
      { id: 2, name: 'heroi2' },
      { id: 3, name: 'heroi3' },
      { id: 4, name: 'heroi4' },
      { id: 5, name: 'heroi5' },
      { id: 6, name: 'heroi6' }
      ];

    return { heroes };
  }

  genId(heroes: Hero[]): number {
    const heroIds = heroes.map(hero => hero.id);
    const maxId = Math.max(...heroIds);

    const nextId = heroes && heroes.length > 0 ? maxId + 1 : 1;

    return nextId;
  }

  constructor() { }
}
