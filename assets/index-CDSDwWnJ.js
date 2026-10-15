(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=s(a);fetch(a.href,o)}})();const Zs="http://localhost:8000/api";async function _(e,t={}){const s=`${Zs}${e}`,n={headers:{"Content-Type":"application/json",...t.headers},...t};try{const a=await fetch(s,n);if(!a.ok){const o=await a.json().catch(()=>({}));throw new Error(o.error||`HTTP error ${a.status}`)}return await a.json()}catch(a){throw console.warn(`API call ${e} failed, falling back to local store:`,a.message),a}}const Ot=[{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",industry:"International / Hollywood",pages:96,updated:"12m ago",currentScene:"Scene 18",isCurrentDraft:!0,archived:!1,joinCode:"A7K9-XP42",logline:"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.",synopsis:"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves.",context:{format:"Feature",industry:"International / Hollywood",hours:1,minutes:36,seconds:0,plannedDuration:"01:36:00"},analysisScores:{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80}},{id:"the-neon-horizon",title:"The Neon Horizon",draft:"Draft 2.1",genre:"Sci-Fi",format:"Pilot",industry:"Streaming Television",pages:62,updated:"2h ago",currentScene:"Scene 4",isCurrentDraft:!1,archived:!1,joinCode:"N3ON-H0RZ",context:{format:"Pilot",industry:"Streaming Television",hours:0,minutes:52,seconds:0,plannedDuration:"00:52:00"},analysisScores:{overall:79,pacing:75,dialogue:84,emotion:80,characterArc:78,continuity:82,storyStructure:76,theme:88,cinema:83,formatting:90,production:72}},{id:"velvet-shadows",title:"Velvet Shadows",draft:"Draft 1.0",genre:"Noir",format:"Feature",industry:"Independent / Festival",pages:114,updated:"Yesterday",currentScene:"Scene 1",isCurrentDraft:!1,archived:!1,joinCode:"V3LV-SHDW",analysisScores:{overall:81,pacing:80,dialogue:86,emotion:79,characterArc:85,continuity:80,storyStructure:82,theme:84,cinema:88,formatting:92,production:76}},{id:"silent-echoes",title:"Silent Echoes",draft:"Draft 3.0",genre:"Psychological Thriller",format:"Feature",industry:"International / Hollywood",pages:104,updated:"3d ago",currentScene:"Scene 22",isCurrentDraft:!1,archived:!1,joinCode:"SLNT-ECH0",analysisScores:{overall:84,pacing:86,dialogue:81,emotion:88,characterArc:83,continuity:85,storyStructure:89,theme:82,cinema:84,formatting:91,production:78}},{id:"glass-kingdoms",title:"Glass Kingdoms",draft:"Draft 1.4",genre:"Fantasy",format:"Pilot",industry:"Streaming Television",pages:58,updated:"1w ago",currentScene:"Scene 8",isCurrentDraft:!1,archived:!1,joinCode:"GLSS-KNGD",analysisScores:{overall:78,pacing:74,dialogue:80,emotion:76,characterArc:82,continuity:75,storyStructure:80,theme:86,cinema:82,formatting:88,production:70}},{id:"red-shift",title:"Red Shift",draft:"Draft 2.0",genre:"Action",format:"Short",industry:"Independent / Festival",pages:28,updated:"2w ago",currentScene:"Scene 5",isCurrentDraft:!1,archived:!1,joinCode:"RED2-SHFT",analysisScores:{overall:83,pacing:90,dialogue:78,emotion:75,characterArc:80,continuity:88,storyStructure:84,theme:80,cinema:89,formatting:95,production:82}}];async function $s(){try{return(await _("/auth/me")).user}catch{const e=localStorage.getItem("scriptora_user");if(e)try{const s=JSON.parse(e);if(s&&s.displayName)return s}catch{}const t={id:"user-1",name:"Arun Kumar",displayName:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function Qs(e){try{const t=await _("/auth/login",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-1",name:e.email?e.email.split("@")[0]:"Arun Kumar",displayName:e.email?e.email.split("@")[0]:"Arun Kumar",email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Narrative Director",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function en(e={}){try{const t=await _("/auth/login",{method:"POST",body:JSON.stringify({...e,provider:"google"})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t=e.displayName||e.name||(e.email?e.email.split("@")[0]:"Google Filmmaker"),s=t.split(" ").map(a=>a[0]).filter(Boolean).slice(0,2).join("").toUpperCase()||"GF",n={id:e.sub||`google-${Date.now()}`,name:t,displayName:t,email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Film Director",badge:"Member Pro",initials:s,avatar:e.picture||e.photoURL||null,avatarUrl:e.picture||e.photoURL||null,provider:"google",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(n)),n}}async function tn(e){try{const t=await _("/auth/register",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:`user-${Date.now()}`,name:e.name||"New Writer",displayName:e.name||"New Writer",email:e.email||"writer@scriptora.studio",headline:"Screenwriter",badge:"Member Pro",initials:(e.name||"NW").slice(0,2).toUpperCase(),stats:{drafts:1,coAuthors:0,healthIndex:"100%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function sn(e){try{const t=await _("/auth/otp",{method:"POST",body:JSON.stringify({phone:e})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-phone",name:"Verified Writer",displayName:"Verified Writer",headline:"Screenwriter",email:e,badge:"Member Pro",initials:"VW",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function Xt(){try{await _("/auth/logout",{method:"POST"})}catch{}return localStorage.removeItem("scriptora_user"),!0}async function qe(e=""){try{const n=e?`/scripts?q=${encodeURIComponent(e)}`:"/scripts",a=await _(n);if(a.scripts&&a.scripts.length>0)return localStorage.setItem("scriptora_scripts",JSON.stringify(a.scripts)),a.scripts}catch{}const t=localStorage.getItem("scriptora_scripts");let s;if(t)try{s=JSON.parse(t),(!Array.isArray(s)||s.length===0)&&(s=[...Ot],localStorage.setItem("scriptora_scripts",JSON.stringify(s)))}catch{s=[...Ot],localStorage.setItem("scriptora_scripts",JSON.stringify(s))}else s=[...Ot],localStorage.setItem("scriptora_scripts",JSON.stringify(s));return e&&(s=s.filter(n=>n.title.toLowerCase().includes(e.toLowerCase()))),s}async function ss(e){try{const s=await _(`/scripts/${e}`);if(s.script)return s.script}catch{}const t=await qe();return t.find(s=>s.id===e)||Ot.find(s=>s.id===e)||t[0]||null}async function nn(e){try{const a=await _("/scripts",{method:"POST",body:JSON.stringify(e)});if(a.script){const o=await qe();return localStorage.setItem("scriptora_scripts",JSON.stringify([a.script,...o.filter(l=>l.id!==a.script.id)])),a.script}}catch{}const t={id:(e.title||"untitled").toLowerCase().replace(/[^a-z0-9]+/g,"-"),title:e.title||"Untitled Screenplay",draft:"Draft 1.0",genre:e.genre||"Drama",format:e.format||"Feature",industry:e.industry||"International / Hollywood",pages:1,updated:"Just now",currentScene:"Scene 1",joinCode:"SCRP-1001",archived:!1,context:{format:e.format||"Feature",industry:e.industry||"International / Hollywood",hours:1,minutes:30,seconds:0,plannedDuration:"01:30:00"},analysisScores:{overall:80,pacing:78,dialogue:80,emotion:80,characterArc:78,continuity:80,storyStructure:80,theme:80,cinema:80,formatting:90,production:75}},s=await qe(),n=[t,...s.filter(a=>a.id!==t.id)];return localStorage.setItem("scriptora_scripts",JSON.stringify(n)),t}async function an(e,t){try{const a=await _(`/scripts/${e}`,{method:"PUT",body:JSON.stringify(t)});if(a.script){const l=(await qe()).map(i=>i.id===e?a.script:i);return localStorage.setItem("scriptora_scripts",JSON.stringify(l)),a.script}}catch{}const n=(await qe()).map(a=>a.id===e?{...a,...t,updated:"Just now"}:a);return localStorage.setItem("scriptora_scripts",JSON.stringify(n)),{id:e,...t,updated:"Just now"}}async function on(e){try{await _(`/scripts/${e}`,{method:"DELETE"})}catch{}const s=(await qe()).filter(n=>n.id!==e);return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),{success:!0}}async function ln(e){try{const o=await _(`/scripts/${e}/duplicate`,{method:"POST"});if(o.script){const l=await qe();return localStorage.setItem("scriptora_scripts",JSON.stringify([o.script,...l])),o.script}}catch{}const t=await ss(e),s={...t,id:`${e}-copy-${Date.now().toString().slice(-4)}`,title:`${t?.title||"Script"} (Copy)`,updated:"Just now"},n=await qe(),a=[s,...n];return localStorage.setItem("scriptora_scripts",JSON.stringify(a)),s}async function rn(e){try{await _(`/scripts/${e}/archive`,{method:"POST"})}catch{}const s=(await qe()).map(n=>n.id===e?{...n,archived:!0,updated:"Just now"}:n);return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),{success:!0}}const ns={id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pageCount:5,wordCount:14280,titlePage:{title:"CHRONICLES OF DUST",author:"Arun Kumar",contact:"Scriptora Studio · arun.kumar@scriptora.studio · +1 (555) 019-2834",notes:"An original screenplay. Draft 4.2 Production Cut."},settings:{sceneNumbers:!0,sceneNumberSide:"left",smartFormatting:!0,fontSize:"12pt",lineSpacing:"1.5",language:"English"},acts:[{id:"act-1",name:"ACT I - The Broken Siphon"},{id:"act-2",name:"ACT II - The Pressure Surge"},{id:"act-3",name:"ACT III - The Floodgate Standoff"}],characters:["KEVIN","MEERA","HARI","AKASH"],locations:["INT. HOME","INT. PORT AUDIT ROOM","INT. CUSTOMS OFFICE","EXT. FLOODGATE GANTRY"],times:["DAY","NIGHT","CONTINUOUS","DAWN","DUSK","LATER","MORNING","EVENING"],transitions:["CUT TO:","FADE IN:","FADE OUT.","DISSOLVE TO:","SMASH CUT TO:","MATCH CUT TO:","JUMP CUT TO:"],scenes:[{id:"scene-1",number:1,actId:"act-1",slugline:"INT. HOME - EVENING",blocks:[{id:"b-1-1",type:"scene",content:"INT. HOME - EVENING"},{id:"b-1-2",type:"action",content:"There stands a woman."},{id:"b-1-3",type:"character",content:"HARI"},{id:"b-1-4",type:"dialogue",content:"Who is that?"},{id:"b-1-5",type:"character",content:"AKASH"},{id:"b-1-6",type:"dialogue",content:"How do I know?"},{id:"b-1-7",type:"action",content:"Both leaves the place."}]},{id:"scene-4",number:4,actId:"act-1",slugline:"INT. PORT AUDIT ROOM - DAY",blocks:[{id:"b-4-1",type:"scene",content:"INT. PORT AUDIT ROOM - DAY"},{id:"b-4-2",type:"action",content:"Kevin stamps irregular cargo manifests to keep peace with union superiors."},{id:"b-4-3",type:"character",content:"KEVIN"},{id:"b-4-4",type:"dialogue",content:"The manifests are sealed."}]},{id:"scene-18",number:18,actId:"act-2",slugline:"INT. CUSTOMS OFFICE - NIGHT",blocks:[{id:"b-18-1",type:"scene",content:"INT. CUSTOMS OFFICE - NIGHT"},{id:"b-18-2",type:"action",content:"Kevin kneels over the cracked hydro-sensor junction box. Static hiss whispers through the damp comm-link. A lone flicker illuminates the tarnished brass seal."},{id:"b-18-3",type:"action",content:"Water droplets bead along the corroded circuit wires. He slides a copper probe between the connectors."},{id:"b-18-4",type:"character",content:"KEVIN"},{id:"b-18-5",type:"parenthetical",content:"(whispering into comm)"},{id:"b-18-6",type:"dialogue",content:"If the seals break before dawn, the sector won't hold the surge."},{id:"b-18-7",type:"character",content:"MEERA (O.S.)"},{id:"b-18-8",type:"dialogue",content:"Then don't let them break. Reroute the secondary relay through the floodgate breaker."},{id:"b-18-9",type:"transition",content:"CUT TO:"}]}]};async function cn(e){try{const n=await _(`/screenplay/${e}`);if(n.screenplay&&n.screenplay.scenes&&n.screenplay.scenes.length>0)return n.screenplay}catch{}const t=localStorage.getItem(`scriptora_screenplay_${e}`);if(t)try{const n=JSON.parse(t);if(n&&n.scenes&&n.scenes.length>0)return n}catch{}const s=JSON.parse(JSON.stringify(ns));return s.id=e||"script_01",localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(s)),s}async function dn(e,t){localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(t));try{return await _(`/screenplay/${e}`,{method:"PUT",body:JSON.stringify({screenplay:t})})}catch{return{success:!0}}}async function un(e){try{return(await _(`/versions/${e}`)).versions}catch{return[{id:"v-4.2",name:"Draft 4.2",tag:"Current Active",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:"Refined Meera O.S. dialogue and hydro-sensor action line.",isCurrent:!0},{id:"v-3.0",name:"Draft 3.0",tag:"Production Polish",timestamp:"Yesterday, 4:15 PM",author:"JD",stats:"94 pages · 13,950 words",notes:"Incorporated director notes on floodgate transition pacing.",isCurrent:!1},{id:"v-2.0",name:"Draft 2.0",tag:"First Table Read",timestamp:"Oct 12, 2024",author:"JD",stats:"90 pages · 13,200 words",notes:"Table read revision for Acts I & II character arcs.",isCurrent:!1}]}}async function pn(e,t){try{return(await _(`/versions/${e}`,{method:"POST",body:JSON.stringify(t)})).version}catch{return{id:`v-${Date.now()}`,name:t.name,tag:"Milestone Snapshot",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:t.notes||"",isCurrent:!0}}}async function xn(e){try{return(await _(`/collaborators/${e}`)).collaborators}catch{return[{id:"c-1",name:"Heamanth S.",email:"heamanth@studio.com",initials:"HS",role:"Editor",avatarBg:"bg-blue-100 text-blue-700",status:"Active",added:"2d ago"},{id:"c-2",name:"Elena Rostova",email:"elena@cineworks.io",initials:"ER",role:"Script Doctor",avatarBg:"bg-amber-100 text-amber-700",status:"Active",added:"1w ago"},{id:"c-3",name:"Marcus Vance",email:"vance.prod@paramount.com",initials:"MV",role:"Producer",avatarBg:"bg-purple-100 text-purple-700",status:"Viewer",added:"2w ago"}]}}async function fn(e,t){try{return(await _(`/collaborators/${e}/invite`,{method:"POST",body:JSON.stringify(t)})).collaborator}catch{return{id:`c-${Date.now()}`,name:t.email.split("@")[0],email:t.email,initials:t.email.substring(0,2).toUpperCase(),role:t.role==="editor"?"Editor":"Viewer",avatarBg:"bg-emerald-100 text-emerald-700",status:"Active",added:"Just now"}}}async function mn(e,t){try{return await _(`/collaborators/${e}/${t}`,{method:"DELETE"})}catch{return{success:!0}}}async function bn(e){try{return(await _("/join-code/generate",{method:"POST",body:JSON.stringify({scriptId:e})})).joinCode}catch{return Math.random().toString(36).substring(2,6).toUpperCase()+"-"+Math.random().toString(36).substring(2,6).toUpperCase()}}async function gn(e){try{return await _("/join-code/validate",{method:"POST",body:JSON.stringify({code:e})})}catch{return(e||"").toUpperCase().trim()==="A7K9-XP42"?{valid:!0,script:{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",pages:96,collaboratorCount:3}}:{valid:!1,error:"Invalid or expired join code"}}}async function hn(e){try{return await _("/join-code/redeem",{method:"POST",body:JSON.stringify({code:e})})}catch{return{success:!0,scriptId:"chronicles-of-dust",title:"Chronicles of Dust"}}}async function Ps(){try{return await _("/notifications")}catch{return{notifications:[{id:1,sender:"HS",senderName:"Heamanth",type:"collaboration_invite",title:"Heamanth invited you to collaborate",body:'Added you as an Editor on "Chronicles of Dust" (Draft 4.2).',time:"12m ago",group:"today",unread:!0,tags:["Draft 4.2","Role: Editor"],actionLabel:"Review Access →",actionRoute:"/profile/collaborators"},{id:2,sender:"icon:description",type:"export_ready",title:"Your export is ready",body:'"Chronicles of Dust (Draft 4.2)" exported as standard Industry PDF.',time:"45m ago",group:"today",unread:!0,tags:["PDF","96 Pages"],actionLabel:"Open Screenplay →",actionRoute:"/editor/chronicles-of-dust"},{id:3,sender:"AK",senderName:"Arun K.",type:"join_code_request",title:"Join-code access request",body:'Requested Editor access to "Anbin Mozhi" via join-code A7K9-XP42.',time:"2h ago",group:"today",unread:!0,tags:["Code: A7K9-XP42"],actionLabel:"Manage Collaborators →",actionRoute:"/profile/collaborators"}],unreadCount:3}}}async function vn(e){try{return await _(`/notifications/${e}/read`,{method:"POST"})}catch{return{success:!0}}}async function yn(){try{return await _("/notifications/read-all",{method:"POST"})}catch{return{success:!0}}}async function bs(){return(await Ps()).unreadCount||0}async function Wt(e){try{const t=await _("/profile",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.profile)),t.profile}catch{const s={...await $s()||{},...e};if(e.name){const n=e.name.trim().split(/\s+/);s.initials=((n[0]?.[0]||"A")+(n[1]?.[0]||"")).toUpperCase(),s.displayName=e.name}return localStorage.setItem("scriptora_user",JSON.stringify(s)),s}}async function Bs(){try{return(await _("/settings")).settings}catch{const e=localStorage.getItem("scriptora_settings");return e?JSON.parse(e):{editor:{autoSceneHeading:!0,autoCharacter:!0,autoTransition:!0,enterAfterAction:!0,tabAfterAction:!0,autoCapitalize:!0,continueDialogue:!0,showSceneNumbers:!0,lockSceneNumbers:!1,fontSize:"Courier Prime 12pt",lineSpacing:"1.5 line",focusMode:!1},language:"English (US)",appearance:"Light",notifications:{collaborationInvites:!0,collaborationEdits:!0,mentions:!0,versionMilestones:!0},intelligence:{querySuggestions:!0,analysisSuggestions:!0}}}}async function wn(e){try{const t=await _("/settings",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_settings",JSON.stringify(t.settings)),t.settings}catch{const s={...await Bs(),...e};return localStorage.setItem("scriptora_settings",JSON.stringify(s)),s}}async function Sn(e,t){try{return(await _(`/intelligence/${e}/context`,{method:"PUT",body:JSON.stringify(t)})).context}catch{return t}}async function as(e,t){try{return(await _("/intelligence/query",{method:"POST",body:JSON.stringify({query:e,scriptId:t})})).answer}catch{return"Analysis: In this screenplay, scene tempo and dialogue density align with core narrative milestones. Characters express distinct agendas in each beat."}}async function En(e="chronicles-of-dust"){try{const a=await _(`/production/${e}`);if(a?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(a.workspace)),a.workspace}catch{}const t=localStorage.getItem(`scriptora_prod_ws_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=await ss(e),n={id:`prod-ws-${e}`,projectId:"proj-1",projectName:"Badlands Anthology",scriptId:e,screenplayTitle:s?.title||"Chronicles of Dust",pinnedSourceVersion:s?.draft||"Draft 4.2",pinnedSourceVersionHash:"v4.2-snap-88f2",pinnedTimestamp:"12m ago",currentScriptDraft:s?.draft||"Draft 4.2",isStale:!1,mode:localStorage.getItem("scriptora_prod_mode")||"simple",userRole:localStorage.getItem("scriptora_prod_role")||"Owner",roles:["Owner","Director","Assistant Director","Production","Department Member","Viewer"],stats:{totalScenes:18,breakdownElements:78,callSheetsCount:2,shootingDays:14,pendingProposals:2,completedApprovals:6},updatedAt:new Date().toISOString()};return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n)),n}async function In(e,t){try{const n=await _(`/production/${e}/pin`,{method:"POST",body:JSON.stringify({version:t})});if(n?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n.workspace)),n.workspace}catch{}const s=await En(e);return s.pinnedSourceVersion=t,s.pinnedTimestamp="Just now",s.isStale=!1,localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(s)),s}async function os(e="chronicles-of-dust"){try{const a=await _(`/production/${e}/scenes`);if(a?.scenes)return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(a.scenes)),a.scenes}catch{}const t=localStorage.getItem(`scriptora_prod_scenes_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[],n=[{num:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",intExt:"EXT",dayNight:"DAY",p:"4 1/8",comp:"Moderate",day:"Day 1 of 7",cast:["KEVIN","MARCUS"],desc:"Wind whips dust across perimeter chain link. Kevin arrives at customs gate."},{num:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",intExt:"INT",dayNight:"DAY",p:"3 4/8",comp:"Simple",day:"Day 1 of 7",cast:["KEVIN","MEERA"],desc:"Meera analyzes telemetry console indicating illegal pressure drop."},{num:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",intExt:"EXT",dayNight:"DUSK",p:"7 2/8",comp:"Complex",day:"Day 2 of 7",cast:["KEVIN"],desc:"Concrete conduit pipeline across cracked alkali flats during sunset."},{num:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",intExt:"EXT",dayNight:"NIGHT",p:"5 0/8",comp:"Complex",day:"Day 3 of 7",cast:["KEVIN","MEERA"],desc:"Perimeter night patrol with solar rover and surveillance drones."},{num:5,heading:"INT. HYDRAULIC VALVE TUNNEL - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"5 4/8",comp:"Moderate",day:"Day 3 of 7",cast:["KEVIN"],desc:"Rusty underground valves with echoing industrial turbine vibration."},{num:6,heading:"EXT. DESERT SERVICE ROAD - DAY",intExt:"EXT",dayNight:"DAY",p:"5 2/8",comp:"Simple",day:"Day 4 of 7",cast:["KEVIN"],desc:"Kevin tracks tanker tire treads along decommissioned asphalt."},{num:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",intExt:"INT",dayNight:"DAY",p:"6 3/8",comp:"Moderate",day:"Day 5 of 7",cast:["COMMANDER VANCE","KEVIN"],desc:"Vance oversees regional water diversion bank from glass observatory."},{num:8,heading:"EXT. RESERVOIR INTAKE BASIN - DAY",intExt:"EXT",dayNight:"DAY",p:"5 5/8",comp:"Complex",day:"Day 6 of 7",cast:["MEERA"],desc:"Rappelling 60-foot descent down drained concrete spillway."},{num:9,heading:"INT. DRAINAGE VAULT - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"4 1/8",comp:"Moderate",day:"Day 7 of 7",cast:["KEVIN","MEERA"],desc:"Subterranean acoustic surveillance using directional hydrophones."},{num:10,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"2 6/8",comp:"Complex",day:"Day 2 of 7",cast:["KEVIN","MEERA"],desc:"Kevin anchors hydraulic bypass valve kit as high pressure brine seals."}];for(const a of n)s.push({id:`scene-${a.num}`,sceneNumber:a.num,scriptId:e,heading:a.heading,intExt:a.intExt,dayNight:a.dayNight,pages:a.p,complexity:a.comp,shootDay:a.day,status:a.num===4?"Needs Review":"Scheduled",snippet:a.desc,directorNotes:`Director visual notes for ${a.heading}. Maintain high contrast lighting.`,continuityNotes:"Continuity reference logged against Draft 4.2.",cast:a.cast,sidesReady:!0});return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(s)),s}async function kn(e,t){try{const l=await _(`/production/${e}/scenes/${t}`);if(l?.scene)return l.scene}catch{}const n=(await os(e)).find(l=>l.id===t||String(l.sceneNumber)===String(t));if(!n)return null;const o=(await Je(e)).filter(l=>l.sceneId===n.id||l.sceneNumber===n.sceneNumber||Array.isArray(l.scenes)&&l.scenes.includes(n.sceneNumber));return{...n,elements:o}}async function Cn(e,t,s){try{const o=await _(`/production/${e}/scenes/${t}`,{method:"PUT",body:JSON.stringify(s)});if(o?.scene)return o.scene}catch{}const n=await os(e),a=n.find(o=>o.id===t||String(o.sceneNumber)===String(t));return a?(Object.assign(a,s),localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(n)),a):s}async function Je(e="chronicles-of-dust",t=null,s=null){try{const o=new URLSearchParams;t&&o.set("category",t),s&&o.set("scene",s);const l=o.toString()?`?${o.toString()}`:"",i=await _(`/production/${e}/breakdown${l}`);if(i?.breakdown)return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(i.breakdown)),i.breakdown}catch{}const n=localStorage.getItem(`scriptora_prod_breakdown_${e}`);let a=[];if(n)try{a=JSON.parse(n)}catch{}if(a.length||(a=[{id:"elem-1",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[1,2,4,18],category:"Cast",name:"KEVIN",characterRole:"Discredited hydro-engineer, 30s. Hero protagonist.",description:"Discredited hydro-engineer, 30s. Hero protagonist.",assignedActor:"Dev Patel",castingStatus:"Confirmed Cast",actorAvailability:"Available Shoot Days 1-14",appearancesCount:4,sourceSnippet:"Kevin kneels over cracked hydro-sensor junction box, static hissing from the diagnostic speaker.",originalAiSuggestion:"KEVIN — Discredited hydro-engineer, 30s. Hero protagonist.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Requires desert dust protective gear and waterproof boots."},{id:"elem-2",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[4,16,18],category:"Cast",name:"MEERA",characterRole:"Field operative with tactical harness.",description:"Field operative with tactical harness.",assignedActor:"Zoe Saldana",castingStatus:"Confirmed Cast",actorAvailability:"Available Shoot Days 4-18",appearancesCount:3,sourceSnippet:"Meera anchors her cable to the iron pylon, visor reflecting the rising floodwaters below.",originalAiSuggestion:"MEERA — Field operative with tactical harness.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Tactical harness fitted for scene 18 valve climb."},{id:"elem-3",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Props",name:"Hydraulic Bypass Valve Kit",description:"Custom machined valve kit with functional digital LED pressure display.",sourcingType:"Hero Prop Built",quantity:"1 Hero + 2 Stunt Duplicates",readinessStatus:"Ready in Art Dept",continuityNotes:"Clean in Sc 1, weathered with grease in Sc 18",sourceSnippet:"Kevin clicks the bypass manifold into place. The gauge needles spike red.",originalAiSuggestion:"Hydraulic Bypass Valve Kit — machined valve kit with LED display.",status:"Confirmed",isHumanConfirmed:!0,confidence:.95,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero prop constructed by art department; 2 stunt duplicates on standby."},{id:"elem-4",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Practical FX",name:"High-Pressure Water Spray",description:"Controlled water burst simulating cracked pipe joint failure.",requiredResources:"Dedicated 4000L Water Tanker, 120 PSI Pump Rig",technicalRequirements:"Safe water containment basins, electrical shut-off triggers",safetyNotes:"Non-slip decking mandatory; waterproof protective ponchos for camera crew",prepStatus:"Rig Test Scheduled",sourceSnippet:"A burst of pressurized brine shoots from the seam, blinding the chamber.",originalAiSuggestion:"High-Pressure Water Spray — Controlled water burst simulating cracked pipe failure.",status:"Needs Review",isHumanConfirmed:!1,confidence:.88,confirmedBy:null,confirmedAt:null,notes:"SFX coordinator requested dedicated water truck standby via Proposal #prop-1."},{id:"elem-5",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Stunts",name:"Valve Pylon Cable Rappel",description:"Meera swings 18 feet across open valve chasm to catch emergency release lever.",coordinationRequirements:"18ft wire pendulum rig, decelerator line, safety crash matting",qualifiedPersonnel:"Stunt Double: Tara Sen / Stunt Coordinator: Roy Hall",safetyPlanningStatus:"Awaiting Coordinator Review",sourceSnippet:"Meera kicks off the catwalk, swinging into the spray as the iron cable groans.",originalAiSuggestion:"Valve Pylon Cable Rappel — 18ft swing across chasm to catch lever.",status:"Needs Review",isHumanConfirmed:!1,confidence:.92,confirmedBy:null,confirmedAt:null,notes:"Awaiting Stunt Coordinator risk assessment and harness certification."},{id:"elem-13",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Locations",name:"Sub-Level Hydro-Chamber B",description:"Industrial concrete pumping cavern with rusty iron catwalks.",context:"INT.",lighting:"NIGHT",locationStatus:"Secured & Permitted",accessDetails:"Permit #WTR-994, Access via Gate 4 Service Tunnel",sourceSnippet:"INT. HYDRO-CHAMBER B - NIGHT. Rust-eaten steel catwalks suspend over deep abyss.",originalAiSuggestion:"Sub-Level Hydro-Chamber B — Concrete pumping cavern with catwalks.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Acoustic echo requires directional shotgun mics; non-slip floor treatment applied."},{id:"elem-6",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Costumes",name:"Kevin — Weathered Dust Coat & Respirator",character:"KEVIN",description:"Heavy canvas duster coat, solar respirator around neck.",wardrobeRequirements:"Duster coat with distressed seam stitching, respirator with worn elastic straps",continuityChanges:"Costume Stage 1 (Desert Dust / Dry)",prepStatus:"Fitted & Approved",sourceSnippet:"KEVIN (30s), sun-scoured and weary, adjusts his solar filter.",originalAiSuggestion:"Kevin — Duster coat, respirator around neck.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Costume fitting complete with wardrobe dept."},{id:"elem-7",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Cast",name:"MARCUS",characterRole:"Border outpost security guard.",description:"Border outpost security guard.",assignedActor:"Unassigned (Auditioning)",castingStatus:"Auditioning",actorAvailability:"Day 1 Shoot Only",appearancesCount:1,sourceSnippet:"MARCUS leans against the chain link, tapping an unlit cigarette against his wrist.",originalAiSuggestion:"MARCUS — Border outpost security guard.",status:"Confirmed",isHumanConfirmed:!0,confidence:.98,confirmedBy:"Elena Rostova",confirmedAt:"2026-10-13T16:00:00Z",notes:"Supporting role. Day 1 shoot only."},{id:"elem-8",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Props",name:"Solar Filter Dust Goggles",description:"Tinted goggles with worn leather straps.",sourcingType:"Hero Wardrobe Prop",quantity:"2 Pairs (A & B Camera)",readinessStatus:"Ready in Art Dept",continuityNotes:"Worn over eyes during wind gusts, rest on forehead indoors",sourceSnippet:"Kevin pulls the goggles over his eyes as a gust hits.",originalAiSuggestion:"Solar Filter Dust Goggles — Tinted goggles with worn leather straps.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero wardrobe prop."},{id:"elem-9",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Vehicles",name:"Solar Patrol Rover (Modified)",description:"Lightweight dune rover fitted with dual photovoltaic roof panels.",availability:"On Set Shoot Days 1 & 2",operationalRequirements:"Charging station in Base Camp, Art Dept weathering wrap",prepStatus:"Checked In & Inspected",sourceSnippet:"The rover sits idling beside Gate 4, suspension coated in red grit.",originalAiSuggestion:"Solar Patrol Rover (Modified) — Dune rover with dual photovoltaic roof panels.",status:"Confirmed",isHumanConfirmed:!0,confidence:.96,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Picture vehicle running on electric battery. Backup battery pack required."},{id:"elem-10",scriptId:e,sceneId:"scene-4",sceneNumber:4,scenes:[4],category:"Props",name:"Night-Vision Monocular Scope",description:"Military grade digital thermal optics.",sourcingType:"Rented",quantity:"1 Unit",readinessStatus:"Sourcing",continuityNotes:"Handheld by Meera on perimeter wall",sourceSnippet:"Meera scans the wire with her thermal monocle. Three glowing silhouettes freeze.",originalAiSuggestion:"Night-Vision Monocular Scope — Military grade digital thermal optics.",status:"Needs Review",isHumanConfirmed:!1,confidence:.85,confirmedBy:null,confirmedAt:null,notes:"Rental request pending vendor confirmation."},{id:"elem-11",scriptId:e,sceneId:"scene-7",sceneNumber:7,scenes:[7],category:"Cast",name:"COMMANDER VANCE",characterRole:"Antagonist, regional water syndicate director.",description:"Antagonist, regional water syndicate director.",assignedActor:"Michael Shannon",castingStatus:"Offer Out",actorAvailability:"Hold Oct 20-24",appearancesCount:2,sourceSnippet:"COMMANDER VANCE (50s), tailored gray linen, stands over the telemetry terminal.",originalAiSuggestion:"COMMANDER VANCE — Antagonist, regional water syndicate director.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Cast confirmed. Costume fitting scheduled Oct 20."},{id:"elem-12",scriptId:e,sceneId:"scene-16",sceneNumber:16,scenes:[16],category:"Practical FX",name:"Catwalk Rain Towers",description:"Simulated industrial torrential flood conditions on exterior catwalk.",requiredResources:"3 Overhead Rain Spars, 2 Fire Hydrant Ties",technicalRequirements:"Runoff water deflection channeling away from electrical stage lines",safetyNotes:"Safety harnesses mandatory on exterior catwalk scaffolding",prepStatus:"Pending Proposal Approval",sourceSnippet:"Water cascades down the spillway faces like Niagara.",originalAiSuggestion:"Catwalk Rain Towers — Simulated flood conditions on exterior catwalk.",status:"Needs Review",isHumanConfirmed:!1,confidence:.9,confirmedBy:null,confirmedAt:null,notes:"Requires environmental containment permits."}],localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(a))),t&&t!=="all"&&(a=a.filter(o=>o.category.toLowerCase()===t.toLowerCase())),s&&s!=="all"){const o=Number(String(s).replace("scene-",""));a=a.filter(l=>l.sceneId===s||String(l.sceneNumber)===String(s)||Array.isArray(l.scenes)&&l.scenes.includes(o)||l.sceneNumber===o)}return a}async function Mt(e,t,s){try{const o=await _(`/production/${e}/breakdown/${t}`,{method:"PUT",body:JSON.stringify(s)});if(o?.item){const l=await Je(e),i=l.findIndex(c=>c.id===t);return i!==-1&&(l[i]=o.item,localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(l))),o.item}}catch{}const n=await Je(e),a=n.find(o=>o.id===t);return a?((s.name&&s.name!==a.name||s.description&&s.description!==a.description)&&(a.userCorrection={previousName:a.name,previousDesc:a.description,correctedBy:"Arun Kumar (Owner)",correctedAt:new Date().toISOString()}),Object.assign(a,s),s.status==="Confirmed"?(a.isHumanConfirmed=!0,a.confirmedBy="Arun Kumar (Owner)",a.confirmedAt=new Date().toISOString()):s.status==="Needs Review"&&(a.isHumanConfirmed=!1),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(n)),a):s}async function An(e,t){try{const a=await _(`/production/${e}/breakdown/${t}`,{method:"DELETE"});if(a?.success){const l=(await Je(e)).filter(i=>i.id!==t);return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(l)),a}}catch{}const n=(await Je(e)).filter(a=>a.id!==t);return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(n)),{success:!0,removedId:t}}async function Tn(e,t){try{const o=await _(`/production/${e}/breakdown`,{method:"POST",body:JSON.stringify(t)});if(o?.item){const l=await Je(e);return l.unshift(o.item),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(l)),o.item}}catch{}const s=await Je(e),n=Number(t.sceneNumber||(t.sceneId?String(t.sceneId).replace("scene-",""):18)),a={id:`elem-${Date.now()}`,scriptId:e,sceneId:t.sceneId||`scene-${n}`,sceneNumber:n,scenes:t.scenes||[n],category:t.category||"Props",name:t.name,description:t.description||"",sourceSnippet:t.sourceSnippet||"User added manual item",originalAiSuggestion:null,status:t.status||"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:new Date().toISOString(),notes:t.notes||"",assignedActor:t.assignedActor||"",castingStatus:t.castingStatus||"Uncast / Open",actorAvailability:t.actorAvailability||"",characterRole:t.characterRole||t.description||"",context:t.context||"INT.",lighting:t.lighting||"DAY",locationStatus:t.locationStatus||"Secured & Permitted",accessDetails:t.accessDetails||"",sourcingType:t.sourcingType||"Sourced",quantity:t.quantity||"1",readinessStatus:t.readinessStatus||"Ready in Art Dept",continuityNotes:t.continuityNotes||"",requiredResources:t.requiredResources||"",technicalRequirements:t.technicalRequirements||"",safetyNotes:t.safetyNotes||"",coordinationRequirements:t.coordinationRequirements||"",qualifiedPersonnel:t.qualifiedPersonnel||"",safetyPlanningStatus:t.safetyPlanningStatus||"Awaiting Coordinator Review",character:t.character||"",wardrobeRequirements:t.wardrobeRequirements||"",continuityChanges:t.continuityChanges||"",prepStatus:t.prepStatus||"In Prep",availability:t.availability||"",operationalRequirements:t.operationalRequirements||""};return s.unshift(a),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(s)),a}async function ut(e="chronicles-of-dust"){try{const n=await _(`/production/${e}/call-sheets`);if(n?.callSheets)return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n.callSheets)),n.callSheets}catch{}const t=localStorage.getItem(`scriptora_prod_callsheets_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"cs-1",scriptId:e,callSheetNumber:"01",shootDay:"Day 1 of 7",shootDate:"Saturday, Oct 24, 2026",generalCrewCall:"06:00 AM",shootingCall:"06:30 AM",breakfastTime:"05:15 AM",estimatedWrap:"06:30 PM",status:"Confirmed",isPublished:!0,version:"v1.0",locationName:"Mojave Outpost Gate 4",locationAddress:"Perimeter Road 9, Cantil, CA 93519",parkingNotes:"Crew parking at Basecamp Lot B (1/4 mile west of gate). Shuttle runs every 10 mins.",nearestHospital:"Kern Valley Healthcare District, 6412 Laurel Ave, Lake Isabella, CA (Ph: 760-379-2681)",weatherSummary:"Sunny, 74°F high, 48°F low. Winds WNW 10-15 mph. Dust advisory after 4:00 PM.",scenes:[{sceneNumber:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",pages:"4 1/8",cast:["KEVIN","MARCUS"],desc:"Kevin arrives at border gate, inspection with Marcus."},{sceneNumber:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",pages:"3 4/8",cast:["KEVIN","MEERA"],desc:"Kevin discovers pressure loss on telemetry terminal."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MARCUS",actor:"David Chen",pickup:"05:15 AM",hmuCall:"05:45 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MEERA",actor:"Priya Sharma",pickup:"08:30 AM",hmuCall:"09:00 AM",onSet:"10:30 AM",status:"Confirmed"}],specialInstructions:"Eye protection mandatory for all crew on exterior perimeter due to afternoon dust squall.",approvedBy:"Arun Kumar (Owner)",publishedAt:"2026-10-14T08:00:00Z"},{id:"cs-2",scriptId:e,callSheetNumber:"02",shootDay:"Day 2 of 7",shootDate:"Sunday, Oct 25, 2026",generalCrewCall:"06:30 AM",shootingCall:"07:00 AM",breakfastTime:"05:45 AM",estimatedWrap:"07:00 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:"Pumping Station Chamber B",locationAddress:"Aqueduct District Facility 4, Mojave, CA 93501",parkingNotes:"Basecamp parking inside Gate 2 secure compound. Security clearance badge required.",nearestHospital:"Antelope Valley Medical Center, 1600 W Ave J, Lancaster, CA (Ph: 661-949-5000)",weatherSummary:"Interior stage / sheltered facility. Ambient temp 68°F. Hearing protection mandatory.",scenes:[{sceneNumber:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",pages:"7 2/8",cast:["KEVIN"],desc:"Kevin examines exterior tap line."},{sceneNumber:10,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",pages:"2 6/8",cast:["KEVIN","MEERA"],desc:"High water pressure valve breach and cable clamp."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"},{character:"MEERA",actor:"Priya Sharma",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"}],specialInstructions:"Wet set protocols in effect for Scene 10. Waterproof camera housing and electrical GFI circuits required.",approvedBy:null,publishedAt:null}];return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),s}async function gs(e,t){try{const n=await _(`/production/${e}/call-sheets/${t}`);if(n?.callSheet)return n.callSheet}catch{}return(await ut(e)).find(n=>n.id===t)||null}async function Nn(e,t){try{const a=await _(`/production/${e}/call-sheets`,{method:"POST",body:JSON.stringify(t)});if(a?.callSheet)return a.callSheet}catch{}const s=await ut(e),n={id:`cs-${Date.now()}`,scriptId:e,callSheetNumber:String(s.length+1).padStart(2,"0"),shootDay:t.shootDay||`Day ${s.length+1} of 14`,shootDate:t.shootDate||"Monday, Oct 26, 2026",generalCrewCall:t.generalCrewCall||"06:00 AM",shootingCall:t.shootingCall||"06:30 AM",breakfastTime:t.breakfastTime||"05:15 AM",estimatedWrap:t.estimatedWrap||"06:30 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:t.locationName||"Location TBD",locationAddress:t.locationAddress||"TBD",parkingNotes:t.parkingNotes||"Crew parking guidelines.",nearestHospital:t.nearestHospital||"Desert Care Network Regional, Palm Springs, CA",weatherSummary:t.weatherSummary||"Forecast pending.",scenes:t.scenes||[{sceneNumber:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",pages:"5 0/8",cast:["KEVIN","MEERA"],desc:"Perimeter fence inspection."}],castCalls:t.castCalls||[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Draft"}],specialInstructions:t.specialInstructions||"Standard safety directives.",approvedBy:null,publishedAt:null};return s.push(n),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),n}async function $n(e,t,s){try{const o=await _(`/production/${e}/call-sheets/${t}`,{method:"PUT",body:JSON.stringify(s)});if(o?.callSheet)return o.callSheet}catch{}const n=await ut(e),a=n.find(o=>o.id===t);return a?(Object.assign(a,s),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n)),a):s}async function Pn(e,t){try{const a=await _(`/production/${e}/call-sheets/${t}/publish`,{method:"POST"});if(a?.callSheet)return a.callSheet}catch{}const s=await ut(e),n=s.find(a=>a.id===t);return n?(n.status="Confirmed",n.isPublished=!0,n.version="v1.0 (Snapshot)",n.approvedBy="Arun Kumar (Owner)",n.publishedAt=new Date().toISOString(),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),n):null}async function Fe(e="chronicles-of-dust"){try{const n=await _(`/production/${e}/schedule`);if(n?.schedule)return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(n.schedule)),n.schedule}catch{}const t=localStorage.getItem(`scriptora_prod_schedule_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{dayNumber:1,date:"Oct 24, 2026",title:"Outpost Perimeter & Shed",location:"Mojave Gate 4",sceneNumbers:[1,2],totalPages:"7 5/8",estHours:10.5,companyMoves:0,isLocked:!0,status:"Confirmed"},{dayNumber:2,date:"Oct 25, 2026",title:"Lakebed Conduit & Chamber B",location:"Chamber B Dry Tank",sceneNumbers:[3,10],totalPages:"10 0/8",estHours:11,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:3,date:"Oct 26, 2026",title:"Perimeter Fence & Valve Tunnel",location:"Perimeter Sector 9",sceneNumbers:[4,5],totalPages:"10 4/8",estHours:11.5,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:4,date:"Oct 27, 2026",title:"Service Road Pursuit",location:"Route 66 Cutoff",sceneNumbers:[6],totalPages:"5 2/8",estHours:8,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:5,date:"Oct 28, 2026",title:"Syndicate Regional Control",location:"Syndicate Regional HQ",sceneNumbers:[7],totalPages:"6 3/8",estHours:9,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:6,date:"Oct 29, 2026",title:"Reservoir Intake Rappel",location:"Lake Mead Dry Spillway",sceneNumbers:[8],totalPages:"5 5/8",estHours:10,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:7,date:"Oct 30, 2026",title:"Drainage Sub-vaults & Wrap",location:"Vault Sub-structure 3",sceneNumbers:[9],totalPages:"4 1/8",estHours:8.5,companyMoves:0,isLocked:!1,status:"Draft"}];return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(s)),s}async function Bt(e,t,s){try{const o=await _(`/production/${e}/schedule/day/${t}`,{method:"PUT",body:JSON.stringify(s)});if(o?.day)return o.day}catch{}const n=await Fe(e),a=n.find(o=>o.dayNumber===Number(t));return a?(Object.assign(a,s),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(n)),a):s}async function hs(e,t,s,n){const a=await Fe(e),o=a.find(i=>i.dayNumber===Number(s)),l=a.find(i=>i.dayNumber===Number(n));return!o||!l||(o.sceneNumbers=(o.sceneNumbers||[]).filter(i=>i!==Number(t)),(l.sceneNumbers||[]).includes(Number(t))||(l.sceneNumbers=[...l.sceneNumbers||[],Number(t)]),await Bt(e,s,{sceneNumbers:o.sceneNumbers}),await Bt(e,n,{sceneNumbers:l.sceneNumbers})),a}async function vs(e,t,s){return await Bt(e,t,{sceneNumbers:s})}async function ys(e,t){try{const a=await _(`/production/${e}/call-sheets/${t}`,{method:"DELETE"});if(a?.success){const l=(await ut(e)).filter(i=>i.id!==t);return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(l)),a}}catch{}const n=(await ut(e)).filter(a=>a.id!==t);return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n)),{success:!0,removedId:t}}async function Bn(e,t){try{const o=await _(`/production/${e}/schedule/day`,{method:"POST",body:JSON.stringify(t)});if(o?.day){const l=await Fe(e);return l.push(o.day),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(l)),o.day}}catch{}const s=await Fe(e),n=s.length>0?Math.max(...s.map(o=>o.dayNumber))+1:1,a={dayNumber:t.dayNumber||n,date:t.date||`Nov ${String(n).padStart(2,"0")}, 2026`,title:t.title||`Shoot Day ${n}`,location:t.location||"Location TBD",sceneNumbers:t.sceneNumbers||[],totalPages:t.totalPages||"0 0/8",estHours:t.estHours||8,companyMoves:t.companyMoves||0,isLocked:!1,status:"Draft"};return s.push(a),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(s)),a}async function Dn(e,t){const s=Number(t);try{const o=await _(`/production/${e}/schedule/day/${s}`,{method:"DELETE"});if(o?.success){const i=(await Fe(e)).filter(c=>c.dayNumber!==s);return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(i)),o}}catch{}const a=(await Fe(e)).filter(o=>o.dayNumber!==s);return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(a)),{success:!0,removedDayNumber:s}}class Rn{constructor(){this.state={currentUser:null,selectedScriptId:localStorage.getItem("scriptora_selected_script")||"chronicles-of-dust",selectedVersionId:"Draft 4.2",currentSceneId:18,unreadNotifications:3,scripts:[],activeScript:null,screenplay:null,settings:null,historyStack:[]},this.listeners=new Set}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(const t of this.listeners)try{t(this.state)}catch(s){console.error("Store listener error:",s)}}setState(t){this.state={...this.state,...t},t.selectedScriptId&&localStorage.setItem("scriptora_selected_script",t.selectedScriptId),this.notify()}pushHistory(t){this.state.historyStack[this.state.historyStack.length-1]!==t&&this.state.historyStack.push(t)}getPreviousRoute(t="/workspace"){return this.state.historyStack.length>0?this.state.historyStack.pop():t}peekPreviousRoute(t="/workspace"){return this.state.historyStack.length>0?this.state.historyStack[this.state.historyStack.length-1]:t}async init(){try{const t=await $s(),s=await qe(),n=await bs(),a=await Bs(),o=s.find(l=>l.id===this.state.selectedScriptId)||s[0];this.setState({currentUser:t,scripts:s,activeScript:o,unreadNotifications:n,settings:a})}catch(t){console.error("Init store error:",t)}}async selectScript(t){const s=this.state.scripts.find(n=>n.id===t)||await ss(t);this.setState({selectedScriptId:t,activeScript:s})}async refreshNotifications(){const t=await bs();this.setState({unreadNotifications:t})}async refreshScripts(){const t=await qe(),s=t.find(n=>n.id===this.state.selectedScriptId)||t[0];this.setState({scripts:t,activeScript:s})}}const y=new Rn,Mn="/Scriptora/assets/logo-BG9jZ7UG.png",ls=Mn;function Be(e="Workspace",t="Your writing space."){const s=y.state.unreadNotifications,n=y.state.currentUser?.initials||"JD";return`
    <header class="fixed top-0 left-0 right-0 w-full z-40 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-surface-container-high/60 select-none" data-global-header="true">
      <div class="h-14 px-4 flex items-center justify-between max-w-2xl mx-auto">
        <a href="/workspace" class="flex items-center gap-2.5 min-w-0 no-underline text-inherit cursor-pointer active:opacity-80 transition-opacity">
          <img src="${ls}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora" class="w-8 h-8 object-contain shrink-0" />
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
            ${y.state.currentUser?.avatarUrl?`
              <img src="${y.state.currentUser.avatarUrl}" class="w-full h-full object-cover" alt="Profile" />
            `:`
              <span>${n}</span>
            `}
          </a>
        </div>
      </div>
    </header>
  `}function Te(e="workspace"){const t=e==="workspace",s=e==="intelligence",n=e==="chat"||e==="ai-chat",a=e==="production"||e==="pre-production",o=e==="profile";return`
    <nav class="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container-high/60 overflow-visible select-none" data-global-bottom-nav="true" id="scriptora-bottom-nav">
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
            class="group relative flex items-center justify-center w-12 h-12 rounded-[16px] -translate-y-3.5 transition-all duration-200 select-none ${n?"bg-blue-600 text-white ring-4 ring-blue-100/90 border border-blue-500 shadow-[0_6px_16px_rgba(37,99,235,0.35)] scale-105":"bg-white text-blue-600 ring-4 ring-surface/95 border border-blue-200/90 shadow-[0_4px_12px_rgba(33,81,218,0.14),0_1px_3px_rgba(0,0,0,0.04)] hover:bg-blue-50/80 hover:border-blue-300 hover:shadow-[0_6px_16px_rgba(33,81,218,0.20)] hover:-translate-y-4 active:scale-95 active:bg-blue-100"} focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
            id="nav-tab-chat"
            aria-label="AI Chat"
            title="AI Chat — Universal Assistant"
          >
            <span class="material-symbols-outlined text-[23px] transition-transform group-hover:scale-105" ${n?`style="font-variation-settings: 'FILL' 1;"`:""}>chat_bubble</span>
          </a>
        </div>

        <!-- 4. Pre-Production Tab (4th position) -->
        <a href="/production" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${a?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-production" aria-label="Pre-Production" title="Pre-Production">
          <span class="material-symbols-outlined text-[22px]" ${a?`style="font-variation-settings: 'FILL' 1;"`:""}>movie_creation</span>
          <span class="text-[10.5px] font-medium mt-0.5 leading-none">Production</span>
          ${a?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':'<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

        <!-- 5. Profile Tab -->
        <a href="/profile" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${o?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-profile" aria-label="Profile" title="Profile">
          <span class="material-symbols-outlined text-[22px]" ${o?`style="font-variation-settings: 'FILL' 1;"`:""}>account_circle</span>
          <span class="text-[10.5px] font-medium mt-0.5 leading-none">Profile</span>
          ${o?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':'<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

      </div>
    </nav>
  `}function Ln(e="workspace"){const t=document.getElementById("scriptora-bottom-nav");return t?(t.outerHTML=Te(e),!0):!1}function w(e,t="success"){const s=document.getElementById("global-toast"),n=document.getElementById("toast-message"),a=document.getElementById("toast-icon");if(!s||!n){console.log(`[Toast ${t}]`,e);return}n.textContent=e,a&&(t==="error"?(a.textContent="error",a.className="material-symbols-outlined text-[18px] text-red-400"):t==="info"?(a.textContent="info",a.className="material-symbols-outlined text-[18px] text-blue-300"):(a.textContent="check_circle",a.className="material-symbols-outlined text-[18px] text-emerald-300")),s.classList.remove("opacity-0","pointer-events-none"),s.classList.add("opacity-100"),clearTimeout(s._timeout),s._timeout=setTimeout(()=>{s.classList.remove("opacity-100"),s.classList.add("opacity-0","pointer-events-none")},2400)}function On(){return`
    <main class="flex flex-col relative w-full pt-safe pb-safe bg-surface min-h-screen justify-center items-center px-4">
      <div class="flex flex-col w-full max-w-sm py-8 fade-in">
        <!-- Brand & Logo Header -->
        <header class="flex flex-col items-center justify-center pb-4 text-center">
          <img src="${ls}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-16 h-16 object-contain mb-3 drop-shadow-sm" />
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
  `}function jn(e){const t=document.getElementById("tab-signin"),s=document.getElementById("tab-register"),n=document.getElementById("tab-otp"),a=document.getElementById("flow-signin"),o=document.getElementById("flow-register"),l=document.getElementById("flow-otp");function i(I){[t,s,n].forEach(k=>{k.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 text-on-surface-variant hover:text-on-surface"}),[a,o,l].forEach(k=>k.classList.add("hidden")),I==="signin"?(t.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",a.classList.remove("hidden")):I==="register"?(s.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",o.classList.remove("hidden")):I==="otp"&&(n.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold flex items-center justify-center gap-1",l.classList.remove("hidden"))}t&&(t.onclick=()=>i("signin")),s&&(s.onclick=()=>i("register")),n&&(n.onclick=()=>i("otp"));const c=document.getElementById("toggle-pw-signin"),u=document.getElementById("signin-password");c&&u&&(c.onclick=()=>{const I=u.type==="password";u.type=I?"text":"password",c.innerHTML=`<span class="material-symbols-outlined text-[18px]">${I?"visibility_off":"visibility"}</span>`});function p(I){try{const T=I.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),E=decodeURIComponent(atob(T).split("").map(F=>"%"+("00"+F.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(E)}catch{return null}}const x=document.getElementById("btn-google-login"),r="756924881120-0qngpm230nq3k8bb61ttt1de7jv28fui.apps.googleusercontent.com";let d=null;async function b(I){w("Connecting with Google...");try{const k=await en(I);y.setState({currentUser:k}),w(`Welcome back, ${k.displayName||k.name}`),e("/welcome")}catch(k){w(k.message||"Google sign-in error","error")}}function f(){if(window.google?.accounts?.id&&r)try{window.google.accounts.id.initialize({client_id:r,callback:async I=>{if(I&&I.credential){const k=p(I.credential)||{};await b({token:I.credential,email:k.email,name:k.name,displayName:k.name,picture:k.picture,sub:k.sub,provider:"google"})}},auto_select:!1,cancel_on_tap_outside:!0})}catch(I){console.warn("Google One Tap setup note:",I)}if(window.google?.accounts?.oauth2&&r)try{d=window.google.accounts.oauth2.initTokenClient({client_id:r,scope:"email profile openid",callback:async I=>{if(I&&I.access_token){w("Retrieving Google profile...");try{const T=await(await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${I.access_token}`}})).json();await b({token:I.access_token,email:T.email,name:T.name,displayName:T.name,picture:T.picture,sub:T.sub,provider:"google"})}catch(k){console.warn("Google userinfo fetch note:",k),await b({token:I.access_token,provider:"google"})}}}})}catch(I){console.warn("Google OAuth token client setup note:",I)}}f(),x&&(x.onclick=async()=>{if(!d&&window.google&&f(),d)try{d.requestAccessToken({prompt:"select_account"});return}catch(I){console.warn("Token client request error, trying prompt:",I)}if(window.google?.accounts?.id)try{window.google.accounts.id.prompt(I=>{(I.isNotDisplayed()||I.isSkippedMoment())&&(console.log("GIS prompt not displayed:",I.getNotDisplayedReason()),b({email:"arun.kumar@scriptora.studio",name:"Arun Kumar",displayName:"Arun Kumar",provider:"google"}))});return}catch(I){console.warn("GIS prompt error:",I)}await b({email:"arun.kumar@scriptora.studio",name:"Arun Kumar",displayName:"Arun Kumar",provider:"google"})});const v=document.getElementById("form-signin");v&&(v.onsubmit=async I=>{I.preventDefault();const k=document.getElementById("signin-email").value,T=u.value;try{const E=await Qs({email:k,password:T});y.setState({currentUser:E}),w(`Welcome back, ${E.displayName||E.name}`),e("/welcome")}catch(E){w(E.message,"error")}});const g=document.getElementById("form-register");g&&(g.onsubmit=async I=>{I.preventDefault();const k=document.getElementById("reg-name").value,T=document.getElementById("reg-email").value,E=document.getElementById("reg-password").value;try{const F=await tn({name:k,email:T,password:E});y.setState({currentUser:F}),w("Account created successfully"),e("/welcome")}catch(F){w(F.message,"error")}});const $=document.getElementById("form-otp");$&&($.onsubmit=async I=>{I.preventDefault();const k=document.getElementById("otp-phone").value;try{const T=await sn(k);y.setState({currentUser:T}),w("Phone verified successfully"),e("/welcome")}catch(T){w(T.message,"error")}});const M=document.getElementById("btn-forgot-pw");M&&(M.onclick=()=>{w("Password reset link sent to registered email","info")})}function Fn(){return y.state.currentUser,`
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
          <img src="${ls}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-20 h-20 object-contain mb-5 drop-shadow-sm" />

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
  `}function _n(e){const t=document.getElementById("welcome-sign-out");t&&(t.onclick=async()=>{await Xt(),y.setState({currentUser:null}),w("Signed out successfully"),e("/auth")})}function Hn(){const e=y.state.scripts||[],t=e.find(n=>n.isCurrentDraft)||e[0],s=e.slice(0,3);return`
    ${Be("Workspace","Your writing space.")}

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

    ${Te("workspace")}
  `}function Un(e){let t=null;const s=document.getElementById("btn-continue-writing");s&&(s.onclick=()=>{const r=s.getAttribute("data-script-id");y.selectScript(r),e(`/editor/${r}?scene=18`)}),document.querySelectorAll(".script-item-row").forEach(r=>{r.onclick=d=>{if(d.target.closest(".script-more-btn"))return;const b=r.getAttribute("data-script-id");y.selectScript(b),e(`/editor/${b}`)}});const n=document.getElementById("screenplay-search");n&&(n.oninput=r=>{const d=r.target.value.toLowerCase().trim();document.querySelectorAll("#screenplays-library-list .script-item-row").forEach(f=>{const v=f.querySelector(".font-semibold")?.textContent.toLowerCase()||"";f.style.display=v.includes(d)?"flex":"none"})});const a=document.getElementById("btn-new-script"),o=document.getElementById("new-script-modal"),l=document.getElementById("close-new-script-modal"),i=document.getElementById("cancel-new-script-btn"),c=document.getElementById("form-new-script");function u(r){o&&(r?(o.classList.remove("hidden"),o.classList.add("flex"),document.getElementById("new-script-title")?.focus()):(o.classList.add("hidden"),o.classList.remove("flex")))}a&&(a.onclick=()=>u(!0)),l&&(l.onclick=()=>u(!1)),i&&(i.onclick=()=>u(!1)),c&&(c.onsubmit=async r=>{r.preventDefault();const d=document.getElementById("new-script-title").value.trim(),b=document.getElementById("new-script-format").value,f=document.getElementById("new-script-genre").value;if(d)try{const v=await nn({title:d,format:b,genre:f});await y.refreshScripts(),y.selectScript(v.id),u(!1),w(`Created "${v.title}"`),e(`/editor/${v.id}`)}catch(v){w(v.message,"error")}});const p=document.getElementById("script-menu-popover");document.querySelectorAll(".script-more-btn").forEach(r=>{r.onclick=d=>{d.stopPropagation(),t=r.getAttribute("data-script-id");const b=r.getBoundingClientRect();p.style.top=`${b.bottom+window.scrollY+4}px`,p.style.left=`${Math.min(b.left-130,window.innerWidth-180)}px`,p.classList.remove("hidden")}}),window.onclick=r=>{!r.target.closest("#script-menu-popover")&&!r.target.closest(".script-more-btn")&&p?.classList.add("hidden")},document.getElementById("menu-opt-open")?.addEventListener("click",()=>{p.classList.add("hidden"),t&&(y.selectScript(t),e(`/editor/${t}`))}),document.getElementById("menu-opt-rename")?.addEventListener("click",async()=>{p.classList.add("hidden");const r=prompt("Enter new title for this screenplay:");r&&r.trim()&&(await an(t,{title:r.trim()}),await y.refreshScripts(),w("Screenplay renamed"),e("/workspace"))}),document.getElementById("menu-opt-duplicate")?.addEventListener("click",async()=>{p.classList.add("hidden"),await ln(t),await y.refreshScripts(),w("Screenplay duplicated"),e("/workspace")}),document.getElementById("menu-opt-archive")?.addEventListener("click",async()=>{p.classList.add("hidden"),await rn(t),await y.refreshScripts(),w("Screenplay archived"),e("/workspace")}),document.getElementById("menu-opt-delete")?.addEventListener("click",async()=>{p.classList.add("hidden"),confirm("Are you sure you want to delete this screenplay? This action cannot be undone.")&&(await on(t),await y.refreshScripts(),w("Screenplay deleted"),e("/workspace"))});const x=document.getElementById("btn-export-library");x&&(x.onclick=()=>{const r="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(y.state.scripts,null,2)),d=document.createElement("a");d.setAttribute("href",r),d.setAttribute("download",`scriptora_library_${Date.now()}.json`),document.body.appendChild(d),d.click(),d.remove(),w("Exported library manifest (.json)")})}const qn=new Set(["HE","SHE","IT","ITS","HIM","HER","HERS","HIS","THEY","THEM","THEIR","THEIRS","WE","US","OUR","OURS","YOU","YOUR","YOURS","ME","MY","MINE","I","WHO","WHOM","WHOSE","WHAT","WHICH","WHEN","WHERE","WHY","HOW","AND","OR","BUT","IF","SO","FOR","NOR","YET","BECAUSE","AS","AT","BY","FROM","IN","INTO","OF","OFF","ON","ONTO","OUT","OVER","TO","UP","WITH","THE","A","AN","THIS","THAT","THESE","THOSE","YES","NO","NOT","OK","NOW","THEN","HERE","THERE","SH","SA","AR","ARA","SAN","SANT","SANTH","SANTHO","SO"]);function yt(e){if(!e||typeof e!="string")return"";let t=e.replace(/\([^)]*\)/g,"").replace(/[^a-zA-Z0-9\s'-]/g,"").trim().toUpperCase();return t==="ARAF"&&(t="ARAVIND"),t}function Zt(e){if(!e||typeof e!="string")return!1;const t=yt(e);return!(!t||t.length<3||qn.has(t)||/\b(INT|EXT|SCENE|DAY|NIGHT|MORNING|EVENING|DUSK|DAWN|CUT TO|FADE|TRANSITION)\b/i.test(t)||t.split(/\s+/).length>3||t.length>30)}function Ds(e){if(!Array.isArray(e))return[];const t=[],s=new Set;return e.forEach(a=>{const o=typeof a=="string"?a:a?.name||a?.content||"",l=yt(o);Zt(l)&&(s.has(l)||(s.add(l),t.push(l)))}),t.filter(a=>!(t.some(i=>i!==a&&i.startsWith(a)&&i.length>a.length)||t.some(i=>i!==a&&i.length>=5&&a.length<=4&&i.startsWith(a.slice(0,3)))))}let C=null,he=null,Qt=null,Lt=!1,ve=!1,st=!0,Ye=!1,Gt="EN",_e=[],nt=-1,Kt=null,Jt=null,is=null,be=localStorage.getItem("scriptora_autosave")!=="false",wt="screenplay",rt=!1;const me=[],ws=["CUT TO:","CUT TO BLACK.","FADE IN:","FADE OUT.","FADE TO BLACK.","DISSOLVE TO:","MATCH CUT TO:","JUMP CUT TO:","SMASH CUT TO:","SLAM TO:","SLAM TO BLACK.","INTERCUT WITH:","WIPE TO:","IRIS IN:","IRIS OUT:","BACK TO:","CONTINUOUS","END"];let Ss=0;const kt=[];function ht(e){return e?(e.innerText||e.textContent||"").replace(/[\u200B\u00A0\r\n\t ]/g,"").trim().length===0:!0}function zn(){return window.innerWidth<=768||"ontouchstart"in window||navigator.maxTouchPoints&&navigator.maxTouchPoints>0||/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}function Rs(e,t){const s=Date.now();if(s-Ss<150)return!0;if(!zn())return!1;const n=e.getAttribute("data-block-type")||"action";if(!["action","text","character","transition"].includes(n)||!ht(t))return!1;let a="action";return n==="action"||n==="text"?a="character":n==="character"?a="transition":n==="transition"&&(a="action"),Ss=s,kt.push({blockId:e.getAttribute("data-block-id"),prevType:n,newType:a}),t.innerText="",bt(e,a),_t(a),ve=!0,be&&Pe(),!0}const Ms=46;function Vn(e,t=null){const s=y.state.scripts?.find(n=>n.id===e)||y.state.activeScript||{title:"Untitled Screenplay",draft:"Draft 1.0"};return y.state.currentUser?.initials,`
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
              <button id="btn-toggle-autosave" class="flex items-center gap-1.5 pl-1.5 pr-2.5 h-full hover:bg-slate-50 active:scale-95 transition-all text-xs font-medium text-slate-700 hover:text-slate-900" title="Toggle Auto-save (Current: ${be?"ON":"OFF"})">
                <span class="w-1.5 h-1.5 rounded-full ${be?"bg-emerald-500 animate-pulse":"bg-slate-400"}" id="autosave-dot"></span>
                <span id="autosave-toggle-label">${be?"Auto":"Off"}</span>
              </button>
            </div>

            <!-- Master Toolbar Visibility Toggle [⋮] -->
            <button id="btn-toggle-editor-toolbar" class="w-7 h-7 flex items-center justify-center ${rt?"text-blue-600 bg-blue-50 border-blue-200/90":"text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50"} rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0" title="${rt?"Collapse Editor Toolbars (Writing Mode)":"Expand Editor Toolbars (Tools & Formatting)"}" aria-label="Toggle Editor Toolbars">
              <span class="material-symbols-outlined text-[18px]">more_vert</span>
            </button>

            <!-- Collaborate Link -->
            <a href="/profile/collaborators?from=editor&scriptId=${e}" id="editor-collab-btn" aria-label="Collaborators" class="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors no-underline" title="Collaborators">
              <span class="material-symbols-outlined text-[19px]">group</span>
            </a>
          </div>
        </div>

        <!-- COLLAPSIBLE SECONDARY TOOLBAR ROWS (Master Visibility via Header [⋮]) -->
        <div id="editor-collapsible-toolbars" class="${rt?"":"hidden"} w-full transition-all duration-200">
          
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
      <main id="editor-main-scroll" class="flex-1 w-full pb-16 overflow-y-auto min-h-screen flex flex-col items-center transition-[padding] duration-200 ease-out" style="padding-top: ${rt?"208px":"136px"}; transition: padding-top 0.2s ease-out;">
        
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
  `}function Ze({id:e,name:t,close:s,restore:n}){try{window.history.pushState({editorSubViewId:e,editorSubViewName:t},"")}catch{}me.push({id:e,name:t,close:s,restore:n})}function Z(e){const t=me.findIndex(s=>s.id===e);if(t!==-1){if(t===me.length-1){const s=me.pop();s&&typeof s.close=="function"&&s.close();const n=me[me.length-1];n&&typeof n.restore=="function"&&n.restore()}else{const s=me.splice(t,1)[0];s&&typeof s.close=="function"&&s.close()}try{window.history.back()}catch{}}}function Wn(){if(wt==="titlepage")return Tt(),!0;if(me.length>0){const e=me.pop();e&&typeof e.close=="function"&&e.close();const t=me[me.length-1];return t&&typeof t.restore=="function"&&t.restore(),!0}return!1}async function Gn(e,t){me.length=0,window.__scriptoraEditorPopstate=l=>wt==="titlepage"?(Nt("screenplay"),!0):me.length>0?Wn():!1;const s=document.getElementById("editor-back-btn");s&&(s.onclick=()=>{if(wt==="titlepage"){Tt();return}if(me.length>0){window.history.back();return}ve&&gt(!1),window.__scriptoraEditorPopstate=null,t("/workspace")}),C=await cn(e),Le(),Ft();const n=document.getElementById("editor-save-btn");n&&(n.onclick=()=>gt(!0)),Jn(),Yn();const a=document.getElementById("editor-collab-btn");a&&(a.onclick=l=>{l.preventDefault(),ve&&gt(!1),y.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile/collaborators?from=editor&scriptId=${e}`)});const o=document.getElementById("editor-profile-btn");o&&(o.onclick=l=>{l.preventDefault(),ve&&gt(!1),y.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile?from=editor&scriptId=${e}`)}),window.addEventListener("keydown",Kn),ua(e,t),ia(),ra(),da(),Xn(),Qn(),pa(),xa(e),aa()}function Kn(e){(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"&&(e.preventDefault(),gt(!0)),(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="f"&&(e.preventDefault(),jt(!0)),(e.ctrlKey||e.metaKey)&&e.key==="Enter"&&(e.preventDefault(),rs())}function Jn(){const e=document.getElementById("btn-toggle-autosave"),t=document.getElementById("autosave-dot"),s=document.getElementById("autosave-toggle-label");e&&(e.onclick=n=>{n.stopPropagation(),be=!be,localStorage.setItem("scriptora_autosave",String(be)),be?(t&&(t.className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"),s&&(s.textContent="Auto"),e.title="Toggle Auto-save (Current: ON)",w("Auto-save enabled"),ve&&Pe()):(t&&(t.className="w-1.5 h-1.5 rounded-full bg-slate-400"),s&&(s.textContent="Off"),e.title="Toggle Auto-save (Current: OFF)",clearTimeout(Qt),w("Auto-save disabled · Tap floppy to save"))})}function At(){const e=document.getElementById("editor-fixed-header"),t=document.getElementById("editor-main-scroll");if(!e||!t)return;if(Ye){t.style.paddingTop=`${e.offsetHeight||56}px`,t.style.paddingBottom="32px";return}const s=e.offsetHeight;s>0&&(t.style.paddingTop=`${s}px`,t.style.paddingBottom="88px")}function Yn(){const e=document.getElementById("btn-toggle-editor-toolbar"),t=document.getElementById("editor-collapsible-toolbars");At(),window.addEventListener("resize",At),e&&(e.onclick=s=>{s.preventDefault(),s.stopPropagation(),rt=!rt,rt?(t&&t.classList.remove("hidden"),e.className="w-7 h-7 flex items-center justify-center text-blue-600 bg-blue-50 border-blue-200/90 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Collapse Editor Toolbars (Writing Mode)"):(t&&t.classList.add("hidden"),e.className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Expand Editor Toolbars (Tools & Formatting)"),At()})}function Tt(){if(wt==="titlepage"){Nt("screenplay");try{window.history.state?.editorTab==="titlepage"&&window.history.back()}catch{}}}function Xn(){const e=document.getElementById("doc-tab-screenplay"),t=document.getElementById("doc-tab-titlepage"),s=document.getElementById("btn-quick-title-page"),n=document.getElementById("menu-btn-title-page"),a=document.getElementById("doc-tab-titlepage-close"),o=document.getElementById("btn-close-titlepage-sheet");e&&(e.onclick=()=>Tt()),t&&(t.onclick=l=>{l.preventDefault(),Nt("titlepage")}),a&&(a.onclick=l=>{l.preventDefault(),l.stopPropagation(),Tt()}),o&&(o.onclick=l=>{l.preventDefault(),l.stopPropagation(),Tt()}),s&&(s.onclick=()=>Nt("titlepage")),n&&(n.onclick=()=>{Z("moreMenu"),Nt("titlepage")})}function Nt(e){if(wt===e)return;wt=e;const t=document.getElementById("screenplay-pages-container"),s=document.getElementById("title-page-container"),n=document.getElementById("doc-tab-screenplay"),a=document.getElementById("doc-tab-titlepage-wrap");if(e==="titlepage"){t&&t.classList.add("hidden"),s&&(s.classList.remove("hidden"),s.classList.add("flex")),a&&(a.className="flex items-center rounded-t-lg transition-all border-b-2 border-blue-600 bg-white text-blue-700 shadow-2xs group"),n&&(n.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 rounded-t-lg transition-all"),Zn();try{window.history.state?.editorTab!=="titlepage"&&window.history.pushState({editorTab:"titlepage"},"")}catch{}}else s&&(s.classList.add("hidden"),s.classList.remove("flex")),t&&t.classList.remove("hidden"),n&&(n.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-blue-600 text-blue-700 bg-white rounded-t-lg transition-all shadow-2xs"),a&&(a.className="flex items-center rounded-t-lg transition-all border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 group");At()}function Zn(){if(!C)return;const e=C.titlePage||{},t=document.getElementById("tp-doc-title"),s=document.getElementById("tp-doc-by"),n=document.getElementById("tp-doc-author"),a=document.getElementById("tp-doc-phone"),o=document.getElementById("tp-doc-email"),l=document.getElementById("tp-doc-address"),i=e.title||C.title||"";t&&(t.innerText=i,i||(t.innerHTML=""));const c=e.by!==void 0?e.by:"Written by";s&&(s.innerText=c,c||(s.innerHTML=""));const u=e.author||"";n&&(n.innerText=u,u||(n.innerHTML=""));let p=e.phone||"";if(!p&&e.contact){const b=e.contact.split("·").map(f=>f.trim()).find(f=>f.includes("+")||/\d{3}/.test(f));b&&(p=b)}a&&(a.innerText=p,p||(a.innerHTML=""));let x=e.email||"";if(!x&&e.contact&&e.contact.includes("@")){const d=e.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);d&&(x=d[0])}o&&(o.innerText=x,x||(o.innerHTML=""));const r=e.address||"";l&&(l.innerText=r,r||(l.innerHTML=""))}function Qn(){const e=document.getElementById("tp-doc-title"),t=document.getElementById("tp-doc-by"),s=document.getElementById("tp-doc-author"),n=document.getElementById("tp-doc-phone"),a=document.getElementById("tp-doc-email"),o=document.getElementById("tp-doc-address"),l=()=>{if(!C)return;C.titlePage||(C.titlePage={});const i=e?e.innerText.trim():"",c=t?t.innerText.trim():"",u=s?s.innerText.trim():"",p=n?n.innerText.trim():"",x=a?a.innerText.trim():"",r=o?o.innerText.trim():"";if(C.titlePage.title=i,C.titlePage.by=c||"Written by",C.titlePage.author=u,C.titlePage.phone=p,C.titlePage.email=x,C.titlePage.address=r,C.titlePage.contact=[p,x,r].filter(Boolean).join(" · "),i){C.title=i;const d=document.getElementById("editor-script-title"),b=document.getElementById("doc-tab-title-label");d&&(d.textContent=i),b&&(b.textContent=i)}ve=!0,vt("Unsaved"),be&&Pe()};[e,t,s,n,a,o].forEach(i=>{i&&(i.oninput=l,i.onblur=()=>{i.innerText.trim()===""&&(i.innerHTML=""),l()})})}function Le(){const e=document.getElementById("screenplay-pages-container");if(!e||!C)return;const t=C.scenes||[],s=[];t.forEach(l=>{(l.blocks||[]).forEach(i=>{s.push({block:i,sceneNumber:l.number,sceneId:l.id,slugline:l.slugline})})});const n=[];let a={pageNumber:1,items:[]},o=0;s.forEach(l=>{if(l.block.type==="pagebreak"){a.items.push(l),n.push(a),a={pageNumber:n.length+1,items:[]},o=0;return}const i=Ls(l.block);o+i>Ms&&a.items.length>0&&(n.push(a),a={pageNumber:n.length+1,items:[]},o=0),a.items.push(l),o+=i}),a.items.length>0&&n.push(a),n.length===0&&n.push({pageNumber:1,items:[{block:{id:"b-1-1",type:"scene",content:"INT. NEW SCENE - DAY"},sceneNumber:1,sceneId:"scene-1",slugline:"INT. NEW SCENE - DAY"},{block:{id:"b-1-2",type:"action",content:"Type your screenplay action here..."},sceneNumber:1,sceneId:"scene-1",slugline:"INT. NEW SCENE - DAY"}]}),e.innerHTML=n.map(l=>`
    <div class="screenplay-page-sheet w-full max-w-[816px] min-h-[1123px] bg-white rounded-md sm:rounded-lg shadow-md border border-slate-200/90 flex flex-col font-courier text-[12pt] leading-[1.25] text-slate-900 relative transition-all" data-page-num="${l.pageNumber}">
      
      <!-- Top Page Header: Page number in top right (Only for Page > 1, no watermark overlay) -->
      <div class="w-full flex items-center justify-end h-7 pb-2 select-none text-[12pt] text-slate-600 font-courier">
        <span>${l.pageNumber>1?`${l.pageNumber}.`:""}</span>
      </div>

      <!-- Screenplay Blocks naturally flowing across this A4 page -->
      <div class="page-blocks-wrapper flex flex-col flex-1 w-full">
        ${l.items.map(i=>Fs(i.block,i.sceneNumber,i.sceneId)).join("")}
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
  `).join(""),ta(),Ht()}function Ls(e){if(e.type==="pagebreak")return 1;const t=e.content||"";return e.type==="scene"?3:e.type==="action"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="character"?2:e.type==="parenthetical"?1:e.type==="dialogue"?Math.max(1,Math.ceil(t.length/38))+1:e.type==="transition"||e.type==="shot"?2:e.type==="text"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="note"||e.type==="outline"?2:e.type==="act"||e.type==="endact"?3:e.type==="sequence"?2:e.type==="dual"?4:e.type==="lyrics"?2:e.type==="image"?10:2}function Es(e){let t=!1;(C.scenes||[]).forEach(s=>{const n=(s.blocks||[]).findIndex(a=>a.id===e);n!==-1&&(s.blocks.splice(n,1),t=!0)}),t&&(ve=!0,Le(),w("Page break removed"),be&&Pe())}function rs(e=null){const t=e||he,s=C.scenes||[];if(s.length===0)return;const n={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"};let a=!1;if(t)for(let o of s){const l=(o.blocks||[]).findIndex(i=>i.id===t);if(l!==-1){o.blocks.splice(l+1,0,n),a=!0;break}}if(!a){const o=s[s.length-1];o.blocks||(o.blocks=[]),o.blocks.push(n)}ve=!0,Le(),w("Page break inserted"),be&&Pe()}function Os(e=null){const t=e||he,s=C.scenes||[];if(s.length===0){cs();return}const n={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},a={id:"b-"+Date.now(),type:"action",content:""};let o=null,l=-1;if(t)for(let i of s){const c=(i.blocks||[]).findIndex(u=>u.id===t);if(c!==-1){o=i,l=c+1;break}}o||(o=s[s.length-1],l=o.blocks.length),o.blocks.splice(l,0,n,a),ve=!0,Le(),setTimeout(()=>{const i=document.getElementById(a.id);if(i){const c=i.hasAttribute("contenteditable")?i:i.querySelector('[contenteditable="true"]');c&&c.focus(),i.scrollIntoView({behavior:"smooth",block:"center"})}},50),w("New page inserted"),be&&Pe()}function ea(e){const t=document.querySelector(`.screenplay-page-sheet[data-page-num="${e}"]`);let s=null;if(t){const n=t.querySelectorAll(".screenplay-block");n.length>0&&(s=n[n.length-1].getAttribute("data-block-id"))}Os(s)}function cs(){const e=C.scenes||[],t=e.length+1,s={id:"scene-"+Date.now(),number:t,slugline:`INT. SCENE ${t} - DAY`,blocks:[{id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},{id:"b-"+Date.now()+"-1",type:"scene",content:`INT. SCENE ${t} - DAY`},{id:"b-"+Date.now()+"-2",type:"action",content:""}]};e.push(s),ve=!0,Le(),setTimeout(()=>{const a=document.getElementById(s.blocks[1].id);if(a){const o=a.hasAttribute("contenteditable")?a:a.querySelector('[contenteditable="true"]');o&&o.focus(),a.scrollIntoView({behavior:"smooth",block:"center"})}},80);const n=document.querySelectorAll(".screenplay-page-sheet").length;w(`Added Page at End (Page ${n})`),be&&Pe()}function js(e=null){let t=e;if(!t&&he){const p=document.getElementById(he),x=p?p.closest(".screenplay-page-sheet"):null;x&&(t=parseInt(x.getAttribute("data-page-num"),10))}t||(t=1);const s=C.scenes||[];if(s.length===0){cs();return}if(t<=1){const p={id:"scene-"+Date.now(),number:1,slugline:"INT. SCENE 1 - DAY",blocks:[{id:"b-"+Date.now()+"-1",type:"scene",content:"INT. SCENE 1 - DAY"},{id:"b-"+Date.now()+"-2",type:"action",content:""},{id:"pb-"+Date.now()+"-3",type:"pagebreak",content:"PAGE BREAK"}]};s.unshift(p),s.forEach((x,r)=>{x.number=r+1}),ve=!0,Le(),Ft(),setTimeout(()=>{const x=document.getElementById(p.blocks[0].id);if(x){const r=x.hasAttribute("contenteditable")?x:x.querySelector('[contenteditable="true"]');r&&r.focus(),x.scrollIntoView({behavior:"smooth",block:"center"})}},80),w("Added Page Before (Page 1)"),be&&Pe();return}const n=document.querySelector(`.screenplay-page-sheet[data-page-num="${t}"]`);let a=null;if(n){const p=n.querySelector(".screenplay-block");p&&(a=p.getAttribute("data-block-id"))}let o=null,l=-1;if(a)for(let p of s){const x=(p.blocks||[]).findIndex(r=>r.id===a);if(x!==-1){o=p,l=x;break}}o||(o=s[0],l=0);const i={id:"pb-"+Date.now()+"-a",type:"pagebreak",content:"PAGE BREAK"},c={id:"b-"+Date.now()+"-b",type:"action",content:""},u={id:"pb-"+Date.now()+"-c",type:"pagebreak",content:"PAGE BREAK"};o.blocks.splice(l,0,i,c,u),ve=!0,Le(),setTimeout(()=>{const p=document.getElementById(c.id);if(p){const x=p.hasAttribute("contenteditable")?p:p.querySelector('[contenteditable="true"]');x&&x.focus(),p.scrollIntoView({behavior:"smooth",block:"center"})}},80),w(`Added Page Before (Page ${t})`),be&&Pe()}function Fs(e,t,s){const n=e.type==="pagebreak",a=e.type==="scene",o=e.type==="character",l=e.type==="parenthetical",i=e.type==="dialogue",c=e.type==="transition",u=e.type==="shot",p=e.type==="text",x=e.type==="note",r=e.type==="outline",d=e.type==="act",b=e.type==="endact",f=e.type==="sequence",v=e.type==="dual",g=e.type==="lyrics",$=e.type==="image",M=e.type==="action"||!n&&!a&&!o&&!l&&!i&&!c&&!u&&!p&&!x&&!r&&!d&&!b&&!f&&!v&&!g&&!$;if(n)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="pagebreak" tabindex="0" class="screenplay-block my-3 select-none flex items-center justify-between px-3 py-2 text-slate-400 bg-slate-50 border border-dashed border-slate-300 rounded-lg group hover:border-blue-400 hover:bg-blue-50/30 transition-all outline-none focus:ring-1 focus:ring-blue-500">
        <div class="flex items-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase text-slate-500 group-hover:text-blue-600">
          <span class="material-symbols-outlined text-[16px] text-blue-500">insert_page_break</span>
          <span>PAGE BREAK</span>
        </div>
        <button type="button" class="btn-remove-pagebreak p-0.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors" data-block-id="${e.id}" title="Remove Page Break">
          <span class="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    `;if(a)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="scene" class="screenplay-block flex items-baseline py-2 font-bold text-slate-900 mt-4 mb-2 group w-full">
        <!-- Scene Number shown in left gutter -->
        <span class="scene-num-indicator -ml-10 w-7 mr-3 shrink-0 font-mono text-slate-400 font-bold select-none text-[12pt] text-right ${st?"":"hidden"}">${t}</span>
        <div class="flex-1 tracking-wider uppercase outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${Ce(e.content)}</div>
      </div>
    `;if(M)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${Ce(e.content)}</div>
    `;if(o)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="character" class="screenplay-block uppercase font-bold tracking-wider text-slate-900 text-left mt-3.5 mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[37%] max-w-[28ch]" contenteditable="true" spellcheck="false">${Ce(e.content)}</div>
    `;if(l)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="parenthetical" class="screenplay-block italic text-slate-600 text-left mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[26%] max-w-[24ch]" contenteditable="true" spellcheck="false">${Ce(e.content)}</div>
    `;if(i)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dialogue" class="screenplay-block text-left text-slate-900 mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[17%] max-w-[36ch]" contenteditable="true" spellcheck="false">${Ce(e.content)}</div>
    `;if(c)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="transition" class="screenplay-block w-full text-right uppercase font-bold tracking-wider text-slate-900 mt-2 mb-4 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${Ce(e.content)}</div>
    `;if(u)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="shot" class="screenplay-block uppercase font-bold tracking-wider text-slate-900 text-left my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${Ce(e.content||"CLOSE ON:")}</div>
    `;if(p)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="text" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${Ce(e.content)}</div>
    `;if(x)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="note" class="screenplay-block text-amber-900 bg-amber-50/80 border-l-4 border-amber-400 p-2 my-2.5 rounded-r font-mono text-xs outline-none focus:ring-1 focus:ring-amber-400 cursor-text select-text" contenteditable="true" spellcheck="false">${Ce(e.content||"[[ NOTE: Script comment... ]]")}</div>
    `;if(r)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="outline" class="screenplay-block text-slate-500 uppercase tracking-widest font-sans font-bold text-xs my-2 border-b border-slate-200 pb-1 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${Ce(e.content||"OUTLINE BEAT")}</div>
    `;if(d)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="act" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-base outline-none focus:bg-blue-50/50 rounded px-1 cursor-text underline decoration-2 underline-offset-4" contenteditable="true" spellcheck="false">${Ce(e.content||"ACT I")}</div>
    `;if(b)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="endact" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${Ce(e.content||"END OF ACT I")}</div>
    `;if(f)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="sequence" class="screenplay-block uppercase font-bold tracking-wide text-slate-800 my-3 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${Ce(e.content||"SEQUENCE 1")}</div>
    `;if(v)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dual" class="screenplay-block screenplay-dual-dialogue-grid">
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${Ce(e.char1||"CHARACTER A")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${Ce(e.dia1||"Dialogue A")}</div>
        </div>
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${Ce(e.char2||"CHARACTER B")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${Ce(e.dia2||"Dialogue B")}</div>
        </div>
      </div>
    `;if(g)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="lyrics" class="screenplay-block text-center italic text-slate-800 my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${Ce(e.content||"♫ Musical lyrics... ♫")}</div>
    `;if($){const I=e.url||e.content||"https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80",k=es(e.caption||"");return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="image" class="screenplay-block my-4 flex flex-col items-center group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-2.5 shadow-2xs transition-all">
        <div class="w-full flex items-center justify-center min-h-[180px] max-h-[420px] rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200/60">
          <img src="${I}" alt="${k||"Storyboard"}" class="max-h-[400px] w-auto max-w-full object-contain rounded-md shadow-xs bg-white" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80';" loading="eager" />
        </div>
        <div class="text-[11px] font-sans text-slate-600 italic mt-2 text-center outline-none px-2 py-0.5 rounded focus:bg-white w-full cursor-text" contenteditable="true" data-placeholder="Add a storyboard caption...">${k||"Storyboard visual concept"}</div>
        <button class="btn-delete-img-block absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-md text-xs font-bold" data-block-id="${e.id}" data-scene-id="${s}" title="Delete image">✕</button>
      </div>
    `}return`
    <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true">${Ce(e.content)}</div>
  `}function Ce(e){if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return es(e);try{let o=function(l){const i=Array.from(l.childNodes);for(const c of i)if(c.nodeType===Node.ELEMENT_NODE){if(c.tagName==="SPAN"&&(c.style?.textDecoration?.includes("line-through")||c.style?.textDecorationLine?.includes("line-through"))){const p=document.createElement("s");p.innerHTML=c.innerHTML,l.replaceChild(p,c),o(p);continue}if(a.has(c.tagName)){for(;c.attributes.length>0;)c.removeAttribute(c.attributes[0].name);o(c)}else{const u=document.createTextNode(c.textContent||"");l.replaceChild(u,c)}}};var t=o;const n=new DOMParser().parseFromString(`<body>${e}</body>`,"text/html"),a=new Set(["B","STRONG","I","EM","U","S","STRIKE","DEL","BR","SPAN"]);return o(n.body),n.body.innerHTML}catch{return es(e)}}function es(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}function $t(e){if(!e||typeof e!="string")return e;let t=e.replace(/^(\s*["'“‘(]*)([a-z\u00E0-\u00FC])/u,(s,n,a)=>n+a.toUpperCase());return t=t.replace(/([.!?]["'”’)]*\s+["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,n,a)=>n+a.toUpperCase()),t=t.replace(/(\n\s*["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,n,a)=>n+a.toUpperCase()),t}function ft(e){let t=0;const s=window.getSelection();if(s&&s.rangeCount>0){const n=s.getRangeAt(0),a=n.cloneRange();a.selectNodeContents(e),a.setEnd(n.endContainer,n.endOffset),t=a.toString().length}return t}function mt(e,t){const s=window.getSelection();if(!s)return;const n=document.createRange();if(t<=0){n.selectNodeContents(e),n.collapse(!0),s.removeAllRanges(),s.addRange(n);return}let a=0,o=!1;function l(i){if(!o){if(i.nodeType===Node.TEXT_NODE){const c=i.nodeValue.length;if(a+c>=t){n.setStart(i,Math.min(t-a,c)),n.collapse(!0),o=!0;return}a+=c}else for(let c=0;c<i.childNodes.length;c++)if(l(i.childNodes[c]),o)return}}l(e),o||(n.selectNodeContents(e),n.collapse(!1)),s.removeAllRanges(),s.addRange(n)}function _s(e){const t=e.hasAttribute("contenteditable")?e:e.querySelector('[contenteditable="true"]');t&&(t.onfocus=()=>{he=e.getAttribute("data-block-id");const s=e.getAttribute("data-block-type")||"action";_t(s),s==="transition"&&ht(t)?Pt(e,t):s!=="transition"&&lt()},t.addEventListener("click",()=>{(e.getAttribute("data-block-type")||"action")==="transition"&&ht(t)&&Pt(e,t)}),t.addEventListener("beforeinput",s=>{(s.data===" "||s.inputType==="insertText"&&s.data===" ")&&ht(t)&&Rs(e,t)&&s.preventDefault()}),t.oninput=()=>{ve=!0;const s=e.getAttribute("data-block-type")||"action",n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,o=$t(a);if(o!==a){const l=ft(t);t.innerText=o,mt(t,l)}}ot(e,t.innerHTML),vt("Unsaved"),be&&Pe(),Pt(e,t),Ht()},t.onblur=()=>{const s=e.getAttribute("data-block-type")||"action",n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,o=$t(a);o!==a&&(t.innerText=o)}if(ot(e,t.innerHTML),s==="character")ds(t.innerText);else if(s==="scene"){const a=pt(t.innerText);a.location&&us(a.location)}},t.onpaste=()=>{const s=e.getAttribute("data-block-type")||"action";setTimeout(()=>{const n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,o=$t(a);if(o!==a){const l=ft(t);t.innerText=o,mt(t,l)}}ot(e,t.innerHTML)},0)},t.onkeydown=s=>{sa(s,e,t)})}function ta(){document.querySelectorAll(".screenplay-block").forEach(_s),document.querySelectorAll(".btn-delete-img-block").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=t.getAttribute("data-block-id"),a=t.getAttribute("data-scene-id");n&&a&&Ct(a,n)}}),document.querySelectorAll(".btn-remove-pagebreak").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=t.getAttribute("data-block-id");n&&Es(n)}}),document.querySelectorAll('[data-block-type="pagebreak"]').forEach(t=>{t.onkeydown=s=>{if(s.key==="Backspace"||s.key==="Delete"){s.preventDefault();const n=t.getAttribute("data-block-id");n&&Es(n)}}}),document.querySelectorAll(".btn-page-add-before").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=parseInt(t.getAttribute("data-page-num"),10)||1;js(n)}}),document.querySelectorAll(".btn-page-add-after").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=parseInt(t.getAttribute("data-page-num"),10)||1;ea(n)}})}function pt(e){const t=e.match(/^(INT\.\/EXT\.|INT\.|EXT\.|I\/E\.)\s*/i),s=t?t[1].toUpperCase():"INT.",a=(t?e.slice(t[0].length):e).split(/\s+-\s*|\s+-/),o=(a[0]||"").trim().toUpperCase(),l=(a[1]||"").trim().toUpperCase();return{intExt:s,location:o,time:l}}function ds(e){if(!C)return;const t=yt(e);Zt(t)&&(Array.isArray(C.characters)||(C.characters=[]),C.characters=C.characters.filter(s=>{const n=yt(s);return!(!Zt(n)||t.startsWith(n)&&n.length<t.length||t.length>=5&&n.length<=4&&t.startsWith(n.slice(0,3)))}),C.characters.includes(t)||C.characters.push(t))}function us(e){if(!C)return;const t=(e||"").trim().toUpperCase();!t||t.length<2||(Array.isArray(C.locations)||(C.locations=[]),C.locations=C.locations.filter(s=>t.startsWith(s)&&s.length<t.length?C.scenes?.some(a=>a.blocks?.some(o=>o.type==="scene"&&pt(o.content).location===s)):!0),C.locations.includes(t)||C.locations.push(t))}function ot(e,t){if(!C)return;const s=e.getAttribute("data-block-id"),n=e.getAttribute("data-scene-id"),a=C.scenes.find(l=>l.id===n);if(!a)return;const o=a.blocks.find(l=>l.id===s);if(o&&(o.type==="image"?o.caption=t:o.content=t,o.type==="scene")){const l=(t||"").replace(/<[^>]+>/g,""),i=pt(l);o.intExt=i.intExt,o.location=i.location,o.time=i.time,a.slugline=l,a.location=i.location,a.time=i.time}}function Ct(e,t){if(!C)return;const s=C.scenes.find(o=>o.id===e);if(!s)return;const n=s.blocks.findIndex(o=>o.id===t);if(n!==-1&&(s.blocks.splice(n,1),ve=!0,be&&Pe()),s.blocks.length===0&&C.scenes.length>1){const o=C.scenes.findIndex(l=>l.id===e);o!==-1&&(C.scenes.splice(o,1),C.scenes.forEach((l,i)=>{l.number=i+1}),Ft())}else s.blocks.length===0&&s.blocks.push({id:`b-${Date.now().toString().slice(-6)}`,type:"action",content:""});const a=document.getElementById(t);a&&a.remove(),Ht()}function sa(e,t,s){const n=t.getAttribute("data-block-type"),a=t.getAttribute("data-scene-id"),o=t.getAttribute("data-block-id"),l=document.getElementById("editor-autocomplete-dropdown");if(l&&!l.classList.contains("hidden")){if(e.key==="ArrowDown"){e.preventDefault(),Is(1);return}if(e.key==="ArrowUp"){e.preventDefault(),Is(-1);return}if(e.key==="Enter"||e.key==="Tab"){const i=l.querySelector(".autocomplete-item.active");if(i){e.preventDefault(),i.click();return}}if(e.key==="Escape"){lt();return}}if((e.key===" "||e.code==="Space")&&ht(s)&&Rs(t,s)){e.preventDefault();return}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"&&!e.shiftKey&&kt.length>0){const i=kt[kt.length-1];if(i.blockId===o&&ht(s)){kt.pop(),e.preventDefault(),bt(t,i.prevType);return}}if((e.ctrlKey||e.metaKey)&&!e.altKey){const i=e.key.toLowerCase();if(i==="b"){e.preventDefault(),at("bold");return}if(i==="i"){e.preventDefault(),at("italic");return}if(i==="u"){e.preventDefault(),at("underline");return}}if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&e.key&&e.key.length===1&&(["bold","italic","underline","strikeThrough"].forEach(i=>{if(Me[i]===!0&&!document.queryCommandState(i))try{document.execCommand(i,!1,null)}catch{}else if(Me[i]===!1&&document.queryCommandState(i))try{document.execCommand(i,!1,null)}catch{}}),Me={bold:null,italic:null,underline:null,strikeThrough:null}),(e.ctrlKey||e.metaKey)&&e.key==="Enter"){e.preventDefault(),rs(o);return}if(e.key==="Backspace"&&!e.ctrlKey&&!e.metaKey){const i=ft(s),c=window.getSelection(),u=!c||c.isCollapsed;if(i===0&&u){const p=Array.from(document.querySelectorAll(".screenplay-block")),x=p.indexOf(t);if(x>0){e.preventDefault();const r=p[x-1],d=r.hasAttribute("contenteditable")?r:r.querySelector('[contenteditable="true"]'),b=s.innerText.trim();if(b===""||n==="parenthetical"&&(b==="()"||b==="")){Ct(a,o),d&&(d.focus(),Qe(d));return}const f=r.getAttribute("data-block-type");if(d&&(n==="action"&&f==="action"||n==="dialogue"&&f==="dialogue"||n==="text"&&f==="text")){const v=d.innerText.length,g=d.innerText+(d.innerText?" ":"")+s.innerText;d.innerText=g,ot(r,g),Ct(a,o),d.focus(),mt(d,v+(d.innerText?1:0));return}if(d){d.focus(),Qe(d);return}}}}if(e.key==="Delete"&&!e.ctrlKey&&!e.metaKey){const i=ft(s),c=window.getSelection(),u=!c||c.isCollapsed;if(i>=s.innerText.length&&u){const p=Array.from(document.querySelectorAll(".screenplay-block")),x=p.indexOf(t);if(x<p.length-1){const r=p[x+1],d=r.hasAttribute("contenteditable")?r:r.querySelector('[contenteditable="true"]'),b=r.getAttribute("data-scene-id"),f=r.getAttribute("data-block-id"),v=r.getAttribute("data-block-type"),g=(d?d.innerText:"").trim();if(g===""||v==="parenthetical"&&(g==="()"||g==="")){e.preventDefault(),Ct(b,f);return}if(d&&(n==="action"&&v==="action"||n==="dialogue"&&v==="dialogue"||n==="text"&&v==="text")){e.preventDefault();const $=s.innerText.length,M=s.innerText+(s.innerText?" ":"")+d.innerText;s.innerText=M,ot(t,M),Ct(b,f),mt(s,$+(s.innerText?1:0));return}if(d){e.preventDefault(),d.focus(),mt(d,0);return}}}}if(e.key==="ArrowLeft"){const i=ft(s),c=window.getSelection();if(i===0&&(!c||c.isCollapsed)){const u=Array.from(document.querySelectorAll(".screenplay-block")),p=u.indexOf(t);if(p>0){e.preventDefault();const x=u[p-1],r=x.querySelector('[contenteditable="true"]')||x;r&&(r.focus(),Qe(r))}}}if(e.key==="ArrowRight"){const i=ft(s),c=window.getSelection();if(i>=s.innerText.length&&(!c||c.isCollapsed)){const u=Array.from(document.querySelectorAll(".screenplay-block")),p=u.indexOf(t);if(p<u.length-1){e.preventDefault();const x=u[p+1],r=x.querySelector('[contenteditable="true"]')||x;r&&(r.focus(),mt(r,0))}}}if(e.key==="("&&(n==="character"||n==="dialogue")){const i=window.getSelection();if(i&&i.anchorOffset===0&&s.innerText.trim()===""){e.preventDefault(),bt(t,"parenthetical");return}}if(e.key==="Tab"){if(e.preventDefault(),n==="action"){bt(t,"character");return}if(n==="character"){bt(t,"dialogue");return}}if(e.key==="Enter"&&!e.shiftKey){if(lt(),n==="scene"){e.preventDefault();const i=pt(s.innerText);i.location&&us(i.location),tt(a,o,"action");return}if(n==="character"){e.preventDefault(),ds(s.innerText),tt(a,o,"dialogue");return}if(n==="dialogue"){e.preventDefault(),tt(a,o,"action");return}if(n==="parenthetical"){e.preventDefault();let i=s.innerText.trim();i.endsWith(")")||(i+=")",s.innerText=i,ot(t,i)),tt(a,o,"dialogue");return}if(n==="transition"){e.preventDefault(),na(a);return}if(n==="shot"||n==="note"||n==="outline"){e.preventDefault(),tt(a,o,"action");return}if(n==="act"||n==="endact"||n==="sequence"){e.preventDefault(),tt(a,o,"scene");return}if(n==="lyrics"){e.preventDefault(),tt(a,o,"lyrics");return}if(n==="action"||n==="text"){e.preventDefault(),tt(a,o,n);return}}}function tt(e,t,s,n){const a=C.scenes.find(p=>p.id===e);if(!a)return;const o=a.blocks.findIndex(p=>p.id===t),l=`b-${Date.now().toString().slice(-6)}`,i={id:l,type:s,content:""};o!==-1?a.blocks.splice(o+1,0,i):a.blocks.push(i);const c=document.getElementById(t),u=c?c.closest(".page-blocks-wrapper"):null;if(c&&u){const p=document.createElement("div");p.innerHTML=Fs(i,a.number,a.id);const x=p.firstElementChild;c.insertAdjacentElement("afterend",x),_s(x),Ht();const r=x.hasAttribute("contenteditable")?x:x.querySelector('[contenteditable="true"]');r&&(r.focus(),Qe(r));const d=u.querySelectorAll(".screenplay-block");let b=0;d.forEach(f=>{const v=f.getAttribute("data-block-type"),g=f.innerText||"";b+=Ls({type:v,content:g})}),b>Ms&&(Le(),setTimeout(()=>{const f=document.getElementById(l);if(f){const v=f.querySelector('[contenteditable="true"]')||f;v.focus(),Qe(v)}},20))}else Le(),setTimeout(()=>{const p=document.getElementById(l);if(p){const x=p.hasAttribute("contenteditable")?p:p.querySelector('[contenteditable="true"]');x&&(x.focus(),Qe(x))}},20)}function na(e){const t=C.scenes.findIndex(l=>l.id===e),s=C.scenes.length+1,n=`scene-${Date.now().toString().slice(-5)}`,a=`b-${Date.now().toString().slice(-6)}`,o={id:n,number:s,actId:C.acts?.[0]?.id||"act-1",slugline:"",blocks:[{id:a,type:"scene",content:""}]};t!==-1?C.scenes.splice(t+1,0,o):C.scenes.push(o),C.scenes.forEach((l,i)=>{l.number=i+1}),Le(),Ft(),setTimeout(()=>{const l=document.getElementById(a);if(l){const i=l.querySelector('[contenteditable="true"]');i&&(i.focus(),Qe(i),Pt(l,i))}},30)}function bt(e,t){const s=e.getAttribute("data-block-id"),n=e.getAttribute("data-scene-id"),a=C.scenes.find(l=>l.id===n);if(!a)return;const o=a.blocks.find(l=>l.id===s);if(o){if(o.type=t,t==="character"&&(o.content=o.content.toUpperCase()),(t==="action"||t==="dialogue")&&(o.content=$t(o.content)),t==="parenthetical"){let l=o.content.replace(/^\(+|\)+$/g,"").trim();l?o.content=`(${l})`:o.content="()"}Le(),setTimeout(()=>{const l=document.getElementById(s);if(l){const i=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]');if(i){if(i.focus(),t==="parenthetical"&&i.innerText==="()"){const c=i.firstChild;if(c){const u=document.createRange(),p=window.getSelection();u.setStart(c,1),u.collapse(!0),p.removeAllRanges(),p.addRange(u)}}else Qe(i);_t(t),t==="transition"?Pt(l,i):lt()}}},25)}}function Qe(e){const t=document.createRange(),s=window.getSelection();t.selectNodeContents(e),t.collapse(!1),s.removeAllRanges(),s.addRange(t)}function aa(){document.addEventListener("click",t=>{t.target.closest("#editor-autocomplete-dropdown")||lt()});const e=()=>{const t=document.getElementById("editor-autocomplete-dropdown");if(t&&!t.classList.contains("hidden")&&he){const s=document.getElementById(he);if(s){const n=s.querySelector('[contenteditable="true"]')||s;Hs(t,n)}}};window.addEventListener("scroll",e,{capture:!0,passive:!0}),document.addEventListener("selectionchange",()=>{const t=document.getElementById("editor-autocomplete-dropdown");t&&!t.classList.contains("hidden")&&e()}),window.visualViewport&&(window.visualViewport.addEventListener("resize",e),window.visualViewport.addEventListener("scroll",e))}function lt(){const e=document.getElementById("editor-autocomplete-dropdown");e&&e.classList.add("hidden")}function oa(e){if(!e)return null;const t=window.getSelection();if(t&&t.rangeCount>0)try{const n=t.getRangeAt(0);if(e.contains(n.startContainer)||e===n.startContainer){const a=n.getClientRects();if(a&&a.length>0){const l=a[a.length-1];if(l&&l.height>0&&l.top>0)return{top:l.top,bottom:l.bottom,left:l.left,right:l.right,width:l.width,height:l.height}}const o=n.getBoundingClientRect();if(o&&o.height>0&&o.top>0)return{top:o.top,bottom:o.bottom,left:o.left,right:o.right,width:o.width,height:o.height}}}catch{}const s=e.getBoundingClientRect();return{top:s.top,bottom:s.bottom,left:s.left,right:s.right,width:s.width,height:s.height}}function Hs(e,t){if(!e||!t)return;e.parentElement!==document.body&&document.body.appendChild(e);const s=oa(t);if(!s)return;const n=window.visualViewport,a=n?n.height:window.innerHeight,o=n?n.width:window.innerWidth,l=document.getElementById("editor-header-nav"),i=l?l.getBoundingClientRect().bottom:136;if(s.bottom<i+5||s.top>a-20){lt();return}const c=Math.min(270,o-24);e.style.width=`${c}px`;const u=Math.min(220,e.scrollHeight||180),p=a-s.bottom,x=s.top-i;let r;p<u+12&&x>u+12?r=s.top-u-6:r=s.bottom+6,r=Math.max(i+6,Math.min(a-u-8,r));const d=t.closest(".screenplay-block"),b=d?d.getAttribute("data-block-type"):null;let f;b==="transition"?f=Math.max(12,s.right-c):(f=s.left,f+c>o-12&&(f=o-c-12),f<12&&(f=12)),e.style.top=`${r}px`,e.style.left=`${f}px`}function Us(){if(!C)return[];const e=[];return(C.scenes||[]).forEach(t=>{(t.blocks||[]).forEach(s=>{s.type==="character"&&s.content&&e.push(s.content)})}),(C.characters||[]).forEach(t=>{t&&e.push(t)}),Ds(e)}function la(){if(!C)return[];const e=new Set;(C.scenes||[]).forEach(s=>{(s.blocks||[]).forEach(n=>{if(n.type==="scene"){const a=pt(n.content);a.location&&a.location.length>=2&&e.add(a.location)}})}),(C.locations||[]).forEach(s=>{const n=(s||"").trim().toUpperCase();n&&n.length>=2&&e.add(n)});const t=Array.from(e);return t.filter(s=>t.some(a=>a!==s&&a.startsWith(s))?C.scenes?.some(o=>o.blocks?.some(l=>l.type==="scene"&&pt(l.content).location===s)):!0)}function Pt(e,t){const s=e.getAttribute("data-block-type"),n=t.innerText,a=document.getElementById("editor-autocomplete-dropdown");if(!a)return;let o=[];if(s==="scene"){const l=n.toUpperCase(),i=n.match(/\s+-\s*([A-Za-z]*)$/);if(i){const c=(i[1]||"").toUpperCase(),p=["DAY","NIGHT","MORNING","EVENING","DAWN","DUSK","CONTINUOUS","LATER"].filter(r=>r.startsWith(c)),x=n.replace(/\s+-\s*[A-Za-z]*$/," - ");o=p.map(r=>({label:r,val:x+r}))}else if(l==="I"||l==="IN")o=["INT.","INT./EXT.","I/E."].map(c=>({label:c,val:c+" "}));else if(l==="E"||l==="EX")o=["EXT.","INT./EXT.","I/E."].map(c=>({label:c,val:c+" "}));else if(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i.test(n)){const c=n.match(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i),u=c[1].toUpperCase()+" ",p=(c[2]||"").trim().toUpperCase();p.length>0&&(o=la().filter(d=>d.startsWith(p)).map(d=>({label:d,val:`${u}${d}`})))}}else if(s==="character"){const l=n.trim().toUpperCase();l.length>0&&(o=Us().filter(u=>u.startsWith(l)).map(u=>({label:u,val:u})))}else if(s==="transition"){const i=(n||"").replace(/[\u200B\u00A0\r\n\t]/g,"").trim().toUpperCase(),c=Array.isArray(C?.transitions)&&C.transitions.length>0?Array.from(new Set([...ws,...C.transitions])):ws;if(i.length===0)o=c.map(u=>({label:u,val:u}));else{const u=c.filter(r=>r.toUpperCase().startsWith(i)),p=c.filter(r=>!r.toUpperCase().startsWith(i)&&r.toUpperCase().includes(i));o=[...u,...p].map(r=>({label:r,val:r}))}}if(o.length===0){lt();return}a.innerHTML=o.map((l,i)=>{const c=typeof l=="object"?l.label:l,u=typeof l=="object"?l.val:l;return`
      <div class="autocomplete-item px-3 py-2 sm:py-1.5 hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-blue-700 cursor-pointer flex items-center justify-between font-mono text-xs border-b border-slate-50 last:border-b-0 ${i===0?"active bg-blue-50/70 text-blue-700 font-semibold":""}" data-val="${u}">
        <span class="tracking-wide">${c}</span>
        <span class="text-[10px] text-slate-400 font-sans hidden sm:inline">Enter ↵</span>
      </div>
    `}).join(""),a.classList.remove("hidden"),Hs(a,t),a.querySelectorAll(".autocomplete-item").forEach(l=>{l.addEventListener("pointerdown",i=>{i.preventDefault()}),l.onclick=i=>{i.stopPropagation();const c=l.getAttribute("data-val");if(t.innerText=c,ot(e,c),s==="character")ds(c);else if(s==="scene"){const u=pt(c);u.location&&us(u.location)}lt(),Qe(t),ve=!0,be&&Pe()}})}function Is(e){const t=document.getElementById("editor-autocomplete-dropdown");if(!t)return;const s=t.querySelectorAll(".autocomplete-item");if(s.length===0)return;let n=Array.from(s).findIndex(a=>a.classList.contains("active"));n!==-1&&s[n].classList.remove("active","bg-blue-50/70","text-blue-700","font-semibold"),n=(n+e+s.length)%s.length,s[n].classList.add("active","bg-blue-50/70","text-blue-700","font-semibold"),s[n].scrollIntoView({block:"nearest"})}async function gt(e=!1){if(!(Lt||!C)){Lt=!0,vt("Saving..."),C.scenes&&C.scenes.forEach(t=>{t.blocks&&t.blocks.forEach(s=>{(s.type==="action"||s.type==="dialogue")&&s.content&&(s.content=$t(s.content))})});try{await dn(C.id,C),ve=!1,Lt=!1,vt("Saved"),e&&w("Saved")}catch{Lt=!1,vt("Save failed"),w("Couldn't save changes · Tap retry")}}}function Pe(){be&&(clearTimeout(Qt),Qt=setTimeout(async()=>{ve&&be&&(await gt(!1),vt("Autosaved just now"),w("Autosaved just now"))},1500))}function vt(e){const t=document.getElementById("editor-save-status"),s=document.getElementById("editor-save-icon");t&&(t.textContent=e),e==="Saving..."?s&&(s.textContent="progress_activity",s.classList.add("animate-spin")):e==="Saved"||e==="Autosaved just now"||e==="Unsaved"?s&&(s.textContent="save",s.classList.remove("animate-spin")):e==="Save failed"&&s&&(s.textContent="warning",s.classList.remove("animate-spin"))}function Ft(){if(!C)return;const e=document.getElementById("navSceneSelect");if(e){const t=C.scenes||[];e.innerHTML=t.map((s,n)=>`
      <option value="${s.id}" ${n===0?"selected":""}>Scene ${s.number} ▾</option>
    `).join("")||'<option value="">Scene 1 ▾</option>'}}function ia(){const e=document.getElementById("navSceneSelect");e&&(e.onchange=s=>{const n=s.target.value;if(!n)return;ks(n);const a=C?.scenes?.find(o=>o.id===n);a&&y.setState({currentSceneId:a.number})});let t=null;try{const s=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search,n=new URLSearchParams(s||"");n.get("scene")&&(t=n.get("scene"))}catch{}if(!t&&y.state.currentSceneId&&(t=y.state.currentSceneId),t&&C?.scenes){const s=C.scenes.find(n=>String(n.number)===String(t)||n.id===String(t)||n.id===`scene-${t}`);s&&(e&&(e.value=s.id),setTimeout(()=>ks(s.id),250))}}function ks(e){const t=document.querySelector(`[data-scene-id="${e}"][data-block-type="scene"]`)||document.querySelector(`[data-scene-id="${e}"]`);t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.classList.add("bg-blue-50/50"),setTimeout(()=>t.classList.remove("bg-blue-50/50"),1500))}function ra(){const e=document.getElementById("element-bar");e&&e.querySelectorAll(".element-btn").forEach(t=>{t.onclick=s=>{s.preventDefault();const n=t.getAttribute("data-type");ca(n)}})}const Me={bold:null,italic:null,underline:null,strikeThrough:null};let Cs=!1;function Xe(e){const t=window.getSelection();if(!t||t.rangeCount===0)return!1;const s=t.anchorNode,n=s?.nodeType===Node.ELEMENT_NODE?s:s?.parentElement;if(!n)return!1;const a=n.closest(".screenplay-block");if(!a)return!1;if(!t.isCollapsed&&t.toString().trim().length>0)try{return document.queryCommandState(e)}catch{return!1}const o=a.getAttribute("data-block-type"),l=o==="scene"||o==="character"||o==="transition";try{if(e==="bold"){if(l){const i=n.closest("b, strong");return!!i&&i!==a}return document.queryCommandState("bold")}if(e==="strikeThrough")return n.closest("s, strike, del")?!0:document.queryCommandState("strikeThrough");if(e==="italic")return document.queryCommandState("italic");if(e==="underline")return document.queryCommandState("underline")}catch{return!1}return!1}function at(e){let t=document.activeElement,s=t?t.closest(".screenplay-block"):null,n=s?s.hasAttribute("contenteditable")?s:s.querySelector('[contenteditable="true"]'):null;if(!n&&he){const l=document.getElementById(he);l&&(s=l,n=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]'))}if(!n){const l=document.querySelector(".screenplay-block");l&&(s=l,n=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]'))}n&&document.activeElement!==n&&n.focus();const a=window.getSelection();if(a&&!a.isCollapsed&&a.rangeCount>0&&a.toString().trim().length>0){try{document.execCommand(e,!1,null)}catch{}s&&n&&ot(s,n.innerHTML),ve=!0,be&&Pe(),Me[e]=null,ct()}else{const i=!(Me[e]!==null?Me[e]:Xe(e));Me[e]=i;try{document.execCommand(e,!1,null)}catch{}ct()}}function ca(e){if(e==="bold"){at("bold");return}if(e==="italic"){at("italic");return}if(e==="underline"){at("underline");return}if(e==="strike"){at("strikeThrough");return}if(e==="undo"){document.execCommand("undo",!1,null),ct();return}if(e==="redo"){document.execCommand("redo",!1,null),ct();return}if(e==="image"){if(!he){const t=Array.from(document.querySelectorAll(".screenplay-block")),s=window.innerHeight/2;for(const n of t){const a=n.getBoundingClientRect();if(a.top<=s&&a.bottom>=s){he=n.getAttribute("data-block-id");break}}}is=he,qs(!0);return}if(!he){const t=document.querySelector(".screenplay-block");t&&(he=t.getAttribute("data-block-id"))}if(he){const t=document.getElementById(he);t&&(bt(t,e),_t(e))}}function _t(e){const t=document.getElementById("element-bar");t&&t.querySelectorAll(".element-btn").forEach(s=>{s.getAttribute("data-type")===e?s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-white bg-blue-600 shadow-2xs font-semibold shrink-0":s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0"})}function da(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),n=document.getElementById("btn-format-strike");[{btn:e,cmd:"bold"},{btn:t,cmd:"italic"},{btn:s,cmd:"underline"},{btn:n,cmd:"strikeThrough"}].forEach(({btn:l,cmd:i})=>{l&&(l.onmousedown=c=>{c.preventDefault(),c.stopPropagation()},l.onclick=c=>{c.preventDefault(),c.stopPropagation(),at(i)})}),Cs||(Cs=!0,document.addEventListener("selectionchange",()=>{ct()}));const o=document.getElementById("editor-main-scroll");o&&(o.addEventListener("keyup",ct),o.addEventListener("mouseup",ct))}function ct(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),n=document.getElementById("btn-format-strike");if(!e||!t||!s||!n)return;const a="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center border border-blue-600 shadow-2xs font-semibold active:scale-95 transition-all cursor-pointer",o="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center border border-slate-200/90 active:scale-95 transition-all cursor-pointer";try{const l=window.getSelection();let i=!1,c=!1,u=!1,p=!1;l&&!l.isCollapsed&&l.rangeCount>0&&l.toString().trim().length>0?(i=Xe("bold"),c=Xe("italic"),u=Xe("underline"),p=Xe("strikeThrough")):(i=Me.bold!==null?Me.bold:Xe("bold"),c=Me.italic!==null?Me.italic:Xe("italic"),u=Me.underline!==null?Me.underline:Xe("underline"),p=Me.strikeThrough!==null?Me.strikeThrough:Xe("strikeThrough")),e.className=i?a:o,t.className=c?a:o,s.className=u?a:o,n.className=p?a:o}catch{}}function ua(e,t){const s=document.getElementById("editor-more-menu-btn"),n=document.getElementById("editorMoreMenuModal"),a=document.getElementById("closeMoreMenuBtn");function o(R){n&&(n.classList.remove("hidden"),n.classList.add("flex"),Ze({id:"moreMenu",name:"Screenplay Tools",close:()=>{n.classList.add("hidden"),n.classList.remove("flex")},restore:()=>{n.classList.remove("hidden"),n.classList.add("flex")}}))}s&&(s.onclick=()=>o()),a&&(a.onclick=()=>Z("moreMenu")),n&&(n.onclick=R=>{R.target===n&&Z("moreMenu")});const l=document.getElementById("menu-btn-scene-navigator");l&&(l.onclick=()=>{Z("moreMenu");const R=document.getElementById("navSceneSelect");R&&R.focus()});const i=document.getElementById("menu-btn-char-navigator");i&&(i.onclick=()=>{Z("moreMenu");const R=Us(),G=prompt(`Select character to navigate to:
${R.join(", ")}`,R[0]||"HILL");if(G){for(const te of C.scenes)for(const H of te.blocks)if(H.type==="character"&&H.content.toUpperCase().includes(G.trim().toUpperCase())){const ae=document.getElementById(H.id);if(ae){ae.scrollIntoView({behavior:"smooth",block:"center"}),ae.classList.add("bg-blue-100/60"),setTimeout(()=>ae.classList.remove("bg-blue-100/60"),1500);return}}}});const c=document.getElementById("sceneNumberToggle"),u=document.getElementById("sceneNumberToggleText"),p=document.getElementById("menuSceneNumState"),x=document.getElementById("menu-btn-scene-numbers");function r(){st=!st,u&&(u.textContent=`Scene #s: ${st?"On":"Off"}`),p&&(p.textContent=st?"Enabled":"Disabled"),document.querySelectorAll(".scene-num-indicator").forEach(R=>{R.classList.toggle("hidden",!st)}),w(`Scene numbers ${st?"enabled (left side)":"hidden"}`)}c&&(c.onclick=r),x&&(x.onclick=()=>{r(),Z("moreMenu")});const d=document.getElementById("focusModeToggle"),b=document.getElementById("focusModeText"),f=document.getElementById("menu-btn-focus-mode"),v=document.getElementById("menuFocusState");function g(R=null){Ye=R!==null?R:!Ye,b&&(b.textContent=Ye?"Exit Focus":"Focus"),v&&(v.textContent=Ye?"Active":"Off");const G=document.getElementById("editor-collapsible-toolbars"),te=document.getElementById("editor-document-tabs"),H=document.getElementById("editor-fixed-header");if(Ye?(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!0),H&&(H.style.top="0px")):(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!1),H&&(H.style.top="0px")),G&&(G.style.display=Ye?"none":""),te&&(te.style.display=Ye?"none":"flex"),At(),Ye)Ze({id:"focusMode",name:"Focus Mode",close:()=>g(!1)}),w("Focus Mode active (distraction-free)");else{const ae=me.findIndex(oe=>oe.id==="focusMode");ae!==-1&&me.splice(ae,1),w("Exited Focus Mode")}}d&&(d.onclick=()=>g()),f&&(f.onclick=()=>{Z("moreMenu"),g()});const $=document.getElementById("langToggleBtn"),M=document.getElementById("langToggleText"),I=document.getElementById("tamilLangBadge");function k(R){Gt=R,M&&(M.textContent=R==="TA"?"தமிழ் / EN":R==="TL"?"Tanglish":"EN / தமிழ்"),I&&(I.textContent=R==="TA"?"தமிழ் விசைப்பலகை: இயங்குகிறது":R==="TL"?"Tanglish: Active":"Tamil IME: Ready"),w(`Screenplay language set to ${R==="TA"?"Tamil":R==="TL"?"Tanglish":"English"}`)}$&&($.onclick=()=>{k(Gt==="EN"?"TA":Gt==="TA"?"TL":"EN")}),document.querySelectorAll(".lang-choice-btn").forEach(R=>{R.onclick=()=>{k(R.getAttribute("data-lang")),Z("moreMenu")}});const T=document.getElementById("btn-open-production"),E=document.getElementById("menu-btn-production"),F=()=>{const R=e||y.state.selectedScriptId||"chronicles-of-dust";sessionStorage.setItem("scriptora_prod_return",`/editor/${R}`),t(`/production?from=editor&scriptId=${encodeURIComponent(R)}`)};T&&(T.onclick=F),E&&(E.onclick=()=>{Z("moreMenu"),F()});const O=document.getElementById("menu-btn-go-page");O&&(O.onclick=()=>{Z("moreMenu");const R=document.querySelectorAll(".screenplay-page-sheet").length||1,G=prompt(`Enter page number to jump to (1-${R}):`,"1");if(G){const te=document.querySelector(`[data-page-num="${G}"]`);te&&te.scrollIntoView({behavior:"smooth",block:"start"})}});const ne=document.getElementById("menu-btn-page-break");ne&&(ne.onclick=()=>{Z("moreMenu"),rs()});const m=document.getElementById("menu-btn-insert-page");m&&(m.onclick=()=>{Z("moreMenu"),Os()});const A=document.getElementById("menu-btn-page-before");A&&(A.onclick=()=>{Z("moreMenu"),js()});const h=document.getElementById("menu-btn-page-at-end");h&&(h.onclick=()=>{Z("moreMenu"),cs()});const B=document.getElementById("btn-undo"),K=document.getElementById("btn-redo");B&&(B.onclick=()=>document.execCommand("undo")),K&&(K.onclick=()=>document.execCommand("redo"))}function pa(){const e=document.getElementById("btn-quick-find"),t=document.getElementById("menu-btn-find-replace"),s=document.getElementById("closeFindBtn"),n=document.getElementById("findInput"),a=document.getElementById("replaceInput"),o=document.getElementById("findNextBtn"),l=document.getElementById("findPrevBtn"),i=document.getElementById("replaceBtn"),c=document.getElementById("replaceAllBtn"),u=document.getElementById("findReplaceModal");e&&(e.onclick=()=>jt(!0)),t&&(t.onclick=()=>{Z("moreMenu"),jt(!0)}),s&&(s.onclick=()=>Z("findModal")),u&&(u.onclick=p=>{p.target===u&&Z("findModal")}),n&&(n.oninput=()=>Yt(n.value)),o&&(o.onclick=()=>ts(1)),l&&(l.onclick=()=>ts(-1)),i&&(i.onclick=()=>{const p=n.value,x=a.value;if(!p||nt===-1||!_e[nt])return;const r=_e[nt];r.block.content=r.block.content.replace(p,x),Le(),Yt(p),ve=!0,be&&Pe(),w("Replaced 1 occurrence")}),c&&(c.onclick=()=>{const p=n.value,x=a.value;if(!p)return;let r=0;C.scenes.forEach(d=>{d.blocks.forEach(b=>{b.content&&b.content.includes(p)&&(b.content=b.content.split(p).join(x),r++)})}),Le(),Yt(p),ve=!0,be&&Pe(),w(`Replaced ${r} occurrences`)})}function jt(e){const t=document.getElementById("findReplaceModal");if(t)if(e)Kt=document.getElementById("editor-main-scroll")?.scrollTop||0,Jt=he,t.classList.remove("hidden"),t.classList.add("flex"),Ze({id:"findModal",name:"Find & Replace",close:()=>jt(!1)}),setTimeout(()=>{document.getElementById("findInput")?.focus()},40);else{t.classList.add("hidden"),t.classList.remove("flex"),ps();const s=document.getElementById("editor-main-scroll");if(s&&Kt!==null&&(s.scrollTop=Kt),Jt){const a=document.getElementById(Jt),o=a?.querySelector('[contenteditable="true"]')||a;o&&o.focus()}const n=me.findIndex(a=>a.id==="findModal");n!==-1&&me.splice(n,1)}}function Yt(e){_e=[],nt=-1;const t=document.getElementById("findMatchesCount");if(!e||!C){t&&(t.textContent="0 of 0"),ps();return}C.scenes.forEach(s=>{s.blocks.forEach(n=>{n.content&&n.content.toLowerCase().includes(e.toLowerCase())&&_e.push({block:n,sceneId:s.id})})}),t&&(t.textContent=_e.length>0?`1 of ${_e.length}`:"0 of 0"),_e.length>0&&ts(0)}function ts(e){if(_e.length===0)return;nt=(nt+e+_e.length)%_e.length;const t=_e[nt],s=document.getElementById("findMatchesCount");s&&(s.textContent=`${nt+1} of ${_e.length}`);const n=document.getElementById(t.block.id);n&&(n.scrollIntoView({behavior:"smooth",block:"center"}),ps(),n.classList.add("bg-yellow-100"))}function ps(){document.querySelectorAll(".screenplay-block").forEach(e=>{e.classList.remove("bg-yellow-100")})}function qs(e){const t=document.getElementById("imageModal");if(t)if(e)he&&(is=he),t.classList.remove("hidden"),t.classList.add("flex"),Ze({id:"imageModal",name:"Insert Image",close:()=>qs(!1)});else{t.classList.add("hidden"),t.classList.remove("flex");const s=me.findIndex(n=>n.id==="imageModal");s!==-1&&me.splice(s,1)}}function xa(e){const t=document.getElementById("imageModal"),s=document.getElementById("closeImageModal"),n=document.getElementById("cancelImageBtn"),a=document.getElementById("insertImageBtn"),o=document.getElementById("imgFileInput"),l=document.getElementById("imgUploadLabel"),i=document.getElementById("imgUrlInput"),c=document.getElementById("imgCaptionInput"),u=document.getElementById("imgPreviewContainer"),p=document.getElementById("imgPreviewThumb"),x=document.getElementById("clearImgPreviewBtn");let r="";function d(P){u&&p&&(P?(p.src=P,u.classList.remove("hidden")):(u.classList.add("hidden"),p.src=""))}function b(P,D){const q=new Image;q.onload=()=>{let X=q.width,ye=q.height;(X>900||ye>600)&&(X/ye>900/600?(ye=Math.round(ye*900/X),X=900):(X=Math.round(X*600/ye),ye=600));const pe=document.createElement("canvas");pe.width=X,pe.height=ye,pe.getContext("2d").drawImage(q,0,0,X,ye),D(pe.toDataURL("image/jpeg",.85))},q.onerror=()=>D(P),q.src=P}s&&(s.onclick=()=>Z("imageModal")),n&&(n.onclick=()=>Z("imageModal")),t&&(t.onclick=P=>{P.target===t&&Z("imageModal")}),document.querySelectorAll(".img-preset-btn").forEach(P=>{P.onclick=()=>{const D=P.getAttribute("data-url"),q=P.getAttribute("data-caption");i&&(i.value=D),c&&!c.value&&(c.value=q),r=D,d(D)}}),i&&(i.oninput=()=>{const P=i.value.trim();P?(r="",d(P)):r||d("")}),x&&(x.onclick=()=>{r="",i&&(i.value=""),o&&(o.value=""),l&&(l.textContent="Choose local image..."),d("")}),o&&(o.onchange=P=>{const D=P.target.files?.[0];if(D){l&&(l.textContent=D.name);const q=new FileReader;q.onload=le=>{b(le.target.result,de=>{r=de,d(de)})},q.readAsDataURL(D)}}),a&&(a.onclick=()=>{const P=i?.value.trim(),D=c?.value.trim();let q=r||P;q||(q="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80");const le={id:`b-${Date.now().toString().slice(-6)}`,type:"image",url:q,content:q,caption:D||""},de=is||he;let X=null,ye=-1;if(C.scenes&&C.scenes.length>0){if(de)for(const pe of C.scenes){const xe=(pe.blocks||[]).findIndex(fe=>fe.id===de);if(xe!==-1){X=pe,ye=xe+1;break}}if(!X){const xe=document.getElementById("navSceneSelect")?.value||(y.state.currentSceneId?`scene-${y.state.currentSceneId}`:null);xe&&(X=C.scenes.find(fe=>fe.id===xe||String(fe.number)===String(y.state.currentSceneId)))}if(!X){const pe=Array.from(document.querySelectorAll(".screenplay-block")),xe=window.innerHeight/2;for(const fe of pe){const se=fe.getBoundingClientRect();if(se.top<=xe&&se.bottom>=xe){const ue=fe.getAttribute("data-scene-id");X=C.scenes.find(re=>re.id===ue);const Ie=fe.getAttribute("data-block-id");if(X&&Ie){const re=(X.blocks||[]).findIndex(Ne=>Ne.id===Ie);re!==-1&&(ye=re+1)}break}}}X||(X=C.scenes[0]),X.blocks||(X.blocks=[]),ye!==-1&&ye<=X.blocks.length?X.blocks.splice(ye,0,le):X.blocks.push(le)}else C.scenes=[{id:"scene-1",number:1,slugline:"INT. SCENE - DAY",blocks:[le]}];r="",o&&(o.value=""),i&&(i.value=""),c&&(c.value=""),l&&(l.textContent="Upload local image file..."),d(""),Le(),ve=!0,be&&Pe(),w("Storyboard image inserted"),Z("imageModal"),setTimeout(()=>{const pe=document.getElementById(le.id);pe&&(pe.scrollIntoView({behavior:"smooth",block:"center"}),pe.classList.add("ring-2","ring-blue-500"),setTimeout(()=>pe.classList.remove("ring-2","ring-blue-500"),1500))},80)});const f=document.getElementById("preferencesModal"),v=document.getElementById("menu-btn-preferences"),g=document.getElementById("closePrefModal"),$=document.getElementById("savePrefBtn");function M(P){if(f)if(P)f.classList.remove("hidden"),f.classList.add("flex"),Ze({id:"preferencesModal",name:"Preferences",close:()=>M(!1)});else{f.classList.add("hidden"),f.classList.remove("flex");const D=me.findIndex(q=>q.id==="preferencesModal");D!==-1&&me.splice(D,1)}}v&&(v.onclick=()=>{Z("moreMenu"),M(!0)}),g&&(g.onclick=()=>Z("preferencesModal")),f&&(f.onclick=P=>{P.target===f&&Z("preferencesModal")}),$&&($.onclick=()=>{const P=document.getElementById("prefSceneNumbers")?.checked,D=document.getElementById("prefLineSpacing")?.value,q=document.getElementById("prefFontSize")?.value;st=P,document.querySelectorAll(".scene-num-indicator").forEach(de=>de.classList.toggle("hidden",!P));const le=document.querySelector(".screenplay-page-sheet");le&&(le.style.lineHeight=D==="2.0"?"30px":D==="1.0"?"20px":"24px",le.style.fontSize=q==="14pt"?"16px":"15px"),Z("preferencesModal"),w("Preferences applied")});function I(P){return P?P.replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/[\r\n]+/g," ").replace(/[^\x20-\x7E]/g,D=>({"—":"--","–":"-","“":'"',"”":'"',"‘":"'","’":"'","…":"...","·":"-","•":"*"})[D]||" "):""}function k(P,D){if(!P)return[];const q=P.split(/\s+/),le=[];let de="";for(const X of q)de?(de+" "+X).length<=D?de+=" "+X:(le.push(de),de=X):de=X;return de&&le.push(de),le}function T(P,D,q={}){const{includeTitlePage:le=!0,includePageNumbers:de=!0,sceneNumbers:X=!0,preservePageBreaks:ye=!0,pageSheets:pe=[]}=q,xe=[],se=595.28/2,ue=108,Ie=525,re=14.4,Ne=14.4,we=(W,Re=12)=>(W?W.length:0)*(Re*.6),it=(W,Re=12)=>Math.round(se-we(W,Re)/2),Ut=(W,Re=12,ge=Ie)=>Math.round(ge-we(W,Re));if(le&&P.titlePage&&(D.has(1)||q.rangeType==="all")){const W=P.titlePage,Re=(W.title||P.title||"UNTITLED SCREENPLAY").toUpperCase(),ge=k(Re,35),ee=[];let Ge=520;ge.forEach($e=>{ee.push({text:$e,x:it($e,12),y:Ge,font:"F2",size:12}),Ge-=re}),Ge-=24;const ke=W.by!==void 0?W.by:"Written by";ke&&(ee.push({text:ke,x:it(ke,12),y:Ge,font:"F1",size:12}),Ge-=re+4);const je=W.author||"Author";ee.push({text:je,x:it(je,12),y:Ge,font:"F2",size:12});let Y=(W.phone||"").trim();if(!Y&&W.contact){const et=W.contact.split("·").map(Rt=>Rt.trim()).find(Rt=>Rt.includes("+")||/\d{3}/.test(Rt));et&&(Y=et)}Y&&!Y.toLowerCase().startsWith("phone")&&(Y=`Phone: ${Y}`);let Se=(W.email||"").trim();if(!Se&&W.contact&&W.contact.includes("@")){const $e=W.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);$e&&(Se=$e[0])}Se&&!Se.toLowerCase().startsWith("e-mail")&&!Se.toLowerCase().startsWith("email")&&(Se=`E-mail: ${Se}`);const Ke=[];if(Y&&Ke.push(Y),Se&&Ke.push(Se),W.address){const $e=k(W.address.trim(),40);Ke.push(...$e)}else if(!Y&&!Se&&W.contact){const $e=W.contact.split("·").map(et=>et.trim()).filter(Boolean);Ke.push(...$e)}let It=130;Ke.forEach($e=>{ee.push({text:$e,x:ue,y:It,font:"F1",size:12}),It-=re}),xe.push(ee)}pe.forEach(W=>{const Re=parseInt(W.getAttribute("data-page-num"),10)||1;if(!D.has(Re))return;const ge=[];if(de&&Re>1){const ke=`${Re}.`;ge.push({text:ke,x:Ut(ke,12,Ie),y:805,font:"F1",size:12})}let ee=765;W.querySelectorAll(".screenplay-block").forEach(ke=>{if(ee<65)return;const je=ke.getAttribute("data-block-type");if(je==="pagebreak"){if(ye){ee-=re;const Y="----------------------------------------";ge.push({text:Y,x:it(Y,12),y:ee,font:"F1",size:12}),ee-=re}return}if(je==="scene"){const Y=ke.querySelector('[contenteditable="true"]'),Se=(Y?Y.innerText.trim():ke.innerText.trim()).toUpperCase(),Ke=X&&ke.querySelector(".scene-num-indicator")?.innerText?.trim()||"";ee-=Ne,k(Se,57).forEach(($e,et)=>{et===0&&Ke&&ge.push({text:Ke,x:76,y:ee,font:"F2",size:12}),ge.push({text:$e,x:ue,y:ee,font:"F2",size:12}),ee-=re})}else if(je==="character"){const Y=ke.innerText.trim().toUpperCase();ee-=Ne,ge.push({text:Y,x:266,y:ee,font:"F2",size:12}),ee-=re}else if(je==="parenthetical"){let Y=ke.innerText.trim();Y.startsWith("(")||(Y="("+Y),Y.endsWith(")")||(Y=Y+")"),k(Y,26).forEach(Se=>{ge.push({text:Se,x:223,y:ee,font:"F1",size:12}),ee-=re})}else if(je==="dialogue"){const Y=ke.innerText.trim();k(Y,35).forEach(Se=>{ge.push({text:Se,x:180,y:ee,font:"F1",size:12}),ee-=re})}else if(je==="transition"){const Y=ke.innerText.trim().toUpperCase();ee-=Ne,ge.push({text:Y,x:Ut(Y,12,Ie),y:ee,font:"F2",size:12}),ee-=re}else if(je==="shot"){const Y=ke.innerText.trim().toUpperCase();ee-=Ne,ge.push({text:Y,x:ue,y:ee,font:"F2",size:12}),ee-=re}else if(je==="image"){const Y=ke.querySelector('[contenteditable="true"]')?.innerText?.trim()||"Storyboard Image";ee-=Ne,ge.push({text:`[STORYBOARD: ${Y}]`,x:ue,y:ee,font:"F1",size:12}),ee-=re}else{const Y=ke.innerText.trim();Y&&(ee-=Ne,k(Y,58).forEach(Se=>{ge.push({text:Se,x:ue,y:ee,font:"F1",size:12}),ee-=re}))}}),xe.push(ge)}),xe.length===0&&xe.push([{text:P.title||"Screenplay",x:ue,y:750,font:"F2",size:12}]);const Oe=xe.length,Ve=[],Ae=[];let Ue=4;for(let W=0;W<Oe;W++)Ue++,Ve.push(Ue),Ue++,Ae.push(Ue);const We=[];We[1]="<< /Type /Catalog /Pages 2 0 R >>",We[2]=`<< /Type /Pages /Kids [${Ve.map(W=>W+" 0 R").join(" ")}] /Count ${Oe} /MediaBox [0 0 595.28 841.89] >>`,We[3]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>",We[4]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>";for(let W=0;W<Oe;W++){const Re=Ve[W],ge=Ae[W];We[Re]=`<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${ge} 0 R >>`;const ee=[];for(const Y of xe[W]){const Se=Y.font||"F1",Ke=Y.size||12,It=Y.x||ue,$e=Y.y||750,et=I(Y.text);ee.push(`BT /${Se} ${Ke} Tf ${It.toFixed(2)} ${$e.toFixed(2)} Td (${et}) Tj ET`)}const Ge=ee.join(`
`),je=new TextEncoder().encode(Ge);We[ge]=`<< /Length ${je.length} >>
stream
${Ge}
endstream`}const qt=new TextEncoder,xs=qt.encode(`%PDF-1.4
%âãÏÓ
`);let zt=xs.length;const fs=[],ms=[];for(let W=1;W<=Ue;W++){fs[W]=zt;const Re=`${W} 0 obj
${We[W]}
endobj
`,ge=qt.encode(Re);ms.push(ge),zt+=ge.length}const Ys=zt;let Vt=`xref
0 ${Ue+1}
0000000000 65535 f 
`;for(let W=1;W<=Ue;W++)Vt+=`${String(fs[W]).padStart(10,"0")} 00000 n 
`;Vt+=`trailer
<< /Size ${Ue+1} /Root 1 0 R >>
startxref
${Ys}
%%EOF`;const Xs=qt.encode(Vt);return new Blob([xs,...ms,Xs],{type:"application/pdf"})}const E=document.getElementById("exportModal"),F=document.getElementById("exportModalBtn"),O=document.getElementById("menu-btn-export"),ne=document.getElementById("closeExportModal"),m=document.getElementById("cancelExportBtn"),A=document.getElementById("startExportBtn"),h=document.getElementById("exportProgressArea"),B=document.getElementById("exportProgressBar"),K=document.getElementById("exportStatusText");function R(P){if(E)if(P)E.classList.remove("hidden"),E.classList.add("flex"),Ze({id:"exportModal",name:"Export",close:()=>R(!1)});else{E.classList.add("hidden"),E.classList.remove("flex"),h?.classList.add("hidden");const D=me.findIndex(q=>q.id==="exportModal");D!==-1&&me.splice(D,1)}}F&&(F.onclick=()=>R(!0)),O&&(O.onclick=()=>{Z("moreMenu"),R(!0)}),ne&&(ne.onclick=()=>Z("exportModal")),m&&(m.onclick=()=>Z("exportModal")),E&&(E.onclick=P=>{P.target===E&&Z("exportModal")});const G=document.getElementById("exportPageRangeSelect"),te=document.getElementById("exportCustomRangeInput");G&&te&&(G.onchange=()=>{te.classList.toggle("hidden",G.value!=="custom"),G.value==="custom"&&te.focus()}),A&&(A.onclick=()=>{const P=document.getElementById("exportFormatSelect")?.value||"pdf",D=document.getElementById("exportPageRangeSelect")?.value||"all",q=document.getElementById("exportCustomRangeInput")?.value||"",le=document.getElementById("optPageNumbers")?.checked!==!1,de=document.getElementById("optPreservePageBreaks")?.checked!==!1,X=document.getElementById("optStandardMargins")?.checked!==!1,ye=document.getElementById("optSceneNumbers")?.checked!==!1,pe=Array.from(document.querySelectorAll(".screenplay-page-sheet")),xe=pe.length||1;let fe=new Set;if(D==="all")for(let se=1;se<=xe;se++)fe.add(se);else if(D==="current"){let se=1;if(he){const ue=document.getElementById(he),Ie=ue?ue.closest(".screenplay-page-sheet"):null;Ie&&(se=parseInt(Ie.getAttribute("data-page-num"),10)||1)}fe.add(se)}else if(D==="custom"&&(q.split(",").forEach(ue=>{if(ue=ue.trim(),ue.includes("-")){const[Ie,re]=ue.split("-").map(Ne=>parseInt(Ne.trim(),10));if(!isNaN(Ie)&&!isNaN(re))for(let Ne=Math.max(1,Ie);Ne<=Math.min(xe,re);Ne++)fe.add(Ne)}else{const Ie=parseInt(ue,10);!isNaN(Ie)&&Ie>=1&&Ie<=xe&&fe.add(Ie)}}),fe.size===0))for(let ue=1;ue<=xe;ue++)fe.add(ue);h.classList.remove("hidden"),B.style.width="35%",K.textContent=X?'Applying standard A4 margins (1.5" left, 1.0" right) & Courier Prime...':"Formatting Courier Prime typography and page layout...",setTimeout(()=>{B.style.width="80%",K.textContent=`Compiling standard ${P.toUpperCase()} for pages [${Array.from(fe).join(", ")}]...`},500),setTimeout(()=>{B.style.width="100%",K.textContent="Completed! Starting download...";let se="";if(document.getElementById("optTitlePage")?.checked&&C.titlePage&&(fe.has(1)||D==="all")){const we=C.titlePage;se+=`${we.title||C.title}

`,se+=`${we.by||"Written by"}

`,se+=`${we.author||"Author"}

`,we.phone&&(se+=`${we.phone}
`),we.email&&(se+=`${we.email}
`),we.address&&(se+=`${we.address}
`),!we.phone&&!we.email&&!we.address&&we.contact&&(se+=`${we.contact}
`),se+=`

================================================================================
\f
`}pe.forEach(we=>{const it=parseInt(we.getAttribute("data-page-num"),10)||1;if(!fe.has(it))return;le&&(se+=`
											${it}.

`),we.querySelectorAll(".screenplay-block").forEach(Oe=>{const Ve=Oe.getAttribute("data-block-type");if(Ve==="pagebreak"){de&&(se+=`
[=== PAGE BREAK ===]

`);return}let Ae="";if(Ve==="scene"){const Ue=Oe.querySelector('[contenteditable="true"]');Ae=Ue?Ue.innerText.trim():Oe.innerText.trim();const We=ye&&Oe.querySelector(".scene-num-indicator")?.innerText?.trim()||"";se+=`

${We?We+". ":""}${Ae}

`}else Ve==="character"?(Ae=Oe.innerText.trim(),se+=`
			${Ae}
`):Ve==="parenthetical"?(Ae=Oe.innerText.trim(),se+=`		${Ae.startsWith("(")?Ae:"("+Ae+")"}
`):Ve==="dialogue"?(Ae=Oe.innerText.trim(),se+=`	${Ae}
`):Ve==="transition"?(Ae=Oe.innerText.trim(),se+=`
						${Ae}

`):(Ae=Oe.innerText.trim(),Ae&&(se+=`${Ae}

`))}),se+=`
\f
`});let ue;P==="pdf"?ue=T(C,fe,{includeTitlePage:document.getElementById("optTitlePage")?.checked!==!1,includePageNumbers:le,sceneNumbers:ye,preservePageBreaks:de,pageSheets:pe,rangeType:D}):ue=new Blob([se],{type:"text/plain"});const Ie=URL.createObjectURL(ue),re=document.createElement("a");re.href=Ie;const Ne=D==="all"?"All_Pages":`Pages_${Array.from(fe).join("-")}`;re.download=`${C.title.replace(/[^a-zA-Z0-9]/g,"_")}_${C.draft||"Draft"}_${Ne}.${P}`,document.body.appendChild(re),re.click(),re.remove(),w(`Exported "${re.download}" successfully`),setTimeout(()=>Z("exportModal"),800)},1e3)});const H=document.getElementById("versionsModal"),ae=document.getElementById("versionsModalBtn"),oe=document.getElementById("menu-btn-versions"),S=document.getElementById("closeVersionsModal"),z=document.getElementById("versionsListContainer");function J(P){H&&(H.classList.remove("hidden"),H.classList.add("flex"),j(),Ze({id:"versionsModal",name:"Versions",close:()=>{H.classList.add("hidden"),H.classList.remove("flex")},restore:()=>{H.classList.remove("hidden"),H.classList.add("flex"),j()}}))}async function j(){const P=await un(e);z&&(z.innerHTML=P.map(D=>`
      <div class="p-3 rounded-xl border ${D.isCurrent?"border-2 border-blue-600 bg-blue-50/30":"border-slate-200 bg-white hover:bg-slate-50"} transition-colors flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-heading font-bold text-sm text-slate-900">${D.name}</span>
            <span class="px-2 py-0.5 rounded-full ${D.isCurrent?"bg-blue-600 text-white font-semibold":"bg-slate-100 text-slate-600 font-medium"} text-[10px]">${D.tag}</span>
          </div>
          <span class="text-[11px] text-slate-400 font-caption">${D.timestamp}</span>
        </div>
        <p class="text-xs text-slate-600">${D.notes||"Point-in-time snapshot."}</p>
        <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>Edited by ${D.author}</span>
          <div class="flex items-center gap-2">
            <span class="font-medium text-slate-700">${D.stats}</span>
            ${D.isCurrent?"":`<button class="restore-version-btn text-blue-600 font-semibold hover:underline" data-vname="${D.name}">Restore</button>`}
          </div>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".restore-version-btn").forEach(D=>{D.onclick=()=>{const q=D.getAttribute("data-vname");w(`Restored version "${q}"`),document.getElementById("currentVersionTag").textContent=q,Z("versionsModal")}}))}ae&&(ae.onclick=()=>J()),oe&&(oe.onclick=()=>{Z("moreMenu"),J()}),S&&(S.onclick=()=>Z("versionsModal")),H&&(H.onclick=P=>{P.target===H&&Z("versionsModal")});const Ee=document.getElementById("newVersionModal"),Q=document.getElementById("openNewVersionPrompt"),ie=document.getElementById("closeNewVersionModal"),De=document.getElementById("cancelNewVersionBtn"),He=document.getElementById("saveNewVersionBtn");function xt(){H.classList.add("hidden"),Ee.classList.remove("hidden"),Ee.classList.add("flex"),Ze({id:"newVersionModal",name:"New Version",close:()=>{Ee.classList.add("hidden"),Ee.classList.remove("flex")}})}Q&&(Q.onclick=xt),ie&&(ie.onclick=()=>Z("newVersionModal")),De&&(De.onclick=()=>Z("newVersionModal")),He&&(He.onclick=async()=>{const P=document.getElementById("newVersionNameInput")?.value.trim(),D=document.getElementById("newVersionNotesInput")?.value.trim();P&&(await pn(e,{name:P,notes:D}),w(`Created version snapshot "${P}"`),document.getElementById("currentVersionTag").textContent=P,Z("newVersionModal"))});const ze=document.getElementById("compareModal"),N=document.getElementById("openCompareBtn"),L=document.getElementById("menu-btn-compare"),U=document.getElementById("closeCompareModal"),V=document.getElementById("closeCompareBtn2");function ce(){H.classList.add("hidden"),ze.classList.remove("hidden"),ze.classList.add("flex"),Ze({id:"compareModal",name:"Compare Versions",close:()=>{ze.classList.add("hidden"),ze.classList.remove("flex")}})}N&&(N.onclick=ce),L&&(L.onclick=()=>{Z("moreMenu"),ce()}),U&&(U.onclick=()=>Z("compareModal")),V&&(V.onclick=()=>Z("compareModal")),ze&&(ze.onclick=P=>{P.target===ze&&Z("compareModal")})}function Ht(){if(!C)return;let e=0;C.scenes.forEach(o=>{o.blocks.forEach(l=>{l.content&&(e+=l.content.trim().split(/\s+/).filter(Boolean).length)})});const s=document.querySelectorAll(".screenplay-page-sheet").length||1,n=document.getElementById("telemetry-page-count"),a=document.getElementById("telemetry-word-count");n&&(n.textContent=`Page 1 of ${s}`),a&&(a.textContent=`${e.toLocaleString()} words`)}function fa(){const e=y.state.scripts||[],t=y.state.selectedScriptId||"chronicles-of-dust",s=e.find(n=>n.id===t)||e[0]||{title:"Chronicles of Dust"};return`
    ${Be("Intelligence","Script Selector")}

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

    ${Te("intelligence")}
  `}function ma(e){let t=y.state.selectedScriptId||"chronicles-of-dust";document.querySelectorAll(".script-select-card").forEach(a=>{a.onclick=()=>{const o=a.getAttribute("data-script-id"),l=a.getAttribute("data-script-title");t=o,y.selectScript(o),document.querySelectorAll(".script-select-card").forEach(u=>{u.className="script-select-card relative p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const p=u.querySelector(".script-select-indicator");p&&(p.className="script-select-indicator w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0",p.innerHTML='<span class="material-symbols-outlined text-[16px]">arrow_forward</span>')}),a.className="script-select-card relative p-3.5 rounded-xl border border-blue-600 bg-blue-50/70 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const i=a.querySelector(".script-select-indicator");i&&(i.className="script-select-indicator w-6 h-6 rounded-full bg-blue-600 text-white shadow-xs flex items-center justify-center shrink-0",i.innerHTML='<span class="material-symbols-outlined text-[16px] font-bold">check</span>');const c=document.getElementById("selector-btn-label");c&&(c.textContent=`Continue to Context (${l})`)}});const s=document.getElementById("submit-continue-analysis-btn");s&&(s.onclick=()=>{y.selectScript(t),e("/intelligence/context")});const n=document.getElementById("btn-import-script-modal");n&&(n.onclick=()=>{w("Select screenplay file (.fountain, .fdx, .pdf) to parse","info")})}function ba(){const e=y.state.selectedScriptId||"chronicles-of-dust",t=y.state.scripts.find(n=>n.id===e)||y.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",format:"Feature",industry:"International / Hollywood"},s=t.context||{format:t.format||"Feature",industry:t.industry||"International / Hollywood",hours:1,minutes:36,seconds:0};return`
    ${Be("Intelligence","Context Calibration")}

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

    ${Te("intelligence")}
  `}function ga(e){const t=y.state.selectedScriptId||"chronicles-of-dust",s=y.state.scripts.find(x=>x.id===t)||y.state.activeScript||{},n=s.context||{};let a=n.format||s.format||"Feature",o=n.hours!==void 0?n.hours:1,l=n.minutes!==void 0?n.minutes:36,i=n.seconds!==void 0?n.seconds:0;document.querySelectorAll(".format-card").forEach(x=>{x.onclick=()=>{a=x.getAttribute("data-format"),document.querySelectorAll(".format-card").forEach(r=>{r.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 transition-all cursor-pointer hover:bg-slate-50"}),x.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 border-2 border-blue-600 transition-all cursor-pointer",a==="Short"?(o=0,l=25,i=0):a==="Pilot"?(o=0,l=50,i=30):(o=1,l=45,i=0),c()}});function c(){const x=g=>String(g).padStart(2,"0"),r=document.getElementById("val-hr"),d=document.getElementById("val-min"),b=document.getElementById("val-sec");r&&(r.value=x(o)),d&&(d.value=x(l)),b&&(b.value=x(i));const f=o*60+l+Math.round(i/60),v=document.getElementById("pacing-projection");v&&(v.textContent=`~${f} standard script pages`)}document.querySelectorAll(".stepper-btn").forEach(x=>{x.onclick=()=>{const r=x.getAttribute("data-unit"),d=parseInt(x.getAttribute("data-delta"),10)||0;r==="hr"&&(o=Math.max(0,Math.min(9,o+d))),r==="min"&&(l=Math.max(0,Math.min(59,l+d))),r==="sec"&&(i=Math.max(0,Math.min(59,i+d))),c()}}),[{id:"val-hr",max:9,get:()=>o,set:x=>{o=x}},{id:"val-min",max:59,get:()=>l,set:x=>{l=x}},{id:"val-sec",max:59,get:()=>i,set:x=>{i=x}}].forEach(({id:x,max:r,set:d,get:b})=>{const f=document.getElementById(x);f&&(f.onfocus=()=>{f.select()},f.oninput=()=>{let v=f.value.replace(/\D/g,"");if(v==="")d(0);else{let M=parseInt(v,10);isNaN(M)&&(M=0),M>r?(M=r,f.value=String(M)):f.value=v.slice(0,2),d(M)}const g=o*60+l+Math.round(i/60),$=document.getElementById("pacing-projection");$&&($.textContent=`~${g} standard script pages`)},f.onblur=()=>{let v=f.value.replace(/\D/g,""),g=parseInt(v,10);isNaN(g)&&(g=0),g=Math.max(0,Math.min(r,g)),d(g),f.value=String(g).padStart(2,"0"),c()},f.onkeydown=v=>{if(v.key==="Enter")f.blur();else if(v.key==="ArrowUp"){v.preventDefault();const g=b(),$=Math.min(r,g+1);d($),f.value=String($).padStart(2,"0"),c()}else if(v.key==="ArrowDown"){v.preventDefault();const g=b(),$=Math.max(0,g-1);d($),f.value=String($).padStart(2,"0"),c()}})});const p=document.getElementById("btn-submit-context");p&&(p.onclick=async()=>{const x=document.getElementById("industry-select")?.value||"International / Hollywood";p.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Calibrating SCRIPTORA...</span>',p.disabled=!0;const r=b=>String(b).padStart(2,"0"),d={format:a,industry:x,hours:o,minutes:l,seconds:i,plannedDuration:`${r(o)}:${r(l)}:${r(i)}`};await Sn(t,d),w("Narrative parameters calibrated"),e("/intelligence/dashboard")})}function ha(){const e=y.state.selectedScriptId||"chronicles-of-dust",t=y.state.scripts.find(n=>n.id===e)||y.state.activeScript||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pages:96,format:"Feature"},s=t.analysisScores||{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80};return`
    ${Be("Intelligence","Script Analysis")}

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
            ${[{name:"Pacing",key:"pacing",score:s.pacing,icon:"speed"},{name:"Dialogue",key:"dialogue",score:s.dialogue,icon:"chat"},{name:"Emotion",key:"emotion",score:s.emotion,icon:"favorite"},{name:"Character Arc",key:"character-arc",score:s.characterArc,icon:"alt_route"},{name:"Continuity",key:"continuity",score:s.continuity,icon:"linear_scale"},{name:"Story Structure",key:"story-structure",score:s.storyStructure,icon:"account_tree"},{name:"Theme",key:"theme",score:s.theme,icon:"lightbulb"},{name:"Cinema",key:"cinema",score:s.cinema,icon:"videocam"},{name:"Formatting",key:"formatting",score:s.formatting,icon:"rule"},{name:"Production",key:"production",score:s.production,icon:"movie_creation"}].map(n=>`
              <a href="/intelligence/analysis/${n.key}?from=/intelligence/dashboard" class="py-2.5 px-2 -mx-2 rounded-xl flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors no-underline group cursor-pointer">
                <div class="flex items-center gap-2 w-36 shrink-0">
                  <span class="material-symbols-outlined text-[17px] text-slate-400 group-hover:text-blue-600 transition-colors">${n.icon}</span>
                  <span class="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors truncate">${n.name}</span>
                </div>
                <div class="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div class="h-full bg-blue-600 rounded-full" style="width: ${n.score}%;"></div>
                </div>
                <span class="text-xs sm:text-sm font-bold text-slate-900 w-8 text-right font-mono">${n.score}</span>
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
            ${y.state.scripts.map(n=>`
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

    ${Te("intelligence")}
  `}function va(e){const t=y.state.selectedScriptId||"chronicles-of-dust",s=y.state.scripts.find(g=>g.id===t)||y.state.scripts[0],n=document.getElementById("btn-gen-logline"),a=document.getElementById("btn-gen-synopsis"),o=document.getElementById("ai-generated-container"),l=document.getElementById("ai-generated-title"),i=document.getElementById("ai-generated-body"),c=document.getElementById("ai-close-btn"),u=document.getElementById("ai-copy-btn"),p=document.getElementById("ai-copy-text"),x=document.getElementById("ai-query-input"),r=document.getElementById("ai-query-submit");function d(g){o&&(o.classList.remove("hidden"),l.textContent=g==="logline"?"Generated Logline":"Generated Synopsis",i.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Generating with narrative telemetry...</span>',setTimeout(()=>{i.textContent=g==="logline"?s?.logline||"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.":s?.synopsis||"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves."},400))}if(n&&(n.onclick=()=>d("logline")),a&&(a.onclick=()=>d("synopsis")),c&&(c.onclick=()=>o.classList.add("hidden")),u&&(u.onclick=()=>{navigator.clipboard?.writeText(i.textContent||""),p.textContent="Copied!",setTimeout(()=>{p.textContent="Copy"},1800),w("Copied to clipboard")}),r&&x){const g=async()=>{const $=x.value.trim();if(!$)return;o.classList.remove("hidden"),l.textContent="Intelligence AI Answer",i.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing draft semantics...</span>';const M=await as($,t);i.textContent=M,x.value=""};r.onclick=g,x.onkeydown=$=>{$.key==="Enter"&&g()}}const b=document.getElementById("script-switcher-modal"),f=document.getElementById("script-selector-trigger"),v=document.getElementById("close-script-switcher-modal");f&&(f.onclick=()=>b?.classList.remove("hidden")),v&&(v.onclick=()=>b?.classList.add("hidden")),document.querySelectorAll(".script-switch-opt").forEach(g=>{g.onclick=()=>{const $=g.getAttribute("data-id");y.selectScript($),b?.classList.add("hidden"),e("/intelligence")}})}function ya(){const e=y.state.selectedScriptId||"chronicles-of-dust",t=y.state.scripts.find(n=>n.id===e)||y.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",pages:96},s=[{type:"pacing",title:"Pacing",desc:"See where the story moves too fast or too slowly.",icon:"speed",score:82,telemetry:`${t.pages||96} Pages Telemetry`},{type:"dialogue",title:"Dialogue",desc:"Cadence, subtext density and character voice rhythm.",icon:"chat",score:89,telemetry:"42 Dialogue Exchanges"},{type:"emotion",title:"Emotion",desc:"Emotional heatmaps, catharsis curves and sentiment.",icon:"favorite",score:91,telemetry:"Peak Catharsis: Act II"},{type:"character-arc",title:"Character Arc",desc:"Want vs. need trajectories and transformation tracking.",icon:"alt_route",score:84,telemetry:"4 Major Protagonists"},{type:"continuity",title:"Continuity",desc:"Props, character locations, and temporal logic rules.",icon:"linear_scale",score:78,telemetry:"2 Minor Prop Conflicts"},{type:"story-structure",title:"Story Structure",desc:"Beat breakdowns, midpoint shifts and turning points.",icon:"account_tree",score:87,telemetry:"3-Act Paradigm Standard"},{type:"theme",title:"Theme",desc:"Core philosophical spines, motifs and moral arguments.",icon:"lightbulb",score:90,telemetry:"3 Tracked Motifs"},{type:"cinema",title:"Cinema",desc:"Visual storytelling, shot economy and set-piece power.",icon:"videocam",score:85,telemetry:"Cinematic Visual Index"},{type:"scene",title:"Scene Analysis",desc:"Deep dive breakdown of goals, conflict and polarity.",icon:"movie",score:86,telemetry:"Scene 18 Active Scope"},{type:"formatting",title:"Formatting",desc:"Standard industry margins, sluglines and font rules.",icon:"rule",score:94,telemetry:"Standard Guild Rules"},{type:"production",title:"Production",desc:"Locations, shooting cast, props and cost estimators.",icon:"movie_creation",score:80,telemetry:"24 Practical Locations"}];return`
    ${Be("Intelligence","Analyse Individually")}

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

    ${Te("intelligence")}
  `}function wa(e){const t=document.getElementById("analysis-filter-input");t&&(t.oninput=s=>{const n=s.target.value.toLowerCase().trim();document.querySelectorAll("#analysis-tiles-grid .analysis-tile").forEach(a=>{const o=a.getAttribute("data-keyword")||"";a.style.display=o.includes(n)?"flex":"none"})})}const As={pacing:{title:"Pacing Analysis",score:82,icon:"speed",desc:"Scene duration variance, narrative tempo and page-turn velocity.",questions:["Where does the pace drag in Act II?","Find scenes over 4 pages","Show action-to-dialogue ratios"],findings:[{scene:"SCENE 14 · Dockside Perimeter · Pg 36",act:"Act II",title:"Action beats slow down before major confrontation",desc:"Extended exposition between dock guards lowers tension prior to container breach.",targetScene:14},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Peak narrative rhythm",desc:"Fast intercut dialogue creates maximum urgency before floodgate breach.",targetScene:18},{scene:"SCENE 26 · Coastal Highway · Pg 68",act:"Act III",title:"High velocity turning point",desc:"Pursuit cadence maintains optimal beats per page.",targetScene:26}]},dialogue:{title:"Dialogue Analysis",score:89,icon:"chat",desc:"Cadence, subtext density, distinctive character voice profiles.",questions:["Are character voices distinctive?","Find on-the-nose exposition lines","Analyze dialogue subtext in Scene 18"],findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Subtext is understated and powerful",desc:"Kevin avoids speaking about his brother directly, communicating through silence and tea rituals.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Meera O.S. dialogue establishes authority",desc:"Radio chatter avoids fluff and communicates technical stakes concisely.",targetScene:18}]},emotion:{title:"Emotion Analysis",score:91,icon:"favorite",desc:"Catharsis trajectory, emotional resonance curves, character empathy indices.",questions:["Where does emotional vulnerability peak?","Track empathy trajectory for Kevin","Catharsis resolution in Act III"],findings:[{scene:"SCENE 12 · Father’s Workshop · Pg 28",act:"Act I",title:"Emotional anchor established",desc:"Familial debt and generational sacrifice ground Kevin’s reluctance to blow the whistle.",targetScene:12},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Desperation under rising water",desc:"Kevin’s fear of failing Meera is palpable as water rises past junction box.",targetScene:18}]},"character-arc":{title:"Character Arc Analysis",score:84,icon:"alt_route",desc:"Want vs. Need conflict, psychological transformation, fatal flaw resolution.",questions:["Does Kevin overcome his passivity?","Meera character transformation","Antagonist motivation clarity"],findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]},continuity:{title:"Continuity Analysis",score:78,icon:"linear_scale",desc:"Prop tracking, character spatial locations, timeline consistency checks.",questions:["Check prop handover in Scene 18","Is time of day consistent across Act II?","Track the brass seal location"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Hydro-sensor probe referenced before retrieval",desc:"Verify Kevin picked up copper probe in Scene 16 or carries it on belt.",targetScene:18},{scene:"SCENE 22 · Pumping Station · Pg 58",act:"Act II",title:"Flashlight state discrepancy",desc:"Ensure flashlight was retrieved after water surge in Scene 19.",targetScene:22}]},"story-structure":{title:"Story Structure Analysis",score:87,icon:"account_tree",desc:"Inciting incident, plot points, midpoint shift, climax architecture.",questions:["Is midpoint clearly defined?","Evaluate climax timing on page 88","Are 3-act beats aligned?"],findings:[{scene:"SCENE 06 · Customs Registry · Pg 14",act:"Inciting Incident",title:"Off-manifest container discovered",desc:"The inciting anomaly sets Kevin on irreversible investigative path.",targetScene:6},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Midpoint (Pg 48/96)",title:"Stakes escalate from civil to criminal",desc:"Kevin realizes his own brother commands the smuggling cartel.",targetScene:18}]},theme:{title:"Theme Analysis",score:90,icon:"lightbulb",desc:"Primary narrative spine: Complicity vs. Duty and moral accountability.",questions:["What is the central theme?","Where is loyalty tested?","Show recurring thematic motifs"],findings:[{scene:"SCENE 09 · Family Kitchen · Pg 22",act:"Act I",title:"Familial pressure as thematic catalyst",desc:"Kevin hides eviction notice, showing economic desperation fueling institutional silence.",targetScene:9},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Moral test faced directly",desc:"Kevin must decide whether to save his brother or save the port city from flooding.",targetScene:18},{scene:"SCENE 36 · Rooftop Overlook · Pg 94",act:"Act III",title:"Theme delivers its final statement",desc:"Accountability over self-preservation.",targetScene:36}]},cinema:{title:"Cinema & Visual Storytelling",score:85,icon:"videocam",desc:"Visual set-piece density, image systems, lighting and camera intentionality.",questions:["Check visual contrast between acts","Highlight cinematic set-pieces","Analyze color palette cues in action lines"],findings:[{scene:"SCENE 01 · Harbor Drone View · Pg 01",act:"Act I",title:"Strong establishing visual metaphor",desc:"Rusted shipping containers stacked like monoliths beneath smog.",targetScene:1},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"High visual tension",desc:"Red emergency beacons reflected in rising brackish water.",targetScene:18}]},scene:{title:"Scene Analysis",score:86,icon:"movie",desc:"Micro-structure of Scene 18: Objective, obstacle, polarity change.",questions:["What is the scene objective?","Where does tension peak?","How does polarity shift?"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]},formatting:{title:"Formatting & Guild Compliance",score:94,icon:"rule",desc:"Industry standard margin measurements, capitalization, slugline syntax.",questions:["Check standard industry margins","Find non-standard scene sluglines","Verify dialogue capitalization rules"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Perfect Courier Prime 12pt slugline",desc:"Margins, dual dialogue spacing, and transition tags meet Writers Guild standards.",targetScene:18}]},production:{title:"Production Breakdown",score:80,icon:"movie_creation",desc:"Locations, shooting days, practical elements, cast size breakdown.",questions:["How many practical locations?","Show scenes with special props","List one-off speaking roles"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Location: Wet Stage / Customs Interior",desc:"Requires controlled water flooding tank, hydro-sensor prop box, wet comm-link gear.",targetScene:18}]}};function zs(e){if(y.state.screenplay&&y.state.screenplay.id===e)return y.state.screenplay;const t=localStorage.getItem(`scriptora_screenplay_${e}`);if(t)try{const s=JSON.parse(t);if(s&&s.scenes&&s.scenes.length>0)return s}catch{}return e==="chronicles-of-dust"?ns:null}function Vs(e,t){const s=[];return e&&Array.isArray(e.scenes)&&e.scenes.length>0?e.scenes.forEach((n,a)=>{const o=n.number||a+1,l=n.slugline&&n.slugline.trim()||n.blocks?.find(i=>i.type==="scene")?.content?.trim()||`SCENE ${o}`;s.push({id:n.id||`scene-${o}`,number:o,slugline:l,act:n.actId==="act-3"?"Act III":n.actId==="act-2"?"Act II":o>24?"Act III":o>11?"Act II":"Act I"})}):ns.scenes.forEach(a=>{s.push({id:a.id,number:a.number,slugline:a.slugline||`SCENE ${a.number}`,act:a.actId==="act-2"?"Act II":"Act I"})}),s}function Sa(e){const t=[];e&&((e.characters||[]).forEach(n=>{const a=typeof n=="string"?n:n.name||"";a&&t.push(a)}),(e.scenes||[]).forEach(n=>{(n.blocks||[]).forEach(a=>{a.type==="character"&&a.content&&t.push(a.content)})}));let s=Ds(t);if(s.length===0&&(e&&(e.id==="chronicles-of-dust"||e.title?.includes("Dust"))?s=["SANTHOSH","ARAVIND","KEVIN","MEERA"]:s=["SANTHOSH","ARAVIND"]),e&&(e.characters=s,e.id))try{localStorage.setItem(`scriptora_screenplay_${e.id}`,JSON.stringify(e))}catch{}return s.map(n=>{const a=n.toUpperCase();let o="Character";return a==="SANTHOSH"||a==="ARAVIND"||a==="KEVIN"?o="Protagonist":a==="MEERA"&&(o="Confidante"),{name:n,role:o}})}function Ws(e,t=[]){const s=t.find(i=>Number(i.number)===Number(e))||{number:e,slugline:`SCENE ${e}`,act:e>24?"Act III":e>11?"Act II":"Act I"},n=s.slugline.replace(/^SCENE\s*\d+\s*·\s*/i,"").trim(),a=s.act||(e>24?"Act III":e>11?"Act II":"Act I"),o=Math.max(1,(s.number-1)*3+1),l=Math.min(4.5,Math.max(1.5,s.number*7%3+2)).toFixed(1);return Number(e)===18?{number:18,heading:"SCENE 18 · INT. CUSTOMS OFFICE - NIGHT",act:"Act II Midpoint",page:48,estMin:"3.5",meta:"Act II Midpoint · Pg 48 · ~3.5 min est.",purpose:"Kevin attempts to reroute the electrical relay before the surge floods the basement archives.",conflict:"Rising water breaches the junction box while automated emergency flood doors trigger lockouts, trapping him inside.",whatChanges:"Kevin cuts the emergency seal and refuses to sign the false manifest, irreversibly shifting from passive worker to active resistance.",synthesis:"Polarity shifts from cautious optimism (+1) to catastrophic physical trap and moral awakening (-2), marking the central pivot of the screenplay.",findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]}:Number(e)===1?{number:1,heading:`SCENE 01 · ${n||"INT. HOME - EVENING"}`,act:"Act I Opening",page:1,estMin:"2.0",meta:"Act I Opening · Pg 01 · ~2.0 min est.",purpose:"Establish opening character presence, environment, and initial psychological stakes.",conflict:"Tension and unspoken questions between characters as unfamiliar presence breaks routine.",whatChanges:"Ordinary state broken by unfamiliar arrival, creating the narrative catalyst for the journey.",synthesis:"Polarity shifts from neutral calm (0) to heightened curiosity and alertness (-1), establishing the dramatic question.",findings:[{scene:`SCENE 01 · ${n||"Opening"} · Pg 01`,act:"Act I Opening",title:"Establish protagonist baseline and primary premise",desc:"Opening visual dynamic introduces character motives before inciting conflict.",targetScene:1}]}:Number(e)===4?{number:4,heading:`SCENE 04 · ${n||"INT. PORT AUDIT ROOM - DAY"}`,act:"Act I",page:9,estMin:"2.5",meta:"Act I · Pg 09 · ~2.5 min est.",purpose:"Kevin audits cargo registry under pressure from superiors to overlook anomalies.",conflict:"Institutional compliance vs early ethical hesitation as signatures are demanded.",whatChanges:"Kevin stamps the manifest with reluctance, confirming his fatal flaw of institutional compliance.",synthesis:"Polarity shifts from hesitation (0) to moral compromise (-1), establishing the internal flaw to overcome.",findings:[{scene:"SCENE 04 · Port Audit · Pg 09",act:"Act I",title:"Fatal Flaw Demonstrated: Silent Compliance",desc:"Compliant stamp creates complicity guilt that fuels later revolt.",targetScene:4}]}:{number:e,heading:`SCENE ${String(e).padStart(2,"0")} · ${n||`INT. LOCATION ${e} - DAY`}`,act:a,page:o,estMin:l,meta:`${a} · Pg ${o} · ~${l} min est.`,purpose:`Execute narrative beat for ${n||`Scene ${e}`} and advance sequence trajectory.`,conflict:"Characters encounter rising resistance while navigating immediate beat obstacles.",whatChanges:"Beats shift character leverage, altering interpersonal dynamic and scene outcome.",synthesis:"Polarity turns decisively across the beat, transitioning the dramatic tension into the next sequence.",findings:[{scene:`SCENE ${String(e).padStart(2,"0")} · Pg ${o}`,act:a,title:`Scene ${e} Beat Dynamics`,desc:`Dramatic polarity progression in ${n||`Scene ${e}`} sustains narrative tempo.`,targetScene:e}]}}function Gs(e,t){const s=yt(e||"SANTHOSH"),n=s.toUpperCase();let a=0;if(t&&Array.isArray(t.scenes)&&t.scenes.forEach(i=>{i.blocks&&i.blocks.some(c=>c.type==="character"&&yt(c.content)===n)&&a++}),n==="SANTHOSH")return{name:"SANTHOSH",role:"Protagonist",scenesCount:a>0?`${a} scenes tracked`:"36 scenes tracked",step1Title:"Silent Conviction & Initial Resistance",step1Tag:"Fatal Flaw",step1Range:"Beginning Beats",step1Desc:"Santhosh begins navigating intense internal conviction, wrestling with external constraints and uncovering initial stakes.",step2Title:"The Turning Point & Strategic Pivot",step2Tag:"Turning Point",step2Range:"Middle Beats (Midpoint)",step2Desc:"Santhosh breaks away from passive compromises, taking active control of the narrative direction under peak conflict.",step3Title:"Decisive Transformation & Resolution",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Santhosh embraces complete accountability and purpose, achieving an irreversible transformation through the climax.",synthesis:"Santhosh drives the core thematic arc of the story, transforming from cautious survival into an active, principled catalyst of change.",findings:[{scene:"SCENE 01 · Narrative Baseline · Pg 01",act:"Act I",title:"Fatal Flaw: Internal Hesitation",desc:"Santhosh operates with guarded vigilance before escalating pressures force decisive action.",targetScene:1},{scene:"SCENE 02 · The Turning Point · Pg 05",act:"Act II",title:"The Point of No Return",desc:"Santhosh takes a defining stance that permanently pivots interpersonal relationships and story stakes.",targetScene:2}]};if(n==="ARAVIND")return{name:"ARAVIND",role:"Protagonist",scenesCount:a>0?`${a} scenes tracked`:"32 scenes tracked",step1Title:"Guarded Precision & Calculated Loyalty",step1Tag:"Origin Stance",step1Range:"Beginning Beats",step1Desc:"Aravind maintains tactical focus and sharp perception, questioning surrounding motives and testing early alliances.",step2Title:"High-Stakes Partnership & Crucial Stand",step2Tag:"Midpoint Shift",step2Range:"Middle Beats (Midpoint)",step2Desc:"Aravind unites forces during the turning point, applying razor-sharp resolve to counter mounting narrative obstacles.",step3Title:"Decisive Breakthrough & Ultimate Climax",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Aravind executes the final breakthrough, sealing the resolution through steadfast commitment to the mission.",synthesis:"Aravind provides essential tactical momentum and intellectual force, elevating the stakes and cementing the dramatic payoff.",findings:[{scene:"SCENE 01 · Tactical Introduction · Pg 01",act:"Act I",title:"Strategic Presence & Foresight",desc:"Aravind introduces critical context and tactical perspective into the unfolding scenario.",targetScene:1},{scene:"SCENE 02 · Midpoint Crucible · Pg 06",act:"Act II",title:"Decisive Strategic Realignment",desc:"Aravind commits to the high-stakes confrontation that defines the story trajectory.",targetScene:2}]};if(n==="KEVIN")return{name:"Kevin",role:"Protagonist",scenesCount:a>0?`${a} scenes tracked`:"48 scenes tracked",step1Title:"Silent Compliance & Institutional Fear",step1Tag:"Fatal Flaw",step1Range:"Beginning · Scene 01–11",step1Desc:"Hesitant and guarded, Kevin stamps irregular manifests to keep peace with superiors and protect familial debt.",step2Title:"The Point of No Return",step2Tag:"Turning Point",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Cuts the emergency floodgate seal, actively defying union directives to prevent port catastrophe.",step3Title:"Selfless Moral Accountability",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Hands over the ledger to the public audit without demanding personal immunity, completing moral transformation.",synthesis:"The protagonist completes a verified 3-stage transformation: overcoming passivity at the midpoint and prioritizing moral duty over self-preservation in the climax.",findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]};if(n==="MEERA")return{name:"Meera",role:"Confidante",scenesCount:a>0?`${a} scenes tracked`:"22 scenes tracked",step1Title:"Vigilant Skepticism & Tactical Isolation",step1Tag:"Origin Stance",step1Range:"Beginning · Scene 01–12",step1Desc:"Operates independently along pipeline perimeters, skeptical of municipal regulators and trusting only raw field telemetry.",step2Title:"Calculated Alliance Under Pressure",step2Tag:"Partnership Beat",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Guides Kevin via comm-link to the breaker box, choosing to rely on his technical precision despite active security alarms.",step3Title:"Vindicated Shared Resistance",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Secures and broadcasts the telemetry leak to the public frequency, cementing alliance and exposing corporate monopoly.",synthesis:"The confidante evolves from protective cynicism to trusted partnership, providing the strategic resolve that enables the protagonist to act.",findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Tactical Caution & Guarded Insight",desc:"Meera warns Kevin of private security patrols monitoring pipeline telemetry.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Emergency Comm Guidance",desc:"Meera coordinates the junction box bypass before automated floodgates lock.",targetScene:18}]};const o=n==="KEVIN"||n==="SANTHOSH"||n==="ARAVIND"?"Protagonist":"Character",l=a>0?`${a} scenes tracked`:"Screenplay Character";return{name:s,role:o,scenesCount:l,step1Title:"Initial Presence & Motive Baseline",step1Tag:"Introduction",step1Range:"Beginning Beats",step1Desc:`${s} is introduced navigating personal priorities and reacting to the changing environment.`,step2Title:"Escalating Involvement in Narrative Stakes",step2Tag:"Midpoint Pressure",step2Range:"Middle Beats",step2Desc:`${s} faces direct conflict or shifting loyalties as pressure mounts across the sequence.`,step3Title:"Climactic Position & Resolution",step3Tag:"Resolution",step3Range:"Ending Beats",step3Desc:`${s} resolves their dramatic throughline, solidifying their standing in the story outcome.`,synthesis:`${s} contributes essential narrative pressure and perspective across their screenplay appearances.`,findings:[{scene:"SCENE 01 · Screenplay Beat · Pg 01",act:"Act I",title:`${s} Character Introduction`,desc:`Dialogue and action beats introduce ${s}'s voice and perspective.`,targetScene:1}]}}function Ea(e,t,s={}){const n=t.pages||96,{availableScenes:a=[],currentSceneData:o={},availableChars:l=[],currentCharData:i={}}=s;switch(e){case"pacing":return`
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
                    ${a.map(c=>`
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
      `;default:return""}}function Ia(e="pacing",t=null,s=null){const n={...As[e]||As.pacing},a=sessionStorage.getItem("scriptora_prod_return");let o;try{const T=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;o=new URLSearchParams(T||"")}catch{o=new URLSearchParams}const l=t==="editor"||o.get("from")==="editor"||!!a,i=s||o.get("scriptId")||(a?a.replace("/editor/",""):null)||y.state.selectedScriptId||"chronicles-of-dust",c=`/editor/${i}`,u=i,p=y.state.scripts.find(T=>T.id===u)||y.state.activeScript||{title:"Chronicles of Dust",draft:"Draft 4.2",pages:96},x=zs(u),r=Vs(x),d=Sa(x),b=Number(y.state.currentSceneId||(r.find(T=>T.number===18)?18:r[0]?.number||1)),f=d[0]?.name||"Kevin",v=Ws(b,r),g=Gs(f,x);e==="scene"?(n.desc=`Micro-structure of Scene ${v.number}: Objective, obstacle, polarity change.`,n.findings=v.findings||n.findings):e==="character-arc"&&(n.findings=g.findings||n.findings);const $={availableScenes:r,currentSceneData:v,availableChars:d,currentCharData:g},M=t||o.get("from");let I="/intelligence/analysis",k="Back to Vectors";return l?(I=c,k="Back to Editor"):M==="dashboard"||M==="/intelligence/dashboard"||M?.includes("/intelligence/dashboard")?(I="/intelligence/dashboard",k="Back to Dashboard"):M&&M.startsWith("/")&&(I=M,k="Back"),`
    ${Be(l?"Editor":"Intelligence",n.title)}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- 1. SUB-HEADER NAVIGATION ROW -->
        <div class="flex items-center justify-between">
          <a href="${I}" id="analysis-back-btn" class="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors text-xs font-semibold uppercase tracking-wider no-underline">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>${k}</span>
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
              <span class="material-symbols-outlined text-blue-600 text-[22px]">${n.icon}</span>
              <h1 class="font-heading text-xl font-bold text-slate-900 tracking-tight">${n.title}</h1>
            </div>
            <p id="analysis-header-desc" class="text-xs text-slate-500 mt-0.5">${n.desc}</p>
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
            ${n.questions.map(T=>`
              <button type="button" class="query-pill shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors shadow-xs active:scale-95" data-query="${T}">
                ${T}
              </button>
            `).join("")}
          </div>

          <!-- AI Answer Box -->
          <div id="vector-ai-answer" class="hidden bg-white border border-blue-100 rounded-xl p-3 text-xs text-slate-700 shadow-xs leading-relaxed"></div>
        </div>

        <!-- 3. SCORE CARD (SINGLE CANONICAL SCORE PRESENTATION) -->
        <div class="bg-white rounded-2xl py-4 px-6 shadow-xs border border-slate-200/80 flex items-center justify-center">
          <div class="flex items-baseline gap-1.5">
            <span class="font-heading font-extrabold text-3xl sm:text-4xl text-blue-600 tracking-tight">${n.score}</span>
            <span class="text-xs font-semibold text-slate-400">/ 100 Index</span>
          </div>
        </div>

        <!-- 4. MAIN ANALYSIS VISUAL / CONTENT (MANDATORY & RESTORED) -->
        ${Ea(e,p,$)}

        <!-- 5. IMPORTANT FINDINGS (KEY SCENE FINDINGS) -->
        <div class="flex flex-col gap-3" id="analysis-findings-container">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">Key Scene Findings</span>
            <span id="findings-count-tag" class="text-[11px] text-slate-400 font-medium">${n.findings.length} findings tracked</span>
          </div>

          <div id="findings-list" class="flex flex-col gap-3">
            ${n.findings.map(T=>`
              <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${T.scene}</span>
                  <span class="text-[11px] font-medium text-slate-400">${T.act}</span>
                </div>
                <div class="flex flex-col">
                  <h3 class="text-xs sm:text-sm font-bold text-slate-900">${T.title}</h3>
                  <p class="text-xs text-slate-600 mt-1 leading-relaxed">${T.desc}</p>
                </div>
                <div class="pt-2 flex justify-end border-t border-slate-100">
                  <!-- 6. OPEN IN EDITOR BUTTON -->
                  <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${T.targetScene}">
                    <span class="material-symbols-outlined text-[15px]">edit_note</span>
                    <span>Open in Editor (Scene ${T.targetScene})</span>
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    </main>

    ${Te("intelligence")}
  `}function ka(e,t,s=null,n=null){const a=sessionStorage.getItem("scriptora_prod_return");let o;try{const k=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;o=new URLSearchParams(k||"")}catch{o=new URLSearchParams}const l=s==="editor"||o.get("from")==="editor"||!!a,i=n||o.get("scriptId")||(a?a.replace("/editor/",""):null)||y.state.selectedScriptId||"chronicles-of-dust",c=`/editor/${i}`,u=i,p=zs(u),x=Vs(p),r=document.getElementById("analysis-back-btn");r&&(r.onclick=k=>{if(k.preventDefault(),l)sessionStorage.removeItem("scriptora_prod_return"),t(c);else{const T=s||o.get("from");T==="dashboard"||T==="/intelligence/dashboard"||T?.includes("/intelligence/dashboard")?t("/intelligence/dashboard"):T&&T.startsWith("/")?t(T):t("/intelligence/analysis")}});function d(){document.querySelectorAll(".btn-open-editor-scene").forEach(k=>{k.onclick=()=>{const T=k.getAttribute("data-scene");y.setState({currentSceneId:Number(T)}),w(`Jumping to Scene ${T} in Editor`),t(`/editor/${u}?scene=${T}`)}})}d();function b(k){const T=document.getElementById("findings-list"),E=document.getElementById("findings-count-tag");E&&(E.textContent=`${k.length} findings tracked`),T&&(T.innerHTML=k.map(F=>`
      <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${F.scene}</span>
          <span class="text-[11px] font-medium text-slate-400">${F.act}</span>
        </div>
        <div class="flex flex-col">
          <h3 class="text-xs sm:text-sm font-bold text-slate-900">${F.title}</h3>
          <p class="text-xs text-slate-600 mt-1 leading-relaxed">${F.desc}</p>
        </div>
        <div class="pt-2 flex justify-end border-t border-slate-100">
          <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${F.targetScene}">
            <span class="material-symbols-outlined text-[15px]">edit_note</span>
            <span>Open in Editor (Scene ${F.targetScene})</span>
          </button>
        </div>
      </div>
    `).join(""),d())}const f=document.getElementById("analysis-scene-selector");f&&(f.onchange=k=>{const T=parseInt(k.target.value,10);y.setState({currentSceneId:T});const E=Ws(T,x),F=document.getElementById("target-scene-meta"),O=document.getElementById("target-scene-heading"),ne=document.getElementById("target-scene-purpose"),m=document.getElementById("target-scene-conflict"),A=document.getElementById("target-scene-what-changes"),h=document.getElementById("target-scene-synthesis"),B=document.getElementById("analysis-header-desc");F&&(F.textContent=E.meta),O&&(O.textContent=E.heading),ne&&(ne.textContent=E.purpose),m&&(m.textContent=E.conflict),A&&(A.textContent=E.whatChanges),h&&(h.textContent=E.synthesis),B&&(B.textContent=`Micro-structure of Scene ${T}: Objective, obstacle, polarity change.`),b(E.findings),w(`Analyzing Scene ${T}`)});const v=document.getElementById("analysis-char-selector");v&&(v.onchange=k=>{const T=k.target.value,E=Gs(T,p),F=document.getElementById("char-role-badge"),O=document.getElementById("char-scenes-count"),ne=document.getElementById("char-step1-range"),m=document.getElementById("char-step1-tag"),A=document.getElementById("char-step1-title"),h=document.getElementById("char-step1-desc"),B=document.getElementById("char-step2-range"),K=document.getElementById("char-step2-tag"),R=document.getElementById("char-step2-title"),G=document.getElementById("char-step2-desc"),te=document.getElementById("char-step3-range"),H=document.getElementById("char-step3-tag"),ae=document.getElementById("char-step3-title"),oe=document.getElementById("char-step3-desc"),S=document.getElementById("char-synthesis-desc");F&&(F.textContent=E.role),O&&(O.textContent=E.scenesCount),ne&&(ne.textContent=E.step1Range),m&&(m.textContent=E.step1Tag),A&&(A.textContent=E.step1Title),h&&(h.textContent=E.step1Desc),B&&(B.textContent=E.step2Range),K&&(K.textContent=E.step2Tag),R&&(R.textContent=E.step2Title),G&&(G.textContent=E.step2Desc),te&&(te.textContent=E.step3Range),H&&(H.textContent=E.step3Tag),ae&&(ae.textContent=E.step3Title),oe&&(oe.textContent=E.step3Desc),S&&(S.textContent=E.synthesis),b(E.findings),w(`Switched active character focus to ${E.name}`)}),document.querySelectorAll("[data-jump-scene]").forEach(k=>{k.onclick=()=>{const T=k.getAttribute("data-jump-scene");y.setState({currentSceneId:Number(T)}),w(`Jumping to Scene ${T} in Editor`),t(`/editor/${u}?scene=${T}`)}});const g=document.getElementById("vector-ai-input"),$=document.getElementById("vector-ai-submit"),M=document.getElementById("vector-ai-answer");async function I(k){if(!k||!M)return;M.classList.remove("hidden"),M.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing narrative beats...</span>';const T=await as(k,u);M.textContent=T}$&&g&&($.onclick=()=>I(g.value.trim()),g.onkeydown=k=>{k.key==="Enter"&&I(g.value.trim())}),document.querySelectorAll(".query-pill").forEach(k=>{k.onclick=()=>{const T=k.getAttribute("data-query");g&&(g.value=T),I(T)}})}function Ca(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),a=t||s.get("scriptId")||y.state.editorReturnScriptId||y.state.selectedScriptId||"chronicles-of-dust",o=n==="editor",l=o?sessionStorage.getItem("scriptora_editor_return")||`/editor/${a}`:"/workspace",i=y.state.scripts?.find(d=>d.id===a)||y.state.scripts?.[0]||{},c=y.state.currentUser||(()=>{try{const d=localStorage.getItem("scriptora_user");if(d)return JSON.parse(d)}catch{}return{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}}})(),u=y.state.settings||(()=>{try{const d=localStorage.getItem("scriptora_settings");if(d)return JSON.parse(d)}catch{}return{editor:{showSceneNumbers:!0,autoCapitalize:!0,autoTransition:!0,continueDialogue:!0,fontSize:"Courier Prime 12pt",autoSave:"Instant"},language:"English (US)",transliteration:!1,appearance:"Light",accentColor:"blue",fontScale:"Normal",notifications:{invites:!0,edits:!0,insights:!0,milestones:!0},intelligence:{deepAnalysis:!0,pacingAlerts:!0,dialogueScoring:!0,sensitivity:"Balanced"},privacy:{watermark:!0,encryption:!0}}})(),p=y.state.scripts?.length||c.stats?.drafts||14,x=3,r=c.stats?.healthIndex||"98%";return`
    ${Be("Profile","Account & preferences.")}

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
              <span class="text-base font-bold text-slate-900 group-hover:text-blue-600 leading-tight font-heading">${x}</span>
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
            <a href="/profile/collaborators${o?`?from=editor&scriptId=${a}`:""}" class="w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group no-underline text-inherit cursor-pointer">
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
      <div id="action-modal" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-xs hidden p-3 sm:p-4">
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
      <div id="modal-edit-profile" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-xs hidden p-3 sm:p-4">
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
      <div id="modal-security" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-xs hidden p-3 sm:p-4">
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
      <div id="modal-setting-editor" class="settings-modal fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-xs hidden p-3 sm:p-4">
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
      <div id="modal-setting-language" class="settings-modal fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-xs hidden p-3 sm:p-4">
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
      <div id="modal-setting-appearance" class="settings-modal fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-xs hidden p-3 sm:p-4">
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
      <div id="modal-setting-notifications" class="settings-modal fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-xs hidden p-3 sm:p-4">
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
      <div id="modal-setting-intelligence" class="settings-modal fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-xs hidden p-3 sm:p-4">
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
      <div id="modal-setting-privacy" class="settings-modal fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-xs hidden p-3 sm:p-4">
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
      <div id="modal-setting-storage" class="settings-modal fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-xs hidden p-3 sm:p-4">
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

    ${Te("profile")}
  `}function Aa(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),a=t||n.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=s||n.get("scriptId")||y.state.editorReturnScriptId||y.state.selectedScriptId||"chronicles-of-dust",l=a==="editor",i=l?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/workspace",c=document.getElementById("profile-back-to-editor-btn");c&&(c.onclick=N=>{N.preventDefault(),sessionStorage.removeItem("scriptora_from_editor"),e(i)});const u=document.getElementById("profile-bottom-return-btn");u&&(u.onclick=N=>{N.preventDefault(),sessionStorage.removeItem("scriptora_from_editor"),e(i)}),document.getElementById("stat-card-drafts")?.addEventListener("click",()=>{e("/workspace")}),document.getElementById("stat-card-coauthors")?.addEventListener("click",()=>{e(`/profile/collaborators${l?`?from=editor&scriptId=${o}`:""}`)}),document.getElementById("stat-card-health")?.addEventListener("click",()=>{e("/intelligence/dashboard")});const p=document.getElementById("settings-search-input");p&&(p.oninput=N=>{const L=N.target.value.toLowerCase().trim();let U=0;document.querySelectorAll("#settings-list .setting-item").forEach(ce=>{const D=ce.textContent.toLowerCase().includes(L);ce.style.display=D?"flex":"none",D&&U++});const V=document.getElementById("no-settings-match");V&&(V.style.display=U===0?"block":"none")});function x(N){const L=`modal-setting-${N.replace("sheet-","")}`,U=document.getElementById(L);U&&(U.classList.remove("hidden"),U.classList.add("flex"))}function r(){document.querySelectorAll(".settings-modal").forEach(N=>{N.classList.add("hidden"),N.classList.remove("flex")})}document.querySelectorAll(".setting-item").forEach(N=>{N.onclick=()=>{const L=N.getAttribute("data-sheet");L&&x(L)}}),document.querySelectorAll(".close-setting-modal").forEach(N=>{N.onclick=r}),document.querySelectorAll(".settings-modal, #modal-edit-profile, #modal-security, #action-modal").forEach(N=>{N.onclick=L=>{L.target===N&&(N.classList.add("hidden"),N.classList.remove("flex"))}});function d(N){let L={};try{const V=localStorage.getItem("scriptora_settings");V&&(L=JSON.parse(V))}catch{}const U=N(L);return localStorage.setItem("scriptora_settings",JSON.stringify(U)),y.setState({settings:U}),wn(U).catch(()=>{}),U}const b=document.getElementById("btn-save-cfg-editor");b&&(b.onclick=()=>{const N=document.getElementById("cfg-editor-scenenums")?.checked??!0,L=document.getElementById("cfg-editor-autocap")?.checked??!0,U=document.getElementById("cfg-editor-contd")?.checked??!0,V=document.getElementById("cfg-editor-font")?.value||"Courier Prime 12pt",ce=document.getElementById("cfg-editor-autosave")?.value||"Instant";d(D=>({...D,editor:{...D.editor||{},showSceneNumbers:N,autoCapitalize:L,continueDialogue:U,fontSize:V,autoSave:ce}})),localStorage.setItem("scriptora_autosave",ce==="Instant"?"true":"false");const P=document.getElementById("desc-sheet-editor");P&&(P.textContent=`Numbers: ${N?"On":"Off"} · Auto-save: ${ce}`),r(),w("Editor preferences saved")});let f=y.state.settings?.language||"English (US)";document.querySelectorAll(".btn-lang-choice").forEach(N=>{N.onclick=()=>{f=N.getAttribute("data-lang"),document.querySelectorAll(".btn-lang-choice").forEach(L=>{L.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-slate-200 bg-white text-slate-800 hover:bg-slate-50"}),N.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const v=document.getElementById("btn-save-cfg-language");v&&(v.onclick=()=>{const N=document.getElementById("cfg-lang-translit")?.checked??!1;d(U=>({...U,language:f,transliteration:N}));const L=document.getElementById("desc-sheet-language");L&&(L.textContent=`${f}${N?" · Transliteration On":""}`),r(),w(`Language set to ${f}`)});let g=y.state.settings?.appearance||"Light";document.querySelectorAll(".btn-theme-choice").forEach(N=>{N.onclick=()=>{g=N.getAttribute("data-theme"),document.querySelectorAll(".btn-theme-choice").forEach(L=>{L.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}),N.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const $=document.getElementById("btn-save-cfg-appearance");$&&($.onclick=()=>{const N=document.getElementById("cfg-app-scale")?.value||"Normal";d(U=>({...U,appearance:g,fontScale:N})),g==="Dark"?(document.documentElement.classList.add("dark"),localStorage.setItem("scriptora_theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("scriptora_theme","light"));const L=document.getElementById("desc-sheet-appearance");L&&(L.textContent=`${g} · Scale: ${N}`),r(),w(`Appearance updated: ${g}`)});const M=document.getElementById("btn-save-cfg-notifications");M&&(M.onclick=()=>{const N=document.getElementById("cfg-notif-invites")?.checked??!0,L=document.getElementById("cfg-notif-edits")?.checked??!0,U=document.getElementById("cfg-notif-insights")?.checked??!0,V=document.getElementById("cfg-notif-milestones")?.checked??!0,ce={invites:N,edits:L,insights:U,milestones:V};d(q=>({...q,notifications:ce}));const P=Object.values(ce).filter(Boolean).length,D=document.getElementById("desc-sheet-notifications");D&&(D.textContent=`${P} alerts active`),r(),w("Notification preferences updated")});const I=document.getElementById("btn-save-cfg-intelligence");I&&(I.onclick=()=>{const N=document.getElementById("cfg-intel-deep")?.checked??!0,L=document.getElementById("cfg-intel-pacing")?.checked??!0,U=document.getElementById("cfg-intel-dialogue")?.checked??!0,V=document.getElementById("cfg-intel-sensitivity")?.value||"Balanced";d(P=>({...P,intelligence:{deepAnalysis:N,pacingAlerts:L,dialogueScoring:U,sensitivity:V}}));const ce=document.getElementById("desc-sheet-intelligence");ce&&(ce.textContent=`${N?"Deep Arc Diagnostics":"Standard"} · ${V}`),r(),w("Intelligence engine calibrated")});const k=document.getElementById("btn-save-cfg-privacy");k&&(k.onclick=()=>{const N=document.getElementById("cfg-priv-watermark")?.checked??!0,L=document.getElementById("cfg-priv-encrypt")?.checked??!0;d(V=>({...V,privacy:{watermark:N,encryption:L}}));const U=document.getElementById("desc-sheet-privacy");U&&(U.textContent=`${N?"Watermark On":"Standard"} · Local AES Encrypted`),r(),w("Privacy governance updated")});const T=document.getElementById("btn-export-portfolio-data");T&&(T.onclick=()=>{const N={exportedAt:new Date().toISOString(),user:y.state.currentUser,scripts:y.state.scripts,screenplay:y.state.screenplay,settings:y.state.settings},L=new Blob([JSON.stringify(N,null,2)],{type:"application/json"}),U=URL.createObjectURL(L),V=document.createElement("a");V.href=U,V.download=`scriptora_portfolio_backup_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(V),V.click(),document.body.removeChild(V),URL.revokeObjectURL(U),w("Portfolio archive downloaded successfully")});const E=document.getElementById("btn-force-cloud-sync");E&&(E.onclick=()=>{E.disabled=!0,E.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span><span>Synchronizing...</span>',setTimeout(()=>{E.disabled=!1,E.innerHTML='<span class="material-symbols-outlined text-[16px]">sync</span><span>Force Cloud Re-sync</span>';const N=document.getElementById("sync-status-msg");N&&(N.textContent=`Synchronized at ${new Date().toLocaleTimeString()}`),w("All screenplay drafts synchronized with cloud")},700)});const F=document.getElementById("btn-clear-local-cache");F&&(F.onclick=()=>{sessionStorage.clear(),w("Temporary cache and diagnostic buffers cleared")});const O=document.getElementById("modal-edit-profile"),ne=document.getElementById("trigger-modal-email"),m=document.getElementById("edit-avatar-btn"),A=document.getElementById("avatar-container-btn"),h=document.getElementById("form-update-profile"),B=document.getElementById("local-photo-input"),K=document.getElementById("btn-modal-upload-photo"),R=document.getElementById("btn-modal-remove-photo");function G(N){N?(O?.classList.remove("hidden"),O?.classList.add("flex")):(O?.classList.add("hidden"),O?.classList.remove("flex"))}ne&&(ne.onclick=()=>G(!0)),A&&(A.onclick=()=>G(!0)),m&&(m.onclick=N=>{N.stopPropagation(),B&&B.click()}),K&&(K.onclick=()=>{B&&B.click()}),document.querySelectorAll(".close-profile-modal").forEach(N=>N.onclick=()=>G(!1)),B&&(B.onchange=N=>{const L=N.target.files?.[0];if(!L)return;if(!L.type.startsWith("image/")){w("Please select a valid image file (PNG, JPG, WEBP)");return}const U=new FileReader;U.onload=V=>{const ce=new Image;ce.onload=()=>{const P=document.createElement("canvas"),D=360;let q=ce.width,le=ce.height;q>le?q>D&&(le=Math.round(le*D/q),q=D):le>D&&(q=Math.round(q*D/le),le=D),P.width=q,P.height=le,P.getContext("2d").drawImage(ce,0,0,q,le);const X=P.toDataURL("image/jpeg",.88),pe={...y.state.currentUser||user,avatarUrl:X};y.setState({currentUser:pe}),localStorage.setItem("scriptora_user",JSON.stringify(pe)),Wt({avatarUrl:X}).catch(()=>{});const xe=document.getElementById("user-avatar-circle");xe&&(xe.innerHTML=`<img id="user-avatar-img" src="${X}" class="w-full h-full object-cover" alt="Profile" />`);const fe=document.getElementById("modal-preview-avatar");fe&&(fe.innerHTML=`<img id="modal-preview-img" src="${X}" class="w-full h-full object-cover" alt="Preview" />`),R&&R.classList.remove("hidden");const se=document.getElementById("header-profile-btn");se&&(se.innerHTML=`<img src="${X}" class="w-full h-full object-cover" alt="Profile" />`),w("Profile picture updated successfully!")},ce.src=V.target.result},U.readAsDataURL(L),B.value=""}),R&&(R.onclick=()=>{const L={...y.state.currentUser||user,avatarUrl:null};y.setState({currentUser:L}),localStorage.setItem("scriptora_user",JSON.stringify(L)),Wt({avatarUrl:null}).catch(()=>{});const U=L.initials||"AK",V=document.getElementById("user-avatar-circle");V&&(V.innerHTML=`<span id="user-avatar-initials">${U}</span>`);const ce=document.getElementById("modal-preview-avatar");ce&&(ce.innerHTML=`<span id="modal-preview-initials">${U}</span>`),R.classList.add("hidden");const P=document.getElementById("header-profile-btn");P&&(P.innerHTML=`<span>${U}</span>`),w("Profile photo removed")});let te=user.avatarColor||"bg-blue-600";document.querySelectorAll(".prof-avatar-color-btn").forEach(N=>{N.onclick=()=>{te=N.getAttribute("data-color"),document.querySelectorAll(".prof-avatar-color-btn").forEach(L=>L.classList.remove("ring-2","ring-offset-2","ring-blue-600")),N.classList.add("ring-2","ring-offset-2","ring-blue-600")}}),h&&(h.onsubmit=async N=>{N.preventDefault();const L=document.getElementById("prof-input-name").value.trim(),U=document.getElementById("prof-input-headline").value.trim(),V=document.getElementById("prof-input-email").value.trim(),ce=L.split(/\s+/),P=(ce[0]?.[0]||"A")+(ce[1]?.[0]||""),D={...y.state.currentUser||user,name:L,displayName:L,headline:U,email:V,initials:P.toUpperCase(),avatarColor:te};await Wt(D),y.setState({currentUser:D});const q=document.getElementById("profile-display-name"),le=document.getElementById("profile-display-headline"),de=document.getElementById("profile-display-email"),X=document.getElementById("user-avatar-circle");q&&(q.textContent=L),le&&(le.textContent=U),de&&(de.textContent=V),X&&!D.avatarUrl&&(X.innerHTML=`<span id="user-avatar-initials">${P.toUpperCase()}</span>`,X.className=`w-20 h-20 rounded-full ${te} text-white font-bold text-2xl flex items-center justify-center shadow-md overflow-hidden transition-transform active:scale-95 border-2 border-white ring-2 ring-slate-100`),G(!1),w("Profile and account updated successfully")});const H=document.getElementById("modal-security"),ae=document.getElementById("trigger-modal-password"),oe=document.getElementById("form-update-pw");function S(N){N?(H?.classList.remove("hidden"),H?.classList.add("flex")):(H?.classList.add("hidden"),H?.classList.remove("flex"))}ae&&(ae.onclick=()=>S(!0)),document.querySelectorAll(".close-security-modal").forEach(N=>N.onclick=()=>S(!1)),document.querySelectorAll(".btn-toggle-pw").forEach(N=>{N.onclick=()=>{const L=N.getAttribute("data-target"),U=document.getElementById(L),V=N.querySelector(".material-symbols-outlined");U&&(U.type==="password"?(U.type="text",V&&(V.textContent="visibility_off")):(U.type="password",V&&(V.textContent="visibility")))}}),oe&&(oe.onsubmit=N=>{N.preventDefault(),document.getElementById("pw-input-current")?.value;const L=document.getElementById("pw-input-new")?.value,U=document.getElementById("pw-input-confirm")?.value,V=document.getElementById("pw-error-text");if(!L||L.length<6){V&&(V.textContent="New password must be at least 6 characters long.",V.classList.remove("hidden"));return}if(L!==U){V&&(V.textContent="New password and confirmation do not match.",V.classList.remove("hidden"));return}V&&V.classList.add("hidden"),S(!1),w("Password updated securely"),oe.reset()});const z=document.getElementById("action-modal"),J=document.getElementById("action-modal-title"),j=document.getElementById("action-modal-desc"),Ee=document.getElementById("action-modal-icon"),Q=document.getElementById("action-modal-icon-box"),ie=document.getElementById("action-modal-confirm"),De=document.getElementById("action-modal-cancel");let He="signout";function xt(N){He=N,N==="signout"?(J.textContent="Sign Out",j.textContent="Are you sure you want to end your active session on this device?",Ee.textContent="logout",Q.className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center",ie.className="flex-1 h-10 px-4 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 cursor-pointer",ie.textContent="Sign Out"):(J.textContent="Delete Account",j.textContent="This action will permanently delete your portfolio, scripts, and collaborator access. This cannot be undone.",Ee.textContent="warning",Q.className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center",ie.className="flex-1 h-10 px-4 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer",ie.textContent="Delete Forever"),z?.classList.remove("hidden"),z?.classList.add("flex")}function ze(){z?.classList.add("hidden"),z?.classList.remove("flex")}document.getElementById("btn-trigger-signout")?.addEventListener("click",()=>xt("signout")),document.getElementById("btn-trigger-delete-acc")?.addEventListener("click",()=>xt("delete")),De&&(De.onclick=ze),ie&&(ie.onclick=async()=>{ze(),He==="signout"?(await Xt(),y.setState({currentUser:null}),w("Signed out of Scriptora"),e("/auth")):(await Xt(),y.setState({currentUser:null,scripts:[]}),w("Account deleted"),e("/auth"))})}function Ta(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),a=t||s.get("scriptId")||y.state.editorReturnScriptId||y.state.selectedScriptId||"chronicles-of-dust",o=n==="editor",l=o?sessionStorage.getItem("scriptora_editor_return")||`/editor/${a}`:"/profile",i=o?"Back to Editor":"Back to Profile",c=y.state.scripts.find(u=>u.id===a)||y.state.scripts[0]||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",joinCode:"A7K9-XP42"};return`
    ${Be("Profile","Collaborators")}

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
            ${y.state.scripts.map(u=>`
              <button class="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors switch-script-opt" data-id="${u.id}">
                <div class="flex flex-col">
                  <span class="text-xs font-semibold text-slate-900">${u.title}</span>
                  <span class="text-[10px] text-slate-500">${u.format||"Feature"} · ${u.draft||"Draft 1.0"}</span>
                </div>
                ${u.id===c.id?'<span class="material-symbols-outlined text-blue-600 text-[16px]">check</span>':""}
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

    ${Te("profile")}
  `}function Na(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),a=t||n.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=s||n.get("scriptId")||y.state.editorReturnScriptId||y.state.selectedScriptId||"chronicles-of-dust",l=a==="editor",i=l?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/profile",c=document.getElementById("collab-back-btn");c&&(c.onclick=h=>{h.preventDefault(),l&&sessionStorage.removeItem("scriptora_from_editor"),e(i)});const u=document.getElementById("collab-bottom-return-btn");u&&(u.onclick=h=>{h.preventDefault(),l&&sessionStorage.removeItem("scriptora_from_editor"),e(i)});let p="A7K9-XP42";async function x(){const h=await xn(o),B=document.getElementById("collaborators-list");if(B){if(h.length===0){B.innerHTML='<div class="p-4 text-center text-xs text-slate-400">No external collaborators yet. Share your join code to invite teammates.</div>';return}B.innerHTML=h.map(K=>`
      <div class="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
        <div class="flex items-center gap-3 min-w-0 pr-2">
          <div class="w-9 h-9 rounded-full ${K.avatarBg||"bg-blue-100 text-blue-700"} flex items-center justify-center font-bold text-xs shrink-0">
            ${K.initials}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-slate-900 truncate">${K.name}</span>
            <span class="text-[11px] text-slate-500 truncate">${K.email}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">${K.role}</span>
          <button class="remove-collab-btn text-slate-400 hover:text-red-600 p-1" data-id="${K.id}" title="Remove access">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".remove-collab-btn").forEach(K=>{K.onclick=async()=>{const R=K.getAttribute("data-id");confirm("Remove collaborator access for this user?")&&(await mn(o,R),w("Collaborator access removed"),x())}})}}x();const r=document.getElementById("projectSelectBtn"),d=document.getElementById("projectDropdown");r&&(r.onclick=()=>d?.classList.toggle("hidden")),document.querySelectorAll(".switch-script-opt").forEach(h=>{h.onclick=()=>{const B=h.getAttribute("data-id");y.selectScript(B),d?.classList.add("hidden"),e(`/profile/collaborators${l?`?from=editor&scriptId=${B}`:""}`)}});const b=document.getElementById("openInviteBtn"),f=document.getElementById("closeInviteBtn"),v=document.getElementById("inviteCard"),g=document.getElementById("sendInviteBtn");b&&(b.onclick=()=>v?.classList.remove("hidden")),f&&(f.onclick=()=>v?.classList.add("hidden")),g&&(g.onclick=async()=>{const h=document.getElementById("inviteEmailInput")?.value.trim(),B=document.querySelector('input[name="inviteRole"]:checked')?.value||"editor";h&&(await fn(o,{email:h,role:B}),w(`Invited ${h} as ${B}`),v?.classList.add("hidden"),x())});const $=document.getElementById("tabGenCodeBtn"),M=document.getElementById("tabEnterCodeBtn"),I=document.getElementById("paneGenerateCode"),k=document.getElementById("paneEnterCode");$&&($.onclick=()=>{$.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",M.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",I?.classList.remove("hidden"),k?.classList.add("hidden")}),M&&(M.onclick=()=>{M.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",$.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",k?.classList.remove("hidden"),I?.classList.add("hidden")});const T=document.getElementById("copyJoinCodeBtn"),E=document.getElementById("copyJoinCodeLabel");T&&(T.onclick=()=>{const h=document.getElementById("displayJoinCode")?.textContent||p;navigator.clipboard?.writeText(h),E.textContent="Copied!",setTimeout(()=>{E.textContent="Copy"},1800),w(`Copied code: ${h}`)});const F=document.getElementById("regenJoinCodeBtn");F&&(F.onclick=async()=>{const h=await bn(o);p=h;const B=document.getElementById("displayJoinCode");B&&(B.textContent=h),w(`Generated new join code: ${h}`)});const O=document.getElementById("verifyCodeBtn"),ne=document.getElementById("joinCodeInput"),m=document.getElementById("joinCodeResultCard"),A=document.getElementById("confirmJoinScriptBtn");ne&&(ne.oninput=h=>{let B=h.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"");B.length>4&&(B=B.slice(0,4)+"-"+B.slice(4,8)),h.target.value=B}),O&&ne&&(O.onclick=async()=>{const h=ne.value.trim();if(!h)return;O.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>';const B=await gn(h);O.innerHTML="<span>Verify</span>",B.valid?(m?.classList.remove("hidden"),document.getElementById("verifiedScriptTitle").textContent=B.script.title,document.getElementById("verifiedScriptFormat").textContent=`${B.script.format} · ${B.script.pages} pages`,w("Valid join code")):(m?.classList.add("hidden"),w("Invalid or expired join code","error"))}),A&&ne&&(A.onclick=async()=>{const h=ne.value.trim();await hn(h),w("Successfully joined screenplay workspace!"),e("/workspace")})}function $a(){return y.state.currentUser?.initials,`
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
  `}function Pa(e){const t=document.getElementById("btn-back-notif");t&&(t.onclick=()=>{const x=y.getPreviousRoute("/workspace");e(x)});let s="all",n="normal",a=[];async function o(){const x=document.getElementById("notif-feed-container");if(!x)return;if(n==="loading"){x.innerHTML=`
        <div class="space-y-3 animate-pulse">
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
        </div>
      `;return}if(n==="error"){x.innerHTML=`
        <div class="p-6 bg-white border border-red-200 rounded-2xl flex flex-col items-center text-center gap-2">
          <span class="material-symbols-outlined text-3xl text-red-500">wifi_off</span>
          <h3 class="font-bold text-sm text-slate-900">Sync Connection Lost</h3>
          <p class="text-xs text-slate-500 max-w-xs">Unable to refresh notification stream. Please check network connection.</p>
          <button id="btn-retry-sync" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-xs hover:bg-blue-700">
            Retry Connection
          </button>
        </div>
      `,document.getElementById("btn-retry-sync")?.addEventListener("click",()=>{n="normal",o()});return}if(a=(await Ps()).notifications||[],n==="empty"||s==="unread"&&a.filter($=>$.unread).length===0){x.innerHTML=`
        <div class="p-8 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center text-center gap-2">
          <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <h3 class="font-bold text-sm text-slate-900">You’re all caught up!</h3>
          <p class="text-xs text-slate-500 max-w-xs">No pending notifications or requests requiring your review.</p>
        </div>
      `;return}const d=a.filter($=>$.unread).length;document.getElementById("badge-all-count").textContent=a.length,document.getElementById("badge-unread-count").textContent=d,y.setState({unreadNotifications:d});let b=a;s==="unread"&&(b=b.filter($=>$.unread));const f=b.filter($=>$.group==="today"),v=b.filter($=>$.group!=="today");function g($,M){return M.length===0?"":`
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-xs font-bold text-slate-400 tracking-wider uppercase font-heading">${$}</h2>
          </div>
          <div class="flex flex-col gap-2">
            ${M.map(I=>`
              <div class="notif-row relative flex items-start gap-3 p-3.5 rounded-xl bg-white border ${I.unread?"border-l-4 border-l-blue-600 border-slate-200/80 shadow-xs":"border-slate-200/60 opacity-80"} hover:shadow-sm transition-all cursor-pointer" data-id="${I.id}" data-route="${I.actionRoute}">
                <div class="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                  ${I.sender.startsWith("icon:")?`<span class="material-symbols-outlined text-[18px] text-blue-600">${I.sender.replace("icon:","")}</span>`:I.sender}
                </div>
                <div class="flex flex-col flex-1 min-w-0">
                  <div class="flex items-baseline justify-between gap-2">
                    <h3 class="text-xs font-bold text-slate-900 truncate">${I.title}</h3>
                    <span class="text-[10px] text-slate-400 shrink-0">${I.time}</span>
                  </div>
                  <p class="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">${I.body}</p>
                  <div class="mt-2 flex items-center gap-1.5 flex-wrap">
                    ${(I.tags||[]).map(k=>`<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">${k}</span>`).join("")}
                    <span class="text-blue-600 text-[11px] font-semibold ml-auto">${I.actionLabel||"View →"}</span>
                  </div>
                </div>
                ${I.unread?'<div class="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1"></div>':""}
              </div>
            `).join("")}
          </div>
        </div>
      `}x.innerHTML=g("Today",f)+g("Earlier",v),document.querySelectorAll(".notif-row").forEach($=>{$.onclick=async()=>{const M=parseInt($.getAttribute("data-id")),I=$.getAttribute("data-route");await vn(M),await y.refreshNotifications(),I?e(I):o()}})}o();const l=document.getElementById("filter-all-btn"),i=document.getElementById("filter-unread-btn");l&&(l.onclick=()=>{s="all",l.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",i.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",o()}),i&&(i.onclick=()=>{s="unread",i.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",l.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",o()});const c=document.getElementById("btn-mark-all-read");c&&(c.onclick=async()=>{await yn(),await y.refreshNotifications(),w("All notifications marked as read"),o()});const u=document.getElementById("btn-toggle-sim"),p=document.getElementById("sim-menu-dropdown");u&&(u.onclick=()=>p?.classList.toggle("hidden")),document.querySelectorAll(".sim-opt").forEach(x=>{x.onclick=()=>{n=x.getAttribute("data-state"),p?.classList.add("hidden"),o(),w(`Simulating ${n} state`)}})}function Ba(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from"),a=t||s.get("scriptId")||y.state.selectedScriptId||"chronicles-of-dust",o=n==="editor"||n&&n.startsWith("/editor"),l=o?sessionStorage.getItem("scriptora_prod_return")||(n&&n.startsWith("/editor")?n:`/editor/${a}`):n&&n.startsWith("/")?n:"/workspace",i=o?"Editor":n?.includes("/intelligence")?"Intelligence":"Workspace",c=y.state.scripts?.find(u=>u.id===a)||y.state.scripts?.[0]||{id:"chronicles-of-dust",draft:"Draft 4.2"};return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      <!-- Standard App Header -->
      ${Be("Pre-Production","Production Tools")}

      <!-- Main Workspace Container -->
      <main class="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3.5 fade-in">
        
        <!-- Unified Header Row (Back + Title) -->
        <div class="flex items-center justify-between gap-2 py-1.5 border-b border-slate-200/70">
          <div class="flex items-center gap-2 min-w-0">
            <a href="${l}" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors text-xs font-semibold shrink-0" id="prod-back-nav" title="Back to ${i}">
              <span class="material-symbols-outlined text-[17px]">arrow_back</span>
              <span class="truncate">${i}</span>
            </a>
            <h1 class="font-heading font-semibold text-sm text-slate-900 truncate">Production Tools</h1>
          </div>
        </div>

        <!-- Screenplay & Source Version Selector Card -->
        <section class="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80">
              <span class="material-symbols-outlined text-[20px]">movie_creation</span>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <select id="prod-script-select" class="font-heading font-semibold text-sm text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none cursor-pointer pr-1 truncate">
                  <option value="chronicles-of-dust" ${c.id==="chronicles-of-dust"?"selected":""}>Chronicles of Dust (Feature)</option>
                  <option value="the-neon-horizon" ${c.id==="the-neon-horizon"?"selected":""}>The Neon Horizon (Pilot)</option>
                </select>
              </div>
              <div class="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-500">
                <span class="flex items-center gap-1 text-slate-700 font-medium" id="prod-pinned-version-badge">
                  <span class="material-symbols-outlined text-[13px] text-slate-400">lock</span>
                  <span id="pinned-version-label">${c.draft||"Draft 4.2"} (Pinned)</span>
                </span>
                <span>•</span>
                <span>10 Scenes</span>
                <span>•</span>
                <span>78 Elements</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Source Version Staleness Warning Banner -->
        <div id="source-version-alert" class="hidden bg-amber-50/70 border border-amber-200/90 rounded-2xl p-3 flex items-start justify-between gap-3 shadow-xs">
          <div class="flex items-start gap-2">
            <span class="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">warning</span>
            <div class="text-xs text-amber-900 leading-relaxed">
              <span class="font-semibold">Source Version Out of Sync:</span> Screenplay draft updated. Production records remain pinned to <span class="font-semibold underline" id="alert-pinned-ver">Draft 4.2</span>.
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button id="btn-repin-source" class="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-[11px] transition-colors">
              Update Pin
            </button>
            <button id="btn-dismiss-staleness" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-medium hover:bg-slate-50">
              Keep Pin
            </button>
          </div>
        </div>

        <!-- Production Tools Grid -->
        <section class="flex flex-col gap-2.5">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            
            <!-- Tool 1: Script Breakdown -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="script-breakdown">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[18px]">dataset</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">78 Items</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Script Breakdown</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Tag and organise production requirements by scene.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Open Breakdown</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 3: Shooting Schedule -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="shooting-schedule">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[18px]">calendar_view_week</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">7 Days</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Shooting Schedule</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Plan shooting days, calendar matrix, and scene production details.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Open Schedule</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 4: Call Sheets -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="call-sheets">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[18px]">assignment</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">2 Active</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Call Sheets</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Prepare and manage daily shooting call sheets.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Call Sheets</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 5: Dialogue Sheets & Actor Sides -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="dialogue-sheets">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[18px]">record_voice_over</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">Ready</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Dialogue Sheets & Sides</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Character-wise speech cues and scene actor sides.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Actor Sides</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 6: Storyboard Studio -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="storyboard-studio">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[18px]">art_track</span>
                  </div>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Storyboard Studio</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Visual shot composition and camera setups.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Shot Board</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      <!-- Bottom Navigation with Production Active -->
      ${Te("production")}
    </div>
  `}async function Da(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),a=s||n.get("scriptId")||y.state.selectedScriptId||"chronicles-of-dust",o=document.getElementById("prod-script-select");o&&(o.onchange=p=>{const x=p.target.value;y.setState({selectedScriptId:x}),e(`/production?scriptId=${x}`)});const l=document.getElementById("btn-repin-source");l&&(l.onclick=async()=>{const p="Draft 4.3";await In(a,p),document.getElementById("source-version-alert")?.classList.add("hidden");const x=document.getElementById("pinned-version-label");x&&(x.textContent=`${p} (Pinned)`),w(`Pinned source updated to ${p}`)});const i=document.getElementById("btn-dismiss-staleness");i&&(i.onclick=()=>{document.getElementById("source-version-alert")?.classList.add("hidden"),w("Retained Draft 4.2 pinned baseline")});const c=`/production?scriptId=${a}`,u={"script-breakdown":`/production/breakdown?scriptId=${a}&from=${encodeURIComponent(c)}`,"shooting-schedule":`/production/schedule?scriptId=${a}&from=${encodeURIComponent(c)}`,"call-sheets":`/production/call-sheets?scriptId=${a}&from=${encodeURIComponent(c)}`,"dialogue-sheets":`/production/dialogue-sides?scriptId=${a}&from=${encodeURIComponent(c)}`,"storyboard-studio":`/production/storyboard?scriptId=${a}&from=${encodeURIComponent(c)}`};document.querySelectorAll(".tool-card").forEach(p=>{p.onclick=()=>{const x=p.getAttribute("data-tool");u[x]&&e(u[x])}})}function Ra(){const e=y.state.selectedScriptId||"chronicles-of-dust",t=y.state.scripts?.find(s=>s.id===e)||{title:"Chronicles of Dust",draft:"Draft 4.2"};return`
    <div class="fixed inset-0 bg-surface flex flex-col font-body text-slate-800 select-none overflow-hidden">
      <!-- Standard Header (Fixed Top) -->
      ${Be("AI Chat","Universal Assistant")}

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
      ${Te("chat")}
    </div>
  `}function Ma(e){const t=document.getElementById("chat-input"),s=document.getElementById("chat-send-btn"),n=document.getElementById("chat-messages-container"),a=document.getElementById("btn-clear-chat"),o=document.querySelectorAll(".chat-chip"),l=y.state.selectedScriptId||"chronicles-of-dust",i=localStorage.getItem("scriptora_chat_history");if(i)try{JSON.parse(i).forEach(x=>c(x.role,x.text,!1))}catch{}t&&t.addEventListener("input",()=>{t.style.height="auto",t.style.height=Math.min(t.scrollHeight,96)+"px"});function c(p,x,r=!0){if(!n)return;const d=p==="user",b=document.createElement("div");if(b.className=`flex items-start gap-2.5 max-w-[88%] ${d?"self-end flex-row-reverse":""}`,b.innerHTML=`
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
    `,n.appendChild(b),n.scrollTop=n.scrollHeight,r)try{const f=JSON.parse(localStorage.getItem("scriptora_chat_history")||"[]");f.push({role:p,text:x,timestamp:new Date().toISOString()}),localStorage.setItem("scriptora_chat_history",JSON.stringify(f.slice(-30)))}catch{}}async function u(){if(!t)return;const p=t.value.trim();if(!p)return;c("user",p,!0),t.value="",t.style.height="auto";const x=document.createElement("div");x.className="flex items-center gap-2 text-xs text-slate-400 py-1 pl-9 italic",x.innerHTML=`
      <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
      <span>Reviewing screenplay context & production model...</span>
    `,n.appendChild(x),n.scrollTop=n.scrollHeight;try{const r=await as(p,l);x.remove();let d=r;p.toLowerCase().includes("call sheet")?d=`📋 **Call Sheet Preparation (Draft 4.2)**
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
*(Detailed shot canvas will be available in Storyboard Studio Prompt 3)*`),c("assistant",d,!0)}catch{x.remove(),c("assistant","I analyzed your request against the active screenplay context. Pacing and scene logistics align with Draft 4.2 standards.",!0)}}s&&(s.onclick=u),t&&(t.onkeydown=p=>{p.key==="Enter"&&!p.shiftKey&&(p.preventDefault(),u())}),o.forEach(p=>{p.onclick=()=>{const x=p.getAttribute("data-prompt");t&&(t.value=x,u())}}),a&&(a.onclick=()=>{localStorage.removeItem("scriptora_chat_history"),n.innerHTML=`
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
      `})}function La(e){const t=e.split("?")[0].toLowerCase();return t.includes("/schedule")||t.includes("/stripboard")?"Schedule":t.includes("/scenes")||t.includes("/scene-hub")?"Scenes":t.includes("/breakdown")?"Breakdown":t.includes("/call-sheets")?"Call Sheets":t.includes("/dialogue-sides")||t.includes("/sides")?"Sides":t.includes("/documents")?"Documents":t.includes("/storyboard")?"Storyboard":t.includes("/editor")?"Editor":t.includes("/workspace")?"Workspace":t.includes("/intelligence")?"Intelligence":t.includes("/production")?"Studio":"Back"}function Dt(e,t="tune",s=null,n="",a=null){const l=new URLSearchParams(window.location.search||"").get("from"),i=s||l||"/production",c=a||La(i);return`
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 py-2 px-1 border-b border-slate-200/80 mb-3">
      <div class="flex items-center gap-2 min-w-0">
        <a href="${i}" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors text-xs font-semibold shrink-0" title="Back to ${c}">
          <span class="material-symbols-outlined text-[17px]">arrow_back</span>
          <span>${c}</span>
        </a>
        <div class="flex items-center gap-2 min-w-0">
          <div class="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80">
            <span class="material-symbols-outlined text-[17px]">${t}</span>
          </div>
          <div class="min-w-0">
            <h1 class="font-heading font-semibold text-sm text-slate-900 truncate leading-tight">${e}</h1>
            <div class="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium truncate">
              <span class="text-blue-700 font-semibold truncate">Chronicles of Dust</span>
              <span>•</span>
              <span class="flex items-center gap-0.5 text-slate-600 font-semibold">
                <span class="material-symbols-outlined text-[11px] text-slate-400">lock</span>
                <span>Draft 4.2 (Pinned)</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0 self-end sm:self-auto">
        ${n}
      </div>
    </div>
  `}function Oa(e){return e?String(e).replace(/\u2014/g," -- ").replace(/\u2013/g,"-").replace(/\u2026/g,"...").replace(/[\u201C\u201D]/g,'"').replace(/[\u2018\u2019]/g,"'").replace(/\u00B7/g," - ").replace(/\u2022/g,"* ").replace(/\u2192/g,"->").replace(/\u2190/g,"<-").replace(/[^\x20-\x7E]/g," ").replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/[\r\n]+/g," "):""}function dt(e,t){if(!e)return[];const s=String(e).split(/\s+/),n=[];let a="";for(const o of s)a?a.length+1+o.length<=t?a+=" "+o:(n.push(a),a=o):a=o;return a&&n.push(a),n}function St(e,t){if(!e||!(e instanceof Blob))throw new Error("Invalid PDF blob received for download");const s=URL.createObjectURL(e),n=document.createElement("a");n.style&&(n.style.display="none"),n.href=s,n.download=t||"document.pdf",document.body.appendChild(n),n.click(),setTimeout(()=>{try{n.parentNode&&n.parentNode.removeChild(n),URL.revokeObjectURL(s)}catch{}},4e3)}function Et(e,t={}){const s=t.pageWidth||612,n=t.pageHeight||792,a=e.length,o=[];let l=0;function i(){return++l}const c=i(),u=i(),p=[];for(let E=0;E<a;E++)p.push(i());const x={F1:i(),F2:i(),F3:i(),F4:i(),F5:i(),F6:i()},r=[];for(let E=0;E<a;E++)r.push(i());o[c]=`<< /Type /Catalog /Pages ${u} 0 R >>`,o[u]=`<< /Type /Pages /Kids [${p.map(E=>`${E} 0 R`).join(" ")}] /Count ${a} >>`,o[x.F1]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",o[x.F2]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",o[x.F3]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>",o[x.F4]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>",o[x.F5]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Oblique /Encoding /WinAnsiEncoding >>",o[x.F6]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>";const d=`<< /F1 ${x.F1} 0 R /F2 ${x.F2} 0 R /F3 ${x.F3} 0 R /F4 ${x.F4} 0 R /F5 ${x.F5} 0 R /F6 ${x.F6} 0 R >>`,b=new TextEncoder;for(let E=0;E<a;E++){o[p[E]]=`<< /Type /Page /Parent ${u} 0 R /MediaBox [0 0 ${s} ${n}] /Contents ${r[E]} 0 R /Resources << /Font ${d} >> >>`;const F=e[E]||{};let O="";if(F.vectors&&F.vectors.length)for(const m of F.vectors)m.type==="rect"?(m.fill&&(O+=`${m.fill[0].toFixed(3)} ${m.fill[1].toFixed(3)} ${m.fill[2].toFixed(3)} rg
`,O+=`${m.x.toFixed(2)} ${m.y.toFixed(2)} ${m.w.toFixed(2)} ${m.h.toFixed(2)} re
f
`),m.stroke&&(O+=`${m.stroke[0].toFixed(3)} ${m.stroke[1].toFixed(3)} ${m.stroke[2].toFixed(3)} RG
`,O+=`${(m.lineWidth||1).toFixed(2)} w
`,O+=`${m.x.toFixed(2)} ${m.y.toFixed(2)} ${m.w.toFixed(2)} ${m.h.toFixed(2)} re
S
`)):m.type==="line"&&(O+=`${(m.stroke||[0,0,0])[0].toFixed(3)} ${(m.stroke||[0,0,0])[1].toFixed(3)} ${(m.stroke||[0,0,0])[2].toFixed(3)} RG
`,O+=`${(m.lineWidth||1).toFixed(2)} w
`,O+=`${m.x1.toFixed(2)} ${m.y1.toFixed(2)} m ${m.x2.toFixed(2)} ${m.y2.toFixed(2)} l S
`);if(F.texts&&F.texts.length)for(const m of F.texts){const A=m.font||"F1",h=m.size||10,B=m.color||[.1,.1,.1],K=Oa(m.text);O+=`BT
`,O+=`/${A} ${h} Tf
`,O+=`${B[0].toFixed(3)} ${B[1].toFixed(3)} ${B[2].toFixed(3)} rg
`,O+=`1 0 0 1 ${m.x.toFixed(2)} ${m.y.toFixed(2)} Tm
`,O+=`(${K}) Tj
`,O+=`ET
`}const ne=b.encode(O);o[r[E]]=`<< /Length ${ne.length} >>
stream
${O}endstream`}const v=b.encode(`%PDF-1.4
%âãÏÓ
`);let g=v.length;const $=[],M=[];for(let E=1;E<=l;E++){$[E]=g;const F=`${E} 0 obj
${o[E]}
endobj
`,O=b.encode(F);M.push(O),g+=O.length}const I=g;let k=`xref
0 ${l+1}
0000000000 65535 f 
`;for(let E=1;E<=l;E++)k+=`${String($[E]).padStart(10,"0")} 00000 n 
`;k+=`trailer
<< /Size ${l+1} /Root ${c} 0 R >>
startxref
${I}
%%EOF`;const T=b.encode(k);return new Blob([v,...M,T],{type:"application/pdf"})}function Ts(e={},t={}){const s=t.title||"Chronicles of Dust",n=t.draft||"Draft 4.2 (Pinned)",a=[],o=[],l=[];o.push({type:"rect",x:36,y:730,w:540,h:36,fill:[.08,.12,.2]}),l.push({text:"SCRIPTORA -- OFFICIAL PRODUCTION CALL SHEET",x:46,y:752,font:"F2",size:10,color:[.9,.9,.9]}),l.push({text:`${s.toUpperCase()} -- ${n}`,x:46,y:738,font:"F1",size:9,color:[.7,.8,1]}),l.push({text:`DAY ${e.callSheetNumber||"01"} OF 14`,x:495,y:746,font:"F2",size:12,color:[1,1,1]}),o.push({type:"rect",x:36,y:670,w:540,h:50,fill:[.97,.98,.99],stroke:[.85,.88,.92],lineWidth:.8}),l.push({text:"DATE",x:50,y:706,font:"F2",size:8,color:[.4,.45,.5]}),l.push({text:e.shootDate||"Saturday, Oct 24, 2026",x:50,y:692,font:"F2",size:10,color:[.1,.1,.1]}),l.push({text:e.shootDay||"Day 1 of 14",x:50,y:680,font:"F1",size:8,color:[.4,.45,.5]}),l.push({text:"CREW CALL",x:190,y:706,font:"F2",size:8,color:[.4,.45,.5]}),l.push({text:e.generalCrewCall||"06:00 AM",x:190,y:692,font:"F2",size:11,color:[.1,.1,.1]}),l.push({text:`Breakfast: ${e.breakfastTime||"05:15 AM"}`,x:190,y:680,font:"F1",size:8,color:[.4,.45,.5]}),l.push({text:"SHOOTING CALL",x:320,y:706,font:"F2",size:8,color:[.1,.35,.85]}),l.push({text:e.shootingCall||"06:30 AM",x:320,y:692,font:"F2",size:11,color:[.1,.35,.85]}),l.push({text:"First Shot on Set",x:320,y:680,font:"F1",size:8,color:[.4,.45,.5]}),l.push({text:"ESTIMATED WRAP",x:450,y:706,font:"F2",size:8,color:[.4,.45,.5]}),l.push({text:e.estimatedWrap||"06:30 PM",x:450,y:692,font:"F2",size:11,color:[.1,.1,.1]}),l.push({text:"12hr Turnaround",x:450,y:680,font:"F1",size:8,color:[.4,.45,.5]}),o.push({type:"rect",x:36,y:605,w:540,h:55,fill:[1,1,1],stroke:[.85,.88,.92],lineWidth:.8}),l.push({text:"PRIMARY SET LOCATION & BASECAMP:",x:46,y:647,font:"F2",size:8,color:[.2,.25,.3]}),l.push({text:`${e.locationName||"Mojave Outpost Gate 4"} -- ${e.locationAddress||"Perimeter Road 9, Cantil, CA"}`,x:46,y:635,font:"F1",size:9,color:[.1,.1,.1]}),l.push({text:`Parking: ${e.parkingNotes||"Basecamp Lot B. Crew shuttle runs every 10 mins."}`,x:46,y:624,font:"F1",size:8,color:[.4,.45,.5]}),l.push({text:`Emergency Medical: ${e.nearestHospital||"Desert Care Regional Medical Center (Ph: 760-379-2681)"}`,x:46,y:613,font:"F1",size:8,color:[.8,.2,.2]}),l.push({text:"SCHEDULED SCENES TO SHOOT",x:36,y:588,font:"F2",size:10,color:[.1,.1,.1]});let i=570;o.push({type:"rect",x:36,y:i,w:540,h:18,fill:[.93,.94,.96],stroke:[.8,.83,.88],lineWidth:.8}),l.push({text:"SCENE #",x:42,y:i+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"SET & SCENE DESCRIPTION",x:105,y:i+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"D/N",x:375,y:i+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"PAGES",x:415,y:i+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"CAST CHARACTERS",x:465,y:i+5,font:"F2",size:8,color:[.3,.35,.4]});const c=e.scenes||[{sceneNumber:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",pages:"4 1/8",cast:["KEVIN","MARCUS"],desc:"Kevin arrives at border gate, inspection."},{sceneNumber:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",pages:"3 4/8",cast:["KEVIN","MEERA"],desc:"Kevin discovers telemetry pressure loss."}];i-=24;for(const d of c)o.push({type:"rect",x:36,y:i,w:540,h:24,fill:[1,1,1],stroke:[.88,.9,.93],lineWidth:.5}),l.push({text:`Scene ${d.sceneNumber}`,x:42,y:i+9,font:"F4",size:9,color:[.1,.3,.8]}),l.push({text:d.heading||`Scene ${d.sceneNumber}`,x:105,y:i+12,font:"F2",size:8,color:[.1,.1,.1]}),l.push({text:d.desc||"",x:105,y:i+3,font:"F1",size:7.5,color:[.4,.45,.5]}),l.push({text:d.heading?.includes("NIGHT")?"NIGHT":"DAY",x:375,y:i+9,font:"F1",size:8,color:[.3,.3,.3]}),l.push({text:d.pages||"1.0",x:415,y:i+9,font:"F3",size:8,color:[.3,.3,.3]}),l.push({text:(d.cast||[]).join(", "),x:465,y:i+9,font:"F2",size:8,color:[.2,.2,.2]}),i-=24;i-=15,l.push({text:"CAST & TALENT CALLS",x:36,y:i+10,font:"F2",size:10,color:[.1,.1,.1]}),o.push({type:"rect",x:36,y:i-10,w:540,h:18,fill:[.93,.94,.96],stroke:[.8,.83,.88],lineWidth:.8}),l.push({text:"CHARACTER",x:42,y:i-5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"ACTOR / TALENT",x:160,y:i-5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"PICKUP",x:300,y:i-5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"H/MU CALL",x:370,y:i-5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"ON SET CALL",x:450,y:i-5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"STATUS",x:520,y:i-5,font:"F2",size:8,color:[.3,.35,.4]}),i-=32;const u=e.castCalls||[{character:"KEVIN",actor:"Dev Patel",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MARCUS",actor:"David Chen",pickup:"05:15 AM",hmuCall:"05:45 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MEERA",actor:"Zoe Saldana",pickup:"08:30 AM",hmuCall:"09:00 AM",onSet:"10:30 AM",status:"Confirmed"}];for(const d of u)o.push({type:"rect",x:36,y:i,w:540,h:20,fill:[1,1,1],stroke:[.88,.9,.93],lineWidth:.5}),l.push({text:d.character||"CHARACTER",x:42,y:i+6,font:"F2",size:8.5,color:[.1,.1,.1]}),l.push({text:d.actor||"",x:160,y:i+6,font:"F1",size:8.5,color:[.2,.2,.2]}),l.push({text:d.pickup||"-",x:300,y:i+6,font:"F3",size:8,color:[.3,.3,.3]}),l.push({text:d.hmuCall||"-",x:370,y:i+6,font:"F3",size:8,color:[.3,.3,.3]}),l.push({text:d.onSet||"-",x:450,y:i+6,font:"F4",size:8.5,color:[.1,.3,.8]}),l.push({text:d.status||"Confirmed",x:520,y:i+6,font:"F1",size:7.5,color:[.2,.6,.3]}),i-=20;i-=15,o.push({type:"rect",x:36,y:i-35,w:540,h:42,fill:[.99,.98,.94],stroke:[.92,.88,.75],lineWidth:.8}),l.push({text:"SAFETY DIRECTIVES & PRODUCTION INSTRUCTIONS:",x:46,y:i-5,font:"F2",size:8,color:[.6,.4,.1]});const p=dt(e.specialInstructions||"Eye protection mandatory for all perimeter crew during afternoon dust squalls. Hearing protection active in generator bays.",105);l.push({text:p[0]||"",x:46,y:i-17,font:"F1",size:7.5,color:[.3,.25,.1]}),l.push({text:p[1]||"",x:46,y:i-28,font:"F1",size:7.5,color:[.3,.25,.1]}),o.push({type:"line",x1:36,y1:45,x2:576,y2:45,stroke:[.8,.8,.8],lineWidth:.8}),l.push({text:"CONFIDENTIAL -- SCRIPTORA PRODUCTION STUDIO -- NOT FOR PUBLIC DISTRIBUTION",x:36,y:32,font:"F1",size:7.5,color:[.5,.5,.5]}),l.push({text:"Page 1 of 1",x:525,y:32,font:"F1",size:7.5,color:[.5,.5,.5]}),a.push({vectors:o,texts:l});const x=Et(a),r=`CallSheet_Day${e.callSheetNumber||"01"}_${s.replace(/\s+/g,"_")}.pdf`;return St(x,r),x}function ja(e="CHARACTER",t=[],s={}){const n=s.title||"Chronicles of Dust",a=s.draft||"Draft 4.2",o=[],l=38,i=[];let c=[],u=0;for(const r of t){const d=r.dialogue||r.text||"",b=dt(d,46),f=4+b.length;u+f>l&&c.length>0&&(i.push(c),c=[],u=0),c.push({...r,speechLines:b}),u+=f}c.length>0&&i.push(c),i.length===0&&i.push([]);for(let r=0;r<i.length;r++){const d=i[r],b=[],f=[];b.push({type:"line",x1:54,y1:746,x2:558,y2:746,stroke:[.2,.2,.2],lineWidth:1.2}),f.push({text:"SCRIPTORA -- CHARACTER DIALOGUE SHEET",x:54,y:755,font:"F4",size:9,color:[.3,.3,.3]}),f.push({text:`PAGE ${r+1} OF ${i.length}`,x:490,y:755,font:"F4",size:9,color:[.3,.3,.3]}),f.push({text:`${e.toUpperCase()} -- ALL DIALOGUE CUES`,x:54,y:730,font:"F4",size:12,color:[0,0,0]}),f.push({text:`Screenplay: ${n} (${a}) -- Pinned Baseline`,x:54,y:716,font:"F3",size:9,color:[.4,.4,.4]});let v=680;for(const g of d){const $=g.sceneNum||g.sceneNumber||1,M=g.heading||`SCENE ${$}`;if(f.push({text:`SCENE ${$} -- ${M}`,x:54,y:v,font:"F4",size:9,color:[.1,.3,.7]}),v-=14,g.action){const E=dt(g.action,65);for(const F of E)f.push({text:F,x:54,y:v,font:"F5",size:8.5,color:[.4,.4,.4]}),v-=11}const I=g.character||e||"CHARACTER",k=I.length*6.5;if(f.push({text:I,x:Math.max(160,306-k/2),y:v,font:"F4",size:10,color:[0,0,0]}),v-=12,g.parenthetical){const E=g.parenthetical.length*5.5;f.push({text:g.parenthetical,x:Math.max(160,306-E/2),y:v,font:"F5",size:9,color:[.3,.3,.3]}),v-=12}const T=g.speechLines||dt(g.dialogue||g.text||"",46);for(const E of T)f.push({text:E,x:170,y:v,font:"F3",size:10,color:[0,0,0]}),v-=13;v-=12}b.push({type:"line",x1:54,y1:50,x2:558,y2:50,stroke:[.8,.8,.8],lineWidth:.8}),f.push({text:`SCRIPTORA SCREENPLAY ARCHITECTURE -- ${e.toUpperCase()} -- DRAFT 4.2`,x:54,y:38,font:"F3",size:8,color:[.5,.5,.5]}),f.push({text:`Page ${r+1} of ${i.length}`,x:495,y:38,font:"F3",size:8,color:[.5,.5,.5]}),o.push({vectors:b,texts:f})}const p=Et(o),x=`DialogueSheet_${e.replace(/\s+/g,"_")}_${n.replace(/\s+/g,"_")}.pdf`;return St(p,x),p}function Fa(e=1,t=[],s={},n={}){s&&s.title&&!n.title&&(n=s);const a=n.title||"Chronicles of Dust",o=n.draft||"Draft 4.2",l=s.heading||t[0]?.heading||`SCENE ${e} - DAY`,i=[],c=[],u=[];c.push({type:"rect",x:54,y:730,w:504,h:32,fill:[.1,.1,.1]}),u.push({text:"SCRIPTORA -- REHEARSAL & ON-SET SIDES",x:64,y:748,font:"F4",size:9,color:[.8,.8,.8]}),u.push({text:`SCENE ${e} SIDES`,x:460,y:748,font:"F4",size:10,color:[1,1,1]}),u.push({text:`${a.toUpperCase()} -- SCENE ${e}`,x:54,y:712,font:"F4",size:13,color:[0,0,0]}),u.push({text:`${l} -- ${o}`,x:54,y:698,font:"F3",size:9,color:[.4,.4,.4]}),c.push({type:"line",x1:54,y1:686,x2:558,y2:686,stroke:[.2,.2,.2],lineWidth:1});let p=665;u.push({text:l,x:54,y:p,font:"F4",size:10,color:[0,0,0]}),p-=18;for(const d of t){if(d.action){const f=dt(d.action,65);for(const v of f)u.push({text:v,x:54,y:p,font:"F5",size:9.5,color:[.2,.2,.2]}),p-=13;p-=4}if(d.character){const f=d.character.length*6.5;u.push({text:d.character,x:Math.max(160,306-f/2),y:p,font:"F4",size:10,color:[0,0,0]}),p-=13}if(d.parenthetical){const f=d.parenthetical.length*5.5;u.push({text:d.parenthetical,x:Math.max(160,306-f/2),y:p,font:"F5",size:9,color:[.3,.3,.3]}),p-=12}const b=d.dialogue||d.text||"";if(b){const f=dt(b,46);for(const v of f)u.push({text:v,x:170,y:p,font:"F3",size:10,color:[0,0,0]}),p-=13}p-=10}c.push({type:"rect",x:180,y:p-15,w:252,h:20,fill:[.95,.95,.95],stroke:[.7,.7,.7],lineWidth:.8}),u.push({text:`END OF SCENE ${e} SIDES -- STAMPED DRAFT 4.2`,x:195,y:p-3,font:"F4",size:7.5,color:[.3,.3,.3]}),c.push({type:"line",x1:54,y1:50,x2:558,y2:50,stroke:[.8,.8,.8],lineWidth:.8}),u.push({text:"SCRIPTORA REHEARSAL COPY -- OFFICIAL PRODUCTION SIDES",x:54,y:38,font:"F3",size:8,color:[.5,.5,.5]}),u.push({text:"Page 1 of 1",x:505,y:38,font:"F3",size:8,color:[.5,.5,.5]}),i.push({vectors:c,texts:u});const x=Et(i),r=`ActorSides_Scene${e}_${a.replace(/\s+/g,"_")}.pdf`;return St(x,r),x}function Ks(e=[],t={}){const s=t.title||"Chronicles of Dust",n=t.draft||"Draft 4.2",a=[],o=18,l=e.length,i=Math.ceil(l/o)||1;for(let p=0;p<i;p++){const x=[],r=[],d=e.slice(p*o,(p+1)*o);x.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),r.push({text:"SCRIPTORA -- SCRIPT BREAKDOWN MASTER REPORT",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),r.push({text:`${s.toUpperCase()} (${n}) -- ${l} ELEMENTS TAGGED`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),r.push({text:`PAGE ${p+1} OF ${i}`,x:505,y:747,font:"F2",size:9,color:[1,1,1]});let b=705;x.push({type:"rect",x:36,y:b,w:540,h:18,fill:[.93,.94,.96],stroke:[.8,.83,.88],lineWidth:.8}),r.push({text:"CATEGORY",x:42,y:b+5,font:"F2",size:8,color:[.3,.35,.4]}),r.push({text:"ELEMENT NAME",x:120,y:b+5,font:"F2",size:8,color:[.3,.35,.4]}),r.push({text:"SCENES",x:270,y:b+5,font:"F2",size:8,color:[.3,.35,.4]}),r.push({text:"STATUS",x:330,y:b+5,font:"F2",size:8,color:[.3,.35,.4]}),r.push({text:"DETAILS / SOURCING SPECIFICATION",x:400,y:b+5,font:"F2",size:8,color:[.3,.35,.4]}),b-=22;for(const f of d){x.push({type:"rect",x:36,y:b,w:540,h:22,fill:[1,1,1],stroke:[.88,.9,.93],lineWidth:.5}),r.push({text:f.category||"Props",x:42,y:b+7,font:"F2",size:8,color:[.1,.3,.8]}),r.push({text:(f.name||"").slice(0,32),x:120,y:b+7,font:"F2",size:8.5,color:[.1,.1,.1]}),r.push({text:(f.scenes||[f.sceneNumber||18]).map(g=>`#${g}`).join(", "),x:270,y:b+7,font:"F3",size:8,color:[.4,.4,.4]}),r.push({text:f.status||"Confirmed",x:330,y:b+7,font:"F1",size:8,color:f.status==="Confirmed"?[.1,.6,.2]:[.8,.4,.1]});const v=f.assignedActor||f.sourcingType||f.description||f.notes||"Ready";r.push({text:v.slice(0,36),x:400,y:b+7,font:"F1",size:7.5,color:[.3,.3,.3]}),b-=22}x.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),r.push({text:"SCRIPTORA MASTER PRODUCTION BREAKDOWN -- IMMUTABLE SNAPSHOT",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),r.push({text:`Page ${p+1} of ${i}`,x:510,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),a.push({vectors:x,texts:r})}const c=Et(a),u=`ScriptBreakdown_${s.replace(/\s+/g,"_")}.pdf`;return St(c,u),c}function _a(e=[],t=[],s={}){const n=s.title||"Chronicles of Dust",a=s.draft||"Draft 4.2",o=[],l=[],i=[];l.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),i.push({text:"SCRIPTORA -- MASTER SHOOTING SCHEDULE",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),i.push({text:`${n.toUpperCase()} (${a}) -- ${e.length} SHOOT DAYS`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),i.push({text:"PAGE 1 OF 1",x:515,y:747,font:"F2",size:9,color:[1,1,1]});let c=705;l.push({type:"rect",x:36,y:c,w:540,h:18,fill:[.93,.94,.96],stroke:[.8,.83,.88],lineWidth:.8}),i.push({text:"DAY #",x:42,y:c+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"DATE",x:80,y:c+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"SHOOT LOCATION / STAGE",x:155,y:c+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"SCENES",x:340,y:c+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"PAGES",x:430,y:c+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"HOURS",x:480,y:c+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"STATUS",x:530,y:c+5,font:"F2",size:8,color:[.3,.35,.4]}),c-=26;for(const x of e){l.push({type:"rect",x:36,y:c,w:540,h:26,fill:[1,1,1],stroke:[.88,.9,.93],lineWidth:.5}),i.push({text:`D${x.dayNumber}`,x:42,y:c+9,font:"F2",size:9,color:[.1,.1,.1]}),i.push({text:x.date||"",x:80,y:c+9,font:"F1",size:8,color:[.3,.3,.3]}),i.push({text:x.location||"Location TBD",x:155,y:c+13,font:"F2",size:8.5,color:[.1,.1,.1]}),i.push({text:x.title||"",x:155,y:c+3,font:"F1",size:7.5,color:[.5,.5,.5]});const r=(x.sceneNumbers||[]).map(d=>`Sc ${d}`).join(", ")||"None";i.push({text:r,x:340,y:c+9,font:"F4",size:8.5,color:[.1,.3,.8]}),i.push({text:x.totalPages||"0 0/8",x:430,y:c+9,font:"F3",size:8,color:[.3,.3,.3]}),i.push({text:`${x.estHours||8}h`,x:480,y:c+9,font:"F1",size:8,color:[.4,.4,.4]}),i.push({text:x.status||"Draft",x:530,y:c+9,font:"F1",size:7.5,color:x.status==="Confirmed"?[.1,.6,.2]:[.4,.4,.4]}),c-=26}l.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),i.push({text:"SCRIPTORA MASTER STRIPBOARD SCHEDULE -- OWNER CONFIRMED BASELINE",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),i.push({text:"Page 1 of 1",x:525,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),o.push({vectors:l,texts:i});const u=Et(o),p=`ShootingSchedule_${n.replace(/\s+/g,"_")}.pdf`;return St(u,p),u}function Ha(e=[],t={}){const s=t.title||"Chronicles of Dust",n=t.draft||"Draft 4.2",a=[],o=[{sceneNum:1,shotNum:"1A",title:"Perimeter Outpost Gate",lens:"Wide Establishing Drone (24mm, 2.39:1)",intExt:"EXT",dayNight:"DAY",description:"High altitude drone descending across dust devils toward Kevin's arrival."},{sceneNum:2,shotNum:"2C",title:"Customs Shed Hologram",lens:"Medium Two-Shot (50mm, 2.39:1)",intExt:"INT",dayNight:"DAY",description:"Fluorescent tube flicker rim lighting Kevin and Meera over telemetry anomaly."},{sceneNum:18,shotNum:"18D",title:"High Pressure Bypass Tank",lens:"Close Tracking Dolly (35mm Anamorphic)",intExt:"INT",dayNight:"NIGHT",description:"Wrench slips in Kevin hand under spurting brine vapor with pulsing red siren strobe."}],l=e&&e.length>0?e:o,i=[],c=[];i.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),c.push({text:"SCRIPTORA -- STORYBOARD STUDIO SHOT COMPOSITION",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),c.push({text:`${s.toUpperCase()} (${n}) -- VISUAL SHOT BOARDS`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),c.push({text:"PAGE 1 OF 1",x:515,y:747,font:"F2",size:9,color:[1,1,1]});let u=575;for(const r of l){i.push({type:"rect",x:36,y:u,w:540,h:140,fill:[1,1,1],stroke:[.85,.88,.92],lineWidth:.8}),i.push({type:"rect",x:46,y:u+15,w:200,h:110,fill:[.08,.1,.15],stroke:[.3,.35,.4],lineWidth:1}),i.push({type:"line",x1:141,y1:u+70,x2:151,y2:u+70,stroke:[.5,.6,.7],lineWidth:.6}),i.push({type:"line",x1:146,y1:u+65,x2:146,y2:u+75,stroke:[.5,.6,.7],lineWidth:.6}),c.push({text:`${r.intExt||"EXT"}. ${r.dayNight||"DAY"}`,x:52,y:u+23,font:"F3",size:7.5,color:[.8,.8,.8]}),c.push({text:`SCENE ${r.sceneNum||1} -- SHOT ${r.shotNum||"1A"}`,x:260,y:u+110,font:"F2",size:10,color:[.1,.3,.8]}),c.push({text:r.title||"Shot Concept",x:260,y:u+95,font:"F2",size:11,color:[.1,.1,.1]}),c.push({text:`Camera Setup: ${r.lens||"50mm Prime (2.39:1)"}`,x:260,y:u+78,font:"F3",size:8.5,color:[.4,.45,.5]});const d=dt(r.description||"",48);let b=u+60;for(const f of d)c.push({text:f,x:260,y:b,font:"F1",size:8,color:[.2,.25,.3]}),b-=12;u-=150}i.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),c.push({text:"SCRIPTORA STORYBOARD STUDIO -- CAMERA & CONCEPT ARCHITECTURE",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),c.push({text:"Page 1 of 1",x:525,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),a.push({vectors:i,texts:c});const p=Et(a),x=`Storyboard_${s.replace(/\s+/g,"_")}.pdf`;return St(p,x),p}const Ua={Cast:{icon:"person"},Locations:{icon:"location_on"},Props:{icon:"inventory_2"},"Practical FX":{icon:"science"},Stunts:{icon:"sports_kabaddi"},Costumes:{icon:"checkroom"},Vehicles:{icon:"commute"},Sound:{icon:"music_note"},"Hair & Makeup":{icon:"face"}};function qa(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||y.state.selectedScriptId;const n=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${Be("Pre-Production","Script Breakdown Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Dt("Script Breakdown","dataset",n||"/production",`
          <div class="flex items-center gap-2">
            <button id="btn-export-breakdown-pdf" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Export genuine Script Breakdown Report PDF">
              <span class="material-symbols-outlined text-[16px]">download</span>
              <span class="hidden sm:inline">Export PDF</span>
            </button>
            <button id="btn-add-element" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>Add Element</span>
            </button>
          </div>
        `)}

        <!-- Breakdown Status Summary -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <div class="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div class="p-2 sm:px-3 first:pl-1">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Total Elements</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-total">--</div>
              <span class="text-[11px] text-slate-400">Across 10 Scenes</span>
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
                <option value="all">All Scenes (10 Scenes)</option>
                <option value="scene-1">Scene 1 — Gate 4 Day</option>
                <option value="scene-2">Scene 2 — Customs Shed</option>
                <option value="scene-3">Scene 3 — Conduit Dusk</option>
                <option value="scene-4">Scene 4 — Perimeter Fence</option>
                <option value="scene-5">Scene 5 — Valve Tunnel</option>
                <option value="scene-6">Scene 6 — Service Road</option>
                <option value="scene-7">Scene 7 — Syndicate Control</option>
                <option value="scene-8">Scene 8 — Reservoir Basin</option>
                <option value="scene-9">Scene 9 — Drainage Vault</option>
                <option value="scene-10">Scene 10 — Chamber B Night</option>
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

      ${Te("production")}

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
  `}async function za(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),a=s||n.get("scriptId")||y.state.selectedScriptId||"chronicles-of-dust";let o=n.get("category")||"all",l=n.get("scene")||"all",i=n.get("character")||n.get("search")||"",c=null;const u=document.getElementById("breakdown-scene-select");u&&l!=="all"&&(u.value=l.startsWith("scene-")?l:`scene-${l}`),o!=="all"&&document.querySelectorAll(".cat-btn").forEach(m=>{m.getAttribute("data-cat")===o?(m.classList.add("bg-blue-600","text-white","shadow-2xs"),m.classList.remove("bg-slate-100","text-slate-700")):(m.classList.remove("bg-blue-600","text-white","shadow-2xs"),m.classList.add("bg-slate-100","text-slate-700"))});const p=document.getElementById("breakdown-search");p&&i&&(p.value=i);const x=m=>{const A=m.category;if(A==="Cast"){const h=!m.assignedActor||m.assignedActor.toLowerCase().includes("unassigned")||m.assignedActor.toLowerCase().includes("open"),B=m.castingStatus==="Confirmed Cast"?"bg-emerald-50 text-emerald-700 border-emerald-200":m.castingStatus==="Offer Out"?"bg-sky-50 text-sky-700 border-sky-200":"bg-amber-50 text-amber-700 border-amber-200";return`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Actor</span>
            <div class="font-semibold text-slate-900 mt-0.5">
              ${h?'<span class="text-amber-700 italic">Unassigned (Open Role)</span>':`<span class="text-indigo-700 font-bold">${m.assignedActor}</span>`}
            </div>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Casting Status</span>
            <span class="inline-block mt-0.5 px-2 py-0.5 rounded-lg border text-[11px] font-semibold ${B}">
              ${m.castingStatus||"Auditioning"}
            </span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Actor Availability</span>
            <div class="text-slate-700 mt-0.5 font-medium truncate" title="${m.actorAvailability||"Not specified"}">
              ${m.actorAvailability||"Not specified"}
            </div>
          </div>
        </div>
      `}return A==="Props"?`
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sourcing</span>
            <span class="font-semibold text-emerald-800 text-[11px]">${m.sourcingType||"Prop House"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quantity</span>
            <span class="font-semibold text-slate-900 text-[11px]">${m.quantity||"1"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Readiness</span>
            <span class="font-semibold text-teal-700 text-[11px]">${m.readinessStatus||"Ready"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Continuity Notes</span>
            <span class="text-slate-600 text-[11px] truncate block" title="${m.continuityNotes||"Standard"}">${m.continuityNotes||"Standard"}</span>
          </div>
        </div>
      `:A==="Practical FX"?`
        <div class="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-purple-50/50 p-2 rounded-xl border border-purple-100">
              <span class="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Required Resources</span>
              <span class="font-semibold text-purple-900 text-[11px]">${m.requiredResources||"Standard FX Kit"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Technical Specs</span>
              <span class="text-slate-800 font-medium text-[11px]">${m.technicalRequirements||"Per department"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prep Status</span>
              <span class="font-semibold text-emerald-700 text-[11px]">${m.prepStatus||"Rigged & Tested"}</span>
            </div>
          </div>
          ${m.safetyNotes?`
            <div class="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-1.5 text-[11px]">
              <span class="material-symbols-outlined text-[15px] text-rose-600 shrink-0 mt-0.5">warning</span>
              <div><strong class="font-semibold">Safety Mandate:</strong> ${m.safetyNotes}</div>
            </div>
          `:""}
        </div>
      `:A==="Stunts"?`
        <div class="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-rose-50/50 p-2 rounded-xl border border-rose-100">
              <span class="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">Safety Planning</span>
              <span class="font-semibold text-rose-900 text-[11px]">${m.safetyPlanningStatus||"Review in Progress"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Qualified Personnel</span>
              <span class="text-slate-800 font-medium text-[11px]">${m.qualifiedPersonnel||"Lead Stunt Performer"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rigging Requirements</span>
              <span class="text-slate-800 font-medium text-[11px]">${m.coordinationRequirements||"Coordinator on set"}</span>
            </div>
          </div>
        </div>
      `:A==="Locations"?`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-amber-50/50 p-2 rounded-xl border border-amber-100">
            <span class="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Context & Lighting</span>
            <span class="font-semibold text-amber-900 text-[11px]">${m.context||"INT."} · ${m.lighting||"DAY"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location Status</span>
            <span class="font-semibold text-emerald-700 text-[11px]">${m.locationStatus||"Permitted & Locked"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Access Details</span>
            <span class="text-slate-700 text-[11px] truncate block" title="${m.accessDetails||"Standard access"}">${m.accessDetails||"Standard access"}</span>
          </div>
        </div>
      `:A==="Costumes"?`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-teal-50/50 p-2 rounded-xl border border-teal-100">
            <span class="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">Character</span>
            <span class="font-semibold text-teal-900 text-[11px]">${m.character||"Cast member"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Continuity Changes</span>
            <span class="text-slate-700 text-[11px] truncate block" title="${m.continuityChanges||"Stage 1"}">${m.continuityChanges||"Stage 1"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prep Status</span>
            <span class="font-semibold text-emerald-700 text-[11px]">${m.prepStatus||"Fitted & Approved"}</span>
          </div>
        </div>
      `:A==="Vehicles"?`
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Availability</span>
            <span class="font-semibold text-slate-900 text-[11px]">${m.availability||"On Set"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Operational Requirements</span>
            <span class="text-slate-700 text-[11px]">${m.operationalRequirements||"Qualified operator"}</span>
          </div>
        </div>
      `:""},r=m=>{const A=m.category,h=m.scenes&&m.scenes.length>0?m.scenes.join(", "):m.sceneNumber;return`
      <div class="edit-panel mt-3 p-4 bg-slate-50/90 rounded-2xl border-2 border-blue-400/80 shadow-md flex flex-col gap-3 text-xs animate-in fade-in duration-150">
        <div class="flex items-center justify-between border-b border-slate-200 pb-2">
          <div class="flex items-center gap-1.5 font-heading font-bold text-blue-900">
            <span class="material-symbols-outlined text-[18px]">edit</span>
            <span>Edit Production Element: ${m.name}</span>
          </div>
          <span class="text-[10px] text-slate-500 font-medium">Owner Permissions Active</span>
        </div>

        <form class="form-edit-inline flex flex-col gap-3" data-id="${m.id}">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Element Name</label>
              <input type="text" name="name" value="${m.name||""}" required class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Category</label>
              <select name="category" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="Cast" ${A==="Cast"?"selected":""}>Cast & Characters</option>
                <option value="Locations" ${A==="Locations"?"selected":""}>Locations</option>
                <option value="Props" ${A==="Props"?"selected":""}>Props</option>
                <option value="Practical FX" ${A==="Practical FX"?"selected":""}>Practical FX</option>
                <option value="Stunts" ${A==="Stunts"?"selected":""}>Stunts & Action</option>
                <option value="Costumes" ${A==="Costumes"?"selected":""}>Costumes & Wardrobe</option>
                <option value="Vehicles" ${A==="Vehicles"?"selected":""}>Vehicles & Equipment</option>
                <option value="Sound" ${A==="Sound"?"selected":""}>Sound</option>
                <option value="Hair & Makeup" ${A==="Hair & Makeup"?"selected":""}>Hair & Makeup</option>
              </select>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Review Status</label>
              <select name="status" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="Confirmed" ${m.status==="Confirmed"?"selected":""}>Confirmed (Human Approved)</option>
                <option value="Needs Review" ${m.status==="Needs Review"?"selected":""}>Needs Review</option>
                <option value="Rejected" ${m.status==="Rejected"?"selected":""}>Rejected</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Scenes (comma separated)</label>
              <input type="text" name="scenes" value="${h}" placeholder="e.g. 1, 4, 18" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              <span class="text-[10px] text-slate-400">Links element to multiple scenes simultaneously</span>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Description / Screenplay Context</label>
              <input type="text" name="description" value="${m.description||""}" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <!-- Dynamic Category Fields inside Edit Panel -->
          ${A==="Cast"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Assigned Actor</label>
                <input type="text" name="assignedActor" value="${m.assignedActor||""}" placeholder="e.g. Dev Patel (or leave blank for Open)" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Casting Status</label>
                <select name="castingStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Confirmed Cast" ${m.castingStatus==="Confirmed Cast"?"selected":""}>Confirmed Cast</option>
                  <option value="Offer Out" ${m.castingStatus==="Offer Out"?"selected":""}>Offer Out</option>
                  <option value="Auditioning" ${m.castingStatus==="Auditioning"?"selected":""}>Auditioning</option>
                  <option value="Uncast / Open" ${m.castingStatus==="Uncast / Open"?"selected":""}>Uncast / Open Role</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Actor Availability</label>
                <input type="text" name="actorAvailability" value="${m.actorAvailability||""}" placeholder="e.g. Shoot Days 1-14" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${A==="Props"?`
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5 p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Sourcing Type</label>
                <select name="sourcingType" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Hero Prop" ${m.sourcingType==="Hero Prop"?"selected":""}>Hero Prop</option>
                  <option value="Custom Build / Fabricate" ${m.sourcingType==="Custom Build / Fabricate"?"selected":""}>Custom Build</option>
                  <option value="Prop House Rental" ${m.sourcingType==="Prop House Rental"?"selected":""}>Prop House</option>
                  <option value="Purchased" ${m.sourcingType==="Purchased"?"selected":""}>Purchased</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Quantity</label>
                <input type="text" name="quantity" value="${m.quantity||"1"}" placeholder="e.g. x2 Hero, x4 Rubber" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Readiness Status</label>
                <select name="readinessStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Ready in Art Dept" ${m.readinessStatus==="Ready in Art Dept"?"selected":""}>Ready in Art Dept</option>
                  <option value="Fabrication Ready" ${m.readinessStatus==="Fabrication Ready"?"selected":""}>Fabrication Ready</option>
                  <option value="In Progress" ${m.readinessStatus==="In Progress"?"selected":""}>In Progress</option>
                  <option value="Pending Sourcing" ${m.readinessStatus==="Pending Sourcing"?"selected":""}>Pending Sourcing</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Continuity Notes</label>
                <input type="text" name="continuityNotes" value="${m.continuityNotes||""}" placeholder="Continuity tracking..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${A==="Practical FX"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-purple-50/50 rounded-xl border border-purple-100">
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Required Resources</label>
                <input type="text" name="requiredResources" value="${m.requiredResources||""}" placeholder="CO2, Brine Reservoir..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Technical Specs</label>
                <input type="text" name="technicalRequirements" value="${m.technicalRequirements||""}" placeholder="Pressure limits, wiring..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Safety Notes</label>
                <input type="text" name="safetyNotes" value="${m.safetyNotes||""}" placeholder="Goggles, splash radius..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${A==="Stunts"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-rose-50/50 rounded-xl border border-rose-100">
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Safety Planning Status</label>
                <select name="safetyPlanningStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Rigging Rig Approved" ${m.safetyPlanningStatus==="Rigging Rig Approved"?"selected":""}>Rigging Rig Approved</option>
                  <option value="Rehearsal Pending" ${m.safetyPlanningStatus==="Rehearsal Pending"?"selected":""}>Rehearsal Pending</option>
                  <option value="In Coordinator Review" ${m.safetyPlanningStatus==="In Coordinator Review"?"selected":""}>In Review</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Qualified Personnel</label>
                <input type="text" name="qualifiedPersonnel" value="${m.qualifiedPersonnel||""}" placeholder="Stunt double, rigger..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Coordination Details</label>
                <input type="text" name="coordinationRequirements" value="${m.coordinationRequirements||""}" placeholder="Ratchet, cables..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${A==="Locations"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-amber-50/50 rounded-xl border border-amber-100">
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Context & Lighting</label>
                <input type="text" name="context" value="${m.context||"INT."}" placeholder="INT. or EXT." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Location Status</label>
                <input type="text" name="locationStatus" value="${m.locationStatus||"Permitted & Locked"}" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Access Details</label>
                <input type="text" name="accessDetails" value="${m.accessDetails||""}" placeholder="Access permits, route..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          <div class="flex items-center justify-between pt-2 border-t border-slate-200">
            <button type="button" class="btn-delete-element text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-xl font-medium transition-colors cursor-pointer flex items-center gap-1" data-id="${m.id}">
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
    `},d=async()=>{const m=await Je(a,o,l),A=m.filter(S=>{if(!i)return!0;const z=i.toLowerCase();return S.name.toLowerCase().includes(z)||S.description&&S.description.toLowerCase().includes(z)||S.category.toLowerCase().includes(z)||S.assignedActor&&S.assignedActor.toLowerCase().includes(z)||S.notes&&S.notes.toLowerCase().includes(z)}),h=m.length,B=m.filter(S=>S.status==="Confirmed").length,K=m.filter(S=>S.status==="Needs Review"||S.status==="Extracted").length,R=m.filter(S=>S.status==="Rejected").length,G=document.getElementById("kpi-total"),te=document.getElementById("kpi-confirmed"),H=document.getElementById("kpi-review"),ae=document.getElementById("kpi-rejected");G&&(G.textContent=h),te&&(te.textContent=B),H&&(H.textContent=K),ae&&(ae.textContent=R);const oe=document.getElementById("breakdown-list");if(oe){if(A.length===0){oe.innerHTML=`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400 text-xs">
          No breakdown elements match the active category, scene, or search filters.
        </div>
      `;return}oe.innerHTML=A.map(S=>{const z=S.status==="Confirmed",J=S.status==="Needs Review"||S.status==="Extracted",j=S.status==="Rejected",Ee=c===S.id,Q=Ua[S.category]||{icon:"label"},ie=z?'<span class="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200 text-[10px] font-medium flex items-center gap-1"><span class="material-symbols-outlined text-[11px] text-emerald-600">check</span>Confirmed</span>':J?'<span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium flex items-center gap-1">Needs Review</span>':'<span class="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium flex items-center gap-1">Excluded</span>',He=(Array.isArray(S.scenes)&&S.scenes.length>0?S.scenes:[S.sceneNumber]).map(xt=>`Sc ${xt}`).join(", ");return`
        <div class="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs hover:border-slate-300 transition-colors flex flex-col gap-2.5" data-id="${S.id}">
          <!-- Top Row: Element Name on Left, then Scene Tag, Category Tag, Status, Action Buttons -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div class="flex items-center gap-2 flex-wrap min-w-0">
              <h3 class="font-heading font-bold text-base text-slate-900 tracking-tight shrink-0 mr-1">${S.name}</h3>
              <span class="px-2 py-0.5 rounded-md bg-blue-50/70 text-blue-700 border border-blue-100 font-semibold text-xs shrink-0 flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">movie</span>
                <span>${He}</span>
              </span>
              <span class="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-700 flex items-center gap-1 shrink-0">
                <span class="material-symbols-outlined text-[13px] text-slate-400">${Q.icon}</span>
                <span>${S.category}</span>
              </span>
              ${ie}
            </div>

            <!-- Primary Action Buttons -->
            <div class="flex items-center gap-1.5 self-end sm:self-center shrink-0">
              <button class="btn-toggle-edit px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${S.id}" title="Edit all fields of this element">
                <span class="material-symbols-outlined text-[15px]">${Ee?"expand_less":"edit"}</span>
                <span>${Ee?"Close":"Edit"}</span>
              </button>

              ${z?`
                <button class="btn-review-item px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs transition-colors cursor-pointer" data-id="${S.id}">
                  Re-review
                </button>
              `:`
                <button class="btn-confirm-item px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${S.id}">
                  <span class="material-symbols-outlined text-[15px]">check</span>
                  <span>Confirm</span>
                </button>
              `}

              ${j?"":`
                <button class="btn-reject-item p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" data-id="${S.id}" title="Reject element">
                  <span class="material-symbols-outlined text-[18px]">block</span>
                </button>
              `}
            </div>
          </div>

          <!-- Description / Role -->
          <p class="text-xs text-slate-600 leading-relaxed font-sans">${S.description||S.characterRole||"No description provided."}</p>

          <!-- Category Specific Rich Presentation Row -->
          ${x(S)}

          <!-- Traceability & Evidence Row -->
          <div class="flex flex-col gap-1.5 mt-1 pt-2 border-t border-slate-100">
            ${S.sourceSnippet?`
              <div class="text-[11px] font-mono text-slate-600 bg-slate-50/80 border border-slate-200/60 rounded-xl p-2 leading-relaxed">
                <span class="text-slate-400 font-sans font-bold text-[10px] uppercase tracking-wider block mb-0.5">Screenplay Evidence (Draft 4.2):</span>
                "${S.sourceSnippet}"
              </div>
            `:""}

            <div class="flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-400">
              <div class="flex items-center gap-2">
                ${S.originalAiSuggestion?`
                  <span class="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">AI Extracted</span>
                `:`
                  <span class="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium">Manual Entry</span>
                `}
                ${S.userCorrection?`
                  <span class="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5" title="Modified by user">
                    <span class="material-symbols-outlined text-[12px]">tune</span>
                    <span>Corrected by ${S.userCorrection.correctedBy||"Owner"}</span>
                  </span>
                `:""}
              </div>

              ${S.confirmedBy?`
                <div>Confirmed by <strong class="font-semibold text-slate-600">${S.confirmedBy}</strong></div>
              `:""}
            </div>
          </div>

          <!-- Inline Edit Area if active -->
          ${Ee?r(S):""}
        </div>
      `}).join(""),oe.querySelectorAll(".btn-toggle-edit").forEach(S=>{S.onclick=()=>{const z=S.getAttribute("data-id");c=c===z?null:z,d()}}),oe.querySelectorAll(".btn-cancel-edit").forEach(S=>{S.onclick=()=>{c=null,d()}}),oe.querySelectorAll(".form-edit-inline").forEach(S=>{S.onsubmit=async z=>{z.preventDefault();const J=S.getAttribute("data-id"),j=new FormData(S),Q=(j.get("scenes")||"18").split(",").map(He=>Number(He.trim())).filter(He=>!isNaN(He)),ie=Q.length>0?Q[0]:18,De={name:j.get("name"),category:j.get("category"),status:j.get("status"),description:j.get("description"),scenes:Q,sceneNumber:ie,sceneId:`scene-${ie}`,assignedActor:j.get("assignedActor")||"",castingStatus:j.get("castingStatus")||"Uncast / Open",actorAvailability:j.get("actorAvailability")||"",sourcingType:j.get("sourcingType")||"",quantity:j.get("quantity")||"",readinessStatus:j.get("readinessStatus")||"",continuityNotes:j.get("continuityNotes")||"",requiredResources:j.get("requiredResources")||"",technicalRequirements:j.get("technicalRequirements")||"",safetyNotes:j.get("safetyNotes")||"",safetyPlanningStatus:j.get("safetyPlanningStatus")||"",qualifiedPersonnel:j.get("qualifiedPersonnel")||"",coordinationRequirements:j.get("coordinationRequirements")||"",context:j.get("context")||"",locationStatus:j.get("locationStatus")||"",accessDetails:j.get("accessDetails")||""};await Mt(a,J,De),w(`Saved updates for "${De.name}"`),c=null,d()}}),oe.querySelectorAll(".btn-delete-element").forEach(S=>{S.onclick=async()=>{const z=S.getAttribute("data-id");confirm("Are you sure you want to remove or archive this element from the breakdown?")&&(await An(a,z),w("Element removed from breakdown"),c=null,d())}}),oe.querySelectorAll(".btn-confirm-item").forEach(S=>{S.onclick=async()=>{const z=S.getAttribute("data-id");await Mt(a,z,{status:"Confirmed"}),w("Element confirmed by Owner"),d()}}),oe.querySelectorAll(".btn-review-item").forEach(S=>{S.onclick=async()=>{const z=S.getAttribute("data-id");await Mt(a,z,{status:"Needs Review",isHumanConfirmed:!1}),w("Marked for review"),d()}}),oe.querySelectorAll(".btn-reject-item").forEach(S=>{S.onclick=async()=>{const z=S.getAttribute("data-id");await Mt(a,z,{status:"Rejected"}),w("Element rejected"),d()}})}};await d(),document.querySelectorAll(".cat-btn").forEach(m=>{m.onclick=()=>{document.querySelectorAll(".cat-btn").forEach(A=>{A.classList.remove("bg-blue-600","text-white","shadow-2xs"),A.classList.add("bg-slate-100","text-slate-700")}),m.classList.add("bg-blue-600","text-white","shadow-2xs"),m.classList.remove("bg-slate-100","text-slate-700"),o=m.getAttribute("data-cat"),d()}});const b=document.getElementById("breakdown-scene-select");b&&(b.onchange=m=>{l=m.target.value,d()});const f=document.getElementById("breakdown-search");f&&(f.oninput=m=>{i=m.target.value,d()});const v=document.getElementById("elem-cat"),g=document.getElementById("add-modal-category-fields"),$=()=>{if(!g||!v)return;const m=v.value;m==="Cast"?g.innerHTML=`
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
      `:m==="Props"?g.innerHTML=`
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
      `:m==="Practical FX"?g.innerHTML=`
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
      `:m==="Stunts"?g.innerHTML=`
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
      `:m==="Locations"?g.innerHTML=`
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
      `};v&&(v.onchange=$,$());const M=document.getElementById("modal-add-element"),I=document.getElementById("btn-add-element"),k=document.getElementById("close-add-modal"),T=document.getElementById("btn-cancel-add"),E=document.getElementById("form-add-element"),F=()=>{$(),M?.classList.remove("hidden")},O=()=>M?.classList.add("hidden");I&&(I.onclick=F),k&&(k.onclick=O),T&&(T.onclick=O);const ne=document.getElementById("btn-export-breakdown-pdf");ne&&(ne.onclick=async()=>{try{const m=await Je(a,o,l);Ks(m,{title:"Chronicles of Dust",draft:"Draft 4.2"}),w(`Exported Breakdown Report (${m.length} elements) PDF`)}catch(m){console.error(m),w("Failed to export breakdown PDF")}}),E&&(E.onsubmit=async m=>{m.preventDefault();const A=document.getElementById("elem-name")?.value,h=document.getElementById("elem-cat")?.value,B=document.getElementById("elem-scenes")?.value||"18",K=document.getElementById("elem-status")?.value||"Confirmed",R=document.getElementById("elem-desc")?.value;if(!A)return;const G=B.split(",").map(ae=>Number(ae.trim())).filter(ae=>!isNaN(ae)),te=G.length>0?G[0]:18,H={name:A,category:h,sceneNumber:te,sceneId:`scene-${te}`,scenes:G,description:R,status:K,sourceSnippet:`Manual production element registered for Scene ${G.join(", ")}`,assignedActor:document.getElementById("add-actor")?.value||"",castingStatus:document.getElementById("add-casting-status")?.value||"Uncast / Open",actorAvailability:document.getElementById("add-availability")?.value||"",sourcingType:document.getElementById("add-prop-source")?.value||"",quantity:document.getElementById("add-prop-qty")?.value||"",readinessStatus:document.getElementById("add-prop-readiness")?.value||"",continuityNotes:document.getElementById("add-prop-continuity")?.value||"",requiredResources:document.getElementById("add-fx-res")?.value||"",technicalRequirements:document.getElementById("add-fx-tech")?.value||"",safetyNotes:document.getElementById("add-fx-safety")?.value||"",safetyPlanningStatus:document.getElementById("add-stunt-status")?.value||"",qualifiedPersonnel:document.getElementById("add-stunt-personnel")?.value||"",coordinationRequirements:document.getElementById("add-stunt-coordination")?.value||"",context:document.getElementById("add-loc-context")?.value||"",lighting:document.getElementById("add-loc-lighting")?.value||"",locationStatus:document.getElementById("add-loc-status")?.value||"",notes:document.getElementById("add-dept-notes")?.value||""};await Tn(a,H),w(`Added "${A}" to Scene ${G.join(", ")}`),O(),E.reset(),d()})}function Va(e=null,t=null,s=null){const n=new URLSearchParams(window.location.search||""),a=t||n.get("scriptId")||y.state.selectedScriptId||"chronicles-of-dust",o=s||n.get("csId"),l=n.get("action")==="new",i=n.get("action")==="edit",c=e||n.get("from"),u=i?`/production/call-sheets?scriptId=${a}&csId=${o}`:o||l?`/production/call-sheets?scriptId=${a}`:"/production",p=c||u;return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${Be("Pre-Production",i?"Edit Call Sheet":o?"Call Sheet Inspector":l?"Create New Call Sheet":"Call Sheets Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Dt(i?"Edit Call Sheet":o?"Call Sheet Detail":l?"New Call Sheet":"Call Sheets",i?"edit_note":"assignment",p,!o&&!l&&!i?`
            <a href="/production/call-sheets?scriptId=${a}&action=new" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>New Call Sheet</span>
            </a>
          `:"")}

        <div id="callsheet-view-container" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading call sheet records...</div>
        </div>
      </main>

      ${Te("production")}
    </div>
  `}async function Js(e,t=null,s=null,n=null){const a=new URLSearchParams(window.location.search||""),o=s||a.get("scriptId")||y.state.selectedScriptId||"chronicles-of-dust",l=n||a.get("csId"),i=a.get("action")==="new",c=a.get("action")==="edit",u=document.getElementById("callsheet-view-container");if(!u)return;const x=(localStorage.getItem("scriptora_prod_role")||"Owner")==="Owner";if(c&&l){const r=await gs(o,l);if(!r){u.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>';return}const d=r.status==="Confirmed"||r.isPublished;u.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col gap-4">
        <!-- Edit Masthead & Revision Notice -->
        <div class="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-bold text-base text-slate-900">Edit Call Sheet #${r.callSheetNumber}</h2>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${d?"bg-amber-50 text-amber-800 border border-amber-200":"bg-blue-50 text-blue-700 border border-blue-200"}">
                ${d?"Branch New Revision Draft":"Editing Draft"}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${r.shootDay} · Baseline: Draft 4.2 (Pinned)</p>
          </div>
          <div class="text-[11px] text-slate-400 font-mono">
            Source: Shooting Schedule Day ${r.shootDay.replace(/[^0-9]/g,"").slice(0,2)||"1"}
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
              <input type="text" id="edit-cs-day" value="${r.shootDay}" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600 font-medium">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Shooting Date</label>
              <input type="text" id="edit-cs-date" value="${r.shootDate}" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600 font-medium">
            </div>
          </div>

          <!-- Calls Schedule Grid -->
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-2">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Call Times & Wrap Estimates</span>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label class="font-semibold text-slate-700 block mb-1 text-[11px]">General Crew Call</label>
                <input type="text" id="edit-cs-crewcall" value="${r.generalCrewCall}" required class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-600">
              </div>
              <div>
                <label class="font-semibold text-slate-700 block mb-1 text-[11px]">Shooting Call</label>
                <input type="text" id="edit-cs-shootcall" value="${r.shootingCall}" required class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-600 text-blue-700 font-bold">
              </div>
              <div>
                <label class="font-semibold text-slate-700 block mb-1 text-[11px]">Breakfast Time</label>
                <input type="text" id="edit-cs-breakfast" value="${r.breakfastTime}" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-600">
              </div>
              <div>
                <label class="font-semibold text-slate-700 block mb-1 text-[11px]">Estimated Wrap</label>
                <input type="text" id="edit-cs-wrap" value="${r.estimatedWrap}" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-600">
              </div>
            </div>
          </div>

          <!-- Location & Basecamp -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Set Location & Facility</label>
              <input type="text" id="edit-cs-locname" value="${r.locationName}" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Physical Address / Map GPS</label>
              <input type="text" id="edit-cs-address" value="${r.locationAddress}" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
            </div>
          </div>

          <!-- Parking & Basecamp Notes -->
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Parking & Crew Logistics Instructions</label>
            <textarea id="edit-cs-parking" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600 resize-none">${r.parkingNotes}</textarea>
          </div>

          <!-- Nearest Hospital & Weather -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="font-semibold text-rose-700 block mb-1">Nearest Emergency Hospital</label>
              <input type="text" id="edit-cs-hospital" value="${r.nearestHospital}" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Weather Forecast & Conditions</label>
              <input type="text" id="edit-cs-weather" value="${r.weatherSummary}" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
            </div>
          </div>

          <!-- Special Requirements & Directives -->
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Special Requirements & Department Directives</label>
            <textarea id="edit-cs-instructions" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600 resize-none">${r.specialInstructions||"Standard safety and PPE required."}</textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-between pt-3 border-t border-slate-100">
            <a href="/production/call-sheets?scriptId=${o}&csId=${r.id}" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium">Cancel</a>
            <div class="flex items-center gap-2">
              <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">save</span>
                <span>${d?"Save Revision Draft":"Save Changes"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    `;const b=document.getElementById("form-edit-callsheet");b&&(b.onsubmit=async f=>{f.preventDefault();const v=document.getElementById("edit-cs-day")?.value||r.shootDay,g=document.getElementById("edit-cs-date")?.value||r.shootDate,$=document.getElementById("edit-cs-crewcall")?.value||r.generalCrewCall,M=document.getElementById("edit-cs-shootcall")?.value||r.shootingCall,I=document.getElementById("edit-cs-breakfast")?.value||r.breakfastTime,k=document.getElementById("edit-cs-wrap")?.value||r.estimatedWrap,T=document.getElementById("edit-cs-locname")?.value||r.locationName,E=document.getElementById("edit-cs-address")?.value||r.locationAddress,F=document.getElementById("edit-cs-parking")?.value||r.parkingNotes,O=document.getElementById("edit-cs-hospital")?.value||r.nearestHospital,ne=document.getElementById("edit-cs-weather")?.value||r.weatherSummary,m=document.getElementById("edit-cs-instructions")?.value||r.specialInstructions;await $n(o,r.id,{shootDay:v,shootDate:g,generalCrewCall:$,shootingCall:M,breakfastTime:I,estimatedWrap:k,locationName:T,locationAddress:E,parkingNotes:F,nearestHospital:O,weatherSummary:ne,specialInstructions:m,isDraftRevision:d}),w(d?"Saved as new revision draft":"Call Sheet updated successfully"),e(`/production/call-sheets?scriptId=${o}&csId=${r.id}`)})}else if(i){const r=await Fe(o);u.innerHTML=`
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
              ${r.map(g=>`
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
    `;const d=document.getElementById("tab-linked"),b=document.getElementById("tab-manual"),f=document.getElementById("section-linked-day");d&&b&&(d.onclick=()=>{d.classList.add("bg-white","text-blue-700","shadow-2xs"),b.classList.remove("bg-white","text-blue-700","shadow-2xs"),f?.classList.remove("hidden")},b.onclick=()=>{b.classList.add("bg-white","text-blue-700","shadow-2xs"),d.classList.remove("bg-white","text-blue-700","shadow-2xs"),f?.classList.add("hidden")});const v=document.getElementById("form-create-callsheet");v&&(v.onsubmit=async g=>{g.preventDefault();const $=document.getElementById("new-cs-day")?.value||"3",M=document.getElementById("new-cs-date")?.value,I=document.getElementById("new-cs-crewcall")?.value,k=document.getElementById("new-cs-locname")?.value,T=document.getElementById("new-cs-address")?.value,E=document.getElementById("new-cs-hospital")?.value,F=document.getElementById("new-cs-parking")?.value,O=await Nn(o,{shootDay:`Day ${$} of 14`,shootDate:M,generalCrewCall:I,shootingCall:"06:30 AM",locationName:k,locationAddress:T,nearestHospital:E,parkingNotes:F});w(`Created Call Sheet #${O.callSheetNumber}`),e(`/production/call-sheets?scriptId=${o}&csId=${O.id}`)})}else if(l){const r=await gs(o,l);if(!r){u.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>';return}const d=r.status==="Confirmed"||r.isPublished;u.innerHTML=`
      <!-- Top Action Banner -->
      <div class="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
            #${r.callSheetNumber}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-semibold text-sm text-slate-900">Call Sheet #${r.callSheetNumber}</h2>
              <span class="px-2 py-0.5 rounded-md text-[10px] font-medium border ${d?"bg-slate-50 text-slate-600 border-slate-200":"bg-amber-50 text-amber-700 border-amber-200"}">
                ${d?"Published Snapshot":"Draft — Pending Owner Approval"}
              </span>
            </div>
            <p class="text-[11px] text-slate-500 mt-0.5">${r.shootDay} · ${r.shootDate}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <a href="/production/call-sheets?scriptId=${o}&csId=${r.id}&action=edit" id="btn-edit-callsheet" class="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer" title="Edit Call Sheet fields and create revision">
            <span class="material-symbols-outlined text-[16px]">edit</span>
            <span>Edit</span>
          </a>
          <button id="btn-print-callsheet" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer" title="Export genuine vector Call Sheet PDF">
            <span class="material-symbols-outlined text-[16px]">download</span>
            <span>Export PDF</span>
          </button>
          ${!d&&x?`
            <button id="btn-delete-callsheet" class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer" title="Delete draft call sheet">
              <span class="material-symbols-outlined text-[16px]">delete</span>
              <span>Delete Draft</span>
            </button>
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
            <div class="font-mono text-sm font-bold text-slate-900">${r.shootDay.toUpperCase()}</div>
            <div class="text-xs text-slate-600 font-semibold">${r.shootDate}</div>
          </div>
        </div>

        <!-- Times & Weather Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">General Crew Call</span>
            <div class="font-heading font-bold text-sm text-slate-900">${r.generalCrewCall}</div>
          </div>
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">Shooting Call</span>
            <div class="font-heading font-bold text-sm text-blue-700">${r.shootingCall}</div>
          </div>
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">Breakfast</span>
            <div class="font-heading font-bold text-sm text-slate-900">${r.breakfastTime}</div>
          </div>
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">Estimated Wrap</span>
            <div class="font-heading font-bold text-sm text-slate-900">${r.estimatedWrap}</div>
          </div>
        </div>

        <!-- Location & Hospital Directives -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="p-3.5 rounded-xl border border-slate-200/80 flex flex-col gap-1">
            <span class="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px] text-blue-600">location_on</span>
              <span>Set Location & Parking</span>
            </span>
            <div class="font-semibold text-slate-900 text-xs">${r.locationName}</div>
            <p class="text-slate-600 text-[11px]">${r.locationAddress}</p>
            <p class="text-slate-500 text-[11px] mt-1 italic">${r.parkingNotes}</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col gap-1">
            <span class="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px] text-rose-600">local_hospital</span>
              <span>Nearest Emergency Hospital</span>
            </span>
            <p class="text-slate-800 text-[11px] font-medium leading-relaxed">${r.nearestHospital}</p>
            <div class="text-[10px] text-slate-400 mt-1">Weather: ${r.weatherSummary}</div>
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
            ${(r.scenes||[]).map(g=>`
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <a href="/production/schedule?scriptId=${o}&sceneId=scene-${g.sceneNumber}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${o}&csId=${r.id}`)}" class="w-16 font-mono font-bold text-blue-700 hover:underline" title="Inspect Scene Logistics in Schedule">Sc ${g.sceneNumber}</a>
                <div class="flex-1 min-w-0 pr-2">
                  <div class="font-semibold text-slate-900 truncate">${g.heading}</div>
                  <div class="text-[11px] text-slate-500 truncate">${g.desc}</div>
                </div>
                <span class="w-20 text-center font-mono text-[11px]">${g.pages}</span>
                <span class="w-32 text-right font-medium text-[11px] text-slate-700 truncate">${(g.cast||[]).map($=>`<a href="/production/breakdown?scriptId=${o}&category=Cast&character=${encodeURIComponent($)}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${o}&csId=${r.id}`)}" class="hover:underline font-semibold" title="Inspect ${$} in Breakdown">${$}</a>`).join(", ")}</span>
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
            ${(r.castCalls||[]).map(g=>`
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <a href="/production/breakdown?scriptId=${o}&category=Cast&character=${encodeURIComponent(g.character)}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${o}&csId=${r.id}`)}" class="w-32 font-bold text-slate-900 hover:text-blue-700 hover:underline" title="Inspect ${g.character} in Breakdown">${g.character}</a>
                <span class="flex-1 font-medium text-slate-700">${g.actor}</span>
                <span class="w-20 text-center font-mono text-[11px] text-slate-600">${g.pickup}</span>
                <span class="w-20 text-center font-mono text-[11px] text-slate-600">${g.hmuCall}</span>
                <span class="w-20 text-right font-mono font-bold text-blue-700">${g.onSet}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Special Notes Footer -->
        <div class="p-3 bg-amber-50/50 border border-amber-200/80 rounded-xl">
          <span class="font-bold text-amber-900 uppercase text-[10px]">Safety & Production Directives:</span>
          <p class="text-amber-800 text-[11px] mt-0.5 leading-relaxed">${r.specialInstructions}</p>
        </div>
      </div>
    `;const b=document.getElementById("btn-print-callsheet");b&&(b.onclick=()=>{try{Ts(r,{title:"Chronicles of Dust",company:"Badlands Anthology LLC",draft:"Draft 4.2"}),w(`Exported Call Sheet #${r.callSheetNumber} PDF`)}catch(g){console.error(g),w("Failed to generate Call Sheet PDF")}});const f=document.getElementById("btn-delete-callsheet");f&&(f.onclick=async()=>{if(!confirm(`Are you sure you want to delete draft Call Sheet #${r.callSheetNumber}? This cannot be undone.`))return;const g=await ys(o,r.id);g.success?(w(`Call Sheet #${r.callSheetNumber} deleted`),e(`/production/call-sheets?scriptId=${o}`)):w(g.message||"Failed to delete call sheet")});const v=document.getElementById("btn-publish-callsheet");v&&(v.onclick=async()=>{confirm("Approve and lock this call sheet as an official immutable snapshot?")&&(await Pn(o,r.id),w("Call Sheet published & snapshot locked"),e(`/production/call-sheets?scriptId=${o}&csId=${r.id}`))})}else{const r=await ut(o);u.innerHTML=`
      <div class="flex items-center justify-between">
        <h2 class="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px] text-blue-600">assignment</span>
          <span>Call Sheets Catalogue (${r.length})</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${r.map(d=>{const b=d.status==="Confirmed"||d.isPublished;return`
            <div class="cs-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group" data-id="${d.id}">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      #${d.callSheetNumber}
                    </div>
                    <div class="min-w-0">
                      <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors truncate">${d.shootDay}</h3>
                      <p class="text-[11px] text-slate-500 truncate">${d.shootDate}</p>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-medium shrink-0 ${b?"bg-slate-100 text-slate-700":"bg-amber-50/80 border border-amber-200 text-amber-800"}">
                    ${b?"Published":"Draft"}
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
                <span class="flex items-center gap-1">
                  <span>View Details</span>
                  <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </span>
                <div class="flex items-center gap-2" onclick="event.stopPropagation()">
                  <button class="btn-card-export p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors" data-id="${d.id}" title="Direct Export PDF">
                    <span class="material-symbols-outlined text-[16px]">download</span>
                  </button>
                  ${!b&&x?`
                    <button class="btn-card-delete p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors" data-id="${d.id}" data-num="${d.callSheetNumber}" title="Delete Draft">
                      <span class="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  `:""}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    `,u.querySelectorAll(".cs-card").forEach(d=>{d.onclick=()=>{const b=d.getAttribute("data-id");e(`/production/call-sheets?scriptId=${o}&csId=${b}`)}}),u.querySelectorAll(".btn-card-export").forEach(d=>{d.onclick=b=>{b.stopPropagation();const f=d.getAttribute("data-id"),v=r.find(g=>g.id===f);v&&(Ts(v,{title:"Chronicles of Dust",draft:"Draft 4.2"}),w(`Exported Call Sheet #${v.callSheetNumber} PDF`))}}),u.querySelectorAll(".btn-card-delete").forEach(d=>{d.onclick=async b=>{b.stopPropagation();const f=d.getAttribute("data-id"),v=d.getAttribute("data-num");if(!confirm(`Delete draft Call Sheet #${v}?`))return;const g=await ys(o,f);g.success?(w(`Call Sheet #${v} deleted`),Js(e,t,s)):w(g.message||"Failed to delete")}})}}function Wa(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||y.state.selectedScriptId;const n=s.get("mode")||"dialogue",a=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${Be("Pre-Production","Dialogue Sheets & Actor Sides")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Dt("Dialogue Sheets & Actor Sides","record_voice_over",a||"/production",`
          <button id="btn-export-pdf" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">print</span>
            <span>Export PDF</span>
          </button>
        `)}

        <!-- Mode Switcher Tabs (2 distinct modes) -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="flex items-center bg-slate-100 p-1 rounded-xl max-w-xs">
            <button id="tab-mode-dialogue" class="flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${n==="dialogue"?"bg-white text-blue-600 shadow-2xs":"text-slate-600 hover:text-slate-900"}">
              Dialogue Sheets
            </button>
            <button id="tab-mode-sides" class="flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${n==="sides"?"bg-white text-blue-600 shadow-2xs":"text-slate-600 hover:text-slate-900"}">
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

      ${Te("production")}
    </div>
  `}async function Ga(e,t=null,s=null){const n=new URLSearchParams(window.location.search||"");s||n.get("scriptId")||y.state.selectedScriptId;let a=n.get("mode")||"dialogue",o="KEVIN",l=n.get("scene")||"18";const i=document.getElementById("tab-mode-dialogue"),c=document.getElementById("tab-mode-sides"),u=document.getElementById("filter-controls"),p=document.getElementById("dialogue-sides-content"),x=[{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"KEVIN",parenthetical:"(adjusting filter)",dialogue:"Wind gauge is spiking past forty knots, Marcus. Did you check the terminal pressure at the intake valve?",action:"Kevin wipes gritty red dust from the gauge glass with his thumb."},{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"MARCUS",parenthetical:"(shrugging)",dialogue:"Telemetry's been on the fritz since dawn. Central syndicate says it's thermal fluctuation.",action:"Marcus gestures with a cigarette toward the desert horizon."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"MEERA",parenthetical:"(eyes on monitor)",dialogue:"That's no fluctuation. Look at line three. Someone bypassed the telemetry loop eighty miles upriver.",action:"Meera brings up a wireframe map showing a hidden subterranean siphon branch."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"KEVIN",parenthetical:"(tense)",dialogue:"They're siphoning straight out of the municipal reservoir into private holding tanks.",action:"Kevin taps the terminal screen, freezing the anomaly coordinates."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"COMMANDER VANCE",parenthetical:"(smooth, unhurried)",dialogue:"Water belongs to those who possess the energy to lift it from the rock, Kevin. The frontier was built on that premise.",action:"Vance sips cold tea, watching the massive hydraulic pump pistons rise and plunge."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"KEVIN",parenthetical:"(stepping forward)",dialogue:"You signed the 2041 Treaty. If the southern aquifer collapses, ten thousand families wake up to dry taps.",action:"Kevin places the legal registry deed onto Vance's polished mahogany desk."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(shouting over the roar)",dialogue:"Hold the pylon, Meera! If the high-pressure valve seals now, the back-surge will fracture the entire chamber!",action:"Brine water sprays across Kevin's visor as he locks the hydraulic bypass manifold."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"MEERA",parenthetical:"(straining on cable)",dialogue:"Then don't let them break! Reroute the secondary relay through the floodgate breaker!",action:"Meera kicks off the iron catwalk, swinging across the chasm to secure the emergency lock."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(levering the valve bar)",dialogue:"Bypass locked! Bleed the line! Three... two... one!",action:"The pressure needles drop from red to blue as the municipal pipeline fills with fresh current."}];function r(){if(u)if(a==="dialogue"){u.innerHTML=`
        <span class="text-xs font-semibold text-slate-500">Character:</span>
        <select id="char-select" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-900 focus:outline-none cursor-pointer">
          <option value="KEVIN" ${o==="KEVIN"?"selected":""}>KEVIN (Lead)</option>
          <option value="MEERA" ${o==="MEERA"?"selected":""}>MEERA (Lead)</option>
          <option value="COMMANDER VANCE" ${o==="COMMANDER VANCE"?"selected":""}>COMMANDER VANCE</option>
          <option value="MARCUS" ${o==="MARCUS"?"selected":""}>MARCUS</option>
        </select>
      `;const f=document.getElementById("char-select");f&&(f.onchange=v=>{o=v.target.value,d()})}else{u.innerHTML=`
        <span class="text-xs font-semibold text-slate-500">Scene Extract:</span>
        <select id="scene-select" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-900 focus:outline-none cursor-pointer">
          <option value="1" ${l==="1"?"selected":""}>Scene 1 — Outpost Gate 4</option>
          <option value="2" ${l==="2"?"selected":""}>Scene 2 — Customs Shed</option>
          <option value="7" ${l==="7"?"selected":""}>Scene 7 — Syndicate Control</option>
          <option value="18" ${l==="18"?"selected":""}>Scene 18 — Chamber B Climax</option>
        </select>
      `;const f=document.getElementById("scene-select");f&&(f.onchange=v=>{l=v.target.value,d()})}}function d(){if(p)if(a==="dialogue"){const f=x.filter(v=>v.character===o);p.innerHTML=`
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
          ${f.map((v,g)=>`
            <div class="space-y-1">
              <div class="font-sans font-bold text-[11px] text-blue-700 uppercase tracking-wider">
                SCENE ${v.sceneNum} — ${v.heading}
              </div>
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest pt-2">
                ${v.character}
              </div>
              ${v.parenthetical?`
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${v.parenthetical}
                </div>
              `:""}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto text-left">
                ${v.dialogue}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="border-t border-slate-200 pt-3 mt-6 text-center font-sans text-[10px] text-slate-400">
          Generated from Draft 4.2 pinned baseline. Exact dialogue punctuation and wording preserved.
        </div>
      `}else{const f=x.filter(g=>String(g.sceneNum)===String(l)),v=f[0]||{heading:`SCENE ${l}`};p.innerHTML=`
        <!-- Sides Masthead -->
        <div class="border-b-2 border-slate-900 pb-3 font-sans flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">SCRIPTORA · PRODUCTION SIDES</div>
            <h2 class="font-heading font-extrabold text-lg text-slate-900">ACTOR SIDES — SCENE ${l}</h2>
            <div class="text-[11px] text-slate-600 font-medium">${v.heading} · Draft 4.2</div>
          </div>
          <div class="text-left sm:text-right text-[11px] text-slate-500">
            <div>Rehearsal & On-Set Copy</div>
            <div>Generated: Today</div>
          </div>
        </div>

        <!-- Formatted Script Scene Beat -->
        <div class="space-y-4 pt-2 max-w-2xl mx-auto leading-relaxed">
          <div class="font-bold text-[13px] text-slate-900 uppercase">
            ${v.heading}
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
      `}}i&&c&&(i.onclick=()=>{a="dialogue",i.classList.add("bg-white","text-blue-600","shadow-2xs"),c.classList.remove("bg-white","text-blue-600","shadow-2xs"),r(),d()},c.onclick=()=>{a="sides",c.classList.add("bg-white","text-blue-600","shadow-2xs"),i.classList.remove("bg-white","text-blue-600","shadow-2xs"),r(),d()});const b=document.getElementById("btn-export-pdf");b&&(b.onclick=()=>{try{if(a==="dialogue"){const f=x.filter(v=>v.character===o);ja(o,f,{title:"Chronicles of Dust",draft:"Draft 4.2"}),w(`Exported ${o} Dialogue Sheet PDF`)}else{const f=Number(l),v=x.filter($=>$.sceneNum===f),g=v[0]||{heading:`SCENE ${f}`};Fa(l,v,{heading:g.heading,pages:"2 1/8"},{title:"Chronicles of Dust",draft:"Draft 4.2"}),w(`Exported Scene ${l} Actor Sides PDF`)}}catch(f){console.error(f),w("Failed to generate PDF document")}}),r(),d()}const Ka={Cast:"person",Locations:"location_on",Props:"inventory_2","Practical FX":"science",Stunts:"sports_kabaddi",Costumes:"checkroom",Vehicles:"commute",Sound:"music_note","Hair & Makeup":"face",Equipment:"videocam","Special Equipment":"videocam"};function Ja(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||y.state.selectedScriptId;const n=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${Be("Pre-Production","Master Shooting Schedule")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-4 fade-in">
        <!-- SubNav with Title, Project Context & Primary Actions -->
        ${Dt("Shooting Schedule","calendar_month",n||"/production",`
          <div class="flex items-center gap-2">
            <button id="btn-export-schedule-pdf" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Export genuine Master Shooting Schedule PDF">
              <span class="material-symbols-outlined text-[16px]">download</span>
              <span class="hidden sm:inline">Export PDF</span>
            </button>
            <button id="btn-add-shoot-day" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Add a new shoot day to schedule">
              <span class="material-symbols-outlined text-[16px]">add_circle</span>
              <span>Add Date</span>
            </button>
          </div>
        `)}

        <!-- Top Context Header Bar: Project & Pinned Screenplay -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-xs flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-lg">calendar_month</span>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-heading font-semibold text-sm text-slate-900 truncate">Chronicles of Dust</span>
                <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  Draft 4.2 (Pinned)
                </span>
              </div>
              <p class="text-[11px] text-slate-500 truncate mt-0.5">Master shooting calendar • 7 Shoot Days • October 24 – October 30, 2026</p>
            </div>
          </div>
          <div class="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>100% Scenes Scheduled</span>
          </div>
        </div>

        <!-- Schedule Metrics Summary Bar -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs">
          <div class="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div class="p-2 sm:px-3 first:pl-1">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Shoot Window</span>
              <div class="font-heading font-bold text-base sm:text-lg text-slate-900 mt-0.5">7 Days</div>
              <span class="text-[11px] text-slate-400">Oct 24 – Oct 30</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Scenes Scheduled</span>
              <div class="font-heading font-bold text-base sm:text-lg text-slate-900 mt-0.5">10 of 10 Scenes</div>
              <span class="text-[11px] text-emerald-600 font-medium">100% Allocated</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Script Pages</span>
              <div class="font-heading font-bold text-base sm:text-lg text-slate-900 mt-0.5">52.0 Pages</div>
              <span class="text-[11px] text-slate-400">Avg 7.4 pgs / day</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Primary Locations</span>
              <div class="font-heading font-bold text-base sm:text-lg text-slate-900 mt-0.5">3 Areas</div>
              <span class="text-[11px] text-slate-400">Mojave & Spillway</span>
            </div>
          </div>
        </div>

        <!-- Master Calendar Container -->
        <div id="schedule-calendar-container" class="flex flex-col gap-3 min-h-[300px]">
          <div class="p-12 text-center text-slate-400 text-xs">Loading shooting calendar...</div>
        </div>

        <!-- Day Details Modal (Opens when user clicks any calendar day) -->
        <div id="day-detail-modal" class="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
          <div class="bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-xl w-full p-4 sm:p-5 flex flex-col gap-4 max-h-[90vh] overflow-hidden">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5 min-w-0">
                <div id="modal-day-badge" class="w-8 h-8 rounded-lg bg-slate-900 text-white font-heading font-bold text-xs flex items-center justify-center">D1</div>
                <div class="min-w-0">
                  <h3 id="modal-day-title" class="font-heading font-bold text-sm text-slate-900 truncate">Day 1 Details</h3>
                  <p id="modal-day-sub" class="text-[11px] text-slate-500">Date • Location • Call time</p>
                </div>
              </div>
              <button id="modal-day-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
                <span class="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <!-- Modal Content (Scene reordering & day constraints) -->
            <div id="modal-day-content" class="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 text-xs">
              <!-- Injected dynamically -->
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-slate-100">
              <div class="flex items-center gap-2">
                <button id="modal-day-lock-toggle" class="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs flex items-center gap-1.5 cursor-pointer">
                  <span class="material-symbols-outlined text-[15px]">lock</span>
                  <span id="modal-day-lock-label">Lock Day</span>
                </button>
                <button id="modal-day-delete" class="px-2.5 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 font-medium text-xs flex items-center gap-1 cursor-pointer" title="Delete this shoot day">
                  <span class="material-symbols-outlined text-[15px]">delete</span>
                  <span>Delete Day</span>
                </button>
              </div>
              <button id="modal-day-done" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer">
                Done
              </button>
            </div>
          </div>
        </div>

        <!-- Add Shoot Date Modal -->
        <div id="modal-add-day" class="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
          <div class="bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-md w-full p-4 sm:p-5 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <span class="material-symbols-outlined text-lg">calendar_add_on</span>
                </div>
                <div>
                  <h3 class="font-heading font-bold text-sm text-slate-900">Add Shoot Date</h3>
                  <p class="text-[11px] text-slate-500">Append a new shooting day to the calendar</p>
                </div>
              </div>
              <button id="modal-add-day-close" type="button" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
                <span class="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form id="form-add-shoot-day" class="flex flex-col gap-3">
              <div class="grid grid-cols-2 gap-2.5">
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-semibold text-slate-600">Day Number</label>
                  <input type="number" id="input-add-day-num" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 font-mono bg-slate-50 focus:outline-none focus:border-blue-600" required>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-semibold text-slate-600">Calendar Date</label>
                  <input type="text" id="input-add-day-date" placeholder="e.g. Oct 31, 2026" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" required>
                </div>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-600">Shoot Day Title / Focus</label>
                <input type="text" id="input-add-day-title" placeholder="e.g. Day 8 — Second Unit & Pickups" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" required>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-600">Location / Stage</label>
                <input type="text" id="input-add-day-location" placeholder="e.g. Mojave Desert Facility — Sector 4" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" required>
              </div>

              <div class="grid grid-cols-2 gap-2.5">
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-semibold text-slate-600">Est. Hours</label>
                  <input type="number" id="input-add-day-hours" value="10" min="1" max="24" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600">
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-semibold text-slate-600">Est. Pages</label>
                  <input type="text" id="input-add-day-pages" value="0.0" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600">
                </div>
              </div>

              <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button type="button" id="modal-add-day-cancel" class="flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer">Cancel</button>
                <button type="submit" class="flex-1 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer">Add Shoot Date</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Integrated Scene Detail Modal / Panel -->
        <div id="scene-detail-modal" class="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
          <div class="bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-2xl w-full p-4 sm:p-6 flex flex-col gap-4 max-h-[92vh] overflow-hidden">
            <!-- Header -->
            <div class="flex items-start justify-between border-b border-slate-100 pb-3 gap-3">
              <div class="flex items-start gap-3 min-w-0">
                <div id="scene-detail-num" class="w-10 h-10 rounded-xl bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">#--</div>
                <div class="min-w-0">
                  <h3 id="scene-detail-heading" class="font-heading font-bold text-sm sm:text-base text-slate-900 leading-tight">Scene Heading</h3>
                  <p id="scene-detail-meta" class="text-[11px] text-slate-500 mt-0.5">Chronicles of Dust • Draft 4.2 (Pinned) • -- Pages</p>
                </div>
              </div>
              <button id="scene-detail-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer" title="Close scene details">
                <span class="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <!-- Scrollable Body -->
            <div id="scene-detail-body" class="flex-1 overflow-y-auto flex flex-col gap-4 pr-1 text-xs text-slate-700">
              <!-- Injected dynamically by openSceneDetail() -->
            </div>

            <!-- Footer with Actions -->
            <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-2 flex-wrap">
              <div class="flex items-center gap-2 flex-wrap">
                <button id="btn-scene-export-pdf" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Export Scene Logistics PDF">
                  <span class="material-symbols-outlined text-[15px]">download</span>
                  <span>Export Scene PDF</span>
                </button>
                <button id="btn-scene-open-breakdown" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Open scene in Script Breakdown">
                  <span class="material-symbols-outlined text-[15px]">dataset</span>
                  <span>Breakdown</span>
                </button>
                <button id="btn-scene-open-sides" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Open Actor Sides for this scene">
                  <span class="material-symbols-outlined text-[15px]">description</span>
                  <span>Actor Sides</span>
                </button>
              </div>
              <button id="btn-scene-close" class="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>

      </main>

      ${Te("production")}
    </div>
  `}async function Ya(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),a=s||n.get("scriptId")||y.state.selectedScriptId||"chronicles-of-dust",o=document.getElementById("schedule-calendar-container"),l=document.getElementById("day-detail-modal"),i=document.getElementById("scene-detail-modal");if(!o)return;let c=await Fe(a),u=await os(a);function p(){o.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-3">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-blue-600 text-lg">calendar_month</span>
            <h3 class="font-heading font-semibold text-sm text-slate-900">Shooting Calendar Matrix</h3>
          </div>
          <span class="text-xs text-slate-500 font-medium">October 24 – October 30, 2026</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-1">
          ${c.map(A=>{const h=(A.sceneNumbers||[]).map(B=>u.find(K=>K.sceneNumber===B)).filter(Boolean);return`
              <div class="calendar-day-card rounded-xl border border-slate-200/90 p-3 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between gap-2.5 bg-slate-50/40" data-day="${A.dayNumber}">
                <div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      <span class="font-heading font-bold text-xs text-slate-900">Day ${A.dayNumber}</span>
                      ${A.isLocked?'<span class="material-symbols-outlined text-slate-400 text-[13px]" title="Day locked">lock</span>':""}
                    </div>
                    <span class="text-[11px] font-mono text-slate-500 font-medium">${A.date.split(",")[0]}</span>
                  </div>
                  <div class="text-[11px] text-slate-700 font-medium mt-1 truncate">${A.location}</div>
                  <div class="text-[10px] text-slate-400 mt-0.5">${A.totalPages} pgs • ${A.estHours} hrs</div>
                </div>

                <div class="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <div class="flex items-center gap-1 overflow-hidden">
                    ${h.slice(0,3).map(B=>`
                      <button class="btn-badge-scene px-1.5 py-0.5 rounded bg-white hover:bg-blue-50 hover:border-blue-300 border border-slate-200 font-mono text-[9px] font-bold text-slate-700 transition-colors cursor-pointer" data-scene-id="${B.id}" title="View Scene ${B.sceneNumber} details">#${B.sceneNumber}</button>
                    `).join("")}
                    ${h.length>3?`<span class="text-[10px] text-slate-400">+${h.length-3}</span>`:""}
                  </div>
                  <span class="text-blue-600 font-semibold text-[10px] flex items-center gap-0.5">
                    Open &rarr;
                  </span>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,o.querySelectorAll(".calendar-day-card").forEach(A=>{A.onclick=()=>{const h=A.getAttribute("data-day");h&&x(h)}}),o.querySelectorAll(".btn-badge-scene").forEach(A=>{A.onclick=h=>{h.stopPropagation();const B=A.getAttribute("data-scene-id");B&&f(B)}})}function x(A){const h=c.find(oe=>oe.dayNumber===Number(A));if(!h)return;const B=document.getElementById("modal-day-badge"),K=document.getElementById("modal-day-title"),R=document.getElementById("modal-day-sub"),G=document.getElementById("modal-day-content"),te=document.getElementById("modal-day-lock-toggle"),H=document.getElementById("modal-day-lock-label");B&&(B.textContent=`D${h.dayNumber}`),K&&(K.textContent=`Day ${h.dayNumber} — ${h.title}`),R&&(R.textContent=`${h.date} • ${h.location} • Call: 07:00 AM • ${h.totalPages} pgs`),H&&(H.textContent=h.isLocked?"Unlock Day":"Lock Day"),te&&(te.onclick=async()=>{h.isLocked=!h.isLocked,await Bt(a,h.dayNumber,{isLocked:h.isLocked}),w(`Day ${h.dayNumber} ${h.isLocked?"locked":"unlocked"}`),H&&(H.textContent=h.isLocked?"Unlock Day":"Lock Day"),p()});const ae=(h.sceneNumbers||[]).map(oe=>u.find(S=>S.sceneNumber===oe)).filter(Boolean);if(G){G.innerHTML=`
        <div class="flex items-center justify-between pb-1">
          <span class="font-semibold text-slate-700 text-xs">Scenes in Shooting Order (${ae.length})</span>
          <span class="text-[11px] text-slate-400">Use arrows to adjust shooting order</span>
        </div>
        <div class="flex flex-col gap-2">
          ${ae.length>0?ae.map((S,z)=>`
            <div class="rounded-xl border border-slate-200 p-2.5 bg-slate-50 flex items-center justify-between gap-2">
              <div class="flex items-center gap-2.5 min-w-0">
                <span class="w-6 h-6 rounded bg-white border border-slate-200 font-mono font-bold text-xs flex items-center justify-center text-slate-800 shrink-0">#${S.sceneNumber}</span>
                <div class="min-w-0">
                  <div class="font-medium text-slate-800 text-xs truncate">${S.heading}</div>
                  <div class="text-[10px] text-slate-500 font-mono">${S.intExt} · ${S.dayNight} · ${S.pages} pgs</div>
                </div>
              </div>

              <div class="flex items-center gap-1.5 shrink-0">
                <button class="btn-modal-up p-1 rounded hover:bg-slate-200 text-slate-500 disabled:opacity-30 disabled:pointer-events-none cursor-pointer" data-scene="${S.sceneNumber}" ${z===0?"disabled":""} title="Move earlier in shooting order">
                  <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
                </button>
                <button class="btn-modal-down p-1 rounded hover:bg-slate-200 text-slate-500 disabled:opacity-30 disabled:pointer-events-none cursor-pointer" data-scene="${S.sceneNumber}" ${z===ae.length-1?"disabled":""} title="Move later in shooting order">
                  <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
                </button>
                <button class="btn-modal-move-out px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[10px] font-semibold text-slate-700 cursor-pointer" data-scene="${S.sceneNumber}" title="Move scene to another day">
                  Move Day
                </button>
                <button class="btn-inspect-scene px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-semibold text-[10px] ml-1 cursor-pointer" data-scene-id="${S.id}" title="View integrated scene production details">
                  Details
                </button>
              </div>
            </div>
          `).join(""):`
            <div class="text-center py-4 text-slate-400 text-xs italic">No scenes assigned to this day.</div>
          `}
        </div>

        <div class="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 flex flex-col gap-1">
          <div class="font-semibold text-slate-800">Production Constraints</div>
          <div>• Location: ${h.location}</div>
          <div>• Estimated Daily Hours: ${h.estHours} hrs (including meal break)</div>
          <div>• Turnaround: Standard 12-hour crew rest requirement active</div>
        </div>
      `,G.querySelectorAll(".btn-inspect-scene").forEach(S=>{S.onclick=()=>{const z=S.getAttribute("data-scene-id");z&&f(z)}}),G.querySelectorAll(".btn-modal-up").forEach(S=>{S.onclick=async()=>{const z=Number(S.getAttribute("data-scene")),J=h.sceneNumbers.indexOf(z);if(J>0){const j=[...h.sceneNumbers],Ee=j[J];j[J]=j[J-1],j[J-1]=Ee,h.sceneNumbers=j,await vs(a,h.dayNumber,j),w("Scene shooting order updated"),x(h.dayNumber),p()}}}),G.querySelectorAll(".btn-modal-down").forEach(S=>{S.onclick=async()=>{const z=Number(S.getAttribute("data-scene")),J=h.sceneNumbers.indexOf(z);if(J<h.sceneNumbers.length-1){const j=[...h.sceneNumbers],Ee=j[J];j[J]=j[J+1],j[J+1]=Ee,h.sceneNumbers=j,await vs(a,h.dayNumber,j),w("Scene shooting order updated"),x(h.dayNumber),p()}}}),G.querySelectorAll(".btn-modal-move-out").forEach(S=>{S.onclick=async()=>{const z=S.getAttribute("data-scene"),J=prompt(`Enter target shoot day number (1 - ${c.length}) to move Scene ${z} to:`);if(!J||J===String(h.dayNumber))return;const j=Number(J);j>=1&&j<=c.length?(await hs(a,z,h.dayNumber,j),c=await Fe(a),w(`Scene ${z} moved to Day ${j}`),x(h.dayNumber),p()):alert(`Please enter a valid day number between 1 and ${c.length}.`)}});const oe=document.getElementById("modal-day-delete");oe&&(oe.onclick=async()=>{if(!confirm(`Are you sure you want to remove Shoot Day ${h.dayNumber}? Any scenes should be moved first.`))return;const S=await Dn(a,h.dayNumber);S.success?(w(`Shoot Day ${h.dayNumber} deleted`),b(),c=await Fe(a),p()):w(S.message||"Failed to delete day")})}l?.classList.remove("hidden")}const r=document.getElementById("modal-day-close"),d=document.getElementById("modal-day-done"),b=()=>l?.classList.add("hidden");r&&(r.onclick=b),d&&(d.onclick=b),l&&(l.onclick=A=>{A.target===l&&b()});async function f(A){let h=u.find(J=>J.id===A||String(J.sceneNumber)===String(A)||`scene-${J.sceneNumber}`===String(A));if(h||(h=await kn(a,A)),!h){w("Scene not found in current schedule");return}const K=(await Je(a)).filter(J=>J.sceneId===h.id||J.sceneNumber===h.sceneNumber||Array.isArray(J.scenes)&&J.scenes.includes(h.sceneNumber));h.elements=K;const R=c.find(J=>(J.sceneNumbers||[]).includes(h.sceneNumber)),G=document.getElementById("scene-detail-num"),te=document.getElementById("scene-detail-heading"),H=document.getElementById("scene-detail-meta");G&&(G.textContent=`#${h.sceneNumber}`),te&&(te.textContent=h.heading),H&&(H.textContent=`Chronicles of Dust • Draft 4.2 (Pinned) • ${h.pages||"1 0/8"} Pages • ${R?`Shoot Day ${R.dayNumber}`:"Unscheduled"}`);const ae=document.getElementById("scene-detail-body");if(ae){const J={};K.forEach(Q=>{const ie=Q.category||"Other";J[ie]||(J[ie]=[]),J[ie].push(Q)}),ae.innerHTML=`
        <!-- Alignment & Status Chips -->
        <div class="flex items-center gap-2 flex-wrap">
          <span class="px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">${h.intExt}</span>
          <span class="px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">${h.dayNight}</span>
          <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            ${R?`Day ${R.dayNumber}: ${R.location}`:"Unscheduled"}
          </span>
          <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold ${h.complexity==="Complex"?"bg-amber-50 text-amber-700 border border-amber-200":"bg-slate-50 text-slate-600 border border-slate-200"}">
            Complexity: ${h.complexity||"Standard"}
          </span>
          <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            ${h.status||"Scheduled"}
          </span>
        </div>

        <!-- Warning Banner if Needs Review / Source Changed -->
        ${h.status==="Needs Review"?`
          <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">warning</span>
            <div>
              <div class="font-semibold text-xs">Source Screenplay Revision Notice</div>
              <div class="text-[11px] text-amber-800 mt-0.5">Dialogue and stage directions in Draft 4.2 were adjusted for Scene ${h.sceneNumber}. Confirm associated breakdown items match the revision.</div>
            </div>
          </div>
        `:""}

        <!-- Source Screenplay Scene Description -->
        <div class="rounded-xl border border-slate-200 p-3 bg-slate-50 flex flex-col gap-1.5">
          <div class="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
            <span>SOURCE SCENE SNIPPET</span>
            <span class="text-blue-600 font-normal">Draft 4.2 Baseline</span>
          </div>
          <p class="font-mono text-xs text-slate-800 leading-relaxed">${h.snippet||"Scene description synchronized from screenplay source."}</p>
        </div>

        <!-- Cast Members in Scene -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-slate-800 text-xs">Cast & Characters (${(h.cast||[]).length})</span>
            <span class="text-[11px] text-slate-400">Confirmed cast assignments</span>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            ${h.cast&&h.cast.length>0?h.cast.map(Q=>`
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div class="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center font-heading">${Q.charAt(0)}</div>
                <span class="font-semibold text-slate-800 text-xs">${Q}</span>
              </div>
            `).join(""):`
              <span class="text-slate-400 text-xs italic">No cast assigned to this scene.</span>
            `}
          </div>
        </div>

        <!-- Confirmed Production Elements (Breakdown Integration) -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-slate-800 text-xs">Confirmed Breakdown Elements (${K.length})</span>
            <span class="text-[11px] text-slate-400">Props, Costumes, FX & Stunts</span>
          </div>
          ${K.length>0?`
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${Object.entries(J).map(([Q,ie])=>`
                <div class="p-2.5 rounded-xl border border-slate-200 bg-white flex flex-col gap-1.5">
                  <div class="flex items-center gap-1.5 text-slate-700 font-semibold text-[11px]">
                    <span class="material-symbols-outlined text-[15px] text-blue-600">${Ka[Q]||"label"}</span>
                    <span>${Q}</span>
                    <span class="text-[10px] text-slate-400 font-normal">(${ie.length})</span>
                  </div>
                  <div class="flex flex-col gap-1">
                    ${ie.map(De=>`
                      <div class="flex items-center justify-between text-xs py-0.5 border-b border-slate-100 last:border-b-0">
                        <span class="font-medium text-slate-800 truncate">${De.name}</span>
                        <span class="text-[10px] text-slate-400 shrink-0 ml-2">${De.quantity||De.status||""}</span>
                      </div>
                    `).join("")}
                  </div>
                </div>
              `).join("")}
            </div>
          `:`
            <div class="p-3 rounded-xl border border-dashed border-slate-200 text-center text-slate-400 text-xs">
              No elements tagged for Scene ${h.sceneNumber}. Open Script Breakdown to tag elements.
            </div>
          `}
        </div>

        <!-- Day Assignment Selector -->
        <div class="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <div>
            <div class="font-semibold text-slate-800 text-xs">Assigned Shoot Day</div>
            <div class="text-[11px] text-slate-500">Move scene to another day in the shooting schedule</div>
          </div>
          <div class="flex items-center gap-2">
            <select id="select-scene-shoot-day" class="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none cursor-pointer">
              ${c.map(Q=>`
                <option value="${Q.dayNumber}" ${R&&R.dayNumber===Q.dayNumber?"selected":""}>
                  Day ${Q.dayNumber} — ${Q.date.split(",")[0]} (${Q.location})
                </option>
              `).join("")}
            </select>
            <button id="btn-update-scene-day" class="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer">
              Move
            </button>
          </div>
        </div>

        <!-- Editable Production Notes & Continuity Notes -->
        <div class="flex flex-col gap-2.5 pt-1">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-slate-800 text-xs">Production & Continuity Notes</span>
            <span class="text-[11px] text-slate-400">Editable logistics and camera notes</span>
          </div>
          <div class="flex flex-col gap-2">
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-1">Director's Production Notes</label>
              <textarea id="edit-scene-director-notes" rows="2" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Log camera setup, lighting notes, director preferences...">${h.directorNotes||""}</textarea>
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-1">Continuity Notes</label>
              <textarea id="edit-scene-continuity-notes" rows="2" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Log hair, costume, prop condition, timeline markers...">${h.continuityNotes||""}</textarea>
            </div>
            <div class="flex justify-end">
              <button id="btn-save-scene-notes" class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-colors cursor-pointer">
                Save Scene Notes
              </button>
            </div>
          </div>
        </div>
      `;const j=document.getElementById("btn-save-scene-notes");j&&(j.onclick=async()=>{const Q=document.getElementById("edit-scene-director-notes")?.value||"",ie=document.getElementById("edit-scene-continuity-notes")?.value||"";h.directorNotes=Q,h.continuityNotes=ie,await Cn(a,h.id,{directorNotes:Q,continuityNotes:ie}),w(`Scene ${h.sceneNumber} notes saved successfully`)});const Ee=document.getElementById("btn-update-scene-day");Ee&&(Ee.onclick=async()=>{const Q=Number(document.getElementById("select-scene-shoot-day")?.value);if(R&&R.dayNumber===Q){w(`Scene ${h.sceneNumber} is already on Day ${Q}`);return}if(R)await hs(a,h.sceneNumber,R.dayNumber,Q);else{const ie=c.find(De=>De.dayNumber===Q);ie&&(ie.sceneNumbers=[...ie.sceneNumbers||[],h.sceneNumber],await Bt(a,Q,{sceneNumbers:ie.sceneNumbers}))}c=await Fe(a),w(`Scene ${h.sceneNumber} moved to Shoot Day ${Q}`),p(),f(h.id)})}const oe=document.getElementById("btn-scene-export-pdf");oe&&(oe.onclick=()=>{try{Ks(h.elements||[],{title:`Chronicles of Dust — Scene ${h.sceneNumber}`,draft:"Draft 4.2"}),w(`Exported Scene ${h.sceneNumber} Logistics PDF`)}catch(J){console.error(J),w("Failed to export scene PDF")}});const S=document.getElementById("btn-scene-open-breakdown");S&&(S.onclick=()=>{e(`/production/breakdown?scriptId=${a}&scene=${h.sceneNumber}`)});const z=document.getElementById("btn-scene-open-sides");z&&(z.onclick=()=>{e(`/production/dialogue-sides?scriptId=${a}&scene=${h.sceneNumber}`)}),i?.classList.remove("hidden")}function v(){i?.classList.add("hidden")}const g=document.getElementById("scene-detail-close"),$=document.getElementById("btn-scene-close");g&&(g.onclick=v),$&&($.onclick=v),i&&(i.onclick=A=>{A.target===i&&v()});const M=document.getElementById("btn-export-schedule-pdf");M&&(M.onclick=()=>{try{_a(c,u,{title:"Chronicles of Dust",draft:"Draft 4.2"}),w("Exported Master Shooting Schedule PDF")}catch(A){console.error(A),w("Failed to export schedule PDF")}});const I=document.getElementById("modal-add-day"),k=document.getElementById("btn-add-shoot-day"),T=document.getElementById("modal-add-day-close"),E=document.getElementById("modal-add-day-cancel"),F=document.getElementById("form-add-shoot-day");function O(){if(!I)return;const A=c.length>0?Math.max(...c.map(H=>H.dayNumber))+1:1,h=document.getElementById("input-add-day-num"),B=document.getElementById("input-add-day-date"),K=document.getElementById("input-add-day-title"),R=document.getElementById("input-add-day-location"),G=document.getElementById("input-add-day-hours"),te=document.getElementById("input-add-day-pages");if(h&&(h.value=A),B){const H=new Date(2026,9,23+A),ae=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];B.value=`${ae[H.getMonth()]} ${H.getDate()}, ${H.getFullYear()}`}K&&(K.value=`Day ${A} — Second Unit & Pickups`),R&&(R.value="Mojave Soundstage 2"),G&&(G.value="10"),te&&(te.value="0.0"),I.classList.remove("hidden")}function ne(){I?.classList.add("hidden")}k&&(k.onclick=O),T&&(T.onclick=ne),E&&(E.onclick=ne),I&&(I.onclick=A=>{A.target===I&&ne()}),F&&(F.onsubmit=async A=>{A.preventDefault();const h=Number(document.getElementById("input-add-day-num")?.value)||c.length+1,B=document.getElementById("input-add-day-date")?.value||`Shoot Day ${h}`,K=document.getElementById("input-add-day-title")?.value||`Day ${h}`,R=document.getElementById("input-add-day-location")?.value||"Location TBD",G=Number(document.getElementById("input-add-day-hours")?.value)||10,te=document.getElementById("input-add-day-pages")?.value||"0.0";await Bn(a,{dayNumber:h,title:K,date:B,location:R,estHours:G,totalPages:te,sceneNumbers:[]}),c=await Fe(a),ne(),w(`Added Shoot Day ${h} (${B})`),p()}),p();const m=n.get("sceneId")||n.get("scene");m&&f(m)}function Xa(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=t||s.get("scriptId")||y.state.selectedScriptId||"chronicles-of-dust",a=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${Be("Pre-Production","Storyboard Studio")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Dt("Storyboard Studio","art_track",a||"/production",`
          <button id="btn-export-storyboard-pdf" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Export genuine Storyboard Studio PDF">
            <span class="material-symbols-outlined text-[16px]">download</span>
            <span>Export PDF</span>
          </button>
        `)}

        <!-- Feature Intro Banner -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <h2 class="font-heading font-semibold text-sm text-slate-900">Visual Shot Composition & Concept Frames</h2>
            <p class="text-xs text-slate-500 max-w-lg leading-relaxed">
              Storyboard Studio connects camera focal lengths, aspect ratios, character blocking, and concept frames directly to confirmed screenplay scenes.
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <a href="/production/schedule?scriptId=${n}&sceneId=scene-10&from=${encodeURIComponent(`/production/storyboard?scriptId=${n}`)}" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors">
              Inspect Scene 10 Setup
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
              <span class="text-[11px] font-mono mt-1 text-slate-300">SCENE 10 · SHOT 10F</span>
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

      ${Te("production")}
    </div>
  `}function Za(e,t=null,s=null){const n=document.getElementById("btn-export-storyboard-pdf");n&&(n.onclick=()=>{try{Ha([{sceneNum:1,shotNum:"1A",title:"Perimeter Outpost Gate",lens:"Wide Establishing Drone (24mm, 2.39:1)",intExt:"EXT",dayNight:"DAY",description:"High altitude drone descending across dust devils toward Kevin's arrival."},{sceneNum:2,shotNum:"2C",title:"Customs Shed Hologram",lens:"Medium Two-Shot (50mm, 2.39:1)",intExt:"INT",dayNight:"DAY",description:"Fluorescent tube flicker rim lighting Kevin and Meera over telemetry anomaly."},{sceneNum:10,shotNum:"10D",title:"High Pressure Bypass Tank",lens:"Close Tracking Dolly (35mm Anamorphic)",intExt:"INT",dayNight:"NIGHT",description:"Wrench slips in Kevin hand under spurting brine vapor with pulsing red siren strobe."}],{title:"Chronicles of Dust",draft:"Draft 4.2"}),w("Exported Storyboard Studio PDF")}catch(a){console.error(a),w("Failed to export Storyboard PDF")}})}class Qa{constructor(){this.appEl=null,this.currentPath=null,this.isFullScreen=!1}getBasePath(){return window.location.pathname.toLowerCase().startsWith("/scriptora")?"/Scriptora":""}getCurrentLocation(){return window.location.hash&&window.location.hash.startsWith("#/")?window.location.hash.slice(1):window.location.pathname+window.location.search}ensureShell(){if(!this.appEl)return;document.getElementById("scriptora-app-shell")||(this.appEl.innerHTML=`
        <div id="scriptora-app-shell" class="flex flex-col min-h-screen w-full relative bg-surface select-text">
          <!-- Persistent Global Header Container -->
          <div id="scriptora-global-header" class="fixed top-0 left-0 right-0 z-40 transition-all duration-200"></div>

          <!-- Dynamic Screen Content Area -->
          <main id="scriptora-global-content" class="flex-1 w-full min-h-screen flex flex-col relative transition-opacity duration-200"></main>

          <!-- Persistent Global Bottom Navigation Container -->
          <div id="scriptora-global-nav" class="fixed bottom-0 left-0 right-0 z-40 transition-all duration-200 overflow-visible"></div>
        </div>
      `)}init(t="#app"){if(this.appEl=document.querySelector(t),!this.appEl){console.error(`Mount element ${t} not found.`);return}this.ensureShell(),window.setScriptoraFullScreen=s=>{this.isFullScreen=!!s;const n=document.getElementById("scriptora-global-header"),a=document.getElementById("scriptora-global-nav");n&&n.classList.toggle("hidden",!!s),a&&a.classList.toggle("hidden",!!s)},document.body.addEventListener("click",s=>{const n=s.target.closest("a");if(n&&n.href&&n.origin===window.location.origin&&!n.hasAttribute("download")&&n.getAttribute("target")!=="_blank"&&!n.getAttribute("rel")?.includes("external")){const a=new URL(n.href),o=a.pathname+a.search+a.hash;o.startsWith("/api")||(s.preventDefault(),this.navigate(o))}}),window.addEventListener("popstate",s=>{typeof window.__scriptoraEditorPopstate=="function"&&window.__scriptoraEditorPopstate(s)||this.resolve(this.getCurrentLocation())}),window.addEventListener("hashchange",()=>{this.resolve(this.getCurrentLocation())}),this.resolve(this.getCurrentLocation())}navigate(t,s=!1){this.currentPath&&y.pushHistory(this.currentPath);const n=this.getBasePath(),a=n&&t.toLowerCase().startsWith(n.toLowerCase())?t.slice(n.length)||"/":t,o=n&&!t.startsWith(n)?`${n}${a.startsWith("/")?"":"/"}${a}`:t;s?window.history.replaceState(null,"",o):window.history.pushState(null,"",o),this.resolve(a)}resolve(t){const s=t.indexOf("?"),n=s===-1?t:t.slice(0,s),a=s===-1?"":t.slice(s+1);let o=n.replace(/\/+$/,"")||"/";const l=this.getBasePath();l&&o.toLowerCase().startsWith(l.toLowerCase())&&(o=o.slice(l.length)||"/"),o.startsWith("/")||(o="/"+o);const i=new URLSearchParams(a||"");this.currentPath=t;const c=!!y.state.currentUser;if(!c&&!["/welcome","/auth"].includes(o)){this.navigate("/auth",!0);return}if(c&&o==="/auth"){this.navigate("/workspace",!0);return}if(o==="/"){c?this.navigate("/workspace",!0):this.navigate("/welcome",!0);return}if(o==="/welcome"){this.render(Fn(),()=>_n(this.navigate.bind(this)),{isPublic:!0});return}if(o==="/auth"){this.render(On(),()=>jn(this.navigate.bind(this)),{isPublic:!0});return}if(o==="/workspace"){this.render(Hn(),()=>Un(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Workspace",subtitle:"Your writing space."});return}if(o==="/editor"){const r=y.state.selectedScriptId||"chronicles-of-dust",d=i.get("scene");this.navigate(`/editor/${r}${d?`?scene=${d}`:""}`,!0);return}if(o.startsWith("/editor/")){const r=o.split("/")[2],d=i.get("scene");y.setState({selectedScriptId:r});const b=y.state.scripts?.find(f=>f.id===r)||{title:"Untitled Screenplay"};this.render(Vn(r,d),()=>Gn(r,this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Editor",subtitle:b.title||"Screenplay Studio",hideHeader:!0,hideNav:!0});return}if(o==="/intelligence"||o==="/intelligence/select"){this.render(fa(),()=>ma(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Selector"});return}if(o==="/intelligence/context"){this.render(ba(),()=>ga(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Context Calibration"});return}if(o==="/intelligence/dashboard"||o==="/intelligence/overview"){this.render(ha(),()=>va(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Analysis"});return}if(o==="/intelligence/analysis"||o==="/intelligence/analysis/select"){this.render(ya(),()=>wa(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Analyse Individually"});return}if(o.startsWith("/intelligence/analysis/")){const r=o.split("/")[3]||"pacing",d=i.get("from"),b=i.get("scriptId");this.render(Ia(r,d,b),()=>ka(r,this.navigate.bind(this),d,b),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Vector Analysis"});return}if(o==="/profile"){const r=i.get("from"),d=i.get("scriptId");this.render(Ca(r,d),()=>Aa(this.navigate.bind(this),r,d),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Account & preferences."});return}if(o==="/profile/collaborators"){const r=i.get("from"),d=i.get("scriptId");this.render(Ta(r,d),()=>Na(this.navigate.bind(this),r,d),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Collaborators"});return}if(o==="/notifications"){this.render($a(),()=>Pa(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Notifications",subtitle:"Activity Stream"});return}if(o==="/production"||o==="/pre-production"){const r=i.get("from"),d=i.get("scriptId");this.render(Ba(r,d),()=>Da(this.navigate.bind(this),r,d),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Production Workspace & Tools"});return}if(o==="/production/breakdown"){const r=i.get("from"),d=i.get("scriptId");this.render(qa(r,d),()=>za(this.navigate.bind(this),r,d),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Script Breakdown Workspace"});return}const p=o.match(/^\/production\/scenes(?:\/([a-zA-Z0-9_-]+))?$/);if(p){const r=i.get("from"),d=i.get("scriptId")||"chronicles-of-dust",b=p[1]||i.get("sceneId"),f=`/production/schedule?scriptId=${d}${b?`&sceneId=${b}`:""}${r?`&from=${encodeURIComponent(r)}`:""}`;this.navigate(f,!1);return}const x=o.match(/^\/production\/call-sheets(?:\/([a-zA-Z0-9_-]+))?$/);if(x){const r=i.get("from"),d=i.get("scriptId"),b=x[1]||i.get("csId");this.render(Va(r,d,b),()=>Js(this.navigate.bind(this),r,d,b),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:b?"Call Sheet Inspector":"Call Sheets Workspace"});return}if(o==="/production/dialogue-sides"||o==="/production/dialogue-sheets"||o==="/production/sides"){const r=i.get("from"),d=i.get("scriptId");this.render(Wa(r,d),()=>Ga(this.navigate.bind(this),r,d),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Dialogue Sheets & Actor Sides"});return}if(o==="/production/schedule"||o==="/production/stripboard"){const r=i.get("from"),d=i.get("scriptId");this.render(Ja(r,d),()=>Ya(this.navigate.bind(this),r,d),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Master Shooting Schedule & Stripboard"});return}if(o==="/production/storyboard"||o==="/production/storyboards"){const r=i.get("from"),d=i.get("scriptId");this.render(Xa(r,d),()=>Za(this.navigate.bind(this),r,d),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Storyboard Studio"});return}if(o==="/chat"||o==="/ai-chat"||o==="/writer-room"||o==="/ai-writer-room"){this.render(Ra(),()=>Ma(this.navigate.bind(this)),{activeTab:"chat",sectionTitle:"AI Chat",subtitle:"Universal Assistant"});return}this.renderNotFound(o)}render(t,s,n={}){this.ensureShell();const a=document.getElementById("scriptora-global-header"),o=document.getElementById("scriptora-global-content"),l=document.getElementById("scriptora-global-nav"),i=!!n.isPublic,c=!!n.hideHeader,u=!!n.hideNav,p=n.activeTab||"workspace",x=n.sectionTitle||"Scriptora",r=n.subtitle||"";if(i?(a&&a.classList.add("hidden"),l&&l.classList.add("hidden")):(a&&!this.isFullScreen&&(c?(a.classList.add("hidden"),a.innerHTML=""):(a.classList.remove("hidden"),a.innerHTML=Be(x,r))),l&&!this.isFullScreen&&(u?(l.classList.add("hidden"),l.innerHTML=""):(l.classList.remove("hidden"),Ln(p)||(l.innerHTML=Te(p))))),o){let d=t||"";if(d=d.replace(/<header[^>]*data-global-header="true"[^>]*>[\s\S]*?<\/header>/gi,""),d=d.replace(/<header\s+class="fixed\s+top-0\s+w-full\s+z-40\s+pt-safe\s+bg-surface[^>]*>[\s\S]*?<\/header>/gi,""),d=d.replace(/<nav[^>]*data-global-bottom-nav="true"[^>]*>[\s\S]*?<\/nav>/gi,""),d=d.replace(/<nav\s+class="fixed\s+bottom-0[^>]*>[\s\S]*?<\/nav>/gi,""),o.innerHTML=d,window.scrollTo({top:0,behavior:"instant"}),o.classList.remove("fade-in"),o.offsetWidth,o.classList.add("fade-in"),typeof s=="function")try{s()}catch(b){console.error("Error attaching screen events:",b)}}}renderNotFound(t){this.render(`
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
      `,()=>{const s=document.getElementById("notfound-home");s&&(s.onclick=()=>this.navigate("/workspace"))},{activeTab:"workspace",sectionTitle:"Page Not Found",subtitle:"404"})}}const eo=new Qa;async function Ns(){try{await y.init(),eo.init("#app"),window.addEventListener("online",()=>{w("Back online. Synchronizing changes..."),y.refreshScripts(),y.refreshNotifications()}),window.addEventListener("offline",()=>{w("Offline mode active. Edits saved locally.","info")}),console.log("Scriptora initialized successfully in production-ready mode.")}catch(e){console.error("Scriptora bootstrap failed:",e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ns):Ns();
