#!/usr/bin/env python
# Name: Jasper den Duijf
# Student number: 10217584
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv

from pattern.web import URL, DOM, plaintext, Element

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

# the number op films on the IMDB page
FILMTOP = 50

def extract_tvseries(dom):
	# extract the elements from the dom and put them in 
	# the table list_movie (a list of lists)
	list_movie = []
	for x in range(0, FILMTOP):
		list_movie.append([])
	
	# filmindex keeps record of the correct movie
	filmindex = 0
	
	# every movie is kept in a div of the class lister-item-content
	for e in dom('div.lister-item-content'): 
		# find the title, translate it from unicode and adds it to the table
		for h3 in e('h3.lister-item-header')[:1]: 
			list_movie[filmindex].append((h3.by_tag('a')[0].content).encode('utf-8'))
		# find the score, translate it from unicode and adds it to the table
		for d in e('div.inline-block')[:1]:
			list_movie[filmindex].append(d.by_tag('strong')[0].content.encode('utf-8'))
		# the genre and runtime are both in the same part called text-muted
		for p in e('p.text-muted'):
			# find the genre, translate it from unicode and adds it to the table
			for span in p('span.genre'):
				list_movie[filmindex].append(span.content.rstrip()[1:].encode('utf-8'))
			# find the runtime, translate it from unicode and adds it to the table
			for span in p('span.runtime'):
				list_movie[filmindex].append(span.content.rstrip().encode('utf-8'))
		# find the actors, translate it from unicode and adds it to the table
		for p in e('p')[2]:
			string = []
			# for loop to add every actor to the same string
			for a in p:
				string.append(str(a))
			list_movie[filmindex].append(string)
		filmindex += 1
	# removes empty entries, swap runtime and actors to fit the right form
	for j in range(0,FILMTOP):
		stars = list_movie[j][5][0] + ", " + list_movie[j][7][0] + ", " + list_movie[j][9][0] + ", " + list_movie[j][11][0]
		list_movie[j] = list_movie[j][:4]
		list_movie[j].append(stars)
		list_movie[j][3], list_movie[j][4] = list_movie[j][4], list_movie[j][3]
	return list_movie
   
   
def save_csv(f, tvseries):
	# writes the content of a table to a csv-file
	writer = csv.writer(f)
	# add headers
	writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])
	# add every entry in the csv file
	for i in range(0, FILMTOP):
		writer.writerow(tvseries[i])
	


if __name__ == '__main__':
    # download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # parse the HTML file into a DOM representation
    dom = DOM(html)

    # extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)