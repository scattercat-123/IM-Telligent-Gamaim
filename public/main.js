import kaboom from "./libraries/kaboom.mjs"
import { Level } from "./utils/level.js"
import { uiManager } from "./utils/UIManager.js"
import { load } from "./utils/loader.js"
import { Player } from "./entities/Player.js"
import { attachCamera } from "./utils/camera.js"
import { level1Config } from "./content/level1/config.js"
import { level1Layout, level1Mappings } from "./content/level1/level1Layout.js"


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
            level1Config.playerStartPosX,
            level1Config.playerStartPosY,
            level1Config.playerSpeed,
            level1Config.jumpForce,
            level1Config.nbLives,
            1,
            false 
          )
          player.enablePassThrough()
          player.update()
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