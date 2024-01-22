import{_ as c,u as d,M as f,g as u,L as y}from"./index-MhRWvM9V.js";import{j as m}from"./plugins-zOuqcpMR.js";import{r as s}from"./ace-ERQk7LBk.js";const E=s.lazy(()=>c(()=>import("./index-dZsZLlwX.js"),__vite__mapDeps([0,1,2,3,4,5]))),j=()=>{const{entryName:n}=d(),{handleChange:o,filenameChange:i,timestampChange:l}=s.useContext(f);return s.useEffect(()=>{const r=Object.entries(localStorage).filter(([e])=>{const a=e.split(" :~~: ")[0],p=u(new Date(e.replace("Entry: ","").split(" :~~: ")[1]));return(a+"@"+p).startsWith(`Entry: ${n}`)}).map(([e,a])=>({filename:e.replace("Entry: ","").split(" :~~: ")[0],markdown:a,timestamp:new Date(e.replace("Entry: ","").split(" :~~: ")[1])}));r.sort((e,a)=>a.timestamp.getTime()-e.timestamp.getTime());const t=r.length>0?r[0]:{filename:n??"untitled",markdown:"",timestamp:new Date};i(t.filename),o(t.markdown,t.timestamp,t.filename),l(t.timestamp)},[n]),m.jsx(s.Suspense,{fallback:m.jsx(y,{}),children:m.jsx(E,{toCloseList:!0})})};export{j as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-dZsZLlwX.js","assets/index-MhRWvM9V.js","assets/plugins-zOuqcpMR.js","assets/ace-ERQk7LBk.js","assets/index--nUypExm.css","assets/index-PZpB26TV.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
//# sourceMappingURL=index-XYX8J_Yz.js.map
