
export function createBoard(size) {

    const get_board_id = (row, col) => `board(${row}, ${col})`;

    const get_cell_coordinates = (cell_id) =>  {
        let result = cell_id.match(/board\(([0-9]+), ([0-9]+)\)/);
        if (!result) {
            console.log("Invalid cell id. Expected: board(x, y), got: " +  cell_id);
        }

        return [parseInt(result[1]), parseInt(result[2])];
    }

    const create_html_elem = () => {
        const table = document.createElement('table');
        for (let i = 0 ; i < size; i++) {
            const row = table.insertRow(-1);
            for (let j = 0; j < size; j++) {
                const cell = row.insertCell(-1);
                cell.setAttribute('id', get_board_id(i, j));
                cell.style.width = 100/size + '%'
                cell.style.height = 100/size + '%'
            }
        }

        return table;
    }

    const get_html_elem = () => board;
    let board = create_html_elem();

    const add_symbol = (cell, symbol) => {
        // OffsetWidth is available after element is appended to html.
        // So font-size should be set here.
        cell.style.fontSize = 0.6 * cell.offsetWidth + 'px';
        cell.innerHTML = symbol;
    }

    const block_cell = (cell) => {
        cell.style.pointerEvents='none';
    }

    const block = () => {
        for (const row of board.rows) {
            for (const cell of row.cells) {
                block_cell(cell);
            }
        }
    }

    const fields = () => {
        return board.rows;
    };

    return {
        get_html_elem,
        get_cell_coordinates,
        add_symbol,
        block_cell,
        fields,
        block,
    };
}
