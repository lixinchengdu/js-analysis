var tz=document.getElementById("timezone");init_timezones();for(var i=0;i<all_timezones.length;i++){tz.options[tz.options.length]=new Option(all_timezones[i].name,all_timezones[i].value)}if(getBG().g_create_account_data){document.getElementById("email").value=getBG().g_create_account_data.email;document.getElementById("masterpassword").value=getBG().g_create_account_data.masterpassword;document.getElementById("passwordreminder").value=getBG().g_create_account_data.passwordreminder;document.getElementById("timezone").value=getBG().g_create_account_data.timezone;
document.getElementById("terms").checked=true;document.getElementById("data").checked=true;document.getElementById("history").checked=getBG().g_create_account_data.history;document.getElementById("improve").checked=getBG().g_create_account_data.improve}else{tz.value=calculate_time_zone(false)}document.getElementById("email").focus();update_password_meter(document.getElementById("email").value,document.getElementById("masterpassword").value);sr(document,"createanaccount","value","Create an Account");
sr(document,"nothanks","value","No Thanks");var dobeforeunload=true;function do_submit(){var C=document.getElementById("masterpassword").value;var B=document.getElementById("email").value;var A=document.getElementById("passwordreminder").value;if(welcome_email_check!=""&&welcome_email_check!="ok"){alert(welcome_email_check);return false}else{if(welcome_email_check==""&&B.length<5){alert(gs("Invalid email address, try again"));return false}}if(!document.getElementById("terms").checked){alert(gs("You must agree to the terms to continue"));
return false}if(!document.getElementById("data").checked){alert(gs("You must agree to send your encrypted data to LastPass.com.\n\nLastPass.com encrypts your data and sends it to its secure servers.\nNo one at LastPass can read your confidential data since it is encrypted using your\nsecret password and you are the only one who knows your password."));return false}if(C.length<6){alert(gs("Your password is too short. It must be at least 6 characters long"));return false}if(C==B){alert(gs("Your password can not be the same as your email."));
return false}if(C==A){alert(gs("Password reminder cannot match password"));return false}if(A.length==0){alert(gs("Please enter a Password Reminder"));return false}if(C=="password"||C=="123"||C=="1234"||C=="12345"||C=="123456"||C=="123123"||C=="letmein"||C=="pass"||C=="lastpass"||C=="lastpass.com"||C=="abc123"){alert(gs("Your password is easily guessable."));return false}dobeforeunload=false;getBG().g_create_account_data=new Array();getBG().g_create_account_data.email=B;getBG().g_create_account_data.masterpassword=C;
getBG().g_create_account_data.passwordreminder=A;getBG().g_create_account_data.timezone=document.getElementById("timezone").value;getBG().g_create_account_data.history=document.getElementById("history").checked;getBG().g_create_account_data.improve=document.getElementById("improve").checked;document.location.href="reenter_password.html"}var welcome_email_check="";function checkEmail(){var A=document.getElementById("email");if(A.value.length>0){welcome_email_check="";getBG().lpMakeRequest(getBG().base_url+"create_account.php?check=avail&username="+getBG().en(A.value),"",lpCheckEmailResponse)
}}function lpCheckEmailResponse(A){if(A.readyState==4&&A.status==200&&A.responseText){var B=A.responseText;if(B.indexOf("ok")>=0){welcome_email_check="ok"}else{if(B.indexOf("emailinvalid")>=0){welcome_email_check=gs("Invalid email address, try again")}else{welcome_email_check=gs("Email already in use, have you forgotten your password?")}}}};