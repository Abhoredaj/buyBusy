import { createBrowserRouter,RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import {Cart} from "./Pages/Cart";
import {MyOrder} from "./Pages/MyOrder";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Error } from "./Pages/Error";
import Navbar from "./components/Navbar/Navbar";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { ProductContext } from "./context/productContext";

function App() {

  const router = createBrowserRouter([
    {
      path:"/", 
      element: <Navbar />,
      errorElement: <Error />,
      children:[
        { index:true, element: <Login />},
        { path:"/home", element: <Home />},
        { path:"/myorder", element: <MyOrder />},
        { path:"/cart", element: <Cart />},
        { path:"/signup", element: <Signup />},
      ]
    }
  ]);
  return ( 
          <UserAuthContextProvider>
            <ProductContext>
              <RouterProvider router={router} /> 
            </ProductContext>
          </UserAuthContextProvider>
  );
}

export default App;