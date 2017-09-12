class SecondPages extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "secondPageSkin"
	}
	private moveUp;
	private secondYunshiAni;
	private upArrowAni;
	private play;
	private stop;
	private playMusic;
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private click = true;
	protected childrenCreated():void
	{
		super.childrenCreated();
		//陨石动画
		this.playAnimation(this.secondYunshiAni,true);
		//底部箭头动画
		this.playAnimation(this.upArrowAni,true);
		//向上滑动监听切换下一场景
		
			this.moveUp.addEventListener(egret.TouchEvent.TOUCH_END,function(){
				if(this.click){
					SceneManager.getInstance(this.stage).loadScene("mainPages",ThirdPage);
					this.click = false;
					soundChannel.stop();
					soundChannel = null;
				}
			},this)
		
		//背景音乐
		this.stop.alpha = 0;
		let num = false;
		let music = RES.getRes("mainBGM2_mp3");
		let soundChannel = music.play(0,-1);	
		this.playMusic.addEventListener(egret.TouchEvent.TOUCH_END,function(){
			if(!num){
				this.stop.alpha = 1;
				this.play.alpha = 0;
				num = true;
				soundChannel.stop();
			}else{
				this.stop.alpha = 0;
				this.play.alpha = 1;
				num = false;
				soundChannel = music.play(0,-1);
			}
		},this)
	}

	//设置循环播放
	private playAnimation(target: egret.tween.TweenGroup, isLoop: boolean): void {
		if (isLoop) {
			for (var key in target.items) {
				target.items[key].props = { loop: true};
			}
		}
		target.play();
	}
	
}