import Boot from './boot.js';
import End from './end.js';
import Platform from './platform.js';
import Level from './scene.js';
import {Mensaje} from './mensaje.js';


let GAME = null;

const languageEl = document.getElementById('language');
languageEl.addEventListener('change', (event) => {
    Mensaje.language = event.target.value;
    GAME.events.on('destroy', _ => {
        initGame();
    })
    GAME.destroy(true);
});

const sceneFactory = (params, sceneClass) => {
    return function() {
        return new sceneClass(params)
    }
}

const initGame = () => {
    /**
     * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
     * la clase Game de Phaser, encargada de crear e iniciar el juego.
     */
    let config = {
        type: Phaser.AUTO,
        width:  1000,
        height: 500,
        scale: {
            // mode: Phaser.Scale.FIT,  
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
        },
        pixelArt: true,
        scene: [sceneFactory({"hola":"mundo"}, Boot), Level, End],
        physics: { 
            default: 'arcade', 
            arcade: { 
                gravity: { y: 400 }, 
                debug: false 
            } 
        },
        parent: 'game'
    };

    GAME = new Phaser.Game(config);
    console.dir(GAME.scene.scenes[0])
}

const WebFontConfig = {
    google: {
        families: [ 'Caveat' ]
    },
    active : () => {
        initGame();
    }
};

/* Opción A: todo cargado dinámicamente */
var script = document.createElement('script');
script.onload = function () {
    WebFont.load(WebFontConfig);    
};
script.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';

document.head.appendChild(script);

/* Opción B: Sólo cargada la fuente dinámicamente
  Hay que añadir <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script> al html antes de cargar game.js

  WebFont.load(WebFontConfig);    
*/
