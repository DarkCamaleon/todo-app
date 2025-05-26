import { Todo } from "../models/todo.model";
import { createTodoHtml } from "./";

export const renderTodos = ( elementId , todos = []) =>{


  const element = document.querySelector( elementId );
  todos.forEach( todo => {
    element.append( createTodoHtml(todo));

  });
};