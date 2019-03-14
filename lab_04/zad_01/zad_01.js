/* jshint strict: global, esversion: 6, devel: true */
'use strict';

function defFun(fun, types) {

    if(Array.isArray(types)){
        types.forEach(element => {
            if(typeof(element) !== "string"){
                throw({typerr: "argument type is not string!"});
            }
        });
    } else {
        throw({typerr: "Second argument is not an array!"});
    }

    if(typeof(fun) !== "function"){
        throw({typerr: "First argument is not a function!"});
    }

    fun.typeConstr = types;

    return fun;
}

function appFun(f, ...args){
    if(f.typeConstr === undefined) {
        throw({typerr: "typeConstr not defined in this function!"});
    }

    if(args.length !== f.typeConstr.length) {
        if(args.length < f.typeConstr.length){
            throw({typerr: "There is not enough arguments given!"});
        } else {
            throw({typerr: "There is too much arguments given!"});
        }
    }

    args.forEach((element, index) =>{
        if(typeof(element) !== f.typeConstr[index]){
            throw({typerr: "Argument type is diffrent than given in function definition!"});
        }
	});
	
	return f(args);
}

const myFun = defFun((x) => x * x, ['number']);

try {
    console.log(appFun(myFun, 12));
} catch (e) {
    console.log(e.typerr);
}