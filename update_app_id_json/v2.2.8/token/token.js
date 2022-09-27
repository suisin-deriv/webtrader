define(["exports","websockets/binary_websockets","windows/windows","common/rivetsExtra","moment","clipboard","text!token/token.html","lodash","css!token/token.css"],function(e,n,t,o,s,a,i,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.init=void 0;var c=p(n),l=p(t),u=p(o),d=p(s),k=p(a),m=p(i);function p(e){return e&&e.__esModule?e:{default:e}}var f=null,_=null;u.default.binders.clipboard={routine:function(e,n){var t=new k.default(e,{text:function(){return n}});t.on("success",function(){$.growl.notice({message:'Copied "'+n+'"'})}),t.on("error",function(){$.growl.error({message:"Your browser doesn't support copy to clipboard".i18n()})}),e._rv_clipboard_&&e._rv_clipboard_.destroy(),e._rv_clipboard_=t},unbind:function(e){e._rv_clipboard_.destroy()}};function h(e){var n,s;e=$(e).i18n(),(f=l.default.createBlankWindow(e,{title:"Token management".i18n(),resizable:!1,collapsable:!1,minimizable:!0,maximizable:!1,width:700,minHeight:60,"data-authorized":!0,close:function(){_&&_.unbind(),_=null,f.destroy(),f=null}})).track({module_id:"token",is_unique:!0,data:null}),n=e,(s={route:"token-list",search_input:"",tokens:[],token:{name:"",scopes:{read:!0,trade:!1,payments:!1,admin:!1},btn_disabled:!1,checkTokenName:function(e,n){var t=n.token.name;32<t.length&&($.growl.error({message:"Token name can have a maximum of 32 characters".i18n()}),n.token.name=t.substr(0,32)),null!=t.match(/[^\w\s]+/g)&&($.growl.error({message:"Token name can contain alphanumeric characters with spaces and underscores".i18n()}),n.token.name=t.replace(/[^\w\s]+/g,"")),/^[\w]/.test(t)||($.growl.error({message:"Token name should begin with alphanumeric characters only".i18n()}),n.token.name=t.replace(/^[^\w]+/g,""))}},confirm:{visible:!1,top:"0px",token:{}},tokens_filtered:function(){var n=s.search_input.toLowerCase();return s.tokens.filter(function(e){return""===n||-1!==e.display_name.toLowerCase().indexOf(n)||-1!==e.token.toLowerCase().indexOf(n)||-1!==e.permissions.toLowerCase().indexOf(n)})}}).confirm.show=function(e){var n=$(e.target),t=n.position().top-n.parent().parent().height(),o=n.attr("token-id");o=(0,r.find)(s.tokens,{token:o}),s.confirm.top=t+"px",s.confirm.visible=!0,s.confirm.token=o},s.confirm.no=function(){s.confirm.visible=!1},s.confirm.yes=function(){var e=s.confirm.token;s.confirm.visible=!1,c.default.send({api_token:1,delete_token:e.token}).then(function(e){var n=e.api_token&&e.api_token.tokens||[];s.update_tokens(n)}).catch(function(e){$.growl.error({message:e.message})})},s.change_route=function(e){"token-list"!==e&&(s.confirm.visible=!1),s.route=e},s.update_tokens=function(e){e.forEach(function(e){var n=e.scopes;e.permissions=4==n.length?"All":n.join(", "),e.last_used_tooltip=e.last_used,e.last_used=e.last_used?d.default.utc(e.last_used,"YYYY-MM-DD HH:mm:ss").fromNow():"-"}),s.tokens=e},s.token.add=function(){if(s.token.name.length<2)$.growl.error({message:"Token name must contain atleast 2 characters".i18n()});else{var t={api_token:1,new_token:s.token.name,new_token_scopes:[]};s.token.scopes.read&&t.new_token_scopes.push("read"),s.token.scopes.trade&&t.new_token_scopes.push("trade"),s.token.scopes.payments&&t.new_token_scopes.push("payments"),s.token.scopes.admin&&t.new_token_scopes.push("admin");var e="";t.new_token_scopes.length||(e="Please choose at least one token scope".i18n()),t.new_token&&t.new_token.length||(e="Please enter the token name".i18n()),e?$.growl.error({message:e}):(s.token.btn_disabled=!0,c.default.cached.authorize().then(function(){c.default.send(t).then(function(e){s.token.name="",s.token.btn_disabled=!1,$.growl.notice({message:"Successfully added new token ".i18n()+" "+t.new_token});var n=e.api_token&&e.api_token.tokens||[];s.update_tokens(n),s.change_route("token-list")}).catch(function(e){s.token.btn_disabled=!1,$.growl.error({message:e.message})})}).catch(function(e){$.growl.error({message:e.message})}))}},_=u.default.bind(n[0],s),c.default.send({api_token:1}).then(function(e){var n=e.api_token&&e.api_token.tokens||[];s.update_tokens(n)}).catch(function(e){$.growl.error({message:e.message})}).then(function(){f.dialog("open")})}var w=e.init=function(e){e.click(function(){f?f.moveToTop():h(m.default)})};e.default={init:w}});