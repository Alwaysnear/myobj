class awardIndex extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "awardIndexSkin";
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private topAni;
	private bjAni;
	private fjAni;
	private xiaAni;
	private guangAni;
	private taiAni;
	private diAni;
	private siAni;
	private xiuAni;
	private wuAni;
	private sevenAni;
	private eightAni;
	private twoAni;
	private zhong;
	private stop;
	private play;
	private index;
	private two;
	private two_one;
	private two_two;
	private two_three;
	private two_four;
	private two_five;
	private two_six;
	private two_seven;
	private two_eight;
	private share;
	private arr = Math.round(Math.random()*7+1);
	
	protected childrenCreated():void
	{	
		super.childrenCreated();
		this.playAnimation(this.topAni,true);
		this.playAnimation(this.bjAni,true);
		this.playAnimation(this.fjAni,true);
		this.playAnimation(this.guangAni,true);
		this.playAnimation(this.xiaAni,true);
		this.playAnimation(this.diAni,true);
		this.playAnimation(this.taiAni,true);
		this.playAnimation(this.siAni,true);
		this.playAnimation(this.xiuAni,true);
		this.playAnimation(this.wuAni,true);
		this.playAnimation(this.sevenAni,true);
		this.playAnimation(this.eightAni,true);
		egret.Tween.get(this.zhong,{loop:true}).to({skewX:10,skewY:10},500,egret.Ease.backInOut);
		this.stop.alpha = 0;
		let num = false;
		// let music = RES.getRes("1_mp3");
		// let soundChannel = music.play(0,1);	
		this.play.addEventListener(egret.TouchEvent.TOUCH_END,function(){
			if(!num){
				this.stop.alpha = 1;
				this.play.alpha = 0;
				num = true;
				// let music = RES.getRes("1_mp3");
				// soundChannel.stop();
			}else{
				this.stop.alpha = 0;
				this.play.alpha = 1;
				num = false;
				// soundChannel = music.play(0,1);
			}
		},this)
		this.index.visible = true;
		this.zhong.addEventListener(egret.TouchEvent.TOUCH_END,function(){
				
				console.log(this.arr)
				egret.Tween.removeTweens(this.zhong);
				egret.Tween.get(this.zhong,{loop:true}).to({skewX:30,skewY:30},300,egret.Ease.backInOut);
				setTimeout(function(){
				this.index.visible = false;
				this.two.visible = true;
				this.twoAni.play();
				if(this.arr == 1){
					this.two_two.visible = true;
				}else if(this.arr == 2){
					this.two_one.visible = true;
				}else if(this.arr == 3){
					this.two_three.visible = true;
				}else if(this.arr == 4){
					this.two_four.visible = true;
				}else if(this.arr == 5){
					this.two_five.visible = true;
				}else if(this.arr == 6){
					this.two_six.visible = true;
				}else if(this.arr == 7){
					this.two_seven.visible = true;
				}else if(this.arr == 8){
					this.two_eight.visible = true;
				}
				}.bind(this),3000)
				setTimeout(function(){
					this.share.visible = true;
				}.bind(this),4500)
				//点击关闭分享页面
				this.share.addEventListener(egret.TouchEvent.TOUCH_END,function(){
					this.share.visible = false;
				},this)
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