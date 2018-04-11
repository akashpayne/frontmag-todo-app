import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import firebase from 'firebase';

/*
  Generated class for the TodosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodosProvider {

  constructor(public db: AngularFirestore) {
    console.log('Hello TodosProvider Provider');
  }

  list() {
    return this.db.collection('/todos', ref => ref.orderBy('complete').orderBy('text')).valueChanges();
  }

  add(text) {
    const id = this.db.createId();

    return this.db.collection('todos').doc(id).set({
      id: id,
      text: text,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  complete(todo) {
    return this.db.collection('todos').doc(todo.id).update({
      complete: todo.complete,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  delete(todo) {
    return this.db.collection('todos').doc(todo.id).delete();
  }
}
