import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TodosProvider } from '../../providers/todos/todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TodosProvider]
})
export class HomePage {

  public todos: Array<any> = [];
  public todo: String = '';

  constructor(public navCtrl: NavController, public todosProvider: TodosProvider) {
    this.todos = this.todosProvider.list();
  }

  addTodo() {
    if (!this.todo) {
      return;
    }

    this.todos.push({text: this.todo, complete: false});

    this.todosProvider.add(this.todo);
  }

  completeTodo(todo) {
    this.todosProvider.complete(todo);
  }

  deleteTodo(todo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);

    this.todosProvider.delete(todo);
  }
}
