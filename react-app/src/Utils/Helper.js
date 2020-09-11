
export function resolveTime(time){
    var splittedTime = time.split("-")
    var year = splittedTime[0]
    var month = splittedTime[1]
    var day = splittedTime[2].split(' ')[0]
    return year + '/'+ month + '/' + day
}