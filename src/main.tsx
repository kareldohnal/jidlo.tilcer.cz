import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";
import MealPlanPage from "./pages/MealPlanPage.tsx";
import CookBookPage from "./pages/CookBookPage.tsx";
import "./main.scss"

const root = document.getElementById("root");

if (!root) {
    throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MealPlanPage />} />
            <Route path="/cook-book" element={<CookBookPage />} />
        </Routes>
    </BrowserRouter>
);
