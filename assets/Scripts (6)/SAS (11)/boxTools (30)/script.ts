namespace boxTools {
  export function coordCalculation(area: Sup.Actor, sasGrid, generatedOrder) {
      let position = new Sup.Math.Vector2(area.getX(), area.getY());
      let coords_x, coords_y;
      if (generatedOrder === undefined) {
        generatedOrder = 0;
      }
      coords_x = position.x + 140/3 * sasGrid[generatedOrder][1];
      coords_y = position.y + 140/3 * sasGrid[generatedOrder][0];
      
      let coords = new Sup.Math.Vector3(coords_x, coords_y, 4);
      return coords;
    }

    //Get the size of the spawnable area in unit
    export function getBoardSize(area: Sup.Actor) {
      let height = area.tileMapRenderer.getTileMap().getHeight();
      let width = area.tileMapRenderer.getTileMap().getWidth();
      let y = Math.round(height);
      let x = Math.round(width);
      return new Sup.Math.Vector2(x, y);
    }

    export function createHitbox(box_rand_type, boxTemp) {
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
    
  export function boxGenOrder() {
    let rng = new RNG(Sup.Storage.getJSON("seed"));
    let order = [];
    for(let i = 0; i < 30; i++) {
      let temp = rng.random(0, 30);
      if(order.indexOf(temp) == -1) {
         order.push(temp);
        }
      else {
        i--;
      }
      }
      Sup.log(order);
      return order;
    }
}