// import _ from 'lodash';
{{#if_eq htmlChoice "pug"}}
import '../../components/header/header.js';
{{/if_eq}}
{{#if_eq cssChoice "less"}}
import '../../style/styles.less';
import './index.less';
{{/if_eq}}
{{#if_eq cssChoice "scss"}}
import '../../style/styles.scss';
import './index.scss';
{{/if_eq}}


// function component() {


//   return element;
// }

// let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
// document.body.appendChild(element);


// if (module.hot) {
//   module.hot.accept('./print.js', function() {
//     console.log('Accepting the updated printMe module!');
//     document.body.removeChild(element);
//     element = component(); // 重新渲染页面后，component 更新 click 事件处理
//     document.body.appendChild(element);
//   })
// }