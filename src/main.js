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
    const cercleRouge = await Assets.load('pngegg(1).png');

    // Create the grass background
    const background = new Sprite(grassTexture);
    // new Sprite(cercleRouge);

    app.stage.addChild(background);
    background.width = app.screen.width / 2;
    background.height = app.screen.height;

    const circle = new Graphics().circle(radius + blurSize, radius + blurSize, radius).fill({ color: 0xff0000 });

    circle.filters = [new BlurFilter(blurSize)];

    const circleTarget = new Graphics().circle(965, 795, 10).fill({ color: 'red' });
    app.stage.addChild(circleTarget)
    const textTarget = new Text("Find Koumoul !", {
        fontSize: 50,
        fill: 'white',
        align: 'left',
    })

    textTarget.position.set(50, 200);
    app.stage.addChild(textTarget);

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
        // cercleRouge.position.x = 500
        // cercleRouge.position.y = 100

    });
})();
