(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(a){if(a.ep)return;a.ep=!0;const l=s(a);fetch(a.href,l)}})();const rt="http://localhost:8000/api";async function $(e,t={}){const s=`${rt}${e}`,n={headers:{"Content-Type":"application/json",...t.headers},...t};try{const a=await fetch(s,n);if(!a.ok){const l=await a.json().catch(()=>({}));throw new Error(l.error||`HTTP error ${a.status}`)}return await a.json()}catch(a){throw console.warn(`API call ${e} failed, falling back to local store:`,a.message),a}}const we=[{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",industry:"International / Hollywood",pages:96,updated:"12m ago",currentScene:"Scene 18",isCurrentDraft:!0,archived:!1,joinCode:"A7K9-XP42",logline:"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.",synopsis:"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves.",context:{format:"Feature",industry:"International / Hollywood",hours:1,minutes:36,seconds:0,plannedDuration:"01:36:00"},analysisScores:{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80}},{id:"the-neon-horizon",title:"The Neon Horizon",draft:"Draft 2.1",genre:"Sci-Fi",format:"Pilot",industry:"Streaming Television",pages:62,updated:"2h ago",currentScene:"Scene 4",isCurrentDraft:!1,archived:!1,joinCode:"N3ON-H0RZ",context:{format:"Pilot",industry:"Streaming Television",hours:0,minutes:52,seconds:0,plannedDuration:"00:52:00"},analysisScores:{overall:79,pacing:75,dialogue:84,emotion:80,characterArc:78,continuity:82,storyStructure:76,theme:88,cinema:83,formatting:90,production:72}},{id:"velvet-shadows",title:"Velvet Shadows",draft:"Draft 1.0",genre:"Noir",format:"Feature",industry:"Independent / Festival",pages:114,updated:"Yesterday",currentScene:"Scene 1",isCurrentDraft:!1,archived:!1,joinCode:"V3LV-SHDW",analysisScores:{overall:81,pacing:80,dialogue:86,emotion:79,characterArc:85,continuity:80,storyStructure:82,theme:84,cinema:88,formatting:92,production:76}},{id:"silent-echoes",title:"Silent Echoes",draft:"Draft 3.0",genre:"Psychological Thriller",format:"Feature",industry:"International / Hollywood",pages:104,updated:"3d ago",currentScene:"Scene 22",isCurrentDraft:!1,archived:!1,joinCode:"SLNT-ECH0",analysisScores:{overall:84,pacing:86,dialogue:81,emotion:88,characterArc:83,continuity:85,storyStructure:89,theme:82,cinema:84,formatting:91,production:78}},{id:"glass-kingdoms",title:"Glass Kingdoms",draft:"Draft 1.4",genre:"Fantasy",format:"Pilot",industry:"Streaming Television",pages:58,updated:"1w ago",currentScene:"Scene 8",isCurrentDraft:!1,archived:!1,joinCode:"GLSS-KNGD",analysisScores:{overall:78,pacing:74,dialogue:80,emotion:76,characterArc:82,continuity:75,storyStructure:80,theme:86,cinema:82,formatting:88,production:70}},{id:"red-shift",title:"Red Shift",draft:"Draft 2.0",genre:"Action",format:"Short",industry:"Independent / Festival",pages:28,updated:"2w ago",currentScene:"Scene 5",isCurrentDraft:!1,archived:!1,joinCode:"RED2-SHFT",analysisScores:{overall:83,pacing:90,dialogue:78,emotion:75,characterArc:80,continuity:88,storyStructure:84,theme:80,cinema:89,formatting:95,production:82}}];async function Ke(){try{return(await $("/auth/me")).user}catch{const e=localStorage.getItem("scriptora_user");if(e)try{const s=JSON.parse(e);if(s&&s.displayName)return s}catch{}const t={id:"user-1",name:"Arun Kumar",displayName:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function Ve(e){try{const t=await $("/auth/login",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-1",name:e.email?e.email.split("@")[0]:"Arun Kumar",displayName:e.email?e.email.split("@")[0]:"Arun Kumar",email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Narrative Director",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function ct(e){try{const t=await $("/auth/register",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:`user-${Date.now()}`,name:e.name||"New Writer",displayName:e.name||"New Writer",email:e.email||"writer@scriptora.studio",headline:"Screenwriter",badge:"Member Pro",initials:(e.name||"NW").slice(0,2).toUpperCase(),stats:{drafts:1,coAuthors:0,healthIndex:"100%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function dt(e){try{const t=await $("/auth/otp",{method:"POST",body:JSON.stringify({phone:e})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-phone",name:"Verified Writer",displayName:"Verified Writer",headline:"Screenwriter",email:e,badge:"Member Pro",initials:"VW",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function $e(){try{await $("/auth/logout",{method:"POST"})}catch{}return localStorage.removeItem("scriptora_user"),!0}async function _(e=""){try{const n=e?`/scripts?q=${encodeURIComponent(e)}`:"/scripts",a=await $(n);if(a.scripts&&a.scripts.length>0)return localStorage.setItem("scriptora_scripts",JSON.stringify(a.scripts)),a.scripts}catch{}const t=localStorage.getItem("scriptora_scripts");let s;if(t)try{s=JSON.parse(t),(!Array.isArray(s)||s.length===0)&&(s=[...we],localStorage.setItem("scriptora_scripts",JSON.stringify(s)))}catch{s=[...we],localStorage.setItem("scriptora_scripts",JSON.stringify(s))}else s=[...we],localStorage.setItem("scriptora_scripts",JSON.stringify(s));return e&&(s=s.filter(n=>n.title.toLowerCase().includes(e.toLowerCase()))),s}async function Ye(e){try{const s=await $(`/scripts/${e}`);if(s.script)return s.script}catch{}const t=await _();return t.find(s=>s.id===e)||we.find(s=>s.id===e)||t[0]||null}async function pt(e){try{const a=await $("/scripts",{method:"POST",body:JSON.stringify(e)});if(a.script){const l=await _();return localStorage.setItem("scriptora_scripts",JSON.stringify([a.script,...l.filter(i=>i.id!==a.script.id)])),a.script}}catch{}const t={id:(e.title||"untitled").toLowerCase().replace(/[^a-z0-9]+/g,"-"),title:e.title||"Untitled Screenplay",draft:"Draft 1.0",genre:e.genre||"Drama",format:e.format||"Feature",industry:e.industry||"International / Hollywood",pages:1,updated:"Just now",currentScene:"Scene 1",joinCode:"SCRP-1001",archived:!1,context:{format:e.format||"Feature",industry:e.industry||"International / Hollywood",hours:1,minutes:30,seconds:0,plannedDuration:"01:30:00"},analysisScores:{overall:80,pacing:78,dialogue:80,emotion:80,characterArc:78,continuity:80,storyStructure:80,theme:80,cinema:80,formatting:90,production:75}},s=await _(),n=[t,...s.filter(a=>a.id!==t.id)];return localStorage.setItem("scriptora_scripts",JSON.stringify(n)),t}async function ut(e,t){try{const a=await $(`/scripts/${e}`,{method:"PUT",body:JSON.stringify(t)});if(a.script){const i=(await _()).map(o=>o.id===e?a.script:o);return localStorage.setItem("scriptora_scripts",JSON.stringify(i)),a.script}}catch{}const n=(await _()).map(a=>a.id===e?{...a,...t,updated:"Just now"}:a);return localStorage.setItem("scriptora_scripts",JSON.stringify(n)),{id:e,...t,updated:"Just now"}}async function xt(e){try{await $(`/scripts/${e}`,{method:"DELETE"})}catch{}const s=(await _()).filter(n=>n.id!==e);return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),{success:!0}}async function ft(e){try{const l=await $(`/scripts/${e}/duplicate`,{method:"POST"});if(l.script){const i=await _();return localStorage.setItem("scriptora_scripts",JSON.stringify([l.script,...i])),l.script}}catch{}const t=await Ye(e),s={...t,id:`${e}-copy-${Date.now().toString().slice(-4)}`,title:`${t?.title||"Script"} (Copy)`,updated:"Just now"},n=await _(),a=[s,...n];return localStorage.setItem("scriptora_scripts",JSON.stringify(a)),s}async function mt(e){try{await $(`/scripts/${e}/archive`,{method:"POST"})}catch{}const s=(await _()).map(n=>n.id===e?{...n,archived:!0,updated:"Just now"}:n);return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),{success:!0}}const bt={id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pageCount:5,wordCount:14280,titlePage:{title:"CHRONICLES OF DUST",author:"Arun Kumar",contact:"Scriptora Studio · arun.kumar@scriptora.studio · +1 (555) 019-2834",notes:"An original screenplay. Draft 4.2 Production Cut."},settings:{sceneNumbers:!0,sceneNumberSide:"left",smartFormatting:!0,fontSize:"12pt",lineSpacing:"1.5",language:"English"},acts:[{id:"act-1",name:"ACT I - The Broken Siphon"},{id:"act-2",name:"ACT II - The Pressure Surge"},{id:"act-3",name:"ACT III - The Floodgate Standoff"}],characters:[],locations:[],times:["DAY","NIGHT","CONTINUOUS","DAWN","DUSK","LATER","MORNING","EVENING"],transitions:["CUT TO:","FADE IN:","FADE OUT.","DISSOLVE TO:","SMASH CUT TO:","MATCH CUT TO:","JUMP CUT TO:"],scenes:[{id:"scene-1",number:1,actId:"act-1",slugline:"",blocks:[{id:"b-1-1",type:"scene",content:""}]}]};async function gt(e){try{const n=await $(`/screenplay/${e}`);if(n.screenplay&&n.screenplay.scenes&&n.screenplay.scenes.length>0&&!n.screenplay.scenes.some(l=>l.blocks?.some(i=>i.content?.includes("Kevin")||i.id==="b-18-1")))return n.screenplay}catch{}const t=localStorage.getItem(`scriptora_screenplay_${e}`);if(t)try{const n=JSON.parse(t),a=n&&n.scenes&&n.scenes.some(l=>l.id==="scene-18"||l.blocks?.some(i=>i.content?.includes("Kevin")||i.id==="b-18-1"));if(n&&n.scenes&&n.scenes.length>0&&!a)return n}catch{}const s=JSON.parse(JSON.stringify(bt));return s.id=e||"script_01",localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(s)),s}async function ht(e,t){localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(t));try{return await $(`/screenplay/${e}`,{method:"PUT",body:JSON.stringify({screenplay:t})})}catch{return{success:!0}}}async function vt(e){try{return(await $(`/versions/${e}`)).versions}catch{return[{id:"v-4.2",name:"Draft 4.2",tag:"Current Active",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:"Refined Meera O.S. dialogue and hydro-sensor action line.",isCurrent:!0},{id:"v-3.0",name:"Draft 3.0",tag:"Production Polish",timestamp:"Yesterday, 4:15 PM",author:"JD",stats:"94 pages · 13,950 words",notes:"Incorporated director notes on floodgate transition pacing.",isCurrent:!1},{id:"v-2.0",name:"Draft 2.0",tag:"First Table Read",timestamp:"Oct 12, 2024",author:"JD",stats:"90 pages · 13,200 words",notes:"Table read revision for Acts I & II character arcs.",isCurrent:!1}]}}async function yt(e,t){try{return(await $(`/versions/${e}`,{method:"POST",body:JSON.stringify(t)})).version}catch{return{id:`v-${Date.now()}`,name:t.name,tag:"Milestone Snapshot",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:t.notes||"",isCurrent:!0}}}async function wt(e){try{return(await $(`/collaborators/${e}`)).collaborators}catch{return[{id:"c-1",name:"Heamanth S.",email:"heamanth@studio.com",initials:"HS",role:"Editor",avatarBg:"bg-blue-100 text-blue-700",status:"Active",added:"2d ago"},{id:"c-2",name:"Elena Rostova",email:"elena@cineworks.io",initials:"ER",role:"Script Doctor",avatarBg:"bg-amber-100 text-amber-700",status:"Active",added:"1w ago"},{id:"c-3",name:"Marcus Vance",email:"vance.prod@paramount.com",initials:"MV",role:"Producer",avatarBg:"bg-purple-100 text-purple-700",status:"Viewer",added:"2w ago"}]}}async function St(e,t){try{return(await $(`/collaborators/${e}/invite`,{method:"POST",body:JSON.stringify(t)})).collaborator}catch{return{id:`c-${Date.now()}`,name:t.email.split("@")[0],email:t.email,initials:t.email.substring(0,2).toUpperCase(),role:t.role==="editor"?"Editor":"Viewer",avatarBg:"bg-emerald-100 text-emerald-700",status:"Active",added:"Just now"}}}async function It(e,t){try{return await $(`/collaborators/${e}/${t}`,{method:"DELETE"})}catch{return{success:!0}}}async function kt(e){try{return(await $("/join-code/generate",{method:"POST",body:JSON.stringify({scriptId:e})})).joinCode}catch{return Math.random().toString(36).substring(2,6).toUpperCase()+"-"+Math.random().toString(36).substring(2,6).toUpperCase()}}async function Et(e){try{return await $("/join-code/validate",{method:"POST",body:JSON.stringify({code:e})})}catch{return(e||"").toUpperCase().trim()==="A7K9-XP42"?{valid:!0,script:{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",pages:96,collaboratorCount:3}}:{valid:!1,error:"Invalid or expired join code"}}}async function Ct(e){try{return await $("/join-code/redeem",{method:"POST",body:JSON.stringify({code:e})})}catch{return{success:!0,scriptId:"chronicles-of-dust",title:"Chronicles of Dust"}}}async function Xe(){try{return await $("/notifications")}catch{return{notifications:[{id:1,sender:"HS",senderName:"Heamanth",type:"collaboration_invite",title:"Heamanth invited you to collaborate",body:'Added you as an Editor on "Chronicles of Dust" (Draft 4.2).',time:"12m ago",group:"today",unread:!0,tags:["Draft 4.2","Role: Editor"],actionLabel:"Review Access →",actionRoute:"/profile/collaborators"},{id:2,sender:"icon:description",type:"export_ready",title:"Your export is ready",body:'"Chronicles of Dust (Draft 4.2)" exported as standard Industry PDF.',time:"45m ago",group:"today",unread:!0,tags:["PDF","96 Pages"],actionLabel:"Open Screenplay →",actionRoute:"/editor/chronicles-of-dust"},{id:3,sender:"AK",senderName:"Arun K.",type:"join_code_request",title:"Join-code access request",body:'Requested Editor access to "Anbin Mozhi" via join-code A7K9-XP42.',time:"2h ago",group:"today",unread:!0,tags:["Code: A7K9-XP42"],actionLabel:"Manage Collaborators →",actionRoute:"/profile/collaborators"}],unreadCount:3}}}async function At(e){try{return await $(`/notifications/${e}/read`,{method:"POST"})}catch{return{success:!0}}}async function Bt(){try{return await $("/notifications/read-all",{method:"POST"})}catch{return{success:!0}}}async function He(){return(await Xe()).unreadCount||0}async function Tt(e){try{const t=await $("/profile",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.profile)),t.profile}catch{const s={...await Ke()||{},...e};return localStorage.setItem("scriptora_user",JSON.stringify(s)),s}}async function $t(){try{return(await $("/settings")).settings}catch{const e=localStorage.getItem("scriptora_settings");return e?JSON.parse(e):{editor:{autoSceneHeading:!0,autoCharacter:!0,autoTransition:!0,enterAfterAction:!0,tabAfterAction:!0,autoCapitalize:!0,continueDialogue:!0,showSceneNumbers:!0,lockSceneNumbers:!1,fontSize:"Courier Prime 12pt",lineSpacing:"1.5 line",focusMode:!1},language:"English (US)",appearance:"Light",notifications:{collaborationInvites:!0,collaborationEdits:!0,mentions:!0,versionMilestones:!0},intelligence:{querySuggestions:!0,analysisSuggestions:!0}}}}async function Pt(e,t){try{return(await $(`/intelligence/${e}/context`,{method:"PUT",body:JSON.stringify(t)})).context}catch{return t}}async function Qe(e,t){try{return(await $("/intelligence/query",{method:"POST",body:JSON.stringify({query:e,scriptId:t})})).answer}catch{return"Analysis: In this screenplay, scene tempo and dialogue density align with core narrative milestones. Characters express distinct agendas in each beat."}}class Nt{constructor(){this.state={currentUser:null,selectedScriptId:localStorage.getItem("scriptora_selected_script")||"chronicles-of-dust",selectedVersionId:"Draft 4.2",currentSceneId:18,unreadNotifications:3,scripts:[],activeScript:null,screenplay:null,settings:null,historyStack:[]},this.listeners=new Set}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(const t of this.listeners)try{t(this.state)}catch(s){console.error("Store listener error:",s)}}setState(t){this.state={...this.state,...t},t.selectedScriptId&&localStorage.setItem("scriptora_selected_script",t.selectedScriptId),this.notify()}pushHistory(t){this.state.historyStack[this.state.historyStack.length-1]!==t&&this.state.historyStack.push(t)}getPreviousRoute(t="/workspace"){return this.state.historyStack.length>1?(this.state.historyStack.pop(),this.state.historyStack.pop()):t}async init(){try{const t=await Ke(),s=await _(),n=await He(),a=await $t(),l=s.find(i=>i.id===this.state.selectedScriptId)||s[0];this.setState({currentUser:t,scripts:s,activeScript:l,unreadNotifications:n,settings:a})}catch(t){console.error("Init store error:",t)}}async selectScript(t){const s=this.state.scripts.find(n=>n.id===t)||await Ye(t);this.setState({selectedScriptId:t,activeScript:s})}async refreshNotifications(){const t=await He();this.setState({unreadNotifications:t})}async refreshScripts(){const t=await _(),s=t.find(n=>n.id===this.state.selectedScriptId)||t[0];this.setState({scripts:t,activeScript:s})}}const b=new Nt;function v(e,t="success"){const s=document.getElementById("global-toast"),n=document.getElementById("toast-message"),a=document.getElementById("toast-icon");if(!s||!n){console.log(`[Toast ${t}]`,e);return}n.textContent=e,a&&(t==="error"?(a.textContent="error",a.className="material-symbols-outlined text-[18px] text-red-400"):t==="info"?(a.textContent="info",a.className="material-symbols-outlined text-[18px] text-blue-300"):(a.textContent="check_circle",a.className="material-symbols-outlined text-[18px] text-emerald-300")),s.classList.remove("opacity-0","pointer-events-none"),s.classList.add("opacity-100"),clearTimeout(s._timeout),s._timeout=setTimeout(()=>{s.classList.remove("opacity-100"),s.classList.add("opacity-0","pointer-events-none")},2400)}const jt=""+new URL("logo-BG9jZ7UG.png",import.meta.url).href,he=jt;function Lt(){return`
    <main class="flex flex-col relative w-full pt-safe pb-safe bg-surface min-h-screen justify-center items-center px-4">
      <div class="flex flex-col w-full max-w-sm py-8 fade-in">
        <!-- Brand & Logo Header -->
        <header class="flex flex-col items-center justify-center pb-4 text-center">
          <img src="${he}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-16 h-16 object-contain mb-3 drop-shadow-sm" />
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
  `}function Mt(e){const t=document.getElementById("tab-signin"),s=document.getElementById("tab-register"),n=document.getElementById("tab-otp"),a=document.getElementById("flow-signin"),l=document.getElementById("flow-register"),i=document.getElementById("flow-otp");function o(m){[t,s,n].forEach(g=>{g.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 text-on-surface-variant hover:text-on-surface"}),[a,l,i].forEach(g=>g.classList.add("hidden")),m==="signin"?(t.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",a.classList.remove("hidden")):m==="register"?(s.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",l.classList.remove("hidden")):m==="otp"&&(n.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold flex items-center justify-center gap-1",i.classList.remove("hidden"))}t&&(t.onclick=()=>o("signin")),s&&(s.onclick=()=>o("register")),n&&(n.onclick=()=>o("otp"));const c=document.getElementById("toggle-pw-signin"),d=document.getElementById("signin-password");c&&d&&(c.onclick=()=>{const m=d.type==="password";d.type=m?"text":"password",c.innerHTML=`<span class="material-symbols-outlined text-[18px]">${m?"visibility_off":"visibility"}</span>`});const r=document.getElementById("btn-google-login");r&&(r.onclick=async()=>{v("Connecting with Google...");const m=await Ve({email:"arun.kumar@scriptora.studio",provider:"google"});b.setState({currentUser:m}),e("/welcome")});const p=document.getElementById("form-signin");p&&(p.onsubmit=async m=>{m.preventDefault();const g=document.getElementById("signin-email").value,y=d.value;try{const w=await Ve({email:g,password:y});b.setState({currentUser:w}),v(`Welcome back, ${w.displayName||w.name}`),e("/welcome")}catch(w){v(w.message,"error")}});const u=document.getElementById("form-register");u&&(u.onsubmit=async m=>{m.preventDefault();const g=document.getElementById("reg-name").value,y=document.getElementById("reg-email").value,w=document.getElementById("reg-password").value;try{const N=await ct({name:g,email:y,password:w});b.setState({currentUser:N}),v("Account created successfully"),e("/welcome")}catch(N){v(N.message,"error")}});const f=document.getElementById("form-otp");f&&(f.onsubmit=async m=>{m.preventDefault();const g=document.getElementById("otp-phone").value;try{const y=await dt(g);b.setState({currentUser:y}),v("Phone verified successfully"),e("/welcome")}catch(y){v(y.message,"error")}});const h=document.getElementById("btn-forgot-pw");h&&(h.onclick=()=>{v("Password reset link sent to registered email","info")})}function Dt(){return b.state.currentUser,`
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
          <img src="${he}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-20 h-20 object-contain mb-5 drop-shadow-sm" />

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
  `}function Ot(e){const t=document.getElementById("welcome-sign-out");t&&(t.onclick=async()=>{await $e(),b.setState({currentUser:null}),v("Signed out successfully"),e("/auth")})}function ee(e="Workspace",t="Your writing space."){const s=b.state.unreadNotifications,n=b.state.currentUser?.initials||"JD";return`
    <header class="fixed top-0 w-full z-40 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-surface-container-high/60">
      <div class="h-14 px-4 flex items-center justify-between max-w-2xl mx-auto">
        <a href="/workspace" class="flex items-center gap-2.5 min-w-0 no-underline text-inherit cursor-pointer active:opacity-80 transition-opacity">
          <img src="${he}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora" class="w-8 h-8 object-contain shrink-0" />
          <div class="flex flex-col min-w-0 leading-tight">
            <span class="font-heading font-bold text-base tracking-tight text-on-surface">Scriptora</span>
            <span class="text-[11px] text-slate-500 font-medium truncate">${e}</span>
          </div>
        </a>

        <div class="flex items-center gap-2">
          <!-- Notification Bell connecting to /notifications -->
          <a href="/notifications" class="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-on-surface hover:bg-slate-100 transition-colors" aria-label="Notifications" id="header-notif-btn">
            <span class="material-symbols-outlined text-[20px]">notifications</span>
            ${s>0?'<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white animate-pulse"></span>':""}
          </a>

          <!-- Profile Avatar connecting to /profile -->
          <a href="/profile" class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs shadow-xs hover:bg-blue-700 active:scale-95 transition-all no-underline" aria-label="User account" id="header-profile-btn">
            <span>${n}</span>
          </a>
        </div>
      </div>
    </header>
  `}function te(e="workspace"){const t=e==="workspace",s=e==="intelligence",n=e==="profile";return`
    <nav class="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container-high/60">
      <div class="h-14 px-6 flex items-center justify-around max-w-2xl mx-auto">
        <!-- 1. Workspace Tab -->
        <a href="/workspace" class="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${t?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-workspace">
          <span class="material-symbols-outlined text-[22px]" ${t?`style="font-variation-settings: 'FILL' 1;"`:""}>description</span>
          <span class="text-[11px] font-medium mt-0.5">Workspace</span>
          ${t?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':""}
        </a>

        <!-- 2. Intelligence Tab -->
        <a href="/intelligence" class="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${s?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-intelligence">
          <span class="material-symbols-outlined text-[22px]" ${s?`style="font-variation-settings: 'FILL' 1;"`:""}>insights</span>
          <span class="text-[11px] font-medium mt-0.5">Intelligence</span>
          ${s?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':""}
        </a>

        <!-- 3. Profile Tab -->
        <a href="/profile" class="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${n?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-profile">
          <span class="material-symbols-outlined text-[22px]" ${n?`style="font-variation-settings: 'FILL' 1;"`:""}>account_circle</span>
          <span class="text-[11px] font-medium mt-0.5">Profile</span>
          ${n?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':""}
        </a>
      </div>
    </nav>
  `}function Rt(){const e=b.state.scripts||[],t=e.find(n=>n.isCurrentDraft)||e[0],s=e.slice(0,3);return`
    ${ee("Workspace","Your writing space.")}

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
        ${t?`
          <div class="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="bg-blue-100/70 text-blue-700 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">CURRENT DRAFT</span>
              <span class="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <span class="material-symbols-outlined text-[13px]">schedule</span>
                ${t.updated||"Recently"}
              </span>
            </div>
            <h2 class="font-semibold text-base text-slate-900 mt-2 font-heading tracking-tight">${t.title}</h2>
            <p class="text-xs text-slate-500 mt-0.5">${t.draft} · ${t.currentScene||"Scene 1"} · ${t.pages} pages</p>
            
            <div class="rounded-xl p-3 mt-3 bg-slate-50 border border-slate-100">
              <div class="flex items-center justify-between text-xs font-bold text-blue-600 uppercase tracking-wider">
                <span>${t.currentScene||"SCENE 1"}</span>
                <span class="material-symbols-outlined text-[15px] text-slate-400">movie</span>
              </div>
              <p class="font-mono italic text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                "INT. CUSTOMS OFFICE - NIGHT - Kevin kneels over cracked hydro-sensor junction box, static..."
              </p>
            </div>

            <button type="button" id="btn-continue-writing" data-script-id="${t.id}" class="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-medium text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 mt-3 shadow-xs transition-all">
              <span>Continue Writing (${t.currentScene||"Scene 18"})</span>
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
            ${s.map(n=>`
              <div data-script-id="${n.id}" class="script-item-row px-3.5 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
                <div class="flex items-center gap-3 min-w-0 pr-2">
                  <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[18px]">description</span>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-semibold text-slate-900 truncate">${n.title}</span>
                      <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">${n.genre}</span>
                    </div>
                    <span class="text-[11px] text-slate-500 truncate mt-0.5">${n.draft} · ${n.pages} pages · Edited ${n.updated}</span>
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
              <span class="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-medium" id="total-scripts-badge">${e.length} total</span>
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
            ${e.map(n=>`
              <div data-script-id="${n.id}" class="script-item-row px-3.5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                <div class="flex items-center gap-3 min-w-0 pr-2 flex-1">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <span class="material-symbols-outlined text-[16px]">movie</span>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span class="text-xs font-semibold text-slate-900 truncate">${n.title}</span>
                    <span class="text-[11px] text-slate-500 truncate mt-0.5">${n.draft} · ${n.pages} pages · Edited ${n.updated}</span>
                  </div>
                </div>

                <div class="relative">
                  <button type="button" class="script-more-btn w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" data-script-id="${n.id}" aria-label="More actions">
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

    ${te("workspace")}
  `}function _t(e){let t=null;const s=document.getElementById("btn-continue-writing");s&&(s.onclick=()=>{const u=s.getAttribute("data-script-id");b.selectScript(u),e(`/editor/${u}?scene=18`)}),document.querySelectorAll(".script-item-row").forEach(u=>{u.onclick=f=>{if(f.target.closest(".script-more-btn"))return;const h=u.getAttribute("data-script-id");b.selectScript(h),e(`/editor/${h}`)}});const n=document.getElementById("screenplay-search");n&&(n.oninput=u=>{const f=u.target.value.toLowerCase().trim();document.querySelectorAll("#screenplays-library-list .script-item-row").forEach(m=>{const g=m.querySelector(".font-semibold")?.textContent.toLowerCase()||"";m.style.display=g.includes(f)?"flex":"none"})});const a=document.getElementById("btn-new-script"),l=document.getElementById("new-script-modal"),i=document.getElementById("close-new-script-modal"),o=document.getElementById("cancel-new-script-btn"),c=document.getElementById("form-new-script");function d(u){l&&(u?(l.classList.remove("hidden"),l.classList.add("flex"),document.getElementById("new-script-title")?.focus()):(l.classList.add("hidden"),l.classList.remove("flex")))}a&&(a.onclick=()=>d(!0)),i&&(i.onclick=()=>d(!1)),o&&(o.onclick=()=>d(!1)),c&&(c.onsubmit=async u=>{u.preventDefault();const f=document.getElementById("new-script-title").value.trim(),h=document.getElementById("new-script-format").value,m=document.getElementById("new-script-genre").value;if(f)try{const g=await pt({title:f,format:h,genre:m});await b.refreshScripts(),b.selectScript(g.id),d(!1),v(`Created "${g.title}"`),e(`/editor/${g.id}`)}catch(g){v(g.message,"error")}});const r=document.getElementById("script-menu-popover");document.querySelectorAll(".script-more-btn").forEach(u=>{u.onclick=f=>{f.stopPropagation(),t=u.getAttribute("data-script-id");const h=u.getBoundingClientRect();r.style.top=`${h.bottom+window.scrollY+4}px`,r.style.left=`${Math.min(h.left-130,window.innerWidth-180)}px`,r.classList.remove("hidden")}}),window.onclick=u=>{!u.target.closest("#script-menu-popover")&&!u.target.closest(".script-more-btn")&&r?.classList.add("hidden")},document.getElementById("menu-opt-open")?.addEventListener("click",()=>{r.classList.add("hidden"),t&&(b.selectScript(t),e(`/editor/${t}`))}),document.getElementById("menu-opt-rename")?.addEventListener("click",async()=>{r.classList.add("hidden");const u=prompt("Enter new title for this screenplay:");u&&u.trim()&&(await ut(t,{title:u.trim()}),await b.refreshScripts(),v("Screenplay renamed"),e("/workspace"))}),document.getElementById("menu-opt-duplicate")?.addEventListener("click",async()=>{r.classList.add("hidden"),await ft(t),await b.refreshScripts(),v("Screenplay duplicated"),e("/workspace")}),document.getElementById("menu-opt-archive")?.addEventListener("click",async()=>{r.classList.add("hidden"),await mt(t),await b.refreshScripts(),v("Screenplay archived"),e("/workspace")}),document.getElementById("menu-opt-delete")?.addEventListener("click",async()=>{r.classList.add("hidden"),confirm("Are you sure you want to delete this screenplay? This action cannot be undone.")&&(await xt(t),await b.refreshScripts(),v("Screenplay deleted"),e("/workspace"))});const p=document.getElementById("btn-export-library");p&&(p.onclick=()=>{const u="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(b.state.scripts,null,2)),f=document.createElement("a");f.setAttribute("href",u),f.setAttribute("download",`scriptora_library_${Date.now()}.json`),document.body.appendChild(f),f.click(),f.remove(),v("Exported library manifest (.json)")})}let x=null,ie=null,Pe=null,ye=!1,F=!1,Y=!0,G=!1,Ce="EN",D=[],X=-1,Ae=null,Be=null,M=localStorage.getItem("scriptora_autosave")!=="false",Je="screenplay";const P=[],Ze=46;function Ft(e,t=null){const s=b.state.scripts?.find(a=>a.id===e)||b.state.activeScript||{title:"Untitled Screenplay",draft:"Draft 1.0"},n=b.state.currentUser?.initials||"AK";return`
    <div id="editor-root" class="flex flex-col min-h-screen bg-slate-100 text-slate-900 w-full relative select-text antialiased">
      
      <!-- ========================================================= -->
      <!-- STATIC TOP HEADER (FIXED: Never scrolls with screenplay)  -->
      <!-- ========================================================= -->
      <header id="editor-fixed-header" class="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all">
        
        <!-- ROW 1: TOP APP HEADER (Order: Back, Logo, Title, Auto-Save, Save Icon, Collab, Avatar) -->
        <div class="h-12 px-3 flex items-center justify-between max-w-5xl mx-auto">
          <div class="flex items-center gap-2 min-w-0">
            <!-- Back to Workspace button -->
            <button aria-label="Back to Workspace" id="editor-back-btn" class="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 active:scale-95 transition-all">
              <span class="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            
            <!-- Logo & Script Title -->
            <div class="flex items-center gap-2 select-none min-w-0">
              <img src="${he}" onerror="this.onerror=null; this.src='./assets/logo-BG9jZ7UG.png';" alt="Scriptora" class="w-7 h-7 object-contain shrink-0" />
              <div class="flex flex-col min-w-0 leading-tight">
                <span class="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate" id="editor-script-title">${s.title}</span>
                <span class="text-[10px] text-slate-500 truncate font-mono" id="editor-save-status">Saved</span>
              </div>
            </div>
          </div>

          <!-- Right Controls: Unified Save + Auto-Save Pill, Collaborate, Avatar -->
          <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            <!-- Combined Save & Auto-Save Control (Light pill like Export button: blue symbol and normal text) -->
            <div class="inline-flex items-center rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:border-slate-300 shadow-2xs transition-all overflow-hidden h-7">
              <button id="editor-save-btn" class="flex items-center justify-center pl-2 pr-1.5 h-full text-blue-600 hover:text-blue-700 hover:bg-slate-50 active:scale-95 transition-all" title="Save screenplay now (Ctrl+S)" aria-label="Save Screenplay">
                <span class="material-symbols-outlined text-[16px] text-blue-600" id="editor-save-icon">save</span>
              </button>
              <span class="w-[1px] h-3.5 bg-slate-200 shrink-0"></span>
              <button id="btn-toggle-autosave" class="flex items-center gap-1.5 pl-1.5 pr-2.5 h-full hover:bg-slate-50 active:scale-95 transition-all text-xs font-medium text-slate-700 hover:text-slate-900" title="Toggle Auto-save (Current: ${M?"ON":"OFF"})">
                <span class="w-1.5 h-1.5 rounded-full ${M?"bg-emerald-500 animate-pulse":"bg-slate-400"}" id="autosave-dot"></span>
                <span id="autosave-toggle-label">${M?"Auto":"Off"}</span>
              </button>
            </div>

            <!-- Collaborate Link -->
            <a href="/profile/collaborators" id="editor-collab-btn" aria-label="Collaborators" class="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors no-underline" title="Collaborators">
              <span class="material-symbols-outlined text-[19px]">group</span>
            </a>

            <!-- User Avatar -->
            <a href="/profile" aria-label="User profile" class="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center shadow-xs no-underline">
              ${n}
            </a>
          </div>
        </div>

        <!-- ROW 2: HORIZONTAL EDITOR TOOLBAR ([ ⋮ ] MUST appear BEFORE Production) -->
        <div id="editor-toolbar-strip" class="w-full bg-slate-50/90 border-t border-slate-200/80 px-3 py-1 flex items-center gap-2 overflow-x-auto scrollbar-none text-nowrap max-w-5xl mx-auto transition-all toolbar-scroll">
          
          <!-- [ ⋮ ] Three-Dot Menu (FIRST item as required by Section F & G) -->
          <button id="editor-more-menu-btn" class="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 active:scale-95 transition-all shrink-0 shadow-2xs" title="More Tools (Title Page, Scene Navigator, Character Navigator, Preferences)">
            <span class="material-symbols-outlined text-[18px]">more_vert</span>
          </button>

          <!-- Production -->
          <button id="btn-open-production" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all shrink-0">
            <span class="material-symbols-outlined text-[15px] text-blue-600">movie</span>
            <span>Production</span>
          </button>

          <!-- Export -->
          <button id="exportModalBtn" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all shrink-0">
            <span class="material-symbols-outlined text-[15px] text-blue-600">ios_share</span>
            <span>Export</span>
          </button>

          <!-- Title Page button (brought to Row 2 beside Production/Export as in screenshot) -->
          <button id="btn-quick-title-page" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all shrink-0" title="Screenplay Title Page Document">
            <span class="material-symbols-outlined text-[15px] text-blue-600">article</span>
            <span>Title Page</span>
          </button>

          <!-- Scene #s Toggle -->
          <button id="sceneNumberToggle" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-caption text-xs font-semibold border border-blue-200/80 active:scale-95 transition-all shrink-0">
            <span class="material-symbols-outlined text-[15px]">pin</span>
            <span id="sceneNumberToggleText">Scene #s: On</span>
          </button>

          <!-- Find / Replace -->
          <button id="btn-quick-find" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all shrink-0">
            <span class="material-symbols-outlined text-[15px] text-slate-600">find_replace</span>
            <span>Find</span>
          </button>

          <!-- Focus Mode -->
          <button id="focusModeToggle" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all shrink-0">
            <span class="material-symbols-outlined text-[15px]">center_focus_strong</span>
            <span id="focusModeText">Focus</span>
          </button>

          <!-- Language -->
          <button id="langToggleBtn" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all shrink-0">
            <span class="material-symbols-outlined text-[15px] text-blue-600">translate</span>
            <span id="langToggleText">EN / தமிழ்</span>
          </button>
        </div>

        <!-- ROW 3: ACCESSORY & ELEMENT BAR -->
        <div id="editor-accessory-tray" class="w-full bg-white border-b border-slate-200 px-3 py-1 flex flex-col gap-1 shadow-xs max-w-5xl mx-auto transition-all">
          
          <!-- Compact Scene Jump, Draft Version, Undo/Redo -->
          <div class="flex items-center justify-between gap-2 py-0.5">
            <div class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none min-w-0">
              <!-- Compact Scene Selector: small length for proper alignment -->
              <div class="relative w-28 sm:w-32 shrink-0">
                <select id="navSceneSelect" class="w-full h-7 pl-2.5 pr-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold truncate appearance-none cursor-pointer focus:outline-none shadow-xs transition-colors">
                  <option value="">Scene 1 ▾</option>
                </select>
                <span class="material-symbols-outlined text-[14px] text-white absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
              </div>

              <!-- Draft Version button -->
              <button id="versionsModalBtn" class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-caption text-xs border border-slate-200 active:scale-95 transition-all shrink-0 whitespace-nowrap">
                <span class="material-symbols-outlined text-[14px] text-blue-600">history</span>
                <span id="currentVersionTag">${s.draft||"Draft 1.0"}</span>
              </button>
            </div>

            <!-- Undo / Redo controls in sub-row -->
            <div class="flex items-center gap-1 shrink-0">
              <button id="btn-undo" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all" title="Undo (Ctrl+Z)">
                <span class="material-symbols-outlined text-[16px]">undo</span>
              </button>
              <button id="btn-redo" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all" title="Redo (Ctrl+Y)">
                <span class="material-symbols-outlined text-[16px]">redo</span>
              </button>
            </div>
          </div>

          <!-- Professional Horizontal Element & Tool Bar (Icon above name, compact width, controlled scroll, NO text overlap!) -->
          <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 px-0.5 toolbar-scroll touch-pan-x" id="element-bar">
            <!-- 1. Scene -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="scene" title="Convert to Scene Heading">
              <span class="material-symbols-outlined text-[18px] shrink-0">movie</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Scene</span>
            </button>
            <!-- 2. Action / Act -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-white bg-blue-600 shadow-2xs font-semibold shrink-0" data-type="action" title="Convert to Action (Act)">
              <span class="material-symbols-outlined text-[18px] shrink-0">edit_note</span>
              <span class="text-[9px] leading-none mt-1 truncate">Act</span>
            </button>
            <!-- 3. Character -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="character" title="Convert to Character cue">
              <span class="material-symbols-outlined text-[18px] shrink-0">person</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Char</span>
            </button>
            <!-- 4. Dialogue -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="dialogue" title="Convert to Dialogue (Dia)">
              <span class="material-symbols-outlined text-[18px] shrink-0">chat_bubble</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Dia</span>
            </button>
            <!-- 5. Parenthetical -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="parenthetical" title="Insert Parenthetical ()">
              <span class="material-symbols-outlined text-[18px] shrink-0">format_quote</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Para</span>
            </button>
            <!-- 6. Transition -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="transition" title="Convert to Transition">
              <span class="material-symbols-outlined text-[18px] shrink-0">double_arrow</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Trans</span>
            </button>
            <!-- 7. Shot -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="shot" title="Insert Shot (CLOSE ON:, WIDE SHOT:)">
              <span class="material-symbols-outlined text-[18px] shrink-0">videocam</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Shot</span>
            </button>
            <!-- 8. Text -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="text" title="General Text">
              <span class="material-symbols-outlined text-[18px] shrink-0">title</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Text</span>
            </button>
            <!-- 9. Note -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="note" title="Production / Script Note">
              <span class="material-symbols-outlined text-[18px] shrink-0">sticky_note_2</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Note</span>
            </button>
            <!-- 10. Outline -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="outline" title="Outline Beat">
              <span class="material-symbols-outlined text-[18px] shrink-0">format_list_bulleted</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Outline</span>
            </button>
            <!-- 11. Act -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="act" title="Act Heading (ACT I, ACT II)">
              <span class="material-symbols-outlined text-[18px] shrink-0">bookmark</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Act</span>
            </button>
            <!-- 12. End Act -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="endact" title="End of Act Marker">
              <span class="material-symbols-outlined text-[18px] shrink-0">bookmark_remove</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">End Act</span>
            </button>
            <!-- 13. Sequence -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="sequence" title="Screenplay Sequence">
              <span class="material-symbols-outlined text-[18px] shrink-0">view_timeline</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Seq</span>
            </button>
            <!-- 14. Dual Dialogue -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="dual" title="Dual Dialogue (Simultaneous)">
              <span class="material-symbols-outlined text-[18px] shrink-0">forum</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Dual</span>
            </button>
            <!-- 15. Lyrics -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="lyrics" title="Song / Musical Lyrics">
              <span class="material-symbols-outlined text-[18px] shrink-0">music_note</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Lyrics</span>
            </button>
            <!-- 16. Image -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="image" title="Insert Storyboard Image">
              <span class="material-symbols-outlined text-[18px] shrink-0">image</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Image</span>
            </button>
            <!-- 17. Bold -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="bold" title="Bold Selected Text">
              <span class="material-symbols-outlined text-[18px] shrink-0 font-bold">format_bold</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Bold</span>
            </button>
            <!-- 18. Italic -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="italic" title="Italic Selected Text">
              <span class="material-symbols-outlined text-[18px] shrink-0 italic">format_italic</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Italic</span>
            </button>
            <!-- 19. Underline -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="underline" title="Underline Selected Text">
              <span class="material-symbols-outlined text-[18px] shrink-0 underline">format_underlined</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Under</span>
            </button>
            <!-- 20. Strikethrough -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="strike" title="Strikethrough Selected Text">
              <span class="material-symbols-outlined text-[18px] shrink-0 line-through">format_strikethrough</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Strike</span>
            </button>
            <!-- 21. Undo -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="undo" title="Undo">
              <span class="material-symbols-outlined text-[18px] shrink-0">undo</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Undo</span>
            </button>
            <!-- 22. Redo -->
            <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="redo" title="Redo">
              <span class="material-symbols-outlined text-[18px] shrink-0">redo</span>
              <span class="text-[9px] font-medium leading-none mt-1 truncate">Redo</span>
            </button>
          </div>
        </div>

        <!-- DOCUMENT TABS (Screenplay & Title Page parallel views as in reference) -->
        <div id="editor-document-tabs" class="w-full bg-slate-100/90 border-t border-slate-200 px-3 flex items-center gap-1.5 max-w-5xl mx-auto overflow-x-auto scrollbar-none text-xs">
          <button id="doc-tab-screenplay" class="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-blue-600 text-blue-700 bg-white rounded-t-lg transition-all shadow-2xs">
            <span class="material-symbols-outlined text-[14px]">description</span>
            <span class="truncate max-w-[150px]" id="doc-tab-title-label">${s.title||"Screenplay"}</span>
          </button>
          <button id="doc-tab-titlepage" class="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 rounded-t-lg transition-all">
            <span class="material-symbols-outlined text-[14px]">article</span>
            <span>Title Page</span>
          </button>
        </div>

      </header>

      <!-- ========================================================= -->
      <!-- FIND & REPLACE COMPACT FLOATING POPUP OVERLAY             -->
      <!-- ========================================================= -->
      <div id="findReplaceModal" class="fixed inset-0 z-50 bg-black/25 backdrop-blur-2xs hidden items-start justify-center pt-24 px-3">
        <div id="findReplaceCard" class="bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 w-full max-w-sm flex flex-col gap-3 animate-in fade-in zoom-in-95">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
              <span class="material-symbols-outlined text-[17px] text-blue-600">find_replace</span>
              <span>Find & Replace</span>
            </div>
            <div class="flex items-center gap-2">
              <span id="findMatchesCount" class="text-[11px] font-mono text-slate-500">0 of 0</span>
              <button id="closeFindBtn" class="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors" title="Close">
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          </div>

          <!-- Find input -->
          <div class="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus-within:border-blue-500 focus-within:bg-white transition-colors">
            <span class="material-symbols-outlined text-[16px] text-slate-400 mr-1.5">search</span>
            <input type="text" id="findInput" placeholder="Find text..." class="bg-transparent outline-none w-full text-xs text-slate-900" />
            <div class="flex items-center gap-0.5 ml-1">
              <button id="findPrevBtn" class="w-6 h-6 rounded hover:bg-slate-200 flex items-center justify-center text-slate-600" title="Previous match">
                <span class="material-symbols-outlined text-[16px]">keyboard_arrow_up</span>
              </button>
              <button id="findNextBtn" class="w-6 h-6 rounded hover:bg-slate-200 flex items-center justify-center text-slate-600" title="Next match">
                <span class="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
              </button>
            </div>
          </div>

          <!-- Replace input -->
          <div class="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus-within:border-blue-500 focus-within:bg-white transition-colors">
            <span class="material-symbols-outlined text-[16px] text-slate-400 mr-1.5">edit</span>
            <input type="text" id="replaceInput" placeholder="Replace with..." class="bg-transparent outline-none w-full text-xs text-slate-900" />
          </div>

          <!-- Action buttons -->
          <div class="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
            <button id="replaceBtn" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold active:scale-95 transition-all">Replace</button>
            <button id="replaceAllBtn" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs active:scale-95 transition-all">Replace All</button>
          </div>
        </div>
      </div>

      <!-- ========================================================= -->
      <!-- CONTINUOUS A4-STYLE MULTI-PAGE SCREENPLAY WORKSPACE      -->
      <!-- Single vertical scroll container, Header stays fixed      -->
      <!-- ========================================================= -->
      <main id="editor-main-scroll" class="flex-1 w-full pt-[190px] pb-16 overflow-y-auto min-h-screen flex flex-col items-center">
        
        <!-- Document 1: Continuous A4 Sheets Container -->
        <div id="screenplay-pages-container" class="w-full max-w-3xl flex flex-col items-center gap-8 py-6 px-3 sm:px-6">
          <div class="w-full flex items-center justify-center py-20 text-slate-400">
            <span class="material-symbols-outlined animate-spin text-[28px] mr-2">progress_activity</span>
            <span>Loading screenplay studio...</span>
          </div>
        </div>

        <!-- Document 2: Screenplay Title Page (Parallel document view as in reference) -->
        <div id="title-page-container" class="w-full max-w-3xl hidden flex flex-col items-center py-6 px-3 sm:px-6">
          <div class="screenplay-page-sheet bg-white shadow-md border border-slate-200/60 w-full max-w-[850px] min-h-[1050px] p-12 sm:p-20 flex flex-col justify-between font-courier text-slate-900 rounded-sm">
            <!-- Top Third Spacer -->
            <div class="h-24 sm:h-32"></div>

            <!-- Middle Third: Title and Written By / Author -->
            <div class="flex flex-col items-center text-center my-auto">
              <div id="tp-doc-title" contenteditable="true" spellcheck="false" class="w-full text-center uppercase tracking-widest text-2xl sm:text-3xl font-bold py-2 outline-none focus:bg-blue-50/40 rounded transition-colors cursor-text" data-placeholder="Your Title"></div>
              <div class="text-xs sm:text-sm font-medium text-slate-500 my-4 tracking-wider select-none">Written by</div>
              <div id="tp-doc-author" contenteditable="true" spellcheck="false" class="w-full text-center text-base sm:text-lg font-medium py-1 outline-none focus:bg-blue-50/40 rounded transition-colors cursor-text" data-placeholder="Your Name"></div>
            </div>

            <!-- Bottom Third: Contact & Email -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-xs pt-16">
              <div class="flex flex-col">
                <span class="text-[10px] text-slate-400 font-sans uppercase font-bold tracking-wider mb-1 select-none">Contact</span>
                <div id="tp-doc-contact" contenteditable="true" spellcheck="false" class="min-w-[160px] py-1 outline-none focus:bg-blue-50/40 rounded transition-colors cursor-text" data-placeholder="Phone Number"></div>
              </div>
              <div class="flex flex-col sm:items-end">
                <span class="text-[10px] text-slate-400 font-sans uppercase font-bold tracking-wider mb-1 select-none">Email</span>
                <div id="tp-doc-email" contenteditable="true" spellcheck="false" class="min-w-[160px] py-1 outline-none focus:bg-blue-50/40 rounded transition-colors sm:text-right cursor-text" data-placeholder="Email Address"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Telemetry Footer Bar -->
        <div class="w-full max-w-3xl px-4 py-2 mt-4 flex items-center justify-between gap-2 text-slate-500 font-caption text-xs select-none border-t border-slate-200 bg-white/70 backdrop-blur-xs rounded-xl shadow-2xs">
          <div class="flex items-center gap-2">
            <span class="flex items-center gap-1 font-mono">
              <span class="material-symbols-outlined text-[14px]">format_shapes</span>
              <span id="telemetry-font">Courier Prime 12pt</span>
            </span>
            <span>•</span>
            <span class="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium" id="tamilLangBadge">Tamil IME: Ready</span>
          </div>
          <div class="flex items-center gap-2 font-mono">
            <span id="telemetry-page-count">Page 1 of 5</span>
            <span>•</span>
            <span id="telemetry-word-count">14,280 words</span>
          </div>
        </div>

      </main>

      <!-- ========================================================= -->
      <!-- AUTOCOMPLETE POPUP (Anchor to active line)                -->
      <!-- ========================================================= -->
      <div id="editor-autocomplete-dropdown" class="fixed z-50 bg-white border border-slate-200/90 rounded-xl shadow-xl py-1 min-w-[220px] max-w-[calc(100vw-32px)] max-h-56 overflow-y-auto hidden text-xs font-mono select-none transition-all">
        <!-- Autocomplete items rendered here -->
      </div>

      <!-- ========================================================= -->
      <!-- THREE-DOT MENU MODAL / DRAWER (Section 21)                -->
      <!-- ========================================================= -->
      <div id="editorMoreMenuModal" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs hidden items-start justify-end sm:justify-center p-3 sm:pt-20">
        <div class="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
          <div class="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/70">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-blue-600">construction</span>
              <h3 class="font-bold text-sm text-slate-900 font-heading">Screenplay Tools</h3>
            </div>
            <button id="closeMoreMenuBtn" class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200/60">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div class="p-3 divide-y divide-slate-100 text-xs overflow-y-auto max-h-[75vh]">
            
            <!-- DOCUMENT -->
            <div class="py-2 flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Document</span>
              <button id="menu-btn-title-page" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">description</span>
                <span class="flex-1 font-medium">Title Page Editor</span>
                <span class="text-[10px] text-slate-400">Cover & Credits</span>
              </button>
              <button id="menu-btn-find-replace" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">find_replace</span>
                <span class="flex-1 font-medium">Find / Replace</span>
                <span class="text-[10px] text-slate-400">Ctrl+F</span>
              </button>
            </div>

            <!-- VIEW & NAVIGATORS (Section 6: Act & Character navigation accessible here) -->
            <div class="py-2 flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">View & Navigators</span>
              <button id="menu-btn-focus-mode" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">center_focus_strong</span>
                <span class="flex-1 font-medium">Toggle Focus Mode</span>
                <span id="menuFocusState" class="text-[10px] text-blue-600 font-semibold">Off</span>
              </button>
              <button id="menu-btn-scene-navigator" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-blue-600">movie</span>
                <span class="flex-1 font-medium">Scene & Act Navigator</span>
                <span class="text-[10px] text-slate-400">All Scenes</span>
              </button>
              <button id="menu-btn-char-navigator" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-purple-600">person</span>
                <span class="flex-1 font-medium">Character Navigator</span>
                <span class="text-[10px] text-slate-400">Jump to Dialogue</span>
              </button>
              <button id="menu-btn-go-page" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">auto_stories</span>
                <span class="flex-1 font-medium">Go to Page...</span>
              </button>
            </div>

            <!-- FORMAT / PAGE -->
            <div class="py-2 flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Format / Page</span>
              <button id="menu-btn-scene-numbers" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">pin</span>
                <span class="flex-1 font-medium">Scene Numbering (Left side)</span>
                <span id="menuSceneNumState" class="text-[10px] text-blue-600 font-semibold">Enabled</span>
              </button>
              <button id="menu-btn-preferences" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">tune</span>
                <span class="flex-1 font-medium">Editor Preferences</span>
                <span class="text-[10px] text-slate-400">Margins, Spacing</span>
              </button>
            </div>

            <!-- PROJECT -->
            <div class="py-2 flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Project</span>
              <button id="menu-btn-production" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-blue-600">movie</span>
                <span class="flex-1 font-medium">Production Telemetry</span>
              </button>
              <button id="menu-btn-export" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-blue-600">ios_share</span>
                <span class="flex-1 font-medium">Export Screenplay (PDF / FDX)</span>
              </button>
            </div>

            <!-- VERSION -->
            <div class="py-2 flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Versions</span>
              <button id="menu-btn-versions" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-blue-600">history</span>
                <span class="flex-1 font-medium">Version History</span>
              </button>
              <button id="menu-btn-compare" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-blue-600">compare_arrows</span>
                <span class="flex-1 font-medium">Compare Versions</span>
              </button>
            </div>

            <!-- LANGUAGE -->
            <div class="py-2 flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Language</span>
              <div class="grid grid-cols-3 gap-1 pt-1">
                <button class="lang-choice-btn py-1 rounded bg-blue-600 text-white font-semibold text-center" data-lang="EN">English</button>
                <button class="lang-choice-btn py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 text-center" data-lang="TA">தமிழ்</button>
                <button class="lang-choice-btn py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 text-center" data-lang="TL">Tanglish</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ========================================================= -->
      <!-- INSERT STORYBOARD IMAGE MODAL                             -->
      <!-- ========================================================= -->
      <div id="imageModal" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs hidden items-center justify-center p-3 sm:p-4">
        <div class="bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 w-full max-w-sm flex flex-col gap-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
              <span class="material-symbols-outlined text-[18px] text-blue-600">image</span>
              <span>Insert Storyboard Image</span>
            </div>
            <button id="closeImageModal" class="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors">
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-[11px] font-semibold text-slate-600">Image URL</label>
            <input type="url" id="imgUrlInput" placeholder="https://example.com/storyboard.jpg" class="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 outline-none focus:border-blue-500 bg-slate-50" />
            
            <div class="flex items-center gap-2 my-1">
              <div class="h-[1px] bg-slate-200 flex-1"></div>
              <span class="text-[10px] text-slate-400 font-medium">OR UPLOAD</span>
              <div class="h-[1px] bg-slate-200 flex-1"></div>
            </div>

            <label class="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer text-xs text-slate-600 transition-all">
              <span class="material-symbols-outlined text-[18px] text-blue-600">cloud_upload</span>
              <span id="imgUploadLabel">Choose local image...</span>
              <input type="file" id="imgFileInput" accept="image/*" class="hidden" />
            </label>

            <label class="text-[11px] font-semibold text-slate-600 mt-1">Caption (optional)</label>
            <input type="text" id="imgCaptionInput" placeholder="Scene visual concept..." class="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 outline-none focus:border-blue-500 bg-slate-50" />
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button id="cancelImageBtn" class="px-3.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-medium">Cancel</button>
            <button id="insertImageBtn" class="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs">Insert</button>
          </div>
        </div>
      </div>

      <!-- ========================================================= -->
      <!-- EDITOR PREFERENCES MODAL                                  -->
      <!-- ========================================================= -->
      <div id="preferencesModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden items-center justify-center p-3 sm:p-4">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200">
          <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/70">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">tune</span>
              </div>
              <h3 class="font-heading font-bold text-base text-slate-900">Editor Preferences</h3>
            </div>
            <button id="closePrefModal" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="p-5 flex flex-col gap-4 overflow-y-auto text-xs">
            <label class="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div class="flex flex-col">
                <span class="font-semibold text-slate-800">Smart Formatting Automation</span>
                <span class="text-[11px] text-slate-500">Auto Enter/Tab flow between Scene, Action, Character & Dialogue</span>
              </div>
              <input type="checkbox" id="prefSmartFormat" checked class="w-4 h-4 accent-blue-600 rounded">
            </label>

            <label class="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div class="flex flex-col">
                <span class="font-semibold text-slate-800">Show Scene Numbers</span>
                <span class="text-[11px] text-slate-500">Display automatic scene numbers on the LEFT side</span>
              </div>
              <input type="checkbox" id="prefSceneNumbers" checked class="w-4 h-4 accent-blue-600 rounded">
            </label>

            <div class="flex flex-col gap-1.5">
              <label class="font-semibold text-slate-700">Line Spacing</label>
              <select id="prefLineSpacing" class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 outline-none">
                <option value="1.0">Single (1.0)</option>
                <option value="1.5" selected>Standard (1.5)</option>
                <option value="2.0">Double (2.0)</option>
              </select>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="font-semibold text-slate-700">Editor Typography Font Size</label>
              <select id="prefFontSize" class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 outline-none">
                <option value="12pt" selected>Courier Prime 12pt (Industry Standard)</option>
                <option value="14pt">Courier Prime 14pt (Large Readability)</option>
              </select>
            </div>
          </div>

          <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
            <button id="savePrefBtn" class="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-xs hover:bg-blue-700">Apply Settings</button>
          </div>
        </div>
      </div>

      <!-- ========================================================= -->
      <!-- EXPORT MODAL                                              -->
      <!-- ========================================================= -->
      <div id="exportModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden items-end sm:items-center justify-center p-0 sm:p-4">
        <div class="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden">
          <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">ios_share</span>
              </div>
              <div>
                <h3 class="font-heading font-bold text-base text-slate-900 leading-tight">Export Screenplay</h3>
                <p class="text-[11px] text-slate-500 mt-0.5">${s.title} · ${s.draft||"Draft 4.2"}</p>
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

      <!-- ========================================================= -->
      <!-- VERSIONS MODAL                                            -->
      <!-- ========================================================= -->
      <div id="versionsModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden items-end sm:items-center justify-center p-0 sm:p-4">
        <div class="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden">
          <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">history</span>
              </div>
              <div>
                <h3 class="font-heading font-bold text-base text-slate-900 leading-tight">Versions & History</h3>
                <p class="text-[11px] text-slate-500 mt-0.5">${s.title}</p>
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

      <!-- ========================================================= -->
      <!-- NEW VERSION SNAPSHOT MODAL                                -->
      <!-- ========================================================= -->
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

      <!-- ========================================================= -->
      <!-- COMPARE / DIFF MODAL                                      -->
      <!-- ========================================================= -->
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
  `}function V({id:e,name:t,close:s,restore:n}){try{window.history.pushState({editorSubViewId:e,editorSubViewName:t},"")}catch{}P.push({id:e,name:t,close:s,restore:n})}function E(e){const t=P.findIndex(s=>s.id===e);if(t!==-1){if(t===P.length-1){const s=P.pop();s&&typeof s.close=="function"&&s.close();const n=P[P.length-1];n&&typeof n.restore=="function"&&n.restore()}else{const s=P.splice(t,1)[0];s&&typeof s.close=="function"&&s.close()}try{window.history.back()}catch{}}}function Ut(){if(P.length>0){const e=P.pop();e&&typeof e.close=="function"&&e.close();const t=P[P.length-1];return t&&typeof t.restore=="function"&&t.restore(),!0}return!1}async function qt(e,t){P.length=0,window.__scriptoraEditorPopstate=a=>P.length>0?Ut():!1;const s=document.getElementById("editor-back-btn");s&&(s.onclick=()=>{if(P.length>0){window.history.back();return}F&&Ie(!1),window.__scriptoraEditorPopstate=null,t("/workspace")}),x=await gt(e),Q(),Me();const n=document.getElementById("editor-save-btn");n&&(n.onclick=()=>Ie(!0)),Ht(),window.addEventListener("keydown",Vt),ns(e,t),Zt(),ts(),Jt(),Gt(),as(),ls(e),Xt()}function Vt(e){(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"&&(e.preventDefault(),Ie(!0)),(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="f"&&(e.preventDefault(),ke(!0))}function Ht(){const e=document.getElementById("btn-toggle-autosave"),t=document.getElementById("autosave-dot"),s=document.getElementById("autosave-toggle-label");e&&(e.onclick=n=>{n.stopPropagation(),M=!M,localStorage.setItem("scriptora_autosave",String(M)),M?(t&&(t.className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"),s&&(s.textContent="Auto"),e.title="Toggle Auto-save (Current: ON)",v("Auto-save enabled"),F&&Z()):(t&&(t.className="w-1.5 h-1.5 rounded-full bg-slate-400"),s&&(s.textContent="Off"),e.title="Toggle Auto-save (Current: OFF)",clearTimeout(Pe),v("Auto-save disabled · Tap floppy to save"))})}function Jt(){const e=document.getElementById("doc-tab-screenplay"),t=document.getElementById("doc-tab-titlepage"),s=document.getElementById("btn-quick-title-page"),n=document.getElementById("menu-btn-title-page");e&&(e.onclick=()=>fe("screenplay")),t&&(t.onclick=()=>fe("titlepage")),s&&(s.onclick=()=>fe("titlepage")),n&&(n.onclick=()=>{E("moreMenu"),fe("titlepage")})}function fe(e){if(Je===e)return;Je=e;const t=document.getElementById("screenplay-pages-container"),s=document.getElementById("title-page-container"),n=document.getElementById("doc-tab-screenplay"),a=document.getElementById("doc-tab-titlepage");if(e==="titlepage")t&&t.classList.add("hidden"),s&&(s.classList.remove("hidden"),s.classList.add("flex")),a&&(a.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-blue-600 text-blue-700 bg-white rounded-t-lg transition-all shadow-2xs"),n&&(n.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 rounded-t-lg transition-all"),Wt(),V({id:"titlePageTab",name:"Title Page",close:()=>fe("screenplay")});else{s&&(s.classList.add("hidden"),s.classList.remove("flex")),t&&t.classList.remove("hidden"),n&&(n.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-blue-600 text-blue-700 bg-white rounded-t-lg transition-all shadow-2xs"),a&&(a.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 rounded-t-lg transition-all");const l=P.findIndex(i=>i.id==="titlePageTab");l!==-1&&P.splice(l,1)}}function Wt(){if(!x)return;const e=x.titlePage||{},t=document.getElementById("tp-doc-title"),s=document.getElementById("tp-doc-author"),n=document.getElementById("tp-doc-contact"),a=document.getElementById("tp-doc-email");t&&(t.innerText=e.title||""),s&&(s.innerText=e.author||""),n&&(n.innerText=e.contact||""),a&&(a.innerText=e.email||"")}function Gt(){const e=document.getElementById("tp-doc-title"),t=document.getElementById("tp-doc-author"),s=document.getElementById("tp-doc-contact"),n=document.getElementById("tp-doc-email"),a=()=>{if(!x)return;x.titlePage||(x.titlePage={});const l=e?e.innerText.trim():"",i=t?t.innerText.trim():"",o=s?s.innerText.trim():"",c=n?n.innerText.trim():"";if(x.titlePage.title=l,x.titlePage.author=i,x.titlePage.contact=o,x.titlePage.email=c,l){x.title=l;const d=document.getElementById("editor-script-title"),r=document.getElementById("doc-tab-title-label");d&&(d.textContent=l),r&&(r.textContent=l)}F=!0,ce("Unsaved"),M&&Z()};[e,t,s,n].forEach(l=>{l&&(l.oninput=a)})}function Q(){const e=document.getElementById("screenplay-pages-container");if(!e||!x)return;const t=x.scenes||[],s=[];t.forEach(i=>{(i.blocks||[]).forEach(o=>{s.push({block:o,sceneNumber:i.number,sceneId:i.id,slugline:i.slugline})})});const n=[];let a={pageNumber:1,items:[]},l=0;s.forEach(i=>{const o=et(i.block);l+o>Ze&&a.items.length>0&&(n.push(a),a={pageNumber:n.length+1,items:[]},l=0),a.items.push(i),l+=o}),a.items.length>0&&n.push(a),n.length===0&&n.push({pageNumber:1,items:[{block:{id:"b-1-1",type:"scene",content:"INT. NEW SCENE - DAY"},sceneNumber:1,sceneId:"scene-1",slugline:"INT. NEW SCENE - DAY"},{block:{id:"b-1-2",type:"action",content:"Type your screenplay action here..."},sceneNumber:1,sceneId:"scene-1",slugline:"INT. NEW SCENE - DAY"}]}),e.innerHTML=n.map(i=>`
    <div class="screenplay-page-sheet w-full max-w-2xl bg-white rounded-xl shadow-md border border-slate-200/80 p-6 sm:p-12 flex flex-col font-courier text-[14px] sm:text-[15px] leading-[22px] sm:leading-[24px] text-slate-900 relative transition-all min-h-[820px]" data-page-num="${i.pageNumber}">
      
      <!-- Top Page Header: Page number in top right -->
      <div class="w-full flex items-center justify-between pb-4 select-none text-[12px] text-slate-400 font-mono border-b border-transparent">
        <span class="text-[10px] text-slate-300 uppercase tracking-widest font-sans font-semibold">${x.title||"Untitled Screenplay"} · ${x.draft||"Draft 1.0"}</span>
        <span class="font-bold text-slate-500">${i.pageNumber}.</span>
      </div>

      <!-- Screenplay Blocks naturally flowing across this A4 page -->
      <div class="page-blocks-wrapper flex flex-col flex-1">
        ${i.items.map(o=>tt(o.block,o.sceneNumber,o.sceneId)).join("")}
      </div>

      <!-- Bottom Page Boundary indicator -->
      <div class="w-full pt-6 select-none flex items-center justify-center text-[10px] text-slate-300 font-sans tracking-widest uppercase">
        <span>— PAGE ${i.pageNumber} —</span>
      </div>

    </div>
  `).join(""),zt(),Ee()}function et(e){const t=e.content||"";return e.type==="scene"?3:e.type==="action"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="character"?2:e.type==="parenthetical"?1:e.type==="dialogue"?Math.max(1,Math.ceil(t.length/38))+1:e.type==="transition"||e.type==="shot"?2:e.type==="text"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="note"||e.type==="outline"?2:e.type==="act"||e.type==="endact"?3:e.type==="sequence"?2:e.type==="dual"?4:e.type==="lyrics"?2:e.type==="image"?10:2}function tt(e,t,s){const n=e.type==="scene",a=e.type==="character",l=e.type==="parenthetical",i=e.type==="dialogue",o=e.type==="transition",c=e.type==="shot",d=e.type==="text",r=e.type==="note",p=e.type==="outline",u=e.type==="act",f=e.type==="endact",h=e.type==="sequence",m=e.type==="dual",g=e.type==="lyrics",y=e.type==="image",w=e.type==="action"||!n&&!a&&!l&&!i&&!o&&!c&&!d&&!r&&!p&&!u&&!f&&!h&&!m&&!g&&!y;return n?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="scene" class="screenplay-block flex items-baseline py-2.5 font-bold text-slate-900 mt-2 mb-2 group">
        <!-- Scene Number shown on LEFT side ONLY (Section I) -->
        <span class="scene-num-indicator mr-3 sm:mr-4 shrink-0 font-mono text-slate-400 font-bold select-none text-[13px] w-6 text-right ${Y?"":"hidden"}">${t}</span>
        <div class="flex-1 tracking-wider uppercase outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${j(e.content)}</div>
      </div>
    `:w?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${j(e.content)}</div>
    `:a?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="character" class="screenplay-block w-7/12 mx-auto uppercase font-bold tracking-wider text-slate-900 text-center mt-3 mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${j(e.content)}</div>
    `:l?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="parenthetical" class="screenplay-block w-6/12 mx-auto italic text-slate-600 text-center mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${j(e.content)}</div>
    `:i?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dialogue" class="screenplay-block w-9/12 sm:w-8/12 mx-auto text-left text-slate-900 mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${j(e.content)}</div>
    `:o?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="transition" class="screenplay-block w-full text-right uppercase font-bold tracking-wider text-slate-900 mt-2 mb-4 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${j(e.content)}</div>
    `:c?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="shot" class="screenplay-block uppercase font-bold tracking-wider text-slate-900 text-left my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${j(e.content||"CLOSE ON:")}</div>
    `:d?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="text" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${j(e.content)}</div>
    `:r?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="note" class="screenplay-block text-amber-900 bg-amber-50/80 border-l-4 border-amber-400 p-2 my-2.5 rounded-r font-mono text-xs outline-none focus:ring-1 focus:ring-amber-400 cursor-text select-text" contenteditable="true" spellcheck="false">${j(e.content||"[[ NOTE: Script comment... ]]")}</div>
    `:p?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="outline" class="screenplay-block text-slate-500 uppercase tracking-widest font-sans font-bold text-xs my-2 border-b border-slate-200 pb-1 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${j(e.content||"OUTLINE BEAT")}</div>
    `:u?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="act" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-base outline-none focus:bg-blue-50/50 rounded px-1 cursor-text underline decoration-2 underline-offset-4" contenteditable="true" spellcheck="false">${j(e.content||"ACT I")}</div>
    `:f?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="endact" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${j(e.content||"END OF ACT I")}</div>
    `:h?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="sequence" class="screenplay-block uppercase font-bold tracking-wide text-slate-800 my-3 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${j(e.content||"SEQUENCE 1")}</div>
    `:m?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dual" class="screenplay-block screenplay-dual-dialogue-grid">
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${j(e.char1||"CHARACTER A")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${j(e.dia1||"Dialogue A")}</div>
        </div>
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${j(e.char2||"CHARACTER B")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${j(e.dia2||"Dialogue B")}</div>
        </div>
      </div>
    `:g?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="lyrics" class="screenplay-block text-center italic text-slate-800 my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${j(e.content||"♫ Musical lyrics... ♫")}</div>
    `:y?`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="image" class="screenplay-block my-4 flex flex-col items-center group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-2">
        <img src="${j(e.url||"")}" alt="${j(e.caption||"Storyboard")}" class="max-h-80 w-auto rounded-lg object-contain shadow-xs" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'p-4 text-xs text-red-500 font-sans\\'>Image failed to load</div>'" />
        <div class="text-[11px] font-sans text-slate-600 italic mt-2 text-center outline-none px-2 py-0.5 rounded focus:bg-white" contenteditable="true">${j(e.caption||"")}</div>
        <button class="btn-delete-img-block absolute top-3 right-3 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md text-xs font-bold" data-block-id="${e.id}" data-scene-id="${s}" title="Delete image">✕</button>
      </div>
    `:`
    <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true">${j(e.content)}</div>
  `}function j(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}function be(e){if(!e||typeof e!="string")return e;let t=e.replace(/^(\s*["'“‘(]*)([a-z\u00E0-\u00FC])/u,(s,n,a)=>n+a.toUpperCase());return t=t.replace(/([.!?]["'”’)]*\s+["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,n,a)=>n+a.toUpperCase()),t=t.replace(/(\n\s*["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,n,a)=>n+a.toUpperCase()),t}function oe(e){let t=0;const s=window.getSelection();if(s&&s.rangeCount>0){const n=s.getRangeAt(0),a=n.cloneRange();a.selectNodeContents(e),a.setEnd(n.endContainer,n.endOffset),t=a.toString().length}return t}function re(e,t){const s=window.getSelection();if(!s)return;const n=document.createRange();if(t<=0){n.selectNodeContents(e),n.collapse(!0),s.removeAllRanges(),s.addRange(n);return}let a=0,l=!1;function i(o){if(!l){if(o.nodeType===Node.TEXT_NODE){const c=o.nodeValue.length;if(a+c>=t){n.setStart(o,Math.min(t-a,c)),n.collapse(!0),l=!0;return}a+=c}else for(let c=0;c<o.childNodes.length;c++)if(i(o.childNodes[c]),l)return}}i(e),l||(n.selectNodeContents(e),n.collapse(!1)),s.removeAllRanges(),s.addRange(n)}function st(e){const t=e.hasAttribute("contenteditable")?e:e.querySelector('[contenteditable="true"]');t&&(t.onfocus=()=>{ie=e.getAttribute("data-block-id");const s=e.getAttribute("data-block-type")||"action";lt(s)},t.oninput=()=>{F=!0;const s=e.getAttribute("data-block-type")||"action";if(s==="action"||s==="dialogue"){const n=t.innerText,a=be(n);if(a!==n){const l=oe(t);t.innerText=a,re(t,l)}}ae(e,t.innerText),ce("Unsaved"),M&&Z(),at(e,t),Ee()},t.onblur=()=>{const s=e.getAttribute("data-block-type")||"action";if(s==="action"||s==="dialogue"){const n=t.innerText,a=be(n);a!==n&&(t.innerText=a,ae(e,a))}if(s==="character")je(t.innerText);else if(s==="scene"){const n=le(t.innerText);n.location&&Le(n.location)}},t.onpaste=()=>{const s=e.getAttribute("data-block-type")||"action";(s==="action"||s==="dialogue")&&setTimeout(()=>{const n=t.innerText,a=be(n);if(a!==n){const l=oe(t);t.innerText=a,re(t,l),ae(e,a)}},0)},t.onkeydown=s=>{Kt(s,e,t)})}function zt(){document.querySelectorAll(".screenplay-block").forEach(st),document.querySelectorAll(".btn-delete-img-block").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=t.getAttribute("data-block-id"),a=t.getAttribute("data-scene-id");n&&a&&me(a,n)}})}function le(e){const t=e.match(/^(INT\.\/EXT\.|INT\.|EXT\.|I\/E\.)\s*/i),s=t?t[1].toUpperCase():"INT.",a=(t?e.slice(t[0].length):e).split(/\s+-\s*|\s+-/),l=(a[0]||"").trim().toUpperCase(),i=(a[1]||"").trim().toUpperCase();return{intExt:s,location:l,time:i}}function je(e){if(!x)return;const t=(e||"").replace(/\(.*\)/g,"").trim().toUpperCase();!t||t.length<2||(Array.isArray(x.characters)||(x.characters=[]),x.characters=x.characters.filter(s=>t.startsWith(s)&&s.length<t.length?x.scenes?.some(a=>a.blocks?.some(l=>l.type==="character"&&l.content.replace(/\(.*\)/g,"").trim().toUpperCase()===s)):!0),x.characters.includes(t)||x.characters.push(t))}function Le(e){if(!x)return;const t=(e||"").trim().toUpperCase();!t||t.length<2||(Array.isArray(x.locations)||(x.locations=[]),x.locations=x.locations.filter(s=>t.startsWith(s)&&s.length<t.length?x.scenes?.some(a=>a.blocks?.some(l=>l.type==="scene"&&le(l.content).location===s)):!0),x.locations.includes(t)||x.locations.push(t))}function ae(e,t){if(!x)return;const s=e.getAttribute("data-block-id"),n=e.getAttribute("data-scene-id"),a=x.scenes.find(i=>i.id===n);if(!a)return;const l=a.blocks.find(i=>i.id===s);if(l&&(l.content=t,l.type==="scene")){const i=le(t);l.intExt=i.intExt,l.location=i.location,l.time=i.time,a.slugline=t,a.location=i.location,a.time=i.time}}function me(e,t){if(!x)return;const s=x.scenes.find(l=>l.id===e);if(!s)return;const n=s.blocks.findIndex(l=>l.id===t);if(n!==-1&&(s.blocks.splice(n,1),F=!0,M&&Z()),s.blocks.length===0&&x.scenes.length>1){const l=x.scenes.findIndex(i=>i.id===e);l!==-1&&(x.scenes.splice(l,1),x.scenes.forEach((i,o)=>{i.number=o+1}),Me())}else s.blocks.length===0&&s.blocks.push({id:`b-${Date.now().toString().slice(-6)}`,type:"action",content:""});const a=document.getElementById(t);a&&a.remove(),Ee()}function Kt(e,t,s){const n=t.getAttribute("data-block-type"),a=t.getAttribute("data-scene-id"),l=t.getAttribute("data-block-id"),i=document.getElementById("editor-autocomplete-dropdown");if(i&&!i.classList.contains("hidden")){if(e.key==="ArrowDown"){e.preventDefault(),We(1);return}if(e.key==="ArrowUp"){e.preventDefault(),We(-1);return}if(e.key==="Enter"||e.key==="Tab"){const o=i.querySelector(".autocomplete-item.active");if(o){e.preventDefault(),o.click();return}}if(e.key==="Escape"){ge();return}}if(e.key==="Backspace"&&!e.ctrlKey&&!e.metaKey){const o=oe(s),c=window.getSelection(),d=!c||c.isCollapsed;if(o===0&&d){const r=Array.from(document.querySelectorAll(".screenplay-block")),p=r.indexOf(t);if(p>0){e.preventDefault();const u=r[p-1],f=u.hasAttribute("contenteditable")?u:u.querySelector('[contenteditable="true"]'),h=s.innerText.trim();if(h===""||n==="parenthetical"&&(h==="()"||h==="")){me(a,l),f&&(f.focus(),z(f));return}const m=u.getAttribute("data-block-type");if(f&&(n==="action"&&m==="action"||n==="dialogue"&&m==="dialogue"||n==="text"&&m==="text")){const g=f.innerText.length,y=f.innerText+(f.innerText?" ":"")+s.innerText;f.innerText=y,ae(u,y),me(a,l),f.focus(),re(f,g+(f.innerText?1:0));return}if(f){f.focus(),z(f);return}}}}if(e.key==="Delete"&&!e.ctrlKey&&!e.metaKey){const o=oe(s),c=window.getSelection(),d=!c||c.isCollapsed;if(o>=s.innerText.length&&d){const r=Array.from(document.querySelectorAll(".screenplay-block")),p=r.indexOf(t);if(p<r.length-1){const u=r[p+1],f=u.hasAttribute("contenteditable")?u:u.querySelector('[contenteditable="true"]'),h=u.getAttribute("data-scene-id"),m=u.getAttribute("data-block-id"),g=u.getAttribute("data-block-type"),y=(f?f.innerText:"").trim();if(y===""||g==="parenthetical"&&(y==="()"||y==="")){e.preventDefault(),me(h,m);return}if(f&&(n==="action"&&g==="action"||n==="dialogue"&&g==="dialogue"||n==="text"&&g==="text")){e.preventDefault();const w=s.innerText.length,N=s.innerText+(s.innerText?" ":"")+f.innerText;s.innerText=N,ae(t,N),me(h,m),re(s,w+(s.innerText?1:0));return}if(f){e.preventDefault(),f.focus(),re(f,0);return}}}}if(e.key==="ArrowLeft"){const o=oe(s),c=window.getSelection();if(o===0&&(!c||c.isCollapsed)){const d=Array.from(document.querySelectorAll(".screenplay-block")),r=d.indexOf(t);if(r>0){e.preventDefault();const p=d[r-1],u=p.querySelector('[contenteditable="true"]')||p;u&&(u.focus(),z(u))}}}if(e.key==="ArrowRight"){const o=oe(s),c=window.getSelection();if(o>=s.innerText.length&&(!c||c.isCollapsed)){const d=Array.from(document.querySelectorAll(".screenplay-block")),r=d.indexOf(t);if(r<d.length-1){e.preventDefault();const p=d[r+1],u=p.querySelector('[contenteditable="true"]')||p;u&&(u.focus(),re(u,0))}}}if(e.key==="("&&(n==="character"||n==="dialogue")){const o=window.getSelection();if(o&&o.anchorOffset===0&&s.innerText.trim()===""){e.preventDefault(),Se(t,"parenthetical");return}}if(e.key==="Tab"){if(e.preventDefault(),n==="action"){Se(t,"character");return}if(n==="character"){Se(t,"dialogue");return}}if(e.key==="Enter"&&!e.shiftKey){if(ge(),n==="scene"){e.preventDefault();const o=le(s.innerText);o.location&&Le(o.location),K(a,l,"action");return}if(n==="character"){e.preventDefault(),je(s.innerText),K(a,l,"dialogue");return}if(n==="dialogue"){e.preventDefault(),K(a,l,"action");return}if(n==="parenthetical"){e.preventDefault();let o=s.innerText.trim();o.endsWith(")")||(o+=")",s.innerText=o,ae(t,o)),K(a,l,"dialogue");return}if(n==="transition"){e.preventDefault(),Yt(a);return}if(n==="shot"||n==="note"||n==="outline"){e.preventDefault(),K(a,l,"action");return}if(n==="act"||n==="endact"||n==="sequence"){e.preventDefault(),K(a,l,"scene");return}if(n==="lyrics"){e.preventDefault(),K(a,l,"lyrics");return}if(n==="action"||n==="text"){e.preventDefault(),K(a,l,n);return}}}function K(e,t,s,n){const a=x.scenes.find(r=>r.id===e);if(!a)return;const l=a.blocks.findIndex(r=>r.id===t),i=`b-${Date.now().toString().slice(-6)}`,o={id:i,type:s,content:""};l!==-1?a.blocks.splice(l+1,0,o):a.blocks.push(o);const c=document.getElementById(t),d=c?c.closest(".page-blocks-wrapper"):null;if(c&&d){const r=document.createElement("div");r.innerHTML=tt(o,a.number,a.id);const p=r.firstElementChild;c.insertAdjacentElement("afterend",p),st(p),Ee();const u=p.hasAttribute("contenteditable")?p:p.querySelector('[contenteditable="true"]');u&&(u.focus(),z(u));const f=d.querySelectorAll(".screenplay-block");let h=0;f.forEach(m=>{const g=m.getAttribute("data-block-type"),y=m.innerText||"";h+=et({type:g,content:y})}),h>Ze&&(Q(),setTimeout(()=>{const m=document.getElementById(i);if(m){const g=m.querySelector('[contenteditable="true"]')||m;g.focus(),z(g)}},20))}else Q(),setTimeout(()=>{const r=document.getElementById(i);if(r){const p=r.hasAttribute("contenteditable")?r:r.querySelector('[contenteditable="true"]');p&&(p.focus(),z(p))}},20)}function Yt(e){const t=x.scenes.findIndex(i=>i.id===e),s=x.scenes.length+1,n=`scene-${Date.now().toString().slice(-5)}`,a=`b-${Date.now().toString().slice(-6)}`,l={id:n,number:s,actId:x.acts?.[0]?.id||"act-1",slugline:"",blocks:[{id:a,type:"scene",content:""}]};t!==-1?x.scenes.splice(t+1,0,l):x.scenes.push(l),x.scenes.forEach((i,o)=>{i.number=o+1}),Q(),Me(),setTimeout(()=>{const i=document.getElementById(a);if(i){const o=i.querySelector('[contenteditable="true"]');o&&(o.focus(),z(o),at(i,o))}},30)}function Se(e,t){const s=e.getAttribute("data-block-id"),n=e.getAttribute("data-scene-id"),a=x.scenes.find(i=>i.id===n);if(!a)return;const l=a.blocks.find(i=>i.id===s);if(l){if(l.type=t,t==="character"&&(l.content=l.content.toUpperCase()),(t==="action"||t==="dialogue")&&(l.content=be(l.content)),t==="parenthetical"){let i=l.content.replace(/^\(+|\)+$/g,"").trim();i?l.content=`(${i})`:l.content="()"}Q(),setTimeout(()=>{const i=document.getElementById(s);if(i){const o=i.hasAttribute("contenteditable")?i:i.querySelector('[contenteditable="true"]');if(o)if(o.focus(),t==="parenthetical"&&o.innerText==="()"){const c=o.firstChild;if(c){const d=document.createRange(),r=window.getSelection();d.setStart(c,1),d.collapse(!0),r.removeAllRanges(),r.addRange(d)}}else z(o)}},25)}}function z(e){const t=document.createRange(),s=window.getSelection();t.selectNodeContents(e),t.collapse(!1),s.removeAllRanges(),s.addRange(t)}function Xt(){document.addEventListener("click",e=>{e.target.closest("#editor-autocomplete-dropdown")||ge()})}function ge(){const e=document.getElementById("editor-autocomplete-dropdown");e&&e.classList.add("hidden")}function nt(){if(!x)return[];const e=new Set;(x.scenes||[]).forEach(s=>{(s.blocks||[]).forEach(n=>{if(n.type==="character"){const a=n.content.replace(/\(.*\)/g,"").trim().toUpperCase();a&&a.length>=2&&e.add(a)}})}),(x.characters||[]).forEach(s=>{const n=(s||"").replace(/\(.*\)/g,"").trim().toUpperCase();n&&n.length>=2&&e.add(n)});const t=Array.from(e);return t.filter(s=>t.some(a=>a!==s&&a.startsWith(s))?x.scenes?.some(l=>l.blocks?.some(i=>i.type==="character"&&i.content.replace(/\(.*\)/g,"").trim().toUpperCase()===s)):!0)}function Qt(){if(!x)return[];const e=new Set;(x.scenes||[]).forEach(s=>{(s.blocks||[]).forEach(n=>{if(n.type==="scene"){const a=le(n.content);a.location&&a.location.length>=2&&e.add(a.location)}})}),(x.locations||[]).forEach(s=>{const n=(s||"").trim().toUpperCase();n&&n.length>=2&&e.add(n)});const t=Array.from(e);return t.filter(s=>t.some(a=>a!==s&&a.startsWith(s))?x.scenes?.some(l=>l.blocks?.some(i=>i.type==="scene"&&le(i.content).location===s)):!0)}function at(e,t){const s=e.getAttribute("data-block-type"),n=t.innerText,a=document.getElementById("editor-autocomplete-dropdown");if(!a)return;let l=[];if(s==="scene"){const o=n.toUpperCase(),c=n.match(/\s+-\s*([A-Za-z]*)$/);if(c){const d=(c[1]||"").toUpperCase(),p=["DAY","NIGHT","MORNING","EVENING","DAWN","DUSK","CONTINUOUS","LATER"].filter(f=>f.startsWith(d)),u=n.replace(/\s+-\s*[A-Za-z]*$/," - ");l=p.map(f=>({label:f,val:u+f}))}else if(o==="I"||o==="IN")l=["INT.","INT./EXT.","I/E."].map(d=>({label:d,val:d+" "}));else if(o==="E"||o==="EX")l=["EXT.","INT./EXT.","I/E."].map(d=>({label:d,val:d+" "}));else if(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i.test(n)){const d=n.match(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i),r=d[1].toUpperCase()+" ",p=(d[2]||"").trim().toUpperCase();p.length>0&&(l=Qt().filter(h=>h.startsWith(p)).map(h=>({label:h,val:`${r}${h}`})))}}else if(s==="character"){const o=n.trim().toUpperCase();o.length>0&&(l=nt().filter(r=>r.startsWith(o)).map(r=>({label:r,val:r})))}else if(s==="transition"){const o=n.trim().toUpperCase(),c=x.transitions||["CUT TO:","FADE IN:","FADE OUT.","DISSOLVE TO:","SMASH CUT TO:","MATCH CUT TO:","JUMP CUT TO:"];o.length>0&&(l=c.filter(r=>r.startsWith(o)).map(r=>({label:r,val:r})))}if(l.length===0){ge();return}a.innerHTML=l.map((o,c)=>{const d=typeof o=="object"?o.label:o,r=typeof o=="object"?o.val:o;return`
      <div class="autocomplete-item px-3 py-1.5 hover:bg-blue-50 text-slate-800 hover:text-blue-700 cursor-pointer flex items-center justify-between font-mono ${c===0?"active bg-blue-50/60 text-blue-700":""}" data-val="${r}">
        <span>${d}</span>
        <span class="text-[10px] text-slate-400 font-sans">Enter ↵</span>
      </div>
    `}).join("");const i=t.getBoundingClientRect();a.style.top=`${Math.min(window.innerHeight-200,i.bottom+4)}px`,a.style.left=`${Math.min(window.innerWidth-240,Math.max(16,i.left))}px`,a.classList.remove("hidden"),a.querySelectorAll(".autocomplete-item").forEach(o=>{o.onclick=()=>{const c=o.getAttribute("data-val");if(t.innerText=c,ae(e,c),s==="character")je(c);else if(s==="scene"){const d=le(c);d.location&&Le(d.location)}ge(),z(t),F=!0,M&&Z()}})}function We(e){const t=document.getElementById("editor-autocomplete-dropdown");if(!t)return;const s=t.querySelectorAll(".autocomplete-item");if(s.length===0)return;let n=Array.from(s).findIndex(a=>a.classList.contains("active"));n!==-1&&s[n].classList.remove("active","bg-blue-50/60","text-blue-700"),n=(n+e+s.length)%s.length,s[n].classList.add("active","bg-blue-50/60","text-blue-700"),s[n].scrollIntoView({block:"nearest"})}async function Ie(e=!1){if(!(ye||!x)){ye=!0,ce("Saving..."),x.scenes&&x.scenes.forEach(t=>{t.blocks&&t.blocks.forEach(s=>{(s.type==="action"||s.type==="dialogue")&&s.content&&(s.content=be(s.content))})});try{await ht(x.id,x),F=!1,ye=!1,ce("Saved"),e&&v("Saved")}catch{ye=!1,ce("Save failed"),v("Couldn't save changes · Tap retry")}}}function Z(){M&&(clearTimeout(Pe),Pe=setTimeout(async()=>{F&&M&&(await Ie(!1),ce("Autosaved just now"),v("Autosaved just now"))},1500))}function ce(e){const t=document.getElementById("editor-save-status"),s=document.getElementById("editor-save-icon");t&&(t.textContent=e),e==="Saving..."?s&&(s.textContent="progress_activity",s.classList.add("animate-spin")):e==="Saved"||e==="Autosaved just now"||e==="Unsaved"?s&&(s.textContent="save",s.classList.remove("animate-spin")):e==="Save failed"&&s&&(s.textContent="warning",s.classList.remove("animate-spin"))}function Me(){if(!x)return;const e=document.getElementById("navSceneSelect");if(e){const t=x.scenes||[];e.innerHTML=t.map((s,n)=>`
      <option value="${s.id}" ${n===0?"selected":""}>Scene ${s.number} ▾</option>
    `).join("")||'<option value="">Scene 1 ▾</option>'}}function Zt(){const e=document.getElementById("navSceneSelect");e&&(e.onchange=t=>{const s=t.target.value;s&&es(s)})}function es(e){const t=document.querySelector(`[data-scene-id="${e}"][data-block-type="scene"]`)||document.querySelector(`[data-scene-id="${e}"]`);t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.classList.add("bg-blue-50/50"),setTimeout(()=>t.classList.remove("bg-blue-50/50"),1500))}function ts(){const e=document.getElementById("element-bar");e&&e.querySelectorAll(".element-btn").forEach(t=>{t.onclick=s=>{s.preventDefault();const n=t.getAttribute("data-type");ss(n)}})}function ss(e){if(e==="bold"){document.execCommand("bold",!1,null);return}if(e==="italic"){document.execCommand("italic",!1,null);return}if(e==="underline"){document.execCommand("underline",!1,null);return}if(e==="strike"){document.execCommand("strikeThrough",!1,null);return}if(e==="undo"){document.execCommand("undo",!1,null);return}if(e==="redo"){document.execCommand("redo",!1,null);return}if(e==="image"){it(!0);return}if(!ie){const t=document.querySelector(".screenplay-block");t&&(ie=t.getAttribute("data-block-id"))}if(ie){const t=document.getElementById(ie);t&&(Se(t,e),lt(e))}}function lt(e){const t=document.getElementById("element-bar");t&&t.querySelectorAll(".element-btn").forEach(s=>{s.getAttribute("data-type")===e?s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-white bg-blue-600 shadow-2xs font-semibold shrink-0":s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0"})}function ns(e,t){const s=document.getElementById("editor-more-menu-btn"),n=document.getElementById("editorMoreMenuModal"),a=document.getElementById("closeMoreMenuBtn");function l(A){n&&(n.classList.remove("hidden"),n.classList.add("flex"),V({id:"moreMenu",name:"Screenplay Tools",close:()=>{n.classList.add("hidden"),n.classList.remove("flex")},restore:()=>{n.classList.remove("hidden"),n.classList.add("flex")}}))}s&&(s.onclick=()=>l()),a&&(a.onclick=()=>E("moreMenu")),n&&(n.onclick=A=>{A.target===n&&E("moreMenu")});const i=document.getElementById("menu-btn-scene-navigator");i&&(i.onclick=()=>{E("moreMenu");const A=document.getElementById("navSceneSelect");A&&A.focus()});const o=document.getElementById("menu-btn-char-navigator");o&&(o.onclick=()=>{E("moreMenu");const A=nt(),O=prompt(`Select character to navigate to:
${A.join(", ")}`,A[0]||"HILL");if(O){for(const H of x.scenes)for(const J of H.blocks)if(J.type==="character"&&J.content.toUpperCase().includes(O.trim().toUpperCase())){const U=document.getElementById(J.id);if(U){U.scrollIntoView({behavior:"smooth",block:"center"}),U.classList.add("bg-blue-100/60"),setTimeout(()=>U.classList.remove("bg-blue-100/60"),1500);return}}}});const c=document.getElementById("sceneNumberToggle"),d=document.getElementById("sceneNumberToggleText"),r=document.getElementById("menuSceneNumState"),p=document.getElementById("menu-btn-scene-numbers");function u(){Y=!Y,d&&(d.textContent=`Scene #s: ${Y?"On":"Off"}`),r&&(r.textContent=Y?"Enabled":"Disabled"),document.querySelectorAll(".scene-num-indicator").forEach(A=>{A.classList.toggle("hidden",!Y)}),v(`Scene numbers ${Y?"enabled (left side)":"hidden"}`)}c&&(c.onclick=u),p&&(p.onclick=()=>{u(),E("moreMenu")});const f=document.getElementById("focusModeToggle"),h=document.getElementById("focusModeText"),m=document.getElementById("menu-btn-focus-mode"),g=document.getElementById("menuFocusState");function y(A=null){G=A!==null?A:!G,h&&(h.textContent=G?"Exit Focus":"Focus"),g&&(g.textContent=G?"Active":"Off");const O=document.getElementById("editor-toolbar-strip"),H=document.getElementById("editor-accessory-tray"),J=document.getElementById("editor-document-tabs"),U=document.getElementById("editor-main-scroll");if(O&&(O.style.display=G?"none":"flex"),H&&(H.style.display=G?"none":"flex"),J&&(J.style.display=G?"none":"flex"),U&&(U.style.paddingTop=G?"56px":"190px"),G)V({id:"focusMode",name:"Focus Mode",close:()=>y(!1)}),v("Focus Mode active (distraction-free)");else{const xe=P.findIndex(ve=>ve.id==="focusMode");xe!==-1&&P.splice(xe,1),v("Exited Focus Mode")}}f&&(f.onclick=()=>y()),m&&(m.onclick=()=>{E("moreMenu"),y()});const w=document.getElementById("langToggleBtn"),N=document.getElementById("langToggleText"),S=document.getElementById("tamilLangBadge");function k(A){Ce=A,N&&(N.textContent=A==="TA"?"தமிழ் / EN":A==="TL"?"Tanglish":"EN / தமிழ்"),S&&(S.textContent=A==="TA"?"தமிழ் விசைப்பலகை: இயங்குகிறது":A==="TL"?"Tanglish: Active":"Tamil IME: Ready"),v(`Screenplay language set to ${A==="TA"?"Tamil":A==="TL"?"Tanglish":"English"}`)}w&&(w.onclick=()=>{k(Ce==="EN"?"TA":Ce==="TA"?"TL":"EN")}),document.querySelectorAll(".lang-choice-btn").forEach(A=>{A.onclick=()=>{k(A.getAttribute("data-lang")),E("moreMenu")}});const C=document.getElementById("btn-open-production"),T=document.getElementById("menu-btn-production"),se=()=>{const A=e||b.state.selectedScriptId||"chronicles-of-dust";sessionStorage.setItem("scriptora_prod_return",`/editor/${A}`),t(`/intelligence/analysis/production?from=editor&scriptId=${encodeURIComponent(A)}`)};C&&(C.onclick=se),T&&(T.onclick=()=>{E("moreMenu"),se()});const de=document.getElementById("menu-btn-go-page");de&&(de.onclick=()=>{E("moreMenu");const A=prompt("Enter page number to jump to (1-5):","1");if(A){const O=document.querySelector(`[data-page-num="${A}"]`);O&&O.scrollIntoView({behavior:"smooth",block:"start"})}});const pe=document.getElementById("btn-undo"),ue=document.getElementById("btn-redo");pe&&(pe.onclick=()=>document.execCommand("undo")),ue&&(ue.onclick=()=>document.execCommand("redo"))}function as(){const e=document.getElementById("btn-quick-find"),t=document.getElementById("menu-btn-find-replace"),s=document.getElementById("closeFindBtn"),n=document.getElementById("findInput"),a=document.getElementById("replaceInput"),l=document.getElementById("findNextBtn"),i=document.getElementById("findPrevBtn"),o=document.getElementById("replaceBtn"),c=document.getElementById("replaceAllBtn"),d=document.getElementById("findReplaceModal");e&&(e.onclick=()=>ke(!0)),t&&(t.onclick=()=>{E("moreMenu"),ke(!0)}),s&&(s.onclick=()=>E("findModal")),d&&(d.onclick=r=>{r.target===d&&E("findModal")}),n&&(n.oninput=()=>Te(n.value)),l&&(l.onclick=()=>Ne(1)),i&&(i.onclick=()=>Ne(-1)),o&&(o.onclick=()=>{const r=n.value,p=a.value;if(!r||X===-1||!D[X])return;const u=D[X];u.block.content=u.block.content.replace(r,p),Q(),Te(r),F=!0,M&&Z(),v("Replaced 1 occurrence")}),c&&(c.onclick=()=>{const r=n.value,p=a.value;if(!r)return;let u=0;x.scenes.forEach(f=>{f.blocks.forEach(h=>{h.content&&h.content.includes(r)&&(h.content=h.content.split(r).join(p),u++)})}),Q(),Te(r),F=!0,M&&Z(),v(`Replaced ${u} occurrences`)})}function ke(e){const t=document.getElementById("findReplaceModal");if(t)if(e)Ae=document.getElementById("editor-main-scroll")?.scrollTop||0,Be=ie,t.classList.remove("hidden"),t.classList.add("flex"),V({id:"findModal",name:"Find & Replace",close:()=>ke(!1)}),setTimeout(()=>{document.getElementById("findInput")?.focus()},40);else{t.classList.add("hidden"),t.classList.remove("flex"),De();const s=document.getElementById("editor-main-scroll");if(s&&Ae!==null&&(s.scrollTop=Ae),Be){const a=document.getElementById(Be),l=a?.querySelector('[contenteditable="true"]')||a;l&&l.focus()}const n=P.findIndex(a=>a.id==="findModal");n!==-1&&P.splice(n,1)}}function Te(e){D=[],X=-1;const t=document.getElementById("findMatchesCount");if(!e||!x){t&&(t.textContent="0 of 0"),De();return}x.scenes.forEach(s=>{s.blocks.forEach(n=>{n.content&&n.content.toLowerCase().includes(e.toLowerCase())&&D.push({block:n,sceneId:s.id})})}),t&&(t.textContent=D.length>0?`1 of ${D.length}`:"0 of 0"),D.length>0&&Ne(0)}function Ne(e){if(D.length===0)return;X=(X+e+D.length)%D.length;const t=D[X],s=document.getElementById("findMatchesCount");s&&(s.textContent=`${X+1} of ${D.length}`);const n=document.getElementById(t.block.id);n&&(n.scrollIntoView({behavior:"smooth",block:"center"}),De(),n.classList.add("bg-yellow-100"))}function De(){document.querySelectorAll(".screenplay-block").forEach(e=>{e.classList.remove("bg-yellow-100")})}function it(e){const t=document.getElementById("imageModal");if(t)if(e)t.classList.remove("hidden"),t.classList.add("flex"),V({id:"imageModal",name:"Insert Image",close:()=>it(!1)});else{t.classList.add("hidden"),t.classList.remove("flex");const s=P.findIndex(n=>n.id==="imageModal");s!==-1&&P.splice(s,1)}}function ls(e){const t=document.getElementById("imageModal"),s=document.getElementById("closeImageModal"),n=document.getElementById("cancelImageBtn"),a=document.getElementById("insertImageBtn"),l=document.getElementById("imgFileInput"),i=document.getElementById("imgUploadLabel");let o="";s&&(s.onclick=()=>E("imageModal")),n&&(n.onclick=()=>E("imageModal")),t&&(t.onclick=B=>{B.target===t&&E("imageModal")}),l&&(l.onchange=B=>{const I=B.target.files?.[0];if(I){i&&(i.textContent=I.name);const L=new FileReader;L.onload=q=>{o=q.target.result},L.readAsDataURL(I)}}),a&&(a.onclick=()=>{const B=document.getElementById("imgUrlInput")?.value.trim(),I=document.getElementById("imgCaptionInput")?.value.trim(),L=o||B;if(!L){v("Please provide an image URL or choose a file");return}const q={id:`b-${Date.now().toString().slice(-6)}`,type:"image",url:L,caption:I||""};!x.scenes||x.scenes.length===0?x.scenes=[{id:"scene-1",number:1,slugline:"INT. SCENE - DAY",blocks:[q]}]:x.scenes[x.scenes.length-1].blocks.push(q),Q(),F=!0,M&&Z(),v("Storyboard image inserted"),E("imageModal")});const c=document.getElementById("preferencesModal"),d=document.getElementById("menu-btn-preferences"),r=document.getElementById("closePrefModal"),p=document.getElementById("savePrefBtn");function u(B){if(c)if(B)c.classList.remove("hidden"),c.classList.add("flex"),V({id:"preferencesModal",name:"Preferences",close:()=>u(!1)});else{c.classList.add("hidden"),c.classList.remove("flex");const I=P.findIndex(L=>L.id==="preferencesModal");I!==-1&&P.splice(I,1)}}d&&(d.onclick=()=>{E("moreMenu"),u(!0)}),r&&(r.onclick=()=>E("preferencesModal")),c&&(c.onclick=B=>{B.target===c&&E("preferencesModal")}),p&&(p.onclick=()=>{const B=document.getElementById("prefSceneNumbers")?.checked,I=document.getElementById("prefLineSpacing")?.value,L=document.getElementById("prefFontSize")?.value;Y=B,document.querySelectorAll(".scene-num-indicator").forEach(W=>W.classList.toggle("hidden",!B));const q=document.querySelector(".screenplay-page-sheet");q&&(q.style.lineHeight=I==="2.0"?"30px":I==="1.0"?"20px":"24px",q.style.fontSize=L==="14pt"?"16px":"15px"),E("preferencesModal"),v("Preferences applied")});const f=document.getElementById("exportModal"),h=document.getElementById("exportModalBtn"),m=document.getElementById("menu-btn-export"),g=document.getElementById("closeExportModal"),y=document.getElementById("cancelExportBtn"),w=document.getElementById("startExportBtn"),N=document.getElementById("exportProgressArea"),S=document.getElementById("exportProgressBar"),k=document.getElementById("exportStatusText");function C(B){if(f)if(B)f.classList.remove("hidden"),f.classList.add("flex"),V({id:"exportModal",name:"Export",close:()=>C(!1)});else{f.classList.add("hidden"),f.classList.remove("flex"),N?.classList.add("hidden");const I=P.findIndex(L=>L.id==="exportModal");I!==-1&&P.splice(I,1)}}h&&(h.onclick=()=>C(!0)),m&&(m.onclick=()=>{E("moreMenu"),C(!0)}),g&&(g.onclick=()=>E("exportModal")),y&&(y.onclick=()=>E("exportModal")),f&&(f.onclick=B=>{B.target===f&&E("exportModal")}),w&&(w.onclick=()=>{const B=document.getElementById("exportFormatSelect")?.value||"pdf";N.classList.remove("hidden"),S.style.width="35%",k.textContent="Formatting Courier Prime typography and margins...",setTimeout(()=>{S.style.width="80%",k.textContent=`Compiling standard ${B.toUpperCase()} screenplay blocks...`},500),setTimeout(()=>{S.style.width="100%",k.textContent="Completed! Starting download...";let I="";document.getElementById("optTitlePage")?.checked&&x.titlePage&&(I+=`${x.titlePage.title||x.title}
`,I+=`Written by ${x.titlePage.author||"Author"}

`,x.titlePage.contact&&(I+=`${x.titlePage.contact}

`),I+=`=================================================

`),x.scenes.forEach(qe=>{qe.blocks.forEach(R=>{R.type==="scene"?I+=`

SCENE ${qe.number}
${R.content}

`:R.type==="character"?I+=`
			${R.content}
`:R.type==="parenthetical"?I+=`		${R.content}
`:R.type==="dialogue"?I+=`	${R.content}
`:R.type==="transition"?I+=`
						${R.content}

`:I+=`${R.content}

`})});const L=new Blob([I],{type:B==="pdf"?"application/pdf":"text/plain"}),q=URL.createObjectURL(L),W=document.createElement("a");W.href=q,W.download=`${x.title.replace(/[^a-zA-Z0-9]/g,"_")}_${x.draft||"Draft"}.${B}`,document.body.appendChild(W),W.click(),W.remove(),v(`Exported "${W.download}" successfully`),setTimeout(()=>E("exportModal"),800)},1e3)});const T=document.getElementById("versionsModal"),se=document.getElementById("versionsModalBtn"),de=document.getElementById("menu-btn-versions"),pe=document.getElementById("closeVersionsModal"),ue=document.getElementById("versionsListContainer");function A(B){T&&(T.classList.remove("hidden"),T.classList.add("flex"),O(),V({id:"versionsModal",name:"Versions",close:()=>{T.classList.add("hidden"),T.classList.remove("flex")},restore:()=>{T.classList.remove("hidden"),T.classList.add("flex"),O()}}))}async function O(){const B=await vt(e);ue&&(ue.innerHTML=B.map(I=>`
      <div class="p-3 rounded-xl border ${I.isCurrent?"border-2 border-blue-600 bg-blue-50/30":"border-slate-200 bg-white hover:bg-slate-50"} transition-colors flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-heading font-bold text-sm text-slate-900">${I.name}</span>
            <span class="px-2 py-0.5 rounded-full ${I.isCurrent?"bg-blue-600 text-white font-semibold":"bg-slate-100 text-slate-600 font-medium"} text-[10px]">${I.tag}</span>
          </div>
          <span class="text-[11px] text-slate-400 font-caption">${I.timestamp}</span>
        </div>
        <p class="text-xs text-slate-600">${I.notes||"Point-in-time snapshot."}</p>
        <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>Edited by ${I.author}</span>
          <div class="flex items-center gap-2">
            <span class="font-medium text-slate-700">${I.stats}</span>
            ${I.isCurrent?"":`<button class="restore-version-btn text-blue-600 font-semibold hover:underline" data-vname="${I.name}">Restore</button>`}
          </div>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".restore-version-btn").forEach(I=>{I.onclick=()=>{const L=I.getAttribute("data-vname");v(`Restored version "${L}"`),document.getElementById("currentVersionTag").textContent=L,E("versionsModal")}}))}se&&(se.onclick=()=>A()),de&&(de.onclick=()=>{E("moreMenu"),A()}),pe&&(pe.onclick=()=>E("versionsModal")),T&&(T.onclick=B=>{B.target===T&&E("versionsModal")});const H=document.getElementById("newVersionModal"),J=document.getElementById("openNewVersionPrompt"),U=document.getElementById("closeNewVersionModal"),xe=document.getElementById("cancelNewVersionBtn"),ve=document.getElementById("saveNewVersionBtn");function ot(){T.classList.add("hidden"),H.classList.remove("hidden"),H.classList.add("flex"),V({id:"newVersionModal",name:"New Version",close:()=>{H.classList.add("hidden"),H.classList.remove("flex")}})}J&&(J.onclick=ot),U&&(U.onclick=()=>E("newVersionModal")),xe&&(xe.onclick=()=>E("newVersionModal")),ve&&(ve.onclick=async()=>{const B=document.getElementById("newVersionNameInput")?.value.trim(),I=document.getElementById("newVersionNotesInput")?.value.trim();B&&(await yt(e,{name:B,notes:I}),v(`Created version snapshot "${B}"`),document.getElementById("currentVersionTag").textContent=B,E("newVersionModal"))});const ne=document.getElementById("compareModal"),Oe=document.getElementById("openCompareBtn"),Re=document.getElementById("menu-btn-compare"),_e=document.getElementById("closeCompareModal"),Fe=document.getElementById("closeCompareBtn2");function Ue(){T.classList.add("hidden"),ne.classList.remove("hidden"),ne.classList.add("flex"),V({id:"compareModal",name:"Compare Versions",close:()=>{ne.classList.add("hidden"),ne.classList.remove("flex")}})}Oe&&(Oe.onclick=Ue),Re&&(Re.onclick=()=>{E("moreMenu"),Ue()}),_e&&(_e.onclick=()=>E("compareModal")),Fe&&(Fe.onclick=()=>E("compareModal")),ne&&(ne.onclick=B=>{B.target===ne&&E("compareModal")})}function Ee(){if(!x)return;let e=0;x.scenes.forEach(l=>{l.blocks.forEach(i=>{i.content&&(e+=i.content.trim().split(/\s+/).filter(Boolean).length)})});const s=document.querySelectorAll(".screenplay-page-sheet").length||1,n=document.getElementById("telemetry-page-count"),a=document.getElementById("telemetry-word-count");n&&(n.textContent=`Page 1 of ${s}`),a&&(a.textContent=`${e.toLocaleString()} words`)}function is(){const e=b.state.scripts||[],t=b.state.selectedScriptId||"chronicles-of-dust",s=e.find(n=>n.id===t)||e[0]||{title:"Chronicles of Dust"};return`
    ${ee("Intelligence","Script Selector")}

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
            ${e.map(n=>{const a=n.id===t;return`
                <div data-script-id="${n.id}" data-script-title="${n.title}" class="script-select-card relative p-3.5 rounded-xl border ${a?"border-blue-600 bg-blue-50/70":"border-slate-200/80 bg-white hover:bg-slate-50"} transition-all cursor-pointer flex items-center justify-between group shadow-xs">
                  <div class="flex items-center gap-3 min-w-0 relative z-10">
                    <div class="shrink-0 w-9 h-9 rounded-lg ${a?"bg-white border-blue-200 text-blue-600":"bg-slate-50 border-slate-200 text-slate-600"} border flex items-center justify-center shadow-xs">
                      <span class="material-symbols-outlined text-[20px]">movie</span>
                    </div>
                    <div class="flex flex-col min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-semibold text-slate-900 truncate uppercase">${n.title}</span>
                        <span class="text-[10px] font-medium px-1.5 py-0.5 rounded ${a?"bg-blue-100 text-blue-700":"bg-slate-100 text-slate-600"} shrink-0">${n.draft||"Draft 1.0"}</span>
                      </div>
                      <span class="text-[11px] text-slate-500 truncate mt-0.5">${n.format||"Screenplay"} · ${n.pages} pages · Updated ${n.updated||"recently"}</span>
                    </div>
                  </div>
                  <div class="script-select-indicator w-6 h-6 rounded-full ${a?"bg-blue-600 text-white shadow-xs":"bg-slate-100 text-slate-400"} flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[16px] font-bold">${a?"check":"arrow_forward"}</span>
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
          <span class="truncate font-semibold" id="selector-btn-label">Continue to Context (${s.title})</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
        <span class="text-[10px] text-slate-400 tracking-tight">Establishes selectedScriptId for Script Analysis</span>
      </div>

    </main>

    ${te("intelligence")}
  `}function os(e){let t=b.state.selectedScriptId||"chronicles-of-dust";document.querySelectorAll(".script-select-card").forEach(a=>{a.onclick=()=>{const l=a.getAttribute("data-script-id"),i=a.getAttribute("data-script-title");t=l,b.selectScript(l),document.querySelectorAll(".script-select-card").forEach(d=>{d.className="script-select-card relative p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const r=d.querySelector(".script-select-indicator");r&&(r.className="script-select-indicator w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0",r.innerHTML='<span class="material-symbols-outlined text-[16px]">arrow_forward</span>')}),a.className="script-select-card relative p-3.5 rounded-xl border border-blue-600 bg-blue-50/70 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const o=a.querySelector(".script-select-indicator");o&&(o.className="script-select-indicator w-6 h-6 rounded-full bg-blue-600 text-white shadow-xs flex items-center justify-center shrink-0",o.innerHTML='<span class="material-symbols-outlined text-[16px] font-bold">check</span>');const c=document.getElementById("selector-btn-label");c&&(c.textContent=`Continue to Context (${i})`)}});const s=document.getElementById("submit-continue-analysis-btn");s&&(s.onclick=()=>{b.selectScript(t),e("/intelligence/context")});const n=document.getElementById("btn-import-script-modal");n&&(n.onclick=()=>{v("Select screenplay file (.fountain, .fdx, .pdf) to parse","info")})}function rs(){const e=b.state.selectedScriptId||"chronicles-of-dust",t=b.state.scripts.find(n=>n.id===e)||b.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",format:"Feature",industry:"International / Hollywood"},s=t.context||{format:t.format||"Feature",industry:t.industry||"International / Hollywood",hours:1,minutes:36,seconds:0};return`
    ${ee("Intelligence","Context Calibration")}

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
            <span class="text-xs text-blue-700 font-medium truncate max-w-[150px]">${t.title} · ${t.draft||"Draft 4.2"}</span>
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
            <button type="button" data-format="Short" class="format-card relative flex flex-col items-center justify-center p-3 rounded-xl ${s.format==="Short"?"bg-blue-50 border-2 border-blue-600":"bg-white border border-slate-200"} transition-all cursor-pointer hover:bg-slate-50">
              <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-1 text-slate-600">
                <span class="material-symbols-outlined text-[18px]">movie</span>
              </div>
              <span class="text-xs font-bold text-slate-900">Short</span>
              <span class="text-[10px] text-slate-500">~15–30m</span>
            </button>

            <button type="button" data-format="Pilot" class="format-card relative flex flex-col items-center justify-center p-3 rounded-xl ${s.format==="Pilot"?"bg-blue-50 border-2 border-blue-600":"bg-white border border-slate-200"} transition-all cursor-pointer hover:bg-slate-50">
              <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-1 text-slate-600">
                <span class="material-symbols-outlined text-[18px]">live_tv</span>
              </div>
              <span class="text-xs font-bold text-slate-900">Pilot</span>
              <span class="text-[10px] text-slate-500">~45–60m</span>
            </button>

            <button type="button" data-format="Feature" class="format-card relative flex flex-col items-center justify-center p-3 rounded-xl ${s.format==="Feature"?"bg-blue-50 border-2 border-blue-600":"bg-white border border-slate-200"} transition-all cursor-pointer hover:bg-slate-50">
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
              <option value="International / Hollywood" ${s.industry==="International / Hollywood"?"selected":""}>International / Hollywood Standard (3-Act Spec)</option>
              <option value="Tamil Cinema" ${s.industry==="Tamil Cinema"?"selected":""}>Tamil Cinema (Interval Block & Dual Peak Structure)</option>
              <option value="Malayalam Cinema" ${s.industry==="Malayalam Cinema"?"selected":""}>Malayalam Cinema (Character-driven Realism)</option>
              <option value="Telugu Cinema" ${s.industry==="Telugu Cinema"?"selected":""}>Telugu Cinema (Heroic Mythos & Commercial Cadence)</option>
              <option value="Hindi Cinema" ${s.industry==="Hindi Cinema"?"selected":""}>Hindi Cinema (Narrative Melodrama & Ensemble)</option>
              <option value="Indie / Festival" ${s.industry==="Indie / Festival"?"selected":""}>Indie / Festival (Poetic / Open-ended Form)</option>
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
                <span class="font-mono text-base font-bold text-slate-900 w-6 text-center" id="val-hr">${String(s.hours||1).padStart(2,"0")}</span>
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="hr" data-delta="1">+</button>
              </div>
            </div>

            <!-- Minutes -->
            <div class="flex flex-col items-center gap-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400">Minutes</span>
              <div class="flex items-center gap-2">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="min" data-delta="-5">-</button>
                <span class="font-mono text-base font-bold text-slate-900 w-6 text-center" id="val-min">${String(s.minutes||36).padStart(2,"0")}</span>
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="min" data-delta="5">+</button>
              </div>
            </div>

            <!-- Seconds -->
            <div class="flex flex-col items-center gap-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400">Seconds</span>
              <div class="flex items-center gap-2">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="sec" data-delta="-15">-</button>
                <span class="font-mono text-base font-bold text-slate-900 w-6 text-center" id="val-sec">${String(s.seconds||0).padStart(2,"0")}</span>
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

    ${te("intelligence")}
  `}function cs(e){const t=b.state.selectedScriptId||"chronicles-of-dust";let s="Feature",n=1,a=36,l=0;document.querySelectorAll(".format-card").forEach(c=>{c.onclick=()=>{s=c.getAttribute("data-format"),document.querySelectorAll(".format-card").forEach(d=>{d.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 transition-all cursor-pointer hover:bg-slate-50"}),c.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 border-2 border-blue-600 transition-all cursor-pointer",s==="Short"?(n=0,a=25):s==="Pilot"?(n=0,a=50):(n=1,a=45),i()}});function i(){const c=r=>String(r).padStart(2,"0");document.getElementById("val-hr").textContent=c(n),document.getElementById("val-min").textContent=c(a),document.getElementById("val-sec").textContent=c(l);const d=n*60+a+Math.round(l/60);document.getElementById("pacing-projection").textContent=`~${d} standard script pages`}document.querySelectorAll(".stepper-btn").forEach(c=>{c.onclick=()=>{const d=c.getAttribute("data-unit"),r=parseInt(c.getAttribute("data-delta"));d==="hr"&&(n=Math.max(0,Math.min(8,n+r))),d==="min"&&(a=Math.max(0,Math.min(59,(a+r+60)%60))),d==="sec"&&(l=Math.max(0,Math.min(59,(l+r+60)%60))),i()}});const o=document.getElementById("btn-submit-context");o&&(o.onclick=async()=>{const c=document.getElementById("industry-select")?.value||"International / Hollywood";o.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Calibrating SCRIPTORA...</span>',o.disabled=!0;const d=p=>String(p).padStart(2,"0"),r={format:s,industry:c,hours:n,minutes:a,seconds:l,plannedDuration:`${d(n)}:${d(a)}:${d(l)}`};await Pt(t,r),v("Narrative parameters calibrated"),e("/intelligence/dashboard")})}function ds(){const e=b.state.selectedScriptId||"chronicles-of-dust",t=b.state.scripts.find(n=>n.id===e)||b.state.activeScript||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pages:96,format:"Feature"},s=t.analysisScores||{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80};return`
    ${ee("Intelligence","Script Analysis")}

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
            <span class="text-xs text-blue-700 font-medium truncate max-w-[150px]">${t.title} · ${t.draft||"Draft 4.2"}</span>
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
            <h2 class="text-lg font-bold text-slate-900 font-heading">${t.title}</h2>
            <p class="text-xs text-slate-500 mt-0.5">${t.draft||"Draft 4.2"} · ${t.format||"Feature"} · ${t.pages} pages</p>
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
                <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 shrink-0">${t.title} · ${t.draft||"D4.2"}</span>
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
                <span class="text-2xl font-bold text-slate-900 leading-none tracking-tight font-heading">${s.overall}</span>
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
            ${[{name:"Pacing",score:s.pacing,icon:"speed"},{name:"Dialogue",score:s.dialogue,icon:"chat"},{name:"Emotion",score:s.emotion,icon:"favorite"},{name:"Character Arc",score:s.characterArc,icon:"alt_route"},{name:"Continuity",score:s.continuity,icon:"linear_scale"},{name:"Story Structure",score:s.storyStructure,icon:"account_tree"},{name:"Theme",score:s.theme,icon:"lightbulb"},{name:"Cinema",score:s.cinema,icon:"videocam"},{name:"Formatting",score:s.formatting,icon:"rule"},{name:"Production",score:s.production,icon:"movie_creation"}].map(n=>`
              <div class="py-2.5 flex items-center justify-between gap-3">
                <div class="flex items-center gap-2 w-36 shrink-0">
                  <span class="material-symbols-outlined text-[17px] text-slate-400">${n.icon}</span>
                  <span class="text-xs sm:text-sm font-medium text-slate-700 truncate">${n.name}</span>
                </div>
                <div class="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div class="h-full bg-blue-600 rounded-full" style="width: ${n.score}%;"></div>
                </div>
                <span class="text-xs sm:text-sm font-bold text-slate-900 w-8 text-right font-mono">${n.score}</span>
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
          <a href="/editor/${t.id}" class="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors no-underline">
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
            ${b.state.scripts.map(n=>`
              <div class="script-switch-opt p-3 rounded-xl ${n.id===t.id?"bg-blue-50 border border-blue-200":"bg-white border border-slate-200 hover:bg-slate-50"} flex items-center justify-between cursor-pointer" data-id="${n.id}">
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-slate-900 uppercase font-heading">${n.title}</span>
                  <span class="text-[11px] text-slate-500 mt-0.5">${n.format||"Feature"} · ${n.pages} pages · ${n.draft||"Draft 1.0"}</span>
                </div>
                ${n.id===t.id?'<span class="material-symbols-outlined text-blue-600 text-[18px]">check_circle</span>':""}
              </div>
            `).join("")}
          </div>
        </div>
      </div>

    </main>

    ${te("intelligence")}
  `}function ps(e){const t=b.state.selectedScriptId||"chronicles-of-dust",s=b.state.scripts.find(y=>y.id===t)||b.state.scripts[0],n=document.getElementById("btn-gen-logline"),a=document.getElementById("btn-gen-synopsis"),l=document.getElementById("ai-generated-container"),i=document.getElementById("ai-generated-title"),o=document.getElementById("ai-generated-body"),c=document.getElementById("ai-close-btn"),d=document.getElementById("ai-copy-btn"),r=document.getElementById("ai-copy-text"),p=document.getElementById("ai-query-input"),u=document.getElementById("ai-query-submit");function f(y){l&&(l.classList.remove("hidden"),i.textContent=y==="logline"?"Generated Logline":"Generated Synopsis",o.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Generating with narrative telemetry...</span>',setTimeout(()=>{o.textContent=y==="logline"?s?.logline||"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.":s?.synopsis||"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves."},400))}if(n&&(n.onclick=()=>f("logline")),a&&(a.onclick=()=>f("synopsis")),c&&(c.onclick=()=>l.classList.add("hidden")),d&&(d.onclick=()=>{navigator.clipboard?.writeText(o.textContent||""),r.textContent="Copied!",setTimeout(()=>{r.textContent="Copy"},1800),v("Copied to clipboard")}),u&&p){const y=async()=>{const w=p.value.trim();if(!w)return;l.classList.remove("hidden"),i.textContent="Intelligence AI Answer",o.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing draft semantics...</span>';const N=await Qe(w,t);o.textContent=N,p.value=""};u.onclick=y,p.onkeydown=w=>{w.key==="Enter"&&y()}}const h=document.getElementById("script-switcher-modal"),m=document.getElementById("script-selector-trigger"),g=document.getElementById("close-script-switcher-modal");m&&(m.onclick=()=>h?.classList.remove("hidden")),g&&(g.onclick=()=>h?.classList.add("hidden")),document.querySelectorAll(".script-switch-opt").forEach(y=>{y.onclick=()=>{const w=y.getAttribute("data-id");b.selectScript(w),h?.classList.add("hidden"),e("/intelligence")}})}function us(){const e=b.state.selectedScriptId||"chronicles-of-dust",t=b.state.scripts.find(n=>n.id===e)||b.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",pages:96},s=[{type:"pacing",title:"Pacing",desc:"See where the story moves too fast or too slowly.",icon:"speed",score:82,telemetry:`${t.pages||96} Pages Telemetry`},{type:"dialogue",title:"Dialogue",desc:"Cadence, subtext density and character voice rhythm.",icon:"chat",score:89,telemetry:"42 Dialogue Exchanges"},{type:"emotion",title:"Emotion",desc:"Emotional heatmaps, catharsis curves and sentiment.",icon:"favorite",score:91,telemetry:"Peak Catharsis: Act II"},{type:"character-arc",title:"Character Arc",desc:"Want vs. need trajectories and transformation tracking.",icon:"alt_route",score:84,telemetry:"4 Major Protagonists"},{type:"continuity",title:"Continuity",desc:"Props, character locations, and temporal logic rules.",icon:"linear_scale",score:78,telemetry:"2 Minor Prop Conflicts"},{type:"story-structure",title:"Story Structure",desc:"Beat breakdowns, midpoint shifts and turning points.",icon:"account_tree",score:87,telemetry:"3-Act Paradigm Standard"},{type:"theme",title:"Theme",desc:"Core philosophical spines, motifs and moral arguments.",icon:"lightbulb",score:90,telemetry:"3 Tracked Motifs"},{type:"cinema",title:"Cinema",desc:"Visual storytelling, shot economy and set-piece power.",icon:"videocam",score:85,telemetry:"Cinematic Visual Index"},{type:"scene",title:"Scene Analysis",desc:"Deep dive breakdown of goals, conflict and polarity.",icon:"movie",score:86,telemetry:"Scene 18 Active Scope"},{type:"formatting",title:"Formatting",desc:"Standard industry margins, sluglines and font rules.",icon:"rule",score:94,telemetry:"Standard Guild Rules"},{type:"production",title:"Production",desc:"Locations, shooting cast, props and cost estimators.",icon:"movie_creation",score:80,telemetry:"24 Practical Locations"}];return`
    ${ee("Intelligence","Analyse Individually")}

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
            <span class="text-xs font-medium">${t.title} · ${t.draft||"Draft 4.2"}</span>
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
          ${s.map(n=>`
            <a href="/intelligence/analysis/${n.type}" class="analysis-tile group flex flex-col justify-between p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm hover:border-blue-300 transition-all active:scale-[0.98] min-h-[148px] no-underline text-inherit cursor-pointer" data-keyword="${n.title.toLowerCase()} ${n.desc.toLowerCase()}">
              <div>
                <div class="flex items-center justify-between">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[19px]">${n.icon}</span>
                  </div>
                  <span class="material-symbols-outlined text-[18px] text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                </div>
                <h2 class="font-heading font-bold text-slate-900 mt-2.5 text-sm leading-tight">${n.title}</h2>
                <p class="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">${n.desc}</p>
              </div>

              <div class="pt-2 flex items-center justify-between border-t border-slate-100">
                <span class="text-[10px] text-slate-400 truncate max-w-[90px]">${n.telemetry}</span>
                <span class="text-xs font-mono font-bold text-blue-600">${n.score}</span>
              </div>
            </a>
          `).join("")}
        </div>

      </div>
    </main>

    ${te("intelligence")}
  `}function xs(e){const t=document.getElementById("analysis-filter-input");t&&(t.oninput=s=>{const n=s.target.value.toLowerCase().trim();document.querySelectorAll("#analysis-tiles-grid .analysis-tile").forEach(a=>{const l=a.getAttribute("data-keyword")||"";a.style.display=l.includes(n)?"flex":"none"})})}const Ge={pacing:{title:"Pacing Analysis",score:82,icon:"speed",desc:"Scene duration variance, narrative tempo and page-turn velocity.",questions:["Where does the pace drag in Act II?","Find scenes over 4 pages","Show action-to-dialogue ratios"],findings:[{scene:"SCENE 14 · Dockside Perimeter · Pg 36",act:"Act II",title:"Action beats slow down before major confrontation",desc:"Extended exposition between dock guards lowers tension prior to container breach.",targetScene:14},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Peak narrative rhythm",desc:"Fast intercut dialogue creates maximum urgency before floodgate breach.",targetScene:18},{scene:"SCENE 26 · Coastal Highway · Pg 68",act:"Act III",title:"High velocity turning point",desc:"Pursuit cadence maintains optimal beats per page.",targetScene:26}]},dialogue:{title:"Dialogue Analysis",score:89,icon:"chat",desc:"Cadence, subtext density, distinctive character voice profiles.",questions:["Are character voices distinctive?","Find on-the-nose exposition lines","Analyze dialogue subtext in Scene 18"],findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Subtext is understated and powerful",desc:"Kevin avoids speaking about his brother directly, communicating through silence and tea rituals.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Meera O.S. dialogue establishes authority",desc:"Radio chatter avoids fluff and communicates technical stakes concisely.",targetScene:18}]},emotion:{title:"Emotion Analysis",score:91,icon:"favorite",desc:"Catharsis trajectory, emotional resonance curves, character empathy indices.",questions:["Where does emotional vulnerability peak?","Track empathy trajectory for Kevin","Catharsis resolution in Act III"],findings:[{scene:"SCENE 12 · Father’s Workshop · Pg 28",act:"Act I",title:"Emotional anchor established",desc:"Familial debt and generational sacrifice ground Kevin’s reluctance to blow the whistle.",targetScene:12},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Desperation under rising water",desc:"Kevin’s fear of failing Meera is palpable as water rises past junction box.",targetScene:18}]},"character-arc":{title:"Character Arc Analysis",score:84,icon:"alt_route",desc:"Want vs. Need conflict, psychological transformation, fatal flaw resolution.",questions:["Does Kevin overcome his passivity?","Meera character transformation","Antagonist motivation clarity"],findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]},continuity:{title:"Continuity Analysis",score:78,icon:"linear_scale",desc:"Prop tracking, character spatial locations, timeline consistency checks.",questions:["Check prop handover in Scene 18","Is time of day consistent across Act II?","Track the brass seal location"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Hydro-sensor probe referenced before retrieval",desc:"Verify Kevin picked up copper probe in Scene 16 or carries it on belt.",targetScene:18},{scene:"SCENE 22 · Pumping Station · Pg 58",act:"Act II",title:"Flashlight state discrepancy",desc:"Ensure flashlight was retrieved after water surge in Scene 19.",targetScene:22}]},"story-structure":{title:"Story Structure Analysis",score:87,icon:"account_tree",desc:"Inciting incident, plot points, midpoint shift, climax architecture.",questions:["Is midpoint clearly defined?","Evaluate climax timing on page 88","Are 3-act beats aligned?"],findings:[{scene:"SCENE 06 · Customs Registry · Pg 14",act:"Inciting Incident",title:"Off-manifest container discovered",desc:"The inciting anomaly sets Kevin on irreversible investigative path.",targetScene:6},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Midpoint (Pg 48/96)",title:"Stakes escalate from civil to criminal",desc:"Kevin realizes his own brother commands the smuggling cartel.",targetScene:18}]},theme:{title:"Theme Analysis",score:90,icon:"lightbulb",desc:"Primary narrative spine: Complicity vs. Duty and moral accountability.",questions:["What is the central theme?","Where is loyalty tested?","Show recurring thematic motifs"],findings:[{scene:"SCENE 09 · Family Kitchen · Pg 22",act:"Act I",title:"Familial pressure as thematic catalyst",desc:"Kevin hides eviction notice, showing economic desperation fueling institutional silence.",targetScene:9},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Moral test faced directly",desc:"Kevin must decide whether to save his brother or save the port city from flooding.",targetScene:18},{scene:"SCENE 36 · Rooftop Overlook · Pg 94",act:"Act III",title:"Theme delivers its final statement",desc:"Accountability over self-preservation.",targetScene:36}]},cinema:{title:"Cinema & Visual Storytelling",score:85,icon:"videocam",desc:"Visual set-piece density, image systems, lighting and camera intentionality.",questions:["Check visual contrast between acts","Highlight cinematic set-pieces","Analyze color palette cues in action lines"],findings:[{scene:"SCENE 01 · Harbor Drone View · Pg 01",act:"Act I",title:"Strong establishing visual metaphor",desc:"Rusted shipping containers stacked like monoliths beneath smog.",targetScene:1},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"High visual tension",desc:"Red emergency beacons reflected in rising brackish water.",targetScene:18}]},scene:{title:"Scene Analysis",score:86,icon:"movie",desc:"Micro-structure of Scene 18: Objective, obstacle, polarity change.",questions:["What is the scene objective?","Where does tension peak?","How does polarity shift?"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]},formatting:{title:"Formatting & Guild Compliance",score:94,icon:"rule",desc:"Industry standard margin measurements, capitalization, slugline syntax.",questions:["Check standard industry margins","Find non-standard scene sluglines","Verify dialogue capitalization rules"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Perfect Courier Prime 12pt slugline",desc:"Margins, dual dialogue spacing, and transition tags meet Writers Guild standards.",targetScene:18}]},production:{title:"Production Breakdown",score:80,icon:"movie_creation",desc:"Locations, shooting days, practical elements, cast size breakdown.",questions:["How many practical locations?","Show scenes with special props","List one-off speaking roles"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Location: Wet Stage / Customs Interior",desc:"Requires controlled water flooding tank, hydro-sensor prop box, wet comm-link gear.",targetScene:18}]}};function fs(e,t){const s=t.pages||96;switch(e){case"pacing":return`
        <!-- 1. PACING: Main Pacing Curve Graph -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">show_chart</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Timeline Pace</h2>
            </div>
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>${s} Pages Analyzed</span>
            </div>
          </div>

          <!-- SVG Curve Container -->
          <div class="relative w-full h-44 my-1 select-none bg-slate-50/60 rounded-xl p-2 border border-slate-100 overflow-hidden">
            <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 340 140">
              <defs>
                <linearGradient id="pacingGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stop-color="#2563eb" stop-opacity="0.25"></stop>
                  <stop offset="65%" stop-color="#2563eb" stop-opacity="0.05"></stop>
                  <stop offset="100%" stop-color="#2563eb" stop-opacity="0.0"></stop>
                </linearGradient>
              </defs>
              <!-- Average Tempo Guideline -->
              <line stroke="#cbd5e1" stroke-dasharray="3 4" stroke-width="1" x1="10" x2="330" y1="75" y2="75"></line>
              <text x="14" y="71" fill="#94a3b8" font-size="8" font-family="Inter" font-weight="600">Avg Tempo</text>

              <!-- Area Fill -->
              <path d="M 12 76 C 40 70, 60 45, 95 38 C 130 32, 160 115, 195 110 C 230 105, 260 25, 290 28 C 310 30, 325 55, 332 60 L 332 135 L 12 135 Z" fill="url(#pacingGradient)"></path>

              <!-- Smooth Curve -->
              <path d="M 12 76 C 40 70, 60 45, 95 38 C 130 32, 160 115, 195 110 C 230 105, 260 25, 290 28 C 310 30, 325 55, 332 60" fill="none" stroke="#2563eb" stroke-linecap="round" stroke-width="2.5"></path>

              <!-- Scene 04 Dot -->
              <g class="cursor-pointer group" data-jump-scene="4">
                <circle cx="58" cy="56" fill="#ffffff" r="4.5" stroke="#2563eb" stroke-width="2"></circle>
                <text fill="#64748b" font-family="Inter" font-size="8.5" font-weight="600" text-anchor="middle" x="58" y="45">Sc. 04</text>
              </g>

              <!-- Scene 18 Dot (Highlighted Peak) -->
              <g class="cursor-pointer group" data-jump-scene="18">
                <circle class="animate-ping" cx="106" cy="38" fill="#2563eb" fill-opacity="0.2" r="7"></circle>
                <circle cx="106" cy="38" fill="#2563eb" r="5" stroke="#ffffff" stroke-width="2"></circle>
                <text fill="#1d4ed8" font-family="Plus Jakarta Sans" font-size="9.5" font-weight="700" text-anchor="middle" x="106" y="24">Sc. 18 (Peak)</text>
              </g>

              <!-- Scene 24 Dot (Pacing Dip) -->
              <g class="cursor-pointer group" data-jump-scene="24">
                <circle cx="195" cy="110" fill="#ffffff" r="4.5" stroke="#f59e0b" stroke-width="2"></circle>
                <text fill="#d97706" font-family="Inter" font-size="8.5" font-weight="600" text-anchor="middle" x="195" y="127">Sc. 24 (Dip)</text>
              </g>

              <!-- Scene 31 Dot (Climax Surge) -->
              <g class="cursor-pointer group" data-jump-scene="31">
                <circle cx="282" cy="28" fill="#ffffff" r="4.5" stroke="#2563eb" stroke-width="2"></circle>
                <text fill="#1e293b" font-family="Inter" font-size="8.5" font-weight="600" text-anchor="middle" x="282" y="17">Sc. 31</text>
              </g>
            </svg>
          </div>

          <!-- Act Timeline Progress Labels -->
          <div class="grid grid-cols-5 text-center text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-100">
            <span>Beginning</span>
            <span>Act I</span>
            <span class="text-blue-600 font-semibold">Act II Mid</span>
            <span>Act III Climax</span>
            <span>Ending</span>
          </div>

          <!-- Plain English Synthesis -->
          <div class="mt-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">insights</span>
            <p class="text-xs text-slate-700 leading-relaxed">
              The story moves steadily at first, slows down in the middle (Scene 14–24), and accelerates into peak velocity leading into the climax.
            </p>
          </div>
        </section>
      `;case"dialogue":return`
        <!-- 2. DIALOGUE: Waveform Distribution Chart -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">chat</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Dialogue Distribution & Density</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">42 Exchanges</span>
          </div>

          <!-- Bar Sequence Graph -->
          <div class="bg-slate-50/60 rounded-xl p-3 border border-slate-100 flex flex-col gap-2">
            <div class="h-28 w-full flex items-end justify-between gap-1 sm:gap-1.5 px-1">
              <!-- Act I: Lean -->
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act I: Sc. 01-04">
                <div class="w-full bg-blue-200 rounded-t-sm transition-all group-hover:bg-blue-400" style="height: 28%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act I: Sc. 05-08">
                <div class="w-full bg-blue-300 rounded-t-sm transition-all group-hover:bg-blue-400" style="height: 38%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act I: Sc. 09-12">
                <div class="w-full bg-blue-400 rounded-t-sm transition-all group-hover:bg-blue-500" style="height: 48%;"></div>
              </div>
              <!-- Act II-A: Heaviest Dialogue -->
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act II: Sc. 14">
                <div class="w-full bg-blue-600 rounded-t-sm transition-all group-hover:bg-blue-700" style="height: 74%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act II Midpoint: Sc. 18 (Peak)">
                <div class="w-full bg-blue-700 rounded-t-sm ring-2 ring-blue-300 transition-all" style="height: 94%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act II: Sc. 20">
                <div class="w-full bg-blue-600 rounded-t-sm transition-all group-hover:bg-blue-700" style="height: 82%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act II: Sc. 24">
                <div class="w-full bg-blue-500 rounded-t-sm transition-all group-hover:bg-blue-600" style="height: 68%;"></div>
              </div>
              <!-- Act II-B: Exposition -->
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act II: Sc. 28">
                <div class="w-full bg-blue-600 rounded-t-sm transition-all group-hover:bg-blue-700" style="height: 84%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act II: Sc. 30">
                <div class="w-full bg-blue-400 rounded-t-sm transition-all group-hover:bg-blue-500" style="height: 56%;"></div>
              </div>
              <!-- Act III: Visual & Action Sparse -->
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act III: Climax Sc. 32">
                <div class="w-full bg-blue-300 rounded-t-sm transition-all group-hover:bg-blue-400" style="height: 34%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act III: Sc. 34">
                <div class="w-full bg-blue-200 rounded-t-sm transition-all group-hover:bg-blue-400" style="height: 24%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Ending: Sc. 36">
                <div class="w-full bg-blue-200 rounded-t-sm transition-all group-hover:bg-blue-300" style="height: 18%;"></div>
              </div>
            </div>

            <!-- Axis Labels -->
            <div class="flex justify-between items-center text-[10px] text-slate-400 pt-1 font-medium">
              <span>Beginning</span>
              <span>Act I</span>
              <span class="text-blue-600 font-bold">Act II (Dense Exchanges)</span>
              <span>Act III (Action Sparse)</span>
              <span>Ending</span>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="mt-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">record_voice_over</span>
            <p class="text-xs text-slate-700 leading-relaxed">
              Dialogue density peaks around Act II midpoint (Scene 18), shifting into sparse, visual action exchanges during the Act III climax.
            </p>
          </div>
        </section>
      `;case"emotion":return`
        <!-- 3. EMOTION: Emotional Movement Curve -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">favorite</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Emotional Trajectory & Catharsis</h2>
            </div>
            <div class="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-slate-300"></span>Calm</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-blue-600"></span>Tension</span>
            </div>
          </div>

          <!-- SVG Organic Emotional Curve -->
          <div class="relative w-full h-44 my-1 select-none bg-slate-50/60 rounded-xl p-2 border border-slate-100 overflow-hidden">
            <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 340 140">
              <defs>
                <linearGradient id="emotionGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stop-color="#2563eb" stop-opacity="0.22"></stop>
                  <stop offset="100%" stop-color="#2563eb" stop-opacity="0.0"></stop>
                </linearGradient>
              </defs>
              <line stroke="#e2e8f0" stroke-dasharray="3 3" stroke-width="1" x1="10" x2="330" y1="35" y2="35"></line>
              <line stroke="#e2e8f0" stroke-dasharray="3 3" stroke-width="1" x1="10" x2="330" y1="75" y2="75"></line>
              <line stroke="#e2e8f0" stroke-dasharray="3 3" stroke-width="1" x1="10" x2="330" y1="115" y2="115"></line>

              <!-- Curve Fill -->
              <path d="M 15 110 C 45 112, 60 102, 75 92 C 105 72, 135 78, 160 55 C 190 28, 220 70, 245 42 C 275 14, 295 18, 325 85 L 325 130 L 15 130 Z" fill="url(#emotionGradient)"></path>
              <!-- Curve Stroke -->
              <path d="M 15 110 C 45 112, 60 102, 75 92 C 105 72, 135 78, 160 55 C 190 28, 220 70, 245 42 C 275 14, 295 18, 325 85" fill="none" stroke="#2563eb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path>

              <!-- Scene 07 Marker (Quiet Setup) -->
              <g class="cursor-pointer group" data-jump-scene="7">
                <circle cx="75" cy="92" fill="#ffffff" r="4.5" stroke="#2563eb" stroke-width="2"></circle>
                <text fill="#64748b" font-family="Inter" font-size="8" font-weight="600" text-anchor="middle" x="75" y="82">Sc. 07 (Calm)</text>
              </g>

              <!-- Scene 18 Marker (Rising Shift) -->
              <g class="cursor-pointer group" data-jump-scene="18">
                <circle cx="160" cy="55" fill="#ffffff" r="4.5" stroke="#2563eb" stroke-width="2"></circle>
                <text fill="#2563eb" font-family="Inter" font-size="8" font-weight="700" text-anchor="middle" x="160" y="44">Sc. 18 (Surge)</text>
              </g>

              <!-- Scene 31 Marker (Climactic Peak) -->
              <g class="cursor-pointer group" data-jump-scene="31">
                <circle class="animate-ping" cx="275" cy="18" fill="#2563eb" fill-opacity="0.3" r="6"></circle>
                <circle cx="275" cy="18" fill="#2563eb" r="5" stroke="#ffffff" stroke-width="2"></circle>
                <text fill="#1d4ed8" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" text-anchor="middle" x="275" y="10">Sc. 31 (Peak Catharsis)</text>
              </g>
            </svg>
          </div>

          <!-- Phase Labels -->
          <div class="grid grid-cols-5 text-center text-[10px] text-slate-500 font-medium pt-1 border-t border-slate-100">
            <span>Opening</span>
            <span>Act I Setup</span>
            <span class="text-blue-600 font-semibold">Act II Tension</span>
            <span>Act III Climax</span>
            <span>Resolution</span>
          </div>

          <!-- Plain English Synthesis -->
          <div class="mt-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">sentiment_content</span>
            <p class="text-xs text-slate-700 leading-relaxed">
              The emotional level stays calm and reflective at first, escalates under moral jeopardy in Act II, and delivers cathartic release in the final sequences.
            </p>
          </div>
        </section>
      `;case"character-arc":return`
        <!-- 4. CHARACTER ARC: Beginning -> Middle -> Ending Journey Diagram -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">alt_route</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Character Journey & Transformation</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">Active Protagonist</span>
          </div>

          <!-- Character Selector Pills -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1" id="char-arc-selector">
            <button type="button" class="char-pill active px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs" data-char="kevin">
              <span class="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">K</span>
              <span>Kevin (Protagonist · 48 scenes)</span>
            </button>
            <button type="button" class="char-pill px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors" data-char="meera">
              <span class="w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center text-[10px]">M</span>
              <span>Meera (Confidante · 22 scenes)</span>
            </button>
          </div>

          <!-- Journey Step Diagram (Beginning -> Middle -> Ending) -->
          <div class="relative flex flex-col gap-4 pl-2 py-1">
            <!-- Step 1: Beginning -->
            <div class="relative flex items-start gap-3">
              <div class="absolute left-3.5 top-6 bottom-0 w-0.5 bg-slate-200"></div>
              <div class="w-7 h-7 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center shrink-0 z-10 text-slate-600 text-xs font-bold">1</div>
              <div class="flex flex-col min-w-0 pt-0.5">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-slate-900 uppercase tracking-wide">Beginning · Scene 01–11</span>
                  <span class="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 font-mono">Fatal Flaw</span>
                </div>
                <h3 class="text-xs font-bold text-slate-800 mt-1">Silent Compliance & Institutional Fear</h3>
                <p class="text-xs text-slate-500 mt-0.5 leading-relaxed">Hesitant and guarded, Kevin stamps irregular manifests to keep peace with superiors and protect familial debt.</p>
              </div>
            </div>

            <!-- Step 2: Middle / Turning Point -->
            <div class="relative flex items-start gap-3">
              <div class="absolute left-3.5 top-6 bottom-0 w-0.5 bg-blue-300"></div>
              <div class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 z-10 text-xs font-bold shadow-xs">2</div>
              <div class="flex flex-col min-w-0 pt-0.5">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-blue-600 uppercase tracking-wide">Middle · Scene 18 (Midpoint)</span>
                  <span class="px-2 py-0.5 rounded bg-blue-50 text-[10px] text-blue-700 font-semibold font-mono">Turning Point</span>
                </div>
                <h3 class="text-xs font-bold text-slate-900 mt-1">The Point of No Return</h3>
                <p class="text-xs text-slate-500 mt-0.5 leading-relaxed">Cuts the emergency floodgate seal, actively defying union directives to prevent port catastrophe.</p>
              </div>
            </div>

            <!-- Step 3: Ending / Resolution -->
            <div class="relative flex items-start gap-3">
              <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 z-10 text-xs font-bold shadow-xs">3</div>
              <div class="flex flex-col min-w-0 pt-0.5">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-emerald-700 uppercase tracking-wide">Ending · Scene 36–38</span>
                  <span class="px-2 py-0.5 rounded bg-emerald-50 text-[10px] text-emerald-700 font-semibold font-mono">Resolution</span>
                </div>
                <h3 class="text-xs font-bold text-slate-900 mt-1">Selfless Moral Accountability</h3>
                <p class="text-xs text-slate-500 mt-0.5 leading-relaxed">Hands over the ledger to the public audit without demanding personal immunity, completing moral transformation.</p>
              </div>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="mt-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">psychology</span>
            <p class="text-xs text-slate-700 leading-relaxed">
              The protagonist completes a verified 3-stage transformation: overcoming passivity at the midpoint and prioritizing moral duty over self-preservation in the climax.
            </p>
          </div>
        </section>
      `;case"continuity":return`
        <!-- 5. CONTINUITY: Continuity Timeline & Track Matrix -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">linear_scale</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Continuity Timeline & Logic Matrix</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">118 Pages Indexed</span>
          </div>

          <!-- Act Flow Visualizer Track -->
          <div class="bg-slate-50/60 rounded-xl p-3.5 border border-slate-100 flex flex-col gap-3">
            <div class="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-1">
              <span>Act I (Pg 1-32)</span>
              <span>Act II (Pg 33-88)</span>
              <span>Act III (Pg 89-118)</span>
            </div>
            
            <div class="relative w-full h-8 flex items-center my-1">
              <div class="absolute inset-x-2 h-2 bg-slate-200 rounded-full"></div>
              <div class="absolute left-2 w-1/3 h-2 bg-blue-300 rounded-full"></div>
              <div class="absolute left-1/3 w-1/2 h-2 bg-blue-600 rounded-full"></div>
              
              <!-- Track Nodes -->
              <div class="relative w-full flex items-center justify-between px-2">
                <div class="flex flex-col items-center">
                  <span class="w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white shadow-xs"></span>
                  <span class="text-[9px] font-semibold text-slate-500 mt-1">Sc. 01</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-100 flex items-center justify-center animate-pulse">
                    <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </span>
                  <span class="text-[9px] font-bold text-amber-600 mt-1">Sc. 14 (Prop)</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white shadow-xs"></span>
                  <span class="text-[9px] font-semibold text-slate-500 mt-1">Sc. 18</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-100 flex items-center justify-center">
                    <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </span>
                  <span class="text-[9px] font-bold text-amber-600 mt-1">Sc. 22 (Time)</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white shadow-xs"></span>
                  <span class="text-[9px] font-semibold text-slate-500 mt-1">Sc. 36</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 4 Dimensions Grid -->
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span class="font-bold text-slate-900 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px] text-blue-600">location_on</span>
                Locations (24)
              </span>
              <span class="text-slate-500 text-[11px]">14 Int · 10 Ext verified across sequence</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span class="font-bold text-slate-900 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px] text-blue-600">schedule</span>
                Time Progression
              </span>
              <span class="text-slate-500 text-[11px]">Continuous night rainfall timeline</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span class="font-bold text-slate-900 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px] text-blue-600">group</span>
                Characters (18)
              </span>
              <span class="text-slate-500 text-[11px]">Spatial presence synchronized in rooms</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span class="font-bold text-slate-900 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px] text-amber-600">construction</span>
                Props (32)
              </span>
              <span class="text-amber-700 font-semibold text-[11px]">1 handover flagged in Scene 18</span>
            </div>
          </div>
        </section>
      `;case"story-structure":return`
        <!-- 6. STORY STRUCTURE: Narrative Structure Map -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">account_tree</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Narrative Structure Map</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">3-Act Framework</span>
          </div>

          <!-- Multi-Beat Segmented Progress Bar -->
          <div class="bg-slate-50/60 rounded-xl p-3.5 border border-slate-100 flex flex-col gap-3">
            <div class="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Beginning (Act I · 25%)</span>
              <span class="text-blue-600">Middle (Act II · 55%)</span>
              <span>Ending (Act III · 20%)</span>
            </div>

            <div class="relative w-full h-3 rounded-full bg-slate-200 flex overflow-hidden">
              <div class="h-full bg-blue-300" style="width: 25%;"></div>
              <div class="h-full bg-blue-600" style="width: 55%;"></div>
              <div class="h-full bg-indigo-700" style="width: 20%;"></div>
            </div>

            <!-- Milestone Grid -->
            <div class="grid grid-cols-4 gap-1 pt-1 text-[11px]">
              <div class="flex flex-col">
                <span class="font-bold text-blue-700">Inciting Event</span>
                <span class="text-slate-500">Sc. 06 (p. 14)</span>
              </div>
              <div class="flex flex-col text-center">
                <span class="font-bold text-blue-700">Midpoint Shift</span>
                <span class="text-slate-500">Sc. 18 (p. 48)</span>
              </div>
              <div class="flex flex-col text-center">
                <span class="font-bold text-blue-700">Climax Crisis</span>
                <span class="text-slate-500">Sc. 31 (p. 82)</span>
              </div>
              <div class="flex flex-col text-right">
                <span class="font-bold text-slate-900">Resolution</span>
                <span class="text-slate-500">Sc. 36 (p. 94)</span>
              </div>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="mt-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">hub</span>
            <p class="text-xs text-slate-700 leading-relaxed">
              The screenplay displays a canonical three-act foundation with an impactful midpoint turn. Act II maintains high narrative tension without losing forward momentum.
            </p>
          </div>
        </section>
      `;case"theme":return`
        <!-- 7. THEME: Main Thematic Representation & Relationship Tree -->
        <section class="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">hub</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Thematic Core & Motifs</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">3 Motifs Tracked</span>
          </div>

          <!-- Primary Spine Card -->
          <div class="bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex flex-col gap-1">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold uppercase tracking-wider text-blue-700 font-mono">Primary Narrative Spine</span>
              <span class="material-symbols-outlined text-[16px] text-blue-600">verified</span>
            </div>
            <h3 class="font-heading text-base font-bold text-slate-900">Complicity vs. Duty</h3>
            <p class="text-xs text-slate-600 leading-relaxed">The burden of moral responsibility when survival demands silence.</p>
          </div>

          <!-- 2 Sub-themes in Compact Cards -->
          <div class="grid grid-cols-2 gap-2.5">
            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 flex flex-col gap-1">
              <div class="flex items-center gap-1.5 text-slate-800">
                <span class="material-symbols-outlined text-[16px] text-blue-600">groups</span>
                <span class="text-xs font-bold">Family & Debt</span>
              </div>
              <p class="text-[11px] text-slate-500 leading-snug">The recurring pressure of generational expectations.</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 flex flex-col gap-1">
              <div class="flex items-center gap-1.5 text-slate-800">
                <span class="material-symbols-outlined text-[16px] text-blue-600">corporate_fare</span>
                <span class="text-xs font-bold">Institutional Silence</span>
              </div>
              <p class="text-[11px] text-slate-500 leading-snug">Systems that compel honest characters to compromise.</p>
            </div>
          </div>

          <!-- Thematic Relationship Structure / Connections -->
          <div class="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/80 flex flex-col gap-2.5">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-heading">Thematic Scene Connections</span>
            
            <div class="flex flex-col gap-2 font-mono text-[11px] text-slate-700 pl-1">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                <span class="font-bold text-slate-900">PRIMARY: Complicity vs Duty</span>
              </div>
              <div class="pl-4 border-l-2 border-slate-200 flex flex-col gap-1.5 text-slate-600">
                <div class="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                  <span>├── Moral accountability</span>
                  <span class="text-blue-600 font-semibold font-sans text-[10px]">Scene 18 · Midpoint</span>
                </div>
                <div class="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                  <span>├── Family economic pressure</span>
                  <span class="text-slate-500 font-semibold font-sans text-[10px]">Scene 09 · Kitchen</span>
                </div>
                <div class="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                  <span>└── Public accountability</span>
                  <span class="text-blue-600 font-semibold font-sans text-[10px]">Scene 36 · Rooftop</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Context Quote / Synthesis Card -->
          <div class="bg-slate-100/70 rounded-xl p-3 flex items-start gap-2 border border-slate-200/50">
            <span class="material-symbols-outlined text-slate-400 text-[18px] shrink-0 mt-0.5">format_quote</span>
            <p class="text-xs text-slate-600 italic leading-relaxed">
              "The thematic framework consistently reinforces moral accountability, resonating through character choices in every act."
            </p>
          </div>
        </section>
      `;case"cinema":return`
        <!-- 8. CINEMA: Cinematic Dynamics & Visual Opportunities -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">videocam</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Cinematic Dynamics & Visual Storytelling</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">Visual Grammar</span>
          </div>

          <!-- Visual Breakdown: Density across Act I, II, III -->
          <div class="bg-slate-50/60 rounded-xl p-4 border border-slate-100 flex flex-col gap-3">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-slate-800">Visual Action vs. Dialogue Exposition</span>
              <div class="flex items-center gap-3 text-[11px] text-slate-500">
                <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-blue-600"></span>Visual Density</span>
                <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-slate-300"></span>Exposition</span>
              </div>
            </div>

            <!-- Act Meters -->
            <div class="space-y-2.5">
              <div>
                <div class="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Act I: Setup & Atmosphere</span>
                  <span class="font-bold text-slate-900">88% Visual</span>
                </div>
                <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-600 rounded-full" style="width: 88%;"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Act II: Confrontation & Rising Surge</span>
                  <span class="font-bold text-slate-900">76% Visual</span>
                </div>
                <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-600 rounded-full" style="width: 76%;"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Act III: Climax & Resolution</span>
                  <span class="font-bold text-slate-900">91% Visual</span>
                </div>
                <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-600 rounded-full" style="width: 91%;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Set-Pieces Visual Opportunities -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span class="font-bold text-slate-900 flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px] text-blue-600">photo_camera</span>
                Visual Metaphor
              </span>
              <p class="text-slate-500 text-[11px]">Rusted shipping containers stacked like monoliths beneath smog (Scene 01).</p>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span class="font-bold text-slate-900 flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px] text-blue-600">light_mode</span>
                Lighting & Color Cues
              </span>
              <p class="text-slate-500 text-[11px]">Red emergency beacons reflected in rising brackish water (Scene 18).</p>
            </div>
          </div>
        </section>
      `;case"formatting":return`
        <!-- 9. FORMATTING: Formatting Health Visual & Guild Compliance -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">rule</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Screenplay Formatting Health</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">Standard Guild Rules</span>
          </div>

          <!-- Compliance Checklist & Meters -->
          <div class="bg-slate-50/60 rounded-xl p-4 border border-slate-100 space-y-3">
            <div class="flex items-center justify-between pb-1 border-b border-slate-200/60">
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Compliance across ${s} pages</span>
              <span class="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px]">check_circle</span>
                Guild Approved
              </span>
            </div>

            <!-- Metric 1: Headings -->
            <div class="space-y-1">
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-700 font-medium">Scene Heading Syntax (INT./EXT.)</span>
                <span class="text-slate-900 font-bold">96% ✓</span>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div class="h-full bg-emerald-600 rounded-full" style="width: 96%;"></div>
              </div>
            </div>

            <!-- Metric 2: Indentation -->
            <div class="space-y-1">
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-700 font-medium">Character & Dialogue Indentation</span>
                <span class="text-slate-900 font-bold">98% ✓</span>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div class="h-full bg-emerald-600 rounded-full" style="width: 98%;"></div>
              </div>
            </div>

            <!-- Metric 3: Sluglines -->
            <div class="space-y-1">
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-700 font-medium">Slugline Conventions & Capitalization</span>
                <span class="text-slate-900 font-bold">91% ✓</span>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div class="h-full bg-emerald-600 rounded-full" style="width: 91%;"></div>
              </div>
            </div>

            <!-- Metric 4: Action Density -->
            <div class="space-y-1">
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-700 font-medium">Action Paragraph Density (&le;4 lines)</span>
                <span class="text-slate-900 font-bold">94% ✓</span>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div class="h-full bg-emerald-600 rounded-full" style="width: 94%;"></div>
              </div>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5">verified</span>
            <p class="text-xs text-slate-700 leading-relaxed">
              Screenplay strictly follows standard Writers Guild Courier Prime formatting conventions with standard margins and scene slugline structure.
            </p>
          </div>
        </section>
      `;case"production":return`
        <!-- 10. PRODUCTION: Production Summary & Logistics Breakdown -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">movie_creation</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Production Breakdown & Practical Elements</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">Practical Elements</span>
          </div>

          <!-- 4-Grid Metric Blocks -->
          <div class="grid grid-cols-2 gap-2.5">
            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 flex flex-col">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">LOCATIONS</span>
              <span class="font-heading text-xl font-bold text-slate-900">24</span>
              <span class="text-[11px] text-slate-500 mt-0.5">14 Int · 10 Ext</span>
            </div>

            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 flex flex-col">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">CHARACTERS</span>
              <span class="font-heading text-xl font-bold text-slate-900">18</span>
              <span class="text-[11px] text-slate-500 mt-0.5">9 Speaking · 9 Background</span>
            </div>

            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 flex flex-col">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">PROPS</span>
              <span class="font-heading text-xl font-bold text-slate-900">32</span>
              <span class="text-[11px] text-slate-500 mt-0.5">5 Key Story Props</span>
            </div>

            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 flex flex-col">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">SPECIAL REQS</span>
              <span class="font-heading text-xl font-bold text-slate-900">4</span>
              <span class="text-[11px] text-slate-500 mt-0.5">Night Rain, Wet Tank, FX</span>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">warehouse</span>
            <p class="text-xs text-slate-700 leading-relaxed">
              Extracted practical elements across ${s} pages. Primary production weight resides in Act II harbor logistics and wet stage setups (Scenes 14–22).
            </p>
          </div>
        </section>
      `;case"scene":return`
        <!-- 11. SCENE ANALYSIS: Dominant Scene Breakdown (Purpose, Conflict, What Changes) -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <!-- Slugline Header Banner -->
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">Target Scene Slugline</span>
              <span class="text-[11px] font-medium text-slate-500">Act II Midpoint · Pg 48 · ~3.5 min est.</span>
            </div>
            <h2 class="font-heading font-bold text-base text-slate-900 tracking-tight">
              SCENE 18 · INT. CUSTOMS OFFICE - NIGHT
            </h2>
          </div>

          <!-- 3 Dominant Analysis Rows -->
          <div class="flex flex-col divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-white overflow-hidden">
            <!-- Purpose Row -->
            <div class="p-3.5 flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[18px]">flag</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">PURPOSE</span>
                <p class="text-xs text-slate-800 font-medium leading-relaxed mt-0.5">
                  Kevin attempts to reroute the electrical relay before the surge floods the basement archives.
                </p>
              </div>
            </div>

            <!-- Conflict Row -->
            <div class="p-3.5 flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[18px]">crisis_alert</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">CONFLICT</span>
                <p class="text-xs text-slate-800 font-medium leading-relaxed mt-0.5">
                  Rising water breaches the junction box while automated emergency flood doors trigger lockouts, trapping him inside.
                </p>
              </div>
            </div>

            <!-- What Changes Row -->
            <div class="p-3.5 flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[18px]">swap_horiz</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">WHAT CHANGES</span>
                <p class="text-xs text-slate-800 font-medium leading-relaxed mt-0.5">
                  Kevin cuts the emergency seal and refuses to sign the false manifest, irreversibly shifting from passive worker to active resistance.
                </p>
              </div>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">movie</span>
            <p class="text-xs text-slate-700 leading-relaxed">
              Polarity shifts from cautious optimism (+1) to catastrophic physical trap and moral awakening (-2), marking the central pivot of the screenplay.
            </p>
          </div>
        </section>
      `;default:return""}}function ms(e="pacing",t=null,s=null){const n=Ge[e]||Ge.pacing,a=sessionStorage.getItem("scriptora_prod_return");let l;try{const p=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;l=new URLSearchParams(p||"")}catch{l=new URLSearchParams}const i=t==="editor"||l.get("from")==="editor"||!!a,o=s||l.get("scriptId")||(a?a.replace("/editor/",""):null)||b.state.selectedScriptId||"chronicles-of-dust",c=`/editor/${o}`,d=o,r=b.state.scripts.find(p=>p.id===d)||b.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",pages:96};return`
    ${ee(i?"Editor":"Intelligence",n.title)}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- 1. SUB-HEADER NAVIGATION ROW -->
        <div class="flex items-center justify-between">
          ${i?`
          <a href="${c}" id="analysis-back-btn" class="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors text-xs font-semibold uppercase tracking-wider no-underline">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Editor</span>
          </a>
          `:`
          <a href="/intelligence/analysis" id="analysis-back-btn" class="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors text-xs font-semibold uppercase tracking-wider no-underline">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Vectors</span>
          </a>
          `}
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span class="text-xs font-medium">${r.title} · ${r.draft||"Draft 4.2"}</span>
          </div>
        </div>

        <!-- Section Title Header -->
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[22px]">${n.icon}</span>
              <h1 class="font-heading text-xl font-bold text-slate-900 tracking-tight">${n.title}</h1>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${n.desc}</p>
          </div>
          <div class="flex flex-col items-end">
            <span class="text-2xl font-bold font-mono text-blue-600">${n.score}</span>
            <span class="text-[10px] text-slate-400 font-semibold uppercase">/100 Index</span>
          </div>
        </div>

        <!-- 2. AI QUERY BOX with Suggestion Pills -->
        <div class="flex flex-col gap-2">
          <div class="relative flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs focus-within:border-blue-600 transition-colors">
            <span class="material-symbols-outlined text-[18px] text-blue-600 mr-2 shrink-0">auto_awesome</span>
            <input id="vector-ai-input" class="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none" placeholder="Ask about this vector..." type="text">
            <button id="vector-ai-submit" class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 hover:bg-blue-700 active:scale-95 transition-all ml-1">
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div class="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            ${n.questions.map(p=>`
              <button type="button" class="query-pill shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors shadow-xs active:scale-95" data-query="${p}">
                ${p}
              </button>
            `).join("")}
          </div>

          <!-- AI Answer Box -->
          <div id="vector-ai-answer" class="hidden bg-white border border-blue-100 rounded-xl p-3 text-xs text-slate-700 shadow-xs leading-relaxed"></div>
        </div>

        <!-- 3. SCORE CARD (GLOBAL REQUIRED STRUCTURE) -->
        <div class="bg-white rounded-2xl py-4 px-6 shadow-xs border border-slate-200/80 flex items-center justify-center">
          <div class="flex items-baseline gap-1.5">
            <span class="font-heading font-extrabold text-3xl sm:text-4xl text-blue-600 tracking-tight">${n.score}</span>
            <span class="text-xs font-semibold text-slate-400">/ 100 Index</span>
          </div>
        </div>

        <!-- 4. MAIN ANALYSIS VISUAL / CONTENT (MANDATORY & RESTORED) -->
        ${fs(e,r)}

        <!-- 5. IMPORTANT FINDINGS (KEY SCENE FINDINGS) -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">Key Scene Findings</span>
            <span class="text-[11px] text-slate-400 font-medium">${n.findings.length} findings tracked</span>
          </div>

          ${n.findings.map(p=>`
            <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${p.scene}</span>
                <span class="text-[11px] font-medium text-slate-400">${p.act}</span>
              </div>
              <div class="flex flex-col">
                <h3 class="text-xs sm:text-sm font-bold text-slate-900">${p.title}</h3>
                <p class="text-xs text-slate-600 mt-1 leading-relaxed">${p.desc}</p>
              </div>
              <div class="pt-2 flex justify-end border-t border-slate-100">
                <!-- 6. OPEN IN EDITOR BUTTON -->
                <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${p.targetScene}">
                  <span class="material-symbols-outlined text-[15px]">edit_note</span>
                  <span>Open in Editor (Scene ${p.targetScene})</span>
                </button>
              </div>
            </div>
          `).join("")}
        </div>

      </div>
    </main>

    ${te("intelligence")}
  `}function bs(e,t,s=null,n=null){const a=sessionStorage.getItem("scriptora_prod_return");let l;try{const m=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;l=new URLSearchParams(m||"")}catch{l=new URLSearchParams}const i=s==="editor"||l.get("from")==="editor"||!!a,o=n||l.get("scriptId")||(a?a.replace("/editor/",""):null)||b.state.selectedScriptId||"chronicles-of-dust",c=`/editor/${o}`,d=document.getElementById("analysis-back-btn");d&&(d.onclick=m=>{m.preventDefault(),i?(sessionStorage.removeItem("scriptora_prod_return"),t(c)):t("/intelligence/analysis")});const r=o;document.querySelectorAll(".btn-open-editor-scene").forEach(m=>{m.onclick=()=>{const g=m.getAttribute("data-scene");b.setState({currentSceneId:g}),v(`Jumping to Scene ${g} in Editor`),t(`/editor/${r}?scene=${g}`)}}),document.querySelectorAll("[data-jump-scene]").forEach(m=>{m.onclick=()=>{const g=m.getAttribute("data-jump-scene");b.setState({currentSceneId:g}),v(`Jumping to Scene ${g} in Editor`),t(`/editor/${r}?scene=${g}`)}}),document.querySelectorAll("#char-arc-selector .char-pill").forEach(m=>{m.onclick=()=>{document.querySelectorAll("#char-arc-selector .char-pill").forEach(y=>{y.className="char-pill px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"}),m.className="char-pill active px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs";const g=m.getAttribute("data-char");v(`Switched active character focus to ${g==="meera"?"Meera":"Kevin"}`)}});const p=document.getElementById("vector-ai-input"),u=document.getElementById("vector-ai-submit"),f=document.getElementById("vector-ai-answer");async function h(m){if(!m||!f)return;f.classList.remove("hidden"),f.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing narrative beats...</span>';const g=await Qe(m,r);f.textContent=g}u&&p&&(u.onclick=()=>h(p.value.trim()),p.onkeydown=m=>{m.key==="Enter"&&h(p.value.trim())}),document.querySelectorAll(".query-pill").forEach(m=>{m.onclick=()=>{const g=m.getAttribute("data-query");p&&(p.value=g),h(g)}})}function gs(){const e=b.state.currentUser||{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return b.state.settings,`
    ${ee("Profile","Account & preferences.")}

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
            <span>${e.badge||"Member Pro"}</span>
          </div>
        </div>

        <!-- User Information Card -->
        <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs flex flex-col items-center text-center">
          <div class="relative">
            <div class="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-sm">
              ${e.initials||"AK"}
            </div>
            <button type="button" id="edit-avatar-btn" class="w-5 h-5 bg-white rounded-full border border-slate-200 text-slate-600 flex items-center justify-center absolute bottom-0 right-0 shadow-xs hover:bg-slate-50">
              <span class="material-symbols-outlined text-[11px]">edit</span>
            </button>
          </div>
          <h2 class="text-base font-bold text-slate-900 mt-2.5 leading-tight font-heading">${e.name}</h2>
          <p class="text-xs text-slate-500 mt-0.5">${e.headline||"Screenwriter"}</p>
          <div class="bg-slate-100 text-slate-600 text-[11px] font-medium px-3 py-1 rounded-full mt-2 inline-flex items-center gap-1.5">
            Scriptora Pro • Member since 2024
          </div>

          <div class="mt-4 grid grid-cols-3 gap-2.5 pt-3 w-full border-t border-slate-100">
            <div class="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center flex flex-col items-center">
              <span class="text-base font-bold text-slate-900 leading-tight font-heading">${e.stats?.drafts||14}</span>
              <span class="text-[10px] text-slate-500 mt-0.5">Drafts</span>
            </div>
            <div class="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center flex flex-col items-center">
              <span class="text-base font-bold text-slate-900 leading-tight font-heading">${e.stats?.coAuthors||3}</span>
              <span class="text-[10px] text-slate-500 mt-0.5">Co-Authors</span>
            </div>
            <div class="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center flex flex-col items-center">
              <span class="text-base font-bold text-slate-900 leading-tight font-heading">${e.stats?.healthIndex||"98%"}</span>
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
            ${[{id:"sheet-editor",title:"Editor",desc:"Screenplay formatting & behaviour",icon:"format_align_left"},{id:"sheet-language",title:"Language",desc:"English (US) / Tamil / Tanglish",icon:"translate"},{id:"sheet-appearance",title:"Appearance",desc:"Light (System Default)",icon:"palette"},{id:"sheet-notifications",title:"Notifications",desc:"Collaboration and activity alerts",icon:"notifications_active"},{id:"sheet-intelligence",title:"Intelligence",desc:"AI analysis and prompt suggestions",icon:"auto_awesome"},{id:"sheet-privacy",title:"Privacy & Data",desc:"End-to-end IP protection & export",icon:"security"},{id:"sheet-storage",title:"Storage & Sync",desc:"Cloud backup & offline persistence",icon:"cloud_done"}].map(t=>`
              <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="${t.id}">
                <div class="flex items-center min-w-0">
                  <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                    <span class="material-symbols-outlined text-[18px]">${t.icon}</span>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">${t.title}</span>
                    <span class="text-xs text-slate-500 truncate mt-0.5">${t.desc}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5">${e.email}</span>
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
              <input type="text" id="prof-input-name" value="${e.name}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Headline</label>
              <input type="text" id="prof-input-headline" value="${e.headline||"Screenwriter"}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Email Address</label>
              <input type="email" id="prof-input-email" value="${e.email}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
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

    ${te("profile")}
  `}function hs(e){const t=document.getElementById("settings-search-input");t&&(t.oninput=S=>{const k=S.target.value.toLowerCase().trim();document.querySelectorAll("#settings-list .setting-item").forEach(C=>{const T=C.textContent.toLowerCase();C.style.display=T.includes(k)?"flex":"none"})}),document.querySelectorAll(".setting-item").forEach(S=>{S.onclick=()=>{const k=S.querySelector(".font-semibold")?.textContent;v(`${k} settings are up to date`)}});const s=document.getElementById("modal-edit-profile"),n=document.getElementById("trigger-modal-email"),a=document.getElementById("edit-avatar-btn"),l=document.getElementById("form-update-profile");function i(S){S?s?.classList.remove("hidden"):s?.classList.add("hidden")}n&&(n.onclick=()=>i(!0)),a&&(a.onclick=()=>i(!0)),document.querySelectorAll(".close-profile-modal").forEach(S=>S.onclick=()=>i(!1)),l&&(l.onsubmit=async S=>{S.preventDefault();const k=document.getElementById("prof-input-name").value,C=document.getElementById("prof-input-headline").value,T=document.getElementById("prof-input-email").value;await Tt({name:k,headline:C,email:T}),i(!1),v("Profile updated successfully"),e("/profile")});const o=document.getElementById("modal-security"),c=document.getElementById("trigger-modal-password"),d=document.getElementById("form-update-pw");function r(S){S?o?.classList.remove("hidden"):o?.classList.add("hidden")}c&&(c.onclick=()=>r(!0)),document.querySelectorAll(".close-security-modal").forEach(S=>S.onclick=()=>r(!1)),d&&(d.onsubmit=S=>{S.preventDefault(),r(!1),v("Password updated securely")});const p=document.getElementById("action-modal"),u=document.getElementById("action-modal-title"),f=document.getElementById("action-modal-desc"),h=document.getElementById("action-modal-icon"),m=document.getElementById("action-modal-icon-box"),g=document.getElementById("action-modal-confirm"),y=document.getElementById("action-modal-cancel");let w="signout";function N(S){w=S,S==="signout"?(u.textContent="Sign Out",f.textContent="Are you sure you want to end your active session on this device?",h.textContent="logout",m.className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center",g.className="flex-1 h-10 px-4 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900",g.textContent="Sign Out"):(u.textContent="Delete Account",f.textContent="This action will permanently delete your portfolio, scripts, and collaborator access. This cannot be undone.",h.textContent="warning",m.className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center",g.className="flex-1 h-10 px-4 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700",g.textContent="Delete Forever"),p?.classList.remove("hidden")}document.getElementById("btn-trigger-signout")?.addEventListener("click",()=>N("signout")),document.getElementById("btn-trigger-delete-acc")?.addEventListener("click",()=>N("delete")),y&&(y.onclick=()=>p?.classList.add("hidden")),g&&(g.onclick=async()=>{p?.classList.add("hidden"),w==="signout"?(await $e(),b.setState({currentUser:null}),v("Signed out of Scriptora"),e("/auth")):(await $e(),b.setState({currentUser:null,scripts:[]}),v("Account deleted"),e("/auth"))})}function vs(){const e=b.state.selectedScriptId||"chronicles-of-dust",t=b.state.scripts.find(s=>s.id===e)||b.state.scripts[0]||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",joinCode:"A7K9-XP42"};return`
    ${ee("Profile","Collaborators")}

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
                <span class="font-heading text-sm font-bold text-slate-900 truncate" id="currentProjectTitle">${t.title} (${t.draft||"Draft 4.2"})</span>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span class="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium" id="collab-count-badge">Team Access</span>
              <span class="material-symbols-outlined text-slate-400 text-[20px]" id="projectChevron">expand_more</span>
            </div>
          </button>

          <!-- Project Dropdown Popover -->
          <div class="hidden absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-30 overflow-hidden py-1" id="projectDropdown">
            ${b.state.scripts.map(s=>`
              <button class="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors switch-script-opt" data-id="${s.id}">
                <div class="flex flex-col">
                  <span class="text-xs font-semibold text-slate-900">${s.title}</span>
                  <span class="text-[10px] text-slate-500">${s.format||"Feature"} · ${s.draft||"Draft 1.0"}</span>
                </div>
                ${s.id===t.id?'<span class="material-symbols-outlined text-blue-600 text-[16px]">check</span>':""}
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
                <span id="displayJoinCode" class="font-mono font-bold text-base text-blue-600 tracking-widest mt-0.5">${t.joinCode||"A7K9-XP42"}</span>
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
              Anyone with this join code can request Editor or Viewer access to "${t.title}".
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

    ${te("profile")}
  `}function ys(e){const t=b.state.selectedScriptId||"chronicles-of-dust";let s="A7K9-XP42";async function n(){const k=await wt(t),C=document.getElementById("collaborators-list");if(C){if(k.length===0){C.innerHTML='<div class="p-4 text-center text-xs text-slate-400">No external collaborators yet. Share your join code to invite teammates.</div>';return}C.innerHTML=k.map(T=>`
      <div class="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
        <div class="flex items-center gap-3 min-w-0 pr-2">
          <div class="w-9 h-9 rounded-full ${T.avatarBg||"bg-blue-100 text-blue-700"} flex items-center justify-center font-bold text-xs shrink-0">
            ${T.initials}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-slate-900 truncate">${T.name}</span>
            <span class="text-[11px] text-slate-500 truncate">${T.email}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">${T.role}</span>
          <button class="remove-collab-btn text-slate-400 hover:text-red-600 p-1" data-id="${T.id}" title="Remove access">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".remove-collab-btn").forEach(T=>{T.onclick=async()=>{const se=T.getAttribute("data-id");confirm("Remove collaborator access for this user?")&&(await It(t,se),v("Collaborator access removed"),n())}})}}n();const a=document.getElementById("projectSelectBtn"),l=document.getElementById("projectDropdown");a&&(a.onclick=()=>l?.classList.toggle("hidden")),document.querySelectorAll(".switch-script-opt").forEach(k=>{k.onclick=()=>{const C=k.getAttribute("data-id");b.selectScript(C),l?.classList.add("hidden"),e("/profile/collaborators")}});const i=document.getElementById("openInviteBtn"),o=document.getElementById("closeInviteBtn"),c=document.getElementById("inviteCard"),d=document.getElementById("sendInviteBtn");i&&(i.onclick=()=>c?.classList.remove("hidden")),o&&(o.onclick=()=>c?.classList.add("hidden")),d&&(d.onclick=async()=>{const k=document.getElementById("inviteEmailInput")?.value.trim(),C=document.querySelector('input[name="inviteRole"]:checked')?.value||"editor";k&&(await St(t,{email:k,role:C}),v(`Invited ${k} as ${C}`),c?.classList.add("hidden"),n())});const r=document.getElementById("tabGenCodeBtn"),p=document.getElementById("tabEnterCodeBtn"),u=document.getElementById("paneGenerateCode"),f=document.getElementById("paneEnterCode");r&&(r.onclick=()=>{r.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",p.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",u?.classList.remove("hidden"),f?.classList.add("hidden")}),p&&(p.onclick=()=>{p.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",r.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",f?.classList.remove("hidden"),u?.classList.add("hidden")});const h=document.getElementById("copyJoinCodeBtn"),m=document.getElementById("copyJoinCodeLabel");h&&(h.onclick=()=>{const k=document.getElementById("displayJoinCode")?.textContent||s;navigator.clipboard?.writeText(k),m.textContent="Copied!",setTimeout(()=>{m.textContent="Copy"},1800),v(`Copied code: ${k}`)});const g=document.getElementById("regenJoinCodeBtn");g&&(g.onclick=async()=>{const k=await kt(t);s=k;const C=document.getElementById("displayJoinCode");C&&(C.textContent=k),v(`Generated new join code: ${k}`)});const y=document.getElementById("verifyCodeBtn"),w=document.getElementById("joinCodeInput"),N=document.getElementById("joinCodeResultCard"),S=document.getElementById("confirmJoinScriptBtn");w&&(w.oninput=k=>{let C=k.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"");C.length>4&&(C=C.slice(0,4)+"-"+C.slice(4,8)),k.target.value=C}),y&&w&&(y.onclick=async()=>{const k=w.value.trim();if(!k)return;y.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>';const C=await Et(k);y.innerHTML="<span>Verify</span>",C.valid?(N?.classList.remove("hidden"),document.getElementById("verifiedScriptTitle").textContent=C.script.title,document.getElementById("verifiedScriptFormat").textContent=`${C.script.format} · ${C.script.pages} pages`,v("Valid join code")):(N?.classList.add("hidden"),v("Invalid or expired join code","error"))}),S&&w&&(S.onclick=async()=>{const k=w.value.trim();await Ct(k),v("Successfully joined screenplay workspace!"),e("/workspace")})}function ws(){const e=b.state.currentUser?.initials||"JD";return`
    <div class="flex flex-col min-h-screen bg-surface w-full relative">
      <!-- Fixed Header with Back Button and Mark Read Action -->
      <header class="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl border-b border-slate-100 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div class="px-4 py-2.5 flex items-center justify-between max-w-2xl mx-auto">
          <div class="flex items-center gap-2">
            <button aria-label="Go back" id="btn-back-notif" class="w-9 h-9 -ml-1 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors">
              <span class="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div class="flex items-center gap-2">
              <img src="${he}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora" class="w-6 h-6 object-contain shrink-0" />
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
              ${e}
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
  `}function Ss(e){const t=document.getElementById("btn-back-notif");t&&(t.onclick=()=>{const p=b.getPreviousRoute("/workspace");e(p)});let s="all",n="normal",a=[];async function l(){const p=document.getElementById("notif-feed-container");if(!p)return;if(n==="loading"){p.innerHTML=`
        <div class="space-y-3 animate-pulse">
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
        </div>
      `;return}if(n==="error"){p.innerHTML=`
        <div class="p-6 bg-white border border-red-200 rounded-2xl flex flex-col items-center text-center gap-2">
          <span class="material-symbols-outlined text-3xl text-red-500">wifi_off</span>
          <h3 class="font-bold text-sm text-slate-900">Sync Connection Lost</h3>
          <p class="text-xs text-slate-500 max-w-xs">Unable to refresh notification stream. Please check network connection.</p>
          <button id="btn-retry-sync" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-xs hover:bg-blue-700">
            Retry Connection
          </button>
        </div>
      `,document.getElementById("btn-retry-sync")?.addEventListener("click",()=>{n="normal",l()});return}if(a=(await Xe()).notifications||[],n==="empty"||s==="unread"&&a.filter(w=>w.unread).length===0){p.innerHTML=`
        <div class="p-8 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center text-center gap-2">
          <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <h3 class="font-bold text-sm text-slate-900">You’re all caught up!</h3>
          <p class="text-xs text-slate-500 max-w-xs">No pending notifications or requests requiring your review.</p>
        </div>
      `;return}const f=a.filter(w=>w.unread).length;document.getElementById("badge-all-count").textContent=a.length,document.getElementById("badge-unread-count").textContent=f,b.setState({unreadNotifications:f});let h=a;s==="unread"&&(h=h.filter(w=>w.unread));const m=h.filter(w=>w.group==="today"),g=h.filter(w=>w.group!=="today");function y(w,N){return N.length===0?"":`
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-xs font-bold text-slate-400 tracking-wider uppercase font-heading">${w}</h2>
          </div>
          <div class="flex flex-col gap-2">
            ${N.map(S=>`
              <div class="notif-row relative flex items-start gap-3 p-3.5 rounded-xl bg-white border ${S.unread?"border-l-4 border-l-blue-600 border-slate-200/80 shadow-xs":"border-slate-200/60 opacity-80"} hover:shadow-sm transition-all cursor-pointer" data-id="${S.id}" data-route="${S.actionRoute}">
                <div class="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                  ${S.sender.startsWith("icon:")?`<span class="material-symbols-outlined text-[18px] text-blue-600">${S.sender.replace("icon:","")}</span>`:S.sender}
                </div>
                <div class="flex flex-col flex-1 min-w-0">
                  <div class="flex items-baseline justify-between gap-2">
                    <h3 class="text-xs font-bold text-slate-900 truncate">${S.title}</h3>
                    <span class="text-[10px] text-slate-400 shrink-0">${S.time}</span>
                  </div>
                  <p class="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">${S.body}</p>
                  <div class="mt-2 flex items-center gap-1.5 flex-wrap">
                    ${(S.tags||[]).map(k=>`<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">${k}</span>`).join("")}
                    <span class="text-blue-600 text-[11px] font-semibold ml-auto">${S.actionLabel||"View →"}</span>
                  </div>
                </div>
                ${S.unread?'<div class="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1"></div>':""}
              </div>
            `).join("")}
          </div>
        </div>
      `}p.innerHTML=y("Today",m)+y("Earlier",g),document.querySelectorAll(".notif-row").forEach(w=>{w.onclick=async()=>{const N=parseInt(w.getAttribute("data-id")),S=w.getAttribute("data-route");await At(N),await b.refreshNotifications(),S?e(S):l()}})}l();const i=document.getElementById("filter-all-btn"),o=document.getElementById("filter-unread-btn");i&&(i.onclick=()=>{s="all",i.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",o.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",l()}),o&&(o.onclick=()=>{s="unread",o.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",i.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",l()});const c=document.getElementById("btn-mark-all-read");c&&(c.onclick=async()=>{await Bt(),await b.refreshNotifications(),v("All notifications marked as read"),l()});const d=document.getElementById("btn-toggle-sim"),r=document.getElementById("sim-menu-dropdown");d&&(d.onclick=()=>r?.classList.toggle("hidden")),document.querySelectorAll(".sim-opt").forEach(p=>{p.onclick=()=>{n=p.getAttribute("data-state"),r?.classList.add("hidden"),l(),v(`Simulating ${n} state`)}})}class Is{constructor(){this.appEl=null,this.currentPath=null}getBasePath(){return window.location.pathname.toLowerCase().startsWith("/scriptora")?"/Scriptora":""}getCurrentLocation(){return window.location.hash&&window.location.hash.startsWith("#/")?window.location.hash.slice(1):window.location.pathname+window.location.search}init(t="#app"){if(this.appEl=document.querySelector(t),!this.appEl){console.error(`Mount element ${t} not found.`);return}document.body.addEventListener("click",s=>{const n=s.target.closest("a");if(n&&n.href&&n.origin===window.location.origin&&!n.hasAttribute("download")&&n.getAttribute("target")!=="_blank"&&!n.getAttribute("rel")?.includes("external")){const a=new URL(n.href),l=a.pathname+a.search+a.hash;l.startsWith("/api")||(s.preventDefault(),this.navigate(l))}}),window.addEventListener("popstate",s=>{typeof window.__scriptoraEditorPopstate=="function"&&window.__scriptoraEditorPopstate(s)||this.resolve(this.getCurrentLocation())}),window.addEventListener("hashchange",()=>{this.resolve(this.getCurrentLocation())}),this.resolve(this.getCurrentLocation())}navigate(t,s=!1){this.currentPath&&b.pushHistory(this.currentPath);const n=this.getBasePath(),a=n&&t.toLowerCase().startsWith(n.toLowerCase())?t.slice(n.length)||"/":t,l=n&&!t.startsWith(n)?`${n}${a.startsWith("/")?"":"/"}${a}`:t;s?window.history.replaceState(null,"",l):window.history.pushState(null,"",l),this.resolve(a)}resolve(t){const[s,n]=t.split("?");let a=s.replace(/\/+$/,"")||"/";const l=this.getBasePath();l&&a.toLowerCase().startsWith(l.toLowerCase())&&(a=a.slice(l.length)||"/"),a.startsWith("/")||(a="/"+a);const i=new URLSearchParams(n||"");this.currentPath=t;const o=!!b.state.currentUser;if(!o&&!["/welcome","/auth"].includes(a)){this.navigate("/auth",!0);return}if(o&&a==="/auth"){this.navigate("/workspace",!0);return}if(a==="/"){o?this.navigate("/workspace",!0):this.navigate("/welcome",!0);return}if(a==="/welcome"){this.render(Dt(),()=>Ot(this.navigate.bind(this)));return}if(a==="/auth"){this.render(Lt(),()=>Mt(this.navigate.bind(this)));return}if(a==="/workspace"){this.render(Rt(),()=>_t(this.navigate.bind(this)));return}if(a==="/editor"){const d=b.state.selectedScriptId||"chronicles-of-dust",r=i.get("scene");this.navigate(`/editor/${d}${r?`?scene=${r}`:""}`,!0);return}if(a.startsWith("/editor/")){const d=a.split("/")[2],r=i.get("scene");b.setState({selectedScriptId:d}),this.render(Ft(d,r),()=>qt(d,this.navigate.bind(this)));return}if(a==="/intelligence"||a==="/intelligence/select"){this.render(is(),()=>os(this.navigate.bind(this)));return}if(a==="/intelligence/context"){this.render(rs(),()=>cs(this.navigate.bind(this)));return}if(a==="/intelligence/dashboard"||a==="/intelligence/overview"){this.render(ds(),()=>ps(this.navigate.bind(this)));return}if(a==="/intelligence/analysis"||a==="/intelligence/analysis/select"){this.render(us(),()=>xs(this.navigate.bind(this)));return}if(a.startsWith("/intelligence/analysis/")){const d=a.split("/")[3]||"pacing",r=i.get("from"),p=i.get("scriptId");this.render(ms(d,r,p),()=>bs(d,this.navigate.bind(this),r,p));return}if(a==="/profile"){this.render(gs(),()=>hs(this.navigate.bind(this)));return}if(a==="/profile/collaborators"){this.render(vs(),()=>ys(this.navigate.bind(this)));return}if(a==="/notifications"){this.render(ws(),()=>Ss(this.navigate.bind(this)));return}this.renderNotFound(a)}render(t,s){if(this.appEl&&(this.appEl.innerHTML=t,window.scrollTo({top:0,behavior:"instant"}),typeof s=="function"))try{s()}catch(n){console.error("Error attaching screen events:",n)}}renderNotFound(t){this.appEl.innerHTML=`
      <div class="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-surface">
        <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <span class="material-symbols-outlined text-[32px]">sentiment_dissatisfied</span>
        </div>
        <h1 class="font-heading font-bold text-xl text-slate-900 mb-1">Page Not Found</h1>
        <p class="text-xs text-slate-500 mb-6 max-w-xs">The route <code class="font-mono bg-slate-100 px-1 py-0.5 rounded text-blue-600">${t}</code> does not exist.</p>
        <button id="notfound-home" class="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-xs shadow-xs hover:bg-blue-700 transition-colors">
          Return to Workspace
        </button>
      </div>
    `;const s=document.getElementById("notfound-home");s&&(s.onclick=()=>this.navigate("/workspace"))}}const ks=new Is;async function ze(){try{await b.init(),ks.init("#app"),window.addEventListener("online",()=>{v("Back online. Synchronizing changes..."),b.refreshScripts(),b.refreshNotifications()}),window.addEventListener("offline",()=>{v("Offline mode active. Edits saved locally.","info")}),console.log("Scriptora initialized successfully in production-ready mode.")}catch(e){console.error("Scriptora bootstrap failed:",e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ze):ze();
