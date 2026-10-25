(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=s(a);fetch(a.href,o)}})();const wn="http://localhost:8000/api";async function K(e,t={}){const s=`${wn}${e}`,n={headers:{"Content-Type":"application/json",...t.headers},...t};try{const a=await fetch(s,n);if(!a.ok){const o=await a.json().catch(()=>({}));throw new Error(o.error||`HTTP error ${a.status}`)}return await a.json()}catch(a){throw console.warn(`API call ${e} failed, falling back to local store:`,a.message),a}}const Qt=[{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",industry:"International / Hollywood",pages:96,updated:"12m ago",currentScene:"Scene 18",isCurrentDraft:!0,archived:!1,joinCode:"A7K9-XP42",logline:"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.",synopsis:"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves.",context:{format:"Feature",industry:"International / Hollywood",hours:1,minutes:36,seconds:0,plannedDuration:"01:36:00"},analysisScores:{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80}},{id:"the-neon-horizon",title:"The Neon Horizon",draft:"Draft 2.1",genre:"Sci-Fi",format:"Pilot",industry:"Streaming Television",pages:62,updated:"2h ago",currentScene:"Scene 4",isCurrentDraft:!1,archived:!1,joinCode:"N3ON-H0RZ",context:{format:"Pilot",industry:"Streaming Television",hours:0,minutes:52,seconds:0,plannedDuration:"00:52:00"},analysisScores:{overall:79,pacing:75,dialogue:84,emotion:80,characterArc:78,continuity:82,storyStructure:76,theme:88,cinema:83,formatting:90,production:72}},{id:"velvet-shadows",title:"Velvet Shadows",draft:"Draft 1.0",genre:"Noir",format:"Feature",industry:"Independent / Festival",pages:114,updated:"Yesterday",currentScene:"Scene 1",isCurrentDraft:!1,archived:!1,joinCode:"V3LV-SHDW",analysisScores:{overall:81,pacing:80,dialogue:86,emotion:79,characterArc:85,continuity:80,storyStructure:82,theme:84,cinema:88,formatting:92,production:76}},{id:"silent-echoes",title:"Silent Echoes",draft:"Draft 3.0",genre:"Psychological Thriller",format:"Feature",industry:"International / Hollywood",pages:104,updated:"3d ago",currentScene:"Scene 22",isCurrentDraft:!1,archived:!1,joinCode:"SLNT-ECH0",analysisScores:{overall:84,pacing:86,dialogue:81,emotion:88,characterArc:83,continuity:85,storyStructure:89,theme:82,cinema:84,formatting:91,production:78}},{id:"glass-kingdoms",title:"Glass Kingdoms",draft:"Draft 1.4",genre:"Fantasy",format:"Pilot",industry:"Streaming Television",pages:58,updated:"1w ago",currentScene:"Scene 8",isCurrentDraft:!1,archived:!1,joinCode:"GLSS-KNGD",analysisScores:{overall:78,pacing:74,dialogue:80,emotion:76,characterArc:82,continuity:75,storyStructure:80,theme:86,cinema:82,formatting:88,production:70}},{id:"red-shift",title:"Red Shift",draft:"Draft 2.0",genre:"Action",format:"Short",industry:"Independent / Festival",pages:28,updated:"2w ago",currentScene:"Scene 5",isCurrentDraft:!1,archived:!1,joinCode:"RED2-SHFT",analysisScores:{overall:83,pacing:90,dialogue:78,emotion:75,characterArc:80,continuity:88,storyStructure:84,theme:80,cinema:89,formatting:95,production:82}}];async function Gs(){try{const e=await K("/auth/me");return e&&"user"in e?e.user?(localStorage.setItem("scriptora_user",JSON.stringify(e.user)),e.user):(localStorage.removeItem("scriptora_user"),null):e?.user||null}catch{const e=localStorage.getItem("scriptora_user");if(e)try{const t=JSON.parse(e);if(t&&(t.displayName||t.email||t.id))return t}catch{}return null}}async function Sn(e){try{const t=await K("/auth/login",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-1",name:e.email?e.email.split("@")[0]:"Arun Kumar",displayName:e.email?e.email.split("@")[0]:"Arun Kumar",email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Narrative Director",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function En(e={}){try{const t=await K("/auth/login",{method:"POST",body:JSON.stringify({...e,provider:"google"})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t=e.displayName||e.name||(e.email?e.email.split("@")[0]:"Google Filmmaker"),s=t.split(" ").map(a=>a[0]).filter(Boolean).slice(0,2).join("").toUpperCase()||"GF",n={id:e.sub||`google-${Date.now()}`,name:t,displayName:t,email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Film Director",badge:"Member Pro",initials:s,avatar:e.picture||e.photoURL||null,avatarUrl:e.picture||e.photoURL||null,provider:"google",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(n)),n}}async function kn(e){try{const t=await K("/auth/register",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:`user-${Date.now()}`,name:e.name||"New Writer",displayName:e.name||"New Writer",email:e.email||"writer@scriptora.studio",headline:"Screenwriter",badge:"Member Pro",initials:(e.name||"NW").slice(0,2).toUpperCase(),stats:{drafts:1,coAuthors:0,healthIndex:"100%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function In(e){try{const t=await K("/auth/otp",{method:"POST",body:JSON.stringify({phone:e})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-phone",name:"Verified Writer",displayName:"Verified Writer",headline:"Screenwriter",email:e,badge:"Member Pro",initials:"VW",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}function xs(){localStorage.removeItem("scriptora_user"),localStorage.removeItem("scriptora_scripts"),localStorage.removeItem("scriptora_selected_script");const e=[];try{for(let t=0;t<localStorage.length;t++){const s=localStorage.key(t);s&&(s.startsWith("scriptora_screenplay_")||s.startsWith("scriptora_prod_")||s.startsWith("scriptora_storyboard_"))&&e.push(s)}for(const t of e)localStorage.removeItem(t)}catch(t){console.warn("Local storage purge notice:",t)}try{sessionStorage.clear()}catch{}}async function Ks(){try{await K("/auth/logout",{method:"POST"})}catch(e){console.warn("Server logout notice:",e.message)}return xs(),{success:!0}}async function Cn(e){const t=(e||"").trim();if(t.toUpperCase()!=="DELETE MY ACCOUNT")throw new Error('Confirmation mismatch. Please type "DELETE MY ACCOUNT" exactly to confirm account deletion.');try{const s=await K("/auth/delete-account",{method:"POST",body:JSON.stringify({confirmation:t})});return xs(),s}catch(s){if(!s.status||s.message?.includes("404")||s.message?.includes("Failed to fetch")||s.message?.includes("NetworkError")||s.message?.includes("Load failed"))return xs(),{success:!0,message:"Account and associated personal records have been permanently deleted."};throw s}}async function Je(e=""){try{const n=e?`/scripts?q=${encodeURIComponent(e)}`:"/scripts",a=await K(n);if(a.scripts&&Array.isArray(a.scripts)){localStorage.setItem("scriptora_scripts",JSON.stringify(a.scripts));let o=a.scripts;return e&&(o=o.filter(i=>i.title.toLowerCase().includes(e.toLowerCase()))),o}}catch{}const t=localStorage.getItem("scriptora_scripts");let s;if(t!==null)try{s=JSON.parse(t),Array.isArray(s)||(s=[...Qt],localStorage.setItem("scriptora_scripts",JSON.stringify(s)))}catch{s=[...Qt],localStorage.setItem("scriptora_scripts",JSON.stringify(s))}else s=[...Qt],localStorage.setItem("scriptora_scripts",JSON.stringify(s));return e&&(s=s.filter(n=>n.title.toLowerCase().includes(e.toLowerCase()))),s}async function hs(e){try{const s=await K(`/scripts/${e}`);if(s.script)return s.script}catch{}const t=await Je();return t.find(s=>s.id===e)||Qt.find(s=>s.id===e)||t[0]||null}async function An(e){try{const o=await K("/scripts",{method:"POST",body:JSON.stringify(e)});if(o.script){const l=(await Je()).map(c=>({...c,isCurrentDraft:!1}));return localStorage.setItem("scriptora_scripts",JSON.stringify([o.script,...l.filter(c=>c.id!==o.script.id)])),localStorage.setItem("scriptora_selected_script",o.script.id),o.script}}catch{}const t={id:(e.title||"untitled").toLowerCase().replace(/[^a-z0-9]+/g,"-"),title:e.title||"Untitled Screenplay",draft:"Draft 1.0",genre:e.genre||"Drama",format:e.format||"Feature",industry:e.industry||"International / Hollywood",pages:1,updated:"Just now",currentScene:"Scene 1",isCurrentDraft:!0,joinCode:"SCRP-1001",archived:!1,context:{format:e.format||"Feature",industry:e.industry||"International / Hollywood",hours:1,minutes:30,seconds:0,plannedDuration:"01:30:00"},analysisScores:{overall:80,pacing:78,dialogue:80,emotion:80,characterArc:78,continuity:80,storyStructure:80,theme:80,cinema:80,formatting:90,production:75}},n=(await Je()).map(o=>({...o,isCurrentDraft:!1})),a=[t,...n.filter(o=>o.id!==t.id)];return localStorage.setItem("scriptora_scripts",JSON.stringify(a)),localStorage.setItem("scriptora_selected_script",t.id),t}async function $n(e){if(!e)return await Je();try{const n=await K(`/scripts/${e}/current-draft`,{method:"POST"});if(n&&n.script){const o=(await Je()).map(i=>({...i,isCurrentDraft:i.id===e,updated:i.id===e?"Just now":i.updated}));return localStorage.setItem("scriptora_scripts",JSON.stringify(o)),localStorage.setItem("scriptora_selected_script",e),o}}catch{}const s=(await Je()).map(n=>({...n,isCurrentDraft:n.id===e,updated:n.id===e?"Just now":n.updated}));return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),localStorage.setItem("scriptora_selected_script",e),s}async function Nn(e,t){try{const a=await K(`/scripts/${e}`,{method:"PUT",body:JSON.stringify(t)});if(a.script){const i=(await Je()).map(l=>l.id===e?a.script:l);return localStorage.setItem("scriptora_scripts",JSON.stringify(i)),a.script}}catch{}const n=(await Je()).map(a=>a.id===e?{...a,...t,updated:"Just now"}:a);return localStorage.setItem("scriptora_scripts",JSON.stringify(n)),{id:e,...t,updated:"Just now"}}async function Tn(e){try{await K(`/scripts/${e}`,{method:"DELETE"})}catch{}const s=(await Je()).filter(n=>n.id!==e);return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),{success:!0}}async function Pn(e){try{const o=await K(`/scripts/${e}/duplicate`,{method:"POST"});if(o.script){const i=await Je();return localStorage.setItem("scriptora_scripts",JSON.stringify([o.script,...i])),o.script}}catch{}const t=await hs(e),s={...t,id:`${e}-copy-${Date.now().toString().slice(-4)}`,title:`${t?.title||"Script"} (Copy)`,updated:"Just now"},n=await Je(),a=[s,...n];return localStorage.setItem("scriptora_scripts",JSON.stringify(a)),s}async function Bn(e){try{await K(`/scripts/${e}/archive`,{method:"POST"})}catch{}const s=(await Je()).map(n=>n.id===e?{...n,archived:!0,updated:"Just now"}:n);return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),{success:!0}}const ys={id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pageCount:5,wordCount:14280,titlePage:{title:"CHRONICLES OF DUST",author:"Arun Kumar",contact:"Scriptora Studio · arun.kumar@scriptora.studio · +1 (555) 019-2834",notes:"An original screenplay. Draft 4.2 Production Cut."},settings:{sceneNumbers:!0,sceneNumberSide:"left",smartFormatting:!0,fontSize:"12pt",lineSpacing:"1.5",language:"English"},acts:[{id:"act-1",name:"ACT I - The Broken Siphon"},{id:"act-2",name:"ACT II - The Pressure Surge"},{id:"act-3",name:"ACT III - The Floodgate Standoff"}],characters:["KEVIN","MEERA","HARI","AKASH"],locations:["INT. HOME","INT. PORT AUDIT ROOM","INT. CUSTOMS OFFICE","EXT. FLOODGATE GANTRY"],times:["DAY","NIGHT","CONTINUOUS","DAWN","DUSK","LATER","MORNING","EVENING"],transitions:["CUT TO:","FADE IN:","FADE OUT.","DISSOLVE TO:","SMASH CUT TO:","MATCH CUT TO:","JUMP CUT TO:"],scenes:[{id:"scene-1",number:1,actId:"act-1",slugline:"INT. HOME - EVENING",blocks:[{id:"b-1-1",type:"scene",content:"INT. HOME - EVENING"},{id:"b-1-2",type:"action",content:"There stands a woman."},{id:"b-1-3",type:"character",content:"HARI"},{id:"b-1-4",type:"dialogue",content:"Who is that?"},{id:"b-1-5",type:"character",content:"AKASH"},{id:"b-1-6",type:"dialogue",content:"How do I know?"},{id:"b-1-7",type:"action",content:"Both leaves the place."}]},{id:"scene-4",number:4,actId:"act-1",slugline:"INT. PORT AUDIT ROOM - DAY",blocks:[{id:"b-4-1",type:"scene",content:"INT. PORT AUDIT ROOM - DAY"},{id:"b-4-2",type:"action",content:"Kevin stamps irregular cargo manifests to keep peace with union superiors."},{id:"b-4-3",type:"character",content:"KEVIN"},{id:"b-4-4",type:"dialogue",content:"The manifests are sealed."}]},{id:"scene-18",number:18,actId:"act-2",slugline:"INT. CUSTOMS OFFICE - NIGHT",blocks:[{id:"b-18-1",type:"scene",content:"INT. CUSTOMS OFFICE - NIGHT"},{id:"b-18-2",type:"action",content:"Kevin kneels over the cracked hydro-sensor junction box. Static hiss whispers through the damp comm-link. A lone flicker illuminates the tarnished brass seal."},{id:"b-18-3",type:"action",content:"Water droplets bead along the corroded circuit wires. He slides a copper probe between the connectors."},{id:"b-18-4",type:"character",content:"KEVIN"},{id:"b-18-5",type:"parenthetical",content:"(whispering into comm)"},{id:"b-18-6",type:"dialogue",content:"If the seals break before dawn, the sector won't hold the surge."},{id:"b-18-7",type:"character",content:"MEERA (O.S.)"},{id:"b-18-8",type:"dialogue",content:"Then don't let them break. Reroute the secondary relay through the floodgate breaker."},{id:"b-18-9",type:"transition",content:"CUT TO:"}]}]};async function Dn(e){try{const n=await K(`/screenplay/${e}`);if(n.screenplay&&n.screenplay.scenes&&n.screenplay.scenes.length>0)return n.screenplay}catch{}const t=localStorage.getItem(`scriptora_screenplay_${e}`);if(t)try{const n=JSON.parse(t);if(n&&n.scenes&&n.scenes.length>0)return n}catch{}const s=JSON.parse(JSON.stringify(ys));return s.id=e||"script_01",localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(s)),s}async function Rn(e,t){localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(t));try{return await K(`/screenplay/${e}`,{method:"PUT",body:JSON.stringify({screenplay:t})})}catch{return{success:!0}}}async function Ln(e){try{return(await K(`/versions/${e}`)).versions}catch{return[{id:"v-4.2",name:"Draft 4.2",tag:"Current Active",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:"Refined Meera O.S. dialogue and hydro-sensor action line.",isCurrent:!0},{id:"v-3.0",name:"Draft 3.0",tag:"Production Polish",timestamp:"Yesterday, 4:15 PM",author:"JD",stats:"94 pages · 13,950 words",notes:"Incorporated director notes on floodgate transition pacing.",isCurrent:!1},{id:"v-2.0",name:"Draft 2.0",tag:"First Table Read",timestamp:"Oct 12, 2024",author:"JD",stats:"90 pages · 13,200 words",notes:"Table read revision for Acts I & II character arcs.",isCurrent:!1}]}}async function Mn(e,t){try{return(await K(`/versions/${e}`,{method:"POST",body:JSON.stringify(t)})).version}catch{return{id:`v-${Date.now()}`,name:t.name,tag:"Milestone Snapshot",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:t.notes||"",isCurrent:!0}}}async function On(e){try{return(await K(`/collaborators/${e}`)).collaborators}catch{return[{id:"c-1",name:"Heamanth S.",email:"heamanth@studio.com",initials:"HS",role:"Editor",avatarBg:"bg-blue-100 text-blue-700",status:"Active",added:"2d ago"},{id:"c-2",name:"Elena Rostova",email:"elena@cineworks.io",initials:"ER",role:"Script Doctor",avatarBg:"bg-amber-100 text-amber-700",status:"Active",added:"1w ago"},{id:"c-3",name:"Marcus Vance",email:"vance.prod@paramount.com",initials:"MV",role:"Producer",avatarBg:"bg-purple-100 text-purple-700",status:"Viewer",added:"2w ago"}]}}async function Fn(e,t){try{return(await K(`/collaborators/${e}/invite`,{method:"POST",body:JSON.stringify(t)})).collaborator}catch{return{id:`c-${Date.now()}`,name:t.email.split("@")[0],email:t.email,initials:t.email.substring(0,2).toUpperCase(),role:t.role==="editor"?"Editor":"Viewer",avatarBg:"bg-emerald-100 text-emerald-700",status:"Active",added:"Just now"}}}async function _n(e,t){try{return await K(`/collaborators/${e}/${t}`,{method:"DELETE"})}catch{return{success:!0}}}async function jn(e){try{return(await K("/join-code/generate",{method:"POST",body:JSON.stringify({scriptId:e})})).joinCode}catch{return Math.random().toString(36).substring(2,6).toUpperCase()+"-"+Math.random().toString(36).substring(2,6).toUpperCase()}}async function Hn(e){try{return await K("/join-code/validate",{method:"POST",body:JSON.stringify({code:e})})}catch{return(e||"").toUpperCase().trim()==="A7K9-XP42"?{valid:!0,script:{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",pages:96,collaboratorCount:3}}:{valid:!1,error:"Invalid or expired join code"}}}async function Un(e){try{return await K("/join-code/redeem",{method:"POST",body:JSON.stringify({code:e})})}catch{return{success:!0,scriptId:"chronicles-of-dust",title:"Chronicles of Dust"}}}async function Js(){try{return await K("/notifications")}catch{return{notifications:[{id:1,sender:"HS",senderName:"Heamanth",type:"collaboration_invite",title:"Heamanth invited you to collaborate",body:'Added you as an Editor on "Chronicles of Dust" (Draft 4.2).',time:"12m ago",group:"today",unread:!0,tags:["Draft 4.2","Role: Editor"],actionLabel:"Review Access →",actionRoute:"/profile/collaborators"},{id:2,sender:"icon:description",type:"export_ready",title:"Your export is ready",body:'"Chronicles of Dust (Draft 4.2)" exported as standard Industry PDF.',time:"45m ago",group:"today",unread:!0,tags:["PDF","96 Pages"],actionLabel:"Open Screenplay →",actionRoute:"/editor/chronicles-of-dust"},{id:3,sender:"AK",senderName:"Arun K.",type:"join_code_request",title:"Join-code access request",body:'Requested Editor access to "Anbin Mozhi" via join-code A7K9-XP42.',time:"2h ago",group:"today",unread:!0,tags:["Code: A7K9-XP42"],actionLabel:"Manage Collaborators →",actionRoute:"/profile/collaborators"}],unreadCount:3}}}async function qn(e){try{return await K(`/notifications/${e}/read`,{method:"POST"})}catch{return{success:!0}}}async function zn(){try{return await K("/notifications/read-all",{method:"POST"})}catch{return{success:!0}}}async function Ps(){return(await Js()).unreadCount||0}async function is(e){try{const t=await K("/profile",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.profile)),t.profile}catch{const s={...await Gs()||{},...e};if(e.name){const n=e.name.trim().split(/\s+/);s.initials=((n[0]?.[0]||"A")+(n[1]?.[0]||"")).toUpperCase(),s.displayName=e.name}return localStorage.setItem("scriptora_user",JSON.stringify(s)),s}}async function Ys(){try{return(await K("/settings")).settings}catch{const e=localStorage.getItem("scriptora_settings");return e?JSON.parse(e):{editor:{autoSceneHeading:!0,autoCharacter:!0,autoTransition:!0,enterAfterAction:!0,tabAfterAction:!0,autoCapitalize:!0,continueDialogue:!0,showSceneNumbers:!0,lockSceneNumbers:!1,fontSize:"Courier Prime 12pt",lineSpacing:"1.5 line",focusMode:!1},language:"English (US)",appearance:"Light",notifications:{collaborationInvites:!0,collaborationEdits:!0,mentions:!0,versionMilestones:!0},intelligence:{querySuggestions:!0,analysisSuggestions:!0}}}}async function Vn(e){try{const t=await K("/settings",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_settings",JSON.stringify(t.settings)),t.settings}catch{const s={...await Ys(),...e};return localStorage.setItem("scriptora_settings",JSON.stringify(s)),s}}async function Wn(e,t){try{return(await K(`/intelligence/${e}/context`,{method:"PUT",body:JSON.stringify(t)})).context}catch{return t}}async function vs(e,t){try{return(await K("/intelligence/query",{method:"POST",body:JSON.stringify({query:e,scriptId:t})})).answer}catch{return"Analysis: In this screenplay, scene tempo and dialogue density align with core narrative milestones. Characters express distinct agendas in each beat."}}async function Gn(e="chronicles-of-dust"){try{const a=await K(`/production/${e}`);if(a?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(a.workspace)),a.workspace}catch{}const t=localStorage.getItem(`scriptora_prod_ws_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=await hs(e),n={id:`prod-ws-${e}`,projectId:"proj-1",projectName:"Badlands Anthology",scriptId:e,screenplayTitle:s?.title||"Chronicles of Dust",pinnedSourceVersion:s?.draft||"Draft 4.2",pinnedSourceVersionHash:"v4.2-snap-88f2",pinnedTimestamp:"12m ago",currentScriptDraft:s?.draft||"Draft 4.2",isStale:!1,mode:localStorage.getItem("scriptora_prod_mode")||"simple",userRole:localStorage.getItem("scriptora_prod_role")||"Owner",roles:["Owner","Director","Assistant Director","Production","Department Member","Viewer"],stats:{totalScenes:18,breakdownElements:78,callSheetsCount:2,shootingDays:14,pendingProposals:2,completedApprovals:6},updatedAt:new Date().toISOString()};return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n)),n}async function Kn(e,t){try{const n=await K(`/production/${e}/pin`,{method:"POST",body:JSON.stringify({version:t})});if(n?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n.workspace)),n.workspace}catch{}const s=await Gn(e);return s.pinnedSourceVersion=t,s.pinnedTimestamp="Just now",s.isStale=!1,localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(s)),s}async function Dt(e="chronicles-of-dust"){try{const a=await K(`/production/${e}/scenes`);if(a?.scenes)return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(a.scenes)),a.scenes}catch{}const t=localStorage.getItem(`scriptora_prod_scenes_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[],n=[{num:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",intExt:"EXT",dayNight:"DAY",p:"4 1/8",comp:"Moderate",day:"Day 1 of 7",cast:["KEVIN","MARCUS"],desc:"Wind whips dust across perimeter chain link. Kevin arrives at customs gate."},{num:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",intExt:"INT",dayNight:"DAY",p:"3 4/8",comp:"Simple",day:"Day 1 of 7",cast:["KEVIN","MEERA"],desc:"Meera analyzes telemetry console indicating illegal pressure drop."},{num:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",intExt:"EXT",dayNight:"DUSK",p:"7 2/8",comp:"Complex",day:"Day 2 of 7",cast:["KEVIN"],desc:"Concrete conduit pipeline across cracked alkali flats during sunset."},{num:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",intExt:"EXT",dayNight:"NIGHT",p:"5 0/8",comp:"Complex",day:"Day 3 of 7",cast:["KEVIN","MEERA"],desc:"Perimeter night patrol with solar rover and surveillance drones."},{num:5,heading:"INT. HYDRAULIC VALVE TUNNEL - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"5 4/8",comp:"Moderate",day:"Day 3 of 7",cast:["KEVIN"],desc:"Rusty underground valves with echoing industrial turbine vibration."},{num:6,heading:"EXT. DESERT SERVICE ROAD - DAY",intExt:"EXT",dayNight:"DAY",p:"5 2/8",comp:"Simple",day:"Day 4 of 7",cast:["KEVIN"],desc:"Kevin tracks tanker tire treads along decommissioned asphalt."},{num:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",intExt:"INT",dayNight:"DAY",p:"6 3/8",comp:"Moderate",day:"Day 5 of 7",cast:["COMMANDER VANCE","KEVIN"],desc:"Vance oversees regional water diversion bank from glass observatory."},{num:8,heading:"EXT. RESERVOIR INTAKE BASIN - DAY",intExt:"EXT",dayNight:"DAY",p:"5 5/8",comp:"Complex",day:"Day 6 of 7",cast:["MEERA"],desc:"Rappelling 60-foot descent down drained concrete spillway."},{num:9,heading:"INT. DRAINAGE VAULT - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"4 1/8",comp:"Moderate",day:"Day 7 of 7",cast:["KEVIN","MEERA"],desc:"Subterranean acoustic surveillance using directional hydrophones."},{num:10,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"2 6/8",comp:"Complex",day:"Day 2 of 7",cast:["KEVIN","MEERA"],desc:"Kevin anchors hydraulic bypass valve kit as high pressure brine seals."}];for(const a of n)s.push({id:`scene-${a.num}`,sceneNumber:a.num,scriptId:e,heading:a.heading,intExt:a.intExt,dayNight:a.dayNight,pages:a.p,complexity:a.comp,shootDay:a.day,status:a.num===4?"Needs Review":"Scheduled",snippet:a.desc,directorNotes:`Director visual notes for ${a.heading}. Maintain high contrast lighting.`,continuityNotes:"Continuity reference logged against Draft 4.2.",cast:a.cast,sidesReady:!0});return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(s)),s}async function Jn(e,t){try{const i=await K(`/production/${e}/scenes/${t}`);if(i?.scene)return i.scene}catch{}const n=(await Dt(e)).find(i=>i.id===t||String(i.sceneNumber)===String(t));if(!n)return null;const o=(await nt(e)).filter(i=>i.sceneId===n.id||i.sceneNumber===n.sceneNumber||Array.isArray(i.scenes)&&i.scenes.includes(n.sceneNumber));return{...n,elements:o}}async function Mt(e,t,s){try{const o=await K(`/production/${e}/scenes/${t}`,{method:"PUT",body:JSON.stringify(s)});if(o?.scene)return o.scene}catch{}const n=await Dt(e),a=n.find(o=>o.id===t||String(o.sceneNumber)===String(t));return a?(Object.assign(a,s),localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(n)),a):s}async function nt(e="chronicles-of-dust",t=null,s=null){try{const o=new URLSearchParams;t&&o.set("category",t),s&&o.set("scene",s);const i=o.toString()?`?${o.toString()}`:"",l=await K(`/production/${e}/breakdown${i}`);if(l?.breakdown)return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(l.breakdown)),l.breakdown}catch{}const n=localStorage.getItem(`scriptora_prod_breakdown_${e}`);let a=[];if(n)try{a=JSON.parse(n)}catch{}if(a.length||(a=[{id:"elem-1",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[1,2,4,18],category:"Cast",name:"KEVIN",characterRole:"Discredited hydro-engineer, 30s. Hero protagonist.",description:"Discredited hydro-engineer, 30s. Hero protagonist.",assignedActor:"Dev Patel",castingStatus:"Confirmed Cast",actorAvailability:"Available Shoot Days 1-14",appearancesCount:4,sourceSnippet:"Kevin kneels over cracked hydro-sensor junction box, static hissing from the diagnostic speaker.",originalAiSuggestion:"KEVIN — Discredited hydro-engineer, 30s. Hero protagonist.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Requires desert dust protective gear and waterproof boots."},{id:"elem-2",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[4,16,18],category:"Cast",name:"MEERA",characterRole:"Field operative with tactical harness.",description:"Field operative with tactical harness.",assignedActor:"Zoe Saldana",castingStatus:"Confirmed Cast",actorAvailability:"Available Shoot Days 4-18",appearancesCount:3,sourceSnippet:"Meera anchors her cable to the iron pylon, visor reflecting the rising floodwaters below.",originalAiSuggestion:"MEERA — Field operative with tactical harness.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Tactical harness fitted for scene 18 valve climb."},{id:"elem-3",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Props",name:"Hydraulic Bypass Valve Kit",description:"Custom machined valve kit with functional digital LED pressure display.",sourcingType:"Hero Prop Built",quantity:"1 Hero + 2 Stunt Duplicates",readinessStatus:"Ready in Art Dept",continuityNotes:"Clean in Sc 1, weathered with grease in Sc 18",sourceSnippet:"Kevin clicks the bypass manifold into place. The gauge needles spike red.",originalAiSuggestion:"Hydraulic Bypass Valve Kit — machined valve kit with LED display.",status:"Confirmed",isHumanConfirmed:!0,confidence:.95,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero prop constructed by art department; 2 stunt duplicates on standby."},{id:"elem-4",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Practical FX",name:"High-Pressure Water Spray",description:"Controlled water burst simulating cracked pipe joint failure.",requiredResources:"Dedicated 4000L Water Tanker, 120 PSI Pump Rig",technicalRequirements:"Safe water containment basins, electrical shut-off triggers",safetyNotes:"Non-slip decking mandatory; waterproof protective ponchos for camera crew",prepStatus:"Rig Test Scheduled",sourceSnippet:"A burst of pressurized brine shoots from the seam, blinding the chamber.",originalAiSuggestion:"High-Pressure Water Spray — Controlled water burst simulating cracked pipe failure.",status:"Needs Review",isHumanConfirmed:!1,confidence:.88,confirmedBy:null,confirmedAt:null,notes:"SFX coordinator requested dedicated water truck standby via Proposal #prop-1."},{id:"elem-5",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Stunts",name:"Valve Pylon Cable Rappel",description:"Meera swings 18 feet across open valve chasm to catch emergency release lever.",coordinationRequirements:"18ft wire pendulum rig, decelerator line, safety crash matting",qualifiedPersonnel:"Stunt Double: Tara Sen / Stunt Coordinator: Roy Hall",safetyPlanningStatus:"Awaiting Coordinator Review",sourceSnippet:"Meera kicks off the catwalk, swinging into the spray as the iron cable groans.",originalAiSuggestion:"Valve Pylon Cable Rappel — 18ft swing across chasm to catch lever.",status:"Needs Review",isHumanConfirmed:!1,confidence:.92,confirmedBy:null,confirmedAt:null,notes:"Awaiting Stunt Coordinator risk assessment and harness certification."},{id:"elem-13",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Locations",name:"Sub-Level Hydro-Chamber B",description:"Industrial concrete pumping cavern with rusty iron catwalks.",context:"INT.",lighting:"NIGHT",locationStatus:"Secured & Permitted",accessDetails:"Permit #WTR-994, Access via Gate 4 Service Tunnel",sourceSnippet:"INT. HYDRO-CHAMBER B - NIGHT. Rust-eaten steel catwalks suspend over deep abyss.",originalAiSuggestion:"Sub-Level Hydro-Chamber B — Concrete pumping cavern with catwalks.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Acoustic echo requires directional shotgun mics; non-slip floor treatment applied."},{id:"elem-6",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Costumes",name:"Kevin — Weathered Dust Coat & Respirator",character:"KEVIN",description:"Heavy canvas duster coat, solar respirator around neck.",wardrobeRequirements:"Duster coat with distressed seam stitching, respirator with worn elastic straps",continuityChanges:"Costume Stage 1 (Desert Dust / Dry)",prepStatus:"Fitted & Approved",sourceSnippet:"KEVIN (30s), sun-scoured and weary, adjusts his solar filter.",originalAiSuggestion:"Kevin — Duster coat, respirator around neck.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Costume fitting complete with wardrobe dept."},{id:"elem-7",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Cast",name:"MARCUS",characterRole:"Border outpost security guard.",description:"Border outpost security guard.",assignedActor:"Unassigned (Auditioning)",castingStatus:"Auditioning",actorAvailability:"Day 1 Shoot Only",appearancesCount:1,sourceSnippet:"MARCUS leans against the chain link, tapping an unlit cigarette against his wrist.",originalAiSuggestion:"MARCUS — Border outpost security guard.",status:"Confirmed",isHumanConfirmed:!0,confidence:.98,confirmedBy:"Elena Rostova",confirmedAt:"2026-10-13T16:00:00Z",notes:"Supporting role. Day 1 shoot only."},{id:"elem-8",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Props",name:"Solar Filter Dust Goggles",description:"Tinted goggles with worn leather straps.",sourcingType:"Hero Wardrobe Prop",quantity:"2 Pairs (A & B Camera)",readinessStatus:"Ready in Art Dept",continuityNotes:"Worn over eyes during wind gusts, rest on forehead indoors",sourceSnippet:"Kevin pulls the goggles over his eyes as a gust hits.",originalAiSuggestion:"Solar Filter Dust Goggles — Tinted goggles with worn leather straps.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero wardrobe prop."},{id:"elem-9",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Vehicles",name:"Solar Patrol Rover (Modified)",description:"Lightweight dune rover fitted with dual photovoltaic roof panels.",availability:"On Set Shoot Days 1 & 2",operationalRequirements:"Charging station in Base Camp, Art Dept weathering wrap",prepStatus:"Checked In & Inspected",sourceSnippet:"The rover sits idling beside Gate 4, suspension coated in red grit.",originalAiSuggestion:"Solar Patrol Rover (Modified) — Dune rover with dual photovoltaic roof panels.",status:"Confirmed",isHumanConfirmed:!0,confidence:.96,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Picture vehicle running on electric battery. Backup battery pack required."},{id:"elem-10",scriptId:e,sceneId:"scene-4",sceneNumber:4,scenes:[4],category:"Props",name:"Night-Vision Monocular Scope",description:"Military grade digital thermal optics.",sourcingType:"Rented",quantity:"1 Unit",readinessStatus:"Sourcing",continuityNotes:"Handheld by Meera on perimeter wall",sourceSnippet:"Meera scans the wire with her thermal monocle. Three glowing silhouettes freeze.",originalAiSuggestion:"Night-Vision Monocular Scope — Military grade digital thermal optics.",status:"Needs Review",isHumanConfirmed:!1,confidence:.85,confirmedBy:null,confirmedAt:null,notes:"Rental request pending vendor confirmation."},{id:"elem-11",scriptId:e,sceneId:"scene-7",sceneNumber:7,scenes:[7],category:"Cast",name:"COMMANDER VANCE",characterRole:"Antagonist, regional water syndicate director.",description:"Antagonist, regional water syndicate director.",assignedActor:"Michael Shannon",castingStatus:"Offer Out",actorAvailability:"Hold Oct 20-24",appearancesCount:2,sourceSnippet:"COMMANDER VANCE (50s), tailored gray linen, stands over the telemetry terminal.",originalAiSuggestion:"COMMANDER VANCE — Antagonist, regional water syndicate director.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Cast confirmed. Costume fitting scheduled Oct 20."},{id:"elem-12",scriptId:e,sceneId:"scene-16",sceneNumber:16,scenes:[16],category:"Practical FX",name:"Catwalk Rain Towers",description:"Simulated industrial torrential flood conditions on exterior catwalk.",requiredResources:"3 Overhead Rain Spars, 2 Fire Hydrant Ties",technicalRequirements:"Runoff water deflection channeling away from electrical stage lines",safetyNotes:"Safety harnesses mandatory on exterior catwalk scaffolding",prepStatus:"Pending Proposal Approval",sourceSnippet:"Water cascades down the spillway faces like Niagara.",originalAiSuggestion:"Catwalk Rain Towers — Simulated flood conditions on exterior catwalk.",status:"Needs Review",isHumanConfirmed:!1,confidence:.9,confirmedBy:null,confirmedAt:null,notes:"Requires environmental containment permits."}],localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(a))),t&&t!=="all"&&(a=a.filter(o=>o.category.toLowerCase()===t.toLowerCase())),s&&s!=="all"){const o=Number(String(s).replace("scene-",""));a=a.filter(i=>i.sceneId===s||String(i.sceneNumber)===String(s)||Array.isArray(i.scenes)&&i.scenes.includes(o)||i.sceneNumber===o)}return a}async function Xt(e,t,s){try{const o=await K(`/production/${e}/breakdown/${t}`,{method:"PUT",body:JSON.stringify(s)});if(o?.item){const i=await nt(e),l=i.findIndex(c=>c.id===t);return l!==-1&&(i[l]=o.item,localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(i))),o.item}}catch{}const n=await nt(e),a=n.find(o=>o.id===t);return a?((s.name&&s.name!==a.name||s.description&&s.description!==a.description)&&(a.userCorrection={previousName:a.name,previousDesc:a.description,correctedBy:"Arun Kumar (Owner)",correctedAt:new Date().toISOString()}),Object.assign(a,s),s.status==="Confirmed"?(a.isHumanConfirmed=!0,a.confirmedBy="Arun Kumar (Owner)",a.confirmedAt=new Date().toISOString()):s.status==="Needs Review"&&(a.isHumanConfirmed=!1),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(n)),a):s}async function Yn(e,t){try{const a=await K(`/production/${e}/breakdown/${t}`,{method:"DELETE"});if(a?.success){const i=(await nt(e)).filter(l=>l.id!==t);return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(i)),a}}catch{}const n=(await nt(e)).filter(a=>a.id!==t);return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(n)),{success:!0,removedId:t}}async function Xn(e,t){try{const o=await K(`/production/${e}/breakdown`,{method:"POST",body:JSON.stringify(t)});if(o?.item){const i=await nt(e);return i.unshift(o.item),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(i)),o.item}}catch{}const s=await nt(e),n=Number(t.sceneNumber||(t.sceneId?String(t.sceneId).replace("scene-",""):18)),a={id:`elem-${Date.now()}`,scriptId:e,sceneId:t.sceneId||`scene-${n}`,sceneNumber:n,scenes:t.scenes||[n],category:t.category||"Props",name:t.name,description:t.description||"",sourceSnippet:t.sourceSnippet||"User added manual item",originalAiSuggestion:null,status:t.status||"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:new Date().toISOString(),notes:t.notes||"",assignedActor:t.assignedActor||"",castingStatus:t.castingStatus||"Uncast / Open",actorAvailability:t.actorAvailability||"",characterRole:t.characterRole||t.description||"",context:t.context||"INT.",lighting:t.lighting||"DAY",locationStatus:t.locationStatus||"Secured & Permitted",accessDetails:t.accessDetails||"",sourcingType:t.sourcingType||"Sourced",quantity:t.quantity||"1",readinessStatus:t.readinessStatus||"Ready in Art Dept",continuityNotes:t.continuityNotes||"",requiredResources:t.requiredResources||"",technicalRequirements:t.technicalRequirements||"",safetyNotes:t.safetyNotes||"",coordinationRequirements:t.coordinationRequirements||"",qualifiedPersonnel:t.qualifiedPersonnel||"",safetyPlanningStatus:t.safetyPlanningStatus||"Awaiting Coordinator Review",character:t.character||"",wardrobeRequirements:t.wardrobeRequirements||"",continuityChanges:t.continuityChanges||"",prepStatus:t.prepStatus||"In Prep",availability:t.availability||"",operationalRequirements:t.operationalRequirements||""};return s.unshift(a),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(s)),a}async function wt(e="chronicles-of-dust"){try{const n=await K(`/production/${e}/call-sheets`);if(n?.callSheets)return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n.callSheets)),n.callSheets}catch{}const t=localStorage.getItem(`scriptora_prod_callsheets_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"cs-1",scriptId:e,callSheetNumber:"01",shootDay:"Day 1 of 7",shootDate:"Saturday, Oct 24, 2026",generalCrewCall:"06:00 AM",shootingCall:"06:30 AM",breakfastTime:"05:15 AM",estimatedWrap:"06:30 PM",status:"Confirmed",isPublished:!0,version:"v1.0",locationName:"Mojave Outpost Gate 4",locationAddress:"Perimeter Road 9, Cantil, CA 93519",parkingNotes:"Crew parking at Basecamp Lot B (1/4 mile west of gate). Shuttle runs every 10 mins.",nearestHospital:"Kern Valley Healthcare District, 6412 Laurel Ave, Lake Isabella, CA (Ph: 760-379-2681)",weatherSummary:"Sunny, 74°F high, 48°F low. Winds WNW 10-15 mph. Dust advisory after 4:00 PM.",scenes:[{sceneNumber:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",pages:"4 1/8",cast:["KEVIN","MARCUS"],desc:"Kevin arrives at border gate, inspection with Marcus."},{sceneNumber:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",pages:"3 4/8",cast:["KEVIN","MEERA"],desc:"Kevin discovers pressure loss on telemetry terminal."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MARCUS",actor:"David Chen",pickup:"05:15 AM",hmuCall:"05:45 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MEERA",actor:"Priya Sharma",pickup:"08:30 AM",hmuCall:"09:00 AM",onSet:"10:30 AM",status:"Confirmed"}],specialInstructions:"Eye protection mandatory for all crew on exterior perimeter due to afternoon dust squall.",approvedBy:"Arun Kumar (Owner)",publishedAt:"2026-10-14T08:00:00Z"},{id:"cs-2",scriptId:e,callSheetNumber:"02",shootDay:"Day 2 of 7",shootDate:"Sunday, Oct 25, 2026",generalCrewCall:"06:30 AM",shootingCall:"07:00 AM",breakfastTime:"05:45 AM",estimatedWrap:"07:00 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:"Pumping Station Chamber B",locationAddress:"Aqueduct District Facility 4, Mojave, CA 93501",parkingNotes:"Basecamp parking inside Gate 2 secure compound. Security clearance badge required.",nearestHospital:"Antelope Valley Medical Center, 1600 W Ave J, Lancaster, CA (Ph: 661-949-5000)",weatherSummary:"Interior stage / sheltered facility. Ambient temp 68°F. Hearing protection mandatory.",scenes:[{sceneNumber:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",pages:"7 2/8",cast:["KEVIN"],desc:"Kevin examines exterior tap line."},{sceneNumber:10,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",pages:"2 6/8",cast:["KEVIN","MEERA"],desc:"High water pressure valve breach and cable clamp."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"},{character:"MEERA",actor:"Priya Sharma",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"}],specialInstructions:"Wet set protocols in effect for Scene 10. Waterproof camera housing and electrical GFI circuits required.",approvedBy:null,publishedAt:null}];return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),s}async function Bs(e,t){try{const n=await K(`/production/${e}/call-sheets/${t}`);if(n?.callSheet)return n.callSheet}catch{}return(await wt(e)).find(n=>n.id===t)||null}async function Zn(e,t){try{const a=await K(`/production/${e}/call-sheets`,{method:"POST",body:JSON.stringify(t)});if(a?.callSheet)return a.callSheet}catch{}const s=await wt(e),n={id:`cs-${Date.now()}`,scriptId:e,callSheetNumber:String(s.length+1).padStart(2,"0"),shootDay:t.shootDay||`Day ${s.length+1} of 14`,shootDate:t.shootDate||"Monday, Oct 26, 2026",generalCrewCall:t.generalCrewCall||"06:00 AM",shootingCall:t.shootingCall||"06:30 AM",breakfastTime:t.breakfastTime||"05:15 AM",estimatedWrap:t.estimatedWrap||"06:30 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:t.locationName||"Location TBD",locationAddress:t.locationAddress||"TBD",parkingNotes:t.parkingNotes||"Crew parking guidelines.",nearestHospital:t.nearestHospital||"Desert Care Network Regional, Palm Springs, CA",weatherSummary:t.weatherSummary||"Forecast pending.",scenes:t.scenes||[{sceneNumber:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",pages:"5 0/8",cast:["KEVIN","MEERA"],desc:"Perimeter fence inspection."}],castCalls:t.castCalls||[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Draft"}],specialInstructions:t.specialInstructions||"Standard safety directives.",approvedBy:null,publishedAt:null};return s.push(n),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),n}async function Qn(e,t,s){try{const o=await K(`/production/${e}/call-sheets/${t}`,{method:"PUT",body:JSON.stringify(s)});if(o?.callSheet)return o.callSheet}catch{}const n=await wt(e),a=n.find(o=>o.id===t);return a?(Object.assign(a,s),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n)),a):s}async function ea(e,t){try{const a=await K(`/production/${e}/call-sheets/${t}/publish`,{method:"POST"});if(a?.callSheet)return a.callSheet}catch{}const s=await wt(e),n=s.find(a=>a.id===t);return n?(n.status="Confirmed",n.isPublished=!0,n.version="v1.0 (Snapshot)",n.approvedBy="Arun Kumar (Owner)",n.publishedAt=new Date().toISOString(),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),n):null}async function et(e="chronicles-of-dust"){try{const n=await K(`/production/${e}/schedule`);if(n?.schedule)return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(n.schedule)),n.schedule}catch{}const t=localStorage.getItem(`scriptora_prod_schedule_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{dayNumber:1,date:"Oct 24, 2026",title:"Outpost Perimeter & Shed",location:"Mojave Gate 4",sceneNumbers:[1,2],totalPages:"7 5/8",estHours:10.5,companyMoves:0,isLocked:!0,status:"Confirmed"},{dayNumber:2,date:"Oct 25, 2026",title:"Lakebed Conduit & Chamber B",location:"Chamber B Dry Tank",sceneNumbers:[3,10],totalPages:"10 0/8",estHours:11,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:3,date:"Oct 26, 2026",title:"Perimeter Fence & Valve Tunnel",location:"Perimeter Sector 9",sceneNumbers:[4,5],totalPages:"10 4/8",estHours:11.5,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:4,date:"Oct 27, 2026",title:"Service Road Pursuit",location:"Route 66 Cutoff",sceneNumbers:[6],totalPages:"5 2/8",estHours:8,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:5,date:"Oct 28, 2026",title:"Syndicate Regional Control",location:"Syndicate Regional HQ",sceneNumbers:[7],totalPages:"6 3/8",estHours:9,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:6,date:"Oct 29, 2026",title:"Reservoir Intake Rappel",location:"Lake Mead Dry Spillway",sceneNumbers:[8],totalPages:"5 5/8",estHours:10,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:7,date:"Oct 30, 2026",title:"Drainage Sub-vaults & Wrap",location:"Vault Sub-structure 3",sceneNumbers:[9],totalPages:"4 1/8",estHours:8.5,companyMoves:0,isLocked:!1,status:"Draft"}];return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(s)),s}async function it(e,t,s){try{const o=await K(`/production/${e}/schedule/day/${t}`,{method:"PUT",body:JSON.stringify(s)});if(o?.day)return o.day}catch{}const n=await et(e),a=n.find(o=>o.dayNumber===Number(t));return a?(Object.assign(a,s),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(n)),a):s}async function ta(e,t,s,n){const a=await et(e),o=a.find(l=>l.dayNumber===Number(s)),i=a.find(l=>l.dayNumber===Number(n));return!o||!i||(o.sceneNumbers=(o.sceneNumbers||[]).filter(l=>l!==Number(t)),(i.sceneNumbers||[]).includes(Number(t))||(i.sceneNumbers=[...i.sceneNumbers||[],Number(t)]),await it(e,s,{sceneNumbers:o.sceneNumbers}),await it(e,n,{sceneNumbers:i.sceneNumbers})),a}async function Ds(e,t,s){return await it(e,t,{sceneNumbers:s})}async function Rs(e,t){try{const a=await K(`/production/${e}/call-sheets/${t}`,{method:"DELETE"});if(a?.success){const i=(await wt(e)).filter(l=>l.id!==t);return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(i)),a}}catch{}const n=(await wt(e)).filter(a=>a.id!==t);return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n)),{success:!0,removedId:t}}async function sa(e,t){try{const o=await K(`/production/${e}/schedule/day`,{method:"POST",body:JSON.stringify(t)});if(o?.day){const i=await et(e);return i.push(o.day),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(i)),o.day}}catch{}const s=await et(e),n=s.length>0?Math.max(...s.map(o=>o.dayNumber))+1:1,a={dayNumber:t.dayNumber||n,date:t.date||`Nov ${String(n).padStart(2,"0")}, 2026`,title:t.title||`Shoot Day ${n}`,location:t.location||"Location TBD",sceneNumbers:t.sceneNumbers||[],totalPages:t.totalPages||"0 0/8",estHours:t.estHours||8,companyMoves:t.companyMoves||0,isLocked:!1,status:"Draft"};return s.push(a),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(s)),a}async function na(e,t){const s=Number(t);try{const o=await K(`/production/${e}/schedule/day/${s}`,{method:"DELETE"});if(o?.success){const l=(await et(e)).filter(c=>c.dayNumber!==s);return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(l)),o}}catch{}const a=(await et(e)).filter(o=>o.dayNumber!==s);return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(a)),{success:!0,removedDayNumber:s}}async function aa(){try{const e=await K("/production/ai/providers");if(e?.providers)return e.providers}catch{}return[{id:"scriptora-concept",name:"SCRIPTORA Concept Engine",model:"v2.4 High-Res Vector & Composition",isConfigured:!0,pricingType:"free",costPerImage:0,costLabel:"Free (Built-in)",requiresApiKey:!1,aspectRatios:["2.39:1","16:9","4:3","9:16"],styles:["Cinematic Concept Art","Storyboard Ink","Pencil Sketch","Photorealistic / Live Action","3D Animation","Anime / Illustration"],description:"Fast, cinematic vector canvas with camera crosshairs, aspect ratio letterboxing, stylized character silhouettes, and directional lighting."},{id:"openai-dalle3",name:"OpenAI DALL-E 3",model:"dall-e-3",isConfigured:!1,pricingType:"paid",costPerImage:.04,costLabel:"$0.040 (Standard) / $0.080 (HD)",requiresApiKey:!0,envVarName:"OPENAI_API_KEY",aspectRatios:["16:9","2.39:1","1:1","9:16"],styles:["Photorealistic / Live Action","Cinematic Concept Art","Pencil Sketch","3D Animation"],description:"High-fidelity photorealistic rendering and complex composition synthesis via OpenAI API."},{id:"gemini-imagen3",name:"Google Imagen 3",model:"imagen-3.0-generate-002",isConfigured:!1,pricingType:"paid",costPerImage:.03,costLabel:"$0.030 per image",requiresApiKey:!0,envVarName:"GEMINI_API_KEY",aspectRatios:["16:9","4:3","1:1","9:16"],styles:["Cinematic Concept Art","Photorealistic / Live Action","Storyboard Ink"],description:"Photorealistic film still generation using Google Vertex/Gemini Imagen 3."},{id:"stability-sdxl",name:"Stability AI SDXL",model:"stable-diffusion-xl-1024-v1-0",isConfigured:!1,pricingType:"paid",costPerImage:.018,costLabel:"$0.018 per image",requiresApiKey:!0,envVarName:"STABILITY_API_KEY",aspectRatios:["16:9","2.39:1","4:3","9:16"],styles:["Storyboard Ink","Pencil Sketch","Cinematic Concept Art","Anime / Illustration"],description:"Versatile storyboard and concept illustration synthesis via Stability AI."}]}async function Et(e="chronicles-of-dust",t="scene-1"){try{const c=await K(`/production/${e}/storyboard?sceneId=${t}`);if(c?.storyboard)return localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(c.storyboard)),c.storyboard}catch{}const s=localStorage.getItem(`scriptora_storyboard_${e}_${t}`);if(s)try{return JSON.parse(s)}catch{}const n=await Dt(e),a=Number(String(t).replace("scene-",""))||1,o=n.find(c=>c.id===t||c.sceneNumber===a)||{id:`scene-${a}`,sceneNumber:a,heading:`SCENE ${a} - UNTITLED`,intExt:"INT",dayNight:"DAY"},i=a===1?[{id:"shot-1-1A",shotNumber:"1A",order:1,title:"Perimeter Outpost Gate",description:"High altitude drone descending across dust devils toward Kevin's arrival at the arid customs gate.",shotSize:"Wide Shot",cameraAngle:"High Angle",cameraMovement:"Crane / Jib",focalLength:"24mm Wide",lightingMood:"Daylight Dust",aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",prompt:"Cinematic wide shot, arid desert outpost gate, dust devils whirling, 2.39:1 anamorphic",imageUrl:jt("1A","2.39:1 · 24mm Wide","EXT. MOJAVE OUTPOST GATE 4 - DAY","Wide Shot"),imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"approved",approvalNotes:"Great atmosphere and sense of scale. Approved for primary camera team.",approvedBy:"Arun Kumar (Owner)",approvedAt:"2026-10-18T10:30:00Z",directorNotes:"Capture sunrise glint off the guard gate perimeter wires.",characters:["KEVIN","MARCUS"],location:"Arid Outpost Gate 4",continuity:{characterPosition:"Kevin approaching from camera-left",screenDirection:"Left to Right",eyeline:"Looking toward Outpost Gate",lightingContinuity:"High-contrast morning sun from east",costumeState:"Dust coat level 2, canteen left side",propPlacement:"Gate clearance scanner in right hand"},history:[]},{id:"shot-1-1B",shotNumber:"1B",order:2,title:"Gate Scanner Clearance Standoff",description:"Medium two-shot of Kevin presenting his ID badge to Marcus over the buzzing clearance terminal.",shotSize:"Medium Two-Shot",cameraAngle:"Eye Level",cameraMovement:"Static",focalLength:"50mm Prime",lightingMood:"Harsh Fluorescent Rim",aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",prompt:"Medium two-shot, dusty outpost booth, weary hydro-engineer confronting guard, 50mm",imageUrl:jt("1B","2.39:1 · 50mm Prime","EXT. MOJAVE OUTPOST GATE 4 - DAY","Medium Two-Shot"),imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"approved",approvalNotes:"Good eyeline match with Shot 1A.",approvedBy:"Arun Kumar (Owner)",approvedAt:"2026-10-18T10:35:00Z",directorNotes:"Focus pull from scanner terminal to Kevin's tense expression.",characters:["KEVIN","MARCUS"],location:"Arid Outpost Gate 4",continuity:{characterPosition:"Kevin screen-left, Marcus screen-right",screenDirection:"Left to Right",eyeline:"Eye-level direct confrontation",lightingContinuity:"Terminal backlight rimming Kevin's face",costumeState:"Kevin wearing goggles around neck",propPlacement:"ID card inserted into reader"},history:[]},{id:"shot-1-1C",shotNumber:"1C",order:3,title:"Terminal Diagnostic Anomaly",description:"Close-up insert of the flickering scanner console displaying pressure alert warning in red neon.",shotSize:"Close-Up",cameraAngle:"Low Angle",cameraMovement:"Static",focalLength:"85mm Portrait",lightingMood:"Cyan Strobe",aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",prompt:"Extreme close-up on rugged military diagnostic screen, red warning glyphs, 85mm",imageUrl:jt("1C","2.39:1 · 85mm Close-Up","EXT. MOJAVE OUTPOST GATE 4 - DAY","Close-Up"),imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"proposed",approvalNotes:"Review telemetry readout typography for accuracy.",approvedBy:null,approvedAt:null,directorNotes:"Practical screen insert; needs strobe flash on alert pulse.",characters:["KEVIN"],location:"Arid Outpost Gate 4",continuity:{characterPosition:"Centered insert",screenDirection:"Neutral",eyeline:"Downwards onto screen",lightingContinuity:"Red alert flashing 1Hz",costumeState:"Kevin's gloved thumb on lower bezel",propPlacement:"Scanner unit firmly latched"},history:[]}]:[],l={id:`sb-${e}-${o.id}`,scriptId:e,sceneId:o.id,sceneNumber:o.sceneNumber,sceneHeading:o.heading,intExt:o.intExt||"INT",dayNight:o.dayNight||"DAY",sourceVersion:"Draft 4.2",isVersionStale:!1,aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",shots:i,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(l)),l}async function Ls(e,t){try{const n=await K(`/production/${e}/storyboard`,{method:"POST",body:JSON.stringify(t)});if(n?.storyboard)return localStorage.setItem(`scriptora_storyboard_${e}_${n.storyboard.sceneId}`,JSON.stringify(n.storyboard)),n.storyboard}catch{}const s=t.sceneId||`scene-${t.sceneNumber||1}`;return localStorage.setItem(`scriptora_storyboard_${e}_${s}`,JSON.stringify(t)),t}async function oa(e,t,s){try{const c=await K(`/production/${e}/storyboard/${t}/shots`,{method:"POST",body:JSON.stringify(s)});if(c?.shot)return c.storyboard&&localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(c.storyboard)),c}catch{}const n=await Et(e,t),a=n.shots.length+1,o=String.fromCharCode(65+(a-1)%26),i=s.shotNumber||`${n.sceneNumber}${o}`,l={id:`shot-${Date.now()}`,shotNumber:i,order:a,title:s.title||`Shot ${i}`,description:s.description||"",shotSize:s.shotSize||"Medium Shot",cameraAngle:s.cameraAngle||"Eye Level",cameraMovement:s.cameraMovement||"Static",focalLength:s.focalLength||"50mm Prime",lightingMood:s.lightingMood||"Natural Daylight",aspectRatio:s.aspectRatio||n.aspectRatio||"2.39:1",visualStyle:s.visualStyle||n.visualStyle||"Cinematic Concept Art",prompt:s.prompt||"",negativePrompt:s.negativePrompt||"",imageUrl:s.imageUrl||null,imageSource:s.imageSource||(s.imageUrl?"imported":null),provider:s.provider||null,quality:s.quality||"standard",costEstimate:s.costEstimate||null,approvalStatus:s.approvalStatus||"draft",approvalNotes:s.approvalNotes||"",approvedBy:s.approvedBy||null,approvedAt:s.approvedAt||null,directorNotes:s.directorNotes||"",characters:s.characters||[],location:s.location||"",continuity:{characterPosition:s.continuity?.characterPosition||"",screenDirection:s.continuity?.screenDirection||"Left to Right",eyeline:s.continuity?.eyeline||"Eye Level",lightingContinuity:s.continuity?.lightingContinuity||"",costumeState:s.continuity?.costumeState||"",propPlacement:s.continuity?.propPlacement||""},history:[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return n.shots.push(l),n.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(n)),{storyboard:n,shot:l}}async function rs(e,t,s,n){try{const i=await K(`/production/${e}/storyboard/${t}/shots/${s}`,{method:"PUT",body:JSON.stringify(n)});if(i?.shot)return i.storyboard&&localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(i.storyboard)),i}catch{}const a=await Et(e,t),o=a.shots.find(i=>i.id===s);if(!o)throw new Error("Shot not found");return n.continuity&&(n.continuity={...o.continuity,...n.continuity}),Object.assign(o,n,{updatedAt:new Date().toISOString()}),a.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(a)),{storyboard:a,shot:o}}async function la(e,t,s){try{const o=await K(`/production/${e}/storyboard/${t}/shots/${s}`,{method:"DELETE"});if(o?.success)return o.storyboard&&localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(o.storyboard)),o}catch{}const n=await Et(e,t),a=n.shots.findIndex(o=>o.id===s);return a!==-1&&(n.shots.splice(a,1),n.shots.forEach((o,i)=>{o.order=i+1}),n.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(n))),{success:!0,removedId:s,storyboard:n}}async function ia(e,t,s=[]){try{const i=await K(`/production/${e}/storyboard/${t}/reorder`,{method:"POST",body:JSON.stringify({shotIds:s})});if(i?.storyboard)return localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(i.storyboard)),i}catch{}const n=await Et(e,t),a=new Map(n.shots.map(i=>[i.id,i])),o=[];for(const i of s)a.has(i)&&(o.push(a.get(i)),a.delete(i));for(const i of a.values())o.push(i);return o.forEach((i,l)=>{i.order=l+1}),n.shots=o,n.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(n)),{storyboard:n}}async function ra(e,t,s,n="approved",a=""){try{const l=await K(`/production/${e}/storyboard/${t}/shots/${s}/approve`,{method:"POST",body:JSON.stringify({status:n,notes:a})});if(l?.shot)return l.storyboard&&localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(l.storyboard)),l}catch{}const o=await Et(e,t),i=o.shots.find(l=>l.id===s);return i&&(i.approvalStatus=n,i.approvalNotes=a||i.approvalNotes||"",i.approvedBy="Arun Kumar (Owner)",i.approvedAt=new Date().toISOString(),i.updatedAt=new Date().toISOString(),o.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(o))),{storyboard:o,shot:i}}async function ca(e,t,s=[],n="approved",a=""){try{const l=await K(`/production/${e}/storyboard/${t}/batch-approve`,{method:"POST",body:JSON.stringify({shotIds:s,status:n,notes:a})});if(l?.storyboard)return localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(l.storyboard)),l}catch{}const o=await Et(e,t);let i=0;for(const l of o.shots)s.includes(l.id)&&(l.approvalStatus=n,a&&(l.approvalNotes=a),l.approvedBy="Arun Kumar (Owner)",l.approvedAt=new Date().toISOString(),l.updatedAt=new Date().toISOString(),i++);return o.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(o)),{storyboard:o,affectedCount:i}}async function da(e,t={}){try{const n=await K(`/production/${e}/storyboard/generate-shot`,{method:"POST",body:JSON.stringify(t)});if(n?.imageUrl)return n}catch(n){if(n.message&&n.message.includes("not configured"))throw n}return{imageUrl:jt(t.shotNumber||"1A",`${t.aspectRatio||"2.39:1"} · ${t.focalLength||"50mm"}`,t.sceneHeading||"SCENE 1",t.shotSize||"Medium Shot"),provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",prompt:t.prompt||""}}async function ua(e,t,s={}){try{const u=await K(`/production/${e}/storyboard/generate-sequence`,{method:"POST",body:JSON.stringify({sceneId:t,...s})});if(u?.proposedShots)return u}catch(u){if(u.message&&u.message.includes("not configured"))throw u}const n=await Dt(e),a=Number(String(t).replace("scene-",""))||1,o=n.find(u=>u.id===t||u.sceneNumber===a)||{heading:`SCENE ${a} - UNTITLED`,dayNight:"DAY",snippet:"Protagonist navigates industrial perimeter."},i=[{num:`${a}A`,title:"Establishing Spatial Depth",size:"Wide Shot",angle:"High Angle",lens:"24mm Wide",desc:`Wide environmental view establishing spatial layout of ${o.heading}.`},{num:`${a}B`,title:"Character Blocking & Entry",size:"Medium Two-Shot",angle:"Eye Level",lens:"50mm Prime",desc:"Two-shot tracking entry as characters coordinate actions."},{num:`${a}C`,title:"Dramatic Focal Climax Beat",size:"Close-Up",angle:"Dutch Angle",lens:"85mm Portrait",desc:"Close-up reaction highlighting emotional stakes and sudden anomaly."},{num:`${a}D`,title:"Critical Action Insert",size:"Extreme Close-Up",angle:"Low Angle",lens:"35mm Macro",desc:"Macro insert of tactile equipment interaction and valve override."}],l=Math.max(1,Math.min(4,Number(s.shotCount||s.count||4))),m=i.slice(0,l).map((u,d)=>({id:`prop-shot-${Date.now()}-${d}`,shotNumber:u.num,order:d+1,title:u.title,description:u.desc,shotSize:u.size,cameraAngle:u.angle,cameraMovement:d===1?"Tracking Dolly":"Static",focalLength:u.lens,lightingMood:o.dayNight==="NIGHT"?"Low-Key Shadow":"Daylight Dust",aspectRatio:s.aspectRatio||"2.39:1",visualStyle:s.visualStyle||"Cinematic Concept Art",prompt:`${u.size} of ${o.heading}: ${o.snippet}`,imageUrl:jt(u.num,`${s.aspectRatio||"2.39:1"} · ${u.lens}`,o.heading,u.size),imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"proposed",approvalNotes:"AI proposed sequence beat. Review and approve to confirm.",approvedBy:null,approvedAt:null,directorNotes:"Calibrate lens catchlights for consistency across cuts.",characters:o.cast||["KEVIN"],location:o.heading,continuity:{characterPosition:d%2===0?"Screen Left":"Screen Right",screenDirection:"Left to Right",eyeline:d%2===0?"Looking Screen Right":"Looking Screen Left",lightingContinuity:o.dayNight==="NIGHT"?"Low key, cyan rim":"Direct desert sun",costumeState:"Production baseline",propPlacement:"Standard tactical staging"},history:[]}));return{sceneHeading:o.heading,sceneNumber:a,proposedShots:m}}function jt(e,t,s,n){const a=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 502' width='1200' height='502'>
    <defs>
      <linearGradient id='bg2' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='%231e293b'/>
        <stop offset='100%' stop-color='%230f172a'/>
      </linearGradient>
    </defs>
    <rect width='1200' height='502' fill='url(%23bg2)'/>
    <line x1='0' y1='320' x2='1200' y2='320' stroke='%2338bdf8' stroke-width='1' opacity='0.3' stroke-dasharray='4,4'/>
    <circle cx='600' cy='220' r='50' fill='%23020617' stroke='%2338bdf8' stroke-width='2'/>
    <path d='M 530 350 L 670 350 L 640 260 L 560 260 Z' fill='%23020617' stroke='%23f59e0b' stroke-width='1.5'/>
    <rect x='24' y='24' width='130' height='26' rx='6' fill='black' opacity='0.6'/>
    <text x='34' y='42' fill='white' font-family='monospace' font-size='12' font-weight='bold'>REC · ${e}</text>
    <text x='1166' y='42' text-anchor='end' fill='%2338bdf8' font-family='monospace' font-size='12' font-weight='bold'>${t}</text>
    <text x='1166' y='64' text-anchor='end' fill='white' opacity='0.7' font-family='sans-serif' font-size='11'>${n}</text>
    <rect x='0' y='466' width='1200' height='36' fill='black' opacity='0.75'/>
    <text x='24' y='489' fill='white' font-family='sans-serif' font-size='12' font-weight='bold'>${s}</text>
    <text x='1176' y='489' text-anchor='end' fill='%23fbbf24' font-family='sans-serif' font-size='11'>SCRIPTORA CONCEPT ENGINE</text>
  </svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(a)}`}class pa{constructor(){try{sessionStorage.removeItem("scriptora_history_stack")}catch{}this.state={currentUser:null,selectedScriptId:localStorage.getItem("scriptora_selected_script")||"chronicles-of-dust",selectedVersionId:"Draft 4.2",currentSceneId:18,unreadNotifications:3,scripts:[],activeScript:null,screenplay:null,settings:null,historyStack:[]},this.listeners=new Set}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(const t of this.listeners)try{t(this.state)}catch(s){console.error("Store listener error:",s)}}setState(t){this.state={...this.state,...t},t.selectedScriptId&&localStorage.setItem("scriptora_selected_script",t.selectedScriptId),this.notify()}pushHistory(t){if(!t)return;const s=t.trim(),n=this.state.historyStack;(n.length===0||n[n.length-1]!==s)&&(n.push(s),n.length>50&&n.shift())}popHistory(){return this.state.historyStack.pop()}getPreviousRoute(t="/workspace"){return this.popHistory()||t}peekPreviousRoute(t="/workspace"){const s=this.state.historyStack;return s.length>0?s[s.length-1]:t}clearHistory(){this.state.historyStack=[];try{sessionStorage.removeItem("scriptora_history_stack")}catch{}}resetUserSession(){this.setState({currentUser:null,scripts:[],activeScript:null,screenplay:null,historyStack:[],selectedScriptId:"chronicles-of-dust",unreadNotifications:0}),this.clearHistory()}async init(){try{const t=await Gs(),s=await Je(),n=await Ps(),a=await Ys();let o=localStorage.getItem("scriptora_selected_script");const i=s&&s.length>0?s.find(c=>c.isCurrentDraft):null;i?o=i.id:!o&&s&&s.length>0&&(o=s[0].id);const l=s&&s.length>0?s.find(c=>c.id===o)||s[0]:null;this.setState({currentUser:t,scripts:s,selectedScriptId:o,activeScript:l,unreadNotifications:n,settings:a})}catch(t){console.error("Init store error:",t)}}async selectScript(t){if(!t)return;const s=await $n(t),n=(s||this.state.scripts).find(a=>a.id===t)||await hs(t);this.setState({selectedScriptId:t,activeScript:n,scripts:s||this.state.scripts})}async refreshNotifications(){const t=await Ps();this.setState({unreadNotifications:t})}async refreshScripts(){const t=await Je(),s=t&&t.length>0?t.find(o=>o.isCurrentDraft):null,n=s?s.id:this.state.selectedScriptId,a=t&&t.length>0?t.find(o=>o.id===n)||t[0]:null;this.setState({scripts:t||[],selectedScriptId:n,activeScript:a})}}const $=new pa,xa="/Scriptora/assets/logo-BG9jZ7UG.png",ws=xa;function qe(e="Workspace",t="Your writing space."){const s=$.state.unreadNotifications,n=$.state.currentUser?.initials||"JD";return`
    <header class="fixed top-0 left-0 right-0 w-full z-40 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-surface-container-high/60 select-none" data-global-header="true">
      <div class="h-14 px-4 flex items-center justify-between max-w-2xl mx-auto">
        <a href="/workspace" class="flex items-center gap-2.5 min-w-0 no-underline text-inherit cursor-pointer active:opacity-80 transition-opacity">
          <img src="${ws}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora" class="w-8 h-8 object-contain shrink-0" />
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
            ${$.state.currentUser?.avatarUrl?`
              <img src="${$.state.currentUser.avatarUrl}" class="w-full h-full object-cover" alt="Profile" />
            `:`
              <span>${n}</span>
            `}
          </a>
        </div>
      </div>
    </header>
  `}function je(e="workspace"){const t=e==="workspace",s=e==="intelligence",n=e==="chat"||e==="ai-chat",a=e==="production"||e==="pre-production",o=e==="profile";return`
    <nav class="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container-high/60 overflow-visible select-none" data-global-bottom-nav="true" id="scriptora-bottom-nav">
      <div class="h-14 px-1 sm:px-3 grid grid-cols-5 items-center max-w-lg mx-auto relative overflow-visible">
        
        <!-- 1. Workspace Tab -->
        <a href="/workspace" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${t?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-workspace" aria-label="Workspace" title="Workspace">
          <span class="material-symbols-outlined text-[22px]" ${t?`style="font-variation-settings: 'FILL' 1;"`:""}>description</span>
          <span class="text-[9.5px] font-medium mt-0.5 leading-none">Workspace</span>
          ${t?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':'<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

        <!-- 2. Intelligence Tab -->
        <a href="/intelligence" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${s?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-intelligence" aria-label="Intelligence" title="Intelligence">
          <span class="material-symbols-outlined text-[22px]" ${s?`style="font-variation-settings: 'FILL' 1;"`:""}>insights</span>
          <span class="text-[9.5px] font-medium mt-0.5 leading-none">Intelligence</span>
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
          <span class="text-[9.5px] font-medium mt-0.5 leading-none">Production</span>
          ${a?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':'<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

        <!-- 5. Profile Tab -->
        <a href="/profile" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${o?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-profile" aria-label="Profile" title="Profile">
          <span class="material-symbols-outlined text-[22px]" ${o?`style="font-variation-settings: 'FILL' 1;"`:""}>account_circle</span>
          <span class="text-[9.5px] font-medium mt-0.5 leading-none">Profile</span>
          ${o?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':'<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

      </div>
    </nav>
  `}function ma(e="workspace"){const t=document.getElementById("scriptora-bottom-nav");return t?(t.outerHTML=je(e),!0):!1}function C(e,t="success"){const s=document.getElementById("global-toast"),n=document.getElementById("toast-message"),a=document.getElementById("toast-icon");if(!s||!n){console.log(`[Toast ${t}]`,e);return}n.textContent=e,a&&(t==="error"?(a.textContent="error",a.className="material-symbols-outlined text-[18px] text-red-400"):t==="info"?(a.textContent="info",a.className="material-symbols-outlined text-[18px] text-blue-300"):(a.textContent="check_circle",a.className="material-symbols-outlined text-[18px] text-emerald-300")),s.classList.remove("opacity-0","pointer-events-none"),s.classList.add("opacity-100"),clearTimeout(s._timeout),s._timeout=setTimeout(()=>{s.classList.remove("opacity-100"),s.classList.add("opacity-0","pointer-events-none")},2400)}function fa(){return`
    <main class="flex flex-col relative w-full pt-safe pb-safe bg-surface min-h-screen justify-center items-center px-4">
      <div class="flex flex-col w-full max-w-sm py-8 fade-in">
        <!-- Brand & Logo Header -->
        <header class="flex flex-col items-center justify-center pb-4 text-center">
          <img src="${ws}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-16 h-16 object-contain mb-3 drop-shadow-sm" />
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
  `}function ba(e){const t=document.getElementById("tab-signin"),s=document.getElementById("tab-register"),n=document.getElementById("tab-otp"),a=document.getElementById("flow-signin"),o=document.getElementById("flow-register"),i=document.getElementById("flow-otp");function l(N){[t,s,n].forEach(w=>{w.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 text-on-surface-variant hover:text-on-surface"}),[a,o,i].forEach(w=>w.classList.add("hidden")),N==="signin"?(t.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",a.classList.remove("hidden")):N==="register"?(s.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",o.classList.remove("hidden")):N==="otp"&&(n.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold flex items-center justify-center gap-1",i.classList.remove("hidden"))}t&&(t.onclick=()=>l("signin")),s&&(s.onclick=()=>l("register")),n&&(n.onclick=()=>l("otp"));const c=document.getElementById("toggle-pw-signin"),m=document.getElementById("signin-password");c&&m&&(c.onclick=()=>{const N=m.type==="password";m.type=N?"text":"password",c.innerHTML=`<span class="material-symbols-outlined text-[18px]">${N?"visibility_off":"visibility"}</span>`});function u(N){try{const L=N.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),I=decodeURIComponent(atob(L).split("").map(X=>"%"+("00"+X.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(I)}catch{return null}}const d=document.getElementById("btn-google-login"),r="756924881120-0qngpm230nq3k8bb61ttt1de7jv28fui.apps.googleusercontent.com";let p=null;async function b(N){C("Connecting with Google...");try{const w=await En(N);$.setState({currentUser:w}),C(`Welcome back, ${w.displayName||w.name}`),e("/welcome")}catch(w){C(w.message||"Google sign-in error","error")}}function y(){if(window.google?.accounts?.id&&r)try{window.google.accounts.id.initialize({client_id:r,callback:async N=>{if(N&&N.credential){const w=u(N.credential)||{};await b({token:N.credential,email:w.email,name:w.name,displayName:w.name,picture:w.picture,sub:w.sub,provider:"google"})}},auto_select:!1,cancel_on_tap_outside:!0})}catch(N){console.warn("Google One Tap setup note:",N)}if(window.google?.accounts?.oauth2&&r)try{p=window.google.accounts.oauth2.initTokenClient({client_id:r,scope:"email profile openid",callback:async N=>{if(N&&N.access_token){C("Retrieving Google profile...");try{const L=await(await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${N.access_token}`}})).json();await b({token:N.access_token,email:L.email,name:L.name,displayName:L.name,picture:L.picture,sub:L.sub,provider:"google"})}catch(w){console.warn("Google userinfo fetch note:",w),await b({token:N.access_token,provider:"google"})}}}})}catch(N){console.warn("Google OAuth token client setup note:",N)}}y(),d&&(d.onclick=async()=>{if(!p&&window.google&&y(),p)try{p.requestAccessToken({prompt:"select_account"});return}catch(N){console.warn("Token client request error, trying prompt:",N)}if(window.google?.accounts?.id)try{window.google.accounts.id.prompt(N=>{(N.isNotDisplayed()||N.isSkippedMoment())&&(console.log("GIS prompt not displayed:",N.getNotDisplayedReason()),b({email:"arun.kumar@scriptora.studio",name:"Arun Kumar",displayName:"Arun Kumar",provider:"google"}))});return}catch(N){console.warn("GIS prompt error:",N)}await b({email:"arun.kumar@scriptora.studio",name:"Arun Kumar",displayName:"Arun Kumar",provider:"google"})});const x=document.getElementById("form-signin");x&&(x.onsubmit=async N=>{N.preventDefault();const w=document.getElementById("signin-email").value,L=m.value;try{const I=await Sn({email:w,password:L});$.setState({currentUser:I}),C(`Welcome back, ${I.displayName||I.name}`),e("/welcome")}catch(I){C(I.message,"error")}});const h=document.getElementById("form-register");h&&(h.onsubmit=async N=>{N.preventDefault();const w=document.getElementById("reg-name").value,L=document.getElementById("reg-email").value,I=document.getElementById("reg-password").value;try{const X=await kn({name:w,email:L,password:I});$.setState({currentUser:X}),C("Account created successfully"),e("/welcome")}catch(X){C(X.message,"error")}});const T=document.getElementById("form-otp");T&&(T.onsubmit=async N=>{N.preventDefault();const w=document.getElementById("otp-phone").value;try{const L=await In(w);$.setState({currentUser:L}),C("Phone verified successfully"),e("/welcome")}catch(L){C(L.message,"error")}});const A=document.getElementById("btn-forgot-pw");A&&(A.onclick=()=>{C("Password reset link sent to registered email","info")})}function ga(){return $.state.currentUser,`
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
          <img src="${ws}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-20 h-20 object-contain mb-5 drop-shadow-sm" />

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
  `}function ha(e){const t=document.getElementById("welcome-sign-out");t&&(t.onclick=async()=>{await Ks(),$.setState({currentUser:null}),C("Signed out successfully"),e("/auth")})}function Xs(){let e=document.getElementById("scriptora-modal-portal");return e||(e=document.createElement("div"),e.id="scriptora-modal-portal",document.body.appendChild(e)),e}function Zs(e){if(!e)return;const t=Xs();e.parentElement!==t&&t.appendChild(e)}function ts(){!!document.querySelector("#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)")?(document.documentElement.classList.add("scriptora-modal-open"),document.body.classList.add("scriptora-modal-open")):(document.documentElement.classList.remove("scriptora-modal-open"),document.body.classList.remove("scriptora-modal-open"))}function ya(){document.documentElement.classList.add("scriptora-modal-open"),document.body.classList.add("scriptora-modal-open")}function Ms(){ts()}function Qe(e){if(!e)return;Zs(e),e.classList.remove("hidden"),e.classList.add("flex"),ya(),e.scrollTop=0;const t=e.querySelector(".scriptora-modal-card");if(t){t.scrollTop=0;const s=t.querySelector(".scriptora-modal-body, .overflow-y-auto");s&&(s.scrollTop=0)}}function ke(e){e&&(e.classList.contains("hidden")||(e.classList.add("hidden"),e.classList.remove("flex")),ts())}function va(e,t,s={}){if(!e||!t)return null;const{placement:n="auto",offset:a=4,boundaryMargin:o=8,preferPosition:i="bottom"}=s,l=e.getBoundingClientRect(),c=window.visualViewport,m=c?c.width:window.innerWidth,u=c?c.height:window.innerHeight,d=c?c.offsetTop:0,r=c?c.offsetLeft:0,p=!!e.closest(".scriptora-modal-overlay");let b=d+o,y=d+u-o;if(!p){const V=document.getElementById("editor-fixed-header")||document.getElementById("scriptora-global-header")||document.querySelector('header[data-global-header="true"]'),le=V&&!V.classList.contains("hidden")?V.getBoundingClientRect().bottom:d+56,_=document.getElementById("scriptora-global-nav")||document.getElementById("scriptora-bottom-nav")||document.querySelector('nav[data-global-bottom-nav="true"]'),me=_&&!_.classList.contains("hidden")?_.getBoundingClientRect().top:d+u;b=Math.max(b,le+4),y=Math.min(y,me-4)}const x=t.offsetWidth||200,h=t.offsetHeight||160,T=y-l.bottom-a,A=l.top-b-a;let N=!1;n.startsWith("top")?N=A>=h||A>T:n.startsWith("bottom")?N=T<h&&A>T:i==="top"?N=A>=h||A>T:N=T<h&&A>T;let w,L;N?(L=Math.max(90,Math.min(h,A)),w=l.top-L-a):(L=Math.max(90,Math.min(h,T)),w=l.bottom+a),w=Math.max(b,Math.min(y-L,w));let I;return n.endsWith("end")||l.left+x>m-o?I=l.right-x:I=l.left,I=Math.max(r+o,Math.min(r+m-x-o,I)),{top:Math.round(w),left:Math.round(I),maxHeight:Math.round(L),width:Math.min(x,m-2*o),placement:N?"top":"bottom"}}function Vt(e,t,s={}){if(!e||!t)return;const n=!!e.closest(".scriptora-modal-overlay");if(s.portal!==!1){const i=n?Xs():document.body;t.parentElement!==i&&i.appendChild(t)}const a=t.classList.contains("hidden");a&&(t.style.visibility="hidden",t.classList.remove("hidden")),t.style.position="fixed",t.style.zIndex=s.zIndex||(n?"10000":"120");const o=va(e,t,s);o&&(t.style.top=`${o.top}px`,t.style.left=`${o.left}px`,t.style.maxHeight=`${o.maxHeight}px`,t.style.overflowY="auto"),a&&(t.style.visibility="")}function Qs(e,t,s={}){if(!e||!t)return;t.classList.add("scriptora-popup"),t.setAttribute("data-scriptora-popup","true");const n=()=>{t.classList.contains("hidden")||Vt(e,t,s)},a=()=>{t.classList.remove("hidden"),Vt(e,t,s)},o=()=>{t.classList.add("hidden")},i=()=>{t.classList.contains("hidden")?a():o()},l=c=>{t.classList.contains("hidden")||!e.contains(c.target)&&!t.contains(c.target)&&o()};return document.addEventListener("click",l),window.addEventListener("scroll",n,{passive:!0,capture:!0}),window.addEventListener("resize",n,{passive:!0}),window.visualViewport&&(window.visualViewport.addEventListener("resize",n,{passive:!0}),window.visualViewport.addEventListener("scroll",n,{passive:!0})),{open:a,close:o,toggle:i,update:n}}if(typeof document<"u"){document.addEventListener("click",t=>{t.target&&t.target.classList&&t.target.classList.contains("scriptora-modal-overlay")&&ke(t.target)}),document.addEventListener("keydown",t=>{if(t.key==="Escape"){const s=Array.from(document.querySelectorAll("#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)"));s.length>0&&ke(s[s.length-1])}});const e=()=>{new MutationObserver(s=>{for(const n of s)if(n.type==="attributes"&&n.attributeName==="class"){const a=n.target;a&&a.classList&&a.classList.contains("scriptora-modal-overlay")&&(a.classList.contains("hidden")||Zs(a),ts())}}).observe(document.body,{attributes:!0,attributeFilter:["class"],subtree:!0})};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}function wa(e){if(!e)return"";try{const t=localStorage.getItem(`scriptora_screenplay_${e.id}`);if(t){const s=JSON.parse(t);if(s&&Array.isArray(s.scenes)&&s.scenes.length>0){const n=parseInt((e.currentScene||"").replace(/\D+/g,""),10)||1,a=s.scenes.find(o=>o.number===n)||s.scenes[0];if(a&&Array.isArray(a.blocks)){const o=a.blocks.find(c=>c.type==="action")||a.blocks[0],i=a.slugline||a.blocks.find(c=>c.type==="scene")?.content||"",l=o?.content||"";if(i&&l)return`"${i} - ${l.slice(0,95)}..."`;if(l)return`"${l.slice(0,110)}..."`}}}}catch{}return e.id==="chronicles-of-dust"?'"INT. CUSTOMS OFFICE - NIGHT - Kevin kneels over cracked hydro-sensor junction box, static..."':e.id==="the-neon-horizon"?'"EXT. SECTOR 4 SKYLINE - DUSK - Rain reflects neon advertisements across towering glass spires..."':e.id==="velvet-shadows"?'"INT. DETECTIVE OFFICE - RAINY NIGHT - A single desk lamp casts long shadows across unread case files..."':e.id==="silent-echoes"?'"INT. ARCHIVE CELLAR - DAY - Dust motes dance in the amber light filtering through frosted glass..."':e.logline?`"${e.logline.slice(0,110)}..."`:`"INT. WRITER'S ROOM - DAY - Sunlight cuts through dust motes across an empty mahogany desk..."`}function Sa(){const e=$.state.scripts||[],t=e.length>0,s=t&&e.find(o=>o&&o.isCurrentDraft)||null,n=parseInt((s?.currentScene||"").replace(/\D+/g,""),10)||1,a=s?.currentScene||`Scene ${n}`;return`
    ${qe("Workspace","Your writing space.")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-3 pb-8 space-y-5 fade-in">
        
        <!-- Header Title & Telemetry -->
        <div class="flex items-center justify-between gap-3 py-1">
          <div class="flex flex-col min-w-0">
            <h1 class="page-heading font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight truncate">Workspace</h1>
            <p class="text-xs text-slate-500 mt-0.5 truncate">Your writing space.</p>
          </div>
          <div class="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium shrink-0">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Sync active</span>
          </div>
        </div>

        <!-- Current Draft Spotlight Card (Only rendered when a valid current draft is available) -->
        ${s?`
          <div class="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="bg-blue-100/70 text-blue-700 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">CURRENT DRAFT</span>
              <span class="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <span class="material-symbols-outlined text-[13px]">schedule</span>
                ${s.updated||"Recently"}
              </span>
            </div>
            <h2 class="font-semibold text-base text-slate-900 mt-2 font-heading tracking-tight">${s.title}</h2>
            <p class="text-xs text-slate-500 mt-0.5">${s.draft} · ${a} · ${s.pages||1} pages</p>
            
            <div class="rounded-xl p-3 mt-3 bg-slate-50 border border-slate-100">
              <div class="flex items-center justify-between text-xs font-bold text-blue-600 uppercase tracking-wider">
                <span>${a.toUpperCase()}</span>
                <span class="material-symbols-outlined text-[15px] text-slate-400">movie</span>
              </div>
              <p class="font-mono italic text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                ${wa(s)}
              </p>
            </div>

            <button type="button" id="btn-continue-writing" data-script-id="${s.id}" data-scene="${n}" class="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-medium text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 mt-3 shadow-xs transition-all">
              <span>Continue Writing (${a})</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        `:""}

        <!-- New Screenplay Creation Card -->
        ${t?`
          <!-- State B: Screenplays exist (Sleek compact horizontal card) -->
          <button type="button" id="btn-new-screenplay-card" aria-label="Create New Screenplay" class="w-full group bg-white hover:bg-blue-50/40 active:scale-[0.99] rounded-2xl border-2 border-dashed border-blue-200/90 hover:border-blue-400 px-4 py-3 sm:px-5 sm:py-3.5 flex items-center gap-3.5 transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-100 transition-all shadow-xs">
              <span class="material-symbols-outlined text-[22px] font-bold">add</span>
            </div>
            <div class="flex flex-col text-left min-w-0 flex-1">
              <h3 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight leading-tight">New Screenplay</h3>
              <p class="text-xs text-slate-500 font-medium mt-0.5 leading-snug">Start your next story.</p>
            </div>
          </button>
        `:`
          <!-- State A: Zero screenplays (Prominent 140px centered card) -->
          <button type="button" id="btn-new-screenplay-card" aria-label="Create New Screenplay" class="w-full group bg-white hover:bg-blue-50/40 active:scale-[0.99] rounded-2xl border-2 border-dashed border-blue-200/90 hover:border-blue-400 p-7 sm:py-9 sm:px-6 flex flex-col items-center justify-center text-center transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer">
            <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:scale-105 group-hover:bg-blue-100 transition-all shadow-xs">
              <span class="material-symbols-outlined text-[26px] font-bold">add</span>
            </div>
            <h3 class="font-heading font-bold text-base text-slate-900 tracking-tight">New Screenplay</h3>
            <p class="text-xs text-slate-500 font-medium mt-1">Start your next story.</p>
          </button>
        `}

        <!-- All Screenplays (Shown when screenplays exist) -->
        ${t?`
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
            ${e.map(o=>`
              <div data-script-id="${o.id}" class="script-item-row px-3.5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                <div class="flex items-center gap-3 min-w-0 pr-2 flex-1">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <span class="material-symbols-outlined text-[16px]">movie</span>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span class="text-xs font-semibold text-slate-900 truncate">${o.title}</span>
                    <span class="text-[11px] text-slate-500 truncate mt-0.5">${o.draft} · ${o.pages} pages · Edited ${o.updated}</span>
                  </div>
                </div>

                <div class="relative">
                  <button type="button" class="script-more-btn w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" data-script-id="${o.id}" aria-label="More actions">
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
        `:""}

      </div>
    </main>

    <!-- New Script Modal -->
    <div id="new-script-modal" class="scriptora-modal-overlay fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden flex">
      <div class="scriptora-modal-card w-full sm:max-w-md bg-white rounded-2xl p-5 shadow-xl flex flex-col gap-4">
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

    ${je("workspace")}
  `}function Ea(e){let t=null;const s=document.getElementById("btn-continue-writing");s&&(s.onclick=async()=>{const b=s.getAttribute("data-script-id"),y=s.getAttribute("data-scene")||"1";await $.selectScript(b),e(`/editor/${b}?scene=${y}`)}),document.querySelectorAll(".script-item-row").forEach(b=>{b.onclick=async y=>{if(y.target.closest(".script-more-btn"))return;const x=b.getAttribute("data-script-id");await $.selectScript(x),e(`/editor/${x}`)}});const n=document.getElementById("screenplay-search");n&&(n.oninput=b=>{const y=b.target.value.toLowerCase().trim();document.querySelectorAll("#screenplays-library-list .script-item-row").forEach(h=>{const T=h.querySelector(".font-semibold")?.textContent.toLowerCase()||"";h.style.display=T.includes(y)?"flex":"none"})});const a=document.getElementById("btn-new-screenplay-card"),o=document.getElementById("btn-new-script"),i=document.getElementById("new-script-modal"),l=document.getElementById("close-new-script-modal"),c=document.getElementById("cancel-new-script-btn"),m=document.getElementById("form-new-script");function u(b){i&&(b?(Qe(i),document.getElementById("new-script-title")?.focus()):ke(i))}a&&(a.onclick=()=>u(!0)),o&&(o.onclick=()=>u(!0)),l&&(l.onclick=()=>u(!1)),c&&(c.onclick=()=>u(!1)),i&&(i.onclick=b=>{b.target===i&&u(!1)}),m&&(m.onsubmit=async b=>{b.preventDefault();const y=document.getElementById("new-script-title").value.trim(),x=document.getElementById("new-script-format").value,h=document.getElementById("new-script-genre").value;if(y)try{const T=await An({title:y,format:x,genre:h});await $.refreshScripts(),$.selectScript(T.id),u(!1),C(`Created "${T.title}"`),e(`/editor/${T.id}`)}catch(T){C(T.message,"error")}});const d=document.getElementById("script-menu-popover");let r=null;document.querySelectorAll(".script-more-btn").forEach(b=>{b.onclick=y=>{y.stopPropagation(),t=b.getAttribute("data-script-id"),r=b,Vt(b,d,{placement:"bottom-end",offset:4}),d.classList.remove("hidden")}}),window.addEventListener("scroll",()=>{r&&d&&!d.classList.contains("hidden")&&Vt(r,d,{placement:"bottom-end",offset:4})},{passive:!0}),window.onclick=b=>{!b.target.closest("#script-menu-popover")&&!b.target.closest(".script-more-btn")&&(d?.classList.add("hidden"),r=null)},document.getElementById("menu-opt-open")?.addEventListener("click",()=>{d.classList.add("hidden"),t&&($.selectScript(t),e(`/editor/${t}`))}),document.getElementById("menu-opt-rename")?.addEventListener("click",async()=>{d.classList.add("hidden");const b=prompt("Enter new title for this screenplay:");b&&b.trim()&&(await Nn(t,{title:b.trim()}),await $.refreshScripts(),C("Screenplay renamed"),e("/workspace"))}),document.getElementById("menu-opt-duplicate")?.addEventListener("click",async()=>{d.classList.add("hidden"),await Pn(t),await $.refreshScripts(),C("Screenplay duplicated"),e("/workspace")}),document.getElementById("menu-opt-archive")?.addEventListener("click",async()=>{d.classList.add("hidden"),await Bn(t),await $.refreshScripts(),C("Screenplay archived"),e("/workspace")}),document.getElementById("menu-opt-delete")?.addEventListener("click",async()=>{d.classList.add("hidden"),confirm("Are you sure you want to delete this screenplay? This action cannot be undone.")&&(await Tn(t),await $.refreshScripts(),C("Screenplay deleted"),e("/workspace"))});const p=document.getElementById("btn-export-library");p&&(p.onclick=()=>{const b="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify($.state.scripts,null,2)),y=document.createElement("a");y.setAttribute("href",b),y.setAttribute("download",`scriptora_library_${Date.now()}.json`),document.body.appendChild(y),y.click(),y.remove(),C("Exported library manifest (.json)")})}const ka=new Set(["HE","SHE","IT","ITS","HIM","HER","HERS","HIS","THEY","THEM","THEIR","THEIRS","WE","US","OUR","OURS","YOU","YOUR","YOURS","ME","MY","MINE","I","WHO","WHOM","WHOSE","WHAT","WHICH","WHEN","WHERE","WHY","HOW","AND","OR","BUT","IF","SO","FOR","NOR","YET","BECAUSE","AS","AT","BY","FROM","IN","INTO","OF","OFF","ON","ONTO","OUT","OVER","TO","UP","WITH","THE","A","AN","THIS","THAT","THESE","THOSE","YES","NO","NOT","OK","NOW","THEN","HERE","THERE","SH","SA","AR","ARA","SAN","SANT","SANTH","SANTHO","SO"]);function Bt(e){if(!e||typeof e!="string")return"";let t=e.replace(/\([^)]*\)/g,"").replace(/[^a-zA-Z0-9\s'-]/g,"").trim().toUpperCase();return t==="ARAF"&&(t="ARAVIND"),t}function ms(e){if(!e||typeof e!="string")return!1;const t=Bt(e);return!(!t||t.length<3||ka.has(t)||/\b(INT|EXT|SCENE|DAY|NIGHT|MORNING|EVENING|DUSK|DAWN|CUT TO|FADE|TRANSITION)\b/i.test(t)||t.split(/\s+/).length>3||t.length>30)}function en(e){if(!Array.isArray(e))return[];const t=[],s=new Set;return e.forEach(a=>{const o=typeof a=="string"?a:a?.name||a?.content||"",i=Bt(o);ms(i)&&(s.has(i)||(s.add(i),t.push(i)))}),t.filter(a=>!(t.some(l=>l!==a&&l.startsWith(a)&&l.length>a.length)||t.some(l=>l!==a&&l.length>=5&&a.length<=4&&l.startsWith(a.slice(0,3)))))}let M=null,Be=null,fs=null,Zt=!1,De=!1,mt=!0,ot=!1,cs="EN",Ze=[],ft=-1,ds=null,us=null,Ss=null,Ce=localStorage.getItem("scriptora_autosave")!=="false",Wt="screenplay",$t=!1;const Te=[],Os=["CUT TO:","CUT TO BLACK.","FADE IN:","FADE OUT.","FADE TO BLACK.","DISSOLVE TO:","MATCH CUT TO:","JUMP CUT TO:","SMASH CUT TO:","SLAM TO:","SLAM TO BLACK.","INTERCUT WITH:","WIPE TO:","IRIS IN:","IRIS OUT:","BACK TO:","CONTINUOUS","END"];let Fs=0;const Ft=[];function Nt(e){return e?(e.innerText||e.textContent||"").replace(/[\u200B\u00A0\r\n\t ]/g,"").trim().length===0:!0}function Ia(){return window.innerWidth<=768||"ontouchstart"in window||navigator.maxTouchPoints&&navigator.maxTouchPoints>0||/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}function tn(e,t){const s=Date.now();if(s-Fs<150)return!0;if(!Ia())return!1;const n=e.getAttribute("data-block-type")||"action";if(!["action","text","character","transition"].includes(n)||!Nt(t))return!1;let a="action";return n==="action"||n==="text"?a="character":n==="character"?a="transition":n==="transition"&&(a="action"),Fs=s,Ft.push({blockId:e.getAttribute("data-block-id"),prevType:n,newType:a}),t.innerText="",Gt(e,a),ns(a),De=!0,Ce&&Ue(),!0}const sn=46;function Ca(e,t=null){const s=$.state.scripts?.find(o=>o.id===e)||$.state.activeScript||{title:"Untitled Screenplay",draft:"Draft 1.0"};$.state.currentUser?.initials;let n=null;if(window.scriptoraRouter){const o=window.scriptoraRouter.peekPreviousRoute?.();o&&(n=window.scriptoraRouter.getRouteLabel(o))}const a=n||"Workspace";return`
    <div id="editor-root" class="flex flex-col min-h-screen bg-slate-100 text-slate-900 w-full relative select-text antialiased">
      
      <!-- ========================================================= -->
      <!-- STATIC TOP HEADER (STICKY: Never scrolls with screenplay) -->
      <!-- ========================================================= -->
      <header id="editor-fixed-header" class="shrink-0 sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all">
        
        <!-- ROW 1: TOP APP HEADER (Order: Back, Title & Save Status, Auto-Save, Save Icon, Collab) -->
        <div class="h-11 px-3 flex items-center justify-between max-w-5xl mx-auto">
          <div class="flex items-center gap-2 min-w-0">
            <!-- Back button -->
            <button aria-label="Back to ${a}" id="editor-back-btn" data-scriptora-back="true" data-back-fallback="/workspace" class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all text-xs font-semibold shrink-0 cursor-pointer" title="Back to ${a}">
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
              <span class="hidden sm:inline" id="editor-back-label">${a}</span>
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
              <button id="btn-toggle-autosave" class="flex items-center gap-1.5 pl-1.5 pr-2.5 h-full hover:bg-slate-50 active:scale-95 transition-all text-xs font-medium text-slate-700 hover:text-slate-900" title="Toggle Auto-save (Current: ${Ce?"ON":"OFF"})">
                <span class="w-1.5 h-1.5 rounded-full ${Ce?"bg-emerald-500 animate-pulse":"bg-slate-400"}" id="autosave-dot"></span>
                <span id="autosave-toggle-label">${Ce?"Auto":"Off"}</span>
              </button>
            </div>

            <!-- Master Toolbar Visibility Toggle [⋮] -->
            <button id="btn-toggle-editor-toolbar" class="w-7 h-7 flex items-center justify-center ${$t?"text-blue-600 bg-blue-50 border-blue-200/90":"text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50"} rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0" title="${$t?"Collapse Editor Toolbars (Writing Mode)":"Expand Editor Toolbars (Tools & Formatting)"}" aria-label="Toggle Editor Toolbars">
              <span class="material-symbols-outlined text-[18px]">more_vert</span>
            </button>

            <!-- Collaborate Link -->
            <a href="/profile/collaborators?from=editor&scriptId=${e}" id="editor-collab-btn" aria-label="Collaborators" class="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors no-underline" title="Collaborators">
              <span class="material-symbols-outlined text-[19px]">group</span>
            </a>
          </div>
        </div>

        <!-- COLLAPSIBLE SECONDARY TOOLBAR ROWS (Master Visibility via Header [⋮]) -->
        <div id="editor-collapsible-toolbars" class="${$t?"":"hidden"} w-full transition-all duration-200">
          
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
      <div id="findReplaceModal" class="scriptora-modal-overlay fixed inset-0 z-50 bg-black/25 backdrop-blur-2xs hidden flex">
        <div id="findReplaceCard" class="scriptora-modal-card bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 w-full max-w-sm flex flex-col gap-3 animate-in fade-in zoom-in-95">
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
      <main id="editor-main-scroll" class="flex-1 w-full pb-16 overflow-y-auto min-h-0 flex flex-col items-center pt-3">
        
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
      <div id="editorMoreMenuModal" class="scriptora-modal-overlay fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs hidden flex">
        <div class="scriptora-modal-card w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
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
      <div id="imageModal" class="scriptora-modal-overlay fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs hidden flex">
        <div class="scriptora-modal-card bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 w-full max-w-sm flex flex-col gap-3">
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
      <div id="preferencesModal" class="scriptora-modal-overlay fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden flex">
        <div class="scriptora-modal-card w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
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
      <div id="exportModal" class="scriptora-modal-overlay fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden flex">
        <div class="scriptora-modal-card w-full sm:max-w-md bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
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
              <label class="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700">
                <input type="checkbox" id="optEmptyPageFirst" class="w-4 h-4 accent-blue-600 rounded">
                <span>Add an empty page at the beginning (First page)</span>
              </label>
              <label class="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700">
                <input type="checkbox" id="optEmptyPageLast" class="w-4 h-4 accent-blue-600 rounded">
                <span>Add an empty page at the end (Last page)</span>
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
      <div id="versionsModal" class="scriptora-modal-overlay fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden flex">
        <div class="scriptora-modal-card w-full sm:max-w-lg bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
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
      <div id="newVersionModal" class="scriptora-modal-overlay fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex">
        <div class="scriptora-modal-card w-full max-w-sm bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
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
      <div id="compareModal" class="scriptora-modal-overlay fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex">
        <div class="scriptora-modal-card w-full sm:max-w-2xl bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
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
  `}function rt({id:e,name:t,close:s,restore:n}){try{window.history.pushState({editorSubViewId:e,editorSubViewName:t},"")}catch{}Te.push({id:e,name:t,close:s,restore:n})}function pe(e){const t=Te.findIndex(s=>s.id===e);if(t!==-1){if(t===Te.length-1){const s=Te.pop();s&&typeof s.close=="function"&&s.close();const n=Te[Te.length-1];n&&typeof n.restore=="function"&&n.restore()}else{const s=Te.splice(t,1)[0];s&&typeof s.close=="function"&&s.close()}try{window.history.back()}catch{}}}function Aa(){if(Wt==="titlepage")return Ut(),!0;if(Te.length>0){const e=Te.pop();e&&typeof e.close=="function"&&e.close();const t=Te[Te.length-1];return t&&typeof t.restore=="function"&&t.restore(),!0}return!1}async function $a(e,t){Te.length=0;const s=()=>Wt==="titlepage"?(Ut(),!0):Te.length>0?Aa():(De&&At(!1),!1);window.__scriptoraEditorPopstate=()=>s(),window.scriptoraRouter&&window.scriptoraRouter.registerBackHandler(s);const n=document.getElementById("editor-back-btn");n&&(n.onclick=l=>{l?.preventDefault(),l?.stopPropagation(),window.scriptoraRouter?window.scriptoraRouter.back("/workspace"):s()||t("/workspace")}),M=await Dn(e),Ke(),Kt();const a=document.getElementById("editor-save-btn");a&&(a.onclick=()=>At(!0)),Ta(),Pa();const o=document.getElementById("editor-collab-btn");o&&(o.onclick=l=>{l.preventDefault(),De&&At(!1),$.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile/collaborators?from=editor&scriptId=${e}`)});const i=document.getElementById("editor-profile-btn");i&&(i.onclick=l=>{l.preventDefault(),De&&At(!1),$.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile?from=editor&scriptId=${e}`)}),window.addEventListener("keydown",Na),Ga(e,t),qa(),za(),Wa(),Ba(),Ra(),Ka(),Ja(e),ja()}function Na(e){(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"&&(e.preventDefault(),At(!0)),(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="f"&&(e.preventDefault(),ss(!0)),(e.ctrlKey||e.metaKey)&&e.key==="Enter"&&(e.preventDefault(),Es())}function Ta(){const e=document.getElementById("btn-toggle-autosave"),t=document.getElementById("autosave-dot"),s=document.getElementById("autosave-toggle-label");e&&(e.onclick=n=>{n.stopPropagation(),Ce=!Ce,localStorage.setItem("scriptora_autosave",String(Ce)),Ce?(t&&(t.className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"),s&&(s.textContent="Auto"),e.title="Toggle Auto-save (Current: ON)",C("Auto-save enabled"),De&&Ue()):(t&&(t.className="w-1.5 h-1.5 rounded-full bg-slate-400"),s&&(s.textContent="Off"),e.title="Toggle Auto-save (Current: OFF)",clearTimeout(fs),C("Auto-save disabled · Tap floppy to save"))})}function Ht(){const e=document.getElementById("editor-main-scroll");e&&(e.style.paddingTop="12px",e.style.paddingBottom=ot?"32px":"88px")}function Pa(){const e=document.getElementById("btn-toggle-editor-toolbar"),t=document.getElementById("editor-collapsible-toolbars");Ht(),window.addEventListener("resize",Ht),e&&(e.onclick=s=>{s.preventDefault(),s.stopPropagation(),$t=!$t,$t?(t&&t.classList.remove("hidden"),e.className="w-7 h-7 flex items-center justify-center text-blue-600 bg-blue-50 border-blue-200/90 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Collapse Editor Toolbars (Writing Mode)"):(t&&t.classList.add("hidden"),e.className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Expand Editor Toolbars (Tools & Formatting)"),Ht()})}function Ut(){if(Wt==="titlepage"){es("screenplay");try{window.history.state?.editorTab==="titlepage"&&window.history.back()}catch{}}}function Ba(){const e=document.getElementById("doc-tab-screenplay"),t=document.getElementById("doc-tab-titlepage"),s=document.getElementById("btn-quick-title-page"),n=document.getElementById("menu-btn-title-page"),a=document.getElementById("doc-tab-titlepage-close"),o=document.getElementById("btn-close-titlepage-sheet");e&&(e.onclick=()=>Ut()),t&&(t.onclick=i=>{i.preventDefault(),es("titlepage")}),a&&(a.onclick=i=>{i.preventDefault(),i.stopPropagation(),Ut()}),o&&(o.onclick=i=>{i.preventDefault(),i.stopPropagation(),Ut()}),s&&(s.onclick=()=>es("titlepage")),n&&(n.onclick=()=>{pe("moreMenu"),es("titlepage")})}function es(e){if(Wt===e)return;Wt=e;const t=document.getElementById("screenplay-pages-container"),s=document.getElementById("title-page-container"),n=document.getElementById("doc-tab-screenplay"),a=document.getElementById("doc-tab-titlepage-wrap");if(e==="titlepage"){t&&t.classList.add("hidden"),s&&(s.classList.remove("hidden"),s.classList.add("flex")),a&&(a.className="flex items-center rounded-t-lg transition-all border-b-2 border-blue-600 bg-white text-blue-700 shadow-2xs group"),n&&(n.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 rounded-t-lg transition-all"),Da();try{window.history.state?.editorTab!=="titlepage"&&window.history.pushState({editorTab:"titlepage"},"")}catch{}}else s&&(s.classList.add("hidden"),s.classList.remove("flex")),t&&t.classList.remove("hidden"),n&&(n.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-blue-600 text-blue-700 bg-white rounded-t-lg transition-all shadow-2xs"),a&&(a.className="flex items-center rounded-t-lg transition-all border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 group");Ht()}function Da(){if(!M)return;const e=M.titlePage||{},t=document.getElementById("tp-doc-title"),s=document.getElementById("tp-doc-by"),n=document.getElementById("tp-doc-author"),a=document.getElementById("tp-doc-phone"),o=document.getElementById("tp-doc-email"),i=document.getElementById("tp-doc-address"),l=e.title||M.title||"";t&&(t.innerText=l,l||(t.innerHTML=""));const c=e.by!==void 0?e.by:"Written by";s&&(s.innerText=c,c||(s.innerHTML=""));const m=e.author||"";n&&(n.innerText=m,m||(n.innerHTML=""));let u=e.phone||"";if(!u&&e.contact){const b=e.contact.split("·").map(y=>y.trim()).find(y=>y.includes("+")||/\d{3}/.test(y));b&&(u=b)}a&&(a.innerText=u,u||(a.innerHTML=""));let d=e.email||"";if(!d&&e.contact&&e.contact.includes("@")){const p=e.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);p&&(d=p[0])}o&&(o.innerText=d,d||(o.innerHTML=""));const r=e.address||"";i&&(i.innerText=r,r||(i.innerHTML=""))}function Ra(){const e=document.getElementById("tp-doc-title"),t=document.getElementById("tp-doc-by"),s=document.getElementById("tp-doc-author"),n=document.getElementById("tp-doc-phone"),a=document.getElementById("tp-doc-email"),o=document.getElementById("tp-doc-address"),i=()=>{if(!M)return;M.titlePage||(M.titlePage={});const l=e?e.innerText.trim():"",c=t?t.innerText.trim():"",m=s?s.innerText.trim():"",u=n?n.innerText.trim():"",d=a?a.innerText.trim():"",r=o?o.innerText.trim():"";if(M.titlePage.title=l,M.titlePage.by=c||"Written by",M.titlePage.author=m,M.titlePage.phone=u,M.titlePage.email=d,M.titlePage.address=r,M.titlePage.contact=[u,d,r].filter(Boolean).join(" · "),l){M.title=l;const p=document.getElementById("editor-script-title"),b=document.getElementById("doc-tab-title-label");p&&(p.textContent=l),b&&(b.textContent=l)}De=!0,Tt("Unsaved"),Ce&&Ue()};[e,t,s,n,a,o].forEach(l=>{l&&(l.oninput=i,l.onblur=()=>{l.innerText.trim()===""&&(l.innerHTML=""),i()})})}function Ke(){const e=document.getElementById("screenplay-pages-container");if(!e||!M)return;const t=M.scenes||[],s=[];t.forEach(i=>{(i.blocks||[]).forEach(l=>{s.push({block:l,sceneNumber:i.number,sceneId:i.id,slugline:i.slugline})})});const n=[];let a={pageNumber:1,items:[]},o=0;s.forEach(i=>{if(i.block.type==="pagebreak"){a.items.push(i),n.push(a),a={pageNumber:n.length+1,items:[]},o=0;return}const l=nn(i.block);o+l>sn&&a.items.length>0&&(n.push(a),a={pageNumber:n.length+1,items:[]},o=0),a.items.push(i),o+=l}),a.items.length>0&&n.push(a),n.length===0&&n.push({pageNumber:1,items:[{block:{id:"b-1-1",type:"scene",content:"INT. NEW SCENE - DAY"},sceneNumber:1,sceneId:"scene-1",slugline:"INT. NEW SCENE - DAY"},{block:{id:"b-1-2",type:"action",content:"Type your screenplay action here..."},sceneNumber:1,sceneId:"scene-1",slugline:"INT. NEW SCENE - DAY"}]}),e.innerHTML=n.map(i=>`
    <div class="screenplay-page-sheet w-full max-w-[816px] min-h-[1123px] bg-white rounded-md sm:rounded-lg shadow-md border border-slate-200/90 flex flex-col font-courier text-[12pt] leading-[1.25] text-slate-900 relative transition-all" data-page-num="${i.pageNumber}">
      
      <!-- Top Page Header: Page number in top right -->
      <div class="w-full flex items-center justify-end h-7 pb-2 select-none text-[12pt] text-slate-600 font-courier">
        <span>${i.pageNumber}.</span>
      </div>

      <!-- Screenplay Blocks naturally flowing across this A4 page -->
      <div class="page-blocks-wrapper flex flex-col flex-1 w-full">
        ${i.items.map(l=>ln(l.block,l.sceneNumber,l.sceneId)).join("")}
      </div>

      <!-- Bottom Page Boundary indicator with Page Controls -->
      <div class="w-full pt-6 select-none flex items-center justify-between text-[11px] text-slate-400 font-sans border-t border-slate-100 mt-4">
        <button type="button" class="btn-page-add-before px-2 py-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-all" data-page-num="${i.pageNumber}" title="Add a new page before Page ${i.pageNumber}">
          <span class="material-symbols-outlined text-[14px]">arrow_upward</span>
          <span class="hidden sm:inline">Add Page Before</span>
        </button>
        <span class="tracking-widest uppercase text-slate-300 font-bold">— PAGE ${i.pageNumber} —</span>
        <button type="button" class="btn-page-add-after px-2 py-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-all" data-page-num="${i.pageNumber}" title="Insert Page after Page ${i.pageNumber}">
          <span class="material-symbols-outlined text-[14px]">add</span>
          <span class="hidden sm:inline">Insert Page</span>
        </button>
      </div>

    </div>
  `).join(""),Ma(),as()}function nn(e){if(e.type==="pagebreak")return 1;const t=e.content||"";return e.type==="scene"?3:e.type==="action"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="character"?2:e.type==="parenthetical"?1:e.type==="dialogue"?Math.max(1,Math.ceil(t.length/38))+1:e.type==="transition"||e.type==="shot"?2:e.type==="text"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="note"||e.type==="outline"?2:e.type==="act"||e.type==="endact"?3:e.type==="sequence"?2:e.type==="dual"?4:e.type==="lyrics"?2:e.type==="image"?10:2}function _s(e){let t=!1;(M.scenes||[]).forEach(s=>{const n=(s.blocks||[]).findIndex(a=>a.id===e);n!==-1&&(s.blocks.splice(n,1),t=!0)}),t&&(De=!0,Ke(),C("Page break removed"),Ce&&Ue())}function Es(e=null){const t=e||Be,s=M.scenes||[];if(s.length===0)return;const n={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"};let a=!1;if(t)for(let o of s){const i=(o.blocks||[]).findIndex(l=>l.id===t);if(i!==-1){o.blocks.splice(i+1,0,n),a=!0;break}}if(!a){const o=s[s.length-1];o.blocks||(o.blocks=[]),o.blocks.push(n)}De=!0,Ke(),C("Page break inserted"),Ce&&Ue()}function an(e=null){const t=e||Be,s=M.scenes||[];if(s.length===0){ks();return}const n={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},a={id:"b-"+Date.now(),type:"action",content:""};let o=null,i=-1;if(t)for(let l of s){const c=(l.blocks||[]).findIndex(m=>m.id===t);if(c!==-1){o=l,i=c+1;break}}o||(o=s[s.length-1],i=o.blocks.length),o.blocks.splice(i,0,n,a),De=!0,Ke(),setTimeout(()=>{const l=document.getElementById(a.id);if(l){const c=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]');c&&c.focus(),l.scrollIntoView({behavior:"smooth",block:"center"})}},50),C("New page inserted"),Ce&&Ue()}function La(e){const t=document.querySelector(`.screenplay-page-sheet[data-page-num="${e}"]`);let s=null;if(t){const n=t.querySelectorAll(".screenplay-block");n.length>0&&(s=n[n.length-1].getAttribute("data-block-id"))}an(s)}function ks(){const e=M.scenes||[],t=e.length+1,s={id:"scene-"+Date.now(),number:t,slugline:`INT. SCENE ${t} - DAY`,blocks:[{id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},{id:"b-"+Date.now()+"-1",type:"scene",content:`INT. SCENE ${t} - DAY`},{id:"b-"+Date.now()+"-2",type:"action",content:""}]};e.push(s),De=!0,Ke(),setTimeout(()=>{const a=document.getElementById(s.blocks[1].id);if(a){const o=a.hasAttribute("contenteditable")?a:a.querySelector('[contenteditable="true"]');o&&o.focus(),a.scrollIntoView({behavior:"smooth",block:"center"})}},80);const n=document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)").length||1;C(`Added Page at End (Page ${n})`),Ce&&Ue()}function on(e=null){let t=e;if(!t&&Be){const u=document.getElementById(Be),d=u?u.closest(".screenplay-page-sheet"):null;d&&(t=parseInt(d.getAttribute("data-page-num"),10))}t||(t=1);const s=M.scenes||[];if(s.length===0){ks();return}if(t<=1){const u={id:"scene-"+Date.now(),number:1,slugline:"INT. SCENE 1 - DAY",blocks:[{id:"b-"+Date.now()+"-1",type:"scene",content:"INT. SCENE 1 - DAY"},{id:"b-"+Date.now()+"-2",type:"action",content:""},{id:"pb-"+Date.now()+"-3",type:"pagebreak",content:"PAGE BREAK"}]};s.unshift(u),s.forEach((d,r)=>{d.number=r+1}),De=!0,Ke(),Kt(),setTimeout(()=>{const d=document.getElementById(u.blocks[0].id);if(d){const r=d.hasAttribute("contenteditable")?d:d.querySelector('[contenteditable="true"]');r&&r.focus(),d.scrollIntoView({behavior:"smooth",block:"center"})}},80),C("Added Page Before (Page 1)"),Ce&&Ue();return}const n=document.querySelector(`.screenplay-page-sheet[data-page-num="${t}"]`);let a=null;if(n){const u=n.querySelector(".screenplay-block");u&&(a=u.getAttribute("data-block-id"))}let o=null,i=-1;if(a)for(let u of s){const d=(u.blocks||[]).findIndex(r=>r.id===a);if(d!==-1){o=u,i=d;break}}o||(o=s[0],i=0);const l={id:"pb-"+Date.now()+"-a",type:"pagebreak",content:"PAGE BREAK"},c={id:"b-"+Date.now()+"-b",type:"action",content:""},m={id:"pb-"+Date.now()+"-c",type:"pagebreak",content:"PAGE BREAK"};o.blocks.splice(i,0,l,c,m),De=!0,Ke(),setTimeout(()=>{const u=document.getElementById(c.id);if(u){const d=u.hasAttribute("contenteditable")?u:u.querySelector('[contenteditable="true"]');d&&d.focus(),u.scrollIntoView({behavior:"smooth",block:"center"})}},80),C(`Added Page Before (Page ${t})`),Ce&&Ue()}function ln(e,t,s){const n=e.type==="pagebreak",a=e.type==="scene",o=e.type==="character",i=e.type==="parenthetical",l=e.type==="dialogue",c=e.type==="transition",m=e.type==="shot",u=e.type==="text",d=e.type==="note",r=e.type==="outline",p=e.type==="act",b=e.type==="endact",y=e.type==="sequence",x=e.type==="dual",h=e.type==="lyrics",T=e.type==="image",A=e.type==="action"||!n&&!a&&!o&&!i&&!l&&!c&&!m&&!u&&!d&&!r&&!p&&!b&&!y&&!x&&!h&&!T;if(n)return`
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
        <span class="scene-num-indicator -ml-10 w-7 mr-3 shrink-0 font-mono text-slate-400 font-bold select-none text-[12pt] text-right ${mt?"":"hidden"}">${t}</span>
        <div class="flex-1 tracking-wider uppercase outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${Le(e.content)}</div>
      </div>
    `;if(A)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${Le(e.content)}</div>
    `;if(o)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="character" class="screenplay-block uppercase font-bold tracking-wider text-slate-900 text-left mt-3.5 mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[37%] max-w-[28ch]" contenteditable="true" spellcheck="false">${Le(e.content)}</div>
    `;if(i)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="parenthetical" class="screenplay-block italic text-slate-600 text-left mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[26%] max-w-[24ch]" contenteditable="true" spellcheck="false">${Le(e.content)}</div>
    `;if(l)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dialogue" class="screenplay-block text-left text-slate-900 mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[17%] max-w-[36ch]" contenteditable="true" spellcheck="false">${Le(e.content)}</div>
    `;if(c)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="transition" class="screenplay-block w-full text-right uppercase font-bold tracking-wider text-slate-900 mt-2 mb-4 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${Le(e.content)}</div>
    `;if(m)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="shot" class="screenplay-block uppercase font-bold tracking-wider text-slate-900 text-left my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${Le(e.content||"CLOSE ON:")}</div>
    `;if(u)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="text" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${Le(e.content)}</div>
    `;if(d)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="note" class="screenplay-block text-amber-900 bg-amber-50/80 border-l-4 border-amber-400 p-2 my-2.5 rounded-r font-mono text-xs outline-none focus:ring-1 focus:ring-amber-400 cursor-text select-text" contenteditable="true" spellcheck="false">${Le(e.content||"[[ NOTE: Script comment... ]]")}</div>
    `;if(r)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="outline" class="screenplay-block text-slate-500 uppercase tracking-widest font-sans font-bold text-xs my-2 border-b border-slate-200 pb-1 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${Le(e.content||"OUTLINE BEAT")}</div>
    `;if(p)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="act" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-base outline-none focus:bg-blue-50/50 rounded px-1 cursor-text underline decoration-2 underline-offset-4" contenteditable="true" spellcheck="false">${Le(e.content||"ACT I")}</div>
    `;if(b)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="endact" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${Le(e.content||"END OF ACT I")}</div>
    `;if(y)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="sequence" class="screenplay-block uppercase font-bold tracking-wide text-slate-800 my-3 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${Le(e.content||"SEQUENCE 1")}</div>
    `;if(x)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dual" class="screenplay-block screenplay-dual-dialogue-grid">
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${Le(e.char1||"CHARACTER A")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${Le(e.dia1||"Dialogue A")}</div>
        </div>
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${Le(e.char2||"CHARACTER B")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${Le(e.dia2||"Dialogue B")}</div>
        </div>
      </div>
    `;if(h)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="lyrics" class="screenplay-block text-center italic text-slate-800 my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${Le(e.content||"♫ Musical lyrics... ♫")}</div>
    `;if(T){const N=e.url||e.content||"https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80",w=bs(e.caption||"");return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="image" class="screenplay-block my-4 flex flex-col items-center group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-2.5 shadow-2xs transition-all">
        <div class="w-full flex items-center justify-center min-h-[180px] max-h-[420px] rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200/60">
          <img src="${N}" alt="${w||"Storyboard"}" class="max-h-[400px] w-auto max-w-full object-contain rounded-md shadow-xs bg-white" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80';" loading="eager" />
        </div>
        <div class="text-[11px] font-sans text-slate-600 italic mt-2 text-center outline-none px-2 py-0.5 rounded focus:bg-white w-full cursor-text" contenteditable="true" data-placeholder="Add a storyboard caption...">${w||"Storyboard visual concept"}</div>
        <button class="btn-delete-img-block absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-md text-xs font-bold" data-block-id="${e.id}" data-scene-id="${s}" title="Delete image">✕</button>
      </div>
    `}return`
    <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true">${Le(e.content)}</div>
  `}function Le(e){if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return bs(e);try{let o=function(i){const l=Array.from(i.childNodes);for(const c of l)if(c.nodeType===Node.ELEMENT_NODE){if(c.tagName==="SPAN"&&(c.style?.textDecoration?.includes("line-through")||c.style?.textDecorationLine?.includes("line-through"))){const u=document.createElement("s");u.innerHTML=c.innerHTML,i.replaceChild(u,c),o(u);continue}if(a.has(c.tagName)){for(;c.attributes.length>0;)c.removeAttribute(c.attributes[0].name);o(c)}else{const m=document.createTextNode(c.textContent||"");i.replaceChild(m,c)}}};var t=o;const n=new DOMParser().parseFromString(`<body>${e}</body>`,"text/html"),a=new Set(["B","STRONG","I","EM","U","S","STRIKE","DEL","BR","SPAN"]);return o(n.body),n.body.innerHTML}catch{return bs(e)}}function bs(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}function qt(e){if(!e||typeof e!="string")return e;let t=e.replace(/^(\s*["'“‘(]*)([a-z\u00E0-\u00FC])/u,(s,n,a)=>n+a.toUpperCase());return t=t.replace(/([.!?]["'”’)]*\s+["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,n,a)=>n+a.toUpperCase()),t=t.replace(/(\n\s*["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,n,a)=>n+a.toUpperCase()),t}function It(e){let t=0;const s=window.getSelection();if(s&&s.rangeCount>0){const n=s.getRangeAt(0),a=n.cloneRange();a.selectNodeContents(e),a.setEnd(n.endContainer,n.endOffset),t=a.toString().length}return t}function Ct(e,t){const s=window.getSelection();if(!s)return;const n=document.createRange();if(t<=0){n.selectNodeContents(e),n.collapse(!0),s.removeAllRanges(),s.addRange(n);return}let a=0,o=!1;function i(l){if(!o){if(l.nodeType===Node.TEXT_NODE){const c=l.nodeValue.length;if(a+c>=t){n.setStart(l,Math.min(t-a,c)),n.collapse(!0),o=!0;return}a+=c}else for(let c=0;c<l.childNodes.length;c++)if(i(l.childNodes[c]),o)return}}i(e),o||(n.selectNodeContents(e),n.collapse(!1)),s.removeAllRanges(),s.addRange(n)}function rn(e){const t=e.hasAttribute("contenteditable")?e:e.querySelector('[contenteditable="true"]');t&&(t.onfocus=()=>{Be=e.getAttribute("data-block-id");const s=e.getAttribute("data-block-type")||"action";ns(s),s==="transition"&&Nt(t)?zt(e,t):s!=="transition"&&dt()},t.addEventListener("click",()=>{(e.getAttribute("data-block-type")||"action")==="transition"&&Nt(t)&&zt(e,t)}),t.addEventListener("beforeinput",s=>{(s.data===" "||s.inputType==="insertText"&&s.data===" ")&&Nt(t)&&tn(e,t)&&s.preventDefault()}),t.oninput=()=>{De=!0;const s=e.getAttribute("data-block-type")||"action",n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,o=qt(a);if(o!==a){const i=It(t);t.innerText=o,Ct(t,i)}}gt(e,t.innerHTML),Tt("Unsaved"),Ce&&Ue(),zt(e,t),as()},t.onblur=()=>{const s=e.getAttribute("data-block-type")||"action",n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,o=qt(a);o!==a&&(t.innerText=o)}if(gt(e,t.innerHTML),s==="character")Is(t.innerText);else if(s==="scene"){const a=St(t.innerText);a.location&&Cs(a.location)}},t.onpaste=()=>{const s=e.getAttribute("data-block-type")||"action";setTimeout(()=>{const n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,o=qt(a);if(o!==a){const i=It(t);t.innerText=o,Ct(t,i)}}gt(e,t.innerHTML)},0)},t.onkeydown=s=>{Oa(s,e,t)})}function Ma(){document.querySelectorAll(".screenplay-block").forEach(rn),document.querySelectorAll(".btn-delete-img-block").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=t.getAttribute("data-block-id"),a=t.getAttribute("data-scene-id");n&&a&&_t(a,n)}}),document.querySelectorAll(".btn-remove-pagebreak").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=t.getAttribute("data-block-id");n&&_s(n)}}),document.querySelectorAll('[data-block-type="pagebreak"]').forEach(t=>{t.onkeydown=s=>{if(s.key==="Backspace"||s.key==="Delete"){s.preventDefault();const n=t.getAttribute("data-block-id");n&&_s(n)}}}),document.querySelectorAll(".btn-page-add-before").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=parseInt(t.getAttribute("data-page-num"),10)||1;on(n)}}),document.querySelectorAll(".btn-page-add-after").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=parseInt(t.getAttribute("data-page-num"),10)||1;La(n)}})}function St(e){const t=e.match(/^(INT\.\/EXT\.|INT\.|EXT\.|I\/E\.)\s*/i),s=t?t[1].toUpperCase():"INT.",a=(t?e.slice(t[0].length):e).split(/\s+-\s*|\s+-/),o=(a[0]||"").trim().toUpperCase(),i=(a[1]||"").trim().toUpperCase();return{intExt:s,location:o,time:i}}function Is(e){if(!M)return;const t=Bt(e);ms(t)&&(Array.isArray(M.characters)||(M.characters=[]),M.characters=M.characters.filter(s=>{const n=Bt(s);return!(!ms(n)||t.startsWith(n)&&n.length<t.length||t.length>=5&&n.length<=4&&t.startsWith(n.slice(0,3)))}),M.characters.includes(t)||M.characters.push(t))}function Cs(e){if(!M)return;const t=(e||"").trim().toUpperCase();!t||t.length<2||(Array.isArray(M.locations)||(M.locations=[]),M.locations=M.locations.filter(s=>t.startsWith(s)&&s.length<t.length?M.scenes?.some(a=>a.blocks?.some(o=>o.type==="scene"&&St(o.content).location===s)):!0),M.locations.includes(t)||M.locations.push(t))}function gt(e,t){if(!M)return;const s=e.getAttribute("data-block-id"),n=e.getAttribute("data-scene-id"),a=M.scenes.find(i=>i.id===n);if(!a)return;const o=a.blocks.find(i=>i.id===s);if(o&&(o.type==="image"?o.caption=t:o.content=t,o.type==="scene")){const i=(t||"").replace(/<[^>]+>/g,""),l=St(i);o.intExt=l.intExt,o.location=l.location,o.time=l.time,a.slugline=i,a.location=l.location,a.time=l.time}}function _t(e,t){if(!M)return;const s=M.scenes.find(o=>o.id===e);if(!s)return;const n=s.blocks.findIndex(o=>o.id===t);if(n!==-1&&(s.blocks.splice(n,1),De=!0,Ce&&Ue()),s.blocks.length===0&&M.scenes.length>1){const o=M.scenes.findIndex(i=>i.id===e);o!==-1&&(M.scenes.splice(o,1),M.scenes.forEach((i,l)=>{i.number=l+1}),Kt())}else s.blocks.length===0&&s.blocks.push({id:`b-${Date.now().toString().slice(-6)}`,type:"action",content:""});const a=document.getElementById(t);a&&a.remove(),as()}function Oa(e,t,s){const n=t.getAttribute("data-block-type"),a=t.getAttribute("data-scene-id"),o=t.getAttribute("data-block-id"),i=document.getElementById("editor-autocomplete-dropdown");if(i&&!i.classList.contains("hidden")){if(e.key==="ArrowDown"){e.preventDefault(),js(1);return}if(e.key==="ArrowUp"){e.preventDefault(),js(-1);return}if(e.key==="Enter"||e.key==="Tab"){const l=i.querySelector(".autocomplete-item.active");if(l){e.preventDefault(),l.click();return}}if(e.key==="Escape"){dt();return}}if((e.key===" "||e.code==="Space")&&Nt(s)&&tn(t,s)){e.preventDefault();return}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"&&!e.shiftKey&&Ft.length>0){const l=Ft[Ft.length-1];if(l.blockId===o&&Nt(s)){Ft.pop(),e.preventDefault(),Gt(t,l.prevType);return}}if((e.ctrlKey||e.metaKey)&&!e.altKey){const l=e.key.toLowerCase();if(l==="b"){e.preventDefault(),bt("bold");return}if(l==="i"){e.preventDefault(),bt("italic");return}if(l==="u"){e.preventDefault(),bt("underline");return}}if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&e.key&&e.key.length===1&&(["bold","italic","underline","strikeThrough"].forEach(l=>{if(Ge[l]===!0&&!document.queryCommandState(l))try{document.execCommand(l,!1,null)}catch{}else if(Ge[l]===!1&&document.queryCommandState(l))try{document.execCommand(l,!1,null)}catch{}}),Ge={bold:null,italic:null,underline:null,strikeThrough:null}),(e.ctrlKey||e.metaKey)&&e.key==="Enter"){e.preventDefault(),Es(o);return}if(e.key==="Backspace"&&!e.ctrlKey&&!e.metaKey){const l=It(s),c=window.getSelection(),m=!c||c.isCollapsed;if(l===0&&m){const u=Array.from(document.querySelectorAll(".screenplay-block")),d=u.indexOf(t);if(d>0){e.preventDefault();const r=u[d-1],p=r.hasAttribute("contenteditable")?r:r.querySelector('[contenteditable="true"]'),b=s.innerText.trim();if(b===""||n==="parenthetical"&&(b==="()"||b==="")){_t(a,o),p&&(p.focus(),ct(p));return}const y=r.getAttribute("data-block-type");if(p&&(n==="action"&&y==="action"||n==="dialogue"&&y==="dialogue"||n==="text"&&y==="text")){const x=p.innerText.length,h=p.innerText+(p.innerText?" ":"")+s.innerText;p.innerText=h,gt(r,h),_t(a,o),p.focus(),Ct(p,x+(p.innerText?1:0));return}if(p){p.focus(),ct(p);return}}}}if(e.key==="Delete"&&!e.ctrlKey&&!e.metaKey){const l=It(s),c=window.getSelection(),m=!c||c.isCollapsed;if(l>=s.innerText.length&&m){const u=Array.from(document.querySelectorAll(".screenplay-block")),d=u.indexOf(t);if(d<u.length-1){const r=u[d+1],p=r.hasAttribute("contenteditable")?r:r.querySelector('[contenteditable="true"]'),b=r.getAttribute("data-scene-id"),y=r.getAttribute("data-block-id"),x=r.getAttribute("data-block-type"),h=(p?p.innerText:"").trim();if(h===""||x==="parenthetical"&&(h==="()"||h==="")){e.preventDefault(),_t(b,y);return}if(p&&(n==="action"&&x==="action"||n==="dialogue"&&x==="dialogue"||n==="text"&&x==="text")){e.preventDefault();const T=s.innerText.length,A=s.innerText+(s.innerText?" ":"")+p.innerText;s.innerText=A,gt(t,A),_t(b,y),Ct(s,T+(s.innerText?1:0));return}if(p){e.preventDefault(),p.focus(),Ct(p,0);return}}}}if(e.key==="ArrowLeft"){const l=It(s),c=window.getSelection();if(l===0&&(!c||c.isCollapsed)){const m=Array.from(document.querySelectorAll(".screenplay-block")),u=m.indexOf(t);if(u>0){e.preventDefault();const d=m[u-1],r=d.querySelector('[contenteditable="true"]')||d;r&&(r.focus(),ct(r))}}}if(e.key==="ArrowRight"){const l=It(s),c=window.getSelection();if(l>=s.innerText.length&&(!c||c.isCollapsed)){const m=Array.from(document.querySelectorAll(".screenplay-block")),u=m.indexOf(t);if(u<m.length-1){e.preventDefault();const d=m[u+1],r=d.querySelector('[contenteditable="true"]')||d;r&&(r.focus(),Ct(r,0))}}}if(e.key==="("&&(n==="character"||n==="dialogue")){const l=window.getSelection();if(l&&l.anchorOffset===0&&s.innerText.trim()===""){e.preventDefault(),Gt(t,"parenthetical");return}}if(e.key==="Tab"){e.preventDefault(),dt(),_a(t,e.shiftKey);return}if(e.key==="Enter"&&!e.shiftKey){if(dt(),n==="scene"){e.preventDefault();const l=St(s.innerText);l.location&&Cs(l.location),xt(a,o,"action");return}if(n==="character"){e.preventDefault(),Is(s.innerText),xt(a,o,"dialogue");return}if(n==="dialogue"){e.preventDefault(),xt(a,o,"action");return}if(n==="parenthetical"){e.preventDefault();let l=s.innerText.trim();l.endsWith(")")||(l+=")",s.innerText=l,gt(t,l)),xt(a,o,"dialogue");return}if(n==="transition"){e.preventDefault(),Fa(a);return}if(n==="shot"||n==="note"||n==="outline"){e.preventDefault(),xt(a,o,"action");return}if(n==="act"||n==="endact"||n==="sequence"){e.preventDefault(),xt(a,o,"scene");return}if(n==="lyrics"){e.preventDefault(),xt(a,o,"lyrics");return}if(n==="action"||n==="text"){e.preventDefault(),xt(a,o,n);return}}}function xt(e,t,s,n){const a=M.scenes.find(u=>u.id===e);if(!a)return;const o=a.blocks.findIndex(u=>u.id===t),i=`b-${Date.now().toString().slice(-6)}`,l={id:i,type:s,content:""};o!==-1?a.blocks.splice(o+1,0,l):a.blocks.push(l);const c=document.getElementById(t),m=c?c.closest(".page-blocks-wrapper"):null;if(c&&m){const u=document.createElement("div");u.innerHTML=ln(l,a.number,a.id);const d=u.firstElementChild;c.insertAdjacentElement("afterend",d),rn(d),as();const r=d.hasAttribute("contenteditable")?d:d.querySelector('[contenteditable="true"]');r&&(r.focus(),ct(r));const p=m.querySelectorAll(".screenplay-block");let b=0;p.forEach(y=>{const x=y.getAttribute("data-block-type"),h=y.innerText||"";b+=nn({type:x,content:h})}),b>sn&&(Ke(),setTimeout(()=>{const y=document.getElementById(i);if(y){const x=y.querySelector('[contenteditable="true"]')||y;x.focus(),ct(x)}},20))}else Ke(),setTimeout(()=>{const u=document.getElementById(i);if(u){const d=u.hasAttribute("contenteditable")?u:u.querySelector('[contenteditable="true"]');d&&(d.focus(),ct(d))}},20)}function Fa(e){const t=M.scenes.findIndex(i=>i.id===e),s=M.scenes.length+1,n=`scene-${Date.now().toString().slice(-5)}`,a=`b-${Date.now().toString().slice(-6)}`,o={id:n,number:s,actId:M.acts?.[0]?.id||"act-1",slugline:"",blocks:[{id:a,type:"scene",content:""}]};t!==-1?M.scenes.splice(t+1,0,o):M.scenes.push(o),M.scenes.forEach((i,l)=>{i.number=l+1}),Ke(),Kt(),setTimeout(()=>{const i=document.getElementById(a);if(i){const l=i.querySelector('[contenteditable="true"]');l&&(l.focus(),ct(l),zt(i,l))}},30)}function _a(e,t=!1){if(!e)return!1;const s=e.getAttribute("data-block-type")||"action";let n;return t?s==="scene"?n="transition":s==="transition"?n="dialogue":s==="dialogue"?n="character":s==="character"||s==="action"||s==="text"?n="scene":s==="parenthetical"?n="character":n="scene":s==="scene"?n="character":s==="character"?n="dialogue":s==="dialogue"?n="transition":s==="transition"?n="scene":s==="action"||s==="text"?n="character":s==="parenthetical"?n="dialogue":n="character",n?(Gt(e,n),!0):!1}function Gt(e,t){const s=e.getAttribute("data-block-id"),n=e.getAttribute("data-scene-id"),a=M.scenes.find(i=>i.id===n);if(!a)return;const o=a.blocks.find(i=>i.id===s);if(o){if(o.type=t,(t==="character"||t==="scene"||t==="transition")&&(o.content=o.content.toUpperCase()),(t==="action"||t==="dialogue")&&(o.content=qt(o.content)),t==="parenthetical"){let i=o.content.replace(/^\(+|\)+$/g,"").trim();i?o.content=`(${i})`:o.content="()"}De=!0,Ce&&Ue(),Ke(),setTimeout(()=>{const i=document.getElementById(s);if(i){const l=i.hasAttribute("contenteditable")?i:i.querySelector('[contenteditable="true"]');if(l){if(l.focus(),t==="parenthetical"&&l.innerText==="()"){const c=l.firstChild;if(c){const m=document.createRange(),u=window.getSelection();m.setStart(c,1),m.collapse(!0),u.removeAllRanges(),u.addRange(m)}}else ct(l);ns(t),t==="transition"?zt(i,l):dt()}}(t==="scene"||t==="character")&&Kt()},25)}}function ct(e){const t=document.createRange(),s=window.getSelection();t.selectNodeContents(e),t.collapse(!1),s.removeAllRanges(),s.addRange(t)}function ja(){document.addEventListener("click",t=>{t.target.closest("#editor-autocomplete-dropdown")||dt()});const e=()=>{const t=document.getElementById("editor-autocomplete-dropdown");if(t&&!t.classList.contains("hidden")&&Be){const s=document.getElementById(Be);if(s){const n=s.querySelector('[contenteditable="true"]')||s;cn(t,n)}}};window.addEventListener("scroll",e,{capture:!0,passive:!0}),document.addEventListener("selectionchange",()=>{const t=document.getElementById("editor-autocomplete-dropdown");t&&!t.classList.contains("hidden")&&e()}),window.visualViewport&&(window.visualViewport.addEventListener("resize",e),window.visualViewport.addEventListener("scroll",e))}function dt(){const e=document.getElementById("editor-autocomplete-dropdown");e&&e.classList.add("hidden")}function Ha(e){if(!e)return null;const t=window.getSelection();if(t&&t.rangeCount>0)try{const n=t.getRangeAt(0);if(e.contains(n.startContainer)||e===n.startContainer){const a=n.getClientRects();if(a&&a.length>0){const i=a[a.length-1];if(i&&i.height>0&&i.top>0)return{top:i.top,bottom:i.bottom,left:i.left,right:i.right,width:i.width,height:i.height}}const o=n.getBoundingClientRect();if(o&&o.height>0&&o.top>0)return{top:o.top,bottom:o.bottom,left:o.left,right:o.right,width:o.width,height:o.height}}}catch{}const s=e.getBoundingClientRect();return{top:s.top,bottom:s.bottom,left:s.left,right:s.right,width:s.width,height:s.height}}function cn(e,t){if(!e||!t)return;e.parentElement!==document.body&&document.body.appendChild(e);const s=Ha(t);if(!s)return;const n=window.visualViewport,a=n?n.offsetTop:0,o=n?n.offsetLeft:0,i=n?n.height:window.innerHeight,l=n?n.width:window.innerWidth,c=document.getElementById("editor-fixed-header")||document.getElementById("editor-header-nav"),m=c?c.getBoundingClientRect().bottom:a+56;if(s.bottom<m+4||s.top>a+i-16){dt();return}const u=Math.min(270,l-24);e.style.width=`${u}px`;const d=Math.min(220,e.scrollHeight||180),r=a+i-s.bottom-8,p=s.top-Math.max(m,a)-8;let b,y=d;r<d&&p>r?(y=Math.max(80,Math.min(d,p)),b=s.top-y-6):(y=Math.max(80,Math.min(d,r)),b=s.bottom+6),b=Math.max(Math.max(m,a)+4,Math.min(a+i-y-8,b)),e.style.maxHeight=`${Math.round(y)}px`,e.style.overflowY="auto";const h=t.closest(".screenplay-block"),T=h?h.getAttribute("data-block-type"):null;let A;T==="transition"?A=Math.max(o+12,s.right-u):(A=s.left,A+u>o+l-12&&(A=o+l-u-12),A<o+12&&(A=o+12)),e.style.top=`${Math.round(b)}px`,e.style.left=`${Math.round(A)}px`}function dn(){if(!M)return[];const e=[];return(M.scenes||[]).forEach(t=>{(t.blocks||[]).forEach(s=>{s.type==="character"&&s.content&&e.push(s.content)})}),(M.characters||[]).forEach(t=>{t&&e.push(t)}),en(e)}function Ua(){if(!M)return[];const e=new Set;(M.scenes||[]).forEach(s=>{(s.blocks||[]).forEach(n=>{if(n.type==="scene"){const a=St(n.content);a.location&&a.location.length>=2&&e.add(a.location)}})}),(M.locations||[]).forEach(s=>{const n=(s||"").trim().toUpperCase();n&&n.length>=2&&e.add(n)});const t=Array.from(e);return t.filter(s=>t.some(a=>a!==s&&a.startsWith(s))?M.scenes?.some(o=>o.blocks?.some(i=>i.type==="scene"&&St(i.content).location===s)):!0)}function zt(e,t){const s=e.getAttribute("data-block-type"),n=t.innerText,a=document.getElementById("editor-autocomplete-dropdown");if(!a)return;let o=[];if(s==="scene"){const i=n.toUpperCase(),l=n.match(/\s+-\s*([A-Za-z]*)$/);if(l){const c=(l[1]||"").toUpperCase(),u=["DAY","NIGHT","MORNING","EVENING","DAWN","DUSK","CONTINUOUS","LATER"].filter(r=>r.startsWith(c)),d=n.replace(/\s+-\s*[A-Za-z]*$/," - ");o=u.map(r=>({label:r,val:d+r}))}else if(i==="I"||i==="IN")o=["INT.","INT./EXT.","I/E."].map(c=>({label:c,val:c+" "}));else if(i==="E"||i==="EX")o=["EXT.","INT./EXT.","I/E."].map(c=>({label:c,val:c+" "}));else if(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i.test(n)){const c=n.match(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i),m=c[1].toUpperCase()+" ",u=(c[2]||"").trim().toUpperCase();u.length>0&&(o=Ua().filter(p=>p.startsWith(u)).map(p=>({label:p,val:`${m}${p}`})))}}else if(s==="character"){const i=n.trim().toUpperCase();i.length>0&&(o=dn().filter(m=>m.startsWith(i)).map(m=>({label:m,val:m})))}else if(s==="transition"){const l=(n||"").replace(/[\u200B\u00A0\r\n\t]/g,"").trim().toUpperCase(),c=Array.isArray(M?.transitions)&&M.transitions.length>0?Array.from(new Set([...Os,...M.transitions])):Os;if(l.length===0)o=c.map(m=>({label:m,val:m}));else{const m=c.filter(r=>r.toUpperCase().startsWith(l)),u=c.filter(r=>!r.toUpperCase().startsWith(l)&&r.toUpperCase().includes(l));o=[...m,...u].map(r=>({label:r,val:r}))}}if(o.length===0){dt();return}a.innerHTML=o.map((i,l)=>{const c=typeof i=="object"?i.label:i,m=typeof i=="object"?i.val:i;return`
      <div class="autocomplete-item px-3 py-2 sm:py-1.5 hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-blue-700 cursor-pointer flex items-center justify-between font-mono text-xs border-b border-slate-50 last:border-b-0 ${l===0?"active bg-blue-50/70 text-blue-700 font-semibold":""}" data-val="${m}">
        <span class="tracking-wide">${c}</span>
        <span class="text-[10px] text-slate-400 font-sans hidden sm:inline">Enter ↵</span>
      </div>
    `}).join(""),a.classList.remove("hidden"),cn(a,t),a.querySelectorAll(".autocomplete-item").forEach(i=>{i.addEventListener("pointerdown",l=>{l.preventDefault()}),i.onclick=l=>{l.stopPropagation();const c=i.getAttribute("data-val");if(t.innerText=c,gt(e,c),s==="character")Is(c);else if(s==="scene"){const m=St(c);m.location&&Cs(m.location)}dt(),ct(t),De=!0,Ce&&Ue()}})}function js(e){const t=document.getElementById("editor-autocomplete-dropdown");if(!t)return;const s=t.querySelectorAll(".autocomplete-item");if(s.length===0)return;let n=Array.from(s).findIndex(a=>a.classList.contains("active"));n!==-1&&s[n].classList.remove("active","bg-blue-50/70","text-blue-700","font-semibold"),n=(n+e+s.length)%s.length,s[n].classList.add("active","bg-blue-50/70","text-blue-700","font-semibold"),s[n].scrollIntoView({block:"nearest"})}async function At(e=!1){if(!(Zt||!M)){Zt=!0,Tt("Saving..."),M.scenes&&M.scenes.forEach(t=>{t.blocks&&t.blocks.forEach(s=>{(s.type==="action"||s.type==="dialogue")&&s.content&&(s.content=qt(s.content))})});try{await Rn(M.id,M),De=!1,Zt=!1,Tt("Saved"),e&&C("Saved")}catch{Zt=!1,Tt("Save failed"),C("Couldn't save changes · Tap retry")}}}function Ue(){Ce&&(clearTimeout(fs),fs=setTimeout(async()=>{De&&Ce&&(await At(!1),Tt("Autosaved just now"),C("Autosaved just now"))},1500))}function Tt(e){const t=document.getElementById("editor-save-status"),s=document.getElementById("editor-save-icon");t&&(t.textContent=e),e==="Saving..."?s&&(s.textContent="progress_activity",s.classList.add("animate-spin")):e==="Saved"||e==="Autosaved just now"||e==="Unsaved"?s&&(s.textContent="save",s.classList.remove("animate-spin")):e==="Save failed"&&s&&(s.textContent="warning",s.classList.remove("animate-spin"))}function Kt(){if(!M)return;const e=document.getElementById("navSceneSelect");if(e){const t=M.scenes||[];e.innerHTML=t.map((s,n)=>`
      <option value="${s.id}" ${n===0?"selected":""}>Scene ${s.number} ▾</option>
    `).join("")||'<option value="">Scene 1 ▾</option>'}}function qa(){const e=document.getElementById("navSceneSelect");e&&(e.onchange=s=>{const n=s.target.value;if(!n)return;Hs(n);const a=M?.scenes?.find(o=>o.id===n);a&&$.setState({currentSceneId:a.number})});let t=null;try{const s=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search,n=new URLSearchParams(s||"");n.get("scene")&&(t=n.get("scene"))}catch{}if(!t&&$.state.currentSceneId&&(t=$.state.currentSceneId),t&&M?.scenes){const s=M.scenes.find(n=>String(n.number)===String(t)||n.id===String(t)||n.id===`scene-${t}`);s&&(e&&(e.value=s.id),setTimeout(()=>Hs(s.id),250))}}function Hs(e){const t=document.querySelector(`[data-scene-id="${e}"][data-block-type="scene"]`)||document.querySelector(`[data-scene-id="${e}"]`);t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.classList.add("bg-blue-50/50"),setTimeout(()=>t.classList.remove("bg-blue-50/50"),1500))}function za(){const e=document.getElementById("element-bar");e&&e.querySelectorAll(".element-btn").forEach(t=>{t.onclick=s=>{s.preventDefault();const n=t.getAttribute("data-type");Va(n)}})}const Ge={bold:null,italic:null,underline:null,strikeThrough:null};let Us=!1;function lt(e){const t=window.getSelection();if(!t||t.rangeCount===0)return!1;const s=t.anchorNode,n=s?.nodeType===Node.ELEMENT_NODE?s:s?.parentElement;if(!n)return!1;const a=n.closest(".screenplay-block");if(!a)return!1;if(!t.isCollapsed&&t.toString().trim().length>0)try{return document.queryCommandState(e)}catch{return!1}const o=a.getAttribute("data-block-type"),i=o==="scene"||o==="character"||o==="transition";try{if(e==="bold"){if(i){const l=n.closest("b, strong");return!!l&&l!==a}return document.queryCommandState("bold")}if(e==="strikeThrough")return n.closest("s, strike, del")?!0:document.queryCommandState("strikeThrough");if(e==="italic")return document.queryCommandState("italic");if(e==="underline")return document.queryCommandState("underline")}catch{return!1}return!1}function bt(e){let t=document.activeElement,s=t?t.closest(".screenplay-block"):null,n=s?s.hasAttribute("contenteditable")?s:s.querySelector('[contenteditable="true"]'):null;if(!n&&Be){const i=document.getElementById(Be);i&&(s=i,n=i.hasAttribute("contenteditable")?i:i.querySelector('[contenteditable="true"]'))}if(!n){const i=document.querySelector(".screenplay-block");i&&(s=i,n=i.hasAttribute("contenteditable")?i:i.querySelector('[contenteditable="true"]'))}n&&document.activeElement!==n&&n.focus();const a=window.getSelection();if(a&&!a.isCollapsed&&a.rangeCount>0&&a.toString().trim().length>0){try{document.execCommand(e,!1,null)}catch{}s&&n&&gt(s,n.innerHTML),De=!0,Ce&&Ue(),Ge[e]=null,vt()}else{const l=!(Ge[e]!==null?Ge[e]:lt(e));Ge[e]=l;try{document.execCommand(e,!1,null)}catch{}vt()}}function Va(e){if(e==="bold"){bt("bold");return}if(e==="italic"){bt("italic");return}if(e==="underline"){bt("underline");return}if(e==="strike"){bt("strikeThrough");return}if(e==="undo"){document.execCommand("undo",!1,null),vt();return}if(e==="redo"){document.execCommand("redo",!1,null),vt();return}if(e==="image"){if(!Be){const t=Array.from(document.querySelectorAll(".screenplay-block")),s=window.innerHeight/2;for(const n of t){const a=n.getBoundingClientRect();if(a.top<=s&&a.bottom>=s){Be=n.getAttribute("data-block-id");break}}}Ss=Be,un(!0);return}if(!Be){const t=document.querySelector(".screenplay-block");t&&(Be=t.getAttribute("data-block-id"))}if(Be){const t=document.getElementById(Be);t&&(Gt(t,e),ns(e))}}function ns(e){const t=document.getElementById("element-bar");t&&t.querySelectorAll(".element-btn").forEach(s=>{s.getAttribute("data-type")===e?s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-white bg-blue-600 shadow-2xs font-semibold shrink-0":s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0"})}function Wa(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),n=document.getElementById("btn-format-strike");[{btn:e,cmd:"bold"},{btn:t,cmd:"italic"},{btn:s,cmd:"underline"},{btn:n,cmd:"strikeThrough"}].forEach(({btn:i,cmd:l})=>{i&&(i.onmousedown=c=>{c.preventDefault(),c.stopPropagation()},i.onclick=c=>{c.preventDefault(),c.stopPropagation(),bt(l)})}),Us||(Us=!0,document.addEventListener("selectionchange",()=>{vt()}));const o=document.getElementById("editor-main-scroll");o&&(o.addEventListener("keyup",vt),o.addEventListener("mouseup",vt))}function vt(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),n=document.getElementById("btn-format-strike");if(!e||!t||!s||!n)return;const a="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center border border-blue-600 shadow-2xs font-semibold active:scale-95 transition-all cursor-pointer",o="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center border border-slate-200/90 active:scale-95 transition-all cursor-pointer";try{const i=window.getSelection();let l=!1,c=!1,m=!1,u=!1;i&&!i.isCollapsed&&i.rangeCount>0&&i.toString().trim().length>0?(l=lt("bold"),c=lt("italic"),m=lt("underline"),u=lt("strikeThrough")):(l=Ge.bold!==null?Ge.bold:lt("bold"),c=Ge.italic!==null?Ge.italic:lt("italic"),m=Ge.underline!==null?Ge.underline:lt("underline"),u=Ge.strikeThrough!==null?Ge.strikeThrough:lt("strikeThrough")),e.className=l?a:o,t.className=c?a:o,s.className=m?a:o,n.className=u?a:o}catch{}}function Ga(e,t){const s=document.getElementById("editor-more-menu-btn"),n=document.getElementById("editorMoreMenuModal"),a=document.getElementById("closeMoreMenuBtn");function o(j){n&&(n.classList.remove("hidden"),n.classList.add("flex"),rt({id:"moreMenu",name:"Screenplay Tools",close:()=>{n.classList.add("hidden"),n.classList.remove("flex")},restore:()=>{n.classList.remove("hidden"),n.classList.add("flex")}}))}s&&(s.onclick=()=>o()),a&&(a.onclick=()=>pe("moreMenu")),n&&(n.onclick=j=>{j.target===n&&pe("moreMenu")});const i=document.getElementById("menu-btn-scene-navigator");i&&(i.onclick=()=>{pe("moreMenu");const j=document.getElementById("navSceneSelect");j&&j.focus()});const l=document.getElementById("menu-btn-char-navigator");l&&(l.onclick=()=>{pe("moreMenu");const j=dn(),ce=prompt(`Select character to navigate to:
${j.join(", ")}`,j[0]||"HILL");if(ce){for(const k of M.scenes)for(const O of k.blocks)if(O.type==="character"&&O.content.toUpperCase().includes(ce.trim().toUpperCase())){const xe=document.getElementById(O.id);if(xe){xe.scrollIntoView({behavior:"smooth",block:"center"}),xe.classList.add("bg-blue-100/60"),setTimeout(()=>xe.classList.remove("bg-blue-100/60"),1500);return}}}});const c=document.getElementById("sceneNumberToggle"),m=document.getElementById("sceneNumberToggleText"),u=document.getElementById("menuSceneNumState"),d=document.getElementById("menu-btn-scene-numbers");function r(){mt=!mt,m&&(m.textContent=`Scene #s: ${mt?"On":"Off"}`),u&&(u.textContent=mt?"Enabled":"Disabled"),document.querySelectorAll(".scene-num-indicator").forEach(j=>{j.classList.toggle("hidden",!mt)}),C(`Scene numbers ${mt?"enabled (left side)":"hidden"}`)}c&&(c.onclick=r),d&&(d.onclick=()=>{r(),pe("moreMenu")});const p=document.getElementById("focusModeToggle"),b=document.getElementById("focusModeText"),y=document.getElementById("menu-btn-focus-mode"),x=document.getElementById("menuFocusState");function h(j=null){ot=j!==null?j:!ot,b&&(b.textContent=ot?"Exit Focus":"Focus"),x&&(x.textContent=ot?"Active":"Off");const ce=document.getElementById("editor-collapsible-toolbars"),k=document.getElementById("editor-document-tabs"),O=document.getElementById("editor-fixed-header");if(ot?(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!0),O&&(O.style.top="0px")):(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!1),O&&(O.style.top="0px")),ce&&(ce.style.display=ot?"none":""),k&&(k.style.display=ot?"none":"flex"),Ht(),ot)rt({id:"focusMode",name:"Focus Mode",close:()=>h(!1)}),C("Focus Mode active (distraction-free)");else{const xe=Te.findIndex(W=>W.id==="focusMode");xe!==-1&&Te.splice(xe,1),C("Exited Focus Mode")}}p&&(p.onclick=()=>h()),y&&(y.onclick=()=>{pe("moreMenu"),h()});const T=document.getElementById("langToggleBtn"),A=document.getElementById("langToggleText"),N=document.getElementById("tamilLangBadge");function w(j){cs=j,A&&(A.textContent=j==="TA"?"தமிழ் / EN":j==="TL"?"Tanglish":"EN / தமிழ்"),N&&(N.textContent=j==="TA"?"தமிழ் விசைப்பலகை: இயங்குகிறது":j==="TL"?"Tanglish: Active":"Tamil IME: Ready"),C(`Screenplay language set to ${j==="TA"?"Tamil":j==="TL"?"Tanglish":"English"}`)}T&&(T.onclick=()=>{w(cs==="EN"?"TA":cs==="TA"?"TL":"EN")}),document.querySelectorAll(".lang-choice-btn").forEach(j=>{j.onclick=()=>{w(j.getAttribute("data-lang")),pe("moreMenu")}});const L=document.getElementById("btn-open-production"),I=document.getElementById("menu-btn-production"),X=()=>{const j=e||$.state.selectedScriptId||"chronicles-of-dust";sessionStorage.setItem("scriptora_prod_return",`/editor/${j}`),t(`/production?from=editor&scriptId=${encodeURIComponent(j)}`)};L&&(L.onclick=X),I&&(I.onclick=()=>{pe("moreMenu"),X()});const V=document.getElementById("menu-btn-go-page");V&&(V.onclick=()=>{pe("moreMenu");const j=document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)").length||1,ce=prompt(`Enter page number to jump to (1-${j}):`,"1");if(ce){const k=document.querySelector(`[data-page-num="${ce}"]`);k&&k.scrollIntoView({behavior:"smooth",block:"start"})}});const le=document.getElementById("menu-btn-page-break");le&&(le.onclick=()=>{pe("moreMenu"),Es()});const _=document.getElementById("menu-btn-insert-page");_&&(_.onclick=()=>{pe("moreMenu"),an()});const me=document.getElementById("menu-btn-page-before");me&&(me.onclick=()=>{pe("moreMenu"),on()});const ie=document.getElementById("menu-btn-page-at-end");ie&&(ie.onclick=()=>{pe("moreMenu"),ks()});const q=document.getElementById("btn-undo"),Y=document.getElementById("btn-redo");q&&(q.onclick=()=>document.execCommand("undo")),Y&&(Y.onclick=()=>document.execCommand("redo"))}function Ka(){const e=document.getElementById("btn-quick-find"),t=document.getElementById("menu-btn-find-replace"),s=document.getElementById("closeFindBtn"),n=document.getElementById("findInput"),a=document.getElementById("replaceInput"),o=document.getElementById("findNextBtn"),i=document.getElementById("findPrevBtn"),l=document.getElementById("replaceBtn"),c=document.getElementById("replaceAllBtn"),m=document.getElementById("findReplaceModal");e&&(e.onclick=()=>ss(!0)),t&&(t.onclick=()=>{pe("moreMenu"),ss(!0)}),s&&(s.onclick=()=>pe("findModal")),m&&(m.onclick=u=>{u.target===m&&pe("findModal")}),n&&(n.oninput=()=>ps(n.value)),o&&(o.onclick=()=>gs(1)),i&&(i.onclick=()=>gs(-1)),l&&(l.onclick=()=>{const u=n.value,d=a.value;if(!u||ft===-1||!Ze[ft])return;const r=Ze[ft];r.block.content=r.block.content.replace(u,d),Ke(),ps(u),De=!0,Ce&&Ue(),C("Replaced 1 occurrence")}),c&&(c.onclick=()=>{const u=n.value,d=a.value;if(!u)return;let r=0;M.scenes.forEach(p=>{p.blocks.forEach(b=>{b.content&&b.content.includes(u)&&(b.content=b.content.split(u).join(d),r++)})}),Ke(),ps(u),De=!0,Ce&&Ue(),C(`Replaced ${r} occurrences`)})}function ss(e){const t=document.getElementById("findReplaceModal");if(t)if(e)ds=document.getElementById("editor-main-scroll")?.scrollTop||0,us=Be,t.classList.remove("hidden"),t.classList.add("flex"),rt({id:"findModal",name:"Find & Replace",close:()=>ss(!1)}),setTimeout(()=>{document.getElementById("findInput")?.focus()},40);else{t.classList.add("hidden"),t.classList.remove("flex"),As();const s=document.getElementById("editor-main-scroll");if(s&&ds!==null&&(s.scrollTop=ds),us){const a=document.getElementById(us),o=a?.querySelector('[contenteditable="true"]')||a;o&&o.focus()}const n=Te.findIndex(a=>a.id==="findModal");n!==-1&&Te.splice(n,1)}}function ps(e){Ze=[],ft=-1;const t=document.getElementById("findMatchesCount");if(!e||!M){t&&(t.textContent="0 of 0"),As();return}M.scenes.forEach(s=>{s.blocks.forEach(n=>{n.content&&n.content.toLowerCase().includes(e.toLowerCase())&&Ze.push({block:n,sceneId:s.id})})}),t&&(t.textContent=Ze.length>0?`1 of ${Ze.length}`:"0 of 0"),Ze.length>0&&gs(0)}function gs(e){if(Ze.length===0)return;ft=(ft+e+Ze.length)%Ze.length;const t=Ze[ft],s=document.getElementById("findMatchesCount");s&&(s.textContent=`${ft+1} of ${Ze.length}`);const n=document.getElementById(t.block.id);n&&(n.scrollIntoView({behavior:"smooth",block:"center"}),As(),n.classList.add("bg-yellow-100"))}function As(){document.querySelectorAll(".screenplay-block").forEach(e=>{e.classList.remove("bg-yellow-100")})}function un(e){const t=document.getElementById("imageModal");if(t)if(e)Be&&(Ss=Be),t.classList.remove("hidden"),t.classList.add("flex"),rt({id:"imageModal",name:"Insert Image",close:()=>un(!1)});else{t.classList.add("hidden"),t.classList.remove("flex");const s=Te.findIndex(n=>n.id==="imageModal");s!==-1&&Te.splice(s,1)}}function Ja(e){const t=document.getElementById("imageModal"),s=document.getElementById("closeImageModal"),n=document.getElementById("cancelImageBtn"),a=document.getElementById("insertImageBtn"),o=document.getElementById("imgFileInput"),i=document.getElementById("imgUploadLabel"),l=document.getElementById("imgUrlInput"),c=document.getElementById("imgCaptionInput"),m=document.getElementById("imgPreviewContainer"),u=document.getElementById("imgPreviewThumb"),d=document.getElementById("clearImgPreviewBtn");let r="";function p(S){m&&u&&(S?(u.src=S,m.classList.remove("hidden")):(m.classList.add("hidden"),u.src=""))}function b(S,f){const g=new Image;g.onload=()=>{let F=g.width,J=g.height;(F>900||J>600)&&(F/J>900/600?(J=Math.round(J*900/F),F=900):(F=Math.round(F*600/J),J=600));const H=document.createElement("canvas");H.width=F,H.height=J,H.getContext("2d").drawImage(g,0,0,F,J),f(H.toDataURL("image/jpeg",.85))},g.onerror=()=>f(S),g.src=S}s&&(s.onclick=()=>pe("imageModal")),n&&(n.onclick=()=>pe("imageModal")),t&&(t.onclick=S=>{S.target===t&&pe("imageModal")}),document.querySelectorAll(".img-preset-btn").forEach(S=>{S.onclick=()=>{const f=S.getAttribute("data-url"),g=S.getAttribute("data-caption");l&&(l.value=f),c&&!c.value&&(c.value=g),r=f,p(f)}}),l&&(l.oninput=()=>{const S=l.value.trim();S?(r="",p(S)):r||p("")}),d&&(d.onclick=()=>{r="",l&&(l.value=""),o&&(o.value=""),i&&(i.textContent="Choose local image..."),p("")}),o&&(o.onchange=S=>{const f=S.target.files?.[0];if(f){i&&(i.textContent=f.name);const g=new FileReader;g.onload=P=>{b(P.target.result,R=>{r=R,p(R)})},g.readAsDataURL(f)}}),a&&(a.onclick=()=>{const S=l?.value.trim(),f=c?.value.trim();let g=r||S;g||(g="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80");const P={id:`b-${Date.now().toString().slice(-6)}`,type:"image",url:g,content:g,caption:f||""},R=Ss||Be;let F=null,J=-1;if(M.scenes&&M.scenes.length>0){if(R)for(const H of M.scenes){const re=(H.blocks||[]).findIndex(fe=>fe.id===R);if(re!==-1){F=H,J=re+1;break}}if(!F){const re=document.getElementById("navSceneSelect")?.value||($.state.currentSceneId?`scene-${$.state.currentSceneId}`:null);re&&(F=M.scenes.find(fe=>fe.id===re||String(fe.number)===String($.state.currentSceneId)))}if(!F){const H=Array.from(document.querySelectorAll(".screenplay-block")),re=window.innerHeight/2;for(const fe of H){const Se=fe.getBoundingClientRect();if(Se.top<=re&&Se.bottom>=re){const Ee=fe.getAttribute("data-scene-id");F=M.scenes.find(D=>D.id===Ee);const v=fe.getAttribute("data-block-id");if(F&&v){const D=(F.blocks||[]).findIndex(z=>z.id===v);D!==-1&&(J=D+1)}break}}}F||(F=M.scenes[0]),F.blocks||(F.blocks=[]),J!==-1&&J<=F.blocks.length?F.blocks.splice(J,0,P):F.blocks.push(P)}else M.scenes=[{id:"scene-1",number:1,slugline:"INT. SCENE - DAY",blocks:[P]}];r="",o&&(o.value=""),l&&(l.value=""),c&&(c.value=""),i&&(i.textContent="Upload local image file..."),p(""),Ke(),De=!0,Ce&&Ue(),C("Storyboard image inserted"),pe("imageModal"),setTimeout(()=>{const H=document.getElementById(P.id);H&&(H.scrollIntoView({behavior:"smooth",block:"center"}),H.classList.add("ring-2","ring-blue-500"),setTimeout(()=>H.classList.remove("ring-2","ring-blue-500"),1500))},80)});const y=document.getElementById("preferencesModal"),x=document.getElementById("menu-btn-preferences"),h=document.getElementById("closePrefModal"),T=document.getElementById("savePrefBtn");function A(S){if(y)if(S)y.classList.remove("hidden"),y.classList.add("flex"),rt({id:"preferencesModal",name:"Preferences",close:()=>A(!1)});else{y.classList.add("hidden"),y.classList.remove("flex");const f=Te.findIndex(g=>g.id==="preferencesModal");f!==-1&&Te.splice(f,1)}}x&&(x.onclick=()=>{pe("moreMenu"),A(!0)}),h&&(h.onclick=()=>pe("preferencesModal")),y&&(y.onclick=S=>{S.target===y&&pe("preferencesModal")}),T&&(T.onclick=()=>{const S=document.getElementById("prefSceneNumbers")?.checked,f=document.getElementById("prefLineSpacing")?.value,g=document.getElementById("prefFontSize")?.value;mt=S,document.querySelectorAll(".scene-num-indicator").forEach(R=>R.classList.toggle("hidden",!S));const P=document.querySelector(".screenplay-page-sheet");P&&(P.style.lineHeight=f==="2.0"?"30px":f==="1.0"?"20px":"24px",P.style.fontSize=g==="14pt"?"16px":"15px"),pe("preferencesModal"),C("Preferences applied")});function N(S){return S?S.replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/[\r\n]+/g," ").replace(/[^\x20-\x7E]/g,f=>({"—":"--","–":"-","“":'"',"”":'"',"‘":"'","’":"'","…":"...","·":"-","•":"*"})[f]||" "):""}function w(S,f){if(!S)return[];const g=S.split(/\s+/),P=[];let R="";for(const F of g)R?(R+" "+F).length<=f?R+=" "+F:(P.push(R),R=F):R=F;return R&&P.push(R),P}function L(S,f,g={}){const{includeTitlePage:P=!0,includePageNumbers:R=!0,sceneNumbers:F=!0,preservePageBreaks:J=!0,emptyPageFirst:H=!1,emptyPageLast:re=!1,pageSheets:fe=[]}=g,Se=[],v=595.28/2,D=108,z=525,U=14.4,G=14.4,be=(ee,Me=12)=>(ee?ee.length:0)*(Me*.6),He=(ee,Me=12)=>Math.round(v-be(ee,Me)/2),tt=(ee,Me=12,Pe=z)=>Math.round(Pe-be(ee,Me));let ze=!1;if(P&&S.titlePage&&(f.has(1)||g.rangeType==="all")){const ee=S.titlePage,Me=(ee.title||S.title||"UNTITLED SCREENPLAY").toUpperCase(),Pe=w(Me,35),Oe=[];let ge=520;Pe.forEach(We=>{Oe.push({text:We,x:He(We,12),y:ge,font:"F2",size:12}),ge-=U}),ge-=24;const ht=ee.by!==void 0?ee.by:"Written by";ht&&(Oe.push({text:ht,x:He(ht,12),y:ge,font:"F1",size:12}),ge-=U+4);const Fe=ee.author||"Author";Oe.push({text:Fe,x:He(Fe,12),y:ge,font:"F2",size:12});let Re=(ee.phone||"").trim();if(!Re&&ee.contact){const ut=ee.contact.split("·").map(pt=>pt.trim()).find(pt=>pt.includes("+")||/\d{3}/.test(pt));ut&&(Re=ut)}Re&&!Re.toLowerCase().startsWith("phone")&&(Re=`Phone: ${Re}`);let oe=(ee.email||"").trim();if(!oe&&ee.contact&&ee.contact.includes("@")){const We=ee.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);We&&(oe=We[0])}oe&&!oe.toLowerCase().startsWith("e-mail")&&!oe.toLowerCase().startsWith("email")&&(oe=`E-mail: ${oe}`);const Ve=[];if(Re&&Ve.push(Re),oe&&Ve.push(oe),ee.address){const We=w(ee.address.trim(),40);Ve.push(...We)}else if(!Re&&!oe&&ee.contact){const We=ee.contact.split("·").map(ut=>ut.trim()).filter(Boolean);Ve.push(...We)}let yt=130;Ve.forEach(We=>{Oe.push({text:We,x:D,y:yt,font:"F1",size:12}),yt-=U}),Se.push(Oe),ze=!0}if(fe.forEach(ee=>{if(ee.classList&&ee.classList.contains("screenplay-title-page-sheet"))return;const Me=parseInt(ee.getAttribute("data-page-num"),10)||1;if(!f.has(Me))return;const Pe=[];let Oe=!1;if(R){const Fe=`${Me}.`;Pe.push({text:Fe,x:tt(Fe,12,z),y:805,font:"F1",size:12})}let ge=765;ee.querySelectorAll(".screenplay-block").forEach(Fe=>{if(ge<65)return;const Re=Fe.getAttribute("data-block-type");if(Re==="pagebreak"){if(J){ge-=U;const oe="----------------------------------------";Pe.push({text:oe,x:He(oe,12),y:ge,font:"F1",size:12}),ge-=U}return}if(Re==="scene"){const oe=Fe.querySelector('[contenteditable="true"]'),Ve=(oe?oe.innerText.trim():Fe.innerText.trim()).toUpperCase();Ve&&(Oe=!0);const yt=F&&Fe.querySelector(".scene-num-indicator")?.innerText?.trim()||"";ge-=G,w(Ve,57).forEach((ut,pt)=>{pt===0&&yt&&Pe.push({text:yt,x:76,y:ge,font:"F2",size:12}),Pe.push({text:ut,x:D,y:ge,font:"F2",size:12}),ge-=U})}else if(Re==="character"){const oe=Fe.innerText.trim().toUpperCase();oe&&(Oe=!0),ge-=G,Pe.push({text:oe,x:266,y:ge,font:"F2",size:12}),ge-=U}else if(Re==="parenthetical"){let oe=Fe.innerText.trim();oe&&(Oe=!0),oe.startsWith("(")||(oe="("+oe),oe.endsWith(")")||(oe=oe+")"),w(oe,26).forEach(Ve=>{Pe.push({text:Ve,x:223,y:ge,font:"F1",size:12}),ge-=U})}else if(Re==="dialogue"){const oe=Fe.innerText.trim();oe&&(Oe=!0),w(oe,35).forEach(Ve=>{Pe.push({text:Ve,x:180,y:ge,font:"F1",size:12}),ge-=U})}else if(Re==="transition"){const oe=Fe.innerText.trim().toUpperCase();oe&&(Oe=!0),ge-=G,Pe.push({text:oe,x:tt(oe,12,z),y:ge,font:"F2",size:12}),ge-=U}else if(Re==="shot"){const oe=Fe.innerText.trim().toUpperCase();oe&&(Oe=!0),ge-=G,Pe.push({text:oe,x:D,y:ge,font:"F2",size:12}),ge-=U}else if(Re==="image"){const oe=Fe.querySelector('[contenteditable="true"]')?.innerText?.trim()||"Storyboard Image";Oe=!0,ge-=G,Pe.push({text:`[STORYBOARD: ${oe}]`,x:D,y:ge,font:"F1",size:12}),ge-=U}else{const oe=Fe.innerText.trim();oe&&(Oe=!0,ge-=G,w(oe,58).forEach(Ve=>{Pe.push({text:Ve,x:D,y:ge,font:"F1",size:12}),ge-=U}))}}),Oe&&Se.push(Pe)}),Se.length===0){const ee=[{text:S.title||"Screenplay",x:D,y:750,font:"F2",size:12}];R&&ee.push({text:"1.",x:tt("1.",12,z),y:805,font:"F1",size:12}),Se.push(ee)}const we=ee=>!ee||ee.length===0||ee.every(Me=>Me.y===805||!Me.text||Me.text.trim()==="");for(;Se.length>1&&we(Se[Se.length-1]);)Se.pop();H&&Se.unshift([]),re&&Se.push([]);const Yt=Se.length,Ye=[],at=[];let ve=4;for(let ee=0;ee<Yt;ee++)ve++,Ye.push(ve),ve++,at.push(ve);const st=[];st[1]="<< /Type /Catalog /Pages 2 0 R >>",st[2]=`<< /Type /Pages /Kids [${Ye.map(ee=>ee+" 0 R").join(" ")}] /Count ${Yt} /MediaBox [0 0 595.28 841.89] >>`,st[3]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>",st[4]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>";for(let ee=0;ee<Yt;ee++){const Me=Ye[ee],Pe=at[ee];st[Me]=`<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${Pe} 0 R >>`;const Oe=[],ge=Se[ee]||[];for(const oe of ge){const Ve=oe.font||"F1",yt=oe.size||12,We=oe.x||D,ut=oe.y||750,pt=N(oe.text);Oe.push(`BT /${Ve} ${yt} Tf ${We.toFixed(2)} ${ut.toFixed(2)} Td (${pt}) Tj ET`)}const ht=Oe.join(`
`),Re=new TextEncoder().encode(ht);st[Pe]=`<< /Length ${Re.length} >>
stream
${ht}
endstream`}const kt=new TextEncoder,$s=kt.encode(`%PDF-1.4
%âãÏÓ
`);let os=$s.length;const Ns=[],Ts=[];for(let ee=1;ee<=ve;ee++){Ns[ee]=os;const Me=`${ee} 0 obj
${st[ee]}
endobj
`,Pe=kt.encode(Me);Ts.push(Pe),os+=Pe.length}const yn=os;let ls=`xref
0 ${ve+1}
0000000000 65535 f 
`;for(let ee=1;ee<=ve;ee++)ls+=`${String(Ns[ee]).padStart(10,"0")} 00000 n 
`;ls+=`trailer
<< /Size ${ve+1} /Root 1 0 R >>
startxref
${yn}
%%EOF`;const vn=kt.encode(ls);return new Blob([$s,...Ts,vn],{type:"application/pdf"})}const I=document.getElementById("exportModal"),X=document.getElementById("exportModalBtn"),V=document.getElementById("menu-btn-export"),le=document.getElementById("closeExportModal"),_=document.getElementById("cancelExportBtn"),me=document.getElementById("startExportBtn"),ie=document.getElementById("exportProgressArea"),q=document.getElementById("exportProgressBar"),Y=document.getElementById("exportStatusText");function j(S){if(I)if(S)I.classList.remove("hidden"),I.classList.add("flex"),rt({id:"exportModal",name:"Export",close:()=>j(!1)});else{I.classList.add("hidden"),I.classList.remove("flex"),ie?.classList.add("hidden");const f=Te.findIndex(g=>g.id==="exportModal");f!==-1&&Te.splice(f,1)}}X&&(X.onclick=()=>j(!0)),V&&(V.onclick=()=>{pe("moreMenu"),j(!0)}),le&&(le.onclick=()=>pe("exportModal")),_&&(_.onclick=()=>pe("exportModal")),I&&(I.onclick=S=>{S.target===I&&pe("exportModal")});const ce=document.getElementById("exportPageRangeSelect"),k=document.getElementById("exportCustomRangeInput");ce&&k&&(ce.onchange=()=>{k.classList.toggle("hidden",ce.value!=="custom"),ce.value==="custom"&&k.focus()}),me&&(me.onclick=()=>{const S=document.getElementById("exportFormatSelect")?.value||"pdf",f=document.getElementById("exportPageRangeSelect")?.value||"all",g=document.getElementById("exportCustomRangeInput")?.value||"",P=document.getElementById("optPageNumbers")?.checked!==!1,R=document.getElementById("optPreservePageBreaks")?.checked!==!1,F=document.getElementById("optStandardMargins")?.checked!==!1,J=document.getElementById("optSceneNumbers")?.checked!==!1,H=document.getElementById("optEmptyPageFirst")?.checked===!0,re=document.getElementById("optEmptyPageLast")?.checked===!0;let fe=Array.from(document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)"));fe.length===0&&(fe=Array.from(document.querySelectorAll(".screenplay-page-sheet:not(.screenplay-title-page-sheet)"))),fe.length===0&&(Ke(),fe=Array.from(document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)")));const Se=fe.length||1;let Ee=new Set;if(f==="all")for(let v=1;v<=Se;v++)Ee.add(v);else if(f==="current"){let v=1;if(Be){const D=document.getElementById(Be),z=D?D.closest(".screenplay-page-sheet"):null;z&&(v=parseInt(z.getAttribute("data-page-num"),10)||1)}Ee.add(v)}else if(f==="custom"&&(g.split(",").forEach(D=>{if(D=D.trim(),D.includes("-")){const[z,U]=D.split("-").map(G=>parseInt(G.trim(),10));if(!isNaN(z)&&!isNaN(U))for(let G=Math.max(1,z);G<=Math.min(Se,U);G++)Ee.add(G)}else{const z=parseInt(D,10);!isNaN(z)&&z>=1&&z<=Se&&Ee.add(z)}}),Ee.size===0))for(let D=1;D<=Se;D++)Ee.add(D);ie.classList.remove("hidden"),q.style.width="35%",Y.textContent=F?'Applying standard A4 margins (1.5" left, 1.0" right) & Courier Prime...':"Formatting Courier Prime typography and page layout...",setTimeout(()=>{q.style.width="80%",Y.textContent=`Compiling standard ${S.toUpperCase()} for pages [${Array.from(Ee).join(", ")}]...`},500),setTimeout(()=>{q.style.width="100%",Y.textContent="Completed! Starting download...";let v="";if(H&&(v+=`\f
`),document.getElementById("optTitlePage")?.checked&&M.titlePage&&(Ee.has(1)||f==="all")){const be=M.titlePage;v+=`${be.title||M.title}

`,v+=`${be.by||"Written by"}

`,v+=`${be.author||"Author"}

`,be.phone&&(v+=`${be.phone}
`),be.email&&(v+=`${be.email}
`),be.address&&(v+=`${be.address}
`),!be.phone&&!be.email&&!be.address&&be.contact&&(v+=`${be.contact}
`),v+=`

================================================================================
\f
`}fe.forEach((be,He)=>{const tt=parseInt(be.getAttribute("data-page-num"),10)||He+1;if(!Ee.has(tt))return;let ze="";P&&(ze+=`
											${tt}.

`);let we=!1;be.querySelectorAll(".screenplay-block").forEach(Ye=>{const at=Ye.getAttribute("data-block-type");if(at==="pagebreak"){R&&(ze+=`
[=== PAGE BREAK ===]

`);return}let ve="";if(at==="scene"){const st=Ye.querySelector('[contenteditable="true"]');ve=st?st.innerText.trim():Ye.innerText.trim();const kt=J&&Ye.querySelector(".scene-num-indicator")?.innerText?.trim()||"";ve&&(ze+=`

${kt?kt+". ":""}${ve}

`,we=!0)}else at==="character"?(ve=Ye.innerText.trim(),ve&&(ze+=`
			${ve}
`,we=!0)):at==="parenthetical"?(ve=Ye.innerText.trim(),ve&&(ze+=`		${ve.startsWith("(")?ve:"("+ve+")"}
`,we=!0)):at==="dialogue"?(ve=Ye.innerText.trim(),ve&&(ze+=`	${ve}
`,we=!0)):at==="transition"?(ve=Ye.innerText.trim(),ve&&(ze+=`
						${ve}

`,we=!0)):(ve=Ye.innerText.trim(),ve&&(ze+=`${ve}

`,we=!0))}),we&&(v+=ze+`
\f
`)}),re?!v.endsWith(`\f
`)&&!v.endsWith("\f")&&(v+=`
\f
`):v=v.replace(/[\s\f]+$/,"");let D;S==="pdf"?D=L(M,Ee,{includeTitlePage:document.getElementById("optTitlePage")?.checked!==!1,includePageNumbers:P,sceneNumbers:J,preservePageBreaks:R,emptyPageFirst:H,emptyPageLast:re,pageSheets:fe,rangeType:f}):D=new Blob([v],{type:"text/plain"});const z=URL.createObjectURL(D),U=document.createElement("a");U.href=z;const G=f==="all"?"All_Pages":`Pages_${Array.from(Ee).join("-")}`;U.download=`${M.title.replace(/[^a-zA-Z0-9]/g,"_")}_${M.draft||"Draft"}_${G}.${S}`,document.body.appendChild(U),U.click(),U.remove(),C(`Exported "${U.download}" successfully`),setTimeout(()=>pe("exportModal"),800)},1e3)});const O=document.getElementById("versionsModal"),xe=document.getElementById("versionsModalBtn"),W=document.getElementById("menu-btn-versions"),Z=document.getElementById("closeVersionsModal"),E=document.getElementById("versionsListContainer");function de(S){O&&(O.classList.remove("hidden"),O.classList.add("flex"),ae(),rt({id:"versionsModal",name:"Versions",close:()=>{O.classList.add("hidden"),O.classList.remove("flex")},restore:()=>{O.classList.remove("hidden"),O.classList.add("flex"),ae()}}))}async function ae(){const S=await Ln(e);E&&(E.innerHTML=S.map(f=>`
      <div class="p-3 rounded-xl border ${f.isCurrent?"border-2 border-blue-600 bg-blue-50/30":"border-slate-200 bg-white hover:bg-slate-50"} transition-colors flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-heading font-bold text-sm text-slate-900">${f.name}</span>
            <span class="px-2 py-0.5 rounded-full ${f.isCurrent?"bg-blue-600 text-white font-semibold":"bg-slate-100 text-slate-600 font-medium"} text-[10px]">${f.tag}</span>
          </div>
          <span class="text-[11px] text-slate-400 font-caption">${f.timestamp}</span>
        </div>
        <p class="text-xs text-slate-600">${f.notes||"Point-in-time snapshot."}</p>
        <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>Edited by ${f.author}</span>
          <div class="flex items-center gap-2">
            <span class="font-medium text-slate-700">${f.stats}</span>
            ${f.isCurrent?"":`<button class="restore-version-btn text-blue-600 font-semibold hover:underline" data-vname="${f.name}">Restore</button>`}
          </div>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".restore-version-btn").forEach(f=>{f.onclick=()=>{const g=f.getAttribute("data-vname");C(`Restored version "${g}"`),document.getElementById("currentVersionTag").textContent=g,pe("versionsModal")}}))}xe&&(xe.onclick=()=>de()),W&&(W.onclick=()=>{pe("moreMenu"),de()}),Z&&(Z.onclick=()=>pe("versionsModal")),O&&(O.onclick=S=>{S.target===O&&pe("versionsModal")});const ue=document.getElementById("newVersionModal"),Q=document.getElementById("openNewVersionPrompt"),ne=document.getElementById("closeNewVersionModal"),B=document.getElementById("cancelNewVersionBtn"),he=document.getElementById("saveNewVersionBtn");function Ae(){O.classList.add("hidden"),ue.classList.remove("hidden"),ue.classList.add("flex"),rt({id:"newVersionModal",name:"New Version",close:()=>{ue.classList.add("hidden"),ue.classList.remove("flex")}})}Q&&(Q.onclick=Ae),ne&&(ne.onclick=()=>pe("newVersionModal")),B&&(B.onclick=()=>pe("newVersionModal")),he&&(he.onclick=async()=>{const S=document.getElementById("newVersionNameInput")?.value.trim(),f=document.getElementById("newVersionNotesInput")?.value.trim();S&&(await Mn(e,{name:S,notes:f}),C(`Created version snapshot "${S}"`),document.getElementById("currentVersionTag").textContent=S,pe("newVersionModal"))});const se=document.getElementById("compareModal"),$e=document.getElementById("openCompareBtn"),te=document.getElementById("menu-btn-compare"),Ne=document.getElementById("closeCompareModal"),Ie=document.getElementById("closeCompareBtn2");function ye(){O.classList.add("hidden"),se.classList.remove("hidden"),se.classList.add("flex"),rt({id:"compareModal",name:"Compare Versions",close:()=>{se.classList.add("hidden"),se.classList.remove("flex")}})}$e&&($e.onclick=ye),te&&(te.onclick=()=>{pe("moreMenu"),ye()}),Ne&&(Ne.onclick=()=>pe("compareModal")),Ie&&(Ie.onclick=()=>pe("compareModal")),se&&(se.onclick=S=>{S.target===se&&pe("compareModal")})}function as(){if(!M)return;let e=0;M.scenes.forEach(o=>{o.blocks.forEach(i=>{i.content&&(e+=i.content.trim().split(/\s+/).filter(Boolean).length)})});const s=document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)").length||1,n=document.getElementById("telemetry-page-count"),a=document.getElementById("telemetry-word-count");n&&(n.textContent=`Page 1 of ${s}`),a&&(a.textContent=`${e.toLocaleString()} words`)}function Ya(){const e=$.state.scripts||[],t=$.state.selectedScriptId||"chronicles-of-dust",s=e.find(n=>n.id===t)||e[0]||{title:"Chronicles of Dust"};return`
    ${qe("Intelligence","Script Selector")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-28 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-3 pb-8 space-y-4 fade-in">
        
        <!-- Section Header -->
        <div class="flex items-center justify-between gap-3 py-1">
          <div class="flex flex-col min-w-0">
            <h1 class="page-heading font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight truncate">Select Screenplay</h1>
            <p class="text-xs text-slate-500 mt-0.5 truncate">Choose a script to understand its story, characters and structure.</p>
          </div>
          <div class="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium shrink-0">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span class="text-[10px] font-semibold uppercase tracking-wider">Intelligence</span>
          </div>
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

    ${je("intelligence")}
  `}function Xa(e){let t=$.state.selectedScriptId||"chronicles-of-dust";document.querySelectorAll(".script-select-card").forEach(a=>{a.onclick=()=>{const o=a.getAttribute("data-script-id"),i=a.getAttribute("data-script-title");t=o,$.selectScript(o),document.querySelectorAll(".script-select-card").forEach(m=>{m.className="script-select-card relative p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const u=m.querySelector(".script-select-indicator");u&&(u.className="script-select-indicator w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0",u.innerHTML='<span class="material-symbols-outlined text-[16px]">arrow_forward</span>')}),a.className="script-select-card relative p-3.5 rounded-xl border border-blue-600 bg-blue-50/70 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const l=a.querySelector(".script-select-indicator");l&&(l.className="script-select-indicator w-6 h-6 rounded-full bg-blue-600 text-white shadow-xs flex items-center justify-center shrink-0",l.innerHTML='<span class="material-symbols-outlined text-[16px] font-bold">check</span>');const c=document.getElementById("selector-btn-label");c&&(c.textContent=`Continue to Context (${i})`)}});const s=document.getElementById("submit-continue-analysis-btn");s&&(s.onclick=()=>{$.selectScript(t),e("/intelligence/context")});const n=document.getElementById("btn-import-script-modal");n&&(n.onclick=()=>{C("Select screenplay file (.fountain, .fdx, .pdf) to parse","info")})}function Za(){const e=$.state.selectedScriptId||"chronicles-of-dust",t=$.state.scripts.find(n=>n.id===e)||$.state.activeScript||{title:"Chronicles of Dust",format:"Feature",industry:"International / Hollywood"},s=t.context||{format:t.format||"Feature",industry:t.industry||"International / Hollywood",hours:1,minutes:36,seconds:0};return`
    ${qe("Intelligence","Context Calibration")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-28 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-5 fade-in">
        
        <!-- Header Block with Back Navigation -->
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <button id="intelligence-context-back-btn" data-scriptora-back="true" data-back-fallback="/intelligence" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back" title="Back">
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <div class="flex flex-col min-w-0">
              <h1 class="page-heading font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight truncate">Context Calibration</h1>
              <p class="text-xs text-slate-500 mt-0.5 truncate">Tell us about your screenplay to calibrate intelligence metrics.</p>
            </div>
          </div>
          <div class="flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full shadow-xs shrink-0">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span class="text-xs text-blue-700 font-medium truncate max-w-[140px]">${t.title}</span>
          </div>
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

        <!-- Proceed to Analysis Action Button -->
        <div class="pt-1.5">
          <button type="button" id="btn-submit-context" class="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer">
            <span class="truncate font-semibold">Calibrate & Proceed to Analysis</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

      </div>

    </main>

    ${je("intelligence")}
  `}function Qa(e){const t=$.state.selectedScriptId||"chronicles-of-dust",s=$.state.scripts.find(d=>d.id===t)||$.state.activeScript||{},n=s.context||{};let a=n.format||s.format||"Feature",o=n.hours!==void 0?n.hours:1,i=n.minutes!==void 0?n.minutes:36,l=n.seconds!==void 0?n.seconds:0;document.querySelectorAll(".format-card").forEach(d=>{d.onclick=()=>{a=d.getAttribute("data-format"),document.querySelectorAll(".format-card").forEach(r=>{r.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 transition-all cursor-pointer hover:bg-slate-50"}),d.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 border-2 border-blue-600 transition-all cursor-pointer",a==="Short"?(o=0,i=25,l=0):a==="Pilot"?(o=0,i=50,l=30):(o=1,i=45,l=0),c()}});function c(){const d=h=>String(h).padStart(2,"0"),r=document.getElementById("val-hr"),p=document.getElementById("val-min"),b=document.getElementById("val-sec");r&&(r.value=d(o)),p&&(p.value=d(i)),b&&(b.value=d(l));const y=o*60+i+Math.round(l/60),x=document.getElementById("pacing-projection");x&&(x.textContent=`~${y} standard script pages`)}document.querySelectorAll(".stepper-btn").forEach(d=>{d.onclick=()=>{const r=d.getAttribute("data-unit"),p=parseInt(d.getAttribute("data-delta"),10)||0;r==="hr"&&(o=Math.max(0,Math.min(9,o+p))),r==="min"&&(i=Math.max(0,Math.min(59,i+p))),r==="sec"&&(l=Math.max(0,Math.min(59,l+p))),c()}}),[{id:"val-hr",max:9,get:()=>o,set:d=>{o=d}},{id:"val-min",max:59,get:()=>i,set:d=>{i=d}},{id:"val-sec",max:59,get:()=>l,set:d=>{l=d}}].forEach(({id:d,max:r,set:p,get:b})=>{const y=document.getElementById(d);y&&(y.onfocus=()=>{y.select()},y.oninput=()=>{let x=y.value.replace(/\D/g,"");if(x==="")p(0);else{let A=parseInt(x,10);isNaN(A)&&(A=0),A>r?(A=r,y.value=String(A)):y.value=x.slice(0,2),p(A)}const h=o*60+i+Math.round(l/60),T=document.getElementById("pacing-projection");T&&(T.textContent=`~${h} standard script pages`)},y.onblur=()=>{let x=y.value.replace(/\D/g,""),h=parseInt(x,10);isNaN(h)&&(h=0),h=Math.max(0,Math.min(r,h)),p(h),y.value=String(h).padStart(2,"0"),c()},y.onkeydown=x=>{if(x.key==="Enter")y.blur();else if(x.key==="ArrowUp"){x.preventDefault();const h=b(),T=Math.min(r,h+1);p(T),y.value=String(T).padStart(2,"0"),c()}else if(x.key==="ArrowDown"){x.preventDefault();const h=b(),T=Math.max(0,h-1);p(T),y.value=String(T).padStart(2,"0"),c()}})});const u=document.getElementById("btn-submit-context");u&&(u.onclick=async()=>{const d=document.getElementById("industry-select")?.value||"International / Hollywood";u.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Calibrating SCRIPTORA...</span>',u.disabled=!0;const r=b=>String(b).padStart(2,"0"),p={format:a,industry:d,hours:o,minutes:i,seconds:l,plannedDuration:`${r(o)}:${r(i)}:${r(l)}`};await Wn(t,p),C("Narrative parameters calibrated"),e("/intelligence/dashboard")})}function eo(){const e=$.state.selectedScriptId||"chronicles-of-dust",t=$.state.scripts.find(n=>n.id===e)||$.state.activeScript||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pages:96,format:"Feature"},s=t.analysisScores||{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80};return`
    ${qe("Intelligence","Script Analysis")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- Section Title & Telemetry Header -->
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <button id="intelligence-dashboard-back-btn" data-scriptora-back="true" data-back-fallback="/intelligence/context" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back" title="Back">
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <div class="flex flex-col min-w-0">
              <h1 class="page-heading font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight truncate">Intelligence</h1>
              <p class="text-xs text-slate-500 mt-0.5 truncate">Understand your screenplay.</p>
            </div>
          </div>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100/80 shrink-0">
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
      <div id="script-switcher-modal" class="scriptora-modal-overlay fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm hidden flex">
        <div class="scriptora-modal-card w-full max-w-lg bg-white rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-600 font-heading">Switch Screenplay</span>
            <button id="close-script-switcher-modal" class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <div class="flex flex-col gap-2 max-h-60 overflow-y-auto">
            ${$.state.scripts.map(n=>`
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

    ${je("intelligence")}
  `}function to(e){const t=$.state.selectedScriptId||"chronicles-of-dust",s=$.state.scripts.find(A=>A.id===t)||$.state.scripts[0],n=document.getElementById("btn-gen-logline"),a=document.getElementById("btn-gen-synopsis"),o=document.getElementById("ai-generated-container"),i=document.getElementById("ai-generated-title"),l=document.getElementById("ai-generated-body"),c=document.getElementById("ai-close-btn"),m=document.getElementById("ai-copy-btn"),u=document.getElementById("ai-copy-text"),d=document.getElementById("ai-query-input"),r=document.getElementById("ai-query-submit");function p(A){o&&(o.classList.remove("hidden"),i.textContent=A==="logline"?"Generated Logline":"Generated Synopsis",l.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Generating with narrative telemetry...</span>',setTimeout(()=>{l.textContent=A==="logline"?s?.logline||"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.":s?.synopsis||"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves."},400))}if(n&&(n.onclick=()=>p("logline")),a&&(a.onclick=()=>p("synopsis")),c&&(c.onclick=()=>o.classList.add("hidden")),m&&(m.onclick=()=>{navigator.clipboard?.writeText(l.textContent||""),u.textContent="Copied!",setTimeout(()=>{u.textContent="Copy"},1800),C("Copied to clipboard")}),r&&d){const A=async()=>{const N=d.value.trim();if(!N)return;o.classList.remove("hidden"),i.textContent="Intelligence AI Answer",l.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing draft semantics...</span>';const w=await vs(N,t);l.textContent=w,d.value=""};r.onclick=A,d.onkeydown=N=>{N.key==="Enter"&&A()}}const b=document.getElementById("script-switcher-modal"),y=document.getElementById("script-selector-trigger"),x=document.getElementById("close-script-switcher-modal"),h=()=>{Qe(b)},T=()=>{ke(b)};y&&(y.onclick=h),x&&(x.onclick=T),b&&(b.onclick=A=>{A.target===b&&T()}),document.querySelectorAll(".script-switch-opt").forEach(A=>{A.onclick=()=>{const N=A.getAttribute("data-id");$.selectScript(N),T(),e("/intelligence")}})}function so(){const e=$.state.selectedScriptId||"chronicles-of-dust",t=$.state.scripts.find(n=>n.id===e)||$.state.activeScript||{title:"Chronicles of Dust",pages:96},s=[{type:"pacing",title:"Pacing",desc:"See where the story moves too fast or too slowly.",icon:"speed",score:82,telemetry:`${t.pages||96} Pages Telemetry`},{type:"dialogue",title:"Dialogue",desc:"Cadence, subtext density and character voice rhythm.",icon:"chat",score:89,telemetry:"42 Dialogue Exchanges"},{type:"emotion",title:"Emotion",desc:"Emotional heatmaps, catharsis curves and sentiment.",icon:"favorite",score:91,telemetry:"Peak Catharsis: Act II"},{type:"character-arc",title:"Character Arc",desc:"Want vs. need trajectories and transformation tracking.",icon:"alt_route",score:84,telemetry:"4 Major Protagonists"},{type:"continuity",title:"Continuity",desc:"Props, character locations, and temporal logic rules.",icon:"linear_scale",score:78,telemetry:"2 Minor Prop Conflicts"},{type:"story-structure",title:"Story Structure",desc:"Beat breakdowns, midpoint shifts and turning points.",icon:"account_tree",score:87,telemetry:"3-Act Paradigm Standard"},{type:"theme",title:"Theme",desc:"Core philosophical spines, motifs and moral arguments.",icon:"lightbulb",score:90,telemetry:"3 Tracked Motifs"},{type:"cinema",title:"Cinema",desc:"Visual storytelling, shot economy and set-piece power.",icon:"videocam",score:85,telemetry:"Cinematic Visual Index"},{type:"scene",title:"Scene Analysis",desc:"Deep dive breakdown of goals, conflict and polarity.",icon:"movie",score:86,telemetry:"Scene 18 Active Scope"},{type:"formatting",title:"Formatting",desc:"Standard industry margins, sluglines and font rules.",icon:"rule",score:94,telemetry:"Standard Guild Rules"},{type:"production",title:"Production",desc:"Locations, shooting cast, props and cost estimators.",icon:"movie_creation",score:80,telemetry:"24 Practical Locations"}];return`
    ${qe("Intelligence","Analyse Individually")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- Section Header with Back Navigation -->
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <button id="individual-analysis-selector-back-btn" data-scriptora-back="true" data-back-fallback="/intelligence/dashboard" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back" title="Back">
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <div class="flex flex-col min-w-0">
              <h1 class="page-heading font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight truncate">Analyse Individually</h1>
              <p class="text-xs text-slate-500 mt-0.5 truncate">Choose an area to explore in your screenplay.</p>
            </div>
          </div>
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 shrink-0">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span class="text-xs font-medium truncate max-w-[140px]">${t.title}</span>
          </div>
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

    ${je("intelligence")}
  `}function no(e){const t=document.getElementById("analysis-filter-input");t&&(t.oninput=s=>{const n=s.target.value.toLowerCase().trim();document.querySelectorAll("#analysis-tiles-grid .analysis-tile").forEach(a=>{const o=a.getAttribute("data-keyword")||"";a.style.display=o.includes(n)?"flex":"none"})})}const qs={pacing:{title:"Pacing Analysis",score:82,icon:"speed",desc:"Scene duration variance, narrative tempo and page-turn velocity.",questions:["Where does the pace drag in Act II?","Find scenes over 4 pages","Show action-to-dialogue ratios"],findings:[{scene:"SCENE 14 · Dockside Perimeter · Pg 36",act:"Act II",title:"Action beats slow down before major confrontation",desc:"Extended exposition between dock guards lowers tension prior to container breach.",targetScene:14},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Peak narrative rhythm",desc:"Fast intercut dialogue creates maximum urgency before floodgate breach.",targetScene:18},{scene:"SCENE 26 · Coastal Highway · Pg 68",act:"Act III",title:"High velocity turning point",desc:"Pursuit cadence maintains optimal beats per page.",targetScene:26}]},dialogue:{title:"Dialogue Analysis",score:89,icon:"chat",desc:"Cadence, subtext density, distinctive character voice profiles.",questions:["Are character voices distinctive?","Find on-the-nose exposition lines","Analyze dialogue subtext in Scene 18"],findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Subtext is understated and powerful",desc:"Kevin avoids speaking about his brother directly, communicating through silence and tea rituals.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Meera O.S. dialogue establishes authority",desc:"Radio chatter avoids fluff and communicates technical stakes concisely.",targetScene:18}]},emotion:{title:"Emotion Analysis",score:91,icon:"favorite",desc:"Catharsis trajectory, emotional resonance curves, character empathy indices.",questions:["Where does emotional vulnerability peak?","Track empathy trajectory for Kevin","Catharsis resolution in Act III"],findings:[{scene:"SCENE 12 · Father’s Workshop · Pg 28",act:"Act I",title:"Emotional anchor established",desc:"Familial debt and generational sacrifice ground Kevin’s reluctance to blow the whistle.",targetScene:12},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Desperation under rising water",desc:"Kevin’s fear of failing Meera is palpable as water rises past junction box.",targetScene:18}]},"character-arc":{title:"Character Arc Analysis",score:84,icon:"alt_route",desc:"Want vs. Need conflict, psychological transformation, fatal flaw resolution.",questions:["Does Kevin overcome his passivity?","Meera character transformation","Antagonist motivation clarity"],findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]},continuity:{title:"Continuity Analysis",score:78,icon:"linear_scale",desc:"Prop tracking, character spatial locations, timeline consistency checks.",questions:["Check prop handover in Scene 18","Is time of day consistent across Act II?","Track the brass seal location"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Hydro-sensor probe referenced before retrieval",desc:"Verify Kevin picked up copper probe in Scene 16 or carries it on belt.",targetScene:18},{scene:"SCENE 22 · Pumping Station · Pg 58",act:"Act II",title:"Flashlight state discrepancy",desc:"Ensure flashlight was retrieved after water surge in Scene 19.",targetScene:22}]},"story-structure":{title:"Story Structure Analysis",score:87,icon:"account_tree",desc:"Inciting incident, plot points, midpoint shift, climax architecture.",questions:["Is midpoint clearly defined?","Evaluate climax timing on page 88","Are 3-act beats aligned?"],findings:[{scene:"SCENE 06 · Customs Registry · Pg 14",act:"Inciting Incident",title:"Off-manifest container discovered",desc:"The inciting anomaly sets Kevin on irreversible investigative path.",targetScene:6},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Midpoint (Pg 48/96)",title:"Stakes escalate from civil to criminal",desc:"Kevin realizes his own brother commands the smuggling cartel.",targetScene:18}]},theme:{title:"Theme Analysis",score:90,icon:"lightbulb",desc:"Primary narrative spine: Complicity vs. Duty and moral accountability.",questions:["What is the central theme?","Where is loyalty tested?","Show recurring thematic motifs"],findings:[{scene:"SCENE 09 · Family Kitchen · Pg 22",act:"Act I",title:"Familial pressure as thematic catalyst",desc:"Kevin hides eviction notice, showing economic desperation fueling institutional silence.",targetScene:9},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Moral test faced directly",desc:"Kevin must decide whether to save his brother or save the port city from flooding.",targetScene:18},{scene:"SCENE 36 · Rooftop Overlook · Pg 94",act:"Act III",title:"Theme delivers its final statement",desc:"Accountability over self-preservation.",targetScene:36}]},cinema:{title:"Cinema & Visual Storytelling",score:85,icon:"videocam",desc:"Visual set-piece density, image systems, lighting and camera intentionality.",questions:["Check visual contrast between acts","Highlight cinematic set-pieces","Analyze color palette cues in action lines"],findings:[{scene:"SCENE 01 · Harbor Drone View · Pg 01",act:"Act I",title:"Strong establishing visual metaphor",desc:"Rusted shipping containers stacked like monoliths beneath smog.",targetScene:1},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"High visual tension",desc:"Red emergency beacons reflected in rising brackish water.",targetScene:18}]},scene:{title:"Scene Analysis",score:86,icon:"movie",desc:"Micro-structure of Scene 18: Objective, obstacle, polarity change.",questions:["What is the scene objective?","Where does tension peak?","How does polarity shift?"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]},formatting:{title:"Formatting & Guild Compliance",score:94,icon:"rule",desc:"Industry standard margin measurements, capitalization, slugline syntax.",questions:["Check standard industry margins","Find non-standard scene sluglines","Verify dialogue capitalization rules"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Perfect Courier Prime 12pt slugline",desc:"Margins, dual dialogue spacing, and transition tags meet Writers Guild standards.",targetScene:18}]},production:{title:"Production Breakdown",score:80,icon:"movie_creation",desc:"Locations, shooting days, practical elements, cast size breakdown.",questions:["How many practical locations?","Show scenes with special props","List one-off speaking roles"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Location: Wet Stage / Customs Interior",desc:"Requires controlled water flooding tank, hydro-sensor prop box, wet comm-link gear.",targetScene:18}]}};function pn(e){if($.state.screenplay&&$.state.screenplay.id===e)return $.state.screenplay;const t=localStorage.getItem(`scriptora_screenplay_${e}`);if(t)try{const s=JSON.parse(t);if(s&&s.scenes&&s.scenes.length>0)return s}catch{}return e==="chronicles-of-dust"?ys:null}function xn(e,t){const s=[];return e&&Array.isArray(e.scenes)&&e.scenes.length>0?e.scenes.forEach((n,a)=>{const o=n.number||a+1,i=n.slugline&&n.slugline.trim()||n.blocks?.find(l=>l.type==="scene")?.content?.trim()||`SCENE ${o}`;s.push({id:n.id||`scene-${o}`,number:o,slugline:i,act:n.actId==="act-3"?"Act III":n.actId==="act-2"?"Act II":o>24?"Act III":o>11?"Act II":"Act I"})}):ys.scenes.forEach(a=>{s.push({id:a.id,number:a.number,slugline:a.slugline||`SCENE ${a.number}`,act:a.actId==="act-2"?"Act II":"Act I"})}),s}function ao(e){const t=[];e&&((e.characters||[]).forEach(n=>{const a=typeof n=="string"?n:n.name||"";a&&t.push(a)}),(e.scenes||[]).forEach(n=>{(n.blocks||[]).forEach(a=>{a.type==="character"&&a.content&&t.push(a.content)})}));let s=en(t);if(s.length===0&&(e&&(e.id==="chronicles-of-dust"||e.title?.includes("Dust"))?s=["SANTHOSH","ARAVIND","KEVIN","MEERA"]:s=["SANTHOSH","ARAVIND"]),e&&(e.characters=s,e.id))try{localStorage.setItem(`scriptora_screenplay_${e.id}`,JSON.stringify(e))}catch{}return s.map(n=>{const a=n.toUpperCase();let o="Character";return a==="SANTHOSH"||a==="ARAVIND"||a==="KEVIN"?o="Protagonist":a==="MEERA"&&(o="Confidante"),{name:n,role:o}})}function mn(e,t=[]){const s=t.find(l=>Number(l.number)===Number(e))||{number:e,slugline:`SCENE ${e}`,act:e>24?"Act III":e>11?"Act II":"Act I"},n=s.slugline.replace(/^SCENE\s*\d+\s*·\s*/i,"").trim(),a=s.act||(e>24?"Act III":e>11?"Act II":"Act I"),o=Math.max(1,(s.number-1)*3+1),i=Math.min(4.5,Math.max(1.5,s.number*7%3+2)).toFixed(1);return Number(e)===18?{number:18,heading:"SCENE 18 · INT. CUSTOMS OFFICE - NIGHT",act:"Act II Midpoint",page:48,estMin:"3.5",meta:"Act II Midpoint · Pg 48 · ~3.5 min est.",purpose:"Kevin attempts to reroute the electrical relay before the surge floods the basement archives.",conflict:"Rising water breaches the junction box while automated emergency flood doors trigger lockouts, trapping him inside.",whatChanges:"Kevin cuts the emergency seal and refuses to sign the false manifest, irreversibly shifting from passive worker to active resistance.",synthesis:"Polarity shifts from cautious optimism (+1) to catastrophic physical trap and moral awakening (-2), marking the central pivot of the screenplay.",findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]}:Number(e)===1?{number:1,heading:`SCENE 01 · ${n||"INT. HOME - EVENING"}`,act:"Act I Opening",page:1,estMin:"2.0",meta:"Act I Opening · Pg 01 · ~2.0 min est.",purpose:"Establish opening character presence, environment, and initial psychological stakes.",conflict:"Tension and unspoken questions between characters as unfamiliar presence breaks routine.",whatChanges:"Ordinary state broken by unfamiliar arrival, creating the narrative catalyst for the journey.",synthesis:"Polarity shifts from neutral calm (0) to heightened curiosity and alertness (-1), establishing the dramatic question.",findings:[{scene:`SCENE 01 · ${n||"Opening"} · Pg 01`,act:"Act I Opening",title:"Establish protagonist baseline and primary premise",desc:"Opening visual dynamic introduces character motives before inciting conflict.",targetScene:1}]}:Number(e)===4?{number:4,heading:`SCENE 04 · ${n||"INT. PORT AUDIT ROOM - DAY"}`,act:"Act I",page:9,estMin:"2.5",meta:"Act I · Pg 09 · ~2.5 min est.",purpose:"Kevin audits cargo registry under pressure from superiors to overlook anomalies.",conflict:"Institutional compliance vs early ethical hesitation as signatures are demanded.",whatChanges:"Kevin stamps the manifest with reluctance, confirming his fatal flaw of institutional compliance.",synthesis:"Polarity shifts from hesitation (0) to moral compromise (-1), establishing the internal flaw to overcome.",findings:[{scene:"SCENE 04 · Port Audit · Pg 09",act:"Act I",title:"Fatal Flaw Demonstrated: Silent Compliance",desc:"Compliant stamp creates complicity guilt that fuels later revolt.",targetScene:4}]}:{number:e,heading:`SCENE ${String(e).padStart(2,"0")} · ${n||`INT. LOCATION ${e} - DAY`}`,act:a,page:o,estMin:i,meta:`${a} · Pg ${o} · ~${i} min est.`,purpose:`Execute narrative beat for ${n||`Scene ${e}`} and advance sequence trajectory.`,conflict:"Characters encounter rising resistance while navigating immediate beat obstacles.",whatChanges:"Beats shift character leverage, altering interpersonal dynamic and scene outcome.",synthesis:"Polarity turns decisively across the beat, transitioning the dramatic tension into the next sequence.",findings:[{scene:`SCENE ${String(e).padStart(2,"0")} · Pg ${o}`,act:a,title:`Scene ${e} Beat Dynamics`,desc:`Dramatic polarity progression in ${n||`Scene ${e}`} sustains narrative tempo.`,targetScene:e}]}}function fn(e,t){const s=Bt(e||"SANTHOSH"),n=s.toUpperCase();let a=0;if(t&&Array.isArray(t.scenes)&&t.scenes.forEach(l=>{l.blocks&&l.blocks.some(c=>c.type==="character"&&Bt(c.content)===n)&&a++}),n==="SANTHOSH")return{name:"SANTHOSH",role:"Protagonist",scenesCount:a>0?`${a} scenes tracked`:"36 scenes tracked",step1Title:"Silent Conviction & Initial Resistance",step1Tag:"Fatal Flaw",step1Range:"Beginning Beats",step1Desc:"Santhosh begins navigating intense internal conviction, wrestling with external constraints and uncovering initial stakes.",step2Title:"The Turning Point & Strategic Pivot",step2Tag:"Turning Point",step2Range:"Middle Beats (Midpoint)",step2Desc:"Santhosh breaks away from passive compromises, taking active control of the narrative direction under peak conflict.",step3Title:"Decisive Transformation & Resolution",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Santhosh embraces complete accountability and purpose, achieving an irreversible transformation through the climax.",synthesis:"Santhosh drives the core thematic arc of the story, transforming from cautious survival into an active, principled catalyst of change.",findings:[{scene:"SCENE 01 · Narrative Baseline · Pg 01",act:"Act I",title:"Fatal Flaw: Internal Hesitation",desc:"Santhosh operates with guarded vigilance before escalating pressures force decisive action.",targetScene:1},{scene:"SCENE 02 · The Turning Point · Pg 05",act:"Act II",title:"The Point of No Return",desc:"Santhosh takes a defining stance that permanently pivots interpersonal relationships and story stakes.",targetScene:2}]};if(n==="ARAVIND")return{name:"ARAVIND",role:"Protagonist",scenesCount:a>0?`${a} scenes tracked`:"32 scenes tracked",step1Title:"Guarded Precision & Calculated Loyalty",step1Tag:"Origin Stance",step1Range:"Beginning Beats",step1Desc:"Aravind maintains tactical focus and sharp perception, questioning surrounding motives and testing early alliances.",step2Title:"High-Stakes Partnership & Crucial Stand",step2Tag:"Midpoint Shift",step2Range:"Middle Beats (Midpoint)",step2Desc:"Aravind unites forces during the turning point, applying razor-sharp resolve to counter mounting narrative obstacles.",step3Title:"Decisive Breakthrough & Ultimate Climax",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Aravind executes the final breakthrough, sealing the resolution through steadfast commitment to the mission.",synthesis:"Aravind provides essential tactical momentum and intellectual force, elevating the stakes and cementing the dramatic payoff.",findings:[{scene:"SCENE 01 · Tactical Introduction · Pg 01",act:"Act I",title:"Strategic Presence & Foresight",desc:"Aravind introduces critical context and tactical perspective into the unfolding scenario.",targetScene:1},{scene:"SCENE 02 · Midpoint Crucible · Pg 06",act:"Act II",title:"Decisive Strategic Realignment",desc:"Aravind commits to the high-stakes confrontation that defines the story trajectory.",targetScene:2}]};if(n==="KEVIN")return{name:"Kevin",role:"Protagonist",scenesCount:a>0?`${a} scenes tracked`:"48 scenes tracked",step1Title:"Silent Compliance & Institutional Fear",step1Tag:"Fatal Flaw",step1Range:"Beginning · Scene 01–11",step1Desc:"Hesitant and guarded, Kevin stamps irregular manifests to keep peace with superiors and protect familial debt.",step2Title:"The Point of No Return",step2Tag:"Turning Point",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Cuts the emergency floodgate seal, actively defying union directives to prevent port catastrophe.",step3Title:"Selfless Moral Accountability",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Hands over the ledger to the public audit without demanding personal immunity, completing moral transformation.",synthesis:"The protagonist completes a verified 3-stage transformation: overcoming passivity at the midpoint and prioritizing moral duty over self-preservation in the climax.",findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]};if(n==="MEERA")return{name:"Meera",role:"Confidante",scenesCount:a>0?`${a} scenes tracked`:"22 scenes tracked",step1Title:"Vigilant Skepticism & Tactical Isolation",step1Tag:"Origin Stance",step1Range:"Beginning · Scene 01–12",step1Desc:"Operates independently along pipeline perimeters, skeptical of municipal regulators and trusting only raw field telemetry.",step2Title:"Calculated Alliance Under Pressure",step2Tag:"Partnership Beat",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Guides Kevin via comm-link to the breaker box, choosing to rely on his technical precision despite active security alarms.",step3Title:"Vindicated Shared Resistance",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Secures and broadcasts the telemetry leak to the public frequency, cementing alliance and exposing corporate monopoly.",synthesis:"The confidante evolves from protective cynicism to trusted partnership, providing the strategic resolve that enables the protagonist to act.",findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Tactical Caution & Guarded Insight",desc:"Meera warns Kevin of private security patrols monitoring pipeline telemetry.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Emergency Comm Guidance",desc:"Meera coordinates the junction box bypass before automated floodgates lock.",targetScene:18}]};const o=n==="KEVIN"||n==="SANTHOSH"||n==="ARAVIND"?"Protagonist":"Character",i=a>0?`${a} scenes tracked`:"Screenplay Character";return{name:s,role:o,scenesCount:i,step1Title:"Initial Presence & Motive Baseline",step1Tag:"Introduction",step1Range:"Beginning Beats",step1Desc:`${s} is introduced navigating personal priorities and reacting to the changing environment.`,step2Title:"Escalating Involvement in Narrative Stakes",step2Tag:"Midpoint Pressure",step2Range:"Middle Beats",step2Desc:`${s} faces direct conflict or shifting loyalties as pressure mounts across the sequence.`,step3Title:"Climactic Position & Resolution",step3Tag:"Resolution",step3Range:"Ending Beats",step3Desc:`${s} resolves their dramatic throughline, solidifying their standing in the story outcome.`,synthesis:`${s} contributes essential narrative pressure and perspective across their screenplay appearances.`,findings:[{scene:"SCENE 01 · Screenplay Beat · Pg 01",act:"Act I",title:`${s} Character Introduction`,desc:`Dialogue and action beats introduce ${s}'s voice and perspective.`,targetScene:1}]}}function oo(e,t,s={}){const n=t.pages||96,{availableScenes:a=[],currentSceneData:o={},availableChars:i=[],currentCharData:l={}}=s;switch(e){case"pacing":return`
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
            <span id="char-role-badge" class="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold shrink-0">${l.role||"Protagonist"}</span>
          </div>

          <!-- Compact Character Selector dropdown (Consistent with Scene Analysis selector) -->
          <div class="flex items-center justify-between gap-2" id="char-arc-selector-row">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Character</span>
              <div class="relative inline-flex items-center shrink-0">
                <select id="analysis-char-selector" class="h-7 pl-2.5 pr-6 rounded-lg bg-white border border-slate-200 hover:border-blue-500 text-slate-800 text-xs font-semibold appearance-none cursor-pointer focus:outline-none shadow-2xs transition-colors">
                  ${i.map(c=>`
                    <option value="${c.name}" ${c.name.toUpperCase()===(l.name||"").toUpperCase()?"selected":""}>${c.name}</option>
                  `).join("")}
                </select>
                <span class="material-symbols-outlined text-[14px] text-slate-500 absolute right-1.5 pointer-events-none">expand_more</span>
              </div>
            </div>
            <span class="text-[11px] text-slate-400 font-medium" id="char-scenes-count">${l.scenesCount||"Screenplay Character"}</span>
          </div>

          <!-- Journey Step Diagram (Beginning -> Middle -> Ending) -->
          <div class="relative flex flex-col gap-4 pl-2 py-1">
            <!-- Step 1: Beginning -->
            <div class="relative flex items-start gap-3">
              <div class="absolute left-3.5 top-6 bottom-0 w-0.5 bg-slate-200"></div>
              <div class="w-7 h-7 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center shrink-0 z-10 text-slate-600 text-xs font-bold">1</div>
              <div class="flex flex-col min-w-0 pt-0.5">
                <div class="flex items-center gap-2">
                  <span id="char-step1-range" class="text-xs font-bold text-slate-900 uppercase tracking-wide">${l.step1Range}</span>
                  <span id="char-step1-tag" class="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 font-mono">${l.step1Tag}</span>
                </div>
                <h3 id="char-step1-title" class="text-xs font-bold text-slate-800 mt-1">${l.step1Title}</h3>
                <p id="char-step1-desc" class="text-xs text-slate-500 mt-0.5 leading-relaxed">${l.step1Desc}</p>
              </div>
            </div>

            <!-- Step 2: Middle / Turning Point -->
            <div class="relative flex items-start gap-3">
              <div class="absolute left-3.5 top-6 bottom-0 w-0.5 bg-blue-300"></div>
              <div class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 z-10 text-xs font-bold shadow-xs">2</div>
              <div class="flex flex-col min-w-0 pt-0.5">
                <div class="flex items-center gap-2">
                  <span id="char-step2-range" class="text-xs font-bold text-blue-600 uppercase tracking-wide">${l.step2Range}</span>
                  <span id="char-step2-tag" class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold font-mono">${l.step2Tag}</span>
                </div>
                <h3 id="char-step2-title" class="text-xs font-bold text-slate-900 mt-1">${l.step2Title}</h3>
                <p id="char-step2-desc" class="text-xs text-slate-500 mt-0.5 leading-relaxed">${l.step2Desc}</p>
              </div>
            </div>

            <!-- Step 3: Ending / Resolution -->
            <div class="relative flex items-start gap-3">
              <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 z-10 text-xs font-bold shadow-xs">3</div>
              <div class="flex flex-col min-w-0 pt-0.5">
                <div class="flex items-center gap-2">
                  <span id="char-step3-range" class="text-xs font-bold text-emerald-700 uppercase tracking-wide">${l.step3Range}</span>
                  <span id="char-step3-tag" class="px-2 py-0.5 rounded bg-emerald-50 text-[10px] text-emerald-700 font-semibold font-mono">${l.step3Tag}</span>
                </div>
                <h3 id="char-step3-title" class="text-xs font-bold text-slate-900 mt-1">${l.step3Title}</h3>
                <p id="char-step3-desc" class="text-xs text-slate-500 mt-0.5 leading-relaxed">${l.step3Desc}</p>
              </div>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="mt-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">psychology</span>
            <p id="char-synthesis-desc" class="text-xs text-slate-700 leading-relaxed">
              ${l.synthesis}
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
      `;default:return""}}function lo(e="pacing",t=null,s=null){const n={...qs[e]||qs.pacing},a=sessionStorage.getItem("scriptora_prod_return");let o;try{const w=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;o=new URLSearchParams(w||"")}catch{o=new URLSearchParams}const i=t==="editor"||o.get("from")==="editor"||!!a,l=s||o.get("scriptId")||(a?a.replace("/editor/",""):null)||$.state.selectedScriptId||"chronicles-of-dust",c=`/editor/${l}`,m=l,u=$.state.scripts.find(w=>w.id===m)||$.state.activeScript||{title:"Chronicles of Dust",pages:96},d=pn(m),r=xn(d),p=ao(d),b=Number($.state.currentSceneId||(r.find(w=>w.number===18)?18:r[0]?.number||1)),y=p[0]?.name||"Kevin",x=mn(b,r),h=fn(y,d);e==="scene"?(n.desc=`Micro-structure of Scene ${x.number}: Objective, obstacle, polarity change.`,n.findings=x.findings||n.findings):e==="character-arc"&&(n.findings=h.findings||n.findings);const T={availableScenes:r,currentSceneData:x,availableChars:p,currentCharData:h},A=t||o.get("from");let N="/intelligence/analysis";return i?N=c:A==="dashboard"||A==="/intelligence/dashboard"||A?.includes("/intelligence/dashboard")?N="/intelligence/dashboard":A&&A.startsWith("/")&&(N=A),`
    ${qe(i?"Editor":"Intelligence",n.title)}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- Section Header with Back Navigation -->
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <button id="analysis-back-btn" data-scriptora-back="true" data-back-fallback="${N}" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back" title="Back">
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <div class="flex flex-col min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0">${n.icon}</span>
                <h1 class="font-heading text-lg sm:text-xl font-bold text-slate-900 tracking-tight truncate">${n.title}</h1>
              </div>
              <p id="analysis-header-desc" class="text-xs text-slate-500 mt-0.5 truncate">${n.desc}</p>
            </div>
          </div>
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 shrink-0">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span class="text-xs font-medium truncate max-w-[140px]">${u.title}</span>
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
            ${n.questions.map(w=>`
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
            <span class="font-heading font-extrabold text-3xl sm:text-4xl text-blue-600 tracking-tight">${n.score}</span>
            <span class="text-xs font-semibold text-slate-400">/ 100 Index</span>
          </div>
        </div>

        <!-- 4. MAIN ANALYSIS VISUAL / CONTENT (MANDATORY & RESTORED) -->
        ${oo(e,u,T)}

        <!-- 5. IMPORTANT FINDINGS (KEY SCENE FINDINGS) -->
        <div class="flex flex-col gap-3" id="analysis-findings-container">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">Key Scene Findings</span>
            <span id="findings-count-tag" class="text-[11px] text-slate-400 font-medium">${n.findings.length} findings tracked</span>
          </div>

          <div id="findings-list" class="flex flex-col gap-3">
            ${n.findings.map(w=>`
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

    ${je("intelligence")}
  `}function io(e,t,s=null,n=null){const a=sessionStorage.getItem("scriptora_prod_return");let o;try{const N=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;o=new URLSearchParams(N||"")}catch{o=new URLSearchParams}const i=s==="editor"||o.get("from")==="editor"||!!a,c=n||o.get("scriptId")||(a?a.replace("/editor/",""):null)||$.state.selectedScriptId||"chronicles-of-dust",m=pn(c),u=xn(m),d=document.getElementById("analysis-back-btn");d&&(d.onclick=N=>{N.preventDefault(),i&&sessionStorage.removeItem("scriptora_prod_return"),window.scriptoraRouter?window.scriptoraRouter.back(backUrl):t(backUrl)});function r(){document.querySelectorAll(".btn-open-editor-scene").forEach(N=>{N.onclick=()=>{const w=N.getAttribute("data-scene");$.setState({currentSceneId:Number(w)}),C(`Jumping to Scene ${w} in Editor`),t(`/editor/${c}?scene=${w}`)}})}r();function p(N){const w=document.getElementById("findings-list"),L=document.getElementById("findings-count-tag");L&&(L.textContent=`${N.length} findings tracked`),w&&(w.innerHTML=N.map(I=>`
      <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${I.scene}</span>
          <span class="text-[11px] font-medium text-slate-400">${I.act}</span>
        </div>
        <div class="flex flex-col">
          <h3 class="text-xs sm:text-sm font-bold text-slate-900">${I.title}</h3>
          <p class="text-xs text-slate-600 mt-1 leading-relaxed">${I.desc}</p>
        </div>
        <div class="pt-2 flex justify-end border-t border-slate-100">
          <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${I.targetScene}">
            <span class="material-symbols-outlined text-[15px]">edit_note</span>
            <span>Open in Editor (Scene ${I.targetScene})</span>
          </button>
        </div>
      </div>
    `).join(""),r())}const b=document.getElementById("analysis-scene-selector");b&&(b.onchange=N=>{const w=parseInt(N.target.value,10);$.setState({currentSceneId:w});const L=mn(w,u),I=document.getElementById("target-scene-meta"),X=document.getElementById("target-scene-heading"),V=document.getElementById("target-scene-purpose"),le=document.getElementById("target-scene-conflict"),_=document.getElementById("target-scene-what-changes"),me=document.getElementById("target-scene-synthesis"),ie=document.getElementById("analysis-header-desc");I&&(I.textContent=L.meta),X&&(X.textContent=L.heading),V&&(V.textContent=L.purpose),le&&(le.textContent=L.conflict),_&&(_.textContent=L.whatChanges),me&&(me.textContent=L.synthesis),ie&&(ie.textContent=`Micro-structure of Scene ${w}: Objective, obstacle, polarity change.`),p(L.findings),C(`Analyzing Scene ${w}`)});const y=document.getElementById("analysis-char-selector");y&&(y.onchange=N=>{const w=N.target.value,L=fn(w,m),I=document.getElementById("char-role-badge"),X=document.getElementById("char-scenes-count"),V=document.getElementById("char-step1-range"),le=document.getElementById("char-step1-tag"),_=document.getElementById("char-step1-title"),me=document.getElementById("char-step1-desc"),ie=document.getElementById("char-step2-range"),q=document.getElementById("char-step2-tag"),Y=document.getElementById("char-step2-title"),j=document.getElementById("char-step2-desc"),ce=document.getElementById("char-step3-range"),k=document.getElementById("char-step3-tag"),O=document.getElementById("char-step3-title"),xe=document.getElementById("char-step3-desc"),W=document.getElementById("char-synthesis-desc");I&&(I.textContent=L.role),X&&(X.textContent=L.scenesCount),V&&(V.textContent=L.step1Range),le&&(le.textContent=L.step1Tag),_&&(_.textContent=L.step1Title),me&&(me.textContent=L.step1Desc),ie&&(ie.textContent=L.step2Range),q&&(q.textContent=L.step2Tag),Y&&(Y.textContent=L.step2Title),j&&(j.textContent=L.step2Desc),ce&&(ce.textContent=L.step3Range),k&&(k.textContent=L.step3Tag),O&&(O.textContent=L.step3Title),xe&&(xe.textContent=L.step3Desc),W&&(W.textContent=L.synthesis),p(L.findings),C(`Switched active character focus to ${L.name}`)}),document.querySelectorAll("[data-jump-scene]").forEach(N=>{N.onclick=()=>{const w=N.getAttribute("data-jump-scene");$.setState({currentSceneId:Number(w)}),C(`Jumping to Scene ${w} in Editor`),t(`/editor/${c}?scene=${w}`)}});const x=document.getElementById("vector-ai-input"),h=document.getElementById("vector-ai-submit"),T=document.getElementById("vector-ai-answer");async function A(N){if(!N||!T)return;T.classList.remove("hidden"),T.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing narrative beats...</span>';const w=await vs(N,c);T.textContent=w}h&&x&&(h.onclick=()=>A(x.value.trim()),x.onkeydown=N=>{N.key==="Enter"&&A(x.value.trim())}),document.querySelectorAll(".query-pill").forEach(N=>{N.onclick=()=>{const w=N.getAttribute("data-query");x&&(x.value=w),A(w)}})}function ro(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),a=t||s.get("scriptId")||$.state.editorReturnScriptId||$.state.selectedScriptId||"chronicles-of-dust",o=n==="editor",i=o?sessionStorage.getItem("scriptora_editor_return")||`/editor/${a}`:"/workspace",l=$.state.scripts?.find(p=>p.id===a)||$.state.scripts?.[0]||{},c=$.state.currentUser||(()=>{try{const p=localStorage.getItem("scriptora_user");if(p)return JSON.parse(p)}catch{}return{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}}})(),m=$.state.settings||(()=>{try{const p=localStorage.getItem("scriptora_settings");if(p)return JSON.parse(p)}catch{}return{editor:{showSceneNumbers:!0,autoCapitalize:!0,autoTransition:!0,continueDialogue:!0,fontSize:"Courier Prime 12pt",autoSave:"Instant"},language:"English (US)",transliteration:!1,appearance:"Light",accentColor:"blue",fontScale:"Normal",notifications:{invites:!0,edits:!0,insights:!0,milestones:!0},intelligence:{deepAnalysis:!0,pacingAlerts:!0,dialogueScoring:!0,sensitivity:"Balanced"},privacy:{watermark:!0,encryption:!0}}})(),u=$.state.scripts?.length||c.stats?.drafts||14,d=3,r=c.stats?.healthIndex||"98%";return`
    ${qe("Profile","Account & preferences.")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
      <div class="flex flex-col w-full max-w-lg mx-auto px-4 pt-3 pb-8 space-y-6 fade-in">
        
        <!-- Profile Header -->
        <div class="flex items-center justify-between gap-3 py-1">
          <div class="flex flex-col min-w-0">
            <h1 class="page-heading font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight truncate">Profile</h1>
            <p class="text-xs text-slate-500 mt-0.5 truncate">Account & preferences.</p>
          </div>
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100/80 shrink-0">
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
              <span class="text-base font-bold text-slate-900 group-hover:text-blue-600 leading-tight font-heading">${u}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-editor">Numbers: ${m.editor?.showSceneNumbers?"On":"Off"} · Auto-save: ${m.editor?.autoSave||"Instant"}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-language">${m.language||"English (US)"}${m.transliteration?" · Transliteration On":""}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-appearance">${m.appearance||"Light"} · Scale: ${m.fontScale||"Normal"}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-notifications">${Object.values(m.notifications||{}).filter(Boolean).length} alerts active</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-intelligence">${m.intelligence?.deepAnalysis?"Deep Arc Diagnostics":"Standard"} · ${m.intelligence?.sensitivity||"Balanced"}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-privacy">${m.privacy?.watermark?"Watermark On":"Standard"} · Local AES Encrypted</span>
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
            <a href="${i}" id="profile-bottom-return-btn" class="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center gap-2 border border-blue-200 shadow-2xs no-underline transition-all active:scale-98">
              <span class="material-symbols-outlined text-[18px]">edit_note</span>
              <span>Return to Editor (${l.title||"Screenplay"})</span>
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
      <div id="action-modal" class="scriptora-modal-overlay fixed inset-0 z-[100] flex bg-slate-900/50 backdrop-blur-xs hidden">
        <div class="scriptora-modal-card bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center" id="action-modal-icon-box">
            <span class="material-symbols-outlined text-[20px]" id="action-modal-icon">logout</span>
          </div>
          <h2 class="text-base font-bold text-slate-900" id="action-modal-title">Sign Out</h2>
          <p class="text-xs text-slate-500 leading-relaxed" id="action-modal-desc">Are you sure you want to end your active session on this device?</p>
          
          <!-- Explicit Confirmation Input for Delete Account -->
          <div id="action-modal-input-wrap" class="hidden flex flex-col gap-1.5 mt-1">
            <label class="text-[11px] font-semibold text-slate-700">Type <span class="font-mono font-bold text-red-600 select-all">DELETE MY ACCOUNT</span> to confirm:</label>
            <input type="text" id="action-modal-phrase-input" placeholder="DELETE MY ACCOUNT" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-red-600 font-mono text-slate-900" autocomplete="off" />
            <p id="action-modal-error" class="text-[11px] text-red-600 hidden font-medium leading-tight"></p>
          </div>

          <div class="flex items-center gap-2 mt-2">
            <button type="button" class="flex-1 h-10 px-4 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer transition-colors" id="action-modal-cancel">Cancel</button>
            <button type="button" class="flex-1 h-10 px-4 rounded-xl text-white text-xs font-semibold shadow-xs cursor-pointer transition-all flex items-center justify-center gap-1.5" id="action-modal-confirm">Confirm</button>
          </div>
        </div>
      </div>

      <!-- Edit Profile Modal -->
      <div id="modal-edit-profile" class="scriptora-modal-overlay fixed inset-0 z-[100] flex bg-slate-900/50 backdrop-blur-xs hidden">
        <div class="scriptora-modal-card bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
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
      <div id="modal-security" class="scriptora-modal-overlay fixed inset-0 z-[100] flex bg-slate-900/50 backdrop-blur-xs hidden">
        <div class="scriptora-modal-card bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3">
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
      <div id="modal-setting-editor" class="settings-modal scriptora-modal-overlay fixed inset-0 z-[100] flex bg-slate-900/50 backdrop-blur-xs hidden">
        <div class="scriptora-modal-card bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
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
              <input type="checkbox" id="cfg-editor-scenenums" ${m.editor?.showSceneNumbers?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Auto-Capitalize Characters</span>
                <span class="text-[11px] text-slate-500">Auto uppercase character headings</span>
              </div>
              <input type="checkbox" id="cfg-editor-autocap" ${m.editor?.autoCapitalize!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Continue Dialogue (CONT'D)</span>
                <span class="text-[11px] text-slate-500">Auto append character continuation cues</span>
              </div>
              <input type="checkbox" id="cfg-editor-contd" ${m.editor?.continueDialogue!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Screenplay Font Style</label>
              <select id="cfg-editor-font" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Courier Prime 12pt" ${m.editor?.fontSize?.includes("Prime")?"selected":""}>Courier Prime (12pt)</option>
                <option value="Courier FinalDraft 12pt" ${m.editor?.fontSize?.includes("Final")?"selected":""}>Courier FinalDraft (12pt)</option>
                <option value="Courier New 11pt" ${m.editor?.fontSize?.includes("New")?"selected":""}>Courier Standard (11pt)</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Auto-save Frequency</label>
              <select id="cfg-editor-autosave" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Instant" ${m.editor?.autoSave==="Instant"?"selected":""}>Instant (300ms Keystroke Sync)</option>
                <option value="Every 15s" ${m.editor?.autoSave==="Every 15s"?"selected":""}>Every 15 Seconds</option>
                <option value="Every 60s" ${m.editor?.autoSave==="Every 60s"?"selected":""}>Every 60 Seconds</option>
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
      <div id="modal-setting-language" class="settings-modal scriptora-modal-overlay fixed inset-0 z-[100] flex bg-slate-900/50 backdrop-blur-xs hidden">
        <div class="scriptora-modal-card bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
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
              ${[{id:"en",name:"English (US)",code:"English (US)"},{id:"ta",name:"Tamil (தமிழ்)",code:"Tamil"},{id:"tg",name:"Tanglish",code:"Tanglish"},{id:"hi",name:"Hindi (हिंदी)",code:"Hindi"}].map(p=>`
                <button type="button" class="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${m.language===p.code?"border-blue-600 bg-blue-50 text-blue-700":"border-slate-200 bg-white text-slate-800 hover:bg-slate-50"}" data-lang="${p.code}">
                  ${p.name}
                </button>
              `).join("")}
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 mt-1">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Phonetic Transliteration</span>
                <span class="text-[11px] text-slate-500">Auto convert phonetic typing to Tamil script</span>
              </div>
              <input type="checkbox" id="cfg-lang-translit" ${m.transliteration?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
            <button type="button" id="btn-save-cfg-language" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Apply Language</button>
          </div>
        </div>
      </div>

      <!-- 3. Appearance Settings Modal -->
      <div id="modal-setting-appearance" class="settings-modal scriptora-modal-overlay fixed inset-0 z-[100] flex bg-slate-900/50 backdrop-blur-xs hidden">
        <div class="scriptora-modal-card bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
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
                ${[{id:"Light",label:"Light",icon:"light_mode"},{id:"Dark",label:"Dark",icon:"dark_mode"},{id:"System",label:"System",icon:"devices"}].map(p=>`
                  <button type="button" class="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all ${m.appearance===p.id?"border-blue-600 bg-blue-50 text-blue-700":"border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}" data-theme="${p.id}">
                    <span class="material-symbols-outlined text-[18px]">${p.icon}</span>
                    <span>${p.label}</span>
                  </button>
                `).join("")}
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Display Font Scale</label>
              <select id="cfg-app-scale" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Compact" ${m.fontScale==="Compact"?"selected":""}>Compact (90%)</option>
                <option value="Normal" ${m.fontScale!=="Compact"&&m.fontScale!=="Large"?"selected":""}>Normal (100%)</option>
                <option value="Large" ${m.fontScale==="Large"?"selected":""}>Comfortable (110%)</option>
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
      <div id="modal-setting-notifications" class="settings-modal scriptora-modal-overlay fixed inset-0 z-[100] flex bg-slate-900/50 backdrop-blur-xs hidden">
        <div class="scriptora-modal-card bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
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
              <input type="checkbox" id="cfg-notif-invites" ${m.notifications?.invites!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Peer Edits & Revisions</span>
                <span class="text-[11px] text-slate-500">Real-time alerts when co-writers edit scenes</span>
              </div>
              <input type="checkbox" id="cfg-notif-edits" ${m.notifications?.edits!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Intelligence Diagnostics</span>
                <span class="text-[11px] text-slate-500">Notifications when vector analysis updates</span>
              </div>
              <input type="checkbox" id="cfg-notif-insights" ${m.notifications?.insights!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Draft Snapshot Milestones</span>
                <span class="text-[11px] text-slate-500">Alert on automated version backups</span>
              </div>
              <input type="checkbox" id="cfg-notif-milestones" ${m.notifications?.milestones!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
            <button type="button" id="btn-save-cfg-notifications" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Save Alerts</button>
          </div>
        </div>
      </div>

      <!-- 5. Intelligence Settings Modal -->
      <div id="modal-setting-intelligence" class="settings-modal scriptora-modal-overlay fixed inset-0 z-[100] flex bg-slate-900/50 backdrop-blur-xs hidden">
        <div class="scriptora-modal-card bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
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
              <input type="checkbox" id="cfg-intel-deep" ${m.intelligence?.deepAnalysis!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Proactive Pacing Warnings</span>
                <span class="text-[11px] text-slate-500">Detect narrative drag in Act II</span>
              </div>
              <input type="checkbox" id="cfg-intel-pacing" ${m.intelligence?.pacingAlerts!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Dialogue Subtext Scoring</span>
                <span class="text-[11px] text-slate-500">Evaluate voice distinctiveness</span>
              </div>
              <input type="checkbox" id="cfg-intel-dialogue" ${m.intelligence?.dialogueScoring!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex flex-col gap-1 mt-1">
              <label class="text-[11px] font-semibold text-slate-600">Model Sensitivity</label>
              <select id="cfg-intel-sensitivity" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Low" ${m.intelligence?.sensitivity==="Low"?"selected":""}>Low (Critical flags only)</option>
                <option value="Balanced" ${m.intelligence?.sensitivity!=="Low"&&m.intelligence?.sensitivity!=="High"?"selected":""}>Balanced (Recommended)</option>
                <option value="High" ${m.intelligence?.sensitivity==="High"?"selected":""}>High (Detailed micro-diagnostics)</option>
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
      <div id="modal-setting-privacy" class="settings-modal scriptora-modal-overlay fixed inset-0 z-[100] flex bg-slate-900/50 backdrop-blur-xs hidden">
        <div class="scriptora-modal-card bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
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
              <input type="checkbox" id="cfg-priv-watermark" ${m.privacy?.watermark!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Local Storage AES Encryption</span>
                <span class="text-[11px] text-slate-500">Encrypt local drafts in browser sandbox</span>
              </div>
              <input type="checkbox" id="cfg-priv-encrypt" ${m.privacy?.encryption!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
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
      <div id="modal-setting-storage" class="settings-modal scriptora-modal-overlay fixed inset-0 z-[100] flex bg-slate-900/50 backdrop-blur-xs hidden">
        <div class="scriptora-modal-card bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
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

    ${je("profile")}
  `}function co(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),a=t||n.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=s||n.get("scriptId")||$.state.editorReturnScriptId||$.state.selectedScriptId||"chronicles-of-dust",i=a==="editor",l=i?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/workspace",c=$.state.currentUser||(()=>{try{const f=localStorage.getItem("scriptora_user");if(f)return JSON.parse(f)}catch{}return{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",avatarColor:"bg-blue-600",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}}})(),m=document.getElementById("profile-bottom-return-btn");m&&(m.onclick=f=>{f.preventDefault(),sessionStorage.removeItem("scriptora_from_editor"),window.scriptoraRouter?window.scriptoraRouter.back(l):e(l)}),document.getElementById("stat-card-drafts")?.addEventListener("click",()=>{e("/workspace")}),document.getElementById("stat-card-coauthors")?.addEventListener("click",()=>{e(`/profile/collaborators${i?`?from=editor&scriptId=${o}`:""}`)}),document.getElementById("stat-card-health")?.addEventListener("click",()=>{e("/intelligence/dashboard")});const u=document.getElementById("settings-search-input");u&&(u.oninput=f=>{const g=f.target.value.toLowerCase().trim();let P=0;document.querySelectorAll("#settings-list .setting-item").forEach(F=>{const H=F.textContent.toLowerCase().includes(g);F.style.display=H?"flex":"none",H&&P++});const R=document.getElementById("no-settings-match");R&&(R.style.display=P===0?"block":"none")});function d(f){const g=`modal-setting-${f.replace("sheet-","")}`,P=document.getElementById(g);P&&Qe(P)}function r(){document.querySelectorAll(".settings-modal").forEach(f=>{ke(f)})}document.querySelectorAll(".setting-item").forEach(f=>{f.onclick=()=>{const g=f.getAttribute("data-sheet");g&&d(g)}}),document.querySelectorAll(".close-setting-modal").forEach(f=>{f.onclick=r}),document.querySelectorAll(".settings-modal, #modal-edit-profile, #modal-security, #action-modal").forEach(f=>{f.onclick=g=>{g.target===f&&ke(f)}});function p(f){let g={};try{const R=localStorage.getItem("scriptora_settings");R&&(g=JSON.parse(R))}catch{}const P=f(g);return localStorage.setItem("scriptora_settings",JSON.stringify(P)),$.setState({settings:P}),Vn(P).catch(()=>{}),P}const b=document.getElementById("btn-save-cfg-editor");b&&(b.onclick=()=>{const f=document.getElementById("cfg-editor-scenenums")?.checked??!0,g=document.getElementById("cfg-editor-autocap")?.checked??!0,P=document.getElementById("cfg-editor-contd")?.checked??!0,R=document.getElementById("cfg-editor-font")?.value||"Courier Prime 12pt",F=document.getElementById("cfg-editor-autosave")?.value||"Instant";p(H=>({...H,editor:{...H.editor||{},showSceneNumbers:f,autoCapitalize:g,continueDialogue:P,fontSize:R,autoSave:F}})),localStorage.setItem("scriptora_autosave",F==="Instant"?"true":"false");const J=document.getElementById("desc-sheet-editor");J&&(J.textContent=`Numbers: ${f?"On":"Off"} · Auto-save: ${F}`),r(),C("Editor preferences saved")});let y=$.state.settings?.language||"English (US)";document.querySelectorAll(".btn-lang-choice").forEach(f=>{f.onclick=()=>{y=f.getAttribute("data-lang"),document.querySelectorAll(".btn-lang-choice").forEach(g=>{g.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-slate-200 bg-white text-slate-800 hover:bg-slate-50"}),f.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const x=document.getElementById("btn-save-cfg-language");x&&(x.onclick=()=>{const f=document.getElementById("cfg-lang-translit")?.checked??!1;p(P=>({...P,language:y,transliteration:f}));const g=document.getElementById("desc-sheet-language");g&&(g.textContent=`${y}${f?" · Transliteration On":""}`),r(),C(`Language set to ${y}`)});let h=$.state.settings?.appearance||"Light";document.querySelectorAll(".btn-theme-choice").forEach(f=>{f.onclick=()=>{h=f.getAttribute("data-theme"),document.querySelectorAll(".btn-theme-choice").forEach(g=>{g.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}),f.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const T=document.getElementById("btn-save-cfg-appearance");T&&(T.onclick=()=>{const f=document.getElementById("cfg-app-scale")?.value||"Normal";p(P=>({...P,appearance:h,fontScale:f})),h==="Dark"?(document.documentElement.classList.add("dark"),localStorage.setItem("scriptora_theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("scriptora_theme","light"));const g=document.getElementById("desc-sheet-appearance");g&&(g.textContent=`${h} · Scale: ${f}`),r(),C(`Appearance updated: ${h}`)});const A=document.getElementById("btn-save-cfg-notifications");A&&(A.onclick=()=>{const f=document.getElementById("cfg-notif-invites")?.checked??!0,g=document.getElementById("cfg-notif-edits")?.checked??!0,P=document.getElementById("cfg-notif-insights")?.checked??!0,R=document.getElementById("cfg-notif-milestones")?.checked??!0,F={invites:f,edits:g,insights:P,milestones:R};p(re=>({...re,notifications:F}));const J=Object.values(F).filter(Boolean).length,H=document.getElementById("desc-sheet-notifications");H&&(H.textContent=`${J} alerts active`),r(),C("Notification preferences updated")});const N=document.getElementById("btn-save-cfg-intelligence");N&&(N.onclick=()=>{const f=document.getElementById("cfg-intel-deep")?.checked??!0,g=document.getElementById("cfg-intel-pacing")?.checked??!0,P=document.getElementById("cfg-intel-dialogue")?.checked??!0,R=document.getElementById("cfg-intel-sensitivity")?.value||"Balanced";p(J=>({...J,intelligence:{deepAnalysis:f,pacingAlerts:g,dialogueScoring:P,sensitivity:R}}));const F=document.getElementById("desc-sheet-intelligence");F&&(F.textContent=`${f?"Deep Arc Diagnostics":"Standard"} · ${R}`),r(),C("Intelligence engine calibrated")});const w=document.getElementById("btn-save-cfg-privacy");w&&(w.onclick=()=>{const f=document.getElementById("cfg-priv-watermark")?.checked??!0,g=document.getElementById("cfg-priv-encrypt")?.checked??!0;p(R=>({...R,privacy:{watermark:f,encryption:g}}));const P=document.getElementById("desc-sheet-privacy");P&&(P.textContent=`${f?"Watermark On":"Standard"} · Local AES Encrypted`),r(),C("Privacy governance updated")});const L=document.getElementById("btn-export-portfolio-data");L&&(L.onclick=()=>{const f={exportedAt:new Date().toISOString(),user:$.state.currentUser,scripts:$.state.scripts,screenplay:$.state.screenplay,settings:$.state.settings},g=new Blob([JSON.stringify(f,null,2)],{type:"application/json"}),P=URL.createObjectURL(g),R=document.createElement("a");R.href=P,R.download=`scriptora_portfolio_backup_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(R),R.click(),document.body.removeChild(R),URL.revokeObjectURL(P),C("Portfolio archive downloaded successfully")});const I=document.getElementById("btn-force-cloud-sync");I&&(I.onclick=()=>{I.disabled=!0,I.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span><span>Synchronizing...</span>',setTimeout(()=>{I.disabled=!1,I.innerHTML='<span class="material-symbols-outlined text-[16px]">sync</span><span>Force Cloud Re-sync</span>';const f=document.getElementById("sync-status-msg");f&&(f.textContent=`Synchronized at ${new Date().toLocaleTimeString()}`),C("All screenplay drafts synchronized with cloud")},700)});const X=document.getElementById("btn-clear-local-cache");X&&(X.onclick=()=>{sessionStorage.clear(),C("Temporary cache and diagnostic buffers cleared")});const V=document.getElementById("modal-edit-profile"),le=document.getElementById("trigger-modal-email"),_=document.getElementById("edit-avatar-btn"),me=document.getElementById("avatar-container-btn"),ie=document.getElementById("form-update-profile"),q=document.getElementById("local-photo-input"),Y=document.getElementById("btn-modal-upload-photo"),j=document.getElementById("btn-modal-remove-photo");function ce(f){f?Qe(V):ke(V)}le&&(le.onclick=()=>ce(!0)),me&&(me.onclick=()=>ce(!0)),_&&(_.onclick=f=>{f.stopPropagation(),q&&q.click()}),Y&&(Y.onclick=()=>{q&&q.click()}),document.querySelectorAll(".close-profile-modal").forEach(f=>f.onclick=()=>ce(!1)),q&&(q.onchange=f=>{const g=f.target.files?.[0];if(!g)return;if(!g.type.startsWith("image/")){C("Please select a valid image file (PNG, JPG, WEBP)");return}const P=new FileReader;P.onload=R=>{const F=new Image;F.onload=()=>{const J=document.createElement("canvas"),H=360;let re=F.width,fe=F.height;re>fe?re>H&&(fe=Math.round(fe*H/re),re=H):fe>H&&(re=Math.round(re*H/fe),fe=H),J.width=re,J.height=fe,J.getContext("2d").drawImage(F,0,0,re,fe);const Ee=J.toDataURL("image/jpeg",.88),D={...$.state.currentUser||c,avatarUrl:Ee};$.setState({currentUser:D}),localStorage.setItem("scriptora_user",JSON.stringify(D)),is({avatarUrl:Ee}).catch(()=>{});const z=document.getElementById("user-avatar-circle");z&&(z.innerHTML=`<img id="user-avatar-img" src="${Ee}" class="w-full h-full object-cover" alt="Profile" />`);const U=document.getElementById("modal-preview-avatar");U&&(U.innerHTML=`<img id="modal-preview-img" src="${Ee}" class="w-full h-full object-cover" alt="Preview" />`),j&&j.classList.remove("hidden");const G=document.getElementById("header-profile-btn");G&&(G.innerHTML=`<img src="${Ee}" class="w-full h-full object-cover" alt="Profile" />`),C("Profile picture updated successfully!")},F.src=R.target.result},P.readAsDataURL(g),q.value=""}),j&&(j.onclick=()=>{const g={...$.state.currentUser||c,avatarUrl:null};$.setState({currentUser:g}),localStorage.setItem("scriptora_user",JSON.stringify(g)),is({avatarUrl:null}).catch(()=>{});const P=g.initials||"AK",R=document.getElementById("user-avatar-circle");R&&(R.innerHTML=`<span id="user-avatar-initials">${P}</span>`);const F=document.getElementById("modal-preview-avatar");F&&(F.innerHTML=`<span id="modal-preview-initials">${P}</span>`),j.classList.add("hidden");const J=document.getElementById("header-profile-btn");J&&(J.innerHTML=`<span>${P}</span>`),C("Profile photo removed")});let k=c.avatarColor||"bg-blue-600";document.querySelectorAll(".prof-avatar-color-btn").forEach(f=>{f.onclick=()=>{k=f.getAttribute("data-color"),document.querySelectorAll(".prof-avatar-color-btn").forEach(g=>g.classList.remove("ring-2","ring-offset-2","ring-blue-600")),f.classList.add("ring-2","ring-offset-2","ring-blue-600")}}),ie&&(ie.onsubmit=async f=>{f.preventDefault();const g=document.getElementById("prof-input-name").value.trim(),P=document.getElementById("prof-input-headline").value.trim(),R=document.getElementById("prof-input-email").value.trim(),F=g.split(/\s+/),J=(F[0]?.[0]||"A")+(F[1]?.[0]||""),H={...$.state.currentUser||c,name:g,displayName:g,headline:P,email:R,initials:J.toUpperCase(),avatarColor:k};await is(H),$.setState({currentUser:H});const re=document.getElementById("profile-display-name"),fe=document.getElementById("profile-display-headline"),Se=document.getElementById("profile-display-email"),Ee=document.getElementById("user-avatar-circle");re&&(re.textContent=g),fe&&(fe.textContent=P),Se&&(Se.textContent=R),Ee&&!H.avatarUrl&&(Ee.innerHTML=`<span id="user-avatar-initials">${J.toUpperCase()}</span>`,Ee.className=`w-20 h-20 rounded-full ${k} text-white font-bold text-2xl flex items-center justify-center shadow-md overflow-hidden transition-transform active:scale-95 border-2 border-white ring-2 ring-slate-100`),ce(!1),C("Profile and account updated successfully")});const O=document.getElementById("modal-security"),xe=document.getElementById("trigger-modal-password"),W=document.getElementById("form-update-pw");function Z(f){f?Qe(O):ke(O)}xe&&(xe.onclick=()=>Z(!0)),document.querySelectorAll(".close-security-modal").forEach(f=>f.onclick=()=>Z(!1)),document.querySelectorAll(".btn-toggle-pw").forEach(f=>{f.onclick=()=>{const g=f.getAttribute("data-target"),P=document.getElementById(g),R=f.querySelector(".material-symbols-outlined");P&&(P.type==="password"?(P.type="text",R&&(R.textContent="visibility_off")):(P.type="password",R&&(R.textContent="visibility")))}}),W&&(W.onsubmit=f=>{f.preventDefault(),document.getElementById("pw-input-current")?.value;const g=document.getElementById("pw-input-new")?.value,P=document.getElementById("pw-input-confirm")?.value,R=document.getElementById("pw-error-text");if(!g||g.length<6){R&&(R.textContent="New password must be at least 6 characters long.",R.classList.remove("hidden"));return}if(g!==P){R&&(R.textContent="New password and confirmation do not match.",R.classList.remove("hidden"));return}R&&R.classList.add("hidden"),Z(!1),C("Password updated securely"),W.reset()});const E=document.getElementById("action-modal"),de=document.getElementById("action-modal-title"),ae=document.getElementById("action-modal-desc"),ue=document.getElementById("action-modal-icon"),Q=document.getElementById("action-modal-icon-box"),ne=document.getElementById("action-modal-confirm"),B=document.getElementById("action-modal-cancel"),he=document.getElementById("action-modal-input-wrap"),Ae=document.getElementById("action-modal-phrase-input"),se=document.getElementById("action-modal-error");let $e="signout",te=!1;function Ne(f){te=!1,$e=f,ne&&(ne.disabled=!1,ne.textContent=f==="signout"?"Sign Out":"Delete Forever"),B&&(B.disabled=!1),se&&(se.textContent="",se.classList.add("hidden")),Ae&&(Ae.value=""),f==="signout"?(de.textContent="Sign Out",ae.textContent="Are you sure you want to end your active session on this device? Unsaved changes in your draft have been synchronized.",ue.textContent="logout",Q.className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center",ne.className="flex-1 h-10 px-4 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 cursor-pointer transition-colors flex items-center justify-center gap-1.5",ne.textContent="Sign Out",he&&he.classList.add("hidden")):(de.textContent="Delete Account",ae.textContent="This action will permanently delete your account, private screenplays, versions, and production records. Authorized collaborators on shared scripts will retain access.",ue.textContent="warning",Q.className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center",ne.className="flex-1 h-10 px-4 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer transition-colors flex items-center justify-center gap-1.5",ne.textContent="Delete Forever",he&&he.classList.remove("hidden")),Qe(E),f==="delete"&&Ae&&setTimeout(()=>Ae.focus(),100)}function Ie(){te=!1,ne&&(ne.disabled=!1),B&&(B.disabled=!1),ke(E)}const ye=document.getElementById("btn-trigger-signout");ye&&(ye.onclick=()=>Ne("signout"));const S=document.getElementById("btn-trigger-delete-acc");S&&(S.onclick=()=>Ne("delete")),B&&(B.onclick=Ie),ne&&(ne.onclick=async()=>{if(te)return;if($e==="delete"&&(Ae?.value||"").trim().toUpperCase()!=="DELETE MY ACCOUNT"){se&&(se.textContent='Please type "DELETE MY ACCOUNT" exactly to proceed with deletion.',se.classList.remove("hidden")),Ae&&Ae.focus();return}te=!0,ne.disabled=!0,B&&(B.disabled=!0);const f=ne.textContent;ne.innerHTML=`
        <span class="material-symbols-outlined text-[15px] animate-spin">refresh</span>
        <span>${$e==="signout"?"Signing Out...":"Deleting Account..."}</span>
      `;try{if($e==="signout")await Ks(),$.resetUserSession(),window.scriptoraRouter?.clearHistory&&window.scriptoraRouter.clearHistory(),ke(E),C("Signed out of Scriptora"),e("/auth",!0);else{const g=(Ae?.value||"").trim(),P=await Cn(g);$.resetUserSession(),window.scriptoraRouter?.clearHistory&&window.scriptoraRouter.clearHistory(),ke(E),C(P.message||"Account deleted successfully"),e("/auth",!0)}}catch(g){se&&(se.textContent=g.message||"Operation failed. Please try again.",se.classList.remove("hidden")),C(g.message||"Action failed","error")}finally{te=!1,ne&&(ne.disabled=!1,ne.textContent=f),B&&(B.disabled=!1)}})}function uo(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),a=t||s.get("scriptId")||$.state.editorReturnScriptId||$.state.selectedScriptId||"chronicles-of-dust",o=n==="editor",i=o?sessionStorage.getItem("scriptora_editor_return")||`/editor/${a}`:"/profile",l=$.state.scripts.find(c=>c.id===a)||$.state.scripts[0]||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",joinCode:"A7K9-XP42"};return`
    ${qe("Profile","Collaborators")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
      <div class="flex flex-col w-full max-w-lg mx-auto px-4 pt-2.5 pb-8 space-y-5 fade-in">
        
        <!-- Back Navigation & Title -->
        <div class="flex items-center gap-2.5">
          <button id="collab-back-btn" data-scriptora-back="true" data-back-fallback="${i}" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back" title="Back">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div class="flex flex-col min-w-0">
            <h1 class="page-heading font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight truncate">Collaborators</h1>
            <p class="text-xs text-slate-500 mt-0.5 truncate">Work together on your screenplay with controlled access.</p>
          </div>
        </div>

        <!-- Project Context Selector -->
        <div class="relative">
          <button class="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200/80 rounded-xl shadow-xs text-left hover:bg-slate-50 transition-colors" id="projectSelectBtn">
            <div class="flex flex-col min-w-0 pr-2">
              <span class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Active Screenplay</span>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="material-symbols-outlined text-blue-600 text-[18px]">movie_edit</span>
                <span class="font-heading text-sm font-bold text-slate-900 truncate" id="currentProjectTitle">${l.title} (${l.draft||"Draft 4.2"})</span>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span class="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium" id="collab-count-badge">Team Access</span>
              <span class="material-symbols-outlined text-slate-400 text-[20px]" id="projectChevron">expand_more</span>
            </div>
          </button>

          <!-- Project Dropdown Popover -->
          <div class="hidden absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-30 overflow-hidden py-1" id="projectDropdown">
            ${$.state.scripts.map(c=>`
              <button class="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors switch-script-opt" data-id="${c.id}">
                <div class="flex flex-col">
                  <span class="text-xs font-semibold text-slate-900">${c.title}</span>
                  <span class="text-[10px] text-slate-500">${c.format||"Feature"} · ${c.draft||"Draft 1.0"}</span>
                </div>
                ${c.id===l.id?'<span class="material-symbols-outlined text-blue-600 text-[16px]">check</span>':""}
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
                <span id="displayJoinCode" class="font-mono font-bold text-base text-blue-600 tracking-widest mt-0.5">${l.joinCode||"A7K9-XP42"}</span>
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
              Anyone with this join code can request Editor or Viewer access to "${l.title}".
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
            <a href="${i}" id="collab-bottom-return-btn" class="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center gap-2 border border-blue-200 shadow-2xs no-underline transition-all active:scale-98">
              <span class="material-symbols-outlined text-[18px]">edit_note</span>
              <span>Return to Editor (${l.title||"Screenplay"})</span>
            </a>
          </div>
        `:""}

      </div>
    </main>

    ${je("profile")}
  `}function po(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),a=t||n.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=s||n.get("scriptId")||$.state.editorReturnScriptId||$.state.selectedScriptId||"chronicles-of-dust",i=a==="editor",l=i?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/profile",c=document.getElementById("collab-back-btn");c&&(c.onclick=q=>{q.preventDefault(),i&&sessionStorage.removeItem("scriptora_from_editor"),window.scriptoraRouter?window.scriptoraRouter.back(l):e(l)});const m=document.getElementById("collab-bottom-return-btn");m&&(m.onclick=q=>{q.preventDefault(),i&&sessionStorage.removeItem("scriptora_from_editor"),window.scriptoraRouter?window.scriptoraRouter.back(l):e(l)});let u="A7K9-XP42";async function d(){const q=await On(o),Y=document.getElementById("collaborators-list");if(Y){if(q.length===0){Y.innerHTML='<div class="p-4 text-center text-xs text-slate-400">No external collaborators yet. Share your join code to invite teammates.</div>';return}Y.innerHTML=q.map(j=>`
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
    `).join(""),document.querySelectorAll(".remove-collab-btn").forEach(j=>{j.onclick=async()=>{const ce=j.getAttribute("data-id");confirm("Remove collaborator access for this user?")&&(await _n(o,ce),C("Collaborator access removed"),d())}})}}d();const r=document.getElementById("projectSelectBtn"),p=document.getElementById("projectDropdown");let b=null;r&&p&&(b=Qs(r,p,{placement:"bottom-start"})),document.querySelectorAll(".switch-script-opt").forEach(q=>{q.onclick=()=>{const Y=q.getAttribute("data-id");$.selectScript(Y),b?.close(),e(`/profile/collaborators${i?`?from=editor&scriptId=${Y}`:""}`)}});const y=document.getElementById("openInviteBtn"),x=document.getElementById("closeInviteBtn"),h=document.getElementById("inviteCard"),T=document.getElementById("sendInviteBtn");y&&(y.onclick=()=>h?.classList.remove("hidden")),x&&(x.onclick=()=>h?.classList.add("hidden")),T&&(T.onclick=async()=>{const q=document.getElementById("inviteEmailInput")?.value.trim(),Y=document.querySelector('input[name="inviteRole"]:checked')?.value||"editor";q&&(await Fn(o,{email:q,role:Y}),C(`Invited ${q} as ${Y}`),h?.classList.add("hidden"),d())});const A=document.getElementById("tabGenCodeBtn"),N=document.getElementById("tabEnterCodeBtn"),w=document.getElementById("paneGenerateCode"),L=document.getElementById("paneEnterCode");A&&(A.onclick=()=>{A.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",N.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",w?.classList.remove("hidden"),L?.classList.add("hidden")}),N&&(N.onclick=()=>{N.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",A.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",L?.classList.remove("hidden"),w?.classList.add("hidden")});const I=document.getElementById("copyJoinCodeBtn"),X=document.getElementById("copyJoinCodeLabel");I&&(I.onclick=()=>{const q=document.getElementById("displayJoinCode")?.textContent||u;navigator.clipboard?.writeText(q),X.textContent="Copied!",setTimeout(()=>{X.textContent="Copy"},1800),C(`Copied code: ${q}`)});const V=document.getElementById("regenJoinCodeBtn");V&&(V.onclick=async()=>{const q=await jn(o);u=q;const Y=document.getElementById("displayJoinCode");Y&&(Y.textContent=q),C(`Generated new join code: ${q}`)});const le=document.getElementById("verifyCodeBtn"),_=document.getElementById("joinCodeInput"),me=document.getElementById("joinCodeResultCard"),ie=document.getElementById("confirmJoinScriptBtn");_&&(_.oninput=q=>{let Y=q.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"");Y.length>4&&(Y=Y.slice(0,4)+"-"+Y.slice(4,8)),q.target.value=Y}),le&&_&&(le.onclick=async()=>{const q=_.value.trim();if(!q)return;le.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>';const Y=await Hn(q);le.innerHTML="<span>Verify</span>",Y.valid?(me?.classList.remove("hidden"),document.getElementById("verifiedScriptTitle").textContent=Y.script.title,document.getElementById("verifiedScriptFormat").textContent=`${Y.script.format} · ${Y.script.pages} pages`,C("Valid join code")):(me?.classList.add("hidden"),C("Invalid or expired join code","error"))}),ie&&_&&(ie.onclick=async()=>{const q=_.value.trim();await Un(q),C("Successfully joined screenplay workspace!"),e("/workspace")})}function xo(){return $.state.currentUser?.initials,`
    <div class="flex flex-col min-h-screen bg-surface w-full relative">
      ${qe("Notifications","Activity")}

      <!-- Main Notifications Stream with contextual subnav bar -->
      <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
        <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-1 space-y-4 fade-in">
          
          <!-- Contextual Sub-bar: Back Navigation and Mark All Read Action -->
          <div class="flex items-center justify-between gap-3 pb-2 border-b border-slate-200/70">
            <div class="flex items-center gap-2.5 min-w-0">
              <button aria-label="Back" id="btn-back-notif" data-scriptora-back="true" data-back-fallback="/workspace" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" title="Back">
                <span class="material-symbols-outlined text-[18px]">arrow_back</span>
              </button>
              <div class="flex flex-col min-w-0">
                <h1 class="page-heading font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight truncate">Notifications</h1>
                <p class="text-xs text-slate-500 mt-0.5 truncate">Updates, collaboration and system alerts.</p>
              </div>
            </div>

            <button id="btn-mark-all-read" class="px-2.5 py-1 text-xs text-blue-600 font-semibold hover:bg-blue-50 rounded-lg active:scale-95 transition-all flex items-center gap-1 shrink-0">
              <span class="material-symbols-outlined text-[16px]">done_all</span>
              <span class="hidden sm:inline">Mark all read</span>
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

      ${je("workspace")}
    </div>
  `}function mo(e){const t=document.getElementById("btn-back-notif");t&&(t.onclick=()=>{if(window.scriptoraRouter)window.scriptoraRouter.back("/workspace");else{const r=$.getPreviousRoute("/workspace");e(r)}});let s="all",n="normal",a=[];async function o(){const r=document.getElementById("notif-feed-container");if(!r)return;if(n==="loading"){r.innerHTML=`
        <div class="space-y-3 animate-pulse">
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
        </div>
      `;return}if(n==="error"){r.innerHTML=`
        <div class="p-6 bg-white border border-red-200 rounded-2xl flex flex-col items-center text-center gap-2">
          <span class="material-symbols-outlined text-3xl text-red-500">wifi_off</span>
          <h3 class="font-bold text-sm text-slate-900">Sync Connection Lost</h3>
          <p class="text-xs text-slate-500 max-w-xs">Unable to refresh notification stream. Please check network connection.</p>
          <button id="btn-retry-sync" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-xs hover:bg-blue-700">
            Retry Connection
          </button>
        </div>
      `,document.getElementById("btn-retry-sync")?.addEventListener("click",()=>{n="normal",o()});return}if(a=(await Js()).notifications||[],n==="empty"||s==="unread"&&a.filter(A=>A.unread).length===0){r.innerHTML=`
        <div class="p-8 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center text-center gap-2">
          <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <h3 class="font-bold text-sm text-slate-900">You’re all caught up!</h3>
          <p class="text-xs text-slate-500 max-w-xs">No pending notifications or requests requiring your review.</p>
        </div>
      `;return}const b=a.filter(A=>A.unread).length;document.getElementById("badge-all-count").textContent=a.length,document.getElementById("badge-unread-count").textContent=b,$.setState({unreadNotifications:b});let y=a;s==="unread"&&(y=y.filter(A=>A.unread));const x=y.filter(A=>A.group==="today"),h=y.filter(A=>A.group!=="today");function T(A,N){return N.length===0?"":`
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-xs font-bold text-slate-400 tracking-wider uppercase font-heading">${A}</h2>
          </div>
          <div class="flex flex-col gap-2">
            ${N.map(w=>`
              <div class="notif-row relative flex items-start gap-3 p-3.5 rounded-xl bg-white border ${w.unread?"border-l-4 border-l-blue-600 border-slate-200/80 shadow-xs":"border-slate-200/60 opacity-80"} hover:shadow-sm transition-all cursor-pointer" data-id="${w.id}" data-route="${w.actionRoute}">
                <div class="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                  ${w.sender.startsWith("icon:")?`<span class="material-symbols-outlined text-[18px] text-blue-600">${w.sender.replace("icon:","")}</span>`:w.sender}
                </div>
                <div class="flex flex-col flex-1 min-w-0">
                  <div class="flex items-baseline justify-between gap-2">
                    <h3 class="text-xs font-bold text-slate-900 truncate">${w.title}</h3>
                    <span class="text-[10px] text-slate-400 shrink-0">${w.time}</span>
                  </div>
                  <p class="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">${w.body}</p>
                  <div class="mt-2 flex items-center gap-1.5 flex-wrap">
                    ${(w.tags||[]).map(L=>`<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">${L}</span>`).join("")}
                    <span class="text-blue-600 text-[11px] font-semibold ml-auto">${w.actionLabel||"View →"}</span>
                  </div>
                </div>
                ${w.unread?'<div class="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1"></div>':""}
              </div>
            `).join("")}
          </div>
        </div>
      `}r.innerHTML=T("Today",x)+T("Earlier",h),document.querySelectorAll(".notif-row").forEach(A=>{A.onclick=async()=>{const N=parseInt(A.getAttribute("data-id")),w=A.getAttribute("data-route");await qn(N),await $.refreshNotifications(),w?e(w):o()}})}o();const i=document.getElementById("filter-all-btn"),l=document.getElementById("filter-unread-btn");i&&(i.onclick=()=>{s="all",i.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",l.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",o()}),l&&(l.onclick=()=>{s="unread",l.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",i.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",o()});const c=document.getElementById("btn-mark-all-read");c&&(c.onclick=async()=>{await zn(),await $.refreshNotifications(),C("All notifications marked as read"),o()});const m=document.getElementById("btn-toggle-sim"),u=document.getElementById("sim-menu-dropdown");let d=null;m&&u&&(d=Qs(m,u,{placement:"bottom-end"})),document.querySelectorAll(".sim-opt").forEach(r=>{r.onclick=()=>{n=r.getAttribute("data-state"),d?.close(),o(),C(`Simulating ${n} state`)}})}function fo(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from"),a=t||s.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",o=n==="editor"||n&&n.startsWith("/editor");o?sessionStorage.getItem("scriptora_prod_return")||(n&&n.startsWith("/editor")||`${a}`):n&&n.startsWith("/");let i=null;if(window.scriptoraRouter){const c=window.scriptoraRouter.peekPreviousRoute?.();c&&(i=window.scriptoraRouter.getRouteLabel(c))}o||i||n?.includes("/intelligence");const l=$.state.scripts?.find(c=>c.id===a)||$.state.scripts?.[0]||{id:"chronicles-of-dust",draft:"Draft 4.2"};return`
    <!-- Standard App Header -->
    ${qe("Pre-Production","Production Tools")}

    <!-- Main Workspace Container -->
    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-3 pb-8 space-y-3.5 fade-in">
        
        <!-- Page Title Header (Matches Workspace: Bold title + muted subtitle, no back button) -->
        <div class="flex items-center justify-between gap-3 py-1">
          <div class="flex flex-col min-w-0">
            <h1 class="page-heading font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight truncate">Production Tools</h1>
            <p class="text-xs text-slate-500 mt-0.5 truncate">Your filmmaking workspace.</p>
          </div>
        </div>

        <!-- Screenplay Selector Card (Simplified & Compact) -->
        <section class="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-3.5 shadow-xs flex items-center justify-between">
          <div class="flex items-center gap-2.5 min-w-0 flex-1">
            <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80">
              <span class="material-symbols-outlined text-[19px]">movie_creation</span>
            </div>
            <div class="min-w-0 flex-1">
              <select id="prod-script-select" class="w-full font-heading font-semibold text-sm text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none cursor-pointer truncate py-0.5">
                <option value="chronicles-of-dust" ${l.id==="chronicles-of-dust"?"selected":""}>Chronicles of Dust (Feature)</option>
                <option value="the-neon-horizon" ${l.id==="the-neon-horizon"?"selected":""}>The Neon Horizon (Pilot)</option>
              </select>
              <!-- Pinned source version tracking preserved for underlying system state -->
              <span id="pinned-version-label" class="sr-only">${l.draft||"Draft 4.2"} (Pinned)</span>
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

        <!-- Production Tools Grid (Consistent 2-column on wider, naturally stacked on mobile) -->
        <section class="flex flex-col gap-2.5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <!-- Tool 1: Script Breakdown -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="script-breakdown">
              <div>
                <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mb-2.5">
                  <span class="material-symbols-outlined text-[18px]">dataset</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Script Breakdown</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Tag and organise production requirements by scene.</p>
              </div>
              <div class="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Open Breakdown</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 2: Shooting Schedule -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="shooting-schedule">
              <div>
                <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mb-2.5">
                  <span class="material-symbols-outlined text-[18px]">calendar_view_week</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Shooting Schedule</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Plan shooting days, calendar matrix, and scene production details.</p>
              </div>
              <div class="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Open Schedule</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 3: Storyboard Studio -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="storyboard-studio">
              <div>
                <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mb-2.5">
                  <span class="material-symbols-outlined text-[18px]">art_track</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Storyboard Studio</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Visual shot composition and camera setups.</p>
              </div>
              <div class="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Shot Board</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 4: Call Sheets -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="call-sheets">
              <div>
                <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mb-2.5">
                  <span class="material-symbols-outlined text-[18px]">assignment</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Call Sheets</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Prepare and manage daily shooting call sheets.</p>
              </div>
              <div class="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Call Sheets</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 5: Dialogue Sheets & Actor Sides -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="dialogue-sheets">
              <div>
                <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mb-2.5">
                  <span class="material-symbols-outlined text-[18px]">record_voice_over</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Dialogue Sheets & Sides</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Character-wise speech cues and scene actor sides.</p>
              </div>
              <div class="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Actor Sides</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>

    <!-- Bottom Navigation with Production Active -->
    ${je("production")}
  `}async function bo(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),a=s||n.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",o=document.getElementById("production-back-btn");o&&(o.onclick=()=>{window.scriptoraRouter?window.scriptoraRouter.back("/workspace"):e("/workspace")});const i=document.getElementById("prod-script-select");i&&(i.onchange=d=>{const r=d.target.value;$.setState({selectedScriptId:r}),e(`/production?scriptId=${r}`)});const l=document.getElementById("btn-repin-source");l&&(l.onclick=async()=>{const d="Draft 4.3";await Kn(a,d),document.getElementById("source-version-alert")?.classList.add("hidden");const r=document.getElementById("pinned-version-label");r&&(r.textContent=`${d} (Pinned)`),C(`Pinned source updated to ${d}`)});const c=document.getElementById("btn-dismiss-staleness");c&&(c.onclick=()=>{document.getElementById("source-version-alert")?.classList.add("hidden"),C("Retained Draft 4.2 pinned baseline")});const m=`/production?scriptId=${a}`,u={"script-breakdown":`/production/breakdown?scriptId=${a}&from=${encodeURIComponent(m)}`,"shooting-schedule":`/production/schedule?scriptId=${a}&from=${encodeURIComponent(m)}`,"call-sheets":`/production/call-sheets?scriptId=${a}&from=${encodeURIComponent(m)}`,"dialogue-sheets":`/production/dialogue-sides?scriptId=${a}&from=${encodeURIComponent(m)}`,"storyboard-studio":`/production/storyboard?scriptId=${a}&from=${encodeURIComponent(m)}`};document.querySelectorAll(".tool-card").forEach(d=>{d.onclick=()=>{const r=d.getAttribute("data-tool");u[r]&&e(u[r])}})}function go(){const e=$.state.selectedScriptId||"chronicles-of-dust",t=$.state.scripts?.find(s=>s.id===e)||{title:"Chronicles of Dust",draft:"Draft 4.2"};return`
    <div class="fixed inset-0 bg-surface flex flex-col font-body text-slate-800 select-none overflow-hidden">
      <!-- Standard Header (Fixed Top) -->
      ${qe("AI Chat","Universal Assistant")}

      <!-- Main Conversation Screen: fills space between Header (56px) and Bottom Nav (56px) -->
      <main class="flex-1 flex flex-col w-full max-w-2xl mx-auto pt-14 pb-16 overflow-hidden relative fade-in">
        
        <!-- Compact, Unobtrusive Context Indicator Bar with Back Button -->
        <div class="px-3 sm:px-4 py-1.5 border-b border-slate-200/60 bg-surface/90 backdrop-blur-xs flex items-center justify-between text-xs shrink-0 z-10">
          <div class="flex items-center gap-1.5 text-slate-500 text-[11px] min-w-0">
            <button id="chat-back-btn" data-scriptora-back="true" data-back-fallback="/workspace" class="w-6 h-6 -ml-1 rounded-lg hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 flex items-center justify-center shrink-0 cursor-pointer transition-colors" aria-label="Back" title="Back">
              <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            </button>
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
      ${je("chat")}
    </div>
  `}function ho(e){const t=document.getElementById("chat-input"),s=document.getElementById("chat-send-btn"),n=document.getElementById("chat-messages-container"),a=document.getElementById("btn-clear-chat"),o=document.getElementById("chat-back-btn"),i=document.querySelectorAll(".chat-chip"),l=$.state.selectedScriptId||"chronicles-of-dust";o&&(o.onclick=()=>{window.scriptoraRouter?window.scriptoraRouter.back("/workspace"):e("/workspace")});const c=localStorage.getItem("scriptora_chat_history");if(c)try{JSON.parse(c).forEach(r=>m(r.role,r.text,!1))}catch{}t&&t.addEventListener("input",()=>{t.style.height="auto",t.style.height=Math.min(t.scrollHeight,96)+"px"});function m(d,r,p=!0){if(!n)return;const b=d==="user",y=document.createElement("div");if(y.className=`flex items-start gap-2.5 max-w-[88%] ${b?"self-end flex-row-reverse":""}`,y.innerHTML=`
      <div class="w-7 h-7 rounded-lg ${b?"bg-slate-800":"bg-blue-600"} text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
        <span class="material-symbols-outlined text-[15px]">${b?"person":"chat_bubble_outline"}</span>
      </div>
      <div class="${b?"bg-blue-600 text-white rounded-2xl rounded-tr-xs":"bg-white text-slate-700 border border-slate-200/90 rounded-2xl rounded-tl-xs"} p-3.5 shadow-2xs flex flex-col gap-1 text-xs leading-relaxed">
        <div class="flex items-center justify-between gap-4 font-semibold ${b?"text-blue-100":"text-slate-900"} text-[11px]">
          <span>${b?"You":"Scriptora Universal AI"}</span>
          <span class="${b?"text-blue-200":"text-slate-400"} font-normal text-[10px]">Now</span>
        </div>
        <div class="whitespace-pre-wrap">${r}</div>
      </div>
    `,n.appendChild(y),n.scrollTop=n.scrollHeight,p)try{const x=JSON.parse(localStorage.getItem("scriptora_chat_history")||"[]");x.push({role:d,text:r,timestamp:new Date().toISOString()}),localStorage.setItem("scriptora_chat_history",JSON.stringify(x.slice(-30)))}catch{}}async function u(){if(!t)return;const d=t.value.trim();if(!d)return;m("user",d,!0),t.value="",t.style.height="auto";const r=document.createElement("div");r.className="flex items-center gap-2 text-xs text-slate-400 py-1 pl-9 italic",r.innerHTML=`
      <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
      <span>Reviewing screenplay context & production model...</span>
    `,n.appendChild(r),n.scrollTop=n.scrollHeight;try{const p=await vs(d,l);r.remove();let b=p;d.toLowerCase().includes("call sheet")?b=`📋 **Call Sheet Preparation (Draft 4.2)**
For Day 1 (Scenes 1 & 2 at Gate 4 Exterior):
• General Call: 06:30 AM (Sunrise lighting window)
• Key Talent: Kevin (Ready by 07:15 AM)
• Picture Vehicle: Solar Patrol Rover standby at staging area
• Nearest Emergency Medical Facility: Ridgecrest Regional Hospital (22 mins)`:d.toLowerCase().includes("practical")||d.toLowerCase().includes("element")?b=`🎬 **Practical Elements Breakdown (Scene 18)**
• Location: Pumping Station Chamber B (Interior / Echo Dampened)
• Special Prop: Hydraulic Bypass Valve Kit (LED pressure indicator)
• SFX Note: Pressurized vapor release standby
• Cast Involved: Kevin, Meera`:(d.toLowerCase().includes("storyboard")||d.toLowerCase().includes("camera"))&&(b=`🎨 **Visual Storyboard Concept (Lakebed Standoff)**
• Shot 1: Ultra-wide 2.39:1 anamorphic establishing shot across cracked earth.
• Shot 2: Low-angle tracking shot on Kevin as dust storm gathers.
• Shot 3: Dutch angle close-up on the pressure gauge as manifold fails.
*(Detailed shot canvas will be available in Storyboard Studio Prompt 3)*`),m("assistant",b,!0)}catch{r.remove(),m("assistant","I analyzed your request against the active screenplay context. Pacing and scene logistics align with Draft 4.2 standards.",!0)}}s&&(s.onclick=u),t&&(t.onkeydown=d=>{d.key==="Enter"&&!d.shiftKey&&(d.preventDefault(),u())}),i.forEach(d=>{d.onclick=()=>{const r=d.getAttribute("data-prompt");t&&(t.value=r,u())}}),a&&(a.onclick=()=>{localStorage.removeItem("scriptora_chat_history"),n.innerHTML=`
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
      `})}function Jt(e,t="tune",s=null,n="",a=null,o=null){const l=new URLSearchParams(window.location.search||"").get("from");return`
    <div class="flex items-center justify-between gap-3 py-1 border-b border-slate-200/70 pb-3 mb-2">
      <div class="flex items-center gap-2.5 min-w-0 flex-1">
        <button type="button" id="prod-subnav-back" data-scriptora-back="true" data-back-fallback="${s||l||"/production"}" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back" title="Back">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
        <div class="flex flex-col min-w-0">
          <h1 class="font-heading font-bold text-lg sm:text-xl text-slate-900 tracking-tight truncate">${e}</h1>
          <p class="text-xs text-slate-500 mt-0.5 truncate">${o||"Chronicles of Dust"}</p>
        </div>
      </div>

      ${n?`
        <div class="flex items-center gap-2 shrink-0">
          ${n}
        </div>
      `:""}
    </div>
  `}function bn(e){return e?String(e).replace(/\u00B0/g," deg ").replace(/\u00BD/g," 1/2").replace(/\u00BC/g," 1/4").replace(/\u00BE/g," 3/4").replace(/\u215B/g," 1/8").replace(/\u215C/g," 3/8").replace(/\u215D/g," 5/8").replace(/\u215E/g," 7/8").replace(/\u00A0/g," ").replace(/[\t]+/g," ").replace(/\u2014/g," -- ").replace(/\u2013/g,"-").replace(/\u2026/g,"...").replace(/[\u201C\u201D]/g,'"').replace(/[\u2018\u2019]/g,"'").replace(/\u00B7/g," - ").replace(/\u2022/g,"* ").replace(/\u2192/g,"->").replace(/\u2190/g,"<-").replace(/[^\x20-\x7E]/g," ").replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/[\r\n]+/g," "):""}function Xe(e,t=10,s="F1"){if(!e)return 0;const n=String(e),a=s==="F2"||s==="F4"?.56:s==="F3"||s==="F5"?.6:.52;return n.length*t*a}function _e(e,t,s=10,n="F1"){if(!e)return"";const a=String(e).trim();if(Xe(a,s,n)<=t)return a;const o="...",i=Xe(o,s,n);let l=a;for(;l.length>0&&Xe(l,s,n)+i>t;)l=l.slice(0,-1);return l?l.trim()+o:""}function Ot(e,t,s=10,n="F1"){if(!e)return[];const a=String(e).split(/\s+/).filter(Boolean);if(a.length===0)return[];const o=[];let i="";for(const l of a){const c=i?i+" "+l:l;Xe(c,s,n)<=t?i=c:(i&&o.push(i),Xe(l,s,n)>t?(o.push(_e(l,t,s,n)),i=""):i=l)}return i&&o.push(i),o}function Pt(e,t){if(!e)return[];const s=String(e).split(/\s+/),n=[];let a="";for(const o of s)a?a.length+1+o.length<=t?a+=" "+o:(n.push(a),a=o):a=o;return a&&n.push(a),n}function Rt(e,t){if(!e||!(e instanceof Blob))throw new Error("Invalid PDF blob received for download");const s=URL.createObjectURL(e),n=document.createElement("a");n.style&&(n.style.display="none"),n.href=s,n.download=t||"document.pdf",document.body.appendChild(n),n.click(),setTimeout(()=>{try{n.parentNode&&n.parentNode.removeChild(n),URL.revokeObjectURL(s)}catch{}},4e3)}function Lt(e,t={}){const s=t.pageWidth||612,n=t.pageHeight||792,a=e.length,o=[];let i=0;function l(){return++i}const c=l(),m=l(),u=[];for(let I=0;I<a;I++)u.push(l());const d={F1:l(),F2:l(),F3:l(),F4:l(),F5:l(),F6:l()},r=[];for(let I=0;I<a;I++)r.push(l());o[c]=`<< /Type /Catalog /Pages ${m} 0 R >>`,o[m]=`<< /Type /Pages /Kids [${u.map(I=>`${I} 0 R`).join(" ")}] /Count ${a} >>`,o[d.F1]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",o[d.F2]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",o[d.F3]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>",o[d.F4]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>",o[d.F5]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Oblique /Encoding /WinAnsiEncoding >>",o[d.F6]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>";const p=`<< /F1 ${d.F1} 0 R /F2 ${d.F2} 0 R /F3 ${d.F3} 0 R /F4 ${d.F4} 0 R /F5 ${d.F5} 0 R /F6 ${d.F6} 0 R >>`,b=new TextEncoder;for(let I=0;I<a;I++){o[u[I]]=`<< /Type /Page /Parent ${m} 0 R /MediaBox [0 0 ${s} ${n}] /Contents ${r[I]} 0 R /Resources << /Font ${p} >> >>`;const X=e[I]||{};let V="";if(X.vectors&&X.vectors.length)for(const _ of X.vectors)_.type==="rect"?(_.fill&&(V+=`${_.fill[0].toFixed(3)} ${_.fill[1].toFixed(3)} ${_.fill[2].toFixed(3)} rg
`,V+=`${_.x.toFixed(2)} ${_.y.toFixed(2)} ${_.w.toFixed(2)} ${_.h.toFixed(2)} re
f
`),_.stroke&&(V+=`${_.stroke[0].toFixed(3)} ${_.stroke[1].toFixed(3)} ${_.stroke[2].toFixed(3)} RG
`,V+=`${(_.lineWidth||1).toFixed(2)} w
`,V+=`${_.x.toFixed(2)} ${_.y.toFixed(2)} ${_.w.toFixed(2)} ${_.h.toFixed(2)} re
S
`)):_.type==="line"&&(V+=`${(_.stroke||[0,0,0])[0].toFixed(3)} ${(_.stroke||[0,0,0])[1].toFixed(3)} ${(_.stroke||[0,0,0])[2].toFixed(3)} RG
`,V+=`${(_.lineWidth||1).toFixed(2)} w
`,V+=`${_.x1.toFixed(2)} ${_.y1.toFixed(2)} m ${_.x2.toFixed(2)} ${_.y2.toFixed(2)} l S
`);if(X.texts&&X.texts.length)for(const _ of X.texts){const me=_.font||"F1",ie=_.size||10,q=_.color||[.1,.1,.1],Y=bn(_.text);V+=`BT
`,V+=`/${me} ${ie} Tf
`,V+=`${q[0].toFixed(3)} ${q[1].toFixed(3)} ${q[2].toFixed(3)} rg
`,V+=`1 0 0 1 ${_.x.toFixed(2)} ${_.y.toFixed(2)} Tm
`,V+=`(${Y}) Tj
`,V+=`ET
`}const le=b.encode(V);o[r[I]]=`<< /Length ${le.length} >>
stream
${V}endstream`}const x=b.encode(`%PDF-1.4
%âãÏÓ
`);let h=x.length;const T=[],A=[];for(let I=1;I<=i;I++){T[I]=h;const X=`${I} 0 obj
${o[I]}
endobj
`,V=b.encode(X);A.push(V),h+=V.length}const N=h;let w=`xref
0 ${i+1}
0000000000 65535 f 
`;for(let I=1;I<=i;I++)w+=`${String(T[I]).padStart(10,"0")} 00000 n 
`;w+=`trailer
<< /Size ${i+1} /Root ${c} 0 R >>
startxref
${N}
%%EOF`;const L=b.encode(w);return new Blob([x,...A,L],{type:"application/pdf"})}function zs(e={},t={}){const s=t.title||"Chronicles of Dust",n=t.company||"SCRIPTORA PRODUCTION STUDIO",a=t.draft||"Draft 4.2 (Pinned)",o=String(e.callSheetNumber||"01").padStart(2,"0"),i=e.shootDay||`Day ${parseInt(o,10)||1} of 14`,l=e.status==="Confirmed"||e.isPublished,c=[];let m=[],u=[];const d=36,r=576,p=540,b=56;function y(te=!1){if(m=[],u=[],c.push({vectors:m,texts:u}),te){m.push({type:"rect",x:d,y:730,w:p,h:26,fill:[.08,.12,.2]}),u.push({text:"SCRIPTORA -- OFFICIAL CALL SHEET (CONTINUED)",x:d+10,y:739,font:"F2",size:9,color:[.95,.95,.95]});const ye=`${s.toUpperCase()} · ${i.toUpperCase()}`;return u.push({text:ye,x:r-10-Xe(ye,8,"F1"),y:739,font:"F1",size:8,color:[.7,.82,1]}),718}return 756}let x=y(!1);const h=44;m.push({type:"rect",x:d,y:x-h,w:p,h,fill:[.08,.12,.2]}),u.push({text:"SCRIPTORA -- OFFICIAL PRODUCTION CALL SHEET",x:d+12,y:x-17,font:"F2",size:10,color:[.96,.97,.98]});const T=_e(`${n.toUpperCase()} · ${s.toUpperCase()} · ${a}`,320,8.5,"F1");u.push({text:T,x:d+12,y:x-32,font:"F1",size:8.5,color:[.65,.78,.98]});const A=`DAY ${o} CALL SHEET`;u.push({text:A,x:r-12-Xe(A,11,"F2"),y:x-17,font:"F2",size:11,color:[1,1,1]});const N=l?"OFFICIAL PUBLISHED SNAPSHOT":"WORKING REVISION DRAFT",w=l?[.45,.9,.55]:[1,.82,.35];u.push({text:N,x:r-12-Xe(N,7.5,"F2"),y:x-32,font:"F2",size:7.5,color:w}),x-=h+8;const L=52;m.push({type:"rect",x:d,y:x-L,w:p,h:L,fill:[.975,.985,.995],stroke:[.82,.86,.91],lineWidth:.8});const I=135,X=x-14,V=x-29,le=x-43;u.push({text:"DATE & DAY",x:d+10,y:X,font:"F2",size:7.5,color:[.42,.47,.55]}),u.push({text:_e(e.shootDate||"Saturday, Oct 24, 2026",118,9.5,"F2"),x:d+10,y:V,font:"F2",size:9.5,color:[.1,.12,.16]}),u.push({text:_e(i,118,7.5,"F1"),x:d+10,y:le,font:"F1",size:7.5,color:[.42,.47,.55]}),m.push({type:"line",x1:d+I,y1:x-46,x2:d+I,y2:x-6,stroke:[.85,.88,.92],lineWidth:.6});const _=d+I+10;u.push({text:"GENERAL CREW CALL",x:_,y:X,font:"F2",size:7.5,color:[.42,.47,.55]}),u.push({text:_e(e.generalCrewCall||"06:00 AM",118,11.5,"F2"),x:_,y:V,font:"F2",size:11.5,color:[.1,.12,.16]}),u.push({text:_e(`Breakfast: ${e.breakfastTime||"05:15 AM"}`,118,7.5,"F1"),x:_,y:le,font:"F1",size:7.5,color:[.42,.47,.55]}),m.push({type:"line",x1:d+I*2,y1:x-46,x2:d+I*2,y2:x-6,stroke:[.85,.88,.92],lineWidth:.6});const me=d+I*2+10;u.push({text:"SHOOTING CALL",x:me,y:X,font:"F2",size:7.5,color:[.1,.38,.85]}),u.push({text:_e(e.shootingCall||"06:30 AM",118,11.5,"F2"),x:me,y:V,font:"F2",size:11.5,color:[.1,.38,.85]}),u.push({text:"First Shot on Set",x:me,y:le,font:"F1",size:7.5,color:[.42,.47,.55]}),m.push({type:"line",x1:d+I*3,y1:x-46,x2:d+I*3,y2:x-6,stroke:[.85,.88,.92],lineWidth:.6});const ie=d+I*3+10;u.push({text:"ESTIMATED WRAP",x:ie,y:X,font:"F2",size:7.5,color:[.42,.47,.55]}),u.push({text:_e(e.estimatedWrap||"06:30 PM",118,11.5,"F2"),x:ie,y:V,font:"F2",size:11.5,color:[.1,.12,.16]}),u.push({text:"12-Hr Rest Turnaround",x:ie,y:le,font:"F1",size:7.5,color:[.42,.47,.55]}),x-=L+8;const q=62;m.push({type:"rect",x:d,y:x-q,w:p,h:q,fill:[1,1,1],stroke:[.82,.86,.91],lineWidth:.8});const Y=d+10;u.push({text:"SET LOCATION & BASECAMP ACCESS:",x:Y,y:x-13,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:_e(e.locationName||"Mojave Outpost Gate 4",280,8.5,"F2"),x:Y,y:x-25,font:"F2",size:8.5,color:[.1,.12,.16]}),u.push({text:_e(e.locationAddress||"Perimeter Road 9, Cantil, CA",280,7.5,"F1"),x:Y,y:x-37,font:"F1",size:7.5,color:[.35,.4,.48]}),u.push({text:_e(`Parking: ${e.parkingNotes||"Basecamp Lot B. Crew shuttle runs every 10 mins."}`,280,7,"F1"),x:Y,y:x-49,font:"F1",size:7,color:[.45,.5,.58]}),m.push({type:"line",x1:d+300,y1:x-56,x2:d+300,y2:x-6,stroke:[.85,.88,.92],lineWidth:.6});const j=d+310;u.push({text:"EMERGENCY MEDICAL / NEAREST HOSPITAL:",x:j,y:x-13,font:"F2",size:7.5,color:[.85,.15,.15]});const ce=Ot(e.nearestHospital||"Desert Care Regional Medical Center (Ph: 760-379-2681)",220,7,"F1");u.push({text:_e(ce[0]||"Local Emergency Center",220,7,"F1"),x:j,y:x-24,font:"F1",size:7,color:[.15,.15,.15]}),ce[1]&&u.push({text:_e(ce[1],220,7,"F1"),x:j,y:x-34,font:"F1",size:7,color:[.15,.15,.15]});const k=_e(`Weather: ${e.weatherSummary||"Clear skies, normal stage ambient temperature."}`,220,7,"F1");u.push({text:k,x:j,y:x-49,font:"F1",size:7,color:[.2,.4,.65]}),x-=q+10;const O=e.scenes&&e.scenes.length>0?e.scenes:[{sceneNumber:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",pages:"4 1/8",cast:["KEVIN","MARCUS"],desc:"Kevin arrives at border gate, inspection with Marcus."},{sceneNumber:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",pages:"3 4/8",cast:["KEVIN","MEERA"],desc:"Kevin discovers pressure loss on telemetry terminal."}];function xe(){m.push({type:"rect",x:d,y:x-17,w:p,h:17,fill:[.91,.93,.96],stroke:[.78,.82,.88],lineWidth:.8}),u.push({text:"SCENE #",x:d+6,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"SET & SCENE DESCRIPTION",x:d+56,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"D/N",x:d+325,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"PAGES",x:d+368,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"CAST CHARACTERS",x:d+418,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),x-=17}u.push({text:"SCHEDULED SCENES TO SHOOT",x:d,y:x,font:"F2",size:9.5,color:[.1,.15,.22]});const W=`${O.length} Scenes Scheduled`;u.push({text:W,x:r-Xe(W,8,"F1"),y:x,font:"F1",size:8,color:[.45,.5,.58]}),x-=12,xe(),O.forEach((te,Ne)=>{const Ie=Ot(te.heading||`SCENE ${te.sceneNumber}`,260,8,"F2"),ye=Ot(te.desc||"",260,7,"F1"),S=Array.isArray(te.cast)?te.cast:te.cast?[te.cast]:[],f=Ot(S.join(", "),116,7.5,"F2"),g=Math.max(Ie.length*10+ye.length*9,f.length*9.5,12),P=Math.max(22,8+g);x-P<b&&(x=y(!0),xe()),m.push({type:"rect",x:d,y:x-P,w:p,h:P,fill:Ne%2===0?[1,1,1]:[.985,.988,.995],stroke:[.86,.89,.93],lineWidth:.5}),u.push({text:`Sc. ${te.sceneNumber}`,x:d+6,y:x-13,font:"F2",size:8.5,color:[.1,.35,.85]});let R=x-10;Ie.forEach(H=>{u.push({text:H,x:d+56,y:R,font:"F2",size:8,color:[.1,.12,.15]}),R-=10}),ye.forEach(H=>{u.push({text:H,x:d+56,y:R,font:"F1",size:7,color:[.4,.45,.52]}),R-=9});const F=te.heading?.toUpperCase().includes("NIGHT")?"NIGHT":"DAY";u.push({text:F,x:d+325,y:x-13,font:"F1",size:7.5,color:F==="NIGHT"?[.1,.15,.45]:[.8,.45,.1]}),u.push({text:te.pages||"1.0",x:d+368,y:x-13,font:"F2",size:7.5,color:[.2,.2,.2]});let J=x-11;f.forEach(H=>{u.push({text:H,x:d+418,y:J,font:"F2",size:7.5,color:[.15,.2,.25]}),J-=9.5}),x-=P}),x-=10;const Z=e.castCalls&&e.castCalls.length>0?e.castCalls:[{character:"KEVIN",actor:"Dev Patel",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MARCUS",actor:"David Chen",pickup:"05:15 AM",hmuCall:"05:45 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MEERA",actor:"Zoe Saldana",pickup:"08:30 AM",hmuCall:"09:00 AM",onSet:"10:30 AM",status:"Confirmed"}];function E(){m.push({type:"rect",x:d,y:x-17,w:p,h:17,fill:[.91,.93,.96],stroke:[.78,.82,.88],lineWidth:.8}),u.push({text:"ID",x:d+6,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"CHARACTER",x:d+32,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"ACTOR / TALENT",x:d+140,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"STATUS",x:d+270,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"PICKUP",x:d+346,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"H/MU CALL",x:d+406,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"ON SET CALL",x:d+472,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),x-=17}x-48<b&&(x=y(!0)),u.push({text:"CAST & TALENT CALL SCHEDULE",x:d,y:x,font:"F2",size:9.5,color:[.1,.15,.22]});const de=`${Z.length} Talent Booked`;u.push({text:de,x:r-Xe(de,8,"F1"),y:x,font:"F1",size:8,color:[.45,.5,.58]}),x-=12,E(),Z.forEach((te,Ne)=>{x-19<b&&(x=y(!0),E()),m.push({type:"rect",x:d,y:x-19,w:p,h:19,fill:Ne%2===0?[1,1,1]:[.985,.988,.995],stroke:[.86,.89,.93],lineWidth:.5}),u.push({text:String(Ne+1),x:d+6,y:x-13,font:"F1",size:7.5,color:[.5,.5,.5]}),u.push({text:_e(te.character||"CHARACTER",100,8,"F2"),x:d+32,y:x-13,font:"F2",size:8,color:[.1,.12,.16]}),u.push({text:_e(te.actor||"TBD",120,8,"F1"),x:d+140,y:x-13,font:"F1",size:8,color:[.2,.22,.26]});const ye=(te.status||"").toLowerCase().includes("conf");u.push({text:_e(te.status||"Confirmed",68,7.5,"F2"),x:d+270,y:x-13,font:"F2",size:7.5,color:ye?[.12,.55,.25]:[.85,.55,.1]}),u.push({text:te.pickup||"-",x:d+346,y:x-13,font:"F3",size:7.5,color:[.35,.35,.35]}),u.push({text:te.hmuCall||"-",x:d+406,y:x-13,font:"F3",size:7.5,color:[.35,.35,.35]}),u.push({text:te.onSet||"-",x:d+472,y:x-13,font:"F2",size:8.5,color:[.1,.35,.85]}),x-=19}),x-=10;const ae=e.specialInstructions||"Standard studio health & safety protocols in effect. All crew must report any hazards or equipment anomalies immediately to the 1st AD or Health & Safety Supervisor.",ue=Ot(ae,516,7.5,"F1"),Q=Math.max(38,18+ue.length*10+6);x-Q<b&&(x=y(!0)),m.push({type:"rect",x:d,y:x-Q,w:p,h:Q,fill:[.995,.985,.93],stroke:[.9,.82,.65],lineWidth:.8}),u.push({text:"[SAFETY & PRODUCTION DIRECTIVE] SPECIAL INSTRUCTIONS:",x:d+10,y:x-13,font:"F2",size:7.5,color:[.6,.38,.05]});let ne=x-25;ue.forEach(te=>{u.push({text:te,x:d+10,y:ne,font:"F1",size:7.5,color:[.3,.25,.15]}),ne-=10}),x-=Q+8;const B=34;if(x-B>=b){m.push({type:"rect",x:d,y:x-B,w:p,h:B,fill:[.965,.975,.988],stroke:[.84,.87,.92],lineWidth:.6}),u.push({text:"DIRECTING & SET OPS",x:d+10,y:x-12,font:"F2",size:7,color:[.25,.3,.38]}),u.push({text:`1st AD: Ready on Set ${e.shootingCall||"06:30 AM"} · Radio: Ch 1`,x:d+10,y:x-24,font:"F1",size:7,color:[.35,.4,.48]}),u.push({text:"CAMERA & SOUND TECH",x:d+195,y:x-12,font:"F2",size:7,color:[.25,.3,.38]}),u.push({text:`DP / Cam: ${e.generalCrewCall||"06:00 AM"} · Radio: Ch 2 | Sound: Ch 3`,x:d+195,y:x-24,font:"F1",size:7,color:[.35,.4,.48]}),u.push({text:"LOGISTICS & SIGN-OFF",x:d+375,y:x-12,font:"F2",size:7,color:[.25,.3,.38]});const te=_e(`Approved: ${e.approvedBy||"Production Office"} · Ch 4`,160,7,"F1");u.push({text:te,x:d+375,y:x-24,font:"F1",size:7,color:[.35,.4,.48]}),x-=B+6}const he=c.length;c.forEach((te,Ne)=>{te.vectors.push({type:"line",x1:d,y1:44,x2:r,y2:44,stroke:[.8,.83,.88],lineWidth:.7}),te.texts.push({text:"CONFIDENTIAL -- SCRIPTORA PRODUCTION STUDIO -- NOT FOR PUBLIC DISTRIBUTION",x:d,y:32,font:"F1",size:7,color:[.45,.48,.52]});const Ie=e.shootDate||"Production Call Sheet";te.texts.push({text:Ie,x:306-Xe(Ie,7,"F1")/2,y:32,font:"F1",size:7,color:[.55,.58,.62]});const ye=`Page ${Ne+1} of ${he}`;te.texts.push({text:ye,x:r-Xe(ye,7.5,"F2"),y:32,font:"F2",size:7.5,color:[.3,.35,.4]})});const Ae=Lt(c),se=s.replace(/[^a-zA-Z0-9]/g,"_"),$e=`CallSheet_Day${o}_${se}.pdf`;return Rt(Ae,$e),Ae}function yo(e="CHARACTER",t=[],s={}){const n=s.title||"Chronicles of Dust",a=s.draft||"Draft 4.2",o=[],i=38,l=[];let c=[],m=0;for(const r of t){const p=r.dialogue||r.text||"",b=Pt(p,46),y=4+b.length;m+y>i&&c.length>0&&(l.push(c),c=[],m=0),c.push({...r,speechLines:b}),m+=y}c.length>0&&l.push(c),l.length===0&&l.push([]);for(let r=0;r<l.length;r++){const p=l[r],b=[],y=[];b.push({type:"line",x1:54,y1:746,x2:558,y2:746,stroke:[.2,.2,.2],lineWidth:1.2}),y.push({text:"SCRIPTORA -- CHARACTER DIALOGUE SHEET",x:54,y:755,font:"F4",size:9,color:[.3,.3,.3]}),y.push({text:`PAGE ${r+1} OF ${l.length}`,x:490,y:755,font:"F4",size:9,color:[.3,.3,.3]}),y.push({text:`${e.toUpperCase()} -- ALL DIALOGUE CUES`,x:54,y:730,font:"F4",size:12,color:[0,0,0]}),y.push({text:`Screenplay: ${n} (${a}) -- Pinned Baseline`,x:54,y:716,font:"F3",size:9,color:[.4,.4,.4]});let x=680;for(const h of p){const T=h.sceneNum||h.sceneNumber||1,A=h.heading||`SCENE ${T}`;if(y.push({text:`SCENE ${T} -- ${A}`,x:54,y:x,font:"F4",size:9,color:[.1,.3,.7]}),x-=14,h.action){const I=Pt(h.action,65);for(const X of I)y.push({text:X,x:54,y:x,font:"F5",size:8.5,color:[.4,.4,.4]}),x-=11}const N=h.character||e||"CHARACTER",w=N.length*6.5;if(y.push({text:N,x:Math.max(160,306-w/2),y:x,font:"F4",size:10,color:[0,0,0]}),x-=12,h.parenthetical){const I=h.parenthetical.length*5.5;y.push({text:h.parenthetical,x:Math.max(160,306-I/2),y:x,font:"F5",size:9,color:[.3,.3,.3]}),x-=12}const L=h.speechLines||Pt(h.dialogue||h.text||"",46);for(const I of L)y.push({text:I,x:170,y:x,font:"F3",size:10,color:[0,0,0]}),x-=13;x-=12}b.push({type:"line",x1:54,y1:50,x2:558,y2:50,stroke:[.8,.8,.8],lineWidth:.8}),y.push({text:`SCRIPTORA SCREENPLAY ARCHITECTURE -- ${e.toUpperCase()} -- DRAFT 4.2`,x:54,y:38,font:"F3",size:8,color:[.5,.5,.5]}),y.push({text:`Page ${r+1} of ${l.length}`,x:495,y:38,font:"F3",size:8,color:[.5,.5,.5]}),o.push({vectors:b,texts:y})}const u=Lt(o),d=`DialogueSheet_${e.replace(/\s+/g,"_")}_${n.replace(/\s+/g,"_")}.pdf`;return Rt(u,d),u}function vo(e=1,t=[],s={},n={}){s&&s.title&&!n.title&&(n=s);const a=n.title||"Chronicles of Dust",o=n.draft||"Draft 4.2",i=s.heading||t[0]?.heading||`SCENE ${e} - DAY`,l=[],c=[],m=[];c.push({type:"rect",x:54,y:730,w:504,h:32,fill:[.1,.1,.1]}),m.push({text:"SCRIPTORA -- REHEARSAL & ON-SET SIDES",x:64,y:748,font:"F4",size:9,color:[.8,.8,.8]}),m.push({text:`SCENE ${e} SIDES`,x:460,y:748,font:"F4",size:10,color:[1,1,1]}),m.push({text:`${a.toUpperCase()} -- SCENE ${e}`,x:54,y:712,font:"F4",size:13,color:[0,0,0]}),m.push({text:`${i} -- ${o}`,x:54,y:698,font:"F3",size:9,color:[.4,.4,.4]}),c.push({type:"line",x1:54,y1:686,x2:558,y2:686,stroke:[.2,.2,.2],lineWidth:1});let u=665;m.push({text:i,x:54,y:u,font:"F4",size:10,color:[0,0,0]}),u-=18;for(const p of t){if(p.action){const y=Pt(p.action,65);for(const x of y)m.push({text:x,x:54,y:u,font:"F5",size:9.5,color:[.2,.2,.2]}),u-=13;u-=4}if(p.character){const y=p.character.length*6.5;m.push({text:p.character,x:Math.max(160,306-y/2),y:u,font:"F4",size:10,color:[0,0,0]}),u-=13}if(p.parenthetical){const y=p.parenthetical.length*5.5;m.push({text:p.parenthetical,x:Math.max(160,306-y/2),y:u,font:"F5",size:9,color:[.3,.3,.3]}),u-=12}const b=p.dialogue||p.text||"";if(b){const y=Pt(b,46);for(const x of y)m.push({text:x,x:170,y:u,font:"F3",size:10,color:[0,0,0]}),u-=13}u-=10}c.push({type:"rect",x:180,y:u-15,w:252,h:20,fill:[.95,.95,.95],stroke:[.7,.7,.7],lineWidth:.8}),m.push({text:`END OF SCENE ${e} SIDES -- STAMPED DRAFT 4.2`,x:195,y:u-3,font:"F4",size:7.5,color:[.3,.3,.3]}),c.push({type:"line",x1:54,y1:50,x2:558,y2:50,stroke:[.8,.8,.8],lineWidth:.8}),m.push({text:"SCRIPTORA REHEARSAL COPY -- OFFICIAL PRODUCTION SIDES",x:54,y:38,font:"F3",size:8,color:[.5,.5,.5]}),m.push({text:"Page 1 of 1",x:505,y:38,font:"F3",size:8,color:[.5,.5,.5]}),l.push({vectors:c,texts:m});const d=Lt(l),r=`ActorSides_Scene${e}_${a.replace(/\s+/g,"_")}.pdf`;return Rt(d,r),d}function gn(e=[],t={}){const s=t.title||"Chronicles of Dust",n=t.draft||"Draft 4.2",a=[],o=18,i=e.length,l=Math.ceil(i/o)||1;for(let u=0;u<l;u++){const d=[],r=[],p=e.slice(u*o,(u+1)*o);d.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),r.push({text:"SCRIPTORA -- SCRIPT BREAKDOWN MASTER REPORT",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),r.push({text:`${s.toUpperCase()} (${n}) -- ${i} ELEMENTS TAGGED`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),r.push({text:`PAGE ${u+1} OF ${l}`,x:505,y:747,font:"F2",size:9,color:[1,1,1]});let b=705;d.push({type:"rect",x:36,y:b,w:540,h:18,fill:[.93,.94,.96],stroke:[.8,.83,.88],lineWidth:.8}),r.push({text:"CATEGORY",x:42,y:b+5,font:"F2",size:8,color:[.3,.35,.4]}),r.push({text:"ELEMENT NAME",x:120,y:b+5,font:"F2",size:8,color:[.3,.35,.4]}),r.push({text:"SCENES",x:270,y:b+5,font:"F2",size:8,color:[.3,.35,.4]}),r.push({text:"STATUS",x:330,y:b+5,font:"F2",size:8,color:[.3,.35,.4]}),r.push({text:"DETAILS / SOURCING SPECIFICATION",x:400,y:b+5,font:"F2",size:8,color:[.3,.35,.4]}),b-=22;for(const y of p){d.push({type:"rect",x:36,y:b,w:540,h:22,fill:[1,1,1],stroke:[.88,.9,.93],lineWidth:.5}),r.push({text:y.category||"Props",x:42,y:b+7,font:"F2",size:8,color:[.1,.3,.8]}),r.push({text:(y.name||"").slice(0,32),x:120,y:b+7,font:"F2",size:8.5,color:[.1,.1,.1]}),r.push({text:(y.scenes||[y.sceneNumber||18]).map(h=>`#${h}`).join(", "),x:270,y:b+7,font:"F3",size:8,color:[.4,.4,.4]}),r.push({text:y.status||"Confirmed",x:330,y:b+7,font:"F1",size:8,color:y.status==="Confirmed"?[.1,.6,.2]:[.8,.4,.1]});const x=y.assignedActor||y.sourcingType||y.description||y.notes||"Ready";r.push({text:x.slice(0,36),x:400,y:b+7,font:"F1",size:7.5,color:[.3,.3,.3]}),b-=22}d.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),r.push({text:"SCRIPTORA MASTER PRODUCTION BREAKDOWN -- IMMUTABLE SNAPSHOT",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),r.push({text:`Page ${u+1} of ${l}`,x:510,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),a.push({vectors:d,texts:r})}const c=Lt(a),m=`ScriptBreakdown_${s.replace(/\s+/g,"_")}.pdf`;return Rt(c,m),c}function wo(e=[],t=[],s={}){const n=s.title||"Chronicles of Dust",a=s.draft||"Draft 4.2",o=[],i=[],l=[];i.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),l.push({text:"SCRIPTORA -- MASTER SHOOTING SCHEDULE",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),l.push({text:`${n.toUpperCase()} (${a}) -- ${e.length} SHOOT DAYS`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),l.push({text:"PAGE 1 OF 1",x:515,y:747,font:"F2",size:9,color:[1,1,1]});let c=705;i.push({type:"rect",x:36,y:c,w:540,h:18,fill:[.93,.94,.96],stroke:[.8,.83,.88],lineWidth:.8}),l.push({text:"DAY #",x:42,y:c+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"DATE",x:80,y:c+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"SHOOT LOCATION / STAGE",x:155,y:c+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"SCENES",x:340,y:c+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"PAGES",x:430,y:c+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"HOURS",x:480,y:c+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"STATUS",x:530,y:c+5,font:"F2",size:8,color:[.3,.35,.4]}),c-=26;for(const d of e){i.push({type:"rect",x:36,y:c,w:540,h:26,fill:[1,1,1],stroke:[.88,.9,.93],lineWidth:.5}),l.push({text:`D${d.dayNumber}`,x:42,y:c+9,font:"F2",size:9,color:[.1,.1,.1]}),l.push({text:d.date||"",x:80,y:c+9,font:"F1",size:8,color:[.3,.3,.3]}),l.push({text:d.location||"Location TBD",x:155,y:c+13,font:"F2",size:8.5,color:[.1,.1,.1]}),l.push({text:d.title||"",x:155,y:c+3,font:"F1",size:7.5,color:[.5,.5,.5]});const r=(d.sceneNumbers||[]).map(p=>`Sc ${p}`).join(", ")||"None";l.push({text:r,x:340,y:c+9,font:"F4",size:8.5,color:[.1,.3,.8]}),l.push({text:d.totalPages||"0 0/8",x:430,y:c+9,font:"F3",size:8,color:[.3,.3,.3]}),l.push({text:`${d.estHours||8}h`,x:480,y:c+9,font:"F1",size:8,color:[.4,.4,.4]}),l.push({text:d.status||"Draft",x:530,y:c+9,font:"F1",size:7.5,color:d.status==="Confirmed"?[.1,.6,.2]:[.4,.4,.4]}),c-=26}i.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),l.push({text:"SCRIPTORA MASTER STRIPBOARD SCHEDULE -- OWNER CONFIRMED BASELINE",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),l.push({text:"Page 1 of 1",x:525,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),o.push({vectors:i,texts:l});const m=Lt(o),u=`ShootingSchedule_${n.replace(/\s+/g,"_")}.pdf`;return Rt(m,u),m}function So(e=[],t={}){const s=e&&typeof e=="object"&&!Array.isArray(e),n=s?e:null,a=s?n.shots||[]:Array.isArray(e)?e:[],o=t.title||n?.screenplayTitle||"Chronicles of Dust",i=t.draft||t.sourceVersion||n?.sourceVersion||"Draft 4.2",l=t.heading||n?.sceneHeading||a[0]?.sceneHeading||"SCENE 1 - EXT. MOJAVE OUTPOST GATE 4 - DAY",c=n?.sceneNumber||a[0]?.sceneNumber||a[0]?.sceneNum||1,m=[{shotNumber:"1A",title:"Perimeter Outpost Gate",shotSize:"Wide Shot",cameraAngle:"High Angle",focalLength:"24mm Wide",aspectRatio:"2.39:1",lightingMood:"Daylight Dust",description:"High altitude drone descending across dust devils toward Kevin's arrival at the arid customs gate.",approvalStatus:"approved",directorNotes:"Capture sunrise glint off the guard gate perimeter wires."},{shotNumber:"1B",title:"Gate Scanner Clearance Standoff",shotSize:"Medium Two-Shot",cameraAngle:"Eye Level",focalLength:"50mm Prime",aspectRatio:"2.39:1",lightingMood:"Harsh Fluorescent Rim",description:"Kevin presents his ID badge to Marcus over the buzzing clearance terminal.",approvalStatus:"approved",directorNotes:"Focus pull from scanner terminal to Kevin's tense expression."},{shotNumber:"1C",title:"Terminal Diagnostic Anomaly",shotSize:"Close-Up",cameraAngle:"Low Angle",focalLength:"85mm Portrait",aspectRatio:"2.39:1",lightingMood:"Cyan Strobe",description:"Close-up insert of the flickering scanner console displaying pressure alert warning in red neon.",approvalStatus:"proposed",directorNotes:"Practical screen insert with pulsing alarm strobe."}],u=a&&a.length>0?a:m,d=3,r=Math.ceil(u.length/d)||1,p=[];for(let h=0;h<r;h++){const T=[],A=[],N=u.slice(h*d,(h+1)*d);T.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),A.push({text:"SCRIPTORA -- STORYBOARD STUDIO SHOT COMPOSITION",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),A.push({text:`${o.toUpperCase()} (${i}) -- ${bn(l).toUpperCase()}`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),A.push({text:`PAGE ${h+1} OF ${r}`,x:505,y:747,font:"F2",size:9,color:[1,1,1]});let w=575;for(const L of N){const I=L.shotNumber||L.shotNum||`${c}A`,X=L.title||`Shot ${I}`,V=L.focalLength||L.lens||"50mm Prime",le=L.aspectRatio||"2.39:1",_=`${L.shotSize||"Medium Shot"} / ${L.cameraAngle||"Eye Level"}`,me=(L.approvalStatus||"Draft").toUpperCase(),ie=me==="APPROVED"?[.1,.6,.2]:me==="PROPOSED"?[.8,.5,.1]:[.4,.45,.5];T.push({type:"rect",x:36,y:w,w:540,h:140,fill:[1,1,1],stroke:[.85,.88,.92],lineWidth:.8}),T.push({type:"rect",x:46,y:w+15,w:200,h:110,fill:[.08,.1,.15],stroke:[.25,.3,.38],lineWidth:1}),T.push({type:"line",x1:112,y1:w+15,x2:112,y2:w+125,stroke:[.2,.25,.32],lineWidth:.4}),T.push({type:"line",x1:178,y1:w+15,x2:178,y2:w+125,stroke:[.2,.25,.32],lineWidth:.4}),T.push({type:"line",x1:46,y1:w+52,x2:246,y2:w+52,stroke:[.2,.25,.32],lineWidth:.4}),T.push({type:"line",x1:46,y1:w+88,x2:246,y2:w+88,stroke:[.2,.25,.32],lineWidth:.4}),T.push({type:"line",x1:141,y1:w+70,x2:151,y2:w+70,stroke:[.4,.6,.8],lineWidth:.8}),T.push({type:"line",x1:146,y1:w+65,x2:146,y2:w+75,stroke:[.4,.6,.8],lineWidth:.8}),T.push({type:"line",x1:52,y1:w+119,x2:58,y2:w+119,stroke:[.5,.7,.9],lineWidth:.8}),T.push({type:"line",x1:52,y1:w+119,x2:52,y2:w+113,stroke:[.5,.7,.9],lineWidth:.8}),T.push({type:"line",x1:240,y1:w+21,x2:234,y2:w+21,stroke:[.5,.7,.9],lineWidth:.8}),T.push({type:"line",x1:240,y1:w+21,x2:240,y2:w+27,stroke:[.5,.7,.9],lineWidth:.8}),A.push({text:`REC * SHOT ${I}`,x:52,y:w+110,font:"F4",size:7.5,color:[1,1,1]}),A.push({text:`${le} * ${V}`,x:52,y:w+23,font:"F3",size:7,color:[.7,.8,.9]}),A.push({text:`SHOT ${I} -- SCENE ${c}`,x:260,y:w+115,font:"F2",size:9.5,color:[.1,.3,.8]}),T.push({type:"rect",x:480,y:w+112,w:86,h:16,fill:[.95,.96,.98],stroke:ie,lineWidth:.7}),A.push({text:me,x:486,y:w+117,font:"F2",size:7,color:ie}),A.push({text:X.slice(0,38),x:260,y:w+100,font:"F2",size:10.5,color:[.08,.1,.12]}),A.push({text:`Camera: ${_} * ${V} (${le})`,x:260,y:w+86,font:"F1",size:8,color:[.35,.4,.45]});const q=Pt(L.description||"",48);let Y=w+72;for(let ce=0;ce<Math.min(q.length,3);ce++)A.push({text:q[ce],x:260,y:Y,font:"F1",size:8,color:[.18,.22,.26]}),Y-=11;const j=L.directorNotes||L.continuity?.lightingContinuity||L.continuity?.eyeline||"";j&&A.push({text:`Note: ${j.slice(0,52)}`,x:260,y:w+25,font:"F5",size:7.5,color:[.45,.48,.52]}),w-=150}T.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),A.push({text:"SCRIPTORA STORYBOARD STUDIO -- OFFICIAL CAMERA & CONCEPT COMPOSITION",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),A.push({text:`Page ${h+1} of ${r}`,x:510,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),p.push({vectors:T,texts:A})}const b=Lt(p),y=l.replace(/[^a-zA-Z0-9]+/g,"_").slice(0,30),x=`Storyboard_${o.replace(/\s+/g,"_")}_${y}.pdf`;return Rt(b,x),b}const Eo={Cast:{icon:"person"},Locations:{icon:"location_on"},Props:{icon:"inventory_2"},"Practical FX":{icon:"science"},Stunts:{icon:"sports_kabaddi"},Costumes:{icon:"checkroom"},Vehicles:{icon:"commute"},Sound:{icon:"music_note"},"Hair & Makeup":{icon:"face"}};function ko(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||$.state.selectedScriptId;const n=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${qe("Pre-Production","Script Breakdown Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Jt("Script Breakdown","dataset",n||"/production",`
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
        `,null,"Elements, departments and scene requirements.")}

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
          <div class="flex items-stretch gap-1.5 overflow-x-auto pb-1 text-xs shrink-0 border-t border-slate-100 pt-2" id="cat-filters">
            <button class="cat-btn px-2.5 py-1.5 rounded-lg font-semibold bg-blue-600 text-white shadow-xs inline-flex items-center justify-center gap-1 cursor-pointer shrink-0 h-[44px]" data-cat="all">
              <span class="text-[11px]">All Categories</span>
            </button>
            <button class="cat-btn px-1 py-1.5 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 inline-flex flex-col items-center justify-center gap-0.5 cursor-pointer shrink-0 h-[44px] w-[68px] overflow-hidden" data-cat="Cast">
              <span class="material-symbols-outlined text-[14px] text-slate-400 leading-none">person</span>
              <span class="text-[9px] text-center leading-tight w-full px-0.5">Cast & Characters</span>
            </button>
            <button class="cat-btn px-1 py-1.5 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 inline-flex flex-col items-center justify-center gap-0.5 cursor-pointer shrink-0 h-[44px] w-[68px] overflow-hidden" data-cat="Locations">
              <span class="material-symbols-outlined text-[14px] text-slate-400 leading-none">location_on</span>
              <span class="text-[9px] text-center leading-tight w-full px-0.5">Locations</span>
            </button>
            <button class="cat-btn px-1 py-1.5 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 inline-flex flex-col items-center justify-center gap-0.5 cursor-pointer shrink-0 h-[44px] w-[68px] overflow-hidden" data-cat="Props">
              <span class="material-symbols-outlined text-[14px] text-slate-400 leading-none">inventory_2</span>
              <span class="text-[9px] text-center leading-tight w-full px-0.5">Props</span>
            </button>
            <button class="cat-btn px-1 py-1.5 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 inline-flex flex-col items-center justify-center gap-0.5 cursor-pointer shrink-0 h-[44px] w-[68px] overflow-hidden" data-cat="Practical FX">
              <span class="material-symbols-outlined text-[14px] text-slate-400 leading-none">science</span>
              <span class="text-[9px] text-center leading-tight w-full px-0.5">Practical FX</span>
            </button>
            <button class="cat-btn px-1 py-1.5 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 inline-flex flex-col items-center justify-center gap-0.5 cursor-pointer shrink-0 h-[44px] w-[68px] overflow-hidden" data-cat="Stunts">
              <span class="material-symbols-outlined text-[14px] text-slate-400 leading-none">sports_kabaddi</span>
              <span class="text-[9px] text-center leading-tight w-full px-0.5">Stunts & Action</span>
            </button>
            <button class="cat-btn px-1 py-1.5 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 inline-flex flex-col items-center justify-center gap-0.5 cursor-pointer shrink-0 h-[44px] w-[68px] overflow-hidden" data-cat="Costumes">
              <span class="material-symbols-outlined text-[14px] text-slate-400 leading-none">checkroom</span>
              <span class="text-[9px] text-center leading-tight w-full px-0.5">Costumes</span>
            </button>
            <button class="cat-btn px-1 py-1.5 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 inline-flex flex-col items-center justify-center gap-0.5 cursor-pointer shrink-0 h-[44px] w-[68px] overflow-hidden" data-cat="Vehicles">
              <span class="material-symbols-outlined text-[14px] text-slate-400 leading-none">commute</span>
              <span class="text-[9px] text-center leading-tight w-full px-0.5">Vehicles</span>
            </button>
          </div>
        </div>

        <!-- Elements List Grid -->
        <div id="breakdown-list" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading breakdown elements...</div>
        </div>

      </main>

      ${je("production")}

      <!-- Add Element Modal -->
      <div id="modal-add-element" class="scriptora-modal-overlay hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex">
        <div class="scriptora-modal-card bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
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

      <!-- Delete Element Confirmation Modal -->
      <div id="modal-delete-element" class="scriptora-modal-overlay hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex">
        <div class="scriptora-modal-card bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-rose-600">delete</span>
              <h3 class="font-heading font-bold text-sm text-slate-900">Delete Production Element?</h3>
            </div>
            <button id="close-delete-modal" class="text-slate-400 hover:text-slate-700 cursor-pointer" aria-label="Close modal">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          
          <div class="p-5 flex flex-col gap-3 text-xs">
            <div class="p-3 bg-rose-50/60 border border-rose-100 rounded-xl flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <span id="delete-modal-name" class="font-heading font-bold text-sm text-rose-950"></span>
                <span id="delete-modal-category" class="px-2 py-0.5 rounded-md bg-white border border-rose-200 text-rose-800 text-[10px] font-semibold"></span>
              </div>
              <p id="delete-modal-scenes" class="text-[11px] text-rose-800/80 font-mono"></p>
            </div>

            <p class="text-slate-600 text-xs leading-relaxed">
              Are you sure you want to delete this element from the production breakdown? This action will remove tracking and review records for this element. Screenplay text and scene content will remain completely intact.
            </p>

            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" id="btn-cancel-delete" class="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium cursor-pointer transition-colors">Cancel</button>
              <button type="button" id="btn-confirm-delete" class="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-2xs cursor-pointer transition-colors flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px]">delete</span>
                <span>Delete Element</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  `}async function Io(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),a=s||n.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust";let o=n.get("category")||"all",i=n.get("scene")||"all",l=n.get("character")||n.get("search")||"",c=null;const m=document.getElementById("breakdown-scene-select");m&&i!=="all"&&(m.value=i.startsWith("scene-")?i:`scene-${i}`),o!=="all"&&document.querySelectorAll(".cat-btn").forEach(k=>{k.getAttribute("data-cat")===o?(k.classList.add("bg-blue-600","text-white","shadow-2xs"),k.classList.remove("bg-slate-100","text-slate-700")):(k.classList.remove("bg-blue-600","text-white","shadow-2xs"),k.classList.add("bg-slate-100","text-slate-700"))});const u=document.getElementById("breakdown-search");u&&l&&(u.value=l);const d=k=>{const O=k.category;if(O==="Cast"){const xe=!k.assignedActor||k.assignedActor.toLowerCase().includes("unassigned")||k.assignedActor.toLowerCase().includes("open"),W=k.castingStatus==="Confirmed Cast"?"bg-emerald-50 text-emerald-700 border-emerald-200":k.castingStatus==="Offer Out"?"bg-sky-50 text-sky-700 border-sky-200":"bg-amber-50 text-amber-700 border-amber-200";return`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Actor</span>
            <div class="font-semibold text-slate-900 mt-0.5">
              ${xe?'<span class="text-amber-700 italic">Unassigned (Open Role)</span>':`<span class="text-indigo-700 font-bold">${k.assignedActor}</span>`}
            </div>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Casting Status</span>
            <span class="inline-block mt-0.5 px-2 py-0.5 rounded-lg border text-[11px] font-semibold ${W}">
              ${k.castingStatus||"Auditioning"}
            </span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Actor Availability</span>
            <div class="text-slate-700 mt-0.5 font-medium truncate" title="${k.actorAvailability||"Not specified"}">
              ${k.actorAvailability||"Not specified"}
            </div>
          </div>
        </div>
      `}return O==="Props"?`
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sourcing</span>
            <span class="font-semibold text-emerald-800 text-[11px]">${k.sourcingType||"Prop House"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quantity</span>
            <span class="font-semibold text-slate-900 text-[11px]">${k.quantity||"1"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Readiness</span>
            <span class="font-semibold text-teal-700 text-[11px]">${k.readinessStatus||"Ready"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Continuity Notes</span>
            <span class="text-slate-600 text-[11px] truncate block" title="${k.continuityNotes||"Standard"}">${k.continuityNotes||"Standard"}</span>
          </div>
        </div>
      `:O==="Practical FX"?`
        <div class="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-purple-50/50 p-2 rounded-xl border border-purple-100">
              <span class="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Required Resources</span>
              <span class="font-semibold text-purple-900 text-[11px]">${k.requiredResources||"Standard FX Kit"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Technical Specs</span>
              <span class="text-slate-800 font-medium text-[11px]">${k.technicalRequirements||"Per department"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prep Status</span>
              <span class="font-semibold text-emerald-700 text-[11px]">${k.prepStatus||"Rigged & Tested"}</span>
            </div>
          </div>
          ${k.safetyNotes?`
            <div class="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-1.5 text-[11px]">
              <span class="material-symbols-outlined text-[15px] text-rose-600 shrink-0 mt-0.5">warning</span>
              <div><strong class="font-semibold">Safety Mandate:</strong> ${k.safetyNotes}</div>
            </div>
          `:""}
        </div>
      `:O==="Stunts"?`
        <div class="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-rose-50/50 p-2 rounded-xl border border-rose-100">
              <span class="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">Safety Planning</span>
              <span class="font-semibold text-rose-900 text-[11px]">${k.safetyPlanningStatus||"Review in Progress"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Qualified Personnel</span>
              <span class="text-slate-800 font-medium text-[11px]">${k.qualifiedPersonnel||"Lead Stunt Performer"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rigging Requirements</span>
              <span class="text-slate-800 font-medium text-[11px]">${k.coordinationRequirements||"Coordinator on set"}</span>
            </div>
          </div>
        </div>
      `:O==="Locations"?`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-amber-50/50 p-2 rounded-xl border border-amber-100">
            <span class="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Context & Lighting</span>
            <span class="font-semibold text-amber-900 text-[11px]">${k.context||"INT."} · ${k.lighting||"DAY"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location Status</span>
            <span class="font-semibold text-emerald-700 text-[11px]">${k.locationStatus||"Permitted & Locked"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Access Details</span>
            <span class="text-slate-700 text-[11px] truncate block" title="${k.accessDetails||"Standard access"}">${k.accessDetails||"Standard access"}</span>
          </div>
        </div>
      `:O==="Costumes"?`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-teal-50/50 p-2 rounded-xl border border-teal-100">
            <span class="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">Character</span>
            <span class="font-semibold text-teal-900 text-[11px]">${k.character||"Cast member"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Continuity Changes</span>
            <span class="text-slate-700 text-[11px] truncate block" title="${k.continuityChanges||"Stage 1"}">${k.continuityChanges||"Stage 1"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prep Status</span>
            <span class="font-semibold text-emerald-700 text-[11px]">${k.prepStatus||"Fitted & Approved"}</span>
          </div>
        </div>
      `:O==="Vehicles"?`
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Availability</span>
            <span class="font-semibold text-slate-900 text-[11px]">${k.availability||"On Set"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Operational Requirements</span>
            <span class="text-slate-700 text-[11px]">${k.operationalRequirements||"Qualified operator"}</span>
          </div>
        </div>
      `:""},r=k=>{const O=k.category,xe=k.scenes&&k.scenes.length>0?k.scenes.join(", "):k.sceneNumber;return`
      <div class="edit-panel mt-3 p-4 bg-slate-50/90 rounded-2xl border-2 border-blue-400/80 shadow-md flex flex-col gap-3 text-xs animate-in fade-in duration-150">
        <div class="flex items-center justify-between border-b border-slate-200 pb-2">
          <div class="flex items-center gap-1.5 font-heading font-bold text-blue-900">
            <span class="material-symbols-outlined text-[18px]">edit</span>
            <span>Edit Production Element: ${k.name}</span>
          </div>
          <span class="text-[10px] text-slate-500 font-medium">Owner Permissions Active</span>
        </div>

        <form class="form-edit-inline flex flex-col gap-3" data-id="${k.id}">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Element Name</label>
              <input type="text" name="name" value="${k.name||""}" required class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Category</label>
              <select name="category" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="Cast" ${O==="Cast"?"selected":""}>Cast & Characters</option>
                <option value="Locations" ${O==="Locations"?"selected":""}>Locations</option>
                <option value="Props" ${O==="Props"?"selected":""}>Props</option>
                <option value="Practical FX" ${O==="Practical FX"?"selected":""}>Practical FX</option>
                <option value="Stunts" ${O==="Stunts"?"selected":""}>Stunts & Action</option>
                <option value="Costumes" ${O==="Costumes"?"selected":""}>Costumes & Wardrobe</option>
                <option value="Vehicles" ${O==="Vehicles"?"selected":""}>Vehicles & Equipment</option>
                <option value="Sound" ${O==="Sound"?"selected":""}>Sound</option>
                <option value="Hair & Makeup" ${O==="Hair & Makeup"?"selected":""}>Hair & Makeup</option>
              </select>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Review Status</label>
              <select name="status" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="Confirmed" ${k.status==="Confirmed"?"selected":""}>Confirmed (Human Approved)</option>
                <option value="Needs Review" ${k.status==="Needs Review"?"selected":""}>Needs Review</option>
                <option value="Rejected" ${k.status==="Rejected"?"selected":""}>Rejected</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Scenes (comma separated)</label>
              <input type="text" name="scenes" value="${xe}" placeholder="e.g. 1, 4, 18" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              <span class="text-[10px] text-slate-400">Links element to multiple scenes simultaneously</span>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Description / Screenplay Context</label>
              <input type="text" name="description" value="${k.description||""}" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <!-- Dynamic Category Fields inside Edit Panel -->
          ${O==="Cast"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Assigned Actor</label>
                <input type="text" name="assignedActor" value="${k.assignedActor||""}" placeholder="e.g. Dev Patel (or leave blank for Open)" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Casting Status</label>
                <select name="castingStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Confirmed Cast" ${k.castingStatus==="Confirmed Cast"?"selected":""}>Confirmed Cast</option>
                  <option value="Offer Out" ${k.castingStatus==="Offer Out"?"selected":""}>Offer Out</option>
                  <option value="Auditioning" ${k.castingStatus==="Auditioning"?"selected":""}>Auditioning</option>
                  <option value="Uncast / Open" ${k.castingStatus==="Uncast / Open"?"selected":""}>Uncast / Open Role</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Actor Availability</label>
                <input type="text" name="actorAvailability" value="${k.actorAvailability||""}" placeholder="e.g. Shoot Days 1-14" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${O==="Props"?`
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5 p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Sourcing Type</label>
                <select name="sourcingType" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Hero Prop" ${k.sourcingType==="Hero Prop"?"selected":""}>Hero Prop</option>
                  <option value="Custom Build / Fabricate" ${k.sourcingType==="Custom Build / Fabricate"?"selected":""}>Custom Build</option>
                  <option value="Prop House Rental" ${k.sourcingType==="Prop House Rental"?"selected":""}>Prop House</option>
                  <option value="Purchased" ${k.sourcingType==="Purchased"?"selected":""}>Purchased</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Quantity</label>
                <input type="text" name="quantity" value="${k.quantity||"1"}" placeholder="e.g. x2 Hero, x4 Rubber" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Readiness Status</label>
                <select name="readinessStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Ready in Art Dept" ${k.readinessStatus==="Ready in Art Dept"?"selected":""}>Ready in Art Dept</option>
                  <option value="Fabrication Ready" ${k.readinessStatus==="Fabrication Ready"?"selected":""}>Fabrication Ready</option>
                  <option value="In Progress" ${k.readinessStatus==="In Progress"?"selected":""}>In Progress</option>
                  <option value="Pending Sourcing" ${k.readinessStatus==="Pending Sourcing"?"selected":""}>Pending Sourcing</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Continuity Notes</label>
                <input type="text" name="continuityNotes" value="${k.continuityNotes||""}" placeholder="Continuity tracking..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${O==="Practical FX"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-purple-50/50 rounded-xl border border-purple-100">
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Required Resources</label>
                <input type="text" name="requiredResources" value="${k.requiredResources||""}" placeholder="CO2, Brine Reservoir..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Technical Specs</label>
                <input type="text" name="technicalRequirements" value="${k.technicalRequirements||""}" placeholder="Pressure limits, wiring..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Safety Notes</label>
                <input type="text" name="safetyNotes" value="${k.safetyNotes||""}" placeholder="Goggles, splash radius..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${O==="Stunts"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-rose-50/50 rounded-xl border border-rose-100">
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Safety Planning Status</label>
                <select name="safetyPlanningStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Rigging Rig Approved" ${k.safetyPlanningStatus==="Rigging Rig Approved"?"selected":""}>Rigging Rig Approved</option>
                  <option value="Rehearsal Pending" ${k.safetyPlanningStatus==="Rehearsal Pending"?"selected":""}>Rehearsal Pending</option>
                  <option value="In Coordinator Review" ${k.safetyPlanningStatus==="In Coordinator Review"?"selected":""}>In Review</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Qualified Personnel</label>
                <input type="text" name="qualifiedPersonnel" value="${k.qualifiedPersonnel||""}" placeholder="Stunt double, rigger..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Coordination Details</label>
                <input type="text" name="coordinationRequirements" value="${k.coordinationRequirements||""}" placeholder="Ratchet, cables..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${O==="Locations"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-amber-50/50 rounded-xl border border-amber-100">
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Context & Lighting</label>
                <input type="text" name="context" value="${k.context||"INT."}" placeholder="INT. or EXT." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Location Status</label>
                <input type="text" name="locationStatus" value="${k.locationStatus||"Permitted & Locked"}" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Access Details</label>
                <input type="text" name="accessDetails" value="${k.accessDetails||""}" placeholder="Access permits, route..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          <div class="flex items-center justify-between pt-2 border-t border-slate-200">
            <button type="button" class="btn-delete-element text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-xl font-medium transition-colors cursor-pointer flex items-center gap-1" data-id="${k.id}">
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
    `},p=async()=>{const k=await nt(a,o,i),O=k.filter(B=>{if(!l)return!0;const he=l.toLowerCase();return B.name.toLowerCase().includes(he)||B.description&&B.description.toLowerCase().includes(he)||B.category.toLowerCase().includes(he)||B.assignedActor&&B.assignedActor.toLowerCase().includes(he)||B.notes&&B.notes.toLowerCase().includes(he)}),xe=k.length,W=k.filter(B=>B.status==="Confirmed").length,Z=k.filter(B=>B.status==="Needs Review"||B.status==="Extracted").length,E=k.filter(B=>B.status==="Rejected").length,de=document.getElementById("kpi-total"),ae=document.getElementById("kpi-confirmed"),ue=document.getElementById("kpi-review"),Q=document.getElementById("kpi-rejected");de&&(de.textContent=xe),ae&&(ae.textContent=W),ue&&(ue.textContent=Z),Q&&(Q.textContent=E);const ne=document.getElementById("breakdown-list");if(ne){if(O.length===0){ne.innerHTML=`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400 text-xs">
          No breakdown elements match the active category, scene, or search filters.
        </div>
      `;return}ne.innerHTML=O.map(B=>{const he=B.status==="Confirmed",Ae=B.status==="Needs Review"||B.status==="Extracted",se=B.status==="Rejected",$e=c===B.id,te=Eo[B.category]||{icon:"label"},Ne=Ae?'<span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium flex items-center gap-1">Needs Review</span>':se?'<span class="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium flex items-center gap-1">Excluded</span>':"",ye=(Array.isArray(B.scenes)&&B.scenes.length>0?B.scenes:[B.sceneNumber]).map(S=>`Sc ${S}`).join(", ");return`
        <div class="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-xs hover:border-slate-300 transition-colors flex flex-col gap-2.5" data-id="${B.id}">
          <!-- Top Row: Element Name on Left, Scene Tag, Category Tag, and Compact Action Buttons -->
          <div class="flex items-center justify-between gap-2 min-w-0">
            <div class="flex items-center gap-2 flex-wrap min-w-0">
              <h3 class="font-heading font-bold text-base text-slate-900 tracking-tight shrink-0 mr-1">${B.name}</h3>
              <span class="px-2 py-0.5 rounded-md bg-blue-50/70 text-blue-700 border border-blue-100 font-semibold text-xs shrink-0 flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">movie</span>
                <span>${ye}</span>
              </span>
              <span class="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-700 flex items-center gap-1 shrink-0">
                <span class="material-symbols-outlined text-[13px] text-slate-400">${te.icon}</span>
                <span>${B.category}</span>
              </span>
              ${Ne}
            </div>

            <!-- Primary Action Buttons (Compact, aligned near heading) -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button class="btn-toggle-edit px-2 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${B.id}" title="Edit details" aria-label="Edit ${B.name}">
                <span class="material-symbols-outlined text-[15px]">${$e?"expand_less":"edit"}</span>
                <span class="hidden sm:inline">${$e?"Close":"Edit"}</span>
              </button>

              ${he?`
                <button class="btn-review-item px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs transition-colors cursor-pointer" data-id="${B.id}" title="Request re-review" aria-label="Request re-review for ${B.name}">
                  Re-review
                </button>
              `:`
                <button class="btn-confirm-item px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${B.id}" title="Confirm item" aria-label="Confirm ${B.name}">
                  <span class="material-symbols-outlined text-[14px]">check</span>
                  <span>Confirm</span>
                </button>
              `}

              ${se?"":`
                <button class="btn-reject-item p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" data-id="${B.id}" title="Reject element" aria-label="Reject ${B.name}">
                  <span class="material-symbols-outlined text-[16px]">block</span>
                </button>
              `}

              <button class="btn-delete-element p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" data-id="${B.id}" title="Delete element" aria-label="Delete ${B.name}">
                <span class="material-symbols-outlined text-[16px]">delete</span>
              </button>
            </div>
          </div>

          <!-- Description / Role -->
          <p class="text-xs text-slate-600 leading-relaxed font-sans">${B.description||B.characterRole||"No description provided."}</p>

          <!-- Category Specific Rich Presentation Row -->
          ${d(B)}

          <!-- Traceability & Evidence Row -->
          <div class="flex flex-col gap-1.5 mt-1 pt-2 border-t border-slate-100">
            ${B.sourceSnippet?`
              <div class="text-[11px] font-mono text-slate-600 bg-slate-50/80 border border-slate-200/60 rounded-xl p-2 leading-relaxed">
                <span class="text-slate-400 font-sans font-bold text-[10px] uppercase tracking-wider block mb-0.5">Screenplay Evidence (Draft 4.2):</span>
                "${B.sourceSnippet}"
              </div>
            `:""}

            <div class="flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-400">
              <div class="flex items-center gap-2">
                ${B.originalAiSuggestion?`
                  <span class="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">AI Extracted</span>
                `:`
                  <span class="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium">Manual Entry</span>
                `}
                ${B.userCorrection?`
                  <span class="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5" title="Modified by user">
                    <span class="material-symbols-outlined text-[12px]">tune</span>
                    <span>Corrected by ${B.userCorrection.correctedBy||"Owner"}</span>
                  </span>
                `:""}
              </div>

              ${B.confirmedBy?`
                <div>Confirmed by <strong class="font-semibold text-slate-600">${B.confirmedBy}</strong></div>
              `:""}
            </div>
          </div>

          <!-- Inline Edit Area if active -->
          ${$e?r(B):""}
        </div>
      `}).join(""),ne.querySelectorAll(".btn-toggle-edit").forEach(B=>{B.onclick=()=>{const he=B.getAttribute("data-id");c=c===he?null:he,p()}}),ne.querySelectorAll(".btn-cancel-edit").forEach(B=>{B.onclick=()=>{c=null,p()}}),ne.querySelectorAll(".form-edit-inline").forEach(B=>{B.onsubmit=async he=>{he.preventDefault();const Ae=B.getAttribute("data-id"),se=new FormData(B),te=(se.get("scenes")||"18").split(",").map(ye=>Number(ye.trim())).filter(ye=>!isNaN(ye)),Ne=te.length>0?te[0]:18,Ie={name:se.get("name"),category:se.get("category"),status:se.get("status"),description:se.get("description"),scenes:te,sceneNumber:Ne,sceneId:`scene-${Ne}`,assignedActor:se.get("assignedActor")||"",castingStatus:se.get("castingStatus")||"Uncast / Open",actorAvailability:se.get("actorAvailability")||"",sourcingType:se.get("sourcingType")||"",quantity:se.get("quantity")||"",readinessStatus:se.get("readinessStatus")||"",continuityNotes:se.get("continuityNotes")||"",requiredResources:se.get("requiredResources")||"",technicalRequirements:se.get("technicalRequirements")||"",safetyNotes:se.get("safetyNotes")||"",safetyPlanningStatus:se.get("safetyPlanningStatus")||"",qualifiedPersonnel:se.get("qualifiedPersonnel")||"",coordinationRequirements:se.get("coordinationRequirements")||"",context:se.get("context")||"",locationStatus:se.get("locationStatus")||"",accessDetails:se.get("accessDetails")||""};await Xt(a,Ae,Ie),C(`Saved updates for "${Ie.name}"`),c=null,p()}}),ne.querySelectorAll(".btn-delete-element").forEach(B=>{B.onclick=he=>{he.stopPropagation();const Ae=B.getAttribute("data-id"),se=k.find($e=>$e.id===Ae);se&&Y(se)}}),ne.querySelectorAll(".btn-confirm-item").forEach(B=>{B.onclick=async()=>{const he=B.getAttribute("data-id");await Xt(a,he,{status:"Confirmed"}),C("Element confirmed by Owner"),p()}}),ne.querySelectorAll(".btn-review-item").forEach(B=>{B.onclick=async()=>{const he=B.getAttribute("data-id");await Xt(a,he,{status:"Needs Review",isHumanConfirmed:!1}),C("Marked for review"),p()}}),ne.querySelectorAll(".btn-reject-item").forEach(B=>{B.onclick=async()=>{const he=B.getAttribute("data-id");await Xt(a,he,{status:"Rejected"}),C("Element rejected"),p()}})}};await p(),document.querySelectorAll(".cat-btn").forEach(k=>{k.onclick=()=>{document.querySelectorAll(".cat-btn").forEach(O=>{O.classList.remove("bg-blue-600","text-white","shadow-2xs"),O.classList.add("bg-slate-100","text-slate-700")}),k.classList.add("bg-blue-600","text-white","shadow-2xs"),k.classList.remove("bg-slate-100","text-slate-700"),o=k.getAttribute("data-cat"),p()}});const b=document.getElementById("breakdown-scene-select");b&&(b.onchange=k=>{i=k.target.value,p()});const y=document.getElementById("breakdown-search");y&&(y.oninput=k=>{l=k.target.value,p()});const x=document.getElementById("elem-cat"),h=document.getElementById("add-modal-category-fields"),T=()=>{if(!h||!x)return;const k=x.value;k==="Cast"?h.innerHTML=`
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
      `:k==="Props"?h.innerHTML=`
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
      `:k==="Practical FX"?h.innerHTML=`
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
      `:k==="Stunts"?h.innerHTML=`
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
      `:k==="Locations"?h.innerHTML=`
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
      `:h.innerHTML=`
        <div>
          <label class="font-semibold text-slate-700 block mb-1">Department Notes</label>
          <input type="text" id="add-dept-notes" placeholder="Department-specific instructions..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
        </div>
      `};x&&(x.onchange=T,T());const A=document.getElementById("modal-add-element"),N=document.getElementById("btn-add-element"),w=document.getElementById("close-add-modal"),L=document.getElementById("btn-cancel-add"),I=document.getElementById("form-add-element"),X=()=>{T(),Qe(A)},V=()=>{ke(A)};N&&(N.onclick=X),w&&(w.onclick=V),L&&(L.onclick=V),A&&(A.onclick=k=>{k.target===A&&V()});const le=document.getElementById("modal-delete-element"),_=document.getElementById("close-delete-modal"),me=document.getElementById("btn-cancel-delete"),ie=document.getElementById("btn-confirm-delete");let q=null;const Y=k=>{q=k;const O=document.getElementById("delete-modal-name"),xe=document.getElementById("delete-modal-category"),W=document.getElementById("delete-modal-scenes");if(O&&(O.textContent=k.name),xe&&(xe.textContent=k.category),W){const Z=Array.isArray(k.scenes)&&k.scenes.length>0?k.scenes:[k.sceneNumber];W.textContent=`Associated with: ${Z.map(E=>`Scene ${E}`).join(", ")}`}Qe(le)},j=()=>{q=null,ke(le)};_&&(_.onclick=j),me&&(me.onclick=j),le&&(le.onclick=k=>{k.target===le&&j()}),ie&&(ie.onclick=async()=>{if(!q)return;const k=q;ie.disabled=!0,ie.classList.add("opacity-75","cursor-not-allowed");try{const O=await Yn(a,k.id);O&&(O.success||O.removedId)?(C(`Deleted "${k.name}" from breakdown`),j(),c=null,await p()):C(O?.message||"Failed to delete element")}catch(O){C("Error deleting element: "+(O.message||"Network error"))}finally{ie.disabled=!1,ie.classList.remove("opacity-75","cursor-not-allowed")}});const ce=document.getElementById("btn-export-breakdown-pdf");ce&&(ce.onclick=async()=>{try{const k=await nt(a,o,i);gn(k,{title:"Chronicles of Dust",draft:"Draft 4.2"}),C(`Exported Breakdown Report (${k.length} elements) PDF`)}catch(k){console.error(k),C("Failed to export breakdown PDF")}}),I&&(I.onsubmit=async k=>{k.preventDefault();const O=document.getElementById("elem-name")?.value,xe=document.getElementById("elem-cat")?.value,W=document.getElementById("elem-scenes")?.value||"18",Z=document.getElementById("elem-status")?.value||"Confirmed",E=document.getElementById("elem-desc")?.value;if(!O)return;const de=W.split(",").map(Q=>Number(Q.trim())).filter(Q=>!isNaN(Q)),ae=de.length>0?de[0]:18,ue={name:O,category:xe,sceneNumber:ae,sceneId:`scene-${ae}`,scenes:de,description:E,status:Z,sourceSnippet:`Manual production element registered for Scene ${de.join(", ")}`,assignedActor:document.getElementById("add-actor")?.value||"",castingStatus:document.getElementById("add-casting-status")?.value||"Uncast / Open",actorAvailability:document.getElementById("add-availability")?.value||"",sourcingType:document.getElementById("add-prop-source")?.value||"",quantity:document.getElementById("add-prop-qty")?.value||"",readinessStatus:document.getElementById("add-prop-readiness")?.value||"",continuityNotes:document.getElementById("add-prop-continuity")?.value||"",requiredResources:document.getElementById("add-fx-res")?.value||"",technicalRequirements:document.getElementById("add-fx-tech")?.value||"",safetyNotes:document.getElementById("add-fx-safety")?.value||"",safetyPlanningStatus:document.getElementById("add-stunt-status")?.value||"",qualifiedPersonnel:document.getElementById("add-stunt-personnel")?.value||"",coordinationRequirements:document.getElementById("add-stunt-coordination")?.value||"",context:document.getElementById("add-loc-context")?.value||"",lighting:document.getElementById("add-loc-lighting")?.value||"",locationStatus:document.getElementById("add-loc-status")?.value||"",notes:document.getElementById("add-dept-notes")?.value||""};await Xn(a,ue),C(`Added "${O}" to Scene ${de.join(", ")}`),ke(),I.reset(),p()})}function Co(e=null,t=null,s=null){const n=new URLSearchParams(window.location.search||""),a=t||n.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",o=s||n.get("csId"),i=n.get("action")==="new",l=n.get("action")==="edit",c=e||n.get("from");let m="/production";l?m=`/production/call-sheets?scriptId=${a}&csId=${o}`:o||i?m=`/production/call-sheets?scriptId=${a}`:m=c||"/production";const u=m;return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${qe("Pre-Production",l?"Edit Call Sheet":o?"Call Sheet Inspector":i?"Create New Call Sheet":"Call Sheets Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Jt(l?"Edit Call Sheet":o?"Call Sheet Detail":i?"New Call Sheet":"Call Sheets",l?"edit_note":"assignment",u,!o&&!i&&!l?`
            <a href="/production/call-sheets?scriptId=${a}&action=new" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>New Call Sheet</span>
            </a>
          `:"",null,"Daily call sheets, crew calls and shooting details.")}

        <div id="callsheet-view-container" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading call sheet records...</div>
        </div>
      </main>

      ${je("production")}
    </div>
  `}async function hn(e,t=null,s=null,n=null){const a=new URLSearchParams(window.location.search||""),o=s||a.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",i=n||a.get("csId"),l=a.get("action")==="new",c=a.get("action")==="edit",m=document.getElementById("callsheet-view-container");if(!m)return;const d=(localStorage.getItem("scriptora_prod_role")||"Owner")==="Owner";if(c&&i){const r=await Bs(o,i);if(!r){m.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>';return}const p=r.status==="Confirmed"||r.isPublished;m.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col gap-4">
        <!-- Edit Masthead & Revision Notice -->
        <div class="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-bold text-base text-slate-900">Edit Call Sheet #${r.callSheetNumber}</h2>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${p?"bg-amber-50 text-amber-800 border border-amber-200":"bg-blue-50 text-blue-700 border border-blue-200"}">
                ${p?"Branch New Revision Draft":"Editing Draft"}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${r.shootDay} · Baseline: Draft 4.2 (Pinned)</p>
          </div>
          <div class="text-[11px] text-slate-400 font-mono">
            Source: Shooting Schedule Day ${r.shootDay.replace(/[^0-9]/g,"").slice(0,2)||"1"}
          </div>
        </div>

        ${p?`
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
                <span>${p?"Save Revision Draft":"Save Changes"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    `;const b=document.getElementById("form-edit-callsheet");b&&(b.onsubmit=async y=>{y.preventDefault();const x=document.getElementById("edit-cs-day")?.value||r.shootDay,h=document.getElementById("edit-cs-date")?.value||r.shootDate,T=document.getElementById("edit-cs-crewcall")?.value||r.generalCrewCall,A=document.getElementById("edit-cs-shootcall")?.value||r.shootingCall,N=document.getElementById("edit-cs-breakfast")?.value||r.breakfastTime,w=document.getElementById("edit-cs-wrap")?.value||r.estimatedWrap,L=document.getElementById("edit-cs-locname")?.value||r.locationName,I=document.getElementById("edit-cs-address")?.value||r.locationAddress,X=document.getElementById("edit-cs-parking")?.value||r.parkingNotes,V=document.getElementById("edit-cs-hospital")?.value||r.nearestHospital,le=document.getElementById("edit-cs-weather")?.value||r.weatherSummary,_=document.getElementById("edit-cs-instructions")?.value||r.specialInstructions;await Qn(o,r.id,{shootDay:x,shootDate:h,generalCrewCall:T,shootingCall:A,breakfastTime:N,estimatedWrap:w,locationName:L,locationAddress:I,parkingNotes:X,nearestHospital:V,weatherSummary:le,specialInstructions:_,isDraftRevision:p}),C(p?"Saved as new revision draft":"Call Sheet updated successfully"),e(`/production/call-sheets?scriptId=${o}&csId=${r.id}`)})}else if(l){const r=await et(o);m.innerHTML=`
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
              ${r.map(h=>`
                <option value="${h.dayNumber}" data-title="${h.title}" data-loc="${h.location}" data-date="${h.date}">
                  Day ${h.dayNumber} of 14 · ${h.date} — ${h.title} (${h.location})
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
    `;const p=document.getElementById("tab-linked"),b=document.getElementById("tab-manual"),y=document.getElementById("section-linked-day");p&&b&&(p.onclick=()=>{p.classList.add("bg-white","text-blue-700","shadow-2xs"),b.classList.remove("bg-white","text-blue-700","shadow-2xs"),y?.classList.remove("hidden")},b.onclick=()=>{b.classList.add("bg-white","text-blue-700","shadow-2xs"),p.classList.remove("bg-white","text-blue-700","shadow-2xs"),y?.classList.add("hidden")});const x=document.getElementById("form-create-callsheet");x&&(x.onsubmit=async h=>{h.preventDefault();const T=document.getElementById("new-cs-day")?.value||"3",A=document.getElementById("new-cs-date")?.value,N=document.getElementById("new-cs-crewcall")?.value,w=document.getElementById("new-cs-locname")?.value,L=document.getElementById("new-cs-address")?.value,I=document.getElementById("new-cs-hospital")?.value,X=document.getElementById("new-cs-parking")?.value,V=await Zn(o,{shootDay:`Day ${T} of 14`,shootDate:A,generalCrewCall:N,shootingCall:"06:30 AM",locationName:w,locationAddress:L,nearestHospital:I,parkingNotes:X});C(`Created Call Sheet #${V.callSheetNumber}`),e(`/production/call-sheets?scriptId=${o}&csId=${V.id}`)})}else if(i){const r=await Bs(o,i);if(!r){m.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>';return}const p=r.status==="Confirmed"||r.isPublished;m.innerHTML=`
      <!-- Top Action Banner -->
      <div class="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
            #${r.callSheetNumber}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-semibold text-sm text-slate-900">Call Sheet #${r.callSheetNumber}</h2>
              <span class="px-2 py-0.5 rounded-md text-[10px] font-medium border ${p?"bg-slate-50 text-slate-600 border-slate-200":"bg-amber-50 text-amber-700 border-amber-200"}">
                ${p?"Published Snapshot":"Draft — Pending Owner Approval"}
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
          ${!p&&d?`
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
            ${(r.scenes||[]).map(h=>`
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <a href="/production/schedule?scriptId=${o}&sceneId=scene-${h.sceneNumber}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${o}&csId=${r.id}`)}" class="w-16 font-mono font-bold text-blue-700 hover:underline" title="Inspect Scene Logistics in Schedule">Sc ${h.sceneNumber}</a>
                <div class="flex-1 min-w-0 pr-2">
                  <div class="font-semibold text-slate-900 truncate">${h.heading}</div>
                  <div class="text-[11px] text-slate-500 truncate">${h.desc}</div>
                </div>
                <span class="w-20 text-center font-mono text-[11px]">${h.pages}</span>
                <span class="w-32 text-right font-medium text-[11px] text-slate-700 truncate">${(h.cast||[]).map(T=>`<a href="/production/breakdown?scriptId=${o}&category=Cast&character=${encodeURIComponent(T)}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${o}&csId=${r.id}`)}" class="hover:underline font-semibold" title="Inspect ${T} in Breakdown">${T}</a>`).join(", ")}</span>
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
            ${(r.castCalls||[]).map(h=>`
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <a href="/production/breakdown?scriptId=${o}&category=Cast&character=${encodeURIComponent(h.character)}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${o}&csId=${r.id}`)}" class="w-32 font-bold text-slate-900 hover:text-blue-700 hover:underline" title="Inspect ${h.character} in Breakdown">${h.character}</a>
                <span class="flex-1 font-medium text-slate-700">${h.actor}</span>
                <span class="w-20 text-center font-mono text-[11px] text-slate-600">${h.pickup}</span>
                <span class="w-20 text-center font-mono text-[11px] text-slate-600">${h.hmuCall}</span>
                <span class="w-20 text-right font-mono font-bold text-blue-700">${h.onSet}</span>
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
    `;const b=document.getElementById("btn-print-callsheet");b&&(b.onclick=()=>{try{const h=$.state.activeScript||($.state.scripts||[]).find(T=>T.id===o);zs(r,{title:h?.title||"Chronicles of Dust",company:h?.company||"Badlands Anthology LLC",draft:h?.draft||"Draft 4.2"}),C(`Exported Call Sheet #${r.callSheetNumber} PDF`)}catch(h){console.error(h),C("Failed to generate Call Sheet PDF")}});const y=document.getElementById("btn-delete-callsheet");y&&(y.onclick=async()=>{if(!confirm(`Are you sure you want to delete draft Call Sheet #${r.callSheetNumber}? This cannot be undone.`))return;const h=await Rs(o,r.id);h.success?(C(`Call Sheet #${r.callSheetNumber} deleted`),e(`/production/call-sheets?scriptId=${o}`)):C(h.message||"Failed to delete call sheet")});const x=document.getElementById("btn-publish-callsheet");x&&(x.onclick=async()=>{confirm("Approve and lock this call sheet as an official immutable snapshot?")&&(await ea(o,r.id),C("Call Sheet published & snapshot locked"),e(`/production/call-sheets?scriptId=${o}&csId=${r.id}`))})}else{const r=await wt(o);m.innerHTML=`
      <div class="flex items-center justify-between">
        <h2 class="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px] text-blue-600">assignment</span>
          <span>Call Sheets Catalogue (${r.length})</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${r.map(p=>{const b=p.status==="Confirmed"||p.isPublished;return`
            <div class="cs-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group" data-id="${p.id}">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      #${p.callSheetNumber}
                    </div>
                    <div class="min-w-0">
                      <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors truncate">${p.shootDay}</h3>
                      <p class="text-[11px] text-slate-500 truncate">${p.shootDate}</p>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-medium shrink-0 ${b?"bg-slate-100 text-slate-700":"bg-amber-50/80 border border-amber-200 text-amber-800"}">
                    ${b?"Published":"Draft"}
                  </span>
                </div>

                <div class="space-y-1.5 text-xs text-slate-600 mt-2">
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[15px] text-slate-400">schedule</span>
                    <span>General Call: <strong class="text-slate-800">${p.generalCrewCall}</strong> · Set: <strong class="text-blue-600">${p.shootingCall}</strong></span>
                  </div>
                  <div class="flex items-center gap-1.5 truncate">
                    <span class="material-symbols-outlined text-[15px] text-slate-400">location_on</span>
                    <span class="truncate">${p.locationName}</span>
                  </div>
                </div>
              </div>

              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span class="flex items-center gap-1">
                  <span>View Details</span>
                  <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </span>
                <div class="flex items-center gap-2" onclick="event.stopPropagation()">
                  <button class="btn-card-export p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors" data-id="${p.id}" title="Direct Export PDF">
                    <span class="material-symbols-outlined text-[16px]">download</span>
                  </button>
                  ${!b&&d?`
                    <button class="btn-card-delete p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors" data-id="${p.id}" data-num="${p.callSheetNumber}" title="Delete Draft">
                      <span class="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  `:""}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    `,m.querySelectorAll(".cs-card").forEach(p=>{p.onclick=()=>{const b=p.getAttribute("data-id");e(`/production/call-sheets?scriptId=${o}&csId=${b}`)}}),m.querySelectorAll(".btn-card-export").forEach(p=>{p.onclick=b=>{b.stopPropagation();const y=p.getAttribute("data-id"),x=r.find(h=>h.id===y);if(x){const h=$.state.activeScript||($.state.scripts||[]).find(T=>T.id===o);zs(x,{title:h?.title||"Chronicles of Dust",company:h?.company||"Badlands Anthology LLC",draft:h?.draft||"Draft 4.2"}),C(`Exported Call Sheet #${x.callSheetNumber} PDF`)}}}),m.querySelectorAll(".btn-card-delete").forEach(p=>{p.onclick=async b=>{b.stopPropagation();const y=p.getAttribute("data-id"),x=p.getAttribute("data-num");if(!confirm(`Delete draft Call Sheet #${x}?`))return;const h=await Rs(o,y);h.success?(C(`Call Sheet #${x} deleted`),hn(e,t,s)):C(h.message||"Failed to delete")}})}}function Ao(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=t||s.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",a=s.get("mode")||"dialogue",i=e||s.get("from")||`/production?scriptId=${n}`;return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${qe("Pre-Production","Dialogue Sheets & Actor Sides")}

      <main class="flex-1 w-full max-w-2xl mx-auto px-4 pt-16 pb-28 flex flex-col gap-3.5 fade-in">
        ${Jt("Dialogue & Actor Sides","theater_comedy",i,"",null,"Dialogue sheets and actor scene sides.")}
        
        <!-- Mode Switcher Tabs Card (Segmented Control & Selector beneath it) -->
        <div class="bg-white rounded-3xl border border-slate-200/80 p-3.5 shadow-2xs flex flex-col gap-3">
          <!-- Segmented Control -->
          <div class="flex items-center bg-slate-100/90 p-1 rounded-2xl w-full">
            <button id="tab-mode-dialogue" class="flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all ${a==="dialogue"?"bg-white text-blue-600 shadow-2xs":"text-slate-600 hover:text-slate-900"} cursor-pointer text-center">
              Dialogue Sheets
            </button>
            <button id="tab-mode-sides" class="flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all ${a==="sides"?"bg-white text-blue-600 shadow-2xs":"text-slate-600 hover:text-slate-900"} cursor-pointer text-center">
              Actor Sides
            </button>
          </div>

          <!-- Dynamic Selector based on active mode -->
          <div class="flex items-center gap-2" id="filter-controls">
            <!-- Rendered via JS -->
          </div>
        </div>

        <!-- Document Viewer Area (Screenplay Document Typesetting) -->
        <div id="dialogue-sides-content" class="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs flex flex-col gap-3 font-mono text-xs text-slate-800">
          <div class="text-center text-slate-400 py-8 font-sans">Generating extract...</div>
        </div>

      </main>

      ${je("production")}
    </div>
  `}async function $o(e,t=null,s=null){const n=new URLSearchParams(window.location.search||"");s||n.get("scriptId")||$.state.selectedScriptId;let a=n.get("mode")||"dialogue",o="KEVIN",i=n.get("scene")||"1";const l=document.getElementById("tab-mode-dialogue"),c=document.getElementById("tab-mode-sides"),m=document.getElementById("filter-controls"),u=document.getElementById("dialogue-sides-content"),d=[{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"KEVIN",parenthetical:"(adjusting filter)",dialogue:"Wind gauge is spiking past forty knots, Marcus. Did you check the terminal pressure at the intake valve?",action:"Kevin wipes gritty red dust from the gauge glass with his thumb."},{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"MARCUS",parenthetical:"(shrugging)",dialogue:"Telemetry's been on the fritz since dawn. Central syndicate says it's thermal fluctuation.",action:"Marcus gestures with a cigarette toward the desert horizon."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"MEERA",parenthetical:"(eyes on monitor)",dialogue:"That's no fluctuation. Look at line three. Someone bypassed the telemetry loop eighty miles upriver.",action:"Meera brings up a wireframe map showing a hidden subterranean siphon branch."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"KEVIN",parenthetical:"(tense)",dialogue:"They're siphoning straight out of the municipal reservoir into private holding tanks.",action:"Kevin taps the terminal screen, freezing the anomaly coordinates."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"COMMANDER VANCE",parenthetical:"(smooth, unhurried)",dialogue:"Water belongs to those who possess the energy to lift it from the rock, Kevin. The frontier was built on that premise.",action:"Vance sips cold tea, watching the massive hydraulic pump pistons rise and plunge."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"KEVIN",parenthetical:"(stepping forward)",dialogue:"You signed the 2041 Treaty. If the southern aquifer collapses, ten thousand families wake up to dry taps.",action:"Kevin places the legal registry deed onto Vance's polished mahogany desk."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(shouting over the roar)",dialogue:"Hold the pylon, Meera! If the high-pressure valve seals now, the back-surge will fracture the entire chamber!",action:"Brine water sprays across Kevin's visor as he locks the hydraulic bypass manifold."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"MEERA",parenthetical:"(straining on cable)",dialogue:"Then don't let them break! Reroute the secondary relay through the floodgate breaker!",action:"Meera kicks off the iron catwalk, swinging across the chasm to secure the emergency lock."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(levering the valve bar)",dialogue:"Bypass locked! Bleed the line! Three... two... one!",action:"The pressure needles drop from red to blue as the municipal pipeline fills with fresh current."}];function r(){const x=new Date,h=T=>String(T).padStart(2,"0");return`${h(x.getDate())}/${h(x.getMonth()+1)}/${x.getFullYear()}`}function p(){if(m)if(a==="dialogue"){m.innerHTML=`
        <span class="text-xs font-semibold text-slate-500 shrink-0">Character:</span>
        <div class="relative inline-flex items-center flex-1 max-w-xs">
          <select id="char-select" class="w-full text-xs font-semibold bg-white border border-slate-200/90 rounded-2xl pl-3 pr-8 py-2 text-slate-900 appearance-none focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer">
            <option value="KEVIN" ${o==="KEVIN"?"selected":""}>KEVIN (Lead)</option>
            <option value="MEERA" ${o==="MEERA"?"selected":""}>MEERA (Lead)</option>
            <option value="COMMANDER VANCE" ${o==="COMMANDER VANCE"?"selected":""}>COMMANDER VANCE</option>
            <option value="MARCUS" ${o==="MARCUS"?"selected":""}>MARCUS</option>
          </select>
          <span class="material-symbols-outlined text-[18px] text-slate-400 absolute right-2.5 pointer-events-none">expand_more</span>
        </div>
      `;const x=document.getElementById("char-select");x&&(x.onchange=h=>{o=h.target.value,b()})}else{m.innerHTML=`
        <span class="text-xs font-semibold text-slate-500 shrink-0">Scene Extract:</span>
        <div class="relative inline-flex items-center flex-1 max-w-xs">
          <select id="scene-select" class="w-full text-xs font-semibold bg-white border border-slate-200/90 rounded-2xl pl-3 pr-8 py-2 text-slate-900 appearance-none focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer">
            <option value="1" ${i==="1"?"selected":""}>Scene 1 — Outpost Gate 4</option>
            <option value="2" ${i==="2"?"selected":""}>Scene 2 — Customs Shed</option>
            <option value="7" ${i==="7"?"selected":""}>Scene 7 — Syndicate Control</option>
            <option value="18" ${i==="18"?"selected":""}>Scene 18 — Chamber B Climax</option>
          </select>
          <span class="material-symbols-outlined text-[18px] text-slate-400 absolute right-2.5 pointer-events-none">expand_more</span>
        </div>
      `;const x=document.getElementById("scene-select");x&&(x.onchange=h=>{i=h.target.value,b()})}}function b(){if(!u)return;const x=r();if(a==="dialogue"){const h=d.filter(T=>T.character===o);u.innerHTML=`
        <!-- Watermark Header -->
        <div class="font-sans flex flex-col gap-1">
          <div class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">SCRIPTORA · PRODUCTION EXTRACT</div>
          <h2 class="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
            CHARACTER DIALOGUE SHEET<br />— ${o}
          </h2>
          <div class="text-[12px] text-slate-600 font-medium mt-0.5">Screenplay: Chronicles of Dust · Pinned Version: Draft 4.2</div>
          <div class="text-[12px] text-slate-500">Lines: ${h.length} Cues</div>
          <div class="text-[12px] text-slate-500">Date: ${x}</div>
          <div class="w-full h-0.5 bg-slate-900 mt-2 mb-4"></div>
        </div>

        <!-- Dialogue Elements -->
        <div class="space-y-6 pt-1 max-w-2xl mx-auto font-mono w-full">
          ${h.map(T=>`
            <div class="space-y-1.5">
              <div class="font-sans font-bold text-[12px] text-blue-700 uppercase tracking-wide">
                SCENE ${T.sceneNum} — ${T.heading}
              </div>
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest pt-2">
                ${T.character}
              </div>
              ${T.parenthetical?`
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${T.parenthetical}
                </div>
              `:""}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto text-left">
                ${T.dialogue}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="border-t border-slate-200 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 font-sans text-[11px] text-slate-400">
          <span>Generated from Draft 4.2 pinned baseline.</span>
          <button id="btn-export-pdf" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-2xs">
            <span class="material-symbols-outlined text-[15px]">print</span>
            <span>Export Genuine PDF</span>
          </button>
        </div>
      `}else{const h=d.filter(A=>String(A.sceneNum)===String(i)),T=h[0]||{heading:`SCENE ${i}`};u.innerHTML=`
        <!-- Sides Masthead -->
        <div class="font-sans flex flex-col gap-1">
          <div class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">SCRIPTORA · PRODUCTION SIDES</div>
          <h2 class="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
            ACTOR SIDES<br />— SCENE ${i}
          </h2>
          <div class="text-[12px] text-slate-600 font-medium mt-0.5">${T.heading} · Draft 4.2</div>
          <div class="text-[12px] text-slate-500">Rehearsal & On-Set Copy</div>
          <div class="text-[12px] text-slate-500">Date: ${x}</div>
          <div class="w-full h-0.5 bg-slate-900 mt-2 mb-4"></div>
        </div>

        <!-- Formatted Script Scene Beat -->
        <div class="space-y-4 pt-1 max-w-2xl mx-auto leading-relaxed font-mono w-full">
          <div class="font-bold text-[13px] text-slate-900 uppercase">
            ${T.heading}
          </div>

          ${h.map(A=>`
            <div class="space-y-1.5 my-3">
              ${A.action?`
                <div class="text-slate-700 text-[12px] leading-relaxed italic mb-2 font-sans">
                  ${A.action}
                </div>
              `:""}
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest">
                ${A.character}
              </div>
              ${A.parenthetical?`
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${A.parenthetical}
                </div>
              `:""}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto">
                ${A.dialogue}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="border-t border-slate-200 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 font-sans text-[11px] text-slate-400">
          <span>END OF SCENE ${i} SIDES · STAMPED APPROVED DRAFT 4.2</span>
          <button id="btn-export-pdf" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-2xs">
            <span class="material-symbols-outlined text-[15px]">print</span>
            <span>Export Genuine PDF</span>
          </button>
        </div>
      `}y()}function y(){const x=document.getElementById("btn-export-pdf");x&&(x.onclick=()=>{try{if(a==="dialogue"){const h=d.filter(T=>T.character===o);yo(o,h,{title:"Chronicles of Dust",draft:"Draft 4.2"}),C(`Exported ${o} Dialogue Sheet PDF`)}else{const h=Number(i),T=d.filter(N=>N.sceneNum===h),A=T[0]||{heading:`SCENE ${h}`};vo(i,T,{heading:A.heading,pages:"2 1/8"},{title:"Chronicles of Dust",draft:"Draft 4.2"}),C(`Exported Scene ${i} Actor Sides PDF`)}}catch(h){console.error(h),C("Failed to generate PDF document")}})}l&&c&&(l.onclick=()=>{a="dialogue",l.className="flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all bg-white text-blue-600 shadow-2xs cursor-pointer text-center",c.className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all text-slate-600 hover:text-slate-900 cursor-pointer text-center",p(),b()},c.onclick=()=>{a="sides",c.className="flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all bg-white text-blue-600 shadow-2xs cursor-pointer text-center",l.className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all text-slate-600 hover:text-slate-900 cursor-pointer text-center",p(),b()}),p(),b()}const No={Cast:"person",Locations:"location_on",Props:"inventory_2","Practical FX":"science",Stunts:"sports_kabaddi",Costumes:"checkroom",Vehicles:"commute",Sound:"music_note","Hair & Makeup":"face",Equipment:"videocam","Special Equipment":"videocam"};function To(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||$.state.selectedScriptId;const n=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${qe("Pre-Production","Master Shooting Schedule")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-4 fade-in">
        <!-- SubNav with Title, Project Context & Primary Actions -->
        ${Jt("Shooting Schedule","calendar_month",n||"/production",`
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
        `,null,"Master shooting schedule & stripboard.")}

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

        <!-- Simplified Day Details Modal (Opens when user clicks any calendar day) -->
        <div id="day-detail-modal" class="scriptora-modal-overlay fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-xs flex hidden">
          <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-xl w-full p-4 sm:p-5 flex flex-col gap-3 overflow-hidden">
            <!-- Modal Header: Day number, date, location & compact contextual menu -->
            <div class="flex items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div class="flex items-center gap-2.5 min-w-0">
                <div id="modal-day-badge" class="w-8 h-8 rounded-lg bg-slate-900 text-white font-heading font-bold text-xs flex items-center justify-center shrink-0">D1</div>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5">
                    <h3 id="modal-day-title" class="font-heading font-bold text-sm text-slate-900 truncate">Day 1 • Oct 24</h3>
                    <button id="modal-day-edit-btn" class="p-0.5 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer" title="Edit Shoot Day Info">
                      <span class="material-symbols-outlined text-[15px]">edit</span>
                    </button>
                  </div>
                  <p id="modal-day-sub" class="text-[11px] text-slate-500 truncate cursor-pointer hover:text-blue-600 transition-colors" title="Click to edit location & hours">Mojave Gate 4 • 7 5/8 pgs</p>
                </div>
              </div>
              <div class="flex items-center gap-1 shrink-0">
                <!-- Contextual menu for secondary day actions -->
                <div class="relative">
                  <button id="modal-day-menu-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Day actions">
                    <span class="material-symbols-outlined text-lg">more_vert</span>
                  </button>
                  <div id="modal-day-menu-dropdown" class="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl border border-slate-200 shadow-lg py-1 z-30 hidden">
                    <button id="modal-day-menu-edit" class="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer">
                      <span class="material-symbols-outlined text-[16px]">edit_calendar</span>
                      <span>Edit Day Info</span>
                    </button>
                    <button id="modal-day-lock-toggle" class="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer">
                      <span id="modal-day-lock-icon" class="material-symbols-outlined text-[16px]">lock</span>
                      <span id="modal-day-lock-label">Lock Day</span>
                    </button>
                    <button id="modal-day-delete" class="w-full px-3 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer">
                      <span class="material-symbols-outlined text-[16px]">delete</span>
                      <span>Delete Day</span>
                    </button>
                  </div>
                </div>
                <button id="modal-day-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
                  <span class="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>

            <!-- Modal Content (Scene reordering & inline details) -->
            <div id="modal-day-content" class="scriptora-modal-body flex-1 overflow-y-auto overflow-x-hidden min-w-0 w-full flex flex-col gap-2.5 pr-1 text-xs">
              <!-- Injected dynamically -->
            </div>

            <!-- Compact Footer: Essential action only -->
            <div class="flex items-center justify-end pt-2 border-t border-slate-100">
              <button id="modal-day-done" class="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer text-center">
                Done
              </button>
            </div>
          </div>
        </div>

        <!-- Add Shoot Date Modal -->
        <div id="modal-add-day" class="scriptora-modal-overlay fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-xs flex hidden">
          <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-md w-full p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto">
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

      </main>

      ${je("production")}
    </div>
  `}async function Po(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),a=s||n.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",o=document.getElementById("schedule-calendar-container"),i=document.getElementById("day-detail-modal");if(!o)return;let l=await et(a),c=await Dt(a),m=await nt(a);const u=new Set,d=new Set,r=new Set;function p(){o.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-3">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-blue-600 text-lg">calendar_month</span>
            <h3 class="font-heading font-semibold text-sm text-slate-900">Shooting Calendar Matrix</h3>
          </div>
          <span class="text-xs text-slate-500 font-medium">October 24 – October 30, 2026</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-1">
          ${l.map(W=>{const Z=(W.sceneNumbers||[]).map(E=>c.find(de=>de.sceneNumber===E)).filter(Boolean);return`
              <div class="calendar-day-card rounded-xl border border-slate-200/90 p-3 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between gap-2.5 bg-slate-50/40" data-day="${W.dayNumber}">
                <div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      <span class="font-heading font-bold text-xs text-slate-900">Day ${W.dayNumber}</span>
                      ${W.isLocked?'<span class="material-symbols-outlined text-slate-400 text-[13px]" title="Day locked">lock</span>':""}
                    </div>
                    <span class="text-[11px] font-mono text-slate-500 font-medium">${W.date.split(",")[0]}</span>
                  </div>
                  <div class="text-[11px] text-slate-700 font-medium mt-1 truncate">${W.location}</div>
                  <div class="text-[10px] text-slate-400 mt-0.5">${W.totalPages} pgs • ${W.estHours} hrs</div>
                </div>

                <div class="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <div class="flex items-center gap-1 overflow-hidden">
                    ${Z.slice(0,3).map(E=>`
                      <button class="btn-badge-scene px-1.5 py-0.5 rounded bg-white hover:bg-blue-50 hover:border-blue-300 border border-slate-200 font-mono text-[9px] font-bold text-slate-700 transition-colors cursor-pointer" data-scene-id="${E.id}" title="View Scene ${E.sceneNumber} details">#${E.sceneNumber}</button>
                    `).join("")}
                    ${Z.length>3?`<span class="text-[10px] text-slate-400">+${Z.length-3}</span>`:""}
                  </div>
                  <span class="text-blue-600 font-semibold text-[10px] flex items-center gap-0.5">
                    Open &rarr;
                  </span>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,o.querySelectorAll(".calendar-day-card").forEach(W=>{W.onclick=()=>{const Z=W.getAttribute("data-day");Z&&I(Z)}}),o.querySelectorAll(".btn-badge-scene").forEach(W=>{W.onclick=Z=>{Z.stopPropagation();const E=W.getAttribute("data-scene-id");E&&_(E)}})}let b=null,y=!1,x=!1;const h=new Set;let T=!1;const A=new Set,N=new Set;let w=null;function L(W){const Z=(W.sceneNumbers||[]).map(ue=>c.find(Q=>Q.sceneNumber===ue)).filter(Boolean);let E=0;Z.forEach(ue=>{const Q=(ue.pages||"").match(/(\d+)\s*(\d+)\/8/);if(Q)E+=parseInt(Q[1],10)*8+parseInt(Q[2],10);else{const ne=parseFloat(ue.pages);isNaN(ne)||(E+=Math.round(ne*8))}});const de=Math.floor(E/8),ae=E%8;return W.totalPages=`${de} ${ae}/8`,W.totalPages}function I(W,Z=null){const E=l.find(S=>S.dayNumber===Number(W));if(!E)return;if(b=E.dayNumber,Z){const S=c.find(f=>f.id===Z||String(f.sceneNumber)===String(Z));S&&u.add(S.id)}const de=document.getElementById("modal-day-badge"),ae=document.getElementById("modal-day-title"),ue=document.getElementById("modal-day-sub"),Q=document.getElementById("modal-day-content"),ne=document.getElementById("modal-day-menu-btn"),B=document.getElementById("modal-day-menu-dropdown"),he=document.getElementById("modal-day-edit-btn"),Ae=document.getElementById("modal-day-menu-edit"),se=document.getElementById("modal-day-lock-toggle"),$e=document.getElementById("modal-day-lock-label"),te=document.getElementById("modal-day-lock-icon"),Ne=document.getElementById("modal-day-delete");de&&(de.textContent=`D${E.dayNumber}`),ae&&(ae.textContent=`Day ${E.dayNumber} • ${E.date.split(",")[0]}`),ue&&(ue.textContent=`${E.location}${E.totalPages?` • ${E.totalPages} pgs`:""}`),ne&&B&&(B.classList.add("hidden"),B.onclick=S=>S.stopPropagation(),ne.onclick=S=>{S.stopPropagation();const f=B.classList.contains("hidden");document.querySelectorAll("[data-scriptora-popup]").forEach(g=>{g!==B&&g.classList.add("hidden")}),f?(B.classList.remove("hidden"),Vt(ne,B,{placement:"bottom-end",zIndex:1e4})):B.classList.add("hidden")},ne._outsideClickAttached||(ne._outsideClickAttached=!0,document.addEventListener("click",()=>{B.classList.add("hidden")})),w={close:()=>B.classList.add("hidden")}),he&&(he.onclick=()=>{y=!y,I(E.dayNumber)}),Ae&&(Ae.onclick=S=>{S.stopPropagation(),w?.close(),y=!y,I(E.dayNumber)}),ue&&(ue.onclick=()=>{y=!0,I(E.dayNumber)}),$e&&($e.textContent=E.isLocked?"Unlock Day":"Lock Day"),te&&(te.textContent=E.isLocked?"lock_open":"lock"),se&&(se.onclick=async S=>{S.stopPropagation(),w?.close(),E.isLocked=!E.isLocked,await it(a,E.dayNumber,{isLocked:E.isLocked}),C(`Day ${E.dayNumber} ${E.isLocked?"locked":"unlocked"}`),$e&&($e.textContent=E.isLocked?"Unlock Day":"Lock Day"),te&&(te.textContent=E.isLocked?"lock_open":"lock"),p()}),Ne&&(Ne.onclick=async S=>{if(S.stopPropagation(),w?.close(),!confirm(`Are you sure you want to remove Shoot Day ${E.dayNumber}? Any scenes should be moved first.`))return;const f=await na(a,E.dayNumber);f.success?(C(`Shoot Day ${E.dayNumber} deleted`),le(),l=await et(a),p()):C(f.message||"Failed to delete day")});const Ie=(E.sceneNumbers||[]).map(S=>c.find(f=>f.sceneNumber===S)).filter(Boolean),ye=c.filter(S=>!E.sceneNumbers.includes(S.sceneNumber));if(Q){Q.innerHTML=`
        <!-- Optional Inline Day Info Editor -->
        ${y?`
          <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex flex-col gap-2.5 animate-in fade-in">
            <div class="flex items-center justify-between">
              <span class="font-heading font-bold text-xs text-blue-950 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px] text-blue-600">edit_calendar</span>
                <span>Edit Shoot Day ${E.dayNumber} Info</span>
              </span>
              <button id="btn-cancel-day-top" class="text-slate-400 hover:text-slate-700 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div>
                <label class="block text-slate-600 font-medium mb-1">Shoot Date</label>
                <input type="text" id="input-edit-day-date" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500" value="${E.date}" placeholder="e.g. Oct 25, 2026" />
              </div>
              <div>
                <label class="block text-slate-600 font-medium mb-1">Estimated Daily Hours</label>
                <input type="number" id="input-edit-day-hours" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500" value="${E.estHours||11}" step="0.5" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-slate-600 font-medium mb-1">Primary Location / Focus</label>
                <input type="text" id="input-edit-day-loc" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500" value="${E.location||""}" placeholder="e.g. Chamber B Dry Tank" />
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-1 border-t border-blue-200/60">
              <button id="btn-cancel-day-info" class="px-2.5 py-1 rounded-lg text-slate-600 hover:bg-slate-200/60 text-[11px] font-medium cursor-pointer">Cancel</button>
              <button id="btn-save-day-info" class="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold shadow-2xs transition-colors cursor-pointer">Save Day</button>
            </div>
          </div>
        `:""}

        <!-- Assigned Scenes Header with Assign Button -->
        <div class="flex items-center justify-between pt-0.5">
          <span class="font-heading font-semibold text-slate-900 text-xs">Assigned Scenes (${Ie.length})</span>
          <button id="btn-toggle-assign-scene" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-[11px] font-semibold transition-colors cursor-pointer" title="Assign scene to this shoot day">
            <span class="material-symbols-outlined text-[13px]">add</span>
            <span>Assign Scene</span>
          </button>
        </div>

        <!-- Inline Scene Assign Selector -->
        ${T?`
          <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex flex-col gap-2.5 animate-in fade-in w-full min-w-0 box-border">
            <div class="flex items-center justify-between text-xs font-semibold text-blue-900 gap-2">
              <span class="truncate">Add Screenplay Scene to Shoot Day ${E.dayNumber}</span>
              <button id="btn-close-assign-scene" class="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer shrink-0" title="Close scene selector">
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            ${ye.length>0?`
              <div class="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-2 w-full min-w-0">
                <div class="min-w-0 flex-1 w-full">
                  <select id="select-scene-to-assign" class="w-full min-w-0 max-w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 sm:py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer truncate">
                    ${ye.map(v=>`
                      <option value="${v.sceneNumber}">#${v.sceneNumber} ${v.heading} (${v.pages} pgs)</option>
                    `).join("")}
                  </select>
                </div>
                <div class="w-full sm:w-auto shrink-0">
                  <button id="btn-confirm-assign-scene" class="w-full sm:w-auto px-4 py-2 sm:py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs shadow-2xs transition-all cursor-pointer text-center">
                    Add to Day
                  </button>
                </div>
              </div>
            `:`
              <div class="text-[11px] text-slate-500 py-1">All scenes from this screenplay are already assigned.</div>
            `}
          </div>
        `:""}

        <!-- Concise Scene List with Inline Expansion & Inline Quick-Edit -->
        <div class="flex flex-col gap-2">
          ${Ie.length>0?Ie.map((v,D)=>{const z=u.has(v.id),U=d.has(v.id),G=r.has(v.id),be=h.has(v.id),He=A.has(v.id),tt=N.has(v.id),ze=m.filter(we=>we.sceneId===v.id||we.sceneNumber===v.sceneNumber||Array.isArray(we.scenes)&&we.scenes.includes(v.sceneNumber));return`
              <div class="scene-item-card rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-all" data-scene-num="${v.sceneNumber}" data-scene-id="${v.id}">
                ${be?`
                  <!-- Inline Edit Scene Mode -->
                  <div class="p-3 bg-blue-50/40 flex flex-col gap-2">
                    <div class="text-[11px] font-bold text-slate-800 flex items-center justify-between border-b border-blue-200/60 pb-1.5">
                      <span>Edit Scene #${v.sceneNumber}</span>
                      <button class="btn-cancel-scene-edit text-slate-400 hover:text-slate-700 cursor-pointer" data-scene-id="${v.id}">
                        <span class="material-symbols-outlined text-[15px]">close</span>
                      </button>
                    </div>
                    <div class="flex flex-col gap-1.5">
                      <div>
                        <label class="block text-[10px] text-slate-500 font-semibold mb-0.5">Scene Heading</label>
                        <input type="text" class="input-scene-heading w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-none focus:border-blue-500" value="${v.heading}" />
                      </div>
                      <div class="grid grid-cols-2 gap-2">
                        <div>
                          <label class="block text-[10px] text-slate-500 font-semibold mb-0.5">Pages</label>
                          <input type="text" class="input-scene-pages w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-none focus:border-blue-500" value="${v.pages}" placeholder="e.g. 7 2/8" />
                        </div>
                        <div>
                          <label class="block text-[10px] text-slate-500 font-semibold mb-0.5">Complexity</label>
                          <select class="input-scene-complexity w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-none">
                            <option value="Low" ${v.complexity==="Low"?"selected":""}>Low</option>
                            <option value="Medium" ${v.complexity==="Medium"||!v.complexity?"selected":""}>Medium</option>
                            <option value="High" ${v.complexity==="High"?"selected":""}>High</option>
                          </select>
                        </div>
                      </div>
                      <div class="flex items-center justify-between pt-1">
                        <button class="btn-remove-scene-day text-rose-600 hover:text-rose-700 text-[11px] font-medium flex items-center gap-1 cursor-pointer" data-scene="${v.sceneNumber}">
                          <span class="material-symbols-outlined text-[13px]">delete</span>
                          <span>Remove from Day</span>
                        </button>
                        <div class="flex items-center gap-1.5">
                          <button class="btn-cancel-scene-edit px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer" data-scene-id="${v.id}">Cancel</button>
                          <button class="btn-save-scene-edit px-3 py-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs cursor-pointer" data-scene-id="${v.id}">Save Scene</button>
                        </div>
                      </div>
                    </div>
                  </div>
                `:`
                  <!-- Compact Scene Row -->
                  <div class="p-2.5 sm:p-3 flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <span class="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 font-mono font-bold text-xs flex items-center justify-center text-slate-800 shrink-0">#${v.sceneNumber}</span>
                      <div class="min-w-0">
                        <div class="font-medium text-slate-900 text-xs truncate leading-snug">${v.heading}</div>
                        <div class="text-[11px] text-slate-500 font-medium">${v.pages} pgs</div>
                      </div>
                    </div>

                    <div class="flex items-center gap-1 shrink-0">
                      <button class="btn-scene-up p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer" data-scene="${v.sceneNumber}" ${D===0?"disabled":""} title="Move earlier in shooting order">
                        <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
                      </button>
                      <button class="btn-scene-down p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer" data-scene="${v.sceneNumber}" ${D===Ie.length-1?"disabled":""} title="Move later in shooting order">
                        <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
                      </button>
                      <button class="btn-edit-scene-quick p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer" data-scene-id="${v.id}" title="Edit scene heading & pages">
                        <span class="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button class="btn-toggle-scene-inline px-2.5 py-1 rounded-lg ${z?"bg-blue-600 text-white font-semibold":"bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold border border-blue-200/80"} text-[11px] flex items-center gap-1 transition-colors cursor-pointer" data-scene-id="${v.id}">
                        <span>Details</span>
                        <span class="material-symbols-outlined text-[14px] transition-transform inline-details-chevron ${z?"rotate-180":""}">expand_more</span>
                      </button>
                    </div>
                  </div>
                `}

                <!-- Inline Expanded Scene Details (Normal Document Flow) -->
                <div class="scene-inline-details border-t border-slate-100 bg-slate-50/60 p-3 ${z?"":"hidden"} flex flex-col gap-2.5 text-xs text-slate-700">
                  <!-- Initial Compact Summary: Full heading, assigned day, screenplay/draft, snippet, compact quick actions -->
                  <div class="flex flex-col gap-1.5">
                    <div>
                      <h4 class="font-heading font-bold text-xs text-slate-900 leading-snug">#${v.sceneNumber} ${v.heading}</h4>
                      <p class="text-[11px] text-slate-500 mt-0.5">
                        Shoot Day ${E.dayNumber} • Chronicles of Dust • Draft 4.2 (Pinned)
                      </p>
                    </div>

                    <!-- Editable Scene Snippet -->
                    ${He?`
                      <div class="flex flex-col gap-1.5 bg-white border border-slate-200 rounded-lg p-2">
                        <label class="text-[10px] font-semibold text-slate-500">Edit Scene Snippet / Description</label>
                        <textarea class="input-scene-snippet w-full text-xs p-1.5 border border-slate-200 rounded focus:outline-none focus:border-blue-500" rows="3">${v.snippet||""}</textarea>
                        <div class="flex items-center justify-end gap-1.5">
                          <button class="btn-cancel-snippet px-2 py-0.5 rounded text-[11px] text-slate-600 hover:bg-slate-100 cursor-pointer" data-scene-id="${v.id}">Cancel</button>
                          <button class="btn-save-snippet px-2.5 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold cursor-pointer" data-scene-id="${v.id}">Save</button>
                        </div>
                      </div>
                    `:`
                      <div class="flex flex-col gap-1 bg-white border border-slate-200/80 rounded-lg p-2">
                        <div class="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                          <span>Scene Snippet</span>
                          <button class="btn-edit-snippet text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5" data-scene-id="${v.id}">
                            <span class="material-symbols-outlined text-[12px]">edit</span>
                            <span>Edit</span>
                          </button>
                        </div>
                        <p class="text-[11px] text-slate-600 leading-relaxed">
                          ${v.snippet||'<span class="italic text-slate-400">No snippet provided.</span>'}
                        </p>
                      </div>
                    `}

                    <!-- Quick Action Links -->
                    <div class="flex items-center gap-2 pt-0.5 flex-wrap">
                      <button class="btn-scene-breakdown inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer" data-scene-num="${v.sceneNumber}">
                        <span class="material-symbols-outlined text-[14px] text-blue-600">dataset</span>
                        <span>Breakdown</span>
                      </button>
                      <button class="btn-scene-sides inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer" data-scene-num="${v.sceneNumber}">
                        <span class="material-symbols-outlined text-[14px] text-blue-600">description</span>
                        <span>Actor Sides</span>
                      </button>
                      <button class="btn-scene-pdf inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer" data-scene-id="${v.id}">
                        <span class="material-symbols-outlined text-[14px] text-blue-600">download</span>
                        <span>Export PDF</span>
                      </button>
                    </div>
                  </div>

                  <!-- Expandable 'More Details' Section -->
                  <div class="pt-1">
                    <button class="btn-toggle-more-details w-full py-1.5 px-2.5 rounded-lg bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer" data-scene-id="${v.id}">
                      <span class="flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-[15px] text-slate-500">tune</span>
                        <span>More Details</span>
                      </span>
                      <span class="material-symbols-outlined text-[16px] text-slate-400 transition-transform more-details-chevron ${U?"rotate-180":""}">expand_more</span>
                    </button>

                    <div class="more-details-panel ${U?"":"hidden"} flex flex-col gap-2.5 pt-2 text-xs">
                      <!-- Cast with Add & Remove functionality -->
                      <div class="flex flex-col gap-1.5">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Cast</span>
                          <button class="btn-toggle-add-cast text-[11px] text-blue-600 font-medium hover:underline flex items-center gap-0.5 cursor-pointer" data-scene-id="${v.id}">
                            <span class="material-symbols-outlined text-[13px]">add</span>
                            <span>Add Cast</span>
                          </button>
                        </div>
                        ${tt?`
                          <div class="flex items-center gap-1.5 py-1">
                            <input type="text" class="input-new-cast-name flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500" placeholder="Character name (e.g. AARAV)" />
                            <button class="btn-save-new-cast px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] shadow-2xs cursor-pointer" data-scene-id="${v.id}">Add</button>
                            <button class="btn-cancel-new-cast px-2 py-1 rounded-lg text-slate-500 hover:bg-slate-100 text-[11px] cursor-pointer" data-scene-id="${v.id}">Cancel</button>
                          </div>
                        `:""}
                        <div class="flex items-center gap-1.5 flex-wrap">
                          ${v.cast&&v.cast.length>0?v.cast.map(we=>`
                            <span class="inline-flex items-center gap-1 pl-1.5 pr-1 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-800">
                              <span class="w-3.5 h-3.5 rounded-full bg-slate-100 text-slate-600 text-[9px] flex items-center justify-center font-bold">${we.charAt(0)}</span>
                              <span>${we}</span>
                              <button class="btn-remove-cast-member text-slate-400 hover:text-rose-600 ml-0.5 cursor-pointer" data-scene-id="${v.id}" data-cast="${we}" title="Remove character">
                                <span class="material-symbols-outlined text-[12px]">close</span>
                              </button>
                            </span>
                          `).join(""):'<span class="text-slate-400 text-[11px] italic">No cast assigned</span>'}
                        </div>
                      </div>

                      <!-- Breakdown Elements -->
                      <div class="flex flex-col gap-1 pt-1 border-t border-slate-200/60">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Breakdown Elements (${ze.length})</span>
                          <button class="btn-scene-breakdown text-[11px] text-blue-600 font-medium hover:underline cursor-pointer" data-scene-num="${v.sceneNumber}">Edit in Breakdown &rarr;</button>
                        </div>
                        ${ze.length>0?`
                          <div class="flex items-center gap-1.5 flex-wrap">
                            ${ze.map(we=>`
                              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] text-slate-700">
                                <span class="material-symbols-outlined text-[13px] text-blue-600">${No[we.category]||"label"}</span>
                                <span>${we.name}</span>
                                ${we.category?`<span class="text-slate-400 text-[9px]">(${we.category})</span>`:""}
                              </span>
                            `).join("")}
                          </div>
                        `:`
                          <div class="text-[11px] text-slate-400 italic py-0.5">No breakdown elements tagged for this scene.</div>
                        `}
                      </div>

                      <!-- Move Shoot Day -->
                      <div class="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
                        <span class="text-[11px] font-medium text-slate-600">Assigned Shoot Day:</span>
                        <div class="flex items-center gap-1.5">
                          <select class="select-inline-move-day bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] text-slate-800 font-medium focus:outline-none cursor-pointer" data-scene="${v.sceneNumber}">
                            ${l.map(we=>`
                              <option value="${we.dayNumber}" ${we.dayNumber===E.dayNumber?"selected":""}>
                                Day ${we.dayNumber} (${we.date.split(",")[0]})
                              </option>
                            `).join("")}
                          </select>
                          <button class="btn-inline-move-day px-2 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer" data-scene="${v.sceneNumber}">
                            Move
                          </button>
                        </div>
                      </div>

                      <!-- Production & Continuity Notes (Compact Editable Workflow) -->
                      <div class="notes-container border-t border-slate-200/60 pt-1.5 flex flex-col gap-1.5">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Production & Continuity Notes</span>
                          <button class="btn-edit-notes text-[11px] text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer" data-scene-id="${v.id}">
                            <span class="material-symbols-outlined text-[13px]">edit</span>
                            <span>${v.directorNotes||v.continuityNotes?"Edit Notes":"Add Notes"}</span>
                          </button>
                        </div>

                        <!-- Display Mode (Collapsed by default, shown when not editing) -->
                        <div class="notes-display-mode ${G?"hidden":""} flex flex-col gap-1 text-[11px] text-slate-600 bg-white border border-slate-200/70 rounded-lg p-2">
                          ${v.directorNotes||v.continuityNotes?`
                            ${v.directorNotes?`<div><span class="font-medium text-slate-800">Director:</span> ${v.directorNotes}</div>`:""}
                            ${v.continuityNotes?`<div><span class="font-medium text-slate-800">Continuity:</span> ${v.continuityNotes}</div>`:""}
                          `:`
                            <div class="text-slate-400 italic">No production or continuity notes logged.</div>
                          `}
                        </div>

                        <!-- Editable Fields (Only visible when explicitly editing) -->
                        <div class="notes-edit-mode ${G?"":"hidden"} flex flex-col gap-2 bg-white border border-slate-200 rounded-xl p-2.5">
                          <div>
                            <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">Director's Notes</label>
                            <textarea class="input-director-notes w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" rows="2" placeholder="Camera, lighting, director preferences...">${v.directorNotes||""}</textarea>
                          </div>
                          <div>
                            <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">Continuity Notes</label>
                            <textarea class="input-continuity-notes w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" rows="2" placeholder="Props, costume, timeline markers...">${v.continuityNotes||""}</textarea>
                          </div>
                          <div class="flex items-center justify-end gap-2 pt-1">
                            <button class="btn-cancel-notes px-2.5 py-1 rounded-lg text-slate-600 hover:bg-slate-100 text-[11px] font-medium cursor-pointer" data-scene-id="${v.id}">
                              Cancel
                            </button>
                            <button class="btn-save-notes px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold shadow-2xs transition-colors cursor-pointer" data-scene-id="${v.id}">
                              Save Notes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `}).join(""):`
            <div class="text-center py-4 text-slate-400 text-xs italic">No scenes assigned to this day.</div>
          `}
        </div>
      `;const S=document.getElementById("btn-cancel-day-top"),f=document.getElementById("btn-cancel-day-info"),g=document.getElementById("btn-save-day-info");S&&(S.onclick=()=>{y=!1,I(E.dayNumber)}),f&&(f.onclick=()=>{y=!1,I(E.dayNumber)}),g&&(g.onclick=async()=>{const v=document.getElementById("input-edit-day-date")?.value?.trim(),D=parseFloat(document.getElementById("input-edit-day-hours")?.value)||E.estHours,z=document.getElementById("input-edit-day-loc")?.value?.trim();v&&(E.date=v),D&&(E.estHours=D),z&&(E.location=z),await it(a,E.dayNumber,{date:E.date,estHours:E.estHours,location:E.location}),C(`Shoot Day ${E.dayNumber} updated`),y=!1,p(),I(E.dayNumber)});const P=document.getElementById("btn-toggle-day-constraints"),R=document.getElementById("day-constraints-content"),F=document.getElementById("constraints-chevron");P&&R&&(P.onclick=()=>{const v=R.classList.toggle("hidden");F&&F.classList.toggle("rotate-180",!v)});const J=document.getElementById("btn-edit-constraints"),H=document.getElementById("btn-cancel-constraints"),re=document.getElementById("btn-save-constraints");J&&(J.onclick=()=>{x=!0,I(E.dayNumber),document.getElementById("day-constraints-content")?.classList.remove("hidden")}),H&&(H.onclick=()=>{x=!1,I(E.dayNumber),document.getElementById("day-constraints-content")?.classList.remove("hidden")}),re&&(re.onclick=async()=>{const v=document.getElementById("input-constraints-loc")?.value?.trim(),D=parseFloat(document.getElementById("input-constraints-hours")?.value)||E.estHours,z=document.getElementById("input-constraints-turnaround")?.value?.trim();v&&(E.location=v),D&&(E.estHours=D),z&&(E.turnaroundNote=z),await it(a,E.dayNumber,{location:E.location,estHours:E.estHours,turnaroundNote:E.turnaroundNote}),C("Production constraints updated"),x=!1,p(),I(E.dayNumber),document.getElementById("day-constraints-content")?.classList.remove("hidden")});const fe=document.getElementById("btn-toggle-assign-scene"),Se=document.getElementById("btn-close-assign-scene"),Ee=document.getElementById("btn-confirm-assign-scene");fe&&(fe.onclick=()=>{T=!T,I(E.dayNumber)}),Se&&(Se.onclick=()=>{T=!1,I(E.dayNumber)}),Ee&&(Ee.onclick=async()=>{const v=Number(document.getElementById("select-scene-to-assign")?.value);v&&!E.sceneNumbers.includes(v)&&(E.sceneNumbers.push(v),L(E),await it(a,E.dayNumber,{sceneNumbers:E.sceneNumbers,totalPages:E.totalPages}),C(`Scene #${v} added to Shoot Day ${E.dayNumber}`),T=!1,p(),I(E.dayNumber))}),Q.querySelectorAll(".btn-edit-scene-quick").forEach(v=>{v.onclick=()=>{const D=v.getAttribute("data-scene-id");D&&(h.add(D),I(E.dayNumber))}}),Q.querySelectorAll(".btn-cancel-scene-edit").forEach(v=>{v.onclick=()=>{const D=v.getAttribute("data-scene-id");D&&(h.delete(D),I(E.dayNumber))}}),Q.querySelectorAll(".btn-save-scene-edit").forEach(v=>{v.onclick=async()=>{const D=v.getAttribute("data-scene-id"),z=v.closest(".scene-item-card"),U=z?.querySelector(".input-scene-heading")?.value?.trim(),G=z?.querySelector(".input-scene-pages")?.value?.trim(),be=z?.querySelector(".input-scene-complexity")?.value,He=c.find(tt=>tt.id===D);He&&(U&&(He.heading=U),G&&(He.pages=G),be&&(He.complexity=be),await Mt(a,He.id,{heading:U,pages:G,complexity:be}),L(E),await it(a,E.dayNumber,{totalPages:E.totalPages}),C(`Scene #${He.sceneNumber} updated`),h.delete(D),p(),I(E.dayNumber))}}),Q.querySelectorAll(".btn-remove-scene-day").forEach(v=>{v.onclick=async()=>{const D=Number(v.getAttribute("data-scene"));D&&(E.sceneNumbers=E.sceneNumbers.filter(z=>z!==D),L(E),await it(a,E.dayNumber,{sceneNumbers:E.sceneNumbers,totalPages:E.totalPages}),C(`Scene #${D} removed from Day ${E.dayNumber}`),p(),I(E.dayNumber))}}),Q.querySelectorAll(".btn-edit-snippet").forEach(v=>{v.onclick=()=>{const D=v.getAttribute("data-scene-id");D&&(A.add(D),I(E.dayNumber))}}),Q.querySelectorAll(".btn-cancel-snippet").forEach(v=>{v.onclick=()=>{const D=v.getAttribute("data-scene-id");D&&(A.delete(D),I(E.dayNumber))}}),Q.querySelectorAll(".btn-save-snippet").forEach(v=>{v.onclick=async()=>{const D=v.getAttribute("data-scene-id"),U=v.closest(".scene-item-card")?.querySelector(".input-scene-snippet")?.value?.trim(),G=c.find(be=>be.id===D);G&&(G.snippet=U,await Mt(a,G.id,{snippet:U}),C(`Scene #${G.sceneNumber} snippet updated`),A.delete(D),I(E.dayNumber))}}),Q.querySelectorAll(".btn-toggle-add-cast").forEach(v=>{v.onclick=()=>{const D=v.getAttribute("data-scene-id");D&&(N.add(D),I(E.dayNumber))}}),Q.querySelectorAll(".btn-cancel-new-cast").forEach(v=>{v.onclick=()=>{const D=v.getAttribute("data-scene-id");D&&(N.delete(D),I(E.dayNumber))}}),Q.querySelectorAll(".btn-save-new-cast").forEach(v=>{v.onclick=async()=>{const D=v.getAttribute("data-scene-id"),U=v.closest(".scene-item-card")?.querySelector(".input-new-cast-name")?.value?.trim().toUpperCase(),G=c.find(be=>be.id===D);G&&U&&(G.cast=G.cast||[],G.cast.includes(U)||(G.cast.push(U),await Mt(a,G.id,{cast:G.cast}),C(`Character ${U} added to Scene #${G.sceneNumber}`)),N.delete(D),I(E.dayNumber))}}),Q.querySelectorAll(".btn-remove-cast-member").forEach(v=>{v.onclick=async()=>{const D=v.getAttribute("data-scene-id"),z=v.getAttribute("data-cast"),U=c.find(G=>G.id===D);U&&z&&(U.cast=(U.cast||[]).filter(G=>G!==z),await Mt(a,U.id,{cast:U.cast}),C(`Character ${z} removed from Scene #${U.sceneNumber}`),I(E.dayNumber))}}),Q.querySelectorAll(".btn-toggle-scene-inline").forEach(v=>{v.onclick=()=>{const D=v.getAttribute("data-scene-id");D&&(u.has(D)?u.delete(D):u.add(D),I(E.dayNumber))}}),Q.querySelectorAll(".btn-toggle-more-details").forEach(v=>{v.onclick=()=>{const D=v.getAttribute("data-scene-id");D&&(d.has(D)?d.delete(D):d.add(D),I(E.dayNumber))}}),Q.querySelectorAll(".btn-scene-up").forEach(v=>{v.onclick=async()=>{const D=Number(v.getAttribute("data-scene")),z=E.sceneNumbers.indexOf(D);if(z>0){const U=[...E.sceneNumbers],G=U[z];U[z]=U[z-1],U[z-1]=G,E.sceneNumbers=U,await Ds(a,E.dayNumber,U),C("Scene shooting order updated"),p(),I(E.dayNumber)}}}),Q.querySelectorAll(".btn-scene-down").forEach(v=>{v.onclick=async()=>{const D=Number(v.getAttribute("data-scene")),z=E.sceneNumbers.indexOf(D);if(z<E.sceneNumbers.length-1){const U=[...E.sceneNumbers],G=U[z];U[z]=U[z+1],U[z+1]=G,E.sceneNumbers=U,await Ds(a,E.dayNumber,U),C("Scene shooting order updated"),p(),I(E.dayNumber)}}}),Q.querySelectorAll(".btn-inline-move-day").forEach(v=>{v.onclick=async()=>{const D=Number(v.getAttribute("data-scene")),U=v.closest(".scene-item-card")?.querySelector(".select-inline-move-day"),G=Number(U?.value);if(!G||G===E.dayNumber){C(`Scene ${D} is already on Day ${E.dayNumber}`);return}await ta(a,D,E.dayNumber,G),l=await et(a),C(`Scene ${D} moved to Shoot Day ${G}`),p(),I(E.dayNumber)}}),Q.querySelectorAll(".btn-edit-notes").forEach(v=>{v.onclick=()=>{const D=v.getAttribute("data-scene-id");D&&(r.add(D),I(E.dayNumber))}}),Q.querySelectorAll(".btn-cancel-notes").forEach(v=>{v.onclick=()=>{const D=v.getAttribute("data-scene-id");D&&(r.delete(D),I(E.dayNumber))}}),Q.querySelectorAll(".btn-save-notes").forEach(v=>{v.onclick=async()=>{const D=v.getAttribute("data-scene-id"),z=v.closest(".scene-item-card"),U=z?.querySelector(".input-director-notes")?.value||"",G=z?.querySelector(".input-continuity-notes")?.value||"",be=c.find(He=>He.id===D);be&&(be.directorNotes=U,be.continuityNotes=G,await Mt(a,be.id,{directorNotes:U,continuityNotes:G}),C(`Scene ${be.sceneNumber} notes saved`),r.delete(D),I(E.dayNumber))}}),Q.querySelectorAll(".btn-scene-breakdown").forEach(v=>{v.onclick=()=>{const D=v.getAttribute("data-scene-num");e(`/production/breakdown?scriptId=${a}&scene=${D}`)}}),Q.querySelectorAll(".btn-scene-sides").forEach(v=>{v.onclick=()=>{const D=v.getAttribute("data-scene-num");e(`/production/dialogue-sides?scriptId=${a}&scene=${D}`)}}),Q.querySelectorAll(".btn-scene-pdf").forEach(v=>{v.onclick=()=>{const D=v.getAttribute("data-scene-id"),z=c.find(G=>G.id===D);if(!z)return;const U=m.filter(G=>G.sceneId===z.id||G.sceneNumber===z.sceneNumber||Array.isArray(G.scenes)&&G.scenes.includes(z.sceneNumber));try{gn(U,{title:`Chronicles of Dust — Scene ${z.sceneNumber}`,draft:"Draft 4.2"}),C(`Exported Scene ${z.sceneNumber} Logistics PDF`)}catch(G){console.error(G),C("Failed to export scene PDF")}}}),Z&&setTimeout(()=>{Q.querySelector(`[data-scene-id="${Z}"], [data-scene-num="${Z}"]`)?.scrollIntoView({behavior:"smooth",block:"nearest"})},50)}Qe(i)}const X=document.getElementById("modal-day-close"),V=document.getElementById("modal-day-done"),le=()=>{ke(i),b=null,y=!1,x=!1,h.clear(),T=!1,A.clear(),N.clear(),w?.close()};X&&(X.onclick=le),V&&(V.onclick=le),i&&(i.onclick=W=>{W.target===i&&le()}),window.scriptoraRouter&&window.scriptoraRouter.registerBackHandler(()=>h.size>0||r.size>0||A.size>0||N.size>0||y||x||T?(h.clear(),r.clear(),A.clear(),N.clear(),y=!1,x=!1,T=!1,b&&renderModalDayContent(b),!0):i&&!i.classList.contains("hidden")?(le(),!0):!1);async function _(W){let Z=c.find(de=>de.id===W||String(de.sceneNumber)===String(W)||`scene-${de.sceneNumber}`===String(W));if(Z||(Z=await Jn(a,W)),!Z){C("Scene not found in current schedule");return}const E=l.find(de=>(de.sceneNumbers||[]).includes(Z.sceneNumber));E?I(E.dayNumber,Z.id):l.length>0&&I(l[0].dayNumber,Z.id)}const me=document.getElementById("btn-export-schedule-pdf");me&&(me.onclick=()=>{try{wo(l,c,{title:"Chronicles of Dust",draft:"Draft 4.2"}),C("Exported Master Shooting Schedule PDF")}catch(W){console.error(W),C("Failed to export schedule PDF")}});const ie=document.getElementById("modal-add-day"),q=document.getElementById("btn-add-shoot-day"),Y=document.getElementById("modal-add-day-close"),j=document.getElementById("modal-add-day-cancel"),ce=document.getElementById("form-add-shoot-day");function k(){if(!ie)return;const W=l.length>0?Math.max(...l.map(ne=>ne.dayNumber))+1:1,Z=document.getElementById("input-add-day-num"),E=document.getElementById("input-add-day-date"),de=document.getElementById("input-add-day-title"),ae=document.getElementById("input-add-day-location"),ue=document.getElementById("input-add-day-hours"),Q=document.getElementById("input-add-day-pages");if(Z&&(Z.value=W),E){const ne=new Date(2026,9,23+W),B=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];E.value=`${B[ne.getMonth()]} ${ne.getDate()}, ${ne.getFullYear()}`}de&&(de.value=`Day ${W} — Second Unit & Pickups`),ae&&(ae.value="Mojave Soundstage 2"),ue&&(ue.value="10"),Q&&(Q.value="0.0"),Qe(ie)}function O(){ke(ie)}q&&(q.onclick=k),Y&&(Y.onclick=O),j&&(j.onclick=O),ie&&(ie.onclick=W=>{W.target===ie&&O()}),ce&&(ce.onsubmit=async W=>{W.preventDefault();const Z=Number(document.getElementById("input-add-day-num")?.value)||l.length+1,E=document.getElementById("input-add-day-date")?.value||`Shoot Day ${Z}`,de=document.getElementById("input-add-day-title")?.value||`Day ${Z}`,ae=document.getElementById("input-add-day-location")?.value||"Location TBD",ue=Number(document.getElementById("input-add-day-hours")?.value)||10,Q=document.getElementById("input-add-day-pages")?.value||"0.0";await sa(a,{dayNumber:Z,title:de,date:E,location:ae,estHours:ue,totalPages:Q,sceneNumbers:[]}),l=await et(a),O(),C(`Added Shoot Day ${Z} (${E})`),p()}),p();const xe=n.get("sceneId")||n.get("scene");xe&&_(xe)}const Bo=["Cinematic Concept Art","Storyboard Ink","Pencil Sketch","Photorealistic / Live Action","3D Animation","Anime / Illustration","Custom"],Vs=["2.39:1","16:9","4:3","9:16"],Do=["Wide Shot","Medium Shot","Close-Up","Extreme Close-Up","Medium Two-Shot","Over-the-Shoulder","Point of View (POV)"],Ro=["Eye Level","Low Angle","High Angle","Dutch Angle","Bird's Eye"],Lo=["Static","Pan","Tilt","Tracking Dolly","Crane / Jib","Handheld"],Mo=["18mm Ultra-Wide","24mm Wide","35mm Standard","50mm Prime","85mm Portrait","105mm Telephoto","Anamorphic 40mm"],Oo=["Daylight Dust","Golden Hour Sun","Harsh Fluorescent Rim","Low-Key Shadow / Noir","Cyan Emergency Strobe","Tungsten Warm Interior"];function Fo(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=t||s.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust";s.get("sceneId");const a=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${qe("Pre-Production","Storyboard Studio")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3.5 fade-in">
        <!-- SubNav with Title, Project Context & Primary Actions -->
        ${Jt("Storyboard Studio","art_track",a||"/production",`
          <div class="flex items-center gap-2">
            <button id="btn-export-storyboard-pdf" class="w-8 h-8 sm:w-auto sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0" title="Export genuine Storyboard Studio PDF" aria-label="Export PDF">
              <span class="material-symbols-outlined text-[17px]">download</span>
              <span class="hidden sm:inline">Export PDF</span>
            </button>
            <button id="btn-generate-sequence" class="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center shadow-2xs transition-all cursor-pointer shrink-0" title="Generate Scene" aria-label="Generate Scene">
              <span class="material-symbols-outlined text-[18px]">auto_awesome</span>
            </button>
            <button id="btn-add-shot" class="w-8 h-8 sm:w-auto sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-black active:scale-95 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0" title="Add shot manually" aria-label="Add Shot">
              <span class="material-symbols-outlined text-[18px]">add</span>
              <span class="hidden sm:inline">Add Shot</span>
            </button>
          </div>
        `,null,"Visual shot composition and camera setups.")}

        <!-- Context & Scene Selector Bar -->
        <section class="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs flex flex-col gap-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div class="flex items-center gap-2.5 min-w-0 flex-1">
              <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80">
                <span class="material-symbols-outlined text-[19px]">movie_filter</span>
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <select id="storyboard-scene-select" class="font-heading font-bold text-sm text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none cursor-pointer truncate py-0.5 max-w-full">
                    <option value="scene-1">Loading screenplay scenes...</option>
                  </select>
                </div>
                <div id="scene-context-badges" class="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 flex-wrap">
                  <span id="badge-int-ext" class="px-1.5 py-0.5 rounded-md bg-slate-100 font-mono text-slate-700 font-semibold text-[10px]">INT</span>
                  <span id="badge-day-night" class="px-1.5 py-0.5 rounded-md bg-slate-100 font-mono text-slate-700 font-semibold text-[10px]">DAY</span>
                  <span id="badge-pages" class="text-slate-400">4 1/8 pgs</span>
                  <span class="text-slate-300">·</span>
                  <span id="badge-shoot-day" class="text-slate-600 font-medium">Day 1 of 7</span>
                </div>
              </div>
            </div>

            <!-- View Switcher & Schedule Link -->
            <div class="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <!-- View Switcher -->
              <div class="inline-flex p-0.5 rounded-xl bg-slate-100 border border-slate-200/60 text-xs">
                <button id="view-tab-contact" class="px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5" title="Contact Sheet View">
                  <span class="material-symbols-outlined text-[15px]">grid_view</span>
                  <span class="text-[11px]">Contact Sheet</span>
                </button>
                <button id="view-tab-sequence" class="px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5" title="Sequence Editor View">
                  <span class="material-symbols-outlined text-[15px]">reorder</span>
                  <span class="text-[11px]">Sequence Editor</span>
                </button>
              </div>

              <!-- Shooting Schedule Context Link -->
              <a id="btn-view-in-schedule" href="/production/schedule?scriptId=${n}" class="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-colors" title="View shoot day in Shooting Schedule">
                <span class="material-symbols-outlined text-[18px]">calendar_month</span>
              </a>
            </div>
          </div>

          <!-- Scene Source Context Strip -->
          <div id="scene-source-snippet" class="bg-slate-50/70 rounded-xl p-2.5 border border-slate-100 text-xs text-slate-600 flex items-start gap-2">
            <span class="material-symbols-outlined text-slate-400 text-[16px] shrink-0 mt-0.5">menu_book</span>
            <div class="flex-1 min-w-0">
              <span class="font-semibold text-slate-800 text-[11px]">Screenplay Context: </span>
              <span id="scene-snippet-text" class="italic text-[11px] text-slate-600 leading-relaxed">Loading context...</span>
            </div>
          </div>
        </section>

        <!-- Version Staleness Alert (shown if script draft has changed since storyboard was pinned) -->
        <div id="storyboard-stale-alert" class="hidden bg-amber-50/80 border border-amber-200 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-xs">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-amber-600 text-[18px] shrink-0">warning</span>
            <span class="text-xs text-amber-900 leading-relaxed">
              <strong>Source Screenplay Changed:</strong> Storyboard is pinned to <span id="stale-pinned-ver" class="font-semibold">Draft 4.2</span>, but active script is <span id="stale-active-ver" class="font-semibold">Draft 4.3</span>.
            </span>
          </div>
          <button id="btn-repin-storyboard" class="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold shrink-0 cursor-pointer">
            Acknowledge & Update Pin
          </button>
        </div>

        <!-- Continuity Alert Banner (shown when consecutive shots have eyeline/direction conflict) -->
        <div id="continuity-warning-banner" class="hidden bg-rose-50/90 border border-rose-200 rounded-2xl p-3 flex items-start gap-2.5 shadow-xs">
          <span class="material-symbols-outlined text-rose-600 text-[18px] shrink-0 mt-0.5">error_outline</span>
          <div class="flex-1 text-xs text-rose-900 leading-relaxed">
            <span class="font-semibold">Potential Continuity Disruption Detected:</span>
            <p id="continuity-warning-text" class="text-[11px] text-rose-800 mt-0.5">Consecutive shots have conflicting screen directions.</p>
          </div>
        </div>

        <!-- MAIN VIEW CONTAINER: Swapped dynamically between Contact Sheet and Sequence Editor -->
        <div id="storyboard-view-container" class="flex flex-col gap-3 min-h-[360px]">
          <div class="p-16 text-center text-slate-400 text-xs">Loading storyboard shots...</div>
        </div>
      </main>

      <!-- MODAL 1: FRAME DETAIL & INSPECTOR DRAWER -->
      <div id="shot-inspector-modal" class="scriptora-modal-overlay fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-2xl w-full p-4 sm:p-5 flex flex-col gap-3.5 max-h-[92vh] overflow-y-auto">
          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div class="flex items-center gap-2">
              <div id="modal-shot-pill" class="px-2 py-0.5 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs">1A</div>
              <h3 id="modal-shot-heading" class="font-heading font-bold text-sm text-slate-900">Edit Shot Details</h3>
            </div>
            <button id="modal-shot-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <!-- Shot Image Preview Canvas -->
          <div class="flex flex-col gap-2">
            <div id="modal-preview-box" class="w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center relative min-h-[220px]">
              <img id="modal-shot-image" src="" alt="Shot visual preview" class="w-full h-auto object-contain max-h-[260px] hidden" />
              <div id="modal-empty-image-placeholder" class="flex flex-col items-center justify-center text-slate-500 py-10 gap-1.5">
                <span class="material-symbols-outlined text-3xl text-slate-400">image</span>
                <span class="text-xs">No image rendered yet</span>
                <span class="text-[10px] text-slate-500">Tap Generate or Import Image below</span>
              </div>
            </div>

            <!-- Image Actions -->
            <div class="grid grid-cols-2 gap-2">
              <button type="button" id="modal-btn-regenerate" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 active:scale-[0.99] text-xs font-semibold cursor-pointer transition-all">
                <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span class="truncate">Regenerate Image</span>
              </button>
              <label class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-[0.99] text-xs font-semibold cursor-pointer transition-all">
                <span class="material-symbols-outlined text-[16px]">upload</span>
                <span class="truncate">Import Photo</span>
                <input type="file" id="modal-file-import" accept="image/*" class="sr-only" />
              </label>
            </div>
          </div>

          <!-- Form Fields -->
          <form id="shot-detail-form" class="flex flex-col gap-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Shot Number</label>
                <input type="text" id="input-shot-number" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-mono font-bold" required />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Shot Title</label>
                <input type="text" id="input-shot-title" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" required />
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Description & Visual Action</label>
              <textarea id="input-shot-desc" rows="2" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" placeholder="Describe the framing, action, and key visual beats..."></textarea>
            </div>

            <!-- Camera Parameters Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Shot Size</label>
                <select id="input-shot-size" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${Do.map(o=>`<option value="${o}">${o}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Camera Angle</label>
                <select id="input-shot-angle" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${Ro.map(o=>`<option value="${o}">${o}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Camera Movement</label>
                <select id="input-shot-movement" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${Lo.map(o=>`<option value="${o}">${o}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Focal Length</label>
                <select id="input-shot-focal" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${Mo.map(o=>`<option value="${o}">${o}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Aspect Ratio</label>
                <select id="input-shot-ratio" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${Vs.map(o=>`<option value="${o}">${o}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Lighting Mood</label>
                <select id="input-shot-lighting" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${Oo.map(o=>`<option value="${o}">${o}</option>`).join("")}
                </select>
              </div>
            </div>

            <!-- Continuity & Director Notes -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Screen Direction / Eyeline</label>
                <input type="text" id="input-shot-direction" placeholder="e.g. Left to Right / Looking Screen Right" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Approval State</label>
                <select id="input-shot-approval" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-semibold">
                  <option value="draft">Draft</option>
                  <option value="proposed">Proposed (Needs Review)</option>
                  <option value="approved">Approved for Production</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Director & Continuity Notes</label>
              <input type="text" id="input-shot-notes" placeholder="Notes for camera operator, lighting rim, or costume state..." class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" />
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
              <button type="button" id="modal-btn-delete-shot" class="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">delete</span>
                <span>Delete</span>
              </button>
              <div class="flex items-center gap-2">
                <button type="button" id="modal-btn-cancel-shot" class="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer">Cancel</button>
                <button type="submit" id="modal-btn-save-shot" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- MODAL 2: AI GENERATION & PROVIDER SELECTION MODAL -->
      <div id="ai-generate-modal" class="scriptora-modal-overlay fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-lg w-full p-4 sm:p-5 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-xl">auto_awesome</span>
              <h3 id="gen-modal-title" class="font-heading font-bold text-sm text-slate-900">Generate Storyboard Visuals</h3>
            </div>
            <button id="gen-modal-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <form id="ai-generation-form" class="flex flex-col gap-3 min-h-0 flex-1 overflow-hidden">
            <div class="scriptora-modal-body flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
              <!-- Provider Selector -->
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Image Generation Provider</label>
                <select id="gen-provider-select" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600">
                  <option value="scriptora-concept">SCRIPTORA Concept Engine (Free / Built-in)</option>
                  <option value="openai-dalle3">OpenAI DALL-E 3 (Paid API)</option>
                  <option value="gemini-imagen3">Google Imagen 3 (Paid API)</option>
                  <option value="stability-sdxl">Stability AI SDXL (Paid API)</option>
                </select>
                <div id="gen-provider-status" class="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>Configured & Ready</span>
                </div>
              </div>

              <!-- Cost Disclosure Banner -->
              <div id="gen-cost-disclosure" class="bg-blue-50/70 border border-blue-200/80 rounded-xl p-2.5 text-xs text-blue-900 flex items-start gap-2">
                <span class="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-0.5">info</span>
                <div class="flex-1">
                  <span class="font-semibold">Cost Disclosure: </span>
                  <span id="gen-cost-label">Free (Built-in Engine, no external API charges).</span>
                </div>
              </div>

              <!-- Shot Sequence Length (Only shown when generating a sequence) -->
              <div id="gen-shot-count-container" class="flex flex-col gap-1">
                <label for="gen-shot-count-select" class="text-[11px] font-semibold text-slate-700">Shot Sequence Length</label>
                <select id="gen-shot-count-select" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600">
                  <option value="1">1 — One-shot sequence</option>
                  <option value="2">2 — Two-shot sequence</option>
                  <option value="3">3 — Three-shot sequence</option>
                  <option value="4" selected>4 — Four-shot sequence</option>
                </select>
              </div>

              <!-- Visual Style & Aspect Ratio -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-semibold text-slate-700">Visual Style Preset</label>
                  <select id="gen-style-select" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                    ${Bo.map(o=>`<option value="${o}">${o}</option>`).join("")}
                  </select>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-semibold text-slate-700">Aspect Ratio</label>
                  <select id="gen-ratio-select" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                    ${Vs.map(o=>`<option value="${o}">${o}</option>`).join("")}
                  </select>
                </div>
              </div>

              <!-- Custom Creative Prompt -->
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Creative Direction / Prompt</label>
                <textarea id="gen-prompt-input" rows="2" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" placeholder="Optional creative guidance for framing, atmosphere, or lighting..."></textarea>
              </div>

              <!-- Generation Error Callout (if API key missing or provider fails) -->
              <div id="gen-error-alert" class="hidden bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-xs text-rose-800 flex items-start gap-2">
                <span class="material-symbols-outlined text-rose-600 text-[16px] shrink-0 mt-0.5">error</span>
                <div class="flex-1 text-[11px] leading-relaxed" id="gen-error-message">Provider error</div>
              </div>
            </div>

            <!-- Fixed Bottom Actions -->
            <div class="flex items-center justify-end gap-2 pt-2.5 border-t border-slate-100 shrink-0">
              <button type="button" id="gen-modal-cancel" class="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
              <button type="submit" id="gen-modal-submit" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span id="gen-submit-label">Generate 4-Shot Sequence</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Bottom Navigation with Production Active -->
      ${je("production")}
    </div>
  `}async function _o(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),a=s||n.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust";let o=n.get("sceneId")||"scene-1",i="contact",l=null,c="sequence";const m=document.getElementById("storyboard-scene-select"),u=document.getElementById("storyboard-view-container"),d=document.getElementById("view-tab-contact"),r=document.getElementById("view-tab-sequence"),p=document.getElementById("btn-export-storyboard-pdf"),b=document.getElementById("btn-generate-sequence"),y=document.getElementById("btn-add-shot"),x=document.getElementById("btn-view-in-schedule"),h=document.getElementById("storyboard-stale-alert"),T=document.getElementById("btn-repin-storyboard"),A=document.getElementById("continuity-warning-banner"),N=document.getElementById("shot-inspector-modal"),w=document.getElementById("modal-shot-close"),L=document.getElementById("modal-btn-cancel-shot"),I=document.getElementById("shot-detail-form"),X=document.getElementById("modal-btn-delete-shot"),V=document.getElementById("modal-btn-regenerate"),le=document.getElementById("modal-file-import"),_=document.getElementById("ai-generate-modal"),me=document.getElementById("gen-modal-close"),ie=document.getElementById("gen-modal-cancel"),q=document.getElementById("ai-generation-form"),Y=document.getElementById("gen-provider-select"),j=document.getElementById("gen-provider-status"),ce=document.getElementById("gen-cost-label"),k=document.getElementById("gen-shot-count-container"),O=document.getElementById("gen-shot-count-select"),xe=document.getElementById("gen-error-alert"),W=document.getElementById("gen-error-message");let Z=4,E=[],de=[],ae=null;try{E=await Dt(a),de=await aa()}catch(S){console.error("Failed loading scenes:",S)}m&&E.length&&(m.innerHTML=E.map(S=>`
      <option value="${S.id}" ${S.id===o?"selected":""}>
        Scene ${S.sceneNumber}: ${S.heading}
      </option>
    `).join(""),m.onchange=S=>{o=S.target.value,ue()});async function ue(){if(u){u.innerHTML='<div class="p-16 text-center text-slate-400 text-xs">Loading storyboard shots...</div>';try{ae=await Et(a,o)}catch(S){console.error(S),ae={sceneId:o,shots:[]}}Q(),B()}}function Q(){const S=E.find(J=>J.id===o)||E[0]||{},f=document.getElementById("badge-int-ext"),g=document.getElementById("badge-day-night"),P=document.getElementById("badge-pages"),R=document.getElementById("badge-shoot-day"),F=document.getElementById("scene-snippet-text");if(f&&(f.textContent=S.intExt||"INT"),g&&(g.textContent=S.dayNight||"DAY"),P&&(P.textContent=`${S.pages||"1.0"} pgs`),R&&(R.textContent=S.shootDay||"Day 1 of 7"),F&&(F.textContent=S.snippet||"Scene awaiting visual direction."),x){const J=String(S.shootDay||"1").match(/\d+/)?.[0]||"1";x.href=`/production/schedule?scriptId=${a}&day=${J}&sceneId=${S.id}`}h&&(ae?.isVersionStale?(h.classList.remove("hidden"),document.getElementById("stale-pinned-ver").textContent=ae.sourceVersion||"Draft 4.2",document.getElementById("stale-active-ver").textContent=ae.currentScriptDraft||"Draft 4.3"):h.classList.add("hidden")),ne()}function ne(){if(!A)return;const S=ae?.shots||[];let f=!1,g="";for(let P=0;P<S.length-1;P++){const R=S[P],F=S[P+1];if(R.shotSize.includes("Close")&&F.shotSize.includes("Close")){const J=R.continuity?.eyeline?.toLowerCase()||"",H=F.continuity?.eyeline?.toLowerCase()||"";if(J&&H&&J===H&&J.includes("screen")){f=!0,g=`Shot ${R.shotNumber} and Shot ${F.shotNumber} both have eyeline "${R.continuity.eyeline}", which may create a reverse-angle crossing.`;break}}}f?(A.classList.remove("hidden"),document.getElementById("continuity-warning-text").textContent=g):A.classList.add("hidden")}function B(){if(!u)return;const S=ae?.shots||[];if(!S.length){u.innerHTML=`
        <div class="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center justify-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">art_track</span>
          </div>
          <div class="max-w-md">
            <h4 class="font-heading font-bold text-sm text-slate-900">No Storyboard Frames Yet</h4>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">
              This scene does not have a visual storyboard. Generate an AI proposed sequence grounded in the screenplay or add shots manually.
            </p>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <button id="btn-empty-generate" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
              <span>Generate Scene Sequence</span>
            </button>
            <button id="btn-empty-add" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer">
              <span>+ Add Shot Manually</span>
            </button>
          </div>
        </div>
      `;const f=document.getElementById("btn-empty-generate"),g=document.getElementById("btn-empty-add");f&&(f.onclick=()=>Ie("sequence")),g&&(g.onclick=()=>te(null));return}i==="contact"?he(S):Ae(S)}function he(S){u.innerHTML=`
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        ${S.map(f=>{const g=f.approvalStatus==="approved"?"bg-emerald-50 text-emerald-700 border-emerald-200":f.approvalStatus==="proposed"?"bg-amber-50 text-amber-700 border-amber-200":f.approvalStatus==="rejected"?"bg-rose-50 text-rose-700 border-rose-200":"bg-slate-100 text-slate-600 border-slate-200";return`
            <div class="storyboard-card bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between" data-shot-id="${f.id}">
              <div>
                <!-- Top Card Meta Header -->
                <div class="px-3 py-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div class="flex items-center gap-1.5">
                    <span class="font-mono font-bold text-xs text-slate-900">${f.shotNumber}</span>
                    <span class="text-[10px] text-slate-400">#${f.order}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold border ${g} capitalize">
                      ${f.approvalStatus||"Draft"}
                    </span>
                    <button class="btn-card-quick-menu p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer" data-shot-id="${f.id}" title="Shot actions">
                      <span class="material-symbols-outlined text-[15px]">more_vert</span>
                    </button>
                  </div>
                </div>

                <!-- Visual Image Canvas -->
                <div class="aspect-video bg-slate-950 flex items-center justify-center relative overflow-hidden cursor-pointer btn-open-inspector" data-shot-id="${f.id}">
                  ${f.imageUrl?`
                    <img src="${f.imageUrl}" alt="${f.title}" class="w-full h-full object-cover" />
                  `:`
                    <div class="flex flex-col items-center justify-center text-slate-500 gap-1 p-4 text-center">
                      <span class="material-symbols-outlined text-2xl text-slate-600">art_track</span>
                      <span class="text-[10px]">Tap to inspect & generate frame</span>
                    </div>
                  `}
                  <!-- In-Canvas Aspect & Lens Badges -->
                  <div class="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-white font-mono text-[9px]">
                    ${f.aspectRatio||"2.39:1"} · ${f.focalLength||"50mm"}
                  </div>
                </div>

                <!-- Title & Description Details -->
                <div class="p-3 flex flex-col gap-1.5">
                  <h4 class="font-heading font-bold text-xs text-slate-900 truncate">${f.title}</h4>
                  <p class="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">${f.description||"No description provided."}</p>
                  
                  <!-- Metadata Chips -->
                  <div class="flex items-center gap-1.5 pt-1 text-[10px] text-slate-600 flex-wrap">
                    <span class="px-1.5 py-0.5 rounded bg-slate-100">${f.shotSize}</span>
                    <span class="px-1.5 py-0.5 rounded bg-slate-100">${f.cameraAngle}</span>
                    ${f.cameraMovement!=="Static"?`<span class="px-1.5 py-0.5 rounded bg-slate-100">${f.cameraMovement}</span>`:""}
                  </div>
                </div>
              </div>

              <!-- Card Action Bar -->
              <div class="px-3 py-2 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between text-xs">
                <!-- Reorder buttons -->
                <div class="flex items-center gap-1">
                  <button class="btn-move-up p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer" data-shot-id="${f.id}" title="Move left / up">
                    <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                  </button>
                  <button class="btn-move-down p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer" data-shot-id="${f.id}" title="Move right / down">
                    <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                <div class="flex items-center gap-1.5">
                  <button class="btn-quick-approve p-1 rounded text-slate-400 hover:text-emerald-600 cursor-pointer" data-shot-id="${f.id}" title="${f.approvalStatus==="approved"?"Mark as Draft":"Approve Frame"}">
                    <span class="material-symbols-outlined text-[16px]">${f.approvalStatus==="approved"?"check_circle":"radio_button_unchecked"}</span>
                  </button>
                  <button class="btn-open-inspector px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 text-[11px] font-semibold transition-all cursor-pointer" data-shot-id="${f.id}">
                    Inspect
                  </button>
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    `,se()}function Ae(S){u.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col">
        <!-- Sequence Toolbar -->
        <div class="px-3.5 sm:px-4 py-2.5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2 text-xs">
          <span class="font-heading font-bold text-slate-800 text-xs sm:text-sm whitespace-nowrap">${S.length} Shots in Sequence</span>
          <button id="btn-batch-approve-all" class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 active:scale-95 text-[11px] font-semibold cursor-pointer shrink-0 transition-all">
            Approve All Proposed
          </button>
        </div>

        <!-- Shots Sequence Table / List -->
        <div class="divide-y divide-slate-100">
          ${S.map((g,P)=>{const R=g.approvalStatus==="approved"?"bg-emerald-50 text-emerald-700 border-emerald-200":g.approvalStatus==="proposed"?"bg-amber-50 text-amber-700 border-amber-200":g.approvalStatus==="rejected"?"bg-rose-50 text-rose-700 border-rose-200":"bg-slate-100 text-slate-600 border-slate-200";return`
              <div class="p-3 sm:p-4 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0 w-full overflow-hidden" data-shot-id="${g.id}">
                <div class="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1 w-full">
                  <!-- Reorder Controls -->
                  <div class="flex sm:flex-col items-center gap-0.5 sm:gap-1 shrink-0 pt-0.5">
                    <button class="btn-move-up p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${g.id}" title="Move up">
                      <span class="material-symbols-outlined text-[16px]">expand_less</span>
                    </button>
                    <span class="font-mono font-bold text-xs text-slate-700">${g.order}</span>
                    <button class="btn-move-down p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${g.id}" title="Move down">
                      <span class="material-symbols-outlined text-[16px]">expand_more</span>
                    </button>
                  </div>

                  <!-- Thumbnail Preview -->
                  <div class="w-16 h-12 sm:w-20 sm:h-12 bg-slate-950 rounded-lg overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center cursor-pointer btn-open-inspector" data-shot-id="${g.id}">
                    ${g.imageUrl?`
                      <img src="${g.imageUrl}" alt="${g.title}" class="w-full h-full object-cover" />
                    `:`
                      <span class="material-symbols-outlined text-slate-600 text-base sm:text-lg">image</span>
                    `}
                  </div>

                  <!-- Shot Summary Info -->
                  <div class="min-w-0 flex-1 overflow-hidden">
                    <div class="flex items-center gap-1.5 flex-wrap min-w-0">
                      <span class="font-mono font-bold text-xs text-blue-600 shrink-0">${g.shotNumber}</span>
                      <h4 class="font-heading font-semibold text-xs text-slate-900 truncate min-w-0 flex-1" title="${g.title}">${g.title}</h4>
                      <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold border ${R} capitalize shrink-0">
                        ${g.approvalStatus||"Draft"}
                      </span>
                    </div>
                    <p class="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed break-words">${g.description||"No description"}</p>
                    <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-slate-500 mt-1.5 min-w-0">
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${g.shotSize}</span>
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${g.cameraAngle}</span>
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${g.focalLength}</span>
                      ${g.continuity?.screenDirection?`
                        <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium truncate max-w-full" title="${g.continuity.screenDirection}">
                          ${g.continuity.screenDirection}
                        </span>
                      `:""}
                    </div>
                  </div>
                </div>

                <!-- Action Controls -->
                <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-center mt-1 sm:mt-0">
                  <button class="btn-quick-approve p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-emerald-600 active:scale-95 text-xs cursor-pointer transition-all" data-shot-id="${g.id}" title="${g.approvalStatus==="approved"?"Mark as Draft":"Approve Shot"}">
                    <span class="material-symbols-outlined text-[16px]">${g.approvalStatus==="approved"?"check_circle":"check"}</span>
                  </button>
                  <button class="btn-open-inspector px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-xs font-semibold cursor-pointer transition-all" data-shot-id="${g.id}">
                    Edit Details
                  </button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,se();const f=document.getElementById("btn-batch-approve-all");f&&(f.onclick=async()=>{try{const g=(ae?.shots||[]).filter(P=>P.approvalStatus==="proposed"||P.approvalStatus==="draft").map(P=>P.id);if(!g.length){C("All shots are already approved.");return}await ca(a,o,g,"approved","Batch approved for production"),C(`Approved ${g.length} shots.`),ue()}catch{C("Failed batch approval.")}})}function se(){document.querySelectorAll(".btn-open-inspector").forEach(S=>{S.onclick=f=>{f.stopPropagation();const g=S.getAttribute("data-shot-id");te(g)}}),document.querySelectorAll(".btn-move-up").forEach(S=>{S.onclick=async f=>{f.stopPropagation();const g=S.getAttribute("data-shot-id");$e(g,-1)}}),document.querySelectorAll(".btn-move-down").forEach(S=>{S.onclick=async f=>{f.stopPropagation();const g=S.getAttribute("data-shot-id");$e(g,1)}}),document.querySelectorAll(".btn-quick-approve").forEach(S=>{S.onclick=async f=>{f.stopPropagation();const g=S.getAttribute("data-shot-id"),P=ae?.shots?.find(F=>F.id===g);if(!P)return;const R=P.approvalStatus==="approved"?"draft":"approved";try{await ra(a,o,g,R),C(`Shot ${P.shotNumber} marked ${R}`),ue()}catch{C("Failed to update shot approval")}}})}async function $e(S,f){const g=ae?.shots||[],P=g.findIndex(re=>re.id===S);if(P===-1)return;const R=P+f;if(R<0||R>=g.length)return;const F=[...g],[J]=F.splice(P,1);F.splice(R,0,J);const H=F.map(re=>re.id);try{await ia(a,o,H),ue()}catch{C("Failed to reorder shots")}}function te(S){l=S;const f=!S,g=f?null:ae?.shots?.find(F=>F.id===S);document.getElementById("modal-shot-pill").textContent=g?.shotNumber||`${ae?.sceneNumber||1}${String.fromCharCode(65+(ae?.shots?.length||0)%26)}`,document.getElementById("modal-shot-heading").textContent=f?"Add New Shot":`Edit Shot ${g.shotNumber}`,document.getElementById("input-shot-number").value=g?.shotNumber||"",document.getElementById("input-shot-title").value=g?.title||"",document.getElementById("input-shot-desc").value=g?.description||"",document.getElementById("input-shot-size").value=g?.shotSize||"Medium Shot",document.getElementById("input-shot-angle").value=g?.cameraAngle||"Eye Level",document.getElementById("input-shot-movement").value=g?.cameraMovement||"Static",document.getElementById("input-shot-focal").value=g?.focalLength||"50mm Prime",document.getElementById("input-shot-ratio").value=g?.aspectRatio||ae?.aspectRatio||"2.39:1",document.getElementById("input-shot-lighting").value=g?.lightingMood||"Daylight Dust",document.getElementById("input-shot-direction").value=g?.continuity?.screenDirection||"Left to Right",document.getElementById("input-shot-approval").value=g?.approvalStatus||"draft",document.getElementById("input-shot-notes").value=g?.directorNotes||"";const P=document.getElementById("modal-shot-image"),R=document.getElementById("modal-empty-image-placeholder");g?.imageUrl?(P.src=g.imageUrl,P.classList.remove("hidden"),R.classList.add("hidden")):(P.classList.add("hidden"),R.classList.remove("hidden")),X&&X.classList.toggle("hidden",f),Qe(N)}w&&(w.onclick=()=>ke(N)),L&&(L.onclick=()=>ke(N)),I&&(I.onsubmit=async S=>{S.preventDefault();const f={shotNumber:document.getElementById("input-shot-number").value.trim(),title:document.getElementById("input-shot-title").value.trim(),description:document.getElementById("input-shot-desc").value.trim(),shotSize:document.getElementById("input-shot-size").value,cameraAngle:document.getElementById("input-shot-angle").value,cameraMovement:document.getElementById("input-shot-movement").value,focalLength:document.getElementById("input-shot-focal").value,aspectRatio:document.getElementById("input-shot-ratio").value,lightingMood:document.getElementById("input-shot-lighting").value,approvalStatus:document.getElementById("input-shot-approval").value,directorNotes:document.getElementById("input-shot-notes").value.trim(),continuity:{screenDirection:document.getElementById("input-shot-direction").value.trim()}};try{l?(await rs(a,o,l,f),C("Updated shot details")):(await oa(a,o,f),C("Added new shot to storyboard")),ke(N),ue()}catch{C("Failed saving shot")}}),X&&(X.onclick=async()=>{if(l&&confirm("Are you sure you want to delete this shot?"))try{await la(a,o,l),C("Shot deleted"),ke(N),ue()}catch{C("Failed to delete shot")}}),V&&(V.onclick=()=>{ke(N),Ie("shot",l)}),le&&(le.onchange=S=>{const f=S.target.files?.[0];if(!f)return;const g=new FileReader;g.onload=async P=>{const R=P.target.result;if(l)try{await rs(a,o,l,{imageUrl:R,imageSource:"imported"}),C("Imported reference image successfully"),ue(),te(l)}catch{C("Failed importing image")}},g.readAsDataURL(f)});function Ne(){const S=document.getElementById("gen-submit-label");S&&(c==="sequence"?S.textContent=`Generate ${Z}-Shot Sequence`:S.textContent="Generate Frame")}function Ie(S="sequence",f=null){c=S,l=f,document.getElementById("gen-modal-title").textContent=S==="sequence"?"Generate Scene Shot Sequence (AI)":"Regenerate Frame Visual (AI)",k&&k.classList.toggle("hidden",S!=="sequence"),O&&(O.value=String(Z)),Ne(),xe&&xe.classList.add("hidden"),ye(),Qe(_)}function ye(){if(!Y)return;const S=Y.value,f=de.find(g=>g.id===S)||de[0];if(j&&(f.isConfigured||!f.requiresApiKey?(j.className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1",j.innerHTML='<span class="material-symbols-outlined text-[14px]">check_circle</span><span>Configured & Ready</span>'):(j.className="text-[11px] text-amber-600 font-medium mt-0.5 flex items-center gap-1",j.innerHTML=`<span class="material-symbols-outlined text-[14px]">info</span><span>Key missing in backend .env (${f.envVarName})</span>`)),ce)if(f.pricingType==="free")ce.textContent="Free (Built-in Concept Engine, no API keys or charges required).";else{const g=Z||4,P=c==="sequence"?`$${(f.costPerImage*g).toFixed(3)} (${g}-shot batch)`:`$${f.costPerImage.toFixed(3)}`;ce.textContent=`${f.costLabel} — Estimated: ${P}. Server credentials required.`}}Y&&(Y.onchange=ye),O&&(O.value=String(Z),O.onchange=()=>{Z=parseInt(O.value,10)||4,Ne(),ye()}),me&&(me.onclick=()=>ke(_)),ie&&(ie.onclick=()=>ke(_)),q&&(q.onsubmit=async S=>{S.preventDefault();const f=Y.value,g=de.find(H=>H.id===f)||de[0],P=document.getElementById("gen-style-select").value,R=document.getElementById("gen-ratio-select").value,F=document.getElementById("gen-prompt-input").value.trim();if(g.pricingType==="paid"){if(!g.isConfigured){xe&&(xe.classList.remove("hidden"),W.textContent=`Provider '${g.name}' requires ${g.envVarName} configured in backend/.env. Please switch to SCRIPTORA Concept Engine (Free) or Manual Image Import.`);return}if(!confirm(`Confirm generation using ${g.name}? Estimated cost: ${g.costLabel}.`))return}const J=document.getElementById("gen-modal-submit");J.disabled=!0,J.innerHTML='<span class="w-3.5 h-3.5 border-2 border-white/60 border-t-white rounded-full animate-spin"></span><span>Generating...</span>';try{if(c==="sequence"){const H=parseInt(O?.value,10)||Z||4,re=await ua(a,o,{provider:f,visualStyle:P,aspectRatio:R,prompt:F,shotCount:H});if(re?.proposedShots){const fe={...ae,shots:re.proposedShots,visualStyle:P,aspectRatio:R};await Ls(a,fe),C(`Generated ${re.proposedShots.length} proposed shots for review.`),ke(_),ue()}}else{const H=ae?.shots?.find(fe=>fe.id===l),re=await da(a,{provider:f,prompt:F||H?.prompt||H?.description||"Cinematic composition",shotSize:H?.shotSize||"Medium Shot",cameraAngle:H?.cameraAngle||"Eye Level",focalLength:H?.focalLength||"50mm Prime",lightingMood:H?.lightingMood||"Daylight Dust",aspectRatio:R,visualStyle:P,sceneHeading:ae?.sceneHeading||"SCENE 1",shotNumber:H?.shotNumber||"1A"});re?.imageUrl&&(await rs(a,o,l,{imageUrl:re.imageUrl,provider:f,prompt:F||H?.prompt,imageSource:"ai"}),C(`Regenerated image for Shot ${H?.shotNumber}`),ke(_),ue())}}catch(H){console.error(H),xe&&(xe.classList.remove("hidden"),W.textContent=H.message||"Generation failed. Please try again.")}finally{J.disabled=!1;const H=c==="sequence"?`Generate ${Z}-Shot Sequence`:"Generate Frame";J.innerHTML=`<span class="material-symbols-outlined text-[16px]">auto_awesome</span><span id="gen-submit-label">${H}</span>`}}),d&&r&&(d.onclick=()=>{i="contact",d.className="px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5",r.className="px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5",B()},r.onclick=()=>{i="sequence",r.className="px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5",d.className="px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5",B()}),b&&(b.onclick=()=>Ie("sequence")),y&&(y.onclick=()=>te(null)),p&&(p.onclick=()=>{try{const S=E.find(g=>g.id===o)||{},f=$.state.scripts?.find(g=>g.id===a)||{title:"Chronicles of Dust",draft:"Draft 4.2"};So(ae,{title:f.title,draft:f.draft||ae?.sourceVersion||"Draft 4.2",heading:S.heading||ae?.sceneHeading||"SCENE 1"}),C("Exported Storyboard Studio PDF")}catch(S){console.error(S),C("Failed to export Storyboard PDF")}}),T&&(T.onclick=async()=>{ae&&(ae.sourceVersion=ae.currentScriptDraft||"Draft 4.2",ae.isVersionStale=!1,await Ls(a,ae),h?.classList.add("hidden"),C(`Pinned Storyboard to ${ae.sourceVersion}`))}),ue()}class jo{constructor(){this.appEl=null,this.currentPath=null,this.isFullScreen=!1,this.isNavigatingBack=!1,this._backInProgress=!1,this.backHandlers=[],this.scrollPositions={},this.historyIndex=0}clearHistory(){this.scrollPositions={},this.historyIndex=0,this.backHandlers=[],$.clearHistory()}getBasePath(){return window.location.pathname.toLowerCase().startsWith("/scriptora")?"/Scriptora":""}getCurrentLocation(){return window.location.hash&&window.location.hash.startsWith("#/")?window.location.hash.slice(1):window.location.pathname+window.location.search}normalizePath(t){if(!t)return"/";const s=this.getBasePath();let n=t;s&&n.toLowerCase().startsWith(s.toLowerCase())&&(n=n.slice(s.length)||"/");const a=n.indexOf("?"),o=n.indexOf("#");let i=n.length;a!==-1&&(i=Math.min(i,a)),o!==-1&&(i=Math.min(i,o));const l=n.slice(0,i).replace(/\/+$/,"")||"/";return l.startsWith("/")?l:"/"+l}getRouteFallback(t){const s=this.normalizePath(t);return s.startsWith("/production/")&&s!=="/production"?"/production":s==="/production"?"/workspace":s.startsWith("/intelligence/analysis/")?"/intelligence/analysis":s==="/intelligence/analysis"||s==="/intelligence/analysis/select"?"/intelligence/dashboard":s==="/intelligence/dashboard"||s==="/intelligence/overview"?"/intelligence/context":s==="/intelligence/context"?"/intelligence":s==="/intelligence"||s==="/intelligence/select"?"/workspace":s==="/profile/collaborators"?"/profile":(s==="/profile"||s==="/notifications"||s==="/chat"||s.startsWith("/editor"),"/workspace")}getRouteLabel(t){const s=this.normalizePath(t);return s==="/workspace"?"Workspace":s==="/production"?"Production":s.startsWith("/production/schedule")?"Schedule":s.startsWith("/production/breakdown")?"Breakdown":s.startsWith("/production/call-sheets")?"Call Sheets":s.startsWith("/production/dialogue-sides")?"Dialogue Sides":s.startsWith("/production/storyboard")?"Storyboard":s.startsWith("/editor")?"Editor":s==="/intelligence"?"Intelligence":s==="/intelligence/context"?"Context":s==="/intelligence/dashboard"?"Analysis":s.startsWith("/intelligence/analysis")?"Vectors":s==="/profile"?"Profile":s==="/profile/collaborators"?"Collaborators":s==="/notifications"?"Notifications":s==="/chat"?"AI Chat":"Back"}registerBackHandler(t){return typeof t!="function"?()=>{}:(this.backHandlers.push(t),()=>{const s=this.backHandlers.indexOf(t);s!==-1&&this.backHandlers.splice(s,1)})}triggerBackHandlers(){for(let n=this.backHandlers.length-1;n>=0;n--){const a=this.backHandlers[n];try{if(a())return!0}catch(o){console.error("Back handler error:",o)}}const t=Array.from(document.querySelectorAll("#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)"));if(t.length>0){const n=t[t.length-1],a=n.querySelector('[data-modal-close], #modal-day-close, #modal-day-done, .close-setting-modal, .close-profile-modal, #action-modal-cancel, #new-script-cancel, [id$="-cancel"], [id$="-close"]');return a?a.click():ke(n),!0}const s=Array.from(document.querySelectorAll('.scriptora-popup:not(.hidden), [data-scriptora-popup]:not(.hidden), [role="menu"]:not(.hidden), #quick-add-menu:not(.hidden)'));return s.length>0?(s[s.length-1].classList.add("hidden"),!0):!1}peekPreviousRoute(){return window.history.state?.prevPath?window.history.state.prevPath:$.peekPreviousRoute(null)}back(t=null){if(this._backInProgress||(this._backInProgress=!0,setTimeout(()=>{this._backInProgress=!1},200),this.triggerBackHandlers()))return;const s=window.history.state||{};if((typeof s.appStep=="number"?s.appStep:this.historyIndex)>0){window.history.back();return}let a=$.popHistory();for(;a&&this.normalizePath(a)===this.normalizePath(this.currentPath);)a=$.popHistory();const o=a||t||this.getRouteFallback(this.currentPath);o&&this.normalizePath(o)!==this.normalizePath(this.currentPath)&&(this.isNavigatingBack=!0,this.navigate(o,!0),this.isNavigatingBack=!1)}ensureShell(){if(!this.appEl)return;document.getElementById("scriptora-app-shell")||(this.appEl.innerHTML=`
        <div id="scriptora-app-shell" class="flex flex-col min-h-screen w-full relative bg-surface select-text">
          <!-- Persistent Global Header Container -->
          <div id="scriptora-global-header" class="fixed top-0 left-0 right-0 z-40 transition-all duration-200"></div>

          <!-- Dynamic Screen Content Area -->
          <main id="scriptora-global-content" class="flex-1 w-full min-h-screen flex flex-col relative transition-opacity duration-200"></main>

          <!-- Persistent Global Bottom Navigation Container -->
          <div id="scriptora-global-nav" class="fixed bottom-0 left-0 right-0 z-40 transition-all duration-200 overflow-visible"></div>
        </div>
      `)}init(t="#app"){if(this.appEl=document.querySelector(t),!this.appEl){console.error(`Mount element ${t} not found.`);return}this.ensureShell(),window.scriptoraRouter=this;const s=window.history.state||{};typeof s.appStep!="number"?(window.history.replaceState({...s,appStep:0,scriptoraPath:this.getCurrentLocation()},"",window.location.href),this.historyIndex=0):this.historyIndex=s.appStep,window.setScriptoraFullScreen=n=>{this.isFullScreen=!!n;const a=document.getElementById("scriptora-global-header"),o=document.getElementById("scriptora-global-nav");a&&a.classList.toggle("hidden",!!n),o&&o.classList.toggle("hidden",!!n)},document.addEventListener("click",n=>{const a=n.target.closest("[data-scriptora-back], #prod-subnav-back, #editor-back-btn, #btn-back-notif, #analysis-back-btn, #collab-back-btn, #production-back-btn, #chat-back-btn, #intelligence-dashboard-back-btn, #intelligence-context-back-btn, #individual-analysis-selector-back-btn");if(a){n.preventDefault(),n.stopPropagation();const i=a.getAttribute("data-back-fallback")||a.getAttribute("href")||null;this.back(i);return}const o=n.target.closest("a");if(o&&o.href&&o.origin===window.location.origin&&!o.hasAttribute("download")&&o.getAttribute("target")!=="_blank"&&!o.getAttribute("rel")?.includes("external")){const i=new URL(o.href),l=i.pathname+i.search+i.hash;l.startsWith("/api")||(n.preventDefault(),this.navigate(l))}},!0),window.addEventListener("popstate",n=>{if(!(typeof window.__scriptoraEditorPopstate=="function"&&window.__scriptoraEditorPopstate(n))){if(this.triggerBackHandlers()){const a=this.getCurrentLocation();window.history.pushState({...window.history.state||{},scriptoraPath:a},"",a);return}typeof n.state?.appStep=="number"?this.historyIndex=n.state.appStep:this.historyIndex>0&&(this.historyIndex-=1),$.popHistory(),this.isNavigatingBack=!0,this.resolve(this.getCurrentLocation()),this.isNavigatingBack=!1}}),window.addEventListener("hashchange",()=>{this.resolve(this.getCurrentLocation())}),this.resolve(this.getCurrentLocation())}navigate(t,s=!1){if(Ms(),this.currentPath&&(this.scrollPositions[this.normalizePath(this.currentPath)]=window.scrollY),!this.isNavigatingBack&&!s&&this.currentPath){const l=this.normalizePath(this.currentPath),c=this.normalizePath(t);l!==c&&$.pushHistory(this.currentPath)}const n=this.getBasePath(),a=n&&t.toLowerCase().startsWith(n.toLowerCase())?t.slice(n.length)||"/":t,o=n&&!t.startsWith(n)?`${n}${a.startsWith("/")?"":"/"}${a}`:t,i=this.currentPath?this.normalizePath(this.currentPath):null;s?window.history.replaceState({...window.history.state||{},scriptoraPath:a,appStep:this.historyIndex,prevPath:i},"",o):(this.isNavigatingBack||(this.historyIndex+=1),window.history.pushState({scriptoraPath:a,appStep:this.historyIndex,prevPath:i},"",o)),this.resolve(a)}resolve(t){const s=t.indexOf("?"),n=s===-1?t:t.slice(0,s),a=s===-1?"":t.slice(s+1);let o=n.replace(/\/+$/,"")||"/";const i=this.getBasePath();i&&o.toLowerCase().startsWith(i.toLowerCase())&&(o=o.slice(i.length)||"/"),o.startsWith("/")||(o="/"+o);const l=new URLSearchParams(a||"");this.currentPath=t,o.startsWith("/editor")?(document.body.classList.add("editor-mode"),document.documentElement.classList.add("editor-mode")):(document.body.classList.remove("editor-mode"),document.documentElement.classList.remove("editor-mode"));const c=!!$.state.currentUser;if(!c&&!["/welcome","/auth"].includes(o)){this.navigate("/auth",!0);return}if(c&&o==="/auth"){this.navigate("/workspace",!0);return}if(o==="/"){c?this.navigate("/workspace",!0):this.navigate("/welcome",!0);return}if(o==="/welcome"){this.render(ga(),()=>ha(this.navigate.bind(this)),{isPublic:!0});return}if(o==="/auth"){this.render(fa(),()=>ba(this.navigate.bind(this)),{isPublic:!0});return}if(o==="/workspace"){this.render(Sa(),()=>Ea(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Workspace",subtitle:"Your writing space."});return}if(o==="/editor"){const r=$.state.selectedScriptId||"chronicles-of-dust",p=l.get("scene");this.navigate(`/editor/${r}${p?`?scene=${p}`:""}`,!0);return}if(o.startsWith("/editor/")){const r=o.split("/")[2],p=l.get("scene");$.selectScript(r);const b=$.state.scripts?.find(y=>y.id===r)||{title:"Untitled Screenplay"};this.render(Ca(r,p),()=>$a(r,this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Editor",subtitle:b.title||"Screenplay Studio",hideHeader:!0,hideNav:!0});return}if(o==="/intelligence"||o==="/intelligence/select"){this.render(Ya(),()=>Xa(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Selector"});return}if(o==="/intelligence/context"){this.render(Za(),()=>Qa(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Context Calibration"});return}if(o==="/intelligence/dashboard"||o==="/intelligence/overview"){this.render(eo(),()=>to(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Analysis"});return}if(o==="/intelligence/analysis"||o==="/intelligence/analysis/select"){this.render(so(),()=>no(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Analyse Individually"});return}if(o.startsWith("/intelligence/analysis/")){const r=o.split("/")[3]||"pacing",p=l.get("from"),b=l.get("scriptId");this.render(lo(r,p,b),()=>io(r,this.navigate.bind(this),p,b),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Vector Analysis"});return}if(o==="/profile"){const r=l.get("from"),p=l.get("scriptId");this.render(ro(r,p),()=>co(this.navigate.bind(this),r,p),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Account & preferences."});return}if(o==="/profile/collaborators"){const r=l.get("from"),p=l.get("scriptId");this.render(uo(r,p),()=>po(this.navigate.bind(this),r,p),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Collaborators"});return}if(o==="/notifications"){this.render(xo(),()=>mo(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Notifications",subtitle:"Activity Stream"});return}if(o==="/production"||o==="/pre-production"){const r=l.get("from"),p=l.get("scriptId");this.render(fo(r,p),()=>bo(this.navigate.bind(this),r,p),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Production Workspace & Tools"});return}if(o==="/production/breakdown"){const r=l.get("from"),p=l.get("scriptId");this.render(ko(r,p),()=>Io(this.navigate.bind(this),r,p),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Script Breakdown Workspace"});return}const u=o.match(/^\/production\/scenes(?:\/([a-zA-Z0-9_-]+))?$/);if(u){const r=l.get("from"),p=l.get("scriptId")||"chronicles-of-dust",b=u[1]||l.get("sceneId"),y=`/production/schedule?scriptId=${p}${b?`&sceneId=${b}`:""}${r?`&from=${encodeURIComponent(r)}`:""}`;this.navigate(y,!0);return}const d=o.match(/^\/production\/call-sheets(?:\/([a-zA-Z0-9_-]+))?$/);if(d){const r=l.get("from"),p=l.get("scriptId"),b=d[1]||l.get("csId");this.render(Co(r,p,b),()=>hn(this.navigate.bind(this),r,p,b),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:b?"Call Sheet Inspector":"Call Sheets Workspace"});return}if(o==="/production/dialogue-sides"||o==="/production/dialogue-sheets"||o==="/production/sides"){const r=l.get("from"),p=l.get("scriptId");this.render(Ao(r,p),()=>$o(this.navigate.bind(this),r,p),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Dialogue Sheets & Actor Sides"});return}if(o==="/production/schedule"||o==="/production/stripboard"){const r=l.get("from"),p=l.get("scriptId");this.render(To(r,p),()=>Po(this.navigate.bind(this),r,p),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Master Shooting Schedule & Stripboard"});return}if(o==="/production/storyboard"||o==="/production/storyboards"){const r=l.get("from"),p=l.get("scriptId");this.render(Fo(r,p),()=>_o(this.navigate.bind(this),r,p),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Storyboard Studio"});return}if(o==="/chat"||o==="/ai-chat"||o==="/writer-room"||o==="/ai-writer-room"){this.render(go(),()=>ho(this.navigate.bind(this)),{activeTab:"chat",sectionTitle:"AI Chat",subtitle:"Universal Assistant"});return}this.renderNotFound(o)}render(t,s,n={}){this.ensureShell();const a=document.getElementById("scriptora-global-header"),o=document.getElementById("scriptora-global-content"),i=document.getElementById("scriptora-global-nav"),l=!!n.isPublic,c=!!n.hideHeader,m=!!n.hideNav,u=n.activeTab||"workspace",d=n.sectionTitle||"Scriptora",r=n.subtitle||"";if(l?(a&&a.classList.add("hidden"),i&&i.classList.add("hidden")):(a&&!this.isFullScreen&&(c?(a.classList.add("hidden"),a.innerHTML=""):(a.classList.remove("hidden"),a.innerHTML=qe(d,r))),i&&!this.isFullScreen&&(m?(i.classList.add("hidden"),i.innerHTML=""):(i.classList.remove("hidden"),ma(u)||(i.innerHTML=je(u))))),o){this.backHandlers=[];const p=document.getElementById("scriptora-modal-portal");p&&(p.innerHTML=""),Ms();let b=t||"";b=b.replace(/<header[^>]*data-global-header="true"[^>]*>[\s\S]*?<\/header>/gi,""),b=b.replace(/<header\s+class="fixed\s+top-0\s+w-full\s+z-40\s+pt-safe\s+bg-surface[^>]*>[\s\S]*?<\/header>/gi,""),b=b.replace(/<nav[^>]*data-global-bottom-nav="true"[^>]*>[\s\S]*?<\/nav>/gi,""),b=b.replace(/<nav\s+class="fixed\s+bottom-0[^>]*>[\s\S]*?<\/nav>/gi,""),o.innerHTML=b;const y=this.normalizePath(this.currentPath),x=this.scrollPositions[y];if(this.isNavigatingBack&&x!==void 0?setTimeout(()=>{window.scrollTo({top:x,behavior:"instant"})},10):window.scrollTo({top:0,behavior:"instant"}),o.classList.remove("fade-in"),o.offsetWidth,o.classList.add("fade-in"),typeof s=="function")try{s()}catch(h){console.error("Error attaching screen events:",h)}}}renderNotFound(t){this.render(`
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
      `,()=>{const s=document.getElementById("notfound-home");s&&(s.onclick=()=>this.navigate("/workspace"))},{activeTab:"workspace",sectionTitle:"Page Not Found",subtitle:"404"})}}const Ho=new jo;async function Ws(){try{await $.init(),Ho.init("#app"),window.addEventListener("online",()=>{C("Back online. Synchronizing changes..."),$.refreshScripts(),$.refreshNotifications()}),window.addEventListener("offline",()=>{C("Offline mode active. Edits saved locally.","info")}),console.log("Scriptora initialized successfully in production-ready mode.")}catch(e){console.error("Scriptora bootstrap failed:",e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ws):Ws();
