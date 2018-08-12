class boxMovement extends Sup.Behavior {
  box: Sup.Actor[] = [];
  e_KeyDown = false;
  
  start() {
    let boxes = Sup.getActor("SAS").getChildren();
    for(let b of boxes) this.box.push(b);
    this.box[0].setParent(Sup.getActor("MovableBox"));
  }

  update() {
    if(Sup.Input.wasKeyJustPressed("E")) {
      this.e_KeyDown = !this.e_KeyDown
    }
    
    if(this.e_KeyDown == true) {
      let vec = new Sup.Math.Vector3(25, 50, -3);
      let playerPosition = Sup.getActor("Player").getPosition();
      this.box[0].arcadeBody2D.warpPosition(playerPosition.subtract(vec));
      //Sup.log(this.boxesBodies[0].getPosition());    
    }
    
  }
}
Sup.registerBehavior(boxMovement);
