
export function createUser(sign) {
    let wins = 0;

    const get_num_of_wins = () => wins;
    const mark_win = () => wins++;
    const get_sign = () => sign;

    const create_html_elem = () => {
        const user_elem = document.createElement('div');
        user_elem.classList.add(`${sign}_points`);
        user_elem.textContent = `${sign}: ${get_num_of_wins()}`;

        return user_elem;
    }

    const update_html_elem = () => {
        document.querySelector(`.${sign}_points`);
        user_elem.textContent = `${sign}: ${wins}`;
    }

    return {get_num_of_wins, mark_win, get_sign, create_html_elem, update_html_elem};
}