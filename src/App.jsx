import { AppContext } from "./context/ContextApi";
import Feed from "./components/Feed";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [{ path: "/", element: <Feed /> }],
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
