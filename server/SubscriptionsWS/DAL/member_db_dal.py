from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
class MemberDBDAL:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["subscriptionsDB"]
        self.__collection = self.__db["members"]
    
    def get_member(self,id): 
        member = self.__collection.find_one({"_id":ObjectId(id)})
        return member

    def get_member_aggr(self,pipeline):
        member = self.__collection.aggregate(pipeline)
        return list(member)

    
    def get_all_members(self):
        members = list(self.__collection.find({}))
        return members
    
    def add_member(self,obj):
        self.__collection.insert_one(obj)
        return "Created member with ID " +str(obj["_id"])

    def add_many_members(self,obj):
        self.__collection.insert_many(obj)
        return "Created members collection"

    def delete_member(self,id):
        self.__collection.delete_one({"_id":ObjectId(id)})
        return "Deleted member!"

    def update_member(self,id,obj):
        self.__collection.update_one({"_id": ObjectId(id)},{"$set":obj})
        return "Updated member"