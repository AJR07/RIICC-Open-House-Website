import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import { NilScore, Score } from "./types/score";
import ScoreSubmission from "./scoresubmission";
import LeaderBoard from "../../components/leaderboard";
import puzzles from "../../puzzles/puzzles";

export default function PuzzlePicker() {
    let [score, setScore] = useState<Score | null>(null);
    let [gameID, setGameID] = useState<number | null>(null);
    let [username, setUsername] = useState<string | null>(null);

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
        return (
            <Stack>
                <Component setScore={setScore} />
                <Button
                    variant="outlined"
                    style={{ margin: "2em auto", width: "fit-content" }}
                    onClick={() => {
                        setScore(null);
                        setGameID(null);
                    }}
                >
                    Back to puzzles
                </Button>
            </Stack>
        );
    } else {
        const timedOut = score instanceof NilScore;
        return (
            <Stack direction="row">
                <Stack style={{ padding: "3vw", flex: "1", width: "100%" }}>
                    <h1 style={{ margin: 0 }}>
                        {timedOut ? "Time's up!" : "Game Over, You did it!"}
                    </h1>
                    {!timedOut && <h2>Score: {score.toString()}</h2>}
                    <p
                        dangerouslySetInnerHTML={{
                            __html: puzzles[gameID].debrief,
                        }}
                        style={{ textAlign: "justify" }}
                    ></p>
                    <br />
                    {!timedOut && (
                        <ScoreSubmission
                            score={score}
                            gameID={puzzles[gameID].name}
                            setUsername={setUsername}
                        />
                    )}
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
                    <LeaderBoard
                        gameID={puzzles[gameID].name}
                        showCurrentUser={username ?? undefined}
                    />
                </div>
            </Stack>
        );
    }
}
