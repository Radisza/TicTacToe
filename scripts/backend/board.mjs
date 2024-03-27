function createSymbolCounter() {
    let row = null
    let col = null
    let top_left_diag = null
    let bottom_left_diag = null

    return {row, col, top_left_diag, bottom_left_diag};
}

export function createBoard(size) {
    const board = Array.from({length: size}, () => Array.from({length: size}));

    // Counts symbols across rows, columns and diagonals
    let symbol_surface_counter = {}
    let available_symbols_num = size*size;

    const increase_counter = (counter_key, symbol) => {
        if (!(counter_key in symbol_surface_counter)) {
            symbol_surface_counter[counter_key] = {};
        }

        let counter = symbol_surface_counter[counter_key];
        if (!(symbol in counter)) {
            counter[symbol] = 0;
        }
        return ++counter[symbol];
    }

    const add_symbol = (symbol, row, col) => {
        if (board[row][col] != undefined) {
            return new Error(`Field ${row, col} is filled`);
        }
        if (row < 0 || row >= size) {
            return new Error(`Invalid row: ${row}. Expected digit between (0, ${size - 1})`);
        }
        if (col < 0 || col >= size) {
            return new Error(`Invalid column: ${col}. Expected digit between (0, ${size - 1})`);
        }

        available_symbols_num--;
        board[row][col] = symbol;
        let result = createSymbolCounter();
        result.row = increase_counter('row_' + row, symbol);
        result.col = increase_counter('col_' + col, symbol);
        if (row == col) {
            result.top_left_diag = increase_counter('top_left_diag', symbol);
        }
        if (row + col == size-1) {
            result.bottom_left_diag = increase_counter('bottom_left_diag', symbol);
        }

        return result;
    }
    const has_empty_fields = () => available_symbols_num > 0;

    return {add_symbol, has_empty_fields};
}