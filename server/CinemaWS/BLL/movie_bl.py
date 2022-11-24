from datetime import datetime
from DAL.movie_ws_dal import MovieWSDAL

#from DAL.emp_to_movie_ws_dal import *
#from BLL.action_bl import ActionBL
""" from flask import g """
class MovieBL:
    def __init__(self):
        self.__movie_ws_dal = MovieWSDAL()


    def get_all_movies(self,sub_join=False):
        if(sub_join==False):
            movies = self.__movie_ws_dal.get_all_movies()
        else:
            movies = self.__movie_ws_dal.get_all_movies_join()
        #movies = self.__movie_ws_dal.get_all_movies()
        return movies


    def get_movie(self,id):
        movie = self.__movie_ws_dal.get_movie(id)
        return movie

    def add_movie(self,obj):
        """   datetime_obj = datetime.strptime(obj["premiered"], '%Y-%m-%d')
        obj["premiered"] = datetime_obj """
        resp = self.__movie_ws_dal.add_movie(obj)
        return resp

    def update_movie(self,id,obj):
        resp = self.__movie_ws_dal.update_movie(id,obj)
        return resp

    def delete_movie(self,id):
        resp = self.__movie_ws_dal.delete_movie(id)
        return resp