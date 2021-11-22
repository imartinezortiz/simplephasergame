import t, {Mensaje} from './mensaje.js'

/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor(params) {
    super({ key: 'boot' });
    this.otrosParams = params;
  }

  init() {
    this.game.estadoCompartido = {
      inventario : [],
      numEstrellas: 0
    };
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/');
    this.load.image('platform', 'sprites/platform.png');
    this.load.image('base', 'sprites/base.png');
    this.load.image('star', 'sprites/star.png');
    this.load.image('player', 'sprites/player.png');
    this.load.json('mensajes', 'mensajes.json')
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    Mensaje.cargaMensajes(this.cache.json.get('mensajes'));
    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 80,
      text: '',
      style: {
        font: '18px caveat',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);
    let text = t('assets_loaded');
    assetText.setText(text);
    setTimeout(()=>{
      this.scene.start('level');
    }, 5000);
    
  }
}