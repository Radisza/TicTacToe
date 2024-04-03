
export function createPlayerStats(player) {

    const create_html_elem = () => {
        const player_elem = document.createElement('div');
        player_elem.classList.add(`player`);

        const player_symbol = document.createElement('div');
        player_symbol.textContent = player.get_symbol();
        player_elem.appendChild(player_symbol);

        const points = document.createElement('div');
        points.textContent = player.get_num_of_wins();
        player_elem.appendChild(points);

        return player_elem;
    }

    const get_html_elem = () => player_elem;

    const update_html_elem = () => {
        const symbol = player.get_symbol();
        player_elem.textContent = `${symbol}: ${player.get_num_of_wins()}`;
    }

    const highlight = () => {
        player_elem.classList.add('player_highlight');
    }

    const remove_highlight = () => {
        player_elem.classList.remove('player_highlight');
    }

    const player_elem = create_html_elem();

    return {
        get_html_elem,
        update_html_elem,
        highlight,
        remove_highlight,
    };
}