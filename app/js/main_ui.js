import { constants } from './constants';

export class MainUI{
 
  initInputListener(newTodoCallback, removeTodoCallback, markCompletedTodoCallback){
    document.querySelector('.app-insert input')
      .addEventListener('keyup', evt => this.keyUpPressed(evt, newTodoCallback) );
    document.querySelector('.app-list').
      addEventListener('click', evt => this.todoClicked(evt, removeTodoCallback, markCompletedTodoCallback) );
  }
 
  keyUpPressed(evt, newTodoCallback){
    if ( evt.which === constants.KEY_CODE.ENTER && evt.target.value !== '' ) {
      newTodoCallback(evt.target.value);
      evt.target.value = ''; 
    }
  }

  todoClicked(evt, removeTodoCallback, markCompletedTodoCallback){
    let classList = evt.target.classList;
    let index = Number.parseInt(classList[1]);
    if ( classList.contains('remove-task') ) {
      this.removeTask(evt.target.parentNode);
      removeTodoCallback(index);
    } else if ( classList.contains('task') ) {
      this.completeTask(evt.target);
      markCompletedTodoCallback(index)
    }
  }

  removeTask(task){
    task.style.opacity = 0;
    setTimeout(() => {
      task.remove();
    }, 400);
  }

  completeTask(task){
    task.classList.toggle('task-complete');
  }

  showTodoList(todos){
    let list = document.querySelector('.app-list ul');
    list.innerHTML = '';
    todos.forEach( (todo, index) => {
      let newTodo = document.createElement('li');
      let classElement = `task ${index}`; 
      if(todo.status === constants.TODO_STATUS_COMPLETED){
        classElement += ' task-complete';
      }
      newTodo.setAttribute('class', classElement);
      newTodo.innerHTML = todo.description + `<a class="remove-task ${index}">remove</a>`;
      list.appendChild(newTodo);
    });
  }
}
