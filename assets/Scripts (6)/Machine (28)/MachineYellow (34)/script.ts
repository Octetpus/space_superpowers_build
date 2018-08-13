class MachineYellowBehavior extends Sup.Behavior {
  boxEntity: Sup.ArcadePhysics2D.Body[] = [];
  progress = 0;
  textActor = "MotorProgress";
  text = "Motor : ";
  colorBox = "yellow"
  start() {
    let boxes = Sup.getActor("EntityBox").getChildren();
    for(let b of boxes) this.boxEntity.push(b.arcadeBody2D);
    this.updateText();
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
      let temp = this.boxEntity[1].actor.spriteRenderer.getAnimation()
        if(temp == this.colorBox + "_length" || temp == this.colorBox + "_width") {
          this.boxEntity[1].actor.destroy();
          this.progress = this.progress + 10
          this.updateText();
        }
	    }
  }
   updateText() {
      Sup.getActor(this.textActor).textRenderer.setText(this.text + this.progress)
    }
}
Sup.registerBehavior(MachineYellowBehavior);
