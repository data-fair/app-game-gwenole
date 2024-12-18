import { Application, Assets, Sprite, Graphics, SCALE_MODES, Rectangle, BlurFilter } from 'pixi.js';
import { KawaseBlurFilter } from 'pixi-filters';

(async () =>
{
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ resizeTo: window });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    // Inner radius of the circle
    const radius = 100;

    // The blur amount
    const blurSize = 64;

    // Load the grass texture
    const grassTexture = await Assets.load('/carte_france_villes.jpg');

    const replacementmask = await Assets.load('/carte_france_villes.jpg');

    // Create the grass background
    const background = new Sprite(grassTexture);

    app.stage.addChild(background);
    background.width = app.screen.width;
    background.height = app.screen.height;
    // background.filters = [new KawaseBlurFilter()];

    const circle = new Graphics().circle(radius + blurSize, radius + blurSize, radius).fill({ id: '/carte_france_villes.jpg' });

    circle.filters = [new KawaseBlurFilter()];

    const bounds = new Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
    const texture = app.renderer.generateTexture({
        target: circle,
        style: { scaleMode: SCALE_MODES.NEAREST },
        resolution: 1,
        frame: bounds,
    });
    const focus = new Sprite(texture);
    focus.filters = [new KawaseBlurFilter()];

    app.stage.addChild(focus);

    background.mask = focus;

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointermove', (event) =>
    {
        focus.position.x = event.global.x - focus.width / 2;
        focus.position.y = event.global.y - focus.height / 2;
    });
})();
