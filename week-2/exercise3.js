var obj1 = {
	here: {is: "an"},
	object: 2,
	another: 5, 
	day: 7
};

var obj2 = {
	day: 7,
	here: {is: "an"},
	object: 2,
	another: 5
};

var obj3 = {
	day: 7,
	here: {is: "dog"},
	object: 2,
	another: 5
};

var obj4 = {
	day: 7,
	here: {is: "an"},
	object: 2,
};

function deepEqual(first, second) {
	var count1 = 0, count2 = 0;
	
	if ((typeof(first) == "object") && first != null && (typeof(second) == "object") && second != null) {
		for (prop in first) {
			count1++;
		}
		for (prop in second) {
			count2++;
		}
		
		if (count1 != count2) {
			return false;
		}
		
		for (prop in first) {
			if (first.prop == second.prop) {
				return deepEqual(first[prop], second[prop]);
			}
		}
	} else if (first != second) {
		return false;
	} else {
		return true;
	}
}

console.log(deepEqual(obj1, obj2));
console.log(deepEqual(obj1, obj3));
console.log(deepEqual(obj1, obj4));
