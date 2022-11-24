from DAL.subscription_ws_dal import *
from datetime import datetime
""" from flask import g """
class SubscriptionBL:
    def __init__(self):
        self.__subscription_ws_dal = SubscriptionWSDAL()

    def get_all_subscriptions(self):
        subscriptions = self.__subscription_ws_dal.get_all_subscriptions()
        return subscriptions

    def get_subscription(self,id):
        subscription = self.__subscription_ws_dal.get_subscription(id)
        return subscription

    def add_subscription(self,obj):
        resp = self.__subscription_ws_dal.add_subscription(obj) #obj={memberId:id,[{movieId:id,date:date}]}
        return resp

    def update_subscription(self,id,obj): #obj={movieId:movie,date:date}
        resp = self.__subscription_ws_dal.update_subscription(id,obj)
        return resp

    def delete_subscription(self,id):
        resp = self.__subscription_ws_dal.delete_subscription(id)
        return resp