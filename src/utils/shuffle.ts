/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
export default function shuffle<T>(a: T[]): void {
    let j: number, x: T, i: number;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}
