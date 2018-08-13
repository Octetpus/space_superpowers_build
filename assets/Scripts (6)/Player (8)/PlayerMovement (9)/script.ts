class PlayerMovement extends Sup.Behavior {
  
  speed = 2
  lastKey = "down";
  whiteList: Sup.ArcadePhysics2D.Body[] = [];
  
  start() {
    let boxes = Sup.getActor("SAS").getChildren();
    let walls = Sup.getActor("Map").getChildren();
    let machine = Sup.getActor("Machine").getChildren();
    for(let b of boxes) this.whiteList.push(b.arcadeBody2D);
    for(let w of walls) this.whiteList.push(w.arcadeBody2D);
    for(let m of machine) this.whiteList.push(m.arcadeBody2D);
    this.whiteList.push(Sup.getActor("Map").arcadeBody2D)
  }
  update() {
    this.whiteList= [];
    let boxes = Sup.getActor("SAS").getChildren();
    let walls = Sup.getActor("Map").getChildren();
    for(let b of boxes) this.whiteList.push(b.arcadeBody2D);
    for(let w of walls) this.whiteList.push(w.arcadeBody2D);
    this.whiteList.push(Sup.getActor("Map").arcadeBody2D)
    
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
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.whiteList);
    this.actor.arcadeBody2D.setVelocity(new Sup.Math.Vector2(x, y));
  }
}
Sup.registerBehavior(PlayerMovement);
