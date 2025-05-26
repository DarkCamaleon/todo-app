import todoStore from '../store/todo.store';
import { renderTodos } from '../user-cases';
import html from './app.html?raw'


const ElementIds = {
  TodoList : '.todo-list',
}

/**
 *
 * @param {string } elementid
 */

export const App = ( elementid )=>{

  // funcion autoinvocada cuando la funcion app() se llama
  (()=>{

    const displayTodos = () => {
      const todos = todoStore.getTodos( todoStore.getCurrentFilter());
      renderTodos( ElementIds.TodoList, todos );
      console.log(todos );
    }

    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementid).append( app );
    displayTodos();


  })();




}