import numpy as np
import pandas as pd
import sklearn as sk
import json
import statsmodels as stats
from pprint import pprint


books = pd.read_json('./tmp/test.json')
user = pd.read_json('./tmp/user.json')
books['female_casual'] = 0
books['male_casual'] = 0
books['highbrow'] = 0
books['self_improvement'] = 0
books['geek'] = 0
books['engaging_nonfiction'] = 0
books['poetry_phil_drama'] = 0
books['academic'] = 0
user['academic'] = 0
user['female_casual'] = 0
user['male_casual'] = 0
user['highbrow'] = 0
user['self_improvement'] = 0
user['geek'] = 0
user['engaging_nonfiction'] = 0
user['poetry_phil_drama'] = 0


persona_map = {'Female casual reader': ['Chick lit', 'Contemporary', 'Mystery', 'Romance', 'Biography', 'True story', 'Historical fiction', 'Thriller'],
    'Male casual reader': ['Contemporary', 'Mystery', 'Biography', 'True story', 'Historical fiction', 'Crime', 'Horror', 'Science fiction', 'Sports', 'Thriller', 'Business'],
    'Contemporary and classic highbrow fiction': ['Contemporary', 'Classics'],
    'Self-improvement': ['Self-help', 'Business'],
    'Geek': ['Science fiction', 'Fantasy'],
    'Engaging nonfiction': ['Science', 'Social issues', 'Politics'],
    'Poetry/philosophy/drama': ['Poetry', 'Philosophy', 'Drama'],
    'Academic': ['Politics', 'Social issues', 'Academic', 'Contemporary', 'Classics', 'History', 'Science']}

celeb_map = {'sonia_sotomayor': ['Contemporary and classic highbrow fiction', 'Geek'],
    'bill_clinton': ['Male casual reader', 'Self-improvement', 'Contemporary and classic highbrow fiction', 'Engaging nonfiction'],
    'elon_musk': ['Self-improvement', 'Geek'],
    'mark_cuban': ['Male casual reader', 'Self-improvement'],
    'julia_roberts': ['Female casual reader', 'Contemporary and classic highbrow fiction'],
    'gwyneth_paltrow': ['Contemporary and classic highbrow fiction'],
    'hillary_clinton': ['Female casual reader', 'Contemporary and classic highbrow fiction', 'Engaging nonfiction'],
    'steve_jobs': ['Male casual reader', 'Self-improvement', 'Geek'],
    'warren_buffett': ['Male casual reader', 'Self-improvement'],
    'jay-z': ['Male casual reader', 'Self-improvement'],
    'michelle_obama': ['Female casual reader', 'Contemporary and classic highbrow fiction'],
    'oprah_winfrey': ['Female casual reader', 'Contemporary and classic highbrow fiction', 'Self-improvement'],
    'anderson_cooper': ['Male casual reader', 'Contemporary and classic highbrow fiction', 'Academic'],
    'jk_rowling': ['Female casual reader', 'Contemporary and classic highbrow fiction', 'Geek'],
    'david_foster_wallace': ['Contemporary and classic highbrow fiction', 'Academic'],
    'jennifer_lawrence': ['Female casual reader', 'Contemporary and classic highbrow fiction'],
    'tony_hawk': ['Male casual reader'],
    'sheryl_sandberg': ['Self-improvement', 'Engaging nonfiction'],
    'malcolm_gladwell': ['Male casual reader', 'Self-improvement', 'Engaging nonfiction'],
    'stephenie_meyer': ['Female casual reader', 'Contemporary and classic highbrow fiction']}

genre_map = {'Chick lit': ['Female casual reader'],
    'Academic': ['Academic'],
    'Christian': ['Female casual reader'],
    'Contemporary': ['Academic', 'Female casual reader', 'Male casual reader', 'Contemporary and classic highbrow fiction'],
    'Mystery': ['Female casual reader', 'Male casual reader'],
    'Romance': ['Female casual reader'],
    'Biography': ['Male casual reader', 'Female casual reader'],
    'True story': ['Female casual reader', 'Male casual reader'],
    'Historical fiction': ['Female casual reader', 'Male casual reader', 'Contemporary and classic highbrow fiction'],
    'Humor': ['Female casual reader', 'Male casual reader'],
    'Crime': ['Male casual reader'],
    'Health': ['Female casual reader'],
    'History': ['Academic', 'Engaging nonfiction'],
    'Horror': ['Male casual reader'],
    'Science fiction': ['Male casual reader', 'Geek'],
    'Sports': ['Male casual reader'],
    'Thriller': ['Female casual reader', 'Male casual reader'],
    'Business': ['Male casual reader', 'Self-improvement'],
    'Classics': ['Academic', 'Contemporary and classic highbrow fiction'],
    'Self-help': ['Self-improvement'],
    'Parenting': ['Self-improvement'],
    'Fantasy': ['Geek'],
    'Science': ['Academic', 'Engaging nonfiction'],
    'Social issues': ['Academic', 'Engaging nonfiction'],
    'Politics': ['Academic', 'Engaging nonfiction'],
    'Suspense': ['Female casual reader', 'Male casual reader'],
    'Western': ['Male casual reader']}

