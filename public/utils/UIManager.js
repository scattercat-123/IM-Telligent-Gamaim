class UIManager {
    displayLivesCount(player) {
        this.livesCountUI = add([
            text("", {
                font: "Round",
                size: 50,
            }),
            fixed(),
            pos(70, 75),
        ])

        this.livesCountUI.add([
            sprite("heart-icon"),
            pos(-60, -5),
            scale(0.8),
            fixed(),
        ])
    }

    displayCoinCount(player) {
        this.coinCountUI = add([
            text("", {
                font: "Round",
                size: 50
            }),

            {
                fullCoinCount: get("coin", { recursive: true }).length
            },
            fixed(),
            pos(70, 16)
        ])
        this.coinCountUI.add([
            sprite("coin-icon"),
            pos(-60, 0),
            fixed(),
            scale(3)
        ])
    }

    displayBlinkingUIMessage(content, position) {
        const message = add([
            text(content, { size: 35, font: "Round" }),
            area(),
            anchor("center"),
            pos(position),
            opacity(),
            state("flash-up", ["flash-up", "flash-down"]),
        ]);

        message.onStateEnter("flash-up", async () => {
            await tween(
                message.opacity,
                0,
                0.5,
                (nextOpacityValue) => (message.opacity = nextOpacityValue),
                easings.linear
            );
            message.enterState("flash-down");
        });

        message.onStateEnter("flash-down", async () => {
            await tween(
                message.opacity,
                1,
                0.5,
                (opacity) => (message.opacity = opacity),
                easings.linear
            );
            message.enterState("flash-up");
        });
    }
    displayLevelMenu() {
        add([sprite("forest-background"), scale(4)]);
        add([
            sprite("logo"),
            fixed(),
            area(),
            anchor("center"),
            pos(center().x, center().y - 200),
            scale(6),
        ]);
        this.displayBlinkingUIMessage(
            "Press 1 / 2 / 3 for Level 1 / 2 / 3",
            vec2(center().x, center().y)
        )
        onKeyPress("enter", () => {
            play("confirm-ui"),
                go("controls")
        })
    }
    displayMainMenu() {
        add([sprite("forest-background"), scale(4)]);
        add([
            sprite("logo"),
            fixed(),
            area(),
            anchor("center"),
            pos(center().x, center().y - 200),
            scale(6),
        ]);
        add([
            text("Music phonk made by Atharv", { size: 25, font: "Round" }),
            area(),
            anchor("center"),
            pos(center().x + 340, center().y + 340),
        ]);
        add([
            text("Can you notice IM-Teligent in this phonk?", { size: 20, font: "Round" }),
            area(),
            anchor("center"),
            pos(center().x - 340, center().y + 340),
        ]);

        this.displayBlinkingUIMessage(
            "Press [ Enter ] x2 and go to controls before starting the game",
            vec2(center().x, center().y)
        )
        onKeyPress("enter", () => {
            play("confirm-ui"),
                go("controls")
        })
    }
    displayControlsMenu() {
        add([sprite("forest-background"), scale(4)]);
        add([
            text("Controls", { size: 45, font: "Round" }),
            area(),
            anchor("center"),
            pos(center().x, center().y - 30),
        ])
        add([
            text("Gameplay", { size: 45, font: "Round" }),
            area(),
            anchor("center"),
            pos(center().x, center().y - 300),
        ])
        const controlPrompts = add([
            pos(center().x + 30, center().y)
        ])
        //The controls all images i think. I got png's from some site
        controlPrompts.add([
            sprite("up"),
            pos(0, 0)
        ])
        controlPrompts.add([
            sprite("W"),
            pos(-200, 26)
        ])
        controlPrompts.add([
            sprite("down"),
            pos(0, 80)
        ])
        controlPrompts.add([
            sprite("left"),
            pos(-80, 80)
        ])
        controlPrompts.add([
            sprite("right"),
            pos(80, 80)
        ])
        controlPrompts.add([
            sprite("T"),
            pos(-356, 80)
        ])
        controlPrompts.add([
            sprite("R"),
            pos(196, 80)
        ])
        controlPrompts.add([
            sprite("space"),
            pos(-200, 93)
        ])
        controlPrompts.add([
            text("Jump", { font: "Round", size: 32 }),
            pos(-190, 180)
        ])
        controlPrompts.add([
            text("Start Again", { font: "Round", size: 32 }),
            pos(146, 180)
        ])
        controlPrompts.add([
            text("Fly Mode!", { font: "Round", size: 32 }),
            pos(-390, 180)
        ])
        controlPrompts.add([
            text("Move", { font: "Round", size: 32 }),
            pos(10, 180)
        ])
        controlPrompts.add([
            text("1. Objective: The player must reach the end of the level by overcoming enemies & collecting coins to advance.", { font: "Round", size: 20 }),
            pos(-660, -260)
        ])
        controlPrompts.add([
            text("2. Lives: Each player starts with a set number of lives, which decrease upon death or mob damage.", { font: "Round", size: 20 }),
            pos(-660, -230)
        ])
        controlPrompts.add([
            text("3. Pickups: Collect coins, hearts, and other items to boost health, score, or abilities..", { font: "Round", size: 20 }),
            pos(-660, -200)
        ])
        controlPrompts.add([
            text("4. Movement: Use the keyboard to move (controls below) and perform special actions like attacking or evading.", { font: "Round", size: 20 }),
            pos(-660, -170)
        ])
        controlPrompts.add([
            text("5. Winning Condition: Navigate all levels or achieve the highest score without finishing all lives.", { font: "Round", size: 20 }),
            pos(-660, -140)
        ])
        this.displayBlinkingUIMessage(
            "Press [ Enter ] to Start Game",
            vec2(center().x, center().y + 300)
        )

        onKeyPress("enter", () => {
            play("confirm-ui"),
                go("level")
        })
    }
    displayGameOverScreen() {
        add([rect(1280, 720), color(0, 0, 0)])
        add([
            text("Game Over!", { size: 50, font: "Round" }),
            area(),
            anchor("center"),
            pos(center()),
        ])

        this.displayBlinkingUIMessage(
            "Press [ Enter ] to Start Game",
            vec2(center().x, center().y + 100)
        )

        onKeyPress("enter", () => {
            play("confirm-ui")
            go("menu")
        })
    }
    displayEndGameScreen() {
        add([rect(1280, 720), color(0, 0, 0)])
        add([
            text("You Won! Thanks for Playing.", { size: 50, font: "Round" }),
            area(),
            anchor("center"),
            pos(center()),
        ])

        this.displayBlinkingUIMessage(
            "Press [ Enter ] to Play Again",
            vec2(center().x, center().y + 100)
        )

        onKeyPress("enter", () => {
            play("confirm-ui")
            go("menu")
        })
    }
    addDarkBg() {
        add([rect(270, 130), color(Color.fromHex('#000000')), fixed()])
    }
}

export const uiManager = new UIManager();
