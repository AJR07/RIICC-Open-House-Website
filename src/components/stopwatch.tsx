import { useEffect, useState } from "react";
import formatTime from "../utils/formattime";

interface StopWatchProps {
    setTimeElapsed: React.Dispatch<React.SetStateAction<number>>;
    timeElapsed: number;
    timeout?: {
        value: number;
        callback: () => void;
    };
}

export default function StopWatch(props: StopWatchProps) {
    const [startTime] = useState(Date.now());
    const { timeElapsed, setTimeElapsed } = props;

    useEffect(() => {
        let interval = setInterval(() => {
            const x = Date.now() - startTime;
            setTimeElapsed(x);

            if (props.timeout && x > props.timeout.value) {
                props.timeout.callback();
            }
        }, 10);

        return () => {
            clearInterval(interval);
        };
    });

    return <div>Time Elapsed: {formatTime(timeElapsed)}</div>;
}
