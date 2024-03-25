import { createBoard } from "./frontend/board.mjs";
import { createUser } from "./frontend/user.mjs";

function createGame(board_size) {
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

const game = createGame(3);
game.new_game();



