var blockHeight = 20;
var blockWidth = 31;
var searchBlock = new Array();
var wordStarted = new Boolean;
var wordAttempt = '';
var wordList = new Array("handkerchief", "scissors", "soap", "spine", "religion", "law", "wisdom", "chimp", "blonde", "granite", "plug", "pumpkin", "fleet", "oven", "tart", "parachute", "hour", "pasta", "board", "wheelbarrow");

function initBlock(){
	for (var i=0; i < blockWidth; i++)
	{
		searchBlock[i] = [];
		for (var j=0; j < blockHeight; j++)
			searchBlock[i][j] = '_';
		wordStarted = false;
		var elm = document.getElementById('search-block');
		elm.onselectstart = function(){ return false; }
	}
}

function fillBlockWithWords(){
	for(var i=0; i < wordList.length; i++)
	{
		word = wordList[i];
		var placeable = placeWordInBlock(word);
		if (!placeable)
		{
			console.log(parse('%s was not able to be placed on board.', word));
		}
	}
}

function placeWordInBlock(word){
	var tryPosition = true;
	var triedPositions = new Array();
	var wordArray = word.toUpperCase().split('');
	while (tryPosition){
		var tryDirection = true;
		var newPosition = new Array(0,0);
		do{
			newPosition[0] = Math.floor(Math.random()*blockWidth);
			newPosition[1] = Math.floor(Math.random()*blockHeight);
		} while (triedPositions.indexOf() > -1);
		var startingDirection = Math.floor(Math.random()*8);
		var currentDirection = startingDirection;
		do {
			var result = tryDirectionAtPosition(wordArray, newPosition, currentDirection % 8);
			if (result[0])
			{
				tryPosition = false;
				writeDirectionAtPosition(wordArray, result[1]);
				return true;
			} else
			{
				currentDirection++;
				tryDirection = true;
			}
		} while (tryDirection && (currentDirection % 8 != startingDirection));
		triedPositions.push(newPosition);
		if (triedPositions.length > (blockHeight * blockWidth))
		{
			return false;
		}
	}
}

function tryDirectionAtPosition(wordArray, newPosition, currentDirection){
	x = newPosition[0];
	y = newPosition[1];
	coords = new Array();
	var result = new Array(false, []);

	if (currentDirection === 0){
		//Forward Horizontal direction
		if (x + wordArray.length >= blockWidth)
		{
			return result;
		}
		for (var i=0; i < wordArray.length; i++){
			if (searchBlock[x+i][y] === '_'){
				coords.push(new Array(x+i, y));
			} 
			else if (searchBlock[x+i][y] === wordArray[i])
			{
				coords.push(new Array(x+i, y));
			}
			else {
				return result;
			}
		}	
		result[0] = true;
		result[1] = coords;
		return result;
	}
	else if (currentDirection === 1){
		//Backward Horizontal direction
		if (x - wordArray.length < 0)
		{
			return result;
		}
		for (var i=0; i < wordArray.length; i++){
			if (searchBlock[x-i][y] === '_'){
				coords.push(new Array(x-i, y));
			} 
			else if (searchBlock[x-i][y] === wordArray[i])
			{
				coords.push(new Array(x-i, y));
			}
			else {
				return result;
			}
		}	
		result[0] = true;
		result[1] = coords;
		return result;
	}
	else if (currentDirection === 2){
		// Forward vertical direction
		if (y + wordArray.length >= blockHeight)
		{
			return result;
		}
		for (var i=0; i < wordArray.length; i++){
			if (searchBlock[x][y+i] === '_'){
				coords.push(new Array(x, y+i));
			} 
			else if (searchBlock[x][y+i] === wordArray[i])
			{
				coords.push(new Array(x, y+i));
			}
			else {
				return result;
			}
		}	
		result[0] = true;
		result[1] = coords;
		return result;
	}
	else if (currentDirection === 3){
		// Backward vertical direction
		if (y - wordArray.length < 0)
		{
			return result;
		}
		for (var i=0; i < wordArray.length; i++){
			if (searchBlock[x][y-i] === '_'){
				coords.push(new Array(x, y-i));
			} 
			else if (searchBlock[x][y-i] === wordArray[i])
			{
				coords.push(new Array(x, y-i));
			}
			else {
				return result;
			}
		}	
		result[0] = true;
		result[1] = coords;
		return result;
	}
	else if (currentDirection === 4){
		//Forward Diaginal right direction
		if ((y + wordArray.length >= blockHeight) || (x + wordArray.length >= blockWidth))
		{
			return result;
		}
		for (var i=0; i < wordArray.length; i++){
			if (searchBlock[x+i][y+i] === '_'){
				coords.push(new Array(x+i, y+i));
			} 
			else if (searchBlock[x+i][y+i] === wordArray[i])
			{
				coords.push(new Array(x+i, y+i));
			}
			else {
				return result;
			}
		}	
		result[0] = true;
		result[1] = coords;
		return result;
	}
	else if (currentDirection === 5){
		//Backward Diaginal right direction
		if ((y - wordArray.length < 0) || (x - wordArray.length < 0))
		{
			return result;
		}
		for (var i=0; i < wordArray.length; i++){
			if (searchBlock[x-i][y-i] === '_'){
				coords.push(new Array(x-i, y-i));
			} 
			else if (searchBlock[x-i][y-i] === wordArray[i])
			{
				coords.push(new Array(x-i, y-i));
			}
			else {
				return result;
			}
		}	
		result[0] = true;
		result[1] = coords;
		return result;
	}
	else if (currentDirection === 6){
		//Forward Diaginal left direction
		if ((y - wordArray.length < 0) || (x + wordArray.length >= blockWidth))
		{
			return result;
		}
		for (var i=0; i < wordArray.length; i++){
			if (searchBlock[x+i][y-i] === '_'){
				coords.push(new Array(x+i, y-i));
			} 
			else if (searchBlock[x+i][y-i] === wordArray[i])
			{
				coords.push(new Array(x+i, y-i));
			}
			else {
				return result;
			}
		}	
		result[0] = true;
		result[1] = coords;
		return result;
	}
	else if (currentDirection === 7){
		//Backward Diaginal left direction
		if ((y + wordArray.length >= blockHeight) || (x - wordArray.length < 0))
		{
			return result;
		}
		for (var i=0; i < wordArray.length; i++){
			if (searchBlock[x-i][y+i] === '_'){
				coords.push(new Array(x-i, y+i));
			} 
			else if (searchBlock[x-i][y+i] === wordArray[i])
			{
				coords.push(new Array(x-i, y+i));
			}
			else {
				return result;
			}
		}	
		result[0] = true;
		result[1] = coords;
		return result;
	}
	else {
		// Fail Case
		console.log(parse('Incorrect Directions selected: %s', currentDirection));
		return result;
	}
}

