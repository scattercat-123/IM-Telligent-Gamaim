import { level1Layout, level1Mappings } from "./content/level1/level1Layout.js"
import kaboom from "./libraries/kaboom.mjs"
import { Level } from "./utils/level.js"
import { uiManager } from "./utils/UIManager.js"
import { load } from "./utils/loader.js"
import { Player } from "./entities/Player.js"
import { attachCamera } from "./utils/camera.js"


kaboom({
    width: 1280,
    height: 720,
    letterbox: true
})

load.assets()
load.sounds()
load.fonts()

const scenes = {
    menu: () => {
        uiManager.displayMainMenu()
    },
    controls: () => {
        uiManager.displayControlsMenu()
    },
    1: () => {
        setGravity(1440)
        const level1 = new Level()
        level1.drawBackground("forest-background")
        level1.drawMapLayout(level1Layout, level1Mappings)

        level1.drawWaves("water", "wave")

        const player = new Player(
            1500,
            100,
            400,
            650,
            3,
            1,
            false 
          )
          attachCamera(player.gameObj, 0, 200)
    },
    gameover: () => {

    },
    end: () => {

    }
}
for (const key in scenes) {
    scene(key, scenes[key])
}

go("menu")