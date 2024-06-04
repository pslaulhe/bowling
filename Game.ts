export class Game{
    totalScore = 0;
    rolls: number[] = [];
    midFrame: boolean = false;
    framesCount = 0;
    extraRollNumber = 0;

    roll(pins: number): void {
        let currentRollScore = this.framesCount < 10 ? pins : 0;
        if (this.framesCount == 10) {
            this.extraRollNumber += 1;
        }

        if (this.rolls.length > 0 && this.rolls[this.rolls.length - 1] == 10 && this.extraRollNumber < 2) {
            currentRollScore += pins;
        }
        if (this.rolls.length > 1 && this.rolls[this.rolls.length - 2] == 10){
            currentRollScore += pins;
        }

        if (this.rolls.length > 1 && !this.midFrame &&
            (this.rolls[this.rolls.length - 1] < 10 && this.rolls[this.rolls.length - 2] < 10 && this.rolls[this.rolls.length - 2] + this.rolls[this.rolls.length - 1] == 10)) {
            console.log('spare');
            currentRollScore += pins;
        }

        console.log('roll score ' + currentRollScore);
        if (!this.midFrame && pins < 10) {
            this.midFrame = true;
        }
        else if (this.midFrame) {
            this.midFrame = false;
            this.framesCount += 1;
        }
        else if (this.framesCount < 10) {
            this.framesCount += 1;
        }

        this.totalScore += currentRollScore;
        this.rolls.push(pins);
    }

    score(): number {
        return this.totalScore;
    }
}
