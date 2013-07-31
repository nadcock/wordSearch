#!/usr/bin/python
import urllib2
import re
from bs4 import BeautifulSoup, SoupStrainer
import cgi
import cgitb
import json
import random

cgitb.enable()

form = cgi.FieldStorage()
topic = form["topic"].value
topic = topic.replace(" ", "_")

print "Content-Type: application/json"
print

url = 'http://en.wikipedia.org/w/index.php?title=' + topic 
opener = urllib2.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0')]
page = opener.open(url)
html = page.read()
opener.close()

soup = BeautifulSoup(html, 'html.parser')

content = soup.findAll("div", {"id": "bodyContent"})
paragraphs = []
words = []
links = []
for c in content:
	paragraphs = c.findAll('p')
	for p in paragraphs:
		links = p.findAll('a')
		for link in links:
			#if link.has_attr('href'):
			words.append(link.text)
newList = []
for word in words:
	newList.append(word.encode('ascii', 'replace').lower())
words = newList
	
newList = []
for word in words:
	if word not in newList:
		newList.append(word)
words = newList

newList = []
for word in words:
	valid = False
	if re.match("^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\-'\s]+$", word) is not None:
		valid = True
	if ((len(word.replace(" ", "")) > 20) and (valid == True)):
		valid = False
	if valid:
		newList.append(word)
words = newList

newList = []
if len(words) > 25:
	while len(newList) <= 25:
		randPos = random.randint(0,len(words))
		if words[randPos] not in newList:
			newList.append(words[randPos])
words = newList

response = json.dumps(words)
print response

#ascii_wordlist = [w.encode('ascii', 'replace') for w in words]


#for word in words:
#	print word.encode("ascii", 'replace')

# for word in words:
# 	if re.match("^[\W]+$", word) is None:
# 		if word in words:
# 			words.remove(word)
