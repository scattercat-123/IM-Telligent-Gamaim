import kaboom from "./libraries/kaboom.mjs"
import { Level } from "./utils/level.js"
import { uiManager } from "./utils/UIManager.js"
import { load } from "./utils/loader.js"
import { Player } from "./entities/Player.js"
import { Fish } from "./entities/Fish.js"
import { Spiders } from "./entities/Spiders.js"
import { attachCamera } from "./utils/camera.js"
import { level1Config } from "./content/level1/config.js"
import { level1Layout, level1Mappings } from "./content/level1/level1Layout.js"
import { level2Config } from "./content/level2/config.js"
import { level2Layout, level2Mappings } from "./content/level2/level2Layout.js"
import { level3Config } from "./content/level3/config.js"
import { level3Layout, level3Mappings } from "./content/level3/level3Layout.js"


kaboom({
    width: 1280,
    height: 720,
    letterbox: true
})
load.assets()
load.sounds()
load.fonts()

let bgSound; // Declare bgSound globally

const scenes = {
    menu: () => {
        uiManager.displayMainMenu();

        // Start bgSound only if it hasn't been started or is paused
        if (!bgSound) {
            bgSound = play("bgmusic", {
                loop: true,
                volume: 0.1,
            });
        } else if (bgSound.paused) {
            bgSound.paused = false;
        }
    },
    controls: () => {
        uiManager.displayControlsMenu();
        if (bgSound && bgSound.paused) {
            bgSound.paused = false;
        }

        onSceneLeave(() => {
            if (bgSound) {
                bgSound.paused = true;
            }
        });
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
        player.enableMobVunerability();
        player.enableCoinPickUp();
        player.enablePassThrough();
        player.update();
        attachCamera(player.gameObj, 0, 200);
        const spiders = new Spiders(
            level1Config.spiderPositions.map((spiderPos) => spiderPos()),
            level1Config.spiderAmplitudes,
            level1Config.spiderSpeeds,
            level1Config.spiderType
        )
        const fish = new Fish(
            level1Config.fishPositions.map(fishPos => fishPos()),
            level1Config.fishAmplitudes,
            level1Config.fishType
        )
        fish.setMovementPattern()
        spiders.setMovementPattern()
        spiders.enablePassthrough()
        uiManager.addDarkBg()
        uiManager.displayLivesCount(player)
        uiManager.displayCoinCount(player)

        player.updateLives(uiManager.livesCountUI)
        player.updateCoinCount(uiManager.coinCountUI)
        // Update the water ambience volume based on the player's distance from the water
        const waterLevelY = level1Config.waterLevelY || 500; // Example Y-coordinate for water level, adjust as needed

        // Function to calculate and update volume based on distance
        function updateWaterAmbienceVolume() {
            const distance = Math.abs(player.gameObj.pos.y - waterLevelY); // Get vertical distance from water
            const maxDistance = 600; // Maximum distance at which the sound volume is 0
            const minDistance = 100; // Minimum distance at which the sound volume is full (1)

            // Adjust the volume change to be more noticeable
            const volume = Math.max(0, Math.min(1, 1 - (distance - minDistance) / (maxDistance - minDistance)));
            WaterAmbience.volume = (volume * 0.4) - 0.1;
        }

        // Update the volume every frame
        onUpdate(() => {
            updateWaterAmbienceVolume();
        });
        onSceneLeave(() => {
            WaterAmbience.paused = true
        }
        )
    },
    2: () => {
        const lavaAmbience = play("lava-ambience", {
            loop: true,
            volume: 0 // Start with zero volume
        });

        setGravity(1440);
        const level2 = new Level();
        level2.drawBackground("castle-background");
        level2.drawMapLayout(level2Layout, level2Mappings);

        level2.drawWaves("lava", "wave");

        const player = new Player(
            level2Config.playerStartPosX,
            level2Config.playerStartPosY,
            level2Config.playerSpeed,
            level2Config.jumpForce,
            level2Config.nbLives,
            2,
            false
        );
        player.enableCoinPickUp();
        player.enablePassThrough();
        player.update();
        attachCamera(player.gameObj, 0, 200);

        uiManager.addDarkBg()
        uiManager.displayLivesCount(player)
        uiManager.displayCoinCount(player)

        player.updateLives(uiManager.livesCountUI)
        player.updateCoinCount(uiManager.coinCountUI)
        // Update the water ambience volume based on the player's distance from the water
        const lavaLevelY = level2Config.lavaLevelY || 500; // Example Y-coordinate for water level, adjust as needed

        // Function to calculate and update volume based on distance
        function updateLavaAmbienceVolume() {
            const distance = Math.abs(player.gameObj.pos.y - lavaLevelY); // Get vertical distance from water
            const maxDistance = 600; // Maximum distance at which the sound volume is 0
            const minDistance = 100; // Minimum distance at which the sound volume is full (1)

            // Adjust the volume change to be more noticeable
            const volume = Math.max(0, Math.min(1, 1 - (distance - minDistance) / (maxDistance - minDistance)));
            lavaAmbience.volume = (volume * 0.4) + 0.1;
        }
        onUpdate(() => {
            updateLavaAmbienceVolume();
        });
    },
    3: () => {
        const WindAmbience = play("strong-wind", {
            loop: true,
            volume: 0 // Start with zero volume
        });

        setGravity(1440);
        const level3 = new Level();
        level3.drawBackground("sky-background-0");
        level3.drawBackground("sky-background-1");
        level3.drawBackground("sky-background-2");
        level3.drawMapLayout(level3Layout, level3Mappings);

        level3.drawWaves("clouds", "wave");

        const player = new Player(
            level3Config.playerStartPosX,
            level3Config.playerStartPosY,
            level3Config.playerSpeed,
            level3Config.jumpForce,
            level3Config.nbLives,
            3,
            true
        );
        player.enableCoinPickUp();
        player.enablePassThrough();
        player.update();
        attachCamera(player.gameObj, 0, 200);
        uiManager.addDarkBg()
        uiManager.displayLivesCount(player)
        uiManager.displayCoinCount(player)

        player.updateLives(uiManager.livesCountUI)
        player.updateCoinCount(uiManager.coinCountUI)
        // Update the water ambience volume based on the player's distance from the water
        const rockLevelY = level3Config.rockLevelY || 500; // Example Y-coordinate for water level, adjust as needed

        // Function to calculate and update volume based on distance
        function updateWindAmbienceVolume() {
            const distance = Math.abs(player.gameObj.pos.y - rockLevelY); // Get vertical distance from water
            const maxDistance = 600; // Maximum distance at which the sound volume is 0
            const minDistance = 100; // Minimum distance at which the sound volume is full (1)

            // Adjust the volume change to be more noticeable
            const volume = Math.max(0, Math.min(1, 1 - (distance - minDistance) / (maxDistance - minDistance)));
            WindAmbience.volume = (volume * 0.4) + 0.1;
        }
        onUpdate(() => {
            updateWindAmbienceVolume();
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
