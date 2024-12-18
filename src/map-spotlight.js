import { Application, Assets, Sprite, Graphics, SCALE_MODES, Rectangle, BlurFilter, Text } from 'pixi.js';

(async () => {
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ resizeTo: window });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    // Inner radius of the circle
    const radius = 100;

    // The blur amount
    const blurSize = 32;

    // Load the grass texture
    const grassTexture = await Assets.load('/saint avé map.png');
    // const cercleRouge = await Assets.load('/pngegg(1).png');

    // Create the grass background
    const background = new Sprite(grassTexture);
    // new Sprite(cercleRouge);

    app.stage.addChild(background);
    background.width = app.screen.width / 2;
    background.height = app.screen.height;

    const circle = new Graphics().circle(radius + blurSize, radius + blurSize, radius).fill({ color: 0xff0000 });

    circle.filters = [new BlurFilter(blurSize)];

    const circleTarget = new Graphics().circle(0, 0, 10).fill({ color: 'red' });
    circleTarget.visible = false
    app.stage.addChild(circleTarget)
    const textTarget = new Text("", {
        fontSize: 50,
        fill: 'white',
        align: 'left',
    })
    textTarget.position.set(50, 200);
    app.stage.addChild(textTarget);

    const textBravo = new Text("Bravo !!", {
        fontSize: 500,
        fill: 'blue',
        align: 'left',
    })

    textBravo.position.set(50, 80);
    app.stage.addChild(textBravo);
    textBravo.visible = false

    const bounds = new Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
    const texture = app.renderer.generateTexture({
        target: circle,
        style: { scaleMode: SCALE_MODES.NEAREST },
        resolution: 1,
        frame: bounds,
    });
    const focus = new Sprite(texture);

    app.stage.addChild(focus);
    

    background.mask = focus;
    circleTarget.mask = focus

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointermove', (event) => {
        focus.position.x = event.global.x - focus.width / 2;
        focus.position.y = event.global.y - focus.height / 2;
        background.position.x = 500
        
        const diffX = Math.abs(circleTarget.position.x - event.global.x)
        const diffY = Math.abs(circleTarget.position.y - event.global.y)

        if (diffX < 50 && diffY < 50) {
            index = index + 1
            if (index === data.length) {
                textTarget.visible = false
                textBravo.visible = true
            } else {
                showData()
            }
             
             
             
        }
    });

    let index = 0
    const data = [{name: 'Bureau Koumoul', x: 967, y: 750}, {name: 'Feten Hont', x: 1165, y: 440}, {name: 'Le Pressoir', x:900, y:525}, {name: 'BARRAVEL', x: 1052, y: 797}]

    function showData () {
        const item = data[index]
        textTarget.text = "Cherche " + item.name
        circleTarget.visible = true
        circleTarget.position.x = item.x
        circleTarget.position.y = item.y
    }
    showData()
})();
