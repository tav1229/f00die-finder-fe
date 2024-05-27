import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(routes);

function App() {
    return (
        <div>
            <RouterProvider router={router} />
            <ToastContainer />
        </div>
    );
}

export default App;
