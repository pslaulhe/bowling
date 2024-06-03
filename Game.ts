export class Game{
    totalScore = 0;
    roll(pins: number): void {
        this.totalScore += pins;
    }

    score(): number {
        return this.totalScore;
    }
}
