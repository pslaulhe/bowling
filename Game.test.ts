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


    it.each(
        [
            [[5, 5, 4, 5, 0, 0, 6, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 39],
            [[0, 2, 7, 3, 7, 3, 4, 5, 6, 4, 4, 4, 0, 0, 0, 0, 0, 0, 5, 4], 73],
            [[9, 1, 9, 0, 6, 4, 0, 0, 0, 0, 5, 1, 3, 7, 1, 0, 0, 0, 0, 9], 65],
        ]
    )('spares %p: %p', (rolls, score)=>{
        const game = new Game();
        rolls.forEach(roll => game.roll(roll));

        expect(game.score()).toBe(score);
    });



    it.each(
        [
            [[10, 4, 5, 10, 6, 4, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 78],
            [[10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 0], 267],
            [[10, 0, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0], 50],
        ]
    )('strikes %p: %p', (rolls, score)=>{
        const game = new Game();
        rolls.forEach(roll => game.roll(roll));

        expect(game.score()).toBe(score);
    });

});
