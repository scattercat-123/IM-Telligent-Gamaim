import kaboom from "./libraries/kaboom.mjs"
import { Level } from "./utils/level.js"
import { uiManager } from "./utils/UIManager.js"
import { load } from "./utils/loader.js"
import { Player } from "./entities/Player.js"
import { Fish } from "./entities/Fish.js"
import { Spiders } from "./entities/Spiders.js"
import { Axes } from "./entities/Axes.js"
import { Saws } from "./entities/Saws.js"
import { Birds } from "./entities/Birds.js"
import { attachCamera } from "./utils/camera.js"
import { level1Config } from "./content/level1/config.js"
import { level1Layout, level1Mappings } from "./content/level1/level1Layout.js"
import { level2Config } from "./content/level2/config.js"
import { level2Layout, level2Mappings } from "./content/level2/level2Layout.js"
import { level3Config } from "./content/level3/config.js"
import { level3Layout, level3Mappings } from "./content/level3/level3Layout.js"
import { bgSoundManager } from "./utils/BGSoundManager.js"
kaboom({
    width: 1280,
    height: 720,
    letterbox: true
})
load.assets()
load.sounds()
load.fonts()

let bgSound; 

const scenes = {
    menu: () => {
        uiManager.displayMainMenu();

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
            volume: 0 
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
        player.enableHeartPickUp();
        player.enablePassThrough();
        player.update();
        attachCamera(player.gameObj, 0, 200);
        const spiders = new Spiders(
            level1Config.spiderPositions.map((spiderPos) => spiderPos()),
            level1Config.spiderAmplitudes,
            level1Config.spiderTime,
            level1Config.spiderType
        )
        const fish = new Fish(
            level1Config.fishPositions.map(fishPos => fishPos()),
            level1Config.fishRanges,
            "fish"
        )
        fish.setMovementPattern()
        spiders.setMovementPattern()
        spiders.enablePassthrough()
        uiManager.addDarkBg()
        uiManager.displayLivesCount(player)
        uiManager.displayCoinCount(player)

        player.updateLives(uiManager.livesCountUI)
        player.updateCoinCount(uiManager.coinCountUI)

        const waterLevelY = level1Config.waterLevelY || 500; 

        function updateWaterAmbienceVolume() {
            const distance = Math.abs(player.gameObj.pos.y - waterLevelY); 
            const maxDistance = 600; 
            const minDistance = 100; 

            const volume = Math.max(0, Math.min(1, 1 - (distance - minDistance) / (maxDistance - minDistance)));
            WaterAmbience.volume = (volume * 0.4) - 0.1;
        }

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
            volume: 0 
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
        player.enableMobVunerability();
        player.enableHeartPickUp()
        player.enableCoinPickUp();
        player.enablePassThrough();
        player.update();
        const spiders = new Spiders(
            level2Config.spiderPositions.map((spiderPos) => spiderPos()),
            level2Config.spiderAmplitudes,
            level2Config.spiderTime,
            level2Config.spiderType
        )
        spiders.enablePassthrough()
        spiders.setMovementPattern()
        const flame = new Fish(
            level2Config.flamePositions.map(flamePos => flamePos()),
            level2Config.flameRanges,
            "flame"
        )
        flame.setMovementPattern()
        const axes = new Axes(
            level2Config.axesPositions.map(axePos => axePos()),
            level2Config.axesSwingDurations
        )
        axes.setMovementPattern()
        const saws = new Saws(
            level2Config.sawPositions.map(sawPos => sawPos()),
            level2Config.sawSwingRanges
        )
        saws.setMovementPattern()

        attachCamera(player.gameObj, 0, 200);

        uiManager.addDarkBg()
        uiManager.displayLivesCount(player)
        uiManager.displayCoinCount(player)

        player.updateLives(uiManager.livesCountUI)
        player.updateCoinCount(uiManager.coinCountUI)

        const lavaLevelY = level2Config.lavaLevelY || 500;

        function updateLavaAmbienceVolume() {
            const distance = Math.abs(player.gameObj.pos.y - lavaLevelY);
            const maxDistance = 600;
            const minDistance = 100;
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
            volume: 0
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
        player.enableMobVunerability()
        player.enableCoinPickUp();
        player.enablePassThrough();
        player.update();
        const birds = new Birds(
            level3Config.birdPositions.map(birdPos => birdPos()),
            level3Config.birdRanges
        )
        birds.setMovementPattern()
        attachCamera(player.gameObj, 0, 200);
        uiManager.addDarkBg()
        uiManager.displayLivesCount(player)
        uiManager.displayCoinCount(player)

        player.updateLives(uiManager.livesCountUI)
        player.updateCoinCount(uiManager.coinCountUI)

        const rockLevelY = level3Config.rockLevelY || 500; 

        function updateWindAmbienceVolume() {
            const distance = Math.abs(player.gameObj.pos.y - rockLevelY); 
            const maxDistance = 600; 
            const minDistance = 100; 

            const volume = Math.max(0, Math.min(1, 1 - (distance - minDistance) / (maxDistance - minDistance)));
            WindAmbience.volume = (volume * 0.4) + 0.1;
        }
        onUpdate(() => {
            updateWindAmbienceVolume();
        });
    },
    gameover: () => {
        bgSoundManager.pauseAllSounds()
        uiManager.displayGameOverScreen()
        play("gameover")
    },
    end: () => {
        bgSoundManager.pauseAllSounds()
        uiManager.displayEndGameScreen()
        play("gameend")
    }
}
for (const key in scenes) {
    scene(key, scenes[key])
}

go("menu")
                             