import { add, subtract, pi } from "./math.js";
import { greet } from "./greet.js";
import { capitalize } from "./utils.js";

console.log(add(15, 10));

console.log(subtract(15, 10));

console.log(pi);

console.log(greet("Ahmed"));

console.log(capitalize("ahmed"));

console.log(greet(capitalize("ahmed")));
