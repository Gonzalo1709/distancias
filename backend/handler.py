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
    city1 = request.args.get('city1')
    country2 = request.args.get('country2')
    city2 = request.args.get('city2')
    country3 = request.args.get('country3')
    city3 = request.args.get('city3')
    option = request.args.get('option')

    data1 = requests.get(f"https://nominatim.openstreetmap.org/search?q={country1}+{city1}&format=json").json()

    data2 = requests.get(f"https://nominatim.openstreetmap.org/search?q={country2}+{city2}&format=json").json()

    data3 = requests.get(f"https://nominatim.openstreetmap.org/search?q={country3}+{city3}&format=json").json()

    lat1 = data1[0]['lat']
    lon1 = data1[0]['lon']
    lat2 = data2[0]['lat']
    lon2 = data2[0]['lon']
    lat3 = data3[0]['lat']
    lon3 = data3[0]['lon']

    coords_1 = (lat1, lon1)
    coords_2 = (lat2, lon2)
    coords_3 = (lat3, lon3)

    distance1_2 = geopy.distance.distance(coords_1, coords_2).km
    distance2_3 = geopy.distance.distance(coords_2, coords_3).km
    distance1_3 = geopy.distance.distance(coords_1, coords_3).km

    if option == 'twoCities':
        final_distance = distance1_2
        closest_distance = final_distance

    elif option == 'threeCities':

        if distance1_2 <= distance1_3 and distance1_2 <= distance2_3:
            closest_distance = f"{city1} - {city2}"
            final_distance = distance1_2
        elif distance1_3 <= distance1_2 and distance1_3 <= distance2_3:
            closest_distance = f"{city1} - {city3}"
            final_distance = distance1_3
        else:
            closest_distance = f"{city2} - {city3}"
            final_distance = distance2_3

    return jsonify({
        "distance": final_distance,
        "closest_distance": closest_distance
    })

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
