var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        var _this = _super.call(this) || this;
        _this.skinName = "loadingSkin";
        return _this;
    }
    Loading.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Loading.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // this.playAnimation(this.loadingbgAni,true);
    };
    return Loading;
}(eui.Component));
__reflect(Loading.prototype, "Loading", ["eui.UIComponent", "egret.DisplayObject"]);
