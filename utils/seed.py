import json
import os
from pymongo import MongoClient
# from bson.objectid import ObjectId
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['test']
ingredient = db['ingredients']
recipe = db['recipes']
f = open("<path_to_json>")
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
ingredient.insert_many(asd)
count = 0
# comments = [
#     {
#         'userId': 'sadasdasdasdasdsad',
#         'comment': 'Dark jokes are like food, not everyone gets it'
#     }
# ]
# print(ingred)
for i in jsonA:
    if 'video' in i['video'] and 'cook:' in i and 'prep:' in i and 'total:' in i:
        name = ' '.join(i['video'].split('/')[-2].split('-')).title()
        i['image'] = i['images'][0]
        i['name'] = name
        i['cookTime'] = i['cook:']
        i['prepTime'] = i['prep:']
        try:
            del i['images']
        except:
            pass
        try:
            del i['additional:']
        except:
            pass
        try:
            del i['total:']
        except:
            pass
        try:
            del i['Yield:']
        except:
            pass
        i['serves'] = i['Servings:']
        del i['cook:']
        del i['prep:']
        del i['Servings:']
        i['author'] = None
        for j in range(len(i['tags'])):
            i['tags'][j] = ingredient.find_one({'name': i['tags'][j]})['_id']
        recipe.insert_one(i)
        count = count+1
        print(count)
