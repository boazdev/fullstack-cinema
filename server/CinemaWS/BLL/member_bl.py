from DAL.member_ws_dal import MemberWSDAL


class MemberBL:
    def __init__(self):
        self.__member_ws_dal = MemberWSDAL()



    def get_all_members(self,sub_join=False):
        if(sub_join==False):
            members = self.__member_ws_dal.get_all_members()
        else:
            members = self.__member_ws_dal.get_all_members_join()
        return members

 

    def get_member(self,id):
        member = self.__member_ws_dal.get_member(id)
        return member

    def add_member(self,obj):
        resp = self.__member_ws_dal.add_member(obj)
        return resp

    def update_member(self,id,obj):
        resp = self.__member_ws_dal.update_member(id,obj)
        return resp

    def delete_member(self,id):
        resp = self.__member_ws_dal.delete_member(id)
        return resp