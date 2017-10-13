// module.exports = {
// 	sceneForThisScript: function () {
//
// 		return cc.director.getScene()
// 	},
// };

cc.Class({
     extends: cc.Component,
    
     properties: {
         videoPlayer: cc.VideoPlayer,
		 canvas:
		 {
			 default: null,
			 type: cc.Node
		 },
		 nextScene:
		 {
			default: null,
			type: cc.Scene,
		 }
	 },
    
     // use this for initialization
     onLoad()
	 {
	 },

     videoPlayerEvent(sender, event)
	 {
         if(event === cc.VideoPlayer.EventType.READY_TO_PLAY)
             this.videoPlayer.play();
		 else	if(event === cc.VideoPlayer.EventType.CLICKED)
		 	this.introTransitionToGame();
     },
	
     introTransitionToGame()
	{
		// this.canvas.opacity = 0;

		this.videoPlayer.node.removeFromParent();
		 
		 // this.canvas.runAction(cc.sequence(
			//  cc.fadeOut(3.0),
			//  cc.callFunc(this.fadeOutVideo, this)
		 // ));
		// cc.director.pushScene(cc.director.getRunningScene());
		cc.director.loadScene("Level1Map");
		cc.director.runScene(cc.TransitionFade(JumpZoomTransition(10.5, cc.director.getRunningScene())));
		
		
		
	},
	
	// fadeOutVideo()
	// {
	// 	this.videoPlayer.node.removeFromParent();
	// 	cc.director.loadScene("Level1Map");
	// }
});
