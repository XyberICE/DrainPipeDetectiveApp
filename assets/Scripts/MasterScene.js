var level1MapClass = require("Level1Map");
var introClass = require("Intro");


cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad()
	{
		// cc.director.loadScene("Level1Map");
		cc.director.pushScene("Level1Map");

		cc.director.loadScene("Intro");
		cc.director.pushScene(cc.director.getScene());
  
		//
		// var sceneRes = ccs.load("VideoPlayer.js");
		// this.addChild(sceneRes.node);
		

		cc.director.runScene(new cc.TransitionFade(3.0, "Level1Map"));
	},

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
