export function createUser(symbol) {
    let wins = 0;

    const get_symbol = () => symbol;
    const user_win = () => wins++;
    const get_num_of_wins = () => wins;

    return {get_symbol, user_win, get_num_of_wins};
}