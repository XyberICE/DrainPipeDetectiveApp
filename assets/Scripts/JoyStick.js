var protagonistClass = require("Protagonist");

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
		canvas:
		{
			default: null,
			type: cc.Node,
		},
		
		bg:
		{
			default: null,
			type: cc.Sprite
		},
		thumb:
		{
			default: null,
			type: cc.Sprite
		},
		protagonistObject:
		{
			default: null,
			type: protagonistClass
		},
        JOYSTICK_RADIUS: null,
        THUMB_RADIUS: null,
		kCenter: null,
		isPressed: null,
		velocity: null,
    },

    // use this for initialization
    onLoad()
	{
		this.canvas.on(cc.Node.EventType.TOUCH_START, this.touchStarted, this);
		this.canvas.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoved, this)
		this.canvas.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelled, this)
		this.canvas.on(cc.Node.EventType.TOUCH_END, this.touchEnded, this);
		
		
		this.kCenter = this.bg.node.getPosition();
		this.JOYSTICK_RADIUS = this.bg.node.getContentSize().width/2
		this.THUMB_RADIUS = this.thumb.node.getContentSize().width/2
		this.velocity = cc.p(0,0);
	
		// this.bg.node.setPosition(this.kCenter);
		// this.thumb.node.setPosition(this.kCenter);
	},
	
	onDestroy()
	{
		this.canvas.off(cc.Node.EventType.TOUCH_START, this.touchStarted, this);
		this.canvas.off(cc.Node.EventType.TOUCH_MOVE, this.touchMoved, this)
		this.canvas.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelled, this)
		this.canvas.off(cc.Node.EventType.TOUCH_END, this.touchEnded, this);
	},
	
    updateVelocity(point)
    {
        // calculate Angle and length
        var dx = point.x - this.kCenter.x;
        var dy = point.y - this.kCenter.y;
        
        var distance = Math.sqrt(dx*dx + dy*dy);
        var angle = Math.atan2(dy,dx); // in radians
		
        
        if (distance > this.JOYSTICK_RADIUS)
        {
            dx = Math.cos(angle) * this.JOYSTICK_RADIUS;
            dy = Math.sin(angle) * this.JOYSTICK_RADIUS;
        }
        
        this.velocity = cc.p(dx/this.JOYSTICK_RADIUS, dy/this.JOYSTICK_RADIUS);
        
        if(distance > this.THUMB_RADIUS)
        {
            point.x = this.kCenter.x + Math.cos(angle) * this.THUMB_RADIUS;
            point.y = this.kCenter.y + Math.sin(angle) * this.THUMB_RADIUS;
        }
        
        this.thumb.node.setPosition(point);
        
        this.protagonistObject.moveProtagonist(this.velocity);
    },
	
	touchStarted(event)
	{
		var touch = event.getTouches();
		var point = touch[0].getLocation();


		if (this.isPointInCircle(point, this.kCenter, this.JOYSTICK_RADIUS))
		{
			this.isPressed = true;
			this.updateVelocity(point);
		}
	},
	
	touchMoved(event)
	{
		if(this.isPressed)
		{
			var touch = event.getTouches();
			var point = touch[0].getLocation();
			this.updateVelocity(point);
		}
	},
	
	touchCancelled(event)
	{
		this.handleLastTouch();
	},
	
	touchEnded(event)
	{
		this.handleLastTouch();
	},
	
	handleLastTouch()
	{
		var wasPressed = this.isPressed;
		if(wasPressed)
		{
			this.resetJoystick();
			this.isPressed = false;
		}
	},
	
	resetJoystick()
	{
		this.updateVelocity(this.kCenter);
	},
	
	isPointInCircle(point, center, radius)
	{
		var dx = (point.x - center.x);
		var dy = (point.y - center.y);
		return (radius >= Math.sqrt((dx*dx)+(dy*dy)));
	},
});
