var blockHeight = 20;
var blockWidth = 35;
var searchBlock = new Array();
var wordStarted = new Boolean();
var firstLetter = new Boolean();
var wordAttempt = '';
var lastCoord = new Array();
var originCoord = new Array();
var widthAndHeight;
var alreadyFoundLetter = new Array();
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
		firstLetter = false;
	}
}

function fillBlockWithWords(){
	for(var i=0; i < wordList.length; i++)
	{
		word = wordList[i];
		word = word.replace(/\s+/g, '');
		word = word.replace("-", '');
		word = word.replace("'", '');
		//console.log(word);
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
				console.log(parse('%s was placed on board', word));
				console.log(parse('at coords: ', result[1]));

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
			console.log(parse('%s was not able to be placed on board.', word));
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
	
	if ((this.className == "letter") || (this.className == "found"))
	{
		var id = this.id;
		originCoord = id.split(',');
		if (this.className == 'found')
		{
			alreadyFoundLetter.push(this.id);
		}
		this.className = "selected";
		var elemBounds = this.getBoundingClientRect();
		firstLetter = true;
	}
	wordStarted = true;	
}

function letterMouseOver() {
	//clearSelection();
	var id = this.id;
	var thisCoords = id.split(',');
	if ((wordStarted == true) && (firstLetter == true))
	{
		selectHereToOrigin(thisCoords);		
	} else if ((wordStarted == true) && (firstLetter != false)) {
		originCoord = thisCoords;
		this.className = "selected";
		firstLetter = true;
		//console.log("Set in MouseOver");
	}
	
	//console.log('Array: ' + thisCoords[0] + ':' + thisCoords[1]);
	//console.log("Mouse Over wordStarted is set to " + wordStarted);
}

function letterMouseUp() {
	wordStarted = false;
	firstLetter = false;
	var selectedLetters = document.getElementsByClassName("selected");
	var match = false;
	l = selectedLetters.length;
	for (var i = 0; i < wordList.length; i++)
	{
		var word = wordList[i].toUpperCase();
		var valid_word = word.replace(/\s+/g, '');
		valid_word = valid_word.replace("-", '');
		valid_word = valid_word.replace("'", '');
		var reverse = valid_word.split("").reverse().join("");
		if ((wordAttempt == valid_word) || (wordAttempt == reverse))
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
				//console.log("word matches");
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
	for (var i = 0; i < alreadyFoundLetter.length; i++)
	{
		document.getElementById(alreadyFoundLetter[i]).className = 'found';
	}
	
	
}

function selectHereToOrigin(thisCoords) {
	wordAttempt = "";
	var selectedLetters = document.getElementsByClassName("selected");
	var l = selectedLetters.length; 
	for (var i = 0; i < l; i++) 
		{
			selectedLetters[0].className = "letter";	
		}
	
	if (thisCoords[0] == originCoord[0])
	{
		for (var i = 0; i <= Math.abs(originCoord[1] - thisCoords[1]); i++)
		{
			if (originCoord[1] - thisCoords[1] > 0) {
				var newy = parseInt(originCoord[1]) - i;
			} else {
				var newy = parseInt(originCoord[1]) + i;
			}	
			var elem = document.getElementById(originCoord[0].toString() + "," + newy.toString());
			if (elem.className == 'found') 
			{
				alreadyFoundLetter.push(elem.id);
			}
			elem.className = "selected";
			wordAttempt = wordAttempt.concat(elem.innerHTML);
		}
	} else if (thisCoords[1] == originCoord[1]) {
		for (var i = 0; i <= Math.abs(originCoord[0] - thisCoords[0]); i++)
		{
			if (originCoord[0] - thisCoords[0] > 0) {
				var newy = parseInt(originCoord[0]) - i;
			} else {
				var newy = parseInt(originCoord[0]) + i;
			}
			var elem = document.getElementById(newy.toString() + "," + originCoord[1].toString());
			elem.className = "selected";
			wordAttempt = wordAttempt.concat(elem.innerHTML);
		}
	} else if (((thisCoords[1] - originCoord[1]) / (thisCoords[0] - originCoord[0])) == 1) {
		for (var i = 0; i <= Math.abs(originCoord[0] - thisCoords[0]); i++)
		{
			if (parseInt(originCoord[0]) < parseInt(thisCoords[0])) {
				var newx = parseInt(originCoord[0]) + i;
				var newy = parseInt(originCoord[1]) + i;
			} else {
				var newx = parseInt(originCoord[0]) - i;
				var newy = parseInt(originCoord[1]) - i;
			}
			var elem = document.getElementById(newx.toString() + "," + newy.toString());
			elem.className = "selected";
			wordAttempt = wordAttempt.concat(elem.innerHTML);
		}
	} else if (((thisCoords[1] - originCoord[1]) / (thisCoords[0] - originCoord[0])) == -1) {
		for (var i = 0; i <= Math.abs(originCoord[0] - thisCoords[0]); i++)
		{
			if (parseInt(originCoord[0]) < parseInt(thisCoords[0])) {
				var newx = parseInt(originCoord[0]) + i;
				var newy = parseInt(originCoord[1]) - i;
			} else {
				var newx = parseInt(originCoord[0]) - i;
				var newy = parseInt(originCoord[1]) + i;
			}
			var elem = document.getElementById(newx.toString() + "," + newy.toString());
			elem.className = "selected";
			wordAttempt = wordAttempt.concat(elem.innerHTML);
		}
	}
}

function getTopicFromForm(){
	var form = document.forms['getTopic'];
	var topic = form.topic.value;
	topic = escape(topic);
	return topic;
}

function makeXMLHttpRequest() {
	var topic = getTopicFromForm();
	$.getJSON('scrambler.py?topic=' + topic, function(data) {
		wordList = [];
		//console.log(wordList);
		for (var i = 0; i < data.length; i++) {
			wordList.push(data[i]);
			//console.log(wordList);
		}
		if (wordList.length < 1) {
			wordList = wordList = new Array("handkerchief", "scissors", "soap", "spine", "religion", "law", "wisdom", "chimp", "blonde", "granite", "plug", "pumpkin", "fleet", "oven", "tart", "parachute", "hour", "pasta", "board", "wheelbarrow");
		}
		initBlock();
		fillBlockWithWords();
		fillBlankWithLetters();
		printBlock();
		printWords();
	});
	
}

function resetSearchBlock() {
	var elem = document.getElementById('search-block');
	while (elem.hasChildNodes()) {
    	elem.removeChild(elem.lastChild);
    }
    elem = document.getElementById('wordList');
    while (elem.hasChildNodes()) {
    	elem.removeChild(elem.lastChild);
	}		
}

function buildBlockFromTopic() {
	resetSearchBlock();
	//console.log("triggered");
	makeXMLHttpRequest();
	
}





function parse(string){
	var args = [].slice.call(arguments, 1), i=0;
	return string.replace(/%s/g, function() {return args[i++];});
}

var script = document.createElement('script');
script.src = 'http://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


