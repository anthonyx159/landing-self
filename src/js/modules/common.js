//COMMON JS - Importa todas las librerias que necesites definidas en el package.json
window.$ = window.jQuery = require('jquery');
require('jquery-validation');
window.swal = require('sweetalert2');
require('lazyload');
lazyload();

import 'normalize.css'
import Drawer from '../components/drawer';

export default class Common {

    init() {
        (new Drawer).init();
    }
}
