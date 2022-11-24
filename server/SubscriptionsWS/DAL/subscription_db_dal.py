from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
class SubscriptionDBDAL:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["subscriptionsDB"]
        self.__collection = self.__db["subscriptions"]
    
    def get_subscription(self,id): 
        subscription = self.__collection.find_one({"_id":ObjectId(id)})
        return subscription

    def get_subscription_memberId(self,id): 
        subscription = self.__collection.find_one({"memberId":ObjectId(id)})
        return subscription

    def get_subscription_aggr(self,pipeline):
        subscription = self.__collection.aggregate(pipeline)
        return list(subscription)

    
    def get_all_subscriptions(self):
        subscriptions = list(self.__collection.find({}))
        return subscriptions
    
    def add_subscription(self,obj):
        self.__collection.insert_one(obj)
        return "Created subscription with ID " +str(obj["_id"])

    def delete_subscription(self,id):
        self.__collection.delete_one({"_id":ObjectId(id)})
        return "Deleted subscription!"

    def delete_subscription_by_member(self,memberId):
        self.__collection.delete_one({"memberId":ObjectId(memberId)})
        return "Deleted subscription!"
        
    def update_subscription(self,id,obj):
        self.__collection.update_one({"_id": ObjectId(id)},{"$set":obj})
        return "Updated subscription"