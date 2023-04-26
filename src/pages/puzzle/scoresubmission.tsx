import { TextField, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Score } from "./types/score";
import { getDatabase, ref, set } from "firebase/database";
import firebaseApp from "../../utils/firebase";
import LeaderBoard from "../../components/leaderboard";
import LeaderBoardData from "../../types/leaderboarddata";

const db = getDatabase(firebaseApp);

interface ScoreSubmissionProps {
    score: Score;
    gameID: string;
}

export default function ScoreSubmission(props: ScoreSubmissionProps) {
    let [name, setName] = useState<string>("");
    let [submitted, setSubmitted] = useState<boolean>(false);

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
                            let date =
                                new Date()
                                    .toLocaleDateString("en-SG", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })
                                    .replaceAll("/", "-") +
                                new Date().toLocaleString("en-SG", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                    hour12: false,
                                });
                            set(ref(db, `game/${props.gameID}/${date}`), {
                                name: name,
                                score: props.score.value,
                                date: date,
                            } as LeaderBoardData);
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
                <LeaderBoard gameID={props.gameID} />
            </Stack>
        );
    }
}
