class boxCreation extends Sup.Behavior {
  private BOX_TYPE = new Array(["blue_length", "yellow_length", "green_length", "orange_length"], ["blue_width", "yellow_width", "green_width", "orange_width"]);
  BOX_SIZE = new Sup.Math.Vector2(140, 140);
  
  sasGrid = new Array();
  box: Sup.Actor[] = [];
  boxRend: Sup.SpriteRenderer[] = [];
  boxHitbox: Sup.ArcadePhysics2D.Body[] = [];

  //seed = String(Math.floor(Math.random() * 999999999) + 1);
  seed = String(799578460);
  rng = new RNG(this.seed);
  
  awake() {
    //Array of coordinates associated to case
    Sup.log(this.seed);
    let board_Size = this.getBoardSize();
    for (let i = 0; i <= board_Size.x; i++) {
      for(let j = 0; j <= board_Size.y; j++) {
        this.sasGrid.push([i, j]);
      }
    }
    
    //Init
    for(let i = 0; i < 18; i++) {
      let box_rand_type = this.rng.random(0, 2);
      let box_rand_color = this.rng.random(0, 4);
      let boxTemp = new Sup.Actor("Box" + i);
      let boxTempRend = new Sup.SpriteRenderer(boxTemp, "Textures/Box");
      
      
      this.createHitbox(box_rand_type, boxTemp);
      
      this.box.push((boxTemp));
      this.boxRend.push((boxTempRend));
      
      this.box[i].arcadeBody2D.warpPosition(this.coordCalculation(i));
      
      this.box[i].setParent(Sup.getActor("SAS"));
      
      this.boxRend[i].setAnimation(this.BOX_TYPE[box_rand_type][box_rand_color]);
      //Sup.log(this.coordCalculation(i));
      //Sup.log("boxtype " + this.BOX_TYPE);
    }
  }
  update() {
    
  }
  
  //Calculate coordinates in pixel with the number associated to the case
  coordCalculation(num) {
    let position = new Sup.Math.Vector2(this.actor.getX(), this.actor.getY());
    let coords_x, coords_y;
    coords_x = position.x + 140/3 * this.sasGrid[num][1];
    coords_y = position.y + 140/3 * this.sasGrid[num][0];
    let coords = new Sup.Math.Vector3(coords_x, coords_y, 4);
    return coords;
  }
  
  //Get the size of the spawnable area in unit
  getBoardSize() {
    let height = this.actor.tileMapRenderer.getTileMap().getHeight();
    let width = this.actor.tileMapRenderer.getTileMap().getWidth();
    let y = Math.round(height);
    let x = Math.round(width);
    return new Sup.Math.Vector2(x, y);
  }
  
  createHitbox(box_rand_type, boxTemp) {
    //Length type
    if(box_rand_type == 0) {
      new Sup.ArcadePhysics2D.Body(boxTemp, Sup.ArcadePhysics2D.BodyType.Box, {
        movable: true, 
        width: 33, 
        height: 46, 
        offset: { 
          x: 23.5, 
          y: 23 
         }
       });
    }
    else if(box_rand_type == 1) {
      new Sup.ArcadePhysics2D.Body(boxTemp, Sup.ArcadePhysics2D.BodyType.Box, {
        movable: true, 
        width: 46, 
        height: 33, 
        offset: { 
          x: 23, 
          y: 16.5 
         }
      });        
    }
  }
  
}
Sup.registerBehavior(boxCreation);

/* | || 
  || |_ */