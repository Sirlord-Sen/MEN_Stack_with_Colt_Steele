function average(arr){
    var added = 0;
    for(var i = 0; i < arr.length; i++){
        added += arr[i];
    } 
    return Math.round(added/arr.length);
}

var scores = [90, 98, 89,100, 100, 86, 94];
console.log(average(scores));