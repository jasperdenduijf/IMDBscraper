import json

file = open('weather.txt', 'r') 
rows = file.readlines()

print(len(rows))
Table = []
for row in rows:
	Table.append([int(row[2:5]), int(row[6:14]), int(row[15:20]), int(row[21:26]), int(row[27:])])

print(Table[:10])
Names = ['Station', 'Date', 'Temp', 'RainTime', 'RainAmmount']

data = []
for i in range(0, len(Table)):
	month = {}
	for j in range(0, len(Names)):
		month[Names[j]] = Table[i][j]
	data.append(month)

with open('weather.json', 'w') as outfile:
    json.dump(data, outfile)