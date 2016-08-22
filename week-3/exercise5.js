function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
		// fixed portion of code
		result[i] = function(x) {
			return function() {
				alert('item' + x);
			}
		} (list[i]);
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

console.log(testList());

/* result correctly displays three alerts with messages,
   item1, item2, and item3 */
