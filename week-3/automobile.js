function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
	/* the logMe function prints different strings based on the bool that is
	 * passed into the function; with or without automobile type */
	this.logMe = function(printType) {
		var printString = this.year + " " + this.make + " " + this.model;
		if (printType) {
			printString += " " + this.type;
		}
		console.log(printString);
	}
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
/* Selection sort is implemented to sort the array. First a copy of the array is made. The copied array is then sorted
 * and returned. A comparator parameter allows for the use of different comprisons */
function sortArr( comparator, array ){
	var minIdx,
		temp,
		len = array.length,
		newArray = array.slice(0);				// make a copy of the array here
		
	/* loop through the copied array comparing values */
	for (var i = 0; i < len; i++) {
		minIdx = i;
		for (var j = i + 1; j < len; j++) {
			if (comparator(newArray[j], newArray[minIdx])) {
				minIdx = j;
			}
		}
		/* perform a swap when values are out of order */
		temp = newArray[i];
		newArray[i] = newArray[minIdx];
		newArray[minIdx] = temp;
	}
	return newArray;
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    /* compare years values */
	if (auto1.year > auto2.year) {
		return true;
	} else {
		return false;
	}
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    /* convert make to lowercase and compare */
	if (auto1.make.toLowerCase() < auto2.make.toLowerCase()) {
		return true;
	} else {
		return false;
	}
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    // assign priority to each type
	var typeOrder = {
		"roadster": 4,
		"pickup": 3,
		"suv": 2,
		"wagon": 1,
	}
	
	// assign types to the function args
	var auto1type = typeOrder[auto1.type.toLowerCase()];
	var auto2type = typeOrder[auto2.type.toLowerCase()];
	
	// if type priority is not defined, it defaults to lowest
	if (typeof(auto1type) === "undefined") {
		auto1type = 0;
	}
	if (typeof(auto2type) === "undefined") {
		auto2type = 0;
	}
	
	/* return truth based on comparison, make call to yearComparator
	 * if type priority is equal */
	if (auto1type > auto2type) {
		return true;
	} else if (auto1type < auto2type) {
		return false;
	} else if (auto1type === auto2type) {
		return yearComparator(auto1, auto2);
	}
}

/* forE function will make call to logMe for each array item
 * while passing the appropriate bool value */
function forE(arr, bool) {
	for (var car in arr) {
		arr[car].logMe(bool);
	}
}

console.log("*****");

console.log("The cars sorted by year are:");
forE(sortArr(yearComparator, automobiles), false);

console.log("\nThe cars sorted by make are:");
forE(sortArr(makeComparator, automobiles), false);

console.log("\nThe cars sorted by type are:");
forE(sortArr(typeComparator, automobiles), true);

console.log("*****");
