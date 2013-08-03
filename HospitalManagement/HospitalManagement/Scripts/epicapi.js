(function($){
$.fn.epicSettings = [];
	var _aoSettings = $.fn.epicSettings;
	$.fn.epicExt = {};
	var _oExt = $.fn.epicExt;
   // _oExt.url = "http://qtxdemo2008.cloudapp.net/EpicTron/";
      _oExt.url = "http://qtxdemo2008.cloudapp.net/CPCServer/";
	//_oExt.url = "http://localhost:55282/";

    $.extend({
        epic: {
        	login: function(username, password, callback) {


				var obj = { "user" : username,"password":password };
				var parms = JSON.stringify(obj);
				var parms0 = {"request" : "login", "requestContent": parms};
				var parms1 = JSON.stringify( parms0);

				$.post(_oExt.url+"admin",parms1,function(data ) {
				                _oExt.sessionContext = data.response.sessionContext;
				                console.log(_oExt.sessionContext);
				                data.sessionContext = _oExt.sessionContext;				               
						callback(data);
						},"json" );
        	},
            //set sessionContext
        setSessionContext: function (context) {
        	    _oExt.sessionContext = context;     	    
        },
		//loadjobscript
		getdata:function( prefix, fname,displayname ,callback){
		                		var  params = {};
		                		params.param = {"displayname": displayname};
		                		params.sessionContext = _oExt.sessionContext;
		                		var requestParam = {"request" : fname, "requestContent": params};
						var realParams = JSON.stringify( requestParam);
						var url = _oExt.url + prefix;
						$.post(url,realParams,function(data ) {

								console.log(data );
								callback(data);
						},"json" );
		},

	    //GetView
	    getview:function( prefix, fname,displayname ,callback){
				                		var  params = {};
				                		params.param = {"displayname": displayname};
				                		params.sessionContext = _oExt.sessionContext;
				                		var requestParam = {"request" : fname, "requestContent": params};
								var realParams = JSON.stringify( requestParam);
								var url = _oExt.url + prefix;
								$.post(url,realParams,function(data ) {

										console.log(data );
										callback(data);
								},"json" );
		},

	    //
		runjobscript:function( prefix, fname,displayname ,callback){
				                		var  params = {};
				                		params.param = {"displayname": displayname};
				                		params.sessionContext = _oExt.sessionContext;
				                		var requestParam = {"request" : fname, "requestContent": params};
								var realParams = JSON.stringify( requestParam);
								var url = _oExt.url + prefix;
								$.post(url,realParams,function(data ) {

										console.log(data );
										callback(data);
								},"json" );
		},

		getjobsresult:function( prefix, fname,displayname ,callback){
						                		var  params = {};
						                		params.param = {"displayname": displayname};
						                		params.sessionContext = _oExt.sessionContext;
						                		var requestParam = {"request" : fname, "requestContent": params};
										var realParams = JSON.stringify( requestParam);
										var url = _oExt.url + prefix;
										$.post(url,realParams,function(data ) {

												console.log(data );
												callback(data);
										},"json" );
		},
         //DeleteData
         delete:function( prefix, fname,displayname ,callback){
		 						                		var  params = {};
		 						                		params.param = {"displayname": displayname};
		 						                		params.sessionContext = _oExt.sessionContext;
		 						                		var requestParam = {"request" : fname, "requestContent": params};
		 										var realParams = JSON.stringify( requestParam);
		 										var url = _oExt.url + prefix;
		 										//alert(requestParam);
		 										$.post(url,realParams,function(data ) {

		 												console.log(data );
		 												callback(data);
		 										},"json" );
		},
         //

		///*************** "InsertData"
                insert:function(prefix, fname, displayname, param, callback){
                		var datacontent = {
								"datacontent":param,
								"displayname":displayname
							};

						var params = {
								"param":datacontent,
								"sessionContext": _oExt.sessionContext
							};

						var requestParam = {
								"request": fname, "requestContent": params
							};
						var realParams = JSON.stringify( requestParam);
						var url = _oExt.url + prefix;
						console.log(_oExt.sessionContext);
						//alert(realParams);
						$.post(url ,realParams,function(data ) {

						console.log(data );
						callback(data);
				},"json" );
		},
        //***************/
        update: function (prefix, fname, displayname, param, callback) {
                    var datacontent = {
                        "datacontent": param,
                        "displayname": displayname
                    };

                    var params = {
                        "param": datacontent,
                        "sessionContext": _oExt.sessionContext
                    };

                    var requestParam = {
                        "request": fname, "requestContent": params
                    };
                    var realParams = JSON.stringify(requestParam);
                   // alert(realParams);
                    var url = _oExt.url + prefix;
                    $.post(url, realParams, function (data) {

                        console.log(data);
                        callback(data);
                    }, "json");
        },
        //
		query : function(prefix, fname,param, callback){

				var params = {
				"param":param,
				"sessionContext": _oExt.sessionContext
				};

				var requestParam = {
				"request": fname, "requestContent": params
				};
				var realParams = JSON.stringify( requestParam);
				var url = _oExt.url + prefix;
		    //alert(realParams);
				console.log(_oExt.sessionContext);
				$.post(url,realParams,function(data ) {

							console.log(data );
							callback(data);
					},"json" );

		},
		//
		query1 : function(callback){
			var bondobj = {
			"yield": 2,
			"settlementDate": "12-12-2012",
			"matDate" : "12-12-2014",
			"freq":1,
			"coupon":2,
			"datedDate": "0"
			};
			var functParams = {
			 "function": "PRICEBONDFROMYIELD",
			 "params": {"bond":bondobj}

			};
			var param = {
			"funcName": "PRICEBONDFROMYIELD",
			"functParams" : functParams

			};

			var paramsDic = {
			"param":param,
			"sessionContext": _oExt.sessionContext
			};

			var requestDic = {
			"request": "BONDANALYTICS", "requestContent": paramsDic
			};
			var parms1 = JSON.stringify( requestDic);
			$.post("http://qtxdemo2008.cloudapp.net/EpicTron/Quant",parms1,function(data ) {

						console.log(data );
						callback(data);
				},"json" );

		},
		irsquery : function(callback){
					var irs ={};
					irs.effdate = '12-12-2012';
					irs.enddate = '12-12-2014';
					irs.notional = 100000;
					irs.ccy = 'USD';
					irs.payrec ='P';
					irs.floatrate = 0.1;
					irs.fixrate = 2.3;

					var param = {};
					param.irs = irs;
					param.YC = 'mktpdn/official@20071212_curve.swap.usd.semi';
					param.curveType = 'official';

					var functParams = {};
					functParams.function = 'PRICEIRS';
					functParams.params = param;

					var paramsDic = {};
					paramsDic.funcName = 'PRICEIRS';
					paramsDic.functParams = functParams;

					var requestDic ={};
					requestDic.sessionContext = _oExt.sessionContext;
					requestDic.param = paramsDic;
					var svrDict = {};
					svrDict.request = 'IRSANALYTICS';
					svrDict.requestContent = requestDic;
					var parms1 = JSON.stringify( svrDict);
					$.post("http://qtxdemo2008.cloudapp.net/EpicTron/Quant",parms1,function(data ) {

								console.log(data );
								callback(data);
						},"json" );

		}


        }
    });
})(jQuery);
/**********
login=function(){
	var name = document.getElementById('name');
	var password = document.getElementById('password');
	alert(name.value +' , ' + password.value);
	$.epic.login(name.value,password.value,function(data){alert(data.response.success);})
	login1.close();
	//closeAllWindow();
}
***********/
