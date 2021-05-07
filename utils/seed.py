import json
import os
from pymongo import MongoClient
from bson.objectid import ObjectId
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['test']
ingredient = db['ingredients']
recipe = db['recipes']
f = open("/home/cryptus/Desktop/appetizers1-100.json")
asd = []
ingred = []
jsonA = json.load(f)
for i in jsonA:
    for j in i['tags']:
        if j not in ingred:
            d = {}
            d['name'] = j
            ingred.append(j)
            asd.append(d)
# def remDup(asd):
#     x = []
#     for i in asd:
#         if i not in x:
#             x.append(i)
#     return x
ingredient.insert_many(asd)
count = 0
comments = [
    {
        'userId': 'sadasdasdasdasdsad',
        'comment': 'Dark jokes are like food, not everyone gets it'
    }
]
print(ingred)
for i in jsonA:
    if 'video' in i['video'] and 'cook:' in i and 'prep:' in i and 'total:' in i:
        name = ' '.join(i['video'].split('/')[-2].split('-')).title()
        i['name'] = name
        i['cook'] = i['cook:']
        i['prep'] = i['prep:']
        try:
            i['additional'] = i['additional:']
            del i['additional:']
        except:
            pass
        i['total'] = i['total:']
        i['serves'] = i['Servings:']
        del i['cook:']
        del i['prep:']
        del i['total:']
        del i['Servings:']
        i['author'] = 'Sample User ObjectId'
        i['likes'] = ['User1Id', 'User1Id', 'User1Id', 'User1Id', 'User1Id']
        i['comments'] = comments
        try:
            del i['Yield']
        except:
            pass
        for j in range(len(i['tags'])):
            i['tags'][j] = ingredient.find_one({'name': i['tags'][j]})['_id']
        recipe.insert_one(i)
        count = count+1
        print(count)
