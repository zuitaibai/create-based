import './assets/css/css_in_js.css';
import './assets/css/less_in_js.less';
import './assets/css/scss_in_js.scss';
import im from './assets/img/fa-angellist.jpg';
import bb from './typescript';

console.group('ts');
console.log(bb);
console.groupEnd();

const img = new Image();
img.src = im;
document.body.append(img);

const element = document.createElement('div');
element.innerHTML = ['Hello', 'webpack', '!!!'].join(' ');
document.body.append(element);

const b = ()=>0;
const obj = { foo: { bar: { baz: 42 } } };
const a = b() ?? 'function b return 0 but not log 0';
console.group('%cEs11: ?? ?.', 'color:red;')
console.info(`%c${a}`, 'text-decoration:underline;font-size:19px;');
console.info(obj?.foo?.bar?.baz);
console.info(obj?.qux?.baz);
console.groupEnd()

class Person{
    
}

(async function f(){
    let b = await new Promise(function (a, b) {
        a(9)
    });
    console.group('async inner')
    console.info(b);
    console.groupEnd()
})();

console.group('arr flat')
console.info([
        [1, 2],
        [3, 'a'],
        8,9
    ].flat());
console.groupEnd()

fetch('').then(res=>res.text()).then(a=>{
    console.group('fetch')
    console.info(`${a.substring(0,50)}...`)
    console.groupEnd()
});