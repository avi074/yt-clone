import { createRoot } from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router"
import { Provider } from "react-redux"
import routes from "./router.jsx"
import ytStore from "./redux/ytStore.js"

createRoot(document.getElementById("root")).render(
  <Provider store={ytStore}>
    <RouterProvider router={routes} />
  </Provider>,
)
