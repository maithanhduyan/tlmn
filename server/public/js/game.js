const socket = io();
let screen_width = document.documentElement.clientWidth;
let screen_height = document.documentElement.clientHeight;

class Desk extends Phaser.Scene {
    constructor() {
        super({
            key: 'Desk'
        });
    }

    preload() {
        // Tải tài nguyên cần thiết
        this.load.atlas('cards', '/assets/atlas/cards.png', '/assets/atlas/cards.json');
    }

    create() {
        // Khởi tạo các đối tượng trong game
        let frames = this.textures.get('cards').getFrameNames();

        const deck = [];
       
        let center_desk = {
            width: game.config.width / 2,
            height: game.config.height / 2
        }

        for (let i = 0; i < frames.length; i++) {
            let card = new Card(this, center_desk.width, center_desk.height, 'cards', frames[i]);
            this.input.setDraggable(card);
            center_desk.width += 0.1;
            center_desk.height += 0.1;
            deck[i] = card;
            console.log(card.frame.name);
            // Sự kiện click chuột trên lá bài
            card.on('pointerdown', (pointer) => {
                socket.emit('shuffleCards');
                console.log('Selected card:', card.frame.name);
            });
        }

        this.input.on('dragstart', function (pointer, gameObject) {
            this.children.bringToTop(gameObject);
        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }

    update() {
        // Xử lý các thao tác cập nhật trong game
    }
}

class Card extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.setScale(0.6);
        this.setInteractive();
        scene.add.existing(this);
    }
}

let config = {
    type: Phaser.AUTO,
    scaleMode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.RESIZE,
    backgroundColor: 0x610007,
    parent: 'game-container',
    // width: 1024,
    // height: 600,
    scene: [Desk],
};

game = new Phaser.Game(config);

socket.emit('shuffleCards');
socket.on('cardsShuffled', (cards) => {
    for (let card of cards) {
        console.log(card);
    }
});