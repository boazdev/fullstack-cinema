from DAL.subscription_db_dal import *
from datetime import datetime
""" from flask import g """
class SubscriptionBL:
    def __init__(self):
        self.__subscription_db_dal = SubscriptionDBDAL()

    def get_all_subscriptions(self):
        subscriptions = self.__subscription_db_dal.get_all_subscriptions()
        return subscriptions

    def get_subscription(self,id):
        subscription = self.__subscription_db_dal.get_subscription(id)
        return subscription

    def add_subscription(self,obj): #obj={memberId:id, movies:[{movieId:id,date:date}]}
        print(obj)
        obj["memberId"] = ObjectId(obj["memberId"])
        obj["movies"][0]["movieId"]=ObjectId(obj["movies"][0]["movieId"])
        obj["movies"][0]["date"]=datetime.strptime(obj["movies"][0]["date"], '%Y-%m-%d')
        resp = self.__subscription_db_dal.add_subscription(obj)
        
        return resp

    def update_subscription(self,id,obj): #obj={movieId:movieid,date:date}, id=memberId
        sub_obj =self.__subscription_db_dal.get_subscription_memberId(id)
        if(sub_obj==None): #then post
            return self.add_subscription({"memberId":id, "movies":[obj]})
        else:
            obj["movieId"] = ObjectId(obj["movieId"])
            obj["date"] = datetime.strptime(obj["date"], '%Y-%m-%d')
            sub_obj["movies"].insert(0,obj)
            resp = self.__subscription_db_dal.update_subscription(sub_obj["_id"],sub_obj)
            return resp
        """ sub_obj = self.__subscription_db_dal.get_subscription(id)
        sub_obj["movies"].insert(0,obj) """
        
        

    def delete_subscription(self,id):
        resp = self.__subscription_db_dal.delete_subscription(id)
        return resp