var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FirstLevel = (function (_super) {
    __extends(FirstLevel, _super);
    function FirstLevel(baba) {
        var _this = _super.call(this) || this;
        //陨石数组
        _this._bmArr = [];
        _this.timer = new egret.Timer(40, 0);
        _this.skinName = "firstLevelSkin";
        _this._baba = baba;
        return _this;
    }
    FirstLevel.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    FirstLevel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //点击跳出提示框
        var bm;
        //关卡的值
        var i = 0;
        //音乐开关
        this.play.alpha = 0;
        var num = false;
        var music = RES.getRes("gamebg_mp3");
        this.soundChannel = music.play(0, -1);
        this.playMusic.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            if (!num) {
                this.stop.alpha = 0;
                this.play.alpha = 1;
                num = true;
                var music_1 = RES.getRes("gamebg_mp3");
                this.soundChannel.stop();
            }
            else {
                this.stop.alpha = 1;
                this.play.alpha = 0;
                num = false;
                this.soundChannel = music.play(0, -1);
            }
        }, this);
        //游戏时间
        var GameTime = 5;
        this.groupArr = [this.groupOne, this.groupTwo, this.groupThree];
        this.aniArr = [[this.gbgAni, this.gbgAni2], [this.gbg2Ani, this.gbg2Ani2], [this.gbg3Ani, this.gbg3Ani2]];
        var GameTimemeter;
        this.addEventListener(egret.Event.ENTER_FRAME, this.Udatepage, this);
        this.playbtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            this.titleAni.play();
            console.log(this.groupArr[i]);
            this.newfoods = setInterval(function () {
                if (bm) {
                    bm = null;
                }
                bm = this.meteorites();
                this.addChild(bm);
                this._bmArr.push(bm);
            }.bind(this), 1000);
            this.GameTimemeter = setTimeout(function () {
                clearInterval(this.newfoods);
                this.removeEventListener(egret.Event.ENTER_FRAME, this.Udatepage, this);
                // alert("过关了");
                this.soundChannel.stop();
                this.groupArr[i].visible = false;
                this.command.visible = false;
                i++;
                i > 3 ? i = 3 : "";
            }.bind(this), GameTime * 1000);
        }, this);
        this.gbgAni.play();
        this.playAnimation(this.gbgAni2, true);
        this.lbtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            this.Lmove();
        }, this);
        this.rbtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            this.Rmove();
        }, this);
        //下一关
        var levelnum = 3;
        this.nextLArr = [this.nextone, this.nextLtwo, this.nextLthree];
        this.btnArr = [this.nextLevelOne, this.nextLevelTwo, this.nextLevelThree];
        var _loop_1 = function (y) {
            this_1.btnArr[y - 1].addEventListener(egret.TouchEvent.TOUCH_END, function () {
                GameTime += 1;
                this.nextLArr[y - 1].visible = false;
                this.groupArr[y].visible = true;
                this.command.visible = true;
                this.aniArr[y][0].play();
                this.playAnimation(this.aniArr[y][1], true);
                this.addEventListener(egret.Event.ENTER_FRAME, this.Udatepage, this);
                this.newfoods = setInterval(function () {
                    if (bm) {
                        bm = null;
                    }
                    bm = this.meteorites();
                    this.addChild(bm);
                    this._bmArr.push(bm);
                }.bind(this), 1000);
                this.GameTimemeter = setTimeout(function () {
                    this.removeEventListener(egret.Event.ENTER_FRAME, this.Udatepage, this);
                    clearInterval(this.newfoods);
                    this.soundChannel.stop();
                    // alert("过关了");
                    this.groupArr[i].visible = false;
                    this.command.visible = false;
                    i++;
                    i > 3 ? i = 3 : "";
                }.bind(this), GameTime * 2000);
            }, this_1);
        };
        var this_1 = this;
        for (var y = 1; y < levelnum; y++) {
            _loop_1(y);
        }
        this.nextLthree.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            SceneManager.getInstance(this.stage).loadScene("lottoPages", awardIndex);
        });
    };
    FirstLevel.prototype.playAnimation = function (target, isLoop) {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    };
    //向左移动
    FirstLevel.prototype.Rmove = function () {
        for (var i = 0; i < this.planeArr.length; i++) {
            this.planeArr[i].x += this.plane.width >> 1;
            this.planeArr[i].x > this.stage.stageWidth ? this.plane.x = this.stage.stageWidth : "";
        }
    };
    //向右移动
    FirstLevel.prototype.Lmove = function () {
        for (var i = 0; i < this.planeArr.length; i++) {
            this.planeArr[i].x -= this.plane.width >> 1;
            this.planeArr[i].x < 0 ? this.plane.x = 0 : "";
        }
    };
    //陨石随机生成
    FirstLevel.prototype.meteorites = function () {
        var speed = 40;
        //陨石随机数
        var meteorRadom = Math.ceil(Math.random() * 3);
        // let meteorRadom = 4;
        //陨石位置随机数
        var Sprite = new egret.Sprite;
        var BitmapArr = [];
        var Bitmap = new egret.Bitmap();
        //奖励
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
    FirstLevel.prototype.Udatepage = function () {
        var bmArr = this._bmArr;
        this.planeArr = [this.plane, this.plane1, this.plane2];
        for (var z = 0; z < bmArr.length; z++) {
            for (var p = 0; p < this.planeArr.length; p++) {
                if (this.hitTest(this.planeArr[p], bmArr[z])) {
                    this.timer.stop();
                    this.plane.alpha = 0;
                    this.removeEventListener(egret.Event.ENTER_FRAME, this.Udatepage, this);
                    // alert("GAME OVER!");
                    //清除音乐
                    this.soundChannel.stop();
                    //清除定时器
                    clearTimeout(this.GameTimemeter);
                    clearInterval(this.newfoods);
                    SceneManager.getInstance(this.stage).loadScene("mainPages", ThirdPage);
                }
                ;
            }
        }
    };
    //碰撞检测
    FirstLevel.prototype.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds(); //获取显示对象的测量边界 
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        //此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。 
        return rect1.intersects(rect2);
    };
    return FirstLevel;
}(eui.Component));
__reflect(FirstLevel.prototype, "FirstLevel", ["eui.UIComponent", "egret.DisplayObject"]);
