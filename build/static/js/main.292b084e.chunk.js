(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(21)},19:function(e,t,n){},20:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(6),c=n.n(r),i=(n(19),n(4)),o=n(1),u=n(3),s=n(7),d=n(8),h=n(11),m=n(9),b=n(12),f=function(e){return l.a.createElement("div",{className:"header__input"},l.a.createElement("input",{type:"text",onChange:e.onFilterInput,placeholder:"search..."}))},g=n(2),k=n.n(g),p=function(e){var t=e.handleSelectedButtonClick,n=e.showSelectedButtonIsActive;return l.a.createElement("div",{className:"header__buttons"},l.a.createElement("button",{className:k()("button",{"button-active":!1===n}),onClick:function(){return t(!1)}},"Show all"),l.a.createElement("button",{className:k()("button",{"button-active":!0===n}),onClick:function(){return t(!0)}},"Show selected"))},v=function(e){var t=e.onFilterInput,n=e.handleSelectedButtonClick,a=e.showSelectedButtonIsActive;return l.a.createElement("header",{className:"header"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"header__content"},l.a.createElement("div",{className:"header__logo"},"phones.ua"),l.a.createElement(f,{onFilterInput:t}),l.a.createElement(p,{handleSelectedButtonClick:n,showSelectedButtonIsActive:a}))))},E=n(10),C=function(e){var t=e.handlePaginationSelector,n=e.perPage;return l.a.createElement("div",{className:"pagination__selector"},l.a.createElement("select",{onChange:t,value:n},l.a.createElement("option",{value:"3"},"3"),l.a.createElement("option",{value:"5"},"5"),l.a.createElement("option",{value:"10"},"10"),l.a.createElement("option",{value:"15"},"15"),l.a.createElement("option",{value:"20"},"20")))},S=function e(t){var n=t.checkedAll,a=t.handleCheckAll,r=t.phones,c=t.handleOrderClick,i=t.togglePhoneCheckbox,o=t.config,u=t.handlePaginationSelector,s=t.perPage,d=t.handleDoubleClick,h=t.handleSubmitEditing,m=t.handleEditableBlockBlur;return l.a.createElement("main",{className:"main"},l.a.createElement("div",{className:"container"},l.a.createElement("table",{className:"main__table"},l.a.createElement(e.Header,{checkedAll:n,handlePaginationSelector:u,config:o,handleOrderClick:c,perPage:s,handleCheckAll:a}),l.a.createElement(e.Content,{config:o,phones:r,togglePhoneCheckbox:i,handleDoubleClick:d,handleSubmitEditing:h,handleEditableBlockBlur:m}))))};S.Header=function(e){var t=e.checkedAll,n=e.handlePaginationSelector,a=e.config,r=e.handleOrderClick,c=e.perPage,i=e.handleCheckAll;return l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,l.a.createElement("input",{type:"checkbox",onChange:i,checked:t}),l.a.createElement(C,{handlePaginationSelector:n,perPage:c})),Object.entries(a).map(function(e){var t=Object(E.a)(e,2),n=t[0],a=t[1],c=k()({"main__table-sortable":a.isSortable});return l.a.createElement("th",{key:n,className:c,onClick:a.isSortable?function(){return r(n)}:null},a.title)})))},S.Content=function(e){var t=e.phones,n=e.config,a=e.togglePhoneCheckbox,r=e.handleDoubleClick,c=e.handleSubmitEditing,i=e.handleEditableBlockBlur;return l.a.createElement("tbody",null,t.map(function(e){return l.a.createElement("tr",{key:e.id},l.a.createElement("th",null,l.a.createElement("input",{type:"checkbox",checked:e.isChecked,onChange:function(){return a(e.id)}})),Object.keys(n).map(function(t){var a=l.a.createElement(S.EditableBlock,{handleEditableBlockBlur:i,handleSubmitEditing:c,title:t,phone:e});return l.a.createElement(S.Cell,{key:t,config:n,title:t,handleDoubleClick:r,phone:e,editableBlock:a})}))}))},S.EditableBlock=function(e){var t=e.handleEditableBlockBlur,n=e.phone,a=e.handleSubmitEditing,r=e.title,c=n[r],i=!1;return l.a.createElement("div",null,l.a.createElement("textarea",{className:"editable-block__text",defaultValue:c,onChange:function(e){c=e.target.value,i=!0},onBlur:function(){return t(n.id)},autoFocus:!0,onKeyDown:function(e){return 13===e.keyCode?a(n.id,r,c,i):null}}),l.a.createElement("button",{className:"editable-block__button button",onMouseDown:function(){return a(n.id,r,c,i)}},"OK"))},S.Cell=function(e){var t=e.config,n=e.title,a=e.handleDoubleClick,r=e.phone,c=e.editableBlock;return l.a.createElement("td",{key:n,onDoubleClick:t[n].isEditable?function(){return a(r.id,n)}:null,className:k()({"editable-block":t[n].isEditable})},r.editableField===n&&c||(t[n].hasImage?l.a.createElement("img",{src:"".concat("https://raw.githubusercontent.com/TarSen99/DataTableComponent/master/").concat(r[n]),alt:n}):r[n]))};var P=S,y=function(e){var t=e.totalPhonesCount,n=e.currentPage,a=e.perPage,r=e.handleClick,c=function(e,t){var a=n+e;a=Math.max(0,a),(a=Math.min(t-1,a))!==n&&r(a)},i=Math.ceil(t/a),o=function(e){for(var t=[],n=0;n<e;n++)t.push(n);return t}(i),u=Math.min(n*a+1,t),s=Math.min(n*a+a,t);return l.a.createElement("div",{className:"pagination"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"pagination__block"},l.a.createElement("div",{className:"pagination__text"},l.a.createElement("span",{className:"pagination__current-items"},"".concat(u," - ").concat(s," ")),"of",l.a.createElement("span",{className:"pagination__total-items"}," ".concat(t))),l.a.createElement("div",{className:"pagination__buttons"},l.a.createElement("button",{onClick:function(){return c(-1,i)},className:"pagination__arrow button",disabled:0===n},"<"),o.map(function(e){var t=k()("button",{"button-active":e===n});return l.a.createElement("button",{key:e,onClick:function(){return r(e)},className:t},e+1)}),l.a.createElement("button",{onClick:function(){return c(1,i)},className:"pagination__arrow button",disabled:n===Math.max(i-1,0)},">")))))},B={imageUrl:{hasImage:!0},name:{title:"Name",isSortable:!0,isSearchable:!0},snippet:{title:"Description",isSearchable:!0,isEditable:!0},age:{title:"Age",isSortable:!0}},w=(n(20),function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,l=new Array(a),r=0;r<a;r++)l[r]=arguments[r];return(n=Object(h.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(l)))).state={phones:[],order:"DESC",orderBy:"",filterValue:"",currentPage:0,perPage:3,showSelected:!1},n.togglePhoneCheckbox=function(e){var t=Object(u.a)(n.state.phones),a=t.findIndex(function(t){return t.id===e});t[a]=Object(o.a)({},t[a],{isChecked:!t[a].isChecked}),n.setState({phones:t})},n.onOrderInput=function(e){var t=n.state.orderBy===e?n.getNewOrder():n.state.order;n.setState({order:t,orderBy:e})},n.onFilterInput=function(e){var t=e.target.value;n.setState({currentPage:0,filterValue:t})},n.selectPage=function(e){n.setState({currentPage:e})},n.handlePaginationSelector=function(e){var t=+e.target.value;n.setState({currentPage:0,perPage:t})},n.handleSelectedButtonClick=function(e){n.setState({currentPage:0,showSelected:e})},n.handleCheckAll=function(e){var t=e.target.checked,a=n.getFilteredPhones(),l=Object(u.a)(n.getCurrentPagePhones(a)).map(function(e){return Object(o.a)({},e,{isChecked:t})});n.setState(function(e){var t=Object(u.a)(e.phones);return l.forEach(function(e){var n=e.id,a=e.isChecked,l=t.findIndex(function(e){return e.id===n});t[l]=Object(o.a)({},t[l],{isChecked:a})}),{phones:t}})},n.handleDoubleClick=function(e,t){n.setState(function(n){var a=Object(u.a)(n.phones),l=a.findIndex(function(t){return t.id===e});return a[l]=Object(o.a)({},a[l],{editableField:t}),{phones:a}})},n.handleSubmitEditing=function(e,t,a,l){n.setState(function(n){var r,c=Object(u.a)(n.phones),s=c.findIndex(function(t){return t.id===e});return c[s]=Object(o.a)({},c[s],(r={},Object(i.a)(r,t,l?a:c[s][t]),Object(i.a)(r,"editableField",null),r)),{phones:c}})},n.handleEditableBlockBlur=function(e){n.setState(function(t){var n=Object(u.a)(t.phones),a=n.findIndex(function(t){return t.id===e});return n[a]=Object(o.a)({},n[a],{editableField:null}),{phones:n}})},n}return Object(b.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://mate-academy.github.io/phone-catalogue-static/phones/phones.json").then(function(e){return e.json()}).then(function(t){var n=e.addIsCheckedProperty(t),a=e.addCurrentEditableField(n);e.setState({phones:a})})}},{key:"addIsCheckedProperty",value:function(e){return e.map(function(e){return Object(o.a)({},e,{isChecked:!1})})}},{key:"addCurrentEditableField",value:function(e){return e.map(function(e){return Object(o.a)({},e,{editableField:null})})}},{key:"getNewOrder",value:function(){return"ASC"===this.state.order?"DESC":"ASC"}},{key:"sortItems",value:function(e,t,n){return e.sort(function(e,a){return"ASC"===n?e[t]>a[t]?1:-1:e[t]>a[t]?-1:1})}},{key:"getSearchableParams",value:function(e){var t=[];for(var n in e){if(!e.hasOwnProperty(n))return;B[n].isSearchable&&t.push(n)}return t}},{key:"getFilteredPhones",value:function(){var e=this.state,t=e.phones,n=e.filterValue,a=e.orderBy,l=e.order,r=n.toLowerCase(),c=this.getSearchableParams(B),i=t.filter(function(e){var t=!0,n=!1,a=void 0;try{for(var l,i=c[Symbol.iterator]();!(t=(l=i.next()).done);t=!0){if(e[l.value].toLowerCase().includes(r))return!0}}catch(o){n=!0,a=o}finally{try{t||null==i.return||i.return()}finally{if(n)throw a}}return!1}),o=this.filterBySelection(i);return this.sortItems(o,a,l)}},{key:"filterBySelection",value:function(e){var t=this;return!1===this.state.showSelected?e:e.filter(function(e){return e.isChecked===t.state.showSelected})}},{key:"getCurrentPagePhones",value:function(e){var t=this.state,n=t.currentPage,a=t.perPage;return e.filter(function(e,t){return t>=n*a&&t<n*a+a})}},{key:"checkAllButtonsSelection",value:function(e){return e.every(function(e){return!0===e.isChecked})}},{key:"render",value:function(){var e=this.getFilteredPhones(),t=this.getCurrentPagePhones(e),n=this.checkAllButtonsSelection(t);return l.a.createElement(l.a.Fragment,null,l.a.createElement(v,{onFilterInput:this.onFilterInput,handleSelectedButtonClick:this.handleSelectedButtonClick,showSelectedButtonIsActive:this.state.showSelected}),l.a.createElement(P,{perPage:this.state.perPage,handlePaginationSelector:this.handlePaginationSelector,config:B,phones:t,togglePhoneCheckbox:this.togglePhoneCheckbox,handleOrderClick:this.onOrderInput,handleCheckAll:this.handleCheckAll,checkedAll:n,handleDoubleClick:this.handleDoubleClick,handleSubmitEditing:this.handleSubmitEditing,handleEditableBlockBlur:this.handleEditableBlockBlur}),l.a.createElement(y,{totalPhonesCount:e.length,currentPage:this.state.currentPage,perPage:this.state.perPage,handleClick:this.selectPage}))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[13,1,2]]]);
//# sourceMappingURL=main.292b084e.chunk.js.map