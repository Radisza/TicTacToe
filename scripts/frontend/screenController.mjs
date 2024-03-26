
import {createGame} from "/scripts/backend/game.mjs";
import {createPlayerStats} from "/scripts/frontend/player_stats.mjs";
import {createBoard} from "/scripts/frontend/board.mjs";

export function createScreenController(board_size) {
    const new_game = () => {
        let stats = document.querySelector('.stats');
        Object.entries(players).forEach(([_, player]) =>  {
            stats.appendChild(player.get_html_elem())
        });

        let board_container = document.querySelector('.board_container');
        board_container.appendChild(board.get_html_elem());
    }

    let game = createGame(board_size);
    const board = createBoard(board_size);
    const players = Object.fromEntries(
        game.get_players().map(
            (player) => [player.get_symbol(), createPlayerStats(player)]));


    new_game();

    return {new_game};
}
