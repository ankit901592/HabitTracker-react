import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import NavBar from "./Nav/nav";
import { store } from "./Redux/store";
import { HabbitList } from "./Pages/Habit list/habitlist";
import { WeeklyHabits } from "./Pages/Habit details/Weekly habbit details";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        { index: true, element: <HabbitList /> },
        { path: "/WeekList", element: <WeeklyHabits /> },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
