import { Button, Stack } from "@mui/material";
import Puzzle from "./types/puzzle";
import { useState } from "react";
import LightSwitchGameDetails from "../../puzzles/lightswitchgame/game";
import { motion } from "framer-motion";
import MazeGameDetails from "../../puzzles/mazegame/game";
import { Score } from "./types/score";
import ScoreSubmission from "./scoresubmission";
import LeaderBoard from "../../components/leaderboard";

const puzzles: Puzzle[] = [LightSwitchGameDetails, MazeGameDetails];

export default function PuzzlePicker() {
    let [score, setScore] = useState<Score | null>(null);
    let [gameID, setGameID] = useState<number | null>(null);

    if (gameID == null) {
        return (
            <Stack
                direction="column"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    paddingLeft: "10%",
                    paddingRight: "10%",
                }}
            >
                <h1>Choose your Puzzle!</h1>
                <Stack direction="column" spacing={3}>
                    {puzzles.map((puzzle, index) => {
                        let Icon = puzzle.icon;
                        return (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                key={index}
                                onClick={() => setGameID(index)}
                                style={{
                                    width: "90%",
                                    backgroundColor: "#23a5ff",
                                    padding: "2vw",
                                    borderRadius: "10px",
                                }}
                            >
                                <Stack direction="row" spacing={3}>
                                    <Icon />
                                    <h2>{puzzle.name}</h2>
                                </Stack>
                                <p>{puzzle.description}</p>
                            </motion.div>
                        );
                    })}
                </Stack>
            </Stack>
        );
    } else if (!score) {
        let Component = puzzles[gameID].component;
        return <Component setScore={setScore} />;
    } else {
        return (
            <Stack direction="row">
                <Stack style={{ padding: "3vw", flex: "1", width: "100%" }}>
                    <h1 style={{ margin: 0 }}> Game Over, You did it!</h1>
                    <h2>Score: {score.toString()}</h2>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: puzzles[gameID].debrief,
                        }}
                        style={{ textAlign: "justify" }}
                    ></p>
                    <br />
                    <ScoreSubmission
                        score={score}
                        gameID={puzzles[gameID].name}
                    />
                    <Button
                        variant="contained"
                        style={{ marginTop: "2em" }}
                        onClick={() => {
                            setScore(null);
                            setGameID(null);
                        }}
                    >
                        Back to puzzles
                    </Button>
                </Stack>
                <div style={{ flex: "1", width: "100%" }}>
                    <LeaderBoard gameID={puzzles[gameID].name} />
                </div>
            </Stack>
        );
    }
}
