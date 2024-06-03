export class Game{
    totalScore = 0;
    rolls: number[] = [];

    roll(pins: number): void {
        let currentRollScore = pins;

        if (this.rolls.length > 0 && this.rolls[this.rolls.length - 1] == 10) {
            currentRollScore += pins;
        }
        if (this.rolls.length > 1 && this.rolls[this.rolls.length - 2] == 10){
            currentRollScore += pins;
        }

        if (this.rolls.length > 1 && this.rolls.length % 2 == 0 &&
            (this.rolls[this.rolls.length - 1] < 10 && this.rolls[this.rolls.length - 2] < 10 && this.rolls[this.rolls.length - 2] + this.rolls[this.rolls.length - 1] == 10)) {
            console.log('spare');
            currentRollScore += pins;
        }

        console.log('roll score ' + currentRollScore);
        this.totalScore += currentRollScore;
        this.rolls.push(pins);
    }

    score(): number {
        return this.totalScore;
    }
}
