var protagonistClass = require("Protagonist");
cc.Class({
	 extends: cc.Component,
	
	 properties:
	 {
		 // foo: {
		 // default: null,      // The default value will be used only when the component attaching
		 //                           to a node for the first time
		 //    url: cc.Texture2D,  // optional, default is typeof default
		 //    serializable: true, // optional, default is true
		 //    visible: true,      // optional, default is true
		 //    displayName: 'Foo', // optional
		 //    readonly: false,    // optional, default is false
		 // },
		 // ...
		 protagonistObject:
		 {
			 default: null,
			 type: protagonistClass,
		 },
	 },
	onLoad()
	{
		// if (cc.sys.capabilities.hasOwnProperty("keyboard"))
		// {
			cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN.toString(), this.onKeyDown, this);
			cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP.toString(), this.onKeyUp, this);
		// }
	},
	onDestroy()
	{
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN.toString(), this.onKeyDown, this);
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP.toString(), this.onKeyUp, this);
	},
	 
	
	 onKeyDown(event)
	 {
		 var velocity = cc.p(0, 0);
		
		 switch (event.keyCode)
		 {
			 case cc.KEY.d:
			 case cc.KEY.right:
				 velocity = cc.p(1, 0);
				 break;
			 case cc.KEY.a:
			 case cc.KEY.left:
				 velocity = cc.p(-1, 0);
				 break;
			 case cc.KEY.w:
			 case cc.KEY.up:
				 velocity = cc.p(0, 1);
				 break;
			 case cc.KEY.s:
			 case cc.KEY.down:
				 velocity = cc.p(0, -1);
				 break;
		 }
		 this.protagonistObject.moveProtagonist(velocity);
	 },

	
	 onKeyUp()
	 {
		 this.protagonistObject.moveProtagonist(cc.p(0,0));
	 },
});