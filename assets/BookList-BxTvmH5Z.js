import{d as _,o as l,c as r,a as e,w as f,r as b,b as c,e as C,f as $,g as y,h,t as d,F as k,u as B,s as w,i as D,j as R,v as L,k as g,l as S,m as V,n as I,p as N}from"./index-ehnKHy1Q.js";const P=["open"],T=_({__name:"ConfirmationDialog",props:{show:{type:Boolean}},emits:["confirm","cancel"],setup(v){return(t,n)=>(l(),r("dialog",{open:t.show},[e("article",null,[e("a",{href:"#close","aria-label":"Close",class:"close",onClick:n[0]||(n[0]=f(s=>t.$emit("cancel"),["prevent"]))}),e("h3",null,[b(t.$slots,"header",{},()=>[c("Do you want to confirm?")])]),e("p",null,[b(t.$slots,"body",{},()=>[c("Do you really want to confirm your action?")])]),e("footer",null,[e("a",{href:"#cancel",role:"button",class:"secondary",onClick:n[1]||(n[1]=f(s=>t.$emit("cancel"),["prevent"]))}," Cancel "),e("a",{href:"#confirm",role:"button",onClick:n[2]||(n[2]=f(s=>t.$emit("confirm"),["prevent"]))}," Confirm ")])])],8,P))}}),M=["src"],F=["disabled"],j={key:0},E={key:1},U=_({__name:"BookListItem",props:{title:{},isbn:{},numPages:{},cover:{},read:{type:Boolean}},emits:["read"],setup(v,{emit:t}){const n=t;function s(){a(),n("read")}const i=C(!1);function p(){i.value=!0}function a(){i.value=!1}return(o,u)=>{const m=$("RouterLink");return l(),r(k,null,[e("tr",null,[e("td",null,[y(m,{to:{name:"book-detail",params:{isbn:o.isbn}}},{default:h(()=>[c(d(o.isbn),1)]),_:1},8,["to"])]),e("td",null,d(o.title),1),e("td",null,d(o.numPages),1),e("td",null,[e("img",{src:o.cover,width:"100"},null,8,M)]),e("td",null,[e("button",{onClick:p,disabled:o.read},[o.read?(l(),r("span",j,"✅")):(l(),r("span",E,"Read"))],8,F)])]),y(T,{show:i.value,onCancel:a,onConfirm:s},{header:h(()=>[c(" Confirm read action ")]),body:h(()=>[c(" Do you really want to mark the book '"+d(o.title)+"' as read? ",1)]),_:1},8,["show"])],64)}}}),q=e("label",{for:"search"},"Search",-1),z={role:"grid"},A=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"ISBN"),e("th",{scope:"col"},"Title"),e("th",{scope:"col"},"Pages"),e("th",{scope:"col"},"Cover"),e("th",{scope:"col"},"Read?")])],-1),J=_({__name:"BookList",setup(v){const t=B(),{books:n,userInput:s}=w(t),{getBooks:i}=t;function p(a){var o;n.value[a]={...n.value[a],read:!((o=n.value[a])!=null&&o.read)}}return D(()=>i()),(a,o)=>(l(),r(k,null,[e("form",null,[q,R(e("input",{type:"search",id:"search",name:"search",placeholder:"Book title","onUpdate:modelValue":o[0]||(o[0]=u=>S(s)?s.value=u:null)},null,512),[[L,g(s)]])]),e("table",z,[A,e("tbody",null,[(l(!0),r(k,null,V(g(n),(u,m)=>(l(),I(U,N({key:u.isbn},u,{onRead:G=>p(m)}),null,16,["onRead"]))),128))])])],64))}});export{J as default};
