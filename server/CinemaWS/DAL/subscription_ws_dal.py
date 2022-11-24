import requests

class SubscriptionWSDAL:
    def __init__(self):
        self.__url = "http://127.0.0.1:5000/subscriptions"

    def get_all_subscriptions(self):
        resp= requests.get(self.__url)
        return resp.json()

    def get_subscription(self,id): 
        resp = requests.get(self.__url+"/" + id)
        return resp.json()

    def add_subscription(self,obj):
        resp = requests.post(self.__url, json=obj)
        return resp.text

    def update_subscription(self,id,obj):
        resp = requests.put(self.__url + "/" + id, json=obj)
        return resp.text

    def delete_subscription(self,id):
        resp = requests.delete(self.__url + "/" + id)
        return resp.text