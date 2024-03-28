
import {createGame} from "/scripts/backend/game.mjs";
import {createPlayerStats} from "/scripts/frontend/player_stats.mjs";
import {createBoard} from "/scripts/frontend/board.mjs";

export function createScreenController(board_size) {
    const new_game = () => {
        Array.prototype.forEach.call(board.fields(), (field) => {
            set_click_event(field);
            set_hover_effect(field);
        })

        let stats = document.querySelector('.players');
        Object.entries(players).forEach(([_, player]) =>  {
            stats.appendChild(player.get_html_elem())
        });

        let board_container = document.querySelector('.board_container');
        board_container.appendChild(board.get_html_elem());

        let curr_player = game.get_curr_player();
        players[curr_player.get_symbol()].highlight();
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
            playRound(event.target, x, y);
        });
    }


    const playRound = (cell, row, col) => {
        // get current player, before making round. After round player changes.
        let curr_player = game.get_curr_player();
        let result = game.makeRound(row, col);
        if (result instanceof Error) {
            window.alert(result.message);
            return null;
        }


        board.add_symbol(cell, curr_player.get_symbol());
        board.block_cell(cell);

        if (result == null) {
            // No one win, update screen and prepare for next move
            const next_player = game.get_curr_player();
            for (const [symbol, player] of Object.entries(players)) {
                if (symbol == next_player.get_symbol()) {
                    player.highlight();
                } else {
                    player.remove_highlight()
                }
            }
            console.log("Next move for " + next_player.get_symbol());
        } else if (result.length > 0) {
            window.alert(curr_player.get_symbol() + " WIN!");
        } else {
            window.alert("DRAW!");
        }
        return curr_player.get_symbol();
    }


    let game = createGame(board_size);
    const board = createBoard(board_size);
    const players = Object.fromEntries(
        game.get_players().map(
            (player) => [player.get_symbol(), createPlayerStats(player)]));

    new_game();

    return {new_game};
}
