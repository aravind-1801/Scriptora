(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const Us="http://localhost:8000/api";async function D(e,t={}){const s=`${Us}${e}`,a={headers:{"Content-Type":"application/json",...t.headers},...t};try{const n=await fetch(s,a);if(!n.ok){const o=await n.json().catch(()=>({}));throw new Error(o.error||`HTTP error ${n.status}`)}return await n.json()}catch(n){throw console.warn(`API call ${e} failed, falling back to local store:`,n.message),n}}const Tt=[{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",industry:"International / Hollywood",pages:96,updated:"12m ago",currentScene:"Scene 18",isCurrentDraft:!0,archived:!1,joinCode:"A7K9-XP42",logline:"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.",synopsis:"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves.",context:{format:"Feature",industry:"International / Hollywood",hours:1,minutes:36,seconds:0,plannedDuration:"01:36:00"},analysisScores:{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80}},{id:"the-neon-horizon",title:"The Neon Horizon",draft:"Draft 2.1",genre:"Sci-Fi",format:"Pilot",industry:"Streaming Television",pages:62,updated:"2h ago",currentScene:"Scene 4",isCurrentDraft:!1,archived:!1,joinCode:"N3ON-H0RZ",context:{format:"Pilot",industry:"Streaming Television",hours:0,minutes:52,seconds:0,plannedDuration:"00:52:00"},analysisScores:{overall:79,pacing:75,dialogue:84,emotion:80,characterArc:78,continuity:82,storyStructure:76,theme:88,cinema:83,formatting:90,production:72}},{id:"velvet-shadows",title:"Velvet Shadows",draft:"Draft 1.0",genre:"Noir",format:"Feature",industry:"Independent / Festival",pages:114,updated:"Yesterday",currentScene:"Scene 1",isCurrentDraft:!1,archived:!1,joinCode:"V3LV-SHDW",analysisScores:{overall:81,pacing:80,dialogue:86,emotion:79,characterArc:85,continuity:80,storyStructure:82,theme:84,cinema:88,formatting:92,production:76}},{id:"silent-echoes",title:"Silent Echoes",draft:"Draft 3.0",genre:"Psychological Thriller",format:"Feature",industry:"International / Hollywood",pages:104,updated:"3d ago",currentScene:"Scene 22",isCurrentDraft:!1,archived:!1,joinCode:"SLNT-ECH0",analysisScores:{overall:84,pacing:86,dialogue:81,emotion:88,characterArc:83,continuity:85,storyStructure:89,theme:82,cinema:84,formatting:91,production:78}},{id:"glass-kingdoms",title:"Glass Kingdoms",draft:"Draft 1.4",genre:"Fantasy",format:"Pilot",industry:"Streaming Television",pages:58,updated:"1w ago",currentScene:"Scene 8",isCurrentDraft:!1,archived:!1,joinCode:"GLSS-KNGD",analysisScores:{overall:78,pacing:74,dialogue:80,emotion:76,characterArc:82,continuity:75,storyStructure:80,theme:86,cinema:82,formatting:88,production:70}},{id:"red-shift",title:"Red Shift",draft:"Draft 2.0",genre:"Action",format:"Short",industry:"Independent / Festival",pages:28,updated:"2w ago",currentScene:"Scene 5",isCurrentDraft:!1,archived:!1,joinCode:"RED2-SHFT",analysisScores:{overall:83,pacing:90,dialogue:78,emotion:75,characterArc:80,continuity:88,storyStructure:84,theme:80,cinema:89,formatting:95,production:82}}];async function ys(){try{return(await D("/auth/me")).user}catch{const e=localStorage.getItem("scriptora_user");if(e)try{const s=JSON.parse(e);if(s&&s.displayName)return s}catch{}const t={id:"user-1",name:"Arun Kumar",displayName:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function ps(e){try{const t=await D("/auth/login",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-1",name:e.email?e.email.split("@")[0]:"Arun Kumar",displayName:e.email?e.email.split("@")[0]:"Arun Kumar",email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Narrative Director",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function Vs(e){try{const t=await D("/auth/register",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:`user-${Date.now()}`,name:e.name||"New Writer",displayName:e.name||"New Writer",email:e.email||"writer@scriptora.studio",headline:"Screenwriter",badge:"Member Pro",initials:(e.name||"NW").slice(0,2).toUpperCase(),stats:{drafts:1,coAuthors:0,healthIndex:"100%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function qs(e){try{const t=await D("/auth/otp",{method:"POST",body:JSON.stringify({phone:e})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-phone",name:"Verified Writer",displayName:"Verified Writer",headline:"Screenwriter",email:e,badge:"Member Pro",initials:"VW",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function Wt(){try{await D("/auth/logout",{method:"POST"})}catch{}return localStorage.removeItem("scriptora_user"),!0}async function Re(e=""){try{const a=e?`/scripts?q=${encodeURIComponent(e)}`:"/scripts",n=await D(a);if(n.scripts&&n.scripts.length>0)return localStorage.setItem("scriptora_scripts",JSON.stringify(n.scripts)),n.scripts}catch{}const t=localStorage.getItem("scriptora_scripts");let s;if(t)try{s=JSON.parse(t),(!Array.isArray(s)||s.length===0)&&(s=[...Tt],localStorage.setItem("scriptora_scripts",JSON.stringify(s)))}catch{s=[...Tt],localStorage.setItem("scriptora_scripts",JSON.stringify(s))}else s=[...Tt],localStorage.setItem("scriptora_scripts",JSON.stringify(s));return e&&(s=s.filter(a=>a.title.toLowerCase().includes(e.toLowerCase()))),s}async function es(e){try{const s=await D(`/scripts/${e}`);if(s.script)return s.script}catch{}const t=await Re();return t.find(s=>s.id===e)||Tt.find(s=>s.id===e)||t[0]||null}async function Gs(e){try{const n=await D("/scripts",{method:"POST",body:JSON.stringify(e)});if(n.script){const o=await Re();return localStorage.setItem("scriptora_scripts",JSON.stringify([n.script,...o.filter(l=>l.id!==n.script.id)])),n.script}}catch{}const t={id:(e.title||"untitled").toLowerCase().replace(/[^a-z0-9]+/g,"-"),title:e.title||"Untitled Screenplay",draft:"Draft 1.0",genre:e.genre||"Drama",format:e.format||"Feature",industry:e.industry||"International / Hollywood",pages:1,updated:"Just now",currentScene:"Scene 1",joinCode:"SCRP-1001",archived:!1,context:{format:e.format||"Feature",industry:e.industry||"International / Hollywood",hours:1,minutes:30,seconds:0,plannedDuration:"01:30:00"},analysisScores:{overall:80,pacing:78,dialogue:80,emotion:80,characterArc:78,continuity:80,storyStructure:80,theme:80,cinema:80,formatting:90,production:75}},s=await Re(),a=[t,...s.filter(n=>n.id!==t.id)];return localStorage.setItem("scriptora_scripts",JSON.stringify(a)),t}async function Ks(e,t){try{const n=await D(`/scripts/${e}`,{method:"PUT",body:JSON.stringify(t)});if(n.script){const l=(await Re()).map(i=>i.id===e?n.script:i);return localStorage.setItem("scriptora_scripts",JSON.stringify(l)),n.script}}catch{}const a=(await Re()).map(n=>n.id===e?{...n,...t,updated:"Just now"}:n);return localStorage.setItem("scriptora_scripts",JSON.stringify(a)),{id:e,...t,updated:"Just now"}}async function Ws(e){try{await D(`/scripts/${e}`,{method:"DELETE"})}catch{}const s=(await Re()).filter(a=>a.id!==e);return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),{success:!0}}async function zs(e){try{const o=await D(`/scripts/${e}/duplicate`,{method:"POST"});if(o.script){const l=await Re();return localStorage.setItem("scriptora_scripts",JSON.stringify([o.script,...l])),o.script}}catch{}const t=await es(e),s={...t,id:`${e}-copy-${Date.now().toString().slice(-4)}`,title:`${t?.title||"Script"} (Copy)`,updated:"Just now"},a=await Re(),n=[s,...a];return localStorage.setItem("scriptora_scripts",JSON.stringify(n)),s}async function Js(e){try{await D(`/scripts/${e}/archive`,{method:"POST"})}catch{}const s=(await Re()).map(a=>a.id===e?{...a,archived:!0,updated:"Just now"}:a);return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),{success:!0}}const ts={id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pageCount:5,wordCount:14280,titlePage:{title:"CHRONICLES OF DUST",author:"Arun Kumar",contact:"Scriptora Studio · arun.kumar@scriptora.studio · +1 (555) 019-2834",notes:"An original screenplay. Draft 4.2 Production Cut."},settings:{sceneNumbers:!0,sceneNumberSide:"left",smartFormatting:!0,fontSize:"12pt",lineSpacing:"1.5",language:"English"},acts:[{id:"act-1",name:"ACT I - The Broken Siphon"},{id:"act-2",name:"ACT II - The Pressure Surge"},{id:"act-3",name:"ACT III - The Floodgate Standoff"}],characters:["KEVIN","MEERA","HARI","AKASH"],locations:["INT. HOME","INT. PORT AUDIT ROOM","INT. CUSTOMS OFFICE","EXT. FLOODGATE GANTRY"],times:["DAY","NIGHT","CONTINUOUS","DAWN","DUSK","LATER","MORNING","EVENING"],transitions:["CUT TO:","FADE IN:","FADE OUT.","DISSOLVE TO:","SMASH CUT TO:","MATCH CUT TO:","JUMP CUT TO:"],scenes:[{id:"scene-1",number:1,actId:"act-1",slugline:"INT. HOME - EVENING",blocks:[{id:"b-1-1",type:"scene",content:"INT. HOME - EVENING"},{id:"b-1-2",type:"action",content:"There stands a woman."},{id:"b-1-3",type:"character",content:"HARI"},{id:"b-1-4",type:"dialogue",content:"Who is that?"},{id:"b-1-5",type:"character",content:"AKASH"},{id:"b-1-6",type:"dialogue",content:"How do I know?"},{id:"b-1-7",type:"action",content:"Both leaves the place."}]},{id:"scene-4",number:4,actId:"act-1",slugline:"INT. PORT AUDIT ROOM - DAY",blocks:[{id:"b-4-1",type:"scene",content:"INT. PORT AUDIT ROOM - DAY"},{id:"b-4-2",type:"action",content:"Kevin stamps irregular cargo manifests to keep peace with union superiors."},{id:"b-4-3",type:"character",content:"KEVIN"},{id:"b-4-4",type:"dialogue",content:"The manifests are sealed."}]},{id:"scene-18",number:18,actId:"act-2",slugline:"INT. CUSTOMS OFFICE - NIGHT",blocks:[{id:"b-18-1",type:"scene",content:"INT. CUSTOMS OFFICE - NIGHT"},{id:"b-18-2",type:"action",content:"Kevin kneels over the cracked hydro-sensor junction box. Static hiss whispers through the damp comm-link. A lone flicker illuminates the tarnished brass seal."},{id:"b-18-3",type:"action",content:"Water droplets bead along the corroded circuit wires. He slides a copper probe between the connectors."},{id:"b-18-4",type:"character",content:"KEVIN"},{id:"b-18-5",type:"parenthetical",content:"(whispering into comm)"},{id:"b-18-6",type:"dialogue",content:"If the seals break before dawn, the sector won't hold the surge."},{id:"b-18-7",type:"character",content:"MEERA (O.S.)"},{id:"b-18-8",type:"dialogue",content:"Then don't let them break. Reroute the secondary relay through the floodgate breaker."},{id:"b-18-9",type:"transition",content:"CUT TO:"}]}]};async function Ys(e){try{const a=await D(`/screenplay/${e}`);if(a.screenplay&&a.screenplay.scenes&&a.screenplay.scenes.length>0)return a.screenplay}catch{}const t=localStorage.getItem(`scriptora_screenplay_${e}`);if(t)try{const a=JSON.parse(t);if(a&&a.scenes&&a.scenes.length>0)return a}catch{}const s=JSON.parse(JSON.stringify(ts));return s.id=e||"script_01",localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(s)),s}async function Xs(e,t){localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(t));try{return await D(`/screenplay/${e}`,{method:"PUT",body:JSON.stringify({screenplay:t})})}catch{return{success:!0}}}async function Zs(e){try{return(await D(`/versions/${e}`)).versions}catch{return[{id:"v-4.2",name:"Draft 4.2",tag:"Current Active",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:"Refined Meera O.S. dialogue and hydro-sensor action line.",isCurrent:!0},{id:"v-3.0",name:"Draft 3.0",tag:"Production Polish",timestamp:"Yesterday, 4:15 PM",author:"JD",stats:"94 pages · 13,950 words",notes:"Incorporated director notes on floodgate transition pacing.",isCurrent:!1},{id:"v-2.0",name:"Draft 2.0",tag:"First Table Read",timestamp:"Oct 12, 2024",author:"JD",stats:"90 pages · 13,200 words",notes:"Table read revision for Acts I & II character arcs.",isCurrent:!1}]}}async function Qs(e,t){try{return(await D(`/versions/${e}`,{method:"POST",body:JSON.stringify(t)})).version}catch{return{id:`v-${Date.now()}`,name:t.name,tag:"Milestone Snapshot",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:t.notes||"",isCurrent:!0}}}async function ea(e){try{return(await D(`/collaborators/${e}`)).collaborators}catch{return[{id:"c-1",name:"Heamanth S.",email:"heamanth@studio.com",initials:"HS",role:"Editor",avatarBg:"bg-blue-100 text-blue-700",status:"Active",added:"2d ago"},{id:"c-2",name:"Elena Rostova",email:"elena@cineworks.io",initials:"ER",role:"Script Doctor",avatarBg:"bg-amber-100 text-amber-700",status:"Active",added:"1w ago"},{id:"c-3",name:"Marcus Vance",email:"vance.prod@paramount.com",initials:"MV",role:"Producer",avatarBg:"bg-purple-100 text-purple-700",status:"Viewer",added:"2w ago"}]}}async function ta(e,t){try{return(await D(`/collaborators/${e}/invite`,{method:"POST",body:JSON.stringify(t)})).collaborator}catch{return{id:`c-${Date.now()}`,name:t.email.split("@")[0],email:t.email,initials:t.email.substring(0,2).toUpperCase(),role:t.role==="editor"?"Editor":"Viewer",avatarBg:"bg-emerald-100 text-emerald-700",status:"Active",added:"Just now"}}}async function sa(e,t){try{return await D(`/collaborators/${e}/${t}`,{method:"DELETE"})}catch{return{success:!0}}}async function aa(e){try{return(await D("/join-code/generate",{method:"POST",body:JSON.stringify({scriptId:e})})).joinCode}catch{return Math.random().toString(36).substring(2,6).toUpperCase()+"-"+Math.random().toString(36).substring(2,6).toUpperCase()}}async function na(e){try{return await D("/join-code/validate",{method:"POST",body:JSON.stringify({code:e})})}catch{return(e||"").toUpperCase().trim()==="A7K9-XP42"?{valid:!0,script:{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",pages:96,collaboratorCount:3}}:{valid:!1,error:"Invalid or expired join code"}}}async function oa(e){try{return await D("/join-code/redeem",{method:"POST",body:JSON.stringify({code:e})})}catch{return{success:!0,scriptId:"chronicles-of-dust",title:"Chronicles of Dust"}}}async function ws(){try{return await D("/notifications")}catch{return{notifications:[{id:1,sender:"HS",senderName:"Heamanth",type:"collaboration_invite",title:"Heamanth invited you to collaborate",body:'Added you as an Editor on "Chronicles of Dust" (Draft 4.2).',time:"12m ago",group:"today",unread:!0,tags:["Draft 4.2","Role: Editor"],actionLabel:"Review Access →",actionRoute:"/profile/collaborators"},{id:2,sender:"icon:description",type:"export_ready",title:"Your export is ready",body:'"Chronicles of Dust (Draft 4.2)" exported as standard Industry PDF.',time:"45m ago",group:"today",unread:!0,tags:["PDF","96 Pages"],actionLabel:"Open Screenplay →",actionRoute:"/editor/chronicles-of-dust"},{id:3,sender:"AK",senderName:"Arun K.",type:"join_code_request",title:"Join-code access request",body:'Requested Editor access to "Anbin Mozhi" via join-code A7K9-XP42.',time:"2h ago",group:"today",unread:!0,tags:["Code: A7K9-XP42"],actionLabel:"Manage Collaborators →",actionRoute:"/profile/collaborators"}],unreadCount:3}}}async function la(e){try{return await D(`/notifications/${e}/read`,{method:"POST"})}catch{return{success:!0}}}async function ia(){try{return await D("/notifications/read-all",{method:"POST"})}catch{return{success:!0}}}async function us(){return(await ws()).unreadCount||0}async function Ft(e){try{const t=await D("/profile",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.profile)),t.profile}catch{const s={...await ys()||{},...e};if(e.name){const a=e.name.trim().split(/\s+/);s.initials=((a[0]?.[0]||"A")+(a[1]?.[0]||"")).toUpperCase(),s.displayName=e.name}return localStorage.setItem("scriptora_user",JSON.stringify(s)),s}}async function Ss(){try{return(await D("/settings")).settings}catch{const e=localStorage.getItem("scriptora_settings");return e?JSON.parse(e):{editor:{autoSceneHeading:!0,autoCharacter:!0,autoTransition:!0,enterAfterAction:!0,tabAfterAction:!0,autoCapitalize:!0,continueDialogue:!0,showSceneNumbers:!0,lockSceneNumbers:!1,fontSize:"Courier Prime 12pt",lineSpacing:"1.5 line",focusMode:!1},language:"English (US)",appearance:"Light",notifications:{collaborationInvites:!0,collaborationEdits:!0,mentions:!0,versionMilestones:!0},intelligence:{querySuggestions:!0,analysisSuggestions:!0}}}}async function ra(e){try{const t=await D("/settings",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_settings",JSON.stringify(t.settings)),t.settings}catch{const s={...await Ss(),...e};return localStorage.setItem("scriptora_settings",JSON.stringify(s)),s}}async function ca(e,t){try{return(await D(`/intelligence/${e}/context`,{method:"PUT",body:JSON.stringify(t)})).context}catch{return t}}async function ss(e,t){try{return(await D("/intelligence/query",{method:"POST",body:JSON.stringify({query:e,scriptId:t})})).answer}catch{return"Analysis: In this screenplay, scene tempo and dialogue density align with core narrative milestones. Characters express distinct agendas in each beat."}}async function Rt(e="chronicles-of-dust"){try{const n=await D(`/production/${e}`);if(n?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n.workspace)),n.workspace}catch{}const t=localStorage.getItem(`scriptora_prod_ws_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=await es(e),a={id:`prod-ws-${e}`,projectId:"proj-1",projectName:"Badlands Anthology",scriptId:e,screenplayTitle:s?.title||"Chronicles of Dust",pinnedSourceVersion:s?.draft||"Draft 4.2",pinnedSourceVersionHash:"v4.2-snap-88f2",pinnedTimestamp:"12m ago",currentScriptDraft:s?.draft||"Draft 4.2",isStale:!1,mode:localStorage.getItem("scriptora_prod_mode")||"simple",userRole:localStorage.getItem("scriptora_prod_role")||"Owner",roles:["Owner","Director","Assistant Director","Production","Department Member","Viewer"],stats:{totalScenes:18,breakdownElements:78,callSheetsCount:2,shootingDays:14,pendingProposals:2,completedApprovals:6},updatedAt:new Date().toISOString()};return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(a)),a}async function xs(e,t){try{const n=await D(`/production/${e}`,{method:"PUT",body:JSON.stringify(t)});if(n?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n.workspace)),n.workspace}catch{}const a={...await Rt(e),...t,updatedAt:new Date().toISOString()};return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(a)),a}async function da(e,t){try{const a=await D(`/production/${e}/pin`,{method:"POST",body:JSON.stringify({version:t})});if(a?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(a.workspace)),a.workspace}catch{}const s=await Rt(e);return s.pinnedSourceVersion=t,s.pinnedTimestamp="Just now",s.isStale=!1,localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(s)),s}async function zt(e="chronicles-of-dust",t=null){try{const n=`/production/${e}/resources${t?`?category=${encodeURIComponent(t)}`:""}`,o=await D(n);if(o?.resources)return localStorage.setItem(`scriptora_prod_res_${e}`,JSON.stringify(o.resources)),o.resources}catch{}const s=localStorage.getItem(`scriptora_prod_res_${e}`);if(s)try{const n=JSON.parse(s);return t&&t!=="all"?n.filter(o=>o.category.toLowerCase()===t.toLowerCase()):n}catch{}const a=[{id:"res-1",scriptId:e,category:"Cast",name:"Kevin (Lead)",role:"Hydro-engineer",scenes:["Scene 1","Scene 3","Scene 18"],department:"Casting",status:"Confirmed",contactRestricted:!0,contact:"agent@talentagency.com",notes:"Requires desert dust protective gear and waterproof boots."},{id:"res-2",scriptId:e,category:"Cast",name:"Meera (Lead)",role:"Field Operative",scenes:["Scene 2","Scene 4","Scene 18"],department:"Casting",status:"Confirmed",contactRestricted:!0,contact:"management@creativeartists.com",notes:"Tactical harness fitted for scene 18 valve climb."},{id:"res-3",scriptId:e,category:"Location",name:"Arid Outpost Gate 4",scenes:["Scene 1","Scene 2"],department:"Locations",status:"Confirmed",contactRestricted:!1,contact:"Mojave Perimeter Permit Office",notes:"Day exterior only. High wind advisory after 16:00."},{id:"res-4",scriptId:e,category:"Location",name:"Pumping Station Chamber B",scenes:["Scene 18"],department:"Locations",status:"Confirmed",contactRestricted:!1,contact:"Aqueduct District Coordinator",notes:"Heavy echo; sound dampening blankets required."},{id:"res-5",scriptId:e,category:"Props",name:"Hydraulic Bypass Valve Kit",scenes:["Scene 18"],department:"Props",status:"Confirmed",notes:"Hero prop with functional LED pressure gauge."},{id:"res-6",scriptId:e,category:"Vehicles",name:"Solar Patrol Rover (Modified)",scenes:["Scene 1","Scene 4"],department:"Picture Vehicles",status:"Awaiting review",notes:"Secondary dust filter installed on engine intake."}];return localStorage.setItem(`scriptora_prod_res_${e}`,JSON.stringify(a)),t&&t!=="all"?a.filter(n=>n.category.toLowerCase()===t.toLowerCase()):a}async function Is(e="chronicles-of-dust"){try{const a=await D(`/production/${e}/documents`);if(a?.documents)return localStorage.setItem(`scriptora_prod_docs_${e}`,JSON.stringify(a.documents)),a.documents}catch{}const t=localStorage.getItem(`scriptora_prod_docs_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"doc-cs-1",scriptId:e,type:"Call Sheet",title:"Call Sheet #01 — Gate 4 Day Exterior",sourceVersion:"Draft 4.2",shootDay:"Day 1 of 14",date:"Oct 24, 2026",callTime:"06:30 AM",location:"Mojave Outpost Gate 4",scenes:["Scene 1","Scene 2"],status:"Confirmed",published:!0,version:"v1.0"},{id:"doc-cs-2",scriptId:e,type:"Call Sheet",title:"Call Sheet #02 — Pumping Station Chamber",sourceVersion:"Draft 4.2",shootDay:"Day 2 of 14",date:"Oct 25, 2026",callTime:"07:00 AM",location:"Chamber B Dry Tank",scenes:["Scene 18"],status:"Draft",published:!1,version:"v0.9"},{id:"doc-ds-1",scriptId:e,type:"Dialogue Sheet",title:"Actor Sides — Kevin & Meera (Scene 18)",sourceVersion:"Draft 4.2",scenes:["Scene 18"],characters:["KEVIN","MEERA"],status:"Confirmed",published:!0,version:"v1.2"},{id:"doc-ss-1",scriptId:e,type:"Shooting Schedule",title:"Master 14-Day Stripboard Schedule",sourceVersion:"Draft 4.2",status:"Confirmed",published:!0,version:"v2.1",daysCount:14},{id:"doc-sb-1",scriptId:e,type:"Script Breakdown",title:"Full Production Breakdown Sheet",sourceVersion:"Draft 4.2",status:"Confirmed",published:!0,version:"v1.4",elementsCount:78}];return localStorage.setItem(`scriptora_prod_docs_${e}`,JSON.stringify(s)),s}async function Xe(e="chronicles-of-dust"){try{const a=await D(`/production/${e}/proposals`);if(a?.proposals)return localStorage.setItem(`scriptora_prod_props_${e}`,JSON.stringify(a.proposals)),a.proposals}catch{}const t=localStorage.getItem(`scriptora_prod_props_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"prop-1",scriptId:e,sourceVersion:"Draft 4.2",title:"Add Water Truck Standby for Chamber B Scene 18",description:"SFX coordinator requested a dedicated pressurized water truck for high-velocity valve release practical effect in Scene 18.",category:"SFX / Logistics",submittedBy:"Elena Rostova",submitterRole:"Director",status:"Awaiting review",impact:"Requires 1 additional standby driver and $1,200 equipment allocation.",createdAt:"2026-10-14T08:30:00Z"},{id:"prop-2",scriptId:e,sourceVersion:"Draft 4.2",title:"Swap Shoot Order for Day 3 and Day 4",description:"Shift exterior lakebed shoot earlier by 24 hours due to predicted desert sand squall.",category:"Schedule",submittedBy:"Marcus Vance",submitterRole:"Assistant Director",status:"Awaiting review",impact:"Affects talent travel call times for Kevin and background extras.",createdAt:"2026-10-13T16:45:00Z"}];return localStorage.setItem(`scriptora_prod_props_${e}`,JSON.stringify(s)),s}async function Es(e,t){try{const n=await D(`/production/${e}/proposals`,{method:"POST",body:JSON.stringify(t)});if(n?.proposal){const o=await Xe(e);return o.unshift(n.proposal),localStorage.setItem(`scriptora_prod_props_${e}`,JSON.stringify(o)),n.proposal}}catch{}const s=await Xe(e),a={id:`prop-${Date.now()}`,scriptId:e,sourceVersion:t.sourceVersion||"Draft 4.2",title:t.title||"Production Schedule Change",description:t.description||"",category:t.category||"General",submittedBy:t.submittedBy||"Collaborator",submitterRole:t.submitterRole||"Director",status:"Awaiting review",impact:t.impact||"Requires schedule adjustment",createdAt:new Date().toISOString()};return s.unshift(a),localStorage.setItem(`scriptora_prod_props_${e}`,JSON.stringify(s)),a}async function Pt(e,t,s,a=""){try{const l=await D(`/production/${e}/proposals/${t}/review`,{method:"POST",body:JSON.stringify({action:s,notes:a})});if(l?.proposal){const i=await Xe(e),c=i.findIndex(x=>x.id===t);return c!==-1&&(i[c]=l.proposal),localStorage.setItem(`scriptora_prod_props_${e}`,JSON.stringify(i)),l.proposal}}catch{}const n=await Xe(e),o=n.find(l=>l.id===t);return o&&(o.status=s==="accept"?"Accepted":s==="reject"?"Rejected":"Conflict",o.resolvedAt=new Date().toISOString(),o.resolutionNotes=a||(s==="accept"?"Accepted by Owner":"Declined during review"),localStorage.setItem(`scriptora_prod_props_${e}`,JSON.stringify(n))),o}async function Bt(e="chronicles-of-dust"){try{const a=await D(`/production/${e}/audit`);if(a?.auditTrail)return localStorage.setItem(`scriptora_prod_audit_${e}`,JSON.stringify(a.auditTrail)),a.auditTrail}catch{}const t=localStorage.getItem(`scriptora_prod_audit_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"audit-1",scriptId:e,action:"PIN_SOURCE_VERSION",category:"VERSION_INTEGRITY",details:"Pinned production source baseline to screenplay draft 'Draft 4.2' (Hash: 88f2)",sourceVersion:"Draft 4.2",actor:"Arun Kumar (Owner)",timestamp:"12m ago"},{id:"audit-2",scriptId:e,action:"CONFIRM_DOCUMENT",category:"APPROVAL",details:"Confirmed Call Sheet #01 for official release by Owner",sourceVersion:"Draft 4.2",actor:"Arun Kumar (Owner)",timestamp:"2h ago"},{id:"audit-3",scriptId:e,action:"SUBMIT_PROPOSAL",category:"CHANGE_MANAGEMENT",details:"Proposal 'Add Water Truck Standby for Chamber B' submitted by Director Elena Rostova",sourceVersion:"Draft 4.2",actor:"Elena Rostova",timestamp:"3h ago"},{id:"audit-4",scriptId:e,action:"EXTRACT_BREAKDOWN",category:"PRODUCTION_TOOL",details:"Automated element breakdown synchronized across 18 scenes from Draft 4.2",sourceVersion:"Draft 4.2",actor:"System Intelligence",timestamp:"Yesterday"}];return localStorage.setItem(`scriptora_prod_audit_${e}`,JSON.stringify(s)),s}async function Mt(e="chronicles-of-dust"){try{const n=await D(`/production/${e}/scenes`);if(n?.scenes)return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(n.scenes)),n.scenes}catch{}const t=localStorage.getItem(`scriptora_prod_scenes_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[],a=[{num:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",intExt:"EXT",dayNight:"DAY",p:"4 1/8",comp:"Moderate",day:"Day 1 of 14",cast:["KEVIN","MARCUS"],desc:"Wind whips dust across perimeter chain link. Kevin arrives at customs gate."},{num:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",intExt:"INT",dayNight:"DAY",p:"3 4/8",comp:"Simple",day:"Day 1 of 14",cast:["KEVIN","MEERA"],desc:"Meera analyzes telemetry console indicating illegal pressure drop."},{num:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",intExt:"EXT",dayNight:"DUSK",p:"7 2/8",comp:"Complex",day:"Day 2 of 14",cast:["KEVIN"],desc:"Concrete conduit pipeline across cracked alkali flats during sunset."},{num:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",intExt:"EXT",dayNight:"NIGHT",p:"5 0/8",comp:"Complex",day:"Day 3 of 14",cast:["KEVIN","MEERA"],desc:"Perimeter night patrol with solar rover and surveillance drones."},{num:5,heading:"INT. HYDRAULIC VALVE TUNNEL - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"5 4/8",comp:"Moderate",day:"Day 3 of 14",cast:["KEVIN"],desc:"Rusty underground valves with echoing industrial turbine vibration."},{num:6,heading:"EXT. DESERT SERVICE ROAD - DAY",intExt:"EXT",dayNight:"DAY",p:"5 2/8",comp:"Simple",day:"Day 4 of 14",cast:["KEVIN"],desc:"Kevin tracks tanker tire treads along decommissioned asphalt."},{num:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",intExt:"INT",dayNight:"DAY",p:"6 3/8",comp:"Moderate",day:"Day 5 of 14",cast:["COMMANDER VANCE","KEVIN"],desc:"Vance oversees regional water diversion bank from glass observatory."},{num:8,heading:"EXT. RESERVOIR INTAKE BASIN - DAY",intExt:"EXT",dayNight:"DAY",p:"5 5/8",comp:"Complex",day:"Day 6 of 14",cast:["MEERA"],desc:"Rappelling 60-foot descent down drained concrete spillway."},{num:9,heading:"INT. DRAINAGE VAULT - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"4 1/8",comp:"Moderate",day:"Day 7 of 14",cast:["KEVIN","MEERA"],desc:"Subterranean acoustic surveillance using directional hydrophones."},{num:10,heading:"EXT. PIPELINE COMPRESSOR STATION - DUSK",intExt:"EXT",dayNight:"DUSK",p:"5 3/8",comp:"Moderate",day:"Day 8 of 14",cast:["KEVIN","MARCUS"],desc:"Diesel compressor manifolds blowing atmospheric smoke into dusk sky."},{num:11,heading:"INT. CUSTOMS ARCHIVE STORAGE - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"4 4/8",comp:"Simple",day:"Day 9 of 14",cast:["KEVIN"],desc:"Investigation of legacy river compact water rights deeds on microfiche."},{num:12,heading:"EXT. DRY WASH VALLEY - DAY",intExt:"EXT",dayNight:"DAY",p:"5 6/8",comp:"Complex",day:"Day 10 of 14",cast:["KEVIN","MEERA"],desc:"High-speed pursuit through sandstone canyons with heavy convoy."},{num:13,heading:"INT. EMERGENCY SLUICE GATEWAY - DAY",intExt:"INT",dayNight:"DAY",p:"4 3/8",comp:"Moderate",day:"Day 11 of 14",cast:["KEVIN"],desc:"Manual mechanical winch operation on frozen cast-iron sluice gates."},{num:14,heading:"EXT. SOUTHWEST PRESSURE TOWER - DUSK",intExt:"EXT",dayNight:"DUSK",p:"4 6/8",comp:"Moderate",day:"Day 12 of 14",cast:["MEERA"],desc:"Exterior ladder ascent under sweeping perimeter searchlights."},{num:15,heading:"INT. GENERATOR ROOM - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"4 2/8",comp:"Simple",day:"Day 12 of 14",cast:["KEVIN","COMMANDER VANCE"],desc:"Stand-off over turbine killswitch with pulsing crimson warning beacon."},{num:16,heading:"EXT. RESERVOIR SPILLWAY - NIGHT",intExt:"EXT",dayNight:"NIGHT",p:"4 7/8",comp:"Complex",day:"Day 13 of 14",cast:["KEVIN","MEERA"],desc:"Flash flood breach through spillway catwalk with torrential rain."},{num:17,heading:"INT. CONTROL GANTRY - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"3 4/8",comp:"Complex",day:"Day 14 of 14",cast:["KEVIN","MEERA","COMMANDER VANCE"],desc:"High gantry physical climax suspended above subterranean drainage."},{num:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"2 6/8",comp:"Complex",day:"Day 2 of 14",cast:["KEVIN","MEERA"],desc:"Kevin anchors hydraulic bypass valve kit as high pressure brine seals."}];for(const n of a)s.push({id:`scene-${n.num}`,sceneNumber:n.num,scriptId:e,heading:n.heading,intExt:n.intExt,dayNight:n.dayNight,pages:n.p,complexity:n.comp,shootDay:n.day,status:n.num===4?"Needs Review":"Scheduled",snippet:n.desc,directorNotes:`Director visual notes for ${n.heading}. Maintain high contrast lighting.`,continuityNotes:"Continuity reference logged against Draft 4.2.",cast:n.cast,sidesReady:!0});return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(s)),s}async function pa(e,t){try{const l=await D(`/production/${e}/scenes/${t}`);if(l?.scene)return l.scene}catch{}const a=(await Mt(e)).find(l=>l.id===t||String(l.sceneNumber)===String(t));if(!a)return null;const o=(await Lt(e)).filter(l=>l.sceneId===a.id||l.sceneNumber===a.sceneNumber);return{...a,elements:o}}async function ua(e,t,s){try{const o=await D(`/production/${e}/scenes/${t}`,{method:"PUT",body:JSON.stringify(s)});if(o?.scene)return o.scene}catch{}const a=await Mt(e),n=a.find(o=>o.id===t||String(o.sceneNumber)===String(t));return n?(Object.assign(n,s),localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(a)),n):s}async function Lt(e="chronicles-of-dust",t=null,s=null){try{const o=new URLSearchParams;t&&o.set("category",t),s&&o.set("scene",s);const l=o.toString()?`?${o.toString()}`:"",i=await D(`/production/${e}/breakdown${l}`);if(i?.breakdown)return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(i.breakdown)),i.breakdown}catch{}const a=localStorage.getItem(`scriptora_prod_breakdown_${e}`);let n=[];if(a)try{n=JSON.parse(a)}catch{}return n.length||(n=[{id:"elem-1",scriptId:e,sceneId:"scene-18",sceneNumber:18,category:"Cast",name:"KEVIN",description:"Discredited hydro-engineer, 30s. Hero protagonist.",sourceSnippet:"Kevin kneels over cracked hydro-sensor junction box, static hissing from the diagnostic speaker.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Requires desert dust protective gear and waterproof boots."},{id:"elem-2",scriptId:e,sceneId:"scene-18",sceneNumber:18,category:"Cast",name:"MEERA",description:"Field operative with tactical harness.",sourceSnippet:"Meera anchors her cable to the iron pylon, visor reflecting the rising floodwaters below.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Tactical harness fitted for scene 18 valve climb."},{id:"elem-3",scriptId:e,sceneId:"scene-18",sceneNumber:18,category:"Props",name:"Hydraulic Bypass Valve Kit",description:"Custom machined valve kit with functional digital LED pressure display.",sourceSnippet:"Kevin clicks the bypass manifold into place. The gauge needles spike red.",status:"Confirmed",isHumanConfirmed:!0,confidence:.95,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero prop constructed by art department; 2 stunt duplicates on standby."},{id:"elem-4",scriptId:e,sceneId:"scene-18",sceneNumber:18,category:"Practical FX",name:"High-Pressure Water Spray",description:"Controlled water burst simulating cracked pipe joint failure.",sourceSnippet:"A burst of pressurized brine shoots from the seam, blinding the chamber.",status:"Needs Review",isHumanConfirmed:!1,confidence:.88,confirmedBy:null,confirmedAt:null,notes:"SFX coordinator requested dedicated water truck standby via Proposal #prop-1."},{id:"elem-5",scriptId:e,sceneId:"scene-18",sceneNumber:18,category:"Stunts",name:"Valve Pylon Cable Rappel",description:"Meera swings 18 feet across open valve chasm to catch emergency release lever.",sourceSnippet:"Meera kicks off the catwalk, swinging into the spray as the iron cable groans.",status:"Needs Review",isHumanConfirmed:!1,confidence:.92,confirmedBy:null,confirmedAt:null,notes:"Awaiting Stunt Coordinator risk assessment and harness certification."},{id:"elem-6",scriptId:e,sceneId:"scene-1",sceneNumber:1,category:"Cast",name:"KEVIN",description:"Duster coat, respirator around neck.",sourceSnippet:"KEVIN (30s), sun-scoured and weary, adjusts his solar filter.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Costume fitting complete."},{id:"elem-7",scriptId:e,sceneId:"scene-1",sceneNumber:1,category:"Cast",name:"MARCUS",description:"Border outpost security guard.",sourceSnippet:"MARCUS leans against the chain link, tapping an unlit cigarette against his wrist.",status:"Confirmed",isHumanConfirmed:!0,confidence:.98,confirmedBy:"Elena Rostova",confirmedAt:"2026-10-13T16:00:00Z",notes:"Supporting role. Day 1 shoot only."},{id:"elem-8",scriptId:e,sceneId:"scene-1",sceneNumber:1,category:"Props",name:"Solar Filter Dust Goggles",description:"Tinted goggles with worn leather straps.",sourceSnippet:"Kevin pulls the goggles over his eyes as a gust hits.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero wardrobe prop."},{id:"elem-9",scriptId:e,sceneId:"scene-1",sceneNumber:1,category:"Vehicles",name:"Solar Patrol Rover (Modified)",description:"Lightweight dune rover fitted with dual photovoltaic roof panels.",sourceSnippet:"The rover sits idling beside Gate 4, suspension coated in red grit.",status:"Confirmed",isHumanConfirmed:!0,confidence:.96,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Picture vehicle running on electric battery. Backup battery pack required."},{id:"elem-10",scriptId:e,sceneId:"scene-4",sceneNumber:4,category:"Props",name:"Night-Vision Monocular Scope",description:"Military grade digital thermal optics.",sourceSnippet:"Meera scans the wire with her thermal monocle. Three glowing silhouettes freeze.",status:"Needs Review",isHumanConfirmed:!1,confidence:.85,confirmedBy:null,confirmedAt:null,notes:"Rental request pending vendor confirmation."},{id:"elem-11",scriptId:e,sceneId:"scene-7",sceneNumber:7,category:"Cast",name:"COMMANDER VANCE",description:"Antagonist, regional water syndicate director.",sourceSnippet:"COMMANDER VANCE (50s), tailored gray linen, stands over the telemetry terminal.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Cast confirmed. Costume fitting scheduled Oct 20."},{id:"elem-12",scriptId:e,sceneId:"scene-16",sceneNumber:16,category:"Practical FX",name:"Catwalk Rain Towers",description:"Simulated industrial torrential flood conditions on exterior catwalk.",sourceSnippet:"Water cascades down the spillway faces like Niagara.",status:"Needs Review",isHumanConfirmed:!1,confidence:.9,confirmedBy:null,confirmedAt:null,notes:"Requires environmental containment permits."}],localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(n))),t&&t!=="all"&&(n=n.filter(o=>o.category.toLowerCase()===t.toLowerCase())),s&&s!=="all"&&(n=n.filter(o=>o.sceneId===s||String(o.sceneNumber)===String(s))),n}async function Ut(e,t,s){try{const o=await D(`/production/${e}/breakdown/${t}`,{method:"PUT",body:JSON.stringify(s)});if(o?.item)return o.item}catch{}const a=await Lt(e),n=a.find(o=>o.id===t);return n?(Object.assign(n,s),s.status==="Confirmed"&&(n.isHumanConfirmed=!0,n.confirmedBy="Arun Kumar (Owner)",n.confirmedAt=new Date().toISOString()),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(a)),n):s}async function xa(e,t){try{const n=await D(`/production/${e}/breakdown`,{method:"POST",body:JSON.stringify(t)});if(n?.item)return n.item}catch{}const s=await Lt(e),a={id:`elem-${Date.now()}`,scriptId:e,sceneId:t.sceneId||"scene-18",sceneNumber:Number(t.sceneNumber||18),category:t.category||"Props",name:t.name,description:t.description||"",sourceSnippet:t.sourceSnippet||"User added manual item",status:t.status||"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:new Date().toISOString(),notes:t.notes||""};return s.unshift(a),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(s)),a}async function jt(e="chronicles-of-dust"){try{const a=await D(`/production/${e}/call-sheets`);if(a?.callSheets)return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(a.callSheets)),a.callSheets}catch{}const t=localStorage.getItem(`scriptora_prod_callsheets_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"cs-1",scriptId:e,callSheetNumber:"01",shootDay:"Day 1 of 14",shootDate:"Saturday, Oct 24, 2026",generalCrewCall:"06:00 AM",shootingCall:"06:30 AM",breakfastTime:"05:15 AM",estimatedWrap:"06:30 PM",status:"Confirmed",isPublished:!0,version:"v1.0",locationName:"Mojave Outpost Gate 4",locationAddress:"Perimeter Road 9, Cantil, CA 93519",parkingNotes:"Crew parking at Basecamp Lot B (1/4 mile west of gate). Shuttle runs every 10 mins.",nearestHospital:"Kern Valley Healthcare District, 6412 Laurel Ave, Lake Isabella, CA (Ph: 760-379-2681)",weatherSummary:"Sunny, 74°F high, 48°F low. Winds WNW 10-15 mph. Dust advisory after 4:00 PM.",scenes:[{sceneNumber:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",pages:"4 1/8",cast:["KEVIN","MARCUS"],desc:"Kevin arrives at border gate, inspection with Marcus."},{sceneNumber:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",pages:"3 4/8",cast:["KEVIN","MEERA"],desc:"Kevin discovers pressure loss on telemetry terminal."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MARCUS",actor:"David Chen",pickup:"05:15 AM",hmuCall:"05:45 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MEERA",actor:"Priya Sharma",pickup:"08:30 AM",hmuCall:"09:00 AM",onSet:"10:30 AM",status:"Confirmed"}],specialInstructions:"Eye protection mandatory for all crew on exterior perimeter due to afternoon dust squall.",approvedBy:"Arun Kumar (Owner)",publishedAt:"2026-10-14T08:00:00Z"},{id:"cs-2",scriptId:e,callSheetNumber:"02",shootDay:"Day 2 of 14",shootDate:"Sunday, Oct 25, 2026",generalCrewCall:"06:30 AM",shootingCall:"07:00 AM",breakfastTime:"05:45 AM",estimatedWrap:"07:00 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:"Pumping Station Chamber B",locationAddress:"Aqueduct District Facility 4, Mojave, CA 93501",parkingNotes:"Basecamp parking inside Gate 2 secure compound. Security clearance badge required.",nearestHospital:"Antelope Valley Medical Center, 1600 W Ave J, Lancaster, CA (Ph: 661-949-5000)",weatherSummary:"Interior stage / sheltered facility. Ambient temp 68°F. Hearing protection mandatory.",scenes:[{sceneNumber:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",pages:"7 2/8",cast:["KEVIN"],desc:"Kevin examines exterior tap line."},{sceneNumber:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",pages:"2 6/8",cast:["KEVIN","MEERA"],desc:"High water pressure valve breach and cable clamp."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"},{character:"MEERA",actor:"Priya Sharma",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"}],specialInstructions:"Wet set protocols in effect for Scene 18. Waterproof camera housing and electrical GFI circuits required.",approvedBy:null,publishedAt:null}];return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),s}async function ma(e,t){try{const a=await D(`/production/${e}/call-sheets/${t}`);if(a?.callSheet)return a.callSheet}catch{}return(await jt(e)).find(a=>a.id===t)||null}async function fa(e,t){try{const n=await D(`/production/${e}/call-sheets`,{method:"POST",body:JSON.stringify(t)});if(n?.callSheet)return n.callSheet}catch{}const s=await jt(e),a={id:`cs-${Date.now()}`,scriptId:e,callSheetNumber:String(s.length+1).padStart(2,"0"),shootDay:t.shootDay||`Day ${s.length+1} of 14`,shootDate:t.shootDate||"Monday, Oct 26, 2026",generalCrewCall:t.generalCrewCall||"06:00 AM",shootingCall:t.shootingCall||"06:30 AM",breakfastTime:t.breakfastTime||"05:15 AM",estimatedWrap:t.estimatedWrap||"06:30 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:t.locationName||"Location TBD",locationAddress:t.locationAddress||"TBD",parkingNotes:t.parkingNotes||"Crew parking guidelines.",nearestHospital:t.nearestHospital||"Desert Care Network Regional, Palm Springs, CA",weatherSummary:t.weatherSummary||"Forecast pending.",scenes:t.scenes||[{sceneNumber:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",pages:"5 0/8",cast:["KEVIN","MEERA"],desc:"Perimeter fence inspection."}],castCalls:t.castCalls||[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Draft"}],specialInstructions:t.specialInstructions||"Standard safety directives.",approvedBy:null,publishedAt:null};return s.push(a),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),a}async function ba(e,t){try{const n=await D(`/production/${e}/call-sheets/${t}/publish`,{method:"POST"});if(n?.callSheet)return n.callSheet}catch{}const s=await jt(e),a=s.find(n=>n.id===t);return a?(a.status="Confirmed",a.isPublished=!0,a.version="v1.0 (Snapshot)",a.approvedBy="Arun Kumar (Owner)",a.publishedAt=new Date().toISOString(),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),a):null}async function It(e="chronicles-of-dust"){try{const a=await D(`/production/${e}/schedule`);if(a?.schedule)return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(a.schedule)),a.schedule}catch{}const t=localStorage.getItem(`scriptora_prod_schedule_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{dayNumber:1,date:"Oct 24, 2026",title:"Outpost Perimeter & Shed",location:"Mojave Gate 4",sceneNumbers:[1,2],totalPages:"7 5/8",estHours:10.5,companyMoves:0,isLocked:!0,status:"Confirmed"},{dayNumber:2,date:"Oct 25, 2026",title:"Lakebed Conduit & Chamber B",location:"Chamber B Dry Tank",sceneNumbers:[3,18],totalPages:"10 0/8",estHours:11,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:3,date:"Oct 26, 2026",title:"Perimeter Fence & Valve Tunnel",location:"Perimeter Sector 9",sceneNumbers:[4,5],totalPages:"10 4/8",estHours:11.5,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:4,date:"Oct 27, 2026",title:"Service Road Pursuit",location:"Route 66 Cutoff",sceneNumbers:[6],totalPages:"5 2/8",estHours:8,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:5,date:"Oct 28, 2026",title:"Syndicate Regional Control",location:"Syndicate Regional HQ",sceneNumbers:[7],totalPages:"6 3/8",estHours:9,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:6,date:"Oct 29, 2026",title:"Reservoir Intake Rappel",location:"Lake Mead Dry Spillway",sceneNumbers:[8],totalPages:"5 5/8",estHours:10,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:7,date:"Oct 30, 2026",title:"Drainage Sub-vaults",location:"Vault Sub-structure 3",sceneNumbers:[9],totalPages:"4 1/8",estHours:8.5,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:8,date:"Oct 31, 2026",title:"Compressor Smoke Run",location:"Compressor Station 12",sceneNumbers:[10],totalPages:"5 3/8",estHours:9,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:9,date:"Nov 01, 2026",title:"Customs Archives",location:"Outpost Archives",sceneNumbers:[11],totalPages:"4 4/8",estHours:7.5,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:10,date:"Nov 02, 2026",title:"Dry Wash Canyon Chase",location:"Red Rock Wash",sceneNumbers:[12],totalPages:"5 6/8",estHours:11,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:11,date:"Nov 03, 2026",title:"Emergency Sluice Gears",location:"Sluice Mechanism House",sceneNumbers:[13],totalPages:"4 3/8",estHours:8,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:12,date:"Nov 04, 2026",title:"Tower Scaffolding & Generator",location:"Tower 7 / Sub-basement",sceneNumbers:[14,15],totalPages:"9 0/8",estHours:10.5,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:13,date:"Nov 05, 2026",title:"Spillway Torrential Catwalk",location:"Spillway Catwalk",sceneNumbers:[16],totalPages:"4 7/8",estHours:11.5,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:14,date:"Nov 06, 2026",title:"High Gantry Climax & Wrap",location:"High Gantry Bay 4",sceneNumbers:[17],totalPages:"3 4/8",estHours:9.5,companyMoves:0,isLocked:!1,status:"Draft"}];return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(s)),s}async function ga(e,t,s){try{const o=await D(`/production/${e}/schedule/day/${t}`,{method:"PUT",body:JSON.stringify(s)});if(o?.day)return o.day}catch{}const a=await It(e),n=a.find(o=>o.dayNumber===Number(t));return n?(Object.assign(n,s),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(a)),n):s}async function ha(e){try{const s=await D(`/production/${e}/schedule/confirm`,{method:"POST"});if(s?.schedule)return s.schedule}catch{}const t=await It(e);return t.forEach(s=>{s.status="Confirmed",s.isLocked=!0}),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(t)),t}async function ks(e="chronicles-of-dust"){try{const a=await D(`/production/${e}/readiness`);if(a?.readiness)return localStorage.setItem(`scriptora_prod_readiness_${e}`,JSON.stringify(a.readiness)),a.readiness}catch{}const t=localStorage.getItem(`scriptora_prod_readiness_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"ready-1",scriptId:e,title:"Confirm Water Truck Safety Crew for Scene 18",category:"Safety / SFX",severity:"critical",status:"action_needed",description:"High-pressure brine valve burst in Scene 18 requires Stunt Coordinator sign-off and standby water tanker.",targetRoute:"/production/changes",targetEntity:"prop-1"},{id:"ready-2",scriptId:e,title:"Review 3 Unconfirmed Breakdown Items",category:"Breakdown",severity:"warning",status:"action_needed",description:"Scene 4 Night-Vision optics and Scene 18 cable rappel are currently in Needs Review status.",targetRoute:"/production/breakdown",targetEntity:"scene-18"},{id:"ready-3",scriptId:e,title:"Owner Approval Required for Call Sheet #02",category:"Call Sheets",severity:"critical",status:"action_needed",description:"Call Sheet #02 (Day 2 of 14) is currently in Draft status. Must be approved and published before crew distribution.",targetRoute:"/production/call-sheets",targetEntity:"cs-2"},{id:"ready-4",scriptId:e,title:"All 18 Scenes Stripboard Scheduled",category:"Schedule",severity:"ready",status:"resolved",description:"Every scene from Draft 4.2 has been allocated across the 14-day master shooting calendar.",targetRoute:"/production/schedule",targetEntity:null},{id:"ready-5",scriptId:e,title:"Call Sheet #01 Published & Locked",category:"Call Sheets",severity:"ready",status:"resolved",description:"Call Sheet #01 confirmed by Owner with emergency medical routes and parking directives.",targetRoute:"/production/call-sheets",targetEntity:"cs-1"},{id:"ready-6",scriptId:e,title:"Lead Talent Wardrobe Fittings Verified",category:"Cast",severity:"ready",status:"resolved",description:"Costume specs and protective goggles fitted for Kevin, Meera, and Commander Vance.",targetRoute:"/production/directory",targetEntity:"res-1"}];return localStorage.setItem(`scriptora_prod_readiness_${e}`,JSON.stringify(s)),s}async function va(e,t){try{const n=await D(`/production/${e}/readiness/${t}/resolve`,{method:"POST"});if(n?.readinessItem)return n.readinessItem}catch{}const s=await ks(e),a=s.find(n=>n.id===t);return a?(a.status="resolved",a.severity="ready",localStorage.setItem(`scriptora_prod_readiness_${e}`,JSON.stringify(s)),a):null}async function ya(e,t){try{const a=await D(`/production/${e}/restore`,{method:"POST",body:JSON.stringify({version:t})});if(a?.workspace)return a.workspace}catch{}const s=await Rt(e);return s.pinnedSourceVersion=t,s.pinnedTimestamp="Just now (Restored)",s.isStale=!1,localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(s)),s}class wa{constructor(){this.state={currentUser:null,selectedScriptId:localStorage.getItem("scriptora_selected_script")||"chronicles-of-dust",selectedVersionId:"Draft 4.2",currentSceneId:18,unreadNotifications:3,scripts:[],activeScript:null,screenplay:null,settings:null,historyStack:[]},this.listeners=new Set}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(const t of this.listeners)try{t(this.state)}catch(s){console.error("Store listener error:",s)}}setState(t){this.state={...this.state,...t},t.selectedScriptId&&localStorage.setItem("scriptora_selected_script",t.selectedScriptId),this.notify()}pushHistory(t){this.state.historyStack[this.state.historyStack.length-1]!==t&&this.state.historyStack.push(t)}getPreviousRoute(t="/workspace"){return this.state.historyStack.length>1?(this.state.historyStack.pop(),this.state.historyStack.pop()):t}async init(){try{const t=await ys(),s=await Re(),a=await us(),n=await Ss(),o=s.find(l=>l.id===this.state.selectedScriptId)||s[0];this.setState({currentUser:t,scripts:s,activeScript:o,unreadNotifications:a,settings:n})}catch(t){console.error("Init store error:",t)}}async selectScript(t){const s=this.state.scripts.find(a=>a.id===t)||await es(t);this.setState({selectedScriptId:t,activeScript:s})}async refreshNotifications(){const t=await us();this.setState({unreadNotifications:t})}async refreshScripts(){const t=await Re(),s=t.find(a=>a.id===this.state.selectedScriptId)||t[0];this.setState({scripts:t,activeScript:s})}}const f=new wa,Sa="/Scriptora/assets/logo-BG9jZ7UG.png",as=Sa;function de(e="Workspace",t="Your writing space."){const s=f.state.unreadNotifications,a=f.state.currentUser?.initials||"JD";return`
    <header class="fixed top-0 left-0 right-0 w-full z-40 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-surface-container-high/60 select-none" data-global-header="true">
      <div class="h-14 px-4 flex items-center justify-between max-w-2xl mx-auto">
        <a href="/workspace" class="flex items-center gap-2.5 min-w-0 no-underline text-inherit cursor-pointer active:opacity-80 transition-opacity">
          <img src="${as}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora" class="w-8 h-8 object-contain shrink-0" />
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
            ${f.state.currentUser?.avatarUrl?`
              <img src="${f.state.currentUser.avatarUrl}" class="w-full h-full object-cover" alt="Profile" />
            `:`
              <span>${a}</span>
            `}
          </a>
        </div>
      </div>
    </header>
  `}function pe(e="workspace"){const t=e==="workspace",s=e==="intelligence",a=e==="chat"||e==="ai-chat",n=e==="production"||e==="pre-production",o=e==="profile";return`
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

        <!-- 3. Floating Center AI Chat Button (Raised rounded-square, symbol-only, SCRIPTORA light-blue palette) -->
        <div class="flex items-center justify-center relative h-full overflow-visible">
          <a
            href="/chat"
            class="group relative flex items-center justify-center w-12 h-12 rounded-[16px] -translate-y-3.5 transition-all duration-200 select-none ${a?"bg-blue-600 text-white ring-4 ring-blue-100/90 border border-blue-500 shadow-[0_6px_16px_rgba(37,99,235,0.35)] scale-105":"bg-white text-blue-600 ring-4 ring-surface/95 border border-blue-200/90 shadow-[0_4px_12px_rgba(33,81,218,0.14),0_1px_3px_rgba(0,0,0,0.04)] hover:bg-blue-50/80 hover:border-blue-300 hover:shadow-[0_6px_16px_rgba(33,81,218,0.20)] hover:-translate-y-4 active:scale-95 active:bg-blue-100"} focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
            id="nav-tab-chat"
            aria-label="AI Chat"
            title="AI Chat — Universal Assistant"
          >
            <span class="material-symbols-outlined text-[23px] transition-transform group-hover:scale-105" ${a?`style="font-variation-settings: 'FILL' 1;"`:""}>chat_bubble</span>
          </a>
        </div>

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
  `}function y(e,t="success"){const s=document.getElementById("global-toast"),a=document.getElementById("toast-message"),n=document.getElementById("toast-icon");if(!s||!a){console.log(`[Toast ${t}]`,e);return}a.textContent=e,n&&(t==="error"?(n.textContent="error",n.className="material-symbols-outlined text-[18px] text-red-400"):t==="info"?(n.textContent="info",n.className="material-symbols-outlined text-[18px] text-blue-300"):(n.textContent="check_circle",n.className="material-symbols-outlined text-[18px] text-emerald-300")),s.classList.remove("opacity-0","pointer-events-none"),s.classList.add("opacity-100"),clearTimeout(s._timeout),s._timeout=setTimeout(()=>{s.classList.remove("opacity-100"),s.classList.add("opacity-0","pointer-events-none")},2400)}function Ia(){return`
    <main class="flex flex-col relative w-full pt-safe pb-safe bg-surface min-h-screen justify-center items-center px-4">
      <div class="flex flex-col w-full max-w-sm py-8 fade-in">
        <!-- Brand & Logo Header -->
        <header class="flex flex-col items-center justify-center pb-4 text-center">
          <img src="${as}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-16 h-16 object-contain mb-3 drop-shadow-sm" />
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
  `}function Ea(e){const t=document.getElementById("tab-signin"),s=document.getElementById("tab-register"),a=document.getElementById("tab-otp"),n=document.getElementById("flow-signin"),o=document.getElementById("flow-register"),l=document.getElementById("flow-otp");function i(m){[t,s,a].forEach(g=>{g.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 text-on-surface-variant hover:text-on-surface"}),[n,o,l].forEach(g=>g.classList.add("hidden")),m==="signin"?(t.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",n.classList.remove("hidden")):m==="register"?(s.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",o.classList.remove("hidden")):m==="otp"&&(a.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold flex items-center justify-center gap-1",l.classList.remove("hidden"))}t&&(t.onclick=()=>i("signin")),s&&(s.onclick=()=>i("register")),a&&(a.onclick=()=>i("otp"));const c=document.getElementById("toggle-pw-signin"),x=document.getElementById("signin-password");c&&x&&(c.onclick=()=>{const m=x.type==="password";x.type=m?"text":"password",c.innerHTML=`<span class="material-symbols-outlined text-[18px]">${m?"visibility_off":"visibility"}</span>`});const p=document.getElementById("btn-google-login");p&&(p.onclick=async()=>{y("Connecting with Google...");const m=await ps({email:"arun.kumar@scriptora.studio",provider:"google"});f.setState({currentUser:m}),e("/welcome")});const d=document.getElementById("form-signin");d&&(d.onsubmit=async m=>{m.preventDefault();const g=document.getElementById("signin-email").value,b=x.value;try{const v=await ps({email:g,password:b});f.setState({currentUser:v}),y(`Welcome back, ${v.displayName||v.name}`),e("/welcome")}catch(v){y(v.message,"error")}});const r=document.getElementById("form-register");r&&(r.onsubmit=async m=>{m.preventDefault();const g=document.getElementById("reg-name").value,b=document.getElementById("reg-email").value,v=document.getElementById("reg-password").value;try{const w=await Vs({name:g,email:b,password:v});f.setState({currentUser:w}),y("Account created successfully"),e("/welcome")}catch(w){y(w.message,"error")}});const u=document.getElementById("form-otp");u&&(u.onsubmit=async m=>{m.preventDefault();const g=document.getElementById("otp-phone").value;try{const b=await qs(g);f.setState({currentUser:b}),y("Phone verified successfully"),e("/welcome")}catch(b){y(b.message,"error")}});const h=document.getElementById("btn-forgot-pw");h&&(h.onclick=()=>{y("Password reset link sent to registered email","info")})}function ka(){return f.state.currentUser,`
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
          <img src="${as}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-20 h-20 object-contain mb-5 drop-shadow-sm" />

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
  `}function Ca(e){const t=document.getElementById("welcome-sign-out");t&&(t.onclick=async()=>{await Wt(),f.setState({currentUser:null}),y("Signed out successfully"),e("/auth")})}function Aa(){const e=f.state.scripts||[],t=e.find(a=>a.isCurrentDraft)||e[0],s=e.slice(0,3);return`
    ${de("Workspace","Your writing space.")}

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

    ${pe("workspace")}
  `}function Ta(e){let t=null;const s=document.getElementById("btn-continue-writing");s&&(s.onclick=()=>{const r=s.getAttribute("data-script-id");f.selectScript(r),e(`/editor/${r}?scene=18`)}),document.querySelectorAll(".script-item-row").forEach(r=>{r.onclick=u=>{if(u.target.closest(".script-more-btn"))return;const h=r.getAttribute("data-script-id");f.selectScript(h),e(`/editor/${h}`)}});const a=document.getElementById("screenplay-search");a&&(a.oninput=r=>{const u=r.target.value.toLowerCase().trim();document.querySelectorAll("#screenplays-library-list .script-item-row").forEach(m=>{const g=m.querySelector(".font-semibold")?.textContent.toLowerCase()||"";m.style.display=g.includes(u)?"flex":"none"})});const n=document.getElementById("btn-new-script"),o=document.getElementById("new-script-modal"),l=document.getElementById("close-new-script-modal"),i=document.getElementById("cancel-new-script-btn"),c=document.getElementById("form-new-script");function x(r){o&&(r?(o.classList.remove("hidden"),o.classList.add("flex"),document.getElementById("new-script-title")?.focus()):(o.classList.add("hidden"),o.classList.remove("flex")))}n&&(n.onclick=()=>x(!0)),l&&(l.onclick=()=>x(!1)),i&&(i.onclick=()=>x(!1)),c&&(c.onsubmit=async r=>{r.preventDefault();const u=document.getElementById("new-script-title").value.trim(),h=document.getElementById("new-script-format").value,m=document.getElementById("new-script-genre").value;if(u)try{const g=await Gs({title:u,format:h,genre:m});await f.refreshScripts(),f.selectScript(g.id),x(!1),y(`Created "${g.title}"`),e(`/editor/${g.id}`)}catch(g){y(g.message,"error")}});const p=document.getElementById("script-menu-popover");document.querySelectorAll(".script-more-btn").forEach(r=>{r.onclick=u=>{u.stopPropagation(),t=r.getAttribute("data-script-id");const h=r.getBoundingClientRect();p.style.top=`${h.bottom+window.scrollY+4}px`,p.style.left=`${Math.min(h.left-130,window.innerWidth-180)}px`,p.classList.remove("hidden")}}),window.onclick=r=>{!r.target.closest("#script-menu-popover")&&!r.target.closest(".script-more-btn")&&p?.classList.add("hidden")},document.getElementById("menu-opt-open")?.addEventListener("click",()=>{p.classList.add("hidden"),t&&(f.selectScript(t),e(`/editor/${t}`))}),document.getElementById("menu-opt-rename")?.addEventListener("click",async()=>{p.classList.add("hidden");const r=prompt("Enter new title for this screenplay:");r&&r.trim()&&(await Ks(t,{title:r.trim()}),await f.refreshScripts(),y("Screenplay renamed"),e("/workspace"))}),document.getElementById("menu-opt-duplicate")?.addEventListener("click",async()=>{p.classList.add("hidden"),await zs(t),await f.refreshScripts(),y("Screenplay duplicated"),e("/workspace")}),document.getElementById("menu-opt-archive")?.addEventListener("click",async()=>{p.classList.add("hidden"),await Js(t),await f.refreshScripts(),y("Screenplay archived"),e("/workspace")}),document.getElementById("menu-opt-delete")?.addEventListener("click",async()=>{p.classList.add("hidden"),confirm("Are you sure you want to delete this screenplay? This action cannot be undone.")&&(await Ws(t),await f.refreshScripts(),y("Screenplay deleted"),e("/workspace"))});const d=document.getElementById("btn-export-library");d&&(d.onclick=()=>{const r="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(f.state.scripts,null,2)),u=document.createElement("a");u.setAttribute("href",r),u.setAttribute("download",`scriptora_library_${Date.now()}.json`),document.body.appendChild(u),u.click(),u.remove(),y("Exported library manifest (.json)")})}const Pa=new Set(["HE","SHE","IT","ITS","HIM","HER","HERS","HIS","THEY","THEM","THEIR","THEIRS","WE","US","OUR","OURS","YOU","YOUR","YOURS","ME","MY","MINE","I","WHO","WHOM","WHOSE","WHAT","WHICH","WHEN","WHERE","WHY","HOW","AND","OR","BUT","IF","SO","FOR","NOR","YET","BECAUSE","AS","AT","BY","FROM","IN","INTO","OF","OFF","ON","ONTO","OUT","OVER","TO","UP","WITH","THE","A","AN","THIS","THAT","THESE","THOSE","YES","NO","NOT","OK","NOW","THEN","HERE","THERE","SH","SA","AR","ARA","SAN","SANT","SANTH","SANTHO","SO"]);function dt(e){if(!e||typeof e!="string")return"";let t=e.replace(/\([^)]*\)/g,"").replace(/[^a-zA-Z0-9\s'-]/g,"").trim().toUpperCase();return t==="ARAF"&&(t="ARAVIND"),t}function Jt(e){if(!e||typeof e!="string")return!1;const t=dt(e);return!(!t||t.length<3||Pa.has(t)||/\b(INT|EXT|SCENE|DAY|NIGHT|MORNING|EVENING|DUSK|DAWN|CUT TO|FADE|TRANSITION)\b/i.test(t)||t.split(/\s+/).length>3||t.length>30)}function Cs(e){if(!Array.isArray(e))return[];const t=[],s=new Set;return e.forEach(n=>{const o=typeof n=="string"?n:n?.name||n?.content||"",l=dt(o);Jt(l)&&(s.has(l)||(s.add(l),t.push(l)))}),t.filter(n=>!(t.some(i=>i!==n&&i.startsWith(n)&&i.length>n.length)||t.some(i=>i!==n&&i.length>=5&&n.length<=4&&i.startsWith(n.slice(0,3)))))}let S=null,fe=null,Yt=null,At=!1,be=!1,We=!0,Ue=!1,Vt="EN",Ne=[],ze=-1,qt=null,Gt=null,ns=null,ie=localStorage.getItem("scriptora_autosave")!=="false",pt="screenplay",tt=!1;const oe=[],As=46;function $a(e,t=null){const s=f.state.scripts?.find(a=>a.id===e)||f.state.activeScript||{title:"Untitled Screenplay",draft:"Draft 1.0"};return f.state.currentUser?.initials,`
    <div id="editor-root" class="flex flex-col min-h-screen bg-slate-100 text-slate-900 w-full relative select-text antialiased">
      
      <!-- ========================================================= -->
      <!-- STATIC TOP HEADER (FIXED: Never scrolls with screenplay)  -->
      <!-- ========================================================= -->
      <header id="editor-fixed-header" class="fixed top-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all">
        
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
              <button id="btn-toggle-autosave" class="flex items-center gap-1.5 pl-1.5 pr-2.5 h-full hover:bg-slate-50 active:scale-95 transition-all text-xs font-medium text-slate-700 hover:text-slate-900" title="Toggle Auto-save (Current: ${ie?"ON":"OFF"})">
                <span class="w-1.5 h-1.5 rounded-full ${ie?"bg-emerald-500 animate-pulse":"bg-slate-400"}" id="autosave-dot"></span>
                <span id="autosave-toggle-label">${ie?"Auto":"Off"}</span>
              </button>
            </div>

            <!-- Master Toolbar Visibility Toggle [⋮] -->
            <button id="btn-toggle-editor-toolbar" class="w-7 h-7 flex items-center justify-center ${tt?"text-blue-600 bg-blue-50 border-blue-200/90":"text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50"} rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0" title="${tt?"Collapse Editor Toolbars (Writing Mode)":"Expand Editor Toolbars (Tools & Formatting)"}" aria-label="Toggle Editor Toolbars">
              <span class="material-symbols-outlined text-[18px]">more_vert</span>
            </button>

            <!-- Collaborate Link -->
            <a href="/profile/collaborators?from=editor&scriptId=${e}" id="editor-collab-btn" aria-label="Collaborators" class="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors no-underline" title="Collaborators">
              <span class="material-symbols-outlined text-[19px]">group</span>
            </a>
          </div>
        </div>

        <!-- COLLAPSIBLE SECONDARY TOOLBAR ROWS (Master Visibility via Header [⋮]) -->
        <div id="editor-collapsible-toolbars" class="${tt?"":"hidden"} w-full transition-all duration-200">
          
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
      <main id="editor-main-scroll" class="flex-1 w-full pb-16 overflow-y-auto min-h-screen flex flex-col items-center transition-[padding] duration-200 ease-out" style="padding-top: ${tt?"208px":"136px"}; transition: padding-top 0.2s ease-out;">
        
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
  `}function qe({id:e,name:t,close:s,restore:a}){try{window.history.pushState({editorSubViewId:e,editorSubViewName:t},"")}catch{}oe.push({id:e,name:t,close:s,restore:a})}function H(e){const t=oe.findIndex(s=>s.id===e);if(t!==-1){if(t===oe.length-1){const s=oe.pop();s&&typeof s.close=="function"&&s.close();const a=oe[oe.length-1];a&&typeof a.restore=="function"&&a.restore()}else{const s=oe.splice(t,1)[0];s&&typeof s.close=="function"&&s.close()}try{window.history.back()}catch{}}}function Na(){if(pt==="titlepage")return yt(),!0;if(oe.length>0){const e=oe.pop();e&&typeof e.close=="function"&&e.close();const t=oe[oe.length-1];return t&&typeof t.restore=="function"&&t.restore(),!0}return!1}async function Ba(e,t){oe.length=0,window.__scriptoraEditorPopstate=l=>pt==="titlepage"?(wt("screenplay"),!0):oe.length>0?Na():!1;const s=document.getElementById("editor-back-btn");s&&(s.onclick=()=>{if(pt==="titlepage"){yt();return}if(oe.length>0){window.history.back();return}be&&rt(!1),window.__scriptoraEditorPopstate=null,t("/workspace")}),S=await Ys(e),Ae(),Ot();const a=document.getElementById("editor-save-btn");a&&(a.onclick=()=>rt(!0)),Ra(),Ma();const n=document.getElementById("editor-collab-btn");n&&(n.onclick=l=>{l.preventDefault(),be&&rt(!1),f.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile/collaborators?from=editor&scriptId=${e}`)});const o=document.getElementById("editor-profile-btn");o&&(o.onclick=l=>{l.preventDefault(),be&&rt(!1),f.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile?from=editor&scriptId=${e}`)}),window.addEventListener("keydown",Da),Ja(e,t),Ga(),Ka(),za(),La(),Oa(),Ya(),Xa(e),Va()}function Da(e){(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"&&(e.preventDefault(),rt(!0)),(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="f"&&(e.preventDefault(),Dt(!0)),(e.ctrlKey||e.metaKey)&&e.key==="Enter"&&(e.preventDefault(),os())}function Ra(){const e=document.getElementById("btn-toggle-autosave"),t=document.getElementById("autosave-dot"),s=document.getElementById("autosave-toggle-label");e&&(e.onclick=a=>{a.stopPropagation(),ie=!ie,localStorage.setItem("scriptora_autosave",String(ie)),ie?(t&&(t.className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"),s&&(s.textContent="Auto"),e.title="Toggle Auto-save (Current: ON)",y("Auto-save enabled"),be&&ke()):(t&&(t.className="w-1.5 h-1.5 rounded-full bg-slate-400"),s&&(s.textContent="Off"),e.title="Toggle Auto-save (Current: OFF)",clearTimeout(Yt),y("Auto-save disabled · Tap floppy to save"))})}function vt(){const e=document.getElementById("editor-fixed-header"),t=document.getElementById("editor-main-scroll");if(!e||!t)return;if(Ue){t.style.paddingTop=`${e.offsetHeight||56}px`,t.style.paddingBottom="32px";return}const s=e.offsetHeight;s>0&&(t.style.paddingTop=`${56+s}px`,t.style.paddingBottom="88px")}function Ma(){const e=document.getElementById("btn-toggle-editor-toolbar"),t=document.getElementById("editor-collapsible-toolbars");vt(),window.addEventListener("resize",vt),e&&(e.onclick=s=>{s.preventDefault(),s.stopPropagation(),tt=!tt,tt?(t&&t.classList.remove("hidden"),e.className="w-7 h-7 flex items-center justify-center text-blue-600 bg-blue-50 border-blue-200/90 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Collapse Editor Toolbars (Writing Mode)"):(t&&t.classList.add("hidden"),e.className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Expand Editor Toolbars (Tools & Formatting)"),vt()})}function yt(){if(pt==="titlepage"){wt("screenplay");try{window.history.state?.editorTab==="titlepage"&&window.history.back()}catch{}}}function La(){const e=document.getElementById("doc-tab-screenplay"),t=document.getElementById("doc-tab-titlepage"),s=document.getElementById("btn-quick-title-page"),a=document.getElementById("menu-btn-title-page"),n=document.getElementById("doc-tab-titlepage-close"),o=document.getElementById("btn-close-titlepage-sheet");e&&(e.onclick=()=>yt()),t&&(t.onclick=l=>{l.preventDefault(),wt("titlepage")}),n&&(n.onclick=l=>{l.preventDefault(),l.stopPropagation(),yt()}),o&&(o.onclick=l=>{l.preventDefault(),l.stopPropagation(),yt()}),s&&(s.onclick=()=>wt("titlepage")),a&&(a.onclick=()=>{H("moreMenu"),wt("titlepage")})}function wt(e){if(pt===e)return;pt=e;const t=document.getElementById("screenplay-pages-container"),s=document.getElementById("title-page-container"),a=document.getElementById("doc-tab-screenplay"),n=document.getElementById("doc-tab-titlepage-wrap");if(e==="titlepage"){t&&t.classList.add("hidden"),s&&(s.classList.remove("hidden"),s.classList.add("flex")),n&&(n.className="flex items-center rounded-t-lg transition-all border-b-2 border-blue-600 bg-white text-blue-700 shadow-2xs group"),a&&(a.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 rounded-t-lg transition-all"),ja();try{window.history.state?.editorTab!=="titlepage"&&window.history.pushState({editorTab:"titlepage"},"")}catch{}}else s&&(s.classList.add("hidden"),s.classList.remove("flex")),t&&t.classList.remove("hidden"),a&&(a.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-blue-600 text-blue-700 bg-white rounded-t-lg transition-all shadow-2xs"),n&&(n.className="flex items-center rounded-t-lg transition-all border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 group");vt()}function ja(){if(!S)return;const e=S.titlePage||{},t=document.getElementById("tp-doc-title"),s=document.getElementById("tp-doc-by"),a=document.getElementById("tp-doc-author"),n=document.getElementById("tp-doc-phone"),o=document.getElementById("tp-doc-email"),l=document.getElementById("tp-doc-address"),i=e.title||S.title||"";t&&(t.innerText=i,i||(t.innerHTML=""));const c=e.by!==void 0?e.by:"Written by";s&&(s.innerText=c,c||(s.innerHTML=""));const x=e.author||"";a&&(a.innerText=x,x||(a.innerHTML=""));let p=e.phone||"";if(!p&&e.contact){const h=e.contact.split("·").map(m=>m.trim()).find(m=>m.includes("+")||/\d{3}/.test(m));h&&(p=h)}n&&(n.innerText=p,p||(n.innerHTML=""));let d=e.email||"";if(!d&&e.contact&&e.contact.includes("@")){const u=e.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);u&&(d=u[0])}o&&(o.innerText=d,d||(o.innerHTML=""));const r=e.address||"";l&&(l.innerText=r,r||(l.innerHTML=""))}function Oa(){const e=document.getElementById("tp-doc-title"),t=document.getElementById("tp-doc-by"),s=document.getElementById("tp-doc-author"),a=document.getElementById("tp-doc-phone"),n=document.getElementById("tp-doc-email"),o=document.getElementById("tp-doc-address"),l=()=>{if(!S)return;S.titlePage||(S.titlePage={});const i=e?e.innerText.trim():"",c=t?t.innerText.trim():"",x=s?s.innerText.trim():"",p=a?a.innerText.trim():"",d=n?n.innerText.trim():"",r=o?o.innerText.trim():"";if(S.titlePage.title=i,S.titlePage.by=c||"Written by",S.titlePage.author=x,S.titlePage.phone=p,S.titlePage.email=d,S.titlePage.address=r,S.titlePage.contact=[p,d,r].filter(Boolean).join(" · "),i){S.title=i;const u=document.getElementById("editor-script-title"),h=document.getElementById("doc-tab-title-label");u&&(u.textContent=i),h&&(h.textContent=i)}be=!0,ct("Unsaved"),ie&&ke()};[e,t,s,a,n,o].forEach(i=>{i&&(i.oninput=l,i.onblur=()=>{i.innerText.trim()===""&&(i.innerHTML=""),l()})})}function Ae(){const e=document.getElementById("screenplay-pages-container");if(!e||!S)return;const t=S.scenes||[],s=[];t.forEach(l=>{(l.blocks||[]).forEach(i=>{s.push({block:i,sceneNumber:l.number,sceneId:l.id,slugline:l.slugline})})});const a=[];let n={pageNumber:1,items:[]},o=0;s.forEach(l=>{if(l.block.type==="pagebreak"){n.items.push(l),a.push(n),n={pageNumber:a.length+1,items:[]},o=0;return}const i=Ts(l.block);o+i>As&&n.items.length>0&&(a.push(n),n={pageNumber:a.length+1,items:[]},o=0),n.items.push(l),o+=i}),n.items.length>0&&a.push(n),a.length===0&&a.push({pageNumber:1,items:[{block:{id:"b-1-1",type:"scene",content:"INT. NEW SCENE - DAY"},sceneNumber:1,sceneId:"scene-1",slugline:"INT. NEW SCENE - DAY"},{block:{id:"b-1-2",type:"action",content:"Type your screenplay action here..."},sceneNumber:1,sceneId:"scene-1",slugline:"INT. NEW SCENE - DAY"}]}),e.innerHTML=a.map(l=>`
    <div class="screenplay-page-sheet w-full max-w-[816px] min-h-[1123px] bg-white rounded-md sm:rounded-lg shadow-md border border-slate-200/90 flex flex-col font-courier text-[12pt] leading-[1.25] text-slate-900 relative transition-all" data-page-num="${l.pageNumber}">
      
      <!-- Top Page Header: Page number in top right (Only for Page > 1, no watermark overlay) -->
      <div class="w-full flex items-center justify-end h-7 pb-2 select-none text-[12pt] text-slate-600 font-courier">
        <span>${l.pageNumber>1?`${l.pageNumber}.`:""}</span>
      </div>

      <!-- Screenplay Blocks naturally flowing across this A4 page -->
      <div class="page-blocks-wrapper flex flex-col flex-1 w-full">
        ${l.items.map(i=>Ns(i.block,i.sceneNumber,i.sceneId)).join("")}
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
  `).join(""),Ha(),_t()}function Ts(e){if(e.type==="pagebreak")return 1;const t=e.content||"";return e.type==="scene"?3:e.type==="action"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="character"?2:e.type==="parenthetical"?1:e.type==="dialogue"?Math.max(1,Math.ceil(t.length/38))+1:e.type==="transition"||e.type==="shot"?2:e.type==="text"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="note"||e.type==="outline"?2:e.type==="act"||e.type==="endact"?3:e.type==="sequence"?2:e.type==="dual"?4:e.type==="lyrics"?2:e.type==="image"?10:2}function ms(e){let t=!1;(S.scenes||[]).forEach(s=>{const a=(s.blocks||[]).findIndex(n=>n.id===e);a!==-1&&(s.blocks.splice(a,1),t=!0)}),t&&(be=!0,Ae(),y("Page break removed"),ie&&ke())}function os(e=null){const t=e||fe,s=S.scenes||[];if(s.length===0)return;const a={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"};let n=!1;if(t)for(let o of s){const l=(o.blocks||[]).findIndex(i=>i.id===t);if(l!==-1){o.blocks.splice(l+1,0,a),n=!0;break}}if(!n){const o=s[s.length-1];o.blocks||(o.blocks=[]),o.blocks.push(a)}be=!0,Ae(),y("Page break inserted"),ie&&ke()}function Ps(e=null){const t=e||fe,s=S.scenes||[];if(s.length===0){ls();return}const a={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},n={id:"b-"+Date.now(),type:"action",content:""};let o=null,l=-1;if(t)for(let i of s){const c=(i.blocks||[]).findIndex(x=>x.id===t);if(c!==-1){o=i,l=c+1;break}}o||(o=s[s.length-1],l=o.blocks.length),o.blocks.splice(l,0,a,n),be=!0,Ae(),setTimeout(()=>{const i=document.getElementById(n.id);if(i){const c=i.hasAttribute("contenteditable")?i:i.querySelector('[contenteditable="true"]');c&&c.focus(),i.scrollIntoView({behavior:"smooth",block:"center"})}},50),y("New page inserted"),ie&&ke()}function _a(e){const t=document.querySelector(`.screenplay-page-sheet[data-page-num="${e}"]`);let s=null;if(t){const a=t.querySelectorAll(".screenplay-block");a.length>0&&(s=a[a.length-1].getAttribute("data-block-id"))}Ps(s)}function ls(){const e=S.scenes||[],t=e.length+1,s={id:"scene-"+Date.now(),number:t,slugline:`INT. SCENE ${t} - DAY`,blocks:[{id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},{id:"b-"+Date.now()+"-1",type:"scene",content:`INT. SCENE ${t} - DAY`},{id:"b-"+Date.now()+"-2",type:"action",content:""}]};e.push(s),be=!0,Ae(),setTimeout(()=>{const n=document.getElementById(s.blocks[1].id);if(n){const o=n.hasAttribute("contenteditable")?n:n.querySelector('[contenteditable="true"]');o&&o.focus(),n.scrollIntoView({behavior:"smooth",block:"center"})}},80);const a=document.querySelectorAll(".screenplay-page-sheet").length;y(`Added Page at End (Page ${a})`),ie&&ke()}function $s(e=null){let t=e;if(!t&&fe){const p=document.getElementById(fe),d=p?p.closest(".screenplay-page-sheet"):null;d&&(t=parseInt(d.getAttribute("data-page-num"),10))}t||(t=1);const s=S.scenes||[];if(s.length===0){ls();return}if(t<=1){const p={id:"scene-"+Date.now(),number:1,slugline:"INT. SCENE 1 - DAY",blocks:[{id:"b-"+Date.now()+"-1",type:"scene",content:"INT. SCENE 1 - DAY"},{id:"b-"+Date.now()+"-2",type:"action",content:""},{id:"pb-"+Date.now()+"-3",type:"pagebreak",content:"PAGE BREAK"}]};s.unshift(p),s.forEach((d,r)=>{d.number=r+1}),be=!0,Ae(),Ot(),setTimeout(()=>{const d=document.getElementById(p.blocks[0].id);if(d){const r=d.hasAttribute("contenteditable")?d:d.querySelector('[contenteditable="true"]');r&&r.focus(),d.scrollIntoView({behavior:"smooth",block:"center"})}},80),y("Added Page Before (Page 1)"),ie&&ke();return}const a=document.querySelector(`.screenplay-page-sheet[data-page-num="${t}"]`);let n=null;if(a){const p=a.querySelector(".screenplay-block");p&&(n=p.getAttribute("data-block-id"))}let o=null,l=-1;if(n)for(let p of s){const d=(p.blocks||[]).findIndex(r=>r.id===n);if(d!==-1){o=p,l=d;break}}o||(o=s[0],l=0);const i={id:"pb-"+Date.now()+"-a",type:"pagebreak",content:"PAGE BREAK"},c={id:"b-"+Date.now()+"-b",type:"action",content:""},x={id:"pb-"+Date.now()+"-c",type:"pagebreak",content:"PAGE BREAK"};o.blocks.splice(l,0,i,c,x),be=!0,Ae(),setTimeout(()=>{const p=document.getElementById(c.id);if(p){const d=p.hasAttribute("contenteditable")?p:p.querySelector('[contenteditable="true"]');d&&d.focus(),p.scrollIntoView({behavior:"smooth",block:"center"})}},80),y(`Added Page Before (Page ${t})`),ie&&ke()}function Ns(e,t,s){const a=e.type==="pagebreak",n=e.type==="scene",o=e.type==="character",l=e.type==="parenthetical",i=e.type==="dialogue",c=e.type==="transition",x=e.type==="shot",p=e.type==="text",d=e.type==="note",r=e.type==="outline",u=e.type==="act",h=e.type==="endact",m=e.type==="sequence",g=e.type==="dual",b=e.type==="lyrics",v=e.type==="image",w=e.type==="action"||!a&&!n&&!o&&!l&&!i&&!c&&!x&&!p&&!d&&!r&&!u&&!h&&!m&&!g&&!b&&!v;if(a)return`
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
        <span class="scene-num-indicator -ml-10 w-7 mr-3 shrink-0 font-mono text-slate-400 font-bold select-none text-[12pt] text-right ${We?"":"hidden"}">${t}</span>
        <div class="flex-1 tracking-wider uppercase outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${ve(e.content)}</div>
      </div>
    `;if(w)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${ve(e.content)}</div>
    `;if(o)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="character" class="screenplay-block uppercase font-bold tracking-wider text-slate-900 text-left mt-3.5 mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[37%] max-w-[28ch]" contenteditable="true" spellcheck="false">${ve(e.content)}</div>
    `;if(l)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="parenthetical" class="screenplay-block italic text-slate-600 text-left mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[26%] max-w-[24ch]" contenteditable="true" spellcheck="false">${ve(e.content)}</div>
    `;if(i)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dialogue" class="screenplay-block text-left text-slate-900 mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[17%] max-w-[36ch]" contenteditable="true" spellcheck="false">${ve(e.content)}</div>
    `;if(c)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="transition" class="screenplay-block w-full text-right uppercase font-bold tracking-wider text-slate-900 mt-2 mb-4 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${ve(e.content)}</div>
    `;if(x)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="shot" class="screenplay-block uppercase font-bold tracking-wider text-slate-900 text-left my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${ve(e.content||"CLOSE ON:")}</div>
    `;if(p)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="text" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${ve(e.content)}</div>
    `;if(d)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="note" class="screenplay-block text-amber-900 bg-amber-50/80 border-l-4 border-amber-400 p-2 my-2.5 rounded-r font-mono text-xs outline-none focus:ring-1 focus:ring-amber-400 cursor-text select-text" contenteditable="true" spellcheck="false">${ve(e.content||"[[ NOTE: Script comment... ]]")}</div>
    `;if(r)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="outline" class="screenplay-block text-slate-500 uppercase tracking-widest font-sans font-bold text-xs my-2 border-b border-slate-200 pb-1 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${ve(e.content||"OUTLINE BEAT")}</div>
    `;if(u)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="act" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-base outline-none focus:bg-blue-50/50 rounded px-1 cursor-text underline decoration-2 underline-offset-4" contenteditable="true" spellcheck="false">${ve(e.content||"ACT I")}</div>
    `;if(h)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="endact" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${ve(e.content||"END OF ACT I")}</div>
    `;if(m)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="sequence" class="screenplay-block uppercase font-bold tracking-wide text-slate-800 my-3 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${ve(e.content||"SEQUENCE 1")}</div>
    `;if(g)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dual" class="screenplay-block screenplay-dual-dialogue-grid">
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${ve(e.char1||"CHARACTER A")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${ve(e.dia1||"Dialogue A")}</div>
        </div>
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${ve(e.char2||"CHARACTER B")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${ve(e.dia2||"Dialogue B")}</div>
        </div>
      </div>
    `;if(b)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="lyrics" class="screenplay-block text-center italic text-slate-800 my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${ve(e.content||"♫ Musical lyrics... ♫")}</div>
    `;if(v){const $=e.url||e.content||"https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80",T=Xt(e.caption||"");return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="image" class="screenplay-block my-4 flex flex-col items-center group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-2.5 shadow-2xs transition-all">
        <div class="w-full flex items-center justify-center min-h-[180px] max-h-[420px] rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200/60">
          <img src="${$}" alt="${T||"Storyboard"}" class="max-h-[400px] w-auto max-w-full object-contain rounded-md shadow-xs bg-white" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80';" loading="eager" />
        </div>
        <div class="text-[11px] font-sans text-slate-600 italic mt-2 text-center outline-none px-2 py-0.5 rounded focus:bg-white w-full cursor-text" contenteditable="true" data-placeholder="Add a storyboard caption...">${T||"Storyboard visual concept"}</div>
        <button class="btn-delete-img-block absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-md text-xs font-bold" data-block-id="${e.id}" data-scene-id="${s}" title="Delete image">✕</button>
      </div>
    `}return`
    <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true">${ve(e.content)}</div>
  `}function ve(e){if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return Xt(e);try{let o=function(l){const i=Array.from(l.childNodes);for(const c of i)if(c.nodeType===Node.ELEMENT_NODE){if(c.tagName==="SPAN"&&(c.style?.textDecoration?.includes("line-through")||c.style?.textDecorationLine?.includes("line-through"))){const p=document.createElement("s");p.innerHTML=c.innerHTML,l.replaceChild(p,c),o(p);continue}if(n.has(c.tagName)){for(;c.attributes.length>0;)c.removeAttribute(c.attributes[0].name);o(c)}else{const x=document.createTextNode(c.textContent||"");l.replaceChild(x,c)}}};var t=o;const a=new DOMParser().parseFromString(`<body>${e}</body>`,"text/html"),n=new Set(["B","STRONG","I","EM","U","S","STRIKE","DEL","BR","SPAN"]);return o(a.body),a.body.innerHTML}catch{return Xt(e)}}function Xt(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}function St(e){if(!e||typeof e!="string")return e;let t=e.replace(/^(\s*["'“‘(]*)([a-z\u00E0-\u00FC])/u,(s,a,n)=>a+n.toUpperCase());return t=t.replace(/([.!?]["'”’)]*\s+["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,a,n)=>a+n.toUpperCase()),t=t.replace(/(\n\s*["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,a,n)=>a+n.toUpperCase()),t}function lt(e){let t=0;const s=window.getSelection();if(s&&s.rangeCount>0){const a=s.getRangeAt(0),n=a.cloneRange();n.selectNodeContents(e),n.setEnd(a.endContainer,a.endOffset),t=n.toString().length}return t}function it(e,t){const s=window.getSelection();if(!s)return;const a=document.createRange();if(t<=0){a.selectNodeContents(e),a.collapse(!0),s.removeAllRanges(),s.addRange(a);return}let n=0,o=!1;function l(i){if(!o){if(i.nodeType===Node.TEXT_NODE){const c=i.nodeValue.length;if(n+c>=t){a.setStart(i,Math.min(t-n,c)),a.collapse(!0),o=!0;return}n+=c}else for(let c=0;c<i.childNodes.length;c++)if(l(i.childNodes[c]),o)return}}l(e),o||(a.selectNodeContents(e),a.collapse(!1)),s.removeAllRanges(),s.addRange(a)}function Bs(e){const t=e.hasAttribute("contenteditable")?e:e.querySelector('[contenteditable="true"]');t&&(t.onfocus=()=>{fe=e.getAttribute("data-block-id");const s=e.getAttribute("data-block-type")||"action";Ms(s)},t.oninput=()=>{be=!0;const s=e.getAttribute("data-block-type")||"action",a=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!a){const n=t.innerText,o=St(n);if(o!==n){const l=lt(t);t.innerText=o,it(t,l)}}Ye(e,t.innerHTML),ct("Unsaved"),ie&&ke(),Rs(e,t),_t()},t.onblur=()=>{const s=e.getAttribute("data-block-type")||"action",a=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!a){const n=t.innerText,o=St(n);o!==n&&(t.innerText=o)}if(Ye(e,t.innerHTML),s==="character")is(t.innerText);else if(s==="scene"){const n=at(t.innerText);n.location&&rs(n.location)}},t.onpaste=()=>{const s=e.getAttribute("data-block-type")||"action";setTimeout(()=>{const a=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!a){const n=t.innerText,o=St(n);if(o!==n){const l=lt(t);t.innerText=o,it(t,l)}}Ye(e,t.innerHTML)},0)},t.onkeydown=s=>{Fa(s,e,t)})}function Ha(){document.querySelectorAll(".screenplay-block").forEach(Bs),document.querySelectorAll(".btn-delete-img-block").forEach(t=>{t.onclick=s=>{s.stopPropagation();const a=t.getAttribute("data-block-id"),n=t.getAttribute("data-scene-id");a&&n&&ht(n,a)}}),document.querySelectorAll(".btn-remove-pagebreak").forEach(t=>{t.onclick=s=>{s.stopPropagation();const a=t.getAttribute("data-block-id");a&&ms(a)}}),document.querySelectorAll('[data-block-type="pagebreak"]').forEach(t=>{t.onkeydown=s=>{if(s.key==="Backspace"||s.key==="Delete"){s.preventDefault();const a=t.getAttribute("data-block-id");a&&ms(a)}}}),document.querySelectorAll(".btn-page-add-before").forEach(t=>{t.onclick=s=>{s.stopPropagation();const a=parseInt(t.getAttribute("data-page-num"),10)||1;$s(a)}}),document.querySelectorAll(".btn-page-add-after").forEach(t=>{t.onclick=s=>{s.stopPropagation();const a=parseInt(t.getAttribute("data-page-num"),10)||1;_a(a)}})}function at(e){const t=e.match(/^(INT\.\/EXT\.|INT\.|EXT\.|I\/E\.)\s*/i),s=t?t[1].toUpperCase():"INT.",n=(t?e.slice(t[0].length):e).split(/\s+-\s*|\s+-/),o=(n[0]||"").trim().toUpperCase(),l=(n[1]||"").trim().toUpperCase();return{intExt:s,location:o,time:l}}function is(e){if(!S)return;const t=dt(e);Jt(t)&&(Array.isArray(S.characters)||(S.characters=[]),S.characters=S.characters.filter(s=>{const a=dt(s);return!(!Jt(a)||t.startsWith(a)&&a.length<t.length||t.length>=5&&a.length<=4&&t.startsWith(a.slice(0,3)))}),S.characters.includes(t)||S.characters.push(t))}function rs(e){if(!S)return;const t=(e||"").trim().toUpperCase();!t||t.length<2||(Array.isArray(S.locations)||(S.locations=[]),S.locations=S.locations.filter(s=>t.startsWith(s)&&s.length<t.length?S.scenes?.some(n=>n.blocks?.some(o=>o.type==="scene"&&at(o.content).location===s)):!0),S.locations.includes(t)||S.locations.push(t))}function Ye(e,t){if(!S)return;const s=e.getAttribute("data-block-id"),a=e.getAttribute("data-scene-id"),n=S.scenes.find(l=>l.id===a);if(!n)return;const o=n.blocks.find(l=>l.id===s);if(o&&(o.type==="image"?o.caption=t:o.content=t,o.type==="scene")){const l=(t||"").replace(/<[^>]+>/g,""),i=at(l);o.intExt=i.intExt,o.location=i.location,o.time=i.time,n.slugline=l,n.location=i.location,n.time=i.time}}function ht(e,t){if(!S)return;const s=S.scenes.find(o=>o.id===e);if(!s)return;const a=s.blocks.findIndex(o=>o.id===t);if(a!==-1&&(s.blocks.splice(a,1),be=!0,ie&&ke()),s.blocks.length===0&&S.scenes.length>1){const o=S.scenes.findIndex(l=>l.id===e);o!==-1&&(S.scenes.splice(o,1),S.scenes.forEach((l,i)=>{l.number=i+1}),Ot())}else s.blocks.length===0&&s.blocks.push({id:`b-${Date.now().toString().slice(-6)}`,type:"action",content:""});const n=document.getElementById(t);n&&n.remove(),_t()}function Fa(e,t,s){const a=t.getAttribute("data-block-type"),n=t.getAttribute("data-scene-id"),o=t.getAttribute("data-block-id"),l=document.getElementById("editor-autocomplete-dropdown");if(l&&!l.classList.contains("hidden")){if(e.key==="ArrowDown"){e.preventDefault(),fs(1);return}if(e.key==="ArrowUp"){e.preventDefault(),fs(-1);return}if(e.key==="Enter"||e.key==="Tab"){const i=l.querySelector(".autocomplete-item.active");if(i){e.preventDefault(),i.click();return}}if(e.key==="Escape"){Et();return}}if((e.ctrlKey||e.metaKey)&&!e.altKey){const i=e.key.toLowerCase();if(i==="b"){e.preventDefault(),Je("bold");return}if(i==="i"){e.preventDefault(),Je("italic");return}if(i==="u"){e.preventDefault(),Je("underline");return}}if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&e.key&&e.key.length===1&&(["bold","italic","underline","strikeThrough"].forEach(i=>{if(Ee[i]===!0&&!document.queryCommandState(i))try{document.execCommand(i,!1,null)}catch{}else if(Ee[i]===!1&&document.queryCommandState(i))try{document.execCommand(i,!1,null)}catch{}}),Ee={bold:null,italic:null,underline:null,strikeThrough:null}),(e.ctrlKey||e.metaKey)&&e.key==="Enter"){e.preventDefault(),os(o);return}if(e.key==="Backspace"&&!e.ctrlKey&&!e.metaKey){const i=lt(s),c=window.getSelection(),x=!c||c.isCollapsed;if(i===0&&x){const p=Array.from(document.querySelectorAll(".screenplay-block")),d=p.indexOf(t);if(d>0){e.preventDefault();const r=p[d-1],u=r.hasAttribute("contenteditable")?r:r.querySelector('[contenteditable="true"]'),h=s.innerText.trim();if(h===""||a==="parenthetical"&&(h==="()"||h==="")){ht(n,o),u&&(u.focus(),Ge(u));return}const m=r.getAttribute("data-block-type");if(u&&(a==="action"&&m==="action"||a==="dialogue"&&m==="dialogue"||a==="text"&&m==="text")){const g=u.innerText.length,b=u.innerText+(u.innerText?" ":"")+s.innerText;u.innerText=b,Ye(r,b),ht(n,o),u.focus(),it(u,g+(u.innerText?1:0));return}if(u){u.focus(),Ge(u);return}}}}if(e.key==="Delete"&&!e.ctrlKey&&!e.metaKey){const i=lt(s),c=window.getSelection(),x=!c||c.isCollapsed;if(i>=s.innerText.length&&x){const p=Array.from(document.querySelectorAll(".screenplay-block")),d=p.indexOf(t);if(d<p.length-1){const r=p[d+1],u=r.hasAttribute("contenteditable")?r:r.querySelector('[contenteditable="true"]'),h=r.getAttribute("data-scene-id"),m=r.getAttribute("data-block-id"),g=r.getAttribute("data-block-type"),b=(u?u.innerText:"").trim();if(b===""||g==="parenthetical"&&(b==="()"||b==="")){e.preventDefault(),ht(h,m);return}if(u&&(a==="action"&&g==="action"||a==="dialogue"&&g==="dialogue"||a==="text"&&g==="text")){e.preventDefault();const v=s.innerText.length,w=s.innerText+(s.innerText?" ":"")+u.innerText;s.innerText=w,Ye(t,w),ht(h,m),it(s,v+(s.innerText?1:0));return}if(u){e.preventDefault(),u.focus(),it(u,0);return}}}}if(e.key==="ArrowLeft"){const i=lt(s),c=window.getSelection();if(i===0&&(!c||c.isCollapsed)){const x=Array.from(document.querySelectorAll(".screenplay-block")),p=x.indexOf(t);if(p>0){e.preventDefault();const d=x[p-1],r=d.querySelector('[contenteditable="true"]')||d;r&&(r.focus(),Ge(r))}}}if(e.key==="ArrowRight"){const i=lt(s),c=window.getSelection();if(i>=s.innerText.length&&(!c||c.isCollapsed)){const x=Array.from(document.querySelectorAll(".screenplay-block")),p=x.indexOf(t);if(p<x.length-1){e.preventDefault();const d=x[p+1],r=d.querySelector('[contenteditable="true"]')||d;r&&(r.focus(),it(r,0))}}}if(e.key==="("&&(a==="character"||a==="dialogue")){const i=window.getSelection();if(i&&i.anchorOffset===0&&s.innerText.trim()===""){e.preventDefault(),$t(t,"parenthetical");return}}if(e.key==="Tab"){if(e.preventDefault(),a==="action"){$t(t,"character");return}if(a==="character"){$t(t,"dialogue");return}}if(e.key==="Enter"&&!e.shiftKey){if(Et(),a==="scene"){e.preventDefault();const i=at(s.innerText);i.location&&rs(i.location),Ke(n,o,"action");return}if(a==="character"){e.preventDefault(),is(s.innerText),Ke(n,o,"dialogue");return}if(a==="dialogue"){e.preventDefault(),Ke(n,o,"action");return}if(a==="parenthetical"){e.preventDefault();let i=s.innerText.trim();i.endsWith(")")||(i+=")",s.innerText=i,Ye(t,i)),Ke(n,o,"dialogue");return}if(a==="transition"){e.preventDefault(),Ua(n);return}if(a==="shot"||a==="note"||a==="outline"){e.preventDefault(),Ke(n,o,"action");return}if(a==="act"||a==="endact"||a==="sequence"){e.preventDefault(),Ke(n,o,"scene");return}if(a==="lyrics"){e.preventDefault(),Ke(n,o,"lyrics");return}if(a==="action"||a==="text"){e.preventDefault(),Ke(n,o,a);return}}}function Ke(e,t,s,a){const n=S.scenes.find(p=>p.id===e);if(!n)return;const o=n.blocks.findIndex(p=>p.id===t),l=`b-${Date.now().toString().slice(-6)}`,i={id:l,type:s,content:""};o!==-1?n.blocks.splice(o+1,0,i):n.blocks.push(i);const c=document.getElementById(t),x=c?c.closest(".page-blocks-wrapper"):null;if(c&&x){const p=document.createElement("div");p.innerHTML=Ns(i,n.number,n.id);const d=p.firstElementChild;c.insertAdjacentElement("afterend",d),Bs(d),_t();const r=d.hasAttribute("contenteditable")?d:d.querySelector('[contenteditable="true"]');r&&(r.focus(),Ge(r));const u=x.querySelectorAll(".screenplay-block");let h=0;u.forEach(m=>{const g=m.getAttribute("data-block-type"),b=m.innerText||"";h+=Ts({type:g,content:b})}),h>As&&(Ae(),setTimeout(()=>{const m=document.getElementById(l);if(m){const g=m.querySelector('[contenteditable="true"]')||m;g.focus(),Ge(g)}},20))}else Ae(),setTimeout(()=>{const p=document.getElementById(l);if(p){const d=p.hasAttribute("contenteditable")?p:p.querySelector('[contenteditable="true"]');d&&(d.focus(),Ge(d))}},20)}function Ua(e){const t=S.scenes.findIndex(l=>l.id===e),s=S.scenes.length+1,a=`scene-${Date.now().toString().slice(-5)}`,n=`b-${Date.now().toString().slice(-6)}`,o={id:a,number:s,actId:S.acts?.[0]?.id||"act-1",slugline:"",blocks:[{id:n,type:"scene",content:""}]};t!==-1?S.scenes.splice(t+1,0,o):S.scenes.push(o),S.scenes.forEach((l,i)=>{l.number=i+1}),Ae(),Ot(),setTimeout(()=>{const l=document.getElementById(n);if(l){const i=l.querySelector('[contenteditable="true"]');i&&(i.focus(),Ge(i),Rs(l,i))}},30)}function $t(e,t){const s=e.getAttribute("data-block-id"),a=e.getAttribute("data-scene-id"),n=S.scenes.find(l=>l.id===a);if(!n)return;const o=n.blocks.find(l=>l.id===s);if(o){if(o.type=t,t==="character"&&(o.content=o.content.toUpperCase()),(t==="action"||t==="dialogue")&&(o.content=St(o.content)),t==="parenthetical"){let l=o.content.replace(/^\(+|\)+$/g,"").trim();l?o.content=`(${l})`:o.content="()"}Ae(),setTimeout(()=>{const l=document.getElementById(s);if(l){const i=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]');if(i)if(i.focus(),t==="parenthetical"&&i.innerText==="()"){const c=i.firstChild;if(c){const x=document.createRange(),p=window.getSelection();x.setStart(c,1),x.collapse(!0),p.removeAllRanges(),p.addRange(x)}}else Ge(i)}},25)}}function Ge(e){const t=document.createRange(),s=window.getSelection();t.selectNodeContents(e),t.collapse(!1),s.removeAllRanges(),s.addRange(t)}function Va(){document.addEventListener("click",e=>{e.target.closest("#editor-autocomplete-dropdown")||Et()})}function Et(){const e=document.getElementById("editor-autocomplete-dropdown");e&&e.classList.add("hidden")}function Ds(){if(!S)return[];const e=[];return(S.scenes||[]).forEach(t=>{(t.blocks||[]).forEach(s=>{s.type==="character"&&s.content&&e.push(s.content)})}),(S.characters||[]).forEach(t=>{t&&e.push(t)}),Cs(e)}function qa(){if(!S)return[];const e=new Set;(S.scenes||[]).forEach(s=>{(s.blocks||[]).forEach(a=>{if(a.type==="scene"){const n=at(a.content);n.location&&n.location.length>=2&&e.add(n.location)}})}),(S.locations||[]).forEach(s=>{const a=(s||"").trim().toUpperCase();a&&a.length>=2&&e.add(a)});const t=Array.from(e);return t.filter(s=>t.some(n=>n!==s&&n.startsWith(s))?S.scenes?.some(o=>o.blocks?.some(l=>l.type==="scene"&&at(l.content).location===s)):!0)}function Rs(e,t){const s=e.getAttribute("data-block-type"),a=t.innerText,n=document.getElementById("editor-autocomplete-dropdown");if(!n)return;let o=[];if(s==="scene"){const i=a.toUpperCase(),c=a.match(/\s+-\s*([A-Za-z]*)$/);if(c){const x=(c[1]||"").toUpperCase(),d=["DAY","NIGHT","MORNING","EVENING","DAWN","DUSK","CONTINUOUS","LATER"].filter(u=>u.startsWith(x)),r=a.replace(/\s+-\s*[A-Za-z]*$/," - ");o=d.map(u=>({label:u,val:r+u}))}else if(i==="I"||i==="IN")o=["INT.","INT./EXT.","I/E."].map(x=>({label:x,val:x+" "}));else if(i==="E"||i==="EX")o=["EXT.","INT./EXT.","I/E."].map(x=>({label:x,val:x+" "}));else if(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i.test(a)){const x=a.match(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i),p=x[1].toUpperCase()+" ",d=(x[2]||"").trim().toUpperCase();d.length>0&&(o=qa().filter(h=>h.startsWith(d)).map(h=>({label:h,val:`${p}${h}`})))}}else if(s==="character"){const i=a.trim().toUpperCase();i.length>0&&(o=Ds().filter(p=>p.startsWith(i)).map(p=>({label:p,val:p})))}else if(s==="transition"){const i=a.trim().toUpperCase(),c=S.transitions||["CUT TO:","FADE IN:","FADE OUT.","DISSOLVE TO:","SMASH CUT TO:","MATCH CUT TO:","JUMP CUT TO:"];i.length>0&&(o=c.filter(p=>p.startsWith(i)).map(p=>({label:p,val:p})))}if(o.length===0){Et();return}n.innerHTML=o.map((i,c)=>{const x=typeof i=="object"?i.label:i,p=typeof i=="object"?i.val:i;return`
      <div class="autocomplete-item px-3 py-1.5 hover:bg-blue-50 text-slate-800 hover:text-blue-700 cursor-pointer flex items-center justify-between font-mono ${c===0?"active bg-blue-50/60 text-blue-700":""}" data-val="${p}">
        <span>${x}</span>
        <span class="text-[10px] text-slate-400 font-sans">Enter ↵</span>
      </div>
    `}).join("");const l=t.getBoundingClientRect();n.style.top=`${Math.min(window.innerHeight-200,l.bottom+4)}px`,n.style.left=`${Math.min(window.innerWidth-240,Math.max(16,l.left))}px`,n.classList.remove("hidden"),n.querySelectorAll(".autocomplete-item").forEach(i=>{i.onclick=()=>{const c=i.getAttribute("data-val");if(t.innerText=c,Ye(e,c),s==="character")is(c);else if(s==="scene"){const x=at(c);x.location&&rs(x.location)}Et(),Ge(t),be=!0,ie&&ke()}})}function fs(e){const t=document.getElementById("editor-autocomplete-dropdown");if(!t)return;const s=t.querySelectorAll(".autocomplete-item");if(s.length===0)return;let a=Array.from(s).findIndex(n=>n.classList.contains("active"));a!==-1&&s[a].classList.remove("active","bg-blue-50/60","text-blue-700"),a=(a+e+s.length)%s.length,s[a].classList.add("active","bg-blue-50/60","text-blue-700"),s[a].scrollIntoView({block:"nearest"})}async function rt(e=!1){if(!(At||!S)){At=!0,ct("Saving..."),S.scenes&&S.scenes.forEach(t=>{t.blocks&&t.blocks.forEach(s=>{(s.type==="action"||s.type==="dialogue")&&s.content&&(s.content=St(s.content))})});try{await Xs(S.id,S),be=!1,At=!1,ct("Saved"),e&&y("Saved")}catch{At=!1,ct("Save failed"),y("Couldn't save changes · Tap retry")}}}function ke(){ie&&(clearTimeout(Yt),Yt=setTimeout(async()=>{be&&ie&&(await rt(!1),ct("Autosaved just now"),y("Autosaved just now"))},1500))}function ct(e){const t=document.getElementById("editor-save-status"),s=document.getElementById("editor-save-icon");t&&(t.textContent=e),e==="Saving..."?s&&(s.textContent="progress_activity",s.classList.add("animate-spin")):e==="Saved"||e==="Autosaved just now"||e==="Unsaved"?s&&(s.textContent="save",s.classList.remove("animate-spin")):e==="Save failed"&&s&&(s.textContent="warning",s.classList.remove("animate-spin"))}function Ot(){if(!S)return;const e=document.getElementById("navSceneSelect");if(e){const t=S.scenes||[];e.innerHTML=t.map((s,a)=>`
      <option value="${s.id}" ${a===0?"selected":""}>Scene ${s.number} ▾</option>
    `).join("")||'<option value="">Scene 1 ▾</option>'}}function Ga(){const e=document.getElementById("navSceneSelect");e&&(e.onchange=s=>{const a=s.target.value;if(!a)return;bs(a);const n=S?.scenes?.find(o=>o.id===a);n&&f.setState({currentSceneId:n.number})});let t=null;try{const s=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search,a=new URLSearchParams(s||"");a.get("scene")&&(t=a.get("scene"))}catch{}if(!t&&f.state.currentSceneId&&(t=f.state.currentSceneId),t&&S?.scenes){const s=S.scenes.find(a=>String(a.number)===String(t)||a.id===String(t)||a.id===`scene-${t}`);s&&(e&&(e.value=s.id),setTimeout(()=>bs(s.id),250))}}function bs(e){const t=document.querySelector(`[data-scene-id="${e}"][data-block-type="scene"]`)||document.querySelector(`[data-scene-id="${e}"]`);t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.classList.add("bg-blue-50/50"),setTimeout(()=>t.classList.remove("bg-blue-50/50"),1500))}function Ka(){const e=document.getElementById("element-bar");e&&e.querySelectorAll(".element-btn").forEach(t=>{t.onclick=s=>{s.preventDefault();const a=t.getAttribute("data-type");Wa(a)}})}const Ee={bold:null,italic:null,underline:null,strikeThrough:null};let gs=!1;function Ve(e){const t=window.getSelection();if(!t||t.rangeCount===0)return!1;const s=t.anchorNode,a=s?.nodeType===Node.ELEMENT_NODE?s:s?.parentElement;if(!a)return!1;const n=a.closest(".screenplay-block");if(!n)return!1;if(!t.isCollapsed&&t.toString().trim().length>0)try{return document.queryCommandState(e)}catch{return!1}const o=n.getAttribute("data-block-type"),l=o==="scene"||o==="character"||o==="transition";try{if(e==="bold"){if(l){const i=a.closest("b, strong");return!!i&&i!==n}return document.queryCommandState("bold")}if(e==="strikeThrough")return a.closest("s, strike, del")?!0:document.queryCommandState("strikeThrough");if(e==="italic")return document.queryCommandState("italic");if(e==="underline")return document.queryCommandState("underline")}catch{return!1}return!1}function Je(e){let t=document.activeElement,s=t?t.closest(".screenplay-block"):null,a=s?s.hasAttribute("contenteditable")?s:s.querySelector('[contenteditable="true"]'):null;if(!a&&fe){const l=document.getElementById(fe);l&&(s=l,a=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]'))}if(!a){const l=document.querySelector(".screenplay-block");l&&(s=l,a=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]'))}a&&document.activeElement!==a&&a.focus();const n=window.getSelection();if(n&&!n.isCollapsed&&n.rangeCount>0&&n.toString().trim().length>0){try{document.execCommand(e,!1,null)}catch{}s&&a&&Ye(s,a.innerHTML),be=!0,ie&&ke(),Ee[e]=null,st()}else{const i=!(Ee[e]!==null?Ee[e]:Ve(e));Ee[e]=i;try{document.execCommand(e,!1,null)}catch{}st()}}function Wa(e){if(e==="bold"){Je("bold");return}if(e==="italic"){Je("italic");return}if(e==="underline"){Je("underline");return}if(e==="strike"){Je("strikeThrough");return}if(e==="undo"){document.execCommand("undo",!1,null),st();return}if(e==="redo"){document.execCommand("redo",!1,null),st();return}if(e==="image"){if(!fe){const t=Array.from(document.querySelectorAll(".screenplay-block")),s=window.innerHeight/2;for(const a of t){const n=a.getBoundingClientRect();if(n.top<=s&&n.bottom>=s){fe=a.getAttribute("data-block-id");break}}}ns=fe,Ls(!0);return}if(!fe){const t=document.querySelector(".screenplay-block");t&&(fe=t.getAttribute("data-block-id"))}if(fe){const t=document.getElementById(fe);t&&($t(t,e),Ms(e))}}function Ms(e){const t=document.getElementById("element-bar");t&&t.querySelectorAll(".element-btn").forEach(s=>{s.getAttribute("data-type")===e?s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-white bg-blue-600 shadow-2xs font-semibold shrink-0":s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0"})}function za(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),a=document.getElementById("btn-format-strike");[{btn:e,cmd:"bold"},{btn:t,cmd:"italic"},{btn:s,cmd:"underline"},{btn:a,cmd:"strikeThrough"}].forEach(({btn:l,cmd:i})=>{l&&(l.onmousedown=c=>{c.preventDefault(),c.stopPropagation()},l.onclick=c=>{c.preventDefault(),c.stopPropagation(),Je(i)})}),gs||(gs=!0,document.addEventListener("selectionchange",()=>{st()}));const o=document.getElementById("editor-main-scroll");o&&(o.addEventListener("keyup",st),o.addEventListener("mouseup",st))}function st(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),a=document.getElementById("btn-format-strike");if(!e||!t||!s||!a)return;const n="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center border border-blue-600 shadow-2xs font-semibold active:scale-95 transition-all cursor-pointer",o="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center border border-slate-200/90 active:scale-95 transition-all cursor-pointer";try{const l=window.getSelection();let i=!1,c=!1,x=!1,p=!1;l&&!l.isCollapsed&&l.rangeCount>0&&l.toString().trim().length>0?(i=Ve("bold"),c=Ve("italic"),x=Ve("underline"),p=Ve("strikeThrough")):(i=Ee.bold!==null?Ee.bold:Ve("bold"),c=Ee.italic!==null?Ee.italic:Ve("italic"),x=Ee.underline!==null?Ee.underline:Ve("underline"),p=Ee.strikeThrough!==null?Ee.strikeThrough:Ve("strikeThrough")),e.className=i?n:o,t.className=c?n:o,s.className=x?n:o,a.className=p?n:o}catch{}}function Ja(e,t){const s=document.getElementById("editor-more-menu-btn"),a=document.getElementById("editorMoreMenuModal"),n=document.getElementById("closeMoreMenuBtn");function o(R){a&&(a.classList.remove("hidden"),a.classList.add("flex"),qe({id:"moreMenu",name:"Screenplay Tools",close:()=>{a.classList.add("hidden"),a.classList.remove("flex")},restore:()=>{a.classList.remove("hidden"),a.classList.add("flex")}}))}s&&(s.onclick=()=>o()),n&&(n.onclick=()=>H("moreMenu")),a&&(a.onclick=R=>{R.target===a&&H("moreMenu")});const l=document.getElementById("menu-btn-scene-navigator");l&&(l.onclick=()=>{H("moreMenu");const R=document.getElementById("navSceneSelect");R&&R.focus()});const i=document.getElementById("menu-btn-char-navigator");i&&(i.onclick=()=>{H("moreMenu");const R=Ds(),le=prompt(`Select character to navigate to:
${R.join(", ")}`,R[0]||"HILL");if(le){for(const ye of S.scenes)for(const z of ye.blocks)if(z.type==="character"&&z.content.toUpperCase().includes(le.trim().toUpperCase())){const Se=document.getElementById(z.id);if(Se){Se.scrollIntoView({behavior:"smooth",block:"center"}),Se.classList.add("bg-blue-100/60"),setTimeout(()=>Se.classList.remove("bg-blue-100/60"),1500);return}}}});const c=document.getElementById("sceneNumberToggle"),x=document.getElementById("sceneNumberToggleText"),p=document.getElementById("menuSceneNumState"),d=document.getElementById("menu-btn-scene-numbers");function r(){We=!We,x&&(x.textContent=`Scene #s: ${We?"On":"Off"}`),p&&(p.textContent=We?"Enabled":"Disabled"),document.querySelectorAll(".scene-num-indicator").forEach(R=>{R.classList.toggle("hidden",!We)}),y(`Scene numbers ${We?"enabled (left side)":"hidden"}`)}c&&(c.onclick=r),d&&(d.onclick=()=>{r(),H("moreMenu")});const u=document.getElementById("focusModeToggle"),h=document.getElementById("focusModeText"),m=document.getElementById("menu-btn-focus-mode"),g=document.getElementById("menuFocusState");function b(R=null){Ue=R!==null?R:!Ue,h&&(h.textContent=Ue?"Exit Focus":"Focus"),g&&(g.textContent=Ue?"Active":"Off");const le=document.getElementById("editor-collapsible-toolbars"),ye=document.getElementById("editor-document-tabs"),z=document.getElementById("editor-fixed-header");if(Ue?(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!0),z&&(z.style.top="0px")):(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!1),z&&(z.style.top="3.5rem")),le&&(le.style.display=Ue?"none":""),ye&&(ye.style.display=Ue?"none":"flex"),vt(),Ue)qe({id:"focusMode",name:"Focus Mode",close:()=>b(!1)}),y("Focus Mode active (distraction-free)");else{const Se=oe.findIndex(Be=>Be.id==="focusMode");Se!==-1&&oe.splice(Se,1),y("Exited Focus Mode")}}u&&(u.onclick=()=>b()),m&&(m.onclick=()=>{H("moreMenu"),b()});const v=document.getElementById("langToggleBtn"),w=document.getElementById("langToggleText"),$=document.getElementById("tamilLangBadge");function T(R){Vt=R,w&&(w.textContent=R==="TA"?"தமிழ் / EN":R==="TL"?"Tanglish":"EN / தமிழ்"),$&&($.textContent=R==="TA"?"தமிழ் விசைப்பலகை: இயங்குகிறது":R==="TL"?"Tanglish: Active":"Tamil IME: Ready"),y(`Screenplay language set to ${R==="TA"?"Tamil":R==="TL"?"Tanglish":"English"}`)}v&&(v.onclick=()=>{T(Vt==="EN"?"TA":Vt==="TA"?"TL":"EN")}),document.querySelectorAll(".lang-choice-btn").forEach(R=>{R.onclick=()=>{T(R.getAttribute("data-lang")),H("moreMenu")}});const I=document.getElementById("btn-open-production"),k=document.getElementById("menu-btn-production"),_=()=>{const R=e||f.state.selectedScriptId||"chronicles-of-dust";sessionStorage.setItem("scriptora_prod_return",`/editor/${R}`),t(`/production?from=editor&scriptId=${encodeURIComponent(R)}`)};I&&(I.onclick=_),k&&(k.onclick=()=>{H("moreMenu"),_()});const X=document.getElementById("menu-btn-go-page");X&&(X.onclick=()=>{H("moreMenu");const R=document.querySelectorAll(".screenplay-page-sheet").length||1,le=prompt(`Enter page number to jump to (1-${R}):`,"1");if(le){const ye=document.querySelector(`[data-page-num="${le}"]`);ye&&ye.scrollIntoView({behavior:"smooth",block:"start"})}});const W=document.getElementById("menu-btn-page-break");W&&(W.onclick=()=>{H("moreMenu"),os()});const re=document.getElementById("menu-btn-insert-page");re&&(re.onclick=()=>{H("moreMenu"),Ps()});const Z=document.getElementById("menu-btn-page-before");Z&&(Z.onclick=()=>{H("moreMenu"),$s()});const C=document.getElementById("menu-btn-page-at-end");C&&(C.onclick=()=>{H("moreMenu"),ls()});const N=document.getElementById("btn-undo"),Q=document.getElementById("btn-redo");N&&(N.onclick=()=>document.execCommand("undo")),Q&&(Q.onclick=()=>document.execCommand("redo"))}function Ya(){const e=document.getElementById("btn-quick-find"),t=document.getElementById("menu-btn-find-replace"),s=document.getElementById("closeFindBtn"),a=document.getElementById("findInput"),n=document.getElementById("replaceInput"),o=document.getElementById("findNextBtn"),l=document.getElementById("findPrevBtn"),i=document.getElementById("replaceBtn"),c=document.getElementById("replaceAllBtn"),x=document.getElementById("findReplaceModal");e&&(e.onclick=()=>Dt(!0)),t&&(t.onclick=()=>{H("moreMenu"),Dt(!0)}),s&&(s.onclick=()=>H("findModal")),x&&(x.onclick=p=>{p.target===x&&H("findModal")}),a&&(a.oninput=()=>Kt(a.value)),o&&(o.onclick=()=>Zt(1)),l&&(l.onclick=()=>Zt(-1)),i&&(i.onclick=()=>{const p=a.value,d=n.value;if(!p||ze===-1||!Ne[ze])return;const r=Ne[ze];r.block.content=r.block.content.replace(p,d),Ae(),Kt(p),be=!0,ie&&ke(),y("Replaced 1 occurrence")}),c&&(c.onclick=()=>{const p=a.value,d=n.value;if(!p)return;let r=0;S.scenes.forEach(u=>{u.blocks.forEach(h=>{h.content&&h.content.includes(p)&&(h.content=h.content.split(p).join(d),r++)})}),Ae(),Kt(p),be=!0,ie&&ke(),y(`Replaced ${r} occurrences`)})}function Dt(e){const t=document.getElementById("findReplaceModal");if(t)if(e)qt=document.getElementById("editor-main-scroll")?.scrollTop||0,Gt=fe,t.classList.remove("hidden"),t.classList.add("flex"),qe({id:"findModal",name:"Find & Replace",close:()=>Dt(!1)}),setTimeout(()=>{document.getElementById("findInput")?.focus()},40);else{t.classList.add("hidden"),t.classList.remove("flex"),cs();const s=document.getElementById("editor-main-scroll");if(s&&qt!==null&&(s.scrollTop=qt),Gt){const n=document.getElementById(Gt),o=n?.querySelector('[contenteditable="true"]')||n;o&&o.focus()}const a=oe.findIndex(n=>n.id==="findModal");a!==-1&&oe.splice(a,1)}}function Kt(e){Ne=[],ze=-1;const t=document.getElementById("findMatchesCount");if(!e||!S){t&&(t.textContent="0 of 0"),cs();return}S.scenes.forEach(s=>{s.blocks.forEach(a=>{a.content&&a.content.toLowerCase().includes(e.toLowerCase())&&Ne.push({block:a,sceneId:s.id})})}),t&&(t.textContent=Ne.length>0?`1 of ${Ne.length}`:"0 of 0"),Ne.length>0&&Zt(0)}function Zt(e){if(Ne.length===0)return;ze=(ze+e+Ne.length)%Ne.length;const t=Ne[ze],s=document.getElementById("findMatchesCount");s&&(s.textContent=`${ze+1} of ${Ne.length}`);const a=document.getElementById(t.block.id);a&&(a.scrollIntoView({behavior:"smooth",block:"center"}),cs(),a.classList.add("bg-yellow-100"))}function cs(){document.querySelectorAll(".screenplay-block").forEach(e=>{e.classList.remove("bg-yellow-100")})}function Ls(e){const t=document.getElementById("imageModal");if(t)if(e)fe&&(ns=fe),t.classList.remove("hidden"),t.classList.add("flex"),qe({id:"imageModal",name:"Insert Image",close:()=>Ls(!1)});else{t.classList.add("hidden"),t.classList.remove("flex");const s=oe.findIndex(a=>a.id==="imageModal");s!==-1&&oe.splice(s,1)}}function Xa(e){const t=document.getElementById("imageModal"),s=document.getElementById("closeImageModal"),a=document.getElementById("cancelImageBtn"),n=document.getElementById("insertImageBtn"),o=document.getElementById("imgFileInput"),l=document.getElementById("imgUploadLabel"),i=document.getElementById("imgUrlInput"),c=document.getElementById("imgCaptionInput"),x=document.getElementById("imgPreviewContainer"),p=document.getElementById("imgPreviewThumb"),d=document.getElementById("clearImgPreviewBtn");let r="";function u(A){x&&p&&(A?(p.src=A,x.classList.remove("hidden")):(x.classList.add("hidden"),p.src=""))}function h(A,P){const O=new Image;O.onload=()=>{let V=O.width,ce=O.height;(V>900||ce>600)&&(V/ce>900/600?(ce=Math.round(ce*900/V),V=900):(V=Math.round(V*600/ce),ce=600));const te=document.createElement("canvas");te.width=V,te.height=ce,te.getContext("2d").drawImage(O,0,0,V,ce),P(te.toDataURL("image/jpeg",.85))},O.onerror=()=>P(A),O.src=A}s&&(s.onclick=()=>H("imageModal")),a&&(a.onclick=()=>H("imageModal")),t&&(t.onclick=A=>{A.target===t&&H("imageModal")}),document.querySelectorAll(".img-preset-btn").forEach(A=>{A.onclick=()=>{const P=A.getAttribute("data-url"),O=A.getAttribute("data-caption");i&&(i.value=P),c&&!c.value&&(c.value=O),r=P,u(P)}}),i&&(i.oninput=()=>{const A=i.value.trim();A?(r="",u(A)):r||u("")}),d&&(d.onclick=()=>{r="",i&&(i.value=""),o&&(o.value=""),l&&(l.textContent="Choose local image..."),u("")}),o&&(o.onchange=A=>{const P=A.target.files?.[0];if(P){l&&(l.textContent=P.name);const O=new FileReader;O.onload=ee=>{h(ee.target.result,q=>{r=q,u(q)})},O.readAsDataURL(P)}}),n&&(n.onclick=()=>{const A=i?.value.trim(),P=c?.value.trim();let O=r||A;O||(O="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80");const ee={id:`b-${Date.now().toString().slice(-6)}`,type:"image",url:O,content:O,caption:P||""},q=ns||fe;let V=null,ce=-1;if(S.scenes&&S.scenes.length>0){if(q)for(const te of S.scenes){const se=(te.blocks||[]).findIndex(ae=>ae.id===q);if(se!==-1){V=te,ce=se+1;break}}if(!V){const se=document.getElementById("navSceneSelect")?.value||(f.state.currentSceneId?`scene-${f.state.currentSceneId}`:null);se&&(V=S.scenes.find(ae=>ae.id===se||String(ae.number)===String(f.state.currentSceneId)))}if(!V){const te=Array.from(document.querySelectorAll(".screenplay-block")),se=window.innerHeight/2;for(const ae of te){const G=ae.getBoundingClientRect();if(G.top<=se&&G.bottom>=se){const Y=ae.getAttribute("data-scene-id");V=S.scenes.find(K=>K.id===Y);const ge=ae.getAttribute("data-block-id");if(V&&ge){const K=(V.blocks||[]).findIndex(Ie=>Ie.id===ge);K!==-1&&(ce=K+1)}break}}}V||(V=S.scenes[0]),V.blocks||(V.blocks=[]),ce!==-1&&ce<=V.blocks.length?V.blocks.splice(ce,0,ee):V.blocks.push(ee)}else S.scenes=[{id:"scene-1",number:1,slugline:"INT. SCENE - DAY",blocks:[ee]}];r="",o&&(o.value=""),i&&(i.value=""),c&&(c.value=""),l&&(l.textContent="Upload local image file..."),u(""),Ae(),be=!0,ie&&ke(),y("Storyboard image inserted"),H("imageModal"),setTimeout(()=>{const te=document.getElementById(ee.id);te&&(te.scrollIntoView({behavior:"smooth",block:"center"}),te.classList.add("ring-2","ring-blue-500"),setTimeout(()=>te.classList.remove("ring-2","ring-blue-500"),1500))},80)});const m=document.getElementById("preferencesModal"),g=document.getElementById("menu-btn-preferences"),b=document.getElementById("closePrefModal"),v=document.getElementById("savePrefBtn");function w(A){if(m)if(A)m.classList.remove("hidden"),m.classList.add("flex"),qe({id:"preferencesModal",name:"Preferences",close:()=>w(!1)});else{m.classList.add("hidden"),m.classList.remove("flex");const P=oe.findIndex(O=>O.id==="preferencesModal");P!==-1&&oe.splice(P,1)}}g&&(g.onclick=()=>{H("moreMenu"),w(!0)}),b&&(b.onclick=()=>H("preferencesModal")),m&&(m.onclick=A=>{A.target===m&&H("preferencesModal")}),v&&(v.onclick=()=>{const A=document.getElementById("prefSceneNumbers")?.checked,P=document.getElementById("prefLineSpacing")?.value,O=document.getElementById("prefFontSize")?.value;We=A,document.querySelectorAll(".scene-num-indicator").forEach(q=>q.classList.toggle("hidden",!A));const ee=document.querySelector(".screenplay-page-sheet");ee&&(ee.style.lineHeight=P==="2.0"?"30px":P==="1.0"?"20px":"24px",ee.style.fontSize=O==="14pt"?"16px":"15px"),H("preferencesModal"),y("Preferences applied")});function $(A){return A?A.replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/[\r\n]+/g," ").replace(/[^\x20-\x7E]/g,P=>({"—":"--","–":"-","“":'"',"”":'"',"‘":"'","’":"'","…":"...","·":"-","•":"*"})[P]||" "):""}function T(A,P){if(!A)return[];const O=A.split(/\s+/),ee=[];let q="";for(const V of O)q?(q+" "+V).length<=P?q+=" "+V:(ee.push(q),q=V):q=V;return q&&ee.push(q),ee}function I(A,P,O={}){const{includeTitlePage:ee=!0,includePageNumbers:q=!0,sceneNumbers:V=!0,preservePageBreaks:ce=!0,pageSheets:te=[]}=O,se=[],G=595.28/2,Y=108,ge=525,K=14.4,Ie=14.4,xe=(j,Pe=12)=>(j?j.length:0)*(Pe*.6),Qe=(j,Pe=12)=>Math.round(G-xe(j,Pe)/2),Ht=(j,Pe=12,he=ge)=>Math.round(he-xe(j,Pe));if(ee&&A.titlePage&&(P.has(1)||O.rangeType==="all")){const j=A.titlePage,Pe=(j.title||A.title||"UNTITLED SCREENPLAY").toUpperCase(),he=T(Pe,35),U=[];let Oe=520;he.forEach(Ce=>{U.push({text:Ce,x:Qe(Ce,12),y:Oe,font:"F2",size:12}),Oe-=K}),Oe-=24;const ne=j.by!==void 0?j.by:"Written by";ne&&(U.push({text:ne,x:Qe(ne,12),y:Oe,font:"F1",size:12}),Oe-=K+4);const $e=j.author||"Author";U.push({text:$e,x:Qe($e,12),y:Oe,font:"F2",size:12});let F=(j.phone||"").trim();if(!F&&j.contact){const ot=j.contact.split("·").map(Ct=>Ct.trim()).find(Ct=>Ct.includes("+")||/\d{3}/.test(Ct));ot&&(F=ot)}F&&!F.toLowerCase().startsWith("phone")&&(F=`Phone: ${F}`);let me=(j.email||"").trim();if(!me&&j.contact&&j.contact.includes("@")){const Ce=j.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);Ce&&(me=Ce[0])}me&&!me.toLowerCase().startsWith("e-mail")&&!me.toLowerCase().startsWith("email")&&(me=`E-mail: ${me}`);const _e=[];if(F&&_e.push(F),me&&_e.push(me),j.address){const Ce=T(j.address.trim(),40);_e.push(...Ce)}else if(!F&&!me&&j.contact){const Ce=j.contact.split("·").map(ot=>ot.trim()).filter(Boolean);_e.push(...Ce)}let gt=130;_e.forEach(Ce=>{U.push({text:Ce,x:Y,y:gt,font:"F1",size:12}),gt-=K}),se.push(U)}te.forEach(j=>{const Pe=parseInt(j.getAttribute("data-page-num"),10)||1;if(!P.has(Pe))return;const he=[];if(q&&Pe>1){const ne=`${Pe}.`;he.push({text:ne,x:Ht(ne,12,ge),y:805,font:"F1",size:12})}let U=765;j.querySelectorAll(".screenplay-block").forEach(ne=>{if(U<65)return;const $e=ne.getAttribute("data-block-type");if($e==="pagebreak"){if(ce){U-=K;const F="----------------------------------------";he.push({text:F,x:Qe(F,12),y:U,font:"F1",size:12}),U-=K}return}if($e==="scene"){const F=ne.querySelector('[contenteditable="true"]'),me=(F?F.innerText.trim():ne.innerText.trim()).toUpperCase(),_e=V&&ne.querySelector(".scene-num-indicator")?.innerText?.trim()||"";U-=Ie,T(me,57).forEach((Ce,ot)=>{ot===0&&_e&&he.push({text:_e,x:76,y:U,font:"F2",size:12}),he.push({text:Ce,x:Y,y:U,font:"F2",size:12}),U-=K})}else if($e==="character"){const F=ne.innerText.trim().toUpperCase();U-=Ie,he.push({text:F,x:266,y:U,font:"F2",size:12}),U-=K}else if($e==="parenthetical"){let F=ne.innerText.trim();F.startsWith("(")||(F="("+F),F.endsWith(")")||(F=F+")"),T(F,26).forEach(me=>{he.push({text:me,x:223,y:U,font:"F1",size:12}),U-=K})}else if($e==="dialogue"){const F=ne.innerText.trim();T(F,35).forEach(me=>{he.push({text:me,x:180,y:U,font:"F1",size:12}),U-=K})}else if($e==="transition"){const F=ne.innerText.trim().toUpperCase();U-=Ie,he.push({text:F,x:Ht(F,12,ge),y:U,font:"F2",size:12}),U-=K}else if($e==="shot"){const F=ne.innerText.trim().toUpperCase();U-=Ie,he.push({text:F,x:Y,y:U,font:"F2",size:12}),U-=K}else if($e==="image"){const F=ne.querySelector('[contenteditable="true"]')?.innerText?.trim()||"Storyboard Image";U-=Ie,he.push({text:`[STORYBOARD: ${F}]`,x:Y,y:U,font:"F1",size:12}),U-=K}else{const F=ne.innerText.trim();F&&(U-=Ie,T(F,58).forEach(me=>{he.push({text:me,x:Y,y:U,font:"F1",size:12}),U-=K}))}}),se.push(he)}),se.length===0&&se.push([{text:A.title||"Screenplay",x:Y,y:750,font:"F2",size:12}]);const Te=se.length,Le=[],we=[];let De=4;for(let j=0;j<Te;j++)De++,Le.push(De),De++,we.push(De);const je=[];je[1]="<< /Type /Catalog /Pages 2 0 R >>",je[2]=`<< /Type /Pages /Kids [${Le.map(j=>j+" 0 R").join(" ")}] /Count ${Te} /MediaBox [0 0 595.28 841.89] >>`,je[3]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>",je[4]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>";for(let j=0;j<Te;j++){const Pe=Le[j],he=we[j];je[Pe]=`<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${he} 0 R >>`;const U=[];for(const ne of se[j]){const $e=ne.font||"F1",F=ne.size||12,me=ne.x||Y,_e=ne.y||750,gt=$(ne.text);U.push(`BT /${$e} ${F} Tf ${me.toFixed(2)} ${_e.toFixed(2)} Td (${gt}) Tj ET`)}const Oe=U.join(`
`);je[he]=`<< /Length ${Oe.length} >>
stream
${Oe}
endstream`}let et=`%PDF-1.4
%âãÏÓ
`;const ds=[];for(let j=1;j<=De;j++)ds[j]=et.length,et+=`${j} 0 obj
${je[j]}
endobj
`;const Fs=et.length;et+=`xref
0 ${De+1}
0000000000 65535 f 
`;for(let j=1;j<=De;j++)et+=`${String(ds[j]).padStart(10,"0")} 00000 n 
`;return et+=`trailer
<< /Size ${De+1} /Root 1 0 R >>
startxref
${Fs}
%%EOF`,new Blob([et],{type:"application/pdf"})}const k=document.getElementById("exportModal"),_=document.getElementById("exportModalBtn"),X=document.getElementById("menu-btn-export"),W=document.getElementById("closeExportModal"),re=document.getElementById("cancelExportBtn"),Z=document.getElementById("startExportBtn"),C=document.getElementById("exportProgressArea"),N=document.getElementById("exportProgressBar"),Q=document.getElementById("exportStatusText");function R(A){if(k)if(A)k.classList.remove("hidden"),k.classList.add("flex"),qe({id:"exportModal",name:"Export",close:()=>R(!1)});else{k.classList.add("hidden"),k.classList.remove("flex"),C?.classList.add("hidden");const P=oe.findIndex(O=>O.id==="exportModal");P!==-1&&oe.splice(P,1)}}_&&(_.onclick=()=>R(!0)),X&&(X.onclick=()=>{H("moreMenu"),R(!0)}),W&&(W.onclick=()=>H("exportModal")),re&&(re.onclick=()=>H("exportModal")),k&&(k.onclick=A=>{A.target===k&&H("exportModal")});const le=document.getElementById("exportPageRangeSelect"),ye=document.getElementById("exportCustomRangeInput");le&&ye&&(le.onchange=()=>{ye.classList.toggle("hidden",le.value!=="custom"),le.value==="custom"&&ye.focus()}),Z&&(Z.onclick=()=>{const A=document.getElementById("exportFormatSelect")?.value||"pdf",P=document.getElementById("exportPageRangeSelect")?.value||"all",O=document.getElementById("exportCustomRangeInput")?.value||"",ee=document.getElementById("optPageNumbers")?.checked!==!1,q=document.getElementById("optPreservePageBreaks")?.checked!==!1,V=document.getElementById("optStandardMargins")?.checked!==!1,ce=document.getElementById("optSceneNumbers")?.checked!==!1,te=Array.from(document.querySelectorAll(".screenplay-page-sheet")),se=te.length||1;let ae=new Set;if(P==="all")for(let G=1;G<=se;G++)ae.add(G);else if(P==="current"){let G=1;if(fe){const Y=document.getElementById(fe),ge=Y?Y.closest(".screenplay-page-sheet"):null;ge&&(G=parseInt(ge.getAttribute("data-page-num"),10)||1)}ae.add(G)}else if(P==="custom"&&(O.split(",").forEach(Y=>{if(Y=Y.trim(),Y.includes("-")){const[ge,K]=Y.split("-").map(Ie=>parseInt(Ie.trim(),10));if(!isNaN(ge)&&!isNaN(K))for(let Ie=Math.max(1,ge);Ie<=Math.min(se,K);Ie++)ae.add(Ie)}else{const ge=parseInt(Y,10);!isNaN(ge)&&ge>=1&&ge<=se&&ae.add(ge)}}),ae.size===0))for(let Y=1;Y<=se;Y++)ae.add(Y);C.classList.remove("hidden"),N.style.width="35%",Q.textContent=V?'Applying standard A4 margins (1.5" left, 1.0" right) & Courier Prime...':"Formatting Courier Prime typography and page layout...",setTimeout(()=>{N.style.width="80%",Q.textContent=`Compiling standard ${A.toUpperCase()} for pages [${Array.from(ae).join(", ")}]...`},500),setTimeout(()=>{N.style.width="100%",Q.textContent="Completed! Starting download...";let G="";if(document.getElementById("optTitlePage")?.checked&&S.titlePage&&(ae.has(1)||P==="all")){const xe=S.titlePage;G+=`${xe.title||S.title}

`,G+=`${xe.by||"Written by"}

`,G+=`${xe.author||"Author"}

`,xe.phone&&(G+=`${xe.phone}
`),xe.email&&(G+=`${xe.email}
`),xe.address&&(G+=`${xe.address}
`),!xe.phone&&!xe.email&&!xe.address&&xe.contact&&(G+=`${xe.contact}
`),G+=`

================================================================================
\f
`}te.forEach(xe=>{const Qe=parseInt(xe.getAttribute("data-page-num"),10)||1;if(!ae.has(Qe))return;ee&&(G+=`
											${Qe}.

`),xe.querySelectorAll(".screenplay-block").forEach(Te=>{const Le=Te.getAttribute("data-block-type");if(Le==="pagebreak"){q&&(G+=`
[=== PAGE BREAK ===]

`);return}let we="";if(Le==="scene"){const De=Te.querySelector('[contenteditable="true"]');we=De?De.innerText.trim():Te.innerText.trim();const je=ce&&Te.querySelector(".scene-num-indicator")?.innerText?.trim()||"";G+=`

${je?je+". ":""}${we}

`}else Le==="character"?(we=Te.innerText.trim(),G+=`
			${we}
`):Le==="parenthetical"?(we=Te.innerText.trim(),G+=`		${we.startsWith("(")?we:"("+we+")"}
`):Le==="dialogue"?(we=Te.innerText.trim(),G+=`	${we}
`):Le==="transition"?(we=Te.innerText.trim(),G+=`
						${we}

`):(we=Te.innerText.trim(),we&&(G+=`${we}

`))}),G+=`
\f
`});let Y;A==="pdf"?Y=I(S,ae,{includeTitlePage:document.getElementById("optTitlePage")?.checked!==!1,includePageNumbers:ee,sceneNumbers:ce,preservePageBreaks:q,pageSheets:te,rangeType:P}):Y=new Blob([G],{type:"text/plain"});const ge=URL.createObjectURL(Y),K=document.createElement("a");K.href=ge;const Ie=P==="all"?"All_Pages":`Pages_${Array.from(ae).join("-")}`;K.download=`${S.title.replace(/[^a-zA-Z0-9]/g,"_")}_${S.draft||"Draft"}_${Ie}.${A}`,document.body.appendChild(K),K.click(),K.remove(),y(`Exported "${K.download}" successfully`),setTimeout(()=>H("exportModal"),800)},1e3)});const z=document.getElementById("versionsModal"),Se=document.getElementById("versionsModalBtn"),Be=document.getElementById("menu-btn-versions"),He=document.getElementById("closeVersionsModal"),nt=document.getElementById("versionsListContainer");function ut(A){z&&(z.classList.remove("hidden"),z.classList.add("flex"),xt(),qe({id:"versionsModal",name:"Versions",close:()=>{z.classList.add("hidden"),z.classList.remove("flex")},restore:()=>{z.classList.remove("hidden"),z.classList.add("flex"),xt()}}))}async function xt(){const A=await Zs(e);nt&&(nt.innerHTML=A.map(P=>`
      <div class="p-3 rounded-xl border ${P.isCurrent?"border-2 border-blue-600 bg-blue-50/30":"border-slate-200 bg-white hover:bg-slate-50"} transition-colors flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-heading font-bold text-sm text-slate-900">${P.name}</span>
            <span class="px-2 py-0.5 rounded-full ${P.isCurrent?"bg-blue-600 text-white font-semibold":"bg-slate-100 text-slate-600 font-medium"} text-[10px]">${P.tag}</span>
          </div>
          <span class="text-[11px] text-slate-400 font-caption">${P.timestamp}</span>
        </div>
        <p class="text-xs text-slate-600">${P.notes||"Point-in-time snapshot."}</p>
        <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>Edited by ${P.author}</span>
          <div class="flex items-center gap-2">
            <span class="font-medium text-slate-700">${P.stats}</span>
            ${P.isCurrent?"":`<button class="restore-version-btn text-blue-600 font-semibold hover:underline" data-vname="${P.name}">Restore</button>`}
          </div>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".restore-version-btn").forEach(P=>{P.onclick=()=>{const O=P.getAttribute("data-vname");y(`Restored version "${O}"`),document.getElementById("currentVersionTag").textContent=O,H("versionsModal")}}))}Se&&(Se.onclick=()=>ut()),Be&&(Be.onclick=()=>{H("moreMenu"),ut()}),He&&(He.onclick=()=>H("versionsModal")),z&&(z.onclick=A=>{A.target===z&&H("versionsModal")});const Ze=document.getElementById("newVersionModal"),mt=document.getElementById("openNewVersionPrompt"),Fe=document.getElementById("closeNewVersionModal"),ft=document.getElementById("cancelNewVersionBtn"),bt=document.getElementById("saveNewVersionBtn");function kt(){z.classList.add("hidden"),Ze.classList.remove("hidden"),Ze.classList.add("flex"),qe({id:"newVersionModal",name:"New Version",close:()=>{Ze.classList.add("hidden"),Ze.classList.remove("flex")}})}mt&&(mt.onclick=kt),Fe&&(Fe.onclick=()=>H("newVersionModal")),ft&&(ft.onclick=()=>H("newVersionModal")),bt&&(bt.onclick=async()=>{const A=document.getElementById("newVersionNameInput")?.value.trim(),P=document.getElementById("newVersionNotesInput")?.value.trim();A&&(await Qs(e,{name:A,notes:P}),y(`Created version snapshot "${A}"`),document.getElementById("currentVersionTag").textContent=A,H("newVersionModal"))});const E=document.getElementById("compareModal"),B=document.getElementById("openCompareBtn"),M=document.getElementById("menu-btn-compare"),L=document.getElementById("closeCompareModal"),J=document.getElementById("closeCompareBtn2");function ue(){z.classList.add("hidden"),E.classList.remove("hidden"),E.classList.add("flex"),qe({id:"compareModal",name:"Compare Versions",close:()=>{E.classList.add("hidden"),E.classList.remove("flex")}})}B&&(B.onclick=ue),M&&(M.onclick=()=>{H("moreMenu"),ue()}),L&&(L.onclick=()=>H("compareModal")),J&&(J.onclick=()=>H("compareModal")),E&&(E.onclick=A=>{A.target===E&&H("compareModal")})}function _t(){if(!S)return;let e=0;S.scenes.forEach(o=>{o.blocks.forEach(l=>{l.content&&(e+=l.content.trim().split(/\s+/).filter(Boolean).length)})});const s=document.querySelectorAll(".screenplay-page-sheet").length||1,a=document.getElementById("telemetry-page-count"),n=document.getElementById("telemetry-word-count");a&&(a.textContent=`Page 1 of ${s}`),n&&(n.textContent=`${e.toLocaleString()} words`)}function Za(){const e=f.state.scripts||[],t=f.state.selectedScriptId||"chronicles-of-dust",s=e.find(a=>a.id===t)||e[0]||{title:"Chronicles of Dust"};return`
    ${de("Intelligence","Script Selector")}

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

    ${pe("intelligence")}
  `}function Qa(e){let t=f.state.selectedScriptId||"chronicles-of-dust";document.querySelectorAll(".script-select-card").forEach(n=>{n.onclick=()=>{const o=n.getAttribute("data-script-id"),l=n.getAttribute("data-script-title");t=o,f.selectScript(o),document.querySelectorAll(".script-select-card").forEach(x=>{x.className="script-select-card relative p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const p=x.querySelector(".script-select-indicator");p&&(p.className="script-select-indicator w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0",p.innerHTML='<span class="material-symbols-outlined text-[16px]">arrow_forward</span>')}),n.className="script-select-card relative p-3.5 rounded-xl border border-blue-600 bg-blue-50/70 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const i=n.querySelector(".script-select-indicator");i&&(i.className="script-select-indicator w-6 h-6 rounded-full bg-blue-600 text-white shadow-xs flex items-center justify-center shrink-0",i.innerHTML='<span class="material-symbols-outlined text-[16px] font-bold">check</span>');const c=document.getElementById("selector-btn-label");c&&(c.textContent=`Continue to Context (${l})`)}});const s=document.getElementById("submit-continue-analysis-btn");s&&(s.onclick=()=>{f.selectScript(t),e("/intelligence/context")});const a=document.getElementById("btn-import-script-modal");a&&(a.onclick=()=>{y("Select screenplay file (.fountain, .fdx, .pdf) to parse","info")})}function en(){const e=f.state.selectedScriptId||"chronicles-of-dust",t=f.state.scripts.find(a=>a.id===e)||f.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",format:"Feature",industry:"International / Hollywood"},s=t.context||{format:t.format||"Feature",industry:t.industry||"International / Hollywood",hours:1,minutes:36,seconds:0};return`
    ${de("Intelligence","Context Calibration")}

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

    ${pe("intelligence")}
  `}function tn(e){const t=f.state.selectedScriptId||"chronicles-of-dust",s=f.state.scripts.find(d=>d.id===t)||f.state.activeScript||{},a=s.context||{};let n=a.format||s.format||"Feature",o=a.hours!==void 0?a.hours:1,l=a.minutes!==void 0?a.minutes:36,i=a.seconds!==void 0?a.seconds:0;document.querySelectorAll(".format-card").forEach(d=>{d.onclick=()=>{n=d.getAttribute("data-format"),document.querySelectorAll(".format-card").forEach(r=>{r.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 transition-all cursor-pointer hover:bg-slate-50"}),d.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 border-2 border-blue-600 transition-all cursor-pointer",n==="Short"?(o=0,l=25,i=0):n==="Pilot"?(o=0,l=50,i=30):(o=1,l=45,i=0),c()}});function c(){const d=b=>String(b).padStart(2,"0"),r=document.getElementById("val-hr"),u=document.getElementById("val-min"),h=document.getElementById("val-sec");r&&(r.value=d(o)),u&&(u.value=d(l)),h&&(h.value=d(i));const m=o*60+l+Math.round(i/60),g=document.getElementById("pacing-projection");g&&(g.textContent=`~${m} standard script pages`)}document.querySelectorAll(".stepper-btn").forEach(d=>{d.onclick=()=>{const r=d.getAttribute("data-unit"),u=parseInt(d.getAttribute("data-delta"),10)||0;r==="hr"&&(o=Math.max(0,Math.min(9,o+u))),r==="min"&&(l=Math.max(0,Math.min(59,l+u))),r==="sec"&&(i=Math.max(0,Math.min(59,i+u))),c()}}),[{id:"val-hr",max:9,get:()=>o,set:d=>{o=d}},{id:"val-min",max:59,get:()=>l,set:d=>{l=d}},{id:"val-sec",max:59,get:()=>i,set:d=>{i=d}}].forEach(({id:d,max:r,set:u,get:h})=>{const m=document.getElementById(d);m&&(m.onfocus=()=>{m.select()},m.oninput=()=>{let g=m.value.replace(/\D/g,"");if(g==="")u(0);else{let w=parseInt(g,10);isNaN(w)&&(w=0),w>r?(w=r,m.value=String(w)):m.value=g.slice(0,2),u(w)}const b=o*60+l+Math.round(i/60),v=document.getElementById("pacing-projection");v&&(v.textContent=`~${b} standard script pages`)},m.onblur=()=>{let g=m.value.replace(/\D/g,""),b=parseInt(g,10);isNaN(b)&&(b=0),b=Math.max(0,Math.min(r,b)),u(b),m.value=String(b).padStart(2,"0"),c()},m.onkeydown=g=>{if(g.key==="Enter")m.blur();else if(g.key==="ArrowUp"){g.preventDefault();const b=h(),v=Math.min(r,b+1);u(v),m.value=String(v).padStart(2,"0"),c()}else if(g.key==="ArrowDown"){g.preventDefault();const b=h(),v=Math.max(0,b-1);u(v),m.value=String(v).padStart(2,"0"),c()}})});const p=document.getElementById("btn-submit-context");p&&(p.onclick=async()=>{const d=document.getElementById("industry-select")?.value||"International / Hollywood";p.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Calibrating SCRIPTORA...</span>',p.disabled=!0;const r=h=>String(h).padStart(2,"0"),u={format:n,industry:d,hours:o,minutes:l,seconds:i,plannedDuration:`${r(o)}:${r(l)}:${r(i)}`};await ca(t,u),y("Narrative parameters calibrated"),e("/intelligence/dashboard")})}function sn(){const e=f.state.selectedScriptId||"chronicles-of-dust",t=f.state.scripts.find(a=>a.id===e)||f.state.activeScript||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pages:96,format:"Feature"},s=t.analysisScores||{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80};return`
    ${de("Intelligence","Script Analysis")}

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
            ${[{name:"Pacing",score:s.pacing,icon:"speed"},{name:"Dialogue",score:s.dialogue,icon:"chat"},{name:"Emotion",score:s.emotion,icon:"favorite"},{name:"Character Arc",score:s.characterArc,icon:"alt_route"},{name:"Continuity",score:s.continuity,icon:"linear_scale"},{name:"Story Structure",score:s.storyStructure,icon:"account_tree"},{name:"Theme",score:s.theme,icon:"lightbulb"},{name:"Cinema",score:s.cinema,icon:"videocam"},{name:"Formatting",score:s.formatting,icon:"rule"},{name:"Production",score:s.production,icon:"movie_creation"}].map(a=>`
              <div class="py-2.5 flex items-center justify-between gap-3">
                <div class="flex items-center gap-2 w-36 shrink-0">
                  <span class="material-symbols-outlined text-[17px] text-slate-400">${a.icon}</span>
                  <span class="text-xs sm:text-sm font-medium text-slate-700 truncate">${a.name}</span>
                </div>
                <div class="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div class="h-full bg-blue-600 rounded-full" style="width: ${a.score}%;"></div>
                </div>
                <span class="text-xs sm:text-sm font-bold text-slate-900 w-8 text-right font-mono">${a.score}</span>
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
            ${f.state.scripts.map(a=>`
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

    ${pe("intelligence")}
  `}function an(e){const t=f.state.selectedScriptId||"chronicles-of-dust",s=f.state.scripts.find(b=>b.id===t)||f.state.scripts[0],a=document.getElementById("btn-gen-logline"),n=document.getElementById("btn-gen-synopsis"),o=document.getElementById("ai-generated-container"),l=document.getElementById("ai-generated-title"),i=document.getElementById("ai-generated-body"),c=document.getElementById("ai-close-btn"),x=document.getElementById("ai-copy-btn"),p=document.getElementById("ai-copy-text"),d=document.getElementById("ai-query-input"),r=document.getElementById("ai-query-submit");function u(b){o&&(o.classList.remove("hidden"),l.textContent=b==="logline"?"Generated Logline":"Generated Synopsis",i.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Generating with narrative telemetry...</span>',setTimeout(()=>{i.textContent=b==="logline"?s?.logline||"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.":s?.synopsis||"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves."},400))}if(a&&(a.onclick=()=>u("logline")),n&&(n.onclick=()=>u("synopsis")),c&&(c.onclick=()=>o.classList.add("hidden")),x&&(x.onclick=()=>{navigator.clipboard?.writeText(i.textContent||""),p.textContent="Copied!",setTimeout(()=>{p.textContent="Copy"},1800),y("Copied to clipboard")}),r&&d){const b=async()=>{const v=d.value.trim();if(!v)return;o.classList.remove("hidden"),l.textContent="Intelligence AI Answer",i.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing draft semantics...</span>';const w=await ss(v,t);i.textContent=w,d.value=""};r.onclick=b,d.onkeydown=v=>{v.key==="Enter"&&b()}}const h=document.getElementById("script-switcher-modal"),m=document.getElementById("script-selector-trigger"),g=document.getElementById("close-script-switcher-modal");m&&(m.onclick=()=>h?.classList.remove("hidden")),g&&(g.onclick=()=>h?.classList.add("hidden")),document.querySelectorAll(".script-switch-opt").forEach(b=>{b.onclick=()=>{const v=b.getAttribute("data-id");f.selectScript(v),h?.classList.add("hidden"),e("/intelligence")}})}function nn(){const e=f.state.selectedScriptId||"chronicles-of-dust",t=f.state.scripts.find(a=>a.id===e)||f.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",pages:96},s=[{type:"pacing",title:"Pacing",desc:"See where the story moves too fast or too slowly.",icon:"speed",score:82,telemetry:`${t.pages||96} Pages Telemetry`},{type:"dialogue",title:"Dialogue",desc:"Cadence, subtext density and character voice rhythm.",icon:"chat",score:89,telemetry:"42 Dialogue Exchanges"},{type:"emotion",title:"Emotion",desc:"Emotional heatmaps, catharsis curves and sentiment.",icon:"favorite",score:91,telemetry:"Peak Catharsis: Act II"},{type:"character-arc",title:"Character Arc",desc:"Want vs. need trajectories and transformation tracking.",icon:"alt_route",score:84,telemetry:"4 Major Protagonists"},{type:"continuity",title:"Continuity",desc:"Props, character locations, and temporal logic rules.",icon:"linear_scale",score:78,telemetry:"2 Minor Prop Conflicts"},{type:"story-structure",title:"Story Structure",desc:"Beat breakdowns, midpoint shifts and turning points.",icon:"account_tree",score:87,telemetry:"3-Act Paradigm Standard"},{type:"theme",title:"Theme",desc:"Core philosophical spines, motifs and moral arguments.",icon:"lightbulb",score:90,telemetry:"3 Tracked Motifs"},{type:"cinema",title:"Cinema",desc:"Visual storytelling, shot economy and set-piece power.",icon:"videocam",score:85,telemetry:"Cinematic Visual Index"},{type:"scene",title:"Scene Analysis",desc:"Deep dive breakdown of goals, conflict and polarity.",icon:"movie",score:86,telemetry:"Scene 18 Active Scope"},{type:"formatting",title:"Formatting",desc:"Standard industry margins, sluglines and font rules.",icon:"rule",score:94,telemetry:"Standard Guild Rules"},{type:"production",title:"Production",desc:"Locations, shooting cast, props and cost estimators.",icon:"movie_creation",score:80,telemetry:"24 Practical Locations"}];return`
    ${de("Intelligence","Analyse Individually")}

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

    ${pe("intelligence")}
  `}function on(e){const t=document.getElementById("analysis-filter-input");t&&(t.oninput=s=>{const a=s.target.value.toLowerCase().trim();document.querySelectorAll("#analysis-tiles-grid .analysis-tile").forEach(n=>{const o=n.getAttribute("data-keyword")||"";n.style.display=o.includes(a)?"flex":"none"})})}const hs={pacing:{title:"Pacing Analysis",score:82,icon:"speed",desc:"Scene duration variance, narrative tempo and page-turn velocity.",questions:["Where does the pace drag in Act II?","Find scenes over 4 pages","Show action-to-dialogue ratios"],findings:[{scene:"SCENE 14 · Dockside Perimeter · Pg 36",act:"Act II",title:"Action beats slow down before major confrontation",desc:"Extended exposition between dock guards lowers tension prior to container breach.",targetScene:14},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Peak narrative rhythm",desc:"Fast intercut dialogue creates maximum urgency before floodgate breach.",targetScene:18},{scene:"SCENE 26 · Coastal Highway · Pg 68",act:"Act III",title:"High velocity turning point",desc:"Pursuit cadence maintains optimal beats per page.",targetScene:26}]},dialogue:{title:"Dialogue Analysis",score:89,icon:"chat",desc:"Cadence, subtext density, distinctive character voice profiles.",questions:["Are character voices distinctive?","Find on-the-nose exposition lines","Analyze dialogue subtext in Scene 18"],findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Subtext is understated and powerful",desc:"Kevin avoids speaking about his brother directly, communicating through silence and tea rituals.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Meera O.S. dialogue establishes authority",desc:"Radio chatter avoids fluff and communicates technical stakes concisely.",targetScene:18}]},emotion:{title:"Emotion Analysis",score:91,icon:"favorite",desc:"Catharsis trajectory, emotional resonance curves, character empathy indices.",questions:["Where does emotional vulnerability peak?","Track empathy trajectory for Kevin","Catharsis resolution in Act III"],findings:[{scene:"SCENE 12 · Father’s Workshop · Pg 28",act:"Act I",title:"Emotional anchor established",desc:"Familial debt and generational sacrifice ground Kevin’s reluctance to blow the whistle.",targetScene:12},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Desperation under rising water",desc:"Kevin’s fear of failing Meera is palpable as water rises past junction box.",targetScene:18}]},"character-arc":{title:"Character Arc Analysis",score:84,icon:"alt_route",desc:"Want vs. Need conflict, psychological transformation, fatal flaw resolution.",questions:["Does Kevin overcome his passivity?","Meera character transformation","Antagonist motivation clarity"],findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]},continuity:{title:"Continuity Analysis",score:78,icon:"linear_scale",desc:"Prop tracking, character spatial locations, timeline consistency checks.",questions:["Check prop handover in Scene 18","Is time of day consistent across Act II?","Track the brass seal location"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Hydro-sensor probe referenced before retrieval",desc:"Verify Kevin picked up copper probe in Scene 16 or carries it on belt.",targetScene:18},{scene:"SCENE 22 · Pumping Station · Pg 58",act:"Act II",title:"Flashlight state discrepancy",desc:"Ensure flashlight was retrieved after water surge in Scene 19.",targetScene:22}]},"story-structure":{title:"Story Structure Analysis",score:87,icon:"account_tree",desc:"Inciting incident, plot points, midpoint shift, climax architecture.",questions:["Is midpoint clearly defined?","Evaluate climax timing on page 88","Are 3-act beats aligned?"],findings:[{scene:"SCENE 06 · Customs Registry · Pg 14",act:"Inciting Incident",title:"Off-manifest container discovered",desc:"The inciting anomaly sets Kevin on irreversible investigative path.",targetScene:6},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Midpoint (Pg 48/96)",title:"Stakes escalate from civil to criminal",desc:"Kevin realizes his own brother commands the smuggling cartel.",targetScene:18}]},theme:{title:"Theme Analysis",score:90,icon:"lightbulb",desc:"Primary narrative spine: Complicity vs. Duty and moral accountability.",questions:["What is the central theme?","Where is loyalty tested?","Show recurring thematic motifs"],findings:[{scene:"SCENE 09 · Family Kitchen · Pg 22",act:"Act I",title:"Familial pressure as thematic catalyst",desc:"Kevin hides eviction notice, showing economic desperation fueling institutional silence.",targetScene:9},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Moral test faced directly",desc:"Kevin must decide whether to save his brother or save the port city from flooding.",targetScene:18},{scene:"SCENE 36 · Rooftop Overlook · Pg 94",act:"Act III",title:"Theme delivers its final statement",desc:"Accountability over self-preservation.",targetScene:36}]},cinema:{title:"Cinema & Visual Storytelling",score:85,icon:"videocam",desc:"Visual set-piece density, image systems, lighting and camera intentionality.",questions:["Check visual contrast between acts","Highlight cinematic set-pieces","Analyze color palette cues in action lines"],findings:[{scene:"SCENE 01 · Harbor Drone View · Pg 01",act:"Act I",title:"Strong establishing visual metaphor",desc:"Rusted shipping containers stacked like monoliths beneath smog.",targetScene:1},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"High visual tension",desc:"Red emergency beacons reflected in rising brackish water.",targetScene:18}]},scene:{title:"Scene Analysis",score:86,icon:"movie",desc:"Micro-structure of Scene 18: Objective, obstacle, polarity change.",questions:["What is the scene objective?","Where does tension peak?","How does polarity shift?"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]},formatting:{title:"Formatting & Guild Compliance",score:94,icon:"rule",desc:"Industry standard margin measurements, capitalization, slugline syntax.",questions:["Check standard industry margins","Find non-standard scene sluglines","Verify dialogue capitalization rules"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Perfect Courier Prime 12pt slugline",desc:"Margins, dual dialogue spacing, and transition tags meet Writers Guild standards.",targetScene:18}]},production:{title:"Production Breakdown",score:80,icon:"movie_creation",desc:"Locations, shooting days, practical elements, cast size breakdown.",questions:["How many practical locations?","Show scenes with special props","List one-off speaking roles"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Location: Wet Stage / Customs Interior",desc:"Requires controlled water flooding tank, hydro-sensor prop box, wet comm-link gear.",targetScene:18}]}};function js(e){if(f.state.screenplay&&f.state.screenplay.id===e)return f.state.screenplay;const t=localStorage.getItem(`scriptora_screenplay_${e}`);if(t)try{const s=JSON.parse(t);if(s&&s.scenes&&s.scenes.length>0)return s}catch{}return e==="chronicles-of-dust"?ts:null}function Os(e,t){const s=[];return e&&Array.isArray(e.scenes)&&e.scenes.length>0?e.scenes.forEach((a,n)=>{const o=a.number||n+1,l=a.slugline&&a.slugline.trim()||a.blocks?.find(i=>i.type==="scene")?.content?.trim()||`SCENE ${o}`;s.push({id:a.id||`scene-${o}`,number:o,slugline:l,act:a.actId==="act-3"?"Act III":a.actId==="act-2"?"Act II":o>24?"Act III":o>11?"Act II":"Act I"})}):ts.scenes.forEach(n=>{s.push({id:n.id,number:n.number,slugline:n.slugline||`SCENE ${n.number}`,act:n.actId==="act-2"?"Act II":"Act I"})}),s}function ln(e){const t=[];e&&((e.characters||[]).forEach(a=>{const n=typeof a=="string"?a:a.name||"";n&&t.push(n)}),(e.scenes||[]).forEach(a=>{(a.blocks||[]).forEach(n=>{n.type==="character"&&n.content&&t.push(n.content)})}));let s=Cs(t);if(s.length===0&&(e&&(e.id==="chronicles-of-dust"||e.title?.includes("Dust"))?s=["SANTHOSH","ARAVIND","KEVIN","MEERA"]:s=["SANTHOSH","ARAVIND"]),e&&(e.characters=s,e.id))try{localStorage.setItem(`scriptora_screenplay_${e.id}`,JSON.stringify(e))}catch{}return s.map(a=>{const n=a.toUpperCase();let o="Character";return n==="SANTHOSH"||n==="ARAVIND"||n==="KEVIN"?o="Protagonist":n==="MEERA"&&(o="Confidante"),{name:a,role:o}})}function _s(e,t=[]){const s=t.find(i=>Number(i.number)===Number(e))||{number:e,slugline:`SCENE ${e}`,act:e>24?"Act III":e>11?"Act II":"Act I"},a=s.slugline.replace(/^SCENE\s*\d+\s*·\s*/i,"").trim(),n=s.act||(e>24?"Act III":e>11?"Act II":"Act I"),o=Math.max(1,(s.number-1)*3+1),l=Math.min(4.5,Math.max(1.5,s.number*7%3+2)).toFixed(1);return Number(e)===18?{number:18,heading:"SCENE 18 · INT. CUSTOMS OFFICE - NIGHT",act:"Act II Midpoint",page:48,estMin:"3.5",meta:"Act II Midpoint · Pg 48 · ~3.5 min est.",purpose:"Kevin attempts to reroute the electrical relay before the surge floods the basement archives.",conflict:"Rising water breaches the junction box while automated emergency flood doors trigger lockouts, trapping him inside.",whatChanges:"Kevin cuts the emergency seal and refuses to sign the false manifest, irreversibly shifting from passive worker to active resistance.",synthesis:"Polarity shifts from cautious optimism (+1) to catastrophic physical trap and moral awakening (-2), marking the central pivot of the screenplay.",findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]}:Number(e)===1?{number:1,heading:`SCENE 01 · ${a||"INT. HOME - EVENING"}`,act:"Act I Opening",page:1,estMin:"2.0",meta:"Act I Opening · Pg 01 · ~2.0 min est.",purpose:"Establish opening character presence, environment, and initial psychological stakes.",conflict:"Tension and unspoken questions between characters as unfamiliar presence breaks routine.",whatChanges:"Ordinary state broken by unfamiliar arrival, creating the narrative catalyst for the journey.",synthesis:"Polarity shifts from neutral calm (0) to heightened curiosity and alertness (-1), establishing the dramatic question.",findings:[{scene:`SCENE 01 · ${a||"Opening"} · Pg 01`,act:"Act I Opening",title:"Establish protagonist baseline and primary premise",desc:"Opening visual dynamic introduces character motives before inciting conflict.",targetScene:1}]}:Number(e)===4?{number:4,heading:`SCENE 04 · ${a||"INT. PORT AUDIT ROOM - DAY"}`,act:"Act I",page:9,estMin:"2.5",meta:"Act I · Pg 09 · ~2.5 min est.",purpose:"Kevin audits cargo registry under pressure from superiors to overlook anomalies.",conflict:"Institutional compliance vs early ethical hesitation as signatures are demanded.",whatChanges:"Kevin stamps the manifest with reluctance, confirming his fatal flaw of institutional compliance.",synthesis:"Polarity shifts from hesitation (0) to moral compromise (-1), establishing the internal flaw to overcome.",findings:[{scene:"SCENE 04 · Port Audit · Pg 09",act:"Act I",title:"Fatal Flaw Demonstrated: Silent Compliance",desc:"Compliant stamp creates complicity guilt that fuels later revolt.",targetScene:4}]}:{number:e,heading:`SCENE ${String(e).padStart(2,"0")} · ${a||`INT. LOCATION ${e} - DAY`}`,act:n,page:o,estMin:l,meta:`${n} · Pg ${o} · ~${l} min est.`,purpose:`Execute narrative beat for ${a||`Scene ${e}`} and advance sequence trajectory.`,conflict:"Characters encounter rising resistance while navigating immediate beat obstacles.",whatChanges:"Beats shift character leverage, altering interpersonal dynamic and scene outcome.",synthesis:"Polarity turns decisively across the beat, transitioning the dramatic tension into the next sequence.",findings:[{scene:`SCENE ${String(e).padStart(2,"0")} · Pg ${o}`,act:n,title:`Scene ${e} Beat Dynamics`,desc:`Dramatic polarity progression in ${a||`Scene ${e}`} sustains narrative tempo.`,targetScene:e}]}}function Hs(e,t){const s=dt(e||"SANTHOSH"),a=s.toUpperCase();let n=0;if(t&&Array.isArray(t.scenes)&&t.scenes.forEach(i=>{i.blocks&&i.blocks.some(c=>c.type==="character"&&dt(c.content)===a)&&n++}),a==="SANTHOSH")return{name:"SANTHOSH",role:"Protagonist",scenesCount:n>0?`${n} scenes tracked`:"36 scenes tracked",step1Title:"Silent Conviction & Initial Resistance",step1Tag:"Fatal Flaw",step1Range:"Beginning Beats",step1Desc:"Santhosh begins navigating intense internal conviction, wrestling with external constraints and uncovering initial stakes.",step2Title:"The Turning Point & Strategic Pivot",step2Tag:"Turning Point",step2Range:"Middle Beats (Midpoint)",step2Desc:"Santhosh breaks away from passive compromises, taking active control of the narrative direction under peak conflict.",step3Title:"Decisive Transformation & Resolution",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Santhosh embraces complete accountability and purpose, achieving an irreversible transformation through the climax.",synthesis:"Santhosh drives the core thematic arc of the story, transforming from cautious survival into an active, principled catalyst of change.",findings:[{scene:"SCENE 01 · Narrative Baseline · Pg 01",act:"Act I",title:"Fatal Flaw: Internal Hesitation",desc:"Santhosh operates with guarded vigilance before escalating pressures force decisive action.",targetScene:1},{scene:"SCENE 02 · The Turning Point · Pg 05",act:"Act II",title:"The Point of No Return",desc:"Santhosh takes a defining stance that permanently pivots interpersonal relationships and story stakes.",targetScene:2}]};if(a==="ARAVIND")return{name:"ARAVIND",role:"Protagonist",scenesCount:n>0?`${n} scenes tracked`:"32 scenes tracked",step1Title:"Guarded Precision & Calculated Loyalty",step1Tag:"Origin Stance",step1Range:"Beginning Beats",step1Desc:"Aravind maintains tactical focus and sharp perception, questioning surrounding motives and testing early alliances.",step2Title:"High-Stakes Partnership & Crucial Stand",step2Tag:"Midpoint Shift",step2Range:"Middle Beats (Midpoint)",step2Desc:"Aravind unites forces during the turning point, applying razor-sharp resolve to counter mounting narrative obstacles.",step3Title:"Decisive Breakthrough & Ultimate Climax",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Aravind executes the final breakthrough, sealing the resolution through steadfast commitment to the mission.",synthesis:"Aravind provides essential tactical momentum and intellectual force, elevating the stakes and cementing the dramatic payoff.",findings:[{scene:"SCENE 01 · Tactical Introduction · Pg 01",act:"Act I",title:"Strategic Presence & Foresight",desc:"Aravind introduces critical context and tactical perspective into the unfolding scenario.",targetScene:1},{scene:"SCENE 02 · Midpoint Crucible · Pg 06",act:"Act II",title:"Decisive Strategic Realignment",desc:"Aravind commits to the high-stakes confrontation that defines the story trajectory.",targetScene:2}]};if(a==="KEVIN")return{name:"Kevin",role:"Protagonist",scenesCount:n>0?`${n} scenes tracked`:"48 scenes tracked",step1Title:"Silent Compliance & Institutional Fear",step1Tag:"Fatal Flaw",step1Range:"Beginning · Scene 01–11",step1Desc:"Hesitant and guarded, Kevin stamps irregular manifests to keep peace with superiors and protect familial debt.",step2Title:"The Point of No Return",step2Tag:"Turning Point",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Cuts the emergency floodgate seal, actively defying union directives to prevent port catastrophe.",step3Title:"Selfless Moral Accountability",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Hands over the ledger to the public audit without demanding personal immunity, completing moral transformation.",synthesis:"The protagonist completes a verified 3-stage transformation: overcoming passivity at the midpoint and prioritizing moral duty over self-preservation in the climax.",findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]};if(a==="MEERA")return{name:"Meera",role:"Confidante",scenesCount:n>0?`${n} scenes tracked`:"22 scenes tracked",step1Title:"Vigilant Skepticism & Tactical Isolation",step1Tag:"Origin Stance",step1Range:"Beginning · Scene 01–12",step1Desc:"Operates independently along pipeline perimeters, skeptical of municipal regulators and trusting only raw field telemetry.",step2Title:"Calculated Alliance Under Pressure",step2Tag:"Partnership Beat",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Guides Kevin via comm-link to the breaker box, choosing to rely on his technical precision despite active security alarms.",step3Title:"Vindicated Shared Resistance",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Secures and broadcasts the telemetry leak to the public frequency, cementing alliance and exposing corporate monopoly.",synthesis:"The confidante evolves from protective cynicism to trusted partnership, providing the strategic resolve that enables the protagonist to act.",findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Tactical Caution & Guarded Insight",desc:"Meera warns Kevin of private security patrols monitoring pipeline telemetry.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Emergency Comm Guidance",desc:"Meera coordinates the junction box bypass before automated floodgates lock.",targetScene:18}]};const o=a==="KEVIN"||a==="SANTHOSH"||a==="ARAVIND"?"Protagonist":"Character",l=n>0?`${n} scenes tracked`:"Screenplay Character";return{name:s,role:o,scenesCount:l,step1Title:"Initial Presence & Motive Baseline",step1Tag:"Introduction",step1Range:"Beginning Beats",step1Desc:`${s} is introduced navigating personal priorities and reacting to the changing environment.`,step2Title:"Escalating Involvement in Narrative Stakes",step2Tag:"Midpoint Pressure",step2Range:"Middle Beats",step2Desc:`${s} faces direct conflict or shifting loyalties as pressure mounts across the sequence.`,step3Title:"Climactic Position & Resolution",step3Tag:"Resolution",step3Range:"Ending Beats",step3Desc:`${s} resolves their dramatic throughline, solidifying their standing in the story outcome.`,synthesis:`${s} contributes essential narrative pressure and perspective across their screenplay appearances.`,findings:[{scene:"SCENE 01 · Screenplay Beat · Pg 01",act:"Act I",title:`${s} Character Introduction`,desc:`Dialogue and action beats introduce ${s}'s voice and perspective.`,targetScene:1}]}}function rn(e,t,s={}){const a=t.pages||96,{availableScenes:n=[],currentSceneData:o={},availableChars:l=[],currentCharData:i={}}=s;switch(e){case"pacing":return`
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
                  ${l.map(c=>`
                    <option value="${c.name}" ${c.name.toUpperCase()===(i.name||"").toUpperCase()?"selected":""}>${c.name}</option>
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
                    ${n.map(c=>`
                      <option value="${c.number}" ${String(c.number)===String(o.number)?"selected":""}>Scene ${c.number}</option>
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
      `;default:return""}}function cn(e="pacing",t=null,s=null){const a={...hs[e]||hs.pacing},n=sessionStorage.getItem("scriptora_prod_return");let o;try{const w=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;o=new URLSearchParams(w||"")}catch{o=new URLSearchParams}const l=t==="editor"||o.get("from")==="editor"||!!n,i=s||o.get("scriptId")||(n?n.replace("/editor/",""):null)||f.state.selectedScriptId||"chronicles-of-dust",c=`/editor/${i}`,x=i,p=f.state.scripts.find(w=>w.id===x)||f.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",pages:96},d=js(x),r=Os(d),u=ln(d),h=Number(f.state.currentSceneId||(r.find(w=>w.number===18)?18:r[0]?.number||1)),m=u[0]?.name||"Kevin",g=_s(h,r),b=Hs(m,d);e==="scene"?(a.desc=`Micro-structure of Scene ${g.number}: Objective, obstacle, polarity change.`,a.findings=g.findings||a.findings):e==="character-arc"&&(a.findings=b.findings||a.findings);const v={availableScenes:r,currentSceneData:g,availableChars:u,currentCharData:b};return`
    ${de(l?"Editor":"Intelligence",a.title)}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- 1. SUB-HEADER NAVIGATION ROW -->
        <div class="flex items-center justify-between">
          ${l?`
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
            ${a.questions.map(w=>`
              <button type="button" class="query-pill shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors shadow-xs active:scale-95" data-query="${w}">
                ${w}
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
        ${rn(e,p,v)}

        <!-- 5. IMPORTANT FINDINGS (KEY SCENE FINDINGS) -->
        <div class="flex flex-col gap-3" id="analysis-findings-container">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">Key Scene Findings</span>
            <span id="findings-count-tag" class="text-[11px] text-slate-400 font-medium">${a.findings.length} findings tracked</span>
          </div>

          <div id="findings-list" class="flex flex-col gap-3">
            ${a.findings.map(w=>`
              <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${w.scene}</span>
                  <span class="text-[11px] font-medium text-slate-400">${w.act}</span>
                </div>
                <div class="flex flex-col">
                  <h3 class="text-xs sm:text-sm font-bold text-slate-900">${w.title}</h3>
                  <p class="text-xs text-slate-600 mt-1 leading-relaxed">${w.desc}</p>
                </div>
                <div class="pt-2 flex justify-end border-t border-slate-100">
                  <!-- 6. OPEN IN EDITOR BUTTON -->
                  <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${w.targetScene}">
                    <span class="material-symbols-outlined text-[15px]">edit_note</span>
                    <span>Open in Editor (Scene ${w.targetScene})</span>
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    </main>

    ${pe("intelligence")}
  `}function dn(e,t,s=null,a=null){const n=sessionStorage.getItem("scriptora_prod_return");let o;try{const T=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;o=new URLSearchParams(T||"")}catch{o=new URLSearchParams}const l=s==="editor"||o.get("from")==="editor"||!!n,i=a||o.get("scriptId")||(n?n.replace("/editor/",""):null)||f.state.selectedScriptId||"chronicles-of-dust",c=`/editor/${i}`,x=i,p=js(x),d=Os(p),r=document.getElementById("analysis-back-btn");r&&(r.onclick=T=>{T.preventDefault(),l?(sessionStorage.removeItem("scriptora_prod_return"),t(c)):t("/intelligence/analysis")});function u(){document.querySelectorAll(".btn-open-editor-scene").forEach(T=>{T.onclick=()=>{const I=T.getAttribute("data-scene");f.setState({currentSceneId:Number(I)}),y(`Jumping to Scene ${I} in Editor`),t(`/editor/${x}?scene=${I}`)}})}u();function h(T){const I=document.getElementById("findings-list"),k=document.getElementById("findings-count-tag");k&&(k.textContent=`${T.length} findings tracked`),I&&(I.innerHTML=T.map(_=>`
      <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${_.scene}</span>
          <span class="text-[11px] font-medium text-slate-400">${_.act}</span>
        </div>
        <div class="flex flex-col">
          <h3 class="text-xs sm:text-sm font-bold text-slate-900">${_.title}</h3>
          <p class="text-xs text-slate-600 mt-1 leading-relaxed">${_.desc}</p>
        </div>
        <div class="pt-2 flex justify-end border-t border-slate-100">
          <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${_.targetScene}">
            <span class="material-symbols-outlined text-[15px]">edit_note</span>
            <span>Open in Editor (Scene ${_.targetScene})</span>
          </button>
        </div>
      </div>
    `).join(""),u())}const m=document.getElementById("analysis-scene-selector");m&&(m.onchange=T=>{const I=parseInt(T.target.value,10);f.setState({currentSceneId:I});const k=_s(I,d),_=document.getElementById("target-scene-meta"),X=document.getElementById("target-scene-heading"),W=document.getElementById("target-scene-purpose"),re=document.getElementById("target-scene-conflict"),Z=document.getElementById("target-scene-what-changes"),C=document.getElementById("target-scene-synthesis"),N=document.getElementById("analysis-header-desc");_&&(_.textContent=k.meta),X&&(X.textContent=k.heading),W&&(W.textContent=k.purpose),re&&(re.textContent=k.conflict),Z&&(Z.textContent=k.whatChanges),C&&(C.textContent=k.synthesis),N&&(N.textContent=`Micro-structure of Scene ${I}: Objective, obstacle, polarity change.`),h(k.findings),y(`Analyzing Scene ${I}`)});const g=document.getElementById("analysis-char-selector");g&&(g.onchange=T=>{const I=T.target.value,k=Hs(I,p),_=document.getElementById("char-role-badge"),X=document.getElementById("char-scenes-count"),W=document.getElementById("char-step1-range"),re=document.getElementById("char-step1-tag"),Z=document.getElementById("char-step1-title"),C=document.getElementById("char-step1-desc"),N=document.getElementById("char-step2-range"),Q=document.getElementById("char-step2-tag"),R=document.getElementById("char-step2-title"),le=document.getElementById("char-step2-desc"),ye=document.getElementById("char-step3-range"),z=document.getElementById("char-step3-tag"),Se=document.getElementById("char-step3-title"),Be=document.getElementById("char-step3-desc"),He=document.getElementById("char-synthesis-desc");_&&(_.textContent=k.role),X&&(X.textContent=k.scenesCount),W&&(W.textContent=k.step1Range),re&&(re.textContent=k.step1Tag),Z&&(Z.textContent=k.step1Title),C&&(C.textContent=k.step1Desc),N&&(N.textContent=k.step2Range),Q&&(Q.textContent=k.step2Tag),R&&(R.textContent=k.step2Title),le&&(le.textContent=k.step2Desc),ye&&(ye.textContent=k.step3Range),z&&(z.textContent=k.step3Tag),Se&&(Se.textContent=k.step3Title),Be&&(Be.textContent=k.step3Desc),He&&(He.textContent=k.synthesis),h(k.findings),y(`Switched active character focus to ${k.name}`)}),document.querySelectorAll("[data-jump-scene]").forEach(T=>{T.onclick=()=>{const I=T.getAttribute("data-jump-scene");f.setState({currentSceneId:Number(I)}),y(`Jumping to Scene ${I} in Editor`),t(`/editor/${x}?scene=${I}`)}});const b=document.getElementById("vector-ai-input"),v=document.getElementById("vector-ai-submit"),w=document.getElementById("vector-ai-answer");async function $(T){if(!T||!w)return;w.classList.remove("hidden"),w.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing narrative beats...</span>';const I=await ss(T,x);w.textContent=I}v&&b&&(v.onclick=()=>$(b.value.trim()),b.onkeydown=T=>{T.key==="Enter"&&$(b.value.trim())}),document.querySelectorAll(".query-pill").forEach(T=>{T.onclick=()=>{const I=T.getAttribute("data-query");b&&(b.value=I),$(I)}})}function pn(e=null,t=null){const s=new URLSearchParams(window.location.search||""),a=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),n=t||s.get("scriptId")||f.state.editorReturnScriptId||f.state.selectedScriptId||"chronicles-of-dust",o=a==="editor",l=o?sessionStorage.getItem("scriptora_editor_return")||`/editor/${n}`:"/workspace",i=f.state.scripts?.find(u=>u.id===n)||f.state.scripts?.[0]||{},c=f.state.currentUser||(()=>{try{const u=localStorage.getItem("scriptora_user");if(u)return JSON.parse(u)}catch{}return{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}}})(),x=f.state.settings||(()=>{try{const u=localStorage.getItem("scriptora_settings");if(u)return JSON.parse(u)}catch{}return{editor:{showSceneNumbers:!0,autoCapitalize:!0,autoTransition:!0,continueDialogue:!0,fontSize:"Courier Prime 12pt",autoSave:"Instant"},language:"English (US)",transliteration:!1,appearance:"Light",accentColor:"blue",fontScale:"Normal",notifications:{invites:!0,edits:!0,insights:!0,milestones:!0},intelligence:{deepAnalysis:!0,pacingAlerts:!0,dialogueScoring:!0,sensitivity:"Balanced"},privacy:{watermark:!0,encryption:!0}}})(),p=f.state.scripts?.length||c.stats?.drafts||14,d=3,r=c.stats?.healthIndex||"98%";return`
    ${de("Profile","Account & preferences.")}

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
            <span>${c.badge||"Member Pro"}</span>
          </div>
        </div>

        <!-- User Information Card -->
        <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs flex flex-col items-center text-center">
          <div class="relative group cursor-pointer" id="avatar-container-btn" title="Click to edit profile or change photo">
            <div id="user-avatar-circle" class="w-20 h-20 rounded-full ${c.avatarColor||"bg-blue-600"} text-white font-bold text-2xl flex items-center justify-center shadow-md overflow-hidden transition-transform active:scale-95 border-2 border-white ring-2 ring-slate-100">
              ${c.avatarUrl?`
                <img id="user-avatar-img" src="${c.avatarUrl}" class="w-full h-full object-cover" alt="${c.name}" />
              `:`
                <span id="user-avatar-initials">${c.initials||"AK"}</span>
              `}
            </div>
            <button type="button" id="edit-avatar-btn" class="w-6 h-6 bg-white rounded-full border border-slate-200 text-slate-700 flex items-center justify-center absolute -bottom-0.5 -right-0.5 shadow-sm hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer" title="Add profile picture from local device">
              <span class="material-symbols-outlined text-[13px]">add_a_photo</span>
            </button>
          </div>
          <h2 class="text-base font-bold text-slate-900 mt-2.5 leading-tight font-heading" id="profile-display-name">${c.name}</h2>
          <p class="text-xs text-slate-500 mt-0.5" id="profile-display-headline">${c.headline||"Screenwriter"}</p>
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
              <span class="text-base font-bold text-slate-900 group-hover:text-blue-600 leading-tight font-heading">${d}</span>
              <span class="text-[10px] text-slate-500 group-hover:text-blue-500 mt-0.5 font-medium">Co-Authors</span>
            </button>
            <button type="button" id="stat-card-health" class="bg-slate-50 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 rounded-xl p-2.5 text-center flex flex-col items-center transition-all cursor-pointer group">
              <span class="text-base font-bold text-slate-900 group-hover:text-blue-600 leading-tight font-heading">${r}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-editor">Numbers: ${x.editor?.showSceneNumbers?"On":"Off"} · Auto-save: ${x.editor?.autoSave||"Instant"}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-language">${x.language||"English (US)"}${x.transliteration?" · Transliteration On":""}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-appearance">${x.appearance||"Light"} · Scale: ${x.fontScale||"Normal"}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-notifications">${Object.values(x.notifications||{}).filter(Boolean).length} alerts active</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-intelligence">${x.intelligence?.deepAnalysis?"Deep Arc Diagnostics":"Standard"} · ${x.intelligence?.sensitivity||"Balanced"}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-privacy">${x.privacy?.watermark?"Watermark On":"Standard"} · Local AES Encrypted</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="profile-display-email">${c.email}</span>
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
              <div id="modal-preview-avatar" class="w-16 h-16 rounded-full ${c.avatarColor||"bg-blue-600"} text-white font-bold text-xl flex items-center justify-center shadow-xs overflow-hidden border-2 border-white ring-2 ring-slate-200">
                ${c.avatarUrl?`
                  <img id="modal-preview-img" src="${c.avatarUrl}" class="w-full h-full object-cover" alt="Preview" />
                `:`
                  <span id="modal-preview-initials">${c.initials||"AK"}</span>
                `}
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button type="button" id="btn-modal-upload-photo" class="h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer">
                <span class="material-symbols-outlined text-[15px]">add_a_photo</span>
                <span>Add Local Photo</span>
              </button>
              <button type="button" id="btn-modal-remove-photo" class="${c.avatarUrl?"":"hidden"} h-8 px-2.5 rounded-lg bg-red-50 hover:bg-red-100 active:scale-95 text-red-600 text-xs font-semibold flex items-center gap-1 border border-red-200 transition-all cursor-pointer">
                <span class="material-symbols-outlined text-[15px]">delete</span>
                <span>Remove</span>
              </button>
            </div>
            <p class="text-[10px] text-slate-400 text-center">Select any photo (PNG, JPG, WEBP) from your device</p>
          </div>

          <form id="form-update-profile" class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Full Name</label>
              <input type="text" id="prof-input-name" value="${c.name}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600" required>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Headline / Role</label>
              <input type="text" id="prof-input-headline" value="${c.headline||"Screenwriter"}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Email Address</label>
              <input type="email" id="prof-input-email" value="${c.email}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600" required>
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
              <input type="checkbox" id="cfg-editor-scenenums" ${x.editor?.showSceneNumbers?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Auto-Capitalize Characters</span>
                <span class="text-[11px] text-slate-500">Auto uppercase character headings</span>
              </div>
              <input type="checkbox" id="cfg-editor-autocap" ${x.editor?.autoCapitalize!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Continue Dialogue (CONT'D)</span>
                <span class="text-[11px] text-slate-500">Auto append character continuation cues</span>
              </div>
              <input type="checkbox" id="cfg-editor-contd" ${x.editor?.continueDialogue!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Screenplay Font Style</label>
              <select id="cfg-editor-font" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Courier Prime 12pt" ${x.editor?.fontSize?.includes("Prime")?"selected":""}>Courier Prime (12pt)</option>
                <option value="Courier FinalDraft 12pt" ${x.editor?.fontSize?.includes("Final")?"selected":""}>Courier FinalDraft (12pt)</option>
                <option value="Courier New 11pt" ${x.editor?.fontSize?.includes("New")?"selected":""}>Courier Standard (11pt)</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Auto-save Frequency</label>
              <select id="cfg-editor-autosave" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Instant" ${x.editor?.autoSave==="Instant"?"selected":""}>Instant (300ms Keystroke Sync)</option>
                <option value="Every 15s" ${x.editor?.autoSave==="Every 15s"?"selected":""}>Every 15 Seconds</option>
                <option value="Every 60s" ${x.editor?.autoSave==="Every 60s"?"selected":""}>Every 60 Seconds</option>
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
              ${[{id:"en",name:"English (US)",code:"English (US)"},{id:"ta",name:"Tamil (தமிழ்)",code:"Tamil"},{id:"tg",name:"Tanglish",code:"Tanglish"},{id:"hi",name:"Hindi (हिंदी)",code:"Hindi"}].map(u=>`
                <button type="button" class="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${x.language===u.code?"border-blue-600 bg-blue-50 text-blue-700":"border-slate-200 bg-white text-slate-800 hover:bg-slate-50"}" data-lang="${u.code}">
                  ${u.name}
                </button>
              `).join("")}
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 mt-1">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Phonetic Transliteration</span>
                <span class="text-[11px] text-slate-500">Auto convert phonetic typing to Tamil script</span>
              </div>
              <input type="checkbox" id="cfg-lang-translit" ${x.transliteration?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
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
                ${[{id:"Light",label:"Light",icon:"light_mode"},{id:"Dark",label:"Dark",icon:"dark_mode"},{id:"System",label:"System",icon:"devices"}].map(u=>`
                  <button type="button" class="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all ${x.appearance===u.id?"border-blue-600 bg-blue-50 text-blue-700":"border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}" data-theme="${u.id}">
                    <span class="material-symbols-outlined text-[18px]">${u.icon}</span>
                    <span>${u.label}</span>
                  </button>
                `).join("")}
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Display Font Scale</label>
              <select id="cfg-app-scale" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Compact" ${x.fontScale==="Compact"?"selected":""}>Compact (90%)</option>
                <option value="Normal" ${x.fontScale!=="Compact"&&x.fontScale!=="Large"?"selected":""}>Normal (100%)</option>
                <option value="Large" ${x.fontScale==="Large"?"selected":""}>Comfortable (110%)</option>
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
              <input type="checkbox" id="cfg-notif-invites" ${x.notifications?.invites!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Peer Edits & Revisions</span>
                <span class="text-[11px] text-slate-500">Real-time alerts when co-writers edit scenes</span>
              </div>
              <input type="checkbox" id="cfg-notif-edits" ${x.notifications?.edits!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Intelligence Diagnostics</span>
                <span class="text-[11px] text-slate-500">Notifications when vector analysis updates</span>
              </div>
              <input type="checkbox" id="cfg-notif-insights" ${x.notifications?.insights!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Draft Snapshot Milestones</span>
                <span class="text-[11px] text-slate-500">Alert on automated version backups</span>
              </div>
              <input type="checkbox" id="cfg-notif-milestones" ${x.notifications?.milestones!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
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
              <input type="checkbox" id="cfg-intel-deep" ${x.intelligence?.deepAnalysis!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Proactive Pacing Warnings</span>
                <span class="text-[11px] text-slate-500">Detect narrative drag in Act II</span>
              </div>
              <input type="checkbox" id="cfg-intel-pacing" ${x.intelligence?.pacingAlerts!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Dialogue Subtext Scoring</span>
                <span class="text-[11px] text-slate-500">Evaluate voice distinctiveness</span>
              </div>
              <input type="checkbox" id="cfg-intel-dialogue" ${x.intelligence?.dialogueScoring!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex flex-col gap-1 mt-1">
              <label class="text-[11px] font-semibold text-slate-600">Model Sensitivity</label>
              <select id="cfg-intel-sensitivity" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Low" ${x.intelligence?.sensitivity==="Low"?"selected":""}>Low (Critical flags only)</option>
                <option value="Balanced" ${x.intelligence?.sensitivity!=="Low"&&x.intelligence?.sensitivity!=="High"?"selected":""}>Balanced (Recommended)</option>
                <option value="High" ${x.intelligence?.sensitivity==="High"?"selected":""}>High (Detailed micro-diagnostics)</option>
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
              <input type="checkbox" id="cfg-priv-watermark" ${x.privacy?.watermark!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Local Storage AES Encryption</span>
                <span class="text-[11px] text-slate-500">Encrypt local drafts in browser sandbox</span>
              </div>
              <input type="checkbox" id="cfg-priv-encrypt" ${x.privacy?.encryption!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
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

    ${pe("profile")}
  `}function un(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=t||a.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=s||a.get("scriptId")||f.state.editorReturnScriptId||f.state.selectedScriptId||"chronicles-of-dust",l=n==="editor",i=l?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/workspace",c=document.getElementById("profile-back-to-editor-btn");c&&(c.onclick=E=>{E.preventDefault(),sessionStorage.removeItem("scriptora_from_editor"),e(i)});const x=document.getElementById("profile-bottom-return-btn");x&&(x.onclick=E=>{E.preventDefault(),sessionStorage.removeItem("scriptora_from_editor"),e(i)}),document.getElementById("stat-card-drafts")?.addEventListener("click",()=>{e("/workspace")}),document.getElementById("stat-card-coauthors")?.addEventListener("click",()=>{e(`/profile/collaborators${l?`?from=editor&scriptId=${o}`:""}`)}),document.getElementById("stat-card-health")?.addEventListener("click",()=>{e("/intelligence/dashboard")});const p=document.getElementById("settings-search-input");p&&(p.oninput=E=>{const B=E.target.value.toLowerCase().trim();let M=0;document.querySelectorAll("#settings-list .setting-item").forEach(J=>{const A=J.textContent.toLowerCase().includes(B);J.style.display=A?"flex":"none",A&&M++});const L=document.getElementById("no-settings-match");L&&(L.style.display=M===0?"block":"none")});function d(E){const B=`modal-setting-${E.replace("sheet-","")}`,M=document.getElementById(B);M&&M.classList.remove("hidden")}function r(){document.querySelectorAll(".settings-modal").forEach(E=>E.classList.add("hidden"))}document.querySelectorAll(".setting-item").forEach(E=>{E.onclick=()=>{const B=E.getAttribute("data-sheet");B&&d(B)}}),document.querySelectorAll(".close-setting-modal").forEach(E=>{E.onclick=r}),document.querySelectorAll(".settings-modal, #modal-edit-profile, #modal-security, #action-modal").forEach(E=>{E.onclick=B=>{B.target===E&&E.classList.add("hidden")}});function u(E){let B={};try{const L=localStorage.getItem("scriptora_settings");L&&(B=JSON.parse(L))}catch{}const M=E(B);return localStorage.setItem("scriptora_settings",JSON.stringify(M)),f.setState({settings:M}),ra(M).catch(()=>{}),M}const h=document.getElementById("btn-save-cfg-editor");h&&(h.onclick=()=>{const E=document.getElementById("cfg-editor-scenenums")?.checked??!0,B=document.getElementById("cfg-editor-autocap")?.checked??!0,M=document.getElementById("cfg-editor-contd")?.checked??!0,L=document.getElementById("cfg-editor-font")?.value||"Courier Prime 12pt",J=document.getElementById("cfg-editor-autosave")?.value||"Instant";u(A=>({...A,editor:{...A.editor||{},showSceneNumbers:E,autoCapitalize:B,continueDialogue:M,fontSize:L,autoSave:J}})),localStorage.setItem("scriptora_autosave",J==="Instant"?"true":"false");const ue=document.getElementById("desc-sheet-editor");ue&&(ue.textContent=`Numbers: ${E?"On":"Off"} · Auto-save: ${J}`),r(),y("Editor preferences saved")});let m=f.state.settings?.language||"English (US)";document.querySelectorAll(".btn-lang-choice").forEach(E=>{E.onclick=()=>{m=E.getAttribute("data-lang"),document.querySelectorAll(".btn-lang-choice").forEach(B=>{B.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-slate-200 bg-white text-slate-800 hover:bg-slate-50"}),E.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const g=document.getElementById("btn-save-cfg-language");g&&(g.onclick=()=>{const E=document.getElementById("cfg-lang-translit")?.checked??!1;u(M=>({...M,language:m,transliteration:E}));const B=document.getElementById("desc-sheet-language");B&&(B.textContent=`${m}${E?" · Transliteration On":""}`),r(),y(`Language set to ${m}`)});let b=f.state.settings?.appearance||"Light";document.querySelectorAll(".btn-theme-choice").forEach(E=>{E.onclick=()=>{b=E.getAttribute("data-theme"),document.querySelectorAll(".btn-theme-choice").forEach(B=>{B.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}),E.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const v=document.getElementById("btn-save-cfg-appearance");v&&(v.onclick=()=>{const E=document.getElementById("cfg-app-scale")?.value||"Normal";u(M=>({...M,appearance:b,fontScale:E})),b==="Dark"?(document.documentElement.classList.add("dark"),localStorage.setItem("scriptora_theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("scriptora_theme","light"));const B=document.getElementById("desc-sheet-appearance");B&&(B.textContent=`${b} · Scale: ${E}`),r(),y(`Appearance updated: ${b}`)});const w=document.getElementById("btn-save-cfg-notifications");w&&(w.onclick=()=>{const E=document.getElementById("cfg-notif-invites")?.checked??!0,B=document.getElementById("cfg-notif-edits")?.checked??!0,M=document.getElementById("cfg-notif-insights")?.checked??!0,L=document.getElementById("cfg-notif-milestones")?.checked??!0,J={invites:E,edits:B,insights:M,milestones:L};u(P=>({...P,notifications:J}));const ue=Object.values(J).filter(Boolean).length,A=document.getElementById("desc-sheet-notifications");A&&(A.textContent=`${ue} alerts active`),r(),y("Notification preferences updated")});const $=document.getElementById("btn-save-cfg-intelligence");$&&($.onclick=()=>{const E=document.getElementById("cfg-intel-deep")?.checked??!0,B=document.getElementById("cfg-intel-pacing")?.checked??!0,M=document.getElementById("cfg-intel-dialogue")?.checked??!0,L=document.getElementById("cfg-intel-sensitivity")?.value||"Balanced";u(ue=>({...ue,intelligence:{deepAnalysis:E,pacingAlerts:B,dialogueScoring:M,sensitivity:L}}));const J=document.getElementById("desc-sheet-intelligence");J&&(J.textContent=`${E?"Deep Arc Diagnostics":"Standard"} · ${L}`),r(),y("Intelligence engine calibrated")});const T=document.getElementById("btn-save-cfg-privacy");T&&(T.onclick=()=>{const E=document.getElementById("cfg-priv-watermark")?.checked??!0,B=document.getElementById("cfg-priv-encrypt")?.checked??!0;u(L=>({...L,privacy:{watermark:E,encryption:B}}));const M=document.getElementById("desc-sheet-privacy");M&&(M.textContent=`${E?"Watermark On":"Standard"} · Local AES Encrypted`),r(),y("Privacy governance updated")});const I=document.getElementById("btn-export-portfolio-data");I&&(I.onclick=()=>{const E={exportedAt:new Date().toISOString(),user:f.state.currentUser,scripts:f.state.scripts,screenplay:f.state.screenplay,settings:f.state.settings},B=new Blob([JSON.stringify(E,null,2)],{type:"application/json"}),M=URL.createObjectURL(B),L=document.createElement("a");L.href=M,L.download=`scriptora_portfolio_backup_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(L),L.click(),document.body.removeChild(L),URL.revokeObjectURL(M),y("Portfolio archive downloaded successfully")});const k=document.getElementById("btn-force-cloud-sync");k&&(k.onclick=()=>{k.disabled=!0,k.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span><span>Synchronizing...</span>',setTimeout(()=>{k.disabled=!1,k.innerHTML='<span class="material-symbols-outlined text-[16px]">sync</span><span>Force Cloud Re-sync</span>';const E=document.getElementById("sync-status-msg");E&&(E.textContent=`Synchronized at ${new Date().toLocaleTimeString()}`),y("All screenplay drafts synchronized with cloud")},700)});const _=document.getElementById("btn-clear-local-cache");_&&(_.onclick=()=>{sessionStorage.clear(),y("Temporary cache and diagnostic buffers cleared")});const X=document.getElementById("modal-edit-profile"),W=document.getElementById("trigger-modal-email"),re=document.getElementById("edit-avatar-btn"),Z=document.getElementById("avatar-container-btn"),C=document.getElementById("form-update-profile"),N=document.getElementById("local-photo-input"),Q=document.getElementById("btn-modal-upload-photo"),R=document.getElementById("btn-modal-remove-photo");function le(E){E?X?.classList.remove("hidden"):X?.classList.add("hidden")}W&&(W.onclick=()=>le(!0)),Z&&(Z.onclick=()=>le(!0)),re&&(re.onclick=E=>{E.stopPropagation(),N&&N.click()}),Q&&(Q.onclick=()=>{N&&N.click()}),document.querySelectorAll(".close-profile-modal").forEach(E=>E.onclick=()=>le(!1)),N&&(N.onchange=E=>{const B=E.target.files?.[0];if(!B)return;if(!B.type.startsWith("image/")){y("Please select a valid image file (PNG, JPG, WEBP)");return}const M=new FileReader;M.onload=L=>{const J=new Image;J.onload=()=>{const ue=document.createElement("canvas"),A=360;let P=J.width,O=J.height;P>O?P>A&&(O=Math.round(O*A/P),P=A):O>A&&(P=Math.round(P*A/O),O=A),ue.width=P,ue.height=O,ue.getContext("2d").drawImage(J,0,0,P,O);const q=ue.toDataURL("image/jpeg",.88),ce={...f.state.currentUser||user,avatarUrl:q};f.setState({currentUser:ce}),localStorage.setItem("scriptora_user",JSON.stringify(ce)),Ft({avatarUrl:q}).catch(()=>{});const te=document.getElementById("user-avatar-circle");te&&(te.innerHTML=`<img id="user-avatar-img" src="${q}" class="w-full h-full object-cover" alt="Profile" />`);const se=document.getElementById("modal-preview-avatar");se&&(se.innerHTML=`<img id="modal-preview-img" src="${q}" class="w-full h-full object-cover" alt="Preview" />`),R&&R.classList.remove("hidden");const ae=document.getElementById("header-profile-btn");ae&&(ae.innerHTML=`<img src="${q}" class="w-full h-full object-cover" alt="Profile" />`),y("Profile picture updated successfully!")},J.src=L.target.result},M.readAsDataURL(B),N.value=""}),R&&(R.onclick=()=>{const B={...f.state.currentUser||user,avatarUrl:null};f.setState({currentUser:B}),localStorage.setItem("scriptora_user",JSON.stringify(B)),Ft({avatarUrl:null}).catch(()=>{});const M=B.initials||"AK",L=document.getElementById("user-avatar-circle");L&&(L.innerHTML=`<span id="user-avatar-initials">${M}</span>`);const J=document.getElementById("modal-preview-avatar");J&&(J.innerHTML=`<span id="modal-preview-initials">${M}</span>`),R.classList.add("hidden");const ue=document.getElementById("header-profile-btn");ue&&(ue.innerHTML=`<span>${M}</span>`),y("Profile photo removed")});let ye=user.avatarColor||"bg-blue-600";document.querySelectorAll(".prof-avatar-color-btn").forEach(E=>{E.onclick=()=>{ye=E.getAttribute("data-color"),document.querySelectorAll(".prof-avatar-color-btn").forEach(B=>B.classList.remove("ring-2","ring-offset-2","ring-blue-600")),E.classList.add("ring-2","ring-offset-2","ring-blue-600")}}),C&&(C.onsubmit=async E=>{E.preventDefault();const B=document.getElementById("prof-input-name").value.trim(),M=document.getElementById("prof-input-headline").value.trim(),L=document.getElementById("prof-input-email").value.trim(),J=B.split(/\s+/),ue=(J[0]?.[0]||"A")+(J[1]?.[0]||""),A={...f.state.currentUser||user,name:B,displayName:B,headline:M,email:L,initials:ue.toUpperCase(),avatarColor:ye};await Ft(A),f.setState({currentUser:A});const P=document.getElementById("profile-display-name"),O=document.getElementById("profile-display-headline"),ee=document.getElementById("profile-display-email"),q=document.getElementById("user-avatar-circle");P&&(P.textContent=B),O&&(O.textContent=M),ee&&(ee.textContent=L),q&&!A.avatarUrl&&(q.innerHTML=`<span id="user-avatar-initials">${ue.toUpperCase()}</span>`,q.className=`w-20 h-20 rounded-full ${ye} text-white font-bold text-2xl flex items-center justify-center shadow-md overflow-hidden transition-transform active:scale-95 border-2 border-white ring-2 ring-slate-100`),le(!1),y("Profile and account updated successfully")});const z=document.getElementById("modal-security"),Se=document.getElementById("trigger-modal-password"),Be=document.getElementById("form-update-pw");function He(E){E?z?.classList.remove("hidden"):z?.classList.add("hidden")}Se&&(Se.onclick=()=>He(!0)),document.querySelectorAll(".close-security-modal").forEach(E=>E.onclick=()=>He(!1)),document.querySelectorAll(".btn-toggle-pw").forEach(E=>{E.onclick=()=>{const B=E.getAttribute("data-target"),M=document.getElementById(B),L=E.querySelector(".material-symbols-outlined");M&&(M.type==="password"?(M.type="text",L&&(L.textContent="visibility_off")):(M.type="password",L&&(L.textContent="visibility")))}}),Be&&(Be.onsubmit=E=>{E.preventDefault(),document.getElementById("pw-input-current")?.value;const B=document.getElementById("pw-input-new")?.value,M=document.getElementById("pw-input-confirm")?.value,L=document.getElementById("pw-error-text");if(!B||B.length<6){L&&(L.textContent="New password must be at least 6 characters long.",L.classList.remove("hidden"));return}if(B!==M){L&&(L.textContent="New password and confirmation do not match.",L.classList.remove("hidden"));return}L&&L.classList.add("hidden"),He(!1),y("Password updated securely"),Be.reset()});const nt=document.getElementById("action-modal"),ut=document.getElementById("action-modal-title"),xt=document.getElementById("action-modal-desc"),Ze=document.getElementById("action-modal-icon"),mt=document.getElementById("action-modal-icon-box"),Fe=document.getElementById("action-modal-confirm"),ft=document.getElementById("action-modal-cancel");let bt="signout";function kt(E){bt=E,E==="signout"?(ut.textContent="Sign Out",xt.textContent="Are you sure you want to end your active session on this device?",Ze.textContent="logout",mt.className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center",Fe.className="flex-1 h-10 px-4 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 cursor-pointer",Fe.textContent="Sign Out"):(ut.textContent="Delete Account",xt.textContent="This action will permanently delete your portfolio, scripts, and collaborator access. This cannot be undone.",Ze.textContent="warning",mt.className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center",Fe.className="flex-1 h-10 px-4 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer",Fe.textContent="Delete Forever"),nt?.classList.remove("hidden")}document.getElementById("btn-trigger-signout")?.addEventListener("click",()=>kt("signout")),document.getElementById("btn-trigger-delete-acc")?.addEventListener("click",()=>kt("delete")),ft&&(ft.onclick=()=>nt?.classList.add("hidden")),Fe&&(Fe.onclick=async()=>{nt?.classList.add("hidden"),bt==="signout"?(await Wt(),f.setState({currentUser:null}),y("Signed out of Scriptora"),e("/auth")):(await Wt(),f.setState({currentUser:null,scripts:[]}),y("Account deleted"),e("/auth"))})}function xn(e=null,t=null){const s=new URLSearchParams(window.location.search||""),a=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),n=t||s.get("scriptId")||f.state.editorReturnScriptId||f.state.selectedScriptId||"chronicles-of-dust",o=a==="editor",l=o?sessionStorage.getItem("scriptora_editor_return")||`/editor/${n}`:"/profile",i=o?"Back to Editor":"Back to Profile",c=f.state.scripts.find(x=>x.id===n)||f.state.scripts[0]||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",joinCode:"A7K9-XP42"};return`
    ${de("Profile","Collaborators")}

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
                <span class="font-heading text-sm font-bold text-slate-900 truncate" id="currentProjectTitle">${c.title} (${c.draft||"Draft 4.2"})</span>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span class="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium" id="collab-count-badge">Team Access</span>
              <span class="material-symbols-outlined text-slate-400 text-[20px]" id="projectChevron">expand_more</span>
            </div>
          </button>

          <!-- Project Dropdown Popover -->
          <div class="hidden absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-30 overflow-hidden py-1" id="projectDropdown">
            ${f.state.scripts.map(x=>`
              <button class="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors switch-script-opt" data-id="${x.id}">
                <div class="flex flex-col">
                  <span class="text-xs font-semibold text-slate-900">${x.title}</span>
                  <span class="text-[10px] text-slate-500">${x.format||"Feature"} · ${x.draft||"Draft 1.0"}</span>
                </div>
                ${x.id===c.id?'<span class="material-symbols-outlined text-blue-600 text-[16px]">check</span>':""}
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
                <span id="displayJoinCode" class="font-mono font-bold text-base text-blue-600 tracking-widest mt-0.5">${c.joinCode||"A7K9-XP42"}</span>
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
              Anyone with this join code can request Editor or Viewer access to "${c.title}".
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
              <span>Return to Editor (${c.title||"Screenplay"})</span>
            </a>
          </div>
        `:""}

      </div>
    </main>

    ${pe("profile")}
  `}function mn(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=t||a.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=s||a.get("scriptId")||f.state.editorReturnScriptId||f.state.selectedScriptId||"chronicles-of-dust",l=n==="editor",i=l?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/profile",c=document.getElementById("collab-back-btn");c&&(c.onclick=C=>{C.preventDefault(),l&&sessionStorage.removeItem("scriptora_from_editor"),e(i)});const x=document.getElementById("collab-bottom-return-btn");x&&(x.onclick=C=>{C.preventDefault(),l&&sessionStorage.removeItem("scriptora_from_editor"),e(i)});let p="A7K9-XP42";async function d(){const C=await ea(o),N=document.getElementById("collaborators-list");if(N){if(C.length===0){N.innerHTML='<div class="p-4 text-center text-xs text-slate-400">No external collaborators yet. Share your join code to invite teammates.</div>';return}N.innerHTML=C.map(Q=>`
      <div class="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
        <div class="flex items-center gap-3 min-w-0 pr-2">
          <div class="w-9 h-9 rounded-full ${Q.avatarBg||"bg-blue-100 text-blue-700"} flex items-center justify-center font-bold text-xs shrink-0">
            ${Q.initials}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-slate-900 truncate">${Q.name}</span>
            <span class="text-[11px] text-slate-500 truncate">${Q.email}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">${Q.role}</span>
          <button class="remove-collab-btn text-slate-400 hover:text-red-600 p-1" data-id="${Q.id}" title="Remove access">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".remove-collab-btn").forEach(Q=>{Q.onclick=async()=>{const R=Q.getAttribute("data-id");confirm("Remove collaborator access for this user?")&&(await sa(o,R),y("Collaborator access removed"),d())}})}}d();const r=document.getElementById("projectSelectBtn"),u=document.getElementById("projectDropdown");r&&(r.onclick=()=>u?.classList.toggle("hidden")),document.querySelectorAll(".switch-script-opt").forEach(C=>{C.onclick=()=>{const N=C.getAttribute("data-id");f.selectScript(N),u?.classList.add("hidden"),e(`/profile/collaborators${l?`?from=editor&scriptId=${N}`:""}`)}});const h=document.getElementById("openInviteBtn"),m=document.getElementById("closeInviteBtn"),g=document.getElementById("inviteCard"),b=document.getElementById("sendInviteBtn");h&&(h.onclick=()=>g?.classList.remove("hidden")),m&&(m.onclick=()=>g?.classList.add("hidden")),b&&(b.onclick=async()=>{const C=document.getElementById("inviteEmailInput")?.value.trim(),N=document.querySelector('input[name="inviteRole"]:checked')?.value||"editor";C&&(await ta(o,{email:C,role:N}),y(`Invited ${C} as ${N}`),g?.classList.add("hidden"),d())});const v=document.getElementById("tabGenCodeBtn"),w=document.getElementById("tabEnterCodeBtn"),$=document.getElementById("paneGenerateCode"),T=document.getElementById("paneEnterCode");v&&(v.onclick=()=>{v.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",w.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",$?.classList.remove("hidden"),T?.classList.add("hidden")}),w&&(w.onclick=()=>{w.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",v.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",T?.classList.remove("hidden"),$?.classList.add("hidden")});const I=document.getElementById("copyJoinCodeBtn"),k=document.getElementById("copyJoinCodeLabel");I&&(I.onclick=()=>{const C=document.getElementById("displayJoinCode")?.textContent||p;navigator.clipboard?.writeText(C),k.textContent="Copied!",setTimeout(()=>{k.textContent="Copy"},1800),y(`Copied code: ${C}`)});const _=document.getElementById("regenJoinCodeBtn");_&&(_.onclick=async()=>{const C=await aa(o);p=C;const N=document.getElementById("displayJoinCode");N&&(N.textContent=C),y(`Generated new join code: ${C}`)});const X=document.getElementById("verifyCodeBtn"),W=document.getElementById("joinCodeInput"),re=document.getElementById("joinCodeResultCard"),Z=document.getElementById("confirmJoinScriptBtn");W&&(W.oninput=C=>{let N=C.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"");N.length>4&&(N=N.slice(0,4)+"-"+N.slice(4,8)),C.target.value=N}),X&&W&&(X.onclick=async()=>{const C=W.value.trim();if(!C)return;X.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>';const N=await na(C);X.innerHTML="<span>Verify</span>",N.valid?(re?.classList.remove("hidden"),document.getElementById("verifiedScriptTitle").textContent=N.script.title,document.getElementById("verifiedScriptFormat").textContent=`${N.script.format} · ${N.script.pages} pages`,y("Valid join code")):(re?.classList.add("hidden"),y("Invalid or expired join code","error"))}),Z&&W&&(Z.onclick=async()=>{const C=W.value.trim();await oa(C),y("Successfully joined screenplay workspace!"),e("/workspace")})}function fn(){return f.state.currentUser?.initials,`
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
  `}function bn(e){const t=document.getElementById("btn-back-notif");t&&(t.onclick=()=>{const d=f.getPreviousRoute("/workspace");e(d)});let s="all",a="normal",n=[];async function o(){const d=document.getElementById("notif-feed-container");if(!d)return;if(a==="loading"){d.innerHTML=`
        <div class="space-y-3 animate-pulse">
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
        </div>
      `;return}if(a==="error"){d.innerHTML=`
        <div class="p-6 bg-white border border-red-200 rounded-2xl flex flex-col items-center text-center gap-2">
          <span class="material-symbols-outlined text-3xl text-red-500">wifi_off</span>
          <h3 class="font-bold text-sm text-slate-900">Sync Connection Lost</h3>
          <p class="text-xs text-slate-500 max-w-xs">Unable to refresh notification stream. Please check network connection.</p>
          <button id="btn-retry-sync" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-xs hover:bg-blue-700">
            Retry Connection
          </button>
        </div>
      `,document.getElementById("btn-retry-sync")?.addEventListener("click",()=>{a="normal",o()});return}if(n=(await ws()).notifications||[],a==="empty"||s==="unread"&&n.filter(v=>v.unread).length===0){d.innerHTML=`
        <div class="p-8 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center text-center gap-2">
          <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <h3 class="font-bold text-sm text-slate-900">You’re all caught up!</h3>
          <p class="text-xs text-slate-500 max-w-xs">No pending notifications or requests requiring your review.</p>
        </div>
      `;return}const u=n.filter(v=>v.unread).length;document.getElementById("badge-all-count").textContent=n.length,document.getElementById("badge-unread-count").textContent=u,f.setState({unreadNotifications:u});let h=n;s==="unread"&&(h=h.filter(v=>v.unread));const m=h.filter(v=>v.group==="today"),g=h.filter(v=>v.group!=="today");function b(v,w){return w.length===0?"":`
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-xs font-bold text-slate-400 tracking-wider uppercase font-heading">${v}</h2>
          </div>
          <div class="flex flex-col gap-2">
            ${w.map($=>`
              <div class="notif-row relative flex items-start gap-3 p-3.5 rounded-xl bg-white border ${$.unread?"border-l-4 border-l-blue-600 border-slate-200/80 shadow-xs":"border-slate-200/60 opacity-80"} hover:shadow-sm transition-all cursor-pointer" data-id="${$.id}" data-route="${$.actionRoute}">
                <div class="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                  ${$.sender.startsWith("icon:")?`<span class="material-symbols-outlined text-[18px] text-blue-600">${$.sender.replace("icon:","")}</span>`:$.sender}
                </div>
                <div class="flex flex-col flex-1 min-w-0">
                  <div class="flex items-baseline justify-between gap-2">
                    <h3 class="text-xs font-bold text-slate-900 truncate">${$.title}</h3>
                    <span class="text-[10px] text-slate-400 shrink-0">${$.time}</span>
                  </div>
                  <p class="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">${$.body}</p>
                  <div class="mt-2 flex items-center gap-1.5 flex-wrap">
                    ${($.tags||[]).map(T=>`<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">${T}</span>`).join("")}
                    <span class="text-blue-600 text-[11px] font-semibold ml-auto">${$.actionLabel||"View →"}</span>
                  </div>
                </div>
                ${$.unread?'<div class="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1"></div>':""}
              </div>
            `).join("")}
          </div>
        </div>
      `}d.innerHTML=b("Today",m)+b("Earlier",g),document.querySelectorAll(".notif-row").forEach(v=>{v.onclick=async()=>{const w=parseInt(v.getAttribute("data-id")),$=v.getAttribute("data-route");await la(w),await f.refreshNotifications(),$?e($):o()}})}o();const l=document.getElementById("filter-all-btn"),i=document.getElementById("filter-unread-btn");l&&(l.onclick=()=>{s="all",l.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",i.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",o()}),i&&(i.onclick=()=>{s="unread",i.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",l.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",o()});const c=document.getElementById("btn-mark-all-read");c&&(c.onclick=async()=>{await ia(),await f.refreshNotifications(),y("All notifications marked as read"),o()});const x=document.getElementById("btn-toggle-sim"),p=document.getElementById("sim-menu-dropdown");x&&(x.onclick=()=>p?.classList.toggle("hidden")),document.querySelectorAll(".sim-opt").forEach(d=>{d.onclick=()=>{a=d.getAttribute("data-state"),p?.classList.add("hidden"),o(),y(`Simulating ${a} state`)}})}function gn(e=null,t=null){const s=new URLSearchParams(window.location.search||""),a=e||s.get("from"),n=t||s.get("scriptId")||f.state.selectedScriptId||"chronicles-of-dust",o=a==="editor",l=o?sessionStorage.getItem("scriptora_prod_return")||`/editor/${n}`:"/workspace",i=f.state.scripts?.find(d=>d.id===n)||f.state.scripts?.[0]||{id:"chronicles-of-dust",draft:"Draft 4.2"},x=(localStorage.getItem("scriptora_prod_mode")||"simple")==="advanced",p=localStorage.getItem("scriptora_prod_role")||"Owner";return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      <!-- Standard App Header -->
      ${de("Pre-Production","Production Workspace & Tools")}

      <!-- Main Workspace Container -->
      <main class="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3.5 fade-in">
        
        <!-- Clean Unified Header Row (Back + Title + Mode Switch) -->
        <div class="flex items-center justify-between gap-2 py-1.5 border-b border-slate-200/70">
          <div class="flex items-center gap-2 min-w-0">
            <a href="${l}" class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors text-xs font-medium shrink-0" id="prod-back-nav" title="${o?"Back to Screenplay Editor":"Back to Workspace"}">
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
              <span class="truncate">${o?"Editor":"Workspace"}</span>
            </a>
            <h1 class="font-heading font-bold text-sm text-slate-900 truncate">Production Studio</h1>
          </div>

          <!-- Mode Toggle: Simple vs Advanced (Preserves State) -->
          <div class="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80 shadow-2xs shrink-0">
            <button id="toggle-mode-simple" class="px-2.5 py-0.5 text-xs font-medium rounded-lg transition-all ${x?"text-slate-600 hover:text-slate-900":"bg-white text-blue-700 shadow-2xs font-semibold"}">
              Simple
            </button>
            <button id="toggle-mode-advanced" class="px-2.5 py-0.5 text-xs font-medium rounded-lg transition-all ${x?"bg-white text-blue-700 shadow-2xs font-semibold":"text-slate-600 hover:text-slate-900"}">
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
                  <option value="chronicles-of-dust" ${i.id==="chronicles-of-dust"?"selected":""}>Chronicles of Dust (Feature)</option>
                  <option value="the-neon-horizon" ${i.id==="the-neon-horizon"?"selected":""}>The Neon Horizon (Pilot)</option>
                </select>
              </div>
              <div class="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-500">
                <span class="flex items-center gap-1 text-emerald-700 font-medium" id="prod-pinned-version-badge">
                  <span class="material-symbols-outlined text-[13px]">lock</span>
                  <span id="pinned-version-label">${i.draft||"Draft 4.2"} (Pinned)</span>
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
              <option value="Owner" ${p==="Owner"?"selected":""}>Owner</option>
              <option value="Director" ${p==="Director"?"selected":""}>Director</option>
              <option value="Assistant Director" ${p==="Assistant Director"?"selected":""}>Assistant Director</option>
              <option value="Production" ${p==="Production"?"selected":""}>Production</option>
              <option value="Department Member" ${p==="Department Member"?"selected":""}>Department Lead</option>
              <option value="Viewer" ${p==="Viewer"?"selected":""}>Viewer</option>
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

        <!-- 2. Essential Production Tools (Prominent Access, Clean Title without Competing Badge) -->
        <section class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <h2 class="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[18px] text-slate-600">tune</span>
              <span>Essential Production Tools</span>
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            
            <!-- Tool 1: Call Sheets -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="call-sheets">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[20px]">assignment</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">2 Active</span>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Call Sheets</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Daily production call times, scene lists, hospital info, crew arrival, and weather.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Open Call Sheets</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 2: Dialogue Sheets & Actor Sides -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="dialogue-sheets">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[20px]">record_voice_over</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">Scene 18 Ready</span>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">Dialogue Sheets & Sides</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Actor-specific sides extracted by scene, character speech cues, and rehearsal notes.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-indigo-600">
                <span>View Actor Sides</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 3: Shooting Schedule -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="shooting-schedule">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[20px]">calendar_view_week</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">14 Days</span>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">Shooting Schedule</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Master stripboard scheduling, day/night scene order, company moves, and wrap dates.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-amber-600">
                <span>Manage Stripboard</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 4: Script Breakdown -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="script-breakdown">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[20px]">dataset</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold">78 Items</span>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-purple-600 transition-colors">Script Breakdown</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Cross-department extraction: Cast, Props, Vehicles, Wardrobe, Stunts, and Practical FX.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-purple-600">
                <span>Inspect Elements</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

          </div>
        </section>

        <!-- 3. Discoverable Secondary Production Tools (On Same Screen) -->
        <section class="flex flex-col gap-2.5">
          <div class="flex items-center justify-between">
            <h2 class="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[18px] text-slate-600">dashboard_customize</span>
              <span>Production Modules & Creative Planning</span>
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            
            <!-- Secondary 1: Storyboard Studio -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="storyboard-studio">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[20px]">art_track</span>
                </div>
                <div class="min-w-0">
                  <h3 class="font-heading font-bold text-sm text-slate-900">Storyboard Studio</h3>
                  <p class="text-[11px] text-slate-500">Visual shot composition & AI concept frames</p>
                </div>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-rose-600">
                <span>Shot Board</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>

            <!-- Secondary 2: Scene Hub & Practical Logistics -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="scene-hub">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[20px]">hub</span>
                </div>
                <div class="min-w-0">
                  <h3 class="font-heading font-bold text-sm text-slate-900">Scene Hub</h3>
                  <p class="text-[11px] text-slate-500">Scene-by-scene logistics & complexity index</p>
                </div>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-teal-600">
                <span>View 18 Scenes</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>

            <!-- Secondary 3: Resource Directory -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="resource-directory">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[20px]">contact_phone</span>
                </div>
                <div class="min-w-0">
                  <h3 class="font-heading font-bold text-sm text-slate-900">Resource Directory</h3>
                  <p class="text-[11px] text-slate-500">Cast, crew, vendors & contact permissions</p>
                </div>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-sky-600">
                <span>Directory</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>

            <!-- Secondary 4: Change Proposals & Approvals -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="change-proposals">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[20px]">rule</span>
                </div>
                <div class="min-w-0">
                  <h3 class="font-heading font-bold text-sm text-slate-900">Change Proposals</h3>
                  <p class="text-[11px] text-slate-500">Collaborator proposal review & approvals</p>
                </div>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-amber-600">
                <span id="pending-proposals-count">2 Pending Review</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>

            <!-- Secondary 5: Production Documents Workspace -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="production-documents">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[20px]">description</span>
                </div>
                <div class="min-w-0">
                  <h3 class="font-heading font-bold text-sm text-slate-900">Production Documents</h3>
                  <p class="text-[11px] text-slate-500">Categorized catalog, exports & sharing links</p>
                </div>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Document Catalog</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>

            <!-- Secondary 6: Pre-Flight Readiness & Validation -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="production-readiness">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[20px]">fact_check</span>
                </div>
                <div class="min-w-0">
                  <h3 class="font-heading font-bold text-sm text-slate-900">Readiness & Validation</h3>
                  <p class="text-[11px] text-slate-500">Actionable pre-shoot blocker checks</p>
                </div>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-emerald-600">
                <span>Pre-Flight Gates</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>

          </div>
        </section>

        <!-- 4. Advanced Mode Extended Panels (Shown when Advanced Mode is Active) -->
        <div id="advanced-panels" class="${x?"":"hidden"} flex flex-col gap-4">
          
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
      ${pe("production")}

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
  `}async function hn(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=s||a.get("scriptId")||f.state.selectedScriptId||"chronicles-of-dust",o=await Rt(n),l=await Xe(n),i=await Bt(n),c=f.state.scripts?.find(I=>I.id===n);if(c&&c.draft&&c.draft!==o.pinnedSourceVersion){const I=document.getElementById("source-version-alert"),k=document.getElementById("alert-pinned-ver");I&&I.classList.remove("hidden"),k&&(k.textContent=o.pinnedSourceVersion)}Nt(l,o.userRole,n),Qt(i);const x=document.getElementById("toggle-mode-simple"),p=document.getElementById("toggle-mode-advanced"),d=document.getElementById("advanced-panels");function r(I){localStorage.setItem("scriptora_prod_mode",I),xs(n,{mode:I}),I==="advanced"?(d?.classList.remove("hidden"),p?.classList.add("bg-white","text-blue-700","shadow-2xs","font-semibold"),p?.classList.remove("text-slate-600"),x?.classList.remove("bg-white","text-blue-700","shadow-2xs","font-semibold"),x?.classList.add("text-slate-600")):(d?.classList.add("hidden"),x?.classList.add("bg-white","text-blue-700","shadow-2xs","font-semibold"),x?.classList.remove("text-slate-600"),p?.classList.remove("bg-white","text-blue-700","shadow-2xs","font-semibold"),p?.classList.add("text-slate-600")),y(`Switched to ${I==="advanced"?"Advanced":"Simple"} Mode`)}x&&(x.onclick=()=>r("simple")),p&&(p.onclick=()=>r("advanced"));const u=document.getElementById("prod-role-select");u&&(u.onchange=I=>{const k=I.target.value;localStorage.setItem("scriptora_prod_role",k),xs(n,{userRole:k}),y(`Viewing as ${k}`),Nt(l,k,n)});const h=document.getElementById("prod-script-select");h&&(h.onchange=I=>{const k=I.target.value;f.setState({selectedScriptId:k}),e(`/production?scriptId=${k}`)});const m=document.getElementById("btn-repin-source");m&&(m.onclick=async()=>{const I=c?.draft||"Draft 4.3";await da(n,I),document.getElementById("source-version-alert")?.classList.add("hidden");const k=document.getElementById("pinned-version-label");k&&(k.textContent=`${I} (Pinned Source)`),y(`Pinned source updated to ${I}`);const _=await Bt(n);Qt(_)});const g=document.getElementById("btn-dismiss-staleness");g&&(g.onclick=()=>{document.getElementById("source-version-alert")?.classList.add("hidden"),y("Retained Draft 4.2 pinned baseline")}),document.querySelectorAll(".tool-card").forEach(I=>{I.onclick=()=>{const k=I.getAttribute("data-tool"),_={"call-sheets":`/production/call-sheets?scriptId=${n}`,"dialogue-sheets":`/production/dialogue-sides?scriptId=${n}`,"shooting-schedule":`/production/schedule?scriptId=${n}`,"script-breakdown":`/production/breakdown?scriptId=${n}`,"storyboard-studio":`/production/storyboard?scriptId=${n}`,"scene-hub":`/production/scenes?scriptId=${n}`,"resource-directory":`/production/directory?scriptId=${n}`,"change-proposals":`/production/changes?scriptId=${n}`,"production-documents":`/production/documents?scriptId=${n}`,"production-history":`/production/history?scriptId=${n}`,"production-readiness":`/production/readiness?scriptId=${n}`};_[k]?e(_[k]):vn(k,n,o)}});const b=document.getElementById("modal-tool-close"),v=document.getElementById("modal-tool-done"),w=document.getElementById("prod-tool-modal"),$=()=>{w&&w.classList.add("hidden")};b&&(b.onclick=$),v&&(v.onclick=$),w&&(w.onclick=I=>{I.target===w&&$()});const T=document.getElementById("btn-create-proposal-trigger");T&&(T.onclick=async()=>{const I=prompt("Enter proposal title (e.g. Add Rain FX equipment to Scene 18):");if(!I)return;const k=prompt("Enter proposal details / rationale:")||"";await Es(n,{title:I,description:k,category:"Logistics",submittedBy:f.state.currentUser?.name||"Arun Kumar",submitterRole:localStorage.getItem("scriptora_prod_role")||"Owner",impact:"Modifies production schedule & logistics budget"}),y("Proposal submitted for review");const _=await Xe(n);Nt(_,o.userRole,n)})}function Nt(e,t,s){const a=document.getElementById("proposals-list");if(!a)return;if(!e||e.length===0){a.innerHTML='<div class="p-4 text-center text-slate-400 text-xs">No pending change proposals.</div>';return}const n=t==="Owner";a.innerHTML=e.map(o=>{const l=o.status==="Awaiting review",i=o.status==="Accepted",c=o.status==="Rejected",x=o.status==="Conflict",p=i?'<span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">Accepted</span>':c?'<span class="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold">Rejected</span>':x?'<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">Conflict</span>':'<span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">Awaiting Review</span>';return`
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
    `}).join(""),a.querySelectorAll(".btn-proposal-action").forEach(o=>{o.onclick=async l=>{l.stopPropagation();const i=o.getAttribute("data-id"),c=o.getAttribute("data-action"),x=prompt(`Enter ${c} review notes (optional):`)||"";await Pt(s,i,c,x),y(`Proposal ${c}ed`);const p=await Xe(s);Nt(p,t,s);const d=await Bt(s);Qt(d)}})}function Qt(e){const t=document.getElementById("audit-trail-list");if(t){if(!e||e.length===0){t.innerHTML='<div class="p-3 text-center text-slate-400 text-xs">No audit entries recorded.</div>';return}t.innerHTML=e.slice(0,5).map(s=>`
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
  `).join("")}}async function vn(e,t,s,a){const n=document.getElementById("prod-tool-modal"),o=document.getElementById("modal-tool-title"),l=document.getElementById("modal-tool-subtitle"),i=document.getElementById("modal-tool-body"),c=document.getElementById("modal-tool-icon");if(!(!n||!o||!i))if(n.classList.remove("hidden"),e==="call-sheets"){o.textContent="Call Sheets",l.textContent=`${s.screenplayTitle} • Pinned ${s.pinnedSourceVersion}`,c&&(c.textContent="assignment");const p=(await Is(t)).filter(r=>r.type==="Call Sheet");i.innerHTML=`
      <div class="flex items-center justify-between pb-2 border-b border-slate-100">
        <span class="font-bold text-slate-800">Published & Draft Call Sheets</span>
        <button id="btn-create-call-sheet" class="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-semibold text-[11px] hover:bg-blue-700 transition-colors flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">add</span>
          <span>New Call Sheet</span>
        </button>
      </div>
      <div class="flex flex-col gap-2">
        ${p.map(r=>`
          <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <span class="font-heading font-bold text-xs text-slate-900">${r.title}</span>
              <span class="px-2 py-0.5 rounded-full ${r.status==="Confirmed"?"bg-emerald-50 text-emerald-700":"bg-slate-200 text-slate-700"} text-[10px] font-bold">${r.status} (${r.version})</span>
            </div>
            <div class="text-[11px] text-slate-500">
              <span>${r.shootDay} • Call Time: ${r.callTime} • ${r.location}</span>
            </div>
            <div class="flex items-center justify-between pt-1 border-t border-slate-200/50 text-[10px] text-blue-600 font-semibold">
              <span>Scenes: ${(r.scenes||[]).join(", ")}</span>
              <button class="hover:underline" onclick="alert('Viewing Call Sheet ${r.version} formatted document snapshot.');">View PDF Snapshot</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;const d=document.getElementById("btn-create-call-sheet");d&&(d.onclick=()=>{y("Call Sheet Builder will be fully active in Prompt 2. Foundation verified!")})}else if(e==="dialogue-sheets")o.textContent="Dialogue Sheets & Actor Sides",l.textContent=`Scene-linked actor cues from ${s.pinnedSourceVersion}`,c&&(c.textContent="record_voice_over"),i.innerHTML=`
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
    `;else if(e==="shooting-schedule")o.textContent="Shooting Schedule Stripboard",l.textContent=`14 Shoot Days • ${s.pinnedSourceVersion}`,c&&(c.textContent="calendar_view_week"),i.innerHTML=`
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
    `;else if(e==="script-breakdown"){o.textContent="Script Breakdown Sheet",l.textContent="78 Tagged Practical Elements Across 18 Scenes",c&&(c.textContent="dataset");const x=await zt(t);i.innerHTML=`
      <div class="flex items-center gap-2 overflow-x-auto pb-1 text-[11px]">
        <span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">All (78)</span>
        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Cast (18)</span>
        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Props (32)</span>
        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Locations (24)</span>
        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Vehicles (4)</span>
      </div>
      <div class="flex flex-col gap-2 mt-1">
        ${x.map(p=>`
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
    `}else e==="storyboard-studio"?(o.textContent="Storyboard Studio (Foundation)",l.textContent="Prompt 3 Integration Entry Point",c&&(c.textContent="art_track"),i.innerHTML=`
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
    `):e==="resource-directory"?(o.textContent="Resource Directory",l.textContent="Cast, Crew & Vendors with Permission Controls",c&&(c.textContent="contact_phone"),i.innerHTML=`
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
    `)}function yn(){const e=f.state.selectedScriptId||"chronicles-of-dust",t=f.state.scripts?.find(s=>s.id===e)||{title:"Chronicles of Dust",draft:"Draft 4.2"};return`
    <div class="fixed inset-0 bg-surface flex flex-col font-body text-slate-800 select-none overflow-hidden">
      <!-- Standard Header (Fixed Top) -->
      ${de("AI Chat","Universal Assistant")}

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
      ${pe("chat")}
    </div>
  `}function wn(e){const t=document.getElementById("chat-input"),s=document.getElementById("chat-send-btn"),a=document.getElementById("chat-messages-container"),n=document.getElementById("btn-clear-chat"),o=document.querySelectorAll(".chat-chip"),l=f.state.selectedScriptId||"chronicles-of-dust",i=localStorage.getItem("scriptora_chat_history");if(i)try{JSON.parse(i).forEach(d=>c(d.role,d.text,!1))}catch{}t&&t.addEventListener("input",()=>{t.style.height="auto",t.style.height=Math.min(t.scrollHeight,96)+"px"});function c(p,d,r=!0){if(!a)return;const u=p==="user",h=document.createElement("div");if(h.className=`flex items-start gap-2.5 max-w-[88%] ${u?"self-end flex-row-reverse":""}`,h.innerHTML=`
      <div class="w-7 h-7 rounded-lg ${u?"bg-slate-800":"bg-blue-600"} text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
        <span class="material-symbols-outlined text-[15px]">${u?"person":"chat_bubble_outline"}</span>
      </div>
      <div class="${u?"bg-blue-600 text-white rounded-2xl rounded-tr-xs":"bg-white text-slate-700 border border-slate-200/90 rounded-2xl rounded-tl-xs"} p-3.5 shadow-2xs flex flex-col gap-1 text-xs leading-relaxed">
        <div class="flex items-center justify-between gap-4 font-semibold ${u?"text-blue-100":"text-slate-900"} text-[11px]">
          <span>${u?"You":"Scriptora Universal AI"}</span>
          <span class="${u?"text-blue-200":"text-slate-400"} font-normal text-[10px]">Now</span>
        </div>
        <div class="whitespace-pre-wrap">${d}</div>
      </div>
    `,a.appendChild(h),a.scrollTop=a.scrollHeight,r)try{const m=JSON.parse(localStorage.getItem("scriptora_chat_history")||"[]");m.push({role:p,text:d,timestamp:new Date().toISOString()}),localStorage.setItem("scriptora_chat_history",JSON.stringify(m.slice(-30)))}catch{}}async function x(){if(!t)return;const p=t.value.trim();if(!p)return;c("user",p,!0),t.value="",t.style.height="auto";const d=document.createElement("div");d.className="flex items-center gap-2 text-xs text-slate-400 py-1 pl-9 italic",d.innerHTML=`
      <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
      <span>Reviewing screenplay context & production model...</span>
    `,a.appendChild(d),a.scrollTop=a.scrollHeight;try{const r=await ss(p,l);d.remove();let u=r;p.toLowerCase().includes("call sheet")?u=`📋 **Call Sheet Preparation (Draft 4.2)**
For Day 1 (Scenes 1 & 2 at Gate 4 Exterior):
• General Call: 06:30 AM (Sunrise lighting window)
• Key Talent: Kevin (Ready by 07:15 AM)
• Picture Vehicle: Solar Patrol Rover standby at staging area
• Nearest Emergency Medical Facility: Ridgecrest Regional Hospital (22 mins)`:p.toLowerCase().includes("practical")||p.toLowerCase().includes("element")?u=`🎬 **Practical Elements Breakdown (Scene 18)**
• Location: Pumping Station Chamber B (Interior / Echo Dampened)
• Special Prop: Hydraulic Bypass Valve Kit (LED pressure indicator)
• SFX Note: Pressurized vapor release standby
• Cast Involved: Kevin, Meera`:(p.toLowerCase().includes("storyboard")||p.toLowerCase().includes("camera"))&&(u=`🎨 **Visual Storyboard Concept (Lakebed Standoff)**
• Shot 1: Ultra-wide 2.39:1 anamorphic establishing shot across cracked earth.
• Shot 2: Low-angle tracking shot on Kevin as dust storm gathers.
• Shot 3: Dutch angle close-up on the pressure gauge as manifold fails.
*(Detailed shot canvas will be available in Storyboard Studio Prompt 3)*`),c("assistant",u,!0)}catch{d.remove(),c("assistant","I analyzed your request against the active screenplay context. Pacing and scene logistics align with Draft 4.2 standards.",!0)}}s&&(s.onclick=x),t&&(t.onkeydown=p=>{p.key==="Enter"&&!p.shiftKey&&(p.preventDefault(),x())}),o.forEach(p=>{p.onclick=()=>{const d=p.getAttribute("data-prompt");t&&(t.value=d,x())}}),n&&(n.onclick=()=>{localStorage.removeItem("scriptora_chat_history"),a.innerHTML=`
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
      `})}function Me(e,t="tune",s="/production",a=""){const n=localStorage.getItem("scriptora_prod_role")||"Owner";return localStorage.getItem("scriptora_prod_mode"),`
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 py-2 px-1 border-b border-slate-200/80 mb-3">
      <div class="flex items-center gap-2 min-w-0">
        <a href="${s}" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors text-xs font-semibold shrink-0" title="Back to Production Studio">
          <span class="material-symbols-outlined text-[17px]">arrow_back</span>
          <span>Studio</span>
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
          <span class="text-slate-800">${n}</span>
        </div>
        ${a}
      </div>
    </div>
  `}function Sn(e=null,t=null){const s=new URLSearchParams(window.location.search||"");return t||s.get("scriptId")||f.state.selectedScriptId,`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${de("Pre-Production","Script Breakdown Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Me("Script Breakdown","dataset","/production",`
          <button id="btn-add-element" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Add Element</span>
          </button>
        `)}

        <!-- Summary KPI Row -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5" id="breakdown-kpis">
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Elements</span>
            <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-total">--</div>
            <span class="text-[11px] text-slate-500">Across 18 Scenes</span>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Confirmed</span>
            <div class="font-heading font-bold text-lg text-emerald-600 mt-0.5" id="kpi-confirmed">--</div>
            <span class="text-[11px] text-slate-500">Human approved</span>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Needs Review</span>
            <div class="font-heading font-bold text-lg text-amber-600 mt-0.5" id="kpi-review">--</div>
            <span class="text-[11px] text-slate-500">AI inferences pending</span>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Rejected</span>
            <div class="font-heading font-bold text-lg text-slate-700 mt-0.5" id="kpi-rejected">--</div>
            <span class="text-[11px] text-slate-500">Excluded from shoot</span>
          </div>
        </div>

        <!-- Controls Bar: Category Filter + Scene Filter + Search -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          <!-- Categories Scroll -->
          <div class="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-xs shrink-0" id="cat-filters">
            <button class="cat-btn px-2.5 py-1 rounded-xl font-semibold bg-blue-600 text-white shadow-2xs" data-cat="all">All (78)</button>
            <button class="cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Cast">Cast</button>
            <button class="cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Props">Props</button>
            <button class="cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Practical FX">Practical FX</button>
            <button class="cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Vehicles">Vehicles</button>
            <button class="cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Stunts">Stunts</button>
            <button class="cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Locations">Locations</button>
          </div>

          <div class="flex items-center gap-2">
            <!-- Scene Picker -->
            <select id="breakdown-scene-select" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-800 focus:outline-none cursor-pointer">
              <option value="all">All Scenes (18)</option>
              <option value="scene-1">Scene 1 — Gate 4 Day</option>
              <option value="scene-2">Scene 2 — Customs Shed</option>
              <option value="scene-3">Scene 3 — Conduit Dusk</option>
              <option value="scene-4">Scene 4 — Perimeter Fence</option>
              <option value="scene-7">Scene 7 — Syndicate Control</option>
              <option value="scene-16">Scene 16 — Spillway Catwalk</option>
              <option value="scene-18">Scene 18 — Chamber B Night</option>
            </select>

            <!-- Search Field -->
            <div class="relative flex-1 sm:w-48">
              <span class="material-symbols-outlined text-[16px] text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">search</span>
              <input type="text" id="breakdown-search" placeholder="Search elements..." class="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-2.5 py-1 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500">
            </div>
          </div>
        </div>

        <!-- Elements List Grid -->
        <div id="breakdown-list" class="flex flex-col gap-2.5">
          <div class="p-8 text-center text-slate-400 text-xs">Loading breakdown elements...</div>
        </div>

      </main>

      ${pe("production")}

      <!-- Add Element Modal -->
      <div id="modal-add-element" class="hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 class="font-heading font-bold text-sm text-slate-900">Add Production Element</h3>
            <button id="close-add-modal" class="text-slate-400 hover:text-slate-700">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <form id="form-add-element" class="p-5 flex flex-col gap-3 text-xs">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Element Name</label>
              <input type="text" id="elem-name" required placeholder="e.g. Hydraulic Bypass Valve" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Category</label>
                <select id="elem-cat" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
                  <option value="Cast">Cast</option>
                  <option value="Props" selected>Props</option>
                  <option value="Practical FX">Practical FX</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Stunts">Stunts</option>
                  <option value="Costumes">Costumes</option>
                  <option value="Sound">Sound</option>
                  <option value="Hair & Makeup">Hair & Makeup</option>
                  <option value="Locations">Locations</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Target Scene</label>
                <select id="elem-scene" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
                  <option value="1">Scene 1</option>
                  <option value="2">Scene 2</option>
                  <option value="3">Scene 3</option>
                  <option value="4">Scene 4</option>
                  <option value="7">Scene 7</option>
                  <option value="16">Scene 16</option>
                  <option value="18" selected>Scene 18</option>
                </select>
              </div>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Description & Requirements</label>
              <textarea id="elem-desc" rows="2" placeholder="Production notes, duplicates, safety specs..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600 resize-none"></textarea>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" id="btn-cancel-add" class="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium">Cancel</button>
              <button type="submit" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs">Save Element</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `}async function In(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=s||a.get("scriptId")||f.state.selectedScriptId||"chronicles-of-dust";let o="all",l="all",i="";const c=async()=>{const v=await Lt(n,o,l),w=v.filter(C=>{if(!i)return!0;const N=i.toLowerCase();return C.name.toLowerCase().includes(N)||C.description&&C.description.toLowerCase().includes(N)||C.category.toLowerCase().includes(N)}),$=v.length,T=v.filter(C=>C.status==="Confirmed").length,I=v.filter(C=>C.status==="Needs Review"||C.status==="Extracted").length,k=v.filter(C=>C.status==="Rejected").length,_=document.getElementById("kpi-total"),X=document.getElementById("kpi-confirmed"),W=document.getElementById("kpi-review"),re=document.getElementById("kpi-rejected");_&&(_.textContent=$),X&&(X.textContent=T),W&&(W.textContent=I),re&&(re.textContent=k);const Z=document.getElementById("breakdown-list");if(Z){if(w.length===0){Z.innerHTML=`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400 text-xs">
          No breakdown elements match the active filters.
        </div>
      `;return}Z.innerHTML=w.map(C=>{const N=C.status==="Confirmed",Q=C.status==="Needs Review"||C.status==="Extracted",R=C.status==="Rejected",le=N?'<span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">verified</span>Confirmed</span>':Q?'<span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">help</span>Needs Review</span>':'<span class="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold">Rejected</span>';return`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3" data-id="${C.id}">
          <div class="flex items-start gap-3 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 font-bold text-xs mt-0.5">
              Sc ${C.sceneNumber}
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="font-heading font-bold text-sm text-slate-900">${C.name}</h3>
                <span class="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold">${C.category}</span>
                ${le}
              </div>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">${C.description||"No description provided."}</p>
              ${C.sourceSnippet?`
                <div class="mt-2 text-[11px] font-mono text-slate-500 bg-slate-50 border border-slate-100 rounded-lg p-2 leading-relaxed">
                  <span class="text-slate-400 font-sans font-semibold text-[10px] uppercase">Script Evidence:</span> "${C.sourceSnippet}"
                </div>
              `:""}
              ${C.confirmedBy?`
                <div class="mt-1 text-[10px] text-slate-400">
                  Confirmed by ${C.confirmedBy}
                </div>
              `:""}
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            ${N?`
              <button class="btn-review-item px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors" data-id="${C.id}">
                Re-review
              </button>
            `:`
              <button class="btn-confirm-item px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors flex items-center gap-1" data-id="${C.id}">
                <span class="material-symbols-outlined text-[15px]">check</span>
                <span>Confirm</span>
              </button>
            `}
            ${R?"":`
              <button class="btn-reject-item p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors" data-id="${C.id}" title="Reject element">
                <span class="material-symbols-outlined text-[18px]">block</span>
              </button>
            `}
          </div>
        </div>
      `}).join(""),Z.querySelectorAll(".btn-confirm-item").forEach(C=>{C.onclick=async()=>{const N=C.getAttribute("data-id");await Ut(n,N,{status:"Confirmed"}),y("Element confirmed by Owner"),c()}}),Z.querySelectorAll(".btn-review-item").forEach(C=>{C.onclick=async()=>{const N=C.getAttribute("data-id");await Ut(n,N,{status:"Needs Review",isHumanConfirmed:!1}),y("Marked for review"),c()}}),Z.querySelectorAll(".btn-reject-item").forEach(C=>{C.onclick=async()=>{const N=C.getAttribute("data-id");await Ut(n,N,{status:"Rejected"}),y("Element rejected"),c()}})}};await c(),document.querySelectorAll(".cat-btn").forEach(v=>{v.onclick=()=>{document.querySelectorAll(".cat-btn").forEach(w=>{w.classList.remove("bg-blue-600","text-white","shadow-2xs"),w.classList.add("bg-slate-100","text-slate-700")}),v.classList.add("bg-blue-600","text-white","shadow-2xs"),v.classList.remove("bg-slate-100","text-slate-700"),o=v.getAttribute("data-cat"),c()}});const x=document.getElementById("breakdown-scene-select");x&&(x.onchange=v=>{l=v.target.value,c()});const p=document.getElementById("breakdown-search");p&&(p.oninput=v=>{i=v.target.value,c()});const d=document.getElementById("modal-add-element"),r=document.getElementById("btn-add-element"),u=document.getElementById("close-add-modal"),h=document.getElementById("btn-cancel-add"),m=document.getElementById("form-add-element"),g=()=>d?.classList.remove("hidden"),b=()=>d?.classList.add("hidden");r&&(r.onclick=g),u&&(u.onclick=b),h&&(h.onclick=b),m&&(m.onsubmit=async v=>{v.preventDefault();const w=document.getElementById("elem-name")?.value,$=document.getElementById("elem-cat")?.value,T=document.getElementById("elem-scene")?.value,I=document.getElementById("elem-desc")?.value;w&&(await xa(n,{name:w,category:$,sceneNumber:Number(T),sceneId:`scene-${T}`,description:I,status:"Confirmed"}),y(`Added "${w}" to Scene ${T}`),b(),m.reset(),c())})}function En(e=null,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=t||a.get("scriptId")||f.state.selectedScriptId||"chronicles-of-dust",o=s||a.get("sceneId");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${de("Pre-Production",o?"Scene Details & Logistics":"Scene Hub & Logistics")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Me(o?"Scene Logistics":"Scene Hub (18 Scenes)",o?"movie":"hub",o?`/production/scenes?scriptId=${n}`:"/production",o?`
            <a href="/production/dialogue-sides?scriptId=${n}&scene=${o}" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors">
              <span class="material-symbols-outlined text-[15px]">record_voice_over</span>
              <span>Actor Sides</span>
            </a>
          `:"")}

        <div id="scenes-view-container" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading scene records...</div>
        </div>
      </main>

      ${pe("production")}
    </div>
  `}async function kn(e,t=null,s=null,a=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||f.state.selectedScriptId||"chronicles-of-dust",l=a||n.get("sceneId"),i=document.getElementById("scenes-view-container");if(i)if(l){const c=await pa(o,l);if(!c){i.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Scene not found.</div>';return}const x=c.elements||[];i.innerHTML=`
      <!-- Scene Header Card -->
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-2.5">
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs">SCENE ${c.sceneNumber}</span>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-lg ${c.intExt==="INT"?"bg-amber-50 text-amber-800":"bg-sky-50 text-sky-800"}">${c.intExt} · ${c.dayNight}</span>
              <span class="text-xs text-slate-500 font-medium">${c.pages} Pages</span>
            </div>
            <h2 class="font-heading font-bold text-base text-slate-900 mt-2">${c.heading}</h2>
            <p class="text-xs text-slate-500 mt-0.5 font-mono italic">"${c.snippet}"</p>
          </div>
          <div class="text-right shrink-0">
            <span class="px-2 py-1 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs">${c.shootDay}</span>
            <div class="text-[10px] text-emerald-600 font-medium mt-1">Complexity: ${c.complexity}</div>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap text-xs">
          <span class="text-slate-400 font-medium">Cast in scene:</span>
          ${(c.cast||[]).map(d=>`<span class="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-semibold">${d}</span>`).join("")}
          <div class="ml-auto flex items-center gap-1.5">
            <a href="/production/dialogue-sides?scriptId=${o}&scene=${c.id}" class="text-indigo-600 hover:underline font-semibold flex items-center gap-1">
              <span class="material-symbols-outlined text-[15px]">record_voice_over</span>
              <span>Open Actor Sides for Scene ${c.sceneNumber}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Confirmed Breakdown Elements in Scene -->
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-2.5">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 class="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px] text-blue-600">dataset</span>
            <span>Confirmed Elements for Scene ${c.sceneNumber} (${x.length})</span>
          </h3>
          <a href="/production/breakdown?scriptId=${o}&scene=${c.id}" class="text-xs font-semibold text-blue-600 hover:underline">
            Manage Breakdown →
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${x.length>0?x.map(d=>`
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-2">
              <div>
                <span class="text-[10px] font-bold text-slate-500 uppercase">${d.category}</span>
                <div class="font-heading font-bold text-xs text-slate-900">${d.name}</div>
                <p class="text-[11px] text-slate-500 line-clamp-1 mt-0.5">${d.description||d.sourceSnippet||""}</p>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${d.status==="Confirmed"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}">
                ${d.status}
              </span>
            </div>
          `).join(""):`
            <div class="col-span-2 text-center text-slate-400 py-3 text-xs">No elements tagged for this scene yet.</div>
          `}
        </div>
      </div>

      <!-- Director & Production Notes Form -->
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3">
        <div class="border-b border-slate-100 pb-2">
          <h3 class="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px] text-teal-600">edit_note</span>
            <span>Production Notes (Independent from Screenplay Text)</span>
          </h3>
          <p class="text-[11px] text-slate-500">Director framing directives, lens requirements, and continuity safeguards.</p>
        </div>

        <form id="form-scene-notes" class="flex flex-col gap-3 text-xs">
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Director Vision & Camera Setup</label>
            <textarea id="scene-dir-notes" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">${c.directorNotes||""}</textarea>
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Continuity & Wardrobe Tracking</label>
            <textarea id="scene-cont-notes" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">${c.continuityNotes||""}</textarea>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-slate-100">
            <span class="text-[10px] text-slate-400">Edits persist to scene logistics record</span>
            <button type="submit" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs transition-all">
              Save Scene Logistics
            </button>
          </div>
        </form>
      </div>
    `;const p=document.getElementById("form-scene-notes");p&&(p.onsubmit=async d=>{d.preventDefault();const r=document.getElementById("scene-dir-notes")?.value,u=document.getElementById("scene-cont-notes")?.value;await ua(o,c.id,{directorNotes:r,continuityNotes:u}),y(`Saved logistics notes for Scene ${c.sceneNumber}`)})}else{const c=await Mt(o);i.innerHTML=`
      <!-- Scene Filter Bar -->
      <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs" id="scene-filter-btns">
          <button class="scene-filter-btn px-2.5 py-1 rounded-xl font-semibold bg-blue-600 text-white shadow-2xs" data-filter="all">All (18)</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-filter="INT">INT</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-filter="EXT">EXT</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-filter="DAY">DAY</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-filter="NIGHT">NIGHT</button>
        </div>
        <div class="text-[11px] text-slate-500 font-medium self-end sm:self-auto">
          Aligned with <span class="font-semibold text-blue-700">Draft 4.2</span>
        </div>
      </div>

      <!-- Scenes Grid -->
      <div class="grid grid-cols-1 gap-2.5" id="scenes-list-grid">
        ${c.map(p=>`
          <div class="scene-row-card bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group" data-scene="${p.id}" data-int="${p.intExt}" data-dn="${p.dayNight}">
            <div class="flex items-start gap-3 min-w-0">
              <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex flex-col items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <span class="text-[10px] uppercase font-bold leading-none">SCN</span>
                <span class="font-heading font-bold text-base leading-tight">${p.sceneNumber}</span>
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">${p.heading}</h3>
                  <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">${p.pages} pgs</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded ${p.intExt==="INT"?"bg-amber-50 text-amber-700":"bg-sky-50 text-sky-700"} font-semibold">${p.intExt} · ${p.dayNight}</span>
                </div>
                <p class="text-xs text-slate-500 line-clamp-1 mt-1 font-mono italic">"${p.snippet}"</p>
                <div class="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                  <span class="font-medium text-slate-600">${p.shootDay}</span>
                  <span>•</span>
                  <span>Cast: ${(p.cast||[]).join(", ")}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${p.status==="Needs Review"?"bg-amber-50 text-amber-700":"bg-emerald-50 text-emerald-700"}">
                ${p.status}
              </span>
              <span class="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform">
                chevron_right
              </span>
            </div>
          </div>
        `).join("")}
      </div>
    `,i.querySelectorAll(".scene-row-card").forEach(p=>{p.onclick=()=>{const d=p.getAttribute("data-scene");e(`/production/scenes?scriptId=${o}&sceneId=${d}`)}});const x=i.querySelectorAll(".scene-filter-btn");x.forEach(p=>{p.onclick=()=>{x.forEach(r=>{r.classList.remove("bg-blue-600","text-white","shadow-2xs"),r.classList.add("bg-slate-100","text-slate-700")}),p.classList.add("bg-blue-600","text-white","shadow-2xs"),p.classList.remove("bg-slate-100","text-slate-700");const d=p.getAttribute("data-filter");i.querySelectorAll(".scene-row-card").forEach(r=>{d==="all"?r.classList.remove("hidden"):d==="INT"||d==="EXT"?r.classList.toggle("hidden",r.getAttribute("data-int")!==d):(d==="DAY"||d==="NIGHT")&&r.classList.toggle("hidden",r.getAttribute("data-dn")!==d)})}})}}function Cn(e=null,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=t||a.get("scriptId")||f.state.selectedScriptId||"chronicles-of-dust",o=s||a.get("csId"),l=a.get("action")==="new";return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${de("Pre-Production",o?"Call Sheet Inspector":l?"Create New Call Sheet":"Call Sheets Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Me(o?"Call Sheet Detail":l?"New Call Sheet":"Call Sheets","assignment",o||l?`/production/call-sheets?scriptId=${n}`:"/production",!o&&!l?`
            <a href="/production/call-sheets?scriptId=${n}&action=new" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>New Call Sheet</span>
            </a>
          `:"")}

        <div id="callsheet-view-container" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading call sheet records...</div>
        </div>
      </main>

      ${pe("production")}
    </div>
  `}async function An(e,t=null,s=null,a=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||f.state.selectedScriptId||"chronicles-of-dust",l=a||n.get("csId"),i=n.get("action")==="new",c=document.getElementById("callsheet-view-container");if(!c)return;const p=(localStorage.getItem("scriptora_prod_role")||"Owner")==="Owner";if(i){const d=await It(o);c.innerHTML=`
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
              ${d.map(g=>`
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
    `;const r=document.getElementById("tab-linked"),u=document.getElementById("tab-manual"),h=document.getElementById("section-linked-day");r&&u&&(r.onclick=()=>{r.classList.add("bg-white","text-blue-700","shadow-2xs"),u.classList.remove("bg-white","text-blue-700","shadow-2xs"),h?.classList.remove("hidden")},u.onclick=()=>{u.classList.add("bg-white","text-blue-700","shadow-2xs"),r.classList.remove("bg-white","text-blue-700","shadow-2xs"),h?.classList.add("hidden")});const m=document.getElementById("form-create-callsheet");m&&(m.onsubmit=async g=>{g.preventDefault();const b=document.getElementById("new-cs-day")?.value||"3",v=document.getElementById("new-cs-date")?.value,w=document.getElementById("new-cs-crewcall")?.value,$=document.getElementById("new-cs-locname")?.value,T=document.getElementById("new-cs-address")?.value,I=document.getElementById("new-cs-hospital")?.value,k=document.getElementById("new-cs-parking")?.value,_=await fa(o,{shootDay:`Day ${b} of 14`,shootDate:v,generalCrewCall:w,shootingCall:"06:30 AM",locationName:$,locationAddress:T,nearestHospital:I,parkingNotes:k});y(`Created Call Sheet #${_.callSheetNumber}`),e(`/production/call-sheets?scriptId=${o}&csId=${_.id}`)})}else if(l){const d=await ma(o,l);if(!d){c.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>';return}const r=d.status==="Confirmed"||d.isPublished;c.innerHTML=`
      <!-- Top Action Banner -->
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-xl ${r?"bg-emerald-50 text-emerald-600":"bg-amber-50 text-amber-600"} flex items-center justify-center shrink-0 border">
            <span class="material-symbols-outlined text-[20px]">${r?"verified":"pending"}</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-bold text-base text-slate-900">Call Sheet #${d.callSheetNumber}</h2>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${r?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}">
                ${r?"Published Snapshot":"Draft — Pending Owner Approval"}
              </span>
            </div>
            <p class="text-xs text-slate-500">${d.shootDay} · ${d.shootDate}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button id="btn-print-callsheet" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors">
            <span class="material-symbols-outlined text-[16px]">print</span>
            <span>Print / PDF</span>
          </button>
          ${!r&&p?`
            <button id="btn-publish-callsheet" class="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Approve & Publish</span>
            </button>
          `:""}
        </div>
      </div>

      <!-- Printable Call Sheet Container -->
      <div id="printable-callsheet" class="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs flex flex-col gap-5 text-xs text-slate-800">
        <!-- Call Sheet Masthead -->
        <div class="border-b-2 border-slate-900 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span class="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold">SCRIPTORA OFFICIAL CALL SHEET</span>
            <h1 class="font-heading font-extrabold text-xl text-slate-900 leading-tight">CHRONICLES OF DUST</h1>
            <p class="text-xs text-slate-600 font-medium">Production Company: Badlands Anthology LLC · Baseline: Draft 4.2</p>
          </div>
          <div class="text-left sm:text-right">
            <div class="font-mono text-sm font-bold text-slate-900">${d.shootDay.toUpperCase()}</div>
            <div class="text-xs text-slate-600 font-semibold">${d.shootDate}</div>
          </div>
        </div>

        <!-- Times & Weather Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">General Crew Call</span>
            <div class="font-heading font-bold text-sm text-slate-900">${d.generalCrewCall}</div>
          </div>
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">Shooting Call</span>
            <div class="font-heading font-bold text-sm text-blue-700">${d.shootingCall}</div>
          </div>
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">Breakfast</span>
            <div class="font-heading font-bold text-sm text-slate-900">${d.breakfastTime}</div>
          </div>
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">Estimated Wrap</span>
            <div class="font-heading font-bold text-sm text-slate-900">${d.estimatedWrap}</div>
          </div>
        </div>

        <!-- Location & Hospital Directives -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="p-3.5 rounded-xl border border-slate-200 flex flex-col gap-1">
            <span class="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px] text-blue-600">location_on</span>
              <span>Set Location & Parking</span>
            </span>
            <div class="font-semibold text-slate-900 text-xs">${d.locationName}</div>
            <p class="text-slate-600 text-[11px]">${d.locationAddress}</p>
            <p class="text-slate-500 text-[11px] mt-1 italic">${d.parkingNotes}</p>
          </div>
          <div class="p-3.5 rounded-xl border border-rose-200 bg-rose-50/30 flex flex-col gap-1">
            <span class="text-[10px] font-bold text-rose-700 uppercase flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">local_hospital</span>
              <span>Nearest Emergency Hospital</span>
            </span>
            <p class="text-slate-800 text-[11px] font-medium leading-relaxed">${d.nearestHospital}</p>
            <div class="text-[10px] text-slate-500 mt-1">Weather: ${d.weatherSummary}</div>
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
            ${(d.scenes||[]).map(m=>`
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <span class="w-16 font-mono font-bold text-blue-700">Sc ${m.sceneNumber}</span>
                <div class="flex-1 min-w-0 pr-2">
                  <div class="font-semibold text-slate-900 truncate">${m.heading}</div>
                  <div class="text-[11px] text-slate-500 truncate">${m.desc}</div>
                </div>
                <span class="w-20 text-center font-mono text-[11px]">${m.pages}</span>
                <span class="w-32 text-right font-medium text-[11px] text-slate-700 truncate">${(m.cast||[]).join(", ")}</span>
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
            ${(d.castCalls||[]).map(m=>`
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <span class="w-32 font-bold text-slate-900">${m.character}</span>
                <span class="flex-1 font-medium text-slate-700">${m.actor}</span>
                <span class="w-20 text-center font-mono text-[11px] text-slate-600">${m.pickup}</span>
                <span class="w-20 text-center font-mono text-[11px] text-slate-600">${m.hmuCall}</span>
                <span class="w-20 text-right font-mono font-bold text-blue-700">${m.onSet}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Special Notes Footer -->
        <div class="p-3 bg-amber-50/50 border border-amber-200/80 rounded-xl">
          <span class="font-bold text-amber-900 uppercase text-[10px]">Safety & Production Directives:</span>
          <p class="text-amber-800 text-[11px] mt-0.5 leading-relaxed">${d.specialInstructions}</p>
        </div>
      </div>
    `;const u=document.getElementById("btn-print-callsheet");u&&(u.onclick=()=>{window.print(),y("Print dialog launched")});const h=document.getElementById("btn-publish-callsheet");h&&(h.onclick=async()=>{confirm("Approve and lock this call sheet as an official immutable snapshot?")&&(await ba(o,d.id),y("Call Sheet published & snapshot locked"),e(`/production/call-sheets?scriptId=${o}&csId=${d.id}`))})}else{const d=await jt(o);c.innerHTML=`
      <div class="flex items-center justify-between">
        <h2 class="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px] text-blue-600">assignment</span>
          <span>Call Sheets Catalogue (${d.length})</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${d.map(r=>{const u=r.status==="Confirmed"||r.isPublished;return`
            <div class="cs-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group" data-id="${r.id}">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <div class="w-10 h-10 rounded-xl ${u?"bg-emerald-50 text-emerald-600":"bg-amber-50 text-amber-600"} flex items-center justify-center font-mono font-bold text-sm">
                      #${r.callSheetNumber}
                    </div>
                    <div>
                      <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">${r.shootDay}</h3>
                      <p class="text-[11px] text-slate-500">${r.shootDate}</p>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${u?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}">
                    ${u?"Published":"Draft"}
                  </span>
                </div>

                <div class="space-y-1.5 text-xs text-slate-600 mt-2">
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[15px] text-slate-400">schedule</span>
                    <span>General Call: <strong class="text-slate-800">${r.generalCrewCall}</strong> · Set: <strong class="text-blue-600">${r.shootingCall}</strong></span>
                  </div>
                  <div class="flex items-center gap-1.5 truncate">
                    <span class="material-symbols-outlined text-[15px] text-slate-400">location_on</span>
                    <span class="truncate">${r.locationName}</span>
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
    `,c.querySelectorAll(".cs-card").forEach(r=>{r.onclick=()=>{const u=r.getAttribute("data-id");e(`/production/call-sheets?scriptId=${o}&csId=${u}`)}})}}function Tn(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||f.state.selectedScriptId;const a=s.get("mode")||"dialogue";return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${de("Pre-Production","Dialogue Sheets & Actor Sides")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Me("Dialogue Sheets & Actor Sides","record_voice_over","/production",`
          <button id="btn-export-pdf" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">print</span>
            <span>Export PDF</span>
          </button>
        `)}

        <!-- Mode Switcher Tabs (2 distinct modes) -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="flex items-center bg-slate-100 p-1 rounded-xl max-w-xs">
            <button id="tab-mode-dialogue" class="flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${a==="dialogue"?"bg-white text-blue-700 shadow-2xs":"text-slate-600 hover:text-slate-900"}">
              1. Dialogue Sheets
            </button>
            <button id="tab-mode-sides" class="flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${a==="sides"?"bg-white text-blue-700 shadow-2xs":"text-slate-600 hover:text-slate-900"}">
              2. Actor Sides
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

      ${pe("production")}
    </div>
  `}async function Pn(e,t=null,s=null){const a=new URLSearchParams(window.location.search||"");s||a.get("scriptId")||f.state.selectedScriptId;let n=a.get("mode")||"dialogue",o="KEVIN",l=a.get("scene")||"18";const i=document.getElementById("tab-mode-dialogue"),c=document.getElementById("tab-mode-sides"),x=document.getElementById("filter-controls"),p=document.getElementById("dialogue-sides-content"),d=[{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"KEVIN",parenthetical:"(adjusting filter)",dialogue:"Wind gauge is spiking past forty knots, Marcus. Did you check the terminal pressure at the intake valve?",action:"Kevin wipes gritty red dust from the gauge glass with his thumb."},{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"MARCUS",parenthetical:"(shrugging)",dialogue:"Telemetry's been on the fritz since dawn. Central syndicate says it's thermal fluctuation.",action:"Marcus gestures with a cigarette toward the desert horizon."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"MEERA",parenthetical:"(eyes on monitor)",dialogue:"That's no fluctuation. Look at line three. Someone bypassed the telemetry loop eighty miles upriver.",action:"Meera brings up a wireframe map showing a hidden subterranean siphon branch."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"KEVIN",parenthetical:"(tense)",dialogue:"They're siphoning straight out of the municipal reservoir into private holding tanks.",action:"Kevin taps the terminal screen, freezing the anomaly coordinates."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"COMMANDER VANCE",parenthetical:"(smooth, unhurried)",dialogue:"Water belongs to those who possess the energy to lift it from the rock, Kevin. The frontier was built on that premise.",action:"Vance sips cold tea, watching the massive hydraulic pump pistons rise and plunge."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"KEVIN",parenthetical:"(stepping forward)",dialogue:"You signed the 2041 Treaty. If the southern aquifer collapses, ten thousand families wake up to dry taps.",action:"Kevin places the legal registry deed onto Vance's polished mahogany desk."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(shouting over the roar)",dialogue:"Hold the pylon, Meera! If the high-pressure valve seals now, the back-surge will fracture the entire chamber!",action:"Brine water sprays across Kevin's visor as he locks the hydraulic bypass manifold."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"MEERA",parenthetical:"(straining on cable)",dialogue:"Then don't let them break! Reroute the secondary relay through the floodgate breaker!",action:"Meera kicks off the iron catwalk, swinging across the chasm to secure the emergency lock."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(levering the valve bar)",dialogue:"Bypass locked! Bleed the line! Three... two... one!",action:"The pressure needles drop from red to blue as the municipal pipeline fills with fresh current."}];function r(){if(x)if(n==="dialogue"){x.innerHTML=`
        <span class="text-xs font-semibold text-slate-500">Character:</span>
        <select id="char-select" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-900 focus:outline-none cursor-pointer">
          <option value="KEVIN" ${o==="KEVIN"?"selected":""}>KEVIN (Lead)</option>
          <option value="MEERA" ${o==="MEERA"?"selected":""}>MEERA (Lead)</option>
          <option value="COMMANDER VANCE" ${o==="COMMANDER VANCE"?"selected":""}>COMMANDER VANCE</option>
          <option value="MARCUS" ${o==="MARCUS"?"selected":""}>MARCUS</option>
        </select>
      `;const m=document.getElementById("char-select");m&&(m.onchange=g=>{o=g.target.value,u()})}else{x.innerHTML=`
        <span class="text-xs font-semibold text-slate-500">Scene Extract:</span>
        <select id="scene-select" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-900 focus:outline-none cursor-pointer">
          <option value="1" ${l==="1"?"selected":""}>Scene 1 — Outpost Gate 4</option>
          <option value="2" ${l==="2"?"selected":""}>Scene 2 — Customs Shed</option>
          <option value="7" ${l==="7"?"selected":""}>Scene 7 — Syndicate Control</option>
          <option value="18" ${l==="18"?"selected":""}>Scene 18 — Chamber B Climax</option>
        </select>
      `;const m=document.getElementById("scene-select");m&&(m.onchange=g=>{l=g.target.value,u()})}}function u(){if(p)if(n==="dialogue"){const m=d.filter(g=>g.character===o);p.innerHTML=`
        <!-- Watermark Header -->
        <div class="border-b-2 border-slate-900 pb-3 font-sans flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">SCRIPTORA · PRODUCTION EXTRACT</div>
            <h2 class="font-heading font-extrabold text-lg text-slate-900">CHARACTER DIALOGUE SHEET — ${o}</h2>
            <div class="text-[11px] text-slate-600 font-medium">Screenplay: Chronicles of Dust · Pinned Version: Draft 4.2</div>
          </div>
          <div class="text-left sm:text-right text-[11px] text-slate-500">
            <div>Lines: ${m.length} Cues</div>
            <div>Date: ${new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <!-- Dialogue Elements -->
        <div class="space-y-6 pt-2 max-w-2xl mx-auto">
          ${m.map((g,b)=>`
            <div class="space-y-1">
              <div class="font-sans font-bold text-[11px] text-blue-700 uppercase tracking-wider">
                SCENE ${g.sceneNum} — ${g.heading}
              </div>
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest pt-2">
                ${g.character}
              </div>
              ${g.parenthetical?`
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${g.parenthetical}
                </div>
              `:""}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto text-left">
                ${g.dialogue}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="border-t border-slate-200 pt-3 mt-6 text-center font-sans text-[10px] text-slate-400">
          Generated from Draft 4.2 pinned baseline. Exact dialogue punctuation and wording preserved.
        </div>
      `}else{const m=d.filter(b=>String(b.sceneNum)===String(l)),g=m[0]||{heading:`SCENE ${l}`};p.innerHTML=`
        <!-- Sides Masthead -->
        <div class="border-b-2 border-slate-900 pb-3 font-sans flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">SCRIPTORA · PRODUCTION SIDES</div>
            <h2 class="font-heading font-extrabold text-lg text-slate-900">ACTOR SIDES — SCENE ${l}</h2>
            <div class="text-[11px] text-slate-600 font-medium">${g.heading} · Draft 4.2</div>
          </div>
          <div class="text-left sm:text-right text-[11px] text-slate-500">
            <div>Rehearsal & On-Set Copy</div>
            <div>Generated: Today</div>
          </div>
        </div>

        <!-- Formatted Script Scene Beat -->
        <div class="space-y-4 pt-2 max-w-2xl mx-auto leading-relaxed">
          <div class="font-bold text-[13px] text-slate-900 uppercase">
            ${g.heading}
          </div>

          ${m.map(b=>`
            <div class="space-y-1 my-3">
              ${b.action?`
                <div class="text-slate-700 text-[12px] leading-relaxed italic mb-2">
                  ${b.action}
                </div>
              `:""}
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest">
                ${b.character}
              </div>
              ${b.parenthetical?`
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${b.parenthetical}
                </div>
              `:""}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto">
                ${b.dialogue}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="border-t border-slate-200 pt-3 mt-6 text-center font-sans text-[10px] text-slate-400">
          END OF SCENE ${l} SIDES · STAMPED APPROVED DRAFT 4.2
        </div>
      `}}i&&c&&(i.onclick=()=>{n="dialogue",i.classList.add("bg-white","text-blue-700","shadow-2xs"),c.classList.remove("bg-white","text-blue-700","shadow-2xs"),r(),u()},c.onclick=()=>{n="sides",c.classList.add("bg-white","text-blue-700","shadow-2xs"),i.classList.remove("bg-white","text-blue-700","shadow-2xs"),r(),u()});const h=document.getElementById("btn-export-pdf");h&&(h.onclick=()=>{window.print(),y(`Exported ${n==="dialogue"?`${o} Dialogue Sheet`:`Scene ${l} Actor Sides`} PDF`)}),r(),u()}function $n(e=null,t=null){const s=new URLSearchParams(window.location.search||"");return t||s.get("scriptId")||f.state.selectedScriptId,`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${de("Pre-Production","Master Shooting Schedule & Stripboard")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Me("Shooting Schedule & Stripboard","calendar_view_week","/production",`
          <button id="btn-confirm-schedule" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">lock</span>
            <span>Confirm Schedule</span>
          </button>
        `)}

        <!-- Schedule Overview KPIs -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shoot Window</span>
            <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">14 Days</div>
            <span class="text-[11px] text-slate-500">Oct 24 – Nov 06</span>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Scenes</span>
            <div class="font-heading font-bold text-lg text-blue-600 mt-0.5">18 of 18</div>
            <span class="text-[11px] text-slate-500">100% Allocated</span>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Pages</span>
            <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">96.0 Pages</div>
            <span class="text-[11px] text-slate-500">Avg 6.8 pgs / day</span>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Company Moves</span>
            <div class="font-heading font-bold text-lg text-emerald-600 mt-0.5">4 Moves</div>
            <span class="text-[11px] text-slate-500">Optimized routing</span>
          </div>
        </div>

        <!-- Conflict & Turnaround Advisory Banner -->
        <div class="bg-blue-50/70 border border-blue-200/90 rounded-2xl p-3 flex items-start justify-between gap-3 shadow-2xs">
          <div class="flex items-start gap-2">
            <span class="material-symbols-outlined text-[18px] text-blue-600 shrink-0 mt-0.5">tune</span>
            <div class="text-xs text-blue-900 leading-relaxed">
              <span class="font-bold">Automated Logistics Guard:</span> Location grouping applied to Mojave Perimeter and Lakebed scenes. Night-to-day turnaround complies with SAG-AFTRA 12-hour rest rules.
            </div>
          </div>
          <button id="btn-propose-schedule" class="px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] shrink-0 transition-colors">
            Optimize Order
          </button>
        </div>

        <!-- Stripboard Days Stream -->
        <div id="stripboard-days-list" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading master stripboard...</div>
        </div>

      </main>

      ${pe("production")}
    </div>
  `}async function Nn(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=s||a.get("scriptId")||f.state.selectedScriptId||"chronicles-of-dust",o=document.getElementById("stripboard-days-list");if(!o)return;const l=async()=>{const x=await It(n),p=await Mt(n);o.innerHTML=x.map(d=>{const r=d.isLocked,u=d.status==="Confirmed",h=p.filter(m=>(d.sceneNumbers||[]).includes(m.sceneNumber));return`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3 ${r?"ring-1 ring-emerald-500/30":""}" data-day="${d.dayNumber}">
          <!-- Day Strip Header -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-heading font-bold text-sm shrink-0">
                D${d.dayNumber}
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <h3 class="font-heading font-bold text-sm text-slate-900 truncate">Day ${d.dayNumber} — ${d.title}</h3>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${u?"bg-emerald-50 text-emerald-700":"bg-slate-100 text-slate-600"}">
                    ${u?"Confirmed":"Draft"}
                  </span>
                </div>
                <div class="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <span class="font-semibold text-slate-700">${d.date}</span>
                  <span>•</span>
                  <span>${d.location}</span>
                  <span>•</span>
                  <span>${d.totalPages} pgs · ${d.estHours} hrs</span>
                </div>
              </div>
            </div>

            <!-- Day Actions: Lock & Move Scenes -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button class="btn-toggle-lock p-1.5 rounded-xl border ${r?"bg-emerald-50 text-emerald-700 border-emerald-200":"bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"} text-xs font-semibold flex items-center gap-1" data-day="${d.dayNumber}" title="${r?"Day locked against auto-reorder":"Lock day"}">
                <span class="material-symbols-outlined text-[16px]">${r?"lock":"lock_open"}</span>
                <span class="hidden sm:inline">${r?"Locked":"Unlocked"}</span>
              </button>
            </div>
          </div>

          <!-- Scenes in this Day (Stripboard Strips) -->
          <div class="flex flex-col gap-1.5">
            ${h.length>0?h.map(m=>{const g=m.intExt==="INT",b=m.dayNight==="NIGHT";return`
                <div class="strip-card rounded-xl border p-2.5 flex items-center justify-between gap-3 text-xs shadow-2xs ${g&&b?"bg-slate-800 text-white border-slate-700":g&&!b?"bg-amber-50/80 text-amber-950 border-amber-200/90":!g&&b?"bg-indigo-900 text-white border-indigo-800":"bg-amber-100/70 text-amber-950 border-amber-300/80"}">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span class="font-mono font-bold text-xs shrink-0 w-12">SCN ${m.sceneNumber}</span>
                    <span class="font-bold text-[10px] uppercase px-1.5 py-0.2 rounded bg-black/10 shrink-0">${m.intExt} · ${m.dayNight}</span>
                    <span class="font-semibold truncate">${m.heading}</span>
                  </div>

                  <div class="flex items-center gap-3 shrink-0 text-[11px]">
                    <span class="opacity-80">${m.pages} pgs</span>
                    <span class="hidden md:inline opacity-90 truncate max-w-[120px]">Cast: ${(m.cast||[]).join(", ")}</span>
                    <a href="/production/scenes?scriptId=${n}&sceneId=${m.id}" class="px-2 py-0.5 rounded-lg bg-black/15 hover:bg-black/25 text-[10px] font-semibold transition-colors" title="View Scene Logistics">
                      Inspect
                    </a>
                  </div>
                </div>
              `}).join(""):`
              <div class="text-center py-2 text-slate-400 text-xs italic">No scenes assigned to this day.</div>
            `}
          </div>
        </div>
      `}).join(""),o.querySelectorAll(".btn-toggle-lock").forEach(d=>{d.onclick=async()=>{const r=d.getAttribute("data-day"),h=(await It(n)).find(m=>m.dayNumber===Number(r));if(h){const m=!h.isLocked;await ga(n,r,{isLocked:m}),y(`Day ${r} ${m?"locked":"unlocked"}`),l()}}})};await l();const i=document.getElementById("btn-confirm-schedule");i&&(i.onclick=async()=>{confirm("Confirm and lock the 14-day master stripboard schedule for chronicles-of-dust?")&&(await ha(n),y("14-day shooting schedule confirmed and locked by Owner"),l())});const c=document.getElementById("btn-propose-schedule");c&&(c.onclick=()=>{y("Schedule re-optimized: Company moves clustered to Mojave perimeter")})}function Bn(e=null,t=null){const s=new URLSearchParams(window.location.search||"");return t||s.get("scriptId")||f.state.selectedScriptId,`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${de("Pre-Production","Production Resource Directory")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Me("Production Directory","contact_phone","/production",`
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

      ${pe("production")}

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
  `}async function Dn(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=s||a.get("scriptId")||f.state.selectedScriptId||"chronicles-of-dust",o=localStorage.getItem("scriptora_prod_role")||"Owner",l=o==="Owner"||o==="Production",i=document.getElementById("dir-role-label");i&&(i.textContent=o);let c="all",x="";const p=async()=>{const $=(await zt(n,c)).filter(I=>{if(!x)return!0;const k=x.toLowerCase();return I.name.toLowerCase().includes(k)||I.role&&I.role.toLowerCase().includes(k)||I.department&&I.department.toLowerCase().includes(k)}),T=document.getElementById("dir-resources-list");if(T){if($.length===0){T.innerHTML=`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400 text-xs">
          No resources found matching the criteria.
        </div>
      `;return}T.innerHTML=$.map(I=>{const _=I.contactRestricted&&!l?'<span class="italic text-slate-400 font-sans">[Restricted — Production Authorized Only]</span>':`<span class="font-mono text-slate-800">${I.contact||"No contact on file"}</span>`;return`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-start gap-3 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 font-bold text-xs mt-0.5">
              ${I.category.slice(0,3).toUpperCase()}
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="font-heading font-bold text-sm text-slate-900">${I.name}</h3>
                <span class="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold">${I.department||I.category}</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${I.status==="Confirmed"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}">
                  ${I.status||"Active"}
                </span>
              </div>
              <p class="text-xs text-slate-600 mt-0.5">${I.role||I.notes||""}</p>
              
              <div class="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500 flex-wrap">
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px] text-slate-400">mail</span>
                  <span>${_}</span>
                </div>
                ${I.scenes&&I.scenes.length>0?`
                  <div class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-slate-400">movie</span>
                    <span>Scenes: <strong>${I.scenes.join(", ")}</strong></span>
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
      `}).join("")}};await p(),document.querySelectorAll(".dir-cat-btn").forEach(w=>{w.onclick=()=>{document.querySelectorAll(".dir-cat-btn").forEach($=>{$.classList.remove("bg-blue-600","text-white","shadow-2xs"),$.classList.add("bg-slate-100","text-slate-700")}),w.classList.add("bg-blue-600","text-white","shadow-2xs"),w.classList.remove("bg-slate-100","text-slate-700"),c=w.getAttribute("data-cat"),p()}});const d=document.getElementById("dir-search");d&&(d.oninput=w=>{x=w.target.value,p()});const r=document.getElementById("modal-add-resource"),u=document.getElementById("btn-add-resource"),h=document.getElementById("close-res-modal"),m=document.getElementById("btn-cancel-res"),g=document.getElementById("form-add-resource"),b=()=>r?.classList.remove("hidden"),v=()=>r?.classList.add("hidden");u&&(u.onclick=b),h&&(h.onclick=v),m&&(m.onclick=v),g&&(g.onsubmit=async w=>{w.preventDefault();const $=document.getElementById("res-name")?.value,T=document.getElementById("res-cat")?.value,I=document.getElementById("res-dept")?.value,k=document.getElementById("res-role")?.value,_=document.getElementById("res-contact")?.value,X=document.getElementById("res-restricted")?.checked,W=await zt(n),re={id:`res-${Date.now()}`,scriptId:n,name:$,category:T,department:I,role:k,contact:_,contactRestricted:X,status:"Confirmed",scenes:["Scene 18"]};W.unshift(re),localStorage.setItem(`scriptora_prod_res_${n}`,JSON.stringify(W)),y(`Added resource "${$}"`),v(),g.reset(),p()})}function Rn(e=null,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=t||a.get("scriptId")||f.state.selectedScriptId||"chronicles-of-dust",o=s||a.get("docId");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${de("Pre-Production",o?"Production Document Viewer":"Production Documents Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Me(o?"Document Viewer":"Documents Workspace","description",o?`/production/documents?scriptId=${n}`:"/production",o?`
            <button id="btn-export-doc-pdf" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
              <span class="material-symbols-outlined text-[16px]">print</span>
              <span>Export PDF</span>
            </button>
          `:"")}

        <div id="docs-workspace-container" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading production documents...</div>
        </div>
      </main>

      ${pe("production")}
    </div>
  `}async function Mn(e,t=null,s=null,a=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||f.state.selectedScriptId||"chronicles-of-dust",l=a||n.get("docId"),i=document.getElementById("docs-workspace-container");if(!i)return;const c=await Is(o);if(l){const x=c.find(r=>r.id===l)||c[0];i.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
            <span class="material-symbols-outlined text-[20px]">description</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-bold text-base text-slate-900">${x.title}</h2>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${x.status==="Confirmed"?"bg-emerald-50 text-emerald-700":"bg-slate-100 text-slate-600"}">
                ${x.status}
              </span>
            </div>
            <p class="text-xs text-slate-500">${x.type} · Version ${x.version||"v1.0"} · Pinned: ${x.sourceVersion||"Draft 4.2"}</p>
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
            <h1 class="font-heading font-extrabold text-xl text-slate-900 mt-0.5">${x.title.toUpperCase()}</h1>
            <p class="text-xs text-slate-600">Screenplay: Chronicles of Dust (Feature) · Source Draft: ${x.sourceVersion}</p>
          </div>
          <div class="text-right text-[11px] text-slate-500">
            <div>Version: ${x.version}</div>
            <div>Generated: Today</div>
          </div>
        </div>

        <div class="space-y-3 font-sans text-xs pt-2">
          <p class="leading-relaxed text-slate-700">
            This document represents an officially versioned pre-production snapshot approved by the project Owner. All element references, scene associations, and actor callouts adhere to the pinned screenplay baseline.
          </p>

          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div class="font-bold text-slate-900">Document Metadata:</div>
            <div>Category: ${x.type}</div>
            <div>Screenplay Baseline: Draft 4.2 (Hash: 88f2)</div>
            <div>Approval Status: ${x.status}</div>
            <div>Distribution Status: ${x.published?"Published to Crew":"Internal Working Draft"}</div>
          </div>
        </div>

        <div class="border-t border-slate-200 pt-3 mt-4 text-center font-sans text-[10px] text-slate-400">
          PROTECTED BY SCRIPTORA PRODUCTION ARCHITECTURE · IMMUTABLE POINT-IN-TIME AUDIT RECORD
        </div>
      </div>
    `;const p=document.getElementById("btn-export-doc-pdf");p&&(p.onclick=()=>{window.print(),y("Printing official document PDF")});const d=document.getElementById("btn-share-link");d&&(d.onclick=()=>{const r=`${window.location.origin}/production/documents?docId=${x.id}&token=exp_${Date.now()+864e5}`;navigator.clipboard?.writeText(r),y("Revocable 24-hour access link copied to clipboard")})}else{const x=[{name:"1. Script Preparation",desc:"Breakdown sheets, appearance lists, and department master lists.",items:[{title:"Full Script Breakdown Sheet",type:"Script Breakdown",status:"Confirmed",ver:"v1.4",id:"doc-sb-1"},{title:"Character Appearance Master List",type:"Cast List",status:"Confirmed",ver:"v1.2",id:"doc-ca-1"},{title:"Props & Practical SFX Register",type:"Props Master",status:"Needs Review",ver:"v1.0",id:"doc-pr-1"}]},{name:"2. Actors and Rehearsal",desc:"Actor sides, character speech cues, and rehearsal extracts.",items:[{title:"Actor Sides — Kevin & Meera (Scene 18)",type:"Actor Sides",status:"Confirmed",ver:"v1.2",id:"doc-ds-1"},{title:"Lead Character Dialogue Sheets",type:"Dialogue Sheet",status:"Confirmed",ver:"v1.0",id:"doc-ds-2"}]},{name:"3. Scheduling",desc:"Master stripboards, daily scene allocations, and DOOD reports.",items:[{title:"Master 14-Day Stripboard Schedule",type:"Shooting Schedule",status:"Confirmed",ver:"v2.1",id:"doc-ss-1"},{title:"Cast Day-Out-of-Days (DOOD) Report",type:"DOOD",status:"Confirmed",ver:"v1.1",id:"doc-dood-1"}]},{name:"4. On-Set Production",desc:"Daily call sheets, camera shot lists, and daily logs.",items:[{title:"Call Sheet #01 — Gate 4 Day Exterior",type:"Call Sheet",status:"Confirmed",ver:"v1.0",id:"doc-cs-1"},{title:"Call Sheet #02 — Pumping Station Chamber",type:"Call Sheet",status:"Draft",ver:"v0.9",id:"doc-cs-2"}]},{name:"5. Management & Pre-Flight",desc:"Resource directories, emergency contacts, and readiness checks.",items:[{title:"Cast & Crew Emergency Contact Directory",type:"Directory",status:"Confirmed",ver:"v1.0",id:"doc-dir-1"},{title:"Pre-Production Readiness Audit Report",type:"Readiness Report",status:"Confirmed",ver:"v1.0",id:"doc-read-1"}]}];i.innerHTML=`
      <div class="flex flex-col gap-5">
        ${x.map(p=>`
          <section class="flex flex-col gap-2.5">
            <div>
              <h2 class="font-heading font-bold text-xs uppercase tracking-wider text-slate-800">${p.name}</h2>
              <p class="text-[11px] text-slate-500">${p.desc}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              ${p.items.map(d=>`
                <div class="doc-card bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group" data-id="${d.id}">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-[10px] font-bold text-slate-400 uppercase">${d.type}</span>
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${d.status==="Confirmed"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}">
                        ${d.status}
                      </span>
                    </div>
                    <h3 class="font-heading font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">${d.title}</h3>
                  </div>

                  <div class="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                    <span class="text-slate-400 font-mono text-[10px]">${d.ver}</span>
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
    `,i.querySelectorAll(".doc-card").forEach(p=>{p.onclick=()=>{const d=p.getAttribute("data-id");e(`/production/documents?scriptId=${o}&docId=${d}`)}})}}function Ln(e=null,t=null){const s=new URLSearchParams(window.location.search||"");return t||s.get("scriptId")||f.state.selectedScriptId,`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${de("Pre-Production","Production Change Proposals & Approvals")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Me("Change Proposals & Approvals","rule","/production",`
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

      ${pe("production")}

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
  `}async function jn(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=s||a.get("scriptId")||f.state.selectedScriptId||"chronicles-of-dust",o=localStorage.getItem("scriptora_prod_role")||"Owner",l=o==="Owner",i=document.getElementById("changes-proposals-stream");if(!i)return;const c=async()=>{const g=await Xe(n);if(g.length===0){i.innerHTML=`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400 text-xs">
          No proposals in the review queue.
        </div>
      `;return}i.innerHTML=g.map(b=>{const v=b.status==="Awaiting review",w=b.status==="Accepted",$=b.status==="Rejected",T=b.status==="Conflict",I=w?'<span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">check_circle</span>Accepted</span>':$?'<span class="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">cancel</span>Rejected</span>':T?'<span class="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">warning</span>Conflict Flagged</span>':'<span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">hourglass_top</span>Awaiting Owner Review</span>';return`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col gap-3">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">${b.category}</span>
                <span class="text-slate-300">•</span>
                <span class="text-[11px] font-semibold text-slate-600">Submitted by ${b.submittedBy} (${b.submitterRole})</span>
                ${I}
              </div>
              <h3 class="font-heading font-bold text-sm text-slate-900 mt-1">${b.title}</h3>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">${b.description}</p>
            </div>
            <span class="text-[10px] text-slate-400 font-mono shrink-0">${b.sourceVersion||"Draft 4.2"}</span>
          </div>

          <!-- Impact Box -->
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs">
            <span class="material-symbols-outlined text-[16px] text-slate-400">info</span>
            <span class="text-slate-600"><strong class="text-slate-800">Impact:</strong> ${b.impact}</span>
          </div>

          ${b.resolutionNotes?`
            <div class="p-2.5 rounded-xl bg-slate-100/70 border border-slate-200/60 text-[11px] text-slate-600 font-sans">
              <span class="font-bold text-slate-800">Resolution Note:</span> ${b.resolutionNotes}
            </div>
          `:""}

          <!-- Owner Review Controls -->
          ${v&&l?`
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button class="btn-conflict-prop px-3 py-1.5 rounded-xl text-amber-700 bg-amber-50 hover:bg-amber-100 text-xs font-semibold transition-colors" data-id="${b.id}">
                Flag Conflict
              </button>
              <button class="btn-reject-prop px-3 py-1.5 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 text-xs font-semibold transition-colors" data-id="${b.id}">
                Reject Proposal
              </button>
              <button class="btn-accept-prop px-4 py-1.5 rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold shadow-2xs transition-all flex items-center gap-1" data-id="${b.id}">
                <span class="material-symbols-outlined text-[16px]">check</span>
                <span>Accept & Update Record</span>
              </button>
            </div>
          `:""}
        </div>
      `}).join(""),i.querySelectorAll(".btn-accept-prop").forEach(b=>{b.onclick=async()=>{const v=b.getAttribute("data-id"),w=prompt("Enter resolution acceptance note (optional):","Approved by Owner. Records updated.")||"Approved by Owner.";await Pt(n,v,"accept",w),y("Proposal accepted. Production records updated."),c()}}),i.querySelectorAll(".btn-reject-prop").forEach(b=>{b.onclick=async()=>{const v=b.getAttribute("data-id"),w=prompt("Enter rejection reason:","Scheduling conflict with Day 2 shooting window.")||"Declined during Owner review.";await Pt(n,v,"reject",w),y("Proposal rejected."),c()}}),i.querySelectorAll(".btn-conflict-prop").forEach(b=>{b.onclick=async()=>{const v=b.getAttribute("data-id");await Pt(n,v,"conflict","Underlying draft conflict flagged."),y("Conflict status flagged."),c()}})};await c();const x=document.getElementById("modal-submit-proposal"),p=document.getElementById("btn-new-proposal"),d=document.getElementById("close-proposal-modal"),r=document.getElementById("btn-cancel-prop"),u=document.getElementById("form-submit-proposal"),h=()=>x?.classList.remove("hidden"),m=()=>x?.classList.add("hidden");p&&(p.onclick=h),d&&(d.onclick=m),r&&(r.onclick=m),u&&(u.onsubmit=async g=>{g.preventDefault();const b=document.getElementById("prop-title")?.value,v=document.getElementById("prop-cat")?.value,w=document.getElementById("prop-desc")?.value,$=document.getElementById("prop-impact")?.value;await Es(n,{title:b,category:v,description:w,impact:$||"Modifies production schedule & logistics budget",submittedBy:f.state.currentUser?.name||"Arun Kumar",submitterRole:o}),y("Proposal submitted for review"),m(),u.reset(),c()})}function On(e=null,t=null){const s=new URLSearchParams(window.location.search||"");return t||s.get("scriptId")||f.state.selectedScriptId,`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${de("Pre-Production","Production Version History & Audit Trail")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Me("Version History & Timeline","history_edu","/production",`
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

      ${pe("production")}
    </div>
  `}async function _n(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=s||a.get("scriptId")||f.state.selectedScriptId||"chronicles-of-dust",o=document.getElementById("history-events-list");if(!o)return;const l=async()=>{const d=await Bt(n);if(d.length===0){o.innerHTML='<div class="text-center py-6 text-slate-400 text-xs">No audit events recorded yet.</div>';return}o.innerHTML=d.map((r,u)=>{const h=r.category==="APPROVAL",m=r.category==="VERSION_INTEGRITY",g=r.category==="CHANGE_MANAGEMENT";return`
        <div class="flex items-start gap-3 text-xs group">
          <div class="w-8 h-8 rounded-xl ${h?"text-emerald-600 bg-emerald-50":m?"text-blue-600 bg-blue-50":g?"text-amber-600 bg-amber-50":"text-purple-600 bg-purple-50"} flex items-center justify-center shrink-0 border border-slate-100 shadow-2xs mt-0.5">
            <span class="material-symbols-outlined text-[16px]">${h?"check_circle":m?"lock":g?"rule":"dataset"}</span>
          </div>

          <div class="flex-1 min-w-0 pb-3 border-b border-slate-100 last:border-b-0">
            <div class="flex items-center justify-between gap-2">
              <span class="font-heading font-bold text-slate-900">${r.action.replace(/_/g," ")}</span>
              <span class="text-[10px] text-slate-400 font-mono">${r.timestamp||"Just now"}</span>
            </div>
            <p class="text-slate-600 text-xs mt-0.5 leading-relaxed">${r.details}</p>
            <div class="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
              <span>Actor: <strong class="text-slate-600">${r.actor||"Arun Kumar"}</strong></span>
              <span>•</span>
              <span class="font-mono text-emerald-700 font-semibold">${r.sourceVersion||"Draft 4.2"}</span>
            </div>
          </div>
        </div>
      `}).join("")};await l();const i=document.getElementById("btn-run-compare"),c=document.getElementById("compare-diff-panel"),x=document.getElementById("close-diff");i&&c&&(i.onclick=()=>{c.classList.remove("hidden"),y("Loaded version baseline comparison")}),x&&c&&(x.onclick=()=>c.classList.add("hidden"));const p=document.getElementById("btn-restore-version-trigger");p&&(p.onclick=async()=>{const d=prompt("Enter previous draft label to restore as new version baseline (e.g. Draft 3.0):","Draft 3.0");d&&(await ya(n,d),y(`Restored baseline to ${d} as new version`),l())})}function Hn(e=null,t=null){const s=new URLSearchParams(window.location.search||"");return t||s.get("scriptId")||f.state.selectedScriptId,`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${de("Pre-Production","Pre-Flight Readiness & Validation")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Me("Readiness & Validation","fact_check","/production",`
          <button id="btn-revalidate" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">refresh</span>
            <span>Run Pre-Flight</span>
          </button>
        `)}

        <!-- Status Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="bg-white rounded-2xl border border-rose-200/90 p-4 shadow-2xs flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm shrink-0">
              <span class="material-symbols-outlined text-[20px]">error</span>
            </div>
            <div>
              <div class="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Critical Blockers</div>
              <div class="font-heading font-bold text-base text-slate-900 mt-0.5" id="kpi-critical">2 Issues</div>
              <p class="text-[11px] text-slate-500">Requires Owner sign-off</p>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-amber-200/90 p-4 shadow-2xs flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm shrink-0">
              <span class="material-symbols-outlined text-[20px]">warning</span>
            </div>
            <div>
              <div class="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Warnings & Pending</div>
              <div class="font-heading font-bold text-base text-slate-900 mt-0.5" id="kpi-warnings">1 Pending</div>
              <p class="text-[11px] text-slate-500">Action recommended</p>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-emerald-200/90 p-4 shadow-2xs flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">
              <span class="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <div>
              <div class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Verified Gates</div>
              <div class="font-heading font-bold text-base text-slate-900 mt-0.5" id="kpi-verified">3 Passed</div>
              <p class="text-[11px] text-slate-500">Shoot-day ready</p>
            </div>
          </div>
        </div>

        <!-- Actionable Pre-Flight Gates List -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col gap-3">
          <div class="border-b border-slate-100 pb-2.5 flex items-center justify-between">
            <h3 class="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-blue-600">checklist</span>
              <span>Pre-Production Validation Gates</span>
            </h3>
            <span class="text-[11px] text-slate-400 font-mono">Real Validation Checks</span>
          </div>

          <div id="readiness-items-stream" class="flex flex-col gap-2.5 pt-1">
            <div class="text-center py-6 text-slate-400 text-xs">Evaluating production readiness rules...</div>
          </div>
        </div>

      </main>

      ${pe("production")}
    </div>
  `}async function Fn(e,t=null,s=null){const a=new URLSearchParams(window.location.search||""),n=s||a.get("scriptId")||f.state.selectedScriptId||"chronicles-of-dust",o=document.getElementById("readiness-items-stream");if(!o)return;const l=async()=>{const c=await ks(n),x=c.filter(m=>m.severity==="critical"&&m.status!=="resolved").length,p=c.filter(m=>m.severity==="warning"&&m.status!=="resolved").length,d=c.filter(m=>m.status==="resolved"||m.severity==="ready").length,r=document.getElementById("kpi-critical"),u=document.getElementById("kpi-warnings"),h=document.getElementById("kpi-verified");r&&(r.textContent=`${x} Issues`),u&&(u.textContent=`${p} Pending`),h&&(h.textContent=`${d} Passed`),o.innerHTML=c.map(m=>{const g=m.severity==="critical"&&m.status!=="resolved",b=m.severity==="warning"&&m.status!=="resolved",v=m.status==="resolved"||m.severity==="ready",w=g?"border-rose-200 bg-rose-50/20":b?"border-amber-200 bg-amber-50/20":"border-slate-200 bg-white",$=g?'<span class="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold">CRITICAL BLOCKER</span>':b?'<span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold">WARNING</span>':'<span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">check</span>PASSED</span>';return`
        <div class="rounded-xl border p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${w}">
          <div class="flex items-start gap-3 min-w-0">
            <div class="w-8 h-8 rounded-lg ${g?"bg-rose-100 text-rose-700":b?"bg-amber-100 text-amber-700":"bg-emerald-100 text-emerald-700"} flex items-center justify-center shrink-0 mt-0.5">
              <span class="material-symbols-outlined text-[17px]">${g?"priority_high":b?"warning":"check"}</span>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">${m.category}</span>
                ${$}
              </div>
              <h4 class="font-heading font-bold text-sm text-slate-900 mt-0.5">${m.title}</h4>
              <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">${m.description}</p>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
            ${v?`
              <span class="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">verified</span>
                <span>Verified</span>
              </span>
            `:`
              <a href="${m.targetRoute}?scriptId=${n}" class="btn-jump-fix px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-colors flex items-center gap-1">
                <span>Fix Issue</span>
                <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
              </a>
              <button class="btn-mark-resolved px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors" data-id="${m.id}" title="Mark as resolved manually">
                Resolve
              </button>
            `}
          </div>
        </div>
      `}).join(""),o.querySelectorAll(".btn-mark-resolved").forEach(m=>{m.onclick=async()=>{const g=m.getAttribute("data-id");await va(n,g),y("Issue marked as resolved"),l()}})};await l();const i=document.getElementById("btn-revalidate");i&&(i.onclick=async()=>{y("Running real pre-flight checks against Draft 4.2..."),await l(),y("Pre-flight scan completed")})}function Un(e=null,t=null){const s=new URLSearchParams(window.location.search||""),a=t||s.get("scriptId")||f.state.selectedScriptId||"chronicles-of-dust";return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${de("Pre-Production","Storyboard Studio")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Me("Storyboard Studio","art_track","/production",`
          <span class="px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
            Prompt 3 Active Staging
          </span>
        `)}

        <!-- Feature Intro Banner -->
        <div class="bg-gradient-to-br from-rose-50 to-white rounded-2xl border border-rose-200/90 p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1">
            <span class="text-[10px] font-bold text-rose-600 uppercase tracking-widest font-mono">Creative Visual Planning</span>
            <h2 class="font-heading font-extrabold text-base text-slate-900">Visual Shot Composition & Concept Frames</h2>
            <p class="text-xs text-slate-600 max-w-lg leading-relaxed">
              Storyboard Studio connects camera focal lengths, aspect ratios, character blocking, and AI concept frames directly to confirmed screenplay scenes. Full multi-frame generation activates in Prompt 3.
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <a href="/production/scenes?scriptId=${a}&sceneId=scene-18" class="px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-rose-800 text-xs font-semibold hover:bg-rose-50 transition-colors">
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

        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 text-center text-xs text-slate-500 shadow-2xs">
          Prompt 3 Implementation Ready: Canvas rendering, shot sequence drag-and-drop, and camera metadata export.
        </div>
      </main>

      ${pe("production")}
    </div>
  `}class Vn{constructor(){this.appEl=null,this.currentPath=null,this.isFullScreen=!1}getBasePath(){return window.location.pathname.toLowerCase().startsWith("/scriptora")?"/Scriptora":""}getCurrentLocation(){return window.location.hash&&window.location.hash.startsWith("#/")?window.location.hash.slice(1):window.location.pathname+window.location.search}ensureShell(){if(!this.appEl)return;document.getElementById("scriptora-app-shell")||(this.appEl.innerHTML=`
        <div id="scriptora-app-shell" class="flex flex-col min-h-screen w-full relative bg-surface select-text">
          <!-- Persistent Global Header Container -->
          <div id="scriptora-global-header" class="fixed top-0 left-0 right-0 z-40 transition-all duration-200"></div>

          <!-- Dynamic Screen Content Area -->
          <main id="scriptora-global-content" class="flex-1 w-full min-h-screen flex flex-col relative transition-opacity duration-200"></main>

          <!-- Persistent Global Bottom Navigation Container -->
          <div id="scriptora-global-nav" class="fixed bottom-0 left-0 right-0 z-40 transition-all duration-200 overflow-visible"></div>
        </div>
      `)}init(t="#app"){if(this.appEl=document.querySelector(t),!this.appEl){console.error(`Mount element ${t} not found.`);return}this.ensureShell(),window.setScriptoraFullScreen=s=>{this.isFullScreen=!!s;const a=document.getElementById("scriptora-global-header"),n=document.getElementById("scriptora-global-nav");a&&a.classList.toggle("hidden",!!s),n&&n.classList.toggle("hidden",!!s)},document.body.addEventListener("click",s=>{const a=s.target.closest("a");if(a&&a.href&&a.origin===window.location.origin&&!a.hasAttribute("download")&&a.getAttribute("target")!=="_blank"&&!a.getAttribute("rel")?.includes("external")){const n=new URL(a.href),o=n.pathname+n.search+n.hash;o.startsWith("/api")||(s.preventDefault(),this.navigate(o))}}),window.addEventListener("popstate",s=>{typeof window.__scriptoraEditorPopstate=="function"&&window.__scriptoraEditorPopstate(s)||this.resolve(this.getCurrentLocation())}),window.addEventListener("hashchange",()=>{this.resolve(this.getCurrentLocation())}),this.resolve(this.getCurrentLocation())}navigate(t,s=!1){this.currentPath&&f.pushHistory(this.currentPath);const a=this.getBasePath(),n=a&&t.toLowerCase().startsWith(a.toLowerCase())?t.slice(a.length)||"/":t,o=a&&!t.startsWith(a)?`${a}${n.startsWith("/")?"":"/"}${n}`:t;s?window.history.replaceState(null,"",o):window.history.pushState(null,"",o),this.resolve(n)}resolve(t){const[s,a]=t.split("?");let n=s.replace(/\/+$/,"")||"/";const o=this.getBasePath();o&&n.toLowerCase().startsWith(o.toLowerCase())&&(n=n.slice(o.length)||"/"),n.startsWith("/")||(n="/"+n);const l=new URLSearchParams(a||"");this.currentPath=t;const i=!!f.state.currentUser;if(!i&&!["/welcome","/auth"].includes(n)){this.navigate("/auth",!0);return}if(i&&n==="/auth"){this.navigate("/workspace",!0);return}if(n==="/"){i?this.navigate("/workspace",!0):this.navigate("/welcome",!0);return}if(n==="/welcome"){this.render(ka(),()=>Ca(this.navigate.bind(this)),{isPublic:!0});return}if(n==="/auth"){this.render(Ia(),()=>Ea(this.navigate.bind(this)),{isPublic:!0});return}if(n==="/workspace"){this.render(Aa(),()=>Ta(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Workspace",subtitle:"Your writing space."});return}if(n==="/editor"){const r=f.state.selectedScriptId||"chronicles-of-dust",u=l.get("scene");this.navigate(`/editor/${r}${u?`?scene=${u}`:""}`,!0);return}if(n.startsWith("/editor/")){const r=n.split("/")[2],u=l.get("scene");f.setState({selectedScriptId:r});const h=f.state.scripts?.find(m=>m.id===r)||{title:"Untitled Screenplay"};this.render($a(r,u),()=>Ba(r,this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Editor",subtitle:h.title||"Screenplay Studio"});return}if(n==="/intelligence"||n==="/intelligence/select"){this.render(Za(),()=>Qa(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Selector"});return}if(n==="/intelligence/context"){this.render(en(),()=>tn(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Context Calibration"});return}if(n==="/intelligence/dashboard"||n==="/intelligence/overview"){this.render(sn(),()=>an(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Analysis"});return}if(n==="/intelligence/analysis"||n==="/intelligence/analysis/select"){this.render(nn(),()=>on(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Analyse Individually"});return}if(n.startsWith("/intelligence/analysis/")){const r=n.split("/")[3]||"pacing",u=l.get("from"),h=l.get("scriptId");this.render(cn(r,u,h),()=>dn(r,this.navigate.bind(this),u,h),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Vector Analysis"});return}if(n==="/profile"){const r=l.get("from"),u=l.get("scriptId");this.render(pn(r,u),()=>un(this.navigate.bind(this),r,u),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Account & preferences."});return}if(n==="/profile/collaborators"){const r=l.get("from"),u=l.get("scriptId");this.render(xn(r,u),()=>mn(this.navigate.bind(this),r,u),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Collaborators"});return}if(n==="/notifications"){this.render(fn(),()=>bn(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Notifications",subtitle:"Activity Stream"});return}if(n==="/production"||n==="/pre-production"){const r=l.get("from"),u=l.get("scriptId");this.render(gn(r,u),()=>hn(this.navigate.bind(this),r,u),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Production Workspace & Tools"});return}if(n==="/production/breakdown"){const r=l.get("from"),u=l.get("scriptId");this.render(Sn(r,u),()=>In(this.navigate.bind(this),r,u),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Script Breakdown Workspace"});return}const x=n.match(/^\/production\/scenes(?:\/([a-zA-Z0-9_-]+))?$/);if(x){const r=l.get("from"),u=l.get("scriptId"),h=x[1]||l.get("sceneId");this.render(En(r,u,h),()=>kn(this.navigate.bind(this),r,u,h),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:h?"Scene Details & Logistics":"Scene Hub & Logistics"});return}const p=n.match(/^\/production\/call-sheets(?:\/([a-zA-Z0-9_-]+))?$/);if(p){const r=l.get("from"),u=l.get("scriptId"),h=p[1]||l.get("csId");this.render(Cn(r,u,h),()=>An(this.navigate.bind(this),r,u,h),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:h?"Call Sheet Inspector":"Call Sheets Workspace"});return}if(n==="/production/dialogue-sides"||n==="/production/dialogue-sheets"||n==="/production/sides"){const r=l.get("from"),u=l.get("scriptId");this.render(Tn(r,u),()=>Pn(this.navigate.bind(this),r,u),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Dialogue Sheets & Actor Sides"});return}if(n==="/production/schedule"||n==="/production/stripboard"){const r=l.get("from"),u=l.get("scriptId");this.render($n(r,u),()=>Nn(this.navigate.bind(this),r,u),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Master Shooting Schedule & Stripboard"});return}if(n==="/production/directory"||n==="/production/resources"){const r=l.get("from"),u=l.get("scriptId");this.render(Bn(r,u),()=>Dn(this.navigate.bind(this),r,u),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Production Resource Directory"});return}const d=n.match(/^\/production\/documents(?:\/([a-zA-Z0-9_-]+))?$/);if(d){const r=l.get("from"),u=l.get("scriptId"),h=d[1]||l.get("docId");this.render(Rn(r,u,h),()=>Mn(this.navigate.bind(this),r,u,h),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:h?"Production Document Viewer":"Production Documents Workspace"});return}if(n==="/production/changes"||n==="/production/proposals"){const r=l.get("from"),u=l.get("scriptId");this.render(Ln(r,u),()=>jn(this.navigate.bind(this),r,u),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Production Change Proposals & Approvals"});return}if(n==="/production/history"||n==="/production/timeline"){const r=l.get("from"),u=l.get("scriptId");this.render(On(r,u),()=>_n(this.navigate.bind(this),r,u),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Production Version History & Audit Trail"});return}if(n==="/production/readiness"||n==="/production/validation"){const r=l.get("from"),u=l.get("scriptId");this.render(Hn(r,u),()=>Fn(this.navigate.bind(this),r,u),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Pre-Flight Readiness & Validation"});return}if(n==="/production/storyboard"||n==="/production/storyboards"){const r=l.get("from"),u=l.get("scriptId");this.render(Un(r,u),()=>(this.navigate.bind(this),void 0),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Storyboard Studio"});return}if(n==="/chat"||n==="/ai-chat"||n==="/writer-room"||n==="/ai-writer-room"){this.render(yn(),()=>wn(this.navigate.bind(this)),{activeTab:"chat",sectionTitle:"AI Chat",subtitle:"Universal Assistant"});return}this.renderNotFound(n)}render(t,s,a={}){this.ensureShell();const n=document.getElementById("scriptora-global-header"),o=document.getElementById("scriptora-global-content"),l=document.getElementById("scriptora-global-nav"),i=!!a.isPublic,c=a.activeTab||"workspace",x=a.sectionTitle||"Scriptora",p=a.subtitle||"";if(i?(n&&n.classList.add("hidden"),l&&l.classList.add("hidden")):(n&&!this.isFullScreen&&(n.classList.remove("hidden"),n.innerHTML=de(x,p)),l&&!this.isFullScreen&&(l.classList.remove("hidden"),l.innerHTML=pe(c))),o){let d=t||"";if(d=d.replace(/<header[^>]*data-global-header="true"[^>]*>[\s\S]*?<\/header>/gi,""),d=d.replace(/<header\s+class="fixed\s+top-0\s+w-full\s+z-40\s+pt-safe\s+bg-surface[^>]*>[\s\S]*?<\/header>/gi,""),d=d.replace(/<nav[^>]*data-global-bottom-nav="true"[^>]*>[\s\S]*?<\/nav>/gi,""),d=d.replace(/<nav\s+class="fixed\s+bottom-0\s+w-full\s+z-40\s+pb-safe\s+bg-surface[^>]*>[\s\S]*?<\/nav>/gi,""),o.innerHTML=d,window.scrollTo({top:0,behavior:"instant"}),o.classList.remove("fade-in"),o.offsetWidth,o.classList.add("fade-in"),typeof s=="function")try{s()}catch(r){console.error("Error attaching screen events:",r)}}}renderNotFound(t){this.render(`
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
      `,()=>{const s=document.getElementById("notfound-home");s&&(s.onclick=()=>this.navigate("/workspace"))},{activeTab:"workspace",sectionTitle:"Page Not Found",subtitle:"404"})}}const qn=new Vn;async function vs(){try{await f.init(),qn.init("#app"),window.addEventListener("online",()=>{y("Back online. Synchronizing changes..."),f.refreshScripts(),f.refreshNotifications()}),window.addEventListener("offline",()=>{y("Offline mode active. Edits saved locally.","info")}),console.log("Scriptora initialized successfully in production-ready mode.")}catch(e){console.error("Scriptora bootstrap failed:",e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",vs):vs();
