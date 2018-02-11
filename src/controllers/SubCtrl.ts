namespace controllers
{
    
	import Event = laya.events.Event;
	import OpenView = views.OpenView;
    import SubModel = models.SubModel;
    /** 提交获奖用户信息相关控制器 */
	export class SubCtrl
	{
		private static instance:SubCtrl;
        private static subModel:SubModel;
		constructor()
		{
			if(!SubCtrl.subModel)
				SubCtrl.subModel = models.SubModel.getInstance();
		}

		static getInstance():SubCtrl
		{
			if(!SubCtrl.instance)
				SubCtrl.instance = new SubCtrl();
			return SubCtrl.instance;
		}

        /** 提交用户手机号及奖品名称 */
		subInfo(name:string,nums:string,firstname:string,sex:string,province:string,city:string):void{
            SubCtrl.subModel.request_subInfo(name,nums,firstname,sex,province,city);
        }

		/** 提交验证码并验证 */
		subCode(code:string):void{
			SubCtrl.subModel.request_subCode(code);
		}

		/** 获取省份对应城市 */
		getCity(index:number):void{
			SubCtrl.subModel.request_city(index);
		}

	}
}