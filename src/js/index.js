//MAIN JS
// require('./modules/common');
import Common from './modules/common'

[Common].forEach(inst => (new inst).init());