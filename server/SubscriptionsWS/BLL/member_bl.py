from DAL.member_ws_dal import MemberWSDAL
from DAL.member_db_dal import *
from DAL.movie_db_dal import *
from DAL.subscription_db_dal import *
""" from flask import g """
class MemberBL:
    def __init__(self):
        self.__member_ws_dal = MemberWSDAL()
        self.__member_db_dal = MemberDBDAL()
        self.__movie_db_dal = MovieDBDAL()
        self.__subscription_db_dal = SubscriptionDBDAL()
    def init_members_db(self):
        members = self.__member_ws_dal.get_all_members()
        membersLst = list(map(lambda item: {"name":item["name"], "email": item["email"], "city":item["address"]["city"]},members))
        """ print("members list: " + str(membersLst)) """
        self.__member_db_dal.add_many_members(membersLst)

    def get_all_members(self):
        members = self.__member_db_dal.get_all_members()
        return members

    def get_all_members_aggr(self):
        pipeline =[{"$lookup": {
            "from": "subscriptions",
            "localField": "_id",
            "foreignField": "memberId",
            "as": "movies"
        }},
    {"$set": {
    "movies": {"$first": "$movies.movies"},
  }}]
        members = self.__member_db_dal.get_member_aggr(pipeline)
        
        for member in members:
            #print(member)
            if member.get("movies")==None:
                member["movies"]=[]
         
        return members

    def get_all_members_ws(self):
        members = self.__member_ws_dal.get_all_members()
        return members

    def get_member(self,id):
        member = self.__member_db_dal.get_member(id)
        return member

    def add_member(self,obj):
        resp = self.__member_db_dal.add_member(obj)
        return resp

    def update_member(self,id,obj):
        resp = self.__member_db_dal.update_member(id,obj)
        return resp

    def delete_member(self,id): #todo:delete subscription
        resp = self.__member_db_dal.delete_member(id)
        resp2 = self.__subscription_db_dal.delete_subscription_by_member(id)
        print(resp2)
        return resp