class Loading extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "loadingSkin"
	}
	private loadingbgAni;
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		// this.playAnimation(this.loadingbgAni,true);
	}

	// 设置循环播放
	// private playAnimation(target: egret.tween.TweenGroup, isLoop: boolean): void {
	// 	if (isLoop) {
	// 		for (var key in target.items) {
	// 			target.items[key].props = { loop: true };
	// 		}
	// 	}
	// 	target.play();
	// }
	
}