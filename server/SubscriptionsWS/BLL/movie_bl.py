from datetime import datetime
from DAL.movie_ws_dal import MovieWSDAL
from DAL.movie_db_dal import *
#from DAL.emp_to_movie_db_dal import *
#from BLL.action_bl import ActionBL
""" from flask import g """
class MovieBL:
    def __init__(self):
        self.__movie_ws_dal = MovieWSDAL()
        self.__movie_db_dal = MovieDBDAL()
#datetime.strptime(obj["Date"], '%Y-%m-%d')
    def init_movies_db(self):
        movies = self.__movie_ws_dal.get_all_movies()
        #print("movies: " + str(movies))
        moviesLst = list(map(lambda item: {"name":item["name"], "genres": item["genres"], "image":item["image"]["medium"],
        "premiered": datetime.strptime(item["premiered"],'%Y-%m-%d')},movies))
        """ print("movies list: " + str(moviesLst)) """
        self.__movie_db_dal.add_many_movies(moviesLst)

    def get_all_movies(self):
        movies = self.__movie_db_dal.get_all_movies()
        return movies

    def get_all_movies_aggr(self): 
        movies = self.__movie_db_dal.get_movie_aggr(self.get_pipeline())
        
        """  moviesLst = list(map(lambda item: {"name":item["name"], "genres": item["genres"], "image":item["image"],
        "premiered": item["premiered"], "members":list(map(lambda item2:{"memberId":item2["memberId"],
         "date":list(filter(lambda item3 : item3["movieId"]==item["_id"] ,item2["movies"]),item["members"])[0]["date"],
         "name":"123"})},movies))) """

        moviesLst = list(map(lambda item: {"_id":item["_id"],"name":item["name"], "genres": item["genres"], "image":item["image"],
        "premiered": item["premiered"], "members":list(map(lambda item2:{"memberId":item2["memberId"], 
        "date":list(filter(lambda item3:item3["movieId"]==item["_id"],item2["movies"]))[0]["date"]  , 
        "name":list(filter(lambda item4:item4["_id"]==item2["memberId"],item["memberData"]))[0]["name"]},item["members"]))},movies))

        return moviesLst   

    def get_all_movies_ws(self):
        movies = self.__movie_ws_dal.get_all_movies()
        return movies

    def get_movie(self,id):
        movie = self.__movie_db_dal.get_movie(id)
        return movie

    def add_movie(self,obj):
        datetime_obj = datetime.strptime(obj["premiered"], '%Y-%m-%d')
        obj["premiered"] = datetime_obj
        resp = self.__movie_db_dal.add_movie(obj)
        return resp

    def update_movie(self,id,obj):
        resp = self.__movie_db_dal.update_movie(id,obj)
        return resp

    def delete_movie(self,id): #todo: add delete subscriptions array in subscribptions collections
        resp = self.__movie_db_dal.delete_movie(id)
        return resp

    def get_pipeline(self):
        pipeline=[{"$lookup": {
                "from": "subscriptions",
                "localField": "_id",
                "foreignField": "movies.movieId",
                "as": "members"
            }
        },
        
        {"$lookup": {
                "from": "members",
                "localField": "members.memberId",
                "foreignField": "_id",
                "as": "memberData"
            }
        }]
        return pipeline
        