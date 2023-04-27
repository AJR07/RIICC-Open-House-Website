// takes a time interval t in miliseconds and
// converts it into a readable string form
export default function formatTime(t: number): string {
    const minutes = Math.floor(Math.round(t / 1000) / 60);
    const seconds = (t / 1000) % 60;

    return `${minutes}:${seconds.toFixed(2).padStart(5, "0")}`;
}
