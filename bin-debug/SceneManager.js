var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    function SceneManager(baba) {
        this._baba = baba;
        if (!SceneManager.isAvailable) {
            console.warn("你确定要用new关键字？单例模式必须调用类的getInstanc方法来实例化对像");
        }
    }
    SceneManager.getInstance = function (baba) {
        SceneManager.isAvailable = true;
        if (!SceneManager.obj) {
            SceneManager.obj = new SceneManager(baba);
            SceneManager.obj.isAvailable = true;
        }
        return SceneManager.obj;
    };
    SceneManager.prototype.loadScene = function (groupName, sceneName, callBack) {
        if (callBack === void 0) { callBack = function () { }; }
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
    };
    //资源组加载出错
    SceneManager.prototype.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onGroupLoadCompleted(event);
    };
    // preload资源组加载进度
    SceneManager.prototype.onResourceProgress = function (event) {
        if (event.groupName == this._groupName) {
            this._loading.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    //资源组加载出错
    SceneManager.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    //资源组加载成功
    SceneManager.prototype.onGroupLoadCompleted = function (e) {
        if (e.groupName == this._groupName) {
            //移除监听事件
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupLoadCompleted, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            //移除进度条
            // this._baba.removeChild(this._loading);
            var nextScent_1 = new this._nextScene();
            this._baba.addChild(nextScent_1);
            nextScent_1.anchorOffsetX = nextScent_1.width >> 1;
            nextScent_1.anchorOffsetY = nextScent_1.height >> 1;
            nextScent_1.x = this._baba.stageWidth >> 1;
            nextScent_1.y = this._baba.stageHeight >> 1;
            nextScent_1.scaleX = 0;
            nextScent_1.scaleY = 0;
            egret.Tween.get(nextScent_1).to({ scaleX: 1, scaleY: 1 }, 500).call(function () {
                if (this._lastScene) {
                    this._baba.removeChild(this._lastScene);
                }
                this._lastScene = nextScent_1;
                this._callBack(); //执行场景切换成功后的回调
            }.bind(this));
        }
    };
    return SceneManager;
}());
//单例模式写法
SceneManager.isAvailable = false;
__reflect(SceneManager.prototype, "SceneManager");
