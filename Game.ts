export class Game {
    frames: Frame[] = [new Frame()];

    roll(pins: number): void {
        let currentFrame = this.getCurrentFrame();
        for (let frame of this.frames) {
            if (frame == currentFrame && !frame.isClosed()) currentFrame.roll(pins);
            else frame.addBonusRoll(pins);
        }
    }

    private getCurrentFrame() {
        let currentFrame = this.frames[this.frames.length - 1];
        if (currentFrame.isClosed() && this.frames.length < 10) {
            currentFrame = new Frame();
            this.frames.push(currentFrame);
        }
        return currentFrame;
    }

    score(){
        return this.frames.reduce((a, b) => a + b.frameScore(), 0);
    }
}

class Frame {
    rolls: number[] = [];
    bonusRolls: number[] = [];

    roll(pins: number): void {
        if (!this.isClosed()) this.rolls.push(pins);
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
