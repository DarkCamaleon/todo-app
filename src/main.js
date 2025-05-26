import './style.css'
import { App } from './todos/app';
import allStore from './store/todo.store';

allStore.initStore();

App('#app');