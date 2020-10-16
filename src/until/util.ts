

interface groupcityProps{
    [propName: string]: any;
}

export const sortgroupcity = (groupcity:groupcityProps) =>{
    let sortobj:groupcityProps = {};
    console.log()
    for (let i = 65; i <= 90; i++) {
        if (groupcity[String.fromCharCode(i)]) {
            sortobj[String.fromCharCode(i)] = groupcity[String.fromCharCode(i)];
        }
    }
    return sortobj
}