namespace models
{
    import SubCtrl = controllers.SubCtrl;

	/**
	 * 提交数据模型层
	 */
	export class SubModel
	{

		private static instance:SubModel;
		private cityArr:Array<Object>;
		private cityStr:string;
		/** 服务器返回的数据 */
		receiveData: any;
		/** 请求前自带的数据 */
		takeData: any;
		/** 响应数据处理完毕回调 */
		static callback:Function;
		/** 红包开启面板 */
		static OpenView:views.OpenView;
		constructor()
		{
            
		}

		static getInstance():SubModel
		{
			if(!SubModel.instance)
				SubModel.instance = new SubModel();
			return SubModel.instance;
		}

		/** name:奖励名称,nums:用户手机号,firstname:用户名,sex:用户性别,province:用户所在省份,city:用户所在城市 */
        request_subInfo(name:string,nums:string,firstname:string,sex:string,province:string,city:string):void{
            HttpServiceProxy.request("addpacket.do",{"name":name,"nums":nums,"firstname":firstname,"sex":sex,"province":province,"city":city},this.getResponseInfo,{"phone":nums});
        }

		/** 验证验证码 */
		request_subCode(code:string):void{
			HttpServiceProxy.request("checkcode.do",{"code":code},this.getResponseCode)
		}

		/** 获取省份对应城市 */
		request_city(index:number):void{
			HttpServiceProxy.request("queryCity.do",{"pid":index},this.getCityList);
		}

        getResponseInfo(receiveData?:any,takeData?:any):void{
			if(!receiveData)
				return;
			if(receiveData)
				this.receiveData = receiveData;
				this.takeData = takeData;
				if(this.receiveData['status'] == "ok"){
					let phoneNum:string = this.takeData['phone'];
					GameConfig.prizeNum = phoneNum;
					laya.net.LocalStorage.setItem("phone",phoneNum);
				}
        }

		getResponseCode(receiveData?:any):void{
			if(!receiveData)
				return;
			if(receiveData)
				this.receiveData = receiveData;
			let receObj:Object = this.receiveData; 
			GameConfig.status = receObj["status"];
		}

		getCityList(receiveData:any):void{
			if(!receiveData)
				return
			if(receiveData)
				this.receiveData = receiveData;
			let getOBJ:Object =this.receiveData;
			let cityOBJ:Object;
			this.cityStr = "";
			let str:string;
			if(getOBJ['status'] === "ok"){
				this.cityArr=getOBJ['content'];
				for(let i:number=0;i<this.cityArr.length;i++){
					cityOBJ = this.cityArr[i];
					str = cityOBJ['name']+",";
					this.cityStr = this.cityStr+str;
				}
			}
			this.cityStr = this.cityStr.substring(0,this.cityStr.length-1);
			console.log(this.cityStr);
			GameConfig.cityStr = this.cityStr;
		}

		handleCallback(takeData?:any):void
		{
			if(SubModel.callback)
			{
				if(takeData)
					SubModel.callback(takeData);
				else
					SubModel.callback();
			}
		}
	}
}