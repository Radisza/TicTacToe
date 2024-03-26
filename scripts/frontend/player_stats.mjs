
export function createPlayerStats(player) {

    const create_html_elem = () => {
        const symbol = player.get_symbol();

        const player_elem = document.createElement('div');
        player_elem.classList.add(`player_${symbol}`);
        player_elem.textContent = `${symbol}: ${player.get_num_of_wins()}`;

        return player_elem;
    }

    const get_html_elem = () => player_elem;

    const update_html_elem = () => {
        const symbol = player.get_symbol();

        // document.querySelector(`.player_${symbol}`);
        player_elem.textContent = `${symbol}: ${player.get_num_of_wins()}`;
    }

    const player_elem = create_html_elem();

    return {get_html_elem, update_html_elem};
}