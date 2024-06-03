export class Game{
    totalScore = 0;
    rolls: number[] = [];

    roll(pins: number): void {
        console.log(pins);

        if (this.rolls.length >= 2 && this.rolls.length % 2 == 0 && this.rolls[this.rolls.length - 2] + this.rolls[this.rolls.length - 1] == 10) {
            console.log('spare');
            this.totalScore += pins * 2;
        }
        else {
            this.totalScore += pins;
        }

        this.rolls.push(pins);
    }

    score(): number {
        return this.totalScore;
    }
}
