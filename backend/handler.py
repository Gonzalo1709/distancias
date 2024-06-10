from flask import Flask, request
from flask_cors import CORS, cross_origin
import requests
import geopy.distance

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def mainHandler():
    country1 = request.args.get('country1')
    country2 = request.args.get('country2')
    city1 = request.args.get('city1')
    city2 = request.args.get('city2')

    data1 = requests.get(f"https://nominatim.openstreetmap.org/search?q={country1}+{city1}&format=json").json()
    data2 = requests.get(f"https://nominatim.openstreetmap.org/search?q={country2}+{city2}&format=json").json()

    lat1 = data1[0]['lat']
    lon1 = data1[0]['lon']
    lat2 = data2[0]['lat']
    lon2 = data2[0]['lon']

    coords_1 = (lat1, lon1)
    coords_2 = (lat2, lon2)
    distance = geopy.distance.distance(coords_1, coords_2).km

    return {
        "distance": distance
    }

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)