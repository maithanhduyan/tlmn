var config = {
    type: Phaser.AUTO,
    scaleMode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game-container',
    width: 1024,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.atlas('cards', '/assets/atlas/cards.png', '/assets/atlas/cards.json');
}

function create ()
{
    //  Create a stack of random cards
    var frames = this.textures.get('cards').getFrameNames();


    var center_desk ={
        width : game.config.width/2,
        height: game.config.height/2
    }

    for (var i = 0; i < 64; i++)
    {
        var image = this.add.image(center_desk.width, center_desk.height, 'cards', Phaser.Math.RND.pick(frames)).setInteractive().setScale(0.8);
        this.input.setDraggable(image);

        center_desk.width += 0.1;
        center_desk.height += 0.1;
    }

    this.input.on('dragstart', function (pointer, gameObject) {
        this.children.bringToTop(gameObject);
    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });
   
}

function update (){

}
