import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import { ScreenLoader } from './components/ui/ScreenLoader';

const App = () => {
  return (
    <>
      <ScreenLoader />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
