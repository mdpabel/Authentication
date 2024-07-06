import { User } from '@repo/schema';

const App = () => {
  const user: User = {
    id: 1,
    name: 'John',
  };

  console.log(user);

  return <div>App</div>;
};

export default App;
