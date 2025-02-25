function AdicionarHorario(dia) {
    const container = document.querySelector(`.dia:has(span:contains(${dia}))`);
    const input = document.createElement('input');
    input.type = 'time';
    container.appendChild(input);
}
