var is_init_success = 0
var is_login_success = 0
var is_pay_success = 0
var is_logout_success = 0

function is_init(){
	return is_init_success;
}
function is_login(){
	return is_login_success;
}
function is_pay(){
	return is_pay_success;
}
function is_logout(){
	return is_logout_success;
}

/* 引入猫耳 JSSDK */
function impjssdk() {
    var s = document.createElement('script')
    s.src = 'https://download.maoergame.com/js/mrsdk.js'
    var x = document.getElementsByTagName('script')[0]
    x.parentNode.insertBefore(s, x)
 }

function showMessage(message) {
    console.log(message)
}

function onClick(type) {
    this[type]()
}

function init(){
    /*初始化sdk*/
    var initEntity = {}
    initEntity.debug = false
    initEntity.giftNotifyUrl = ''
    CommonMrSdk.init(initEntity, new function () {
         this.onSuccess = function(responseData){ //处理回调成功逻辑
			 is_init_success = 1
         }
         this.onFail = function(mrError) {
			 is_init_success = 0
         }
         })
    CommonMrSdk.registerLogout(new function () {
        this.onSuccess = function(data){
        	showMessage('注册登出事件成功：' + JSON.stringify(data))
        }
        this.onFail = function(mrError) {
        	showMessage('注册登出事件失败：' + JSON.stringify(mrError))
        }
        })

    showMessage('调用CommonMrSdk.init')
}

function login() {
    CommonMrSdk.loginWithUI(new function () {
        this.onSuccess = function(loginData){
        	var uid = loginData.mUid;
    	    //deal with success
			is_login_success = 1
	        showMessage('登陆成功userid：' + uid)
        }
        this.onFail = function(mrError) {
        	is_login_success = 0
			//deal with error
        	showMessage('登陆失败：' + JSON.stringify(mrError))
        }
        })
    showMessage('调用登陆CommonMrSdk.login')
}

function pay(price) {
	var productid = 'uio.' + price
	
    var payEntity = {}
    payEntity.productid = productid
    payEntity.roleid = '555555'
    payEntity.rolename = 'Jugg'
    payEntity.rolelevel = '16'
    payEntity.extradata = 'extradata'
    payEntity.serverid = '1'
    payEntity.gamecno = '12321312'
    payEntity.channel = '1'
    payEntity.notifyurl = 'http://localhost:8080/user'
    CommonMrSdk.pay(payEntity, new function () {
        this.onSuccess = function(responseData){
        	is_pay_success = 1
			showMessage('par success !!!')
        }
        this.onFail = function(mrError) {
			is_pay_success = 0
			showMessage('par fail !!!')
        }
        })
    showMessage('调用CommonMrSdk.pay')
}

function logOut() {
    CommonMrSdk.logOut(new function () {
       this.onSuccess = function(responseData){
       //登出游戏处理
       showMessage('登出成功：' + JSON.stringify(responseData))
       }
       this.onFail = function(mrError) {
       showMessage('登出失败：' + JSON.stringify(mrError))
       }
       })
   showMessage('调用登出CommonMrSdk.logOut')
}

function sendRoleCreateData() {
    var roleEntity = {}
    roleEntity.roleid = '1111111' //角色id
    roleEntity.serverid = '1'     //服务器id
    roleEntity.rolename = '111'   //角色名称
    roleEntity.roleLevel = '1'    //角色等级
    roleEntity.roleVipLevel = '1' //角色vip等级
    CommonMrSdk.sendRoleCreateData(roleEntity)
    showMessage('调用CommonMrSdk.sendRoleCreateData')
}

function sendRoleLoginData() {
    var roleEntity = {}
    roleEntity.roleid = '1111111'
    roleEntity.serverid = '1'
    roleEntity.rolename = '111'
    roleEntity.roleLevel = '1'
    roleEntity.roleVipLevel = '1'
    CommonMrSdk.sendRoleLoginData(roleEntity)
    showMessage('调用CommonMrSdk.sendRoleLoginData')
}

function getMrPlatform() {
    var platform = CommonMrSdk.getMrPlatform();
    showMessage('系统平台：' + platform)
    return platform;
}