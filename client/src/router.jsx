import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Home from "./pages/Home"
import Watch from "./pages/Watch"
import Search from "./pages/Search"
import NotFound from "./pages/NotFound"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index:true,
        element: <Home />
      },
      {
        path:'search/:query',
        element:<Search />
      },
      {
        path:"watch/:videoId",
        element:<Watch />
      }
      
    ],
  },
])

export default routes
