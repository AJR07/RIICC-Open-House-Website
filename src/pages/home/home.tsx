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
            <h1>Instructions for Open House Puzzles </h1>
            <body>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tempora modi enim consectetur quam ex quisquam aspernatur
                consequatur atque veniam, suscipit deleniti iusto nam nesciunt
                maxime excepturi molestias qui officiis minus quo rerum non
                blanditiis? Tempora dolor nisi quasi perferendis non, laudantium
                nam vel impedit eum cupiditate! Quam culpa magni numquam.
            </body>
            <Button variant="contained" onClick={() => navigate("/puzzle")}>
                Go to Puzzle
            </Button>
        </Stack>
    );
}
