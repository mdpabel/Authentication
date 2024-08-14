import env from '../env';
import app from './server';

const port = env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
