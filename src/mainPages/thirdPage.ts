class ThirdPage extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "thirdPageSkin"
	}
	private startGameBtn; //开始游戏按钮
	private gameRuleBtn;
	private gameRulesBox;
	private closeBtn;
	private thirdYunshiAni;
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
		this.playAnimation(this.thirdYunshiAni,true);
		//点击事件监听切换下一场景
		//开始游戏按钮点击事件
		let click = false
		this.startGameBtn.addEventListener(egret.TouchEvent.TOUCH_END,function(){
			if(this.click){
			SceneManager.getInstance(this.stage).loadScene("game",FirstLevel);
			soundChannel.stop();
			soundChannel = null;
			this.click = false;
			}
		},this)
		//游戏规则按钮点击事件
		this.gameRulesBox.visible = false;
		this.gameRuleBtn.addEventListener(egret.TouchEvent.TOUCH_END,function(){
			this.gameRulesBox.visible = true;
		},this)
		//关闭规则窗口
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_END,function(){
			this.gameRulesBox.visible = false;
		},this)
		//背景音乐
		this.stop.alpha = 0;
		let num = false;
		let music = RES.getRes("mainBGM3_mp3");
		let soundChannel = music.play(0,-1);	
		this.playMusic.addEventListener(egret.TouchEvent.TOUCH_END,function(){
			if(!num){
				this.stop.alpha = 1;
				this.play.alpha = 0;
				num = true;
				let music = RES.getRes("mainBGM3_mp3");
				soundChannel.stop();
				console.log(222)
			}else{
				this.stop.alpha = 0;
				this.play.alpha = 1;
				num = false;
				soundChannel = music.play(0,-1);
				console.log(111)
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