class boxCreation extends Sup.Behavior {
  BOX_TYPE = new Array(["blue_length", "yellow_length", "green_length", "orange_length"], ["blue_width", "yellow_width", "green_width", "orange_width"]);
  BOX_SIZE = new Sup.Math.Vector2(140, 140);
  
  sasGrid = new Array();
  box: Sup.Actor[] = [];
  boxRend: Sup.SpriteRenderer[] = [];
  boxHitbox: Sup.ArcadePhysics2D.Body[] = [];
  
  seed = String(Math.floor(Math.random() * 999999999) + 1);
  //seed = String(799578460);
  rng = new RNG(this.seed);
  
  num = 10;
  
  start() {
    
  }
  
  awake() {
    //Seed
    Sup.log(this.seed);
    Sup.Storage.setJSON("seed", this.seed)
    //Array of coordinates associated to case
    let board_Size = boxTools.getBoardSize(this.actor);
    for (let i = 0; i <= board_Size.x; i++) {
      for(let j = 0; j <= board_Size.y; j++) {
        this.sasGrid.push([i, j]);
      }
    }
    //Init
    for(let i = 0; i < this.num; i++) {
      let box_rand_type = this.rng.random(0, 2);
      let box_rand_color = this.rng.random(0, 4);
      let boxTemp = new Sup.Actor("Box" + i);
      let boxTempRend = new Sup.SpriteRenderer(boxTemp, "Textures/Box");
      
      Sup.getActor("Box" + i).addBehavior(boxMovement);
      boxTools.createHitbox(box_rand_type, boxTemp);
      
      this.box.push((boxTemp));
      this.boxRend.push((boxTempRend));
      this.box[i].arcadeBody2D.warpPosition(boxTools.coordCalculation(this.actor, this.sasGrid, boxTools.boxGenOrder()[i]));
      Sup.log("boxCreation" + boxTools.coordCalculation(this.actor, this.sasGrid, i));
      this.box[i].setParent(Sup.getActor("SAS"));
      
      this.boxRend[i].setAnimation(this.BOX_TYPE[box_rand_type][box_rand_color]);
      //Sup.log("boxtype " + this.BOX_TYPE);
    }
    
  }

  update() {
    
  }
  
}
Sup.registerBehavior(boxCreation);

/* | || 
  || |_ */