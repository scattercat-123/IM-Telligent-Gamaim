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
            pos(70, 16 )
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
            pos(center().x, center().y - 200),
        ])
        const controlPrompts = add([
            pos(center().x + 30, center().y)
        ])
        //The controls all images i think. I got png's from some site
        controlPrompts.add([
            sprite("up"),
            pos(0, -80)
        ])
        controlPrompts.add([
            sprite("down"),
        ])
        controlPrompts.add([
            sprite("left"),
            pos(-80, 0)
        ])
        controlPrompts.add([
            sprite("right"),
            pos(80, 0)
        ])
        controlPrompts.add([
            sprite("T"),
            pos(-406, -80)
        ])
        controlPrompts.add([
            sprite("space"),
            pos(-200, 0)
        ])
        controlPrompts.add([
            text("Jump", { font: "Round", size: 32 }),
            pos(-190, 100)
        ])
        controlPrompts.add([
            text("- Toggle Fly Mode!", { font: "Round", size: 32 }),
            pos(-310, -44)
        ])
        controlPrompts.add([
            text("Move", { font: "Round", size: 32 }),
            pos(10, 100)
        ])

        this.displayBlinkingUIMessage(
            "Press [ Enter ] to Start Game",
            vec2(center().x, center().y + 300)
        )

        onKeyPress("enter", () => {
            play("confirm-ui"),
                go(1)
        })
    }
    addDarkBg(){
        add([rect(270, 130), color(Color.fromHex('#000000')), fixed()]  )
    }
}

export const uiManager = new UIManager();
