export class Fish {
    constructor(positions, ranges, type) {
        this.ranges = ranges
        this.projectiles = []
        const animMap = {
            "fish": "swim",
            "flame": "burn"
        }
        for (const position of positions) {
            this.projectiles.push(
                add([
                    sprite(type, { anim: animMap[type] }),
                    area({ shape: new Rect(vec2(0), 12, 12) }),
                    anchor("center"),
                    pos(position),
                    scale(4),
                    rotate(type === "fish" ? 90 : 0),
                    state("launch", ["launch", "rotate", "fall"]),
                    offscreen(),
                    "fish",
                ])
            )
        }
    }

    setMovementPattern() {
        for (const [index, projectiles] of this.projectiles.entries()) {
            const launch = projectiles.onStateEnter("launch", async () => {
                projectiles.flipX = false;
                await tween(
                    projectiles.pos.y,  
                    projectiles.pos.y - this.ranges[index],
                    2,
                    (posY) => (projectiles.pos.y = posY),
                    easings.easeOutSine
                );
                projectiles.enterState("fall");
            });

            const fall = projectiles.onStateEnter("fall", async () => {
                projectiles.flipX = true;
                await tween(
                    projectiles.pos.y,
                    projectiles.pos.y + this.ranges[index],
                    2,
                    (posY) => (projectiles.pos.y = posY),
                    easings.easeOutSine
                );
                projectiles.enterState("launch");
            });
            onSceneLeave(() => {
                launch.cancel()
                fall.cancel()
            })

        }

    }
}