from DAL.user_db_dal import *
from DAL.users_file_dal import *
from DAL.permissions_file_dal import *
from datetime import datetime
from flask import g
class UserBL:
    def __init__(self):
        self.__user_db_dal = UserDBDAL()
        self.__user_file_dal = UserFileDal()
        self.__permissions_file_dal = PermissionFileDal()

    def get_all_users(self): #get users data from db and json files
        usersDB = self.__user_db_dal.get_all_users()
        userFileData = self.__user_file_dal.read_file()
        userList = userFileData["users"]
        permFileData = self.__permissions_file_dal.read_file()
        permList = permFileData["users"]
        users = list(map(lambda item: {**item,"username" :list(filter(
        lambda user:str(user["_id"])==item["id"],usersDB))[0]["username"]
        ,"permissions": list(filter(
        lambda item3:item3["id"]==item["id"],permList))[0]["permissions"]},userList))
        return users

    def get_user(self,id): #get user data from db and json files
        user = self.__user_db_dal.get_user(id)
        data ={}
        data["username"] = user["username"]

        userFileData = self.__user_file_dal.read_file()
        userList = userFileData["users"]
        data["userData"]=list(filter(lambda item:item["id"]==id,userList))[0]

        userFileData =  self.__permissions_file_dal.read_file()
        userList = userFileData["users"]
        data["permissions"]=list(filter(lambda item:item["id"]==id,userList))[0]["permissions"]

        return data

    def add_user(self,obj): #add user to db, get _id and then add to json files , # check if username exists, if it is then return error
        dbObj = {"username":obj["username"], "password":""}
        respId = self.__user_db_dal.add_user(dbObj)

        userFileData = self.__user_file_dal.read_file()
        userList = userFileData["users"]
        fileObj = {"id":respId,"firstname":obj["firstname"],"lastname":obj["lastname"],
        "createDate":datetime.strftime(datetime.now(),'%Y-%m-%d'),"sessionTimeOut":obj["sessionTimeOut"]}
        userList.insert(0,fileObj)
        userFileData["users"] = userList
        self.__user_file_dal.write_file(userFileData)

        userFileData = self.__permissions_file_dal.read_file()
        userList = userFileData["users"]
        fileObj = {"id":respId, "permissions":obj["permissions"]}
        userList.insert(0,fileObj)
        userFileData["users"] = userList
        self.__permissions_file_dal.write_file(userFileData)

        return "user created with id:" +respId

    def update_user(self,id,obj): #^same
        resp = self.__user_db_dal.update_user(id,{"username":obj["username"]})
        userFileData = self.__user_file_dal.read_file()
        userList = userFileData["users"]
        indexUpdate=-1
        for i in range(0,len(userList)):
            if userList[i]["id"]==id:
                indexUpdate=i
                break
        
        fileObj = {"id":userList[indexUpdate]["id"],"firstname":obj["firstname"],"lastname":obj["lastname"],
        "createDate":userList[indexUpdate]["createDate"],"sessionTimeOut":obj["sessionTimeOut"]}
        userList[indexUpdate]=fileObj
        userFileData["users"] = userList
        self.__user_file_dal.write_file(userFileData)

        userFileData = self.__permissions_file_dal.read_file()
        userList = userFileData["users"]
        indexUpdate=-1
        for i in range(0,len(userList)):
            if userList[i]["id"]==id:
                indexUpdate=i
                break
        
        fileObj = {"id":userList[indexUpdate]["id"],"permissions":obj["permissions"]}
        userList[indexUpdate]=fileObj
        userFileData["users"] = userList
        self.__permissions_file_dal.write_file(userFileData)

        return resp

    def delete_user(self,id):  #^same
        resp = self.__user_db_dal.delete_user(id)

        userFileData = self.__user_file_dal.read_file()
        userList = userFileData["users"]
        indexUpdate=-1
        for i in range(0,len(userList)):
            if userList[i]["id"]==id:
                indexUpdate=i
                break
        
        del userList[indexUpdate]
        userFileData["users"] = userList
        self.__user_file_dal.write_file(userFileData)

        userFileData = self.__permissions_file_dal.read_file()
        userList = userFileData["users"]
        indexUpdate=-1
        for i in range(0,len(userList)):
            if userList[i]["id"]==id:
                indexUpdate=i
                break
        
        del userList[indexUpdate]        
        userFileData["users"] = userList
        self.__permissions_file_dal.write_file(userFileData)
        return resp