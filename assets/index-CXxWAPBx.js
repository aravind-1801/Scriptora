(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(a){if(a.ep)return;a.ep=!0;const l=n(a);fetch(a.href,l)}})();const _e="http://localhost:8000/api";async function k(t,e={}){const n=`${_e}${t}`,s={headers:{"Content-Type":"application/json",...e.headers},...e};try{const a=await fetch(n,s);if(!a.ok){const l=await a.json().catch(()=>({}));throw new Error(l.error||`HTTP error ${a.status}`)}return await a.json()}catch(a){throw console.warn(`API call ${t} failed, falling back to local store:`,a.message),a}}const ae=[{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",industry:"International / Hollywood",pages:96,updated:"12m ago",currentScene:"Scene 18",isCurrentDraft:!0,archived:!1,joinCode:"A7K9-XP42",logline:"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.",synopsis:"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves.",context:{format:"Feature",industry:"International / Hollywood",hours:1,minutes:36,seconds:0,plannedDuration:"01:36:00"},analysisScores:{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80}},{id:"the-neon-horizon",title:"The Neon Horizon",draft:"Draft 2.1",genre:"Sci-Fi",format:"Pilot",industry:"Streaming Television",pages:62,updated:"2h ago",currentScene:"Scene 4",isCurrentDraft:!1,archived:!1,joinCode:"N3ON-H0RZ",context:{format:"Pilot",industry:"Streaming Television",hours:0,minutes:52,seconds:0,plannedDuration:"00:52:00"},analysisScores:{overall:79,pacing:75,dialogue:84,emotion:80,characterArc:78,continuity:82,storyStructure:76,theme:88,cinema:83,formatting:90,production:72}},{id:"velvet-shadows",title:"Velvet Shadows",draft:"Draft 1.0",genre:"Noir",format:"Feature",industry:"Independent / Festival",pages:114,updated:"Yesterday",currentScene:"Scene 1",isCurrentDraft:!1,archived:!1,joinCode:"V3LV-SHDW",analysisScores:{overall:81,pacing:80,dialogue:86,emotion:79,characterArc:85,continuity:80,storyStructure:82,theme:84,cinema:88,formatting:92,production:76}},{id:"silent-echoes",title:"Silent Echoes",draft:"Draft 3.0",genre:"Psychological Thriller",format:"Feature",industry:"International / Hollywood",pages:104,updated:"3d ago",currentScene:"Scene 22",isCurrentDraft:!1,archived:!1,joinCode:"SLNT-ECH0",analysisScores:{overall:84,pacing:86,dialogue:81,emotion:88,characterArc:83,continuity:85,storyStructure:89,theme:82,cinema:84,formatting:91,production:78}},{id:"glass-kingdoms",title:"Glass Kingdoms",draft:"Draft 1.4",genre:"Fantasy",format:"Pilot",industry:"Streaming Television",pages:58,updated:"1w ago",currentScene:"Scene 8",isCurrentDraft:!1,archived:!1,joinCode:"GLSS-KNGD",analysisScores:{overall:78,pacing:74,dialogue:80,emotion:76,characterArc:82,continuity:75,storyStructure:80,theme:86,cinema:82,formatting:88,production:70}},{id:"red-shift",title:"Red Shift",draft:"Draft 2.0",genre:"Action",format:"Short",industry:"Independent / Festival",pages:28,updated:"2w ago",currentScene:"Scene 5",isCurrentDraft:!1,archived:!1,joinCode:"RED2-SHFT",analysisScores:{overall:83,pacing:90,dialogue:78,emotion:75,characterArc:80,continuity:88,storyStructure:84,theme:80,cinema:89,formatting:95,production:82}}];async function $e(){try{return(await k("/auth/me")).user}catch{const t=localStorage.getItem("scriptora_user");if(t)try{const n=JSON.parse(t);if(n&&n.displayName)return n}catch{}const e={id:"user-1",name:"Arun Kumar",displayName:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(e)),e}}async function ke(t){try{const e=await k("/auth/login",{method:"POST",body:JSON.stringify(t)});return localStorage.setItem("scriptora_user",JSON.stringify(e.user)),e.user}catch{const e={id:"user-1",name:t.email?t.email.split("@")[0]:"Arun Kumar",displayName:t.email?t.email.split("@")[0]:"Arun Kumar",email:t.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Narrative Director",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(e)),e}}async function Fe(t){try{const e=await k("/auth/register",{method:"POST",body:JSON.stringify(t)});return localStorage.setItem("scriptora_user",JSON.stringify(e.user)),e.user}catch{const e={id:`user-${Date.now()}`,name:t.name||"New Writer",displayName:t.name||"New Writer",email:t.email||"writer@scriptora.studio",headline:"Screenwriter",badge:"Member Pro",initials:(t.name||"NW").slice(0,2).toUpperCase(),stats:{drafts:1,coAuthors:0,healthIndex:"100%"}};return localStorage.setItem("scriptora_user",JSON.stringify(e)),e}}async function Ue(t){try{const e=await k("/auth/otp",{method:"POST",body:JSON.stringify({phone:t})});return localStorage.setItem("scriptora_user",JSON.stringify(e.user)),e.user}catch{const e={id:"user-phone",name:"Verified Writer",displayName:"Verified Writer",headline:"Screenwriter",email:t,badge:"Member Pro",initials:"VW",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(e)),e}}async function de(){try{await k("/auth/logout",{method:"POST"})}catch{}return localStorage.removeItem("scriptora_user"),!0}async function $(t=""){try{const s=t?`/scripts?q=${encodeURIComponent(t)}`:"/scripts",a=await k(s);if(a.scripts&&a.scripts.length>0)return localStorage.setItem("scriptora_scripts",JSON.stringify(a.scripts)),a.scripts}catch{}const e=localStorage.getItem("scriptora_scripts");let n;if(e)try{n=JSON.parse(e),(!Array.isArray(n)||n.length===0)&&(n=[...ae],localStorage.setItem("scriptora_scripts",JSON.stringify(n)))}catch{n=[...ae],localStorage.setItem("scriptora_scripts",JSON.stringify(n))}else n=[...ae],localStorage.setItem("scriptora_scripts",JSON.stringify(n));return t&&(n=n.filter(s=>s.title.toLowerCase().includes(t.toLowerCase()))),n}async function xe(t){try{const n=await k(`/scripts/${t}`);if(n.script)return n.script}catch{}const e=await $();return e.find(n=>n.id===t)||ae.find(n=>n.id===t)||e[0]||null}async function He(t){try{const a=await k("/scripts",{method:"POST",body:JSON.stringify(t)});if(a.script){const l=await $();return localStorage.setItem("scriptora_scripts",JSON.stringify([a.script,...l.filter(o=>o.id!==a.script.id)])),a.script}}catch{}const e={id:(t.title||"untitled").toLowerCase().replace(/[^a-z0-9]+/g,"-"),title:t.title||"Untitled Screenplay",draft:"Draft 1.0",genre:t.genre||"Drama",format:t.format||"Feature",industry:t.industry||"International / Hollywood",pages:1,updated:"Just now",currentScene:"Scene 1",joinCode:"SCRP-1001",archived:!1,context:{format:t.format||"Feature",industry:t.industry||"International / Hollywood",hours:1,minutes:30,seconds:0,plannedDuration:"01:30:00"},analysisScores:{overall:80,pacing:78,dialogue:80,emotion:80,characterArc:78,continuity:80,storyStructure:80,theme:80,cinema:80,formatting:90,production:75}},n=await $(),s=[e,...n.filter(a=>a.id!==e.id)];return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),e}async function Ve(t,e){try{const a=await k(`/scripts/${t}`,{method:"PUT",body:JSON.stringify(e)});if(a.script){const o=(await $()).map(i=>i.id===t?a.script:i);return localStorage.setItem("scriptora_scripts",JSON.stringify(o)),a.script}}catch{}const s=(await $()).map(a=>a.id===t?{...a,...e,updated:"Just now"}:a);return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),{id:t,...e,updated:"Just now"}}async function qe(t){try{await k(`/scripts/${t}`,{method:"DELETE"})}catch{}const n=(await $()).filter(s=>s.id!==t);return localStorage.setItem("scriptora_scripts",JSON.stringify(n)),{success:!0}}async function Ge(t){try{const l=await k(`/scripts/${t}/duplicate`,{method:"POST"});if(l.script){const o=await $();return localStorage.setItem("scriptora_scripts",JSON.stringify([l.script,...o])),l.script}}catch{}const e=await xe(t),n={...e,id:`${t}-copy-${Date.now().toString().slice(-4)}`,title:`${e?.title||"Script"} (Copy)`,updated:"Just now"},s=await $(),a=[n,...s];return localStorage.setItem("scriptora_scripts",JSON.stringify(a)),n}async function Je(t){try{await k(`/scripts/${t}/archive`,{method:"POST"})}catch{}const n=(await $()).map(s=>s.id===t?{...s,archived:!0,updated:"Just now"}:s);return localStorage.setItem("scriptora_scripts",JSON.stringify(n)),{success:!0}}const We={id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pageCount:5,wordCount:14280,titlePage:{title:"CHRONICLES OF DUST",author:"Arun Kumar",contact:"Scriptora Studio · arun.kumar@scriptora.studio · +1 (555) 019-2834",notes:"An original screenplay. Draft 4.2 Production Cut."},settings:{sceneNumbers:!0,sceneNumberSide:"left",smartFormatting:!0,fontSize:"12pt",lineSpacing:"1.5",language:"English"},acts:[{id:"act-1",name:"ACT I - The Broken Siphon"},{id:"act-2",name:"ACT II - The Pressure Surge"},{id:"act-3",name:"ACT III - The Floodgate Standoff"}],characters:["KEVIN","MEERA","VANCE","ELENA","ARAVIND","CHIEF CHEN"],locations:["DESERT BADLANDS","BORDER OUTPOST RESERVOIR","PUMP STATION SUB-LEVEL","CUSTOMS OFFICE","FLOODGATE GANTRY","CONTROL TOWER","SPILLWAY DRAINAGE BASIN","KPR INSTITUTE"],times:["DAY","NIGHT","CONTINUOUS","DAWN","DUSK","LATER","MORNING","EVENING"],transitions:["CUT TO:","FADE IN:","FADE OUT.","DISSOLVE TO:","SMASH CUT TO:","MATCH CUT TO:","JUMP CUT TO:"],scenes:[{id:"scene-1",number:1,actId:"act-1",slugline:"EXT. DESERT BADLANDS - DAY",blocks:[{id:"b-1-1",type:"scene",content:"EXT. DESERT BADLANDS - DAY"},{id:"b-1-2",type:"action",content:"Sun-baked salt flats stretch to the horizon. Heat waves ripple across an elevated steel aqueduct, shimmering in the fierce midday glare."},{id:"b-1-3",type:"action",content:"Kevin adjusts his respirator mask as a handheld pressure gauge rattles violently against his knuckles. The needle drops below redline."},{id:"b-1-4",type:"character",content:"KEVIN"},{id:"b-1-5",type:"parenthetical",content:"(checking telemetry)"},{id:"b-1-6",type:"dialogue",content:"Line twelve lost forty bars in twenty minutes. That's not evaporation. Someone drilled the municipal siphon."},{id:"b-1-7",type:"transition",content:"CUT TO:"}]},{id:"scene-2",number:2,actId:"act-1",slugline:"EXT. BORDER OUTPOST RESERVOIR - CONTINUOUS",blocks:[{id:"b-2-1",type:"scene",content:"EXT. BORDER OUTPOST RESERVOIR - CONTINUOUS"},{id:"b-2-2",type:"action",content:"Massive concrete retaining walls loom over a dry river canyon. Armed private contractors patrol the chain-link perimeter."},{id:"b-2-3",type:"character",content:"VANCE"},{id:"b-2-4",type:"dialogue",content:"If the hydro-engineer approaches the terminal perimeter, lock down the intake gates immediately."},{id:"b-2-5",type:"character",content:"ELENA"},{id:"b-2-6",type:"parenthetical",content:"(stepping forward)"},{id:"b-2-7",type:"dialogue",content:"He designed the regional routing matrix, Vance. You can't just seal the gates without triggering the emergency backflow."},{id:"b-2-8",type:"transition",content:"DISSOLVE TO:"}]},{id:"scene-17",number:17,actId:"act-2",slugline:"INT. PUMP STATION SUB-LEVEL - DUSK",blocks:[{id:"b-17-1",type:"scene",content:"INT. PUMP STATION SUB-LEVEL - DUSK"},{id:"b-17-2",type:"action",content:"Emergency warning beacons pulse rhythmic amber pulses against wet concrete. Water surges through rusty catwalk grates."},{id:"b-17-3",type:"character",content:"MEERA"},{id:"b-17-4",type:"parenthetical",content:"(over crackling radio)"},{id:"b-17-5",type:"dialogue",content:"Kevin, the bypass manifold is wide open. They're siphoning thirty thousand liters a minute straight into the corporate silos."},{id:"b-17-6",type:"character",content:"KEVIN"},{id:"b-17-7",type:"dialogue",content:"Head up to the customs outpost. I'll tap the telemetry relay from the junction box before they cut the grid."},{id:"b-17-8",type:"transition",content:"CUT TO:"}]},{id:"scene-18",number:18,actId:"act-2",slugline:"INT. CUSTOMS OFFICE - NIGHT",blocks:[{id:"b-18-1",type:"scene",content:"INT. CUSTOMS OFFICE - NIGHT"},{id:"b-18-2",type:"action",content:"Kevin kneels over the cracked hydro-sensor junction box. Static hiss whispers through the damp comm-link. A lone flicker illuminates the tarnished brass seal."},{id:"b-18-3",type:"action",content:"Water droplets bead along the corroded circuit wires. He slides a copper probe between the connectors."},{id:"b-18-4",type:"character",content:"KEVIN"},{id:"b-18-5",type:"parenthetical",content:"(whispering into comm)"},{id:"b-18-6",type:"dialogue",content:"If the seals break before dawn, the sector won't hold the surge."},{id:"b-18-7",type:"character",content:"MEERA (O.S.)"},{id:"b-18-8",type:"dialogue",content:"Then don't let them break. Reroute the secondary relay through the floodgate breaker."},{id:"b-18-9",type:"transition",content:"CUT TO:"}]},{id:"scene-19",number:19,actId:"act-3",slugline:"EXT. FLOODGATE GANTRY - CONTINUOUS",blocks:[{id:"b-19-1",type:"scene",content:"EXT. FLOODGATE GANTRY - CONTINUOUS"},{id:"b-19-2",type:"action",content:"Sirens pulse through the red fog. Meera anchors her cable to the iron pylon, visor reflecting the rising floodwaters below."},{id:"b-19-3",type:"character",content:"MEERA"},{id:"b-19-4",type:"dialogue",content:"Pressure holding at four-eighty. Give me three minutes."},{id:"b-19-5",type:"action",content:"A massive metallic groan reverberates across the gorge as the emergency intake opens."},{id:"b-19-6",type:"character",content:"KEVIN"},{id:"b-19-7",type:"dialogue",content:"The intake is clear! Open the main channel before the valves freeze!"},{id:"b-19-8",type:"transition",content:"FADE OUT."}]}]};async function Ke(t){try{const s=await k(`/screenplay/${t}`);if(s.screenplay&&s.screenplay.scenes&&s.screenplay.scenes.length>0)return s.screenplay}catch{}const e=localStorage.getItem(`scriptora_screenplay_${t}`);if(e)try{const s=JSON.parse(e);if(s&&s.scenes&&s.scenes.length>0)return s}catch{}const n=JSON.parse(JSON.stringify(We));if(t&&t!=="chronicles-of-dust"){n.id=t;const s=await xe(t);s&&(n.title=s.title,n.draft=s.draft,n.titlePage.title=s.title.toUpperCase())}return localStorage.setItem(`scriptora_screenplay_${t}`,JSON.stringify(n)),n}async function ze(t,e){localStorage.setItem(`scriptora_screenplay_${t}`,JSON.stringify(e));try{return await k(`/screenplay/${t}`,{method:"PUT",body:JSON.stringify({screenplay:e})})}catch{return{success:!0}}}async function Xe(t){try{return(await k(`/versions/${t}`)).versions}catch{return[{id:"v-4.2",name:"Draft 4.2",tag:"Current Active",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:"Refined Meera O.S. dialogue and hydro-sensor action line.",isCurrent:!0},{id:"v-3.0",name:"Draft 3.0",tag:"Production Polish",timestamp:"Yesterday, 4:15 PM",author:"JD",stats:"94 pages · 13,950 words",notes:"Incorporated director notes on floodgate transition pacing.",isCurrent:!1},{id:"v-2.0",name:"Draft 2.0",tag:"First Table Read",timestamp:"Oct 12, 2024",author:"JD",stats:"90 pages · 13,200 words",notes:"Table read revision for Acts I & II character arcs.",isCurrent:!1}]}}async function Ye(t,e){try{return(await k(`/versions/${t}`,{method:"POST",body:JSON.stringify(e)})).version}catch{return{id:`v-${Date.now()}`,name:e.name,tag:"Milestone Snapshot",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:e.notes||"",isCurrent:!0}}}async function Qe(t){try{return(await k(`/collaborators/${t}`)).collaborators}catch{return[{id:"c-1",name:"Heamanth S.",email:"heamanth@studio.com",initials:"HS",role:"Editor",avatarBg:"bg-blue-100 text-blue-700",status:"Active",added:"2d ago"},{id:"c-2",name:"Elena Rostova",email:"elena@cineworks.io",initials:"ER",role:"Script Doctor",avatarBg:"bg-amber-100 text-amber-700",status:"Active",added:"1w ago"},{id:"c-3",name:"Marcus Vance",email:"vance.prod@paramount.com",initials:"MV",role:"Producer",avatarBg:"bg-purple-100 text-purple-700",status:"Viewer",added:"2w ago"}]}}async function Ze(t,e){try{return(await k(`/collaborators/${t}/invite`,{method:"POST",body:JSON.stringify(e)})).collaborator}catch{return{id:`c-${Date.now()}`,name:e.email.split("@")[0],email:e.email,initials:e.email.substring(0,2).toUpperCase(),role:e.role==="editor"?"Editor":"Viewer",avatarBg:"bg-emerald-100 text-emerald-700",status:"Active",added:"Just now"}}}async function et(t,e){try{return await k(`/collaborators/${t}/${e}`,{method:"DELETE"})}catch{return{success:!0}}}async function tt(t){try{return(await k("/join-code/generate",{method:"POST",body:JSON.stringify({scriptId:t})})).joinCode}catch{return Math.random().toString(36).substring(2,6).toUpperCase()+"-"+Math.random().toString(36).substring(2,6).toUpperCase()}}async function st(t){try{return await k("/join-code/validate",{method:"POST",body:JSON.stringify({code:t})})}catch{return(t||"").toUpperCase().trim()==="A7K9-XP42"?{valid:!0,script:{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",pages:96,collaboratorCount:3}}:{valid:!1,error:"Invalid or expired join code"}}}async function nt(t){try{return await k("/join-code/redeem",{method:"POST",body:JSON.stringify({code:t})})}catch{return{success:!0,scriptId:"chronicles-of-dust",title:"Chronicles of Dust"}}}async function Le(){try{return await k("/notifications")}catch{return{notifications:[{id:1,sender:"HS",senderName:"Heamanth",type:"collaboration_invite",title:"Heamanth invited you to collaborate",body:'Added you as an Editor on "Chronicles of Dust" (Draft 4.2).',time:"12m ago",group:"today",unread:!0,tags:["Draft 4.2","Role: Editor"],actionLabel:"Review Access →",actionRoute:"/profile/collaborators"},{id:2,sender:"icon:description",type:"export_ready",title:"Your export is ready",body:'"Chronicles of Dust (Draft 4.2)" exported as standard Industry PDF.',time:"45m ago",group:"today",unread:!0,tags:["PDF","96 Pages"],actionLabel:"Open Screenplay →",actionRoute:"/editor/chronicles-of-dust"},{id:3,sender:"AK",senderName:"Arun K.",type:"join_code_request",title:"Join-code access request",body:'Requested Editor access to "Anbin Mozhi" via join-code A7K9-XP42.',time:"2h ago",group:"today",unread:!0,tags:["Code: A7K9-XP42"],actionLabel:"Manage Collaborators →",actionRoute:"/profile/collaborators"}],unreadCount:3}}}async function at(t){try{return await k(`/notifications/${t}/read`,{method:"POST"})}catch{return{success:!0}}}async function lt(){try{return await k("/notifications/read-all",{method:"POST"})}catch{return{success:!0}}}async function Ae(){return(await Le()).unreadCount||0}async function it(t){try{const e=await k("/profile",{method:"PUT",body:JSON.stringify(t)});return localStorage.setItem("scriptora_user",JSON.stringify(e.profile)),e.profile}catch{const n={...await $e()||{},...t};return localStorage.setItem("scriptora_user",JSON.stringify(n)),n}}async function ot(){try{return(await k("/settings")).settings}catch{const t=localStorage.getItem("scriptora_settings");return t?JSON.parse(t):{editor:{autoSceneHeading:!0,autoCharacter:!0,autoTransition:!0,enterAfterAction:!0,tabAfterAction:!0,autoCapitalize:!0,continueDialogue:!0,showSceneNumbers:!0,lockSceneNumbers:!1,fontSize:"Courier Prime 12pt",lineSpacing:"1.5 line",focusMode:!1},language:"English (US)",appearance:"Light",notifications:{collaborationInvites:!0,collaborationEdits:!0,mentions:!0,versionMilestones:!0},intelligence:{querySuggestions:!0,analysisSuggestions:!0}}}}async function rt(t,e){try{return(await k(`/intelligence/${t}/context`,{method:"PUT",body:JSON.stringify(e)})).context}catch{return e}}async function Me(t,e){try{return(await k("/intelligence/query",{method:"POST",body:JSON.stringify({query:t,scriptId:e})})).answer}catch{return"Analysis: In this screenplay, scene tempo and dialogue density align with core narrative milestones. Characters express distinct agendas in each beat."}}class ct{constructor(){this.state={currentUser:null,selectedScriptId:localStorage.getItem("scriptora_selected_script")||"chronicles-of-dust",selectedVersionId:"Draft 4.2",currentSceneId:18,unreadNotifications:3,scripts:[],activeScript:null,screenplay:null,settings:null,historyStack:[]},this.listeners=new Set}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){for(const e of this.listeners)try{e(this.state)}catch(n){console.error("Store listener error:",n)}}setState(e){this.state={...this.state,...e},e.selectedScriptId&&localStorage.setItem("scriptora_selected_script",e.selectedScriptId),this.notify()}pushHistory(e){this.state.historyStack[this.state.historyStack.length-1]!==e&&this.state.historyStack.push(e)}getPreviousRoute(e="/workspace"){return this.state.historyStack.length>1?(this.state.historyStack.pop(),this.state.historyStack.pop()):e}async init(){try{const e=await $e(),n=await $(),s=await Ae(),a=await ot(),l=n.find(o=>o.id===this.state.selectedScriptId)||n[0];this.setState({currentUser:e,scripts:n,activeScript:l,unreadNotifications:s,settings:a})}catch(e){console.error("Init store error:",e)}}async selectScript(e){const n=this.state.scripts.find(s=>s.id===e)||await xe(e);this.setState({selectedScriptId:e,activeScript:n})}async refreshNotifications(){const e=await Ae();this.setState({unreadNotifications:e})}async refreshScripts(){const e=await $(),n=e.find(s=>s.id===this.state.selectedScriptId)||e[0];this.setState({scripts:e,activeScript:n})}}const d=new ct;function f(t,e="success"){const n=document.getElementById("global-toast"),s=document.getElementById("toast-message"),a=document.getElementById("toast-icon");if(!n||!s){console.log(`[Toast ${e}]`,t);return}s.textContent=t,a&&(e==="error"?(a.textContent="error",a.className="material-symbols-outlined text-[18px] text-red-400"):e==="info"?(a.textContent="info",a.className="material-symbols-outlined text-[18px] text-blue-300"):(a.textContent="check_circle",a.className="material-symbols-outlined text-[18px] text-emerald-300")),n.classList.remove("opacity-0","pointer-events-none"),n.classList.add("opacity-100"),clearTimeout(n._timeout),n._timeout=setTimeout(()=>{n.classList.remove("opacity-100"),n.classList.add("opacity-0","pointer-events-none")},2400)}const dt=""+new URL("logo-BG9jZ7UG.png",import.meta.url).href,ee=dt;function pt(){return`
    <main class="flex flex-col relative w-full pt-safe pb-safe bg-surface min-h-screen justify-center items-center px-4">
      <div class="flex flex-col w-full max-w-sm py-8 fade-in">
        <!-- Brand & Logo Header -->
        <header class="flex flex-col items-center justify-center pb-4 text-center">
          <img src="${ee}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-16 h-16 object-contain mb-3 drop-shadow-sm" />
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
  `}function ut(t){const e=document.getElementById("tab-signin"),n=document.getElementById("tab-register"),s=document.getElementById("tab-otp"),a=document.getElementById("flow-signin"),l=document.getElementById("flow-register"),o=document.getElementById("flow-otp");function i(S){[e,n,s].forEach(y=>{y.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 text-on-surface-variant hover:text-on-surface"}),[a,l,o].forEach(y=>y.classList.add("hidden")),S==="signin"?(e.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",a.classList.remove("hidden")):S==="register"?(n.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",l.classList.remove("hidden")):S==="otp"&&(s.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold flex items-center justify-center gap-1",o.classList.remove("hidden"))}e&&(e.onclick=()=>i("signin")),n&&(n.onclick=()=>i("register")),s&&(s.onclick=()=>i("otp"));const r=document.getElementById("toggle-pw-signin"),c=document.getElementById("signin-password");r&&c&&(r.onclick=()=>{const S=c.type==="password";c.type=S?"text":"password",r.innerHTML=`<span class="material-symbols-outlined text-[18px]">${S?"visibility_off":"visibility"}</span>`});const p=document.getElementById("btn-google-login");p&&(p.onclick=async()=>{f("Connecting with Google...");const S=await ke({email:"arun.kumar@scriptora.studio",provider:"google"});d.setState({currentUser:S}),t("/welcome")});const m=document.getElementById("form-signin");m&&(m.onsubmit=async S=>{S.preventDefault();const y=document.getElementById("signin-email").value,I=c.value;try{const b=await ke({email:y,password:I});d.setState({currentUser:b}),f(`Welcome back, ${b.displayName||b.name}`),t("/welcome")}catch(b){f(b.message,"error")}});const x=document.getElementById("form-register");x&&(x.onsubmit=async S=>{S.preventDefault();const y=document.getElementById("reg-name").value,I=document.getElementById("reg-email").value,b=document.getElementById("reg-password").value;try{const B=await Fe({name:y,email:I,password:b});d.setState({currentUser:B}),f("Account created successfully"),t("/welcome")}catch(B){f(B.message,"error")}});const v=document.getElementById("form-otp");v&&(v.onsubmit=async S=>{S.preventDefault();const y=document.getElementById("otp-phone").value;try{const I=await Ue(y);d.setState({currentUser:I}),f("Phone verified successfully"),t("/welcome")}catch(I){f(I.message,"error")}});const E=document.getElementById("btn-forgot-pw");E&&(E.onclick=()=>{f("Password reset link sent to registered email","info")})}function xt(){return d.state.currentUser,`
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
          <img src="${ee}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-20 h-20 object-contain mb-5 drop-shadow-sm" />

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
  `}function ft(t){const e=document.getElementById("welcome-sign-out");e&&(e.onclick=async()=>{await de(),d.setState({currentUser:null}),f("Signed out successfully"),t("/auth")})}function F(t="Workspace",e="Your writing space."){const n=d.state.unreadNotifications,s=d.state.currentUser?.initials||"JD";return`
    <header class="fixed top-0 w-full z-40 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-surface-container-high/60">
      <div class="h-14 px-4 flex items-center justify-between max-w-2xl mx-auto">
        <a href="/workspace" class="flex items-center gap-2.5 min-w-0 no-underline text-inherit cursor-pointer active:opacity-80 transition-opacity">
          <img src="${ee}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora" class="w-8 h-8 object-contain shrink-0" />
          <div class="flex flex-col min-w-0 leading-tight">
            <span class="font-heading font-bold text-base tracking-tight text-on-surface">Scriptora</span>
            <span class="text-[11px] text-slate-500 font-medium truncate">${t}</span>
          </div>
        </a>

        <div class="flex items-center gap-2">
          <!-- Notification Bell connecting to /notifications -->
          <a href="/notifications" class="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-on-surface hover:bg-slate-100 transition-colors" aria-label="Notifications" id="header-notif-btn">
            <span class="material-symbols-outlined text-[20px]">notifications</span>
            ${n>0?'<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white animate-pulse"></span>':""}
          </a>

          <!-- Profile Avatar connecting to /profile -->
          <a href="/profile" class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs shadow-xs hover:bg-blue-700 active:scale-95 transition-all no-underline" aria-label="User account" id="header-profile-btn">
            <span>${s}</span>
          </a>
        </div>
      </div>
    </header>
  `}function U(t="workspace"){const e=t==="workspace",n=t==="intelligence",s=t==="profile";return`
    <nav class="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container-high/60">
      <div class="h-14 px-6 flex items-center justify-around max-w-2xl mx-auto">
        <!-- 1. Workspace Tab -->
        <a href="/workspace" class="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${e?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-workspace">
          <span class="material-symbols-outlined text-[22px]" ${e?`style="font-variation-settings: 'FILL' 1;"`:""}>description</span>
          <span class="text-[11px] font-medium mt-0.5">Workspace</span>
          ${e?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':""}
        </a>

        <!-- 2. Intelligence Tab -->
        <a href="/intelligence" class="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${n?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-intelligence">
          <span class="material-symbols-outlined text-[22px]" ${n?`style="font-variation-settings: 'FILL' 1;"`:""}>insights</span>
          <span class="text-[11px] font-medium mt-0.5">Intelligence</span>
          ${n?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':""}
        </a>

        <!-- 3. Profile Tab -->
        <a href="/profile" class="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${s?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-profile">
          <span class="material-symbols-outlined text-[22px]" ${s?`style="font-variation-settings: 'FILL' 1;"`:""}>account_circle</span>
          <span class="text-[11px] font-medium mt-0.5">Profile</span>
          ${s?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':""}
        </a>
      </div>
    </nav>
  `}function mt(){const t=d.state.scripts||[],e=t.find(s=>s.isCurrentDraft)||t[0],n=t.slice(0,3);return`
    ${F("Workspace","Your writing space.")}

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
            ${n.map(s=>`
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

    ${U("workspace")}
  `}function bt(t){let e=null;const n=document.getElementById("btn-continue-writing");n&&(n.onclick=()=>{const x=n.getAttribute("data-script-id");d.selectScript(x),t(`/editor/${x}?scene=18`)}),document.querySelectorAll(".script-item-row").forEach(x=>{x.onclick=v=>{if(v.target.closest(".script-more-btn"))return;const E=x.getAttribute("data-script-id");d.selectScript(E),t(`/editor/${E}`)}});const s=document.getElementById("screenplay-search");s&&(s.oninput=x=>{const v=x.target.value.toLowerCase().trim();document.querySelectorAll("#screenplays-library-list .script-item-row").forEach(S=>{const y=S.querySelector(".font-semibold")?.textContent.toLowerCase()||"";S.style.display=y.includes(v)?"flex":"none"})});const a=document.getElementById("btn-new-script"),l=document.getElementById("new-script-modal"),o=document.getElementById("close-new-script-modal"),i=document.getElementById("cancel-new-script-btn"),r=document.getElementById("form-new-script");function c(x){l&&(x?(l.classList.remove("hidden"),l.classList.add("flex"),document.getElementById("new-script-title")?.focus()):(l.classList.add("hidden"),l.classList.remove("flex")))}a&&(a.onclick=()=>c(!0)),o&&(o.onclick=()=>c(!1)),i&&(i.onclick=()=>c(!1)),r&&(r.onsubmit=async x=>{x.preventDefault();const v=document.getElementById("new-script-title").value.trim(),E=document.getElementById("new-script-format").value,S=document.getElementById("new-script-genre").value;if(v)try{const y=await He({title:v,format:E,genre:S});await d.refreshScripts(),d.selectScript(y.id),c(!1),f(`Created "${y.title}"`),t(`/editor/${y.id}`)}catch(y){f(y.message,"error")}});const p=document.getElementById("script-menu-popover");document.querySelectorAll(".script-more-btn").forEach(x=>{x.onclick=v=>{v.stopPropagation(),e=x.getAttribute("data-script-id");const E=x.getBoundingClientRect();p.style.top=`${E.bottom+window.scrollY+4}px`,p.style.left=`${Math.min(E.left-130,window.innerWidth-180)}px`,p.classList.remove("hidden")}}),window.onclick=x=>{!x.target.closest("#script-menu-popover")&&!x.target.closest(".script-more-btn")&&p?.classList.add("hidden")},document.getElementById("menu-opt-open")?.addEventListener("click",()=>{p.classList.add("hidden"),e&&(d.selectScript(e),t(`/editor/${e}`))}),document.getElementById("menu-opt-rename")?.addEventListener("click",async()=>{p.classList.add("hidden");const x=prompt("Enter new title for this screenplay:");x&&x.trim()&&(await Ve(e,{title:x.trim()}),await d.refreshScripts(),f("Screenplay renamed"),t("/workspace"))}),document.getElementById("menu-opt-duplicate")?.addEventListener("click",async()=>{p.classList.add("hidden"),await Ge(e),await d.refreshScripts(),f("Screenplay duplicated"),t("/workspace")}),document.getElementById("menu-opt-archive")?.addEventListener("click",async()=>{p.classList.add("hidden"),await Je(e),await d.refreshScripts(),f("Screenplay archived"),t("/workspace")}),document.getElementById("menu-opt-delete")?.addEventListener("click",async()=>{p.classList.add("hidden"),confirm("Are you sure you want to delete this screenplay? This action cannot be undone.")&&(await qe(e),await d.refreshScripts(),f("Screenplay deleted"),t("/workspace"))});const m=document.getElementById("btn-export-library");m&&(m.onclick=()=>{const x="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(d.state.scripts,null,2)),v=document.createElement("a");v.setAttribute("href",x),v.setAttribute("download",`scriptora_library_${Date.now()}.json`),document.body.appendChild(v),v.click(),v.remove(),f("Exported library manifest (.json)")})}let u=null,pe=null,Te=null,ne=!1,_=!1,O=!0,D=!1,re="EN",P=[],R=-1;function gt(t,e=null){const n=d.state.scripts?.find(a=>a.id===t)||d.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2"},s=d.state.currentUser?.initials||"AK";return`
    <div id="editor-root" class="flex flex-col min-h-screen bg-slate-100 text-slate-900 w-full relative select-text antialiased">
      
      <!-- ========================================================= -->
      <!-- STATIC TOP HEADER (FIXED: Never scrolls with screenplay)  -->
      <!-- ========================================================= -->
      <header id="editor-fixed-header" class="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all">
        
        <!-- ROW 1: TOP APP HEADER (Order: Back, Logo, Title, Save, Collab, Avatar) -->
        <div class="h-12 px-3 flex items-center justify-between max-w-5xl mx-auto">
          <div class="flex items-center gap-2 min-w-0">
            <!-- Back to Workspace button -->
            <button aria-label="Back to Workspace" id="editor-back-btn" class="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 active:scale-95 transition-all">
              <span class="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            
            <!-- Logo & Script Title -->
            <div class="flex items-center gap-2 select-none min-w-0">
              <img src="${ee}" onerror="this.onerror=null; this.src='./assets/logo-BG9jZ7UG.png';" alt="Scriptora" class="w-7 h-7 object-contain shrink-0" />
              <div class="flex flex-col min-w-0 leading-tight">
                <span class="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate" id="editor-script-title">${n.title}</span>
                <span class="text-[10px] text-slate-500 truncate" id="editor-save-status">Saved</span>
              </div>
            </div>
          </div>

          <!-- Right Controls: SAVE MUST APPEAR BEFORE COLLABORATE -->
          <div class="flex items-center gap-1.5 shrink-0">
            <!-- Save Button with State Machine -->
            <button id="editor-save-btn" class="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs active:scale-95 transition-all" title="Save changes (Ctrl+S / Cmd+S)">
              <span class="material-symbols-outlined text-[15px]" id="editor-save-icon">cloud_done</span>
              <span id="editor-save-text">Save</span>
            </button>

            <!-- Collaborate Link -->
            <a href="/profile/collaborators" id="editor-collab-btn" aria-label="Collaborators" class="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors no-underline" title="Collaborators">
              <span class="material-symbols-outlined text-[19px]">group</span>
            </a>

            <!-- User Avatar -->
            <a href="/profile" aria-label="User profile" class="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center shadow-xs no-underline">
              ${s}
            </a>
          </div>
        </div>

        <!-- ROW 2: HORIZONTAL EDITOR TOOLBAR ([ ⋮ ] MUST appear BEFORE Production) -->
        <div id="editor-toolbar-strip" class="w-full bg-slate-50/90 border-t border-slate-200/80 px-3 py-1 flex items-center gap-2 overflow-x-auto scrollbar-none text-nowrap max-w-5xl mx-auto transition-all">
          
          <!-- [ ⋮ ] Three-Dot Menu (FIRST item as required by Section F) -->
          <button id="editor-more-menu-btn" class="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 active:scale-95 transition-all shrink-0 shadow-2xs" title="More Tools (Title Page, Preferences, Find/Replace)">
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

          <!-- Scene #s Toggle -->
          <button id="sceneNumberToggle" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-caption text-xs font-semibold border border-blue-200/80 active:scale-95 transition-all shrink-0">
            <span class="material-symbols-outlined text-[15px]">pin</span>
            <span id="sceneNumberToggleText">Scene #s: On</span>
          </button>

          <!-- Title Page -->
          <button id="btn-quick-title-page" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all shrink-0">
            <span class="material-symbols-outlined text-[15px] text-slate-600">description</span>
            <span>Title Page</span>
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

          <!-- Versions -->
          <button id="versionsModalBtn" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all shrink-0">
            <span class="material-symbols-outlined text-[14px] text-blue-600">history</span>
            <span id="currentVersionTag">${n.draft||"Draft 4.2"}</span>
          </button>
        </div>

        <!-- ROW 3: ACCESSORY & ELEMENT BAR (Navigation & Line Type Conversions) -->
        <div id="editor-accessory-tray" class="w-full bg-white border-b border-slate-200 px-3 py-1.5 flex flex-col gap-1.5 shadow-xs max-w-5xl mx-auto transition-all">
          
          <!-- Navigation Selector Row (Act / Scene / Character - Data-driven) -->
          <div class="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none py-0.5">
            <div class="flex items-center gap-1.5 shrink-0">
              <!-- Act Jump -->
              <div class="relative">
                <select id="navActSelect" class="h-7 pl-2 pr-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-semibold appearance-none cursor-pointer focus:outline-none">
                  <option value="">ACT...</option>
                </select>
                <span class="material-symbols-outlined text-[13px] text-slate-500 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
              </div>

              <!-- Scene Jump -->
              <div class="relative">
                <select id="navSceneSelect" class="h-7 pl-2 pr-6 rounded-lg bg-blue-600 text-white text-[11px] font-semibold appearance-none cursor-pointer focus:outline-none shadow-xs">
                  <option value="">SCENE...</option>
                </select>
                <span class="material-symbols-outlined text-[13px] text-white absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
              </div>

              <!-- Character Jump -->
              <div class="relative">
                <select id="navCharSelect" class="h-7 pl-2 pr-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-semibold appearance-none cursor-pointer focus:outline-none">
                  <option value="">CHARACTER...</option>
                </select>
                <span class="material-symbols-outlined text-[13px] text-slate-500 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
              </div>
            </div>

            <!-- Undo / Redo & Insert INT/EXT -->
            <div class="flex items-center gap-1 shrink-0">
              <button id="btn-undo" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all" title="Undo (Ctrl+Z)">
                <span class="material-symbols-outlined text-[16px]">undo</span>
              </button>
              <button id="btn-redo" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all" title="Redo (Ctrl+Y)">
                <span class="material-symbols-outlined text-[16px]">redo</span>
              </button>
              <button id="btn-insert-intext" class="px-2 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 text-[11px] font-bold active:scale-95 transition-all" title="Insert INT/EXT">
                INT/EXT
              </button>
            </div>
          </div>

          <!-- Line Element Bar: ACT, SCENE, CHARACTER, DIALOGUE, PARENTHETICAL, TRANSITION -->
          <div class="flex items-center justify-between gap-1 overflow-x-auto scrollbar-none py-0.5" id="element-bar">
            <button class="element-btn flex-1 min-w-[50px] py-1 px-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 shrink-0 transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200" data-type="scene" title="Convert to Scene Heading">
              <span class="material-symbols-outlined text-[14px]">movie</span>
              <span>Scene</span>
            </button>
            <button class="element-btn flex-1 min-w-[50px] py-1 px-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 shrink-0 transition-colors bg-blue-600 text-white shadow-xs" data-type="action" title="Convert to Action block">
              <span class="material-symbols-outlined text-[14px]">edit_note</span>
              <span>Action</span>
            </button>
            <button class="element-btn flex-1 min-w-[50px] py-1 px-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 shrink-0 transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200" data-type="character" title="Convert to Character cue">
              <span class="material-symbols-outlined text-[14px]">person</span>
              <span>Char</span>
            </button>
            <button class="element-btn flex-1 min-w-[50px] py-1 px-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 shrink-0 transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200" data-type="dialogue" title="Convert to Dialogue">
              <span class="material-symbols-outlined text-[14px]">chat_bubble</span>
              <span>Dialogue</span>
            </button>
            <button class="element-btn flex-1 min-w-[50px] py-1 px-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 shrink-0 transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200" data-type="parenthetical" title="Convert to Parenthetical">
              <span class="material-symbols-outlined text-[14px]">format_quote</span>
              <span>Paren</span>
            </button>
            <button class="element-btn flex-1 min-w-[50px] py-1 px-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 shrink-0 transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200" data-type="transition" title="Convert to Transition">
              <span class="material-symbols-outlined text-[14px]">double_arrow</span>
              <span>Trans</span>
            </button>
          </div>
        </div>

      </header>

      <!-- ========================================================= -->
      <!-- FIND & REPLACE DOCKED BAR (Toggled via menu or Ctrl+F)    -->
      <!-- ========================================================= -->
      <div id="findReplaceBar" class="fixed top-[152px] left-0 right-0 z-35 bg-white border-b border-blue-200 shadow-md px-4 py-2 hidden max-w-3xl mx-auto rounded-b-xl transition-all">
        <div class="flex items-center gap-2 flex-wrap text-xs">
          <div class="flex items-center bg-slate-100 rounded-lg px-2 py-1 flex-1 min-w-[140px]">
            <span class="material-symbols-outlined text-[15px] text-slate-400 mr-1">search</span>
            <input type="text" id="findInput" placeholder="Find text..." class="bg-transparent outline-none w-full text-slate-900" />
            <span id="findMatchesCount" class="text-[10px] text-slate-500 whitespace-nowrap ml-1 font-mono">0 of 0</span>
          </div>

          <div class="flex items-center bg-slate-100 rounded-lg px-2 py-1 flex-1 min-w-[140px]">
            <span class="material-symbols-outlined text-[15px] text-slate-400 mr-1">find_replace</span>
            <input type="text" id="replaceInput" placeholder="Replace with..." class="bg-transparent outline-none w-full text-slate-900" />
          </div>

          <div class="flex items-center gap-1">
            <button id="findPrevBtn" class="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700" title="Previous match">
              <span class="material-symbols-outlined text-[14px]">expand_less</span>
            </button>
            <button id="findNextBtn" class="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700" title="Next match">
              <span class="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
            <button id="replaceBtn" class="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 font-semibold text-[11px] text-slate-800">Replace</button>
            <button id="replaceAllBtn" class="px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 font-semibold text-[11px] text-white">All</button>
            <button id="closeFindBtn" class="w-6 h-6 rounded hover:bg-slate-100 flex items-center justify-center text-slate-500 ml-1">
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ========================================================= -->
      <!-- CONTINUOUS MULTI-PAGE SCREENPLAY WORKSPACE AREA          -->
      <!-- Single vertical scroll container, Header stays fixed      -->
      <!-- ========================================================= -->
      <main id="editor-main-scroll" class="flex-1 w-full pt-[156px] pb-16 overflow-y-auto min-h-screen flex flex-col items-center">
        
        <!-- Multi-page Sheet Container -->
        <div id="screenplay-pages-container" class="w-full max-w-3xl flex flex-col items-center gap-8 py-6 px-3 sm:px-6">
          <!-- Pages rendered dynamically with Page boundaries -->
          <div class="w-full flex items-center justify-center py-20 text-slate-400">
            <span class="material-symbols-outlined animate-spin text-[28px] mr-2">progress_activity</span>
            <span>Loading screenplay studio...</span>
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
      <!-- THREE-DOT MENU MODAL / DRAWER (Section G)                 -->
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

            <!-- VIEW -->
            <div class="py-2 flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">View & Navigation</span>
              <button id="menu-btn-focus-mode" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">center_focus_strong</span>
                <span class="flex-1 font-medium">Toggle Focus Mode</span>
                <span id="menuFocusState" class="text-[10px] text-blue-600 font-semibold">Off</span>
              </button>
              <button id="menu-btn-go-page" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">auto_stories</span>
                <span class="flex-1 font-medium">Go to Page...</span>
              </button>
              <button id="menu-btn-go-scene" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">movie</span>
                <span class="flex-1 font-medium">Go to Scene...</span>
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
      <!-- TITLE PAGE EDITOR MODAL (Section H)                       -->
      <!-- ========================================================= -->
      <div id="titlePageModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden items-center justify-center p-3 sm:p-4">
        <div class="w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200">
          <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/70">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">description</span>
              </div>
              <div>
                <h3 class="font-heading font-bold text-base text-slate-900 leading-tight">Title Page Editor</h3>
                <p class="text-[11px] text-slate-500 mt-0.5">Industry Standard Screenplay Cover Page</p>
              </div>
            </div>
            <button id="closeTitlePageModal" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="p-5 flex flex-col gap-3.5 overflow-y-auto font-sans text-xs">
            <div class="flex flex-col gap-1">
              <label class="font-semibold text-slate-700">Screenplay Title</label>
              <input type="text" id="tpTitleInput" class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 font-bold uppercase focus:outline-none focus:border-blue-600" />
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-semibold text-slate-700">Written by / Author</label>
              <input type="text" id="tpAuthorInput" class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600" />
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-semibold text-slate-700">Based on / Additional Credits (Optional)</label>
              <input type="text" id="tpNotesInput" placeholder="e.g. Based on an original story by..." class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600" />
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-semibold text-slate-700">Contact Information</label>
              <textarea id="tpContactInput" rows="3" placeholder="Agency, management, email, phone number..." class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 resize-none"></textarea>
            </div>
          </div>

          <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
            <button id="cancelTitlePageBtn" class="px-3.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-medium">Cancel</button>
            <button id="saveTitlePageBtn" class="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:bg-blue-700">
              <span class="material-symbols-outlined text-[16px]">save</span>
              <span>Save Title Page</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ========================================================= -->
      <!-- EDITOR PREFERENCES MODAL (Section AE)                     -->
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
                <p class="text-[11px] text-slate-500 mt-0.5">${n.title} · ${n.draft||"Draft 4.2"}</p>
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
                <p class="text-[11px] text-slate-500 mt-0.5">${n.title}</p>
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
  `}async function ht(t,e){const n=document.getElementById("editor-back-btn");n&&(n.onclick=()=>{_&&Z(!1),e("/workspace")}),u=await Ke(t),G(),me();const s=document.getElementById("editor-save-btn");s&&(s.onclick=()=>Z(!0)),window.addEventListener("keydown",vt),At(t,e),Ct(),kt(),Tt(),Bt(t),Et()}function vt(t){(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="s"&&(t.preventDefault(),Z(!0)),(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="f"&&(t.preventDefault(),ie(!0))}function G(){const t=document.getElementById("screenplay-pages-container");if(!t||!u)return;const e=u.scenes||[];let n=[];e.forEach((s,a)=>{n.push({pageNumber:n.length+1,sceneNumber:s.number,sceneId:s.id,slugline:s.slugline,blocks:s.blocks||[]})}),n.length===0&&n.push({pageNumber:1,sceneNumber:1,sceneId:"scene-1",slugline:"INT. NEW SCENE - DAY",blocks:[{id:"b-1-1",type:"scene",content:"INT. NEW SCENE - DAY"},{id:"b-1-2",type:"action",content:"Type your screenplay action here..."}]}),t.innerHTML=n.map((s,a)=>`
    <div class="screenplay-page-sheet w-full max-w-2xl bg-white rounded-xl shadow-md border border-slate-200/80 p-6 sm:p-12 flex flex-col font-courier text-[14px] sm:text-[15px] leading-[22px] sm:leading-[24px] text-slate-900 relative transition-all" data-page-num="${s.pageNumber}">
      
      <!-- Top Page Header: Page number in top right -->
      <div class="w-full flex items-center justify-between pb-4 select-none text-[12px] text-slate-400 font-mono border-b border-transparent">
        <span class="text-[10px] text-slate-300 uppercase tracking-widest font-sans font-semibold">${u.title} · ${u.draft||"Draft 4.2"}</span>
        <span class="font-bold text-slate-500">${s.pageNumber}.</span>
      </div>

      <!-- Screenplay Blocks for this page -->
      <div class="page-blocks-wrapper flex flex-col flex-1" data-scene-id="${s.sceneId}">
        ${s.blocks.map((l,o)=>yt(l,s.sceneNumber,s.sceneId)).join("")}
      </div>

      <!-- Bottom Page Boundary subtle indicator -->
      <div class="w-full pt-6 select-none flex items-center justify-center text-[10px] text-slate-300 font-sans tracking-widest uppercase">
        <span>— PAGE ${s.pageNumber} —</span>
      </div>

    </div>
  `).join(""),wt(),Re()}function yt(t,e,n,s){const a=t.type==="scene",l=t.type==="character",o=t.type==="parenthetical",i=t.type==="dialogue",r=t.type==="transition",c=t.type==="action"||!a&&!l&&!o&&!i&&!r;return a?`
      <div id="${t.id}" data-block-id="${t.id}" data-scene-id="${n}" data-block-type="scene" class="screenplay-block flex items-baseline py-2.5 font-bold text-slate-900 mt-2 mb-2 group">
        <!-- Scene Number shown on LEFT side ONLY (Section I) -->
        <span class="scene-num-indicator mr-3 sm:mr-4 shrink-0 font-mono text-slate-400 font-bold select-none text-[13px] w-6 text-right ${O?"":"hidden"}">${e}</span>
        <div class="flex-1 tracking-wider uppercase outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${V(t.content)}</div>
      </div>
    `:c?`
      <div id="${t.id}" data-block-id="${t.id}" data-scene-id="${n}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${V(t.content)}</div>
    `:l?`
      <div id="${t.id}" data-block-id="${t.id}" data-scene-id="${n}" data-block-type="character" class="screenplay-block w-7/12 mx-auto uppercase font-bold tracking-wider text-slate-900 text-center mt-3 mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${V(t.content)}</div>
    `:o?`
      <div id="${t.id}" data-block-id="${t.id}" data-scene-id="${n}" data-block-type="parenthetical" class="screenplay-block w-6/12 mx-auto italic text-slate-600 text-center mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${V(t.content)}</div>
    `:i?`
      <div id="${t.id}" data-block-id="${t.id}" data-scene-id="${n}" data-block-type="dialogue" class="screenplay-block w-9/12 sm:w-8/12 mx-auto text-left text-slate-900 mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${V(t.content)}</div>
    `:r?`
      <div id="${t.id}" data-block-id="${t.id}" data-scene-id="${n}" data-block-type="transition" class="screenplay-block w-full text-right uppercase font-bold tracking-wider text-slate-900 mt-2 mb-4 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${V(t.content)}</div>
    `:`
    <div id="${t.id}" data-block-id="${t.id}" data-scene-id="${n}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true">${V(t.content)}</div>
  `}function V(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}function wt(){document.querySelectorAll(".screenplay-block").forEach(e=>{const n=e.hasAttribute("contenteditable")?e:e.querySelector('[contenteditable="true"]');n&&(n.onfocus=()=>{pe=e.getAttribute("data-block-id");const s=e.getAttribute("data-block-type")||"action";Oe(s)},n.oninput=s=>{_=!0,fe(e,n.innerText),Y("Unsaved"),oe(),De(e,n),Re()},n.onkeydown=s=>{St(s,e,n)})})}function fe(t,e){if(!u)return;const n=t.getAttribute("data-block-id"),s=t.getAttribute("data-scene-id"),a=u.scenes.find(o=>o.id===s);if(!a)return;const l=a.blocks.find(o=>o.id===n);if(l){if(l.content=e,l.type==="character"){const o=e.replace(/\(.*\)/g,"").trim().toUpperCase();o&&!u.characters.includes(o)&&(u.characters.push(o),me())}if(l.type==="scene"){a.slugline=e;const o=e.match(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([^-\n]+)/i);if(o&&o[2]){const i=o[2].trim().toUpperCase();i&&!u.locations.includes(i)&&u.locations.push(i)}}}}function St(t,e,n){const s=e.getAttribute("data-block-type"),a=e.getAttribute("data-scene-id"),l=e.getAttribute("data-block-id"),o=document.getElementById("editor-autocomplete-dropdown");if(o&&!o.classList.contains("hidden")){if(t.key==="ArrowDown"){t.preventDefault(),Be(1);return}if(t.key==="ArrowUp"){t.preventDefault(),Be(-1);return}if(t.key==="Enter"||t.key==="Tab"){const i=o.querySelector(".autocomplete-item.active");if(i){t.preventDefault(),i.click();return}}if(t.key==="Escape"){Q();return}}if(t.key==="("&&(s==="character"||s==="dialogue")){const i=window.getSelection();if(i&&i.anchorOffset===0&&n.innerText.trim()===""){t.preventDefault(),le(e,"parenthetical"),n.innerText="(",te(n);return}}if(t.key==="Tab"){if(t.preventDefault(),s==="action"){le(e,"character");return}if(s==="character"){le(e,"dialogue");return}}if(t.key==="Enter"&&!t.shiftKey){if(Q(),s==="scene"){t.preventDefault(),X(a,l,"action");return}if(s==="character"){t.preventDefault(),X(a,l,"dialogue");return}if(s==="dialogue"){t.preventDefault(),X(a,l,"action");return}if(s==="parenthetical"){t.preventDefault();let i=n.innerText.trim();i.endsWith(")")||(i+=")",n.innerText=i,fe(e,i)),X(a,l,"dialogue");return}if(s==="transition"){t.preventDefault(),It(a);return}if(s==="action"){t.preventDefault(),X(a,l,"action");return}}}function X(t,e,n,s){const a=u.scenes.find(r=>r.id===t);if(!a)return;const l=a.blocks.findIndex(r=>r.id===e),o=`b-${Date.now().toString().slice(-6)}`,i={id:o,type:n,content:""};l!==-1?a.blocks.splice(l+1,0,i):a.blocks.push(i),G(),setTimeout(()=>{const r=document.getElementById(o);if(r){const c=r.hasAttribute("contenteditable")?r:r.querySelector('[contenteditable="true"]');c&&(c.focus(),te(c))}},30)}function It(t){const e=u.scenes.findIndex(o=>o.id===t),n=u.scenes.length+1,s=`scene-${Date.now().toString().slice(-5)}`,a=`b-${Date.now().toString().slice(-6)}`,l={id:s,number:n,actId:u.acts?.[0]?.id||"act-1",slugline:"INT. ",blocks:[{id:a,type:"scene",content:"INT. "}]};e!==-1?u.scenes.splice(e+1,0,l):u.scenes.push(l),u.scenes.forEach((o,i)=>{o.number=i+1}),G(),me(),f(`Created Scene ${n}`),setTimeout(()=>{const o=document.getElementById(a);if(o){const i=o.querySelector('[contenteditable="true"]');i&&(i.focus(),te(i),De(o,i))}},40)}function le(t,e){const n=t.getAttribute("data-block-id"),s=t.getAttribute("data-scene-id"),a=u.scenes.find(o=>o.id===s);if(!a)return;const l=a.blocks.find(o=>o.id===n);l&&(l.type=e,e==="character"&&(l.content=l.content.toUpperCase()),e==="parenthetical"&&!l.content.startsWith("(")&&(l.content=`(${l.content})`),G(),setTimeout(()=>{const o=document.getElementById(n);if(o){const i=o.hasAttribute("contenteditable")?o:o.querySelector('[contenteditable="true"]');i&&(i.focus(),te(i))}},20))}function te(t){const e=document.createRange(),n=window.getSelection();e.selectNodeContents(t),e.collapse(!1),n.removeAllRanges(),n.addRange(e)}function Et(){document.addEventListener("click",t=>{t.target.closest("#editor-autocomplete-dropdown")||Q()})}function Q(){const t=document.getElementById("editor-autocomplete-dropdown");t&&t.classList.add("hidden")}function De(t,e){const n=t.getAttribute("data-block-type"),s=e.innerText,a=document.getElementById("editor-autocomplete-dropdown");if(!a)return;let l=[];if(n==="scene"){const i=s.toUpperCase();if(i==="I"||i==="IN")l=["INT.","INT./EXT.","I/E."];else if(i==="E"||i==="EX")l=["EXT.","INT./EXT.","I/E."];else if(i.startsWith("INT. ")||i.startsWith("EXT. ")||i.startsWith("INT./EXT. ")){const r=i.includes("INT./EXT. ")?"INT./EXT. ":i.startsWith("INT. ")?"INT. ":"EXT. ",c=i.slice(r.length).trim();i.endsWith("- ")||i.endsWith(" -")?l=(u.times||["DAY","NIGHT","MORNING","EVENING","DAWN","DUSK","CONTINUOUS","LATER"]).map(m=>`${r}${c.replace(/-\s*$/,"").trim()} - ${m}`):c.length>0&&(l=(u.locations||[]).filter(x=>x.startsWith(c)).map(x=>`${r}${x} - DAY`))}}else if(n==="character"){const i=s.trim().toUpperCase();i.length>0&&(l=(u.characters||[]).filter(c=>c.startsWith(i)))}else if(n==="transition"){const i=s.trim().toUpperCase(),r=u.transitions||["CUT TO:","FADE IN:","FADE OUT.","DISSOLVE TO:","SMASH CUT TO:","MATCH CUT TO:","JUMP CUT TO:"];i.length>0&&(l=r.filter(c=>c.startsWith(i)))}if(l.length===0){Q();return}a.innerHTML=l.map((i,r)=>`
    <div class="autocomplete-item px-3 py-1.5 hover:bg-blue-50 text-slate-800 hover:text-blue-700 cursor-pointer flex items-center justify-between font-mono ${r===0?"active bg-blue-50/60 text-blue-700":""}" data-val="${i}">
      <span>${i}</span>
      <span class="text-[10px] text-slate-400 font-sans">Enter ↵</span>
    </div>
  `).join("");const o=e.getBoundingClientRect();a.style.top=`${Math.min(window.innerHeight-200,o.bottom+4)}px`,a.style.left=`${Math.min(window.innerWidth-240,Math.max(16,o.left))}px`,a.classList.remove("hidden"),a.querySelectorAll(".autocomplete-item").forEach(i=>{i.onclick=()=>{const r=i.getAttribute("data-val");e.innerText=r,fe(t,r),Q(),te(e),_=!0,oe()}})}function Be(t){const e=document.getElementById("editor-autocomplete-dropdown");if(!e)return;const n=e.querySelectorAll(".autocomplete-item");if(n.length===0)return;let s=Array.from(n).findIndex(a=>a.classList.contains("active"));s!==-1&&n[s].classList.remove("active","bg-blue-50/60","text-blue-700"),s=(s+t+n.length)%n.length,n[s].classList.add("active","bg-blue-50/60","text-blue-700"),n[s].scrollIntoView({block:"nearest"})}async function Z(t=!1){if(!(ne||!u)){ne=!0,Y("Saving...");try{await ze(u.id,u),_=!1,ne=!1,Y("Saved"),t&&f("Saved")}catch{ne=!1,Y("Save failed"),f("Couldn't save changes · Tap retry")}}}function oe(){clearTimeout(Te),Te=setTimeout(async()=>{_&&(await Z(!1),Y("Autosaved just now"))},1500)}function Y(t){const e=document.getElementById("editor-save-status");document.getElementById("editor-save-btn");const n=document.getElementById("editor-save-icon"),s=document.getElementById("editor-save-text");e&&(e.textContent=t),t==="Saving..."?(n&&(n.textContent="progress_activity"),n?.classList.add("animate-spin"),s&&(s.textContent="Saving...")):t==="Saved"||t==="Autosaved just now"?(n&&(n.textContent="cloud_done",n.classList.remove("animate-spin")),s&&(s.textContent="Save")):t==="Unsaved"?(n&&(n.textContent="cloud_upload",n.classList.remove("animate-spin")),s&&(s.textContent="Save")):t==="Save failed"&&(n&&(n.textContent="warning",n.classList.remove("animate-spin")),s&&(s.textContent="Retry"))}function me(){if(!u)return;const t=document.getElementById("navActSelect");if(t){const s=u.acts||[{id:"act-1",name:"ACT I"}];t.innerHTML='<option value="">ACT...</option>'+s.map(a=>`
      <option value="${a.id}">${a.name}</option>
    `).join("")}const e=document.getElementById("navSceneSelect");if(e){const s=u.scenes||[];e.innerHTML='<option value="">SCENE...</option>'+s.map(a=>`
      <option value="${a.id}">SCENE ${a.number} · ${a.slugline.slice(0,20)}</option>
    `).join("")}const n=document.getElementById("navCharSelect");if(n){const s=u.characters||[];n.innerHTML='<option value="">CHARACTER...</option>'+s.map(a=>`
      <option value="${a}">${a}</option>
    `).join("")}}function Ct(){const t=document.getElementById("navActSelect"),e=document.getElementById("navSceneSelect"),n=document.getElementById("navCharSelect");t&&(t.onchange=s=>{const a=s.target.value;if(!a)return;const l=u.scenes.find(o=>o.actId===a);l&&Ne(l.id)}),e&&(e.onchange=s=>{const a=s.target.value;a&&Ne(a)}),n&&(n.onchange=s=>{const a=s.target.value;if(a){for(const l of u.scenes)for(const o of l.blocks)if(o.type==="character"&&o.content.toUpperCase().includes(a)){const i=document.getElementById(o.id);if(i){i.scrollIntoView({behavior:"smooth",block:"center"}),i.classList.add("bg-blue-100/60"),setTimeout(()=>i.classList.remove("bg-blue-100/60"),1500);return}}}})}function Ne(t){const e=document.querySelector(`[data-scene-id="${t}"]`);e&&(e.scrollIntoView({behavior:"smooth",block:"start"}),e.classList.add("bg-blue-50/40"),setTimeout(()=>e.classList.remove("bg-blue-50/40"),1500))}function kt(){const t=document.getElementById("element-bar");t&&t.querySelectorAll(".element-btn").forEach(e=>{e.onclick=()=>{const n=e.getAttribute("data-type");if(!pe)return;const s=document.getElementById(pe);s&&(le(s,n),Oe(n))}})}function Oe(t){const e=document.getElementById("element-bar");e&&e.querySelectorAll(".element-btn").forEach(n=>{n.getAttribute("data-type")===t?n.className="element-btn flex-1 min-w-[50px] py-1 px-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 shrink-0 bg-blue-600 text-white shadow-xs":n.className="element-btn flex-1 min-w-[50px] py-1 px-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 shrink-0 bg-slate-100 text-slate-700 hover:bg-slate-200"})}function At(t,e){const n=document.getElementById("editor-more-menu-btn"),s=document.getElementById("editorMoreMenuModal"),a=document.getElementById("closeMoreMenuBtn");function l(A){s&&(A?(s.classList.remove("hidden"),s.classList.add("flex")):(s.classList.add("hidden"),s.classList.remove("flex")))}n&&(n.onclick=()=>l(!0)),a&&(a.onclick=()=>l(!1)),s&&(s.onclick=A=>{A.target===s&&l(!1)});const o=document.getElementById("sceneNumberToggle"),i=document.getElementById("sceneNumberToggleText"),r=document.getElementById("menuSceneNumState"),c=document.getElementById("menu-btn-scene-numbers");function p(){O=!O,i&&(i.textContent=`Scene #s: ${O?"On":"Off"}`),r&&(r.textContent=O?"Enabled":"Disabled"),document.querySelectorAll(".scene-num-indicator").forEach(A=>{A.classList.toggle("hidden",!O)}),f(`Scene numbers ${O?"enabled (left side)":"hidden"}`)}o&&(o.onclick=p),c&&(c.onclick=()=>{p(),l(!1)});const m=document.getElementById("focusModeToggle"),x=document.getElementById("focusModeText"),v=document.getElementById("menu-btn-focus-mode"),E=document.getElementById("menuFocusState");function S(){D=!D,x&&(x.textContent=D?"Exit Focus":"Focus"),E&&(E.textContent=D?"Active":"Off"),document.getElementById("editor-toolbar-strip").style.display=D?"none":"flex",document.getElementById("editor-accessory-tray").style.display=D?"none":"flex",document.getElementById("editor-main-scroll").style.paddingTop=D?"56px":"156px",f(D?"Focus Mode active (distraction-free)":"Exited Focus Mode")}m&&(m.onclick=S),v&&(v.onclick=()=>{S(),l(!1)});const y=document.getElementById("langToggleBtn"),I=document.getElementById("langToggleText"),b=document.getElementById("tamilLangBadge");function B(A){re=A,I&&(I.textContent=A==="TA"?"தமிழ் / EN":A==="TL"?"Tanglish":"EN / தமிழ்"),b&&(b.textContent=A==="TA"?"தமிழ் விசைப்பலகை: இயங்குகிறது":A==="TL"?"Tanglish: Active":"Tamil IME: Ready"),f(`Screenplay language set to ${A==="TA"?"Tamil":A==="TL"?"Tanglish":"English"}`)}y&&(y.onclick=()=>{B(re==="EN"?"TA":re==="TA"?"TL":"EN")}),document.querySelectorAll(".lang-choice-btn").forEach(A=>{A.onclick=()=>{B(A.getAttribute("data-lang")),l(!1)}});const g=document.getElementById("btn-open-production"),h=document.getElementById("menu-btn-production");g&&(g.onclick=()=>e("/intelligence/analysis/production")),h&&(h.onclick=()=>e("/intelligence/analysis/production"));const w=document.getElementById("menu-btn-go-page");w&&(w.onclick=()=>{l(!1);const A=prompt("Enter page number to jump to (1-5):","1");if(A){const L=document.querySelector(`[data-page-num="${A}"]`);L&&L.scrollIntoView({behavior:"smooth",block:"start"})}});const N=document.getElementById("menu-btn-go-scene");N&&(N.onclick=()=>{l(!1);const A=document.getElementById("navSceneSelect");A&&A.focus()});const H=document.getElementById("btn-undo"),J=document.getElementById("btn-redo");H&&(H.onclick=()=>document.execCommand("undo")),J&&(J.onclick=()=>document.execCommand("redo"));const W=document.getElementById("btn-insert-intext");W&&(W.onclick=()=>{document.execCommand("insertText",!1,"INT/EXT. ")})}function Tt(){const t=document.getElementById("btn-quick-find"),e=document.getElementById("menu-btn-find-replace"),n=document.getElementById("closeFindBtn"),s=document.getElementById("findInput"),a=document.getElementById("replaceInput"),l=document.getElementById("findNextBtn"),o=document.getElementById("findPrevBtn"),i=document.getElementById("replaceBtn"),r=document.getElementById("replaceAllBtn");t&&(t.onclick=()=>ie(!0)),e&&(e.onclick=()=>{const c=document.getElementById("editorMoreMenuModal");c&&c.classList.add("hidden"),ie(!0)}),n&&(n.onclick=()=>ie(!1)),s&&(s.oninput=()=>ce(s.value)),l&&(l.onclick=()=>ue(1)),o&&(o.onclick=()=>ue(-1)),i&&(i.onclick=()=>{const c=s.value,p=a.value;if(!c||R===-1||!P[R])return;const m=P[R];m.block.content=m.block.content.replace(c,p),G(),ce(c),_=!0,oe(),f("Replaced 1 occurrence")}),r&&(r.onclick=()=>{const c=s.value,p=a.value;if(!c)return;let m=0;u.scenes.forEach(x=>{x.blocks.forEach(v=>{v.content.includes(c)&&(v.content=v.content.split(c).join(p),m++)})}),G(),ce(c),_=!0,oe(),f(`Replaced ${m} occurrences`)})}function ie(t){const e=document.getElementById("findReplaceBar");e&&(t?(e.classList.remove("hidden"),document.getElementById("findInput")?.focus()):(e.classList.add("hidden"),be()))}function ce(t){P=[],R=-1;const e=document.getElementById("findMatchesCount");if(!t||!u){e&&(e.textContent="0 of 0"),be();return}u.scenes.forEach(n=>{n.blocks.forEach(s=>{s.content.toLowerCase().includes(t.toLowerCase())&&P.push({block:s,sceneId:n.id})})}),e&&(e.textContent=P.length>0?`1 of ${P.length}`:"0 of 0"),P.length>0&&ue(0)}function ue(t){if(P.length===0)return;R=(R+t+P.length)%P.length;const e=P[R],n=document.getElementById("findMatchesCount");n&&(n.textContent=`${R+1} of ${P.length}`);const s=document.getElementById(e.block.id);s&&(s.scrollIntoView({behavior:"smooth",block:"center"}),be(),s.classList.add("bg-yellow-100"))}function be(){document.querySelectorAll(".screenplay-block").forEach(t=>{t.classList.remove("bg-yellow-100")})}function Bt(t){const e=document.getElementById("titlePageModal"),n=document.getElementById("btn-quick-title-page"),s=document.getElementById("menu-btn-title-page"),a=document.getElementById("closeTitlePageModal"),l=document.getElementById("cancelTitlePageBtn"),o=document.getElementById("saveTitlePageBtn");function i(){if(!e||!u)return;const T=u.titlePage||{};document.getElementById("tpTitleInput").value=T.title||u.title,document.getElementById("tpAuthorInput").value=T.author||"Arun Kumar",document.getElementById("tpNotesInput").value=T.notes||"",document.getElementById("tpContactInput").value=T.contact||"",e.classList.remove("hidden"),e.classList.add("flex")}n&&(n.onclick=i),s&&(s.onclick=()=>{document.getElementById("editorMoreMenuModal")?.classList.add("hidden"),i()}),a&&(a.onclick=()=>e.classList.add("hidden")),l&&(l.onclick=()=>e.classList.add("hidden")),o&&(o.onclick=async()=>{const T={title:document.getElementById("tpTitleInput")?.value||u.title,author:document.getElementById("tpAuthorInput")?.value||"",notes:document.getElementById("tpNotesInput")?.value||"",contact:document.getElementById("tpContactInput")?.value||""};u.titlePage=T,u.title=T.title,document.getElementById("editor-script-title").textContent=T.title,e.classList.add("hidden"),f("Title Page saved"),_=!0,await Z(!0)});const r=document.getElementById("preferencesModal"),c=document.getElementById("menu-btn-preferences"),p=document.getElementById("closePrefModal"),m=document.getElementById("savePrefBtn");c&&(c.onclick=()=>{document.getElementById("editorMoreMenuModal")?.classList.add("hidden"),r?.classList.remove("hidden"),r?.classList.add("flex")}),p&&(p.onclick=()=>r?.classList.add("hidden")),m&&(m.onclick=()=>{document.getElementById("prefSmartFormat")?.checked;const T=document.getElementById("prefSceneNumbers")?.checked,C=document.getElementById("prefLineSpacing")?.value,q=document.getElementById("prefFontSize")?.value;O=T,document.querySelectorAll(".scene-num-indicator").forEach(M=>M.classList.toggle("hidden",!T));const z=document.querySelector(".screenplay-page-sheet");z&&(z.style.lineHeight=C==="2.0"?"30px":C==="1.0"?"20px":"24px",z.style.fontSize=q==="14pt"?"16px":"15px"),r?.classList.add("hidden"),f("Preferences applied")});const x=document.getElementById("exportModal"),v=document.getElementById("exportModalBtn"),E=document.getElementById("menu-btn-export"),S=document.getElementById("closeExportModal"),y=document.getElementById("cancelExportBtn"),I=document.getElementById("startExportBtn"),b=document.getElementById("exportProgressArea"),B=document.getElementById("exportProgressBar"),g=document.getElementById("exportStatusText");function h(T){x&&(T?(x.classList.remove("hidden"),x.classList.add("flex")):(x.classList.add("hidden"),x.classList.remove("flex"),b?.classList.add("hidden")))}v&&(v.onclick=()=>h(!0)),E&&(E.onclick=()=>{document.getElementById("editorMoreMenuModal")?.classList.add("hidden"),h(!0)}),S&&(S.onclick=()=>h(!1)),y&&(y.onclick=()=>h(!1)),I&&(I.onclick=()=>{const T=document.getElementById("exportFormatSelect")?.value||"pdf";b.classList.remove("hidden"),B.style.width="35%",g.textContent="Formatting Courier Prime typography and margins...",setTimeout(()=>{B.style.width="80%",g.textContent=`Compiling standard ${T.toUpperCase()} screenplay blocks...`},500),setTimeout(()=>{B.style.width="100%",g.textContent="Completed! Starting download...";let C="";document.getElementById("optTitlePage")?.checked&&u.titlePage&&(C+=`${u.titlePage.title||u.title}
`,C+=`Written by ${u.titlePage.author||"Arun Kumar"}

`,u.titlePage.contact&&(C+=`${u.titlePage.contact}

`),C+=`=================================================

`),u.scenes.forEach(Ce=>{Ce.blocks.forEach(j=>{j.type==="scene"?C+=`

SCENE ${Ce.number}
${j.content}

`:j.type==="character"?C+=`
			${j.content}
`:j.type==="parenthetical"?C+=`		${j.content}
`:j.type==="dialogue"?C+=`	${j.content}
`:j.type==="transition"?C+=`
						${j.content}

`:C+=`${j.content}

`})});const q=new Blob([C],{type:T==="pdf"?"application/pdf":"text/plain"}),z=URL.createObjectURL(q),M=document.createElement("a");M.href=z,M.download=`${u.title.replace(/[^a-zA-Z0-9]/g,"_")}_${u.draft||"Draft"}.${T}`,document.body.appendChild(M),M.click(),M.remove(),f(`Exported "${M.download}" successfully`),setTimeout(()=>h(!1),800)},1e3)});const w=document.getElementById("versionsModal"),N=document.getElementById("versionsModalBtn"),H=document.getElementById("menu-btn-versions"),J=document.getElementById("closeVersionsModal"),W=document.getElementById("versionsListContainer");async function A(){const T=await Xe(t);W&&(W.innerHTML=T.map(C=>`
      <div class="p-3 rounded-xl border ${C.isCurrent?"border-2 border-blue-600 bg-blue-50/30":"border-slate-200 bg-white hover:bg-slate-50"} transition-colors flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-heading font-bold text-sm text-slate-900">${C.name}</span>
            <span class="px-2 py-0.5 rounded-full ${C.isCurrent?"bg-blue-600 text-white font-semibold":"bg-slate-100 text-slate-600 font-medium"} text-[10px]">${C.tag}</span>
          </div>
          <span class="text-[11px] text-slate-400 font-caption">${C.timestamp}</span>
        </div>
        <p class="text-xs text-slate-600">${C.notes||"Point-in-time snapshot."}</p>
        <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>Edited by ${C.author}</span>
          <div class="flex items-center gap-2">
            <span class="font-medium text-slate-700">${C.stats}</span>
            ${C.isCurrent?"":`<button class="restore-version-btn text-blue-600 font-semibold hover:underline" data-vname="${C.name}">Restore</button>`}
          </div>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".restore-version-btn").forEach(C=>{C.onclick=()=>{const q=C.getAttribute("data-vname");f(`Restored version "${q}"`),document.getElementById("currentVersionTag").textContent=q,w.classList.add("hidden")}}))}N&&(N.onclick=()=>{w.classList.remove("hidden"),w.classList.add("flex"),A()}),H&&(H.onclick=()=>{document.getElementById("editorMoreMenuModal")?.classList.add("hidden"),w.classList.remove("hidden"),w.classList.add("flex"),A()}),J&&(J.onclick=()=>w.classList.add("hidden"));const L=document.getElementById("newVersionModal"),ge=document.getElementById("openNewVersionPrompt"),he=document.getElementById("closeNewVersionModal"),ve=document.getElementById("cancelNewVersionBtn"),ye=document.getElementById("saveNewVersionBtn");ge&&(ge.onclick=()=>{L.classList.remove("hidden"),L.classList.add("flex")}),he&&(he.onclick=()=>L.classList.add("hidden")),ve&&(ve.onclick=()=>L.classList.add("hidden")),ye&&(ye.onclick=async()=>{const T=document.getElementById("newVersionNameInput")?.value.trim(),C=document.getElementById("newVersionNotesInput")?.value.trim();T&&(await Ye(t,{name:T,notes:C}),f(`Created version snapshot "${T}"`),document.getElementById("currentVersionTag").textContent=T,L.classList.add("hidden"),A())});const K=document.getElementById("compareModal"),we=document.getElementById("openCompareBtn"),Se=document.getElementById("menu-btn-compare"),Ie=document.getElementById("closeCompareModal"),Ee=document.getElementById("closeCompareBtn2");function se(T){K&&(T?(K.classList.remove("hidden"),K.classList.add("flex")):(K.classList.add("hidden"),K.classList.remove("flex")))}we&&(we.onclick=()=>se(!0)),Se&&(Se.onclick=()=>{document.getElementById("editorMoreMenuModal")?.classList.add("hidden"),se(!0)}),Ie&&(Ie.onclick=()=>se(!1)),Ee&&(Ee.onclick=()=>se(!1))}function Re(){if(!u)return;let t=0;u.scenes.forEach(a=>{a.blocks.forEach(l=>{l.content&&(t+=l.content.trim().split(/\s+/).filter(Boolean).length)})});const e=u.scenes.length||1,n=document.getElementById("telemetry-page-count"),s=document.getElementById("telemetry-word-count");n&&(n.textContent=`Page 1 of ${e}`),s&&(s.textContent=`${t.toLocaleString()} words`)}function Nt(){const t=d.state.scripts||[],e=d.state.selectedScriptId||"chronicles-of-dust",n=t.find(s=>s.id===e)||t[0]||{title:"Chronicles of Dust"};return`
    ${F("Intelligence","Script Selector")}

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
            ${t.map(s=>{const a=s.id===e;return`
                <div data-script-id="${s.id}" data-script-title="${s.title}" class="script-select-card relative p-3.5 rounded-xl border ${a?"border-blue-600 bg-blue-50/70":"border-slate-200/80 bg-white hover:bg-slate-50"} transition-all cursor-pointer flex items-center justify-between group shadow-xs">
                  <div class="flex items-center gap-3 min-w-0 relative z-10">
                    <div class="shrink-0 w-9 h-9 rounded-lg ${a?"bg-white border-blue-200 text-blue-600":"bg-slate-50 border-slate-200 text-slate-600"} border flex items-center justify-center shadow-xs">
                      <span class="material-symbols-outlined text-[20px]">movie</span>
                    </div>
                    <div class="flex flex-col min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-semibold text-slate-900 truncate uppercase">${s.title}</span>
                        <span class="text-[10px] font-medium px-1.5 py-0.5 rounded ${a?"bg-blue-100 text-blue-700":"bg-slate-100 text-slate-600"} shrink-0">${s.draft||"Draft 1.0"}</span>
                      </div>
                      <span class="text-[11px] text-slate-500 truncate mt-0.5">${s.format||"Screenplay"} · ${s.pages} pages · Updated ${s.updated||"recently"}</span>
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
          <span class="truncate font-semibold" id="selector-btn-label">Continue to Context (${n.title})</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
        <span class="text-[10px] text-slate-400 tracking-tight">Establishes selectedScriptId for Script Analysis</span>
      </div>

    </main>

    ${U("intelligence")}
  `}function Pt(t){let e=d.state.selectedScriptId||"chronicles-of-dust";document.querySelectorAll(".script-select-card").forEach(a=>{a.onclick=()=>{const l=a.getAttribute("data-script-id"),o=a.getAttribute("data-script-title");e=l,d.selectScript(l),document.querySelectorAll(".script-select-card").forEach(c=>{c.className="script-select-card relative p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const p=c.querySelector(".script-select-indicator");p&&(p.className="script-select-indicator w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0",p.innerHTML='<span class="material-symbols-outlined text-[16px]">arrow_forward</span>')}),a.className="script-select-card relative p-3.5 rounded-xl border border-blue-600 bg-blue-50/70 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const i=a.querySelector(".script-select-indicator");i&&(i.className="script-select-indicator w-6 h-6 rounded-full bg-blue-600 text-white shadow-xs flex items-center justify-center shrink-0",i.innerHTML='<span class="material-symbols-outlined text-[16px] font-bold">check</span>');const r=document.getElementById("selector-btn-label");r&&(r.textContent=`Continue to Context (${o})`)}});const n=document.getElementById("submit-continue-analysis-btn");n&&(n.onclick=()=>{d.selectScript(e),t("/intelligence/context")});const s=document.getElementById("btn-import-script-modal");s&&(s.onclick=()=>{f("Select screenplay file (.fountain, .fdx, .pdf) to parse","info")})}function jt(){const t=d.state.selectedScriptId||"chronicles-of-dust",e=d.state.scripts.find(s=>s.id===t)||d.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",format:"Feature",industry:"International / Hollywood"},n=e.context||{format:e.format||"Feature",industry:e.industry||"International / Hollywood",hours:1,minutes:36,seconds:0};return`
    ${F("Intelligence","Context Calibration")}

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
            <button type="button" data-format="Short" class="format-card relative flex flex-col items-center justify-center p-3 rounded-xl ${n.format==="Short"?"bg-blue-50 border-2 border-blue-600":"bg-white border border-slate-200"} transition-all cursor-pointer hover:bg-slate-50">
              <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-1 text-slate-600">
                <span class="material-symbols-outlined text-[18px]">movie</span>
              </div>
              <span class="text-xs font-bold text-slate-900">Short</span>
              <span class="text-[10px] text-slate-500">~15–30m</span>
            </button>

            <button type="button" data-format="Pilot" class="format-card relative flex flex-col items-center justify-center p-3 rounded-xl ${n.format==="Pilot"?"bg-blue-50 border-2 border-blue-600":"bg-white border border-slate-200"} transition-all cursor-pointer hover:bg-slate-50">
              <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-1 text-slate-600">
                <span class="material-symbols-outlined text-[18px]">live_tv</span>
              </div>
              <span class="text-xs font-bold text-slate-900">Pilot</span>
              <span class="text-[10px] text-slate-500">~45–60m</span>
            </button>

            <button type="button" data-format="Feature" class="format-card relative flex flex-col items-center justify-center p-3 rounded-xl ${n.format==="Feature"?"bg-blue-50 border-2 border-blue-600":"bg-white border border-slate-200"} transition-all cursor-pointer hover:bg-slate-50">
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
              <option value="International / Hollywood" ${n.industry==="International / Hollywood"?"selected":""}>International / Hollywood Standard (3-Act Spec)</option>
              <option value="Tamil Cinema" ${n.industry==="Tamil Cinema"?"selected":""}>Tamil Cinema (Interval Block & Dual Peak Structure)</option>
              <option value="Malayalam Cinema" ${n.industry==="Malayalam Cinema"?"selected":""}>Malayalam Cinema (Character-driven Realism)</option>
              <option value="Telugu Cinema" ${n.industry==="Telugu Cinema"?"selected":""}>Telugu Cinema (Heroic Mythos & Commercial Cadence)</option>
              <option value="Hindi Cinema" ${n.industry==="Hindi Cinema"?"selected":""}>Hindi Cinema (Narrative Melodrama & Ensemble)</option>
              <option value="Indie / Festival" ${n.industry==="Indie / Festival"?"selected":""}>Indie / Festival (Poetic / Open-ended Form)</option>
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
                <span class="font-mono text-base font-bold text-slate-900 w-6 text-center" id="val-hr">${String(n.hours||1).padStart(2,"0")}</span>
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="hr" data-delta="1">+</button>
              </div>
            </div>

            <!-- Minutes -->
            <div class="flex flex-col items-center gap-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400">Minutes</span>
              <div class="flex items-center gap-2">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="min" data-delta="-5">-</button>
                <span class="font-mono text-base font-bold text-slate-900 w-6 text-center" id="val-min">${String(n.minutes||36).padStart(2,"0")}</span>
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="min" data-delta="5">+</button>
              </div>
            </div>

            <!-- Seconds -->
            <div class="flex flex-col items-center gap-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400">Seconds</span>
              <div class="flex items-center gap-2">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="sec" data-delta="-15">-</button>
                <span class="font-mono text-base font-bold text-slate-900 w-6 text-center" id="val-sec">${String(n.seconds||0).padStart(2,"0")}</span>
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

    ${U("intelligence")}
  `}function $t(t){const e=d.state.selectedScriptId||"chronicles-of-dust";let n="Feature",s=1,a=36,l=0;document.querySelectorAll(".format-card").forEach(r=>{r.onclick=()=>{n=r.getAttribute("data-format"),document.querySelectorAll(".format-card").forEach(c=>{c.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 transition-all cursor-pointer hover:bg-slate-50"}),r.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 border-2 border-blue-600 transition-all cursor-pointer",n==="Short"?(s=0,a=25):n==="Pilot"?(s=0,a=50):(s=1,a=45),o()}});function o(){const r=p=>String(p).padStart(2,"0");document.getElementById("val-hr").textContent=r(s),document.getElementById("val-min").textContent=r(a),document.getElementById("val-sec").textContent=r(l);const c=s*60+a+Math.round(l/60);document.getElementById("pacing-projection").textContent=`~${c} standard script pages`}document.querySelectorAll(".stepper-btn").forEach(r=>{r.onclick=()=>{const c=r.getAttribute("data-unit"),p=parseInt(r.getAttribute("data-delta"));c==="hr"&&(s=Math.max(0,Math.min(8,s+p))),c==="min"&&(a=Math.max(0,Math.min(59,(a+p+60)%60))),c==="sec"&&(l=Math.max(0,Math.min(59,(l+p+60)%60))),o()}});const i=document.getElementById("btn-submit-context");i&&(i.onclick=async()=>{const r=document.getElementById("industry-select")?.value||"International / Hollywood";i.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Calibrating SCRIPTORA...</span>',i.disabled=!0;const c=m=>String(m).padStart(2,"0"),p={format:n,industry:r,hours:s,minutes:a,seconds:l,plannedDuration:`${c(s)}:${c(a)}:${c(l)}`};await rt(e,p),f("Narrative parameters calibrated"),t("/intelligence/dashboard")})}function Lt(){const t=d.state.selectedScriptId||"chronicles-of-dust",e=d.state.scripts.find(s=>s.id===t)||d.state.activeScript||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pages:96,format:"Feature"},n=e.analysisScores||{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80};return`
    ${F("Intelligence","Script Analysis")}

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
                <span class="text-2xl font-bold text-slate-900 leading-none tracking-tight font-heading">${n.overall}</span>
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
            ${[{name:"Pacing",score:n.pacing,icon:"speed"},{name:"Dialogue",score:n.dialogue,icon:"chat"},{name:"Emotion",score:n.emotion,icon:"favorite"},{name:"Character Arc",score:n.characterArc,icon:"alt_route"},{name:"Continuity",score:n.continuity,icon:"linear_scale"},{name:"Story Structure",score:n.storyStructure,icon:"account_tree"},{name:"Theme",score:n.theme,icon:"lightbulb"},{name:"Cinema",score:n.cinema,icon:"videocam"},{name:"Formatting",score:n.formatting,icon:"rule"},{name:"Production",score:n.production,icon:"movie_creation"}].map(s=>`
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
            ${d.state.scripts.map(s=>`
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

    ${U("intelligence")}
  `}function Mt(t){const e=d.state.selectedScriptId||"chronicles-of-dust",n=d.state.scripts.find(I=>I.id===e)||d.state.scripts[0],s=document.getElementById("btn-gen-logline"),a=document.getElementById("btn-gen-synopsis"),l=document.getElementById("ai-generated-container"),o=document.getElementById("ai-generated-title"),i=document.getElementById("ai-generated-body"),r=document.getElementById("ai-close-btn"),c=document.getElementById("ai-copy-btn"),p=document.getElementById("ai-copy-text"),m=document.getElementById("ai-query-input"),x=document.getElementById("ai-query-submit");function v(I){l&&(l.classList.remove("hidden"),o.textContent=I==="logline"?"Generated Logline":"Generated Synopsis",i.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Generating with narrative telemetry...</span>',setTimeout(()=>{i.textContent=I==="logline"?n?.logline||"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.":n?.synopsis||"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves."},400))}if(s&&(s.onclick=()=>v("logline")),a&&(a.onclick=()=>v("synopsis")),r&&(r.onclick=()=>l.classList.add("hidden")),c&&(c.onclick=()=>{navigator.clipboard?.writeText(i.textContent||""),p.textContent="Copied!",setTimeout(()=>{p.textContent="Copy"},1800),f("Copied to clipboard")}),x&&m){const I=async()=>{const b=m.value.trim();if(!b)return;l.classList.remove("hidden"),o.textContent="Intelligence AI Answer",i.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing draft semantics...</span>';const B=await Me(b,e);i.textContent=B,m.value=""};x.onclick=I,m.onkeydown=b=>{b.key==="Enter"&&I()}}const E=document.getElementById("script-switcher-modal"),S=document.getElementById("script-selector-trigger"),y=document.getElementById("close-script-switcher-modal");S&&(S.onclick=()=>E?.classList.remove("hidden")),y&&(y.onclick=()=>E?.classList.add("hidden")),document.querySelectorAll(".script-switch-opt").forEach(I=>{I.onclick=()=>{const b=I.getAttribute("data-id");d.selectScript(b),E?.classList.add("hidden"),t("/intelligence")}})}function Dt(){const t=d.state.selectedScriptId||"chronicles-of-dust",e=d.state.scripts.find(s=>s.id===t)||d.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",pages:96},n=[{type:"pacing",title:"Pacing",desc:"See where the story moves too fast or too slowly.",icon:"speed",score:82,telemetry:`${e.pages||96} Pages Telemetry`},{type:"dialogue",title:"Dialogue",desc:"Cadence, subtext density and character voice rhythm.",icon:"chat",score:89,telemetry:"42 Dialogue Exchanges"},{type:"emotion",title:"Emotion",desc:"Emotional heatmaps, catharsis curves and sentiment.",icon:"favorite",score:91,telemetry:"Peak Catharsis: Act II"},{type:"character-arc",title:"Character Arc",desc:"Want vs. need trajectories and transformation tracking.",icon:"alt_route",score:84,telemetry:"4 Major Protagonists"},{type:"continuity",title:"Continuity",desc:"Props, character locations, and temporal logic rules.",icon:"linear_scale",score:78,telemetry:"2 Minor Prop Conflicts"},{type:"story-structure",title:"Story Structure",desc:"Beat breakdowns, midpoint shifts and turning points.",icon:"account_tree",score:87,telemetry:"3-Act Paradigm Standard"},{type:"theme",title:"Theme",desc:"Core philosophical spines, motifs and moral arguments.",icon:"lightbulb",score:90,telemetry:"3 Tracked Motifs"},{type:"cinema",title:"Cinema",desc:"Visual storytelling, shot economy and set-piece power.",icon:"videocam",score:85,telemetry:"Cinematic Visual Index"},{type:"scene",title:"Scene Analysis",desc:"Deep dive breakdown of goals, conflict and polarity.",icon:"movie",score:86,telemetry:"Scene 18 Active Scope"},{type:"formatting",title:"Formatting",desc:"Standard industry margins, sluglines and font rules.",icon:"rule",score:94,telemetry:"Standard Guild Rules"},{type:"production",title:"Production",desc:"Locations, shooting cast, props and cost estimators.",icon:"movie_creation",score:80,telemetry:"24 Practical Locations"}];return`
    ${F("Intelligence","Analyse Individually")}

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
          ${n.map(s=>`
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

    ${U("intelligence")}
  `}function Ot(t){const e=document.getElementById("analysis-filter-input");e&&(e.oninput=n=>{const s=n.target.value.toLowerCase().trim();document.querySelectorAll("#analysis-tiles-grid .analysis-tile").forEach(a=>{const l=a.getAttribute("data-keyword")||"";a.style.display=l.includes(s)?"flex":"none"})})}const Pe={pacing:{title:"Pacing Analysis",score:82,icon:"speed",desc:"Scene duration variance, narrative tempo and page-turn velocity.",questions:["Where does the pace drag in Act II?","Find scenes over 4 pages","Show action-to-dialogue ratios"],findings:[{scene:"SCENE 14 · Dockside Perimeter · Pg 36",act:"Act II",title:"Action beats slow down before major confrontation",desc:"Extended exposition between dock guards lowers tension prior to container breach.",targetScene:14},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Peak narrative rhythm",desc:"Fast intercut dialogue creates maximum urgency before floodgate breach.",targetScene:18},{scene:"SCENE 26 · Coastal Highway · Pg 68",act:"Act III",title:"High velocity turning point",desc:"Pursuit cadence maintains optimal beats per page.",targetScene:26}]},dialogue:{title:"Dialogue Analysis",score:89,icon:"chat",desc:"Cadence, subtext density, distinctive character voice profiles.",questions:["Are character voices distinctive?","Find on-the-nose exposition lines","Analyze dialogue subtext in Scene 18"],findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Subtext is understated and powerful",desc:"Kevin avoids speaking about his brother directly, communicating through silence and tea rituals.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Meera O.S. dialogue establishes authority",desc:"Radio chatter avoids fluff and communicates technical stakes concisely.",targetScene:18}]},emotion:{title:"Emotion Analysis",score:91,icon:"favorite",desc:"Catharsis trajectory, emotional resonance curves, character empathy indices.",questions:["Where does emotional vulnerability peak?","Track empathy trajectory for Kevin","Catharsis resolution in Act III"],findings:[{scene:"SCENE 12 · Father’s Workshop · Pg 28",act:"Act I",title:"Emotional anchor established",desc:"Familial debt and generational sacrifice ground Kevin’s reluctance to blow the whistle.",targetScene:12},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Desperation under rising water",desc:"Kevin’s fear of failing Meera is palpable as water rises past junction box.",targetScene:18}]},"character-arc":{title:"Character Arc Analysis",score:84,icon:"alt_route",desc:"Want vs. Need conflict, psychological transformation, fatal flaw resolution.",questions:["Does Kevin overcome his passivity?","Meera character transformation","Antagonist motivation clarity"],findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]},continuity:{title:"Continuity Analysis",score:78,icon:"linear_scale",desc:"Prop tracking, character spatial locations, timeline consistency checks.",questions:["Check prop handover in Scene 18","Is time of day consistent across Act II?","Track the brass seal location"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Hydro-sensor probe referenced before retrieval",desc:"Verify Kevin picked up copper probe in Scene 16 or carries it on belt.",targetScene:18},{scene:"SCENE 22 · Pumping Station · Pg 58",act:"Act II",title:"Flashlight state discrepancy",desc:"Ensure flashlight was retrieved after water surge in Scene 19.",targetScene:22}]},"story-structure":{title:"Story Structure Analysis",score:87,icon:"account_tree",desc:"Inciting incident, plot points, midpoint shift, climax architecture.",questions:["Is midpoint clearly defined?","Evaluate climax timing on page 88","Are 3-act beats aligned?"],findings:[{scene:"SCENE 06 · Customs Registry · Pg 14",act:"Inciting Incident",title:"Off-manifest container discovered",desc:"The inciting anomaly sets Kevin on irreversible investigative path.",targetScene:6},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Midpoint (Pg 48/96)",title:"Stakes escalate from civil to criminal",desc:"Kevin realizes his own brother commands the smuggling cartel.",targetScene:18}]},theme:{title:"Theme Analysis",score:90,icon:"lightbulb",desc:"Primary narrative spine: Complicity vs. Duty and moral accountability.",questions:["What is the central theme?","Where is loyalty tested?","Show recurring thematic motifs"],findings:[{scene:"SCENE 09 · Family Kitchen · Pg 22",act:"Act I",title:"Familial pressure as thematic catalyst",desc:"Kevin hides eviction notice, showing economic desperation fueling institutional silence.",targetScene:9},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Moral test faced directly",desc:"Kevin must decide whether to save his brother or save the port city from flooding.",targetScene:18},{scene:"SCENE 36 · Rooftop Overlook · Pg 94",act:"Act III",title:"Theme delivers its final statement",desc:"Accountability over self-preservation.",targetScene:36}]},cinema:{title:"Cinema & Visual Storytelling",score:85,icon:"videocam",desc:"Visual set-piece density, image systems, lighting and camera intentionality.",questions:["Check visual contrast between acts","Highlight cinematic set-pieces","Analyze color palette cues in action lines"],findings:[{scene:"SCENE 01 · Harbor Drone View · Pg 01",act:"Act I",title:"Strong establishing visual metaphor",desc:"Rusted shipping containers stacked like monoliths beneath smog.",targetScene:1},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"High visual tension",desc:"Red emergency beacons reflected in rising brackish water.",targetScene:18}]},scene:{title:"Scene Analysis",score:86,icon:"movie",desc:"Micro-structure of Scene 18: Objective, obstacle, polarity change.",questions:["What is the scene objective?","Where does tension peak?","How does polarity shift?"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]},formatting:{title:"Formatting & Guild Compliance",score:94,icon:"rule",desc:"Industry standard margin measurements, capitalization, slugline syntax.",questions:["Check standard industry margins","Find non-standard scene sluglines","Verify dialogue capitalization rules"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Perfect Courier Prime 12pt slugline",desc:"Margins, dual dialogue spacing, and transition tags meet Writers Guild standards.",targetScene:18}]},production:{title:"Production Breakdown",score:80,icon:"movie_creation",desc:"Locations, shooting days, practical elements, cast size breakdown.",questions:["How many practical locations?","Show scenes with special props","List one-off speaking roles"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Location: Wet Stage / Customs Interior",desc:"Requires controlled water flooding tank, hydro-sensor prop box, wet comm-link gear.",targetScene:18}]}};function Rt(t,e){const n=e.pages||96;switch(t){case"pacing":return`
        <!-- 1. PACING: Main Pacing Curve Graph -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">show_chart</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Timeline Pace</h2>
            </div>
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>${n} Pages Analyzed</span>
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
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Compliance across ${n} pages</span>
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
              Extracted practical elements across ${n} pages. Primary production weight resides in Act II harbor logistics and wet stage setups (Scenes 14–22).
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
      `;default:return""}}function _t(t="pacing"){const e=Pe[t]||Pe.pacing,n=d.state.selectedScriptId||"chronicles-of-dust",s=d.state.scripts.find(a=>a.id===n)||d.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",pages:96};return`
    ${F("Intelligence",e.title)}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- 1. SUB-HEADER NAVIGATION ROW -->
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

        <!-- Section Title Header -->
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[22px]">${e.icon}</span>
              <h1 class="font-heading text-xl font-bold text-slate-900 tracking-tight">${e.title}</h1>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${e.desc}</p>
          </div>
          <div class="flex flex-col items-end">
            <span class="text-2xl font-bold font-mono text-blue-600">${e.score}</span>
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
            ${e.questions.map(a=>`
              <button type="button" class="query-pill shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors shadow-xs active:scale-95" data-query="${a}">
                ${a}
              </button>
            `).join("")}
          </div>

          <!-- AI Answer Box -->
          <div id="vector-ai-answer" class="hidden bg-white border border-blue-100 rounded-xl p-3 text-xs text-slate-700 shadow-xs leading-relaxed"></div>
        </div>

        <!-- 3. SCORE CARD (GLOBAL REQUIRED STRUCTURE) -->
        <div class="bg-white rounded-2xl py-4 px-6 shadow-xs border border-slate-200/80 flex items-center justify-center">
          <div class="flex items-baseline gap-1.5">
            <span class="font-heading font-extrabold text-3xl sm:text-4xl text-blue-600 tracking-tight">${e.score}</span>
            <span class="text-xs font-semibold text-slate-400">/ 100 Index</span>
          </div>
        </div>

        <!-- 4. MAIN ANALYSIS VISUAL / CONTENT (MANDATORY & RESTORED) -->
        ${Rt(t,s)}

        <!-- 5. IMPORTANT FINDINGS (KEY SCENE FINDINGS) -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">Key Scene Findings</span>
            <span class="text-[11px] text-slate-400 font-medium">${e.findings.length} findings tracked</span>
          </div>

          ${e.findings.map(a=>`
            <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${a.scene}</span>
                <span class="text-[11px] font-medium text-slate-400">${a.act}</span>
              </div>
              <div class="flex flex-col">
                <h3 class="text-xs sm:text-sm font-bold text-slate-900">${a.title}</h3>
                <p class="text-xs text-slate-600 mt-1 leading-relaxed">${a.desc}</p>
              </div>
              <div class="pt-2 flex justify-end border-t border-slate-100">
                <!-- 6. OPEN IN EDITOR BUTTON -->
                <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${a.targetScene}">
                  <span class="material-symbols-outlined text-[15px]">edit_note</span>
                  <span>Open in Editor (Scene ${a.targetScene})</span>
                </button>
              </div>
            </div>
          `).join("")}
        </div>

      </div>
    </main>

    ${U("intelligence")}
  `}function Ft(t,e){const n=d.state.selectedScriptId||"chronicles-of-dust";document.querySelectorAll(".btn-open-editor-scene").forEach(i=>{i.onclick=()=>{const r=i.getAttribute("data-scene");d.setState({currentSceneId:r}),f(`Jumping to Scene ${r} in Editor`),e(`/editor/${n}?scene=${r}`)}}),document.querySelectorAll("[data-jump-scene]").forEach(i=>{i.onclick=()=>{const r=i.getAttribute("data-jump-scene");d.setState({currentSceneId:r}),f(`Jumping to Scene ${r} in Editor`),e(`/editor/${n}?scene=${r}`)}}),document.querySelectorAll("#char-arc-selector .char-pill").forEach(i=>{i.onclick=()=>{document.querySelectorAll("#char-arc-selector .char-pill").forEach(c=>{c.className="char-pill px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"}),i.className="char-pill active px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs";const r=i.getAttribute("data-char");f(`Switched active character focus to ${r==="meera"?"Meera":"Kevin"}`)}});const s=document.getElementById("vector-ai-input"),a=document.getElementById("vector-ai-submit"),l=document.getElementById("vector-ai-answer");async function o(i){if(!i||!l)return;l.classList.remove("hidden"),l.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing narrative beats...</span>';const r=await Me(i,n);l.textContent=r}a&&s&&(a.onclick=()=>o(s.value.trim()),s.onkeydown=i=>{i.key==="Enter"&&o(s.value.trim())}),document.querySelectorAll(".query-pill").forEach(i=>{i.onclick=()=>{const r=i.getAttribute("data-query");s&&(s.value=r),o(r)}})}function Ut(){const t=d.state.currentUser||{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return d.state.settings,`
    ${F("Profile","Account & preferences.")}

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

    ${U("profile")}
  `}function Ht(t){const e=document.getElementById("settings-search-input");e&&(e.oninput=g=>{const h=g.target.value.toLowerCase().trim();document.querySelectorAll("#settings-list .setting-item").forEach(w=>{const N=w.textContent.toLowerCase();w.style.display=N.includes(h)?"flex":"none"})}),document.querySelectorAll(".setting-item").forEach(g=>{g.onclick=()=>{const h=g.querySelector(".font-semibold")?.textContent;f(`${h} settings are up to date`)}});const n=document.getElementById("modal-edit-profile"),s=document.getElementById("trigger-modal-email"),a=document.getElementById("edit-avatar-btn"),l=document.getElementById("form-update-profile");function o(g){g?n?.classList.remove("hidden"):n?.classList.add("hidden")}s&&(s.onclick=()=>o(!0)),a&&(a.onclick=()=>o(!0)),document.querySelectorAll(".close-profile-modal").forEach(g=>g.onclick=()=>o(!1)),l&&(l.onsubmit=async g=>{g.preventDefault();const h=document.getElementById("prof-input-name").value,w=document.getElementById("prof-input-headline").value,N=document.getElementById("prof-input-email").value;await it({name:h,headline:w,email:N}),o(!1),f("Profile updated successfully"),t("/profile")});const i=document.getElementById("modal-security"),r=document.getElementById("trigger-modal-password"),c=document.getElementById("form-update-pw");function p(g){g?i?.classList.remove("hidden"):i?.classList.add("hidden")}r&&(r.onclick=()=>p(!0)),document.querySelectorAll(".close-security-modal").forEach(g=>g.onclick=()=>p(!1)),c&&(c.onsubmit=g=>{g.preventDefault(),p(!1),f("Password updated securely")});const m=document.getElementById("action-modal"),x=document.getElementById("action-modal-title"),v=document.getElementById("action-modal-desc"),E=document.getElementById("action-modal-icon"),S=document.getElementById("action-modal-icon-box"),y=document.getElementById("action-modal-confirm"),I=document.getElementById("action-modal-cancel");let b="signout";function B(g){b=g,g==="signout"?(x.textContent="Sign Out",v.textContent="Are you sure you want to end your active session on this device?",E.textContent="logout",S.className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center",y.className="flex-1 h-10 px-4 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900",y.textContent="Sign Out"):(x.textContent="Delete Account",v.textContent="This action will permanently delete your portfolio, scripts, and collaborator access. This cannot be undone.",E.textContent="warning",S.className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center",y.className="flex-1 h-10 px-4 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700",y.textContent="Delete Forever"),m?.classList.remove("hidden")}document.getElementById("btn-trigger-signout")?.addEventListener("click",()=>B("signout")),document.getElementById("btn-trigger-delete-acc")?.addEventListener("click",()=>B("delete")),I&&(I.onclick=()=>m?.classList.add("hidden")),y&&(y.onclick=async()=>{m?.classList.add("hidden"),b==="signout"?(await de(),d.setState({currentUser:null}),f("Signed out of Scriptora"),t("/auth")):(await de(),d.setState({currentUser:null,scripts:[]}),f("Account deleted"),t("/auth"))})}function Vt(){const t=d.state.selectedScriptId||"chronicles-of-dust",e=d.state.scripts.find(n=>n.id===t)||d.state.scripts[0]||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",joinCode:"A7K9-XP42"};return`
    ${F("Profile","Collaborators")}

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
            ${d.state.scripts.map(n=>`
              <button class="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors switch-script-opt" data-id="${n.id}">
                <div class="flex flex-col">
                  <span class="text-xs font-semibold text-slate-900">${n.title}</span>
                  <span class="text-[10px] text-slate-500">${n.format||"Feature"} · ${n.draft||"Draft 1.0"}</span>
                </div>
                ${n.id===e.id?'<span class="material-symbols-outlined text-blue-600 text-[16px]">check</span>':""}
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

    ${U("profile")}
  `}function qt(t){const e=d.state.selectedScriptId||"chronicles-of-dust";let n="A7K9-XP42";async function s(){const h=await Qe(e),w=document.getElementById("collaborators-list");if(w){if(h.length===0){w.innerHTML='<div class="p-4 text-center text-xs text-slate-400">No external collaborators yet. Share your join code to invite teammates.</div>';return}w.innerHTML=h.map(N=>`
      <div class="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
        <div class="flex items-center gap-3 min-w-0 pr-2">
          <div class="w-9 h-9 rounded-full ${N.avatarBg||"bg-blue-100 text-blue-700"} flex items-center justify-center font-bold text-xs shrink-0">
            ${N.initials}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-slate-900 truncate">${N.name}</span>
            <span class="text-[11px] text-slate-500 truncate">${N.email}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">${N.role}</span>
          <button class="remove-collab-btn text-slate-400 hover:text-red-600 p-1" data-id="${N.id}" title="Remove access">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".remove-collab-btn").forEach(N=>{N.onclick=async()=>{const H=N.getAttribute("data-id");confirm("Remove collaborator access for this user?")&&(await et(e,H),f("Collaborator access removed"),s())}})}}s();const a=document.getElementById("projectSelectBtn"),l=document.getElementById("projectDropdown");a&&(a.onclick=()=>l?.classList.toggle("hidden")),document.querySelectorAll(".switch-script-opt").forEach(h=>{h.onclick=()=>{const w=h.getAttribute("data-id");d.selectScript(w),l?.classList.add("hidden"),t("/profile/collaborators")}});const o=document.getElementById("openInviteBtn"),i=document.getElementById("closeInviteBtn"),r=document.getElementById("inviteCard"),c=document.getElementById("sendInviteBtn");o&&(o.onclick=()=>r?.classList.remove("hidden")),i&&(i.onclick=()=>r?.classList.add("hidden")),c&&(c.onclick=async()=>{const h=document.getElementById("inviteEmailInput")?.value.trim(),w=document.querySelector('input[name="inviteRole"]:checked')?.value||"editor";h&&(await Ze(e,{email:h,role:w}),f(`Invited ${h} as ${w}`),r?.classList.add("hidden"),s())});const p=document.getElementById("tabGenCodeBtn"),m=document.getElementById("tabEnterCodeBtn"),x=document.getElementById("paneGenerateCode"),v=document.getElementById("paneEnterCode");p&&(p.onclick=()=>{p.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",m.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",x?.classList.remove("hidden"),v?.classList.add("hidden")}),m&&(m.onclick=()=>{m.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",p.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",v?.classList.remove("hidden"),x?.classList.add("hidden")});const E=document.getElementById("copyJoinCodeBtn"),S=document.getElementById("copyJoinCodeLabel");E&&(E.onclick=()=>{const h=document.getElementById("displayJoinCode")?.textContent||n;navigator.clipboard?.writeText(h),S.textContent="Copied!",setTimeout(()=>{S.textContent="Copy"},1800),f(`Copied code: ${h}`)});const y=document.getElementById("regenJoinCodeBtn");y&&(y.onclick=async()=>{const h=await tt(e);n=h;const w=document.getElementById("displayJoinCode");w&&(w.textContent=h),f(`Generated new join code: ${h}`)});const I=document.getElementById("verifyCodeBtn"),b=document.getElementById("joinCodeInput"),B=document.getElementById("joinCodeResultCard"),g=document.getElementById("confirmJoinScriptBtn");b&&(b.oninput=h=>{let w=h.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"");w.length>4&&(w=w.slice(0,4)+"-"+w.slice(4,8)),h.target.value=w}),I&&b&&(I.onclick=async()=>{const h=b.value.trim();if(!h)return;I.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>';const w=await st(h);I.innerHTML="<span>Verify</span>",w.valid?(B?.classList.remove("hidden"),document.getElementById("verifiedScriptTitle").textContent=w.script.title,document.getElementById("verifiedScriptFormat").textContent=`${w.script.format} · ${w.script.pages} pages`,f("Valid join code")):(B?.classList.add("hidden"),f("Invalid or expired join code","error"))}),g&&b&&(g.onclick=async()=>{const h=b.value.trim();await nt(h),f("Successfully joined screenplay workspace!"),t("/workspace")})}function Gt(){const t=d.state.currentUser?.initials||"JD";return`
    <div class="flex flex-col min-h-screen bg-surface w-full relative">
      <!-- Fixed Header with Back Button and Mark Read Action -->
      <header class="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl border-b border-slate-100 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div class="px-4 py-2.5 flex items-center justify-between max-w-2xl mx-auto">
          <div class="flex items-center gap-2">
            <button aria-label="Go back" id="btn-back-notif" class="w-9 h-9 -ml-1 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors">
              <span class="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div class="flex items-center gap-2">
              <img src="${ee}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora" class="w-6 h-6 object-contain shrink-0" />
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
              ${t}
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
  `}function Jt(t){const e=document.getElementById("btn-back-notif");e&&(e.onclick=()=>{const m=d.getPreviousRoute("/workspace");t(m)});let n="all",s="normal",a=[];async function l(){const m=document.getElementById("notif-feed-container");if(!m)return;if(s==="loading"){m.innerHTML=`
        <div class="space-y-3 animate-pulse">
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
        </div>
      `;return}if(s==="error"){m.innerHTML=`
        <div class="p-6 bg-white border border-red-200 rounded-2xl flex flex-col items-center text-center gap-2">
          <span class="material-symbols-outlined text-3xl text-red-500">wifi_off</span>
          <h3 class="font-bold text-sm text-slate-900">Sync Connection Lost</h3>
          <p class="text-xs text-slate-500 max-w-xs">Unable to refresh notification stream. Please check network connection.</p>
          <button id="btn-retry-sync" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-xs hover:bg-blue-700">
            Retry Connection
          </button>
        </div>
      `,document.getElementById("btn-retry-sync")?.addEventListener("click",()=>{s="normal",l()});return}if(a=(await Le()).notifications||[],s==="empty"||n==="unread"&&a.filter(b=>b.unread).length===0){m.innerHTML=`
        <div class="p-8 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center text-center gap-2">
          <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <h3 class="font-bold text-sm text-slate-900">You’re all caught up!</h3>
          <p class="text-xs text-slate-500 max-w-xs">No pending notifications or requests requiring your review.</p>
        </div>
      `;return}const v=a.filter(b=>b.unread).length;document.getElementById("badge-all-count").textContent=a.length,document.getElementById("badge-unread-count").textContent=v,d.setState({unreadNotifications:v});let E=a;n==="unread"&&(E=E.filter(b=>b.unread));const S=E.filter(b=>b.group==="today"),y=E.filter(b=>b.group!=="today");function I(b,B){return B.length===0?"":`
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-xs font-bold text-slate-400 tracking-wider uppercase font-heading">${b}</h2>
          </div>
          <div class="flex flex-col gap-2">
            ${B.map(g=>`
              <div class="notif-row relative flex items-start gap-3 p-3.5 rounded-xl bg-white border ${g.unread?"border-l-4 border-l-blue-600 border-slate-200/80 shadow-xs":"border-slate-200/60 opacity-80"} hover:shadow-sm transition-all cursor-pointer" data-id="${g.id}" data-route="${g.actionRoute}">
                <div class="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                  ${g.sender.startsWith("icon:")?`<span class="material-symbols-outlined text-[18px] text-blue-600">${g.sender.replace("icon:","")}</span>`:g.sender}
                </div>
                <div class="flex flex-col flex-1 min-w-0">
                  <div class="flex items-baseline justify-between gap-2">
                    <h3 class="text-xs font-bold text-slate-900 truncate">${g.title}</h3>
                    <span class="text-[10px] text-slate-400 shrink-0">${g.time}</span>
                  </div>
                  <p class="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">${g.body}</p>
                  <div class="mt-2 flex items-center gap-1.5 flex-wrap">
                    ${(g.tags||[]).map(h=>`<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">${h}</span>`).join("")}
                    <span class="text-blue-600 text-[11px] font-semibold ml-auto">${g.actionLabel||"View →"}</span>
                  </div>
                </div>
                ${g.unread?'<div class="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1"></div>':""}
              </div>
            `).join("")}
          </div>
        </div>
      `}m.innerHTML=I("Today",S)+I("Earlier",y),document.querySelectorAll(".notif-row").forEach(b=>{b.onclick=async()=>{const B=parseInt(b.getAttribute("data-id")),g=b.getAttribute("data-route");await at(B),await d.refreshNotifications(),g?t(g):l()}})}l();const o=document.getElementById("filter-all-btn"),i=document.getElementById("filter-unread-btn");o&&(o.onclick=()=>{n="all",o.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",i.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",l()}),i&&(i.onclick=()=>{n="unread",i.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",o.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",l()});const r=document.getElementById("btn-mark-all-read");r&&(r.onclick=async()=>{await lt(),await d.refreshNotifications(),f("All notifications marked as read"),l()});const c=document.getElementById("btn-toggle-sim"),p=document.getElementById("sim-menu-dropdown");c&&(c.onclick=()=>p?.classList.toggle("hidden")),document.querySelectorAll(".sim-opt").forEach(m=>{m.onclick=()=>{s=m.getAttribute("data-state"),p?.classList.add("hidden"),l(),f(`Simulating ${s} state`)}})}class Wt{constructor(){this.appEl=null,this.currentPath=null}getBasePath(){return window.location.pathname.toLowerCase().startsWith("/scriptora")?"/Scriptora":""}getCurrentLocation(){return window.location.hash&&window.location.hash.startsWith("#/")?window.location.hash.slice(1):window.location.pathname+window.location.search}init(e="#app"){if(this.appEl=document.querySelector(e),!this.appEl){console.error(`Mount element ${e} not found.`);return}document.body.addEventListener("click",n=>{const s=n.target.closest("a");if(s&&s.href&&s.origin===window.location.origin&&!s.hasAttribute("download")&&s.getAttribute("target")!=="_blank"&&!s.getAttribute("rel")?.includes("external")){const a=new URL(s.href),l=a.pathname+a.search+a.hash;l.startsWith("/api")||(n.preventDefault(),this.navigate(l))}}),window.addEventListener("popstate",()=>{this.resolve(this.getCurrentLocation())}),window.addEventListener("hashchange",()=>{this.resolve(this.getCurrentLocation())}),this.resolve(this.getCurrentLocation())}navigate(e,n=!1){this.currentPath&&d.pushHistory(this.currentPath);const s=this.getBasePath(),a=s&&e.toLowerCase().startsWith(s.toLowerCase())?e.slice(s.length)||"/":e,l=s&&!e.startsWith(s)?`${s}${a.startsWith("/")?"":"/"}${a}`:e;n?window.history.replaceState(null,"",l):window.history.pushState(null,"",l),this.resolve(a)}resolve(e){const[n,s]=e.split("?");let a=n.replace(/\/+$/,"")||"/";const l=this.getBasePath();l&&a.toLowerCase().startsWith(l.toLowerCase())&&(a=a.slice(l.length)||"/"),a.startsWith("/")||(a="/"+a);const o=new URLSearchParams(s||"");this.currentPath=e;const i=!!d.state.currentUser;if(!i&&!["/welcome","/auth"].includes(a)){this.navigate("/auth",!0);return}if(i&&a==="/auth"){this.navigate("/workspace",!0);return}if(a==="/"){i?this.navigate("/workspace",!0):this.navigate("/welcome",!0);return}if(a==="/welcome"){this.render(xt(),()=>ft(this.navigate.bind(this)));return}if(a==="/auth"){this.render(pt(),()=>ut(this.navigate.bind(this)));return}if(a==="/workspace"){this.render(mt(),()=>bt(this.navigate.bind(this)));return}if(a==="/editor"){const c=d.state.selectedScriptId||"chronicles-of-dust",p=o.get("scene");this.navigate(`/editor/${c}${p?`?scene=${p}`:""}`,!0);return}if(a.startsWith("/editor/")){const c=a.split("/")[2],p=o.get("scene");d.setState({selectedScriptId:c}),this.render(gt(c,p),()=>ht(c,this.navigate.bind(this)));return}if(a==="/intelligence"||a==="/intelligence/select"){this.render(Nt(),()=>Pt(this.navigate.bind(this)));return}if(a==="/intelligence/context"){this.render(jt(),()=>$t(this.navigate.bind(this)));return}if(a==="/intelligence/dashboard"||a==="/intelligence/overview"){this.render(Lt(),()=>Mt(this.navigate.bind(this)));return}if(a==="/intelligence/analysis"||a==="/intelligence/analysis/select"){this.render(Dt(),()=>Ot(this.navigate.bind(this)));return}if(a.startsWith("/intelligence/analysis/")){const c=a.split("/")[3]||"pacing";this.render(_t(c),()=>Ft(c,this.navigate.bind(this)));return}if(a==="/profile"){this.render(Ut(),()=>Ht(this.navigate.bind(this)));return}if(a==="/profile/collaborators"){this.render(Vt(),()=>qt(this.navigate.bind(this)));return}if(a==="/notifications"){this.render(Gt(),()=>Jt(this.navigate.bind(this)));return}this.renderNotFound(a)}render(e,n){if(this.appEl&&(this.appEl.innerHTML=e,window.scrollTo({top:0,behavior:"instant"}),typeof n=="function"))try{n()}catch(s){console.error("Error attaching screen events:",s)}}renderNotFound(e){this.appEl.innerHTML=`
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
    `;const n=document.getElementById("notfound-home");n&&(n.onclick=()=>this.navigate("/workspace"))}}const Kt=new Wt;async function je(){try{await d.init(),Kt.init("#app"),window.addEventListener("online",()=>{f("Back online. Synchronizing changes..."),d.refreshScripts(),d.refreshNotifications()}),window.addEventListener("offline",()=>{f("Offline mode active. Edits saved locally.","info")}),console.log("Scriptora initialized successfully in production-ready mode.")}catch(t){console.error("Scriptora bootstrap failed:",t)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",je):je();
