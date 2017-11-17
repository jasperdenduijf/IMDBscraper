# Name: Jasper den Duijf
# Number: 10217584
# 
# Data Processing, week 3
# Turn CSV file into json file

import json

# Open the csv file and delete the first rows.
file = open('rain2015.txt', 'r') 
rows = file.readlines()[13:]

# Create a table filled with the data.
dailyTable = []
for row in rows:
	dailyTable.append([int(row[2:5]), row[6:14], int(row[15:20])])

# Sums the rain for every month.
monthlyTable = []
lastMonth = 00
for entry in dailyTable:
	# Removes all -1 mm rain.
	if entry[2] == -1:
		entry[2] == 0
	
	# If the month changes, create new entry.
	if lastMonth != entry[1][4:6]:
		lastMonth = entry[1][4:6]
		monthlyTable.append(entry[2])
	# Add more rain to the rain.
	else:
		monthlyTable[int(entry[1][4:6]) - 1] += entry[2]

# Create months.
monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']

# Create the data in the right form.
data = []
for i in range(0, len(monthNames)):
	month = {}
	month['Rain'] = monthlyTable[i]
	month['Name'] = monthNames[i]
	data.append(month)
# Create a json file.
with open('rain2015.json', 'w') as outfile:
    json.dump(data, outfile)