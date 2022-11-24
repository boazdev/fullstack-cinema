import json
import os
import sys

class UserFileDal:
    def __init__(self):
        self.__path = os.path.join(sys.path[0],'data/users.json')
    
    def read_file(self):
        f = open(self.__path,'r')
        data = json.load(f)
        f.close()
        return data

    def write_file(self,data):
        f = open(self.__path,'w')
        json.dump(data,f,indent=4)
        f.close()
        
    """ def get_all_users(self):
        path = os.path.join(sys.path[0],"data/users.json")
        with open(path,'r') as f:
            data = json.load(f)
            return data    """