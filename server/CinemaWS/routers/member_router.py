from flask import Blueprint,jsonify,request
from BLL.member_bl import *
from flask import g

members = Blueprint('members',__name__)
members_bl = MemberBL()

#get ALL
@members.route("/", methods=['GET'])
def get_all_members():
    sub_join = request.args.get("sub_join",default=False)
    #print("sub join="+str(sub_join))
    members = members_bl.get_all_members(sub_join)
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



 