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

// used when user runs out of time
export class NilScore extends Score {
    constructor() {
        super(Number.NaN);
    }

    toString(): string {
        return "NilScore";
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
            case "Trace Dot":
                return a - b; //smaller is better
            default:
                return a - b; // default to smaller = better
        }
    };
}
