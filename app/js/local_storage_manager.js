import { constants } from './constants';
import { Todo } from './todo';

class LocalStorageManager{

  updateTodos(todos){
    let todosSerialized = JSON.stringify(todos);
    localStorage.setItem(constants.LOCALSTORAGE_TODO_KEY, todosSerialized);
  }

  getTodos(){
    let data = localStorage.getItem(constants.LOCALSTORAGE_TODO_KEY); 
    if ( data !== null ) {
      let todos = JSON.parse(data); 
      return todos.map( (item) => new Todo(item.description, item.status)  );
    }
    return [];
  }

}

const localStorageManager = new LocalStorageManager();
Object.freeze(localStorageManager);

export default localStorageManager;
