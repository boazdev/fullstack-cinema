from pymongo import MongoClient
from bson import ObjectId

class MovieDBDAL:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["subscriptionsDB"]
        self.__collection = self.__db["movies"]
    
    def get_movie(self,id): 
        movie = self.__collection.find_one({"_id":ObjectId(id)})
        return movie

    def get_movie_aggr(self,pipeline):
        movie = self.__collection.aggregate(pipeline)
        return list(movie)

    
    def get_all_movies(self):
        movies = list(self.__collection.find({}))
        return movies
    
    def add_movie(self,obj):
        self.__collection.insert_one(obj)
        return "Created movie with ID " +str(obj["_id"])

    def add_many_movies(self,obj):
        self.__collection.insert_many(obj)
        return "Created movies collection"

    def delete_movie(self,id):
        self.__collection.delete_one({"_id":ObjectId(id)})
        return "Deleted movie!"

    def update_movie(self,id,obj):
        self.__collection.update_one({"_id": ObjectId(id)},{"$set":obj})
        return "Updated movie"
