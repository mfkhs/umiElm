// 一些ts工具函数

import { Component } from 'react';

// interface conent = {
//     [
//         [string]: [string]
//     ]
// }
interface groupcityProps {
    [propName: string]: any;
}

export const sortgroupcity = (groupcity: groupcityProps) => {
    let sortobj: groupcityProps = {};
    console.log()
    for (let i = 65; i <= 90; i++) {
        if (groupcity[String.fromCharCode(i)]) {
            sortobj[String.fromCharCode(i)] = groupcity[String.fromCharCode(i)];
        }
    }
    return sortobj
}


/* *
*  存储localStorage
*/

export const setStore = (name: string, placeHistory: any) => {
    if (!name) return
    if (typeof placeHistory !== 'string') {
        placeHistory = JSON.stringify(placeHistory)
    }
    window.localStorage.setItem(name, placeHistory)
}

/* *
* 获取localStorage
*/

export const getStore = (name: string) => {
    if (!name) return;
    return window.localStorage.getItem(name)
}

/* *
* 删除localStorage
*/

export const removeStore = (name: string) => {
    if (!name) return
    window.localStorage.removeItem(name)
}
