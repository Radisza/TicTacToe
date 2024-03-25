import { createUser } from "./user.mjs";
import { createBoard } from "../board.mjs";


export function createGame(size) {
    const users = [createUser('X'), createUser('O')];
    let curr_user_idx = 0;
    let curr_user = users[curr_user_idx];
    let board = createBoard(size);
    let winning_fields = null;

    const set_next_user = () => {
        curr_user_idx = (curr_user_idx + 1) % users.length;
        curr_user = users[curr_user_idx];
        return curr_user;
    }

    const makeRound = (row, col) => {
        if (!(winning_fields == null)) {
            return new Error("Game finished.");
        }
        let symbol_counter = board.add_symbol(
            curr_user.get_symbol(), row, col
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
            curr_user.user_win();
            return null;
        }

        return set_next_user();
    }

    const get_winning_fields = () => winning_fields;
    const is_finished = () => winning_fields != null;
    const get_curr_user = () => curr_user;

    return {makeRound, get_winning_fields, is_finished, get_curr_user};


}