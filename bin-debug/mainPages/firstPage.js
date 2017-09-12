var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var firstPage = (function (_super) {
    __extends(firstPage, _super);
    function firstPage() {
        var _this = _super.call(this) || this;
        _this.click = true;
        _this.skinName = "firstPageSkin";
        return _this;
    }
    firstPage.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    firstPage.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //陨石动画
        this.playAnimation(this.firstYunshiAni, true);
        //底部箭头动画
        this.playAnimation(this.upArrowAni, true);
        //向上滑动监听切换下一场景
        this.moveUp.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            console.log(e.target);
            if (this.click) {
                SceneManager.getInstance(this.stage).loadScene("mainPages", SecondPages);
                soundChannel.stop();
                soundChannel = null;
                this.click = false;
            }
        }, this);
        //背景音乐
        this.stop.alpha = 0;
        var num = false;
        var music = RES.getRes("mainBGM_mp3");
        var soundChannel = music.play(0, -1);
        this.playMusic.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            if (!num) {
                this.stop.alpha = 1;
                this.play.alpha = 0;
                num = true;
                soundChannel.stop();
                soundChannel = null;
            }
            else {
                this.stop.alpha = 0;
                this.play.alpha = 1;
                num = false;
                soundChannel = music.play(0, -1);
            }
        }, this);
    };
    //设置循环播放
    firstPage.prototype.playAnimation = function (target, isLoop) {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    };
    return firstPage;
}(eui.Component));
__reflect(firstPage.prototype, "firstPage", ["eui.UIComponent", "egret.DisplayObject"]);
