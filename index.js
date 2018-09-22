var config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 1200,
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
let skeleton;
let keys;

let game = new Phaser.Game(config);


function preload ()
{
	
this.load.image('tileset', "tilesets/tileset1.png");
this.load.tilemapTiledJSON('map', "../maps/map13.json");
this.load.spritesheet('thief', 'sprites/thief.png', { frameWidth: 64, frameHeight: 64});
this.load.spritesheet('skeleton', 'sprites/skeleton.png', { frameWidth: 64, frameHeight: 64});
}
	

   
   
function create ()
{
    const map = this.make.tilemap({ key: "map" });
	
	const tileset = map.addTilesetImage("tileset1", "tileset", 32, 32, 0, 0);
	
	const belowLayer = map.createStaticLayer("Background", tileset, 0, 0);
	const worldLayer = map.createDynamicLayer("Midground", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Foreground", tileset, 0, 0);
    
	
    worldLayer.setCollisionByProperty({ collides: true });
    belowLayer.setCollisionByProperty({ collides: true });
	
	aboveLayer.setDepth(10);
	
	const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
	
    player = this.physics.add
    .sprite(spawnPoint.x, spawnPoint.y, 'thief')
    .setOffset(0, 0)
    .setSize(31, 60);

    skeleton = this.physics.add.sprite(500, 500, 'skeleton');


    
    
    player.setCollideWorldBounds(true);


	

	this.anims.create({
        key: 'thief-walk-back',
        frames: this.anims.generateFrameNumbers('thief', { start: 130, end: 138 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'thief-walk-forward',
        frames: this.anims.generateFrameNumbers('thief', { start: 104, end: 112 }),
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

  

	this.anims.create({
        key: 'skeleton-walk-back',
        frames: this.anims.generateFrameNumbers('skeleton', { start: 130, end: 138 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'skeleton-walk-forward',
        frames: this.anims.generateFrameNumbers('skeleton', { start: 104, end: 112 }),
        frameRate: 10,
        repeat: -1
    });
    
   this.anims.create({
        key: 'skeleton-walk-left',
        frames: this.anims.generateFrameNumbers('skeleton', { start: 117, end: 125 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'skeleton-walk-right',
        frames: this.anims.generateFrameNumbers('skeleton', { start: 143, end: 151 }),
        frameRate: 10,
        repeat: -1
    });
	
    this.physics.add.collider(player, worldLayer);
    this.physics.add.collider(player, belowLayer);
    this.physics.add.collider(player, skeleton);
	
    const camera = this.cameras.main;
    camera.setRoundPixels(true);
	camera.startFollow(player);
    camera.setBounds(0, 0, 1600*2, 1600*2);
    
    this.physics.world.setBounds(0, 0, 1600, 1600);
	
    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys('W,S,A,D');

}	
	

function update ()
{
    const speed = 175;
    const prevVelocity = player.body.velocity.clone();
	
    
    player.body.setVelocity(0);
	
	
	if ((cursors.left.isDown) || (keys.A.isDown)) {
        player.body.setVelocityX(-speed);
    } else if ((cursors.right.isDown) || (keys.D.isDown)) {
        player.body.setVelocityX(speed);
    }
    
    
    if ((cursors.up.isDown) || (keys.W.isDown)) {
        player.body.setVelocityY(-speed);
    } else if ((cursors.down.isDown) || (keys.S.isDown)) {
        player.body.setVelocityY(speed);
    }
    
    player.body.velocity.normalize().scale(speed);
    
    
    if ((cursors.left.isDown) || (keys.A.isDown)) {
      player.anims.play("thief-walk-left", true);
    } else if ((cursors.right.isDown) || (keys.D.isDown)) {
        player.anims.play("thief-walk-right", true);
    } else if ((cursors.up.isDown) || (keys.W.isDown)) {
        player.anims.play("thief-walk-forward", true);
    } else if ((cursors.down.isDown) || (keys.S.isDown)) {
        player.anims.play("thief-walk-back", true);
    } else {
        player.anims.stop();
    }

    //player = this.physics.add
    //.sprite(spawnPoint.x, spawnPoint.y, 'thief')
   // .setOffset(0, 0)
   // .setSize(31, 60);
}


/*function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}*/
