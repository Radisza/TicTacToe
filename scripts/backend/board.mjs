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
    let symbol_counter = {
        'top_left_diag': {},
        'bottom_left_diag': {},
    }

    const increase_counter = (counter_key, symbol) => {
        let counter = symbol_counter[counter_key];
        if (!(symbol in counter)) {
            counter[symbol] = 0;
        }
        return counter[symbol]++;
    }

    const add_symbol = (symbol, row, col) => {
        if (row < 0 || row <= size) {
            return new Error(`Invalid row: ${row}. Expected digit between (0, ${size - 1})`);
        }
        if (col < 0 || col <= size) {
            return new Error(`Invalid column: ${col}. Expected digit between (0, ${size - 1})`);
        }

        board[row, col] = symbol;

        let symbol_counter = createSymbolCounter();
        symbol_counter.row = increase_counter('row_' + row, symbol);
        symbol_counter.col = increase_counter('col_' + col, symbol);
        if (row == col) {
            symbol_counter.top_left_diag = increase_counter('top_left_diag', symbol);
        } else if (row + col == size) {
            symbol_counter.bottom_left_diag = increase_counter('bottom_left_diag', symbol);
        }

        return symbol_counter;
    }

    return {add_symbol};
}