score_map = {'Female casual reader': 'female_casual',
    'Male casual reader': 'male_casual',
    'Contemporary and classic highbrow fiction': 'highbrow',
    'Self-improvement': 'self_improvement',
    'Geek': 'geek',
    'Engaging nonfiction': 'engaging_nonfiction',
    'Poetry/philosophy/drama': 'poetry_phil_drama',
    'Academic': 'academic'}

passageMap = {'The Silmarillion': ['Geek'],
    'A Collection of Essays': ['Contemporary and classic highbrow fiction', 'Engaging nonfiction', 'Poetry/philosophy/drama'],
    'Nudge': ['Self-improvement', 'Engaging nonfiction'],
    'The Structure of Scientific Revolutions': ['Geek', 'Engaging nonfiction', 'Academic', 'Poetry/philosophy/drama'],
    'The 4-Hour Workweek': ['Self-improvement', 'Male casual reader'],
    'What Ever Angel Investor Wants You to Know': ['Self-improvement', 'Male casual reader'],
    'A Meeting by the River': ['Contemporary and classic highbrow fiction', 'Female casual reader'],
    'Life in a Jar: The Irena Sendler Project': ['Female casual reader', 'Male casual reader'] }

personas = ['female_casual', 'male_casual', 'highbrow', 'self_improvement', 'geek', 'engaging_nonfiction', 'poetry_phil_drama']

books[personas] = books[personas].astype(float)
user[personas] = user[personas].astype(float)

def calcPersonaScore(book):
    personas = book['personas']
    for persona in personas:
        persona = persona[0]
        if score_map[persona]:
            book[score_map[persona]] = book[score_map[persona]] + 1
            print(book[score_map[persona]])

def calcBookPersonas(books):
    for i in range(len(books.index)):
        genre = books['Genre 1'][i]
        personas = genre_map[genre]
        for persona in personas:
            personaKey = score_map[persona]
            books[personaKey][i] = books[personaKey][i] + 1
        if books['Genre 2'][i]:
            genre = books['Genre 2'][i]
            personas = genre_map[genre]
            for persona in personas:
                personaKey = score_map[persona]
                books[personaKey][i] = books[personaKey][i] + 1

def calcCelebPersonas(books):
    for i in range(len(books.index)):
        if books['celebs'][i]:
            celebs = books['celebs'][i]
            for celeb in celebs:
                personas = celeb_map[celeb]
                for persona in personas:
                    personaKey = score_map[persona]
                    books[personaKey][i] = books[personaKey][i] + 1

def calcUserCelebPersonas(user):
    if user['celebs'][0]:
        celebs = user['celebs'][0]
        for celeb, val in celebs.items():
            if val == True:
                personas = celeb_map[celeb]
                for persona in personas:
                    personaKey = score_map[persona]
                    user[personaKey][0] = user[personaKey][0] + 1

def calcUserPassagePersonas(user):
    if user['passages'][0]:
        passages = user['passages'][0]
        for passage, val in passages.items():
            if val == True:
                personas = passageMap[passage]
                for persona in personas:
                    personaKey = score_map[persona]
                    user[personaKey][0] = user[personaKey][0] + 1

def userBookScore(user, books):
    userScore = []
    books['userScore'] = 0
    for i in range(len(personas)):
        userScore.append(user[personas[i]][0])
    for i in range(len(books)):
        bookScore = []
        for j in range(len(personas)):
            bookScore.append(books[personas[j]][i])
        result = []
        for j in range(len(bookScore)):
            result.append((bookScore[j]-userScore[j])**2)
        books['userScore'][i] = sum(result)

def run(user,books):
    calcBookPersonas(books)
    calcCelebPersonas(books)
    calcUserCelebPersonas(user)
    calcUserPassagePersonas(user)
    userBookScore(user,books)
    books = books.sort('userScore')
    print books[['ISBN','userScore','Title']].to_json(orient="records")

run(user,books)


