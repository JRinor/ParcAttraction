from flask import Flask, jsonify, request
from flask_cors import CORS

import request.request as req
import controller.auth.auth as user
import controller.attraction as attraction

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/')
def hello_world():
    return 'Hello, Docker!!'

# Handle preflight requests
@app.before_request
def before_request():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()

def _build_cors_preflight_response():
    response = jsonify()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

# Attraction
@app.post('/attraction')
def addAttraction():
    print("okok", flush=True)
    # Fonction vérif token
    checkToken = user.check_token(request)
    if (checkToken != True):
        return checkToken

    json = request.get_json()
    retour = attraction.add_attraction(json)
    if (retour):
        return _corsify_actual_response(jsonify({"message": "Element ajouté.", "result": retour})), 200
    return _corsify_actual_response(jsonify({"message": "Erreur lors de l'ajout.", "result": retour})), 500

@app.get('/attraction')
def getAllAttraction():
    result = attraction.get_all_attraction()
    return _corsify_actual_response(jsonify(result)), 200

@app.get('/attraction/visible')
def getAllVisibleAttraction():
    result = attraction.get_all_visible_attraction()
    return _corsify_actual_response(jsonify(result)), 200

@app.get('/attraction/<int:index>')
def getAttraction(index):
    result = attraction.get_attraction(index)
    return _corsify_actual_response(jsonify(result)), 200

@app.delete('/attraction/<int:index>')
def deleteAttraction(index):
    # Fonction vérif token
    checkToken = user.check_token(request)
    if (checkToken != True):
        return checkToken

    json = request.get_json()
    
    if (attraction.delete_attraction(index)):
        return _corsify_actual_response(jsonify({"message": "Element supprimé."})), 200
    return _corsify_actual_response(jsonify({"message": "Erreur lors de la suppression."})), 500

@app.post('/login')
def login():
    json = request.get_json()

    if (not 'name' in json or not 'password' in json):
        result = jsonify({'messages': ["Nom ou/et mot de passe incorrect"]})
        return _corsify_actual_response(result), 400
    
    cur, conn = req.get_db_connection()
    requete = f"SELECT * FROM users WHERE name = '{json['name']}' AND password = '{json['password']}';"
    cur.execute(requete)
    records = cur.fetchall()
    conn.close()

    result = jsonify({"token": user.encode_auth_token(list(records[0])[0]), "name": json['name']})
    return _corsify_actual_response(result), 200

@app.post('/comments')
def add_comment():
    json = request.get_json()
    result = attraction.add_comment(json)
    if result:
        return _corsify_actual_response(jsonify({"message": "Comment added successfully", "result": result})), 200
    return _corsify_actual_response(jsonify({"message": "Error adding comment"})), 500

@app.get('/comments/attraction/<int:attraction_id>')
def get_comments(attraction_id):
    result = attraction.get_comments(attraction_id)
    if result:
        return _corsify_actual_response(jsonify(result)), 200
    return _corsify_actual_response(jsonify({"message": "Error fetching comments"})), 500