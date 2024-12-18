import { Graphics } from 'pixi.js';

export function addGround(app)
{
    const width = app.screen.width;
    const groundHeight = 20;
    const groundY = app.screen.height;
    const ground = new Graphics()
        .rect(0, groundY - groundHeight, width, groundHeight)
        .fill({ color: 0xdddddd });
    
    app.stage.addChild(ground);

    const trackHeight = 15;
const plankWidth = 50;
const plankHeight = trackHeight / 2;
const plankGap = 20;
const plankCount = width / (plankWidth + plankGap) + 1;
const plankY = groundY - groundHeight;
const planks = [];

for (let index = 0; index < plankCount; index++)
{
    const plank = new Graphics()
        .rect(0, plankY - plankHeight, plankWidth, plankHeight)
        .fill({ color: 0x241811 });

    plank.x = index * (plankWidth + plankGap);
    app.stage.addChild(plank);
    planks.push(plank);
}

app.ticker.add((time) =>
    {
        const dx = time.deltaTime * 6;
    
        planks.forEach((plank) =>
        {
            plank.x -= dx;
    
            if (plank.x <= -(plankWidth + plankGap))
            {
                plank.x += plankCount * (plankWidth + plankGap) + plankGap * 1.5;
            }
        });
    });

    const railHeight = trackHeight / 2;
const railY = plankY - plankHeight;
const rail = new Graphics()
    .rect(0, railY - railHeight, width, railHeight)
    .fill({ color: 0x5c5c5c });

app.stage.addChild(rail);
}
