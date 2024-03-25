import { createBoard } from "/scripts/frontend/board.mjs";
import { createUser } from "/scripts/frontend/user.mjs";

export function createGame(board_size) {
    const users = [createUser('X'), createUser('O')];
    const board = createBoard(board_size);

    const new_game = () => {
        let stats = document.querySelector('.stats');
        users.forEach((user) =>  {
            stats.appendChild(user.create_html_elem())
        });

        let board_container = document.querySelector('.board_container');
        board_container.appendChild(board.create_html_elem());
    }

    return {new_game};
}
