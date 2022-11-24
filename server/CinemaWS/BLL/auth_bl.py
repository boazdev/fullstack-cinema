from DAL.user_db_dal import *
from DAL.users_file_dal import *
from DAL.permissions_file_dal import *
from datetime import datetime, timedelta
from BLL.user_bl import UserBL
import jwt
from flask import g
from enconder import JSONEncoder
from datetime import timezone
class AuthBL:
    def __init__(self):
        self.__user_db_dal = UserDBDAL()
        self.__key = "server_key"
        self.__algorithm = "HS256"
        self.__user_file_dal = UserFileDal()
        self.__permissions_file_dal =PermissionFileDal()
        self.__user_bl=UserBL()

    def get_token(self, username,password):
        user = self.__user_db_dal.get_user_by_username(username)
        if user==None:
            return "username_error"        
        elif user["password"] == "":
            return "user_not_created"
        elif user["password"] != password:
            return "password_error"
        
        id= str(user["_id"])
        data = self.__user_bl.get_user(id)
        
        """ print("user data: " +str(data)) """
        timeObj= datetime.now(tz=timezone.utc) +timedelta(minutes=data["userData"]["sessionTimeOut"])
        data["exp"]= timeObj
        token = jwt.encode(data,self.__key,self.__algorithm,json_encoder=JSONEncoder)#),headers={"exp": timeObj}) #jwt.encode({"exp": datetime.now(tz=timezone.utc)}, "secret") - with session timeout
        """ userData=self.__user_bl.get_user(id) """
        return token

    def verify_token(self,token): 
        try:
            data = jwt.decode(token,self.__key,self.__algorithm)
            return True
        except jwt.ExpiredSignatureError:
            print("session time out expire error")
            return False
        except Exception as e:
            print("jwt error:" + str(e) +" " +str(e.__traceback__))
            return False

    def create_password(self, username,password):
        user = self.__user_db_dal.get_user_by_username(username)
        print("user by username:" + str(user))
        
        if user!=None:
            updateObj = {"password": password}
            if user["password"] !="":
                return False
            self.__user_db_dal.update_user(user["_id"],updateObj)
            return True
        else:
            return False

    """ 
        try:
            jwt.decode("JWT_STRING", "secret", algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            # Signature has expired """