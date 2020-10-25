
export function resolveTime(time){
    var splittedTime = time.split("-")
    var year = splittedTime[0]
    var month = splittedTime[1]
    var day = splittedTime[2].split(' ')[0]
    return year + '/'+ month + '/' + day
}

export function resolveUserTime(time) {
    return resolveTime(time).split('T')[0];
}

/** 
 * Return positive number if d1 > d2
 * Ascending by default
 */
function compareDateTime(d1, d2) {
    const result = Date.parse(d1) - Date.parse(d2);
    return result;
}

export {compareDateTime};