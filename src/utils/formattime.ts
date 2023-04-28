// takes a time interval t in miliseconds and
// converts it into a readable string form
export default function formatTime(t: number, nearestSecond = false): string {
    const minutes = Math.floor(Math.round(t / 1000) / 60);
    const seconds = (t / 1000) % 60;

    if (nearestSecond)
        return `${minutes}:${seconds.toFixed(0).padStart(2, "0")}`;
    else return `${minutes}:${seconds.toFixed(2).padStart(5, "0")}`;
}
