class PlayerMovement extends Sup.Behavior {
  
  public speed = 2
  public lastKey = "down";
  boxesBodies: Sup.ArcadePhysics2D.Body[] = [];
  
  start() {
    Sup.log(Sup.ArcadePhysics2D.getAllBodies());
    
    let boxes = Sup.getActor("SAS").getChildren();
    for(let b of boxes) this.boxesBodies.push(b.arcadeBody2D);
    
  }
  update() {
    let x = 0, y = 0;
    let key = this.lastKey;
    //Map key to moves
    if(Sup.Input.isKeyDown("Z") || Sup.Input.isKeyDown("W")) {
      y = this.speed;
      key = "up";
    }
    
    if(Sup.Input.isKeyDown("S")) {
      y = -this.speed;
      key = "down";
    }
    
    if(Sup.Input.isKeyDown("Q") || Sup.Input.isKeyDown("A")) {
      x = -this.speed;
      key = "left";
    }
    
    if(Sup.Input.isKeyDown("RIGHT") || Sup.Input.isKeyDown("D") ) {
      x = this.speed;
      key = "right";
    }
    this.moveAnim(x, y, key);
    
  }
  
  //Set animation corresponding to the move
  moveAnim(x, y, key) {
    this.lastKey = key;
    
    if (x != 0 || y != 0) {
      this.actor.spriteRenderer.setAnimation("walk_" + key);
      this.moveActor(x, y);
  }
    else {
      this.actor.spriteRenderer.setAnimation("idle_" + key);
      this.moveActor(0, 0);
    }
    
  }
  
  //Move physically the player
  moveActor(x, y) {
    //Make the player collides to Map layer 0
    //Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.getActor("Map").arcadeBody2D);
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    this.actor.arcadeBody2D.setVelocity(new Sup.Math.Vector2(x, y));
  }
}
Sup.registerBehavior(PlayerMovement);
