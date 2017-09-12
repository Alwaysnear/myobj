var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ThirdPage = (function (_super) {
    __extends(ThirdPage, _super);
    function ThirdPage() {
        var _this = _super.call(this) || this;
        _this.click = true;
        _this.skinName = "thirdPageSkin";
        return _this;
    }
    ThirdPage.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ThirdPage.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //陨石动画
        this.playAnimation(this.thirdYunshiAni, true);
        //点击事件监听切换下一场景
        //开始游戏按钮点击事件
        var click = false;
        this.startGameBtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            if (this.click) {
                SceneManager.getInstance(this.stage).loadScene("game", FirstLevel);
                soundChannel.stop();
                soundChannel = null;
                this.click = false;
            }
        }, this);
        //游戏规则按钮点击事件
        this.gameRulesBox.visible = false;
        this.gameRuleBtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            this.gameRulesBox.visible = true;
        }, this);
        //关闭规则窗口
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            this.gameRulesBox.visible = false;
        }, this);
        //背景音乐
        this.stop.alpha = 0;
        var num = false;
        var music = RES.getRes("mainBGM3_mp3");
        var soundChannel = music.play(0, -1);
        this.playMusic.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            if (!num) {
                this.stop.alpha = 1;
                this.play.alpha = 0;
                num = true;
                var music_1 = RES.getRes("mainBGM3_mp3");
                soundChannel.stop();
                console.log(222);
            }
            else {
                this.stop.alpha = 0;
                this.play.alpha = 1;
                num = false;
                soundChannel = music.play(0, -1);
                console.log(111);
            }
        }, this);
    };
    //设置循环播放
    ThirdPage.prototype.playAnimation = function (target, isLoop) {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    };
    return ThirdPage;
}(eui.Component));
__reflect(ThirdPage.prototype, "ThirdPage", ["eui.UIComponent", "egret.DisplayObject"]);
