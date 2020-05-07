export function formateDate(time) {
    if (!time) return ''
    let date = new Date(time);
    let month = dealSigle(date.getMonth() + 1);
    let day = dealSigle(date.getDate());

    return date.getFullYear() + '-' + month + '-'
        + day + ' ' + dealSigle(date.getHours()) + ':' + dealSigle(date.getMinutes()) + ':' + dealSigle(date.getSeconds())
}
function dealSigle(x) {
    return x < 10 ? ("0" + x) : x;
}