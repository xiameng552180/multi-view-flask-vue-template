'''
    The RESTful style api server
'''
from flask import render_template
from flask import Flask, request, redirect, jsonify, send_from_directory
from server import app
from functools import wraps
import hashlib
import random
import time
import datetime
import os
import json
import requests
import subprocess
import pandas as pd
from math import sqrt

dataPath = 'server/data/test.csv'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/loadData', methods=['GET'])
def loadData():
    # print("ok")
    with open(dataPath, 'r') as f:
        temp = pd.read_csv(f)
        data = temp.to_json(orient = "records")
        # print(data)
    return data

@app.route("/test", methods=['POST','GET'])
def register():
    print('hello world!')
    return 'get your request!'




