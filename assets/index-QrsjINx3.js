(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();const ao={},oo="http://localhost:8000/api",gn=typeof import.meta<"u"&&ao?"/Scriptora/":"/",xt=gn.endsWith("/")?gn:`${gn}/`;async function Q(e,t={}){const s=`${oo}${e}`,n={headers:{"Content-Type":"application/json",...t.headers},...t};try{const o=await fetch(s,n);if(!o.ok){const a=await o.json().catch(()=>({}));throw new Error(a.error||`HTTP error ${o.status}`)}return await o.json()}catch(o){throw console.warn(`API call ${e} failed, falling back to local store:`,o.message),o}}const Ys=[{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",industry:"International / Hollywood",pages:96,updated:"12m ago",currentScene:"Scene 18",isCurrentDraft:!0,archived:!1,joinCode:"A7K9-XP42",logline:"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.",synopsis:"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves.",context:{format:"Feature",industry:"International / Hollywood",hours:1,minutes:36,seconds:0,plannedDuration:"01:36:00"},analysisScores:{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80}},{id:"the-neon-horizon",title:"The Neon Horizon",draft:"Draft 2.1",genre:"Sci-Fi",format:"Pilot",industry:"Streaming Television",pages:62,updated:"2h ago",currentScene:"Scene 4",isCurrentDraft:!1,archived:!1,joinCode:"N3ON-H0RZ",context:{format:"Pilot",industry:"Streaming Television",hours:0,minutes:52,seconds:0,plannedDuration:"00:52:00"},analysisScores:{overall:79,pacing:75,dialogue:84,emotion:80,characterArc:78,continuity:82,storyStructure:76,theme:88,cinema:83,formatting:90,production:72}},{id:"velvet-shadows",title:"Velvet Shadows",draft:"Draft 1.0",genre:"Noir",format:"Feature",industry:"Independent / Festival",pages:114,updated:"Yesterday",currentScene:"Scene 1",isCurrentDraft:!1,archived:!1,joinCode:"V3LV-SHDW",analysisScores:{overall:81,pacing:80,dialogue:86,emotion:79,characterArc:85,continuity:80,storyStructure:82,theme:84,cinema:88,formatting:92,production:76}},{id:"silent-echoes",title:"Silent Echoes",draft:"Draft 3.0",genre:"Psychological Thriller",format:"Feature",industry:"International / Hollywood",pages:104,updated:"3d ago",currentScene:"Scene 22",isCurrentDraft:!1,archived:!1,joinCode:"SLNT-ECH0",analysisScores:{overall:84,pacing:86,dialogue:81,emotion:88,characterArc:83,continuity:85,storyStructure:89,theme:82,cinema:84,formatting:91,production:78}},{id:"glass-kingdoms",title:"Glass Kingdoms",draft:"Draft 1.4",genre:"Fantasy",format:"Pilot",industry:"Streaming Television",pages:58,updated:"1w ago",currentScene:"Scene 8",isCurrentDraft:!1,archived:!1,joinCode:"GLSS-KNGD",analysisScores:{overall:78,pacing:74,dialogue:80,emotion:76,characterArc:82,continuity:75,storyStructure:80,theme:86,cinema:82,formatting:88,production:70}},{id:"red-shift",title:"Red Shift",draft:"Draft 2.0",genre:"Action",format:"Short",industry:"Independent / Festival",pages:28,updated:"2w ago",currentScene:"Scene 5",isCurrentDraft:!1,archived:!1,joinCode:"RED2-SHFT",analysisScores:{overall:83,pacing:90,dialogue:78,emotion:75,characterArc:80,continuity:88,storyStructure:84,theme:80,cinema:89,formatting:95,production:82}}];async function ya(){try{const e=await Q("/auth/me");return e&&"user"in e?e.user?(localStorage.setItem("scriptora_user",JSON.stringify(e.user)),e.user):(localStorage.removeItem("scriptora_user"),null):e?.user||null}catch{const e=localStorage.getItem("scriptora_user");if(e)try{const t=JSON.parse(e);if(t&&(t.displayName||t.email||t.id))return t}catch{}return null}}async function lo(e){try{const t=await Q("/auth/login",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-1",name:e.email?e.email.split("@")[0]:"Arun Kumar",displayName:e.email?e.email.split("@")[0]:"Arun Kumar",email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Narrative Director",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function io(e={}){try{const t=await Q("/auth/login",{method:"POST",body:JSON.stringify({...e,provider:"google"})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t=e.displayName||e.name||(e.email?e.email.split("@")[0]:"Google Filmmaker"),s=t.split(" ").map(o=>o[0]).filter(Boolean).slice(0,2).join("").toUpperCase()||"GF",n={id:e.sub||`google-${Date.now()}`,name:t,displayName:t,email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Film Director",badge:"Member Pro",initials:s,avatar:e.picture||e.photoURL||null,avatarUrl:e.picture||e.photoURL||null,provider:"google",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(n)),n}}async function ro(e){try{const t=await Q("/auth/register",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:`user-${Date.now()}`,name:e.name||"New Writer",displayName:e.name||"New Writer",email:e.email||"writer@scriptora.studio",headline:"Screenwriter",badge:"Member Pro",initials:(e.name||"NW").slice(0,2).toUpperCase(),stats:{drafts:1,coAuthors:0,healthIndex:"100%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function co(e){try{const t=await Q("/auth/otp",{method:"POST",body:JSON.stringify({phone:e})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-phone",name:"Verified Writer",displayName:"Verified Writer",headline:"Screenwriter",email:e,badge:"Member Pro",initials:"VW",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}function An(){localStorage.removeItem("scriptora_user"),localStorage.removeItem("scriptora_scripts"),localStorage.removeItem("scriptora_selected_script");const e=[];try{for(let t=0;t<localStorage.length;t++){const s=localStorage.key(t);s&&(s.startsWith("scriptora_screenplay_")||s.startsWith("scriptora_prod_")||s.startsWith("scriptora_storyboard_"))&&e.push(s)}for(const t of e)localStorage.removeItem(t)}catch(t){console.warn("Local storage purge notice:",t)}try{sessionStorage.clear()}catch{}}async function va(){try{await Q("/auth/logout",{method:"POST"})}catch(e){console.warn("Server logout notice:",e.message)}return An(),{success:!0}}async function po(e){const t=(e||"").trim();if(t.toUpperCase()!=="DELETE MY ACCOUNT")throw new Error('Confirmation mismatch. Please type "DELETE MY ACCOUNT" exactly to confirm account deletion.');try{const s=await Q("/auth/delete-account",{method:"POST",body:JSON.stringify({confirmation:t})});return An(),s}catch(s){if(!s.status||s.message?.includes("404")||s.message?.includes("Failed to fetch")||s.message?.includes("NetworkError")||s.message?.includes("Load failed"))return An(),{success:!0,message:"Account and associated personal records have been permanently deleted."};throw s}}async function bt(e=""){try{const n=e?`/scripts?q=${encodeURIComponent(e)}`:"/scripts",o=await Q(n);if(o.scripts&&Array.isArray(o.scripts)){localStorage.setItem("scriptora_scripts",JSON.stringify(o.scripts));let a=o.scripts;return e&&(a=a.filter(i=>i.title.toLowerCase().includes(e.toLowerCase()))),a}}catch{}const t=localStorage.getItem("scriptora_scripts");let s;if(t!==null)try{s=JSON.parse(t),Array.isArray(s)||(s=[...Ys],localStorage.setItem("scriptora_scripts",JSON.stringify(s)))}catch{s=[...Ys],localStorage.setItem("scriptora_scripts",JSON.stringify(s))}else s=[...Ys],localStorage.setItem("scriptora_scripts",JSON.stringify(s));return e&&(s=s.filter(n=>n.title.toLowerCase().includes(e.toLowerCase()))),s}async function an(e){try{const s=await Q(`/scripts/${e}`);if(s.script)return s.script}catch{}const t=await bt();return t.find(s=>s.id===e)||Ys.find(s=>s.id===e)||t[0]||null}async function uo(e){const t=(e.title||"untitled").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")||`script-${Date.now()}`,s={id:t,title:e.title||"Untitled Screenplay",draft:"Draft 1.0",pageCount:1,wordCount:0,scenes:[{id:"scene-1",number:1,slugline:"",blocks:[{id:`b-${Date.now()}-1`,type:"scene",content:""}]}]};try{const l=await Q("/scripts",{method:"POST",body:JSON.stringify(e)});if(l.script){s.id=l.script.id,s.title=l.script.title,localStorage.setItem(`scriptora_screenplay_${l.script.id}`,JSON.stringify(s)),await on(l.script.id,s).catch(()=>{});const f=(await bt()).map(u=>({...u,isCurrentDraft:!1}));return localStorage.setItem("scriptora_scripts",JSON.stringify([l.script,...f.filter(u=>u.id!==l.script.id)])),localStorage.setItem("scriptora_selected_script",l.script.id),l.script}}catch{}const n={id:t,title:e.title||"Untitled Screenplay",draft:"Draft 1.0",genre:e.genre||"Drama",format:e.format||"Feature",industry:e.industry||"International / Hollywood",pages:1,updated:"Just now",currentScene:"Scene 1",isCurrentDraft:!0,joinCode:`${Math.random().toString(36).substring(2,6).toUpperCase()}-${Math.random().toString(36).substring(2,6).toUpperCase()}`,archived:!1,context:{format:e.format||"Feature",industry:e.industry||"International / Hollywood",hours:1,minutes:30,seconds:0,plannedDuration:"01:30:00"},analysisScores:{overall:80,pacing:78,dialogue:80,emotion:80,characterArc:78,continuity:80,storyStructure:80,theme:80,cinema:80,formatting:90,production:75}};localStorage.setItem(`scriptora_screenplay_${n.id}`,JSON.stringify(s));const a=(await bt()).map(l=>({...l,isCurrentDraft:!1})),i=[n,...a.filter(l=>l.id!==n.id)];return localStorage.setItem("scriptora_scripts",JSON.stringify(i)),localStorage.setItem("scriptora_selected_script",n.id),n}async function mo(e){if(!e)return await bt();try{const n=await Q(`/scripts/${e}/current-draft`,{method:"POST"});if(n&&n.script){const a=(await bt()).map(i=>({...i,isCurrentDraft:i.id===e,updated:i.id===e?"Just now":i.updated}));return localStorage.setItem("scriptora_scripts",JSON.stringify(a)),localStorage.setItem("scriptora_selected_script",e),a}}catch{}const s=(await bt()).map(n=>({...n,isCurrentDraft:n.id===e,updated:n.id===e?"Just now":n.updated}));return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),localStorage.setItem("scriptora_selected_script",e),s}async function fo(e,t){try{const o=await Q(`/scripts/${e}`,{method:"PUT",body:JSON.stringify(t)});if(o.script){const i=(await bt()).map(l=>l.id===e?o.script:l);return localStorage.setItem("scriptora_scripts",JSON.stringify(i)),o.script}}catch{}const n=(await bt()).map(o=>o.id===e?{...o,...t,updated:"Just now"}:o);return localStorage.setItem("scriptora_scripts",JSON.stringify(n)),{id:e,...t,updated:"Just now"}}async function xo(e){try{await Q(`/scripts/${e}`,{method:"DELETE"})}catch{}const t=await bt(),n=t.find(i=>i.id===e)?.isCurrentDraft;let o=t.filter(i=>i.id!==e);return n&&o.length>0&&(o[0].isCurrentDraft=!0),localStorage.setItem("scriptora_scripts",JSON.stringify(o)),localStorage.removeItem(`scriptora_screenplay_${e}`),localStorage.getItem("scriptora_selected_script")===e&&(o.length>0?localStorage.setItem("scriptora_selected_script",o[0].id):localStorage.removeItem("scriptora_selected_script")),{success:!0}}async function go(e){try{const a=await Q(`/scripts/${e}/duplicate`,{method:"POST"});if(a.script){const i=await bt();return localStorage.setItem("scriptora_scripts",JSON.stringify([a.script,...i])),a.script}}catch{}const t=await an(e),s={...t,id:`${e}-copy-${Date.now().toString().slice(-4)}`,title:`${t?.title||"Script"} (Copy)`,updated:"Just now"},n=await bt(),o=[s,...n];return localStorage.setItem("scriptora_scripts",JSON.stringify(o)),s}async function bo(e){try{await Q(`/scripts/${e}/archive`,{method:"POST"})}catch{}const s=(await bt()).map(n=>n.id===e?{...n,archived:!0,updated:"Just now"}:n);return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),{success:!0}}const Ln={id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pageCount:5,wordCount:14280,titlePage:{title:"CHRONICLES OF DUST",author:"Arun Kumar",contact:"Scriptora Studio · arun.kumar@scriptora.studio · +1 (555) 019-2834",notes:"An original screenplay. Draft 4.2 Production Cut."},settings:{sceneNumbers:!0,sceneNumberSide:"left",smartFormatting:!0,fontSize:"12pt",lineSpacing:"1.5",language:"English"},acts:[{id:"act-1",name:"ACT I - The Broken Siphon"},{id:"act-2",name:"ACT II - The Pressure Surge"},{id:"act-3",name:"ACT III - The Floodgate Standoff"}],characters:["KEVIN","MEERA","HARI","AKASH"],locations:["INT. HOME","INT. PORT AUDIT ROOM","INT. CUSTOMS OFFICE","EXT. FLOODGATE GANTRY"],times:["DAY","NIGHT","CONTINUOUS","DAWN","DUSK","LATER","MORNING","EVENING"],transitions:["CUT TO:","FADE IN:","FADE OUT.","DISSOLVE TO:","SMASH CUT TO:","MATCH CUT TO:","JUMP CUT TO:"],scenes:[{id:"scene-1",number:1,actId:"act-1",slugline:"INT. HOME - EVENING",blocks:[{id:"b-1-1",type:"scene",content:"INT. HOME - EVENING"},{id:"b-1-2",type:"action",content:"There stands a woman."},{id:"b-1-3",type:"character",content:"HARI"},{id:"b-1-4",type:"dialogue",content:"Who is that?"},{id:"b-1-5",type:"character",content:"AKASH"},{id:"b-1-6",type:"dialogue",content:"How do I know?"},{id:"b-1-7",type:"action",content:"Both leaves the place."}]},{id:"scene-4",number:4,actId:"act-1",slugline:"INT. PORT AUDIT ROOM - DAY",blocks:[{id:"b-4-1",type:"scene",content:"INT. PORT AUDIT ROOM - DAY"},{id:"b-4-2",type:"action",content:"Kevin stamps irregular cargo manifests to keep peace with union superiors."},{id:"b-4-3",type:"character",content:"KEVIN"},{id:"b-4-4",type:"dialogue",content:"The manifests are sealed."}]},{id:"scene-18",number:18,actId:"act-2",slugline:"INT. CUSTOMS OFFICE - NIGHT",blocks:[{id:"b-18-1",type:"scene",content:"INT. CUSTOMS OFFICE - NIGHT"},{id:"b-18-2",type:"action",content:"Kevin kneels over the cracked hydro-sensor junction box. Static hiss whispers through the damp comm-link. A lone flicker illuminates the tarnished brass seal."},{id:"b-18-3",type:"action",content:"Water droplets bead along the corroded circuit wires. He slides a copper probe between the connectors."},{id:"b-18-4",type:"character",content:"KEVIN"},{id:"b-18-5",type:"parenthetical",content:"(whispering into comm)"},{id:"b-18-6",type:"dialogue",content:"If the seals break before dawn, the sector won't hold the surge."},{id:"b-18-7",type:"character",content:"MEERA (O.S.)"},{id:"b-18-8",type:"dialogue",content:"Then don't let them break. Reroute the secondary relay through the floodgate breaker."},{id:"b-18-9",type:"transition",content:"CUT TO:"}]}]};async function ho(e){let t=null;try{const i=await Q(`/screenplay/${e}`);i.screenplay&&i.screenplay.scenes&&(t=i.screenplay)}catch{}if(!t){const i=localStorage.getItem(`scriptora_screenplay_${e}`);if(i)try{const l=JSON.parse(i);l&&l.scenes&&(t=l)}catch{}}if(e==="chronicles-of-dust"){if(!t||!t.scenes||t.scenes.length===0){const i=JSON.parse(JSON.stringify(Ln));return i.id=e,localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(i)),i}return t}if(t&&(i=>!i||!Array.isArray(i.scenes)?!1:i.scenes.some(l=>{const r=(l.slugline||"").toUpperCase();return r.includes("WRITER'S ROOM")||r.includes("STUDIO - DAY")||r.includes("NEW SCENE - DAY")?!0:(l.blocks||[]).some(f=>{const u=f.content||"";return u.includes("Sunlight cuts through dust motes")||u.includes("A blank script page waits")||u.includes("Type your screenplay action here")})}))(t)&&(t=null),t)return t;const o=await an(e),a={id:e||"script_01",title:o?.title||"Untitled Screenplay",draft:"Draft 1.0",pageCount:1,wordCount:0,scenes:[{id:"scene-1",number:1,slugline:"",blocks:[{id:`b-${Date.now()}-1`,type:"scene",content:""}]}]};return localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(a)),on(e,a).catch(()=>{}),a}async function on(e,t){localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(t));try{return await Q(`/screenplay/${e}`,{method:"PUT",body:JSON.stringify({screenplay:t})})}catch{return{success:!0}}}async function yo(e){try{return(await Q(`/versions/${e}`)).versions}catch{return[{id:"v-4.2",name:"Draft 4.2",tag:"Current Active",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:"Refined Meera O.S. dialogue and hydro-sensor action line.",isCurrent:!0},{id:"v-3.0",name:"Draft 3.0",tag:"Production Polish",timestamp:"Yesterday, 4:15 PM",author:"JD",stats:"94 pages · 13,950 words",notes:"Incorporated director notes on floodgate transition pacing.",isCurrent:!1},{id:"v-2.0",name:"Draft 2.0",tag:"First Table Read",timestamp:"Oct 12, 2024",author:"JD",stats:"90 pages · 13,200 words",notes:"Table read revision for Acts I & II character arcs.",isCurrent:!1}]}}async function vo(e,t){try{return(await Q(`/versions/${e}`,{method:"POST",body:JSON.stringify(t)})).version}catch{return{id:`v-${Date.now()}`,name:t.name,tag:"Milestone Snapshot",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:t.notes||"",isCurrent:!0}}}async function wo(e){try{return(await Q(`/collaborators/${e}`)).collaborators}catch{return[{id:"c-1",name:"Heamanth S.",email:"heamanth@studio.com",initials:"HS",role:"Editor",avatarBg:"bg-blue-100 text-blue-700",status:"Active",added:"2d ago"},{id:"c-2",name:"Elena Rostova",email:"elena@cineworks.io",initials:"ER",role:"Script Doctor",avatarBg:"bg-amber-100 text-amber-700",status:"Active",added:"1w ago"},{id:"c-3",name:"Marcus Vance",email:"vance.prod@paramount.com",initials:"MV",role:"Producer",avatarBg:"bg-purple-100 text-purple-700",status:"Viewer",added:"2w ago"}]}}async function So(e,t){try{return(await Q(`/collaborators/${e}/invite`,{method:"POST",body:JSON.stringify(t)})).collaborator}catch{return{id:`c-${Date.now()}`,name:t.email.split("@")[0],email:t.email,initials:t.email.substring(0,2).toUpperCase(),role:t.role==="editor"?"Editor":"Viewer",avatarBg:"bg-emerald-100 text-emerald-700",status:"Active",added:"Just now"}}}async function Eo(e,t){try{return await Q(`/collaborators/${e}/${t}`,{method:"DELETE"})}catch{return{success:!0}}}async function ko(e){try{return(await Q("/join-code/generate",{method:"POST",body:JSON.stringify({scriptId:e})})).joinCode}catch{return Math.random().toString(36).substring(2,6).toUpperCase()+"-"+Math.random().toString(36).substring(2,6).toUpperCase()}}async function Io(e){try{return await Q("/join-code/validate",{method:"POST",body:JSON.stringify({code:e})})}catch{return(e||"").toUpperCase().trim()==="A7K9-XP42"?{valid:!0,script:{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",pages:96,collaboratorCount:3}}:{valid:!1,error:"Invalid or expired join code"}}}async function Co(e){try{return await Q("/join-code/redeem",{method:"POST",body:JSON.stringify({code:e})})}catch{return{success:!0,scriptId:"chronicles-of-dust",title:"Chronicles of Dust"}}}async function wa(){try{return await Q("/notifications")}catch{return{notifications:[{id:1,sender:"HS",senderName:"Heamanth",type:"collaboration_invite",title:"Heamanth invited you to collaborate",body:'Added you as an Editor on "Chronicles of Dust" (Draft 4.2).',time:"12m ago",group:"today",unread:!0,tags:["Draft 4.2","Role: Editor"],actionLabel:"Review Access →",actionRoute:"/profile/collaborators"},{id:2,sender:"icon:description",type:"export_ready",title:"Your export is ready",body:'"Chronicles of Dust (Draft 4.2)" exported as standard Industry PDF.',time:"45m ago",group:"today",unread:!0,tags:["PDF","96 Pages"],actionLabel:"Open Screenplay →",actionRoute:"/editor/chronicles-of-dust"},{id:3,sender:"AK",senderName:"Arun K.",type:"join_code_request",title:"Join-code access request",body:'Requested Editor access to "Anbin Mozhi" via join-code A7K9-XP42.',time:"2h ago",group:"today",unread:!0,tags:["Code: A7K9-XP42"],actionLabel:"Manage Collaborators →",actionRoute:"/profile/collaborators"}],unreadCount:3}}}async function Ao(e){try{return await Q(`/notifications/${e}/read`,{method:"POST"})}catch{return{success:!0}}}async function $o(){try{return await Q("/notifications/read-all",{method:"POST"})}catch{return{success:!0}}}async function ea(){return(await wa()).unreadCount||0}async function bn(e){try{const t=await Q("/profile",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.profile)),t.profile}catch{const s={...await ya()||{},...e};if(e.name){const n=e.name.trim().split(/\s+/);s.initials=((n[0]?.[0]||"A")+(n[1]?.[0]||"")).toUpperCase(),s.displayName=e.name}return localStorage.setItem("scriptora_user",JSON.stringify(s)),s}}async function Sa(){try{return(await Q("/settings")).settings}catch{const e=localStorage.getItem("scriptora_settings");return e?JSON.parse(e):{editor:{autoSceneHeading:!0,autoCharacter:!0,autoTransition:!0,enterAfterAction:!0,tabAfterAction:!0,autoCapitalize:!0,continueDialogue:!0,showSceneNumbers:!0,lockSceneNumbers:!1,fontSize:"Courier Prime 12pt",lineSpacing:"1.5 line",focusMode:!1},language:"English (US)",appearance:"Light",notifications:{collaborationInvites:!0,collaborationEdits:!0,mentions:!0,versionMilestones:!0},intelligence:{querySuggestions:!0,analysisSuggestions:!0}}}}async function Bo(e){try{const t=await Q("/settings",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_settings",JSON.stringify(t.settings)),t.settings}catch{const s={...await Sa(),...e};return localStorage.setItem("scriptora_settings",JSON.stringify(s)),s}}async function No(e,t){try{return(await Q(`/intelligence/${e}/context`,{method:"PUT",body:JSON.stringify(t)})).context}catch{return t}}async function Dn(e,t){try{return(await Q("/intelligence/query",{method:"POST",body:JSON.stringify({query:e,scriptId:t})})).answer}catch{return"Analysis: In this screenplay, scene tempo and dialogue density align with core narrative milestones. Characters express distinct agendas in each beat."}}async function To(e="chronicles-of-dust"){try{const o=await Q(`/production/${e}`);if(o?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(o.workspace)),o.workspace}catch{}const t=localStorage.getItem(`scriptora_prod_ws_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=await an(e),n={id:`prod-ws-${e}`,projectId:"proj-1",projectName:"Badlands Anthology",scriptId:e,screenplayTitle:s?.title||"Chronicles of Dust",pinnedSourceVersion:s?.draft||"Draft 4.2",pinnedSourceVersionHash:"v4.2-snap-88f2",pinnedTimestamp:"12m ago",currentScriptDraft:s?.draft||"Draft 4.2",isStale:!1,mode:localStorage.getItem("scriptora_prod_mode")||"simple",userRole:localStorage.getItem("scriptora_prod_role")||"Owner",roles:["Owner","Director","Assistant Director","Production","Department Member","Viewer"],stats:{totalScenes:18,breakdownElements:78,callSheetsCount:2,shootingDays:14,pendingProposals:2,completedApprovals:6},updatedAt:new Date().toISOString()};return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n)),n}async function Po(e,t){try{const n=await Q(`/production/${e}/pin`,{method:"POST",body:JSON.stringify({version:t})});if(n?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n.workspace)),n.workspace}catch{}const s=await To(e);return s.pinnedSourceVersion=t,s.pinnedTimestamp="Just now",s.isStale=!1,localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(s)),s}async function fs(e="chronicles-of-dust"){try{const o=await Q(`/production/${e}/scenes`);if(o?.scenes)return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(o.scenes)),o.scenes}catch{}const t=localStorage.getItem(`scriptora_prod_scenes_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[],n=[{num:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",intExt:"EXT",dayNight:"DAY",p:"4 1/8",comp:"Moderate",day:"Day 1 of 7",cast:["KEVIN","MARCUS"],desc:"Wind whips dust across perimeter chain link. Kevin arrives at customs gate."},{num:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",intExt:"INT",dayNight:"DAY",p:"3 4/8",comp:"Simple",day:"Day 1 of 7",cast:["KEVIN","MEERA"],desc:"Meera analyzes telemetry console indicating illegal pressure drop."},{num:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",intExt:"EXT",dayNight:"DUSK",p:"7 2/8",comp:"Complex",day:"Day 2 of 7",cast:["KEVIN"],desc:"Concrete conduit pipeline across cracked alkali flats during sunset."},{num:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",intExt:"EXT",dayNight:"NIGHT",p:"5 0/8",comp:"Complex",day:"Day 3 of 7",cast:["KEVIN","MEERA"],desc:"Perimeter night patrol with solar rover and surveillance drones."},{num:5,heading:"INT. HYDRAULIC VALVE TUNNEL - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"5 4/8",comp:"Moderate",day:"Day 3 of 7",cast:["KEVIN"],desc:"Rusty underground valves with echoing industrial turbine vibration."},{num:6,heading:"EXT. DESERT SERVICE ROAD - DAY",intExt:"EXT",dayNight:"DAY",p:"5 2/8",comp:"Simple",day:"Day 4 of 7",cast:["KEVIN"],desc:"Kevin tracks tanker tire treads along decommissioned asphalt."},{num:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",intExt:"INT",dayNight:"DAY",p:"6 3/8",comp:"Moderate",day:"Day 5 of 7",cast:["COMMANDER VANCE","KEVIN"],desc:"Vance oversees regional water diversion bank from glass observatory."},{num:8,heading:"EXT. RESERVOIR INTAKE BASIN - DAY",intExt:"EXT",dayNight:"DAY",p:"5 5/8",comp:"Complex",day:"Day 6 of 7",cast:["MEERA"],desc:"Rappelling 60-foot descent down drained concrete spillway."},{num:9,heading:"INT. DRAINAGE VAULT - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"4 1/8",comp:"Moderate",day:"Day 7 of 7",cast:["KEVIN","MEERA"],desc:"Subterranean acoustic surveillance using directional hydrophones."},{num:10,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"2 6/8",comp:"Complex",day:"Day 2 of 7",cast:["KEVIN","MEERA"],desc:"Kevin anchors hydraulic bypass valve kit as high pressure brine seals."}];for(const o of n)s.push({id:`scene-${o.num}`,sceneNumber:o.num,scriptId:e,heading:o.heading,intExt:o.intExt,dayNight:o.dayNight,pages:o.p,complexity:o.comp,shootDay:o.day,status:o.num===4?"Needs Review":"Scheduled",snippet:o.desc,directorNotes:`Director visual notes for ${o.heading}. Maintain high contrast lighting.`,continuityNotes:"Continuity reference logged against Draft 4.2.",cast:o.cast,sidesReady:!0});return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(s)),s}async function Lo(e,t){try{const i=await Q(`/production/${e}/scenes/${t}`);if(i?.scene)return i.scene}catch{}const n=(await fs(e)).find(i=>i.id===t||String(i.sceneNumber)===String(t));if(!n)return null;const a=(await jt(e)).filter(i=>i.sceneId===n.id||i.sceneNumber===n.sceneNumber||Array.isArray(i.scenes)&&i.scenes.includes(n.sceneNumber));return{...n,elements:a}}async function As(e,t,s){try{const a=await Q(`/production/${e}/scenes/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.scene)return a.scene}catch{}const n=await fs(e),o=n.find(a=>a.id===t||String(a.sceneNumber)===String(t));return o?(Object.assign(o,s),localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(n)),o):s}async function jt(e="chronicles-of-dust",t=null,s=null){try{const a=new URLSearchParams;t&&a.set("category",t),s&&a.set("scene",s);const i=a.toString()?`?${a.toString()}`:"",l=await Q(`/production/${e}/breakdown${i}`);if(l?.breakdown)return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(l.breakdown)),l.breakdown}catch{}const n=localStorage.getItem(`scriptora_prod_breakdown_${e}`);let o=[];if(n)try{o=JSON.parse(n)}catch{}if(o.length||(o=[{id:"elem-1",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[1,2,4,18],category:"Cast",name:"KEVIN",characterRole:"Discredited hydro-engineer, 30s. Hero protagonist.",description:"Discredited hydro-engineer, 30s. Hero protagonist.",assignedActor:"Dev Patel",castingStatus:"Confirmed Cast",actorAvailability:"Available Shoot Days 1-14",appearancesCount:4,sourceSnippet:"Kevin kneels over cracked hydro-sensor junction box, static hissing from the diagnostic speaker.",originalAiSuggestion:"KEVIN — Discredited hydro-engineer, 30s. Hero protagonist.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Requires desert dust protective gear and waterproof boots."},{id:"elem-2",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[4,16,18],category:"Cast",name:"MEERA",characterRole:"Field operative with tactical harness.",description:"Field operative with tactical harness.",assignedActor:"Zoe Saldana",castingStatus:"Confirmed Cast",actorAvailability:"Available Shoot Days 4-18",appearancesCount:3,sourceSnippet:"Meera anchors her cable to the iron pylon, visor reflecting the rising floodwaters below.",originalAiSuggestion:"MEERA — Field operative with tactical harness.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Tactical harness fitted for scene 18 valve climb."},{id:"elem-3",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Props",name:"Hydraulic Bypass Valve Kit",description:"Custom machined valve kit with functional digital LED pressure display.",sourcingType:"Hero Prop Built",quantity:"1 Hero + 2 Stunt Duplicates",readinessStatus:"Ready in Art Dept",continuityNotes:"Clean in Sc 1, weathered with grease in Sc 18",sourceSnippet:"Kevin clicks the bypass manifold into place. The gauge needles spike red.",originalAiSuggestion:"Hydraulic Bypass Valve Kit — machined valve kit with LED display.",status:"Confirmed",isHumanConfirmed:!0,confidence:.95,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero prop constructed by art department; 2 stunt duplicates on standby."},{id:"elem-4",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Practical FX",name:"High-Pressure Water Spray",description:"Controlled water burst simulating cracked pipe joint failure.",requiredResources:"Dedicated 4000L Water Tanker, 120 PSI Pump Rig",technicalRequirements:"Safe water containment basins, electrical shut-off triggers",safetyNotes:"Non-slip decking mandatory; waterproof protective ponchos for camera crew",prepStatus:"Rig Test Scheduled",sourceSnippet:"A burst of pressurized brine shoots from the seam, blinding the chamber.",originalAiSuggestion:"High-Pressure Water Spray — Controlled water burst simulating cracked pipe failure.",status:"Needs Review",isHumanConfirmed:!1,confidence:.88,confirmedBy:null,confirmedAt:null,notes:"SFX coordinator requested dedicated water truck standby via Proposal #prop-1."},{id:"elem-5",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Stunts",name:"Valve Pylon Cable Rappel",description:"Meera swings 18 feet across open valve chasm to catch emergency release lever.",coordinationRequirements:"18ft wire pendulum rig, decelerator line, safety crash matting",qualifiedPersonnel:"Stunt Double: Tara Sen / Stunt Coordinator: Roy Hall",safetyPlanningStatus:"Awaiting Coordinator Review",sourceSnippet:"Meera kicks off the catwalk, swinging into the spray as the iron cable groans.",originalAiSuggestion:"Valve Pylon Cable Rappel — 18ft swing across chasm to catch lever.",status:"Needs Review",isHumanConfirmed:!1,confidence:.92,confirmedBy:null,confirmedAt:null,notes:"Awaiting Stunt Coordinator risk assessment and harness certification."},{id:"elem-13",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Locations",name:"Sub-Level Hydro-Chamber B",description:"Industrial concrete pumping cavern with rusty iron catwalks.",context:"INT.",lighting:"NIGHT",locationStatus:"Secured & Permitted",accessDetails:"Permit #WTR-994, Access via Gate 4 Service Tunnel",sourceSnippet:"INT. HYDRO-CHAMBER B - NIGHT. Rust-eaten steel catwalks suspend over deep abyss.",originalAiSuggestion:"Sub-Level Hydro-Chamber B — Concrete pumping cavern with catwalks.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Acoustic echo requires directional shotgun mics; non-slip floor treatment applied."},{id:"elem-6",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Costumes",name:"Kevin — Weathered Dust Coat & Respirator",character:"KEVIN",description:"Heavy canvas duster coat, solar respirator around neck.",wardrobeRequirements:"Duster coat with distressed seam stitching, respirator with worn elastic straps",continuityChanges:"Costume Stage 1 (Desert Dust / Dry)",prepStatus:"Fitted & Approved",sourceSnippet:"KEVIN (30s), sun-scoured and weary, adjusts his solar filter.",originalAiSuggestion:"Kevin — Duster coat, respirator around neck.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Costume fitting complete with wardrobe dept."},{id:"elem-7",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Cast",name:"MARCUS",characterRole:"Border outpost security guard.",description:"Border outpost security guard.",assignedActor:"Unassigned (Auditioning)",castingStatus:"Auditioning",actorAvailability:"Day 1 Shoot Only",appearancesCount:1,sourceSnippet:"MARCUS leans against the chain link, tapping an unlit cigarette against his wrist.",originalAiSuggestion:"MARCUS — Border outpost security guard.",status:"Confirmed",isHumanConfirmed:!0,confidence:.98,confirmedBy:"Elena Rostova",confirmedAt:"2026-10-13T16:00:00Z",notes:"Supporting role. Day 1 shoot only."},{id:"elem-8",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Props",name:"Solar Filter Dust Goggles",description:"Tinted goggles with worn leather straps.",sourcingType:"Hero Wardrobe Prop",quantity:"2 Pairs (A & B Camera)",readinessStatus:"Ready in Art Dept",continuityNotes:"Worn over eyes during wind gusts, rest on forehead indoors",sourceSnippet:"Kevin pulls the goggles over his eyes as a gust hits.",originalAiSuggestion:"Solar Filter Dust Goggles — Tinted goggles with worn leather straps.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero wardrobe prop."},{id:"elem-9",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Vehicles",name:"Solar Patrol Rover (Modified)",description:"Lightweight dune rover fitted with dual photovoltaic roof panels.",availability:"On Set Shoot Days 1 & 2",operationalRequirements:"Charging station in Base Camp, Art Dept weathering wrap",prepStatus:"Checked In & Inspected",sourceSnippet:"The rover sits idling beside Gate 4, suspension coated in red grit.",originalAiSuggestion:"Solar Patrol Rover (Modified) — Dune rover with dual photovoltaic roof panels.",status:"Confirmed",isHumanConfirmed:!0,confidence:.96,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Picture vehicle running on electric battery. Backup battery pack required."},{id:"elem-10",scriptId:e,sceneId:"scene-4",sceneNumber:4,scenes:[4],category:"Props",name:"Night-Vision Monocular Scope",description:"Military grade digital thermal optics.",sourcingType:"Rented",quantity:"1 Unit",readinessStatus:"Sourcing",continuityNotes:"Handheld by Meera on perimeter wall",sourceSnippet:"Meera scans the wire with her thermal monocle. Three glowing silhouettes freeze.",originalAiSuggestion:"Night-Vision Monocular Scope — Military grade digital thermal optics.",status:"Needs Review",isHumanConfirmed:!1,confidence:.85,confirmedBy:null,confirmedAt:null,notes:"Rental request pending vendor confirmation."},{id:"elem-11",scriptId:e,sceneId:"scene-7",sceneNumber:7,scenes:[7],category:"Cast",name:"COMMANDER VANCE",characterRole:"Antagonist, regional water syndicate director.",description:"Antagonist, regional water syndicate director.",assignedActor:"Michael Shannon",castingStatus:"Offer Out",actorAvailability:"Hold Oct 20-24",appearancesCount:2,sourceSnippet:"COMMANDER VANCE (50s), tailored gray linen, stands over the telemetry terminal.",originalAiSuggestion:"COMMANDER VANCE — Antagonist, regional water syndicate director.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Cast confirmed. Costume fitting scheduled Oct 20."},{id:"elem-12",scriptId:e,sceneId:"scene-16",sceneNumber:16,scenes:[16],category:"Practical FX",name:"Catwalk Rain Towers",description:"Simulated industrial torrential flood conditions on exterior catwalk.",requiredResources:"3 Overhead Rain Spars, 2 Fire Hydrant Ties",technicalRequirements:"Runoff water deflection channeling away from electrical stage lines",safetyNotes:"Safety harnesses mandatory on exterior catwalk scaffolding",prepStatus:"Pending Proposal Approval",sourceSnippet:"Water cascades down the spillway faces like Niagara.",originalAiSuggestion:"Catwalk Rain Towers — Simulated flood conditions on exterior catwalk.",status:"Needs Review",isHumanConfirmed:!1,confidence:.9,confirmedBy:null,confirmedAt:null,notes:"Requires environmental containment permits."}],localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(o))),t&&t!=="all"&&(o=o.filter(a=>a.category.toLowerCase()===t.toLowerCase())),s&&s!=="all"){const a=Number(String(s).replace("scene-",""));o=o.filter(i=>i.sceneId===s||String(i.sceneNumber)===String(s)||Array.isArray(i.scenes)&&i.scenes.includes(a)||i.sceneNumber===a)}return o}async function Ks(e,t,s){try{const a=await Q(`/production/${e}/breakdown/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.item){const i=await jt(e),l=i.findIndex(r=>r.id===t);return l!==-1&&(i[l]=a.item,localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(i))),a.item}}catch{}const n=await jt(e),o=n.find(a=>a.id===t);return o?((s.name&&s.name!==o.name||s.description&&s.description!==o.description)&&(o.userCorrection={previousName:o.name,previousDesc:o.description,correctedBy:"Arun Kumar (Owner)",correctedAt:new Date().toISOString()}),Object.assign(o,s),s.status==="Confirmed"?(o.isHumanConfirmed=!0,o.confirmedBy="Arun Kumar (Owner)",o.confirmedAt=new Date().toISOString()):s.status==="Needs Review"&&(o.isHumanConfirmed=!1),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(n)),o):s}async function Do(e,t){try{const o=await Q(`/production/${e}/breakdown/${t}`,{method:"DELETE"});if(o?.success){const i=(await jt(e)).filter(l=>l.id!==t);return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(i)),o}}catch{}const n=(await jt(e)).filter(o=>o.id!==t);return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(n)),{success:!0,removedId:t}}async function Ro(e,t){try{const a=await Q(`/production/${e}/breakdown`,{method:"POST",body:JSON.stringify(t)});if(a?.item){const i=await jt(e);return i.unshift(a.item),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(i)),a.item}}catch{}const s=await jt(e),n=Number(t.sceneNumber||(t.sceneId?String(t.sceneId).replace("scene-",""):18)),o={id:`elem-${Date.now()}`,scriptId:e,sceneId:t.sceneId||`scene-${n}`,sceneNumber:n,scenes:t.scenes||[n],category:t.category||"Props",name:t.name,description:t.description||"",sourceSnippet:t.sourceSnippet||"User added manual item",originalAiSuggestion:null,status:t.status||"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:new Date().toISOString(),notes:t.notes||"",assignedActor:t.assignedActor||"",castingStatus:t.castingStatus||"Uncast / Open",actorAvailability:t.actorAvailability||"",characterRole:t.characterRole||t.description||"",context:t.context||"INT.",lighting:t.lighting||"DAY",locationStatus:t.locationStatus||"Secured & Permitted",accessDetails:t.accessDetails||"",sourcingType:t.sourcingType||"Sourced",quantity:t.quantity||"1",readinessStatus:t.readinessStatus||"Ready in Art Dept",continuityNotes:t.continuityNotes||"",requiredResources:t.requiredResources||"",technicalRequirements:t.technicalRequirements||"",safetyNotes:t.safetyNotes||"",coordinationRequirements:t.coordinationRequirements||"",qualifiedPersonnel:t.qualifiedPersonnel||"",safetyPlanningStatus:t.safetyPlanningStatus||"Awaiting Coordinator Review",character:t.character||"",wardrobeRequirements:t.wardrobeRequirements||"",continuityChanges:t.continuityChanges||"",prepStatus:t.prepStatus||"In Prep",availability:t.availability||"",operationalRequirements:t.operationalRequirements||""};return s.unshift(o),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(s)),o}async function ss(e="chronicles-of-dust"){try{const n=await Q(`/production/${e}/call-sheets`);if(n?.callSheets)return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n.callSheets)),n.callSheets}catch{}const t=localStorage.getItem(`scriptora_prod_callsheets_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"cs-1",scriptId:e,callSheetNumber:"01",shootDay:"Day 1 of 7",shootDate:"Saturday, Oct 24, 2026",generalCrewCall:"06:00 AM",shootingCall:"06:30 AM",breakfastTime:"05:15 AM",estimatedWrap:"06:30 PM",status:"Confirmed",isPublished:!0,version:"v1.0",locationName:"Mojave Outpost Gate 4",locationAddress:"Perimeter Road 9, Cantil, CA 93519",parkingNotes:"Crew parking at Basecamp Lot B (1/4 mile west of gate). Shuttle runs every 10 mins.",nearestHospital:"Kern Valley Healthcare District, 6412 Laurel Ave, Lake Isabella, CA (Ph: 760-379-2681)",weatherSummary:"Sunny, 74°F high, 48°F low. Winds WNW 10-15 mph. Dust advisory after 4:00 PM.",scenes:[{sceneNumber:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",pages:"4 1/8",cast:["KEVIN","MARCUS"],desc:"Kevin arrives at border gate, inspection with Marcus."},{sceneNumber:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",pages:"3 4/8",cast:["KEVIN","MEERA"],desc:"Kevin discovers pressure loss on telemetry terminal."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MARCUS",actor:"David Chen",pickup:"05:15 AM",hmuCall:"05:45 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MEERA",actor:"Priya Sharma",pickup:"08:30 AM",hmuCall:"09:00 AM",onSet:"10:30 AM",status:"Confirmed"}],specialInstructions:"Eye protection mandatory for all crew on exterior perimeter due to afternoon dust squall.",approvedBy:"Arun Kumar (Owner)",publishedAt:"2026-10-14T08:00:00Z"},{id:"cs-2",scriptId:e,callSheetNumber:"02",shootDay:"Day 2 of 7",shootDate:"Sunday, Oct 25, 2026",generalCrewCall:"06:30 AM",shootingCall:"07:00 AM",breakfastTime:"05:45 AM",estimatedWrap:"07:00 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:"Pumping Station Chamber B",locationAddress:"Aqueduct District Facility 4, Mojave, CA 93501",parkingNotes:"Basecamp parking inside Gate 2 secure compound. Security clearance badge required.",nearestHospital:"Antelope Valley Medical Center, 1600 W Ave J, Lancaster, CA (Ph: 661-949-5000)",weatherSummary:"Interior stage / sheltered facility. Ambient temp 68°F. Hearing protection mandatory.",scenes:[{sceneNumber:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",pages:"7 2/8",cast:["KEVIN"],desc:"Kevin examines exterior tap line."},{sceneNumber:10,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",pages:"2 6/8",cast:["KEVIN","MEERA"],desc:"High water pressure valve breach and cable clamp."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"},{character:"MEERA",actor:"Priya Sharma",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"}],specialInstructions:"Wet set protocols in effect for Scene 10. Waterproof camera housing and electrical GFI circuits required.",approvedBy:null,publishedAt:null}];return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),s}async function ta(e,t){try{const n=await Q(`/production/${e}/call-sheets/${t}`);if(n?.callSheet)return n.callSheet}catch{}return(await ss(e)).find(n=>n.id===t)||null}async function Mo(e,t){try{const o=await Q(`/production/${e}/call-sheets`,{method:"POST",body:JSON.stringify(t)});if(o?.callSheet)return o.callSheet}catch{}const s=await ss(e),n={id:`cs-${Date.now()}`,scriptId:e,callSheetNumber:String(s.length+1).padStart(2,"0"),shootDay:t.shootDay||`Day ${s.length+1} of 14`,shootDate:t.shootDate||"Monday, Oct 26, 2026",generalCrewCall:t.generalCrewCall||"06:00 AM",shootingCall:t.shootingCall||"06:30 AM",breakfastTime:t.breakfastTime||"05:15 AM",estimatedWrap:t.estimatedWrap||"06:30 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:t.locationName||"Location TBD",locationAddress:t.locationAddress||"TBD",parkingNotes:t.parkingNotes||"Crew parking guidelines.",nearestHospital:t.nearestHospital||"Desert Care Network Regional, Palm Springs, CA",weatherSummary:t.weatherSummary||"Forecast pending.",scenes:t.scenes||[{sceneNumber:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",pages:"5 0/8",cast:["KEVIN","MEERA"],desc:"Perimeter fence inspection."}],castCalls:t.castCalls||[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Draft"}],specialInstructions:t.specialInstructions||"Standard safety directives.",approvedBy:null,publishedAt:null};return s.push(n),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),n}async function Oo(e,t,s){try{const a=await Q(`/production/${e}/call-sheets/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.callSheet)return a.callSheet}catch{}const n=await ss(e),o=n.find(a=>a.id===t);return o?(Object.assign(o,s),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n)),o):s}async function jo(e,t){try{const o=await Q(`/production/${e}/call-sheets/${t}/publish`,{method:"POST"});if(o?.callSheet)return o.callSheet}catch{}const s=await ss(e),n=s.find(o=>o.id===t);return n?(n.status="Confirmed",n.isPublished=!0,n.version="v1.0 (Snapshot)",n.approvedBy="Arun Kumar (Owner)",n.publishedAt=new Date().toISOString(),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),n):null}async function Pt(e="chronicles-of-dust"){try{const n=await Q(`/production/${e}/schedule`);if(n?.schedule)return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(n.schedule)),n.schedule}catch{}const t=localStorage.getItem(`scriptora_prod_schedule_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{dayNumber:1,date:"Oct 24, 2026",title:"Outpost Perimeter & Shed",location:"Mojave Gate 4",sceneNumbers:[1,2],totalPages:"7 5/8",estHours:10.5,companyMoves:0,isLocked:!0,status:"Confirmed"},{dayNumber:2,date:"Oct 25, 2026",title:"Lakebed Conduit & Chamber B",location:"Chamber B Dry Tank",sceneNumbers:[3,10],totalPages:"10 0/8",estHours:11,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:3,date:"Oct 26, 2026",title:"Perimeter Fence & Valve Tunnel",location:"Perimeter Sector 9",sceneNumbers:[4,5],totalPages:"10 4/8",estHours:11.5,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:4,date:"Oct 27, 2026",title:"Service Road Pursuit",location:"Route 66 Cutoff",sceneNumbers:[6],totalPages:"5 2/8",estHours:8,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:5,date:"Oct 28, 2026",title:"Syndicate Regional Control",location:"Syndicate Regional HQ",sceneNumbers:[7],totalPages:"6 3/8",estHours:9,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:6,date:"Oct 29, 2026",title:"Reservoir Intake Rappel",location:"Lake Mead Dry Spillway",sceneNumbers:[8],totalPages:"5 5/8",estHours:10,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:7,date:"Oct 30, 2026",title:"Drainage Sub-vaults & Wrap",location:"Vault Sub-structure 3",sceneNumbers:[9],totalPages:"4 1/8",estHours:8.5,companyMoves:0,isLocked:!1,status:"Draft"}];return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(s)),s}async function Vt(e,t,s){try{const a=await Q(`/production/${e}/schedule/day/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.day)return a.day}catch{}const n=await Pt(e),o=n.find(a=>a.dayNumber===Number(t));return o?(Object.assign(o,s),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(n)),o):s}async function _o(e,t,s,n){const o=await Pt(e),a=o.find(l=>l.dayNumber===Number(s)),i=o.find(l=>l.dayNumber===Number(n));return!a||!i||(a.sceneNumbers=(a.sceneNumbers||[]).filter(l=>l!==Number(t)),(i.sceneNumbers||[]).includes(Number(t))||(i.sceneNumbers=[...i.sceneNumbers||[],Number(t)]),await Vt(e,s,{sceneNumbers:a.sceneNumbers}),await Vt(e,n,{sceneNumbers:i.sceneNumbers})),o}async function sa(e,t,s){return await Vt(e,t,{sceneNumbers:s})}async function na(e,t){try{const o=await Q(`/production/${e}/call-sheets/${t}`,{method:"DELETE"});if(o?.success){const i=(await ss(e)).filter(l=>l.id!==t);return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(i)),o}}catch{}const n=(await ss(e)).filter(o=>o.id!==t);return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n)),{success:!0,removedId:t}}async function Fo(e,t){try{const a=await Q(`/production/${e}/schedule/day`,{method:"POST",body:JSON.stringify(t)});if(a?.day){const i=await Pt(e);return i.push(a.day),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(i)),a.day}}catch{}const s=await Pt(e),n=s.length>0?Math.max(...s.map(a=>a.dayNumber))+1:1,o={dayNumber:t.dayNumber||n,date:t.date||`Nov ${String(n).padStart(2,"0")}, 2026`,title:t.title||`Shoot Day ${n}`,location:t.location||"Location TBD",sceneNumbers:t.sceneNumbers||[],totalPages:t.totalPages||"0 0/8",estHours:t.estHours||8,companyMoves:t.companyMoves||0,isLocked:!1,status:"Draft"};return s.push(o),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(s)),o}async function Ho(e,t){const s=Number(t);try{const a=await Q(`/production/${e}/schedule/day/${s}`,{method:"DELETE"});if(a?.success){const l=(await Pt(e)).filter(r=>r.dayNumber!==s);return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(l)),a}}catch{}const o=(await Pt(e)).filter(a=>a.dayNumber!==s);return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(o)),{success:!0,removedDayNumber:s}}async function Uo(){try{const e=await Q("/production/ai/providers");if(e?.providers)return e.providers}catch{}return[{id:"scriptora-concept",name:"SCRIPTORA Concept Engine",model:"v2.4 High-Res Vector & Composition",isConfigured:!0,pricingType:"free",costPerImage:0,costLabel:"Free (Built-in)",requiresApiKey:!1,aspectRatios:["2.39:1","16:9","4:3","9:16"],styles:["Cinematic Concept Art","Storyboard Ink","Pencil Sketch","Photorealistic / Live Action","3D Animation","Anime / Illustration"],description:"Fast, cinematic vector canvas with camera crosshairs, aspect ratio letterboxing, stylized character silhouettes, and directional lighting."},{id:"openai-dalle3",name:"OpenAI DALL-E 3",model:"dall-e-3",isConfigured:!1,pricingType:"paid",costPerImage:.04,costLabel:"$0.040 (Standard) / $0.080 (HD)",requiresApiKey:!0,envVarName:"OPENAI_API_KEY",aspectRatios:["16:9","2.39:1","1:1","9:16"],styles:["Photorealistic / Live Action","Cinematic Concept Art","Pencil Sketch","3D Animation"],description:"High-fidelity photorealistic rendering and complex composition synthesis via OpenAI API."},{id:"gemini-imagen3",name:"Google Imagen 3",model:"imagen-3.0-generate-002",isConfigured:!1,pricingType:"paid",costPerImage:.03,costLabel:"$0.030 per image",requiresApiKey:!0,envVarName:"GEMINI_API_KEY",aspectRatios:["16:9","4:3","1:1","9:16"],styles:["Cinematic Concept Art","Photorealistic / Live Action","Storyboard Ink"],description:"Photorealistic film still generation using Google Vertex/Gemini Imagen 3."},{id:"stability-sdxl",name:"Stability AI SDXL",model:"stable-diffusion-xl-1024-v1-0",isConfigured:!1,pricingType:"paid",costPerImage:.018,costLabel:"$0.018 per image",requiresApiKey:!0,envVarName:"STABILITY_API_KEY",aspectRatios:["16:9","2.39:1","4:3","9:16"],styles:["Storyboard Ink","Pencil Sketch","Cinematic Concept Art","Anime / Illustration"],description:"Versatile storyboard and concept illustration synthesis via Stability AI."}]}function $n(e,t=""){if(!e||typeof e!="string")return`${xt}assets/storyboard/shot_1a_wide_outpost.jpg`;if(e.startsWith("data:image/svg+xml")&&(e.includes("assets/storyboard")||e.includes("assets%2Fstoryboard")))try{const n=decodeURIComponent(e).match(/assets\/storyboard\/([a-zA-Z0-9_.-]+)/);if(n&&n[1])return`${xt}assets/storyboard/${n[1]}`}catch{}if(e.startsWith("data:image/svg")||e.startsWith("data:image/")&&e.length>5e4){const s=(t||"").toUpperCase();return s.includes("1A")?`${xt}assets/storyboard/shot_1a_wide_outpost.jpg`:s.includes("1B")?`${xt}assets/storyboard/shot_1b_two_shot_standoff.jpg`:s.includes("1C")?`${xt}assets/storyboard/shot_1c_closeup_reaction.jpg`:s.includes("1D")?`${xt}assets/storyboard/shot_1d_macro_insert.jpg`:s.includes("10A")?`${xt}assets/storyboard/shot_10a_valve_breach.jpg`:s.includes("10B")?`${xt}assets/storyboard/shot_10b_pumping_hall.jpg`:`${xt}assets/storyboard/shot_1a_wide_outpost.jpg`}if(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:image/"))return e;if(e.includes("assets/storyboard/")||e.includes("assets/styles/")){const s=e.replace(/^\/?(Scriptora\/)?/,"");return`${xt}${s}`}return e}function Zs(e){if(!e||typeof e!="object")return e;const t={...e};return Array.isArray(t.shots)&&(t.shots=t.shots.map(s=>{const n={...s};return n.imageUrl=$n(n.imageUrl,n.shotNumber),Array.isArray(n.history)&&(n.history=n.history.slice(0,20).map(o=>{const a={...o},i=a.previousImageUrl||a.imageUrl;return a.previousImageUrl=$n(i,n.shotNumber),delete a.imageUrl,a})),n})),t}function Ea(){if(!(typeof localStorage>"u"))try{const e=[];for(let t=0;t<localStorage.length;t++){const s=localStorage.key(t);s&&s.startsWith("scriptora_storyboard_")&&!s.includes("_preferences")&&!s.includes("_rb_")&&e.push(s)}e.forEach(t=>{try{const s=localStorage.getItem(t);if(s&&(s.includes("data:image/svg")||s.includes("data:image/jpeg")||s.length>5e4)){const n=JSON.parse(s),o=Zs(n);localStorage.setItem(t,JSON.stringify(o)),console.info(`[SCRIPTORA Storage] Successfully migrated legacy oversized cache: ${t} (${s.length}b -> ${JSON.stringify(o).length}b)`)}}catch{}})}catch(e){console.warn("[SCRIPTORA Storage] Legacy cleanup check skipped:",e)}}function qo(e,t){if(!(typeof localStorage>"u"))try{localStorage.setItem(e,t)}catch(s){console.warn(`[SCRIPTORA Storage] localStorage.setItem failed for ${e}, running emergency purge:`,s.message);try{Ea(),localStorage.setItem(e,t)}catch(n){console.error(`[SCRIPTORA Storage] Quota still exceeded for ${e} after purge. Suppressed.`,n.message)}}}function ut(e,t,s){if(!s)return;const n=Zs(s);qo(`scriptora_storyboard_${e}_${t}`,JSON.stringify(n))}typeof window<"u"&&setTimeout(Ea,100);async function as(e="chronicles-of-dust",t="scene-1"){try{const r=await Q(`/production/${e}/storyboard?sceneId=${t}`);if(r?.storyboard)return ut(e,t,r.storyboard),Zs(r.storyboard)}catch{}const s=localStorage.getItem(`scriptora_storyboard_${e}_${t}`);if(s)try{return Zs(JSON.parse(s))}catch{}const n=await fs(e),o=Number(String(t).replace("scene-",""))||1,a=n.find(r=>r.id===t||r.sceneNumber===o)||{id:`scene-${o}`,sceneNumber:o,heading:`SCENE ${o} - UNTITLED`,intExt:"INT",dayNight:"DAY"},i=o===1?[{id:"shot-1-1A",shotNumber:"1A",order:1,title:"Perimeter Outpost Gate",description:"High altitude drone descending across dust devils toward Kevin's arrival at the arid customs gate.",shotSize:"Wide Shot",cameraAngle:"High Angle",cameraMovement:"Crane / Jib",focalLength:"24mm Wide",lightingMood:"Daylight Dust",aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",prompt:"Cinematic wide shot, arid desert outpost gate, dust devils whirling, 2.39:1 anamorphic",imageUrl:`${xt}assets/storyboard/shot_1a_wide_outpost.jpg`,imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"approved",approvalNotes:"Great atmosphere and sense of scale. Approved for primary camera team.",approvedBy:"Arun Kumar (Owner)",approvedAt:"2026-10-18T10:30:00Z",directorNotes:"Capture sunrise glint off the guard gate perimeter wires.",characters:["KEVIN","MARCUS"],location:"Arid Outpost Gate 4",continuity:{characterPosition:"Kevin approaching from camera-left",screenDirection:"Left to Right",eyeline:"Looking toward Outpost Gate",lightingContinuity:"High-contrast morning sun from east",costumeState:"Dust coat level 2, canteen left side",propPlacement:"Gate clearance scanner in right hand"},history:[]},{id:"shot-1-1B",shotNumber:"1B",order:2,title:"Gate Scanner Clearance Standoff",description:"Medium two-shot of Kevin presenting his ID badge to Marcus over the buzzing clearance terminal.",shotSize:"Medium Two-Shot",cameraAngle:"Eye Level",cameraMovement:"Static",focalLength:"50mm Prime",lightingMood:"Harsh Fluorescent Rim",aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",prompt:"Medium two-shot, dusty outpost booth, weary hydro-engineer confronting guard, 50mm",imageUrl:`${xt}assets/storyboard/shot_1b_two_shot_standoff.jpg`,imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"approved",approvalNotes:"Good eyeline match with Shot 1A.",approvedBy:"Arun Kumar (Owner)",approvedAt:"2026-10-18T10:35:00Z",directorNotes:"Focus pull from scanner terminal to Kevin's tense expression.",characters:["KEVIN","MARCUS"],location:"Arid Outpost Gate 4",continuity:{characterPosition:"Kevin screen-left, Marcus screen-right",screenDirection:"Left to Right",eyeline:"Eye-level direct confrontation",lightingContinuity:"Terminal backlight rimming Kevin's face",costumeState:"Kevin wearing goggles around neck",propPlacement:"ID card inserted into reader"},history:[]},{id:"shot-1-1C",shotNumber:"1C",order:3,title:"Terminal Diagnostic Anomaly",description:"Close-up insert of the flickering scanner console displaying pressure alert warning in red neon.",shotSize:"Close-Up",cameraAngle:"Low Angle",cameraMovement:"Static",focalLength:"85mm Portrait",lightingMood:"Cyan Strobe",aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",prompt:"Extreme close-up on rugged military diagnostic screen, red warning glyphs, 85mm",imageUrl:`${xt}assets/storyboard/shot_1c_closeup_reaction.jpg`,imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"proposed",approvalNotes:"Review telemetry readout typography for accuracy.",approvedBy:null,approvedAt:null,directorNotes:"Practical screen insert; needs strobe flash on alert pulse.",characters:["KEVIN"],location:"Arid Outpost Gate 4",continuity:{characterPosition:"Centered insert",screenDirection:"Neutral",eyeline:"Downwards onto screen",lightingContinuity:"Red alert flashing 1Hz",costumeState:"Kevin's gloved thumb on lower bezel",propPlacement:"Scanner unit firmly latched"},history:[]}]:[],l={id:`sb-${e}-${a.id}`,scriptId:e,sceneId:a.id,sceneNumber:a.sceneNumber,sceneHeading:a.heading,intExt:a.intExt||"INT",dayNight:a.dayNight||"DAY",sourceVersion:"Draft 4.2",isVersionStale:!1,aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",shots:i,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return ut(e,t,l),l}async function Ht(e,t){try{const n=await Q(`/production/${e}/storyboard`,{method:"POST",body:JSON.stringify(t)});if(n?.storyboard)return ut(e,n.storyboard.sceneId,n.storyboard),n.storyboard}catch{}const s=t.sceneId||`scene-${t.sceneNumber||1}`;return ut(e,s,t),t}async function zo(e,t,s){try{const r=await Q(`/production/${e}/storyboard/${t}/shots`,{method:"POST",body:JSON.stringify(s)});if(r?.shot)return r.storyboard&&ut(e,t,r.storyboard),r}catch{}const n=await as(e,t),o=n.shots.length+1,a=String.fromCharCode(65+(o-1)%26),i=s.shotNumber||`${n.sceneNumber}${a}`,l={id:`shot-${Date.now()}`,shotNumber:i,order:o,title:s.title||`Shot ${i}`,description:s.description||"",shotSize:s.shotSize||"Medium Shot",cameraAngle:s.cameraAngle||"Eye Level",cameraMovement:s.cameraMovement||"Static",focalLength:s.focalLength||"50mm Prime",lightingMood:s.lightingMood||"Natural Daylight",aspectRatio:s.aspectRatio||n.aspectRatio||"2.39:1",visualStyle:s.visualStyle||n.visualStyle||"Cinematic Concept Art",prompt:s.prompt||"",negativePrompt:s.negativePrompt||"",imageUrl:s.imageUrl||null,imageSource:s.imageSource||(s.imageUrl?"imported":null),provider:s.provider||null,quality:s.quality||"standard",costEstimate:s.costEstimate||null,approvalStatus:s.approvalStatus||"draft",approvalNotes:s.approvalNotes||"",approvedBy:s.approvedBy||null,approvedAt:s.approvedAt||null,directorNotes:s.directorNotes||"",characters:s.characters||[],location:s.location||"",continuity:{characterPosition:s.continuity?.characterPosition||"",screenDirection:s.continuity?.screenDirection||"Left to Right",eyeline:s.continuity?.eyeline||"Eye Level",lightingContinuity:s.continuity?.lightingContinuity||"",costumeState:s.continuity?.costumeState||"",propPlacement:s.continuity?.propPlacement||""},history:[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return n.shots.push(l),n.updatedAt=new Date().toISOString(),ut(e,t,n),{storyboard:n,shot:l}}async function $s(e,t,s,n){try{const i=await Q(`/production/${e}/storyboard/${t}/shots/${s}`,{method:"PUT",body:JSON.stringify(n)});if(i?.shot)return i.storyboard&&ut(e,t,i.storyboard),i}catch{}const o=await as(e,t),a=o.shots.find(i=>i.id===s);if(!a)throw new Error("Shot not found");return n.continuity&&(n.continuity={...a.continuity,...n.continuity}),Object.assign(a,n,{updatedAt:new Date().toISOString()}),o.updatedAt=new Date().toISOString(),ut(e,t,o),{storyboard:o,shot:a}}async function Vo(e,t,s){try{const a=await Q(`/production/${e}/storyboard/${t}/shots/${s}`,{method:"DELETE"});if(a?.success)return a.storyboard&&ut(e,t,a.storyboard),a}catch{}const n=await as(e,t),o=n.shots.findIndex(a=>a.id===s);return o!==-1&&(n.shots.splice(o,1),n.shots.forEach((a,i)=>{a.order=i+1}),n.updatedAt=new Date().toISOString(),ut(e,t,n)),{success:!0,removedId:s,storyboard:n}}async function Go(e,t,s=[]){try{const i=await Q(`/production/${e}/storyboard/${t}/reorder`,{method:"POST",body:JSON.stringify({shotIds:s})});if(i?.storyboard)return ut(e,t,i.storyboard),i}catch{}const n=await as(e,t),o=new Map(n.shots.map(i=>[i.id,i])),a=[];for(const i of s)o.has(i)&&(a.push(o.get(i)),o.delete(i));for(const i of o.values())a.push(i);return a.forEach((i,l)=>{i.order=l+1}),n.shots=a,n.updatedAt=new Date().toISOString(),ut(e,t,n),{storyboard:n}}async function hn(e,t,s,n="approved",o=""){try{const l=await Q(`/production/${e}/storyboard/${t}/shots/${s}/approve`,{method:"POST",body:JSON.stringify({status:n,notes:o})});if(l?.shot)return l.storyboard&&ut(e,t,l.storyboard),l}catch{}const a=await as(e,t),i=a.shots.find(l=>l.id===s);return i&&(i.approvalStatus=n,i.approvalNotes=o||i.approvalNotes||"",i.approvedBy="Arun Kumar (Owner)",i.approvedAt=new Date().toISOString(),i.updatedAt=new Date().toISOString(),a.updatedAt=new Date().toISOString(),ut(e,t,a)),{storyboard:a,shot:i}}async function yn(e,t,s=[],n="approved",o=""){try{const l=await Q(`/production/${e}/storyboard/${t}/batch-approve`,{method:"POST",body:JSON.stringify({shotIds:s,status:n,notes:o})});if(l?.storyboard)return ut(e,t,l.storyboard),l}catch{}const a=await as(e,t);let i=0;for(const l of a.shots)s.includes(l.id)&&(l.approvalStatus=n,o&&(l.approvalNotes=o),l.approvedBy="Arun Kumar (Owner)",l.approvedAt=new Date().toISOString(),l.updatedAt=new Date().toISOString(),i++);return a.updatedAt=new Date().toISOString(),ut(e,t,a),{storyboard:a,affectedCount:i}}async function cs(e,t={}){try{const f=await Q(`/production/${e}/storyboard/generate-shot`,{method:"POST",body:JSON.stringify(t)});if(f?.imageUrl)return f.imageUrl=$n(f.imageUrl,t.shotNumber),f}catch(f){if(f.message&&f.message.includes("not configured"))throw f}const s=(t.shotSize||"").toLowerCase(),n=(t.sceneHeading||"").toUpperCase(),o=`${t.sceneHeading||""} ${t.prompt||""} ${t.description||""}`.toLowerCase(),a=(t.shotNumber||"1A").toUpperCase(),i=(t.variationType||"").toLowerCase();let l="shot_1a_wide_outpost.jpg";return t.isVariation?i==="angle"||i==="framing"?l="shot_10a_valve_breach.jpg":i==="lighting"?l="shot_10b_pumping_hall.jpg":i==="composition"?l="shot_1c_closeup_reaction.jpg":a.includes("A")||s.includes("wide")?l="shot_10b_pumping_hall.jpg":a.includes("B")||s.includes("two")?l="shot_1c_closeup_reaction.jpg":a.includes("C")||s.includes("close")?l="shot_10a_valve_breach.jpg":l="shot_1d_macro_insert.jpg":s.includes("close-up")||s.includes("close up")?l=o.includes("valve")||n.includes("10")?"shot_10a_valve_breach.jpg":"shot_1c_closeup_reaction.jpg":s.includes("two-shot")||s.includes("two shot")||t.cast&&t.cast.length>=2?l="shot_1b_two_shot_standoff.jpg":s.includes("macro")||s.includes("insert")||s.includes("extreme close")?l="shot_1d_macro_insert.jpg":n.includes("10")||o.includes("pumping")||o.includes("hall")?l="shot_10b_pumping_hall.jpg":a.includes("B")?l="shot_1b_two_shot_standoff.jpg":a.includes("C")?l="shot_1c_closeup_reaction.jpg":a.includes("D")&&(l="shot_1d_macro_insert.jpg"),{imageUrl:`${xt}assets/storyboard/${l}`,provider:t.provider||"scriptora-concept",quality:t.quality||"hd",costEstimate:"Free (Built-in)",prompt:t.prompt||""}}async function ka(){try{const t=await Q("/production/storyboard/preferences");if(t?.preferences)return localStorage.setItem("scriptora_storyboard_preferences",JSON.stringify(t.preferences)),t.preferences}catch{}const e=localStorage.getItem("scriptora_storyboard_preferences");if(e)try{return JSON.parse(e)}catch{}return{defaultStyle:"Concept Art",defaultAspectRatio:"2.39:1",defaultShotSize:"Medium",defaultCameraAngle:"Eye Level",defaultLens:"50mm",defaultLighting:"Auto / Scene-based",experienceLevel:"Intermediate"}}async function Wo(e={}){try{const n=await Q("/production/storyboard/preferences",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(n?.preferences)return localStorage.setItem("scriptora_storyboard_preferences",JSON.stringify(n.preferences)),n.preferences}catch{}const s={...await ka(),...e};return localStorage.setItem("scriptora_storyboard_preferences",JSON.stringify(s)),s}async function Qs(e="chronicles-of-dust"){try{const s=await Q(`/production/${e}/storyboard/recycle-bin`);if(s?.items)return localStorage.setItem(`scriptora_storyboard_rb_${e}`,JSON.stringify(s.items)),s.items}catch{}const t=localStorage.getItem(`scriptora_storyboard_rb_${e}`);if(t)try{return JSON.parse(t)}catch{}return[]}async function Ko(e,t){try{const s=await Q(`/production/${e}/storyboard/recycle-bin/restore`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({itemId:t})});if(s?.success){const o=(await Qs(e)).filter(a=>a.id!==t);return localStorage.setItem(`scriptora_storyboard_rb_${e}`,JSON.stringify(o)),s}}catch{}return{success:!0}}async function Jo(e,t){try{const s=await Q(`/production/${e}/storyboard/recycle-bin/${t}`,{method:"DELETE"});if(s?.success){const o=(await Qs(e)).filter(a=>a.id!==t);return localStorage.setItem(`scriptora_storyboard_rb_${e}`,JSON.stringify(o)),s}}catch{}return{success:!0,removedId:t}}async function Yo(e){try{const t=await Q(`/production/${e}/storyboard/recycle-bin/empty`,{method:"POST"});return localStorage.setItem(`scriptora_storyboard_rb_${e}`,JSON.stringify([])),t||{success:!0}}catch{}return localStorage.setItem(`scriptora_storyboard_rb_${e}`,JSON.stringify([])),{success:!0}}async function Xo(e,t){try{return await Q(`/production/${e}/storyboard/scenes/${t}/soft-delete`,{method:"POST"})}catch{}return{success:!0,removedId:t}}class Zo{constructor(){try{sessionStorage.removeItem("scriptora_history_stack")}catch{}this.state={currentUser:null,selectedScriptId:localStorage.getItem("scriptora_selected_script")||"chronicles-of-dust",selectedVersionId:"Draft 4.2",currentSceneId:18,unreadNotifications:3,scripts:[],activeScript:null,screenplay:null,settings:null,historyStack:[]},this.listeners=new Set}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(const t of this.listeners)try{t(this.state)}catch(s){console.error("Store listener error:",s)}}setState(t){this.state={...this.state,...t},t.selectedScriptId&&localStorage.setItem("scriptora_selected_script",t.selectedScriptId),this.notify()}pushHistory(t){if(!t)return;const s=t.trim(),n=this.state.historyStack;(n.length===0||n[n.length-1]!==s)&&(n.push(s),n.length>50&&n.shift())}popHistory(){return this.state.historyStack.pop()}getPreviousRoute(t="/workspace"){return this.popHistory()||t}peekPreviousRoute(t="/workspace"){const s=this.state.historyStack;return s.length>0?s[s.length-1]:t}clearHistory(){this.state.historyStack=[];try{sessionStorage.removeItem("scriptora_history_stack")}catch{}}resetUserSession(){this.setState({currentUser:null,scripts:[],activeScript:null,screenplay:null,historyStack:[],selectedScriptId:"chronicles-of-dust",unreadNotifications:0}),this.clearHistory()}async init(){try{const t=await ya(),s=await bt(),n=await ea(),o=await Sa();let a=localStorage.getItem("scriptora_selected_script");const i=s&&s.length>0?s.find(r=>r.isCurrentDraft):null;i?a=i.id:s&&s.length>0?(!a||!s.some(r=>r.id===a))&&(a=s[0].id):a=null,a?localStorage.setItem("scriptora_selected_script",a):localStorage.removeItem("scriptora_selected_script");const l=s&&s.length>0?s.find(r=>r.id===a)||s[0]:null;this.setState({currentUser:t,scripts:s||[],selectedScriptId:a,activeScript:l,unreadNotifications:n,settings:o})}catch(t){console.error("Init store error:",t)}}async selectScript(t){if(!t)return;const s=await mo(t),n=(s||this.state.scripts).find(o=>o.id===t)||await an(t);this.setState({selectedScriptId:t,activeScript:n,scripts:s||this.state.scripts})}async refreshNotifications(){const t=await ea();this.setState({unreadNotifications:t})}async refreshScripts(){const t=await bt(),s=t&&t.length>0?t.find(a=>a.isCurrentDraft):null;let n=s?s.id:this.state.selectedScriptId;t&&t.length>0?(!n||!t.some(a=>a.id===n))&&(n=t[0].id):n=null;const o=t&&t.length>0?t.find(a=>a.id===n)||t[0]:null;return n?localStorage.setItem("scriptora_selected_script",n):localStorage.removeItem("scriptora_selected_script"),this.setState({scripts:t||[],selectedScriptId:n,activeScript:o}),t}}const $=new Zo,Qo="/Scriptora/assets/logo-BG9jZ7UG.png",Rn=Qo;function dt(e="Workspace",t="Your writing space."){const s=$.state.unreadNotifications,n=$.state.currentUser?.initials||"JD";return`
    <header class="fixed top-0 left-0 right-0 w-full z-40 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-surface-container-high/60 select-none" data-global-header="true">
      <div class="h-14 px-4 flex items-center justify-between max-w-2xl mx-auto">
        <a href="/workspace" class="flex items-center gap-2.5 min-w-0 no-underline text-inherit cursor-pointer active:opacity-80 transition-opacity">
          <img src="${Rn}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora" class="w-8 h-8 object-contain shrink-0" />
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
  `}function it(e="workspace"){const t=e==="workspace",s=e==="intelligence",n=e==="chat"||e==="ai-chat",o=e==="production"||e==="pre-production",a=e==="profile";return`
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
        <a href="/production" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${o?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-production" aria-label="Pre-Production" title="Pre-Production">
          <span class="material-symbols-outlined text-[22px]" ${o?`style="font-variation-settings: 'FILL' 1;"`:""}>movie_creation</span>
          <span class="text-[9.5px] font-medium mt-0.5 leading-none">Production</span>
          ${o?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':'<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

        <!-- 5. Profile Tab -->
        <a href="/profile" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${a?"text-primary font-semibold":"text-slate-500 hover:text-slate-800"}" id="nav-tab-profile" aria-label="Profile" title="Profile">
          <span class="material-symbols-outlined text-[22px]" ${a?`style="font-variation-settings: 'FILL' 1;"`:""}>account_circle</span>
          <span class="text-[9.5px] font-medium mt-0.5 leading-none">Profile</span>
          ${a?'<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>':'<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

      </div>
    </nav>
  `}function el(e="workspace"){const t=document.getElementById("scriptora-bottom-nav");return t?(t.outerHTML=it(e),!0):!1}function S(e,t="success"){const s=document.getElementById("global-toast"),n=document.getElementById("toast-message"),o=document.getElementById("toast-icon");if(!s||!n){console.log(`[Toast ${t}]`,e);return}n.textContent=e,o&&(t==="error"?(o.textContent="error",o.className="material-symbols-outlined text-[18px] text-red-400"):t==="info"?(o.textContent="info",o.className="material-symbols-outlined text-[18px] text-blue-300"):(o.textContent="check_circle",o.className="material-symbols-outlined text-[18px] text-emerald-300")),s.classList.remove("opacity-0","pointer-events-none"),s.classList.add("opacity-100"),clearTimeout(s._timeout),s._timeout=setTimeout(()=>{s.classList.remove("opacity-100"),s.classList.add("opacity-0","pointer-events-none")},2400)}function tl(){return`
    <main class="flex flex-col relative w-full pt-safe pb-safe bg-surface min-h-screen justify-center items-center px-4">
      <div class="flex flex-col w-full max-w-sm py-8 fade-in">
        <!-- Brand & Logo Header -->
        <header class="flex flex-col items-center justify-center pb-4 text-center">
          <img src="${Rn}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-16 h-16 object-contain mb-3 drop-shadow-sm" />
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
  `}function sl(e){const t=document.getElementById("tab-signin"),s=document.getElementById("tab-register"),n=document.getElementById("tab-otp"),o=document.getElementById("flow-signin"),a=document.getElementById("flow-register"),i=document.getElementById("flow-otp");function l(L){[t,s,n].forEach(k=>{k.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 text-on-surface-variant hover:text-on-surface"}),[o,a,i].forEach(k=>k.classList.add("hidden")),L==="signin"?(t.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",o.classList.remove("hidden")):L==="register"?(s.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",a.classList.remove("hidden")):L==="otp"&&(n.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold flex items-center justify-center gap-1",i.classList.remove("hidden"))}t&&(t.onclick=()=>l("signin")),s&&(s.onclick=()=>l("register")),n&&(n.onclick=()=>l("otp"));const r=document.getElementById("toggle-pw-signin"),f=document.getElementById("signin-password");r&&f&&(r.onclick=()=>{const L=f.type==="password";f.type=L?"text":"password",r.innerHTML=`<span class="material-symbols-outlined text-[18px]">${L?"visibility_off":"visibility"}</span>`});function u(L){try{const U=L.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),T=decodeURIComponent(atob(U).split("").map(de=>"%"+("00"+de.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(T)}catch{return null}}const d=document.getElementById("btn-google-login"),c="756924881120-0qngpm230nq3k8bb61ttt1de7jv28fui.apps.googleusercontent.com";let m=null;async function b(L){S("Connecting with Google...");try{const k=await io(L);$.setState({currentUser:k}),S(`Welcome back, ${k.displayName||k.name}`),e("/welcome")}catch(k){S(k.message||"Google sign-in error","error")}}function h(){if(window.google?.accounts?.id&&c)try{window.google.accounts.id.initialize({client_id:c,callback:async L=>{if(L&&L.credential){const k=u(L.credential)||{};await b({token:L.credential,email:k.email,name:k.name,displayName:k.name,picture:k.picture,sub:k.sub,provider:"google"})}},auto_select:!1,cancel_on_tap_outside:!0})}catch(L){console.warn("Google One Tap setup note:",L)}if(window.google?.accounts?.oauth2&&c)try{m=window.google.accounts.oauth2.initTokenClient({client_id:c,scope:"email profile openid",callback:async L=>{if(L&&L.access_token){S("Retrieving Google profile...");try{const U=await(await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${L.access_token}`}})).json();await b({token:L.access_token,email:U.email,name:U.name,displayName:U.name,picture:U.picture,sub:U.sub,provider:"google"})}catch(k){console.warn("Google userinfo fetch note:",k),await b({token:L.access_token,provider:"google"})}}}})}catch(L){console.warn("Google OAuth token client setup note:",L)}}h(),d&&(d.onclick=async()=>{if(!m&&window.google&&h(),m)try{m.requestAccessToken({prompt:"select_account"});return}catch(L){console.warn("Token client request error, trying prompt:",L)}if(window.google?.accounts?.id)try{window.google.accounts.id.prompt(L=>{(L.isNotDisplayed()||L.isSkippedMoment())&&(console.log("GIS prompt not displayed:",L.getNotDisplayedReason()),b({email:"arun.kumar@scriptora.studio",name:"Arun Kumar",displayName:"Arun Kumar",provider:"google"}))});return}catch(L){console.warn("GIS prompt error:",L)}await b({email:"arun.kumar@scriptora.studio",name:"Arun Kumar",displayName:"Arun Kumar",provider:"google"})});const g=document.getElementById("form-signin");g&&(g.onsubmit=async L=>{L.preventDefault();const k=document.getElementById("signin-email").value,U=f.value;try{const T=await lo({email:k,password:U});$.setState({currentUser:T}),S(`Welcome back, ${T.displayName||T.name}`),e("/welcome")}catch(T){S(T.message,"error")}});const v=document.getElementById("form-register");v&&(v.onsubmit=async L=>{L.preventDefault();const k=document.getElementById("reg-name").value,U=document.getElementById("reg-email").value,T=document.getElementById("reg-password").value;try{const de=await ro({name:k,email:U,password:T});$.setState({currentUser:de}),S("Account created successfully"),e("/welcome")}catch(de){S(de.message,"error")}});const P=document.getElementById("form-otp");P&&(P.onsubmit=async L=>{L.preventDefault();const k=document.getElementById("otp-phone").value;try{const U=await co(k);$.setState({currentUser:U}),S("Phone verified successfully"),e("/welcome")}catch(U){S(U.message,"error")}});const B=document.getElementById("btn-forgot-pw");B&&(B.onclick=()=>{S("Password reset link sent to registered email","info")})}function nl(){return $.state.currentUser,`
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
          <img src="${Rn}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-20 h-20 object-contain mb-5 drop-shadow-sm" />

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
  `}function al(e){const t=document.getElementById("welcome-sign-out");t&&(t.onclick=async()=>{await va(),$.setState({currentUser:null}),S("Signed out successfully"),e("/auth")})}function Ia(){let e=document.getElementById("scriptora-modal-portal");return e||(e=document.createElement("div"),e.id="scriptora-modal-portal",document.body.appendChild(e)),e}function Ca(e){if(!e)return;const t=Ia();e.parentElement!==t&&t.appendChild(e)}function en(){!!document.querySelector("#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)")?(document.documentElement.classList.add("scriptora-modal-open"),document.body.classList.add("scriptora-modal-open")):(document.documentElement.classList.remove("scriptora-modal-open"),document.body.classList.remove("scriptora-modal-open"))}function ol(){document.documentElement.classList.add("scriptora-modal-open"),document.body.classList.add("scriptora-modal-open")}function aa(){en()}function lt(e){if(!e)return;Ca(e),e.classList.remove("hidden"),e.classList.add("flex"),ol(),e.scrollTop=0;const t=e.querySelector(".scriptora-modal-card");if(t){t.scrollTop=0;const s=t.querySelector(".scriptora-modal-body, .overflow-y-auto");s&&(s.scrollTop=0)}}function we(e){e&&(e.classList.contains("hidden")||(e.classList.add("hidden"),e.classList.remove("flex")),en())}function ll(e,t,s={}){if(!e||!t)return null;const{placement:n="auto",offset:o=4,boundaryMargin:a=8,preferPosition:i="bottom"}=s,l=e.getBoundingClientRect(),r=window.visualViewport,f=r?r.width:window.innerWidth,u=r?r.height:window.innerHeight,d=r?r.offsetTop:0,c=r?r.offsetLeft:0,m=!!e.closest(".scriptora-modal-overlay");let b=d+a,h=d+u-a;if(!m){const se=document.getElementById("editor-fixed-header")||document.getElementById("scriptora-global-header")||document.querySelector('header[data-global-header="true"]'),ge=se&&!se.classList.contains("hidden")?se.getBoundingClientRect().bottom:d+56,J=document.getElementById("scriptora-global-nav")||document.getElementById("scriptora-bottom-nav")||document.querySelector('nav[data-global-bottom-nav="true"]'),ke=J&&!J.classList.contains("hidden")?J.getBoundingClientRect().top:d+u;b=Math.max(b,ge+4),h=Math.min(h,ke-4)}const g=t.offsetWidth||200,v=t.offsetHeight||160,P=h-l.bottom-o,B=l.top-b-o;let L=!1;n.startsWith("top")?L=B>=v||B>P:n.startsWith("bottom")?L=P<v&&B>P:i==="top"?L=B>=v||B>P:L=P<v&&B>P;let k,U;L?(U=Math.max(90,Math.min(v,B)),k=l.top-U-o):(U=Math.max(90,Math.min(v,P)),k=l.bottom+o),k=Math.max(b,Math.min(h-U,k));let T;return n.endsWith("end")||l.left+g>f-a?T=l.right-g:T=l.left,T=Math.max(c+a,Math.min(c+f-g-a,T)),{top:Math.round(k),left:Math.round(T),maxHeight:Math.round(U),width:Math.min(g,f-2*a),placement:L?"top":"bottom"}}function Os(e,t,s={}){if(!e||!t)return;const n=!!e.closest(".scriptora-modal-overlay");if(s.portal!==!1){const i=n?Ia():document.body;t.parentElement!==i&&i.appendChild(t)}const o=t.classList.contains("hidden");o&&(t.style.visibility="hidden",t.classList.remove("hidden")),t.style.position="fixed",t.style.zIndex=s.zIndex||(n?"10000":"120");const a=ll(e,t,s);a&&(t.style.top=`${a.top}px`,t.style.left=`${a.left}px`,t.style.maxHeight=`${a.maxHeight}px`,t.style.overflowY="auto"),o&&(t.style.visibility="")}function Aa(e,t,s={}){if(!e||!t)return;t.classList.add("scriptora-popup"),t.setAttribute("data-scriptora-popup","true");const n=()=>{t.classList.contains("hidden")||Os(e,t,s)},o=()=>{t.classList.remove("hidden"),Os(e,t,s)},a=()=>{t.classList.add("hidden")},i=()=>{t.classList.contains("hidden")?o():a()},l=r=>{t.classList.contains("hidden")||!e.contains(r.target)&&!t.contains(r.target)&&a()};return document.addEventListener("click",l),window.addEventListener("scroll",n,{passive:!0,capture:!0}),window.addEventListener("resize",n,{passive:!0}),window.visualViewport&&(window.visualViewport.addEventListener("resize",n,{passive:!0}),window.visualViewport.addEventListener("scroll",n,{passive:!0})),{open:o,close:a,toggle:i,update:n}}if(typeof document<"u"){document.addEventListener("click",t=>{t.target&&t.target.classList&&t.target.classList.contains("scriptora-modal-overlay")&&we(t.target)}),document.addEventListener("keydown",t=>{if(t.key==="Escape"){const s=Array.from(document.querySelectorAll("#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)"));s.length>0&&we(s[s.length-1])}});const e=()=>{new MutationObserver(s=>{for(const n of s)if(n.type==="attributes"&&n.attributeName==="class"){const o=n.target;o&&o.classList&&o.classList.contains("scriptora-modal-overlay")&&(o.classList.contains("hidden")||Ca(o),en())}}).observe(document.body,{attributes:!0,attributeFilter:["class"],subtree:!0})};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}function il(e){if(!e)return"";try{const t=localStorage.getItem(`scriptora_screenplay_${e.id}`);if(t){const s=JSON.parse(t);if(s&&Array.isArray(s.scenes)&&s.scenes.length>0){const n=parseInt((e.currentScene||"").replace(/\D+/g,""),10)||1,o=s.scenes.find(a=>a.number===n)||s.scenes[0];if(o&&Array.isArray(o.blocks)){const a=o.blocks.find(r=>r.type==="action")||o.blocks[0],i=o.slugline||o.blocks.find(r=>r.type==="scene")?.content||"",l=a?.content||"";if(i&&l)return`"${i} - ${l.slice(0,95)}..."`;if(l)return`"${l.slice(0,110)}..."`}}}}catch{}return e.id==="chronicles-of-dust"?'"INT. CUSTOMS OFFICE - NIGHT - Kevin kneels over cracked hydro-sensor junction box, static..."':e.id==="the-neon-horizon"?'"EXT. SECTOR 4 SKYLINE - DUSK - Rain reflects neon advertisements across towering glass spires..."':e.id==="velvet-shadows"?'"INT. DETECTIVE OFFICE - RAINY NIGHT - A single desk lamp casts long shadows across unread case files..."':e.id==="silent-echoes"?'"INT. ARCHIVE CELLAR - DAY - Dust motes dance in the amber light filtering through frosted glass..."':e.logline?`"${e.logline.slice(0,110)}..."`:"Empty script — start writing your story."}function rl(){const e=$.state.scripts||[],t=e.length>0,s=t&&e.find(a=>a&&a.isCurrentDraft)||null,n=parseInt((s?.currentScene||"").replace(/\D+/g,""),10)||1,o=s?.currentScene||`Scene ${n}`;return`
    ${dt("Workspace","Your writing space.")}

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
            <p class="text-xs text-slate-500 mt-0.5">${s.draft} · ${o} · ${s.pages||1} pages</p>
            
            <div class="rounded-xl p-3 mt-3 bg-slate-50 border border-slate-100">
              <div class="flex items-center justify-between text-xs font-bold text-blue-600 uppercase tracking-wider">
                <span>${o.toUpperCase()}</span>
                <span class="material-symbols-outlined text-[15px] text-slate-400">movie</span>
              </div>
              <p class="font-mono italic text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                ${il(s)}
              </p>
            </div>

            <button type="button" id="btn-continue-writing" data-script-id="${s.id}" data-scene="${n}" class="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-medium text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 mt-3 shadow-xs transition-all">
              <span>Continue Writing (${o})</span>
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

    ${it("workspace")}
  `}function cl(e){let t=null;const s=document.getElementById("btn-continue-writing");s&&(s.onclick=async()=>{const b=s.getAttribute("data-script-id"),h=s.getAttribute("data-scene")||"1";await $.selectScript(b),e(`/editor/${b}?scene=${h}`)}),document.querySelectorAll(".script-item-row").forEach(b=>{b.onclick=async h=>{if(h.target.closest(".script-more-btn"))return;const g=b.getAttribute("data-script-id");await $.selectScript(g),e(`/editor/${g}`)}});const n=document.getElementById("screenplay-search");n&&(n.oninput=b=>{const h=b.target.value.toLowerCase().trim();document.querySelectorAll("#screenplays-library-list .script-item-row").forEach(v=>{const P=v.querySelector(".font-semibold")?.textContent.toLowerCase()||"";v.style.display=P.includes(h)?"flex":"none"})});const o=document.getElementById("btn-new-screenplay-card"),a=document.getElementById("btn-new-script"),i=document.getElementById("new-script-modal"),l=document.getElementById("close-new-script-modal"),r=document.getElementById("cancel-new-script-btn"),f=document.getElementById("form-new-script");function u(b){i&&(b?(lt(i),document.getElementById("new-script-title")?.focus()):we(i))}o&&(o.onclick=()=>u(!0)),a&&(a.onclick=()=>u(!0)),l&&(l.onclick=()=>u(!1)),r&&(r.onclick=()=>u(!1)),i&&(i.onclick=b=>{b.target===i&&u(!1)}),f&&(f.onsubmit=async b=>{b.preventDefault();const h=document.getElementById("new-script-title").value.trim(),g=document.getElementById("new-script-format").value,v=document.getElementById("new-script-genre").value;if(h)try{const P=await uo({title:h,format:g,genre:v});await $.refreshScripts(),await $.selectScript(P.id),u(!1),S(`Created "${P.title}"`),e(`/editor/${P.id}`)}catch(P){S(P.message,"error")}});const d=document.getElementById("script-menu-popover");let c=null;document.querySelectorAll(".script-more-btn").forEach(b=>{b.onclick=h=>{h.stopPropagation(),t=b.getAttribute("data-script-id"),c=b,Os(b,d,{placement:"bottom-end",offset:4}),d.classList.remove("hidden")}}),window.addEventListener("scroll",()=>{c&&d&&!d.classList.contains("hidden")&&Os(c,d,{placement:"bottom-end",offset:4})},{passive:!0}),window.onclick=b=>{!b.target.closest("#script-menu-popover")&&!b.target.closest(".script-more-btn")&&(d?.classList.add("hidden"),c=null)},document.getElementById("menu-opt-open")?.addEventListener("click",()=>{d.classList.add("hidden"),t&&($.selectScript(t),e(`/editor/${t}`))}),document.getElementById("menu-opt-rename")?.addEventListener("click",async()=>{d.classList.add("hidden");const b=prompt("Enter new title for this screenplay:");b&&b.trim()&&(await fo(t,{title:b.trim()}),await $.refreshScripts(),S("Screenplay renamed"),e("/workspace"))}),document.getElementById("menu-opt-duplicate")?.addEventListener("click",async()=>{d.classList.add("hidden"),await go(t),await $.refreshScripts(),S("Screenplay duplicated"),e("/workspace")}),document.getElementById("menu-opt-archive")?.addEventListener("click",async()=>{d.classList.add("hidden"),await bo(t),await $.refreshScripts(),S("Screenplay archived"),e("/workspace")}),document.getElementById("menu-opt-delete")?.addEventListener("click",async()=>{d.classList.add("hidden"),confirm("Are you sure you want to delete this screenplay? This action cannot be undone.")&&(await xo(t),await $.refreshScripts(),S("Screenplay deleted"),e("/workspace"))});const m=document.getElementById("btn-export-library");m&&(m.onclick=()=>{const b="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify($.state.scripts,null,2)),h=document.createElement("a");h.setAttribute("href",b),h.setAttribute("download",`scriptora_library_${Date.now()}.json`),document.body.appendChild(h),h.click(),h.remove(),S("Exported library manifest (.json)")})}const dl=new Set(["HE","SHE","IT","ITS","HIM","HER","HERS","HIS","THEY","THEM","THEIR","THEIRS","WE","US","OUR","OURS","YOU","YOUR","YOURS","ME","MY","MINE","I","WHO","WHOM","WHOSE","WHAT","WHICH","WHEN","WHERE","WHY","HOW","AND","OR","BUT","IF","SO","FOR","NOR","YET","BECAUSE","AS","AT","BY","FROM","IN","INTO","OF","OFF","ON","ONTO","OUT","OVER","TO","UP","WITH","THE","A","AN","THIS","THAT","THESE","THOSE","YES","NO","NOT","OK","NOW","THEN","HERE","THERE","SH","SA","AR","ARA","SAN","SANT","SANTH","SANTHO","SO"]);function Dt(e){if(!e||typeof e!="string")return"";let t=e.replace(/\([^)]*\)/g,"").replace(/&(?:amp;)*nbsp;?/gi," ").replace(/[\u200B\u00A0]/g," ").replace(/[^a-zA-Z0-9\s'-]/g,"").trim().toUpperCase();return t==="ARAF"&&(t="ARAVIND"),t}function Bn(e){if(!e||typeof e!="string")return!1;const t=Dt(e);return!(!t||t.length<3||dl.has(t)||/\b(INT|EXT|SCENE|DAY|NIGHT|MORNING|EVENING|DUSK|DAWN|CUT TO|FADE|TRANSITION)\b/i.test(t)||t.split(/\s+/).length>3||t.length>30)}function $a(e){if(!Array.isArray(e))return[];const t=[],s=new Set;return e.forEach(o=>{const a=typeof o=="string"?o:o?.name||o?.content||"",i=Dt(a);Bn(i)&&(s.has(i)||(s.add(i),t.push(i)))}),t.filter(o=>!(t.some(l=>l!==o&&l.startsWith(o)&&l.length>o.length)||t.some(l=>l!==o&&l.length>=5&&o.length<=4&&l.startsWith(o.slice(0,3)))))}const pl=[{code:"V.O.",label:"V.O.",desc:"Voice Over"},{code:"O.S.",label:"O.S.",desc:"Off Screen"},{code:"O.C.",label:"O.C.",desc:"Off Camera"},{code:"CONT'D",label:"CONT'D",desc:"Continued"}],ul=["beat","pause","whispering","softly","angrily","smiling","crying","sadly","laughing","screaming","quietly","nodding","shaking head","shouting","sarcastic","aside","overlapping","filtered","into phone","to himself","to herself"];function Mn(e){if(!e||typeof e!="string")return null;const t=e.match(/\(([^)]+)\)/g);if(!t)return null;for(const s of t){const n=s.replace(/[()]/g,"").trim().toUpperCase();if(!(n==="CONT'D"||n==="CONTD"))return n==="V.O."||n==="VO"?"V.O.":n==="O.S."||n==="OS"?"O.S.":n==="O.C."||n==="OC"?"O.C.":n}return null}function On(e){return!e||typeof e!="string"?!1:/\bCONT'?D\b/i.test(e)}function tn(e,t=null,s=!1){const n=Mn(e),o=Dt(e);if(!o)return e?e.trim().toUpperCase():"";let a=o;const i=t?t.replace(/[()]/g,"").trim().toUpperCase():null,l=i==="CONT'D"||i==="CONTD",r=!l&&i?i:n;return r&&r!=="CONT'D"&&r!=="CONTD"&&(a+=` (${r})`),(s||l||On(e))&&(a+=" (CONT'D)"),a}let H=null,Ye=null,Nn=null,Js=!1,Xe=!1,Wt=!0,Ut=!1,vn="EN",$t=[],Kt=-1,wn=null,Sn=null,jn=null,Ue=localStorage.getItem("scriptora_autosave")!=="false",js="screenplay",ps=!1;const Je=[],oa=["CUT TO:","CUT TO BLACK.","FADE IN:","FADE OUT.","FADE TO BLACK.","DISSOLVE TO:","MATCH CUT TO:","JUMP CUT TO:","SMASH CUT TO:","SLAM TO:","SLAM TO BLACK.","INTERCUT WITH:","WIPE TO:","IRIS IN:","IRIS OUT:","BACK TO:","CONTINUOUS","END"];let la=0;const Ns=[];function rt(e){if(e==null)return"";typeof e!="string"&&(e=String(e));let t=e;t=t.replace(/&(?:amp;)+nbsp;?/gi,"&nbsp;"),t=t.replace(/&#(?:160|xA0);/gi," ");let s;do s=t,t=t.replace(/(?:<br\s*\/?>|&nbsp;?|\u00A0|\s)+$/gi,"");while(t!==s);return t=t.replace(/(?:&nbsp;?|\u00A0)+/gi," "),t}function Qt(e){return e?(e.innerText||e.textContent||"").replace(/&(?:amp;)*nbsp;?/gi,"").replace(/[\u200B\u00A0\r\n\t ]/g,"").trim().length===0:!0}function ml(){return window.innerWidth<=768||"ontouchstart"in window||navigator.maxTouchPoints&&navigator.maxTouchPoints>0||/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}function Ba(e,t){const s=Date.now();if(s-la<150)return!0;if(!ml())return!1;const n=e.getAttribute("data-block-type")||"action";if(!["action","text","character","transition"].includes(n)||!Qt(t))return!1;let o="action";return n==="action"||n==="text"?o="character":n==="character"?o="transition":n==="transition"&&(o="action"),la=s,Ns.push({blockId:e.getAttribute("data-block-id"),prevType:n,newType:o}),t.innerText="",_s(e,o),ln(o),Xe=!0,Ue&&ct(),!0}const Na=46;function fl(e,t=null){const s=$.state.scripts?.find(a=>a.id===e)||$.state.activeScript||{title:"Untitled Screenplay",draft:"Draft 1.0"};$.state.currentUser?.initials;let n=null;if(window.scriptoraRouter){const a=window.scriptoraRouter.peekPreviousRoute?.();a&&(n=window.scriptoraRouter.getRouteLabel(a))}const o=n||"Workspace";return`
    <div id="editor-root" class="flex flex-col min-h-screen bg-slate-100 text-slate-900 w-full relative select-text antialiased">
      
      <!-- ========================================================= -->
      <!-- STATIC TOP HEADER (STICKY: Never scrolls with screenplay) -->
      <!-- ========================================================= -->
      <header id="editor-fixed-header" class="shrink-0 sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all">
        
        <!-- ROW 1: TOP APP HEADER (Order: Back, Title & Save Status, Auto-Save, Save Icon, Collab) -->
        <div class="h-11 px-3 flex items-center justify-between max-w-5xl mx-auto">
          <div class="flex items-center gap-2 min-w-0">
            <!-- Back button -->
            <button aria-label="Back to ${o}" id="editor-back-btn" data-scriptora-back="true" data-back-fallback="/workspace" class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all text-xs font-semibold shrink-0 cursor-pointer" title="Back to ${o}">
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
              <span class="hidden sm:inline" id="editor-back-label">${o}</span>
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
              <button id="btn-toggle-autosave" class="flex items-center gap-1.5 pl-1.5 pr-2.5 h-full hover:bg-slate-50 active:scale-95 transition-all text-xs font-medium text-slate-700 hover:text-slate-900" title="Toggle Auto-save (Current: ${Ue?"ON":"OFF"})">
                <span class="w-1.5 h-1.5 rounded-full ${Ue?"bg-emerald-500 animate-pulse":"bg-slate-400"}" id="autosave-dot"></span>
                <span id="autosave-toggle-label">${Ue?"Auto":"Off"}</span>
              </button>
            </div>

            <!-- Master Toolbar Visibility Toggle [⋮] -->
            <button id="btn-toggle-editor-toolbar" class="w-7 h-7 flex items-center justify-center ${ps?"text-blue-600 bg-blue-50 border-blue-200/90":"text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50"} rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0" title="${ps?"Collapse Editor Toolbars (Writing Mode)":"Expand Editor Toolbars (Tools & Formatting)"}" aria-label="Toggle Editor Toolbars">
              <span class="material-symbols-outlined text-[18px]">more_vert</span>
            </button>

            <!-- Collaborate Link -->
            <a href="/profile/collaborators?from=editor&scriptId=${e}" id="editor-collab-btn" aria-label="Collaborators" class="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors no-underline" title="Collaborators">
              <span class="material-symbols-outlined text-[19px]">group</span>
            </a>
          </div>
        </div>

        <!-- COLLAPSIBLE SECONDARY TOOLBAR ROWS (Master Visibility via Header [⋮]) -->
        <div id="editor-collapsible-toolbars" class="${ps?"":"hidden"} w-full transition-all duration-200">
          
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
  `}function Gt({id:e,name:t,close:s,restore:n}){try{window.history.pushState({editorSubViewId:e,editorSubViewName:t},"")}catch{}Je.push({id:e,name:t,close:s,restore:n})}function Ee(e){const t=Je.findIndex(s=>s.id===e);if(t!==-1){if(t===Je.length-1){const s=Je.pop();s&&typeof s.close=="function"&&s.close();const n=Je[Je.length-1];n&&typeof n.restore=="function"&&n.restore()}else{const s=Je.splice(t,1)[0];s&&typeof s.close=="function"&&s.close()}try{window.history.back()}catch{}}}function xl(){if(js==="titlepage")return Ls(),!0;if(Je.length>0){const e=Je.pop();e&&typeof e.close=="function"&&e.close();const t=Je[Je.length-1];return t&&typeof t.restore=="function"&&t.restore(),!0}return!1}async function gl(e,t){Je.length=0;const s=()=>js==="titlepage"?(Ls(),!0):Je.length>0?xl():(Xe&&ds(!1),!1);window.__scriptoraEditorPopstate=()=>s(),window.scriptoraRouter&&window.scriptoraRouter.registerBackHandler(s);const n=document.getElementById("editor-back-btn");n&&(n.onclick=l=>{l?.preventDefault(),l?.stopPropagation(),window.scriptoraRouter?window.scriptoraRouter.back("/workspace"):s()||t("/workspace")}),H=await ho(e),H?.scenes&&H.scenes.forEach(l=>{l.blocks&&l.blocks.forEach(r=>{r.content&&(r.content=rt(r.content)),r.char1&&(r.char1=rt(r.char1)),r.dia1&&(r.dia1=rt(r.dia1)),r.char2&&(r.char2=rt(r.char2)),r.dia2&&(r.dia2=rt(r.dia2))})}),e!=="chronicles-of-dust"&&H&&(H.scenes||[]).some(r=>{const f=(r.slugline||"").toUpperCase();return f.includes("WRITER'S ROOM")||f.includes("STUDIO - DAY")||f.includes("NEW SCENE - DAY")?!0:(r.blocks||[]).some(u=>{const d=u.content||"";return d.includes("Sunlight cuts through dust motes")||d.includes("A blank script page waits")||d.includes("Type your screenplay action here")})})&&(H.scenes=[{id:"scene-1",number:1,slugline:"",blocks:[{id:`b-${Date.now()}-1`,type:"scene",content:""}]}],H.wordCount=0,on(e,H)),ft(),Fs();const o=document.getElementById("editor-save-btn");o&&(o.onclick=()=>ds(!0)),hl(),yl();const a=document.getElementById("editor-collab-btn");a&&(a.onclick=l=>{l.preventDefault(),Xe&&ds(!1),$.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile/collaborators?from=editor&scriptId=${e}`)});const i=document.getElementById("editor-profile-btn");i&&(i.onclick=l=>{l.preventDefault(),Xe&&ds(!1),$.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile?from=editor&scriptId=${e}`)}),window.addEventListener("keydown",bl),Rl(e,t),Tl(),Pl(),Dl(),vl(),Sl(),Ml(),Ol(e),$l()}function bl(e){(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"&&(e.preventDefault(),ds(!0)),(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="f"&&(e.preventDefault(),nn(!0)),(e.ctrlKey||e.metaKey)&&e.key==="Enter"&&(e.preventDefault(),_n())}function hl(){const e=document.getElementById("btn-toggle-autosave"),t=document.getElementById("autosave-dot"),s=document.getElementById("autosave-toggle-label");e&&(e.onclick=n=>{n.stopPropagation(),Ue=!Ue,localStorage.setItem("scriptora_autosave",String(Ue)),Ue?(t&&(t.className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"),s&&(s.textContent="Auto"),e.title="Toggle Auto-save (Current: ON)",S("Auto-save enabled"),Xe&&ct()):(t&&(t.className="w-1.5 h-1.5 rounded-full bg-slate-400"),s&&(s.textContent="Off"),e.title="Toggle Auto-save (Current: OFF)",clearTimeout(Nn),S("Auto-save disabled · Tap floppy to save"))})}function Ps(){const e=document.getElementById("editor-main-scroll");e&&(e.style.paddingTop="12px",e.style.paddingBottom=Ut?"32px":"88px")}function yl(){const e=document.getElementById("btn-toggle-editor-toolbar"),t=document.getElementById("editor-collapsible-toolbars");Ps(),window.addEventListener("resize",Ps),e&&(e.onclick=s=>{s.preventDefault(),s.stopPropagation(),ps=!ps,ps?(t&&t.classList.remove("hidden"),e.className="w-7 h-7 flex items-center justify-center text-blue-600 bg-blue-50 border-blue-200/90 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Collapse Editor Toolbars (Writing Mode)"):(t&&t.classList.add("hidden"),e.className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Expand Editor Toolbars (Tools & Formatting)"),Ps()})}function Ls(){if(js==="titlepage"){Xs("screenplay");try{window.history.state?.editorTab==="titlepage"&&window.history.back()}catch{}}}function vl(){const e=document.getElementById("doc-tab-screenplay"),t=document.getElementById("doc-tab-titlepage"),s=document.getElementById("btn-quick-title-page"),n=document.getElementById("menu-btn-title-page"),o=document.getElementById("doc-tab-titlepage-close"),a=document.getElementById("btn-close-titlepage-sheet");e&&(e.onclick=()=>Ls()),t&&(t.onclick=i=>{i.preventDefault(),Xs("titlepage")}),o&&(o.onclick=i=>{i.preventDefault(),i.stopPropagation(),Ls()}),a&&(a.onclick=i=>{i.preventDefault(),i.stopPropagation(),Ls()}),s&&(s.onclick=()=>Xs("titlepage")),n&&(n.onclick=()=>{Ee("moreMenu"),Xs("titlepage")})}function Xs(e){if(js===e)return;js=e;const t=document.getElementById("screenplay-pages-container"),s=document.getElementById("title-page-container"),n=document.getElementById("doc-tab-screenplay"),o=document.getElementById("doc-tab-titlepage-wrap");if(e==="titlepage"){t&&t.classList.add("hidden"),s&&(s.classList.remove("hidden"),s.classList.add("flex")),o&&(o.className="flex items-center rounded-t-lg transition-all border-b-2 border-blue-600 bg-white text-blue-700 shadow-2xs group"),n&&(n.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 rounded-t-lg transition-all"),wl();try{window.history.state?.editorTab!=="titlepage"&&window.history.pushState({editorTab:"titlepage"},"")}catch{}}else s&&(s.classList.add("hidden"),s.classList.remove("flex")),t&&t.classList.remove("hidden"),n&&(n.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-blue-600 text-blue-700 bg-white rounded-t-lg transition-all shadow-2xs"),o&&(o.className="flex items-center rounded-t-lg transition-all border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 group");Ps()}function wl(){if(!H)return;const e=H.titlePage||{},t=document.getElementById("tp-doc-title"),s=document.getElementById("tp-doc-by"),n=document.getElementById("tp-doc-author"),o=document.getElementById("tp-doc-phone"),a=document.getElementById("tp-doc-email"),i=document.getElementById("tp-doc-address"),l=e.title||H.title||"";t&&(t.innerText=l,l||(t.innerHTML=""));const r=e.by!==void 0?e.by:"Written by";s&&(s.innerText=r,r||(s.innerHTML=""));const f=e.author||"";n&&(n.innerText=f,f||(n.innerHTML=""));let u=e.phone||"";if(!u&&e.contact){const b=e.contact.split("·").map(h=>h.trim()).find(h=>h.includes("+")||/\d{3}/.test(h));b&&(u=b)}o&&(o.innerText=u,u||(o.innerHTML=""));let d=e.email||"";if(!d&&e.contact&&e.contact.includes("@")){const m=e.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);m&&(d=m[0])}a&&(a.innerText=d,d||(a.innerHTML=""));const c=e.address||"";i&&(i.innerText=c,c||(i.innerHTML=""))}function Sl(){const e=document.getElementById("tp-doc-title"),t=document.getElementById("tp-doc-by"),s=document.getElementById("tp-doc-author"),n=document.getElementById("tp-doc-phone"),o=document.getElementById("tp-doc-email"),a=document.getElementById("tp-doc-address"),i=()=>{if(!H)return;H.titlePage||(H.titlePage={});const l=e?e.innerText.trim():"",r=t?t.innerText.trim():"",f=s?s.innerText.trim():"",u=n?n.innerText.trim():"",d=o?o.innerText.trim():"",c=a?a.innerText.trim():"";if(H.titlePage.title=l,H.titlePage.by=r||"Written by",H.titlePage.author=f,H.titlePage.phone=u,H.titlePage.email=d,H.titlePage.address=c,H.titlePage.contact=[u,d,c].filter(Boolean).join(" · "),l){H.title=l;const m=document.getElementById("editor-script-title"),b=document.getElementById("doc-tab-title-label");m&&(m.textContent=l),b&&(b.textContent=l)}Xe=!0,us("Unsaved"),Ue&&ct()};[e,t,s,n,o,a].forEach(l=>{l&&(l.oninput=i,l.onblur=()=>{l.innerText.trim()===""&&(l.innerHTML=""),i()})})}function ft(){const e=document.getElementById("screenplay-pages-container");if(!e||!H)return;const t=H.scenes||[],s=[];t.forEach(i=>{(i.blocks||[]).forEach(l=>{s.push({block:l,sceneNumber:i.number,sceneId:i.id,slugline:i.slugline})})});const n=[];let o={pageNumber:1,items:[]},a=0;s.forEach(i=>{if(i.block.type==="pagebreak"){o.items.push(i),n.push(o),o={pageNumber:n.length+1,items:[]},a=0;return}const l=Ta(i.block);a+l>Na&&o.items.length>0&&(n.push(o),o={pageNumber:n.length+1,items:[]},a=0),o.items.push(i),a+=l}),o.items.length>0&&n.push(o),n.length===0&&n.push({pageNumber:1,items:[{block:{id:`b-${Date.now()}-1`,type:"scene",content:""},sceneNumber:1,sceneId:"scene-1",slugline:""}]}),e.innerHTML=n.map(i=>`
    <div class="screenplay-page-sheet w-full max-w-[816px] min-h-[1123px] bg-white rounded-md sm:rounded-lg shadow-md border border-slate-200/90 flex flex-col font-courier text-[12pt] leading-[1.25] text-slate-900 relative transition-all" data-page-num="${i.pageNumber}">
      
      <!-- Top Page Header: Page number in top right -->
      <div class="w-full flex items-center justify-end h-7 pb-2 select-none text-[12pt] text-slate-600 font-courier">
        <span>${i.pageNumber}.</span>
      </div>

      <!-- Screenplay Blocks naturally flowing across this A4 page -->
      <div class="page-blocks-wrapper flex flex-col flex-1 w-full">
        ${i.items.map(l=>Da(l.block,l.sceneNumber,l.sceneId)).join("")}
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
  `).join(""),kl(),rn()}function Ta(e){if(e.type==="pagebreak")return 1;const t=e.content||"";return e.type==="scene"?3:e.type==="action"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="character"?2:e.type==="parenthetical"?1:e.type==="dialogue"?Math.max(1,Math.ceil(t.length/38))+1:e.type==="transition"||e.type==="shot"?2:e.type==="text"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="note"||e.type==="outline"?2:e.type==="act"||e.type==="endact"?3:e.type==="sequence"?2:e.type==="dual"?4:e.type==="lyrics"?2:e.type==="image"?10:2}function ia(e){let t=!1;(H.scenes||[]).forEach(s=>{const n=(s.blocks||[]).findIndex(o=>o.id===e);n!==-1&&(s.blocks.splice(n,1),t=!0)}),t&&(Xe=!0,ft(),S("Page break removed"),Ue&&ct())}function _n(e=null){const t=e||Ye,s=H.scenes||[];if(s.length===0)return;const n={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"};let o=!1;if(t)for(let a of s){const i=(a.blocks||[]).findIndex(l=>l.id===t);if(i!==-1){a.blocks.splice(i+1,0,n),o=!0;break}}if(!o){const a=s[s.length-1];a.blocks||(a.blocks=[]),a.blocks.push(n)}Xe=!0,ft(),S("Page break inserted"),Ue&&ct()}function Pa(e=null){const t=e||Ye,s=H.scenes||[];if(s.length===0){Fn();return}const n={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},o={id:"b-"+Date.now(),type:"action",content:""};let a=null,i=-1;if(t)for(let l of s){const r=(l.blocks||[]).findIndex(f=>f.id===t);if(r!==-1){a=l,i=r+1;break}}a||(a=s[s.length-1],i=a.blocks.length),a.blocks.splice(i,0,n,o),Xe=!0,ft(),setTimeout(()=>{const l=document.getElementById(o.id);if(l){const r=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]');r&&r.focus(),l.scrollIntoView({behavior:"smooth",block:"center"})}},50),S("New page inserted"),Ue&&ct()}function El(e){const t=document.querySelector(`.screenplay-page-sheet[data-page-num="${e}"]`);let s=null;if(t){const n=t.querySelectorAll(".screenplay-block");n.length>0&&(s=n[n.length-1].getAttribute("data-block-id"))}Pa(s)}function Fn(){const e=H.scenes||[],t=e.length+1,s={id:"scene-"+Date.now(),number:t,slugline:`INT. SCENE ${t} - DAY`,blocks:[{id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},{id:"b-"+Date.now()+"-1",type:"scene",content:`INT. SCENE ${t} - DAY`},{id:"b-"+Date.now()+"-2",type:"action",content:""}]};e.push(s),Xe=!0,ft(),setTimeout(()=>{const o=document.getElementById(s.blocks[1].id);if(o){const a=o.hasAttribute("contenteditable")?o:o.querySelector('[contenteditable="true"]');a&&a.focus(),o.scrollIntoView({behavior:"smooth",block:"center"})}},80);const n=document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)").length||1;S(`Added Page at End (Page ${n})`),Ue&&ct()}function La(e=null){let t=e;if(!t&&Ye){const u=document.getElementById(Ye),d=u?u.closest(".screenplay-page-sheet"):null;d&&(t=parseInt(d.getAttribute("data-page-num"),10))}t||(t=1);const s=H.scenes||[];if(s.length===0){Fn();return}if(t<=1){const u={id:"scene-"+Date.now(),number:1,slugline:"INT. SCENE 1 - DAY",blocks:[{id:"b-"+Date.now()+"-1",type:"scene",content:"INT. SCENE 1 - DAY"},{id:"b-"+Date.now()+"-2",type:"action",content:""},{id:"pb-"+Date.now()+"-3",type:"pagebreak",content:"PAGE BREAK"}]};s.unshift(u),s.forEach((d,c)=>{d.number=c+1}),Xe=!0,ft(),Fs(),setTimeout(()=>{const d=document.getElementById(u.blocks[0].id);if(d){const c=d.hasAttribute("contenteditable")?d:d.querySelector('[contenteditable="true"]');c&&c.focus(),d.scrollIntoView({behavior:"smooth",block:"center"})}},80),S("Added Page Before (Page 1)"),Ue&&ct();return}const n=document.querySelector(`.screenplay-page-sheet[data-page-num="${t}"]`);let o=null;if(n){const u=n.querySelector(".screenplay-block");u&&(o=u.getAttribute("data-block-id"))}let a=null,i=-1;if(o)for(let u of s){const d=(u.blocks||[]).findIndex(c=>c.id===o);if(d!==-1){a=u,i=d;break}}a||(a=s[0],i=0);const l={id:"pb-"+Date.now()+"-a",type:"pagebreak",content:"PAGE BREAK"},r={id:"b-"+Date.now()+"-b",type:"action",content:""},f={id:"pb-"+Date.now()+"-c",type:"pagebreak",content:"PAGE BREAK"};a.blocks.splice(i,0,l,r,f),Xe=!0,ft(),setTimeout(()=>{const u=document.getElementById(r.id);if(u){const d=u.hasAttribute("contenteditable")?u:u.querySelector('[contenteditable="true"]');d&&d.focus(),u.scrollIntoView({behavior:"smooth",block:"center"})}},80),S(`Added Page Before (Page ${t})`),Ue&&ct()}function Da(e,t,s){const n=e.type==="pagebreak",o=e.type==="scene",a=e.type==="character",i=e.type==="parenthetical",l=e.type==="dialogue",r=e.type==="transition",f=e.type==="shot",u=e.type==="text",d=e.type==="note",c=e.type==="outline",m=e.type==="act",b=e.type==="endact",h=e.type==="sequence",g=e.type==="dual",v=e.type==="lyrics",P=e.type==="image",B=e.type==="action"||!n&&!o&&!a&&!i&&!l&&!r&&!f&&!u&&!d&&!c&&!m&&!b&&!h&&!g&&!v&&!P;if(n)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="pagebreak" tabindex="0" class="screenplay-block my-3 select-none flex items-center justify-between px-3 py-2 text-slate-400 bg-slate-50 border border-dashed border-slate-300 rounded-lg group hover:border-blue-400 hover:bg-blue-50/30 transition-all outline-none focus:ring-1 focus:ring-blue-500">
        <div class="flex items-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase text-slate-500 group-hover:text-blue-600">
          <span class="material-symbols-outlined text-[16px] text-blue-500">insert_page_break</span>
          <span>PAGE BREAK</span>
        </div>
        <button type="button" class="btn-remove-pagebreak p-0.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors" data-block-id="${e.id}" title="Remove Page Break">
          <span class="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    `;if(o)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="scene" class="screenplay-block flex items-baseline py-2 font-bold text-slate-900 mt-4 mb-2 group w-full">
        <!-- Scene Number shown in left gutter -->
        <span class="scene-num-indicator -ml-10 w-7 mr-3 shrink-0 font-mono text-slate-400 font-bold select-none text-[12pt] text-right ${Wt?"":"hidden"}">${t}</span>
        <div class="flex-1 tracking-wider uppercase outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${nt(e.content)}</div>
      </div>
    `;if(B)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${nt(e.content)}</div>
    `;if(a)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="character" class="screenplay-block uppercase font-bold tracking-wider text-slate-900 text-left mt-3.5 mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[37%] max-w-[28ch]" contenteditable="true" spellcheck="false">${nt(e.content)}</div>
    `;if(i)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="parenthetical" class="screenplay-block italic text-slate-600 text-left mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[26%] max-w-[24ch]" contenteditable="true" spellcheck="false">${nt(e.content)}</div>
    `;if(l)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dialogue" class="screenplay-block text-left text-slate-900 mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[17%] max-w-[36ch]" contenteditable="true" spellcheck="false">${nt(e.content)}</div>
    `;if(r)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="transition" class="screenplay-block w-full text-right uppercase font-bold tracking-wider text-slate-900 mt-2 mb-4 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${nt(e.content)}</div>
    `;if(f)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="shot" class="screenplay-block uppercase font-bold tracking-wider text-slate-900 text-left my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${nt(e.content||"CLOSE ON:")}</div>
    `;if(u)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="text" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${nt(e.content)}</div>
    `;if(d)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="note" class="screenplay-block text-amber-900 bg-amber-50/80 border-l-4 border-amber-400 p-2 my-2.5 rounded-r font-mono text-xs outline-none focus:ring-1 focus:ring-amber-400 cursor-text select-text" contenteditable="true" spellcheck="false">${nt(e.content||"[[ NOTE: Script comment... ]]")}</div>
    `;if(c)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="outline" class="screenplay-block text-slate-500 uppercase tracking-widest font-sans font-bold text-xs my-2 border-b border-slate-200 pb-1 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${nt(e.content||"OUTLINE BEAT")}</div>
    `;if(m)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="act" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-base outline-none focus:bg-blue-50/50 rounded px-1 cursor-text underline decoration-2 underline-offset-4" contenteditable="true" spellcheck="false">${nt(e.content||"ACT I")}</div>
    `;if(b)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="endact" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${nt(e.content||"END OF ACT I")}</div>
    `;if(h)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="sequence" class="screenplay-block uppercase font-bold tracking-wide text-slate-800 my-3 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${nt(e.content||"SEQUENCE 1")}</div>
    `;if(g)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dual" class="screenplay-block screenplay-dual-dialogue-grid">
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${nt(e.char1||"CHARACTER A")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${nt(e.dia1||"Dialogue A")}</div>
        </div>
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${nt(e.char2||"CHARACTER B")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${nt(e.dia2||"Dialogue B")}</div>
        </div>
      </div>
    `;if(v)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="lyrics" class="screenplay-block text-center italic text-slate-800 my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${nt(e.content||"♫ Musical lyrics... ♫")}</div>
    `;if(P){const L=e.url||e.content||"https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80",k=Tn(e.caption||"");return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="image" class="screenplay-block my-4 flex flex-col items-center group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-2.5 shadow-2xs transition-all">
        <div class="w-full flex items-center justify-center min-h-[180px] max-h-[420px] rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200/60">
          <img src="${L}" alt="${k||"Storyboard"}" class="max-h-[400px] w-auto max-w-full object-contain rounded-md shadow-xs bg-white" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80';" loading="eager" />
        </div>
        <div class="text-[11px] font-sans text-slate-600 italic mt-2 text-center outline-none px-2 py-0.5 rounded focus:bg-white w-full cursor-text" contenteditable="true" data-placeholder="Add a storyboard caption...">${k||"Storyboard visual concept"}</div>
        <button class="btn-delete-img-block absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-md text-xs font-bold" data-block-id="${e.id}" data-scene-id="${s}" title="Delete image">✕</button>
      </div>
    `}return`
    <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true">${nt(e.content)}</div>
  `}function nt(e){if(!e)return"";const t=rt(e);if(!t)return"";if(!/<[a-z][\s\S]*>/i.test(t))return Tn(t);try{let a=function(i){const l=Array.from(i.childNodes);for(const r of l)if(r.nodeType===Node.ELEMENT_NODE){if(r.tagName==="SPAN"&&(r.style?.textDecoration?.includes("line-through")||r.style?.textDecorationLine?.includes("line-through"))){const u=document.createElement("s");u.innerHTML=r.innerHTML,i.replaceChild(u,r),a(u);continue}if(o.has(r.tagName)){for(;r.attributes.length>0;)r.removeAttribute(r.attributes[0].name);a(r)}else{const f=document.createTextNode(r.textContent||"");i.replaceChild(f,r)}}};const n=new DOMParser().parseFromString(`<body>${t}</body>`,"text/html"),o=new Set(["B","STRONG","I","EM","U","S","STRIKE","DEL","BR","SPAN"]);return a(n.body),rt(n.body.innerHTML)}catch{return Tn(t)}}function Tn(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}function Ds(e){if(!e||typeof e!="string")return e;let t=e.replace(/^(\s*["'“‘(]*)([a-z\u00E0-\u00FC])/u,(s,n,o)=>n+o.toUpperCase());return t=t.replace(/([.!?]["'”’)]*\s+["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,n,o)=>n+o.toUpperCase()),t=t.replace(/(\n\s*["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,n,o)=>n+o.toUpperCase()),t}function Ot(e){let t=0;const s=window.getSelection();if(s&&s.rangeCount>0){const n=s.getRangeAt(0),o=n.cloneRange();o.selectNodeContents(e),o.setEnd(n.endContainer,n.endOffset),t=o.toString().length}return t}function Tt(e,t){const s=window.getSelection();if(!s)return;const n=document.createRange();if(t<=0){n.selectNodeContents(e),n.collapse(!0),s.removeAllRanges(),s.addRange(n);return}let o=0,a=!1;function i(l){if(!a){if(l.nodeType===Node.TEXT_NODE){const r=l.nodeValue.length;if(o+r>=t){n.setStart(l,Math.min(t-o,r)),n.collapse(!0),a=!0;return}o+=r}else for(let r=0;r<l.childNodes.length;r++)if(i(l.childNodes[r]),a)return}}i(e),a||(n.selectNodeContents(e),n.collapse(!1)),s.removeAllRanges(),s.addRange(n)}function Ra(e){const t=e.hasAttribute("contenteditable")?e:e.querySelector('[contenteditable="true"]');t&&(t.onfocus=()=>{Ye=e.getAttribute("data-block-id");const s=e.getAttribute("data-block-type")||"action";ln(s),s==="transition"&&Qt(t)?es(e,t):s!=="transition"&&gt()},t.addEventListener("click",()=>{(e.getAttribute("data-block-type")||"action")==="transition"&&Qt(t)&&es(e,t)}),t.addEventListener("beforeinput",s=>{(s.data===" "||s.inputType==="insertText"&&s.data===" ")&&Qt(t)&&Ba(e,t)&&s.preventDefault()}),t.oninput=()=>{Xe=!0;const s=e.getAttribute("data-block-type")||"action",n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,i=Ds(a);if(i!==a){const l=Ot(t);t.innerText=i,Tt(t,l)}}let o=t.innerHTML;o=o.replace(/&(?:amp;)+nbsp;?/gi," "),o=o.replace(/&nbsp;?/gi," "),o=o.replace(/\u00A0/g," "),Ct(e,o),us("Unsaved"),Ue&&ct(),es(e,t),rn()},t.onblur=()=>{const s=e.getAttribute("data-block-type")||"action",n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,i=Ds(a);i!==a&&(t.innerText=i)}const o=rt(t.innerHTML);if(t.innerHTML!==o&&(t.innerHTML=o),Ct(e,o),s==="character")sn(rt(t.innerText));else if(s==="scene"){const a=ns(rt(t.innerText));a.location&&Hn(a.location)}},t.onpaste=()=>{const s=e.getAttribute("data-block-type")||"action";setTimeout(()=>{const n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,i=Ds(a);if(i!==a){const l=Ot(t);t.innerText=i,Tt(t,l)}}const o=rt(t.innerHTML);t.innerHTML!==o&&(t.innerHTML=o),Ct(e,o)},0)},t.onkeydown=s=>{Il(s,e,t)})}function kl(){document.querySelectorAll(".screenplay-block").forEach(Ra),document.querySelectorAll(".btn-delete-img-block").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=t.getAttribute("data-block-id"),o=t.getAttribute("data-scene-id");n&&o&&Ts(o,n)}}),document.querySelectorAll(".btn-remove-pagebreak").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=t.getAttribute("data-block-id");n&&ia(n)}}),document.querySelectorAll('[data-block-type="pagebreak"]').forEach(t=>{t.onkeydown=s=>{if(s.key==="Backspace"||s.key==="Delete"){s.preventDefault();const n=t.getAttribute("data-block-id");n&&ia(n)}}}),document.querySelectorAll(".btn-page-add-before").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=parseInt(t.getAttribute("data-page-num"),10)||1;La(n)}}),document.querySelectorAll(".btn-page-add-after").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=parseInt(t.getAttribute("data-page-num"),10)||1;El(n)}})}function ns(e){const t=e.match(/^(INT\.\/EXT\.|INT\.|EXT\.|I\/E\.)\s*/i),s=t?t[1].toUpperCase():"INT.",o=(t?e.slice(t[0].length):e).split(/\s+-\s*|\s+-/),a=(o[0]||"").trim().toUpperCase(),i=(o[1]||"").trim().toUpperCase();return{intExt:s,location:a,time:i}}function sn(e){if(!H)return;const t=Dt(e);Bn(t)&&(Array.isArray(H.characters)||(H.characters=[]),H.characters=H.characters.filter(s=>{const n=Dt(s);return!(!Bn(n)||t.startsWith(n)&&n.length<t.length||t.length>=5&&n.length<=4&&t.startsWith(n.slice(0,3)))}),H.characters.includes(t)||H.characters.push(t))}function Hn(e){if(!H)return;const t=(e||"").trim().toUpperCase();!t||t.length<2||(Array.isArray(H.locations)||(H.locations=[]),H.locations=H.locations.filter(s=>t.startsWith(s)&&s.length<t.length?H.scenes?.some(o=>o.blocks?.some(a=>a.type==="scene"&&ns(a.content).location===s)):!0),H.locations.includes(t)||H.locations.push(t))}function Ct(e,t){if(!H)return;const s=e.getAttribute("data-block-id"),n=e.getAttribute("data-scene-id"),o=H.scenes.find(i=>i.id===n);if(!o)return;const a=o.blocks.find(i=>i.id===s);if(a){const i=rt(t);if(a.type==="image"?a.caption=i:a.content=i,a.type==="scene"){const l=(i||"").replace(/<[^>]+>/g,""),r=ns(l);a.intExt=r.intExt,a.location=r.location,a.time=r.time,o.slugline=l,o.location=r.location,o.time=r.time}}}function Ts(e,t){if(!H)return;const s=H.scenes.find(a=>a.id===e);if(!s)return;const n=s.blocks.findIndex(a=>a.id===t);if(n!==-1&&(s.blocks.splice(n,1),Xe=!0,Ue&&ct()),s.blocks.length===0&&H.scenes.length>1){const a=H.scenes.findIndex(i=>i.id===e);a!==-1&&(H.scenes.splice(a,1),H.scenes.forEach((i,l)=>{i.number=l+1}),Fs())}else s.blocks.length===0&&s.blocks.push({id:`b-${Date.now().toString().slice(-6)}`,type:"action",content:""});const o=document.getElementById(t);o&&o.remove(),rn()}function Il(e,t,s){const n=t.getAttribute("data-block-type"),o=t.getAttribute("data-scene-id"),a=t.getAttribute("data-block-id"),i=document.getElementById("editor-autocomplete-dropdown");if(i&&!i.classList.contains("hidden")){if(e.key==="ArrowDown"){e.preventDefault(),ra(1);return}if(e.key==="ArrowUp"){e.preventDefault(),ra(-1);return}if(e.key==="Enter"||e.key==="Tab"){const l=i.querySelector(".autocomplete-item.active");if(l){e.preventDefault(),l.click();return}}if(e.key==="Escape"){gt();return}}if((e.key===" "||e.code==="Space")&&Qt(s)&&Ba(t,s)){e.preventDefault();return}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"&&!e.shiftKey&&Ns.length>0){const l=Ns[Ns.length-1];if(l.blockId===a&&Qt(s)){Ns.pop(),e.preventDefault(),_s(t,l.prevType);return}}if((e.ctrlKey||e.metaKey)&&!e.altKey){const l=e.key.toLowerCase();if(l==="b"){e.preventDefault(),Jt("bold");return}if(l==="i"){e.preventDefault(),Jt("italic");return}if(l==="u"){e.preventDefault(),Jt("underline");return}}if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&e.key&&e.key.length===1&&(["bold","italic","underline","strikeThrough"].forEach(l=>{if(mt[l]===!0&&!document.queryCommandState(l))try{document.execCommand(l,!1,null)}catch{}else if(mt[l]===!1&&document.queryCommandState(l))try{document.execCommand(l,!1,null)}catch{}}),Object.assign(mt,{bold:null,italic:null,underline:null,strikeThrough:null})),(e.ctrlKey||e.metaKey)&&e.key==="Enter"){e.preventDefault(),_n(a);return}if(e.key==="Backspace"&&!e.ctrlKey&&!e.metaKey){const l=s.innerText,r=Ot(s),f=window.getSelection();if(f&&f.isCollapsed&&r>0&&r<l.length&&l.charAt(r-1)==="("&&l.charAt(r)===")"){e.preventDefault();const u=l.slice(0,r-1),d=l.slice(r+1),c=u+d;s.innerText=c,Ct(t,c),Tt(s,r-1),gt();return}}if(e.key==="Backspace"&&!e.ctrlKey&&!e.metaKey){const l=Ot(s),r=window.getSelection(),f=!r||r.isCollapsed;if(l===0&&f){const u=Array.from(document.querySelectorAll(".screenplay-block")),d=u.indexOf(t);if(d>0){e.preventDefault();const c=u[d-1],m=c.hasAttribute("contenteditable")?c:c.querySelector('[contenteditable="true"]'),b=s.innerText.trim();if(b===""||n==="parenthetical"&&(b==="()"||b==="")){Ts(o,a),m&&(m.focus(),Lt(m));return}const h=c.getAttribute("data-block-type");if(m&&(n==="action"&&h==="action"||n==="dialogue"&&h==="dialogue"||n==="text"&&h==="text")){const g=m.innerText.length,v=m.innerText+(m.innerText?" ":"")+s.innerText;m.innerText=v,Ct(c,v),Ts(o,a),m.focus(),Tt(m,g+(m.innerText?1:0));return}if(m){m.focus(),Lt(m);return}}}}if(e.key==="Delete"&&!e.ctrlKey&&!e.metaKey){const l=Ot(s),r=window.getSelection(),f=!r||r.isCollapsed;if(l>=s.innerText.length&&f){const u=Array.from(document.querySelectorAll(".screenplay-block")),d=u.indexOf(t);if(d<u.length-1){const c=u[d+1],m=c.hasAttribute("contenteditable")?c:c.querySelector('[contenteditable="true"]'),b=c.getAttribute("data-scene-id"),h=c.getAttribute("data-block-id"),g=c.getAttribute("data-block-type"),v=(m?m.innerText:"").trim();if(v===""||g==="parenthetical"&&(v==="()"||v==="")){e.preventDefault(),Ts(b,h);return}if(m&&(n==="action"&&g==="action"||n==="dialogue"&&g==="dialogue"||n==="text"&&g==="text")){e.preventDefault();const P=s.innerText.length,B=s.innerText+(s.innerText?" ":"")+m.innerText;s.innerText=B,Ct(t,B),Ts(b,h),Tt(s,P+(s.innerText?1:0));return}if(m){e.preventDefault(),m.focus(),Tt(m,0);return}}}}if(e.key==="ArrowLeft"){const l=Ot(s),r=window.getSelection();if(l===0&&(!r||r.isCollapsed)){const f=Array.from(document.querySelectorAll(".screenplay-block")),u=f.indexOf(t);if(u>0){e.preventDefault();const d=f[u-1],c=d.querySelector('[contenteditable="true"]')||d;c&&(c.focus(),Lt(c))}}}if(e.key==="ArrowRight"){const l=Ot(s),r=window.getSelection();if(l>=s.innerText.length&&(!r||r.isCollapsed)){const f=Array.from(document.querySelectorAll(".screenplay-block")),u=f.indexOf(t);if(u<f.length-1){e.preventDefault();const d=f[u+1],c=d.querySelector('[contenteditable="true"]')||d;c&&(c.focus(),Tt(c,0))}}}if(e.key==="("&&!e.ctrlKey&&!e.metaKey&&!e.altKey){const l=window.getSelection(),r=!l||l.isCollapsed;if((n==="character"||n==="dialogue")&&Qt(s)){e.preventDefault(),_s(t,"parenthetical");return}if(n==="parenthetical"&&r){const f=s.innerText;if(!f.includes(")")){e.preventDefault();const u=Ot(s),d=f.slice(0,u),c=f.slice(u),m=d+"()"+c;s.innerText=m,Ct(t,m),Tt(s,u+1),es(t,s);return}}if(n==="character"&&r){const f=s.innerText,u=Ot(s);if(!f.includes("(")){e.preventDefault();const d=f.slice(0,u).trimEnd(),c=f.slice(u).trimStart(),m=d+" ("+(c.includes(")")?c:c+")");s.innerText=m,Ct(t,m);const b=m.indexOf("(");Tt(s,b+1),es(t,s);return}}}if(e.key===")"&&!e.ctrlKey&&!e.metaKey&&!e.altKey){const l=s.innerText,r=Ot(s),f=window.getSelection();if(f&&f.isCollapsed&&r<l.length&&l.charAt(r)===")"){e.preventDefault(),Tt(s,r+1);return}}if(e.key==="Tab"){e.preventDefault(),gt(),Al(t,e.shiftKey);return}if(e.key==="Enter"&&!e.shiftKey){if(gt(),n==="scene"){e.preventDefault();const l=ns(s.innerText);l.location&&Hn(l.location),qt(o,a,"action");return}if(n==="character"){e.preventDefault();const l=s.innerText.trim(),r=Dt(l),f=Mn(l),u=On(l),d=Oa(o,a,r);let c=l;const m=f||null;d&&!u?c=tn(r,m,!0):!d&&m?c=tn(r,m,!1):!u&&r&&(c=r),s.innerText=c,Ct(t,c),sn(r),qt(o,a,"dialogue");return}if(n==="dialogue"){e.preventDefault(),qt(o,a,"action");return}if(n==="parenthetical"){e.preventDefault();let l=s.innerText.trim();l.endsWith(")")||(l+=")",s.innerText=l,Ct(t,l)),qt(o,a,"dialogue");return}if(n==="transition"){e.preventDefault(),Cl(o,a);return}if(n==="shot"||n==="note"||n==="outline"){e.preventDefault(),qt(o,a,"action");return}if(n==="act"||n==="endact"||n==="sequence"){e.preventDefault(),qt(o,a,"scene");return}if(n==="lyrics"){e.preventDefault(),qt(o,a,"lyrics");return}if(n==="action"||n==="text"){e.preventDefault(),qt(o,a,n);return}}}function qt(e,t,s,n){const o=H.scenes.find(u=>u.id===e);if(!o)return;const a=o.blocks.findIndex(u=>u.id===t),i=`b-${Date.now().toString().slice(-6)}`,l={id:i,type:s,content:""};a!==-1?o.blocks.splice(a+1,0,l):o.blocks.push(l);const r=document.getElementById(t),f=r?r.closest(".page-blocks-wrapper"):null;if(r&&f){const u=document.createElement("div");u.innerHTML=Da(l,o.number,o.id);const d=u.firstElementChild;r.insertAdjacentElement("afterend",d),Ra(d),rn();const c=d.hasAttribute("contenteditable")?d:d.querySelector('[contenteditable="true"]');c&&(c.focus(),Lt(c));const m=f.querySelectorAll(".screenplay-block");let b=0;m.forEach(h=>{const g=h.getAttribute("data-block-type"),v=h.innerText||"";b+=Ta({type:g,content:v})}),b>Na&&(ft(),setTimeout(()=>{const h=document.getElementById(i);if(h){const g=h.querySelector('[contenteditable="true"]')||h;g.focus(),Lt(g)}},20))}else ft(),setTimeout(()=>{const u=document.getElementById(i);if(u){const d=u.hasAttribute("contenteditable")?u:u.querySelector('[contenteditable="true"]');d&&(d.focus(),Lt(d))}},20)}function Cl(e,t=null){const s=H.scenes.findIndex(r=>r.id===e),n=H.scenes.length+1,o=`scene-${Date.now().toString().slice(-5)}`,a=`b-${Date.now().toString().slice(-6)}`;let i=[];if(t&&s!==-1){const r=H.scenes[s],f=r.blocks?r.blocks.findIndex(u=>u.id===t):-1;f!==-1&&f<r.blocks.length-1&&(i=r.blocks.splice(f+1))}const l={id:o,number:n,actId:H.acts?.[0]?.id||"act-1",slugline:"",blocks:[{id:a,type:"scene",content:""},...i]};s!==-1?H.scenes.splice(s+1,0,l):H.scenes.push(l),H.scenes.forEach((r,f)=>{r.number=f+1}),ft(),Fs(),setTimeout(()=>{const r=document.getElementById(a);if(r){const f=r.querySelector('[contenteditable="true"]');f&&(f.focus(),Lt(f),es(r,f))}},30)}function Al(e,t=!1){if(!e)return!1;const s=e.getAttribute("data-block-type")||"action";let n;return t?s==="scene"?n="transition":s==="transition"?n="dialogue":s==="dialogue"?n="character":s==="character"||s==="action"||s==="text"?n="scene":s==="parenthetical"?n="character":n="scene":s==="scene"?n="character":s==="character"?n="dialogue":s==="dialogue"?n="transition":s==="transition"?n="scene":s==="action"||s==="text"?n="character":s==="parenthetical"?n="dialogue":n="character",n?(_s(e,n),!0):!1}function _s(e,t){const s=e.getAttribute("data-block-id"),n=e.getAttribute("data-scene-id"),o=H.scenes.find(i=>i.id===n);if(!o)return;const a=o.blocks.find(i=>i.id===s);if(a){if(a.type=t,(t==="character"||t==="scene"||t==="transition")&&(a.content=a.content.toUpperCase()),(t==="action"||t==="dialogue")&&(a.content=Ds(a.content)),t==="parenthetical"){let i=a.content.replace(/^\(+|\)+$/g,"").trim();i?a.content=`(${i})`:a.content="()"}Xe=!0,Ue&&ct(),ft(),setTimeout(()=>{const i=document.getElementById(s);if(i){const l=i.hasAttribute("contenteditable")?i:i.querySelector('[contenteditable="true"]');if(l){if(l.focus(),t==="parenthetical"&&l.innerText==="()"){const r=l.firstChild;if(r){const f=document.createRange(),u=window.getSelection();f.setStart(r,1),f.collapse(!0),u.removeAllRanges(),u.addRange(f)}}else Lt(l);ln(t),t==="transition"?es(i,l):gt()}}(t==="scene"||t==="character")&&Fs()},25)}}function Lt(e){const t=document.createRange(),s=window.getSelection();t.selectNodeContents(e),t.collapse(!1),s.removeAllRanges(),s.addRange(t)}function $l(){document.addEventListener("click",t=>{t.target.closest("#editor-autocomplete-dropdown")||gt()});const e=()=>{const t=document.getElementById("editor-autocomplete-dropdown");if(t&&!t.classList.contains("hidden")&&Ye){const s=document.getElementById(Ye);if(s){const n=s.querySelector('[contenteditable="true"]')||s;Ma(t,n)}}};window.addEventListener("scroll",e,{capture:!0,passive:!0}),document.addEventListener("selectionchange",()=>{const t=document.getElementById("editor-autocomplete-dropdown");t&&!t.classList.contains("hidden")&&e()}),window.visualViewport&&(window.visualViewport.addEventListener("resize",e),window.visualViewport.addEventListener("scroll",e))}function gt(){const e=document.getElementById("editor-autocomplete-dropdown");e&&e.classList.add("hidden")}function Bl(e){if(!e)return null;const t=window.getSelection();if(t&&t.rangeCount>0)try{const n=t.getRangeAt(0);if(e.contains(n.startContainer)||e===n.startContainer){const o=n.getClientRects();if(o&&o.length>0){const i=o[o.length-1];if(i&&i.height>0&&i.top>0)return{top:i.top,bottom:i.bottom,left:i.left,right:i.right,width:i.width,height:i.height}}const a=n.getBoundingClientRect();if(a&&a.height>0&&a.top>0)return{top:a.top,bottom:a.bottom,left:a.left,right:a.right,width:a.width,height:a.height}}}catch{}const s=e.getBoundingClientRect();return{top:s.top,bottom:s.bottom,left:s.left,right:s.right,width:s.width,height:s.height}}function Ma(e,t){if(!e||!t)return;e.parentElement!==document.body&&document.body.appendChild(e);const s=Bl(t);if(!s)return;const n=window.visualViewport,o=n?n.offsetTop:0,a=n?n.offsetLeft:0,i=n?n.height:window.innerHeight,l=n?n.width:window.innerWidth,r=document.getElementById("editor-fixed-header")||document.getElementById("editor-header-nav"),f=r?r.getBoundingClientRect().bottom:o+56;if(s.bottom<f+4||s.top>o+i-16){gt();return}const u=Math.min(270,l-24);e.style.width=`${u}px`;const d=Math.min(220,e.scrollHeight||180),c=o+i-s.bottom-8,m=s.top-Math.max(f,o)-8;let b,h=d;c<d&&m>c?(h=Math.max(80,Math.min(d,m)),b=s.top-h-6):(h=Math.max(80,Math.min(d,c)),b=s.bottom+6),b=Math.max(Math.max(f,o)+4,Math.min(o+i-h-8,b)),e.style.maxHeight=`${Math.round(h)}px`,e.style.overflowY="auto";const v=t.closest(".screenplay-block"),P=v?v.getAttribute("data-block-type"):null;let B;P==="transition"?B=Math.max(a+12,s.right-u):(B=s.left,B+u>a+l-12&&(B=a+l-u-12),B<a+12&&(B=a+12)),e.style.top=`${Math.round(b)}px`,e.style.left=`${Math.round(B)}px`}function Oa(e,t,s){if(!H?.scenes)return null;const n=H.scenes.find(l=>l.id===e);if(!n||!Array.isArray(n.blocks))return null;const o=Dt(s);if(!o)return null;const a=n.blocks.findIndex(l=>l.id===t),i=a!==-1?n.blocks.slice(0,a):n.blocks;for(let l=i.length-1;l>=0;l--){const r=i[l];if(r.type==="character"&&r.content){const f=Dt(r.content);if(f===o)return{baseName:f,extension:Mn(r.content),hasContd:On(r.content),fullContent:r.content}}}return null}function ja(){if(!H)return[];const e=[];return(H.scenes||[]).forEach(t=>{(t.blocks||[]).forEach(s=>{s.type==="character"&&s.content&&e.push(s.content)})}),(H.characters||[]).forEach(t=>{t&&e.push(t)}),$a(e)}function Nl(){if(!H)return[];const e=new Set;(H.scenes||[]).forEach(s=>{(s.blocks||[]).forEach(n=>{if(n.type==="scene"){const o=ns(n.content);o.location&&o.location.length>=2&&e.add(o.location)}})}),(H.locations||[]).forEach(s=>{const n=(s||"").trim().toUpperCase();n&&n.length>=2&&e.add(n)});const t=Array.from(e);return t.filter(s=>t.some(o=>o!==s&&o.startsWith(s))?H.scenes?.some(a=>a.blocks?.some(i=>i.type==="scene"&&ns(i.content).location===s)):!0)}function es(e,t){const s=e.getAttribute("data-block-type"),n=t.innerText,o=document.getElementById("editor-autocomplete-dropdown");if(!o)return;let a=[];if(s==="scene"){const i=n.toUpperCase(),l=n.match(/\s+-\s*([A-Za-z]*)$/);if(l){const r=(l[1]||"").toUpperCase(),u=["DAY","NIGHT","MORNING","EVENING","DAWN","DUSK","CONTINUOUS","LATER"].filter(c=>c.startsWith(r)),d=n.replace(/\s+-\s*[A-Za-z]*$/," - ");a=u.map(c=>({label:c,val:d+c}))}else if(i==="I"||i==="IN")a=["INT.","INT./EXT.","I/E."].map(r=>({label:r,val:r+" "}));else if(i==="E"||i==="EX")a=["EXT.","INT./EXT.","I/E."].map(r=>({label:r,val:r+" "}));else if(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i.test(n)){const r=n.match(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i),f=r[1].toUpperCase()+" ",u=(r[2]||"").trim().toUpperCase();u.length>0&&(a=Nl().filter(m=>m.startsWith(u)).map(m=>({label:m,val:`${f}${m}`})))}}else if(s==="character"){const i=n.indexOf("(");if(i!==-1){const l=n.slice(0,i).trim(),r=Dt(l);if(r&&r.length>=1){const f=n.slice(i+1).replace(/\)$/,"").trim().toUpperCase(),u=pl.filter(d=>{if(!f)return!0;const c=f.replace(/[^A-Z]/g,""),m=d.code.replace(/[^A-Z]/g,"");return d.code.toUpperCase().startsWith(f)||c.length>0&&m.startsWith(c)||d.desc.toUpperCase().startsWith(f)});if(u.length>0){const d=e.getAttribute("data-scene-id"),c=e.getAttribute("data-block-id"),b=!!Oa(d,c,r);a=u.map(h=>{let g;return h.code==="CONT'D"?g=tn(r,null,!0):g=tn(r,h.code,b),{type:"character-extension",extCode:h.code,baseName:r,isContd:b,label:`${h.code} — ${h.desc}`,shortLabel:h.code,desc:h.desc,val:g}})}}}else{const l=n.trim().toUpperCase();l.length>0&&(a=ja().filter(u=>u.startsWith(l)).map(u=>({type:"character-name",baseName:u,label:u,val:u})))}}else if(s==="parenthetical"){const i=n.replace(/^\(+|\)+$/g,"").trim().toLowerCase();if(i.length>0){const l=ul.filter(r=>r.startsWith(i));l.length>0&&(a=l.map(r=>({type:"parenthetical",label:`(${r})`,val:`(${r})`})))}}else if(s==="transition"){const l=(n||"").replace(/[\u200B\u00A0\r\n\t]/g,"").trim().toUpperCase(),r=Array.isArray(H?.transitions)&&H.transitions.length>0?Array.from(new Set([...oa,...H.transitions])):oa;if(l.length===0)a=r.map(f=>({label:f,val:f}));else{const f=r.filter(c=>c.toUpperCase().startsWith(l)),u=r.filter(c=>!c.toUpperCase().startsWith(l)&&c.toUpperCase().includes(l));a=[...f,...u].map(c=>({label:c,val:c}))}}if(a.length===0){gt();return}o.innerHTML=a.map((i,l)=>{const r=typeof i=="object"?i.label:i,f=typeof i=="object"?i.val:i,u=i.type==="character-extension",d=i.type==="parenthetical";let c="";return u?c=`
        <div class="flex items-center gap-2">
          <span class="font-bold tracking-wide text-blue-700">${i.shortLabel}</span>
          <span class="text-[11px] text-slate-500 font-sans">— ${i.desc}</span>
        </div>
        <span class="text-[10px] text-slate-400 font-sans hidden sm:inline">Enter ↵</span>
      `:d?c=`
        <span class="tracking-wide italic text-slate-700 font-mono">${r}</span>
        <span class="text-[10px] text-slate-400 font-sans hidden sm:inline">Enter ↵</span>
      `:c=`
        <span class="tracking-wide">${r}</span>
        <span class="text-[10px] text-slate-400 font-sans hidden sm:inline">Enter ↵</span>
      `,`
      <div class="autocomplete-item px-3 py-2 sm:py-1.5 hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-blue-700 cursor-pointer flex items-center justify-between font-mono text-xs border-b border-slate-50 last:border-b-0 ${l===0?"active bg-blue-50/70 text-blue-700 font-semibold":""}" data-val="${f}" data-type="${i.type||""}" data-idx="${l}">
        ${c}
      </div>
    `}).join(""),o.classList.remove("hidden"),Ma(o,t),o.querySelectorAll(".autocomplete-item").forEach(i=>{i.addEventListener("pointerdown",l=>{l.preventDefault()}),i.onclick=l=>{l.stopPropagation();const r=parseInt(i.getAttribute("data-idx"),10),f=a[r]||{},u=i.getAttribute("data-val"),d=i.getAttribute("data-type");if(t.innerText=u,Ct(e,u),d==="character-extension"){f.baseName&&sn(f.baseName),gt();const c=e.getAttribute("data-scene-id"),m=e.getAttribute("data-block-id");qt(c,m,"dialogue")}else if(d==="parenthetical")gt(),Tt(t,u.length);else if(s==="character")sn(f.baseName||u),gt(),Lt(t);else if(s==="scene"){const c=ns(u);c.location&&Hn(c.location),gt(),Lt(t)}else gt(),Lt(t);Xe=!0,Ue&&ct()}})}function ra(e){const t=document.getElementById("editor-autocomplete-dropdown");if(!t)return;const s=t.querySelectorAll(".autocomplete-item");if(s.length===0)return;let n=Array.from(s).findIndex(o=>o.classList.contains("active"));n!==-1&&s[n].classList.remove("active","bg-blue-50/70","text-blue-700","font-semibold"),n=(n+e+s.length)%s.length,s[n].classList.add("active","bg-blue-50/70","text-blue-700","font-semibold"),s[n].scrollIntoView({block:"nearest"})}async function ds(e=!1){if(!(Js||!H)){Js=!0,us("Saving..."),H.scenes&&H.scenes.forEach(t=>{t.blocks&&t.blocks.forEach(s=>{s.content&&(s.content=rt(s.content),(s.type==="action"||s.type==="dialogue")&&(s.content=Ds(s.content))),s.char1&&(s.char1=rt(s.char1)),s.dia1&&(s.dia1=rt(s.dia1)),s.char2&&(s.char2=rt(s.char2)),s.dia2&&(s.dia2=rt(s.dia2))})});try{await on(H.id,H),Xe=!1,Js=!1,us("Saved"),e&&S("Saved")}catch{Js=!1,us("Save failed"),S("Couldn't save changes · Tap retry")}}}function ct(){Ue&&(clearTimeout(Nn),Nn=setTimeout(async()=>{Xe&&Ue&&(await ds(!1),us("Autosaved just now"),S("Autosaved just now"))},1500))}function us(e){const t=document.getElementById("editor-save-status"),s=document.getElementById("editor-save-icon");t&&(t.textContent=e),e==="Saving..."?s&&(s.textContent="progress_activity",s.classList.add("animate-spin")):e==="Saved"||e==="Autosaved just now"||e==="Unsaved"?s&&(s.textContent="save",s.classList.remove("animate-spin")):e==="Save failed"&&s&&(s.textContent="warning",s.classList.remove("animate-spin"))}function Fs(){if(!H)return;const e=document.getElementById("navSceneSelect");if(e){const t=H.scenes||[];e.innerHTML=t.map((s,n)=>`
      <option value="${s.id}" ${n===0?"selected":""}>Scene ${s.number} ▾</option>
    `).join("")||'<option value="">Scene 1 ▾</option>'}}function Tl(){const e=document.getElementById("navSceneSelect");e&&(e.onchange=s=>{const n=s.target.value;if(!n)return;ca(n);const o=H?.scenes?.find(a=>a.id===n);o&&$.setState({currentSceneId:o.number})});let t=null;try{const s=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search,n=new URLSearchParams(s||"");n.get("scene")&&(t=n.get("scene"))}catch{}if(!t&&$.state.currentSceneId&&(t=$.state.currentSceneId),t&&H?.scenes){const s=H.scenes.find(n=>String(n.number)===String(t)||n.id===String(t)||n.id===`scene-${t}`);s&&(e&&(e.value=s.id),setTimeout(()=>ca(s.id),250))}}function ca(e){const t=document.querySelector(`[data-scene-id="${e}"][data-block-type="scene"]`)||document.querySelector(`[data-scene-id="${e}"]`);t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.classList.add("bg-blue-50/50"),setTimeout(()=>t.classList.remove("bg-blue-50/50"),1500))}function Pl(){const e=document.getElementById("element-bar");e&&e.querySelectorAll(".element-btn").forEach(t=>{t.onclick=s=>{s.preventDefault();const n=t.getAttribute("data-type");Ll(n)}})}const mt={bold:null,italic:null,underline:null,strikeThrough:null};let da=!1;function zt(e){const t=window.getSelection();if(!t||t.rangeCount===0)return!1;const s=t.anchorNode,n=s?.nodeType===Node.ELEMENT_NODE?s:s?.parentElement;if(!n)return!1;const o=n.closest(".screenplay-block");if(!o)return!1;if(!t.isCollapsed&&t.toString().trim().length>0)try{return document.queryCommandState(e)}catch{return!1}const a=o.getAttribute("data-block-type"),i=a==="scene"||a==="character"||a==="transition";try{if(e==="bold"){if(i){const l=n.closest("b, strong");return!!l&&l!==o}return document.queryCommandState("bold")}if(e==="strikeThrough")return n.closest("s, strike, del")?!0:document.queryCommandState("strikeThrough");if(e==="italic")return document.queryCommandState("italic");if(e==="underline")return document.queryCommandState("underline")}catch{return!1}return!1}function Jt(e){let t=document.activeElement,s=t?t.closest(".screenplay-block"):null,n=s?s.hasAttribute("contenteditable")?s:s.querySelector('[contenteditable="true"]'):null;if(!n&&Ye){const i=document.getElementById(Ye);i&&(s=i,n=i.hasAttribute("contenteditable")?i:i.querySelector('[contenteditable="true"]'))}if(!n){const i=document.querySelector(".screenplay-block");i&&(s=i,n=i.hasAttribute("contenteditable")?i:i.querySelector('[contenteditable="true"]'))}n&&document.activeElement!==n&&n.focus();const o=window.getSelection();if(o&&!o.isCollapsed&&o.rangeCount>0&&o.toString().trim().length>0){try{document.execCommand(e,!1,null)}catch{}s&&n&&Ct(s,n.innerHTML),Xe=!0,Ue&&ct(),mt[e]=null,ts()}else{const l=!(mt[e]!==null?mt[e]:zt(e));mt[e]=l;try{document.execCommand(e,!1,null)}catch{}ts()}}function Ll(e){if(e==="bold"){Jt("bold");return}if(e==="italic"){Jt("italic");return}if(e==="underline"){Jt("underline");return}if(e==="strike"){Jt("strikeThrough");return}if(e==="undo"){document.execCommand("undo",!1,null),ts();return}if(e==="redo"){document.execCommand("redo",!1,null),ts();return}if(e==="image"){if(!Ye){const t=Array.from(document.querySelectorAll(".screenplay-block")),s=window.innerHeight/2;for(const n of t){const o=n.getBoundingClientRect();if(o.top<=s&&o.bottom>=s){Ye=n.getAttribute("data-block-id");break}}}jn=Ye,_a(!0);return}if(!Ye){const t=document.querySelector(".screenplay-block");t&&(Ye=t.getAttribute("data-block-id"))}if(Ye){const t=document.getElementById(Ye);t&&(_s(t,e),ln(e))}}function ln(e){const t=document.getElementById("element-bar");t&&t.querySelectorAll(".element-btn").forEach(s=>{s.getAttribute("data-type")===e?s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-white bg-blue-600 shadow-2xs font-semibold shrink-0":s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0"})}function Dl(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),n=document.getElementById("btn-format-strike");[{btn:e,cmd:"bold"},{btn:t,cmd:"italic"},{btn:s,cmd:"underline"},{btn:n,cmd:"strikeThrough"}].forEach(({btn:i,cmd:l})=>{i&&(i.onmousedown=r=>{r.preventDefault(),r.stopPropagation()},i.onclick=r=>{r.preventDefault(),r.stopPropagation(),Jt(l)})}),da||(da=!0,document.addEventListener("selectionchange",()=>{ts()}));const a=document.getElementById("editor-main-scroll");a&&(a.addEventListener("keyup",ts),a.addEventListener("mouseup",ts))}function ts(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),n=document.getElementById("btn-format-strike");if(!e||!t||!s||!n)return;const o="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center border border-blue-600 shadow-2xs font-semibold active:scale-95 transition-all cursor-pointer",a="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center border border-slate-200/90 active:scale-95 transition-all cursor-pointer";try{const i=window.getSelection();let l=!1,r=!1,f=!1,u=!1;i&&!i.isCollapsed&&i.rangeCount>0&&i.toString().trim().length>0?(l=zt("bold"),r=zt("italic"),f=zt("underline"),u=zt("strikeThrough")):(l=mt.bold!==null?mt.bold:zt("bold"),r=mt.italic!==null?mt.italic:zt("italic"),f=mt.underline!==null?mt.underline:zt("underline"),u=mt.strikeThrough!==null?mt.strikeThrough:zt("strikeThrough")),e.className=l?o:a,t.className=r?o:a,s.className=f?o:a,n.className=u?o:a}catch{}}function Rl(e,t){const s=document.getElementById("editor-more-menu-btn"),n=document.getElementById("editorMoreMenuModal"),o=document.getElementById("closeMoreMenuBtn");function a(Z){n&&(n.classList.remove("hidden"),n.classList.add("flex"),Gt({id:"moreMenu",name:"Screenplay Tools",close:()=>{n.classList.add("hidden"),n.classList.remove("flex")},restore:()=>{n.classList.remove("hidden"),n.classList.add("flex")}}))}s&&(s.onclick=()=>a()),o&&(o.onclick=()=>Ee("moreMenu")),n&&(n.onclick=Z=>{Z.target===n&&Ee("moreMenu")});const i=document.getElementById("menu-btn-scene-navigator");i&&(i.onclick=()=>{Ee("moreMenu");const Z=document.getElementById("navSceneSelect");Z&&Z.focus()});const l=document.getElementById("menu-btn-char-navigator");l&&(l.onclick=()=>{Ee("moreMenu");const Z=ja(),ve=prompt(`Select character to navigate to:
${Z.join(", ")}`,Z[0]||"HILL");if(ve){for(const C of H.scenes)for(const G of C.blocks)if(G.type==="character"&&G.content.toUpperCase().includes(ve.trim().toUpperCase())){const $e=document.getElementById(G.id);if($e){$e.scrollIntoView({behavior:"smooth",block:"center"}),$e.classList.add("bg-blue-100/60"),setTimeout(()=>$e.classList.remove("bg-blue-100/60"),1500);return}}}});const r=document.getElementById("sceneNumberToggle"),f=document.getElementById("sceneNumberToggleText"),u=document.getElementById("menuSceneNumState"),d=document.getElementById("menu-btn-scene-numbers");function c(){Wt=!Wt,f&&(f.textContent=`Scene #s: ${Wt?"On":"Off"}`),u&&(u.textContent=Wt?"Enabled":"Disabled"),document.querySelectorAll(".scene-num-indicator").forEach(Z=>{Z.classList.toggle("hidden",!Wt)}),S(`Scene numbers ${Wt?"enabled (left side)":"hidden"}`)}r&&(r.onclick=c),d&&(d.onclick=()=>{c(),Ee("moreMenu")});const m=document.getElementById("focusModeToggle"),b=document.getElementById("focusModeText"),h=document.getElementById("menu-btn-focus-mode"),g=document.getElementById("menuFocusState");function v(Z=null){Ut=Z!==null?Z:!Ut,b&&(b.textContent=Ut?"Exit Focus":"Focus"),g&&(g.textContent=Ut?"Active":"Off");const ve=document.getElementById("editor-collapsible-toolbars"),C=document.getElementById("editor-document-tabs"),G=document.getElementById("editor-fixed-header");if(Ut?(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!0),G&&(G.style.top="0px")):(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!1),G&&(G.style.top="0px")),ve&&(ve.style.display=Ut?"none":""),C&&(C.style.display=Ut?"none":"flex"),Ps(),Ut)Gt({id:"focusMode",name:"Focus Mode",close:()=>v(!1)}),S("Focus Mode active (distraction-free)");else{const $e=Je.findIndex(ne=>ne.id==="focusMode");$e!==-1&&Je.splice($e,1),S("Exited Focus Mode")}}m&&(m.onclick=()=>v()),h&&(h.onclick=()=>{Ee("moreMenu"),v()});const P=document.getElementById("langToggleBtn"),B=document.getElementById("langToggleText"),L=document.getElementById("tamilLangBadge");function k(Z){vn=Z,B&&(B.textContent=Z==="TA"?"தமிழ் / EN":Z==="TL"?"Tanglish":"EN / தமிழ்"),L&&(L.textContent=Z==="TA"?"தமிழ் விசைப்பலகை: இயங்குகிறது":Z==="TL"?"Tanglish: Active":"Tamil IME: Ready"),S(`Screenplay language set to ${Z==="TA"?"Tamil":Z==="TL"?"Tanglish":"English"}`)}P&&(P.onclick=()=>{k(vn==="EN"?"TA":vn==="TA"?"TL":"EN")}),document.querySelectorAll(".lang-choice-btn").forEach(Z=>{Z.onclick=()=>{k(Z.getAttribute("data-lang")),Ee("moreMenu")}});const U=document.getElementById("btn-open-production"),T=document.getElementById("menu-btn-production"),de=()=>{const Z=e||$.state.selectedScriptId||"chronicles-of-dust";sessionStorage.setItem("scriptora_prod_return",`/editor/${Z}`),t(`/production?from=editor&scriptId=${encodeURIComponent(Z)}`)};U&&(U.onclick=de),T&&(T.onclick=()=>{Ee("moreMenu"),de()});const se=document.getElementById("menu-btn-go-page");se&&(se.onclick=()=>{Ee("moreMenu");const Z=document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)").length||1,ve=prompt(`Enter page number to jump to (1-${Z}):`,"1");if(ve){const C=document.querySelector(`[data-page-num="${ve}"]`);C&&C.scrollIntoView({behavior:"smooth",block:"start"})}});const ge=document.getElementById("menu-btn-page-break");ge&&(ge.onclick=()=>{Ee("moreMenu"),_n()});const J=document.getElementById("menu-btn-insert-page");J&&(J.onclick=()=>{Ee("moreMenu"),Pa()});const ke=document.getElementById("menu-btn-page-before");ke&&(ke.onclick=()=>{Ee("moreMenu"),La()});const be=document.getElementById("menu-btn-page-at-end");be&&(be.onclick=()=>{Ee("moreMenu"),Fn()});const ee=document.getElementById("btn-undo"),pe=document.getElementById("btn-redo");ee&&(ee.onclick=()=>document.execCommand("undo")),pe&&(pe.onclick=()=>document.execCommand("redo"))}function Ml(){const e=document.getElementById("btn-quick-find"),t=document.getElementById("menu-btn-find-replace"),s=document.getElementById("closeFindBtn"),n=document.getElementById("findInput"),o=document.getElementById("replaceInput"),a=document.getElementById("findNextBtn"),i=document.getElementById("findPrevBtn"),l=document.getElementById("replaceBtn"),r=document.getElementById("replaceAllBtn"),f=document.getElementById("findReplaceModal");e&&(e.onclick=()=>nn(!0)),t&&(t.onclick=()=>{Ee("moreMenu"),nn(!0)}),s&&(s.onclick=()=>Ee("findModal")),f&&(f.onclick=u=>{u.target===f&&Ee("findModal")}),n&&(n.oninput=()=>En(n.value)),a&&(a.onclick=()=>Pn(1)),i&&(i.onclick=()=>Pn(-1)),l&&(l.onclick=()=>{const u=n.value,d=o.value;if(!u||Kt===-1||!$t[Kt])return;const c=$t[Kt];c.block.content=c.block.content.replace(u,d),ft(),En(u),Xe=!0,Ue&&ct(),S("Replaced 1 occurrence")}),r&&(r.onclick=()=>{const u=n.value,d=o.value;if(!u)return;let c=0;H.scenes.forEach(m=>{m.blocks.forEach(b=>{b.content&&b.content.includes(u)&&(b.content=b.content.split(u).join(d),c++)})}),ft(),En(u),Xe=!0,Ue&&ct(),S(`Replaced ${c} occurrences`)})}function nn(e){const t=document.getElementById("findReplaceModal");if(t)if(e)wn=document.getElementById("editor-main-scroll")?.scrollTop||0,Sn=Ye,t.classList.remove("hidden"),t.classList.add("flex"),Gt({id:"findModal",name:"Find & Replace",close:()=>nn(!1)}),setTimeout(()=>{document.getElementById("findInput")?.focus()},40);else{t.classList.add("hidden"),t.classList.remove("flex"),Un();const s=document.getElementById("editor-main-scroll");if(s&&wn!==null&&(s.scrollTop=wn),Sn){const o=document.getElementById(Sn),a=o?.querySelector('[contenteditable="true"]')||o;a&&a.focus()}const n=Je.findIndex(o=>o.id==="findModal");n!==-1&&Je.splice(n,1)}}function En(e){$t=[],Kt=-1;const t=document.getElementById("findMatchesCount");if(!e||!H){t&&(t.textContent="0 of 0"),Un();return}H.scenes.forEach(s=>{s.blocks.forEach(n=>{n.content&&n.content.toLowerCase().includes(e.toLowerCase())&&$t.push({block:n,sceneId:s.id})})}),t&&(t.textContent=$t.length>0?`1 of ${$t.length}`:"0 of 0"),$t.length>0&&Pn(0)}function Pn(e){if($t.length===0)return;Kt=(Kt+e+$t.length)%$t.length;const t=$t[Kt],s=document.getElementById("findMatchesCount");s&&(s.textContent=`${Kt+1} of ${$t.length}`);const n=document.getElementById(t.block.id);n&&(n.scrollIntoView({behavior:"smooth",block:"center"}),Un(),n.classList.add("bg-yellow-100"))}function Un(){document.querySelectorAll(".screenplay-block").forEach(e=>{e.classList.remove("bg-yellow-100")})}function _a(e){const t=document.getElementById("imageModal");if(t)if(e)Ye&&(jn=Ye),t.classList.remove("hidden"),t.classList.add("flex"),Gt({id:"imageModal",name:"Insert Image",close:()=>_a(!1)});else{t.classList.add("hidden"),t.classList.remove("flex");const s=Je.findIndex(n=>n.id==="imageModal");s!==-1&&Je.splice(s,1)}}function Ol(e){const t=document.getElementById("imageModal"),s=document.getElementById("closeImageModal"),n=document.getElementById("cancelImageBtn"),o=document.getElementById("insertImageBtn"),a=document.getElementById("imgFileInput"),i=document.getElementById("imgUploadLabel"),l=document.getElementById("imgUrlInput"),r=document.getElementById("imgCaptionInput"),f=document.getElementById("imgPreviewContainer"),u=document.getElementById("imgPreviewThumb"),d=document.getElementById("clearImgPreviewBtn");let c="";function m(z){f&&u&&(z?(u.src=z,f.classList.remove("hidden")):(f.classList.add("hidden"),u.src=""))}function b(z,I){const F=new Image;F.onload=()=>{let te=F.width,he=F.height;(te>900||he>600)&&(te/he>900/600?(he=Math.round(he*900/te),te=900):(te=Math.round(te*600/he),he=600));const me=document.createElement("canvas");me.width=te,me.height=he,me.getContext("2d").drawImage(F,0,0,te,he),I(me.toDataURL("image/jpeg",.85))},F.onerror=()=>I(z),F.src=z}s&&(s.onclick=()=>Ee("imageModal")),n&&(n.onclick=()=>Ee("imageModal")),t&&(t.onclick=z=>{z.target===t&&Ee("imageModal")}),document.querySelectorAll(".img-preset-btn").forEach(z=>{z.onclick=()=>{const I=z.getAttribute("data-url"),F=z.getAttribute("data-caption");l&&(l.value=I),r&&!r.value&&(r.value=F),c=I,m(I)}}),l&&(l.oninput=()=>{const z=l.value.trim();z?(c="",m(z)):c||m("")}),d&&(d.onclick=()=>{c="",l&&(l.value=""),a&&(a.value=""),i&&(i.textContent="Choose local image..."),m("")}),a&&(a.onchange=z=>{const I=z.target.files?.[0];if(I){i&&(i.textContent=I.name);const F=new FileReader;F.onload=Y=>{b(Y.target.result,W=>{c=W,m(W)})},F.readAsDataURL(I)}}),o&&(o.onclick=()=>{const z=l?.value.trim(),I=r?.value.trim();let F=c||z;F||(F="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80");const Y={id:`b-${Date.now().toString().slice(-6)}`,type:"image",url:F,content:F,caption:I||""},W=jn||Ye;let te=null,he=-1;if(H.scenes&&H.scenes.length>0){if(W)for(const me of H.scenes){const Ce=(me.blocks||[]).findIndex(Be=>Be.id===W);if(Ce!==-1){te=me,he=Ce+1;break}}if(!te){const Ce=document.getElementById("navSceneSelect")?.value||($.state.currentSceneId?`scene-${$.state.currentSceneId}`:null);Ce&&(te=H.scenes.find(Be=>Be.id===Ce||String(Be.number)===String($.state.currentSceneId)))}if(!te){const me=Array.from(document.querySelectorAll(".screenplay-block")),Ce=window.innerHeight/2;for(const Be of me){const Le=Be.getBoundingClientRect();if(Le.top<=Ce&&Le.bottom>=Ce){const De=Be.getAttribute("data-scene-id");te=H.scenes.find(j=>j.id===De);const w=Be.getAttribute("data-block-id");if(te&&w){const j=(te.blocks||[]).findIndex(V=>V.id===w);j!==-1&&(he=j+1)}break}}}te||(te=H.scenes[0]),te.blocks||(te.blocks=[]),he!==-1&&he<=te.blocks.length?te.blocks.splice(he,0,Y):te.blocks.push(Y)}else H.scenes=[{id:"scene-1",number:1,slugline:"INT. SCENE - DAY",blocks:[Y]}];c="",a&&(a.value=""),l&&(l.value=""),r&&(r.value=""),i&&(i.textContent="Upload local image file..."),m(""),ft(),Xe=!0,Ue&&ct(),S("Storyboard image inserted"),Ee("imageModal"),setTimeout(()=>{const me=document.getElementById(Y.id);me&&(me.scrollIntoView({behavior:"smooth",block:"center"}),me.classList.add("ring-2","ring-blue-500"),setTimeout(()=>me.classList.remove("ring-2","ring-blue-500"),1500))},80)});const h=document.getElementById("preferencesModal"),g=document.getElementById("menu-btn-preferences"),v=document.getElementById("closePrefModal"),P=document.getElementById("savePrefBtn");function B(z){if(h)if(z)h.classList.remove("hidden"),h.classList.add("flex"),Gt({id:"preferencesModal",name:"Preferences",close:()=>B(!1)});else{h.classList.add("hidden"),h.classList.remove("flex");const I=Je.findIndex(F=>F.id==="preferencesModal");I!==-1&&Je.splice(I,1)}}g&&(g.onclick=()=>{Ee("moreMenu"),B(!0)}),v&&(v.onclick=()=>Ee("preferencesModal")),h&&(h.onclick=z=>{z.target===h&&Ee("preferencesModal")}),P&&(P.onclick=()=>{const z=document.getElementById("prefSceneNumbers")?.checked,I=document.getElementById("prefLineSpacing")?.value,F=document.getElementById("prefFontSize")?.value;Wt=z,document.querySelectorAll(".scene-num-indicator").forEach(W=>W.classList.toggle("hidden",!z));const Y=document.querySelector(".screenplay-page-sheet");Y&&(Y.style.lineHeight=I==="2.0"?"30px":I==="1.0"?"20px":"24px",Y.style.fontSize=F==="14pt"?"16px":"15px"),Ee("preferencesModal"),S("Preferences applied")});function L(z){return z?z.replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/[\r\n]+/g," ").replace(/[^\x20-\x7E]/g,I=>({"—":"--","–":"-","“":'"',"”":'"',"‘":"'","’":"'","…":"...","·":"-","•":"*"})[I]||" "):""}function k(z,I){if(!z)return[];const F=z.split(/\s+/),Y=[];let W="";for(const te of F)W?(W+" "+te).length<=I?W+=" "+te:(Y.push(W),W=te):W=te;return W&&Y.push(W),Y}function U(z,I,F={}){const{includeTitlePage:Y=!0,includePageNumbers:W=!0,sceneNumbers:te=!0,preservePageBreaks:he=!0,emptyPageFirst:me=!1,emptyPageLast:Ce=!1,pageSheets:Be=[]}=F,Le=[],w=595.28/2,j=108,V=525,X=14.4,N=14.4,Ie=(le,Ve=12)=>(le?le.length:0)*(Ve*.6),et=(le,Ve=12)=>Math.round(w-Ie(le,Ve)/2),ht=(le,Ve=12,He=V)=>Math.round(He-Ie(le,Ve));let tt=!1;if(Y&&z.titlePage&&(I.has(1)||F.rangeType==="all")){const le=z.titlePage,Ve=(le.title||z.title||"UNTITLED SCREENPLAY").toUpperCase(),He=k(Ve,35),Ze=[];let Se=520;He.forEach(Ke=>{Ze.push({text:Ke,x:et(Ke,12),y:Se,font:"F2",size:12}),Se-=X}),Se-=24;const Rt=le.by!==void 0?le.by:"Written by";Rt&&(Ze.push({text:Rt,x:et(Rt,12),y:Se,font:"F1",size:12}),Se-=X+4);const Ge=le.author||"Author";Ze.push({text:Ge,x:et(Ge,12),y:Se,font:"F2",size:12});let We=(le.phone||"").trim();if(!We&&le.contact){const St=le.contact.split("·").map(Et=>Et.trim()).find(Et=>Et.includes("+")||/\d{3}/.test(Et));St&&(We=St)}We&&!We.toLowerCase().startsWith("phone")&&(We=`Phone: ${We}`);let fe=(le.email||"").trim();if(!fe&&le.contact&&le.contact.includes("@")){const Ke=le.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);Ke&&(fe=Ke[0])}fe&&!fe.toLowerCase().startsWith("e-mail")&&!fe.toLowerCase().startsWith("email")&&(fe=`E-mail: ${fe}`);const st=[];if(We&&st.push(We),fe&&st.push(fe),le.address){const Ke=k(le.address.trim(),40);st.push(...Ke)}else if(!We&&!fe&&le.contact){const Ke=le.contact.split("·").map(St=>St.trim()).filter(Boolean);st.push(...Ke)}let Mt=130;st.forEach(Ke=>{Ze.push({text:Ke,x:j,y:Mt,font:"F1",size:12}),Mt-=X}),Le.push(Ze),tt=!0}if(Be.forEach(le=>{if(le.classList&&le.classList.contains("screenplay-title-page-sheet"))return;const Ve=parseInt(le.getAttribute("data-page-num"),10)||1;if(!I.has(Ve))return;const He=[];let Ze=!1;if(W){const Ge=`${Ve}.`;He.push({text:Ge,x:ht(Ge,12,V),y:805,font:"F1",size:12})}let Se=765;le.querySelectorAll(".screenplay-block").forEach(Ge=>{if(Se<65)return;const We=Ge.getAttribute("data-block-type");if(We==="pagebreak"){if(he){Se-=X;const fe="----------------------------------------";He.push({text:fe,x:et(fe,12),y:Se,font:"F1",size:12}),Se-=X}return}if(We==="scene"){const fe=Ge.querySelector('[contenteditable="true"]'),st=(fe?fe.innerText.trim():Ge.innerText.trim()).toUpperCase();st&&(Ze=!0);const Mt=te&&Ge.querySelector(".scene-num-indicator")?.innerText?.trim()||"";Se-=N,k(st,57).forEach((St,Et)=>{Et===0&&Mt&&He.push({text:Mt,x:76,y:Se,font:"F2",size:12}),He.push({text:St,x:j,y:Se,font:"F2",size:12}),Se-=X})}else if(We==="character"){const fe=Ge.innerText.trim().toUpperCase();fe&&(Ze=!0),Se-=N,He.push({text:fe,x:266,y:Se,font:"F2",size:12}),Se-=X}else if(We==="parenthetical"){let fe=Ge.innerText.trim();fe&&(Ze=!0),fe.startsWith("(")||(fe="("+fe),fe.endsWith(")")||(fe=fe+")"),k(fe,26).forEach(st=>{He.push({text:st,x:223,y:Se,font:"F1",size:12}),Se-=X})}else if(We==="dialogue"){const fe=Ge.innerText.trim();fe&&(Ze=!0),k(fe,35).forEach(st=>{He.push({text:st,x:180,y:Se,font:"F1",size:12}),Se-=X})}else if(We==="transition"){const fe=Ge.innerText.trim().toUpperCase();fe&&(Ze=!0),Se-=N,He.push({text:fe,x:ht(fe,12,V),y:Se,font:"F2",size:12}),Se-=X}else if(We==="shot"){const fe=Ge.innerText.trim().toUpperCase();fe&&(Ze=!0),Se-=N,He.push({text:fe,x:j,y:Se,font:"F2",size:12}),Se-=X}else if(We==="image"){const fe=Ge.querySelector('[contenteditable="true"]')?.innerText?.trim()||"Storyboard Image";Ze=!0,Se-=N,He.push({text:`[STORYBOARD: ${fe}]`,x:j,y:Se,font:"F1",size:12}),Se-=X}else{const fe=Ge.innerText.trim();fe&&(Ze=!0,Se-=N,k(fe,58).forEach(st=>{He.push({text:st,x:j,y:Se,font:"F1",size:12}),Se-=X}))}}),Ze&&Le.push(He)}),Le.length===0){const le=[{text:z.title||"Screenplay",x:j,y:750,font:"F2",size:12}];W&&le.push({text:"1.",x:ht("1.",12,V),y:805,font:"F1",size:12}),Le.push(le)}const Ne=le=>!le||le.length===0||le.every(Ve=>Ve.y===805||!Ve.text||Ve.text.trim()==="");for(;Le.length>1&&Ne(Le[Le.length-1]);)Le.pop();me&&Le.unshift([]),Ce&&Le.push([]);const Yt=Le.length,pt=[],wt=[];let Re=4;for(let le=0;le<Yt;le++)Re++,pt.push(Re),Re++,wt.push(Re);const yt=[];yt[1]="<< /Type /Catalog /Pages 2 0 R >>",yt[2]=`<< /Type /Pages /Kids [${pt.map(le=>le+" 0 R").join(" ")}] /Count ${Yt} /MediaBox [0 0 595.28 841.89] >>`,yt[3]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>",yt[4]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>";for(let le=0;le<Yt;le++){const Ve=pt[le],He=wt[le];yt[Ve]=`<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${He} 0 R >>`;const Ze=[],Se=Le[le]||[];for(const fe of Se){const st=fe.font||"F1",Mt=fe.size||12,Ke=fe.x||j,St=fe.y||750,Et=L(fe.text);Ze.push(`BT /${st} ${Mt} Tf ${Ke.toFixed(2)} ${St.toFixed(2)} Td (${Et}) Tj ET`)}const Rt=Ze.join(`
`),We=new TextEncoder().encode(Rt);yt[He]=`<< /Length ${We.length} >>
stream
${Rt}
endstream`}const Nt=new TextEncoder,bs=Nt.encode(`%PDF-1.4
%âãÏÓ
`);let os=bs.length;const Xt=[],_t=[];for(let le=1;le<=Re;le++){Xt[le]=os;const Ve=`${le} 0 obj
${yt[le]}
endobj
`,He=Nt.encode(Ve);_t.push(He),os+=He.length}const Us=os;let Ft=`xref
0 ${Re+1}
0000000000 65535 f 
`;for(let le=1;le<=Re;le++)Ft+=`${String(Xt[le]).padStart(10,"0")} 00000 n 
`;Ft+=`trailer
<< /Size ${Re+1} /Root 1 0 R >>
startxref
${Us}
%%EOF`;const ls=Nt.encode(Ft);return new Blob([bs,..._t,ls],{type:"application/pdf"})}const T=document.getElementById("exportModal"),de=document.getElementById("exportModalBtn"),se=document.getElementById("menu-btn-export"),ge=document.getElementById("closeExportModal"),J=document.getElementById("cancelExportBtn"),ke=document.getElementById("startExportBtn"),be=document.getElementById("exportProgressArea"),ee=document.getElementById("exportProgressBar"),pe=document.getElementById("exportStatusText");function Z(z){if(T)if(z)T.classList.remove("hidden"),T.classList.add("flex"),Gt({id:"exportModal",name:"Export",close:()=>Z(!1)});else{T.classList.add("hidden"),T.classList.remove("flex"),be?.classList.add("hidden");const I=Je.findIndex(F=>F.id==="exportModal");I!==-1&&Je.splice(I,1)}}de&&(de.onclick=()=>Z(!0)),se&&(se.onclick=()=>{Ee("moreMenu"),Z(!0)}),ge&&(ge.onclick=()=>Ee("exportModal")),J&&(J.onclick=()=>Ee("exportModal")),T&&(T.onclick=z=>{z.target===T&&Ee("exportModal")});const ve=document.getElementById("exportPageRangeSelect"),C=document.getElementById("exportCustomRangeInput");ve&&C&&(ve.onchange=()=>{C.classList.toggle("hidden",ve.value!=="custom"),ve.value==="custom"&&C.focus()}),ke&&(ke.onclick=()=>{const z=document.getElementById("exportFormatSelect")?.value||"pdf",I=document.getElementById("exportPageRangeSelect")?.value||"all",F=document.getElementById("exportCustomRangeInput")?.value||"",Y=document.getElementById("optPageNumbers")?.checked!==!1,W=document.getElementById("optPreservePageBreaks")?.checked!==!1,te=document.getElementById("optStandardMargins")?.checked!==!1,he=document.getElementById("optSceneNumbers")?.checked!==!1,me=document.getElementById("optEmptyPageFirst")?.checked===!0,Ce=document.getElementById("optEmptyPageLast")?.checked===!0;let Be=Array.from(document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)"));Be.length===0&&(Be=Array.from(document.querySelectorAll(".screenplay-page-sheet:not(.screenplay-title-page-sheet)"))),Be.length===0&&(ft(),Be=Array.from(document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)")));const Le=Be.length||1;let De=new Set;if(I==="all")for(let w=1;w<=Le;w++)De.add(w);else if(I==="current"){let w=1;if(Ye){const j=document.getElementById(Ye),V=j?j.closest(".screenplay-page-sheet"):null;V&&(w=parseInt(V.getAttribute("data-page-num"),10)||1)}De.add(w)}else if(I==="custom"&&(F.split(",").forEach(j=>{if(j=j.trim(),j.includes("-")){const[V,X]=j.split("-").map(N=>parseInt(N.trim(),10));if(!isNaN(V)&&!isNaN(X))for(let N=Math.max(1,V);N<=Math.min(Le,X);N++)De.add(N)}else{const V=parseInt(j,10);!isNaN(V)&&V>=1&&V<=Le&&De.add(V)}}),De.size===0))for(let j=1;j<=Le;j++)De.add(j);be.classList.remove("hidden"),ee.style.width="35%",pe.textContent=te?'Applying standard A4 margins (1.5" left, 1.0" right) & Courier Prime...':"Formatting Courier Prime typography and page layout...",setTimeout(()=>{ee.style.width="80%",pe.textContent=`Compiling standard ${z.toUpperCase()} for pages [${Array.from(De).join(", ")}]...`},500),setTimeout(()=>{ee.style.width="100%",pe.textContent="Completed! Starting download...";let w="";if(me&&(w+=`\f
`),document.getElementById("optTitlePage")?.checked&&H.titlePage&&(De.has(1)||I==="all")){const Ie=H.titlePage;w+=`${Ie.title||H.title}

`,w+=`${Ie.by||"Written by"}

`,w+=`${Ie.author||"Author"}

`,Ie.phone&&(w+=`${Ie.phone}
`),Ie.email&&(w+=`${Ie.email}
`),Ie.address&&(w+=`${Ie.address}
`),!Ie.phone&&!Ie.email&&!Ie.address&&Ie.contact&&(w+=`${Ie.contact}
`),w+=`

================================================================================
\f
`}Be.forEach((Ie,et)=>{const ht=parseInt(Ie.getAttribute("data-page-num"),10)||et+1;if(!De.has(ht))return;let tt="";Y&&(tt+=`
											${ht}.

`);let Ne=!1;Ie.querySelectorAll(".screenplay-block").forEach(pt=>{const wt=pt.getAttribute("data-block-type");if(wt==="pagebreak"){W&&(tt+=`
[=== PAGE BREAK ===]

`);return}let Re="";if(wt==="scene"){const yt=pt.querySelector('[contenteditable="true"]');Re=yt?yt.innerText.trim():pt.innerText.trim();const Nt=he&&pt.querySelector(".scene-num-indicator")?.innerText?.trim()||"";Re&&(tt+=`

${Nt?Nt+". ":""}${Re}

`,Ne=!0)}else wt==="character"?(Re=pt.innerText.trim(),Re&&(tt+=`
			${Re}
`,Ne=!0)):wt==="parenthetical"?(Re=pt.innerText.trim(),Re&&(tt+=`		${Re.startsWith("(")?Re:"("+Re+")"}
`,Ne=!0)):wt==="dialogue"?(Re=pt.innerText.trim(),Re&&(tt+=`	${Re}
`,Ne=!0)):wt==="transition"?(Re=pt.innerText.trim(),Re&&(tt+=`
						${Re}

`,Ne=!0)):(Re=pt.innerText.trim(),Re&&(tt+=`${Re}

`,Ne=!0))}),Ne&&(w+=tt+`
\f
`)}),Ce?!w.endsWith(`\f
`)&&!w.endsWith("\f")&&(w+=`
\f
`):w=w.replace(/[\s\f]+$/,"");let j;z==="pdf"?j=U(H,De,{includeTitlePage:document.getElementById("optTitlePage")?.checked!==!1,includePageNumbers:Y,sceneNumbers:he,preservePageBreaks:W,emptyPageFirst:me,emptyPageLast:Ce,pageSheets:Be,rangeType:I}):j=new Blob([w],{type:"text/plain"});const V=URL.createObjectURL(j),X=document.createElement("a");X.href=V;const N=I==="all"?"All_Pages":`Pages_${Array.from(De).join("-")}`;X.download=`${H.title.replace(/[^a-zA-Z0-9]/g,"_")}_${H.draft||"Draft"}_${N}.${z}`,document.body.appendChild(X),X.click(),X.remove(),S(`Exported "${X.download}" successfully`),setTimeout(()=>Ee("exportModal"),800)},1e3)});const G=document.getElementById("versionsModal"),$e=document.getElementById("versionsModalBtn"),ne=document.getElementById("menu-btn-versions"),xe=document.getElementById("closeVersionsModal"),A=document.getElementById("versionsListContainer");function ye(z){G&&(G.classList.remove("hidden"),G.classList.add("flex"),Fe(),Gt({id:"versionsModal",name:"Versions",close:()=>{G.classList.add("hidden"),G.classList.remove("flex")},restore:()=>{G.classList.remove("hidden"),G.classList.add("flex"),Fe()}}))}async function Fe(){const z=await yo(e);A&&(A.innerHTML=z.map(I=>`
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
    `).join(""),document.querySelectorAll(".restore-version-btn").forEach(I=>{I.onclick=()=>{const F=I.getAttribute("data-vname");S(`Restored version "${F}"`),document.getElementById("currentVersionTag").textContent=F,Ee("versionsModal")}}))}$e&&($e.onclick=()=>ye()),ne&&(ne.onclick=()=>{Ee("moreMenu"),ye()}),xe&&(xe.onclick=()=>Ee("versionsModal")),G&&(G.onclick=z=>{z.target===G&&Ee("versionsModal")});const Te=document.getElementById("newVersionModal"),ie=document.getElementById("openNewVersionPrompt"),ce=document.getElementById("closeNewVersionModal"),_=document.getElementById("cancelNewVersionBtn"),Ae=document.getElementById("saveNewVersionBtn");function Me(){G.classList.add("hidden"),Te.classList.remove("hidden"),Te.classList.add("flex"),Gt({id:"newVersionModal",name:"New Version",close:()=>{Te.classList.add("hidden"),Te.classList.remove("flex")}})}ie&&(ie.onclick=Me),ce&&(ce.onclick=()=>Ee("newVersionModal")),_&&(_.onclick=()=>Ee("newVersionModal")),Ae&&(Ae.onclick=async()=>{const z=document.getElementById("newVersionNameInput")?.value.trim(),I=document.getElementById("newVersionNotesInput")?.value.trim();z&&(await vo(e,{name:z,notes:I}),S(`Created version snapshot "${z}"`),document.getElementById("currentVersionTag").textContent=z,Ee("newVersionModal"))});const oe=document.getElementById("compareModal"),je=document.getElementById("openCompareBtn"),ue=document.getElementById("menu-btn-compare"),qe=document.getElementById("closeCompareModal"),ze=document.getElementById("closeCompareBtn2");function Pe(){G.classList.add("hidden"),oe.classList.remove("hidden"),oe.classList.add("flex"),Gt({id:"compareModal",name:"Compare Versions",close:()=>{oe.classList.add("hidden"),oe.classList.remove("flex")}})}je&&(je.onclick=Pe),ue&&(ue.onclick=()=>{Ee("moreMenu"),Pe()}),qe&&(qe.onclick=()=>Ee("compareModal")),ze&&(ze.onclick=()=>Ee("compareModal")),oe&&(oe.onclick=z=>{z.target===oe&&Ee("compareModal")})}function rn(){if(!H)return;let e=0;H.scenes.forEach(a=>{a.blocks.forEach(i=>{i.content&&(e+=i.content.trim().split(/\s+/).filter(Boolean).length)})});const s=document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)").length||1,n=document.getElementById("telemetry-page-count"),o=document.getElementById("telemetry-word-count");n&&(n.textContent=`Page 1 of ${s}`),o&&(o.textContent=`${e.toLocaleString()} words`)}function jl(){const e=$.state.scripts||[],t=$.state.selectedScriptId||"chronicles-of-dust",s=e.find(n=>n.id===t)||e[0]||{title:"Chronicles of Dust"};return`
    ${dt("Intelligence","Script Selector")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-44 bg-surface">
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
            ${e.map(n=>{const o=n.id===t;return`
                <div data-script-id="${n.id}" data-script-title="${n.title}" class="script-select-card relative p-3.5 rounded-xl border ${o?"border-blue-600 bg-blue-50/70":"border-slate-200/80 bg-white hover:bg-slate-50"} transition-all cursor-pointer flex items-center justify-between group shadow-xs">
                  <div class="flex items-center gap-3 min-w-0 relative z-10">
                    <div class="shrink-0 w-9 h-9 rounded-lg ${o?"bg-white border-blue-200 text-blue-600":"bg-slate-50 border-slate-200 text-slate-600"} border flex items-center justify-center shadow-xs">
                      <span class="material-symbols-outlined text-[20px]">movie</span>
                    </div>
                    <div class="flex flex-col min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-semibold text-slate-900 truncate uppercase">${n.title}</span>
                        <span class="text-[10px] font-medium px-1.5 py-0.5 rounded ${o?"bg-blue-100 text-blue-700":"bg-slate-100 text-slate-600"} shrink-0">${n.draft||"Draft 1.0"}</span>
                      </div>
                      <span class="text-[11px] text-slate-500 truncate mt-0.5">${n.format||"Screenplay"} · ${n.pages} pages · Updated ${n.updated||"recently"}</span>
                    </div>
                  </div>
                  <div class="script-select-indicator w-6 h-6 rounded-full ${o?"bg-blue-600 text-white shadow-xs":"bg-slate-100 text-slate-400"} flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[16px] font-bold">${o?"check":"arrow_forward"}</span>
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
      <div class="fixed left-0 right-0 z-30 bg-surface/90 backdrop-blur-md px-4 pt-2.5 pb-2 border-t border-slate-100 flex flex-col items-center gap-1 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] max-w-2xl mx-auto" style="bottom: calc(3.5rem + 16px + env(safe-area-inset-bottom, 0px));">
        <button type="button" id="submit-continue-analysis-btn" class="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all text-white font-medium text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer">
          <span class="truncate font-semibold" id="selector-btn-label">Continue to Context (${s.title})</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
        <span class="text-[10px] text-slate-400 tracking-tight">Establishes selectedScriptId for Script Analysis</span>
        <!-- One empty line below for visual spacing and professional breathing room -->
        <div class="h-4 w-full select-none pointer-events-none" aria-hidden="true"></div>
      </div>

    </main>

    ${it("intelligence")}
  `}function _l(e){let t=$.state.selectedScriptId||"chronicles-of-dust";document.querySelectorAll(".script-select-card").forEach(o=>{o.onclick=()=>{const a=o.getAttribute("data-script-id"),i=o.getAttribute("data-script-title");t=a,$.selectScript(a),document.querySelectorAll(".script-select-card").forEach(f=>{f.className="script-select-card relative p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const u=f.querySelector(".script-select-indicator");u&&(u.className="script-select-indicator w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0",u.innerHTML='<span class="material-symbols-outlined text-[16px]">arrow_forward</span>')}),o.className="script-select-card relative p-3.5 rounded-xl border border-blue-600 bg-blue-50/70 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const l=o.querySelector(".script-select-indicator");l&&(l.className="script-select-indicator w-6 h-6 rounded-full bg-blue-600 text-white shadow-xs flex items-center justify-center shrink-0",l.innerHTML='<span class="material-symbols-outlined text-[16px] font-bold">check</span>');const r=document.getElementById("selector-btn-label");r&&(r.textContent=`Continue to Context (${i})`)}});const s=document.getElementById("submit-continue-analysis-btn");s&&(s.onclick=()=>{$.selectScript(t),e("/intelligence/context")});const n=document.getElementById("btn-import-script-modal");n&&(n.onclick=()=>{S("Select screenplay file (.fountain, .fdx, .pdf) to parse","info")})}function Fl(){const e=$.state.selectedScriptId||"chronicles-of-dust",t=$.state.scripts.find(n=>n.id===e)||$.state.activeScript||{title:"Chronicles of Dust",format:"Feature",industry:"International / Hollywood"},s=t.context||{format:t.format||"Feature",industry:t.industry||"International / Hollywood",hours:1,minutes:36,seconds:0};return`
    ${dt("Intelligence","Context Calibration")}

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

    ${it("intelligence")}
  `}function Hl(e){const t=$.state.selectedScriptId||"chronicles-of-dust",s=$.state.scripts.find(d=>d.id===t)||$.state.activeScript||{},n=s.context||{};let o=n.format||s.format||"Feature",a=n.hours!==void 0?n.hours:1,i=n.minutes!==void 0?n.minutes:36,l=n.seconds!==void 0?n.seconds:0;document.querySelectorAll(".format-card").forEach(d=>{d.onclick=()=>{o=d.getAttribute("data-format"),document.querySelectorAll(".format-card").forEach(c=>{c.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 transition-all cursor-pointer hover:bg-slate-50"}),d.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 border-2 border-blue-600 transition-all cursor-pointer",o==="Short"?(a=0,i=25,l=0):o==="Pilot"?(a=0,i=50,l=30):(a=1,i=45,l=0),r()}});function r(){const d=v=>String(v).padStart(2,"0"),c=document.getElementById("val-hr"),m=document.getElementById("val-min"),b=document.getElementById("val-sec");c&&(c.value=d(a)),m&&(m.value=d(i)),b&&(b.value=d(l));const h=a*60+i+Math.round(l/60),g=document.getElementById("pacing-projection");g&&(g.textContent=`~${h} standard script pages`)}document.querySelectorAll(".stepper-btn").forEach(d=>{d.onclick=()=>{const c=d.getAttribute("data-unit"),m=parseInt(d.getAttribute("data-delta"),10)||0;c==="hr"&&(a=Math.max(0,Math.min(9,a+m))),c==="min"&&(i=Math.max(0,Math.min(59,i+m))),c==="sec"&&(l=Math.max(0,Math.min(59,l+m))),r()}}),[{id:"val-hr",max:9,get:()=>a,set:d=>{a=d}},{id:"val-min",max:59,get:()=>i,set:d=>{i=d}},{id:"val-sec",max:59,get:()=>l,set:d=>{l=d}}].forEach(({id:d,max:c,set:m,get:b})=>{const h=document.getElementById(d);h&&(h.onfocus=()=>{h.select()},h.oninput=()=>{let g=h.value.replace(/\D/g,"");if(g==="")m(0);else{let B=parseInt(g,10);isNaN(B)&&(B=0),B>c?(B=c,h.value=String(B)):h.value=g.slice(0,2),m(B)}const v=a*60+i+Math.round(l/60),P=document.getElementById("pacing-projection");P&&(P.textContent=`~${v} standard script pages`)},h.onblur=()=>{let g=h.value.replace(/\D/g,""),v=parseInt(g,10);isNaN(v)&&(v=0),v=Math.max(0,Math.min(c,v)),m(v),h.value=String(v).padStart(2,"0"),r()},h.onkeydown=g=>{if(g.key==="Enter")h.blur();else if(g.key==="ArrowUp"){g.preventDefault();const v=b(),P=Math.min(c,v+1);m(P),h.value=String(P).padStart(2,"0"),r()}else if(g.key==="ArrowDown"){g.preventDefault();const v=b(),P=Math.max(0,v-1);m(P),h.value=String(P).padStart(2,"0"),r()}})});const u=document.getElementById("btn-submit-context");u&&(u.onclick=async()=>{const d=document.getElementById("industry-select")?.value||"International / Hollywood";u.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Calibrating SCRIPTORA...</span>',u.disabled=!0;const c=b=>String(b).padStart(2,"0"),m={format:o,industry:d,hours:a,minutes:i,seconds:l,plannedDuration:`${c(a)}:${c(i)}:${c(l)}`};await No(t,m),S("Narrative parameters calibrated"),e("/intelligence/dashboard")})}function Ul(){const e=$.state.selectedScriptId||"chronicles-of-dust",t=$.state.scripts.find(n=>n.id===e)||$.state.activeScript||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pages:96,format:"Feature"},s=t.analysisScores||{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80};return`
    ${dt("Intelligence","Script Analysis")}

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

    ${it("intelligence")}
  `}function ql(e){const t=$.state.selectedScriptId||"chronicles-of-dust",s=$.state.scripts.find(B=>B.id===t)||$.state.scripts[0],n=document.getElementById("btn-gen-logline"),o=document.getElementById("btn-gen-synopsis"),a=document.getElementById("ai-generated-container"),i=document.getElementById("ai-generated-title"),l=document.getElementById("ai-generated-body"),r=document.getElementById("ai-close-btn"),f=document.getElementById("ai-copy-btn"),u=document.getElementById("ai-copy-text"),d=document.getElementById("ai-query-input"),c=document.getElementById("ai-query-submit");function m(B){a&&(a.classList.remove("hidden"),i.textContent=B==="logline"?"Generated Logline":"Generated Synopsis",l.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Generating with narrative telemetry...</span>',setTimeout(()=>{l.textContent=B==="logline"?s?.logline||"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.":s?.synopsis||"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves."},400))}if(n&&(n.onclick=()=>m("logline")),o&&(o.onclick=()=>m("synopsis")),r&&(r.onclick=()=>a.classList.add("hidden")),f&&(f.onclick=()=>{navigator.clipboard?.writeText(l.textContent||""),u.textContent="Copied!",setTimeout(()=>{u.textContent="Copy"},1800),S("Copied to clipboard")}),c&&d){const B=async()=>{const L=d.value.trim();if(!L)return;a.classList.remove("hidden"),i.textContent="Intelligence AI Answer",l.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing draft semantics...</span>';const k=await Dn(L,t);l.textContent=k,d.value=""};c.onclick=B,d.onkeydown=L=>{L.key==="Enter"&&B()}}const b=document.getElementById("script-switcher-modal"),h=document.getElementById("script-selector-trigger"),g=document.getElementById("close-script-switcher-modal"),v=()=>{lt(b)},P=()=>{we(b)};h&&(h.onclick=v),g&&(g.onclick=P),b&&(b.onclick=B=>{B.target===b&&P()}),document.querySelectorAll(".script-switch-opt").forEach(B=>{B.onclick=()=>{const L=B.getAttribute("data-id");$.selectScript(L),P(),e("/intelligence")}})}function zl(){const e=$.state.selectedScriptId||"chronicles-of-dust",t=$.state.scripts.find(n=>n.id===e)||$.state.activeScript||{title:"Chronicles of Dust",pages:96},s=[{type:"pacing",title:"Pacing",desc:"See where the story moves too fast or too slowly.",icon:"speed",score:82,telemetry:`${t.pages||96} Pages Telemetry`},{type:"dialogue",title:"Dialogue",desc:"Cadence, subtext density and character voice rhythm.",icon:"chat",score:89,telemetry:"42 Dialogue Exchanges"},{type:"emotion",title:"Emotion",desc:"Emotional heatmaps, catharsis curves and sentiment.",icon:"favorite",score:91,telemetry:"Peak Catharsis: Act II"},{type:"character-arc",title:"Character Arc",desc:"Want vs. need trajectories and transformation tracking.",icon:"alt_route",score:84,telemetry:"4 Major Protagonists"},{type:"continuity",title:"Continuity",desc:"Props, character locations, and temporal logic rules.",icon:"linear_scale",score:78,telemetry:"2 Minor Prop Conflicts"},{type:"story-structure",title:"Story Structure",desc:"Beat breakdowns, midpoint shifts and turning points.",icon:"account_tree",score:87,telemetry:"3-Act Paradigm Standard"},{type:"theme",title:"Theme",desc:"Core philosophical spines, motifs and moral arguments.",icon:"lightbulb",score:90,telemetry:"3 Tracked Motifs"},{type:"cinema",title:"Cinema",desc:"Visual storytelling, shot economy and set-piece power.",icon:"videocam",score:85,telemetry:"Cinematic Visual Index"},{type:"scene",title:"Scene Analysis",desc:"Deep dive breakdown of goals, conflict and polarity.",icon:"movie",score:86,telemetry:"Scene 18 Active Scope"},{type:"formatting",title:"Formatting",desc:"Standard industry margins, sluglines and font rules.",icon:"rule",score:94,telemetry:"Standard Guild Rules"},{type:"production",title:"Production",desc:"Locations, shooting cast, props and cost estimators.",icon:"movie_creation",score:80,telemetry:"24 Practical Locations"}];return`
    ${dt("Intelligence","Analyse Individually")}

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

    ${it("intelligence")}
  `}function Vl(e){const t=document.getElementById("analysis-filter-input");t&&(t.oninput=s=>{const n=s.target.value.toLowerCase().trim();document.querySelectorAll("#analysis-tiles-grid .analysis-tile").forEach(o=>{const a=o.getAttribute("data-keyword")||"";o.style.display=a.includes(n)?"flex":"none"})})}const pa={pacing:{title:"Pacing Analysis",score:82,icon:"speed",desc:"Scene duration variance, narrative tempo and page-turn velocity.",questions:["Where does the pace drag in Act II?","Find scenes over 4 pages","Show action-to-dialogue ratios"],findings:[{scene:"SCENE 14 · Dockside Perimeter · Pg 36",act:"Act II",title:"Action beats slow down before major confrontation",desc:"Extended exposition between dock guards lowers tension prior to container breach.",targetScene:14},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Peak narrative rhythm",desc:"Fast intercut dialogue creates maximum urgency before floodgate breach.",targetScene:18},{scene:"SCENE 26 · Coastal Highway · Pg 68",act:"Act III",title:"High velocity turning point",desc:"Pursuit cadence maintains optimal beats per page.",targetScene:26}]},dialogue:{title:"Dialogue Analysis",score:89,icon:"chat",desc:"Cadence, subtext density, distinctive character voice profiles.",questions:["Are character voices distinctive?","Find on-the-nose exposition lines","Analyze dialogue subtext in Scene 18"],findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Subtext is understated and powerful",desc:"Kevin avoids speaking about his brother directly, communicating through silence and tea rituals.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Meera O.S. dialogue establishes authority",desc:"Radio chatter avoids fluff and communicates technical stakes concisely.",targetScene:18}]},emotion:{title:"Emotion Analysis",score:91,icon:"favorite",desc:"Catharsis trajectory, emotional resonance curves, character empathy indices.",questions:["Where does emotional vulnerability peak?","Track empathy trajectory for Kevin","Catharsis resolution in Act III"],findings:[{scene:"SCENE 12 · Father’s Workshop · Pg 28",act:"Act I",title:"Emotional anchor established",desc:"Familial debt and generational sacrifice ground Kevin’s reluctance to blow the whistle.",targetScene:12},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Desperation under rising water",desc:"Kevin’s fear of failing Meera is palpable as water rises past junction box.",targetScene:18}]},"character-arc":{title:"Character Arc Analysis",score:84,icon:"alt_route",desc:"Want vs. Need conflict, psychological transformation, fatal flaw resolution.",questions:["Does Kevin overcome his passivity?","Meera character transformation","Antagonist motivation clarity"],findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]},continuity:{title:"Continuity Analysis",score:78,icon:"linear_scale",desc:"Prop tracking, character spatial locations, timeline consistency checks.",questions:["Check prop handover in Scene 18","Is time of day consistent across Act II?","Track the brass seal location"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Hydro-sensor probe referenced before retrieval",desc:"Verify Kevin picked up copper probe in Scene 16 or carries it on belt.",targetScene:18},{scene:"SCENE 22 · Pumping Station · Pg 58",act:"Act II",title:"Flashlight state discrepancy",desc:"Ensure flashlight was retrieved after water surge in Scene 19.",targetScene:22}]},"story-structure":{title:"Story Structure Analysis",score:87,icon:"account_tree",desc:"Inciting incident, plot points, midpoint shift, climax architecture.",questions:["Is midpoint clearly defined?","Evaluate climax timing on page 88","Are 3-act beats aligned?"],findings:[{scene:"SCENE 06 · Customs Registry · Pg 14",act:"Inciting Incident",title:"Off-manifest container discovered",desc:"The inciting anomaly sets Kevin on irreversible investigative path.",targetScene:6},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Midpoint (Pg 48/96)",title:"Stakes escalate from civil to criminal",desc:"Kevin realizes his own brother commands the smuggling cartel.",targetScene:18}]},theme:{title:"Theme Analysis",score:90,icon:"lightbulb",desc:"Primary narrative spine: Complicity vs. Duty and moral accountability.",questions:["What is the central theme?","Where is loyalty tested?","Show recurring thematic motifs"],findings:[{scene:"SCENE 09 · Family Kitchen · Pg 22",act:"Act I",title:"Familial pressure as thematic catalyst",desc:"Kevin hides eviction notice, showing economic desperation fueling institutional silence.",targetScene:9},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Moral test faced directly",desc:"Kevin must decide whether to save his brother or save the port city from flooding.",targetScene:18},{scene:"SCENE 36 · Rooftop Overlook · Pg 94",act:"Act III",title:"Theme delivers its final statement",desc:"Accountability over self-preservation.",targetScene:36}]},cinema:{title:"Cinema & Visual Storytelling",score:85,icon:"videocam",desc:"Visual set-piece density, image systems, lighting and camera intentionality.",questions:["Check visual contrast between acts","Highlight cinematic set-pieces","Analyze color palette cues in action lines"],findings:[{scene:"SCENE 01 · Harbor Drone View · Pg 01",act:"Act I",title:"Strong establishing visual metaphor",desc:"Rusted shipping containers stacked like monoliths beneath smog.",targetScene:1},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"High visual tension",desc:"Red emergency beacons reflected in rising brackish water.",targetScene:18}]},scene:{title:"Scene Analysis",score:86,icon:"movie",desc:"Micro-structure of Scene 18: Objective, obstacle, polarity change.",questions:["What is the scene objective?","Where does tension peak?","How does polarity shift?"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]},formatting:{title:"Formatting & Guild Compliance",score:94,icon:"rule",desc:"Industry standard margin measurements, capitalization, slugline syntax.",questions:["Check standard industry margins","Find non-standard scene sluglines","Verify dialogue capitalization rules"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Perfect Courier Prime 12pt slugline",desc:"Margins, dual dialogue spacing, and transition tags meet Writers Guild standards.",targetScene:18}]},production:{title:"Production Breakdown",score:80,icon:"movie_creation",desc:"Locations, shooting days, practical elements, cast size breakdown.",questions:["How many practical locations?","Show scenes with special props","List one-off speaking roles"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Location: Wet Stage / Customs Interior",desc:"Requires controlled water flooding tank, hydro-sensor prop box, wet comm-link gear.",targetScene:18}]}};function Fa(e){if($.state.screenplay&&$.state.screenplay.id===e)return $.state.screenplay;const t=localStorage.getItem(`scriptora_screenplay_${e}`);if(t)try{const s=JSON.parse(t);if(s&&s.scenes&&s.scenes.length>0)return s}catch{}return e==="chronicles-of-dust"?Ln:null}function Ha(e,t){const s=[];return e&&Array.isArray(e.scenes)&&e.scenes.length>0?e.scenes.forEach((n,o)=>{const a=n.number||o+1,i=n.slugline&&n.slugline.trim()||n.blocks?.find(l=>l.type==="scene")?.content?.trim()||`SCENE ${a}`;s.push({id:n.id||`scene-${a}`,number:a,slugline:i,act:n.actId==="act-3"?"Act III":n.actId==="act-2"?"Act II":a>24?"Act III":a>11?"Act II":"Act I"})}):Ln.scenes.forEach(o=>{s.push({id:o.id,number:o.number,slugline:o.slugline||`SCENE ${o.number}`,act:o.actId==="act-2"?"Act II":"Act I"})}),s}function Gl(e){const t=[];e&&((e.characters||[]).forEach(n=>{const o=typeof n=="string"?n:n.name||"";o&&t.push(o)}),(e.scenes||[]).forEach(n=>{(n.blocks||[]).forEach(o=>{o.type==="character"&&o.content&&t.push(o.content)})}));let s=$a(t);if(s.length===0&&(e&&(e.id==="chronicles-of-dust"||e.title?.includes("Dust"))?s=["SANTHOSH","ARAVIND","KEVIN","MEERA"]:s=["SANTHOSH","ARAVIND"]),e&&(e.characters=s,e.id))try{localStorage.setItem(`scriptora_screenplay_${e.id}`,JSON.stringify(e))}catch{}return s.map(n=>{const o=n.toUpperCase();let a="Character";return o==="SANTHOSH"||o==="ARAVIND"||o==="KEVIN"?a="Protagonist":o==="MEERA"&&(a="Confidante"),{name:n,role:a}})}function Ua(e,t=[]){const s=t.find(l=>Number(l.number)===Number(e))||{number:e,slugline:`SCENE ${e}`,act:e>24?"Act III":e>11?"Act II":"Act I"},n=s.slugline.replace(/^SCENE\s*\d+\s*·\s*/i,"").trim(),o=s.act||(e>24?"Act III":e>11?"Act II":"Act I"),a=Math.max(1,(s.number-1)*3+1),i=Math.min(4.5,Math.max(1.5,s.number*7%3+2)).toFixed(1);return Number(e)===18?{number:18,heading:"SCENE 18 · INT. CUSTOMS OFFICE - NIGHT",act:"Act II Midpoint",page:48,estMin:"3.5",meta:"Act II Midpoint · Pg 48 · ~3.5 min est.",purpose:"Kevin attempts to reroute the electrical relay before the surge floods the basement archives.",conflict:"Rising water breaches the junction box while automated emergency flood doors trigger lockouts, trapping him inside.",whatChanges:"Kevin cuts the emergency seal and refuses to sign the false manifest, irreversibly shifting from passive worker to active resistance.",synthesis:"Polarity shifts from cautious optimism (+1) to catastrophic physical trap and moral awakening (-2), marking the central pivot of the screenplay.",findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]}:Number(e)===1?{number:1,heading:`SCENE 01 · ${n||"INT. HOME - EVENING"}`,act:"Act I Opening",page:1,estMin:"2.0",meta:"Act I Opening · Pg 01 · ~2.0 min est.",purpose:"Establish opening character presence, environment, and initial psychological stakes.",conflict:"Tension and unspoken questions between characters as unfamiliar presence breaks routine.",whatChanges:"Ordinary state broken by unfamiliar arrival, creating the narrative catalyst for the journey.",synthesis:"Polarity shifts from neutral calm (0) to heightened curiosity and alertness (-1), establishing the dramatic question.",findings:[{scene:`SCENE 01 · ${n||"Opening"} · Pg 01`,act:"Act I Opening",title:"Establish protagonist baseline and primary premise",desc:"Opening visual dynamic introduces character motives before inciting conflict.",targetScene:1}]}:Number(e)===4?{number:4,heading:`SCENE 04 · ${n||"INT. PORT AUDIT ROOM - DAY"}`,act:"Act I",page:9,estMin:"2.5",meta:"Act I · Pg 09 · ~2.5 min est.",purpose:"Kevin audits cargo registry under pressure from superiors to overlook anomalies.",conflict:"Institutional compliance vs early ethical hesitation as signatures are demanded.",whatChanges:"Kevin stamps the manifest with reluctance, confirming his fatal flaw of institutional compliance.",synthesis:"Polarity shifts from hesitation (0) to moral compromise (-1), establishing the internal flaw to overcome.",findings:[{scene:"SCENE 04 · Port Audit · Pg 09",act:"Act I",title:"Fatal Flaw Demonstrated: Silent Compliance",desc:"Compliant stamp creates complicity guilt that fuels later revolt.",targetScene:4}]}:{number:e,heading:`SCENE ${String(e).padStart(2,"0")} · ${n||`INT. LOCATION ${e} - DAY`}`,act:o,page:a,estMin:i,meta:`${o} · Pg ${a} · ~${i} min est.`,purpose:`Execute narrative beat for ${n||`Scene ${e}`} and advance sequence trajectory.`,conflict:"Characters encounter rising resistance while navigating immediate beat obstacles.",whatChanges:"Beats shift character leverage, altering interpersonal dynamic and scene outcome.",synthesis:"Polarity turns decisively across the beat, transitioning the dramatic tension into the next sequence.",findings:[{scene:`SCENE ${String(e).padStart(2,"0")} · Pg ${a}`,act:o,title:`Scene ${e} Beat Dynamics`,desc:`Dramatic polarity progression in ${n||`Scene ${e}`} sustains narrative tempo.`,targetScene:e}]}}function qa(e,t){const s=Dt(e||"SANTHOSH"),n=s.toUpperCase();let o=0;if(t&&Array.isArray(t.scenes)&&t.scenes.forEach(l=>{l.blocks&&l.blocks.some(r=>r.type==="character"&&Dt(r.content)===n)&&o++}),n==="SANTHOSH")return{name:"SANTHOSH",role:"Protagonist",scenesCount:o>0?`${o} scenes tracked`:"36 scenes tracked",step1Title:"Silent Conviction & Initial Resistance",step1Tag:"Fatal Flaw",step1Range:"Beginning Beats",step1Desc:"Santhosh begins navigating intense internal conviction, wrestling with external constraints and uncovering initial stakes.",step2Title:"The Turning Point & Strategic Pivot",step2Tag:"Turning Point",step2Range:"Middle Beats (Midpoint)",step2Desc:"Santhosh breaks away from passive compromises, taking active control of the narrative direction under peak conflict.",step3Title:"Decisive Transformation & Resolution",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Santhosh embraces complete accountability and purpose, achieving an irreversible transformation through the climax.",synthesis:"Santhosh drives the core thematic arc of the story, transforming from cautious survival into an active, principled catalyst of change.",findings:[{scene:"SCENE 01 · Narrative Baseline · Pg 01",act:"Act I",title:"Fatal Flaw: Internal Hesitation",desc:"Santhosh operates with guarded vigilance before escalating pressures force decisive action.",targetScene:1},{scene:"SCENE 02 · The Turning Point · Pg 05",act:"Act II",title:"The Point of No Return",desc:"Santhosh takes a defining stance that permanently pivots interpersonal relationships and story stakes.",targetScene:2}]};if(n==="ARAVIND")return{name:"ARAVIND",role:"Protagonist",scenesCount:o>0?`${o} scenes tracked`:"32 scenes tracked",step1Title:"Guarded Precision & Calculated Loyalty",step1Tag:"Origin Stance",step1Range:"Beginning Beats",step1Desc:"Aravind maintains tactical focus and sharp perception, questioning surrounding motives and testing early alliances.",step2Title:"High-Stakes Partnership & Crucial Stand",step2Tag:"Midpoint Shift",step2Range:"Middle Beats (Midpoint)",step2Desc:"Aravind unites forces during the turning point, applying razor-sharp resolve to counter mounting narrative obstacles.",step3Title:"Decisive Breakthrough & Ultimate Climax",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Aravind executes the final breakthrough, sealing the resolution through steadfast commitment to the mission.",synthesis:"Aravind provides essential tactical momentum and intellectual force, elevating the stakes and cementing the dramatic payoff.",findings:[{scene:"SCENE 01 · Tactical Introduction · Pg 01",act:"Act I",title:"Strategic Presence & Foresight",desc:"Aravind introduces critical context and tactical perspective into the unfolding scenario.",targetScene:1},{scene:"SCENE 02 · Midpoint Crucible · Pg 06",act:"Act II",title:"Decisive Strategic Realignment",desc:"Aravind commits to the high-stakes confrontation that defines the story trajectory.",targetScene:2}]};if(n==="KEVIN")return{name:"Kevin",role:"Protagonist",scenesCount:o>0?`${o} scenes tracked`:"48 scenes tracked",step1Title:"Silent Compliance & Institutional Fear",step1Tag:"Fatal Flaw",step1Range:"Beginning · Scene 01–11",step1Desc:"Hesitant and guarded, Kevin stamps irregular manifests to keep peace with superiors and protect familial debt.",step2Title:"The Point of No Return",step2Tag:"Turning Point",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Cuts the emergency floodgate seal, actively defying union directives to prevent port catastrophe.",step3Title:"Selfless Moral Accountability",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Hands over the ledger to the public audit without demanding personal immunity, completing moral transformation.",synthesis:"The protagonist completes a verified 3-stage transformation: overcoming passivity at the midpoint and prioritizing moral duty over self-preservation in the climax.",findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]};if(n==="MEERA")return{name:"Meera",role:"Confidante",scenesCount:o>0?`${o} scenes tracked`:"22 scenes tracked",step1Title:"Vigilant Skepticism & Tactical Isolation",step1Tag:"Origin Stance",step1Range:"Beginning · Scene 01–12",step1Desc:"Operates independently along pipeline perimeters, skeptical of municipal regulators and trusting only raw field telemetry.",step2Title:"Calculated Alliance Under Pressure",step2Tag:"Partnership Beat",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Guides Kevin via comm-link to the breaker box, choosing to rely on his technical precision despite active security alarms.",step3Title:"Vindicated Shared Resistance",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Secures and broadcasts the telemetry leak to the public frequency, cementing alliance and exposing corporate monopoly.",synthesis:"The confidante evolves from protective cynicism to trusted partnership, providing the strategic resolve that enables the protagonist to act.",findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Tactical Caution & Guarded Insight",desc:"Meera warns Kevin of private security patrols monitoring pipeline telemetry.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Emergency Comm Guidance",desc:"Meera coordinates the junction box bypass before automated floodgates lock.",targetScene:18}]};const a=n==="KEVIN"||n==="SANTHOSH"||n==="ARAVIND"?"Protagonist":"Character",i=o>0?`${o} scenes tracked`:"Screenplay Character";return{name:s,role:a,scenesCount:i,step1Title:"Initial Presence & Motive Baseline",step1Tag:"Introduction",step1Range:"Beginning Beats",step1Desc:`${s} is introduced navigating personal priorities and reacting to the changing environment.`,step2Title:"Escalating Involvement in Narrative Stakes",step2Tag:"Midpoint Pressure",step2Range:"Middle Beats",step2Desc:`${s} faces direct conflict or shifting loyalties as pressure mounts across the sequence.`,step3Title:"Climactic Position & Resolution",step3Tag:"Resolution",step3Range:"Ending Beats",step3Desc:`${s} resolves their dramatic throughline, solidifying their standing in the story outcome.`,synthesis:`${s} contributes essential narrative pressure and perspective across their screenplay appearances.`,findings:[{scene:"SCENE 01 · Screenplay Beat · Pg 01",act:"Act I",title:`${s} Character Introduction`,desc:`Dialogue and action beats introduce ${s}'s voice and perspective.`,targetScene:1}]}}function Wl(e,t,s={}){const n=t.pages||96,{availableScenes:o=[],currentSceneData:a={},availableChars:i=[],currentCharData:l={}}=s;switch(e){case"pacing":return`
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
                  ${i.map(r=>`
                    <option value="${r.name}" ${r.name.toUpperCase()===(l.name||"").toUpperCase()?"selected":""}>${r.name}</option>
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
                    ${o.map(r=>`
                      <option value="${r.number}" ${String(r.number)===String(a.number)?"selected":""}>Scene ${r.number}</option>
                    `).join("")}
                  </select>
                  <span class="material-symbols-outlined text-[14px] text-slate-500 absolute right-1.5 pointer-events-none">expand_more</span>
                </div>
              </div>
              <span id="target-scene-meta" class="text-[11px] font-medium text-slate-500 truncate">${a.meta||"Act II Midpoint · Pg 48 · ~3.5 min est."}</span>
            </div>
            <h2 id="target-scene-heading" class="font-heading font-bold text-base text-slate-900 tracking-tight">
              ${a.heading||"SCENE 18 · INT. CUSTOMS OFFICE - NIGHT"}
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
                  ${a.purpose||"Kevin attempts to reroute the electrical relay before the surge floods the basement archives."}
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
                  ${a.conflict||"Rising water breaches the junction box while automated emergency flood doors trigger lockouts, trapping him inside."}
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
                  ${a.whatChanges||"Kevin cuts the emergency seal and refuses to sign the false manifest, irreversibly shifting from passive worker to active resistance."}
                </p>
              </div>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">movie</span>
            <p id="target-scene-synthesis" class="text-xs text-slate-700 leading-relaxed">
              ${a.synthesis||"Polarity shifts from cautious optimism (+1) to catastrophic physical trap and moral awakening (-2), marking the central pivot of the screenplay."}
            </p>
          </div>
        </section>
      `;default:return""}}function Kl(e="pacing",t=null,s=null){const n={...pa[e]||pa.pacing},o=sessionStorage.getItem("scriptora_prod_return");let a;try{const k=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;a=new URLSearchParams(k||"")}catch{a=new URLSearchParams}const i=t==="editor"||a.get("from")==="editor"||!!o,l=s||a.get("scriptId")||(o?o.replace("/editor/",""):null)||$.state.selectedScriptId||"chronicles-of-dust",r=`/editor/${l}`,f=l,u=$.state.scripts.find(k=>k.id===f)||$.state.activeScript||{title:"Chronicles of Dust",pages:96},d=Fa(f),c=Ha(d),m=Gl(d),b=Number($.state.currentSceneId||(c.find(k=>k.number===18)?18:c[0]?.number||1)),h=m[0]?.name||"Kevin",g=Ua(b,c),v=qa(h,d);e==="scene"?(n.desc=`Micro-structure of Scene ${g.number}: Objective, obstacle, polarity change.`,n.findings=g.findings||n.findings):e==="character-arc"&&(n.findings=v.findings||n.findings);const P={availableScenes:c,currentSceneData:g,availableChars:m,currentCharData:v},B=t||a.get("from");let L="/intelligence/analysis";return i?L=r:B==="dashboard"||B==="/intelligence/dashboard"||B?.includes("/intelligence/dashboard")?L="/intelligence/dashboard":B&&B.startsWith("/")&&(L=B),`
    ${dt(i?"Editor":"Intelligence",n.title)}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- Section Header with Back Navigation -->
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <button id="analysis-back-btn" data-scriptora-back="true" data-back-fallback="${L}" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back" title="Back">
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
            ${n.questions.map(k=>`
              <button type="button" class="query-pill shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors shadow-xs active:scale-95" data-query="${k}">
                ${k}
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
        ${Wl(e,u,P)}

        <!-- 5. IMPORTANT FINDINGS (KEY SCENE FINDINGS) -->
        <div class="flex flex-col gap-3" id="analysis-findings-container">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">Key Scene Findings</span>
            <span id="findings-count-tag" class="text-[11px] text-slate-400 font-medium">${n.findings.length} findings tracked</span>
          </div>

          <div id="findings-list" class="flex flex-col gap-3">
            ${n.findings.map(k=>`
              <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${k.scene}</span>
                  <span class="text-[11px] font-medium text-slate-400">${k.act}</span>
                </div>
                <div class="flex flex-col">
                  <h3 class="text-xs sm:text-sm font-bold text-slate-900">${k.title}</h3>
                  <p class="text-xs text-slate-600 mt-1 leading-relaxed">${k.desc}</p>
                </div>
                <div class="pt-2 flex justify-end border-t border-slate-100">
                  <!-- 6. OPEN IN EDITOR BUTTON -->
                  <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${k.targetScene}">
                    <span class="material-symbols-outlined text-[15px]">edit_note</span>
                    <span>Open in Editor (Scene ${k.targetScene})</span>
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    </main>

    ${it("intelligence")}
  `}function Jl(e,t,s=null,n=null){const o=sessionStorage.getItem("scriptora_prod_return");let a;try{const L=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;a=new URLSearchParams(L||"")}catch{a=new URLSearchParams}const i=s==="editor"||a.get("from")==="editor"||!!o,r=n||a.get("scriptId")||(o?o.replace("/editor/",""):null)||$.state.selectedScriptId||"chronicles-of-dust",f=Fa(r),u=Ha(f),d=document.getElementById("analysis-back-btn");d&&(d.onclick=L=>{L.preventDefault(),i&&sessionStorage.removeItem("scriptora_prod_return"),window.scriptoraRouter?window.scriptoraRouter.back(backUrl):t(backUrl)});function c(){document.querySelectorAll(".btn-open-editor-scene").forEach(L=>{L.onclick=()=>{const k=L.getAttribute("data-scene");$.setState({currentSceneId:Number(k)}),S(`Jumping to Scene ${k} in Editor`),t(`/editor/${r}?scene=${k}`)}})}c();function m(L){const k=document.getElementById("findings-list"),U=document.getElementById("findings-count-tag");U&&(U.textContent=`${L.length} findings tracked`),k&&(k.innerHTML=L.map(T=>`
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
          <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${T.targetScene}">
            <span class="material-symbols-outlined text-[15px]">edit_note</span>
            <span>Open in Editor (Scene ${T.targetScene})</span>
          </button>
        </div>
      </div>
    `).join(""),c())}const b=document.getElementById("analysis-scene-selector");b&&(b.onchange=L=>{const k=parseInt(L.target.value,10);$.setState({currentSceneId:k});const U=Ua(k,u),T=document.getElementById("target-scene-meta"),de=document.getElementById("target-scene-heading"),se=document.getElementById("target-scene-purpose"),ge=document.getElementById("target-scene-conflict"),J=document.getElementById("target-scene-what-changes"),ke=document.getElementById("target-scene-synthesis"),be=document.getElementById("analysis-header-desc");T&&(T.textContent=U.meta),de&&(de.textContent=U.heading),se&&(se.textContent=U.purpose),ge&&(ge.textContent=U.conflict),J&&(J.textContent=U.whatChanges),ke&&(ke.textContent=U.synthesis),be&&(be.textContent=`Micro-structure of Scene ${k}: Objective, obstacle, polarity change.`),m(U.findings),S(`Analyzing Scene ${k}`)});const h=document.getElementById("analysis-char-selector");h&&(h.onchange=L=>{const k=L.target.value,U=qa(k,f),T=document.getElementById("char-role-badge"),de=document.getElementById("char-scenes-count"),se=document.getElementById("char-step1-range"),ge=document.getElementById("char-step1-tag"),J=document.getElementById("char-step1-title"),ke=document.getElementById("char-step1-desc"),be=document.getElementById("char-step2-range"),ee=document.getElementById("char-step2-tag"),pe=document.getElementById("char-step2-title"),Z=document.getElementById("char-step2-desc"),ve=document.getElementById("char-step3-range"),C=document.getElementById("char-step3-tag"),G=document.getElementById("char-step3-title"),$e=document.getElementById("char-step3-desc"),ne=document.getElementById("char-synthesis-desc");T&&(T.textContent=U.role),de&&(de.textContent=U.scenesCount),se&&(se.textContent=U.step1Range),ge&&(ge.textContent=U.step1Tag),J&&(J.textContent=U.step1Title),ke&&(ke.textContent=U.step1Desc),be&&(be.textContent=U.step2Range),ee&&(ee.textContent=U.step2Tag),pe&&(pe.textContent=U.step2Title),Z&&(Z.textContent=U.step2Desc),ve&&(ve.textContent=U.step3Range),C&&(C.textContent=U.step3Tag),G&&(G.textContent=U.step3Title),$e&&($e.textContent=U.step3Desc),ne&&(ne.textContent=U.synthesis),m(U.findings),S(`Switched active character focus to ${U.name}`)}),document.querySelectorAll("[data-jump-scene]").forEach(L=>{L.onclick=()=>{const k=L.getAttribute("data-jump-scene");$.setState({currentSceneId:Number(k)}),S(`Jumping to Scene ${k} in Editor`),t(`/editor/${r}?scene=${k}`)}});const g=document.getElementById("vector-ai-input"),v=document.getElementById("vector-ai-submit"),P=document.getElementById("vector-ai-answer");async function B(L){if(!L||!P)return;P.classList.remove("hidden"),P.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing narrative beats...</span>';const k=await Dn(L,r);P.textContent=k}v&&g&&(v.onclick=()=>B(g.value.trim()),g.onkeydown=L=>{L.key==="Enter"&&B(g.value.trim())}),document.querySelectorAll(".query-pill").forEach(L=>{L.onclick=()=>{const k=L.getAttribute("data-query");g&&(g.value=k),B(k)}})}function Yl(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=t||s.get("scriptId")||$.state.editorReturnScriptId||$.state.selectedScriptId||"chronicles-of-dust",a=n==="editor",i=a?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/workspace",l=$.state.scripts?.find(m=>m.id===o)||$.state.scripts?.[0]||{},r=$.state.currentUser||(()=>{try{const m=localStorage.getItem("scriptora_user");if(m)return JSON.parse(m)}catch{}return{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}}})(),f=$.state.settings||(()=>{try{const m=localStorage.getItem("scriptora_settings");if(m)return JSON.parse(m)}catch{}return{editor:{showSceneNumbers:!0,autoCapitalize:!0,autoTransition:!0,continueDialogue:!0,fontSize:"Courier Prime 12pt",autoSave:"Instant"},language:"English (US)",transliteration:!1,appearance:"Light",accentColor:"blue",fontScale:"Normal",notifications:{invites:!0,edits:!0,insights:!0,milestones:!0},intelligence:{deepAnalysis:!0,pacingAlerts:!0,dialogueScoring:!0,sensitivity:"Balanced"},privacy:{watermark:!0,encryption:!0}}})(),u=Array.isArray($.state.scripts)?$.state.scripts.length:r.stats?.drafts??0,d=3,c=r.stats?.healthIndex||"98%";return`
    ${dt("Profile","Account & preferences.")}

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
              <span class="text-base font-bold text-slate-900 group-hover:text-blue-600 leading-tight font-heading">${u}</span>
              <span class="text-[10px] text-slate-500 group-hover:text-blue-500 mt-0.5 font-medium">Drafts</span>
            </button>
            <button type="button" id="stat-card-coauthors" class="bg-slate-50 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 rounded-xl p-2.5 text-center flex flex-col items-center transition-all cursor-pointer group">
              <span class="text-base font-bold text-slate-900 group-hover:text-blue-600 leading-tight font-heading">${d}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-editor">Numbers: ${f.editor?.showSceneNumbers?"On":"Off"} · Auto-save: ${f.editor?.autoSave||"Instant"}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-language">${f.language||"English (US)"}${f.transliteration?" · Transliteration On":""}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-appearance">${f.appearance||"Light"} · Scale: ${f.fontScale||"Normal"}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-notifications">${Object.values(f.notifications||{}).filter(Boolean).length} alerts active</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-intelligence">${f.intelligence?.deepAnalysis?"Deep Arc Diagnostics":"Standard"} · ${f.intelligence?.sensitivity||"Balanced"}</span>
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
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-privacy">${f.privacy?.watermark?"Watermark On":"Standard"} · Local AES Encrypted</span>
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
            <a href="/profile/collaborators${a?`?from=editor&scriptId=${o}`:""}" class="w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group no-underline text-inherit cursor-pointer">
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

        ${a?`
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
              <input type="checkbox" id="cfg-editor-scenenums" ${f.editor?.showSceneNumbers?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Auto-Capitalize Characters</span>
                <span class="text-[11px] text-slate-500">Auto uppercase character headings</span>
              </div>
              <input type="checkbox" id="cfg-editor-autocap" ${f.editor?.autoCapitalize!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Continue Dialogue (CONT'D)</span>
                <span class="text-[11px] text-slate-500">Auto append character continuation cues</span>
              </div>
              <input type="checkbox" id="cfg-editor-contd" ${f.editor?.continueDialogue!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Screenplay Font Style</label>
              <select id="cfg-editor-font" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Courier Prime 12pt" ${f.editor?.fontSize?.includes("Prime")?"selected":""}>Courier Prime (12pt)</option>
                <option value="Courier FinalDraft 12pt" ${f.editor?.fontSize?.includes("Final")?"selected":""}>Courier FinalDraft (12pt)</option>
                <option value="Courier New 11pt" ${f.editor?.fontSize?.includes("New")?"selected":""}>Courier Standard (11pt)</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Auto-save Frequency</label>
              <select id="cfg-editor-autosave" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Instant" ${f.editor?.autoSave==="Instant"?"selected":""}>Instant (300ms Keystroke Sync)</option>
                <option value="Every 15s" ${f.editor?.autoSave==="Every 15s"?"selected":""}>Every 15 Seconds</option>
                <option value="Every 60s" ${f.editor?.autoSave==="Every 60s"?"selected":""}>Every 60 Seconds</option>
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
              ${[{id:"en",name:"English (US)",code:"English (US)"},{id:"ta",name:"Tamil (தமிழ்)",code:"Tamil"},{id:"tg",name:"Tanglish",code:"Tanglish"},{id:"hi",name:"Hindi (हिंदी)",code:"Hindi"}].map(m=>`
                <button type="button" class="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${f.language===m.code?"border-blue-600 bg-blue-50 text-blue-700":"border-slate-200 bg-white text-slate-800 hover:bg-slate-50"}" data-lang="${m.code}">
                  ${m.name}
                </button>
              `).join("")}
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 mt-1">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Phonetic Transliteration</span>
                <span class="text-[11px] text-slate-500">Auto convert phonetic typing to Tamil script</span>
              </div>
              <input type="checkbox" id="cfg-lang-translit" ${f.transliteration?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
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
                ${[{id:"Light",label:"Light",icon:"light_mode"},{id:"Dark",label:"Dark",icon:"dark_mode"},{id:"System",label:"System",icon:"devices"}].map(m=>`
                  <button type="button" class="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all ${f.appearance===m.id?"border-blue-600 bg-blue-50 text-blue-700":"border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}" data-theme="${m.id}">
                    <span class="material-symbols-outlined text-[18px]">${m.icon}</span>
                    <span>${m.label}</span>
                  </button>
                `).join("")}
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Display Font Scale</label>
              <select id="cfg-app-scale" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Compact" ${f.fontScale==="Compact"?"selected":""}>Compact (90%)</option>
                <option value="Normal" ${f.fontScale!=="Compact"&&f.fontScale!=="Large"?"selected":""}>Normal (100%)</option>
                <option value="Large" ${f.fontScale==="Large"?"selected":""}>Comfortable (110%)</option>
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
              <input type="checkbox" id="cfg-notif-invites" ${f.notifications?.invites!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Peer Edits & Revisions</span>
                <span class="text-[11px] text-slate-500">Real-time alerts when co-writers edit scenes</span>
              </div>
              <input type="checkbox" id="cfg-notif-edits" ${f.notifications?.edits!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Intelligence Diagnostics</span>
                <span class="text-[11px] text-slate-500">Notifications when vector analysis updates</span>
              </div>
              <input type="checkbox" id="cfg-notif-insights" ${f.notifications?.insights!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Draft Snapshot Milestones</span>
                <span class="text-[11px] text-slate-500">Alert on automated version backups</span>
              </div>
              <input type="checkbox" id="cfg-notif-milestones" ${f.notifications?.milestones!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
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
              <input type="checkbox" id="cfg-intel-deep" ${f.intelligence?.deepAnalysis!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Proactive Pacing Warnings</span>
                <span class="text-[11px] text-slate-500">Detect narrative drag in Act II</span>
              </div>
              <input type="checkbox" id="cfg-intel-pacing" ${f.intelligence?.pacingAlerts!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Dialogue Subtext Scoring</span>
                <span class="text-[11px] text-slate-500">Evaluate voice distinctiveness</span>
              </div>
              <input type="checkbox" id="cfg-intel-dialogue" ${f.intelligence?.dialogueScoring!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex flex-col gap-1 mt-1">
              <label class="text-[11px] font-semibold text-slate-600">Model Sensitivity</label>
              <select id="cfg-intel-sensitivity" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Low" ${f.intelligence?.sensitivity==="Low"?"selected":""}>Low (Critical flags only)</option>
                <option value="Balanced" ${f.intelligence?.sensitivity!=="Low"&&f.intelligence?.sensitivity!=="High"?"selected":""}>Balanced (Recommended)</option>
                <option value="High" ${f.intelligence?.sensitivity==="High"?"selected":""}>High (Detailed micro-diagnostics)</option>
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
              <input type="checkbox" id="cfg-priv-watermark" ${f.privacy?.watermark!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Local Storage AES Encryption</span>
                <span class="text-[11px] text-slate-500">Encrypt local drafts in browser sandbox</span>
              </div>
              <input type="checkbox" id="cfg-priv-encrypt" ${f.privacy?.encryption!==!1?"checked":""} class="w-4 h-4 accent-blue-600 cursor-pointer">
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

    ${it("profile")}
  `}function Xl(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=t||n.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),a=s||n.get("scriptId")||$.state.editorReturnScriptId||$.state.selectedScriptId||"chronicles-of-dust",i=o==="editor",l=i?sessionStorage.getItem("scriptora_editor_return")||`/editor/${a}`:"/workspace",r=$.state.currentUser||(()=>{try{const I=localStorage.getItem("scriptora_user");if(I)return JSON.parse(I)}catch{}return{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",avatarColor:"bg-blue-600",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}}})(),f=document.getElementById("profile-bottom-return-btn");f&&(f.onclick=I=>{I.preventDefault(),sessionStorage.removeItem("scriptora_from_editor"),window.scriptoraRouter?window.scriptoraRouter.back(l):e(l)}),document.getElementById("stat-card-drafts")?.addEventListener("click",()=>{e("/workspace")}),document.getElementById("stat-card-coauthors")?.addEventListener("click",()=>{e(`/profile/collaborators${i?`?from=editor&scriptId=${a}`:""}`)}),document.getElementById("stat-card-health")?.addEventListener("click",()=>{e("/intelligence/dashboard")});const u=document.getElementById("settings-search-input");u&&(u.oninput=I=>{const F=I.target.value.toLowerCase().trim();let Y=0;document.querySelectorAll("#settings-list .setting-item").forEach(te=>{const me=te.textContent.toLowerCase().includes(F);te.style.display=me?"flex":"none",me&&Y++});const W=document.getElementById("no-settings-match");W&&(W.style.display=Y===0?"block":"none")});function d(I){const F=`modal-setting-${I.replace("sheet-","")}`,Y=document.getElementById(F);Y&&lt(Y)}function c(){document.querySelectorAll(".settings-modal").forEach(I=>{we(I)})}document.querySelectorAll(".setting-item").forEach(I=>{I.onclick=()=>{const F=I.getAttribute("data-sheet");F&&d(F)}}),document.querySelectorAll(".close-setting-modal").forEach(I=>{I.onclick=c}),document.querySelectorAll(".settings-modal, #modal-edit-profile, #modal-security, #action-modal").forEach(I=>{I.onclick=F=>{F.target===I&&we(I)}});function m(I){let F={};try{const W=localStorage.getItem("scriptora_settings");W&&(F=JSON.parse(W))}catch{}const Y=I(F);return localStorage.setItem("scriptora_settings",JSON.stringify(Y)),$.setState({settings:Y}),Bo(Y).catch(()=>{}),Y}const b=document.getElementById("btn-save-cfg-editor");b&&(b.onclick=()=>{const I=document.getElementById("cfg-editor-scenenums")?.checked??!0,F=document.getElementById("cfg-editor-autocap")?.checked??!0,Y=document.getElementById("cfg-editor-contd")?.checked??!0,W=document.getElementById("cfg-editor-font")?.value||"Courier Prime 12pt",te=document.getElementById("cfg-editor-autosave")?.value||"Instant";m(me=>({...me,editor:{...me.editor||{},showSceneNumbers:I,autoCapitalize:F,continueDialogue:Y,fontSize:W,autoSave:te}})),localStorage.setItem("scriptora_autosave",te==="Instant"?"true":"false");const he=document.getElementById("desc-sheet-editor");he&&(he.textContent=`Numbers: ${I?"On":"Off"} · Auto-save: ${te}`),c(),S("Editor preferences saved")});let h=$.state.settings?.language||"English (US)";document.querySelectorAll(".btn-lang-choice").forEach(I=>{I.onclick=()=>{h=I.getAttribute("data-lang"),document.querySelectorAll(".btn-lang-choice").forEach(F=>{F.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-slate-200 bg-white text-slate-800 hover:bg-slate-50"}),I.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const g=document.getElementById("btn-save-cfg-language");g&&(g.onclick=()=>{const I=document.getElementById("cfg-lang-translit")?.checked??!1;m(Y=>({...Y,language:h,transliteration:I}));const F=document.getElementById("desc-sheet-language");F&&(F.textContent=`${h}${I?" · Transliteration On":""}`),c(),S(`Language set to ${h}`)});let v=$.state.settings?.appearance||"Light";document.querySelectorAll(".btn-theme-choice").forEach(I=>{I.onclick=()=>{v=I.getAttribute("data-theme"),document.querySelectorAll(".btn-theme-choice").forEach(F=>{F.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}),I.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const P=document.getElementById("btn-save-cfg-appearance");P&&(P.onclick=()=>{const I=document.getElementById("cfg-app-scale")?.value||"Normal";m(Y=>({...Y,appearance:v,fontScale:I})),v==="Dark"?(document.documentElement.classList.add("dark"),localStorage.setItem("scriptora_theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("scriptora_theme","light"));const F=document.getElementById("desc-sheet-appearance");F&&(F.textContent=`${v} · Scale: ${I}`),c(),S(`Appearance updated: ${v}`)});const B=document.getElementById("btn-save-cfg-notifications");B&&(B.onclick=()=>{const I=document.getElementById("cfg-notif-invites")?.checked??!0,F=document.getElementById("cfg-notif-edits")?.checked??!0,Y=document.getElementById("cfg-notif-insights")?.checked??!0,W=document.getElementById("cfg-notif-milestones")?.checked??!0,te={invites:I,edits:F,insights:Y,milestones:W};m(Ce=>({...Ce,notifications:te}));const he=Object.values(te).filter(Boolean).length,me=document.getElementById("desc-sheet-notifications");me&&(me.textContent=`${he} alerts active`),c(),S("Notification preferences updated")});const L=document.getElementById("btn-save-cfg-intelligence");L&&(L.onclick=()=>{const I=document.getElementById("cfg-intel-deep")?.checked??!0,F=document.getElementById("cfg-intel-pacing")?.checked??!0,Y=document.getElementById("cfg-intel-dialogue")?.checked??!0,W=document.getElementById("cfg-intel-sensitivity")?.value||"Balanced";m(he=>({...he,intelligence:{deepAnalysis:I,pacingAlerts:F,dialogueScoring:Y,sensitivity:W}}));const te=document.getElementById("desc-sheet-intelligence");te&&(te.textContent=`${I?"Deep Arc Diagnostics":"Standard"} · ${W}`),c(),S("Intelligence engine calibrated")});const k=document.getElementById("btn-save-cfg-privacy");k&&(k.onclick=()=>{const I=document.getElementById("cfg-priv-watermark")?.checked??!0,F=document.getElementById("cfg-priv-encrypt")?.checked??!0;m(W=>({...W,privacy:{watermark:I,encryption:F}}));const Y=document.getElementById("desc-sheet-privacy");Y&&(Y.textContent=`${I?"Watermark On":"Standard"} · Local AES Encrypted`),c(),S("Privacy governance updated")});const U=document.getElementById("btn-export-portfolio-data");U&&(U.onclick=()=>{const I={exportedAt:new Date().toISOString(),user:$.state.currentUser,scripts:$.state.scripts,screenplay:$.state.screenplay,settings:$.state.settings},F=new Blob([JSON.stringify(I,null,2)],{type:"application/json"}),Y=URL.createObjectURL(F),W=document.createElement("a");W.href=Y,W.download=`scriptora_portfolio_backup_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(W),W.click(),document.body.removeChild(W),URL.revokeObjectURL(Y),S("Portfolio archive downloaded successfully")});const T=document.getElementById("btn-force-cloud-sync");T&&(T.onclick=()=>{T.disabled=!0,T.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span><span>Synchronizing...</span>',setTimeout(()=>{T.disabled=!1,T.innerHTML='<span class="material-symbols-outlined text-[16px]">sync</span><span>Force Cloud Re-sync</span>';const I=document.getElementById("sync-status-msg");I&&(I.textContent=`Synchronized at ${new Date().toLocaleTimeString()}`),S("All screenplay drafts synchronized with cloud")},700)});const de=document.getElementById("btn-clear-local-cache");de&&(de.onclick=()=>{sessionStorage.clear(),S("Temporary cache and diagnostic buffers cleared")});const se=document.getElementById("modal-edit-profile"),ge=document.getElementById("trigger-modal-email"),J=document.getElementById("edit-avatar-btn"),ke=document.getElementById("avatar-container-btn"),be=document.getElementById("form-update-profile"),ee=document.getElementById("local-photo-input"),pe=document.getElementById("btn-modal-upload-photo"),Z=document.getElementById("btn-modal-remove-photo");function ve(I){I?lt(se):we(se)}ge&&(ge.onclick=()=>ve(!0)),ke&&(ke.onclick=()=>ve(!0)),J&&(J.onclick=I=>{I.stopPropagation(),ee&&ee.click()}),pe&&(pe.onclick=()=>{ee&&ee.click()}),document.querySelectorAll(".close-profile-modal").forEach(I=>I.onclick=()=>ve(!1)),ee&&(ee.onchange=I=>{const F=I.target.files?.[0];if(!F)return;if(!F.type.startsWith("image/")){S("Please select a valid image file (PNG, JPG, WEBP)");return}const Y=new FileReader;Y.onload=W=>{const te=new Image;te.onload=()=>{const he=document.createElement("canvas"),me=360;let Ce=te.width,Be=te.height;Ce>Be?Ce>me&&(Be=Math.round(Be*me/Ce),Ce=me):Be>me&&(Ce=Math.round(Ce*me/Be),Be=me),he.width=Ce,he.height=Be,he.getContext("2d").drawImage(te,0,0,Ce,Be);const De=he.toDataURL("image/jpeg",.88),j={...$.state.currentUser||r,avatarUrl:De};$.setState({currentUser:j}),localStorage.setItem("scriptora_user",JSON.stringify(j)),bn({avatarUrl:De}).catch(()=>{});const V=document.getElementById("user-avatar-circle");V&&(V.innerHTML=`<img id="user-avatar-img" src="${De}" class="w-full h-full object-cover" alt="Profile" />`);const X=document.getElementById("modal-preview-avatar");X&&(X.innerHTML=`<img id="modal-preview-img" src="${De}" class="w-full h-full object-cover" alt="Preview" />`),Z&&Z.classList.remove("hidden");const N=document.getElementById("header-profile-btn");N&&(N.innerHTML=`<img src="${De}" class="w-full h-full object-cover" alt="Profile" />`),S("Profile picture updated successfully!")},te.src=W.target.result},Y.readAsDataURL(F),ee.value=""}),Z&&(Z.onclick=()=>{const F={...$.state.currentUser||r,avatarUrl:null};$.setState({currentUser:F}),localStorage.setItem("scriptora_user",JSON.stringify(F)),bn({avatarUrl:null}).catch(()=>{});const Y=F.initials||"AK",W=document.getElementById("user-avatar-circle");W&&(W.innerHTML=`<span id="user-avatar-initials">${Y}</span>`);const te=document.getElementById("modal-preview-avatar");te&&(te.innerHTML=`<span id="modal-preview-initials">${Y}</span>`),Z.classList.add("hidden");const he=document.getElementById("header-profile-btn");he&&(he.innerHTML=`<span>${Y}</span>`),S("Profile photo removed")});let C=r.avatarColor||"bg-blue-600";document.querySelectorAll(".prof-avatar-color-btn").forEach(I=>{I.onclick=()=>{C=I.getAttribute("data-color"),document.querySelectorAll(".prof-avatar-color-btn").forEach(F=>F.classList.remove("ring-2","ring-offset-2","ring-blue-600")),I.classList.add("ring-2","ring-offset-2","ring-blue-600")}}),be&&(be.onsubmit=async I=>{I.preventDefault();const F=document.getElementById("prof-input-name").value.trim(),Y=document.getElementById("prof-input-headline").value.trim(),W=document.getElementById("prof-input-email").value.trim(),te=F.split(/\s+/),he=(te[0]?.[0]||"A")+(te[1]?.[0]||""),me={...$.state.currentUser||r,name:F,displayName:F,headline:Y,email:W,initials:he.toUpperCase(),avatarColor:C};await bn(me),$.setState({currentUser:me});const Ce=document.getElementById("profile-display-name"),Be=document.getElementById("profile-display-headline"),Le=document.getElementById("profile-display-email"),De=document.getElementById("user-avatar-circle");Ce&&(Ce.textContent=F),Be&&(Be.textContent=Y),Le&&(Le.textContent=W),De&&!me.avatarUrl&&(De.innerHTML=`<span id="user-avatar-initials">${he.toUpperCase()}</span>`,De.className=`w-20 h-20 rounded-full ${C} text-white font-bold text-2xl flex items-center justify-center shadow-md overflow-hidden transition-transform active:scale-95 border-2 border-white ring-2 ring-slate-100`),ve(!1),S("Profile and account updated successfully")});const G=document.getElementById("modal-security"),$e=document.getElementById("trigger-modal-password"),ne=document.getElementById("form-update-pw");function xe(I){I?lt(G):we(G)}$e&&($e.onclick=()=>xe(!0)),document.querySelectorAll(".close-security-modal").forEach(I=>I.onclick=()=>xe(!1)),document.querySelectorAll(".btn-toggle-pw").forEach(I=>{I.onclick=()=>{const F=I.getAttribute("data-target"),Y=document.getElementById(F),W=I.querySelector(".material-symbols-outlined");Y&&(Y.type==="password"?(Y.type="text",W&&(W.textContent="visibility_off")):(Y.type="password",W&&(W.textContent="visibility")))}}),ne&&(ne.onsubmit=I=>{I.preventDefault(),document.getElementById("pw-input-current")?.value;const F=document.getElementById("pw-input-new")?.value,Y=document.getElementById("pw-input-confirm")?.value,W=document.getElementById("pw-error-text");if(!F||F.length<6){W&&(W.textContent="New password must be at least 6 characters long.",W.classList.remove("hidden"));return}if(F!==Y){W&&(W.textContent="New password and confirmation do not match.",W.classList.remove("hidden"));return}W&&W.classList.add("hidden"),xe(!1),S("Password updated securely"),ne.reset()});const A=document.getElementById("action-modal"),ye=document.getElementById("action-modal-title"),Fe=document.getElementById("action-modal-desc"),Te=document.getElementById("action-modal-icon"),ie=document.getElementById("action-modal-icon-box"),ce=document.getElementById("action-modal-confirm"),_=document.getElementById("action-modal-cancel"),Ae=document.getElementById("action-modal-input-wrap"),Me=document.getElementById("action-modal-phrase-input"),oe=document.getElementById("action-modal-error");let je="signout",ue=!1;function qe(I){ue=!1,je=I,ce&&(ce.disabled=!1,ce.textContent=I==="signout"?"Sign Out":"Delete Forever"),_&&(_.disabled=!1),oe&&(oe.textContent="",oe.classList.add("hidden")),Me&&(Me.value=""),I==="signout"?(ye.textContent="Sign Out",Fe.textContent="Are you sure you want to end your active session on this device? Unsaved changes in your draft have been synchronized.",Te.textContent="logout",ie.className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center",ce.className="flex-1 h-10 px-4 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 cursor-pointer transition-colors flex items-center justify-center gap-1.5",ce.textContent="Sign Out",Ae&&Ae.classList.add("hidden")):(ye.textContent="Delete Account",Fe.textContent="This action will permanently delete your account, private screenplays, versions, and production records. Authorized collaborators on shared scripts will retain access.",Te.textContent="warning",ie.className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center",ce.className="flex-1 h-10 px-4 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer transition-colors flex items-center justify-center gap-1.5",ce.textContent="Delete Forever",Ae&&Ae.classList.remove("hidden")),lt(A),I==="delete"&&Me&&setTimeout(()=>Me.focus(),100)}function ze(){ue=!1,ce&&(ce.disabled=!1),_&&(_.disabled=!1),we(A)}const Pe=document.getElementById("btn-trigger-signout");Pe&&(Pe.onclick=()=>qe("signout"));const z=document.getElementById("btn-trigger-delete-acc");z&&(z.onclick=()=>qe("delete")),_&&(_.onclick=ze),ce&&(ce.onclick=async()=>{if(ue)return;if(je==="delete"&&(Me?.value||"").trim().toUpperCase()!=="DELETE MY ACCOUNT"){oe&&(oe.textContent='Please type "DELETE MY ACCOUNT" exactly to proceed with deletion.',oe.classList.remove("hidden")),Me&&Me.focus();return}ue=!0,ce.disabled=!0,_&&(_.disabled=!0);const I=ce.textContent;ce.innerHTML=`
        <span class="material-symbols-outlined text-[15px] animate-spin">refresh</span>
        <span>${je==="signout"?"Signing Out...":"Deleting Account..."}</span>
      `;try{if(je==="signout")await va(),$.resetUserSession(),window.scriptoraRouter?.clearHistory&&window.scriptoraRouter.clearHistory(),we(A),S("Signed out of Scriptora"),e("/auth",!0);else{const F=(Me?.value||"").trim(),Y=await po(F);$.resetUserSession(),window.scriptoraRouter?.clearHistory&&window.scriptoraRouter.clearHistory(),we(A),S(Y.message||"Account deleted successfully"),e("/auth",!0)}}catch(F){oe&&(oe.textContent=F.message||"Operation failed. Please try again.",oe.classList.remove("hidden")),S(F.message||"Action failed","error")}finally{ue=!1,ce&&(ce.disabled=!1,ce.textContent=I),_&&(_.disabled=!1)}})}function Zl(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=t||s.get("scriptId")||$.state.editorReturnScriptId||$.state.selectedScriptId||"chronicles-of-dust",a=n==="editor",i=a?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/profile",l=$.state.scripts.find(r=>r.id===o)||$.state.scripts[0]||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",joinCode:"A7K9-XP42"};return`
    ${dt("Profile","Collaborators")}

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
            ${$.state.scripts.map(r=>`
              <button class="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors switch-script-opt" data-id="${r.id}">
                <div class="flex flex-col">
                  <span class="text-xs font-semibold text-slate-900">${r.title}</span>
                  <span class="text-[10px] text-slate-500">${r.format||"Feature"} · ${r.draft||"Draft 1.0"}</span>
                </div>
                ${r.id===l.id?'<span class="material-symbols-outlined text-blue-600 text-[16px]">check</span>':""}
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

        ${a?`
          <div class="pt-2">
            <a href="${i}" id="collab-bottom-return-btn" class="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center gap-2 border border-blue-200 shadow-2xs no-underline transition-all active:scale-98">
              <span class="material-symbols-outlined text-[18px]">edit_note</span>
              <span>Return to Editor (${l.title||"Screenplay"})</span>
            </a>
          </div>
        `:""}

      </div>
    </main>

    ${it("profile")}
  `}function Ql(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=t||n.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),a=s||n.get("scriptId")||$.state.editorReturnScriptId||$.state.selectedScriptId||"chronicles-of-dust",i=o==="editor",l=i?sessionStorage.getItem("scriptora_editor_return")||`/editor/${a}`:"/profile",r=document.getElementById("collab-back-btn");r&&(r.onclick=ee=>{ee.preventDefault(),i&&sessionStorage.removeItem("scriptora_from_editor"),window.scriptoraRouter?window.scriptoraRouter.back(l):e(l)});const f=document.getElementById("collab-bottom-return-btn");f&&(f.onclick=ee=>{ee.preventDefault(),i&&sessionStorage.removeItem("scriptora_from_editor"),window.scriptoraRouter?window.scriptoraRouter.back(l):e(l)});let u="A7K9-XP42";async function d(){const ee=await wo(a),pe=document.getElementById("collaborators-list");if(pe){if(ee.length===0){pe.innerHTML='<div class="p-4 text-center text-xs text-slate-400">No external collaborators yet. Share your join code to invite teammates.</div>';return}pe.innerHTML=ee.map(Z=>`
      <div class="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
        <div class="flex items-center gap-3 min-w-0 pr-2">
          <div class="w-9 h-9 rounded-full ${Z.avatarBg||"bg-blue-100 text-blue-700"} flex items-center justify-center font-bold text-xs shrink-0">
            ${Z.initials}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-slate-900 truncate">${Z.name}</span>
            <span class="text-[11px] text-slate-500 truncate">${Z.email}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">${Z.role}</span>
          <button class="remove-collab-btn text-slate-400 hover:text-red-600 p-1" data-id="${Z.id}" title="Remove access">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".remove-collab-btn").forEach(Z=>{Z.onclick=async()=>{const ve=Z.getAttribute("data-id");confirm("Remove collaborator access for this user?")&&(await Eo(a,ve),S("Collaborator access removed"),d())}})}}d();const c=document.getElementById("projectSelectBtn"),m=document.getElementById("projectDropdown");let b=null;c&&m&&(b=Aa(c,m,{placement:"bottom-start"})),document.querySelectorAll(".switch-script-opt").forEach(ee=>{ee.onclick=()=>{const pe=ee.getAttribute("data-id");$.selectScript(pe),b?.close(),e(`/profile/collaborators${i?`?from=editor&scriptId=${pe}`:""}`)}});const h=document.getElementById("openInviteBtn"),g=document.getElementById("closeInviteBtn"),v=document.getElementById("inviteCard"),P=document.getElementById("sendInviteBtn");h&&(h.onclick=()=>v?.classList.remove("hidden")),g&&(g.onclick=()=>v?.classList.add("hidden")),P&&(P.onclick=async()=>{const ee=document.getElementById("inviteEmailInput")?.value.trim(),pe=document.querySelector('input[name="inviteRole"]:checked')?.value||"editor";ee&&(await So(a,{email:ee,role:pe}),S(`Invited ${ee} as ${pe}`),v?.classList.add("hidden"),d())});const B=document.getElementById("tabGenCodeBtn"),L=document.getElementById("tabEnterCodeBtn"),k=document.getElementById("paneGenerateCode"),U=document.getElementById("paneEnterCode");B&&(B.onclick=()=>{B.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",L.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",k?.classList.remove("hidden"),U?.classList.add("hidden")}),L&&(L.onclick=()=>{L.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",B.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",U?.classList.remove("hidden"),k?.classList.add("hidden")});const T=document.getElementById("copyJoinCodeBtn"),de=document.getElementById("copyJoinCodeLabel");T&&(T.onclick=()=>{const ee=document.getElementById("displayJoinCode")?.textContent||u;navigator.clipboard?.writeText(ee),de.textContent="Copied!",setTimeout(()=>{de.textContent="Copy"},1800),S(`Copied code: ${ee}`)});const se=document.getElementById("regenJoinCodeBtn");se&&(se.onclick=async()=>{const ee=await ko(a);u=ee;const pe=document.getElementById("displayJoinCode");pe&&(pe.textContent=ee),S(`Generated new join code: ${ee}`)});const ge=document.getElementById("verifyCodeBtn"),J=document.getElementById("joinCodeInput"),ke=document.getElementById("joinCodeResultCard"),be=document.getElementById("confirmJoinScriptBtn");J&&(J.oninput=ee=>{let pe=ee.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"");pe.length>4&&(pe=pe.slice(0,4)+"-"+pe.slice(4,8)),ee.target.value=pe}),ge&&J&&(ge.onclick=async()=>{const ee=J.value.trim();if(!ee)return;ge.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>';const pe=await Io(ee);ge.innerHTML="<span>Verify</span>",pe.valid?(ke?.classList.remove("hidden"),document.getElementById("verifiedScriptTitle").textContent=pe.script.title,document.getElementById("verifiedScriptFormat").textContent=`${pe.script.format} · ${pe.script.pages} pages`,S("Valid join code")):(ke?.classList.add("hidden"),S("Invalid or expired join code","error"))}),be&&J&&(be.onclick=async()=>{const ee=J.value.trim();await Co(ee),S("Successfully joined screenplay workspace!"),e("/workspace")})}function ei(){return $.state.currentUser?.initials,`
    <div class="flex flex-col min-h-screen bg-surface w-full relative">
      ${dt("Notifications","Activity")}

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

      ${it("workspace")}
    </div>
  `}function ti(e){const t=document.getElementById("btn-back-notif");t&&(t.onclick=()=>{if(window.scriptoraRouter)window.scriptoraRouter.back("/workspace");else{const c=$.getPreviousRoute("/workspace");e(c)}});let s="all",n="normal",o=[];async function a(){const c=document.getElementById("notif-feed-container");if(!c)return;if(n==="loading"){c.innerHTML=`
        <div class="space-y-3 animate-pulse">
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
        </div>
      `;return}if(n==="error"){c.innerHTML=`
        <div class="p-6 bg-white border border-red-200 rounded-2xl flex flex-col items-center text-center gap-2">
          <span class="material-symbols-outlined text-3xl text-red-500">wifi_off</span>
          <h3 class="font-bold text-sm text-slate-900">Sync Connection Lost</h3>
          <p class="text-xs text-slate-500 max-w-xs">Unable to refresh notification stream. Please check network connection.</p>
          <button id="btn-retry-sync" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-xs hover:bg-blue-700">
            Retry Connection
          </button>
        </div>
      `,document.getElementById("btn-retry-sync")?.addEventListener("click",()=>{n="normal",a()});return}if(o=(await wa()).notifications||[],n==="empty"||s==="unread"&&o.filter(B=>B.unread).length===0){c.innerHTML=`
        <div class="p-8 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center text-center gap-2">
          <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <h3 class="font-bold text-sm text-slate-900">You’re all caught up!</h3>
          <p class="text-xs text-slate-500 max-w-xs">No pending notifications or requests requiring your review.</p>
        </div>
      `;return}const b=o.filter(B=>B.unread).length;document.getElementById("badge-all-count").textContent=o.length,document.getElementById("badge-unread-count").textContent=b,$.setState({unreadNotifications:b});let h=o;s==="unread"&&(h=h.filter(B=>B.unread));const g=h.filter(B=>B.group==="today"),v=h.filter(B=>B.group!=="today");function P(B,L){return L.length===0?"":`
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-xs font-bold text-slate-400 tracking-wider uppercase font-heading">${B}</h2>
          </div>
          <div class="flex flex-col gap-2">
            ${L.map(k=>`
              <div class="notif-row relative flex items-start gap-3 p-3.5 rounded-xl bg-white border ${k.unread?"border-l-4 border-l-blue-600 border-slate-200/80 shadow-xs":"border-slate-200/60 opacity-80"} hover:shadow-sm transition-all cursor-pointer" data-id="${k.id}" data-route="${k.actionRoute}">
                <div class="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                  ${k.sender.startsWith("icon:")?`<span class="material-symbols-outlined text-[18px] text-blue-600">${k.sender.replace("icon:","")}</span>`:k.sender}
                </div>
                <div class="flex flex-col flex-1 min-w-0">
                  <div class="flex items-baseline justify-between gap-2">
                    <h3 class="text-xs font-bold text-slate-900 truncate">${k.title}</h3>
                    <span class="text-[10px] text-slate-400 shrink-0">${k.time}</span>
                  </div>
                  <p class="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">${k.body}</p>
                  <div class="mt-2 flex items-center gap-1.5 flex-wrap">
                    ${(k.tags||[]).map(U=>`<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">${U}</span>`).join("")}
                    <span class="text-blue-600 text-[11px] font-semibold ml-auto">${k.actionLabel||"View →"}</span>
                  </div>
                </div>
                ${k.unread?'<div class="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1"></div>':""}
              </div>
            `).join("")}
          </div>
        </div>
      `}c.innerHTML=P("Today",g)+P("Earlier",v),document.querySelectorAll(".notif-row").forEach(B=>{B.onclick=async()=>{const L=parseInt(B.getAttribute("data-id")),k=B.getAttribute("data-route");await Ao(L),await $.refreshNotifications(),k?e(k):a()}})}a();const i=document.getElementById("filter-all-btn"),l=document.getElementById("filter-unread-btn");i&&(i.onclick=()=>{s="all",i.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",l.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",a()}),l&&(l.onclick=()=>{s="unread",l.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",i.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",a()});const r=document.getElementById("btn-mark-all-read");r&&(r.onclick=async()=>{await $o(),await $.refreshNotifications(),S("All notifications marked as read"),a()});const f=document.getElementById("btn-toggle-sim"),u=document.getElementById("sim-menu-dropdown");let d=null;f&&u&&(d=Aa(f,u,{placement:"bottom-end"})),document.querySelectorAll(".sim-opt").forEach(c=>{c.onclick=()=>{n=c.getAttribute("data-state"),d?.close(),a(),S(`Simulating ${n} state`)}})}function si(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from"),o=t||s.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",a=n==="editor"||n&&n.startsWith("/editor");a?sessionStorage.getItem("scriptora_prod_return")||(n&&n.startsWith("/editor")||`${o}`):n&&n.startsWith("/");let i=null;if(window.scriptoraRouter){const r=window.scriptoraRouter.peekPreviousRoute?.();r&&(i=window.scriptoraRouter.getRouteLabel(r))}a||i||n?.includes("/intelligence");const l=$.state.scripts?.find(r=>r.id===o)||$.state.scripts?.[0]||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2"};return`
    <!-- Standard App Header -->
    ${dt("Pre-Production","Production Tools")}

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
                ${$.state.scripts&&$.state.scripts.length>0?$.state.scripts.map(r=>`
                  <option value="${r.id}" ${r.id===l.id?"selected":""}>${r.title} (${r.format||"Feature"})</option>
                `).join(""):`
                  <option value="${l.id}" selected>${l.title}</option>
                `}
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
    ${it("production")}
  `}async function ni(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",a=document.getElementById("production-back-btn");a&&(a.onclick=()=>{window.scriptoraRouter?window.scriptoraRouter.back("/workspace"):e("/workspace")});const i=document.getElementById("prod-script-select");i&&(i.onchange=d=>{const c=d.target.value;$.setState({selectedScriptId:c}),e(`/production?scriptId=${c}`)});const l=document.getElementById("btn-repin-source");l&&(l.onclick=async()=>{const d="Draft 4.3";await Po(o,d),document.getElementById("source-version-alert")?.classList.add("hidden");const c=document.getElementById("pinned-version-label");c&&(c.textContent=`${d} (Pinned)`),S(`Pinned source updated to ${d}`)});const r=document.getElementById("btn-dismiss-staleness");r&&(r.onclick=()=>{document.getElementById("source-version-alert")?.classList.add("hidden"),S("Retained Draft 4.2 pinned baseline")});const f=`/production?scriptId=${o}`,u={"script-breakdown":`/production/breakdown?scriptId=${o}&from=${encodeURIComponent(f)}`,"shooting-schedule":`/production/schedule?scriptId=${o}&from=${encodeURIComponent(f)}`,"call-sheets":`/production/call-sheets?scriptId=${o}&from=${encodeURIComponent(f)}`,"dialogue-sheets":`/production/dialogue-sides?scriptId=${o}&from=${encodeURIComponent(f)}`,"storyboard-studio":`/production/storyboard?scriptId=${o}&from=${encodeURIComponent(f)}`};document.querySelectorAll(".tool-card").forEach(d=>{d.onclick=()=>{const c=d.getAttribute("data-tool");u[c]&&e(u[c])}})}function ai(){const e=$.state.selectedScriptId||"chronicles-of-dust",t=$.state.scripts?.find(s=>s.id===e)||{title:"Chronicles of Dust",draft:"Draft 4.2"};return`
    <div class="fixed inset-0 bg-surface flex flex-col font-body text-slate-800 select-none overflow-hidden">
      <!-- Standard Header (Fixed Top) -->
      ${dt("AI Chat","Universal Assistant")}

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
      ${it("chat")}
    </div>
  `}function oi(e){const t=document.getElementById("chat-input"),s=document.getElementById("chat-send-btn"),n=document.getElementById("chat-messages-container"),o=document.getElementById("btn-clear-chat"),a=document.getElementById("chat-back-btn"),i=document.querySelectorAll(".chat-chip"),l=$.state.selectedScriptId||"chronicles-of-dust";a&&(a.onclick=()=>{window.scriptoraRouter?window.scriptoraRouter.back("/workspace"):e("/workspace")});const r=localStorage.getItem("scriptora_chat_history");if(r)try{JSON.parse(r).forEach(c=>f(c.role,c.text,!1))}catch{}t&&t.addEventListener("input",()=>{t.style.height="auto",t.style.height=Math.min(t.scrollHeight,96)+"px"});function f(d,c,m=!0){if(!n)return;const b=d==="user",h=document.createElement("div");if(h.className=`flex items-start gap-2.5 max-w-[88%] ${b?"self-end flex-row-reverse":""}`,h.innerHTML=`
      <div class="w-7 h-7 rounded-lg ${b?"bg-slate-800":"bg-blue-600"} text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
        <span class="material-symbols-outlined text-[15px]">${b?"person":"chat_bubble_outline"}</span>
      </div>
      <div class="${b?"bg-blue-600 text-white rounded-2xl rounded-tr-xs":"bg-white text-slate-700 border border-slate-200/90 rounded-2xl rounded-tl-xs"} p-3.5 shadow-2xs flex flex-col gap-1 text-xs leading-relaxed">
        <div class="flex items-center justify-between gap-4 font-semibold ${b?"text-blue-100":"text-slate-900"} text-[11px]">
          <span>${b?"You":"Scriptora Universal AI"}</span>
          <span class="${b?"text-blue-200":"text-slate-400"} font-normal text-[10px]">Now</span>
        </div>
        <div class="whitespace-pre-wrap">${c}</div>
      </div>
    `,n.appendChild(h),n.scrollTop=n.scrollHeight,m)try{const g=JSON.parse(localStorage.getItem("scriptora_chat_history")||"[]");g.push({role:d,text:c,timestamp:new Date().toISOString()}),localStorage.setItem("scriptora_chat_history",JSON.stringify(g.slice(-30)))}catch{}}async function u(){if(!t)return;const d=t.value.trim();if(!d)return;f("user",d,!0),t.value="",t.style.height="auto";const c=document.createElement("div");c.className="flex items-center gap-2 text-xs text-slate-400 py-1 pl-9 italic",c.innerHTML=`
      <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
      <span>Reviewing screenplay context & production model...</span>
    `,n.appendChild(c),n.scrollTop=n.scrollHeight;try{const m=await Dn(d,l);c.remove();let b=m;d.toLowerCase().includes("call sheet")?b=`📋 **Call Sheet Preparation (Draft 4.2)**
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
*(Detailed shot canvas will be available in Storyboard Studio Prompt 3)*`),f("assistant",b,!0)}catch{c.remove(),f("assistant","I analyzed your request against the active screenplay context. Pacing and scene logistics align with Draft 4.2 standards.",!0)}}s&&(s.onclick=u),t&&(t.onkeydown=d=>{d.key==="Enter"&&!d.shiftKey&&(d.preventDefault(),u())}),i.forEach(d=>{d.onclick=()=>{const c=d.getAttribute("data-prompt");t&&(t.value=c,u())}}),o&&(o.onclick=()=>{localStorage.removeItem("scriptora_chat_history"),n.innerHTML=`
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
      `})}function Hs(e,t="tune",s=null,n="",o=null,a=null){const l=new URLSearchParams(window.location.search||"").get("from");return`
    <div class="flex items-center justify-between gap-3 py-1 border-b border-slate-200/70 pb-3 mb-2">
      <div class="flex items-center gap-2.5 min-w-0 flex-1">
        <button type="button" id="prod-subnav-back" data-scriptora-back="true" data-back-fallback="${s||l||"/production"}" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back" title="Back">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
        <div class="flex flex-col min-w-0">
          <h1 class="font-heading font-bold text-lg sm:text-xl text-slate-900 tracking-tight truncate">${e}</h1>
          <p class="text-xs text-slate-500 mt-0.5 truncate">${a||"Chronicles of Dust"}</p>
        </div>
      </div>

      ${n?`
        <div class="flex items-center gap-2 shrink-0">
          ${n}
        </div>
      `:""}
    </div>
  `}function za(e){return e?String(e).replace(/\u00B0/g," deg ").replace(/\u00BD/g," 1/2").replace(/\u00BC/g," 1/4").replace(/\u00BE/g," 3/4").replace(/\u215B/g," 1/8").replace(/\u215C/g," 3/8").replace(/\u215D/g," 5/8").replace(/\u215E/g," 7/8").replace(/\u00A0/g," ").replace(/[\t]+/g," ").replace(/\u2014/g," -- ").replace(/\u2013/g,"-").replace(/\u2026/g,"...").replace(/[\u201C\u201D]/g,'"').replace(/[\u2018\u2019]/g,"'").replace(/\u00B7/g," - ").replace(/\u2022/g,"* ").replace(/\u2192/g,"->").replace(/\u2190/g,"<-").replace(/[^\x20-\x7E]/g," ").replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/[\r\n]+/g," "):""}function At(e,t=10,s="F1"){if(!e)return 0;const n=String(e),o=s==="F2"||s==="F4"?.56:s==="F3"||s==="F5"?.6:.52;return n.length*t*o}function ot(e,t,s=10,n="F1"){if(!e)return"";const o=String(e).trim();if(At(o,s,n)<=t)return o;const a="...",i=At(a,s,n);let l=o;for(;l.length>0&&At(l,s,n)+i>t;)l=l.slice(0,-1);return l?l.trim()+a:""}function Bs(e,t,s=10,n="F1"){if(!e)return[];const o=String(e).split(/\s+/).filter(Boolean);if(o.length===0)return[];const a=[];let i="";for(const l of o){const r=i?i+" "+l:l;At(r,s,n)<=t?i=r:(i&&a.push(i),At(l,s,n)>t?(a.push(ot(l,t,s,n)),i=""):i=l)}return i&&a.push(i),a}function ms(e,t){if(!e)return[];const s=String(e).split(/\s+/),n=[];let o="";for(const a of s)o?o.length+1+a.length<=t?o+=" "+a:(n.push(o),o=a):o=a;return o&&n.push(o),n}function xs(e,t){if(!e||!(e instanceof Blob))throw new Error("Invalid PDF blob received for download");const s=URL.createObjectURL(e),n=document.createElement("a");n.style&&(n.style.display="none"),n.href=s,n.download=t||"document.pdf",document.body.appendChild(n),n.click(),setTimeout(()=>{try{n.parentNode&&n.parentNode.removeChild(n),URL.revokeObjectURL(s)}catch{}},4e3)}function gs(e,t={}){const s=t.pageWidth||612,n=t.pageHeight||792,o=e.length,a=[];let i=0;function l(){return++i}const r=l(),f=l(),u=[];for(let T=0;T<o;T++)u.push(l());const d={F1:l(),F2:l(),F3:l(),F4:l(),F5:l(),F6:l()},c=[];for(let T=0;T<o;T++)c.push(l());a[r]=`<< /Type /Catalog /Pages ${f} 0 R >>`,a[f]=`<< /Type /Pages /Kids [${u.map(T=>`${T} 0 R`).join(" ")}] /Count ${o} >>`,a[d.F1]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",a[d.F2]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",a[d.F3]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>",a[d.F4]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>",a[d.F5]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Oblique /Encoding /WinAnsiEncoding >>",a[d.F6]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>";const m=`<< /F1 ${d.F1} 0 R /F2 ${d.F2} 0 R /F3 ${d.F3} 0 R /F4 ${d.F4} 0 R /F5 ${d.F5} 0 R /F6 ${d.F6} 0 R >>`,b=new TextEncoder;for(let T=0;T<o;T++){a[u[T]]=`<< /Type /Page /Parent ${f} 0 R /MediaBox [0 0 ${s} ${n}] /Contents ${c[T]} 0 R /Resources << /Font ${m} >> >>`;const de=e[T]||{};let se="";if(de.vectors&&de.vectors.length)for(const J of de.vectors)J.type==="rect"?(J.fill&&(se+=`${J.fill[0].toFixed(3)} ${J.fill[1].toFixed(3)} ${J.fill[2].toFixed(3)} rg
`,se+=`${J.x.toFixed(2)} ${J.y.toFixed(2)} ${J.w.toFixed(2)} ${J.h.toFixed(2)} re
f
`),J.stroke&&(se+=`${J.stroke[0].toFixed(3)} ${J.stroke[1].toFixed(3)} ${J.stroke[2].toFixed(3)} RG
`,se+=`${(J.lineWidth||1).toFixed(2)} w
`,se+=`${J.x.toFixed(2)} ${J.y.toFixed(2)} ${J.w.toFixed(2)} ${J.h.toFixed(2)} re
S
`)):J.type==="line"&&(se+=`${(J.stroke||[0,0,0])[0].toFixed(3)} ${(J.stroke||[0,0,0])[1].toFixed(3)} ${(J.stroke||[0,0,0])[2].toFixed(3)} RG
`,se+=`${(J.lineWidth||1).toFixed(2)} w
`,se+=`${J.x1.toFixed(2)} ${J.y1.toFixed(2)} m ${J.x2.toFixed(2)} ${J.y2.toFixed(2)} l S
`);if(de.texts&&de.texts.length)for(const J of de.texts){const ke=J.font||"F1",be=J.size||10,ee=J.color||[.1,.1,.1],pe=za(J.text);se+=`BT
`,se+=`/${ke} ${be} Tf
`,se+=`${ee[0].toFixed(3)} ${ee[1].toFixed(3)} ${ee[2].toFixed(3)} rg
`,se+=`1 0 0 1 ${J.x.toFixed(2)} ${J.y.toFixed(2)} Tm
`,se+=`(${pe}) Tj
`,se+=`ET
`}const ge=b.encode(se);a[c[T]]=`<< /Length ${ge.length} >>
stream
${se}endstream`}const g=b.encode(`%PDF-1.4
%âãÏÓ
`);let v=g.length;const P=[],B=[];for(let T=1;T<=i;T++){P[T]=v;const de=`${T} 0 obj
${a[T]}
endobj
`,se=b.encode(de);B.push(se),v+=se.length}const L=v;let k=`xref
0 ${i+1}
0000000000 65535 f 
`;for(let T=1;T<=i;T++)k+=`${String(P[T]).padStart(10,"0")} 00000 n 
`;k+=`trailer
<< /Size ${i+1} /Root ${r} 0 R >>
startxref
${L}
%%EOF`;const U=b.encode(k);return new Blob([g,...B,U],{type:"application/pdf"})}function ua(e={},t={}){const s=t.title||"Chronicles of Dust",n=t.company||"SCRIPTORA PRODUCTION STUDIO",o=t.draft||"Draft 4.2 (Pinned)",a=String(e.callSheetNumber||"01").padStart(2,"0"),i=e.shootDay||`Day ${parseInt(a,10)||1} of 14`,l=e.status==="Confirmed"||e.isPublished,r=[];let f=[],u=[];const d=36,c=576,m=540,b=56;function h(ue=!1){if(f=[],u=[],r.push({vectors:f,texts:u}),ue){f.push({type:"rect",x:d,y:730,w:m,h:26,fill:[.08,.12,.2]}),u.push({text:"SCRIPTORA -- OFFICIAL CALL SHEET (CONTINUED)",x:d+10,y:739,font:"F2",size:9,color:[.95,.95,.95]});const Pe=`${s.toUpperCase()} · ${i.toUpperCase()}`;return u.push({text:Pe,x:c-10-At(Pe,8,"F1"),y:739,font:"F1",size:8,color:[.7,.82,1]}),718}return 756}let g=h(!1);const v=44;f.push({type:"rect",x:d,y:g-v,w:m,h:v,fill:[.08,.12,.2]}),u.push({text:"SCRIPTORA -- OFFICIAL PRODUCTION CALL SHEET",x:d+12,y:g-17,font:"F2",size:10,color:[.96,.97,.98]});const P=ot(`${n.toUpperCase()} · ${s.toUpperCase()} · ${o}`,320,8.5,"F1");u.push({text:P,x:d+12,y:g-32,font:"F1",size:8.5,color:[.65,.78,.98]});const B=`DAY ${a} CALL SHEET`;u.push({text:B,x:c-12-At(B,11,"F2"),y:g-17,font:"F2",size:11,color:[1,1,1]});const L=l?"OFFICIAL PUBLISHED SNAPSHOT":"WORKING REVISION DRAFT",k=l?[.45,.9,.55]:[1,.82,.35];u.push({text:L,x:c-12-At(L,7.5,"F2"),y:g-32,font:"F2",size:7.5,color:k}),g-=v+8;const U=52;f.push({type:"rect",x:d,y:g-U,w:m,h:U,fill:[.975,.985,.995],stroke:[.82,.86,.91],lineWidth:.8});const T=135,de=g-14,se=g-29,ge=g-43;u.push({text:"DATE & DAY",x:d+10,y:de,font:"F2",size:7.5,color:[.42,.47,.55]}),u.push({text:ot(e.shootDate||"Saturday, Oct 24, 2026",118,9.5,"F2"),x:d+10,y:se,font:"F2",size:9.5,color:[.1,.12,.16]}),u.push({text:ot(i,118,7.5,"F1"),x:d+10,y:ge,font:"F1",size:7.5,color:[.42,.47,.55]}),f.push({type:"line",x1:d+T,y1:g-46,x2:d+T,y2:g-6,stroke:[.85,.88,.92],lineWidth:.6});const J=d+T+10;u.push({text:"GENERAL CREW CALL",x:J,y:de,font:"F2",size:7.5,color:[.42,.47,.55]}),u.push({text:ot(e.generalCrewCall||"06:00 AM",118,11.5,"F2"),x:J,y:se,font:"F2",size:11.5,color:[.1,.12,.16]}),u.push({text:ot(`Breakfast: ${e.breakfastTime||"05:15 AM"}`,118,7.5,"F1"),x:J,y:ge,font:"F1",size:7.5,color:[.42,.47,.55]}),f.push({type:"line",x1:d+T*2,y1:g-46,x2:d+T*2,y2:g-6,stroke:[.85,.88,.92],lineWidth:.6});const ke=d+T*2+10;u.push({text:"SHOOTING CALL",x:ke,y:de,font:"F2",size:7.5,color:[.1,.38,.85]}),u.push({text:ot(e.shootingCall||"06:30 AM",118,11.5,"F2"),x:ke,y:se,font:"F2",size:11.5,color:[.1,.38,.85]}),u.push({text:"First Shot on Set",x:ke,y:ge,font:"F1",size:7.5,color:[.42,.47,.55]}),f.push({type:"line",x1:d+T*3,y1:g-46,x2:d+T*3,y2:g-6,stroke:[.85,.88,.92],lineWidth:.6});const be=d+T*3+10;u.push({text:"ESTIMATED WRAP",x:be,y:de,font:"F2",size:7.5,color:[.42,.47,.55]}),u.push({text:ot(e.estimatedWrap||"06:30 PM",118,11.5,"F2"),x:be,y:se,font:"F2",size:11.5,color:[.1,.12,.16]}),u.push({text:"12-Hr Rest Turnaround",x:be,y:ge,font:"F1",size:7.5,color:[.42,.47,.55]}),g-=U+8;const ee=62;f.push({type:"rect",x:d,y:g-ee,w:m,h:ee,fill:[1,1,1],stroke:[.82,.86,.91],lineWidth:.8});const pe=d+10;u.push({text:"SET LOCATION & BASECAMP ACCESS:",x:pe,y:g-13,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:ot(e.locationName||"Mojave Outpost Gate 4",280,8.5,"F2"),x:pe,y:g-25,font:"F2",size:8.5,color:[.1,.12,.16]}),u.push({text:ot(e.locationAddress||"Perimeter Road 9, Cantil, CA",280,7.5,"F1"),x:pe,y:g-37,font:"F1",size:7.5,color:[.35,.4,.48]}),u.push({text:ot(`Parking: ${e.parkingNotes||"Basecamp Lot B. Crew shuttle runs every 10 mins."}`,280,7,"F1"),x:pe,y:g-49,font:"F1",size:7,color:[.45,.5,.58]}),f.push({type:"line",x1:d+300,y1:g-56,x2:d+300,y2:g-6,stroke:[.85,.88,.92],lineWidth:.6});const Z=d+310;u.push({text:"EMERGENCY MEDICAL / NEAREST HOSPITAL:",x:Z,y:g-13,font:"F2",size:7.5,color:[.85,.15,.15]});const ve=Bs(e.nearestHospital||"Desert Care Regional Medical Center (Ph: 760-379-2681)",220,7,"F1");u.push({text:ot(ve[0]||"Local Emergency Center",220,7,"F1"),x:Z,y:g-24,font:"F1",size:7,color:[.15,.15,.15]}),ve[1]&&u.push({text:ot(ve[1],220,7,"F1"),x:Z,y:g-34,font:"F1",size:7,color:[.15,.15,.15]});const C=ot(`Weather: ${e.weatherSummary||"Clear skies, normal stage ambient temperature."}`,220,7,"F1");u.push({text:C,x:Z,y:g-49,font:"F1",size:7,color:[.2,.4,.65]}),g-=ee+10;const G=e.scenes&&e.scenes.length>0?e.scenes:[{sceneNumber:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",pages:"4 1/8",cast:["KEVIN","MARCUS"],desc:"Kevin arrives at border gate, inspection with Marcus."},{sceneNumber:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",pages:"3 4/8",cast:["KEVIN","MEERA"],desc:"Kevin discovers pressure loss on telemetry terminal."}];function $e(){f.push({type:"rect",x:d,y:g-17,w:m,h:17,fill:[.91,.93,.96],stroke:[.78,.82,.88],lineWidth:.8}),u.push({text:"SCENE #",x:d+6,y:g-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"SET & SCENE DESCRIPTION",x:d+56,y:g-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"D/N",x:d+325,y:g-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"PAGES",x:d+368,y:g-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"CAST CHARACTERS",x:d+418,y:g-12,font:"F2",size:7.5,color:[.25,.3,.38]}),g-=17}u.push({text:"SCHEDULED SCENES TO SHOOT",x:d,y:g,font:"F2",size:9.5,color:[.1,.15,.22]});const ne=`${G.length} Scenes Scheduled`;u.push({text:ne,x:c-At(ne,8,"F1"),y:g,font:"F1",size:8,color:[.45,.5,.58]}),g-=12,$e(),G.forEach((ue,qe)=>{const ze=Bs(ue.heading||`SCENE ${ue.sceneNumber}`,260,8,"F2"),Pe=Bs(ue.desc||"",260,7,"F1"),z=Array.isArray(ue.cast)?ue.cast:ue.cast?[ue.cast]:[],I=Bs(z.join(", "),116,7.5,"F2"),F=Math.max(ze.length*10+Pe.length*9,I.length*9.5,12),Y=Math.max(22,8+F);g-Y<b&&(g=h(!0),$e()),f.push({type:"rect",x:d,y:g-Y,w:m,h:Y,fill:qe%2===0?[1,1,1]:[.985,.988,.995],stroke:[.86,.89,.93],lineWidth:.5}),u.push({text:`Sc. ${ue.sceneNumber}`,x:d+6,y:g-13,font:"F2",size:8.5,color:[.1,.35,.85]});let W=g-10;ze.forEach(me=>{u.push({text:me,x:d+56,y:W,font:"F2",size:8,color:[.1,.12,.15]}),W-=10}),Pe.forEach(me=>{u.push({text:me,x:d+56,y:W,font:"F1",size:7,color:[.4,.45,.52]}),W-=9});const te=ue.heading?.toUpperCase().includes("NIGHT")?"NIGHT":"DAY";u.push({text:te,x:d+325,y:g-13,font:"F1",size:7.5,color:te==="NIGHT"?[.1,.15,.45]:[.8,.45,.1]}),u.push({text:ue.pages||"1.0",x:d+368,y:g-13,font:"F2",size:7.5,color:[.2,.2,.2]});let he=g-11;I.forEach(me=>{u.push({text:me,x:d+418,y:he,font:"F2",size:7.5,color:[.15,.2,.25]}),he-=9.5}),g-=Y}),g-=10;const xe=e.castCalls&&e.castCalls.length>0?e.castCalls:[{character:"KEVIN",actor:"Dev Patel",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MARCUS",actor:"David Chen",pickup:"05:15 AM",hmuCall:"05:45 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MEERA",actor:"Zoe Saldana",pickup:"08:30 AM",hmuCall:"09:00 AM",onSet:"10:30 AM",status:"Confirmed"}];function A(){f.push({type:"rect",x:d,y:g-17,w:m,h:17,fill:[.91,.93,.96],stroke:[.78,.82,.88],lineWidth:.8}),u.push({text:"ID",x:d+6,y:g-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"CHARACTER",x:d+32,y:g-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"ACTOR / TALENT",x:d+140,y:g-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"STATUS",x:d+270,y:g-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"PICKUP",x:d+346,y:g-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"H/MU CALL",x:d+406,y:g-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"ON SET CALL",x:d+472,y:g-12,font:"F2",size:7.5,color:[.25,.3,.38]}),g-=17}g-48<b&&(g=h(!0)),u.push({text:"CAST & TALENT CALL SCHEDULE",x:d,y:g,font:"F2",size:9.5,color:[.1,.15,.22]});const ye=`${xe.length} Talent Booked`;u.push({text:ye,x:c-At(ye,8,"F1"),y:g,font:"F1",size:8,color:[.45,.5,.58]}),g-=12,A(),xe.forEach((ue,qe)=>{g-19<b&&(g=h(!0),A()),f.push({type:"rect",x:d,y:g-19,w:m,h:19,fill:qe%2===0?[1,1,1]:[.985,.988,.995],stroke:[.86,.89,.93],lineWidth:.5}),u.push({text:String(qe+1),x:d+6,y:g-13,font:"F1",size:7.5,color:[.5,.5,.5]}),u.push({text:ot(ue.character||"CHARACTER",100,8,"F2"),x:d+32,y:g-13,font:"F2",size:8,color:[.1,.12,.16]}),u.push({text:ot(ue.actor||"TBD",120,8,"F1"),x:d+140,y:g-13,font:"F1",size:8,color:[.2,.22,.26]});const Pe=(ue.status||"").toLowerCase().includes("conf");u.push({text:ot(ue.status||"Confirmed",68,7.5,"F2"),x:d+270,y:g-13,font:"F2",size:7.5,color:Pe?[.12,.55,.25]:[.85,.55,.1]}),u.push({text:ue.pickup||"-",x:d+346,y:g-13,font:"F3",size:7.5,color:[.35,.35,.35]}),u.push({text:ue.hmuCall||"-",x:d+406,y:g-13,font:"F3",size:7.5,color:[.35,.35,.35]}),u.push({text:ue.onSet||"-",x:d+472,y:g-13,font:"F2",size:8.5,color:[.1,.35,.85]}),g-=19}),g-=10;const Fe=e.specialInstructions||"Standard studio health & safety protocols in effect. All crew must report any hazards or equipment anomalies immediately to the 1st AD or Health & Safety Supervisor.",Te=Bs(Fe,516,7.5,"F1"),ie=Math.max(38,18+Te.length*10+6);g-ie<b&&(g=h(!0)),f.push({type:"rect",x:d,y:g-ie,w:m,h:ie,fill:[.995,.985,.93],stroke:[.9,.82,.65],lineWidth:.8}),u.push({text:"[SAFETY & PRODUCTION DIRECTIVE] SPECIAL INSTRUCTIONS:",x:d+10,y:g-13,font:"F2",size:7.5,color:[.6,.38,.05]});let ce=g-25;Te.forEach(ue=>{u.push({text:ue,x:d+10,y:ce,font:"F1",size:7.5,color:[.3,.25,.15]}),ce-=10}),g-=ie+8;const _=34;if(g-_>=b){f.push({type:"rect",x:d,y:g-_,w:m,h:_,fill:[.965,.975,.988],stroke:[.84,.87,.92],lineWidth:.6}),u.push({text:"DIRECTING & SET OPS",x:d+10,y:g-12,font:"F2",size:7,color:[.25,.3,.38]}),u.push({text:`1st AD: Ready on Set ${e.shootingCall||"06:30 AM"} · Radio: Ch 1`,x:d+10,y:g-24,font:"F1",size:7,color:[.35,.4,.48]}),u.push({text:"CAMERA & SOUND TECH",x:d+195,y:g-12,font:"F2",size:7,color:[.25,.3,.38]}),u.push({text:`DP / Cam: ${e.generalCrewCall||"06:00 AM"} · Radio: Ch 2 | Sound: Ch 3`,x:d+195,y:g-24,font:"F1",size:7,color:[.35,.4,.48]}),u.push({text:"LOGISTICS & SIGN-OFF",x:d+375,y:g-12,font:"F2",size:7,color:[.25,.3,.38]});const ue=ot(`Approved: ${e.approvedBy||"Production Office"} · Ch 4`,160,7,"F1");u.push({text:ue,x:d+375,y:g-24,font:"F1",size:7,color:[.35,.4,.48]}),g-=_+6}const Ae=r.length;r.forEach((ue,qe)=>{ue.vectors.push({type:"line",x1:d,y1:44,x2:c,y2:44,stroke:[.8,.83,.88],lineWidth:.7}),ue.texts.push({text:"CONFIDENTIAL -- SCRIPTORA PRODUCTION STUDIO -- NOT FOR PUBLIC DISTRIBUTION",x:d,y:32,font:"F1",size:7,color:[.45,.48,.52]});const ze=e.shootDate||"Production Call Sheet";ue.texts.push({text:ze,x:306-At(ze,7,"F1")/2,y:32,font:"F1",size:7,color:[.55,.58,.62]});const Pe=`Page ${qe+1} of ${Ae}`;ue.texts.push({text:Pe,x:c-At(Pe,7.5,"F2"),y:32,font:"F2",size:7.5,color:[.3,.35,.4]})});const Me=gs(r),oe=s.replace(/[^a-zA-Z0-9]/g,"_"),je=`CallSheet_Day${a}_${oe}.pdf`;return xs(Me,je),Me}function li(e="CHARACTER",t=[],s={}){const n=s.title||"Chronicles of Dust",o=s.draft||"Draft 4.2",a=[],i=38,l=[];let r=[],f=0;for(const c of t){const m=c.dialogue||c.text||"",b=ms(m,46),h=4+b.length;f+h>i&&r.length>0&&(l.push(r),r=[],f=0),r.push({...c,speechLines:b}),f+=h}r.length>0&&l.push(r),l.length===0&&l.push([]);for(let c=0;c<l.length;c++){const m=l[c],b=[],h=[];b.push({type:"line",x1:54,y1:746,x2:558,y2:746,stroke:[.2,.2,.2],lineWidth:1.2}),h.push({text:"SCRIPTORA -- CHARACTER DIALOGUE SHEET",x:54,y:755,font:"F4",size:9,color:[.3,.3,.3]}),h.push({text:`PAGE ${c+1} OF ${l.length}`,x:490,y:755,font:"F4",size:9,color:[.3,.3,.3]}),h.push({text:`${e.toUpperCase()} -- ALL DIALOGUE CUES`,x:54,y:730,font:"F4",size:12,color:[0,0,0]}),h.push({text:`Screenplay: ${n} (${o}) -- Pinned Baseline`,x:54,y:716,font:"F3",size:9,color:[.4,.4,.4]});let g=680;for(const v of m){const P=v.sceneNum||v.sceneNumber||1,B=v.heading||`SCENE ${P}`;if(h.push({text:`SCENE ${P} -- ${B}`,x:54,y:g,font:"F4",size:9,color:[.1,.3,.7]}),g-=14,v.action){const T=ms(v.action,65);for(const de of T)h.push({text:de,x:54,y:g,font:"F5",size:8.5,color:[.4,.4,.4]}),g-=11}const L=v.character||e||"CHARACTER",k=L.length*6.5;if(h.push({text:L,x:Math.max(160,306-k/2),y:g,font:"F4",size:10,color:[0,0,0]}),g-=12,v.parenthetical){const T=v.parenthetical.length*5.5;h.push({text:v.parenthetical,x:Math.max(160,306-T/2),y:g,font:"F5",size:9,color:[.3,.3,.3]}),g-=12}const U=v.speechLines||ms(v.dialogue||v.text||"",46);for(const T of U)h.push({text:T,x:170,y:g,font:"F3",size:10,color:[0,0,0]}),g-=13;g-=12}b.push({type:"line",x1:54,y1:50,x2:558,y2:50,stroke:[.8,.8,.8],lineWidth:.8}),h.push({text:`SCRIPTORA SCREENPLAY ARCHITECTURE -- ${e.toUpperCase()} -- DRAFT 4.2`,x:54,y:38,font:"F3",size:8,color:[.5,.5,.5]}),h.push({text:`Page ${c+1} of ${l.length}`,x:495,y:38,font:"F3",size:8,color:[.5,.5,.5]}),a.push({vectors:b,texts:h})}const u=gs(a),d=`DialogueSheet_${e.replace(/\s+/g,"_")}_${n.replace(/\s+/g,"_")}.pdf`;return xs(u,d),u}function ii(e=1,t=[],s={},n={}){s&&s.title&&!n.title&&(n=s);const o=n.title||"Chronicles of Dust",a=n.draft||"Draft 4.2",i=s.heading||t[0]?.heading||`SCENE ${e} - DAY`,l=[],r=[],f=[];r.push({type:"rect",x:54,y:730,w:504,h:32,fill:[.1,.1,.1]}),f.push({text:"SCRIPTORA -- REHEARSAL & ON-SET SIDES",x:64,y:748,font:"F4",size:9,color:[.8,.8,.8]}),f.push({text:`SCENE ${e} SIDES`,x:460,y:748,font:"F4",size:10,color:[1,1,1]}),f.push({text:`${o.toUpperCase()} -- SCENE ${e}`,x:54,y:712,font:"F4",size:13,color:[0,0,0]}),f.push({text:`${i} -- ${a}`,x:54,y:698,font:"F3",size:9,color:[.4,.4,.4]}),r.push({type:"line",x1:54,y1:686,x2:558,y2:686,stroke:[.2,.2,.2],lineWidth:1});let u=665;f.push({text:i,x:54,y:u,font:"F4",size:10,color:[0,0,0]}),u-=18;for(const m of t){if(m.action){const h=ms(m.action,65);for(const g of h)f.push({text:g,x:54,y:u,font:"F5",size:9.5,color:[.2,.2,.2]}),u-=13;u-=4}if(m.character){const h=m.character.length*6.5;f.push({text:m.character,x:Math.max(160,306-h/2),y:u,font:"F4",size:10,color:[0,0,0]}),u-=13}if(m.parenthetical){const h=m.parenthetical.length*5.5;f.push({text:m.parenthetical,x:Math.max(160,306-h/2),y:u,font:"F5",size:9,color:[.3,.3,.3]}),u-=12}const b=m.dialogue||m.text||"";if(b){const h=ms(b,46);for(const g of h)f.push({text:g,x:170,y:u,font:"F3",size:10,color:[0,0,0]}),u-=13}u-=10}r.push({type:"rect",x:180,y:u-15,w:252,h:20,fill:[.95,.95,.95],stroke:[.7,.7,.7],lineWidth:.8}),f.push({text:`END OF SCENE ${e} SIDES -- STAMPED DRAFT 4.2`,x:195,y:u-3,font:"F4",size:7.5,color:[.3,.3,.3]}),r.push({type:"line",x1:54,y1:50,x2:558,y2:50,stroke:[.8,.8,.8],lineWidth:.8}),f.push({text:"SCRIPTORA REHEARSAL COPY -- OFFICIAL PRODUCTION SIDES",x:54,y:38,font:"F3",size:8,color:[.5,.5,.5]}),f.push({text:"Page 1 of 1",x:505,y:38,font:"F3",size:8,color:[.5,.5,.5]}),l.push({vectors:r,texts:f});const d=gs(l),c=`ActorSides_Scene${e}_${o.replace(/\s+/g,"_")}.pdf`;return xs(d,c),d}function Va(e=[],t={}){const s=t.title||"Chronicles of Dust",n=t.draft||"Draft 4.2",o=[],a=18,i=e.length,l=Math.ceil(i/a)||1;for(let u=0;u<l;u++){const d=[],c=[],m=e.slice(u*a,(u+1)*a);d.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),c.push({text:"SCRIPTORA -- SCRIPT BREAKDOWN MASTER REPORT",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),c.push({text:`${s.toUpperCase()} (${n}) -- ${i} ELEMENTS TAGGED`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),c.push({text:`PAGE ${u+1} OF ${l}`,x:505,y:747,font:"F2",size:9,color:[1,1,1]});let b=705;d.push({type:"rect",x:36,y:b,w:540,h:18,fill:[.93,.94,.96],stroke:[.8,.83,.88],lineWidth:.8}),c.push({text:"CATEGORY",x:42,y:b+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"ELEMENT NAME",x:120,y:b+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"SCENES",x:270,y:b+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"STATUS",x:330,y:b+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"DETAILS / SOURCING SPECIFICATION",x:400,y:b+5,font:"F2",size:8,color:[.3,.35,.4]}),b-=22;for(const h of m){d.push({type:"rect",x:36,y:b,w:540,h:22,fill:[1,1,1],stroke:[.88,.9,.93],lineWidth:.5}),c.push({text:h.category||"Props",x:42,y:b+7,font:"F2",size:8,color:[.1,.3,.8]}),c.push({text:(h.name||"").slice(0,32),x:120,y:b+7,font:"F2",size:8.5,color:[.1,.1,.1]}),c.push({text:(h.scenes||[h.sceneNumber||18]).map(v=>`#${v}`).join(", "),x:270,y:b+7,font:"F3",size:8,color:[.4,.4,.4]}),c.push({text:h.status||"Confirmed",x:330,y:b+7,font:"F1",size:8,color:h.status==="Confirmed"?[.1,.6,.2]:[.8,.4,.1]});const g=h.assignedActor||h.sourcingType||h.description||h.notes||"Ready";c.push({text:g.slice(0,36),x:400,y:b+7,font:"F1",size:7.5,color:[.3,.3,.3]}),b-=22}d.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),c.push({text:"SCRIPTORA MASTER PRODUCTION BREAKDOWN -- IMMUTABLE SNAPSHOT",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),c.push({text:`Page ${u+1} of ${l}`,x:510,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),o.push({vectors:d,texts:c})}const r=gs(o),f=`ScriptBreakdown_${s.replace(/\s+/g,"_")}.pdf`;return xs(r,f),r}function ri(e=[],t=[],s={}){const n=s.title||"Chronicles of Dust",o=s.draft||"Draft 4.2",a=[],i=[],l=[];i.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),l.push({text:"SCRIPTORA -- MASTER SHOOTING SCHEDULE",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),l.push({text:`${n.toUpperCase()} (${o}) -- ${e.length} SHOOT DAYS`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),l.push({text:"PAGE 1 OF 1",x:515,y:747,font:"F2",size:9,color:[1,1,1]});let r=705;i.push({type:"rect",x:36,y:r,w:540,h:18,fill:[.93,.94,.96],stroke:[.8,.83,.88],lineWidth:.8}),l.push({text:"DAY #",x:42,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"DATE",x:80,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"SHOOT LOCATION / STAGE",x:155,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"SCENES",x:340,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"PAGES",x:430,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"HOURS",x:480,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"STATUS",x:530,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),r-=26;for(const d of e){i.push({type:"rect",x:36,y:r,w:540,h:26,fill:[1,1,1],stroke:[.88,.9,.93],lineWidth:.5}),l.push({text:`D${d.dayNumber}`,x:42,y:r+9,font:"F2",size:9,color:[.1,.1,.1]}),l.push({text:d.date||"",x:80,y:r+9,font:"F1",size:8,color:[.3,.3,.3]}),l.push({text:d.location||"Location TBD",x:155,y:r+13,font:"F2",size:8.5,color:[.1,.1,.1]}),l.push({text:d.title||"",x:155,y:r+3,font:"F1",size:7.5,color:[.5,.5,.5]});const c=(d.sceneNumbers||[]).map(m=>`Sc ${m}`).join(", ")||"None";l.push({text:c,x:340,y:r+9,font:"F4",size:8.5,color:[.1,.3,.8]}),l.push({text:d.totalPages||"0 0/8",x:430,y:r+9,font:"F3",size:8,color:[.3,.3,.3]}),l.push({text:`${d.estHours||8}h`,x:480,y:r+9,font:"F1",size:8,color:[.4,.4,.4]}),l.push({text:d.status||"Draft",x:530,y:r+9,font:"F1",size:7.5,color:d.status==="Confirmed"?[.1,.6,.2]:[.4,.4,.4]}),r-=26}i.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),l.push({text:"SCRIPTORA MASTER STRIPBOARD SCHEDULE -- OWNER CONFIRMED BASELINE",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),l.push({text:"Page 1 of 1",x:525,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),a.push({vectors:i,texts:l});const f=gs(a),u=`ShootingSchedule_${n.replace(/\s+/g,"_")}.pdf`;return xs(f,u),f}function ci(e=[],t={}){const s=e&&typeof e=="object"&&!Array.isArray(e),n=s?e:null,o=s?n.shots||[]:Array.isArray(e)?e:[],a=t.title||n?.screenplayTitle||"Chronicles of Dust",i=t.draft||t.sourceVersion||n?.sourceVersion||"Draft 4.2",l=t.heading||n?.sceneHeading||o[0]?.sceneHeading||"SCENE 1 - EXT. MOJAVE OUTPOST GATE 4 - DAY",r=n?.sceneNumber||o[0]?.sceneNumber||o[0]?.sceneNum||1,f=[{shotNumber:"1A",title:"Perimeter Outpost Gate",shotSize:"Wide Shot",cameraAngle:"High Angle",focalLength:"24mm Wide",aspectRatio:"2.39:1",lightingMood:"Daylight Dust",description:"High altitude drone descending across dust devils toward Kevin's arrival at the arid customs gate.",approvalStatus:"approved",directorNotes:"Capture sunrise glint off the guard gate perimeter wires."},{shotNumber:"1B",title:"Gate Scanner Clearance Standoff",shotSize:"Medium Two-Shot",cameraAngle:"Eye Level",focalLength:"50mm Prime",aspectRatio:"2.39:1",lightingMood:"Harsh Fluorescent Rim",description:"Kevin presents his ID badge to Marcus over the buzzing clearance terminal.",approvalStatus:"approved",directorNotes:"Focus pull from scanner terminal to Kevin's tense expression."},{shotNumber:"1C",title:"Terminal Diagnostic Anomaly",shotSize:"Close-Up",cameraAngle:"Low Angle",focalLength:"85mm Portrait",aspectRatio:"2.39:1",lightingMood:"Cyan Strobe",description:"Close-up insert of the flickering scanner console displaying pressure alert warning in red neon.",approvalStatus:"proposed",directorNotes:"Practical screen insert with pulsing alarm strobe."}],u=o&&o.length>0?o:f,d=3,c=Math.ceil(u.length/d)||1,m=[];for(let v=0;v<c;v++){const P=[],B=[],L=u.slice(v*d,(v+1)*d);P.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),B.push({text:"SCRIPTORA -- STORYBOARD STUDIO SHOT COMPOSITION",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),B.push({text:`${a.toUpperCase()} (${i}) -- ${za(l).toUpperCase()}`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),B.push({text:`PAGE ${v+1} OF ${c}`,x:505,y:747,font:"F2",size:9,color:[1,1,1]});let k=575;for(const U of L){const T=U.shotNumber||U.shotNum||`${r}A`,de=U.title||`Shot ${T}`,se=U.focalLength||U.lens||"50mm Prime",ge=U.aspectRatio||"2.39:1",J=`${U.shotSize||"Medium Shot"} / ${U.cameraAngle||"Eye Level"}`,ke=(U.approvalStatus||"Draft").toUpperCase(),be=ke==="APPROVED"?[.1,.6,.2]:ke==="PROPOSED"?[.8,.5,.1]:[.4,.45,.5];P.push({type:"rect",x:36,y:k,w:540,h:140,fill:[1,1,1],stroke:[.85,.88,.92],lineWidth:.8}),P.push({type:"rect",x:46,y:k+15,w:200,h:110,fill:[.08,.1,.15],stroke:[.25,.3,.38],lineWidth:1}),P.push({type:"line",x1:112,y1:k+15,x2:112,y2:k+125,stroke:[.2,.25,.32],lineWidth:.4}),P.push({type:"line",x1:178,y1:k+15,x2:178,y2:k+125,stroke:[.2,.25,.32],lineWidth:.4}),P.push({type:"line",x1:46,y1:k+52,x2:246,y2:k+52,stroke:[.2,.25,.32],lineWidth:.4}),P.push({type:"line",x1:46,y1:k+88,x2:246,y2:k+88,stroke:[.2,.25,.32],lineWidth:.4}),P.push({type:"line",x1:141,y1:k+70,x2:151,y2:k+70,stroke:[.4,.6,.8],lineWidth:.8}),P.push({type:"line",x1:146,y1:k+65,x2:146,y2:k+75,stroke:[.4,.6,.8],lineWidth:.8}),P.push({type:"line",x1:52,y1:k+119,x2:58,y2:k+119,stroke:[.5,.7,.9],lineWidth:.8}),P.push({type:"line",x1:52,y1:k+119,x2:52,y2:k+113,stroke:[.5,.7,.9],lineWidth:.8}),P.push({type:"line",x1:240,y1:k+21,x2:234,y2:k+21,stroke:[.5,.7,.9],lineWidth:.8}),P.push({type:"line",x1:240,y1:k+21,x2:240,y2:k+27,stroke:[.5,.7,.9],lineWidth:.8}),B.push({text:`REC * SHOT ${T}`,x:52,y:k+110,font:"F4",size:7.5,color:[1,1,1]}),B.push({text:`${ge} * ${se}`,x:52,y:k+23,font:"F3",size:7,color:[.7,.8,.9]}),B.push({text:`SHOT ${T} -- SCENE ${r}`,x:260,y:k+115,font:"F2",size:9.5,color:[.1,.3,.8]}),P.push({type:"rect",x:480,y:k+112,w:86,h:16,fill:[.95,.96,.98],stroke:be,lineWidth:.7}),B.push({text:ke,x:486,y:k+117,font:"F2",size:7,color:be}),B.push({text:de.slice(0,38),x:260,y:k+100,font:"F2",size:10.5,color:[.08,.1,.12]}),B.push({text:`Camera: ${J} * ${se} (${ge})`,x:260,y:k+86,font:"F1",size:8,color:[.35,.4,.45]});const ee=ms(U.description||"",48);let pe=k+72;for(let ve=0;ve<Math.min(ee.length,3);ve++)B.push({text:ee[ve],x:260,y:pe,font:"F1",size:8,color:[.18,.22,.26]}),pe-=11;const Z=U.directorNotes||U.continuity?.lightingContinuity||U.continuity?.eyeline||"";Z&&B.push({text:`Note: ${Z.slice(0,52)}`,x:260,y:k+25,font:"F5",size:7.5,color:[.45,.48,.52]}),k-=150}P.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),B.push({text:"SCRIPTORA STORYBOARD STUDIO -- OFFICIAL CAMERA & CONCEPT COMPOSITION",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),B.push({text:`Page ${v+1} of ${c}`,x:510,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),m.push({vectors:P,texts:B})}const b=gs(m),h=l.replace(/[^a-zA-Z0-9]+/g,"_").slice(0,30),g=`Storyboard_${a.replace(/\s+/g,"_")}_${h}.pdf`;return xs(b,g),b}const di={Cast:{icon:"person"},Locations:{icon:"location_on"},Props:{icon:"inventory_2"},"Practical FX":{icon:"science"},Stunts:{icon:"sports_kabaddi"},Costumes:{icon:"checkroom"},Vehicles:{icon:"commute"},Sound:{icon:"music_note"},"Hair & Makeup":{icon:"face"}};function pi(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||$.state.selectedScriptId;const n=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${dt("Pre-Production","Script Breakdown Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Hs("Script Breakdown","dataset",n||"/production",`
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

      ${it("production")}

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
  `}async function ui(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust";let a=n.get("category")||"all",i=n.get("scene")||"all",l=n.get("character")||n.get("search")||"",r=null;const f=document.getElementById("breakdown-scene-select");f&&i!=="all"&&(f.value=i.startsWith("scene-")?i:`scene-${i}`),a!=="all"&&document.querySelectorAll(".cat-btn").forEach(C=>{C.getAttribute("data-cat")===a?(C.classList.add("bg-blue-600","text-white","shadow-2xs"),C.classList.remove("bg-slate-100","text-slate-700")):(C.classList.remove("bg-blue-600","text-white","shadow-2xs"),C.classList.add("bg-slate-100","text-slate-700"))});const u=document.getElementById("breakdown-search");u&&l&&(u.value=l);const d=C=>{const G=C.category;if(G==="Cast"){const $e=!C.assignedActor||C.assignedActor.toLowerCase().includes("unassigned")||C.assignedActor.toLowerCase().includes("open"),ne=C.castingStatus==="Confirmed Cast"?"bg-emerald-50 text-emerald-700 border-emerald-200":C.castingStatus==="Offer Out"?"bg-sky-50 text-sky-700 border-sky-200":"bg-amber-50 text-amber-700 border-amber-200";return`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Actor</span>
            <div class="font-semibold text-slate-900 mt-0.5">
              ${$e?'<span class="text-amber-700 italic">Unassigned (Open Role)</span>':`<span class="text-indigo-700 font-bold">${C.assignedActor}</span>`}
            </div>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Casting Status</span>
            <span class="inline-block mt-0.5 px-2 py-0.5 rounded-lg border text-[11px] font-semibold ${ne}">
              ${C.castingStatus||"Auditioning"}
            </span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Actor Availability</span>
            <div class="text-slate-700 mt-0.5 font-medium truncate" title="${C.actorAvailability||"Not specified"}">
              ${C.actorAvailability||"Not specified"}
            </div>
          </div>
        </div>
      `}return G==="Props"?`
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sourcing</span>
            <span class="font-semibold text-emerald-800 text-[11px]">${C.sourcingType||"Prop House"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quantity</span>
            <span class="font-semibold text-slate-900 text-[11px]">${C.quantity||"1"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Readiness</span>
            <span class="font-semibold text-teal-700 text-[11px]">${C.readinessStatus||"Ready"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Continuity Notes</span>
            <span class="text-slate-600 text-[11px] truncate block" title="${C.continuityNotes||"Standard"}">${C.continuityNotes||"Standard"}</span>
          </div>
        </div>
      `:G==="Practical FX"?`
        <div class="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-purple-50/50 p-2 rounded-xl border border-purple-100">
              <span class="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Required Resources</span>
              <span class="font-semibold text-purple-900 text-[11px]">${C.requiredResources||"Standard FX Kit"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Technical Specs</span>
              <span class="text-slate-800 font-medium text-[11px]">${C.technicalRequirements||"Per department"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prep Status</span>
              <span class="font-semibold text-emerald-700 text-[11px]">${C.prepStatus||"Rigged & Tested"}</span>
            </div>
          </div>
          ${C.safetyNotes?`
            <div class="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-1.5 text-[11px]">
              <span class="material-symbols-outlined text-[15px] text-rose-600 shrink-0 mt-0.5">warning</span>
              <div><strong class="font-semibold">Safety Mandate:</strong> ${C.safetyNotes}</div>
            </div>
          `:""}
        </div>
      `:G==="Stunts"?`
        <div class="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-rose-50/50 p-2 rounded-xl border border-rose-100">
              <span class="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">Safety Planning</span>
              <span class="font-semibold text-rose-900 text-[11px]">${C.safetyPlanningStatus||"Review in Progress"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Qualified Personnel</span>
              <span class="text-slate-800 font-medium text-[11px]">${C.qualifiedPersonnel||"Lead Stunt Performer"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rigging Requirements</span>
              <span class="text-slate-800 font-medium text-[11px]">${C.coordinationRequirements||"Coordinator on set"}</span>
            </div>
          </div>
        </div>
      `:G==="Locations"?`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-amber-50/50 p-2 rounded-xl border border-amber-100">
            <span class="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Context & Lighting</span>
            <span class="font-semibold text-amber-900 text-[11px]">${C.context||"INT."} · ${C.lighting||"DAY"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location Status</span>
            <span class="font-semibold text-emerald-700 text-[11px]">${C.locationStatus||"Permitted & Locked"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Access Details</span>
            <span class="text-slate-700 text-[11px] truncate block" title="${C.accessDetails||"Standard access"}">${C.accessDetails||"Standard access"}</span>
          </div>
        </div>
      `:G==="Costumes"?`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-teal-50/50 p-2 rounded-xl border border-teal-100">
            <span class="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">Character</span>
            <span class="font-semibold text-teal-900 text-[11px]">${C.character||"Cast member"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Continuity Changes</span>
            <span class="text-slate-700 text-[11px] truncate block" title="${C.continuityChanges||"Stage 1"}">${C.continuityChanges||"Stage 1"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prep Status</span>
            <span class="font-semibold text-emerald-700 text-[11px]">${C.prepStatus||"Fitted & Approved"}</span>
          </div>
        </div>
      `:G==="Vehicles"?`
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Availability</span>
            <span class="font-semibold text-slate-900 text-[11px]">${C.availability||"On Set"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Operational Requirements</span>
            <span class="text-slate-700 text-[11px]">${C.operationalRequirements||"Qualified operator"}</span>
          </div>
        </div>
      `:""},c=C=>{const G=C.category,$e=C.scenes&&C.scenes.length>0?C.scenes.join(", "):C.sceneNumber;return`
      <div class="edit-panel mt-3 p-4 bg-slate-50/90 rounded-2xl border-2 border-blue-400/80 shadow-md flex flex-col gap-3 text-xs animate-in fade-in duration-150">
        <div class="flex items-center justify-between border-b border-slate-200 pb-2">
          <div class="flex items-center gap-1.5 font-heading font-bold text-blue-900">
            <span class="material-symbols-outlined text-[18px]">edit</span>
            <span>Edit Production Element: ${C.name}</span>
          </div>
          <span class="text-[10px] text-slate-500 font-medium">Owner Permissions Active</span>
        </div>

        <form class="form-edit-inline flex flex-col gap-3" data-id="${C.id}">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Element Name</label>
              <input type="text" name="name" value="${C.name||""}" required class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Category</label>
              <select name="category" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="Cast" ${G==="Cast"?"selected":""}>Cast & Characters</option>
                <option value="Locations" ${G==="Locations"?"selected":""}>Locations</option>
                <option value="Props" ${G==="Props"?"selected":""}>Props</option>
                <option value="Practical FX" ${G==="Practical FX"?"selected":""}>Practical FX</option>
                <option value="Stunts" ${G==="Stunts"?"selected":""}>Stunts & Action</option>
                <option value="Costumes" ${G==="Costumes"?"selected":""}>Costumes & Wardrobe</option>
                <option value="Vehicles" ${G==="Vehicles"?"selected":""}>Vehicles & Equipment</option>
                <option value="Sound" ${G==="Sound"?"selected":""}>Sound</option>
                <option value="Hair & Makeup" ${G==="Hair & Makeup"?"selected":""}>Hair & Makeup</option>
              </select>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Review Status</label>
              <select name="status" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="Confirmed" ${C.status==="Confirmed"?"selected":""}>Confirmed (Human Approved)</option>
                <option value="Needs Review" ${C.status==="Needs Review"?"selected":""}>Needs Review</option>
                <option value="Rejected" ${C.status==="Rejected"?"selected":""}>Rejected</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Scenes (comma separated)</label>
              <input type="text" name="scenes" value="${$e}" placeholder="e.g. 1, 4, 18" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              <span class="text-[10px] text-slate-400">Links element to multiple scenes simultaneously</span>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Description / Screenplay Context</label>
              <input type="text" name="description" value="${C.description||""}" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <!-- Dynamic Category Fields inside Edit Panel -->
          ${G==="Cast"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Assigned Actor</label>
                <input type="text" name="assignedActor" value="${C.assignedActor||""}" placeholder="e.g. Dev Patel (or leave blank for Open)" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Casting Status</label>
                <select name="castingStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Confirmed Cast" ${C.castingStatus==="Confirmed Cast"?"selected":""}>Confirmed Cast</option>
                  <option value="Offer Out" ${C.castingStatus==="Offer Out"?"selected":""}>Offer Out</option>
                  <option value="Auditioning" ${C.castingStatus==="Auditioning"?"selected":""}>Auditioning</option>
                  <option value="Uncast / Open" ${C.castingStatus==="Uncast / Open"?"selected":""}>Uncast / Open Role</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Actor Availability</label>
                <input type="text" name="actorAvailability" value="${C.actorAvailability||""}" placeholder="e.g. Shoot Days 1-14" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${G==="Props"?`
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5 p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Sourcing Type</label>
                <select name="sourcingType" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Hero Prop" ${C.sourcingType==="Hero Prop"?"selected":""}>Hero Prop</option>
                  <option value="Custom Build / Fabricate" ${C.sourcingType==="Custom Build / Fabricate"?"selected":""}>Custom Build</option>
                  <option value="Prop House Rental" ${C.sourcingType==="Prop House Rental"?"selected":""}>Prop House</option>
                  <option value="Purchased" ${C.sourcingType==="Purchased"?"selected":""}>Purchased</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Quantity</label>
                <input type="text" name="quantity" value="${C.quantity||"1"}" placeholder="e.g. x2 Hero, x4 Rubber" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Readiness Status</label>
                <select name="readinessStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Ready in Art Dept" ${C.readinessStatus==="Ready in Art Dept"?"selected":""}>Ready in Art Dept</option>
                  <option value="Fabrication Ready" ${C.readinessStatus==="Fabrication Ready"?"selected":""}>Fabrication Ready</option>
                  <option value="In Progress" ${C.readinessStatus==="In Progress"?"selected":""}>In Progress</option>
                  <option value="Pending Sourcing" ${C.readinessStatus==="Pending Sourcing"?"selected":""}>Pending Sourcing</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Continuity Notes</label>
                <input type="text" name="continuityNotes" value="${C.continuityNotes||""}" placeholder="Continuity tracking..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${G==="Practical FX"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-purple-50/50 rounded-xl border border-purple-100">
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Required Resources</label>
                <input type="text" name="requiredResources" value="${C.requiredResources||""}" placeholder="CO2, Brine Reservoir..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Technical Specs</label>
                <input type="text" name="technicalRequirements" value="${C.technicalRequirements||""}" placeholder="Pressure limits, wiring..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Safety Notes</label>
                <input type="text" name="safetyNotes" value="${C.safetyNotes||""}" placeholder="Goggles, splash radius..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${G==="Stunts"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-rose-50/50 rounded-xl border border-rose-100">
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Safety Planning Status</label>
                <select name="safetyPlanningStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Rigging Rig Approved" ${C.safetyPlanningStatus==="Rigging Rig Approved"?"selected":""}>Rigging Rig Approved</option>
                  <option value="Rehearsal Pending" ${C.safetyPlanningStatus==="Rehearsal Pending"?"selected":""}>Rehearsal Pending</option>
                  <option value="In Coordinator Review" ${C.safetyPlanningStatus==="In Coordinator Review"?"selected":""}>In Review</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Qualified Personnel</label>
                <input type="text" name="qualifiedPersonnel" value="${C.qualifiedPersonnel||""}" placeholder="Stunt double, rigger..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Coordination Details</label>
                <input type="text" name="coordinationRequirements" value="${C.coordinationRequirements||""}" placeholder="Ratchet, cables..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${G==="Locations"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-amber-50/50 rounded-xl border border-amber-100">
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Context & Lighting</label>
                <input type="text" name="context" value="${C.context||"INT."}" placeholder="INT. or EXT." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Location Status</label>
                <input type="text" name="locationStatus" value="${C.locationStatus||"Permitted & Locked"}" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Access Details</label>
                <input type="text" name="accessDetails" value="${C.accessDetails||""}" placeholder="Access permits, route..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          <div class="flex items-center justify-between pt-2 border-t border-slate-200">
            <button type="button" class="btn-delete-element text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-xl font-medium transition-colors cursor-pointer flex items-center gap-1" data-id="${C.id}">
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
    `},m=async()=>{const C=await jt(o,a,i),G=C.filter(_=>{if(!l)return!0;const Ae=l.toLowerCase();return _.name.toLowerCase().includes(Ae)||_.description&&_.description.toLowerCase().includes(Ae)||_.category.toLowerCase().includes(Ae)||_.assignedActor&&_.assignedActor.toLowerCase().includes(Ae)||_.notes&&_.notes.toLowerCase().includes(Ae)}),$e=C.length,ne=C.filter(_=>_.status==="Confirmed").length,xe=C.filter(_=>_.status==="Needs Review"||_.status==="Extracted").length,A=C.filter(_=>_.status==="Rejected").length,ye=document.getElementById("kpi-total"),Fe=document.getElementById("kpi-confirmed"),Te=document.getElementById("kpi-review"),ie=document.getElementById("kpi-rejected");ye&&(ye.textContent=$e),Fe&&(Fe.textContent=ne),Te&&(Te.textContent=xe),ie&&(ie.textContent=A);const ce=document.getElementById("breakdown-list");if(ce){if(G.length===0){ce.innerHTML=`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400 text-xs">
          No breakdown elements match the active category, scene, or search filters.
        </div>
      `;return}ce.innerHTML=G.map(_=>{const Ae=_.status==="Confirmed",Me=_.status==="Needs Review"||_.status==="Extracted",oe=_.status==="Rejected",je=r===_.id,ue=di[_.category]||{icon:"label"},qe=Me?'<span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium flex items-center gap-1">Needs Review</span>':oe?'<span class="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium flex items-center gap-1">Excluded</span>':"",Pe=(Array.isArray(_.scenes)&&_.scenes.length>0?_.scenes:[_.sceneNumber]).map(z=>`Sc ${z}`).join(", ");return`
        <div class="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-xs hover:border-slate-300 transition-colors flex flex-col gap-2.5" data-id="${_.id}">
          <!-- Top Row: Element Name on Left, Scene Tag, Category Tag, and Compact Action Buttons -->
          <div class="flex items-center justify-between gap-2 min-w-0">
            <div class="flex items-center gap-2 flex-wrap min-w-0">
              <h3 class="font-heading font-bold text-base text-slate-900 tracking-tight shrink-0 mr-1">${_.name}</h3>
              <span class="px-2 py-0.5 rounded-md bg-blue-50/70 text-blue-700 border border-blue-100 font-semibold text-xs shrink-0 flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">movie</span>
                <span>${Pe}</span>
              </span>
              <span class="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-700 flex items-center gap-1 shrink-0">
                <span class="material-symbols-outlined text-[13px] text-slate-400">${ue.icon}</span>
                <span>${_.category}</span>
              </span>
              ${qe}
            </div>

            <!-- Primary Action Buttons (Compact, aligned near heading) -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button class="btn-toggle-edit px-2 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${_.id}" title="Edit details" aria-label="Edit ${_.name}">
                <span class="material-symbols-outlined text-[15px]">${je?"expand_less":"edit"}</span>
                <span class="hidden sm:inline">${je?"Close":"Edit"}</span>
              </button>

              ${Ae?`
                <button class="btn-review-item px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs transition-colors cursor-pointer" data-id="${_.id}" title="Request re-review" aria-label="Request re-review for ${_.name}">
                  Re-review
                </button>
              `:`
                <button class="btn-confirm-item px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${_.id}" title="Confirm item" aria-label="Confirm ${_.name}">
                  <span class="material-symbols-outlined text-[14px]">check</span>
                  <span>Confirm</span>
                </button>
              `}

              ${oe?"":`
                <button class="btn-reject-item p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" data-id="${_.id}" title="Reject element" aria-label="Reject ${_.name}">
                  <span class="material-symbols-outlined text-[16px]">block</span>
                </button>
              `}

              <button class="btn-delete-element p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" data-id="${_.id}" title="Delete element" aria-label="Delete ${_.name}">
                <span class="material-symbols-outlined text-[16px]">delete</span>
              </button>
            </div>
          </div>

          <!-- Description / Role -->
          <p class="text-xs text-slate-600 leading-relaxed font-sans">${_.description||_.characterRole||"No description provided."}</p>

          <!-- Category Specific Rich Presentation Row -->
          ${d(_)}

          <!-- Traceability & Evidence Row -->
          <div class="flex flex-col gap-1.5 mt-1 pt-2 border-t border-slate-100">
            ${_.sourceSnippet?`
              <div class="text-[11px] font-mono text-slate-600 bg-slate-50/80 border border-slate-200/60 rounded-xl p-2 leading-relaxed">
                <span class="text-slate-400 font-sans font-bold text-[10px] uppercase tracking-wider block mb-0.5">Screenplay Evidence (Draft 4.2):</span>
                "${_.sourceSnippet}"
              </div>
            `:""}

            <div class="flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-400">
              <div class="flex items-center gap-2">
                ${_.originalAiSuggestion?`
                  <span class="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">AI Extracted</span>
                `:`
                  <span class="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium">Manual Entry</span>
                `}
                ${_.userCorrection?`
                  <span class="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5" title="Modified by user">
                    <span class="material-symbols-outlined text-[12px]">tune</span>
                    <span>Corrected by ${_.userCorrection.correctedBy||"Owner"}</span>
                  </span>
                `:""}
              </div>

              ${_.confirmedBy?`
                <div>Confirmed by <strong class="font-semibold text-slate-600">${_.confirmedBy}</strong></div>
              `:""}
            </div>
          </div>

          <!-- Inline Edit Area if active -->
          ${je?c(_):""}
        </div>
      `}).join(""),ce.querySelectorAll(".btn-toggle-edit").forEach(_=>{_.onclick=()=>{const Ae=_.getAttribute("data-id");r=r===Ae?null:Ae,m()}}),ce.querySelectorAll(".btn-cancel-edit").forEach(_=>{_.onclick=()=>{r=null,m()}}),ce.querySelectorAll(".form-edit-inline").forEach(_=>{_.onsubmit=async Ae=>{Ae.preventDefault();const Me=_.getAttribute("data-id"),oe=new FormData(_),ue=(oe.get("scenes")||"18").split(",").map(Pe=>Number(Pe.trim())).filter(Pe=>!isNaN(Pe)),qe=ue.length>0?ue[0]:18,ze={name:oe.get("name"),category:oe.get("category"),status:oe.get("status"),description:oe.get("description"),scenes:ue,sceneNumber:qe,sceneId:`scene-${qe}`,assignedActor:oe.get("assignedActor")||"",castingStatus:oe.get("castingStatus")||"Uncast / Open",actorAvailability:oe.get("actorAvailability")||"",sourcingType:oe.get("sourcingType")||"",quantity:oe.get("quantity")||"",readinessStatus:oe.get("readinessStatus")||"",continuityNotes:oe.get("continuityNotes")||"",requiredResources:oe.get("requiredResources")||"",technicalRequirements:oe.get("technicalRequirements")||"",safetyNotes:oe.get("safetyNotes")||"",safetyPlanningStatus:oe.get("safetyPlanningStatus")||"",qualifiedPersonnel:oe.get("qualifiedPersonnel")||"",coordinationRequirements:oe.get("coordinationRequirements")||"",context:oe.get("context")||"",locationStatus:oe.get("locationStatus")||"",accessDetails:oe.get("accessDetails")||""};await Ks(o,Me,ze),S(`Saved updates for "${ze.name}"`),r=null,m()}}),ce.querySelectorAll(".btn-delete-element").forEach(_=>{_.onclick=Ae=>{Ae.stopPropagation();const Me=_.getAttribute("data-id"),oe=C.find(je=>je.id===Me);oe&&pe(oe)}}),ce.querySelectorAll(".btn-confirm-item").forEach(_=>{_.onclick=async()=>{const Ae=_.getAttribute("data-id");await Ks(o,Ae,{status:"Confirmed"}),S("Element confirmed by Owner"),m()}}),ce.querySelectorAll(".btn-review-item").forEach(_=>{_.onclick=async()=>{const Ae=_.getAttribute("data-id");await Ks(o,Ae,{status:"Needs Review",isHumanConfirmed:!1}),S("Marked for review"),m()}}),ce.querySelectorAll(".btn-reject-item").forEach(_=>{_.onclick=async()=>{const Ae=_.getAttribute("data-id");await Ks(o,Ae,{status:"Rejected"}),S("Element rejected"),m()}})}};await m(),document.querySelectorAll(".cat-btn").forEach(C=>{C.onclick=()=>{document.querySelectorAll(".cat-btn").forEach(G=>{G.classList.remove("bg-blue-600","text-white","shadow-2xs"),G.classList.add("bg-slate-100","text-slate-700")}),C.classList.add("bg-blue-600","text-white","shadow-2xs"),C.classList.remove("bg-slate-100","text-slate-700"),a=C.getAttribute("data-cat"),m()}});const b=document.getElementById("breakdown-scene-select");b&&(b.onchange=C=>{i=C.target.value,m()});const h=document.getElementById("breakdown-search");h&&(h.oninput=C=>{l=C.target.value,m()});const g=document.getElementById("elem-cat"),v=document.getElementById("add-modal-category-fields"),P=()=>{if(!v||!g)return;const C=g.value;C==="Cast"?v.innerHTML=`
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
      `:C==="Props"?v.innerHTML=`
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
      `:C==="Practical FX"?v.innerHTML=`
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
      `:C==="Stunts"?v.innerHTML=`
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
      `:C==="Locations"?v.innerHTML=`
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
      `:v.innerHTML=`
        <div>
          <label class="font-semibold text-slate-700 block mb-1">Department Notes</label>
          <input type="text" id="add-dept-notes" placeholder="Department-specific instructions..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
        </div>
      `};g&&(g.onchange=P,P());const B=document.getElementById("modal-add-element"),L=document.getElementById("btn-add-element"),k=document.getElementById("close-add-modal"),U=document.getElementById("btn-cancel-add"),T=document.getElementById("form-add-element"),de=()=>{P(),lt(B)},se=()=>{we(B)};L&&(L.onclick=de),k&&(k.onclick=se),U&&(U.onclick=se),B&&(B.onclick=C=>{C.target===B&&se()});const ge=document.getElementById("modal-delete-element"),J=document.getElementById("close-delete-modal"),ke=document.getElementById("btn-cancel-delete"),be=document.getElementById("btn-confirm-delete");let ee=null;const pe=C=>{ee=C;const G=document.getElementById("delete-modal-name"),$e=document.getElementById("delete-modal-category"),ne=document.getElementById("delete-modal-scenes");if(G&&(G.textContent=C.name),$e&&($e.textContent=C.category),ne){const xe=Array.isArray(C.scenes)&&C.scenes.length>0?C.scenes:[C.sceneNumber];ne.textContent=`Associated with: ${xe.map(A=>`Scene ${A}`).join(", ")}`}lt(ge)},Z=()=>{ee=null,we(ge)};J&&(J.onclick=Z),ke&&(ke.onclick=Z),ge&&(ge.onclick=C=>{C.target===ge&&Z()}),be&&(be.onclick=async()=>{if(!ee)return;const C=ee;be.disabled=!0,be.classList.add("opacity-75","cursor-not-allowed");try{const G=await Do(o,C.id);G&&(G.success||G.removedId)?(S(`Deleted "${C.name}" from breakdown`),Z(),r=null,await m()):S(G?.message||"Failed to delete element")}catch(G){S("Error deleting element: "+(G.message||"Network error"))}finally{be.disabled=!1,be.classList.remove("opacity-75","cursor-not-allowed")}});const ve=document.getElementById("btn-export-breakdown-pdf");ve&&(ve.onclick=async()=>{try{const C=await jt(o,a,i);Va(C,{title:"Chronicles of Dust",draft:"Draft 4.2"}),S(`Exported Breakdown Report (${C.length} elements) PDF`)}catch(C){console.error(C),S("Failed to export breakdown PDF")}}),T&&(T.onsubmit=async C=>{C.preventDefault();const G=document.getElementById("elem-name")?.value,$e=document.getElementById("elem-cat")?.value,ne=document.getElementById("elem-scenes")?.value||"18",xe=document.getElementById("elem-status")?.value||"Confirmed",A=document.getElementById("elem-desc")?.value;if(!G)return;const ye=ne.split(",").map(ie=>Number(ie.trim())).filter(ie=>!isNaN(ie)),Fe=ye.length>0?ye[0]:18,Te={name:G,category:$e,sceneNumber:Fe,sceneId:`scene-${Fe}`,scenes:ye,description:A,status:xe,sourceSnippet:`Manual production element registered for Scene ${ye.join(", ")}`,assignedActor:document.getElementById("add-actor")?.value||"",castingStatus:document.getElementById("add-casting-status")?.value||"Uncast / Open",actorAvailability:document.getElementById("add-availability")?.value||"",sourcingType:document.getElementById("add-prop-source")?.value||"",quantity:document.getElementById("add-prop-qty")?.value||"",readinessStatus:document.getElementById("add-prop-readiness")?.value||"",continuityNotes:document.getElementById("add-prop-continuity")?.value||"",requiredResources:document.getElementById("add-fx-res")?.value||"",technicalRequirements:document.getElementById("add-fx-tech")?.value||"",safetyNotes:document.getElementById("add-fx-safety")?.value||"",safetyPlanningStatus:document.getElementById("add-stunt-status")?.value||"",qualifiedPersonnel:document.getElementById("add-stunt-personnel")?.value||"",coordinationRequirements:document.getElementById("add-stunt-coordination")?.value||"",context:document.getElementById("add-loc-context")?.value||"",lighting:document.getElementById("add-loc-lighting")?.value||"",locationStatus:document.getElementById("add-loc-status")?.value||"",notes:document.getElementById("add-dept-notes")?.value||""};await Ro(o,Te),S(`Added "${G}" to Scene ${ye.join(", ")}`),we(),T.reset(),m()})}function mi(e=null,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=t||n.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",a=s||n.get("csId"),i=n.get("action")==="new",l=n.get("action")==="edit",r=e||n.get("from");let f="/production";l?f=`/production/call-sheets?scriptId=${o}&csId=${a}`:a||i?f=`/production/call-sheets?scriptId=${o}`:f=r||"/production";const u=f;return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${dt("Pre-Production",l?"Edit Call Sheet":a?"Call Sheet Inspector":i?"Create New Call Sheet":"Call Sheets Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Hs(l?"Edit Call Sheet":a?"Call Sheet Detail":i?"New Call Sheet":"Call Sheets",l?"edit_note":"assignment",u,!a&&!i&&!l?`
            <a href="/production/call-sheets?scriptId=${o}&action=new" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>New Call Sheet</span>
            </a>
          `:"",null,"Daily call sheets, crew calls and shooting details.")}

        <div id="callsheet-view-container" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading call sheet records...</div>
        </div>
      </main>

      ${it("production")}
    </div>
  `}async function Ga(e,t=null,s=null,n=null){const o=new URLSearchParams(window.location.search||""),a=s||o.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",i=n||o.get("csId"),l=o.get("action")==="new",r=o.get("action")==="edit",f=document.getElementById("callsheet-view-container");if(!f)return;const d=(localStorage.getItem("scriptora_prod_role")||"Owner")==="Owner";if(r&&i){const c=await ta(a,i);if(!c){f.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>';return}const m=c.status==="Confirmed"||c.isPublished;f.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col gap-4">
        <!-- Edit Masthead & Revision Notice -->
        <div class="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-bold text-base text-slate-900">Edit Call Sheet #${c.callSheetNumber}</h2>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${m?"bg-amber-50 text-amber-800 border border-amber-200":"bg-blue-50 text-blue-700 border border-blue-200"}">
                ${m?"Branch New Revision Draft":"Editing Draft"}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${c.shootDay} · Baseline: Draft 4.2 (Pinned)</p>
          </div>
          <div class="text-[11px] text-slate-400 font-mono">
            Source: Shooting Schedule Day ${c.shootDay.replace(/[^0-9]/g,"").slice(0,2)||"1"}
          </div>
        </div>

        ${m?`
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
            <a href="/production/call-sheets?scriptId=${a}&csId=${c.id}" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium">Cancel</a>
            <div class="flex items-center gap-2">
              <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">save</span>
                <span>${m?"Save Revision Draft":"Save Changes"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    `;const b=document.getElementById("form-edit-callsheet");b&&(b.onsubmit=async h=>{h.preventDefault();const g=document.getElementById("edit-cs-day")?.value||c.shootDay,v=document.getElementById("edit-cs-date")?.value||c.shootDate,P=document.getElementById("edit-cs-crewcall")?.value||c.generalCrewCall,B=document.getElementById("edit-cs-shootcall")?.value||c.shootingCall,L=document.getElementById("edit-cs-breakfast")?.value||c.breakfastTime,k=document.getElementById("edit-cs-wrap")?.value||c.estimatedWrap,U=document.getElementById("edit-cs-locname")?.value||c.locationName,T=document.getElementById("edit-cs-address")?.value||c.locationAddress,de=document.getElementById("edit-cs-parking")?.value||c.parkingNotes,se=document.getElementById("edit-cs-hospital")?.value||c.nearestHospital,ge=document.getElementById("edit-cs-weather")?.value||c.weatherSummary,J=document.getElementById("edit-cs-instructions")?.value||c.specialInstructions;await Oo(a,c.id,{shootDay:g,shootDate:v,generalCrewCall:P,shootingCall:B,breakfastTime:L,estimatedWrap:k,locationName:U,locationAddress:T,parkingNotes:de,nearestHospital:se,weatherSummary:ge,specialInstructions:J,isDraftRevision:m}),S(m?"Saved as new revision draft":"Call Sheet updated successfully"),e(`/production/call-sheets?scriptId=${a}&csId=${c.id}`)})}else if(l){const c=await Pt(a);f.innerHTML=`
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
              ${c.map(v=>`
                <option value="${v.dayNumber}" data-title="${v.title}" data-loc="${v.location}" data-date="${v.date}">
                  Day ${v.dayNumber} of 14 · ${v.date} — ${v.title} (${v.location})
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
            <a href="/production/call-sheets?scriptId=${a}" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium">Cancel</a>
            <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs">
              Generate Draft Call Sheet
            </button>
          </div>
        </form>
      </div>
    `;const m=document.getElementById("tab-linked"),b=document.getElementById("tab-manual"),h=document.getElementById("section-linked-day");m&&b&&(m.onclick=()=>{m.classList.add("bg-white","text-blue-700","shadow-2xs"),b.classList.remove("bg-white","text-blue-700","shadow-2xs"),h?.classList.remove("hidden")},b.onclick=()=>{b.classList.add("bg-white","text-blue-700","shadow-2xs"),m.classList.remove("bg-white","text-blue-700","shadow-2xs"),h?.classList.add("hidden")});const g=document.getElementById("form-create-callsheet");g&&(g.onsubmit=async v=>{v.preventDefault();const P=document.getElementById("new-cs-day")?.value||"3",B=document.getElementById("new-cs-date")?.value,L=document.getElementById("new-cs-crewcall")?.value,k=document.getElementById("new-cs-locname")?.value,U=document.getElementById("new-cs-address")?.value,T=document.getElementById("new-cs-hospital")?.value,de=document.getElementById("new-cs-parking")?.value,se=await Mo(a,{shootDay:`Day ${P} of 14`,shootDate:B,generalCrewCall:L,shootingCall:"06:30 AM",locationName:k,locationAddress:U,nearestHospital:T,parkingNotes:de});S(`Created Call Sheet #${se.callSheetNumber}`),e(`/production/call-sheets?scriptId=${a}&csId=${se.id}`)})}else if(i){const c=await ta(a,i);if(!c){f.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>';return}const m=c.status==="Confirmed"||c.isPublished;f.innerHTML=`
      <!-- Top Action Banner -->
      <div class="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
            #${c.callSheetNumber}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-semibold text-sm text-slate-900">Call Sheet #${c.callSheetNumber}</h2>
              <span class="px-2 py-0.5 rounded-md text-[10px] font-medium border ${m?"bg-slate-50 text-slate-600 border-slate-200":"bg-amber-50 text-amber-700 border-amber-200"}">
                ${m?"Published Snapshot":"Draft — Pending Owner Approval"}
              </span>
            </div>
            <p class="text-[11px] text-slate-500 mt-0.5">${c.shootDay} · ${c.shootDate}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <a href="/production/call-sheets?scriptId=${a}&csId=${c.id}&action=edit" id="btn-edit-callsheet" class="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer" title="Edit Call Sheet fields and create revision">
            <span class="material-symbols-outlined text-[16px]">edit</span>
            <span>Edit</span>
          </a>
          <button id="btn-print-callsheet" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer" title="Export genuine vector Call Sheet PDF">
            <span class="material-symbols-outlined text-[16px]">download</span>
            <span>Export PDF</span>
          </button>
          ${!m&&d?`
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
            ${(c.scenes||[]).map(v=>`
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <a href="/production/schedule?scriptId=${a}&sceneId=scene-${v.sceneNumber}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${a}&csId=${c.id}`)}" class="w-16 font-mono font-bold text-blue-700 hover:underline" title="Inspect Scene Logistics in Schedule">Sc ${v.sceneNumber}</a>
                <div class="flex-1 min-w-0 pr-2">
                  <div class="font-semibold text-slate-900 truncate">${v.heading}</div>
                  <div class="text-[11px] text-slate-500 truncate">${v.desc}</div>
                </div>
                <span class="w-20 text-center font-mono text-[11px]">${v.pages}</span>
                <span class="w-32 text-right font-medium text-[11px] text-slate-700 truncate">${(v.cast||[]).map(P=>`<a href="/production/breakdown?scriptId=${a}&category=Cast&character=${encodeURIComponent(P)}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${a}&csId=${c.id}`)}" class="hover:underline font-semibold" title="Inspect ${P} in Breakdown">${P}</a>`).join(", ")}</span>
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
            ${(c.castCalls||[]).map(v=>`
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <a href="/production/breakdown?scriptId=${a}&category=Cast&character=${encodeURIComponent(v.character)}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${a}&csId=${c.id}`)}" class="w-32 font-bold text-slate-900 hover:text-blue-700 hover:underline" title="Inspect ${v.character} in Breakdown">${v.character}</a>
                <span class="flex-1 font-medium text-slate-700">${v.actor}</span>
                <span class="w-20 text-center font-mono text-[11px] text-slate-600">${v.pickup}</span>
                <span class="w-20 text-center font-mono text-[11px] text-slate-600">${v.hmuCall}</span>
                <span class="w-20 text-right font-mono font-bold text-blue-700">${v.onSet}</span>
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
    `;const b=document.getElementById("btn-print-callsheet");b&&(b.onclick=()=>{try{const v=$.state.activeScript||($.state.scripts||[]).find(P=>P.id===a);ua(c,{title:v?.title||"Chronicles of Dust",company:v?.company||"Badlands Anthology LLC",draft:v?.draft||"Draft 4.2"}),S(`Exported Call Sheet #${c.callSheetNumber} PDF`)}catch(v){console.error(v),S("Failed to generate Call Sheet PDF")}});const h=document.getElementById("btn-delete-callsheet");h&&(h.onclick=async()=>{if(!confirm(`Are you sure you want to delete draft Call Sheet #${c.callSheetNumber}? This cannot be undone.`))return;const v=await na(a,c.id);v.success?(S(`Call Sheet #${c.callSheetNumber} deleted`),e(`/production/call-sheets?scriptId=${a}`)):S(v.message||"Failed to delete call sheet")});const g=document.getElementById("btn-publish-callsheet");g&&(g.onclick=async()=>{confirm("Approve and lock this call sheet as an official immutable snapshot?")&&(await jo(a,c.id),S("Call Sheet published & snapshot locked"),e(`/production/call-sheets?scriptId=${a}&csId=${c.id}`))})}else{const c=await ss(a);f.innerHTML=`
      <div class="flex items-center justify-between">
        <h2 class="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px] text-blue-600">assignment</span>
          <span>Call Sheets Catalogue (${c.length})</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${c.map(m=>{const b=m.status==="Confirmed"||m.isPublished;return`
            <div class="cs-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group" data-id="${m.id}">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      #${m.callSheetNumber}
                    </div>
                    <div class="min-w-0">
                      <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors truncate">${m.shootDay}</h3>
                      <p class="text-[11px] text-slate-500 truncate">${m.shootDate}</p>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-medium shrink-0 ${b?"bg-slate-100 text-slate-700":"bg-amber-50/80 border border-amber-200 text-amber-800"}">
                    ${b?"Published":"Draft"}
                  </span>
                </div>

                <div class="space-y-1.5 text-xs text-slate-600 mt-2">
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[15px] text-slate-400">schedule</span>
                    <span>General Call: <strong class="text-slate-800">${m.generalCrewCall}</strong> · Set: <strong class="text-blue-600">${m.shootingCall}</strong></span>
                  </div>
                  <div class="flex items-center gap-1.5 truncate">
                    <span class="material-symbols-outlined text-[15px] text-slate-400">location_on</span>
                    <span class="truncate">${m.locationName}</span>
                  </div>
                </div>
              </div>

              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span class="flex items-center gap-1">
                  <span>View Details</span>
                  <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </span>
                <div class="flex items-center gap-2" onclick="event.stopPropagation()">
                  <button class="btn-card-export p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors" data-id="${m.id}" title="Direct Export PDF">
                    <span class="material-symbols-outlined text-[16px]">download</span>
                  </button>
                  ${!b&&d?`
                    <button class="btn-card-delete p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors" data-id="${m.id}" data-num="${m.callSheetNumber}" title="Delete Draft">
                      <span class="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  `:""}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    `,f.querySelectorAll(".cs-card").forEach(m=>{m.onclick=()=>{const b=m.getAttribute("data-id");e(`/production/call-sheets?scriptId=${a}&csId=${b}`)}}),f.querySelectorAll(".btn-card-export").forEach(m=>{m.onclick=b=>{b.stopPropagation();const h=m.getAttribute("data-id"),g=c.find(v=>v.id===h);if(g){const v=$.state.activeScript||($.state.scripts||[]).find(P=>P.id===a);ua(g,{title:v?.title||"Chronicles of Dust",company:v?.company||"Badlands Anthology LLC",draft:v?.draft||"Draft 4.2"}),S(`Exported Call Sheet #${g.callSheetNumber} PDF`)}}}),f.querySelectorAll(".btn-card-delete").forEach(m=>{m.onclick=async b=>{b.stopPropagation();const h=m.getAttribute("data-id"),g=m.getAttribute("data-num");if(!confirm(`Delete draft Call Sheet #${g}?`))return;const v=await na(a,h);v.success?(S(`Call Sheet #${g} deleted`),Ga(e,t,s)):S(v.message||"Failed to delete")}})}}function fi(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=t||s.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",o=s.get("mode")||"dialogue",i=e||s.get("from")||`/production?scriptId=${n}`;return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${dt("Pre-Production","Dialogue Sheets & Actor Sides")}

      <main class="flex-1 w-full max-w-2xl mx-auto px-4 pt-16 pb-28 flex flex-col gap-3.5 fade-in">
        ${Hs("Dialogue & Actor Sides","theater_comedy",i,"",null,"Dialogue sheets and actor scene sides.")}
        
        <!-- Mode Switcher Tabs Card (Segmented Control & Selector beneath it) -->
        <div class="bg-white rounded-3xl border border-slate-200/80 p-3.5 shadow-2xs flex flex-col gap-3">
          <!-- Segmented Control -->
          <div class="flex items-center bg-slate-100/90 p-1 rounded-2xl w-full">
            <button id="tab-mode-dialogue" class="flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all ${o==="dialogue"?"bg-white text-blue-600 shadow-2xs":"text-slate-600 hover:text-slate-900"} cursor-pointer text-center">
              Dialogue Sheets
            </button>
            <button id="tab-mode-sides" class="flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all ${o==="sides"?"bg-white text-blue-600 shadow-2xs":"text-slate-600 hover:text-slate-900"} cursor-pointer text-center">
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

      ${it("production")}
    </div>
  `}async function xi(e,t=null,s=null){const n=new URLSearchParams(window.location.search||"");s||n.get("scriptId")||$.state.selectedScriptId;let o=n.get("mode")||"dialogue",a="KEVIN",i=n.get("scene")||"1";const l=document.getElementById("tab-mode-dialogue"),r=document.getElementById("tab-mode-sides"),f=document.getElementById("filter-controls"),u=document.getElementById("dialogue-sides-content"),d=[{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"KEVIN",parenthetical:"(adjusting filter)",dialogue:"Wind gauge is spiking past forty knots, Marcus. Did you check the terminal pressure at the intake valve?",action:"Kevin wipes gritty red dust from the gauge glass with his thumb."},{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"MARCUS",parenthetical:"(shrugging)",dialogue:"Telemetry's been on the fritz since dawn. Central syndicate says it's thermal fluctuation.",action:"Marcus gestures with a cigarette toward the desert horizon."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"MEERA",parenthetical:"(eyes on monitor)",dialogue:"That's no fluctuation. Look at line three. Someone bypassed the telemetry loop eighty miles upriver.",action:"Meera brings up a wireframe map showing a hidden subterranean siphon branch."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"KEVIN",parenthetical:"(tense)",dialogue:"They're siphoning straight out of the municipal reservoir into private holding tanks.",action:"Kevin taps the terminal screen, freezing the anomaly coordinates."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"COMMANDER VANCE",parenthetical:"(smooth, unhurried)",dialogue:"Water belongs to those who possess the energy to lift it from the rock, Kevin. The frontier was built on that premise.",action:"Vance sips cold tea, watching the massive hydraulic pump pistons rise and plunge."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"KEVIN",parenthetical:"(stepping forward)",dialogue:"You signed the 2041 Treaty. If the southern aquifer collapses, ten thousand families wake up to dry taps.",action:"Kevin places the legal registry deed onto Vance's polished mahogany desk."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(shouting over the roar)",dialogue:"Hold the pylon, Meera! If the high-pressure valve seals now, the back-surge will fracture the entire chamber!",action:"Brine water sprays across Kevin's visor as he locks the hydraulic bypass manifold."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"MEERA",parenthetical:"(straining on cable)",dialogue:"Then don't let them break! Reroute the secondary relay through the floodgate breaker!",action:"Meera kicks off the iron catwalk, swinging across the chasm to secure the emergency lock."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(levering the valve bar)",dialogue:"Bypass locked! Bleed the line! Three... two... one!",action:"The pressure needles drop from red to blue as the municipal pipeline fills with fresh current."}];function c(){const g=new Date,v=P=>String(P).padStart(2,"0");return`${v(g.getDate())}/${v(g.getMonth()+1)}/${g.getFullYear()}`}function m(){if(f)if(o==="dialogue"){f.innerHTML=`
        <span class="text-xs font-semibold text-slate-500 shrink-0">Character:</span>
        <div class="relative inline-flex items-center flex-1 max-w-xs">
          <select id="char-select" class="w-full text-xs font-semibold bg-white border border-slate-200/90 rounded-2xl pl-3 pr-8 py-2 text-slate-900 appearance-none focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer">
            <option value="KEVIN" ${a==="KEVIN"?"selected":""}>KEVIN (Lead)</option>
            <option value="MEERA" ${a==="MEERA"?"selected":""}>MEERA (Lead)</option>
            <option value="COMMANDER VANCE" ${a==="COMMANDER VANCE"?"selected":""}>COMMANDER VANCE</option>
            <option value="MARCUS" ${a==="MARCUS"?"selected":""}>MARCUS</option>
          </select>
          <span class="material-symbols-outlined text-[18px] text-slate-400 absolute right-2.5 pointer-events-none">expand_more</span>
        </div>
      `;const g=document.getElementById("char-select");g&&(g.onchange=v=>{a=v.target.value,b()})}else{f.innerHTML=`
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
      `;const g=document.getElementById("scene-select");g&&(g.onchange=v=>{i=v.target.value,b()})}}function b(){if(!u)return;const g=c();if(o==="dialogue"){const v=d.filter(P=>P.character===a);u.innerHTML=`
        <!-- Watermark Header -->
        <div class="font-sans flex flex-col gap-1">
          <div class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">SCRIPTORA · PRODUCTION EXTRACT</div>
          <h2 class="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
            CHARACTER DIALOGUE SHEET<br />— ${a}
          </h2>
          <div class="text-[12px] text-slate-600 font-medium mt-0.5">Screenplay: Chronicles of Dust · Pinned Version: Draft 4.2</div>
          <div class="text-[12px] text-slate-500">Lines: ${v.length} Cues</div>
          <div class="text-[12px] text-slate-500">Date: ${g}</div>
          <div class="w-full h-0.5 bg-slate-900 mt-2 mb-4"></div>
        </div>

        <!-- Dialogue Elements -->
        <div class="space-y-6 pt-1 max-w-2xl mx-auto font-mono w-full">
          ${v.map(P=>`
            <div class="space-y-1.5">
              <div class="font-sans font-bold text-[12px] text-blue-700 uppercase tracking-wide">
                SCENE ${P.sceneNum} — ${P.heading}
              </div>
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest pt-2">
                ${P.character}
              </div>
              ${P.parenthetical?`
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${P.parenthetical}
                </div>
              `:""}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto text-left">
                ${P.dialogue}
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
      `}else{const v=d.filter(B=>String(B.sceneNum)===String(i)),P=v[0]||{heading:`SCENE ${i}`};u.innerHTML=`
        <!-- Sides Masthead -->
        <div class="font-sans flex flex-col gap-1">
          <div class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">SCRIPTORA · PRODUCTION SIDES</div>
          <h2 class="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
            ACTOR SIDES<br />— SCENE ${i}
          </h2>
          <div class="text-[12px] text-slate-600 font-medium mt-0.5">${P.heading} · Draft 4.2</div>
          <div class="text-[12px] text-slate-500">Rehearsal & On-Set Copy</div>
          <div class="text-[12px] text-slate-500">Date: ${g}</div>
          <div class="w-full h-0.5 bg-slate-900 mt-2 mb-4"></div>
        </div>

        <!-- Formatted Script Scene Beat -->
        <div class="space-y-4 pt-1 max-w-2xl mx-auto leading-relaxed font-mono w-full">
          <div class="font-bold text-[13px] text-slate-900 uppercase">
            ${P.heading}
          </div>

          ${v.map(B=>`
            <div class="space-y-1.5 my-3">
              ${B.action?`
                <div class="text-slate-700 text-[12px] leading-relaxed italic mb-2 font-sans">
                  ${B.action}
                </div>
              `:""}
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest">
                ${B.character}
              </div>
              ${B.parenthetical?`
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${B.parenthetical}
                </div>
              `:""}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto">
                ${B.dialogue}
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
      `}h()}function h(){const g=document.getElementById("btn-export-pdf");g&&(g.onclick=()=>{try{if(o==="dialogue"){const v=d.filter(P=>P.character===a);li(a,v,{title:"Chronicles of Dust",draft:"Draft 4.2"}),S(`Exported ${a} Dialogue Sheet PDF`)}else{const v=Number(i),P=d.filter(L=>L.sceneNum===v),B=P[0]||{heading:`SCENE ${v}`};ii(i,P,{heading:B.heading,pages:"2 1/8"},{title:"Chronicles of Dust",draft:"Draft 4.2"}),S(`Exported Scene ${i} Actor Sides PDF`)}}catch(v){console.error(v),S("Failed to generate PDF document")}})}l&&r&&(l.onclick=()=>{o="dialogue",l.className="flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all bg-white text-blue-600 shadow-2xs cursor-pointer text-center",r.className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all text-slate-600 hover:text-slate-900 cursor-pointer text-center",m(),b()},r.onclick=()=>{o="sides",r.className="flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all bg-white text-blue-600 shadow-2xs cursor-pointer text-center",l.className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all text-slate-600 hover:text-slate-900 cursor-pointer text-center",m(),b()}),m(),b()}const gi={Cast:"person",Locations:"location_on",Props:"inventory_2","Practical FX":"science",Stunts:"sports_kabaddi",Costumes:"checkroom",Vehicles:"commute",Sound:"music_note","Hair & Makeup":"face",Equipment:"videocam","Special Equipment":"videocam"};function bi(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||$.state.selectedScriptId;const n=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${dt("Pre-Production","Master Shooting Schedule")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-4 fade-in">
        <!-- SubNav with Title, Project Context & Primary Actions -->
        ${Hs("Shooting Schedule","calendar_month",n||"/production",`
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

      ${it("production")}
    </div>
  `}async function hi(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",a=document.getElementById("schedule-calendar-container"),i=document.getElementById("day-detail-modal");if(!a)return;let l=await Pt(o),r=await fs(o),f=await jt(o);const u=new Set,d=new Set,c=new Set;function m(){a.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-3">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-blue-600 text-lg">calendar_month</span>
            <h3 class="font-heading font-semibold text-sm text-slate-900">Shooting Calendar Matrix</h3>
          </div>
          <span class="text-xs text-slate-500 font-medium">October 24 – October 30, 2026</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-1">
          ${l.map(ne=>{const xe=(ne.sceneNumbers||[]).map(A=>r.find(ye=>ye.sceneNumber===A)).filter(Boolean);return`
              <div class="calendar-day-card rounded-xl border border-slate-200/90 p-3 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between gap-2.5 bg-slate-50/40" data-day="${ne.dayNumber}">
                <div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      <span class="font-heading font-bold text-xs text-slate-900">Day ${ne.dayNumber}</span>
                      ${ne.isLocked?'<span class="material-symbols-outlined text-slate-400 text-[13px]" title="Day locked">lock</span>':""}
                    </div>
                    <span class="text-[11px] font-mono text-slate-500 font-medium">${ne.date.split(",")[0]}</span>
                  </div>
                  <div class="text-[11px] text-slate-700 font-medium mt-1 truncate">${ne.location}</div>
                  <div class="text-[10px] text-slate-400 mt-0.5">${ne.totalPages} pgs • ${ne.estHours} hrs</div>
                </div>

                <div class="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <div class="flex items-center gap-1 overflow-hidden">
                    ${xe.slice(0,3).map(A=>`
                      <button class="btn-badge-scene px-1.5 py-0.5 rounded bg-white hover:bg-blue-50 hover:border-blue-300 border border-slate-200 font-mono text-[9px] font-bold text-slate-700 transition-colors cursor-pointer" data-scene-id="${A.id}" title="View Scene ${A.sceneNumber} details">#${A.sceneNumber}</button>
                    `).join("")}
                    ${xe.length>3?`<span class="text-[10px] text-slate-400">+${xe.length-3}</span>`:""}
                  </div>
                  <span class="text-blue-600 font-semibold text-[10px] flex items-center gap-0.5">
                    Open &rarr;
                  </span>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,a.querySelectorAll(".calendar-day-card").forEach(ne=>{ne.onclick=()=>{const xe=ne.getAttribute("data-day");xe&&T(xe)}}),a.querySelectorAll(".btn-badge-scene").forEach(ne=>{ne.onclick=xe=>{xe.stopPropagation();const A=ne.getAttribute("data-scene-id");A&&J(A)}})}let b=null,h=!1,g=!1;const v=new Set;let P=!1;const B=new Set,L=new Set;let k=null;function U(ne){const xe=(ne.sceneNumbers||[]).map(Te=>r.find(ie=>ie.sceneNumber===Te)).filter(Boolean);let A=0;xe.forEach(Te=>{const ie=(Te.pages||"").match(/(\d+)\s*(\d+)\/8/);if(ie)A+=parseInt(ie[1],10)*8+parseInt(ie[2],10);else{const ce=parseFloat(Te.pages);isNaN(ce)||(A+=Math.round(ce*8))}});const ye=Math.floor(A/8),Fe=A%8;return ne.totalPages=`${ye} ${Fe}/8`,ne.totalPages}function T(ne,xe=null){const A=l.find(z=>z.dayNumber===Number(ne));if(!A)return;if(b=A.dayNumber,xe){const z=r.find(I=>I.id===xe||String(I.sceneNumber)===String(xe));z&&u.add(z.id)}const ye=document.getElementById("modal-day-badge"),Fe=document.getElementById("modal-day-title"),Te=document.getElementById("modal-day-sub"),ie=document.getElementById("modal-day-content"),ce=document.getElementById("modal-day-menu-btn"),_=document.getElementById("modal-day-menu-dropdown"),Ae=document.getElementById("modal-day-edit-btn"),Me=document.getElementById("modal-day-menu-edit"),oe=document.getElementById("modal-day-lock-toggle"),je=document.getElementById("modal-day-lock-label"),ue=document.getElementById("modal-day-lock-icon"),qe=document.getElementById("modal-day-delete");ye&&(ye.textContent=`D${A.dayNumber}`),Fe&&(Fe.textContent=`Day ${A.dayNumber} • ${A.date.split(",")[0]}`),Te&&(Te.textContent=`${A.location}${A.totalPages?` • ${A.totalPages} pgs`:""}`),ce&&_&&(_.classList.add("hidden"),_.onclick=z=>z.stopPropagation(),ce.onclick=z=>{z.stopPropagation();const I=_.classList.contains("hidden");document.querySelectorAll("[data-scriptora-popup]").forEach(F=>{F!==_&&F.classList.add("hidden")}),I?(_.classList.remove("hidden"),Os(ce,_,{placement:"bottom-end",zIndex:1e4})):_.classList.add("hidden")},ce._outsideClickAttached||(ce._outsideClickAttached=!0,document.addEventListener("click",()=>{_.classList.add("hidden")})),k={close:()=>_.classList.add("hidden")}),Ae&&(Ae.onclick=()=>{h=!h,T(A.dayNumber)}),Me&&(Me.onclick=z=>{z.stopPropagation(),k?.close(),h=!h,T(A.dayNumber)}),Te&&(Te.onclick=()=>{h=!0,T(A.dayNumber)}),je&&(je.textContent=A.isLocked?"Unlock Day":"Lock Day"),ue&&(ue.textContent=A.isLocked?"lock_open":"lock"),oe&&(oe.onclick=async z=>{z.stopPropagation(),k?.close(),A.isLocked=!A.isLocked,await Vt(o,A.dayNumber,{isLocked:A.isLocked}),S(`Day ${A.dayNumber} ${A.isLocked?"locked":"unlocked"}`),je&&(je.textContent=A.isLocked?"Unlock Day":"Lock Day"),ue&&(ue.textContent=A.isLocked?"lock_open":"lock"),m()}),qe&&(qe.onclick=async z=>{if(z.stopPropagation(),k?.close(),!confirm(`Are you sure you want to remove Shoot Day ${A.dayNumber}? Any scenes should be moved first.`))return;const I=await Ho(o,A.dayNumber);I.success?(S(`Shoot Day ${A.dayNumber} deleted`),ge(),l=await Pt(o),m()):S(I.message||"Failed to delete day")});const ze=(A.sceneNumbers||[]).map(z=>r.find(I=>I.sceneNumber===z)).filter(Boolean),Pe=r.filter(z=>!A.sceneNumbers.includes(z.sceneNumber));if(ie){ie.innerHTML=`
        <!-- Optional Inline Day Info Editor -->
        ${h?`
          <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex flex-col gap-2.5 animate-in fade-in">
            <div class="flex items-center justify-between">
              <span class="font-heading font-bold text-xs text-blue-950 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px] text-blue-600">edit_calendar</span>
                <span>Edit Shoot Day ${A.dayNumber} Info</span>
              </span>
              <button id="btn-cancel-day-top" class="text-slate-400 hover:text-slate-700 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div>
                <label class="block text-slate-600 font-medium mb-1">Shoot Date</label>
                <input type="text" id="input-edit-day-date" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500" value="${A.date}" placeholder="e.g. Oct 25, 2026" />
              </div>
              <div>
                <label class="block text-slate-600 font-medium mb-1">Estimated Daily Hours</label>
                <input type="number" id="input-edit-day-hours" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500" value="${A.estHours||11}" step="0.5" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-slate-600 font-medium mb-1">Primary Location / Focus</label>
                <input type="text" id="input-edit-day-loc" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500" value="${A.location||""}" placeholder="e.g. Chamber B Dry Tank" />
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
          <span class="font-heading font-semibold text-slate-900 text-xs">Assigned Scenes (${ze.length})</span>
          <button id="btn-toggle-assign-scene" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-[11px] font-semibold transition-colors cursor-pointer" title="Assign scene to this shoot day">
            <span class="material-symbols-outlined text-[13px]">add</span>
            <span>Assign Scene</span>
          </button>
        </div>

        <!-- Inline Scene Assign Selector -->
        ${P?`
          <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex flex-col gap-2.5 animate-in fade-in w-full min-w-0 box-border">
            <div class="flex items-center justify-between text-xs font-semibold text-blue-900 gap-2">
              <span class="truncate">Add Screenplay Scene to Shoot Day ${A.dayNumber}</span>
              <button id="btn-close-assign-scene" class="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer shrink-0" title="Close scene selector">
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            ${Pe.length>0?`
              <div class="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-2 w-full min-w-0">
                <div class="min-w-0 flex-1 w-full">
                  <label for="select-scene-to-assign" class="sr-only">Select scene to assign to shoot day</label>
                  <select id="select-scene-to-assign" class="w-full min-w-0 max-w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 sm:py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500 cursor-pointer truncate">
                    ${Pe.map(w=>`
                      <option value="${w.sceneNumber}">#${w.sceneNumber} ${w.heading} (${w.pages} pgs)</option>
                    `).join("")}
                  </select>
                </div>
                <div class="w-full sm:w-auto shrink-0">
                  <button id="btn-confirm-assign-scene" class="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-xs shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center">
                    <span class="material-symbols-outlined text-[15px]">add</span><span>Add to Day</span>
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
          ${ze.length>0?ze.map((w,j)=>{const V=u.has(w.id),X=d.has(w.id),N=c.has(w.id),Ie=v.has(w.id),et=B.has(w.id),ht=L.has(w.id),tt=f.filter(Ne=>Ne.sceneId===w.id||Ne.sceneNumber===w.sceneNumber||Array.isArray(Ne.scenes)&&Ne.scenes.includes(w.sceneNumber));return`
              <div class="scene-item-card rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-all" data-scene-num="${w.sceneNumber}" data-scene-id="${w.id}">
                ${Ie?`
                  <!-- Inline Edit Scene Mode -->
                  <div class="p-3 bg-blue-50/40 flex flex-col gap-2">
                    <div class="text-[11px] font-bold text-slate-800 flex items-center justify-between border-b border-blue-200/60 pb-1.5">
                      <span>Edit Scene #${w.sceneNumber}</span>
                      <button class="btn-cancel-scene-edit text-slate-400 hover:text-slate-700 cursor-pointer" data-scene-id="${w.id}">
                        <span class="material-symbols-outlined text-[15px]">close</span>
                      </button>
                    </div>
                    <div class="flex flex-col gap-1.5">
                      <div>
                        <label class="block text-[10px] text-slate-500 font-semibold mb-0.5">Scene Heading</label>
                        <input type="text" class="input-scene-heading w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-none focus:border-blue-500" value="${w.heading}" />
                      </div>
                      <div class="grid grid-cols-2 gap-2">
                        <div>
                          <label class="block text-[10px] text-slate-500 font-semibold mb-0.5">Pages</label>
                          <input type="text" class="input-scene-pages w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-none focus:border-blue-500" value="${w.pages}" placeholder="e.g. 7 2/8" />
                        </div>
                        <div>
                          <label class="block text-[10px] text-slate-500 font-semibold mb-0.5">Complexity</label>
                          <select class="input-scene-complexity w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-none">
                            <option value="Low" ${w.complexity==="Low"?"selected":""}>Low</option>
                            <option value="Medium" ${w.complexity==="Medium"||!w.complexity?"selected":""}>Medium</option>
                            <option value="High" ${w.complexity==="High"?"selected":""}>High</option>
                          </select>
                        </div>
                      </div>
                      <div class="flex items-center justify-between pt-1">
                        <button class="btn-remove-scene-day text-rose-600 hover:text-rose-700 text-[11px] font-medium flex items-center gap-1 cursor-pointer" data-scene="${w.sceneNumber}">
                          <span class="material-symbols-outlined text-[13px]">delete</span>
                          <span>Remove from Day</span>
                        </button>
                        <div class="flex items-center gap-1.5">
                          <button class="btn-cancel-scene-edit px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer" data-scene-id="${w.id}">Cancel</button>
                          <button class="btn-save-scene-edit px-3 py-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs cursor-pointer" data-scene-id="${w.id}">Save Scene</button>
                        </div>
                      </div>
                    </div>
                  </div>
                `:`
                  <!-- Compact Scene Row -->
                  <div class="p-2.5 sm:p-3 flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <span class="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 font-mono font-bold text-xs flex items-center justify-center text-slate-800 shrink-0">#${w.sceneNumber}</span>
                      <div class="min-w-0">
                        <div class="font-medium text-slate-900 text-xs truncate leading-snug">${w.heading}</div>
                        <div class="text-[11px] text-slate-500 font-medium">${w.pages} pgs</div>
                      </div>
                    </div>

                    <div class="flex items-center gap-1 shrink-0">
                      <button class="btn-scene-up p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer" data-scene="${w.sceneNumber}" ${j===0?"disabled":""} title="Move earlier in shooting order">
                        <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
                      </button>
                      <button class="btn-scene-down p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer" data-scene="${w.sceneNumber}" ${j===ze.length-1?"disabled":""} title="Move later in shooting order">
                        <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
                      </button>
                      <button class="btn-edit-scene-quick p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer" data-scene-id="${w.id}" title="Edit scene heading & pages">
                        <span class="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button class="btn-toggle-scene-inline px-2.5 py-1 rounded-lg ${V?"bg-blue-600 text-white font-semibold":"bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold border border-blue-200/80"} text-[11px] flex items-center gap-1 transition-colors cursor-pointer" data-scene-id="${w.id}">
                        <span>Details</span>
                        <span class="material-symbols-outlined text-[14px] transition-transform inline-details-chevron ${V?"rotate-180":""}">expand_more</span>
                      </button>
                    </div>
                  </div>
                `}

                <!-- Inline Expanded Scene Details (Normal Document Flow) -->
                <div class="scene-inline-details border-t border-slate-100 bg-slate-50/60 p-3 ${V?"":"hidden"} flex flex-col gap-2.5 text-xs text-slate-700">
                  <!-- Initial Compact Summary: Full heading, assigned day, screenplay/draft, snippet, compact quick actions -->
                  <div class="flex flex-col gap-1.5">
                    <div>
                      <h4 class="font-heading font-bold text-xs text-slate-900 leading-snug">#${w.sceneNumber} ${w.heading}</h4>
                      <p class="text-[11px] text-slate-500 mt-0.5">
                        Shoot Day ${A.dayNumber} • Chronicles of Dust • Draft 4.2 (Pinned)
                      </p>
                    </div>

                    <!-- Editable Scene Snippet -->
                    ${et?`
                      <div class="flex flex-col gap-1.5 bg-white border border-slate-200 rounded-lg p-2">
                        <label class="text-[10px] font-semibold text-slate-500">Edit Scene Snippet / Description</label>
                        <textarea class="input-scene-snippet w-full text-xs p-1.5 border border-slate-200 rounded focus:outline-none focus:border-blue-500" rows="3">${w.snippet||""}</textarea>
                        <div class="flex items-center justify-end gap-1.5">
                          <button class="btn-cancel-snippet px-2 py-0.5 rounded text-[11px] text-slate-600 hover:bg-slate-100 cursor-pointer" data-scene-id="${w.id}">Cancel</button>
                          <button class="btn-save-snippet px-2.5 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold cursor-pointer" data-scene-id="${w.id}">Save</button>
                        </div>
                      </div>
                    `:`
                      <div class="flex flex-col gap-1 bg-white border border-slate-200/80 rounded-lg p-2">
                        <div class="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                          <span>Scene Snippet</span>
                          <button class="btn-edit-snippet text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5" data-scene-id="${w.id}">
                            <span class="material-symbols-outlined text-[12px]">edit</span>
                            <span>Edit</span>
                          </button>
                        </div>
                        <p class="text-[11px] text-slate-600 leading-relaxed">
                          ${w.snippet||'<span class="italic text-slate-400">No snippet provided.</span>'}
                        </p>
                      </div>
                    `}

                    <!-- Quick Action Links -->
                    <div class="flex items-center gap-2 pt-0.5 flex-wrap">
                      <button class="btn-scene-breakdown inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer" data-scene-num="${w.sceneNumber}">
                        <span class="material-symbols-outlined text-[14px] text-blue-600">dataset</span>
                        <span>Breakdown</span>
                      </button>
                      <button class="btn-scene-sides inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer" data-scene-num="${w.sceneNumber}">
                        <span class="material-symbols-outlined text-[14px] text-blue-600">description</span>
                        <span>Actor Sides</span>
                      </button>
                      <button class="btn-scene-pdf inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer" data-scene-id="${w.id}">
                        <span class="material-symbols-outlined text-[14px] text-blue-600">download</span>
                        <span>Export PDF</span>
                      </button>
                    </div>
                  </div>

                  <!-- Expandable 'More Details' Section -->
                  <div class="pt-1">
                    <button class="btn-toggle-more-details w-full py-1.5 px-2.5 rounded-lg bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer" data-scene-id="${w.id}">
                      <span class="flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-[15px] text-slate-500">tune</span>
                        <span>More Details</span>
                      </span>
                      <span class="material-symbols-outlined text-[16px] text-slate-400 transition-transform more-details-chevron ${X?"rotate-180":""}">expand_more</span>
                    </button>

                    <div class="more-details-panel ${X?"":"hidden"} flex flex-col gap-2.5 pt-2 text-xs">
                      <!-- Cast with Add & Remove functionality -->
                      <div class="flex flex-col gap-1.5">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Cast</span>
                          <button class="btn-toggle-add-cast text-[11px] text-blue-600 font-medium hover:underline flex items-center gap-0.5 cursor-pointer" data-scene-id="${w.id}">
                            <span class="material-symbols-outlined text-[13px]">add</span>
                            <span>Add Cast</span>
                          </button>
                        </div>
                        ${ht?`
                          <div class="flex items-center gap-1.5 py-1">
                            <input type="text" class="input-new-cast-name flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500" placeholder="Character name (e.g. AARAV)" />
                            <button class="btn-save-new-cast px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] shadow-2xs cursor-pointer" data-scene-id="${w.id}">Add</button>
                            <button class="btn-cancel-new-cast px-2 py-1 rounded-lg text-slate-500 hover:bg-slate-100 text-[11px] cursor-pointer" data-scene-id="${w.id}">Cancel</button>
                          </div>
                        `:""}
                        <div class="flex items-center gap-1.5 flex-wrap">
                          ${w.cast&&w.cast.length>0?w.cast.map(Ne=>`
                            <span class="inline-flex items-center gap-1 pl-1.5 pr-1 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-800">
                              <span class="w-3.5 h-3.5 rounded-full bg-slate-100 text-slate-600 text-[9px] flex items-center justify-center font-bold">${Ne.charAt(0)}</span>
                              <span>${Ne}</span>
                              <button class="btn-remove-cast-member text-slate-400 hover:text-rose-600 ml-0.5 cursor-pointer" data-scene-id="${w.id}" data-cast="${Ne}" title="Remove character">
                                <span class="material-symbols-outlined text-[12px]">close</span>
                              </button>
                            </span>
                          `).join(""):'<span class="text-slate-400 text-[11px] italic">No cast assigned</span>'}
                        </div>
                      </div>

                      <!-- Breakdown Elements -->
                      <div class="flex flex-col gap-1 pt-1 border-t border-slate-200/60">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Breakdown Elements (${tt.length})</span>
                          <button class="btn-scene-breakdown text-[11px] text-blue-600 font-medium hover:underline cursor-pointer" data-scene-num="${w.sceneNumber}">Edit in Breakdown &rarr;</button>
                        </div>
                        ${tt.length>0?`
                          <div class="flex items-center gap-1.5 flex-wrap">
                            ${tt.map(Ne=>`
                              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] text-slate-700">
                                <span class="material-symbols-outlined text-[13px] text-blue-600">${gi[Ne.category]||"label"}</span>
                                <span>${Ne.name}</span>
                                ${Ne.category?`<span class="text-slate-400 text-[9px]">(${Ne.category})</span>`:""}
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
                          <select class="select-inline-move-day bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] text-slate-800 font-medium focus:outline-none cursor-pointer" data-scene="${w.sceneNumber}">
                            ${l.map(Ne=>`
                              <option value="${Ne.dayNumber}" ${Ne.dayNumber===A.dayNumber?"selected":""}>
                                Day ${Ne.dayNumber} (${Ne.date.split(",")[0]})
                              </option>
                            `).join("")}
                          </select>
                          <button class="btn-inline-move-day px-2 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer" data-scene="${w.sceneNumber}">
                            Move
                          </button>
                        </div>
                      </div>

                      <!-- Production & Continuity Notes (Compact Editable Workflow) -->
                      <div class="notes-container border-t border-slate-200/60 pt-1.5 flex flex-col gap-1.5">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Production & Continuity Notes</span>
                          <button class="btn-edit-notes text-[11px] text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer" data-scene-id="${w.id}">
                            <span class="material-symbols-outlined text-[13px]">edit</span>
                            <span>${w.directorNotes||w.continuityNotes?"Edit Notes":"Add Notes"}</span>
                          </button>
                        </div>

                        <!-- Display Mode (Collapsed by default, shown when not editing) -->
                        <div class="notes-display-mode ${N?"hidden":""} flex flex-col gap-1 text-[11px] text-slate-600 bg-white border border-slate-200/70 rounded-lg p-2">
                          ${w.directorNotes||w.continuityNotes?`
                            ${w.directorNotes?`<div><span class="font-medium text-slate-800">Director:</span> ${w.directorNotes}</div>`:""}
                            ${w.continuityNotes?`<div><span class="font-medium text-slate-800">Continuity:</span> ${w.continuityNotes}</div>`:""}
                          `:`
                            <div class="text-slate-400 italic">No production or continuity notes logged.</div>
                          `}
                        </div>

                        <!-- Editable Fields (Only visible when explicitly editing) -->
                        <div class="notes-edit-mode ${N?"":"hidden"} flex flex-col gap-2 bg-white border border-slate-200 rounded-xl p-2.5">
                          <div>
                            <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">Director's Notes</label>
                            <textarea class="input-director-notes w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" rows="2" placeholder="Camera, lighting, director preferences...">${w.directorNotes||""}</textarea>
                          </div>
                          <div>
                            <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">Continuity Notes</label>
                            <textarea class="input-continuity-notes w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" rows="2" placeholder="Props, costume, timeline markers...">${w.continuityNotes||""}</textarea>
                          </div>
                          <div class="flex items-center justify-end gap-2 pt-1">
                            <button class="btn-cancel-notes px-2.5 py-1 rounded-lg text-slate-600 hover:bg-slate-100 text-[11px] font-medium cursor-pointer" data-scene-id="${w.id}">
                              Cancel
                            </button>
                            <button class="btn-save-notes px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold shadow-2xs transition-colors cursor-pointer" data-scene-id="${w.id}">
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
      `;const z=document.getElementById("btn-cancel-day-top"),I=document.getElementById("btn-cancel-day-info"),F=document.getElementById("btn-save-day-info");z&&(z.onclick=()=>{h=!1,T(A.dayNumber)}),I&&(I.onclick=()=>{h=!1,T(A.dayNumber)}),F&&(F.onclick=async()=>{const w=document.getElementById("input-edit-day-date")?.value?.trim(),j=parseFloat(document.getElementById("input-edit-day-hours")?.value)||A.estHours,V=document.getElementById("input-edit-day-loc")?.value?.trim();w&&(A.date=w),j&&(A.estHours=j),V&&(A.location=V),await Vt(o,A.dayNumber,{date:A.date,estHours:A.estHours,location:A.location}),S(`Shoot Day ${A.dayNumber} updated`),h=!1,m(),T(A.dayNumber)});const Y=document.getElementById("btn-toggle-day-constraints"),W=document.getElementById("day-constraints-content"),te=document.getElementById("constraints-chevron");Y&&W&&(Y.onclick=()=>{const w=W.classList.toggle("hidden");te&&te.classList.toggle("rotate-180",!w)});const he=document.getElementById("btn-edit-constraints"),me=document.getElementById("btn-cancel-constraints"),Ce=document.getElementById("btn-save-constraints");he&&(he.onclick=()=>{g=!0,T(A.dayNumber),document.getElementById("day-constraints-content")?.classList.remove("hidden")}),me&&(me.onclick=()=>{g=!1,T(A.dayNumber),document.getElementById("day-constraints-content")?.classList.remove("hidden")}),Ce&&(Ce.onclick=async()=>{const w=document.getElementById("input-constraints-loc")?.value?.trim(),j=parseFloat(document.getElementById("input-constraints-hours")?.value)||A.estHours,V=document.getElementById("input-constraints-turnaround")?.value?.trim();w&&(A.location=w),j&&(A.estHours=j),V&&(A.turnaroundNote=V),await Vt(o,A.dayNumber,{location:A.location,estHours:A.estHours,turnaroundNote:A.turnaroundNote}),S("Production constraints updated"),g=!1,m(),T(A.dayNumber),document.getElementById("day-constraints-content")?.classList.remove("hidden")});const Be=document.getElementById("btn-toggle-assign-scene"),Le=document.getElementById("btn-close-assign-scene"),De=document.getElementById("btn-confirm-assign-scene");Be&&(Be.onclick=()=>{P=!P,T(A.dayNumber)}),Le&&(Le.onclick=()=>{P=!1,T(A.dayNumber)}),De&&(De.onclick=async()=>{const w=Number(document.getElementById("select-scene-to-assign")?.value);w&&!A.sceneNumbers.includes(w)&&(A.sceneNumbers.push(w),U(A),await Vt(o,A.dayNumber,{sceneNumbers:A.sceneNumbers,totalPages:A.totalPages}),S(`Scene #${w} added to Shoot Day ${A.dayNumber}`),P=!1,m(),T(A.dayNumber))}),ie.querySelectorAll(".btn-edit-scene-quick").forEach(w=>{w.onclick=()=>{const j=w.getAttribute("data-scene-id");j&&(v.add(j),T(A.dayNumber))}}),ie.querySelectorAll(".btn-cancel-scene-edit").forEach(w=>{w.onclick=()=>{const j=w.getAttribute("data-scene-id");j&&(v.delete(j),T(A.dayNumber))}}),ie.querySelectorAll(".btn-save-scene-edit").forEach(w=>{w.onclick=async()=>{const j=w.getAttribute("data-scene-id"),V=w.closest(".scene-item-card"),X=V?.querySelector(".input-scene-heading")?.value?.trim(),N=V?.querySelector(".input-scene-pages")?.value?.trim(),Ie=V?.querySelector(".input-scene-complexity")?.value,et=r.find(ht=>ht.id===j);et&&(X&&(et.heading=X),N&&(et.pages=N),Ie&&(et.complexity=Ie),await As(o,et.id,{heading:X,pages:N,complexity:Ie}),U(A),await Vt(o,A.dayNumber,{totalPages:A.totalPages}),S(`Scene #${et.sceneNumber} updated`),v.delete(j),m(),T(A.dayNumber))}}),ie.querySelectorAll(".btn-remove-scene-day").forEach(w=>{w.onclick=async()=>{const j=Number(w.getAttribute("data-scene"));j&&(A.sceneNumbers=A.sceneNumbers.filter(V=>V!==j),U(A),await Vt(o,A.dayNumber,{sceneNumbers:A.sceneNumbers,totalPages:A.totalPages}),S(`Scene #${j} removed from Day ${A.dayNumber}`),m(),T(A.dayNumber))}}),ie.querySelectorAll(".btn-edit-snippet").forEach(w=>{w.onclick=()=>{const j=w.getAttribute("data-scene-id");j&&(B.add(j),T(A.dayNumber))}}),ie.querySelectorAll(".btn-cancel-snippet").forEach(w=>{w.onclick=()=>{const j=w.getAttribute("data-scene-id");j&&(B.delete(j),T(A.dayNumber))}}),ie.querySelectorAll(".btn-save-snippet").forEach(w=>{w.onclick=async()=>{const j=w.getAttribute("data-scene-id"),X=w.closest(".scene-item-card")?.querySelector(".input-scene-snippet")?.value?.trim(),N=r.find(Ie=>Ie.id===j);N&&(N.snippet=X,await As(o,N.id,{snippet:X}),S(`Scene #${N.sceneNumber} snippet updated`),B.delete(j),T(A.dayNumber))}}),ie.querySelectorAll(".btn-toggle-add-cast").forEach(w=>{w.onclick=()=>{const j=w.getAttribute("data-scene-id");j&&(L.add(j),T(A.dayNumber))}}),ie.querySelectorAll(".btn-cancel-new-cast").forEach(w=>{w.onclick=()=>{const j=w.getAttribute("data-scene-id");j&&(L.delete(j),T(A.dayNumber))}}),ie.querySelectorAll(".btn-save-new-cast").forEach(w=>{w.onclick=async()=>{const j=w.getAttribute("data-scene-id"),X=w.closest(".scene-item-card")?.querySelector(".input-new-cast-name")?.value?.trim().toUpperCase(),N=r.find(Ie=>Ie.id===j);N&&X&&(N.cast=N.cast||[],N.cast.includes(X)||(N.cast.push(X),await As(o,N.id,{cast:N.cast}),S(`Character ${X} added to Scene #${N.sceneNumber}`)),L.delete(j),T(A.dayNumber))}}),ie.querySelectorAll(".btn-remove-cast-member").forEach(w=>{w.onclick=async()=>{const j=w.getAttribute("data-scene-id"),V=w.getAttribute("data-cast"),X=r.find(N=>N.id===j);X&&V&&(X.cast=(X.cast||[]).filter(N=>N!==V),await As(o,X.id,{cast:X.cast}),S(`Character ${V} removed from Scene #${X.sceneNumber}`),T(A.dayNumber))}}),ie.querySelectorAll(".btn-toggle-scene-inline").forEach(w=>{w.onclick=()=>{const j=w.getAttribute("data-scene-id");j&&(u.has(j)?u.delete(j):u.add(j),T(A.dayNumber))}}),ie.querySelectorAll(".btn-toggle-more-details").forEach(w=>{w.onclick=()=>{const j=w.getAttribute("data-scene-id");j&&(d.has(j)?d.delete(j):d.add(j),T(A.dayNumber))}}),ie.querySelectorAll(".btn-scene-up").forEach(w=>{w.onclick=async()=>{const j=Number(w.getAttribute("data-scene")),V=A.sceneNumbers.indexOf(j);if(V>0){const X=[...A.sceneNumbers],N=X[V];X[V]=X[V-1],X[V-1]=N,A.sceneNumbers=X,await sa(o,A.dayNumber,X),S("Scene shooting order updated"),m(),T(A.dayNumber)}}}),ie.querySelectorAll(".btn-scene-down").forEach(w=>{w.onclick=async()=>{const j=Number(w.getAttribute("data-scene")),V=A.sceneNumbers.indexOf(j);if(V<A.sceneNumbers.length-1){const X=[...A.sceneNumbers],N=X[V];X[V]=X[V+1],X[V+1]=N,A.sceneNumbers=X,await sa(o,A.dayNumber,X),S("Scene shooting order updated"),m(),T(A.dayNumber)}}}),ie.querySelectorAll(".btn-inline-move-day").forEach(w=>{w.onclick=async()=>{const j=Number(w.getAttribute("data-scene")),X=w.closest(".scene-item-card")?.querySelector(".select-inline-move-day"),N=Number(X?.value);if(!N||N===A.dayNumber){S(`Scene ${j} is already on Day ${A.dayNumber}`);return}await _o(o,j,A.dayNumber,N),l=await Pt(o),S(`Scene ${j} moved to Shoot Day ${N}`),m(),T(A.dayNumber)}}),ie.querySelectorAll(".btn-edit-notes").forEach(w=>{w.onclick=()=>{const j=w.getAttribute("data-scene-id");j&&(c.add(j),T(A.dayNumber))}}),ie.querySelectorAll(".btn-cancel-notes").forEach(w=>{w.onclick=()=>{const j=w.getAttribute("data-scene-id");j&&(c.delete(j),T(A.dayNumber))}}),ie.querySelectorAll(".btn-save-notes").forEach(w=>{w.onclick=async()=>{const j=w.getAttribute("data-scene-id"),V=w.closest(".scene-item-card"),X=V?.querySelector(".input-director-notes")?.value||"",N=V?.querySelector(".input-continuity-notes")?.value||"",Ie=r.find(et=>et.id===j);Ie&&(Ie.directorNotes=X,Ie.continuityNotes=N,await As(o,Ie.id,{directorNotes:X,continuityNotes:N}),S(`Scene ${Ie.sceneNumber} notes saved`),c.delete(j),T(A.dayNumber))}}),ie.querySelectorAll(".btn-scene-breakdown").forEach(w=>{w.onclick=()=>{const j=w.getAttribute("data-scene-num");e(`/production/breakdown?scriptId=${o}&scene=${j}`)}}),ie.querySelectorAll(".btn-scene-sides").forEach(w=>{w.onclick=()=>{const j=w.getAttribute("data-scene-num");e(`/production/dialogue-sides?scriptId=${o}&scene=${j}`)}}),ie.querySelectorAll(".btn-scene-pdf").forEach(w=>{w.onclick=()=>{const j=w.getAttribute("data-scene-id"),V=r.find(N=>N.id===j);if(!V)return;const X=f.filter(N=>N.sceneId===V.id||N.sceneNumber===V.sceneNumber||Array.isArray(N.scenes)&&N.scenes.includes(V.sceneNumber));try{Va(X,{title:`Chronicles of Dust — Scene ${V.sceneNumber}`,draft:"Draft 4.2"}),S(`Exported Scene ${V.sceneNumber} Logistics PDF`)}catch(N){console.error(N),S("Failed to export scene PDF")}}}),xe&&setTimeout(()=>{ie.querySelector(`[data-scene-id="${xe}"], [data-scene-num="${xe}"]`)?.scrollIntoView({behavior:"smooth",block:"nearest"})},50)}lt(i)}const de=document.getElementById("modal-day-close"),se=document.getElementById("modal-day-done"),ge=()=>{we(i),b=null,h=!1,g=!1,v.clear(),P=!1,B.clear(),L.clear(),k?.close()};de&&(de.onclick=ge),se&&(se.onclick=ge),i&&(i.onclick=ne=>{ne.target===i&&ge()}),window.scriptoraRouter&&window.scriptoraRouter.registerBackHandler(()=>v.size>0||c.size>0||B.size>0||L.size>0||h||g||P?(v.clear(),c.clear(),B.clear(),L.clear(),h=!1,g=!1,P=!1,b&&renderModalDayContent(b),!0):i&&!i.classList.contains("hidden")?(ge(),!0):!1);async function J(ne){let xe=r.find(ye=>ye.id===ne||String(ye.sceneNumber)===String(ne)||`scene-${ye.sceneNumber}`===String(ne));if(xe||(xe=await Lo(o,ne)),!xe){S("Scene not found in current schedule");return}const A=l.find(ye=>(ye.sceneNumbers||[]).includes(xe.sceneNumber));A?T(A.dayNumber,xe.id):l.length>0&&T(l[0].dayNumber,xe.id)}const ke=document.getElementById("btn-export-schedule-pdf");ke&&(ke.onclick=()=>{try{ri(l,r,{title:"Chronicles of Dust",draft:"Draft 4.2"}),S("Exported Master Shooting Schedule PDF")}catch(ne){console.error(ne),S("Failed to export schedule PDF")}});const be=document.getElementById("modal-add-day"),ee=document.getElementById("btn-add-shoot-day"),pe=document.getElementById("modal-add-day-close"),Z=document.getElementById("modal-add-day-cancel"),ve=document.getElementById("form-add-shoot-day");function C(){if(!be)return;const ne=l.length>0?Math.max(...l.map(ce=>ce.dayNumber))+1:1,xe=document.getElementById("input-add-day-num"),A=document.getElementById("input-add-day-date"),ye=document.getElementById("input-add-day-title"),Fe=document.getElementById("input-add-day-location"),Te=document.getElementById("input-add-day-hours"),ie=document.getElementById("input-add-day-pages");if(xe&&(xe.value=ne),A){const ce=new Date(2026,9,23+ne),_=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];A.value=`${_[ce.getMonth()]} ${ce.getDate()}, ${ce.getFullYear()}`}ye&&(ye.value=`Day ${ne} — Second Unit & Pickups`),Fe&&(Fe.value="Mojave Soundstage 2"),Te&&(Te.value="10"),ie&&(ie.value="0.0"),lt(be)}function G(){we(be)}ee&&(ee.onclick=C),pe&&(pe.onclick=G),Z&&(Z.onclick=G),be&&(be.onclick=ne=>{ne.target===be&&G()}),ve&&(ve.onsubmit=async ne=>{ne.preventDefault();const xe=Number(document.getElementById("input-add-day-num")?.value)||l.length+1,A=document.getElementById("input-add-day-date")?.value||`Shoot Day ${xe}`,ye=document.getElementById("input-add-day-title")?.value||`Day ${xe}`,Fe=document.getElementById("input-add-day-location")?.value||"Location TBD",Te=Number(document.getElementById("input-add-day-hours")?.value)||10,ie=document.getElementById("input-add-day-pages")?.value||"0.0";await Fo(o,{dayNumber:xe,title:ye,date:A,location:Fe,estHours:Te,totalPages:ie,sceneNumbers:[]}),l=await Pt(o),G(),S(`Added Shoot Day ${xe} (${A})`),m()}),m();const $e=n.get("sceneId")||n.get("scene");$e&&J($e)}const yi={};function Bt(e){return`data:image/svg+xml;utf8,${encodeURIComponent(e.trim())}`}function vi(){return Bt(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <pattern id="comic-dots" width="8" height="8" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="4" r="1.5" fill="#facc15" opacity="0.6"/>
    </pattern>
    <linearGradient id="comic-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#fde047"/>
    </linearGradient>
  </defs>
  <rect width="400" height="225" fill="url(#comic-sky)"/>
  <rect width="400" height="225" fill="url(#comic-dots)"/>
  
  <!-- Comic City Backdrop -->
  <polygon points="20,160 20,90 60,70 90,90 90,160" fill="#f43f5e" stroke="#000" stroke-width="3"/>
  <polygon points="90,160 90,60 140,50 170,70 170,160" fill="#3b82f6" stroke="#000" stroke-width="3"/>
  <polygon points="260,160 260,80 310,70 330,90 330,160" fill="#10b981" stroke="#000" stroke-width="3"/>
  
  <!-- Ground -->
  <rect x="0" y="160" width="400" height="65" fill="#e2e8f0" stroke="#000" stroke-width="3"/>
  
  <!-- Running Comic Hero (Blue shirt, dynamic pose) -->
  <g stroke="#000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Action Speedlines -->
    <line x1="80" y1="120" x2="150" y2="120" stroke="#000" stroke-width="2" stroke-dasharray="8 6"/>
    <line x1="90" y1="140" x2="160" y2="140" stroke="#000" stroke-width="2" stroke-dasharray="10 5"/>
    <!-- Head -->
    <ellipse cx="230" cy="85" rx="16" ry="18" fill="#fed7aa"/>
    <path d="M 218 80 Q 230 65 244 76" fill="#78350f"/>
    <!-- Torso (Blue Jacket) -->
    <path d="M 220 102 L 195 130 L 235 145 L 245 105 Z" fill="#2563eb"/>
    <!-- Arms running -->
    <path d="M 220 105 L 180 115 L 175 105" fill="none" stroke="#2563eb" stroke-width="8"/>
    <path d="M 240 105 L 270 115 L 285 105" fill="none" stroke="#2563eb" stroke-width="8"/>
    <!-- Legs running -->
    <path d="M 210 145 L 185 175 L 160 180" fill="none" stroke="#1e293b" stroke-width="7"/>
    <path d="M 235 145 L 260 175 L 285 190" fill="none" stroke="#1e293b" stroke-width="7"/>
  </g>
  
  <!-- Sound Effect Burst -->
  <polygon points="320,40 335,25 345,45 365,30 360,55 385,60 365,75 380,95 355,85 345,105 335,85 315,95 325,75 305,65 325,55" fill="#facc15" stroke="#000" stroke-width="2.5"/>
  <text x="345" y="68" text-anchor="middle" font-family="Impact, sans-serif" font-size="14" font-weight="bold" fill="#dc2626">POW!</text>
  
  <rect x="0" y="0" width="400" height="225" fill="none" stroke="#000" stroke-width="6"/>
</svg>`)}function wi(){return Bt(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <linearGradient id="cine-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="60%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <radialGradient id="cine-glow" cx="80%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="cine-rim" cx="20%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="225" fill="url(#cine-bg)"/>
  <rect width="400" height="225" fill="url(#cine-glow)"/>
  <rect width="400" height="225" fill="url(#cine-rim)"/>
  
  <!-- City Bokeh / Window Lights -->
  <circle cx="280" cy="70" r="12" fill="#38bdf8" opacity="0.3"/>
  <circle cx="340" cy="90" r="18" fill="#fbbf24" opacity="0.25"/>
  <circle cx="310" cy="110" r="14" fill="#f43f5e" opacity="0.2"/>
  
  <!-- Two Men in Standoff Dialogue (Silhouette + Rim Lighting) -->
  <g>
    <!-- Figure Left -->
    <path d="M 60 225 L 75 130 Q 110 110 130 135 L 145 225 Z" fill="#020617" stroke="#f59e0b" stroke-width="1.8"/>
    <ellipse cx="105" cy="95" rx="22" ry="26" fill="#090d16" stroke="#f59e0b" stroke-width="2"/>
    <!-- Figure Right (Officer / Detective) -->
    <path d="M 230 225 L 245 135 Q 275 110 305 130 L 325 225 Z" fill="#020617" stroke="#38bdf8" stroke-width="2"/>
    <ellipse cx="275" cy="95" rx="22" ry="26" fill="#090d16" stroke="#38bdf8" stroke-width="2"/>
    <!-- Detective Hat Silhouette -->
    <path d="M 245 80 L 305 80 L 295 62 L 255 62 Z" fill="#020617"/>
    <line x1="235" y1="80" x2="315" y2="80" stroke="#38bdf8" stroke-width="2.5"/>
  </g>
  
  <!-- Anamorphic Blue Lens Streak -->
  <line x1="0" y1="100" x2="400" y2="100" stroke="#38bdf8" stroke-width="1.5" opacity="0.5"/>
  <line x1="0" y1="100" x2="400" y2="100" stroke="#ffffff" stroke-width="0.7" opacity="0.8"/>
</svg>`)}function Si(){return Bt(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <pattern id="pencil-hatch" width="6" height="6" patternUnits="userSpaceOnUse">
      <line x1="0" y1="6" x2="6" y2="0" stroke="#a1a1aa" stroke-width="0.8" opacity="0.4"/>
    </pattern>
  </defs>
  <rect width="400" height="225" fill="#fbfbfa"/>
  
  <!-- Basketball Court lines -->
  <line x1="20" y1="180" x2="380" y2="180" stroke="#a1a1aa" stroke-width="1.2"/>
  <ellipse cx="200" cy="180" rx="90" ry="25" fill="none" stroke="#d4d4d8" stroke-width="1"/>
  
  <!-- Basketball Hoop on Right -->
  <line x1="330" y1="180" x2="330" y2="60" stroke="#71717a" stroke-width="2.5"/>
  <rect x="310" y="50" width="30" height="24" fill="none" stroke="#52525b" stroke-width="1.8"/>
  <line x1="310" y1="74" x2="295" y2="74" stroke="#52525b" stroke-width="2.5"/>
  <polygon points="295,74 310,74 305,95 300,95" fill="none" stroke="#a1a1aa" stroke-width="1" stroke-dasharray="2 2"/>
  
  <!-- Two figures playing basketball (Soft pencil sketchy lines) -->
  <g stroke="#3f3f46" stroke-width="1.8" fill="none">
    <!-- Player 1 dribbling -->
    <circle cx="160" cy="90" r="14" fill="#fafafa"/>
    <path d="M 160 104 L 155 140 L 140 175" stroke-width="2"/>
    <path d="M 155 140 L 175 175" stroke-width="2"/>
    <path d="M 160 115 L 180 135 L 190 155" stroke-width="1.8"/>
    <!-- Ball -->
    <circle cx="192" cy="162" r="9" fill="url(#pencil-hatch)" stroke="#3f3f46" stroke-width="1.5"/>
    
    <!-- Player 2 defending -->
    <circle cx="230" cy="85" r="14" fill="#fafafa"/>
    <path d="M 230 99 L 235 135 L 225 175" stroke-width="2"/>
    <path d="M 235 135 L 250 175" stroke-width="2"/>
    <path d="M 230 110 L 210 100 L 200 90" stroke-width="1.8"/>
  </g>
</svg>`)}function Ei(){return Bt(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <linearGradient id="a3d-room" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffedd5"/>
      <stop offset="50%" stop-color="#fed7aa"/>
      <stop offset="100%" stop-color="#fb923c"/>
    </linearGradient>
    <radialGradient id="a3d-sun" cx="30%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#fde047" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="225" fill="url(#a3d-room)"/>
  
  <!-- Window with Warm Sunbeam Rays -->
  <polygon points="40,20 120,20 280,225 80,225" fill="#fef08a" opacity="0.35"/>
  <rect x="50" y="25" width="65" height="75" fill="#bae6fd" stroke="#fff" stroke-width="4" rx="4"/>
  <line x1="82" y1="25" x2="82" y2="100" stroke="#fff" stroke-width="3"/>
  <line x1="50" y1="62" x2="115" y2="62" stroke="#fff" stroke-width="3"/>
  
  <!-- Teddy Bear on Bed -->
  <g transform="translate(180, 110)">
    <circle cx="20" cy="30" r="16" fill="#b45309"/>
    <circle cx="10" cy="18" r="6" fill="#92400e"/>
    <circle cx="30" cy="18" r="6" fill="#92400e"/>
    <circle cx="20" cy="55" r="22" fill="#d97706"/>
    <ellipse cx="20" cy="32" rx="7" ry="5" fill="#fed7aa"/>
    <circle cx="20" cy="30" r="2.5" fill="#451a03"/>
  </g>
  
  <!-- Animated Little Girl Character (Big expressive 3D animated eyes) -->
  <g transform="translate(280, 80)">
    <circle cx="30" cy="40" r="28" fill="#ffedd5"/>
    <!-- Curly Hair -->
    <circle cx="12" cy="25" r="14" fill="#451a03"/>
    <circle cx="30" cy="15" r="16" fill="#451a03"/>
    <circle cx="48" cy="25" r="14" fill="#451a03"/>
    <!-- Big Anime / Pixar Eyes -->
    <ellipse cx="22" cy="40" rx="6" ry="8" fill="#fff"/>
    <circle cx="23" cy="40" r="4" fill="#6366f1"/>
    <circle cx="24" cy="38" r="1.5" fill="#fff"/>
    <ellipse cx="38" cy="40" rx="6" ry="8" fill="#fff"/>
    <circle cx="39" cy="40" r="4" fill="#6366f1"/>
    <circle cx="40" cy="38" r="1.5" fill="#fff"/>
    <!-- Cute smile -->
    <path d="M 26 54 Q 30 58 34 54" stroke="#e11d48" stroke-width="2" fill="none"/>
    <!-- Dress -->
    <path d="M 12 70 L 48 70 L 56 120 L 4 120 Z" fill="#ec4899" rx="6"/>
  </g>
</svg>`)}function ki(){return Bt(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <linearGradient id="wc-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#bae6fd" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#fed7aa" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#fbcfe8" stop-opacity="0.5"/>
    </linearGradient>
    <linearGradient id="wc-sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.7"/>
      <stop offset="60%" stop-color="#0284c7" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#fde047" stop-opacity="0.4"/>
    </linearGradient>
  </defs>
  <rect width="400" height="225" fill="#fafaf9"/>
  <rect width="400" height="130" fill="url(#wc-sky)"/>
  
  <!-- Watercolor Sea Wash with Soft Edge -->
  <path d="M 0 115 Q 100 110 200 118 T 400 112 L 400 170 Q 280 180 160 165 T 0 175 Z" fill="url(#wc-sea)"/>
  <!-- Shoreline Wet Sand -->
  <path d="M 0 160 Q 150 175 280 165 T 400 180 L 400 225 L 0 225 Z" fill="#fef3c7" opacity="0.8"/>
  
  <!-- Couple Walking on Beach (Soft painterly watercolor silhouettes) -->
  <g opacity="0.75">
    <ellipse cx="185" cy="130" rx="6" ry="8" fill="#b45309"/>
    <path d="M 180 140 L 190 140 L 193 185 L 177 185 Z" fill="#3b82f6"/>
    
    <ellipse cx="205" cy="134" rx="5.5" ry="7" fill="#92400e"/>
    <path d="M 200 143 L 210 143 L 218 185 L 195 185 Z" fill="#f43f5e"/>
    
    <!-- Water reflections -->
    <ellipse cx="185" cy="190" rx="8" ry="2" fill="#93c5fd" opacity="0.5"/>
    <ellipse cx="205" cy="190" rx="8" ry="2" fill="#fbcfe8" opacity="0.5"/>
  </g>
</svg>`)}function Ii(){return Bt(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <radialGradient id="photo-bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#451a03"/>
      <stop offset="50%" stop-color="#1c1917"/>
      <stop offset="100%" stop-color="#0c0a09"/>
    </radialGradient>
  </defs>
  <rect width="400" height="225" fill="url(#photo-bg)"/>
  
  <!-- Cafe Background Bokeh Circles -->
  <circle cx="60" cy="50" r="28" fill="#fef08a" opacity="0.18"/>
  <circle cx="120" cy="80" r="16" fill="#fdba74" opacity="0.22"/>
  <circle cx="320" cy="60" r="35" fill="#fcd34d" opacity="0.15"/>
  <circle cx="360" cy="120" r="20" fill="#f97316" opacity="0.2"/>
  
  <!-- Realistic Woman Drinking from Bottle (Foreground subject in crisp focus) -->
  <g transform="translate(150, 40)">
    <ellipse cx="50" cy="50" rx="30" ry="38" fill="#fed7aa"/>
    <!-- Bob Haircut -->
    <path d="M 20 40 C 15 10 75 10 80 40 C 85 70 82 85 75 90 C 65 60 30 60 25 90 Z" fill="#292524"/>
    <!-- Glass Bottle -->
    <rect x="0" y="55" width="28" height="8" rx="2" fill="#78350f" transform="rotate(-30 14 59)"/>
    <rect x="-8" y="58" width="12" height="4" fill="#a1a1aa" transform="rotate(-30 14 59)"/>
    <!-- Eye & Facial Detail -->
    <path d="M 38 48 Q 44 45 48 49" stroke="#451a03" stroke-width="2" fill="none"/>
    <ellipse cx="44" cy="52" rx="3.5" ry="2.5" fill="#451a03"/>
    <path d="M 30 68 Q 36 72 44 68" stroke="#be123c" stroke-width="3" fill="none"/>
    <!-- Dress Straps -->
    <path d="M 22 95 L 78 95 L 90 160 L 10 160 Z" fill="#18181b"/>
    <line x1="28" y1="88" x2="30" y2="105" stroke="#000" stroke-width="3"/>
    <line x1="72" y1="88" x2="70" y2="105" stroke="#000" stroke-width="3"/>
  </g>
</svg>`)}function Ci(){return Bt(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <filter id="charcoal-blur">
      <feGaussianBlur stdDeviation="1.5"/>
    </filter>
  </defs>
  <rect width="400" height="225" fill="#f4f4f5"/>
  
  <!-- Charcoal Smudged Background Wash -->
  <path d="M 50 40 Q 150 20 300 50 Q 380 90 320 180 Q 200 210 80 180 Z" fill="#71717a" opacity="0.25" filter="url(#charcoal-blur)"/>
  
  <!-- Woman petting dog (Deep charcoal strokes) -->
  <g stroke="#18181b" fill="none">
    <!-- Dog Silhouette with dense charcoal hatching -->
    <ellipse cx="140" cy="140" rx="38" ry="28" fill="#27272a"/>
    <circle cx="110" cy="115" r="18" fill="#18181b"/>
    <!-- Floppy ears -->
    <path d="M 100 110 Q 90 135 105 140" stroke-width="5" stroke="#18181b"/>
    <circle cx="104" cy="114" r="2.5" fill="#fff"/>
    <ellipse cx="94" cy="122" rx="4" ry="3" fill="#000"/>
    
    <!-- Woman sitting and smiling -->
    <ellipse cx="230" cy="90" rx="22" ry="28" fill="#e4e4e7" stroke-width="3"/>
    <!-- Dark charcoal hair -->
    <path d="M 205 90 C 200 55 260 55 255 90 C 258 120 240 130 235 110 Z" fill="#09090b"/>
    <!-- Reaching arm petting dog -->
    <path d="M 215 115 Q 170 115 130 118" stroke-width="4.5" stroke="#27272a"/>
    <path d="M 230 120 L 255 185" stroke-width="5" stroke="#18181b"/>
  </g>
</svg>`)}function Ai(){return Bt(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <linearGradient id="anime-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="60%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
  </defs>
  <rect width="400" height="225" fill="url(#anime-sky)"/>
  
  <!-- Cyberpunk City Skyline with Glowing Windows -->
  <polygon points="10,140 10,60 50,60 50,140" fill="#020617"/>
  <polygon points="60,140 60,30 110,30 110,140" fill="#020617"/>
  <polygon points="120,140 120,80 160,80 160,140" fill="#020617"/>
  <!-- Windows -->
  <circle cx="85" cy="45" r="2" fill="#38bdf8"/>
  <circle cx="95" cy="65" r="2" fill="#f43f5e"/>
  <circle cx="75" cy="85" r="2" fill="#facc15"/>
  
  <!-- Anime Girl (Blonde hair, sharp bangs, blue uniform, cel-shaded) -->
  <g transform="translate(180, 50)">
    <!-- Pointy anime chin -->
    <polygon points="35,35 65,35 50,65" fill="#fde68a" stroke="#000" stroke-width="1.5"/>
    <ellipse cx="50" cy="35" rx="18" ry="16" fill="#fde68a"/>
    <!-- Anime Eye (Large, sharp lashes) -->
    <path d="M 38 32 Q 44 26 50 32" stroke="#020617" stroke-width="2.5" fill="none"/>
    <ellipse cx="44" cy="35" rx="3.5" ry="5" fill="#38bdf8"/>
    <circle cx="45" cy="33" r="1.5" fill="#fff"/>
    <!-- Yellow / Blonde Anime Hair with sharp spiky bangs -->
    <path d="M 28 25 L 34 45 L 42 22 L 52 48 L 58 20 L 70 38 L 72 10 L 25 10 Z" fill="#facc15" stroke="#000" stroke-width="1.8"/>
    <path d="M 72 20 Q 90 50 85 95" stroke="#facc15" stroke-width="10" fill="none"/>
    <!-- Blue school uniform with red ribbon -->
    <path d="M 30 65 L 70 65 L 85 130 L 15 130 Z" fill="#1e3a8a" stroke="#000" stroke-width="2"/>
    <polygon points="46,70 54,70 50,85" fill="#ef4444"/>
  </g>
  
  <!-- Anime Boy in Shadow on Right -->
  <g transform="translate(290, 60)">
    <polygon points="35,35 65,35 50,65" fill="#fed7aa" stroke="#000" stroke-width="1.5"/>
    <!-- Black spiky anime hair -->
    <path d="M 25 20 L 35 38 L 45 15 L 55 40 L 68 18 L 75 35 L 75 5 L 20 5 Z" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
    <!-- Dark Jacket -->
    <path d="M 25 65 L 75 65 L 90 120 L 10 120 Z" fill="#020617"/>
  </g>
</svg>`)}function $i(){return Bt(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <!-- Bright Blue Sky & Crisp Sun -->
  <rect width="400" height="225" fill="#38bdf8"/>
  <circle cx="70" cy="50" r="28" fill="#fde047"/>
  
  <!-- Vector Campus Ground & Building -->
  <rect x="0" y="145" width="400" height="80" fill="#4ade80"/>
  <rect x="260" y="90" width="140" height="55" fill="#f87171" rx="2"/>
  <rect x="280" y="105" width="20" height="18" fill="#ffffff"/>
  <rect x="320" y="105" width="20" height="18" fill="#ffffff"/>
  <rect x="360" y="105" width="20" height="18" fill="#ffffff"/>
  
  <!-- Vector Characters (Clean solid color blocks) -->
  <!-- Kid 1 (Backpack) -->
  <circle cx="100" cy="90" r="14" fill="#78350f"/>
  <rect x="90" y="106" width="20" height="40" fill="#ef4444" rx="3"/>
  <rect x="80" y="110" width="10" height="25" fill="#1e3a8a" rx="4"/>
  <rect x="92" y="146" width="6" height="30" fill="#1e293b"/>
  <rect x="102" y="146" width="6" height="30" fill="#1e293b"/>
  
  <!-- Kid 2 with Phone -->
  <circle cx="145" cy="92" r="14" fill="#fbcfe8"/>
  <rect x="135" y="108" width="20" height="38" fill="#ffffff" rx="3"/>
  <rect x="145" y="120" width="8" height="14" fill="#0284c7" rx="1"/>
  <rect x="137" y="146" width="6" height="30" fill="#2563eb"/>
  <rect x="147" y="146" width="6" height="30" fill="#2563eb"/>
  
  <!-- Teacher gesturing -->
  <circle cx="210" cy="80" r="15" fill="#fed7aa"/>
  <polygon points="195,96 225,96 235,160 185,160" fill="#1e1b4b"/>
  <line x1="200" y1="105" x2="165" y2="115" stroke="#1e1b4b" stroke-width="5" stroke-linecap="round"/>
</svg>`)}function Bi(){return Bt(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <radialGradient id="noir-light" cx="30%" cy="15%" r="70%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Deep Jet Black Base -->
  <rect width="400" height="225" fill="#000000"/>
  
  <!-- Streetlamp Cone Beam -->
  <polygon points="120,0 260,225 30,225" fill="url(#noir-light)"/>
  
  <!-- Wet Asphalt Street Reflections -->
  <line x1="40" y1="180" x2="160" y2="180" stroke="#ffffff" stroke-width="1.5" opacity="0.4"/>
  <line x1="80" y1="195" x2="220" y2="195" stroke="#ffffff" stroke-width="2" opacity="0.3"/>
  <line x1="120" y1="210" x2="280" y2="210" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  
  <!-- Woman Crying on Street Curb (Chiaroscuro Silhouette) -->
  <g transform="translate(160, 75)">
    <!-- Head leaning down with flowing dark hair -->
    <ellipse cx="40" cy="35" rx="18" ry="24" fill="#ffffff"/>
    <path d="M 22 15 Q 40 45 35 65 Q 15 45 18 15 Z" fill="#000000"/>
    <!-- Intense shadow covering half face -->
    <path d="M 40 12 L 40 58 Q 58 55 56 35 Z" fill="#000000"/>
    <!-- Slumped shoulders and leather jacket -->
    <path d="M 15 58 L 65 58 L 75 125 L 5 125 Z" fill="#18181b" stroke="#ffffff" stroke-width="1.8"/>
  </g>
  
  <!-- Film Noir Film Border -->
  <rect x="0" y="0" width="400" height="225" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
</svg>`)}function Ni(){return Bt(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <rect width="400" height="225" fill="#ffffff"/>
  
  <!-- Room Horizon line -->
  <line x1="20" y1="170" x2="380" y2="170" stroke="#000000" stroke-width="2.5"/>
  <!-- Minimalist picture frame on wall -->
  <rect x="60" y="45" width="50" height="40" fill="none" stroke="#000000" stroke-width="2"/>
  <line x1="75" y1="70" x2="95" y2="55" stroke="#000000" stroke-width="1.5"/>
  
  <!-- Couple in minimal line art (Stylized expressive stick figures) -->
  <g stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <!-- Figure 1 (Female on Left) -->
    <circle cx="170" cy="85" r="16" fill="#ffffff"/>
    <!-- Ponytail hair -->
    <path d="M 156 85 Q 140 90 145 105" stroke-width="2.5"/>
    <line x1="170" y1="101" x2="175" y2="145"/>
    <!-- Arms embracing -->
    <path d="M 172 115 L 195 125 L 210 115"/>
    <!-- Legs -->
    <line x1="175" y1="145" x2="165" y2="170"/>
    <line x1="175" y1="145" x2="182" y2="170"/>
    
    <!-- Figure 2 (Male on Right) -->
    <circle cx="215" cy="85" r="16" fill="#ffffff"/>
    <!-- Curly hair spikes -->
    <path d="M 215 69 Q 225 65 230 75 Q 235 85 231 92" stroke-width="2"/>
    <line x1="215" y1="101" x2="210" y2="145"/>
    <!-- Arms embracing -->
    <path d="M 213 115 L 190 120 L 175 112"/>
    <!-- Legs -->
    <line x1="210" y1="145" x2="205" y2="170"/>
    <line x1="210" y1="145" x2="225" y2="170"/>
  </g>
  
  <!-- Floating Heart above -->
  <path d="M 192 65 C 192 58 184 55 184 62 C 184 70 192 75 192 78 C 192 75 200 70 200 62 C 200 55 192 58 192 65 Z" fill="#ef4444"/>
</svg>`)}function Ti(){return Bt(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <linearGradient id="gn-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#451a03"/>
      <stop offset="50%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
  </defs>
  <rect width="400" height="225" fill="url(#gn-bg)"/>
  
  <!-- Venetian Blind Window Shadows in Warm Orange -->
  <g fill="#f59e0b" opacity="0.3">
    <polygon points="220,20 400,20 380,35 200,35"/>
    <polygon points="190,50 370,50 350,65 170,65"/>
    <polygon points="160,80 340,80 320,95 140,95"/>
    <polygon points="130,110 310,110 290,125 110,125"/>
  </g>
  
  <!-- Detectives on Leather Sofa (Stark black and white shadow blocking) -->
  <g stroke="#000000" stroke-width="2.5">
    <!-- Sofa -->
    <rect x="40" y="130" width="320" height="55" rx="6" fill="#18181b" stroke="#ffffff" stroke-width="1.5"/>
    
    <!-- Detective Woman (Blonde, Suit, Stark Shadows) -->
    <path d="M 90 85 L 115 85 L 105 110 Z" fill="#ffffff"/>
    <path d="M 75 105 L 125 105 L 135 160 L 65 160 Z" fill="#000000" stroke="#ffffff" stroke-width="2"/>
    <polygon points="95,110 105,110 100,125" fill="#f59e0b"/>
    
    <!-- Detective Man (Cigarette / Drink, Deep Shadows) -->
    <path d="M 270 80 L 295 80 L 285 105 Z" fill="#fed7aa"/>
    <path d="M 250 100 L 315 100 L 330 160 L 240 160 Z" fill="#000000" stroke="#ffffff" stroke-width="2"/>
  </g>
  
  <!-- Harsh Graphic Novel Border -->
  <rect x="0" y="0" width="400" height="225" fill="none" stroke="#000000" stroke-width="6"/>
</svg>`)}const kn=typeof import.meta<"u"&&yi?"/Scriptora/":"/",_e=kn.endsWith("/")?kn:`${kn}/`,Rs=[{id:"Comic",name:"Comic",tagline:"Bold Ink & Halftone Dots",description:"Classic action comic illustration with thick outlines, halftone Ben-Day dots, and vibrant desert palette.",previewImage:`${_e}assets/styles/comic.jpg`,fallbackSvg:vi()},{id:"Cinematic",name:"Cinematic",tagline:"35mm Film Still",description:"Atmospheric 35mm film still with moody natural lighting, shallow depth of field, and filmic grain.",previewImage:`${_e}assets/styles/cinematic-realism.jpg`,fallbackSvg:wi()},{id:"Soft Pencil",name:"Soft Pencil",tagline:"Light Graphite & Fine Shading",description:"Delicate graphite pencil drawing on clean off-white paper with soft tonal cross-hatching.",previewImage:`${_e}assets/styles/soft-pencil.jpg`,fallbackSvg:Si()},{id:"Animation 3D",name:"Animation 3D",tagline:"Pixar / Studio 3D CGI",description:"Warm 3D rendered character animation with soft volumetric lighting and expressive stylized anatomy.",previewImage:`${_e}assets/styles/animation-3d.jpg`,fallbackSvg:Ei()},{id:"Watercolor Paint",name:"Watercolor Paint",tagline:"Pastel Pigments & Fluid Wash",description:"Artistic watercolor wash on textured paper with soft bleeding pigments and dreamy translucent hues.",previewImage:`${_e}assets/styles/watercolor-paint.jpg`,fallbackSvg:ki()},{id:"Photo / Commercial",name:"Photo / Commercial",tagline:"Sharp Advertising Photography",description:"Commercial editorial photography with razor-sharp lens focus, natural daylight, and bokeh.",previewImage:`${_e}assets/styles/photorealistic.jpg`,fallbackSvg:Ii()},{id:"Charcoal Sketch",name:"Charcoal Sketch",tagline:"Smudged Shadows & Rich Charcoal",description:"Dramatic expressive charcoal drawing with deep velvety blacks, smudged shadows, and coarse tooth paper.",previewImage:`${_e}assets/styles/charcoal-sketch.jpg`,fallbackSvg:Ci()},{id:"Dark Anime",name:"Dark Anime",tagline:"Cyberpunk Cel-Shading",description:"Japanese anime aesthetic with sharp cel-shaded lines, intense city backlight, and glowing neon rim.",previewImage:`${_e}assets/styles/dark-anime.jpg`,fallbackSvg:Ai()},{id:"Flat / Vector",name:"Flat / Vector",tagline:"Clean 2D Vector Art",description:"Modern editorial 2D vector art with bold flat silhouettes, vibrant solid colors, and clean geometry.",previewImage:`${_e}assets/styles/flat-vector.jpg`,fallbackSvg:$i()},{id:"Noir",name:"Noir",tagline:"High-Contrast Chiaroscuro",description:"Classic black-and-white film noir with stark shadows, dramatic streetlights, and rainy street reflections.",previewImage:`${_e}assets/styles/noir.jpg`,fallbackSvg:Bi()},{id:"Stick Figure",name:"Stick Figure",tagline:"Minimalist Modern Line Art",description:"Clean minimalist black line art with whimsical expressive poses and uncluttered white space.",previewImage:`${_e}assets/styles/stick-figure.jpg`,fallbackSvg:Ni()},{id:"Graphic Novel",name:"Graphic Novel",tagline:"Gritty Stark Shadow Blocking",description:"High-contrast graphic novel panel with heavy ink shadows and dramatic amber and violet duotone.",previewImage:`${_e}assets/styles/graphic-novel.jpg`,fallbackSvg:Ti()}];function It(e,t=""){if(!e||typeof e!="string")return`${_e}assets/storyboard/shot_1a_wide_outpost.jpg`;if(e.startsWith("data:image/svg+xml")&&(e.includes("assets/storyboard")||e.includes("assets%2Fstoryboard")))try{const n=decodeURIComponent(e).match(/assets\/storyboard\/([a-zA-Z0-9_.-]+)/);if(n&&n[1])return`${_e}assets/storyboard/${n[1]}`}catch{}if(e.startsWith("data:image/svg+xml")&&(e.includes("<rect")||e.includes("<svg")||e.includes("fill="))&&!e.includes("<image")){const s=`${e} ${t}`.toUpperCase();return s.includes("1B")||s.includes("TWO-SHOT")||s.includes("TWO SHOT")?`${_e}assets/storyboard/shot_1b_two_shot_standoff.jpg`:s.includes("1C")||s.includes("CLOSE-UP")||s.includes("CLOSE UP")?`${_e}assets/storyboard/shot_1c_closeup_reaction.jpg`:s.includes("1D")||s.includes("MACRO")||s.includes("INSERT")?`${_e}assets/storyboard/shot_1d_macro_insert.jpg`:s.includes("10A")||s.includes("VALVE")?`${_e}assets/storyboard/shot_10a_valve_breach.jpg`:s.includes("10B")||s.includes("PUMPING")||s.includes("HALL")?`${_e}assets/storyboard/shot_10b_pumping_hall.jpg`:`${_e}assets/storyboard/shot_1a_wide_outpost.jpg`}if(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:image/png")||e.startsWith("data:image/jpeg"))return e;if(e.includes("assets/storyboard/")||e.includes("assets/styles/")){const s=e.replace(/^\/?(Scriptora\/)?/,"");return`${_e}${s}`}return e}function Ms(e){const t=(e||"").trim().toLowerCase();return Rs.find(s=>{const n=s.id.toLowerCase(),o=s.name.toLowerCase();return n===t||o===t||t.includes(n)||n.includes(t)||t.includes("comic")&&n.includes("comic")||t.includes("cine")&&n.includes("cinematic")||t.includes("pencil")&&n.includes("pencil")||t.includes("3d")&&n.includes("3d")||t.includes("water")&&n.includes("water")||t.includes("photo")&&n.includes("photo")||t.includes("charcoal")&&n.includes("charcoal")||t.includes("anime")&&n.includes("anime")||t.includes("vector")&&n.includes("vector")||t.includes("noir")&&n.includes("noir")||t.includes("stick")&&n.includes("stick")||t.includes("graphic")&&n.includes("graphic")})||Rs[2]}const Pi=["Establishing Shot","Action Shot","Reaction Shot","Dialogue Shot","Insert / Detail Shot","Transition Shot"],ma=["Extreme Wide","Wide","Medium","Close-up","Extreme Close-up"],fa=["Eye Level","Low Angle","High Angle","Bird's Eye View","Over-the-Shoulder","Dutch Angle"],In=["2.39:1","16:9","4:3","9:16"],Li=["Static","Pan","Tilt","Tracking","Dolly"],xa=["24mm","35mm","50mm","85mm"],ga=["Auto / Scene-based","Daylight","Night","Golden Hour","Low-key","Backlit"],Di=["Left to Right","Right to Left","Static"],ba=["Comic","Cinematic","Soft Pencil","Animation 3D","Watercolor Paint","Photo / Commercial","Charcoal Sketch","Dark Anime","Flat / Vector","Noir","Stick Figure","Graphic Novel","Concept Art","Cinematic Realism","Storyboard Sketch","Photorealistic"],Ri=["Standard Draft","High Definition Production"];function Mi(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=t||s.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",o=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${dt("Pre-Production","Storyboard Studio")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3.5 fade-in">
        <!-- SubNav with Title, Project Context & Primary Actions -->
        ${Hs("Storyboard Studio","art_track",o||"/production",`
          <div class="flex items-center gap-2">
            <button id="btn-export-storyboard-pdf" class="w-8 h-8 sm:w-auto sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0" title="Export genuine Storyboard Studio PDF" aria-label="Export PDF">
              <span class="material-symbols-outlined text-[17px]">download</span>
              <span class="hidden sm:inline">Export PDF</span>
            </button>
            <button id="btn-storyboard-preferences" class="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-2xs transition-all cursor-pointer shrink-0" title="Storyboard Preferences & Defaults" aria-label="Preferences">
              <span class="material-symbols-outlined text-[18px]">tune</span>
            </button>
            <button id="btn-storyboard-recycle-bin" class="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-2xs transition-all cursor-pointer shrink-0 relative" title="Recycle Bin" aria-label="Recycle Bin">
              <span class="material-symbols-outlined text-[18px]">delete_outline</span>
              <span id="recycle-bin-badge" class="hidden absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[9px] font-bold leading-tight">0</span>
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

      <!-- ===================================================================== -->
      <!-- MODAL 1: FRAME DETAIL & INSPECTOR DRAWER -->
      <!-- ===================================================================== -->
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
                <span class="text-[10px] text-slate-500">Tap Generate or Import Photo below</span>
              </div>
              <div id="modal-image-loading" class="hidden absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-white">
                <span class="w-6 h-6 border-2 border-white/40 border-t-blue-500 rounded-full animate-spin"></span>
                <span class="text-xs font-semibold">Generating shot visual...</span>
              </div>
            </div>

            <!-- Image Generation & Import Actions -->
            <div class="grid grid-cols-2 gap-2">
              <button type="button" id="modal-btn-generate-action" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 active:scale-[0.99] text-xs font-semibold cursor-pointer transition-all">
                <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span id="modal-generate-action-label" class="truncate">Generate Image</span>
              </button>
              <label class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-[0.99] text-xs font-semibold cursor-pointer transition-all">
                <span class="material-symbols-outlined text-[16px]">upload</span>
                <span class="truncate">Import Photo</span>
                <input type="file" id="modal-file-import" accept="image/*" class="sr-only" />
              </label>
            </div>

            <!-- Post-Generation Review & History Actions Bar (4 Icon Buttons, No Text to Prevent Overflow) -->
            <div id="modal-post-gen-actions" class="hidden grid grid-cols-4 gap-2 p-1.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <button type="button" id="modal-btn-view-fullscreen" title="Inspect Fullscreen" aria-label="Inspect Fullscreen" class="h-9 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-slate-50 active:scale-95 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-2xs">
                <span class="material-symbols-outlined text-[18px]">fullscreen</span>
              </button>
              <button type="button" id="modal-btn-open-history" title="Version History" aria-label="Version History" class="h-9 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-slate-50 active:scale-95 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-2xs relative">
                <span class="material-symbols-outlined text-[18px]">history</span>
                <span id="modal-history-count" class="sr-only">0</span>
              </button>
              <button type="button" id="modal-btn-toggle-approve" title="Approve Frame" aria-label="Approve Frame" class="h-9 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 active:scale-95 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-2xs">
                <span class="material-symbols-outlined text-[18px]">check</span>
                <span id="modal-approve-toggle-label" class="sr-only">Approve</span>
              </button>
              <button type="button" id="modal-btn-toggle-reject" title="Reject Frame" aria-label="Reject Frame" class="h-9 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 active:scale-95 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-2xs">
                <span class="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>

          <!-- Form Fields (Organized into 3 Structured Sections) -->
          <form id="shot-detail-form" class="flex flex-col gap-3.5">
            <!-- SECTION A: SHOT IDENTITY -->
            <div class="rounded-2xl border border-slate-200/90 p-3.5 bg-slate-50/50 flex flex-col gap-3">
              <div class="flex items-center justify-between border-b border-slate-200/70 pb-2">
                <div class="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span>Section A — Shot Identity</span>
                </div>
                <div class="flex items-center gap-1.5 font-mono text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded-lg border border-slate-200/80">
                  <span class="text-slate-400 font-normal">Index:</span>
                  <span id="display-shot-number" class="font-bold text-blue-600">1A</span>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div class="flex flex-col gap-1 sm:col-span-2">
                  <label class="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                    <span>Shot Title</span>
                    <span class="text-rose-500 font-bold">*</span>
                  </label>
                  <input type="text" id="input-shot-title" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 bg-white shadow-2xs" placeholder="e.g. Guard tower silhouette at sunset" required />
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-semibold text-slate-700">Shot Type <span class="text-slate-400 font-normal">(Optional)</span></label>
                  <select id="input-shot-type" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs">
                    <option value="">None / Custom</option>
                    ${Pi.map(a=>`<option value="${a}">${a}</option>`).join("")}
                  </select>
                </div>
              </div>
              <input type="hidden" id="input-shot-number" value="1A" />
            </div>

            <!-- SECTION B: VISUAL DIRECTION -->
            <div class="rounded-2xl border border-slate-200/90 p-3.5 bg-slate-50/50 flex flex-col gap-3">
              <div class="flex items-center justify-between border-b border-slate-200/70 pb-2">
                <div class="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span>Section B — Visual Direction</span>
                </div>
                <span class="text-[10px] text-slate-500 font-medium">Primary Creative Input</span>
              </div>

              <!-- Visual Description -->
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Visual Description</label>
                <textarea id="input-shot-desc" rows="3" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 bg-white leading-relaxed shadow-2xs" placeholder="Describe framing, blocking, key visual action, lighting, characters, and environmental atmosphere..."></textarea>
              </div>

              <!-- Visual Style Image Preview Cards (12 Artistic Styles) -->
              <div class="flex flex-col gap-1.5 mt-0.5">
                <div class="flex items-center justify-between">
                  <label class="text-[11px] font-semibold text-slate-700">Visual Style — Select Treatment</label>
                  <span class="text-[10px] text-slate-500">Choose from 12 visual art styles</span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-[260px] overflow-y-auto pr-1" id="style-preview-cards-container">
                  ${Rs.map(a=>`
                    <button type="button" class="style-preview-card text-left p-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all cursor-pointer flex flex-col gap-1.5 group relative" data-style-id="${a.id}">
                      <div class="w-full aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-100 relative">
                        <img src="${a.previewImage}" onerror="this.onerror=null; this.src='${a.fallbackSvg}';" alt="${a.name}" class="w-full h-full object-cover" />
                        <div class="style-check-badge hidden absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                          <span class="material-symbols-outlined text-[11px] font-bold">check</span>
                        </div>
                      </div>
                      <div>
                        <div class="text-[11px] font-bold text-slate-900 group-hover:text-blue-600 leading-tight">${a.name}</div>
                        <div class="text-[9px] text-slate-500 line-clamp-2 leading-tight mt-0.5">${a.description}</div>
                      </div>
                    </button>
                  `).join("")}
                </div>
                <input type="hidden" id="input-shot-style" value="Concept Art" />
              </div>
            </div>

            <!-- SECTION C: CAMERA & COMPOSITION -->
            <div class="rounded-2xl border border-slate-200/90 p-3.5 bg-slate-50/50 flex flex-col gap-3">
              <div class="flex items-center justify-between border-b border-slate-200/70 pb-2">
                <div class="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span>Section C — Camera & Composition</span>
                </div>
                <span class="text-[10px] text-slate-500 font-medium">Filmmaking Controls</span>
              </div>

              <!-- Primary Camera Controls: Shot Size, Camera Angle, Aspect Ratio -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div class="flex flex-col gap-1">
                  <label class="text-[10px] font-semibold text-slate-600 uppercase">Shot Size</label>
                  <select id="input-shot-size" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs">
                    ${ma.map(a=>`<option value="${a}">${a}</option>`).join("")}
                  </select>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[10px] font-semibold text-slate-600 uppercase">Camera Angle</label>
                  <select id="input-shot-angle" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs">
                    ${fa.map(a=>`<option value="${a}">${a}</option>`).join("")}
                  </select>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[10px] font-semibold text-slate-600 uppercase">Aspect Ratio</label>
                  <select id="input-shot-ratio" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs">
                    ${In.map(a=>`<option value="${a}">${a}</option>`).join("")}
                  </select>
                </div>
              </div>

              <!-- Collapsible More Camera Settings -->
              <div class="border border-slate-200/80 rounded-xl overflow-hidden bg-white mt-1 shadow-2xs">
                <button type="button" id="btn-toggle-more-camera" class="w-full px-3 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[16px] text-blue-600">tune</span>
                    <span>More Camera Settings</span>
                    <span class="text-[10px] text-slate-400 font-normal">(Movement, Lens, Lighting, Direction)</span>
                  </div>
                  <span id="more-camera-chevron" class="material-symbols-outlined text-[18px] text-slate-400 transition-transform">expand_more</span>
                </button>
                <div id="more-camera-panel" class="hidden p-3 border-t border-slate-200/60 bg-slate-50/50 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-semibold text-slate-500 uppercase">Camera Movement</label>
                    <select id="input-shot-movement" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                      ${Li.map(a=>`<option value="${a}">${a}</option>`).join("")}
                    </select>
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-semibold text-slate-500 uppercase">Lens</label>
                    <select id="input-shot-focal" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                      ${xa.map(a=>`<option value="${a}">${a}</option>`).join("")}
                    </select>
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-semibold text-slate-500 uppercase">Lighting</label>
                    <select id="input-shot-lighting" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                      ${ga.map(a=>`<option value="${a}">${a}</option>`).join("")}
                    </select>
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-semibold text-slate-500 uppercase">Screen Direction</label>
                    <select id="input-shot-direction" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                      ${Di.map(a=>`<option value="${a}">${a}</option>`).join("")}
                    </select>
                  </div>
                </div>
              </div>

              <!-- Notes & Approval -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-0.5">
                <div class="flex flex-col gap-1">
                  <label class="text-[10px] font-semibold text-slate-600 uppercase">Director & Continuity Notes</label>
                  <input type="text" id="input-shot-notes" placeholder="Notes for camera operator, props, or costumes..." class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 bg-white" />
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[10px] font-semibold text-slate-600 uppercase">Approval State</label>
                  <select id="input-shot-approval" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-semibold">
                    <option value="draft">Draft</option>
                    <option value="proposed">Proposed (Needs Review)</option>
                    <option value="approved">Approved for Production</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
              <button type="button" id="modal-btn-delete-shot" class="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">delete</span>
                <span>Move to Recycle Bin</span>
              </button>
              <div class="flex items-center gap-2">
                <button type="button" id="modal-btn-cancel-shot" class="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer">Cancel</button>
                <button type="submit" id="modal-btn-save-shot" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- MODAL 2: AI GENERATION & PROVIDER SELECTION MODAL -->
      <!-- ===================================================================== -->
      <div id="ai-generate-modal" class="scriptora-modal-overlay fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-2xl w-full p-4 sm:p-5 flex flex-col gap-3.5 max-h-[92vh] overflow-y-auto">
          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-xl">auto_awesome</span>
              <h3 id="gen-modal-title" class="font-heading font-bold text-sm text-slate-900">Generate Scene Shot Sequence</h3>
            </div>
            <button id="gen-modal-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <!-- Scene Context Strip -->
          <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-2.5 text-xs text-blue-900 flex flex-col gap-1">
            <div class="flex items-center justify-between font-semibold">
              <span id="gen-scene-heading-display">SCENE 1</span>
              <span id="gen-scene-cast-display" class="text-blue-700 font-mono text-[11px]">Cast: KEVIN, MARCUS</span>
            </div>
            <p id="gen-scene-snippet-display" class="italic text-slate-600 text-[11px] line-clamp-2">Loading scene context...</p>
          </div>

          <!-- STEP 1: CONFIGURATION VIEW -->
          <div id="gen-step-config" class="flex flex-col gap-3">
            <!-- Shot Sequence Length Selection Control (1 to 4 shots) -->
            <div id="gen-shot-count-container" class="flex flex-col gap-1">
              <label for="gen-shot-count-select" class="text-[11px] font-semibold text-slate-700">Shot Sequence Length (Coverage Beats)</label>
              <select id="gen-shot-count-select" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600">
                <option value="1">1-Shot Sequence (Single Establishing / Climax)</option>
                <option value="2">2-Shot Sequence (Master + Coverage)</option>
                <option value="3">3-Shot Sequence (Establishing + Two-Shot + Close-Up)</option>
                <option value="4" selected>4-Shot Sequence (Full Scene Coverage)</option>
              </select>
            </div>

            <!-- Provider Selector -->
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Image Generation Provider</label>
              <select id="gen-provider-select" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600">
                <option value="scriptora-concept">SCRIPTORA Concept Engine (Free / Built-in)</option>
                <option value="gemini-imagen3">Google Imagen 3 (Paid API)</option>
                <option value="stability-sdxl">Stability AI SDXL (Paid API)</option>
                <option value="openai-dalle3">OpenAI DALL-E 3 (Paid API)</option>
              </select>
              <div id="gen-provider-status" class="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Configured & Ready</span>
              </div>
            </div>

            <!-- Cost Disclosure Banner -->
            <div id="gen-cost-disclosure" class="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-xs text-slate-700 flex items-start gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-0.5">info</span>
              <div class="flex-1">
                <span class="font-semibold text-slate-800">Cost Disclosure: </span>
                <span id="gen-cost-label">Free (Built-in Concept Engine, no charges).</span>
              </div>
            </div>

            <!-- Visual Style Selection: Selected Style Card with Popup Trigger -->
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <label class="text-[11px] font-semibold text-slate-700">Visual Art Style</label>
                <button type="button" id="btn-browse-all-styles" class="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer transition-colors">
                  <span>Browse All Styles (${Rs.length})</span>
                  <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
              
              <!-- Active Style Summary Card (Clicking opens style gallery popup) -->
              <div id="gen-active-style-card" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:border-blue-500 hover:bg-blue-50/30 cursor-pointer transition-all flex items-center gap-3 group shadow-2xs">
                <div class="w-20 aspect-video rounded-lg overflow-hidden bg-slate-200 border border-slate-200 shrink-0 relative">
                  <img id="gen-active-style-img" src="${Ms("Soft Pencil").previewImage}" onerror="this.onerror=null; this.src='${Ms("Soft Pencil").fallbackSvg}';" alt="Active style" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <span id="gen-active-style-name" class="text-xs font-bold text-slate-900 group-hover:text-blue-600">Soft Pencil</span>
                    <span class="px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 font-semibold text-[9px]">Active</span>
                  </div>
                  <p id="gen-active-style-desc" class="text-[10px] text-slate-500 line-clamp-1 mt-0.5">Delicate graphite pencil drawing with soft tonal shading</p>
                </div>
                <button type="button" id="btn-change-style-action" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 group-hover:border-blue-400 group-hover:text-blue-600 text-slate-700 font-bold text-[10px] tracking-wide uppercase shadow-2xs flex items-center gap-1 cursor-pointer">
                  <span>Change</span>
                  <span class="material-symbols-outlined text-[12px]">chevron_right</span>
                </button>
              </div>
              <input type="hidden" id="gen-style-select" value="Soft Pencil" />
            </div>

            <!-- Image Quality and Aspect Ratio Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Image Quality</label>
                <select id="gen-quality-select" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${Ri.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Aspect Ratio</label>
                <select id="gen-ratio-select" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${In.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
            </div>

            <!-- Creative Direction & Image Prompt (Mandatory) -->
            <div class="flex flex-col gap-1">
              <div class="flex items-center justify-between">
                <label class="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                  <span>Creative Direction / Image Prompt</span>
                  <span class="text-rose-500 font-bold">*</span>
                </label>
                <span class="text-[10px] font-medium text-rose-500 uppercase tracking-wide">Mandatory</span>
              </div>
              <textarea id="gen-prompt-input" rows="2" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 transition-colors" placeholder="Describe visual framing, lighting, atmosphere, subjects, and key action (mandatory)..." required></textarea>
            </div>

            <!-- Generation Error Alert -->
            <div id="gen-error-alert" class="hidden bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-xs text-rose-800 flex items-start gap-2">
              <span class="material-symbols-outlined text-rose-600 text-[16px] shrink-0 mt-0.5">error</span>
              <div class="flex-1 text-[11px] leading-relaxed" id="gen-error-message">Provider error</div>
            </div>

            <!-- Bottom Actions -->
            <div class="flex items-center justify-end gap-2 pt-2.5 border-t border-slate-100">
              <button type="button" id="gen-modal-cancel" class="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
              <button type="button" id="gen-btn-start" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span id="gen-submit-label">Generate 4-Shot Sequence</span>
              </button>
            </div>
          </div>

          <!-- ===================================================================== -->
          <!-- STEP 1B: VISUAL STYLE GALLERY POPUP VIEW (FORWARD & BACKWARD ROUTE)  -->
          <!-- ===================================================================== -->
          <div id="gen-step-styles" class="hidden flex flex-col gap-3">
            <!-- Navigation Header with Back Route -->
            <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <button type="button" id="btn-back-to-gen-config" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer transition-colors shadow-2xs">
                <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Back to Settings</span>
              </button>
              <div class="text-right">
                <span class="text-xs font-bold text-slate-900 block">Choose Art Style</span>
                <span class="text-[10px] text-slate-500">Click any style to select & return</span>
              </div>
            </div>

            <!-- 4-Column Responsive Grid matching User Reference Image -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[58vh] overflow-y-auto pr-1" id="gen-all-styles-grid">
              ${Rs.map(a=>`
                <button type="button" class="gen-style-gallery-card text-center p-2 rounded-xl border border-slate-200 hover:border-blue-400 bg-white transition-all cursor-pointer flex flex-col gap-1.5 group relative shadow-2xs" data-style-id="${a.id}">
                  <div class="w-full aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200/80 relative">
                    <img src="${a.previewImage}" onerror="this.onerror=null; this.src='${a.fallbackSvg}';" alt="${a.name}" class="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300" />
                    <div class="gen-style-gallery-check hidden absolute top-1 right-1 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                      <span class="material-symbols-outlined text-[13px] font-bold">check</span>
                    </div>
                  </div>
                  <div class="text-[11px] font-bold text-slate-800 group-hover:text-blue-600 truncate px-1">${a.name}</div>
                </button>
              `).join("")}

              <!-- Add your own art style (+) Card -->
              <button type="button" id="btn-custom-style-card" class="text-center p-2 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50/60 hover:bg-blue-50/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 min-h-[115px] group">
                <div class="w-8 h-8 rounded-full bg-white border border-slate-200 group-hover:border-blue-300 text-slate-500 group-hover:text-blue-600 flex items-center justify-center shadow-2xs">
                  <span class="material-symbols-outlined text-lg font-bold">add</span>
                </div>
                <div class="text-[11px] font-bold text-slate-700 group-hover:text-blue-600 flex items-center gap-0.5 justify-center">
                  <span>Add your own art style</span>
                  <span class="material-symbols-outlined text-[12px] text-slate-400">info</span>
                </div>
              </button>
            </div>

            <!-- Custom Art Style Input Drawer (Revealed when clicking +) -->
            <div id="gen-custom-style-drawer" class="hidden bg-blue-50/80 border border-blue-200 rounded-xl p-3 flex flex-col gap-2">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-blue-900">Define Custom Art Style</span>
                <button type="button" id="btn-cancel-custom-style" class="text-slate-500 hover:text-slate-700 text-[11px] font-medium cursor-pointer">Cancel</button>
              </div>
              <input type="text" id="input-custom-style-name" class="w-full px-3 py-1.5 text-xs border border-blue-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:border-blue-600" placeholder="e.g. 1970s Vintage Film, Claymation, Cyberpunk Manga, Oil on Canvas..." />
              <button type="button" id="btn-apply-custom-style" class="self-end px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-2xs">
                Apply Custom Style
              </button>
            </div>
          </div>

          <!-- STEP 2: GENERATION PROGRESS VIEW -->
          <div id="gen-step-progress" class="hidden flex flex-col items-center justify-center py-10 px-4 text-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <span class="w-7 h-7 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></span>
            </div>
            <div>
              <h4 id="gen-progress-title" class="font-heading font-bold text-sm text-slate-900">Generating Storyboard Sequence</h4>
              <p id="gen-progress-status" class="text-xs text-slate-500 mt-1">Preparing scene context...</p>
            </div>
            <div id="gen-progress-stepper" class="flex items-center gap-2 mt-2">
              <!-- Stepper dots injected dynamically -->
            </div>
          </div>

          <!-- STEP 3 & 4: PREVIEW & REVIEW GRID VIEW -->
          <div id="gen-step-preview" class="hidden flex flex-col gap-3">
            <div class="flex items-center justify-between pb-1 border-b border-slate-100">
              <div>
                <h4 class="font-heading font-bold text-xs text-slate-900">Proposed Scene Sequence</h4>
                <p class="text-[11px] text-slate-500">Inspect frames, toggle approval, or regenerate individual shots before saving.</p>
              </div>
              <div class="flex items-center gap-2">
                <span id="gen-preview-count-label" class="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">4 Shots Proposed</span>
                <button type="button" id="gen-btn-approve-all-proposed" class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold cursor-pointer transition-all flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">done_all</span>
                  <span>Approve All</span>
                </button>
              </div>
            </div>

            <!-- Preview Contact Sheet Grid -->
            <div id="gen-preview-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
              <!-- Proposed cards rendered dynamically -->
            </div>

            <!-- Bottom Save / Discard Actions -->
            <div class="flex items-center justify-between pt-2.5 border-t border-slate-100 gap-2">
              <button type="button" id="gen-btn-discard-preview" class="px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer">Discard Sequence</button>
              <div class="flex items-center gap-2">
                <button type="button" id="gen-btn-save-as-draft" class="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold cursor-pointer">Save as Draft</button>
                <button type="button" id="gen-btn-confirm-save" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <span class="material-symbols-outlined text-[15px]">check_circle</span>
                  <span>Save to Storyboard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- MODAL 3: SINGLE FRAME REGENERATION MODAL -->
      <!-- ===================================================================== -->
      <div id="single-regen-modal" class="scriptora-modal-overlay fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-md w-full p-4 sm:p-5 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <div id="regen-shot-pill" class="px-2 py-0.5 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs">1B</div>
              <h3 class="font-heading font-bold text-sm text-slate-900">Regenerate Single Frame</h3>
            </div>
            <button id="regen-modal-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <!-- Style Sample Preview Container (Updates dynamically on dropdown change) -->
          <div class="relative aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center group shadow-inner">
            <img id="regen-current-image" src="" alt="Style Preview" class="w-full h-full object-cover transition-opacity duration-200" />

            <!-- Clear Distinction Badge: Style Sample Preview -->
            <div class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-xs text-[10px] font-semibold text-white flex items-center gap-1.5 border border-white/10 shadow-xs pointer-events-none">
              <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span class="text-slate-300">Style Sample Preview:</span>
              <span id="regen-preview-style-label" class="text-blue-300 font-bold">Concept Art</span>
            </div>

            <!-- Current Frame Reference Thumbnail (if existing) -->
            <div id="regen-current-frame-pill" class="hidden absolute bottom-2.5 right-2.5 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-xs border border-white/10 shadow-xs">
              <img id="regen-current-frame-thumb" src="" alt="Current frame" class="w-7 h-5 object-cover rounded shrink-0 border border-white/20" />
              <div class="flex flex-col text-left leading-tight">
                <span class="text-[9px] text-slate-400">Current Frame</span>
                <span id="regen-current-frame-pill-num" class="text-[10px] text-white font-mono font-bold">1A</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2.5">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Image Provider</label>
              <select id="regen-provider-select" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600">
                <option value="scriptora-concept">SCRIPTORA Concept Engine (Free / Built-in)</option>
                <option value="gemini-imagen3">Google Imagen 3 (Paid API)</option>
                <option value="stability-sdxl">Stability AI SDXL (Paid API)</option>
                <option value="openai-dalle3">OpenAI DALL-E 3 (Paid API)</option>
              </select>
              <div id="regen-cost-banner" class="text-[10px] text-slate-500 italic mt-0.5">Free (Built-in Concept Engine, no charges).</div>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Visual Style</label>
              <select id="regen-style-select" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                ${ba.map(a=>`<option value="${a}">${a}</option>`).join("")}
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Updated Prompt / Creative Direction</label>
              <textarea id="regen-prompt-input" rows="2" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" placeholder="Specify framing adjustments or lighting revisions..."></textarea>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2.5 border-t border-slate-100">
            <button type="button" id="regen-modal-cancel" class="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
            <button type="button" id="regen-modal-confirm" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[15px]">auto_awesome</span>
              <span>Regenerate Frame</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- MODAL 4: SHOT HISTORY & VERSION RESTORATION MODAL -->
      <!-- ===================================================================== -->
      <div id="shot-history-modal" class="scriptora-modal-overlay fixed inset-0 z-[125] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-lg w-full p-4 sm:p-5 flex flex-col gap-3.5 max-h-[85vh] overflow-y-auto">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-slate-600 text-xl">history</span>
              <h3 id="history-modal-title" class="font-heading font-bold text-sm text-slate-900">Generation History</h3>
            </div>
            <button id="history-modal-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <div id="history-items-container" class="flex flex-col gap-2.5 overflow-y-auto max-h-[55vh] pr-1">
            <div class="p-8 text-center text-slate-400 text-xs">No prior versions recorded.</div>
          </div>

          <div class="flex items-center justify-end pt-2 border-t border-slate-100">
            <button type="button" id="history-modal-done" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer">Done</button>
          </div>
        </div>
      </div>


      <!-- ===================================================================== -->
      <!-- MODAL 6: STORYBOARD RECYCLE BIN (SOFT-DELETE & RESTORATION) -->
      <!-- ===================================================================== -->
      <div id="recycle-bin-modal" class="scriptora-modal-overlay fixed inset-0 z-[130] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-lg w-full p-4 sm:p-5 flex flex-col gap-3.5 max-h-[88vh] overflow-y-auto">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                <span class="material-symbols-outlined text-lg">delete_sweep</span>
              </div>
              <div>
                <h3 class="font-heading font-bold text-sm text-slate-900">Storyboard Recycle Bin</h3>
                <p class="text-[11px] text-slate-500">Soft-deleted shots and scenes can be restored anytime or permanently removed.</p>
              </div>
            </div>
            <button id="rb-modal-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <!-- Filter Tabs & Empty All -->
          <div class="flex items-center justify-between gap-2">
            <div class="inline-flex p-0.5 rounded-xl bg-slate-100 text-xs font-medium">
              <button type="button" id="rb-tab-all" class="px-2.5 py-1 rounded-lg bg-white shadow-2xs font-semibold text-slate-900 cursor-pointer">All Items (<span id="rb-count-all">0</span>)</button>
              <button type="button" id="rb-tab-shots" class="px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer">Shots (<span id="rb-count-shots">0</span>)</button>
              <button type="button" id="rb-tab-scenes" class="px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer">Scenes (<span id="rb-count-scenes">0</span>)</button>
            </div>
            <button type="button" id="rb-btn-empty-bin" class="px-2.5 py-1 rounded-lg text-rose-600 hover:bg-rose-50 text-[11px] font-semibold flex items-center gap-1 cursor-pointer">
              <span class="material-symbols-outlined text-[14px]">delete_forever</span>
              <span>Empty Bin</span>
            </button>
          </div>

          <!-- Items Container -->
          <div id="rb-items-container" class="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-1">
            <div id="rb-empty-state" class="flex flex-col items-center justify-center py-6 text-slate-400 gap-1.5">
              <span class="material-symbols-outlined text-3xl text-slate-300">delete_outline</span>
              <span class="text-xs font-semibold text-slate-600">Recycle Bin is empty</span>
              <span class="text-[10px] text-slate-400">Deleted shots or scenes will appear here for safe recovery.</span>
            </div>
          </div>

          <div class="flex items-center justify-end pt-3 border-t border-slate-100">
            <button type="button" id="rb-modal-done" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer">Close</button>
          </div>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- MODAL 7: STORYBOARD PREFERENCES -->
      <!-- ===================================================================== -->
      <div id="storyboard-preferences-modal" class="scriptora-modal-overlay fixed inset-0 z-[130] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-md sm:max-w-lg w-full p-4 sm:p-5 flex flex-col gap-3.5 max-h-[88vh] overflow-y-auto">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <span class="material-symbols-outlined text-lg">tune</span>
              </div>
              <div>
                <h3 class="font-heading font-bold text-sm text-slate-900">Storyboard Preferences</h3>
                <p class="text-[11px] text-slate-500">Configure default cinematography applied to new shots.</p>
              </div>
            </div>
            <button id="pref-modal-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <form id="storyboard-pref-form" class="flex flex-col gap-3 text-xs">
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/70 border border-blue-100">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-blue-600 text-[18px]">verified</span>
                <div>
                  <div class="font-bold text-blue-950 text-[11px]">Experience Level</div>
                  <div class="text-[10px] text-blue-700">Intermediate Storyboard Studio active</div>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-2xs">Intermediate</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Visual Style</label>
                <select id="pref-default-style" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${ba.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Aspect Ratio</label>
                <select id="pref-default-ratio" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${In.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Shot Size</label>
                <select id="pref-default-size" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${ma.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Camera Angle</label>
                <select id="pref-default-angle" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${fa.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Lens</label>
                <select id="pref-default-lens" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${xa.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Lighting</label>
                <select id="pref-default-lighting" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${ga.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-2 mt-2">
              <button type="button" id="pref-btn-reset" class="px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer">Reset Defaults</button>
              <div class="flex items-center gap-2">
                <button type="button" id="pref-modal-cancel" class="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer">Cancel</button>
                <button type="submit" id="pref-btn-save" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer">Save Preferences</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      
      <!-- ===================================================================== -->
      <!-- MODAL 8: SHOT VARIATION MODAL (Alternative Visual Interpretation) -->
      <!-- ===================================================================== -->
      <div id="shot-variation-modal" class="scriptora-modal-overlay fixed inset-0 z-[125] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-lg w-full p-4 sm:p-5 flex flex-col gap-3.5 max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                <span class="material-symbols-outlined text-lg">auto_awesome</span>
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <h3 class="font-heading font-bold text-sm text-slate-900">Explore Shot Variation</h3>
                  <span id="variation-shot-pill" class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 text-purple-700">1A</span>
                </div>
                <p class="text-[11px] text-slate-500">Generate an alternative interpretation preserving narrative context & continuity.</p>
              </div>
            </div>
            <button id="variation-modal-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <!-- Current Shot Context Card -->
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <div class="w-16 h-11 bg-slate-950 rounded-lg overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center">
              <img id="variation-current-thumb" src="" alt="Current take" class="w-full h-full object-cover hidden" />
              <span id="variation-thumb-placeholder" class="material-symbols-outlined text-slate-600 text-base">image</span>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                <span id="variation-shot-title" class="truncate font-heading">Shot Title</span>
                <span id="variation-shot-meta" class="text-[10px] text-slate-400 font-mono">Wide · 24mm</span>
              </div>
              <p id="variation-shot-desc" class="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Description...</p>
            </div>
          </div>

          <!-- Variation Type Selector -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Variation Creative Focus</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2" id="variation-options-grid">
              
              <!-- Option 1: Auto Variation (Recommended) -->
              <label class="variation-option-card relative flex items-start gap-2.5 p-2.5 rounded-xl border-2 border-purple-600 bg-purple-50/50 cursor-pointer transition-all hover:bg-purple-50 select-none">
                <input type="radio" name="variation-type" value="auto" checked class="mt-1 text-purple-600 focus:ring-purple-500" />
                <div class="flex flex-col">
                  <div class="flex items-center gap-1 text-xs font-bold text-purple-900">
                    <span class="material-symbols-outlined text-[15px] text-purple-600">auto_awesome</span>
                    <span>Auto Variation</span>
                    <span class="px-1 rounded bg-purple-200 text-purple-800 text-[9px] font-semibold">Recommended</span>
                  </div>
                  <span class="text-[10px] text-purple-700 mt-0.5 leading-snug">Intelligently combines angle, lighting, and composition adjustments.</span>
                </div>
              </label>

              <!-- Option 2: Composition -->
              <label class="variation-option-card relative flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-white cursor-pointer transition-all hover:bg-slate-50 select-none">
                <input type="radio" name="variation-type" value="composition" class="mt-1 text-purple-600 focus:ring-purple-500" />
                <div class="flex flex-col">
                  <div class="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <span class="material-symbols-outlined text-[15px] text-blue-600">dashboard_customize</span>
                    <span>Composition</span>
                  </div>
                  <span class="text-[10px] text-slate-500 mt-0.5 leading-snug">Explore a different arrangement of subjects and visual elements.</span>
                </div>
              </label>

              <!-- Option 3: Camera Angle -->
              <label class="variation-option-card relative flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-white cursor-pointer transition-all hover:bg-slate-50 select-none">
                <input type="radio" name="variation-type" value="angle" class="mt-1 text-purple-600 focus:ring-purple-500" />
                <div class="flex flex-col">
                  <div class="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <span class="material-symbols-outlined text-[15px] text-emerald-600">videocam</span>
                    <span>Camera Angle</span>
                  </div>
                  <span class="text-[10px] text-slate-500 mt-0.5 leading-snug">Explore another camera perspective (high, low, reverse, or dutch).</span>
                </div>
              </label>

              <!-- Option 4: Lighting -->
              <label class="variation-option-card relative flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-white cursor-pointer transition-all hover:bg-slate-50 select-none">
                <input type="radio" name="variation-type" value="lighting" class="mt-1 text-purple-600 focus:ring-purple-500" />
                <div class="flex flex-col">
                  <div class="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <span class="material-symbols-outlined text-[15px] text-amber-500">wb_sunny</span>
                    <span>Lighting</span>
                  </div>
                  <span class="text-[10px] text-slate-500 mt-0.5 leading-snug">Explore alternative lighting mood, shadow contrast, or rim glint.</span>
                </div>
              </label>

              <!-- Option 5: Framing -->
              <label class="variation-option-card relative flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-white cursor-pointer transition-all hover:bg-slate-50 select-none">
                <input type="radio" name="variation-type" value="framing" class="mt-1 text-purple-600 focus:ring-purple-500" />
                <div class="flex flex-col">
                  <div class="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <span class="material-symbols-outlined text-[15px] text-indigo-600">crop</span>
                    <span>Framing</span>
                  </div>
                  <span class="text-[10px] text-slate-500 mt-0.5 leading-snug">Alternative focal framing while preserving narrative intention.</span>
                </div>
              </label>

              <!-- Option 6: Creative Interpretation -->
              <label class="variation-option-card relative flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-white cursor-pointer transition-all hover:bg-slate-50 select-none">
                <input type="radio" name="variation-type" value="creative" class="mt-1 text-purple-600 focus:ring-purple-500" />
                <div class="flex flex-col">
                  <div class="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <span class="material-symbols-outlined text-[15px] text-rose-500">brush</span>
                    <span>Creative Interpretation</span>
                  </div>
                  <span class="text-[10px] text-slate-500 mt-0.5 leading-snug">Broader visual reinterpretation of the same screenplay action.</span>
                </div>
              </label>

            </div>
          </div>

          <!-- Additional Guidance / Prompt (Optional) -->
          <div class="flex flex-col gap-1">
            <label class="text-[11px] font-semibold text-slate-700">Optional Variation Guidance</label>
            <textarea id="variation-guidance-input" rows="2" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-purple-600 bg-white" placeholder="e.g. Lower camera angle, harsh dust-storm rim backlight..."></textarea>
          </div>

          <!-- Actions Footer -->
          <div class="flex items-center justify-between pt-2.5 border-t border-slate-100">
            <div class="text-[10px] text-slate-400 font-medium">Preserves previous version in history</div>
            <div class="flex items-center gap-2">
              <button type="button" id="variation-modal-cancel" class="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
              <button type="button" id="variation-modal-confirm" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-all">
                <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span>Generate Variation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- MODAL 5: FULL-SCREEN CINEMATIC LIGHTBOX -->
      <!-- ===================================================================== -->
      <div id="lightbox-modal" class="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 hidden">
        <!-- Top Toolbar -->
        <div class="flex items-center justify-between text-white shrink-0">
          <div class="flex items-center gap-3">
            <span id="lb-shot-num" class="font-mono font-bold text-xs bg-white/10 px-2.5 py-1 rounded-lg">REC · 1A</span>
            <span id="lb-specs" class="text-xs text-white/70 font-mono hidden sm:inline">2.39:1 · 50mm Prime · Wide Shot</span>
          </div>
          <button id="lb-close" class="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer" title="Close Lightbox (Esc)">
            <span class="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <!-- Center Image View with Nav Chevrons -->
        <div class="flex-1 flex items-center justify-center relative min-h-0 my-3">
          <button id="lb-prev" class="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer" title="Previous Shot (Arrow Left)">
            <span class="material-symbols-outlined text-2xl">chevron_left</span>
          </button>
          
          <img id="lb-image" src="" alt="Full size preview" class="max-h-full max-w-full object-contain rounded-lg shadow-2xl select-none" />

          <button id="lb-next" class="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer" title="Next Shot (Arrow Right)">
            <span class="material-symbols-outlined text-2xl">chevron_right</span>
          </button>
        </div>

        <!-- Bottom Metadata & Actions Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white shrink-0 pt-2 border-t border-white/10">
          <div class="min-w-0 flex-1">
            <h4 id="lb-title" class="font-heading font-bold text-sm truncate">Shot Title</h4>
            <p id="lb-desc" class="text-xs text-white/70 line-clamp-1 mt-0.5">Visual description</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button id="lb-btn-approve" class="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors">
              <span class="material-symbols-outlined text-[16px]">check</span>
              <span id="lb-approve-label">Approve</span>
            </button>
            <button id="lb-btn-reject" class="px-3.5 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors">
              <span class="material-symbols-outlined text-[16px]">close</span>
              <span>Reject</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Navigation with Production Active -->
      ${it("production")}
    </div>
  `}function Cn({description:e,visualStyle:t,shotSize:s,cameraAngle:n,aspectRatio:o,cameraMovement:a,lens:i,lighting:l,screenDirection:r,sceneContext:f}){const u=[];t&&u.push(`[Style: ${t}]`),s&&u.push(`[Framing: ${s}]`),n&&u.push(`[Angle: ${n}]`),i&&u.push(`[Lens: ${i}]`),a&&a!=="Static"&&u.push(`[Movement: ${a}]`),l&&l!=="Auto / Scene-based"&&u.push(`[Lighting: ${l}]`),r&&r!=="Static"&&u.push(`[Direction: ${r}]`),o&&u.push(`[Aspect: ${o}]`),f&&u.push(`[Scene Context: ${f}]`);const d=(e||"").trim();return d?u.push(d):u.push("Cinematic storyboard composition"),u.join(" - ")}function Oi(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust";let a=n.get("sceneId")||"scene-1",i="contact",l=null,r=null,f=null,u=0,d=[],c=4;const m=new Set;let b="sequence",h=null,g="",v="draft";const P=document.getElementById("storyboard-scene-select"),B=document.getElementById("storyboard-view-container"),L=document.getElementById("view-tab-contact"),k=document.getElementById("view-tab-sequence"),U=document.getElementById("btn-export-storyboard-pdf"),T=document.getElementById("btn-generate-sequence"),de=document.getElementById("btn-add-shot"),se=document.getElementById("btn-view-in-schedule"),ge=document.getElementById("storyboard-stale-alert"),J=document.getElementById("btn-repin-storyboard"),ke=document.getElementById("continuity-warning-banner"),be=document.getElementById("shot-inspector-modal"),ee=document.getElementById("modal-shot-close"),pe=document.getElementById("modal-btn-cancel-shot"),Z=document.getElementById("shot-detail-form"),ve=document.getElementById("modal-btn-delete-shot"),C=document.getElementById("modal-btn-generate-action"),G=document.getElementById("modal-file-import"),$e=document.getElementById("modal-btn-view-fullscreen"),ne=document.getElementById("modal-btn-toggle-approve"),xe=document.getElementById("modal-btn-toggle-reject"),A=document.getElementById("modal-btn-open-history"),ye=document.getElementById("ai-generate-modal"),Fe=document.getElementById("gen-modal-close"),Te=document.getElementById("gen-modal-cancel"),ie=document.getElementById("gen-btn-start"),ce=document.getElementById("gen-provider-select"),_=document.getElementById("gen-provider-status"),Ae=document.getElementById("gen-cost-label"),Me=document.getElementById("gen-shot-count-select"),oe=document.getElementById("gen-error-alert"),je=document.getElementById("gen-error-message"),ue=document.getElementById("single-regen-modal"),qe=document.getElementById("regen-modal-close"),ze=document.getElementById("regen-modal-cancel"),Pe=document.getElementById("regen-modal-confirm"),z=document.getElementById("shot-history-modal"),I=document.getElementById("shot-variation-modal"),F=document.getElementById("variation-modal-close"),Y=document.getElementById("variation-modal-cancel"),W=document.getElementById("variation-modal-confirm");let te=null;const he=document.getElementById("history-modal-close"),me=document.getElementById("history-modal-done"),Ce=document.getElementById("lightbox-modal"),Be=document.getElementById("lb-close"),Le=document.getElementById("lb-prev"),De=document.getElementById("lb-next"),w=document.getElementById("lb-btn-approve"),j=document.getElementById("lb-btn-reject");let V=[],X=[],N=null;L&&k&&(L.onclick=x=>{x.preventDefault(),i="contact",L.className="px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5",k.className="px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5",vt()},k.onclick=x=>{x.preventDefault(),i="sequence",k.className="px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5",L.className="px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5",vt()}),T&&(T.onclick=x=>{x.preventDefault(),zn()}),de&&(de.onclick=x=>{x.preventDefault(),zs(null)}),U&&(U.onclick=x=>{x.preventDefault();try{const p=V.find(y=>y.id===a)||{},E=$.state.scripts?.find(y=>y.id===o)||{title:"Chronicles of Dust",draft:"Draft 4.2"};ci(N,{title:E.title,draft:E.draft||N?.sourceVersion||"Draft 4.2",heading:p.heading||N?.sceneHeading||"SCENE 1"}),S("Exported Storyboard Studio PDF")}catch(p){console.error(p),S("Failed to export Storyboard PDF")}}),J&&(J.onclick=async x=>{if(x.preventDefault(),N){N.sourceVersion=N.currentScriptDraft||"Draft 4.2",N.isVersionStale=!1;try{await Ht(o,N)}catch{}ge?.classList.add("hidden"),S(`Pinned Storyboard to ${N.sourceVersion}`)}}),ee&&(ee.onclick=()=>we(be)),pe&&(pe.onclick=()=>we(be)),C&&(C.onclick=x=>{x.preventDefault(),Ka()}),G&&(G.onchange=x=>{const p=x.target.files?.[0];if(!p)return;const E=new FileReader;E.onload=y=>{h=y.target.result,hs(),S("Reference image imported")},E.readAsDataURL(p)}),ne&&(ne.onclick=()=>{v=v==="approved"?"draft":"approved";const x=document.getElementById("input-shot-approval");x&&(x.value=v),hs(),S(v==="approved"?"Frame marked as Approved for Production":"Approval cleared (Draft)")}),xe&&(xe.onclick=()=>{v=v==="rejected"?"draft":"rejected";const x=document.getElementById("input-shot-approval");x&&(x.value=v),hs(),S(v==="rejected"?"Frame marked as Rejected":"Rejection cleared (Draft)")}),$e&&($e.onclick=()=>{if(h){const x={shotNumber:document.getElementById("input-shot-number")?.value.trim()||"1A",title:document.getElementById("input-shot-title")?.value.trim()||"Preview",description:document.getElementById("input-shot-desc")?.value.trim()||"",aspectRatio:document.getElementById("input-shot-ratio")?.value||"2.39:1",focalLength:document.getElementById("input-shot-focal")?.value||"50mm",shotSize:document.getElementById("input-shot-size")?.value||"Medium",cameraAngle:document.getElementById("input-shot-angle")?.value||"Eye Level",imageUrl:h};Kn(x)}else S("No image available to inspect fullscreen")}),A&&(A.onclick=()=>{l?Wn(l):S("No previous versions available for this new shot")}),Z&&(Z.onsubmit=async x=>{x.preventDefault();const p=document.getElementById("input-shot-desc")?.value.trim()||"",E=document.getElementById("input-shot-style")?.value||"Concept Art",y=document.getElementById("input-shot-size")?.value||"Medium",O=document.getElementById("input-shot-angle")?.value||"Eye Level",M=document.getElementById("input-shot-ratio")?.value||"2.39:1",R=document.getElementById("input-shot-movement")?.value||"Static",K=document.getElementById("input-shot-focal")?.value||"50mm",D=document.getElementById("input-shot-lighting")?.value||"Auto / Scene-based",q=document.getElementById("input-shot-direction")?.value||"Left to Right",re=`${N?.sceneHeading||""} ${N?.sceneSummary||""}`.trim(),Oe=Cn({description:p,visualStyle:E,shotSize:y,cameraAngle:O,aspectRatio:M,cameraMovement:R,lens:K,lighting:D,screenDirection:q,sceneContext:re}),at={shotNumber:document.getElementById("input-shot-number")?.value.trim()||"1A",title:document.getElementById("input-shot-title")?.value.trim()||"Shot",shotType:document.getElementById("input-shot-type")?.value||"",description:p,shotSize:y,cameraAngle:O,cameraMovement:R,focalLength:K,lens:K,aspectRatio:M,lightingMood:D,lighting:D,visualStyle:E,prompt:Oe,approvalStatus:document.getElementById("input-shot-approval")?.value||"draft",directorNotes:document.getElementById("input-shot-notes")?.value.trim()||"",imageUrl:h,imageSource:h?h.startsWith("data:image/svg")?"ai":"imported":null,continuity:{screenDirection:q}};try{l?(await $s(o,a,l,at),S("Updated shot details")):(await zo(o,a,at),S("Added new shot to scene")),we(be),kt()}catch{S("Failed to save shot")}}),ve&&(ve.onclick=async()=>{l&&await Jn(l)});const Ie=document.getElementById("btn-toggle-more-camera"),et=document.getElementById("more-camera-panel"),ht=document.getElementById("more-camera-chevron");Ie&&et&&(Ie.onclick=()=>{const x=et.classList.toggle("hidden");ht&&(ht.style.transform=x?"rotate(0deg)":"rotate(180deg)")});const tt=document.getElementById("btn-storyboard-preferences"),Ne=document.getElementById("storyboard-preferences-modal"),Yt=document.getElementById("storyboard-pref-form"),pt=document.getElementById("pref-modal-close"),wt=document.getElementById("pref-modal-cancel"),Re=document.getElementById("pref-btn-reset");tt&&Ne&&(tt.onclick=async()=>{const x=await dn(),p=document.getElementById("pref-default-style"),E=document.getElementById("pref-default-ratio"),y=document.getElementById("pref-default-size"),O=document.getElementById("pref-default-angle"),M=document.getElementById("pref-default-lens"),R=document.getElementById("pref-default-lighting");p&&(p.value=x?.visualStyle||"Concept Art"),E&&(E.value=x?.aspectRatio||"2.39:1"),y&&(y.value=x?.shotSize||"Medium"),O&&(O.value=x?.cameraAngle||"Eye Level"),M&&(M.value=x?.lens||"50mm"),R&&(R.value=x?.lighting||"Auto / Scene-based"),lt(Ne)}),pt&&(pt.onclick=()=>we(Ne)),wt&&(wt.onclick=()=>we(Ne)),Re&&(Re.onclick=()=>{const x=document.getElementById("pref-default-style"),p=document.getElementById("pref-default-ratio"),E=document.getElementById("pref-default-size"),y=document.getElementById("pref-default-angle"),O=document.getElementById("pref-default-lens"),M=document.getElementById("pref-default-lighting");x&&(x.value="Concept Art"),p&&(p.value="2.39:1"),E&&(E.value="Medium"),y&&(y.value="Eye Level"),O&&(O.value="50mm"),M&&(M.value="Auto / Scene-based"),S("Reset to default settings")}),Yt&&(Yt.onsubmit=async x=>{x.preventDefault();const p={visualStyle:document.getElementById("pref-default-style")?.value||"Concept Art",aspectRatio:document.getElementById("pref-default-ratio")?.value||"2.39:1",shotSize:document.getElementById("pref-default-size")?.value||"Medium",cameraAngle:document.getElementById("pref-default-angle")?.value||"Eye Level",lens:document.getElementById("pref-default-lens")?.value||"50mm",lighting:document.getElementById("pref-default-lighting")?.value||"Auto / Scene-based",experienceLevel:"Intermediate"};try{await Wo(p),Ke=p,S("Storyboard preferences saved"),we(Ne)}catch{S("Failed to save preferences")}});const yt=document.getElementById("btn-storyboard-recycle-bin"),Nt=document.getElementById("recycle-bin-modal"),cn=document.getElementById("rb-modal-close"),bs=document.getElementById("rb-modal-done"),os=document.getElementById("rb-btn-empty-bin"),Xt=document.getElementById("recycle-bin-badge");async function _t(){try{const x=await Qs(o),p=Array.isArray(x)?x.length:0;return Xt&&(Xt.textContent=p,p>0?Xt.classList.remove("hidden"):Xt.classList.add("hidden")),x||[]}catch{return[]}}async function Us(){try{V=await fs(o)||[]}catch(x){console.warn("Offline fallback for scenes:",x)}P&&(V.length?(V.find(x=>x.id===a)||(a=V[0].id),P.innerHTML=V.map(x=>`
          <option value="${x.id}" ${x.id===a?"selected":""}>
            Scene ${x.sceneNumber}: ${x.heading}
          </option>
        `).join("")):P.innerHTML='<option value="">No active scenes (all in Recycle Bin)</option>'),await kt()}async function Ft(){const x=document.getElementById("rb-items-container");if(x)try{const p=await Qs(o),E=p.length,y=p.filter(q=>q.itemType==="shot").length,O=p.filter(q=>q.itemType==="scene").length,M=document.getElementById("rb-count-all"),R=document.getElementById("rb-count-shots"),K=document.getElementById("rb-count-scenes");M&&(M.textContent=E),R&&(R.textContent=y),K&&(K.textContent=O);const D=p.filter(q=>St==="shots"?q.itemType==="shot":St==="scenes"?q.itemType==="scene":!0);if(!D.length){x.innerHTML=`
          <div id="rb-empty-state" class="flex flex-col items-center justify-center py-12 text-slate-400 gap-1.5">
            <span class="material-symbols-outlined text-4xl text-slate-300">delete_outline</span>
            <span class="text-xs font-semibold text-slate-600">Recycle Bin is empty</span>
            <span class="text-[10px] text-slate-400">No deleted items match the selected filter.</span>
          </div>
        `;return}x.innerHTML=D.map(q=>{const re=q.itemType==="scene",Oe=re?`Scene: ${q.data?.sceneHeading||q.title||"Scene"}`:q.title||`Shot ${q.shotNumber||""}`,at=re?`${q.data?.shots?.length||0} shots included`:`Original Scene: ${q.originalSceneId||"Scene"}`,ae=q.deletedAt?new Date(q.deletedAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",Qe=!re&&q.data?.imageUrl?q.data.imageUrl:null;return`
          <div class="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors gap-2.5">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden text-slate-500">
                ${Qe?`<img src="${Qe}" alt="" class="w-full h-full object-cover" />`:re?'<span class="material-symbols-outlined text-lg text-blue-600">movie_filter</span>':'<span class="material-symbols-outlined text-lg text-slate-400">crop_original</span>'}
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-bold text-slate-800 truncate">${Oe}</span>
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold ${re?"bg-blue-50 text-blue-600 border border-blue-100":"bg-slate-100 text-slate-600"}">${re?"SCENE":"SHOT"}</span>
                </div>
                <div class="text-[10px] text-slate-500 truncate">${at} ${ae?`· Deleted ${ae}`:""}</div>
              </div>
            </div>

            <div class="flex items-center gap-1.5 shrink-0">
              <button type="button" class="rb-item-restore px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors" data-item-id="${q.id}">
                <span class="material-symbols-outlined text-[14px]">restore_from_trash</span>
                <span>Restore</span>
              </button>
              <button type="button" class="rb-item-delete px-2 py-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 text-[11px] cursor-pointer transition-colors" title="Delete permanently" data-item-id="${q.id}">
                <span class="material-symbols-outlined text-[15px]">delete_forever</span>
              </button>
            </div>
          </div>
        `}).join(""),x.querySelectorAll(".rb-item-restore").forEach(q=>{q.onclick=async()=>{const re=q.getAttribute("data-item-id");try{await Ko(o,re),S("Item restored successfully"),await Ft(),await _t(),await Us()}catch{S("Failed to restore item")}}}),x.querySelectorAll(".rb-item-delete").forEach(q=>{q.onclick=async()=>{const re=q.getAttribute("data-item-id");if(confirm("Permanently delete this item? This action cannot be undone."))try{await Jo(o,re),S("Item permanently deleted"),await Ft(),await _t()}catch{S("Failed to delete item")}}})}catch{x.innerHTML='<div class="p-6 text-center text-xs text-rose-500">Failed to load Recycle Bin items</div>'}}const ls=document.getElementById("rb-tab-all"),le=document.getElementById("rb-tab-shots"),Ve=document.getElementById("rb-tab-scenes");function He(x){St=x,[ls,le,Ve].forEach(E=>{E&&(E.classList.remove("bg-white","shadow-2xs","font-semibold","text-slate-900"),E.classList.add("text-slate-600"))});const p=x==="shots"?le:x==="scenes"?Ve:ls;p&&(p.classList.add("bg-white","shadow-2xs","font-semibold","text-slate-900"),p.classList.remove("text-slate-600")),Ft()}ls&&(ls.onclick=()=>He("all")),le&&(le.onclick=()=>He("shots")),Ve&&(Ve.onclick=()=>He("scenes")),yt&&Nt&&(yt.onclick=()=>{lt(Nt),Ft()}),cn&&(cn.onclick=()=>we(Nt)),bs&&(bs.onclick=()=>we(Nt)),os&&(os.onclick=async()=>{if(confirm("Empty the entire Storyboard Recycle Bin? All deleted items will be permanently erased."))try{await Yo(o),S("Recycle Bin emptied"),await Ft(),await _t()}catch{S("Failed to empty Recycle Bin")}});const Ze=document.getElementById("btn-delete-scene-storyboard");Ze&&(Ze.onclick=async()=>{if(!N)return;const x=N.sceneHeading||`Scene ${N.sceneNumber||""}`;if(confirm(`Move ${x} and all its shots to the Storyboard Recycle Bin?`))try{await Xo(o,a),S(`${x} moved to Recycle Bin`),await _t(),await Us()}catch{S("Failed to delete scene")}}),Fe&&(Fe.onclick=()=>we(ye)),Te&&(Te.onclick=()=>we(ye)),ce&&(ce.onchange=Vs),Me&&(Me.onchange=()=>{c=parseInt(Me.value,10)||4,pn(),Vs()});const Se=document.getElementById("gen-prompt-input");Se&&Se.addEventListener("input",()=>{Se.value.trim()&&(Se.classList.remove("border-rose-400","bg-rose-50/20"),oe&&oe.classList.add("hidden"))}),ie&&(ie.onclick=async x=>{x.preventDefault();const p=ce?ce.value:"scriptora-concept",E=X.find(ae=>ae.id===p)||X[0]||{pricingType:"free",name:"Concept Engine"},y=document.getElementById("gen-style-select")?.value||"Storyboard Sketch",O=document.getElementById("gen-ratio-select")?.value||"2.39:1",M=document.getElementById("gen-quality-select")?.value||"Standard Draft",R=document.getElementById("gen-prompt-input")?.value.trim()||"",K=parseInt(Me?.value,10)||c||4;if(!R){oe&&(oe.classList.remove("hidden"),je&&(je.textContent="Creative Direction / Image Prompt is mandatory for image generation. Please describe the visual scene."));const ae=document.getElementById("gen-prompt-input");ae&&(ae.classList.add("border-rose-400","bg-rose-50/20"),ae.focus()),S("Creative Direction / Image Prompt is mandatory");return}if(E.pricingType==="paid"){if(!E.isConfigured){oe&&(oe.classList.remove("hidden"),je&&(je.textContent=`Provider '${E.name}' requires API credentials. Please switch to SCRIPTORA Concept Engine (Free).`));return}if(!confirm(`Confirm generation using ${E.name}? Estimated cost: ${E.costLabel}.`))return}if(b==="single"){const ae=document.getElementById("gen-step-config"),Qe=document.getElementById("gen-step-progress"),vs=document.getElementById("gen-progress-title"),ws=document.getElementById("gen-progress-status");ae&&ae.classList.add("hidden"),Qe&&Qe.classList.remove("hidden"),vs&&(vs.textContent="Generating Shot Frame"),ws&&(ws.textContent=`Rendering with ${E.name}...`);const Gs=document.getElementById("input-shot-number")?.value.trim()||"1A",Ss=document.getElementById("input-shot-desc")?.value.trim()||R,Es=document.getElementById("input-shot-size")?.value||"Medium",ks=document.getElementById("input-shot-angle")?.value||"Eye Level",Is=document.getElementById("input-shot-movement")?.value||"Static",is=document.getElementById("input-shot-focal")?.value||"50mm",rs=document.getElementById("input-shot-lighting")?.value||"Auto / Scene-based",Ws=document.getElementById("input-shot-direction")?.value||"Left to Right",fn=`${N?.sceneHeading||""} ${N?.sceneSummary||""}`.trim(),xn=Cn({description:Ss,visualStyle:y,shotSize:Es,cameraAngle:ks,aspectRatio:O,cameraMovement:Is,lens:is,lighting:rs,screenDirection:Ws,sceneContext:fn});try{const Cs=await cs(o,{provider:p,prompt:R?`${xn} ${R}`:xn,userDescription:Ss,shotSize:Es,cameraAngle:ks,cameraMovement:Is,focalLength:is,lens:is,lightingMood:rs,lighting:rs,aspectRatio:O,visualStyle:y,screenDirection:Ws,sceneHeading:N?.sceneHeading||"SCENE 1",shotNumber:Gs,quality:M});if(Cs?.imageUrl){h=Cs.imageUrl,g=xn;const Zn=document.getElementById("input-shot-style");Zn&&(Zn.value=y),Et(y);const Qn=document.getElementById("input-shot-ratio");Qn&&(Qn.value=O),hs(),we(ye),S("Shot image generated successfully")}else throw new Error("Image generation returned empty")}catch(Cs){Qe&&Qe.classList.add("hidden"),ae&&ae.classList.remove("hidden"),oe&&(oe.classList.remove("hidden"),je&&(je.textContent=Cs.message||"Generation failed. Please try again.")),S(Cs.message||"Generation failed")}return}const D=Number(String(a).replace("scene-",""))||N?.sceneNumber||1,q=V.find(ae=>ae.id===a||ae.sceneNumber===D)||{heading:N?.sceneHeading||`SCENE ${D}`,snippet:"Characters in scene confrontation.",cast:["KEVIN","MEERA"]},at=[{letter:"A",title:"Establishing Spatial Geometry",description:`Wide environmental establishing view of ${q.heading.toLowerCase()}. Establishes spatial depth, environmental lighting, and visual geography.`,shotSize:"Wide Shot",cameraAngle:"High Angle",cameraMovement:"Crane / Jib",focalLength:"24mm Wide",lightingMood:"High Contrast Daylight",prompt:`Cinematic wide establishing shot of ${q.heading}: ${q.snippet||"Atmospheric perspective"}. 24mm anamorphic lens.`},{letter:"B",title:"Character Blocking & Entry",description:`Medium two-shot tracking ${q.cast?.[0]||"protagonist"} navigating the environment with rising tension.`,shotSize:"Medium Two-Shot",cameraAngle:"Eye Level",cameraMovement:"Tracking Dolly",focalLength:"50mm Prime",lightingMood:"Practical Rim Lighting",prompt:`Medium two-shot tracking ${q.cast?.join(" and ")||"character"} in ${q.heading}: ${q.snippet||"Environmental interaction"}. 50mm shallow depth of field.`},{letter:"C",title:"Critical Dramatic Focal Beat",description:"Close-up reaction highlighting dramatic urgency, character resolve, and key narrative stakes.",shotSize:"Close-Up",cameraAngle:"Dutch Angle",cameraMovement:"Static",focalLength:"85mm Portrait",lightingMood:"Warm Eye Catchlight",prompt:`Dramatic close-up on ${q.cast?.[0]||"lead character"} in ${q.heading}. Intense facial expression, rim lighting, 85mm portrait bokeh.`},{letter:"D",title:"Prop & Action Detail Insert",description:"Tight macro insert focusing on critical hand movement, equipment interaction, or tactical telemetry.",shotSize:"Extreme Close-Up",cameraAngle:"Low Angle",cameraMovement:"Static",focalLength:"35mm Macro",lightingMood:"Chiaroscuro Beam",prompt:`Extreme close-up macro insert of crucial prop and tactical hand action in ${q.heading}. Scratched metal textures, focused lighting.`}].slice(0,K).map((ae,Qe)=>({id:`shot-${Date.now()}-${Qe}-${Math.floor(Math.random()*1e3)}`,shotNumber:`${D}${ae.letter}`,order:Qe+1,title:ae.title,description:ae.description,shotSize:ae.shotSize,cameraAngle:ae.cameraAngle,cameraMovement:ae.cameraMovement,focalLength:ae.focalLength,lightingMood:ae.lightingMood,aspectRatio:O,visualStyle:y,prompt:R?`${ae.prompt} ${R}`:ae.prompt,imageUrl:null,imageSource:"ai",provider:p,quality:M,costEstimate:p==="scriptora-concept"?"Free (Built-in)":"$0.040",approvalStatus:"proposed",approvalNotes:"AI proposed sequence beat. Review and approve to confirm.",approvedBy:null,approvedAt:null,directorNotes:`Maintain consistent eyeline and framing across ${D}${ae.letter}.`,characters:q.cast||["KEVIN"],location:q.heading,continuity:{characterPosition:Qe%2===0?"Screen Left":"Screen Right",screenDirection:"Left to Right",eyeline:Qe%2===0?"Looking Screen Right":"Looking Screen Left",lightingContinuity:"Production matching lighting",costumeState:"Production baseline",propPlacement:"Standard staging"},history:[],isGenerating:!0,generationError:null}));N||(N={scriptId:o,sceneId:a,sceneNumber:D,sceneHeading:q.heading,shots:[]}),N.shots=at,N.visualStyle=y,N.aspectRatio=O,we(ye),Zt(),S(`Generating ${K} storyboard shots in real-time...`);try{await Ht(o,N)}catch{}at.forEach(async ae=>{try{const Qe=await cs(o,{provider:ae.provider,prompt:ae.prompt,shotSize:ae.shotSize,cameraAngle:ae.cameraAngle,cameraMovement:ae.cameraMovement,focalLength:ae.focalLength,lightingMood:ae.lightingMood,aspectRatio:ae.aspectRatio,visualStyle:ae.visualStyle,sceneHeading:N.sceneHeading||q.heading,shotNumber:ae.shotNumber,description:ae.description,cast:ae.characters,characters:ae.characters,quality:ae.quality});if(Qe?.imageUrl)ae.imageUrl=Qe.imageUrl,ae.isGenerating=!1,ae.generationError=null,ae.history||(ae.history=[]),ae.history.unshift({imageUrl:Qe.imageUrl,prompt:ae.prompt,visualStyle:ae.visualStyle,provider:ae.provider,createdAt:new Date().toISOString()}),await Ht(o,N),Zt(),S(`Shot ${ae.shotNumber} sketch completed!`);else throw new Error("Image generation returned empty")}catch(Qe){ae.isGenerating=!1,ae.generationError=Qe.message||"Generation failed",Zt(),S(`Shot ${ae.shotNumber} failed to generate`)}})});const Rt=document.getElementById("gen-btn-approve-all-proposed");Rt&&(Rt.onclick=()=>{d.forEach(x=>{x.approvalStatus="approved"}),un(),S("All proposed shots marked as Approved")});const Ge=document.getElementById("gen-btn-confirm-save");Ge&&(Ge.onclick=async()=>{if(d.length){Ge.disabled=!0;try{const x={...N,shots:d,visualStyle:d[0]?.visualStyle||N?.visualStyle,aspectRatio:d[0]?.aspectRatio||N?.aspectRatio};await Ht(o,x),S(`Saved ${d.length} shots to storyboard.`),we(ye),kt()}catch{S("Failed to save sequence")}finally{Ge.disabled=!1}}});const We=document.getElementById("gen-btn-save-as-draft");We&&(We.onclick=async()=>{if(!d.length)return;d.forEach(p=>{p.approvalStatus="draft"});const x={...N,shots:d};await Ht(o,x),S("Saved sequence as draft"),we(ye),kt()});const fe=document.getElementById("gen-btn-discard-preview");fe&&(fe.onclick=()=>{d=[],we(ye)}),qe&&(qe.onclick=()=>we(ue)),ze&&(ze.onclick=()=>we(ue));const st=document.getElementById("regen-provider-select");st&&(st.onchange=Gn),Pe&&(Pe.onclick=async()=>{const x=N?.shots?.find(M=>M.id===r);if(!x)return;const p=document.getElementById("regen-provider-select")?.value||"scriptora-concept",E=document.getElementById("regen-prompt-input")?.value.trim()||x.description||x.prompt||"Cinematic composition",y=document.getElementById("regen-style-select")?.value||x.visualStyle||"Concept Art";Pe.disabled=!0,Pe.innerHTML='<span class="w-3.5 h-3.5 border-2 border-white/60 border-t-white rounded-full animate-spin"></span><span>Regenerating...</span>';const O=Cn({description:E,visualStyle:y,shotSize:x.shotSize,cameraAngle:x.cameraAngle,aspectRatio:x.aspectRatio,cameraMovement:x.cameraMovement,lens:x.focalLength||x.lens,lighting:x.lightingMood||x.lighting,screenDirection:x.continuity?.screenDirection,sceneContext:`${N?.sceneHeading||""} ${N?.sceneSummary||""}`.trim()});we(ue),x.isGenerating=!0,x.generationError=null,Zt();try{const M=await cs(o,{provider:p,prompt:O,userDescription:E,shotSize:x.shotSize,cameraAngle:x.cameraAngle,cameraMovement:x.cameraMovement,focalLength:x.focalLength||x.lens,lens:x.focalLength||x.lens,lightingMood:x.lightingMood||x.lighting,lighting:x.lightingMood||x.lighting,aspectRatio:x.aspectRatio,visualStyle:y,screenDirection:x.continuity?.screenDirection,sceneHeading:N?.sceneHeading||"SCENE 1",shotNumber:x.shotNumber});if(M?.imageUrl)x.imageUrl=M.imageUrl,x.visualStyle=y,x.isGenerating=!1,x.generationError=null,await $s(o,a,r,{imageUrl:M.imageUrl,prompt:O,description:x.description||E,visualStyle:y,provider:p,imageSource:"ai"}),Zt(),S(`Regenerated frame ${x.shotNumber}. Previous version preserved in history.`);else throw new Error("Image generation returned empty")}catch(M){x.isGenerating=!1,x.generationError=M.message||"Regeneration failed",Zt(),S(M.message||"Regeneration failed")}finally{Pe.disabled=!1,Pe.innerHTML='<span class="material-symbols-outlined text-[15px]">auto_awesome</span><span>Regenerate Frame</span>'}}),he&&(he.onclick=()=>we(z)),F&&(F.onclick=()=>we(I)),Y&&(Y.onclick=()=>we(I)),document.querySelectorAll('#variation-options-grid input[type="radio"]').forEach(x=>{x.addEventListener("change",()=>{document.querySelectorAll(".variation-option-card").forEach(E=>{E.classList.remove("border-2","border-purple-600","bg-purple-50/50"),E.classList.add("border","border-slate-200","bg-white")});const p=x.closest(".variation-option-card");p&&(p.classList.remove("border","border-slate-200","bg-white"),p.classList.add("border-2","border-purple-600","bg-purple-50/50"))})}),W&&(W.onclick=()=>{const x=document.querySelector('#variation-options-grid input[name="variation-type"]:checked'),p=x?x.value:"auto",E=document.getElementById("variation-guidance-input")?.value.trim()||"";we(I),te&&so(te,p,E)}),me&&(me.onclick=()=>we(z)),Be&&(Be.onclick=()=>Ce?.classList.add("hidden")),Le&&(Le.onclick=()=>{const x=N?.shots||[];x.length&&(u=(u-1+x.length)%x.length,ys())}),De&&(De.onclick=()=>{const x=N?.shots||[];x.length&&(u=(u+1)%x.length,ys())}),w&&(w.onclick=async()=>{const p=(N?.shots||[])[u];if(p)try{await hn(o,a,p.id,"approved"),p.approvalStatus="approved",S(`Shot ${p.shotNumber} approved`),ys(),vt()}catch{S("Failed to approve shot")}}),j&&(j.onclick=async()=>{const p=(N?.shots||[])[u];if(p)try{await hn(o,a,p.id,"rejected"),p.approvalStatus="rejected",S(`Shot ${p.shotNumber} marked as rejected`),ys(),vt()}catch{S("Failed to reject shot")}});const Mt=x=>{Ce&&!Ce.classList.contains("hidden")&&(x.key==="Escape"&&Ce.classList.add("hidden"),x.key==="ArrowLeft"&&Le&&Le.click(),x.key==="ArrowRight"&&De&&De.click())};document.removeEventListener("keydown",Mt),document.addEventListener("keydown",Mt);let Ke=null,St="all";function Et(x){const p=document.querySelectorAll(".style-preview-card"),E=document.getElementById("input-shot-style");let y=null;const O=Ms(x);if(p.forEach(M=>{const R=M.getAttribute("data-style-id")||"";(R.toLowerCase()===(x||"").toLowerCase()||R===O.id)&&!y?(y=M,M.classList.add("border-blue-600","ring-2","ring-blue-500/30","bg-blue-50/20"),M.classList.remove("border-slate-200"),M.querySelector(".style-check-badge")?.classList.remove("hidden")):(M.classList.remove("border-blue-600","ring-2","ring-blue-500/30","bg-blue-50/20"),M.classList.add("border-slate-200"),M.querySelector(".style-check-badge")?.classList.add("hidden"))}),y)E&&(E.value=y.getAttribute("data-style-id")||x);else if(p.length>0){const M=p[0];M.classList.add("border-blue-600","ring-2","ring-blue-500/30","bg-blue-50/20"),M.classList.remove("border-slate-200"),M.querySelector(".style-check-badge")?.classList.remove("hidden"),E&&(E.value=M.getAttribute("data-style-id")||"Comic")}}function Wa(){document.querySelectorAll(".style-preview-card").forEach(p=>{p.onclick=()=>{const E=p.getAttribute("data-style-id");Et(E)}})}function qs(x,p=!1){const E=Ms(x),y=E.id,O=document.getElementById("gen-style-select"),M=document.getElementById("gen-active-style-name"),R=document.getElementById("gen-active-style-desc"),K=document.getElementById("gen-active-style-img");O&&(O.value=y),M&&(M.textContent=E.name),R&&(R.textContent=E.description||E.tagline),K&&(K.src=E.previewImage,K.onerror=()=>{K.onerror=null,K.src=E.fallbackSvg}),document.querySelectorAll(".gen-style-gallery-card").forEach(D=>{const q=D.getAttribute("data-style-id"),re=D.querySelector(".gen-style-gallery-check");q===y?(D.classList.add("border-blue-600","ring-2","ring-blue-500/30","bg-blue-50/30"),D.classList.remove("border-slate-200"),re?.classList.remove("hidden")):(D.classList.remove("border-blue-600","ring-2","ring-blue-500/30","bg-blue-50/30"),D.classList.add("border-slate-200"),re?.classList.add("hidden"))}),p&&(document.getElementById("gen-step-styles")?.classList.add("hidden"),document.getElementById("gen-step-config")?.classList.remove("hidden"),S(`Art style set to ${E.name}`))}function qn(){const x=document.getElementById("btn-browse-all-styles"),p=document.getElementById("gen-active-style-card"),E=document.getElementById("btn-change-style-action"),y=re=>{re?.preventDefault(),re?.stopPropagation(),document.getElementById("gen-step-config")?.classList.add("hidden"),document.getElementById("gen-step-styles")?.classList.remove("hidden");const Oe=document.getElementById("gen-style-select")?.value||"Soft Pencil";qs(Oe,!1)};x&&(x.onclick=y),p&&(p.onclick=y),E&&(E.onclick=y);const O=document.getElementById("btn-back-to-gen-config");O&&(O.onclick=re=>{re.preventDefault(),re?.stopPropagation(),document.getElementById("gen-step-styles")?.classList.add("hidden"),document.getElementById("gen-step-config")?.classList.remove("hidden")}),document.querySelectorAll(".gen-style-gallery-card").forEach(re=>{re.onclick=Oe=>{Oe.preventDefault(),Oe?.stopPropagation();const at=re.getAttribute("data-style-id");qs(at,!0)}});const M=document.getElementById("btn-custom-style-card"),R=document.getElementById("gen-custom-style-drawer"),K=document.getElementById("btn-cancel-custom-style"),D=document.getElementById("btn-apply-custom-style"),q=document.getElementById("input-custom-style-name");M&&R&&(M.onclick=()=>{R.classList.remove("hidden"),q?.focus()}),K&&R&&(K.onclick=()=>{R.classList.add("hidden")}),D&&q&&(D.onclick=()=>{const re=q.value.trim();if(!re){S("Please enter an art style name");return}const Oe=document.getElementById("gen-style-select"),at=document.getElementById("gen-active-style-name"),ae=document.getElementById("gen-active-style-desc");Oe&&(Oe.value=re),at&&(at.textContent=re),ae&&(ae.textContent="Custom user-defined art style"),R.classList.add("hidden"),document.getElementById("gen-step-styles")?.classList.add("hidden"),document.getElementById("gen-step-config")?.classList.remove("hidden"),S(`Art style set to "${re}"`)})}async function dn(){try{Ke=await ka()}catch{Ke={visualStyle:"Concept Art",aspectRatio:"2.39:1",shotSize:"Medium",cameraAngle:"Eye Level",lens:"50mm",lighting:"Auto / Scene-based",experienceLevel:"Intermediate"}}return Ke}async function zs(x){l=x;const p=!x,E=N?.shots||[],y=p?null:E.find(fn=>fn.id===x),O=Ke||await dn(),M=String.fromCharCode(65+E.length%26),R=`${N?.sceneNumber||1}${M}`,K=y?.shotNumber||R,D=document.getElementById("modal-shot-pill"),q=document.getElementById("modal-shot-heading"),re=document.getElementById("display-shot-number");D&&(D.textContent=K),q&&(q.textContent=p?"Add New Shot":`Edit Shot ${K}`),re&&(re.textContent=K);const Oe=document.getElementById("input-shot-number"),at=document.getElementById("input-shot-title"),ae=document.getElementById("input-shot-type"),Qe=document.getElementById("input-shot-desc"),vs=document.getElementById("input-shot-size"),ws=document.getElementById("input-shot-angle"),Gs=document.getElementById("input-shot-ratio"),Ss=document.getElementById("input-shot-movement"),Es=document.getElementById("input-shot-focal"),ks=document.getElementById("input-shot-lighting"),Is=document.getElementById("input-shot-direction"),is=document.getElementById("input-shot-approval"),rs=document.getElementById("input-shot-notes");Oe&&(Oe.value=K),at&&(at.value=y?.title||(p?`Shot ${K}`:"")),ae&&(ae.value=y?.shotType||""),Qe&&(Qe.value=y?.description||""),vs&&(vs.value=y?.shotSize||O?.shotSize||"Medium"),ws&&(ws.value=y?.cameraAngle||O?.cameraAngle||"Eye Level"),Gs&&(Gs.value=y?.aspectRatio||N?.aspectRatio||O?.aspectRatio||"2.39:1"),Ss&&(Ss.value=y?.cameraMovement||"Static"),Es&&(Es.value=y?.focalLength||y?.lens||O?.lens||"50mm"),ks&&(ks.value=y?.lightingMood||y?.lighting||O?.lighting||"Auto / Scene-based"),Is&&(Is.value=y?.continuity?.screenDirection||"Left to Right"),is&&(is.value=y?.approvalStatus||"draft"),rs&&(rs.value=y?.directorNotes||""),Wa();const Ws=y?.visualStyle||N?.visualStyle||O?.visualStyle||"Concept Art";Et(Ws),h=y?.imageUrl?It(y.imageUrl,y.shotNumber):null,g=y?.prompt||"",v=y?.approvalStatus||"draft",hs(),ve&&ve.classList.toggle("hidden",p),lt(be)}function hs(){const x=document.getElementById("modal-shot-image"),p=document.getElementById("modal-empty-image-placeholder"),E=document.getElementById("modal-post-gen-actions"),y=document.getElementById("modal-btn-view-fullscreen"),O=document.getElementById("modal-generate-action-label"),M=document.getElementById("modal-btn-toggle-approve"),R=document.getElementById("modal-btn-toggle-reject"),K=document.getElementById("modal-btn-open-history"),D=document.getElementById("modal-approve-toggle-label"),q=document.getElementById("modal-history-count");h?(x&&(x.src=It(h,l),x.onerror=()=>{x.src=`${_e}assets/storyboard/shot_1a_wide_outpost.jpg`},x.classList.remove("hidden")),p&&p.classList.add("hidden"),E&&E.classList.remove("hidden"),y&&y.classList.remove("hidden"),O&&(O.textContent="Regenerate Image")):(x&&x.classList.add("hidden"),p&&p.classList.remove("hidden"),E&&E.classList.add("hidden"),y&&y.classList.add("hidden"),O&&(O.textContent="Generate Image"));const re=l?N?.shots?.find(at=>at.id===l):null,Oe=Array.isArray(re?.history)?re.history.length:0;q&&(q.textContent=String(Oe)),K&&(K.title=Oe>0?`Version History (${Oe} version${Oe>1?"s":""})`:"Version History (0)"),M&&R&&(v==="approved"?(M.className="h-9 rounded-lg bg-emerald-600 text-white border border-emerald-600 ring-2 ring-emerald-400/40 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-xs",M.title="Approved for Production (Click to toggle)",R.className="h-9 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-2xs",R.title="Reject Frame"):v==="rejected"?(R.className="h-9 rounded-lg bg-rose-600 text-white border border-rose-600 ring-2 ring-rose-400/40 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-xs",R.title="Rejected (Click to toggle)",M.className="h-9 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-2xs",M.title="Approve Frame"):(M.className="h-9 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 active:scale-95 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-2xs",M.title="Approve Frame",R.className="h-9 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 active:scale-95 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-2xs",R.title="Reject Frame")),D&&(D.textContent=v==="approved"?"Approved":"Approve")}function Ka(){b="single";const x=V.find(re=>re.id===a)||V[0]||{},p=document.getElementById("gen-scene-heading-display"),E=document.getElementById("gen-scene-cast-display"),y=document.getElementById("gen-scene-snippet-display"),O=document.getElementById("gen-modal-title"),M=document.getElementById("gen-shot-count-container"),R=document.getElementById("gen-prompt-input"),K=document.getElementById("gen-ratio-select");if(O&&(O.textContent="AI Generate Shot"),p&&(p.textContent=x.heading||"SCENE 1"),E&&(E.textContent=`Cast: ${(x.cast||["KEVIN","MARCUS"]).join(", ")}`),y){const re=document.getElementById("input-shot-desc")?.value.trim();y.textContent=re||x.snippet||"Shot awaiting visual direction."}if(M&&M.classList.add("hidden"),R){const re=document.getElementById("input-shot-desc")?.value.trim()||"";R.value=re,R.classList.remove("border-rose-400","bg-rose-50/20")}const D=document.getElementById("input-shot-ratio")?.value||N?.aspectRatio||"2.39:1";K&&(K.value=D),document.getElementById("gen-step-config")?.classList.remove("hidden"),document.getElementById("gen-step-styles")?.classList.add("hidden"),document.getElementById("gen-step-progress")?.classList.add("hidden"),document.getElementById("gen-step-preview")?.classList.add("hidden"),pn(),Vs(),qn();const q=document.getElementById("input-shot-style")?.value||N?.visualStyle||Ke?.visualStyle||"Soft Pencil";qs(q,!1),oe&&oe.classList.add("hidden"),lt(ye)}function zn(){b="sequence";const x=V.find(D=>D.id===a)||V[0]||{},p=document.getElementById("gen-scene-heading-display"),E=document.getElementById("gen-scene-cast-display"),y=document.getElementById("gen-scene-snippet-display"),O=document.getElementById("gen-modal-title"),M=document.getElementById("gen-shot-count-container");O&&(O.textContent="Generate Scene Shot Sequence"),p&&(p.textContent=x.heading||"SCENE 1"),E&&(E.textContent=`Cast: ${(x.cast||["KEVIN","MARCUS"]).join(", ")}`),y&&(y.textContent=x.snippet||"Scene awaiting visual direction."),M&&M.classList.remove("hidden"),document.getElementById("gen-step-config")?.classList.remove("hidden"),document.getElementById("gen-step-styles")?.classList.add("hidden"),document.getElementById("gen-step-progress")?.classList.add("hidden"),document.getElementById("gen-step-preview")?.classList.add("hidden"),Me&&(Me.value=String(c)),pn(),Vs(),qn();const R=N?.visualStyle||Ke?.visualStyle||"Soft Pencil";qs(R,!1);const K=document.getElementById("gen-prompt-input");K&&(!K.value.trim()&&x.snippet&&(K.value=x.snippet),K.classList.remove("border-rose-400","bg-rose-50/20")),oe&&oe.classList.add("hidden"),lt(ye)}function pn(){const x=document.getElementById("gen-submit-label");x&&(b==="single"?x.textContent="Generate Shot Image":x.textContent=`Generate ${c}-Shot Sequence`)}function Vs(){if(!ce)return;const x=ce.value,p=X.find(E=>E.id===x)||X[0]||{pricingType:"free",isConfigured:!0};if(_&&(p.isConfigured||!p.requiresApiKey?(_.className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1",_.innerHTML='<span class="material-symbols-outlined text-[14px]">check_circle</span><span>Configured & Ready</span>'):(_.className="text-[11px] text-amber-600 font-medium mt-0.5 flex items-center gap-1",_.innerHTML=`<span class="material-symbols-outlined text-[14px]">info</span><span>Key missing in backend .env (${p.envVarName||"API_KEY"})</span>`)),Ae)if(p.pricingType==="free")Ae.textContent="Free (Built-in Concept Engine, no API keys or charges required).";else{const E=b==="single"?1:c||4,y=`$${((p.costPerImage||.04)*E).toFixed(3)} (${E}-shot${E>1?" batch":""})`;Ae.textContent=`${p.costLabel||"Paid API"} — Estimated: ${y}. Server credentials required.`}}function un(){document.getElementById("gen-step-progress")?.classList.add("hidden");const x=document.getElementById("gen-step-preview");x&&x.classList.remove("hidden");const p=document.getElementById("gen-preview-count-label");p&&(p.textContent=`${d.length} Shots Proposed`);const E=document.getElementById("gen-preview-grid");E&&(E.innerHTML=d.map((y,O)=>`
      <div class="bg-white rounded-xl border border-slate-200 p-2.5 flex flex-col gap-2 shadow-2xs" data-proposed-idx="${O}">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-1.5">
            <span class="font-mono font-bold text-blue-600">${y.shotNumber}</span>
            <span class="font-semibold text-slate-800 truncate max-w-[140px]">${y.title}</span>
          </div>
          <button type="button" class="btn-toggle-prop-approve px-2 py-0.5 rounded text-[10px] font-semibold border cursor-pointer capitalize ${y.approvalStatus==="approved"?"bg-emerald-50 text-emerald-700 border-emerald-200":"bg-amber-50 text-amber-700 border-amber-200"}" data-proposed-idx="${O}">
            ${y.approvalStatus||"Proposed"}
          </button>
        </div>

        <div class="aspect-video bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center relative cursor-pointer btn-prop-lightbox" data-proposed-idx="${O}">
          <img src="${y.imageUrl}" alt="${y.title}" class="w-full h-full object-cover" />
          <div class="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-white font-mono text-[9px]">
            ${y.aspectRatio||"2.39:1"} · ${y.focalLength||"50mm"}
          </div>
        </div>

        <div class="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
          <span>${y.shotSize||"Wide"} · ${y.cameraAngle||"Eye Level"}</span>
          <button type="button" class="btn-prop-regen text-blue-600 hover:text-blue-800 font-semibold cursor-pointer" data-proposed-idx="${O}">
            Regenerate
          </button>
        </div>
      </div>
    `).join(""),E.querySelectorAll(".btn-toggle-prop-approve").forEach(y=>{y.onclick=O=>{O.stopPropagation();const M=Number(y.getAttribute("data-proposed-idx"));d[M]&&(d[M].approvalStatus=d[M].approvalStatus==="approved"?"proposed":"approved",un())}}),E.querySelectorAll(".btn-prop-lightbox").forEach(y=>{y.onclick=()=>{const O=Number(y.getAttribute("data-proposed-idx"));d[O]&&Kn(d[O])}}),E.querySelectorAll(".btn-prop-regen").forEach(y=>{y.onclick=async O=>{O.stopPropagation();const M=Number(y.getAttribute("data-proposed-idx")),R=d[M];if(R){y.disabled=!0,y.textContent="Generating...";try{const K=await cs(o,{provider:R.provider||"scriptora-concept",prompt:R.prompt||R.description||"Cinematic composition",shotSize:R.shotSize,cameraAngle:R.cameraAngle,focalLength:R.focalLength,lightingMood:R.lightingMood,aspectRatio:R.aspectRatio,visualStyle:R.visualStyle,sceneHeading:N?.sceneHeading||"SCENE 1",shotNumber:R.shotNumber});K?.imageUrl&&(R.imageUrl=K.imageUrl,S(`Regenerated proposed frame ${R.shotNumber}`),un())}catch(K){S(K.message||"Regeneration failed")}finally{y.disabled=!1}}}}))}function Vn(x){const p=document.getElementById("regen-current-image"),E=document.getElementById("regen-preview-style-label"),y=Ms(x);E&&(E.textContent=y.name),p&&(p.src=y.previewImage,p.onerror=()=>{p.onerror=null,p.src=y.fallbackSvg})}function Ja(x){r=x;const p=N?.shots?.find(q=>q.id===x);if(!p)return;const E=document.getElementById("regen-shot-pill"),y=document.getElementById("regen-prompt-input"),O=document.getElementById("regen-style-select"),M=document.getElementById("regen-current-frame-pill"),R=document.getElementById("regen-current-frame-thumb"),K=document.getElementById("regen-current-frame-pill-num");E&&(E.textContent=p.shotNumber),y&&(y.value=p.description||p.prompt||""),M&&R&&(p.imageUrl?(R.src=p.imageUrl,K&&(K.textContent=p.shotNumber),M.classList.remove("hidden")):M.classList.add("hidden"));const D=p.visualStyle||"Concept Art";O&&(O.value=D,O.onchange=q=>{Vn(q.target.value)}),Vn(D),Gn(),lt(ue)}function Gn(){const x=document.getElementById("regen-provider-select"),p=document.getElementById("regen-cost-banner");if(!x||!p)return;const E=X.find(y=>y.id===x.value)||X[0]||{pricingType:"free"};E.pricingType==="free"?p.textContent="Free (Built-in Concept Engine, no charges).":p.textContent=`Estimated: ${E.costLabel||"$0.040"}. Server credentials required.`}function Wn(x){f=x;const p=N?.shots?.find(R=>R.id===x);if(!p)return;const E=document.getElementById("history-modal-title");E&&(E.textContent=`Image History & Variations — Shot ${p.shotNumber}`);const y=document.getElementById("history-items-container");if(!y)return;const O=Array.isArray(p.history)?p.history:[],M=`
      <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-16 h-12 bg-slate-950 rounded-lg overflow-hidden shrink-0 border border-blue-300 flex items-center justify-center">
            ${p.imageUrl?`<img src="${p.imageUrl}" alt="Active Frame" class="w-full h-full object-cover" />`:'<span class="material-symbols-outlined text-slate-400 text-base">image</span>'}
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold text-[9px] uppercase tracking-wider">Active Frame</span>
              <span class="font-mono text-xs font-bold text-slate-800">REC · ${p.shotNumber}</span>
            </div>
            <p class="text-[11px] text-slate-600 truncate mt-0.5 font-medium">${p.title||p.description||"Current active frame"}</p>
          </div>
        </div>
        <span class="text-[10px] text-blue-700 font-semibold font-mono shrink-0">In Production</span>
      </div>
    `;O.length?(y.innerHTML=M+O.slice().map((R,K)=>{const D=R.timestamp?new Date(R.timestamp).toLocaleString():"Past Version",q=R.previousImageUrl||R.imageUrl,re=q?It(q,p?.shotNumber):"";let Oe='<span class="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 text-slate-700 font-semibold">Take</span>';return R.generationType==="variation"?Oe=`<span class="px-1.5 py-0.5 rounded text-[10px] bg-purple-100 text-purple-800 font-bold border border-purple-200">Variation: ${(R.variationType||"Creative").toUpperCase()}</span>`:R.generationType==="retry"&&(Oe='<span class="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-bold border border-amber-200">Retry</span>'),`
          <div class="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-2.5 shadow-2xs hover:border-slate-300 transition-all">
            <div class="flex items-center justify-between text-xs font-semibold text-slate-700">
              <div class="flex items-center gap-1.5">
                ${Oe}
                <span class="font-mono text-[11px] text-slate-500">${D}</span>
              </div>
              <span class="text-[10px] text-slate-400 font-mono">${R.visualStyle||"Storyboard Sketch"}</span>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-20 h-14 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shrink-0 flex items-center justify-center cursor-pointer group relative">
                ${re?`
                  <img src="${re}" onerror="this.onerror=null; this.src='${_e}assets/storyboard/shot_1a_wide_outpost.jpg';" alt="Historical version" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                `:`
                  <span class="material-symbols-outlined text-slate-600 text-base">image</span>
                `}
              </div>
              <div class="min-w-0 flex-1 text-[11px] text-slate-600">
                <p class="line-clamp-2 italic">${R.prompt||R.previousPrompt||"No prompt recorded"}</p>
                <div class="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                  <span>Provider: ${R.provider||"scriptora-concept"}</span>
                  <span>·</span>
                  <span>Version #${O.length-K}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end pt-1 border-t border-slate-100">
              <button type="button" class="btn-restore-version px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-[11px] transition-all cursor-pointer flex items-center gap-1 shadow-2xs" data-hist-idx="${K}">
                <span class="material-symbols-outlined text-[13px]">restore</span>
                <span>Restore This Take</span>
              </button>
            </div>
          </div>
        `}).join(""),y.querySelectorAll(".btn-restore-version").forEach(R=>{R.onclick=async()=>{const K=Number(R.getAttribute("data-hist-idx")),D=O[K];if(!D)return;const q=D.previousImageUrl||D.imageUrl;if(q){p.imageUrl&&p.history.unshift({id:`v-${Date.now()}`,imageUrl:p.imageUrl,previousImageUrl:p.imageUrl,prompt:p.prompt||p.description||"Current take before restore",generationType:"restore",visualStyle:p.visualStyle,timestamp:new Date().toISOString()}),p.imageUrl=q,D.prompt&&(p.prompt=D.prompt),D.visualStyle&&(p.visualStyle=D.visualStyle);try{await $s(o,a,f,{imageUrl:q,prompt:p.prompt,visualStyle:p.visualStyle})}catch{}try{await Ht(o,N)}catch{}S(`Restored version to Shot ${p.shotNumber}`),we(z),vt()}}})):y.innerHTML=M+`
        <div class="p-8 text-center text-slate-400 text-xs">
          <span class="material-symbols-outlined text-2xl text-slate-400">history</span>
          <p class="mt-1">No previous versions recorded for this shot yet.</p>
          <p class="text-[10px] text-slate-400 mt-0.5">Use Retry or Variation to create new takes and preserve previous iterations.</p>
        </div>
      `,lt(z)}function Ya(x){const p=N?.shots||[];p.length&&(u=x>=0&&x<p.length?x:0,ys(),Ce?.classList.remove("hidden"))}function Kn(x){const p=document.getElementById("lb-image"),E=document.getElementById("lb-shot-num"),y=document.getElementById("lb-specs"),O=document.getElementById("lb-title"),M=document.getElementById("lb-desc"),R=document.getElementById("lb-btn-approve"),K=document.getElementById("lb-btn-reject"),D=document.getElementById("lb-prev"),q=document.getElementById("lb-next");p&&(p.src=It(x.imageUrl,x.shotNumber),p.onerror=()=>{p.src=`${_e}assets/storyboard/shot_1a_wide_outpost.jpg`}),E&&(E.textContent=`REC · ${x.shotNumber}`),y&&(y.textContent=`${x.aspectRatio||"2.39:1"} · ${x.focalLength||"50mm"} · ${x.shotSize||"Medium"}`),O&&(O.textContent=x.title),M&&(M.textContent=x.description||"No description provided."),D&&D.classList.add("hidden"),q&&q.classList.add("hidden"),R&&R.classList.add("hidden"),K&&K.classList.add("hidden"),Ce?.classList.remove("hidden")}function ys(){const p=(N?.shots||[])[u];if(!p)return;const E=document.getElementById("lb-image"),y=document.getElementById("lb-shot-num"),O=document.getElementById("lb-specs"),M=document.getElementById("lb-title"),R=document.getElementById("lb-desc"),K=document.getElementById("lb-approve-label"),D=document.getElementById("lb-prev"),q=document.getElementById("lb-next"),re=document.getElementById("lb-btn-approve"),Oe=document.getElementById("lb-btn-reject");D&&D.classList.remove("hidden"),q&&q.classList.remove("hidden"),re&&re.classList.remove("hidden"),Oe&&Oe.classList.remove("hidden"),E&&(E.src=It(p.imageUrl,p.shotNumber),E.onerror=()=>{E.src=`${_e}assets/storyboard/shot_1a_wide_outpost.jpg`}),y&&(y.textContent=`REC · ${p.shotNumber}`),O&&(O.textContent=`${p.aspectRatio||"2.39:1"} · ${p.focalLength||"50mm"} · ${p.shotSize||"Medium"}`),M&&(M.textContent=p.title),R&&(R.textContent=p.description||"No description provided."),K&&(K.textContent=p.approvalStatus==="approved"?"Approved":"Approve")}async function kt(){if(B){B.innerHTML='<div class="p-16 text-center text-slate-400 text-xs">Loading storyboard shots...</div>';try{N=await as(o,a)}catch(x){console.error(x),N={sceneId:a,shots:[]}}Xa(),vt()}}function Xa(){const x=V.find(R=>R.id===a)||V[0]||{},p=document.getElementById("badge-int-ext"),E=document.getElementById("badge-day-night"),y=document.getElementById("badge-pages"),O=document.getElementById("badge-shoot-day"),M=document.getElementById("scene-snippet-text");if(p&&(p.textContent=x.intExt||"INT"),E&&(E.textContent=x.dayNight||"DAY"),y&&(y.textContent=`${x.pages||"1.0"} pgs`),O&&(O.textContent=x.shootDay||"Day 1 of 7"),M&&(M.textContent=x.snippet||"Scene awaiting visual direction."),se){const R=String(x.shootDay||"1").match(/\d+/)?.[0]||"1";se.href=`/production/schedule?scriptId=${o}&day=${R}&sceneId=${x.id}`}if(ge)if(N?.isVersionStale){ge.classList.remove("hidden");const R=document.getElementById("stale-pinned-ver"),K=document.getElementById("stale-active-ver");R&&(R.textContent=N.sourceVersion||"Draft 4.2"),K&&(K.textContent=N.currentScriptDraft||"Draft 4.3")}else ge.classList.add("hidden");Za()}function Za(){if(!ke)return;const x=N?.shots||[];let p=!1,E="";for(let y=0;y<x.length-1;y++){const O=x[y],M=x[y+1],R=O?.shotSize||"",K=M?.shotSize||"";if(R.includes("Close")&&K.includes("Close")){const D=O.continuity?.eyeline?.toLowerCase()||O.continuity?.screenDirection?.toLowerCase()||"",q=M.continuity?.eyeline?.toLowerCase()||M.continuity?.screenDirection?.toLowerCase()||"";if(D&&q&&D===q&&(D.includes("screen")||D.includes("left")||D.includes("right"))){p=!0,E=`Shot ${O.shotNumber} and Shot ${M.shotNumber} both have screen direction "${O.continuity.screenDirection||O.continuity.eyeline}", which may create a jump or reverse-angle crossing.`;break}}}if(p){ke.classList.remove("hidden");const y=document.getElementById("continuity-warning-text");y&&(y.textContent=E)}else ke.classList.add("hidden")}function vt(){if(!B)return;const x=N?.shots||[];if(!x.length){B.innerHTML=`
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
            <button id="btn-empty-generate" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
              <span>Generate Scene Sequence</span>
            </button>
            <button id="btn-empty-add" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer">
              <span>+ Add Shot Manually</span>
            </button>
          </div>
        </div>
      `;const p=document.getElementById("btn-empty-generate"),E=document.getElementById("btn-empty-add");p&&(p.onclick=()=>zn()),E&&(E.onclick=()=>zs(null));return}i==="contact"?eo(x):mn(x)}const Zt=()=>vt();function Qa(x="",p=[]){if(!x)return"No description provided.";let E=x;return Array.isArray(p)&&p.forEach(y=>{if(!y||y.length<2)return;const O=new RegExp(`\\b(${y})\\b`,"gi");E=E.replace(O,'<span class="font-semibold text-blue-700">$1<span class="material-symbols-outlined text-[12px] text-blue-600 align-text-bottom ml-0.5">person</span></span>')}),E}function eo(x){B.innerHTML=`
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        ${x.map(p=>{const E=p.approvalStatus==="approved"?"bg-emerald-50 text-emerald-700 border-emerald-200":p.approvalStatus==="proposed"?"bg-amber-50 text-amber-700 border-amber-200":p.approvalStatus==="rejected"?"bg-rose-50 text-rose-700 border-rose-200":"bg-slate-100 text-slate-600 border-slate-200",y=Array.isArray(p.history)?p.history.length:0;return`
            <div class="storyboard-card bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between" data-shot-id="${p.id}">
              <div>
                <!-- Top Card Meta Header -->
                <div class="px-3 py-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                  <div class="flex items-center gap-1.5">
                    <span class="font-mono font-bold text-xs text-slate-900">${p.shotNumber}</span>
                    <span class="text-[10px] text-slate-400">#${p.order}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <button type="button" class="btn-card-delete-shot p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded cursor-pointer transition-colors" data-shot-id="${p.id}" title="Delete Shot (Move to Recycle Bin)" aria-label="Delete Shot ${p.shotNumber}">
                      <span class="material-symbols-outlined text-[15px]">delete</span>
                    </button>
                    ${p.isGenerating?`
                      <span class="px-2 py-0.5 rounded text-[10px] font-semibold border bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
                        Generating
                      </span>
                    `:p.generationError?`
                      <span class="px-2 py-0.5 rounded text-[10px] font-semibold border bg-rose-50 text-rose-700 border-rose-200">
                        Failed
                      </span>
                    `:`
                      <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold border ${E} capitalize">
                        ${p.approvalStatus||"Draft"}
                      </span>
                    `}
                    ${y>0?`
                      <button class="btn-card-history p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${p.id}" title="View generation history (${y} previous versions)">
                        <span class="material-symbols-outlined text-[15px]">history</span>
                      </button>
                    `:""}
                  </div>
                </div>

                <!-- Primary Visual Image Canvas -->
                <div class="aspect-video bg-slate-950 flex items-center justify-center relative overflow-hidden group ${p.isGenerating||p.generationError?"":"cursor-pointer btn-open-lightbox"}" data-shot-id="${p.id}">
                  <!-- Camera Icon Badge -->
                  <div class="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white flex items-center justify-center pointer-events-none z-10 shadow-xs" title="Cinematography Frame">
                    <span class="material-symbols-outlined text-[15px]">videocam</span>
                  </div>
                  ${p.isGenerating?`
                    <div class="w-full h-full bg-amber-50/80 border-b border-amber-200/70 flex flex-col items-center justify-center gap-2 p-4 text-center select-none">
                      <div class="relative flex items-center justify-center">
                        <div class="w-10 h-10 rounded-full border-2 border-blue-500/20 border-t-blue-600 animate-spin"></div>
                        <span class="material-symbols-outlined text-blue-600 text-lg absolute animate-pulse">edit</span>
                      </div>
                      <div class="flex flex-col items-center gap-0.5">
                        <span class="text-xs font-bold text-slate-900 tracking-tight">Sketching Shot ${p.shotNumber}...</span>
                        <span class="text-[10px] text-slate-500 font-medium">${p.shotSize||"Wide"} · ${p.cameraAngle||"Eye Level"}</span>
                      </div>
                      <div class="w-28 h-1 bg-slate-200 rounded-full overflow-hidden mt-0.5">
                        <div class="h-full bg-blue-600 rounded-full animate-pulse w-3/4"></div>
                      </div>
                    </div>
                  `:p.generationError?`
                    <div class="w-full h-full bg-slate-900 flex flex-col items-center justify-center gap-1.5 p-3 text-center">
                      <span class="material-symbols-outlined text-xl text-rose-400">error_outline</span>
                      <span class="text-[10px] font-medium text-rose-200 line-clamp-2 px-1">${p.generationError}</span>
                      <button type="button" class="btn-card-retry-gen mt-1 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs" data-shot-id="${p.id}">
                        <span class="material-symbols-outlined text-[13px]">refresh</span>
                        <span>Retry Generation</span>
                      </button>
                    </div>
                  `:p.imageUrl?`
                    <img src="${It(p.imageUrl,p.shotNumber)}" onerror="this.onerror=null; this.src='${_e}assets/storyboard/shot_1a_wide_outpost.jpg';" alt="${p.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102" />
                    <!-- Badges overlay -->
                    <div class="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/75 text-white font-mono text-[9px] backdrop-blur-xs">
                      ${p.aspectRatio||"2.39:1"} · ${p.focalLength||"50mm"}
                    </div>
                    <button class="absolute bottom-2 right-2 p-1 rounded bg-black/60 hover:bg-black/80 text-white text-[12px] opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer" title="View Full Size">
                      <span class="material-symbols-outlined text-[14px]">fullscreen</span>
                    </button>
                  `:`
                    <div class="flex flex-col items-center justify-center text-slate-500 gap-1 p-4 text-center">
                      <span class="material-symbols-outlined text-2xl text-slate-600">art_track</span>
                      <span class="text-[10px] font-medium text-slate-400">Tap to inspect & generate frame</span>
                    </div>
                  `}
                </div>

                <!-- Title & Details -->
                <div class="p-3 flex flex-col gap-1.5">
                  <div class="flex items-center justify-between text-xs border-b border-slate-100 pb-1">
                    <span class="font-bold text-slate-900 tracking-tight">Scene: ${N?.sceneNumber||1} | Shot: ${p.shotNumber}</span>
                    <span class="text-[10px] text-slate-400 font-mono">${p.shotSize||"Wide"}</span>
                  </div>
                  <p class="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">${Qa(p.description||p.title||"",p.characters||["Kevin","Marcus","Meera"])}</p>
                </div>
              </div>

              <!-- Card Action Bar: EDIT, RETRY, VARIATION, UPLOAD -->
              <div class="p-2.5 border-t border-slate-100 bg-slate-50/70 flex flex-col gap-2">
                <div class="grid grid-cols-2 gap-1.5">
                  <button type="button" class="btn-open-inspector py-1.5 px-2 rounded-lg bg-white hover:bg-slate-100 active:scale-98 border border-slate-200 text-slate-700 font-bold text-[10px] tracking-wider uppercase cursor-pointer transition-all text-center shadow-2xs" data-shot-id="${p.id}">
                    EDIT
                  </button>
                  <button type="button" class="btn-card-retry-gen py-1.5 px-2 rounded-lg bg-white hover:bg-slate-100 active:scale-98 border border-slate-200 text-slate-700 font-bold text-[10px] tracking-wider uppercase cursor-pointer transition-all flex items-center justify-center gap-1 shadow-2xs" data-shot-id="${p.id}">
                    <span class="material-symbols-outlined text-[13px]">refresh</span> RETRY
                  </button>
                  <button type="button" class="btn-card-variation py-1.5 px-2 rounded-lg bg-white hover:bg-slate-100 active:scale-98 border border-slate-200 text-slate-700 font-bold text-[10px] tracking-wider uppercase cursor-pointer transition-all text-center shadow-2xs" data-shot-id="${p.id}">
                    VARIATION
                  </button>
                  <label class="btn-card-upload-label py-1.5 px-2 rounded-lg bg-white hover:bg-slate-100 active:scale-98 border border-slate-200 text-slate-700 font-bold text-[10px] tracking-wider uppercase cursor-pointer transition-all text-center shadow-2xs flex items-center justify-center">
                    UPLOAD
                    <input type="file" accept="image/*" class="hidden input-card-upload-file" data-shot-id="${p.id}" />
                  </label>
                </div>

                <!-- Sub-bar: Reorder & Status Approval -->
                <div class="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                  <div class="flex items-center gap-1">
                    <button class="btn-move-up p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${p.id}" title="Move left / up">
                      <span class="material-symbols-outlined text-[15px]">arrow_back</span>
                    </button>
                    <button class="btn-move-down p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${p.id}" title="Move right / down">
                      <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  </div>
                  <button class="btn-quick-approve px-2 py-0.5 rounded ${p.approvalStatus==="approved"?"text-emerald-700 bg-emerald-50 border border-emerald-200 font-semibold":"text-slate-500 hover:text-emerald-600"} cursor-pointer transition-colors flex items-center gap-1" data-shot-id="${p.id}">
                    <span class="material-symbols-outlined text-[13px]">${p.approvalStatus==="approved"?"check_circle":"check"}</span>
                    <span>${p.approvalStatus==="approved"?"Approved":"Approve"}</span>
                  </button>
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    `,Yn()}function mn(x){const p=x.length>0&&x.every(D=>m.has(D.id)),E=m.size;B.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col">
        <!-- Sequence Toolbar with Batch Selection -->
        <div class="px-3.5 sm:px-4 py-2.5 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div class="flex items-center gap-2">
            <label class="inline-flex items-center gap-1.5 cursor-pointer select-none">
              <input type="checkbox" id="seq-select-all" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" ${p?"checked":""} />
              <span class="font-heading font-bold text-slate-800 text-xs sm:text-sm">${x.length} Shots in Sequence</span>
            </label>
            ${E>0?`
              <span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                ${E} selected
              </span>
            `:""}
          </div>

          <!-- Batch Action Controls -->
          <div class="flex items-center gap-2 flex-wrap">
            ${E>0?`
              <button id="btn-batch-approve-selected" class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold cursor-pointer transition-all flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">done_all</span>
                <span>Approve Selected (${E})</span>
              </button>
              <button id="btn-batch-reject-selected" class="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-[11px] font-semibold cursor-pointer transition-all flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">close</span>
                <span>Reject</span>
              </button>
            `:`
              <button id="btn-batch-approve-all" class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold cursor-pointer transition-all flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">done_all</span>
                <span>Approve All Proposed</span>
              </button>
            `}
            <button id="btn-seq-add-shot" class="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-semibold hover:bg-black cursor-pointer flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">add</span>
              <span>Add Shot</span>
            </button>
          </div>
        </div>

        <!-- Shots Sequence Table -->
        <div class="divide-y divide-slate-100">
          ${x.map(D=>{const q=D.approvalStatus==="approved"?"bg-emerald-50 text-emerald-700 border-emerald-200":D.approvalStatus==="proposed"?"bg-amber-50 text-amber-700 border-amber-200":D.approvalStatus==="rejected"?"bg-rose-50 text-rose-700 border-rose-200":"bg-slate-100 text-slate-600 border-slate-200",re=m.has(D.id);return`
              <div class="p-3 sm:p-4 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0 w-full overflow-hidden" data-shot-id="${D.id}">
                <div class="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1 w-full">
                  <!-- Row selection checkbox -->
                  <div class="pt-1.5 shrink-0">
                    <input type="checkbox" class="seq-shot-check rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" data-shot-id="${D.id}" ${re?"checked":""} />
                  </div>

                  <!-- Reorder Controls -->
                  <div class="flex sm:flex-col items-center gap-0.5 sm:gap-1 shrink-0 pt-0.5">
                    <button class="btn-move-up p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${D.id}" title="Move up in sequence">
                      <span class="material-symbols-outlined text-[16px]">expand_less</span>
                    </button>
                    <span class="font-mono font-bold text-xs text-slate-700">${D.order}</span>
                    <button class="btn-move-down p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${D.id}" title="Move down in sequence">
                      <span class="material-symbols-outlined text-[16px]">expand_more</span>
                    </button>
                  </div>

                  <!-- Thumbnail Preview -->
                  <div class="w-16 h-12 sm:w-20 sm:h-12 bg-slate-950 rounded-lg overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center ${D.isGenerating||D.generationError?"":"cursor-pointer btn-open-lightbox"}" data-shot-id="${D.id}">
                    ${D.isGenerating?`
                      <span class="material-symbols-outlined text-blue-500 text-base animate-spin">progress_activity</span>
                    `:D.generationError?`
                      <button type="button" class="btn-card-retry-gen p-1 text-rose-400 hover:text-white" data-shot-id="${D.id}" title="Retry Generation">
                        <span class="material-symbols-outlined text-base">refresh</span>
                      </button>
                    `:D.imageUrl?`
                      <img src="${It(D.imageUrl,D.shotNumber)}" onerror="this.onerror=null; this.src='${_e}assets/storyboard/shot_1a_wide_outpost.jpg';" alt="${D.title}" class="w-full h-full object-cover" />
                    `:`
                      <span class="material-symbols-outlined text-slate-600 text-base sm:text-lg">image</span>
                    `}
                  </div>

                  <!-- Shot Summary Info -->
                  <div class="min-w-0 flex-1 overflow-hidden">
                    <div class="flex items-center gap-1.5 flex-wrap min-w-0">
                      <span class="font-mono font-bold text-xs text-blue-600 shrink-0">${D.shotNumber}</span>
                      <h4 class="font-heading font-semibold text-xs text-slate-900 truncate min-w-0 flex-1" title="${D.title}">${D.title}</h4>
                      <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold border ${q} capitalize shrink-0">
                        ${D.approvalStatus||"Draft"}
                      </span>
                    </div>
                    <p class="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed break-words">${D.description||"No description"}</p>
                    <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-slate-500 mt-1.5 min-w-0">
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${D.shotSize||"Wide"}</span>
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${D.cameraAngle||"Eye Level"}</span>
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${D.focalLength||"50mm"}</span>
                      ${D.continuity?.screenDirection?`
                        <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium truncate max-w-full" title="${D.continuity.screenDirection}">
                          ${D.continuity.screenDirection}
                        </span>
                      `:""}
                    </div>
                  </div>
                </div>

                <!-- Action Controls -->
                <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-center mt-1 sm:mt-0">
                  <button class="btn-quick-approve p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-emerald-600 active:scale-95 text-xs cursor-pointer transition-all" data-shot-id="${D.id}" title="${D.approvalStatus==="approved"?"Mark as Draft":"Approve Shot"}">
                    <span class="material-symbols-outlined text-[16px]">${D.approvalStatus==="approved"?"check_circle":"check"}</span>
                  </button>
                  <button class="btn-card-regen p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-600 active:scale-95 text-xs cursor-pointer transition-all" data-shot-id="${D.id}" title="Regenerate this frame">
                    <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                  </button>
                  <button type="button" class="btn-card-delete-shot p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 active:scale-95 text-xs cursor-pointer transition-all" data-shot-id="${D.id}" title="Delete Shot (Move to Recycle Bin)" aria-label="Delete Shot ${D.shotNumber}">
                    <span class="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                  <button class="btn-open-inspector px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-xs font-semibold cursor-pointer transition-all" data-shot-id="${D.id}">
                    Edit Details
                  </button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,Yn();const y=document.getElementById("seq-select-all");y&&(y.onchange=D=>{D.target.checked?x.forEach(q=>m.add(q.id)):m.clear(),mn(x)}),document.querySelectorAll(".seq-shot-check").forEach(D=>{D.onchange=q=>{const re=D.getAttribute("data-shot-id");q.target.checked?m.add(re):m.delete(re),mn(x)}});const O=document.getElementById("btn-batch-approve-selected");O&&(O.onclick=async()=>{const D=Array.from(m);if(D.length)try{await yn(o,a,D,"approved","Batch approved via Sequence Editor"),S(`Approved ${D.length} shots.`),m.clear(),kt()}catch{S("Failed batch approval.")}});const M=document.getElementById("btn-batch-reject-selected");M&&(M.onclick=async()=>{const D=Array.from(m);if(D.length)try{await yn(o,a,D,"rejected","Batch rejected via Sequence Editor"),S(`Marked ${D.length} shots as rejected.`),m.clear(),kt()}catch{S("Failed batch rejection.")}});const R=document.getElementById("btn-batch-approve-all");R&&(R.onclick=async()=>{try{const D=(N?.shots||[]).filter(q=>q.approvalStatus==="proposed"||q.approvalStatus==="draft").map(q=>q.id);if(!D.length){S("All shots are already approved.");return}await yn(o,a,D,"approved","Batch approved for production"),S(`Approved ${D.length} shots.`),kt()}catch{S("Failed batch approval.")}});const K=document.getElementById("btn-seq-add-shot");K&&(K.onclick=()=>zs(null))}function to(x){te=x;const p=N?.shots?.find(re=>re.id===x);if(!p)return;const E=document.getElementById("variation-shot-pill"),y=document.getElementById("variation-shot-title"),O=document.getElementById("variation-shot-meta"),M=document.getElementById("variation-shot-desc"),R=document.getElementById("variation-current-thumb"),K=document.getElementById("variation-thumb-placeholder"),D=document.getElementById("variation-guidance-input");E&&(E.textContent=p.shotNumber),y&&(y.textContent=p.title||`Shot ${p.shotNumber}`),O&&(O.textContent=`${p.shotSize||"Medium"} · ${p.focalLength||"50mm"} · ${p.visualStyle||"Storyboard Sketch"}`),M&&(M.textContent=p.description||"No description provided."),D&&(D.value=""),p.imageUrl?(R&&(R.src=It(p.imageUrl,p.shotNumber),R.onerror=()=>{R.src=`${_e}assets/storyboard/shot_1a_wide_outpost.jpg`},R.classList.remove("hidden")),K&&K.classList.add("hidden")):(R&&R.classList.add("hidden"),K&&K.classList.remove("hidden"));const q=document.querySelector('#variation-options-grid input[value="auto"]');q&&(q.checked=!0,q.dispatchEvent(new Event("change"))),lt(I)}async function so(x,p,E=""){const y=N?.shots?.find(O=>O.id===x);if(y&&!y.isGenerating){y.isGenerating=!0,y.generatingStatus=`Generating ${p.toUpperCase()} Variation...`,y.generationError=null,vt();try{const O=V.find(K=>K.id===a)||V[0]||{};let M=y.prompt||y.description||"Cinematic composition";p==="composition"?M+=", alternative compositional staging, rearranged subject placement and background spatial balance":p==="angle"?M+=", dynamic alternative camera angle perspective":p==="lighting"?M+=", alternate lighting mood study, dramatic rim light and deep shadow contrast":p==="framing"?M+=", alternative focal framing and lens perspective":p==="creative"?M+=", bold creative visual reinterpretation while preserving character and screenplay context":M+=", dynamic alternative variation with fresh cinematic staging",E&&(M+=`. Additional direction: ${E}`);const R=await cs(o,{provider:y.provider||"scriptora-concept",prompt:M,shotSize:y.shotSize,cameraAngle:y.cameraAngle,cameraMovement:y.cameraMovement,focalLength:y.focalLength,lightingMood:y.lightingMood,aspectRatio:y.aspectRatio,visualStyle:y.visualStyle||N?.visualStyle||"Soft Pencil",sceneHeading:N?.sceneHeading||O.heading||"SCENE 1",shotNumber:y.shotNumber,description:y.description,cast:y.characters||O.cast||["KEVIN","MARCUS"],characters:y.characters||O.cast||["KEVIN","MARCUS"],quality:y.quality||"standard",isVariation:!0,variationType:p});if(R?.imageUrl){const K=It(R.imageUrl,y.shotNumber);if(y.history||(y.history=[]),y.imageUrl){const D=It(y.imageUrl,y.shotNumber);y.history.unshift({id:`v-${Date.now()}`,imageUrl:D,previousImageUrl:D,prompt:y.prompt||y.description||"Original take",generationType:"variation",variationType:p,visualStyle:y.visualStyle||"Storyboard Sketch",settings:{shotSize:y.shotSize,cameraAngle:y.cameraAngle,focalLength:y.focalLength,lightingMood:y.lightingMood,aspectRatio:y.aspectRatio},sourceVersion:N?.sourceVersion||"Draft 4.2",timestamp:new Date().toISOString()})}y.imageUrl=K,y.isGenerating=!1,y.generatingStatus=null,y.generationError=null;try{await $s(o,a,x,{imageUrl:K,prompt:M,isVariation:!0,variationType:p})}catch{}try{await Ht(o,N)}catch{}vt(),S(`Created ${p} variation for Shot ${y.shotNumber}`)}else throw new Error("No image returned")}catch(O){y.isGenerating=!1,y.generatingStatus=null,y.generationError=O.message||"Variation failed",vt(),S(`Variation failed for shot ${y.shotNumber}`)}}}async function Jn(x){if(!x)return;const p=N?.shots?.find(y=>y.id===x),E=p?`Shot ${p.shotNumber}`:"this shot";if(confirm(`Move ${E} to the Storyboard Recycle Bin?`))try{await Vo(o,a,x),S(`${E} moved to Recycle Bin`),be&&!be.classList.contains("hidden")&&we(be),await _t(),kt()}catch{S("Failed to delete shot")}}async function no(x){const p=N?.shots?.find(E=>E.id===x);if(p&&!p.isGenerating){p.isGenerating=!0,p.generatingStatus=`Retrying Shot ${p.shotNumber}...`,p.generationError=null,vt();try{const E=V.find(O=>O.id===a)||V[0]||{},y=await cs(o,{provider:p.provider||"scriptora-concept",prompt:p.prompt||p.description||"Cinematic composition",shotSize:p.shotSize,cameraAngle:p.cameraAngle,cameraMovement:p.cameraMovement,focalLength:p.focalLength,lightingMood:p.lightingMood,aspectRatio:p.aspectRatio,visualStyle:p.visualStyle||N?.visualStyle||"Soft Pencil",sceneHeading:N?.sceneHeading||E.heading||"SCENE 1",shotNumber:p.shotNumber,description:p.description,cast:p.characters||E.cast||["KEVIN","MARCUS"],characters:p.characters||E.cast||["KEVIN","MARCUS"],quality:p.quality||"standard",generationType:"retry"});if(y?.imageUrl){const O=It(y.imageUrl,p.shotNumber);if(p.history||(p.history=[]),p.imageUrl&&p.imageUrl!==O){const M=It(p.imageUrl,p.shotNumber);p.history.unshift({id:`v-${Date.now()}`,imageUrl:M,previousImageUrl:M,prompt:p.prompt||p.description||"Previous take",generationType:"retry",visualStyle:p.visualStyle||"Storyboard Sketch",settings:{shotSize:p.shotSize,cameraAngle:p.cameraAngle,focalLength:p.focalLength,lightingMood:p.lightingMood,aspectRatio:p.aspectRatio},sourceVersion:N?.sourceVersion||"Draft 4.2",timestamp:new Date().toISOString()})}p.imageUrl=O,p.isGenerating=!1,p.generatingStatus=null,p.generationError=null;try{await $s(o,a,x,{imageUrl:O})}catch{}try{await Ht(o,N)}catch{}vt(),S(`Shot ${p.shotNumber} regenerated successfully!`)}else throw new Error("No image returned")}catch(E){p.isGenerating=!1,p.generatingStatus=null,p.generationError=E.message||"Generation failed",vt(),S(`Retry failed for shot ${p.shotNumber}`)}}}function Yn(){document.querySelectorAll(".btn-open-inspector").forEach(x=>{x.onclick=p=>{p.stopPropagation();const E=x.getAttribute("data-shot-id");zs(E)}}),document.querySelectorAll(".btn-open-lightbox").forEach(x=>{x.onclick=p=>{p.stopPropagation();const E=x.getAttribute("data-shot-id"),O=(N?.shots||[]).findIndex(M=>M.id===E);Ya(O!==-1?O:0)}}),document.querySelectorAll(".btn-move-up").forEach(x=>{x.onclick=async p=>{p.stopPropagation();const E=x.getAttribute("data-shot-id");Xn(E,-1)}}),document.querySelectorAll(".btn-move-down").forEach(x=>{x.onclick=async p=>{p.stopPropagation();const E=x.getAttribute("data-shot-id");Xn(E,1)}}),document.querySelectorAll(".btn-quick-approve").forEach(x=>{x.onclick=async p=>{p.stopPropagation();const E=x.getAttribute("data-shot-id"),y=N?.shots?.find(M=>M.id===E);if(!y)return;const O=y.approvalStatus==="approved"?"draft":"approved";try{await hn(o,a,E,O),S(`Shot ${y.shotNumber} marked ${O}`),kt()}catch{S("Failed to update shot approval")}}}),document.querySelectorAll(".btn-card-regen").forEach(x=>{x.onclick=p=>{p.stopPropagation();const E=x.getAttribute("data-shot-id");Ja(E)}}),document.querySelectorAll(".btn-card-history").forEach(x=>{x.onclick=p=>{p.stopPropagation();const E=x.getAttribute("data-shot-id");Wn(E)}}),document.querySelectorAll(".btn-card-delete-shot").forEach(x=>{x.onclick=p=>{p.preventDefault(),p.stopPropagation();const E=x.getAttribute("data-shot-id");Jn(E)}}),document.querySelectorAll(".btn-card-retry-gen").forEach(x=>{x.onclick=p=>{p.preventDefault(),p.stopPropagation();const E=x.getAttribute("data-shot-id");no(E)}}),document.querySelectorAll(".btn-card-variation").forEach(x=>{x.onclick=p=>{p.preventDefault(),p.stopPropagation();const E=x.getAttribute("data-shot-id");to(E)}}),document.querySelectorAll(".input-card-upload-file").forEach(x=>{x.onchange=p=>{const E=x.getAttribute("data-shot-id"),y=p.target.files&&p.target.files[0];if(!y||!E)return;const O=new FileReader;O.onload=async M=>{const R=N?.shots?.find(K=>K.id===E);if(R){R.history||(R.history=[]),R.imageUrl&&R.history.unshift({imageUrl:R.imageUrl,prompt:R.prompt||R.description,visualStyle:R.visualStyle,provider:R.provider,createdAt:new Date().toISOString()}),R.imageUrl=M.target.result,R.imageSource="upload";try{await Ht(o,N),Zt(),S(`Uploaded new frame for Shot ${R.shotNumber}`)}catch{S("Failed to save uploaded image")}}},O.readAsDataURL(y)}})}async function Xn(x,p){const E=N?.shots||[],y=E.findIndex(D=>D.id===x);if(y===-1)return;const O=y+p;if(O<0||O>=E.length)return;const M=[...E],[R]=M.splice(y,1);M.splice(O,0,R);const K=M.map(D=>D.id);try{await Go(o,a,K),kt()}catch{S("Failed to reorder shots")}}(async function(){dn(),_t();try{const[p,E]=await Promise.all([fs(o),Uo()]);V=p||[],X=E||[]}catch(p){console.warn("Using offline fallback data for storyboard:",p)}P&&V.length&&(P.innerHTML=V.map(p=>`
        <option value="${p.id}" ${p.id===a?"selected":""}>
          Scene ${p.sceneNumber}: ${p.heading}
        </option>
      `).join(""),P.onchange=p=>{a=p.target.value,m.clear(),kt()}),kt()})()}class ji{constructor(){this.appEl=null,this.currentPath=null,this.isFullScreen=!1,this.isNavigatingBack=!1,this._backInProgress=!1,this.backHandlers=[],this.scrollPositions={},this.historyIndex=0}clearHistory(){this.scrollPositions={},this.historyIndex=0,this.backHandlers=[],$.clearHistory()}getBasePath(){return window.location.pathname.toLowerCase().startsWith("/scriptora")?"/Scriptora":""}getCurrentLocation(){return window.location.hash&&window.location.hash.startsWith("#/")?window.location.hash.slice(1):window.location.pathname+window.location.search}normalizePath(t){if(!t)return"/";const s=this.getBasePath();let n=t;s&&n.toLowerCase().startsWith(s.toLowerCase())&&(n=n.slice(s.length)||"/");const o=n.indexOf("?"),a=n.indexOf("#");let i=n.length;o!==-1&&(i=Math.min(i,o)),a!==-1&&(i=Math.min(i,a));const l=n.slice(0,i).replace(/\/+$/,"")||"/";return l.startsWith("/")?l:"/"+l}getRouteFallback(t){const s=this.normalizePath(t);return s.startsWith("/production/")&&s!=="/production"?"/production":s==="/production"?"/workspace":s.startsWith("/intelligence/analysis/")?"/intelligence/analysis":s==="/intelligence/analysis"||s==="/intelligence/analysis/select"?"/intelligence/dashboard":s==="/intelligence/dashboard"||s==="/intelligence/overview"?"/intelligence/context":s==="/intelligence/context"?"/intelligence":s==="/intelligence"||s==="/intelligence/select"?"/workspace":s==="/profile/collaborators"?"/profile":(s==="/profile"||s==="/notifications"||s==="/chat"||s.startsWith("/editor"),"/workspace")}getRouteLabel(t){const s=this.normalizePath(t);return s==="/workspace"?"Workspace":s==="/production"?"Production":s.startsWith("/production/schedule")?"Schedule":s.startsWith("/production/breakdown")?"Breakdown":s.startsWith("/production/call-sheets")?"Call Sheets":s.startsWith("/production/dialogue-sides")?"Dialogue Sides":s.startsWith("/production/storyboard")?"Storyboard":s.startsWith("/editor")?"Editor":s==="/intelligence"?"Intelligence":s==="/intelligence/context"?"Context":s==="/intelligence/dashboard"?"Analysis":s.startsWith("/intelligence/analysis")?"Vectors":s==="/profile"?"Profile":s==="/profile/collaborators"?"Collaborators":s==="/notifications"?"Notifications":s==="/chat"?"AI Chat":"Back"}registerBackHandler(t){return typeof t!="function"?()=>{}:(this.backHandlers.push(t),()=>{const s=this.backHandlers.indexOf(t);s!==-1&&this.backHandlers.splice(s,1)})}triggerBackHandlers(){for(let n=this.backHandlers.length-1;n>=0;n--){const o=this.backHandlers[n];try{if(o())return!0}catch(a){console.error("Back handler error:",a)}}const t=Array.from(document.querySelectorAll("#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)"));if(t.length>0){const n=t[t.length-1],o=n.querySelector('[data-modal-close], #modal-day-close, #modal-day-done, .close-setting-modal, .close-profile-modal, #action-modal-cancel, #new-script-cancel, [id$="-cancel"], [id$="-close"]');return o?o.click():we(n),!0}const s=Array.from(document.querySelectorAll('.scriptora-popup:not(.hidden), [data-scriptora-popup]:not(.hidden), [role="menu"]:not(.hidden), #quick-add-menu:not(.hidden)'));return s.length>0?(s[s.length-1].classList.add("hidden"),!0):!1}peekPreviousRoute(){return window.history.state?.prevPath?window.history.state.prevPath:$.peekPreviousRoute(null)}back(t=null){if(this._backInProgress||(this._backInProgress=!0,setTimeout(()=>{this._backInProgress=!1},200),this.triggerBackHandlers()))return;const s=window.history.state||{};if((typeof s.appStep=="number"?s.appStep:this.historyIndex)>0){window.history.back();return}let o=$.popHistory();for(;o&&this.normalizePath(o)===this.normalizePath(this.currentPath);)o=$.popHistory();const a=o||t||this.getRouteFallback(this.currentPath);a&&this.normalizePath(a)!==this.normalizePath(this.currentPath)&&(this.isNavigatingBack=!0,this.navigate(a,!0),this.isNavigatingBack=!1)}ensureShell(){if(!this.appEl)return;document.getElementById("scriptora-app-shell")||(this.appEl.innerHTML=`
        <div id="scriptora-app-shell" class="flex flex-col min-h-screen w-full relative bg-surface select-text">
          <!-- Persistent Global Header Container -->
          <div id="scriptora-global-header" class="fixed top-0 left-0 right-0 z-40 transition-all duration-200"></div>

          <!-- Dynamic Screen Content Area -->
          <main id="scriptora-global-content" class="flex-1 w-full min-h-screen flex flex-col relative transition-opacity duration-200"></main>

          <!-- Persistent Global Bottom Navigation Container -->
          <div id="scriptora-global-nav" class="fixed bottom-0 left-0 right-0 z-40 transition-all duration-200 overflow-visible"></div>
        </div>
      `)}init(t="#app"){if(this.appEl=document.querySelector(t),!this.appEl){console.error(`Mount element ${t} not found.`);return}this.ensureShell(),window.scriptoraRouter=this;const s=window.history.state||{};typeof s.appStep!="number"?(window.history.replaceState({...s,appStep:0,scriptoraPath:this.getCurrentLocation()},"",window.location.href),this.historyIndex=0):this.historyIndex=s.appStep,window.setScriptoraFullScreen=n=>{this.isFullScreen=!!n;const o=document.getElementById("scriptora-global-header"),a=document.getElementById("scriptora-global-nav");o&&o.classList.toggle("hidden",!!n),a&&a.classList.toggle("hidden",!!n)},document.addEventListener("click",n=>{const o=n.target.closest("[data-scriptora-back], #prod-subnav-back, #editor-back-btn, #btn-back-notif, #analysis-back-btn, #collab-back-btn, #production-back-btn, #chat-back-btn, #intelligence-dashboard-back-btn, #intelligence-context-back-btn, #individual-analysis-selector-back-btn");if(o){n.preventDefault(),n.stopPropagation();const i=o.getAttribute("data-back-fallback")||o.getAttribute("href")||null;this.back(i);return}const a=n.target.closest("a");if(a&&a.href&&a.origin===window.location.origin&&!a.hasAttribute("download")&&a.getAttribute("target")!=="_blank"&&!a.getAttribute("rel")?.includes("external")){const i=new URL(a.href),l=i.pathname+i.search+i.hash;l.startsWith("/api")||(n.preventDefault(),this.navigate(l))}},!0),window.addEventListener("popstate",n=>{if(!(typeof window.__scriptoraEditorPopstate=="function"&&window.__scriptoraEditorPopstate(n))){if(this.triggerBackHandlers()){const o=this.getCurrentLocation();window.history.pushState({...window.history.state||{},scriptoraPath:o},"",o);return}typeof n.state?.appStep=="number"?this.historyIndex=n.state.appStep:this.historyIndex>0&&(this.historyIndex-=1),$.popHistory(),this.isNavigatingBack=!0,this.resolve(this.getCurrentLocation()),this.isNavigatingBack=!1}}),window.addEventListener("hashchange",()=>{this.resolve(this.getCurrentLocation())}),this.resolve(this.getCurrentLocation())}navigate(t,s=!1){if(aa(),this.currentPath&&(this.scrollPositions[this.normalizePath(this.currentPath)]=window.scrollY),!this.isNavigatingBack&&!s&&this.currentPath){const l=this.normalizePath(this.currentPath),r=this.normalizePath(t);l!==r&&$.pushHistory(this.currentPath)}const n=this.getBasePath(),o=n&&t.toLowerCase().startsWith(n.toLowerCase())?t.slice(n.length)||"/":t,a=n&&!t.startsWith(n)?`${n}${o.startsWith("/")?"":"/"}${o}`:t,i=this.currentPath?this.normalizePath(this.currentPath):null;s?window.history.replaceState({...window.history.state||{},scriptoraPath:o,appStep:this.historyIndex,prevPath:i},"",a):(this.isNavigatingBack||(this.historyIndex+=1),window.history.pushState({scriptoraPath:o,appStep:this.historyIndex,prevPath:i},"",a)),this.resolve(o)}resolve(t){const s=t.indexOf("?"),n=s===-1?t:t.slice(0,s),o=s===-1?"":t.slice(s+1);let a=n.replace(/\/+$/,"")||"/";const i=this.getBasePath();i&&a.toLowerCase().startsWith(i.toLowerCase())&&(a=a.slice(i.length)||"/"),a.startsWith("/")||(a="/"+a);const l=new URLSearchParams(o||"");this.currentPath=t,a.startsWith("/editor")?(document.body.classList.add("editor-mode"),document.documentElement.classList.add("editor-mode")):(document.body.classList.remove("editor-mode"),document.documentElement.classList.remove("editor-mode"));const r=!!$.state.currentUser;if(!r&&!["/welcome","/auth"].includes(a)){this.navigate("/auth",!0);return}if(r&&a==="/auth"){this.navigate("/workspace",!0);return}if(a==="/"){r?this.navigate("/workspace",!0):this.navigate("/welcome",!0);return}if(a==="/welcome"){this.render(nl(),()=>al(this.navigate.bind(this)),{isPublic:!0});return}if(a==="/auth"){this.render(tl(),()=>sl(this.navigate.bind(this)),{isPublic:!0});return}if(a==="/workspace"){this.render(rl(),()=>cl(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Workspace",subtitle:"Your writing space."});return}if(a==="/editor"){const c=$.state.selectedScriptId||"chronicles-of-dust",m=l.get("scene");this.navigate(`/editor/${c}${m?`?scene=${m}`:""}`,!0);return}if(a.startsWith("/editor/")){const c=a.split("/")[2],m=l.get("scene");$.selectScript(c);const b=$.state.scripts?.find(h=>h.id===c)||{title:"Untitled Screenplay"};this.render(fl(c,m),()=>gl(c,this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Editor",subtitle:b.title||"Screenplay Studio",hideHeader:!0,hideNav:!0});return}if(a==="/intelligence"||a==="/intelligence/select"){this.render(jl(),()=>_l(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Selector"});return}if(a==="/intelligence/context"){this.render(Fl(),()=>Hl(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Context Calibration"});return}if(a==="/intelligence/dashboard"||a==="/intelligence/overview"){this.render(Ul(),()=>ql(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Analysis"});return}if(a==="/intelligence/analysis"||a==="/intelligence/analysis/select"){this.render(zl(),()=>Vl(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Analyse Individually"});return}if(a.startsWith("/intelligence/analysis/")){const c=a.split("/")[3]||"pacing",m=l.get("from"),b=l.get("scriptId");this.render(Kl(c,m,b),()=>Jl(c,this.navigate.bind(this),m,b),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Vector Analysis"});return}if(a==="/profile"){const c=l.get("from"),m=l.get("scriptId");this.render(Yl(c,m),()=>Xl(this.navigate.bind(this),c,m),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Account & preferences."});return}if(a==="/profile/collaborators"){const c=l.get("from"),m=l.get("scriptId");this.render(Zl(c,m),()=>Ql(this.navigate.bind(this),c,m),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Collaborators"});return}if(a==="/notifications"){this.render(ei(),()=>ti(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Notifications",subtitle:"Activity Stream"});return}if(a==="/production"||a==="/pre-production"){const c=l.get("from"),m=l.get("scriptId");this.render(si(c,m),()=>ni(this.navigate.bind(this),c,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Production Workspace & Tools"});return}if(a==="/production/breakdown"){const c=l.get("from"),m=l.get("scriptId");this.render(pi(c,m),()=>ui(this.navigate.bind(this),c,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Script Breakdown Workspace"});return}const u=a.match(/^\/production\/scenes(?:\/([a-zA-Z0-9_-]+))?$/);if(u){const c=l.get("from"),m=l.get("scriptId")||"chronicles-of-dust",b=u[1]||l.get("sceneId"),h=`/production/schedule?scriptId=${m}${b?`&sceneId=${b}`:""}${c?`&from=${encodeURIComponent(c)}`:""}`;this.navigate(h,!0);return}const d=a.match(/^\/production\/call-sheets(?:\/([a-zA-Z0-9_-]+))?$/);if(d){const c=l.get("from"),m=l.get("scriptId"),b=d[1]||l.get("csId");this.render(mi(c,m,b),()=>Ga(this.navigate.bind(this),c,m,b),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:b?"Call Sheet Inspector":"Call Sheets Workspace"});return}if(a==="/production/dialogue-sides"||a==="/production/dialogue-sheets"||a==="/production/sides"){const c=l.get("from"),m=l.get("scriptId");this.render(fi(c,m),()=>xi(this.navigate.bind(this),c,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Dialogue Sheets & Actor Sides"});return}if(a==="/production/schedule"||a==="/production/stripboard"){const c=l.get("from"),m=l.get("scriptId");this.render(bi(c,m),()=>hi(this.navigate.bind(this),c,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Master Shooting Schedule & Stripboard"});return}if(a==="/production/storyboard"||a==="/production/storyboards"){const c=l.get("from"),m=l.get("scriptId");this.render(Mi(c,m),()=>Oi(this.navigate.bind(this),c,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Storyboard Studio"});return}if(a==="/chat"||a==="/ai-chat"||a==="/writer-room"||a==="/ai-writer-room"){this.render(ai(),()=>oi(this.navigate.bind(this)),{activeTab:"chat",sectionTitle:"AI Chat",subtitle:"Universal Assistant"});return}this.renderNotFound(a)}render(t,s,n={}){this.ensureShell();const o=document.getElementById("scriptora-global-header"),a=document.getElementById("scriptora-global-content"),i=document.getElementById("scriptora-global-nav"),l=!!n.isPublic,r=!!n.hideHeader,f=!!n.hideNav,u=n.activeTab||"workspace",d=n.sectionTitle||"Scriptora",c=n.subtitle||"";if(l?(o&&o.classList.add("hidden"),i&&i.classList.add("hidden")):(o&&!this.isFullScreen&&(r?(o.classList.add("hidden"),o.innerHTML=""):(o.classList.remove("hidden"),o.innerHTML=dt(d,c))),i&&!this.isFullScreen&&(f?(i.classList.add("hidden"),i.innerHTML=""):(i.classList.remove("hidden"),el(u)||(i.innerHTML=it(u))))),a){this.backHandlers=[];const m=document.getElementById("scriptora-modal-portal");m&&(m.innerHTML=""),aa();let b=t||"";b=b.replace(/<header[^>]*data-global-header="true"[^>]*>[\s\S]*?<\/header>/gi,""),b=b.replace(/<header\s+class="fixed\s+top-0\s+w-full\s+z-40\s+pt-safe\s+bg-surface[^>]*>[\s\S]*?<\/header>/gi,""),b=b.replace(/<nav[^>]*data-global-bottom-nav="true"[^>]*>[\s\S]*?<\/nav>/gi,""),b=b.replace(/<nav\s+class="fixed\s+bottom-0[^>]*>[\s\S]*?<\/nav>/gi,""),a.innerHTML=b;const h=this.normalizePath(this.currentPath),g=this.scrollPositions[h];if(this.isNavigatingBack&&g!==void 0?setTimeout(()=>{window.scrollTo({top:g,behavior:"instant"})},10):window.scrollTo({top:0,behavior:"instant"}),a.classList.remove("fade-in"),a.offsetWidth,a.classList.add("fade-in"),typeof s=="function")try{s()}catch(v){console.error("Error attaching screen events:",v)}}}renderNotFound(t){this.render(`
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
      `,()=>{const s=document.getElementById("notfound-home");s&&(s.onclick=()=>this.navigate("/workspace"))},{activeTab:"workspace",sectionTitle:"Page Not Found",subtitle:"404"})}}const _i=new ji;async function ha(){try{await $.init(),_i.init("#app"),window.addEventListener("online",()=>{S("Back online. Synchronizing changes..."),$.refreshScripts(),$.refreshNotifications()}),window.addEventListener("offline",()=>{S("Offline mode active. Edits saved locally.","info")}),console.log("Scriptora initialized successfully in production-ready mode.")}catch(e){console.error("Scriptora bootstrap failed:",e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ha):ha();
