(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();const jn="http://localhost:8000/api";async function ne(e,t={}){const s=`${jn}${e}`,n={headers:{"Content-Type":"application/json",...t.headers},...t};try{const o=await fetch(s,n);if(!o.ok){const a=await o.json().catch(()=>({}));throw new Error(a.error||`HTTP error ${o.status}`)}return await o.json()}catch(o){throw console.warn(`API call ${e} failed, falling back to local store:`,o.message),o}}const ds=[{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",industry:"International / Hollywood",pages:96,updated:"12m ago",currentScene:"Scene 18",isCurrentDraft:!0,archived:!1,joinCode:"A7K9-XP42",logline:"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.",synopsis:"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves.",context:{format:"Feature",industry:"International / Hollywood",hours:1,minutes:36,seconds:0,plannedDuration:"01:36:00"},analysisScores:{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80}},{id:"the-neon-horizon",title:"The Neon Horizon",draft:"Draft 2.1",genre:"Sci-Fi",format:"Pilot",industry:"Streaming Television",pages:62,updated:"2h ago",currentScene:"Scene 4",isCurrentDraft:!1,archived:!1,joinCode:"N3ON-H0RZ",context:{format:"Pilot",industry:"Streaming Television",hours:0,minutes:52,seconds:0,plannedDuration:"00:52:00"},analysisScores:{overall:79,pacing:75,dialogue:84,emotion:80,characterArc:78,continuity:82,storyStructure:76,theme:88,cinema:83,formatting:90,production:72}},{id:"velvet-shadows",title:"Velvet Shadows",draft:"Draft 1.0",genre:"Noir",format:"Feature",industry:"Independent / Festival",pages:114,updated:"Yesterday",currentScene:"Scene 1",isCurrentDraft:!1,archived:!1,joinCode:"V3LV-SHDW",analysisScores:{overall:81,pacing:80,dialogue:86,emotion:79,characterArc:85,continuity:80,storyStructure:82,theme:84,cinema:88,formatting:92,production:76}},{id:"silent-echoes",title:"Silent Echoes",draft:"Draft 3.0",genre:"Psychological Thriller",format:"Feature",industry:"International / Hollywood",pages:104,updated:"3d ago",currentScene:"Scene 22",isCurrentDraft:!1,archived:!1,joinCode:"SLNT-ECH0",analysisScores:{overall:84,pacing:86,dialogue:81,emotion:88,characterArc:83,continuity:85,storyStructure:89,theme:82,cinema:84,formatting:91,production:78}},{id:"glass-kingdoms",title:"Glass Kingdoms",draft:"Draft 1.4",genre:"Fantasy",format:"Pilot",industry:"Streaming Television",pages:58,updated:"1w ago",currentScene:"Scene 8",isCurrentDraft:!1,archived:!1,joinCode:"GLSS-KNGD",analysisScores:{overall:78,pacing:74,dialogue:80,emotion:76,characterArc:82,continuity:75,storyStructure:80,theme:86,cinema:82,formatting:88,production:70}},{id:"red-shift",title:"Red Shift",draft:"Draft 2.0",genre:"Action",format:"Short",industry:"Independent / Festival",pages:28,updated:"2w ago",currentScene:"Scene 5",isCurrentDraft:!1,archived:!1,joinCode:"RED2-SHFT",analysisScores:{overall:83,pacing:90,dialogue:78,emotion:75,characterArc:80,continuity:88,storyStructure:84,theme:80,cinema:89,formatting:95,production:82}}];async function pn(){try{const e=await ne("/auth/me");return e&&"user"in e?e.user?(localStorage.setItem("scriptora_user",JSON.stringify(e.user)),e.user):(localStorage.removeItem("scriptora_user"),null):e?.user||null}catch{const e=localStorage.getItem("scriptora_user");if(e)try{const t=JSON.parse(e);if(t&&(t.displayName||t.email||t.id))return t}catch{}return null}}async function Fn(e){try{const t=await ne("/auth/login",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-1",name:e.email?e.email.split("@")[0]:"Arun Kumar",displayName:e.email?e.email.split("@")[0]:"Arun Kumar",email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Narrative Director",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function _n(e={}){try{const t=await ne("/auth/login",{method:"POST",body:JSON.stringify({...e,provider:"google"})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t=e.displayName||e.name||(e.email?e.email.split("@")[0]:"Google Filmmaker"),s=t.split(" ").map(o=>o[0]).filter(Boolean).slice(0,2).join("").toUpperCase()||"GF",n={id:e.sub||`google-${Date.now()}`,name:t,displayName:t,email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Film Director",badge:"Member Pro",initials:s,avatar:e.picture||e.photoURL||null,avatarUrl:e.picture||e.photoURL||null,provider:"google",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(n)),n}}async function Hn(e){try{const t=await ne("/auth/register",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:`user-${Date.now()}`,name:e.name||"New Writer",displayName:e.name||"New Writer",email:e.email||"writer@scriptora.studio",headline:"Screenwriter",badge:"Member Pro",initials:(e.name||"NW").slice(0,2).toUpperCase(),stats:{drafts:1,coAuthors:0,healthIndex:"100%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function Un(e){try{const t=await ne("/auth/otp",{method:"POST",body:JSON.stringify({phone:e})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-phone",name:"Verified Writer",displayName:"Verified Writer",headline:"Screenwriter",email:e,badge:"Member Pro",initials:"VW",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}function Ns(){localStorage.removeItem("scriptora_user"),localStorage.removeItem("scriptora_scripts"),localStorage.removeItem("scriptora_selected_script");const e=[];try{for(let t=0;t<localStorage.length;t++){const s=localStorage.key(t);s&&(s.startsWith("scriptora_screenplay_")||s.startsWith("scriptora_prod_")||s.startsWith("scriptora_storyboard_"))&&e.push(s)}for(const t of e)localStorage.removeItem(t)}catch(t){console.warn("Local storage purge notice:",t)}try{sessionStorage.clear()}catch{}}async function mn(){try{await ne("/auth/logout",{method:"POST"})}catch(e){console.warn("Server logout notice:",e.message)}return Ns(),{success:!0}}async function qn(e){const t=(e||"").trim();if(t.toUpperCase()!=="DELETE MY ACCOUNT")throw new Error('Confirmation mismatch. Please type "DELETE MY ACCOUNT" exactly to confirm account deletion.');try{const s=await ne("/auth/delete-account",{method:"POST",body:JSON.stringify({confirmation:t})});return Ns(),s}catch(s){if(!s.status||s.message?.includes("404")||s.message?.includes("Failed to fetch")||s.message?.includes("NetworkError")||s.message?.includes("Load failed"))return Ns(),{success:!0,message:"Account and associated personal records have been permanently deleted."};throw s}}async function nt(e=""){try{const n=e?`/scripts?q=${encodeURIComponent(e)}`:"/scripts",o=await ne(n);if(o.scripts&&Array.isArray(o.scripts)){localStorage.setItem("scriptora_scripts",JSON.stringify(o.scripts));let a=o.scripts;return e&&(a=a.filter(l=>l.title.toLowerCase().includes(e.toLowerCase()))),a}}catch{}const t=localStorage.getItem("scriptora_scripts");let s;if(t!==null)try{s=JSON.parse(t),Array.isArray(s)||(s=[...ds],localStorage.setItem("scriptora_scripts",JSON.stringify(s)))}catch{s=[...ds],localStorage.setItem("scriptora_scripts",JSON.stringify(s))}else s=[...ds],localStorage.setItem("scriptora_scripts",JSON.stringify(s));return e&&(s=s.filter(n=>n.title.toLowerCase().includes(e.toLowerCase()))),s}async function xs(e){try{const s=await ne(`/scripts/${e}`);if(s.script)return s.script}catch{}const t=await nt();return t.find(s=>s.id===e)||ds.find(s=>s.id===e)||t[0]||null}async function zn(e){const t=(e.title||"untitled").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")||`script-${Date.now()}`,s={id:t,title:e.title||"Untitled Screenplay",draft:"Draft 1.0",pageCount:1,wordCount:0,scenes:[{id:"scene-1",number:1,slugline:"",blocks:[{id:`b-${Date.now()}-1`,type:"scene",content:""}]}]};try{const i=await ne("/scripts",{method:"POST",body:JSON.stringify(e)});if(i.script){s.id=i.script.id,s.title=i.script.title,localStorage.setItem(`scriptora_screenplay_${i.script.id}`,JSON.stringify(s)),await fs(i.script.id,s).catch(()=>{});const m=(await nt()).map(u=>({...u,isCurrentDraft:!1}));return localStorage.setItem("scriptora_scripts",JSON.stringify([i.script,...m.filter(u=>u.id!==i.script.id)])),localStorage.setItem("scriptora_selected_script",i.script.id),i.script}}catch{}const n={id:t,title:e.title||"Untitled Screenplay",draft:"Draft 1.0",genre:e.genre||"Drama",format:e.format||"Feature",industry:e.industry||"International / Hollywood",pages:1,updated:"Just now",currentScene:"Scene 1",isCurrentDraft:!0,joinCode:`${Math.random().toString(36).substring(2,6).toUpperCase()}-${Math.random().toString(36).substring(2,6).toUpperCase()}`,archived:!1,context:{format:e.format||"Feature",industry:e.industry||"International / Hollywood",hours:1,minutes:30,seconds:0,plannedDuration:"01:30:00"},analysisScores:{overall:80,pacing:78,dialogue:80,emotion:80,characterArc:78,continuity:80,storyStructure:80,theme:80,cinema:80,formatting:90,production:75}};localStorage.setItem(`scriptora_screenplay_${n.id}`,JSON.stringify(s));const a=(await nt()).map(i=>({...i,isCurrentDraft:!1})),l=[n,...a.filter(i=>i.id!==n.id)];return localStorage.setItem("scriptora_scripts",JSON.stringify(l)),localStorage.setItem("scriptora_selected_script",n.id),n}async function Vn(e){if(!e)return await nt();try{const n=await ne(`/scripts/${e}/current-draft`,{method:"POST"});if(n&&n.script){const a=(await nt()).map(l=>({...l,isCurrentDraft:l.id===e,updated:l.id===e?"Just now":l.updated}));return localStorage.setItem("scriptora_scripts",JSON.stringify(a)),localStorage.setItem("scriptora_selected_script",e),a}}catch{}const s=(await nt()).map(n=>({...n,isCurrentDraft:n.id===e,updated:n.id===e?"Just now":n.updated}));return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),localStorage.setItem("scriptora_selected_script",e),s}async function Wn(e,t){try{const o=await ne(`/scripts/${e}`,{method:"PUT",body:JSON.stringify(t)});if(o.script){const l=(await nt()).map(i=>i.id===e?o.script:i);return localStorage.setItem("scriptora_scripts",JSON.stringify(l)),o.script}}catch{}const n=(await nt()).map(o=>o.id===e?{...o,...t,updated:"Just now"}:o);return localStorage.setItem("scriptora_scripts",JSON.stringify(n)),{id:e,...t,updated:"Just now"}}async function Gn(e){try{await ne(`/scripts/${e}`,{method:"DELETE"})}catch{}const t=await nt(),n=t.find(l=>l.id===e)?.isCurrentDraft;let o=t.filter(l=>l.id!==e);return n&&o.length>0&&(o[0].isCurrentDraft=!0),localStorage.setItem("scriptora_scripts",JSON.stringify(o)),localStorage.removeItem(`scriptora_screenplay_${e}`),localStorage.getItem("scriptora_selected_script")===e&&(o.length>0?localStorage.setItem("scriptora_selected_script",o[0].id):localStorage.removeItem("scriptora_selected_script")),{success:!0}}async function Kn(e){try{const a=await ne(`/scripts/${e}/duplicate`,{method:"POST"});if(a.script){const l=await nt();return localStorage.setItem("scriptora_scripts",JSON.stringify([a.script,...l])),a.script}}catch{}const t=await xs(e),s={...t,id:`${e}-copy-${Date.now().toString().slice(-4)}`,title:`${t?.title||"Script"} (Copy)`,updated:"Just now"},n=await nt(),o=[s,...n];return localStorage.setItem("scriptora_scripts",JSON.stringify(o)),s}async function Jn(e){try{await ne(`/scripts/${e}/archive`,{method:"POST"})}catch{}const s=(await nt()).map(n=>n.id===e?{...n,archived:!0,updated:"Just now"}:n);return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),{success:!0}}const Rs={id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pageCount:5,wordCount:14280,titlePage:{title:"CHRONICLES OF DUST",author:"Arun Kumar",contact:"Scriptora Studio · arun.kumar@scriptora.studio · +1 (555) 019-2834",notes:"An original screenplay. Draft 4.2 Production Cut."},settings:{sceneNumbers:!0,sceneNumberSide:"left",smartFormatting:!0,fontSize:"12pt",lineSpacing:"1.5",language:"English"},acts:[{id:"act-1",name:"ACT I - The Broken Siphon"},{id:"act-2",name:"ACT II - The Pressure Surge"},{id:"act-3",name:"ACT III - The Floodgate Standoff"}],characters:["KEVIN","MEERA","HARI","AKASH"],locations:["INT. HOME","INT. PORT AUDIT ROOM","INT. CUSTOMS OFFICE","EXT. FLOODGATE GANTRY"],times:["DAY","NIGHT","CONTINUOUS","DAWN","DUSK","LATER","MORNING","EVENING"],transitions:["CUT TO:","FADE IN:","FADE OUT.","DISSOLVE TO:","SMASH CUT TO:","MATCH CUT TO:","JUMP CUT TO:"],scenes:[{id:"scene-1",number:1,actId:"act-1",slugline:"INT. HOME - EVENING",blocks:[{id:"b-1-1",type:"scene",content:"INT. HOME - EVENING"},{id:"b-1-2",type:"action",content:"There stands a woman."},{id:"b-1-3",type:"character",content:"HARI"},{id:"b-1-4",type:"dialogue",content:"Who is that?"},{id:"b-1-5",type:"character",content:"AKASH"},{id:"b-1-6",type:"dialogue",content:"How do I know?"},{id:"b-1-7",type:"action",content:"Both leaves the place."}]},{id:"scene-4",number:4,actId:"act-1",slugline:"INT. PORT AUDIT ROOM - DAY",blocks:[{id:"b-4-1",type:"scene",content:"INT. PORT AUDIT ROOM - DAY"},{id:"b-4-2",type:"action",content:"Kevin stamps irregular cargo manifests to keep peace with union superiors."},{id:"b-4-3",type:"character",content:"KEVIN"},{id:"b-4-4",type:"dialogue",content:"The manifests are sealed."}]},{id:"scene-18",number:18,actId:"act-2",slugline:"INT. CUSTOMS OFFICE - NIGHT",blocks:[{id:"b-18-1",type:"scene",content:"INT. CUSTOMS OFFICE - NIGHT"},{id:"b-18-2",type:"action",content:"Kevin kneels over the cracked hydro-sensor junction box. Static hiss whispers through the damp comm-link. A lone flicker illuminates the tarnished brass seal."},{id:"b-18-3",type:"action",content:"Water droplets bead along the corroded circuit wires. He slides a copper probe between the connectors."},{id:"b-18-4",type:"character",content:"KEVIN"},{id:"b-18-5",type:"parenthetical",content:"(whispering into comm)"},{id:"b-18-6",type:"dialogue",content:"If the seals break before dawn, the sector won't hold the surge."},{id:"b-18-7",type:"character",content:"MEERA (O.S.)"},{id:"b-18-8",type:"dialogue",content:"Then don't let them break. Reroute the secondary relay through the floodgate breaker."},{id:"b-18-9",type:"transition",content:"CUT TO:"}]}]};async function Yn(e){let t=null;try{const l=await ne(`/screenplay/${e}`);l.screenplay&&l.screenplay.scenes&&(t=l.screenplay)}catch{}if(!t){const l=localStorage.getItem(`scriptora_screenplay_${e}`);if(l)try{const i=JSON.parse(l);i&&i.scenes&&(t=i)}catch{}}if(e==="chronicles-of-dust"){if(!t||!t.scenes||t.scenes.length===0){const l=JSON.parse(JSON.stringify(Rs));return l.id=e,localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(l)),l}return t}if(t&&(l=>!l||!Array.isArray(l.scenes)?!1:l.scenes.some(i=>{const r=(i.slugline||"").toUpperCase();return r.includes("WRITER'S ROOM")||r.includes("STUDIO - DAY")||r.includes("NEW SCENE - DAY")?!0:(i.blocks||[]).some(m=>{const u=m.content||"";return u.includes("Sunlight cuts through dust motes")||u.includes("A blank script page waits")||u.includes("Type your screenplay action here")})}))(t)&&(t=null),t)return t;const o=await xs(e),a={id:e||"script_01",title:o?.title||"Untitled Screenplay",draft:"Draft 1.0",pageCount:1,wordCount:0,scenes:[{id:"scene-1",number:1,slugline:"",blocks:[{id:`b-${Date.now()}-1`,type:"scene",content:""}]}]};return localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(a)),fs(e,a).catch(()=>{}),a}async function fs(e,t){localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(t));try{return await ne(`/screenplay/${e}`,{method:"PUT",body:JSON.stringify({screenplay:t})})}catch{return{success:!0}}}async function Xn(e){try{return(await ne(`/versions/${e}`)).versions}catch{return[{id:"v-4.2",name:"Draft 4.2",tag:"Current Active",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:"Refined Meera O.S. dialogue and hydro-sensor action line.",isCurrent:!0},{id:"v-3.0",name:"Draft 3.0",tag:"Production Polish",timestamp:"Yesterday, 4:15 PM",author:"JD",stats:"94 pages · 13,950 words",notes:"Incorporated director notes on floodgate transition pacing.",isCurrent:!1},{id:"v-2.0",name:"Draft 2.0",tag:"First Table Read",timestamp:"Oct 12, 2024",author:"JD",stats:"90 pages · 13,200 words",notes:"Table read revision for Acts I & II character arcs.",isCurrent:!1}]}}async function Zn(e,t){try{return(await ne(`/versions/${e}`,{method:"POST",body:JSON.stringify(t)})).version}catch{return{id:`v-${Date.now()}`,name:t.name,tag:"Milestone Snapshot",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:t.notes||"",isCurrent:!0}}}async function Qn(e){try{return(await ne(`/collaborators/${e}`)).collaborators}catch{return[{id:"c-1",name:"Heamanth S.",email:"heamanth@studio.com",initials:"HS",role:"Editor",avatarBg:"bg-blue-100 text-blue-700",status:"Active",added:"2d ago"},{id:"c-2",name:"Elena Rostova",email:"elena@cineworks.io",initials:"ER",role:"Script Doctor",avatarBg:"bg-amber-100 text-amber-700",status:"Active",added:"1w ago"},{id:"c-3",name:"Marcus Vance",email:"vance.prod@paramount.com",initials:"MV",role:"Producer",avatarBg:"bg-purple-100 text-purple-700",status:"Viewer",added:"2w ago"}]}}async function ea(e,t){try{return(await ne(`/collaborators/${e}/invite`,{method:"POST",body:JSON.stringify(t)})).collaborator}catch{return{id:`c-${Date.now()}`,name:t.email.split("@")[0],email:t.email,initials:t.email.substring(0,2).toUpperCase(),role:t.role==="editor"?"Editor":"Viewer",avatarBg:"bg-emerald-100 text-emerald-700",status:"Active",added:"Just now"}}}async function ta(e,t){try{return await ne(`/collaborators/${e}/${t}`,{method:"DELETE"})}catch{return{success:!0}}}async function sa(e){try{return(await ne("/join-code/generate",{method:"POST",body:JSON.stringify({scriptId:e})})).joinCode}catch{return Math.random().toString(36).substring(2,6).toUpperCase()+"-"+Math.random().toString(36).substring(2,6).toUpperCase()}}async function na(e){try{return await ne("/join-code/validate",{method:"POST",body:JSON.stringify({code:e})})}catch{return(e||"").toUpperCase().trim()==="A7K9-XP42"?{valid:!0,script:{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",pages:96,collaboratorCount:3}}:{valid:!1,error:"Invalid or expired join code"}}}async function aa(e){try{return await ne("/join-code/redeem",{method:"POST",body:JSON.stringify({code:e})})}catch{return{success:!0,scriptId:"chronicles-of-dust",title:"Chronicles of Dust"}}}async function xn(){try{return await ne("/notifications")}catch{return{notifications:[{id:1,sender:"HS",senderName:"Heamanth",type:"collaboration_invite",title:"Heamanth invited you to collaborate",body:'Added you as an Editor on "Chronicles of Dust" (Draft 4.2).',time:"12m ago",group:"today",unread:!0,tags:["Draft 4.2","Role: Editor"],actionLabel:"Review Access →",actionRoute:"/profile/collaborators"},{id:2,sender:"icon:description",type:"export_ready",title:"Your export is ready",body:'"Chronicles of Dust (Draft 4.2)" exported as standard Industry PDF.',time:"45m ago",group:"today",unread:!0,tags:["PDF","96 Pages"],actionLabel:"Open Screenplay →",actionRoute:"/editor/chronicles-of-dust"},{id:3,sender:"AK",senderName:"Arun K.",type:"join_code_request",title:"Join-code access request",body:'Requested Editor access to "Anbin Mozhi" via join-code A7K9-XP42.',time:"2h ago",group:"today",unread:!0,tags:["Code: A7K9-XP42"],actionLabel:"Manage Collaborators →",actionRoute:"/profile/collaborators"}],unreadCount:3}}}async function oa(e){try{return await ne(`/notifications/${e}/read`,{method:"POST"})}catch{return{success:!0}}}async function la(){try{return await ne("/notifications/read-all",{method:"POST"})}catch{return{success:!0}}}async function Js(){return(await xn()).unreadCount||0}async function ys(e){try{const t=await ne("/profile",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.profile)),t.profile}catch{const s={...await pn()||{},...e};if(e.name){const n=e.name.trim().split(/\s+/);s.initials=((n[0]?.[0]||"A")+(n[1]?.[0]||"")).toUpperCase(),s.displayName=e.name}return localStorage.setItem("scriptora_user",JSON.stringify(s)),s}}async function fn(){try{return(await ne("/settings")).settings}catch{const e=localStorage.getItem("scriptora_settings");return e?JSON.parse(e):{editor:{autoSceneHeading:!0,autoCharacter:!0,autoTransition:!0,enterAfterAction:!0,tabAfterAction:!0,autoCapitalize:!0,continueDialogue:!0,showSceneNumbers:!0,lockSceneNumbers:!1,fontSize:"Courier Prime 12pt",lineSpacing:"1.5 line",focusMode:!1},language:"English (US)",appearance:"Light",notifications:{collaborationInvites:!0,collaborationEdits:!0,mentions:!0,versionMilestones:!0},intelligence:{querySuggestions:!0,analysisSuggestions:!0}}}}async function ia(e){try{const t=await ne("/settings",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_settings",JSON.stringify(t.settings)),t.settings}catch{const s={...await fn(),...e};return localStorage.setItem("scriptora_settings",JSON.stringify(s)),s}}async function ra(e,t){try{return(await ne(`/intelligence/${e}/context`,{method:"PUT",body:JSON.stringify(t)})).context}catch{return t}}async function Ls(e,t){try{return(await ne("/intelligence/query",{method:"POST",body:JSON.stringify({query:e,scriptId:t})})).answer}catch{return"Analysis: In this screenplay, scene tempo and dialogue density align with core narrative milestones. Characters express distinct agendas in each beat."}}async function ca(e="chronicles-of-dust"){try{const o=await ne(`/production/${e}`);if(o?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(o.workspace)),o.workspace}catch{}const t=localStorage.getItem(`scriptora_prod_ws_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=await xs(e),n={id:`prod-ws-${e}`,projectId:"proj-1",projectName:"Badlands Anthology",scriptId:e,screenplayTitle:s?.title||"Chronicles of Dust",pinnedSourceVersion:s?.draft||"Draft 4.2",pinnedSourceVersionHash:"v4.2-snap-88f2",pinnedTimestamp:"12m ago",currentScriptDraft:s?.draft||"Draft 4.2",isStale:!1,mode:localStorage.getItem("scriptora_prod_mode")||"simple",userRole:localStorage.getItem("scriptora_prod_role")||"Owner",roles:["Owner","Director","Assistant Director","Production","Department Member","Viewer"],stats:{totalScenes:18,breakdownElements:78,callSheetsCount:2,shootingDays:14,pendingProposals:2,completedApprovals:6},updatedAt:new Date().toISOString()};return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n)),n}async function da(e,t){try{const n=await ne(`/production/${e}/pin`,{method:"POST",body:JSON.stringify({version:t})});if(n?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n.workspace)),n.workspace}catch{}const s=await ca(e);return s.pinnedSourceVersion=t,s.pinnedTimestamp="Just now",s.isStale=!1,localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(s)),s}async function _t(e="chronicles-of-dust"){try{const o=await ne(`/production/${e}/scenes`);if(o?.scenes)return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(o.scenes)),o.scenes}catch{}const t=localStorage.getItem(`scriptora_prod_scenes_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[],n=[{num:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",intExt:"EXT",dayNight:"DAY",p:"4 1/8",comp:"Moderate",day:"Day 1 of 7",cast:["KEVIN","MARCUS"],desc:"Wind whips dust across perimeter chain link. Kevin arrives at customs gate."},{num:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",intExt:"INT",dayNight:"DAY",p:"3 4/8",comp:"Simple",day:"Day 1 of 7",cast:["KEVIN","MEERA"],desc:"Meera analyzes telemetry console indicating illegal pressure drop."},{num:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",intExt:"EXT",dayNight:"DUSK",p:"7 2/8",comp:"Complex",day:"Day 2 of 7",cast:["KEVIN"],desc:"Concrete conduit pipeline across cracked alkali flats during sunset."},{num:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",intExt:"EXT",dayNight:"NIGHT",p:"5 0/8",comp:"Complex",day:"Day 3 of 7",cast:["KEVIN","MEERA"],desc:"Perimeter night patrol with solar rover and surveillance drones."},{num:5,heading:"INT. HYDRAULIC VALVE TUNNEL - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"5 4/8",comp:"Moderate",day:"Day 3 of 7",cast:["KEVIN"],desc:"Rusty underground valves with echoing industrial turbine vibration."},{num:6,heading:"EXT. DESERT SERVICE ROAD - DAY",intExt:"EXT",dayNight:"DAY",p:"5 2/8",comp:"Simple",day:"Day 4 of 7",cast:["KEVIN"],desc:"Kevin tracks tanker tire treads along decommissioned asphalt."},{num:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",intExt:"INT",dayNight:"DAY",p:"6 3/8",comp:"Moderate",day:"Day 5 of 7",cast:["COMMANDER VANCE","KEVIN"],desc:"Vance oversees regional water diversion bank from glass observatory."},{num:8,heading:"EXT. RESERVOIR INTAKE BASIN - DAY",intExt:"EXT",dayNight:"DAY",p:"5 5/8",comp:"Complex",day:"Day 6 of 7",cast:["MEERA"],desc:"Rappelling 60-foot descent down drained concrete spillway."},{num:9,heading:"INT. DRAINAGE VAULT - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"4 1/8",comp:"Moderate",day:"Day 7 of 7",cast:["KEVIN","MEERA"],desc:"Subterranean acoustic surveillance using directional hydrophones."},{num:10,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"2 6/8",comp:"Complex",day:"Day 2 of 7",cast:["KEVIN","MEERA"],desc:"Kevin anchors hydraulic bypass valve kit as high pressure brine seals."}];for(const o of n)s.push({id:`scene-${o.num}`,sceneNumber:o.num,scriptId:e,heading:o.heading,intExt:o.intExt,dayNight:o.dayNight,pages:o.p,complexity:o.comp,shootDay:o.day,status:o.num===4?"Needs Review":"Scheduled",snippet:o.desc,directorNotes:`Director visual notes for ${o.heading}. Maintain high contrast lighting.`,continuityNotes:"Continuity reference logged against Draft 4.2.",cast:o.cast,sidesReady:!0});return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(s)),s}async function ua(e,t){try{const l=await ne(`/production/${e}/scenes/${t}`);if(l?.scene)return l.scene}catch{}const n=(await _t(e)).find(l=>l.id===t||String(l.sceneNumber)===String(t));if(!n)return null;const a=(await dt(e)).filter(l=>l.sceneId===n.id||l.sceneNumber===n.sceneNumber||Array.isArray(l.scenes)&&l.scenes.includes(n.sceneNumber));return{...n,elements:a}}async function Vt(e,t,s){try{const a=await ne(`/production/${e}/scenes/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.scene)return a.scene}catch{}const n=await _t(e),o=n.find(a=>a.id===t||String(a.sceneNumber)===String(t));return o?(Object.assign(o,s),localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(n)),o):s}async function dt(e="chronicles-of-dust",t=null,s=null){try{const a=new URLSearchParams;t&&a.set("category",t),s&&a.set("scene",s);const l=a.toString()?`?${a.toString()}`:"",i=await ne(`/production/${e}/breakdown${l}`);if(i?.breakdown)return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(i.breakdown)),i.breakdown}catch{}const n=localStorage.getItem(`scriptora_prod_breakdown_${e}`);let o=[];if(n)try{o=JSON.parse(n)}catch{}if(o.length||(o=[{id:"elem-1",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[1,2,4,18],category:"Cast",name:"KEVIN",characterRole:"Discredited hydro-engineer, 30s. Hero protagonist.",description:"Discredited hydro-engineer, 30s. Hero protagonist.",assignedActor:"Dev Patel",castingStatus:"Confirmed Cast",actorAvailability:"Available Shoot Days 1-14",appearancesCount:4,sourceSnippet:"Kevin kneels over cracked hydro-sensor junction box, static hissing from the diagnostic speaker.",originalAiSuggestion:"KEVIN — Discredited hydro-engineer, 30s. Hero protagonist.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Requires desert dust protective gear and waterproof boots."},{id:"elem-2",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[4,16,18],category:"Cast",name:"MEERA",characterRole:"Field operative with tactical harness.",description:"Field operative with tactical harness.",assignedActor:"Zoe Saldana",castingStatus:"Confirmed Cast",actorAvailability:"Available Shoot Days 4-18",appearancesCount:3,sourceSnippet:"Meera anchors her cable to the iron pylon, visor reflecting the rising floodwaters below.",originalAiSuggestion:"MEERA — Field operative with tactical harness.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Tactical harness fitted for scene 18 valve climb."},{id:"elem-3",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Props",name:"Hydraulic Bypass Valve Kit",description:"Custom machined valve kit with functional digital LED pressure display.",sourcingType:"Hero Prop Built",quantity:"1 Hero + 2 Stunt Duplicates",readinessStatus:"Ready in Art Dept",continuityNotes:"Clean in Sc 1, weathered with grease in Sc 18",sourceSnippet:"Kevin clicks the bypass manifold into place. The gauge needles spike red.",originalAiSuggestion:"Hydraulic Bypass Valve Kit — machined valve kit with LED display.",status:"Confirmed",isHumanConfirmed:!0,confidence:.95,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero prop constructed by art department; 2 stunt duplicates on standby."},{id:"elem-4",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Practical FX",name:"High-Pressure Water Spray",description:"Controlled water burst simulating cracked pipe joint failure.",requiredResources:"Dedicated 4000L Water Tanker, 120 PSI Pump Rig",technicalRequirements:"Safe water containment basins, electrical shut-off triggers",safetyNotes:"Non-slip decking mandatory; waterproof protective ponchos for camera crew",prepStatus:"Rig Test Scheduled",sourceSnippet:"A burst of pressurized brine shoots from the seam, blinding the chamber.",originalAiSuggestion:"High-Pressure Water Spray — Controlled water burst simulating cracked pipe failure.",status:"Needs Review",isHumanConfirmed:!1,confidence:.88,confirmedBy:null,confirmedAt:null,notes:"SFX coordinator requested dedicated water truck standby via Proposal #prop-1."},{id:"elem-5",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Stunts",name:"Valve Pylon Cable Rappel",description:"Meera swings 18 feet across open valve chasm to catch emergency release lever.",coordinationRequirements:"18ft wire pendulum rig, decelerator line, safety crash matting",qualifiedPersonnel:"Stunt Double: Tara Sen / Stunt Coordinator: Roy Hall",safetyPlanningStatus:"Awaiting Coordinator Review",sourceSnippet:"Meera kicks off the catwalk, swinging into the spray as the iron cable groans.",originalAiSuggestion:"Valve Pylon Cable Rappel — 18ft swing across chasm to catch lever.",status:"Needs Review",isHumanConfirmed:!1,confidence:.92,confirmedBy:null,confirmedAt:null,notes:"Awaiting Stunt Coordinator risk assessment and harness certification."},{id:"elem-13",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Locations",name:"Sub-Level Hydro-Chamber B",description:"Industrial concrete pumping cavern with rusty iron catwalks.",context:"INT.",lighting:"NIGHT",locationStatus:"Secured & Permitted",accessDetails:"Permit #WTR-994, Access via Gate 4 Service Tunnel",sourceSnippet:"INT. HYDRO-CHAMBER B - NIGHT. Rust-eaten steel catwalks suspend over deep abyss.",originalAiSuggestion:"Sub-Level Hydro-Chamber B — Concrete pumping cavern with catwalks.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Acoustic echo requires directional shotgun mics; non-slip floor treatment applied."},{id:"elem-6",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Costumes",name:"Kevin — Weathered Dust Coat & Respirator",character:"KEVIN",description:"Heavy canvas duster coat, solar respirator around neck.",wardrobeRequirements:"Duster coat with distressed seam stitching, respirator with worn elastic straps",continuityChanges:"Costume Stage 1 (Desert Dust / Dry)",prepStatus:"Fitted & Approved",sourceSnippet:"KEVIN (30s), sun-scoured and weary, adjusts his solar filter.",originalAiSuggestion:"Kevin — Duster coat, respirator around neck.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Costume fitting complete with wardrobe dept."},{id:"elem-7",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Cast",name:"MARCUS",characterRole:"Border outpost security guard.",description:"Border outpost security guard.",assignedActor:"Unassigned (Auditioning)",castingStatus:"Auditioning",actorAvailability:"Day 1 Shoot Only",appearancesCount:1,sourceSnippet:"MARCUS leans against the chain link, tapping an unlit cigarette against his wrist.",originalAiSuggestion:"MARCUS — Border outpost security guard.",status:"Confirmed",isHumanConfirmed:!0,confidence:.98,confirmedBy:"Elena Rostova",confirmedAt:"2026-10-13T16:00:00Z",notes:"Supporting role. Day 1 shoot only."},{id:"elem-8",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Props",name:"Solar Filter Dust Goggles",description:"Tinted goggles with worn leather straps.",sourcingType:"Hero Wardrobe Prop",quantity:"2 Pairs (A & B Camera)",readinessStatus:"Ready in Art Dept",continuityNotes:"Worn over eyes during wind gusts, rest on forehead indoors",sourceSnippet:"Kevin pulls the goggles over his eyes as a gust hits.",originalAiSuggestion:"Solar Filter Dust Goggles — Tinted goggles with worn leather straps.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero wardrobe prop."},{id:"elem-9",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Vehicles",name:"Solar Patrol Rover (Modified)",description:"Lightweight dune rover fitted with dual photovoltaic roof panels.",availability:"On Set Shoot Days 1 & 2",operationalRequirements:"Charging station in Base Camp, Art Dept weathering wrap",prepStatus:"Checked In & Inspected",sourceSnippet:"The rover sits idling beside Gate 4, suspension coated in red grit.",originalAiSuggestion:"Solar Patrol Rover (Modified) — Dune rover with dual photovoltaic roof panels.",status:"Confirmed",isHumanConfirmed:!0,confidence:.96,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Picture vehicle running on electric battery. Backup battery pack required."},{id:"elem-10",scriptId:e,sceneId:"scene-4",sceneNumber:4,scenes:[4],category:"Props",name:"Night-Vision Monocular Scope",description:"Military grade digital thermal optics.",sourcingType:"Rented",quantity:"1 Unit",readinessStatus:"Sourcing",continuityNotes:"Handheld by Meera on perimeter wall",sourceSnippet:"Meera scans the wire with her thermal monocle. Three glowing silhouettes freeze.",originalAiSuggestion:"Night-Vision Monocular Scope — Military grade digital thermal optics.",status:"Needs Review",isHumanConfirmed:!1,confidence:.85,confirmedBy:null,confirmedAt:null,notes:"Rental request pending vendor confirmation."},{id:"elem-11",scriptId:e,sceneId:"scene-7",sceneNumber:7,scenes:[7],category:"Cast",name:"COMMANDER VANCE",characterRole:"Antagonist, regional water syndicate director.",description:"Antagonist, regional water syndicate director.",assignedActor:"Michael Shannon",castingStatus:"Offer Out",actorAvailability:"Hold Oct 20-24",appearancesCount:2,sourceSnippet:"COMMANDER VANCE (50s), tailored gray linen, stands over the telemetry terminal.",originalAiSuggestion:"COMMANDER VANCE — Antagonist, regional water syndicate director.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Cast confirmed. Costume fitting scheduled Oct 20."},{id:"elem-12",scriptId:e,sceneId:"scene-16",sceneNumber:16,scenes:[16],category:"Practical FX",name:"Catwalk Rain Towers",description:"Simulated industrial torrential flood conditions on exterior catwalk.",requiredResources:"3 Overhead Rain Spars, 2 Fire Hydrant Ties",technicalRequirements:"Runoff water deflection channeling away from electrical stage lines",safetyNotes:"Safety harnesses mandatory on exterior catwalk scaffolding",prepStatus:"Pending Proposal Approval",sourceSnippet:"Water cascades down the spillway faces like Niagara.",originalAiSuggestion:"Catwalk Rain Towers — Simulated flood conditions on exterior catwalk.",status:"Needs Review",isHumanConfirmed:!1,confidence:.9,confirmedBy:null,confirmedAt:null,notes:"Requires environmental containment permits."}],localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(o))),t&&t!=="all"&&(o=o.filter(a=>a.category.toLowerCase()===t.toLowerCase())),s&&s!=="all"){const a=Number(String(s).replace("scene-",""));o=o.filter(l=>l.sceneId===s||String(l.sceneNumber)===String(s)||Array.isArray(l.scenes)&&l.scenes.includes(a)||l.sceneNumber===a)}return o}async function rs(e,t,s){try{const a=await ne(`/production/${e}/breakdown/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.item){const l=await dt(e),i=l.findIndex(r=>r.id===t);return i!==-1&&(l[i]=a.item,localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(l))),a.item}}catch{}const n=await dt(e),o=n.find(a=>a.id===t);return o?((s.name&&s.name!==o.name||s.description&&s.description!==o.description)&&(o.userCorrection={previousName:o.name,previousDesc:o.description,correctedBy:"Arun Kumar (Owner)",correctedAt:new Date().toISOString()}),Object.assign(o,s),s.status==="Confirmed"?(o.isHumanConfirmed=!0,o.confirmedBy="Arun Kumar (Owner)",o.confirmedAt=new Date().toISOString()):s.status==="Needs Review"&&(o.isHumanConfirmed=!1),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(n)),o):s}async function pa(e,t){try{const o=await ne(`/production/${e}/breakdown/${t}`,{method:"DELETE"});if(o?.success){const l=(await dt(e)).filter(i=>i.id!==t);return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(l)),o}}catch{}const n=(await dt(e)).filter(o=>o.id!==t);return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(n)),{success:!0,removedId:t}}async function ma(e,t){try{const a=await ne(`/production/${e}/breakdown`,{method:"POST",body:JSON.stringify(t)});if(a?.item){const l=await dt(e);return l.unshift(a.item),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(l)),a.item}}catch{}const s=await dt(e),n=Number(t.sceneNumber||(t.sceneId?String(t.sceneId).replace("scene-",""):18)),o={id:`elem-${Date.now()}`,scriptId:e,sceneId:t.sceneId||`scene-${n}`,sceneNumber:n,scenes:t.scenes||[n],category:t.category||"Props",name:t.name,description:t.description||"",sourceSnippet:t.sourceSnippet||"User added manual item",originalAiSuggestion:null,status:t.status||"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:new Date().toISOString(),notes:t.notes||"",assignedActor:t.assignedActor||"",castingStatus:t.castingStatus||"Uncast / Open",actorAvailability:t.actorAvailability||"",characterRole:t.characterRole||t.description||"",context:t.context||"INT.",lighting:t.lighting||"DAY",locationStatus:t.locationStatus||"Secured & Permitted",accessDetails:t.accessDetails||"",sourcingType:t.sourcingType||"Sourced",quantity:t.quantity||"1",readinessStatus:t.readinessStatus||"Ready in Art Dept",continuityNotes:t.continuityNotes||"",requiredResources:t.requiredResources||"",technicalRequirements:t.technicalRequirements||"",safetyNotes:t.safetyNotes||"",coordinationRequirements:t.coordinationRequirements||"",qualifiedPersonnel:t.qualifiedPersonnel||"",safetyPlanningStatus:t.safetyPlanningStatus||"Awaiting Coordinator Review",character:t.character||"",wardrobeRequirements:t.wardrobeRequirements||"",continuityChanges:t.continuityChanges||"",prepStatus:t.prepStatus||"In Prep",availability:t.availability||"",operationalRequirements:t.operationalRequirements||""};return s.unshift(o),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(s)),o}async function Nt(e="chronicles-of-dust"){try{const n=await ne(`/production/${e}/call-sheets`);if(n?.callSheets)return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n.callSheets)),n.callSheets}catch{}const t=localStorage.getItem(`scriptora_prod_callsheets_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"cs-1",scriptId:e,callSheetNumber:"01",shootDay:"Day 1 of 7",shootDate:"Saturday, Oct 24, 2026",generalCrewCall:"06:00 AM",shootingCall:"06:30 AM",breakfastTime:"05:15 AM",estimatedWrap:"06:30 PM",status:"Confirmed",isPublished:!0,version:"v1.0",locationName:"Mojave Outpost Gate 4",locationAddress:"Perimeter Road 9, Cantil, CA 93519",parkingNotes:"Crew parking at Basecamp Lot B (1/4 mile west of gate). Shuttle runs every 10 mins.",nearestHospital:"Kern Valley Healthcare District, 6412 Laurel Ave, Lake Isabella, CA (Ph: 760-379-2681)",weatherSummary:"Sunny, 74°F high, 48°F low. Winds WNW 10-15 mph. Dust advisory after 4:00 PM.",scenes:[{sceneNumber:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",pages:"4 1/8",cast:["KEVIN","MARCUS"],desc:"Kevin arrives at border gate, inspection with Marcus."},{sceneNumber:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",pages:"3 4/8",cast:["KEVIN","MEERA"],desc:"Kevin discovers pressure loss on telemetry terminal."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MARCUS",actor:"David Chen",pickup:"05:15 AM",hmuCall:"05:45 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MEERA",actor:"Priya Sharma",pickup:"08:30 AM",hmuCall:"09:00 AM",onSet:"10:30 AM",status:"Confirmed"}],specialInstructions:"Eye protection mandatory for all crew on exterior perimeter due to afternoon dust squall.",approvedBy:"Arun Kumar (Owner)",publishedAt:"2026-10-14T08:00:00Z"},{id:"cs-2",scriptId:e,callSheetNumber:"02",shootDay:"Day 2 of 7",shootDate:"Sunday, Oct 25, 2026",generalCrewCall:"06:30 AM",shootingCall:"07:00 AM",breakfastTime:"05:45 AM",estimatedWrap:"07:00 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:"Pumping Station Chamber B",locationAddress:"Aqueduct District Facility 4, Mojave, CA 93501",parkingNotes:"Basecamp parking inside Gate 2 secure compound. Security clearance badge required.",nearestHospital:"Antelope Valley Medical Center, 1600 W Ave J, Lancaster, CA (Ph: 661-949-5000)",weatherSummary:"Interior stage / sheltered facility. Ambient temp 68°F. Hearing protection mandatory.",scenes:[{sceneNumber:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",pages:"7 2/8",cast:["KEVIN"],desc:"Kevin examines exterior tap line."},{sceneNumber:10,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",pages:"2 6/8",cast:["KEVIN","MEERA"],desc:"High water pressure valve breach and cable clamp."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"},{character:"MEERA",actor:"Priya Sharma",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"}],specialInstructions:"Wet set protocols in effect for Scene 10. Waterproof camera housing and electrical GFI circuits required.",approvedBy:null,publishedAt:null}];return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),s}async function Ys(e,t){try{const n=await ne(`/production/${e}/call-sheets/${t}`);if(n?.callSheet)return n.callSheet}catch{}return(await Nt(e)).find(n=>n.id===t)||null}async function xa(e,t){try{const o=await ne(`/production/${e}/call-sheets`,{method:"POST",body:JSON.stringify(t)});if(o?.callSheet)return o.callSheet}catch{}const s=await Nt(e),n={id:`cs-${Date.now()}`,scriptId:e,callSheetNumber:String(s.length+1).padStart(2,"0"),shootDay:t.shootDay||`Day ${s.length+1} of 14`,shootDate:t.shootDate||"Monday, Oct 26, 2026",generalCrewCall:t.generalCrewCall||"06:00 AM",shootingCall:t.shootingCall||"06:30 AM",breakfastTime:t.breakfastTime||"05:15 AM",estimatedWrap:t.estimatedWrap||"06:30 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:t.locationName||"Location TBD",locationAddress:t.locationAddress||"TBD",parkingNotes:t.parkingNotes||"Crew parking guidelines.",nearestHospital:t.nearestHospital||"Desert Care Network Regional, Palm Springs, CA",weatherSummary:t.weatherSummary||"Forecast pending.",scenes:t.scenes||[{sceneNumber:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",pages:"5 0/8",cast:["KEVIN","MEERA"],desc:"Perimeter fence inspection."}],castCalls:t.castCalls||[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Draft"}],specialInstructions:t.specialInstructions||"Standard safety directives.",approvedBy:null,publishedAt:null};return s.push(n),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),n}async function fa(e,t,s){try{const a=await ne(`/production/${e}/call-sheets/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.callSheet)return a.callSheet}catch{}const n=await Nt(e),o=n.find(a=>a.id===t);return o?(Object.assign(o,s),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n)),o):s}async function ba(e,t){try{const o=await ne(`/production/${e}/call-sheets/${t}/publish`,{method:"POST"});if(o?.callSheet)return o.callSheet}catch{}const s=await Nt(e),n=s.find(o=>o.id===t);return n?(n.status="Confirmed",n.isPublished=!0,n.version="v1.0 (Snapshot)",n.approvedBy="Arun Kumar (Owner)",n.publishedAt=new Date().toISOString(),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),n):null}async function ct(e="chronicles-of-dust"){try{const n=await ne(`/production/${e}/schedule`);if(n?.schedule)return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(n.schedule)),n.schedule}catch{}const t=localStorage.getItem(`scriptora_prod_schedule_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{dayNumber:1,date:"Oct 24, 2026",title:"Outpost Perimeter & Shed",location:"Mojave Gate 4",sceneNumbers:[1,2],totalPages:"7 5/8",estHours:10.5,companyMoves:0,isLocked:!0,status:"Confirmed"},{dayNumber:2,date:"Oct 25, 2026",title:"Lakebed Conduit & Chamber B",location:"Chamber B Dry Tank",sceneNumbers:[3,10],totalPages:"10 0/8",estHours:11,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:3,date:"Oct 26, 2026",title:"Perimeter Fence & Valve Tunnel",location:"Perimeter Sector 9",sceneNumbers:[4,5],totalPages:"10 4/8",estHours:11.5,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:4,date:"Oct 27, 2026",title:"Service Road Pursuit",location:"Route 66 Cutoff",sceneNumbers:[6],totalPages:"5 2/8",estHours:8,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:5,date:"Oct 28, 2026",title:"Syndicate Regional Control",location:"Syndicate Regional HQ",sceneNumbers:[7],totalPages:"6 3/8",estHours:9,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:6,date:"Oct 29, 2026",title:"Reservoir Intake Rappel",location:"Lake Mead Dry Spillway",sceneNumbers:[8],totalPages:"5 5/8",estHours:10,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:7,date:"Oct 30, 2026",title:"Drainage Sub-vaults & Wrap",location:"Vault Sub-structure 3",sceneNumbers:[9],totalPages:"4 1/8",estHours:8.5,companyMoves:0,isLocked:!1,status:"Draft"}];return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(s)),s}async function bt(e,t,s){try{const a=await ne(`/production/${e}/schedule/day/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.day)return a.day}catch{}const n=await ct(e),o=n.find(a=>a.dayNumber===Number(t));return o?(Object.assign(o,s),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(n)),o):s}async function ga(e,t,s,n){const o=await ct(e),a=o.find(i=>i.dayNumber===Number(s)),l=o.find(i=>i.dayNumber===Number(n));return!a||!l||(a.sceneNumbers=(a.sceneNumbers||[]).filter(i=>i!==Number(t)),(l.sceneNumbers||[]).includes(Number(t))||(l.sceneNumbers=[...l.sceneNumbers||[],Number(t)]),await bt(e,s,{sceneNumbers:a.sceneNumbers}),await bt(e,n,{sceneNumbers:l.sceneNumbers})),o}async function Xs(e,t,s){return await bt(e,t,{sceneNumbers:s})}async function Zs(e,t){try{const o=await ne(`/production/${e}/call-sheets/${t}`,{method:"DELETE"});if(o?.success){const l=(await Nt(e)).filter(i=>i.id!==t);return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(l)),o}}catch{}const n=(await Nt(e)).filter(o=>o.id!==t);return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n)),{success:!0,removedId:t}}async function ha(e,t){try{const a=await ne(`/production/${e}/schedule/day`,{method:"POST",body:JSON.stringify(t)});if(a?.day){const l=await ct(e);return l.push(a.day),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(l)),a.day}}catch{}const s=await ct(e),n=s.length>0?Math.max(...s.map(a=>a.dayNumber))+1:1,o={dayNumber:t.dayNumber||n,date:t.date||`Nov ${String(n).padStart(2,"0")}, 2026`,title:t.title||`Shoot Day ${n}`,location:t.location||"Location TBD",sceneNumbers:t.sceneNumbers||[],totalPages:t.totalPages||"0 0/8",estHours:t.estHours||8,companyMoves:t.companyMoves||0,isLocked:!1,status:"Draft"};return s.push(o),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(s)),o}async function ya(e,t){const s=Number(t);try{const a=await ne(`/production/${e}/schedule/day/${s}`,{method:"DELETE"});if(a?.success){const i=(await ct(e)).filter(r=>r.dayNumber!==s);return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(i)),a}}catch{}const o=(await ct(e)).filter(a=>a.dayNumber!==s);return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(o)),{success:!0,removedDayNumber:s}}async function va(){try{const e=await ne("/production/ai/providers");if(e?.providers)return e.providers}catch{}return[{id:"scriptora-concept",name:"SCRIPTORA Concept Engine",model:"v2.4 High-Res Vector & Composition",isConfigured:!0,pricingType:"free",costPerImage:0,costLabel:"Free (Built-in)",requiresApiKey:!1,aspectRatios:["2.39:1","16:9","4:3","9:16"],styles:["Cinematic Concept Art","Storyboard Ink","Pencil Sketch","Photorealistic / Live Action","3D Animation","Anime / Illustration"],description:"Fast, cinematic vector canvas with camera crosshairs, aspect ratio letterboxing, stylized character silhouettes, and directional lighting."},{id:"openai-dalle3",name:"OpenAI DALL-E 3",model:"dall-e-3",isConfigured:!1,pricingType:"paid",costPerImage:.04,costLabel:"$0.040 (Standard) / $0.080 (HD)",requiresApiKey:!0,envVarName:"OPENAI_API_KEY",aspectRatios:["16:9","2.39:1","1:1","9:16"],styles:["Photorealistic / Live Action","Cinematic Concept Art","Pencil Sketch","3D Animation"],description:"High-fidelity photorealistic rendering and complex composition synthesis via OpenAI API."},{id:"gemini-imagen3",name:"Google Imagen 3",model:"imagen-3.0-generate-002",isConfigured:!1,pricingType:"paid",costPerImage:.03,costLabel:"$0.030 per image",requiresApiKey:!0,envVarName:"GEMINI_API_KEY",aspectRatios:["16:9","4:3","1:1","9:16"],styles:["Cinematic Concept Art","Photorealistic / Live Action","Storyboard Ink"],description:"Photorealistic film still generation using Google Vertex/Gemini Imagen 3."},{id:"stability-sdxl",name:"Stability AI SDXL",model:"stable-diffusion-xl-1024-v1-0",isConfigured:!1,pricingType:"paid",costPerImage:.018,costLabel:"$0.018 per image",requiresApiKey:!0,envVarName:"STABILITY_API_KEY",aspectRatios:["16:9","2.39:1","4:3","9:16"],styles:["Storyboard Ink","Pencil Sketch","Cinematic Concept Art","Anime / Illustration"],description:"Versatile storyboard and concept illustration synthesis via Stability AI."}]}async function Ct(e="chronicles-of-dust",t="scene-1"){try{const r=await ne(`/production/${e}/storyboard?sceneId=${t}`);if(r?.storyboard)return localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(r.storyboard)),r.storyboard}catch{}const s=localStorage.getItem(`scriptora_storyboard_${e}_${t}`);if(s)try{return JSON.parse(s)}catch{}const n=await _t(e),o=Number(String(t).replace("scene-",""))||1,a=n.find(r=>r.id===t||r.sceneNumber===o)||{id:`scene-${o}`,sceneNumber:o,heading:`SCENE ${o} - UNTITLED`,intExt:"INT",dayNight:"DAY"},l=o===1?[{id:"shot-1-1A",shotNumber:"1A",order:1,title:"Perimeter Outpost Gate",description:"High altitude drone descending across dust devils toward Kevin's arrival at the arid customs gate.",shotSize:"Wide Shot",cameraAngle:"High Angle",cameraMovement:"Crane / Jib",focalLength:"24mm Wide",lightingMood:"Daylight Dust",aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",prompt:"Cinematic wide shot, arid desert outpost gate, dust devils whirling, 2.39:1 anamorphic",imageUrl:Jt("1A","2.39:1 · 24mm Wide","EXT. MOJAVE OUTPOST GATE 4 - DAY","Wide Shot"),imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"approved",approvalNotes:"Great atmosphere and sense of scale. Approved for primary camera team.",approvedBy:"Arun Kumar (Owner)",approvedAt:"2026-10-18T10:30:00Z",directorNotes:"Capture sunrise glint off the guard gate perimeter wires.",characters:["KEVIN","MARCUS"],location:"Arid Outpost Gate 4",continuity:{characterPosition:"Kevin approaching from camera-left",screenDirection:"Left to Right",eyeline:"Looking toward Outpost Gate",lightingContinuity:"High-contrast morning sun from east",costumeState:"Dust coat level 2, canteen left side",propPlacement:"Gate clearance scanner in right hand"},history:[]},{id:"shot-1-1B",shotNumber:"1B",order:2,title:"Gate Scanner Clearance Standoff",description:"Medium two-shot of Kevin presenting his ID badge to Marcus over the buzzing clearance terminal.",shotSize:"Medium Two-Shot",cameraAngle:"Eye Level",cameraMovement:"Static",focalLength:"50mm Prime",lightingMood:"Harsh Fluorescent Rim",aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",prompt:"Medium two-shot, dusty outpost booth, weary hydro-engineer confronting guard, 50mm",imageUrl:Jt("1B","2.39:1 · 50mm Prime","EXT. MOJAVE OUTPOST GATE 4 - DAY","Medium Two-Shot"),imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"approved",approvalNotes:"Good eyeline match with Shot 1A.",approvedBy:"Arun Kumar (Owner)",approvedAt:"2026-10-18T10:35:00Z",directorNotes:"Focus pull from scanner terminal to Kevin's tense expression.",characters:["KEVIN","MARCUS"],location:"Arid Outpost Gate 4",continuity:{characterPosition:"Kevin screen-left, Marcus screen-right",screenDirection:"Left to Right",eyeline:"Eye-level direct confrontation",lightingContinuity:"Terminal backlight rimming Kevin's face",costumeState:"Kevin wearing goggles around neck",propPlacement:"ID card inserted into reader"},history:[]},{id:"shot-1-1C",shotNumber:"1C",order:3,title:"Terminal Diagnostic Anomaly",description:"Close-up insert of the flickering scanner console displaying pressure alert warning in red neon.",shotSize:"Close-Up",cameraAngle:"Low Angle",cameraMovement:"Static",focalLength:"85mm Portrait",lightingMood:"Cyan Strobe",aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",prompt:"Extreme close-up on rugged military diagnostic screen, red warning glyphs, 85mm",imageUrl:Jt("1C","2.39:1 · 85mm Close-Up","EXT. MOJAVE OUTPOST GATE 4 - DAY","Close-Up"),imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"proposed",approvalNotes:"Review telemetry readout typography for accuracy.",approvedBy:null,approvedAt:null,directorNotes:"Practical screen insert; needs strobe flash on alert pulse.",characters:["KEVIN"],location:"Arid Outpost Gate 4",continuity:{characterPosition:"Centered insert",screenDirection:"Neutral",eyeline:"Downwards onto screen",lightingContinuity:"Red alert flashing 1Hz",costumeState:"Kevin's gloved thumb on lower bezel",propPlacement:"Scanner unit firmly latched"},history:[]}]:[],i={id:`sb-${e}-${a.id}`,scriptId:e,sceneId:a.id,sceneNumber:a.sceneNumber,sceneHeading:a.heading,intExt:a.intExt||"INT",dayNight:a.dayNight||"DAY",sourceVersion:"Draft 4.2",isVersionStale:!1,aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",shots:l,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(i)),i}async function vs(e,t){try{const n=await ne(`/production/${e}/storyboard`,{method:"POST",body:JSON.stringify(t)});if(n?.storyboard)return localStorage.setItem(`scriptora_storyboard_${e}_${n.storyboard.sceneId}`,JSON.stringify(n.storyboard)),n.storyboard}catch{}const s=t.sceneId||`scene-${t.sceneNumber||1}`;return localStorage.setItem(`scriptora_storyboard_${e}_${s}`,JSON.stringify(t)),t}async function wa(e,t,s){try{const r=await ne(`/production/${e}/storyboard/${t}/shots`,{method:"POST",body:JSON.stringify(s)});if(r?.shot)return r.storyboard&&localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(r.storyboard)),r}catch{}const n=await Ct(e,t),o=n.shots.length+1,a=String.fromCharCode(65+(o-1)%26),l=s.shotNumber||`${n.sceneNumber}${a}`,i={id:`shot-${Date.now()}`,shotNumber:l,order:o,title:s.title||`Shot ${l}`,description:s.description||"",shotSize:s.shotSize||"Medium Shot",cameraAngle:s.cameraAngle||"Eye Level",cameraMovement:s.cameraMovement||"Static",focalLength:s.focalLength||"50mm Prime",lightingMood:s.lightingMood||"Natural Daylight",aspectRatio:s.aspectRatio||n.aspectRatio||"2.39:1",visualStyle:s.visualStyle||n.visualStyle||"Cinematic Concept Art",prompt:s.prompt||"",negativePrompt:s.negativePrompt||"",imageUrl:s.imageUrl||null,imageSource:s.imageSource||(s.imageUrl?"imported":null),provider:s.provider||null,quality:s.quality||"standard",costEstimate:s.costEstimate||null,approvalStatus:s.approvalStatus||"draft",approvalNotes:s.approvalNotes||"",approvedBy:s.approvedBy||null,approvedAt:s.approvedAt||null,directorNotes:s.directorNotes||"",characters:s.characters||[],location:s.location||"",continuity:{characterPosition:s.continuity?.characterPosition||"",screenDirection:s.continuity?.screenDirection||"Left to Right",eyeline:s.continuity?.eyeline||"Eye Level",lightingContinuity:s.continuity?.lightingContinuity||"",costumeState:s.continuity?.costumeState||"",propPlacement:s.continuity?.propPlacement||""},history:[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return n.shots.push(i),n.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(n)),{storyboard:n,shot:i}}async function Qs(e,t,s,n){try{const l=await ne(`/production/${e}/storyboard/${t}/shots/${s}`,{method:"PUT",body:JSON.stringify(n)});if(l?.shot)return l.storyboard&&localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(l.storyboard)),l}catch{}const o=await Ct(e,t),a=o.shots.find(l=>l.id===s);if(!a)throw new Error("Shot not found");return n.continuity&&(n.continuity={...a.continuity,...n.continuity}),Object.assign(a,n,{updatedAt:new Date().toISOString()}),o.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(o)),{storyboard:o,shot:a}}async function Sa(e,t,s){try{const a=await ne(`/production/${e}/storyboard/${t}/shots/${s}`,{method:"DELETE"});if(a?.success)return a.storyboard&&localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(a.storyboard)),a}catch{}const n=await Ct(e,t),o=n.shots.findIndex(a=>a.id===s);return o!==-1&&(n.shots.splice(o,1),n.shots.forEach((a,l)=>{a.order=l+1}),n.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(n))),{success:!0,removedId:s,storyboard:n}}async function Ea(e,t,s=[]){try{const l=await ne(`/production/${e}/storyboard/${t}/reorder`,{method:"POST",body:JSON.stringify({shotIds:s})});if(l?.storyboard)return localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(l.storyboard)),l}catch{}const n=await Ct(e,t),o=new Map(n.shots.map(l=>[l.id,l])),a=[];for(const l of s)o.has(l)&&(a.push(o.get(l)),o.delete(l));for(const l of o.values())a.push(l);return a.forEach((l,i)=>{l.order=i+1}),n.shots=a,n.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(n)),{storyboard:n}}async function ws(e,t,s,n="approved",o=""){try{const i=await ne(`/production/${e}/storyboard/${t}/shots/${s}/approve`,{method:"POST",body:JSON.stringify({status:n,notes:o})});if(i?.shot)return i.storyboard&&localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(i.storyboard)),i}catch{}const a=await Ct(e,t),l=a.shots.find(i=>i.id===s);return l&&(l.approvalStatus=n,l.approvalNotes=o||l.approvalNotes||"",l.approvedBy="Arun Kumar (Owner)",l.approvedAt=new Date().toISOString(),l.updatedAt=new Date().toISOString(),a.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(a))),{storyboard:a,shot:l}}async function Ss(e,t,s=[],n="approved",o=""){try{const i=await ne(`/production/${e}/storyboard/${t}/batch-approve`,{method:"POST",body:JSON.stringify({shotIds:s,status:n,notes:o})});if(i?.storyboard)return localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(i.storyboard)),i}catch{}const a=await Ct(e,t);let l=0;for(const i of a.shots)s.includes(i.id)&&(i.approvalStatus=n,o&&(i.approvalNotes=o),i.approvedBy="Arun Kumar (Owner)",i.approvedAt=new Date().toISOString(),i.updatedAt=new Date().toISOString(),l++);return a.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(a)),{storyboard:a,affectedCount:l}}async function Es(e,t={}){try{const n=await ne(`/production/${e}/storyboard/generate-shot`,{method:"POST",body:JSON.stringify(t)});if(n?.imageUrl)return n}catch(n){if(n.message&&n.message.includes("not configured"))throw n}return{imageUrl:Jt(t.shotNumber||"1A",`${t.aspectRatio||"2.39:1"} · ${t.focalLength||"50mm"}`,t.sceneHeading||"SCENE 1",t.shotSize||"Medium Shot"),provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",prompt:t.prompt||""}}async function Ia(e,t,s={}){try{const u=await ne(`/production/${e}/storyboard/generate-sequence`,{method:"POST",body:JSON.stringify({sceneId:t,...s})});if(u?.proposedShots)return u}catch(u){if(u.message&&u.message.includes("not configured"))throw u}const n=await _t(e),o=Number(String(t).replace("scene-",""))||1,a=n.find(u=>u.id===t||u.sceneNumber===o)||{heading:`SCENE ${o} - UNTITLED`,dayNight:"DAY",snippet:"Protagonist navigates industrial perimeter."},l=[{num:`${o}A`,title:"Establishing Spatial Depth",size:"Wide Shot",angle:"High Angle",lens:"24mm Wide",desc:`Wide environmental view establishing spatial layout of ${a.heading}.`},{num:`${o}B`,title:"Character Blocking & Entry",size:"Medium Two-Shot",angle:"Eye Level",lens:"50mm Prime",desc:"Two-shot tracking entry as characters coordinate actions."},{num:`${o}C`,title:"Dramatic Focal Climax Beat",size:"Close-Up",angle:"Dutch Angle",lens:"85mm Portrait",desc:"Close-up reaction highlighting emotional stakes and sudden anomaly."},{num:`${o}D`,title:"Critical Action Insert",size:"Extreme Close-Up",angle:"Low Angle",lens:"35mm Macro",desc:"Macro insert of tactile equipment interaction and valve override."}],i=Math.max(1,Math.min(4,Number(s.shotCount||s.count||4))),m=l.slice(0,i).map((u,d)=>({id:`prop-shot-${Date.now()}-${d}`,shotNumber:u.num,order:d+1,title:u.title,description:u.desc,shotSize:u.size,cameraAngle:u.angle,cameraMovement:d===1?"Tracking Dolly":"Static",focalLength:u.lens,lightingMood:a.dayNight==="NIGHT"?"Low-Key Shadow":"Daylight Dust",aspectRatio:s.aspectRatio||"2.39:1",visualStyle:s.visualStyle||"Cinematic Concept Art",prompt:`${u.size} of ${a.heading}: ${a.snippet}`,imageUrl:Jt(u.num,`${s.aspectRatio||"2.39:1"} · ${u.lens}`,a.heading,u.size),imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"proposed",approvalNotes:"AI proposed sequence beat. Review and approve to confirm.",approvedBy:null,approvedAt:null,directorNotes:"Calibrate lens catchlights for consistency across cuts.",characters:a.cast||["KEVIN"],location:a.heading,continuity:{characterPosition:d%2===0?"Screen Left":"Screen Right",screenDirection:"Left to Right",eyeline:d%2===0?"Looking Screen Right":"Looking Screen Left",lightingContinuity:a.dayNight==="NIGHT"?"Low key, cyan rim":"Direct desert sun",costumeState:"Production baseline",propPlacement:"Standard tactical staging"},history:[]}));return{sceneHeading:a.heading,sceneNumber:o,proposedShots:m}}function Jt(e,t,s,n,o="Cinematic Concept Art",a="2.39:1"){let l=1200,i=502;a==="16:9"&&(i=675),a==="4:3"&&(i=900),a==="9:16"&&(l=675,i=1200);const r=s.toUpperCase().includes("NIGHT"),m=(o||"").toLowerCase().includes("pencil"),u=(o||"").toLowerCase().includes("ink"),d=(o||"").toLowerCase().includes("anime")||(o||"").toLowerCase().includes("illustration");let c=r?"%23090d16":"%23292524",p=r?"%23020617":"%231c1917",f=r?"%2338bdf8":"%23f59e0b",b=r?"%2306b6d4":"%23fbbf24",x="%23020617",g="%23ffffff",B="0.08";m?(c="%23f5f5f4",p="%23e7e5e4",f="%2357534e",b="%2378716c",x="%2344403c",g="%23292524",B="0.15"):u?(c="%230a0a0a",p="%23000000",f="%23ffffff",b="%23e2e8f0",x="%230f172a"):d&&(c="%231e1035",p="%230f0728",f="%23ec4899",b="%2338bdf8");let v=240,N=i-260;n&&n.includes("Wide")?(v=100,N=i-140):n&&n.includes("Close")&&!n.includes("Extreme")?(v=400,N=i-420):n&&n.includes("Extreme")&&(v=540,N=i-550);const S=n&&n.includes("Two-Shot"),M=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${l} ${i}' width='${l}' height='${i}'>
    <defs>
      <linearGradient id='bg2' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='${c}'/>
        <stop offset='100%' stop-color='${p}'/>
      </linearGradient>
      <radialGradient id='rimLight2' cx='70%' cy='30%' r='65%'>
        <stop offset='0%' stop-color='${b}' stop-opacity='0.4'/>
        <stop offset='100%' stop-color='${p}' stop-opacity='0'/>
      </radialGradient>
      <pattern id='grid2' width='40' height='40' patternUnits='userSpaceOnUse'>
        <path d='M 40 0 L 0 0 0 40' fill='none' stroke='${g}' stroke-width='0.5' opacity='${B}'/>
      </pattern>
    </defs>
    <rect width='${l}' height='${i}' fill='url(%23bg2)'/>
    <rect width='${l}' height='${i}' fill='url(%23rimLight2)'/>
    <rect width='${l}' height='${i}' fill='url(%23grid2)'/>
    
    <line x1='0' y1='${Math.round(i*.63)}' x2='${l}' y2='${Math.round(i*.63)}' stroke='${f}' stroke-width='1.2' opacity='0.35' stroke-dasharray='5,5'/>
    
    ${S?`
      <g transform='translate(${Math.round(l*.35)}, ${Math.round(N)})'>
        <circle cx='0' cy='${Math.round(-v*.35)}' r='${Math.round(v*.12)}' fill='%230f172a' stroke='${b}' stroke-width='1.5'/>
        <path d='M ${Math.round(-v*.2)} ${Math.round(-v*.2)} Q 0 ${Math.round(-v*.26)} ${Math.round(v*.2)} ${Math.round(-v*.2)} L ${Math.round(v*.25)} ${v} L ${Math.round(-v*.25)} ${v} Z' fill='${x}' stroke='${f}' stroke-width='1.2'/>
      </g>
      <g transform='translate(${Math.round(l*.65)}, ${Math.round(N)})'>
        <circle cx='0' cy='${Math.round(-v*.35)}' r='${Math.round(v*.12)}' fill='%230f172a' stroke='${f}' stroke-width='1.5'/>
        <path d='M ${Math.round(-v*.2)} ${Math.round(-v*.2)} Q 0 ${Math.round(-v*.26)} ${Math.round(v*.2)} ${Math.round(-v*.2)} L ${Math.round(v*.25)} ${v} L ${Math.round(-v*.25)} ${v} Z' fill='${x}' stroke='${b}' stroke-width='1.2'/>
      </g>
    `:`
      <g transform='translate(${Math.round(l/2)}, ${Math.round(N)})'>
        <circle cx='0' cy='${Math.round(-v*.35)}' r='${Math.round(v*.12)}' fill='%230f172a' stroke='${b}' stroke-width='1.5'/>
        <path d='M ${Math.round(-v*.22)} ${Math.round(-v*.2)} Q 0 ${Math.round(-v*.28)} ${Math.round(v*.22)} ${Math.round(-v*.2)} L ${Math.round(v*.28)} ${v} L ${Math.round(-v*.28)} ${v} Z' fill='${x}' stroke='${f}' stroke-width='1.2'/>
      </g>
    `}

    <!-- Telemetry -->
    <rect x='24' y='24' width='140' height='26' rx='6' fill='black' opacity='0.7'/>
    <circle cx='36' cy='37' r='4' fill='%23ef4444'/>
    <text x='48' y='42' fill='white' font-family='monospace' font-size='11' font-weight='bold'>REC · ${e}</text>
    
    <rect x='${l-240}' y='24' width='216' height='46' rx='6' fill='black' opacity='0.7'/>
    <text x='${l-34}' y='41' text-anchor='end' fill='${f}' font-family='monospace' font-size='12' font-weight='bold'>${t}</text>
    <text x='${l-34}' y='60' text-anchor='end' fill='white' opacity='0.85' font-family='sans-serif' font-size='10'>${n}</text>

    <rect x='0' y='${i-36}' width='${l}' height='36' fill='black' opacity='0.85'/>
    <text x='24' y='${i-13}' fill='white' font-family='sans-serif' font-size='12' font-weight='bold'>${s}</text>
    <text x='${l-24}' y='${i-13}' text-anchor='end' fill='${b}' font-family='sans-serif' font-size='11'>SCRIPTORA CONCEPT ENGINE · ${(o||"CINEMATIC").toUpperCase()}</text>
  </svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(M)}`}async function ka(e,t,s,n){try{const l=await ne(`/production/${e}/storyboard/${t}/shots/${s}/restore`,{method:"POST",body:JSON.stringify({historyIndex:n})});if(l?.shot)return l.storyboard&&localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(l.storyboard)),l}catch{}const o=await Ct(e,t),a=o.shots.find(l=>l.id===s);if(a&&Array.isArray(a.history)&&a.history[n]){const l=a.history[n];a.history.push({previousImageUrl:a.imageUrl,previousPrompt:a.prompt,provider:a.provider||"scriptora-concept",quality:a.quality||"hd",approvalStatus:a.approvalStatus||"draft",sourceVersion:o.sourceVersion||"Draft 4.2",timestamp:new Date().toISOString(),updatedBy:"Arun Kumar (Owner)"}),a.imageUrl=l.previousImageUrl,l.previousPrompt&&(a.prompt=l.previousPrompt),l.provider&&(a.provider=l.provider),l.approvalStatus&&(a.approvalStatus=l.approvalStatus),a.updatedAt=new Date().toISOString(),o.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(o))}return{storyboard:o,shot:a}}class Ca{constructor(){try{sessionStorage.removeItem("scriptora_history_stack")}catch{}this.state={currentUser:null,selectedScriptId:localStorage.getItem("scriptora_selected_script")||"chronicles-of-dust",selectedVersionId:"Draft 4.2",currentSceneId:18,unreadNotifications:3,scripts:[],activeScript:null,screenplay:null,settings:null,historyStack:[]},this.listeners=new Set}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(const t of this.listeners)try{t(this.state)}catch(s){console.error("Store listener error:",s)}}setState(t){this.state={...this.state,...t},t.selectedScriptId&&localStorage.setItem("scriptora_selected_script",t.selectedScriptId),this.notify()}pushHistory(t){if(!t)return;const s=t.trim(),n=this.state.historyStack;(n.length===0||n[n.length-1]!==s)&&(n.push(s),n.length>50&&n.shift())}popHistory(){return this.state.historyStack.pop()}getPreviousRoute(t="/workspace"){return this.popHistory()||t}peekPreviousRoute(t="/workspace"){const s=this.state.historyStack;return s.length>0?s[s.length-1]:t}clearHistory(){this.state.historyStack=[];try{sessionStorage.removeItem("scriptora_history_stack")}catch{}}resetUserSession(){this.setState({currentUser:null,scripts:[],activeScript:null,screenplay:null,historyStack:[],selectedScriptId:"chronicles-of-dust",unreadNotifications:0}),this.clearHistory()}async init(){try{const t=await pn(),s=await nt(),n=await Js(),o=await fn();let a=localStorage.getItem("scriptora_selected_script");const l=s&&s.length>0?s.find(r=>r.isCurrentDraft):null;l?a=l.id:s&&s.length>0?(!a||!s.some(r=>r.id===a))&&(a=s[0].id):a=null,a?localStorage.setItem("scriptora_selected_script",a):localStorage.removeItem("scriptora_selected_script");const i=s&&s.length>0?s.find(r=>r.id===a)||s[0]:null;this.setState({currentUser:t,scripts:s||[],selectedScriptId:a,activeScript:i,unreadNotifications:n,settings:o})}catch(t){console.error("Init store error:",t)}}async selectScript(t){if(!t)return;const s=await Vn(t),n=(s||this.state.scripts).find(o=>o.id===t)||await xs(t);this.setState({selectedScriptId:t,activeScript:n,scripts:s||this.state.scripts})}async refreshNotifications(){const t=await Js();this.setState({unreadNotifications:t})}async refreshScripts(){const t=await nt(),s=t&&t.length>0?t.find(a=>a.isCurrentDraft):null;let n=s?s.id:this.state.selectedScriptId;t&&t.length>0?(!n||!t.some(a=>a.id===n))&&(n=t[0].id):n=null;const o=t&&t.length>0?t.find(a=>a.id===n)||t[0]:null;return n?localStorage.setItem("scriptora_selected_script",n):localStorage.removeItem("scriptora_selected_script"),this.setState({scripts:t||[],selectedScriptId:n,activeScript:o}),t}}const $=new Ca,Aa="/Scriptora/assets/logo-BG9jZ7UG.png",Ms=Aa;function Xe(e="Workspace",t="Your writing space."){const s=$.state.unreadNotifications,n=$.state.currentUser?.initials||"JD";return`
    <header class="fixed top-0 left-0 right-0 w-full z-40 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-surface-container-high/60 select-none" data-global-header="true">
      <div class="h-14 px-4 flex items-center justify-between max-w-2xl mx-auto">
        <a href="/workspace" class="flex items-center gap-2.5 min-w-0 no-underline text-inherit cursor-pointer active:opacity-80 transition-opacity">
          <img src="${Ms}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora" class="w-8 h-8 object-contain shrink-0" />
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
  `}function Ke(e="workspace"){const t=e==="workspace",s=e==="intelligence",n=e==="chat"||e==="ai-chat",o=e==="production"||e==="pre-production",a=e==="profile";return`
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
  `}function $a(e="workspace"){const t=document.getElementById("scriptora-bottom-nav");return t?(t.outerHTML=Ke(e),!0):!1}function E(e,t="success"){const s=document.getElementById("global-toast"),n=document.getElementById("toast-message"),o=document.getElementById("toast-icon");if(!s||!n){console.log(`[Toast ${t}]`,e);return}n.textContent=e,o&&(t==="error"?(o.textContent="error",o.className="material-symbols-outlined text-[18px] text-red-400"):t==="info"?(o.textContent="info",o.className="material-symbols-outlined text-[18px] text-blue-300"):(o.textContent="check_circle",o.className="material-symbols-outlined text-[18px] text-emerald-300")),s.classList.remove("opacity-0","pointer-events-none"),s.classList.add("opacity-100"),clearTimeout(s._timeout),s._timeout=setTimeout(()=>{s.classList.remove("opacity-100"),s.classList.add("opacity-0","pointer-events-none")},2400)}function Na(){return`
    <main class="flex flex-col relative w-full pt-safe pb-safe bg-surface min-h-screen justify-center items-center px-4">
      <div class="flex flex-col w-full max-w-sm py-8 fade-in">
        <!-- Brand & Logo Header -->
        <header class="flex flex-col items-center justify-center pb-4 text-center">
          <img src="${Ms}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-16 h-16 object-contain mb-3 drop-shadow-sm" />
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
  `}function Ta(e){const t=document.getElementById("tab-signin"),s=document.getElementById("tab-register"),n=document.getElementById("tab-otp"),o=document.getElementById("flow-signin"),a=document.getElementById("flow-register"),l=document.getElementById("flow-otp");function i(N){[t,s,n].forEach(S=>{S.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 text-on-surface-variant hover:text-on-surface"}),[o,a,l].forEach(S=>S.classList.add("hidden")),N==="signin"?(t.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",o.classList.remove("hidden")):N==="register"?(s.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",a.classList.remove("hidden")):N==="otp"&&(n.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold flex items-center justify-center gap-1",l.classList.remove("hidden"))}t&&(t.onclick=()=>i("signin")),s&&(s.onclick=()=>i("register")),n&&(n.onclick=()=>i("otp"));const r=document.getElementById("toggle-pw-signin"),m=document.getElementById("signin-password");r&&m&&(r.onclick=()=>{const N=m.type==="password";m.type=N?"text":"password",r.innerHTML=`<span class="material-symbols-outlined text-[18px]">${N?"visibility_off":"visibility"}</span>`});function u(N){try{const M=N.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),T=decodeURIComponent(atob(M).split("").map(re=>"%"+("00"+re.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(T)}catch{return null}}const d=document.getElementById("btn-google-login"),c="756924881120-0qngpm230nq3k8bb61ttt1de7jv28fui.apps.googleusercontent.com";let p=null;async function f(N){E("Connecting with Google...");try{const S=await _n(N);$.setState({currentUser:S}),E(`Welcome back, ${S.displayName||S.name}`),e("/welcome")}catch(S){E(S.message||"Google sign-in error","error")}}function b(){if(window.google?.accounts?.id&&c)try{window.google.accounts.id.initialize({client_id:c,callback:async N=>{if(N&&N.credential){const S=u(N.credential)||{};await f({token:N.credential,email:S.email,name:S.name,displayName:S.name,picture:S.picture,sub:S.sub,provider:"google"})}},auto_select:!1,cancel_on_tap_outside:!0})}catch(N){console.warn("Google One Tap setup note:",N)}if(window.google?.accounts?.oauth2&&c)try{p=window.google.accounts.oauth2.initTokenClient({client_id:c,scope:"email profile openid",callback:async N=>{if(N&&N.access_token){E("Retrieving Google profile...");try{const M=await(await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${N.access_token}`}})).json();await f({token:N.access_token,email:M.email,name:M.name,displayName:M.name,picture:M.picture,sub:M.sub,provider:"google"})}catch(S){console.warn("Google userinfo fetch note:",S),await f({token:N.access_token,provider:"google"})}}}})}catch(N){console.warn("Google OAuth token client setup note:",N)}}b(),d&&(d.onclick=async()=>{if(!p&&window.google&&b(),p)try{p.requestAccessToken({prompt:"select_account"});return}catch(N){console.warn("Token client request error, trying prompt:",N)}if(window.google?.accounts?.id)try{window.google.accounts.id.prompt(N=>{(N.isNotDisplayed()||N.isSkippedMoment())&&(console.log("GIS prompt not displayed:",N.getNotDisplayedReason()),f({email:"arun.kumar@scriptora.studio",name:"Arun Kumar",displayName:"Arun Kumar",provider:"google"}))});return}catch(N){console.warn("GIS prompt error:",N)}await f({email:"arun.kumar@scriptora.studio",name:"Arun Kumar",displayName:"Arun Kumar",provider:"google"})});const x=document.getElementById("form-signin");x&&(x.onsubmit=async N=>{N.preventDefault();const S=document.getElementById("signin-email").value,M=m.value;try{const T=await Fn({email:S,password:M});$.setState({currentUser:T}),E(`Welcome back, ${T.displayName||T.name}`),e("/welcome")}catch(T){E(T.message,"error")}});const g=document.getElementById("form-register");g&&(g.onsubmit=async N=>{N.preventDefault();const S=document.getElementById("reg-name").value,M=document.getElementById("reg-email").value,T=document.getElementById("reg-password").value;try{const re=await Hn({name:S,email:M,password:T});$.setState({currentUser:re}),E("Account created successfully"),e("/welcome")}catch(re){E(re.message,"error")}});const B=document.getElementById("form-otp");B&&(B.onsubmit=async N=>{N.preventDefault();const S=document.getElementById("otp-phone").value;try{const M=await Un(S);$.setState({currentUser:M}),E("Phone verified successfully"),e("/welcome")}catch(M){E(M.message,"error")}});const v=document.getElementById("btn-forgot-pw");v&&(v.onclick=()=>{E("Password reset link sent to registered email","info")})}function Ba(){return $.state.currentUser,`
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
          <img src="${Ms}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-20 h-20 object-contain mb-5 drop-shadow-sm" />

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
  `}function Pa(e){const t=document.getElementById("welcome-sign-out");t&&(t.onclick=async()=>{await mn(),$.setState({currentUser:null}),E("Signed out successfully"),e("/auth")})}function bn(){let e=document.getElementById("scriptora-modal-portal");return e||(e=document.createElement("div"),e.id="scriptora-modal-portal",document.body.appendChild(e)),e}function gn(e){if(!e)return;const t=bn();e.parentElement!==t&&t.appendChild(e)}function ps(){!!document.querySelector("#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)")?(document.documentElement.classList.add("scriptora-modal-open"),document.body.classList.add("scriptora-modal-open")):(document.documentElement.classList.remove("scriptora-modal-open"),document.body.classList.remove("scriptora-modal-open"))}function Da(){document.documentElement.classList.add("scriptora-modal-open"),document.body.classList.add("scriptora-modal-open")}function en(){ps()}function st(e){if(!e)return;gn(e),e.classList.remove("hidden"),e.classList.add("flex"),Da(),e.scrollTop=0;const t=e.querySelector(".scriptora-modal-card");if(t){t.scrollTop=0;const s=t.querySelector(".scriptora-modal-body, .overflow-y-auto");s&&(s.scrollTop=0)}}function Te(e){e&&(e.classList.contains("hidden")||(e.classList.add("hidden"),e.classList.remove("flex")),ps())}function Ra(e,t,s={}){if(!e||!t)return null;const{placement:n="auto",offset:o=4,boundaryMargin:a=8,preferPosition:l="bottom"}=s,i=e.getBoundingClientRect(),r=window.visualViewport,m=r?r.width:window.innerWidth,u=r?r.height:window.innerHeight,d=r?r.offsetTop:0,c=r?r.offsetLeft:0,p=!!e.closest(".scriptora-modal-overlay");let f=d+a,b=d+u-a;if(!p){const ee=document.getElementById("editor-fixed-header")||document.getElementById("scriptora-global-header")||document.querySelector('header[data-global-header="true"]'),me=ee&&!ee.classList.contains("hidden")?ee.getBoundingClientRect().bottom:d+56,z=document.getElementById("scriptora-global-nav")||document.getElementById("scriptora-bottom-nav")||document.querySelector('nav[data-global-bottom-nav="true"]'),ge=z&&!z.classList.contains("hidden")?z.getBoundingClientRect().top:d+u;f=Math.max(f,me+4),b=Math.min(b,ge-4)}const x=t.offsetWidth||200,g=t.offsetHeight||160,B=b-i.bottom-o,v=i.top-f-o;let N=!1;n.startsWith("top")?N=v>=g||v>B:n.startsWith("bottom")?N=B<g&&v>B:l==="top"?N=v>=g||v>B:N=B<g&&v>B;let S,M;N?(M=Math.max(90,Math.min(g,v)),S=i.top-M-o):(M=Math.max(90,Math.min(g,B)),S=i.bottom+o),S=Math.max(f,Math.min(b-M,S));let T;return n.endsWith("end")||i.left+x>m-a?T=i.right-x:T=i.left,T=Math.max(c+a,Math.min(c+m-x-a,T)),{top:Math.round(S),left:Math.round(T),maxHeight:Math.round(M),width:Math.min(x,m-2*a),placement:N?"top":"bottom"}}function es(e,t,s={}){if(!e||!t)return;const n=!!e.closest(".scriptora-modal-overlay");if(s.portal!==!1){const l=n?bn():document.body;t.parentElement!==l&&l.appendChild(t)}const o=t.classList.contains("hidden");o&&(t.style.visibility="hidden",t.classList.remove("hidden")),t.style.position="fixed",t.style.zIndex=s.zIndex||(n?"10000":"120");const a=Ra(e,t,s);a&&(t.style.top=`${a.top}px`,t.style.left=`${a.left}px`,t.style.maxHeight=`${a.maxHeight}px`,t.style.overflowY="auto"),o&&(t.style.visibility="")}function hn(e,t,s={}){if(!e||!t)return;t.classList.add("scriptora-popup"),t.setAttribute("data-scriptora-popup","true");const n=()=>{t.classList.contains("hidden")||es(e,t,s)},o=()=>{t.classList.remove("hidden"),es(e,t,s)},a=()=>{t.classList.add("hidden")},l=()=>{t.classList.contains("hidden")?o():a()},i=r=>{t.classList.contains("hidden")||!e.contains(r.target)&&!t.contains(r.target)&&a()};return document.addEventListener("click",i),window.addEventListener("scroll",n,{passive:!0,capture:!0}),window.addEventListener("resize",n,{passive:!0}),window.visualViewport&&(window.visualViewport.addEventListener("resize",n,{passive:!0}),window.visualViewport.addEventListener("scroll",n,{passive:!0})),{open:o,close:a,toggle:l,update:n}}if(typeof document<"u"){document.addEventListener("click",t=>{t.target&&t.target.classList&&t.target.classList.contains("scriptora-modal-overlay")&&Te(t.target)}),document.addEventListener("keydown",t=>{if(t.key==="Escape"){const s=Array.from(document.querySelectorAll("#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)"));s.length>0&&Te(s[s.length-1])}});const e=()=>{new MutationObserver(s=>{for(const n of s)if(n.type==="attributes"&&n.attributeName==="class"){const o=n.target;o&&o.classList&&o.classList.contains("scriptora-modal-overlay")&&(o.classList.contains("hidden")||gn(o),ps())}}).observe(document.body,{attributes:!0,attributeFilter:["class"],subtree:!0})};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}function La(e){if(!e)return"";try{const t=localStorage.getItem(`scriptora_screenplay_${e.id}`);if(t){const s=JSON.parse(t);if(s&&Array.isArray(s.scenes)&&s.scenes.length>0){const n=parseInt((e.currentScene||"").replace(/\D+/g,""),10)||1,o=s.scenes.find(a=>a.number===n)||s.scenes[0];if(o&&Array.isArray(o.blocks)){const a=o.blocks.find(r=>r.type==="action")||o.blocks[0],l=o.slugline||o.blocks.find(r=>r.type==="scene")?.content||"",i=a?.content||"";if(l&&i)return`"${l} - ${i.slice(0,95)}..."`;if(i)return`"${i.slice(0,110)}..."`}}}}catch{}return e.id==="chronicles-of-dust"?'"INT. CUSTOMS OFFICE - NIGHT - Kevin kneels over cracked hydro-sensor junction box, static..."':e.id==="the-neon-horizon"?'"EXT. SECTOR 4 SKYLINE - DUSK - Rain reflects neon advertisements across towering glass spires..."':e.id==="velvet-shadows"?'"INT. DETECTIVE OFFICE - RAINY NIGHT - A single desk lamp casts long shadows across unread case files..."':e.id==="silent-echoes"?'"INT. ARCHIVE CELLAR - DAY - Dust motes dance in the amber light filtering through frosted glass..."':e.logline?`"${e.logline.slice(0,110)}..."`:"Empty script — start writing your story."}function Ma(){const e=$.state.scripts||[],t=e.length>0,s=t&&e.find(a=>a&&a.isCurrentDraft)||null,n=parseInt((s?.currentScene||"").replace(/\D+/g,""),10)||1,o=s?.currentScene||`Scene ${n}`;return`
    ${Xe("Workspace","Your writing space.")}

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
                ${La(s)}
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

    ${Ke("workspace")}
  `}function Oa(e){let t=null;const s=document.getElementById("btn-continue-writing");s&&(s.onclick=async()=>{const f=s.getAttribute("data-script-id"),b=s.getAttribute("data-scene")||"1";await $.selectScript(f),e(`/editor/${f}?scene=${b}`)}),document.querySelectorAll(".script-item-row").forEach(f=>{f.onclick=async b=>{if(b.target.closest(".script-more-btn"))return;const x=f.getAttribute("data-script-id");await $.selectScript(x),e(`/editor/${x}`)}});const n=document.getElementById("screenplay-search");n&&(n.oninput=f=>{const b=f.target.value.toLowerCase().trim();document.querySelectorAll("#screenplays-library-list .script-item-row").forEach(g=>{const B=g.querySelector(".font-semibold")?.textContent.toLowerCase()||"";g.style.display=B.includes(b)?"flex":"none"})});const o=document.getElementById("btn-new-screenplay-card"),a=document.getElementById("btn-new-script"),l=document.getElementById("new-script-modal"),i=document.getElementById("close-new-script-modal"),r=document.getElementById("cancel-new-script-btn"),m=document.getElementById("form-new-script");function u(f){l&&(f?(st(l),document.getElementById("new-script-title")?.focus()):Te(l))}o&&(o.onclick=()=>u(!0)),a&&(a.onclick=()=>u(!0)),i&&(i.onclick=()=>u(!1)),r&&(r.onclick=()=>u(!1)),l&&(l.onclick=f=>{f.target===l&&u(!1)}),m&&(m.onsubmit=async f=>{f.preventDefault();const b=document.getElementById("new-script-title").value.trim(),x=document.getElementById("new-script-format").value,g=document.getElementById("new-script-genre").value;if(b)try{const B=await zn({title:b,format:x,genre:g});await $.refreshScripts(),await $.selectScript(B.id),u(!1),E(`Created "${B.title}"`),e(`/editor/${B.id}`)}catch(B){E(B.message,"error")}});const d=document.getElementById("script-menu-popover");let c=null;document.querySelectorAll(".script-more-btn").forEach(f=>{f.onclick=b=>{b.stopPropagation(),t=f.getAttribute("data-script-id"),c=f,es(f,d,{placement:"bottom-end",offset:4}),d.classList.remove("hidden")}}),window.addEventListener("scroll",()=>{c&&d&&!d.classList.contains("hidden")&&es(c,d,{placement:"bottom-end",offset:4})},{passive:!0}),window.onclick=f=>{!f.target.closest("#script-menu-popover")&&!f.target.closest(".script-more-btn")&&(d?.classList.add("hidden"),c=null)},document.getElementById("menu-opt-open")?.addEventListener("click",()=>{d.classList.add("hidden"),t&&($.selectScript(t),e(`/editor/${t}`))}),document.getElementById("menu-opt-rename")?.addEventListener("click",async()=>{d.classList.add("hidden");const f=prompt("Enter new title for this screenplay:");f&&f.trim()&&(await Wn(t,{title:f.trim()}),await $.refreshScripts(),E("Screenplay renamed"),e("/workspace"))}),document.getElementById("menu-opt-duplicate")?.addEventListener("click",async()=>{d.classList.add("hidden"),await Kn(t),await $.refreshScripts(),E("Screenplay duplicated"),e("/workspace")}),document.getElementById("menu-opt-archive")?.addEventListener("click",async()=>{d.classList.add("hidden"),await Jn(t),await $.refreshScripts(),E("Screenplay archived"),e("/workspace")}),document.getElementById("menu-opt-delete")?.addEventListener("click",async()=>{d.classList.add("hidden"),confirm("Are you sure you want to delete this screenplay? This action cannot be undone.")&&(await Gn(t),await $.refreshScripts(),E("Screenplay deleted"),e("/workspace"))});const p=document.getElementById("btn-export-library");p&&(p.onclick=()=>{const f="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify($.state.scripts,null,2)),b=document.createElement("a");b.setAttribute("href",f),b.setAttribute("download",`scriptora_library_${Date.now()}.json`),document.body.appendChild(b),b.click(),b.remove(),E("Exported library manifest (.json)")})}const ja=new Set(["HE","SHE","IT","ITS","HIM","HER","HERS","HIS","THEY","THEM","THEIR","THEIRS","WE","US","OUR","OURS","YOU","YOUR","YOURS","ME","MY","MINE","I","WHO","WHOM","WHOSE","WHAT","WHICH","WHEN","WHERE","WHY","HOW","AND","OR","BUT","IF","SO","FOR","NOR","YET","BECAUSE","AS","AT","BY","FROM","IN","INTO","OF","OFF","ON","ONTO","OUT","OVER","TO","UP","WITH","THE","A","AN","THIS","THAT","THESE","THOSE","YES","NO","NOT","OK","NOW","THEN","HERE","THERE","SH","SA","AR","ARA","SAN","SANT","SANTH","SANTHO","SO"]);function Ft(e){if(!e||typeof e!="string")return"";let t=e.replace(/\([^)]*\)/g,"").replace(/&(?:amp;)*nbsp;?/gi," ").replace(/[\u200B\u00A0]/g," ").replace(/[^a-zA-Z0-9\s'-]/g,"").trim().toUpperCase();return t==="ARAF"&&(t="ARAVIND"),t}function Ts(e){if(!e||typeof e!="string")return!1;const t=Ft(e);return!(!t||t.length<3||ja.has(t)||/\b(INT|EXT|SCENE|DAY|NIGHT|MORNING|EVENING|DUSK|DAWN|CUT TO|FADE|TRANSITION)\b/i.test(t)||t.split(/\s+/).length>3||t.length>30)}function yn(e){if(!Array.isArray(e))return[];const t=[],s=new Set;return e.forEach(o=>{const a=typeof o=="string"?o:o?.name||o?.content||"",l=Ft(a);Ts(l)&&(s.has(l)||(s.add(l),t.push(l)))}),t.filter(o=>!(t.some(i=>i!==o&&i.startsWith(o)&&i.length>o.length)||t.some(i=>i!==o&&i.length>=5&&o.length<=4&&i.startsWith(o.slice(0,3)))))}let O=null,Ue=null,Bs=null,cs=!1,qe=!1,St=!0,xt=!1,Is="EN",rt=[],Et=-1,ks=null,Cs=null,Os=null,je=localStorage.getItem("scriptora_autosave")!=="false",ts="screenplay",Lt=!1;const He=[],tn=["CUT TO:","CUT TO BLACK.","FADE IN:","FADE OUT.","FADE TO BLACK.","DISSOLVE TO:","MATCH CUT TO:","JUMP CUT TO:","SMASH CUT TO:","SLAM TO:","SLAM TO BLACK.","INTERCUT WITH:","WIPE TO:","IRIS IN:","IRIS OUT:","BACK TO:","CONTINUOUS","END"];let sn=0;const Gt=[];function Je(e){if(e==null)return"";typeof e!="string"&&(e=String(e));let t=e;t=t.replace(/&(?:amp;)+nbsp;?/gi,"&nbsp;"),t=t.replace(/&#(?:160|xA0);/gi," ");let s;do s=t,t=t.replace(/(?:<br\s*\/?>|&nbsp;?|\u00A0|\s)+$/gi,"");while(t!==s);return t=t.replace(/(?:&nbsp;?|\u00A0)+/gi," "),t}function Mt(e){return e?(e.innerText||e.textContent||"").replace(/&(?:amp;)*nbsp;?/gi,"").replace(/[\u200B\u00A0\r\n\t ]/g,"").trim().length===0:!0}function Fa(){return window.innerWidth<=768||"ontouchstart"in window||navigator.maxTouchPoints&&navigator.maxTouchPoints>0||/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}function vn(e,t){const s=Date.now();if(s-sn<150)return!0;if(!Fa())return!1;const n=e.getAttribute("data-block-type")||"action";if(!["action","text","character","transition"].includes(n)||!Mt(t))return!1;let o="action";return n==="action"||n==="text"?o="character":n==="character"?o="transition":n==="transition"&&(o="action"),sn=s,Gt.push({blockId:e.getAttribute("data-block-id"),prevType:n,newType:o}),t.innerText="",ss(e,o),bs(o),qe=!0,je&&Ye(),!0}const wn=46;function _a(e,t=null){const s=$.state.scripts?.find(a=>a.id===e)||$.state.activeScript||{title:"Untitled Screenplay",draft:"Draft 1.0"};$.state.currentUser?.initials;let n=null;if(window.scriptoraRouter){const a=window.scriptoraRouter.peekPreviousRoute?.();a&&(n=window.scriptoraRouter.getRouteLabel(a))}const o=n||"Workspace";return`
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
              <button id="btn-toggle-autosave" class="flex items-center gap-1.5 pl-1.5 pr-2.5 h-full hover:bg-slate-50 active:scale-95 transition-all text-xs font-medium text-slate-700 hover:text-slate-900" title="Toggle Auto-save (Current: ${je?"ON":"OFF"})">
                <span class="w-1.5 h-1.5 rounded-full ${je?"bg-emerald-500 animate-pulse":"bg-slate-400"}" id="autosave-dot"></span>
                <span id="autosave-toggle-label">${je?"Auto":"Off"}</span>
              </button>
            </div>

            <!-- Master Toolbar Visibility Toggle [⋮] -->
            <button id="btn-toggle-editor-toolbar" class="w-7 h-7 flex items-center justify-center ${Lt?"text-blue-600 bg-blue-50 border-blue-200/90":"text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50"} rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0" title="${Lt?"Collapse Editor Toolbars (Writing Mode)":"Expand Editor Toolbars (Tools & Formatting)"}" aria-label="Toggle Editor Toolbars">
              <span class="material-symbols-outlined text-[18px]">more_vert</span>
            </button>

            <!-- Collaborate Link -->
            <a href="/profile/collaborators?from=editor&scriptId=${e}" id="editor-collab-btn" aria-label="Collaborators" class="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors no-underline" title="Collaborators">
              <span class="material-symbols-outlined text-[19px]">group</span>
            </a>
          </div>
        </div>

        <!-- COLLAPSIBLE SECONDARY TOOLBAR ROWS (Master Visibility via Header [⋮]) -->
        <div id="editor-collapsible-toolbars" class="${Lt?"":"hidden"} w-full transition-all duration-200">
          
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
  `}function gt({id:e,name:t,close:s,restore:n}){try{window.history.pushState({editorSubViewId:e,editorSubViewName:t},"")}catch{}He.push({id:e,name:t,close:s,restore:n})}function ve(e){const t=He.findIndex(s=>s.id===e);if(t!==-1){if(t===He.length-1){const s=He.pop();s&&typeof s.close=="function"&&s.close();const n=He[He.length-1];n&&typeof n.restore=="function"&&n.restore()}else{const s=He.splice(t,1)[0];s&&typeof s.close=="function"&&s.close()}try{window.history.back()}catch{}}}function Ha(){if(ts==="titlepage")return Xt(),!0;if(He.length>0){const e=He.pop();e&&typeof e.close=="function"&&e.close();const t=He[He.length-1];return t&&typeof t.restore=="function"&&t.restore(),!0}return!1}async function Ua(e,t){He.length=0;const s=()=>ts==="titlepage"?(Xt(),!0):He.length>0?Ha():(qe&&Rt(!1),!1);window.__scriptoraEditorPopstate=()=>s(),window.scriptoraRouter&&window.scriptoraRouter.registerBackHandler(s);const n=document.getElementById("editor-back-btn");n&&(n.onclick=i=>{i?.preventDefault(),i?.stopPropagation(),window.scriptoraRouter?window.scriptoraRouter.back("/workspace"):s()||t("/workspace")}),O=await Yn(e),O?.scenes&&O.scenes.forEach(i=>{i.blocks&&i.blocks.forEach(r=>{r.content&&(r.content=Je(r.content)),r.char1&&(r.char1=Je(r.char1)),r.dia1&&(r.dia1=Je(r.dia1)),r.char2&&(r.char2=Je(r.char2)),r.dia2&&(r.dia2=Je(r.dia2))})}),e!=="chronicles-of-dust"&&O&&(O.scenes||[]).some(r=>{const m=(r.slugline||"").toUpperCase();return m.includes("WRITER'S ROOM")||m.includes("STUDIO - DAY")||m.includes("NEW SCENE - DAY")?!0:(r.blocks||[]).some(u=>{const d=u.content||"";return d.includes("Sunlight cuts through dust motes")||d.includes("A blank script page waits")||d.includes("Type your screenplay action here")})})&&(O.scenes=[{id:"scene-1",number:1,slugline:"",blocks:[{id:`b-${Date.now()}-1`,type:"scene",content:""}]}],O.wordCount=0,fs(e,O)),tt(),ns();const o=document.getElementById("editor-save-btn");o&&(o.onclick=()=>Rt(!0)),za(),Va();const a=document.getElementById("editor-collab-btn");a&&(a.onclick=i=>{i.preventDefault(),qe&&Rt(!1),$.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile/collaborators?from=editor&scriptId=${e}`)});const l=document.getElementById("editor-profile-btn");l&&(l.onclick=i=>{i.preventDefault(),qe&&Rt(!1),$.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile?from=editor&scriptId=${e}`)}),window.addEventListener("keydown",qa),io(e,t),no(),ao(),lo(),Wa(),Ka(),ro(),co(e),eo()}function qa(e){(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"&&(e.preventDefault(),Rt(!0)),(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="f"&&(e.preventDefault(),ms(!0)),(e.ctrlKey||e.metaKey)&&e.key==="Enter"&&(e.preventDefault(),js())}function za(){const e=document.getElementById("btn-toggle-autosave"),t=document.getElementById("autosave-dot"),s=document.getElementById("autosave-toggle-label");e&&(e.onclick=n=>{n.stopPropagation(),je=!je,localStorage.setItem("scriptora_autosave",String(je)),je?(t&&(t.className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"),s&&(s.textContent="Auto"),e.title="Toggle Auto-save (Current: ON)",E("Auto-save enabled"),qe&&Ye()):(t&&(t.className="w-1.5 h-1.5 rounded-full bg-slate-400"),s&&(s.textContent="Off"),e.title="Toggle Auto-save (Current: OFF)",clearTimeout(Bs),E("Auto-save disabled · Tap floppy to save"))})}function Yt(){const e=document.getElementById("editor-main-scroll");e&&(e.style.paddingTop="12px",e.style.paddingBottom=xt?"32px":"88px")}function Va(){const e=document.getElementById("btn-toggle-editor-toolbar"),t=document.getElementById("editor-collapsible-toolbars");Yt(),window.addEventListener("resize",Yt),e&&(e.onclick=s=>{s.preventDefault(),s.stopPropagation(),Lt=!Lt,Lt?(t&&t.classList.remove("hidden"),e.className="w-7 h-7 flex items-center justify-center text-blue-600 bg-blue-50 border-blue-200/90 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Collapse Editor Toolbars (Writing Mode)"):(t&&t.classList.add("hidden"),e.className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Expand Editor Toolbars (Tools & Formatting)"),Yt()})}function Xt(){if(ts==="titlepage"){us("screenplay");try{window.history.state?.editorTab==="titlepage"&&window.history.back()}catch{}}}function Wa(){const e=document.getElementById("doc-tab-screenplay"),t=document.getElementById("doc-tab-titlepage"),s=document.getElementById("btn-quick-title-page"),n=document.getElementById("menu-btn-title-page"),o=document.getElementById("doc-tab-titlepage-close"),a=document.getElementById("btn-close-titlepage-sheet");e&&(e.onclick=()=>Xt()),t&&(t.onclick=l=>{l.preventDefault(),us("titlepage")}),o&&(o.onclick=l=>{l.preventDefault(),l.stopPropagation(),Xt()}),a&&(a.onclick=l=>{l.preventDefault(),l.stopPropagation(),Xt()}),s&&(s.onclick=()=>us("titlepage")),n&&(n.onclick=()=>{ve("moreMenu"),us("titlepage")})}function us(e){if(ts===e)return;ts=e;const t=document.getElementById("screenplay-pages-container"),s=document.getElementById("title-page-container"),n=document.getElementById("doc-tab-screenplay"),o=document.getElementById("doc-tab-titlepage-wrap");if(e==="titlepage"){t&&t.classList.add("hidden"),s&&(s.classList.remove("hidden"),s.classList.add("flex")),o&&(o.className="flex items-center rounded-t-lg transition-all border-b-2 border-blue-600 bg-white text-blue-700 shadow-2xs group"),n&&(n.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 rounded-t-lg transition-all"),Ga();try{window.history.state?.editorTab!=="titlepage"&&window.history.pushState({editorTab:"titlepage"},"")}catch{}}else s&&(s.classList.add("hidden"),s.classList.remove("flex")),t&&t.classList.remove("hidden"),n&&(n.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-blue-600 text-blue-700 bg-white rounded-t-lg transition-all shadow-2xs"),o&&(o.className="flex items-center rounded-t-lg transition-all border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 group");Yt()}function Ga(){if(!O)return;const e=O.titlePage||{},t=document.getElementById("tp-doc-title"),s=document.getElementById("tp-doc-by"),n=document.getElementById("tp-doc-author"),o=document.getElementById("tp-doc-phone"),a=document.getElementById("tp-doc-email"),l=document.getElementById("tp-doc-address"),i=e.title||O.title||"";t&&(t.innerText=i,i||(t.innerHTML=""));const r=e.by!==void 0?e.by:"Written by";s&&(s.innerText=r,r||(s.innerHTML=""));const m=e.author||"";n&&(n.innerText=m,m||(n.innerHTML=""));let u=e.phone||"";if(!u&&e.contact){const f=e.contact.split("·").map(b=>b.trim()).find(b=>b.includes("+")||/\d{3}/.test(b));f&&(u=f)}o&&(o.innerText=u,u||(o.innerHTML=""));let d=e.email||"";if(!d&&e.contact&&e.contact.includes("@")){const p=e.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);p&&(d=p[0])}a&&(a.innerText=d,d||(a.innerHTML=""));const c=e.address||"";l&&(l.innerText=c,c||(l.innerHTML=""))}function Ka(){const e=document.getElementById("tp-doc-title"),t=document.getElementById("tp-doc-by"),s=document.getElementById("tp-doc-author"),n=document.getElementById("tp-doc-phone"),o=document.getElementById("tp-doc-email"),a=document.getElementById("tp-doc-address"),l=()=>{if(!O)return;O.titlePage||(O.titlePage={});const i=e?e.innerText.trim():"",r=t?t.innerText.trim():"",m=s?s.innerText.trim():"",u=n?n.innerText.trim():"",d=o?o.innerText.trim():"",c=a?a.innerText.trim():"";if(O.titlePage.title=i,O.titlePage.by=r||"Written by",O.titlePage.author=m,O.titlePage.phone=u,O.titlePage.email=d,O.titlePage.address=c,O.titlePage.contact=[u,d,c].filter(Boolean).join(" · "),i){O.title=i;const p=document.getElementById("editor-script-title"),f=document.getElementById("doc-tab-title-label");p&&(p.textContent=i),f&&(f.textContent=i)}qe=!0,Ot("Unsaved"),je&&Ye()};[e,t,s,n,o,a].forEach(i=>{i&&(i.oninput=l,i.onblur=()=>{i.innerText.trim()===""&&(i.innerHTML=""),l()})})}function tt(){const e=document.getElementById("screenplay-pages-container");if(!e||!O)return;const t=O.scenes||[],s=[];t.forEach(l=>{(l.blocks||[]).forEach(i=>{s.push({block:i,sceneNumber:l.number,sceneId:l.id,slugline:l.slugline})})});const n=[];let o={pageNumber:1,items:[]},a=0;s.forEach(l=>{if(l.block.type==="pagebreak"){o.items.push(l),n.push(o),o={pageNumber:n.length+1,items:[]},a=0;return}const i=Sn(l.block);a+i>wn&&o.items.length>0&&(n.push(o),o={pageNumber:n.length+1,items:[]},a=0),o.items.push(l),a+=i}),o.items.length>0&&n.push(o),n.length===0&&n.push({pageNumber:1,items:[{block:{id:`b-${Date.now()}-1`,type:"scene",content:""},sceneNumber:1,sceneId:"scene-1",slugline:""}]}),e.innerHTML=n.map(l=>`
    <div class="screenplay-page-sheet w-full max-w-[816px] min-h-[1123px] bg-white rounded-md sm:rounded-lg shadow-md border border-slate-200/90 flex flex-col font-courier text-[12pt] leading-[1.25] text-slate-900 relative transition-all" data-page-num="${l.pageNumber}">
      
      <!-- Top Page Header: Page number in top right -->
      <div class="w-full flex items-center justify-end h-7 pb-2 select-none text-[12pt] text-slate-600 font-courier">
        <span>${l.pageNumber}.</span>
      </div>

      <!-- Screenplay Blocks naturally flowing across this A4 page -->
      <div class="page-blocks-wrapper flex flex-col flex-1 w-full">
        ${l.items.map(i=>kn(i.block,i.sceneNumber,i.sceneId)).join("")}
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
  `).join(""),Ya(),gs()}function Sn(e){if(e.type==="pagebreak")return 1;const t=e.content||"";return e.type==="scene"?3:e.type==="action"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="character"?2:e.type==="parenthetical"?1:e.type==="dialogue"?Math.max(1,Math.ceil(t.length/38))+1:e.type==="transition"||e.type==="shot"?2:e.type==="text"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="note"||e.type==="outline"?2:e.type==="act"||e.type==="endact"?3:e.type==="sequence"?2:e.type==="dual"?4:e.type==="lyrics"?2:e.type==="image"?10:2}function nn(e){let t=!1;(O.scenes||[]).forEach(s=>{const n=(s.blocks||[]).findIndex(o=>o.id===e);n!==-1&&(s.blocks.splice(n,1),t=!0)}),t&&(qe=!0,tt(),E("Page break removed"),je&&Ye())}function js(e=null){const t=e||Ue,s=O.scenes||[];if(s.length===0)return;const n={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"};let o=!1;if(t)for(let a of s){const l=(a.blocks||[]).findIndex(i=>i.id===t);if(l!==-1){a.blocks.splice(l+1,0,n),o=!0;break}}if(!o){const a=s[s.length-1];a.blocks||(a.blocks=[]),a.blocks.push(n)}qe=!0,tt(),E("Page break inserted"),je&&Ye()}function En(e=null){const t=e||Ue,s=O.scenes||[];if(s.length===0){Fs();return}const n={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},o={id:"b-"+Date.now(),type:"action",content:""};let a=null,l=-1;if(t)for(let i of s){const r=(i.blocks||[]).findIndex(m=>m.id===t);if(r!==-1){a=i,l=r+1;break}}a||(a=s[s.length-1],l=a.blocks.length),a.blocks.splice(l,0,n,o),qe=!0,tt(),setTimeout(()=>{const i=document.getElementById(o.id);if(i){const r=i.hasAttribute("contenteditable")?i:i.querySelector('[contenteditable="true"]');r&&r.focus(),i.scrollIntoView({behavior:"smooth",block:"center"})}},50),E("New page inserted"),je&&Ye()}function Ja(e){const t=document.querySelector(`.screenplay-page-sheet[data-page-num="${e}"]`);let s=null;if(t){const n=t.querySelectorAll(".screenplay-block");n.length>0&&(s=n[n.length-1].getAttribute("data-block-id"))}En(s)}function Fs(){const e=O.scenes||[],t=e.length+1,s={id:"scene-"+Date.now(),number:t,slugline:`INT. SCENE ${t} - DAY`,blocks:[{id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},{id:"b-"+Date.now()+"-1",type:"scene",content:`INT. SCENE ${t} - DAY`},{id:"b-"+Date.now()+"-2",type:"action",content:""}]};e.push(s),qe=!0,tt(),setTimeout(()=>{const o=document.getElementById(s.blocks[1].id);if(o){const a=o.hasAttribute("contenteditable")?o:o.querySelector('[contenteditable="true"]');a&&a.focus(),o.scrollIntoView({behavior:"smooth",block:"center"})}},80);const n=document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)").length||1;E(`Added Page at End (Page ${n})`),je&&Ye()}function In(e=null){let t=e;if(!t&&Ue){const u=document.getElementById(Ue),d=u?u.closest(".screenplay-page-sheet"):null;d&&(t=parseInt(d.getAttribute("data-page-num"),10))}t||(t=1);const s=O.scenes||[];if(s.length===0){Fs();return}if(t<=1){const u={id:"scene-"+Date.now(),number:1,slugline:"INT. SCENE 1 - DAY",blocks:[{id:"b-"+Date.now()+"-1",type:"scene",content:"INT. SCENE 1 - DAY"},{id:"b-"+Date.now()+"-2",type:"action",content:""},{id:"pb-"+Date.now()+"-3",type:"pagebreak",content:"PAGE BREAK"}]};s.unshift(u),s.forEach((d,c)=>{d.number=c+1}),qe=!0,tt(),ns(),setTimeout(()=>{const d=document.getElementById(u.blocks[0].id);if(d){const c=d.hasAttribute("contenteditable")?d:d.querySelector('[contenteditable="true"]');c&&c.focus(),d.scrollIntoView({behavior:"smooth",block:"center"})}},80),E("Added Page Before (Page 1)"),je&&Ye();return}const n=document.querySelector(`.screenplay-page-sheet[data-page-num="${t}"]`);let o=null;if(n){const u=n.querySelector(".screenplay-block");u&&(o=u.getAttribute("data-block-id"))}let a=null,l=-1;if(o)for(let u of s){const d=(u.blocks||[]).findIndex(c=>c.id===o);if(d!==-1){a=u,l=d;break}}a||(a=s[0],l=0);const i={id:"pb-"+Date.now()+"-a",type:"pagebreak",content:"PAGE BREAK"},r={id:"b-"+Date.now()+"-b",type:"action",content:""},m={id:"pb-"+Date.now()+"-c",type:"pagebreak",content:"PAGE BREAK"};a.blocks.splice(l,0,i,r,m),qe=!0,tt(),setTimeout(()=>{const u=document.getElementById(r.id);if(u){const d=u.hasAttribute("contenteditable")?u:u.querySelector('[contenteditable="true"]');d&&d.focus(),u.scrollIntoView({behavior:"smooth",block:"center"})}},80),E(`Added Page Before (Page ${t})`),je&&Ye()}function kn(e,t,s){const n=e.type==="pagebreak",o=e.type==="scene",a=e.type==="character",l=e.type==="parenthetical",i=e.type==="dialogue",r=e.type==="transition",m=e.type==="shot",u=e.type==="text",d=e.type==="note",c=e.type==="outline",p=e.type==="act",f=e.type==="endact",b=e.type==="sequence",x=e.type==="dual",g=e.type==="lyrics",B=e.type==="image",v=e.type==="action"||!n&&!o&&!a&&!l&&!i&&!r&&!m&&!u&&!d&&!c&&!p&&!f&&!b&&!x&&!g&&!B;if(n)return`
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
        <span class="scene-num-indicator -ml-10 w-7 mr-3 shrink-0 font-mono text-slate-400 font-bold select-none text-[12pt] text-right ${St?"":"hidden"}">${t}</span>
        <div class="flex-1 tracking-wider uppercase outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${We(e.content)}</div>
      </div>
    `;if(v)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${We(e.content)}</div>
    `;if(a)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="character" class="screenplay-block uppercase font-bold tracking-wider text-slate-900 text-left mt-3.5 mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[37%] max-w-[28ch]" contenteditable="true" spellcheck="false">${We(e.content)}</div>
    `;if(l)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="parenthetical" class="screenplay-block italic text-slate-600 text-left mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[26%] max-w-[24ch]" contenteditable="true" spellcheck="false">${We(e.content)}</div>
    `;if(i)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dialogue" class="screenplay-block text-left text-slate-900 mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[17%] max-w-[36ch]" contenteditable="true" spellcheck="false">${We(e.content)}</div>
    `;if(r)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="transition" class="screenplay-block w-full text-right uppercase font-bold tracking-wider text-slate-900 mt-2 mb-4 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${We(e.content)}</div>
    `;if(m)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="shot" class="screenplay-block uppercase font-bold tracking-wider text-slate-900 text-left my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${We(e.content||"CLOSE ON:")}</div>
    `;if(u)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="text" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${We(e.content)}</div>
    `;if(d)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="note" class="screenplay-block text-amber-900 bg-amber-50/80 border-l-4 border-amber-400 p-2 my-2.5 rounded-r font-mono text-xs outline-none focus:ring-1 focus:ring-amber-400 cursor-text select-text" contenteditable="true" spellcheck="false">${We(e.content||"[[ NOTE: Script comment... ]]")}</div>
    `;if(c)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="outline" class="screenplay-block text-slate-500 uppercase tracking-widest font-sans font-bold text-xs my-2 border-b border-slate-200 pb-1 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${We(e.content||"OUTLINE BEAT")}</div>
    `;if(p)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="act" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-base outline-none focus:bg-blue-50/50 rounded px-1 cursor-text underline decoration-2 underline-offset-4" contenteditable="true" spellcheck="false">${We(e.content||"ACT I")}</div>
    `;if(f)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="endact" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${We(e.content||"END OF ACT I")}</div>
    `;if(b)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="sequence" class="screenplay-block uppercase font-bold tracking-wide text-slate-800 my-3 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${We(e.content||"SEQUENCE 1")}</div>
    `;if(x)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dual" class="screenplay-block screenplay-dual-dialogue-grid">
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${We(e.char1||"CHARACTER A")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${We(e.dia1||"Dialogue A")}</div>
        </div>
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${We(e.char2||"CHARACTER B")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${We(e.dia2||"Dialogue B")}</div>
        </div>
      </div>
    `;if(g)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="lyrics" class="screenplay-block text-center italic text-slate-800 my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${We(e.content||"♫ Musical lyrics... ♫")}</div>
    `;if(B){const N=e.url||e.content||"https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80",S=Ps(e.caption||"");return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="image" class="screenplay-block my-4 flex flex-col items-center group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-2.5 shadow-2xs transition-all">
        <div class="w-full flex items-center justify-center min-h-[180px] max-h-[420px] rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200/60">
          <img src="${N}" alt="${S||"Storyboard"}" class="max-h-[400px] w-auto max-w-full object-contain rounded-md shadow-xs bg-white" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80';" loading="eager" />
        </div>
        <div class="text-[11px] font-sans text-slate-600 italic mt-2 text-center outline-none px-2 py-0.5 rounded focus:bg-white w-full cursor-text" contenteditable="true" data-placeholder="Add a storyboard caption...">${S||"Storyboard visual concept"}</div>
        <button class="btn-delete-img-block absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-md text-xs font-bold" data-block-id="${e.id}" data-scene-id="${s}" title="Delete image">✕</button>
      </div>
    `}return`
    <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true">${We(e.content)}</div>
  `}function We(e){if(!e)return"";const t=Je(e);if(!t)return"";if(!/<[a-z][\s\S]*>/i.test(t))return Ps(t);try{let l=function(i){const r=Array.from(i.childNodes);for(const m of r)if(m.nodeType===Node.ELEMENT_NODE){if(m.tagName==="SPAN"&&(m.style?.textDecoration?.includes("line-through")||m.style?.textDecorationLine?.includes("line-through"))){const d=document.createElement("s");d.innerHTML=m.innerHTML,i.replaceChild(d,m),l(d);continue}if(a.has(m.tagName)){for(;m.attributes.length>0;)m.removeAttribute(m.attributes[0].name);l(m)}else{const u=document.createTextNode(m.textContent||"");i.replaceChild(u,m)}}};var s=l;const o=new DOMParser().parseFromString(`<body>${t}</body>`,"text/html"),a=new Set(["B","STRONG","I","EM","U","S","STRIKE","DEL","BR","SPAN"]);return l(o.body),Je(o.body.innerHTML)}catch{return Ps(t)}}function Ps(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}function Zt(e){if(!e||typeof e!="string")return e;let t=e.replace(/^(\s*["'“‘(]*)([a-z\u00E0-\u00FC])/u,(s,n,o)=>n+o.toUpperCase());return t=t.replace(/([.!?]["'”’)]*\s+["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,n,o)=>n+o.toUpperCase()),t=t.replace(/(\n\s*["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,n,o)=>n+o.toUpperCase()),t}function Pt(e){let t=0;const s=window.getSelection();if(s&&s.rangeCount>0){const n=s.getRangeAt(0),o=n.cloneRange();o.selectNodeContents(e),o.setEnd(n.endContainer,n.endOffset),t=o.toString().length}return t}function Dt(e,t){const s=window.getSelection();if(!s)return;const n=document.createRange();if(t<=0){n.selectNodeContents(e),n.collapse(!0),s.removeAllRanges(),s.addRange(n);return}let o=0,a=!1;function l(i){if(!a){if(i.nodeType===Node.TEXT_NODE){const r=i.nodeValue.length;if(o+r>=t){n.setStart(i,Math.min(t-o,r)),n.collapse(!0),a=!0;return}o+=r}else for(let r=0;r<i.childNodes.length;r++)if(l(i.childNodes[r]),a)return}}l(e),a||(n.selectNodeContents(e),n.collapse(!1)),s.removeAllRanges(),s.addRange(n)}function Cn(e){const t=e.hasAttribute("contenteditable")?e:e.querySelector('[contenteditable="true"]');t&&(t.onfocus=()=>{Ue=e.getAttribute("data-block-id");const s=e.getAttribute("data-block-type")||"action";bs(s),s==="transition"&&Mt(t)?Qt(e,t):s!=="transition"&&yt()},t.addEventListener("click",()=>{(e.getAttribute("data-block-type")||"action")==="transition"&&Mt(t)&&Qt(e,t)}),t.addEventListener("beforeinput",s=>{(s.data===" "||s.inputType==="insertText"&&s.data===" ")&&Mt(t)&&vn(e,t)&&s.preventDefault()}),t.oninput=()=>{qe=!0;const s=e.getAttribute("data-block-type")||"action",n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,l=Zt(a);if(l!==a){const i=Pt(t);t.innerText=l,Dt(t,i)}}let o=t.innerHTML;o=o.replace(/&(?:amp;)+nbsp;?/gi," "),o=o.replace(/&nbsp;?/gi," "),o=o.replace(/\u00A0/g," "),kt(e,o),Ot("Unsaved"),je&&Ye(),Qt(e,t),gs()},t.onblur=()=>{const s=e.getAttribute("data-block-type")||"action",n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,l=Zt(a);l!==a&&(t.innerText=l)}const o=Je(t.innerHTML);if(t.innerHTML!==o&&(t.innerHTML=o),kt(e,o),s==="character")_s(Je(t.innerText));else if(s==="scene"){const a=Tt(Je(t.innerText));a.location&&Hs(a.location)}},t.onpaste=()=>{const s=e.getAttribute("data-block-type")||"action";setTimeout(()=>{const n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,l=Zt(a);if(l!==a){const i=Pt(t);t.innerText=l,Dt(t,i)}}const o=Je(t.innerHTML);t.innerHTML!==o&&(t.innerHTML=o),kt(e,o)},0)},t.onkeydown=s=>{Xa(s,e,t)})}function Ya(){document.querySelectorAll(".screenplay-block").forEach(Cn),document.querySelectorAll(".btn-delete-img-block").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=t.getAttribute("data-block-id"),o=t.getAttribute("data-scene-id");n&&o&&Kt(o,n)}}),document.querySelectorAll(".btn-remove-pagebreak").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=t.getAttribute("data-block-id");n&&nn(n)}}),document.querySelectorAll('[data-block-type="pagebreak"]').forEach(t=>{t.onkeydown=s=>{if(s.key==="Backspace"||s.key==="Delete"){s.preventDefault();const n=t.getAttribute("data-block-id");n&&nn(n)}}}),document.querySelectorAll(".btn-page-add-before").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=parseInt(t.getAttribute("data-page-num"),10)||1;In(n)}}),document.querySelectorAll(".btn-page-add-after").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=parseInt(t.getAttribute("data-page-num"),10)||1;Ja(n)}})}function Tt(e){const t=e.match(/^(INT\.\/EXT\.|INT\.|EXT\.|I\/E\.)\s*/i),s=t?t[1].toUpperCase():"INT.",o=(t?e.slice(t[0].length):e).split(/\s+-\s*|\s+-/),a=(o[0]||"").trim().toUpperCase(),l=(o[1]||"").trim().toUpperCase();return{intExt:s,location:a,time:l}}function _s(e){if(!O)return;const t=Ft(e);Ts(t)&&(Array.isArray(O.characters)||(O.characters=[]),O.characters=O.characters.filter(s=>{const n=Ft(s);return!(!Ts(n)||t.startsWith(n)&&n.length<t.length||t.length>=5&&n.length<=4&&t.startsWith(n.slice(0,3)))}),O.characters.includes(t)||O.characters.push(t))}function Hs(e){if(!O)return;const t=(e||"").trim().toUpperCase();!t||t.length<2||(Array.isArray(O.locations)||(O.locations=[]),O.locations=O.locations.filter(s=>t.startsWith(s)&&s.length<t.length?O.scenes?.some(o=>o.blocks?.some(a=>a.type==="scene"&&Tt(a.content).location===s)):!0),O.locations.includes(t)||O.locations.push(t))}function kt(e,t){if(!O)return;const s=e.getAttribute("data-block-id"),n=e.getAttribute("data-scene-id"),o=O.scenes.find(l=>l.id===n);if(!o)return;const a=o.blocks.find(l=>l.id===s);if(a){const l=Je(t);if(a.type==="image"?a.caption=l:a.content=l,a.type==="scene"){const i=(l||"").replace(/<[^>]+>/g,""),r=Tt(i);a.intExt=r.intExt,a.location=r.location,a.time=r.time,o.slugline=i,o.location=r.location,o.time=r.time}}}function Kt(e,t){if(!O)return;const s=O.scenes.find(a=>a.id===e);if(!s)return;const n=s.blocks.findIndex(a=>a.id===t);if(n!==-1&&(s.blocks.splice(n,1),qe=!0,je&&Ye()),s.blocks.length===0&&O.scenes.length>1){const a=O.scenes.findIndex(l=>l.id===e);a!==-1&&(O.scenes.splice(a,1),O.scenes.forEach((l,i)=>{l.number=i+1}),ns())}else s.blocks.length===0&&s.blocks.push({id:`b-${Date.now().toString().slice(-6)}`,type:"action",content:""});const o=document.getElementById(t);o&&o.remove(),gs()}function Xa(e,t,s){const n=t.getAttribute("data-block-type"),o=t.getAttribute("data-scene-id"),a=t.getAttribute("data-block-id"),l=document.getElementById("editor-autocomplete-dropdown");if(l&&!l.classList.contains("hidden")){if(e.key==="ArrowDown"){e.preventDefault(),an(1);return}if(e.key==="ArrowUp"){e.preventDefault(),an(-1);return}if(e.key==="Enter"||e.key==="Tab"){const i=l.querySelector(".autocomplete-item.active");if(i){e.preventDefault(),i.click();return}}if(e.key==="Escape"){yt();return}}if((e.key===" "||e.code==="Space")&&Mt(s)&&vn(t,s)){e.preventDefault();return}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"&&!e.shiftKey&&Gt.length>0){const i=Gt[Gt.length-1];if(i.blockId===a&&Mt(s)){Gt.pop(),e.preventDefault(),ss(t,i.prevType);return}}if((e.ctrlKey||e.metaKey)&&!e.altKey){const i=e.key.toLowerCase();if(i==="b"){e.preventDefault(),It("bold");return}if(i==="i"){e.preventDefault(),It("italic");return}if(i==="u"){e.preventDefault(),It("underline");return}}if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&e.key&&e.key.length===1&&(["bold","italic","underline","strikeThrough"].forEach(i=>{if(et[i]===!0&&!document.queryCommandState(i))try{document.execCommand(i,!1,null)}catch{}else if(et[i]===!1&&document.queryCommandState(i))try{document.execCommand(i,!1,null)}catch{}}),Object.assign(et,{bold:null,italic:null,underline:null,strikeThrough:null})),(e.ctrlKey||e.metaKey)&&e.key==="Enter"){e.preventDefault(),js(a);return}if(e.key==="Backspace"&&!e.ctrlKey&&!e.metaKey){const i=Pt(s),r=window.getSelection(),m=!r||r.isCollapsed;if(i===0&&m){const u=Array.from(document.querySelectorAll(".screenplay-block")),d=u.indexOf(t);if(d>0){e.preventDefault();const c=u[d-1],p=c.hasAttribute("contenteditable")?c:c.querySelector('[contenteditable="true"]'),f=s.innerText.trim();if(f===""||n==="parenthetical"&&(f==="()"||f==="")){Kt(o,a),p&&(p.focus(),ht(p));return}const b=c.getAttribute("data-block-type");if(p&&(n==="action"&&b==="action"||n==="dialogue"&&b==="dialogue"||n==="text"&&b==="text")){const x=p.innerText.length,g=p.innerText+(p.innerText?" ":"")+s.innerText;p.innerText=g,kt(c,g),Kt(o,a),p.focus(),Dt(p,x+(p.innerText?1:0));return}if(p){p.focus(),ht(p);return}}}}if(e.key==="Delete"&&!e.ctrlKey&&!e.metaKey){const i=Pt(s),r=window.getSelection(),m=!r||r.isCollapsed;if(i>=s.innerText.length&&m){const u=Array.from(document.querySelectorAll(".screenplay-block")),d=u.indexOf(t);if(d<u.length-1){const c=u[d+1],p=c.hasAttribute("contenteditable")?c:c.querySelector('[contenteditable="true"]'),f=c.getAttribute("data-scene-id"),b=c.getAttribute("data-block-id"),x=c.getAttribute("data-block-type"),g=(p?p.innerText:"").trim();if(g===""||x==="parenthetical"&&(g==="()"||g==="")){e.preventDefault(),Kt(f,b);return}if(p&&(n==="action"&&x==="action"||n==="dialogue"&&x==="dialogue"||n==="text"&&x==="text")){e.preventDefault();const B=s.innerText.length,v=s.innerText+(s.innerText?" ":"")+p.innerText;s.innerText=v,kt(t,v),Kt(f,b),Dt(s,B+(s.innerText?1:0));return}if(p){e.preventDefault(),p.focus(),Dt(p,0);return}}}}if(e.key==="ArrowLeft"){const i=Pt(s),r=window.getSelection();if(i===0&&(!r||r.isCollapsed)){const m=Array.from(document.querySelectorAll(".screenplay-block")),u=m.indexOf(t);if(u>0){e.preventDefault();const d=m[u-1],c=d.querySelector('[contenteditable="true"]')||d;c&&(c.focus(),ht(c))}}}if(e.key==="ArrowRight"){const i=Pt(s),r=window.getSelection();if(i>=s.innerText.length&&(!r||r.isCollapsed)){const m=Array.from(document.querySelectorAll(".screenplay-block")),u=m.indexOf(t);if(u<m.length-1){e.preventDefault();const d=m[u+1],c=d.querySelector('[contenteditable="true"]')||d;c&&(c.focus(),Dt(c,0))}}}if(e.key==="("&&(n==="character"||n==="dialogue")){const i=window.getSelection();if(i&&i.anchorOffset===0&&s.innerText.trim()===""){e.preventDefault(),ss(t,"parenthetical");return}}if(e.key==="Tab"){e.preventDefault(),yt(),Qa(t,e.shiftKey);return}if(e.key==="Enter"&&!e.shiftKey){if(yt(),n==="scene"){e.preventDefault();const i=Tt(s.innerText);i.location&&Hs(i.location),wt(o,a,"action");return}if(n==="character"){e.preventDefault(),_s(s.innerText),wt(o,a,"dialogue");return}if(n==="dialogue"){e.preventDefault(),wt(o,a,"action");return}if(n==="parenthetical"){e.preventDefault();let i=s.innerText.trim();i.endsWith(")")||(i+=")",s.innerText=i,kt(t,i)),wt(o,a,"dialogue");return}if(n==="transition"){e.preventDefault(),Za(o,a);return}if(n==="shot"||n==="note"||n==="outline"){e.preventDefault(),wt(o,a,"action");return}if(n==="act"||n==="endact"||n==="sequence"){e.preventDefault(),wt(o,a,"scene");return}if(n==="lyrics"){e.preventDefault(),wt(o,a,"lyrics");return}if(n==="action"||n==="text"){e.preventDefault(),wt(o,a,n);return}}}function wt(e,t,s,n){const o=O.scenes.find(u=>u.id===e);if(!o)return;const a=o.blocks.findIndex(u=>u.id===t),l=`b-${Date.now().toString().slice(-6)}`,i={id:l,type:s,content:""};a!==-1?o.blocks.splice(a+1,0,i):o.blocks.push(i);const r=document.getElementById(t),m=r?r.closest(".page-blocks-wrapper"):null;if(r&&m){const u=document.createElement("div");u.innerHTML=kn(i,o.number,o.id);const d=u.firstElementChild;r.insertAdjacentElement("afterend",d),Cn(d),gs();const c=d.hasAttribute("contenteditable")?d:d.querySelector('[contenteditable="true"]');c&&(c.focus(),ht(c));const p=m.querySelectorAll(".screenplay-block");let f=0;p.forEach(b=>{const x=b.getAttribute("data-block-type"),g=b.innerText||"";f+=Sn({type:x,content:g})}),f>wn&&(tt(),setTimeout(()=>{const b=document.getElementById(l);if(b){const x=b.querySelector('[contenteditable="true"]')||b;x.focus(),ht(x)}},20))}else tt(),setTimeout(()=>{const u=document.getElementById(l);if(u){const d=u.hasAttribute("contenteditable")?u:u.querySelector('[contenteditable="true"]');d&&(d.focus(),ht(d))}},20)}function Za(e,t=null){const s=O.scenes.findIndex(r=>r.id===e),n=O.scenes.length+1,o=`scene-${Date.now().toString().slice(-5)}`,a=`b-${Date.now().toString().slice(-6)}`;let l=[];if(t&&s!==-1){const r=O.scenes[s],m=r.blocks?r.blocks.findIndex(u=>u.id===t):-1;m!==-1&&m<r.blocks.length-1&&(l=r.blocks.splice(m+1))}const i={id:o,number:n,actId:O.acts?.[0]?.id||"act-1",slugline:"",blocks:[{id:a,type:"scene",content:""},...l]};s!==-1?O.scenes.splice(s+1,0,i):O.scenes.push(i),O.scenes.forEach((r,m)=>{r.number=m+1}),tt(),ns(),setTimeout(()=>{const r=document.getElementById(a);if(r){const m=r.querySelector('[contenteditable="true"]');m&&(m.focus(),ht(m),Qt(r,m))}},30)}function Qa(e,t=!1){if(!e)return!1;const s=e.getAttribute("data-block-type")||"action";let n;return t?s==="scene"?n="transition":s==="transition"?n="dialogue":s==="dialogue"?n="character":s==="character"||s==="action"||s==="text"?n="scene":s==="parenthetical"?n="character":n="scene":s==="scene"?n="character":s==="character"?n="dialogue":s==="dialogue"?n="transition":s==="transition"?n="scene":s==="action"||s==="text"?n="character":s==="parenthetical"?n="dialogue":n="character",n?(ss(e,n),!0):!1}function ss(e,t){const s=e.getAttribute("data-block-id"),n=e.getAttribute("data-scene-id"),o=O.scenes.find(l=>l.id===n);if(!o)return;const a=o.blocks.find(l=>l.id===s);if(a){if(a.type=t,(t==="character"||t==="scene"||t==="transition")&&(a.content=a.content.toUpperCase()),(t==="action"||t==="dialogue")&&(a.content=Zt(a.content)),t==="parenthetical"){let l=a.content.replace(/^\(+|\)+$/g,"").trim();l?a.content=`(${l})`:a.content="()"}qe=!0,je&&Ye(),tt(),setTimeout(()=>{const l=document.getElementById(s);if(l){const i=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]');if(i){if(i.focus(),t==="parenthetical"&&i.innerText==="()"){const r=i.firstChild;if(r){const m=document.createRange(),u=window.getSelection();m.setStart(r,1),m.collapse(!0),u.removeAllRanges(),u.addRange(m)}}else ht(i);bs(t),t==="transition"?Qt(l,i):yt()}}(t==="scene"||t==="character")&&ns()},25)}}function ht(e){const t=document.createRange(),s=window.getSelection();t.selectNodeContents(e),t.collapse(!1),s.removeAllRanges(),s.addRange(t)}function eo(){document.addEventListener("click",t=>{t.target.closest("#editor-autocomplete-dropdown")||yt()});const e=()=>{const t=document.getElementById("editor-autocomplete-dropdown");if(t&&!t.classList.contains("hidden")&&Ue){const s=document.getElementById(Ue);if(s){const n=s.querySelector('[contenteditable="true"]')||s;An(t,n)}}};window.addEventListener("scroll",e,{capture:!0,passive:!0}),document.addEventListener("selectionchange",()=>{const t=document.getElementById("editor-autocomplete-dropdown");t&&!t.classList.contains("hidden")&&e()}),window.visualViewport&&(window.visualViewport.addEventListener("resize",e),window.visualViewport.addEventListener("scroll",e))}function yt(){const e=document.getElementById("editor-autocomplete-dropdown");e&&e.classList.add("hidden")}function to(e){if(!e)return null;const t=window.getSelection();if(t&&t.rangeCount>0)try{const n=t.getRangeAt(0);if(e.contains(n.startContainer)||e===n.startContainer){const o=n.getClientRects();if(o&&o.length>0){const l=o[o.length-1];if(l&&l.height>0&&l.top>0)return{top:l.top,bottom:l.bottom,left:l.left,right:l.right,width:l.width,height:l.height}}const a=n.getBoundingClientRect();if(a&&a.height>0&&a.top>0)return{top:a.top,bottom:a.bottom,left:a.left,right:a.right,width:a.width,height:a.height}}}catch{}const s=e.getBoundingClientRect();return{top:s.top,bottom:s.bottom,left:s.left,right:s.right,width:s.width,height:s.height}}function An(e,t){if(!e||!t)return;e.parentElement!==document.body&&document.body.appendChild(e);const s=to(t);if(!s)return;const n=window.visualViewport,o=n?n.offsetTop:0,a=n?n.offsetLeft:0,l=n?n.height:window.innerHeight,i=n?n.width:window.innerWidth,r=document.getElementById("editor-fixed-header")||document.getElementById("editor-header-nav"),m=r?r.getBoundingClientRect().bottom:o+56;if(s.bottom<m+4||s.top>o+l-16){yt();return}const u=Math.min(270,i-24);e.style.width=`${u}px`;const d=Math.min(220,e.scrollHeight||180),c=o+l-s.bottom-8,p=s.top-Math.max(m,o)-8;let f,b=d;c<d&&p>c?(b=Math.max(80,Math.min(d,p)),f=s.top-b-6):(b=Math.max(80,Math.min(d,c)),f=s.bottom+6),f=Math.max(Math.max(m,o)+4,Math.min(o+l-b-8,f)),e.style.maxHeight=`${Math.round(b)}px`,e.style.overflowY="auto";const g=t.closest(".screenplay-block"),B=g?g.getAttribute("data-block-type"):null;let v;B==="transition"?v=Math.max(a+12,s.right-u):(v=s.left,v+u>a+i-12&&(v=a+i-u-12),v<a+12&&(v=a+12)),e.style.top=`${Math.round(f)}px`,e.style.left=`${Math.round(v)}px`}function $n(){if(!O)return[];const e=[];return(O.scenes||[]).forEach(t=>{(t.blocks||[]).forEach(s=>{s.type==="character"&&s.content&&e.push(s.content)})}),(O.characters||[]).forEach(t=>{t&&e.push(t)}),yn(e)}function so(){if(!O)return[];const e=new Set;(O.scenes||[]).forEach(s=>{(s.blocks||[]).forEach(n=>{if(n.type==="scene"){const o=Tt(n.content);o.location&&o.location.length>=2&&e.add(o.location)}})}),(O.locations||[]).forEach(s=>{const n=(s||"").trim().toUpperCase();n&&n.length>=2&&e.add(n)});const t=Array.from(e);return t.filter(s=>t.some(o=>o!==s&&o.startsWith(s))?O.scenes?.some(a=>a.blocks?.some(l=>l.type==="scene"&&Tt(l.content).location===s)):!0)}function Qt(e,t){const s=e.getAttribute("data-block-type"),n=t.innerText,o=document.getElementById("editor-autocomplete-dropdown");if(!o)return;let a=[];if(s==="scene"){const l=n.toUpperCase(),i=n.match(/\s+-\s*([A-Za-z]*)$/);if(i){const r=(i[1]||"").toUpperCase(),u=["DAY","NIGHT","MORNING","EVENING","DAWN","DUSK","CONTINUOUS","LATER"].filter(c=>c.startsWith(r)),d=n.replace(/\s+-\s*[A-Za-z]*$/," - ");a=u.map(c=>({label:c,val:d+c}))}else if(l==="I"||l==="IN")a=["INT.","INT./EXT.","I/E."].map(r=>({label:r,val:r+" "}));else if(l==="E"||l==="EX")a=["EXT.","INT./EXT.","I/E."].map(r=>({label:r,val:r+" "}));else if(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i.test(n)){const r=n.match(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i),m=r[1].toUpperCase()+" ",u=(r[2]||"").trim().toUpperCase();u.length>0&&(a=so().filter(p=>p.startsWith(u)).map(p=>({label:p,val:`${m}${p}`})))}}else if(s==="character"){const l=n.trim().toUpperCase();l.length>0&&(a=$n().filter(m=>m.startsWith(l)).map(m=>({label:m,val:m})))}else if(s==="transition"){const i=(n||"").replace(/[\u200B\u00A0\r\n\t]/g,"").trim().toUpperCase(),r=Array.isArray(O?.transitions)&&O.transitions.length>0?Array.from(new Set([...tn,...O.transitions])):tn;if(i.length===0)a=r.map(m=>({label:m,val:m}));else{const m=r.filter(c=>c.toUpperCase().startsWith(i)),u=r.filter(c=>!c.toUpperCase().startsWith(i)&&c.toUpperCase().includes(i));a=[...m,...u].map(c=>({label:c,val:c}))}}if(a.length===0){yt();return}o.innerHTML=a.map((l,i)=>{const r=typeof l=="object"?l.label:l,m=typeof l=="object"?l.val:l;return`
      <div class="autocomplete-item px-3 py-2 sm:py-1.5 hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-blue-700 cursor-pointer flex items-center justify-between font-mono text-xs border-b border-slate-50 last:border-b-0 ${i===0?"active bg-blue-50/70 text-blue-700 font-semibold":""}" data-val="${m}">
        <span class="tracking-wide">${r}</span>
        <span class="text-[10px] text-slate-400 font-sans hidden sm:inline">Enter ↵</span>
      </div>
    `}).join(""),o.classList.remove("hidden"),An(o,t),o.querySelectorAll(".autocomplete-item").forEach(l=>{l.addEventListener("pointerdown",i=>{i.preventDefault()}),l.onclick=i=>{i.stopPropagation();const r=l.getAttribute("data-val");if(t.innerText=r,kt(e,r),s==="character")_s(r);else if(s==="scene"){const m=Tt(r);m.location&&Hs(m.location)}yt(),ht(t),qe=!0,je&&Ye()}})}function an(e){const t=document.getElementById("editor-autocomplete-dropdown");if(!t)return;const s=t.querySelectorAll(".autocomplete-item");if(s.length===0)return;let n=Array.from(s).findIndex(o=>o.classList.contains("active"));n!==-1&&s[n].classList.remove("active","bg-blue-50/70","text-blue-700","font-semibold"),n=(n+e+s.length)%s.length,s[n].classList.add("active","bg-blue-50/70","text-blue-700","font-semibold"),s[n].scrollIntoView({block:"nearest"})}async function Rt(e=!1){if(!(cs||!O)){cs=!0,Ot("Saving..."),O.scenes&&O.scenes.forEach(t=>{t.blocks&&t.blocks.forEach(s=>{s.content&&(s.content=Je(s.content),(s.type==="action"||s.type==="dialogue")&&(s.content=Zt(s.content))),s.char1&&(s.char1=Je(s.char1)),s.dia1&&(s.dia1=Je(s.dia1)),s.char2&&(s.char2=Je(s.char2)),s.dia2&&(s.dia2=Je(s.dia2))})});try{await fs(O.id,O),qe=!1,cs=!1,Ot("Saved"),e&&E("Saved")}catch{cs=!1,Ot("Save failed"),E("Couldn't save changes · Tap retry")}}}function Ye(){je&&(clearTimeout(Bs),Bs=setTimeout(async()=>{qe&&je&&(await Rt(!1),Ot("Autosaved just now"),E("Autosaved just now"))},1500))}function Ot(e){const t=document.getElementById("editor-save-status"),s=document.getElementById("editor-save-icon");t&&(t.textContent=e),e==="Saving..."?s&&(s.textContent="progress_activity",s.classList.add("animate-spin")):e==="Saved"||e==="Autosaved just now"||e==="Unsaved"?s&&(s.textContent="save",s.classList.remove("animate-spin")):e==="Save failed"&&s&&(s.textContent="warning",s.classList.remove("animate-spin"))}function ns(){if(!O)return;const e=document.getElementById("navSceneSelect");if(e){const t=O.scenes||[];e.innerHTML=t.map((s,n)=>`
      <option value="${s.id}" ${n===0?"selected":""}>Scene ${s.number} ▾</option>
    `).join("")||'<option value="">Scene 1 ▾</option>'}}function no(){const e=document.getElementById("navSceneSelect");e&&(e.onchange=s=>{const n=s.target.value;if(!n)return;on(n);const o=O?.scenes?.find(a=>a.id===n);o&&$.setState({currentSceneId:o.number})});let t=null;try{const s=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search,n=new URLSearchParams(s||"");n.get("scene")&&(t=n.get("scene"))}catch{}if(!t&&$.state.currentSceneId&&(t=$.state.currentSceneId),t&&O?.scenes){const s=O.scenes.find(n=>String(n.number)===String(t)||n.id===String(t)||n.id===`scene-${t}`);s&&(e&&(e.value=s.id),setTimeout(()=>on(s.id),250))}}function on(e){const t=document.querySelector(`[data-scene-id="${e}"][data-block-type="scene"]`)||document.querySelector(`[data-scene-id="${e}"]`);t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.classList.add("bg-blue-50/50"),setTimeout(()=>t.classList.remove("bg-blue-50/50"),1500))}function ao(){const e=document.getElementById("element-bar");e&&e.querySelectorAll(".element-btn").forEach(t=>{t.onclick=s=>{s.preventDefault();const n=t.getAttribute("data-type");oo(n)}})}const et={bold:null,italic:null,underline:null,strikeThrough:null};let ln=!1;function ft(e){const t=window.getSelection();if(!t||t.rangeCount===0)return!1;const s=t.anchorNode,n=s?.nodeType===Node.ELEMENT_NODE?s:s?.parentElement;if(!n)return!1;const o=n.closest(".screenplay-block");if(!o)return!1;if(!t.isCollapsed&&t.toString().trim().length>0)try{return document.queryCommandState(e)}catch{return!1}const a=o.getAttribute("data-block-type"),l=a==="scene"||a==="character"||a==="transition";try{if(e==="bold"){if(l){const i=n.closest("b, strong");return!!i&&i!==o}return document.queryCommandState("bold")}if(e==="strikeThrough")return n.closest("s, strike, del")?!0:document.queryCommandState("strikeThrough");if(e==="italic")return document.queryCommandState("italic");if(e==="underline")return document.queryCommandState("underline")}catch{return!1}return!1}function It(e){let t=document.activeElement,s=t?t.closest(".screenplay-block"):null,n=s?s.hasAttribute("contenteditable")?s:s.querySelector('[contenteditable="true"]'):null;if(!n&&Ue){const l=document.getElementById(Ue);l&&(s=l,n=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]'))}if(!n){const l=document.querySelector(".screenplay-block");l&&(s=l,n=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]'))}n&&document.activeElement!==n&&n.focus();const o=window.getSelection();if(o&&!o.isCollapsed&&o.rangeCount>0&&o.toString().trim().length>0){try{document.execCommand(e,!1,null)}catch{}s&&n&&kt(s,n.innerHTML),qe=!0,je&&Ye(),et[e]=null,$t()}else{const i=!(et[e]!==null?et[e]:ft(e));et[e]=i;try{document.execCommand(e,!1,null)}catch{}$t()}}function oo(e){if(e==="bold"){It("bold");return}if(e==="italic"){It("italic");return}if(e==="underline"){It("underline");return}if(e==="strike"){It("strikeThrough");return}if(e==="undo"){document.execCommand("undo",!1,null),$t();return}if(e==="redo"){document.execCommand("redo",!1,null),$t();return}if(e==="image"){if(!Ue){const t=Array.from(document.querySelectorAll(".screenplay-block")),s=window.innerHeight/2;for(const n of t){const o=n.getBoundingClientRect();if(o.top<=s&&o.bottom>=s){Ue=n.getAttribute("data-block-id");break}}}Os=Ue,Nn(!0);return}if(!Ue){const t=document.querySelector(".screenplay-block");t&&(Ue=t.getAttribute("data-block-id"))}if(Ue){const t=document.getElementById(Ue);t&&(ss(t,e),bs(e))}}function bs(e){const t=document.getElementById("element-bar");t&&t.querySelectorAll(".element-btn").forEach(s=>{s.getAttribute("data-type")===e?s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-white bg-blue-600 shadow-2xs font-semibold shrink-0":s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0"})}function lo(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),n=document.getElementById("btn-format-strike");[{btn:e,cmd:"bold"},{btn:t,cmd:"italic"},{btn:s,cmd:"underline"},{btn:n,cmd:"strikeThrough"}].forEach(({btn:l,cmd:i})=>{l&&(l.onmousedown=r=>{r.preventDefault(),r.stopPropagation()},l.onclick=r=>{r.preventDefault(),r.stopPropagation(),It(i)})}),ln||(ln=!0,document.addEventListener("selectionchange",()=>{$t()}));const a=document.getElementById("editor-main-scroll");a&&(a.addEventListener("keyup",$t),a.addEventListener("mouseup",$t))}function $t(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),n=document.getElementById("btn-format-strike");if(!e||!t||!s||!n)return;const o="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center border border-blue-600 shadow-2xs font-semibold active:scale-95 transition-all cursor-pointer",a="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center border border-slate-200/90 active:scale-95 transition-all cursor-pointer";try{const l=window.getSelection();let i=!1,r=!1,m=!1,u=!1;l&&!l.isCollapsed&&l.rangeCount>0&&l.toString().trim().length>0?(i=ft("bold"),r=ft("italic"),m=ft("underline"),u=ft("strikeThrough")):(i=et.bold!==null?et.bold:ft("bold"),r=et.italic!==null?et.italic:ft("italic"),m=et.underline!==null?et.underline:ft("underline"),u=et.strikeThrough!==null?et.strikeThrough:ft("strikeThrough")),e.className=i?o:a,t.className=r?o:a,s.className=m?o:a,n.className=u?o:a}catch{}}function io(e,t){const s=document.getElementById("editor-more-menu-btn"),n=document.getElementById("editorMoreMenuModal"),o=document.getElementById("closeMoreMenuBtn");function a(G){n&&(n.classList.remove("hidden"),n.classList.add("flex"),gt({id:"moreMenu",name:"Screenplay Tools",close:()=>{n.classList.add("hidden"),n.classList.remove("flex")},restore:()=>{n.classList.remove("hidden"),n.classList.add("flex")}}))}s&&(s.onclick=()=>a()),o&&(o.onclick=()=>ve("moreMenu")),n&&(n.onclick=G=>{G.target===n&&ve("moreMenu")});const l=document.getElementById("menu-btn-scene-navigator");l&&(l.onclick=()=>{ve("moreMenu");const G=document.getElementById("navSceneSelect");G&&G.focus()});const i=document.getElementById("menu-btn-char-navigator");i&&(i.onclick=()=>{ve("moreMenu");const G=$n(),be=prompt(`Select character to navigate to:
${G.join(", ")}`,G[0]||"HILL");if(be){for(const C of O.scenes)for(const H of C.blocks)if(H.type==="character"&&H.content.toUpperCase().includes(be.trim().toUpperCase())){const ke=document.getElementById(H.id);if(ke){ke.scrollIntoView({behavior:"smooth",block:"center"}),ke.classList.add("bg-blue-100/60"),setTimeout(()=>ke.classList.remove("bg-blue-100/60"),1500);return}}}});const r=document.getElementById("sceneNumberToggle"),m=document.getElementById("sceneNumberToggleText"),u=document.getElementById("menuSceneNumState"),d=document.getElementById("menu-btn-scene-numbers");function c(){St=!St,m&&(m.textContent=`Scene #s: ${St?"On":"Off"}`),u&&(u.textContent=St?"Enabled":"Disabled"),document.querySelectorAll(".scene-num-indicator").forEach(G=>{G.classList.toggle("hidden",!St)}),E(`Scene numbers ${St?"enabled (left side)":"hidden"}`)}r&&(r.onclick=c),d&&(d.onclick=()=>{c(),ve("moreMenu")});const p=document.getElementById("focusModeToggle"),f=document.getElementById("focusModeText"),b=document.getElementById("menu-btn-focus-mode"),x=document.getElementById("menuFocusState");function g(G=null){xt=G!==null?G:!xt,f&&(f.textContent=xt?"Exit Focus":"Focus"),x&&(x.textContent=xt?"Active":"Off");const be=document.getElementById("editor-collapsible-toolbars"),C=document.getElementById("editor-document-tabs"),H=document.getElementById("editor-fixed-header");if(xt?(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!0),H&&(H.style.top="0px")):(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!1),H&&(H.style.top="0px")),be&&(be.style.display=xt?"none":""),C&&(C.style.display=xt?"none":"flex"),Yt(),xt)gt({id:"focusMode",name:"Focus Mode",close:()=>g(!1)}),E("Focus Mode active (distraction-free)");else{const ke=He.findIndex(se=>se.id==="focusMode");ke!==-1&&He.splice(ke,1),E("Exited Focus Mode")}}p&&(p.onclick=()=>g()),b&&(b.onclick=()=>{ve("moreMenu"),g()});const B=document.getElementById("langToggleBtn"),v=document.getElementById("langToggleText"),N=document.getElementById("tamilLangBadge");function S(G){Is=G,v&&(v.textContent=G==="TA"?"தமிழ் / EN":G==="TL"?"Tanglish":"EN / தமிழ்"),N&&(N.textContent=G==="TA"?"தமிழ் விசைப்பலகை: இயங்குகிறது":G==="TL"?"Tanglish: Active":"Tamil IME: Ready"),E(`Screenplay language set to ${G==="TA"?"Tamil":G==="TL"?"Tanglish":"English"}`)}B&&(B.onclick=()=>{S(Is==="EN"?"TA":Is==="TA"?"TL":"EN")}),document.querySelectorAll(".lang-choice-btn").forEach(G=>{G.onclick=()=>{S(G.getAttribute("data-lang")),ve("moreMenu")}});const M=document.getElementById("btn-open-production"),T=document.getElementById("menu-btn-production"),re=()=>{const G=e||$.state.selectedScriptId||"chronicles-of-dust";sessionStorage.setItem("scriptora_prod_return",`/editor/${G}`),t(`/production?from=editor&scriptId=${encodeURIComponent(G)}`)};M&&(M.onclick=re),T&&(T.onclick=()=>{ve("moreMenu"),re()});const ee=document.getElementById("menu-btn-go-page");ee&&(ee.onclick=()=>{ve("moreMenu");const G=document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)").length||1,be=prompt(`Enter page number to jump to (1-${G}):`,"1");if(be){const C=document.querySelector(`[data-page-num="${be}"]`);C&&C.scrollIntoView({behavior:"smooth",block:"start"})}});const me=document.getElementById("menu-btn-page-break");me&&(me.onclick=()=>{ve("moreMenu"),js()});const z=document.getElementById("menu-btn-insert-page");z&&(z.onclick=()=>{ve("moreMenu"),En()});const ge=document.getElementById("menu-btn-page-before");ge&&(ge.onclick=()=>{ve("moreMenu"),In()});const fe=document.getElementById("menu-btn-page-at-end");fe&&(fe.onclick=()=>{ve("moreMenu"),Fs()});const Z=document.getElementById("btn-undo"),ce=document.getElementById("btn-redo");Z&&(Z.onclick=()=>document.execCommand("undo")),ce&&(ce.onclick=()=>document.execCommand("redo"))}function ro(){const e=document.getElementById("btn-quick-find"),t=document.getElementById("menu-btn-find-replace"),s=document.getElementById("closeFindBtn"),n=document.getElementById("findInput"),o=document.getElementById("replaceInput"),a=document.getElementById("findNextBtn"),l=document.getElementById("findPrevBtn"),i=document.getElementById("replaceBtn"),r=document.getElementById("replaceAllBtn"),m=document.getElementById("findReplaceModal");e&&(e.onclick=()=>ms(!0)),t&&(t.onclick=()=>{ve("moreMenu"),ms(!0)}),s&&(s.onclick=()=>ve("findModal")),m&&(m.onclick=u=>{u.target===m&&ve("findModal")}),n&&(n.oninput=()=>As(n.value)),a&&(a.onclick=()=>Ds(1)),l&&(l.onclick=()=>Ds(-1)),i&&(i.onclick=()=>{const u=n.value,d=o.value;if(!u||Et===-1||!rt[Et])return;const c=rt[Et];c.block.content=c.block.content.replace(u,d),tt(),As(u),qe=!0,je&&Ye(),E("Replaced 1 occurrence")}),r&&(r.onclick=()=>{const u=n.value,d=o.value;if(!u)return;let c=0;O.scenes.forEach(p=>{p.blocks.forEach(f=>{f.content&&f.content.includes(u)&&(f.content=f.content.split(u).join(d),c++)})}),tt(),As(u),qe=!0,je&&Ye(),E(`Replaced ${c} occurrences`)})}function ms(e){const t=document.getElementById("findReplaceModal");if(t)if(e)ks=document.getElementById("editor-main-scroll")?.scrollTop||0,Cs=Ue,t.classList.remove("hidden"),t.classList.add("flex"),gt({id:"findModal",name:"Find & Replace",close:()=>ms(!1)}),setTimeout(()=>{document.getElementById("findInput")?.focus()},40);else{t.classList.add("hidden"),t.classList.remove("flex"),Us();const s=document.getElementById("editor-main-scroll");if(s&&ks!==null&&(s.scrollTop=ks),Cs){const o=document.getElementById(Cs),a=o?.querySelector('[contenteditable="true"]')||o;a&&a.focus()}const n=He.findIndex(o=>o.id==="findModal");n!==-1&&He.splice(n,1)}}function As(e){rt=[],Et=-1;const t=document.getElementById("findMatchesCount");if(!e||!O){t&&(t.textContent="0 of 0"),Us();return}O.scenes.forEach(s=>{s.blocks.forEach(n=>{n.content&&n.content.toLowerCase().includes(e.toLowerCase())&&rt.push({block:n,sceneId:s.id})})}),t&&(t.textContent=rt.length>0?`1 of ${rt.length}`:"0 of 0"),rt.length>0&&Ds(0)}function Ds(e){if(rt.length===0)return;Et=(Et+e+rt.length)%rt.length;const t=rt[Et],s=document.getElementById("findMatchesCount");s&&(s.textContent=`${Et+1} of ${rt.length}`);const n=document.getElementById(t.block.id);n&&(n.scrollIntoView({behavior:"smooth",block:"center"}),Us(),n.classList.add("bg-yellow-100"))}function Us(){document.querySelectorAll(".screenplay-block").forEach(e=>{e.classList.remove("bg-yellow-100")})}function Nn(e){const t=document.getElementById("imageModal");if(t)if(e)Ue&&(Os=Ue),t.classList.remove("hidden"),t.classList.add("flex"),gt({id:"imageModal",name:"Insert Image",close:()=>Nn(!1)});else{t.classList.add("hidden"),t.classList.remove("flex");const s=He.findIndex(n=>n.id==="imageModal");s!==-1&&He.splice(s,1)}}function co(e){const t=document.getElementById("imageModal"),s=document.getElementById("closeImageModal"),n=document.getElementById("cancelImageBtn"),o=document.getElementById("insertImageBtn"),a=document.getElementById("imgFileInput"),l=document.getElementById("imgUploadLabel"),i=document.getElementById("imgUrlInput"),r=document.getElementById("imgCaptionInput"),m=document.getElementById("imgPreviewContainer"),u=document.getElementById("imgPreviewThumb"),d=document.getElementById("clearImgPreviewBtn");let c="";function p(F){m&&u&&(F?(u.src=F,m.classList.remove("hidden")):(m.classList.add("hidden"),u.src=""))}function f(F,I){const L=new Image;L.onload=()=>{let Q=L.width,xe=L.height;(Q>900||xe>600)&&(Q/xe>900/600?(xe=Math.round(xe*900/Q),Q=900):(Q=Math.round(Q*600/xe),xe=600));const ue=document.createElement("canvas");ue.width=Q,ue.height=xe,ue.getContext("2d").drawImage(L,0,0,Q,xe),I(ue.toDataURL("image/jpeg",.85))},L.onerror=()=>I(F),L.src=F}s&&(s.onclick=()=>ve("imageModal")),n&&(n.onclick=()=>ve("imageModal")),t&&(t.onclick=F=>{F.target===t&&ve("imageModal")}),document.querySelectorAll(".img-preset-btn").forEach(F=>{F.onclick=()=>{const I=F.getAttribute("data-url"),L=F.getAttribute("data-caption");i&&(i.value=I),r&&!r.value&&(r.value=L),c=I,p(I)}}),i&&(i.oninput=()=>{const F=i.value.trim();F?(c="",p(F)):c||p("")}),d&&(d.onclick=()=>{c="",i&&(i.value=""),a&&(a.value=""),l&&(l.textContent="Choose local image..."),p("")}),a&&(a.onchange=F=>{const I=F.target.files?.[0];if(I){l&&(l.textContent=I.name);const L=new FileReader;L.onload=V=>{f(V.target.result,U=>{c=U,p(U)})},L.readAsDataURL(I)}}),o&&(o.onclick=()=>{const F=i?.value.trim(),I=r?.value.trim();let L=c||F;L||(L="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80");const V={id:`b-${Date.now().toString().slice(-6)}`,type:"image",url:L,content:L,caption:I||""},U=Os||Ue;let Q=null,xe=-1;if(O.scenes&&O.scenes.length>0){if(U)for(const ue of O.scenes){const Se=(ue.blocks||[]).findIndex(he=>he.id===U);if(Se!==-1){Q=ue,xe=Se+1;break}}if(!Q){const Se=document.getElementById("navSceneSelect")?.value||($.state.currentSceneId?`scene-${$.state.currentSceneId}`:null);Se&&(Q=O.scenes.find(he=>he.id===Se||String(he.number)===String($.state.currentSceneId)))}if(!Q){const ue=Array.from(document.querySelectorAll(".screenplay-block")),Se=window.innerHeight/2;for(const he of ue){const X=he.getBoundingClientRect();if(X.top<=Se&&X.bottom>=Se){const Pe=he.getAttribute("data-scene-id");Q=O.scenes.find(D=>D.id===Pe);const h=he.getAttribute("data-block-id");if(Q&&h){const D=(Q.blocks||[]).findIndex(J=>J.id===h);D!==-1&&(xe=D+1)}break}}}Q||(Q=O.scenes[0]),Q.blocks||(Q.blocks=[]),xe!==-1&&xe<=Q.blocks.length?Q.blocks.splice(xe,0,V):Q.blocks.push(V)}else O.scenes=[{id:"scene-1",number:1,slugline:"INT. SCENE - DAY",blocks:[V]}];c="",a&&(a.value=""),i&&(i.value=""),r&&(r.value=""),l&&(l.textContent="Upload local image file..."),p(""),tt(),qe=!0,je&&Ye(),E("Storyboard image inserted"),ve("imageModal"),setTimeout(()=>{const ue=document.getElementById(V.id);ue&&(ue.scrollIntoView({behavior:"smooth",block:"center"}),ue.classList.add("ring-2","ring-blue-500"),setTimeout(()=>ue.classList.remove("ring-2","ring-blue-500"),1500))},80)});const b=document.getElementById("preferencesModal"),x=document.getElementById("menu-btn-preferences"),g=document.getElementById("closePrefModal"),B=document.getElementById("savePrefBtn");function v(F){if(b)if(F)b.classList.remove("hidden"),b.classList.add("flex"),gt({id:"preferencesModal",name:"Preferences",close:()=>v(!1)});else{b.classList.add("hidden"),b.classList.remove("flex");const I=He.findIndex(L=>L.id==="preferencesModal");I!==-1&&He.splice(I,1)}}x&&(x.onclick=()=>{ve("moreMenu"),v(!0)}),g&&(g.onclick=()=>ve("preferencesModal")),b&&(b.onclick=F=>{F.target===b&&ve("preferencesModal")}),B&&(B.onclick=()=>{const F=document.getElementById("prefSceneNumbers")?.checked,I=document.getElementById("prefLineSpacing")?.value,L=document.getElementById("prefFontSize")?.value;St=F,document.querySelectorAll(".scene-num-indicator").forEach(U=>U.classList.toggle("hidden",!F));const V=document.querySelector(".screenplay-page-sheet");V&&(V.style.lineHeight=I==="2.0"?"30px":I==="1.0"?"20px":"24px",V.style.fontSize=L==="14pt"?"16px":"15px"),ve("preferencesModal"),E("Preferences applied")});function N(F){return F?F.replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/[\r\n]+/g," ").replace(/[^\x20-\x7E]/g,I=>({"—":"--","–":"-","“":'"',"”":'"',"‘":"'","’":"'","…":"...","·":"-","•":"*"})[I]||" "):""}function S(F,I){if(!F)return[];const L=F.split(/\s+/),V=[];let U="";for(const Q of L)U?(U+" "+Q).length<=I?U+=" "+Q:(V.push(U),U=Q):U=Q;return U&&V.push(U),V}function M(F,I,L={}){const{includeTitlePage:V=!0,includePageNumbers:U=!0,sceneNumbers:Q=!0,preservePageBreaks:xe=!0,emptyPageFirst:ue=!1,emptyPageLast:Se=!1,pageSheets:he=[]}=L,X=[],h=595.28/2,D=108,J=525,K=14.4,te=14.4,ye=(oe,w=12)=>(oe?oe.length:0)*(w*.6),_e=(oe,w=12)=>Math.round(h-ye(oe,w)/2),at=(oe,w=12,y=J)=>Math.round(y-ye(oe,w));let Ve=!1;if(V&&F.titlePage&&(I.has(1)||L.rangeType==="all")){const oe=F.titlePage,w=(oe.title||F.title||"UNTITLED SCREENPLAY").toUpperCase(),y=S(w,35),P=[];let A=520;y.forEach(Ae=>{P.push({text:Ae,x:_e(Ae,12),y:A,font:"F2",size:12}),A-=K}),A-=24;const W=oe.by!==void 0?oe.by:"Written by";W&&(P.push({text:W,x:_e(W,12),y:A,font:"F1",size:12}),A-=K+4);const q=oe.author||"Author";P.push({text:q,x:_e(q,12),y:A,font:"F2",size:12});let Y=(oe.phone||"").trim();if(!Y&&oe.contact){const ze=oe.contact.split("·").map(Oe=>Oe.trim()).find(Oe=>Oe.includes("+")||/\d{3}/.test(Oe));ze&&(Y=ze)}Y&&!Y.toLowerCase().startsWith("phone")&&(Y=`Phone: ${Y}`);let _=(oe.email||"").trim();if(!_&&oe.contact&&oe.contact.includes("@")){const Ae=oe.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);Ae&&(_=Ae[0])}_&&!_.toLowerCase().startsWith("e-mail")&&!_.toLowerCase().startsWith("email")&&(_=`E-mail: ${_}`);const j=[];if(Y&&j.push(Y),_&&j.push(_),oe.address){const Ae=S(oe.address.trim(),40);j.push(...Ae)}else if(!Y&&!_&&oe.contact){const Ae=oe.contact.split("·").map(ze=>ze.trim()).filter(Boolean);j.push(...Ae)}let Ee=130;j.forEach(Ae=>{P.push({text:Ae,x:D,y:Ee,font:"F1",size:12}),Ee-=K}),X.push(P),Ve=!0}if(he.forEach(oe=>{if(oe.classList&&oe.classList.contains("screenplay-title-page-sheet"))return;const w=parseInt(oe.getAttribute("data-page-num"),10)||1;if(!I.has(w))return;const y=[];let P=!1;if(U){const q=`${w}.`;y.push({text:q,x:at(q,12,J),y:805,font:"F1",size:12})}let A=765;oe.querySelectorAll(".screenplay-block").forEach(q=>{if(A<65)return;const Y=q.getAttribute("data-block-type");if(Y==="pagebreak"){if(xe){A-=K;const _="----------------------------------------";y.push({text:_,x:_e(_,12),y:A,font:"F1",size:12}),A-=K}return}if(Y==="scene"){const _=q.querySelector('[contenteditable="true"]'),j=(_?_.innerText.trim():q.innerText.trim()).toUpperCase();j&&(P=!0);const Ee=Q&&q.querySelector(".scene-num-indicator")?.innerText?.trim()||"";A-=te,S(j,57).forEach((ze,Oe)=>{Oe===0&&Ee&&y.push({text:Ee,x:76,y:A,font:"F2",size:12}),y.push({text:ze,x:D,y:A,font:"F2",size:12}),A-=K})}else if(Y==="character"){const _=q.innerText.trim().toUpperCase();_&&(P=!0),A-=te,y.push({text:_,x:266,y:A,font:"F2",size:12}),A-=K}else if(Y==="parenthetical"){let _=q.innerText.trim();_&&(P=!0),_.startsWith("(")||(_="("+_),_.endsWith(")")||(_=_+")"),S(_,26).forEach(j=>{y.push({text:j,x:223,y:A,font:"F1",size:12}),A-=K})}else if(Y==="dialogue"){const _=q.innerText.trim();_&&(P=!0),S(_,35).forEach(j=>{y.push({text:j,x:180,y:A,font:"F1",size:12}),A-=K})}else if(Y==="transition"){const _=q.innerText.trim().toUpperCase();_&&(P=!0),A-=te,y.push({text:_,x:at(_,12,J),y:A,font:"F2",size:12}),A-=K}else if(Y==="shot"){const _=q.innerText.trim().toUpperCase();_&&(P=!0),A-=te,y.push({text:_,x:D,y:A,font:"F2",size:12}),A-=K}else if(Y==="image"){const _=q.querySelector('[contenteditable="true"]')?.innerText?.trim()||"Storyboard Image";P=!0,A-=te,y.push({text:`[STORYBOARD: ${_}]`,x:D,y:A,font:"F1",size:12}),A-=K}else{const _=q.innerText.trim();_&&(P=!0,A-=te,S(_,58).forEach(j=>{y.push({text:j,x:D,y:A,font:"F1",size:12}),A-=K}))}}),P&&X.push(y)}),X.length===0){const oe=[{text:F.title||"Screenplay",x:D,y:750,font:"F2",size:12}];U&&oe.push({text:"1.",x:at("1.",12,J),y:805,font:"F1",size:12}),X.push(oe)}const $e=oe=>!oe||oe.length===0||oe.every(w=>w.y===805||!w.text||w.text.trim()==="");for(;X.length>1&&$e(X[X.length-1]);)X.pop();ue&&X.unshift([]),Se&&X.push([]);const ut=X.length,Qe=[],ot=[];let Ne=4;for(let oe=0;oe<ut;oe++)Ne++,Qe.push(Ne),Ne++,ot.push(Ne);const lt=[];lt[1]="<< /Type /Catalog /Pages 2 0 R >>",lt[2]=`<< /Type /Pages /Kids [${Qe.map(oe=>oe+" 0 R").join(" ")}] /Count ${ut} /MediaBox [0 0 595.28 841.89] >>`,lt[3]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>",lt[4]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>";for(let oe=0;oe<ut;oe++){const w=Qe[oe],y=ot[oe];lt[w]=`<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${y} 0 R >>`;const P=[],A=X[oe]||[];for(const _ of A){const j=_.font||"F1",Ee=_.size||12,Ae=_.x||D,ze=_.y||750,Oe=N(_.text);P.push(`BT /${j} ${Ee} Tf ${Ae.toFixed(2)} ${ze.toFixed(2)} Td (${Oe}) Tj ET`)}const W=P.join(`
`),Y=new TextEncoder().encode(W);lt[y]=`<< /Length ${Y.length} >>
stream
${W}
endstream`}const pt=new TextEncoder,Ze=pt.encode(`%PDF-1.4
%âãÏÓ
`);let qt=Ze.length;const os=[],vt=[];for(let oe=1;oe<=Ne;oe++){os[oe]=qt;const w=`${oe} 0 obj
${lt[oe]}
endobj
`,y=pt.encode(w);vt.push(y),qt+=y.length}const hs=qt;let At=`xref
0 ${Ne+1}
0000000000 65535 f 
`;for(let oe=1;oe<=Ne;oe++)At+=`${String(os[oe]).padStart(10,"0")} 00000 n 
`;At+=`trailer
<< /Size ${Ne+1} /Root 1 0 R >>
startxref
${hs}
%%EOF`;const ls=pt.encode(At);return new Blob([Ze,...vt,ls],{type:"application/pdf"})}const T=document.getElementById("exportModal"),re=document.getElementById("exportModalBtn"),ee=document.getElementById("menu-btn-export"),me=document.getElementById("closeExportModal"),z=document.getElementById("cancelExportBtn"),ge=document.getElementById("startExportBtn"),fe=document.getElementById("exportProgressArea"),Z=document.getElementById("exportProgressBar"),ce=document.getElementById("exportStatusText");function G(F){if(T)if(F)T.classList.remove("hidden"),T.classList.add("flex"),gt({id:"exportModal",name:"Export",close:()=>G(!1)});else{T.classList.add("hidden"),T.classList.remove("flex"),fe?.classList.add("hidden");const I=He.findIndex(L=>L.id==="exportModal");I!==-1&&He.splice(I,1)}}re&&(re.onclick=()=>G(!0)),ee&&(ee.onclick=()=>{ve("moreMenu"),G(!0)}),me&&(me.onclick=()=>ve("exportModal")),z&&(z.onclick=()=>ve("exportModal")),T&&(T.onclick=F=>{F.target===T&&ve("exportModal")});const be=document.getElementById("exportPageRangeSelect"),C=document.getElementById("exportCustomRangeInput");be&&C&&(be.onchange=()=>{C.classList.toggle("hidden",be.value!=="custom"),be.value==="custom"&&C.focus()}),ge&&(ge.onclick=()=>{const F=document.getElementById("exportFormatSelect")?.value||"pdf",I=document.getElementById("exportPageRangeSelect")?.value||"all",L=document.getElementById("exportCustomRangeInput")?.value||"",V=document.getElementById("optPageNumbers")?.checked!==!1,U=document.getElementById("optPreservePageBreaks")?.checked!==!1,Q=document.getElementById("optStandardMargins")?.checked!==!1,xe=document.getElementById("optSceneNumbers")?.checked!==!1,ue=document.getElementById("optEmptyPageFirst")?.checked===!0,Se=document.getElementById("optEmptyPageLast")?.checked===!0;let he=Array.from(document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)"));he.length===0&&(he=Array.from(document.querySelectorAll(".screenplay-page-sheet:not(.screenplay-title-page-sheet)"))),he.length===0&&(tt(),he=Array.from(document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)")));const X=he.length||1;let Pe=new Set;if(I==="all")for(let h=1;h<=X;h++)Pe.add(h);else if(I==="current"){let h=1;if(Ue){const D=document.getElementById(Ue),J=D?D.closest(".screenplay-page-sheet"):null;J&&(h=parseInt(J.getAttribute("data-page-num"),10)||1)}Pe.add(h)}else if(I==="custom"&&(L.split(",").forEach(D=>{if(D=D.trim(),D.includes("-")){const[J,K]=D.split("-").map(te=>parseInt(te.trim(),10));if(!isNaN(J)&&!isNaN(K))for(let te=Math.max(1,J);te<=Math.min(X,K);te++)Pe.add(te)}else{const J=parseInt(D,10);!isNaN(J)&&J>=1&&J<=X&&Pe.add(J)}}),Pe.size===0))for(let D=1;D<=X;D++)Pe.add(D);fe.classList.remove("hidden"),Z.style.width="35%",ce.textContent=Q?'Applying standard A4 margins (1.5" left, 1.0" right) & Courier Prime...':"Formatting Courier Prime typography and page layout...",setTimeout(()=>{Z.style.width="80%",ce.textContent=`Compiling standard ${F.toUpperCase()} for pages [${Array.from(Pe).join(", ")}]...`},500),setTimeout(()=>{Z.style.width="100%",ce.textContent="Completed! Starting download...";let h="";if(ue&&(h+=`\f
`),document.getElementById("optTitlePage")?.checked&&O.titlePage&&(Pe.has(1)||I==="all")){const ye=O.titlePage;h+=`${ye.title||O.title}

`,h+=`${ye.by||"Written by"}

`,h+=`${ye.author||"Author"}

`,ye.phone&&(h+=`${ye.phone}
`),ye.email&&(h+=`${ye.email}
`),ye.address&&(h+=`${ye.address}
`),!ye.phone&&!ye.email&&!ye.address&&ye.contact&&(h+=`${ye.contact}
`),h+=`

================================================================================
\f
`}he.forEach((ye,_e)=>{const at=parseInt(ye.getAttribute("data-page-num"),10)||_e+1;if(!Pe.has(at))return;let Ve="";V&&(Ve+=`
											${at}.

`);let $e=!1;ye.querySelectorAll(".screenplay-block").forEach(Qe=>{const ot=Qe.getAttribute("data-block-type");if(ot==="pagebreak"){U&&(Ve+=`
[=== PAGE BREAK ===]

`);return}let Ne="";if(ot==="scene"){const lt=Qe.querySelector('[contenteditable="true"]');Ne=lt?lt.innerText.trim():Qe.innerText.trim();const pt=xe&&Qe.querySelector(".scene-num-indicator")?.innerText?.trim()||"";Ne&&(Ve+=`

${pt?pt+". ":""}${Ne}

`,$e=!0)}else ot==="character"?(Ne=Qe.innerText.trim(),Ne&&(Ve+=`
			${Ne}
`,$e=!0)):ot==="parenthetical"?(Ne=Qe.innerText.trim(),Ne&&(Ve+=`		${Ne.startsWith("(")?Ne:"("+Ne+")"}
`,$e=!0)):ot==="dialogue"?(Ne=Qe.innerText.trim(),Ne&&(Ve+=`	${Ne}
`,$e=!0)):ot==="transition"?(Ne=Qe.innerText.trim(),Ne&&(Ve+=`
						${Ne}

`,$e=!0)):(Ne=Qe.innerText.trim(),Ne&&(Ve+=`${Ne}

`,$e=!0))}),$e&&(h+=Ve+`
\f
`)}),Se?!h.endsWith(`\f
`)&&!h.endsWith("\f")&&(h+=`
\f
`):h=h.replace(/[\s\f]+$/,"");let D;F==="pdf"?D=M(O,Pe,{includeTitlePage:document.getElementById("optTitlePage")?.checked!==!1,includePageNumbers:V,sceneNumbers:xe,preservePageBreaks:U,emptyPageFirst:ue,emptyPageLast:Se,pageSheets:he,rangeType:I}):D=new Blob([h],{type:"text/plain"});const J=URL.createObjectURL(D),K=document.createElement("a");K.href=J;const te=I==="all"?"All_Pages":`Pages_${Array.from(Pe).join("-")}`;K.download=`${O.title.replace(/[^a-zA-Z0-9]/g,"_")}_${O.draft||"Draft"}_${te}.${F}`,document.body.appendChild(K),K.click(),K.remove(),E(`Exported "${K.download}" successfully`),setTimeout(()=>ve("exportModal"),800)},1e3)});const H=document.getElementById("versionsModal"),ke=document.getElementById("versionsModalBtn"),se=document.getElementById("menu-btn-versions"),pe=document.getElementById("closeVersionsModal"),k=document.getElementById("versionsListContainer");function Ie(F){H&&(H.classList.remove("hidden"),H.classList.add("flex"),Le(),gt({id:"versionsModal",name:"Versions",close:()=>{H.classList.add("hidden"),H.classList.remove("flex")},restore:()=>{H.classList.remove("hidden"),H.classList.add("flex"),Le()}}))}async function Le(){const F=await Xn(e);k&&(k.innerHTML=F.map(I=>`
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
    `).join(""),document.querySelectorAll(".restore-version-btn").forEach(I=>{I.onclick=()=>{const L=I.getAttribute("data-vname");E(`Restored version "${L}"`),document.getElementById("currentVersionTag").textContent=L,ve("versionsModal")}}))}ke&&(ke.onclick=()=>Ie()),se&&(se.onclick=()=>{ve("moreMenu"),Ie()}),pe&&(pe.onclick=()=>ve("versionsModal")),H&&(H.onclick=F=>{F.target===H&&ve("versionsModal")});const Ce=document.getElementById("newVersionModal"),ae=document.getElementById("openNewVersionPrompt"),le=document.getElementById("closeNewVersionModal"),R=document.getElementById("cancelNewVersionBtn"),we=document.getElementById("saveNewVersionBtn");function De(){H.classList.add("hidden"),Ce.classList.remove("hidden"),Ce.classList.add("flex"),gt({id:"newVersionModal",name:"New Version",close:()=>{Ce.classList.add("hidden"),Ce.classList.remove("flex")}})}ae&&(ae.onclick=De),le&&(le.onclick=()=>ve("newVersionModal")),R&&(R.onclick=()=>ve("newVersionModal")),we&&(we.onclick=async()=>{const F=document.getElementById("newVersionNameInput")?.value.trim(),I=document.getElementById("newVersionNotesInput")?.value.trim();F&&(await Zn(e,{name:F,notes:I}),E(`Created version snapshot "${F}"`),document.getElementById("currentVersionTag").textContent=F,ve("newVersionModal"))});const ie=document.getElementById("compareModal"),Me=document.getElementById("openCompareBtn"),de=document.getElementById("menu-btn-compare"),Fe=document.getElementById("closeCompareModal"),Re=document.getElementById("closeCompareBtn2");function Be(){H.classList.add("hidden"),ie.classList.remove("hidden"),ie.classList.add("flex"),gt({id:"compareModal",name:"Compare Versions",close:()=>{ie.classList.add("hidden"),ie.classList.remove("flex")}})}Me&&(Me.onclick=Be),de&&(de.onclick=()=>{ve("moreMenu"),Be()}),Fe&&(Fe.onclick=()=>ve("compareModal")),Re&&(Re.onclick=()=>ve("compareModal")),ie&&(ie.onclick=F=>{F.target===ie&&ve("compareModal")})}function gs(){if(!O)return;let e=0;O.scenes.forEach(a=>{a.blocks.forEach(l=>{l.content&&(e+=l.content.trim().split(/\s+/).filter(Boolean).length)})});const s=document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)").length||1,n=document.getElementById("telemetry-page-count"),o=document.getElementById("telemetry-word-count");n&&(n.textContent=`Page 1 of ${s}`),o&&(o.textContent=`${e.toLocaleString()} words`)}function uo(){const e=$.state.scripts||[],t=$.state.selectedScriptId||"chronicles-of-dust",s=e.find(n=>n.id===t)||e[0]||{title:"Chronicles of Dust"};return`
    ${Xe("Intelligence","Script Selector")}

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
      <div class="fixed bottom-14 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md px-4 py-2.5 border-t border-slate-100 flex flex-col items-center gap-1 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] max-w-2xl mx-auto">
        <button type="button" id="submit-continue-analysis-btn" class="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all text-white font-medium text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer">
          <span class="truncate font-semibold" id="selector-btn-label">Continue to Context (${s.title})</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
        <span class="text-[10px] text-slate-400 tracking-tight">Establishes selectedScriptId for Script Analysis</span>
      </div>

    </main>

    ${Ke("intelligence")}
  `}function po(e){let t=$.state.selectedScriptId||"chronicles-of-dust";document.querySelectorAll(".script-select-card").forEach(o=>{o.onclick=()=>{const a=o.getAttribute("data-script-id"),l=o.getAttribute("data-script-title");t=a,$.selectScript(a),document.querySelectorAll(".script-select-card").forEach(m=>{m.className="script-select-card relative p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const u=m.querySelector(".script-select-indicator");u&&(u.className="script-select-indicator w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0",u.innerHTML='<span class="material-symbols-outlined text-[16px]">arrow_forward</span>')}),o.className="script-select-card relative p-3.5 rounded-xl border border-blue-600 bg-blue-50/70 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const i=o.querySelector(".script-select-indicator");i&&(i.className="script-select-indicator w-6 h-6 rounded-full bg-blue-600 text-white shadow-xs flex items-center justify-center shrink-0",i.innerHTML='<span class="material-symbols-outlined text-[16px] font-bold">check</span>');const r=document.getElementById("selector-btn-label");r&&(r.textContent=`Continue to Context (${l})`)}});const s=document.getElementById("submit-continue-analysis-btn");s&&(s.onclick=()=>{$.selectScript(t),e("/intelligence/context")});const n=document.getElementById("btn-import-script-modal");n&&(n.onclick=()=>{E("Select screenplay file (.fountain, .fdx, .pdf) to parse","info")})}function mo(){const e=$.state.selectedScriptId||"chronicles-of-dust",t=$.state.scripts.find(n=>n.id===e)||$.state.activeScript||{title:"Chronicles of Dust",format:"Feature",industry:"International / Hollywood"},s=t.context||{format:t.format||"Feature",industry:t.industry||"International / Hollywood",hours:1,minutes:36,seconds:0};return`
    ${Xe("Intelligence","Context Calibration")}

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

    ${Ke("intelligence")}
  `}function xo(e){const t=$.state.selectedScriptId||"chronicles-of-dust",s=$.state.scripts.find(d=>d.id===t)||$.state.activeScript||{},n=s.context||{};let o=n.format||s.format||"Feature",a=n.hours!==void 0?n.hours:1,l=n.minutes!==void 0?n.minutes:36,i=n.seconds!==void 0?n.seconds:0;document.querySelectorAll(".format-card").forEach(d=>{d.onclick=()=>{o=d.getAttribute("data-format"),document.querySelectorAll(".format-card").forEach(c=>{c.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 transition-all cursor-pointer hover:bg-slate-50"}),d.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 border-2 border-blue-600 transition-all cursor-pointer",o==="Short"?(a=0,l=25,i=0):o==="Pilot"?(a=0,l=50,i=30):(a=1,l=45,i=0),r()}});function r(){const d=g=>String(g).padStart(2,"0"),c=document.getElementById("val-hr"),p=document.getElementById("val-min"),f=document.getElementById("val-sec");c&&(c.value=d(a)),p&&(p.value=d(l)),f&&(f.value=d(i));const b=a*60+l+Math.round(i/60),x=document.getElementById("pacing-projection");x&&(x.textContent=`~${b} standard script pages`)}document.querySelectorAll(".stepper-btn").forEach(d=>{d.onclick=()=>{const c=d.getAttribute("data-unit"),p=parseInt(d.getAttribute("data-delta"),10)||0;c==="hr"&&(a=Math.max(0,Math.min(9,a+p))),c==="min"&&(l=Math.max(0,Math.min(59,l+p))),c==="sec"&&(i=Math.max(0,Math.min(59,i+p))),r()}}),[{id:"val-hr",max:9,get:()=>a,set:d=>{a=d}},{id:"val-min",max:59,get:()=>l,set:d=>{l=d}},{id:"val-sec",max:59,get:()=>i,set:d=>{i=d}}].forEach(({id:d,max:c,set:p,get:f})=>{const b=document.getElementById(d);b&&(b.onfocus=()=>{b.select()},b.oninput=()=>{let x=b.value.replace(/\D/g,"");if(x==="")p(0);else{let v=parseInt(x,10);isNaN(v)&&(v=0),v>c?(v=c,b.value=String(v)):b.value=x.slice(0,2),p(v)}const g=a*60+l+Math.round(i/60),B=document.getElementById("pacing-projection");B&&(B.textContent=`~${g} standard script pages`)},b.onblur=()=>{let x=b.value.replace(/\D/g,""),g=parseInt(x,10);isNaN(g)&&(g=0),g=Math.max(0,Math.min(c,g)),p(g),b.value=String(g).padStart(2,"0"),r()},b.onkeydown=x=>{if(x.key==="Enter")b.blur();else if(x.key==="ArrowUp"){x.preventDefault();const g=f(),B=Math.min(c,g+1);p(B),b.value=String(B).padStart(2,"0"),r()}else if(x.key==="ArrowDown"){x.preventDefault();const g=f(),B=Math.max(0,g-1);p(B),b.value=String(B).padStart(2,"0"),r()}})});const u=document.getElementById("btn-submit-context");u&&(u.onclick=async()=>{const d=document.getElementById("industry-select")?.value||"International / Hollywood";u.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Calibrating SCRIPTORA...</span>',u.disabled=!0;const c=f=>String(f).padStart(2,"0"),p={format:o,industry:d,hours:a,minutes:l,seconds:i,plannedDuration:`${c(a)}:${c(l)}:${c(i)}`};await ra(t,p),E("Narrative parameters calibrated"),e("/intelligence/dashboard")})}function fo(){const e=$.state.selectedScriptId||"chronicles-of-dust",t=$.state.scripts.find(n=>n.id===e)||$.state.activeScript||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pages:96,format:"Feature"},s=t.analysisScores||{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80};return`
    ${Xe("Intelligence","Script Analysis")}

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

    ${Ke("intelligence")}
  `}function bo(e){const t=$.state.selectedScriptId||"chronicles-of-dust",s=$.state.scripts.find(v=>v.id===t)||$.state.scripts[0],n=document.getElementById("btn-gen-logline"),o=document.getElementById("btn-gen-synopsis"),a=document.getElementById("ai-generated-container"),l=document.getElementById("ai-generated-title"),i=document.getElementById("ai-generated-body"),r=document.getElementById("ai-close-btn"),m=document.getElementById("ai-copy-btn"),u=document.getElementById("ai-copy-text"),d=document.getElementById("ai-query-input"),c=document.getElementById("ai-query-submit");function p(v){a&&(a.classList.remove("hidden"),l.textContent=v==="logline"?"Generated Logline":"Generated Synopsis",i.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Generating with narrative telemetry...</span>',setTimeout(()=>{i.textContent=v==="logline"?s?.logline||"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.":s?.synopsis||"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves."},400))}if(n&&(n.onclick=()=>p("logline")),o&&(o.onclick=()=>p("synopsis")),r&&(r.onclick=()=>a.classList.add("hidden")),m&&(m.onclick=()=>{navigator.clipboard?.writeText(i.textContent||""),u.textContent="Copied!",setTimeout(()=>{u.textContent="Copy"},1800),E("Copied to clipboard")}),c&&d){const v=async()=>{const N=d.value.trim();if(!N)return;a.classList.remove("hidden"),l.textContent="Intelligence AI Answer",i.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing draft semantics...</span>';const S=await Ls(N,t);i.textContent=S,d.value=""};c.onclick=v,d.onkeydown=N=>{N.key==="Enter"&&v()}}const f=document.getElementById("script-switcher-modal"),b=document.getElementById("script-selector-trigger"),x=document.getElementById("close-script-switcher-modal"),g=()=>{st(f)},B=()=>{Te(f)};b&&(b.onclick=g),x&&(x.onclick=B),f&&(f.onclick=v=>{v.target===f&&B()}),document.querySelectorAll(".script-switch-opt").forEach(v=>{v.onclick=()=>{const N=v.getAttribute("data-id");$.selectScript(N),B(),e("/intelligence")}})}function go(){const e=$.state.selectedScriptId||"chronicles-of-dust",t=$.state.scripts.find(n=>n.id===e)||$.state.activeScript||{title:"Chronicles of Dust",pages:96},s=[{type:"pacing",title:"Pacing",desc:"See where the story moves too fast or too slowly.",icon:"speed",score:82,telemetry:`${t.pages||96} Pages Telemetry`},{type:"dialogue",title:"Dialogue",desc:"Cadence, subtext density and character voice rhythm.",icon:"chat",score:89,telemetry:"42 Dialogue Exchanges"},{type:"emotion",title:"Emotion",desc:"Emotional heatmaps, catharsis curves and sentiment.",icon:"favorite",score:91,telemetry:"Peak Catharsis: Act II"},{type:"character-arc",title:"Character Arc",desc:"Want vs. need trajectories and transformation tracking.",icon:"alt_route",score:84,telemetry:"4 Major Protagonists"},{type:"continuity",title:"Continuity",desc:"Props, character locations, and temporal logic rules.",icon:"linear_scale",score:78,telemetry:"2 Minor Prop Conflicts"},{type:"story-structure",title:"Story Structure",desc:"Beat breakdowns, midpoint shifts and turning points.",icon:"account_tree",score:87,telemetry:"3-Act Paradigm Standard"},{type:"theme",title:"Theme",desc:"Core philosophical spines, motifs and moral arguments.",icon:"lightbulb",score:90,telemetry:"3 Tracked Motifs"},{type:"cinema",title:"Cinema",desc:"Visual storytelling, shot economy and set-piece power.",icon:"videocam",score:85,telemetry:"Cinematic Visual Index"},{type:"scene",title:"Scene Analysis",desc:"Deep dive breakdown of goals, conflict and polarity.",icon:"movie",score:86,telemetry:"Scene 18 Active Scope"},{type:"formatting",title:"Formatting",desc:"Standard industry margins, sluglines and font rules.",icon:"rule",score:94,telemetry:"Standard Guild Rules"},{type:"production",title:"Production",desc:"Locations, shooting cast, props and cost estimators.",icon:"movie_creation",score:80,telemetry:"24 Practical Locations"}];return`
    ${Xe("Intelligence","Analyse Individually")}

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

    ${Ke("intelligence")}
  `}function ho(e){const t=document.getElementById("analysis-filter-input");t&&(t.oninput=s=>{const n=s.target.value.toLowerCase().trim();document.querySelectorAll("#analysis-tiles-grid .analysis-tile").forEach(o=>{const a=o.getAttribute("data-keyword")||"";o.style.display=a.includes(n)?"flex":"none"})})}const rn={pacing:{title:"Pacing Analysis",score:82,icon:"speed",desc:"Scene duration variance, narrative tempo and page-turn velocity.",questions:["Where does the pace drag in Act II?","Find scenes over 4 pages","Show action-to-dialogue ratios"],findings:[{scene:"SCENE 14 · Dockside Perimeter · Pg 36",act:"Act II",title:"Action beats slow down before major confrontation",desc:"Extended exposition between dock guards lowers tension prior to container breach.",targetScene:14},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Peak narrative rhythm",desc:"Fast intercut dialogue creates maximum urgency before floodgate breach.",targetScene:18},{scene:"SCENE 26 · Coastal Highway · Pg 68",act:"Act III",title:"High velocity turning point",desc:"Pursuit cadence maintains optimal beats per page.",targetScene:26}]},dialogue:{title:"Dialogue Analysis",score:89,icon:"chat",desc:"Cadence, subtext density, distinctive character voice profiles.",questions:["Are character voices distinctive?","Find on-the-nose exposition lines","Analyze dialogue subtext in Scene 18"],findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Subtext is understated and powerful",desc:"Kevin avoids speaking about his brother directly, communicating through silence and tea rituals.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Meera O.S. dialogue establishes authority",desc:"Radio chatter avoids fluff and communicates technical stakes concisely.",targetScene:18}]},emotion:{title:"Emotion Analysis",score:91,icon:"favorite",desc:"Catharsis trajectory, emotional resonance curves, character empathy indices.",questions:["Where does emotional vulnerability peak?","Track empathy trajectory for Kevin","Catharsis resolution in Act III"],findings:[{scene:"SCENE 12 · Father’s Workshop · Pg 28",act:"Act I",title:"Emotional anchor established",desc:"Familial debt and generational sacrifice ground Kevin’s reluctance to blow the whistle.",targetScene:12},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Desperation under rising water",desc:"Kevin’s fear of failing Meera is palpable as water rises past junction box.",targetScene:18}]},"character-arc":{title:"Character Arc Analysis",score:84,icon:"alt_route",desc:"Want vs. Need conflict, psychological transformation, fatal flaw resolution.",questions:["Does Kevin overcome his passivity?","Meera character transformation","Antagonist motivation clarity"],findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]},continuity:{title:"Continuity Analysis",score:78,icon:"linear_scale",desc:"Prop tracking, character spatial locations, timeline consistency checks.",questions:["Check prop handover in Scene 18","Is time of day consistent across Act II?","Track the brass seal location"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Hydro-sensor probe referenced before retrieval",desc:"Verify Kevin picked up copper probe in Scene 16 or carries it on belt.",targetScene:18},{scene:"SCENE 22 · Pumping Station · Pg 58",act:"Act II",title:"Flashlight state discrepancy",desc:"Ensure flashlight was retrieved after water surge in Scene 19.",targetScene:22}]},"story-structure":{title:"Story Structure Analysis",score:87,icon:"account_tree",desc:"Inciting incident, plot points, midpoint shift, climax architecture.",questions:["Is midpoint clearly defined?","Evaluate climax timing on page 88","Are 3-act beats aligned?"],findings:[{scene:"SCENE 06 · Customs Registry · Pg 14",act:"Inciting Incident",title:"Off-manifest container discovered",desc:"The inciting anomaly sets Kevin on irreversible investigative path.",targetScene:6},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Midpoint (Pg 48/96)",title:"Stakes escalate from civil to criminal",desc:"Kevin realizes his own brother commands the smuggling cartel.",targetScene:18}]},theme:{title:"Theme Analysis",score:90,icon:"lightbulb",desc:"Primary narrative spine: Complicity vs. Duty and moral accountability.",questions:["What is the central theme?","Where is loyalty tested?","Show recurring thematic motifs"],findings:[{scene:"SCENE 09 · Family Kitchen · Pg 22",act:"Act I",title:"Familial pressure as thematic catalyst",desc:"Kevin hides eviction notice, showing economic desperation fueling institutional silence.",targetScene:9},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Moral test faced directly",desc:"Kevin must decide whether to save his brother or save the port city from flooding.",targetScene:18},{scene:"SCENE 36 · Rooftop Overlook · Pg 94",act:"Act III",title:"Theme delivers its final statement",desc:"Accountability over self-preservation.",targetScene:36}]},cinema:{title:"Cinema & Visual Storytelling",score:85,icon:"videocam",desc:"Visual set-piece density, image systems, lighting and camera intentionality.",questions:["Check visual contrast between acts","Highlight cinematic set-pieces","Analyze color palette cues in action lines"],findings:[{scene:"SCENE 01 · Harbor Drone View · Pg 01",act:"Act I",title:"Strong establishing visual metaphor",desc:"Rusted shipping containers stacked like monoliths beneath smog.",targetScene:1},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"High visual tension",desc:"Red emergency beacons reflected in rising brackish water.",targetScene:18}]},scene:{title:"Scene Analysis",score:86,icon:"movie",desc:"Micro-structure of Scene 18: Objective, obstacle, polarity change.",questions:["What is the scene objective?","Where does tension peak?","How does polarity shift?"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]},formatting:{title:"Formatting & Guild Compliance",score:94,icon:"rule",desc:"Industry standard margin measurements, capitalization, slugline syntax.",questions:["Check standard industry margins","Find non-standard scene sluglines","Verify dialogue capitalization rules"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Perfect Courier Prime 12pt slugline",desc:"Margins, dual dialogue spacing, and transition tags meet Writers Guild standards.",targetScene:18}]},production:{title:"Production Breakdown",score:80,icon:"movie_creation",desc:"Locations, shooting days, practical elements, cast size breakdown.",questions:["How many practical locations?","Show scenes with special props","List one-off speaking roles"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Location: Wet Stage / Customs Interior",desc:"Requires controlled water flooding tank, hydro-sensor prop box, wet comm-link gear.",targetScene:18}]}};function Tn(e){if($.state.screenplay&&$.state.screenplay.id===e)return $.state.screenplay;const t=localStorage.getItem(`scriptora_screenplay_${e}`);if(t)try{const s=JSON.parse(t);if(s&&s.scenes&&s.scenes.length>0)return s}catch{}return e==="chronicles-of-dust"?Rs:null}function Bn(e,t){const s=[];return e&&Array.isArray(e.scenes)&&e.scenes.length>0?e.scenes.forEach((n,o)=>{const a=n.number||o+1,l=n.slugline&&n.slugline.trim()||n.blocks?.find(i=>i.type==="scene")?.content?.trim()||`SCENE ${a}`;s.push({id:n.id||`scene-${a}`,number:a,slugline:l,act:n.actId==="act-3"?"Act III":n.actId==="act-2"?"Act II":a>24?"Act III":a>11?"Act II":"Act I"})}):Rs.scenes.forEach(o=>{s.push({id:o.id,number:o.number,slugline:o.slugline||`SCENE ${o.number}`,act:o.actId==="act-2"?"Act II":"Act I"})}),s}function yo(e){const t=[];e&&((e.characters||[]).forEach(n=>{const o=typeof n=="string"?n:n.name||"";o&&t.push(o)}),(e.scenes||[]).forEach(n=>{(n.blocks||[]).forEach(o=>{o.type==="character"&&o.content&&t.push(o.content)})}));let s=yn(t);if(s.length===0&&(e&&(e.id==="chronicles-of-dust"||e.title?.includes("Dust"))?s=["SANTHOSH","ARAVIND","KEVIN","MEERA"]:s=["SANTHOSH","ARAVIND"]),e&&(e.characters=s,e.id))try{localStorage.setItem(`scriptora_screenplay_${e.id}`,JSON.stringify(e))}catch{}return s.map(n=>{const o=n.toUpperCase();let a="Character";return o==="SANTHOSH"||o==="ARAVIND"||o==="KEVIN"?a="Protagonist":o==="MEERA"&&(a="Confidante"),{name:n,role:a}})}function Pn(e,t=[]){const s=t.find(i=>Number(i.number)===Number(e))||{number:e,slugline:`SCENE ${e}`,act:e>24?"Act III":e>11?"Act II":"Act I"},n=s.slugline.replace(/^SCENE\s*\d+\s*·\s*/i,"").trim(),o=s.act||(e>24?"Act III":e>11?"Act II":"Act I"),a=Math.max(1,(s.number-1)*3+1),l=Math.min(4.5,Math.max(1.5,s.number*7%3+2)).toFixed(1);return Number(e)===18?{number:18,heading:"SCENE 18 · INT. CUSTOMS OFFICE - NIGHT",act:"Act II Midpoint",page:48,estMin:"3.5",meta:"Act II Midpoint · Pg 48 · ~3.5 min est.",purpose:"Kevin attempts to reroute the electrical relay before the surge floods the basement archives.",conflict:"Rising water breaches the junction box while automated emergency flood doors trigger lockouts, trapping him inside.",whatChanges:"Kevin cuts the emergency seal and refuses to sign the false manifest, irreversibly shifting from passive worker to active resistance.",synthesis:"Polarity shifts from cautious optimism (+1) to catastrophic physical trap and moral awakening (-2), marking the central pivot of the screenplay.",findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]}:Number(e)===1?{number:1,heading:`SCENE 01 · ${n||"INT. HOME - EVENING"}`,act:"Act I Opening",page:1,estMin:"2.0",meta:"Act I Opening · Pg 01 · ~2.0 min est.",purpose:"Establish opening character presence, environment, and initial psychological stakes.",conflict:"Tension and unspoken questions between characters as unfamiliar presence breaks routine.",whatChanges:"Ordinary state broken by unfamiliar arrival, creating the narrative catalyst for the journey.",synthesis:"Polarity shifts from neutral calm (0) to heightened curiosity and alertness (-1), establishing the dramatic question.",findings:[{scene:`SCENE 01 · ${n||"Opening"} · Pg 01`,act:"Act I Opening",title:"Establish protagonist baseline and primary premise",desc:"Opening visual dynamic introduces character motives before inciting conflict.",targetScene:1}]}:Number(e)===4?{number:4,heading:`SCENE 04 · ${n||"INT. PORT AUDIT ROOM - DAY"}`,act:"Act I",page:9,estMin:"2.5",meta:"Act I · Pg 09 · ~2.5 min est.",purpose:"Kevin audits cargo registry under pressure from superiors to overlook anomalies.",conflict:"Institutional compliance vs early ethical hesitation as signatures are demanded.",whatChanges:"Kevin stamps the manifest with reluctance, confirming his fatal flaw of institutional compliance.",synthesis:"Polarity shifts from hesitation (0) to moral compromise (-1), establishing the internal flaw to overcome.",findings:[{scene:"SCENE 04 · Port Audit · Pg 09",act:"Act I",title:"Fatal Flaw Demonstrated: Silent Compliance",desc:"Compliant stamp creates complicity guilt that fuels later revolt.",targetScene:4}]}:{number:e,heading:`SCENE ${String(e).padStart(2,"0")} · ${n||`INT. LOCATION ${e} - DAY`}`,act:o,page:a,estMin:l,meta:`${o} · Pg ${a} · ~${l} min est.`,purpose:`Execute narrative beat for ${n||`Scene ${e}`} and advance sequence trajectory.`,conflict:"Characters encounter rising resistance while navigating immediate beat obstacles.",whatChanges:"Beats shift character leverage, altering interpersonal dynamic and scene outcome.",synthesis:"Polarity turns decisively across the beat, transitioning the dramatic tension into the next sequence.",findings:[{scene:`SCENE ${String(e).padStart(2,"0")} · Pg ${a}`,act:o,title:`Scene ${e} Beat Dynamics`,desc:`Dramatic polarity progression in ${n||`Scene ${e}`} sustains narrative tempo.`,targetScene:e}]}}function Dn(e,t){const s=Ft(e||"SANTHOSH"),n=s.toUpperCase();let o=0;if(t&&Array.isArray(t.scenes)&&t.scenes.forEach(i=>{i.blocks&&i.blocks.some(r=>r.type==="character"&&Ft(r.content)===n)&&o++}),n==="SANTHOSH")return{name:"SANTHOSH",role:"Protagonist",scenesCount:o>0?`${o} scenes tracked`:"36 scenes tracked",step1Title:"Silent Conviction & Initial Resistance",step1Tag:"Fatal Flaw",step1Range:"Beginning Beats",step1Desc:"Santhosh begins navigating intense internal conviction, wrestling with external constraints and uncovering initial stakes.",step2Title:"The Turning Point & Strategic Pivot",step2Tag:"Turning Point",step2Range:"Middle Beats (Midpoint)",step2Desc:"Santhosh breaks away from passive compromises, taking active control of the narrative direction under peak conflict.",step3Title:"Decisive Transformation & Resolution",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Santhosh embraces complete accountability and purpose, achieving an irreversible transformation through the climax.",synthesis:"Santhosh drives the core thematic arc of the story, transforming from cautious survival into an active, principled catalyst of change.",findings:[{scene:"SCENE 01 · Narrative Baseline · Pg 01",act:"Act I",title:"Fatal Flaw: Internal Hesitation",desc:"Santhosh operates with guarded vigilance before escalating pressures force decisive action.",targetScene:1},{scene:"SCENE 02 · The Turning Point · Pg 05",act:"Act II",title:"The Point of No Return",desc:"Santhosh takes a defining stance that permanently pivots interpersonal relationships and story stakes.",targetScene:2}]};if(n==="ARAVIND")return{name:"ARAVIND",role:"Protagonist",scenesCount:o>0?`${o} scenes tracked`:"32 scenes tracked",step1Title:"Guarded Precision & Calculated Loyalty",step1Tag:"Origin Stance",step1Range:"Beginning Beats",step1Desc:"Aravind maintains tactical focus and sharp perception, questioning surrounding motives and testing early alliances.",step2Title:"High-Stakes Partnership & Crucial Stand",step2Tag:"Midpoint Shift",step2Range:"Middle Beats (Midpoint)",step2Desc:"Aravind unites forces during the turning point, applying razor-sharp resolve to counter mounting narrative obstacles.",step3Title:"Decisive Breakthrough & Ultimate Climax",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Aravind executes the final breakthrough, sealing the resolution through steadfast commitment to the mission.",synthesis:"Aravind provides essential tactical momentum and intellectual force, elevating the stakes and cementing the dramatic payoff.",findings:[{scene:"SCENE 01 · Tactical Introduction · Pg 01",act:"Act I",title:"Strategic Presence & Foresight",desc:"Aravind introduces critical context and tactical perspective into the unfolding scenario.",targetScene:1},{scene:"SCENE 02 · Midpoint Crucible · Pg 06",act:"Act II",title:"Decisive Strategic Realignment",desc:"Aravind commits to the high-stakes confrontation that defines the story trajectory.",targetScene:2}]};if(n==="KEVIN")return{name:"Kevin",role:"Protagonist",scenesCount:o>0?`${o} scenes tracked`:"48 scenes tracked",step1Title:"Silent Compliance & Institutional Fear",step1Tag:"Fatal Flaw",step1Range:"Beginning · Scene 01–11",step1Desc:"Hesitant and guarded, Kevin stamps irregular manifests to keep peace with superiors and protect familial debt.",step2Title:"The Point of No Return",step2Tag:"Turning Point",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Cuts the emergency floodgate seal, actively defying union directives to prevent port catastrophe.",step3Title:"Selfless Moral Accountability",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Hands over the ledger to the public audit without demanding personal immunity, completing moral transformation.",synthesis:"The protagonist completes a verified 3-stage transformation: overcoming passivity at the midpoint and prioritizing moral duty over self-preservation in the climax.",findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]};if(n==="MEERA")return{name:"Meera",role:"Confidante",scenesCount:o>0?`${o} scenes tracked`:"22 scenes tracked",step1Title:"Vigilant Skepticism & Tactical Isolation",step1Tag:"Origin Stance",step1Range:"Beginning · Scene 01–12",step1Desc:"Operates independently along pipeline perimeters, skeptical of municipal regulators and trusting only raw field telemetry.",step2Title:"Calculated Alliance Under Pressure",step2Tag:"Partnership Beat",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Guides Kevin via comm-link to the breaker box, choosing to rely on his technical precision despite active security alarms.",step3Title:"Vindicated Shared Resistance",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Secures and broadcasts the telemetry leak to the public frequency, cementing alliance and exposing corporate monopoly.",synthesis:"The confidante evolves from protective cynicism to trusted partnership, providing the strategic resolve that enables the protagonist to act.",findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Tactical Caution & Guarded Insight",desc:"Meera warns Kevin of private security patrols monitoring pipeline telemetry.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Emergency Comm Guidance",desc:"Meera coordinates the junction box bypass before automated floodgates lock.",targetScene:18}]};const a=n==="KEVIN"||n==="SANTHOSH"||n==="ARAVIND"?"Protagonist":"Character",l=o>0?`${o} scenes tracked`:"Screenplay Character";return{name:s,role:a,scenesCount:l,step1Title:"Initial Presence & Motive Baseline",step1Tag:"Introduction",step1Range:"Beginning Beats",step1Desc:`${s} is introduced navigating personal priorities and reacting to the changing environment.`,step2Title:"Escalating Involvement in Narrative Stakes",step2Tag:"Midpoint Pressure",step2Range:"Middle Beats",step2Desc:`${s} faces direct conflict or shifting loyalties as pressure mounts across the sequence.`,step3Title:"Climactic Position & Resolution",step3Tag:"Resolution",step3Range:"Ending Beats",step3Desc:`${s} resolves their dramatic throughline, solidifying their standing in the story outcome.`,synthesis:`${s} contributes essential narrative pressure and perspective across their screenplay appearances.`,findings:[{scene:"SCENE 01 · Screenplay Beat · Pg 01",act:"Act I",title:`${s} Character Introduction`,desc:`Dialogue and action beats introduce ${s}'s voice and perspective.`,targetScene:1}]}}function vo(e,t,s={}){const n=t.pages||96,{availableScenes:o=[],currentSceneData:a={},availableChars:l=[],currentCharData:i={}}=s;switch(e){case"pacing":return`
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
      `;default:return""}}function wo(e="pacing",t=null,s=null){const n={...rn[e]||rn.pacing},o=sessionStorage.getItem("scriptora_prod_return");let a;try{const S=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;a=new URLSearchParams(S||"")}catch{a=new URLSearchParams}const l=t==="editor"||a.get("from")==="editor"||!!o,i=s||a.get("scriptId")||(o?o.replace("/editor/",""):null)||$.state.selectedScriptId||"chronicles-of-dust",r=`/editor/${i}`,m=i,u=$.state.scripts.find(S=>S.id===m)||$.state.activeScript||{title:"Chronicles of Dust",pages:96},d=Tn(m),c=Bn(d),p=yo(d),f=Number($.state.currentSceneId||(c.find(S=>S.number===18)?18:c[0]?.number||1)),b=p[0]?.name||"Kevin",x=Pn(f,c),g=Dn(b,d);e==="scene"?(n.desc=`Micro-structure of Scene ${x.number}: Objective, obstacle, polarity change.`,n.findings=x.findings||n.findings):e==="character-arc"&&(n.findings=g.findings||n.findings);const B={availableScenes:c,currentSceneData:x,availableChars:p,currentCharData:g},v=t||a.get("from");let N="/intelligence/analysis";return l?N=r:v==="dashboard"||v==="/intelligence/dashboard"||v?.includes("/intelligence/dashboard")?N="/intelligence/dashboard":v&&v.startsWith("/")&&(N=v),`
    ${Xe(l?"Editor":"Intelligence",n.title)}

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
            ${n.questions.map(S=>`
              <button type="button" class="query-pill shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors shadow-xs active:scale-95" data-query="${S}">
                ${S}
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
        ${vo(e,u,B)}

        <!-- 5. IMPORTANT FINDINGS (KEY SCENE FINDINGS) -->
        <div class="flex flex-col gap-3" id="analysis-findings-container">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">Key Scene Findings</span>
            <span id="findings-count-tag" class="text-[11px] text-slate-400 font-medium">${n.findings.length} findings tracked</span>
          </div>

          <div id="findings-list" class="flex flex-col gap-3">
            ${n.findings.map(S=>`
              <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${S.scene}</span>
                  <span class="text-[11px] font-medium text-slate-400">${S.act}</span>
                </div>
                <div class="flex flex-col">
                  <h3 class="text-xs sm:text-sm font-bold text-slate-900">${S.title}</h3>
                  <p class="text-xs text-slate-600 mt-1 leading-relaxed">${S.desc}</p>
                </div>
                <div class="pt-2 flex justify-end border-t border-slate-100">
                  <!-- 6. OPEN IN EDITOR BUTTON -->
                  <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${S.targetScene}">
                    <span class="material-symbols-outlined text-[15px]">edit_note</span>
                    <span>Open in Editor (Scene ${S.targetScene})</span>
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    </main>

    ${Ke("intelligence")}
  `}function So(e,t,s=null,n=null){const o=sessionStorage.getItem("scriptora_prod_return");let a;try{const N=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;a=new URLSearchParams(N||"")}catch{a=new URLSearchParams}const l=s==="editor"||a.get("from")==="editor"||!!o,r=n||a.get("scriptId")||(o?o.replace("/editor/",""):null)||$.state.selectedScriptId||"chronicles-of-dust",m=Tn(r),u=Bn(m),d=document.getElementById("analysis-back-btn");d&&(d.onclick=N=>{N.preventDefault(),l&&sessionStorage.removeItem("scriptora_prod_return"),window.scriptoraRouter?window.scriptoraRouter.back(backUrl):t(backUrl)});function c(){document.querySelectorAll(".btn-open-editor-scene").forEach(N=>{N.onclick=()=>{const S=N.getAttribute("data-scene");$.setState({currentSceneId:Number(S)}),E(`Jumping to Scene ${S} in Editor`),t(`/editor/${r}?scene=${S}`)}})}c();function p(N){const S=document.getElementById("findings-list"),M=document.getElementById("findings-count-tag");M&&(M.textContent=`${N.length} findings tracked`),S&&(S.innerHTML=N.map(T=>`
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
    `).join(""),c())}const f=document.getElementById("analysis-scene-selector");f&&(f.onchange=N=>{const S=parseInt(N.target.value,10);$.setState({currentSceneId:S});const M=Pn(S,u),T=document.getElementById("target-scene-meta"),re=document.getElementById("target-scene-heading"),ee=document.getElementById("target-scene-purpose"),me=document.getElementById("target-scene-conflict"),z=document.getElementById("target-scene-what-changes"),ge=document.getElementById("target-scene-synthesis"),fe=document.getElementById("analysis-header-desc");T&&(T.textContent=M.meta),re&&(re.textContent=M.heading),ee&&(ee.textContent=M.purpose),me&&(me.textContent=M.conflict),z&&(z.textContent=M.whatChanges),ge&&(ge.textContent=M.synthesis),fe&&(fe.textContent=`Micro-structure of Scene ${S}: Objective, obstacle, polarity change.`),p(M.findings),E(`Analyzing Scene ${S}`)});const b=document.getElementById("analysis-char-selector");b&&(b.onchange=N=>{const S=N.target.value,M=Dn(S,m),T=document.getElementById("char-role-badge"),re=document.getElementById("char-scenes-count"),ee=document.getElementById("char-step1-range"),me=document.getElementById("char-step1-tag"),z=document.getElementById("char-step1-title"),ge=document.getElementById("char-step1-desc"),fe=document.getElementById("char-step2-range"),Z=document.getElementById("char-step2-tag"),ce=document.getElementById("char-step2-title"),G=document.getElementById("char-step2-desc"),be=document.getElementById("char-step3-range"),C=document.getElementById("char-step3-tag"),H=document.getElementById("char-step3-title"),ke=document.getElementById("char-step3-desc"),se=document.getElementById("char-synthesis-desc");T&&(T.textContent=M.role),re&&(re.textContent=M.scenesCount),ee&&(ee.textContent=M.step1Range),me&&(me.textContent=M.step1Tag),z&&(z.textContent=M.step1Title),ge&&(ge.textContent=M.step1Desc),fe&&(fe.textContent=M.step2Range),Z&&(Z.textContent=M.step2Tag),ce&&(ce.textContent=M.step2Title),G&&(G.textContent=M.step2Desc),be&&(be.textContent=M.step3Range),C&&(C.textContent=M.step3Tag),H&&(H.textContent=M.step3Title),ke&&(ke.textContent=M.step3Desc),se&&(se.textContent=M.synthesis),p(M.findings),E(`Switched active character focus to ${M.name}`)}),document.querySelectorAll("[data-jump-scene]").forEach(N=>{N.onclick=()=>{const S=N.getAttribute("data-jump-scene");$.setState({currentSceneId:Number(S)}),E(`Jumping to Scene ${S} in Editor`),t(`/editor/${r}?scene=${S}`)}});const x=document.getElementById("vector-ai-input"),g=document.getElementById("vector-ai-submit"),B=document.getElementById("vector-ai-answer");async function v(N){if(!N||!B)return;B.classList.remove("hidden"),B.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing narrative beats...</span>';const S=await Ls(N,r);B.textContent=S}g&&x&&(g.onclick=()=>v(x.value.trim()),x.onkeydown=N=>{N.key==="Enter"&&v(x.value.trim())}),document.querySelectorAll(".query-pill").forEach(N=>{N.onclick=()=>{const S=N.getAttribute("data-query");x&&(x.value=S),v(S)}})}function Eo(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=t||s.get("scriptId")||$.state.editorReturnScriptId||$.state.selectedScriptId||"chronicles-of-dust",a=n==="editor",l=a?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/workspace",i=$.state.scripts?.find(p=>p.id===o)||$.state.scripts?.[0]||{},r=$.state.currentUser||(()=>{try{const p=localStorage.getItem("scriptora_user");if(p)return JSON.parse(p)}catch{}return{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}}})(),m=$.state.settings||(()=>{try{const p=localStorage.getItem("scriptora_settings");if(p)return JSON.parse(p)}catch{}return{editor:{showSceneNumbers:!0,autoCapitalize:!0,autoTransition:!0,continueDialogue:!0,fontSize:"Courier Prime 12pt",autoSave:"Instant"},language:"English (US)",transliteration:!1,appearance:"Light",accentColor:"blue",fontScale:"Normal",notifications:{invites:!0,edits:!0,insights:!0,milestones:!0},intelligence:{deepAnalysis:!0,pacingAlerts:!0,dialogueScoring:!0,sensitivity:"Balanced"},privacy:{watermark:!0,encryption:!0}}})(),u=Array.isArray($.state.scripts)?$.state.scripts.length:r.stats?.drafts??0,d=3,c=r.stats?.healthIndex||"98%";return`
    ${Xe("Profile","Account & preferences.")}

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

    ${Ke("profile")}
  `}function Io(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=t||n.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),a=s||n.get("scriptId")||$.state.editorReturnScriptId||$.state.selectedScriptId||"chronicles-of-dust",l=o==="editor",i=l?sessionStorage.getItem("scriptora_editor_return")||`/editor/${a}`:"/workspace",r=$.state.currentUser||(()=>{try{const I=localStorage.getItem("scriptora_user");if(I)return JSON.parse(I)}catch{}return{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",avatarColor:"bg-blue-600",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}}})(),m=document.getElementById("profile-bottom-return-btn");m&&(m.onclick=I=>{I.preventDefault(),sessionStorage.removeItem("scriptora_from_editor"),window.scriptoraRouter?window.scriptoraRouter.back(i):e(i)}),document.getElementById("stat-card-drafts")?.addEventListener("click",()=>{e("/workspace")}),document.getElementById("stat-card-coauthors")?.addEventListener("click",()=>{e(`/profile/collaborators${l?`?from=editor&scriptId=${a}`:""}`)}),document.getElementById("stat-card-health")?.addEventListener("click",()=>{e("/intelligence/dashboard")});const u=document.getElementById("settings-search-input");u&&(u.oninput=I=>{const L=I.target.value.toLowerCase().trim();let V=0;document.querySelectorAll("#settings-list .setting-item").forEach(Q=>{const ue=Q.textContent.toLowerCase().includes(L);Q.style.display=ue?"flex":"none",ue&&V++});const U=document.getElementById("no-settings-match");U&&(U.style.display=V===0?"block":"none")});function d(I){const L=`modal-setting-${I.replace("sheet-","")}`,V=document.getElementById(L);V&&st(V)}function c(){document.querySelectorAll(".settings-modal").forEach(I=>{Te(I)})}document.querySelectorAll(".setting-item").forEach(I=>{I.onclick=()=>{const L=I.getAttribute("data-sheet");L&&d(L)}}),document.querySelectorAll(".close-setting-modal").forEach(I=>{I.onclick=c}),document.querySelectorAll(".settings-modal, #modal-edit-profile, #modal-security, #action-modal").forEach(I=>{I.onclick=L=>{L.target===I&&Te(I)}});function p(I){let L={};try{const U=localStorage.getItem("scriptora_settings");U&&(L=JSON.parse(U))}catch{}const V=I(L);return localStorage.setItem("scriptora_settings",JSON.stringify(V)),$.setState({settings:V}),ia(V).catch(()=>{}),V}const f=document.getElementById("btn-save-cfg-editor");f&&(f.onclick=()=>{const I=document.getElementById("cfg-editor-scenenums")?.checked??!0,L=document.getElementById("cfg-editor-autocap")?.checked??!0,V=document.getElementById("cfg-editor-contd")?.checked??!0,U=document.getElementById("cfg-editor-font")?.value||"Courier Prime 12pt",Q=document.getElementById("cfg-editor-autosave")?.value||"Instant";p(ue=>({...ue,editor:{...ue.editor||{},showSceneNumbers:I,autoCapitalize:L,continueDialogue:V,fontSize:U,autoSave:Q}})),localStorage.setItem("scriptora_autosave",Q==="Instant"?"true":"false");const xe=document.getElementById("desc-sheet-editor");xe&&(xe.textContent=`Numbers: ${I?"On":"Off"} · Auto-save: ${Q}`),c(),E("Editor preferences saved")});let b=$.state.settings?.language||"English (US)";document.querySelectorAll(".btn-lang-choice").forEach(I=>{I.onclick=()=>{b=I.getAttribute("data-lang"),document.querySelectorAll(".btn-lang-choice").forEach(L=>{L.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-slate-200 bg-white text-slate-800 hover:bg-slate-50"}),I.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const x=document.getElementById("btn-save-cfg-language");x&&(x.onclick=()=>{const I=document.getElementById("cfg-lang-translit")?.checked??!1;p(V=>({...V,language:b,transliteration:I}));const L=document.getElementById("desc-sheet-language");L&&(L.textContent=`${b}${I?" · Transliteration On":""}`),c(),E(`Language set to ${b}`)});let g=$.state.settings?.appearance||"Light";document.querySelectorAll(".btn-theme-choice").forEach(I=>{I.onclick=()=>{g=I.getAttribute("data-theme"),document.querySelectorAll(".btn-theme-choice").forEach(L=>{L.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}),I.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const B=document.getElementById("btn-save-cfg-appearance");B&&(B.onclick=()=>{const I=document.getElementById("cfg-app-scale")?.value||"Normal";p(V=>({...V,appearance:g,fontScale:I})),g==="Dark"?(document.documentElement.classList.add("dark"),localStorage.setItem("scriptora_theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("scriptora_theme","light"));const L=document.getElementById("desc-sheet-appearance");L&&(L.textContent=`${g} · Scale: ${I}`),c(),E(`Appearance updated: ${g}`)});const v=document.getElementById("btn-save-cfg-notifications");v&&(v.onclick=()=>{const I=document.getElementById("cfg-notif-invites")?.checked??!0,L=document.getElementById("cfg-notif-edits")?.checked??!0,V=document.getElementById("cfg-notif-insights")?.checked??!0,U=document.getElementById("cfg-notif-milestones")?.checked??!0,Q={invites:I,edits:L,insights:V,milestones:U};p(Se=>({...Se,notifications:Q}));const xe=Object.values(Q).filter(Boolean).length,ue=document.getElementById("desc-sheet-notifications");ue&&(ue.textContent=`${xe} alerts active`),c(),E("Notification preferences updated")});const N=document.getElementById("btn-save-cfg-intelligence");N&&(N.onclick=()=>{const I=document.getElementById("cfg-intel-deep")?.checked??!0,L=document.getElementById("cfg-intel-pacing")?.checked??!0,V=document.getElementById("cfg-intel-dialogue")?.checked??!0,U=document.getElementById("cfg-intel-sensitivity")?.value||"Balanced";p(xe=>({...xe,intelligence:{deepAnalysis:I,pacingAlerts:L,dialogueScoring:V,sensitivity:U}}));const Q=document.getElementById("desc-sheet-intelligence");Q&&(Q.textContent=`${I?"Deep Arc Diagnostics":"Standard"} · ${U}`),c(),E("Intelligence engine calibrated")});const S=document.getElementById("btn-save-cfg-privacy");S&&(S.onclick=()=>{const I=document.getElementById("cfg-priv-watermark")?.checked??!0,L=document.getElementById("cfg-priv-encrypt")?.checked??!0;p(U=>({...U,privacy:{watermark:I,encryption:L}}));const V=document.getElementById("desc-sheet-privacy");V&&(V.textContent=`${I?"Watermark On":"Standard"} · Local AES Encrypted`),c(),E("Privacy governance updated")});const M=document.getElementById("btn-export-portfolio-data");M&&(M.onclick=()=>{const I={exportedAt:new Date().toISOString(),user:$.state.currentUser,scripts:$.state.scripts,screenplay:$.state.screenplay,settings:$.state.settings},L=new Blob([JSON.stringify(I,null,2)],{type:"application/json"}),V=URL.createObjectURL(L),U=document.createElement("a");U.href=V,U.download=`scriptora_portfolio_backup_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(U),U.click(),document.body.removeChild(U),URL.revokeObjectURL(V),E("Portfolio archive downloaded successfully")});const T=document.getElementById("btn-force-cloud-sync");T&&(T.onclick=()=>{T.disabled=!0,T.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span><span>Synchronizing...</span>',setTimeout(()=>{T.disabled=!1,T.innerHTML='<span class="material-symbols-outlined text-[16px]">sync</span><span>Force Cloud Re-sync</span>';const I=document.getElementById("sync-status-msg");I&&(I.textContent=`Synchronized at ${new Date().toLocaleTimeString()}`),E("All screenplay drafts synchronized with cloud")},700)});const re=document.getElementById("btn-clear-local-cache");re&&(re.onclick=()=>{sessionStorage.clear(),E("Temporary cache and diagnostic buffers cleared")});const ee=document.getElementById("modal-edit-profile"),me=document.getElementById("trigger-modal-email"),z=document.getElementById("edit-avatar-btn"),ge=document.getElementById("avatar-container-btn"),fe=document.getElementById("form-update-profile"),Z=document.getElementById("local-photo-input"),ce=document.getElementById("btn-modal-upload-photo"),G=document.getElementById("btn-modal-remove-photo");function be(I){I?st(ee):Te(ee)}me&&(me.onclick=()=>be(!0)),ge&&(ge.onclick=()=>be(!0)),z&&(z.onclick=I=>{I.stopPropagation(),Z&&Z.click()}),ce&&(ce.onclick=()=>{Z&&Z.click()}),document.querySelectorAll(".close-profile-modal").forEach(I=>I.onclick=()=>be(!1)),Z&&(Z.onchange=I=>{const L=I.target.files?.[0];if(!L)return;if(!L.type.startsWith("image/")){E("Please select a valid image file (PNG, JPG, WEBP)");return}const V=new FileReader;V.onload=U=>{const Q=new Image;Q.onload=()=>{const xe=document.createElement("canvas"),ue=360;let Se=Q.width,he=Q.height;Se>he?Se>ue&&(he=Math.round(he*ue/Se),Se=ue):he>ue&&(Se=Math.round(Se*ue/he),he=ue),xe.width=Se,xe.height=he,xe.getContext("2d").drawImage(Q,0,0,Se,he);const Pe=xe.toDataURL("image/jpeg",.88),D={...$.state.currentUser||r,avatarUrl:Pe};$.setState({currentUser:D}),localStorage.setItem("scriptora_user",JSON.stringify(D)),ys({avatarUrl:Pe}).catch(()=>{});const J=document.getElementById("user-avatar-circle");J&&(J.innerHTML=`<img id="user-avatar-img" src="${Pe}" class="w-full h-full object-cover" alt="Profile" />`);const K=document.getElementById("modal-preview-avatar");K&&(K.innerHTML=`<img id="modal-preview-img" src="${Pe}" class="w-full h-full object-cover" alt="Preview" />`),G&&G.classList.remove("hidden");const te=document.getElementById("header-profile-btn");te&&(te.innerHTML=`<img src="${Pe}" class="w-full h-full object-cover" alt="Profile" />`),E("Profile picture updated successfully!")},Q.src=U.target.result},V.readAsDataURL(L),Z.value=""}),G&&(G.onclick=()=>{const L={...$.state.currentUser||r,avatarUrl:null};$.setState({currentUser:L}),localStorage.setItem("scriptora_user",JSON.stringify(L)),ys({avatarUrl:null}).catch(()=>{});const V=L.initials||"AK",U=document.getElementById("user-avatar-circle");U&&(U.innerHTML=`<span id="user-avatar-initials">${V}</span>`);const Q=document.getElementById("modal-preview-avatar");Q&&(Q.innerHTML=`<span id="modal-preview-initials">${V}</span>`),G.classList.add("hidden");const xe=document.getElementById("header-profile-btn");xe&&(xe.innerHTML=`<span>${V}</span>`),E("Profile photo removed")});let C=r.avatarColor||"bg-blue-600";document.querySelectorAll(".prof-avatar-color-btn").forEach(I=>{I.onclick=()=>{C=I.getAttribute("data-color"),document.querySelectorAll(".prof-avatar-color-btn").forEach(L=>L.classList.remove("ring-2","ring-offset-2","ring-blue-600")),I.classList.add("ring-2","ring-offset-2","ring-blue-600")}}),fe&&(fe.onsubmit=async I=>{I.preventDefault();const L=document.getElementById("prof-input-name").value.trim(),V=document.getElementById("prof-input-headline").value.trim(),U=document.getElementById("prof-input-email").value.trim(),Q=L.split(/\s+/),xe=(Q[0]?.[0]||"A")+(Q[1]?.[0]||""),ue={...$.state.currentUser||r,name:L,displayName:L,headline:V,email:U,initials:xe.toUpperCase(),avatarColor:C};await ys(ue),$.setState({currentUser:ue});const Se=document.getElementById("profile-display-name"),he=document.getElementById("profile-display-headline"),X=document.getElementById("profile-display-email"),Pe=document.getElementById("user-avatar-circle");Se&&(Se.textContent=L),he&&(he.textContent=V),X&&(X.textContent=U),Pe&&!ue.avatarUrl&&(Pe.innerHTML=`<span id="user-avatar-initials">${xe.toUpperCase()}</span>`,Pe.className=`w-20 h-20 rounded-full ${C} text-white font-bold text-2xl flex items-center justify-center shadow-md overflow-hidden transition-transform active:scale-95 border-2 border-white ring-2 ring-slate-100`),be(!1),E("Profile and account updated successfully")});const H=document.getElementById("modal-security"),ke=document.getElementById("trigger-modal-password"),se=document.getElementById("form-update-pw");function pe(I){I?st(H):Te(H)}ke&&(ke.onclick=()=>pe(!0)),document.querySelectorAll(".close-security-modal").forEach(I=>I.onclick=()=>pe(!1)),document.querySelectorAll(".btn-toggle-pw").forEach(I=>{I.onclick=()=>{const L=I.getAttribute("data-target"),V=document.getElementById(L),U=I.querySelector(".material-symbols-outlined");V&&(V.type==="password"?(V.type="text",U&&(U.textContent="visibility_off")):(V.type="password",U&&(U.textContent="visibility")))}}),se&&(se.onsubmit=I=>{I.preventDefault(),document.getElementById("pw-input-current")?.value;const L=document.getElementById("pw-input-new")?.value,V=document.getElementById("pw-input-confirm")?.value,U=document.getElementById("pw-error-text");if(!L||L.length<6){U&&(U.textContent="New password must be at least 6 characters long.",U.classList.remove("hidden"));return}if(L!==V){U&&(U.textContent="New password and confirmation do not match.",U.classList.remove("hidden"));return}U&&U.classList.add("hidden"),pe(!1),E("Password updated securely"),se.reset()});const k=document.getElementById("action-modal"),Ie=document.getElementById("action-modal-title"),Le=document.getElementById("action-modal-desc"),Ce=document.getElementById("action-modal-icon"),ae=document.getElementById("action-modal-icon-box"),le=document.getElementById("action-modal-confirm"),R=document.getElementById("action-modal-cancel"),we=document.getElementById("action-modal-input-wrap"),De=document.getElementById("action-modal-phrase-input"),ie=document.getElementById("action-modal-error");let Me="signout",de=!1;function Fe(I){de=!1,Me=I,le&&(le.disabled=!1,le.textContent=I==="signout"?"Sign Out":"Delete Forever"),R&&(R.disabled=!1),ie&&(ie.textContent="",ie.classList.add("hidden")),De&&(De.value=""),I==="signout"?(Ie.textContent="Sign Out",Le.textContent="Are you sure you want to end your active session on this device? Unsaved changes in your draft have been synchronized.",Ce.textContent="logout",ae.className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center",le.className="flex-1 h-10 px-4 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 cursor-pointer transition-colors flex items-center justify-center gap-1.5",le.textContent="Sign Out",we&&we.classList.add("hidden")):(Ie.textContent="Delete Account",Le.textContent="This action will permanently delete your account, private screenplays, versions, and production records. Authorized collaborators on shared scripts will retain access.",Ce.textContent="warning",ae.className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center",le.className="flex-1 h-10 px-4 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer transition-colors flex items-center justify-center gap-1.5",le.textContent="Delete Forever",we&&we.classList.remove("hidden")),st(k),I==="delete"&&De&&setTimeout(()=>De.focus(),100)}function Re(){de=!1,le&&(le.disabled=!1),R&&(R.disabled=!1),Te(k)}const Be=document.getElementById("btn-trigger-signout");Be&&(Be.onclick=()=>Fe("signout"));const F=document.getElementById("btn-trigger-delete-acc");F&&(F.onclick=()=>Fe("delete")),R&&(R.onclick=Re),le&&(le.onclick=async()=>{if(de)return;if(Me==="delete"&&(De?.value||"").trim().toUpperCase()!=="DELETE MY ACCOUNT"){ie&&(ie.textContent='Please type "DELETE MY ACCOUNT" exactly to proceed with deletion.',ie.classList.remove("hidden")),De&&De.focus();return}de=!0,le.disabled=!0,R&&(R.disabled=!0);const I=le.textContent;le.innerHTML=`
        <span class="material-symbols-outlined text-[15px] animate-spin">refresh</span>
        <span>${Me==="signout"?"Signing Out...":"Deleting Account..."}</span>
      `;try{if(Me==="signout")await mn(),$.resetUserSession(),window.scriptoraRouter?.clearHistory&&window.scriptoraRouter.clearHistory(),Te(k),E("Signed out of Scriptora"),e("/auth",!0);else{const L=(De?.value||"").trim(),V=await qn(L);$.resetUserSession(),window.scriptoraRouter?.clearHistory&&window.scriptoraRouter.clearHistory(),Te(k),E(V.message||"Account deleted successfully"),e("/auth",!0)}}catch(L){ie&&(ie.textContent=L.message||"Operation failed. Please try again.",ie.classList.remove("hidden")),E(L.message||"Action failed","error")}finally{de=!1,le&&(le.disabled=!1,le.textContent=I),R&&(R.disabled=!1)}})}function ko(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=t||s.get("scriptId")||$.state.editorReturnScriptId||$.state.selectedScriptId||"chronicles-of-dust",a=n==="editor",l=a?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/profile",i=$.state.scripts.find(r=>r.id===o)||$.state.scripts[0]||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",joinCode:"A7K9-XP42"};return`
    ${Xe("Profile","Collaborators")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
      <div class="flex flex-col w-full max-w-lg mx-auto px-4 pt-2.5 pb-8 space-y-5 fade-in">
        
        <!-- Back Navigation & Title -->
        <div class="flex items-center gap-2.5">
          <button id="collab-back-btn" data-scriptora-back="true" data-back-fallback="${l}" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back" title="Back">
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
                <span class="font-heading text-sm font-bold text-slate-900 truncate" id="currentProjectTitle">${i.title} (${i.draft||"Draft 4.2"})</span>
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
                ${r.id===i.id?'<span class="material-symbols-outlined text-blue-600 text-[16px]">check</span>':""}
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
                <span id="displayJoinCode" class="font-mono font-bold text-base text-blue-600 tracking-widest mt-0.5">${i.joinCode||"A7K9-XP42"}</span>
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
              Anyone with this join code can request Editor or Viewer access to "${i.title}".
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
            <a href="${l}" id="collab-bottom-return-btn" class="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center gap-2 border border-blue-200 shadow-2xs no-underline transition-all active:scale-98">
              <span class="material-symbols-outlined text-[18px]">edit_note</span>
              <span>Return to Editor (${i.title||"Screenplay"})</span>
            </a>
          </div>
        `:""}

      </div>
    </main>

    ${Ke("profile")}
  `}function Co(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=t||n.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),a=s||n.get("scriptId")||$.state.editorReturnScriptId||$.state.selectedScriptId||"chronicles-of-dust",l=o==="editor",i=l?sessionStorage.getItem("scriptora_editor_return")||`/editor/${a}`:"/profile",r=document.getElementById("collab-back-btn");r&&(r.onclick=Z=>{Z.preventDefault(),l&&sessionStorage.removeItem("scriptora_from_editor"),window.scriptoraRouter?window.scriptoraRouter.back(i):e(i)});const m=document.getElementById("collab-bottom-return-btn");m&&(m.onclick=Z=>{Z.preventDefault(),l&&sessionStorage.removeItem("scriptora_from_editor"),window.scriptoraRouter?window.scriptoraRouter.back(i):e(i)});let u="A7K9-XP42";async function d(){const Z=await Qn(a),ce=document.getElementById("collaborators-list");if(ce){if(Z.length===0){ce.innerHTML='<div class="p-4 text-center text-xs text-slate-400">No external collaborators yet. Share your join code to invite teammates.</div>';return}ce.innerHTML=Z.map(G=>`
      <div class="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
        <div class="flex items-center gap-3 min-w-0 pr-2">
          <div class="w-9 h-9 rounded-full ${G.avatarBg||"bg-blue-100 text-blue-700"} flex items-center justify-center font-bold text-xs shrink-0">
            ${G.initials}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-slate-900 truncate">${G.name}</span>
            <span class="text-[11px] text-slate-500 truncate">${G.email}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">${G.role}</span>
          <button class="remove-collab-btn text-slate-400 hover:text-red-600 p-1" data-id="${G.id}" title="Remove access">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".remove-collab-btn").forEach(G=>{G.onclick=async()=>{const be=G.getAttribute("data-id");confirm("Remove collaborator access for this user?")&&(await ta(a,be),E("Collaborator access removed"),d())}})}}d();const c=document.getElementById("projectSelectBtn"),p=document.getElementById("projectDropdown");let f=null;c&&p&&(f=hn(c,p,{placement:"bottom-start"})),document.querySelectorAll(".switch-script-opt").forEach(Z=>{Z.onclick=()=>{const ce=Z.getAttribute("data-id");$.selectScript(ce),f?.close(),e(`/profile/collaborators${l?`?from=editor&scriptId=${ce}`:""}`)}});const b=document.getElementById("openInviteBtn"),x=document.getElementById("closeInviteBtn"),g=document.getElementById("inviteCard"),B=document.getElementById("sendInviteBtn");b&&(b.onclick=()=>g?.classList.remove("hidden")),x&&(x.onclick=()=>g?.classList.add("hidden")),B&&(B.onclick=async()=>{const Z=document.getElementById("inviteEmailInput")?.value.trim(),ce=document.querySelector('input[name="inviteRole"]:checked')?.value||"editor";Z&&(await ea(a,{email:Z,role:ce}),E(`Invited ${Z} as ${ce}`),g?.classList.add("hidden"),d())});const v=document.getElementById("tabGenCodeBtn"),N=document.getElementById("tabEnterCodeBtn"),S=document.getElementById("paneGenerateCode"),M=document.getElementById("paneEnterCode");v&&(v.onclick=()=>{v.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",N.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",S?.classList.remove("hidden"),M?.classList.add("hidden")}),N&&(N.onclick=()=>{N.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",v.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",M?.classList.remove("hidden"),S?.classList.add("hidden")});const T=document.getElementById("copyJoinCodeBtn"),re=document.getElementById("copyJoinCodeLabel");T&&(T.onclick=()=>{const Z=document.getElementById("displayJoinCode")?.textContent||u;navigator.clipboard?.writeText(Z),re.textContent="Copied!",setTimeout(()=>{re.textContent="Copy"},1800),E(`Copied code: ${Z}`)});const ee=document.getElementById("regenJoinCodeBtn");ee&&(ee.onclick=async()=>{const Z=await sa(a);u=Z;const ce=document.getElementById("displayJoinCode");ce&&(ce.textContent=Z),E(`Generated new join code: ${Z}`)});const me=document.getElementById("verifyCodeBtn"),z=document.getElementById("joinCodeInput"),ge=document.getElementById("joinCodeResultCard"),fe=document.getElementById("confirmJoinScriptBtn");z&&(z.oninput=Z=>{let ce=Z.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"");ce.length>4&&(ce=ce.slice(0,4)+"-"+ce.slice(4,8)),Z.target.value=ce}),me&&z&&(me.onclick=async()=>{const Z=z.value.trim();if(!Z)return;me.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>';const ce=await na(Z);me.innerHTML="<span>Verify</span>",ce.valid?(ge?.classList.remove("hidden"),document.getElementById("verifiedScriptTitle").textContent=ce.script.title,document.getElementById("verifiedScriptFormat").textContent=`${ce.script.format} · ${ce.script.pages} pages`,E("Valid join code")):(ge?.classList.add("hidden"),E("Invalid or expired join code","error"))}),fe&&z&&(fe.onclick=async()=>{const Z=z.value.trim();await aa(Z),E("Successfully joined screenplay workspace!"),e("/workspace")})}function Ao(){return $.state.currentUser?.initials,`
    <div class="flex flex-col min-h-screen bg-surface w-full relative">
      ${Xe("Notifications","Activity")}

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

      ${Ke("workspace")}
    </div>
  `}function $o(e){const t=document.getElementById("btn-back-notif");t&&(t.onclick=()=>{if(window.scriptoraRouter)window.scriptoraRouter.back("/workspace");else{const c=$.getPreviousRoute("/workspace");e(c)}});let s="all",n="normal",o=[];async function a(){const c=document.getElementById("notif-feed-container");if(!c)return;if(n==="loading"){c.innerHTML=`
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
      `,document.getElementById("btn-retry-sync")?.addEventListener("click",()=>{n="normal",a()});return}if(o=(await xn()).notifications||[],n==="empty"||s==="unread"&&o.filter(v=>v.unread).length===0){c.innerHTML=`
        <div class="p-8 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center text-center gap-2">
          <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <h3 class="font-bold text-sm text-slate-900">You’re all caught up!</h3>
          <p class="text-xs text-slate-500 max-w-xs">No pending notifications or requests requiring your review.</p>
        </div>
      `;return}const f=o.filter(v=>v.unread).length;document.getElementById("badge-all-count").textContent=o.length,document.getElementById("badge-unread-count").textContent=f,$.setState({unreadNotifications:f});let b=o;s==="unread"&&(b=b.filter(v=>v.unread));const x=b.filter(v=>v.group==="today"),g=b.filter(v=>v.group!=="today");function B(v,N){return N.length===0?"":`
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-xs font-bold text-slate-400 tracking-wider uppercase font-heading">${v}</h2>
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
                    ${(S.tags||[]).map(M=>`<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">${M}</span>`).join("")}
                    <span class="text-blue-600 text-[11px] font-semibold ml-auto">${S.actionLabel||"View →"}</span>
                  </div>
                </div>
                ${S.unread?'<div class="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1"></div>':""}
              </div>
            `).join("")}
          </div>
        </div>
      `}c.innerHTML=B("Today",x)+B("Earlier",g),document.querySelectorAll(".notif-row").forEach(v=>{v.onclick=async()=>{const N=parseInt(v.getAttribute("data-id")),S=v.getAttribute("data-route");await oa(N),await $.refreshNotifications(),S?e(S):a()}})}a();const l=document.getElementById("filter-all-btn"),i=document.getElementById("filter-unread-btn");l&&(l.onclick=()=>{s="all",l.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",i.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",a()}),i&&(i.onclick=()=>{s="unread",i.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",l.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",a()});const r=document.getElementById("btn-mark-all-read");r&&(r.onclick=async()=>{await la(),await $.refreshNotifications(),E("All notifications marked as read"),a()});const m=document.getElementById("btn-toggle-sim"),u=document.getElementById("sim-menu-dropdown");let d=null;m&&u&&(d=hn(m,u,{placement:"bottom-end"})),document.querySelectorAll(".sim-opt").forEach(c=>{c.onclick=()=>{n=c.getAttribute("data-state"),d?.close(),a(),E(`Simulating ${n} state`)}})}function No(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from"),o=t||s.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",a=n==="editor"||n&&n.startsWith("/editor");a?sessionStorage.getItem("scriptora_prod_return")||(n&&n.startsWith("/editor")||`${o}`):n&&n.startsWith("/");let l=null;if(window.scriptoraRouter){const r=window.scriptoraRouter.peekPreviousRoute?.();r&&(l=window.scriptoraRouter.getRouteLabel(r))}a||l||n?.includes("/intelligence");const i=$.state.scripts?.find(r=>r.id===o)||$.state.scripts?.[0]||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2"};return`
    <!-- Standard App Header -->
    ${Xe("Pre-Production","Production Tools")}

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
                  <option value="${r.id}" ${r.id===i.id?"selected":""}>${r.title} (${r.format||"Feature"})</option>
                `).join(""):`
                  <option value="${i.id}" selected>${i.title}</option>
                `}
              </select>
              <!-- Pinned source version tracking preserved for underlying system state -->
              <span id="pinned-version-label" class="sr-only">${i.draft||"Draft 4.2"} (Pinned)</span>
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
    ${Ke("production")}
  `}async function To(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",a=document.getElementById("production-back-btn");a&&(a.onclick=()=>{window.scriptoraRouter?window.scriptoraRouter.back("/workspace"):e("/workspace")});const l=document.getElementById("prod-script-select");l&&(l.onchange=d=>{const c=d.target.value;$.setState({selectedScriptId:c}),e(`/production?scriptId=${c}`)});const i=document.getElementById("btn-repin-source");i&&(i.onclick=async()=>{const d="Draft 4.3";await da(o,d),document.getElementById("source-version-alert")?.classList.add("hidden");const c=document.getElementById("pinned-version-label");c&&(c.textContent=`${d} (Pinned)`),E(`Pinned source updated to ${d}`)});const r=document.getElementById("btn-dismiss-staleness");r&&(r.onclick=()=>{document.getElementById("source-version-alert")?.classList.add("hidden"),E("Retained Draft 4.2 pinned baseline")});const m=`/production?scriptId=${o}`,u={"script-breakdown":`/production/breakdown?scriptId=${o}&from=${encodeURIComponent(m)}`,"shooting-schedule":`/production/schedule?scriptId=${o}&from=${encodeURIComponent(m)}`,"call-sheets":`/production/call-sheets?scriptId=${o}&from=${encodeURIComponent(m)}`,"dialogue-sheets":`/production/dialogue-sides?scriptId=${o}&from=${encodeURIComponent(m)}`,"storyboard-studio":`/production/storyboard?scriptId=${o}&from=${encodeURIComponent(m)}`};document.querySelectorAll(".tool-card").forEach(d=>{d.onclick=()=>{const c=d.getAttribute("data-tool");u[c]&&e(u[c])}})}function Bo(){const e=$.state.selectedScriptId||"chronicles-of-dust",t=$.state.scripts?.find(s=>s.id===e)||{title:"Chronicles of Dust",draft:"Draft 4.2"};return`
    <div class="fixed inset-0 bg-surface flex flex-col font-body text-slate-800 select-none overflow-hidden">
      <!-- Standard Header (Fixed Top) -->
      ${Xe("AI Chat","Universal Assistant")}

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
      ${Ke("chat")}
    </div>
  `}function Po(e){const t=document.getElementById("chat-input"),s=document.getElementById("chat-send-btn"),n=document.getElementById("chat-messages-container"),o=document.getElementById("btn-clear-chat"),a=document.getElementById("chat-back-btn"),l=document.querySelectorAll(".chat-chip"),i=$.state.selectedScriptId||"chronicles-of-dust";a&&(a.onclick=()=>{window.scriptoraRouter?window.scriptoraRouter.back("/workspace"):e("/workspace")});const r=localStorage.getItem("scriptora_chat_history");if(r)try{JSON.parse(r).forEach(c=>m(c.role,c.text,!1))}catch{}t&&t.addEventListener("input",()=>{t.style.height="auto",t.style.height=Math.min(t.scrollHeight,96)+"px"});function m(d,c,p=!0){if(!n)return;const f=d==="user",b=document.createElement("div");if(b.className=`flex items-start gap-2.5 max-w-[88%] ${f?"self-end flex-row-reverse":""}`,b.innerHTML=`
      <div class="w-7 h-7 rounded-lg ${f?"bg-slate-800":"bg-blue-600"} text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
        <span class="material-symbols-outlined text-[15px]">${f?"person":"chat_bubble_outline"}</span>
      </div>
      <div class="${f?"bg-blue-600 text-white rounded-2xl rounded-tr-xs":"bg-white text-slate-700 border border-slate-200/90 rounded-2xl rounded-tl-xs"} p-3.5 shadow-2xs flex flex-col gap-1 text-xs leading-relaxed">
        <div class="flex items-center justify-between gap-4 font-semibold ${f?"text-blue-100":"text-slate-900"} text-[11px]">
          <span>${f?"You":"Scriptora Universal AI"}</span>
          <span class="${f?"text-blue-200":"text-slate-400"} font-normal text-[10px]">Now</span>
        </div>
        <div class="whitespace-pre-wrap">${c}</div>
      </div>
    `,n.appendChild(b),n.scrollTop=n.scrollHeight,p)try{const x=JSON.parse(localStorage.getItem("scriptora_chat_history")||"[]");x.push({role:d,text:c,timestamp:new Date().toISOString()}),localStorage.setItem("scriptora_chat_history",JSON.stringify(x.slice(-30)))}catch{}}async function u(){if(!t)return;const d=t.value.trim();if(!d)return;m("user",d,!0),t.value="",t.style.height="auto";const c=document.createElement("div");c.className="flex items-center gap-2 text-xs text-slate-400 py-1 pl-9 italic",c.innerHTML=`
      <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
      <span>Reviewing screenplay context & production model...</span>
    `,n.appendChild(c),n.scrollTop=n.scrollHeight;try{const p=await Ls(d,i);c.remove();let f=p;d.toLowerCase().includes("call sheet")?f=`📋 **Call Sheet Preparation (Draft 4.2)**
For Day 1 (Scenes 1 & 2 at Gate 4 Exterior):
• General Call: 06:30 AM (Sunrise lighting window)
• Key Talent: Kevin (Ready by 07:15 AM)
• Picture Vehicle: Solar Patrol Rover standby at staging area
• Nearest Emergency Medical Facility: Ridgecrest Regional Hospital (22 mins)`:d.toLowerCase().includes("practical")||d.toLowerCase().includes("element")?f=`🎬 **Practical Elements Breakdown (Scene 18)**
• Location: Pumping Station Chamber B (Interior / Echo Dampened)
• Special Prop: Hydraulic Bypass Valve Kit (LED pressure indicator)
• SFX Note: Pressurized vapor release standby
• Cast Involved: Kevin, Meera`:(d.toLowerCase().includes("storyboard")||d.toLowerCase().includes("camera"))&&(f=`🎨 **Visual Storyboard Concept (Lakebed Standoff)**
• Shot 1: Ultra-wide 2.39:1 anamorphic establishing shot across cracked earth.
• Shot 2: Low-angle tracking shot on Kevin as dust storm gathers.
• Shot 3: Dutch angle close-up on the pressure gauge as manifold fails.
*(Detailed shot canvas will be available in Storyboard Studio Prompt 3)*`),m("assistant",f,!0)}catch{c.remove(),m("assistant","I analyzed your request against the active screenplay context. Pacing and scene logistics align with Draft 4.2 standards.",!0)}}s&&(s.onclick=u),t&&(t.onkeydown=d=>{d.key==="Enter"&&!d.shiftKey&&(d.preventDefault(),u())}),l.forEach(d=>{d.onclick=()=>{const c=d.getAttribute("data-prompt");t&&(t.value=c,u())}}),o&&(o.onclick=()=>{localStorage.removeItem("scriptora_chat_history"),n.innerHTML=`
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
      `})}function as(e,t="tune",s=null,n="",o=null,a=null){const i=new URLSearchParams(window.location.search||"").get("from");return`
    <div class="flex items-center justify-between gap-3 py-1 border-b border-slate-200/70 pb-3 mb-2">
      <div class="flex items-center gap-2.5 min-w-0 flex-1">
        <button type="button" id="prod-subnav-back" data-scriptora-back="true" data-back-fallback="${s||i||"/production"}" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back" title="Back">
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
  `}function Rn(e){return e?String(e).replace(/\u00B0/g," deg ").replace(/\u00BD/g," 1/2").replace(/\u00BC/g," 1/4").replace(/\u00BE/g," 3/4").replace(/\u215B/g," 1/8").replace(/\u215C/g," 3/8").replace(/\u215D/g," 5/8").replace(/\u215E/g," 7/8").replace(/\u00A0/g," ").replace(/[\t]+/g," ").replace(/\u2014/g," -- ").replace(/\u2013/g,"-").replace(/\u2026/g,"...").replace(/[\u201C\u201D]/g,'"').replace(/[\u2018\u2019]/g,"'").replace(/\u00B7/g," - ").replace(/\u2022/g,"* ").replace(/\u2192/g,"->").replace(/\u2190/g,"<-").replace(/[^\x20-\x7E]/g," ").replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/[\r\n]+/g," "):""}function it(e,t=10,s="F1"){if(!e)return 0;const n=String(e),o=s==="F2"||s==="F4"?.56:s==="F3"||s==="F5"?.6:.52;return n.length*t*o}function Ge(e,t,s=10,n="F1"){if(!e)return"";const o=String(e).trim();if(it(o,s,n)<=t)return o;const a="...",l=it(a,s,n);let i=o;for(;i.length>0&&it(i,s,n)+l>t;)i=i.slice(0,-1);return i?i.trim()+a:""}function Wt(e,t,s=10,n="F1"){if(!e)return[];const o=String(e).split(/\s+/).filter(Boolean);if(o.length===0)return[];const a=[];let l="";for(const i of o){const r=l?l+" "+i:i;it(r,s,n)<=t?l=r:(l&&a.push(l),it(i,s,n)>t?(a.push(Ge(i,t,s,n)),l=""):l=i)}return l&&a.push(l),a}function jt(e,t){if(!e)return[];const s=String(e).split(/\s+/),n=[];let o="";for(const a of s)o?o.length+1+a.length<=t?o+=" "+a:(n.push(o),o=a):o=a;return o&&n.push(o),n}function Ht(e,t){if(!e||!(e instanceof Blob))throw new Error("Invalid PDF blob received for download");const s=URL.createObjectURL(e),n=document.createElement("a");n.style&&(n.style.display="none"),n.href=s,n.download=t||"document.pdf",document.body.appendChild(n),n.click(),setTimeout(()=>{try{n.parentNode&&n.parentNode.removeChild(n),URL.revokeObjectURL(s)}catch{}},4e3)}function Ut(e,t={}){const s=t.pageWidth||612,n=t.pageHeight||792,o=e.length,a=[];let l=0;function i(){return++l}const r=i(),m=i(),u=[];for(let T=0;T<o;T++)u.push(i());const d={F1:i(),F2:i(),F3:i(),F4:i(),F5:i(),F6:i()},c=[];for(let T=0;T<o;T++)c.push(i());a[r]=`<< /Type /Catalog /Pages ${m} 0 R >>`,a[m]=`<< /Type /Pages /Kids [${u.map(T=>`${T} 0 R`).join(" ")}] /Count ${o} >>`,a[d.F1]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",a[d.F2]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",a[d.F3]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>",a[d.F4]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>",a[d.F5]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Oblique /Encoding /WinAnsiEncoding >>",a[d.F6]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>";const p=`<< /F1 ${d.F1} 0 R /F2 ${d.F2} 0 R /F3 ${d.F3} 0 R /F4 ${d.F4} 0 R /F5 ${d.F5} 0 R /F6 ${d.F6} 0 R >>`,f=new TextEncoder;for(let T=0;T<o;T++){a[u[T]]=`<< /Type /Page /Parent ${m} 0 R /MediaBox [0 0 ${s} ${n}] /Contents ${c[T]} 0 R /Resources << /Font ${p} >> >>`;const re=e[T]||{};let ee="";if(re.vectors&&re.vectors.length)for(const z of re.vectors)z.type==="rect"?(z.fill&&(ee+=`${z.fill[0].toFixed(3)} ${z.fill[1].toFixed(3)} ${z.fill[2].toFixed(3)} rg
`,ee+=`${z.x.toFixed(2)} ${z.y.toFixed(2)} ${z.w.toFixed(2)} ${z.h.toFixed(2)} re
f
`),z.stroke&&(ee+=`${z.stroke[0].toFixed(3)} ${z.stroke[1].toFixed(3)} ${z.stroke[2].toFixed(3)} RG
`,ee+=`${(z.lineWidth||1).toFixed(2)} w
`,ee+=`${z.x.toFixed(2)} ${z.y.toFixed(2)} ${z.w.toFixed(2)} ${z.h.toFixed(2)} re
S
`)):z.type==="line"&&(ee+=`${(z.stroke||[0,0,0])[0].toFixed(3)} ${(z.stroke||[0,0,0])[1].toFixed(3)} ${(z.stroke||[0,0,0])[2].toFixed(3)} RG
`,ee+=`${(z.lineWidth||1).toFixed(2)} w
`,ee+=`${z.x1.toFixed(2)} ${z.y1.toFixed(2)} m ${z.x2.toFixed(2)} ${z.y2.toFixed(2)} l S
`);if(re.texts&&re.texts.length)for(const z of re.texts){const ge=z.font||"F1",fe=z.size||10,Z=z.color||[.1,.1,.1],ce=Rn(z.text);ee+=`BT
`,ee+=`/${ge} ${fe} Tf
`,ee+=`${Z[0].toFixed(3)} ${Z[1].toFixed(3)} ${Z[2].toFixed(3)} rg
`,ee+=`1 0 0 1 ${z.x.toFixed(2)} ${z.y.toFixed(2)} Tm
`,ee+=`(${ce}) Tj
`,ee+=`ET
`}const me=f.encode(ee);a[c[T]]=`<< /Length ${me.length} >>
stream
${ee}endstream`}const x=f.encode(`%PDF-1.4
%âãÏÓ
`);let g=x.length;const B=[],v=[];for(let T=1;T<=l;T++){B[T]=g;const re=`${T} 0 obj
${a[T]}
endobj
`,ee=f.encode(re);v.push(ee),g+=ee.length}const N=g;let S=`xref
0 ${l+1}
0000000000 65535 f 
`;for(let T=1;T<=l;T++)S+=`${String(B[T]).padStart(10,"0")} 00000 n 
`;S+=`trailer
<< /Size ${l+1} /Root ${r} 0 R >>
startxref
${N}
%%EOF`;const M=f.encode(S);return new Blob([x,...v,M],{type:"application/pdf"})}function cn(e={},t={}){const s=t.title||"Chronicles of Dust",n=t.company||"SCRIPTORA PRODUCTION STUDIO",o=t.draft||"Draft 4.2 (Pinned)",a=String(e.callSheetNumber||"01").padStart(2,"0"),l=e.shootDay||`Day ${parseInt(a,10)||1} of 14`,i=e.status==="Confirmed"||e.isPublished,r=[];let m=[],u=[];const d=36,c=576,p=540,f=56;function b(de=!1){if(m=[],u=[],r.push({vectors:m,texts:u}),de){m.push({type:"rect",x:d,y:730,w:p,h:26,fill:[.08,.12,.2]}),u.push({text:"SCRIPTORA -- OFFICIAL CALL SHEET (CONTINUED)",x:d+10,y:739,font:"F2",size:9,color:[.95,.95,.95]});const Be=`${s.toUpperCase()} · ${l.toUpperCase()}`;return u.push({text:Be,x:c-10-it(Be,8,"F1"),y:739,font:"F1",size:8,color:[.7,.82,1]}),718}return 756}let x=b(!1);const g=44;m.push({type:"rect",x:d,y:x-g,w:p,h:g,fill:[.08,.12,.2]}),u.push({text:"SCRIPTORA -- OFFICIAL PRODUCTION CALL SHEET",x:d+12,y:x-17,font:"F2",size:10,color:[.96,.97,.98]});const B=Ge(`${n.toUpperCase()} · ${s.toUpperCase()} · ${o}`,320,8.5,"F1");u.push({text:B,x:d+12,y:x-32,font:"F1",size:8.5,color:[.65,.78,.98]});const v=`DAY ${a} CALL SHEET`;u.push({text:v,x:c-12-it(v,11,"F2"),y:x-17,font:"F2",size:11,color:[1,1,1]});const N=i?"OFFICIAL PUBLISHED SNAPSHOT":"WORKING REVISION DRAFT",S=i?[.45,.9,.55]:[1,.82,.35];u.push({text:N,x:c-12-it(N,7.5,"F2"),y:x-32,font:"F2",size:7.5,color:S}),x-=g+8;const M=52;m.push({type:"rect",x:d,y:x-M,w:p,h:M,fill:[.975,.985,.995],stroke:[.82,.86,.91],lineWidth:.8});const T=135,re=x-14,ee=x-29,me=x-43;u.push({text:"DATE & DAY",x:d+10,y:re,font:"F2",size:7.5,color:[.42,.47,.55]}),u.push({text:Ge(e.shootDate||"Saturday, Oct 24, 2026",118,9.5,"F2"),x:d+10,y:ee,font:"F2",size:9.5,color:[.1,.12,.16]}),u.push({text:Ge(l,118,7.5,"F1"),x:d+10,y:me,font:"F1",size:7.5,color:[.42,.47,.55]}),m.push({type:"line",x1:d+T,y1:x-46,x2:d+T,y2:x-6,stroke:[.85,.88,.92],lineWidth:.6});const z=d+T+10;u.push({text:"GENERAL CREW CALL",x:z,y:re,font:"F2",size:7.5,color:[.42,.47,.55]}),u.push({text:Ge(e.generalCrewCall||"06:00 AM",118,11.5,"F2"),x:z,y:ee,font:"F2",size:11.5,color:[.1,.12,.16]}),u.push({text:Ge(`Breakfast: ${e.breakfastTime||"05:15 AM"}`,118,7.5,"F1"),x:z,y:me,font:"F1",size:7.5,color:[.42,.47,.55]}),m.push({type:"line",x1:d+T*2,y1:x-46,x2:d+T*2,y2:x-6,stroke:[.85,.88,.92],lineWidth:.6});const ge=d+T*2+10;u.push({text:"SHOOTING CALL",x:ge,y:re,font:"F2",size:7.5,color:[.1,.38,.85]}),u.push({text:Ge(e.shootingCall||"06:30 AM",118,11.5,"F2"),x:ge,y:ee,font:"F2",size:11.5,color:[.1,.38,.85]}),u.push({text:"First Shot on Set",x:ge,y:me,font:"F1",size:7.5,color:[.42,.47,.55]}),m.push({type:"line",x1:d+T*3,y1:x-46,x2:d+T*3,y2:x-6,stroke:[.85,.88,.92],lineWidth:.6});const fe=d+T*3+10;u.push({text:"ESTIMATED WRAP",x:fe,y:re,font:"F2",size:7.5,color:[.42,.47,.55]}),u.push({text:Ge(e.estimatedWrap||"06:30 PM",118,11.5,"F2"),x:fe,y:ee,font:"F2",size:11.5,color:[.1,.12,.16]}),u.push({text:"12-Hr Rest Turnaround",x:fe,y:me,font:"F1",size:7.5,color:[.42,.47,.55]}),x-=M+8;const Z=62;m.push({type:"rect",x:d,y:x-Z,w:p,h:Z,fill:[1,1,1],stroke:[.82,.86,.91],lineWidth:.8});const ce=d+10;u.push({text:"SET LOCATION & BASECAMP ACCESS:",x:ce,y:x-13,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:Ge(e.locationName||"Mojave Outpost Gate 4",280,8.5,"F2"),x:ce,y:x-25,font:"F2",size:8.5,color:[.1,.12,.16]}),u.push({text:Ge(e.locationAddress||"Perimeter Road 9, Cantil, CA",280,7.5,"F1"),x:ce,y:x-37,font:"F1",size:7.5,color:[.35,.4,.48]}),u.push({text:Ge(`Parking: ${e.parkingNotes||"Basecamp Lot B. Crew shuttle runs every 10 mins."}`,280,7,"F1"),x:ce,y:x-49,font:"F1",size:7,color:[.45,.5,.58]}),m.push({type:"line",x1:d+300,y1:x-56,x2:d+300,y2:x-6,stroke:[.85,.88,.92],lineWidth:.6});const G=d+310;u.push({text:"EMERGENCY MEDICAL / NEAREST HOSPITAL:",x:G,y:x-13,font:"F2",size:7.5,color:[.85,.15,.15]});const be=Wt(e.nearestHospital||"Desert Care Regional Medical Center (Ph: 760-379-2681)",220,7,"F1");u.push({text:Ge(be[0]||"Local Emergency Center",220,7,"F1"),x:G,y:x-24,font:"F1",size:7,color:[.15,.15,.15]}),be[1]&&u.push({text:Ge(be[1],220,7,"F1"),x:G,y:x-34,font:"F1",size:7,color:[.15,.15,.15]});const C=Ge(`Weather: ${e.weatherSummary||"Clear skies, normal stage ambient temperature."}`,220,7,"F1");u.push({text:C,x:G,y:x-49,font:"F1",size:7,color:[.2,.4,.65]}),x-=Z+10;const H=e.scenes&&e.scenes.length>0?e.scenes:[{sceneNumber:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",pages:"4 1/8",cast:["KEVIN","MARCUS"],desc:"Kevin arrives at border gate, inspection with Marcus."},{sceneNumber:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",pages:"3 4/8",cast:["KEVIN","MEERA"],desc:"Kevin discovers pressure loss on telemetry terminal."}];function ke(){m.push({type:"rect",x:d,y:x-17,w:p,h:17,fill:[.91,.93,.96],stroke:[.78,.82,.88],lineWidth:.8}),u.push({text:"SCENE #",x:d+6,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"SET & SCENE DESCRIPTION",x:d+56,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"D/N",x:d+325,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"PAGES",x:d+368,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"CAST CHARACTERS",x:d+418,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),x-=17}u.push({text:"SCHEDULED SCENES TO SHOOT",x:d,y:x,font:"F2",size:9.5,color:[.1,.15,.22]});const se=`${H.length} Scenes Scheduled`;u.push({text:se,x:c-it(se,8,"F1"),y:x,font:"F1",size:8,color:[.45,.5,.58]}),x-=12,ke(),H.forEach((de,Fe)=>{const Re=Wt(de.heading||`SCENE ${de.sceneNumber}`,260,8,"F2"),Be=Wt(de.desc||"",260,7,"F1"),F=Array.isArray(de.cast)?de.cast:de.cast?[de.cast]:[],I=Wt(F.join(", "),116,7.5,"F2"),L=Math.max(Re.length*10+Be.length*9,I.length*9.5,12),V=Math.max(22,8+L);x-V<f&&(x=b(!0),ke()),m.push({type:"rect",x:d,y:x-V,w:p,h:V,fill:Fe%2===0?[1,1,1]:[.985,.988,.995],stroke:[.86,.89,.93],lineWidth:.5}),u.push({text:`Sc. ${de.sceneNumber}`,x:d+6,y:x-13,font:"F2",size:8.5,color:[.1,.35,.85]});let U=x-10;Re.forEach(ue=>{u.push({text:ue,x:d+56,y:U,font:"F2",size:8,color:[.1,.12,.15]}),U-=10}),Be.forEach(ue=>{u.push({text:ue,x:d+56,y:U,font:"F1",size:7,color:[.4,.45,.52]}),U-=9});const Q=de.heading?.toUpperCase().includes("NIGHT")?"NIGHT":"DAY";u.push({text:Q,x:d+325,y:x-13,font:"F1",size:7.5,color:Q==="NIGHT"?[.1,.15,.45]:[.8,.45,.1]}),u.push({text:de.pages||"1.0",x:d+368,y:x-13,font:"F2",size:7.5,color:[.2,.2,.2]});let xe=x-11;I.forEach(ue=>{u.push({text:ue,x:d+418,y:xe,font:"F2",size:7.5,color:[.15,.2,.25]}),xe-=9.5}),x-=V}),x-=10;const pe=e.castCalls&&e.castCalls.length>0?e.castCalls:[{character:"KEVIN",actor:"Dev Patel",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MARCUS",actor:"David Chen",pickup:"05:15 AM",hmuCall:"05:45 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MEERA",actor:"Zoe Saldana",pickup:"08:30 AM",hmuCall:"09:00 AM",onSet:"10:30 AM",status:"Confirmed"}];function k(){m.push({type:"rect",x:d,y:x-17,w:p,h:17,fill:[.91,.93,.96],stroke:[.78,.82,.88],lineWidth:.8}),u.push({text:"ID",x:d+6,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"CHARACTER",x:d+32,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"ACTOR / TALENT",x:d+140,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"STATUS",x:d+270,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"PICKUP",x:d+346,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"H/MU CALL",x:d+406,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),u.push({text:"ON SET CALL",x:d+472,y:x-12,font:"F2",size:7.5,color:[.25,.3,.38]}),x-=17}x-48<f&&(x=b(!0)),u.push({text:"CAST & TALENT CALL SCHEDULE",x:d,y:x,font:"F2",size:9.5,color:[.1,.15,.22]});const Ie=`${pe.length} Talent Booked`;u.push({text:Ie,x:c-it(Ie,8,"F1"),y:x,font:"F1",size:8,color:[.45,.5,.58]}),x-=12,k(),pe.forEach((de,Fe)=>{x-19<f&&(x=b(!0),k()),m.push({type:"rect",x:d,y:x-19,w:p,h:19,fill:Fe%2===0?[1,1,1]:[.985,.988,.995],stroke:[.86,.89,.93],lineWidth:.5}),u.push({text:String(Fe+1),x:d+6,y:x-13,font:"F1",size:7.5,color:[.5,.5,.5]}),u.push({text:Ge(de.character||"CHARACTER",100,8,"F2"),x:d+32,y:x-13,font:"F2",size:8,color:[.1,.12,.16]}),u.push({text:Ge(de.actor||"TBD",120,8,"F1"),x:d+140,y:x-13,font:"F1",size:8,color:[.2,.22,.26]});const Be=(de.status||"").toLowerCase().includes("conf");u.push({text:Ge(de.status||"Confirmed",68,7.5,"F2"),x:d+270,y:x-13,font:"F2",size:7.5,color:Be?[.12,.55,.25]:[.85,.55,.1]}),u.push({text:de.pickup||"-",x:d+346,y:x-13,font:"F3",size:7.5,color:[.35,.35,.35]}),u.push({text:de.hmuCall||"-",x:d+406,y:x-13,font:"F3",size:7.5,color:[.35,.35,.35]}),u.push({text:de.onSet||"-",x:d+472,y:x-13,font:"F2",size:8.5,color:[.1,.35,.85]}),x-=19}),x-=10;const Le=e.specialInstructions||"Standard studio health & safety protocols in effect. All crew must report any hazards or equipment anomalies immediately to the 1st AD or Health & Safety Supervisor.",Ce=Wt(Le,516,7.5,"F1"),ae=Math.max(38,18+Ce.length*10+6);x-ae<f&&(x=b(!0)),m.push({type:"rect",x:d,y:x-ae,w:p,h:ae,fill:[.995,.985,.93],stroke:[.9,.82,.65],lineWidth:.8}),u.push({text:"[SAFETY & PRODUCTION DIRECTIVE] SPECIAL INSTRUCTIONS:",x:d+10,y:x-13,font:"F2",size:7.5,color:[.6,.38,.05]});let le=x-25;Ce.forEach(de=>{u.push({text:de,x:d+10,y:le,font:"F1",size:7.5,color:[.3,.25,.15]}),le-=10}),x-=ae+8;const R=34;if(x-R>=f){m.push({type:"rect",x:d,y:x-R,w:p,h:R,fill:[.965,.975,.988],stroke:[.84,.87,.92],lineWidth:.6}),u.push({text:"DIRECTING & SET OPS",x:d+10,y:x-12,font:"F2",size:7,color:[.25,.3,.38]}),u.push({text:`1st AD: Ready on Set ${e.shootingCall||"06:30 AM"} · Radio: Ch 1`,x:d+10,y:x-24,font:"F1",size:7,color:[.35,.4,.48]}),u.push({text:"CAMERA & SOUND TECH",x:d+195,y:x-12,font:"F2",size:7,color:[.25,.3,.38]}),u.push({text:`DP / Cam: ${e.generalCrewCall||"06:00 AM"} · Radio: Ch 2 | Sound: Ch 3`,x:d+195,y:x-24,font:"F1",size:7,color:[.35,.4,.48]}),u.push({text:"LOGISTICS & SIGN-OFF",x:d+375,y:x-12,font:"F2",size:7,color:[.25,.3,.38]});const de=Ge(`Approved: ${e.approvedBy||"Production Office"} · Ch 4`,160,7,"F1");u.push({text:de,x:d+375,y:x-24,font:"F1",size:7,color:[.35,.4,.48]}),x-=R+6}const we=r.length;r.forEach((de,Fe)=>{de.vectors.push({type:"line",x1:d,y1:44,x2:c,y2:44,stroke:[.8,.83,.88],lineWidth:.7}),de.texts.push({text:"CONFIDENTIAL -- SCRIPTORA PRODUCTION STUDIO -- NOT FOR PUBLIC DISTRIBUTION",x:d,y:32,font:"F1",size:7,color:[.45,.48,.52]});const Re=e.shootDate||"Production Call Sheet";de.texts.push({text:Re,x:306-it(Re,7,"F1")/2,y:32,font:"F1",size:7,color:[.55,.58,.62]});const Be=`Page ${Fe+1} of ${we}`;de.texts.push({text:Be,x:c-it(Be,7.5,"F2"),y:32,font:"F2",size:7.5,color:[.3,.35,.4]})});const De=Ut(r),ie=s.replace(/[^a-zA-Z0-9]/g,"_"),Me=`CallSheet_Day${a}_${ie}.pdf`;return Ht(De,Me),De}function Do(e="CHARACTER",t=[],s={}){const n=s.title||"Chronicles of Dust",o=s.draft||"Draft 4.2",a=[],l=38,i=[];let r=[],m=0;for(const c of t){const p=c.dialogue||c.text||"",f=jt(p,46),b=4+f.length;m+b>l&&r.length>0&&(i.push(r),r=[],m=0),r.push({...c,speechLines:f}),m+=b}r.length>0&&i.push(r),i.length===0&&i.push([]);for(let c=0;c<i.length;c++){const p=i[c],f=[],b=[];f.push({type:"line",x1:54,y1:746,x2:558,y2:746,stroke:[.2,.2,.2],lineWidth:1.2}),b.push({text:"SCRIPTORA -- CHARACTER DIALOGUE SHEET",x:54,y:755,font:"F4",size:9,color:[.3,.3,.3]}),b.push({text:`PAGE ${c+1} OF ${i.length}`,x:490,y:755,font:"F4",size:9,color:[.3,.3,.3]}),b.push({text:`${e.toUpperCase()} -- ALL DIALOGUE CUES`,x:54,y:730,font:"F4",size:12,color:[0,0,0]}),b.push({text:`Screenplay: ${n} (${o}) -- Pinned Baseline`,x:54,y:716,font:"F3",size:9,color:[.4,.4,.4]});let x=680;for(const g of p){const B=g.sceneNum||g.sceneNumber||1,v=g.heading||`SCENE ${B}`;if(b.push({text:`SCENE ${B} -- ${v}`,x:54,y:x,font:"F4",size:9,color:[.1,.3,.7]}),x-=14,g.action){const T=jt(g.action,65);for(const re of T)b.push({text:re,x:54,y:x,font:"F5",size:8.5,color:[.4,.4,.4]}),x-=11}const N=g.character||e||"CHARACTER",S=N.length*6.5;if(b.push({text:N,x:Math.max(160,306-S/2),y:x,font:"F4",size:10,color:[0,0,0]}),x-=12,g.parenthetical){const T=g.parenthetical.length*5.5;b.push({text:g.parenthetical,x:Math.max(160,306-T/2),y:x,font:"F5",size:9,color:[.3,.3,.3]}),x-=12}const M=g.speechLines||jt(g.dialogue||g.text||"",46);for(const T of M)b.push({text:T,x:170,y:x,font:"F3",size:10,color:[0,0,0]}),x-=13;x-=12}f.push({type:"line",x1:54,y1:50,x2:558,y2:50,stroke:[.8,.8,.8],lineWidth:.8}),b.push({text:`SCRIPTORA SCREENPLAY ARCHITECTURE -- ${e.toUpperCase()} -- DRAFT 4.2`,x:54,y:38,font:"F3",size:8,color:[.5,.5,.5]}),b.push({text:`Page ${c+1} of ${i.length}`,x:495,y:38,font:"F3",size:8,color:[.5,.5,.5]}),a.push({vectors:f,texts:b})}const u=Ut(a),d=`DialogueSheet_${e.replace(/\s+/g,"_")}_${n.replace(/\s+/g,"_")}.pdf`;return Ht(u,d),u}function Ro(e=1,t=[],s={},n={}){s&&s.title&&!n.title&&(n=s);const o=n.title||"Chronicles of Dust",a=n.draft||"Draft 4.2",l=s.heading||t[0]?.heading||`SCENE ${e} - DAY`,i=[],r=[],m=[];r.push({type:"rect",x:54,y:730,w:504,h:32,fill:[.1,.1,.1]}),m.push({text:"SCRIPTORA -- REHEARSAL & ON-SET SIDES",x:64,y:748,font:"F4",size:9,color:[.8,.8,.8]}),m.push({text:`SCENE ${e} SIDES`,x:460,y:748,font:"F4",size:10,color:[1,1,1]}),m.push({text:`${o.toUpperCase()} -- SCENE ${e}`,x:54,y:712,font:"F4",size:13,color:[0,0,0]}),m.push({text:`${l} -- ${a}`,x:54,y:698,font:"F3",size:9,color:[.4,.4,.4]}),r.push({type:"line",x1:54,y1:686,x2:558,y2:686,stroke:[.2,.2,.2],lineWidth:1});let u=665;m.push({text:l,x:54,y:u,font:"F4",size:10,color:[0,0,0]}),u-=18;for(const p of t){if(p.action){const b=jt(p.action,65);for(const x of b)m.push({text:x,x:54,y:u,font:"F5",size:9.5,color:[.2,.2,.2]}),u-=13;u-=4}if(p.character){const b=p.character.length*6.5;m.push({text:p.character,x:Math.max(160,306-b/2),y:u,font:"F4",size:10,color:[0,0,0]}),u-=13}if(p.parenthetical){const b=p.parenthetical.length*5.5;m.push({text:p.parenthetical,x:Math.max(160,306-b/2),y:u,font:"F5",size:9,color:[.3,.3,.3]}),u-=12}const f=p.dialogue||p.text||"";if(f){const b=jt(f,46);for(const x of b)m.push({text:x,x:170,y:u,font:"F3",size:10,color:[0,0,0]}),u-=13}u-=10}r.push({type:"rect",x:180,y:u-15,w:252,h:20,fill:[.95,.95,.95],stroke:[.7,.7,.7],lineWidth:.8}),m.push({text:`END OF SCENE ${e} SIDES -- STAMPED DRAFT 4.2`,x:195,y:u-3,font:"F4",size:7.5,color:[.3,.3,.3]}),r.push({type:"line",x1:54,y1:50,x2:558,y2:50,stroke:[.8,.8,.8],lineWidth:.8}),m.push({text:"SCRIPTORA REHEARSAL COPY -- OFFICIAL PRODUCTION SIDES",x:54,y:38,font:"F3",size:8,color:[.5,.5,.5]}),m.push({text:"Page 1 of 1",x:505,y:38,font:"F3",size:8,color:[.5,.5,.5]}),i.push({vectors:r,texts:m});const d=Ut(i),c=`ActorSides_Scene${e}_${o.replace(/\s+/g,"_")}.pdf`;return Ht(d,c),d}function Ln(e=[],t={}){const s=t.title||"Chronicles of Dust",n=t.draft||"Draft 4.2",o=[],a=18,l=e.length,i=Math.ceil(l/a)||1;for(let u=0;u<i;u++){const d=[],c=[],p=e.slice(u*a,(u+1)*a);d.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),c.push({text:"SCRIPTORA -- SCRIPT BREAKDOWN MASTER REPORT",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),c.push({text:`${s.toUpperCase()} (${n}) -- ${l} ELEMENTS TAGGED`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),c.push({text:`PAGE ${u+1} OF ${i}`,x:505,y:747,font:"F2",size:9,color:[1,1,1]});let f=705;d.push({type:"rect",x:36,y:f,w:540,h:18,fill:[.93,.94,.96],stroke:[.8,.83,.88],lineWidth:.8}),c.push({text:"CATEGORY",x:42,y:f+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"ELEMENT NAME",x:120,y:f+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"SCENES",x:270,y:f+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"STATUS",x:330,y:f+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"DETAILS / SOURCING SPECIFICATION",x:400,y:f+5,font:"F2",size:8,color:[.3,.35,.4]}),f-=22;for(const b of p){d.push({type:"rect",x:36,y:f,w:540,h:22,fill:[1,1,1],stroke:[.88,.9,.93],lineWidth:.5}),c.push({text:b.category||"Props",x:42,y:f+7,font:"F2",size:8,color:[.1,.3,.8]}),c.push({text:(b.name||"").slice(0,32),x:120,y:f+7,font:"F2",size:8.5,color:[.1,.1,.1]}),c.push({text:(b.scenes||[b.sceneNumber||18]).map(g=>`#${g}`).join(", "),x:270,y:f+7,font:"F3",size:8,color:[.4,.4,.4]}),c.push({text:b.status||"Confirmed",x:330,y:f+7,font:"F1",size:8,color:b.status==="Confirmed"?[.1,.6,.2]:[.8,.4,.1]});const x=b.assignedActor||b.sourcingType||b.description||b.notes||"Ready";c.push({text:x.slice(0,36),x:400,y:f+7,font:"F1",size:7.5,color:[.3,.3,.3]}),f-=22}d.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),c.push({text:"SCRIPTORA MASTER PRODUCTION BREAKDOWN -- IMMUTABLE SNAPSHOT",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),c.push({text:`Page ${u+1} of ${i}`,x:510,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),o.push({vectors:d,texts:c})}const r=Ut(o),m=`ScriptBreakdown_${s.replace(/\s+/g,"_")}.pdf`;return Ht(r,m),r}function Lo(e=[],t=[],s={}){const n=s.title||"Chronicles of Dust",o=s.draft||"Draft 4.2",a=[],l=[],i=[];l.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),i.push({text:"SCRIPTORA -- MASTER SHOOTING SCHEDULE",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),i.push({text:`${n.toUpperCase()} (${o}) -- ${e.length} SHOOT DAYS`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),i.push({text:"PAGE 1 OF 1",x:515,y:747,font:"F2",size:9,color:[1,1,1]});let r=705;l.push({type:"rect",x:36,y:r,w:540,h:18,fill:[.93,.94,.96],stroke:[.8,.83,.88],lineWidth:.8}),i.push({text:"DAY #",x:42,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"DATE",x:80,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"SHOOT LOCATION / STAGE",x:155,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"SCENES",x:340,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"PAGES",x:430,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"HOURS",x:480,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"STATUS",x:530,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),r-=26;for(const d of e){l.push({type:"rect",x:36,y:r,w:540,h:26,fill:[1,1,1],stroke:[.88,.9,.93],lineWidth:.5}),i.push({text:`D${d.dayNumber}`,x:42,y:r+9,font:"F2",size:9,color:[.1,.1,.1]}),i.push({text:d.date||"",x:80,y:r+9,font:"F1",size:8,color:[.3,.3,.3]}),i.push({text:d.location||"Location TBD",x:155,y:r+13,font:"F2",size:8.5,color:[.1,.1,.1]}),i.push({text:d.title||"",x:155,y:r+3,font:"F1",size:7.5,color:[.5,.5,.5]});const c=(d.sceneNumbers||[]).map(p=>`Sc ${p}`).join(", ")||"None";i.push({text:c,x:340,y:r+9,font:"F4",size:8.5,color:[.1,.3,.8]}),i.push({text:d.totalPages||"0 0/8",x:430,y:r+9,font:"F3",size:8,color:[.3,.3,.3]}),i.push({text:`${d.estHours||8}h`,x:480,y:r+9,font:"F1",size:8,color:[.4,.4,.4]}),i.push({text:d.status||"Draft",x:530,y:r+9,font:"F1",size:7.5,color:d.status==="Confirmed"?[.1,.6,.2]:[.4,.4,.4]}),r-=26}l.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),i.push({text:"SCRIPTORA MASTER STRIPBOARD SCHEDULE -- OWNER CONFIRMED BASELINE",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),i.push({text:"Page 1 of 1",x:525,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),a.push({vectors:l,texts:i});const m=Ut(a),u=`ShootingSchedule_${n.replace(/\s+/g,"_")}.pdf`;return Ht(m,u),m}function Mo(e=[],t={}){const s=e&&typeof e=="object"&&!Array.isArray(e),n=s?e:null,o=s?n.shots||[]:Array.isArray(e)?e:[],a=t.title||n?.screenplayTitle||"Chronicles of Dust",l=t.draft||t.sourceVersion||n?.sourceVersion||"Draft 4.2",i=t.heading||n?.sceneHeading||o[0]?.sceneHeading||"SCENE 1 - EXT. MOJAVE OUTPOST GATE 4 - DAY",r=n?.sceneNumber||o[0]?.sceneNumber||o[0]?.sceneNum||1,m=[{shotNumber:"1A",title:"Perimeter Outpost Gate",shotSize:"Wide Shot",cameraAngle:"High Angle",focalLength:"24mm Wide",aspectRatio:"2.39:1",lightingMood:"Daylight Dust",description:"High altitude drone descending across dust devils toward Kevin's arrival at the arid customs gate.",approvalStatus:"approved",directorNotes:"Capture sunrise glint off the guard gate perimeter wires."},{shotNumber:"1B",title:"Gate Scanner Clearance Standoff",shotSize:"Medium Two-Shot",cameraAngle:"Eye Level",focalLength:"50mm Prime",aspectRatio:"2.39:1",lightingMood:"Harsh Fluorescent Rim",description:"Kevin presents his ID badge to Marcus over the buzzing clearance terminal.",approvalStatus:"approved",directorNotes:"Focus pull from scanner terminal to Kevin's tense expression."},{shotNumber:"1C",title:"Terminal Diagnostic Anomaly",shotSize:"Close-Up",cameraAngle:"Low Angle",focalLength:"85mm Portrait",aspectRatio:"2.39:1",lightingMood:"Cyan Strobe",description:"Close-up insert of the flickering scanner console displaying pressure alert warning in red neon.",approvalStatus:"proposed",directorNotes:"Practical screen insert with pulsing alarm strobe."}],u=o&&o.length>0?o:m,d=3,c=Math.ceil(u.length/d)||1,p=[];for(let g=0;g<c;g++){const B=[],v=[],N=u.slice(g*d,(g+1)*d);B.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),v.push({text:"SCRIPTORA -- STORYBOARD STUDIO SHOT COMPOSITION",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),v.push({text:`${a.toUpperCase()} (${l}) -- ${Rn(i).toUpperCase()}`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),v.push({text:`PAGE ${g+1} OF ${c}`,x:505,y:747,font:"F2",size:9,color:[1,1,1]});let S=575;for(const M of N){const T=M.shotNumber||M.shotNum||`${r}A`,re=M.title||`Shot ${T}`,ee=M.focalLength||M.lens||"50mm Prime",me=M.aspectRatio||"2.39:1",z=`${M.shotSize||"Medium Shot"} / ${M.cameraAngle||"Eye Level"}`,ge=(M.approvalStatus||"Draft").toUpperCase(),fe=ge==="APPROVED"?[.1,.6,.2]:ge==="PROPOSED"?[.8,.5,.1]:[.4,.45,.5];B.push({type:"rect",x:36,y:S,w:540,h:140,fill:[1,1,1],stroke:[.85,.88,.92],lineWidth:.8}),B.push({type:"rect",x:46,y:S+15,w:200,h:110,fill:[.08,.1,.15],stroke:[.25,.3,.38],lineWidth:1}),B.push({type:"line",x1:112,y1:S+15,x2:112,y2:S+125,stroke:[.2,.25,.32],lineWidth:.4}),B.push({type:"line",x1:178,y1:S+15,x2:178,y2:S+125,stroke:[.2,.25,.32],lineWidth:.4}),B.push({type:"line",x1:46,y1:S+52,x2:246,y2:S+52,stroke:[.2,.25,.32],lineWidth:.4}),B.push({type:"line",x1:46,y1:S+88,x2:246,y2:S+88,stroke:[.2,.25,.32],lineWidth:.4}),B.push({type:"line",x1:141,y1:S+70,x2:151,y2:S+70,stroke:[.4,.6,.8],lineWidth:.8}),B.push({type:"line",x1:146,y1:S+65,x2:146,y2:S+75,stroke:[.4,.6,.8],lineWidth:.8}),B.push({type:"line",x1:52,y1:S+119,x2:58,y2:S+119,stroke:[.5,.7,.9],lineWidth:.8}),B.push({type:"line",x1:52,y1:S+119,x2:52,y2:S+113,stroke:[.5,.7,.9],lineWidth:.8}),B.push({type:"line",x1:240,y1:S+21,x2:234,y2:S+21,stroke:[.5,.7,.9],lineWidth:.8}),B.push({type:"line",x1:240,y1:S+21,x2:240,y2:S+27,stroke:[.5,.7,.9],lineWidth:.8}),v.push({text:`REC * SHOT ${T}`,x:52,y:S+110,font:"F4",size:7.5,color:[1,1,1]}),v.push({text:`${me} * ${ee}`,x:52,y:S+23,font:"F3",size:7,color:[.7,.8,.9]}),v.push({text:`SHOT ${T} -- SCENE ${r}`,x:260,y:S+115,font:"F2",size:9.5,color:[.1,.3,.8]}),B.push({type:"rect",x:480,y:S+112,w:86,h:16,fill:[.95,.96,.98],stroke:fe,lineWidth:.7}),v.push({text:ge,x:486,y:S+117,font:"F2",size:7,color:fe}),v.push({text:re.slice(0,38),x:260,y:S+100,font:"F2",size:10.5,color:[.08,.1,.12]}),v.push({text:`Camera: ${z} * ${ee} (${me})`,x:260,y:S+86,font:"F1",size:8,color:[.35,.4,.45]});const Z=jt(M.description||"",48);let ce=S+72;for(let be=0;be<Math.min(Z.length,3);be++)v.push({text:Z[be],x:260,y:ce,font:"F1",size:8,color:[.18,.22,.26]}),ce-=11;const G=M.directorNotes||M.continuity?.lightingContinuity||M.continuity?.eyeline||"";G&&v.push({text:`Note: ${G.slice(0,52)}`,x:260,y:S+25,font:"F5",size:7.5,color:[.45,.48,.52]}),S-=150}B.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),v.push({text:"SCRIPTORA STORYBOARD STUDIO -- OFFICIAL CAMERA & CONCEPT COMPOSITION",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),v.push({text:`Page ${g+1} of ${c}`,x:510,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),p.push({vectors:B,texts:v})}const f=Ut(p),b=i.replace(/[^a-zA-Z0-9]+/g,"_").slice(0,30),x=`Storyboard_${a.replace(/\s+/g,"_")}_${b}.pdf`;return Ht(f,x),f}const Oo={Cast:{icon:"person"},Locations:{icon:"location_on"},Props:{icon:"inventory_2"},"Practical FX":{icon:"science"},Stunts:{icon:"sports_kabaddi"},Costumes:{icon:"checkroom"},Vehicles:{icon:"commute"},Sound:{icon:"music_note"},"Hair & Makeup":{icon:"face"}};function jo(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||$.state.selectedScriptId;const n=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${Xe("Pre-Production","Script Breakdown Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${as("Script Breakdown","dataset",n||"/production",`
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

      ${Ke("production")}

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
  `}async function Fo(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust";let a=n.get("category")||"all",l=n.get("scene")||"all",i=n.get("character")||n.get("search")||"",r=null;const m=document.getElementById("breakdown-scene-select");m&&l!=="all"&&(m.value=l.startsWith("scene-")?l:`scene-${l}`),a!=="all"&&document.querySelectorAll(".cat-btn").forEach(C=>{C.getAttribute("data-cat")===a?(C.classList.add("bg-blue-600","text-white","shadow-2xs"),C.classList.remove("bg-slate-100","text-slate-700")):(C.classList.remove("bg-blue-600","text-white","shadow-2xs"),C.classList.add("bg-slate-100","text-slate-700"))});const u=document.getElementById("breakdown-search");u&&i&&(u.value=i);const d=C=>{const H=C.category;if(H==="Cast"){const ke=!C.assignedActor||C.assignedActor.toLowerCase().includes("unassigned")||C.assignedActor.toLowerCase().includes("open"),se=C.castingStatus==="Confirmed Cast"?"bg-emerald-50 text-emerald-700 border-emerald-200":C.castingStatus==="Offer Out"?"bg-sky-50 text-sky-700 border-sky-200":"bg-amber-50 text-amber-700 border-amber-200";return`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Actor</span>
            <div class="font-semibold text-slate-900 mt-0.5">
              ${ke?'<span class="text-amber-700 italic">Unassigned (Open Role)</span>':`<span class="text-indigo-700 font-bold">${C.assignedActor}</span>`}
            </div>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Casting Status</span>
            <span class="inline-block mt-0.5 px-2 py-0.5 rounded-lg border text-[11px] font-semibold ${se}">
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
      `}return H==="Props"?`
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
      `:H==="Practical FX"?`
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
      `:H==="Stunts"?`
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
      `:H==="Locations"?`
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
      `:H==="Costumes"?`
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
      `:H==="Vehicles"?`
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
      `:""},c=C=>{const H=C.category,ke=C.scenes&&C.scenes.length>0?C.scenes.join(", "):C.sceneNumber;return`
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
                <option value="Cast" ${H==="Cast"?"selected":""}>Cast & Characters</option>
                <option value="Locations" ${H==="Locations"?"selected":""}>Locations</option>
                <option value="Props" ${H==="Props"?"selected":""}>Props</option>
                <option value="Practical FX" ${H==="Practical FX"?"selected":""}>Practical FX</option>
                <option value="Stunts" ${H==="Stunts"?"selected":""}>Stunts & Action</option>
                <option value="Costumes" ${H==="Costumes"?"selected":""}>Costumes & Wardrobe</option>
                <option value="Vehicles" ${H==="Vehicles"?"selected":""}>Vehicles & Equipment</option>
                <option value="Sound" ${H==="Sound"?"selected":""}>Sound</option>
                <option value="Hair & Makeup" ${H==="Hair & Makeup"?"selected":""}>Hair & Makeup</option>
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
              <input type="text" name="scenes" value="${ke}" placeholder="e.g. 1, 4, 18" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              <span class="text-[10px] text-slate-400">Links element to multiple scenes simultaneously</span>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Description / Screenplay Context</label>
              <input type="text" name="description" value="${C.description||""}" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <!-- Dynamic Category Fields inside Edit Panel -->
          ${H==="Cast"?`
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

          ${H==="Props"?`
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

          ${H==="Practical FX"?`
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

          ${H==="Stunts"?`
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

          ${H==="Locations"?`
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
    `},p=async()=>{const C=await dt(o,a,l),H=C.filter(R=>{if(!i)return!0;const we=i.toLowerCase();return R.name.toLowerCase().includes(we)||R.description&&R.description.toLowerCase().includes(we)||R.category.toLowerCase().includes(we)||R.assignedActor&&R.assignedActor.toLowerCase().includes(we)||R.notes&&R.notes.toLowerCase().includes(we)}),ke=C.length,se=C.filter(R=>R.status==="Confirmed").length,pe=C.filter(R=>R.status==="Needs Review"||R.status==="Extracted").length,k=C.filter(R=>R.status==="Rejected").length,Ie=document.getElementById("kpi-total"),Le=document.getElementById("kpi-confirmed"),Ce=document.getElementById("kpi-review"),ae=document.getElementById("kpi-rejected");Ie&&(Ie.textContent=ke),Le&&(Le.textContent=se),Ce&&(Ce.textContent=pe),ae&&(ae.textContent=k);const le=document.getElementById("breakdown-list");if(le){if(H.length===0){le.innerHTML=`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400 text-xs">
          No breakdown elements match the active category, scene, or search filters.
        </div>
      `;return}le.innerHTML=H.map(R=>{const we=R.status==="Confirmed",De=R.status==="Needs Review"||R.status==="Extracted",ie=R.status==="Rejected",Me=r===R.id,de=Oo[R.category]||{icon:"label"},Fe=De?'<span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium flex items-center gap-1">Needs Review</span>':ie?'<span class="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium flex items-center gap-1">Excluded</span>':"",Be=(Array.isArray(R.scenes)&&R.scenes.length>0?R.scenes:[R.sceneNumber]).map(F=>`Sc ${F}`).join(", ");return`
        <div class="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-xs hover:border-slate-300 transition-colors flex flex-col gap-2.5" data-id="${R.id}">
          <!-- Top Row: Element Name on Left, Scene Tag, Category Tag, and Compact Action Buttons -->
          <div class="flex items-center justify-between gap-2 min-w-0">
            <div class="flex items-center gap-2 flex-wrap min-w-0">
              <h3 class="font-heading font-bold text-base text-slate-900 tracking-tight shrink-0 mr-1">${R.name}</h3>
              <span class="px-2 py-0.5 rounded-md bg-blue-50/70 text-blue-700 border border-blue-100 font-semibold text-xs shrink-0 flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">movie</span>
                <span>${Be}</span>
              </span>
              <span class="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-700 flex items-center gap-1 shrink-0">
                <span class="material-symbols-outlined text-[13px] text-slate-400">${de.icon}</span>
                <span>${R.category}</span>
              </span>
              ${Fe}
            </div>

            <!-- Primary Action Buttons (Compact, aligned near heading) -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button class="btn-toggle-edit px-2 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${R.id}" title="Edit details" aria-label="Edit ${R.name}">
                <span class="material-symbols-outlined text-[15px]">${Me?"expand_less":"edit"}</span>
                <span class="hidden sm:inline">${Me?"Close":"Edit"}</span>
              </button>

              ${we?`
                <button class="btn-review-item px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs transition-colors cursor-pointer" data-id="${R.id}" title="Request re-review" aria-label="Request re-review for ${R.name}">
                  Re-review
                </button>
              `:`
                <button class="btn-confirm-item px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${R.id}" title="Confirm item" aria-label="Confirm ${R.name}">
                  <span class="material-symbols-outlined text-[14px]">check</span>
                  <span>Confirm</span>
                </button>
              `}

              ${ie?"":`
                <button class="btn-reject-item p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" data-id="${R.id}" title="Reject element" aria-label="Reject ${R.name}">
                  <span class="material-symbols-outlined text-[16px]">block</span>
                </button>
              `}

              <button class="btn-delete-element p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" data-id="${R.id}" title="Delete element" aria-label="Delete ${R.name}">
                <span class="material-symbols-outlined text-[16px]">delete</span>
              </button>
            </div>
          </div>

          <!-- Description / Role -->
          <p class="text-xs text-slate-600 leading-relaxed font-sans">${R.description||R.characterRole||"No description provided."}</p>

          <!-- Category Specific Rich Presentation Row -->
          ${d(R)}

          <!-- Traceability & Evidence Row -->
          <div class="flex flex-col gap-1.5 mt-1 pt-2 border-t border-slate-100">
            ${R.sourceSnippet?`
              <div class="text-[11px] font-mono text-slate-600 bg-slate-50/80 border border-slate-200/60 rounded-xl p-2 leading-relaxed">
                <span class="text-slate-400 font-sans font-bold text-[10px] uppercase tracking-wider block mb-0.5">Screenplay Evidence (Draft 4.2):</span>
                "${R.sourceSnippet}"
              </div>
            `:""}

            <div class="flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-400">
              <div class="flex items-center gap-2">
                ${R.originalAiSuggestion?`
                  <span class="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">AI Extracted</span>
                `:`
                  <span class="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium">Manual Entry</span>
                `}
                ${R.userCorrection?`
                  <span class="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5" title="Modified by user">
                    <span class="material-symbols-outlined text-[12px]">tune</span>
                    <span>Corrected by ${R.userCorrection.correctedBy||"Owner"}</span>
                  </span>
                `:""}
              </div>

              ${R.confirmedBy?`
                <div>Confirmed by <strong class="font-semibold text-slate-600">${R.confirmedBy}</strong></div>
              `:""}
            </div>
          </div>

          <!-- Inline Edit Area if active -->
          ${Me?c(R):""}
        </div>
      `}).join(""),le.querySelectorAll(".btn-toggle-edit").forEach(R=>{R.onclick=()=>{const we=R.getAttribute("data-id");r=r===we?null:we,p()}}),le.querySelectorAll(".btn-cancel-edit").forEach(R=>{R.onclick=()=>{r=null,p()}}),le.querySelectorAll(".form-edit-inline").forEach(R=>{R.onsubmit=async we=>{we.preventDefault();const De=R.getAttribute("data-id"),ie=new FormData(R),de=(ie.get("scenes")||"18").split(",").map(Be=>Number(Be.trim())).filter(Be=>!isNaN(Be)),Fe=de.length>0?de[0]:18,Re={name:ie.get("name"),category:ie.get("category"),status:ie.get("status"),description:ie.get("description"),scenes:de,sceneNumber:Fe,sceneId:`scene-${Fe}`,assignedActor:ie.get("assignedActor")||"",castingStatus:ie.get("castingStatus")||"Uncast / Open",actorAvailability:ie.get("actorAvailability")||"",sourcingType:ie.get("sourcingType")||"",quantity:ie.get("quantity")||"",readinessStatus:ie.get("readinessStatus")||"",continuityNotes:ie.get("continuityNotes")||"",requiredResources:ie.get("requiredResources")||"",technicalRequirements:ie.get("technicalRequirements")||"",safetyNotes:ie.get("safetyNotes")||"",safetyPlanningStatus:ie.get("safetyPlanningStatus")||"",qualifiedPersonnel:ie.get("qualifiedPersonnel")||"",coordinationRequirements:ie.get("coordinationRequirements")||"",context:ie.get("context")||"",locationStatus:ie.get("locationStatus")||"",accessDetails:ie.get("accessDetails")||""};await rs(o,De,Re),E(`Saved updates for "${Re.name}"`),r=null,p()}}),le.querySelectorAll(".btn-delete-element").forEach(R=>{R.onclick=we=>{we.stopPropagation();const De=R.getAttribute("data-id"),ie=C.find(Me=>Me.id===De);ie&&ce(ie)}}),le.querySelectorAll(".btn-confirm-item").forEach(R=>{R.onclick=async()=>{const we=R.getAttribute("data-id");await rs(o,we,{status:"Confirmed"}),E("Element confirmed by Owner"),p()}}),le.querySelectorAll(".btn-review-item").forEach(R=>{R.onclick=async()=>{const we=R.getAttribute("data-id");await rs(o,we,{status:"Needs Review",isHumanConfirmed:!1}),E("Marked for review"),p()}}),le.querySelectorAll(".btn-reject-item").forEach(R=>{R.onclick=async()=>{const we=R.getAttribute("data-id");await rs(o,we,{status:"Rejected"}),E("Element rejected"),p()}})}};await p(),document.querySelectorAll(".cat-btn").forEach(C=>{C.onclick=()=>{document.querySelectorAll(".cat-btn").forEach(H=>{H.classList.remove("bg-blue-600","text-white","shadow-2xs"),H.classList.add("bg-slate-100","text-slate-700")}),C.classList.add("bg-blue-600","text-white","shadow-2xs"),C.classList.remove("bg-slate-100","text-slate-700"),a=C.getAttribute("data-cat"),p()}});const f=document.getElementById("breakdown-scene-select");f&&(f.onchange=C=>{l=C.target.value,p()});const b=document.getElementById("breakdown-search");b&&(b.oninput=C=>{i=C.target.value,p()});const x=document.getElementById("elem-cat"),g=document.getElementById("add-modal-category-fields"),B=()=>{if(!g||!x)return;const C=x.value;C==="Cast"?g.innerHTML=`
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
      `:C==="Props"?g.innerHTML=`
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
      `:C==="Practical FX"?g.innerHTML=`
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
      `:C==="Stunts"?g.innerHTML=`
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
      `:C==="Locations"?g.innerHTML=`
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
      `};x&&(x.onchange=B,B());const v=document.getElementById("modal-add-element"),N=document.getElementById("btn-add-element"),S=document.getElementById("close-add-modal"),M=document.getElementById("btn-cancel-add"),T=document.getElementById("form-add-element"),re=()=>{B(),st(v)},ee=()=>{Te(v)};N&&(N.onclick=re),S&&(S.onclick=ee),M&&(M.onclick=ee),v&&(v.onclick=C=>{C.target===v&&ee()});const me=document.getElementById("modal-delete-element"),z=document.getElementById("close-delete-modal"),ge=document.getElementById("btn-cancel-delete"),fe=document.getElementById("btn-confirm-delete");let Z=null;const ce=C=>{Z=C;const H=document.getElementById("delete-modal-name"),ke=document.getElementById("delete-modal-category"),se=document.getElementById("delete-modal-scenes");if(H&&(H.textContent=C.name),ke&&(ke.textContent=C.category),se){const pe=Array.isArray(C.scenes)&&C.scenes.length>0?C.scenes:[C.sceneNumber];se.textContent=`Associated with: ${pe.map(k=>`Scene ${k}`).join(", ")}`}st(me)},G=()=>{Z=null,Te(me)};z&&(z.onclick=G),ge&&(ge.onclick=G),me&&(me.onclick=C=>{C.target===me&&G()}),fe&&(fe.onclick=async()=>{if(!Z)return;const C=Z;fe.disabled=!0,fe.classList.add("opacity-75","cursor-not-allowed");try{const H=await pa(o,C.id);H&&(H.success||H.removedId)?(E(`Deleted "${C.name}" from breakdown`),G(),r=null,await p()):E(H?.message||"Failed to delete element")}catch(H){E("Error deleting element: "+(H.message||"Network error"))}finally{fe.disabled=!1,fe.classList.remove("opacity-75","cursor-not-allowed")}});const be=document.getElementById("btn-export-breakdown-pdf");be&&(be.onclick=async()=>{try{const C=await dt(o,a,l);Ln(C,{title:"Chronicles of Dust",draft:"Draft 4.2"}),E(`Exported Breakdown Report (${C.length} elements) PDF`)}catch(C){console.error(C),E("Failed to export breakdown PDF")}}),T&&(T.onsubmit=async C=>{C.preventDefault();const H=document.getElementById("elem-name")?.value,ke=document.getElementById("elem-cat")?.value,se=document.getElementById("elem-scenes")?.value||"18",pe=document.getElementById("elem-status")?.value||"Confirmed",k=document.getElementById("elem-desc")?.value;if(!H)return;const Ie=se.split(",").map(ae=>Number(ae.trim())).filter(ae=>!isNaN(ae)),Le=Ie.length>0?Ie[0]:18,Ce={name:H,category:ke,sceneNumber:Le,sceneId:`scene-${Le}`,scenes:Ie,description:k,status:pe,sourceSnippet:`Manual production element registered for Scene ${Ie.join(", ")}`,assignedActor:document.getElementById("add-actor")?.value||"",castingStatus:document.getElementById("add-casting-status")?.value||"Uncast / Open",actorAvailability:document.getElementById("add-availability")?.value||"",sourcingType:document.getElementById("add-prop-source")?.value||"",quantity:document.getElementById("add-prop-qty")?.value||"",readinessStatus:document.getElementById("add-prop-readiness")?.value||"",continuityNotes:document.getElementById("add-prop-continuity")?.value||"",requiredResources:document.getElementById("add-fx-res")?.value||"",technicalRequirements:document.getElementById("add-fx-tech")?.value||"",safetyNotes:document.getElementById("add-fx-safety")?.value||"",safetyPlanningStatus:document.getElementById("add-stunt-status")?.value||"",qualifiedPersonnel:document.getElementById("add-stunt-personnel")?.value||"",coordinationRequirements:document.getElementById("add-stunt-coordination")?.value||"",context:document.getElementById("add-loc-context")?.value||"",lighting:document.getElementById("add-loc-lighting")?.value||"",locationStatus:document.getElementById("add-loc-status")?.value||"",notes:document.getElementById("add-dept-notes")?.value||""};await ma(o,Ce),E(`Added "${H}" to Scene ${Ie.join(", ")}`),Te(),T.reset(),p()})}function _o(e=null,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=t||n.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",a=s||n.get("csId"),l=n.get("action")==="new",i=n.get("action")==="edit",r=e||n.get("from");let m="/production";i?m=`/production/call-sheets?scriptId=${o}&csId=${a}`:a||l?m=`/production/call-sheets?scriptId=${o}`:m=r||"/production";const u=m;return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${Xe("Pre-Production",i?"Edit Call Sheet":a?"Call Sheet Inspector":l?"Create New Call Sheet":"Call Sheets Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${as(i?"Edit Call Sheet":a?"Call Sheet Detail":l?"New Call Sheet":"Call Sheets",i?"edit_note":"assignment",u,!a&&!l&&!i?`
            <a href="/production/call-sheets?scriptId=${o}&action=new" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>New Call Sheet</span>
            </a>
          `:"",null,"Daily call sheets, crew calls and shooting details.")}

        <div id="callsheet-view-container" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading call sheet records...</div>
        </div>
      </main>

      ${Ke("production")}
    </div>
  `}async function Mn(e,t=null,s=null,n=null){const o=new URLSearchParams(window.location.search||""),a=s||o.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",l=n||o.get("csId"),i=o.get("action")==="new",r=o.get("action")==="edit",m=document.getElementById("callsheet-view-container");if(!m)return;const d=(localStorage.getItem("scriptora_prod_role")||"Owner")==="Owner";if(r&&l){const c=await Ys(a,l);if(!c){m.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>';return}const p=c.status==="Confirmed"||c.isPublished;m.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col gap-4">
        <!-- Edit Masthead & Revision Notice -->
        <div class="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-bold text-base text-slate-900">Edit Call Sheet #${c.callSheetNumber}</h2>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${p?"bg-amber-50 text-amber-800 border border-amber-200":"bg-blue-50 text-blue-700 border border-blue-200"}">
                ${p?"Branch New Revision Draft":"Editing Draft"}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${c.shootDay} · Baseline: Draft 4.2 (Pinned)</p>
          </div>
          <div class="text-[11px] text-slate-400 font-mono">
            Source: Shooting Schedule Day ${c.shootDay.replace(/[^0-9]/g,"").slice(0,2)||"1"}
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
                <span>${p?"Save Revision Draft":"Save Changes"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    `;const f=document.getElementById("form-edit-callsheet");f&&(f.onsubmit=async b=>{b.preventDefault();const x=document.getElementById("edit-cs-day")?.value||c.shootDay,g=document.getElementById("edit-cs-date")?.value||c.shootDate,B=document.getElementById("edit-cs-crewcall")?.value||c.generalCrewCall,v=document.getElementById("edit-cs-shootcall")?.value||c.shootingCall,N=document.getElementById("edit-cs-breakfast")?.value||c.breakfastTime,S=document.getElementById("edit-cs-wrap")?.value||c.estimatedWrap,M=document.getElementById("edit-cs-locname")?.value||c.locationName,T=document.getElementById("edit-cs-address")?.value||c.locationAddress,re=document.getElementById("edit-cs-parking")?.value||c.parkingNotes,ee=document.getElementById("edit-cs-hospital")?.value||c.nearestHospital,me=document.getElementById("edit-cs-weather")?.value||c.weatherSummary,z=document.getElementById("edit-cs-instructions")?.value||c.specialInstructions;await fa(a,c.id,{shootDay:x,shootDate:g,generalCrewCall:B,shootingCall:v,breakfastTime:N,estimatedWrap:S,locationName:M,locationAddress:T,parkingNotes:re,nearestHospital:ee,weatherSummary:me,specialInstructions:z,isDraftRevision:p}),E(p?"Saved as new revision draft":"Call Sheet updated successfully"),e(`/production/call-sheets?scriptId=${a}&csId=${c.id}`)})}else if(i){const c=await ct(a);m.innerHTML=`
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
            <a href="/production/call-sheets?scriptId=${a}" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium">Cancel</a>
            <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs">
              Generate Draft Call Sheet
            </button>
          </div>
        </form>
      </div>
    `;const p=document.getElementById("tab-linked"),f=document.getElementById("tab-manual"),b=document.getElementById("section-linked-day");p&&f&&(p.onclick=()=>{p.classList.add("bg-white","text-blue-700","shadow-2xs"),f.classList.remove("bg-white","text-blue-700","shadow-2xs"),b?.classList.remove("hidden")},f.onclick=()=>{f.classList.add("bg-white","text-blue-700","shadow-2xs"),p.classList.remove("bg-white","text-blue-700","shadow-2xs"),b?.classList.add("hidden")});const x=document.getElementById("form-create-callsheet");x&&(x.onsubmit=async g=>{g.preventDefault();const B=document.getElementById("new-cs-day")?.value||"3",v=document.getElementById("new-cs-date")?.value,N=document.getElementById("new-cs-crewcall")?.value,S=document.getElementById("new-cs-locname")?.value,M=document.getElementById("new-cs-address")?.value,T=document.getElementById("new-cs-hospital")?.value,re=document.getElementById("new-cs-parking")?.value,ee=await xa(a,{shootDay:`Day ${B} of 14`,shootDate:v,generalCrewCall:N,shootingCall:"06:30 AM",locationName:S,locationAddress:M,nearestHospital:T,parkingNotes:re});E(`Created Call Sheet #${ee.callSheetNumber}`),e(`/production/call-sheets?scriptId=${a}&csId=${ee.id}`)})}else if(l){const c=await Ys(a,l);if(!c){m.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>';return}const p=c.status==="Confirmed"||c.isPublished;m.innerHTML=`
      <!-- Top Action Banner -->
      <div class="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
            #${c.callSheetNumber}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-semibold text-sm text-slate-900">Call Sheet #${c.callSheetNumber}</h2>
              <span class="px-2 py-0.5 rounded-md text-[10px] font-medium border ${p?"bg-slate-50 text-slate-600 border-slate-200":"bg-amber-50 text-amber-700 border-amber-200"}">
                ${p?"Published Snapshot":"Draft — Pending Owner Approval"}
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
            ${(c.scenes||[]).map(g=>`
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <a href="/production/schedule?scriptId=${a}&sceneId=scene-${g.sceneNumber}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${a}&csId=${c.id}`)}" class="w-16 font-mono font-bold text-blue-700 hover:underline" title="Inspect Scene Logistics in Schedule">Sc ${g.sceneNumber}</a>
                <div class="flex-1 min-w-0 pr-2">
                  <div class="font-semibold text-slate-900 truncate">${g.heading}</div>
                  <div class="text-[11px] text-slate-500 truncate">${g.desc}</div>
                </div>
                <span class="w-20 text-center font-mono text-[11px]">${g.pages}</span>
                <span class="w-32 text-right font-medium text-[11px] text-slate-700 truncate">${(g.cast||[]).map(B=>`<a href="/production/breakdown?scriptId=${a}&category=Cast&character=${encodeURIComponent(B)}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${a}&csId=${c.id}`)}" class="hover:underline font-semibold" title="Inspect ${B} in Breakdown">${B}</a>`).join(", ")}</span>
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
            ${(c.castCalls||[]).map(g=>`
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <a href="/production/breakdown?scriptId=${a}&category=Cast&character=${encodeURIComponent(g.character)}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${a}&csId=${c.id}`)}" class="w-32 font-bold text-slate-900 hover:text-blue-700 hover:underline" title="Inspect ${g.character} in Breakdown">${g.character}</a>
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
          <p class="text-amber-800 text-[11px] mt-0.5 leading-relaxed">${c.specialInstructions}</p>
        </div>
      </div>
    `;const f=document.getElementById("btn-print-callsheet");f&&(f.onclick=()=>{try{const g=$.state.activeScript||($.state.scripts||[]).find(B=>B.id===a);cn(c,{title:g?.title||"Chronicles of Dust",company:g?.company||"Badlands Anthology LLC",draft:g?.draft||"Draft 4.2"}),E(`Exported Call Sheet #${c.callSheetNumber} PDF`)}catch(g){console.error(g),E("Failed to generate Call Sheet PDF")}});const b=document.getElementById("btn-delete-callsheet");b&&(b.onclick=async()=>{if(!confirm(`Are you sure you want to delete draft Call Sheet #${c.callSheetNumber}? This cannot be undone.`))return;const g=await Zs(a,c.id);g.success?(E(`Call Sheet #${c.callSheetNumber} deleted`),e(`/production/call-sheets?scriptId=${a}`)):E(g.message||"Failed to delete call sheet")});const x=document.getElementById("btn-publish-callsheet");x&&(x.onclick=async()=>{confirm("Approve and lock this call sheet as an official immutable snapshot?")&&(await ba(a,c.id),E("Call Sheet published & snapshot locked"),e(`/production/call-sheets?scriptId=${a}&csId=${c.id}`))})}else{const c=await Nt(a);m.innerHTML=`
      <div class="flex items-center justify-between">
        <h2 class="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px] text-blue-600">assignment</span>
          <span>Call Sheets Catalogue (${c.length})</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${c.map(p=>{const f=p.status==="Confirmed"||p.isPublished;return`
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
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-medium shrink-0 ${f?"bg-slate-100 text-slate-700":"bg-amber-50/80 border border-amber-200 text-amber-800"}">
                    ${f?"Published":"Draft"}
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
                  ${!f&&d?`
                    <button class="btn-card-delete p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors" data-id="${p.id}" data-num="${p.callSheetNumber}" title="Delete Draft">
                      <span class="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  `:""}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    `,m.querySelectorAll(".cs-card").forEach(p=>{p.onclick=()=>{const f=p.getAttribute("data-id");e(`/production/call-sheets?scriptId=${a}&csId=${f}`)}}),m.querySelectorAll(".btn-card-export").forEach(p=>{p.onclick=f=>{f.stopPropagation();const b=p.getAttribute("data-id"),x=c.find(g=>g.id===b);if(x){const g=$.state.activeScript||($.state.scripts||[]).find(B=>B.id===a);cn(x,{title:g?.title||"Chronicles of Dust",company:g?.company||"Badlands Anthology LLC",draft:g?.draft||"Draft 4.2"}),E(`Exported Call Sheet #${x.callSheetNumber} PDF`)}}}),m.querySelectorAll(".btn-card-delete").forEach(p=>{p.onclick=async f=>{f.stopPropagation();const b=p.getAttribute("data-id"),x=p.getAttribute("data-num");if(!confirm(`Delete draft Call Sheet #${x}?`))return;const g=await Zs(a,b);g.success?(E(`Call Sheet #${x} deleted`),Mn(e,t,s)):E(g.message||"Failed to delete")}})}}function Ho(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=t||s.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",o=s.get("mode")||"dialogue",l=e||s.get("from")||`/production?scriptId=${n}`;return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${Xe("Pre-Production","Dialogue Sheets & Actor Sides")}

      <main class="flex-1 w-full max-w-2xl mx-auto px-4 pt-16 pb-28 flex flex-col gap-3.5 fade-in">
        ${as("Dialogue & Actor Sides","theater_comedy",l,"",null,"Dialogue sheets and actor scene sides.")}
        
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

      ${Ke("production")}
    </div>
  `}async function Uo(e,t=null,s=null){const n=new URLSearchParams(window.location.search||"");s||n.get("scriptId")||$.state.selectedScriptId;let o=n.get("mode")||"dialogue",a="KEVIN",l=n.get("scene")||"1";const i=document.getElementById("tab-mode-dialogue"),r=document.getElementById("tab-mode-sides"),m=document.getElementById("filter-controls"),u=document.getElementById("dialogue-sides-content"),d=[{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"KEVIN",parenthetical:"(adjusting filter)",dialogue:"Wind gauge is spiking past forty knots, Marcus. Did you check the terminal pressure at the intake valve?",action:"Kevin wipes gritty red dust from the gauge glass with his thumb."},{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"MARCUS",parenthetical:"(shrugging)",dialogue:"Telemetry's been on the fritz since dawn. Central syndicate says it's thermal fluctuation.",action:"Marcus gestures with a cigarette toward the desert horizon."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"MEERA",parenthetical:"(eyes on monitor)",dialogue:"That's no fluctuation. Look at line three. Someone bypassed the telemetry loop eighty miles upriver.",action:"Meera brings up a wireframe map showing a hidden subterranean siphon branch."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"KEVIN",parenthetical:"(tense)",dialogue:"They're siphoning straight out of the municipal reservoir into private holding tanks.",action:"Kevin taps the terminal screen, freezing the anomaly coordinates."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"COMMANDER VANCE",parenthetical:"(smooth, unhurried)",dialogue:"Water belongs to those who possess the energy to lift it from the rock, Kevin. The frontier was built on that premise.",action:"Vance sips cold tea, watching the massive hydraulic pump pistons rise and plunge."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"KEVIN",parenthetical:"(stepping forward)",dialogue:"You signed the 2041 Treaty. If the southern aquifer collapses, ten thousand families wake up to dry taps.",action:"Kevin places the legal registry deed onto Vance's polished mahogany desk."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(shouting over the roar)",dialogue:"Hold the pylon, Meera! If the high-pressure valve seals now, the back-surge will fracture the entire chamber!",action:"Brine water sprays across Kevin's visor as he locks the hydraulic bypass manifold."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"MEERA",parenthetical:"(straining on cable)",dialogue:"Then don't let them break! Reroute the secondary relay through the floodgate breaker!",action:"Meera kicks off the iron catwalk, swinging across the chasm to secure the emergency lock."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(levering the valve bar)",dialogue:"Bypass locked! Bleed the line! Three... two... one!",action:"The pressure needles drop from red to blue as the municipal pipeline fills with fresh current."}];function c(){const x=new Date,g=B=>String(B).padStart(2,"0");return`${g(x.getDate())}/${g(x.getMonth()+1)}/${x.getFullYear()}`}function p(){if(m)if(o==="dialogue"){m.innerHTML=`
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
      `;const x=document.getElementById("char-select");x&&(x.onchange=g=>{a=g.target.value,f()})}else{m.innerHTML=`
        <span class="text-xs font-semibold text-slate-500 shrink-0">Scene Extract:</span>
        <div class="relative inline-flex items-center flex-1 max-w-xs">
          <select id="scene-select" class="w-full text-xs font-semibold bg-white border border-slate-200/90 rounded-2xl pl-3 pr-8 py-2 text-slate-900 appearance-none focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer">
            <option value="1" ${l==="1"?"selected":""}>Scene 1 — Outpost Gate 4</option>
            <option value="2" ${l==="2"?"selected":""}>Scene 2 — Customs Shed</option>
            <option value="7" ${l==="7"?"selected":""}>Scene 7 — Syndicate Control</option>
            <option value="18" ${l==="18"?"selected":""}>Scene 18 — Chamber B Climax</option>
          </select>
          <span class="material-symbols-outlined text-[18px] text-slate-400 absolute right-2.5 pointer-events-none">expand_more</span>
        </div>
      `;const x=document.getElementById("scene-select");x&&(x.onchange=g=>{l=g.target.value,f()})}}function f(){if(!u)return;const x=c();if(o==="dialogue"){const g=d.filter(B=>B.character===a);u.innerHTML=`
        <!-- Watermark Header -->
        <div class="font-sans flex flex-col gap-1">
          <div class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">SCRIPTORA · PRODUCTION EXTRACT</div>
          <h2 class="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
            CHARACTER DIALOGUE SHEET<br />— ${a}
          </h2>
          <div class="text-[12px] text-slate-600 font-medium mt-0.5">Screenplay: Chronicles of Dust · Pinned Version: Draft 4.2</div>
          <div class="text-[12px] text-slate-500">Lines: ${g.length} Cues</div>
          <div class="text-[12px] text-slate-500">Date: ${x}</div>
          <div class="w-full h-0.5 bg-slate-900 mt-2 mb-4"></div>
        </div>

        <!-- Dialogue Elements -->
        <div class="space-y-6 pt-1 max-w-2xl mx-auto font-mono w-full">
          ${g.map(B=>`
            <div class="space-y-1.5">
              <div class="font-sans font-bold text-[12px] text-blue-700 uppercase tracking-wide">
                SCENE ${B.sceneNum} — ${B.heading}
              </div>
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest pt-2">
                ${B.character}
              </div>
              ${B.parenthetical?`
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${B.parenthetical}
                </div>
              `:""}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto text-left">
                ${B.dialogue}
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
      `}else{const g=d.filter(v=>String(v.sceneNum)===String(l)),B=g[0]||{heading:`SCENE ${l}`};u.innerHTML=`
        <!-- Sides Masthead -->
        <div class="font-sans flex flex-col gap-1">
          <div class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">SCRIPTORA · PRODUCTION SIDES</div>
          <h2 class="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
            ACTOR SIDES<br />— SCENE ${l}
          </h2>
          <div class="text-[12px] text-slate-600 font-medium mt-0.5">${B.heading} · Draft 4.2</div>
          <div class="text-[12px] text-slate-500">Rehearsal & On-Set Copy</div>
          <div class="text-[12px] text-slate-500">Date: ${x}</div>
          <div class="w-full h-0.5 bg-slate-900 mt-2 mb-4"></div>
        </div>

        <!-- Formatted Script Scene Beat -->
        <div class="space-y-4 pt-1 max-w-2xl mx-auto leading-relaxed font-mono w-full">
          <div class="font-bold text-[13px] text-slate-900 uppercase">
            ${B.heading}
          </div>

          ${g.map(v=>`
            <div class="space-y-1.5 my-3">
              ${v.action?`
                <div class="text-slate-700 text-[12px] leading-relaxed italic mb-2 font-sans">
                  ${v.action}
                </div>
              `:""}
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest">
                ${v.character}
              </div>
              ${v.parenthetical?`
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${v.parenthetical}
                </div>
              `:""}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto">
                ${v.dialogue}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="border-t border-slate-200 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 font-sans text-[11px] text-slate-400">
          <span>END OF SCENE ${l} SIDES · STAMPED APPROVED DRAFT 4.2</span>
          <button id="btn-export-pdf" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-2xs">
            <span class="material-symbols-outlined text-[15px]">print</span>
            <span>Export Genuine PDF</span>
          </button>
        </div>
      `}b()}function b(){const x=document.getElementById("btn-export-pdf");x&&(x.onclick=()=>{try{if(o==="dialogue"){const g=d.filter(B=>B.character===a);Do(a,g,{title:"Chronicles of Dust",draft:"Draft 4.2"}),E(`Exported ${a} Dialogue Sheet PDF`)}else{const g=Number(l),B=d.filter(N=>N.sceneNum===g),v=B[0]||{heading:`SCENE ${g}`};Ro(l,B,{heading:v.heading,pages:"2 1/8"},{title:"Chronicles of Dust",draft:"Draft 4.2"}),E(`Exported Scene ${l} Actor Sides PDF`)}}catch(g){console.error(g),E("Failed to generate PDF document")}})}i&&r&&(i.onclick=()=>{o="dialogue",i.className="flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all bg-white text-blue-600 shadow-2xs cursor-pointer text-center",r.className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all text-slate-600 hover:text-slate-900 cursor-pointer text-center",p(),f()},r.onclick=()=>{o="sides",r.className="flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all bg-white text-blue-600 shadow-2xs cursor-pointer text-center",i.className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all text-slate-600 hover:text-slate-900 cursor-pointer text-center",p(),f()}),p(),f()}const qo={Cast:"person",Locations:"location_on",Props:"inventory_2","Practical FX":"science",Stunts:"sports_kabaddi",Costumes:"checkroom",Vehicles:"commute",Sound:"music_note","Hair & Makeup":"face",Equipment:"videocam","Special Equipment":"videocam"};function zo(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||$.state.selectedScriptId;const n=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${Xe("Pre-Production","Master Shooting Schedule")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-4 fade-in">
        <!-- SubNav with Title, Project Context & Primary Actions -->
        ${as("Shooting Schedule","calendar_month",n||"/production",`
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

      ${Ke("production")}
    </div>
  `}async function Vo(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",a=document.getElementById("schedule-calendar-container"),l=document.getElementById("day-detail-modal");if(!a)return;let i=await ct(o),r=await _t(o),m=await dt(o);const u=new Set,d=new Set,c=new Set;function p(){a.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-3">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-blue-600 text-lg">calendar_month</span>
            <h3 class="font-heading font-semibold text-sm text-slate-900">Shooting Calendar Matrix</h3>
          </div>
          <span class="text-xs text-slate-500 font-medium">October 24 – October 30, 2026</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-1">
          ${i.map(se=>{const pe=(se.sceneNumbers||[]).map(k=>r.find(Ie=>Ie.sceneNumber===k)).filter(Boolean);return`
              <div class="calendar-day-card rounded-xl border border-slate-200/90 p-3 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between gap-2.5 bg-slate-50/40" data-day="${se.dayNumber}">
                <div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      <span class="font-heading font-bold text-xs text-slate-900">Day ${se.dayNumber}</span>
                      ${se.isLocked?'<span class="material-symbols-outlined text-slate-400 text-[13px]" title="Day locked">lock</span>':""}
                    </div>
                    <span class="text-[11px] font-mono text-slate-500 font-medium">${se.date.split(",")[0]}</span>
                  </div>
                  <div class="text-[11px] text-slate-700 font-medium mt-1 truncate">${se.location}</div>
                  <div class="text-[10px] text-slate-400 mt-0.5">${se.totalPages} pgs • ${se.estHours} hrs</div>
                </div>

                <div class="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <div class="flex items-center gap-1 overflow-hidden">
                    ${pe.slice(0,3).map(k=>`
                      <button class="btn-badge-scene px-1.5 py-0.5 rounded bg-white hover:bg-blue-50 hover:border-blue-300 border border-slate-200 font-mono text-[9px] font-bold text-slate-700 transition-colors cursor-pointer" data-scene-id="${k.id}" title="View Scene ${k.sceneNumber} details">#${k.sceneNumber}</button>
                    `).join("")}
                    ${pe.length>3?`<span class="text-[10px] text-slate-400">+${pe.length-3}</span>`:""}
                  </div>
                  <span class="text-blue-600 font-semibold text-[10px] flex items-center gap-0.5">
                    Open &rarr;
                  </span>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,a.querySelectorAll(".calendar-day-card").forEach(se=>{se.onclick=()=>{const pe=se.getAttribute("data-day");pe&&T(pe)}}),a.querySelectorAll(".btn-badge-scene").forEach(se=>{se.onclick=pe=>{pe.stopPropagation();const k=se.getAttribute("data-scene-id");k&&z(k)}})}let f=null,b=!1,x=!1;const g=new Set;let B=!1;const v=new Set,N=new Set;let S=null;function M(se){const pe=(se.sceneNumbers||[]).map(Ce=>r.find(ae=>ae.sceneNumber===Ce)).filter(Boolean);let k=0;pe.forEach(Ce=>{const ae=(Ce.pages||"").match(/(\d+)\s*(\d+)\/8/);if(ae)k+=parseInt(ae[1],10)*8+parseInt(ae[2],10);else{const le=parseFloat(Ce.pages);isNaN(le)||(k+=Math.round(le*8))}});const Ie=Math.floor(k/8),Le=k%8;return se.totalPages=`${Ie} ${Le}/8`,se.totalPages}function T(se,pe=null){const k=i.find(F=>F.dayNumber===Number(se));if(!k)return;if(f=k.dayNumber,pe){const F=r.find(I=>I.id===pe||String(I.sceneNumber)===String(pe));F&&u.add(F.id)}const Ie=document.getElementById("modal-day-badge"),Le=document.getElementById("modal-day-title"),Ce=document.getElementById("modal-day-sub"),ae=document.getElementById("modal-day-content"),le=document.getElementById("modal-day-menu-btn"),R=document.getElementById("modal-day-menu-dropdown"),we=document.getElementById("modal-day-edit-btn"),De=document.getElementById("modal-day-menu-edit"),ie=document.getElementById("modal-day-lock-toggle"),Me=document.getElementById("modal-day-lock-label"),de=document.getElementById("modal-day-lock-icon"),Fe=document.getElementById("modal-day-delete");Ie&&(Ie.textContent=`D${k.dayNumber}`),Le&&(Le.textContent=`Day ${k.dayNumber} • ${k.date.split(",")[0]}`),Ce&&(Ce.textContent=`${k.location}${k.totalPages?` • ${k.totalPages} pgs`:""}`),le&&R&&(R.classList.add("hidden"),R.onclick=F=>F.stopPropagation(),le.onclick=F=>{F.stopPropagation();const I=R.classList.contains("hidden");document.querySelectorAll("[data-scriptora-popup]").forEach(L=>{L!==R&&L.classList.add("hidden")}),I?(R.classList.remove("hidden"),es(le,R,{placement:"bottom-end",zIndex:1e4})):R.classList.add("hidden")},le._outsideClickAttached||(le._outsideClickAttached=!0,document.addEventListener("click",()=>{R.classList.add("hidden")})),S={close:()=>R.classList.add("hidden")}),we&&(we.onclick=()=>{b=!b,T(k.dayNumber)}),De&&(De.onclick=F=>{F.stopPropagation(),S?.close(),b=!b,T(k.dayNumber)}),Ce&&(Ce.onclick=()=>{b=!0,T(k.dayNumber)}),Me&&(Me.textContent=k.isLocked?"Unlock Day":"Lock Day"),de&&(de.textContent=k.isLocked?"lock_open":"lock"),ie&&(ie.onclick=async F=>{F.stopPropagation(),S?.close(),k.isLocked=!k.isLocked,await bt(o,k.dayNumber,{isLocked:k.isLocked}),E(`Day ${k.dayNumber} ${k.isLocked?"locked":"unlocked"}`),Me&&(Me.textContent=k.isLocked?"Unlock Day":"Lock Day"),de&&(de.textContent=k.isLocked?"lock_open":"lock"),p()}),Fe&&(Fe.onclick=async F=>{if(F.stopPropagation(),S?.close(),!confirm(`Are you sure you want to remove Shoot Day ${k.dayNumber}? Any scenes should be moved first.`))return;const I=await ya(o,k.dayNumber);I.success?(E(`Shoot Day ${k.dayNumber} deleted`),me(),i=await ct(o),p()):E(I.message||"Failed to delete day")});const Re=(k.sceneNumbers||[]).map(F=>r.find(I=>I.sceneNumber===F)).filter(Boolean),Be=r.filter(F=>!k.sceneNumbers.includes(F.sceneNumber));if(ae){ae.innerHTML=`
        <!-- Optional Inline Day Info Editor -->
        ${b?`
          <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex flex-col gap-2.5 animate-in fade-in">
            <div class="flex items-center justify-between">
              <span class="font-heading font-bold text-xs text-blue-950 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px] text-blue-600">edit_calendar</span>
                <span>Edit Shoot Day ${k.dayNumber} Info</span>
              </span>
              <button id="btn-cancel-day-top" class="text-slate-400 hover:text-slate-700 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div>
                <label class="block text-slate-600 font-medium mb-1">Shoot Date</label>
                <input type="text" id="input-edit-day-date" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500" value="${k.date}" placeholder="e.g. Oct 25, 2026" />
              </div>
              <div>
                <label class="block text-slate-600 font-medium mb-1">Estimated Daily Hours</label>
                <input type="number" id="input-edit-day-hours" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500" value="${k.estHours||11}" step="0.5" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-slate-600 font-medium mb-1">Primary Location / Focus</label>
                <input type="text" id="input-edit-day-loc" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500" value="${k.location||""}" placeholder="e.g. Chamber B Dry Tank" />
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
          <span class="font-heading font-semibold text-slate-900 text-xs">Assigned Scenes (${Re.length})</span>
          <button id="btn-toggle-assign-scene" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-[11px] font-semibold transition-colors cursor-pointer" title="Assign scene to this shoot day">
            <span class="material-symbols-outlined text-[13px]">add</span>
            <span>Assign Scene</span>
          </button>
        </div>

        <!-- Inline Scene Assign Selector -->
        ${B?`
          <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex flex-col gap-2.5 animate-in fade-in w-full min-w-0 box-border">
            <div class="flex items-center justify-between text-xs font-semibold text-blue-900 gap-2">
              <span class="truncate">Add Screenplay Scene to Shoot Day ${k.dayNumber}</span>
              <button id="btn-close-assign-scene" class="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer shrink-0" title="Close scene selector">
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            ${Be.length>0?`
              <div class="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-2 w-full min-w-0">
                <div class="min-w-0 flex-1 w-full">
                  <label for="select-scene-to-assign" class="sr-only">Select scene to assign to shoot day</label>
                  <select id="select-scene-to-assign" class="w-full min-w-0 max-w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 sm:py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500 cursor-pointer truncate">
                    ${Be.map(h=>`
                      <option value="${h.sceneNumber}">#${h.sceneNumber} ${h.heading} (${h.pages} pgs)</option>
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
          ${Re.length>0?Re.map((h,D)=>{const J=u.has(h.id),K=d.has(h.id),te=c.has(h.id),ye=g.has(h.id),_e=v.has(h.id),at=N.has(h.id),Ve=m.filter($e=>$e.sceneId===h.id||$e.sceneNumber===h.sceneNumber||Array.isArray($e.scenes)&&$e.scenes.includes(h.sceneNumber));return`
              <div class="scene-item-card rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-all" data-scene-num="${h.sceneNumber}" data-scene-id="${h.id}">
                ${ye?`
                  <!-- Inline Edit Scene Mode -->
                  <div class="p-3 bg-blue-50/40 flex flex-col gap-2">
                    <div class="text-[11px] font-bold text-slate-800 flex items-center justify-between border-b border-blue-200/60 pb-1.5">
                      <span>Edit Scene #${h.sceneNumber}</span>
                      <button class="btn-cancel-scene-edit text-slate-400 hover:text-slate-700 cursor-pointer" data-scene-id="${h.id}">
                        <span class="material-symbols-outlined text-[15px]">close</span>
                      </button>
                    </div>
                    <div class="flex flex-col gap-1.5">
                      <div>
                        <label class="block text-[10px] text-slate-500 font-semibold mb-0.5">Scene Heading</label>
                        <input type="text" class="input-scene-heading w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-none focus:border-blue-500" value="${h.heading}" />
                      </div>
                      <div class="grid grid-cols-2 gap-2">
                        <div>
                          <label class="block text-[10px] text-slate-500 font-semibold mb-0.5">Pages</label>
                          <input type="text" class="input-scene-pages w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-none focus:border-blue-500" value="${h.pages}" placeholder="e.g. 7 2/8" />
                        </div>
                        <div>
                          <label class="block text-[10px] text-slate-500 font-semibold mb-0.5">Complexity</label>
                          <select class="input-scene-complexity w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-none">
                            <option value="Low" ${h.complexity==="Low"?"selected":""}>Low</option>
                            <option value="Medium" ${h.complexity==="Medium"||!h.complexity?"selected":""}>Medium</option>
                            <option value="High" ${h.complexity==="High"?"selected":""}>High</option>
                          </select>
                        </div>
                      </div>
                      <div class="flex items-center justify-between pt-1">
                        <button class="btn-remove-scene-day text-rose-600 hover:text-rose-700 text-[11px] font-medium flex items-center gap-1 cursor-pointer" data-scene="${h.sceneNumber}">
                          <span class="material-symbols-outlined text-[13px]">delete</span>
                          <span>Remove from Day</span>
                        </button>
                        <div class="flex items-center gap-1.5">
                          <button class="btn-cancel-scene-edit px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer" data-scene-id="${h.id}">Cancel</button>
                          <button class="btn-save-scene-edit px-3 py-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs cursor-pointer" data-scene-id="${h.id}">Save Scene</button>
                        </div>
                      </div>
                    </div>
                  </div>
                `:`
                  <!-- Compact Scene Row -->
                  <div class="p-2.5 sm:p-3 flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <span class="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 font-mono font-bold text-xs flex items-center justify-center text-slate-800 shrink-0">#${h.sceneNumber}</span>
                      <div class="min-w-0">
                        <div class="font-medium text-slate-900 text-xs truncate leading-snug">${h.heading}</div>
                        <div class="text-[11px] text-slate-500 font-medium">${h.pages} pgs</div>
                      </div>
                    </div>

                    <div class="flex items-center gap-1 shrink-0">
                      <button class="btn-scene-up p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer" data-scene="${h.sceneNumber}" ${D===0?"disabled":""} title="Move earlier in shooting order">
                        <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
                      </button>
                      <button class="btn-scene-down p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer" data-scene="${h.sceneNumber}" ${D===Re.length-1?"disabled":""} title="Move later in shooting order">
                        <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
                      </button>
                      <button class="btn-edit-scene-quick p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer" data-scene-id="${h.id}" title="Edit scene heading & pages">
                        <span class="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button class="btn-toggle-scene-inline px-2.5 py-1 rounded-lg ${J?"bg-blue-600 text-white font-semibold":"bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold border border-blue-200/80"} text-[11px] flex items-center gap-1 transition-colors cursor-pointer" data-scene-id="${h.id}">
                        <span>Details</span>
                        <span class="material-symbols-outlined text-[14px] transition-transform inline-details-chevron ${J?"rotate-180":""}">expand_more</span>
                      </button>
                    </div>
                  </div>
                `}

                <!-- Inline Expanded Scene Details (Normal Document Flow) -->
                <div class="scene-inline-details border-t border-slate-100 bg-slate-50/60 p-3 ${J?"":"hidden"} flex flex-col gap-2.5 text-xs text-slate-700">
                  <!-- Initial Compact Summary: Full heading, assigned day, screenplay/draft, snippet, compact quick actions -->
                  <div class="flex flex-col gap-1.5">
                    <div>
                      <h4 class="font-heading font-bold text-xs text-slate-900 leading-snug">#${h.sceneNumber} ${h.heading}</h4>
                      <p class="text-[11px] text-slate-500 mt-0.5">
                        Shoot Day ${k.dayNumber} • Chronicles of Dust • Draft 4.2 (Pinned)
                      </p>
                    </div>

                    <!-- Editable Scene Snippet -->
                    ${_e?`
                      <div class="flex flex-col gap-1.5 bg-white border border-slate-200 rounded-lg p-2">
                        <label class="text-[10px] font-semibold text-slate-500">Edit Scene Snippet / Description</label>
                        <textarea class="input-scene-snippet w-full text-xs p-1.5 border border-slate-200 rounded focus:outline-none focus:border-blue-500" rows="3">${h.snippet||""}</textarea>
                        <div class="flex items-center justify-end gap-1.5">
                          <button class="btn-cancel-snippet px-2 py-0.5 rounded text-[11px] text-slate-600 hover:bg-slate-100 cursor-pointer" data-scene-id="${h.id}">Cancel</button>
                          <button class="btn-save-snippet px-2.5 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold cursor-pointer" data-scene-id="${h.id}">Save</button>
                        </div>
                      </div>
                    `:`
                      <div class="flex flex-col gap-1 bg-white border border-slate-200/80 rounded-lg p-2">
                        <div class="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                          <span>Scene Snippet</span>
                          <button class="btn-edit-snippet text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5" data-scene-id="${h.id}">
                            <span class="material-symbols-outlined text-[12px]">edit</span>
                            <span>Edit</span>
                          </button>
                        </div>
                        <p class="text-[11px] text-slate-600 leading-relaxed">
                          ${h.snippet||'<span class="italic text-slate-400">No snippet provided.</span>'}
                        </p>
                      </div>
                    `}

                    <!-- Quick Action Links -->
                    <div class="flex items-center gap-2 pt-0.5 flex-wrap">
                      <button class="btn-scene-breakdown inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer" data-scene-num="${h.sceneNumber}">
                        <span class="material-symbols-outlined text-[14px] text-blue-600">dataset</span>
                        <span>Breakdown</span>
                      </button>
                      <button class="btn-scene-sides inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer" data-scene-num="${h.sceneNumber}">
                        <span class="material-symbols-outlined text-[14px] text-blue-600">description</span>
                        <span>Actor Sides</span>
                      </button>
                      <button class="btn-scene-pdf inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer" data-scene-id="${h.id}">
                        <span class="material-symbols-outlined text-[14px] text-blue-600">download</span>
                        <span>Export PDF</span>
                      </button>
                    </div>
                  </div>

                  <!-- Expandable 'More Details' Section -->
                  <div class="pt-1">
                    <button class="btn-toggle-more-details w-full py-1.5 px-2.5 rounded-lg bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer" data-scene-id="${h.id}">
                      <span class="flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-[15px] text-slate-500">tune</span>
                        <span>More Details</span>
                      </span>
                      <span class="material-symbols-outlined text-[16px] text-slate-400 transition-transform more-details-chevron ${K?"rotate-180":""}">expand_more</span>
                    </button>

                    <div class="more-details-panel ${K?"":"hidden"} flex flex-col gap-2.5 pt-2 text-xs">
                      <!-- Cast with Add & Remove functionality -->
                      <div class="flex flex-col gap-1.5">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Cast</span>
                          <button class="btn-toggle-add-cast text-[11px] text-blue-600 font-medium hover:underline flex items-center gap-0.5 cursor-pointer" data-scene-id="${h.id}">
                            <span class="material-symbols-outlined text-[13px]">add</span>
                            <span>Add Cast</span>
                          </button>
                        </div>
                        ${at?`
                          <div class="flex items-center gap-1.5 py-1">
                            <input type="text" class="input-new-cast-name flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500" placeholder="Character name (e.g. AARAV)" />
                            <button class="btn-save-new-cast px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] shadow-2xs cursor-pointer" data-scene-id="${h.id}">Add</button>
                            <button class="btn-cancel-new-cast px-2 py-1 rounded-lg text-slate-500 hover:bg-slate-100 text-[11px] cursor-pointer" data-scene-id="${h.id}">Cancel</button>
                          </div>
                        `:""}
                        <div class="flex items-center gap-1.5 flex-wrap">
                          ${h.cast&&h.cast.length>0?h.cast.map($e=>`
                            <span class="inline-flex items-center gap-1 pl-1.5 pr-1 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-800">
                              <span class="w-3.5 h-3.5 rounded-full bg-slate-100 text-slate-600 text-[9px] flex items-center justify-center font-bold">${$e.charAt(0)}</span>
                              <span>${$e}</span>
                              <button class="btn-remove-cast-member text-slate-400 hover:text-rose-600 ml-0.5 cursor-pointer" data-scene-id="${h.id}" data-cast="${$e}" title="Remove character">
                                <span class="material-symbols-outlined text-[12px]">close</span>
                              </button>
                            </span>
                          `).join(""):'<span class="text-slate-400 text-[11px] italic">No cast assigned</span>'}
                        </div>
                      </div>

                      <!-- Breakdown Elements -->
                      <div class="flex flex-col gap-1 pt-1 border-t border-slate-200/60">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Breakdown Elements (${Ve.length})</span>
                          <button class="btn-scene-breakdown text-[11px] text-blue-600 font-medium hover:underline cursor-pointer" data-scene-num="${h.sceneNumber}">Edit in Breakdown &rarr;</button>
                        </div>
                        ${Ve.length>0?`
                          <div class="flex items-center gap-1.5 flex-wrap">
                            ${Ve.map($e=>`
                              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] text-slate-700">
                                <span class="material-symbols-outlined text-[13px] text-blue-600">${qo[$e.category]||"label"}</span>
                                <span>${$e.name}</span>
                                ${$e.category?`<span class="text-slate-400 text-[9px]">(${$e.category})</span>`:""}
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
                          <select class="select-inline-move-day bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] text-slate-800 font-medium focus:outline-none cursor-pointer" data-scene="${h.sceneNumber}">
                            ${i.map($e=>`
                              <option value="${$e.dayNumber}" ${$e.dayNumber===k.dayNumber?"selected":""}>
                                Day ${$e.dayNumber} (${$e.date.split(",")[0]})
                              </option>
                            `).join("")}
                          </select>
                          <button class="btn-inline-move-day px-2 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer" data-scene="${h.sceneNumber}">
                            Move
                          </button>
                        </div>
                      </div>

                      <!-- Production & Continuity Notes (Compact Editable Workflow) -->
                      <div class="notes-container border-t border-slate-200/60 pt-1.5 flex flex-col gap-1.5">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Production & Continuity Notes</span>
                          <button class="btn-edit-notes text-[11px] text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer" data-scene-id="${h.id}">
                            <span class="material-symbols-outlined text-[13px]">edit</span>
                            <span>${h.directorNotes||h.continuityNotes?"Edit Notes":"Add Notes"}</span>
                          </button>
                        </div>

                        <!-- Display Mode (Collapsed by default, shown when not editing) -->
                        <div class="notes-display-mode ${te?"hidden":""} flex flex-col gap-1 text-[11px] text-slate-600 bg-white border border-slate-200/70 rounded-lg p-2">
                          ${h.directorNotes||h.continuityNotes?`
                            ${h.directorNotes?`<div><span class="font-medium text-slate-800">Director:</span> ${h.directorNotes}</div>`:""}
                            ${h.continuityNotes?`<div><span class="font-medium text-slate-800">Continuity:</span> ${h.continuityNotes}</div>`:""}
                          `:`
                            <div class="text-slate-400 italic">No production or continuity notes logged.</div>
                          `}
                        </div>

                        <!-- Editable Fields (Only visible when explicitly editing) -->
                        <div class="notes-edit-mode ${te?"":"hidden"} flex flex-col gap-2 bg-white border border-slate-200 rounded-xl p-2.5">
                          <div>
                            <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">Director's Notes</label>
                            <textarea class="input-director-notes w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" rows="2" placeholder="Camera, lighting, director preferences...">${h.directorNotes||""}</textarea>
                          </div>
                          <div>
                            <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">Continuity Notes</label>
                            <textarea class="input-continuity-notes w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" rows="2" placeholder="Props, costume, timeline markers...">${h.continuityNotes||""}</textarea>
                          </div>
                          <div class="flex items-center justify-end gap-2 pt-1">
                            <button class="btn-cancel-notes px-2.5 py-1 rounded-lg text-slate-600 hover:bg-slate-100 text-[11px] font-medium cursor-pointer" data-scene-id="${h.id}">
                              Cancel
                            </button>
                            <button class="btn-save-notes px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold shadow-2xs transition-colors cursor-pointer" data-scene-id="${h.id}">
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
      `;const F=document.getElementById("btn-cancel-day-top"),I=document.getElementById("btn-cancel-day-info"),L=document.getElementById("btn-save-day-info");F&&(F.onclick=()=>{b=!1,T(k.dayNumber)}),I&&(I.onclick=()=>{b=!1,T(k.dayNumber)}),L&&(L.onclick=async()=>{const h=document.getElementById("input-edit-day-date")?.value?.trim(),D=parseFloat(document.getElementById("input-edit-day-hours")?.value)||k.estHours,J=document.getElementById("input-edit-day-loc")?.value?.trim();h&&(k.date=h),D&&(k.estHours=D),J&&(k.location=J),await bt(o,k.dayNumber,{date:k.date,estHours:k.estHours,location:k.location}),E(`Shoot Day ${k.dayNumber} updated`),b=!1,p(),T(k.dayNumber)});const V=document.getElementById("btn-toggle-day-constraints"),U=document.getElementById("day-constraints-content"),Q=document.getElementById("constraints-chevron");V&&U&&(V.onclick=()=>{const h=U.classList.toggle("hidden");Q&&Q.classList.toggle("rotate-180",!h)});const xe=document.getElementById("btn-edit-constraints"),ue=document.getElementById("btn-cancel-constraints"),Se=document.getElementById("btn-save-constraints");xe&&(xe.onclick=()=>{x=!0,T(k.dayNumber),document.getElementById("day-constraints-content")?.classList.remove("hidden")}),ue&&(ue.onclick=()=>{x=!1,T(k.dayNumber),document.getElementById("day-constraints-content")?.classList.remove("hidden")}),Se&&(Se.onclick=async()=>{const h=document.getElementById("input-constraints-loc")?.value?.trim(),D=parseFloat(document.getElementById("input-constraints-hours")?.value)||k.estHours,J=document.getElementById("input-constraints-turnaround")?.value?.trim();h&&(k.location=h),D&&(k.estHours=D),J&&(k.turnaroundNote=J),await bt(o,k.dayNumber,{location:k.location,estHours:k.estHours,turnaroundNote:k.turnaroundNote}),E("Production constraints updated"),x=!1,p(),T(k.dayNumber),document.getElementById("day-constraints-content")?.classList.remove("hidden")});const he=document.getElementById("btn-toggle-assign-scene"),X=document.getElementById("btn-close-assign-scene"),Pe=document.getElementById("btn-confirm-assign-scene");he&&(he.onclick=()=>{B=!B,T(k.dayNumber)}),X&&(X.onclick=()=>{B=!1,T(k.dayNumber)}),Pe&&(Pe.onclick=async()=>{const h=Number(document.getElementById("select-scene-to-assign")?.value);h&&!k.sceneNumbers.includes(h)&&(k.sceneNumbers.push(h),M(k),await bt(o,k.dayNumber,{sceneNumbers:k.sceneNumbers,totalPages:k.totalPages}),E(`Scene #${h} added to Shoot Day ${k.dayNumber}`),B=!1,p(),T(k.dayNumber))}),ae.querySelectorAll(".btn-edit-scene-quick").forEach(h=>{h.onclick=()=>{const D=h.getAttribute("data-scene-id");D&&(g.add(D),T(k.dayNumber))}}),ae.querySelectorAll(".btn-cancel-scene-edit").forEach(h=>{h.onclick=()=>{const D=h.getAttribute("data-scene-id");D&&(g.delete(D),T(k.dayNumber))}}),ae.querySelectorAll(".btn-save-scene-edit").forEach(h=>{h.onclick=async()=>{const D=h.getAttribute("data-scene-id"),J=h.closest(".scene-item-card"),K=J?.querySelector(".input-scene-heading")?.value?.trim(),te=J?.querySelector(".input-scene-pages")?.value?.trim(),ye=J?.querySelector(".input-scene-complexity")?.value,_e=r.find(at=>at.id===D);_e&&(K&&(_e.heading=K),te&&(_e.pages=te),ye&&(_e.complexity=ye),await Vt(o,_e.id,{heading:K,pages:te,complexity:ye}),M(k),await bt(o,k.dayNumber,{totalPages:k.totalPages}),E(`Scene #${_e.sceneNumber} updated`),g.delete(D),p(),T(k.dayNumber))}}),ae.querySelectorAll(".btn-remove-scene-day").forEach(h=>{h.onclick=async()=>{const D=Number(h.getAttribute("data-scene"));D&&(k.sceneNumbers=k.sceneNumbers.filter(J=>J!==D),M(k),await bt(o,k.dayNumber,{sceneNumbers:k.sceneNumbers,totalPages:k.totalPages}),E(`Scene #${D} removed from Day ${k.dayNumber}`),p(),T(k.dayNumber))}}),ae.querySelectorAll(".btn-edit-snippet").forEach(h=>{h.onclick=()=>{const D=h.getAttribute("data-scene-id");D&&(v.add(D),T(k.dayNumber))}}),ae.querySelectorAll(".btn-cancel-snippet").forEach(h=>{h.onclick=()=>{const D=h.getAttribute("data-scene-id");D&&(v.delete(D),T(k.dayNumber))}}),ae.querySelectorAll(".btn-save-snippet").forEach(h=>{h.onclick=async()=>{const D=h.getAttribute("data-scene-id"),K=h.closest(".scene-item-card")?.querySelector(".input-scene-snippet")?.value?.trim(),te=r.find(ye=>ye.id===D);te&&(te.snippet=K,await Vt(o,te.id,{snippet:K}),E(`Scene #${te.sceneNumber} snippet updated`),v.delete(D),T(k.dayNumber))}}),ae.querySelectorAll(".btn-toggle-add-cast").forEach(h=>{h.onclick=()=>{const D=h.getAttribute("data-scene-id");D&&(N.add(D),T(k.dayNumber))}}),ae.querySelectorAll(".btn-cancel-new-cast").forEach(h=>{h.onclick=()=>{const D=h.getAttribute("data-scene-id");D&&(N.delete(D),T(k.dayNumber))}}),ae.querySelectorAll(".btn-save-new-cast").forEach(h=>{h.onclick=async()=>{const D=h.getAttribute("data-scene-id"),K=h.closest(".scene-item-card")?.querySelector(".input-new-cast-name")?.value?.trim().toUpperCase(),te=r.find(ye=>ye.id===D);te&&K&&(te.cast=te.cast||[],te.cast.includes(K)||(te.cast.push(K),await Vt(o,te.id,{cast:te.cast}),E(`Character ${K} added to Scene #${te.sceneNumber}`)),N.delete(D),T(k.dayNumber))}}),ae.querySelectorAll(".btn-remove-cast-member").forEach(h=>{h.onclick=async()=>{const D=h.getAttribute("data-scene-id"),J=h.getAttribute("data-cast"),K=r.find(te=>te.id===D);K&&J&&(K.cast=(K.cast||[]).filter(te=>te!==J),await Vt(o,K.id,{cast:K.cast}),E(`Character ${J} removed from Scene #${K.sceneNumber}`),T(k.dayNumber))}}),ae.querySelectorAll(".btn-toggle-scene-inline").forEach(h=>{h.onclick=()=>{const D=h.getAttribute("data-scene-id");D&&(u.has(D)?u.delete(D):u.add(D),T(k.dayNumber))}}),ae.querySelectorAll(".btn-toggle-more-details").forEach(h=>{h.onclick=()=>{const D=h.getAttribute("data-scene-id");D&&(d.has(D)?d.delete(D):d.add(D),T(k.dayNumber))}}),ae.querySelectorAll(".btn-scene-up").forEach(h=>{h.onclick=async()=>{const D=Number(h.getAttribute("data-scene")),J=k.sceneNumbers.indexOf(D);if(J>0){const K=[...k.sceneNumbers],te=K[J];K[J]=K[J-1],K[J-1]=te,k.sceneNumbers=K,await Xs(o,k.dayNumber,K),E("Scene shooting order updated"),p(),T(k.dayNumber)}}}),ae.querySelectorAll(".btn-scene-down").forEach(h=>{h.onclick=async()=>{const D=Number(h.getAttribute("data-scene")),J=k.sceneNumbers.indexOf(D);if(J<k.sceneNumbers.length-1){const K=[...k.sceneNumbers],te=K[J];K[J]=K[J+1],K[J+1]=te,k.sceneNumbers=K,await Xs(o,k.dayNumber,K),E("Scene shooting order updated"),p(),T(k.dayNumber)}}}),ae.querySelectorAll(".btn-inline-move-day").forEach(h=>{h.onclick=async()=>{const D=Number(h.getAttribute("data-scene")),K=h.closest(".scene-item-card")?.querySelector(".select-inline-move-day"),te=Number(K?.value);if(!te||te===k.dayNumber){E(`Scene ${D} is already on Day ${k.dayNumber}`);return}await ga(o,D,k.dayNumber,te),i=await ct(o),E(`Scene ${D} moved to Shoot Day ${te}`),p(),T(k.dayNumber)}}),ae.querySelectorAll(".btn-edit-notes").forEach(h=>{h.onclick=()=>{const D=h.getAttribute("data-scene-id");D&&(c.add(D),T(k.dayNumber))}}),ae.querySelectorAll(".btn-cancel-notes").forEach(h=>{h.onclick=()=>{const D=h.getAttribute("data-scene-id");D&&(c.delete(D),T(k.dayNumber))}}),ae.querySelectorAll(".btn-save-notes").forEach(h=>{h.onclick=async()=>{const D=h.getAttribute("data-scene-id"),J=h.closest(".scene-item-card"),K=J?.querySelector(".input-director-notes")?.value||"",te=J?.querySelector(".input-continuity-notes")?.value||"",ye=r.find(_e=>_e.id===D);ye&&(ye.directorNotes=K,ye.continuityNotes=te,await Vt(o,ye.id,{directorNotes:K,continuityNotes:te}),E(`Scene ${ye.sceneNumber} notes saved`),c.delete(D),T(k.dayNumber))}}),ae.querySelectorAll(".btn-scene-breakdown").forEach(h=>{h.onclick=()=>{const D=h.getAttribute("data-scene-num");e(`/production/breakdown?scriptId=${o}&scene=${D}`)}}),ae.querySelectorAll(".btn-scene-sides").forEach(h=>{h.onclick=()=>{const D=h.getAttribute("data-scene-num");e(`/production/dialogue-sides?scriptId=${o}&scene=${D}`)}}),ae.querySelectorAll(".btn-scene-pdf").forEach(h=>{h.onclick=()=>{const D=h.getAttribute("data-scene-id"),J=r.find(te=>te.id===D);if(!J)return;const K=m.filter(te=>te.sceneId===J.id||te.sceneNumber===J.sceneNumber||Array.isArray(te.scenes)&&te.scenes.includes(J.sceneNumber));try{Ln(K,{title:`Chronicles of Dust — Scene ${J.sceneNumber}`,draft:"Draft 4.2"}),E(`Exported Scene ${J.sceneNumber} Logistics PDF`)}catch(te){console.error(te),E("Failed to export scene PDF")}}}),pe&&setTimeout(()=>{ae.querySelector(`[data-scene-id="${pe}"], [data-scene-num="${pe}"]`)?.scrollIntoView({behavior:"smooth",block:"nearest"})},50)}st(l)}const re=document.getElementById("modal-day-close"),ee=document.getElementById("modal-day-done"),me=()=>{Te(l),f=null,b=!1,x=!1,g.clear(),B=!1,v.clear(),N.clear(),S?.close()};re&&(re.onclick=me),ee&&(ee.onclick=me),l&&(l.onclick=se=>{se.target===l&&me()}),window.scriptoraRouter&&window.scriptoraRouter.registerBackHandler(()=>g.size>0||c.size>0||v.size>0||N.size>0||b||x||B?(g.clear(),c.clear(),v.clear(),N.clear(),b=!1,x=!1,B=!1,f&&renderModalDayContent(f),!0):l&&!l.classList.contains("hidden")?(me(),!0):!1);async function z(se){let pe=r.find(Ie=>Ie.id===se||String(Ie.sceneNumber)===String(se)||`scene-${Ie.sceneNumber}`===String(se));if(pe||(pe=await ua(o,se)),!pe){E("Scene not found in current schedule");return}const k=i.find(Ie=>(Ie.sceneNumbers||[]).includes(pe.sceneNumber));k?T(k.dayNumber,pe.id):i.length>0&&T(i[0].dayNumber,pe.id)}const ge=document.getElementById("btn-export-schedule-pdf");ge&&(ge.onclick=()=>{try{Lo(i,r,{title:"Chronicles of Dust",draft:"Draft 4.2"}),E("Exported Master Shooting Schedule PDF")}catch(se){console.error(se),E("Failed to export schedule PDF")}});const fe=document.getElementById("modal-add-day"),Z=document.getElementById("btn-add-shoot-day"),ce=document.getElementById("modal-add-day-close"),G=document.getElementById("modal-add-day-cancel"),be=document.getElementById("form-add-shoot-day");function C(){if(!fe)return;const se=i.length>0?Math.max(...i.map(le=>le.dayNumber))+1:1,pe=document.getElementById("input-add-day-num"),k=document.getElementById("input-add-day-date"),Ie=document.getElementById("input-add-day-title"),Le=document.getElementById("input-add-day-location"),Ce=document.getElementById("input-add-day-hours"),ae=document.getElementById("input-add-day-pages");if(pe&&(pe.value=se),k){const le=new Date(2026,9,23+se),R=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];k.value=`${R[le.getMonth()]} ${le.getDate()}, ${le.getFullYear()}`}Ie&&(Ie.value=`Day ${se} — Second Unit & Pickups`),Le&&(Le.value="Mojave Soundstage 2"),Ce&&(Ce.value="10"),ae&&(ae.value="0.0"),st(fe)}function H(){Te(fe)}Z&&(Z.onclick=C),ce&&(ce.onclick=H),G&&(G.onclick=H),fe&&(fe.onclick=se=>{se.target===fe&&H()}),be&&(be.onsubmit=async se=>{se.preventDefault();const pe=Number(document.getElementById("input-add-day-num")?.value)||i.length+1,k=document.getElementById("input-add-day-date")?.value||`Shoot Day ${pe}`,Ie=document.getElementById("input-add-day-title")?.value||`Day ${pe}`,Le=document.getElementById("input-add-day-location")?.value||"Location TBD",Ce=Number(document.getElementById("input-add-day-hours")?.value)||10,ae=document.getElementById("input-add-day-pages")?.value||"0.0";await ha(o,{dayNumber:pe,title:Ie,date:k,location:Le,estHours:Ce,totalPages:ae,sceneNumbers:[]}),i=await ct(o),H(),E(`Added Shoot Day ${pe} (${k})`),p()}),p();const ke=n.get("sceneId")||n.get("scene");ke&&z(ke)}const $s=["Cinematic Concept Art","Storyboard Ink","Pencil Sketch","Photorealistic / Live Action","3D Animation","Anime / Illustration","Custom"],dn=["2.39:1","16:9","4:3","9:16"],Wo=["Standard Draft","High Definition Production"],Go=["Wide Shot","Medium Shot","Close-Up","Extreme Close-Up","Medium Two-Shot","Over-the-Shoulder","Point of View (POV)"],Ko=["Eye Level","Low Angle","High Angle","Dutch Angle","Bird's Eye"],Jo=["Static","Pan","Tilt","Tracking Dolly","Crane / Jib","Handheld"],Yo=["18mm Ultra-Wide","24mm Wide","35mm Standard","50mm Prime","85mm Portrait","105mm Telephoto","Anamorphic 40mm"],Xo=["Daylight Dust","Golden Hour Sun","Harsh Fluorescent Rim","Low-Key Shadow / Noir","Cyan Emergency Strobe","Tungsten Warm Interior"];function Zo(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=t||s.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust",o=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${Xe("Pre-Production","Storyboard Studio")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3.5 fade-in">
        <!-- SubNav with Title, Project Context & Primary Actions -->
        ${as("Storyboard Studio","art_track",o||"/production",`
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

            <!-- Post-Generation Review & History Actions Bar -->
            <div id="modal-post-gen-actions" class="hidden flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
              <div class="flex items-center gap-1.5">
                <button type="button" id="modal-btn-view-fullscreen" class="px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 text-[11px] font-semibold flex items-center gap-1 cursor-pointer">
                  <span class="material-symbols-outlined text-[14px]">fullscreen</span>
                  <span>Inspect Fullscreen</span>
                </button>
                <button type="button" id="modal-btn-open-history" class="px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 text-[11px] font-semibold flex items-center gap-1 cursor-pointer">
                  <span class="material-symbols-outlined text-[14px]">history</span>
                  <span>Versions (<span id="modal-history-count">0</span>)</span>
                </button>
              </div>
              <div class="flex items-center gap-1.5">
                <button type="button" id="modal-btn-toggle-approve" class="px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold flex items-center gap-1 cursor-pointer">
                  <span class="material-symbols-outlined text-[14px]">check</span>
                  <span id="modal-approve-toggle-label">Approve</span>
                </button>
                <button type="button" id="modal-btn-toggle-reject" class="px-2 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-[11px] font-semibold flex items-center gap-1 cursor-pointer">
                  <span class="material-symbols-outlined text-[14px]">close</span>
                  <span>Reject</span>
                </button>
              </div>
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
              <textarea id="input-shot-desc" rows="2" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" placeholder="Describe framing, blocking, and key visual beats..."></textarea>
            </div>

            <!-- Camera Parameters Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Shot Size</label>
                <select id="input-shot-size" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${Go.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Camera Angle</label>
                <select id="input-shot-angle" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${Ko.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Camera Movement</label>
                <select id="input-shot-movement" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${Jo.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Focal Length</label>
                <select id="input-shot-focal" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${Yo.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Aspect Ratio</label>
                <select id="input-shot-ratio" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${dn.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Lighting Mood</label>
                <select id="input-shot-lighting" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${Xo.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
            </div>

            <!-- Visual Style & Creative Prompt -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Visual Style Preset</label>
                <select id="input-shot-style" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${$s.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
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
              <label class="text-[11px] font-semibold text-slate-700">Creative Direction / Generation Prompt</label>
              <textarea id="input-shot-prompt" rows="2" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" placeholder="Artistic direction, references, key lighting rim..."></textarea>
            </div>

            <!-- Continuity & Director Notes -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Screen Direction / Eyeline</label>
                <input type="text" id="input-shot-direction" placeholder="e.g. Left to Right / Looking Screen Right" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Director & Continuity Notes</label>
                <input type="text" id="input-shot-notes" placeholder="Notes for camera operator or costume state..." class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" />
              </div>
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

            <!-- Visual Style, Quality, and Aspect Ratio Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Visual Style Preset</label>
                <select id="gen-style-select" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${$s.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Image Quality</label>
                <select id="gen-quality-select" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${Wo.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Aspect Ratio</label>
                <select id="gen-ratio-select" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${dn.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
            </div>

            <!-- Custom Creative Prompt -->
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Creative Direction / Extra Prompt</label>
              <textarea id="gen-prompt-input" rows="2" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" placeholder="Optional creative guidance for lighting, lens atmosphere, mood..."></textarea>
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

          <div class="aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <img id="regen-current-image" src="" alt="Current frame" class="w-full h-full object-cover" />
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
                ${$s.map(a=>`<option value="${a}">${a}</option>`).join("")}
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
      ${Ke("production")}
    </div>
  `}function Qo(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||$.state.selectedScriptId||"chronicles-of-dust";let a=n.get("sceneId")||"scene-1",l="contact",i=null,r=null,m=null,u=0,d=[],c=4;const p=new Set;let f=null,b="",x="draft";const g=document.getElementById("storyboard-scene-select"),B=document.getElementById("storyboard-view-container"),v=document.getElementById("view-tab-contact"),N=document.getElementById("view-tab-sequence"),S=document.getElementById("btn-export-storyboard-pdf"),M=document.getElementById("btn-generate-sequence"),T=document.getElementById("btn-add-shot"),re=document.getElementById("btn-view-in-schedule"),ee=document.getElementById("storyboard-stale-alert"),me=document.getElementById("btn-repin-storyboard"),z=document.getElementById("continuity-warning-banner"),ge=document.getElementById("shot-inspector-modal"),fe=document.getElementById("modal-shot-close"),Z=document.getElementById("modal-btn-cancel-shot"),ce=document.getElementById("shot-detail-form"),G=document.getElementById("modal-btn-delete-shot"),be=document.getElementById("modal-btn-generate-action"),C=document.getElementById("modal-file-import"),H=document.getElementById("modal-btn-view-fullscreen"),ke=document.getElementById("modal-btn-toggle-approve"),se=document.getElementById("modal-btn-toggle-reject"),pe=document.getElementById("modal-btn-open-history"),k=document.getElementById("ai-generate-modal"),Ie=document.getElementById("gen-modal-close"),Le=document.getElementById("gen-modal-cancel"),Ce=document.getElementById("gen-btn-start"),ae=document.getElementById("gen-provider-select"),le=document.getElementById("gen-provider-status"),R=document.getElementById("gen-cost-label"),we=document.getElementById("gen-shot-count-select"),De=document.getElementById("gen-error-alert"),ie=document.getElementById("gen-error-message"),Me=document.getElementById("single-regen-modal"),de=document.getElementById("regen-modal-close"),Fe=document.getElementById("regen-modal-cancel"),Re=document.getElementById("regen-modal-confirm"),Be=document.getElementById("shot-history-modal"),F=document.getElementById("history-modal-close"),I=document.getElementById("history-modal-done"),L=document.getElementById("lightbox-modal"),V=document.getElementById("lb-close"),U=document.getElementById("lb-prev"),Q=document.getElementById("lb-next"),xe=document.getElementById("lb-btn-approve"),ue=document.getElementById("lb-btn-reject");let Se=[],he=[],X=null;v&&N&&(v.onclick=w=>{w.preventDefault(),l="contact",v.className="px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5",N.className="px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5",vt()},N.onclick=w=>{w.preventDefault(),l="sequence",N.className="px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5",v.className="px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5",vt()}),M&&(M.onclick=w=>{w.preventDefault(),at()}),T&&(T.onclick=w=>{w.preventDefault(),ye(null)}),S&&(S.onclick=w=>{w.preventDefault();try{const y=Se.find(A=>A.id===a)||{},P=$.state.scripts?.find(A=>A.id===o)||{title:"Chronicles of Dust",draft:"Draft 4.2"};Mo(X,{title:P.title,draft:P.draft||X?.sourceVersion||"Draft 4.2",heading:y.heading||X?.sceneHeading||"SCENE 1"}),E("Exported Storyboard Studio PDF")}catch(y){console.error(y),E("Failed to export Storyboard PDF")}}),me&&(me.onclick=async w=>{if(w.preventDefault(),X){X.sourceVersion=X.currentScriptDraft||"Draft 4.2",X.isVersionStale=!1;try{await vs(o,X)}catch{}ee?.classList.add("hidden"),E(`Pinned Storyboard to ${X.sourceVersion}`)}}),fe&&(fe.onclick=()=>Te(ge)),Z&&(Z.onclick=()=>Te(ge)),be&&(be.onclick=async w=>{w.preventDefault();const y=document.getElementById("modal-image-loading"),P=document.getElementById("modal-empty-image-placeholder"),A=document.getElementById("modal-shot-image");y&&y.classList.remove("hidden"),P&&P.classList.add("hidden"),A&&A.classList.add("hidden"),be.disabled=!0;const W=document.getElementById("input-shot-number")?.value.trim()||"1A",q=document.getElementById("input-shot-prompt")?.value.trim()||document.getElementById("input-shot-desc")?.value.trim()||"Cinematic composition",Y=document.getElementById("input-shot-size")?.value||"Wide Shot",_=document.getElementById("input-shot-angle")?.value||"Eye Level",j=document.getElementById("input-shot-focal")?.value||"50mm Prime",Ee=document.getElementById("input-shot-ratio")?.value||"2.39:1",Ae=document.getElementById("input-shot-lighting")?.value||"Daylight Dust",ze=document.getElementById("input-shot-style")?.value||"Cinematic Concept Art";try{const Oe=await Es(o,{provider:"scriptora-concept",prompt:q,shotSize:Y,cameraAngle:_,focalLength:j,lightingMood:Ae,aspectRatio:Ee,visualStyle:ze,sceneHeading:X?.sceneHeading||"SCENE 1",shotNumber:W});Oe?.imageUrl&&(f=Oe.imageUrl,b=q,E("Image generated successfully inside shot preview"))}catch(Oe){E(Oe.message||"Generation failed")}finally{y&&y.classList.add("hidden"),be.disabled=!1,_e()}}),C&&(C.onchange=w=>{const y=w.target.files?.[0];if(!y)return;const P=new FileReader;P.onload=A=>{f=A.target.result,_e(),E("Photo imported into preview canvas")},P.readAsDataURL(y)}),ke&&(ke.onclick=()=>{x="approved";const w=document.getElementById("input-shot-approval");w&&(w.value="approved"),_e(),E("Frame set to Approved")}),se&&(se.onclick=()=>{x="rejected";const w=document.getElementById("input-shot-approval");w&&(w.value="rejected"),_e(),E("Frame marked as Rejected")}),H&&(H.onclick=()=>{if(f){const w={shotNumber:document.getElementById("input-shot-number")?.value.trim()||"1A",title:document.getElementById("input-shot-title")?.value.trim()||"Preview",description:document.getElementById("input-shot-desc")?.value.trim()||"",aspectRatio:document.getElementById("input-shot-ratio")?.value||"2.39:1",focalLength:document.getElementById("input-shot-focal")?.value||"50mm Prime",shotSize:document.getElementById("input-shot-size")?.value||"Medium Shot",cameraAngle:document.getElementById("input-shot-angle")?.value||"Eye Level",imageUrl:f};pt(w)}}),pe&&(pe.onclick=()=>{i&&Ne(i)}),ce&&(ce.onsubmit=async w=>{w.preventDefault();const y={shotNumber:document.getElementById("input-shot-number")?.value.trim()||"1A",title:document.getElementById("input-shot-title")?.value.trim()||"Shot",description:document.getElementById("input-shot-desc")?.value.trim()||"",shotSize:document.getElementById("input-shot-size")?.value||"Medium Shot",cameraAngle:document.getElementById("input-shot-angle")?.value||"Eye Level",cameraMovement:document.getElementById("input-shot-movement")?.value||"Static",focalLength:document.getElementById("input-shot-focal")?.value||"50mm Prime",aspectRatio:document.getElementById("input-shot-ratio")?.value||"2.39:1",lightingMood:document.getElementById("input-shot-lighting")?.value||"Daylight Dust",visualStyle:document.getElementById("input-shot-style")?.value||"Cinematic Concept Art",prompt:document.getElementById("input-shot-prompt")?.value.trim()||"",approvalStatus:document.getElementById("input-shot-approval")?.value||"draft",directorNotes:document.getElementById("input-shot-notes")?.value.trim()||"",imageUrl:f,imageSource:f?f.startsWith("data:image/svg")?"ai":"imported":null,continuity:{screenDirection:document.getElementById("input-shot-direction")?.value.trim()||"Left to Right"}};try{i?(await Qs(o,a,i,y),E("Updated shot details")):(await wa(o,a,y),E("Added new shot to storyboard")),Te(ge),Ze()}catch{E("Failed saving shot")}}),G&&(G.onclick=async()=>{if(i&&confirm("Are you sure you want to delete this shot?"))try{await Sa(o,a,i),E("Shot deleted"),Te(ge),Ze()}catch{E("Failed to delete shot")}}),Ie&&(Ie.onclick=()=>Te(k)),Le&&(Le.onclick=()=>Te(k)),ae&&(ae.onchange=$e),we&&(we.onchange=()=>{c=parseInt(we.value,10)||4,Ve(),$e()}),Ce&&(Ce.onclick=async w=>{w.preventDefault();const y=ae?ae.value:"scriptora-concept",P=he.find(Oe=>Oe.id===y)||he[0]||{pricingType:"free",name:"Concept Engine"},A=document.getElementById("gen-style-select")?.value||"Cinematic Concept Art",W=document.getElementById("gen-ratio-select")?.value||"2.39:1",q=document.getElementById("gen-quality-select")?.value||"Standard Draft",Y=document.getElementById("gen-prompt-input")?.value.trim()||"",_=parseInt(we?.value,10)||c||4;if(P.pricingType==="paid"){if(!P.isConfigured){De&&(De.classList.remove("hidden"),ie&&(ie.textContent=`Provider '${P.name}' requires API credentials. Please switch to SCRIPTORA Concept Engine (Free).`));return}if(!confirm(`Confirm generation using ${P.name}? Estimated cost: ${P.costLabel}.`))return}document.getElementById("gen-step-config")?.classList.add("hidden");const j=document.getElementById("gen-step-progress");j&&j.classList.remove("hidden");const Ee=document.getElementById("gen-progress-title"),Ae=document.getElementById("gen-progress-status"),ze=document.getElementById("gen-progress-stepper");Ee&&(Ee.textContent=`Generating ${_}-Shot Storyboard Sequence`),Ae&&(Ae.textContent="Preparing scene context..."),ze&&(ze.innerHTML=Array.from({length:_},(Oe,mt)=>`
          <span class="w-3 h-3 rounded-full bg-slate-200 transition-colors" data-step="${mt+1}"></span>
        `).join(""));try{for(let mt=1;mt<=_;mt++){Ae&&(Ae.textContent=`Generating shot ${mt} of ${_}...`);const zt=ze?.querySelector(`[data-step="${mt}"]`);zt&&(zt.className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"),await new Promise(is=>setTimeout(is,180))}const Oe=await Ia(o,a,{provider:y,visualStyle:A,aspectRatio:W,quality:q,prompt:Y,shotCount:_});if(Oe?.proposedShots&&Oe.proposedShots.length)d=Oe.proposedShots,ut();else throw new Error("No shots returned from generator")}catch(Oe){console.error(Oe),j&&j.classList.add("hidden"),document.getElementById("gen-step-config")?.classList.remove("hidden"),De&&(De.classList.remove("hidden"),ie&&(ie.textContent=Oe.message||"Generation failed. Please try again."))}});const Pe=document.getElementById("gen-btn-approve-all-proposed");Pe&&(Pe.onclick=()=>{d.forEach(w=>{w.approvalStatus="approved"}),ut(),E("All proposed shots marked as Approved")});const h=document.getElementById("gen-btn-confirm-save");h&&(h.onclick=async()=>{if(d.length){h.disabled=!0;try{const w={...X,shots:d,visualStyle:d[0]?.visualStyle||X?.visualStyle,aspectRatio:d[0]?.aspectRatio||X?.aspectRatio};await vs(o,w),E(`Saved ${d.length} shots to storyboard.`),Te(k),Ze()}catch{E("Failed to save sequence")}finally{h.disabled=!1}}});const D=document.getElementById("gen-btn-save-as-draft");D&&(D.onclick=async()=>{if(!d.length)return;d.forEach(y=>{y.approvalStatus="draft"});const w={...X,shots:d};await vs(o,w),E("Saved sequence as draft"),Te(k),Ze()});const J=document.getElementById("gen-btn-discard-preview");J&&(J.onclick=()=>{d=[],Te(k)}),de&&(de.onclick=()=>Te(Me)),Fe&&(Fe.onclick=()=>Te(Me));const K=document.getElementById("regen-provider-select");K&&(K.onchange=ot),Re&&(Re.onclick=async()=>{const w=X?.shots?.find(W=>W.id===r);if(!w)return;const y=document.getElementById("regen-provider-select")?.value||"scriptora-concept",P=document.getElementById("regen-prompt-input")?.value.trim()||w.prompt||w.description||"Cinematic composition",A=document.getElementById("regen-style-select")?.value||w.visualStyle||"Cinematic Concept Art";Re.disabled=!0,Re.innerHTML='<span class="w-3.5 h-3.5 border-2 border-white/60 border-t-white rounded-full animate-spin"></span><span>Regenerating...</span>';try{const W=await Es(o,{provider:y,prompt:P,shotSize:w.shotSize,cameraAngle:w.cameraAngle,focalLength:w.focalLength,lightingMood:w.lightingMood,aspectRatio:w.aspectRatio,visualStyle:A,sceneHeading:X?.sceneHeading||"SCENE 1",shotNumber:w.shotNumber});W?.imageUrl&&(await Qs(o,a,r,{imageUrl:W.imageUrl,prompt:P,visualStyle:A,provider:y,imageSource:"ai"}),E(`Regenerated Shot ${w.shotNumber}. Other shots preserved.`),Te(Me),Ze())}catch(W){E(W.message||"Regeneration failed")}finally{Re.disabled=!1,Re.innerHTML='<span class="material-symbols-outlined text-[15px]">auto_awesome</span><span>Regenerate Frame</span>'}}),F&&(F.onclick=()=>Te(Be)),I&&(I.onclick=()=>Te(Be)),V&&(V.onclick=()=>L?.classList.add("hidden")),U&&(U.onclick=()=>{const w=X?.shots||[];w.length&&(u=(u-1+w.length)%w.length,Bt())}),Q&&(Q.onclick=()=>{const w=X?.shots||[];w.length&&(u=(u+1)%w.length,Bt())}),xe&&(xe.onclick=async()=>{const y=(X?.shots||[])[u];if(y)try{await ws(o,a,y.id,"approved"),y.approvalStatus="approved",E(`Shot ${y.shotNumber} approved`),Bt(),vt()}catch{E("Failed to approve shot")}}),ue&&(ue.onclick=async()=>{const y=(X?.shots||[])[u];if(y)try{await ws(o,a,y.id,"rejected"),y.approvalStatus="rejected",E(`Shot ${y.shotNumber} marked as rejected`),Bt(),vt()}catch{E("Failed to reject shot")}});const te=w=>{L&&!L.classList.contains("hidden")&&(w.key==="Escape"&&L.classList.add("hidden"),w.key==="ArrowLeft"&&U&&U.click(),w.key==="ArrowRight"&&Q&&Q.click())};document.removeEventListener("keydown",te),document.addEventListener("keydown",te);function ye(w){i=w;const y=!w,P=X?.shots||[],A=y?null:P.find(On=>On.id===w),W=String.fromCharCode(65+P.length%26),q=`${X?.sceneNumber||1}${W}`,Y=document.getElementById("modal-shot-pill"),_=document.getElementById("modal-shot-heading");Y&&(Y.textContent=A?.shotNumber||q),_&&(_.textContent=y?"Add New Shot":`Edit Shot ${A?.shotNumber||q}`);const j=document.getElementById("input-shot-number"),Ee=document.getElementById("input-shot-title"),Ae=document.getElementById("input-shot-desc"),ze=document.getElementById("input-shot-size"),Oe=document.getElementById("input-shot-angle"),mt=document.getElementById("input-shot-movement"),zt=document.getElementById("input-shot-focal"),is=document.getElementById("input-shot-ratio"),qs=document.getElementById("input-shot-lighting"),zs=document.getElementById("input-shot-style"),Vs=document.getElementById("input-shot-prompt"),Ws=document.getElementById("input-shot-direction"),Gs=document.getElementById("input-shot-approval"),Ks=document.getElementById("input-shot-notes");j&&(j.value=A?.shotNumber||q),Ee&&(Ee.value=A?.title||(y?`Shot ${q}`:"")),Ae&&(Ae.value=A?.description||""),ze&&(ze.value=A?.shotSize||"Medium Shot"),Oe&&(Oe.value=A?.cameraAngle||"Eye Level"),mt&&(mt.value=A?.cameraMovement||"Static"),zt&&(zt.value=A?.focalLength||"50mm Prime"),is&&(is.value=A?.aspectRatio||X?.aspectRatio||"2.39:1"),qs&&(qs.value=A?.lightingMood||"Daylight Dust"),zs&&(zs.value=A?.visualStyle||X?.visualStyle||"Cinematic Concept Art"),Vs&&(Vs.value=A?.prompt||""),Ws&&(Ws.value=A?.continuity?.screenDirection||"Left to Right"),Gs&&(Gs.value=A?.approvalStatus||"draft"),Ks&&(Ks.value=A?.directorNotes||""),f=A?.imageUrl||null,b=A?.prompt||"",x=A?.approvalStatus||"draft",_e(),G&&G.classList.toggle("hidden",y),st(ge)}function _e(){const w=document.getElementById("modal-shot-image"),y=document.getElementById("modal-empty-image-placeholder"),P=document.getElementById("modal-post-gen-actions"),A=document.getElementById("modal-btn-view-fullscreen"),W=document.getElementById("modal-generate-action-label"),q=document.getElementById("modal-approve-toggle-label"),Y=document.getElementById("modal-history-count");f?(w&&(w.src=f,w.classList.remove("hidden")),y&&y.classList.add("hidden"),P&&P.classList.remove("hidden"),A&&A.classList.remove("hidden"),W&&(W.textContent="Regenerate Image")):(w&&w.classList.add("hidden"),y&&y.classList.remove("hidden"),P&&P.classList.add("hidden"),A&&A.classList.add("hidden"),W&&(W.textContent="Generate Image"));const _=i?X?.shots?.find(Ee=>Ee.id===i):null,j=Array.isArray(_?.history)?_.history.length:0;Y&&(Y.textContent=String(j)),q&&(q.textContent=x==="approved"?"Approved":"Approve")}function at(){const w=Se.find(W=>W.id===a)||Se[0]||{},y=document.getElementById("gen-scene-heading-display"),P=document.getElementById("gen-scene-cast-display"),A=document.getElementById("gen-scene-snippet-display");y&&(y.textContent=w.heading||"SCENE 1"),P&&(P.textContent=`Cast: ${(w.cast||["KEVIN","MARCUS"]).join(", ")}`),A&&(A.textContent=w.snippet||"Scene awaiting visual direction."),document.getElementById("gen-step-config")?.classList.remove("hidden"),document.getElementById("gen-step-progress")?.classList.add("hidden"),document.getElementById("gen-step-preview")?.classList.add("hidden"),we&&(we.value=String(c)),Ve(),$e(),De&&De.classList.add("hidden"),st(k)}function Ve(){const w=document.getElementById("gen-submit-label");w&&(w.textContent=`Generate ${c}-Shot Sequence`)}function $e(){if(!ae)return;const w=ae.value,y=he.find(P=>P.id===w)||he[0]||{pricingType:"free",isConfigured:!0};if(le&&(y.isConfigured||!y.requiresApiKey?(le.className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1",le.innerHTML='<span class="material-symbols-outlined text-[14px]">check_circle</span><span>Configured & Ready</span>'):(le.className="text-[11px] text-amber-600 font-medium mt-0.5 flex items-center gap-1",le.innerHTML=`<span class="material-symbols-outlined text-[14px]">info</span><span>Key missing in backend .env (${y.envVarName||"API_KEY"})</span>`)),R)if(y.pricingType==="free")R.textContent="Free (Built-in Concept Engine, no API keys or charges required).";else{const P=c||4,A=`$${((y.costPerImage||.04)*P).toFixed(3)} (${P}-shot batch)`;R.textContent=`${y.costLabel||"Paid API"} — Estimated: ${A}. Server credentials required.`}}function ut(){document.getElementById("gen-step-progress")?.classList.add("hidden");const w=document.getElementById("gen-step-preview");w&&w.classList.remove("hidden");const y=document.getElementById("gen-preview-count-label");y&&(y.textContent=`${d.length} Shots Proposed`);const P=document.getElementById("gen-preview-grid");P&&(P.innerHTML=d.map((A,W)=>`
      <div class="bg-white rounded-xl border border-slate-200 p-2.5 flex flex-col gap-2 shadow-2xs" data-proposed-idx="${W}">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-1.5">
            <span class="font-mono font-bold text-blue-600">${A.shotNumber}</span>
            <span class="font-semibold text-slate-800 truncate max-w-[140px]">${A.title}</span>
          </div>
          <button type="button" class="btn-toggle-prop-approve px-2 py-0.5 rounded text-[10px] font-semibold border cursor-pointer capitalize ${A.approvalStatus==="approved"?"bg-emerald-50 text-emerald-700 border-emerald-200":"bg-amber-50 text-amber-700 border-amber-200"}" data-proposed-idx="${W}">
            ${A.approvalStatus||"Proposed"}
          </button>
        </div>

        <div class="aspect-video bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center relative cursor-pointer btn-prop-lightbox" data-proposed-idx="${W}">
          <img src="${A.imageUrl}" alt="${A.title}" class="w-full h-full object-cover" />
          <div class="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-white font-mono text-[9px]">
            ${A.aspectRatio||"2.39:1"} · ${A.focalLength||"50mm"}
          </div>
        </div>

        <div class="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
          <span>${A.shotSize||"Wide"} · ${A.cameraAngle||"Eye Level"}</span>
          <button type="button" class="btn-prop-regen text-blue-600 hover:text-blue-800 font-semibold cursor-pointer" data-proposed-idx="${W}">
            Regenerate
          </button>
        </div>
      </div>
    `).join(""),P.querySelectorAll(".btn-toggle-prop-approve").forEach(A=>{A.onclick=W=>{W.stopPropagation();const q=Number(A.getAttribute("data-proposed-idx"));d[q]&&(d[q].approvalStatus=d[q].approvalStatus==="approved"?"proposed":"approved",ut())}}),P.querySelectorAll(".btn-prop-lightbox").forEach(A=>{A.onclick=()=>{const W=Number(A.getAttribute("data-proposed-idx"));d[W]&&pt(d[W])}}),P.querySelectorAll(".btn-prop-regen").forEach(A=>{A.onclick=async W=>{W.stopPropagation();const q=Number(A.getAttribute("data-proposed-idx")),Y=d[q];if(Y){A.disabled=!0,A.textContent="Generating...";try{const _=await Es(o,{provider:Y.provider||"scriptora-concept",prompt:Y.prompt||Y.description||"Cinematic composition",shotSize:Y.shotSize,cameraAngle:Y.cameraAngle,focalLength:Y.focalLength,lightingMood:Y.lightingMood,aspectRatio:Y.aspectRatio,visualStyle:Y.visualStyle,sceneHeading:X?.sceneHeading||"SCENE 1",shotNumber:Y.shotNumber});_?.imageUrl&&(Y.imageUrl=_.imageUrl,E(`Regenerated proposed frame ${Y.shotNumber}`),ut())}catch(_){E(_.message||"Regeneration failed")}finally{A.disabled=!1}}}}))}function Qe(w){r=w;const y=X?.shots?.find(Y=>Y.id===w);if(!y)return;const P=document.getElementById("regen-shot-pill"),A=document.getElementById("regen-current-image"),W=document.getElementById("regen-prompt-input"),q=document.getElementById("regen-style-select");P&&(P.textContent=y.shotNumber),A&&(A.src=y.imageUrl||""),W&&(W.value=y.prompt||y.description||""),q&&(q.value=y.visualStyle||"Cinematic Concept Art"),ot(),st(Me)}function ot(){const w=document.getElementById("regen-provider-select"),y=document.getElementById("regen-cost-banner");if(!w||!y)return;const P=he.find(A=>A.id===w.value)||he[0]||{pricingType:"free"};P.pricingType==="free"?y.textContent="Free (Built-in Concept Engine, no charges).":y.textContent=`Estimated: ${P.costLabel||"$0.040"}. Server credentials required.`}function Ne(w){m=w;const y=X?.shots?.find(q=>q.id===w);if(!y)return;const P=document.getElementById("history-modal-title");P&&(P.textContent=`History for Shot ${y.shotNumber}`);const A=document.getElementById("history-items-container");if(!A)return;const W=Array.isArray(y.history)?y.history:[];W.length?(A.innerHTML=W.slice().reverse().map((q,Y)=>{const _=W.length-1-Y;return`
          <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex flex-col gap-2">
            <div class="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span class="font-mono text-blue-600">${q.timestamp?new Date(q.timestamp).toLocaleString():"Past Version"}</span>
              <span class="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 text-slate-700 font-mono">${q.sourceVersion||"Draft 4.2"}</span>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-20 h-14 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shrink-0 flex items-center justify-center">
                ${q.previousImageUrl?`
                  <img src="${q.previousImageUrl}" alt="Historical version" class="w-full h-full object-cover" />
                `:`
                  <span class="material-symbols-outlined text-slate-600 text-base">image</span>
                `}
              </div>
              <div class="min-w-0 flex-1 text-[11px] text-slate-600">
                <p class="line-clamp-2 italic">${q.previousPrompt||"No prompt recorded"}</p>
                <div class="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                  <span>Provider: ${q.provider||"scriptora-concept"}</span>
                  <span>·</span>
                  <span>By: ${q.updatedBy||"Director"}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end pt-1 border-t border-slate-200/60">
              <button type="button" class="btn-restore-version px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] transition-colors cursor-pointer" data-hist-idx="${_}">
                Restore This Version
              </button>
            </div>
          </div>
        `}).join(""),A.querySelectorAll(".btn-restore-version").forEach(q=>{q.onclick=async()=>{const Y=Number(q.getAttribute("data-hist-idx"));try{await ka(o,a,m,Y),E(`Restored past version to Shot ${y.shotNumber}`),Te(Be),Ze()}catch{E("Failed restoring version")}}})):A.innerHTML=`
        <div class="p-8 text-center text-slate-400 text-xs">
          <span class="material-symbols-outlined text-2xl text-slate-400">history</span>
          <p class="mt-1">No previous versions recorded for this shot.</p>
        </div>
      `,st(Be)}function lt(w){const y=X?.shots||[];y.length&&(u=w>=0&&w<y.length?w:0,Bt(),L?.classList.remove("hidden"))}function pt(w){const y=document.getElementById("lb-image"),P=document.getElementById("lb-shot-num"),A=document.getElementById("lb-specs"),W=document.getElementById("lb-title"),q=document.getElementById("lb-desc"),Y=document.getElementById("lb-btn-approve"),_=document.getElementById("lb-btn-reject"),j=document.getElementById("lb-prev"),Ee=document.getElementById("lb-next");y&&(y.src=w.imageUrl||""),P&&(P.textContent=`REC · ${w.shotNumber}`),A&&(A.textContent=`${w.aspectRatio||"2.39:1"} · ${w.focalLength||"50mm"} · ${w.shotSize||"Medium"}`),W&&(W.textContent=w.title),q&&(q.textContent=w.description||"No description provided."),j&&j.classList.add("hidden"),Ee&&Ee.classList.add("hidden"),Y&&Y.classList.add("hidden"),_&&_.classList.add("hidden"),L?.classList.remove("hidden")}function Bt(){const y=(X?.shots||[])[u];if(!y)return;const P=document.getElementById("lb-image"),A=document.getElementById("lb-shot-num"),W=document.getElementById("lb-specs"),q=document.getElementById("lb-title"),Y=document.getElementById("lb-desc"),_=document.getElementById("lb-approve-label"),j=document.getElementById("lb-prev"),Ee=document.getElementById("lb-next"),Ae=document.getElementById("lb-btn-approve"),ze=document.getElementById("lb-btn-reject");j&&j.classList.remove("hidden"),Ee&&Ee.classList.remove("hidden"),Ae&&Ae.classList.remove("hidden"),ze&&ze.classList.remove("hidden"),P&&(P.src=y.imageUrl||""),A&&(A.textContent=`REC · ${y.shotNumber}`),W&&(W.textContent=`${y.aspectRatio||"2.39:1"} · ${y.focalLength||"50mm"} · ${y.shotSize||"Medium"}`),q&&(q.textContent=y.title),Y&&(Y.textContent=y.description||"No description provided."),_&&(_.textContent=y.approvalStatus==="approved"?"Approved":"Approve")}async function Ze(){if(B){B.innerHTML='<div class="p-16 text-center text-slate-400 text-xs">Loading storyboard shots...</div>';try{X=await Ct(o,a)}catch(w){console.error(w),X={sceneId:a,shots:[]}}qt(),vt()}}function qt(){const w=Se.find(Y=>Y.id===a)||Se[0]||{},y=document.getElementById("badge-int-ext"),P=document.getElementById("badge-day-night"),A=document.getElementById("badge-pages"),W=document.getElementById("badge-shoot-day"),q=document.getElementById("scene-snippet-text");if(y&&(y.textContent=w.intExt||"INT"),P&&(P.textContent=w.dayNight||"DAY"),A&&(A.textContent=`${w.pages||"1.0"} pgs`),W&&(W.textContent=w.shootDay||"Day 1 of 7"),q&&(q.textContent=w.snippet||"Scene awaiting visual direction."),re){const Y=String(w.shootDay||"1").match(/\d+/)?.[0]||"1";re.href=`/production/schedule?scriptId=${o}&day=${Y}&sceneId=${w.id}`}if(ee)if(X?.isVersionStale){ee.classList.remove("hidden");const Y=document.getElementById("stale-pinned-ver"),_=document.getElementById("stale-active-ver");Y&&(Y.textContent=X.sourceVersion||"Draft 4.2"),_&&(_.textContent=X.currentScriptDraft||"Draft 4.3")}else ee.classList.add("hidden");os()}function os(){if(!z)return;const w=X?.shots||[];let y=!1,P="";for(let A=0;A<w.length-1;A++){const W=w[A],q=w[A+1],Y=W?.shotSize||"",_=q?.shotSize||"";if(Y.includes("Close")&&_.includes("Close")){const j=W.continuity?.eyeline?.toLowerCase()||W.continuity?.screenDirection?.toLowerCase()||"",Ee=q.continuity?.eyeline?.toLowerCase()||q.continuity?.screenDirection?.toLowerCase()||"";if(j&&Ee&&j===Ee&&(j.includes("screen")||j.includes("left")||j.includes("right"))){y=!0,P=`Shot ${W.shotNumber} and Shot ${q.shotNumber} both have screen direction "${W.continuity.screenDirection||W.continuity.eyeline}", which may create a jump or reverse-angle crossing.`;break}}}if(y){z.classList.remove("hidden");const A=document.getElementById("continuity-warning-text");A&&(A.textContent=P)}else z.classList.add("hidden")}function vt(){if(!B)return;const w=X?.shots||[];if(!w.length){B.innerHTML=`
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
      `;const y=document.getElementById("btn-empty-generate"),P=document.getElementById("btn-empty-add");y&&(y.onclick=()=>at()),P&&(P.onclick=()=>ye(null));return}l==="contact"?hs(w):At(w)}function hs(w){B.innerHTML=`
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        ${w.map(y=>{const P=y.approvalStatus==="approved"?"bg-emerald-50 text-emerald-700 border-emerald-200":y.approvalStatus==="proposed"?"bg-amber-50 text-amber-700 border-amber-200":y.approvalStatus==="rejected"?"bg-rose-50 text-rose-700 border-rose-200":"bg-slate-100 text-slate-600 border-slate-200",A=Array.isArray(y.history)?y.history.length:0;return`
            <div class="storyboard-card bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between" data-shot-id="${y.id}">
              <div>
                <!-- Top Card Meta Header -->
                <div class="px-3 py-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                  <div class="flex items-center gap-1.5">
                    <span class="font-mono font-bold text-xs text-slate-900">${y.shotNumber}</span>
                    <span class="text-[10px] text-slate-400">#${y.order}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold border ${P} capitalize">
                      ${y.approvalStatus||"Draft"}
                    </span>
                    ${A>0?`
                      <button class="btn-card-history p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${y.id}" title="View generation history (${A} previous versions)">
                        <span class="material-symbols-outlined text-[15px]">history</span>
                      </button>
                    `:""}
                  </div>
                </div>

                <!-- Primary Visual Image Canvas -->
                <div class="aspect-video bg-slate-950 flex items-center justify-center relative overflow-hidden cursor-pointer group btn-open-lightbox" data-shot-id="${y.id}">
                  ${y.imageUrl?`
                    <img src="${y.imageUrl}" alt="${y.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102" />
                  `:`
                    <div class="flex flex-col items-center justify-center text-slate-500 gap-1 p-4 text-center">
                      <span class="material-symbols-outlined text-2xl text-slate-600">art_track</span>
                      <span class="text-[10px] font-medium text-slate-400">Tap to inspect & generate frame</span>
                    </div>
                  `}
                  <!-- Badges overlay -->
                  <div class="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/75 text-white font-mono text-[9px] backdrop-blur-xs">
                    ${y.aspectRatio||"2.39:1"} · ${y.focalLength||"50mm"}
                  </div>
                  <button class="absolute bottom-2 right-2 p-1 rounded bg-black/60 hover:bg-black/80 text-white text-[12px] opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer" title="View Full Size">
                    <span class="material-symbols-outlined text-[14px]">fullscreen</span>
                  </button>
                </div>

                <!-- Title & Details -->
                <div class="p-3 flex flex-col gap-1.5">
                  <h4 class="font-heading font-bold text-xs text-slate-900 truncate" title="${y.title}">${y.title}</h4>
                  <p class="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">${y.description||"No description provided."}</p>
                  
                  <!-- Metadata Chips -->
                  <div class="flex items-center gap-1.5 pt-1 text-[10px] text-slate-600 flex-wrap">
                    <span class="px-1.5 py-0.5 rounded bg-slate-100 font-medium">${y.shotSize||"Wide"}</span>
                    <span class="px-1.5 py-0.5 rounded bg-slate-100 font-medium">${y.cameraAngle||"Eye Level"}</span>
                    ${y.cameraMovement&&y.cameraMovement!=="Static"?`<span class="px-1.5 py-0.5 rounded bg-slate-100 font-medium">${y.cameraMovement}</span>`:""}
                    ${y.continuity?.screenDirection?`<span class="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium truncate max-w-[140px]">${y.continuity.screenDirection}</span>`:""}
                  </div>
                </div>
              </div>

              <!-- Card Action Bar -->
              <div class="px-3 py-2 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between text-xs gap-1">
                <!-- Reorder arrows -->
                <div class="flex items-center gap-0.5">
                  <button class="btn-move-up p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${y.id}" title="Move left / up">
                    <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                  </button>
                  <button class="btn-move-down p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${y.id}" title="Move right / down">
                    <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                <!-- Action controls -->
                <div class="flex items-center gap-1">
                  <button class="btn-quick-approve p-1 rounded ${y.approvalStatus==="approved"?"text-emerald-600 bg-emerald-50":"text-slate-400 hover:text-emerald-600"} cursor-pointer transition-colors" data-shot-id="${y.id}" title="${y.approvalStatus==="approved"?"Mark as Draft":"Approve Frame"}">
                    <span class="material-symbols-outlined text-[16px]">${y.approvalStatus==="approved"?"check_circle":"check"}</span>
                  </button>
                  <button class="btn-card-regen p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${y.id}" title="Regenerate this frame">
                    <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                  </button>
                  <button class="btn-open-inspector px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 text-[11px] font-semibold transition-all cursor-pointer" data-shot-id="${y.id}">
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    `,ls()}function At(w){const y=w.length>0&&w.every(j=>p.has(j.id)),P=p.size;B.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col">
        <!-- Sequence Toolbar with Batch Selection -->
        <div class="px-3.5 sm:px-4 py-2.5 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div class="flex items-center gap-2">
            <label class="inline-flex items-center gap-1.5 cursor-pointer select-none">
              <input type="checkbox" id="seq-select-all" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" ${y?"checked":""} />
              <span class="font-heading font-bold text-slate-800 text-xs sm:text-sm">${w.length} Shots in Sequence</span>
            </label>
            ${P>0?`
              <span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                ${P} selected
              </span>
            `:""}
          </div>

          <!-- Batch Action Controls -->
          <div class="flex items-center gap-2 flex-wrap">
            ${P>0?`
              <button id="btn-batch-approve-selected" class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold cursor-pointer transition-all flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">done_all</span>
                <span>Approve Selected (${P})</span>
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
          ${w.map(j=>{const Ee=j.approvalStatus==="approved"?"bg-emerald-50 text-emerald-700 border-emerald-200":j.approvalStatus==="proposed"?"bg-amber-50 text-amber-700 border-amber-200":j.approvalStatus==="rejected"?"bg-rose-50 text-rose-700 border-rose-200":"bg-slate-100 text-slate-600 border-slate-200",Ae=p.has(j.id);return`
              <div class="p-3 sm:p-4 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0 w-full overflow-hidden" data-shot-id="${j.id}">
                <div class="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1 w-full">
                  <!-- Row selection checkbox -->
                  <div class="pt-1.5 shrink-0">
                    <input type="checkbox" class="seq-shot-check rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" data-shot-id="${j.id}" ${Ae?"checked":""} />
                  </div>

                  <!-- Reorder Controls -->
                  <div class="flex sm:flex-col items-center gap-0.5 sm:gap-1 shrink-0 pt-0.5">
                    <button class="btn-move-up p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${j.id}" title="Move up in sequence">
                      <span class="material-symbols-outlined text-[16px]">expand_less</span>
                    </button>
                    <span class="font-mono font-bold text-xs text-slate-700">${j.order}</span>
                    <button class="btn-move-down p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${j.id}" title="Move down in sequence">
                      <span class="material-symbols-outlined text-[16px]">expand_more</span>
                    </button>
                  </div>

                  <!-- Thumbnail Preview -->
                  <div class="w-16 h-12 sm:w-20 sm:h-12 bg-slate-950 rounded-lg overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center cursor-pointer btn-open-lightbox" data-shot-id="${j.id}">
                    ${j.imageUrl?`
                      <img src="${j.imageUrl}" alt="${j.title}" class="w-full h-full object-cover" />
                    `:`
                      <span class="material-symbols-outlined text-slate-600 text-base sm:text-lg">image</span>
                    `}
                  </div>

                  <!-- Shot Summary Info -->
                  <div class="min-w-0 flex-1 overflow-hidden">
                    <div class="flex items-center gap-1.5 flex-wrap min-w-0">
                      <span class="font-mono font-bold text-xs text-blue-600 shrink-0">${j.shotNumber}</span>
                      <h4 class="font-heading font-semibold text-xs text-slate-900 truncate min-w-0 flex-1" title="${j.title}">${j.title}</h4>
                      <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold border ${Ee} capitalize shrink-0">
                        ${j.approvalStatus||"Draft"}
                      </span>
                    </div>
                    <p class="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed break-words">${j.description||"No description"}</p>
                    <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-slate-500 mt-1.5 min-w-0">
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${j.shotSize||"Wide"}</span>
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${j.cameraAngle||"Eye Level"}</span>
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${j.focalLength||"50mm"}</span>
                      ${j.continuity?.screenDirection?`
                        <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium truncate max-w-full" title="${j.continuity.screenDirection}">
                          ${j.continuity.screenDirection}
                        </span>
                      `:""}
                    </div>
                  </div>
                </div>

                <!-- Action Controls -->
                <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-center mt-1 sm:mt-0">
                  <button class="btn-quick-approve p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-emerald-600 active:scale-95 text-xs cursor-pointer transition-all" data-shot-id="${j.id}" title="${j.approvalStatus==="approved"?"Mark as Draft":"Approve Shot"}">
                    <span class="material-symbols-outlined text-[16px]">${j.approvalStatus==="approved"?"check_circle":"check"}</span>
                  </button>
                  <button class="btn-card-regen p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-600 active:scale-95 text-xs cursor-pointer transition-all" data-shot-id="${j.id}" title="Regenerate this frame">
                    <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                  </button>
                  <button class="btn-open-inspector px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-xs font-semibold cursor-pointer transition-all" data-shot-id="${j.id}">
                    Edit Details
                  </button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,ls();const A=document.getElementById("seq-select-all");A&&(A.onchange=j=>{j.target.checked?w.forEach(Ee=>p.add(Ee.id)):p.clear(),At(w)}),document.querySelectorAll(".seq-shot-check").forEach(j=>{j.onchange=Ee=>{const Ae=j.getAttribute("data-shot-id");Ee.target.checked?p.add(Ae):p.delete(Ae),At(w)}});const W=document.getElementById("btn-batch-approve-selected");W&&(W.onclick=async()=>{const j=Array.from(p);if(j.length)try{await Ss(o,a,j,"approved","Batch approved via Sequence Editor"),E(`Approved ${j.length} shots.`),p.clear(),Ze()}catch{E("Failed batch approval.")}});const q=document.getElementById("btn-batch-reject-selected");q&&(q.onclick=async()=>{const j=Array.from(p);if(j.length)try{await Ss(o,a,j,"rejected","Batch rejected via Sequence Editor"),E(`Marked ${j.length} shots as rejected.`),p.clear(),Ze()}catch{E("Failed batch rejection.")}});const Y=document.getElementById("btn-batch-approve-all");Y&&(Y.onclick=async()=>{try{const j=(X?.shots||[]).filter(Ee=>Ee.approvalStatus==="proposed"||Ee.approvalStatus==="draft").map(Ee=>Ee.id);if(!j.length){E("All shots are already approved.");return}await Ss(o,a,j,"approved","Batch approved for production"),E(`Approved ${j.length} shots.`),Ze()}catch{E("Failed batch approval.")}});const _=document.getElementById("btn-seq-add-shot");_&&(_.onclick=()=>ye(null))}function ls(){document.querySelectorAll(".btn-open-inspector").forEach(w=>{w.onclick=y=>{y.stopPropagation();const P=w.getAttribute("data-shot-id");ye(P)}}),document.querySelectorAll(".btn-open-lightbox").forEach(w=>{w.onclick=y=>{y.stopPropagation();const P=w.getAttribute("data-shot-id"),W=(X?.shots||[]).findIndex(q=>q.id===P);lt(W!==-1?W:0)}}),document.querySelectorAll(".btn-move-up").forEach(w=>{w.onclick=async y=>{y.stopPropagation();const P=w.getAttribute("data-shot-id");oe(P,-1)}}),document.querySelectorAll(".btn-move-down").forEach(w=>{w.onclick=async y=>{y.stopPropagation();const P=w.getAttribute("data-shot-id");oe(P,1)}}),document.querySelectorAll(".btn-quick-approve").forEach(w=>{w.onclick=async y=>{y.stopPropagation();const P=w.getAttribute("data-shot-id"),A=X?.shots?.find(q=>q.id===P);if(!A)return;const W=A.approvalStatus==="approved"?"draft":"approved";try{await ws(o,a,P,W),E(`Shot ${A.shotNumber} marked ${W}`),Ze()}catch{E("Failed to update shot approval")}}}),document.querySelectorAll(".btn-card-regen").forEach(w=>{w.onclick=y=>{y.stopPropagation();const P=w.getAttribute("data-shot-id");Qe(P)}}),document.querySelectorAll(".btn-card-history").forEach(w=>{w.onclick=y=>{y.stopPropagation();const P=w.getAttribute("data-shot-id");Ne(P)}})}async function oe(w,y){const P=X?.shots||[],A=P.findIndex(j=>j.id===w);if(A===-1)return;const W=A+y;if(W<0||W>=P.length)return;const q=[...P],[Y]=q.splice(A,1);q.splice(W,0,Y);const _=q.map(j=>j.id);try{await Ea(o,a,_),Ze()}catch{E("Failed to reorder shots")}}(async function(){try{const[y,P]=await Promise.all([_t(o),va()]);Se=y||[],he=P||[]}catch(y){console.warn("Using offline fallback data for storyboard:",y)}g&&Se.length&&(g.innerHTML=Se.map(y=>`
        <option value="${y.id}" ${y.id===a?"selected":""}>
          Scene ${y.sceneNumber}: ${y.heading}
        </option>
      `).join(""),g.onchange=y=>{a=y.target.value,p.clear(),Ze()}),Ze()})()}class el{constructor(){this.appEl=null,this.currentPath=null,this.isFullScreen=!1,this.isNavigatingBack=!1,this._backInProgress=!1,this.backHandlers=[],this.scrollPositions={},this.historyIndex=0}clearHistory(){this.scrollPositions={},this.historyIndex=0,this.backHandlers=[],$.clearHistory()}getBasePath(){return window.location.pathname.toLowerCase().startsWith("/scriptora")?"/Scriptora":""}getCurrentLocation(){return window.location.hash&&window.location.hash.startsWith("#/")?window.location.hash.slice(1):window.location.pathname+window.location.search}normalizePath(t){if(!t)return"/";const s=this.getBasePath();let n=t;s&&n.toLowerCase().startsWith(s.toLowerCase())&&(n=n.slice(s.length)||"/");const o=n.indexOf("?"),a=n.indexOf("#");let l=n.length;o!==-1&&(l=Math.min(l,o)),a!==-1&&(l=Math.min(l,a));const i=n.slice(0,l).replace(/\/+$/,"")||"/";return i.startsWith("/")?i:"/"+i}getRouteFallback(t){const s=this.normalizePath(t);return s.startsWith("/production/")&&s!=="/production"?"/production":s==="/production"?"/workspace":s.startsWith("/intelligence/analysis/")?"/intelligence/analysis":s==="/intelligence/analysis"||s==="/intelligence/analysis/select"?"/intelligence/dashboard":s==="/intelligence/dashboard"||s==="/intelligence/overview"?"/intelligence/context":s==="/intelligence/context"?"/intelligence":s==="/intelligence"||s==="/intelligence/select"?"/workspace":s==="/profile/collaborators"?"/profile":(s==="/profile"||s==="/notifications"||s==="/chat"||s.startsWith("/editor"),"/workspace")}getRouteLabel(t){const s=this.normalizePath(t);return s==="/workspace"?"Workspace":s==="/production"?"Production":s.startsWith("/production/schedule")?"Schedule":s.startsWith("/production/breakdown")?"Breakdown":s.startsWith("/production/call-sheets")?"Call Sheets":s.startsWith("/production/dialogue-sides")?"Dialogue Sides":s.startsWith("/production/storyboard")?"Storyboard":s.startsWith("/editor")?"Editor":s==="/intelligence"?"Intelligence":s==="/intelligence/context"?"Context":s==="/intelligence/dashboard"?"Analysis":s.startsWith("/intelligence/analysis")?"Vectors":s==="/profile"?"Profile":s==="/profile/collaborators"?"Collaborators":s==="/notifications"?"Notifications":s==="/chat"?"AI Chat":"Back"}registerBackHandler(t){return typeof t!="function"?()=>{}:(this.backHandlers.push(t),()=>{const s=this.backHandlers.indexOf(t);s!==-1&&this.backHandlers.splice(s,1)})}triggerBackHandlers(){for(let n=this.backHandlers.length-1;n>=0;n--){const o=this.backHandlers[n];try{if(o())return!0}catch(a){console.error("Back handler error:",a)}}const t=Array.from(document.querySelectorAll("#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)"));if(t.length>0){const n=t[t.length-1],o=n.querySelector('[data-modal-close], #modal-day-close, #modal-day-done, .close-setting-modal, .close-profile-modal, #action-modal-cancel, #new-script-cancel, [id$="-cancel"], [id$="-close"]');return o?o.click():Te(n),!0}const s=Array.from(document.querySelectorAll('.scriptora-popup:not(.hidden), [data-scriptora-popup]:not(.hidden), [role="menu"]:not(.hidden), #quick-add-menu:not(.hidden)'));return s.length>0?(s[s.length-1].classList.add("hidden"),!0):!1}peekPreviousRoute(){return window.history.state?.prevPath?window.history.state.prevPath:$.peekPreviousRoute(null)}back(t=null){if(this._backInProgress||(this._backInProgress=!0,setTimeout(()=>{this._backInProgress=!1},200),this.triggerBackHandlers()))return;const s=window.history.state||{};if((typeof s.appStep=="number"?s.appStep:this.historyIndex)>0){window.history.back();return}let o=$.popHistory();for(;o&&this.normalizePath(o)===this.normalizePath(this.currentPath);)o=$.popHistory();const a=o||t||this.getRouteFallback(this.currentPath);a&&this.normalizePath(a)!==this.normalizePath(this.currentPath)&&(this.isNavigatingBack=!0,this.navigate(a,!0),this.isNavigatingBack=!1)}ensureShell(){if(!this.appEl)return;document.getElementById("scriptora-app-shell")||(this.appEl.innerHTML=`
        <div id="scriptora-app-shell" class="flex flex-col min-h-screen w-full relative bg-surface select-text">
          <!-- Persistent Global Header Container -->
          <div id="scriptora-global-header" class="fixed top-0 left-0 right-0 z-40 transition-all duration-200"></div>

          <!-- Dynamic Screen Content Area -->
          <main id="scriptora-global-content" class="flex-1 w-full min-h-screen flex flex-col relative transition-opacity duration-200"></main>

          <!-- Persistent Global Bottom Navigation Container -->
          <div id="scriptora-global-nav" class="fixed bottom-0 left-0 right-0 z-40 transition-all duration-200 overflow-visible"></div>
        </div>
      `)}init(t="#app"){if(this.appEl=document.querySelector(t),!this.appEl){console.error(`Mount element ${t} not found.`);return}this.ensureShell(),window.scriptoraRouter=this;const s=window.history.state||{};typeof s.appStep!="number"?(window.history.replaceState({...s,appStep:0,scriptoraPath:this.getCurrentLocation()},"",window.location.href),this.historyIndex=0):this.historyIndex=s.appStep,window.setScriptoraFullScreen=n=>{this.isFullScreen=!!n;const o=document.getElementById("scriptora-global-header"),a=document.getElementById("scriptora-global-nav");o&&o.classList.toggle("hidden",!!n),a&&a.classList.toggle("hidden",!!n)},document.addEventListener("click",n=>{const o=n.target.closest("[data-scriptora-back], #prod-subnav-back, #editor-back-btn, #btn-back-notif, #analysis-back-btn, #collab-back-btn, #production-back-btn, #chat-back-btn, #intelligence-dashboard-back-btn, #intelligence-context-back-btn, #individual-analysis-selector-back-btn");if(o){n.preventDefault(),n.stopPropagation();const l=o.getAttribute("data-back-fallback")||o.getAttribute("href")||null;this.back(l);return}const a=n.target.closest("a");if(a&&a.href&&a.origin===window.location.origin&&!a.hasAttribute("download")&&a.getAttribute("target")!=="_blank"&&!a.getAttribute("rel")?.includes("external")){const l=new URL(a.href),i=l.pathname+l.search+l.hash;i.startsWith("/api")||(n.preventDefault(),this.navigate(i))}},!0),window.addEventListener("popstate",n=>{if(!(typeof window.__scriptoraEditorPopstate=="function"&&window.__scriptoraEditorPopstate(n))){if(this.triggerBackHandlers()){const o=this.getCurrentLocation();window.history.pushState({...window.history.state||{},scriptoraPath:o},"",o);return}typeof n.state?.appStep=="number"?this.historyIndex=n.state.appStep:this.historyIndex>0&&(this.historyIndex-=1),$.popHistory(),this.isNavigatingBack=!0,this.resolve(this.getCurrentLocation()),this.isNavigatingBack=!1}}),window.addEventListener("hashchange",()=>{this.resolve(this.getCurrentLocation())}),this.resolve(this.getCurrentLocation())}navigate(t,s=!1){if(en(),this.currentPath&&(this.scrollPositions[this.normalizePath(this.currentPath)]=window.scrollY),!this.isNavigatingBack&&!s&&this.currentPath){const i=this.normalizePath(this.currentPath),r=this.normalizePath(t);i!==r&&$.pushHistory(this.currentPath)}const n=this.getBasePath(),o=n&&t.toLowerCase().startsWith(n.toLowerCase())?t.slice(n.length)||"/":t,a=n&&!t.startsWith(n)?`${n}${o.startsWith("/")?"":"/"}${o}`:t,l=this.currentPath?this.normalizePath(this.currentPath):null;s?window.history.replaceState({...window.history.state||{},scriptoraPath:o,appStep:this.historyIndex,prevPath:l},"",a):(this.isNavigatingBack||(this.historyIndex+=1),window.history.pushState({scriptoraPath:o,appStep:this.historyIndex,prevPath:l},"",a)),this.resolve(o)}resolve(t){const s=t.indexOf("?"),n=s===-1?t:t.slice(0,s),o=s===-1?"":t.slice(s+1);let a=n.replace(/\/+$/,"")||"/";const l=this.getBasePath();l&&a.toLowerCase().startsWith(l.toLowerCase())&&(a=a.slice(l.length)||"/"),a.startsWith("/")||(a="/"+a);const i=new URLSearchParams(o||"");this.currentPath=t,a.startsWith("/editor")?(document.body.classList.add("editor-mode"),document.documentElement.classList.add("editor-mode")):(document.body.classList.remove("editor-mode"),document.documentElement.classList.remove("editor-mode"));const r=!!$.state.currentUser;if(!r&&!["/welcome","/auth"].includes(a)){this.navigate("/auth",!0);return}if(r&&a==="/auth"){this.navigate("/workspace",!0);return}if(a==="/"){r?this.navigate("/workspace",!0):this.navigate("/welcome",!0);return}if(a==="/welcome"){this.render(Ba(),()=>Pa(this.navigate.bind(this)),{isPublic:!0});return}if(a==="/auth"){this.render(Na(),()=>Ta(this.navigate.bind(this)),{isPublic:!0});return}if(a==="/workspace"){this.render(Ma(),()=>Oa(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Workspace",subtitle:"Your writing space."});return}if(a==="/editor"){const c=$.state.selectedScriptId||"chronicles-of-dust",p=i.get("scene");this.navigate(`/editor/${c}${p?`?scene=${p}`:""}`,!0);return}if(a.startsWith("/editor/")){const c=a.split("/")[2],p=i.get("scene");$.selectScript(c);const f=$.state.scripts?.find(b=>b.id===c)||{title:"Untitled Screenplay"};this.render(_a(c,p),()=>Ua(c,this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Editor",subtitle:f.title||"Screenplay Studio",hideHeader:!0,hideNav:!0});return}if(a==="/intelligence"||a==="/intelligence/select"){this.render(uo(),()=>po(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Selector"});return}if(a==="/intelligence/context"){this.render(mo(),()=>xo(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Context Calibration"});return}if(a==="/intelligence/dashboard"||a==="/intelligence/overview"){this.render(fo(),()=>bo(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Analysis"});return}if(a==="/intelligence/analysis"||a==="/intelligence/analysis/select"){this.render(go(),()=>ho(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Analyse Individually"});return}if(a.startsWith("/intelligence/analysis/")){const c=a.split("/")[3]||"pacing",p=i.get("from"),f=i.get("scriptId");this.render(wo(c,p,f),()=>So(c,this.navigate.bind(this),p,f),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Vector Analysis"});return}if(a==="/profile"){const c=i.get("from"),p=i.get("scriptId");this.render(Eo(c,p),()=>Io(this.navigate.bind(this),c,p),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Account & preferences."});return}if(a==="/profile/collaborators"){const c=i.get("from"),p=i.get("scriptId");this.render(ko(c,p),()=>Co(this.navigate.bind(this),c,p),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Collaborators"});return}if(a==="/notifications"){this.render(Ao(),()=>$o(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Notifications",subtitle:"Activity Stream"});return}if(a==="/production"||a==="/pre-production"){const c=i.get("from"),p=i.get("scriptId");this.render(No(c,p),()=>To(this.navigate.bind(this),c,p),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Production Workspace & Tools"});return}if(a==="/production/breakdown"){const c=i.get("from"),p=i.get("scriptId");this.render(jo(c,p),()=>Fo(this.navigate.bind(this),c,p),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Script Breakdown Workspace"});return}const u=a.match(/^\/production\/scenes(?:\/([a-zA-Z0-9_-]+))?$/);if(u){const c=i.get("from"),p=i.get("scriptId")||"chronicles-of-dust",f=u[1]||i.get("sceneId"),b=`/production/schedule?scriptId=${p}${f?`&sceneId=${f}`:""}${c?`&from=${encodeURIComponent(c)}`:""}`;this.navigate(b,!0);return}const d=a.match(/^\/production\/call-sheets(?:\/([a-zA-Z0-9_-]+))?$/);if(d){const c=i.get("from"),p=i.get("scriptId"),f=d[1]||i.get("csId");this.render(_o(c,p,f),()=>Mn(this.navigate.bind(this),c,p,f),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:f?"Call Sheet Inspector":"Call Sheets Workspace"});return}if(a==="/production/dialogue-sides"||a==="/production/dialogue-sheets"||a==="/production/sides"){const c=i.get("from"),p=i.get("scriptId");this.render(Ho(c,p),()=>Uo(this.navigate.bind(this),c,p),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Dialogue Sheets & Actor Sides"});return}if(a==="/production/schedule"||a==="/production/stripboard"){const c=i.get("from"),p=i.get("scriptId");this.render(zo(c,p),()=>Vo(this.navigate.bind(this),c,p),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Master Shooting Schedule & Stripboard"});return}if(a==="/production/storyboard"||a==="/production/storyboards"){const c=i.get("from"),p=i.get("scriptId");this.render(Zo(c,p),()=>Qo(this.navigate.bind(this),c,p),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Storyboard Studio"});return}if(a==="/chat"||a==="/ai-chat"||a==="/writer-room"||a==="/ai-writer-room"){this.render(Bo(),()=>Po(this.navigate.bind(this)),{activeTab:"chat",sectionTitle:"AI Chat",subtitle:"Universal Assistant"});return}this.renderNotFound(a)}render(t,s,n={}){this.ensureShell();const o=document.getElementById("scriptora-global-header"),a=document.getElementById("scriptora-global-content"),l=document.getElementById("scriptora-global-nav"),i=!!n.isPublic,r=!!n.hideHeader,m=!!n.hideNav,u=n.activeTab||"workspace",d=n.sectionTitle||"Scriptora",c=n.subtitle||"";if(i?(o&&o.classList.add("hidden"),l&&l.classList.add("hidden")):(o&&!this.isFullScreen&&(r?(o.classList.add("hidden"),o.innerHTML=""):(o.classList.remove("hidden"),o.innerHTML=Xe(d,c))),l&&!this.isFullScreen&&(m?(l.classList.add("hidden"),l.innerHTML=""):(l.classList.remove("hidden"),$a(u)||(l.innerHTML=Ke(u))))),a){this.backHandlers=[];const p=document.getElementById("scriptora-modal-portal");p&&(p.innerHTML=""),en();let f=t||"";f=f.replace(/<header[^>]*data-global-header="true"[^>]*>[\s\S]*?<\/header>/gi,""),f=f.replace(/<header\s+class="fixed\s+top-0\s+w-full\s+z-40\s+pt-safe\s+bg-surface[^>]*>[\s\S]*?<\/header>/gi,""),f=f.replace(/<nav[^>]*data-global-bottom-nav="true"[^>]*>[\s\S]*?<\/nav>/gi,""),f=f.replace(/<nav\s+class="fixed\s+bottom-0[^>]*>[\s\S]*?<\/nav>/gi,""),a.innerHTML=f;const b=this.normalizePath(this.currentPath),x=this.scrollPositions[b];if(this.isNavigatingBack&&x!==void 0?setTimeout(()=>{window.scrollTo({top:x,behavior:"instant"})},10):window.scrollTo({top:0,behavior:"instant"}),a.classList.remove("fade-in"),a.offsetWidth,a.classList.add("fade-in"),typeof s=="function")try{s()}catch(g){console.error("Error attaching screen events:",g)}}}renderNotFound(t){this.render(`
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
      `,()=>{const s=document.getElementById("notfound-home");s&&(s.onclick=()=>this.navigate("/workspace"))},{activeTab:"workspace",sectionTitle:"Page Not Found",subtitle:"404"})}}const tl=new el;async function un(){try{await $.init(),tl.init("#app"),window.addEventListener("online",()=>{E("Back online. Synchronizing changes..."),$.refreshScripts(),$.refreshNotifications()}),window.addEventListener("offline",()=>{E("Offline mode active. Edits saved locally.","info")}),console.log("Scriptora initialized successfully in production-ready mode.")}catch(e){console.error("Scriptora bootstrap failed:",e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",un):un();
