//
// built in generic types
//

const names: Array<string> = ["Stasi", "Jopo"];
// names[0].split("/"); - this works now

const promise: Promise<string> = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("This is done!");
	}, 2000);
});
// Promise<any> would give less TS type safety
// eg if resolve is integer, can use string methods on it
