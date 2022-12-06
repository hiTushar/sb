import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './App.css'
import Stocks from './components/Stocks';
import Quotes from "./components/Quotes";
import ErrorPage from "./components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Stocks />,
    errorElement: <ErrorPage />
  },
  {
    path: "quotes/:stockId",
    element: <Quotes />
  }
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}
