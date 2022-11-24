from datetime import datetime
from flask import Flask
import json
from bson import ObjectId
from flask_cors import CORS

from enconder import JSONEncoder
from routers.subscription_router import subscriptions
from routers.user_router import users
from routers.movie_router import movies
from routers.member_router import members
from routers.auth_router import auth, verify_token
from flask import request



app = Flask(__name__)
app.url_map.strict_slashes = False
app.json_encoder = JSONEncoder
CORS(app)
app.before_request(verify_token)
app.register_blueprint(users, url_prefix="/users")
app.register_blueprint(movies, url_prefix="/movies")
app.register_blueprint(members, url_prefix="/members")
app.register_blueprint(subscriptions, url_prefix="/subscriptions")
app.register_blueprint(auth, url_prefix="/login")


app.run(port=8080) #the CinemaWS will run on port 8080. SubsWS on port 5000