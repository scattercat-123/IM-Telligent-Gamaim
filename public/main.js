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
        const bgSound = play("bgmusic", {
            loop : true,
            volume : 0.3
        })
        onSceneLeave(() =>{
            bgSound.paused = true
         }
         )
    },
    controls: () => {
        uiManager.displayControlsMenu()
        const bgSound = play("bgmusic", {
            loop : true,
            volume : 0.3
        })
        onSceneLeave(() =>{
            bgSound.paused = true
         }
         )

    },
    1: () => {
        const WaterAmbience = play("water-ambience", {
            loop: true,
            volume: 0 // Start with zero volume
        });
        
        setGravity(1440);
        const level1 = new Level();
        level1.drawBackground("forest-background");
        level1.drawMapLayout(level1Layout, level1Mappings);
    
        level1.drawWaves("water", "wave");
    
        const player = new Player(
            level1Config.playerStartPosX,
            level1Config.playerStartPosY,
            level1Config.playerSpeed,
            level1Config.jumpForce,
            level1Config.nbLives,
            1,
            false 
        );
        player.enableCoinPickUp();
        player.enablePassThrough();
        player.update();
        attachCamera(player.gameObj, 0, 200);
    
        // Update the water ambience volume based on the player's distance from the water
        const waterLevelY = level1Config.waterLevelY || 500; // Example Y-coordinate for water level, adjust as needed
    
        // Function to calculate and update volume based on distance
        function updateWaterAmbienceVolume() {
            const distance = Math.abs(player.gameObj.pos.y - waterLevelY); // Get vertical distance from water
            const maxDistance = 600; // Maximum distance at which the sound volume is 0
            const minDistance = 100; // Minimum distance at which the sound volume is full (1)
        
            // Adjust the volume change to be more noticeable
            const volume = Math.max(0, Math.min(1, 1 - (distance - minDistance) / (maxDistance - minDistance)));
            WaterAmbience.volume = (volume * 0.4) - 0.08;
        }
    
        // Update the volume every frame
        onUpdate(() => {
            updateWaterAmbienceVolume();
        });
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

                  