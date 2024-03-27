
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

    const set_hover_effect = (table) => {
        table.addEventListener('mouseover', (event) => {
            event.target.style.backgroundColor = '#cffafe';
        })
        table.addEventListener('mouseout', (event) => {
            event.target.style.backgroundColor = '';
        })
    }

    const set_click_event = (table) => {
        table.addEventListener('click', (event) => {
            if (event.target.id == "") {
                console.log(`Missing id for ${event.target.nodeName}`);
                return;
            }
            let [x, y] = board.get_cell_coordinates(event.target.id);

            let symbol = playRound(x, y);
            if (symbol != null) {
                board.add_symbol(event.target, symbol);
                board.block_cell(event.target);
            }
        });
    }

    let game = createGame(board_size);
    const board = createBoard(board_size);
    const players = Object.fromEntries(
        game.get_players().map(
            (player) => [player.get_symbol(), createPlayerStats(player)]));

    set_click_event(board.get_html_elem());
    set_hover_effect(board.get_html_elem());

    const playRound = (row, col) => {
        // get current player, before making round. After round player changes.
        let curr_player = game.get_curr_player();
        let result = game.makeRound(row, col);
        if (result instanceof Error) {
            prompt(result.message);
            return null;
        }

        if (result == null) {
            // No one win, update screen and prepare for next move
            let next_player = game.get_curr_player();
            console.log("Next move for " + next_player.get_symbol());
        } else if (result.lenth() > 0) {
            prompt(curr_player.get_symbol() + " WIN!");
        } else {
            prompt("DRAW!");
        }
        return curr_player.get_symbol();
    }

    new_game();

    return {new_game};
}
