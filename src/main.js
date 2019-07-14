import App from './App.svelte';
import './styles/main.sass';
import './registerSW';

const app = new App({
  target: document.body
});

export default app;
