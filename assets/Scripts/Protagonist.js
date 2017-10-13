cc.Class({
    extends: cc.Component,
	
    properties: () =>
	({
        // foo: {
        //default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
		protagonistWalkSpeed: 48,
		protagonistClimbSpeed: 48,
        protagonistRunSpeed: 0,
		protagonistSpeed: cc.p(0,0),
        protagonist: {
            default: null,
            type: cc.Sprite
        },
        protagonistAnimation: {
            default: null,
            type: cc.Animation
        },
		tileMapObject:
		{
			default: null,
			type: require("Level1Map")
		},
        footstep1Audio: {
            default: null,
            url: cc.AudioClip
        },
        footstep2Audio: {
            default: null,
            url: cc.AudioClip
        },
        footstep3Audio: {
            default: null,
            url: cc.AudioClip
        },
        footstep4Audio: {
            default: null,
            url: cc.AudioClip
        },
        footstep5Audio: {
            default: null,
            url: cc.AudioClip
        },
        footstepsAudio: [],
        footstepsIndex: 0,
    }),
    // use this for initialization
    onLoad: function () {
        this.protagonistSpeed = cc.p(0, 0);
        // Stop the walk cycle animation
        this.protagonistAnimation.play("Protagonist-Walking");
        this.protagonistAnimation.pause("Protagonist-Walking");
        this.footstepsAudio[0] = this.footstep1Audio;
        this.footstepsAudio[1] = this.footstep2Audio;
        this.footstepsAudio[2] = this.footstep3Audio;
        this.footstepsAudio[3] = this.footstep4Audio;
        this.footstepsAudio[4] = this.footstep5Audio;
    },
    moveProtagonist: function (velocity)
    {
        switch (true)
        {
			case velocity.x > 0 && Math.abs(velocity.x) > Math.abs(velocity.y):		// Move along axis of greater magnitude
				this.moveRightProtagonist();
				break;
			case velocity.x < 0 && Math.abs(velocity.x) > Math.abs(velocity.y):
				this.moveLeftProtagonist();
				break;
			case velocity.y > 0 && Math.abs(velocity.y) > Math.abs(velocity.x):
				this.moveUpProtagonist();
				break;
			case velocity.y < 0 && Math.abs(velocity.y) > Math.abs(velocity.x):
				this.moveDownProtagonist();
				break;
			case cc.pointEqualToPoint(velocity, cc.p(0,0)):
                this.stopMovingProtagonist();
                break;
        }
    },
    moveRightProtagonist: function ()
    {
		var nextPosition = cc.pAdd(this.protagonist.node.position, cc.p(this.protagonistWalkSpeed, 0));
	
		if(this.tileMapObject.isTileWalkable(nextPosition))
		{
			this.protagonist.node.scaleX = 1;
			// if (this.node.getScaleX() < 0)     // If facing left, turn around
			// {
			// 	this.node.setScaleX(this.node.getScaleX() * -1);
			// }
			// Start animating the walk cycle, but don't start if already animating (this will cause a stutter)
			if (this.protagonistSpeed.x === 0)
				this.protagonistAnimation.play("Protagonist-Walking");
			
				// Force walking position to the bottom-most pixel in the 'walk' tiles
			this.protagonist.node.y = this.reduceToNearestYTile(nextPosition);
			
			this.protagonistSpeed.x = this.protagonistWalkSpeed;
			// }
		}
    },
	
    moveLeftProtagonist: function ()
    {
		var nextPosition = cc.pAdd(this.protagonist.node.position, cc.p(this.protagonistWalkSpeed, 0));
	
		if(this.tileMapObject.isTileWalkable(nextPosition))
		{
			this.protagonist.node.scaleX = -1;
			// if (this.node.getScaleX() > 0)     // If facing right, turn around
			// {
			// 	this.node.setScaleX(this.node.getScaleX() * -1);
			// }
			// Start animating the walk cycle, but don't start if already animating (this will cause a stutter)
			if (this.protagonistSpeed.x === 0)
				this.protagonistAnimation.play("Protagonist-Walking");
			
				// Force walking position to the bottom-most pixel in the 'walk' tiles
			this.protagonist.node.y = this.reduceToNearestYTile(nextPosition);
			
			this.protagonistSpeed.x = -this.protagonistWalkSpeed;
		}
    },
     moveUpProtagonist: function ()
     {
		var nextPosition = cc.pAdd(this.protagonist.node.position, cc.p(0, this.protagonistClimbSpeed));
     	
     	if(this.tileMapObject.isTileClimbable(nextPosition))
		{
			// Start animating the climb cycle, but don't start if already animating (this will cause a stutter)
			if (this.protagonistSpeed.y === 0)
				this.protagonistAnimation.play("Protagonist-ClimbUpLadder");
			
			this.protagonist.node.x = this.reduceToNearestXTileCenter(nextPosition);
			this.protagonistSpeed.y = this.protagonistClimbSpeed;
		}
     },
	

	moveDownProtagonist: function ()
	{
		var nextPosition = cc.pAdd(this.protagonist.node.position, cc.p(0, this.protagonistClimbSpeed));
	
		if (this.tileMapObject.isTileClimbable(nextPosition))
		{
			// Start animating the climb cycle, but don't start if already animating (this will cause a stutter)
			if (this.protagonistSpeed.y === 0)
				this.protagonistAnimation.play("Protagonist-ClimbDownLadder");
			
			this.protagonist.node.x = this.reduceToNearestXTileCenter(nextPosition);
			this.protagonistSpeed.y = -this.protagonistClimbSpeed;
		}
	},

	stopMovingProtagonist: function () {
		this.protagonistSpeed = cc.p(0, 0);
		// Stop the walk cycle animation
		this.protagonistAnimation.pause("Protagonist-Walking");
		this.protagonistAnimation.pause("Protagonist-ClimbUpLadder");
		this.protagonistAnimation.pause("Protagonist-ClimbDownLadder");
	},
	
		// "Snap" to nearest Y tile position
	reduceToNearestYTile(position)
	{
		var mapHeight = this.tileMapObject.levelMap.getMapSize().height;
		var tileHeight = this.tileMapObject.levelMap.getTileSize().height;
		var tileCoord = this.tileMapObject.tileCoordForPosition(position);
		
		tileCoord.y = Math.floor(tileCoord.y) + 1;				// Reduce to tile boundary
		return ((mapHeight * tileHeight) - (tileCoord.y * tileHeight)) + 1;
	},
		 
		 // "Snap" to neatest X tile position (for climbing a ladder)
	reduceToNearestXTileCenter(position)
	{
		var tileCoord = this.tileMapObject.tileCoordForPosition(position);
		var tileWidth = this.tileMapObject.levelMap.getTileSize().width;
		
		tileCoord.x = Math.floor(tileCoord.x);
		
		return ((tileCoord.x+ 0.5) * tileWidth);
	},
	
			 // called every frame
    updateProtagonist: function (dt, levelMap) {
        // Get new position (to check against bounds)
        var newProtagonistPosition = cc.p(this.protagonist.node.x + this.protagonistSpeed.x * dt, this.protagonist.node.y + this.protagonistSpeed.y * dt),
                        mapSize = levelMap.getMapSize(), tileSize = levelMap.getTileSize(), protagonistPosition = this.protagonist.node.getPosition();
        // Offset the old bounding box to get new bounding box
        var newProtagonistBoundingBox = this.protagonist.node.getBoundingBox();
        newProtagonistBoundingBox.xMin += (newProtagonistPosition.x - protagonistPosition.x);
        newProtagonistBoundingBox.xMax += (newProtagonistPosition.x - protagonistPosition.x);
        newProtagonistBoundingBox.yMin += (newProtagonistPosition.y - protagonistPosition.y);
        newProtagonistBoundingBox.yMax += (newProtagonistPosition.y - protagonistPosition.y);
        // Don't move sprite box outside of map bounds
        if (newProtagonistBoundingBox.xMax <= (mapSize.width * tileSize.width) &&
            newProtagonistBoundingBox.yMax <= (mapSize.height * tileSize.height) &&
			(newProtagonistBoundingBox.yMin >= 0 && newProtagonistBoundingBox.xMin >= 0) &&
			!this.tileMapObject.isTileBarrier(newProtagonistPosition))
            this.protagonist.node.setPosition(newProtagonistPosition);
        else
            this.stopMovingProtagonist();
        return this.protagonist.node.getPosition();
    },
    
    // Randomly play one of three splash sound effects (called during animation events of the protagonist sprite)
    playFootstep: function () {
        this.footstepsIndex++;
        if (this.footstepsIndex >= 5)
            this.footstepsIndex = 0;
        var footstepSoundId = cc.audioEngine.playEffect(this.footstepsAudio[this.footstepsIndex], false, .06);
    },
});
