import { Todo } from "../models/todo.model"


const Filters = {
  All : 'All',
  Completed : 'Completed',
  Pending : 'Pending',
}

const state = {
  todos:[
    new Todo('piedra del alma'),
    new Todo('piedra del infinito'),
    new Todo('piedra del tiempo'),
    new Todo('piedra del poder'),
    new Todo('piedra del campo'),

  ],
  filter: Filters.All,
}

const initStore = () =>{
  loadStore();
  console.log(state);
  console.log('initistore');

}

const loadStore = () => {
  if( !localStorage.getItem('state'))return;

  const { todos = [] , filter = Filters.All } = JSON.parse( localStorage.getItem('state'));
  state.todos = todos;
  state.filter = filter;

}
// JSON.stringify es un método de JavaScript que convierte valores de tipo JavaScript (objetos, arrays, primitivas) en una cadena de texto con formato JSON. Esto es útil cuando necesitas:

// Enviar datos desde el cliente al servidor (por ejemplo, en una petición fetch o XMLHttpRequest).

// Almacenar datos complejos en localStorage o sessionStorage.

// Registrar (log) estructuras de datos para depuración.
const saveStateToLocalStore = () =>{
  // console.log( JSON.stringify(state));
  localStorage.setItem('state', JSON.stringify(state));

};

// JSON.parse es el método complementario a JSON.stringify: toma una cadena de texto en formato JSON y la convierte de nuevo en valores de JavaScript (objetos, arrays, primitivas).

// JSON.stringify → convierte JavaScript → JSON (string).

// JSON.parse → convierte JSON (string) → JavaScript.

const getTodos = ( filter = Filters.All) =>{

  switch ( filter ){
    case Filters.All:
      return [...state.todos];

    case Filters.Completed:
      return state.todos.filter( todo => todo.done );

    case Filters.Pending:
      return state.todos.filter( todo => !todo.done );

    default :
      throw new Error(`option ${ filter } is not valid`);
  }

}

const addTodo = ( descripcion )=>{
  if ( !descripcion ) throw new Error('description is required');
  state.todos.push( new Todo ( descripcion));
  saveStateToLocalStore();
}

const toggleTodo = ( todoId )=>{
  state.todos = state.todos.map( todo => {
    if ( todo.id === todoId ){
      todo.done = !todo.done;
    }
    return todo;
  });
  saveStateToLocalStore();
}

const deleteTodo = ( todoId ) => {
  state.todos = state.todos.filter( todo => todo.id !== todoId);
  saveStateToLocalStore();
};

const deleteCompleted = ()=>{
  state.todos = state.todos.filter((todo) => todo.done);
  saveStateToLocalStore();
}

const setFilter = ( newFilter = Filters.All )=>{
  state.filter = newFilter;
  saveStateToLocalStore();
}

const getCurrentFilter = (  )=>{
  return state.filter;
}

export default {
  initStore,
  loadStore,
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
  setFilter,
  getCurrentFilter,
  getTodos,
};