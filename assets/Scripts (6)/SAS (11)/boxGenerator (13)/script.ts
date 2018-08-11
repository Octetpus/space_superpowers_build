class boxGenerator extends Sup.Behavior {
  box = [];
  boxRend = [];
  boxHitbox = [];
  
  boardCase = new Array();
  BOX_TYPE = new Array(["blue_length", "yellow_length", "green_length", "orange_length"], ["blue_width", "yellow_width", "green_width", "orange_width"]);
  BOX_SIZE = new Sup.Math.Vector2(140, 140);
  
  position = new Sup.Math.Vector2(this.actor.getX(), this.actor.getY());
  
  awake() {
    //Associate a number to a case and its coordinates in unite
    let board_Size = this.getBoardSize();
    Sup.log(this.BOX_TYPE);
    for (let i = 0; i <= board_Size.x; i++) {
      for(let j = 0; j <= board_Size.y; j++) {
        this.boardCase.push([i, j]);
      }
    }
    
    //Init
    for(let i = 0; i < 18; i++) {
      let box_position = new Array();
      let box_rand_type = Math.floor(Math.random() * 2) + 0;
      let box_rand_color = Math.floor(Math.random() * 4) + 0;
      let boxTemp = new Sup.Actor("Box" + i);
      let boxTempRend = new Sup.SpriteRenderer(boxTemp, "Textures/Box");
      
      //Define hitboxe
      this.createHitbox(box_rand_type, boxTemp);
      this.box.push((boxTemp));
      this.boxRend.push((boxTempRend));
      
      this.box[i].arcadeBody2D.warpPosition(this.coordCalculation(i));
      Sup.log(this.box[i].getPosition().z)
      this.box[i].setParent("SAS");
      this.boxRend[i].setAnimation(this.BOX_TYPE[box_rand_type][box_rand_color]);
      //Sup.log(this.coordCalculation(i));
      //Sup.log("boxtype " + this.BOX_TYPE);
    }
  }
  update() {
    
  }
  
  //Calculate coordinates in pixel with the number associated to the case
  coordCalculation(num) {
    let coords_x, coords_y;
    coords_x = this.position.x + 140/3 * this.boardCase[num][1];
    coords_y = this.position.y + 140/3 * this.boardCase[num][0];
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
Sup.registerBehavior(boxGenerator);

/* | || 
  || |_ */