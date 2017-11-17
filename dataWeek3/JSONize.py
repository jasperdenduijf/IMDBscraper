import json

file = open('rain2015.txt', 'r') 
rows = file.readlines()[13:]

dailyTable = []
for row in rows:
	dailyTable.append([int(row[2:5]), row[6:14], int(row[15:20])])

monthlyTable = []
lastMonth = 00
for entry in dailyTable:
	if entry[2] == -1:
		entry[2] == 0
	
	if lastMonth != entry[1][4:6]:
		lastMonth = entry[1][4:6]

		monthlyTable.append(entry[2])
	else:
		monthlyTable[int(entry[1][4:6]) - 1] += entry[2]

monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']

data = []
for i in range(0, len(monthNames)):
	month = {}
	month['Rain'] = monthlyTable[i]
	month['Name'] = monthNames[i]
	data.append(month)
with open('rain2015.json', 'w') as outfile:
    json.dump(data, outfile)