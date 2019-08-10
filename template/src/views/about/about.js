{{#if_eq htmlChoice "pug"}}
import '../../components/header/header.js'
{{/if_eq}}
{{#if_eq cssChoice "less"}}
import '../../style/styles.less';
import './about.less';
{{/if_eq}}
{{#if_eq cssChoice "scss"}}
import '../../style/styles.scss';
import './about.scss';
{{/if_eq}}



