
cc.Class({
    extends: cc.Component,
	
	editor: { requireComponent: cc.TiledMap },
	
	properties: () =>
	({
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
		levelMap:
		{
			default: null,
			type: cc.TiledMap
		},
		metaNode:
		{
			default: null,
			type: cc.Node
		},
		metaLayer: null,
		canvas:
		{
			default: null,
			type: cc.Node
		},
		protagonistObject:
		{
			default: null,
			type: require("Protagonist")		// Include all player objects' scripts
		},
		dripAudio: {
			default: null,
			url: cc.AudioClip
		},
	}),
	
	 // use this for initialization
	 onLoad()
	 {
	 	// this.canvas.opacity = 0;
		// this.canvas.runAction(cc.sequence(
		// 	 cc.fadeIn(3.0),
		// 	 cc.callFunc(this.deferredOnLoad, this)
		//  ));
		
		this.metaLayer = this.levelMap.getLayer(this.metaNode.name);		// Get TMXLayer (using a cc.TMXLayer node type doesn't work)
		
		
		this.startAudio();
	 },

	onDestroy()
	{
	},
	
	 	// called every frame
	 update(dt)
	 {
		 	// Updates protagonist position & returns new position to scroll the map
		 this.scrollMap(this.protagonistObject.updateProtagonist(dt, this.levelMap));
	 },
	
	scrollMap(protagonistPosition)
	{
		
		var windowSize = cc.director.getWinSize();
		
		var x = Math.max(protagonistPosition.x, windowSize.width / 2);
		var y = Math.max(protagonistPosition.y, windowSize.height / 2);
		x = Math.min(x, (this.levelMap.getMapSize().width * this.levelMap.getTileSize().width) - windowSize.width / 2);
		y = Math.min(y, (this.levelMap.getMapSize().height * this.levelMap.getTileSize().height) - windowSize.height / 2);
		var actualPosition = cc.p(x, y);
		
		var centerOfView = cc.p(windowSize.width / 2, windowSize.height / 2);
		var viewPoint = cc.pSub(centerOfView, actualPosition);
		
		// viewPoint.y += 128;		//Make room for bottom game info display
		
		this.levelMap.node.setPosition(viewPoint)
	},
	
	isTileBarrier(position)
	{
		return this.getPropertyforKeyAtPosition(position, "Barrier");
	},
	
	isTileWalkable(position)
	{
		return (this.getPropertyforKeyAtPosition(position, "AvailableAction") === "Walk");
	},
	
	isTileClimbable(position)
	{
		return (this.getPropertyforKeyAtPosition(position, "AvailableAction") === "Climb");
	},

	getPropertyforKeyAtPosition(position, propertyName)
	{
		var tileCoord = this.tileCoordForPosition(position);
		var tileGID = this.metaLayer.getTileGIDAt(tileCoord);											//this.levelMap.getLayer("Meta").getTileGIDAt(tileCoord);
		var returnValue;
		
		if(tileGID)
		{
			var tileProperties = this.levelMap.getPropertiesForGID(tileGID);
			if(tileProperties)
			{
				returnValue = tileProperties[propertyName];
			}
		}
		return (typeof returnValue === 'undefined') ? (typeof returnValue !== 'undefined') : returnValue;
	},
	
	tileCoordForPosition(position)
	{
		var x = position.x / this.levelMap.getTileSize().width;
		var y = ((this.levelMap.getMapSize().height * this.levelMap.getTileSize().height) - position.y) / this.levelMap.getTileSize().height;

		return cc.p(x, y);
	},

	getNextScene()
	{
		return cc.director.getScene();
	},
	
	startAudio()
	{
		var dripSoundId = cc.audioEngine.playEffect(this.dripAudio, true, .07);
	},
});

