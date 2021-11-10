export const DEFAULT_LANGUAGE = 'es';

export class Mensaje {
  static language = 'es';
  static mensajes = {};

  constructor(key, translations) {
    this.key = key;
    this.translations = translations;
  }

  get mensaje() {
    return this.translations[Mensaje.language];
  }

  /**
   * Carga una lista de objetos simples obtenidos con JSON.parse() en objetos de esta clase.
   * 
   * @param {Object[]} plainObjects 
   */
  static cargaMensajes(plainObjects) {
    this.mensajes = {};
    plainObjects.forEach(m => {
      let mensaje = Mensaje.fromPlainObject(m);
      Mensaje.mensajes[m.key] = mensaje;
    })
  }

  /**
   * Convierte un objeto simple en una instancia de esta clase.
   * 
   * @param {Object} o
   */
  static fromPlainObject(o) {
    return new Mensaje(o.key, o.translations)
  }
}

const t = (key) => {
  return Mensaje.mensajes[key].mensaje;
}
export default t;