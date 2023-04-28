import { Stack } from "@mui/material";
import LeaderBoard from "../../components/leaderboard";
import puzzles from "../../puzzles/puzzles";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
    let [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.onresize = () => {
            setWidth(window.innerWidth);
        };
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: "center", fontSize: "50px" }}>
                Leaderboards for RIICC Puzzle Challenge!
            </h1>
            <Stack
                direction="row"
                style={{ width: "100%" }}
                spacing={width / 10}
            >
                {puzzles.map((puzzle, index) => {
                    let name = puzzle.name;
                    return (
                        <Stack
                            id={`puzzle-${name}`}
                            key={index}
                            style={{ margin: "1vw", width: "100%" }}
                        >
                            <h1 style={{ textAlign: "center" }}>{name}</h1>
                            <LeaderBoard gameID={name} showTopThree={true} />
                        </Stack>
                    );
                })}
            </Stack>
        </div>
    );
}
