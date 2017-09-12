// TypeScript file
function creatImg(name) {
    var resuit = new egret.Bitmap();
    resuit.texture = RES.getRes(name);
    return resuit;
}
function createBtn(width, height, bgColor, hoverColor, text, callBack, textColor, textSize) {
    if (text === void 0) { text = "按钮"; }
    if (callBack === void 0) { callBack = function () { }; }
    if (textColor === void 0) { textColor = 0x000000; }
    if (textSize === void 0) { textSize = 20; }
    // ,callBack=function(){}
    // let tem = test||"默认值"；
    var resuit = new egret.Sprite();
    var shape = new egret.Shape();
    shape.graphics.beginFill(bgColor);
    shape.graphics.drawRect(0, 0, width, height);
    resuit.addChild(shape);
    var textFild = new egret.TextField();
    resuit.addChild(textFild);
    textFild.text = text;
    textFild.width = width;
    textFild.height = height;
    textFild.size = textSize;
    textFild.textColor = textColor;
    textFild.textAlign = egret.HorizontalAlign.CENTER;
    textFild.verticalAlign = egret.VerticalAlign.MIDDLE;
    //把接收点击事件打开
    shape.touchEnabled = true;
    shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
        shape.graphics.clear();
        shape.graphics.beginFill(hoverColor);
        shape.graphics.drawRect(0, 0, width, height);
        shape.graphics.endFill();
    }, null);
    shape.addEventListener(egret.TouchEvent.TOUCH_END, function () {
        shape.graphics.clear();
        shape.graphics.beginFill(bgColor);
        shape.graphics.drawRect(0, 0, width, height);
        shape.graphics.endFill();
        callBack();
    }, null);
    shape.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
        shape.graphics.clear();
        shape.graphics.beginFill(bgColor);
        shape.graphics.drawRect(0, 0, width, height);
        shape.graphics.endFill();
        callBack();
    }, null);
    return resuit;
}
//封装文本域
function createdTxt(width, height, text, size, horizon, vertical) {
    if (size === void 0) { size = 30; }
    if (horizon === void 0) { horizon = "center"; }
    if (vertical === void 0) { vertical = egret.VerticalAlign.MIDDLE; }
    var result = new egret.TextField();
    result.size = size;
    result.text = text;
    result.width = width;
    result.height = height;
    result.textAlign = horizon;
    result.verticalAlign = vertical;
    return result;
}
//时间格式化
function timeFormat(second) {
    var sec = Math.floor(second);
    var min = Math.floor(sec / 60);
    sec = sec % 60;
    var s = sec < 10 ? "0" + sec : sec;
    var m = min < 10 ? "0" + min : min;
    return m + ":" + s;
}
//绘制矩形
function createdRect(width, height, bgColor) {
    var result = new egret.Shape();
    result.graphics.beginFill(bgColor);
    result.graphics.drawRect(0, 0, width, height);
    result.graphics.endFill();
    return result;
}
//绘制圆角矩形
function yuanj() {
    var result = new egret.Shape();
    result.graphics.beginFill(0xff0000);
    result.graphics.drawRoundRect(0, 0, 200, 80, 30, 30);
    result.graphics.endFill();
    return result;
}
