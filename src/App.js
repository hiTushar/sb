import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './App.css'
import Stocks from './components/Stocks';
import Quotes from "./components/Quotes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Stocks />,
  },
  {
    path: "quotes/:stockId",
    element: <Quotes />,
  }
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}
