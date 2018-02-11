namespace configs {

    import HttpServiceProxy = nets.HttpServiceProxy;
	
    /**
	 * 通信配置信息（主要用于与服务器端做对接，指明要调用服务器的哪个Controller下的哪个函数）
	 */
    export class HttpConfig{

        /** 通信所用协议 */
		static protocol:string;	// = "https://";
		/** 服务器的主机名或ip地址 */
		static host:string;	// = "www.secsplus.com";
		static port:number;	// = 8080;
		/** 服务器主入口路径 */
		static path:string;	// = "/redpacket/pacontro/addpacket.do";
		static platform;	// = "tencent";
		/** 服务器资源的目录 */
		static serverResUrl:string;	// = "https://www.secsplus.com:8080/static/";// = HttpConfig.protocol + HttpConfig.host + ":" + HttpConfig.port + "/static/";

		/** 服务器已连接成功 */
		static SERVER_CONNECTED:string = "server_connected";

		/** 返回的数据格式 */
		static RESULT_FORMAT:string = 'json';

        /**
		 * api配置信息,向服务端请求的方法配置表
		 */
		private static _apiObject:Object = {
			'subUserInfo':"addpacket.do",
		};

        /**
		 * 设置通信服务基本配置（默认已在其内设置，通过不用重设参数）及初始化通信服务
		 */
		static init(protocol?:string,host?:string,port?:number,path?:string):void
		{
			protocol && (this.protocol = protocol);
			host && (this.host = host);
			port && (this.port = port);
			path && (this.path = path);

			// 初始化通信服务
			HttpServiceProxy.getInstance();
		}

		/**
		 * api信息是否存在
		 * @return
		 */
		static isset(apiName:string):boolean
		{
			if(HttpConfig._apiObject[apiName] == null)
				return false;
			return true;
		}

		/**
		 * 获取api信息
		 * @param apiName:string api名字
		 * @return Object
		 */
		static getSendData(apiName:string):Object
		{
			return HttpConfig.isset(apiName) == false ? null : this._apiObject[apiName].sendData;
		}

    }
}