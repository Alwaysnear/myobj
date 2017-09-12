var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Success = (function (_super) {
    __extends(Success, _super);
    function Success() {
        var _this = _super.call(this) || this;
        _this.skinName = "successSkin";
        return _this;
    }
    Success.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Success.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //点击跳去抽奖
        this.goToLotto.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            SceneManager.getInstance(this.stage).loadScene("lottoPages", awardIndex);
        }, this);
        //点击隐藏分享
        // this.share.addEventListener(egret.TouchEvent.TOUCH_END,function(){
        // 	this.share.visible = false;
        // },this)
    };
    return Success;
}(eui.Component));
__reflect(Success.prototype, "Success", ["eui.UIComponent", "egret.DisplayObject"]);
