/* jshint strict: global, esversion: 6, devel: true */
'use strict';

const fn1 = (txt, cb) => {
    setTimeout( () => {
         cb(`${txt} jeden`);
    }, Math.random() * 1000);
}

const fn2 = (txt, cb) => {
    setTimeout( () => {
        cb(`${txt} dwa`);
    }, Math.random() * 1000);
}

const razem = (fun1, fun2, cb) => {
    let tab = [];
    fun1("zero", (x) => {
        tab.push(x);
        fun2("jeden", (x) => {
            tab.push(x);
            cb(tab);
        });
    });
}

razem(fn1, fn2, (x) => {
    console.log(x);
})