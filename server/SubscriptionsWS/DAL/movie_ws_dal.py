import requests

class MovieWSDAL:
    def __init__(self):
        self.__url = "https://api.tvmaze.com/shows"

    def get_all_movies(self):
        resp= requests.get(self.__url)
        return resp.json()