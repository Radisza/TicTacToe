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

    create_html_board = () => {
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

    return {create_html_board};
}

const game_board = createBoard(3);

let board_container = document.querySelector('.board_container');
board_container.appendChild(game_board.create_html_board());
