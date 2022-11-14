import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './App.css'
import Stocks from './components/Stocks';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Stocks />,
  },
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}
