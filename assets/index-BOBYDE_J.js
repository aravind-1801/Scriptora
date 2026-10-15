(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const zs="http://localhost:8000/api";async function B(e,t={}){const s=`${zs}${e}`,a={headers:{"Content-Type":"application/json",...t.headers},...t};try{const n=await fetch(s,a);if(!n.ok){const o=await n.json().catch(()=>({}));throw new Error(o.error||`HTTP error ${n.status}`)}return await n.json()}catch(n){throw console.warn(`API call ${e} failed, falling back to local store:`,n.message),n}}const Lt=[{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",industry:"International / Hollywood",pages:96,updated:"12m ago",currentScene:"Scene 18",isCurrentDraft:!0,archived:!1,joinCode:"A7K9-XP42",logline:"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.",synopsis:"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves.",context:{format:"Feature",industry:"International / Hollywood",hours:1,minutes:36,seconds:0,plannedDuration:"01:36:00"},analysisScores:{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80}},{id:"the-neon-horizon",title:"The Neon Horizon",draft:"Draft 2.1",genre:"Sci-Fi",format:"Pilot",industry:"Streaming Television",pages:62,updated:"2h ago",currentScene:"Scene 4",isCurrentDraft:!1,archived:!1,joinCode:"N3ON-H0RZ",context:{format:"Pilot",industry:"Streaming Television",hours:0,minutes:52,seconds:0,plannedDuration:"00:52:00"},analysisScores:{overall:79,pacing:75,dialogue:84,emotion:80,characterArc:78,continuity:82,storyStructure:76,theme:88,cinema:83,formatting:90,production:72}},{id:"velvet-shadows",title:"Velvet Shadows",draft:"Draft 1.0",genre:"Noir",format:"Feature",industry:"Independent / Festival",pages:114,updated:"Yesterday",currentScene:"Scene 1",isCurrentDraft:!1,archived:!1,joinCode:"V3LV-SHDW",analysisScores:{overall:81,pacing:80,dialogue:86,emotion:79,characterArc:85,continuity:80,storyStructure:82,theme:84,cinema:88,formatting:92,production:76}},{id:"silent-echoes",title:"Silent Echoes",draft:"Draft 3.0",genre:"Psychological Thriller",format:"Feature",industry:"International / Hollywood",pages:104,updated:"3d ago",currentScene:"Scene 22",isCurrentDraft:!1,archived:!1,joinCode:"SLNT-ECH0",analysisScores:{overall:84,pacing:86,dialogue:81,emotion:88,characterArc:83,continuity:85,storyStructure:89,theme:82,cinema:84,formatting:91,production:78}},{id:"glass-kingdoms",title:"Glass Kingdoms",draft:"Draft 1.4",genre:"Fantasy",format:"Pilot",industry:"Streaming Television",pages:58,updated:"1w ago",currentScene:"Scene 8",isCurrentDraft:!1,archived:!1,joinCode:"GLSS-KNGD",analysisScores:{overall:78,pacing:74,dialogue:80,emotion:76,characterArc:82,continuity:75,storyStructure:80,theme:86,cinema:82,formatting:88,production:70}},{id:"red-shift",title:"Red Shift",draft:"Draft 2.0",genre:"Action",format:"Short",industry:"Independent / Festival",pages:28,updated:"2w ago",currentScene:"Scene 5",isCurrentDraft:!1,archived:!1,joinCode:"RED2-SHFT",analysisScores:{overall:83,pacing:90,dialogue:78,emotion:75,characterArc:80,continuity:88,storyStructure:84,theme:80,cinema:89,formatting:95,production:82}}];async function As(){try{return(await B("/auth/me")).user}catch{const e=localStorage.getItem("scriptora_user");if(e)try{const s=JSON.parse(e);if(s&&s.displayName)return s}catch{}const t={id:"user-1",name:"Arun Kumar",displayName:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function Ys(e){try{const t=await B("/auth/login",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-1",name:e.email?e.email.split("@")[0]:"Arun Kumar",displayName:e.email?e.email.split("@")[0]:"Arun Kumar",email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Narrative Director",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function Xs(e={}){try{const t=await B("/auth/login",{method:"POST",body:JSON.stringify({...e,provider:"google"})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t=e.displayName||e.name||(e.email?e.email.split("@")[0]:"Google Filmmaker"),s=t.split(" ").map(n=>n[0]).filter(Boolean).slice(0,2).join("").toUpperCase()||"GF",a={id:e.sub||`google-${Date.now()}`,name:t,displayName:t,email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Film Director",badge:"Member Pro",initials:s,avatar:e.picture||e.photoURL||null,avatarUrl:e.picture||e.photoURL||null,provider:"google",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(a)),a}}async function Zs(e){try{const t=await B("/auth/register",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:`user-${Date.now()}`,name:e.name||"New Writer",displayName:e.name||"New Writer",email:e.email||"writer@scriptora.studio",headline:"Screenwriter",badge:"Member Pro",initials:(e.name||"NW").slice(0,2).toUpperCase(),stats:{drafts:1,coAuthors:0,healthIndex:"100%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function Qs(e){try{const t=await B("/auth/otp",{method:"POST",body:JSON.stringify({phone:e})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-phone",name:"Verified Writer",displayName:"Verified Writer",headline:"Screenwriter",email:e,badge:"Member Pro",initials:"VW",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function Xt(){try{await B("/auth/logout",{method:"POST"})}catch{}return localStorage.removeItem("scriptora_user"),!0}async function _e(e=""){try{const a=e?`/scripts?q=${encodeURIComponent(e)}`:"/scripts",n=await B(a);if(n.scripts&&n.scripts.length>0)return localStorage.setItem("scriptora_scripts",JSON.stringify(n.scripts)),n.scripts}catch{}const t=localStorage.getItem("scriptora_scripts");let s;if(t)try{s=JSON.parse(t),(!Array.isArray(s)||s.length===0)&&(s=[...Lt],localStorage.setItem("scriptora_scripts",JSON.stringify(s)))}catch{s=[...Lt],localStorage.setItem("scriptora_scripts",JSON.stringify(s))}else s=[...Lt],localStorage.setItem("scriptora_scripts",JSON.stringify(s));return e&&(s=s.filter(a=>a.title.toLowerCase().includes(e.toLowerCase()))),s}async function ns(e){try{const s=await B(`/scripts/${e}`);if(s.script)return s.script}catch{}const t=await _e();return t.find(s=>s.id===e)||Lt.find(s=>s.id===e)||t[0]||null}async function ea(e){try{const n=await B("/scripts",{method:"POST",body:JSON.stringify(e)});if(n.script){const o=await _e();return localStorage.setItem("scriptora_scripts",JSON.stringify([n.script,...o.filter(l=>l.id!==n.script.id)])),n.script}}catch{}const t={id:(e.title||"untitled").toLowerCase().replace(/[^a-z0-9]+/g,"-"),title:e.title||"Untitled Screenplay",draft:"Draft 1.0",genre:e.genre||"Drama",format:e.format||"Feature",industry:e.industry||"International / Hollywood",pages:1,updated:"Just now",currentScene:"Scene 1",joinCode:"SCRP-1001",archived:!1,context:{format:e.format||"Feature",industry:e.industry||"International / Hollywood",hours:1,minutes:30,seconds:0,plannedDuration:"01:30:00"},analysisScores:{overall:80,pacing:78,dialogue:80,emotion:80,characterArc:78,continuity:80,storyStructure:80,theme:80,cinema:80,formatting:90,production:75}},s=await _e(),a=[t,...s.filter(n=>n.id!==t.id)];return localStorage.setItem("scriptora_scripts",JSON.stringify(a)),t}async function ta(e,t){try{const n=await B(`/scripts/${e}`,{method:"PUT",body:JSON.stringify(t)});if(n.script){const l=(await _e()).map(i=>i.id===e?n.script:i);return localStorage.setItem("scriptora_scripts",JSON.stringify(l)),n.script}}catch{}const a=(await _e()).map(n=>n.id===e?{...n,...t,updated:"Just now"}:n);return localStorage.setItem("scriptora_scripts",JSON.stringify(a)),{id:e,...t,updated:"Just now"}}async function sa(e){try{await B(`/scripts/${e}`,{method:"DELETE"})}catch{}const s=(await _e()).filter(a=>a.id!==e);return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),{success:!0}}async function aa(e){try{const o=await B(`/scripts/${e}/duplicate`,{method:"POST"});if(o.script){const l=await _e();return localStorage.setItem("scriptora_scripts",JSON.stringify([o.script,...l])),o.script}}catch{}const t=await ns(e),s={...t,id:`${e}-copy-${Date.now().toString().slice(-4)}`,title:`${t?.title||"Script"} (Copy)`,updated:"Just now"},a=await _e(),n=[s,...a];return localStorage.setItem("scriptora_scripts",JSON.stringify(n)),s}async function na(e){try{await B(`/scripts/${e}/archive`,{method:"POST"})}catch{}const s=(await _e()).map(a=>a.id===e?{...a,archived:!0,updated:"Just now"}:a);return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),{success:!0}}const os={id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pageCount:5,wordCount:14280,titlePage:{title:"CHRONICLES OF DUST",author:"Arun Kumar",contact:"Scriptora Studio · arun.kumar@scriptora.studio · +1 (555) 019-2834",notes:"An original screenplay. Draft 4.2 Production Cut."},settings:{sceneNumbers:!0,sceneNumberSide:"left",smartFormatting:!0,fontSize:"12pt",lineSpacing:"1.5",language:"English"},acts:[{id:"act-1",name:"ACT I - The Broken Siphon"},{id:"act-2",name:"ACT II - The Pressure Surge"},{id:"act-3",name:"ACT III - The Floodgate Standoff"}],characters:["KEVIN","MEERA","HARI","AKASH"],locations:["INT. HOME","INT. PORT AUDIT ROOM","INT. CUSTOMS OFFICE","EXT. FLOODGATE GANTRY"],times:["DAY","NIGHT","CONTINUOUS","DAWN","DUSK","LATER","MORNING","EVENING"],transitions:["CUT TO:","FADE IN:","FADE OUT.","DISSOLVE TO:","SMASH CUT TO:","MATCH CUT TO:","JUMP CUT TO:"],scenes:[{id:"scene-1",number:1,actId:"act-1",slugline:"INT. HOME - EVENING",blocks:[{id:"b-1-1",type:"scene",content:"INT. HOME - EVENING"},{id:"b-1-2",type:"action",content:"There stands a woman."},{id:"b-1-3",type:"character",content:"HARI"},{id:"b-1-4",type:"dialogue",content:"Who is that?"},{id:"b-1-5",type:"character",content:"AKASH"},{id:"b-1-6",type:"dialogue",content:"How do I know?"},{id:"b-1-7",type:"action",content:"Both leaves the place."}]},{id:"scene-4",number:4,actId:"act-1",slugline:"INT. PORT AUDIT ROOM - DAY",blocks:[{id:"b-4-1",type:"scene",content:"INT. PORT AUDIT ROOM - DAY"},{id:"b-4-2",type:"action",content:"Kevin stamps irregular cargo manifests to keep peace with union superiors."},{id:"b-4-3",type:"character",content:"KEVIN"},{id:"b-4-4",type:"dialogue",content:"The manifests are sealed."}]},{id:"scene-18",number:18,actId:"act-2",slugline:"INT. CUSTOMS OFFICE - NIGHT",blocks:[{id:"b-18-1",type:"scene",content:"INT. CUSTOMS OFFICE - NIGHT"},{id:"b-18-2",type:"action",content:"Kevin kneels over the cracked hydro-sensor junction box. Static hiss whispers through the damp comm-link. A lone flicker illuminates the tarnished brass seal."},{id:"b-18-3",type:"action",content:"Water droplets bead along the corroded circuit wires. He slides a copper probe between the connectors."},{id:"b-18-4",type:"character",content:"KEVIN"},{id:"b-18-5",type:"parenthetical",content:"(whispering into comm)"},{id:"b-18-6",type:"dialogue",content:"If the seals break before dawn, the sector won't hold the surge."},{id:"b-18-7",type:"character",content:"MEERA (O.S.)"},{id:"b-18-8",type:"dialogue",content:"Then don't let them break. Reroute the secondary relay through the floodgate breaker."},{id:"b-18-9",type:"transition",content:"CUT TO:"}]}]};async function oa(e){try{const a=await B(`/screenplay/${e}`);if(a.screenplay&&a.screenplay.scenes&&a.screenplay.scenes.length>0)return a.screenplay}catch{}const t=localStorage.getItem(`scriptora_screenplay_${e}`);if(t)try{const a=JSON.parse(t);if(a&&a.scenes&&a.scenes.length>0)return a}catch{}const s=JSON.parse(JSON.stringify(os));return s.id=e||"script_01",localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(s)),s}async function la(e,t){localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(t));try{return await B(`/screenplay/${e}`,{method:"PUT",body:JSON.stringify({screenplay:t})})}catch{return{success:!0}}}async function ia(e){try{return(await B(`/versions/${e}`)).versions}catch{return[{id:"v-4.2",name:"Draft 4.2",tag:"Current Active",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:"Refined Meera O.S. dialogue and hydro-sensor action line.",isCurrent:!0},{id:"v-3.0",name:"Draft 3.0",tag:"Production Polish",timestamp:"Yesterday, 4:15 PM",author:"JD",stats:"94 pages · 13,950 words",notes:"Incorporated director notes on floodgate transition pacing.",isCurrent:!1},{id:"v-2.0",name:"Draft 2.0",tag:"First Table Read",timestamp:"Oct 12, 2024",author:"JD",stats:"90 pages · 13,200 words",notes:"Table read revision for Acts I & II character arcs.",isCurrent:!1}]}}async function ra(e,t){try{return(await B(`/versions/${e}`,{method:"POST",body:JSON.stringify(t)})).version}catch{return{id:`v-${Date.now()}`,name:t.name,tag:"Milestone Snapshot",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:t.notes||"",isCurrent:!0}}}async function ca(e){try{return(await B(`/collaborators/${e}`)).collaborators}catch{return[{id:"c-1",name:"Heamanth S.",email:"heamanth@studio.com",initials:"HS",role:"Editor",avatarBg:"bg-blue-100 text-blue-700",status:"Active",added:"2d ago"},{id:"c-2",name:"Elena Rostova",email:"elena@cineworks.io",initials:"ER",role:"Script Doctor",avatarBg:"bg-amber-100 text-amber-700",status:"Active",added:"1w ago"},{id:"c-3",name:"Marcus Vance",email:"vance.prod@paramount.com",initials:"MV",role:"Producer",avatarBg:"bg-purple-100 text-purple-700",status:"Viewer",added:"2w ago"}]}}async function da(e,t){try{return(await B(`/collaborators/${e}/invite`,{method:"POST",body:JSON.stringify(t)})).collaborator}catch{return{id:`c-${Date.now()}`,name:t.email.split("@")[0],email:t.email,initials:t.email.substring(0,2).toUpperCase(),role:t.role==="editor"?"Editor":"Viewer",avatarBg:"bg-emerald-100 text-emerald-700",status:"Active",added:"Just now"}}}async function pa(e,t){try{return await B(`/collaborators/${e}/${t}`,{method:"DELETE"})}catch{return{success:!0}}}async function ua(e){try{return(await B("/join-code/generate",{method:"POST",body:JSON.stringify({scriptId:e})})).joinCode}catch{return Math.random().toString(36).substring(2,6).toUpperCase()+"-"+Math.random().toString(36).substring(2,6).toUpperCase()}}async function xa(e){try{return await B("/join-code/validate",{method:"POST",body:JSON.stringify({code:e})})}catch{return(e||"").toUpperCase().trim()==="A7K9-XP42"?{valid:!0,script:{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",pages:96,collaboratorCount:3}}:{valid:!1,error:"Invalid or expired join code"}}}async function ma(e){try{return await B("/join-code/redeem",{method:"POST",body:JSON.stringify({code:e})})}catch{return{success:!0,scriptId:"chronicles-of-dust",title:"Chronicles of Dust"}}}async function Ts(){try{return await B("/notifications")}catch{return{notifications:[{id:1,sender:"HS",senderName:"Heamanth",type:"collaboration_invite",title:"Heamanth invited you to collaborate",body:'Added you as an Editor on "Chronicles of Dust" (Draft 4.2).',time:"12m ago",group:"today",unread:!0,tags:["Draft 4.2","Role: Editor"],actionLabel:"Review Access →",actionRoute:"/profile/collaborators"},{id:2,sender:"icon:description",type:"export_ready",title:"Your export is ready",body:'"Chronicles of Dust (Draft 4.2)" exported as standard Industry PDF.',time:"45m ago",group:"today",unread:!0,tags:["PDF","96 Pages"],actionLabel:"Open Screenplay →",actionRoute:"/editor/chronicles-of-dust"},{id:3,sender:"AK",senderName:"Arun K.",type:"join_code_request",title:"Join-code access request",body:'Requested Editor access to "Anbin Mozhi" via join-code A7K9-XP42.',time:"2h ago",group:"today",unread:!0,tags:["Code: A7K9-XP42"],actionLabel:"Manage Collaborators →",actionRoute:"/profile/collaborators"}],unreadCount:3}}}async function fa(e){try{return await B(`/notifications/${e}/read`,{method:"POST"})}catch{return{success:!0}}}async function ba(){try{return await B("/notifications/read-all",{method:"POST"})}catch{return{success:!0}}}async function fs(){return(await Ts()).unreadCount||0}async function Wt(e){try{const t=await B("/profile",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.profile)),t.profile}catch{const s={...await As()||{},...e};if(e.name){const a=e.name.trim().split(/\s+/);s.initials=((a[0]?.[0]||"A")+(a[1]?.[0]||"")).toUpperCase(),s.displayName=e.name}return localStorage.setItem("scriptora_user",JSON.stringify(s)),s}}async function $s(){try{return(await B("/settings")).settings}catch{const e=localStorage.getItem("scriptora_settings");return e?JSON.parse(e):{editor:{autoSceneHeading:!0,autoCharacter:!0,autoTransition:!0,enterAfterAction:!0,tabAfterAction:!0,autoCapitalize:!0,continueDialogue:!0,showSceneNumbers:!0,lockSceneNumbers:!1,fontSize:"Courier Prime 12pt",lineSpacing:"1.5 line",focusMode:!1},language:"English (US)",appearance:"Light",notifications:{collaborationInvites:!0,collaborationEdits:!0,mentions:!0,versionMilestones:!0},intelligence:{querySuggestions:!0,analysisSuggestions:!0}}}}async function ga(e){try{const t=await B("/settings",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_settings",JSON.stringify(t.settings)),t.settings}catch{const s={...await $s(),...e};return localStorage.setItem("scriptora_settings",JSON.stringify(s)),s}}async function ha(e,t){try{return(await B(`/intelligence/${e}/context`,{method:"PUT",body:JSON.stringify(t)})).context}catch{return t}}async function ls(e,t){try{return(await B("/intelligence/query",{method:"POST",body:JSON.stringify({query:e,scriptId:t})})).answer}catch{return"Analysis: In this screenplay, scene tempo and dialogue density align with core narrative milestones. Characters express distinct agendas in each beat."}}async function Ht(e="chronicles-of-dust"){try{const n=await B(`/production/${e}`);if(n?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n.workspace)),n.workspace}catch{}const t=localStorage.getItem(`scriptora_prod_ws_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=await ns(e),a={id:`prod-ws-${e}`,projectId:"proj-1",projectName:"Badlands Anthology",scriptId:e,screenplayTitle:s?.title||"Chronicles of Dust",pinnedSourceVersion:s?.draft||"Draft 4.2",pinnedSourceVersionHash:"v4.2-snap-88f2",pinnedTimestamp:"12m ago",currentScriptDraft:s?.draft||"Draft 4.2",isStale:!1,mode:localStorage.getItem("scriptora_prod_mode")||"simple",userRole:localStorage.getItem("scriptora_prod_role")||"Owner",roles:["Owner","Director","Assistant Director","Production","Department Member","Viewer"],stats:{totalScenes:18,breakdownElements:78,callSheetsCount:2,shootingDays:14,pendingProposals:2,completedApprovals:6},updatedAt:new Date().toISOString()};return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(a)),a}async function bs(e,t){try{const n=await B(`/production/${e}`,{method:"PUT",body:JSON.stringify(t)});if(n?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n.workspace)),n.workspace}catch{}const a={...await Ht(e),...t,updatedAt:new Date().toISOString()};return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(a)),a}async function va(e,t){try{const a=await B(`/production/${e}/pin`,{method:"POST",body:JSON.stringify({version:t})});if(a?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(a.workspace)),a.workspace}catch{}const s=await Ht(e);return s.pinnedSourceVersion=t,s.pinnedTimestamp="Just now",s.isStale=!1,localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(s)),s}async function Zt(e="chronicles-of-dust",t=null){try{const n=`/production/${e}/resources${t?`?category=${encodeURIComponent(t)}`:""}`,o=await B(n);if(o?.resources)return localStorage.setItem(`scriptora_prod_res_${e}`,JSON.stringify(o.resources)),o.resources}catch{}const s=localStorage.getItem(`scriptora_prod_res_${e}`);if(s)try{const n=JSON.parse(s);return t&&t!=="all"?n.filter(o=>o.category.toLowerCase()===t.toLowerCase()):n}catch{}const a=[{id:"res-1",scriptId:e,category:"Cast",name:"Kevin (Lead)",role:"Hydro-engineer",scenes:["Scene 1","Scene 3","Scene 18"],department:"Casting",status:"Confirmed",contactRestricted:!0,contact:"agent@talentagency.com",notes:"Requires desert dust protective gear and waterproof boots."},{id:"res-2",scriptId:e,category:"Cast",name:"Meera (Lead)",role:"Field Operative",scenes:["Scene 2","Scene 4","Scene 18"],department:"Casting",status:"Confirmed",contactRestricted:!0,contact:"management@creativeartists.com",notes:"Tactical harness fitted for scene 18 valve climb."},{id:"res-3",scriptId:e,category:"Location",name:"Arid Outpost Gate 4",scenes:["Scene 1","Scene 2"],department:"Locations",status:"Confirmed",contactRestricted:!1,contact:"Mojave Perimeter Permit Office",notes:"Day exterior only. High wind advisory after 16:00."},{id:"res-4",scriptId:e,category:"Location",name:"Pumping Station Chamber B",scenes:["Scene 18"],department:"Locations",status:"Confirmed",contactRestricted:!1,contact:"Aqueduct District Coordinator",notes:"Heavy echo; sound dampening blankets required."},{id:"res-5",scriptId:e,category:"Props",name:"Hydraulic Bypass Valve Kit",scenes:["Scene 18"],department:"Props",status:"Confirmed",notes:"Hero prop with functional LED pressure gauge."},{id:"res-6",scriptId:e,category:"Vehicles",name:"Solar Patrol Rover (Modified)",scenes:["Scene 1","Scene 4"],department:"Picture Vehicles",status:"Awaiting review",notes:"Secondary dust filter installed on engine intake."}];return localStorage.setItem(`scriptora_prod_res_${e}`,JSON.stringify(a)),t&&t!=="all"?a.filter(n=>n.category.toLowerCase()===t.toLowerCase()):a}async function Ps(e="chronicles-of-dust"){try{const a=await B(`/production/${e}/documents`);if(a?.documents)return localStorage.setItem(`scriptora_prod_docs_${e}`,JSON.stringify(a.documents)),a.documents}catch{}const t=localStorage.getItem(`scriptora_prod_docs_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"doc-cs-1",scriptId:e,type:"Call Sheet",title:"Call Sheet #01 — Gate 4 Day Exterior",sourceVersion:"Draft 4.2",shootDay:"Day 1 of 14",date:"Oct 24, 2026",callTime:"06:30 AM",location:"Mojave Outpost Gate 4",scenes:["Scene 1","Scene 2"],status:"Confirmed",published:!0,version:"v1.0"},{id:"doc-cs-2",scriptId:e,type:"Call Sheet",title:"Call Sheet #02 — Pumping Station Chamber",sourceVersion:"Draft 4.2",shootDay:"Day 2 of 14",date:"Oct 25, 2026",callTime:"07:00 AM",location:"Chamber B Dry Tank",scenes:["Scene 18"],status:"Draft",published:!1,version:"v0.9"},{id:"doc-ds-1",scriptId:e,type:"Dialogue Sheet",title:"Actor Sides — Kevin & Meera (Scene 18)",sourceVersion:"Draft 4.2",scenes:["Scene 18"],characters:["KEVIN","MEERA"],status:"Confirmed",published:!0,version:"v1.2"},{id:"doc-ss-1",scriptId:e,type:"Shooting Schedule",title:"Master 14-Day Stripboard Schedule",sourceVersion:"Draft 4.2",status:"Confirmed",published:!0,version:"v2.1",daysCount:14},{id:"doc-sb-1",scriptId:e,type:"Script Breakdown",title:"Full Production Breakdown Sheet",sourceVersion:"Draft 4.2",status:"Confirmed",published:!0,version:"v1.4",elementsCount:78}];return localStorage.setItem(`scriptora_prod_docs_${e}`,JSON.stringify(s)),s}async function at(e="chronicles-of-dust"){try{const a=await B(`/production/${e}/proposals`);if(a?.proposals)return localStorage.setItem(`scriptora_prod_props_${e}`,JSON.stringify(a.proposals)),a.proposals}catch{}const t=localStorage.getItem(`scriptora_prod_props_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"prop-1",scriptId:e,sourceVersion:"Draft 4.2",title:"Add Water Truck Standby for Chamber B Scene 18",description:"SFX coordinator requested a dedicated pressurized water truck for high-velocity valve release practical effect in Scene 18.",category:"SFX / Logistics",submittedBy:"Elena Rostova",submitterRole:"Director",status:"Awaiting review",impact:"Requires 1 additional standby driver and $1,200 equipment allocation.",createdAt:"2026-10-14T08:30:00Z"},{id:"prop-2",scriptId:e,sourceVersion:"Draft 4.2",title:"Swap Shoot Order for Day 3 and Day 4",description:"Shift exterior lakebed shoot earlier by 24 hours due to predicted desert sand squall.",category:"Schedule",submittedBy:"Marcus Vance",submitterRole:"Assistant Director",status:"Awaiting review",impact:"Affects talent travel call times for Kevin and background extras.",createdAt:"2026-10-13T16:45:00Z"}];return localStorage.setItem(`scriptora_prod_props_${e}`,JSON.stringify(s)),s}async function Ns(e,t){try{const n=await B(`/production/${e}/proposals`,{method:"POST",body:JSON.stringify(t)});if(n?.proposal){const o=await at(e);return o.unshift(n.proposal),localStorage.setItem(`scriptora_prod_props_${e}`,JSON.stringify(o)),n.proposal}}catch{}const s=await at(e),a={id:`prop-${Date.now()}`,scriptId:e,sourceVersion:t.sourceVersion||"Draft 4.2",title:t.title||"Production Schedule Change",description:t.description||"",category:t.category||"General",submittedBy:t.submittedBy||"Collaborator",submitterRole:t.submitterRole||"Director",status:"Awaiting review",impact:t.impact||"Requires schedule adjustment",createdAt:new Date().toISOString()};return s.unshift(a),localStorage.setItem(`scriptora_prod_props_${e}`,JSON.stringify(s)),a}async function Mt(e,t,s,a=""){try{const l=await B(`/production/${e}/proposals/${t}/review`,{method:"POST",body:JSON.stringify({action:s,notes:a})});if(l?.proposal){const i=await at(e),r=i.findIndex(u=>u.id===t);return r!==-1&&(i[r]=l.proposal),localStorage.setItem(`scriptora_prod_props_${e}`,JSON.stringify(i)),l.proposal}}catch{}const n=await at(e),o=n.find(l=>l.id===t);return o&&(o.status=s==="accept"?"Accepted":s==="reject"?"Rejected":"Conflict",o.resolvedAt=new Date().toISOString(),o.resolutionNotes=a||(s==="accept"?"Accepted by Owner":"Declined during review"),localStorage.setItem(`scriptora_prod_props_${e}`,JSON.stringify(n))),o}async function jt(e="chronicles-of-dust"){try{const a=await B(`/production/${e}/audit`);if(a?.auditTrail)return localStorage.setItem(`scriptora_prod_audit_${e}`,JSON.stringify(a.auditTrail)),a.auditTrail}catch{}const t=localStorage.getItem(`scriptora_prod_audit_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"audit-1",scriptId:e,action:"PIN_SOURCE_VERSION",category:"VERSION_INTEGRITY",details:"Pinned production source baseline to screenplay draft 'Draft 4.2' (Hash: 88f2)",sourceVersion:"Draft 4.2",actor:"Arun Kumar (Owner)",timestamp:"12m ago"},{id:"audit-2",scriptId:e,action:"CONFIRM_DOCUMENT",category:"APPROVAL",details:"Confirmed Call Sheet #01 for official release by Owner",sourceVersion:"Draft 4.2",actor:"Arun Kumar (Owner)",timestamp:"2h ago"},{id:"audit-3",scriptId:e,action:"SUBMIT_PROPOSAL",category:"CHANGE_MANAGEMENT",details:"Proposal 'Add Water Truck Standby for Chamber B' submitted by Director Elena Rostova",sourceVersion:"Draft 4.2",actor:"Elena Rostova",timestamp:"3h ago"},{id:"audit-4",scriptId:e,action:"EXTRACT_BREAKDOWN",category:"PRODUCTION_TOOL",details:"Automated element breakdown synchronized across 18 scenes from Draft 4.2",sourceVersion:"Draft 4.2",actor:"System Intelligence",timestamp:"Yesterday"}];return localStorage.setItem(`scriptora_prod_audit_${e}`,JSON.stringify(s)),s}async function Ut(e="chronicles-of-dust"){try{const n=await B(`/production/${e}/scenes`);if(n?.scenes)return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(n.scenes)),n.scenes}catch{}const t=localStorage.getItem(`scriptora_prod_scenes_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[],a=[{num:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",intExt:"EXT",dayNight:"DAY",p:"4 1/8",comp:"Moderate",day:"Day 1 of 14",cast:["KEVIN","MARCUS"],desc:"Wind whips dust across perimeter chain link. Kevin arrives at customs gate."},{num:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",intExt:"INT",dayNight:"DAY",p:"3 4/8",comp:"Simple",day:"Day 1 of 14",cast:["KEVIN","MEERA"],desc:"Meera analyzes telemetry console indicating illegal pressure drop."},{num:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",intExt:"EXT",dayNight:"DUSK",p:"7 2/8",comp:"Complex",day:"Day 2 of 14",cast:["KEVIN"],desc:"Concrete conduit pipeline across cracked alkali flats during sunset."},{num:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",intExt:"EXT",dayNight:"NIGHT",p:"5 0/8",comp:"Complex",day:"Day 3 of 14",cast:["KEVIN","MEERA"],desc:"Perimeter night patrol with solar rover and surveillance drones."},{num:5,heading:"INT. HYDRAULIC VALVE TUNNEL - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"5 4/8",comp:"Moderate",day:"Day 3 of 14",cast:["KEVIN"],desc:"Rusty underground valves with echoing industrial turbine vibration."},{num:6,heading:"EXT. DESERT SERVICE ROAD - DAY",intExt:"EXT",dayNight:"DAY",p:"5 2/8",comp:"Simple",day:"Day 4 of 14",cast:["KEVIN"],desc:"Kevin tracks tanker tire treads along decommissioned asphalt."},{num:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",intExt:"INT",dayNight:"DAY",p:"6 3/8",comp:"Moderate",day:"Day 5 of 14",cast:["COMMANDER VANCE","KEVIN"],desc:"Vance oversees regional water diversion bank from glass observatory."},{num:8,heading:"EXT. RESERVOIR INTAKE BASIN - DAY",intExt:"EXT",dayNight:"DAY",p:"5 5/8",comp:"Complex",day:"Day 6 of 14",cast:["MEERA"],desc:"Rappelling 60-foot descent down drained concrete spillway."},{num:9,heading:"INT. DRAINAGE VAULT - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"4 1/8",comp:"Moderate",day:"Day 7 of 14",cast:["KEVIN","MEERA"],desc:"Subterranean acoustic surveillance using directional hydrophones."},{num:10,heading:"EXT. PIPELINE COMPRESSOR STATION - DUSK",intExt:"EXT",dayNight:"DUSK",p:"5 3/8",comp:"Moderate",day:"Day 8 of 14",cast:["KEVIN","MARCUS"],desc:"Diesel compressor manifolds blowing atmospheric smoke into dusk sky."},{num:11,heading:"INT. CUSTOMS ARCHIVE STORAGE - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"4 4/8",comp:"Simple",day:"Day 9 of 14",cast:["KEVIN"],desc:"Investigation of legacy river compact water rights deeds on microfiche."},{num:12,heading:"EXT. DRY WASH VALLEY - DAY",intExt:"EXT",dayNight:"DAY",p:"5 6/8",comp:"Complex",day:"Day 10 of 14",cast:["KEVIN","MEERA"],desc:"High-speed pursuit through sandstone canyons with heavy convoy."},{num:13,heading:"INT. EMERGENCY SLUICE GATEWAY - DAY",intExt:"INT",dayNight:"DAY",p:"4 3/8",comp:"Moderate",day:"Day 11 of 14",cast:["KEVIN"],desc:"Manual mechanical winch operation on frozen cast-iron sluice gates."},{num:14,heading:"EXT. SOUTHWEST PRESSURE TOWER - DUSK",intExt:"EXT",dayNight:"DUSK",p:"4 6/8",comp:"Moderate",day:"Day 12 of 14",cast:["MEERA"],desc:"Exterior ladder ascent under sweeping perimeter searchlights."},{num:15,heading:"INT. GENERATOR ROOM - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"4 2/8",comp:"Simple",day:"Day 12 of 14",cast:["KEVIN","COMMANDER VANCE"],desc:"Stand-off over turbine killswitch with pulsing crimson warning beacon."},{num:16,heading:"EXT. RESERVOIR SPILLWAY - NIGHT",intExt:"EXT",dayNight:"NIGHT",p:"4 7/8",comp:"Complex",day:"Day 13 of 14",cast:["KEVIN","MEERA"],desc:"Flash flood breach through spillway catwalk with torrential rain."},{num:17,heading:"INT. CONTROL GANTRY - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"3 4/8",comp:"Complex",day:"Day 14 of 14",cast:["KEVIN","MEERA","COMMANDER VANCE"],desc:"High gantry physical climax suspended above subterranean drainage."},{num:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"2 6/8",comp:"Complex",day:"Day 2 of 14",cast:["KEVIN","MEERA"],desc:"Kevin anchors hydraulic bypass valve kit as high pressure brine seals."}];for(const n of a)s.push({id:`scene-${n.num}`,sceneNumber:n.num,scriptId:e,heading:n.heading,intExt:n.intExt,dayNight:n.dayNight,pages:n.p,complexity:n.comp,shootDay:n.day,status:n.num===4?"Needs Review":"Scheduled",snippet:n.desc,directorNotes:`Director visual notes for ${n.heading}. Maintain high contrast lighting.`,continuityNotes:"Continuity reference logged against Draft 4.2.",cast:n.cast,sidesReady:!0});return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(s)),s}async function ya(e,t){try{const l=await B(`/production/${e}/scenes/${t}`);if(l?.scene)return l.scene}catch{}const a=(await Ut(e)).find(l=>l.id===t||String(l.sceneNumber)===String(t));if(!a)return null;const o=(await nt(e)).filter(l=>l.sceneId===a.id||l.sceneNumber===a.sceneNumber||Array.isArray(l.scenes)&&l.scenes.includes(a.sceneNumber));return{...a,elements:o}}async function wa(e,t,s){try{const o=await B(`/production/${e}/scenes/${t}`,{method:"PUT",body:JSON.stringify(s)});if(o?.scene)return o.scene}catch{}const a=await Ut(e),n=a.find(o=>o.id===t||String(o.sceneNumber)===String(t));return n?(Object.assign(n,s),localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(a)),n):s}async function nt(e="chronicles-of-dust",t=null,s=null){try{const o=new URLSearchParams;t&&o.set("category",t),s&&o.set("scene",s);const l=o.toString()?`?${o.toString()}`:"",i=await B(`/production/${e}/breakdown${l}`);if(i?.breakdown)return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(i.breakdown)),i.breakdown}catch{}const a=localStorage.getItem(`scriptora_prod_breakdown_${e}`);let n=[];if(a)try{n=JSON.parse(a)}catch{}if(n.length||(n=[{id:"elem-1",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[1,2,4,18],category:"Cast",name:"KEVIN",characterRole:"Discredited hydro-engineer, 30s. Hero protagonist.",description:"Discredited hydro-engineer, 30s. Hero protagonist.",assignedActor:"Dev Patel",castingStatus:"Confirmed Cast",actorAvailability:"Available Shoot Days 1-14",appearancesCount:4,sourceSnippet:"Kevin kneels over cracked hydro-sensor junction box, static hissing from the diagnostic speaker.",originalAiSuggestion:"KEVIN — Discredited hydro-engineer, 30s. Hero protagonist.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Requires desert dust protective gear and waterproof boots."},{id:"elem-2",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[4,16,18],category:"Cast",name:"MEERA",characterRole:"Field operative with tactical harness.",description:"Field operative with tactical harness.",assignedActor:"Zoe Saldana",castingStatus:"Confirmed Cast",actorAvailability:"Available Shoot Days 4-18",appearancesCount:3,sourceSnippet:"Meera anchors her cable to the iron pylon, visor reflecting the rising floodwaters below.",originalAiSuggestion:"MEERA — Field operative with tactical harness.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Tactical harness fitted for scene 18 valve climb."},{id:"elem-3",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Props",name:"Hydraulic Bypass Valve Kit",description:"Custom machined valve kit with functional digital LED pressure display.",sourcingType:"Hero Prop Built",quantity:"1 Hero + 2 Stunt Duplicates",readinessStatus:"Ready in Art Dept",continuityNotes:"Clean in Sc 1, weathered with grease in Sc 18",sourceSnippet:"Kevin clicks the bypass manifold into place. The gauge needles spike red.",originalAiSuggestion:"Hydraulic Bypass Valve Kit — machined valve kit with LED display.",status:"Confirmed",isHumanConfirmed:!0,confidence:.95,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero prop constructed by art department; 2 stunt duplicates on standby."},{id:"elem-4",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Practical FX",name:"High-Pressure Water Spray",description:"Controlled water burst simulating cracked pipe joint failure.",requiredResources:"Dedicated 4000L Water Tanker, 120 PSI Pump Rig",technicalRequirements:"Safe water containment basins, electrical shut-off triggers",safetyNotes:"Non-slip decking mandatory; waterproof protective ponchos for camera crew",prepStatus:"Rig Test Scheduled",sourceSnippet:"A burst of pressurized brine shoots from the seam, blinding the chamber.",originalAiSuggestion:"High-Pressure Water Spray — Controlled water burst simulating cracked pipe failure.",status:"Needs Review",isHumanConfirmed:!1,confidence:.88,confirmedBy:null,confirmedAt:null,notes:"SFX coordinator requested dedicated water truck standby via Proposal #prop-1."},{id:"elem-5",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Stunts",name:"Valve Pylon Cable Rappel",description:"Meera swings 18 feet across open valve chasm to catch emergency release lever.",coordinationRequirements:"18ft wire pendulum rig, decelerator line, safety crash matting",qualifiedPersonnel:"Stunt Double: Tara Sen / Stunt Coordinator: Roy Hall",safetyPlanningStatus:"Awaiting Coordinator Review",sourceSnippet:"Meera kicks off the catwalk, swinging into the spray as the iron cable groans.",originalAiSuggestion:"Valve Pylon Cable Rappel — 18ft swing across chasm to catch lever.",status:"Needs Review",isHumanConfirmed:!1,confidence:.92,confirmedBy:null,confirmedAt:null,notes:"Awaiting Stunt Coordinator risk assessment and harness certification."},{id:"elem-13",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Locations",name:"Sub-Level Hydro-Chamber B",description:"Industrial concrete pumping cavern with rusty iron catwalks.",context:"INT.",lighting:"NIGHT",locationStatus:"Secured & Permitted",accessDetails:"Permit #WTR-994, Access via Gate 4 Service Tunnel",sourceSnippet:"INT. HYDRO-CHAMBER B - NIGHT. Rust-eaten steel catwalks suspend over deep abyss.",originalAiSuggestion:"Sub-Level Hydro-Chamber B — Concrete pumping cavern with catwalks.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Acoustic echo requires directional shotgun mics; non-slip floor treatment applied."},{id:"elem-6",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Costumes",name:"Kevin — Weathered Dust Coat & Respirator",character:"KEVIN",description:"Heavy canvas duster coat, solar respirator around neck.",wardrobeRequirements:"Duster coat with distressed seam stitching, respirator with worn elastic straps",continuityChanges:"Costume Stage 1 (Desert Dust / Dry)",prepStatus:"Fitted & Approved",sourceSnippet:"KEVIN (30s), sun-scoured and weary, adjusts his solar filter.",originalAiSuggestion:"Kevin — Duster coat, respirator around neck.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Costume fitting complete with wardrobe dept."},{id:"elem-7",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Cast",name:"MARCUS",characterRole:"Border outpost security guard.",description:"Border outpost security guard.",assignedActor:"Unassigned (Auditioning)",castingStatus:"Auditioning",actorAvailability:"Day 1 Shoot Only",appearancesCount:1,sourceSnippet:"MARCUS leans against the chain link, tapping an unlit cigarette against his wrist.",originalAiSuggestion:"MARCUS — Border outpost security guard.",status:"Confirmed",isHumanConfirmed:!0,confidence:.98,confirmedBy:"Elena Rostova",confirmedAt:"2026-10-13T16:00:00Z",notes:"Supporting role. Day 1 shoot only."},{id:"elem-8",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Props",name:"Solar Filter Dust Goggles",description:"Tinted goggles with worn leather straps.",sourcingType:"Hero Wardrobe Prop",quantity:"2 Pairs (A & B Camera)",readinessStatus:"Ready in Art Dept",continuityNotes:"Worn over eyes during wind gusts, rest on forehead indoors",sourceSnippet:"Kevin pulls the goggles over his eyes as a gust hits.",originalAiSuggestion:"Solar Filter Dust Goggles — Tinted goggles with worn leather straps.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero wardrobe prop."},{id:"elem-9",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Vehicles",name:"Solar Patrol Rover (Modified)",description:"Lightweight dune rover fitted with dual photovoltaic roof panels.",availability:"On Set Shoot Days 1 & 2",operationalRequirements:"Charging station in Base Camp, Art Dept weathering wrap",prepStatus:"Checked In & Inspected",sourceSnippet:"The rover sits idling beside Gate 4, suspension coated in red grit.",originalAiSuggestion:"Solar Patrol Rover (Modified) — Dune rover with dual photovoltaic roof panels.",status:"Confirmed",isHumanConfirmed:!0,confidence:.96,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Picture vehicle running on electric battery. Backup battery pack required."},{id:"elem-10",scriptId:e,sceneId:"scene-4",sceneNumber:4,scenes:[4],category:"Props",name:"Night-Vision Monocular Scope",description:"Military grade digital thermal optics.",sourcingType:"Rented",quantity:"1 Unit",readinessStatus:"Sourcing",continuityNotes:"Handheld by Meera on perimeter wall",sourceSnippet:"Meera scans the wire with her thermal monocle. Three glowing silhouettes freeze.",originalAiSuggestion:"Night-Vision Monocular Scope — Military grade digital thermal optics.",status:"Needs Review",isHumanConfirmed:!1,confidence:.85,confirmedBy:null,confirmedAt:null,notes:"Rental request pending vendor confirmation."},{id:"elem-11",scriptId:e,sceneId:"scene-7",sceneNumber:7,scenes:[7],category:"Cast",name:"COMMANDER VANCE",characterRole:"Antagonist, regional water syndicate director.",description:"Antagonist, regional water syndicate director.",assignedActor:"Michael Shannon",castingStatus:"Offer Out",actorAvailability:"Hold Oct 20-24",appearancesCount:2,sourceSnippet:"COMMANDER VANCE (50s), tailored gray linen, stands over the telemetry terminal.",originalAiSuggestion:"COMMANDER VANCE — Antagonist, regional water syndicate director.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Cast confirmed. Costume fitting scheduled Oct 20."},{id:"elem-12",scriptId:e,sceneId:"scene-16",sceneNumber:16,scenes:[16],category:"Practical FX",name:"Catwalk Rain Towers",description:"Simulated industrial torrential flood conditions on exterior catwalk.",requiredResources:"3 Overhead Rain Spars, 2 Fire Hydrant Ties",technicalRequirements:"Runoff water deflection channeling away from electrical stage lines",safetyNotes:"Safety harnesses mandatory on exterior catwalk scaffolding",prepStatus:"Pending Proposal Approval",sourceSnippet:"Water cascades down the spillway faces like Niagara.",originalAiSuggestion:"Catwalk Rain Towers — Simulated flood conditions on exterior catwalk.",status:"Needs Review",isHumanConfirmed:!1,confidence:.9,confirmedBy:null,confirmedAt:null,notes:"Requires environmental containment permits."}],localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(n))),t&&t!=="all"&&(n=n.filter(o=>o.category.toLowerCase()===t.toLowerCase())),s&&s!=="all"){const o=Number(String(s).replace("scene-",""));n=n.filter(l=>l.sceneId===s||String(l.sceneNumber)===String(s)||Array.isArray(l.scenes)&&l.scenes.includes(o)||l.sceneNumber===o)}return n}async function Rt(e,t,s){try{const o=await B(`/production/${e}/breakdown/${t}`,{method:"PUT",body:JSON.stringify(s)});if(o?.item){const l=await nt(e),i=l.findIndex(r=>r.id===t);return i!==-1&&(l[i]=o.item,localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(l))),o.item}}catch{}const a=await nt(e),n=a.find(o=>o.id===t);return n?((s.name&&s.name!==n.name||s.description&&s.description!==n.description)&&(n.userCorrection={previousName:n.name,previousDesc:n.description,correctedBy:"Arun Kumar (Owner)",correctedAt:new Date().toISOString()}),Object.assign(n,s),s.status==="Confirmed"?(n.isHumanConfirmed=!0,n.confirmedBy="Arun Kumar (Owner)",n.confirmedAt=new Date().toISOString()):s.status==="Needs Review"&&(n.isHumanConfirmed=!1),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(a)),n):s}async function Sa(e,t){try{const n=await B(`/production/${e}/breakdown/${t}`,{method:"DELETE"});if(n?.success){const l=(await nt(e)).filter(i=>i.id!==t);return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(l)),n}}catch{}const a=(await nt(e)).filter(n=>n.id!==t);return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(a)),{success:!0,removedId:t}}async function Ia(e,t){try{const o=await B(`/production/${e}/breakdown`,{method:"POST",body:JSON.stringify(t)});if(o?.item){const l=await nt(e);return l.unshift(o.item),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(l)),o.item}}catch{}const s=await nt(e),a=Number(t.sceneNumber||(t.sceneId?String(t.sceneId).replace("scene-",""):18)),n={id:`elem-${Date.now()}`,scriptId:e,sceneId:t.sceneId||`scene-${a}`,sceneNumber:a,scenes:t.scenes||[a],category:t.category||"Props",name:t.name,description:t.description||"",sourceSnippet:t.sourceSnippet||"User added manual item",originalAiSuggestion:null,status:t.status||"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:new Date().toISOString(),notes:t.notes||"",assignedActor:t.assignedActor||"",castingStatus:t.castingStatus||"Uncast / Open",actorAvailability:t.actorAvailability||"",characterRole:t.characterRole||t.description||"",context:t.context||"INT.",lighting:t.lighting||"DAY",locationStatus:t.locationStatus||"Secured & Permitted",accessDetails:t.accessDetails||"",sourcingType:t.sourcingType||"Sourced",quantity:t.quantity||"1",readinessStatus:t.readinessStatus||"Ready in Art Dept",continuityNotes:t.continuityNotes||"",requiredResources:t.requiredResources||"",technicalRequirements:t.technicalRequirements||"",safetyNotes:t.safetyNotes||"",coordinationRequirements:t.coordinationRequirements||"",qualifiedPersonnel:t.qualifiedPersonnel||"",safetyPlanningStatus:t.safetyPlanningStatus||"Awaiting Coordinator Review",character:t.character||"",wardrobeRequirements:t.wardrobeRequirements||"",continuityChanges:t.continuityChanges||"",prepStatus:t.prepStatus||"In Prep",availability:t.availability||"",operationalRequirements:t.operationalRequirements||""};return s.unshift(n),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(s)),n}async function Pt(e="chronicles-of-dust"){try{const a=await B(`/production/${e}/call-sheets`);if(a?.callSheets)return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(a.callSheets)),a.callSheets}catch{}const t=localStorage.getItem(`scriptora_prod_callsheets_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"cs-1",scriptId:e,callSheetNumber:"01",shootDay:"Day 1 of 14",shootDate:"Saturday, Oct 24, 2026",generalCrewCall:"06:00 AM",shootingCall:"06:30 AM",breakfastTime:"05:15 AM",estimatedWrap:"06:30 PM",status:"Confirmed",isPublished:!0,version:"v1.0",locationName:"Mojave Outpost Gate 4",locationAddress:"Perimeter Road 9, Cantil, CA 93519",parkingNotes:"Crew parking at Basecamp Lot B (1/4 mile west of gate). Shuttle runs every 10 mins.",nearestHospital:"Kern Valley Healthcare District, 6412 Laurel Ave, Lake Isabella, CA (Ph: 760-379-2681)",weatherSummary:"Sunny, 74°F high, 48°F low. Winds WNW 10-15 mph. Dust advisory after 4:00 PM.",scenes:[{sceneNumber:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",pages:"4 1/8",cast:["KEVIN","MARCUS"],desc:"Kevin arrives at border gate, inspection with Marcus."},{sceneNumber:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",pages:"3 4/8",cast:["KEVIN","MEERA"],desc:"Kevin discovers pressure loss on telemetry terminal."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MARCUS",actor:"David Chen",pickup:"05:15 AM",hmuCall:"05:45 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MEERA",actor:"Priya Sharma",pickup:"08:30 AM",hmuCall:"09:00 AM",onSet:"10:30 AM",status:"Confirmed"}],specialInstructions:"Eye protection mandatory for all crew on exterior perimeter due to afternoon dust squall.",approvedBy:"Arun Kumar (Owner)",publishedAt:"2026-10-14T08:00:00Z"},{id:"cs-2",scriptId:e,callSheetNumber:"02",shootDay:"Day 2 of 14",shootDate:"Sunday, Oct 25, 2026",generalCrewCall:"06:30 AM",shootingCall:"07:00 AM",breakfastTime:"05:45 AM",estimatedWrap:"07:00 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:"Pumping Station Chamber B",locationAddress:"Aqueduct District Facility 4, Mojave, CA 93501",parkingNotes:"Basecamp parking inside Gate 2 secure compound. Security clearance badge required.",nearestHospital:"Antelope Valley Medical Center, 1600 W Ave J, Lancaster, CA (Ph: 661-949-5000)",weatherSummary:"Interior stage / sheltered facility. Ambient temp 68°F. Hearing protection mandatory.",scenes:[{sceneNumber:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",pages:"7 2/8",cast:["KEVIN"],desc:"Kevin examines exterior tap line."},{sceneNumber:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",pages:"2 6/8",cast:["KEVIN","MEERA"],desc:"High water pressure valve breach and cable clamp."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"},{character:"MEERA",actor:"Priya Sharma",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"}],specialInstructions:"Wet set protocols in effect for Scene 18. Waterproof camera housing and electrical GFI circuits required.",approvedBy:null,publishedAt:null}];return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),s}async function gs(e,t){try{const a=await B(`/production/${e}/call-sheets/${t}`);if(a?.callSheet)return a.callSheet}catch{}return(await Pt(e)).find(a=>a.id===t)||null}async function ka(e,t){try{const n=await B(`/production/${e}/call-sheets`,{method:"POST",body:JSON.stringify(t)});if(n?.callSheet)return n.callSheet}catch{}const s=await Pt(e),a={id:`cs-${Date.now()}`,scriptId:e,callSheetNumber:String(s.length+1).padStart(2,"0"),shootDay:t.shootDay||`Day ${s.length+1} of 14`,shootDate:t.shootDate||"Monday, Oct 26, 2026",generalCrewCall:t.generalCrewCall||"06:00 AM",shootingCall:t.shootingCall||"06:30 AM",breakfastTime:t.breakfastTime||"05:15 AM",estimatedWrap:t.estimatedWrap||"06:30 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:t.locationName||"Location TBD",locationAddress:t.locationAddress||"TBD",parkingNotes:t.parkingNotes||"Crew parking guidelines.",nearestHospital:t.nearestHospital||"Desert Care Network Regional, Palm Springs, CA",weatherSummary:t.weatherSummary||"Forecast pending.",scenes:t.scenes||[{sceneNumber:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",pages:"5 0/8",cast:["KEVIN","MEERA"],desc:"Perimeter fence inspection."}],castCalls:t.castCalls||[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Draft"}],specialInstructions:t.specialInstructions||"Standard safety directives.",approvedBy:null,publishedAt:null};return s.push(a),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),a}async function Ca(e,t,s){try{const o=await B(`/production/${e}/call-sheets/${t}`,{method:"PUT",body:JSON.stringify(s)});if(o?.callSheet)return o.callSheet}catch{}const a=await Pt(e),n=a.find(o=>o.id===t);return n?(Object.assign(n,s),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(a)),n):s}async function Ea(e,t){try{const n=await B(`/production/${e}/call-sheets/${t}/publish`,{method:"POST"});if(n?.callSheet)return n.callSheet}catch{}const s=await Pt(e),a=s.find(n=>n.id===t);return a?(a.status="Confirmed",a.isPublished=!0,a.version="v1.0 (Snapshot)",a.approvedBy="Arun Kumar (Owner)",a.publishedAt=new Date().toISOString(),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),a):null}async function $t(e="chronicles-of-dust"){try{const a=await B(`/production/${e}/schedule`);if(a?.schedule)return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(a.schedule)),a.schedule}catch{}const t=localStorage.getItem(`scriptora_prod_schedule_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{dayNumber:1,date:"Oct 24, 2026",title:"Outpost Perimeter & Shed",location:"Mojave Gate 4",sceneNumbers:[1,2],totalPages:"7 5/8",estHours:10.5,companyMoves:0,isLocked:!0,status:"Confirmed"},{dayNumber:2,date:"Oct 25, 2026",title:"Lakebed Conduit & Chamber B",location:"Chamber B Dry Tank",sceneNumbers:[3,18],totalPages:"10 0/8",estHours:11,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:3,date:"Oct 26, 2026",title:"Perimeter Fence & Valve Tunnel",location:"Perimeter Sector 9",sceneNumbers:[4,5],totalPages:"10 4/8",estHours:11.5,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:4,date:"Oct 27, 2026",title:"Service Road Pursuit",location:"Route 66 Cutoff",sceneNumbers:[6],totalPages:"5 2/8",estHours:8,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:5,date:"Oct 28, 2026",title:"Syndicate Regional Control",location:"Syndicate Regional HQ",sceneNumbers:[7],totalPages:"6 3/8",estHours:9,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:6,date:"Oct 29, 2026",title:"Reservoir Intake Rappel",location:"Lake Mead Dry Spillway",sceneNumbers:[8],totalPages:"5 5/8",estHours:10,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:7,date:"Oct 30, 2026",title:"Drainage Sub-vaults",location:"Vault Sub-structure 3",sceneNumbers:[9],totalPages:"4 1/8",estHours:8.5,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:8,date:"Oct 31, 2026",title:"Compressor Smoke Run",location:"Compressor Station 12",sceneNumbers:[10],totalPages:"5 3/8",estHours:9,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:9,date:"Nov 01, 2026",title:"Customs Archives",location:"Outpost Archives",sceneNumbers:[11],totalPages:"4 4/8",estHours:7.5,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:10,date:"Nov 02, 2026",title:"Dry Wash Canyon Chase",location:"Red Rock Wash",sceneNumbers:[12],totalPages:"5 6/8",estHours:11,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:11,date:"Nov 03, 2026",title:"Emergency Sluice Gears",location:"Sluice Mechanism House",sceneNumbers:[13],totalPages:"4 3/8",estHours:8,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:12,date:"Nov 04, 2026",title:"Tower Scaffolding & Generator",location:"Tower 7 / Sub-basement",sceneNumbers:[14,15],totalPages:"9 0/8",estHours:10.5,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:13,date:"Nov 05, 2026",title:"Spillway Torrential Catwalk",location:"Spillway Catwalk",sceneNumbers:[16],totalPages:"4 7/8",estHours:11.5,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:14,date:"Nov 06, 2026",title:"High Gantry Climax & Wrap",location:"High Gantry Bay 4",sceneNumbers:[17],totalPages:"3 4/8",estHours:9.5,companyMoves:0,isLocked:!1,status:"Draft"}];return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(s)),s}async function Aa(e,t,s){try{const o=await B(`/production/${e}/schedule/day/${t}`,{method:"PUT",body:JSON.stringify(s)});if(o?.day)return o.day}catch{}const a=await $t(e),n=a.find(o=>o.dayNumber===Number(t));return n?(Object.assign(n,s),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(a)),n):s}async function Ta(e){try{const s=await B(`/production/${e}/schedule/confirm`,{method:"POST"});if(s?.schedule)return s.schedule}catch{}const t=await $t(e);return t.forEach(s=>{s.status="Confirmed",s.isLocked=!0}),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(t)),t}async function Bs(e="chronicles-of-dust"){try{const a=await B(`/production/${e}/readiness`);if(a?.readiness)return localStorage.setItem(`scriptora_prod_readiness_${e}`,JSON.stringify(a.readiness)),a.readiness}catch{}const t=localStorage.getItem(`scriptora_prod_readiness_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"ready-1",scriptId:e,title:"Confirm Water Truck Safety Crew for Scene 18",category:"Safety / SFX",severity:"critical",status:"action_needed",description:"High-pressure brine valve burst in Scene 18 requires Stunt Coordinator sign-off and standby water tanker.",targetRoute:"/production/changes",targetEntity:"prop-1"},{id:"ready-2",scriptId:e,title:"Review 3 Unconfirmed Breakdown Items",category:"Breakdown",severity:"warning",status:"action_needed",description:"Scene 4 Night-Vision optics and Scene 18 cable rappel are currently in Needs Review status.",targetRoute:"/production/breakdown",targetEntity:"scene-18"},{id:"ready-3",scriptId:e,title:"Owner Approval Required for Call Sheet #02",category:"Call Sheets",severity:"critical",status:"action_needed",description:"Call Sheet #02 (Day 2 of 14) is currently in Draft status. Must be approved and published before crew distribution.",targetRoute:"/production/call-sheets",targetEntity:"cs-2"},{id:"ready-4",scriptId:e,title:"All 18 Scenes Stripboard Scheduled",category:"Schedule",severity:"ready",status:"resolved",description:"Every scene from Draft 4.2 has been allocated across the 14-day master shooting calendar.",targetRoute:"/production/schedule",targetEntity:null},{id:"ready-5",scriptId:e,title:"Call Sheet #01 Published & Locked",category:"Call Sheets",severity:"ready",status:"resolved",description:"Call Sheet #01 confirmed by Owner with emergency medical routes and parking directives.",targetRoute:"/production/call-sheets",targetEntity:"cs-1"},{id:"ready-6",scriptId:e,title:"Lead Talent Wardrobe Fittings Verified",category:"Cast",severity:"ready",status:"resolved",description:"Costume specs and protective goggles fitted for Kevin, Meera, and Commander Vance.",targetRoute:"/production/directory",targetEntity:"res-1"}];return localStorage.setItem(`scriptora_prod_readiness_${e}`,JSON.stringify(s)),s}async function $a(e,t){try{const n=await B(`/production/${e}/readiness/${t}/resolve`,{method:"POST"});if(n?.readinessItem)return n.readinessItem}catch{}const s=await Bs(e),a=s.find(n=>n.id===t);return a?(a.status="resolved",a.severity="ready",localStorage.setItem(`scriptora_prod_readiness_${e}`,JSON.stringify(s)),a):null}async function Pa(e,t){try{const a=await B(`/production/${e}/restore`,{method:"POST",body:JSON.stringify({version:t})});if(a?.workspace)return a.workspace}catch{}const s=await Ht(e);return s.pinnedSourceVersion=t,s.pinnedTimestamp="Just now (Restored)",s.isStale=!1,localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(s)),s}class Na{constructor(){this.state={currentUser:null,selectedScriptId:localStorage.getItem("scriptora_selected_script")||"chronicles-of-dust",selectedVersionId:"Draft 4.2",currentSceneId:18,unreadNotifications:3,scripts:[],activeScript:null,screenplay:null,settings:null,historyStack:[]},this.listeners=new Set}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(const t of this.listeners)try{t(this.state)}catch(s){console.error("Store listener error:",s)}}setState(t){this.state={...this.state,...t},t.selectedScriptId&&localStorage.setItem("scriptora_selected_script",t.selectedScriptId),this.notify()}pushHistory(t){this.state.historyStack[this.state.historyStack.length-1]!==t&&this.state.historyStack.push(t)}getPreviousRoute(t="/workspace"){return this.state.historyStack.length>0?this.state.historyStack.pop():t}peekPreviousRoute(t="/workspace"){return this.state.historyStack.length>0?this.state.historyStack[this.state.historyStack.length-1]:t}async init(){try{const t=await As(),s=await _e(),a=await fs(),n=await $s(),o=s.find(l=>l.id===this.state.selectedScriptId)||s[0];this.setState({currentUser:t,scripts:s,activeScript:o,unreadNotifications:a,settings:n})}catch(t){console.error("Init store error:",t)}}async selectScript(t){const s=this.state.scripts.find(a=>a.id===t)||await ns(t);this.setState({selectedScriptId:t,activeScript:s})}async refreshNotifications(){const t=await fs();this.setState({unreadNotifications:t})}async refreshScripts(){const t=await _e(),s=t.find(a=>a.id===this.state.selectedScriptId)||t[0];this.setState({scripts:t,activeScript:s})}}const h=new Na,Ba="/Scriptora/assets/logo-BG9jZ7UG.png",is=Ba;function be(e="Workspace",t="Your writing space."){const s=h.state.unreadNotifications,a=h.state.currentUser?.initials||"JD";return`
    <header class="fixed top-0 left-0 right-0 w-full z-40 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-surface-container-high/60 select-none" data-global-header="true">
      <div class="h-14 px-4 flex items-center justify-between max-w-2xl mx-auto">
        <a href="/workspace" class="flex items-center gap-2.5 min-w-0 no-underline text-inherit cursor-pointer active:opacity-80 transition-opacity">
          <img src="${is}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora" class="w-8 h-8 object-contain shrink-0" />
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
          <a href="/profile" class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs shadow-xs hover:bg-blue-700 active:scale-95 transition-all no-underline overflow-hidden shrink-0" aria-label="User account" id="header-profile-btn">
            ${h.state.currentUser?.avatarUrl?`
              <img src="${h.state.currentUser.avatarUrl}" class="w-full h-full object-cover" alt="Profile" />
            `:`
              <span>${a}</span>
            `}
          </a>
        </div>
      </div>
    </header>
  `}function ge(e="workspace"){const t=e==="workspace",s=e==="intelligence",a=e==="chat"||e==="ai-chat",n=e==="production"||e==="pre-production",o=e==="profile";return`
    <nav class="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container-high/60 overflow-visible select-none" data-global-bottom-nav="true">
      <div class="h-14 px-1 sm:px-3 grid grid-cols-5 items-center max-w-lg mx-auto relative overflow-visible">
        
        <!-- 1. Workspace Tab -->
        <a href="/workspace" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${t?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-workspace" aria-label="Workspace" title="Workspace">
          <span class="material-symbols-outlined text-[22px]" ${t?`style="font-variation-settings: 'FILL' 1;"`:""}>description</span>
          <span class="text-[10.5px] font-medium mt-0.5 leading-none">Workspace</span>
          ${t?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':'<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

        <!-- 2. Intelligence Tab -->
        <a href="/intelligence" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${s?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-intelligence" aria-label="Intelligence" title="Intelligence">
          <span class="material-symbols-outlined text-[22px]" ${s?`style="font-variation-settings: 'FILL' 1;"`:""}>insights</span>
          <span class="text-[10.5px] font-medium mt-0.5 leading-none">Intelligence</span>
          ${s?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':'<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

        <!-- 3. AI Chat Tab (Uniform navigation slot dimensions) -->
        <a href="/chat" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${a?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-chat" aria-label="AI Chat" title="AI Chat">
          <span class="material-symbols-outlined text-[22px]" ${a?`style="font-variation-settings: 'FILL' 1;"`:""}>chat_bubble</span>
          <span class="text-[10.5px] font-medium mt-0.5 leading-none">AI Chat</span>
          ${a?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':'<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

        <!-- 4. Pre-Production Tab (4th position) -->
        <a href="/production" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${n?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-production" aria-label="Pre-Production" title="Pre-Production">
          <span class="material-symbols-outlined text-[22px]" ${n?`style="font-variation-settings: 'FILL' 1;"`:""}>movie_creation</span>
          <span class="text-[10.5px] font-medium mt-0.5 leading-none">Production</span>
          ${n?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':'<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

        <!-- 5. Profile Tab -->
        <a href="/profile" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${o?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-profile" aria-label="Profile" title="Profile">
          <span class="material-symbols-outlined text-[22px]" ${o?`style="font-variation-settings: 'FILL' 1;"`:""}>account_circle</span>
          <span class="text-[10.5px] font-medium mt-0.5 leading-none">Profile</span>
          ${o?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':'<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

      </div>
    </nav>
  `}function w(e,t="success"){const s=document.getElementById("global-toast"),a=document.getElementById("toast-message"),n=document.getElementById("toast-icon");if(!s||!a){console.log(`[Toast ${t}]`,e);return}a.textContent=e,n&&(t==="error"?(n.textContent="error",n.className="material-symbols-outlined text-[18px] text-red-400"):t==="info"?(n.textContent="info",n.className="material-symbols-outlined text-[18px] text-blue-300"):(n.textContent="check_circle",n.className="material-symbols-outlined text-[18px] text-emerald-300")),s.classList.remove("opacity-0","pointer-events-none"),s.classList.add("opacity-100"),clearTimeout(s._timeout),s._timeout=setTimeout(()=>{s.classList.remove("opacity-100"),s.classList.add("opacity-0","pointer-events-none")},2400)}function Ra(){return`
    <main class="flex flex-col relative w-full pt-safe pb-safe bg-surface min-h-screen justify-center items-center px-4">
      <div class="flex flex-col w-full max-w-sm py-8 fade-in">
        <!-- Brand & Logo Header -->
        <header class="flex flex-col items-center justify-center pb-4 text-center">
          <img src="${is}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-16 h-16 object-contain mb-3 drop-shadow-sm" />
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
  `}function Da(e){const t=document.getElementById("tab-signin"),s=document.getElementById("tab-register"),a=document.getElementById("tab-otp"),n=document.getElementById("flow-signin"),o=document.getElementById("flow-register"),l=document.getElementById("flow-otp");function i(S){[t,s,a].forEach(I=>{I.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 text-on-surface-variant hover:text-on-surface"}),[n,o,l].forEach(I=>I.classList.add("hidden")),S==="signin"?(t.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",n.classList.remove("hidden")):S==="register"?(s.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",o.classList.remove("hidden")):S==="otp"&&(a.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold flex items-center justify-center gap-1",l.classList.remove("hidden"))}t&&(t.onclick=()=>i("signin")),s&&(s.onclick=()=>i("register")),a&&(a.onclick=()=>i("otp"));const r=document.getElementById("toggle-pw-signin"),u=document.getElementById("signin-password");r&&u&&(r.onclick=()=>{const S=u.type==="password";u.type=S?"text":"password",r.innerHTML=`<span class="material-symbols-outlined text-[18px]">${S?"visibility_off":"visibility"}</span>`});function p(S){try{const y=S.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),k=decodeURIComponent(atob(y).split("").map(R=>"%"+("00"+R.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(k)}catch{return null}}const x=document.getElementById("btn-google-login"),c="756924881120-0qngpm230nq3k8bb61ttt1de7jv28fui.apps.googleusercontent.com";let d=null;async function m(S){w("Connecting with Google...");try{const I=await Xs(S);h.setState({currentUser:I}),w(`Welcome back, ${I.displayName||I.name}`),e("/welcome")}catch(I){w(I.message||"Google sign-in error","error")}}function f(){if(window.google?.accounts?.id&&c)try{window.google.accounts.id.initialize({client_id:c,callback:async S=>{if(S&&S.credential){const I=p(S.credential)||{};await m({token:S.credential,email:I.email,name:I.name,displayName:I.name,picture:I.picture,sub:I.sub,provider:"google"})}},auto_select:!1,cancel_on_tap_outside:!0})}catch(S){console.warn("Google One Tap setup note:",S)}if(window.google?.accounts?.oauth2&&c)try{d=window.google.accounts.oauth2.initTokenClient({client_id:c,scope:"email profile openid",callback:async S=>{if(S&&S.access_token){w("Retrieving Google profile...");try{const y=await(await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${S.access_token}`}})).json();await m({token:S.access_token,email:y.email,name:y.name,displayName:y.name,picture:y.picture,sub:y.sub,provider:"google"})}catch(I){console.warn("Google userinfo fetch note:",I),await m({token:S.access_token,provider:"google"})}}}})}catch(S){console.warn("Google OAuth token client setup note:",S)}}f(),x&&(x.onclick=async()=>{if(!d&&window.google&&f(),d)try{d.requestAccessToken({prompt:"select_account"});return}catch(S){console.warn("Token client request error, trying prompt:",S)}if(window.google?.accounts?.id)try{window.google.accounts.id.prompt(S=>{(S.isNotDisplayed()||S.isSkippedMoment())&&(console.log("GIS prompt not displayed:",S.getNotDisplayedReason()),m({email:"arun.kumar@scriptora.studio",name:"Arun Kumar",displayName:"Arun Kumar",provider:"google"}))});return}catch(S){console.warn("GIS prompt error:",S)}await m({email:"arun.kumar@scriptora.studio",name:"Arun Kumar",displayName:"Arun Kumar",provider:"google"})});const b=document.getElementById("form-signin");b&&(b.onsubmit=async S=>{S.preventDefault();const I=document.getElementById("signin-email").value,y=u.value;try{const k=await Ys({email:I,password:y});h.setState({currentUser:k}),w(`Welcome back, ${k.displayName||k.name}`),e("/welcome")}catch(k){w(k.message,"error")}});const g=document.getElementById("form-register");g&&(g.onsubmit=async S=>{S.preventDefault();const I=document.getElementById("reg-name").value,y=document.getElementById("reg-email").value,k=document.getElementById("reg-password").value;try{const R=await Zs({name:I,email:y,password:k});h.setState({currentUser:R}),w("Account created successfully"),e("/welcome")}catch(R){w(R.message,"error")}});const E=document.getElementById("form-otp");E&&(E.onsubmit=async S=>{S.preventDefault();const I=document.getElementById("otp-phone").value;try{const y=await Qs(I);h.setState({currentUser:y}),w("Phone verified successfully"),e("/welcome")}catch(y){w(y.message,"error")}});const A=document.getElementById("btn-forgot-pw");A&&(A.onclick=()=>{w("Password reset link sent to registered email","info")})}function La(){return h.state.currentUser,`
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
          <img src="${is}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-20 h-20 object-contain mb-5 drop-shadow-sm" />

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
  `}function Ma(e){const t=document.getElementById("welcome-sign-out");t&&(t.onclick=async()=>{await Xt(),h.setState({currentUser:null}),w("Signed out successfully"),e("/auth")})}function Oa(){const e=h.state.scripts||[],t=e.find(a=>a.isCurrentDraft)||e[0],s=e.slice(0,3);return`
    ${be("Workspace","Your writing space.")}

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
            ${s.map(a=>`
              <div data-script-id="${a.id}" class="script-item-row px-3.5 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
                <div class="flex items-center gap-3 min-w-0 pr-2">
                  <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[18px]">description</span>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-semibold text-slate-900 truncate">${a.title}</span>
                      <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">${a.genre}</span>
                    </div>
                    <span class="text-[11px] text-slate-500 truncate mt-0.5">${a.draft} · ${a.pages} pages · Edited ${a.updated}</span>
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
            ${e.map(a=>`
              <div data-script-id="${a.id}" class="script-item-row px-3.5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                <div class="flex items-center gap-3 min-w-0 pr-2 flex-1">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <span class="material-symbols-outlined text-[16px]">movie</span>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span class="text-xs font-semibold text-slate-900 truncate">${a.title}</span>
                    <span class="text-[11px] text-slate-500 truncate mt-0.5">${a.draft} · ${a.pages} pages · Edited ${a.updated}</span>
                  </div>
                </div>

                <div class="relative">
                  <button type="button" class="script-more-btn w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" data-script-id="${a.id}" aria-label="More actions">
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

    ${ge("workspace")}
  `}function ja(e){let t=null;const s=document.getElementById("btn-continue-writing");s&&(s.onclick=()=>{const c=s.getAttribute("data-script-id");h.selectScript(c),e(`/editor/${c}?scene=18`)}),document.querySelectorAll(".script-item-row").forEach(c=>{c.onclick=d=>{if(d.target.closest(".script-more-btn"))return;const m=c.getAttribute("data-script-id");h.selectScript(m),e(`/editor/${m}`)}});const a=document.getElementById("screenplay-search");a&&(a.oninput=c=>{const d=c.target.value.toLowerCase().trim();document.querySelectorAll("#screenplays-library-list .script-item-row").forEach(f=>{const b=f.querySelector(".font-semibold")?.textContent.toLowerCase()||"";f.style.display=b.includes(d)?"flex":"none"})});const n=document.getElementById("btn-new-script"),o=document.getElementById("new-script-modal"),l=document.getElementById("close-new-script-modal"),i=document.getElementById("cancel-new-script-btn"),r=document.getElementById("form-new-script");function u(c){o&&(c?(o.classList.remove("hidden"),o.classList.add("flex"),document.getElementById("new-script-title")?.focus()):(o.classList.add("hidden"),o.classList.remove("flex")))}n&&(n.onclick=()=>u(!0)),l&&(l.onclick=()=>u(!1)),i&&(i.onclick=()=>u(!1)),r&&(r.onsubmit=async c=>{c.preventDefault();const d=document.getElementById("new-script-title").value.trim(),m=document.getElementById("new-script-format").value,f=document.getElementById("new-script-genre").value;if(d)try{const b=await ea({title:d,format:m,genre:f});await h.refreshScripts(),h.selectScript(b.id),u(!1),w(`Created "${b.title}"`),e(`/editor/${b.id}`)}catch(b){w(b.message,"error")}});const p=document.getElementById("script-menu-popover");document.querySelectorAll(".script-more-btn").forEach(c=>{c.onclick=d=>{d.stopPropagation(),t=c.getAttribute("data-script-id");const m=c.getBoundingClientRect();p.style.top=`${m.bottom+window.scrollY+4}px`,p.style.left=`${Math.min(m.left-130,window.innerWidth-180)}px`,p.classList.remove("hidden")}}),window.onclick=c=>{!c.target.closest("#script-menu-popover")&&!c.target.closest(".script-more-btn")&&p?.classList.add("hidden")},document.getElementById("menu-opt-open")?.addEventListener("click",()=>{p.classList.add("hidden"),t&&(h.selectScript(t),e(`/editor/${t}`))}),document.getElementById("menu-opt-rename")?.addEventListener("click",async()=>{p.classList.add("hidden");const c=prompt("Enter new title for this screenplay:");c&&c.trim()&&(await ta(t,{title:c.trim()}),await h.refreshScripts(),w("Screenplay renamed"),e("/workspace"))}),document.getElementById("menu-opt-duplicate")?.addEventListener("click",async()=>{p.classList.add("hidden"),await aa(t),await h.refreshScripts(),w("Screenplay duplicated"),e("/workspace")}),document.getElementById("menu-opt-archive")?.addEventListener("click",async()=>{p.classList.add("hidden"),await na(t),await h.refreshScripts(),w("Screenplay archived"),e("/workspace")}),document.getElementById("menu-opt-delete")?.addEventListener("click",async()=>{p.classList.add("hidden"),confirm("Are you sure you want to delete this screenplay? This action cannot be undone.")&&(await sa(t),await h.refreshScripts(),w("Screenplay deleted"),e("/workspace"))});const x=document.getElementById("btn-export-library");x&&(x.onclick=()=>{const c="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(h.state.scripts,null,2)),d=document.createElement("a");d.setAttribute("href",c),d.setAttribute("download",`scriptora_library_${Date.now()}.json`),document.body.appendChild(d),d.click(),d.remove(),w("Exported library manifest (.json)")})}const _a=new Set(["HE","SHE","IT","ITS","HIM","HER","HERS","HIS","THEY","THEM","THEIR","THEIRS","WE","US","OUR","OURS","YOU","YOUR","YOURS","ME","MY","MINE","I","WHO","WHOM","WHOSE","WHAT","WHICH","WHEN","WHERE","WHY","HOW","AND","OR","BUT","IF","SO","FOR","NOR","YET","BECAUSE","AS","AT","BY","FROM","IN","INTO","OF","OFF","ON","ONTO","OUT","OVER","TO","UP","WITH","THE","A","AN","THIS","THAT","THESE","THOSE","YES","NO","NOT","OK","NOW","THEN","HERE","THERE","SH","SA","AR","ARA","SAN","SANT","SANTH","SANTHO","SO"]);function vt(e){if(!e||typeof e!="string")return"";let t=e.replace(/\([^)]*\)/g,"").replace(/[^a-zA-Z0-9\s'-]/g,"").trim().toUpperCase();return t==="ARAF"&&(t="ARAVIND"),t}function Qt(e){if(!e||typeof e!="string")return!1;const t=vt(e);return!(!t||t.length<3||_a.has(t)||/\b(INT|EXT|SCENE|DAY|NIGHT|MORNING|EVENING|DUSK|DAWN|CUT TO|FADE|TRANSITION)\b/i.test(t)||t.split(/\s+/).length>3||t.length>30)}function Rs(e){if(!Array.isArray(e))return[];const t=[],s=new Set;return e.forEach(n=>{const o=typeof n=="string"?n:n?.name||n?.content||"",l=vt(o);Qt(l)&&(s.has(l)||(s.add(l),t.push(l)))}),t.filter(n=>!(t.some(i=>i!==n&&i.startsWith(n)&&i.length>n.length)||t.some(i=>i!==n&&i.length>=5&&n.length<=4&&i.startsWith(n.slice(0,3)))))}let C=null,fe=null,es=null,Dt=!1,ve=!1,Qe=!0,Je=!1,Kt="EN",Me=[],et=-1,Jt=null,zt=null,rs=null,ue=localStorage.getItem("scriptora_autosave")!=="false",yt="screenplay",ct=!1;const pe=[],hs=["CUT TO:","CUT TO BLACK.","FADE IN:","FADE OUT.","FADE TO BLACK.","DISSOLVE TO:","MATCH CUT TO:","JUMP CUT TO:","SMASH CUT TO:","SLAM TO:","SLAM TO BLACK.","INTERCUT WITH:","WIPE TO:","IRIS IN:","IRIS OUT:","BACK TO:","CONTINUOUS","END"];let vs=0;const St=[];function gt(e){return e?(e.innerText||e.textContent||"").replace(/[\u200B\u00A0\r\n\t ]/g,"").trim().length===0:!0}function Ha(){return window.innerWidth<=768||"ontouchstart"in window||navigator.maxTouchPoints&&navigator.maxTouchPoints>0||/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}function Ds(e,t){const s=Date.now();if(s-vs<150)return!0;if(!Ha())return!1;const a=e.getAttribute("data-block-type")||"action";if(!["action","text","character","transition"].includes(a)||!gt(t))return!1;let n="action";return a==="action"||a==="text"?n="character":a==="character"?n="transition":a==="transition"&&(n="action"),vs=s,St.push({blockId:e.getAttribute("data-block-id"),prevType:a,newType:n}),t.innerText="",ft(e,n),qt(n),ve=!0,ue&&Ae(),!0}const Ls=46;function Ua(e,t=null){const s=h.state.scripts?.find(a=>a.id===e)||h.state.activeScript||{title:"Untitled Screenplay",draft:"Draft 1.0"};return h.state.currentUser?.initials,`
    <div id="editor-root" class="flex flex-col min-h-screen bg-slate-100 text-slate-900 w-full relative select-text antialiased">
      
      <!-- ========================================================= -->
      <!-- STATIC TOP HEADER (FIXED: Never scrolls with screenplay)  -->
      <!-- ========================================================= -->
      <header id="editor-fixed-header" class="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all">
        
        <!-- ROW 1: TOP APP HEADER (Order: Back, Title & Save Status, Auto-Save, Save Icon, Collab) -->
        <div class="h-11 px-3 flex items-center justify-between max-w-5xl mx-auto">
          <div class="flex items-center gap-2 min-w-0">
            <!-- Back to Workspace button -->
            <button aria-label="Back to Workspace" id="editor-back-btn" class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all text-xs font-semibold shrink-0" title="Back to Workspace">
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
              <span class="hidden sm:inline">Workspace</span>
            </button>
            
            <!-- Script Title & Save status -->
            <div class="flex items-center gap-2 select-none min-w-0">
              <div class="flex flex-col min-w-0 leading-tight">
                <span class="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate" id="editor-script-title">${s.title}</span>
                <span class="text-[10px] text-slate-500 truncate font-mono" id="editor-save-status">Saved</span>
              </div>
            </div>
          </div>

          <!-- Right Controls: Unified Save + Auto-Save Pill, Collaborate, Settings Toggle -->
          <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            <!-- Combined Save & Auto-Save Control -->
            <div class="inline-flex items-center rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:border-slate-300 shadow-2xs transition-all overflow-hidden h-7">
              <button id="editor-save-btn" class="flex items-center justify-center pl-2 pr-1.5 h-full text-blue-600 hover:text-blue-700 hover:bg-slate-50 active:scale-95 transition-all" title="Save screenplay now (Ctrl+S)" aria-label="Save Screenplay">
                <span class="material-symbols-outlined text-[16px] text-blue-600" id="editor-save-icon">save</span>
              </button>
              <span class="w-[1px] h-3.5 bg-slate-200 shrink-0"></span>
              <button id="btn-toggle-autosave" class="flex items-center gap-1.5 pl-1.5 pr-2.5 h-full hover:bg-slate-50 active:scale-95 transition-all text-xs font-medium text-slate-700 hover:text-slate-900" title="Toggle Auto-save (Current: ${ue?"ON":"OFF"})">
                <span class="w-1.5 h-1.5 rounded-full ${ue?"bg-emerald-500 animate-pulse":"bg-slate-400"}" id="autosave-dot"></span>
                <span id="autosave-toggle-label">${ue?"Auto":"Off"}</span>
              </button>
            </div>

            <!-- Master Toolbar Visibility Toggle [⋮] -->
            <button id="btn-toggle-editor-toolbar" class="w-7 h-7 flex items-center justify-center ${ct?"text-blue-600 bg-blue-50 border-blue-200/90":"text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50"} rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0" title="${ct?"Collapse Editor Toolbars (Writing Mode)":"Expand Editor Toolbars (Tools & Formatting)"}" aria-label="Toggle Editor Toolbars">
              <span class="material-symbols-outlined text-[18px]">more_vert</span>
            </button>

            <!-- Collaborate Link -->
            <a href="/profile/collaborators?from=editor&scriptId=${e}" id="editor-collab-btn" aria-label="Collaborators" class="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors no-underline" title="Collaborators">
              <span class="material-symbols-outlined text-[19px]">group</span>
            </a>
          </div>
        </div>

        <!-- COLLAPSIBLE SECONDARY TOOLBAR ROWS (Master Visibility via Header [⋮]) -->
        <div id="editor-collapsible-toolbars" class="${ct?"":"hidden"} w-full transition-all duration-200">
          
          <!-- ROW A: HORIZONTAL EDITOR TOOLBAR ([⚙] Settings replaces old three-dot) -->
          <div id="editor-toolbar-strip" class="w-full bg-slate-50/90 border-t border-slate-200/80 px-3 py-1 flex items-center gap-2 overflow-x-auto scrollbar-none text-nowrap max-w-5xl mx-auto transition-all toolbar-scroll">
            
            <!-- [⚙] Settings Icon Button (Formerly three-dot, opens Screenplay Tools & Settings) -->
            <button id="editor-more-menu-btn" class="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 active:scale-95 transition-all shrink-0 shadow-2xs" title="Screenplay Tools & Settings">
              <span class="material-symbols-outlined text-[18px]">settings</span>
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

          <!-- Draft Version button (Moved to First Row between Export and Title Page as in reference) -->
          <button id="versionsModalBtn" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all shrink-0 whitespace-nowrap" title="Draft / Version History">
            <span class="material-symbols-outlined text-[15px] text-blue-600">history</span>
            <span id="currentVersionTag">${s.draft||"Draft 1.0"}</span>
          </button>

          <!-- Title Page button -->
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

        <!-- ROW B: SECONDARY ACCESSORY CONTROLS (Scene Jump, B/I/U/S, Undo/Redo) -->
        <div id="editor-secondary-accessory-bar" class="w-full bg-slate-50/60 border-t border-slate-200/70 px-3 py-1 flex items-center justify-between gap-2 max-w-5xl mx-auto transition-all">
          <div class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none min-w-0">
            <!-- Compact Scene Selector: small length for proper alignment -->
            <div class="relative w-28 sm:w-32 shrink-0">
              <select id="navSceneSelect" class="w-full h-7 pl-2.5 pr-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold truncate appearance-none cursor-pointer focus:outline-none shadow-xs transition-colors">
                <option value="">Scene 1 ▾</option>
              </select>
              <span class="material-symbols-outlined text-[14px] text-white absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
            </div>

            <!-- Text formatting: B, I, U, S (symbol only, compact using standard app Material Symbols) -->
            <div class="flex items-center gap-1 shrink-0 ml-1" id="text-formatting-group">
              <button type="button" id="btn-format-bold" class="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center border border-slate-200/90 active:scale-95 transition-all cursor-pointer" title="Bold Selected Text (Ctrl+B)">
                <span class="material-symbols-outlined text-[16px] sm:text-[17px] leading-none shrink-0 font-bold pointer-events-none">format_bold</span>
              </button>
              <button type="button" id="btn-format-italic" class="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center border border-slate-200/90 active:scale-95 transition-all cursor-pointer" title="Italic Selected Text (Ctrl+I)">
                <span class="material-symbols-outlined text-[16px] sm:text-[17px] leading-none shrink-0 pointer-events-none">format_italic</span>
              </button>
              <button type="button" id="btn-format-underline" class="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center border border-slate-200/90 active:scale-95 transition-all cursor-pointer" title="Underline Selected Text (Ctrl+U)">
                <span class="material-symbols-outlined text-[16px] sm:text-[17px] leading-none shrink-0 pointer-events-none">format_underlined</span>
              </button>
              <button type="button" id="btn-format-strike" class="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center border border-slate-200/90 active:scale-95 transition-all cursor-pointer" title="Strikethrough Selected Text">
                <span class="material-symbols-outlined text-[16px] sm:text-[17px] leading-none shrink-0 pointer-events-none">strikethrough_s</span>
              </button>
            </div>
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
      </div>

      <!-- ALWAYS-VISIBLE SCREENPLAY ELEMENT NAVIGATOR (PRIMARY WRITING CONTROL) -->
      <!-- Permanently visible below secondary toolbar area; completely independent of three-dot toggle -->
      <div id="editor-accessory-tray" class="w-full bg-white border-t border-slate-200 px-3 py-1 flex flex-col gap-1 shadow-xs max-w-5xl mx-auto transition-all">
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
          <!-- 17. Undo -->
          <button class="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0" data-type="undo" title="Undo">
            <span class="material-symbols-outlined text-[18px] shrink-0">undo</span>
            <span class="text-[9px] font-medium leading-none mt-1 truncate">Undo</span>
          </button>
          <!-- 18. Redo -->
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
          <div id="doc-tab-titlepage-wrap" class="flex items-center rounded-t-lg transition-all border-b-2 border-transparent bg-slate-200/60 hover:bg-slate-200 text-slate-600 hover:text-slate-900 group">
            <button id="doc-tab-titlepage" type="button" class="doc-tab-btn flex items-center gap-1.5 pl-3 pr-1 py-1 font-medium cursor-pointer bg-transparent border-0 outline-none text-inherit">
              <span class="material-symbols-outlined text-[14px]">article</span>
              <span>Title Page</span>
            </button>
            <button id="doc-tab-titlepage-close" type="button" class="w-5 h-5 flex items-center justify-center rounded-full hover:bg-slate-300 text-slate-400 hover:text-slate-800 mr-1.5 transition-colors cursor-pointer bg-transparent border-0 outline-none active:scale-95" title="Close Title Page" aria-label="Close Title Page">
              <span class="material-symbols-outlined text-[13px] pointer-events-none">close</span>
            </button>
          </div>
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
      <main id="editor-main-scroll" class="flex-1 w-full pb-16 overflow-y-auto min-h-screen flex flex-col items-center transition-[padding] duration-200 ease-out" style="padding-top: ${ct?"208px":"136px"}; transition: padding-top 0.2s ease-out;">
        
        <!-- Document 1: Continuous A4 Sheets Container -->
        <div id="screenplay-pages-container" class="w-full max-w-4xl flex flex-col items-center gap-8 py-6 px-2 sm:px-4">
          <div class="w-full flex items-center justify-center py-20 text-slate-400">
            <span class="material-symbols-outlined animate-spin text-[28px] mr-2">progress_activity</span>
            <span>Loading screenplay studio...</span>
          </div>
        </div>

        <!-- Document 2: Screenplay Title Page (Parallel document view as in reference) -->
        <div id="title-page-container" class="w-full max-w-4xl hidden flex flex-col items-center py-6 px-2 sm:px-4">
          <div class="screenplay-page-sheet screenplay-title-page-sheet bg-white shadow-md border border-slate-200/90 w-full max-w-[816px] min-h-[1123px] flex flex-col justify-between font-courier text-slate-900 rounded-md relative select-text" style="font-family: 'Courier Prime', 'Courier New', Courier, monospace; font-size: 12pt; line-height: 1.4;">
            <!-- Close Title Page button at top right -->
            <button id="btn-close-titlepage-sheet" type="button" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95" title="Close Title Page (Return to Screenplay)" aria-label="Close Title Page">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
            
            <!-- Generous top whitespace (1/3 of the page) -->
            <div class="h-32 sm:h-44"></div>

            <!-- Centered Screenplay Title & Author Block (Horizontally centered relative to actual page) -->
            <div class="flex flex-col items-center text-center my-auto w-full" style="font-family: 'Courier Prime', 'Courier New', Courier, monospace; font-size: 12pt; line-height: 1.4;">
              <div id="tp-doc-title" contenteditable="true" spellcheck="false" class="tp-field w-full text-center uppercase outline-none focus:bg-blue-50/40 rounded px-2 py-0.5 transition-colors cursor-text select-text font-bold" data-placeholder="CHRONICLES OF DUST" style="font-family: 'Courier Prime', 'Courier New', Courier, monospace; font-size: 12pt; line-height: 1.4; color: #0f172a;"></div>
              
              <div class="my-6 w-full text-center">
                <div id="tp-doc-by" contenteditable="true" spellcheck="false" class="tp-field w-full text-center outline-none focus:bg-blue-50/40 rounded px-2 py-0.5 transition-colors cursor-text select-text" data-placeholder="Written by" style="font-family: 'Courier Prime', 'Courier New', Courier, monospace; font-size: 12pt; line-height: 1.4; color: #0f172a;">Written by</div>
              </div>

              <div id="tp-doc-author" contenteditable="true" spellcheck="false" class="tp-field w-full text-center outline-none focus:bg-blue-50/40 rounded px-2 py-0.5 transition-colors cursor-text select-text font-bold" data-placeholder="Author Name" style="font-family: 'Courier Prime', 'Courier New', Courier, monospace; font-size: 12pt; line-height: 1.4; color: #0f172a;"></div>
            </div>

            <!-- Bottom Left Contact Block (Positioned at 1.5 in left margin line) -->
            <div class="flex flex-col items-start text-left mt-auto pt-20 w-full" style="font-family: 'Courier Prime', 'Courier New', Courier, monospace; font-size: 12pt; line-height: 1.4;">
              <div id="tp-doc-phone" contenteditable="true" spellcheck="false" class="tp-field min-w-[220px] max-w-full text-left outline-none focus:bg-blue-50/40 rounded px-1 py-0.5 transition-colors cursor-text select-text" data-placeholder="Phone: 8680812008" style="font-family: 'Courier Prime', 'Courier New', Courier, monospace; font-size: 12pt; line-height: 1.4; color: #0f172a;"></div>
              <div id="tp-doc-email" contenteditable="true" spellcheck="false" class="tp-field min-w-[220px] max-w-full text-left outline-none focus:bg-blue-50/40 rounded px-1 py-0.5 transition-colors cursor-text select-text" data-placeholder="E-mail: aravind.s0618@gmail.com" style="font-family: 'Courier Prime', 'Courier New', Courier, monospace; font-size: 12pt; line-height: 1.4; color: #0f172a;"></div>
              <div id="tp-doc-address" contenteditable="true" spellcheck="false" class="tp-field min-w-[220px] max-w-full text-left outline-none focus:bg-blue-50/40 rounded px-1 py-0.5 transition-colors cursor-text select-text" data-placeholder="Address" style="font-family: 'Courier Prime', 'Courier New', Courier, monospace; font-size: 12pt; line-height: 1.4; color: #0f172a;"></div>
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

            <!-- VIEW & DISPLAY -->
            <div class="py-2 flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">View & Display</span>
              <button id="menu-btn-focus-mode" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">center_focus_strong</span>
                <span class="flex-1 font-medium">Toggle Focus Mode</span>
                <span id="menuFocusState" class="text-[10px] text-blue-600 font-semibold">Off</span>
              </button>
              <button id="menu-btn-go-page" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">auto_stories</span>
                <span class="flex-1 font-medium">Go to Page...</span>
              </button>
            </div>

            <!-- PAGE MANAGEMENT -->
            <div class="py-2 flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Page Management</span>
              <button id="menu-btn-page-break" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left transition-colors">
                <span class="material-symbols-outlined text-[16px] text-blue-600">insert_page_break</span>
                <span class="flex-1 font-medium">Page Break</span>
                <span class="text-[10px] text-slate-400">Ctrl+Enter</span>
              </button>
              <button id="menu-btn-insert-page" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left transition-colors">
                <span class="material-symbols-outlined text-[16px] text-blue-600">note_add</span>
                <span class="flex-1 font-medium">Insert Page</span>
                <span class="text-[10px] text-slate-400">At Cursor</span>
              </button>
              <button id="menu-btn-page-before" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left transition-colors">
                <span class="material-symbols-outlined text-[16px] text-slate-600">arrow_upward</span>
                <span class="flex-1 font-medium">Add Page Before</span>
                <span class="text-[10px] text-slate-400">Prepend</span>
              </button>
              <button id="menu-btn-page-at-end" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left transition-colors">
                <span class="material-symbols-outlined text-[16px] text-slate-600">arrow_downward</span>
                <span class="flex-1 font-medium">Add Page at End</span>
                <span class="text-[10px] text-slate-400">Append</span>
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

          <div class="flex flex-col gap-2.5">
            <!-- Quick Preset Visuals -->
            <div class="flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Visual Presets</span>
              <div class="grid grid-cols-3 gap-1.5" id="imgPresetsRow">
                <button type="button" class="img-preset-btn p-1 rounded-lg border border-slate-200 hover:border-blue-500 bg-slate-50 flex flex-col items-center gap-1 text-[10px] text-slate-600 transition-all cursor-pointer" data-url="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80" data-caption="INT. CUSTOMS OFFICE - Concept Lighting">
                  <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=160&auto=format&fit=crop&q=60" class="w-full h-10 object-cover rounded pointer-events-none" />
                  <span class="truncate w-full text-center font-medium">Interior</span>
                </button>
                <button type="button" class="img-preset-btn p-1 rounded-lg border border-slate-200 hover:border-blue-500 bg-slate-50 flex flex-col items-center gap-1 text-[10px] text-slate-600 transition-all cursor-pointer" data-url="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80" data-caption="EXT. INDUSTRIAL SECTOR - Wide Framing">
                  <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=160&auto=format&fit=crop&q=60" class="w-full h-10 object-cover rounded pointer-events-none" />
                  <span class="truncate w-full text-center font-medium">Exterior</span>
                </button>
                <button type="button" class="img-preset-btn p-1 rounded-lg border border-slate-200 hover:border-blue-500 bg-slate-50 flex flex-col items-center gap-1 text-[10px] text-slate-600 transition-all cursor-pointer" data-url="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80" data-caption="CHARACTER FOCUS - High Tension Beat">
                  <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=160&auto=format&fit=crop&q=60" class="w-full h-10 object-cover rounded pointer-events-none" />
                  <span class="truncate w-full text-center font-medium">Character</span>
                </button>
              </div>
            </div>

            <div class="flex items-center gap-2 my-0.5">
              <div class="h-[1px] bg-slate-200 flex-1"></div>
              <span class="text-[10px] text-slate-400 font-medium">OR CUSTOM IMAGE</span>
              <div class="h-[1px] bg-slate-200 flex-1"></div>
            </div>

            <label class="text-[11px] font-semibold text-slate-600">Image URL</label>
            <input type="url" id="imgUrlInput" placeholder="https://example.com/storyboard.jpg" class="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 outline-none focus:border-blue-500 bg-slate-50" />
            
            <label class="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer text-xs text-slate-600 transition-all">
              <span class="material-symbols-outlined text-[18px] text-blue-600">cloud_upload</span>
              <span id="imgUploadLabel">Choose local image...</span>
              <input type="file" id="imgFileInput" accept="image/*" class="hidden" />
            </label>

            <!-- Preview box -->
            <div id="imgPreviewContainer" class="hidden w-full h-24 rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200">
              <img id="imgPreviewThumb" src="" alt="Preview" class="w-full h-full object-cover" />
              <button type="button" id="clearImgPreviewBtn" class="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-900/70 text-white flex items-center justify-center text-[10px]">✕</button>
            </div>

            <label class="text-[11px] font-semibold text-slate-600 mt-0.5">Caption (optional)</label>
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
              <p class="text-xs font-semibold text-slate-700">Screenplay Options</p>
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

            <!-- Page-Related Export Settings -->
            <div class="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <p class="text-xs font-semibold text-slate-700">Page Export Settings</p>
              
              <!-- Page Range -->
              <div class="flex flex-col gap-1.5">
                <label for="exportPageRangeSelect" class="text-[11px] font-medium text-slate-600">Page Range</label>
                <div class="flex items-center gap-2">
                  <select id="exportPageRangeSelect" class="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-600 cursor-pointer">
                    <option value="all">All Pages</option>
                    <option value="current">Current Page Only</option>
                    <option value="custom">Custom Range...</option>
                  </select>
                  <input type="text" id="exportCustomRangeInput" placeholder="e.g. 1-3, 5" class="hidden w-28 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-600 font-mono" />
                </div>
              </div>

              <!-- Page Options Checkboxes -->
              <label class="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700">
                <input type="checkbox" id="optPageNumbers" checked class="w-4 h-4 accent-blue-600 rounded">
                <span>Include page headers & numbers (Top Right)</span>
              </label>
              <label class="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700">
                <input type="checkbox" id="optPreservePageBreaks" checked class="w-4 h-4 accent-blue-600 rounded">
                <span>Preserve explicit page breaks</span>
              </label>
              <label class="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700">
                <input type="checkbox" id="optStandardMargins" checked class="w-4 h-4 accent-blue-600 rounded">
                <span>Standard Writers Guild A4 margins (1.5" Left, 1.0" Right)</span>
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
  `}function Ye({id:e,name:t,close:s,restore:a}){try{window.history.pushState({editorSubViewId:e,editorSubViewName:t},"")}catch{}pe.push({id:e,name:t,close:s,restore:a})}function q(e){const t=pe.findIndex(s=>s.id===e);if(t!==-1){if(t===pe.length-1){const s=pe.pop();s&&typeof s.close=="function"&&s.close();const a=pe[pe.length-1];a&&typeof a.restore=="function"&&a.restore()}else{const s=pe.splice(t,1)[0];s&&typeof s.close=="function"&&s.close()}try{window.history.back()}catch{}}}function Fa(){if(yt==="titlepage")return Ct(),!0;if(pe.length>0){const e=pe.pop();e&&typeof e.close=="function"&&e.close();const t=pe[pe.length-1];return t&&typeof t.restore=="function"&&t.restore(),!0}return!1}async function qa(e,t){pe.length=0,window.__scriptoraEditorPopstate=l=>yt==="titlepage"?(Et("screenplay"),!0):pe.length>0?Fa():!1;const s=document.getElementById("editor-back-btn");s&&(s.onclick=()=>{if(yt==="titlepage"){Ct();return}if(pe.length>0){window.history.back();return}ve&&bt(!1),window.__scriptoraEditorPopstate=null,t("/workspace")}),C=await oa(e),Pe(),Ft();const a=document.getElementById("editor-save-btn");a&&(a.onclick=()=>bt(!0)),Ga(),Wa();const n=document.getElementById("editor-collab-btn");n&&(n.onclick=l=>{l.preventDefault(),ve&&bt(!1),h.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile/collaborators?from=editor&scriptId=${e}`)});const o=document.getElementById("editor-profile-btn");o&&(o.onclick=l=>{l.preventDefault(),ve&&bt(!1),h.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile?from=editor&scriptId=${e}`)}),window.addEventListener("keydown",Va),rn(e,t),an(),nn(),ln(),Ka(),za(),cn(),dn(e),en()}function Va(e){(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"&&(e.preventDefault(),bt(!0)),(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="f"&&(e.preventDefault(),_t(!0)),(e.ctrlKey||e.metaKey)&&e.key==="Enter"&&(e.preventDefault(),cs())}function Ga(){const e=document.getElementById("btn-toggle-autosave"),t=document.getElementById("autosave-dot"),s=document.getElementById("autosave-toggle-label");e&&(e.onclick=a=>{a.stopPropagation(),ue=!ue,localStorage.setItem("scriptora_autosave",String(ue)),ue?(t&&(t.className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"),s&&(s.textContent="Auto"),e.title="Toggle Auto-save (Current: ON)",w("Auto-save enabled"),ve&&Ae()):(t&&(t.className="w-1.5 h-1.5 rounded-full bg-slate-400"),s&&(s.textContent="Off"),e.title="Toggle Auto-save (Current: OFF)",clearTimeout(es),w("Auto-save disabled · Tap floppy to save"))})}function kt(){const e=document.getElementById("editor-fixed-header"),t=document.getElementById("editor-main-scroll");if(!e||!t)return;if(Je){t.style.paddingTop=`${e.offsetHeight||56}px`,t.style.paddingBottom="32px";return}const s=e.offsetHeight;s>0&&(t.style.paddingTop=`${s}px`,t.style.paddingBottom="88px")}function Wa(){const e=document.getElementById("btn-toggle-editor-toolbar"),t=document.getElementById("editor-collapsible-toolbars");kt(),window.addEventListener("resize",kt),e&&(e.onclick=s=>{s.preventDefault(),s.stopPropagation(),ct=!ct,ct?(t&&t.classList.remove("hidden"),e.className="w-7 h-7 flex items-center justify-center text-blue-600 bg-blue-50 border-blue-200/90 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Collapse Editor Toolbars (Writing Mode)"):(t&&t.classList.add("hidden"),e.className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Expand Editor Toolbars (Tools & Formatting)"),kt()})}function Ct(){if(yt==="titlepage"){Et("screenplay");try{window.history.state?.editorTab==="titlepage"&&window.history.back()}catch{}}}function Ka(){const e=document.getElementById("doc-tab-screenplay"),t=document.getElementById("doc-tab-titlepage"),s=document.getElementById("btn-quick-title-page"),a=document.getElementById("menu-btn-title-page"),n=document.getElementById("doc-tab-titlepage-close"),o=document.getElementById("btn-close-titlepage-sheet");e&&(e.onclick=()=>Ct()),t&&(t.onclick=l=>{l.preventDefault(),Et("titlepage")}),n&&(n.onclick=l=>{l.preventDefault(),l.stopPropagation(),Ct()}),o&&(o.onclick=l=>{l.preventDefault(),l.stopPropagation(),Ct()}),s&&(s.onclick=()=>Et("titlepage")),a&&(a.onclick=()=>{q("moreMenu"),Et("titlepage")})}function Et(e){if(yt===e)return;yt=e;const t=document.getElementById("screenplay-pages-container"),s=document.getElementById("title-page-container"),a=document.getElementById("doc-tab-screenplay"),n=document.getElementById("doc-tab-titlepage-wrap");if(e==="titlepage"){t&&t.classList.add("hidden"),s&&(s.classList.remove("hidden"),s.classList.add("flex")),n&&(n.className="flex items-center rounded-t-lg transition-all border-b-2 border-blue-600 bg-white text-blue-700 shadow-2xs group"),a&&(a.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 rounded-t-lg transition-all"),Ja();try{window.history.state?.editorTab!=="titlepage"&&window.history.pushState({editorTab:"titlepage"},"")}catch{}}else s&&(s.classList.add("hidden"),s.classList.remove("flex")),t&&t.classList.remove("hidden"),a&&(a.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-blue-600 text-blue-700 bg-white rounded-t-lg transition-all shadow-2xs"),n&&(n.className="flex items-center rounded-t-lg transition-all border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 group");kt()}function Ja(){if(!C)return;const e=C.titlePage||{},t=document.getElementById("tp-doc-title"),s=document.getElementById("tp-doc-by"),a=document.getElementById("tp-doc-author"),n=document.getElementById("tp-doc-phone"),o=document.getElementById("tp-doc-email"),l=document.getElementById("tp-doc-address"),i=e.title||C.title||"";t&&(t.innerText=i,i||(t.innerHTML=""));const r=e.by!==void 0?e.by:"Written by";s&&(s.innerText=r,r||(s.innerHTML=""));const u=e.author||"";a&&(a.innerText=u,u||(a.innerHTML=""));let p=e.phone||"";if(!p&&e.contact){const m=e.contact.split("·").map(f=>f.trim()).find(f=>f.includes("+")||/\d{3}/.test(f));m&&(p=m)}n&&(n.innerText=p,p||(n.innerHTML=""));let x=e.email||"";if(!x&&e.contact&&e.contact.includes("@")){const d=e.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);d&&(x=d[0])}o&&(o.innerText=x,x||(o.innerHTML=""));const c=e.address||"";l&&(l.innerText=c,c||(l.innerHTML=""))}function za(){const e=document.getElementById("tp-doc-title"),t=document.getElementById("tp-doc-by"),s=document.getElementById("tp-doc-author"),a=document.getElementById("tp-doc-phone"),n=document.getElementById("tp-doc-email"),o=document.getElementById("tp-doc-address"),l=()=>{if(!C)return;C.titlePage||(C.titlePage={});const i=e?e.innerText.trim():"",r=t?t.innerText.trim():"",u=s?s.innerText.trim():"",p=a?a.innerText.trim():"",x=n?n.innerText.trim():"",c=o?o.innerText.trim():"";if(C.titlePage.title=i,C.titlePage.by=r||"Written by",C.titlePage.author=u,C.titlePage.phone=p,C.titlePage.email=x,C.titlePage.address=c,C.titlePage.contact=[p,x,c].filter(Boolean).join(" · "),i){C.title=i;const d=document.getElementById("editor-script-title"),m=document.getElementById("doc-tab-title-label");d&&(d.textContent=i),m&&(m.textContent=i)}ve=!0,ht("Unsaved"),ue&&Ae()};[e,t,s,a,n,o].forEach(i=>{i&&(i.oninput=l,i.onblur=()=>{i.innerText.trim()===""&&(i.innerHTML=""),l()})})}function Pe(){const e=document.getElementById("screenplay-pages-container");if(!e||!C)return;const t=C.scenes||[],s=[];t.forEach(l=>{(l.blocks||[]).forEach(i=>{s.push({block:i,sceneNumber:l.number,sceneId:l.id,slugline:l.slugline})})});const a=[];let n={pageNumber:1,items:[]},o=0;s.forEach(l=>{if(l.block.type==="pagebreak"){n.items.push(l),a.push(n),n={pageNumber:a.length+1,items:[]},o=0;return}const i=Ms(l.block);o+i>Ls&&n.items.length>0&&(a.push(n),n={pageNumber:a.length+1,items:[]},o=0),n.items.push(l),o+=i}),n.items.length>0&&a.push(n),a.length===0&&a.push({pageNumber:1,items:[{block:{id:"b-1-1",type:"scene",content:"INT. NEW SCENE - DAY"},sceneNumber:1,sceneId:"scene-1",slugline:"INT. NEW SCENE - DAY"},{block:{id:"b-1-2",type:"action",content:"Type your screenplay action here..."},sceneNumber:1,sceneId:"scene-1",slugline:"INT. NEW SCENE - DAY"}]}),e.innerHTML=a.map(l=>`
    <div class="screenplay-page-sheet w-full max-w-[816px] min-h-[1123px] bg-white rounded-md sm:rounded-lg shadow-md border border-slate-200/90 flex flex-col font-courier text-[12pt] leading-[1.25] text-slate-900 relative transition-all" data-page-num="${l.pageNumber}">
      
      <!-- Top Page Header: Page number in top right (Only for Page > 1, no watermark overlay) -->
      <div class="w-full flex items-center justify-end h-7 pb-2 select-none text-[12pt] text-slate-600 font-courier">
        <span>${l.pageNumber>1?`${l.pageNumber}.`:""}</span>
      </div>

      <!-- Screenplay Blocks naturally flowing across this A4 page -->
      <div class="page-blocks-wrapper flex flex-col flex-1 w-full">
        ${l.items.map(i=>_s(i.block,i.sceneNumber,i.sceneId)).join("")}
      </div>

      <!-- Bottom Page Boundary indicator with Page Controls -->
      <div class="w-full pt-6 select-none flex items-center justify-between text-[11px] text-slate-400 font-sans border-t border-slate-100 mt-4">
        <button type="button" class="btn-page-add-before px-2 py-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-all" data-page-num="${l.pageNumber}" title="Add a new page before Page ${l.pageNumber}">
          <span class="material-symbols-outlined text-[14px]">arrow_upward</span>
          <span class="hidden sm:inline">Add Page Before</span>
        </button>
        <span class="tracking-widest uppercase text-slate-300 font-bold">— PAGE ${l.pageNumber} —</span>
        <button type="button" class="btn-page-add-after px-2 py-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-all" data-page-num="${l.pageNumber}" title="Insert Page after Page ${l.pageNumber}">
          <span class="material-symbols-outlined text-[14px]">add</span>
          <span class="hidden sm:inline">Insert Page</span>
        </button>
      </div>

    </div>
  `).join(""),Xa(),Vt()}function Ms(e){if(e.type==="pagebreak")return 1;const t=e.content||"";return e.type==="scene"?3:e.type==="action"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="character"?2:e.type==="parenthetical"?1:e.type==="dialogue"?Math.max(1,Math.ceil(t.length/38))+1:e.type==="transition"||e.type==="shot"?2:e.type==="text"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="note"||e.type==="outline"?2:e.type==="act"||e.type==="endact"?3:e.type==="sequence"?2:e.type==="dual"?4:e.type==="lyrics"?2:e.type==="image"?10:2}function ys(e){let t=!1;(C.scenes||[]).forEach(s=>{const a=(s.blocks||[]).findIndex(n=>n.id===e);a!==-1&&(s.blocks.splice(a,1),t=!0)}),t&&(ve=!0,Pe(),w("Page break removed"),ue&&Ae())}function cs(e=null){const t=e||fe,s=C.scenes||[];if(s.length===0)return;const a={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"};let n=!1;if(t)for(let o of s){const l=(o.blocks||[]).findIndex(i=>i.id===t);if(l!==-1){o.blocks.splice(l+1,0,a),n=!0;break}}if(!n){const o=s[s.length-1];o.blocks||(o.blocks=[]),o.blocks.push(a)}ve=!0,Pe(),w("Page break inserted"),ue&&Ae()}function Os(e=null){const t=e||fe,s=C.scenes||[];if(s.length===0){ds();return}const a={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},n={id:"b-"+Date.now(),type:"action",content:""};let o=null,l=-1;if(t)for(let i of s){const r=(i.blocks||[]).findIndex(u=>u.id===t);if(r!==-1){o=i,l=r+1;break}}o||(o=s[s.length-1],l=o.blocks.length),o.blocks.splice(l,0,a,n),ve=!0,Pe(),setTimeout(()=>{const i=document.getElementById(n.id);if(i){const r=i.hasAttribute("contenteditable")?i:i.querySelector('[contenteditable="true"]');r&&r.focus(),i.scrollIntoView({behavior:"smooth",block:"center"})}},50),w("New page inserted"),ue&&Ae()}function Ya(e){const t=document.querySelector(`.screenplay-page-sheet[data-page-num="${e}"]`);let s=null;if(t){const a=t.querySelectorAll(".screenplay-block");a.length>0&&(s=a[a.length-1].getAttribute("data-block-id"))}Os(s)}function ds(){const e=C.scenes||[],t=e.length+1,s={id:"scene-"+Date.now(),number:t,slugline:`INT. SCENE ${t} - DAY`,blocks:[{id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},{id:"b-"+Date.now()+"-1",type:"scene",content:`INT. SCENE ${t} - DAY`},{id:"b-"+Date.now()+"-2",type:"action",content:""}]};e.push(s),ve=!0,Pe(),setTimeout(()=>{const n=document.getElementById(s.blocks[1].id);if(n){const o=n.hasAttribute("contenteditable")?n:n.querySelector('[contenteditable="true"]');o&&o.focus(),n.scrollIntoView({behavior:"smooth",block:"center"})}},80);const a=document.querySelectorAll(".screenplay-page-sheet").length;w(`Added Page at End (Page ${a})`),ue&&Ae()}function js(e=null){let t=e;if(!t&&fe){const p=document.getElementById(fe),x=p?p.closest(".screenplay-page-sheet"):null;x&&(t=parseInt(x.getAttribute("data-page-num"),10))}t||(t=1);const s=C.scenes||[];if(s.length===0){ds();return}if(t<=1){const p={id:"scene-"+Date.now(),number:1,slugline:"INT. SCENE 1 - DAY",blocks:[{id:"b-"+Date.now()+"-1",type:"scene",content:"INT. SCENE 1 - DAY"},{id:"b-"+Date.now()+"-2",type:"action",content:""},{id:"pb-"+Date.now()+"-3",type:"pagebreak",content:"PAGE BREAK"}]};s.unshift(p),s.forEach((x,c)=>{x.number=c+1}),ve=!0,Pe(),Ft(),setTimeout(()=>{const x=document.getElementById(p.blocks[0].id);if(x){const c=x.hasAttribute("contenteditable")?x:x.querySelector('[contenteditable="true"]');c&&c.focus(),x.scrollIntoView({behavior:"smooth",block:"center"})}},80),w("Added Page Before (Page 1)"),ue&&Ae();return}const a=document.querySelector(`.screenplay-page-sheet[data-page-num="${t}"]`);let n=null;if(a){const p=a.querySelector(".screenplay-block");p&&(n=p.getAttribute("data-block-id"))}let o=null,l=-1;if(n)for(let p of s){const x=(p.blocks||[]).findIndex(c=>c.id===n);if(x!==-1){o=p,l=x;break}}o||(o=s[0],l=0);const i={id:"pb-"+Date.now()+"-a",type:"pagebreak",content:"PAGE BREAK"},r={id:"b-"+Date.now()+"-b",type:"action",content:""},u={id:"pb-"+Date.now()+"-c",type:"pagebreak",content:"PAGE BREAK"};o.blocks.splice(l,0,i,r,u),ve=!0,Pe(),setTimeout(()=>{const p=document.getElementById(r.id);if(p){const x=p.hasAttribute("contenteditable")?p:p.querySelector('[contenteditable="true"]');x&&x.focus(),p.scrollIntoView({behavior:"smooth",block:"center"})}},80),w(`Added Page Before (Page ${t})`),ue&&Ae()}function _s(e,t,s){const a=e.type==="pagebreak",n=e.type==="scene",o=e.type==="character",l=e.type==="parenthetical",i=e.type==="dialogue",r=e.type==="transition",u=e.type==="shot",p=e.type==="text",x=e.type==="note",c=e.type==="outline",d=e.type==="act",m=e.type==="endact",f=e.type==="sequence",b=e.type==="dual",g=e.type==="lyrics",E=e.type==="image",A=e.type==="action"||!a&&!n&&!o&&!l&&!i&&!r&&!u&&!p&&!x&&!c&&!d&&!m&&!f&&!b&&!g&&!E;if(a)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="pagebreak" tabindex="0" class="screenplay-block my-3 select-none flex items-center justify-between px-3 py-2 text-slate-400 bg-slate-50 border border-dashed border-slate-300 rounded-lg group hover:border-blue-400 hover:bg-blue-50/30 transition-all outline-none focus:ring-1 focus:ring-blue-500">
        <div class="flex items-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase text-slate-500 group-hover:text-blue-600">
          <span class="material-symbols-outlined text-[16px] text-blue-500">insert_page_break</span>
          <span>PAGE BREAK</span>
        </div>
        <button type="button" class="btn-remove-pagebreak p-0.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors" data-block-id="${e.id}" title="Remove Page Break">
          <span class="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    `;if(n)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="scene" class="screenplay-block flex items-baseline py-2 font-bold text-slate-900 mt-4 mb-2 group w-full">
        <!-- Scene Number shown in left gutter -->
        <span class="scene-num-indicator -ml-10 w-7 mr-3 shrink-0 font-mono text-slate-400 font-bold select-none text-[12pt] text-right ${Qe?"":"hidden"}">${t}</span>
        <div class="flex-1 tracking-wider uppercase outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${ke(e.content)}</div>
      </div>
    `;if(A)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${ke(e.content)}</div>
    `;if(o)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="character" class="screenplay-block uppercase font-bold tracking-wider text-slate-900 text-left mt-3.5 mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[37%] max-w-[28ch]" contenteditable="true" spellcheck="false">${ke(e.content)}</div>
    `;if(l)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="parenthetical" class="screenplay-block italic text-slate-600 text-left mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[26%] max-w-[24ch]" contenteditable="true" spellcheck="false">${ke(e.content)}</div>
    `;if(i)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dialogue" class="screenplay-block text-left text-slate-900 mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[17%] max-w-[36ch]" contenteditable="true" spellcheck="false">${ke(e.content)}</div>
    `;if(r)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="transition" class="screenplay-block w-full text-right uppercase font-bold tracking-wider text-slate-900 mt-2 mb-4 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${ke(e.content)}</div>
    `;if(u)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="shot" class="screenplay-block uppercase font-bold tracking-wider text-slate-900 text-left my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${ke(e.content||"CLOSE ON:")}</div>
    `;if(p)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="text" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${ke(e.content)}</div>
    `;if(x)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="note" class="screenplay-block text-amber-900 bg-amber-50/80 border-l-4 border-amber-400 p-2 my-2.5 rounded-r font-mono text-xs outline-none focus:ring-1 focus:ring-amber-400 cursor-text select-text" contenteditable="true" spellcheck="false">${ke(e.content||"[[ NOTE: Script comment... ]]")}</div>
    `;if(c)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="outline" class="screenplay-block text-slate-500 uppercase tracking-widest font-sans font-bold text-xs my-2 border-b border-slate-200 pb-1 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${ke(e.content||"OUTLINE BEAT")}</div>
    `;if(d)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="act" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-base outline-none focus:bg-blue-50/50 rounded px-1 cursor-text underline decoration-2 underline-offset-4" contenteditable="true" spellcheck="false">${ke(e.content||"ACT I")}</div>
    `;if(m)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="endact" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${ke(e.content||"END OF ACT I")}</div>
    `;if(f)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="sequence" class="screenplay-block uppercase font-bold tracking-wide text-slate-800 my-3 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${ke(e.content||"SEQUENCE 1")}</div>
    `;if(b)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dual" class="screenplay-block screenplay-dual-dialogue-grid">
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${ke(e.char1||"CHARACTER A")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${ke(e.dia1||"Dialogue A")}</div>
        </div>
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${ke(e.char2||"CHARACTER B")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${ke(e.dia2||"Dialogue B")}</div>
        </div>
      </div>
    `;if(g)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="lyrics" class="screenplay-block text-center italic text-slate-800 my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${ke(e.content||"♫ Musical lyrics... ♫")}</div>
    `;if(E){const S=e.url||e.content||"https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80",I=ts(e.caption||"");return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="image" class="screenplay-block my-4 flex flex-col items-center group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-2.5 shadow-2xs transition-all">
        <div class="w-full flex items-center justify-center min-h-[180px] max-h-[420px] rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200/60">
          <img src="${S}" alt="${I||"Storyboard"}" class="max-h-[400px] w-auto max-w-full object-contain rounded-md shadow-xs bg-white" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80';" loading="eager" />
        </div>
        <div class="text-[11px] font-sans text-slate-600 italic mt-2 text-center outline-none px-2 py-0.5 rounded focus:bg-white w-full cursor-text" contenteditable="true" data-placeholder="Add a storyboard caption...">${I||"Storyboard visual concept"}</div>
        <button class="btn-delete-img-block absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-md text-xs font-bold" data-block-id="${e.id}" data-scene-id="${s}" title="Delete image">✕</button>
      </div>
    `}return`
    <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true">${ke(e.content)}</div>
  `}function ke(e){if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return ts(e);try{let o=function(l){const i=Array.from(l.childNodes);for(const r of i)if(r.nodeType===Node.ELEMENT_NODE){if(r.tagName==="SPAN"&&(r.style?.textDecoration?.includes("line-through")||r.style?.textDecorationLine?.includes("line-through"))){const p=document.createElement("s");p.innerHTML=r.innerHTML,l.replaceChild(p,r),o(p);continue}if(n.has(r.tagName)){for(;r.attributes.length>0;)r.removeAttribute(r.attributes[0].name);o(r)}else{const u=document.createTextNode(r.textContent||"");l.replaceChild(u,r)}}};var t=o;const a=new DOMParser().parseFromString(`<body>${e}</body>`,"text/html"),n=new Set(["B","STRONG","I","EM","U","S","STRIKE","DEL","BR","SPAN"]);return o(a.body),a.body.innerHTML}catch{return ts(e)}}function ts(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}function At(e){if(!e||typeof e!="string")return e;let t=e.replace(/^(\s*["'“‘(]*)([a-z\u00E0-\u00FC])/u,(s,a,n)=>a+n.toUpperCase());return t=t.replace(/([.!?]["'”’)]*\s+["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,a,n)=>a+n.toUpperCase()),t=t.replace(/(\n\s*["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,a,n)=>a+n.toUpperCase()),t}function xt(e){let t=0;const s=window.getSelection();if(s&&s.rangeCount>0){const a=s.getRangeAt(0),n=a.cloneRange();n.selectNodeContents(e),n.setEnd(a.endContainer,a.endOffset),t=n.toString().length}return t}function mt(e,t){const s=window.getSelection();if(!s)return;const a=document.createRange();if(t<=0){a.selectNodeContents(e),a.collapse(!0),s.removeAllRanges(),s.addRange(a);return}let n=0,o=!1;function l(i){if(!o){if(i.nodeType===Node.TEXT_NODE){const r=i.nodeValue.length;if(n+r>=t){a.setStart(i,Math.min(t-n,r)),a.collapse(!0),o=!0;return}n+=r}else for(let r=0;r<i.childNodes.length;r++)if(l(i.childNodes[r]),o)return}}l(e),o||(a.selectNodeContents(e),a.collapse(!1)),s.removeAllRanges(),s.addRange(a)}function Hs(e){const t=e.hasAttribute("contenteditable")?e:e.querySelector('[contenteditable="true"]');t&&(t.onfocus=()=>{fe=e.getAttribute("data-block-id");const s=e.getAttribute("data-block-type")||"action";qt(s),s==="transition"&&gt(t)?Tt(e,t):s!=="transition"&&ot()},t.addEventListener("click",()=>{(e.getAttribute("data-block-type")||"action")==="transition"&&gt(t)&&Tt(e,t)}),t.addEventListener("beforeinput",s=>{(s.data===" "||s.inputType==="insertText"&&s.data===" ")&&gt(t)&&Ds(e,t)&&s.preventDefault()}),t.oninput=()=>{ve=!0;const s=e.getAttribute("data-block-type")||"action",a=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!a){const n=t.innerText,o=At(n);if(o!==n){const l=xt(t);t.innerText=o,mt(t,l)}}st(e,t.innerHTML),ht("Unsaved"),ue&&Ae(),Tt(e,t),Vt()},t.onblur=()=>{const s=e.getAttribute("data-block-type")||"action",a=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!a){const n=t.innerText,o=At(n);o!==n&&(t.innerText=o)}if(st(e,t.innerHTML),s==="character")ps(t.innerText);else if(s==="scene"){const n=pt(t.innerText);n.location&&us(n.location)}},t.onpaste=()=>{const s=e.getAttribute("data-block-type")||"action";setTimeout(()=>{const a=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!a){const n=t.innerText,o=At(n);if(o!==n){const l=xt(t);t.innerText=o,mt(t,l)}}st(e,t.innerHTML)},0)},t.onkeydown=s=>{Za(s,e,t)})}function Xa(){document.querySelectorAll(".screenplay-block").forEach(Hs),document.querySelectorAll(".btn-delete-img-block").forEach(t=>{t.onclick=s=>{s.stopPropagation();const a=t.getAttribute("data-block-id"),n=t.getAttribute("data-scene-id");a&&n&&It(n,a)}}),document.querySelectorAll(".btn-remove-pagebreak").forEach(t=>{t.onclick=s=>{s.stopPropagation();const a=t.getAttribute("data-block-id");a&&ys(a)}}),document.querySelectorAll('[data-block-type="pagebreak"]').forEach(t=>{t.onkeydown=s=>{if(s.key==="Backspace"||s.key==="Delete"){s.preventDefault();const a=t.getAttribute("data-block-id");a&&ys(a)}}}),document.querySelectorAll(".btn-page-add-before").forEach(t=>{t.onclick=s=>{s.stopPropagation();const a=parseInt(t.getAttribute("data-page-num"),10)||1;js(a)}}),document.querySelectorAll(".btn-page-add-after").forEach(t=>{t.onclick=s=>{s.stopPropagation();const a=parseInt(t.getAttribute("data-page-num"),10)||1;Ya(a)}})}function pt(e){const t=e.match(/^(INT\.\/EXT\.|INT\.|EXT\.|I\/E\.)\s*/i),s=t?t[1].toUpperCase():"INT.",n=(t?e.slice(t[0].length):e).split(/\s+-\s*|\s+-/),o=(n[0]||"").trim().toUpperCase(),l=(n[1]||"").trim().toUpperCase();return{intExt:s,location:o,time:l}}function ps(e){if(!C)return;const t=vt(e);Qt(t)&&(Array.isArray(C.characters)||(C.characters=[]),C.characters=C.characters.filter(s=>{const a=vt(s);return!(!Qt(a)||t.startsWith(a)&&a.length<t.length||t.length>=5&&a.length<=4&&t.startsWith(a.slice(0,3)))}),C.characters.includes(t)||C.characters.push(t))}function us(e){if(!C)return;const t=(e||"").trim().toUpperCase();!t||t.length<2||(Array.isArray(C.locations)||(C.locations=[]),C.locations=C.locations.filter(s=>t.startsWith(s)&&s.length<t.length?C.scenes?.some(n=>n.blocks?.some(o=>o.type==="scene"&&pt(o.content).location===s)):!0),C.locations.includes(t)||C.locations.push(t))}function st(e,t){if(!C)return;const s=e.getAttribute("data-block-id"),a=e.getAttribute("data-scene-id"),n=C.scenes.find(l=>l.id===a);if(!n)return;const o=n.blocks.find(l=>l.id===s);if(o&&(o.type==="image"?o.caption=t:o.content=t,o.type==="scene")){const l=(t||"").replace(/<[^>]+>/g,""),i=pt(l);o.intExt=i.intExt,o.location=i.location,o.time=i.time,n.slugline=l,n.location=i.location,n.time=i.time}}function It(e,t){if(!C)return;const s=C.scenes.find(o=>o.id===e);if(!s)return;const a=s.blocks.findIndex(o=>o.id===t);if(a!==-1&&(s.blocks.splice(a,1),ve=!0,ue&&Ae()),s.blocks.length===0&&C.scenes.length>1){const o=C.scenes.findIndex(l=>l.id===e);o!==-1&&(C.scenes.splice(o,1),C.scenes.forEach((l,i)=>{l.number=i+1}),Ft())}else s.blocks.length===0&&s.blocks.push({id:`b-${Date.now().toString().slice(-6)}`,type:"action",content:""});const n=document.getElementById(t);n&&n.remove(),Vt()}function Za(e,t,s){const a=t.getAttribute("data-block-type"),n=t.getAttribute("data-scene-id"),o=t.getAttribute("data-block-id"),l=document.getElementById("editor-autocomplete-dropdown");if(l&&!l.classList.contains("hidden")){if(e.key==="ArrowDown"){e.preventDefault(),ws(1);return}if(e.key==="ArrowUp"){e.preventDefault(),ws(-1);return}if(e.key==="Enter"||e.key==="Tab"){const i=l.querySelector(".autocomplete-item.active");if(i){e.preventDefault(),i.click();return}}if(e.key==="Escape"){ot();return}}if((e.key===" "||e.code==="Space")&&gt(s)&&Ds(t,s)){e.preventDefault();return}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"&&!e.shiftKey&&St.length>0){const i=St[St.length-1];if(i.blockId===o&&gt(s)){St.pop(),e.preventDefault(),ft(t,i.prevType);return}}if((e.ctrlKey||e.metaKey)&&!e.altKey){const i=e.key.toLowerCase();if(i==="b"){e.preventDefault(),tt("bold");return}if(i==="i"){e.preventDefault(),tt("italic");return}if(i==="u"){e.preventDefault(),tt("underline");return}}if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&e.key&&e.key.length===1&&(["bold","italic","underline","strikeThrough"].forEach(i=>{if(Te[i]===!0&&!document.queryCommandState(i))try{document.execCommand(i,!1,null)}catch{}else if(Te[i]===!1&&document.queryCommandState(i))try{document.execCommand(i,!1,null)}catch{}}),Te={bold:null,italic:null,underline:null,strikeThrough:null}),(e.ctrlKey||e.metaKey)&&e.key==="Enter"){e.preventDefault(),cs(o);return}if(e.key==="Backspace"&&!e.ctrlKey&&!e.metaKey){const i=xt(s),r=window.getSelection(),u=!r||r.isCollapsed;if(i===0&&u){const p=Array.from(document.querySelectorAll(".screenplay-block")),x=p.indexOf(t);if(x>0){e.preventDefault();const c=p[x-1],d=c.hasAttribute("contenteditable")?c:c.querySelector('[contenteditable="true"]'),m=s.innerText.trim();if(m===""||a==="parenthetical"&&(m==="()"||m==="")){It(n,o),d&&(d.focus(),Xe(d));return}const f=c.getAttribute("data-block-type");if(d&&(a==="action"&&f==="action"||a==="dialogue"&&f==="dialogue"||a==="text"&&f==="text")){const b=d.innerText.length,g=d.innerText+(d.innerText?" ":"")+s.innerText;d.innerText=g,st(c,g),It(n,o),d.focus(),mt(d,b+(d.innerText?1:0));return}if(d){d.focus(),Xe(d);return}}}}if(e.key==="Delete"&&!e.ctrlKey&&!e.metaKey){const i=xt(s),r=window.getSelection(),u=!r||r.isCollapsed;if(i>=s.innerText.length&&u){const p=Array.from(document.querySelectorAll(".screenplay-block")),x=p.indexOf(t);if(x<p.length-1){const c=p[x+1],d=c.hasAttribute("contenteditable")?c:c.querySelector('[contenteditable="true"]'),m=c.getAttribute("data-scene-id"),f=c.getAttribute("data-block-id"),b=c.getAttribute("data-block-type"),g=(d?d.innerText:"").trim();if(g===""||b==="parenthetical"&&(g==="()"||g==="")){e.preventDefault(),It(m,f);return}if(d&&(a==="action"&&b==="action"||a==="dialogue"&&b==="dialogue"||a==="text"&&b==="text")){e.preventDefault();const E=s.innerText.length,A=s.innerText+(s.innerText?" ":"")+d.innerText;s.innerText=A,st(t,A),It(m,f),mt(s,E+(s.innerText?1:0));return}if(d){e.preventDefault(),d.focus(),mt(d,0);return}}}}if(e.key==="ArrowLeft"){const i=xt(s),r=window.getSelection();if(i===0&&(!r||r.isCollapsed)){const u=Array.from(document.querySelectorAll(".screenplay-block")),p=u.indexOf(t);if(p>0){e.preventDefault();const x=u[p-1],c=x.querySelector('[contenteditable="true"]')||x;c&&(c.focus(),Xe(c))}}}if(e.key==="ArrowRight"){const i=xt(s),r=window.getSelection();if(i>=s.innerText.length&&(!r||r.isCollapsed)){const u=Array.from(document.querySelectorAll(".screenplay-block")),p=u.indexOf(t);if(p<u.length-1){e.preventDefault();const x=u[p+1],c=x.querySelector('[contenteditable="true"]')||x;c&&(c.focus(),mt(c,0))}}}if(e.key==="("&&(a==="character"||a==="dialogue")){const i=window.getSelection();if(i&&i.anchorOffset===0&&s.innerText.trim()===""){e.preventDefault(),ft(t,"parenthetical");return}}if(e.key==="Tab"){if(e.preventDefault(),a==="action"){ft(t,"character");return}if(a==="character"){ft(t,"dialogue");return}}if(e.key==="Enter"&&!e.shiftKey){if(ot(),a==="scene"){e.preventDefault();const i=pt(s.innerText);i.location&&us(i.location),Ze(n,o,"action");return}if(a==="character"){e.preventDefault(),ps(s.innerText),Ze(n,o,"dialogue");return}if(a==="dialogue"){e.preventDefault(),Ze(n,o,"action");return}if(a==="parenthetical"){e.preventDefault();let i=s.innerText.trim();i.endsWith(")")||(i+=")",s.innerText=i,st(t,i)),Ze(n,o,"dialogue");return}if(a==="transition"){e.preventDefault(),Qa(n);return}if(a==="shot"||a==="note"||a==="outline"){e.preventDefault(),Ze(n,o,"action");return}if(a==="act"||a==="endact"||a==="sequence"){e.preventDefault(),Ze(n,o,"scene");return}if(a==="lyrics"){e.preventDefault(),Ze(n,o,"lyrics");return}if(a==="action"||a==="text"){e.preventDefault(),Ze(n,o,a);return}}}function Ze(e,t,s,a){const n=C.scenes.find(p=>p.id===e);if(!n)return;const o=n.blocks.findIndex(p=>p.id===t),l=`b-${Date.now().toString().slice(-6)}`,i={id:l,type:s,content:""};o!==-1?n.blocks.splice(o+1,0,i):n.blocks.push(i);const r=document.getElementById(t),u=r?r.closest(".page-blocks-wrapper"):null;if(r&&u){const p=document.createElement("div");p.innerHTML=_s(i,n.number,n.id);const x=p.firstElementChild;r.insertAdjacentElement("afterend",x),Hs(x),Vt();const c=x.hasAttribute("contenteditable")?x:x.querySelector('[contenteditable="true"]');c&&(c.focus(),Xe(c));const d=u.querySelectorAll(".screenplay-block");let m=0;d.forEach(f=>{const b=f.getAttribute("data-block-type"),g=f.innerText||"";m+=Ms({type:b,content:g})}),m>Ls&&(Pe(),setTimeout(()=>{const f=document.getElementById(l);if(f){const b=f.querySelector('[contenteditable="true"]')||f;b.focus(),Xe(b)}},20))}else Pe(),setTimeout(()=>{const p=document.getElementById(l);if(p){const x=p.hasAttribute("contenteditable")?p:p.querySelector('[contenteditable="true"]');x&&(x.focus(),Xe(x))}},20)}function Qa(e){const t=C.scenes.findIndex(l=>l.id===e),s=C.scenes.length+1,a=`scene-${Date.now().toString().slice(-5)}`,n=`b-${Date.now().toString().slice(-6)}`,o={id:a,number:s,actId:C.acts?.[0]?.id||"act-1",slugline:"",blocks:[{id:n,type:"scene",content:""}]};t!==-1?C.scenes.splice(t+1,0,o):C.scenes.push(o),C.scenes.forEach((l,i)=>{l.number=i+1}),Pe(),Ft(),setTimeout(()=>{const l=document.getElementById(n);if(l){const i=l.querySelector('[contenteditable="true"]');i&&(i.focus(),Xe(i),Tt(l,i))}},30)}function ft(e,t){const s=e.getAttribute("data-block-id"),a=e.getAttribute("data-scene-id"),n=C.scenes.find(l=>l.id===a);if(!n)return;const o=n.blocks.find(l=>l.id===s);if(o){if(o.type=t,t==="character"&&(o.content=o.content.toUpperCase()),(t==="action"||t==="dialogue")&&(o.content=At(o.content)),t==="parenthetical"){let l=o.content.replace(/^\(+|\)+$/g,"").trim();l?o.content=`(${l})`:o.content="()"}Pe(),setTimeout(()=>{const l=document.getElementById(s);if(l){const i=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]');if(i){if(i.focus(),t==="parenthetical"&&i.innerText==="()"){const r=i.firstChild;if(r){const u=document.createRange(),p=window.getSelection();u.setStart(r,1),u.collapse(!0),p.removeAllRanges(),p.addRange(u)}}else Xe(i);qt(t),t==="transition"?Tt(l,i):ot()}}},25)}}function Xe(e){const t=document.createRange(),s=window.getSelection();t.selectNodeContents(e),t.collapse(!1),s.removeAllRanges(),s.addRange(t)}function en(){document.addEventListener("click",t=>{t.target.closest("#editor-autocomplete-dropdown")||ot()});const e=()=>{const t=document.getElementById("editor-autocomplete-dropdown");if(t&&!t.classList.contains("hidden")&&fe){const s=document.getElementById(fe);if(s){const a=s.querySelector('[contenteditable="true"]')||s;Us(t,a)}}};window.addEventListener("scroll",e,{capture:!0,passive:!0}),document.addEventListener("selectionchange",()=>{const t=document.getElementById("editor-autocomplete-dropdown");t&&!t.classList.contains("hidden")&&e()}),window.visualViewport&&(window.visualViewport.addEventListener("resize",e),window.visualViewport.addEventListener("scroll",e))}function ot(){const e=document.getElementById("editor-autocomplete-dropdown");e&&e.classList.add("hidden")}function tn(e){if(!e)return null;const t=window.getSelection();if(t&&t.rangeCount>0)try{const a=t.getRangeAt(0);if(e.contains(a.startContainer)||e===a.startContainer){const n=a.getClientRects();if(n&&n.length>0){const l=n[n.length-1];if(l&&l.height>0&&l.top>0)return{top:l.top,bottom:l.bottom,left:l.left,right:l.right,width:l.width,height:l.height}}const o=a.getBoundingClientRect();if(o&&o.height>0&&o.top>0)return{top:o.top,bottom:o.bottom,left:o.left,right:o.right,width:o.width,height:o.height}}}catch{}const s=e.getBoundingClientRect();return{top:s.top,bottom:s.bottom,left:s.left,right:s.right,width:s.width,height:s.height}}function Us(e,t){if(!e||!t)return;e.parentElement!==document.body&&document.body.appendChild(e);const s=tn(t);if(!s)return;const a=window.visualViewport,n=a?a.height:window.innerHeight,o=a?a.width:window.innerWidth,l=document.getElementById("editor-header-nav"),i=l?l.getBoundingClientRect().bottom:136;if(s.bottom<i+5||s.top>n-20){ot();return}const r=Math.min(270,o-24);e.style.width=`${r}px`;const u=Math.min(220,e.scrollHeight||180),p=n-s.bottom,x=s.top-i;let c;p<u+12&&x>u+12?c=s.top-u-6:c=s.bottom+6,c=Math.max(i+6,Math.min(n-u-8,c));const d=t.closest(".screenplay-block"),m=d?d.getAttribute("data-block-type"):null;let f;m==="transition"?f=Math.max(12,s.right-r):(f=s.left,f+r>o-12&&(f=o-r-12),f<12&&(f=12)),e.style.top=`${c}px`,e.style.left=`${f}px`}function Fs(){if(!C)return[];const e=[];return(C.scenes||[]).forEach(t=>{(t.blocks||[]).forEach(s=>{s.type==="character"&&s.content&&e.push(s.content)})}),(C.characters||[]).forEach(t=>{t&&e.push(t)}),Rs(e)}function sn(){if(!C)return[];const e=new Set;(C.scenes||[]).forEach(s=>{(s.blocks||[]).forEach(a=>{if(a.type==="scene"){const n=pt(a.content);n.location&&n.location.length>=2&&e.add(n.location)}})}),(C.locations||[]).forEach(s=>{const a=(s||"").trim().toUpperCase();a&&a.length>=2&&e.add(a)});const t=Array.from(e);return t.filter(s=>t.some(n=>n!==s&&n.startsWith(s))?C.scenes?.some(o=>o.blocks?.some(l=>l.type==="scene"&&pt(l.content).location===s)):!0)}function Tt(e,t){const s=e.getAttribute("data-block-type"),a=t.innerText,n=document.getElementById("editor-autocomplete-dropdown");if(!n)return;let o=[];if(s==="scene"){const l=a.toUpperCase(),i=a.match(/\s+-\s*([A-Za-z]*)$/);if(i){const r=(i[1]||"").toUpperCase(),p=["DAY","NIGHT","MORNING","EVENING","DAWN","DUSK","CONTINUOUS","LATER"].filter(c=>c.startsWith(r)),x=a.replace(/\s+-\s*[A-Za-z]*$/," - ");o=p.map(c=>({label:c,val:x+c}))}else if(l==="I"||l==="IN")o=["INT.","INT./EXT.","I/E."].map(r=>({label:r,val:r+" "}));else if(l==="E"||l==="EX")o=["EXT.","INT./EXT.","I/E."].map(r=>({label:r,val:r+" "}));else if(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i.test(a)){const r=a.match(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i),u=r[1].toUpperCase()+" ",p=(r[2]||"").trim().toUpperCase();p.length>0&&(o=sn().filter(d=>d.startsWith(p)).map(d=>({label:d,val:`${u}${d}`})))}}else if(s==="character"){const l=a.trim().toUpperCase();l.length>0&&(o=Fs().filter(u=>u.startsWith(l)).map(u=>({label:u,val:u})))}else if(s==="transition"){const i=(a||"").replace(/[\u200B\u00A0\r\n\t]/g,"").trim().toUpperCase(),r=Array.isArray(C?.transitions)&&C.transitions.length>0?Array.from(new Set([...hs,...C.transitions])):hs;if(i.length===0)o=r.map(u=>({label:u,val:u}));else{const u=r.filter(c=>c.toUpperCase().startsWith(i)),p=r.filter(c=>!c.toUpperCase().startsWith(i)&&c.toUpperCase().includes(i));o=[...u,...p].map(c=>({label:c,val:c}))}}if(o.length===0){ot();return}n.innerHTML=o.map((l,i)=>{const r=typeof l=="object"?l.label:l,u=typeof l=="object"?l.val:l;return`
      <div class="autocomplete-item px-3 py-2 sm:py-1.5 hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-blue-700 cursor-pointer flex items-center justify-between font-mono text-xs border-b border-slate-50 last:border-b-0 ${i===0?"active bg-blue-50/70 text-blue-700 font-semibold":""}" data-val="${u}">
        <span class="tracking-wide">${r}</span>
        <span class="text-[10px] text-slate-400 font-sans hidden sm:inline">Enter ↵</span>
      </div>
    `}).join(""),n.classList.remove("hidden"),Us(n,t),n.querySelectorAll(".autocomplete-item").forEach(l=>{l.addEventListener("pointerdown",i=>{i.preventDefault()}),l.onclick=i=>{i.stopPropagation();const r=l.getAttribute("data-val");if(t.innerText=r,st(e,r),s==="character")ps(r);else if(s==="scene"){const u=pt(r);u.location&&us(u.location)}ot(),Xe(t),ve=!0,ue&&Ae()}})}function ws(e){const t=document.getElementById("editor-autocomplete-dropdown");if(!t)return;const s=t.querySelectorAll(".autocomplete-item");if(s.length===0)return;let a=Array.from(s).findIndex(n=>n.classList.contains("active"));a!==-1&&s[a].classList.remove("active","bg-blue-50/70","text-blue-700","font-semibold"),a=(a+e+s.length)%s.length,s[a].classList.add("active","bg-blue-50/70","text-blue-700","font-semibold"),s[a].scrollIntoView({block:"nearest"})}async function bt(e=!1){if(!(Dt||!C)){Dt=!0,ht("Saving..."),C.scenes&&C.scenes.forEach(t=>{t.blocks&&t.blocks.forEach(s=>{(s.type==="action"||s.type==="dialogue")&&s.content&&(s.content=At(s.content))})});try{await la(C.id,C),ve=!1,Dt=!1,ht("Saved"),e&&w("Saved")}catch{Dt=!1,ht("Save failed"),w("Couldn't save changes · Tap retry")}}}function Ae(){ue&&(clearTimeout(es),es=setTimeout(async()=>{ve&&ue&&(await bt(!1),ht("Autosaved just now"),w("Autosaved just now"))},1500))}function ht(e){const t=document.getElementById("editor-save-status"),s=document.getElementById("editor-save-icon");t&&(t.textContent=e),e==="Saving..."?s&&(s.textContent="progress_activity",s.classList.add("animate-spin")):e==="Saved"||e==="Autosaved just now"||e==="Unsaved"?s&&(s.textContent="save",s.classList.remove("animate-spin")):e==="Save failed"&&s&&(s.textContent="warning",s.classList.remove("animate-spin"))}function Ft(){if(!C)return;const e=document.getElementById("navSceneSelect");if(e){const t=C.scenes||[];e.innerHTML=t.map((s,a)=>`
      <option value="${s.id}" ${a===0?"selected":""}>Scene ${s.number} ▾</option>
    `).join("")||'<option value="">Scene 1 ▾</option>'}}function an(){const e=document.getElementById("navSceneSelect");e&&(e.onchange=s=>{const a=s.target.value;if(!a)return;Ss(a);const n=C?.scenes?.find(o=>o.id===a);n&&h.setState({currentSceneId:n.number})});let t=null;try{const s=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search,a=new URLSearchParams(s||"");a.get("scene")&&(t=a.get("scene"))}catch{}if(!t&&h.state.currentSceneId&&(t=h.state.currentSceneId),t&&C?.scenes){const s=C.scenes.find(a=>String(a.number)===String(t)||a.id===String(t)||a.id===`scene-${t}`);s&&(e&&(e.value=s.id),setTimeout(()=>Ss(s.id),250))}}function Ss(e){const t=document.querySelector(`[data-scene-id="${e}"][data-block-type="scene"]`)||document.querySelector(`[data-scene-id="${e}"]`);t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.classList.add("bg-blue-50/50"),setTimeout(()=>t.classList.remove("bg-blue-50/50"),1500))}function nn(){const e=document.getElementById("element-bar");e&&e.querySelectorAll(".element-btn").forEach(t=>{t.onclick=s=>{s.preventDefault();const a=t.getAttribute("data-type");on(a)}})}const Te={bold:null,italic:null,underline:null,strikeThrough:null};let Is=!1;function ze(e){const t=window.getSelection();if(!t||t.rangeCount===0)return!1;const s=t.anchorNode,a=s?.nodeType===Node.ELEMENT_NODE?s:s?.parentElement;if(!a)return!1;const n=a.closest(".screenplay-block");if(!n)return!1;if(!t.isCollapsed&&t.toString().trim().length>0)try{return document.queryCommandState(e)}catch{return!1}const o=n.getAttribute("data-block-type"),l=o==="scene"||o==="character"||o==="transition";try{if(e==="bold"){if(l){const i=a.closest("b, strong");return!!i&&i!==n}return document.queryCommandState("bold")}if(e==="strikeThrough")return a.closest("s, strike, del")?!0:document.queryCommandState("strikeThrough");if(e==="italic")return document.queryCommandState("italic");if(e==="underline")return document.queryCommandState("underline")}catch{return!1}return!1}function tt(e){let t=document.activeElement,s=t?t.closest(".screenplay-block"):null,a=s?s.hasAttribute("contenteditable")?s:s.querySelector('[contenteditable="true"]'):null;if(!a&&fe){const l=document.getElementById(fe);l&&(s=l,a=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]'))}if(!a){const l=document.querySelector(".screenplay-block");l&&(s=l,a=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]'))}a&&document.activeElement!==a&&a.focus();const n=window.getSelection();if(n&&!n.isCollapsed&&n.rangeCount>0&&n.toString().trim().length>0){try{document.execCommand(e,!1,null)}catch{}s&&a&&st(s,a.innerHTML),ve=!0,ue&&Ae(),Te[e]=null,dt()}else{const i=!(Te[e]!==null?Te[e]:ze(e));Te[e]=i;try{document.execCommand(e,!1,null)}catch{}dt()}}function on(e){if(e==="bold"){tt("bold");return}if(e==="italic"){tt("italic");return}if(e==="underline"){tt("underline");return}if(e==="strike"){tt("strikeThrough");return}if(e==="undo"){document.execCommand("undo",!1,null),dt();return}if(e==="redo"){document.execCommand("redo",!1,null),dt();return}if(e==="image"){if(!fe){const t=Array.from(document.querySelectorAll(".screenplay-block")),s=window.innerHeight/2;for(const a of t){const n=a.getBoundingClientRect();if(n.top<=s&&n.bottom>=s){fe=a.getAttribute("data-block-id");break}}}rs=fe,qs(!0);return}if(!fe){const t=document.querySelector(".screenplay-block");t&&(fe=t.getAttribute("data-block-id"))}if(fe){const t=document.getElementById(fe);t&&(ft(t,e),qt(e))}}function qt(e){const t=document.getElementById("element-bar");t&&t.querySelectorAll(".element-btn").forEach(s=>{s.getAttribute("data-type")===e?s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-white bg-blue-600 shadow-2xs font-semibold shrink-0":s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0"})}function ln(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),a=document.getElementById("btn-format-strike");[{btn:e,cmd:"bold"},{btn:t,cmd:"italic"},{btn:s,cmd:"underline"},{btn:a,cmd:"strikeThrough"}].forEach(({btn:l,cmd:i})=>{l&&(l.onmousedown=r=>{r.preventDefault(),r.stopPropagation()},l.onclick=r=>{r.preventDefault(),r.stopPropagation(),tt(i)})}),Is||(Is=!0,document.addEventListener("selectionchange",()=>{dt()}));const o=document.getElementById("editor-main-scroll");o&&(o.addEventListener("keyup",dt),o.addEventListener("mouseup",dt))}function dt(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),a=document.getElementById("btn-format-strike");if(!e||!t||!s||!a)return;const n="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center border border-blue-600 shadow-2xs font-semibold active:scale-95 transition-all cursor-pointer",o="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center border border-slate-200/90 active:scale-95 transition-all cursor-pointer";try{const l=window.getSelection();let i=!1,r=!1,u=!1,p=!1;l&&!l.isCollapsed&&l.rangeCount>0&&l.toString().trim().length>0?(i=ze("bold"),r=ze("italic"),u=ze("underline"),p=ze("strikeThrough")):(i=Te.bold!==null?Te.bold:ze("bold"),r=Te.italic!==null?Te.italic:ze("italic"),u=Te.underline!==null?Te.underline:ze("underline"),p=Te.strikeThrough!==null?Te.strikeThrough:ze("strikeThrough")),e.className=i?n:o,t.className=r?n:o,s.className=u?n:o,a.className=p?n:o}catch{}}function rn(e,t){const s=document.getElementById("editor-more-menu-btn"),a=document.getElementById("editorMoreMenuModal"),n=document.getElementById("closeMoreMenuBtn");function o(M){a&&(a.classList.remove("hidden"),a.classList.add("flex"),Ye({id:"moreMenu",name:"Screenplay Tools",close:()=>{a.classList.add("hidden"),a.classList.remove("flex")},restore:()=>{a.classList.remove("hidden"),a.classList.add("flex")}}))}s&&(s.onclick=()=>o()),n&&(n.onclick=()=>q("moreMenu")),a&&(a.onclick=M=>{M.target===a&&q("moreMenu")});const l=document.getElementById("menu-btn-scene-navigator");l&&(l.onclick=()=>{q("moreMenu");const M=document.getElementById("navSceneSelect");M&&M.focus()});const i=document.getElementById("menu-btn-char-navigator");i&&(i.onclick=()=>{q("moreMenu");const M=Fs(),ee=prompt(`Select character to navigate to:
${M.join(", ")}`,M[0]||"HILL");if(ee){for(const xe of C.scenes)for(const W of xe.blocks)if(W.type==="character"&&W.content.toUpperCase().includes(ee.trim().toUpperCase())){const te=document.getElementById(W.id);if(te){te.scrollIntoView({behavior:"smooth",block:"center"}),te.classList.add("bg-blue-100/60"),setTimeout(()=>te.classList.remove("bg-blue-100/60"),1500);return}}}});const r=document.getElementById("sceneNumberToggle"),u=document.getElementById("sceneNumberToggleText"),p=document.getElementById("menuSceneNumState"),x=document.getElementById("menu-btn-scene-numbers");function c(){Qe=!Qe,u&&(u.textContent=`Scene #s: ${Qe?"On":"Off"}`),p&&(p.textContent=Qe?"Enabled":"Disabled"),document.querySelectorAll(".scene-num-indicator").forEach(M=>{M.classList.toggle("hidden",!Qe)}),w(`Scene numbers ${Qe?"enabled (left side)":"hidden"}`)}r&&(r.onclick=c),x&&(x.onclick=()=>{c(),q("moreMenu")});const d=document.getElementById("focusModeToggle"),m=document.getElementById("focusModeText"),f=document.getElementById("menu-btn-focus-mode"),b=document.getElementById("menuFocusState");function g(M=null){Je=M!==null?M:!Je,m&&(m.textContent=Je?"Exit Focus":"Focus"),b&&(b.textContent=Je?"Active":"Off");const ee=document.getElementById("editor-collapsible-toolbars"),xe=document.getElementById("editor-document-tabs"),W=document.getElementById("editor-fixed-header");if(Je?(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!0),W&&(W.style.top="0px")):(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!1),W&&(W.style.top="0px")),ee&&(ee.style.display=Je?"none":""),xe&&(xe.style.display=Je?"none":"flex"),kt(),Je)Ye({id:"focusMode",name:"Focus Mode",close:()=>g(!1)}),w("Focus Mode active (distraction-free)");else{const te=pe.findIndex($=>$.id==="focusMode");te!==-1&&pe.splice(te,1),w("Exited Focus Mode")}}d&&(d.onclick=()=>g()),f&&(f.onclick=()=>{q("moreMenu"),g()});const E=document.getElementById("langToggleBtn"),A=document.getElementById("langToggleText"),S=document.getElementById("tamilLangBadge");function I(M){Kt=M,A&&(A.textContent=M==="TA"?"தமிழ் / EN":M==="TL"?"Tanglish":"EN / தமிழ்"),S&&(S.textContent=M==="TA"?"தமிழ் விசைப்பலகை: இயங்குகிறது":M==="TL"?"Tanglish: Active":"Tamil IME: Ready"),w(`Screenplay language set to ${M==="TA"?"Tamil":M==="TL"?"Tanglish":"English"}`)}E&&(E.onclick=()=>{I(Kt==="EN"?"TA":Kt==="TA"?"TL":"EN")}),document.querySelectorAll(".lang-choice-btn").forEach(M=>{M.onclick=()=>{I(M.getAttribute("data-lang")),q("moreMenu")}});const y=document.getElementById("btn-open-production"),k=document.getElementById("menu-btn-production"),R=()=>{const M=e||h.state.selectedScriptId||"chronicles-of-dust";sessionStorage.setItem("scriptora_prod_return",`/editor/${M}`),t(`/production?from=editor&scriptId=${encodeURIComponent(M)}`)};y&&(y.onclick=R),k&&(k.onclick=()=>{q("moreMenu"),R()});const K=document.getElementById("menu-btn-go-page");K&&(K.onclick=()=>{q("moreMenu");const M=document.querySelectorAll(".screenplay-page-sheet").length||1,ee=prompt(`Enter page number to jump to (1-${M}):`,"1");if(ee){const xe=document.querySelector(`[data-page-num="${ee}"]`);xe&&xe.scrollIntoView({behavior:"smooth",block:"start"})}});const v=document.getElementById("menu-btn-page-break");v&&(v.onclick=()=>{q("moreMenu"),cs()});const L=document.getElementById("menu-btn-insert-page");L&&(L.onclick=()=>{q("moreMenu"),Os()});const oe=document.getElementById("menu-btn-page-before");oe&&(oe.onclick=()=>{q("moreMenu"),js()});const O=document.getElementById("menu-btn-page-at-end");O&&(O.onclick=()=>{q("moreMenu"),ds()});const j=document.getElementById("btn-undo"),ae=document.getElementById("btn-redo");j&&(j.onclick=()=>document.execCommand("undo")),ae&&(ae.onclick=()=>document.execCommand("redo"))}function cn(){const e=document.getElementById("btn-quick-find"),t=document.getElementById("menu-btn-find-replace"),s=document.getElementById("closeFindBtn"),a=document.getElementById("findInput"),n=document.getElementById("replaceInput"),o=document.getElementById("findNextBtn"),l=document.getElementById("findPrevBtn"),i=document.getElementById("replaceBtn"),r=document.getElementById("replaceAllBtn"),u=document.getElementById("findReplaceModal");e&&(e.onclick=()=>_t(!0)),t&&(t.onclick=()=>{q("moreMenu"),_t(!0)}),s&&(s.onclick=()=>q("findModal")),u&&(u.onclick=p=>{p.target===u&&q("findModal")}),a&&(a.oninput=()=>Yt(a.value)),o&&(o.onclick=()=>ss(1)),l&&(l.onclick=()=>ss(-1)),i&&(i.onclick=()=>{const p=a.value,x=n.value;if(!p||et===-1||!Me[et])return;const c=Me[et];c.block.content=c.block.content.replace(p,x),Pe(),Yt(p),ve=!0,ue&&Ae(),w("Replaced 1 occurrence")}),r&&(r.onclick=()=>{const p=a.value,x=n.value;if(!p)return;let c=0;C.scenes.forEach(d=>{d.blocks.forEach(m=>{m.content&&m.content.includes(p)&&(m.content=m.content.split(p).join(x),c++)})}),Pe(),Yt(p),ve=!0,ue&&Ae(),w(`Replaced ${c} occurrences`)})}function _t(e){const t=document.getElementById("findReplaceModal");if(t)if(e)Jt=document.getElementById("editor-main-scroll")?.scrollTop||0,zt=fe,t.classList.remove("hidden"),t.classList.add("flex"),Ye({id:"findModal",name:"Find & Replace",close:()=>_t(!1)}),setTimeout(()=>{document.getElementById("findInput")?.focus()},40);else{t.classList.add("hidden"),t.classList.remove("flex"),xs();const s=document.getElementById("editor-main-scroll");if(s&&Jt!==null&&(s.scrollTop=Jt),zt){const n=document.getElementById(zt),o=n?.querySelector('[contenteditable="true"]')||n;o&&o.focus()}const a=pe.findIndex(n=>n.id==="findModal");a!==-1&&pe.splice(a,1)}}function Yt(e){Me=[],et=-1;const t=document.getElementById("findMatchesCount");if(!e||!C){t&&(t.textContent="0 of 0"),xs();return}C.scenes.forEach(s=>{s.blocks.forEach(a=>{a.content&&a.content.toLowerCase().includes(e.toLowerCase())&&Me.push({block:a,sceneId:s.id})})}),t&&(t.textContent=Me.length>0?`1 of ${Me.length}`:"0 of 0"),Me.length>0&&ss(0)}function ss(e){if(Me.length===0)return;et=(et+e+Me.length)%Me.length;const t=Me[et],s=document.getElementById("findMatchesCount");s&&(s.textContent=`${et+1} of ${Me.length}`);const a=document.getElementById(t.block.id);a&&(a.scrollIntoView({behavior:"smooth",block:"center"}),xs(),a.classList.add("bg-yellow-100"))}function xs(){document.querySelectorAll(".screenplay-block").forEach(e=>{e.classList.remove("bg-yellow-100")})}function qs(e){const t=document.getElementById("imageModal");if(t)if(e)fe&&(rs=fe),t.classList.remove("hidden"),t.classList.add("flex"),Ye({id:"imageModal",name:"Insert Image",close:()=>qs(!1)});else{t.classList.add("hidden"),t.classList.remove("flex");const s=pe.findIndex(a=>a.id==="imageModal");s!==-1&&pe.splice(s,1)}}function dn(e){const t=document.getElementById("imageModal"),s=document.getElementById("closeImageModal"),a=document.getElementById("cancelImageBtn"),n=document.getElementById("insertImageBtn"),o=document.getElementById("imgFileInput"),l=document.getElementById("imgUploadLabel"),i=document.getElementById("imgUrlInput"),r=document.getElementById("imgCaptionInput"),u=document.getElementById("imgPreviewContainer"),p=document.getElementById("imgPreviewThumb"),x=document.getElementById("clearImgPreviewBtn");let c="";function d(P){u&&p&&(P?(p.src=P,u.classList.remove("hidden")):(u.classList.add("hidden"),p.src=""))}function m(P,N){const F=new Image;F.onload=()=>{let J=F.width,me=F.height;(J>900||me>600)&&(J/me>900/600?(me=Math.round(me*900/J),J=900):(J=Math.round(J*600/me),me=600));const ie=document.createElement("canvas");ie.width=J,ie.height=me,ie.getContext("2d").drawImage(F,0,0,J,me),N(ie.toDataURL("image/jpeg",.85))},F.onerror=()=>N(P),F.src=P}s&&(s.onclick=()=>q("imageModal")),a&&(a.onclick=()=>q("imageModal")),t&&(t.onclick=P=>{P.target===t&&q("imageModal")}),document.querySelectorAll(".img-preset-btn").forEach(P=>{P.onclick=()=>{const N=P.getAttribute("data-url"),F=P.getAttribute("data-caption");i&&(i.value=N),r&&!r.value&&(r.value=F),c=N,d(N)}}),i&&(i.oninput=()=>{const P=i.value.trim();P?(c="",d(P)):c||d("")}),x&&(x.onclick=()=>{c="",i&&(i.value=""),o&&(o.value=""),l&&(l.textContent="Choose local image..."),d("")}),o&&(o.onchange=P=>{const N=P.target.files?.[0];if(N){l&&(l.textContent=N.name);const F=new FileReader;F.onload=le=>{m(le.target.result,z=>{c=z,d(z)})},F.readAsDataURL(N)}}),n&&(n.onclick=()=>{const P=i?.value.trim(),N=r?.value.trim();let F=c||P;F||(F="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80");const le={id:`b-${Date.now().toString().slice(-6)}`,type:"image",url:F,content:F,caption:N||""},z=rs||fe;let J=null,me=-1;if(C.scenes&&C.scenes.length>0){if(z)for(const ie of C.scenes){const re=(ie.blocks||[]).findIndex(ce=>ce.id===z);if(re!==-1){J=ie,me=re+1;break}}if(!J){const re=document.getElementById("navSceneSelect")?.value||(h.state.currentSceneId?`scene-${h.state.currentSceneId}`:null);re&&(J=C.scenes.find(ce=>ce.id===re||String(ce.number)===String(h.state.currentSceneId)))}if(!J){const ie=Array.from(document.querySelectorAll(".screenplay-block")),re=window.innerHeight/2;for(const ce of ie){const X=ce.getBoundingClientRect();if(X.top<=re&&X.bottom>=re){const ne=ce.getAttribute("data-scene-id");J=C.scenes.find(Q=>Q.id===ne);const Se=ce.getAttribute("data-block-id");if(J&&Se){const Q=(J.blocks||[]).findIndex(Ee=>Ee.id===Se);Q!==-1&&(me=Q+1)}break}}}J||(J=C.scenes[0]),J.blocks||(J.blocks=[]),me!==-1&&me<=J.blocks.length?J.blocks.splice(me,0,le):J.blocks.push(le)}else C.scenes=[{id:"scene-1",number:1,slugline:"INT. SCENE - DAY",blocks:[le]}];c="",o&&(o.value=""),i&&(i.value=""),r&&(r.value=""),l&&(l.textContent="Upload local image file..."),d(""),Pe(),ve=!0,ue&&Ae(),w("Storyboard image inserted"),q("imageModal"),setTimeout(()=>{const ie=document.getElementById(le.id);ie&&(ie.scrollIntoView({behavior:"smooth",block:"center"}),ie.classList.add("ring-2","ring-blue-500"),setTimeout(()=>ie.classList.remove("ring-2","ring-blue-500"),1500))},80)});const f=document.getElementById("preferencesModal"),b=document.getElementById("menu-btn-preferences"),g=document.getElementById("closePrefModal"),E=document.getElementById("savePrefBtn");function A(P){if(f)if(P)f.classList.remove("hidden"),f.classList.add("flex"),Ye({id:"preferencesModal",name:"Preferences",close:()=>A(!1)});else{f.classList.add("hidden"),f.classList.remove("flex");const N=pe.findIndex(F=>F.id==="preferencesModal");N!==-1&&pe.splice(N,1)}}b&&(b.onclick=()=>{q("moreMenu"),A(!0)}),g&&(g.onclick=()=>q("preferencesModal")),f&&(f.onclick=P=>{P.target===f&&q("preferencesModal")}),E&&(E.onclick=()=>{const P=document.getElementById("prefSceneNumbers")?.checked,N=document.getElementById("prefLineSpacing")?.value,F=document.getElementById("prefFontSize")?.value;Qe=P,document.querySelectorAll(".scene-num-indicator").forEach(z=>z.classList.toggle("hidden",!P));const le=document.querySelector(".screenplay-page-sheet");le&&(le.style.lineHeight=N==="2.0"?"30px":N==="1.0"?"20px":"24px",le.style.fontSize=F==="14pt"?"16px":"15px"),q("preferencesModal"),w("Preferences applied")});function S(P){return P?P.replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/[\r\n]+/g," ").replace(/[^\x20-\x7E]/g,N=>({"—":"--","–":"-","“":'"',"”":'"',"‘":"'","’":"'","…":"...","·":"-","•":"*"})[N]||" "):""}function I(P,N){if(!P)return[];const F=P.split(/\s+/),le=[];let z="";for(const J of F)z?(z+" "+J).length<=N?z+=" "+J:(le.push(z),z=J):z=J;return z&&le.push(z),le}function y(P,N,F={}){const{includeTitlePage:le=!0,includePageNumbers:z=!0,sceneNumbers:J=!0,preservePageBreaks:me=!0,pageSheets:ie=[]}=F,re=[],X=595.28/2,ne=108,Se=525,Q=14.4,Ee=14.4,ye=(U,De=12)=>(U?U.length:0)*(De*.6),it=(U,De=12)=>Math.round(X-ye(U,De)/2),Gt=(U,De=12,Ie=Se)=>Math.round(Ie-ye(U,De));if(le&&P.titlePage&&(N.has(1)||F.rangeType==="all")){const U=P.titlePage,De=(U.title||P.title||"UNTITLED SCREENPLAY").toUpperCase(),Ie=I(De,35),G=[];let We=520;Ie.forEach($e=>{G.push({text:$e,x:it($e,12),y:We,font:"F2",size:12}),We-=Q}),We-=24;const de=U.by!==void 0?U.by:"Written by";de&&(G.push({text:de,x:it(de,12),y:We,font:"F1",size:12}),We-=Q+4);const Le=U.author||"Author";G.push({text:Le,x:it(Le,12),y:We,font:"F2",size:12});let V=(U.phone||"").trim();if(!V&&U.contact){const ut=U.contact.split("·").map(Bt=>Bt.trim()).find(Bt=>Bt.includes("+")||/\d{3}/.test(Bt));ut&&(V=ut)}V&&!V.toLowerCase().startsWith("phone")&&(V=`Phone: ${V}`);let we=(U.email||"").trim();if(!we&&U.contact&&U.contact.includes("@")){const $e=U.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);$e&&(we=$e[0])}we&&!we.toLowerCase().startsWith("e-mail")&&!we.toLowerCase().startsWith("email")&&(we=`E-mail: ${we}`);const Ke=[];if(V&&Ke.push(V),we&&Ke.push(we),U.address){const $e=I(U.address.trim(),40);Ke.push(...$e)}else if(!V&&!we&&U.contact){const $e=U.contact.split("·").map(ut=>ut.trim()).filter(Boolean);Ke.push(...$e)}let wt=130;Ke.forEach($e=>{G.push({text:$e,x:ne,y:wt,font:"F1",size:12}),wt-=Q}),re.push(G)}ie.forEach(U=>{const De=parseInt(U.getAttribute("data-page-num"),10)||1;if(!N.has(De))return;const Ie=[];if(z&&De>1){const de=`${De}.`;Ie.push({text:de,x:Gt(de,12,Se),y:805,font:"F1",size:12})}let G=765;U.querySelectorAll(".screenplay-block").forEach(de=>{if(G<65)return;const Le=de.getAttribute("data-block-type");if(Le==="pagebreak"){if(me){G-=Q;const V="----------------------------------------";Ie.push({text:V,x:it(V,12),y:G,font:"F1",size:12}),G-=Q}return}if(Le==="scene"){const V=de.querySelector('[contenteditable="true"]'),we=(V?V.innerText.trim():de.innerText.trim()).toUpperCase(),Ke=J&&de.querySelector(".scene-num-indicator")?.innerText?.trim()||"";G-=Ee,I(we,57).forEach(($e,ut)=>{ut===0&&Ke&&Ie.push({text:Ke,x:76,y:G,font:"F2",size:12}),Ie.push({text:$e,x:ne,y:G,font:"F2",size:12}),G-=Q})}else if(Le==="character"){const V=de.innerText.trim().toUpperCase();G-=Ee,Ie.push({text:V,x:266,y:G,font:"F2",size:12}),G-=Q}else if(Le==="parenthetical"){let V=de.innerText.trim();V.startsWith("(")||(V="("+V),V.endsWith(")")||(V=V+")"),I(V,26).forEach(we=>{Ie.push({text:we,x:223,y:G,font:"F1",size:12}),G-=Q})}else if(Le==="dialogue"){const V=de.innerText.trim();I(V,35).forEach(we=>{Ie.push({text:we,x:180,y:G,font:"F1",size:12}),G-=Q})}else if(Le==="transition"){const V=de.innerText.trim().toUpperCase();G-=Ee,Ie.push({text:V,x:Gt(V,12,Se),y:G,font:"F2",size:12}),G-=Q}else if(Le==="shot"){const V=de.innerText.trim().toUpperCase();G-=Ee,Ie.push({text:V,x:ne,y:G,font:"F2",size:12}),G-=Q}else if(Le==="image"){const V=de.querySelector('[contenteditable="true"]')?.innerText?.trim()||"Storyboard Image";G-=Ee,Ie.push({text:`[STORYBOARD: ${V}]`,x:ne,y:G,font:"F1",size:12}),G-=Q}else{const V=de.innerText.trim();V&&(G-=Ee,I(V,58).forEach(we=>{Ie.push({text:we,x:ne,y:G,font:"F1",size:12}),G-=Q}))}}),re.push(Ie)}),re.length===0&&re.push([{text:P.title||"Screenplay",x:ne,y:750,font:"F2",size:12}]);const Re=re.length,Ve=[],Ce=[];let je=4;for(let U=0;U<Re;U++)je++,Ve.push(je),je++,Ce.push(je);const Ge=[];Ge[1]="<< /Type /Catalog /Pages 2 0 R >>",Ge[2]=`<< /Type /Pages /Kids [${Ve.map(U=>U+" 0 R").join(" ")}] /Count ${Re} /MediaBox [0 0 595.28 841.89] >>`,Ge[3]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>",Ge[4]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>";for(let U=0;U<Re;U++){const De=Ve[U],Ie=Ce[U];Ge[De]=`<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${Ie} 0 R >>`;const G=[];for(const de of re[U]){const Le=de.font||"F1",V=de.size||12,we=de.x||ne,Ke=de.y||750,wt=S(de.text);G.push(`BT /${Le} ${V} Tf ${we.toFixed(2)} ${Ke.toFixed(2)} Td (${wt}) Tj ET`)}const We=G.join(`
`);Ge[Ie]=`<< /Length ${We.length} >>
stream
${We}
endstream`}let rt=`%PDF-1.4
%âãÏÓ
`;const ms=[];for(let U=1;U<=je;U++)ms[U]=rt.length,rt+=`${U} 0 obj
${Ge[U]}
endobj
`;const Js=rt.length;rt+=`xref
0 ${je+1}
0000000000 65535 f 
`;for(let U=1;U<=je;U++)rt+=`${String(ms[U]).padStart(10,"0")} 00000 n 
`;return rt+=`trailer
<< /Size ${je+1} /Root 1 0 R >>
startxref
${Js}
%%EOF`,new Blob([rt],{type:"application/pdf"})}const k=document.getElementById("exportModal"),R=document.getElementById("exportModalBtn"),K=document.getElementById("menu-btn-export"),v=document.getElementById("closeExportModal"),L=document.getElementById("cancelExportBtn"),oe=document.getElementById("startExportBtn"),O=document.getElementById("exportProgressArea"),j=document.getElementById("exportProgressBar"),ae=document.getElementById("exportStatusText");function M(P){if(k)if(P)k.classList.remove("hidden"),k.classList.add("flex"),Ye({id:"exportModal",name:"Export",close:()=>M(!1)});else{k.classList.add("hidden"),k.classList.remove("flex"),O?.classList.add("hidden");const N=pe.findIndex(F=>F.id==="exportModal");N!==-1&&pe.splice(N,1)}}R&&(R.onclick=()=>M(!0)),K&&(K.onclick=()=>{q("moreMenu"),M(!0)}),v&&(v.onclick=()=>q("exportModal")),L&&(L.onclick=()=>q("exportModal")),k&&(k.onclick=P=>{P.target===k&&q("exportModal")});const ee=document.getElementById("exportPageRangeSelect"),xe=document.getElementById("exportCustomRangeInput");ee&&xe&&(ee.onchange=()=>{xe.classList.toggle("hidden",ee.value!=="custom"),ee.value==="custom"&&xe.focus()}),oe&&(oe.onclick=()=>{const P=document.getElementById("exportFormatSelect")?.value||"pdf",N=document.getElementById("exportPageRangeSelect")?.value||"all",F=document.getElementById("exportCustomRangeInput")?.value||"",le=document.getElementById("optPageNumbers")?.checked!==!1,z=document.getElementById("optPreservePageBreaks")?.checked!==!1,J=document.getElementById("optStandardMargins")?.checked!==!1,me=document.getElementById("optSceneNumbers")?.checked!==!1,ie=Array.from(document.querySelectorAll(".screenplay-page-sheet")),re=ie.length||1;let ce=new Set;if(N==="all")for(let X=1;X<=re;X++)ce.add(X);else if(N==="current"){let X=1;if(fe){const ne=document.getElementById(fe),Se=ne?ne.closest(".screenplay-page-sheet"):null;Se&&(X=parseInt(Se.getAttribute("data-page-num"),10)||1)}ce.add(X)}else if(N==="custom"&&(F.split(",").forEach(ne=>{if(ne=ne.trim(),ne.includes("-")){const[Se,Q]=ne.split("-").map(Ee=>parseInt(Ee.trim(),10));if(!isNaN(Se)&&!isNaN(Q))for(let Ee=Math.max(1,Se);Ee<=Math.min(re,Q);Ee++)ce.add(Ee)}else{const Se=parseInt(ne,10);!isNaN(Se)&&Se>=1&&Se<=re&&ce.add(Se)}}),ce.size===0))for(let ne=1;ne<=re;ne++)ce.add(ne);O.classList.remove("hidden"),j.style.width="35%",ae.textContent=J?'Applying standard A4 margins (1.5" left, 1.0" right) & Courier Prime...':"Formatting Courier Prime typography and page layout...",setTimeout(()=>{j.style.width="80%",ae.textContent=`Compiling standard ${P.toUpperCase()} for pages [${Array.from(ce).join(", ")}]...`},500),setTimeout(()=>{j.style.width="100%",ae.textContent="Completed! Starting download...";let X="";if(document.getElementById("optTitlePage")?.checked&&C.titlePage&&(ce.has(1)||N==="all")){const ye=C.titlePage;X+=`${ye.title||C.title}

`,X+=`${ye.by||"Written by"}

`,X+=`${ye.author||"Author"}

`,ye.phone&&(X+=`${ye.phone}
`),ye.email&&(X+=`${ye.email}
`),ye.address&&(X+=`${ye.address}
`),!ye.phone&&!ye.email&&!ye.address&&ye.contact&&(X+=`${ye.contact}
`),X+=`

================================================================================
\f
`}ie.forEach(ye=>{const it=parseInt(ye.getAttribute("data-page-num"),10)||1;if(!ce.has(it))return;le&&(X+=`
											${it}.

`),ye.querySelectorAll(".screenplay-block").forEach(Re=>{const Ve=Re.getAttribute("data-block-type");if(Ve==="pagebreak"){z&&(X+=`
[=== PAGE BREAK ===]

`);return}let Ce="";if(Ve==="scene"){const je=Re.querySelector('[contenteditable="true"]');Ce=je?je.innerText.trim():Re.innerText.trim();const Ge=me&&Re.querySelector(".scene-num-indicator")?.innerText?.trim()||"";X+=`

${Ge?Ge+". ":""}${Ce}

`}else Ve==="character"?(Ce=Re.innerText.trim(),X+=`
			${Ce}
`):Ve==="parenthetical"?(Ce=Re.innerText.trim(),X+=`		${Ce.startsWith("(")?Ce:"("+Ce+")"}
`):Ve==="dialogue"?(Ce=Re.innerText.trim(),X+=`	${Ce}
`):Ve==="transition"?(Ce=Re.innerText.trim(),X+=`
						${Ce}

`):(Ce=Re.innerText.trim(),Ce&&(X+=`${Ce}

`))}),X+=`
\f
`});let ne;P==="pdf"?ne=y(C,ce,{includeTitlePage:document.getElementById("optTitlePage")?.checked!==!1,includePageNumbers:le,sceneNumbers:me,preservePageBreaks:z,pageSheets:ie,rangeType:N}):ne=new Blob([X],{type:"text/plain"});const Se=URL.createObjectURL(ne),Q=document.createElement("a");Q.href=Se;const Ee=N==="all"?"All_Pages":`Pages_${Array.from(ce).join("-")}`;Q.download=`${C.title.replace(/[^a-zA-Z0-9]/g,"_")}_${C.draft||"Draft"}_${Ee}.${P}`,document.body.appendChild(Q),Q.click(),Q.remove(),w(`Exported "${Q.download}" successfully`),setTimeout(()=>q("exportModal"),800)},1e3)});const W=document.getElementById("versionsModal"),te=document.getElementById("versionsModalBtn"),$=document.getElementById("menu-btn-versions"),Y=document.getElementById("closeVersionsModal"),Ue=document.getElementById("versionsListContainer");function Z(P){W&&(W.classList.remove("hidden"),W.classList.add("flex"),Fe(),Ye({id:"versionsModal",name:"Versions",close:()=>{W.classList.add("hidden"),W.classList.remove("flex")},restore:()=>{W.classList.remove("hidden"),W.classList.add("flex"),Fe()}}))}async function Fe(){const P=await ia(e);Ue&&(Ue.innerHTML=P.map(N=>`
      <div class="p-3 rounded-xl border ${N.isCurrent?"border-2 border-blue-600 bg-blue-50/30":"border-slate-200 bg-white hover:bg-slate-50"} transition-colors flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-heading font-bold text-sm text-slate-900">${N.name}</span>
            <span class="px-2 py-0.5 rounded-full ${N.isCurrent?"bg-blue-600 text-white font-semibold":"bg-slate-100 text-slate-600 font-medium"} text-[10px]">${N.tag}</span>
          </div>
          <span class="text-[11px] text-slate-400 font-caption">${N.timestamp}</span>
        </div>
        <p class="text-xs text-slate-600">${N.notes||"Point-in-time snapshot."}</p>
        <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>Edited by ${N.author}</span>
          <div class="flex items-center gap-2">
            <span class="font-medium text-slate-700">${N.stats}</span>
            ${N.isCurrent?"":`<button class="restore-version-btn text-blue-600 font-semibold hover:underline" data-vname="${N.name}">Restore</button>`}
          </div>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".restore-version-btn").forEach(N=>{N.onclick=()=>{const F=N.getAttribute("data-vname");w(`Restored version "${F}"`),document.getElementById("currentVersionTag").textContent=F,q("versionsModal")}}))}te&&(te.onclick=()=>Z()),$&&($.onclick=()=>{q("moreMenu"),Z()}),Y&&(Y.onclick=()=>q("versionsModal")),W&&(W.onclick=P=>{P.target===W&&q("versionsModal")});const Ne=document.getElementById("newVersionModal"),qe=document.getElementById("openNewVersionPrompt"),Be=document.getElementById("closeNewVersionModal"),Oe=document.getElementById("cancelNewVersionBtn"),lt=document.getElementById("saveNewVersionBtn");function Nt(){W.classList.add("hidden"),Ne.classList.remove("hidden"),Ne.classList.add("flex"),Ye({id:"newVersionModal",name:"New Version",close:()=>{Ne.classList.add("hidden"),Ne.classList.remove("flex")}})}qe&&(qe.onclick=Nt),Be&&(Be.onclick=()=>q("newVersionModal")),Oe&&(Oe.onclick=()=>q("newVersionModal")),lt&&(lt.onclick=async()=>{const P=document.getElementById("newVersionNameInput")?.value.trim(),N=document.getElementById("newVersionNotesInput")?.value.trim();P&&(await ra(e,{name:P,notes:N}),w(`Created version snapshot "${P}"`),document.getElementById("currentVersionTag").textContent=P,q("newVersionModal"))});const T=document.getElementById("compareModal"),D=document.getElementById("openCompareBtn"),_=document.getElementById("menu-btn-compare"),H=document.getElementById("closeCompareModal"),se=document.getElementById("closeCompareBtn2");function he(){W.classList.add("hidden"),T.classList.remove("hidden"),T.classList.add("flex"),Ye({id:"compareModal",name:"Compare Versions",close:()=>{T.classList.add("hidden"),T.classList.remove("flex")}})}D&&(D.onclick=he),_&&(_.onclick=()=>{q("moreMenu"),he()}),H&&(H.onclick=()=>q("compareModal")),se&&(se.onclick=()=>q("compareModal")),T&&(T.onclick=P=>{P.target===T&&q("compareModal")})}function Vt(){if(!C)return;let e=0;C.scenes.forEach(o=>{o.blocks.forEach(l=>{l.content&&(e+=l.content.trim().split(/\s+/).filter(Boolean).length)})});const s=document.querySelectorAll(".screenplay-page-sheet").length||1,a=document.getElementById("telemetry-page-count"),n=document.getElementById("telemetry-word-count");a&&(a.textContent=`Page 1 of ${s}`),n&&(n.textContent=`${e.toLocaleString()} words`)}function pn(){const e=h.state.scripts||[],t=h.state.selectedScriptId||"chronicles-of-dust",s=e.find(a=>a.id===t)||e[0]||{title:"Chronicles of Dust"};return`
    ${be("Intelligence","Script Selector")}

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
            ${e.map(a=>{const n=a.id===t;return`
                <div data-script-id="${a.id}" data-script-title="${a.title}" class="script-select-card relative p-3.5 rounded-xl border ${n?"border-blue-600 bg-blue-50/70":"border-slate-200/80 bg-white hover:bg-slate-50"} transition-all cursor-pointer flex items-center justify-between group shadow-xs">
                  <div class="flex items-center gap-3 min-w-0 relative z-10">
                    <div class="shrink-0 w-9 h-9 rounded-lg ${n?"bg-white border-blue-200 text-blue-600":"bg-slate-50 border-slate-200 text-slate-600"} border flex items-center justify-center shadow-xs">
                      <span class="material-symbols-outlined text-[20px]">movie</span>
                    </div>
                    <div class="flex flex-col min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-semibold text-slate-900 truncate uppercase">${a.title}</span>
                        <span class="text-[10px] font-medium px-1.5 py-0.5 rounded ${n?"bg-blue-100 text-blue-700":"bg-slate-100 text-slate-600"} shrink-0">${a.draft||"Draft 1.0"}</span>
                      </div>
                      <span class="text-[11px] text-slate-500 truncate mt-0.5">${a.format||"Screenplay"} · ${a.pages} pages · Updated ${a.updated||"recently"}</span>
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
          <span class="truncate font-semibold" id="selector-btn-label">Continue to Context (${s.title})</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
        <span class="text-[10px] text-slate-400 tracking-tight">Establishes selectedScriptId for Script Analysis</span>
      </div>

    </main>

    ${ge("intelligence")}
  `}function un(e){let t=h.state.selectedScriptId||"chronicles-of-dust";document.querySelectorAll(".script-select-card").forEach(n=>{n.onclick=()=>{const o=n.getAttribute("data-script-id"),l=n.getAttribute("data-script-title");t=o,h.selectScript(o),document.querySelectorAll(".script-select-card").forEach(u=>{u.className="script-select-card relative p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const p=u.querySelector(".script-select-indicator");p&&(p.className="script-select-indicator w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0",p.innerHTML='<span class="material-symbols-outlined text-[16px]">arrow_forward</span>')}),n.className="script-select-card relative p-3.5 rounded-xl border border-blue-600 bg-blue-50/70 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const i=n.querySelector(".script-select-indicator");i&&(i.className="script-select-indicator w-6 h-6 rounded-full bg-blue-600 text-white shadow-xs flex items-center justify-center shrink-0",i.innerHTML='<span class="material-symbols-outlined text-[16px] font-bold">check</span>');const r=document.getElementById("selector-btn-label");r&&(r.textContent=`Continue to Context (${l})`)}});const s=document.getElementById("submit-continue-analysis-btn");s&&(s.onclick=()=>{h.selectScript(t),e("/intelligence/context")});const a=document.getElementById("btn-import-script-modal");a&&(a.onclick=()=>{w("Select screenplay file (.fountain, .fdx, .pdf) to parse","info")})}function xn(){const e=h.state.selectedScriptId||"chronicles-of-dust",t=h.state.scripts.find(a=>a.id===e)||h.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",format:"Feature",industry:"International / Hollywood"},s=t.context||{format:t.format||"Feature",industry:t.industry||"International / Hollywood",hours:1,minutes:36,seconds:0};return`
    ${be("Intelligence","Context Calibration")}

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
              <div class="flex items-center gap-1 sm:gap-2">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="hr" data-delta="-1">-</button>
                <input type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" id="val-hr" value="${String(s.hours!==void 0?s.hours:1).padStart(2,"0")}" class="font-mono text-base font-bold text-slate-900 w-8 h-7 text-center bg-transparent rounded border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer select-all transition-all" title="Click to edit hours" aria-label="Hours">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="hr" data-delta="1">+</button>
              </div>
            </div>

            <!-- Minutes -->
            <div class="flex flex-col items-center gap-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400">Minutes</span>
              <div class="flex items-center gap-1 sm:gap-2">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="min" data-delta="-1">-</button>
                <input type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" id="val-min" value="${String(s.minutes!==void 0?s.minutes:36).padStart(2,"0")}" class="font-mono text-base font-bold text-slate-900 w-8 h-7 text-center bg-transparent rounded border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer select-all transition-all" title="Click to edit minutes" aria-label="Minutes">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="min" data-delta="1">+</button>
              </div>
            </div>

            <!-- Seconds -->
            <div class="flex flex-col items-center gap-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400">Seconds</span>
              <div class="flex items-center gap-1 sm:gap-2">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="sec" data-delta="-1">-</button>
                <input type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" id="val-sec" value="${String(s.seconds!==void 0?s.seconds:0).padStart(2,"0")}" class="font-mono text-base font-bold text-slate-900 w-8 h-7 text-center bg-transparent rounded border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer select-all transition-all" title="Click to edit seconds" aria-label="Seconds">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="sec" data-delta="1">+</button>
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

    ${ge("intelligence")}
  `}function mn(e){const t=h.state.selectedScriptId||"chronicles-of-dust",s=h.state.scripts.find(x=>x.id===t)||h.state.activeScript||{},a=s.context||{};let n=a.format||s.format||"Feature",o=a.hours!==void 0?a.hours:1,l=a.minutes!==void 0?a.minutes:36,i=a.seconds!==void 0?a.seconds:0;document.querySelectorAll(".format-card").forEach(x=>{x.onclick=()=>{n=x.getAttribute("data-format"),document.querySelectorAll(".format-card").forEach(c=>{c.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 transition-all cursor-pointer hover:bg-slate-50"}),x.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 border-2 border-blue-600 transition-all cursor-pointer",n==="Short"?(o=0,l=25,i=0):n==="Pilot"?(o=0,l=50,i=30):(o=1,l=45,i=0),r()}});function r(){const x=g=>String(g).padStart(2,"0"),c=document.getElementById("val-hr"),d=document.getElementById("val-min"),m=document.getElementById("val-sec");c&&(c.value=x(o)),d&&(d.value=x(l)),m&&(m.value=x(i));const f=o*60+l+Math.round(i/60),b=document.getElementById("pacing-projection");b&&(b.textContent=`~${f} standard script pages`)}document.querySelectorAll(".stepper-btn").forEach(x=>{x.onclick=()=>{const c=x.getAttribute("data-unit"),d=parseInt(x.getAttribute("data-delta"),10)||0;c==="hr"&&(o=Math.max(0,Math.min(9,o+d))),c==="min"&&(l=Math.max(0,Math.min(59,l+d))),c==="sec"&&(i=Math.max(0,Math.min(59,i+d))),r()}}),[{id:"val-hr",max:9,get:()=>o,set:x=>{o=x}},{id:"val-min",max:59,get:()=>l,set:x=>{l=x}},{id:"val-sec",max:59,get:()=>i,set:x=>{i=x}}].forEach(({id:x,max:c,set:d,get:m})=>{const f=document.getElementById(x);f&&(f.onfocus=()=>{f.select()},f.oninput=()=>{let b=f.value.replace(/\D/g,"");if(b==="")d(0);else{let A=parseInt(b,10);isNaN(A)&&(A=0),A>c?(A=c,f.value=String(A)):f.value=b.slice(0,2),d(A)}const g=o*60+l+Math.round(i/60),E=document.getElementById("pacing-projection");E&&(E.textContent=`~${g} standard script pages`)},f.onblur=()=>{let b=f.value.replace(/\D/g,""),g=parseInt(b,10);isNaN(g)&&(g=0),g=Math.max(0,Math.min(c,g)),d(g),f.value=String(g).padStart(2,"0"),r()},f.onkeydown=b=>{if(b.key==="Enter")f.blur();else if(b.key==="ArrowUp"){b.preventDefault();const g=m(),E=Math.min(c,g+1);d(E),f.value=String(E).padStart(2,"0"),r()}else if(b.key==="ArrowDown"){b.preventDefault();const g=m(),E=Math.max(0,g-1);d(E),f.value=String(E).padStart(2,"0"),r()}})});const p=document.getElementById("btn-submit-context");p&&(p.onclick=async()=>{const x=document.getElementById("industry-select")?.value||"International / Hollywood";p.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Calibrating SCRIPTORA...</span>',p.disabled=!0;const c=m=>String(m).padStart(2,"0"),d={format:n,industry:x,hours:o,minutes:l,seconds:i,plannedDuration:`${c(o)}:${c(l)}:${c(i)}`};await ha(t,d),w("Narrative parameters calibrated"),e("/intelligence/dashboard")})}function fn(){const e=h.state.selectedScriptId||"chronicles-of-dust",t=h.state.scripts.find(a=>a.id===e)||h.state.activeScript||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pages:96,format:"Feature"},s=t.analysisScores||{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80};return`
    ${be("Intelligence","Script Analysis")}

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
            ${[{name:"Pacing",key:"pacing",score:s.pacing,icon:"speed"},{name:"Dialogue",key:"dialogue",score:s.dialogue,icon:"chat"},{name:"Emotion",key:"emotion",score:s.emotion,icon:"favorite"},{name:"Character Arc",key:"character-arc",score:s.characterArc,icon:"alt_route"},{name:"Continuity",key:"continuity",score:s.continuity,icon:"linear_scale"},{name:"Story Structure",key:"story-structure",score:s.storyStructure,icon:"account_tree"},{name:"Theme",key:"theme",score:s.theme,icon:"lightbulb"},{name:"Cinema",key:"cinema",score:s.cinema,icon:"videocam"},{name:"Formatting",key:"formatting",score:s.formatting,icon:"rule"},{name:"Production",key:"production",score:s.production,icon:"movie_creation"}].map(a=>`
              <a href="/intelligence/analysis/${a.key}?from=/intelligence/dashboard" class="py-2.5 px-2 -mx-2 rounded-xl flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors no-underline group cursor-pointer">
                <div class="flex items-center gap-2 w-36 shrink-0">
                  <span class="material-symbols-outlined text-[17px] text-slate-400 group-hover:text-blue-600 transition-colors">${a.icon}</span>
                  <span class="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors truncate">${a.name}</span>
                </div>
                <div class="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div class="h-full bg-blue-600 rounded-full" style="width: ${a.score}%;"></div>
                </div>
                <span class="text-xs sm:text-sm font-bold text-slate-900 w-8 text-right font-mono">${a.score}</span>
              </a>
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
            ${h.state.scripts.map(a=>`
              <div class="script-switch-opt p-3 rounded-xl ${a.id===t.id?"bg-blue-50 border border-blue-200":"bg-white border border-slate-200 hover:bg-slate-50"} flex items-center justify-between cursor-pointer" data-id="${a.id}">
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-slate-900 uppercase font-heading">${a.title}</span>
                  <span class="text-[11px] text-slate-500 mt-0.5">${a.format||"Feature"} · ${a.pages} pages · ${a.draft||"Draft 1.0"}</span>
                </div>
                ${a.id===t.id?'<span class="material-symbols-outlined text-blue-600 text-[18px]">check_circle</span>':""}
              </div>
            `).join("")}
          </div>
        </div>
      </div>

    </main>

    ${ge("intelligence")}
  `}function bn(e){const t=h.state.selectedScriptId||"chronicles-of-dust",s=h.state.scripts.find(g=>g.id===t)||h.state.scripts[0],a=document.getElementById("btn-gen-logline"),n=document.getElementById("btn-gen-synopsis"),o=document.getElementById("ai-generated-container"),l=document.getElementById("ai-generated-title"),i=document.getElementById("ai-generated-body"),r=document.getElementById("ai-close-btn"),u=document.getElementById("ai-copy-btn"),p=document.getElementById("ai-copy-text"),x=document.getElementById("ai-query-input"),c=document.getElementById("ai-query-submit");function d(g){o&&(o.classList.remove("hidden"),l.textContent=g==="logline"?"Generated Logline":"Generated Synopsis",i.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Generating with narrative telemetry...</span>',setTimeout(()=>{i.textContent=g==="logline"?s?.logline||"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.":s?.synopsis||"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves."},400))}if(a&&(a.onclick=()=>d("logline")),n&&(n.onclick=()=>d("synopsis")),r&&(r.onclick=()=>o.classList.add("hidden")),u&&(u.onclick=()=>{navigator.clipboard?.writeText(i.textContent||""),p.textContent="Copied!",setTimeout(()=>{p.textContent="Copy"},1800),w("Copied to clipboard")}),c&&x){const g=async()=>{const E=x.value.trim();if(!E)return;o.classList.remove("hidden"),l.textContent="Intelligence AI Answer",i.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing draft semantics...</span>';const A=await ls(E,t);i.textContent=A,x.value=""};c.onclick=g,x.onkeydown=E=>{E.key==="Enter"&&g()}}const m=document.getElementById("script-switcher-modal"),f=document.getElementById("script-selector-trigger"),b=document.getElementById("close-script-switcher-modal");f&&(f.onclick=()=>m?.classList.remove("hidden")),b&&(b.onclick=()=>m?.classList.add("hidden")),document.querySelectorAll(".script-switch-opt").forEach(g=>{g.onclick=()=>{const E=g.getAttribute("data-id");h.selectScript(E),m?.classList.add("hidden"),e("/intelligence")}})}function gn(){const e=h.state.selectedScriptId||"chronicles-of-dust",t=h.state.scripts.find(a=>a.id===e)||h.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",pages:96},s=[{type:"pacing",title:"Pacing",desc:"See where the story moves too fast or too slowly.",icon:"speed",score:82,telemetry:`${t.pages||96} Pages Telemetry`},{type:"dialogue",title:"Dialogue",desc:"Cadence, subtext density and character voice rhythm.",icon:"chat",score:89,telemetry:"42 Dialogue Exchanges"},{type:"emotion",title:"Emotion",desc:"Emotional heatmaps, catharsis curves and sentiment.",icon:"favorite",score:91,telemetry:"Peak Catharsis: Act II"},{type:"character-arc",title:"Character Arc",desc:"Want vs. need trajectories and transformation tracking.",icon:"alt_route",score:84,telemetry:"4 Major Protagonists"},{type:"continuity",title:"Continuity",desc:"Props, character locations, and temporal logic rules.",icon:"linear_scale",score:78,telemetry:"2 Minor Prop Conflicts"},{type:"story-structure",title:"Story Structure",desc:"Beat breakdowns, midpoint shifts and turning points.",icon:"account_tree",score:87,telemetry:"3-Act Paradigm Standard"},{type:"theme",title:"Theme",desc:"Core philosophical spines, motifs and moral arguments.",icon:"lightbulb",score:90,telemetry:"3 Tracked Motifs"},{type:"cinema",title:"Cinema",desc:"Visual storytelling, shot economy and set-piece power.",icon:"videocam",score:85,telemetry:"Cinematic Visual Index"},{type:"scene",title:"Scene Analysis",desc:"Deep dive breakdown of goals, conflict and polarity.",icon:"movie",score:86,telemetry:"Scene 18 Active Scope"},{type:"formatting",title:"Formatting",desc:"Standard industry margins, sluglines and font rules.",icon:"rule",score:94,telemetry:"Standard Guild Rules"},{type:"production",title:"Production",desc:"Locations, shooting cast, props and cost estimators.",icon:"movie_creation",score:80,telemetry:"24 Practical Locations"}];return`
    ${be("Intelligence","Analyse Individually")}

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
          ${s.map(a=>`
            <a href="/intelligence/analysis/${a.type}" class="analysis-tile group flex flex-col justify-between p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm hover:border-blue-300 transition-all active:scale-[0.98] min-h-[148px] no-underline text-inherit cursor-pointer" data-keyword="${a.title.toLowerCase()} ${a.desc.toLowerCase()}">
              <div>
                <div class="flex items-center justify-between">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[19px]">${a.icon}</span>
                  </div>
                  <span class="material-symbols-outlined text-[18px] text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                </div>
                <h2 class="font-heading font-bold text-slate-900 mt-2.5 text-sm leading-tight">${a.title}</h2>
                <p class="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">${a.desc}</p>
              </div>

              <div class="pt-2 flex items-center justify-between border-t border-slate-100">
                <span class="text-[10px] text-slate-400 truncate max-w-[90px]">${a.telemetry}</span>
                <span class="text-xs font-mono font-bold text-blue-600">${a.score}</span>
              </div>
            </a>
          `).join("")}
        </div>

      </div>
    </main>

    ${ge("intelligence")}
  `}function hn(e){const t=document.getElementById("analysis-filter-input");t&&(t.oninput=s=>{const a=s.target.value.toLowerCase().trim();document.querySelectorAll("#analysis-tiles-grid .analysis-tile").forEach(n=>{const o=n.getAttribute("data-keyword")||"";n.style.display=o.includes(a)?"flex":"none"})})}const ks={pacing:{title:"Pacing Analysis",score:82,icon:"speed",desc:"Scene duration variance, narrative tempo and page-turn velocity.",questions:["Where does the pace drag in Act II?","Find scenes over 4 pages","Show action-to-dialogue ratios"],findings:[{scene:"SCENE 14 · Dockside Perimeter · Pg 36",act:"Act II",title:"Action beats slow down before major confrontation",desc:"Extended exposition between dock guards lowers tension prior to container breach.",targetScene:14},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Peak narrative rhythm",desc:"Fast intercut dialogue creates maximum urgency before floodgate breach.",targetScene:18},{scene:"SCENE 26 · Coastal Highway · Pg 68",act:"Act III",title:"High velocity turning point",desc:"Pursuit cadence maintains optimal beats per page.",targetScene:26}]},dialogue:{title:"Dialogue Analysis",score:89,icon:"chat",desc:"Cadence, subtext density, distinctive character voice profiles.",questions:["Are character voices distinctive?","Find on-the-nose exposition lines","Analyze dialogue subtext in Scene 18"],findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Subtext is understated and powerful",desc:"Kevin avoids speaking about his brother directly, communicating through silence and tea rituals.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Meera O.S. dialogue establishes authority",desc:"Radio chatter avoids fluff and communicates technical stakes concisely.",targetScene:18}]},emotion:{title:"Emotion Analysis",score:91,icon:"favorite",desc:"Catharsis trajectory, emotional resonance curves, character empathy indices.",questions:["Where does emotional vulnerability peak?","Track empathy trajectory for Kevin","Catharsis resolution in Act III"],findings:[{scene:"SCENE 12 · Father’s Workshop · Pg 28",act:"Act I",title:"Emotional anchor established",desc:"Familial debt and generational sacrifice ground Kevin’s reluctance to blow the whistle.",targetScene:12},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Desperation under rising water",desc:"Kevin’s fear of failing Meera is palpable as water rises past junction box.",targetScene:18}]},"character-arc":{title:"Character Arc Analysis",score:84,icon:"alt_route",desc:"Want vs. Need conflict, psychological transformation, fatal flaw resolution.",questions:["Does Kevin overcome his passivity?","Meera character transformation","Antagonist motivation clarity"],findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]},continuity:{title:"Continuity Analysis",score:78,icon:"linear_scale",desc:"Prop tracking, character spatial locations, timeline consistency checks.",questions:["Check prop handover in Scene 18","Is time of day consistent across Act II?","Track the brass seal location"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Hydro-sensor probe referenced before retrieval",desc:"Verify Kevin picked up copper probe in Scene 16 or carries it on belt.",targetScene:18},{scene:"SCENE 22 · Pumping Station · Pg 58",act:"Act II",title:"Flashlight state discrepancy",desc:"Ensure flashlight was retrieved after water surge in Scene 19.",targetScene:22}]},"story-structure":{title:"Story Structure Analysis",score:87,icon:"account_tree",desc:"Inciting incident, plot points, midpoint shift, climax architecture.",questions:["Is midpoint clearly defined?","Evaluate climax timing on page 88","Are 3-act beats aligned?"],findings:[{scene:"SCENE 06 · Customs Registry · Pg 14",act:"Inciting Incident",title:"Off-manifest container discovered",desc:"The inciting anomaly sets Kevin on irreversible investigative path.",targetScene:6},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Midpoint (Pg 48/96)",title:"Stakes escalate from civil to criminal",desc:"Kevin realizes his own brother commands the smuggling cartel.",targetScene:18}]},theme:{title:"Theme Analysis",score:90,icon:"lightbulb",desc:"Primary narrative spine: Complicity vs. Duty and moral accountability.",questions:["What is the central theme?","Where is loyalty tested?","Show recurring thematic motifs"],findings:[{scene:"SCENE 09 · Family Kitchen · Pg 22",act:"Act I",title:"Familial pressure as thematic catalyst",desc:"Kevin hides eviction notice, showing economic desperation fueling institutional silence.",targetScene:9},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Moral test faced directly",desc:"Kevin must decide whether to save his brother or save the port city from flooding.",targetScene:18},{scene:"SCENE 36 · Rooftop Overlook · Pg 94",act:"Act III",title:"Theme delivers its final statement",desc:"Accountability over self-preservation.",targetScene:36}]},cinema:{title:"Cinema & Visual Storytelling",score:85,icon:"videocam",desc:"Visual set-piece density, image systems, lighting and camera intentionality.",questions:["Check visual contrast between acts","Highlight cinematic set-pieces","Analyze color palette cues in action lines"],findings:[{scene:"SCENE 01 · Harbor Drone View · Pg 01",act:"Act I",title:"Strong establishing visual metaphor",desc:"Rusted shipping containers stacked like monoliths beneath smog.",targetScene:1},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"High visual tension",desc:"Red emergency beacons reflected in rising brackish water.",targetScene:18}]},scene:{title:"Scene Analysis",score:86,icon:"movie",desc:"Micro-structure of Scene 18: Objective, obstacle, polarity change.",questions:["What is the scene objective?","Where does tension peak?","How does polarity shift?"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]},formatting:{title:"Formatting & Guild Compliance",score:94,icon:"rule",desc:"Industry standard margin measurements, capitalization, slugline syntax.",questions:["Check standard industry margins","Find non-standard scene sluglines","Verify dialogue capitalization rules"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Perfect Courier Prime 12pt slugline",desc:"Margins, dual dialogue spacing, and transition tags meet Writers Guild standards.",targetScene:18}]},production:{title:"Production Breakdown",score:80,icon:"movie_creation",desc:"Locations, shooting days, practical elements, cast size breakdown.",questions:["How many practical locations?","Show scenes with special props","List one-off speaking roles"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Location: Wet Stage / Customs Interior",desc:"Requires controlled water flooding tank, hydro-sensor prop box, wet comm-link gear.",targetScene:18}]}};function Vs(e){if(h.state.screenplay&&h.state.screenplay.id===e)return h.state.screenplay;const t=localStorage.getItem(`scriptora_screenplay_${e}`);if(t)try{const s=JSON.parse(t);if(s&&s.scenes&&s.scenes.length>0)return s}catch{}return e==="chronicles-of-dust"?os:null}function Gs(e,t){const s=[];return e&&Array.isArray(e.scenes)&&e.scenes.length>0?e.scenes.forEach((a,n)=>{const o=a.number||n+1,l=a.slugline&&a.slugline.trim()||a.blocks?.find(i=>i.type==="scene")?.content?.trim()||`SCENE ${o}`;s.push({id:a.id||`scene-${o}`,number:o,slugline:l,act:a.actId==="act-3"?"Act III":a.actId==="act-2"?"Act II":o>24?"Act III":o>11?"Act II":"Act I"})}):os.scenes.forEach(n=>{s.push({id:n.id,number:n.number,slugline:n.slugline||`SCENE ${n.number}`,act:n.actId==="act-2"?"Act II":"Act I"})}),s}function vn(e){const t=[];e&&((e.characters||[]).forEach(a=>{const n=typeof a=="string"?a:a.name||"";n&&t.push(n)}),(e.scenes||[]).forEach(a=>{(a.blocks||[]).forEach(n=>{n.type==="character"&&n.content&&t.push(n.content)})}));let s=Rs(t);if(s.length===0&&(e&&(e.id==="chronicles-of-dust"||e.title?.includes("Dust"))?s=["SANTHOSH","ARAVIND","KEVIN","MEERA"]:s=["SANTHOSH","ARAVIND"]),e&&(e.characters=s,e.id))try{localStorage.setItem(`scriptora_screenplay_${e.id}`,JSON.stringify(e))}catch{}return s.map(a=>{const n=a.toUpperCase();let o="Character";return n==="SANTHOSH"||n==="ARAVIND"||n==="KEVIN"?o="Protagonist":n==="MEERA"&&(o="Confidante"),{name:a,role:o}})}function Ws(e,t=[]){const s=t.find(i=>Number(i.number)===Number(e))||{number:e,slugline:`SCENE ${e}`,act:e>24?"Act III":e>11?"Act II":"Act I"},a=s.slugline.replace(/^SCENE\s*\d+\s*·\s*/i,"").trim(),n=s.act||(e>24?"Act III":e>11?"Act II":"Act I"),o=Math.max(1,(s.number-1)*3+1),l=Math.min(4.5,Math.max(1.5,s.number*7%3+2)).toFixed(1);return Number(e)===18?{number:18,heading:"SCENE 18 · INT. CUSTOMS OFFICE - NIGHT",act:"Act II Midpoint",page:48,estMin:"3.5",meta:"Act II Midpoint · Pg 48 · ~3.5 min est.",purpose:"Kevin attempts to reroute the electrical relay before the surge floods the basement archives.",conflict:"Rising water breaches the junction box while automated emergency flood doors trigger lockouts, trapping him inside.",whatChanges:"Kevin cuts the emergency seal and refuses to sign the false manifest, irreversibly shifting from passive worker to active resistance.",synthesis:"Polarity shifts from cautious optimism (+1) to catastrophic physical trap and moral awakening (-2), marking the central pivot of the screenplay.",findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]}:Number(e)===1?{number:1,heading:`SCENE 01 · ${a||"INT. HOME - EVENING"}`,act:"Act I Opening",page:1,estMin:"2.0",meta:"Act I Opening · Pg 01 · ~2.0 min est.",purpose:"Establish opening character presence, environment, and initial psychological stakes.",conflict:"Tension and unspoken questions between characters as unfamiliar presence breaks routine.",whatChanges:"Ordinary state broken by unfamiliar arrival, creating the narrative catalyst for the journey.",synthesis:"Polarity shifts from neutral calm (0) to heightened curiosity and alertness (-1), establishing the dramatic question.",findings:[{scene:`SCENE 01 · ${a||"Opening"} · Pg 01`,act:"Act I Opening",title:"Establish protagonist baseline and primary premise",desc:"Opening visual dynamic introduces character motives before inciting conflict.",targetScene:1}]}:Number(e)===4?{number:4,heading:`SCENE 04 · ${a||"INT. PORT AUDIT ROOM - DAY"}`,act:"Act I",page:9,estMin:"2.5",meta:"Act I · Pg 09 · ~2.5 min est.",purpose:"Kevin audits cargo registry under pressure from superiors to overlook anomalies.",conflict:"Institutional compliance vs early ethical hesitation as signatures are demanded.",whatChanges:"Kevin stamps the manifest with reluctance, confirming his fatal flaw of institutional compliance.",synthesis:"Polarity shifts from hesitation (0) to moral compromise (-1), establishing the internal flaw to overcome.",findings:[{scene:"SCENE 04 · Port Audit · Pg 09",act:"Act I",title:"Fatal Flaw Demonstrated: Silent Compliance",desc:"Compliant stamp creates complicity guilt that fuels later revolt.",targetScene:4}]}:{number:e,heading:`SCENE ${String(e).padStart(2,"0")} · ${a||`INT. LOCATION ${e} - DAY`}`,act:n,page:o,estMin:l,meta:`${n} · Pg ${o} · ~${l} min est.`,purpose:`Execute narrative beat for ${a||`Scene ${e}`} and advance sequence trajectory.`,conflict:"Characters encounter rising resistance while navigating immediate beat obstacles.",whatChanges:"Beats shift character leverage, altering interpersonal dynamic and scene outcome.",synthesis:"Polarity turns decisively across the beat, transitioning the dramatic tension into the next sequence.",findings:[{scene:`SCENE ${String(e).padStart(2,"0")} · Pg ${o}`,act:n,title:`Scene ${e} Beat Dynamics`,desc:`Dramatic polarity progression in ${a||`Scene ${e}`} sustains narrative tempo.`,targetScene:e}]}}function Ks(e,t){const s=vt(e||"SANTHOSH"),a=s.toUpperCase();let n=0;if(t&&Array.isArray(t.scenes)&&t.scenes.forEach(i=>{i.blocks&&i.blocks.some(r=>r.type==="character"&&vt(r.content)===a)&&n++}),a==="SANTHOSH")return{name:"SANTHOSH",role:"Protagonist",scenesCount:n>0?`${n} scenes tracked`:"36 scenes tracked",step1Title:"Silent Conviction & Initial Resistance",step1Tag:"Fatal Flaw",step1Range:"Beginning Beats",step1Desc:"Santhosh begins navigating intense internal conviction, wrestling with external constraints and uncovering initial stakes.",step2Title:"The Turning Point & Strategic Pivot",step2Tag:"Turning Point",step2Range:"Middle Beats (Midpoint)",step2Desc:"Santhosh breaks away from passive compromises, taking active control of the narrative direction under peak conflict.",step3Title:"Decisive Transformation & Resolution",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Santhosh embraces complete accountability and purpose, achieving an irreversible transformation through the climax.",synthesis:"Santhosh drives the core thematic arc of the story, transforming from cautious survival into an active, principled catalyst of change.",findings:[{scene:"SCENE 01 · Narrative Baseline · Pg 01",act:"Act I",title:"Fatal Flaw: Internal Hesitation",desc:"Santhosh operates with guarded vigilance before escalating pressures force decisive action.",targetScene:1},{scene:"SCENE 02 · The Turning Point · Pg 05",act:"Act II",title:"The Point of No Return",desc:"Santhosh takes a defining stance that permanently pivots interpersonal relationships and story stakes.",targetScene:2}]};if(a==="ARAVIND")return{name:"ARAVIND",role:"Protagonist",scenesCount:n>0?`${n} scenes tracked`:"32 scenes tracked",step1Title:"Guarded Precision & Calculated Loyalty",step1Tag:"Origin Stance",step1Range:"Beginning Beats",step1Desc:"Aravind maintains tactical focus and sharp perception, questioning surrounding motives and testing early alliances.",step2Title:"High-Stakes Partnership & Crucial Stand",step2Tag:"Midpoint Shift",step2Range:"Middle Beats (Midpoint)",step2Desc:"Aravind unites forces during the turning point, applying razor-sharp resolve to counter mounting narrative obstacles.",step3Title:"Decisive Breakthrough & Ultimate Climax",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Aravind executes the final breakthrough, sealing the resolution through steadfast commitment to the mission.",synthesis:"Aravind provides essential tactical momentum and intellectual force, elevating the stakes and cementing the dramatic payoff.",findings:[{scene:"SCENE 01 · Tactical Introduction · Pg 01",act:"Act I",title:"Strategic Presence & Foresight",desc:"Aravind introduces critical context and tactical perspective into the unfolding scenario.",targetScene:1},{scene:"SCENE 02 · Midpoint Crucible · Pg 06",act:"Act II",title:"Decisive Strategic Realignment",desc:"Aravind commits to the high-stakes confrontation that defines the story trajectory.",targetScene:2}]};if(a==="KEVIN")return{name:"Kevin",role:"Protagonist",scenesCount:n>0?`${n} scenes tracked`:"48 scenes tracked",step1Title:"Silent Compliance & Institutional Fear",step1Tag:"Fatal Flaw",step1Range:"Beginning · Scene 01–11",step1Desc:"Hesitant and guarded, Kevin stamps irregular manifests to keep peace with superiors and protect familial debt.",step2Title:"The Point of No Return",step2Tag:"Turning Point",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Cuts the emergency floodgate seal, actively defying union directives to prevent port catastrophe.",step3Title:"Selfless Moral Accountability",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Hands over the ledger to the public audit without demanding personal immunity, completing moral transformation.",synthesis:"The protagonist completes a verified 3-stage transformation: overcoming passivity at the midpoint and prioritizing moral duty over self-preservation in the climax.",findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]};if(a==="MEERA")return{name:"Meera",role:"Confidante",scenesCount:n>0?`${n} scenes tracked`:"22 scenes tracked",step1Title:"Vigilant Skepticism & Tactical Isolation",step1Tag:"Origin Stance",step1Range:"Beginning · Scene 01–12",step1Desc:"Operates independently along pipeline perimeters, skeptical of municipal regulators and trusting only raw field telemetry.",step2Title:"Calculated Alliance Under Pressure",step2Tag:"Partnership Beat",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Guides Kevin via comm-link to the breaker box, choosing to rely on his technical precision despite active security alarms.",step3Title:"Vindicated Shared Resistance",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Secures and broadcasts the telemetry leak to the public frequency, cementing alliance and exposing corporate monopoly.",synthesis:"The confidante evolves from protective cynicism to trusted partnership, providing the strategic resolve that enables the protagonist to act.",findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Tactical Caution & Guarded Insight",desc:"Meera warns Kevin of private security patrols monitoring pipeline telemetry.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Emergency Comm Guidance",desc:"Meera coordinates the junction box bypass before automated floodgates lock.",targetScene:18}]};const o=a==="KEVIN"||a==="SANTHOSH"||a==="ARAVIND"?"Protagonist":"Character",l=n>0?`${n} scenes tracked`:"Screenplay Character";return{name:s,role:o,scenesCount:l,step1Title:"Initial Presence & Motive Baseline",step1Tag:"Introduction",step1Range:"Beginning Beats",step1Desc:`${s} is introduced navigating personal priorities and reacting to the changing environment.`,step2Title:"Escalating Involvement in Narrative Stakes",step2Tag:"Midpoint Pressure",step2Range:"Middle Beats",step2Desc:`${s} faces direct conflict or shifting loyalties as pressure mounts across the sequence.`,step3Title:"Climactic Position & Resolution",step3Tag:"Resolution",step3Range:"Ending Beats",step3Desc:`${s} resolves their dramatic throughline, solidifying their standing in the story outcome.`,synthesis:`${s} contributes essential narrative pressure and perspective across their screenplay appearances.`,findings:[{scene:"SCENE 01 · Screenplay Beat · Pg 01",act:"Act I",title:`${s} Character Introduction`,desc:`Dialogue and action beats introduce ${s}'s voice and perspective.`,targetScene:1}]}}function yn(e,t,s={}){const a=t.pages||96,{availableScenes:n=[],currentSceneData:o={},availableChars:l=[],currentCharData:i={}}=s;switch(e){case"pacing":return`
        <!-- 1. PACING: Main Pacing Curve Graph -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">show_chart</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Timeline Pace</h2>
            </div>
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>${a} Pages Analyzed</span>
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
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">alt_route</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Character Journey & Transformation</h2>
            </div>
            <span id="char-role-badge" class="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold shrink-0">${i.role||"Protagonist"}</span>
          </div>

          <!-- Compact Character Selector dropdown (Consistent with Scene Analysis selector) -->
          <div class="flex items-center justify-between gap-2" id="char-arc-selector-row">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Character</span>
              <div class="relative inline-flex items-center shrink-0">
                <select id="analysis-char-selector" class="h-7 pl-2.5 pr-6 rounded-lg bg-white border border-slate-200 hover:border-blue-500 text-slate-800 text-xs font-semibold appearance-none cursor-pointer focus:outline-none shadow-2xs transition-colors">
                  ${l.map(r=>`
                    <option value="${r.name}" ${r.name.toUpperCase()===(i.name||"").toUpperCase()?"selected":""}>${r.name}</option>
                  `).join("")}
                </select>
                <span class="material-symbols-outlined text-[14px] text-slate-500 absolute right-1.5 pointer-events-none">expand_more</span>
              </div>
            </div>
            <span class="text-[11px] text-slate-400 font-medium" id="char-scenes-count">${i.scenesCount||"Screenplay Character"}</span>
          </div>

          <!-- Journey Step Diagram (Beginning -> Middle -> Ending) -->
          <div class="relative flex flex-col gap-4 pl-2 py-1">
            <!-- Step 1: Beginning -->
            <div class="relative flex items-start gap-3">
              <div class="absolute left-3.5 top-6 bottom-0 w-0.5 bg-slate-200"></div>
              <div class="w-7 h-7 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center shrink-0 z-10 text-slate-600 text-xs font-bold">1</div>
              <div class="flex flex-col min-w-0 pt-0.5">
                <div class="flex items-center gap-2">
                  <span id="char-step1-range" class="text-xs font-bold text-slate-900 uppercase tracking-wide">${i.step1Range}</span>
                  <span id="char-step1-tag" class="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 font-mono">${i.step1Tag}</span>
                </div>
                <h3 id="char-step1-title" class="text-xs font-bold text-slate-800 mt-1">${i.step1Title}</h3>
                <p id="char-step1-desc" class="text-xs text-slate-500 mt-0.5 leading-relaxed">${i.step1Desc}</p>
              </div>
            </div>

            <!-- Step 2: Middle / Turning Point -->
            <div class="relative flex items-start gap-3">
              <div class="absolute left-3.5 top-6 bottom-0 w-0.5 bg-blue-300"></div>
              <div class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 z-10 text-xs font-bold shadow-xs">2</div>
              <div class="flex flex-col min-w-0 pt-0.5">
                <div class="flex items-center gap-2">
                  <span id="char-step2-range" class="text-xs font-bold text-blue-600 uppercase tracking-wide">${i.step2Range}</span>
                  <span id="char-step2-tag" class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold font-mono">${i.step2Tag}</span>
                </div>
                <h3 id="char-step2-title" class="text-xs font-bold text-slate-900 mt-1">${i.step2Title}</h3>
                <p id="char-step2-desc" class="text-xs text-slate-500 mt-0.5 leading-relaxed">${i.step2Desc}</p>
              </div>
            </div>

            <!-- Step 3: Ending / Resolution -->
            <div class="relative flex items-start gap-3">
              <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 z-10 text-xs font-bold shadow-xs">3</div>
              <div class="flex flex-col min-w-0 pt-0.5">
                <div class="flex items-center gap-2">
                  <span id="char-step3-range" class="text-xs font-bold text-emerald-700 uppercase tracking-wide">${i.step3Range}</span>
                  <span id="char-step3-tag" class="px-2 py-0.5 rounded bg-emerald-50 text-[10px] text-emerald-700 font-semibold font-mono">${i.step3Tag}</span>
                </div>
                <h3 id="char-step3-title" class="text-xs font-bold text-slate-900 mt-1">${i.step3Title}</h3>
                <p id="char-step3-desc" class="text-xs text-slate-500 mt-0.5 leading-relaxed">${i.step3Desc}</p>
              </div>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="mt-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">psychology</span>
            <p id="char-synthesis-desc" class="text-xs text-slate-700 leading-relaxed">
              ${i.synthesis}
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
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Compliance across ${a} pages</span>
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
              Extracted practical elements across ${a} pages. Primary production weight resides in Act II harbor logistics and wet stage setups (Scenes 14–22).
            </p>
          </div>
        </section>
      `;case"scene":return`
        <!-- 11. SCENE ANALYSIS: Dominant Scene Breakdown with Compact Scene Selector -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <!-- Slugline Header Banner with Compact Scene Selector -->
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">Target Scene</span>
                <!-- Compact Scene Selector dropdown (matches reference screenshot) -->
                <div class="relative inline-flex items-center shrink-0">
                  <select id="analysis-scene-selector" class="h-7 pl-2.5 pr-6 rounded-lg bg-white border border-slate-200 hover:border-blue-500 text-slate-800 text-xs font-semibold appearance-none cursor-pointer focus:outline-none shadow-2xs transition-colors">
                    ${n.map(r=>`
                      <option value="${r.number}" ${String(r.number)===String(o.number)?"selected":""}>Scene ${r.number}</option>
                    `).join("")}
                  </select>
                  <span class="material-symbols-outlined text-[14px] text-slate-500 absolute right-1.5 pointer-events-none">expand_more</span>
                </div>
              </div>
              <span id="target-scene-meta" class="text-[11px] font-medium text-slate-500 truncate">${o.meta||"Act II Midpoint · Pg 48 · ~3.5 min est."}</span>
            </div>
            <h2 id="target-scene-heading" class="font-heading font-bold text-base text-slate-900 tracking-tight">
              ${o.heading||"SCENE 18 · INT. CUSTOMS OFFICE - NIGHT"}
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
                <p id="target-scene-purpose" class="text-xs text-slate-800 font-medium leading-relaxed mt-0.5">
                  ${o.purpose||"Kevin attempts to reroute the electrical relay before the surge floods the basement archives."}
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
                <p id="target-scene-conflict" class="text-xs text-slate-800 font-medium leading-relaxed mt-0.5">
                  ${o.conflict||"Rising water breaches the junction box while automated emergency flood doors trigger lockouts, trapping him inside."}
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
                <p id="target-scene-what-changes" class="text-xs text-slate-800 font-medium leading-relaxed mt-0.5">
                  ${o.whatChanges||"Kevin cuts the emergency seal and refuses to sign the false manifest, irreversibly shifting from passive worker to active resistance."}
                </p>
              </div>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">movie</span>
            <p id="target-scene-synthesis" class="text-xs text-slate-700 leading-relaxed">
              ${o.synthesis||"Polarity shifts from cautious optimism (+1) to catastrophic physical trap and moral awakening (-2), marking the central pivot of the screenplay."}
            </p>
          </div>
        </section>
      `;default:return""}}function wn(e="pacing",t=null,s=null){const a={...ks[e]||ks.pacing},n=sessionStorage.getItem("scriptora_prod_return");let o;try{const y=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;o=new URLSearchParams(y||"")}catch{o=new URLSearchParams}const l=t==="editor"||o.get("from")==="editor"||!!n,i=s||o.get("scriptId")||(n?n.replace("/editor/",""):null)||h.state.selectedScriptId||"chronicles-of-dust",r=`/editor/${i}`,u=i,p=h.state.scripts.find(y=>y.id===u)||h.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",pages:96},x=Vs(u),c=Gs(x),d=vn(x),m=Number(h.state.currentSceneId||(c.find(y=>y.number===18)?18:c[0]?.number||1)),f=d[0]?.name||"Kevin",b=Ws(m,c),g=Ks(f,x);e==="scene"?(a.desc=`Micro-structure of Scene ${b.number}: Objective, obstacle, polarity change.`,a.findings=b.findings||a.findings):e==="character-arc"&&(a.findings=g.findings||a.findings);const E={availableScenes:c,currentSceneData:b,availableChars:d,currentCharData:g},A=t||o.get("from");let S="/intelligence/analysis",I="Back to Vectors";return l?(S=r,I="Back to Editor"):A==="dashboard"||A==="/intelligence/dashboard"||A?.includes("/intelligence/dashboard")?(S="/intelligence/dashboard",I="Back to Dashboard"):A&&A.startsWith("/")&&(S=A,I="Back"),`
    ${be(l?"Editor":"Intelligence",a.title)}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- 1. SUB-HEADER NAVIGATION ROW -->
        <div class="flex items-center justify-between">
          <a href="${S}" id="analysis-back-btn" class="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors text-xs font-semibold uppercase tracking-wider no-underline">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>${I}</span>
          </a>
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span class="text-xs font-medium">${p.title} · ${p.draft||"Draft 4.2"}</span>
          </div>
        </div>

        <!-- Section Title Header (Extra score beside heading removed as requested) -->
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[22px]">${a.icon}</span>
              <h1 class="font-heading text-xl font-bold text-slate-900 tracking-tight">${a.title}</h1>
            </div>
            <p id="analysis-header-desc" class="text-xs text-slate-500 mt-0.5">${a.desc}</p>
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
            ${a.questions.map(y=>`
              <button type="button" class="query-pill shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors shadow-xs active:scale-95" data-query="${y}">
                ${y}
              </button>
            `).join("")}
          </div>

          <!-- AI Answer Box -->
          <div id="vector-ai-answer" class="hidden bg-white border border-blue-100 rounded-xl p-3 text-xs text-slate-700 shadow-xs leading-relaxed"></div>
        </div>

        <!-- 3. SCORE CARD (SINGLE CANONICAL SCORE PRESENTATION) -->
        <div class="bg-white rounded-2xl py-4 px-6 shadow-xs border border-slate-200/80 flex items-center justify-center">
          <div class="flex items-baseline gap-1.5">
            <span class="font-heading font-extrabold text-3xl sm:text-4xl text-blue-600 tracking-tight">${a.score}</span>
            <span class="text-xs font-semibold text-slate-400">/ 100 Index</span>
          </div>
        </div>

        <!-- 4. MAIN ANALYSIS VISUAL / CONTENT (MANDATORY & RESTORED) -->
        ${yn(e,p,E)}

        <!-- 5. IMPORTANT FINDINGS (KEY SCENE FINDINGS) -->
        <div class="flex flex-col gap-3" id="analysis-findings-container">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">Key Scene Findings</span>
            <span id="findings-count-tag" class="text-[11px] text-slate-400 font-medium">${a.findings.length} findings tracked</span>
          </div>

          <div id="findings-list" class="flex flex-col gap-3">
            ${a.findings.map(y=>`
              <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${y.scene}</span>
                  <span class="text-[11px] font-medium text-slate-400">${y.act}</span>
                </div>
                <div class="flex flex-col">
                  <h3 class="text-xs sm:text-sm font-bold text-slate-900">${y.title}</h3>
                  <p class="text-xs text-slate-600 mt-1 leading-relaxed">${y.desc}</p>
                </div>
                <div class="pt-2 flex justify-end border-t border-slate-100">
                  <!-- 6. OPEN IN EDITOR BUTTON -->
                  <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${y.targetScene}">
                    <span class="material-symbols-outlined text-[15px]">edit_note</span>
                    <span>Open in Editor (Scene ${y.targetScene})</span>
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    </main>

    ${ge("intelligence")}
  `}function Sn(e,t,s=null,a=null){const n=sessionStorage.getItem("scriptora_prod_return");let o;try{const I=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;o=new URLSearchParams(I||"")}catch{o=new URLSearchParams}const l=s==="editor"||o.get("from")==="editor"||!!n,i=a||o.get("scriptId")||(n?n.replace("/editor/",""):null)||h.state.selectedScriptId||"chronicles-of-dust",r=`/editor/${i}`,u=i,p=Vs(u),x=Gs(p),c=document.getElementById("analysis-back-btn");c&&(c.onclick=I=>{if(I.preventDefault(),l)sessionStorage.removeItem("scriptora_prod_return"),t(r);else{const y=s||o.get("from");y==="dashboard"||y==="/intelligence/dashboard"||y?.includes("/intelligence/dashboard")?t("/intelligence/dashboard"):y&&y.startsWith("/")?t(y):t("/intelligence/analysis")}});function d(){document.querySelectorAll(".btn-open-editor-scene").forEach(I=>{I.onclick=()=>{const y=I.getAttribute("data-scene");h.setState({currentSceneId:Number(y)}),w(`Jumping to Scene ${y} in Editor`),t(`/editor/${u}?scene=${y}`)}})}d();function m(I){const y=document.getElementById("findings-list"),k=document.getElementById("findings-count-tag");k&&(k.textContent=`${I.length} findings tracked`),y&&(y.innerHTML=I.map(R=>`
      <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${R.scene}</span>
          <span class="text-[11px] font-medium text-slate-400">${R.act}</span>
        </div>
        <div class="flex flex-col">
          <h3 class="text-xs sm:text-sm font-bold text-slate-900">${R.title}</h3>
          <p class="text-xs text-slate-600 mt-1 leading-relaxed">${R.desc}</p>
        </div>
        <div class="pt-2 flex justify-end border-t border-slate-100">
          <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${R.targetScene}">
            <span class="material-symbols-outlined text-[15px]">edit_note</span>
            <span>Open in Editor (Scene ${R.targetScene})</span>
          </button>
        </div>
      </div>
    `).join(""),d())}const f=document.getElementById("analysis-scene-selector");f&&(f.onchange=I=>{const y=parseInt(I.target.value,10);h.setState({currentSceneId:y});const k=Ws(y,x),R=document.getElementById("target-scene-meta"),K=document.getElementById("target-scene-heading"),v=document.getElementById("target-scene-purpose"),L=document.getElementById("target-scene-conflict"),oe=document.getElementById("target-scene-what-changes"),O=document.getElementById("target-scene-synthesis"),j=document.getElementById("analysis-header-desc");R&&(R.textContent=k.meta),K&&(K.textContent=k.heading),v&&(v.textContent=k.purpose),L&&(L.textContent=k.conflict),oe&&(oe.textContent=k.whatChanges),O&&(O.textContent=k.synthesis),j&&(j.textContent=`Micro-structure of Scene ${y}: Objective, obstacle, polarity change.`),m(k.findings),w(`Analyzing Scene ${y}`)});const b=document.getElementById("analysis-char-selector");b&&(b.onchange=I=>{const y=I.target.value,k=Ks(y,p),R=document.getElementById("char-role-badge"),K=document.getElementById("char-scenes-count"),v=document.getElementById("char-step1-range"),L=document.getElementById("char-step1-tag"),oe=document.getElementById("char-step1-title"),O=document.getElementById("char-step1-desc"),j=document.getElementById("char-step2-range"),ae=document.getElementById("char-step2-tag"),M=document.getElementById("char-step2-title"),ee=document.getElementById("char-step2-desc"),xe=document.getElementById("char-step3-range"),W=document.getElementById("char-step3-tag"),te=document.getElementById("char-step3-title"),$=document.getElementById("char-step3-desc"),Y=document.getElementById("char-synthesis-desc");R&&(R.textContent=k.role),K&&(K.textContent=k.scenesCount),v&&(v.textContent=k.step1Range),L&&(L.textContent=k.step1Tag),oe&&(oe.textContent=k.step1Title),O&&(O.textContent=k.step1Desc),j&&(j.textContent=k.step2Range),ae&&(ae.textContent=k.step2Tag),M&&(M.textContent=k.step2Title),ee&&(ee.textContent=k.step2Desc),xe&&(xe.textContent=k.step3Range),W&&(W.textContent=k.step3Tag),te&&(te.textContent=k.step3Title),$&&($.textContent=k.step3Desc),Y&&(Y.textContent=k.synthesis),m(k.findings),w(`Switched active character focus to ${k.name}`)}),document.querySelectorAll("[data-jump-scene]").forEach(I=>{I.onclick=()=>{const y=I.getAttribute("data-jump-scene");h.setState({currentSceneId:Number(y)}),w(`Jumping to Scene ${y} in Editor`),t(`/editor/${u}?scene=${y}`)}});const g=document.getElementById("vector-ai-input"),E=document.getElementById("vector-ai-submit"),A=document.getElementById("vector-ai-answer");async function S(I){if(!I||!A)return;A.classList.remove("hidden"),A.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing narrative beats...</span>';const y=await ls(I,u);A.textContent=y}E&&g&&(E.onclick=()=>S(g.value.trim()),g.onkeydown=I=>{I.key==="Enter"&&S(g.value.trim())}),document.querySelectorAll(".query-pill").forEach(I=>{I.onclick=()=>{const y=I.getAttribute("data-query");g&&(g.value=y),S(y)}})}function In(e=null,t=null){const s=new URLSearchParams(window.location.search||""),a=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),n=t||s.get("scriptId")||h.state.editorReturnScriptId||h.state.selectedScriptId||"chronicles-of-dust",o=a==="editor",l=o?sessionStorage.getItem("scriptora_editor_return")||`/editor/${n}`:"/workspace",i=h.state.scripts?.find(d=>d.id===n)||h.state.scripts?.[0]||{},r=h.state.currentUser||(()=>{try{const d=localStorage.getItem("scriptora_user");if(d)return JSON.parse(d)}catch{}return{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}}})(),u=h.state.settings||(()=>{try{const d=localStorage.getItem("scriptora_settings");if(d)return JSON.parse(d)}catch{}return{editor:{showSceneNumbers:!0,autoCapitalize:!0,autoTransition:!0,continueDialogue:!0,fontSize:"Courier Prime 12pt",autoSave:"Instant"},language:"English (US)",transliteration:!1,appearance:"Light",accentColor:"blue",fontScale:"Normal",notifications:{invites:!0,edits:!0,insights:!0,milestones:!0},intelligence:{deepAnalysis:!0,pacingAlerts:!0,dialogueScoring:!0,sensitivity:"Balanced"},privacy:{watermark:!0,encryption:!0}}})(),p=h.state.scripts?.length||r.stats?.drafts||14,x=3,c=r.stats?.healthIndex||"98%";return`
    ${be("Profile","Account & preferences.")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
      <div class="flex flex-col w-full max-w-lg mx-auto px-4 pt-3 pb-8 space-y-6 fade-in">
        
        <!-- Back Navigation to Editor (When entered from Editor) -->
        ${o?`
          <div class="flex flex-col gap-1 -mb-3">
            <a href="${l}" id="profile-back-to-editor-btn" class="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors text-xs font-semibold uppercase tracking-wider no-underline w-fit">
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Editor</span>
            </a>
          </div>
        `:""}

        <!-- Profile Header -->
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight font-heading">Profile</h1>
            <p class="text-xs text-slate-500 mt-0.5">Account & preferences.</p>
          </div>
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100/80">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>${r.badge||"Member Pro"}</span>
          </div>
        </div>

        <!-- User Information Card -->
        <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs flex flex-col items-center text-center">
          <div class="relative group cursor-pointer" id="avatar-container-btn" title="Click to edit profile or change photo">
            <div id="user-avatar-circle" class="w-20 h-20 rounded-full ${r.avatarColor||"bg-blue-600"} text-white font-bold text-2xl flex items-center justify-center shadow-md overflow-hidden transition-transform active:scale-95 border-2 border-white ring-2 ring-slate-100">
              ${r.avatarUrl?`
                <img id="user-avatar-img" src="${r.avatarUrl}" class="w-full h-full object-cover" alt="${r.name}" />
              `:`
                <span id="user-avatar-initials">${r.initials||"AK"}</span>
              `}
            </div>
            <button type="button" id="edit-avatar-btn" class="w-6 h-6 bg-white rounded-full border border-slate-200 text-slate-700 flex items-center justify-center absolute -bottom-0.5 -right-0.5 shadow-sm hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer" title="Add profile picture from local device">
              <span class="material-symbols-outlined text-[13px]">add_a_photo</span>
            </button>
          </div>
          <h2 class="text-base font-bold text-slate-900 mt-2.5 leading-tight font-heading" id="profile-display-name">${r.name}</h2>
          <p class="text-xs text-slate-500 mt-0.5" id="profile-display-headline">${r.headline||"Screenwriter"}</p>
          <div class="bg-slate-100 text-slate-600 text-[11px] font-medium px-3 py-1 rounded-full mt-2 inline-flex items-center gap-1.5">
            Scriptora Pro • Member since 2024
          </div>

          <!-- Interactive Stats Grid -->
          <div class="mt-4 grid grid-cols-3 gap-2.5 pt-3 w-full border-t border-slate-100">
            <button type="button" id="stat-card-drafts" class="bg-slate-50 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 rounded-xl p-2.5 text-center flex flex-col items-center transition-all cursor-pointer group">
              <span class="text-base font-bold text-slate-900 group-hover:text-blue-600 leading-tight font-heading">${p}</span>
              <span class="text-[10px] text-slate-500 group-hover:text-blue-500 mt-0.5 font-medium">Drafts</span>
            </button>
            <button type="button" id="stat-card-coauthors" class="bg-slate-50 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 rounded-xl p-2.5 text-center flex flex-col items-center transition-all cursor-pointer group">
              <span class="text-base font-bold text-slate-900 group-hover:text-blue-600 leading-tight font-heading">${x}</span>
              <span class="text-[10px] text-slate-500 group-hover:text-blue-500 mt-0.5 font-medium">Co-Authors</span>
            </button>
            <button type="button" id="stat-card-health" class="bg-slate-50 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 rounded-xl p-2.5 text-center flex flex-col items-center transition-all cursor-pointer group">
              <span class="text-base font-bold text-slate-900 group-hover:text-blue-600 leading-tight font-heading">${c}</span>
              <span class="text-[10px] text-slate-500 group-hover:text-blue-500 mt-0.5 font-medium">Health Index</span>
            </button>
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
            <!-- 1. Editor -->
            <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="sheet-editor">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">format_align_left</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Editor</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-editor">Numbers: ${u.editor?.showSceneNumbers?"On":"Off"} · Auto-save: ${u.editor?.autoSave||"Instant"}</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>

            <!-- 2. Language -->
            <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="sheet-language">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">translate</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Language</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-language">${u.language||"English (US)"}${u.transliteration?" · Transliteration On":""}</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>

            <!-- 3. Appearance -->
            <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="sheet-appearance">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">palette</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Appearance</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-appearance">${u.appearance||"Light"} · Scale: ${u.fontScale||"Normal"}</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>

            <!-- 4. Notifications -->
            <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="sheet-notifications">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">notifications_active</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Notifications</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-notifications">${Object.values(u.notifications||{}).filter(Boolean).length} alerts active</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>

            <!-- 5. Intelligence -->
            <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="sheet-intelligence">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">auto_awesome</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Intelligence</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-intelligence">${u.intelligence?.deepAnalysis?"Deep Arc Diagnostics":"Standard"} · ${u.intelligence?.sensitivity||"Balanced"}</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>

            <!-- 6. Privacy & Data -->
            <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="sheet-privacy">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">security</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Privacy & Data</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-privacy">${u.privacy?.watermark?"Watermark On":"Standard"} · Local AES Encrypted</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>

            <!-- 7. Storage & Sync -->
            <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="sheet-storage">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">cloud_done</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Storage & Sync</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-storage">Cloud Connected · Offline Ready</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>
          </div>

          <div id="no-settings-match" class="hidden text-center py-6 text-xs text-slate-400">
            No settings match your search.
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="profile-display-email">${r.email}</span>
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
            <a href="/profile/collaborators${o?`?from=editor&scriptId=${n}`:""}" class="w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group no-underline text-inherit cursor-pointer">
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

        ${o?`
          <div class="pt-1">
            <a href="${l}" id="profile-bottom-return-btn" class="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center gap-2 border border-blue-200 shadow-2xs no-underline transition-all active:scale-98">
              <span class="material-symbols-outlined text-[18px]">edit_note</span>
              <span>Return to Editor (${i.title||"Screenplay"})</span>
            </a>
          </div>
        `:""}

        <!-- Account Actions: Sign Out & Delete Account -->
        <div class="flex flex-col gap-2 pt-2">
          <button class="w-full border border-slate-200 bg-white hover:bg-slate-50 p-3 rounded-xl flex items-center justify-center gap-2 text-slate-700 transition-colors shadow-xs text-xs sm:text-sm font-semibold cursor-pointer active:scale-98" id="btn-trigger-signout" type="button">
            <span class="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out</span>
          </button>
          <button class="w-full border border-red-200/80 bg-red-50/50 hover:bg-red-50 p-3 rounded-xl flex items-center justify-center gap-2 text-red-600 transition-colors shadow-xs text-xs sm:text-sm font-semibold cursor-pointer active:scale-98" id="btn-trigger-delete-acc" type="button">
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
      <div id="action-modal" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center" id="action-modal-icon-box">
            <span class="material-symbols-outlined text-[20px]" id="action-modal-icon">logout</span>
          </div>
          <h2 class="text-base font-bold text-slate-900" id="action-modal-title">Sign Out</h2>
          <p class="text-xs text-slate-500" id="action-modal-desc">Are you sure you want to end your active session on this device?</p>
          <div class="flex items-center gap-2 mt-2">
            <button type="button" class="flex-1 h-10 px-4 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer" id="action-modal-cancel">Cancel</button>
            <button type="button" class="flex-1 h-10 px-4 rounded-xl text-white text-xs font-semibold shadow-xs cursor-pointer" id="action-modal-confirm">Confirm</button>
          </div>
        </div>
      </div>

      <!-- Edit Profile Modal -->
      <div id="modal-edit-profile" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5 max-h-[92vh] overflow-y-auto">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h2 class="text-sm font-bold text-slate-900">Edit Profile & Account</h2>
            <button type="button" class="close-profile-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>

          <!-- Hidden local file input for photo upload -->
          <input type="file" id="local-photo-input" accept="image/png, image/jpeg, image/webp, image/gif" class="hidden" />

          <!-- Profile Photo Local Upload Block -->
          <div class="flex flex-col items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div class="relative">
              <div id="modal-preview-avatar" class="w-16 h-16 rounded-full ${r.avatarColor||"bg-blue-600"} text-white font-bold text-xl flex items-center justify-center shadow-xs overflow-hidden border-2 border-white ring-2 ring-slate-200">
                ${r.avatarUrl?`
                  <img id="modal-preview-img" src="${r.avatarUrl}" class="w-full h-full object-cover" alt="Preview" />
                `:`
                  <span id="modal-preview-initials">${r.initials||"AK"}</span>
                `}
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button type="button" id="btn-modal-upload-photo" class="h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer">
                <span class="material-symbols-outlined text-[15px]">add_a_photo</span>
                <span>Add Local Photo</span>
              </button>
              <button type="button" id="btn-modal-remove-photo" class="${r.avatarUrl?"":"hidden"} h-8 px-2.5 rounded-lg bg-red-50 hover:bg-red-100 active:scale-95 text-red-600 text-xs font-semibold flex items-center gap-1 border border-red-200 transition-all cursor-pointer">
                <span class="material-symbols-outlined text-[15px]">delete</span>
                <span>Remove</span>
              </button>
            </div>
            <p class="text-[10px] text-slate-400 text-center">Select any photo (PNG, JPG, WEBP) from your device</p>
          </div>

          <form id="form-update-profile" class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Full Name</label>
              <input type="text" id="prof-input-name" value="${r.name}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600" required>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Headline / Role</label>
              <input type="text" id="prof-input-headline" value="${r.headline||"Screenwriter"}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Email Address</label>
              <input type="email" id="prof-input-email" value="${r.email}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600" required>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Fallback Avatar Color</label>
              <div class="flex items-center gap-2 pt-1">
                <button type="button" class="prof-avatar-color-btn w-7 h-7 rounded-full bg-blue-600 ring-2 ring-offset-2 ring-blue-600" data-color="bg-blue-600"></button>
                <button type="button" class="prof-avatar-color-btn w-7 h-7 rounded-full bg-indigo-600 hover:opacity-90" data-color="bg-indigo-600"></button>
                <button type="button" class="prof-avatar-color-btn w-7 h-7 rounded-full bg-emerald-600 hover:opacity-90" data-color="bg-emerald-600"></button>
                <button type="button" class="prof-avatar-color-btn w-7 h-7 rounded-full bg-purple-600 hover:opacity-90" data-color="bg-purple-600"></button>
                <button type="button" class="prof-avatar-color-btn w-7 h-7 rounded-full bg-amber-600 hover:opacity-90" data-color="bg-amber-600"></button>
              </div>
            </div>
            <div class="flex items-center gap-2 mt-2">
              <button type="button" class="close-profile-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
              <button type="submit" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Password Security Modal -->
      <div id="modal-security" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 class="text-sm font-bold text-slate-900">Security & Password</h2>
            <button type="button" class="close-security-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <form id="form-update-pw" class="flex flex-col gap-2.5">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Current Password</label>
              <div class="relative">
                <input type="password" id="pw-input-current" placeholder="••••••••••••" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600" required>
                <button type="button" class="btn-toggle-pw absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" data-target="pw-input-current">
                  <span class="material-symbols-outlined text-[16px]">visibility</span>
                </button>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">New Password</label>
              <div class="relative">
                <input type="password" id="pw-input-new" placeholder="Min. 6 characters" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600" required>
                <button type="button" class="btn-toggle-pw absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" data-target="pw-input-new">
                  <span class="material-symbols-outlined text-[16px]">visibility</span>
                </button>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Confirm New Password</label>
              <div class="relative">
                <input type="password" id="pw-input-confirm" placeholder="Re-enter new password" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600" required>
                <button type="button" class="btn-toggle-pw absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" data-target="pw-input-confirm">
                  <span class="material-symbols-outlined text-[16px]">visibility</span>
                </button>
              </div>
            </div>
            <p id="pw-error-text" class="text-[11px] text-red-500 hidden"></p>
            <div class="flex items-center gap-2 mt-2">
              <button type="button" class="close-security-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
              <button type="submit" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Update Password</button>
            </div>
          </form>
        </div>
      </div>

      <!-- 1. Editor Settings Modal -->
      <div id="modal-setting-editor" class="settings-modal fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">format_align_left</span>
              <h2 class="text-sm font-bold text-slate-900">Editor Settings</h2>
            </div>
            <button type="button" class="close-setting-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Scene Numbers</span>
                <span class="text-[11px] text-slate-500">Show industry standard scene markers</span>
              </div>
              <input type="checkbox" id="cfg-editor-scenenums" ${u.editor?.showSceneNumbers?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Auto-Capitalize Characters</span>
                <span class="text-[11px] text-slate-500">Auto uppercase character headings</span>
              </div>
              <input type="checkbox" id="cfg-editor-autocap" ${u.editor?.autoCapitalize!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Continue Dialogue (CONT'D)</span>
                <span class="text-[11px] text-slate-500">Auto append character continuation cues</span>
              </div>
              <input type="checkbox" id="cfg-editor-contd" ${u.editor?.continueDialogue!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Screenplay Font Style</label>
              <select id="cfg-editor-font" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Courier Prime 12pt" ${u.editor?.fontSize?.includes("Prime")?"selected":""}>Courier Prime (12pt)</option>
                <option value="Courier FinalDraft 12pt" ${u.editor?.fontSize?.includes("Final")?"selected":""}>Courier FinalDraft (12pt)</option>
                <option value="Courier New 11pt" ${u.editor?.fontSize?.includes("New")?"selected":""}>Courier Standard (11pt)</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Auto-save Frequency</label>
              <select id="cfg-editor-autosave" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Instant" ${u.editor?.autoSave==="Instant"?"selected":""}>Instant (300ms Keystroke Sync)</option>
                <option value="Every 15s" ${u.editor?.autoSave==="Every 15s"?"selected":""}>Every 15 Seconds</option>
                <option value="Every 60s" ${u.editor?.autoSave==="Every 60s"?"selected":""}>Every 60 Seconds</option>
              </select>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
            <button type="button" id="btn-save-cfg-editor" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Save Editor</button>
          </div>
        </div>
      </div>

      <!-- 2. Language Settings Modal -->
      <div id="modal-setting-language" class="settings-modal fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">translate</span>
              <h2 class="text-sm font-bold text-slate-900">Language & Transliteration</h2>
            </div>
            <button type="button" class="close-setting-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <div class="flex flex-col gap-2.5">
            <span class="text-[11px] font-semibold text-slate-600">Interface & Narrative Language</span>
            <div class="grid grid-cols-2 gap-2">
              ${[{id:"en",name:"English (US)",code:"English (US)"},{id:"ta",name:"Tamil (தமிழ்)",code:"Tamil"},{id:"tg",name:"Tanglish",code:"Tanglish"},{id:"hi",name:"Hindi (हिंदी)",code:"Hindi"}].map(d=>`
                <button type="button" class="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${u.language===d.code?"border-blue-600 bg-blue-50 text-blue-700":"border-slate-200 bg-white text-slate-800 hover:bg-slate-50"}" data-lang="${d.code}">
                  ${d.name}
                </button>
              `).join("")}
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 mt-1">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Phonetic Transliteration</span>
                <span class="text-[11px] text-slate-500">Auto convert phonetic typing to Tamil script</span>
              </div>
              <input type="checkbox" id="cfg-lang-translit" ${u.transliteration?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
            <button type="button" id="btn-save-cfg-language" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Apply Language</button>
          </div>
        </div>
      </div>

      <!-- 3. Appearance Settings Modal -->
      <div id="modal-setting-appearance" class="settings-modal fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">palette</span>
              <h2 class="text-sm font-bold text-slate-900">Appearance & Theme</h2>
            </div>
            <button type="button" class="close-setting-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-1.5">
              <span class="text-[11px] font-semibold text-slate-600">Theme Preference</span>
              <div class="grid grid-cols-3 gap-2">
                ${[{id:"Light",label:"Light",icon:"light_mode"},{id:"Dark",label:"Dark",icon:"dark_mode"},{id:"System",label:"System",icon:"devices"}].map(d=>`
                  <button type="button" class="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all ${u.appearance===d.id?"border-blue-600 bg-blue-50 text-blue-700":"border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}" data-theme="${d.id}">
                    <span class="material-symbols-outlined text-[18px]">${d.icon}</span>
                    <span>${d.label}</span>
                  </button>
                `).join("")}
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Display Font Scale</label>
              <select id="cfg-app-scale" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Compact" ${u.fontScale==="Compact"?"selected":""}>Compact (90%)</option>
                <option value="Normal" ${u.fontScale!=="Compact"&&u.fontScale!=="Large"?"selected":""}>Normal (100%)</option>
                <option value="Large" ${u.fontScale==="Large"?"selected":""}>Comfortable (110%)</option>
              </select>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
            <button type="button" id="btn-save-cfg-appearance" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Save Theme</button>
          </div>
        </div>
      </div>

      <!-- 4. Notifications Settings Modal -->
      <div id="modal-setting-notifications" class="settings-modal fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">notifications_active</span>
              <h2 class="text-sm font-bold text-slate-900">Notification Alerts</h2>
            </div>
            <button type="button" class="close-setting-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <div class="flex flex-col gap-2.5">
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Collaboration Invites</span>
                <span class="text-[11px] text-slate-500">Alert when invited to write or review</span>
              </div>
              <input type="checkbox" id="cfg-notif-invites" ${u.notifications?.invites!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Peer Edits & Revisions</span>
                <span class="text-[11px] text-slate-500">Real-time alerts when co-writers edit scenes</span>
              </div>
              <input type="checkbox" id="cfg-notif-edits" ${u.notifications?.edits!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Intelligence Diagnostics</span>
                <span class="text-[11px] text-slate-500">Notifications when vector analysis updates</span>
              </div>
              <input type="checkbox" id="cfg-notif-insights" ${u.notifications?.insights!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Draft Snapshot Milestones</span>
                <span class="text-[11px] text-slate-500">Alert on automated version backups</span>
              </div>
              <input type="checkbox" id="cfg-notif-milestones" ${u.notifications?.milestones!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
            <button type="button" id="btn-save-cfg-notifications" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Save Alerts</button>
          </div>
        </div>
      </div>

      <!-- 5. Intelligence Settings Modal -->
      <div id="modal-setting-intelligence" class="settings-modal fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">auto_awesome</span>
              <h2 class="text-sm font-bold text-slate-900">Intelligence Engine</h2>
            </div>
            <button type="button" class="close-setting-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <div class="flex flex-col gap-2.5">
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Deep Arc Diagnostics</span>
                <span class="text-[11px] text-slate-500">Track character want vs. need trajectories</span>
              </div>
              <input type="checkbox" id="cfg-intel-deep" ${u.intelligence?.deepAnalysis!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Proactive Pacing Warnings</span>
                <span class="text-[11px] text-slate-500">Detect narrative drag in Act II</span>
              </div>
              <input type="checkbox" id="cfg-intel-pacing" ${u.intelligence?.pacingAlerts!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Dialogue Subtext Scoring</span>
                <span class="text-[11px] text-slate-500">Evaluate voice distinctiveness</span>
              </div>
              <input type="checkbox" id="cfg-intel-dialogue" ${u.intelligence?.dialogueScoring!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex flex-col gap-1 mt-1">
              <label class="text-[11px] font-semibold text-slate-600">Model Sensitivity</label>
              <select id="cfg-intel-sensitivity" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Low" ${u.intelligence?.sensitivity==="Low"?"selected":""}>Low (Critical flags only)</option>
                <option value="Balanced" ${u.intelligence?.sensitivity!=="Low"&&u.intelligence?.sensitivity!=="High"?"selected":""}>Balanced (Recommended)</option>
                <option value="High" ${u.intelligence?.sensitivity==="High"?"selected":""}>High (Detailed micro-diagnostics)</option>
              </select>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
            <button type="button" id="btn-save-cfg-intelligence" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Save Engine</button>
          </div>
        </div>
      </div>

      <!-- 6. Privacy & Data Settings Modal -->
      <div id="modal-setting-privacy" class="settings-modal fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">security</span>
              <h2 class="text-sm font-bold text-slate-900">Privacy & Data Governance</h2>
            </div>
            <button type="button" class="close-setting-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Screenplay Copyright Watermark</span>
                <span class="text-[11px] text-slate-500">Inject copyright slug on exported PDFs</span>
              </div>
              <input type="checkbox" id="cfg-priv-watermark" ${u.privacy?.watermark!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Local Storage AES Encryption</span>
                <span class="text-[11px] text-slate-500">Encrypt local drafts in browser sandbox</span>
              </div>
              <input type="checkbox" id="cfg-priv-encrypt" ${u.privacy?.encryption!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="pt-2 flex flex-col gap-2 border-t border-slate-100">
              <button type="button" id="btn-export-portfolio-data" class="w-full py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center gap-1.5 border border-blue-200 transition-all cursor-pointer">
                <span class="material-symbols-outlined text-[17px]">download</span>
                <span>Export Complete Portfolio Archive (.JSON)</span>
              </button>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
            <button type="button" id="btn-save-cfg-privacy" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Save Privacy</button>
          </div>
        </div>
      </div>

      <!-- 7. Storage & Sync Settings Modal -->
      <div id="modal-setting-storage" class="settings-modal fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">cloud_done</span>
              <h2 class="text-sm font-bold text-slate-900">Storage & Cloud Sync</h2>
            </div>
            <button type="button" class="close-setting-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <div class="flex flex-col gap-3">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-slate-700">Local Sandbox Storage</span>
                <span class="text-[11px] font-mono font-bold text-blue-600" id="storage-quota-text">~148 KB / 5 MB</span>
              </div>
              <div class="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div class="h-full bg-blue-600 rounded-full w-[4%]"></div>
              </div>
              <span class="text-[10px] text-slate-400">Includes active scene blocks, versions & cached vectors</span>
            </div>
            <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span id="sync-status-msg">All screenplay drafts synchronized</span>
            </div>
            <div class="flex flex-col gap-2 pt-1">
              <button type="button" id="btn-force-cloud-sync" class="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">sync</span>
                <span>Force Cloud Re-sync</span>
              </button>
              <button type="button" id="btn-clear-local-cache" class="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">cleaning_services</span>
                <span>Optimize & Clean Local Cache</span>
              </button>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal w-full h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Close</button>
          </div>
        </div>
      </div>

    </main>

    ${ge("profile")}
  `}function kn(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=t||a.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=s||a.get("scriptId")||h.state.editorReturnScriptId||h.state.selectedScriptId||"chronicles-of-dust",l=n==="editor",i=l?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/workspace",r=document.getElementById("profile-back-to-editor-btn");r&&(r.onclick=T=>{T.preventDefault(),sessionStorage.removeItem("scriptora_from_editor"),e(i)});const u=document.getElementById("profile-bottom-return-btn");u&&(u.onclick=T=>{T.preventDefault(),sessionStorage.removeItem("scriptora_from_editor"),e(i)}),document.getElementById("stat-card-drafts")?.addEventListener("click",()=>{e("/workspace")}),document.getElementById("stat-card-coauthors")?.addEventListener("click",()=>{e(`/profile/collaborators${l?`?from=editor&scriptId=${o}`:""}`)}),document.getElementById("stat-card-health")?.addEventListener("click",()=>{e("/intelligence/dashboard")});const p=document.getElementById("settings-search-input");p&&(p.oninput=T=>{const D=T.target.value.toLowerCase().trim();let _=0;document.querySelectorAll("#settings-list .setting-item").forEach(se=>{const P=se.textContent.toLowerCase().includes(D);se.style.display=P?"flex":"none",P&&_++});const H=document.getElementById("no-settings-match");H&&(H.style.display=_===0?"block":"none")});function x(T){const D=`modal-setting-${T.replace("sheet-","")}`,_=document.getElementById(D);_&&_.classList.remove("hidden")}function c(){document.querySelectorAll(".settings-modal").forEach(T=>T.classList.add("hidden"))}document.querySelectorAll(".setting-item").forEach(T=>{T.onclick=()=>{const D=T.getAttribute("data-sheet");D&&x(D)}}),document.querySelectorAll(".close-setting-modal").forEach(T=>{T.onclick=c}),document.querySelectorAll(".settings-modal, #modal-edit-profile, #modal-security, #action-modal").forEach(T=>{T.onclick=D=>{D.target===T&&T.classList.add("hidden")}});function d(T){let D={};try{const H=localStorage.getItem("scriptora_settings");H&&(D=JSON.parse(H))}catch{}const _=T(D);return localStorage.setItem("scriptora_settings",JSON.stringify(_)),h.setState({settings:_}),ga(_).catch(()=>{}),_}const m=document.getElementById("btn-save-cfg-editor");m&&(m.onclick=()=>{const T=document.getElementById("cfg-editor-scenenums")?.checked??!0,D=document.getElementById("cfg-editor-autocap")?.checked??!0,_=document.getElementById("cfg-editor-contd")?.checked??!0,H=document.getElementById("cfg-editor-font")?.value||"Courier Prime 12pt",se=document.getElementById("cfg-editor-autosave")?.value||"Instant";d(P=>({...P,editor:{...P.editor||{},showSceneNumbers:T,autoCapitalize:D,continueDialogue:_,fontSize:H,autoSave:se}})),localStorage.setItem("scriptora_autosave",se==="Instant"?"true":"false");const he=document.getElementById("desc-sheet-editor");he&&(he.textContent=`Numbers: ${T?"On":"Off"} · Auto-save: ${se}`),c(),w("Editor preferences saved")});let f=h.state.settings?.language||"English (US)";document.querySelectorAll(".btn-lang-choice").forEach(T=>{T.onclick=()=>{f=T.getAttribute("data-lang"),document.querySelectorAll(".btn-lang-choice").forEach(D=>{D.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-slate-200 bg-white text-slate-800 hover:bg-slate-50"}),T.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const b=document.getElementById("btn-save-cfg-language");b&&(b.onclick=()=>{const T=document.getElementById("cfg-lang-translit")?.checked??!1;d(_=>({..._,language:f,transliteration:T}));const D=document.getElementById("desc-sheet-language");D&&(D.textContent=`${f}${T?" · Transliteration On":""}`),c(),w(`Language set to ${f}`)});let g=h.state.settings?.appearance||"Light";document.querySelectorAll(".btn-theme-choice").forEach(T=>{T.onclick=()=>{g=T.getAttribute("data-theme"),document.querySelectorAll(".btn-theme-choice").forEach(D=>{D.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}),T.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const E=document.getElementById("btn-save-cfg-appearance");E&&(E.onclick=()=>{const T=document.getElementById("cfg-app-scale")?.value||"Normal";d(_=>({..._,appearance:g,fontScale:T})),g==="Dark"?(document.documentElement.classList.add("dark"),localStorage.setItem("scriptora_theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("scriptora_theme","light"));const D=document.getElementById("desc-sheet-appearance");D&&(D.textContent=`${g} · Scale: ${T}`),c(),w(`Appearance updated: ${g}`)});const A=document.getElementById("btn-save-cfg-notifications");A&&(A.onclick=()=>{const T=document.getElementById("cfg-notif-invites")?.checked??!0,D=document.getElementById("cfg-notif-edits")?.checked??!0,_=document.getElementById("cfg-notif-insights")?.checked??!0,H=document.getElementById("cfg-notif-milestones")?.checked??!0,se={invites:T,edits:D,insights:_,milestones:H};d(N=>({...N,notifications:se}));const he=Object.values(se).filter(Boolean).length,P=document.getElementById("desc-sheet-notifications");P&&(P.textContent=`${he} alerts active`),c(),w("Notification preferences updated")});const S=document.getElementById("btn-save-cfg-intelligence");S&&(S.onclick=()=>{const T=document.getElementById("cfg-intel-deep")?.checked??!0,D=document.getElementById("cfg-intel-pacing")?.checked??!0,_=document.getElementById("cfg-intel-dialogue")?.checked??!0,H=document.getElementById("cfg-intel-sensitivity")?.value||"Balanced";d(he=>({...he,intelligence:{deepAnalysis:T,pacingAlerts:D,dialogueScoring:_,sensitivity:H}}));const se=document.getElementById("desc-sheet-intelligence");se&&(se.textContent=`${T?"Deep Arc Diagnostics":"Standard"} · ${H}`),c(),w("Intelligence engine calibrated")});const I=document.getElementById("btn-save-cfg-privacy");I&&(I.onclick=()=>{const T=document.getElementById("cfg-priv-watermark")?.checked??!0,D=document.getElementById("cfg-priv-encrypt")?.checked??!0;d(H=>({...H,privacy:{watermark:T,encryption:D}}));const _=document.getElementById("desc-sheet-privacy");_&&(_.textContent=`${T?"Watermark On":"Standard"} · Local AES Encrypted`),c(),w("Privacy governance updated")});const y=document.getElementById("btn-export-portfolio-data");y&&(y.onclick=()=>{const T={exportedAt:new Date().toISOString(),user:h.state.currentUser,scripts:h.state.scripts,screenplay:h.state.screenplay,settings:h.state.settings},D=new Blob([JSON.stringify(T,null,2)],{type:"application/json"}),_=URL.createObjectURL(D),H=document.createElement("a");H.href=_,H.download=`scriptora_portfolio_backup_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(H),H.click(),document.body.removeChild(H),URL.revokeObjectURL(_),w("Portfolio archive downloaded successfully")});const k=document.getElementById("btn-force-cloud-sync");k&&(k.onclick=()=>{k.disabled=!0,k.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span><span>Synchronizing...</span>',setTimeout(()=>{k.disabled=!1,k.innerHTML='<span class="material-symbols-outlined text-[16px]">sync</span><span>Force Cloud Re-sync</span>';const T=document.getElementById("sync-status-msg");T&&(T.textContent=`Synchronized at ${new Date().toLocaleTimeString()}`),w("All screenplay drafts synchronized with cloud")},700)});const R=document.getElementById("btn-clear-local-cache");R&&(R.onclick=()=>{sessionStorage.clear(),w("Temporary cache and diagnostic buffers cleared")});const K=document.getElementById("modal-edit-profile"),v=document.getElementById("trigger-modal-email"),L=document.getElementById("edit-avatar-btn"),oe=document.getElementById("avatar-container-btn"),O=document.getElementById("form-update-profile"),j=document.getElementById("local-photo-input"),ae=document.getElementById("btn-modal-upload-photo"),M=document.getElementById("btn-modal-remove-photo");function ee(T){T?K?.classList.remove("hidden"):K?.classList.add("hidden")}v&&(v.onclick=()=>ee(!0)),oe&&(oe.onclick=()=>ee(!0)),L&&(L.onclick=T=>{T.stopPropagation(),j&&j.click()}),ae&&(ae.onclick=()=>{j&&j.click()}),document.querySelectorAll(".close-profile-modal").forEach(T=>T.onclick=()=>ee(!1)),j&&(j.onchange=T=>{const D=T.target.files?.[0];if(!D)return;if(!D.type.startsWith("image/")){w("Please select a valid image file (PNG, JPG, WEBP)");return}const _=new FileReader;_.onload=H=>{const se=new Image;se.onload=()=>{const he=document.createElement("canvas"),P=360;let N=se.width,F=se.height;N>F?N>P&&(F=Math.round(F*P/N),N=P):F>P&&(N=Math.round(N*P/F),F=P),he.width=N,he.height=F,he.getContext("2d").drawImage(se,0,0,N,F);const z=he.toDataURL("image/jpeg",.88),me={...h.state.currentUser||user,avatarUrl:z};h.setState({currentUser:me}),localStorage.setItem("scriptora_user",JSON.stringify(me)),Wt({avatarUrl:z}).catch(()=>{});const ie=document.getElementById("user-avatar-circle");ie&&(ie.innerHTML=`<img id="user-avatar-img" src="${z}" class="w-full h-full object-cover" alt="Profile" />`);const re=document.getElementById("modal-preview-avatar");re&&(re.innerHTML=`<img id="modal-preview-img" src="${z}" class="w-full h-full object-cover" alt="Preview" />`),M&&M.classList.remove("hidden");const ce=document.getElementById("header-profile-btn");ce&&(ce.innerHTML=`<img src="${z}" class="w-full h-full object-cover" alt="Profile" />`),w("Profile picture updated successfully!")},se.src=H.target.result},_.readAsDataURL(D),j.value=""}),M&&(M.onclick=()=>{const D={...h.state.currentUser||user,avatarUrl:null};h.setState({currentUser:D}),localStorage.setItem("scriptora_user",JSON.stringify(D)),Wt({avatarUrl:null}).catch(()=>{});const _=D.initials||"AK",H=document.getElementById("user-avatar-circle");H&&(H.innerHTML=`<span id="user-avatar-initials">${_}</span>`);const se=document.getElementById("modal-preview-avatar");se&&(se.innerHTML=`<span id="modal-preview-initials">${_}</span>`),M.classList.add("hidden");const he=document.getElementById("header-profile-btn");he&&(he.innerHTML=`<span>${_}</span>`),w("Profile photo removed")});let xe=user.avatarColor||"bg-blue-600";document.querySelectorAll(".prof-avatar-color-btn").forEach(T=>{T.onclick=()=>{xe=T.getAttribute("data-color"),document.querySelectorAll(".prof-avatar-color-btn").forEach(D=>D.classList.remove("ring-2","ring-offset-2","ring-blue-600")),T.classList.add("ring-2","ring-offset-2","ring-blue-600")}}),O&&(O.onsubmit=async T=>{T.preventDefault();const D=document.getElementById("prof-input-name").value.trim(),_=document.getElementById("prof-input-headline").value.trim(),H=document.getElementById("prof-input-email").value.trim(),se=D.split(/\s+/),he=(se[0]?.[0]||"A")+(se[1]?.[0]||""),P={...h.state.currentUser||user,name:D,displayName:D,headline:_,email:H,initials:he.toUpperCase(),avatarColor:xe};await Wt(P),h.setState({currentUser:P});const N=document.getElementById("profile-display-name"),F=document.getElementById("profile-display-headline"),le=document.getElementById("profile-display-email"),z=document.getElementById("user-avatar-circle");N&&(N.textContent=D),F&&(F.textContent=_),le&&(le.textContent=H),z&&!P.avatarUrl&&(z.innerHTML=`<span id="user-avatar-initials">${he.toUpperCase()}</span>`,z.className=`w-20 h-20 rounded-full ${xe} text-white font-bold text-2xl flex items-center justify-center shadow-md overflow-hidden transition-transform active:scale-95 border-2 border-white ring-2 ring-slate-100`),ee(!1),w("Profile and account updated successfully")});const W=document.getElementById("modal-security"),te=document.getElementById("trigger-modal-password"),$=document.getElementById("form-update-pw");function Y(T){T?W?.classList.remove("hidden"):W?.classList.add("hidden")}te&&(te.onclick=()=>Y(!0)),document.querySelectorAll(".close-security-modal").forEach(T=>T.onclick=()=>Y(!1)),document.querySelectorAll(".btn-toggle-pw").forEach(T=>{T.onclick=()=>{const D=T.getAttribute("data-target"),_=document.getElementById(D),H=T.querySelector(".material-symbols-outlined");_&&(_.type==="password"?(_.type="text",H&&(H.textContent="visibility_off")):(_.type="password",H&&(H.textContent="visibility")))}}),$&&($.onsubmit=T=>{T.preventDefault(),document.getElementById("pw-input-current")?.value;const D=document.getElementById("pw-input-new")?.value,_=document.getElementById("pw-input-confirm")?.value,H=document.getElementById("pw-error-text");if(!D||D.length<6){H&&(H.textContent="New password must be at least 6 characters long.",H.classList.remove("hidden"));return}if(D!==_){H&&(H.textContent="New password and confirmation do not match.",H.classList.remove("hidden"));return}H&&H.classList.add("hidden"),Y(!1),w("Password updated securely"),$.reset()});const Ue=document.getElementById("action-modal"),Z=document.getElementById("action-modal-title"),Fe=document.getElementById("action-modal-desc"),Ne=document.getElementById("action-modal-icon"),qe=document.getElementById("action-modal-icon-box"),Be=document.getElementById("action-modal-confirm"),Oe=document.getElementById("action-modal-cancel");let lt="signout";function Nt(T){lt=T,T==="signout"?(Z.textContent="Sign Out",Fe.textContent="Are you sure you want to end your active session on this device?",Ne.textContent="logout",qe.className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center",Be.className="flex-1 h-10 px-4 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 cursor-pointer",Be.textContent="Sign Out"):(Z.textContent="Delete Account",Fe.textContent="This action will permanently delete your portfolio, scripts, and collaborator access. This cannot be undone.",Ne.textContent="warning",qe.className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center",Be.className="flex-1 h-10 px-4 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer",Be.textContent="Delete Forever"),Ue?.classList.remove("hidden")}document.getElementById("btn-trigger-signout")?.addEventListener("click",()=>Nt("signout")),document.getElementById("btn-trigger-delete-acc")?.addEventListener("click",()=>Nt("delete")),Oe&&(Oe.onclick=()=>Ue?.classList.add("hidden")),Be&&(Be.onclick=async()=>{Ue?.classList.add("hidden"),lt==="signout"?(await Xt(),h.setState({currentUser:null}),w("Signed out of Scriptora"),e("/auth")):(await Xt(),h.setState({currentUser:null,scripts:[]}),w("Account deleted"),e("/auth"))})}function Cn(e=null,t=null){const s=new URLSearchParams(window.location.search||""),a=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),n=t||s.get("scriptId")||h.state.editorReturnScriptId||h.state.selectedScriptId||"chronicles-of-dust",o=a==="editor",l=o?sessionStorage.getItem("scriptora_editor_return")||`/editor/${n}`:"/profile",i=o?"Back to Editor":"Back to Profile",r=h.state.scripts.find(u=>u.id===n)||h.state.scripts[0]||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",joinCode:"A7K9-XP42"};return`
    ${be("Profile","Collaborators")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
      <div class="flex flex-col w-full max-w-lg mx-auto px-4 pt-2.5 pb-8 space-y-5 fade-in">
        
        <!-- Back Navigation & Title -->
        <div class="flex flex-col gap-1">
          <a href="${l}" id="collab-back-btn" class="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors text-xs font-semibold uppercase tracking-wider no-underline w-fit">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>${i}</span>
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
                <span class="font-heading text-sm font-bold text-slate-900 truncate" id="currentProjectTitle">${r.title} (${r.draft||"Draft 4.2"})</span>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span class="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium" id="collab-count-badge">Team Access</span>
              <span class="material-symbols-outlined text-slate-400 text-[20px]" id="projectChevron">expand_more</span>
            </div>
          </button>

          <!-- Project Dropdown Popover -->
          <div class="hidden absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-30 overflow-hidden py-1" id="projectDropdown">
            ${h.state.scripts.map(u=>`
              <button class="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors switch-script-opt" data-id="${u.id}">
                <div class="flex flex-col">
                  <span class="text-xs font-semibold text-slate-900">${u.title}</span>
                  <span class="text-[10px] text-slate-500">${u.format||"Feature"} · ${u.draft||"Draft 1.0"}</span>
                </div>
                ${u.id===r.id?'<span class="material-symbols-outlined text-blue-600 text-[16px]">check</span>':""}
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
                <span id="displayJoinCode" class="font-mono font-bold text-base text-blue-600 tracking-widest mt-0.5">${r.joinCode||"A7K9-XP42"}</span>
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
              Anyone with this join code can request Editor or Viewer access to "${r.title}".
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

        ${o?`
          <div class="pt-2">
            <a href="${l}" id="collab-bottom-return-btn" class="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center gap-2 border border-blue-200 shadow-2xs no-underline transition-all active:scale-98">
              <span class="material-symbols-outlined text-[18px]">edit_note</span>
              <span>Return to Editor (${r.title||"Screenplay"})</span>
            </a>
          </div>
        `:""}

      </div>
    </main>

    ${ge("profile")}
  `}function En(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=t||a.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=s||a.get("scriptId")||h.state.editorReturnScriptId||h.state.selectedScriptId||"chronicles-of-dust",l=n==="editor",i=l?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/profile",r=document.getElementById("collab-back-btn");r&&(r.onclick=O=>{O.preventDefault(),l&&sessionStorage.removeItem("scriptora_from_editor"),e(i)});const u=document.getElementById("collab-bottom-return-btn");u&&(u.onclick=O=>{O.preventDefault(),l&&sessionStorage.removeItem("scriptora_from_editor"),e(i)});let p="A7K9-XP42";async function x(){const O=await ca(o),j=document.getElementById("collaborators-list");if(j){if(O.length===0){j.innerHTML='<div class="p-4 text-center text-xs text-slate-400">No external collaborators yet. Share your join code to invite teammates.</div>';return}j.innerHTML=O.map(ae=>`
      <div class="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
        <div class="flex items-center gap-3 min-w-0 pr-2">
          <div class="w-9 h-9 rounded-full ${ae.avatarBg||"bg-blue-100 text-blue-700"} flex items-center justify-center font-bold text-xs shrink-0">
            ${ae.initials}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-slate-900 truncate">${ae.name}</span>
            <span class="text-[11px] text-slate-500 truncate">${ae.email}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">${ae.role}</span>
          <button class="remove-collab-btn text-slate-400 hover:text-red-600 p-1" data-id="${ae.id}" title="Remove access">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".remove-collab-btn").forEach(ae=>{ae.onclick=async()=>{const M=ae.getAttribute("data-id");confirm("Remove collaborator access for this user?")&&(await pa(o,M),w("Collaborator access removed"),x())}})}}x();const c=document.getElementById("projectSelectBtn"),d=document.getElementById("projectDropdown");c&&(c.onclick=()=>d?.classList.toggle("hidden")),document.querySelectorAll(".switch-script-opt").forEach(O=>{O.onclick=()=>{const j=O.getAttribute("data-id");h.selectScript(j),d?.classList.add("hidden"),e(`/profile/collaborators${l?`?from=editor&scriptId=${j}`:""}`)}});const m=document.getElementById("openInviteBtn"),f=document.getElementById("closeInviteBtn"),b=document.getElementById("inviteCard"),g=document.getElementById("sendInviteBtn");m&&(m.onclick=()=>b?.classList.remove("hidden")),f&&(f.onclick=()=>b?.classList.add("hidden")),g&&(g.onclick=async()=>{const O=document.getElementById("inviteEmailInput")?.value.trim(),j=document.querySelector('input[name="inviteRole"]:checked')?.value||"editor";O&&(await da(o,{email:O,role:j}),w(`Invited ${O} as ${j}`),b?.classList.add("hidden"),x())});const E=document.getElementById("tabGenCodeBtn"),A=document.getElementById("tabEnterCodeBtn"),S=document.getElementById("paneGenerateCode"),I=document.getElementById("paneEnterCode");E&&(E.onclick=()=>{E.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",A.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",S?.classList.remove("hidden"),I?.classList.add("hidden")}),A&&(A.onclick=()=>{A.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",E.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",I?.classList.remove("hidden"),S?.classList.add("hidden")});const y=document.getElementById("copyJoinCodeBtn"),k=document.getElementById("copyJoinCodeLabel");y&&(y.onclick=()=>{const O=document.getElementById("displayJoinCode")?.textContent||p;navigator.clipboard?.writeText(O),k.textContent="Copied!",setTimeout(()=>{k.textContent="Copy"},1800),w(`Copied code: ${O}`)});const R=document.getElementById("regenJoinCodeBtn");R&&(R.onclick=async()=>{const O=await ua(o);p=O;const j=document.getElementById("displayJoinCode");j&&(j.textContent=O),w(`Generated new join code: ${O}`)});const K=document.getElementById("verifyCodeBtn"),v=document.getElementById("joinCodeInput"),L=document.getElementById("joinCodeResultCard"),oe=document.getElementById("confirmJoinScriptBtn");v&&(v.oninput=O=>{let j=O.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"");j.length>4&&(j=j.slice(0,4)+"-"+j.slice(4,8)),O.target.value=j}),K&&v&&(K.onclick=async()=>{const O=v.value.trim();if(!O)return;K.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>';const j=await xa(O);K.innerHTML="<span>Verify</span>",j.valid?(L?.classList.remove("hidden"),document.getElementById("verifiedScriptTitle").textContent=j.script.title,document.getElementById("verifiedScriptFormat").textContent=`${j.script.format} · ${j.script.pages} pages`,w("Valid join code")):(L?.classList.add("hidden"),w("Invalid or expired join code","error"))}),oe&&v&&(oe.onclick=async()=>{const O=v.value.trim();await ma(O),w("Successfully joined screenplay workspace!"),e("/workspace")})}function An(){return h.state.currentUser?.initials,`
    <div class="flex flex-col min-h-screen bg-surface w-full relative">
      <!-- Main Notifications Stream with contextual subnav bar -->
      <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
        <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-1 space-y-4 fade-in">
          
          <!-- Contextual Sub-bar: Back Navigation and Mark All Read Action -->
          <div class="flex items-center justify-between pb-2 border-b border-slate-200/70">
            <div class="flex items-center gap-2">
              <button aria-label="Go back" id="btn-back-notif" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors text-xs font-semibold shrink-0">
                <span class="material-symbols-outlined text-[17px]">arrow_back</span>
                <span>Back</span>
              </button>
              <span class="font-heading font-bold text-sm text-slate-800">Notifications Activity</span>
            </div>

            <button id="btn-mark-all-read" class="px-2.5 py-1 text-xs text-blue-600 font-semibold hover:bg-blue-50 rounded-lg active:scale-95 transition-all flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]">done_all</span>
              <span>Mark all read</span>
            </button>
          </div>
          
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
  `}function Tn(e){const t=document.getElementById("btn-back-notif");t&&(t.onclick=()=>{const x=h.getPreviousRoute("/workspace");e(x)});let s="all",a="normal",n=[];async function o(){const x=document.getElementById("notif-feed-container");if(!x)return;if(a==="loading"){x.innerHTML=`
        <div class="space-y-3 animate-pulse">
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
        </div>
      `;return}if(a==="error"){x.innerHTML=`
        <div class="p-6 bg-white border border-red-200 rounded-2xl flex flex-col items-center text-center gap-2">
          <span class="material-symbols-outlined text-3xl text-red-500">wifi_off</span>
          <h3 class="font-bold text-sm text-slate-900">Sync Connection Lost</h3>
          <p class="text-xs text-slate-500 max-w-xs">Unable to refresh notification stream. Please check network connection.</p>
          <button id="btn-retry-sync" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-xs hover:bg-blue-700">
            Retry Connection
          </button>
        </div>
      `,document.getElementById("btn-retry-sync")?.addEventListener("click",()=>{a="normal",o()});return}if(n=(await Ts()).notifications||[],a==="empty"||s==="unread"&&n.filter(E=>E.unread).length===0){x.innerHTML=`
        <div class="p-8 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center text-center gap-2">
          <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <h3 class="font-bold text-sm text-slate-900">You’re all caught up!</h3>
          <p class="text-xs text-slate-500 max-w-xs">No pending notifications or requests requiring your review.</p>
        </div>
      `;return}const d=n.filter(E=>E.unread).length;document.getElementById("badge-all-count").textContent=n.length,document.getElementById("badge-unread-count").textContent=d,h.setState({unreadNotifications:d});let m=n;s==="unread"&&(m=m.filter(E=>E.unread));const f=m.filter(E=>E.group==="today"),b=m.filter(E=>E.group!=="today");function g(E,A){return A.length===0?"":`
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-xs font-bold text-slate-400 tracking-wider uppercase font-heading">${E}</h2>
          </div>
          <div class="flex flex-col gap-2">
            ${A.map(S=>`
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
                    ${(S.tags||[]).map(I=>`<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">${I}</span>`).join("")}
                    <span class="text-blue-600 text-[11px] font-semibold ml-auto">${S.actionLabel||"View →"}</span>
                  </div>
                </div>
                ${S.unread?'<div class="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1"></div>':""}
              </div>
            `).join("")}
          </div>
        </div>
      `}x.innerHTML=g("Today",f)+g("Earlier",b),document.querySelectorAll(".notif-row").forEach(E=>{E.onclick=async()=>{const A=parseInt(E.getAttribute("data-id")),S=E.getAttribute("data-route");await fa(A),await h.refreshNotifications(),S?e(S):o()}})}o();const l=document.getElementById("filter-all-btn"),i=document.getElementById("filter-unread-btn");l&&(l.onclick=()=>{s="all",l.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",i.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",o()}),i&&(i.onclick=()=>{s="unread",i.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",l.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",o()});const r=document.getElementById("btn-mark-all-read");r&&(r.onclick=async()=>{await ba(),await h.refreshNotifications(),w("All notifications marked as read"),o()});const u=document.getElementById("btn-toggle-sim"),p=document.getElementById("sim-menu-dropdown");u&&(u.onclick=()=>p?.classList.toggle("hidden")),document.querySelectorAll(".sim-opt").forEach(x=>{x.onclick=()=>{a=x.getAttribute("data-state"),p?.classList.add("hidden"),o(),w(`Simulating ${a} state`)}})}function $n(e=null,t=null){const s=new URLSearchParams(window.location.search||""),a=e||s.get("from"),n=t||s.get("scriptId")||h.state.selectedScriptId||"chronicles-of-dust",o=a==="editor"||a&&a.startsWith("/editor"),l=o?sessionStorage.getItem("scriptora_prod_return")||(a&&a.startsWith("/editor")?a:`/editor/${n}`):a&&a.startsWith("/")?a:"/workspace",i=o?"Editor":a?.includes("/intelligence")?"Intelligence":"Workspace",r=h.state.scripts?.find(c=>c.id===n)||h.state.scripts?.[0]||{id:"chronicles-of-dust",draft:"Draft 4.2"},p=(localStorage.getItem("scriptora_prod_mode")||"simple")==="advanced",x=localStorage.getItem("scriptora_prod_role")||"Owner";return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      <!-- Standard App Header -->
      ${be("Pre-Production","Production Workspace & Tools")}

      <!-- Main Workspace Container -->
      <main class="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3.5 fade-in">
        
        <!-- Clean Unified Header Row (Back + Title + Mode Switch) -->
        <div class="flex items-center justify-between gap-2 py-1.5 border-b border-slate-200/70">
          <div class="flex items-center gap-2 min-w-0">
            <a href="${l}" class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors text-xs font-medium shrink-0" id="prod-back-nav" title="Back to ${i}">
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
              <span class="truncate">${i}</span>
            </a>
            <h1 class="font-heading font-bold text-sm text-slate-900 truncate">Production Studio</h1>
          </div>

          <!-- Mode Toggle: Simple vs Advanced (Preserves State) -->
          <div class="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80 shadow-2xs shrink-0">
            <button id="toggle-mode-simple" class="px-2.5 py-0.5 text-xs font-medium rounded-lg transition-all ${p?"text-slate-600 hover:text-slate-900":"bg-white text-blue-700 shadow-2xs font-semibold"}">
              Simple
            </button>
            <button id="toggle-mode-advanced" class="px-2.5 py-0.5 text-xs font-medium rounded-lg transition-all ${p?"bg-white text-blue-700 shadow-2xs font-semibold":"text-slate-600 hover:text-slate-900"}">
              Advanced
            </button>
          </div>
        </div>

        <!-- 1. Screenplay & Source Version Selector Card (Clean, Uncluttered, No Redundant Project Panel) -->
        <section class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <span class="material-symbols-outlined text-[20px]">movie_creation</span>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <select id="prod-script-select" class="font-heading font-bold text-sm text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none cursor-pointer pr-1 truncate">
                  <option value="chronicles-of-dust" ${r.id==="chronicles-of-dust"?"selected":""}>Chronicles of Dust (Feature)</option>
                  <option value="the-neon-horizon" ${r.id==="the-neon-horizon"?"selected":""}>The Neon Horizon (Pilot)</option>
                </select>
              </div>
              <div class="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-500">
                <span class="flex items-center gap-1 text-emerald-700 font-medium" id="prod-pinned-version-badge">
                  <span class="material-symbols-outlined text-[13px]">lock</span>
                  <span id="pinned-version-label">${r.draft||"Draft 4.2"} (Pinned)</span>
                </span>
                <span>•</span>
                <span>18 Scenes</span>
                <span>•</span>
                <span>78 Elements</span>
              </div>
            </div>
          </div>

          <!-- Functional Role Selector -->
          <div class="flex items-center gap-1.5 self-start sm:self-auto shrink-0 text-xs">
            <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Role:</span>
            <select id="prod-role-select" class="text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none cursor-pointer">
              <option value="Owner" ${x==="Owner"?"selected":""}>Owner</option>
              <option value="Director" ${x==="Director"?"selected":""}>Director</option>
              <option value="Assistant Director" ${x==="Assistant Director"?"selected":""}>Assistant Director</option>
              <option value="Production" ${x==="Production"?"selected":""}>Production</option>
              <option value="Department Member" ${x==="Department Member"?"selected":""}>Department Lead</option>
              <option value="Viewer" ${x==="Viewer"?"selected":""}>Viewer</option>
            </select>
          </div>
        </section>

        <!-- Source Version Staleness Warning Banner (Preserves Source Integrity) -->
        <div id="source-version-alert" class="hidden bg-amber-50 border border-amber-200/90 rounded-2xl p-3 flex items-start justify-between gap-3 shadow-2xs">
          <div class="flex items-start gap-2">
            <span class="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">warning</span>
            <div class="text-xs text-amber-900 leading-relaxed">
              <span class="font-bold">Source Version Out of Sync:</span> Screenplay draft updated. Production records remain pinned to <span class="font-semibold underline" id="alert-pinned-ver">Draft 4.2</span>.
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button id="btn-repin-source" class="px-2 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] transition-colors">
              Update Pin
            </button>
            <button id="btn-dismiss-staleness" class="px-2 py-1 rounded-lg bg-white border border-amber-200 text-amber-800 text-[11px] font-medium hover:bg-amber-100/50">
              Keep Pin
            </button>
          </div>
        </div>

        <!-- 2. Essential Production Tools (Prominent 2-Column Mobile Grid, Consistent Professional Cards) -->
        <section class="flex flex-col gap-2.5">
          <div class="flex items-center justify-between">
            <h2 class="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[18px] text-blue-600">tune</span>
              <span>Essential Production Tools</span>
            </h2>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            <!-- Tool 1: Call Sheets -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between cursor-pointer group" data-tool="call-sheets">
              <div>
                <div class="flex items-center justify-between mb-2.5">
                  <div class="w-9 h-9 rounded-xl bg-blue-50/80 text-blue-700 flex items-center justify-center border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[19px]">assignment</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">2 Active</span>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">Call Sheets</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Prepare and manage daily shooting call sheets.</p>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Call Sheets</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 2: Dialogue Sheets & Actor Sides -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between cursor-pointer group" data-tool="dialogue-sheets">
              <div>
                <div class="flex items-center justify-between mb-2.5">
                  <div class="w-9 h-9 rounded-xl bg-blue-50/80 text-blue-700 flex items-center justify-center border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[19px]">record_voice_over</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">Sc 18 Ready</span>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">Dialogue Sheets & Sides</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Create character-wise dialogue sheets and actor sides.</p>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Actor Sides</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 3: Shooting Schedule -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between cursor-pointer group" data-tool="shooting-schedule">
              <div>
                <div class="flex items-center justify-between mb-2.5">
                  <div class="w-9 h-9 rounded-xl bg-blue-50/80 text-blue-700 flex items-center justify-center border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[19px]">calendar_view_week</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">14 Days</span>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">Shooting Schedule</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Plan scenes across shooting days.</p>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Stripboard</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 4: Script Breakdown -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between cursor-pointer group" data-tool="script-breakdown">
              <div>
                <div class="flex items-center justify-between mb-2.5">
                  <div class="w-9 h-9 rounded-xl bg-blue-50/80 text-blue-700 flex items-center justify-center border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[19px]">dataset</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">78 Items</span>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">Script Breakdown</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Review and organise production requirements by scene.</p>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Breakdown</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

          </div>
        </section>

        <!-- 3. Production Modules & Creative Planning (2-Column Grid on Mobile, Restrained Neutral Surfaces) -->
        <section class="flex flex-col gap-2.5">
          <div class="flex items-center justify-between">
            <h2 class="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[18px] text-blue-600">dashboard_customize</span>
              <span>Production Modules & Creative Planning</span>
            </h2>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            
            <!-- Secondary 1: Storyboard Studio -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between cursor-pointer group" data-tool="storyboard-studio">
              <div>
                <div class="flex items-center justify-between mb-2.5">
                  <div class="w-9 h-9 rounded-xl bg-blue-50/80 text-blue-700 flex items-center justify-center border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[19px]">art_track</span>
                  </div>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">Storyboard Studio</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Create and organise visual shot sequences.</p>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Shot Board</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Secondary 2: Scene Hub -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between cursor-pointer group" data-tool="scene-hub">
              <div>
                <div class="flex items-center justify-between mb-2.5">
                  <div class="w-9 h-9 rounded-xl bg-blue-50/80 text-blue-700 flex items-center justify-center border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[19px]">hub</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">18 Scenes</span>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">Scene Hub</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Track scene requirements and shooting complexity.</p>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>18 Scenes</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Secondary 3: Production Documents Workspace -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between cursor-pointer group" data-tool="production-documents">
              <div>
                <div class="flex items-center justify-between mb-2.5">
                  <div class="w-9 h-9 rounded-xl bg-blue-50/80 text-blue-700 flex items-center justify-center border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[19px]">description</span>
                  </div>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">Documents</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Generate and manage production documents.</p>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Documents</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Secondary 4: Production Changes -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between cursor-pointer group" data-tool="change-proposals">
              <div>
                <div class="flex items-center justify-between mb-2.5">
                  <div class="w-9 h-9 rounded-xl bg-blue-50/80 text-blue-700 flex items-center justify-center border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[19px]">rule</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold" id="pending-proposals-count">2 Pending</span>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">Production Changes</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Review proposed production changes.</p>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Review Changes</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Secondary 5: Readiness & Validation -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between cursor-pointer group" data-tool="production-readiness">
              <div>
                <div class="flex items-center justify-between mb-2.5">
                  <div class="w-9 h-9 rounded-xl bg-blue-50/80 text-blue-700 flex items-center justify-center border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[19px]">fact_check</span>
                  </div>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">Readiness Checklist</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Verify departmental sign-offs and shoot readiness.</p>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Readiness</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Secondary 6: History & Version Timeline -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between cursor-pointer group" data-tool="production-history">
              <div>
                <div class="flex items-center justify-between mb-2.5">
                  <div class="w-9 h-9 rounded-xl bg-blue-50/80 text-blue-700 flex items-center justify-center border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[19px]">history</span>
                  </div>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">History</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Track edits, approvals and version changes.</p>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Timeline</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Secondary 7: Resource Directory -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between cursor-pointer group" data-tool="resource-directory">
              <div>
                <div class="flex items-center justify-between mb-2.5">
                  <div class="w-9 h-9 rounded-xl bg-blue-50/80 text-blue-700 flex items-center justify-center border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[19px]">contact_phone</span>
                  </div>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">Resource Directory</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Manage cast, crew and production vendor contacts.</p>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Directory</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

          </div>
        </section>

        <!-- 4. Advanced Mode Extended Panels (Shown when Advanced Mode is Active) -->
        <div id="advanced-panels" class="${p?"":"hidden"} flex flex-col gap-4">
          
          <!-- Advanced Metrics Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shoot Window</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">14 Days</div>
              <span class="text-[11px] text-slate-500">Oct 24 – Nov 08</span>
            </div>
            <div class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Locations</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">24 Practical</div>
              <span class="text-[11px] text-slate-500">14 Int · 10 Ext</span>
            </div>
            <div class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cast & Extras</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">18 Roles</div>
              <span class="text-[11px] text-slate-500">9 Speaking Roles</span>
            </div>
            <div class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Production Health</span>
              <div class="font-heading font-bold text-lg text-emerald-600 mt-0.5">92% Ready</div>
              <span class="text-[11px] text-slate-500">Zero Unresolved Blocks</span>
            </div>
          </div>

          <!-- Pending Change Proposals Workflow Queue -->
          <section class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-amber-600">checklist</span>
                <h3 class="font-heading font-bold text-sm text-slate-900">Change Proposal Queue</h3>
                <span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold">Awaiting Owner Review</span>
              </div>
              <button id="btn-create-proposal-trigger" class="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px]">add</span>
                <span>Submit Change Proposal</span>
              </button>
            </div>

            <div id="proposals-list" class="flex flex-col gap-2.5">
              <!-- Rendered via JS -->
            </div>
          </section>

          <!-- Production Audit Trail Timeline -->
          <section class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-blue-600">history_edu</span>
                <h3 class="font-heading font-bold text-sm text-slate-900">Audit Trail & Timeline</h3>
              </div>
              <span class="text-[11px] text-slate-400 font-mono">Immutable Log</span>
            </div>

            <div id="audit-trail-list" class="flex flex-col gap-2">
              <!-- Rendered via JS -->
            </div>
          </section>

        </div>

      </main>

      <!-- Bottom Navigation with Pre-Production Active -->
      ${ge("production")}

      <!-- Shared Inspector / Tool Detail Modal -->
      <div id="prod-tool-modal" class="hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div class="flex items-center gap-2.5">
              <div id="modal-icon-container" class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px]" id="modal-tool-icon">tune</span>
              </div>
              <div>
                <h3 class="font-heading font-bold text-sm text-slate-900" id="modal-tool-title">Tool Inspector</h3>
                <span class="text-[11px] text-slate-500" id="modal-tool-subtitle">Draft 4.2 Approved Context</span>
              </div>
            </div>
            <button id="modal-tool-close" class="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div class="p-5 overflow-y-auto flex-1 flex flex-col gap-3 text-xs text-slate-600" id="modal-tool-body">
            <!-- Dynamic Content -->
          </div>

          <div class="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2" id="modal-tool-footer">
            <button id="modal-tool-done" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs">
              Close
            </button>
          </div>
        </div>
      </div>

    </div>
  `}async function Pn(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=s||a.get("scriptId")||h.state.selectedScriptId||"chronicles-of-dust",o=await Ht(n),l=await at(n),i=await jt(n),r=h.state.scripts?.find(y=>y.id===n);if(r&&r.draft&&r.draft!==o.pinnedSourceVersion){const y=document.getElementById("source-version-alert"),k=document.getElementById("alert-pinned-ver");y&&y.classList.remove("hidden"),k&&(k.textContent=o.pinnedSourceVersion)}Ot(l,o.userRole,n),as(i);const u=document.getElementById("toggle-mode-simple"),p=document.getElementById("toggle-mode-advanced"),x=document.getElementById("advanced-panels");function c(y){localStorage.setItem("scriptora_prod_mode",y),bs(n,{mode:y}),y==="advanced"?(x?.classList.remove("hidden"),p?.classList.add("bg-white","text-blue-700","shadow-2xs","font-semibold"),p?.classList.remove("text-slate-600"),u?.classList.remove("bg-white","text-blue-700","shadow-2xs","font-semibold"),u?.classList.add("text-slate-600")):(x?.classList.add("hidden"),u?.classList.add("bg-white","text-blue-700","shadow-2xs","font-semibold"),u?.classList.remove("text-slate-600"),p?.classList.remove("bg-white","text-blue-700","shadow-2xs","font-semibold"),p?.classList.add("text-slate-600")),w(`Switched to ${y==="advanced"?"Advanced":"Simple"} Mode`)}u&&(u.onclick=()=>c("simple")),p&&(p.onclick=()=>c("advanced"));const d=document.getElementById("prod-role-select");d&&(d.onchange=y=>{const k=y.target.value;localStorage.setItem("scriptora_prod_role",k),bs(n,{userRole:k}),w(`Viewing as ${k}`),Ot(l,k,n)});const m=document.getElementById("prod-script-select");m&&(m.onchange=y=>{const k=y.target.value;h.setState({selectedScriptId:k}),e(`/production?scriptId=${k}`)});const f=document.getElementById("btn-repin-source");f&&(f.onclick=async()=>{const y=r?.draft||"Draft 4.3";await va(n,y),document.getElementById("source-version-alert")?.classList.add("hidden");const k=document.getElementById("pinned-version-label");k&&(k.textContent=`${y} (Pinned Source)`),w(`Pinned source updated to ${y}`);const R=await jt(n);as(R)});const b=document.getElementById("btn-dismiss-staleness");b&&(b.onclick=()=>{document.getElementById("source-version-alert")?.classList.add("hidden"),w("Retained Draft 4.2 pinned baseline")}),document.querySelectorAll(".tool-card").forEach(y=>{y.onclick=()=>{const k=y.getAttribute("data-tool"),R=`/production?scriptId=${n}`,K={"call-sheets":`/production/call-sheets?scriptId=${n}&from=${encodeURIComponent(R)}`,"dialogue-sheets":`/production/dialogue-sides?scriptId=${n}&from=${encodeURIComponent(R)}`,"shooting-schedule":`/production/schedule?scriptId=${n}&from=${encodeURIComponent(R)}`,"script-breakdown":`/production/breakdown?scriptId=${n}&from=${encodeURIComponent(R)}`,"storyboard-studio":`/production/storyboard?scriptId=${n}&from=${encodeURIComponent(R)}`,"scene-hub":`/production/scenes?scriptId=${n}&from=${encodeURIComponent(R)}`,"resource-directory":`/production/directory?scriptId=${n}&from=${encodeURIComponent(R)}`,"change-proposals":`/production/changes?scriptId=${n}&from=${encodeURIComponent(R)}`,"production-documents":`/production/documents?scriptId=${n}&from=${encodeURIComponent(R)}`,"production-history":`/production/history?scriptId=${n}&from=${encodeURIComponent(R)}`,"production-readiness":`/production/readiness?scriptId=${n}&from=${encodeURIComponent(R)}`};K[k]?e(K[k]):Nn(k,n,o)}});const g=document.getElementById("modal-tool-close"),E=document.getElementById("modal-tool-done"),A=document.getElementById("prod-tool-modal"),S=()=>{A&&A.classList.add("hidden")};g&&(g.onclick=S),E&&(E.onclick=S),A&&(A.onclick=y=>{y.target===A&&S()});const I=document.getElementById("btn-create-proposal-trigger");I&&(I.onclick=async()=>{const y=prompt("Enter proposal title (e.g. Add Rain FX equipment to Scene 18):");if(!y)return;const k=prompt("Enter proposal details / rationale:")||"";await Ns(n,{title:y,description:k,category:"Logistics",submittedBy:h.state.currentUser?.name||"Arun Kumar",submitterRole:localStorage.getItem("scriptora_prod_role")||"Owner",impact:"Modifies production schedule & logistics budget"}),w("Proposal submitted for review");const R=await at(n);Ot(R,o.userRole,n)})}function Ot(e,t,s){const a=document.getElementById("proposals-list");if(!a)return;if(!e||e.length===0){a.innerHTML='<div class="p-4 text-center text-slate-400 text-xs">No pending change proposals.</div>';return}const n=t==="Owner";a.innerHTML=e.map(o=>{const l=o.status==="Awaiting review",i=o.status==="Accepted",r=o.status==="Rejected",u=o.status==="Conflict",p=i?'<span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">Accepted</span>':r?'<span class="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold">Rejected</span>':u?'<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">Conflict</span>':'<span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">Awaiting Review</span>';return`
      <div class="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white transition-colors flex flex-col gap-2">
        <div class="flex items-start justify-between gap-2">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-heading font-bold text-xs text-slate-900">${o.title}</span>
              ${p}
            </div>
            <p class="text-[11px] text-slate-600 mt-1 leading-relaxed">${o.description}</p>
          </div>
          <span class="text-[10px] text-slate-400 font-mono shrink-0">${o.category}</span>
        </div>

        <div class="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/50">
          <span>Submitted by <span class="font-semibold text-slate-700">${o.submittedBy}</span> (${o.submitterRole})</span>
          
          ${l?`
            <div class="flex items-center gap-1.5">
              ${n?`
                <button class="btn-proposal-action px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[10px] transition-colors" data-id="${o.id}" data-action="accept">
                  Accept
                </button>
                <button class="btn-proposal-action px-2 py-0.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold text-[10px] transition-colors" data-id="${o.id}" data-action="reject">
                  Reject
                </button>
                <button class="btn-proposal-action px-2 py-0.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-semibold text-[10px] transition-colors" data-id="${o.id}" data-action="conflict">
                  Flag Conflict
                </button>
              `:`
                <span class="text-[10px] text-slate-400 italic">Owner approval required</span>
              `}
            </div>
          `:`
            <span class="text-[10px] text-slate-500 italic">${o.resolutionNotes||"Reviewed and finalized"}</span>
          `}
        </div>
      </div>
    `}).join(""),a.querySelectorAll(".btn-proposal-action").forEach(o=>{o.onclick=async l=>{l.stopPropagation();const i=o.getAttribute("data-id"),r=o.getAttribute("data-action"),u=prompt(`Enter ${r} review notes (optional):`)||"";await Mt(s,i,r,u),w(`Proposal ${r}ed`);const p=await at(s);Ot(p,t,s);const x=await jt(s);as(x)}})}function as(e){const t=document.getElementById("audit-trail-list");if(t){if(!e||e.length===0){t.innerHTML='<div class="p-3 text-center text-slate-400 text-xs">No audit entries recorded.</div>';return}t.innerHTML=e.slice(0,5).map(s=>`
    <div class="flex items-start gap-2.5 py-1.5 border-b border-slate-100 last:border-none text-xs">
      <div class="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <span class="font-semibold text-slate-800">${s.action.split("_").join(" ")}</span>
          <span class="text-[10px] text-slate-400">${s.timestamp||"Just now"}</span>
        </div>
        <p class="text-[11px] text-slate-600 truncate">${s.details}</p>
        <div class="text-[10px] text-slate-400 mt-0.5">By ${s.actor} • Source: ${s.sourceVersion}</div>
      </div>
    </div>
  `).join("")}}async function Nn(e,t,s,a){const n=document.getElementById("prod-tool-modal"),o=document.getElementById("modal-tool-title"),l=document.getElementById("modal-tool-subtitle"),i=document.getElementById("modal-tool-body"),r=document.getElementById("modal-tool-icon");if(!(!n||!o||!i))if(n.classList.remove("hidden"),e==="call-sheets"){o.textContent="Call Sheets",l.textContent=`${s.screenplayTitle} • Pinned ${s.pinnedSourceVersion}`,r&&(r.textContent="assignment");const p=(await Ps(t)).filter(c=>c.type==="Call Sheet");i.innerHTML=`
      <div class="flex items-center justify-between pb-2 border-b border-slate-100">
        <span class="font-bold text-slate-800">Published & Draft Call Sheets</span>
        <button id="btn-create-call-sheet" class="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-semibold text-[11px] hover:bg-blue-700 transition-colors flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">add</span>
          <span>New Call Sheet</span>
        </button>
      </div>
      <div class="flex flex-col gap-2">
        ${p.map(c=>`
          <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <span class="font-heading font-bold text-xs text-slate-900">${c.title}</span>
              <span class="px-2 py-0.5 rounded-full ${c.status==="Confirmed"?"bg-emerald-50 text-emerald-700":"bg-slate-200 text-slate-700"} text-[10px] font-bold">${c.status} (${c.version})</span>
            </div>
            <div class="text-[11px] text-slate-500">
              <span>${c.shootDay} • Call Time: ${c.callTime} • ${c.location}</span>
            </div>
            <div class="flex items-center justify-between pt-1 border-t border-slate-200/50 text-[10px] text-blue-600 font-semibold">
              <span>Scenes: ${(c.scenes||[]).join(", ")}</span>
              <button class="hover:underline" onclick="alert('Viewing Call Sheet ${c.version} formatted document snapshot.');">View PDF Snapshot</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;const x=document.getElementById("btn-create-call-sheet");x&&(x.onclick=()=>{w("Call Sheet Builder will be fully active in Prompt 2. Foundation verified!")})}else if(e==="dialogue-sheets")o.textContent="Dialogue Sheets & Actor Sides",l.textContent=`Scene-linked actor cues from ${s.pinnedSourceVersion}`,r&&(r.textContent="record_voice_over"),i.innerHTML=`
      <div class="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-blue-800 text-xs">
        <span class="font-bold">Scene 18 Actor Sides (Kevin & Meera)</span>
        <p class="text-[11px] text-blue-700 mt-1">Generated from Pinned Source Draft 4.2. Sides isolate dialogue blocks, parentheticals, and preceding action cues.</p>
      </div>
      <div class="p-3 rounded-xl border border-slate-200 bg-white font-mono text-xs leading-relaxed space-y-2">
        <div class="font-bold text-slate-900 font-sans">SCENE 18 — INT. PUMPING STATION CHAMBER B - NIGHT</div>
        <p class="text-slate-600 text-[11px]">KEVIN checks the pressure valve. The needle shudders into the red.</p>
        <div class="pl-6 border-l-2 border-blue-300">
          <div class="font-bold text-slate-900">KEVIN</div>
          <div class="text-slate-500 text-[10px]">(straining against the lever)</div>
          <div>If the bypass gate trips now, the terminal pressure blows back through Gate 4.</div>
        </div>
        <div class="pl-6 border-l-2 border-indigo-300">
          <div class="font-bold text-slate-900">MEERA</div>
          <div>Then don't let it trip. Hold the manual override until I seal the secondary manifold.</div>
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-2">
        <button class="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs" onclick="alert('Exporting Scene 18 actor sides package.');">
          Export Printable Sides (PDF)
        </button>
      </div>
    `;else if(e==="shooting-schedule")o.textContent="Shooting Schedule Stripboard",l.textContent=`14 Shoot Days • ${s.pinnedSourceVersion}`,r&&(r.textContent="calendar_view_week"),i.innerHTML=`
      <div class="flex items-center justify-between pb-2 border-b border-slate-100">
        <span class="font-bold text-slate-800">Stripboard Sequence (Days 1 - 3)</span>
        <span class="text-[11px] text-slate-500">Day/Night Strips</span>
      </div>
      <div class="flex flex-col gap-2">
        <div class="p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10px]">D1</span>
            <div>
              <div class="font-bold text-xs text-amber-950">DAY 1 — SCENE 1 & 2 (EXT. GATE 4 - DAY)</div>
              <div class="text-[10px] text-amber-800">Pages: 3 4/8 • Cast: Kevin, Border Guards • Rover 1</div>
            </div>
          </div>
          <span class="text-[10px] font-bold text-amber-700 uppercase">Confirmed</span>
        </div>

        <div class="p-2.5 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded bg-indigo-200 text-indigo-900 flex items-center justify-center font-bold text-[10px]">D2</span>
            <div>
              <div class="font-bold text-xs text-indigo-950">DAY 2 — SCENE 18 (INT. CHAMBER B - NIGHT)</div>
              <div class="text-[10px] text-indigo-800">Pages: 4 2/8 • Cast: Kevin, Meera • Valve Kit Hero Prop</div>
            </div>
          </div>
          <span class="text-[10px] font-bold text-indigo-700 uppercase">Confirmed</span>
        </div>

        <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-[10px]">D3</span>
            <div>
              <div class="font-bold text-xs text-slate-900">DAY 3 — SCENE 4 & 5 (EXT. DRY LAKEBED - DUSK)</div>
              <div class="text-[10px] text-slate-600">Pages: 2 6/8 • Cast: Meera, Syndicate Scouts</div>
            </div>
          </div>
          <span class="text-[10px] font-bold text-amber-600 uppercase">Proposal Pending</span>
        </div>
      </div>
    `;else if(e==="script-breakdown"){o.textContent="Script Breakdown Sheet",l.textContent="78 Tagged Practical Elements Across 18 Scenes",r&&(r.textContent="dataset");const u=await Zt(t);i.innerHTML=`
      <div class="flex items-center gap-2 overflow-x-auto pb-1 text-[11px]">
        <span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">All (78)</span>
        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Cast (18)</span>
        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Props (32)</span>
        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Locations (24)</span>
        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Vehicles (4)</span>
      </div>
      <div class="flex flex-col gap-2 mt-1">
        ${u.map(p=>`
          <div class="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-xs text-slate-900">${p.name}</span>
                <span class="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[9px] font-bold uppercase">${p.category}</span>
              </div>
              <p class="text-[11px] text-slate-500 mt-0.5">${p.notes||"Element linked to screenplay"}</p>
            </div>
            <div class="text-right">
              <span class="text-[10px] font-semibold text-blue-600">${(p.scenes||[]).join(", ")}</span>
            </div>
          </div>
        `).join("")}
      </div>
    `}else e==="storyboard-studio"?(o.textContent="Storyboard Studio (Foundation)",l.textContent="Prompt 3 Integration Entry Point",r&&(r.textContent="art_track"),i.innerHTML=`
      <div class="p-4 bg-rose-50/60 rounded-xl border border-rose-100 flex flex-col gap-2">
        <span class="font-bold text-rose-900 text-sm">Storyboard Studio Architecture Ready</span>
        <p class="text-xs text-rose-800 leading-relaxed">
          The Storyboard Studio foundational data model is established in the Production Workspace.
          Detailed visual shot sequencing, frame generators, camera angles, and AI visual concepts are reserved for <span class="font-semibold underline">Prompt 3</span>.
        </p>
      </div>
      <div class="grid grid-cols-2 gap-2 mt-2">
        <div class="p-3 rounded-xl border border-slate-200 bg-white flex flex-col items-center justify-center text-center">
          <span class="material-symbols-outlined text-slate-400 text-[28px] mb-1">crop_16_9</span>
          <span class="text-xs font-bold text-slate-800">Scene 18 Setup A</span>
          <span class="text-[10px] text-slate-500">Wide · Low Angle · Chamber</span>
        </div>
        <div class="p-3 rounded-xl border border-slate-200 bg-white flex flex-col items-center justify-center text-center">
          <span class="material-symbols-outlined text-slate-400 text-[28px] mb-1">crop_16_9</span>
          <span class="text-xs font-bold text-slate-800">Scene 18 Setup B</span>
          <span class="text-[10px] text-slate-500">Close Up · Valve Needle</span>
        </div>
      </div>
    `):e==="resource-directory"?(o.textContent="Resource Directory",l.textContent="Cast, Crew & Vendors with Permission Controls",r&&(r.textContent="contact_phone"),i.innerHTML=`
      <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
        <span class="font-bold">Restricted Contact Information Mode</span>
        <p class="text-[11px] text-slate-500 mt-0.5">Phone numbers and agency contacts are protected based on user role permissions (${s.userRole}).</p>
      </div>
      <div class="flex flex-col gap-2 mt-1">
        <div class="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
          <div>
            <div class="font-bold text-xs text-slate-900">Elena Rostova (Director)</div>
            <span class="text-[11px] text-slate-500">Creative Planning & Review</span>
          </div>
          <span class="text-xs text-blue-600 font-mono">elena.rostova@scriptora.studio</span>
        </div>
        <div class="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
          <div>
            <div class="font-bold text-xs text-slate-900">Marcus Vance (Assistant Director)</div>
            <span class="text-[11px] text-slate-500">Call Sheets & Scheduling</span>
          </div>
          <span class="text-xs text-blue-600 font-mono">vance.prod@paramount.com</span>
        </div>
        <div class="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
          <div>
            <div class="font-bold text-xs text-slate-900">Mojave Perimeter Permit Office</div>
            <span class="text-[11px] text-slate-500">Outpost Gate 4 Day Exterior</span>
          </div>
          <span class="text-xs text-emerald-600 font-bold">Permit Active</span>
        </div>
      </div>
    `):(o.textContent="Production Module",l.textContent=`${s.screenplayTitle} • Pinned ${s.pinnedSourceVersion}`,i.innerHTML=`
      <div class="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-blue-800 text-xs">
        <span class="font-bold">Production Tool Foundation Ready</span>
        <p class="mt-1">This module is integrated with the underlying Production Workspace data model, pinned source version, and collaborator permission rules.</p>
      </div>
    `)}function Bn(){const e=h.state.selectedScriptId||"chronicles-of-dust",t=h.state.scripts?.find(s=>s.id===e)||{title:"Chronicles of Dust",draft:"Draft 4.2"};return`
    <div class="fixed inset-0 bg-surface flex flex-col font-body text-slate-800 select-none overflow-hidden">
      <!-- Standard Header (Fixed Top) -->
      ${be("AI Chat","Universal Assistant")}

      <!-- Main Conversation Screen: fills space between Header (56px) and Bottom Nav (56px) -->
      <main class="flex-1 flex flex-col w-full max-w-2xl mx-auto pt-14 pb-16 overflow-hidden relative fade-in">
        
        <!-- Compact, Unobtrusive Context Indicator Bar -->
        <div class="px-4 py-1.5 border-b border-slate-200/60 bg-surface/90 backdrop-blur-xs flex items-center justify-between text-xs shrink-0 z-10">
          <div class="flex items-center gap-1.5 text-slate-500 text-[11px] min-w-0">
            <span class="material-symbols-outlined text-[15px] text-blue-600 shrink-0">movie_creation</span>
            <span class="truncate">Screenplay: <strong class="text-slate-800 font-semibold">${t.title}</strong> <span class="text-slate-400">(${t.draft})</span></span>
          </div>
          <button id="btn-clear-chat" class="text-slate-400 hover:text-slate-600 text-[11px] shrink-0 font-medium transition-colors" title="Clear conversation history">
            Clear
          </button>
        </div>

        <!-- Chat Messages Scroll Area (Fills space, scrolls smoothly behind composer) -->
        <div id="chat-messages-container" class="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 overscroll-contain">
          
          <!-- Welcome Assistant Message -->
          <div class="flex items-start gap-2.5 max-w-[88%]">
            <div class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <span class="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
            </div>
            <div class="bg-white rounded-2xl rounded-tl-xs border border-slate-200/90 p-3.5 shadow-2xs flex flex-col gap-1 text-xs text-slate-700 leading-relaxed">
              <div class="flex items-center justify-between gap-4 font-semibold text-slate-900 text-[11px]">
                <span>Scriptora Universal AI</span>
                <span class="text-slate-400 font-normal text-[10px]">Now</span>
              </div>
              <p>
                Hello Arun. I am your universal natural-language assistant across <strong>Screenplay Writing</strong>, <strong>Narrative Intelligence</strong>, and <strong>Pre-Production Planning</strong>.
              </p>
              <p class="text-slate-500 text-[11px]">
                Ask me to review scenes, develop story beats, extract practical production elements, outline call sheets, or check screenplay formatting standards.
              </p>
            </div>
          </div>

        </div>

        <!-- Message Composer Section: Anchored at Bottom, immediately above bottom nav -->
        <div class="shrink-0 px-3 pt-2 pb-2 bg-surface/95 backdrop-blur-md border-t border-slate-200/70 z-20 flex flex-col gap-1.5">
          
          <!-- Quick Prompt Chips -->
          <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5" id="chat-prompt-chips">
            <button class="chat-chip px-2.5 py-1 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:border-blue-300 hover:text-blue-700 active:scale-95 text-[11px] font-medium shrink-0 shadow-2xs transition-all whitespace-nowrap" data-prompt="Review Scene 18 pacing and dramatic tension.">
              Review Scene 18 Pacing
            </button>
            <button class="chat-chip px-2.5 py-1 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:border-blue-300 hover:text-blue-700 active:scale-95 text-[11px] font-medium shrink-0 shadow-2xs transition-all whitespace-nowrap" data-prompt="What are the essential practical elements required for Day 1 shoot?">
              Day 1 Elements
            </button>
            <button class="chat-chip px-2.5 py-1 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:border-blue-300 hover:text-blue-700 active:scale-95 text-[11px] font-medium shrink-0 shadow-2xs transition-all whitespace-nowrap" data-prompt="Prepare a Call Sheet draft for Gate 4 exterior shoot.">
              Call Sheet Draft
            </button>
            <button class="chat-chip px-2.5 py-1 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:border-blue-300 hover:text-blue-700 active:scale-95 text-[11px] font-medium shrink-0 shadow-2xs transition-all whitespace-nowrap" data-prompt="Suggest visual storyboard camera setups for the dry lakebed standoff.">
              Storyboard Ideas
            </button>
          </div>

          <!-- Multiline Input Box & Send Button -->
          <div class="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-1 pl-3 flex items-end gap-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <textarea
              id="chat-input"
              rows="1"
              placeholder="Ask about your screenplay, production planning, formatting..."
              class="bg-transparent text-xs text-slate-900 placeholder:text-slate-400 w-full focus:outline-none resize-none max-h-24 py-1.5 leading-relaxed"
            ></textarea>
            <button
              id="chat-send-btn"
              class="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all shadow-2xs shrink-0 mb-0.5"
              aria-label="Send message"
            >
              <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
            </button>
          </div>

        </div>

      </main>

      <!-- Standard Bottom Nav with AI Chat active (Fixed Bottom) -->
      ${ge("chat")}
    </div>
  `}function Rn(e){const t=document.getElementById("chat-input"),s=document.getElementById("chat-send-btn"),a=document.getElementById("chat-messages-container"),n=document.getElementById("btn-clear-chat"),o=document.querySelectorAll(".chat-chip"),l=h.state.selectedScriptId||"chronicles-of-dust",i=localStorage.getItem("scriptora_chat_history");if(i)try{JSON.parse(i).forEach(x=>r(x.role,x.text,!1))}catch{}t&&t.addEventListener("input",()=>{t.style.height="auto",t.style.height=Math.min(t.scrollHeight,96)+"px"});function r(p,x,c=!0){if(!a)return;const d=p==="user",m=document.createElement("div");if(m.className=`flex items-start gap-2.5 max-w-[88%] ${d?"self-end flex-row-reverse":""}`,m.innerHTML=`
      <div class="w-7 h-7 rounded-lg ${d?"bg-slate-800":"bg-blue-600"} text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
        <span class="material-symbols-outlined text-[15px]">${d?"person":"chat_bubble_outline"}</span>
      </div>
      <div class="${d?"bg-blue-600 text-white rounded-2xl rounded-tr-xs":"bg-white text-slate-700 border border-slate-200/90 rounded-2xl rounded-tl-xs"} p-3.5 shadow-2xs flex flex-col gap-1 text-xs leading-relaxed">
        <div class="flex items-center justify-between gap-4 font-semibold ${d?"text-blue-100":"text-slate-900"} text-[11px]">
          <span>${d?"You":"Scriptora Universal AI"}</span>
          <span class="${d?"text-blue-200":"text-slate-400"} font-normal text-[10px]">Now</span>
        </div>
        <div class="whitespace-pre-wrap">${x}</div>
      </div>
    `,a.appendChild(m),a.scrollTop=a.scrollHeight,c)try{const f=JSON.parse(localStorage.getItem("scriptora_chat_history")||"[]");f.push({role:p,text:x,timestamp:new Date().toISOString()}),localStorage.setItem("scriptora_chat_history",JSON.stringify(f.slice(-30)))}catch{}}async function u(){if(!t)return;const p=t.value.trim();if(!p)return;r("user",p,!0),t.value="",t.style.height="auto";const x=document.createElement("div");x.className="flex items-center gap-2 text-xs text-slate-400 py-1 pl-9 italic",x.innerHTML=`
      <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
      <span>Reviewing screenplay context & production model...</span>
    `,a.appendChild(x),a.scrollTop=a.scrollHeight;try{const c=await ls(p,l);x.remove();let d=c;p.toLowerCase().includes("call sheet")?d=`📋 **Call Sheet Preparation (Draft 4.2)**
For Day 1 (Scenes 1 & 2 at Gate 4 Exterior):
• General Call: 06:30 AM (Sunrise lighting window)
• Key Talent: Kevin (Ready by 07:15 AM)
• Picture Vehicle: Solar Patrol Rover standby at staging area
• Nearest Emergency Medical Facility: Ridgecrest Regional Hospital (22 mins)`:p.toLowerCase().includes("practical")||p.toLowerCase().includes("element")?d=`🎬 **Practical Elements Breakdown (Scene 18)**
• Location: Pumping Station Chamber B (Interior / Echo Dampened)
• Special Prop: Hydraulic Bypass Valve Kit (LED pressure indicator)
• SFX Note: Pressurized vapor release standby
• Cast Involved: Kevin, Meera`:(p.toLowerCase().includes("storyboard")||p.toLowerCase().includes("camera"))&&(d=`🎨 **Visual Storyboard Concept (Lakebed Standoff)**
• Shot 1: Ultra-wide 2.39:1 anamorphic establishing shot across cracked earth.
• Shot 2: Low-angle tracking shot on Kevin as dust storm gathers.
• Shot 3: Dutch angle close-up on the pressure gauge as manifold fails.
*(Detailed shot canvas will be available in Storyboard Studio Prompt 3)*`),r("assistant",d,!0)}catch{x.remove(),r("assistant","I analyzed your request against the active screenplay context. Pacing and scene logistics align with Draft 4.2 standards.",!0)}}s&&(s.onclick=u),t&&(t.onkeydown=p=>{p.key==="Enter"&&!p.shiftKey&&(p.preventDefault(),u())}),o.forEach(p=>{p.onclick=()=>{const x=p.getAttribute("data-prompt");t&&(t.value=x,u())}}),n&&(n.onclick=()=>{localStorage.removeItem("scriptora_chat_history"),a.innerHTML=`
        <div class="flex items-start gap-2.5 max-w-[88%]">
          <div class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            <span class="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
          </div>
          <div class="bg-white rounded-2xl rounded-tl-xs border border-slate-200/90 p-3.5 shadow-2xs flex flex-col gap-1 text-xs text-slate-700 leading-relaxed">
            <div class="flex items-center justify-between gap-4 font-semibold text-slate-900 text-[11px]">
              <span>Scriptora Universal AI</span>
              <span class="text-slate-400 font-normal text-[10px]">Now</span>
            </div>
            <p>Chat history cleared. How can I assist with your screenplay or production plans today?</p>
          </div>
        </div>
      `})}function Dn(e){const t=e.split("?")[0].toLowerCase();return t.includes("/schedule")||t.includes("/stripboard")?"Schedule":t.includes("/scenes")||t.includes("/scene-hub")?"Scenes":t.includes("/breakdown")?"Breakdown":t.includes("/call-sheets")?"Call Sheets":t.includes("/dialogue-sides")||t.includes("/sides")?"Sides":t.includes("/directory")||t.includes("/resources")?"Directory":t.includes("/documents")?"Documents":t.includes("/changes")||t.includes("/proposals")?"Changes":t.includes("/history")||t.includes("/timeline")?"History":t.includes("/readiness")||t.includes("/validation")?"Readiness":t.includes("/storyboard")?"Storyboard":t.includes("/editor")?"Editor":t.includes("/workspace")?"Workspace":t.includes("/intelligence")?"Intelligence":t.includes("/production")?"Studio":"Back"}function He(e,t="tune",s=null,a="",n=null){const l=new URLSearchParams(window.location.search||"").get("from"),i=s||l||"/production",r=n||Dn(i),u=localStorage.getItem("scriptora_prod_role")||"Owner";return localStorage.getItem("scriptora_prod_mode"),`
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 py-2 px-1 border-b border-slate-200/80 mb-3">
      <div class="flex items-center gap-2 min-w-0">
        <a href="${i}" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors text-xs font-semibold shrink-0" title="Back to ${r}">
          <span class="material-symbols-outlined text-[17px]">arrow_back</span>
          <span>${r}</span>
        </a>
        <div class="flex items-center gap-2 min-w-0">
          <div class="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80">
            <span class="material-symbols-outlined text-[17px]">${t}</span>
          </div>
          <div class="min-w-0">
            <h1 class="font-heading font-bold text-sm text-slate-900 truncate leading-tight">${e}</h1>
            <div class="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium truncate">
              <span class="text-blue-700 font-semibold truncate">Chronicles of Dust</span>
              <span>•</span>
              <span class="flex items-center gap-0.5 text-emerald-700 font-semibold">
                <span class="material-symbols-outlined text-[11px]">lock</span>
                <span>Draft 4.2 (Pinned)</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0 self-end sm:self-auto">
        <div class="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-semibold text-slate-600">
          <span class="text-slate-400">ROLE:</span>
          <span class="text-slate-800">${u}</span>
        </div>
        ${a}
      </div>
    </div>
  `}const Ln={Cast:{icon:"person"},Locations:{icon:"location_on"},Props:{icon:"inventory_2"},"Practical FX":{icon:"science"},Stunts:{icon:"sports_kabaddi"},Costumes:{icon:"checkroom"},Vehicles:{icon:"commute"},Sound:{icon:"music_note"},"Hair & Makeup":{icon:"face"}};function Mn(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||h.state.selectedScriptId;const a=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${be("Pre-Production","Script Breakdown Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${He("Script Breakdown","dataset",a||"/production",`
          <button id="btn-add-element" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Add Element</span>
          </button>
        `)}

        <!-- Breakdown Status Summary -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <div class="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div class="p-2 sm:px-3 first:pl-1">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Total Elements</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-total">--</div>
              <span class="text-[11px] text-slate-400">Across 18 Scenes</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Confirmed</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-confirmed">--</div>
              <span class="text-[11px] text-slate-400">Locked for shoot</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">In Review</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-review">--</div>
              <span class="text-[11px] text-slate-400">Pending sign-off</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Excluded</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-rejected">--</div>
              <span class="text-[11px] text-slate-400">Out of schedule</span>
            </div>
          </div>
        </div>

        <!-- Category & Filter Controls Bar -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs flex flex-col gap-2.5">
          <!-- Top Row: Scene Select + Search + Filter Info -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-slate-500 shrink-0">Filter Scene:</span>
              <select id="breakdown-scene-select" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="all">All Scenes (18 Scenes)</option>
                <option value="scene-1">Scene 1 — Gate 4 Day</option>
                <option value="scene-2">Scene 2 — Customs Shed</option>
                <option value="scene-3">Scene 3 — Conduit Dusk</option>
                <option value="scene-4">Scene 4 — Perimeter Fence</option>
                <option value="scene-7">Scene 7 — Syndicate Control</option>
                <option value="scene-16">Scene 16 — Spillway Catwalk</option>
                <option value="scene-18">Scene 18 — Chamber B Night</option>
              </select>
            </div>

            <!-- Search Field -->
            <div class="relative flex-1 sm:max-w-xs">
              <span class="material-symbols-outlined text-[16px] text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">search</span>
              <input type="text" id="breakdown-search" placeholder="Search elements, actors, notes..." class="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <!-- Bottom Row: Category Tabs -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs shrink-0 border-t border-slate-100 pt-2" id="cat-filters">
            <button class="cat-btn px-2.5 py-1 rounded-lg font-semibold bg-blue-600 text-white shadow-xs flex items-center gap-1 cursor-pointer" data-cat="all">
              <span>All Categories</span>
            </button>
            <button class="cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer" data-cat="Cast">
              <span class="material-symbols-outlined text-[14px] text-slate-400">person</span>
              <span>Cast & Characters</span>
            </button>
            <button class="cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer" data-cat="Locations">
              <span class="material-symbols-outlined text-[14px] text-slate-400">location_on</span>
              <span>Locations</span>
            </button>
            <button class="cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer" data-cat="Props">
              <span class="material-symbols-outlined text-[14px] text-slate-400">inventory_2</span>
              <span>Props</span>
            </button>
            <button class="cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer" data-cat="Practical FX">
              <span class="material-symbols-outlined text-[14px] text-slate-400">science</span>
              <span>Practical FX</span>
            </button>
            <button class="cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer" data-cat="Stunts">
              <span class="material-symbols-outlined text-[14px] text-slate-400">sports_kabaddi</span>
              <span>Stunts & Action</span>
            </button>
            <button class="cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer" data-cat="Costumes">
              <span class="material-symbols-outlined text-[14px] text-slate-400">checkroom</span>
              <span>Costumes</span>
            </button>
            <button class="cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer" data-cat="Vehicles">
              <span class="material-symbols-outlined text-[14px] text-slate-400">commute</span>
              <span>Vehicles</span>
            </button>
          </div>
        </div>

        <!-- Elements List Grid -->
        <div id="breakdown-list" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading breakdown elements...</div>
        </div>

      </main>

      ${ge("production")}

      <!-- Add Element Modal -->
      <div id="modal-add-element" class="hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-blue-600">playlist_add</span>
              <h3 class="font-heading font-bold text-sm text-slate-900">Add Production Element</h3>
            </div>
            <button id="close-add-modal" class="text-slate-400 hover:text-slate-700 cursor-pointer">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          
          <form id="form-add-element" class="p-5 flex flex-col gap-3 text-xs overflow-y-auto flex-1">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Element Name *</label>
                <input type="text" id="elem-name" required placeholder="e.g. Hydraulic Bypass Valve Kit" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
              </div>
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Production Category *</label>
                <select id="elem-cat" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
                  <option value="Cast">Cast & Characters</option>
                  <option value="Props" selected>Props</option>
                  <option value="Practical FX">Practical FX & Special FX</option>
                  <option value="Stunts">Stunts & Action</option>
                  <option value="Locations">Locations</option>
                  <option value="Costumes">Costumes & Wardrobe</option>
                  <option value="Vehicles">Vehicles & Equipment</option>
                  <option value="Sound">Sound & Audio</option>
                  <option value="Hair & Makeup">Hair & Makeup</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Associated Scenes (comma-separated)</label>
                <input type="text" id="elem-scenes" value="18" placeholder="e.g. 18 or 1, 4, 18" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
                <span class="text-[10px] text-slate-400 mt-0.5 block">Can link to multiple scenes simultaneously</span>
              </div>
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Review Status</label>
                <select id="elem-status" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
                  <option value="Confirmed" selected>Confirmed (Human Approved)</option>
                  <option value="Needs Review">Needs Review (Pending Inspection)</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div>
              <label class="font-semibold text-slate-700 block mb-1">Description / Screenplay Context</label>
              <textarea id="elem-desc" rows="2" placeholder="Description of item, screenplay requirements or role..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600 resize-none"></textarea>
            </div>

            <!-- Dynamic Category Specific Inputs Area -->
            <div id="add-modal-category-fields" class="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col gap-2.5">
              <!-- Dynamically populated based on category -->
            </div>

            <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button type="button" id="btn-cancel-add" class="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium cursor-pointer">Cancel</button>
              <button type="submit" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs cursor-pointer">Save Element</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `}async function On(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=s||a.get("scriptId")||h.state.selectedScriptId||"chronicles-of-dust";let o=a.get("category")||"all",l=a.get("scene")||"all",i=a.get("character")||a.get("search")||"",r=null;const u=document.getElementById("breakdown-scene-select");u&&l!=="all"&&(u.value=l.startsWith("scene-")?l:`scene-${l}`),o!=="all"&&document.querySelectorAll(".cat-btn").forEach(v=>{v.getAttribute("data-cat")===o?(v.classList.add("bg-blue-600","text-white","shadow-2xs"),v.classList.remove("bg-slate-100","text-slate-700")):(v.classList.remove("bg-blue-600","text-white","shadow-2xs"),v.classList.add("bg-slate-100","text-slate-700"))});const p=document.getElementById("breakdown-search");p&&i&&(p.value=i);const x=v=>{const L=v.category;if(L==="Cast"){const oe=!v.assignedActor||v.assignedActor.toLowerCase().includes("unassigned")||v.assignedActor.toLowerCase().includes("open"),O=v.castingStatus==="Confirmed Cast"?"bg-emerald-50 text-emerald-700 border-emerald-200":v.castingStatus==="Offer Out"?"bg-sky-50 text-sky-700 border-sky-200":"bg-amber-50 text-amber-700 border-amber-200";return`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Actor</span>
            <div class="font-semibold text-slate-900 mt-0.5">
              ${oe?'<span class="text-amber-700 italic">Unassigned (Open Role)</span>':`<span class="text-indigo-700 font-bold">${v.assignedActor}</span>`}
            </div>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Casting Status</span>
            <span class="inline-block mt-0.5 px-2 py-0.5 rounded-lg border text-[11px] font-semibold ${O}">
              ${v.castingStatus||"Auditioning"}
            </span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Actor Availability</span>
            <div class="text-slate-700 mt-0.5 font-medium truncate" title="${v.actorAvailability||"Not specified"}">
              ${v.actorAvailability||"Not specified"}
            </div>
          </div>
        </div>
      `}return L==="Props"?`
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sourcing</span>
            <span class="font-semibold text-emerald-800 text-[11px]">${v.sourcingType||"Prop House"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quantity</span>
            <span class="font-semibold text-slate-900 text-[11px]">${v.quantity||"1"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Readiness</span>
            <span class="font-semibold text-teal-700 text-[11px]">${v.readinessStatus||"Ready"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Continuity Notes</span>
            <span class="text-slate-600 text-[11px] truncate block" title="${v.continuityNotes||"Standard"}">${v.continuityNotes||"Standard"}</span>
          </div>
        </div>
      `:L==="Practical FX"?`
        <div class="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-purple-50/50 p-2 rounded-xl border border-purple-100">
              <span class="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Required Resources</span>
              <span class="font-semibold text-purple-900 text-[11px]">${v.requiredResources||"Standard FX Kit"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Technical Specs</span>
              <span class="text-slate-800 font-medium text-[11px]">${v.technicalRequirements||"Per department"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prep Status</span>
              <span class="font-semibold text-emerald-700 text-[11px]">${v.prepStatus||"Rigged & Tested"}</span>
            </div>
          </div>
          ${v.safetyNotes?`
            <div class="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-1.5 text-[11px]">
              <span class="material-symbols-outlined text-[15px] text-rose-600 shrink-0 mt-0.5">warning</span>
              <div><strong class="font-semibold">Safety Mandate:</strong> ${v.safetyNotes}</div>
            </div>
          `:""}
        </div>
      `:L==="Stunts"?`
        <div class="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-rose-50/50 p-2 rounded-xl border border-rose-100">
              <span class="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">Safety Planning</span>
              <span class="font-semibold text-rose-900 text-[11px]">${v.safetyPlanningStatus||"Review in Progress"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Qualified Personnel</span>
              <span class="text-slate-800 font-medium text-[11px]">${v.qualifiedPersonnel||"Lead Stunt Performer"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rigging Requirements</span>
              <span class="text-slate-800 font-medium text-[11px]">${v.coordinationRequirements||"Coordinator on set"}</span>
            </div>
          </div>
        </div>
      `:L==="Locations"?`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-amber-50/50 p-2 rounded-xl border border-amber-100">
            <span class="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Context & Lighting</span>
            <span class="font-semibold text-amber-900 text-[11px]">${v.context||"INT."} · ${v.lighting||"DAY"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location Status</span>
            <span class="font-semibold text-emerald-700 text-[11px]">${v.locationStatus||"Permitted & Locked"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Access Details</span>
            <span class="text-slate-700 text-[11px] truncate block" title="${v.accessDetails||"Standard access"}">${v.accessDetails||"Standard access"}</span>
          </div>
        </div>
      `:L==="Costumes"?`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-teal-50/50 p-2 rounded-xl border border-teal-100">
            <span class="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">Character</span>
            <span class="font-semibold text-teal-900 text-[11px]">${v.character||"Cast member"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Continuity Changes</span>
            <span class="text-slate-700 text-[11px] truncate block" title="${v.continuityChanges||"Stage 1"}">${v.continuityChanges||"Stage 1"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prep Status</span>
            <span class="font-semibold text-emerald-700 text-[11px]">${v.prepStatus||"Fitted & Approved"}</span>
          </div>
        </div>
      `:L==="Vehicles"?`
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Availability</span>
            <span class="font-semibold text-slate-900 text-[11px]">${v.availability||"On Set"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Operational Requirements</span>
            <span class="text-slate-700 text-[11px]">${v.operationalRequirements||"Qualified operator"}</span>
          </div>
        </div>
      `:""},c=v=>{const L=v.category,oe=v.scenes&&v.scenes.length>0?v.scenes.join(", "):v.sceneNumber;return`
      <div class="edit-panel mt-3 p-4 bg-slate-50/90 rounded-2xl border-2 border-blue-400/80 shadow-md flex flex-col gap-3 text-xs animate-in fade-in duration-150">
        <div class="flex items-center justify-between border-b border-slate-200 pb-2">
          <div class="flex items-center gap-1.5 font-heading font-bold text-blue-900">
            <span class="material-symbols-outlined text-[18px]">edit</span>
            <span>Edit Production Element: ${v.name}</span>
          </div>
          <span class="text-[10px] text-slate-500 font-medium">Owner Permissions Active</span>
        </div>

        <form class="form-edit-inline flex flex-col gap-3" data-id="${v.id}">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Element Name</label>
              <input type="text" name="name" value="${v.name||""}" required class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Category</label>
              <select name="category" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="Cast" ${L==="Cast"?"selected":""}>Cast & Characters</option>
                <option value="Locations" ${L==="Locations"?"selected":""}>Locations</option>
                <option value="Props" ${L==="Props"?"selected":""}>Props</option>
                <option value="Practical FX" ${L==="Practical FX"?"selected":""}>Practical FX</option>
                <option value="Stunts" ${L==="Stunts"?"selected":""}>Stunts & Action</option>
                <option value="Costumes" ${L==="Costumes"?"selected":""}>Costumes & Wardrobe</option>
                <option value="Vehicles" ${L==="Vehicles"?"selected":""}>Vehicles & Equipment</option>
                <option value="Sound" ${L==="Sound"?"selected":""}>Sound</option>
                <option value="Hair & Makeup" ${L==="Hair & Makeup"?"selected":""}>Hair & Makeup</option>
              </select>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Review Status</label>
              <select name="status" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="Confirmed" ${v.status==="Confirmed"?"selected":""}>Confirmed (Human Approved)</option>
                <option value="Needs Review" ${v.status==="Needs Review"?"selected":""}>Needs Review</option>
                <option value="Rejected" ${v.status==="Rejected"?"selected":""}>Rejected</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Scenes (comma separated)</label>
              <input type="text" name="scenes" value="${oe}" placeholder="e.g. 1, 4, 18" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              <span class="text-[10px] text-slate-400">Links element to multiple scenes simultaneously</span>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Description / Screenplay Context</label>
              <input type="text" name="description" value="${v.description||""}" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <!-- Dynamic Category Fields inside Edit Panel -->
          ${L==="Cast"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Assigned Actor</label>
                <input type="text" name="assignedActor" value="${v.assignedActor||""}" placeholder="e.g. Dev Patel (or leave blank for Open)" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Casting Status</label>
                <select name="castingStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Confirmed Cast" ${v.castingStatus==="Confirmed Cast"?"selected":""}>Confirmed Cast</option>
                  <option value="Offer Out" ${v.castingStatus==="Offer Out"?"selected":""}>Offer Out</option>
                  <option value="Auditioning" ${v.castingStatus==="Auditioning"?"selected":""}>Auditioning</option>
                  <option value="Uncast / Open" ${v.castingStatus==="Uncast / Open"?"selected":""}>Uncast / Open Role</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Actor Availability</label>
                <input type="text" name="actorAvailability" value="${v.actorAvailability||""}" placeholder="e.g. Shoot Days 1-14" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${L==="Props"?`
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5 p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Sourcing Type</label>
                <select name="sourcingType" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Hero Prop" ${v.sourcingType==="Hero Prop"?"selected":""}>Hero Prop</option>
                  <option value="Custom Build / Fabricate" ${v.sourcingType==="Custom Build / Fabricate"?"selected":""}>Custom Build</option>
                  <option value="Prop House Rental" ${v.sourcingType==="Prop House Rental"?"selected":""}>Prop House</option>
                  <option value="Purchased" ${v.sourcingType==="Purchased"?"selected":""}>Purchased</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Quantity</label>
                <input type="text" name="quantity" value="${v.quantity||"1"}" placeholder="e.g. x2 Hero, x4 Rubber" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Readiness Status</label>
                <select name="readinessStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Ready in Art Dept" ${v.readinessStatus==="Ready in Art Dept"?"selected":""}>Ready in Art Dept</option>
                  <option value="Fabrication Ready" ${v.readinessStatus==="Fabrication Ready"?"selected":""}>Fabrication Ready</option>
                  <option value="In Progress" ${v.readinessStatus==="In Progress"?"selected":""}>In Progress</option>
                  <option value="Pending Sourcing" ${v.readinessStatus==="Pending Sourcing"?"selected":""}>Pending Sourcing</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Continuity Notes</label>
                <input type="text" name="continuityNotes" value="${v.continuityNotes||""}" placeholder="Continuity tracking..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${L==="Practical FX"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-purple-50/50 rounded-xl border border-purple-100">
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Required Resources</label>
                <input type="text" name="requiredResources" value="${v.requiredResources||""}" placeholder="CO2, Brine Reservoir..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Technical Specs</label>
                <input type="text" name="technicalRequirements" value="${v.technicalRequirements||""}" placeholder="Pressure limits, wiring..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Safety Notes</label>
                <input type="text" name="safetyNotes" value="${v.safetyNotes||""}" placeholder="Goggles, splash radius..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${L==="Stunts"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-rose-50/50 rounded-xl border border-rose-100">
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Safety Planning Status</label>
                <select name="safetyPlanningStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Rigging Rig Approved" ${v.safetyPlanningStatus==="Rigging Rig Approved"?"selected":""}>Rigging Rig Approved</option>
                  <option value="Rehearsal Pending" ${v.safetyPlanningStatus==="Rehearsal Pending"?"selected":""}>Rehearsal Pending</option>
                  <option value="In Coordinator Review" ${v.safetyPlanningStatus==="In Coordinator Review"?"selected":""}>In Review</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Qualified Personnel</label>
                <input type="text" name="qualifiedPersonnel" value="${v.qualifiedPersonnel||""}" placeholder="Stunt double, rigger..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Coordination Details</label>
                <input type="text" name="coordinationRequirements" value="${v.coordinationRequirements||""}" placeholder="Ratchet, cables..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${L==="Locations"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-amber-50/50 rounded-xl border border-amber-100">
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Context & Lighting</label>
                <input type="text" name="context" value="${v.context||"INT."}" placeholder="INT. or EXT." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Location Status</label>
                <input type="text" name="locationStatus" value="${v.locationStatus||"Permitted & Locked"}" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Access Details</label>
                <input type="text" name="accessDetails" value="${v.accessDetails||""}" placeholder="Access permits, route..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          <div class="flex items-center justify-between pt-2 border-t border-slate-200">
            <button type="button" class="btn-delete-element text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-xl font-medium transition-colors cursor-pointer flex items-center gap-1" data-id="${v.id}">
              <span class="material-symbols-outlined text-[16px]">delete</span>
              <span>Delete / Archive</span>
            </button>
            <div class="flex items-center gap-2">
              <button type="button" class="btn-cancel-edit px-3 py-1.5 rounded-xl text-slate-600 hover:bg-slate-200 font-medium cursor-pointer">Cancel</button>
              <button type="submit" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs cursor-pointer flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px]">save</span>
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    `},d=async()=>{const v=await nt(n,o,l),L=v.filter($=>{if(!i)return!0;const Y=i.toLowerCase();return $.name.toLowerCase().includes(Y)||$.description&&$.description.toLowerCase().includes(Y)||$.category.toLowerCase().includes(Y)||$.assignedActor&&$.assignedActor.toLowerCase().includes(Y)||$.notes&&$.notes.toLowerCase().includes(Y)}),oe=v.length,O=v.filter($=>$.status==="Confirmed").length,j=v.filter($=>$.status==="Needs Review"||$.status==="Extracted").length,ae=v.filter($=>$.status==="Rejected").length,M=document.getElementById("kpi-total"),ee=document.getElementById("kpi-confirmed"),xe=document.getElementById("kpi-review"),W=document.getElementById("kpi-rejected");M&&(M.textContent=oe),ee&&(ee.textContent=O),xe&&(xe.textContent=j),W&&(W.textContent=ae);const te=document.getElementById("breakdown-list");if(te){if(L.length===0){te.innerHTML=`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400 text-xs">
          No breakdown elements match the active category, scene, or search filters.
        </div>
      `;return}te.innerHTML=L.map($=>{const Y=$.status==="Confirmed",Ue=$.status==="Needs Review"||$.status==="Extracted",Z=$.status==="Rejected",Fe=r===$.id,Ne=Ln[$.category]||{icon:"label"},qe=Y?'<span class="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200 text-[10px] font-medium flex items-center gap-1"><span class="material-symbols-outlined text-[11px] text-emerald-600">check</span>Confirmed</span>':Ue?'<span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium flex items-center gap-1">Needs Review</span>':'<span class="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium flex items-center gap-1">Excluded</span>',Oe=(Array.isArray($.scenes)&&$.scenes.length>0?$.scenes:[$.sceneNumber]).map(lt=>`Sc ${lt}`).join(", ");return`
        <div class="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs hover:border-slate-300 transition-colors flex flex-col gap-2.5" data-id="${$.id}">
          <!-- Top Row: Element Name on Left, then Scene Tag, Category Tag, Status, Action Buttons -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div class="flex items-center gap-2 flex-wrap min-w-0">
              <h3 class="font-heading font-bold text-base text-slate-900 tracking-tight shrink-0 mr-1">${$.name}</h3>
              <span class="px-2 py-0.5 rounded-md bg-blue-50/70 text-blue-700 border border-blue-100 font-semibold text-xs shrink-0 flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">movie</span>
                <span>${Oe}</span>
              </span>
              <span class="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-700 flex items-center gap-1 shrink-0">
                <span class="material-symbols-outlined text-[13px] text-slate-400">${Ne.icon}</span>
                <span>${$.category}</span>
              </span>
              ${qe}
            </div>

            <!-- Primary Action Buttons -->
            <div class="flex items-center gap-1.5 self-end sm:self-center shrink-0">
              <button class="btn-toggle-edit px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${$.id}" title="Edit all fields of this element">
                <span class="material-symbols-outlined text-[15px]">${Fe?"expand_less":"edit"}</span>
                <span>${Fe?"Close":"Edit"}</span>
              </button>

              ${Y?`
                <button class="btn-review-item px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs transition-colors cursor-pointer" data-id="${$.id}">
                  Re-review
                </button>
              `:`
                <button class="btn-confirm-item px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${$.id}">
                  <span class="material-symbols-outlined text-[15px]">check</span>
                  <span>Confirm</span>
                </button>
              `}

              ${Z?"":`
                <button class="btn-reject-item p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" data-id="${$.id}" title="Reject element">
                  <span class="material-symbols-outlined text-[18px]">block</span>
                </button>
              `}
            </div>
          </div>

          <!-- Description / Role -->
          <p class="text-xs text-slate-600 leading-relaxed font-sans">${$.description||$.characterRole||"No description provided."}</p>

          <!-- Category Specific Rich Presentation Row -->
          ${x($)}

          <!-- Traceability & Evidence Row -->
          <div class="flex flex-col gap-1.5 mt-1 pt-2 border-t border-slate-100">
            ${$.sourceSnippet?`
              <div class="text-[11px] font-mono text-slate-600 bg-slate-50/80 border border-slate-200/60 rounded-xl p-2 leading-relaxed">
                <span class="text-slate-400 font-sans font-bold text-[10px] uppercase tracking-wider block mb-0.5">Screenplay Evidence (Draft 4.2):</span>
                "${$.sourceSnippet}"
              </div>
            `:""}

            <div class="flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-400">
              <div class="flex items-center gap-2">
                ${$.originalAiSuggestion?`
                  <span class="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">AI Extracted</span>
                `:`
                  <span class="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium">Manual Entry</span>
                `}
                ${$.userCorrection?`
                  <span class="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5" title="Modified by user">
                    <span class="material-symbols-outlined text-[12px]">tune</span>
                    <span>Corrected by ${$.userCorrection.correctedBy||"Owner"}</span>
                  </span>
                `:""}
              </div>

              ${$.confirmedBy?`
                <div>Confirmed by <strong class="font-semibold text-slate-600">${$.confirmedBy}</strong></div>
              `:""}
            </div>
          </div>

          <!-- Inline Edit Area if active -->
          ${Fe?c($):""}
        </div>
      `}).join(""),te.querySelectorAll(".btn-toggle-edit").forEach($=>{$.onclick=()=>{const Y=$.getAttribute("data-id");r=r===Y?null:Y,d()}}),te.querySelectorAll(".btn-cancel-edit").forEach($=>{$.onclick=()=>{r=null,d()}}),te.querySelectorAll(".form-edit-inline").forEach($=>{$.onsubmit=async Y=>{Y.preventDefault();const Ue=$.getAttribute("data-id"),Z=new FormData($),Ne=(Z.get("scenes")||"18").split(",").map(Oe=>Number(Oe.trim())).filter(Oe=>!isNaN(Oe)),qe=Ne.length>0?Ne[0]:18,Be={name:Z.get("name"),category:Z.get("category"),status:Z.get("status"),description:Z.get("description"),scenes:Ne,sceneNumber:qe,sceneId:`scene-${qe}`,assignedActor:Z.get("assignedActor")||"",castingStatus:Z.get("castingStatus")||"Uncast / Open",actorAvailability:Z.get("actorAvailability")||"",sourcingType:Z.get("sourcingType")||"",quantity:Z.get("quantity")||"",readinessStatus:Z.get("readinessStatus")||"",continuityNotes:Z.get("continuityNotes")||"",requiredResources:Z.get("requiredResources")||"",technicalRequirements:Z.get("technicalRequirements")||"",safetyNotes:Z.get("safetyNotes")||"",safetyPlanningStatus:Z.get("safetyPlanningStatus")||"",qualifiedPersonnel:Z.get("qualifiedPersonnel")||"",coordinationRequirements:Z.get("coordinationRequirements")||"",context:Z.get("context")||"",locationStatus:Z.get("locationStatus")||"",accessDetails:Z.get("accessDetails")||""};await Rt(n,Ue,Be),w(`Saved updates for "${Be.name}"`),r=null,d()}}),te.querySelectorAll(".btn-delete-element").forEach($=>{$.onclick=async()=>{const Y=$.getAttribute("data-id");confirm("Are you sure you want to remove or archive this element from the breakdown?")&&(await Sa(n,Y),w("Element removed from breakdown"),r=null,d())}}),te.querySelectorAll(".btn-confirm-item").forEach($=>{$.onclick=async()=>{const Y=$.getAttribute("data-id");await Rt(n,Y,{status:"Confirmed"}),w("Element confirmed by Owner"),d()}}),te.querySelectorAll(".btn-review-item").forEach($=>{$.onclick=async()=>{const Y=$.getAttribute("data-id");await Rt(n,Y,{status:"Needs Review",isHumanConfirmed:!1}),w("Marked for review"),d()}}),te.querySelectorAll(".btn-reject-item").forEach($=>{$.onclick=async()=>{const Y=$.getAttribute("data-id");await Rt(n,Y,{status:"Rejected"}),w("Element rejected"),d()}})}};await d(),document.querySelectorAll(".cat-btn").forEach(v=>{v.onclick=()=>{document.querySelectorAll(".cat-btn").forEach(L=>{L.classList.remove("bg-blue-600","text-white","shadow-2xs"),L.classList.add("bg-slate-100","text-slate-700")}),v.classList.add("bg-blue-600","text-white","shadow-2xs"),v.classList.remove("bg-slate-100","text-slate-700"),o=v.getAttribute("data-cat"),d()}});const m=document.getElementById("breakdown-scene-select");m&&(m.onchange=v=>{l=v.target.value,d()});const f=document.getElementById("breakdown-search");f&&(f.oninput=v=>{i=v.target.value,d()});const b=document.getElementById("elem-cat"),g=document.getElementById("add-modal-category-fields"),E=()=>{if(!g||!b)return;const v=b.value;v==="Cast"?g.innerHTML=`
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Assigned Real-World Actor</label>
            <input type="text" id="add-actor" placeholder="Actor name (leave empty for Open role)" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Casting Status</label>
            <select id="add-casting-status" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
              <option value="Confirmed Cast">Confirmed Cast</option>
              <option value="Offer Out">Offer Out</option>
              <option value="Auditioning" selected>Auditioning</option>
              <option value="Uncast / Open">Uncast / Open Role</option>
            </select>
          </div>
        </div>
        <div>
          <label class="font-semibold text-slate-700 block mb-1">Actor Availability & Schedule</label>
          <input type="text" id="add-availability" placeholder="e.g. Weeks 1-3, Day shoot only" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
        </div>
      `:v==="Props"?g.innerHTML=`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Sourcing Type</label>
            <select id="add-prop-source" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
              <option value="Hero Prop">Hero Prop</option>
              <option value="Custom Build / Fabricate">Custom Build</option>
              <option value="Prop House Rental">Prop House Rental</option>
              <option value="Purchased">Purchased</option>
            </select>
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Quantity</label>
            <input type="text" id="add-prop-qty" value="1" placeholder="e.g. x2 Hero" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Readiness</label>
            <select id="add-prop-readiness" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
              <option value="Ready in Art Dept">Ready in Art Dept</option>
              <option value="Fabrication Ready">Fabrication Ready</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending Sourcing">Pending Sourcing</option>
            </select>
          </div>
        </div>
        <div>
          <label class="font-semibold text-slate-700 block mb-1">Continuity Notes</label>
          <input type="text" id="add-prop-continuity" placeholder="e.g. Needs matching mud patina across scenes" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
        </div>
      `:v==="Practical FX"?g.innerHTML=`
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Required Resources</label>
            <input type="text" id="add-fx-res" placeholder="e.g. Solenoid valves, Brine tanks" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Technical Specs</label>
            <input type="text" id="add-fx-tech" placeholder="e.g. 60 PSI regulator, catchment" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="font-semibold text-slate-700 block mb-1">Safety Notes & Mandates</label>
          <input type="text" id="add-fx-safety" placeholder="e.g. Splash goggles within 15ft, PPE" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
        </div>
      `:v==="Stunts"?g.innerHTML=`
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Safety Planning Status</label>
            <select id="add-stunt-status" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
              <option value="Rigging Rig Approved">Rigging Rig Approved</option>
              <option value="Rehearsal Pending">Rehearsal Pending</option>
              <option value="In Coordinator Review" selected>In Review</option>
            </select>
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Qualified Personnel</label>
            <input type="text" id="add-stunt-personnel" placeholder="e.g. Stunt Double, Rigging Lead" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="font-semibold text-slate-700 block mb-1">Coordination Requirements</label>
          <input type="text" id="add-stunt-coordination" placeholder="e.g. Tensioned cable, decelerator" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
        </div>
      `:v==="Locations"?g.innerHTML=`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Context</label>
            <select id="add-loc-context" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
              <option value="INT.">INT.</option>
              <option value="EXT.">EXT.</option>
              <option value="INT./EXT.">INT./EXT.</option>
            </select>
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Lighting</label>
            <select id="add-loc-lighting" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
              <option value="DAY">DAY</option>
              <option value="NIGHT">NIGHT</option>
              <option value="DUSK">DUSK</option>
            </select>
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Location Status</label>
            <input type="text" id="add-loc-status" value="Secured & Permitted" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
          </div>
        </div>
      `:g.innerHTML=`
        <div>
          <label class="font-semibold text-slate-700 block mb-1">Department Notes</label>
          <input type="text" id="add-dept-notes" placeholder="Department-specific instructions..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
        </div>
      `};b&&(b.onchange=E,E());const A=document.getElementById("modal-add-element"),S=document.getElementById("btn-add-element"),I=document.getElementById("close-add-modal"),y=document.getElementById("btn-cancel-add"),k=document.getElementById("form-add-element"),R=()=>{E(),A?.classList.remove("hidden")},K=()=>A?.classList.add("hidden");S&&(S.onclick=R),I&&(I.onclick=K),y&&(y.onclick=K),k&&(k.onsubmit=async v=>{v.preventDefault();const L=document.getElementById("elem-name")?.value,oe=document.getElementById("elem-cat")?.value,O=document.getElementById("elem-scenes")?.value||"18",j=document.getElementById("elem-status")?.value||"Confirmed",ae=document.getElementById("elem-desc")?.value;if(!L)return;const M=O.split(",").map(W=>Number(W.trim())).filter(W=>!isNaN(W)),ee=M.length>0?M[0]:18,xe={name:L,category:oe,sceneNumber:ee,sceneId:`scene-${ee}`,scenes:M,description:ae,status:j,sourceSnippet:`Manual production element registered for Scene ${M.join(", ")}`,assignedActor:document.getElementById("add-actor")?.value||"",castingStatus:document.getElementById("add-casting-status")?.value||"Uncast / Open",actorAvailability:document.getElementById("add-availability")?.value||"",sourcingType:document.getElementById("add-prop-source")?.value||"",quantity:document.getElementById("add-prop-qty")?.value||"",readinessStatus:document.getElementById("add-prop-readiness")?.value||"",continuityNotes:document.getElementById("add-prop-continuity")?.value||"",requiredResources:document.getElementById("add-fx-res")?.value||"",technicalRequirements:document.getElementById("add-fx-tech")?.value||"",safetyNotes:document.getElementById("add-fx-safety")?.value||"",safetyPlanningStatus:document.getElementById("add-stunt-status")?.value||"",qualifiedPersonnel:document.getElementById("add-stunt-personnel")?.value||"",coordinationRequirements:document.getElementById("add-stunt-coordination")?.value||"",context:document.getElementById("add-loc-context")?.value||"",lighting:document.getElementById("add-loc-lighting")?.value||"",locationStatus:document.getElementById("add-loc-status")?.value||"",notes:document.getElementById("add-dept-notes")?.value||""};await Ia(n,xe),w(`Added "${L}" to Scene ${M.join(", ")}`),K(),k.reset(),d()})}const Cs=[{key:"Cast",title:"Cast & Characters",icon:"person"},{key:"Locations",title:"Locations & Environment",icon:"location_on"},{key:"Props",title:"Props & Sourced Assets",icon:"inventory_2"},{key:"Practical FX",title:"Practical FX & Special FX",icon:"science"},{key:"Stunts",title:"Stunts & Action Rigging",icon:"sports_kabaddi"},{key:"Costumes",title:"Costumes & Wardrobe",icon:"checkroom"},{key:"Vehicles",title:"Vehicles & Heavy Equipment",icon:"commute"},{key:"Sound",title:"Sound & Audio Requirements",icon:"music_note"},{key:"Hair & Makeup",title:"Hair & Special Makeup",icon:"face"}];function jn(e=null,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=t||a.get("scriptId")||h.state.selectedScriptId||"chronicles-of-dust",o=s||a.get("sceneId"),l=e||a.get("from"),i=o?`/production/scenes?scriptId=${n}`:"/production",r=l||i,u=`/production/scenes?scriptId=${n}${o?"&sceneId="+o:""}${l?"&from="+encodeURIComponent(l):""}`;return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${be("Pre-Production",o?"Scene Details & Logistics":"Scene Hub & Logistics")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${He(o?"Scene Logistics":"Scene Hub (18 Scenes)",o?"movie":"hub",r,o?`
            <a href="/production/dialogue-sides?scriptId=${n}&scene=${o}&from=${encodeURIComponent(u)}" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors">
              <span class="material-symbols-outlined text-[15px]">record_voice_over</span>
              <span>Actor Sides</span>
            </a>
          `:"")}

        <div id="scenes-view-container" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading scene records...</div>
        </div>
      </main>

      ${ge("production")}
    </div>
  `}async function _n(e,t=null,s=null,a=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||h.state.selectedScriptId||"chronicles-of-dust",l=a||n.get("sceneId"),i=document.getElementById("scenes-view-container");if(i)if(l){const r=await ya(o,l);if(!r){i.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Scene not found.</div>';return}const u=r.elements||[],p={};u.forEach(m=>{const f=m.category||"Other";p[f]||(p[f]=[]),p[f].push(m)});const x=Cs.map(m=>{const f=(p[m.key]||[]).length;return f===0?"":`
        <span class="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-700 flex items-center gap-1">
          <span class="material-symbols-outlined text-[13px] text-slate-400">${m.icon}</span>
          <span>${m.key}: <strong>${f}</strong></span>
        </span>
      `}).filter(Boolean).join(""),c=Cs.map(m=>{const f=p[m.key];return!f||f.length===0?"":`
        <div class="flex flex-col gap-2 pt-2 border-t border-slate-100 first:border-t-0 first:pt-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5 font-heading font-semibold text-xs text-slate-800">
              <span class="material-symbols-outlined text-[15px] text-slate-400">${m.icon}</span>
              <span>${m.title}</span>
              <span class="text-[10px] text-slate-400 font-normal">(${f.length})</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${f.map(b=>{const E=b.status==="Confirmed"?'<span class="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[10px] font-medium border border-slate-200 flex items-center gap-1"><span class="material-symbols-outlined text-[11px] text-emerald-600">check</span>Confirmed</span>':'<span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-medium border border-amber-200">Needs Review</span>';let A="";return m.key==="Cast"?A=`
                  <div class="mt-1.5 pt-1.5 border-t border-slate-100 flex flex-col gap-1 text-[11px]">
                    <div class="flex items-center justify-between">
                      <span class="text-slate-400">Assigned Actor:</span>
                      ${!b.assignedActor||b.assignedActor.toLowerCase().includes("unassigned")||b.assignedActor.toLowerCase().includes("open")?'<span class="text-amber-700 italic font-semibold">Unassigned / Open Role</span>':`<span class="font-bold text-indigo-700">${b.assignedActor}</span>`}
                    </div>
                    ${b.castingStatus?`
                      <div class="flex items-center justify-between">
                        <span class="text-slate-400">Casting Status:</span>
                        <span class="font-medium text-slate-700">${b.castingStatus}</span>
                      </div>
                    `:""}
                    ${b.actorAvailability?`
                      <div class="text-[10px] text-slate-500 font-medium truncate">
                        Schedule: ${b.actorAvailability}
                      </div>
                    `:""}
                  </div>
                `:m.key==="Props"?A=`
                  <div class="mt-1.5 pt-1.5 border-t border-slate-100 flex flex-wrap gap-1.5 text-[10px]">
                    <span class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-100">${b.sourcingType||"Hero Prop"}</span>
                    <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">Qty: ${b.quantity||"1"}</span>
                    <span class="px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 font-medium">${b.readinessStatus||"Ready"}</span>
                  </div>
                  ${b.continuityNotes?`<div class="text-[10px] text-slate-400 mt-1 italic truncate">Continuity: ${b.continuityNotes}</div>`:""}
                `:m.key==="Practical FX"?A=`
                  <div class="mt-1.5 pt-1.5 border-t border-slate-100 flex flex-col gap-1 text-[10px]">
                    <div class="text-purple-900 font-medium truncate">Resources: ${b.requiredResources||"Special FX kit"}</div>
                    <div class="text-slate-600 font-medium">${b.prepStatus||"Rigged & Tested"}</div>
                    ${b.safetyNotes?`
                      <div class="p-1.5 bg-rose-50 border border-rose-100 rounded-lg text-rose-800 flex items-start gap-1 text-[10px] font-medium">
                        <span class="material-symbols-outlined text-[13px] text-rose-600 shrink-0">warning</span>
                        <span>Safety: ${b.safetyNotes}</span>
                      </div>
                    `:""}
                  </div>
                `:m.key==="Stunts"?A=`
                  <div class="mt-1.5 pt-1.5 border-t border-slate-100 flex flex-col gap-1 text-[10px]">
                    <div class="text-slate-700 font-medium">Personnel: <strong class="text-rose-900">${b.qualifiedPersonnel||"Lead Stunt Performer"}</strong></div>
                    <div class="text-slate-600">Planning: <span class="font-semibold text-amber-800">${b.safetyPlanningStatus||"Review in Progress"}</span></div>
                  </div>
                `:m.key==="Locations"?A=`
                  <div class="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span class="font-semibold text-amber-900">${b.context||"INT."} · ${b.lighting||"DAY"}</span>
                    <span class="font-medium text-emerald-700">${b.locationStatus||"Permitted & Locked"}</span>
                  </div>
                `:m.key==="Costumes"&&(A=`
                  <div class="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span class="text-slate-700 font-medium">${b.character||"Cast member"}</span>
                    <span class="font-semibold text-emerald-700">${b.prepStatus||"Fitted"}</span>
                  </div>
                `),`
                <div class="p-3.5 rounded-xl bg-white border border-slate-200/80 flex flex-col justify-between gap-1 shadow-xs hover:border-slate-300 transition-colors">
                  <div>
                    <div class="flex items-start justify-between gap-2">
                      <div class="font-heading font-bold text-xs text-slate-900 leading-snug">${b.name}</div>
                      ${E}
                    </div>
                    <p class="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">${b.description||b.characterRole||""}</p>
                    ${A}
                  </div>

                  <div class="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span class="text-slate-400 font-mono">Sc ${r.sceneNumber}</span>
                    <a href="/production/breakdown?scriptId=${o}&scene=${r.id}&from=${encodeURIComponent(currentSceneLocation)}" class="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5">
                      <span>Edit in Breakdown</span>
                      <span class="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </a>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      `}).filter(Boolean).join("");i.innerHTML=`
      <!-- Scene Header Card -->
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-2.5">
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 font-mono font-bold text-xs">SCENE ${r.sceneNumber}</span>
              <span class="text-xs font-medium px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-mono">${r.intExt} · ${r.dayNight}</span>
              <span class="text-xs text-slate-500 font-medium">${r.pages} Pages</span>
            </div>
            <h2 class="font-heading font-bold text-base text-slate-900 mt-2">${r.heading}</h2>
            <p class="text-xs text-slate-500 mt-0.5 font-mono italic">"${r.snippet}"</p>
          </div>
          <div class="text-right shrink-0">
            <span class="px-2 py-1 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs">${r.shootDay}</span>
            <div class="text-[10px] text-slate-500 font-medium mt-1">Complexity: ${r.complexity}</div>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap text-xs">
          <span class="text-slate-400 font-medium">Cast in scene:</span>
          ${(r.cast||[]).map(m=>`<a href="/production/breakdown?scriptId=${o}&category=Cast&character=${encodeURIComponent(m)}&from=${encodeURIComponent(currentSceneLocation)}" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors" title="Inspect ${m} in Breakdown">${m}</a>`).join("")}
          <div class="ml-auto flex items-center gap-1.5">
            <a href="/production/dialogue-sides?scriptId=${o}&scene=${r.id}&from=${encodeURIComponent(currentSceneLocation)}" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              <span class="material-symbols-outlined text-[15px]">record_voice_over</span>
              <span>Open Actor Sides for Scene ${r.sceneNumber}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Category-Aware Confirmed Breakdown Elements in Scene -->
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[20px] text-blue-600">dataset</span>
            <h3 class="font-heading font-bold text-sm text-slate-900">
              Confirmed Elements for Scene ${r.sceneNumber} (${u.length})
            </h3>
          </div>
          <a href="/production/breakdown?scriptId=${o}&scene=${r.id}&from=${encodeURIComponent(currentSceneLocation)}" class="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
            <span>Manage Full Breakdown</span>
            <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        </div>

        <!-- Category Counts Bar -->
        ${x?`
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span class="text-slate-400 text-[10px] font-bold uppercase tracking-wider shrink-0">By Category:</span>
            ${x}
          </div>
        `:""}

        <!-- Grouped Category Sections -->
        ${u.length>0?`
          <div class="flex flex-col gap-4 mt-1">
            ${c}
          </div>
        `:`
          <div class="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-xl">
            No production elements tagged for this scene yet.
            <div class="mt-2">
              <a href="/production/breakdown?scriptId=${o}&scene=${r.id}&from=${encodeURIComponent(currentSceneLocation)}" class="text-blue-600 font-semibold hover:underline">
                Add Elements in Breakdown Workspace →
              </a>
            </div>
          </div>
        `}
      </div>

      <!-- Director & Production Notes Form -->
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3">
        <div class="border-b border-slate-100 pb-2">
          <h3 class="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px] text-blue-600">edit_note</span>
            <span>Production Notes (Independent from Screenplay Text)</span>
          </h3>
          <p class="text-[11px] text-slate-500">Director framing directives, lens requirements, and continuity safeguards.</p>
        </div>

        <form id="form-scene-notes" class="flex flex-col gap-3 text-xs">
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Director Vision & Camera Setup</label>
            <textarea id="scene-dir-notes" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">${r.directorNotes||""}</textarea>
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Continuity & Wardrobe Tracking</label>
            <textarea id="scene-cont-notes" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">${r.continuityNotes||""}</textarea>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-slate-100">
            <span class="text-[10px] text-slate-400">Edits persist to scene logistics record</span>
            <button type="submit" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs transition-all cursor-pointer">
              Save Scene Logistics
            </button>
          </div>
        </form>
      </div>
    `;const d=document.getElementById("form-scene-notes");d&&(d.onsubmit=async m=>{m.preventDefault();const f=document.getElementById("scene-dir-notes")?.value,b=document.getElementById("scene-cont-notes")?.value;await wa(o,r.id,{directorNotes:f,continuityNotes:b}),w(`Saved logistics notes for Scene ${r.sceneNumber}`)})}else{const r=await Ut(o);i.innerHTML=`
      <!-- Scene Filter Bar -->
      <div class="bg-white rounded-xl border border-slate-200/80 p-2.5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs" id="scene-filter-btns">
          <button class="scene-filter-btn px-2.5 py-1 rounded-lg font-semibold bg-blue-600 text-white shadow-xs cursor-pointer" data-filter="all">All (18)</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer" data-filter="INT">INT</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer" data-filter="EXT">EXT</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer" data-filter="DAY">DAY</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer" data-filter="NIGHT">NIGHT</button>
        </div>
        <div class="text-[11px] text-slate-400 font-medium self-end sm:self-auto">
          Aligned with <span class="font-semibold text-slate-600">Draft 4.2</span>
        </div>
      </div>

      <!-- Scenes Grid -->
      <div class="grid grid-cols-1 gap-2" id="scenes-list-grid">
        ${r.map(p=>`
          <div class="scene-row-card bg-white rounded-xl border border-slate-200/80 px-3.5 py-3 shadow-xs hover:border-slate-300 hover:bg-slate-50/50 transition-colors cursor-pointer flex items-center justify-between gap-3 group" data-scene="${p.id}" data-int="${p.intExt}" data-dn="${p.dayNight}">
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <span class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">#${p.sceneNumber}</span>
              <div class="min-w-0 flex-1">
                <h3 class="font-heading font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors truncate">${p.heading}</h3>
                <div class="flex items-center gap-2 text-[11px] text-slate-500 truncate mt-0.5">
                  <span class="font-medium text-slate-700">${p.shootDay}</span>
                  <span>•</span>
                  <span>${p.pages} pgs</span>
                  <span>•</span>
                  <span>${p.intExt} · ${p.dayNight}</span>
                  <span>•</span>
                  <span class="truncate">Cast: ${(p.cast||[]).join(", ")}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 shrink-0">
              ${p.status==="Needs Review"?'<span class="text-[11px] font-medium text-amber-700">Needs Review</span>':'<span class="text-[11px] font-medium text-slate-500">Scheduled</span>'}
              <span class="material-symbols-outlined text-[16px] text-slate-300 group-hover:text-blue-600 transition-colors">
                chevron_right
              </span>
            </div>
          </div>
        `).join("")}
      </div>
    `,i.querySelectorAll(".scene-row-card").forEach(p=>{p.onclick=()=>{const x=p.getAttribute("data-scene");e(`/production/scenes?scriptId=${o}&sceneId=${x}`)}});const u=i.querySelectorAll(".scene-filter-btn");u.forEach(p=>{p.onclick=()=>{u.forEach(c=>{c.classList.remove("bg-blue-600","text-white","shadow-2xs"),c.classList.add("bg-slate-100","text-slate-700")}),p.classList.add("bg-blue-600","text-white","shadow-2xs"),p.classList.remove("bg-slate-100","text-slate-700");const x=p.getAttribute("data-filter");i.querySelectorAll(".scene-row-card").forEach(c=>{x==="all"?c.classList.remove("hidden"):x==="INT"||x==="EXT"?c.classList.toggle("hidden",c.getAttribute("data-int")!==x):(x==="DAY"||x==="NIGHT")&&c.classList.toggle("hidden",c.getAttribute("data-dn")!==x)})}})}}function Hn(e=null,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=t||a.get("scriptId")||h.state.selectedScriptId||"chronicles-of-dust",o=s||a.get("csId"),l=a.get("action")==="new",i=a.get("action")==="edit",r=e||a.get("from"),u=i?`/production/call-sheets?scriptId=${n}&csId=${o}`:o||l?`/production/call-sheets?scriptId=${n}`:"/production",p=r||u;return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${be("Pre-Production",i?"Edit Call Sheet":o?"Call Sheet Inspector":l?"Create New Call Sheet":"Call Sheets Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${He(i?"Edit Call Sheet":o?"Call Sheet Detail":l?"New Call Sheet":"Call Sheets",i?"edit_note":"assignment",p,!o&&!l&&!i?`
            <a href="/production/call-sheets?scriptId=${n}&action=new" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>New Call Sheet</span>
            </a>
          `:"")}

        <div id="callsheet-view-container" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading call sheet records...</div>
        </div>
      </main>

      ${ge("production")}
    </div>
  `}async function Un(e,t=null,s=null,a=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||h.state.selectedScriptId||"chronicles-of-dust",l=a||n.get("csId"),i=n.get("action")==="new",r=n.get("action")==="edit",u=document.getElementById("callsheet-view-container");if(!u)return;const x=(localStorage.getItem("scriptora_prod_role")||"Owner")==="Owner";if(r&&l){const c=await gs(o,l);if(!c){u.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>';return}const d=c.status==="Confirmed"||c.isPublished;u.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col gap-4">
        <!-- Edit Masthead & Revision Notice -->
        <div class="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-bold text-base text-slate-900">Edit Call Sheet #${c.callSheetNumber}</h2>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${d?"bg-amber-50 text-amber-800 border border-amber-200":"bg-blue-50 text-blue-700 border border-blue-200"}">
                ${d?"Branch New Revision Draft":"Editing Draft"}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${c.shootDay} · Baseline: Draft 4.2 (Pinned)</p>
          </div>
          <div class="text-[11px] text-slate-400 font-mono">
            Source: Shooting Schedule Day ${c.shootDay.replace(/[^0-9]/g,"").slice(0,2)||"1"}
          </div>
        </div>

        ${d?`
          <div class="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">info</span>
            <div class="leading-relaxed">
              <span class="font-bold">Published Snapshot Protection:</span> This call sheet is an official published snapshot. Saving your edits will automatically create a new revised draft (<span class="font-semibold underline">Revision 2</span>) for approval without altering the locked historical snapshot.
            </div>
          </div>
        `:""}

        <form id="form-edit-callsheet" class="flex flex-col gap-4 text-xs">
          <!-- Day & Date -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Shooting Day Label</label>
              <input type="text" id="edit-cs-day" value="${c.shootDay}" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600 font-medium">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Shooting Date</label>
              <input type="text" id="edit-cs-date" value="${c.shootDate}" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600 font-medium">
            </div>
          </div>

          <!-- Calls Schedule Grid -->
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-2">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Call Times & Wrap Estimates</span>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label class="font-semibold text-slate-700 block mb-1 text-[11px]">General Crew Call</label>
                <input type="text" id="edit-cs-crewcall" value="${c.generalCrewCall}" required class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-600">
              </div>
              <div>
                <label class="font-semibold text-slate-700 block mb-1 text-[11px]">Shooting Call</label>
                <input type="text" id="edit-cs-shootcall" value="${c.shootingCall}" required class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-600 text-blue-700 font-bold">
              </div>
              <div>
                <label class="font-semibold text-slate-700 block mb-1 text-[11px]">Breakfast Time</label>
                <input type="text" id="edit-cs-breakfast" value="${c.breakfastTime}" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-600">
              </div>
              <div>
                <label class="font-semibold text-slate-700 block mb-1 text-[11px]">Estimated Wrap</label>
                <input type="text" id="edit-cs-wrap" value="${c.estimatedWrap}" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-600">
              </div>
            </div>
          </div>

          <!-- Location & Basecamp -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Set Location & Facility</label>
              <input type="text" id="edit-cs-locname" value="${c.locationName}" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Physical Address / Map GPS</label>
              <input type="text" id="edit-cs-address" value="${c.locationAddress}" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
            </div>
          </div>

          <!-- Parking & Basecamp Notes -->
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Parking & Crew Logistics Instructions</label>
            <textarea id="edit-cs-parking" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600 resize-none">${c.parkingNotes}</textarea>
          </div>

          <!-- Nearest Hospital & Weather -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="font-semibold text-rose-700 block mb-1">Nearest Emergency Hospital</label>
              <input type="text" id="edit-cs-hospital" value="${c.nearestHospital}" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Weather Forecast & Conditions</label>
              <input type="text" id="edit-cs-weather" value="${c.weatherSummary}" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
            </div>
          </div>

          <!-- Special Requirements & Directives -->
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Special Requirements & Department Directives</label>
            <textarea id="edit-cs-instructions" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600 resize-none">${c.specialInstructions||"Standard safety and PPE required."}</textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-between pt-3 border-t border-slate-100">
            <a href="/production/call-sheets?scriptId=${o}&csId=${c.id}" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium">Cancel</a>
            <div class="flex items-center gap-2">
              <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">save</span>
                <span>${d?"Save Revision Draft":"Save Changes"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    `;const m=document.getElementById("form-edit-callsheet");m&&(m.onsubmit=async f=>{f.preventDefault();const b=document.getElementById("edit-cs-day")?.value||c.shootDay,g=document.getElementById("edit-cs-date")?.value||c.shootDate,E=document.getElementById("edit-cs-crewcall")?.value||c.generalCrewCall,A=document.getElementById("edit-cs-shootcall")?.value||c.shootingCall,S=document.getElementById("edit-cs-breakfast")?.value||c.breakfastTime,I=document.getElementById("edit-cs-wrap")?.value||c.estimatedWrap,y=document.getElementById("edit-cs-locname")?.value||c.locationName,k=document.getElementById("edit-cs-address")?.value||c.locationAddress,R=document.getElementById("edit-cs-parking")?.value||c.parkingNotes,K=document.getElementById("edit-cs-hospital")?.value||c.nearestHospital,v=document.getElementById("edit-cs-weather")?.value||c.weatherSummary,L=document.getElementById("edit-cs-instructions")?.value||c.specialInstructions;await Ca(o,c.id,{shootDay:b,shootDate:g,generalCrewCall:E,shootingCall:A,breakfastTime:S,estimatedWrap:I,locationName:y,locationAddress:k,parkingNotes:R,nearestHospital:K,weatherSummary:v,specialInstructions:L,isDraftRevision:d}),w(d?"Saved as new revision draft":"Call Sheet updated successfully"),e(`/production/call-sheets?scriptId=${o}&csId=${c.id}`)})}else if(i){const c=await $t(o);u.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col gap-4">
        <div class="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h2 class="font-heading font-bold text-base text-slate-900">Create Production Call Sheet</h2>
            <p class="text-xs text-slate-500 mt-0.5">Select a confirmed shooting day or configure a standalone manual draft.</p>
          </div>
          <span class="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold">Draft 4.2</span>
        </div>

        <!-- Creation Mode Tabs -->
        <div class="flex items-center gap-2 p-1 bg-slate-100 rounded-xl max-w-sm">
          <button id="tab-linked" class="flex-1 py-1 text-xs font-semibold rounded-lg bg-white text-blue-700 shadow-2xs">
            Schedule-Linked
          </button>
          <button id="tab-manual" class="flex-1 py-1 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900">
            Standalone Manual
          </button>
        </div>

        <form id="form-create-callsheet" class="flex flex-col gap-3 text-xs">
          <!-- Linked Shoot Day Picker -->
          <div id="section-linked-day">
            <label class="font-semibold text-slate-700 block mb-1">Select Confirmed Shoot Day</label>
            <select id="new-cs-day" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none cursor-pointer">
              ${c.map(g=>`
                <option value="${g.dayNumber}" data-title="${g.title}" data-loc="${g.location}" data-date="${g.date}">
                  Day ${g.dayNumber} of 14 · ${g.date} — ${g.title} (${g.location})
                </option>
              `).join("")}
            </select>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Shooting Date</label>
              <input type="text" id="new-cs-date" value="Monday, Oct 26, 2026" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">General Crew Call Time</label>
              <input type="text" id="new-cs-crewcall" value="06:00 AM" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Location Name & Facility</label>
              <input type="text" id="new-cs-locname" value="Perimeter Sector 9" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Physical Address / Map GPS</label>
              <input type="text" id="new-cs-address" value="Cantil Desert Facility, Cantil, CA" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
            </div>
          </div>

          <div>
            <label class="font-semibold text-slate-700 block mb-1">Emergency Hospital & Contact</label>
            <input type="text" id="new-cs-hospital" value="Kern Valley Healthcare District, 6412 Laurel Ave, Lake Isabella, CA (Ph: 760-379-2681)" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
          </div>

          <div>
            <label class="font-semibold text-slate-700 block mb-1">Parking & Basecamp Instructions</label>
            <textarea id="new-cs-parking" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none resize-none">Basecamp Lot 3. Security badge inspection at gate.</textarea>
          </div>

          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <a href="/production/call-sheets?scriptId=${o}" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium">Cancel</a>
            <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs">
              Generate Draft Call Sheet
            </button>
          </div>
        </form>
      </div>
    `;const d=document.getElementById("tab-linked"),m=document.getElementById("tab-manual"),f=document.getElementById("section-linked-day");d&&m&&(d.onclick=()=>{d.classList.add("bg-white","text-blue-700","shadow-2xs"),m.classList.remove("bg-white","text-blue-700","shadow-2xs"),f?.classList.remove("hidden")},m.onclick=()=>{m.classList.add("bg-white","text-blue-700","shadow-2xs"),d.classList.remove("bg-white","text-blue-700","shadow-2xs"),f?.classList.add("hidden")});const b=document.getElementById("form-create-callsheet");b&&(b.onsubmit=async g=>{g.preventDefault();const E=document.getElementById("new-cs-day")?.value||"3",A=document.getElementById("new-cs-date")?.value,S=document.getElementById("new-cs-crewcall")?.value,I=document.getElementById("new-cs-locname")?.value,y=document.getElementById("new-cs-address")?.value,k=document.getElementById("new-cs-hospital")?.value,R=document.getElementById("new-cs-parking")?.value,K=await ka(o,{shootDay:`Day ${E} of 14`,shootDate:A,generalCrewCall:S,shootingCall:"06:30 AM",locationName:I,locationAddress:y,nearestHospital:k,parkingNotes:R});w(`Created Call Sheet #${K.callSheetNumber}`),e(`/production/call-sheets?scriptId=${o}&csId=${K.id}`)})}else if(l){const c=await gs(o,l);if(!c){u.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>';return}const d=c.status==="Confirmed"||c.isPublished;u.innerHTML=`
      <!-- Top Action Banner -->
      <div class="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
            #${c.callSheetNumber}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-semibold text-sm text-slate-900">Call Sheet #${c.callSheetNumber}</h2>
              <span class="px-2 py-0.5 rounded-md text-[10px] font-medium border ${d?"bg-slate-50 text-slate-600 border-slate-200":"bg-amber-50 text-amber-700 border-amber-200"}">
                ${d?"Published Snapshot":"Draft — Pending Owner Approval"}
              </span>
            </div>
            <p class="text-[11px] text-slate-500 mt-0.5">${c.shootDay} · ${c.shootDate}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <a href="/production/call-sheets?scriptId=${o}&csId=${c.id}&action=edit" id="btn-edit-callsheet" class="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer" title="Edit Call Sheet fields and create revision">
            <span class="material-symbols-outlined text-[16px]">edit</span>
            <span>Edit</span>
          </a>
          <button id="btn-print-callsheet" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
            <span class="material-symbols-outlined text-[16px]">print</span>
            <span>Print / PDF</span>
          </button>
          ${!d&&x?`
            <button id="btn-publish-callsheet" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Approve & Publish</span>
            </button>
          `:""}
        </div>
      </div>

      <!-- Printable Call Sheet Container -->
      <div id="printable-callsheet" class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-5 text-xs text-slate-800">
        <!-- Call Sheet Masthead -->
        <div class="border-b-2 border-slate-900 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span class="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold">SCRIPTORA OFFICIAL CALL SHEET</span>
            <h1 class="font-heading font-extrabold text-xl text-slate-900 leading-tight">CHRONICLES OF DUST</h1>
            <p class="text-xs text-slate-600 font-medium">Production Company: Badlands Anthology LLC · Baseline: Draft 4.2</p>
          </div>
          <div class="text-left sm:text-right">
            <div class="font-mono text-sm font-bold text-slate-900">${c.shootDay.toUpperCase()}</div>
            <div class="text-xs text-slate-600 font-semibold">${c.shootDate}</div>
          </div>
        </div>

        <!-- Times & Weather Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">General Crew Call</span>
            <div class="font-heading font-bold text-sm text-slate-900">${c.generalCrewCall}</div>
          </div>
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">Shooting Call</span>
            <div class="font-heading font-bold text-sm text-blue-700">${c.shootingCall}</div>
          </div>
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">Breakfast</span>
            <div class="font-heading font-bold text-sm text-slate-900">${c.breakfastTime}</div>
          </div>
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">Estimated Wrap</span>
            <div class="font-heading font-bold text-sm text-slate-900">${c.estimatedWrap}</div>
          </div>
        </div>

        <!-- Location & Hospital Directives -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="p-3.5 rounded-xl border border-slate-200/80 flex flex-col gap-1">
            <span class="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px] text-blue-600">location_on</span>
              <span>Set Location & Parking</span>
            </span>
            <div class="font-semibold text-slate-900 text-xs">${c.locationName}</div>
            <p class="text-slate-600 text-[11px]">${c.locationAddress}</p>
            <p class="text-slate-500 text-[11px] mt-1 italic">${c.parkingNotes}</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col gap-1">
            <span class="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px] text-rose-600">local_hospital</span>
              <span>Nearest Emergency Hospital</span>
            </span>
            <p class="text-slate-800 text-[11px] font-medium leading-relaxed">${c.nearestHospital}</p>
            <div class="text-[10px] text-slate-400 mt-1">Weather: ${c.weatherSummary}</div>
          </div>
        </div>

        <!-- Scenes to Shoot Schedule Table -->
        <div>
          <h3 class="font-heading font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">Scenes To Shoot</h3>
          <div class="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
            <div class="bg-slate-100/80 px-3 py-1.5 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
              <span class="w-16">Scene #</span>
              <span class="flex-1">Heading / Description</span>
              <span class="w-20 text-center">Pages</span>
              <span class="w-32 text-right">Cast Members</span>
            </div>
            ${(c.scenes||[]).map(b=>`
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <a href="/production/scenes?scriptId=${o}&sceneId=scene-${b.sceneNumber}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${o}&csId=${c.id}`)}" class="w-16 font-mono font-bold text-blue-700 hover:underline" title="Inspect Scene Logistics">Sc ${b.sceneNumber}</a>
                <div class="flex-1 min-w-0 pr-2">
                  <div class="font-semibold text-slate-900 truncate">${b.heading}</div>
                  <div class="text-[11px] text-slate-500 truncate">${b.desc}</div>
                </div>
                <span class="w-20 text-center font-mono text-[11px]">${b.pages}</span>
                <span class="w-32 text-right font-medium text-[11px] text-slate-700 truncate">${(b.cast||[]).map(g=>`<a href="/production/breakdown?scriptId=${o}&category=Cast&character=${encodeURIComponent(g)}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${o}&csId=${c.id}`)}" class="hover:underline font-semibold" title="Inspect ${g} in Breakdown">${g}</a>`).join(", ")}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Cast & Talent Call Table -->
        <div>
          <h3 class="font-heading font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">Cast & Talent Calls</h3>
          <div class="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
            <div class="bg-slate-100/80 px-3 py-1.5 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
              <span class="w-32">Character</span>
              <span class="flex-1">Actor</span>
              <span class="w-20 text-center">Pickup</span>
              <span class="w-20 text-center">H/MU</span>
              <span class="w-20 text-right">Set Call</span>
            </div>
            ${(c.castCalls||[]).map(b=>`
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <a href="/production/breakdown?scriptId=${o}&category=Cast&character=${encodeURIComponent(b.character)}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${o}&csId=${c.id}`)}" class="w-32 font-bold text-slate-900 hover:text-blue-700 hover:underline" title="Inspect ${b.character} in Breakdown">${b.character}</a>
                <span class="flex-1 font-medium text-slate-700">${b.actor}</span>
                <span class="w-20 text-center font-mono text-[11px] text-slate-600">${b.pickup}</span>
                <span class="w-20 text-center font-mono text-[11px] text-slate-600">${b.hmuCall}</span>
                <span class="w-20 text-right font-mono font-bold text-blue-700">${b.onSet}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Special Notes Footer -->
        <div class="p-3 bg-amber-50/50 border border-amber-200/80 rounded-xl">
          <span class="font-bold text-amber-900 uppercase text-[10px]">Safety & Production Directives:</span>
          <p class="text-amber-800 text-[11px] mt-0.5 leading-relaxed">${c.specialInstructions}</p>
        </div>
      </div>
    `;const m=document.getElementById("btn-print-callsheet");m&&(m.onclick=()=>{window.print(),w("Print dialog launched")});const f=document.getElementById("btn-publish-callsheet");f&&(f.onclick=async()=>{confirm("Approve and lock this call sheet as an official immutable snapshot?")&&(await Ea(o,c.id),w("Call Sheet published & snapshot locked"),e(`/production/call-sheets?scriptId=${o}&csId=${c.id}`))})}else{const c=await Pt(o);u.innerHTML=`
      <div class="flex items-center justify-between">
        <h2 class="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px] text-blue-600">assignment</span>
          <span>Call Sheets Catalogue (${c.length})</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${c.map(d=>{const m=d.status==="Confirmed"||d.isPublished;return`
            <div class="cs-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group" data-id="${d.id}">
              <div>
                <div class="flex items-center justify-between mb-3">
                    <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      #${d.callSheetNumber}
                    </div>
                    <div>
                      <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">${d.shootDay}</h3>
                      <p class="text-[11px] text-slate-500">${d.shootDate}</p>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-medium ${m?"bg-slate-100 text-slate-700":"bg-amber-50/80 border border-amber-200 text-amber-800"}">
                    ${m?"Published":"Draft"}
                  </span>
                </div>

                <div class="space-y-1.5 text-xs text-slate-600 mt-2">
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[15px] text-slate-400">schedule</span>
                    <span>General Call: <strong class="text-slate-800">${d.generalCrewCall}</strong> · Set: <strong class="text-blue-600">${d.shootingCall}</strong></span>
                  </div>
                  <div class="flex items-center gap-1.5 truncate">
                    <span class="material-symbols-outlined text-[15px] text-slate-400">location_on</span>
                    <span class="truncate">${d.locationName}</span>
                  </div>
                </div>
              </div>

              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>View & Print Call Sheet</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>
          `}).join("")}
      </div>
    `,u.querySelectorAll(".cs-card").forEach(d=>{d.onclick=()=>{const m=d.getAttribute("data-id");e(`/production/call-sheets?scriptId=${o}&csId=${m}`)}})}}function Fn(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||h.state.selectedScriptId;const a=s.get("mode")||"dialogue",n=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${be("Pre-Production","Dialogue Sheets & Actor Sides")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${He("Dialogue Sheets & Actor Sides","record_voice_over",n||"/production",`
          <button id="btn-export-pdf" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">print</span>
            <span>Export PDF</span>
          </button>
        `)}

        <!-- Mode Switcher Tabs (2 distinct modes) -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="flex items-center bg-slate-100 p-1 rounded-xl max-w-xs">
            <button id="tab-mode-dialogue" class="flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${a==="dialogue"?"bg-white text-blue-600 shadow-2xs":"text-slate-600 hover:text-slate-900"}">
              Dialogue Sheets
            </button>
            <button id="tab-mode-sides" class="flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${a==="sides"?"bg-white text-blue-600 shadow-2xs":"text-slate-600 hover:text-slate-900"}">
              Actor Sides
            </button>
          </div>

          <!-- Dynamic Selector based on active mode -->
          <div class="flex items-center gap-2" id="filter-controls">
            <!-- Rendered via JS -->
          </div>
        </div>

        <!-- Document Viewer Area -->
        <div id="dialogue-sides-content" class="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs flex flex-col gap-4 font-mono text-xs text-slate-800">
          <div class="text-center text-slate-400 py-8 font-sans">Generating extract...</div>
        </div>

      </main>

      ${ge("production")}
    </div>
  `}async function qn(e,t=null,s=null){const a=new URLSearchParams(window.location.search||"");s||a.get("scriptId")||h.state.selectedScriptId;let n=a.get("mode")||"dialogue",o="KEVIN",l=a.get("scene")||"18";const i=document.getElementById("tab-mode-dialogue"),r=document.getElementById("tab-mode-sides"),u=document.getElementById("filter-controls"),p=document.getElementById("dialogue-sides-content"),x=[{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"KEVIN",parenthetical:"(adjusting filter)",dialogue:"Wind gauge is spiking past forty knots, Marcus. Did you check the terminal pressure at the intake valve?",action:"Kevin wipes gritty red dust from the gauge glass with his thumb."},{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"MARCUS",parenthetical:"(shrugging)",dialogue:"Telemetry's been on the fritz since dawn. Central syndicate says it's thermal fluctuation.",action:"Marcus gestures with a cigarette toward the desert horizon."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"MEERA",parenthetical:"(eyes on monitor)",dialogue:"That's no fluctuation. Look at line three. Someone bypassed the telemetry loop eighty miles upriver.",action:"Meera brings up a wireframe map showing a hidden subterranean siphon branch."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"KEVIN",parenthetical:"(tense)",dialogue:"They're siphoning straight out of the municipal reservoir into private holding tanks.",action:"Kevin taps the terminal screen, freezing the anomaly coordinates."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"COMMANDER VANCE",parenthetical:"(smooth, unhurried)",dialogue:"Water belongs to those who possess the energy to lift it from the rock, Kevin. The frontier was built on that premise.",action:"Vance sips cold tea, watching the massive hydraulic pump pistons rise and plunge."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"KEVIN",parenthetical:"(stepping forward)",dialogue:"You signed the 2041 Treaty. If the southern aquifer collapses, ten thousand families wake up to dry taps.",action:"Kevin places the legal registry deed onto Vance's polished mahogany desk."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(shouting over the roar)",dialogue:"Hold the pylon, Meera! If the high-pressure valve seals now, the back-surge will fracture the entire chamber!",action:"Brine water sprays across Kevin's visor as he locks the hydraulic bypass manifold."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"MEERA",parenthetical:"(straining on cable)",dialogue:"Then don't let them break! Reroute the secondary relay through the floodgate breaker!",action:"Meera kicks off the iron catwalk, swinging across the chasm to secure the emergency lock."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(levering the valve bar)",dialogue:"Bypass locked! Bleed the line! Three... two... one!",action:"The pressure needles drop from red to blue as the municipal pipeline fills with fresh current."}];function c(){if(u)if(n==="dialogue"){u.innerHTML=`
        <span class="text-xs font-semibold text-slate-500">Character:</span>
        <select id="char-select" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-900 focus:outline-none cursor-pointer">
          <option value="KEVIN" ${o==="KEVIN"?"selected":""}>KEVIN (Lead)</option>
          <option value="MEERA" ${o==="MEERA"?"selected":""}>MEERA (Lead)</option>
          <option value="COMMANDER VANCE" ${o==="COMMANDER VANCE"?"selected":""}>COMMANDER VANCE</option>
          <option value="MARCUS" ${o==="MARCUS"?"selected":""}>MARCUS</option>
        </select>
      `;const f=document.getElementById("char-select");f&&(f.onchange=b=>{o=b.target.value,d()})}else{u.innerHTML=`
        <span class="text-xs font-semibold text-slate-500">Scene Extract:</span>
        <select id="scene-select" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-900 focus:outline-none cursor-pointer">
          <option value="1" ${l==="1"?"selected":""}>Scene 1 — Outpost Gate 4</option>
          <option value="2" ${l==="2"?"selected":""}>Scene 2 — Customs Shed</option>
          <option value="7" ${l==="7"?"selected":""}>Scene 7 — Syndicate Control</option>
          <option value="18" ${l==="18"?"selected":""}>Scene 18 — Chamber B Climax</option>
        </select>
      `;const f=document.getElementById("scene-select");f&&(f.onchange=b=>{l=b.target.value,d()})}}function d(){if(p)if(n==="dialogue"){const f=x.filter(b=>b.character===o);p.innerHTML=`
        <!-- Watermark Header -->
        <div class="border-b-2 border-slate-900 pb-3 font-sans flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">SCRIPTORA · PRODUCTION EXTRACT</div>
            <h2 class="font-heading font-extrabold text-lg text-slate-900">CHARACTER DIALOGUE SHEET — ${o}</h2>
            <div class="text-[11px] text-slate-600 font-medium">Screenplay: Chronicles of Dust · Pinned Version: Draft 4.2</div>
          </div>
          <div class="text-left sm:text-right text-[11px] text-slate-500">
            <div>Lines: ${f.length} Cues</div>
            <div>Date: ${new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <!-- Dialogue Elements -->
        <div class="space-y-6 pt-2 max-w-2xl mx-auto">
          ${f.map((b,g)=>`
            <div class="space-y-1">
              <div class="font-sans font-bold text-[11px] text-blue-700 uppercase tracking-wider">
                SCENE ${b.sceneNum} — ${b.heading}
              </div>
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest pt-2">
                ${b.character}
              </div>
              ${b.parenthetical?`
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${b.parenthetical}
                </div>
              `:""}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto text-left">
                ${b.dialogue}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="border-t border-slate-200 pt-3 mt-6 text-center font-sans text-[10px] text-slate-400">
          Generated from Draft 4.2 pinned baseline. Exact dialogue punctuation and wording preserved.
        </div>
      `}else{const f=x.filter(g=>String(g.sceneNum)===String(l)),b=f[0]||{heading:`SCENE ${l}`};p.innerHTML=`
        <!-- Sides Masthead -->
        <div class="border-b-2 border-slate-900 pb-3 font-sans flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">SCRIPTORA · PRODUCTION SIDES</div>
            <h2 class="font-heading font-extrabold text-lg text-slate-900">ACTOR SIDES — SCENE ${l}</h2>
            <div class="text-[11px] text-slate-600 font-medium">${b.heading} · Draft 4.2</div>
          </div>
          <div class="text-left sm:text-right text-[11px] text-slate-500">
            <div>Rehearsal & On-Set Copy</div>
            <div>Generated: Today</div>
          </div>
        </div>

        <!-- Formatted Script Scene Beat -->
        <div class="space-y-4 pt-2 max-w-2xl mx-auto leading-relaxed">
          <div class="font-bold text-[13px] text-slate-900 uppercase">
            ${b.heading}
          </div>

          ${f.map(g=>`
            <div class="space-y-1 my-3">
              ${g.action?`
                <div class="text-slate-700 text-[12px] leading-relaxed italic mb-2">
                  ${g.action}
                </div>
              `:""}
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest">
                ${g.character}
              </div>
              ${g.parenthetical?`
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${g.parenthetical}
                </div>
              `:""}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto">
                ${g.dialogue}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="border-t border-slate-200 pt-3 mt-6 text-center font-sans text-[10px] text-slate-400">
          END OF SCENE ${l} SIDES · STAMPED APPROVED DRAFT 4.2
        </div>
      `}}i&&r&&(i.onclick=()=>{n="dialogue",i.classList.add("bg-white","text-blue-600","shadow-2xs"),r.classList.remove("bg-white","text-blue-600","shadow-2xs"),c(),d()},r.onclick=()=>{n="sides",r.classList.add("bg-white","text-blue-600","shadow-2xs"),i.classList.remove("bg-white","text-blue-600","shadow-2xs"),c(),d()});const m=document.getElementById("btn-export-pdf");m&&(m.onclick=()=>{window.print(),w(`Exported ${n==="dialogue"?`${o} Dialogue Sheet`:`Scene ${l} Actor Sides`} PDF`)}),c(),d()}function Vn(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||h.state.selectedScriptId;const a=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${be("Pre-Production","Master Shooting Schedule & Stripboard")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${He("Shooting Schedule & Stripboard","calendar_view_week",a||"/production",`
          <button id="btn-confirm-schedule" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">lock</span>
            <span>Confirm Schedule</span>
          </button>
        `)}

        <!-- Schedule Status Summary -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <div class="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div class="p-2 sm:px-3 first:pl-1">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Shoot Window</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">14 Days</div>
              <span class="text-[11px] text-slate-400">Oct 24 – Nov 06</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Scheduled</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">18 of 18 Scenes</div>
              <span class="text-[11px] text-slate-400">100% Allocated</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Total Pages</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">96.0 Pages</div>
              <span class="text-[11px] text-slate-400">Avg 6.8 pgs / day</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Company Moves</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">4 Moves</div>
              <span class="text-[11px] text-slate-400">Mojave perimeter</span>
            </div>
          </div>
        </div>

        <!-- Stripboard Days Stream -->
        <div id="stripboard-days-list" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading master stripboard...</div>
        </div>

      </main>

      ${ge("production")}
    </div>
  `}async function Gn(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=s||a.get("scriptId")||h.state.selectedScriptId||"chronicles-of-dust",o=document.getElementById("stripboard-days-list");if(!o)return;const l=async()=>{const u=await $t(n),p=await Ut(n);o.innerHTML=u.map(x=>{const c=x.isLocked,d=x.status==="Confirmed",m=p.filter(f=>(x.sceneNumbers||[]).includes(f.sceneNumber));return`
        <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-3" data-day="${x.dayNumber}">
          <!-- Day Strip Header -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-heading font-bold text-xs shrink-0">
                D${x.dayNumber}
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <h3 class="font-heading font-semibold text-xs sm:text-sm text-slate-900 truncate">Day ${x.dayNumber} — ${x.title}</h3>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-medium border ${d?"bg-slate-50 text-slate-600 border-slate-200":"bg-amber-50 text-amber-700 border-amber-200"}">
                    ${d?"Confirmed":"Draft"}
                  </span>
                </div>
                <div class="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <span class="font-medium text-slate-700">${x.date}</span>
                  <span>•</span>
                  <span>${x.location}</span>
                  <span>•</span>
                  <span>${x.totalPages} pgs · ${x.estHours} hrs</span>
                </div>
              </div>
            </div>

            <!-- Day Actions: Lock Toggle -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button class="btn-toggle-lock px-2 py-1 rounded-lg border border-slate-200 ${c?"bg-slate-100 text-slate-700 font-semibold":"bg-white hover:bg-slate-50 text-slate-500"} text-xs flex items-center gap-1 transition-colors" data-day="${x.dayNumber}" title="${c?"Day locked against auto-reorder":"Lock day"}">
                <span class="material-symbols-outlined text-[15px]">${c?"lock":"lock_open"}</span>
                <span class="hidden sm:inline">${c?"Locked":"Lock"}</span>
              </button>
            </div>
          </div>

          <!-- Scenes in this Day (Clean Neutral Strips) -->
          <div class="flex flex-col gap-1.5">
            ${m.length>0?m.map(f=>`
              <div class="strip-card rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50/50 p-2.5 flex items-center justify-between gap-3 text-xs shadow-2xs transition-colors">
                <div class="flex items-center gap-2.5 min-w-0 flex-1">
                  <span class="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">#${f.sceneNumber}</span>
                  <span class="font-bold text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0 font-mono">${f.intExt} · ${f.dayNight}</span>
                  <span class="font-medium text-slate-800 truncate">${f.heading}</span>
                </div>

                <div class="flex items-center gap-3 shrink-0 text-[11px]">
                  <span class="text-slate-400">${f.pages} pgs</span>
                  <span class="hidden md:inline text-slate-500 truncate max-w-[150px]">Cast: ${(f.cast||[]).map(b=>`<a href="/production/breakdown?scriptId=${n}&category=Cast&character=${encodeURIComponent(b)}&from=${encodeURIComponent(`/production/schedule?scriptId=${n}`)}" class="hover:underline hover:text-blue-600 font-medium" title="Inspect ${b} in Breakdown">${b}</a>`).join(", ")}</span>
                  <a href="/production/scenes?scriptId=${n}&sceneId=${f.id}&from=${encodeURIComponent(`/production/schedule?scriptId=${n}`)}" class="text-blue-600 hover:text-blue-800 font-semibold text-[11px] transition-colors" title="View Scene Logistics">
                    Inspect
                  </a>
                </div>
              </div>
            `).join(""):`
              <div class="text-center py-2 text-slate-400 text-xs italic">No scenes assigned to this day.</div>
            `}
          </div>
        </div>
      `}).join(""),o.querySelectorAll(".btn-toggle-lock").forEach(x=>{x.onclick=async()=>{const c=x.getAttribute("data-day"),m=(await $t(n)).find(f=>f.dayNumber===Number(c));if(m){const f=!m.isLocked;await Aa(n,c,{isLocked:f}),w(`Day ${c} ${f?"locked":"unlocked"}`),l()}}})};await l();const i=document.getElementById("btn-confirm-schedule");i&&(i.onclick=async()=>{confirm("Confirm and lock the 14-day master stripboard schedule for chronicles-of-dust?")&&(await Ta(n),w("14-day shooting schedule confirmed and locked by Owner"),l())});const r=document.getElementById("btn-propose-schedule");r&&(r.onclick=()=>{w("Schedule re-optimized: Company moves clustered to Mojave perimeter")})}function Wn(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||h.state.selectedScriptId;const a=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${be("Pre-Production","Production Resource Directory")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${He("Production Directory","contact_phone",a||"/production",`
          <button id="btn-add-resource" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">person_add</span>
            <span>Add Resource</span>
          </button>
        `)}

        <!-- Search & Category Filters -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs shrink-0" id="dir-cat-filters">
            <button class="dir-cat-btn px-2.5 py-1 rounded-xl font-semibold bg-blue-600 text-white shadow-2xs" data-cat="all">All Resources</button>
            <button class="dir-cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Cast">Cast</button>
            <button class="dir-cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Location">Locations</button>
            <button class="dir-cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Props">Props</button>
            <button class="dir-cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Vehicles">Vehicles</button>
          </div>

          <div class="relative flex-1 sm:max-w-xs">
            <span class="material-symbols-outlined text-[16px] text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">search</span>
            <input type="text" id="dir-search" placeholder="Search contacts & resources..." class="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500">
          </div>
        </div>

        <!-- Privacy & Role Permission Notice -->
        <div class="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 flex items-center justify-between gap-2 text-xs text-slate-600">
          <div class="flex items-center gap-2 min-w-0">
            <span class="material-symbols-outlined text-[18px] text-slate-500 shrink-0">shield</span>
            <span class="truncate">Contact info access is enforced by current role permissions (<strong class="text-slate-900" id="dir-role-label">Owner</strong>).</span>
          </div>
          <span class="text-[10px] text-slate-400 font-mono shrink-0">Confidential</span>
        </div>

        <!-- Resources Stream List -->
        <div id="dir-resources-list" class="flex flex-col gap-2.5">
          <div class="p-8 text-center text-slate-400 text-xs">Loading directory resources...</div>
        </div>

      </main>

      ${ge("production")}

      <!-- Add Resource Modal -->
      <div id="modal-add-resource" class="hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 class="font-heading font-bold text-sm text-slate-900">Add Production Resource</h3>
            <button id="close-res-modal" class="text-slate-400 hover:text-slate-700">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <form id="form-add-resource" class="p-5 flex flex-col gap-3 text-xs">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Resource Name</label>
              <input type="text" id="res-name" required placeholder="e.g. Elena Rostova / Lakebed Generator" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Category</label>
                <select id="res-cat" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
                  <option value="Cast">Cast</option>
                  <option value="Crew">Crew</option>
                  <option value="Location">Location</option>
                  <option value="Props">Props</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Department</label>
                <input type="text" id="res-dept" placeholder="Casting, Art, SFX..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
              </div>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Role / Description</label>
              <input type="text" id="res-role" placeholder="e.g. Lead Hydro-engineer" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Contact Email / Phone</label>
              <input type="text" id="res-contact" placeholder="management@agency.com" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
            </div>
            <div class="flex items-center gap-2">
              <input type="checkbox" id="res-restricted" checked class="w-4 h-4 accent-blue-600">
              <label for="res-restricted" class="text-slate-700 font-medium">Protect contact details (Owner & Production only)</label>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" id="btn-cancel-res" class="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium">Cancel</button>
              <button type="submit" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs">Save Resource</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `}async function Kn(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=s||a.get("scriptId")||h.state.selectedScriptId||"chronicles-of-dust",o=localStorage.getItem("scriptora_prod_role")||"Owner",l=o==="Owner"||o==="Production",i=document.getElementById("dir-role-label");i&&(i.textContent=o);let r="all",u="";const p=async()=>{const S=(await Zt(n,r)).filter(y=>{if(!u)return!0;const k=u.toLowerCase();return y.name.toLowerCase().includes(k)||y.role&&y.role.toLowerCase().includes(k)||y.department&&y.department.toLowerCase().includes(k)}),I=document.getElementById("dir-resources-list");if(I){if(S.length===0){I.innerHTML=`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400 text-xs">
          No resources found matching the criteria.
        </div>
      `;return}I.innerHTML=S.map(y=>{const R=y.contactRestricted&&!l?'<span class="italic text-slate-400 font-sans">[Restricted — Production Authorized Only]</span>':`<span class="font-mono text-slate-800">${y.contact||"No contact on file"}</span>`;return`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-start gap-3 min-w-0">
            <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 font-mono font-bold text-xs mt-0.5">
              ${y.category.slice(0,3).toUpperCase()}
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="font-heading font-semibold text-sm text-slate-900">${y.name}</h3>
                <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">${y.department||y.category}</span>
                <span class="px-2 py-0.5 rounded-md text-[10px] font-medium ${y.status==="Confirmed"?"bg-slate-100 text-slate-700":"bg-amber-50/80 border border-amber-200 text-amber-800"}">
                  ${y.status||"Active"}
                </span>
              </div>
              <p class="text-xs text-slate-600 mt-0.5">${y.role||y.notes||""}</p>
              
              <div class="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500 flex-wrap">
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px] text-slate-400">mail</span>
                  <span>${R}</span>
                </div>
                ${y.scenes&&y.scenes.length>0?`
                  <div class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-slate-400">movie</span>
                    <span>Scenes: <strong>${y.scenes.join(", ")}</strong></span>
                  </div>
                `:""}
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            <span class="text-[10px] px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 font-medium">
              Verified Resource
            </span>
          </div>
        </div>
      `}).join("")}};await p(),document.querySelectorAll(".dir-cat-btn").forEach(A=>{A.onclick=()=>{document.querySelectorAll(".dir-cat-btn").forEach(S=>{S.classList.remove("bg-blue-600","text-white","shadow-2xs"),S.classList.add("bg-slate-100","text-slate-700")}),A.classList.add("bg-blue-600","text-white","shadow-2xs"),A.classList.remove("bg-slate-100","text-slate-700"),r=A.getAttribute("data-cat"),p()}});const x=document.getElementById("dir-search");x&&(x.oninput=A=>{u=A.target.value,p()});const c=document.getElementById("modal-add-resource"),d=document.getElementById("btn-add-resource"),m=document.getElementById("close-res-modal"),f=document.getElementById("btn-cancel-res"),b=document.getElementById("form-add-resource"),g=()=>c?.classList.remove("hidden"),E=()=>c?.classList.add("hidden");d&&(d.onclick=g),m&&(m.onclick=E),f&&(f.onclick=E),b&&(b.onsubmit=async A=>{A.preventDefault();const S=document.getElementById("res-name")?.value,I=document.getElementById("res-cat")?.value,y=document.getElementById("res-dept")?.value,k=document.getElementById("res-role")?.value,R=document.getElementById("res-contact")?.value,K=document.getElementById("res-restricted")?.checked,v=await Zt(n),L={id:`res-${Date.now()}`,scriptId:n,name:S,category:I,department:y,role:k,contact:R,contactRestricted:K,status:"Confirmed",scenes:["Scene 18"]};v.unshift(L),localStorage.setItem(`scriptora_prod_res_${n}`,JSON.stringify(v)),w(`Added resource "${S}"`),E(),b.reset(),p()})}function Jn(e=null,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=t||a.get("scriptId")||h.state.selectedScriptId||"chronicles-of-dust",o=s||a.get("docId"),l=e||a.get("from"),i=o?`/production/documents?scriptId=${n}`:"/production";return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${be("Pre-Production",o?"Production Document Viewer":"Production Documents Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${He(o?"Document Viewer":"Documents Workspace","description",l||i,o?`
            <button id="btn-export-doc-pdf" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
              <span class="material-symbols-outlined text-[16px]">print</span>
              <span>Export PDF</span>
            </button>
          `:"")}

        <div id="docs-workspace-container" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading production documents...</div>
        </div>
      </main>

      ${ge("production")}
    </div>
  `}async function zn(e,t=null,s=null,a=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||h.state.selectedScriptId||"chronicles-of-dust",l=a||n.get("docId"),i=document.getElementById("docs-workspace-container");if(!i)return;const r=await Ps(o);if(l){const u=r.find(c=>c.id===l)||r[0];i.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
            <span class="material-symbols-outlined text-[20px]">description</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-bold text-base text-slate-900">${u.title}</h2>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${u.status==="Confirmed"?"bg-emerald-50 text-emerald-700":"bg-slate-100 text-slate-600"}">
                ${u.status}
              </span>
            </div>
            <p class="text-xs text-slate-500">${u.type} · Version ${u.version||"v1.0"} · Pinned: ${u.sourceVersion||"Draft 4.2"}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button id="btn-share-link" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors">
            <span class="material-symbols-outlined text-[16px]">share</span>
            <span>Revocable Link</span>
          </button>
        </div>
      </div>

      <!-- Document Content Body -->
      <div id="print-doc-area" class="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs flex flex-col gap-4 text-xs text-slate-800 font-mono">
        <div class="border-b-2 border-slate-900 pb-3 flex items-end justify-between font-sans">
          <div>
            <span class="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold">SCRIPTORA OFFICIAL PRODUCTION RECORD</span>
            <h1 class="font-heading font-extrabold text-xl text-slate-900 mt-0.5">${u.title.toUpperCase()}</h1>
            <p class="text-xs text-slate-600">Screenplay: Chronicles of Dust (Feature) · Source Draft: ${u.sourceVersion}</p>
          </div>
          <div class="text-right text-[11px] text-slate-500">
            <div>Version: ${u.version}</div>
            <div>Generated: Today</div>
          </div>
        </div>

        <div class="space-y-3 font-sans text-xs pt-2">
          <p class="leading-relaxed text-slate-700">
            This document represents an officially versioned pre-production snapshot approved by the project Owner. All element references, scene associations, and actor callouts adhere to the pinned screenplay baseline.
          </p>

          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div class="font-bold text-slate-900">Document Metadata:</div>
            <div>Category: ${u.type}</div>
            <div>Screenplay Baseline: Draft 4.2 (Hash: 88f2)</div>
            <div>Approval Status: ${u.status}</div>
            <div>Distribution Status: ${u.published?"Published to Crew":"Internal Working Draft"}</div>
          </div>
        </div>

        <div class="border-t border-slate-200 pt-3 mt-4 text-center font-sans text-[10px] text-slate-400">
          PROTECTED BY SCRIPTORA PRODUCTION ARCHITECTURE · IMMUTABLE POINT-IN-TIME AUDIT RECORD
        </div>
      </div>
    `;const p=document.getElementById("btn-export-doc-pdf");p&&(p.onclick=()=>{window.print(),w("Printing official document PDF")});const x=document.getElementById("btn-share-link");x&&(x.onclick=()=>{const c=`${window.location.origin}/production/documents?docId=${u.id}&token=exp_${Date.now()+864e5}`;navigator.clipboard?.writeText(c),w("Revocable 24-hour access link copied to clipboard")})}else{const u=[{name:"Script Preparation",desc:"Breakdown sheets, appearance lists, and department master lists.",items:[{title:"Full Script Breakdown Sheet",type:"Script Breakdown",status:"Confirmed",ver:"v1.4",id:"doc-sb-1"},{title:"Character Appearance Master List",type:"Cast List",status:"Confirmed",ver:"v1.2",id:"doc-ca-1"},{title:"Props & Practical SFX Register",type:"Props Master",status:"Needs Review",ver:"v1.0",id:"doc-pr-1"}]},{name:"Actors and Rehearsal",desc:"Actor sides, character speech cues, and rehearsal extracts.",items:[{title:"Actor Sides — Kevin & Meera (Scene 18)",type:"Actor Sides",status:"Confirmed",ver:"v1.2",id:"doc-ds-1"},{title:"Lead Character Dialogue Sheets",type:"Dialogue Sheet",status:"Confirmed",ver:"v1.0",id:"doc-ds-2"}]},{name:"Scheduling",desc:"Master stripboards, daily scene allocations, and DOOD reports.",items:[{title:"Master 14-Day Stripboard Schedule",type:"Shooting Schedule",status:"Confirmed",ver:"v2.1",id:"doc-ss-1"},{title:"Cast Day-Out-of-Days (DOOD) Report",type:"DOOD",status:"Confirmed",ver:"v1.1",id:"doc-dood-1"}]},{name:"On-Set Production",desc:"Daily call sheets, camera shot lists, and daily logs.",items:[{title:"Call Sheet #01 — Gate 4 Day Exterior",type:"Call Sheet",status:"Confirmed",ver:"v1.0",id:"doc-cs-1"},{title:"Call Sheet #02 — Pumping Station Chamber",type:"Call Sheet",status:"Draft",ver:"v0.9",id:"doc-cs-2"}]},{name:"Management & Pre-Flight",desc:"Resource directories, emergency contacts, and readiness checks.",items:[{title:"Cast & Crew Emergency Contact Directory",type:"Directory",status:"Confirmed",ver:"v1.0",id:"doc-dir-1"},{title:"Pre-Production Readiness Audit Report",type:"Readiness Report",status:"Confirmed",ver:"v1.0",id:"doc-read-1"}]}];i.innerHTML=`
      <div class="flex flex-col gap-5">
        ${u.map(p=>`
          <section class="flex flex-col gap-2.5">
            <div>
              <h2 class="font-heading font-bold text-xs uppercase tracking-wider text-slate-800">${p.name}</h2>
              <p class="text-[11px] text-slate-500">${p.desc}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              ${p.items.map(x=>`
                <div class="doc-card bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group" data-id="${x.id}">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-[10px] font-bold text-slate-400 uppercase">${x.type}</span>
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${x.status==="Confirmed"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}">
                        ${x.status}
                      </span>
                    </div>
                    <h3 class="font-heading font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">${x.title}</h3>
                  </div>

                  <div class="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                    <span class="text-slate-400 font-mono text-[10px]">${x.ver}</span>
                    <span class="flex items-center gap-0.5">
                      <span>View</span>
                      <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                    </span>
                  </div>
                </div>
              `).join("")}
            </div>
          </section>
        `).join("")}
      </div>
    `,i.querySelectorAll(".doc-card").forEach(p=>{p.onclick=()=>{const x=p.getAttribute("data-id");e(`/production/documents?scriptId=${o}&docId=${x}`)}})}}function Yn(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||h.state.selectedScriptId;const a=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${be("Pre-Production","Production Change Proposals & Approvals")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${He("Change Proposals & Approvals","rule",a||"/production",`
          <button id="btn-new-proposal" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Submit Proposal</span>
          </button>
        `)}

        <!-- Banner Explaining Owner Authority & Version Integrity -->
        <div class="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-3.5 flex items-start justify-between gap-3 shadow-2xs">
          <div class="flex items-start gap-2.5">
            <span class="material-symbols-outlined text-[20px] text-amber-600 shrink-0 mt-0.5">verified_user</span>
            <div class="text-xs text-amber-950 leading-relaxed">
              <span class="font-bold">Collaborator Proposal Governance:</span> Changes to confirmed production logistics remain staged until reviewed and confirmed by the project <strong class="underline">Owner</strong>. No silent overwrites or unreviewed modifications.
            </div>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold shrink-0">Review Queue</span>
        </div>

        <!-- Proposals Stream List -->
        <div id="changes-proposals-stream" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading change proposal queue...</div>
        </div>

      </main>

      ${ge("production")}

      <!-- New Proposal Modal -->
      <div id="modal-submit-proposal" class="hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 class="font-heading font-bold text-sm text-slate-900">Submit Production Change Proposal</h3>
            <button id="close-proposal-modal" class="text-slate-400 hover:text-slate-700">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <form id="form-submit-proposal" class="p-5 flex flex-col gap-3 text-xs">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Proposal Title</label>
              <input type="text" id="prop-title" required placeholder="e.g. Add Standby Water Truck for Scene 18" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Category</label>
              <select id="prop-cat" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
                <option value="SFX / Logistics">SFX / Logistics</option>
                <option value="Schedule">Schedule & Stripboard</option>
                <option value="Cast & Wardrobe">Cast & Wardrobe</option>
                <option value="Stunts">Stunts & Safety</option>
                <option value="Equipment">Camera & Equipment</option>
              </select>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Rationale / Description</label>
              <textarea id="prop-desc" rows="3" required placeholder="Detailed explanation and reasons for modification..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600 resize-none"></textarea>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Impact Analysis (Budget, Safety, Turnaround)</label>
              <input type="text" id="prop-impact" placeholder="e.g. Affects crew call times for Scene 18" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" id="btn-cancel-prop" class="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium">Cancel</button>
              <button type="submit" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs">Submit for Owner Review</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `}async function Xn(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=s||a.get("scriptId")||h.state.selectedScriptId||"chronicles-of-dust",o=localStorage.getItem("scriptora_prod_role")||"Owner",l=o==="Owner",i=document.getElementById("changes-proposals-stream");if(!i)return;const r=async()=>{const b=await at(n);if(b.length===0){i.innerHTML=`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400 text-xs">
          No proposals in the review queue.
        </div>
      `;return}i.innerHTML=b.map(g=>{const E=g.status==="Awaiting review",A=g.status==="Accepted",S=g.status==="Rejected",I=g.status==="Conflict",y=A?'<span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">check_circle</span>Accepted</span>':S?'<span class="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">cancel</span>Rejected</span>':I?'<span class="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">warning</span>Conflict Flagged</span>':'<span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">hourglass_top</span>Awaiting Owner Review</span>';return`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col gap-3">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">${g.category}</span>
                <span class="text-slate-300">•</span>
                <span class="text-[11px] font-semibold text-slate-600">Submitted by ${g.submittedBy} (${g.submitterRole})</span>
                ${y}
              </div>
              <h3 class="font-heading font-bold text-sm text-slate-900 mt-1">${g.title}</h3>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">${g.description}</p>
            </div>
            <span class="text-[10px] text-slate-400 font-mono shrink-0">${g.sourceVersion||"Draft 4.2"}</span>
          </div>

          <!-- Impact Box -->
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs">
            <span class="material-symbols-outlined text-[16px] text-slate-400">info</span>
            <span class="text-slate-600"><strong class="text-slate-800">Impact:</strong> ${g.impact}</span>
          </div>

          ${g.resolutionNotes?`
            <div class="p-2.5 rounded-xl bg-slate-100/70 border border-slate-200/60 text-[11px] text-slate-600 font-sans">
              <span class="font-bold text-slate-800">Resolution Note:</span> ${g.resolutionNotes}
            </div>
          `:""}

          <!-- Owner Review Controls -->
          ${E&&l?`
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button class="btn-conflict-prop px-3 py-1.5 rounded-xl text-amber-700 bg-amber-50 hover:bg-amber-100 text-xs font-semibold transition-colors" data-id="${g.id}">
                Flag Conflict
              </button>
              <button class="btn-reject-prop px-3 py-1.5 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 text-xs font-semibold transition-colors" data-id="${g.id}">
                Reject Proposal
              </button>
              <button class="btn-accept-prop px-4 py-1.5 rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold shadow-2xs transition-all flex items-center gap-1" data-id="${g.id}">
                <span class="material-symbols-outlined text-[16px]">check</span>
                <span>Accept & Update Record</span>
              </button>
            </div>
          `:""}
        </div>
      `}).join(""),i.querySelectorAll(".btn-accept-prop").forEach(g=>{g.onclick=async()=>{const E=g.getAttribute("data-id"),A=prompt("Enter resolution acceptance note (optional):","Approved by Owner. Records updated.")||"Approved by Owner.";await Mt(n,E,"accept",A),w("Proposal accepted. Production records updated."),r()}}),i.querySelectorAll(".btn-reject-prop").forEach(g=>{g.onclick=async()=>{const E=g.getAttribute("data-id"),A=prompt("Enter rejection reason:","Scheduling conflict with Day 2 shooting window.")||"Declined during Owner review.";await Mt(n,E,"reject",A),w("Proposal rejected."),r()}}),i.querySelectorAll(".btn-conflict-prop").forEach(g=>{g.onclick=async()=>{const E=g.getAttribute("data-id");await Mt(n,E,"conflict","Underlying draft conflict flagged."),w("Conflict status flagged."),r()}})};await r();const u=document.getElementById("modal-submit-proposal"),p=document.getElementById("btn-new-proposal"),x=document.getElementById("close-proposal-modal"),c=document.getElementById("btn-cancel-prop"),d=document.getElementById("form-submit-proposal"),m=()=>u?.classList.remove("hidden"),f=()=>u?.classList.add("hidden");p&&(p.onclick=m),x&&(x.onclick=f),c&&(c.onclick=f),d&&(d.onsubmit=async b=>{b.preventDefault();const g=document.getElementById("prop-title")?.value,E=document.getElementById("prop-cat")?.value,A=document.getElementById("prop-desc")?.value,S=document.getElementById("prop-impact")?.value;await Ns(n,{title:g,category:E,description:A,impact:S||"Modifies production schedule & logistics budget",submittedBy:h.state.currentUser?.name||"Arun Kumar",submitterRole:o}),w("Proposal submitted for review"),f(),d.reset(),r()})}function Zn(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||h.state.selectedScriptId;const a=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${be("Pre-Production","Production Version History & Audit Trail")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${He("Version History & Timeline","history_edu",a||"/production",`
          <button id="btn-restore-version-trigger" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">restore</span>
            <span>Restore Snapshot</span>
          </button>
        `)}

        <!-- Version Comparison & Restoration Banner -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">lock</span>
                <span>Active Production Baseline: Draft 4.2</span>
              </span>
              <span class="text-xs text-slate-500 font-medium">Hash: 88f2</span>
            </div>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">
              Every production extraction, approval, and schedule adjustment is recorded in an immutable chronological audit trail.
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <select id="select-compare-version" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
              <option value="Draft 3.0">Compare vs Draft 3.0</option>
              <option value="Draft 2.0">Compare vs Draft 2.0</option>
              <option value="Draft 1.0">Compare vs Draft 1.0</option>
            </select>
            <button id="btn-run-compare" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors">
              Compare
            </button>
          </div>
        </div>

        <!-- Semantic Comparison Modal/Drawer Preview -->
        <div id="compare-diff-panel" class="hidden bg-slate-900 text-slate-200 rounded-2xl p-4 shadow-md flex flex-col gap-2.5 text-xs font-mono">
          <div class="flex items-center justify-between border-b border-slate-700 pb-2">
            <span class="text-emerald-400 font-bold font-sans">Semantic Production Baseline Diff: Draft 4.2 vs Draft 3.0</span>
            <button id="close-diff" class="text-slate-400 hover:text-white">
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
          <div class="space-y-1.5 leading-relaxed">
            <div class="text-emerald-300">+ Added Scene 18: INT. PUMPING STATION CHAMBER B - NIGHT (Pages 94-96)</div>
            <div class="text-emerald-300">+ Tagged Practical FX: High-pressure brine valve spray</div>
            <div class="text-blue-300">~ Modified Call Sheet #01 call times from 07:00 AM to 06:30 AM</div>
            <div class="text-slate-400 font-sans italic pt-1">Restoration will spawn Draft 4.3 as a new version, preserving all historical records.</div>
          </div>
        </div>

        <!-- Audit Trail Timeline Stream -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col gap-3">
          <div class="border-b border-slate-100 pb-2.5 flex items-center justify-between">
            <h3 class="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-blue-600">history</span>
              <span>Unified Production Event Stream</span>
            </h3>
            <span class="text-[11px] text-slate-400 font-mono">Real Audit Trail</span>
          </div>

          <div id="history-events-list" class="flex flex-col gap-3 pt-2">
            <!-- Rendered via JS -->
          </div>
        </div>

      </main>

      ${ge("production")}
    </div>
  `}async function Qn(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=s||a.get("scriptId")||h.state.selectedScriptId||"chronicles-of-dust",o=document.getElementById("history-events-list");if(!o)return;const l=async()=>{const x=await jt(n);if(x.length===0){o.innerHTML='<div class="text-center py-6 text-slate-400 text-xs">No audit events recorded yet.</div>';return}o.innerHTML=x.map((c,d)=>{const m=c.category==="APPROVAL",f=c.category==="VERSION_INTEGRITY",b=c.category==="CHANGE_MANAGEMENT";return`
        <div class="flex items-start gap-3 text-xs group">
          <div class="w-8 h-8 rounded-lg ${m?"text-emerald-600 bg-emerald-50/60":f?"text-blue-600 bg-blue-50/60":b?"text-amber-600 bg-amber-50/60":"text-slate-600 bg-slate-100"} flex items-center justify-center shrink-0 border border-slate-200/80 shadow-2xs mt-0.5">
            <span class="material-symbols-outlined text-[16px]">${m?"check_circle":f?"lock":b?"rule":"dataset"}</span>
          </div>

          <div class="flex-1 min-w-0 pb-3 border-b border-slate-100 last:border-b-0">
            <div class="flex items-center justify-between gap-2">
              <span class="font-heading font-bold text-slate-900">${c.action.replace(/_/g," ")}</span>
              <span class="text-[10px] text-slate-400 font-mono">${c.timestamp||"Just now"}</span>
            </div>
            <p class="text-slate-600 text-xs mt-0.5 leading-relaxed">${c.details}</p>
            <div class="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
              <span>Actor: <strong class="text-slate-600">${c.actor||"Arun Kumar"}</strong></span>
              <span>•</span>
              <span class="font-mono text-emerald-700 font-semibold">${c.sourceVersion||"Draft 4.2"}</span>
            </div>
          </div>
        </div>
      `}).join("")};await l();const i=document.getElementById("btn-run-compare"),r=document.getElementById("compare-diff-panel"),u=document.getElementById("close-diff");i&&r&&(i.onclick=()=>{r.classList.remove("hidden"),w("Loaded version baseline comparison")}),u&&r&&(u.onclick=()=>r.classList.add("hidden"));const p=document.getElementById("btn-restore-version-trigger");p&&(p.onclick=async()=>{const x=prompt("Enter previous draft label to restore as new version baseline (e.g. Draft 3.0):","Draft 3.0");x&&(await Pa(n,x),w(`Restored baseline to ${x} as new version`),l())})}function eo(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||h.state.selectedScriptId;const a=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${be("Pre-Production","Pre-Flight Readiness & Validation")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${He("Readiness & Validation","fact_check",a||"/production",`
          <button id="btn-revalidate" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">refresh</span>
            <span>Run Pre-Flight</span>
          </button>
        `)}

        <!-- Production Verification Status Summary -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs">
          <div class="grid grid-cols-3 divide-x divide-slate-100">
            <div class="px-3 first:pl-1">
              <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Sign-off Required</div>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-critical">0 Issues</div>
              <p class="text-[11px] text-slate-400 mt-0.5">Owner review</p>
            </div>
            <div class="px-3">
              <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">In Review</div>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-warnings">0 Pending</div>
              <p class="text-[11px] text-slate-400 mt-0.5">Department follow-up</p>
            </div>
            <div class="px-3">
              <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Confirmed</div>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-verified">0 Passed</div>
              <p class="text-[11px] text-slate-400 mt-0.5">Production locked</p>
            </div>
          </div>
        </div>

        <!-- Pre-Production Verification Gates -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col gap-3">
          <div class="border-b border-slate-100 pb-2.5 flex items-center justify-between">
            <h3 class="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-blue-600">checklist</span>
              <span>Pre-Production Verification Gates</span>
            </h3>
            <span class="text-[11px] text-slate-400 font-mono">Draft 4.2 Baseline</span>
          </div>

          <div id="readiness-items-stream" class="flex flex-col gap-2.5 pt-1">
            <div class="text-center py-6 text-slate-400 text-xs">Evaluating production verification rules...</div>
          </div>
        </div>

      </main>

      ${ge("production")}
    </div>
  `}async function to(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=s||a.get("scriptId")||h.state.selectedScriptId||"chronicles-of-dust",o=document.getElementById("readiness-items-stream");if(!o)return;const l=async()=>{const r=await Bs(n),u=r.filter(f=>f.severity==="critical"&&f.status!=="resolved").length,p=r.filter(f=>f.severity==="warning"&&f.status!=="resolved").length,x=r.filter(f=>f.status==="resolved"||f.severity==="ready").length,c=document.getElementById("kpi-critical"),d=document.getElementById("kpi-warnings"),m=document.getElementById("kpi-verified");c&&(c.textContent=`${u} Issues`),d&&(d.textContent=`${p} Pending`),m&&(m.textContent=`${x} Passed`),o.innerHTML=r.map(f=>{const b=f.severity==="critical"&&f.status!=="resolved",g=f.severity==="warning"&&f.status!=="resolved",E=f.status==="resolved"||f.severity==="ready",A=b?'<span class="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">Sign-off Required</span>':g?'<span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">Pending Review</span>':'<span class="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[10px] font-semibold border border-slate-200 flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">check</span>Verified</span>';return`
        <div class="rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors">
          <div class="flex items-start gap-3 min-w-0">
            <div class="w-7 h-7 rounded-lg ${b?"bg-rose-50 text-rose-600":g?"bg-amber-50 text-amber-600":"bg-slate-50 text-slate-500"} flex items-center justify-center shrink-0 mt-0.5 border border-slate-100">
              <span class="material-symbols-outlined text-[16px]">${b?"priority_high":g?"warning":"check"}</span>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">${f.category}</span>
                ${A}
              </div>
              <h4 class="font-heading font-bold text-sm text-slate-900 mt-0.5">${f.title}</h4>
              <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">${f.description}</p>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
            ${E?`
              <span class="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
                <span>Verified</span>
              </span>
            `:`
              <a href="${f.targetRoute}?scriptId=${n}&from=${encodeURIComponent(`/production/readiness?scriptId=${n}`)}" class="btn-jump-fix px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-colors flex items-center gap-1">
                <span>Fix Issue</span>
                <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
              </a>
              <button class="btn-mark-resolved px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors" data-id="${f.id}" title="Mark as resolved manually">
                Resolve
              </button>
            `}
          </div>
        </div>
      `}).join(""),o.querySelectorAll(".btn-mark-resolved").forEach(f=>{f.onclick=async()=>{const b=f.getAttribute("data-id");await $a(n,b),w("Issue marked as resolved"),l()}})};await l();const i=document.getElementById("btn-revalidate");i&&(i.onclick=async()=>{w("Running real pre-flight checks against Draft 4.2..."),await l(),w("Pre-flight scan completed")})}function so(e=null,t=null){const s=new URLSearchParams(window.location.search||""),a=t||s.get("scriptId")||h.state.selectedScriptId||"chronicles-of-dust",n=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${be("Pre-Production","Storyboard Studio")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${He("Storyboard Studio","art_track",n||"/production","")}

        <!-- Feature Intro Banner -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <h2 class="font-heading font-semibold text-sm text-slate-900">Visual Shot Composition & Concept Frames</h2>
            <p class="text-xs text-slate-500 max-w-lg leading-relaxed">
              Storyboard Studio connects camera focal lengths, aspect ratios, character blocking, and concept frames directly to confirmed screenplay scenes.
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <a href="/production/scenes?scriptId=${a}&sceneId=scene-18&from=${encodeURIComponent(`/production/storyboard?scriptId=${a}`)}" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors">
              Inspect Scene 18 Setup
            </a>
          </div>
        </div>

        <!-- Staged Concept Frames Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs flex flex-col">
            <div class="aspect-video bg-slate-900 flex flex-col items-center justify-center text-slate-400 p-4 text-center relative overflow-hidden">
              <span class="material-symbols-outlined text-[32px] text-rose-400">camera_roll</span>
              <span class="text-[11px] font-mono mt-1 text-slate-300">SCENE 1 · SHOT 1A</span>
              <span class="text-[10px] text-slate-500">Wide Establishing Drone (24mm, 2.39:1)</span>
              <div class="absolute bottom-2 right-2 text-[9px] px-1.5 py-0.5 rounded bg-black/60 text-white font-mono">EXT. DAY</div>
            </div>
            <div class="p-3 text-xs">
              <div class="font-heading font-bold text-slate-900">Perimeter Outpost Gate</div>
              <p class="text-[11px] text-slate-500 mt-0.5">High altitude drone descending across dust devils toward Kevin's arrival.</p>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs flex flex-col">
            <div class="aspect-video bg-slate-900 flex flex-col items-center justify-center text-slate-400 p-4 text-center relative overflow-hidden">
              <span class="material-symbols-outlined text-[32px] text-blue-400">lens</span>
              <span class="text-[11px] font-mono mt-1 text-slate-300">SCENE 2 · SHOT 2C</span>
              <span class="text-[10px] text-slate-500">Medium Two-Shot (50mm, 2.39:1)</span>
              <div class="absolute bottom-2 right-2 text-[9px] px-1.5 py-0.5 rounded bg-black/60 text-white font-mono">INT. DAY</div>
            </div>
            <div class="p-3 text-xs">
              <div class="font-heading font-bold text-slate-900">Customs Shed Hologram</div>
              <p class="text-[11px] text-slate-500 mt-0.5">Fluorescent tube flicker rim lighting Kevin and Meera over telemetry anomaly.</p>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs flex flex-col">
            <div class="aspect-video bg-slate-900 flex flex-col items-center justify-center text-slate-400 p-4 text-center relative overflow-hidden">
              <span class="material-symbols-outlined text-[32px] text-amber-400">blur_on</span>
              <span class="text-[11px] font-mono mt-1 text-slate-300">SCENE 18 · SHOT 18F</span>
              <span class="text-[10px] text-slate-500">Dutch Angle Close-Up (85mm, 2.39:1)</span>
              <div class="absolute bottom-2 right-2 text-[9px] px-1.5 py-0.5 rounded bg-black/60 text-white font-mono">INT. NIGHT</div>
            </div>
            <div class="p-3 text-xs">
              <div class="font-heading font-bold text-slate-900">Chamber B Valve Breach</div>
              <p class="text-[11px] text-slate-500 mt-0.5">High-speed water mist bokeh as Kevin clamps the hydraulic bypass manifold.</p>
            </div>
          </div>
        </div>
      </main>

      ${ge("production")}
    </div>
  `}class ao{constructor(){this.appEl=null,this.currentPath=null,this.isFullScreen=!1}getBasePath(){return window.location.pathname.toLowerCase().startsWith("/scriptora")?"/Scriptora":""}getCurrentLocation(){return window.location.hash&&window.location.hash.startsWith("#/")?window.location.hash.slice(1):window.location.pathname+window.location.search}ensureShell(){if(!this.appEl)return;document.getElementById("scriptora-app-shell")||(this.appEl.innerHTML=`
        <div id="scriptora-app-shell" class="flex flex-col min-h-screen w-full relative bg-surface select-text">
          <!-- Persistent Global Header Container -->
          <div id="scriptora-global-header" class="fixed top-0 left-0 right-0 z-40 transition-all duration-200"></div>

          <!-- Dynamic Screen Content Area -->
          <main id="scriptora-global-content" class="flex-1 w-full min-h-screen flex flex-col relative transition-opacity duration-200"></main>

          <!-- Persistent Global Bottom Navigation Container -->
          <div id="scriptora-global-nav" class="fixed bottom-0 left-0 right-0 z-40 transition-all duration-200 overflow-visible"></div>
        </div>
      `)}init(t="#app"){if(this.appEl=document.querySelector(t),!this.appEl){console.error(`Mount element ${t} not found.`);return}this.ensureShell(),window.setScriptoraFullScreen=s=>{this.isFullScreen=!!s;const a=document.getElementById("scriptora-global-header"),n=document.getElementById("scriptora-global-nav");a&&a.classList.toggle("hidden",!!s),n&&n.classList.toggle("hidden",!!s)},document.body.addEventListener("click",s=>{const a=s.target.closest("a");if(a&&a.href&&a.origin===window.location.origin&&!a.hasAttribute("download")&&a.getAttribute("target")!=="_blank"&&!a.getAttribute("rel")?.includes("external")){const n=new URL(a.href),o=n.pathname+n.search+n.hash;o.startsWith("/api")||(s.preventDefault(),this.navigate(o))}}),window.addEventListener("popstate",s=>{typeof window.__scriptoraEditorPopstate=="function"&&window.__scriptoraEditorPopstate(s)||this.resolve(this.getCurrentLocation())}),window.addEventListener("hashchange",()=>{this.resolve(this.getCurrentLocation())}),this.resolve(this.getCurrentLocation())}navigate(t,s=!1){this.currentPath&&h.pushHistory(this.currentPath);const a=this.getBasePath(),n=a&&t.toLowerCase().startsWith(a.toLowerCase())?t.slice(a.length)||"/":t,o=a&&!t.startsWith(a)?`${a}${n.startsWith("/")?"":"/"}${n}`:t;s?window.history.replaceState(null,"",o):window.history.pushState(null,"",o),this.resolve(n)}resolve(t){const s=t.indexOf("?"),a=s===-1?t:t.slice(0,s),n=s===-1?"":t.slice(s+1);let o=a.replace(/\/+$/,"")||"/";const l=this.getBasePath();l&&o.toLowerCase().startsWith(l.toLowerCase())&&(o=o.slice(l.length)||"/"),o.startsWith("/")||(o="/"+o);const i=new URLSearchParams(n||"");this.currentPath=t;const r=!!h.state.currentUser;if(!r&&!["/welcome","/auth"].includes(o)){this.navigate("/auth",!0);return}if(r&&o==="/auth"){this.navigate("/workspace",!0);return}if(o==="/"){r?this.navigate("/workspace",!0):this.navigate("/welcome",!0);return}if(o==="/welcome"){this.render(La(),()=>Ma(this.navigate.bind(this)),{isPublic:!0});return}if(o==="/auth"){this.render(Ra(),()=>Da(this.navigate.bind(this)),{isPublic:!0});return}if(o==="/workspace"){this.render(Oa(),()=>ja(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Workspace",subtitle:"Your writing space."});return}if(o==="/editor"){const d=h.state.selectedScriptId||"chronicles-of-dust",m=i.get("scene");this.navigate(`/editor/${d}${m?`?scene=${m}`:""}`,!0);return}if(o.startsWith("/editor/")){const d=o.split("/")[2],m=i.get("scene");h.setState({selectedScriptId:d});const f=h.state.scripts?.find(b=>b.id===d)||{title:"Untitled Screenplay"};this.render(Ua(d,m),()=>qa(d,this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Editor",subtitle:f.title||"Screenplay Studio",hideHeader:!0,hideNav:!0});return}if(o==="/intelligence"||o==="/intelligence/select"){this.render(pn(),()=>un(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Selector"});return}if(o==="/intelligence/context"){this.render(xn(),()=>mn(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Context Calibration"});return}if(o==="/intelligence/dashboard"||o==="/intelligence/overview"){this.render(fn(),()=>bn(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Analysis"});return}if(o==="/intelligence/analysis"||o==="/intelligence/analysis/select"){this.render(gn(),()=>hn(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Analyse Individually"});return}if(o.startsWith("/intelligence/analysis/")){const d=o.split("/")[3]||"pacing",m=i.get("from"),f=i.get("scriptId");this.render(wn(d,m,f),()=>Sn(d,this.navigate.bind(this),m,f),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Vector Analysis"});return}if(o==="/profile"){const d=i.get("from"),m=i.get("scriptId");this.render(In(d,m),()=>kn(this.navigate.bind(this),d,m),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Account & preferences."});return}if(o==="/profile/collaborators"){const d=i.get("from"),m=i.get("scriptId");this.render(Cn(d,m),()=>En(this.navigate.bind(this),d,m),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Collaborators"});return}if(o==="/notifications"){this.render(An(),()=>Tn(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Notifications",subtitle:"Activity Stream"});return}if(o==="/production"||o==="/pre-production"){const d=i.get("from"),m=i.get("scriptId");this.render($n(d,m),()=>Pn(this.navigate.bind(this),d,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Production Workspace & Tools"});return}if(o==="/production/breakdown"){const d=i.get("from"),m=i.get("scriptId");this.render(Mn(d,m),()=>On(this.navigate.bind(this),d,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Script Breakdown Workspace"});return}const p=o.match(/^\/production\/scenes(?:\/([a-zA-Z0-9_-]+))?$/);if(p){const d=i.get("from"),m=i.get("scriptId"),f=p[1]||i.get("sceneId");this.render(jn(d,m,f),()=>_n(this.navigate.bind(this),d,m,f),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:f?"Scene Details & Logistics":"Scene Hub & Logistics"});return}const x=o.match(/^\/production\/call-sheets(?:\/([a-zA-Z0-9_-]+))?$/);if(x){const d=i.get("from"),m=i.get("scriptId"),f=x[1]||i.get("csId");this.render(Hn(d,m,f),()=>Un(this.navigate.bind(this),d,m,f),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:f?"Call Sheet Inspector":"Call Sheets Workspace"});return}if(o==="/production/dialogue-sides"||o==="/production/dialogue-sheets"||o==="/production/sides"){const d=i.get("from"),m=i.get("scriptId");this.render(Fn(d,m),()=>qn(this.navigate.bind(this),d,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Dialogue Sheets & Actor Sides"});return}if(o==="/production/schedule"||o==="/production/stripboard"){const d=i.get("from"),m=i.get("scriptId");this.render(Vn(d,m),()=>Gn(this.navigate.bind(this),d,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Master Shooting Schedule & Stripboard"});return}if(o==="/production/directory"||o==="/production/resources"){const d=i.get("from"),m=i.get("scriptId");this.render(Wn(d,m),()=>Kn(this.navigate.bind(this),d,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Production Resource Directory"});return}const c=o.match(/^\/production\/documents(?:\/([a-zA-Z0-9_-]+))?$/);if(c){const d=i.get("from"),m=i.get("scriptId"),f=c[1]||i.get("docId");this.render(Jn(d,m,f),()=>zn(this.navigate.bind(this),d,m,f),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:f?"Production Document Viewer":"Production Documents Workspace"});return}if(o==="/production/changes"||o==="/production/proposals"){const d=i.get("from"),m=i.get("scriptId");this.render(Yn(d,m),()=>Xn(this.navigate.bind(this),d,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Production Change Proposals & Approvals"});return}if(o==="/production/history"||o==="/production/timeline"){const d=i.get("from"),m=i.get("scriptId");this.render(Zn(d,m),()=>Qn(this.navigate.bind(this),d,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Production Version History & Audit Trail"});return}if(o==="/production/readiness"||o==="/production/validation"){const d=i.get("from"),m=i.get("scriptId");this.render(eo(d,m),()=>to(this.navigate.bind(this),d,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Pre-Flight Readiness & Validation"});return}if(o==="/production/storyboard"||o==="/production/storyboards"){const d=i.get("from"),m=i.get("scriptId");this.render(so(d,m),()=>(this.navigate.bind(this),void 0),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Storyboard Studio"});return}if(o==="/chat"||o==="/ai-chat"||o==="/writer-room"||o==="/ai-writer-room"){this.render(Bn(),()=>Rn(this.navigate.bind(this)),{activeTab:"chat",sectionTitle:"AI Chat",subtitle:"Universal Assistant"});return}this.renderNotFound(o)}render(t,s,a={}){this.ensureShell();const n=document.getElementById("scriptora-global-header"),o=document.getElementById("scriptora-global-content"),l=document.getElementById("scriptora-global-nav"),i=!!a.isPublic,r=!!a.hideHeader,u=!!a.hideNav,p=a.activeTab||"workspace",x=a.sectionTitle||"Scriptora",c=a.subtitle||"";if(i?(n&&n.classList.add("hidden"),l&&l.classList.add("hidden")):(n&&!this.isFullScreen&&(r?(n.classList.add("hidden"),n.innerHTML=""):(n.classList.remove("hidden"),n.innerHTML=be(x,c))),l&&!this.isFullScreen&&(u?(l.classList.add("hidden"),l.innerHTML=""):(l.classList.remove("hidden"),l.innerHTML=ge(p)))),o){let d=t||"";if(d=d.replace(/<header[^>]*data-global-header="true"[^>]*>[\s\S]*?<\/header>/gi,""),d=d.replace(/<header\s+class="fixed\s+top-0\s+w-full\s+z-40\s+pt-safe\s+bg-surface[^>]*>[\s\S]*?<\/header>/gi,""),d=d.replace(/<nav[^>]*data-global-bottom-nav="true"[^>]*>[\s\S]*?<\/nav>/gi,""),d=d.replace(/<nav\s+class="fixed\s+bottom-0\s+w-full\s+z-40\s+pb-safe\s+bg-surface[^>]*>[\s\S]*?<\/nav>/gi,""),o.innerHTML=d,window.scrollTo({top:0,behavior:"instant"}),o.classList.remove("fade-in"),o.offsetWidth,o.classList.add("fade-in"),typeof s=="function")try{s()}catch(m){console.error("Error attaching screen events:",m)}}}renderNotFound(t){this.render(`
      <div class="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-surface pt-16 pb-24">
        <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
          <span class="material-symbols-outlined text-[32px]">sentiment_dissatisfied</span>
        </div>
        <h1 class="font-heading font-bold text-xl text-slate-900 mb-1">Page Not Found</h1>
        <p class="text-xs text-slate-500 mb-6 max-w-xs">The route <code class="font-mono bg-slate-100 px-1 py-0.5 rounded text-blue-600">${t}</code> does not exist.</p>
        <button id="notfound-home" class="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-xs shadow-xs hover:bg-blue-700 transition-colors">
          Return to Workspace
        </button>
      </div>
      `,()=>{const s=document.getElementById("notfound-home");s&&(s.onclick=()=>this.navigate("/workspace"))},{activeTab:"workspace",sectionTitle:"Page Not Found",subtitle:"404"})}}const no=new ao;async function Es(){try{await h.init(),no.init("#app"),window.addEventListener("online",()=>{w("Back online. Synchronizing changes..."),h.refreshScripts(),h.refreshNotifications()}),window.addEventListener("offline",()=>{w("Offline mode active. Edits saved locally.","info")}),console.log("Scriptora initialized successfully in production-ready mode.")}catch(e){console.error("Scriptora bootstrap failed:",e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Es):Es();
