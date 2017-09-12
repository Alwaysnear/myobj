class firstPage extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "firstPageSkin"
	}

	private moveUp;
	private firstYunshiAni;
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
		this.playAnimation(this.firstYunshiAni,true);
		//底部箭头动画
		this.playAnimation(this.upArrowAni,true);
		//向上滑动监听切换下一场景
		this.moveUp.addEventListener(egret.TouchEvent.TOUCH_END,function(e){
			console.log(e.target)
			if(this.click){
				SceneManager.getInstance(this.stage).loadScene("mainPages",SecondPages);
				soundChannel.stop();
				soundChannel = null;
				this.click = false;
			}
		},this)
		//背景音乐
		this.stop.alpha = 0;
		let num = false;
		let music = RES.getRes("mainBGM_mp3");
		let soundChannel = music.play(0,-1);
		this.playMusic.addEventListener(egret.TouchEvent.TOUCH_END,function(){
			if(!num){
				this.stop.alpha = 1;
				this.play.alpha = 0;
				num = true;
				soundChannel.stop();
				soundChannel = null;
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
				target.items[key].props = { loop: true };
			}
		}
		target.play();
	}
}