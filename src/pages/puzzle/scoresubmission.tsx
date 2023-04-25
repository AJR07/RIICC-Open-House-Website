import { TextField, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Score } from "./types/score";
import { getDatabase, ref, set } from "firebase/database";
import firebaseApp from "../../utils/firebase";
import LeaderBoard from "../../components/leaderboard";

const db = getDatabase(firebaseApp);

interface ScoreSubmissionProps {
    score: Score;
    gameID: string;
}

export default function ScoreSubmission(props: ScoreSubmissionProps) {
    let [name, setName] = useState<string>("");
    let [submitted, setSubmitted] = useState<boolean>(false);

    useEffect(() => {
        set(
            ref(
                db,
                `game/${props.gameID}/${new Date()
                    .toLocaleDateString("en-SG")
                    .replaceAll("/", "-")}`
            ),
            {
                name: name,
                score: props.score.toString(),
                date: Date.now(),
            }
        );
    }, [submitted]);

    if (!submitted) {
        return (
            <Stack
                id="score-register-form"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#23a5ff",
                    marginLeft: "20vw",
                    marginRight: "20vw",
                    borderRadius: "1vw",
                    padding: "1vw",
                }}
            >
                <h3 style={{ color: "black" }}>
                    To register your score on the leaderboard, enter your name
                    (and press enter)):
                </h3>
                <TextField
                    label="Name"
                    variant="filled"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        if (event.key === "Enter" && name !== "") {
                            setSubmitted(true);
                        }
                    }}
                />
            </Stack>
        );
    } else {
        return (
            <Stack style={{ display: "flex", justifyContent: "center" }}>
                <h5>Successfully recorded!</h5>
                <LeaderBoard />
            </Stack>
        );
    }
}
