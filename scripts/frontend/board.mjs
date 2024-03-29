
export function createBoard(size) {

    const get_cell_id = (row, col) => `cell_${row}_${col}`;

    const get_cell_coordinates = (cell_id) =>  {
        let result = cell_id.match(/cell_([0-9]+)_([0-9]+)/);
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
                cell.setAttribute('id', get_cell_id(i, j));
                cell.style.width = 100/size + '%'
                cell.style.height = 100/size + '%'
            }
        }

        return table;
    }

    const get_html_elem = () => board;
    let board = create_html_elem();
    let blink_ids = [];

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

    const set_blink_style = (elem) => {
        elem.style.opacity = (elem.style.opacity == 1 ? 0 : 1);
    }

    const blink = (cells) => {
        for (const [row, col] of cells) {
            const cell = board.querySelector('#'+ get_cell_id(row, col));
            blink_ids.push(setInterval(() => {set_blink_style(cell)}, 500));
        }
    }

    const clear_blink = () => {
        blink_ids.forEach((id) => {clearInterval(id)});
        blink_ids = [];
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
        blink,
        clear_blink,
    };
}
