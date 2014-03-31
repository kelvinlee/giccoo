# api.coffee

User = require('../proxy').User
Menu = require('../proxy').Menu
Work = require('../proxy').Work
TagWork = require('../proxy').TagWork

Ut = require '../lib/util'
check = require('validator').check 
EventProxy = require('eventproxy')
config = require('../config').config


exports.get_work_list = ()->
