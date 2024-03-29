
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

    const create_path = (cell1, cell2) => {
        let cell_width = 100/size;
        let bx, by, ex, ey
        if (cell1[0] >= cell2[0] || cell1[1] <= cell2[1]) {
            // * from left to right  and top to botoom
            // * horizontal or vertical line
            [bx, by] = [cell1[0] * cell_width, cell1[1] * cell_width] ;
            [ex, ey] = [(cell2[0]+1) * cell_width, (cell2[1]+1) * cell_width]
        } else {
            // draw from right to left and bottom to up
            [bx, by] = [cell1[0] * cell_width, (cell1[1]+1) * cell_width] ;
            [ex, ey] = [(cell2[0]+1) * cell_width, cell2[1] * cell_width]
        }

        if (cell1[0] == cell2[0]) {
            bx += cell_width/2;
            ex -= cell_width/2;
        } else if (cell1[1] == cell2[1]) {
            by += cell_width/2;
            ey -= cell_width/2;
        }

        let path_container = document.createElement('div');
        path_container.classList.add("svg_container");
        path_container.innerHTML =`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path d="M ${by} ${bx} L ${ey} ${ex} " fill="transparent" stroke="black" stroke-width="1"/>
            </svg>
            `
        return path_container;
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

    const find_min_max_tuple = (array_of_tuples) => {
        if (array_of_tuples.length == 0) {
            return null;
        }
        let min = array_of_tuples[0];
        let max = array_of_tuples[0];
        for (let tuple of array_of_tuples) {
            if (tuple[0] < min[0] || tuple[0] == min[0] && tuple[1] < min[1]) {
                min = tuple;
            } else if (tuple[0] > max[0] || tuple[0] == max[0] && tuple[1] > max[1]){
                max = tuple;
            }
        }
        return [min, max];
    }

    const get_path_accros_fields = (cells) => {
        let [min, max] = find_min_max_tuple(cells);
        return create_path(min, max);
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
        get_path_accros_fields,
    };
}
