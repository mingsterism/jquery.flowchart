const val = "scale(1.2214) translate(-711.214px, -311.713px)";
// const re = /\(^[0-9]*\)/g;
const re2 = /\(([^)]+)\)/g
console.log(re2.exec(val)[1])
// console.log(val.split(" ")[0].match(re)[0]);

// var regExp = /\(([^)]+)\)/;
// var matches = regExp.exec("I expect five hundred dollars ($500).");

// console.log(matches)