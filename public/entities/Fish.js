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
                    sprite(`fish-${type}`, { anim: animMap[type] }),
                    area({ shape: new Rect(vec2(0), 12, 12) }),
                    anchor("center"),
                    pos(position),
                    scale(4),
                    rotate(90),
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
                if (projectiles.currAnim !== "swim") projectiles.play("swim");
                projectiles.flipY = false;
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
                if (projectiles.currAnim !== "swim") projectiles.play("swim");
                projectiles.flipY = true;
                await tween(
                    projectiles.pos.y,
                    projectiles.pos.y + this.ranges[index],
                    2,
                    (posY) => (projectiles.pos.y = posY),
                    easings.easeOutSine
                );
                projectiles.enterState("launch");
            });
            
                }

            }
    }
    