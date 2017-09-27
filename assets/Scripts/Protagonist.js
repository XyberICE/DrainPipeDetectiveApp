cc.Class(
	{
		extends: cc.Component,
		
		properties: {
			// foo: {
			default: null,      // The default value will be used only when the component attaching
			//                           to a node for the first time
			//    url: cc.Texture2D,  // optional, default is typeof default
			//    serializable: true, // optional, default is true
			//    visible: true,      // optional, default is true
			//    displayName: 'Foo', // optional
			//    readonly: false,    // optional, default is false
			// },
			// ...
			protagonistSpeed: 41,
			protagonistAnimation: null,
			protagonist: {
				default: null,
				type: cc.Node
			},
		},
		
		// use this for initialization
		onLoad()
		{
			
			this.protagonistAnimation = this.getComponent(cc.Animation);       // Load the walk cycle animation
			this.protagonistAnimation.play("Protagonist-Walking");
			this.protagonistAnimation.pause("Protagonist-Walking");
			
			
			// var listener = cc.EventListener.create();
			// listener.onKeyReleased
			
			
			if (cc.sys.capabilities.hasOwnProperty("keyboard"))
			{
				cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
				cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
			}
			else if (cc.sys.capabilities.hasOwnProperty("touch"))
			{
				cc.systemEvent.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
				cc.systemEvent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
			}
			
		},
		
		onDestroy()
		{
			cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
			cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
			cc.systemEvent.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
			cc.systemEvent.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd);
		},
		
		onKeyDown(event)
		{
			switch (event.keyCode)
			{
				case cc.KEY.d:
				case cc.KEY.D:
				case cc.KEY.right:
					this.moveRight();
					break;
				case cc.KEY.a:
				case cc.KEY.A:
				case cc.KEY.left:
					this.moveLeft();
					break;
			}
			cc.log("Key Down");
		},
		
		onKeyUp()
		{
			this.stopMoving();
		},
		
		
		onTouchStart(event)
		{
			var touches = event.getTouches();
			var touchLoc = touches[0].getLocation();
			
			if (touchLoc.x > 600)
				this.moveRight();
			else
				this.moveLeft();
		},
		
		onTouchEnd()
		{
			this.stopMoving();
		},
		
		
		moveRight()
		{
			this.protagonist.scaleX = 1;
			// if (this.node.getScaleX() < 0)     // If facing left, turn around
			// {
			// 	this.node.setScaleX(this.node.getScaleX() * -1);
			// }
			
			
			// Start animating the walk cycle, but don't start if already animating (this will cause a stutter)
			if (this.protagonistSpeed === 0)
				this.protagonistAnimation.play("Protagonist-Walking");
			
			
			this.protagonistSpeed = 38;
			// }
		},
		
		moveLeft()
		{
			this.protagonist.scaleX = -1;
			
			// if (this.node.getScaleX() > 0)     // If facing right, turn around
			// {
			// 	this.node.setScaleX(this.node.getScaleX() * -1);
			// }
			
			
				// Start animating the walk cycle, but don't start if already animating (this will cause a stutter)
			if (this.protagonistSpeed === 0)
				this.protagonistAnimation.play("Protagonist-Walking");
			
			
			this.protagonistSpeed = -38;
		},
		
		stopMoving()
		{
			this.protagonistSpeed = 0;
			
				// Stop the walk cycle animation
			this.protagonistAnimation.pause("Protagonist-Walking")
		},
		
		
		// called every frame
		update(dt)
		{
			this.protagonist.x += this.protagonistSpeed * dt;
		}
	});
