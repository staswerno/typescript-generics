//
// built in generic types
//

const names: Array<string> = ["Stasi", "Jopo"];
// names[0].split("/"); - this works now

const promise: Promise<string> = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("This is done!");
		reject("Not done.");
	}, 2000);
});
// Promise<any> would give less TS type safety
// eg if resolve is integer, can use string methods on it

function merge<T, U>(objA: T, objB: U) {
	return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Stasi" }, { age: 21 });
// mergedObj.name; doesn't work without <generic> because ts doesn't know
// type: 'object' too unspecific
// could typecast but very cumbersome
// so use <generic> to return intersection of any 2 types
// set dynamically when calling function
