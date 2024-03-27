
export function createBoard(size) {

    const get_board_id = (row, col) => `board(${row}, ${col})`;

    const get_cell_coordinates = (cell_id) =>  {
        let result = cell_id.match(/board\(([0-9]+), ([0-9]+)\)/);
        if (!result) {
            console.log("Invalid cell id. Expected: board(x, y), got: " +  cell_id);
        }

        return [result[1], result[2]];
    }

    const create_html_elem = () => {
        const table = document.createElement('table');
        for (let i = 0 ; i < size; i++) {
            const row = table.insertRow(-1);
            for (let j = 0; j < size; j++) {
                const cell = row.insertCell(-1);
                cell.setAttribute('id', get_board_id(i, j));
            }
        }

        return table;
    }

    const get_html_elem = () => board;

    let board = create_html_elem();

    return {get_html_elem};
}
