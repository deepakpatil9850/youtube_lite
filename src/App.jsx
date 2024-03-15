import { AppContext } from "./context/ContextApi";
import Feed from "./components/Feed";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import VideoDetails from "./components/VideoDetails";
import SearchResult from "./components/SearchResult";

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/video/:id",
        element: <VideoDetails />,
      },
      {
        path: "/searchResult/:searchQuery",
        element: <SearchResult />,
      },
    ],
  },
]);

const App = () => {
  return (
    <AppContext>
      <RouterProvider router={appRoute} />
    </AppContext>
  );
};

export default App;
