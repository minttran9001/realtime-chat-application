(this["webpackJsonprealtime-chat-app"]=this["webpackJsonprealtime-chat-app"]||[]).push([[0],{51:function(e,t,c){},52:function(e,t,c){},54:function(e,t,c){},63:function(e,t,c){},64:function(e,t,c){},65:function(e,t,c){},66:function(e,t,c){},67:function(e,t,c){},68:function(e,t,c){},69:function(e,t,c){},70:function(e,t,c){},71:function(e,t,c){},72:function(e,t,c){},73:function(e,t,c){},74:function(e,t,c){},75:function(e,t,c){"use strict";c.r(t);var a=c(2),n=c(3),s=c.n(n),r=c(31),i=c.n(r),o=(c(51),c(52),c(20)),l=c(11),d=c(4),j=c(6),u=c.n(j),b=c(13),p=c(14),m=(c(54),c(7)),O=c(38);c(59),c(76),c(77);O.a.initializeApp({apiKey:"AIzaSyDhWHYUo31EhafDtO8OdAlDZthmVN85TPI",authDomain:"realtime-chat-ap.firebaseapp.com",projectId:"realtime-chat-ap",storageBucket:"realtime-chat-ap.appspot.com",messagingSenderId:"930254441751",appId:"1:930254441751:web:c256a9a83d26e7af4d7b52",measurementId:"G-8Q95J2GC5R"});var h=O.a,f="USER_LOGIN",x="USER_LOGOUT",v="UPDATE_USER_AVATAR",N="GET_REALTIME_USERS",y="UPDATE_MESSAGE",S="GET_REALTIME_MESSAGE",g="SET_SEEN_MESSAGE",E="GET_LOADMORE_MESSAGE",_="PUSH_POST",U="GET_REALTIME_POSTS",w="GET_POST_BY_KEY",C="PUSH_COMMENT",I=function(e){return function(){var t=Object(b.a)(u.a.mark((function t(c){var a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=h.firestore(),c({type:"".concat(f,"_REQUEST")}),h.auth().createUserWithEmailAndPassword(e.email,e.password).then((function(t){var n=h.auth().currentUser,s="".concat(e.firstName," ").concat(e.lastName);n.updateProfile({displayName:s}).then((function(){a.collection("users").doc(t.user.uid).set({firstName:e.firstName,lastName:e.lastName,createdAt:new Date,uid:t.user.uid,isOnline:!0}).then((function(){var a={firstName:e.firstName,lastName:e.lastName,uid:t.user.uid,email:e.email};localStorage.setItem("user",JSON.stringify({loggedUser:a})),c({type:"".concat(f,"_SUCCESS"),payload:{user:a}})})).catch((function(e){c({type:"".concat(f,"_FAILURE"),payload:e})}))}))})).catch((function(e){c({type:"".concat(f,"_FAILURE"),payload:{error:e.message}})}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},k=function(e){var t=e.msgObj,c=e.type;return function(){var e=Object(b.a)(u.a.mark((function e(a){var n,s,r,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a({type:"".concat(y,"_REQUEST")}),n=h.firestore(),"file"!=c?n.collection("conversations").add(Object(d.a)(Object(d.a)({},t),{},{type:"text",isView:!1,createdAt:new Date})).then((function(e){a({type:"".concat(y,"_SUCCESS")})})).catch((function(e){a({type:"".concat(y,"_REQUEST"),payload:{error:e.message}})})):(s=h.storage().ref(),r=new Date+"-"+t.file.name,i={contentType:t.file.type},s.child(r).put(t.file,i).then((function(e){e.ref.getDownloadURL().then((function(e){n.collection("conversations").add({user_uid_1:t.user_uid_1,user_uid_2:t.user_uid_2,file:e,type:"file",isView:!1,createdAt:new Date}).then((function(e){a({type:"".concat(y,"_SUCCESS")})})).catch((function(e){a({type:"".concat(y,"_REQUEST"),payload:{error:e.message}})}))}))})));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},L=function(e){var t=e.uid_1,c=e.uid_2;e.type;return function(){var e=Object(b.a)(u.a.mark((function e(a){var n,s,r,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a({type:"".concat(S,"_REQUEST")}),n=h.firestore(),s=n.collection("conversations").orderBy("createdAt","desc").where("user_uid_1","in",[c,t]),e.next=5,s.get();case 5:r=e.sent,i=r.docs[r.docs.length-1],n.collection("conversations").orderBy("createdAt","desc").where("user_uid_1","in",[t,c]).onSnapshot((function(e){var n=[];e.forEach((function(e){(e.data().user_uid_1==t&&e.data().user_uid_2==c||e.data().user_uid_1==c&&e.data().user_uid_2==t)&&n.push(e.data())})),a({type:"".concat(S,"_SUCCESS"),payload:{conversations:n.reverse(),lastestDoc:i}})}));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()};function A(){var e=Object(m.c)((function(e){return e.auth})),t=Object(m.b)();return Object(a.jsx)("div",{className:"header",children:Object(a.jsxs)("div",{className:"navBar",children:[Object(a.jsx)("div",{className:"navSide",children:Object(a.jsxs)("ul",{className:"navWrap",children:[Object(a.jsx)("li",{className:"navItem",children:Object(a.jsx)(o.c,{to:"/realtime-chat-application",className:"navLink",children:"HOME"})}),Object(a.jsx)("li",{className:"navItem",children:Object(a.jsx)(o.c,{to:"/about",className:"navLink",children:"ABOUT"})})]})}),Object(a.jsx)("div",{className:"logoArea",children:Object(a.jsx)("img",{src:"https://www.williamdollace.it/wp-content/themes/williamdollacetheme/images/logo.svg"})}),Object(a.jsx)("div",{className:"navSide",children:e.authenticated?Object(a.jsxs)("ul",{className:"navWrap",children:[Object(a.jsx)("li",{className:"navItem",children:Object(a.jsxs)(o.c,{to:"/profile",className:"navLink",children:[e.firstName," PROFILE"]})}),Object(a.jsx)("li",{className:"navItem",children:Object(a.jsx)(o.b,{to:"#",onClick:function(){var c;t((c=e.uid,function(){var e=Object(b.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t({type:"".concat(x,"_REQUEST")}),h.firestore().collection("users").doc(c).update({isOnline:!1}).then((function(){h.auth().signOut().then((function(){localStorage.clear(),t({type:"".concat(x,"_SUCCESS")})})).catch((function(e){t({type:"".concat(x,"_FAILURE"),payload:{error:e}})}))}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))},className:"navLink",children:"LOG OUT"})})]}):Object(a.jsxs)("ul",{className:"navWrap",children:[Object(a.jsx)("li",{className:"navItem",children:Object(a.jsx)(o.c,{to:"/login",className:"navLink",children:"LOGIN"})}),Object(a.jsx)("li",{className:"navItem",children:Object(a.jsx)(o.c,{to:"/signup",className:"navLink",children:"SIGN UP"})})]})})]})})}function R(e){return Object(a.jsxs)("div",{className:"layout",children:[Object(a.jsx)(A,{}),e.children]})}c(63);function T(e){var t=e.value,c=e.type,s=e.label,r=e.onChange,i=e.placeholder,o=Object(n.useState)("inputGroup"),l=Object(p.a)(o,2),d=l[0],j=l[1];return Object(a.jsxs)("div",{className:d,children:[Object(a.jsx)("label",{children:s}),Object(a.jsx)("input",{type:c,onFocus:function(e){j("inputGroup onFocus")},onChange:function(e){var t=e.target.value;r(t)},placeholder:i,value:t}),Object(a.jsx)("div",{className:"line"})]})}c(64);function D(e){return Object(a.jsx)("div",{className:"card",children:e.children})}c(65);function P(e){return Object(a.jsx)("button",{type:e.type,onClick:e.onClick,className:"buttonGold",children:e.children})}c(66);function B(e){return Object(a.jsx)("div",{className:"title",children:Object(a.jsx)("p",{children:e.children})})}c(67);var F=c(34),Q=function(e){return Object(a.jsxs)("div",{className:"error",children:[Object(a.jsx)("p",{children:e.children}),Object(a.jsx)(F.a,{className:"icon"})]})};function G(){var e=Object(m.b)(),t=Object(m.c)((function(e){return e.auth})),c=Object(n.useState)({email:"",password:"",firstName:"",lastName:""}),s=Object(p.a)(c,2),r=s[0],i=s[1],o=function(){var t=Object(b.a)(u.a.mark((function t(c){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:c.preventDefault(),e(I(r));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return!0===t.authenticated?Object(a.jsx)(l.a,{to:"/realtime-chat-application"}):Object(a.jsx)(R,{children:Object(a.jsx)(D,{children:Object(a.jsxs)("form",{onSubmit:o,className:"authForm",children:[Object(a.jsx)(B,{children:"SIGN UP"}),Object(a.jsx)(T,{type:"text",label:"First name",placeholder:"",onChange:function(e){return i(Object(d.a)(Object(d.a)({},r),{},{firstName:e}))}}),Object(a.jsx)(T,{type:"text",label:"Last name",placeholder:"",onChange:function(e){return i(Object(d.a)(Object(d.a)({},r),{},{lastName:e}))}}),Object(a.jsx)(T,{type:"text",label:"Email",placeholder:"",onChange:function(e){return i(Object(d.a)(Object(d.a)({},r),{},{email:e}))}}),Object(a.jsx)(T,{type:"password",label:"Password",placeholder:"",onChange:function(e){return i(Object(d.a)(Object(d.a)({},r),{},{password:e}))}}),t.error?Object(a.jsx)(Q,{children:t.error}):Object(a.jsx)(a.Fragment,{}),Object(a.jsx)(P,{type:"submit",children:"SIGN UP"})]})})})}c(68);var W=function(){var e=Object(m.b)(),t=Object(m.c)((function(e){return e.auth})),c=Object(n.useState)({email:"",password:""}),s=Object(p.a)(c,2),r=s[0],i=s[1];return!0===t.authenticated?Object(a.jsx)(l.a,{to:"/realtime-chat-application"}):Object(a.jsx)(R,{children:Object(a.jsx)(D,{children:Object(a.jsxs)("form",{onSubmit:function(t){var c;t.preventDefault(),e((c=r,function(){var e=Object(b.a)(u.a.mark((function e(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t({type:"".concat(f,"_REQUEST")}),a=h.firestore(),h.auth().signInWithEmailAndPassword(c.email,c.password).then((function(e){a.collection("users").doc(e.user.uid).update({isOnline:!0}).then((function(){var c=e.user.displayName,a=e.user.photoURL;c=c.split(" ");for(var n=new Array,s=0;s<c.length;s++)n.push(c[s]);var r={firstName:c[0],lastName:c[1],uid:e.user.uid,email:e.user.email,avatarUrl:a};localStorage.setItem("user",JSON.stringify({user:r})),t({type:"".concat(f,"_SUCCESS"),payload:{user:r}})}))})).catch((function(e){t({type:"".concat(f,"_FAILURE"),payload:{error:e.message}})}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))},className:"authForm",children:[Object(a.jsx)(B,{children:"Login"}),Object(a.jsx)(T,{type:"email",label:"Email",placeholder:"",onChange:function(e){return i(Object(d.a)(Object(d.a)({},r),{},{email:e}))}}),Object(a.jsx)(T,{type:"password",label:"Password",placeholder:"",onChange:function(e){return i(Object(d.a)(Object(d.a)({},r),{},{password:e}))}}),t.error?Object(a.jsx)(Q,{children:t.error}):Object(a.jsx)(a.Fragment,{}),Object(a.jsx)(P,{type:"submit",children:"LOG IN"})]})})})},q=c.p+"static/media/mint.98ef681e.jpg",M=(c(69),c(10)),H=c(23),J=c(26),V=c(41),Y=c.p+"static/media/noavtar.a69237c0.png",z=function(){var e=Object(n.useState)(""),t=Object(p.a)(e,2),c=t[0],s=t[1],r=Object(n.useState)(""),i=Object(p.a)(r,2),o=i[0],l=i[1],d=Object(n.useState)(""),j=Object(p.a)(d,2),O=j[0],f=j[1],x=Object(n.useState)(""),v=Object(p.a)(x,2),y=v[0],S=v[1],E=Object(m.b)(),_=Object(m.c)((function(e){return e.user})),U=_.users,w=_.conversations,C=_.loadingUser,I=_.loadingChat,A=(_.lastestDoc,Object(m.c)((function(e){return e.auth}))),T=function(){var e;E((e=A.uid,function(){var t=Object(b.a)(u.a.mark((function t(c){var a,n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c({type:"".concat(N,"_REQUEST")}),a=h.firestore(),n=a.collection("users").where("uid","!=",e).onSnapshot((function(e){var t=[];e.forEach((function(e){e.data().length!=t.length&&t.push(e.data())})),c({type:"".concat(N,"_SUCCESS"),payload:{users:t}})})),t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()))};Object(n.useEffect)((function(){T()}),[]);Object(n.useEffect)((function(){""!=o&&E(L({uid_1:A.uid,uid_2:o.uid,type:"afterSend"}))}),[o]),Object(n.useEffect)((function(){if(""!=o&&!I){var e=document.getElementById("chatArea");e.scrollTop=e.scrollHeight}}),[w]),Object(n.useEffect)((function(){""!=y&&D.addEventListener("change",G)}),[y]);var D=document.getElementById("fileInput"),Q=document.getElementById("messageImg"),G=function(e){document.querySelector(".fileSend").classList.add("hasFile"),Q.src=URL.createObjectURL(D.files[0])},W=function(e){e.preventDefault();var t={user_uid_1:A.uid,user_uid_2:o.uid,message:O};""!==O&&(E(k({msgObj:t})),E(L({uid_1:A.uid,uid_2:o.uid,type:"afterSend"})),f(""))},q=function(e){E(function(e){var t=e.uid_1,c=e.uid_2;return function(){var e=Object(b.a)(u.a.mark((function e(a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a({type:"".concat(g,"_REQUEST")}),h.firestore().collection("conversations").where("user_uid_1","==",c).where("user_uid_2","==",t).orderBy("createdAt","desc").onSnapshot((function(e){e.forEach((function(e){e.ref.update({isView:!0})}))}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}({uid_1:A.uid,uid_2:o.uid}))};return Object(a.jsx)(R,{children:Object(a.jsxs)("div",{className:"homePage",children:[C?Object(a.jsx)("div",{className:"friendList loading",children:Object(a.jsx)(H.a,{className:"icon"})}):Object(a.jsx)("div",{className:"friendList",children:U.map((function(e,t){return Object(a.jsxs)("div",{onClick:function(){!function(e){var t={uid_1:A.uid,uid_2:e.uid};l(e),E(L(t))}(e),function(e){""!==c?(document.querySelectorAll(".friend")[c].classList.remove("isSelected"),document.querySelectorAll(".friend")[e].classList.add("isSelected"),s(e)):(document.querySelectorAll(".friend")[e].classList.add("isSelected"),s(e))}(t)},className:"friend",children:[Object(a.jsxs)("div",{className:"avatar",children:[Object(a.jsx)("img",{src:null!=e.avatarUrl?e.avatarUrl:Y,alt:"avatar"}),Object(a.jsx)("span",{className:e.isOnline?"isOnline":"isOffline"})]}),Object(a.jsxs)("div",{className:"friendState",children:[Object(a.jsx)("p",{className:"friendName",children:e.firstName+" "+e.lastName}),Object(a.jsxs)("div",{className:"friendLastText",children:[Object(a.jsx)("p",{className:"lastText",children:"See you again "}),Object(a.jsx)("span",{}),Object(a.jsx)("p",{children:"4 hours ago"})]})]}),Object(a.jsx)("div",{className:"friendButton",children:Object(a.jsxs)("button",{children:[Object(a.jsx)("div",{className:"circle"}),Object(a.jsx)("div",{className:"circle"}),Object(a.jsx)("div",{className:"circle"})]})})]},t)}))}),""!==o?Object(a.jsxs)("div",{className:"chatBox",children:[Object(a.jsxs)("div",{className:"headBox",children:[Object(a.jsxs)("div",{className:"headUser",children:[Object(a.jsx)("img",{alt:"avatar",src:null!=o.avatarUrl?o.avatarUrl:Y}),Object(a.jsx)("p",{children:o.firstName})]}),Object(a.jsxs)("div",{className:"headCall",children:[Object(a.jsx)(M.f,{className:"icon"}),Object(a.jsx)(J.a,{className:"icon"}),Object(a.jsx)(M.e,{className:"icon"})]})]}),I?Object(a.jsx)("div",{className:"chatArea loading",children:Object(a.jsx)(H.a,{className:"icon"})}):Object(a.jsx)("div",{onScroll:function(){var e=document.body,t=document.querySelector(".chatArea");(t=t.clientHeight?t:e).scrollTop},id:"chatArea",className:"chatArea",children:Object(a.jsx)("div",{className:"chatAreaWrap",children:w.map((function(e,t){return Object(a.jsxs)("div",{className:A.uid==e.user_uid_1?"chatWrapper right":"chatWrapper left",children:[A.uid!==e.user_uid_1?Object(a.jsx)("img",{className:"avatar",src:null!=o.avatarUrl?o.avatarUrl:Y}):Object(a.jsx)(a.Fragment,{}),"file"!==e.type?Object(a.jsx)("div",{className:"messageWrap",children:Object(a.jsx)("p",{children:e.message},t)}):Object(a.jsx)("img",{className:"messageFile",src:e.file},t),Object(a.jsx)(M.a,{className:A.uid!=e.user_uid_1||e.isView?"icon gone":"icon"})]},t)}))})}),Object(a.jsxs)("div",{className:"typeArea",children:[Object(a.jsxs)("div",{className:"action",children:[Object(a.jsxs)("div",{className:"fileSend",children:[Object(a.jsx)("img",{id:"messageImg"}),Object(a.jsx)("div",{className:"before"}),Object(a.jsx)(M.i,{onClick:function(e){e.preventDefault();var t={user_uid_1:A.uid,user_uid_2:o.uid,file:D.files[0]};E(k({msgObj:t,type:"file"})),document.querySelector(".fileSend").classList.remove("hasFile"),Q.src="",E(L({uid_1:A.uid,uid_2:o.uid,type:"afterSend"}))},className:"icon"})]}),Object(a.jsxs)("div",{className:"actionWrap",children:[Object(a.jsx)("input",{type:"file",className:"fileInput"}),Object(a.jsx)(M.h,{className:"icon"})]}),Object(a.jsxs)("div",{className:"actionWrap",children:[Object(a.jsx)("input",{type:"file",id:"fileInput",className:"fileInput"}),Object(a.jsx)(M.g,{onClick:function(e){D.click(),S("advanced")},className:"icon"})]}),Object(a.jsxs)("div",{className:"actionWrap",children:[Object(a.jsx)("input",{type:"file",className:"fileInput"}),Object(a.jsx)(V.a,{className:"icon"})]}),Object(a.jsxs)("div",{className:"actionWrap",children:[Object(a.jsx)("input",{type:"file",className:"fileInput"}),Object(a.jsx)(M.c,{className:"icon"})]})]}),Object(a.jsxs)("div",{className:"input",children:[Object(a.jsx)("form",{onSubmit:W,children:Object(a.jsx)("input",{value:O,onClick:function(){return q()},onChange:function(e){return f(e.target.value)},type:"text",placeholder:"Aa"})}),Object(a.jsx)(V.a,{className:"icon"})]}),Object(a.jsx)("div",{className:"likeButton",children:""===O?Object(a.jsx)(M.d,{className:"icon"}):Object(a.jsx)(M.i,{onClick:W,className:"icon"})})]})]}):Object(a.jsxs)("div",{className:"chatBox unSelected",children:[Object(a.jsx)(F.b,{className:"bigIcon"}),Object(a.jsx)(B,{children:"Your Message"}),Object(a.jsx)("p",{children:"Send private photos and messages to a friend or group."}),Object(a.jsx)(P,{children:"Send a message"})]})]})})},K=(c(70),c(27)),Z=(c(71),c(43));c(72);function X(){return Object(a.jsx)(H.a,{className:"loadingIcon"})}var $=function(){var e=Object(m.c)((function(e){return e.post.postbykey})),t=e.item,c=e.loading,n=e.comments,r=Object(m.c)((function(e){return e.auth})),i=Object(m.b)(),o=s.a.useState([]),l=Object(p.a)(o,2),j=l[0],O=l[1],f=s.a.useState(""),x=Object(p.a)(f,2),v=x[0],N=x[1];return Object(a.jsxs)("div",{className:"postDetail",children:[Object(a.jsx)(M.b,{className:"exit",onClick:function(){document.querySelector(".postDetail").classList.remove("open");var e=document.querySelector(".replies");if(null!=e){e.classList.remove("view");O([])}}}),c?Object(a.jsx)(X,{}):Object(a.jsxs)("div",{className:"postWrapper",children:[Object(a.jsx)("div",{className:"postImage",children:Object(a.jsx)("img",{src:t.file,alt:t.key})}),Object(a.jsxs)("div",{className:"postStatus",children:[Object(a.jsxs)("div",{className:"postOwner",children:[Object(a.jsxs)("div",{className:"ownerAvatar",children:[Object(a.jsx)("img",{src:q,alt:t.key}),Object(a.jsx)("p",{children:"mint_stillwalks"})]}),Object(a.jsxs)("div",{className:"more",children:[Object(a.jsx)("div",{className:"circle"}),Object(a.jsx)("div",{className:"circle"}),Object(a.jsx)("div",{className:"circle"})]})]}),Object(a.jsxs)("div",{className:"postDescription",children:[Object(a.jsxs)("div",{className:"ownerAvatar",children:[Object(a.jsx)("img",{src:q,alt:q}),Object(a.jsx)("p",{className:"name",children:"mint_stillwalks"}),Object(a.jsx)("p",{className:"status",children:t.status})]}),Object(a.jsx)("div",{className:"postedDate",children:Object(a.jsx)("p",{children:"6d"})}),Object(a.jsx)("div",{className:"commentBox",children:n.map((function(e,t){return Object(a.jsxs)("div",{className:"comment",children:[Object(a.jsx)("div",{className:"ownerImage",children:Object(a.jsx)("img",{src:q,alt:q})}),Object(a.jsxs)("div",{className:"ownerDetail",children:[Object(a.jsx)("div",{className:"ownerName",children:Object(a.jsxs)("div",{className:"content",children:[" ",Object(a.jsx)("p",{children:"mint_stillwalks"}),Object(a.jsx)("p",{children:e.content})]})}),Object(a.jsxs)("div",{className:"reply",children:[Object(a.jsx)("span",{children:"4d"}),Object(a.jsx)("p",{children:"Reply"}),Object(a.jsx)("div",{className:"heartIcon",children:Object(a.jsx)(M.d,{className:"icon"})})]}),Object(a.jsxs)("div",{className:"viewReplies",children:[Object(a.jsx)("div",{className:"line"}),j[t]?Object(a.jsx)("p",{onClick:function(){return function(e){var t=Object(K.a)(j);document.querySelectorAll(".replies")[e].classList.remove("view"),t[e]=!1,O(t)}(t)},children:"Hide replies(2)"}):Object(a.jsx)("p",{onClick:function(){return function(e){var t=Object(K.a)(j);document.querySelectorAll(".replies")[e].classList.add("view"),t[e]=!0,O(t)}(t)},children:"View replies(2)"})]}),Object(a.jsx)("div",{className:"replies",children:Object(a.jsxs)("div",{className:"replyItem",children:[Object(a.jsx)("div",{className:"ownerImage",children:Object(a.jsx)("img",{src:q,alt:q})}),Object(a.jsxs)("div",{className:"ownerDetail",children:[Object(a.jsx)("div",{className:"ownerName",children:Object(a.jsxs)("div",{className:"content",children:[" ",Object(a.jsx)("p",{children:"mint_stillwalks"}),Object(a.jsx)("p",{children:e.content})]})}),Object(a.jsxs)("div",{className:"reply",children:[Object(a.jsx)("span",{children:"4d"}),Object(a.jsx)("p",{children:"Reply"}),Object(a.jsx)("div",{className:"heartIcon",children:Object(a.jsx)(M.d,{className:"icon"})})]})]})]})})]})]},t)}))}),Object(a.jsxs)("div",{className:"postLiked",children:[Object(a.jsxs)("div",{className:"iconBox",children:[Object(a.jsxs)("div",{className:"likeIcon",children:[Object(a.jsx)(M.d,{className:"icon"}),Object(a.jsx)(J.b,{className:"icon"}),Object(a.jsx)(M.i,{className:"icon"})]}),Object(a.jsx)("div",{className:"saveIcon",children:Object(a.jsx)(Z.a,{className:"icon"})})]}),Object(a.jsxs)("div",{className:"likedBy",children:[Object(a.jsx)("p",{children:"Liked by 0 peoples"}),Object(a.jsx)("p",{children:t.createdAt.toDate().toDateString()})]})]}),Object(a.jsxs)("form",{className:"commentInput",children:[Object(a.jsx)("div",{className:"input",children:Object(a.jsx)("input",{onChange:function(e){return N(e.target.value)},value:v,id:"postComment",placeholder:"Add comment here"})}),Object(a.jsx)("div",{className:"button",children:Object(a.jsx)(P,{type:"submit",onClick:function(e){e.preventDefault();var c={content:v,pid:t.key,uid:r.uid};i(function(e){return function(){var t=Object(b.a)(u.a.mark((function t(c){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:c({type:"".concat(C,"_REQUEST")}),h.firestore().collection("comments").add(Object(d.a)(Object(d.a)({},e),{},{createdAt:new Date,liked:0})).then((function(){c({type:"".concat(C,"_SUCCESS")})})).catch({type:"".concat(C,"_FAILURE")});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(c)),N("")},children:"Post"})})]})]})]})]})]})},ee=(c(73),function(){var e=Object(m.b)(),t=Object(m.c)((function(e){return e.auth})),c=s.a.useState(""),n=Object(p.a)(c,2),r=n[0],i=n[1],o=document.getElementById("filePost"),l=document.getElementById("postImageElement"),d=document.querySelector(".imageBox"),j=function(e){d.classList.add("hasFile"),o.files.length>0&&(l.src=URL.createObjectURL(o.files[0])),i("")};s.a.useEffect((function(){""!=r&&o.addEventListener("change",j)}),[r]);return Object(a.jsx)("div",{className:"modalPost",children:Object(a.jsxs)("div",{className:"modalWrapper",children:[Object(a.jsxs)("div",{className:"head",children:[Object(a.jsx)("div",{className:"title",children:Object(a.jsx)(B,{children:"Make a post"})}),Object(a.jsx)(M.b,{onClick:function(){document.querySelector(".modalPost").classList.remove("open")},className:"icon"})]}),Object(a.jsxs)("div",{className:"poster",children:[Object(a.jsx)("div",{className:"posterImage",children:Object(a.jsx)("img",{src:q})}),Object(a.jsxs)("div",{className:"posterName",children:[Object(a.jsx)("p",{children:"Mint"}),Object(a.jsxs)("div",{className:"securityMode",children:[Object(a.jsx)(H.b,{className:"icon"}),Object(a.jsx)("span",{children:"Private"})]})]})]}),Object(a.jsxs)("div",{className:"statusBox",children:[Object(a.jsx)("textarea",{id:"postText",placeholder:"What are you thinking ?"}),Object(a.jsx)("div",{className:"imageBox",children:Object(a.jsx)("img",{id:"postImageElement"})})]}),Object(a.jsxs)("div",{className:"postButton",children:[Object(a.jsx)(P,{onClick:function(){var c=document.getElementById("postText").value;if(o.files.length>0){var a={file:o.files[0],status:c,uid:t.uid};e(function(e){return function(){var t=Object(b.a)(u.a.mark((function t(c){var a,n,s,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:c({type:"".concat(_,"_REQUEST")}),a=h.firestore(),n=h.storage().ref(),s=new Date+"-"+e.file.name,r={contentType:e.file.type},n.child(s).put(e.file,r).then((function(t){t.ref.getDownloadURL().then((function(t){a.collection("posts").add({file:t,createdAt:new Date,status:e.status,uid:e.uid,liked:0}).then((function(){c({type:"".concat(_,"_SUCCESS")})})).catch((function(e){c({type:"".concat(_,"_FAILURE"),payload:{error:e}})}))}))}));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(a)),d.classList.remove("hasFile"),l.src="",c=""}},children:"Post"}),Object(a.jsxs)("div",{className:"postIcon",children:[Object(a.jsx)("input",{type:"file",id:"filePost"}),Object(a.jsx)(M.g,{onClick:function(){o.click(),i("advanced")},className:"icon"}),Object(a.jsx)(H.c,{className:"icon"})]})]})]})})}),te=(c(74),function(){var e=Object(m.b)(),t=Object(m.c)((function(e){return e.auth})),c=Object(n.useState)(""),s=Object(p.a)(c,2),r=s[0],i=s[1],o=function(){O.classList.remove("open")},l=Object(n.useRef)(null),j=Object(n.useRef)(null),O=Object(n.useRef)(null),f=function(){l.files.length>0&&(j.src=URL.createObjectURL(l.files[0]))};return Object(n.useEffect)((function(){"advanced"==r&&l.addEventListener("change",f)}),[r]),Object(a.jsx)("div",{ref:function(e){return O=e},className:"modalUpdateAvatar",children:Object(a.jsxs)("div",{className:"modalWrapper",children:[Object(a.jsx)(M.b,{onClick:o,className:"icon"}),Object(a.jsx)("div",{className:"modalTitle",children:Object(a.jsx)("p",{children:"Update Avatar"})}),Object(a.jsxs)("div",{className:"openFile",children:[Object(a.jsx)("button",{onClick:function(){l.click(),i("advanced")},children:"Choose a file"}),Object(a.jsx)("input",{type:"file",className:"input",ref:function(e){l=e}})]}),Object(a.jsx)("div",{className:"avatarBox",children:Object(a.jsx)("div",{className:"avatarWrap",children:Object(a.jsx)("img",{id:"image",ref:function(e){j=e}})})}),Object(a.jsxs)("div",{className:"updateBtn",children:[Object(a.jsx)(P,{onClick:function(){var c,a;e((c=t.uid,a=l.files[0],function(){var e=Object(b.a)(u.a.mark((function e(t){var n,s,r,i,o,l;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t({type:"".concat(v,"_REQUEST")}),n=h.firestore(),s=h.storage().ref(),r=new Date+"-"+a.name,i=a.type,o=s.child(r).put(a,i),l=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,o.then((function(e){e.ref.getDownloadURL().then((function(e){h.auth().currentUser.updateProfile({photoURL:e}),n.collection("users").doc(c).update({avatarUrl:e}),l=Object(d.a)(Object(d.a)({},l.user),{},{avatarUrl:e}),localStorage.setItem("user",JSON.stringify({user:l}))})).then((function(){t({type:"".concat(v,"_SUCCESS"),payload:{notify:"Update successfully",avatarUrl:l.avatarUrl}})})).catch((function(e){t({type:"".concat(v,"_FALURE"),payload:{error:e}})}))}));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))},children:"Save"}),Object(a.jsx)(P,{onClick:o,children:"Cancel"})]})]})})}),ce=function(){var e=Object(m.b)(),t=Object(m.c)((function(e){return e.post})),c=Object(m.c)((function(e){return e.auth}));s.a.useEffect((function(){var t;e((t=c.uid,function(){var e=Object(b.a)(u.a.mark((function e(c){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c({type:"".concat(U,"_REQUEST")}),h.firestore().collection("posts").where("uid","==",t).orderBy("createdAt","desc").onSnapshot((function(e){var t=[];e.forEach((function(e){t.push(Object(d.a)({key:e.id},e.data()))})),c({type:"".concat(U,"_SUCCESS"),payload:{posts:t}})}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))}),[]);var n=function(t){document.querySelector(".postDetail").classList.add("open"),e(function(e){return function(){var t=Object(b.a)(u.a.mark((function t(c){var a,n,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:c({type:"".concat(w,"_REQUEST")}),a=h.firestore(),n=a.collection("posts"),s=a.collection("comments"),n.onSnapshot((function(t){var a={};s.orderBy("createdAt","desc").where("pid","==",e).onSnapshot((function(n){var s=[];n.forEach((function(e){s.push(e.data())})),t.forEach((function(t){t.id==e&&(a=Object(d.a)({key:t.id},t.data()))})),c(a!={}?{type:"".concat(w,"_SUCCESS"),payload:{postItem:a,comments:s}}:{type:"".concat(w,"_FAILURE"),payload:{error:"Item with key ".concat(e," does not exist")}})}))}));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(t))};return Object(a.jsxs)(R,{children:[Object(a.jsx)(ee,{}),Object(a.jsx)(te,{}),Object(a.jsx)($,{}),Object(a.jsxs)("div",{className:"profile",children:[Object(a.jsxs)("div",{className:"profileHead",children:[Object(a.jsxs)("div",{className:"avatar",children:[Object(a.jsx)("div",{className:"avatarWrap",children:Object(a.jsx)("img",{alt:q,src:c.avatarUrl})}),Object(a.jsx)(M.h,{onClick:function(){document.querySelector(".modalUpdateAvatar").classList.add("open")},className:"icon"})]}),Object(a.jsxs)("div",{className:"details",children:[Object(a.jsxs)("div",{className:"userName",children:[Object(a.jsx)("p",{children:c.firstName+" "+c.lastName}),Object(a.jsx)(P,{children:"Edit Profile"}),Object(a.jsx)(M.j,{className:"icon"})]}),Object(a.jsxs)("div",{className:"userFollow",children:[Object(a.jsxs)("p",{children:["282 ",Object(a.jsx)("span",{children:"followers"})]}),Object(a.jsxs)("p",{children:["1003 ",Object(a.jsx)("span",{children:"following"})]})]}),Object(a.jsx)("div",{className:"madeUpName",children:Object(a.jsx)("p",{children:"\u5c0f\u3055\u306a\u30db\u30bf\u30eb"})})]})]}),Object(a.jsx)("div",{className:"postButton",children:Object(a.jsx)(P,{onClick:function(e){document.querySelector(".modalPost").classList.add("open")},children:"Post something"})}),Object(a.jsx)("div",{className:"allPosts",children:t.loadingPost?Object(a.jsx)("div",{className:"post",children:Object(a.jsx)("div",{className:"loading",children:Object(a.jsx)(X,{})})}):t.posts.length>0?t.posts.map((function(e,t){return Object(a.jsxs)("div",{onClick:function(){return n(e.key)},className:"post",children:[Object(a.jsx)("div",{className:"postImage",children:Object(a.jsx)("img",{alt:e.createdAt,src:e.file})}),Object(a.jsxs)("div",{className:"postHover",children:[Object(a.jsxs)("p",{children:[Object(a.jsx)(M.d,{className:"icon"})," 37"," "]}),Object(a.jsxs)("p",{children:[Object(a.jsx)(J.b,{className:"icon"})," 37"," "]})]})]},e.key)})):Object(a.jsx)("div",{className:"post",children:Object(a.jsx)("p",{children:"Havent posted anything"})})})]})]})},ae=c(45);function ne(e){var t=e.component,c=Object(ae.a)(e,["component"]);return Object(a.jsx)(l.b,Object(d.a)(Object(d.a)({},c),{},{component:function(e){return(localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null)?Object(a.jsx)(t,Object(d.a)({},e)):Object(a.jsx)(l.a,{to:"/login"})}}))}var se=function(){var e=Object(m.b)(),t=Object(m.c)((function(e){return e.auth}));s.a.useEffect((function(){t.authenticated||e(function(){var e=Object(b.a)(u.a.mark((function e(t){var c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,t(c?{type:"".concat(f,"_SUCCESS"),payload:{user:c.user}}:{type:"".concat(f,"_FAILURE"),payload:{error:""}});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]);var c=[{path:"/realtime-chat-application",name:"Home",component:z},{path:"/login",name:"Login",component:W},{path:"/signup",name:"Sign Up",component:G},{path:"/profile",name:"Profile",component:ce}];return Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(o.a,{children:c.map((function(e){return Object(a.jsx)("div",{children:"Login"===e.name||"Sign Up"===e.name?Object(a.jsx)(l.b,{path:e.path,component:e.component,exact:!0}):Object(a.jsx)(ne,{path:e.path,component:e.component})},e.name)}))})})},re=c(24),ie={firstName:"",lastName:"",uid:"",email:"",avatarUrl:"",authenticating:!1,authenticated:!1,error:null,notify:"",updating:!1},oe={users:[],conversations:[],loadingUser:!0,loadingChat:!0,lastestDoc:{}},le={posts:[],posting:!0,loadingPosts:!0,error:null,posted:!1,postbykey:{item:{},comments:[],loading:!0,error:null}},de=Object(re.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ie,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"".concat(f,"_REQUEST"):return e=Object(d.a)(Object(d.a)({},e),{},{authenticating:!0});case"".concat(f,"_SUCCESS"):return e=Object(d.a)(Object(d.a)({},e),{},{firstName:t.payload.user.firstName,lastName:t.payload.user.lastName,uid:t.payload.user.uid,email:t.payload.user.email,avatarUrl:t.payload.user.avatarUrl,authenticated:!0,authenticating:!1,error:null});case"".concat(f,"_FAILURE"):return e=Object(d.a)(Object(d.a)({},e),{},{authenticated:!1,authenticating:!1,error:t.payload.error});case"".concat(x,"_REQUEST"):return e;case"".concat(x,"_SUCCESS"):return e=Object(d.a)({},ie);case"".concat(x,"_FAILURE"):return e=Object(d.a)(Object(d.a)({},e),{},{error:t.payload.error});case"".concat(v,"_REQUEST"):return e=Object(d.a)(Object(d.a)({},e),{},{updating:!0});case"".concat(v,"_SUCCESS"):return e=Object(d.a)(Object(d.a)({},e),{},{updating:!1,notify:t.payload.notify,avatarUrl:t.payload.avatarUrl});default:return e}},user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"".concat(N,"_REQUEST"):return e=Object(d.a)(Object(d.a)({},e),{},{loadingUser:!0});case"".concat(N,"_SUCCESS"):return e=Object(d.a)(Object(d.a)({},e),{},{loadingUser:!1,users:t.payload.users});case"".concat(S,"_REQUEST"):return e=Object(d.a)(Object(d.a)({},e),{},{loadingChat:!0});case"".concat(S,"_SUCCESS"):return e=Object(d.a)(Object(d.a)({},e),{},{loadingChat:!1,conversations:t.payload.conversations,lastestDoc:t.payload.lastDoc});case"".concat(E,"_REQUEST"):return e=Object(d.a)(Object(d.a)({},e),{},{loadingChat:!0});case"".concat(E,"_SUCCESS"):return e=Object(d.a)(Object(d.a)({},e),{},{loadingChat:!1,conversations:[].concat(Object(K.a)(t.payload.conversations),Object(K.a)(e.conversations)),lastestDoc:t.payload.lastestDoc});case"".concat(E,"_FAILURE"):return e=Object(d.a)({},e);default:return e}},post:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"".concat(_,"_REQUEST"):return e=Object(d.a)({},e);case"".concat(_,"_SUCCESS"):return e=Object(d.a)(Object(d.a)({},e),{},{posting:!1,posted:!0});case"".concat(_,"_FAILURE"):e=Object(d.a)(Object(d.a)({},e),{},{posted:!1,posting:!1,error:t.payload.error});case"".concat(U,"_REQUEST"):return e=Object(d.a)({},e);case"".concat(U,"_SUCCESS"):return e=Object(d.a)(Object(d.a)({},e),{},{loadingPosts:!1,posts:t.payload.posts});case"".concat(U,"_FAILURE"):return e=Object(d.a)(Object(d.a)({},e),{},{loadingPosts:!1,error:t.payload.error});case"".concat(w,"_REQUEST"):return e=Object(d.a)({},e);case"".concat(w,"_SUCCESS"):return e=Object(d.a)(Object(d.a)({},e),{},{postbykey:Object(d.a)(Object(d.a)({},e.postbykey),{},{item:t.payload.postItem,comments:t.payload.comments,loading:!1,error:null})});case"".concat(w,"_FAILURE"):return e=Object(d.a)(Object(d.a)({},e),{},{postbykey:Object(d.a)(Object(d.a)({},e.postbykey),{},{loading:!0,error:t.payload.error})});default:return e}}}),je=c(44),ue=Object(re.d)(de,Object(re.a)(je.a));window.store=ue,i.a.render(Object(a.jsx)(m.a,{store:ue,children:Object(a.jsx)(se,{})}),document.getElementById("root"))}},[[75,1,2]]]);
//# sourceMappingURL=main.6ce04adf.chunk.js.map