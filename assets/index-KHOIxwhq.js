import{j as e}from"./plugins-2QKNzetD.js";import{a as A,r as l,_ as D}from"./ace-ERQk7LBk.js";import{T as N,M as L,E as S}from"./index-cG9zMz_t.js";import{e as P}from"./exportMarkdown-prvLWrxa.js";const H=({event:s,editor:t,saveToStorage:n})=>{var o;if(s.ctrlKey)switch(s.key.toLowerCase()){case"b":s.preventDefault(),T("__",t);break;case"i":s.preventDefault(),T("_",t);break;case"s":s.preventDefault(),n();break;case"o":s.preventDefault(),(o=document.getElementById("entries-button"))==null||o.click();break}},T=(s,t)=>{if(!t)return;const n=t.getCursorPosition(),o=t.getSelectedText(),d=s.replace("<","</");if(o){const a=t.getSelectionRange();t.session.replace(a,`${s}${o}${d}`)}else{const a={row:n.row,column:n.column};t.session.insert(a,`${s}${d}`);const m={row:a.row,column:a.column+s.length};t.clearSelection(),t.moveCursorToPosition(m)}t.focus()},W=({toggleListVisibility:s})=>{const t=A.createRef(),n=l.useContext(N),{filename:o,markdown:d,timestamp:a,toVersion:m,isSaved:b,handleChange:C,filenameChange:x,timestampChange:v,toggleToVersion:j,saveToStorage:k}=l.useContext(L),{editor:i,changeEditor:r}=l.useContext(S);if(l.useEffect(()=>{const c=g=>{if(!b)return g.preventDefault(),g.returnValue=""};return window.addEventListener("beforeunload",c),()=>{window.removeEventListener("beforeunload",c)}},[b]),l.useEffect(()=>{t.current&&r(t)},[t,r]),l.useEffect(()=>{const c=g=>{i&&H({event:g,editor:i,saveToStorage:k})};return document.addEventListener("keydown",c),()=>document.removeEventListener("keydown",c)},[i,o,d,k,a,m]),!n)return e.jsx("div",{children:"Error: Theme context is null"});const{theme:h}=n,f=c=>{if(!c.target.files)return;const g=c.target.files[0],w=new FileReader;w.onload=E=>{if(!E.target)return;const $=E.target.result;typeof $=="string"&&(C($),x(g.name.replace(".md","")),v(new Date))},w.readAsText(g)},u=()=>{if(!i)return;const{session:c}=i;c.getUndoManager().undo(c)},y=()=>{if(!i)return;const{session:c}=i;c.getUndoManager().redo(c)};return e.jsxs(e.Fragment,{children:[e.jsx(B,{toggleListVisibility:s}),e.jsxs("div",{className:`file-input-group ${h}`,children:[e.jsx("label",{htmlFor:"filename-input",children:e.jsx("input",{type:"text",className:`filename-input ${h}`,name:"filename-input",value:o,onChange:c=>x(c.target.value),title:"Enter the name of your entry"})}),e.jsx("h4",{title:b?"Document is saved":"Unsaved changes",className:"status",children:b?"✔":"✘"}),e.jsxs("label",{className:`btn ${h}`,title:"Import a document into the editor",children:[e.jsx("input",{type:"file",onChange:f}),"Import"]}),e.jsx("label",{className:`btn ${h}`,title:"Export the active entry from the editor",onClick:()=>P({filename:o,markdown:d}),children:"Export"}),e.jsx("button",{className:`btn ${h}`,onClick:k,title:"Save the current entry in your browser",children:"Save"}),e.jsxs("button",{className:`btn ${h}`,onClick:j,title:m?"The editor is keeping a version history of your entry":"Version history is disabled",children:["Versioning: ",m?"ON":"NO"]}),e.jsxs("div",{children:[e.jsx("label",{className:`btn ${h}`,onClick:u,title:"Undo",children:"↺"}),e.jsx("label",{className:`btn ${h}`,onClick:y,title:"Redo",children:"⟳"})]})]}),e.jsx(D,{ref:t,mode:"markdown",theme:h==="light"?"github":"dracula",name:"id-ace-editor",fontSize:13,showPrintMargin:!1,onChange:C,value:d,className:"ace-editor",setOptions:{enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,enableSnippets:!0}})]})},U=({insertType:s,setShowInsertModal:t})=>{const[n,o]=l.useState(""),[d,a]=l.useState(""),[m,b]=l.useState(""),C=l.useContext(N),{editor:x}=l.useContext(S);if(!C)return e.jsx("div",{children:"Error: Theme context is null"});const{theme:v}=C,j=(i,r)=>{if(!r)return;const h=r.getCursorPosition(),f={row:h.row,column:h.column};r.session.insert(f,i),r.focus()},k=()=>{let i=`[${n}](${m})`;if(s==="image"&&(i="!"+i),s==="reference"&&(i=`[${n}][${d}]`),!!x){if(j(i,x),s==="reference"){const r=`[${d}]: ${m}`;if(!x)return;if(x.session.getLine(x.session.getLength()-1).trim()===""){const f={row:x.session.getLength()-1,column:0};x.session.insert(f,r)}else{const f={row:x.session.getLength(),column:0};x.session.insert(f,`
${r}`)}a("")}t(!1),o(""),b("")}};return e.jsxs("div",{className:`insert-modal ${v}`,children:[e.jsxs("p",{children:["Insert"," ",s.charAt(0).toUpperCase()+s.substring(1)]}),e.jsx("input",{type:"text",value:n,onChange:i=>o(i.target.value),placeholder:"Enter text here"}),s==="reference"&&e.jsx("input",{type:"text",value:d,onChange:i=>a(i.target.value),placeholder:"Enter reference here"}),e.jsx("input",{type:"text",value:m,onChange:i=>b(i.target.value),placeholder:"Enter link here"}),e.jsx("button",{className:`toolbar-button ${v}`,onClick:k,children:"Insert"})]})},M=()=>{const s=l.useContext(N),{editor:t}=l.useContext(S);if(!s)return e.jsx("div",{children:"Error: Theme context is null"});const{theme:n}=s,o=a=>{if(!t)return;const b={row:t.getCursorPosition().row,column:0};t.session.insert(b,a),t.focus()},d=a=>{const m=a.target.value;!m||!t||(o(`${"#".repeat(Number(m))} `),a.target.value="")};return e.jsxs(e.Fragment,{children:[e.jsxs("select",{title:"Choose a heading",className:`toolbar-select ${n}`,defaultValue:"",onChange:d,children:[e.jsx("option",{value:"",children:"Heading"}),e.jsx("option",{value:"1",children:"Heading 1"}),e.jsx("option",{value:"2",children:"Heading 2"}),e.jsx("option",{value:"3",children:"Heading 3"}),e.jsx("option",{value:"4",children:"Heading 4"}),e.jsx("option",{value:"5",children:"Heading 5"}),e.jsx("option",{value:"6",children:"Heading 6"})]}),e.jsx("button",{title:"Create bullet points",className:`toolbar-button ${n}`,onClick:()=>o("- "),children:"Unordered List"}),e.jsx("button",{title:"Create an ordered list",className:`toolbar-button ${n}`,onClick:()=>o("1. "),children:"Ordered List"}),e.jsx("button",{title:"Add a checkbox",className:`toolbar-button ${n}`,onClick:()=>o("- [ ] "),children:"Checkbox"}),e.jsx("button",{title:"Add a horizontal rule",className:`toolbar-button ${n}`,onClick:()=>o(`---
`),children:"Rule"}),e.jsx("button",{title:"Add a line break",className:`toolbar-button ${n}`,onClick:()=>o("<br>"),children:"Break"}),e.jsx("button",{title:"Indent text with block quotes",className:`toolbar-button ${n}`,onClick:()=>o("> "),children:"Quote"})]})},_=()=>{const s=l.useContext(N),{editor:t}=l.useContext(S),n=d=>{t&&T(d,t)};if(!s||!t)return e.jsxs("div",{children:["Error: ",t?"Theme":"Editor"," is null"]});const{theme:o}=s;return e.jsxs(e.Fragment,{children:[e.jsx("button",{title:"Bold text",className:`toolbar-button ${o}`,onClick:()=>n("__"),children:e.jsx("b",{children:"B"})}),e.jsx("button",{title:"Italic text",className:`toolbar-button ${o}`,onClick:()=>n("_"),children:e.jsx("i",{children:"I"})}),e.jsx("button",{title:"Underlined text",className:`toolbar-button ${o}`,onClick:()=>n("<ins>"),children:e.jsx("u",{children:"u"})}),e.jsx("button",{title:"Strike through text",className:`toolbar-button ${o}`,onClick:()=>n("~"),children:e.jsx("del",{children:"Strike"})}),e.jsx("button",{title:"Text as a subscript",className:`toolbar-button ${o}`,onClick:()=>n("<sub>"),children:"Sub"}),e.jsx("button",{title:"Text as a superscript",className:`toolbar-button ${o}`,onClick:()=>n("<sup>"),children:"Super"})]})},B=({toggleListVisibility:s})=>{const[t,n]=l.useState(!1),[o,d]=l.useState("link"),[a,m]=l.useState(!0),[b,C]=l.useState(""),[x,v]=l.useState(""),[j,k]=l.useState(!0),i=l.useContext(N),{editor:r}=l.useContext(S),{autosave:h,toggleAutosave:f}=l.useContext(L);if(!i)return e.jsx("div",{children:"Error: Theme context is null"});const{theme:u,toggleTheme:y}=i,c=()=>{r&&r.find(b,{caseSensitive:!1,wholeWord:!1,regExp:!1})},g=()=>{r&&r.replace(x)},w=()=>{r&&(r.replaceAll(x,{caseSensitive:!1,wholeWord:!1,regExp:!1}),r.clearSelection())},E=()=>{if(!r)return;const p=r.getCursorPosition(),R=r.session.getLine(p.row);let I=1;R.trim()!==""&&(r.insert(`
`),I=2),r.insert("```\n\n```"),r.moveCursorToPosition({row:p.row+I,column:0})},$=p=>{d(p),n(!t)};return e.jsxs("div",{className:`toolbar ${u}`,children:[e.jsx("button",{title:"Click to change theme",className:`toolbar-button ${u}`,onClick:y,children:e.jsx("i",{children:u==="light"?"DAWN":"DUSK"})}),e.jsx("button",{title:"List of all the entries saved on this device",className:`toolbar-button ${u}`,onClick:s,id:"entries-button",children:e.jsx("i",{children:"Entries"})}),e.jsx("button",{className:`toolbar-button ${u}`,onClick:f,title:h?"Autosaving every 2 minutes":"Autosaving is currently disabled",children:e.jsx("i",{children:h?"Auto":"Hold"})}),e.jsx("button",{className:`toolbar-button ${u}`,onClick:()=>m(!a),title:a?"Open toolbar":"Close toolbar",children:e.jsx("i",{children:a?">":"X"})}),!a&&e.jsxs(e.Fragment,{children:[e.jsx(_,{}),e.jsx(M,{}),e.jsx("button",{className:`toolbar-button ${u}`,onClick:E,title:"Create code block",children:"Code"}),e.jsxs("div",{children:[e.jsx("button",{title:"Insert a link",className:`toolbar-button ${u}`,onClick:()=>$("link"),children:"Link"}),e.jsx("button",{title:"Insert an image",className:`toolbar-button ${u}`,onClick:()=>$("image"),children:"Image"}),e.jsx("button",{title:"Insert a link reference",className:`toolbar-button ${u}`,onClick:()=>$("reference"),children:"Reference"})]}),e.jsx("button",{title:`Click to ${j?"open":"close"} search modal`,className:`toolbar-button ${u}`,onClick:()=>k(!j),children:"🔍"}),!j&&e.jsxs("div",{className:`search-modal ${u}`,children:[e.jsx("input",{type:"text",placeholder:"Search",onChange:p=>C(p.target.value)}),e.jsx("button",{className:`toolbar-button ${u}`,onClick:c,children:"Search"}),e.jsx("input",{type:"text",placeholder:"Replace",onChange:p=>v(p.target.value)}),e.jsx("button",{className:`toolbar-button ${u}`,onClick:g,children:"Replace"}),e.jsx("button",{className:`toolbar-button ${u}`,onClick:w,children:"Replace All"})]}),t&&e.jsx(U,{insertType:o,setShowInsertModal:n})]})]})};export{W as default};
//# sourceMappingURL=index-KHOIxwhq.js.map
