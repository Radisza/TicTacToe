export function createPlayer(symbol) {
    let wins = 0;

    const get_symbol = () => symbol;
    const player_win = () => ++wins;
    const get_num_of_wins = () => wins;

    return {get_symbol, player_win, get_num_of_wins};
}