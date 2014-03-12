import numpy as np
import pandas as pd
import sklearn as sk
import json
import statsmodels as stats
from pprint import pprint


d = pd.read_json('./tmp/test.json') 
pprint(d) 
d = d.drop(['Author', 'Genre 1', 'Genre 2', 'Celebrities', 'Female/Male/Both', 'Length', 'Persona 1', 'Persona 2', 'Title'], axis=1)

