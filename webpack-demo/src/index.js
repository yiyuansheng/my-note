import './css/a.css'
import imgSrc from './images/good girl.jpg'
import './less/a.less'
import './sass/a.sass'
import {a, b} from './js/a.js'
// console.log(a**b); //12的5次方=248832
// console.log(a, b);
let img = new Image();
img.src=imgSrc;
img.onload = function () {
    document.body.appendChild(img)
};
// import $ from 'jquery'
// $('#root').css({
// //     display: "block",
// //     width: "100px",
// //     height: "50px",
// //     background: 'yellow'
// // })