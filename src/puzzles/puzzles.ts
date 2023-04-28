import Puzzle from "../pages/puzzle/types/puzzle";
import LightSwitchGameDetails from "./lightswitchgame/game";
import MazeGameDetails from "./mazegame/game";
import FindTheDotDetails from "./findthedot/game";

const puzzles: Puzzle[] = [
    LightSwitchGameDetails,
    MazeGameDetails,
    FindTheDotDetails,
];

export default puzzles;
