from flask import Blueprint,jsonify,request
from BLL.movie_bl import *
from routers.auth_router import *

movies = Blueprint('movies',__name__)
movies_bl = MovieBL()

#get ALL
@movies.route("/", methods=['GET'])
def get_all_movies():
    sub_join = request.args.get("sub_join",default=False)
    movies = movies_bl.get_all_movies(sub_join)
    return movies


@movies.route("/<id>",methods=['GET'])
def get_movie(id):
    #movie_recv = action_verify_token(movies_bl.get_movie,[id])
    movie_recv = movies_bl.get_movie(id)
    return movie_recv


@movies.route("/",methods=['POST'])
def add_movie():
    obj = request.json
    resp= movies_bl.add_movie(obj)
    return resp


@movies.route("/<id>",methods=['PUT'])
def update_movie(id):
    obj=request.json
    resp=movies_bl.update_movie(id,obj)
    return resp

@movies.route("/<id>",methods=['DELETE'])
def delete_movie(id):
    resp=movies_bl.delete_movie(id)
    return resp



 