var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var nextLevel = (function (_super) {
    __extends(nextLevel, _super);
    function nextLevel() {
        var _this = _super.call(this) || this;
        _this.skinName = "nextLevelSkin";
        return _this;
    }
    nextLevel.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    nextLevel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //点击跳转下一关
        this.nextLevelBtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            // SceneManager.getInstance(this.stage).loadScene("game",);
        }, this);
    };
    return nextLevel;
}(eui.Component));
__reflect(nextLevel.prototype, "nextLevel", ["eui.UIComponent", "egret.DisplayObject"]);
