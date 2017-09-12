class SecondLevel extends eui.Component implements eui.UIComponent {
	private _baba;
	private lbtn;
	private rbtn;
	private gbgAni;
	private gbgAni2;
	//游戏时间
	private plane;
	private GameTime;
	//陨石数组
	private _bmArr = [];
	//播放器
	private play;
	private stop;
	private playMusic;
	private soundChannel;
	private timer: egret.Timer = new egret.Timer(40, 0);
	private _newfoods;
	public constructor(baba) {
		super();
		this.skinName = "secondLevelSkin";
		this._baba = baba;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		this.gbgAni.play();
		this.playAnimation(this.gbgAni2, true);
		this.lbtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
			this.Lmove()
		}, this)
		this.rbtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
			this.Rmove()
		}, this)
		//生成物品
		let bm;
		this._newfoods = setInterval(function () {
			if (bm) {
				bm = null;
			}
			bm = this.meteorites();
			this.addChild(bm);
			this._bmArr.push(bm);
		}.bind(this), 4000)
		this.addEventListener(egret.Event.ENTER_FRAME, this.Udatepage, this);
		//音乐开关
		this.play.alpha = 0;
		let num = false;
		let music = RES.getRes("gamebg_mp3");
		this.soundChannel = music.play(0, -1);
		this.playMusic.addEventListener(egret.TouchEvent.TOUCH_END, function () {
			if (!num) {
				this.stop.alpha = 0;
				this.play.alpha = 1;
				num = true;
				let music = RES.getRes("gamebg_mp3");
				this.soundChannel.stop();
				console.log(222)
			} else {
				this.stop.alpha = 1;
				this.play.alpha = 0;
				num = false;
				this.soundChannel = music.play(0, -1);
				console.log(111)
			}
		}, this)
	}
	private playAnimation(target: egret.tween.TweenGroup, isLoop: boolean): void {
		if (isLoop) {
			for (var key in target.items) {
				target.items[key].props = { loop: true };
			}
		}
		target.play();
	}
	//向左移动
	private Rmove(): void {
		this.plane.x += this.plane.width >> 1;
		this.plane.x > this.stage.stageWidth ? this.plane.x = this.stage.stageWidth : "";
	}
	//向右移动
	private Lmove(): void {
		this.plane.x -= this.plane.width >> 1;
		this.plane.x < 0 ? this.plane.x = 0 : "";
	}
	//陨石随机生成
	private meteorites() {
		let speed = 40;
		//陨石随机数
		let meteorRadom = Math.ceil(Math.random() * 3);
		// let meteorRadom = 4;
		//陨石位置随机数
		let Sprite: egret.Sprite = new egret.Sprite;
		let BitmapArr = [];
		let Bitmap: egret.Bitmap = new egret.Bitmap();
		//奖励
		// if (meteorRadom == 4) {
		// 	Bitmap.name = "reward";
		// }
		Bitmap.texture = RES.getRes(`meteorites${meteorRadom}_png`);
		let meteroeX = Math.ceil(Math.random() * this.stage.stageWidth);
		Bitmap.scaleX = .6;
		Bitmap.scaleY = .6;
		Sprite.x = meteroeX;
		Bitmap.anchorOffsetX = Bitmap.width * .5;
		Bitmap.anchorOffsetY = Bitmap.height * .5
		Sprite.width = Bitmap.width * .5;
		Sprite.height = Bitmap.height * .5;
		Sprite.addChild(Bitmap);
		this.timer.start();
		this.timer.addEventListener(egret.TimerEvent.TIMER, function () {
			Sprite.y += Sprite.height >> 1;
			if (Sprite.y > 900) {
				Sprite.removeChildren()
			}
		}.bind(this), null);
		return Sprite;
	}
	private Udatepage() {
		let bmArr = this._bmArr;
		for (let i = 0; i < bmArr.length; i++) {
			if (this.hitTest(this.plane, bmArr[i])) {
				console.log(bmArr[i]);
				if (bmArr[i].name == "reward") {
					console.log(111);
				} else {
					this.removeChild(bmArr[i]);
					this.timer.stop();
					clearInterval(this._newfoods);
					this.plane.alpha = 0;
					this.removeEventListener(egret.Event.ENTER_FRAME, this.Udatepage, this);
					// alert("GAME OVER!");
					SceneManager.getInstance(this.stage).loadScene("mainPages",ThirdPage);
					this.soundChannel.stop(); 

					
				}
			};
		}

	}
	//碰撞检测
	private hitTest(obj1, obj2) {
		var rect1: egret.Rectangle = obj1.getBounds();//获取显示对象的测量边界 
		var rect2: egret.Rectangle = obj2.getBounds();
		rect1.x = obj1.x;
		rect1.y = obj1.y;
		rect2.x = obj2.x;
		rect2.y = obj2.y;
		//此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。 
		return rect1.intersects(rect2);
	}
}