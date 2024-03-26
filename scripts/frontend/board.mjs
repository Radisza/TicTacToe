export function createBoard(size) {
    const get_cell_coordinates = (cell_id) =>  {
        let result = cell_id.match(/board\(([0-9]+), ([0-9]+)\)/);
        if (!result) {
            console.log("Invalid cell id. Expected: board(x, y), got: " +  cell_id);
        }

        return [result[1], result[2]];
    }

    const set_hover_effect = (cell) => {
        cell.addEventListener('mouseover', (event) => {
            event.target.setAttribute('style', 'background-color: #cffafe')
        })
        cell.addEventListener('mouseout', (event) => {
            event.target.setAttribute('style', 'background-color: ')
        })
    }

    const set_click_event = (cell) => {
        cell.addEventListener('click', (event) => {
            let [x, y] = get_cell_coordinates(event.target.id);
            console.log(`Clicked (${x}, ${y})`);
        });
    }

    const create_html_elem = () => {
        const table = document.createElement('table');
        for (let i = 0 ; i < size; i++) {
            const row = table.insertRow(-1);
            for (let j = 0; j < size; j++) {
                const cell = row.insertCell(-1);
                cell.setAttribute('id', `board(${i}, ${j})`);
            }
        }

        set_click_event(table);
        set_hover_effect(table);
        return table;
    }

    return {create_html_elem};
}