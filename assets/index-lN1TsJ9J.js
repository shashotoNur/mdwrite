import{r as d,M as f,T as E,j as r}from"./index-BswSIWgD.js";import{e as N}from"./exportMarkdown-mRq2AOLq.js";const $=m=>{const i=["January","February","March","April","May","June","July","August","September","October","November","December"],l=m.getDate(),p=i[m.getMonth()],u=m.getFullYear(),h=`${l} ${p}, ${u}`,a=m.getHours(),c=m.getMinutes(),g=a>=12?"PM":"AM";return`${`${a%12||12}:${c.toString().padStart(2,"0")} ${g}`} - ${h}`},y=({closeList:m})=>{const[i,l]=d.useState([]),{handleChange:p,filenameChange:u,timestampChange:h}=d.useContext(f),{theme:a}=d.useContext(E);d.useEffect(()=>{const e=Object.entries(localStorage).filter(([t])=>t.startsWith("Entry: ")).map(([t,n])=>({filename:t.replace("Entry: ","").split(" - ")[0],markdown:n,timestamp:new Date(t.replace("Entry: ","").split(" - ")[1])})),s=Object.values(e.reduce((t,{filename:n,markdown:o,timestamp:x})=>(t[n]||(t[n]=[]),t[n].push({filename:n,markdown:o,timestamp:x}),t),{})).map(t=>(t.sort((n,o)=>o.timestamp.getTime()-n.timestamp.getTime()),{entryName:t[0].filename,entries:t}));s.sort((t,n)=>n.entries[0].timestamp.getTime()-t.entries[0].timestamp.getTime()),l(s)},[m]);const c=e=>{u(e.filename),p(e.markdown),h(e.timestamp),m()},g=e=>{const{timeZone:s}=Intl.DateTimeFormat().resolvedOptions(),t=e.timestamp.toLocaleString("en-US",{timeZone:s});localStorage.removeItem(`Entry: ${e.filename} - ${t}`);const n=i.map(o=>o.entryName===e.filename?{...o,entries:o.entries.filter(x=>x.timestamp!==e.timestamp)}:o);l(n)};return r.jsxs("div",{className:`entry-list ${a}`,children:[r.jsx("h2",{className:`entry-list-heading ${a}`,children:"Saved Entries"}),r.jsx("button",{className:`entry-button ${a}`,onClick:()=>c({filename:"untitled",markdown:"",timestamp:new Date}),children:"New Entry"},"New Entry"),i.length==0?r.jsx("div",{className:`entry-title ${a}`,children:"No entry"}):i.map(e=>e.entries.length>0&&r.jsxs("div",{children:[r.jsx("div",{className:`entry-title ${a}`,children:e.entryName.length>50?e.entryName.substring(0,70)+"...":e.entryName}),e.entries.map(s=>r.jsxs("div",{className:"entry",children:[r.jsx("br",{}),r.jsx("button",{className:`entry-button ${a}`,onClick:()=>c(s),children:$(s.timestamp)}),r.jsx("button",{className:`export-button ${a}`,onClick:()=>N({filename:s.filename,markdown:s.markdown}),children:"Export"}),r.jsx("button",{className:"delete-button",onClick:()=>g(s),children:"Delete"})]},s.timestamp.toString()))]},e.entryName))]})};export{y as default};
//# sourceMappingURL=index-lN1TsJ9J.js.map