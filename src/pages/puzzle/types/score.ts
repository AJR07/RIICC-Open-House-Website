import formatTime from "../../../utils/formattime";

export abstract class Score {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    abstract toString(): string;
}

export class CountScore extends Score {
    toString(): string {
        return `${this.value}`;
    }
}

export class TimeScore extends Score {
    toString(): string {
        return formatTime(this.value);
    }
}
