// takes a time interval t in miliseconds and
// converts it into a readable string form
export default function formatTime(t: number): string {
    let seconds = Math.round(t / 1000);

    let minutes = Math.floor(seconds / 60);
    seconds = Math.round(seconds % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
