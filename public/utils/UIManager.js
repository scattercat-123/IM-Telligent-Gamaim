class UIManager {
    displayBlinkingUIMessage(content, position) {
        const message = add([
            text(content, { size: 30, font: "Round" }),
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
                (opacity) => (message.opacity = opacity),
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

        this.displayBlinkingUIMessage(
            "Press [ Enter ] and go to controls before starting the game",
            vec2(center().x, center().y + 100)
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
            sprite("space"),
            pos(-200, 0)
        ])
        controlPrompts.add([
            text("Jump", { font: "Round", size: 32}),
            pos(-190, 100)
        ])
        controlPrompts.add([
            text("Move", { font: "Round", size: 32}),
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
}

export const uiManager = new UIManager();
