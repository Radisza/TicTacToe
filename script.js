function createBoard(size) {
    const board = Array.from({length: size}, () => Array.from({length: size}));

    get_cell_coordinates = (cell_id) =>  {
        let result = cell_id.match(/board\(([0-9]+), ([0-9]+)\)/);
        if (!result) {
            console.log("Invalid cell id. Expected: board(x, y), got: " +  cell_id);
        }

        return [result[1], result[2]];
    }

    set_hover_effect = (cell) => {
        cell.addEventListener('mouseover', (event) => {
            event.target.setAttribute('style', 'background-color: #cffafe')
        })
        cell.addEventListener('mouseout', (event) => {
            event.target.setAttribute('style', 'background-color: ')
        })
    }

    set_click_event = (cell) => {
        cell.addEventListener('click', (event) => {
            let [x, y] = get_cell_coordinates(event.target.id);
            console.log(`Clicked (${x}, ${y})`);
        });
    }

    create_html_elem = () => {
        const table = document.createElement('table');
        for (let i = 0 ; i < size; i++) {
            const row = table.insertRow(-1);
            for (let j = 0; j < size; j++) {
                const cell = row.insertCell(-1);

                cell.setAttribute('id', `board(${i}, ${j})`);

                set_click_event(cell);
                set_hover_effect(cell);
            }
        }
        return table;
    }

    return {create_html_elem};
}

function createUser(sign) {
    let wins = 0;

    const get_num_of_wins = () => wins;
    const mark_win = () => wins++;
    const get_sign = () => sign;

    const create_html_elem = () => {
        const user_elem = document.createElement('div');
        user_elem.classList.add(`${sign}_points`);
        user_elem.textContent = `${sign}: ${get_num_of_wins()}`;

        return user_elem;
    }

    const update_html_elem = () => {
        document.querySelector(`.${sign}_points`);
        user_elem.textContent = `${sign}: ${wins}`;
    }

    return {get_num_of_wins, mark_win, get_sign, create_html_elem, update_html_elem};
}

function createGame(board_size) {
    const users = [createUser('X'), createUser('O')];
    const board = createBoard(board_size);

    new_game = () => {
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



