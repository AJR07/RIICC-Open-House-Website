import formatTime from "../../../utils/formattime";

export abstract class Score {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    abstract toString(): string;
}

export class CountScore extends Score {
    toString(value = this.value): string {
        return `${value} tries`;
    }
}

export class TimeScore extends Score {
    toString(value = this.value): string {
        return formatTime(value);
    }
}

// returns a callback that returns negative if a is _better_ score than b
export function compareScoreValue(
    gameID: string
): (a: number, b: number) => number {
    return (a: number, b: number): number => {
        switch (gameID) {
            case "Light Switch Game":
                return a - b; // smaller is better
            case "Maze":
                return a - b; //smaller is better
            default:
                return b - a; // default to bigger = better
        }
    };
}
