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
  console.log(state);
  console.log('initistore');

}

const loadStore = () => {
  throw new Error(' no implementado');

}

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
}

const toggleTodo = ( todoId )=>{
  state.todos = state.todos.map( todo => {
    if ( todo.id === todoId ){
      todo.done = !todo.done;
    }
    return todo;
  });
}

const deleteTodo = ( todoId ) => {
  state.todos = state.todos.filter( todo => todo.id !== todoId);
};

const deleteCompleted = ()=>{
  state.todos = state.todos.filter((todo) => todo.done);
}

const setFilter = ( newFilter = Filters.All )=>{
  state.filter = newFilter;
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