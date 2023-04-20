import { useEffect, useState } from "react";
import Puzzle from "../../pages/puzzle/types/puzzle";
import formatTime from "../../utils/formattime";
import { MazeData } from "./maze";

interface MazeGameProps {
    setScore: React.Dispatch<React.SetStateAction<number>>;
}

const ROWS = 20;
const COLS = 20;

function MazeGame(props: MazeGameProps) {
    const [maze] = useState(new MazeData(ROWS, COLS));

    const gridSqSize = "20px";

    const borderStyle = "1px solid white";
    const noBorderStyle = "none";

    const [startTime] = useState(Date.now());
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            setTimeElapsed(Date.now() - startTime);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    const divs = [];
    for (let i = 0; i < maze.height; i++) {
        for (let j = 0; j < maze.width; j++) {
            divs.push(
                <div
                    key={`${i}-${j}`}
                    style={{
                        position: "absolute",
                        top: `calc(${gridSqSize} * ${i})`,
                        left: `calc(${gridSqSize} * ${j})`,
                        width: gridSqSize,
                        height: gridSqSize,

                        borderTop: maze.hasWall(i, j, "top")
                            ? borderStyle
                            : noBorderStyle,
                        borderBottom: maze.hasWall(i, j, "bottom")
                            ? borderStyle
                            : noBorderStyle,
                        borderLeft: maze.hasWall(i, j, "left")
                            ? borderStyle
                            : noBorderStyle,
                        borderRight: maze.hasWall(i, j, "right")
                            ? borderStyle
                            : noBorderStyle,
                    }}
                ></div>
            );
        }
    }

    return (
        <div
            style={{
                position: "relative",
                width: `calc(${gridSqSize} * ${maze.width})`,
                height: `calc(${gridSqSize} * ${maze.height})`,
            }}
        >
            <p>Time elapsed: {formatTime(timeElapsed)}</p>
            {divs}
        </div>
    );
}

const MazeGameDetails: Puzzle = {
    name: "Maze",
    description: "Find the way to the exit in the fastest time possible!",
    icon: "",
    component: MazeGame,
};

export default MazeGameDetails;
