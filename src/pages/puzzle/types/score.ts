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
