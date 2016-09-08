import { Todo } from './todo';
import { constants } from './constants';
import localStorageManager from './local_storage_manager';
import { MainUI } from './main_ui';

class Main{

  constructor(ui){
    this.todos = localStorageManager.getTodos();
    this.mainUI = ui; 
  }  

  init(){
    this.mainUI.initInputListener((description) => {
      this.newTodo(description);   
    }, (index) => {
      this.removeTodo(index);
    }, (index, isCompleted) => {
      this.markCompletedTodo(index, isCompleted);
    });
    this.mainUI.showTodoList(this.todos);
  }

  newTodo(description){
    let todo = new Todo(description);
    this.todos.push(todo);
    this.reloadTodos();
  }

  removeTodo(index){
    this.todos.splice(index, 1);
    this.reloadTodos();
  }

  markCompletedTodo(index){
    let todo = this.todos[index];
    if (todo.status === constants.TODO_STATUS_COMPLETED){
      todo.status = '';
    }else{
      todo.status = constants.TODO_STATUS_COMPLETED;
    }
    this.reloadTodos();
  }

  reloadTodos(){
    localStorageManager.updateTodos(this.todos);
    this.mainUI.showTodoList(this.todos);
  }

}

let ui = new MainUI();
let main = new Main(ui);
main.init();
