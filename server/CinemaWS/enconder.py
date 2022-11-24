from datetime import datetime
import json
from bson import ObjectId

class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        if isinstance(obj, datetime):
            #datetime.date.__str__
            return str(obj.date())         
        return json.JSONEncoder.default(self,obj)