import { useEffect, useState } from "react";
import formatTime from "../utils/formattime";

interface StopWatchProps {
    setTimeElapsed: React.Dispatch<React.SetStateAction<number>>;
    timeElapsed: number;
}

export default function StopWatch(props: StopWatchProps) {
    const [startTime] = useState(Date.now());
    const { timeElapsed, setTimeElapsed } = props;

    useEffect(() => {
        let interval = setInterval(() => {
            setTimeElapsed(Date.now() - startTime);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    return <div>Time Elapsed: {formatTime(timeElapsed)}</div>;
}
