class nextLevel extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "nextLevelSkin"
	}
	
	private nextLevelBtn;
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		//点击跳转下一关
		this.nextLevelBtn.addEventListener(egret.TouchEvent.TOUCH_END,function(){
			// SceneManager.getInstance(this.stage).loadScene("game",);
			
		},this)
	}
	
}