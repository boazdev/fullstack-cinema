from flask import Blueprint,jsonify,request
from BLL.member_bl import *


members = Blueprint('members',__name__)
members_bl = MemberBL()

#get ALL
@members.route("/", methods=['GET'])
def get_all_members():
    #is_existing=request.args.get("is_existing")
    #print(is_existing)
    #members = action_verify_token(members_bl.get_all_members,[is_existing])
    sub_join = request.args.get("sub_join",default=False)
    
    #print("sub_join:" + str(sub_join))
    if(sub_join!= False):
        members = members_bl.get_all_members_aggr()
    else:
        members = members_bl.get_all_members()
    return members


@members.route("/<id>",methods=['GET'])
def get_member(id):
    #member_recv = action_verify_token(members_bl.get_member,[id])
    member_recv = members_bl.get_member(id)
    
    return member_recv


@members.route("/",methods=['POST'])
def add_member():
    obj = request.json
    resp= members_bl.add_member(obj)
    return resp


@members.route("/<id>",methods=['PUT'])
def update_member(id):
    obj=request.json
    resp=members_bl.update_member(id,obj)
    return resp

@members.route("/<id>",methods=['DELETE'])
def delete_member(id):
    resp=members_bl.delete_member(id)
    return resp



 