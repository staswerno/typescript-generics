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

// generic classes
// 
// when uniform data but don't care about type
// we are making sure it only takes primitive types
// to ensure no confusion trying to remove reference types 

class DataStorage<T extends string | number | boolean> {
	private data: T[] = [];

	addItem(item: T) {
		this.data.push(item);
	}
	removeItem(item: T) {
		if (this.data.indexOf(item) === -1) {
			return;
		}
		this.data.splice(this.data.indexOf(item), 1); // -1
	}
	getItems() {
		return [...this.data];
	}
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Stasi');
textStorage.addItem('Jopo');
textStorage.removeItem('Stasi');
console.log(textStorage.getItems()); 

// flexible! can also store numbers
const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const stasObj = {name: 'Stasi'};
// objStorage.addItem(stasObj);
// objStorage.addItem({name: 'Jopo'});
// // ...
// objStorage.removeItem(stasObj);
// console.log(objStorage.getItems());


// generic utility types
// built in generic types

interface CourseGoal {
	title: string;
	description: string;
	completeUntil: Date;
}

// Partial type (open up)

function createCourseGoal(
	title: string, 
	description: string, 
	date: Date
	): CourseGoal {
		let courseGoal: Partial<CourseGoal> = {};
		courseGoal.title = title;
		courseGoal.description = description;
		courseGoal.completeUntil = date;
		return courseGoal as CourseGoal;
	}
// Partial makes properties optional

// Readonly type (lock down)

const newNames: Readonly<string[]> = ['Stasi', 'Jopo'];
// newNames.push('Luna');
// creates error