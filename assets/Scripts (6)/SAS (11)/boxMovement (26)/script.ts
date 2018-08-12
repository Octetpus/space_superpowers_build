class boxMovement extends Sup.Behavior {
  parentEntity = "EntityBox";
  parentBlock = "SAS";
  
  e_KeyDown: Boolean = false;
  movable: Boolean = false;
  awake() {
    this.actor.setParent(Sup.getActor(this.parentEntity));
    Sup.Storage.setJSON("ABoxIsMoving", false);
  }
  
  
  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.getActor("Player").arcadeBody2D)
    
    if(Sup.Input.wasKeyJustPressed("E") && !Sup.Storage.getJSON("ABoxIsMoving")) {
	    let touches = this.actor.arcadeBody2D.getTouches();
	    if(touches.top || touches.bottom || touches.right || touches.left) {
		    this.e_KeyDown = !this.e_KeyDown;
		    this.movable = !this.movable;
	    }
    }
    
    
    if(this.e_KeyDown) {
      let vec = new Sup.Math.Vector3(25, 50, -3);
      let playerPosition = Sup.getActor("Player").getPosition();
      this.actor.arcadeBody2D.warpPosition(playerPosition.subtract(vec)); 
    }
    
    if(this.movable){
      this.actor.setParent(Sup.getActor(this.parentEntity));
      Sup.Storage.setJSON("ABoxIsMoving", true);
      
    }
    else if(!this.movable) {
      this.actor.setParent(Sup.getActor(this.parentBlock));
      Sup.Storage.setJSON("ABoxIsMoving", false);
    }
    
  }
}
Sup.registerBehavior(boxMovement);