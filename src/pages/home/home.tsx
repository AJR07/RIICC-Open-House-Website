import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
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
            <img
                src="/logo.png"
                alt="logo"
                width="200px"
                height="200px"
                style={{ border: "solid white" }}
            />
            <h1>Instructions for Open House Puzzles </h1>
            <body style={{ textAlign: "center" }}>
                Welcome to RIICC's Open House Puzzle/Game Website! We have
                designed 3 games for you to try out.
                <br />
                Each game is specifically designed to test your problem solving
                skills, logical thinking or other skill-sets related to
                programming.
                <br />
                The website will ask for your name after each game, after which
                your obtained score could be recorded under your name, so you
                can see how you compare to others!
            </body>
            <h2>Most importantly, HAVE FUN!</h2>
            <Stack spacing={5}>
                <Button variant="contained" onClick={() => navigate("/puzzle")}>
                    Go to Puzzle
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate("/leaderboard")}
                >
                    Go to Leaderboards
                </Button>
            </Stack>
        </Stack>
    );
}
