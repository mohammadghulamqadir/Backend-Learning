// "use strict";

// x=19
// let x;
// x=20
// console.log(x);
// "use strict";

// var user = { name: "John", age: 25 };

// function secureFunction() {
//     console.log(user.name, user.age); // Throws a SyntaxError in strict mode

// }

// secureFunction();

(function () {
    // Private variables and functions
    var counter = 0;

    function incrementCounter() {
        counter++;
        console.log(counter);
    }

    // Public API (exposed only what is needed)
    myApp = {
        increment: incrementCounter
    };
})();

