var protagonistClass = require("Protagonist");
cc.Class({
	 extends: cc.Component,
	
	 properties:
	 {
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
			 case 16: // ignore shift key
				 break;
			 case cc.KEY.d:
			 case cc.KEY.right:
			 	if(!window.event.shiftKey)
					velocity = cc.p(0.5, 0);
			 	else
			 		velocity = cc.p(1, 0);		// Greater magnitude = running
				 break;
				 
			 case cc.KEY.a:
			 case cc.KEY.left:
				 if(!window.event.shiftKey)
					 velocity = cc.p(-0.5, 0);
				 else
					 velocity = cc.p(-1, 0);		// Greater magnitude = running
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