class OxygenBehavior extends Sup.Behavior {
  boxEntity: Sup.ArcadePhysics2D.Body[] = [];
  
  start() {
    let boxes = Sup.getActor("EntityBox").getChildren();
    for(let b of boxes) this.boxEntity.push(b.arcadeBody2D);
  }
  update() {
    this.boxEntity = [];
    let boxes = Sup.getActor("EntityBox").getChildren();
    for(let b of boxes) this.boxEntity.push(b.arcadeBody2D);
    //let boxes = Sup.getActor("EntityBox").getChildren();
    //for(let b of boxes) this.boxEntity.push(b.arcadeBody2D);
    
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.boxEntity)
    
	  let touches = this.actor.arcadeBody2D.getTouches();
    
	  if(touches.top || touches.bottom || touches.right || touches.left) {
        this.boxEntity[1].actor.destroy();
	    }
  }
}
Sup.registerBehavior(OxygenBehavior);
