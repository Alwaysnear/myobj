var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LastLevel = (function (_super) {
    __extends(LastLevel, _super);
    function LastLevel(baba) {
        var _this = _super.call(this) || this;
        //陨石数组
        _this._bmArr = [];
        _this.timer = new egret.Timer(40, 0);
        _this.skinName = "lastLevelSkin";
        _this._baba = baba;
        return _this;
    }
    LastLevel.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    LastLevel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.playAnimation(this.gbgAni, true);
        this.lbtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            this.Lmove();
        }, this);
        this.rbtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            this.Rmove();
        }, this);
        //生成物品
        var bm;
        this._newfoods = setInterval(function () {
            if (bm) {
                bm = null;
            }
            bm = this.meteorites();
            this.addChild(bm);
            this._bmArr.push(bm);
        }.bind(this), 4000);
        this.addEventListener(egret.Event.ENTER_FRAME, this.Udatepage, this);
        //音乐开关
        this.play.alpha = 0;
        var num = false;
        var music = RES.getRes("gamebg_mp3");
        var soundChannel = music.play(0, -1);
        this.playMusic.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            if (!num) {
                this.stop.alpha = 0;
                this.play.alpha = 1;
                num = true;
                var music_1 = RES.getRes("gamebg_mp3");
                soundChannel.stop();
                console.log(222);
            }
            else {
                this.stop.alpha = 1;
                this.play.alpha = 0;
                num = false;
                soundChannel = music.play(0, -1);
                console.log(111);
            }
        }, this);
    };
    LastLevel.prototype.playAnimation = function (target, isLoop) {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    };
    //向左移动
    LastLevel.prototype.Rmove = function () {
        this.plane.x += this.plane.width >> 1;
        this.plane.x > this.stage.stageWidth ? this.plane.x = this.stage.stageWidth : "";
    };
    //向右移动
    LastLevel.prototype.Lmove = function () {
        this.plane.x -= this.plane.width >> 1;
        this.plane.x < 0 ? this.plane.x = 0 : "";
    };
    //陨石随机生成
    LastLevel.prototype.meteorites = function () {
        var speed = 40;
        //陨石随机数
        var meteorRadom = Math.ceil(Math.random() * 3);
        // let meteorRadom = 4;
        //陨石位置随机数
        var Sprite = new egret.Sprite;
        var BitmapArr = [];
        var Bitmap = new egret.Bitmap();
        //奖励
        // if (meteorRadom == 4) {
        // 	Bitmap.name = "reward";
        // }
        Bitmap.texture = RES.getRes("meteorites" + meteorRadom + "_png");
        var meteroeX = Math.ceil(Math.random() * this.stage.stageWidth);
        Bitmap.scaleX = .6;
        Bitmap.scaleY = .6;
        Sprite.x = meteroeX;
        Bitmap.anchorOffsetX = Bitmap.width * .5;
        Bitmap.anchorOffsetY = Bitmap.height * .5;
        Sprite.width = Bitmap.width * .5;
        Sprite.height = Bitmap.height * .5;
        Sprite.addChild(Bitmap);
        this.timer.start();
        this.timer.addEventListener(egret.TimerEvent.TIMER, function () {
            Sprite.y += Sprite.height >> 1;
            if (Sprite.y > 900) {
                Sprite.removeChildren();
            }
        }.bind(this), null);
        return Sprite;
    };
    LastLevel.prototype.Udatepage = function () {
        var bmArr = this._bmArr;
        for (var i = 0; i < bmArr.length; i++) {
            if (this.hitTest(this.plane, bmArr[i])) {
                console.log(bmArr[i]);
                if (bmArr[i].name == "reward") {
                    console.log(111);
                }
                else {
                    this.removeChild(bmArr[i]);
                    this.timer.stop();
                    clearInterval(this._newfoods);
                    this.plane.alpha = 0;
                    this.removeEventListener(egret.Event.ENTER_FRAME, this.Udatepage, this);
                    alert("GAME OVER!");
                }
            }
            ;
        }
    };
    //碰撞检测
    LastLevel.prototype.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds(); //获取显示对象的测量边界 
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        //此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。 
        return rect1.intersects(rect2);
    };
    return LastLevel;
}(eui.Component));
__reflect(LastLevel.prototype, "LastLevel", ["eui.UIComponent", "egret.DisplayObject"]);
