function hasNeverAutologin(c,a){var f=lpcanonizeUrl(c);if(g_neverurls.onlyautologins&&g_neverurls.onlyautologins.length>0){for(var d=false,b=0;g_neverurls.onlyautologins&&b<g_neverurls.onlyautologins.length;b++){var e=g_neverurls.onlyautologins[b];if(e==a||e==f){d=true;break}}if(!d)return true}for(b=0;g_neverurls.neverautologins&&b<g_neverurls.neverautologins.length;b++){e=g_neverurls.neverautologins[b];if(e==a||e==f)return true}return false}
function hasNeverGenerate(c,a){var f=lpcanonizeUrl(c);if(g_neverurls.onlygenerates&&g_neverurls.onlygenerates.length>0){for(var d=false,b=0;g_neverurls.onlygenerates&&b<g_neverurls.onlygenerates.length;b++){var e=g_neverurls.onlygenerates[b];if(e==a||e==f){d=true;break}}if(!d)return true}for(b=0;g_neverurls.nevergenerates&&b<g_neverurls.nevergenerates.length;b++){e=g_neverurls.nevergenerates[b];if(e==a||e==f)return true}return false}
function hasNeverFormFill(c,a){var f=lpcanonizeUrl(c);if(g_neverurls.onlyformfills&&g_neverurls.onlyformfills.length>0){for(var d=false,b=0;g_neverurls.onlyformfills&&b<g_neverurls.onlyformfills.length;b++){var e=g_neverurls.onlyformfills[b];if(e==a||e==f){d=true;break}}if(!d)return true}for(b=0;g_neverurls.neverformfills&&b<g_neverurls.neverformfills.length;b++){e=g_neverurls.neverformfills[b];if(e==a||e==f)return true}return false}var g_accessibility_enabled=-1;
function handleFill(c,a){var f=false;if(!(!lploggedin||grid_getdata("active")!=null))if(a.cmd=="autofillaid"||a.cmd=="autologinaid"){var d=a.aid;if(typeof g_sites[d]!="undefined"){f=a.cmd=="autologinaid";fill(c,g_sites[d],null,f,!f,"all",true,false,true)}}else if(!(typeof a=="undefined"||!a||typeof a.url=="undefined")){var b=a.url;console_log("request to fill "+b);if(!lp_url_is_lastpass(b)){if(typeof g_launches[c]!="undefined"&&g_launches[c]){d=g_launches[c];if(check_ident_aid(d)){g_launches[c]=null;
typeof g_sites[d]!="undefined"&&fill(c,g_sites[d],null,true,false,a.docnum,false,true)}}d=lp_gettld_url(b);var e=getsites(d);e=reorderOnURL(e,b,true);if(hasNeverAutologin(b,d))e=[];d=a.force==0&&a.topurl!=b?lp_gettld_url(a.topurl):"";if(d!=""&&hasNeverAutologin(a.topurl,d))e=[];for(var h in e){try{if(g_ischrome&&e[h].basic_auth==1&&g_accessibility_enabled<=0&&lpGetPref("basicauthnever",0)==0)if(g_is_mac&&have_nplastpass()&&typeof g_nplastpass.accessibility_enabled=="function"){g_accessibility_enabled=
g_nplastpass.accessibility_enabled()?1:0;g_accessibility_enabled==0&&setTimeout(function(){get_selected_tab(null,function(k){sendCS(gettabid(k),{cmd:"showbasicauthnotification",needbinary:0,text:gs("In order for LastPass to fill into basic authentication dialogs, you need to enable access for assistive devices.")})})},100)}else if((g_is_win||g_is_mac)&&!have_nplastpass()){g_accessibility_enabled=0;setTimeout(function(){get_selected_tab(null,function(k){sendCS(gettabid(k),{cmd:"showbasicauthnotification",
needbinary:1,text:gs("In order for LastPass to fill into basic authentication dialogs, you need to install the binary version of LastPass for Chrome.")})})},100)}}catch(g){}var j=false;d=e[h].aid;if(check_ident_aid(d))if(typeof g_sites[d]!="undefined"){d=g_sites[d];if(d.never_autofill)j=true;if(d.pwprotect||g_prompts.login_site_prompt)j=true;if(!d.genpw)if(!(d.fields.length==0&&d.username=="")){if(d.url.indexOf("https://")==0&&b.indexOf("https://")!=0)j=true;if(lpGetPref("automaticallyFill",1)==0)j=
true;if(!j){if(h=!d.save_all){if(typeof g_fillfieldsmatches[b]=="undefined")g_fillfieldsmatches[b]=[];g_fillfieldsmatches[b][g_fillfieldsmatches[b].length]=d;g_fillfieldsmatchescurridx[b]=0}fill(c,d,a.docid,null,h,a.docnum,null,true)}if(lpGetPref("showFillNotificationBar",1)!=0){get_selected_tab(null,function(){sendCS(c,{cmd:"showfillnotification",text:gs("LastPass has filled your login information into the form on this page."),sites:cache_usernames(e),docnum:a.docnum})});f=true}break}}}f||checkgenpwfillforms(c,
b)}}}
function checkgenpwfillforms(c,a){var f=lp_gettld_url(a),d=lpGetPref("showGenerateNotifications",1)!=1||hasNeverGenerate(a,f),b=lpGetPref("showFormFillNotifications",1)!=1||hasNeverFormFill(a,f),e=[];if(!b){for(var h=0;h<g_formfills.length;h++)if(check_ident_ffid(g_formfills[h].ffid))e[e.length]=g_formfills[h];if(e.length==0)b=true}if(!d||!b)sendCS(c,{cmd:"checkgenpwfillforms",nevergenerate:d,neverformfill:b,sites:cache_usernames(reorderOnURL(getsites(f),a,true,true)),formfills:LPJSON.stringify(e)})}
function cache_usernames(c){for(var a in c)c[a].useusername=getusernamefromacct(c[a]);return LPJSON.stringify(c)}
function hasNeverSave(c,a){var f=lpcanonizeUrl(c);console_log("num: "+g_neverurls.onlyaccounts.length);if(g_neverurls.onlyaccounts&&g_neverurls.onlyaccounts.length>0){for(var d=false,b=0;g_neverurls.onlyaccounts&&b<g_neverurls.onlyaccounts.length;b++){var e=g_neverurls.onlyaccounts[b];if(e==a||e==f){d=true;break}}if(!d)return true}console_log("num: "+g_neverurls.neveraccounts.length);for(b=0;g_neverurls.neveraccounts&&b<g_neverurls.neveraccounts.length;b++){e=g_neverurls.neveraccounts[b];if(e==a||
e==f)return true}return false}
function handleNever(c,a){if(a.cmd=="neverautofill"){var f=a.aid;if(typeof g_sites[f]=="undefined")return;g_sites[f].never_autofill=true;g_sites[f].autologin=false;f="aid="+en(f);lpMakeRequest(base_url+"set_never_autofill.php",f,null,null)}else if(a.cmd=="neverdomain"||a.cmd=="neverpage"){var d=a.cmd=="neverdomain"?lp_gettld_url(a.url):lpcanonizeUrl(a.url);f="url="+en(AES.bin2hex(d));if(typeof a.fromsave!="undefined")g_neverurls.neveraccounts.push(d);else if(typeof a.fromgenerate!="undefined"){f+=
"&type=1";g_neverurls.nevergenerates.push(d)}else if(typeof a.fromformfill!="undefined"){f+="&type=2";g_neverurls.neverformfills.push(d)}else{f+="&type=3";g_neverurls.neverautologins.push(d)}lpMakeRequest(base_url+"add_never.php",f,null,null)}g_local_accts_version++;rewritelocalfile()}
function handleSave(c,a){if(lploggedin)if(!lp_url_is_lastpass(a.url)){for(var f=a.formdata.split("\n"),d=false,b=false,e="",h="",g=[],j=0;j<f.length;j++){var k=f[j].split("\t");if(k.length==4){var i=decodeURIComponent(k[2]);k=k[3];if((!d||!b)&&("text"==k||"email"==k)&&i.length){e=i;d=true;if(b==false&&typeof SpecialSites[lpcanonizeUrl(a.url)]!="undefined")b=true}if(k=="password"){g[g.length]=i;if(!b&&i.length){h=i;b=true}}}}if(b){a.username=e;a.password=h;if(!d&&g.length>1){a.username=g[0];a.password=
g[1]}f=lp_gettld_url(a.url);a.tld=f;b=false;i="";if(g.length>1&&g[g.length-1]==g[g.length-2]&&g[g.length-1]!=""){b=true;i=g[g.length-1]}else if(g.length>1&&g[0]==g[1]&&g[0]!=""){b=true;i=g[0]}if(b&&array_length(getsites(f,true))>0){g_notification_type="change";a.newpw=i;g_notification_data=a;sendTS({cmd:"notification",type:"change"});if(lpGetPref("showChangeNotificationBar",1)!=0){g=getsites(f,true);var l;a.sitecount=array_length(g);if(array_length(g)==1)for(j in g){a.singleaid=j;l=gs("LastPass detected a password change for user:")+
" "+getusernamefromacct(g_sites[j]);break}else l=gs("LastPass detected a password change for domain:")+" "+f;sendCS(c,{cmd:"showchangenotification",text:l,notificationdata:a});g_persistent_notifications[c]={cmd:"showchangenotification",text:l,notificationdata:a}}}else if(!hasNeverSave(a.url,f)){g=typeof g_tlds[f]!="undefined"?g_tlds[f]:[];for(var m in g)if(check_ident_aid(m))if(typeof g_sites[m]!="undefined"){j=g_sites[m];if((!d||e==lpmdec(j.username,true)||e.indexOf("****")==0)&&h==lpmdec(j.password,
true)||j.save_all&&isMatch(j,d,e,h)||e==lpmdec(j.username,true)&&h=="")return}g_notification_type="save";g_notification_data=a;lpGetPref("showSaveSiteNotifications",0)!=0&&sendTS({cmd:"notification",type:"save"});if(lpGetPref("showSaveNotificationBar",1)!=0)if(lpCheckAddSite(a.username,a.password,f)){sendCS(c,{cmd:"showaddnotification",text:gs("Should LastPass remember this password?"),notificationdata:a});g_persistent_notifications[c]={cmd:"showaddnotification",text:gs("Should LastPass remember this password?"),
notificationdata:a}}}}}}function lpCheckAddSite(c,a,f){var d=lp_get_gmt_timestamp(),b=[],e;for(e in g_rejectedaddsites){var h=g_rejectedaddsites[e];if(d>h.rejectedTime+600)b[b.length]=e}for(e=b.length-1;e>=0;e--)g_rejectedaddsites.splice(b[e],1);for(e in g_rejectedaddsites){h=g_rejectedaddsites[e];if(h.username==c&&lpdec(h.encryptedPassword)==a&&compare_tlds(h.tld,f))return false}return true}
function handleUpdateFields(c,a){var f=a.aid,d=g_sites[f];d.url=a.url;var b=[],e=[],h=updateAndEncryptData(a.formdata,b,e);update_username_from_fields_if(d,b);for(var g=d.fields.length-1;g>=0;g--)!d.fields[g].otherfield&&d.fields[g].otherlogin!="1"&&d.fields.splice(g,1);for(g=0;g<b.length;g++)d.fields[d.fields.length]=b[g];g_local_accts_version++;rewritelocalfile();f="data="+en(bin2hex(h))+"&ref="+en(bin2hex(a.url))+"&updatefields=1&aid="+en(f);d.postdata=f;d.posturl=base_url+"gm_deliver.php";d.newvalues=
e;updateFieldsFromSubmit(f,d)}
function handleAddUrid(c,a){for(var f=a.aid,d=g_sites[f],b=[],e=0;e<d.fields.length;e++)if(d.fields[e].otherlogin=="1"&&!lp_in_array(d.fields[e].urid,b))b[b.length]=d.fields[e].urid;if(!(b.length>=10)){var h=[];b=[];var g=updateAndEncryptData(a.formdata,h,b);update_username_from_fields_if(d,h);for(e=0;e<h.length;e++){h[e].otherlogin="1";h[e].url=bin2hex(a.url);d.fields[d.fields.length]=h[e]}g_local_accts_version++;rewritelocalfile();f="data="+en(bin2hex(g))+"&ref="+en(bin2hex(a.url))+"&addurid=1&aid="+
en(f);d.postdata=f;d.posturl=base_url+"gm_deliver.php";d.newvalues=b;updateFieldsFromSubmit(f,d)}}function update_username_from_fields_if(c,a){for(var f=0,d="",b=0;b<a.length;b++)if("text"==a[b].type||"email"==a[b].type){d=a[b].value;if(++f>=2)break}if(f==1&&d!=""){for(b=f=0;b<c.fields.length;b++)if(!c.fields[b].otherfield&&("text"==c.fields[b].type||"email"==c.fields[b].type)){f++;break}if(f==0){c.username=d;c.unencryptedUsername=lpdec(crypto_btoa(c.username))}}}
function updateAndEncryptData(c,a,f){var d="";c=typeof c!="undefined"?c.split("\n"):[];for(var b=0;b<c.length;b++){var e=c[b].split("\t");if(e.length==4){var h=decodeURIComponent(e[1]),g=decodeURIComponent(e[2]);e=e[3];var j=false,k=g,i=false;if("email"==e||"text"==e||"password"==e||"hidden"==e||"textarea"==e){f&&f.push(g);g=lpenc(g);d+="0\t"+en(h)+"\t"+en(g)+"\t"+en(e)+"\n";if(e!="hidden"){j=true;k=crypto_atob(g)}}else if(e=="action")d+="0\taction\t"+en(g)+"\taction\n";else if(e=="method")d+="0\tmethod\t"+
en(g)+"\tmethod\n";else{d+="0\t"+en(h)+"\t"+en(g)+"\t"+en(e)+"\n";if(e=="radio"||e=="checkbox"){i=g.substring(g.length-2)=="-1";if(e!="radio"||i){j=true;k=g.substring(0,g.length-2)}}else if(e=="select-one")j=true}if(j){g=[];g.otherfield=false;g.name=h;g.type=e;g.value=k;g.checked=i;g.formname="";g.urid="0";g.otherlogin="0";g.url="";a[a.length]=g}}}return d}function handleSaveAll(c,a){a.save_all=1;g_site_data=a;openURL(getchromeurl("site.html"))}
function isMatch(c,a,f,d){a=a?false:true;for(var b=false,e=0;e<c.fields.length;e++)if(!(c.fields[e].type!="text"&&c.fields[e].type!="password"&&c.fields[e].type!="email")){var h=lpmdec(c.fields[e].value,true);if(("text"==c.fields[e].type||"email"==c.fields[e].type)&&f==h)a=true;if(c.fields[e].type=="password"&&d==h)b=true}if(a&&b)return true;return false}
function fill(c,a,f,d,b,e,h,g,j){j||(j=false);if(!g&&(a.pwprotect||g_prompts.login_site_prompt)){console_log("FILL : Showing Security Prompt");security_prompt(function(){setTimeout(function(){fill(c,a,f,d,b,e,h,true,j)},100)})}else get_selected_tab(null,function(k){if(h||a.basic_auth==1)if(k.id==c)if(have_nplastpass()&&typeof g_nplastpass.fill_basicauth=="function"){k=getusernamefromacct(a);var i=getpasswordfromacct(a);if(k!=""||i!=""){var l=check_autologin(d,a);if(g_nplastpass.fill_basicauth(k,i,
h?true:false,lp_gettld_url(a.url),l?true:false)){g_basicauth_found=false;return}}}k=a.fields;l=k.length;b=b==1?1:0;h=h?1:0;i=a.sharedfromaid!=null&&a.sharedfromaid!=""&&a.sharedfromaid!="0"&&a.sharedfromaid!="null"?1:0;if(l!=0){var m=0;for(l=0;l<k.length;l++)k[l].type=="password"&&m++;m=!a.save_all&&m==0;for(l=0;l<k.length;l++)if(!(!a.save_all&&b&&k[l].type!="password"&&!h&&!m)){var n=k[l],p=n.value,o=n.type;if("text"==o||"password"==o||"email"==o||"textarea"==o)p=lpmdec(p,true);if(p!=""){n={cmd:"fillfield",
manualfill:j,name:n.name,value:p,formname:n.formname,type:o,docid:f,aid:a.aid,checked:n.checked,doconfirm:b||a.save_all&&o=="password"?1:0,tabid:c,allowforce:h,custom_js:a.custom_js,sharedsite:i,otherfield:n.otherfield,domains:getacceptabletlds(a.url)};if(a.custom_js!=""){n.username=a.unencryptedUsername;n.password=lpmdec(a.password,true);n.onlyfill=d?0:1}sendCS(c,n,e)}}}else if(h){console_log("no fields. finding best match "+lpmdec(a.username,true)+" and <hidden>");sendCS(c,{cmd:"fillbest",username:lpmdec(a.username,
true),password:lpmdec(a.password,true),docid:f,aid:a.aid,custom_js:a.custom_js,updatefields:1,addurid:0,sharedsite:i,domains:getacceptabletlds(a.url)},e)}if(!b){l=check_autologin(d,a);if(typeof a.custom_js=="string"&&a.custom_js!="")sendCS(c,{cmd:"run_custom_js",docid:f,custom_js:a.custom_js,username:getusernamefromacct(a),password:lpmdec(a.password,true),onlyfill:l?0:1,loc:3},e);if(typeof a.custom_js!="string"||a.custom_js.indexOf("lpdontsubmit")==-1)if(l)sendCS(c,{cmd:"submit",docid:f,submit_id:typeof a.submit_id!=
"undefined"?a.submit_id:""},e);if(g_loglogins||LPISLOC)if(typeof g_loggedLogins[a.aid]=="undefined"){g_loggedLogins[a.aid]="1";loglogin(a.aid)}}})}function check_autologin(c,a){var f=false;if(c)f=true;else if(a.autologin){var d=(new Date).getTime(),b=parseInt(lpGetPref("autoautoVal",25));if(isNaN(b)||b==""||b<=0)b=25;b=d-b*1E3;if(typeof a.last_auto_login=="undefined"||isNaN(a.last_auto_login)||a.last_auto_login<b){console_log("Launching autologin");a.last_auto_login=d;f=true}}return f}
function fillfieldsconfirm(c){var a=c.url,f=c.result,d=c.aid,b=c.docid,e=c.tabid,h=c.manualfill,g=g_sites[d],j=g.sharedfromaid!=null&&g.sharedfromaid!=""&&g.sharedfromaid!="0"&&g.sharedfromaid!="null"?1:0;if(g.save_all){if(!f||h)sendCS(e,{cmd:"fillbest",username:getusernamefromacct(g),password:getpasswordfromacct(g),docid:b,aid:g.aid,updatefields:0,addurid:0,sharedsite:j,domains:getacceptabletlds(g.url)},c.docnum)}else if(f){(g=g_sites[d])&&fill(e,g,b,null,false,c.docnum,null,true);delete g_fillfieldsmatches[a];
delete g_fillfieldsmatchescurridx[a]}else if(c.allowforce)sendCS(e,{cmd:"fillbest",username:getusernamefromacct(g),password:getpasswordfromacct(g),docid:b,aid:g.aid,updatefields:0,addurid:1,sharedsite:j,domains:getacceptabletlds(g.url)},c.docnum);else{if(f=g_fillfieldsmatches[a]){d=false;for(h=0;h<f.length;h++){g=f[h].aid;if(d){(g=g_sites[g])&&fill(e,g,b,null,true,c.docnum,null,true);return}if(h==g_fillfieldsmatchescurridx[a]){g_fillfieldsmatchescurridx[a]++;d=true}}}delete g_fillfieldsmatches[a];
delete g_fillfieldsmatchescurridx[a]}}
function web2plug(c){if(c.rsa=="2"){g_local_key=AES.hex2bin(c.key);rsa_userchangedpassword();c=opendb();createDataTable(c);c&&!LPISLOC&&c.transaction(function(a){a.executeSql("DELETE FROM LastPassData WHERE username_hash=? AND type=?",[db_prepend(g_username_hash),"accts"],function(){},function(f,d){console_log(d)})});lpWriteKeyFile()}else if(g_username!=""&&g_username!=c.username)if(c.rsa=="1"){g_local_key=AES.hex2bin(c.key);lpWriteKeyFile();lplogincheck(true)}else loggedOut(false,"web2plug");else{g_local_key=
AES.hex2bin(c.key);lpWriteKeyFile()}}function recover(c,a,f,d){var b=lpParseUri(a);a=b.directory;b=b.file;a=a.replace(/^\/~[^\/]*/,"");if(!(a!=""&&a!="/"&&a!="/sso/"))if(b=="recover.php"){a=GetOTPHash(null,c,f,d);b="nouser";if(a!=""&&a!=null)b=AES.bin2hex(a);console_log("hash after GetOTPHash for "+f+" is: "+b);sendCS(c,{cmd:"recover",otp:b},d)}}
function loginfromwebsite(c){if(c.wxusername!=""&&c.keyhex!=""){var a=opendb();createSavedLoginsTable(a);a&&a.transaction(function(d){var b=(new Date).getTime();d.executeSql("UPDATE LastPassSavedLogins2 SET last_login = ? WHERE username = ?",[b,c.wxusername],function(e,h){h.rowsAffected==0&&e.executeSql("INSERT INTO LastPassSavedLogins2 (username, password, last_login) VALUES (?, '', ?)",[c.wxusername,b])},function(e,h){console_log(h)})});a=AES.hex2bin(c.keyhex);var f=g_local_key!=null?AES.bin2hex(g_local_key):
"";if(!(lploggedin&&g_username==c.wxusername&&f==c.keyhex))if(lploggedin&&g_username==c.wxusername)g_local_key=a;else{lploggedin&&g_username!=""&&loggedOut(false,"differentuser");if(c.wxsessid!="")lp_phpsessid=c.wxsessid;g_local_key=a;lpWriteKeyFile();LP.lplogincheck(true,null,c.wxusername,c.wxhash)}}else lploggedin||LP.lplogincheck(true)}
function reorderOnURL(c,a,f,d){var b=lpParseUri(a),e=lpcanonizeUrl(a,b),h=typeof b.path=="string"?b.path.split("/"):[],g=lp_gettld_url(a),j=[],k;for(k in c)if(check_ident_aid(k)){var i=g_sites[k];if(!(typeof i=="undefined"||typeof i.url=="undefined"))if(!(!i.save_all&&f&&i.unencryptedUsername==""&&i.password==""))if(!(d&&!accthaspassword(i))){var l=lpParseUri(i.url);i.realmmatch=a==g_basicauth_url&&(lpmdec(i.realm_data,true)==g_basicauth_realm||g_basicauth_found&&g_basicauth_realm==""&&i.basic_auth==
1);i.servermatch=b.host==l.host;i.portmatch=compare_ports(b,l);i.serverportmatch=i.servermatch&&i.portmatch?1:0;i.usernamematch=typeof g_username_vals[a]!="undefined"&&g_username_vals[a]!=""&&g_username_vals[a]==i.unencryptedUsername;i.urlmatch=lpcanonizeUrl(i.url)==e?true:false;l=typeof l.path=="string"?l.path.split("/"):[];var m;for(m=0;m<h.length&&m<l.length;m++)if(l[m]!=h[m])break;i.pathlevelmatch=m;i.fieldmatchcount=0;j.push(i)}}j.sort(lp_aids_sort_func);return j=checkurlrules(g_urlrules,j,g,
typeof b.path=="string"?b.path:"",b.host,g_sites,get_port(b))}
function lp_aids_sort_func(c,a){if(c.realmmatch!=a.realmmatch)return c.realmmatch?-1:1;else if(c.usernamematch!=a.usernamematch)return c.usernamematch?-1:1;else if(c.urlmatch!=a.urlmatch)return c.urlmatch?-1:1;else if(c.serverportmatch&&a.serverportmatch&&c.pathlevelmatch!=a.pathlevelmatch)return c.pathlevelmatch>a.pathlevelmatch?-1:1;else if(c.serverportmatch!=a.serverportmatch)return c.serverportmatch?-1:1;else if(c.servermatch!=a.servermatch)return c.servermatch?-1:1;else if(c.fieldmatchcount!=
a.fieldmatchcount)return c.fieldmatchcount>a.fieldmatchcount?-1:1;else if(c.last_touch!=a.last_touch)return c.last_touch>a.last_touch?-1:1;else if(c.name!=a.name)return c.name<a.name?-1:1;return 0}function lp_sort_case_insensitive_name(c,a){c=c.name.toLowerCase();a=a.name.toLowerCase();return c<a?-1:1}
function launchautologin(c,a){if(check_ident_aid(c)){var f=g_sites[c];if(f)!a&&(f.pwprotect||g_prompts.login_site_prompt)?security_prompt(function(){launchautologin(c,true)}):openURL(f.url,function(d,b){g_launches[gettabid(d)]=b},f.aid)}};