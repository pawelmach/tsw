/* jshint strict: global, esversion: 6, devel: true */
'use strict';

const asyncFunGen = (txt) => {
    
    return (txt2, cb) => {
        setTimeout( () => {
            return cb(`${txt + txt2}`);
        }, Math.random() * 1000 );
    };
};

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

const poKolei = (fun1, fun2, cb) => {
    
    fun1("zero", (x) => {
        fun2(x, cb);
    });
};

poKolei(fn1, fn2, (w) => {
    console.log(w);
});