import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/home";
import PuzzlePicker from "./puzzle/puzzlepicker";
import LeaderBoard from "../components/leaderboard";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/puzzle" element={<PuzzlePicker />} />
            </Routes>
        </BrowserRouter>
    );
}
