import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import './index.css';
import { routeTree } from './routeTree.gen';
import { useAuth } from './context/auth-context';
import Providers from './providers';

const router = createRouter({
  routeTree,
  context: { auth: undefined! },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Providers>
      <App />
    </Providers>,
  );
}

function App() {
  const auth = useAuth();
  return (
    <RouterProvider
      context={{
        auth,
      }}
      router={router}
    />
  );
}
