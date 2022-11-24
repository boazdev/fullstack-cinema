import requests

class MemberWSDAL:
    def __init__(self):
        self.__url = "http://127.0.0.1:5000/members"

    def get_all_members(self):
        resp= requests.get(self.__url)
        return resp.json()
        
    def get_all_members_join(self):
        resp= requests.get(self.__url+"/?sub_join=true")
        return resp.json()

    def get_member(self,id): 
        resp = requests.get(self.__url+"/" + id)
        return resp.json()

    def add_member(self,obj):
        resp = requests.post(self.__url, json=obj)
        return resp.text

    def update_member(self,id,obj):
        resp = requests.put(self.__url + "/" + id, json=obj)
        return resp.text

    def delete_member(self,id):
        resp = requests.delete(self.__url + "/" + id)
        return resp.text