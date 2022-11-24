from flask import Blueprint,jsonify,request
from BLL.subscription_bl import *


subscriptions = Blueprint('subscriptions',__name__)
subscriptions_bl = SubscriptionBL()

#get ALL
@subscriptions.route("/", methods=['GET'])
def get_all_subscriptions():
    subscriptions = subscriptions_bl.get_all_subscriptions()
    return subscriptions


@subscriptions.route("/<id>",methods=['GET'])
def get_subscription(id):    
    subscription_recv = subscriptions_bl.get_subscription(id)
    return subscription_recv


@subscriptions.route("/",methods=['POST'])
def add_subscription():
    obj = request.json
    resp= subscriptions_bl.add_subscription(obj)
    return resp


@subscriptions.route("/<id>",methods=['PUT'])
def update_subscription(id):
    obj=request.json
    resp=subscriptions_bl.update_subscription(id,obj)
    return resp

@subscriptions.route("/<id>",methods=['DELETE'])
def delete_subscription(id):
    resp=subscriptions_bl.delete_subscription(id)
    return resp



 