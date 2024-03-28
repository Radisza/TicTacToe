
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

        highlight_players();
    }

    const highlight_players = () => {
        let curr_player = game.get_curr_player().get_symbol();
        for (const [symbol, player] of Object.entries(players)) {
            if (symbol == curr_player) {
                player.highlight();
            } else {
                player.remove_highlight()
            }
        }
        player_message.textContent = `User ${curr_player} turn.`
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
        let curr_player = game.get_curr_player().get_symbol();
        let result = game.makeRound(row, col);
        if (result instanceof Error) {
            window.alert(result.message);
            return null;
        }

        board.add_symbol(cell, curr_player);
        board.block_cell(cell);

        if (result == null) {
            highlight_players();
        } else if (result.length > 0) {
            player_message.textContent = `Player ${curr_player} win!`;
            players[curr_player].update_html_elem();
            board.block();
        } else {
            player_message.textContent = `Draw, both players win!`;
            board.block();
        }
        return curr_player;
    }


    let game = createGame(board_size);
    const board = createBoard(board_size);
    const players = Object.fromEntries(
        game.get_players().map(
            (player) => [player.get_symbol(), createPlayerStats(player)]));
    const player_message = document.querySelector(".player_message");

    new_game();

    return {new_game};
}