function writeDirectionAtPosition(wordArray, coords)
{
	for (var i=0; i < wordArray.length; i++){
		searchBlock[coords[i][0]][coords[i][1]] = wordArray[i];
	}
}

function fillBlankWithLetters()
{
	var letterArray =new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
	for (var i=0; i < blockWidth; i++){
		for (var j=0; j < blockHeight; j++){
			if (searchBlock[i][j] === "_"){
				var randomNumber=Math.floor(Math.random()*26);
				searchBlock[i][j] = letterArray[randomNumber];
			}
		}
	}
}

function printBlock(){
	elem = document.getElementById("search-block");
	for (var i=0; i < blockWidth; i++)
		{
			var newDiv=document.createElement("span");
			newDiv.setAttribute("id", "row" + (i + 1));
			newDiv.className = "column";
			for (var j=0; j < blockHeight; j++)
			{
				var letter = document.createElement("div");
				var letterNode = document.createTextNode(searchBlock[i][j]);
				letter.appendChild(letterNode);
				letter.className="letter";
				letter.setAttribute("id", (i + ',' + j));
				letter.addEventListener('mousedown', letterMouseDown, false)
				letter.addEventListener('mouseover', letterMouseOver, false)
				//letter.addEventListener('mouseup', letterMouseUp, false)
				newDiv.appendChild(letter);
			}
			elem.appendChild(newDiv);
		}
}

function printWords(){
	numberOfWords = wordList.length;
	elem = document.getElementById("wordList");
	for (var j=0; j < numberOfWords; j++){
		var word = document.createElement("div");
		var wordNode = document.createTextNode(wordList[j]);
		word.appendChild(wordNode);
		word.className="word";
		elem.appendChild(word);
	}
}

function letterMouseDown() {
	//clearSelection();
	if (this.className == "letter"){
		this.className = "selected";
		wordAttempt = wordAttempt.concat(this.innerHTML);
		console.log('Word Attempt ' + wordAttempt);
	}
	wordStarted = true;
	var id = this.id;
	var widthAndHeight = id.split(',');
	var w = parseInt(widthAndHeight[0]);
	var h = parseInt(widthAndHeight[0]);
	//console.log("Mouse Down wordStarted is set to " + wordStarted);
}

function letterMouseOver() {
	//clearSelection();
	if (wordStarted == true) {
		this.className = "selected";
		wordAttempt = wordAttempt.concat(this.innerHTML);
		console.log('Word Attempt ' + wordAttempt);
		//console.log("Mouse Over wordStarted is set to " + wordStarted);

	}

}

function letterMouseUp() {
	wordStarted = false;
	var selectedLetters = document.getElementsByClassName("selected");
	var match = false;
	l = selectedLetters.length;
	for (var i = 0; i < wordList.length; i++)
	{
		var word = wordList[i].toUpperCase();
		var reverse = word.split("").reverse().join("");
		if ((wordAttempt == word) || (wordAttempt == reverse))
		{
			match = true
			var words = document.getElementsByClassName("word");
			for (var m = 0; m < words.length; m++)
			{
				if (word == words[m].innerHTML.toUpperCase())
				{
					words[m].className = "foundWord";
					break;
				}
			}
			for (var x = 0; x < l; x++) 
			{
				console.log("word matches");
				selectedLetters[0].className = "found";	
			}
			break;
		}
	}

	wordAttempt = '';

	if (match == false)
	{
		for (var i = 0; i < l; i++) 
		{
			selectedLetters[0].className = "letter";	
		}
	}
	
	
}

/*function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
}*/

function parse(string){
	var args = [].slice.call(arguments, 1), i=0;
	return string.replace(/%s/g, function() {return args[i++];});
}

initBlock();
fillBlockWithWords();
fillBlankWithLetters();
printBlock();
printWords();


