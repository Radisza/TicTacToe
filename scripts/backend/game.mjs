import { createPlayer } from "./player.mjs";
import { createBoard } from "../board.mjs";


export function createGame(size) {
    const players = [createPlayer('X'), createPlayer('O')];
    let curr_player_idx = 0;
    let curr_player = players[curr_player_idx];
    let board = createBoard(size);
    let winning_fields = null;

    const set_next_player = () => {
        curr_player_idx = (curr_player_idx + 1) % players.length;
        curr_player = players[curr_player_idx];
        return curr_player;
    }

    const makeRound = (row, col) => {
        if (!(winning_fields == null)) {
            return new Error("Game finished.");
        }
        let symbol_counter = board.add_symbol(
            curr_player.get_symbol(), row, col
        );

        if (symbol_counter instanceof Error) {
            return symbol_counter;
        }

        if (symbol_counter.row == size) {
            winning_fields = [];
            for (let j = 0; j < size; j++) {
                winning_fields.push((row, j));
            }
        } else if (symbol_counter.col == size) {
            winning_fields = [];
            for (let i = 0; i < size; i++) {
                winning_fields.push((i, col));
            }
        } else if (symbol_counter.top_left_diag == size) {
            winning_fields = [];
            for (let i = 0; i < size; i++) {
                winning_fields.push((i, i));
            }
        } else if (symbol_counter.bottom_left_diag == size) {
            winning_fields = [];
            for (let i = 0; i < size; i++) {
                winning_fields.push((i, size-i-1));
            }
        }

        if (winning_fields != null) {
            curr_player.player_win();
            return null;
        }

        return set_next_player();
    }

    const get_winning_fields = () => winning_fields;
    const is_finished = () => winning_fields != null;
    const get_curr_player = () => curr_player;
    const get_players = () => players;

    return {makeRound, get_winning_fields, is_finished, get_curr_player};


}