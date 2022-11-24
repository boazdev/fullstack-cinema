from datetime import datetime
from flask import Flask
import json
from bson import ObjectId
from flask_cors import CORS

from routers.member_router import members
from routers.movie_router import movies
from routers.subscription_router import subscriptions
from BLL.member_bl import MemberBL
from BLL.movie_bl import MovieBL


class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        if isinstance(obj, datetime):
            #datetime.date.__str__
            return str(obj.date())         
        return json.JSONEncoder.default(self,obj)

app = Flask(__name__)
app.url_map.strict_slashes = False
app.json_encoder = JSONEncoder
CORS(app)

app.register_blueprint(members, url_prefix="/members")
app.register_blueprint(movies, url_prefix="/movies")
app.register_blueprint(subscriptions, url_prefix="/subscriptions")
""" 
app.register_blueprint(auth, url_prefix="/auth")
 """
#get data from ws and populate the matching db tables
memberBL = MemberBL()
movieBL = MovieBL()

if(len(memberBL.get_all_members())==0):
    memberBL.init_members_db()

if(len(movieBL.get_all_movies())==0):
    movieBL.init_movies_db()

app.run(port=5000)