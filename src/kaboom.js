import kaboom from 'kaboom';
import Config from "./config/config.json";

/**
 * initialize kaboom
 */
export const k = kaboom( {
    width:Config.width,
    height:Config.height,
    background: [175, 217, 136]
})
export default k