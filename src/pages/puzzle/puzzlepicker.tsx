import { Button, Stack } from "@mui/material";
import Puzzle from "./types/puzzle";
import { useState } from "react";
import LightSwitchGameDetails from "../../puzzles/lightswitchgame/game";
import { motion } from "framer-motion";

const puzzles: Puzzle[] = [LightSwitchGameDetails];

export default function PuzzlePicker() {
    let [score, setScore] = useState<number>(0);
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
                <Stack direction="row">
                    {puzzles.map((puzzle, index) => {
                        return (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                key={index}
                                onClick={() => setGameID(index)}
                                style={{
                                    width: "10vw",
                                    backgroundColor: "#23a5ff",
                                    padding: "2vw",
                                    borderRadius: "10px",
                                }}
                            >
                                <h2>{puzzle.name}</h2>
                                <p>{puzzle.description}</p>
                            </motion.div>
                        );
                    })}
                </Stack>
            </Stack>
        );
    } else {
        let Component = puzzles[gameID].component;
        return <Component setScore={setScore} />;
    }
}
