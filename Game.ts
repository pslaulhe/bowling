export class Game {
    totalScore = 0;
    rolls: number[] = [];
    midFrame: boolean = false;
    framesCount = 0;
    extraRollNumber = 0;

    rollOld(pins: number): void {
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

    frames: Frame[] = [];
    roll(pins: number): void {
        let currentFrame;
        if (this.frames.length > 0) {
            currentFrame = this.frames[this.frames.length - 1];
        }
        else {
            currentFrame = new Frame();
            this.frames.push(currentFrame);
        }

        if (currentFrame.isClosed()) {
            currentFrame = new Frame();
            this.frames.push(currentFrame);
        }

        const prevFrame = this.frames.length > 1 ? this.frames[this.frames.length - 2] : null;
        const prevPrevFrame = this.frames.length > 2 ? this.frames[this.frames.length - 3] : null;

        currentFrame.roll(pins);
        prevFrame?.addBonusRoll(pins);
        prevPrevFrame?.addBonusRoll(pins);
    }

    scoreOld(): number {
        return this.totalScore;
    }

    score(){
        return this.frames.reduce((a, b) => a + b.frameScore(), 0);
    }
}

class Frame {
    rolls: number[] = [];
    bonusRolls: number[] = [];

    roll(pins: number): void {
        this.rolls.push(pins);
    }

    isClosed(): boolean {
        return this.rolls.length == 2 || this.isStrike();
    }

    isSpare(): boolean {
        return this.rolls.length == 2 && this.rollsScore() == 10;
    }

    isStrike(): boolean {
        return this.rolls.length == 1 && this.rollsScore() == 10;
    }

    addBonusRoll(pins: number): void {
        if (this.isSpare() && this.bonusRolls.length < 1) this.bonusRolls.push(pins);
        if (this.isStrike() && this.bonusRolls.length < 2) this.bonusRolls.push(pins);
    }

    rollsScore(){
        return this.rolls.reduce((a, b) => a + b, 0);
    }
    frameScore(): number {
        const bonusScore = this.bonusRolls.reduce((a, b) => a + b, 0);
        return this.rollsScore() + bonusScore;
    }
}
