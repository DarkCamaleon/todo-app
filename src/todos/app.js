import todoStore, { Filters } from '../store/todo.store';
import { renderTodos , renderPending } from '../user-cases';
import html from './app.html?raw'

// local storage es persistente a lo largo q viva la aplicacion
// sesion storage cuando cierran el navegador o apagan la pc se borran los datos

const ElementIds = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  ClearCompleted : '.clear-completed',
  TodoFilters : '.filtro',
  PendingCountLabel : '#pending-count',
};

/**
 *
 * @param {string } elementid
 */

export const App = ( elementid )=>{

  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIds.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount = () =>{
    renderPending( ElementIds.PendingCountLabel );
  };


  // funcion autoinvocada cuando la funcion app() se llama
  (()=>{

    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementid).append( app );
    displayTodos();


  })();

  //referencias html

  const newDescriptionInput = document.querySelector( ElementIds.NewTodoInput);
  const todoListUL = document.querySelector( ElementIds.TodoList );
  const clearCompleted = document.querySelector( ElementIds.ClearCompleted );
  const filtersLI = document.querySelectorAll( ElementIds.TodoFilters);

  //listeners

  newDescriptionInput.addEventListener('keyup', ( event )=>{
    if ( event.keyCode !==13) return;
    if ( event.target.value.trim().length === 0)return;

    todoStore.addTodo( event.target.value);
    displayTodos();
    event.target.value = '';
    // console.log(event);
  });

  todoListUL.addEventListener('click', ( event )=>{
    const element = event.target.closest("[data-id]");
    console.log(event.target.className);

    todoStore.toggleTodo( element.getAttribute('data-id'));
    displayTodos();
  });

  todoListUL.addEventListener("click", (event) => {
    const isDestroyElement = event.target.className === 'destroy';
    const element = event.target.closest("[data-id]");
    if ( !element || !isDestroyElement) return;

    todoStore.deleteTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  clearCompleted.addEventListener('click', ()=>{
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersLI.forEach(element => {
    element.addEventListener('click', (element) =>{
      filtersLI.forEach( el =>el.classList.remove("selected"));
      element.target.classList.add('selected');
      console.log(element.target.text.length);

      switch( element.target.text){
        case 'Todos':
          todoStore.setFilter( Filters.All );
          break;

        case 'Pendientes':
          todoStore.setFilter( Filters.Pending );
          break;

        case 'Completados':
          todoStore.setFilter( Filters.Completed );
          break;
      }

      displayTodos();
    });

  });



}

