import {Game} from "./Game";

describe('Game', () => {

    it.each(
        [
            [[4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 8],
            [[4, 5, 4, 3, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], 31],
            [[4, 5, 4, 3, 6, 0, 0, 0, 0, 0, 5, 1, 3, 2, 0, 0, 0, 0, 0, 9], 42],
        ]
    )('no spares or strikes', (rolls, score)=>{
        const game = new Game();
        rolls.forEach(roll => game.roll(roll));

        expect(game.score()).toBe(score);
    });
});
