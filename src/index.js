import './assets/css/css_in_js.css';
import './assets/css/less_in_js.less';
import './assets/css/scss_in_js.scss';

import im from './assets/img/fa-angellist.jpg';

const img = new Image();
img.src = im;
document.body.append(img);

const element = document.createElement('div');
element.innerHTML = ['Hello', 'webpack', '!!!'].join(' ');
document.body.append(element);


const f = async () => {
    let b = await new Promise(function (a, b) {
        a(9)
    });
    console.log(b);
    console.log([
        [1, 2],
        [3, 4],
        8,9
    ].flat());
}
f();
fetch('').then(res=>res.text()).then(a=>console.log(a));

function getIPAdress() {
    let interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return '';
}
