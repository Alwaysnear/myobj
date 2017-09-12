class SceneManager {
	//单例模式写法
	private static isAvailable = false;
	private static obj;
	public static getInstance(baba) {
		SceneManager.isAvailable = true;
		if (!SceneManager.obj) {
			SceneManager.obj = new SceneManager(baba);
			SceneManager.obj.isAvailable = true;
		}
		return SceneManager.obj;
	}
	public constructor(baba) {
		this._baba = baba;
		if (!SceneManager.isAvailable) {
			console.warn("你确定要用new关键字？单例模式必须调用类的getInstanc方法来实例化对像");
		}
	}
	/**
	 * @groupName 要加载的场景的资源组名字，字符串类型
	 * @sceneName 要加载的场景的类名
	 */
	private _groupName;
	private _nextScene;//要加载的场景
	private _baba; //要加载的场景的爸爸,必须是舞台
	private _lastScene;
	private _loading;
	private _callBack;
	public loadScene(groupName: string, sceneName: egret.DisplayObjectContainer,callBack=function(){}) {
		//显示进度条
		this._loading = new LoadingUI();
		// this._loading = LoadingUI.getInstance();
		this._baba.addChild(this._loading);
		this._groupName = groupName;
		this._nextScene = sceneName;
		this._callBack = callBack;
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupLoadCompleted, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
		RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
		RES.loadGroup(groupName);
	}
	//资源组加载出错
	private onResourceLoadError(event: RES.ResourceEvent) {
		console.warn("Group:" + event.groupName + " has failed to load");
		//忽略加载失败的项目
		this.onGroupLoadCompleted(event);
	}
	// preload资源组加载进度
	private onResourceProgress(event: RES.ResourceEvent) {
		if (event.groupName == this._groupName) {
			this._loading.setProgress(event.itemsLoaded, event.itemsTotal);
		}
	}
	//资源组加载出错
	private onItemLoadError(event: RES.ResourceEvent) {
		console.warn("Url:" + event.resItem.url + " has failed to load");
	}
	//资源组加载成功
	private onGroupLoadCompleted(e) {
		if (e.groupName == this._groupName) {
			//移除监听事件
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupLoadCompleted, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
			RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
			//移除进度条
			// this._baba.removeChild(this._loading);
			let nextScent = new this._nextScene();
			this._baba.addChild(nextScent);
			nextScent.anchorOffsetX = nextScent.width >> 1;
			nextScent.anchorOffsetY = nextScent.height >> 1;
			nextScent.x = this._baba.stageWidth >> 1;
			nextScent.y = this._baba.stageHeight >> 1;
			nextScent.scaleX = 0;
			nextScent.scaleY = 0;
			egret.Tween.get(nextScent).to({ scaleX: 1, scaleY: 1 }, 500).call(function () {
				if (this._lastScene) {
					this._baba.removeChild(this._lastScene);
				}
				this._lastScene = nextScent;
				this._callBack();//执行场景切换成功后的回调
			}.bind(this));
		}
	}
}