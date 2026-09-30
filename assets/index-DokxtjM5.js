(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function a(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(n){if(n.ep)return;n.ep=!0;const l=a(n);fetch(n.href,l)}})();const ue="http://localhost:8000/api";async function I(t,e={}){const a=`${ue}${t}`,s={headers:{"Content-Type":"application/json",...e.headers},...e};try{const n=await fetch(a,s);if(!n.ok){const l=await n.json().catch(()=>({}));throw new Error(l.error||`HTTP error ${n.status}`)}return await n.json()}catch(n){throw console.warn(`API call ${t} failed, falling back to local store:`,n.message),n}}async function le(){try{return(await I("/auth/me")).user}catch{return JSON.parse(localStorage.getItem("scriptora_user")||"null")}}async function te(t){try{const e=await I("/auth/login",{method:"POST",body:JSON.stringify(t)});return localStorage.setItem("scriptora_user",JSON.stringify(e.user)),e.user}catch{const e={id:"user-1",name:t.email?t.email.split("@")[0]:"Arun Kumar",displayName:t.email?t.email.split("@")[0]:"Arun Kumar",email:t.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Narrative Director",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(e)),e}}async function pe(t){try{const e=await I("/auth/register",{method:"POST",body:JSON.stringify(t)});return localStorage.setItem("scriptora_user",JSON.stringify(e.user)),e.user}catch{const e={id:`user-${Date.now()}`,name:t.name||"New Writer",displayName:t.name||"New Writer",email:t.email||"writer@scriptora.studio",headline:"Screenwriter",badge:"Member Pro",initials:(t.name||"NW").slice(0,2).toUpperCase(),stats:{drafts:1,coAuthors:0,healthIndex:"100%"}};return localStorage.setItem("scriptora_user",JSON.stringify(e)),e}}async function xe(t){try{const e=await I("/auth/otp",{method:"POST",body:JSON.stringify({phone:t})});return localStorage.setItem("scriptora_user",JSON.stringify(e.user)),e.user}catch{const e={id:"user-phone",name:"Verified Writer",displayName:"Verified Writer",headline:"Screenwriter",email:t,badge:"Member Pro",initials:"VW",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(e)),e}}async function J(){try{await I("/auth/logout",{method:"POST"})}catch{}return localStorage.removeItem("scriptora_user"),!0}async function q(t=""){try{const e=t?`/scripts?q=${encodeURIComponent(t)}`:"/scripts";return(await I(e)).scripts}catch{const e=localStorage.getItem("scriptora_scripts");if(e){let a=JSON.parse(e);return t&&(a=a.filter(s=>s.title.toLowerCase().includes(t.toLowerCase()))),a}return[]}}async function ie(t){try{return(await I(`/scripts/${t}`)).script}catch{return(await q()).find(a=>a.id===t)||null}}async function fe(t){try{return(await I("/scripts",{method:"POST",body:JSON.stringify(t)})).script}catch{return{id:(t.title||"untitled").toLowerCase().replace(/[^a-z0-9]+/g,"-"),title:t.title||"Untitled Screenplay",draft:"Draft 1.0",genre:t.genre||"Drama",format:t.format||"Feature",industry:t.industry||"International / Hollywood",pages:1,updated:"Just now",currentScene:"Scene 1",joinCode:"SCRP-1001"}}}async function me(t,e){try{return(await I(`/scripts/${t}`,{method:"PUT",body:JSON.stringify(e)})).script}catch{return{id:t,...e,updated:"Just now"}}}async function be(t){try{return await I(`/scripts/${t}`,{method:"DELETE"})}catch{return{success:!0}}}async function ge(t){try{return(await I(`/scripts/${t}/duplicate`,{method:"POST"})).script}catch{const e=await ie(t);return{...e,id:`${t}-copy`,title:`${e?.title||"Script"} (Copy)`,updated:"Just now"}}}async function he(t){try{return await I(`/scripts/${t}/archive`,{method:"POST"})}catch{return{success:!0}}}async function ve(t,e){localStorage.setItem(`scriptora_screenplay_${t}`,JSON.stringify(e));try{return await I(`/screenplay/${t}`,{method:"PUT",body:JSON.stringify({screenplay:e})})}catch{return{success:!0}}}async function ye(t){try{return(await I(`/versions/${t}`)).versions}catch{return[{id:"v-4.2",name:"Draft 4.2",tag:"Current Active",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:"Refined Meera O.S. dialogue and hydro-sensor action line.",isCurrent:!0},{id:"v-3.0",name:"Draft 3.0",tag:"Production Polish",timestamp:"Yesterday, 4:15 PM",author:"JD",stats:"94 pages · 13,950 words",notes:"Incorporated director notes on floodgate transition pacing.",isCurrent:!1},{id:"v-2.0",name:"Draft 2.0",tag:"First Table Read",timestamp:"Oct 12, 2024",author:"JD",stats:"90 pages · 13,200 words",notes:"Table read revision for Acts I & II character arcs.",isCurrent:!1}]}}async function we(t,e){try{return(await I(`/versions/${t}`,{method:"POST",body:JSON.stringify(e)})).version}catch{return{id:`v-${Date.now()}`,name:e.name,tag:"Milestone Snapshot",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:e.notes||"",isCurrent:!0}}}async function Se(t){try{return(await I(`/collaborators/${t}`)).collaborators}catch{return[{id:"c-1",name:"Heamanth S.",email:"heamanth@studio.com",initials:"HS",role:"Editor",avatarBg:"bg-blue-100 text-blue-700",status:"Active",added:"2d ago"},{id:"c-2",name:"Elena Rostova",email:"elena@cineworks.io",initials:"ER",role:"Script Doctor",avatarBg:"bg-amber-100 text-amber-700",status:"Active",added:"1w ago"},{id:"c-3",name:"Marcus Vance",email:"vance.prod@paramount.com",initials:"MV",role:"Producer",avatarBg:"bg-purple-100 text-purple-700",status:"Viewer",added:"2w ago"}]}}async function Ee(t,e){try{return(await I(`/collaborators/${t}/invite`,{method:"POST",body:JSON.stringify(e)})).collaborator}catch{return{id:`c-${Date.now()}`,name:e.email.split("@")[0],email:e.email,initials:e.email.substring(0,2).toUpperCase(),role:e.role==="editor"?"Editor":"Viewer",avatarBg:"bg-emerald-100 text-emerald-700",status:"Active",added:"Just now"}}}async function Ie(t,e){try{return await I(`/collaborators/${t}/${e}`,{method:"DELETE"})}catch{return{success:!0}}}async function Ce(t){try{return(await I("/join-code/generate",{method:"POST",body:JSON.stringify({scriptId:t})})).joinCode}catch{return Math.random().toString(36).substring(2,6).toUpperCase()+"-"+Math.random().toString(36).substring(2,6).toUpperCase()}}async function ke(t){try{return await I("/join-code/validate",{method:"POST",body:JSON.stringify({code:t})})}catch{return(t||"").toUpperCase().trim()==="A7K9-XP42"?{valid:!0,script:{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",pages:96,collaboratorCount:3}}:{valid:!1,error:"Invalid or expired join code"}}}async function Be(t){try{return await I("/join-code/redeem",{method:"POST",body:JSON.stringify({code:t})})}catch{return{success:!0,scriptId:"chronicles-of-dust",title:"Chronicles of Dust"}}}async function oe(){try{return await I("/notifications")}catch{return{notifications:[{id:1,sender:"HS",senderName:"Heamanth",type:"collaboration_invite",title:"Heamanth invited you to collaborate",body:'Added you as an Editor on "Chronicles of Dust" (Draft 4.2).',time:"12m ago",group:"today",unread:!0,tags:["Draft 4.2","Role: Editor"],actionLabel:"Review Access →",actionRoute:"/profile/collaborators"},{id:2,sender:"icon:description",type:"export_ready",title:"Your export is ready",body:'"Chronicles of Dust (Draft 4.2)" exported as standard Industry PDF.',time:"45m ago",group:"today",unread:!0,tags:["PDF","96 Pages"],actionLabel:"Open Screenplay →",actionRoute:"/editor/chronicles-of-dust"},{id:3,sender:"AK",senderName:"Arun K.",type:"join_code_request",title:"Join-code access request",body:'Requested Editor access to "Anbin Mozhi" via join-code A7K9-XP42.',time:"2h ago",group:"today",unread:!0,tags:["Code: A7K9-XP42"],actionLabel:"Manage Collaborators →",actionRoute:"/profile/collaborators"}],unreadCount:3}}}async function je(t){try{return await I(`/notifications/${t}/read`,{method:"POST"})}catch{return{success:!0}}}async function Ae(){try{return await I("/notifications/read-all",{method:"POST"})}catch{return{success:!0}}}async function se(){return(await oe()).unreadCount||0}async function $e(t){try{const e=await I("/profile",{method:"PUT",body:JSON.stringify(t)});return localStorage.setItem("scriptora_user",JSON.stringify(e.profile)),e.profile}catch{const a={...await le()||{},...t};return localStorage.setItem("scriptora_user",JSON.stringify(a)),a}}async function Te(){try{return(await I("/settings")).settings}catch{const t=localStorage.getItem("scriptora_settings");return t?JSON.parse(t):{editor:{autoSceneHeading:!0,autoCharacter:!0,autoTransition:!0,enterAfterAction:!0,tabAfterAction:!0,autoCapitalize:!0,continueDialogue:!0,showSceneNumbers:!0,lockSceneNumbers:!1,fontSize:"Courier Prime 12pt",lineSpacing:"1.5 line",focusMode:!1},language:"English (US)",appearance:"Light",notifications:{collaborationInvites:!0,collaborationEdits:!0,mentions:!0,versionMilestones:!0},intelligence:{querySuggestions:!0,analysisSuggestions:!0}}}}async function Pe(t,e){try{return(await I(`/intelligence/${t}/context`,{method:"PUT",body:JSON.stringify(e)})).context}catch{return e}}async function re(t,e){try{return(await I("/intelligence/query",{method:"POST",body:JSON.stringify({query:t,scriptId:e})})).answer}catch{return"Analysis: In this screenplay, scene tempo and dialogue density align with core narrative milestones. Characters express distinct agendas in each beat."}}class Ne{constructor(){this.state={currentUser:null,selectedScriptId:localStorage.getItem("scriptora_selected_script")||"chronicles-of-dust",selectedVersionId:"Draft 4.2",currentSceneId:18,unreadNotifications:3,scripts:[],activeScript:null,screenplay:null,settings:null,historyStack:[]},this.listeners=new Set}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){for(const e of this.listeners)try{e(this.state)}catch(a){console.error("Store listener error:",a)}}setState(e){this.state={...this.state,...e},e.selectedScriptId&&localStorage.setItem("scriptora_selected_script",e.selectedScriptId),this.notify()}pushHistory(e){this.state.historyStack[this.state.historyStack.length-1]!==e&&this.state.historyStack.push(e)}getPreviousRoute(e="/workspace"){return this.state.historyStack.length>1?(this.state.historyStack.pop(),this.state.historyStack.pop()):e}async init(){try{const e=await le(),a=await q(),s=await se(),n=await Te(),l=a.find(u=>u.id===this.state.selectedScriptId)||a[0];this.setState({currentUser:e,scripts:a,activeScript:l,unreadNotifications:s,settings:n})}catch(e){console.error("Init store error:",e)}}async selectScript(e){const a=this.state.scripts.find(s=>s.id===e)||await ie(e);this.setState({selectedScriptId:e,activeScript:a})}async refreshNotifications(){const e=await se();this.setState({unreadNotifications:e})}async refreshScripts(){const e=await q(),a=e.find(s=>s.id===this.state.selectedScriptId)||e[0];this.setState({scripts:e,activeScript:a})}}const i=new Ne;function f(t,e="success"){const a=document.getElementById("global-toast"),s=document.getElementById("toast-message"),n=document.getElementById("toast-icon");if(!a||!s){console.log(`[Toast ${e}]`,t);return}s.textContent=t,n&&(e==="error"?(n.textContent="error",n.className="material-symbols-outlined text-[18px] text-red-400"):e==="info"?(n.textContent="info",n.className="material-symbols-outlined text-[18px] text-blue-300"):(n.textContent="check_circle",n.className="material-symbols-outlined text-[18px] text-emerald-300")),a.classList.remove("opacity-0","pointer-events-none"),a.classList.add("opacity-100"),clearTimeout(a._timeout),a._timeout=setTimeout(()=>{a.classList.remove("opacity-100"),a.classList.add("opacity-0","pointer-events-none")},2400)}function Le(){return`
    <main class="flex flex-col relative w-full pt-safe pb-safe bg-surface min-h-screen justify-center items-center px-4">
      <div class="flex flex-col w-full max-w-sm py-8 fade-in">
        <!-- Brand & Logo Header -->
        <header class="flex flex-col items-center justify-center pb-4 text-center">
          <img src="/assets/scriptora-logo.png" alt="Scriptora Logo" class="w-16 h-16 object-contain mb-3 drop-shadow-sm" />
          <h1 class="text-on-surface tracking-tight font-heading text-2xl font-bold">
            Where stories take shape.
          </h1>
          <p class="font-body text-xs text-on-surface-variant mt-1 max-w-xs">
            Enter your credentials to continue to your screenplay workspace.
          </p>
        </header>

        <!-- Segmented Flow Switcher -->
        <div class="w-full bg-surface-container rounded-xl p-1 flex items-center mb-4 text-xs font-semibold">
          <button class="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs" id="tab-signin">
            Sign In
          </button>
          <button class="flex-1 py-2 text-center rounded-lg transition-all duration-150 text-on-surface-variant hover:text-on-surface" id="tab-register">
            Create ID
          </button>
          <button class="flex-1 py-2 text-center rounded-lg transition-all duration-150 text-on-surface-variant hover:text-on-surface flex items-center justify-center gap-1" id="tab-otp">
            <span class="material-symbols-outlined text-[15px]">sms</span>
            <span>OTP</span>
          </button>
        </div>

        <!-- Primary Form Card -->
        <div class="w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-5 relative overflow-hidden">
          
          <!-- Flow 1: Sign In -->
          <div id="flow-signin" class="flex flex-col gap-3.5">
            <!-- Fast Social Connect -->
            <button id="btn-google-login" class="w-full h-11 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-xl flex items-center justify-center gap-2.5 font-button text-xs font-semibold transition-all border border-slate-200/80 active:scale-[0.99]" type="button">
              <svg class="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
              </svg>
              <span>Continue with Google</span>
            </button>

            <!-- Divider -->
            <div class="flex items-center gap-2.5 my-0.5">
              <div class="h-px bg-slate-200 flex-1"></div>
              <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">or with credentials</span>
              <div class="h-px bg-slate-200 flex-1"></div>
            </div>

            <!-- Credentials Form -->
            <form id="form-signin" class="flex flex-col gap-3">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-600">Studio Email</label>
                <div class="relative flex items-center">
                  <span class="material-symbols-outlined absolute left-3 text-slate-400 text-[18px]">alternate_email</span>
                  <input id="signin-email" class="w-full h-10 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 text-slate-900" placeholder="name@studio.com" value="arun.kumar@scriptora.studio" required type="email">
                </div>
              </div>

              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <label class="text-[11px] font-semibold text-slate-600">Password</label>
                  <button type="button" id="btn-forgot-pw" class="text-[11px] text-blue-600 hover:underline">Forgot?</button>
                </div>
                <div class="relative flex items-center">
                  <span class="material-symbols-outlined absolute left-3 text-slate-400 text-[18px]">lock</span>
                  <input id="signin-password" class="w-full h-10 pl-9 pr-10 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 text-slate-900" placeholder="••••••••••••" value="scriptora2026" required type="password">
                  <button type="button" id="toggle-pw-signin" class="absolute right-3 text-slate-400 hover:text-slate-600">
                    <span class="material-symbols-outlined text-[18px]">visibility</span>
                  </button>
                </div>
              </div>

              <button class="mt-2 w-full h-11 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all" type="submit">
                <span>Continue to Workspace</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </form>
          </div>

          <!-- Flow 2: Register -->
          <div id="flow-register" class="hidden flex flex-col gap-3.5">
            <div class="flex flex-col">
              <span class="font-bold text-sm text-slate-900">Join the Production Guild</span>
              <span class="text-xs text-slate-500">Structured scene architecture and script intelligence.</span>
            </div>

            <form id="form-register" class="flex flex-col gap-3">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-600">Full Name</label>
                <div class="relative flex items-center">
                  <span class="material-symbols-outlined absolute left-3 text-slate-400 text-[18px]">person</span>
                  <input id="reg-name" class="w-full h-10 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 text-slate-900" placeholder="Maya Lin" required type="text">
                </div>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-600">Studio Email</label>
                <div class="relative flex items-center">
                  <span class="material-symbols-outlined absolute left-3 text-slate-400 text-[18px]">mail</span>
                  <input id="reg-email" class="w-full h-10 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 text-slate-900" placeholder="writer@studio.com" required type="email">
                </div>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-600">Create Password</label>
                <div class="relative flex items-center">
                  <span class="material-symbols-outlined absolute left-3 text-slate-400 text-[18px]">lock</span>
                  <input id="reg-password" class="w-full h-10 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 text-slate-900" placeholder="Min. 8 characters" required type="password">
                </div>
              </div>

              <button class="mt-2 w-full h-11 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all" type="submit">
                <span>Create Filmmaker ID</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </form>
          </div>

          <!-- Flow 3: Phone OTP -->
          <div id="flow-otp" class="hidden flex flex-col gap-3.5">
            <div class="flex flex-col">
              <span class="font-bold text-sm text-slate-900">Mobile Verification</span>
              <span class="text-xs text-slate-500">Sign in with an instant one-time security code.</span>
            </div>

            <form id="form-otp" class="flex flex-col gap-3">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-600">Mobile Number</label>
                <div class="relative flex items-center">
                  <span class="material-symbols-outlined absolute left-3 text-slate-400 text-[18px]">phone_iphone</span>
                  <input id="otp-phone" class="w-full h-10 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 text-slate-900" placeholder="+1 (555) 000-0000" value="+1 (555) 019-2831" required type="tel">
                </div>
              </div>

              <div class="flex flex-col gap-1" id="otp-code-container">
                <label class="text-[11px] font-semibold text-slate-600">6-Digit Code</label>
                <input id="otp-code" class="w-full h-10 px-3 text-center tracking-widest font-mono text-base font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 text-slate-900" placeholder="842910" maxlength="6" value="842910" type="text">
              </div>

              <button class="mt-2 w-full h-11 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all" type="submit">
                <span>Verify & Continue</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </form>
          </div>

        </div>

        <!-- Footer -->
        <p class="text-center text-xs text-slate-400 mt-4">
          Scriptora Studio Engine v1.0.4 · Production Standard
        </p>
      </div>
    </main>
  `}function Me(t){const e=document.getElementById("tab-signin"),a=document.getElementById("tab-register"),s=document.getElementById("tab-otp"),n=document.getElementById("flow-signin"),l=document.getElementById("flow-register"),u=document.getElementById("flow-otp");function r(b){[e,a,s].forEach(v=>{v.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 text-on-surface-variant hover:text-on-surface"}),[n,l,u].forEach(v=>v.classList.add("hidden")),b==="signin"?(e.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",n.classList.remove("hidden")):b==="register"?(a.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",l.classList.remove("hidden")):b==="otp"&&(s.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold flex items-center justify-center gap-1",u.classList.remove("hidden"))}e&&(e.onclick=()=>r("signin")),a&&(a.onclick=()=>r("register")),s&&(s.onclick=()=>r("otp"));const c=document.getElementById("toggle-pw-signin"),o=document.getElementById("signin-password");c&&o&&(c.onclick=()=>{const b=o.type==="password";o.type=b?"text":"password",c.innerHTML=`<span class="material-symbols-outlined text-[18px]">${b?"visibility_off":"visibility"}</span>`});const d=document.getElementById("btn-google-login");d&&(d.onclick=async()=>{f("Connecting with Google...");const b=await te({email:"arun.kumar@scriptora.studio",provider:"google"});i.setState({currentUser:b}),t("/welcome")});const y=document.getElementById("form-signin");y&&(y.onsubmit=async b=>{b.preventDefault();const v=document.getElementById("signin-email").value,w=o.value;try{const p=await te({email:v,password:w});i.setState({currentUser:p}),f(`Welcome back, ${p.displayName||p.name}`),t("/welcome")}catch(p){f(p.message,"error")}});const m=document.getElementById("form-register");m&&(m.onsubmit=async b=>{b.preventDefault();const v=document.getElementById("reg-name").value,w=document.getElementById("reg-email").value,p=document.getElementById("reg-password").value;try{const B=await pe({name:v,email:w,password:p});i.setState({currentUser:B}),f("Account created successfully"),t("/welcome")}catch(B){f(B.message,"error")}});const h=document.getElementById("form-otp");h&&(h.onsubmit=async b=>{b.preventDefault();const v=document.getElementById("otp-phone").value;try{const w=await xe(v);i.setState({currentUser:w}),f("Phone verified successfully"),t("/welcome")}catch(w){f(w.message,"error")}});const E=document.getElementById("btn-forgot-pw");E&&(E.onclick=()=>{f("Password reset link sent to registered email","info")})}function _e(){return i.state.currentUser,`
    <main class="flex-1 flex flex-col relative w-full pt-safe pb-safe bg-surface min-h-screen">
      <div class="flex flex-col w-full min-h-screen px-4 justify-between items-center text-center select-none py-6 max-w-sm mx-auto flex-1 fade-in">
        
        <!-- Top Utility Bar -->
        <div class="w-full flex items-center justify-between text-secondary px-1">
          <button id="welcome-sign-out" class="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors">
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Sign out</span>
          </button>
          <div class="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-full text-slate-600 text-xs font-medium">
            <span class="material-symbols-outlined text-blue-600 text-[14px]">check_circle</span>
            <span>Authenticated</span>
          </div>
        </div>

        <!-- Center Cohesive Cluster -->
        <div class="flex flex-col items-center justify-center my-auto w-full py-4">
          <!-- Logo Emblem -->
          <img src="/assets/scriptora-logo.png" alt="Scriptora Logo" class="w-20 h-20 object-contain mb-5 drop-shadow-sm" />

          <!-- Main Editorial Display Statement -->
          <h1 class="font-display-mobile text-2xl sm:text-3xl text-slate-900 font-bold tracking-tight leading-tight">
            Write what you see.<br>
            <span class="text-slate-500">Understand what you wrote.</span>
          </h1>

          <!-- Refined Supporting Copy -->
          <p class="font-body text-xs sm:text-sm text-slate-600 mt-3 max-w-xs leading-relaxed">
            A focused workspace for writing, understanding, and refining your screenplay with cinematic precision.
          </p>

          <!-- Script Page Metadata Tag -->
          <div class="mt-4 flex items-center gap-2.5 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
            <span>DRAFT 1.0</span>
            <span class="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>COURIER PRIME</span>
            <span class="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>110 PAGES</span>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col w-full mt-6 gap-2.5">
            <!-- Primary CTA: Start Writing -->
            <a href="/workspace" class="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-3.5 px-4 rounded-xl font-medium text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 no-underline cursor-pointer" id="btn-start">
              <span>Start Writing</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <!-- Secondary CTA: Import Existing Script -->
            <a href="/intelligence/select" class="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3.5 px-4 rounded-xl font-medium text-xs sm:text-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2 no-underline cursor-pointer" id="btn-import">
              <span class="material-symbols-outlined text-slate-500 text-[18px]">upload_file</span>
              <span>I already have a script</span>
            </a>
          </div>
        </div>

        <!-- Bottom Engine Footer -->
        <div class="flex items-center justify-center gap-1.5 opacity-60 pb-2">
          <span class="material-symbols-outlined text-slate-500 text-[13px]">auto_awesome</span>
          <p class="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
            Screenplay Intelligence Engine · v1.0
          </p>
        </div>

      </div>
    </main>
  `}function De(t){const e=document.getElementById("welcome-sign-out");e&&(e.onclick=async()=>{await J(),i.setState({currentUser:null}),f("Signed out successfully"),t("/auth")})}function $(t="Workspace",e="Your writing space."){const a=i.state.unreadNotifications,s=i.state.currentUser?.initials||"JD";return`
    <header class="fixed top-0 w-full z-40 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-surface-container-high/60">
      <div class="h-14 px-4 flex items-center justify-between max-w-2xl mx-auto">
        <a href="/workspace" class="flex items-center gap-2.5 min-w-0 no-underline text-inherit cursor-pointer active:opacity-80 transition-opacity">
          <img src="/assets/scriptora-logo.png" alt="Scriptora" class="w-8 h-8 object-contain shrink-0" />
          <div class="flex flex-col min-w-0 leading-tight">
            <span class="font-heading font-bold text-base tracking-tight text-on-surface">Scriptora</span>
            <span class="text-[11px] text-slate-500 font-medium truncate">${t}</span>
          </div>
        </a>

        <div class="flex items-center gap-2">
          <!-- Notification Bell connecting to /notifications -->
          <a href="/notifications" class="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-on-surface hover:bg-slate-100 transition-colors" aria-label="Notifications" id="header-notif-btn">
            <span class="material-symbols-outlined text-[20px]">notifications</span>
            ${a>0?'<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white animate-pulse"></span>':""}
          </a>

          <!-- Profile Avatar connecting to /profile -->
          <a href="/profile" class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs shadow-xs hover:bg-blue-700 active:scale-95 transition-all no-underline" aria-label="User account" id="header-profile-btn">
            <span>${s}</span>
          </a>
        </div>
      </div>
    </header>
  `}function T(t="workspace"){const e=t==="workspace",a=t==="intelligence",s=t==="profile";return`
    <nav class="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container-high/60">
      <div class="h-14 px-6 flex items-center justify-around max-w-2xl mx-auto">
        <!-- 1. Workspace Tab -->
        <a href="/workspace" class="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${e?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-workspace">
          <span class="material-symbols-outlined text-[22px]" ${e?`style="font-variation-settings: 'FILL' 1;"`:""}>description</span>
          <span class="text-[11px] font-medium mt-0.5">Workspace</span>
          ${e?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':""}
        </a>

        <!-- 2. Intelligence Tab -->
        <a href="/intelligence" class="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${a?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-intelligence">
          <span class="material-symbols-outlined text-[22px]" ${a?`style="font-variation-settings: 'FILL' 1;"`:""}>insights</span>
          <span class="text-[11px] font-medium mt-0.5">Intelligence</span>
          ${a?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':""}
        </a>

        <!-- 3. Profile Tab -->
        <a href="/profile" class="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${s?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-profile">
          <span class="material-symbols-outlined text-[22px]" ${s?`style="font-variation-settings: 'FILL' 1;"`:""}>account_circle</span>
          <span class="text-[11px] font-medium mt-0.5">Profile</span>
          ${s?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':""}
        </a>
      </div>
    </nav>
  `}function Oe(){const t=i.state.scripts||[],e=t.find(s=>s.isCurrentDraft)||t[0],a=t.slice(0,3);return`
    ${$("Workspace","Your writing space.")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-3 pb-8 space-y-5 fade-in">
        
        <!-- Header Title & Telemetry -->
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold tracking-tight text-slate-900 font-heading">Workspace</h1>
            <p class="text-xs text-slate-500 mt-0.5">Your writing space.</p>
          </div>
          <div class="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Sync active</span>
          </div>
        </div>

        <!-- Current Draft Spotlight Card -->
        ${e?`
          <div class="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="bg-blue-100/70 text-blue-700 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">CURRENT DRAFT</span>
              <span class="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <span class="material-symbols-outlined text-[13px]">schedule</span>
                ${e.updated||"Recently"}
              </span>
            </div>
            <h2 class="font-semibold text-base text-slate-900 mt-2 font-heading tracking-tight">${e.title}</h2>
            <p class="text-xs text-slate-500 mt-0.5">${e.draft} · ${e.currentScene||"Scene 1"} · ${e.pages} pages</p>
            
            <div class="rounded-xl p-3 mt-3 bg-slate-50 border border-slate-100">
              <div class="flex items-center justify-between text-xs font-bold text-blue-600 uppercase tracking-wider">
                <span>${e.currentScene||"SCENE 1"}</span>
                <span class="material-symbols-outlined text-[15px] text-slate-400">movie</span>
              </div>
              <p class="font-mono italic text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                "INT. CUSTOMS OFFICE - NIGHT - Kevin kneels over cracked hydro-sensor junction box, static..."
              </p>
            </div>

            <button type="button" id="btn-continue-writing" data-script-id="${e.id}" class="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-medium text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 mt-3 shadow-xs transition-all">
              <span>Continue Writing (${e.currentScene||"Scene 18"})</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        `:""}

        <!-- Recent Screenplays -->
        <div class="flex flex-col">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-bold text-slate-900 tracking-tight font-heading">Recent</h3>
            <button type="button" id="btn-new-script" class="inline-flex items-center gap-1 text-blue-600 bg-blue-50 hover:bg-blue-100 active:scale-95 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all">
              <span class="material-symbols-outlined text-[14px]">add</span>
              <span>New Script</span>
            </button>
          </div>

          <div class="bg-white rounded-xl border border-slate-100 shadow-sm divide-y divide-slate-100 overflow-hidden" id="recent-scripts-list">
            ${a.map(s=>`
              <div data-script-id="${s.id}" class="script-item-row px-3.5 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
                <div class="flex items-center gap-3 min-w-0 pr-2">
                  <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[18px]">description</span>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-semibold text-slate-900 truncate">${s.title}</span>
                      <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">${s.genre}</span>
                    </div>
                    <span class="text-[11px] text-slate-500 truncate mt-0.5">${s.draft} · ${s.pages} pages · Edited ${s.updated}</span>
                  </div>
                </div>
                <span class="material-symbols-outlined text-[16px] text-slate-400 shrink-0">chevron_right</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- All Screenplays -->
        <div class="flex flex-col">
          <div class="flex items-center justify-between mb-2.5">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-bold text-slate-900 tracking-tight font-heading">Screenplays</h3>
              <span class="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-medium" id="total-scripts-badge">${t.length} total</span>
            </div>
            <button type="button" id="sort-scripts-btn" class="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-0.5 font-medium">
              <span>Recent</span>
              <span class="material-symbols-outlined text-[15px]">expand_more</span>
            </button>
          </div>

          <!-- Search Bar -->
          <div class="relative mb-3">
            <span class="material-symbols-outlined text-[17px] text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">search</span>
            <input type="text" id="screenplay-search" placeholder="Search screenplays..." class="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs">
          </div>

          <!-- Scripts Library Container -->
          <div class="bg-white rounded-xl border border-slate-100 shadow-sm divide-y divide-slate-100 overflow-hidden" id="screenplays-library-list">
            ${t.map(s=>`
              <div data-script-id="${s.id}" class="script-item-row px-3.5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                <div class="flex items-center gap-3 min-w-0 pr-2 flex-1">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <span class="material-symbols-outlined text-[16px]">movie</span>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span class="text-xs font-semibold text-slate-900 truncate">${s.title}</span>
                    <span class="text-[11px] text-slate-500 truncate mt-0.5">${s.draft} · ${s.pages} pages · Edited ${s.updated}</span>
                  </div>
                </div>

                <div class="relative">
                  <button type="button" class="script-more-btn w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" data-script-id="${s.id}" aria-label="More actions">
                    <span class="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- Footer Actions -->
          <div class="flex items-center justify-between mt-3 px-1">
            <span class="text-[11px] text-slate-400">Showing all active scripts</span>
            <button type="button" id="btn-export-library" class="text-[11px] text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 active:scale-95 transition-transform">
              <span class="material-symbols-outlined text-[14px]">download</span>
              <span>Export Library</span>
            </button>
          </div>
        </div>

      </div>
    </main>

    <!-- New Script Modal -->
    <div id="new-script-modal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden items-end sm:items-center justify-center p-0 sm:p-4">
      <div class="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 shadow-xl flex flex-col gap-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px]">movie_edit</span>
            </div>
            <h3 class="font-bold text-base text-slate-900">Create New Screenplay</h3>
          </div>
          <button id="close-new-script-modal" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form id="form-new-script" class="flex flex-col gap-3">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-semibold text-slate-700">Screenplay Title</label>
            <input type="text" id="new-script-title" placeholder="e.g. Echoes of Tomorrow" required class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-semibold text-slate-700">Format</label>
              <select id="new-script-format" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-blue-600">
                <option value="Feature">Feature Film</option>
                <option value="Short">Short Film</option>
                <option value="Pilot">Television Pilot</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs font-semibold text-slate-700">Genre</label>
              <select id="new-script-genre" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-blue-600">
                <option value="Drama">Drama</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Thriller">Thriller</option>
                <option value="Comedy">Comedy</option>
                <option value="Action">Action</option>
              </select>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <button type="button" id="cancel-new-script-btn" class="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200">Cancel</button>
            <button type="submit" class="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs">Create & Write</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Script Options Menu Popover -->
    <div id="script-menu-popover" class="fixed z-50 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 w-44 hidden">
      <button class="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2" id="menu-opt-open">
        <span class="material-symbols-outlined text-[16px] text-blue-600">edit_document</span>
        <span>Open in Editor</span>
      </button>
      <button class="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2" id="menu-opt-rename">
        <span class="material-symbols-outlined text-[16px] text-slate-500">drive_file_rename_outline</span>
        <span>Rename</span>
      </button>
      <button class="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2" id="menu-opt-duplicate">
        <span class="material-symbols-outlined text-[16px] text-slate-500">content_copy</span>
        <span>Duplicate</span>
      </button>
      <button class="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2" id="menu-opt-archive">
        <span class="material-symbols-outlined text-[16px] text-slate-500">archive</span>
        <span>Archive</span>
      </button>
      <div class="h-px bg-slate-100 my-1"></div>
      <button class="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2" id="menu-opt-delete">
        <span class="material-symbols-outlined text-[16px] text-red-500">delete</span>
        <span>Delete Script</span>
      </button>
    </div>

    ${T("workspace")}
  `}function Re(t){let e=null;const a=document.getElementById("btn-continue-writing");a&&(a.onclick=()=>{const m=a.getAttribute("data-script-id");i.selectScript(m),t(`/editor/${m}?scene=18`)}),document.querySelectorAll(".script-item-row").forEach(m=>{m.onclick=h=>{if(h.target.closest(".script-more-btn"))return;const E=m.getAttribute("data-script-id");i.selectScript(E),t(`/editor/${E}`)}});const s=document.getElementById("screenplay-search");s&&(s.oninput=m=>{const h=m.target.value.toLowerCase().trim();document.querySelectorAll("#screenplays-library-list .script-item-row").forEach(b=>{const v=b.querySelector(".font-semibold")?.textContent.toLowerCase()||"";b.style.display=v.includes(h)?"flex":"none"})});const n=document.getElementById("btn-new-script"),l=document.getElementById("new-script-modal"),u=document.getElementById("close-new-script-modal"),r=document.getElementById("cancel-new-script-btn"),c=document.getElementById("form-new-script");function o(m){l&&(m?(l.classList.remove("hidden"),l.classList.add("flex"),document.getElementById("new-script-title")?.focus()):(l.classList.add("hidden"),l.classList.remove("flex")))}n&&(n.onclick=()=>o(!0)),u&&(u.onclick=()=>o(!1)),r&&(r.onclick=()=>o(!1)),c&&(c.onsubmit=async m=>{m.preventDefault();const h=document.getElementById("new-script-title").value.trim(),E=document.getElementById("new-script-format").value,b=document.getElementById("new-script-genre").value;if(h)try{const v=await fe({title:h,format:E,genre:b});await i.refreshScripts(),i.selectScript(v.id),o(!1),f(`Created "${v.title}"`),t(`/editor/${v.id}`)}catch(v){f(v.message,"error")}});const d=document.getElementById("script-menu-popover");document.querySelectorAll(".script-more-btn").forEach(m=>{m.onclick=h=>{h.stopPropagation(),e=m.getAttribute("data-script-id");const E=m.getBoundingClientRect();d.style.top=`${E.bottom+window.scrollY+4}px`,d.style.left=`${Math.min(E.left-130,window.innerWidth-180)}px`,d.classList.remove("hidden")}}),window.onclick=m=>{!m.target.closest("#script-menu-popover")&&!m.target.closest(".script-more-btn")&&d?.classList.add("hidden")},document.getElementById("menu-opt-open")?.addEventListener("click",()=>{d.classList.add("hidden"),e&&(i.selectScript(e),t(`/editor/${e}`))}),document.getElementById("menu-opt-rename")?.addEventListener("click",async()=>{d.classList.add("hidden");const m=prompt("Enter new title for this screenplay:");m&&m.trim()&&(await me(e,{title:m.trim()}),await i.refreshScripts(),f("Screenplay renamed"),t("/workspace"))}),document.getElementById("menu-opt-duplicate")?.addEventListener("click",async()=>{d.classList.add("hidden"),await ge(e),await i.refreshScripts(),f("Screenplay duplicated"),t("/workspace")}),document.getElementById("menu-opt-archive")?.addEventListener("click",async()=>{d.classList.add("hidden"),await he(e),await i.refreshScripts(),f("Screenplay archived"),t("/workspace")}),document.getElementById("menu-opt-delete")?.addEventListener("click",async()=>{d.classList.add("hidden"),confirm("Are you sure you want to delete this screenplay? This action cannot be undone.")&&(await be(e),await i.refreshScripts(),f("Screenplay deleted"),t("/workspace"))});const y=document.getElementById("btn-export-library");y&&(y.onclick=()=>{const m="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(i.state.scripts,null,2)),h=document.createElement("a");h.setAttribute("href",m),h.setAttribute("download",`scriptora_library_${Date.now()}.json`),document.body.appendChild(h),h.click(),h.remove(),f("Exported library manifest (.json)")})}function Fe(t,e=null){const a=i.state.scripts.find(n=>n.id===t)||i.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2"},s=i.state.currentUser?.initials||"JD";return`
    <div id="editor-wrapper" class="flex flex-col min-h-screen bg-surface w-full relative transition-all duration-200">
      
      <!-- Top Fixed Editor Header -->
      <header id="editor-header" class="fixed top-0 w-full z-40 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-slate-100 transition-transform duration-200">
        <div class="h-12 px-3 flex items-center justify-between max-w-4xl mx-auto">
          <div class="flex items-center gap-1.5 min-w-0">
            <!-- Back to Workspace button -->
            <button aria-label="Back to Workspace" id="editor-back-btn" class="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors">
              <span class="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div class="flex items-center gap-2 select-none min-w-0">
              <img src="/assets/scriptora-logo.png" alt="Scriptora" class="w-7 h-7 object-contain shrink-0" />
              <div class="flex flex-col min-w-0 leading-tight">
                <span class="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate">${a.title}</span>
                <span class="text-[10px] text-slate-500 truncate" id="editor-save-status">Autosaved Just now</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1.5 shrink-0">
            <!-- Collaborators Link -->
            <a href="/profile/collaborators" aria-label="Collaborators" class="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors no-underline">
              <span class="material-symbols-outlined text-[19px]">group</span>
            </a>
            <!-- User Avatar -->
            <a href="/profile" aria-label="User profile" class="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center shadow-xs no-underline">
              ${s}
            </a>
          </div>
        </div>
      </header>

      <!-- Main Editor Container -->
      <main class="flex flex-col relative w-full pt-12 pb-safe bg-surface min-h-screen">
        <div class="flex flex-col w-full max-w-4xl mx-auto pb-8">
          
          <!-- Sub-header Toolbar Strip -->
          <div id="editor-toolbar-strip" class="w-full bg-slate-100/70 border-b border-slate-200/60 px-3 py-1.5 flex flex-col gap-1.5 transition-all">
            <div class="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 text-nowrap">
              <!-- Production Button -->
              <button id="btn-open-production" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200/80 hover:bg-slate-50 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-[15px] text-blue-600">movie</span>
                <span>Production</span>
              </button>

              <!-- Export Button -->
              <button id="exportModalBtn" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200/80 hover:bg-slate-50 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-[15px] text-blue-600">ios_share</span>
                <span>Export (PDF/FDX)</span>
              </button>

              <!-- Scene #s Toggle -->
              <button id="sceneNumberToggle" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-caption text-xs font-semibold border border-blue-200/80 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-[15px]">pin</span>
                <span id="sceneNumberToggleText">Scene #s: On</span>
              </button>

              <!-- Focus Mode Toggle -->
              <button id="focusModeToggle" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200/80 hover:bg-slate-50 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-[15px]">center_focus_strong</span>
                <span id="focusModeText">Focus Mode</span>
              </button>

              <!-- Language Toggle -->
              <button id="langToggleBtn" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200/80 hover:bg-slate-50 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-[15px] text-blue-600">translate</span>
                <span id="langToggleText">EN / தமிழ்</span>
              </button>

              <!-- Versions Button -->
              <button id="versionsModalBtn" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs font-medium border border-slate-200/80 hover:bg-slate-50 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-[14px] text-blue-600">history</span>
                <span id="currentVersionTag">${a.draft||"Draft 4.2"}</span>
              </button>
            </div>
          </div>

          <!-- Scene Jump & Formatting Accessory Tray -->
          <div id="editor-accessory-tray" class="w-full bg-white border-b border-slate-200 px-3 py-2 flex flex-col gap-2 shadow-xs z-30 transition-all">
            <div class="flex items-center justify-between pb-0.5">
              <div class="flex items-center gap-1">
                <button aria-label="Undo" id="btn-undo" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all">
                  <span class="material-symbols-outlined text-[18px]">undo</span>
                </button>
                <button aria-label="Redo" id="btn-redo" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all">
                  <span class="material-symbols-outlined text-[18px]">redo</span>
                </button>
                <button id="btn-insert-intext" class="px-2.5 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 text-xs font-semibold active:scale-95 transition-all">
                  INT/EXT
                </button>
              </div>

              <div class="flex items-center gap-1.5">
                <!-- Scene Jump Selector -->
                <div class="relative">
                  <select id="sceneJumpSelect" class="h-8 pl-3 pr-7 rounded-full bg-blue-600 text-white font-caption text-xs uppercase font-semibold appearance-none cursor-pointer focus:outline-none shadow-xs">
                    <option value="scene-18">SCENE 18</option>
                    <option value="scene-19">SCENE 19</option>
                    <option value="scene-1">SCENE 1</option>
                  </select>
                  <span class="material-symbols-outlined text-[14px] text-white absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
                </div>

                <button id="screenplayDualBtn" class="px-2.5 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center gap-1 text-slate-700 text-xs font-medium active:scale-95 transition-all" title="Dual Dialogue">
                  <span class="material-symbols-outlined text-[16px]">splitscreen</span>
                  <span>Dual</span>
                </button>
              </div>
            </div>

            <!-- Grammar Semantic Element Buttons -->
            <div class="flex items-center justify-between gap-1 overflow-x-auto scrollbar-none py-0.5">
              <button class="format-btn flex-1 min-w-[56px] py-1.5 px-2 rounded-lg bg-blue-600 text-white text-xs flex items-center justify-center gap-1 shrink-0 shadow-xs active:opacity-90 font-medium" data-type="action">
                <span class="material-symbols-outlined text-[15px]">edit_note</span>
                <span>Act</span>
              </button>
              <button class="format-btn flex-1 min-w-[56px] py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs flex items-center justify-center gap-1 shrink-0 font-medium active:bg-blue-600 active:text-white transition-colors" data-type="scene">
                <span class="material-symbols-outlined text-[15px]">label</span>
                <span>Scen</span>
              </button>
              <button class="format-btn flex-1 min-w-[56px] py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs flex items-center justify-center gap-1 shrink-0 font-medium active:bg-blue-600 active:text-white transition-colors" data-type="character">
                <span class="material-symbols-outlined text-[15px]">person</span>
                <span>Char</span>
              </button>
              <button class="format-btn flex-1 min-w-[56px] py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs flex items-center justify-center gap-1 shrink-0 font-medium active:bg-blue-600 active:text-white transition-colors" data-type="dialogue">
                <span class="material-symbols-outlined text-[15px]">chat_bubble</span>
                <span>Dia</span>
              </button>
              <button class="format-btn flex-1 min-w-[56px] py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs flex items-center justify-center gap-1 shrink-0 font-medium active:bg-blue-600 active:text-white transition-colors" data-type="parenthetical">
                <span class="material-symbols-outlined text-[15px]">format_quote</span>
                <span>Para</span>
              </button>
            </div>
          </div>

          <!-- THE PHYSICAL SCREENPLAY PAGE -->
          <div class="px-2 sm:px-4 py-4 flex justify-center">
            <div id="screenplay-page" class="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 sm:p-10 flex flex-col font-courier text-[14px] sm:text-[15px] leading-[22px] sm:leading-[24px] text-slate-900 border border-slate-100">
              
              <!-- SCENE 18 -->
              <div id="anchor-scene-18" class="flex items-baseline justify-between py-2 font-bold text-slate-900 mb-3 border-b border-transparent">
                <span class="scene-num-indicator mr-3 shrink-0 text-slate-500 font-bold">18</span>
                <span class="flex-1 tracking-wide uppercase outline-none" contenteditable="true" id="slugline-18">INT. CUSTOMS OFFICE - NIGHT</span>
                <span class="scene-num-indicator ml-3 shrink-0 text-slate-500 font-bold">18</span>
              </div>

              <!-- Action Paragraph -->
              <p class="mb-4 text-slate-900 text-justify outline-none p-1 rounded focus:bg-blue-50/50" contenteditable="true" id="action-1">
                Kevin kneels over the cracked hydro-sensor junction box. Static hiss whispers through the damp comm-link. A lone flicker illuminates the tarnished brass seal.
              </p>

              <!-- Action Paragraph 2 -->
              <p class="mb-5 text-slate-900 text-justify outline-none p-1 rounded focus:bg-blue-50/50" contenteditable="true" id="action-2">
                Water droplets bead along the corroded circuit wires. He slides a copper probe between the connectors.
              </p>

              <!-- Character Cue 1 -->
              <div class="w-full flex justify-center mt-2 mb-0">
                <p class="w-7/12 uppercase tracking-wider font-bold text-center outline-none" contenteditable="true">
                  KEVIN
                </p>
              </div>

              <!-- Parenthetical -->
              <div class="w-full flex justify-center mb-0">
                <p class="w-6/12 italic text-center text-slate-500 outline-none" contenteditable="true">
                  (whispering into comm)
                </p>
              </div>

              <!-- Dialogue -->
              <div class="w-full flex justify-center mb-5">
                <p class="w-9/12 sm:w-8/12 text-left outline-none p-1 rounded focus:bg-blue-50/50" contenteditable="true" id="dialogue-1">
                  If the seals break before dawn, the sector won't hold the surge.
                </p>
              </div>

              <!-- Character Cue 2 -->
              <div class="w-full flex justify-center mt-1 mb-0">
                <p class="w-7/12 uppercase tracking-wider font-bold text-center outline-none" contenteditable="true">
                  MEERA (O.S.)
                </p>
              </div>

              <!-- Dialogue 2 -->
              <div class="w-full flex justify-center mb-6">
                <p class="w-9/12 sm:w-8/12 text-left outline-none p-1 rounded focus:bg-blue-50/50" contenteditable="true" id="dialogue-2">
                  Then don't let them break. Reroute the secondary relay through the floodgate breaker.
                </p>
              </div>

              <!-- Transition -->
              <div class="w-full flex justify-end mb-6">
                <p class="uppercase font-bold tracking-wider outline-none" contenteditable="true">
                  CUT TO:
                </p>
              </div>

              <!-- SCENE 19 -->
              <div id="anchor-scene-19" class="flex items-baseline justify-between py-2 font-bold text-slate-900 mb-3 border-t border-slate-100 pt-4">
                <span class="scene-num-indicator mr-3 shrink-0 text-slate-500 font-bold">19</span>
                <span class="flex-1 tracking-wide uppercase outline-none" contenteditable="true" id="slugline-19">EXT. FLOODGATE GANTRY - CONTINUOUS</span>
                <span class="scene-num-indicator ml-3 shrink-0 text-slate-500 font-bold">19</span>
              </div>

              <!-- Editable Target Action -->
              <div class="outline-none mb-4 text-slate-900 focus:bg-blue-50/50 rounded p-1 transition-colors" contenteditable="true" id="editableLine">
                Sirens pulse through the red fog. Meera anchors her cable to the iron pylon, visor reflecting the rising floodwaters below.
              </div>

            </div>
          </div>

          <!-- Telemetry Bar -->
          <div class="px-4 py-2 flex items-center justify-between gap-2 text-slate-500 font-caption text-xs select-none border-t border-slate-200 bg-white">
            <div class="flex items-center gap-2">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">format_shapes</span>
                <span>Courier Prime 12pt</span>
              </span>
              <span>•</span>
              <span class="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium" id="tamilLangBadge">Tamil IME: Ready</span>
            </div>
            <div class="flex items-center gap-2">
              <span>Page 34 of 96</span>
              <span>•</span>
              <span id="word-count-display">14,280 words</span>
            </div>
          </div>

        </div>
      </main>

      <!-- EXPORT MODAL -->
      <div id="exportModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden items-end sm:items-center justify-center p-0 sm:p-4">
        <div class="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden">
          <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">ios_share</span>
              </div>
              <div>
                <h3 class="font-heading font-bold text-base text-slate-900 leading-tight">Export Screenplay</h3>
                <p class="text-[11px] text-slate-500 mt-0.5">${a.title} · ${a.draft||"Draft 4.2"}</p>
              </div>
            </div>
            <button id="closeExportModal" aria-label="Close export dialog" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="p-5 flex flex-col gap-4 overflow-y-auto">
            <div class="flex flex-col gap-1.5">
              <label for="exportFormatSelect" class="text-xs font-semibold text-slate-700">Export Format</label>
              <div class="relative">
                <select id="exportFormatSelect" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-600 cursor-pointer">
                  <option value="pdf">PDF Document (.pdf) - Industry Standard</option>
                  <option value="fdx">Final Draft (.fdx)</option>
                  <option value="fountain">Fountain (.fountain)</option>
                  <option value="docx">Microsoft Word (.docx)</option>
                  <option value="txt">Plain Text Screenplay (.txt)</option>
                </select>
              </div>
            </div>

            <div class="flex flex-col gap-2.5 pt-1">
              <p class="text-xs font-semibold text-slate-700">Options</p>
              <label class="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700">
                <input type="checkbox" id="optSceneNumbers" checked class="w-4 h-4 accent-blue-600 rounded">
                <span>Include scene numbers (18, 19, etc.)</span>
              </label>
              <label class="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700">
                <input type="checkbox" id="optTitlePage" checked class="w-4 h-4 accent-blue-600 rounded">
                <span>Include title page & metadata</span>
              </label>
              <label class="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700">
                <input type="checkbox" id="optRevisionInfo" checked class="w-4 h-4 accent-blue-600 rounded">
                <span>Include revision information & date</span>
              </label>
            </div>

            <div id="exportProgressArea" class="hidden flex flex-col gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div class="flex items-center gap-2 text-xs font-medium text-slate-800" id="exportStatusLabel">
                <span class="material-symbols-outlined text-[18px] animate-spin text-blue-600">progress_activity</span>
                <span id="exportStatusText">Preparing screenplay...</span>
              </div>
              <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div id="exportProgressBar" class="bg-blue-600 h-full transition-all duration-300 w-1/3"></div>
              </div>
            </div>
          </div>

          <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
            <button id="cancelExportBtn" class="px-3.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-medium">Cancel</button>
            <button id="startExportBtn" class="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:bg-blue-700">
              <span class="material-symbols-outlined text-[18px]">file_download</span>
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <!-- VERSIONS MODAL -->
      <div id="versionsModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden items-end sm:items-center justify-center p-0 sm:p-4">
        <div class="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden">
          <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">history</span>
              </div>
              <div>
                <h3 class="font-heading font-bold text-base text-slate-900 leading-tight">Versions & History</h3>
                <p class="text-[11px] text-slate-500 mt-0.5">${a.title}</p>
              </div>
            </div>
            <button id="closeVersionsModal" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-2">
            <button id="openNewVersionPrompt" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-xs hover:bg-blue-700">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>Create New Version</span>
            </button>
            <button id="openCompareBtn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-medium transition-colors">
              <span class="material-symbols-outlined text-[16px]">compare_arrows</span>
              <span>Compare Versions</span>
            </button>
          </div>

          <div class="p-4 overflow-y-auto flex flex-col gap-2.5 max-h-[420px]" id="versionsListContainer">
            <!-- Versions rendered dynamically -->
          </div>
        </div>
      </div>

      <!-- NEW VERSION SNAPSHOT MODAL -->
      <div id="newVersionModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4">
        <div class="w-full max-w-sm bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
          <div class="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <h3 class="font-bold text-sm text-slate-900">Create New Version Snapshot</h3>
            <button id="closeNewVersionModal" class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <div class="p-4 flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Version Label</label>
              <input type="text" id="newVersionNameInput" value="Draft 5.0 (Locked)" class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Snapshot Notes</label>
              <textarea id="newVersionNotesInput" rows="2" placeholder="e.g. Approved revision after studio table read..." class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 resize-none"></textarea>
            </div>
          </div>
          <div class="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
            <button id="cancelNewVersionBtn" class="px-3 py-1 rounded-lg text-slate-600 text-xs">Cancel</button>
            <button id="saveNewVersionBtn" class="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-xs hover:bg-blue-700">Create Snapshot</button>
          </div>
        </div>
      </div>

      <!-- COMPARE / DIFF MODAL -->
      <div id="compareModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-end sm:items-center justify-center p-0 sm:p-4">
        <div class="w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col max-h-[92vh] overflow-hidden">
          <div class="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">compare_arrows</span>
              </div>
              <div>
                <h3 class="font-bold text-base text-slate-900 leading-tight">Semantic Script Diff</h3>
                <p class="text-[11px] text-slate-500 mt-0.5">Comparing: Draft 3.0 vs. Draft 4.2 (Current)</p>
              </div>
            </div>
            <button id="closeCompareModal" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="px-4 py-2 bg-slate-50 flex items-center justify-between text-xs border-b border-slate-100">
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-500"></span><span class="font-medium text-slate-800">1 Addition</span></span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-red-400"></span><span class="font-medium text-slate-800">1 Deletion</span></span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-blue-500"></span><span class="font-medium text-slate-800">1 Modified Dialogue</span></span>
            </div>
            <span class="font-mono text-[11px] text-slate-500">Scene 18</span>
          </div>

          <div class="p-4 sm:p-6 overflow-y-auto flex flex-col gap-4 font-courier text-xs sm:text-sm leading-relaxed max-h-[460px]">
            <div class="border-l-4 border-blue-500 pl-3 py-1 bg-blue-50/40 rounded-r-lg">
              <div class="text-[11px] font-sans font-semibold text-blue-700 uppercase tracking-wide mb-1">Modified Dialogue · MEERA (O.S.)</div>
              <div class="text-red-700 line-through bg-red-50 px-2 py-0.5 rounded mb-1">- Then don't let them break. Reroute the secondary conduit.</div>
              <div class="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">+ Then don't let them break. Reroute the secondary relay through the floodgate breaker.</div>
            </div>
            <div class="border-l-4 border-emerald-500 pl-3 py-1 bg-emerald-50/40 rounded-r-lg">
              <div class="text-[11px] font-sans font-semibold text-emerald-700 uppercase tracking-wide mb-1">Added Action · SCENE 19</div>
              <div class="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">+ Sirens pulse through the red fog. Meera anchors her cable to the iron pylon, visor reflecting the rising floodwaters below.</div>
            </div>
            <div class="border-l-4 border-red-400 pl-3 py-1 bg-red-50/40 rounded-r-lg">
              <div class="text-[11px] font-sans font-semibold text-red-600 uppercase tracking-wide mb-1">Removed Transition</div>
              <div class="text-red-700 line-through bg-red-50 px-2 py-0.5 rounded">- FADE TO BLACK.</div>
            </div>
          </div>

          <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs text-slate-500">Filtered by screenplay semantic blocks</span>
            <button id="closeCompareBtn2" class="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold">Done</button>
          </div>
        </div>
      </div>

    </div>
  `}function Je(t,e){const a=document.getElementById("editor-back-btn");a&&(a.onclick=()=>{e("/workspace")});const s=document.getElementById("btn-open-production");s&&(s.onclick=()=>{e("/intelligence/analysis/production")});const n=document.getElementById("sceneNumberToggle"),l=document.getElementById("sceneNumberToggleText");let u=!0;n&&(n.onclick=()=>{u=!u,l.textContent=`Scene #s: ${u?"On":"Off"}`,document.querySelectorAll(".scene-num-indicator").forEach(C=>{C.style.opacity=u?"1":"0"}),f(`Scene numbers ${u?"enabled":"hidden"}`)});const r=document.getElementById("focusModeToggle"),c=document.getElementById("focusModeText");let o=!1;r&&(r.onclick=()=>{o=!o,c.textContent=o?"Exit Focus":"Focus Mode",document.getElementById("editor-toolbar-strip").style.display=o?"none":"flex",document.getElementById("editor-accessory-tray").style.display=o?"none":"flex",f(o?"Focus Mode active (distraction-free)":"Exited Focus Mode")});const d=document.getElementById("langToggleBtn"),y=document.getElementById("langToggleText"),m=document.getElementById("tamilLangBadge");let h="EN";d&&(d.onclick=()=>{h=h==="EN"?"TA":"EN",y.textContent=h==="EN"?"EN / தமிழ்":"தமிழ் / EN",m&&(m.textContent=h==="TA"?"தமிழ் விசைப்பலகை: இயங்குகிறது":"Tamil IME: Ready"),f(`Screenplay language set to ${h==="TA"?"Tamil":"English"}`)});const E=document.getElementById("btn-insert-intext"),b=document.getElementById("editableLine");E&&b&&(E.onclick=()=>{b.focus(),document.execCommand("insertText",!1,"INT/EXT. ")});const v=document.getElementById("sceneJumpSelect");v&&(v.onchange=C=>{const k=C.target.value,A=document.getElementById(k==="scene-19"?"anchor-scene-19":"anchor-scene-18");A&&(A.scrollIntoView({behavior:"smooth",block:"center"}),A.classList.add("bg-blue-50/50"),setTimeout(()=>A.classList.remove("bg-blue-50/50"),1200))}),document.querySelectorAll(".format-btn").forEach(C=>{C.onclick=()=>{const k=C.getAttribute("data-type");b&&(b.focus(),k==="scene"?b.className="outline-none mb-4 text-slate-900 font-bold uppercase tracking-wider p-1 rounded focus:bg-blue-50/50":k==="character"?b.className="outline-none mb-2 text-slate-900 font-bold uppercase text-center w-7/12 mx-auto tracking-wide p-1 rounded focus:bg-blue-50/50":k==="parenthetical"?b.className="outline-none mb-2 text-slate-500 italic text-center w-6/12 mx-auto p-1 rounded focus:bg-blue-50/50":k==="dialogue"?b.className="outline-none mb-4 text-slate-900 w-9/12 sm:w-8/12 mx-auto text-left p-1 rounded focus:bg-blue-50/50":b.className="outline-none mb-4 text-slate-900 p-1 rounded focus:bg-blue-50/50")}});const w=document.getElementById("btn-undo"),p=document.getElementById("btn-redo");w&&(w.onclick=()=>document.execCommand("undo")),p&&(p.onclick=()=>document.execCommand("redo"));let B=null;const x=document.getElementById("editor-save-status");document.getElementById("screenplay-page")?.addEventListener("input",()=>{x&&(x.textContent="Saving changes..."),clearTimeout(B),B=setTimeout(async()=>{const C=document.getElementById("editableLine")?.innerText;await ve(t,{lastEdit:C}),x&&(x.textContent="Autosaved Just now")},1e3)});const g=document.getElementById("exportModal"),S=document.getElementById("exportModalBtn"),j=document.getElementById("closeExportModal"),_=document.getElementById("cancelExportBtn"),H=document.getElementById("startExportBtn"),U=document.getElementById("exportProgressArea"),O=document.getElementById("exportProgressBar"),R=document.getElementById("exportStatusText");function D(C){g&&(C?(g.classList.remove("hidden"),g.classList.add("flex")):(g.classList.add("hidden"),g.classList.remove("flex"),U?.classList.add("hidden")))}S&&(S.onclick=()=>D(!0)),j&&(j.onclick=()=>D(!1)),_&&(_.onclick=()=>D(!1)),H&&(H.onclick=()=>{const C=document.getElementById("exportFormatSelect")?.value||"pdf";U.classList.remove("hidden"),O.style.width="20%",R.textContent="Typesetting Courier Prime screenplay pages...",setTimeout(()=>{O.style.width="70%",R.textContent=`Formatting ${C.toUpperCase()} structure & scene locks...`},500),setTimeout(()=>{O.style.width="100%",R.textContent=`Completed! Packaging ${C.toUpperCase()} download...`;const k=`CHRONICLES OF DUST
Draft 4.2

SCENE 18
INT. CUSTOMS OFFICE - NIGHT

Kevin kneels over cracked hydro-sensor junction box.

KEVIN
If the seals break before dawn, the sector won't hold the surge.

MEERA (O.S.)
Then don't let them break. Reroute the secondary relay through the floodgate breaker.

CUT TO:

SCENE 19
EXT. FLOODGATE GANTRY - CONTINUOUS
Sirens pulse through the red fog.`,A=new Blob([k],{type:C==="pdf"?"application/pdf":"text/plain"}),de=URL.createObjectURL(A),N=document.createElement("a");N.href=de,N.download=`Chronicles_of_Dust_Draft4.2.${C}`,document.body.appendChild(N),N.click(),N.remove(),f(`Exported "${N.download}" successfully`),setTimeout(()=>D(!1),900)},1100)});const P=document.getElementById("versionsModal"),V=document.getElementById("versionsModalBtn"),ce=document.getElementById("closeVersionsModal"),W=document.getElementById("versionsListContainer");async function z(){const C=await ye(t);W&&(W.innerHTML=C.map(k=>`
      <div class="p-3 rounded-xl border ${k.isCurrent?"border-2 border-blue-600 bg-blue-50/30":"border-slate-200 bg-white hover:bg-slate-50"} transition-colors flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-heading font-bold text-sm text-slate-900">${k.name}</span>
            <span class="px-2 py-0.5 rounded-full ${k.isCurrent?"bg-blue-600 text-white font-semibold":"bg-slate-100 text-slate-600 font-medium"} text-[10px]">${k.tag}</span>
          </div>
          <span class="text-[11px] text-slate-400 font-caption">${k.timestamp}</span>
        </div>
        <p class="text-xs text-slate-600">${k.notes||"Point-in-time snapshot."}</p>
        <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>Edited by ${k.author}</span>
          <div class="flex items-center gap-2">
            <span class="font-medium text-slate-700">${k.stats}</span>
            ${k.isCurrent?"":`<button class="restore-version-btn text-blue-600 font-semibold hover:underline" data-vname="${k.name}">Restore</button>`}
          </div>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".restore-version-btn").forEach(k=>{k.onclick=()=>{const A=k.getAttribute("data-vname");f(`Restored version "${A}"`),document.getElementById("currentVersionTag").textContent=A,P.classList.add("hidden")}}))}V&&(V.onclick=()=>{P.classList.remove("hidden"),P.classList.add("flex"),z()}),ce&&(P.onclick=C=>{(C.target===P||C.target.closest("#closeVersionsModal"))&&(P.classList.add("hidden"),P.classList.remove("flex"))});const L=document.getElementById("newVersionModal"),G=document.getElementById("openNewVersionPrompt"),K=document.getElementById("closeNewVersionModal"),X=document.getElementById("cancelNewVersionBtn"),Y=document.getElementById("saveNewVersionBtn");G&&(G.onclick=()=>{L.classList.remove("hidden"),L.classList.add("flex")}),K&&(K.onclick=()=>L.classList.add("hidden")),X&&(X.onclick=()=>L.classList.add("hidden")),Y&&(Y.onclick=async()=>{const C=document.getElementById("newVersionNameInput")?.value.trim(),k=document.getElementById("newVersionNotesInput")?.value.trim();C&&(await we(t,{name:C,notes:k}),f(`Created version snapshot "${C}"`),document.getElementById("currentVersionTag").textContent=C,L.classList.add("hidden"),z())});const M=document.getElementById("compareModal"),Q=document.getElementById("openCompareBtn"),Z=document.getElementById("closeCompareModal"),ee=document.getElementById("closeCompareBtn2");function F(C){M&&(C?(M.classList.remove("hidden"),M.classList.add("flex")):(M.classList.add("hidden"),M.classList.remove("flex")))}Q&&(Q.onclick=()=>F(!0)),Z&&(Z.onclick=()=>F(!1)),ee&&(ee.onclick=()=>F(!1))}function qe(){const t=i.state.scripts||[],e=i.state.selectedScriptId||"chronicles-of-dust",a=t.find(s=>s.id===e)||t[0]||{title:"Chronicles of Dust"};return`
    ${$("Intelligence","Script Selector")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-28 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- Navigation Breadcrumb -->
        <div class="flex items-center justify-between">
          <a href="/workspace" class="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors text-xs font-medium no-underline">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Workspace</span>
          </a>
          <div class="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium shrink-0">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span class="text-[10px] font-semibold uppercase tracking-wider">Select Script</span>
          </div>
        </div>

        <!-- Section Title -->
        <div class="flex flex-col">
          <h2 class="font-heading text-xl font-bold tracking-tight text-slate-900 leading-tight">Select a screenplay</h2>
          <span class="text-xs text-slate-500 mt-0.5">Choose a script to understand its story, characters and structure.</span>
        </div>

        <!-- Script List Container -->
        <div class="flex flex-col gap-2.5">
          <!-- Import Screenplay Option -->
          <button class="w-full p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 transition-colors flex items-center justify-between text-left group" id="btn-import-script-modal" type="button">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 group-hover:text-blue-600 group-hover:border-blue-300 transition-colors">
                <span class="material-symbols-outlined text-[20px]">upload_file</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-xs font-semibold text-slate-900 truncate">Import Other Screenplay</span>
                <span class="text-[11px] text-slate-500 truncate mt-0.5">Supports .fdx, .fountain, .docx, .txt, .pdf</span>
              </div>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <span class="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">Parse & Review</span>
              <span class="material-symbols-outlined text-slate-400 group-hover:text-blue-600 text-[18px]">add</span>
            </div>
          </button>

          <!-- Screenplays Selection Radio Cards -->
          <div class="flex flex-col gap-2" role="radiogroup" id="selector-script-cards">
            ${t.map(s=>{const n=s.id===e;return`
                <div data-script-id="${s.id}" data-script-title="${s.title}" class="script-select-card relative p-3.5 rounded-xl border ${n?"border-blue-600 bg-blue-50/70":"border-slate-200/80 bg-white hover:bg-slate-50"} transition-all cursor-pointer flex items-center justify-between group shadow-xs">
                  <div class="flex items-center gap-3 min-w-0 relative z-10">
                    <div class="shrink-0 w-9 h-9 rounded-lg ${n?"bg-white border-blue-200 text-blue-600":"bg-slate-50 border-slate-200 text-slate-600"} border flex items-center justify-center shadow-xs">
                      <span class="material-symbols-outlined text-[20px]">movie</span>
                    </div>
                    <div class="flex flex-col min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-semibold text-slate-900 truncate uppercase">${s.title}</span>
                        <span class="text-[10px] font-medium px-1.5 py-0.5 rounded ${n?"bg-blue-100 text-blue-700":"bg-slate-100 text-slate-600"} shrink-0">${s.draft||"Draft 1.0"}</span>
                      </div>
                      <span class="text-[11px] text-slate-500 truncate mt-0.5">${s.format||"Screenplay"} · ${s.pages} pages · Updated ${s.updated||"recently"}</span>
                    </div>
                  </div>
                  <div class="script-select-indicator w-6 h-6 rounded-full ${n?"bg-blue-600 text-white shadow-xs":"bg-slate-100 text-slate-400"} flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[16px] font-bold">${n?"check":"arrow_forward"}</span>
                  </div>
                </div>
              `}).join("")}
          </div>

          <div class="px-2 py-1 flex items-center gap-2">
            <span class="material-symbols-outlined text-[15px] text-slate-400">verified</span>
            <span class="text-[11px] text-slate-500">Scripts are tokenized locally prior to narrative synthesis</span>
          </div>
        </div>

      </div>

      <!-- Sticky Bottom Action Tray -->
      <div class="fixed bottom-14 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md px-4 py-2.5 border-t border-slate-100 flex flex-col items-center gap-1 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] max-w-2xl mx-auto">
        <button type="button" id="submit-continue-analysis-btn" class="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all text-white font-medium text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer">
          <span class="truncate font-semibold" id="selector-btn-label">Continue to Context (${a.title})</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
        <span class="text-[10px] text-slate-400 tracking-tight">Establishes selectedScriptId for Script Analysis</span>
      </div>

    </main>

    ${T("intelligence")}
  `}function He(t){let e=i.state.selectedScriptId||"chronicles-of-dust";document.querySelectorAll(".script-select-card").forEach(n=>{n.onclick=()=>{const l=n.getAttribute("data-script-id"),u=n.getAttribute("data-script-title");e=l,i.selectScript(l),document.querySelectorAll(".script-select-card").forEach(o=>{o.className="script-select-card relative p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const d=o.querySelector(".script-select-indicator");d&&(d.className="script-select-indicator w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0",d.innerHTML='<span class="material-symbols-outlined text-[16px]">arrow_forward</span>')}),n.className="script-select-card relative p-3.5 rounded-xl border border-blue-600 bg-blue-50/70 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const r=n.querySelector(".script-select-indicator");r&&(r.className="script-select-indicator w-6 h-6 rounded-full bg-blue-600 text-white shadow-xs flex items-center justify-center shrink-0",r.innerHTML='<span class="material-symbols-outlined text-[16px] font-bold">check</span>');const c=document.getElementById("selector-btn-label");c&&(c.textContent=`Continue to Context (${u})`)}});const a=document.getElementById("submit-continue-analysis-btn");a&&(a.onclick=()=>{i.selectScript(e),t("/intelligence/context")});const s=document.getElementById("btn-import-script-modal");s&&(s.onclick=()=>{f("Select screenplay file (.fountain, .fdx, .pdf) to parse","info")})}function Ue(){const t=i.state.selectedScriptId||"chronicles-of-dust",e=i.state.scripts.find(s=>s.id===t)||i.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",format:"Feature",industry:"International / Hollywood"},a=e.context||{format:e.format||"Feature",industry:e.industry||"International / Hollywood",hours:1,minutes:36,seconds:0};return`
    ${$("Intelligence","Context Calibration")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-28 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-5 fade-in">
        
        <!-- Breadcrumb & Draft Indicator -->
        <div class="flex items-center justify-between">
          <a href="/intelligence" class="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors py-1 text-xs font-semibold uppercase tracking-wider no-underline">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Script Selector</span>
          </a>
          <div class="flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full shadow-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span class="text-xs text-blue-700 font-medium truncate max-w-[150px]">${e.title} · ${e.draft||"Draft 4.2"}</span>
          </div>
        </div>

        <!-- Header Block -->
        <div class="flex flex-col gap-1">
          <span class="text-[11px] font-bold text-blue-600 tracking-widest uppercase">Context Calibration</span>
          <h1 class="font-heading text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Tell us about your screenplay</h1>
          <p class="text-xs text-slate-500 mt-0.5">Set narrative parameters so SCRIPTORA can tailor pacing, scene economy, and character metrics.</p>
        </div>

        <!-- Section 1: Project Type Selection -->
        <section class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-bold text-slate-700 uppercase tracking-wider">What are you making?</label>
            <span class="text-[11px] text-slate-400">Required</span>
          </div>
          <div class="grid grid-cols-3 gap-2" id="format-picker">
            <button type="button" data-format="Short" class="format-card relative flex flex-col items-center justify-center p-3 rounded-xl ${a.format==="Short"?"bg-blue-50 border-2 border-blue-600":"bg-white border border-slate-200"} transition-all cursor-pointer hover:bg-slate-50">
              <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-1 text-slate-600">
                <span class="material-symbols-outlined text-[18px]">movie</span>
              </div>
              <span class="text-xs font-bold text-slate-900">Short</span>
              <span class="text-[10px] text-slate-500">~15–30m</span>
            </button>

            <button type="button" data-format="Pilot" class="format-card relative flex flex-col items-center justify-center p-3 rounded-xl ${a.format==="Pilot"?"bg-blue-50 border-2 border-blue-600":"bg-white border border-slate-200"} transition-all cursor-pointer hover:bg-slate-50">
              <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-1 text-slate-600">
                <span class="material-symbols-outlined text-[18px]">live_tv</span>
              </div>
              <span class="text-xs font-bold text-slate-900">Pilot</span>
              <span class="text-[10px] text-slate-500">~45–60m</span>
            </button>

            <button type="button" data-format="Feature" class="format-card relative flex flex-col items-center justify-center p-3 rounded-xl ${a.format==="Feature"?"bg-blue-50 border-2 border-blue-600":"bg-white border border-slate-200"} transition-all cursor-pointer hover:bg-slate-50">
              <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-1 text-slate-600">
                <span class="material-symbols-outlined text-[18px]">theaters</span>
              </div>
              <span class="text-xs font-bold text-slate-900">Feature</span>
              <span class="text-[10px] text-slate-500">~90–120m</span>
            </button>
          </div>
        </section>

        <!-- Section 2: Industry / Cinematic Grammar -->
        <section class="flex flex-col gap-2">
          <label class="text-xs font-bold text-slate-700 uppercase tracking-wider">Cinematic Tradition & Grammar</label>
          <div class="relative">
            <select id="industry-select" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-blue-600 cursor-pointer appearance-none shadow-xs">
              <option value="International / Hollywood" ${a.industry==="International / Hollywood"?"selected":""}>International / Hollywood Standard (3-Act Spec)</option>
              <option value="Tamil Cinema" ${a.industry==="Tamil Cinema"?"selected":""}>Tamil Cinema (Interval Block & Dual Peak Structure)</option>
              <option value="Malayalam Cinema" ${a.industry==="Malayalam Cinema"?"selected":""}>Malayalam Cinema (Character-driven Realism)</option>
              <option value="Telugu Cinema" ${a.industry==="Telugu Cinema"?"selected":""}>Telugu Cinema (Heroic Mythos & Commercial Cadence)</option>
              <option value="Hindi Cinema" ${a.industry==="Hindi Cinema"?"selected":""}>Hindi Cinema (Narrative Melodrama & Ensemble)</option>
              <option value="Indie / Festival" ${a.industry==="Indie / Festival"?"selected":""}>Indie / Festival (Poetic / Open-ended Form)</option>
            </select>
            <span class="material-symbols-outlined text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[18px]">expand_more</span>
          </div>
        </section>

        <!-- Section 3: Planned Duration / Runtime -->
        <section class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-bold text-slate-700 uppercase tracking-wider">Planned Runtime</label>
            <span class="text-[11px] font-mono text-blue-600 font-semibold" id="pacing-projection">~96 standard script pages</span>
          </div>

          <div class="grid grid-cols-3 gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
            <!-- Hours -->
            <div class="flex flex-col items-center gap-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400">Hours</span>
              <div class="flex items-center gap-2">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="hr" data-delta="-1">-</button>
                <span class="font-mono text-base font-bold text-slate-900 w-6 text-center" id="val-hr">${String(a.hours||1).padStart(2,"0")}</span>
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="hr" data-delta="1">+</button>
              </div>
            </div>

            <!-- Minutes -->
            <div class="flex flex-col items-center gap-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400">Minutes</span>
              <div class="flex items-center gap-2">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="min" data-delta="-5">-</button>
                <span class="font-mono text-base font-bold text-slate-900 w-6 text-center" id="val-min">${String(a.minutes||36).padStart(2,"0")}</span>
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="min" data-delta="5">+</button>
              </div>
            </div>

            <!-- Seconds -->
            <div class="flex flex-col items-center gap-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400">Seconds</span>
              <div class="flex items-center gap-2">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="sec" data-delta="-15">-</button>
                <span class="font-mono text-base font-bold text-slate-900 w-6 text-center" id="val-sec">${String(a.seconds||0).padStart(2,"0")}</span>
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="sec" data-delta="15">+</button>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- Sticky Bottom Action Button -->
      <div class="fixed bottom-14 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md px-4 py-2.5 border-t border-slate-100 flex flex-col items-center gap-1 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] max-w-2xl mx-auto">
        <button type="button" id="btn-submit-context" class="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all text-white font-medium text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer">
          <span class="truncate font-semibold">Calibrate & Proceed to Analysis</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

    </main>

    ${T("intelligence")}
  `}function Ve(t){const e=i.state.selectedScriptId||"chronicles-of-dust";let a="Feature",s=1,n=36,l=0;document.querySelectorAll(".format-card").forEach(c=>{c.onclick=()=>{a=c.getAttribute("data-format"),document.querySelectorAll(".format-card").forEach(o=>{o.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 transition-all cursor-pointer hover:bg-slate-50"}),c.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 border-2 border-blue-600 transition-all cursor-pointer",a==="Short"?(s=0,n=25):a==="Pilot"?(s=0,n=50):(s=1,n=45),u()}});function u(){const c=d=>String(d).padStart(2,"0");document.getElementById("val-hr").textContent=c(s),document.getElementById("val-min").textContent=c(n),document.getElementById("val-sec").textContent=c(l);const o=s*60+n+Math.round(l/60);document.getElementById("pacing-projection").textContent=`~${o} standard script pages`}document.querySelectorAll(".stepper-btn").forEach(c=>{c.onclick=()=>{const o=c.getAttribute("data-unit"),d=parseInt(c.getAttribute("data-delta"));o==="hr"&&(s=Math.max(0,Math.min(8,s+d))),o==="min"&&(n=Math.max(0,Math.min(59,(n+d+60)%60))),o==="sec"&&(l=Math.max(0,Math.min(59,(l+d+60)%60))),u()}});const r=document.getElementById("btn-submit-context");r&&(r.onclick=async()=>{const c=document.getElementById("industry-select")?.value||"International / Hollywood";r.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Calibrating SCRIPTORA...</span>',r.disabled=!0;const o=y=>String(y).padStart(2,"0"),d={format:a,industry:c,hours:s,minutes:n,seconds:l,plannedDuration:`${o(s)}:${o(n)}:${o(l)}`};await Pe(e,d),f("Narrative parameters calibrated"),t("/intelligence/dashboard")})}function We(){const t=i.state.selectedScriptId||"chronicles-of-dust",e=i.state.scripts.find(s=>s.id===t)||i.state.activeScript||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pages:96,format:"Feature"},a=e.analysisScores||{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80};return`
    ${$("Intelligence","Script Analysis")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- Navigation Row -->
        <div class="flex items-center justify-between">
          <a href="/intelligence/context" class="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors text-xs font-semibold uppercase tracking-wider no-underline">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Context Setup</span>
          </a>
          <div class="flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full shadow-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span class="text-xs text-blue-700 font-medium truncate max-w-[150px]">${e.title} · ${e.draft||"Draft 4.2"}</span>
          </div>
        </div>

        <!-- Section Title & Status -->
        <div class="flex items-center justify-between pt-1">
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight font-heading">Intelligence</h1>
            <p class="text-xs text-slate-500 mt-0.5">Understand your screenplay.</p>
          </div>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100/80">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Live Telemetry</span>
          </span>
        </div>

        <!-- 1. Script Title Card -->
        <div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col">
          <div class="flex items-center justify-between">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-blue-100/80 text-blue-700 font-heading">ACTIVE PROJECT</span>
            <button class="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors" id="script-selector-trigger" type="button">
              <span class="material-symbols-outlined text-[15px]">schedule</span>
              <span>Updated 12m ago</span>
              <span class="material-symbols-outlined text-[15px] text-slate-400">unfold_more</span>
            </button>
          </div>
          <div class="mt-2">
            <h2 class="text-lg font-bold text-slate-900 font-heading">${e.title}</h2>
            <p class="text-xs text-slate-500 mt-0.5">${e.draft||"Draft 4.2"} · ${e.format||"Feature"} · ${e.pages} pages</p>
          </div>
        </div>

        <!-- 2. AI Query Box & Generator Buttons -->
        <div class="flex flex-col gap-2.5">
          <!-- AI Query Box -->
          <div class="relative flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs focus-within:border-blue-600 transition-colors">
            <span class="material-symbols-outlined text-[19px] text-blue-600 shrink-0 mr-2">auto_awesome</span>
            <input class="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none min-w-0" id="ai-query-input" placeholder="Ask anything about your screenplay..." type="text">
            <button aria-label="Send" class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 hover:bg-blue-700 active:scale-95 transition-all ml-1.5" id="ai-query-submit" type="button">
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <!-- Logline / Synopsis Action Buttons -->
          <div class="flex items-center gap-2">
            <button class="flex-1 py-1.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 active:scale-[0.99] rounded-full text-xs font-medium text-slate-700 flex items-center justify-center gap-1.5 transition-colors shadow-xs" id="btn-gen-logline" type="button">
              <span class="material-symbols-outlined text-[15px] text-blue-600">auto_awesome</span>
              <span>Generate Logline</span>
            </button>
            <button class="flex-1 py-1.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 active:scale-[0.99] rounded-full text-xs font-medium text-slate-700 flex items-center justify-center gap-1.5 transition-colors shadow-xs" id="btn-gen-synopsis" type="button">
              <span class="material-symbols-outlined text-[15px] text-blue-600">auto_awesome</span>
              <span>Generate Synopsis</span>
            </button>
          </div>

          <!-- Generated Content Container -->
          <div class="hidden bg-white border border-blue-100 rounded-xl p-3.5 shadow-xs transition-all flex flex-col gap-2" id="ai-generated-container">
            <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <div class="flex items-center gap-2 min-w-0">
                <span class="material-symbols-outlined text-[17px] text-blue-600 shrink-0">auto_awesome</span>
                <span class="text-xs font-bold uppercase tracking-wider text-slate-700 font-heading truncate" id="ai-generated-title">Generated Logline</span>
                <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 shrink-0">${e.title} · ${e.draft||"D4.2"}</span>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <button class="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 py-0.5 px-2 rounded-lg bg-blue-50 border border-blue-100" id="ai-copy-btn" type="button">
                  <span class="material-symbols-outlined text-[14px]">content_copy</span>
                  <span id="ai-copy-text">Copy</span>
                </button>
                <button aria-label="Dismiss" class="text-slate-400 hover:text-slate-600 p-0.5 rounded" id="ai-close-btn" type="button">
                  <span class="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed" id="ai-generated-body"></p>
          </div>
        </div>

        <!-- 3. Overall Score Card -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">SCRIPT ANALYSIS</span>
            <span class="text-xs font-medium text-slate-400">10 Metrics Evaluated</span>
          </div>

          <div class="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <!-- Circular Gauge -->
            <div class="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg class="w-full h-full -rotate-90" viewBox="0 0 72 72">
                <circle class="text-slate-200" cx="36" cy="36" fill="none" r="30" stroke="currentColor" stroke-width="6"></circle>
                <circle class="text-blue-600" cx="36" cy="36" fill="none" r="30" stroke="currentColor" stroke-dasharray="188.5" stroke-dashoffset="26.4" stroke-linecap="round" stroke-width="6"></circle>
              </svg>
              <div class="absolute flex flex-col items-center justify-center">
                <span class="text-2xl font-bold text-slate-900 leading-none tracking-tight font-heading">${a.overall}</span>
                <span class="text-[10px] uppercase font-semibold text-slate-400 leading-none mt-1">/100</span>
              </div>
            </div>
            <div class="flex flex-col min-w-0 flex-1">
              <div class="flex items-center gap-1.5">
                <span class="text-base font-bold text-slate-900 font-heading">Overall Score</span>
                <span class="material-symbols-outlined text-blue-600 text-[17px]">workspace_premium</span>
              </div>
              <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                Strong emotional coherence & dialogue rhythm. Structural tension peaks with intent at Act II midpoint.
              </p>
            </div>
          </div>

          <!-- 10 Metric Category Scores -->
          <div class="flex flex-col divide-y divide-slate-100">
            ${[{name:"Pacing",score:a.pacing,icon:"speed"},{name:"Dialogue",score:a.dialogue,icon:"chat"},{name:"Emotion",score:a.emotion,icon:"favorite"},{name:"Character Arc",score:a.characterArc,icon:"alt_route"},{name:"Continuity",score:a.continuity,icon:"linear_scale"},{name:"Story Structure",score:a.storyStructure,icon:"account_tree"},{name:"Theme",score:a.theme,icon:"lightbulb"},{name:"Cinema",score:a.cinema,icon:"videocam"},{name:"Formatting",score:a.formatting,icon:"rule"},{name:"Production",score:a.production,icon:"movie_creation"}].map(s=>`
              <div class="py-2.5 flex items-center justify-between gap-3">
                <div class="flex items-center gap-2 w-36 shrink-0">
                  <span class="material-symbols-outlined text-[17px] text-slate-400">${s.icon}</span>
                  <span class="text-xs sm:text-sm font-medium text-slate-700 truncate">${s.name}</span>
                </div>
                <div class="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div class="h-full bg-blue-600 rounded-full" style="width: ${s.score}%;"></div>
                </div>
                <span class="text-xs sm:text-sm font-bold text-slate-900 w-8 text-right font-mono">${s.score}</span>
              </div>
            `).join("")}
          </div>

          <!-- Needs Attention Micro-Indicator -->
          <a href="/intelligence/analysis" class="pt-2 pb-1 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 hover:text-slate-900 transition-colors no-underline">
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px] text-amber-500">info</span>
              <span class="font-medium">3 areas have important findings</span>
            </div>
            <span class="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
          </a>
        </div>

        <!-- 4. Primary & Secondary CTA Buttons -->
        <div class="flex flex-col gap-2 pt-1 pb-4">
          <a href="/intelligence/analysis" class="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-medium rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all no-underline" id="btn-analyse-individual">
            <span class="material-symbols-outlined text-[19px]">insights</span>
            <span>Analyse Individually</span>
          </a>
          <a href="/editor/${e.id}" class="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors no-underline">
            <span class="material-symbols-outlined text-[16px] text-slate-500">edit_document</span>
            <span>Back to Editor</span>
          </a>
          <p class="text-[11px] text-slate-400 text-center">Evaluate individual scenes, dialogue cadence, and beat breakdowns.</p>
        </div>

      </div>

      <!-- Quick Script Switcher Modal -->
      <div id="script-switcher-modal" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm items-end sm:items-center justify-center hidden p-0 sm:p-4">
        <div class="w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-600 font-heading">Switch Screenplay</span>
            <button id="close-script-switcher-modal" class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <div class="flex flex-col gap-2 max-h-60 overflow-y-auto">
            ${i.state.scripts.map(s=>`
              <div class="script-switch-opt p-3 rounded-xl ${s.id===e.id?"bg-blue-50 border border-blue-200":"bg-white border border-slate-200 hover:bg-slate-50"} flex items-center justify-between cursor-pointer" data-id="${s.id}">
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-slate-900 uppercase font-heading">${s.title}</span>
                  <span class="text-[11px] text-slate-500 mt-0.5">${s.format||"Feature"} · ${s.pages} pages · ${s.draft||"Draft 1.0"}</span>
                </div>
                ${s.id===e.id?'<span class="material-symbols-outlined text-blue-600 text-[18px]">check_circle</span>':""}
              </div>
            `).join("")}
          </div>
        </div>
      </div>

    </main>

    ${T("intelligence")}
  `}function ze(t){const e=i.state.selectedScriptId||"chronicles-of-dust",a=i.state.scripts.find(w=>w.id===e)||i.state.scripts[0],s=document.getElementById("btn-gen-logline"),n=document.getElementById("btn-gen-synopsis"),l=document.getElementById("ai-generated-container"),u=document.getElementById("ai-generated-title"),r=document.getElementById("ai-generated-body"),c=document.getElementById("ai-close-btn"),o=document.getElementById("ai-copy-btn"),d=document.getElementById("ai-copy-text"),y=document.getElementById("ai-query-input"),m=document.getElementById("ai-query-submit");function h(w){l&&(l.classList.remove("hidden"),u.textContent=w==="logline"?"Generated Logline":"Generated Synopsis",r.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Generating with narrative telemetry...</span>',setTimeout(()=>{r.textContent=w==="logline"?a?.logline||"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.":a?.synopsis||"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves."},400))}if(s&&(s.onclick=()=>h("logline")),n&&(n.onclick=()=>h("synopsis")),c&&(c.onclick=()=>l.classList.add("hidden")),o&&(o.onclick=()=>{navigator.clipboard?.writeText(r.textContent||""),d.textContent="Copied!",setTimeout(()=>{d.textContent="Copy"},1800),f("Copied to clipboard")}),m&&y){const w=async()=>{const p=y.value.trim();if(!p)return;l.classList.remove("hidden"),u.textContent="Intelligence AI Answer",r.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing draft semantics...</span>';const B=await re(p,e);r.textContent=B,y.value=""};m.onclick=w,y.onkeydown=p=>{p.key==="Enter"&&w()}}const E=document.getElementById("script-switcher-modal"),b=document.getElementById("script-selector-trigger"),v=document.getElementById("close-script-switcher-modal");b&&(b.onclick=()=>E?.classList.remove("hidden")),v&&(v.onclick=()=>E?.classList.add("hidden")),document.querySelectorAll(".script-switch-opt").forEach(w=>{w.onclick=()=>{const p=w.getAttribute("data-id");i.selectScript(p),E?.classList.add("hidden"),t("/intelligence")}})}function Ge(){const t=i.state.selectedScriptId||"chronicles-of-dust",e=i.state.scripts.find(s=>s.id===t)||i.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",pages:96},a=[{type:"pacing",title:"Pacing",desc:"See where the story moves too fast or too slowly.",icon:"speed",score:82,telemetry:`${e.pages||96} Pages Telemetry`},{type:"dialogue",title:"Dialogue",desc:"Cadence, subtext density and character voice rhythm.",icon:"chat",score:89,telemetry:"42 Dialogue Exchanges"},{type:"emotion",title:"Emotion",desc:"Emotional heatmaps, catharsis curves and sentiment.",icon:"favorite",score:91,telemetry:"Peak Catharsis: Act II"},{type:"character-arc",title:"Character Arc",desc:"Want vs. need trajectories and transformation tracking.",icon:"alt_route",score:84,telemetry:"4 Major Protagonists"},{type:"continuity",title:"Continuity",desc:"Props, character locations, and temporal logic rules.",icon:"linear_scale",score:78,telemetry:"2 Minor Prop Conflicts"},{type:"story-structure",title:"Story Structure",desc:"Beat breakdowns, midpoint shifts and turning points.",icon:"account_tree",score:87,telemetry:"3-Act Paradigm Standard"},{type:"theme",title:"Theme",desc:"Core philosophical spines, motifs and moral arguments.",icon:"lightbulb",score:90,telemetry:"3 Tracked Motifs"},{type:"cinema",title:"Cinema",desc:"Visual storytelling, shot economy and set-piece power.",icon:"videocam",score:85,telemetry:"Cinematic Visual Index"},{type:"scene",title:"Scene Analysis",desc:"Deep dive breakdown of goals, conflict and polarity.",icon:"movie",score:86,telemetry:"Scene 18 Active Scope"},{type:"formatting",title:"Formatting",desc:"Standard industry margins, sluglines and font rules.",icon:"rule",score:94,telemetry:"Standard Guild Rules"},{type:"production",title:"Production",desc:"Locations, shooting cast, props and cost estimators.",icon:"movie_creation",score:80,telemetry:"24 Practical Locations"}];return`
    ${$("Intelligence","Analyse Individually")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- Sub-header Navigation Row -->
        <div class="px-1 py-1.5 flex items-center justify-between">
          <a href="/intelligence/dashboard" class="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors text-xs font-semibold uppercase tracking-wider no-underline">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Script Analysis</span>
          </a>
          <!-- Active Draft Badge -->
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span class="text-xs font-medium">${e.title} · ${e.draft||"Draft 4.2"}</span>
          </div>
        </div>

        <!-- Section Header -->
        <div class="flex flex-col">
          <span class="text-[11px] font-bold text-blue-600 uppercase tracking-widest">Analysis Vectors</span>
          <h1 class="font-heading text-2xl font-bold text-slate-900 tracking-tight">Analyse Individually</h1>
          <p class="text-xs text-slate-500 mt-0.5">Choose an area to explore in your screenplay.</p>
        </div>

        <!-- Search & Filter Bar -->
        <div class="relative w-full">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-slate-400">search</span>
          <input class="w-full h-10 pl-9 pr-3 rounded-xl bg-white text-slate-900 border border-slate-200 placeholder:text-slate-400 text-xs focus:outline-none focus:border-blue-600 shadow-xs" id="analysis-filter-input" placeholder="Filter vectors (e.g. pacing, dialogue, cinema)..." type="text">
        </div>

        <!-- 11 Canonical Tiles Grid -->
        <div class="grid grid-cols-2 gap-3" id="analysis-tiles-grid">
          ${a.map(s=>`
            <a href="/intelligence/analysis/${s.type}" class="analysis-tile group flex flex-col justify-between p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm hover:border-blue-300 transition-all active:scale-[0.98] min-h-[148px] no-underline text-inherit cursor-pointer" data-keyword="${s.title.toLowerCase()} ${s.desc.toLowerCase()}">
              <div>
                <div class="flex items-center justify-between">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[19px]">${s.icon}</span>
                  </div>
                  <span class="material-symbols-outlined text-[18px] text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                </div>
                <h2 class="font-heading font-bold text-slate-900 mt-2.5 text-sm leading-tight">${s.title}</h2>
                <p class="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">${s.desc}</p>
              </div>

              <div class="pt-2 flex items-center justify-between border-t border-slate-100">
                <span class="text-[10px] text-slate-400 truncate max-w-[90px]">${s.telemetry}</span>
                <span class="text-xs font-mono font-bold text-blue-600">${s.score}</span>
              </div>
            </a>
          `).join("")}
        </div>

      </div>
    </main>

    ${T("intelligence")}
  `}function Ke(t){const e=document.getElementById("analysis-filter-input");e&&(e.oninput=a=>{const s=a.target.value.toLowerCase().trim();document.querySelectorAll("#analysis-tiles-grid .analysis-tile").forEach(n=>{const l=n.getAttribute("data-keyword")||"";n.style.display=l.includes(s)?"flex":"none"})})}const ae={pacing:{title:"Pacing Analysis",score:82,icon:"speed",desc:"Scene duration variance, narrative tempo and page-turn velocity.",questions:["Where does the pace drag in Act II?","Find scenes over 4 pages","Show action-to-dialogue ratios"],findings:[{scene:"SCENE 14 · Dockside Perimeter · Pg 36",act:"Act II",title:"Action beats slow down before major confrontation",desc:"Extended exposition between dock guards lowers tension prior to container breach.",targetScene:14},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Peak narrative rhythm",desc:"Fast intercut dialogue creates maximum urgency before floodgate breach.",targetScene:18},{scene:"SCENE 26 · Coastal Highway · Pg 68",act:"Act III",title:"High velocity turning point",desc:"Pursuit cadence maintains optimal beats per page.",targetScene:26}]},dialogue:{title:"Dialogue Analysis",score:89,icon:"chat",desc:"Cadence, subtext density, distinctive character voice profiles.",questions:["Are character voices distinctive?","Find on-the-nose exposition lines","Analyze dialogue subtext in Scene 18"],findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Subtext is understated and powerful",desc:"Kevin avoids speaking about his brother directly, communicating through silence and tea rituals.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Meera O.S. dialogue establishes authority",desc:"Radio chatter avoids fluff and communicates technical stakes concisely.",targetScene:18}]},emotion:{title:"Emotion Analysis",score:91,icon:"favorite",desc:"Catharsis trajectory, emotional resonance curves, character empathy indices.",questions:["Where does emotional vulnerability peak?","Track empathy trajectory for Kevin","Catharsis resolution in Act III"],findings:[{scene:"SCENE 12 · Father’s Workshop · Pg 28",act:"Act I",title:"Emotional anchor established",desc:"Familial debt and generational sacrifice ground Kevin’s reluctance to blow the whistle.",targetScene:12},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Desperation under rising water",desc:"Kevin’s fear of failing Meera is palpable as water rises past junction box.",targetScene:18}]},"character-arc":{title:"Character Arc Analysis",score:84,icon:"alt_route",desc:"Want vs. Need conflict, psychological transformation, fatal flaw resolution.",questions:["Does Kevin overcome his passivity?","Meera character transformation","Antagonist motivation clarity"],findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]},continuity:{title:"Continuity Analysis",score:78,icon:"linear_scale",desc:"Prop tracking, character spatial locations, timeline consistency checks.",questions:["Check prop handover in Scene 18","Is time of day consistent across Act II?","Track the brass seal location"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Hydro-sensor probe referenced before retrieval",desc:"Verify Kevin picked up copper probe in Scene 16 or carries it on belt.",targetScene:18},{scene:"SCENE 22 · Pumping Station · Pg 58",act:"Act II",title:"Flashlight state discrepancy",desc:"Ensure flashlight was retrieved after water surge in Scene 19.",targetScene:22}]},"story-structure":{title:"Story Structure Analysis",score:87,icon:"account_tree",desc:"Inciting incident, plot points, midpoint shift, climax architecture.",questions:["Is midpoint clearly defined?","Evaluate climax timing on page 88","Are 3-act beats aligned?"],findings:[{scene:"SCENE 06 · Customs Registry · Pg 14",act:"Inciting Incident",title:"Off-manifest container discovered",desc:"The inciting anomaly sets Kevin on irreversible investigative path.",targetScene:6},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Midpoint (Pg 48/96)",title:"Stakes escalate from civil to criminal",desc:"Kevin realizes his own brother commands the smuggling cartel.",targetScene:18}]},theme:{title:"Theme Analysis",score:90,icon:"lightbulb",desc:"Primary narrative spine: Complicity vs. Duty and moral accountability.",questions:["What is the central theme?","Where is loyalty tested?","Show recurring thematic motifs"],findings:[{scene:"SCENE 09 · Family Kitchen · Pg 22",act:"Act I",title:"Familial pressure as thematic catalyst",desc:"Kevin hides eviction notice, showing economic desperation fueling institutional silence.",targetScene:9},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Moral test faced directly",desc:"Kevin must decide whether to save his brother or save the port city from flooding.",targetScene:18},{scene:"SCENE 36 · Rooftop Overlook · Pg 94",act:"Act III",title:"Theme delivers its final statement",desc:"Accountability over self-preservation.",targetScene:36}]},cinema:{title:"Cinema & Visual Storytelling",score:85,icon:"videocam",desc:"Visual set-piece density, image systems, lighting and camera intentionality.",questions:["Check visual contrast between acts","Highlight cinematic set-pieces","Analyze color palette cues in action lines"],findings:[{scene:"SCENE 01 · Harbor Drone View · Pg 01",act:"Act I",title:"Strong establishing visual metaphor",desc:"Rusted shipping containers stacked like monoliths beneath smog.",targetScene:1},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"High visual tension",desc:"Red emergency beacons reflected in rising brackish water.",targetScene:18}]},scene:{title:"Scene Analysis",score:86,icon:"movie",desc:"Micro-structure of Scene 18: Objective, obstacle, polarity change.",questions:["What is the scene objective?","Where does tension peak?","How does polarity shift?"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]},formatting:{title:"Formatting & Guild Compliance",score:94,icon:"rule",desc:"Industry standard margin measurements, capitalization, slugline syntax.",questions:["Check standard industry margins","Find non-standard scene sluglines","Verify dialogue capitalization rules"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Perfect Courier Prime 12pt slugline",desc:"Margins, dual dialogue spacing, and transition tags meet Writers Guild standards.",targetScene:18}]},production:{title:"Production Breakdown",score:80,icon:"movie_creation",desc:"Locations, shooting days, practical elements, cast size breakdown.",questions:["How many practical locations?","Show scenes with special props","List one-off speaking roles"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Location: Wet Stage / Customs Interior",desc:"Requires controlled water flooding tank, hydro-sensor prop box, wet comm-link gear.",targetScene:18}]}};function Xe(t="pacing"){const e=ae[t]||ae.pacing,a=i.state.selectedScriptId||"chronicles-of-dust",s=i.state.scripts.find(n=>n.id===a)||i.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2"};return`
    ${$("Intelligence",e.title)}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- Sub-header Navigation Row -->
        <div class="flex items-center justify-between">
          <a href="/intelligence/analysis" class="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors text-xs font-semibold uppercase tracking-wider no-underline">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Vectors</span>
          </a>
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span class="text-xs font-medium">${s.title} · ${s.draft||"Draft 4.2"}</span>
          </div>
        </div>

        <!-- Section Title -->
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">${e.icon}</span>
              <h1 class="font-heading text-xl font-bold text-slate-900 tracking-tight">${e.title}</h1>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${e.desc}</p>
          </div>
          <div class="flex flex-col items-end">
            <span class="text-2xl font-bold font-mono text-blue-600">${e.score}</span>
            <span class="text-[10px] text-slate-400 font-semibold uppercase">/100 Index</span>
          </div>
        </div>

        <!-- AI Query Box with Suggestion Pills -->
        <div class="flex flex-col gap-2">
          <div class="relative flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs focus-within:border-blue-600 transition-colors">
            <span class="material-symbols-outlined text-[18px] text-blue-600 mr-2 shrink-0">auto_awesome</span>
            <input id="vector-ai-input" class="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none" placeholder="Ask about this vector..." type="text">
            <button id="vector-ai-submit" class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 hover:bg-blue-700 active:scale-95 transition-all ml-1">
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div class="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            ${e.questions.map(n=>`
              <button type="button" class="query-pill shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors shadow-xs active:scale-95" data-query="${n}">
                ${n}
              </button>
            `).join("")}
          </div>

          <!-- AI Answer Box -->
          <div id="vector-ai-answer" class="hidden bg-white border border-blue-100 rounded-xl p-3 text-xs text-slate-700 shadow-xs leading-relaxed"></div>
        </div>

        <!-- Findings List -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">Key Scene Findings</span>
            <span class="text-[11px] text-slate-400 font-medium">${e.findings.length} findings tracked</span>
          </div>

          ${e.findings.map(n=>`
            <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${n.scene}</span>
                <span class="text-[11px] font-medium text-slate-400">${n.act}</span>
              </div>
              <div class="flex flex-col">
                <h3 class="text-xs sm:text-sm font-bold text-slate-900">${n.title}</h3>
                <p class="text-xs text-slate-600 mt-1 leading-relaxed">${n.desc}</p>
              </div>
              <div class="pt-2 flex justify-end border-t border-slate-100">
                <button type="button" class="btn-open-editor-scene px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${n.targetScene}">
                  <span class="material-symbols-outlined text-[15px]">edit_note</span>
                  <span>Open in Editor (Scene ${n.targetScene})</span>
                </button>
              </div>
            </div>
          `).join("")}
        </div>

      </div>
    </main>

    ${T("intelligence")}
  `}function Ye(t,e){const a=i.state.selectedScriptId||"chronicles-of-dust";document.querySelectorAll(".btn-open-editor-scene").forEach(r=>{r.onclick=()=>{const c=r.getAttribute("data-scene");i.setState({currentSceneId:c}),f(`Jumping to Scene ${c} in Editor`),e(`/editor/${a}?scene=${c}`)}});const s=document.getElementById("vector-ai-input"),n=document.getElementById("vector-ai-submit"),l=document.getElementById("vector-ai-answer");async function u(r){if(!r||!l)return;l.classList.remove("hidden"),l.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing narrative beats...</span>';const c=await re(r,a);l.textContent=c}n&&s&&(n.onclick=()=>u(s.value.trim()),s.onkeydown=r=>{r.key==="Enter"&&u(s.value.trim())}),document.querySelectorAll(".query-pill").forEach(r=>{r.onclick=()=>{const c=r.getAttribute("data-query");s&&(s.value=c),u(c)}})}function Qe(){const t=i.state.currentUser||{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return i.state.settings,`
    ${$("Profile","Account & preferences.")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
      <div class="flex flex-col w-full max-w-lg mx-auto px-4 pt-3 pb-8 space-y-6 fade-in">
        
        <!-- Profile Header -->
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight font-heading">Profile</h1>
            <p class="text-xs text-slate-500 mt-0.5">Account & preferences.</p>
          </div>
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100/80">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>${t.badge||"Member Pro"}</span>
          </div>
        </div>

        <!-- User Information Card -->
        <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs flex flex-col items-center text-center">
          <div class="relative">
            <div class="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-sm">
              ${t.initials||"AK"}
            </div>
            <button type="button" id="edit-avatar-btn" class="w-5 h-5 bg-white rounded-full border border-slate-200 text-slate-600 flex items-center justify-center absolute bottom-0 right-0 shadow-xs hover:bg-slate-50">
              <span class="material-symbols-outlined text-[11px]">edit</span>
            </button>
          </div>
          <h2 class="text-base font-bold text-slate-900 mt-2.5 leading-tight font-heading">${t.name}</h2>
          <p class="text-xs text-slate-500 mt-0.5">${t.headline||"Screenwriter"}</p>
          <div class="bg-slate-100 text-slate-600 text-[11px] font-medium px-3 py-1 rounded-full mt-2 inline-flex items-center gap-1.5">
            Scriptora Pro • Member since 2024
          </div>

          <div class="mt-4 grid grid-cols-3 gap-2.5 pt-3 w-full border-t border-slate-100">
            <div class="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center flex flex-col items-center">
              <span class="text-base font-bold text-slate-900 leading-tight font-heading">${t.stats?.drafts||14}</span>
              <span class="text-[10px] text-slate-500 mt-0.5">Drafts</span>
            </div>
            <div class="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center flex flex-col items-center">
              <span class="text-base font-bold text-slate-900 leading-tight font-heading">${t.stats?.coAuthors||3}</span>
              <span class="text-[10px] text-slate-500 mt-0.5">Co-Authors</span>
            </div>
            <div class="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center flex flex-col items-center">
              <span class="text-base font-bold text-slate-900 leading-tight font-heading">${t.stats?.healthIndex||"98%"}</span>
              <span class="text-[10px] text-slate-500 mt-0.5">Health Index</span>
            </div>
          </div>
        </div>

        <!-- Settings Section -->
        <div class="flex flex-col" id="settings-section">
          <div class="flex items-center justify-between mb-1 px-1">
            <div class="flex flex-col">
              <h3 class="text-xs font-bold text-slate-500 tracking-wider uppercase font-heading">Settings</h3>
              <p class="text-xs text-slate-500 mt-0.5">Customize how SCRIPTORA works for you.</p>
            </div>
          </div>

          <div class="relative my-2">
            <span class="material-symbols-outlined text-slate-400 text-[18px] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">search</span>
            <input type="text" id="settings-search-input" placeholder="Search settings..." class="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-xs">
          </div>

          <div class="flex flex-col gap-2" id="settings-list">
            ${[{id:"sheet-editor",title:"Editor",desc:"Screenplay formatting & behaviour",icon:"format_align_left"},{id:"sheet-language",title:"Language",desc:"English (US) / Tamil / Tanglish",icon:"translate"},{id:"sheet-appearance",title:"Appearance",desc:"Light (System Default)",icon:"palette"},{id:"sheet-notifications",title:"Notifications",desc:"Collaboration and activity alerts",icon:"notifications_active"},{id:"sheet-intelligence",title:"Intelligence",desc:"AI analysis and prompt suggestions",icon:"auto_awesome"},{id:"sheet-privacy",title:"Privacy & Data",desc:"End-to-end IP protection & export",icon:"security"},{id:"sheet-storage",title:"Storage & Sync",desc:"Cloud backup & offline persistence",icon:"cloud_done"}].map(e=>`
              <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="${e.id}">
                <div class="flex items-center min-w-0">
                  <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                    <span class="material-symbols-outlined text-[18px]">${e.icon}</span>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">${e.title}</span>
                    <span class="text-xs text-slate-500 truncate mt-0.5">${e.desc}</span>
                  </div>
                </div>
                <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Account Information Section -->
        <div class="flex flex-col">
          <div class="text-xs font-bold text-slate-500 tracking-wider uppercase mb-2 px-1 font-heading">Account Information</div>
          <div class="flex flex-col gap-2">
            <!-- Email -->
            <button class="w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" id="trigger-modal-email">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">alternate_email</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Email</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5">${t.email}</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>

            <!-- Password -->
            <button class="w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" id="trigger-modal-password">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">lock</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Password</span>
                  <span class="text-xs text-slate-500 tracking-widest mt-0.5">••••••••••••</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>
          </div>
        </div>

        <!-- Collaboration Section -->
        <div class="flex flex-col">
          <div class="text-xs font-bold text-slate-500 tracking-wider uppercase mb-2 px-1 font-heading">Collaboration</div>
          <div class="flex flex-col gap-2">
            <a href="/profile/collaborators" class="w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group no-underline text-inherit cursor-pointer">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">group</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Collaborators</span>
                    <span class="inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">3 active</span>
                  </div>
                  <span class="text-xs text-slate-500 truncate mt-0.5">Co-writers, Script Doctor, Producer</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </a>
          </div>
        </div>

        <!-- Account Actions: Sign Out & Delete Account -->
        <div class="flex flex-col gap-2 pt-2">
          <button class="w-full border border-slate-200 bg-white hover:bg-slate-50 p-3 rounded-xl flex items-center justify-center gap-2 text-slate-700 transition-colors shadow-xs text-xs sm:text-sm font-semibold" id="btn-trigger-signout" type="button">
            <span class="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out</span>
          </button>
          <button class="w-full border border-red-200/80 bg-red-50/50 hover:bg-red-50 p-3 rounded-xl flex items-center justify-center gap-2 text-red-600 transition-colors shadow-xs text-xs sm:text-sm font-semibold" id="btn-trigger-delete-acc" type="button">
            <span class="material-symbols-outlined text-[18px]">warning</span>
            <span>Delete Account</span>
          </button>
        </div>

        <!-- Footer Version Info -->
        <div class="flex flex-col items-center text-center mt-2 pb-4">
          <div class="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold tracking-wider uppercase">
            <span class="material-symbols-outlined text-[14px]">movie_edit</span>
            <span>SCRIPTORA v1.0.4 (BUILD 412)</span>
          </div>
          <p class="text-[11px] text-slate-400 mt-0.5">Industry Screenplay Standard</p>
        </div>

      </div>

      <!-- Action Confirmation Modal (Sign Out / Delete) -->
      <div id="action-modal" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4 pb-safe hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center" id="action-modal-icon-box">
            <span class="material-symbols-outlined text-[20px]" id="action-modal-icon">logout</span>
          </div>
          <h2 class="text-base font-bold text-slate-900" id="action-modal-title">Sign Out</h2>
          <p class="text-xs text-slate-500" id="action-modal-desc">Are you sure you want to end your active session on this device?</p>
          <div class="flex items-center gap-2 mt-2">
            <button type="button" class="flex-1 h-10 px-4 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200" id="action-modal-cancel">Cancel</button>
            <button type="button" class="flex-1 h-10 px-4 rounded-xl text-white text-xs font-semibold shadow-xs" id="action-modal-confirm">Confirm</button>
          </div>
        </div>
      </div>

      <!-- Edit Profile Modal -->
      <div id="modal-edit-profile" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 class="text-sm font-bold text-slate-900">Edit Profile</h2>
            <button type="button" class="close-profile-modal p-1 text-slate-400 hover:text-slate-600"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <form id="form-update-profile" class="flex flex-col gap-2.5">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Full Name</label>
              <input type="text" id="prof-input-name" value="${t.name}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Headline</label>
              <input type="text" id="prof-input-headline" value="${t.headline||"Screenwriter"}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Email Address</label>
              <input type="email" id="prof-input-email" value="${t.email}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex items-center gap-2 mt-2">
              <button type="button" class="close-profile-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">Cancel</button>
              <button type="submit" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Password Security Modal -->
      <div id="modal-security" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 class="text-sm font-bold text-slate-900">Security & Password</h2>
            <button type="button" class="close-security-modal p-1 text-slate-400 hover:text-slate-600"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <form id="form-update-pw" class="flex flex-col gap-2.5">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Current Password</label>
              <input type="password" placeholder="••••••••••••" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">New Password</label>
              <input type="password" placeholder="Min. 8 characters" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex items-center gap-2 mt-2">
              <button type="button" class="close-security-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">Cancel</button>
              <button type="submit" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs">Update Password</button>
            </div>
          </form>
        </div>
      </div>

    </main>

    ${T("profile")}
  `}function Ze(t){const e=document.getElementById("settings-search-input");e&&(e.oninput=x=>{const g=x.target.value.toLowerCase().trim();document.querySelectorAll("#settings-list .setting-item").forEach(S=>{const j=S.textContent.toLowerCase();S.style.display=j.includes(g)?"flex":"none"})}),document.querySelectorAll(".setting-item").forEach(x=>{x.onclick=()=>{const g=x.querySelector(".font-semibold")?.textContent;f(`${g} settings are up to date`)}});const a=document.getElementById("modal-edit-profile"),s=document.getElementById("trigger-modal-email"),n=document.getElementById("edit-avatar-btn"),l=document.getElementById("form-update-profile");function u(x){x?a?.classList.remove("hidden"):a?.classList.add("hidden")}s&&(s.onclick=()=>u(!0)),n&&(n.onclick=()=>u(!0)),document.querySelectorAll(".close-profile-modal").forEach(x=>x.onclick=()=>u(!1)),l&&(l.onsubmit=async x=>{x.preventDefault();const g=document.getElementById("prof-input-name").value,S=document.getElementById("prof-input-headline").value,j=document.getElementById("prof-input-email").value;await $e({name:g,headline:S,email:j}),u(!1),f("Profile updated successfully"),t("/profile")});const r=document.getElementById("modal-security"),c=document.getElementById("trigger-modal-password"),o=document.getElementById("form-update-pw");function d(x){x?r?.classList.remove("hidden"):r?.classList.add("hidden")}c&&(c.onclick=()=>d(!0)),document.querySelectorAll(".close-security-modal").forEach(x=>x.onclick=()=>d(!1)),o&&(o.onsubmit=x=>{x.preventDefault(),d(!1),f("Password updated securely")});const y=document.getElementById("action-modal"),m=document.getElementById("action-modal-title"),h=document.getElementById("action-modal-desc"),E=document.getElementById("action-modal-icon"),b=document.getElementById("action-modal-icon-box"),v=document.getElementById("action-modal-confirm"),w=document.getElementById("action-modal-cancel");let p="signout";function B(x){p=x,x==="signout"?(m.textContent="Sign Out",h.textContent="Are you sure you want to end your active session on this device?",E.textContent="logout",b.className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center",v.className="flex-1 h-10 px-4 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900",v.textContent="Sign Out"):(m.textContent="Delete Account",h.textContent="This action will permanently delete your portfolio, scripts, and collaborator access. This cannot be undone.",E.textContent="warning",b.className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center",v.className="flex-1 h-10 px-4 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700",v.textContent="Delete Forever"),y?.classList.remove("hidden")}document.getElementById("btn-trigger-signout")?.addEventListener("click",()=>B("signout")),document.getElementById("btn-trigger-delete-acc")?.addEventListener("click",()=>B("delete")),w&&(w.onclick=()=>y?.classList.add("hidden")),v&&(v.onclick=async()=>{y?.classList.add("hidden"),p==="signout"?(await J(),i.setState({currentUser:null}),f("Signed out of Scriptora"),t("/auth")):(await J(),i.setState({currentUser:null,scripts:[]}),f("Account deleted"),t("/auth"))})}function et(){const t=i.state.selectedScriptId||"chronicles-of-dust",e=i.state.scripts.find(a=>a.id===t)||i.state.scripts[0]||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",joinCode:"A7K9-XP42"};return`
    ${$("Profile","Collaborators")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
      <div class="flex flex-col w-full max-w-lg mx-auto px-4 pt-2.5 pb-8 space-y-5 fade-in">
        
        <!-- Back Navigation & Title -->
        <div class="flex flex-col gap-1">
          <a href="/profile" class="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors text-xs font-semibold uppercase tracking-wider no-underline w-fit">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Profile</span>
          </a>
          <h1 class="font-heading text-2xl font-bold text-slate-900 tracking-tight mt-1">Collaborators</h1>
          <p class="text-xs text-slate-500">Work together on your screenplay with controlled access.</p>
        </div>

        <!-- Project Context Selector -->
        <div class="relative">
          <button class="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200/80 rounded-xl shadow-xs text-left hover:bg-slate-50 transition-colors" id="projectSelectBtn">
            <div class="flex flex-col min-w-0 pr-2">
              <span class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Active Screenplay</span>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="material-symbols-outlined text-blue-600 text-[18px]">movie_edit</span>
                <span class="font-heading text-sm font-bold text-slate-900 truncate" id="currentProjectTitle">${e.title} (${e.draft||"Draft 4.2"})</span>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span class="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium" id="collab-count-badge">Team Access</span>
              <span class="material-symbols-outlined text-slate-400 text-[20px]" id="projectChevron">expand_more</span>
            </div>
          </button>

          <!-- Project Dropdown Popover -->
          <div class="hidden absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-30 overflow-hidden py-1" id="projectDropdown">
            ${i.state.scripts.map(a=>`
              <button class="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors switch-script-opt" data-id="${a.id}">
                <div class="flex flex-col">
                  <span class="text-xs font-semibold text-slate-900">${a.title}</span>
                  <span class="text-[10px] text-slate-500">${a.format||"Feature"} · ${a.draft||"Draft 1.0"}</span>
                </div>
                ${a.id===e.id?'<span class="material-symbols-outlined text-blue-600 text-[16px]">check</span>':""}
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Add Collaborator Action Bar -->
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase text-slate-500 tracking-wider">Team Access</span>
          <button class="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all" id="openInviteBtn">
            <span class="material-symbols-outlined text-[16px]">person_add</span>
            <span>Add Collaborator</span>
          </button>
        </div>

        <!-- Inline Invite Card -->
        <div class="hidden bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3" id="inviteCard">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[16px]">mail</span>
              </div>
              <span class="font-heading text-sm font-bold text-slate-900">Invite Teammate</span>
            </div>
            <button class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100" id="closeInviteBtn">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div class="space-y-1">
            <label class="text-[11px] font-semibold text-slate-600">Email Address</label>
            <input class="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600" id="inviteEmailInput" placeholder="colleague@studio.com" type="email">
          </div>

          <div class="space-y-1.5">
            <span class="text-[11px] font-semibold text-slate-600">Permission Level</span>
            <div class="grid grid-cols-2 gap-2">
              <label class="flex flex-col p-2.5 rounded-lg border border-blue-200 bg-blue-50/50 cursor-pointer">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">Editor</span>
                  <input type="radio" name="inviteRole" value="editor" checked class="accent-blue-600">
                </div>
                <span class="text-[10px] text-slate-500 mt-0.5">Can edit dialogue & scene locks</span>
              </label>
              <label class="flex flex-col p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">Viewer</span>
                  <input type="radio" name="inviteRole" value="viewer" class="accent-blue-600">
                </div>
                <span class="text-[10px] text-slate-500 mt-0.5">Read-only script & review notes</span>
              </label>
            </div>
          </div>

          <button id="sendInviteBtn" class="w-full h-9 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg text-xs font-semibold shadow-xs transition-all">
            Send Invitation
          </button>
        </div>

        <!-- Collaborators List -->
        <div class="bg-white rounded-xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden" id="collaborators-list">
          <div class="p-4 text-center text-xs text-slate-400">Loading collaborators...</div>
        </div>

        <!-- JOIN BY SCRIPT CODE SECTION -->
        <div class="flex flex-col gap-2 pt-2">
          <div class="flex flex-col">
            <h2 class="font-heading text-sm font-bold text-slate-900 tracking-tight">Join a Script</h2>
            <p class="text-xs text-slate-500">Use a script join code to collaborate without an email invitation.</p>
          </div>

          <!-- Join Code Tabs Switcher -->
          <div class="w-full bg-slate-100 rounded-xl p-1 flex items-center text-xs font-semibold">
            <button id="tabGenCodeBtn" class="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs">
              Generate Join Code
            </button>
            <button id="tabEnterCodeBtn" class="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900">
              Enter Join Code
            </button>
          </div>

          <!-- Tab Content 1: Generate Join Code -->
          <div id="paneGenerateCode" class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col gap-3">
            <div class="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div class="flex flex-col">
                <span class="text-[10px] uppercase font-bold text-slate-400">SCRIPT JOIN CODE</span>
                <span id="displayJoinCode" class="font-mono font-bold text-base text-blue-600 tracking-widest mt-0.5">${e.joinCode||"A7K9-XP42"}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <button id="copyJoinCodeBtn" class="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 text-xs font-medium flex items-center gap-1 shadow-xs transition-all">
                  <span class="material-symbols-outlined text-[15px]">content_copy</span>
                  <span id="copyJoinCodeLabel">Copy</span>
                </button>
                <button id="regenJoinCodeBtn" class="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 text-xs shadow-xs transition-all" title="Regenerate Code">
                  <span class="material-symbols-outlined text-[16px]">refresh</span>
                </button>
              </div>
            </div>
            <p class="text-[11px] text-slate-400 leading-relaxed">
              Anyone with this join code can request Editor or Viewer access to "${e.title}".
            </p>
          </div>

          <!-- Tab Content 2: Enter Join Code -->
          <div id="paneEnterCode" class="hidden bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Enter 8-Character Join Code</label>
              <div class="flex items-center gap-2">
                <input id="joinCodeInput" type="text" maxlength="9" placeholder="A7K9-XP42" class="flex-1 h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-sm uppercase tracking-widest text-slate-900 focus:outline-none focus:border-blue-600">
                <button id="verifyCodeBtn" class="h-10 px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs active:scale-95 transition-all flex items-center gap-1">
                  <span>Verify</span>
                </button>
              </div>
            </div>

            <!-- Join Code Result Card (revealed after verification) -->
            <div id="joinCodeResultCard" class="hidden bg-blue-50/50 border border-blue-200 rounded-xl p-3.5 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-900 font-heading" id="verifiedScriptTitle">Chronicles of Dust</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold" id="verifiedScriptFormat">Feature · 96 pages</span>
              </div>
              <p class="text-[11px] text-slate-500">Ready to join this shared screenplay workspace.</p>
              <button id="confirmJoinScriptBtn" class="w-full mt-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-xs active:scale-95 transition-all">
                Request to Join Workspace
              </button>
            </div>
          </div>

        </div>

      </div>
    </main>

    ${T("profile")}
  `}function tt(t){const e=i.state.selectedScriptId||"chronicles-of-dust";let a="A7K9-XP42";async function s(){const g=await Se(e),S=document.getElementById("collaborators-list");if(S){if(g.length===0){S.innerHTML='<div class="p-4 text-center text-xs text-slate-400">No external collaborators yet. Share your join code to invite teammates.</div>';return}S.innerHTML=g.map(j=>`
      <div class="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
        <div class="flex items-center gap-3 min-w-0 pr-2">
          <div class="w-9 h-9 rounded-full ${j.avatarBg||"bg-blue-100 text-blue-700"} flex items-center justify-center font-bold text-xs shrink-0">
            ${j.initials}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-slate-900 truncate">${j.name}</span>
            <span class="text-[11px] text-slate-500 truncate">${j.email}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">${j.role}</span>
          <button class="remove-collab-btn text-slate-400 hover:text-red-600 p-1" data-id="${j.id}" title="Remove access">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".remove-collab-btn").forEach(j=>{j.onclick=async()=>{const _=j.getAttribute("data-id");confirm("Remove collaborator access for this user?")&&(await Ie(e,_),f("Collaborator access removed"),s())}})}}s();const n=document.getElementById("projectSelectBtn"),l=document.getElementById("projectDropdown");n&&(n.onclick=()=>l?.classList.toggle("hidden")),document.querySelectorAll(".switch-script-opt").forEach(g=>{g.onclick=()=>{const S=g.getAttribute("data-id");i.selectScript(S),l?.classList.add("hidden"),t("/profile/collaborators")}});const u=document.getElementById("openInviteBtn"),r=document.getElementById("closeInviteBtn"),c=document.getElementById("inviteCard"),o=document.getElementById("sendInviteBtn");u&&(u.onclick=()=>c?.classList.remove("hidden")),r&&(r.onclick=()=>c?.classList.add("hidden")),o&&(o.onclick=async()=>{const g=document.getElementById("inviteEmailInput")?.value.trim(),S=document.querySelector('input[name="inviteRole"]:checked')?.value||"editor";g&&(await Ee(e,{email:g,role:S}),f(`Invited ${g} as ${S}`),c?.classList.add("hidden"),s())});const d=document.getElementById("tabGenCodeBtn"),y=document.getElementById("tabEnterCodeBtn"),m=document.getElementById("paneGenerateCode"),h=document.getElementById("paneEnterCode");d&&(d.onclick=()=>{d.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",y.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",m?.classList.remove("hidden"),h?.classList.add("hidden")}),y&&(y.onclick=()=>{y.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",d.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",h?.classList.remove("hidden"),m?.classList.add("hidden")});const E=document.getElementById("copyJoinCodeBtn"),b=document.getElementById("copyJoinCodeLabel");E&&(E.onclick=()=>{const g=document.getElementById("displayJoinCode")?.textContent||a;navigator.clipboard?.writeText(g),b.textContent="Copied!",setTimeout(()=>{b.textContent="Copy"},1800),f(`Copied code: ${g}`)});const v=document.getElementById("regenJoinCodeBtn");v&&(v.onclick=async()=>{const g=await Ce(e);a=g;const S=document.getElementById("displayJoinCode");S&&(S.textContent=g),f(`Generated new join code: ${g}`)});const w=document.getElementById("verifyCodeBtn"),p=document.getElementById("joinCodeInput"),B=document.getElementById("joinCodeResultCard"),x=document.getElementById("confirmJoinScriptBtn");p&&(p.oninput=g=>{let S=g.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"");S.length>4&&(S=S.slice(0,4)+"-"+S.slice(4,8)),g.target.value=S}),w&&p&&(w.onclick=async()=>{const g=p.value.trim();if(!g)return;w.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>';const S=await ke(g);w.innerHTML="<span>Verify</span>",S.valid?(B?.classList.remove("hidden"),document.getElementById("verifiedScriptTitle").textContent=S.script.title,document.getElementById("verifiedScriptFormat").textContent=`${S.script.format} · ${S.script.pages} pages`,f("Valid join code")):(B?.classList.add("hidden"),f("Invalid or expired join code","error"))}),x&&p&&(x.onclick=async()=>{const g=p.value.trim();await Be(g),f("Successfully joined screenplay workspace!"),t("/workspace")})}function st(){return`
    <div class="flex flex-col min-h-screen bg-surface w-full relative">
      <!-- Fixed Header with Back Button and Mark Read Action -->
      <header class="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl border-b border-slate-100 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div class="px-4 py-2.5 flex items-center justify-between max-w-2xl mx-auto">
          <div class="flex items-center gap-2">
            <button aria-label="Go back" id="btn-back-notif" class="w-9 h-9 -ml-1 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors">
              <span class="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div class="flex items-center gap-2">
              <img src="/assets/scriptora-logo.png" alt="Scriptora" class="w-6 h-6 object-contain shrink-0" />
              <div class="flex flex-col">
                <span class="font-heading text-sm font-bold text-slate-900 leading-tight">Scriptora</span>
                <span class="text-[11px] text-slate-500 font-medium leading-none">Notifications</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button id="btn-mark-all-read" class="px-2.5 py-1 text-xs text-blue-600 font-semibold hover:bg-blue-50 rounded-lg active:scale-95 transition-all flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]">done_all</span>
              <span>Mark all read</span>
            </button>
            <a href="/profile" class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs no-underline">
              ${i.state.currentUser?.initials||"JD"}
            </a>
          </div>
        </div>
      </header>

      <!-- Main Notifications Stream -->
      <main class="flex-1 flex flex-col relative w-full pt-16 pb-12 bg-surface">
        <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 space-y-4 fade-in">
          
          <!-- Top Meta Bar: Filter Tabs & State Simulator -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <button class="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all" id="filter-all-btn">
                <span>All</span>
                <span class="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]" id="badge-all-count">5</span>
              </button>
              <button class="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all" id="filter-unread-btn">
                <span>Unread</span>
                <span class="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px]" id="badge-unread-count">3</span>
              </button>
            </div>

            <!-- State Simulator Dropdown -->
            <div class="relative">
              <button id="btn-toggle-sim" class="h-8 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs flex items-center gap-1 transition-colors">
                <span class="material-symbols-outlined text-[15px]">tune</span>
                <span>Simulate</span>
              </button>

              <div id="sim-menu-dropdown" class="hidden absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg p-1 z-40">
                <button class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between sim-opt" data-state="normal">
                  <span>Active Feed</span>
                </button>
                <button class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between sim-opt" data-state="loading">
                  <span>Loading Skeleton</span>
                </button>
                <button class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between sim-opt" data-state="empty">
                  <span>Empty (Caught Up)</span>
                </button>
                <button class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between sim-opt" data-state="error">
                  <span>Sync Error State</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Real-time sync feedback telemetry -->
          <div class="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-100/80 text-slate-600 text-xs">
            <div class="flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span class="text-[11px] font-medium">Scriptora Cloud Sync Engine Active</span>
            </div>
            <span class="text-[10px] font-mono text-slate-400">v4.2.1</span>
          </div>

          <!-- Notification Feed Container -->
          <div id="notif-feed-container" class="flex flex-col gap-4">
            <!-- Dynamic Content -->
          </div>

        </div>
      </main>
    </div>
  `}function at(t){const e=document.getElementById("btn-back-notif");e&&(e.onclick=()=>{const y=i.getPreviousRoute("/workspace");t(y)});let a="all",s="normal",n=[];async function l(){const y=document.getElementById("notif-feed-container");if(!y)return;if(s==="loading"){y.innerHTML=`
        <div class="space-y-3 animate-pulse">
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
        </div>
      `;return}if(s==="error"){y.innerHTML=`
        <div class="p-6 bg-white border border-red-200 rounded-2xl flex flex-col items-center text-center gap-2">
          <span class="material-symbols-outlined text-3xl text-red-500">wifi_off</span>
          <h3 class="font-bold text-sm text-slate-900">Sync Connection Lost</h3>
          <p class="text-xs text-slate-500 max-w-xs">Unable to refresh notification stream. Please check network connection.</p>
          <button id="btn-retry-sync" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-xs hover:bg-blue-700">
            Retry Connection
          </button>
        </div>
      `,document.getElementById("btn-retry-sync")?.addEventListener("click",()=>{s="normal",l()});return}if(n=(await oe()).notifications||[],s==="empty"||a==="unread"&&n.filter(p=>p.unread).length===0){y.innerHTML=`
        <div class="p-8 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center text-center gap-2">
          <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <h3 class="font-bold text-sm text-slate-900">You’re all caught up!</h3>
          <p class="text-xs text-slate-500 max-w-xs">No pending notifications or requests requiring your review.</p>
        </div>
      `;return}const h=n.filter(p=>p.unread).length;document.getElementById("badge-all-count").textContent=n.length,document.getElementById("badge-unread-count").textContent=h,i.setState({unreadNotifications:h});let E=n;a==="unread"&&(E=E.filter(p=>p.unread));const b=E.filter(p=>p.group==="today"),v=E.filter(p=>p.group!=="today");function w(p,B){return B.length===0?"":`
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-xs font-bold text-slate-400 tracking-wider uppercase font-heading">${p}</h2>
          </div>
          <div class="flex flex-col gap-2">
            ${B.map(x=>`
              <div class="notif-row relative flex items-start gap-3 p-3.5 rounded-xl bg-white border ${x.unread?"border-l-4 border-l-blue-600 border-slate-200/80 shadow-xs":"border-slate-200/60 opacity-80"} hover:shadow-sm transition-all cursor-pointer" data-id="${x.id}" data-route="${x.actionRoute}">
                <div class="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                  ${x.sender.startsWith("icon:")?`<span class="material-symbols-outlined text-[18px] text-blue-600">${x.sender.replace("icon:","")}</span>`:x.sender}
                </div>
                <div class="flex flex-col flex-1 min-w-0">
                  <div class="flex items-baseline justify-between gap-2">
                    <h3 class="text-xs font-bold text-slate-900 truncate">${x.title}</h3>
                    <span class="text-[10px] text-slate-400 shrink-0">${x.time}</span>
                  </div>
                  <p class="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">${x.body}</p>
                  <div class="mt-2 flex items-center gap-1.5 flex-wrap">
                    ${(x.tags||[]).map(g=>`<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">${g}</span>`).join("")}
                    <span class="text-blue-600 text-[11px] font-semibold ml-auto">${x.actionLabel||"View →"}</span>
                  </div>
                </div>
                ${x.unread?'<div class="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1"></div>':""}
              </div>
            `).join("")}
          </div>
        </div>
      `}y.innerHTML=w("Today",b)+w("Earlier",v),document.querySelectorAll(".notif-row").forEach(p=>{p.onclick=async()=>{const B=parseInt(p.getAttribute("data-id")),x=p.getAttribute("data-route");await je(B),await i.refreshNotifications(),x?t(x):l()}})}l();const u=document.getElementById("filter-all-btn"),r=document.getElementById("filter-unread-btn");u&&(u.onclick=()=>{a="all",u.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",r.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",l()}),r&&(r.onclick=()=>{a="unread",r.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",u.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",l()});const c=document.getElementById("btn-mark-all-read");c&&(c.onclick=async()=>{await Ae(),await i.refreshNotifications(),f("All notifications marked as read"),l()});const o=document.getElementById("btn-toggle-sim"),d=document.getElementById("sim-menu-dropdown");o&&(o.onclick=()=>d?.classList.toggle("hidden")),document.querySelectorAll(".sim-opt").forEach(y=>{y.onclick=()=>{s=y.getAttribute("data-state"),d?.classList.add("hidden"),l(),f(`Simulating ${s} state`)}})}class nt{constructor(){this.appEl=null,this.currentPath=null}getBasePath(){return window.location.pathname.toLowerCase().startsWith("/scriptora")?"/Scriptora":""}getCurrentLocation(){return window.location.hash&&window.location.hash.startsWith("#/")?window.location.hash.slice(1):window.location.pathname+window.location.search}init(e="#app"){if(this.appEl=document.querySelector(e),!this.appEl){console.error(`Mount element ${e} not found.`);return}document.body.addEventListener("click",a=>{const s=a.target.closest("a");if(s&&s.href&&s.origin===window.location.origin&&!s.hasAttribute("download")&&s.getAttribute("target")!=="_blank"&&!s.getAttribute("rel")?.includes("external")){const n=new URL(s.href),l=n.pathname+n.search+n.hash;l.startsWith("/api")||(a.preventDefault(),this.navigate(l))}}),window.addEventListener("popstate",()=>{this.resolve(this.getCurrentLocation())}),window.addEventListener("hashchange",()=>{this.resolve(this.getCurrentLocation())}),this.resolve(this.getCurrentLocation())}navigate(e,a=!1){this.currentPath&&i.pushHistory(this.currentPath);const s=this.getBasePath(),n=s&&e.toLowerCase().startsWith(s.toLowerCase())?e.slice(s.length)||"/":e,l=s&&!e.startsWith(s)?`${s}${n.startsWith("/")?"":"/"}${n}`:e;a?window.history.replaceState(null,"",l):window.history.pushState(null,"",l),this.resolve(n)}resolve(e){const[a,s]=e.split("?");let n=a.replace(/\/+$/,"")||"/";const l=this.getBasePath();l&&n.toLowerCase().startsWith(l.toLowerCase())&&(n=n.slice(l.length)||"/"),n.startsWith("/")||(n="/"+n);const u=new URLSearchParams(s||"");this.currentPath=e;const r=!!i.state.currentUser;if(!r&&!["/welcome","/auth"].includes(n)){this.navigate("/auth",!0);return}if(r&&n==="/auth"){this.navigate("/workspace",!0);return}if(n==="/"){r?this.navigate("/workspace",!0):this.navigate("/welcome",!0);return}if(n==="/welcome"){this.render(_e(),()=>De(this.navigate.bind(this)));return}if(n==="/auth"){this.render(Le(),()=>Me(this.navigate.bind(this)));return}if(n==="/workspace"){this.render(Oe(),()=>Re(this.navigate.bind(this)));return}if(n==="/editor"){const o=i.state.selectedScriptId||"chronicles-of-dust",d=u.get("scene");this.navigate(`/editor/${o}${d?`?scene=${d}`:""}`,!0);return}if(n.startsWith("/editor/")){const o=n.split("/")[2],d=u.get("scene");i.setState({selectedScriptId:o}),this.render(Fe(o,d),()=>Je(o,this.navigate.bind(this)));return}if(n==="/intelligence"||n==="/intelligence/select"){this.render(qe(),()=>He(this.navigate.bind(this)));return}if(n==="/intelligence/context"){this.render(Ue(),()=>Ve(this.navigate.bind(this)));return}if(n==="/intelligence/dashboard"||n==="/intelligence/overview"){this.render(We(),()=>ze(this.navigate.bind(this)));return}if(n==="/intelligence/analysis"||n==="/intelligence/analysis/select"){this.render(Ge(),()=>Ke(this.navigate.bind(this)));return}if(n.startsWith("/intelligence/analysis/")){const o=n.split("/")[3]||"pacing";this.render(Xe(o),()=>Ye(o,this.navigate.bind(this)));return}if(n==="/profile"){this.render(Qe(),()=>Ze(this.navigate.bind(this)));return}if(n==="/profile/collaborators"){this.render(et(),()=>tt(this.navigate.bind(this)));return}if(n==="/notifications"){this.render(st(),()=>at(this.navigate.bind(this)));return}this.renderNotFound(n)}render(e,a){if(this.appEl&&(this.appEl.innerHTML=e,window.scrollTo({top:0,behavior:"instant"}),typeof a=="function"))try{a()}catch(s){console.error("Error attaching screen events:",s)}}renderNotFound(e){this.appEl.innerHTML=`
      <div class="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-surface">
        <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <span class="material-symbols-outlined text-[32px]">sentiment_dissatisfied</span>
        </div>
        <h1 class="font-heading font-bold text-xl text-slate-900 mb-1">Page Not Found</h1>
        <p class="text-xs text-slate-500 mb-6 max-w-xs">The route <code class="font-mono bg-slate-100 px-1 py-0.5 rounded text-blue-600">${e}</code> does not exist.</p>
        <button id="notfound-home" class="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-xs shadow-xs hover:bg-blue-700 transition-colors">
          Return to Workspace
        </button>
      </div>
    `;const a=document.getElementById("notfound-home");a&&(a.onclick=()=>this.navigate("/workspace"))}}const lt=new nt;async function ne(){try{await i.init(),lt.init("#app"),window.addEventListener("online",()=>{f("Back online. Synchronizing changes..."),i.refreshScripts(),i.refreshNotifications()}),window.addEventListener("offline",()=>{f("Offline mode active. Edits saved locally.","info")}),console.log("Scriptora initialized successfully in production-ready mode.")}catch(t){console.error("Scriptora bootstrap failed:",t)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ne):ne();
