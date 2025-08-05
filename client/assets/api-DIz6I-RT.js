import{c as i}from"./createLucideIcon-DrZpu-0l.js";import{t as s,d}from"./use_queries-B9NbwxMJ.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],h=i("loader-circle",a);function c(n,e){const r={get(l,o){if(typeof o=="string"){const t=[...e,o];return c(n,t)}else if(o===s){if(e.length<1){const t=[n,...e].join(".");throw new Error(`API path is expected to be of the form \`${n}.childComponent.functionName\`. Found: \`${t}\``)}return"_reference/childComponent/"+e.join("/")}else return}};return new Proxy({},r)}const f=()=>c("components",[]),p=d;f();export{h as L,p as a};
