from flask import Flask
from fastparquet import ParquetFile
from datetime import datetime
import pandas as pd

app = Flask(__name__)
data = pd.read_parquet('data/games.parq')

@app.route('/names', methods=['GET'])
def names():
    names = data['Name']
    json_data = names.to_json(orient='index')
    return json_data

if __name__ == "__main__":
    app.run(debug=True)