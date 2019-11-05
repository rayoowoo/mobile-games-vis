from flask import Flask
from fastparquet import ParquetFile
from datetime import datetime
import pandas as pd

app = Flask(__name__)
data = pd.read_parquet('data/games.parq')

@app.route('/names', methods=['GET'])
def names():
    names = data['Name']
    json_names = names.to_json(orient='index')
    return json_names

@app.route('/rating-language', methods=['GET'])
def rating_language():
    games = data[['Name', 'Average User Rating', 'Language Count']]
    games = games[games['Average User Rating'] != 0.0]
    json_games = games.to_json(orient='index')
    return json_games

# @app.route('/')

if __name__ == "__main__":
    app.run(debug=True)