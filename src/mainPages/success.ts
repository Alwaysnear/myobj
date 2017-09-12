class Success extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "successSkin";
	}
	private goToLotto;
	private share;
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		//点击跳去抽奖
		this.goToLotto.addEventListener(egret.TouchEvent.TOUCH_END,function(){
			SceneManager.getInstance(this.stage).loadScene("lottoPages",awardIndex); 
		},this)
		//点击隐藏分享
		// this.share.addEventListener(egret.TouchEvent.TOUCH_END,function(){
		// 	this.share.visible = false;
		// },this)
	}
	
}