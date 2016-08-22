console.log(area(2,2));
function area(length, width){
    return length * width;
}

console.log(celsiusTemp(212));
var celsiusTemp = function(fahrenheitTemp){
    return (fahrenheitTemp - 32) * 5 / 9;
}

/* resulting code output:

4
/Users/jacobwilson/Documents/OSU/CS290/week 2/exercise2.js:7
console.log(celsiusTemp(212));
^

TypeError: celsiusTemp is not a function
at Object.<anonymous> (/Users/jacobwilson/Documents/OSU/CS290/week 2/exercise2.js:7:13)
at Module._compile (module.js:409:26)
at Object.Module._extensions..js (module.js:416:10)
at Module.load (module.js:343:32)
at Function.Module._load (module.js:300:12)
at Function.Module.runMain (module.js:441:10)
at startup (node.js:139:18)
at node.js:968:3 */
