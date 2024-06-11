import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routers";
import { ToastContainer } from "react-toastify";
import { MantineProvider } from "@mantine/core";
import "react-toastify/dist/ReactToastify.css";
import "@mantine/core/styles.css";

const router = createBrowserRouter(routes);

function App() {
    return (
        <MantineProvider>
            <div>
                <RouterProvider router={router} />
                <ToastContainer />
            </div>
        </MantineProvider>
    );
}

export default App;
