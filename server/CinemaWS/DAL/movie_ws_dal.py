import requests

class MovieWSDAL:
    def __init__(self):
        self.__url = "http://127.0.0.1:5000/movies"

    def get_all_movies(self):
        resp= requests.get(self.__url)
        return resp.json()

    def get_all_movies_join(self):
        resp= requests.get(self.__url+"/?sub_join=true")
        return resp.json()

    def get_movie(self,id): 
        resp = requests.get(self.__url+"/" + id)
        return resp.json()

    def add_movie(self,obj):
        resp = requests.post(self.__url, json=obj)
        return resp.text

    def update_movie(self,id,obj):
        resp = requests.put(self.__url + "/" + id, json=obj)
        return resp.text

    def delete_movie(self,id):
        resp = requests.delete(self.__url + "/" + id)
        return resp.text