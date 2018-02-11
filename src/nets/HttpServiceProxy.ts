namespace nets {

	import Event =laya.events.Event;
	import EventDispatcher = laya.events.EventDispatcher;
    import Hash = utils.Hash;
    /**
	 * 通信服务的代理
	 */
    export class HttpServiceProxy {

        private static instance: HttpServiceProxy;
        private static _apiRecord: Object;
        static httpService: HttpService;
        /** 服务端响应的数据 */
        static responsePara: any[];

		constructor(interCls: InternalClass)
		{
			if (interCls === null || interCls instanceof InternalClass === false)
				throw new Error("HttpServiceProxy is singleton, not allow to use constructor!");
		}

        static getInstance(): HttpServiceProxy {
            if (this.instance === undefined)
                this.instance = new HttpServiceProxy(new InternalClass());  

            this._apiRecord = {};
            this.httpService = new HttpService();
            this.httpService.init(HttpConfig.host, HttpConfig.port, HttpConfig.path);
            this.httpService.callback = this.callback;
            return this.instance;
        }

        /**
		 * 发送请求
		 * 调用API接口并自定义回调函数获取结果,发送数据的格式为 {'数据名称':'数据值'}
		 * @param apiName:String API名字
		 * @param paramData:Object 要传递给API端的数据
		 * @param callback:Function 回调函数
		 * @param selfData:any 回调函数的数据
		 */
        static request(apiName: string, _sendData?: Object, callback?: Function, selfData?: any): void {
            //解析api信息
            var sendData: Object =new Object();
			sendData["_api"] = this.saveApiRecord(apiName, callback, selfData);
            if (_sendData != null) {
                var index: string;
                for (index in _sendData) {
                    sendData[index] = _sendData[index];
                }
            }
			/** sendData：包含API名称，奖品名称，手机号，姓名，性别，省份，城市 */
            this.httpService.request(this.handleJsonObject(sendData));
        }

        /** 将JSON数据处理成 LayaAir 中能正常使用的 key=value&key=value... 样式。*/
		static handleJsonObject(jsonObj: Object): string
		{
			if (!jsonObj)
				return "";

			let tarStr: string = "",
				tarStrArr: Array<string> = [],
				tempStr: string = JSON.stringify(jsonObj);

			tempStr = tempStr.slice(1, tempStr.length - 1);
			tarStrArr = tempStr.split(",");

			let i: number = 0, arrLen: number = tarStrArr.length;
			let tempEle: string = "", tempEleArr:Array<string>=[];
			for (let i: number = 0; i < arrLen; i++)
			{
				tempEle = tarStrArr[i];
				tempEleArr = tempEle.split(":");
				tarStr += tempEleArr[0]+"="+tempEleArr[1];
				if(i<arrLen-1)
					tarStr += "&";
			}
			tarStr = tarStr.replace(/"/g,'');

			return tarStr;
		}

		/**
		 * 存储记录
		 * @param apiName
		 * @param callback
		 * @param selfData
		 */
		private static saveApiRecord(apiName: string, callback: Function, selfData: Object): string
		{
			var recordKey: string = apiName;
			this._apiRecord[recordKey] = { 'callback': callback, 'takeData': selfData };
			return recordKey;
		}


		/**
		 * 注册的回调函数
		 */
		static callback(receiveData?: any): void
		{

			console.info("HttpServiceProxy, 响应回调成功...");

			if (!receiveData)
				return;
			if (!receiveData.hasOwnProperty("_api"))
				return;

			let recordKey: string = receiveData._api;
			if (recordKey != null && HttpServiceProxy._apiRecord[recordKey] != null)
			{
				let callback: Function = HttpServiceProxy._apiRecord[recordKey]['callback'];
				let takeData: Object = HttpServiceProxy._apiRecord[recordKey]['takeData'];

				if (callback !== null)
				{
					if (takeData === null)
					{
						callback(receiveData);
					}
					else
					{
						callback(receiveData, takeData);
					}
				}

				//清空记录
				HttpServiceProxy._apiRecord[recordKey]['callback'] = null;
				HttpServiceProxy._apiRecord[recordKey]['takeData'] = null;
				HttpServiceProxy._apiRecord[recordKey] = null;
				delete HttpServiceProxy._apiRecord[recordKey];
			}
		}
    }


    class InternalClass
	{
	}
}