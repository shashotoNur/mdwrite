import{r as e,_ as r,T as f,j as t}from"./index-o4stW1HQ.js";const x=e.lazy(()=>r(()=>import("./index-DGTfLgtT.js"),__vite__mapDeps([0,1,2,3,4]))),p=e.lazy(()=>r(()=>import("./index-_8nypOqf.js"),__vite__mapDeps([5,1,2,3,6]))),w=e.lazy(()=>r(()=>import("./index-KFH2V6YW.js"),__vite__mapDeps([7,1,2,8]))),V=()=>{const[o,u]=e.useState(!0),[m,_]=e.useState(!1),[i,E]=e.useState(!0),l=e.useRef(null),c=e.useRef(null),{theme:n}=e.useContext(f);e.useEffect(()=>{const s=()=>{_(window.innerWidth<768)};return window.addEventListener("resize",s),s(),()=>window.removeEventListener("resize",s)},[]);const a=()=>u(!o),v=()=>{const s=l.current,d=c.current;if(!s||!d)return;(i?d:s).scrollIntoView(!0),E(!i)};return t.jsxs("div",{className:"main",children:[m&&t.jsx("button",{className:`floating-button btn ${n}`,onClick:v,children:i?"↓":"↑"}),o&&t.jsx(p,{closeList:a}),t.jsx("div",{className:`editor-sidebar ${n}`,ref:l,children:t.jsx(x,{toggleListVisibility:a})}),t.jsx("div",{className:`preview-pane ${n}`,ref:c,children:t.jsx(w,{})})]})};export{V as default};
//# sourceMappingURL=index-P_EpKbPW.js.map
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-DGTfLgtT.js","assets/index-o4stW1HQ.js","assets/index-Ckjufytb.css","assets/exportMarkdown-xpnRHa0w.js","assets/index-9CejAM6z.css","assets/index-_8nypOqf.js","assets/index-i417lqLU.css","assets/index-KFH2V6YW.js","assets/index-smsGB3CU.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}