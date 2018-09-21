 var config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 1600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};



   let cursors;
   let map;
   let layer;
   let sprite;
   let player;
   let gold = 0;
   let chest;

    let game = new Phaser.Game(config);

    function preload ()
	{
	
	this.load.image('tileset', "tilesets/tileset1.png");
	this.load.tilemapTiledJSON('map', "../maps/map13.json");
    this.load.spritesheet("archer", 
        "sprites/archer.png",
        { frameWidth: 64, frameHeight: 64 }
    );
	this.load.spritesheet('thief', 'sprites/thief.png', { frameWidth: 64, frameHeight: 64});
	}
	

   
   
   function create ()
{
    const map = this.make.tilemap({ key: "map" });
	
	const tileset = map.addTilesetImage("tileset1", "tileset");
	
	const belowLayer = map.createStaticLayer("Background", tileset, 0, 0);
	const worldLayer = map.createDynamicLayer("Midground", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Foreground", tileset, 0, 0);
    
	
	worldLayer.setCollisionByProperty({ collides: true });
	
	aboveLayer.setDepth(10);
	
	const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
	
	 player = this.physics.add.sprite(100, 450, 'thief');
	
	this.anims.create({
        key: 'thief-walk-forward',
        frames: this.anims.generateFrameNumbers('thief', { start: 104, end: 112 }),
        frameRate: 10,
        repeat: -1
    });

	
	this.anims.create({
        key: 'thief-walk-back',
        frames: this.anims.generateFrameNumbers('thief', { start: 130, end: 138 }),
        frameRate: 10,
        repeat: -1
    });

   this.anims.create({
        key: 'thief-walk-left',
        frames: this.anims.generateFrameNumbers('thief', { start: 117, end: 125 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'thief-walk-right',
        frames: this.anims.generateFrameNumbers('thief', { start: 143, end: 151 }),
        frameRate: 10,
        repeat: -1
    });
	
	this.physics.add.collider(player, worldLayer);
	
	const camera = this.cameras.main;
	camera.startFollow(player);
	camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	
	
	cursors = this.input.keyboard.createCursorKeys();

}	
	

    function update ()
    {
	
	
	const speed = 175;
	const prevVelocity = player.body.velocity.clone();
	
	
	player.body.setVelocity(0);
	
	
	
	if (cursors.left.isDown) {
	player.body.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(speed);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    player.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(speed);
  }

  // Normalize and scale the velocity so that player can't move faster along a diagonal
  player.body.velocity.normalize().scale(speed);
  

  if (cursors.left.isDown) {
    player.anims.play("thief-walk-left", true);
  } else if (cursors.right.isDown) {
    player.anims.play("thief-walk-right", true);
  } else if (cursors.up.isDown) {
    player.anims.play("thief-walk-forward", true);
  } else if (cursors.down.isDown) {
    player.anims.play("thief-walk-back", true);
  } else {
    player.anims.stop();
  }

	
    }