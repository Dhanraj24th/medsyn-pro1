//Type alias = create your own “named type” so you don’t repeat yourself.
type User = {
  name: string;
  age: number;
  isAdmin?: boolean; // optional
};



let u2: User = { name: "Alex", age: 30, isAdmin: true };
type ID = number | string;

let userId: ID = 101;
userId = "ABC123"; // also valid


interface Animal {
  name: string;
  sound(): void;
}

interface Dog extends Animal {
  breed: string;
}

const myDog: Dog = {
  name: "Tommy",
  breed: "Labrador",
  sound() {
    console.log("Woof Woof");
  },
};

type Status = "success" | "error" | "loading";

let currentStatus: Status = "loading";
// currentStatus = "done"; ❌ (not allowed)


function identity<T>(value : T) : T {
  return value;
}
function authentication<T>(value : T) :T {
  return value;
} 
let a = identity<number>(42);     
let b = identity<string>("hello");
let c = identity("world");
let d = authentication<boolean>(true);


interface ApiResponse<T> {
  status: number;
  data: T;
}

let userResponse: ApiResponse<{ id: number; name: string }> = {
  status: 200,
  data: { id: 1, name: "Dhanraj" },
};

let productResponse: ApiResponse<string[]> = {
  status: 200,
  data: ["Laptop", "Phone", "Tablet"],
};

interface ApiResponse1<T> {
    status : number;
    data : T;
}

let userResponse1 : ApiResponse1 <{id:number ; name : string }> = {
  status : 200,
  data : {id: 1,name : "Dhanraj"}
}

function lastElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[arr.length - 1] : undefined;
}

console.log(lastElement([1, 2, 3]));     // 3
console.log(lastElement(["a", "b", "c"])); // "c"

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

function mapArray<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

// Example
const numbers = [1, 2, 3];
const doubled = mapArray(numbers, n => n * 2);
console.log(doubled); // [2, 4, 6]

const names = ["Alex", "Sam"];
const lengths = mapArray(names, n => n.length);
console.log(lengths); // [4, 3]





