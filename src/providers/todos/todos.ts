import { Injectable } from '@angular/core';

/*
  Generated class for the TodosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodosProvider {

  constructor() {
    console.log('Hello TodosProvider Provider');
  }

  list() {
    return [{text: 'Wake up', complete: false}, {text: 'Drink coffee', complete: false}];
  }

  add(item) {

  }

  complete(item) {

  }

  delete(item) {

  }
}
