

export const createTodoHtml = ( todo )=>{
  if ( !todo ) throw new Error('A TODO object is required');

  const html = `<h1> ${ todo.descripcion } </h1>`;
  console.log(todo)

  const liElement = document.createElement('li');
  liElement.innerHTML = html;


  return liElement;
}