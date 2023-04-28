import Puzzle from "../pages/puzzle/types/puzzle";
import LightSwitchGameDetails from "./lightswitchgame/game";
import MazeGameDetails from "./mazegame/game";
import TraceDotDetails from "./tracedot/game";

const puzzles: Puzzle[] = [
    LightSwitchGameDetails,
    MazeGameDetails,
    TraceDotDetails,
];

export default puzzles;
