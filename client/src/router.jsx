import { createBrowserRouter } from "react-router-dom"
import { lazy, Suspense } from "react"
import Loader from "./components/Loader"

const App = lazy(() => import("./App"))
const Home = lazy(() => import("./pages/Home"))
const Watch = lazy(() => import("./pages/Watch"))
const Search = lazy(() => import("./pages/Search"))
const NotFound = lazy(() => import("./pages/NotFound"))
const CreateChannel = lazy(() => import("./pages/channel/CreateChannel"))
const Channel = lazy(() => import("./pages/channel/Channel"))

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "search/:query",
        element: (
          <Suspense fallback={<Loader />}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "watch/:videoId",
        element: (
          <Suspense fallback={<Loader />}>
            <Watch />
          </Suspense>
        ),
      },
      {
        path: "channel/new",
        element: (
          <Suspense fallback={<Loader />}>
            <CreateChannel />
          </Suspense>
        ),
      },
      {
        path: "channel/:channelId",
        element: (
          <Suspense fallback={<Loader />}>
            <Channel />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
])

export default routes
