import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";
import MealPlanPage from "./pages/MealPlanPage.tsx";
import CookBookPage from "./pages/CookBookPage.tsx";
import "./main.scss"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const root = document.getElementById("root");

if (!root) {
    throw new Error("Root element not found");
}

const queryClient = new QueryClient()

ReactDOM.createRoot(root).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MealPlanPage/>}/>
                <Route path="/cook-book" element={<CookBookPage/>}/>
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
);
