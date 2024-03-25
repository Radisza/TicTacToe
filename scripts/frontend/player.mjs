
export function createPlayer(player) {

    const create_html_elem = () => {
        const symbol = player.get_symbol();

        const player_elem = document.createElement('div');
        player_elem.classList.add(`${symbol}_points`);
        player_elem.textContent = `${symbol}: ${player.get_num_of_wins()}`;

        return player_elem;
    }

    const update_html_elem = () => {
        const symbol = player.get_symbol()

        document.querySelector(`.${symbol}_points`);
        player_elem.textContent = `${symbol}: ${player.get_num_of_wins()}`;
    }

    return {get_num_of_wins, mark_win, get_sign, create_html_elem, update_html_elem};
}