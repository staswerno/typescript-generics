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

function merge<T extends object, U extends object>(objA: T, objB: U) {
	return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Stasi" }, { age: 21 });
// mergedObj.name; doesn't work without <generic> because ts doesn't know
// type: 'object' too unspecific
// could typecast but very cumbersome
// so use <generic> to return intersection of any 2 types
// set dynamically when calling function

// type constraints using extends keyword

interface Lengthy {
	length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
	let descriptionText = "Got no value.";
	if (element.length === 0) {
		descriptionText = "Got 1 element.";
	} else if (element.length > 1) {
		descriptionText = "Got " + element.length + " elements.";
	}
	return [element, descriptionText];
}

console.log(countAndDescribe("Whatup."));
console.log(countAndDescribe(["Whatup.", "Yo."]));

// keyof

function extractAndConvert<T extends object, U extends keyof T>(
	obj: T,
	key: U
) {
	return "Value: " + obj[key];
}

extractAndConvert({ name: "Max" }, "name");
