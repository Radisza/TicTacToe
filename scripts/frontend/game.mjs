// import { createBoard } from "/scripts/frontend/board.mjs";
// import { createPlayer } from "/scripts/frontend/player.mjs";

import {createGame} from "/scripts/background/game.mjs";


export function createGameUI(board_size) {
    const players = [createPlayer('X'), createPlayer('O')];
    const board = createBoard(board_size);

    const new_game = () => {
        let stats = document.querySelector('.stats');
        players.forEach((player) =>  {
            stats.appendChild(player.create_html_elem())
        });

        let board_container = document.querySelector('.board_container');
        board_container.appendChild(board.create_html_elem());
    }

    return {new_game};
}
