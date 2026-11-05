(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();const Ta="http://localhost:8000/api";async function Z(e,t={}){const s=`${Ta}${e}`,n={headers:{"Content-Type":"application/json",...t.headers},...t};try{const o=await fetch(s,n);if(!o.ok){const a=await o.json().catch(()=>({}));throw new Error(a.error||`HTTP error ${o.status}`)}return await o.json()}catch(o){throw console.warn(`API call ${e} failed, falling back to local store:`,o.message),o}}const Ts=[{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",industry:"International / Hollywood",pages:96,updated:"12m ago",currentScene:"Scene 18",isCurrentDraft:!0,archived:!1,joinCode:"A7K9-XP42",logline:"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.",synopsis:"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves.",context:{format:"Feature",industry:"International / Hollywood",hours:1,minutes:36,seconds:0,plannedDuration:"01:36:00"},analysisScores:{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80}},{id:"the-neon-horizon",title:"The Neon Horizon",draft:"Draft 2.1",genre:"Sci-Fi",format:"Pilot",industry:"Streaming Television",pages:62,updated:"2h ago",currentScene:"Scene 4",isCurrentDraft:!1,archived:!1,joinCode:"N3ON-H0RZ",context:{format:"Pilot",industry:"Streaming Television",hours:0,minutes:52,seconds:0,plannedDuration:"00:52:00"},analysisScores:{overall:79,pacing:75,dialogue:84,emotion:80,characterArc:78,continuity:82,storyStructure:76,theme:88,cinema:83,formatting:90,production:72}},{id:"velvet-shadows",title:"Velvet Shadows",draft:"Draft 1.0",genre:"Noir",format:"Feature",industry:"Independent / Festival",pages:114,updated:"Yesterday",currentScene:"Scene 1",isCurrentDraft:!1,archived:!1,joinCode:"V3LV-SHDW",analysisScores:{overall:81,pacing:80,dialogue:86,emotion:79,characterArc:85,continuity:80,storyStructure:82,theme:84,cinema:88,formatting:92,production:76}},{id:"silent-echoes",title:"Silent Echoes",draft:"Draft 3.0",genre:"Psychological Thriller",format:"Feature",industry:"International / Hollywood",pages:104,updated:"3d ago",currentScene:"Scene 22",isCurrentDraft:!1,archived:!1,joinCode:"SLNT-ECH0",analysisScores:{overall:84,pacing:86,dialogue:81,emotion:88,characterArc:83,continuity:85,storyStructure:89,theme:82,cinema:84,formatting:91,production:78}},{id:"glass-kingdoms",title:"Glass Kingdoms",draft:"Draft 1.4",genre:"Fantasy",format:"Pilot",industry:"Streaming Television",pages:58,updated:"1w ago",currentScene:"Scene 8",isCurrentDraft:!1,archived:!1,joinCode:"GLSS-KNGD",analysisScores:{overall:78,pacing:74,dialogue:80,emotion:76,characterArc:82,continuity:75,storyStructure:80,theme:86,cinema:82,formatting:88,production:70}},{id:"red-shift",title:"Red Shift",draft:"Draft 2.0",genre:"Action",format:"Short",industry:"Independent / Festival",pages:28,updated:"2w ago",currentScene:"Scene 5",isCurrentDraft:!1,archived:!1,joinCode:"RED2-SHFT",analysisScores:{overall:83,pacing:90,dialogue:78,emotion:75,characterArc:80,continuity:88,storyStructure:84,theme:80,cinema:89,formatting:95,production:82}}];async function Jn(){try{const e=await Z("/auth/me");return e&&"user"in e?e.user?(localStorage.setItem("scriptora_user",JSON.stringify(e.user)),e.user):(localStorage.removeItem("scriptora_user"),null):e?.user||null}catch{const e=localStorage.getItem("scriptora_user");if(e)try{const t=JSON.parse(e);if(t&&(t.displayName||t.email||t.id))return t}catch{}return null}}async function Pa(e){try{const t=await Z("/auth/login",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-1",name:e.email?e.email.split("@")[0]:"Arun Kumar",displayName:e.email?e.email.split("@")[0]:"Arun Kumar",email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Narrative Director",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function La(e={}){try{const t=await Z("/auth/login",{method:"POST",body:JSON.stringify({...e,provider:"google"})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t=e.displayName||e.name||(e.email?e.email.split("@")[0]:"Google Filmmaker"),s=t.split(" ").map(o=>o[0]).filter(Boolean).slice(0,2).join("").toUpperCase()||"GF",n={id:e.sub||`google-${Date.now()}`,name:t,displayName:t,email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Film Director",badge:"Member Pro",initials:s,avatar:e.picture||e.photoURL||null,avatarUrl:e.picture||e.photoURL||null,provider:"google",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(n)),n}}async function Da(e){try{const t=await Z("/auth/register",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:`user-${Date.now()}`,name:e.name||"New Writer",displayName:e.name||"New Writer",email:e.email||"writer@scriptora.studio",headline:"Screenwriter",badge:"Member Pro",initials:(e.name||"NW").slice(0,2).toUpperCase(),stats:{drafts:1,coAuthors:0,healthIndex:"100%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function Ra(e){try{const t=await Z("/auth/otp",{method:"POST",body:JSON.stringify({phone:e})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-phone",name:"Verified Writer",displayName:"Verified Writer",headline:"Screenwriter",email:e,badge:"Member Pro",initials:"VW",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}function en(){localStorage.removeItem("scriptora_user"),localStorage.removeItem("scriptora_scripts"),localStorage.removeItem("scriptora_selected_script");const e=[];try{for(let t=0;t<localStorage.length;t++){const s=localStorage.key(t);s&&(s.startsWith("scriptora_screenplay_")||s.startsWith("scriptora_prod_")||s.startsWith("scriptora_storyboard_"))&&e.push(s)}for(const t of e)localStorage.removeItem(t)}catch(t){console.warn("Local storage purge notice:",t)}try{sessionStorage.clear()}catch{}}async function Yn(){try{await Z("/auth/logout",{method:"POST"})}catch(e){console.warn("Server logout notice:",e.message)}return en(),{success:!0}}async function Ma(e){const t=(e||"").trim();if(t.toUpperCase()!=="DELETE MY ACCOUNT")throw new Error('Confirmation mismatch. Please type "DELETE MY ACCOUNT" exactly to confirm account deletion.');try{const s=await Z("/auth/delete-account",{method:"POST",body:JSON.stringify({confirmation:t})});return en(),s}catch(s){if(!s.status||s.message?.includes("404")||s.message?.includes("Failed to fetch")||s.message?.includes("NetworkError")||s.message?.includes("Load failed"))return en(),{success:!0,message:"Account and associated personal records have been permanently deleted."};throw s}}async function xt(e=""){try{const n=e?`/scripts?q=${encodeURIComponent(e)}`:"/scripts",o=await Z(n);if(o.scripts&&Array.isArray(o.scripts)){localStorage.setItem("scriptora_scripts",JSON.stringify(o.scripts));let a=o.scripts;return e&&(a=a.filter(l=>l.title.toLowerCase().includes(e.toLowerCase()))),a}}catch{}const t=localStorage.getItem("scriptora_scripts");let s;if(t!==null)try{s=JSON.parse(t),Array.isArray(s)||(s=[...Ts],localStorage.setItem("scriptora_scripts",JSON.stringify(s)))}catch{s=[...Ts],localStorage.setItem("scriptora_scripts",JSON.stringify(s))}else s=[...Ts],localStorage.setItem("scriptora_scripts",JSON.stringify(s));return e&&(s=s.filter(n=>n.title.toLowerCase().includes(e.toLowerCase()))),s}async function Os(e){try{const s=await Z(`/scripts/${e}`);if(s.script)return s.script}catch{}const t=await xt();return t.find(s=>s.id===e)||Ts.find(s=>s.id===e)||t[0]||null}async function Oa(e){const t=(e.title||"untitled").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")||`script-${Date.now()}`,s={id:t,title:e.title||"Untitled Screenplay",draft:"Draft 1.0",pageCount:1,wordCount:0,scenes:[{id:"scene-1",number:1,slugline:"",blocks:[{id:`b-${Date.now()}-1`,type:"scene",content:""}]}]};try{const i=await Z("/scripts",{method:"POST",body:JSON.stringify(e)});if(i.script){s.id=i.script.id,s.title=i.script.title,localStorage.setItem(`scriptora_screenplay_${i.script.id}`,JSON.stringify(s)),await js(i.script.id,s).catch(()=>{});const f=(await xt()).map(p=>({...p,isCurrentDraft:!1}));return localStorage.setItem("scriptora_scripts",JSON.stringify([i.script,...f.filter(p=>p.id!==i.script.id)])),localStorage.setItem("scriptora_selected_script",i.script.id),i.script}}catch{}const n={id:t,title:e.title||"Untitled Screenplay",draft:"Draft 1.0",genre:e.genre||"Drama",format:e.format||"Feature",industry:e.industry||"International / Hollywood",pages:1,updated:"Just now",currentScene:"Scene 1",isCurrentDraft:!0,joinCode:`${Math.random().toString(36).substring(2,6).toUpperCase()}-${Math.random().toString(36).substring(2,6).toUpperCase()}`,archived:!1,context:{format:e.format||"Feature",industry:e.industry||"International / Hollywood",hours:1,minutes:30,seconds:0,plannedDuration:"01:30:00"},analysisScores:{overall:80,pacing:78,dialogue:80,emotion:80,characterArc:78,continuity:80,storyStructure:80,theme:80,cinema:80,formatting:90,production:75}};localStorage.setItem(`scriptora_screenplay_${n.id}`,JSON.stringify(s));const a=(await xt()).map(i=>({...i,isCurrentDraft:!1})),l=[n,...a.filter(i=>i.id!==n.id)];return localStorage.setItem("scriptora_scripts",JSON.stringify(l)),localStorage.setItem("scriptora_selected_script",n.id),n}async function ja(e){if(!e)return await xt();try{const n=await Z(`/scripts/${e}/current-draft`,{method:"POST"});if(n&&n.script){const a=(await xt()).map(l=>({...l,isCurrentDraft:l.id===e,updated:l.id===e?"Just now":l.updated}));return localStorage.setItem("scriptora_scripts",JSON.stringify(a)),localStorage.setItem("scriptora_selected_script",e),a}}catch{}const s=(await xt()).map(n=>({...n,isCurrentDraft:n.id===e,updated:n.id===e?"Just now":n.updated}));return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),localStorage.setItem("scriptora_selected_script",e),s}async function Fa(e,t){try{const o=await Z(`/scripts/${e}`,{method:"PUT",body:JSON.stringify(t)});if(o.script){const l=(await xt()).map(i=>i.id===e?o.script:i);return localStorage.setItem("scriptora_scripts",JSON.stringify(l)),o.script}}catch{}const n=(await xt()).map(o=>o.id===e?{...o,...t,updated:"Just now"}:o);return localStorage.setItem("scriptora_scripts",JSON.stringify(n)),{id:e,...t,updated:"Just now"}}async function _a(e){try{await Z(`/scripts/${e}`,{method:"DELETE"})}catch{}const t=await xt(),n=t.find(l=>l.id===e)?.isCurrentDraft;let o=t.filter(l=>l.id!==e);return n&&o.length>0&&(o[0].isCurrentDraft=!0),localStorage.setItem("scriptora_scripts",JSON.stringify(o)),localStorage.removeItem(`scriptora_screenplay_${e}`),localStorage.getItem("scriptora_selected_script")===e&&(o.length>0?localStorage.setItem("scriptora_selected_script",o[0].id):localStorage.removeItem("scriptora_selected_script")),{success:!0}}async function Ha(e){try{const a=await Z(`/scripts/${e}/duplicate`,{method:"POST"});if(a.script){const l=await xt();return localStorage.setItem("scriptora_scripts",JSON.stringify([a.script,...l])),a.script}}catch{}const t=await Os(e),s={...t,id:`${e}-copy-${Date.now().toString().slice(-4)}`,title:`${t?.title||"Script"} (Copy)`,updated:"Just now"},n=await xt(),o=[s,...n];return localStorage.setItem("scriptora_scripts",JSON.stringify(o)),s}async function Ua(e){try{await Z(`/scripts/${e}/archive`,{method:"POST"})}catch{}const s=(await xt()).map(n=>n.id===e?{...n,archived:!0,updated:"Just now"}:n);return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),{success:!0}}const on={id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pageCount:5,wordCount:14280,titlePage:{title:"CHRONICLES OF DUST",author:"Arun Kumar",contact:"Scriptora Studio · arun.kumar@scriptora.studio · +1 (555) 019-2834",notes:"An original screenplay. Draft 4.2 Production Cut."},settings:{sceneNumbers:!0,sceneNumberSide:"left",smartFormatting:!0,fontSize:"12pt",lineSpacing:"1.5",language:"English"},acts:[{id:"act-1",name:"ACT I - The Broken Siphon"},{id:"act-2",name:"ACT II - The Pressure Surge"},{id:"act-3",name:"ACT III - The Floodgate Standoff"}],characters:["KEVIN","MEERA","HARI","AKASH"],locations:["INT. HOME","INT. PORT AUDIT ROOM","INT. CUSTOMS OFFICE","EXT. FLOODGATE GANTRY"],times:["DAY","NIGHT","CONTINUOUS","DAWN","DUSK","LATER","MORNING","EVENING"],transitions:["CUT TO:","FADE IN:","FADE OUT.","DISSOLVE TO:","SMASH CUT TO:","MATCH CUT TO:","JUMP CUT TO:"],scenes:[{id:"scene-1",number:1,actId:"act-1",slugline:"INT. HOME - EVENING",blocks:[{id:"b-1-1",type:"scene",content:"INT. HOME - EVENING"},{id:"b-1-2",type:"action",content:"There stands a woman."},{id:"b-1-3",type:"character",content:"HARI"},{id:"b-1-4",type:"dialogue",content:"Who is that?"},{id:"b-1-5",type:"character",content:"AKASH"},{id:"b-1-6",type:"dialogue",content:"How do I know?"},{id:"b-1-7",type:"action",content:"Both leaves the place."}]},{id:"scene-4",number:4,actId:"act-1",slugline:"INT. PORT AUDIT ROOM - DAY",blocks:[{id:"b-4-1",type:"scene",content:"INT. PORT AUDIT ROOM - DAY"},{id:"b-4-2",type:"action",content:"Kevin stamps irregular cargo manifests to keep peace with union superiors."},{id:"b-4-3",type:"character",content:"KEVIN"},{id:"b-4-4",type:"dialogue",content:"The manifests are sealed."}]},{id:"scene-18",number:18,actId:"act-2",slugline:"INT. CUSTOMS OFFICE - NIGHT",blocks:[{id:"b-18-1",type:"scene",content:"INT. CUSTOMS OFFICE - NIGHT"},{id:"b-18-2",type:"action",content:"Kevin kneels over the cracked hydro-sensor junction box. Static hiss whispers through the damp comm-link. A lone flicker illuminates the tarnished brass seal."},{id:"b-18-3",type:"action",content:"Water droplets bead along the corroded circuit wires. He slides a copper probe between the connectors."},{id:"b-18-4",type:"character",content:"KEVIN"},{id:"b-18-5",type:"parenthetical",content:"(whispering into comm)"},{id:"b-18-6",type:"dialogue",content:"If the seals break before dawn, the sector won't hold the surge."},{id:"b-18-7",type:"character",content:"MEERA (O.S.)"},{id:"b-18-8",type:"dialogue",content:"Then don't let them break. Reroute the secondary relay through the floodgate breaker."},{id:"b-18-9",type:"transition",content:"CUT TO:"}]}]};async function qa(e){let t=null;try{const l=await Z(`/screenplay/${e}`);l.screenplay&&l.screenplay.scenes&&(t=l.screenplay)}catch{}if(!t){const l=localStorage.getItem(`scriptora_screenplay_${e}`);if(l)try{const i=JSON.parse(l);i&&i.scenes&&(t=i)}catch{}}if(e==="chronicles-of-dust"){if(!t||!t.scenes||t.scenes.length===0){const l=JSON.parse(JSON.stringify(on));return l.id=e,localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(l)),l}return t}if(t&&(l=>!l||!Array.isArray(l.scenes)?!1:l.scenes.some(i=>{const r=(i.slugline||"").toUpperCase();return r.includes("WRITER'S ROOM")||r.includes("STUDIO - DAY")||r.includes("NEW SCENE - DAY")?!0:(i.blocks||[]).some(f=>{const p=f.content||"";return p.includes("Sunlight cuts through dust motes")||p.includes("A blank script page waits")||p.includes("Type your screenplay action here")})}))(t)&&(t=null),t)return t;const o=await Os(e),a={id:e||"script_01",title:o?.title||"Untitled Screenplay",draft:"Draft 1.0",pageCount:1,wordCount:0,scenes:[{id:"scene-1",number:1,slugline:"",blocks:[{id:`b-${Date.now()}-1`,type:"scene",content:""}]}]};return localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(a)),js(e,a).catch(()=>{}),a}async function js(e,t){localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(t));try{return await Z(`/screenplay/${e}`,{method:"PUT",body:JSON.stringify({screenplay:t})})}catch{return{success:!0}}}async function za(e){try{return(await Z(`/versions/${e}`)).versions}catch{return[{id:"v-4.2",name:"Draft 4.2",tag:"Current Active",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:"Refined Meera O.S. dialogue and hydro-sensor action line.",isCurrent:!0},{id:"v-3.0",name:"Draft 3.0",tag:"Production Polish",timestamp:"Yesterday, 4:15 PM",author:"JD",stats:"94 pages · 13,950 words",notes:"Incorporated director notes on floodgate transition pacing.",isCurrent:!1},{id:"v-2.0",name:"Draft 2.0",tag:"First Table Read",timestamp:"Oct 12, 2024",author:"JD",stats:"90 pages · 13,200 words",notes:"Table read revision for Acts I & II character arcs.",isCurrent:!1}]}}async function Va(e,t){try{return(await Z(`/versions/${e}`,{method:"POST",body:JSON.stringify(t)})).version}catch{return{id:`v-${Date.now()}`,name:t.name,tag:"Milestone Snapshot",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:t.notes||"",isCurrent:!0}}}async function Ga(e){try{return(await Z(`/collaborators/${e}`)).collaborators}catch{return[{id:"c-1",name:"Heamanth S.",email:"heamanth@studio.com",initials:"HS",role:"Editor",avatarBg:"bg-blue-100 text-blue-700",status:"Active",added:"2d ago"},{id:"c-2",name:"Elena Rostova",email:"elena@cineworks.io",initials:"ER",role:"Script Doctor",avatarBg:"bg-amber-100 text-amber-700",status:"Active",added:"1w ago"},{id:"c-3",name:"Marcus Vance",email:"vance.prod@paramount.com",initials:"MV",role:"Producer",avatarBg:"bg-purple-100 text-purple-700",status:"Viewer",added:"2w ago"}]}}async function Wa(e,t){try{return(await Z(`/collaborators/${e}/invite`,{method:"POST",body:JSON.stringify(t)})).collaborator}catch{return{id:`c-${Date.now()}`,name:t.email.split("@")[0],email:t.email,initials:t.email.substring(0,2).toUpperCase(),role:t.role==="editor"?"Editor":"Viewer",avatarBg:"bg-emerald-100 text-emerald-700",status:"Active",added:"Just now"}}}async function Ka(e,t){try{return await Z(`/collaborators/${e}/${t}`,{method:"DELETE"})}catch{return{success:!0}}}async function Ja(e){try{return(await Z("/join-code/generate",{method:"POST",body:JSON.stringify({scriptId:e})})).joinCode}catch{return Math.random().toString(36).substring(2,6).toUpperCase()+"-"+Math.random().toString(36).substring(2,6).toUpperCase()}}async function Ya(e){try{return await Z("/join-code/validate",{method:"POST",body:JSON.stringify({code:e})})}catch{return(e||"").toUpperCase().trim()==="A7K9-XP42"?{valid:!0,script:{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",pages:96,collaboratorCount:3}}:{valid:!1,error:"Invalid or expired join code"}}}async function Xa(e){try{return await Z("/join-code/redeem",{method:"POST",body:JSON.stringify({code:e})})}catch{return{success:!0,scriptId:"chronicles-of-dust",title:"Chronicles of Dust"}}}async function Xn(){try{return await Z("/notifications")}catch{return{notifications:[{id:1,sender:"HS",senderName:"Heamanth",type:"collaboration_invite",title:"Heamanth invited you to collaborate",body:'Added you as an Editor on "Chronicles of Dust" (Draft 4.2).',time:"12m ago",group:"today",unread:!0,tags:["Draft 4.2","Role: Editor"],actionLabel:"Review Access →",actionRoute:"/profile/collaborators"},{id:2,sender:"icon:description",type:"export_ready",title:"Your export is ready",body:'"Chronicles of Dust (Draft 4.2)" exported as standard Industry PDF.',time:"45m ago",group:"today",unread:!0,tags:["PDF","96 Pages"],actionLabel:"Open Screenplay →",actionRoute:"/editor/chronicles-of-dust"},{id:3,sender:"AK",senderName:"Arun K.",type:"join_code_request",title:"Join-code access request",body:'Requested Editor access to "Anbin Mozhi" via join-code A7K9-XP42.',time:"2h ago",group:"today",unread:!0,tags:["Code: A7K9-XP42"],actionLabel:"Manage Collaborators →",actionRoute:"/profile/collaborators"}],unreadCount:3}}}async function Za(e){try{return await Z(`/notifications/${e}/read`,{method:"POST"})}catch{return{success:!0}}}async function Qa(){try{return await Z("/notifications/read-all",{method:"POST"})}catch{return{success:!0}}}async function Bn(){return(await Xn()).unreadCount||0}async function zs(e){try{const t=await Z("/profile",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.profile)),t.profile}catch{const s={...await Jn()||{},...e};if(e.name){const n=e.name.trim().split(/\s+/);s.initials=((n[0]?.[0]||"A")+(n[1]?.[0]||"")).toUpperCase(),s.displayName=e.name}return localStorage.setItem("scriptora_user",JSON.stringify(s)),s}}async function Zn(){try{return(await Z("/settings")).settings}catch{const e=localStorage.getItem("scriptora_settings");return e?JSON.parse(e):{editor:{autoSceneHeading:!0,autoCharacter:!0,autoTransition:!0,enterAfterAction:!0,tabAfterAction:!0,autoCapitalize:!0,continueDialogue:!0,showSceneNumbers:!0,lockSceneNumbers:!1,fontSize:"Courier Prime 12pt",lineSpacing:"1.5 line",focusMode:!1},language:"English (US)",appearance:"Light",notifications:{collaborationInvites:!0,collaborationEdits:!0,mentions:!0,versionMilestones:!0},intelligence:{querySuggestions:!0,analysisSuggestions:!0}}}}async function eo(e){try{const t=await Z("/settings",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_settings",JSON.stringify(t.settings)),t.settings}catch{const s={...await Zn(),...e};return localStorage.setItem("scriptora_settings",JSON.stringify(s)),s}}async function to(e,t){try{return(await Z(`/intelligence/${e}/context`,{method:"PUT",body:JSON.stringify(t)})).context}catch{return t}}async function ln(e,t){try{return(await Z("/intelligence/query",{method:"POST",body:JSON.stringify({query:e,scriptId:t})})).answer}catch{return"Analysis: In this screenplay, scene tempo and dialogue density align with core narrative milestones. Characters express distinct agendas in each beat."}}async function so(e="chronicles-of-dust"){try{const o=await Z(`/production/${e}`);if(o?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(o.workspace)),o.workspace}catch{}const t=localStorage.getItem(`scriptora_prod_ws_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=await Os(e),n={id:`prod-ws-${e}`,projectId:"proj-1",projectName:"Badlands Anthology",scriptId:e,screenplayTitle:s?.title||"Chronicles of Dust",pinnedSourceVersion:s?.draft||"Draft 4.2",pinnedSourceVersionHash:"v4.2-snap-88f2",pinnedTimestamp:"12m ago",currentScriptDraft:s?.draft||"Draft 4.2",isStale:!1,mode:localStorage.getItem("scriptora_prod_mode")||"simple",userRole:localStorage.getItem("scriptora_prod_role")||"Owner",roles:["Owner","Director","Assistant Director","Production","Department Member","Viewer"],stats:{totalScenes:18,breakdownElements:78,callSheetsCount:2,shootingDays:14,pendingProposals:2,completedApprovals:6},updatedAt:new Date().toISOString()};return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n)),n}async function no(e,t){try{const n=await Z(`/production/${e}/pin`,{method:"POST",body:JSON.stringify({version:t})});if(n?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n.workspace)),n.workspace}catch{}const s=await so(e);return s.pinnedSourceVersion=t,s.pinnedTimestamp="Just now",s.isStale=!1,localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(s)),s}async function is(e="chronicles-of-dust"){try{const o=await Z(`/production/${e}/scenes`);if(o?.scenes)return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(o.scenes)),o.scenes}catch{}const t=localStorage.getItem(`scriptora_prod_scenes_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[],n=[{num:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",intExt:"EXT",dayNight:"DAY",p:"4 1/8",comp:"Moderate",day:"Day 1 of 7",cast:["KEVIN","MARCUS"],desc:"Wind whips dust across perimeter chain link. Kevin arrives at customs gate."},{num:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",intExt:"INT",dayNight:"DAY",p:"3 4/8",comp:"Simple",day:"Day 1 of 7",cast:["KEVIN","MEERA"],desc:"Meera analyzes telemetry console indicating illegal pressure drop."},{num:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",intExt:"EXT",dayNight:"DUSK",p:"7 2/8",comp:"Complex",day:"Day 2 of 7",cast:["KEVIN"],desc:"Concrete conduit pipeline across cracked alkali flats during sunset."},{num:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",intExt:"EXT",dayNight:"NIGHT",p:"5 0/8",comp:"Complex",day:"Day 3 of 7",cast:["KEVIN","MEERA"],desc:"Perimeter night patrol with solar rover and surveillance drones."},{num:5,heading:"INT. HYDRAULIC VALVE TUNNEL - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"5 4/8",comp:"Moderate",day:"Day 3 of 7",cast:["KEVIN"],desc:"Rusty underground valves with echoing industrial turbine vibration."},{num:6,heading:"EXT. DESERT SERVICE ROAD - DAY",intExt:"EXT",dayNight:"DAY",p:"5 2/8",comp:"Simple",day:"Day 4 of 7",cast:["KEVIN"],desc:"Kevin tracks tanker tire treads along decommissioned asphalt."},{num:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",intExt:"INT",dayNight:"DAY",p:"6 3/8",comp:"Moderate",day:"Day 5 of 7",cast:["COMMANDER VANCE","KEVIN"],desc:"Vance oversees regional water diversion bank from glass observatory."},{num:8,heading:"EXT. RESERVOIR INTAKE BASIN - DAY",intExt:"EXT",dayNight:"DAY",p:"5 5/8",comp:"Complex",day:"Day 6 of 7",cast:["MEERA"],desc:"Rappelling 60-foot descent down drained concrete spillway."},{num:9,heading:"INT. DRAINAGE VAULT - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"4 1/8",comp:"Moderate",day:"Day 7 of 7",cast:["KEVIN","MEERA"],desc:"Subterranean acoustic surveillance using directional hydrophones."},{num:10,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"2 6/8",comp:"Complex",day:"Day 2 of 7",cast:["KEVIN","MEERA"],desc:"Kevin anchors hydraulic bypass valve kit as high pressure brine seals."}];for(const o of n)s.push({id:`scene-${o.num}`,sceneNumber:o.num,scriptId:e,heading:o.heading,intExt:o.intExt,dayNight:o.dayNight,pages:o.p,complexity:o.comp,shootDay:o.day,status:o.num===4?"Needs Review":"Scheduled",snippet:o.desc,directorNotes:`Director visual notes for ${o.heading}. Maintain high contrast lighting.`,continuityNotes:"Continuity reference logged against Draft 4.2.",cast:o.cast,sidesReady:!0});return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(s)),s}async function ao(e,t){try{const l=await Z(`/production/${e}/scenes/${t}`);if(l?.scene)return l.scene}catch{}const n=(await is(e)).find(l=>l.id===t||String(l.sceneNumber)===String(t));if(!n)return null;const a=(await Ct(e)).filter(l=>l.sceneId===n.id||l.sceneNumber===n.sceneNumber||Array.isArray(l.scenes)&&l.scenes.includes(n.sceneNumber));return{...n,elements:a}}async function fs(e,t,s){try{const a=await Z(`/production/${e}/scenes/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.scene)return a.scene}catch{}const n=await is(e),o=n.find(a=>a.id===t||String(a.sceneNumber)===String(t));return o?(Object.assign(o,s),localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(n)),o):s}async function Ct(e="chronicles-of-dust",t=null,s=null){try{const a=new URLSearchParams;t&&a.set("category",t),s&&a.set("scene",s);const l=a.toString()?`?${a.toString()}`:"",i=await Z(`/production/${e}/breakdown${l}`);if(i?.breakdown)return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(i.breakdown)),i.breakdown}catch{}const n=localStorage.getItem(`scriptora_prod_breakdown_${e}`);let o=[];if(n)try{o=JSON.parse(n)}catch{}if(o.length||(o=[{id:"elem-1",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[1,2,4,18],category:"Cast",name:"KEVIN",characterRole:"Discredited hydro-engineer, 30s. Hero protagonist.",description:"Discredited hydro-engineer, 30s. Hero protagonist.",assignedActor:"Dev Patel",castingStatus:"Confirmed Cast",actorAvailability:"Available Shoot Days 1-14",appearancesCount:4,sourceSnippet:"Kevin kneels over cracked hydro-sensor junction box, static hissing from the diagnostic speaker.",originalAiSuggestion:"KEVIN — Discredited hydro-engineer, 30s. Hero protagonist.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Requires desert dust protective gear and waterproof boots."},{id:"elem-2",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[4,16,18],category:"Cast",name:"MEERA",characterRole:"Field operative with tactical harness.",description:"Field operative with tactical harness.",assignedActor:"Zoe Saldana",castingStatus:"Confirmed Cast",actorAvailability:"Available Shoot Days 4-18",appearancesCount:3,sourceSnippet:"Meera anchors her cable to the iron pylon, visor reflecting the rising floodwaters below.",originalAiSuggestion:"MEERA — Field operative with tactical harness.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Tactical harness fitted for scene 18 valve climb."},{id:"elem-3",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Props",name:"Hydraulic Bypass Valve Kit",description:"Custom machined valve kit with functional digital LED pressure display.",sourcingType:"Hero Prop Built",quantity:"1 Hero + 2 Stunt Duplicates",readinessStatus:"Ready in Art Dept",continuityNotes:"Clean in Sc 1, weathered with grease in Sc 18",sourceSnippet:"Kevin clicks the bypass manifold into place. The gauge needles spike red.",originalAiSuggestion:"Hydraulic Bypass Valve Kit — machined valve kit with LED display.",status:"Confirmed",isHumanConfirmed:!0,confidence:.95,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero prop constructed by art department; 2 stunt duplicates on standby."},{id:"elem-4",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Practical FX",name:"High-Pressure Water Spray",description:"Controlled water burst simulating cracked pipe joint failure.",requiredResources:"Dedicated 4000L Water Tanker, 120 PSI Pump Rig",technicalRequirements:"Safe water containment basins, electrical shut-off triggers",safetyNotes:"Non-slip decking mandatory; waterproof protective ponchos for camera crew",prepStatus:"Rig Test Scheduled",sourceSnippet:"A burst of pressurized brine shoots from the seam, blinding the chamber.",originalAiSuggestion:"High-Pressure Water Spray — Controlled water burst simulating cracked pipe failure.",status:"Needs Review",isHumanConfirmed:!1,confidence:.88,confirmedBy:null,confirmedAt:null,notes:"SFX coordinator requested dedicated water truck standby via Proposal #prop-1."},{id:"elem-5",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Stunts",name:"Valve Pylon Cable Rappel",description:"Meera swings 18 feet across open valve chasm to catch emergency release lever.",coordinationRequirements:"18ft wire pendulum rig, decelerator line, safety crash matting",qualifiedPersonnel:"Stunt Double: Tara Sen / Stunt Coordinator: Roy Hall",safetyPlanningStatus:"Awaiting Coordinator Review",sourceSnippet:"Meera kicks off the catwalk, swinging into the spray as the iron cable groans.",originalAiSuggestion:"Valve Pylon Cable Rappel — 18ft swing across chasm to catch lever.",status:"Needs Review",isHumanConfirmed:!1,confidence:.92,confirmedBy:null,confirmedAt:null,notes:"Awaiting Stunt Coordinator risk assessment and harness certification."},{id:"elem-13",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Locations",name:"Sub-Level Hydro-Chamber B",description:"Industrial concrete pumping cavern with rusty iron catwalks.",context:"INT.",lighting:"NIGHT",locationStatus:"Secured & Permitted",accessDetails:"Permit #WTR-994, Access via Gate 4 Service Tunnel",sourceSnippet:"INT. HYDRO-CHAMBER B - NIGHT. Rust-eaten steel catwalks suspend over deep abyss.",originalAiSuggestion:"Sub-Level Hydro-Chamber B — Concrete pumping cavern with catwalks.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Acoustic echo requires directional shotgun mics; non-slip floor treatment applied."},{id:"elem-6",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Costumes",name:"Kevin — Weathered Dust Coat & Respirator",character:"KEVIN",description:"Heavy canvas duster coat, solar respirator around neck.",wardrobeRequirements:"Duster coat with distressed seam stitching, respirator with worn elastic straps",continuityChanges:"Costume Stage 1 (Desert Dust / Dry)",prepStatus:"Fitted & Approved",sourceSnippet:"KEVIN (30s), sun-scoured and weary, adjusts his solar filter.",originalAiSuggestion:"Kevin — Duster coat, respirator around neck.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Costume fitting complete with wardrobe dept."},{id:"elem-7",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Cast",name:"MARCUS",characterRole:"Border outpost security guard.",description:"Border outpost security guard.",assignedActor:"Unassigned (Auditioning)",castingStatus:"Auditioning",actorAvailability:"Day 1 Shoot Only",appearancesCount:1,sourceSnippet:"MARCUS leans against the chain link, tapping an unlit cigarette against his wrist.",originalAiSuggestion:"MARCUS — Border outpost security guard.",status:"Confirmed",isHumanConfirmed:!0,confidence:.98,confirmedBy:"Elena Rostova",confirmedAt:"2026-10-13T16:00:00Z",notes:"Supporting role. Day 1 shoot only."},{id:"elem-8",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Props",name:"Solar Filter Dust Goggles",description:"Tinted goggles with worn leather straps.",sourcingType:"Hero Wardrobe Prop",quantity:"2 Pairs (A & B Camera)",readinessStatus:"Ready in Art Dept",continuityNotes:"Worn over eyes during wind gusts, rest on forehead indoors",sourceSnippet:"Kevin pulls the goggles over his eyes as a gust hits.",originalAiSuggestion:"Solar Filter Dust Goggles — Tinted goggles with worn leather straps.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero wardrobe prop."},{id:"elem-9",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Vehicles",name:"Solar Patrol Rover (Modified)",description:"Lightweight dune rover fitted with dual photovoltaic roof panels.",availability:"On Set Shoot Days 1 & 2",operationalRequirements:"Charging station in Base Camp, Art Dept weathering wrap",prepStatus:"Checked In & Inspected",sourceSnippet:"The rover sits idling beside Gate 4, suspension coated in red grit.",originalAiSuggestion:"Solar Patrol Rover (Modified) — Dune rover with dual photovoltaic roof panels.",status:"Confirmed",isHumanConfirmed:!0,confidence:.96,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Picture vehicle running on electric battery. Backup battery pack required."},{id:"elem-10",scriptId:e,sceneId:"scene-4",sceneNumber:4,scenes:[4],category:"Props",name:"Night-Vision Monocular Scope",description:"Military grade digital thermal optics.",sourcingType:"Rented",quantity:"1 Unit",readinessStatus:"Sourcing",continuityNotes:"Handheld by Meera on perimeter wall",sourceSnippet:"Meera scans the wire with her thermal monocle. Three glowing silhouettes freeze.",originalAiSuggestion:"Night-Vision Monocular Scope — Military grade digital thermal optics.",status:"Needs Review",isHumanConfirmed:!1,confidence:.85,confirmedBy:null,confirmedAt:null,notes:"Rental request pending vendor confirmation."},{id:"elem-11",scriptId:e,sceneId:"scene-7",sceneNumber:7,scenes:[7],category:"Cast",name:"COMMANDER VANCE",characterRole:"Antagonist, regional water syndicate director.",description:"Antagonist, regional water syndicate director.",assignedActor:"Michael Shannon",castingStatus:"Offer Out",actorAvailability:"Hold Oct 20-24",appearancesCount:2,sourceSnippet:"COMMANDER VANCE (50s), tailored gray linen, stands over the telemetry terminal.",originalAiSuggestion:"COMMANDER VANCE — Antagonist, regional water syndicate director.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Cast confirmed. Costume fitting scheduled Oct 20."},{id:"elem-12",scriptId:e,sceneId:"scene-16",sceneNumber:16,scenes:[16],category:"Practical FX",name:"Catwalk Rain Towers",description:"Simulated industrial torrential flood conditions on exterior catwalk.",requiredResources:"3 Overhead Rain Spars, 2 Fire Hydrant Ties",technicalRequirements:"Runoff water deflection channeling away from electrical stage lines",safetyNotes:"Safety harnesses mandatory on exterior catwalk scaffolding",prepStatus:"Pending Proposal Approval",sourceSnippet:"Water cascades down the spillway faces like Niagara.",originalAiSuggestion:"Catwalk Rain Towers — Simulated flood conditions on exterior catwalk.",status:"Needs Review",isHumanConfirmed:!1,confidence:.9,confirmedBy:null,confirmedAt:null,notes:"Requires environmental containment permits."}],localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(o))),t&&t!=="all"&&(o=o.filter(a=>a.category.toLowerCase()===t.toLowerCase())),s&&s!=="all"){const a=Number(String(s).replace("scene-",""));o=o.filter(l=>l.sceneId===s||String(l.sceneNumber)===String(s)||Array.isArray(l.scenes)&&l.scenes.includes(a)||l.sceneNumber===a)}return o}async function Bs(e,t,s){try{const a=await Z(`/production/${e}/breakdown/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.item){const l=await Ct(e),i=l.findIndex(r=>r.id===t);return i!==-1&&(l[i]=a.item,localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(l))),a.item}}catch{}const n=await Ct(e),o=n.find(a=>a.id===t);return o?((s.name&&s.name!==o.name||s.description&&s.description!==o.description)&&(o.userCorrection={previousName:o.name,previousDesc:o.description,correctedBy:"Arun Kumar (Owner)",correctedAt:new Date().toISOString()}),Object.assign(o,s),s.status==="Confirmed"?(o.isHumanConfirmed=!0,o.confirmedBy="Arun Kumar (Owner)",o.confirmedAt=new Date().toISOString()):s.status==="Needs Review"&&(o.isHumanConfirmed=!1),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(n)),o):s}async function oo(e,t){try{const o=await Z(`/production/${e}/breakdown/${t}`,{method:"DELETE"});if(o?.success){const l=(await Ct(e)).filter(i=>i.id!==t);return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(l)),o}}catch{}const n=(await Ct(e)).filter(o=>o.id!==t);return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(n)),{success:!0,removedId:t}}async function lo(e,t){try{const a=await Z(`/production/${e}/breakdown`,{method:"POST",body:JSON.stringify(t)});if(a?.item){const l=await Ct(e);return l.unshift(a.item),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(l)),a.item}}catch{}const s=await Ct(e),n=Number(t.sceneNumber||(t.sceneId?String(t.sceneId).replace("scene-",""):18)),o={id:`elem-${Date.now()}`,scriptId:e,sceneId:t.sceneId||`scene-${n}`,sceneNumber:n,scenes:t.scenes||[n],category:t.category||"Props",name:t.name,description:t.description||"",sourceSnippet:t.sourceSnippet||"User added manual item",originalAiSuggestion:null,status:t.status||"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:new Date().toISOString(),notes:t.notes||"",assignedActor:t.assignedActor||"",castingStatus:t.castingStatus||"Uncast / Open",actorAvailability:t.actorAvailability||"",characterRole:t.characterRole||t.description||"",context:t.context||"INT.",lighting:t.lighting||"DAY",locationStatus:t.locationStatus||"Secured & Permitted",accessDetails:t.accessDetails||"",sourcingType:t.sourcingType||"Sourced",quantity:t.quantity||"1",readinessStatus:t.readinessStatus||"Ready in Art Dept",continuityNotes:t.continuityNotes||"",requiredResources:t.requiredResources||"",technicalRequirements:t.technicalRequirements||"",safetyNotes:t.safetyNotes||"",coordinationRequirements:t.coordinationRequirements||"",qualifiedPersonnel:t.qualifiedPersonnel||"",safetyPlanningStatus:t.safetyPlanningStatus||"Awaiting Coordinator Review",character:t.character||"",wardrobeRequirements:t.wardrobeRequirements||"",continuityChanges:t.continuityChanges||"",prepStatus:t.prepStatus||"In Prep",availability:t.availability||"",operationalRequirements:t.operationalRequirements||""};return s.unshift(o),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(s)),o}async function Wt(e="chronicles-of-dust"){try{const n=await Z(`/production/${e}/call-sheets`);if(n?.callSheets)return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n.callSheets)),n.callSheets}catch{}const t=localStorage.getItem(`scriptora_prod_callsheets_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"cs-1",scriptId:e,callSheetNumber:"01",shootDay:"Day 1 of 7",shootDate:"Saturday, Oct 24, 2026",generalCrewCall:"06:00 AM",shootingCall:"06:30 AM",breakfastTime:"05:15 AM",estimatedWrap:"06:30 PM",status:"Confirmed",isPublished:!0,version:"v1.0",locationName:"Mojave Outpost Gate 4",locationAddress:"Perimeter Road 9, Cantil, CA 93519",parkingNotes:"Crew parking at Basecamp Lot B (1/4 mile west of gate). Shuttle runs every 10 mins.",nearestHospital:"Kern Valley Healthcare District, 6412 Laurel Ave, Lake Isabella, CA (Ph: 760-379-2681)",weatherSummary:"Sunny, 74°F high, 48°F low. Winds WNW 10-15 mph. Dust advisory after 4:00 PM.",scenes:[{sceneNumber:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",pages:"4 1/8",cast:["KEVIN","MARCUS"],desc:"Kevin arrives at border gate, inspection with Marcus."},{sceneNumber:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",pages:"3 4/8",cast:["KEVIN","MEERA"],desc:"Kevin discovers pressure loss on telemetry terminal."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MARCUS",actor:"David Chen",pickup:"05:15 AM",hmuCall:"05:45 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MEERA",actor:"Priya Sharma",pickup:"08:30 AM",hmuCall:"09:00 AM",onSet:"10:30 AM",status:"Confirmed"}],specialInstructions:"Eye protection mandatory for all crew on exterior perimeter due to afternoon dust squall.",approvedBy:"Arun Kumar (Owner)",publishedAt:"2026-10-14T08:00:00Z"},{id:"cs-2",scriptId:e,callSheetNumber:"02",shootDay:"Day 2 of 7",shootDate:"Sunday, Oct 25, 2026",generalCrewCall:"06:30 AM",shootingCall:"07:00 AM",breakfastTime:"05:45 AM",estimatedWrap:"07:00 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:"Pumping Station Chamber B",locationAddress:"Aqueduct District Facility 4, Mojave, CA 93501",parkingNotes:"Basecamp parking inside Gate 2 secure compound. Security clearance badge required.",nearestHospital:"Antelope Valley Medical Center, 1600 W Ave J, Lancaster, CA (Ph: 661-949-5000)",weatherSummary:"Interior stage / sheltered facility. Ambient temp 68°F. Hearing protection mandatory.",scenes:[{sceneNumber:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",pages:"7 2/8",cast:["KEVIN"],desc:"Kevin examines exterior tap line."},{sceneNumber:10,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",pages:"2 6/8",cast:["KEVIN","MEERA"],desc:"High water pressure valve breach and cable clamp."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"},{character:"MEERA",actor:"Priya Sharma",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"}],specialInstructions:"Wet set protocols in effect for Scene 10. Waterproof camera housing and electrical GFI circuits required.",approvedBy:null,publishedAt:null}];return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),s}async function Nn(e,t){try{const n=await Z(`/production/${e}/call-sheets/${t}`);if(n?.callSheet)return n.callSheet}catch{}return(await Wt(e)).find(n=>n.id===t)||null}async function io(e,t){try{const o=await Z(`/production/${e}/call-sheets`,{method:"POST",body:JSON.stringify(t)});if(o?.callSheet)return o.callSheet}catch{}const s=await Wt(e),n={id:`cs-${Date.now()}`,scriptId:e,callSheetNumber:String(s.length+1).padStart(2,"0"),shootDay:t.shootDay||`Day ${s.length+1} of 14`,shootDate:t.shootDate||"Monday, Oct 26, 2026",generalCrewCall:t.generalCrewCall||"06:00 AM",shootingCall:t.shootingCall||"06:30 AM",breakfastTime:t.breakfastTime||"05:15 AM",estimatedWrap:t.estimatedWrap||"06:30 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:t.locationName||"Location TBD",locationAddress:t.locationAddress||"TBD",parkingNotes:t.parkingNotes||"Crew parking guidelines.",nearestHospital:t.nearestHospital||"Desert Care Network Regional, Palm Springs, CA",weatherSummary:t.weatherSummary||"Forecast pending.",scenes:t.scenes||[{sceneNumber:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",pages:"5 0/8",cast:["KEVIN","MEERA"],desc:"Perimeter fence inspection."}],castCalls:t.castCalls||[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Draft"}],specialInstructions:t.specialInstructions||"Standard safety directives.",approvedBy:null,publishedAt:null};return s.push(n),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),n}async function ro(e,t,s){try{const a=await Z(`/production/${e}/call-sheets/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.callSheet)return a.callSheet}catch{}const n=await Wt(e),o=n.find(a=>a.id===t);return o?(Object.assign(o,s),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n)),o):s}async function co(e,t){try{const o=await Z(`/production/${e}/call-sheets/${t}/publish`,{method:"POST"});if(o?.callSheet)return o.callSheet}catch{}const s=await Wt(e),n=s.find(o=>o.id===t);return n?(n.status="Confirmed",n.isPublished=!0,n.version="v1.0 (Snapshot)",n.approvedBy="Arun Kumar (Owner)",n.publishedAt=new Date().toISOString(),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),n):null}async function It(e="chronicles-of-dust"){try{const n=await Z(`/production/${e}/schedule`);if(n?.schedule)return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(n.schedule)),n.schedule}catch{}const t=localStorage.getItem(`scriptora_prod_schedule_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{dayNumber:1,date:"Oct 24, 2026",title:"Outpost Perimeter & Shed",location:"Mojave Gate 4",sceneNumbers:[1,2],totalPages:"7 5/8",estHours:10.5,companyMoves:0,isLocked:!0,status:"Confirmed"},{dayNumber:2,date:"Oct 25, 2026",title:"Lakebed Conduit & Chamber B",location:"Chamber B Dry Tank",sceneNumbers:[3,10],totalPages:"10 0/8",estHours:11,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:3,date:"Oct 26, 2026",title:"Perimeter Fence & Valve Tunnel",location:"Perimeter Sector 9",sceneNumbers:[4,5],totalPages:"10 4/8",estHours:11.5,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:4,date:"Oct 27, 2026",title:"Service Road Pursuit",location:"Route 66 Cutoff",sceneNumbers:[6],totalPages:"5 2/8",estHours:8,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:5,date:"Oct 28, 2026",title:"Syndicate Regional Control",location:"Syndicate Regional HQ",sceneNumbers:[7],totalPages:"6 3/8",estHours:9,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:6,date:"Oct 29, 2026",title:"Reservoir Intake Rappel",location:"Lake Mead Dry Spillway",sceneNumbers:[8],totalPages:"5 5/8",estHours:10,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:7,date:"Oct 30, 2026",title:"Drainage Sub-vaults & Wrap",location:"Vault Sub-structure 3",sceneNumbers:[9],totalPages:"4 1/8",estHours:8.5,companyMoves:0,isLocked:!1,status:"Draft"}];return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(s)),s}async function Nt(e,t,s){try{const a=await Z(`/production/${e}/schedule/day/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.day)return a.day}catch{}const n=await It(e),o=n.find(a=>a.dayNumber===Number(t));return o?(Object.assign(o,s),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(n)),o):s}async function po(e,t,s,n){const o=await It(e),a=o.find(i=>i.dayNumber===Number(s)),l=o.find(i=>i.dayNumber===Number(n));return!a||!l||(a.sceneNumbers=(a.sceneNumbers||[]).filter(i=>i!==Number(t)),(l.sceneNumbers||[]).includes(Number(t))||(l.sceneNumbers=[...l.sceneNumbers||[],Number(t)]),await Nt(e,s,{sceneNumbers:a.sceneNumbers}),await Nt(e,n,{sceneNumbers:l.sceneNumbers})),o}async function Tn(e,t,s){return await Nt(e,t,{sceneNumbers:s})}async function Pn(e,t){try{const o=await Z(`/production/${e}/call-sheets/${t}`,{method:"DELETE"});if(o?.success){const l=(await Wt(e)).filter(i=>i.id!==t);return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(l)),o}}catch{}const n=(await Wt(e)).filter(o=>o.id!==t);return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n)),{success:!0,removedId:t}}async function uo(e,t){try{const a=await Z(`/production/${e}/schedule/day`,{method:"POST",body:JSON.stringify(t)});if(a?.day){const l=await It(e);return l.push(a.day),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(l)),a.day}}catch{}const s=await It(e),n=s.length>0?Math.max(...s.map(a=>a.dayNumber))+1:1,o={dayNumber:t.dayNumber||n,date:t.date||`Nov ${String(n).padStart(2,"0")}, 2026`,title:t.title||`Shoot Day ${n}`,location:t.location||"Location TBD",sceneNumbers:t.sceneNumbers||[],totalPages:t.totalPages||"0 0/8",estHours:t.estHours||8,companyMoves:t.companyMoves||0,isLocked:!1,status:"Draft"};return s.push(o),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(s)),o}async function mo(e,t){const s=Number(t);try{const a=await Z(`/production/${e}/schedule/day/${s}`,{method:"DELETE"});if(a?.success){const i=(await It(e)).filter(r=>r.dayNumber!==s);return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(i)),a}}catch{}const o=(await It(e)).filter(a=>a.dayNumber!==s);return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(o)),{success:!0,removedDayNumber:s}}async function fo(){try{const e=await Z("/production/ai/providers");if(e?.providers)return e.providers}catch{}return[{id:"scriptora-concept",name:"SCRIPTORA Concept Engine",model:"v2.4 High-Res Vector & Composition",isConfigured:!0,pricingType:"free",costPerImage:0,costLabel:"Free (Built-in)",requiresApiKey:!1,aspectRatios:["2.39:1","16:9","4:3","9:16"],styles:["Cinematic Concept Art","Storyboard Ink","Pencil Sketch","Photorealistic / Live Action","3D Animation","Anime / Illustration"],description:"Fast, cinematic vector canvas with camera crosshairs, aspect ratio letterboxing, stylized character silhouettes, and directional lighting."},{id:"openai-dalle3",name:"OpenAI DALL-E 3",model:"dall-e-3",isConfigured:!1,pricingType:"paid",costPerImage:.04,costLabel:"$0.040 (Standard) / $0.080 (HD)",requiresApiKey:!0,envVarName:"OPENAI_API_KEY",aspectRatios:["16:9","2.39:1","1:1","9:16"],styles:["Photorealistic / Live Action","Cinematic Concept Art","Pencil Sketch","3D Animation"],description:"High-fidelity photorealistic rendering and complex composition synthesis via OpenAI API."},{id:"gemini-imagen3",name:"Google Imagen 3",model:"imagen-3.0-generate-002",isConfigured:!1,pricingType:"paid",costPerImage:.03,costLabel:"$0.030 per image",requiresApiKey:!0,envVarName:"GEMINI_API_KEY",aspectRatios:["16:9","4:3","1:1","9:16"],styles:["Cinematic Concept Art","Photorealistic / Live Action","Storyboard Ink"],description:"Photorealistic film still generation using Google Vertex/Gemini Imagen 3."},{id:"stability-sdxl",name:"Stability AI SDXL",model:"stable-diffusion-xl-1024-v1-0",isConfigured:!1,pricingType:"paid",costPerImage:.018,costLabel:"$0.018 per image",requiresApiKey:!0,envVarName:"STABILITY_API_KEY",aspectRatios:["16:9","2.39:1","4:3","9:16"],styles:["Storyboard Ink","Pencil Sketch","Cinematic Concept Art","Anime / Illustration"],description:"Versatile storyboard and concept illustration synthesis via Stability AI."}]}async function Ht(e="chronicles-of-dust",t="scene-1"){try{const r=await Z(`/production/${e}/storyboard?sceneId=${t}`);if(r?.storyboard)return localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(r.storyboard)),r.storyboard}catch{}const s=localStorage.getItem(`scriptora_storyboard_${e}_${t}`);if(s)try{return JSON.parse(s)}catch{}const n=await is(e),o=Number(String(t).replace("scene-",""))||1,a=n.find(r=>r.id===t||r.sceneNumber===o)||{id:`scene-${o}`,sceneNumber:o,heading:`SCENE ${o} - UNTITLED`,intExt:"INT",dayNight:"DAY"},l=o===1?[{id:"shot-1-1A",shotNumber:"1A",order:1,title:"Perimeter Outpost Gate",description:"High altitude drone descending across dust devils toward Kevin's arrival at the arid customs gate.",shotSize:"Wide Shot",cameraAngle:"High Angle",cameraMovement:"Crane / Jib",focalLength:"24mm Wide",lightingMood:"Daylight Dust",aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",prompt:"Cinematic wide shot, arid desert outpost gate, dust devils whirling, 2.39:1 anamorphic",imageUrl:Ps("1A","2.39:1 · 24mm Wide","EXT. MOJAVE OUTPOST GATE 4 - DAY","Wide Shot"),imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"approved",approvalNotes:"Great atmosphere and sense of scale. Approved for primary camera team.",approvedBy:"Arun Kumar (Owner)",approvedAt:"2026-10-18T10:30:00Z",directorNotes:"Capture sunrise glint off the guard gate perimeter wires.",characters:["KEVIN","MARCUS"],location:"Arid Outpost Gate 4",continuity:{characterPosition:"Kevin approaching from camera-left",screenDirection:"Left to Right",eyeline:"Looking toward Outpost Gate",lightingContinuity:"High-contrast morning sun from east",costumeState:"Dust coat level 2, canteen left side",propPlacement:"Gate clearance scanner in right hand"},history:[]},{id:"shot-1-1B",shotNumber:"1B",order:2,title:"Gate Scanner Clearance Standoff",description:"Medium two-shot of Kevin presenting his ID badge to Marcus over the buzzing clearance terminal.",shotSize:"Medium Two-Shot",cameraAngle:"Eye Level",cameraMovement:"Static",focalLength:"50mm Prime",lightingMood:"Harsh Fluorescent Rim",aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",prompt:"Medium two-shot, dusty outpost booth, weary hydro-engineer confronting guard, 50mm",imageUrl:Ps("1B","2.39:1 · 50mm Prime","EXT. MOJAVE OUTPOST GATE 4 - DAY","Medium Two-Shot"),imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"approved",approvalNotes:"Good eyeline match with Shot 1A.",approvedBy:"Arun Kumar (Owner)",approvedAt:"2026-10-18T10:35:00Z",directorNotes:"Focus pull from scanner terminal to Kevin's tense expression.",characters:["KEVIN","MARCUS"],location:"Arid Outpost Gate 4",continuity:{characterPosition:"Kevin screen-left, Marcus screen-right",screenDirection:"Left to Right",eyeline:"Eye-level direct confrontation",lightingContinuity:"Terminal backlight rimming Kevin's face",costumeState:"Kevin wearing goggles around neck",propPlacement:"ID card inserted into reader"},history:[]},{id:"shot-1-1C",shotNumber:"1C",order:3,title:"Terminal Diagnostic Anomaly",description:"Close-up insert of the flickering scanner console displaying pressure alert warning in red neon.",shotSize:"Close-Up",cameraAngle:"Low Angle",cameraMovement:"Static",focalLength:"85mm Portrait",lightingMood:"Cyan Strobe",aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",prompt:"Extreme close-up on rugged military diagnostic screen, red warning glyphs, 85mm",imageUrl:Ps("1C","2.39:1 · 85mm Close-Up","EXT. MOJAVE OUTPOST GATE 4 - DAY","Close-Up"),imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"proposed",approvalNotes:"Review telemetry readout typography for accuracy.",approvedBy:null,approvedAt:null,directorNotes:"Practical screen insert; needs strobe flash on alert pulse.",characters:["KEVIN"],location:"Arid Outpost Gate 4",continuity:{characterPosition:"Centered insert",screenDirection:"Neutral",eyeline:"Downwards onto screen",lightingContinuity:"Red alert flashing 1Hz",costumeState:"Kevin's gloved thumb on lower bezel",propPlacement:"Scanner unit firmly latched"},history:[]}]:[],i={id:`sb-${e}-${a.id}`,scriptId:e,sceneId:a.id,sceneNumber:a.sceneNumber,sceneHeading:a.heading,intExt:a.intExt||"INT",dayNight:a.dayNight||"DAY",sourceVersion:"Draft 4.2",isVersionStale:!1,aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",shots:l,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(i)),i}async function Rt(e,t){try{const n=await Z(`/production/${e}/storyboard`,{method:"POST",body:JSON.stringify(t)});if(n?.storyboard)return localStorage.setItem(`scriptora_storyboard_${e}_${n.storyboard.sceneId}`,JSON.stringify(n.storyboard)),n.storyboard}catch{}const s=t.sceneId||`scene-${t.sceneNumber||1}`;return localStorage.setItem(`scriptora_storyboard_${e}_${s}`,JSON.stringify(t)),t}async function xo(e,t,s){try{const r=await Z(`/production/${e}/storyboard/${t}/shots`,{method:"POST",body:JSON.stringify(s)});if(r?.shot)return r.storyboard&&localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(r.storyboard)),r}catch{}const n=await Ht(e,t),o=n.shots.length+1,a=String.fromCharCode(65+(o-1)%26),l=s.shotNumber||`${n.sceneNumber}${a}`,i={id:`shot-${Date.now()}`,shotNumber:l,order:o,title:s.title||`Shot ${l}`,description:s.description||"",shotSize:s.shotSize||"Medium Shot",cameraAngle:s.cameraAngle||"Eye Level",cameraMovement:s.cameraMovement||"Static",focalLength:s.focalLength||"50mm Prime",lightingMood:s.lightingMood||"Natural Daylight",aspectRatio:s.aspectRatio||n.aspectRatio||"2.39:1",visualStyle:s.visualStyle||n.visualStyle||"Cinematic Concept Art",prompt:s.prompt||"",negativePrompt:s.negativePrompt||"",imageUrl:s.imageUrl||null,imageSource:s.imageSource||(s.imageUrl?"imported":null),provider:s.provider||null,quality:s.quality||"standard",costEstimate:s.costEstimate||null,approvalStatus:s.approvalStatus||"draft",approvalNotes:s.approvalNotes||"",approvedBy:s.approvedBy||null,approvedAt:s.approvedAt||null,directorNotes:s.directorNotes||"",characters:s.characters||[],location:s.location||"",continuity:{characterPosition:s.continuity?.characterPosition||"",screenDirection:s.continuity?.screenDirection||"Left to Right",eyeline:s.continuity?.eyeline||"Eye Level",lightingContinuity:s.continuity?.lightingContinuity||"",costumeState:s.continuity?.costumeState||"",propPlacement:s.continuity?.propPlacement||""},history:[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return n.shots.push(i),n.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(n)),{storyboard:n,shot:i}}async function Ln(e,t,s,n){try{const l=await Z(`/production/${e}/storyboard/${t}/shots/${s}`,{method:"PUT",body:JSON.stringify(n)});if(l?.shot)return l.storyboard&&localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(l.storyboard)),l}catch{}const o=await Ht(e,t),a=o.shots.find(l=>l.id===s);if(!a)throw new Error("Shot not found");return n.continuity&&(n.continuity={...a.continuity,...n.continuity}),Object.assign(a,n,{updatedAt:new Date().toISOString()}),o.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(o)),{storyboard:o,shot:a}}async function bo(e,t,s){try{const a=await Z(`/production/${e}/storyboard/${t}/shots/${s}`,{method:"DELETE"});if(a?.success)return a.storyboard&&localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(a.storyboard)),a}catch{}const n=await Ht(e,t),o=n.shots.findIndex(a=>a.id===s);return o!==-1&&(n.shots.splice(o,1),n.shots.forEach((a,l)=>{a.order=l+1}),n.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(n))),{success:!0,removedId:s,storyboard:n}}async function go(e,t,s=[]){try{const l=await Z(`/production/${e}/storyboard/${t}/reorder`,{method:"POST",body:JSON.stringify({shotIds:s})});if(l?.storyboard)return localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(l.storyboard)),l}catch{}const n=await Ht(e,t),o=new Map(n.shots.map(l=>[l.id,l])),a=[];for(const l of s)o.has(l)&&(a.push(o.get(l)),o.delete(l));for(const l of o.values())a.push(l);return a.forEach((l,i)=>{l.order=i+1}),n.shots=a,n.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(n)),{storyboard:n}}async function Vs(e,t,s,n="approved",o=""){try{const i=await Z(`/production/${e}/storyboard/${t}/shots/${s}/approve`,{method:"POST",body:JSON.stringify({status:n,notes:o})});if(i?.shot)return i.storyboard&&localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(i.storyboard)),i}catch{}const a=await Ht(e,t),l=a.shots.find(i=>i.id===s);return l&&(l.approvalStatus=n,l.approvalNotes=o||l.approvalNotes||"",l.approvedBy="Arun Kumar (Owner)",l.approvedAt=new Date().toISOString(),l.updatedAt=new Date().toISOString(),a.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(a))),{storyboard:a,shot:l}}async function Gs(e,t,s=[],n="approved",o=""){try{const i=await Z(`/production/${e}/storyboard/${t}/batch-approve`,{method:"POST",body:JSON.stringify({shotIds:s,status:n,notes:o})});if(i?.storyboard)return localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(i.storyboard)),i}catch{}const a=await Ht(e,t);let l=0;for(const i of a.shots)s.includes(i.id)&&(i.approvalStatus=n,o&&(i.approvalNotes=o),i.approvedBy="Arun Kumar (Owner)",i.approvedAt=new Date().toISOString(),i.updatedAt=new Date().toISOString(),l++);return a.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(a)),{storyboard:a,affectedCount:l}}async function Qt(e,t={}){try{const n=await Z(`/production/${e}/storyboard/generate-shot`,{method:"POST",body:JSON.stringify(t)});if(n?.imageUrl)return n}catch(n){if(n.message&&n.message.includes("not configured"))throw n}return{imageUrl:Ps(t.shotNumber||"1A",`${t.aspectRatio||"2.39:1"} · ${t.focalLength||"50mm"}`,t.sceneHeading||"SCENE 1",t.shotSize||"Medium Shot"),provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",prompt:t.prompt||""}}function Ps(e,t,s,n,o="Cinematic Concept Art",a="2.39:1"){let l=1200,i=502;a==="16:9"&&(i=675),a==="4:3"&&(i=900),a==="9:16"&&(l=675,i=1200);const r=s.toUpperCase().includes("NIGHT"),f=(o||"").toLowerCase().includes("pencil"),p=(o||"").toLowerCase().includes("ink"),d=(o||"").toLowerCase().includes("anime")||(o||"").toLowerCase().includes("illustration");let c=r?"%23090d16":"%23292524",m=r?"%23020617":"%231c1917",g=r?"%2338bdf8":"%23f59e0b",h=r?"%2306b6d4":"%23fbbf24",b="%23020617",y="%23ffffff",P="0.08";f?(c="%23f5f5f4",m="%23e7e5e4",g="%2357534e",h="%2378716c",b="%2344403c",y="%23292524",P="0.15"):p?(c="%230a0a0a",m="%23000000",g="%23ffffff",h="%23e2e8f0",b="%230f172a"):d&&(c="%231e1035",m="%230f0728",g="%23ec4899",h="%2338bdf8");let S=240,N=i-260;n&&n.includes("Wide")?(S=100,N=i-140):n&&n.includes("Close")&&!n.includes("Extreme")?(S=400,N=i-420):n&&n.includes("Extreme")&&(S=540,N=i-550);const E=n&&n.includes("Two-Shot"),j=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${l} ${i}' width='${l}' height='${i}'>
    <defs>
      <linearGradient id='bg2' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='${c}'/>
        <stop offset='100%' stop-color='${m}'/>
      </linearGradient>
      <radialGradient id='rimLight2' cx='70%' cy='30%' r='65%'>
        <stop offset='0%' stop-color='${h}' stop-opacity='0.4'/>
        <stop offset='100%' stop-color='${m}' stop-opacity='0'/>
      </radialGradient>
      <pattern id='grid2' width='40' height='40' patternUnits='userSpaceOnUse'>
        <path d='M 40 0 L 0 0 0 40' fill='none' stroke='${y}' stroke-width='0.5' opacity='${P}'/>
      </pattern>
    </defs>
    <rect width='${l}' height='${i}' fill='url(%23bg2)'/>
    <rect width='${l}' height='${i}' fill='url(%23rimLight2)'/>
    <rect width='${l}' height='${i}' fill='url(%23grid2)'/>
    
    <line x1='0' y1='${Math.round(i*.63)}' x2='${l}' y2='${Math.round(i*.63)}' stroke='${g}' stroke-width='1.2' opacity='0.35' stroke-dasharray='5,5'/>
    
    ${E?`
      <g transform='translate(${Math.round(l*.35)}, ${Math.round(N)})'>
        <circle cx='0' cy='${Math.round(-S*.35)}' r='${Math.round(S*.12)}' fill='%230f172a' stroke='${h}' stroke-width='1.5'/>
        <path d='M ${Math.round(-S*.2)} ${Math.round(-S*.2)} Q 0 ${Math.round(-S*.26)} ${Math.round(S*.2)} ${Math.round(-S*.2)} L ${Math.round(S*.25)} ${S} L ${Math.round(-S*.25)} ${S} Z' fill='${b}' stroke='${g}' stroke-width='1.2'/>
      </g>
      <g transform='translate(${Math.round(l*.65)}, ${Math.round(N)})'>
        <circle cx='0' cy='${Math.round(-S*.35)}' r='${Math.round(S*.12)}' fill='%230f172a' stroke='${g}' stroke-width='1.5'/>
        <path d='M ${Math.round(-S*.2)} ${Math.round(-S*.2)} Q 0 ${Math.round(-S*.26)} ${Math.round(S*.2)} ${Math.round(-S*.2)} L ${Math.round(S*.25)} ${S} L ${Math.round(-S*.25)} ${S} Z' fill='${b}' stroke='${h}' stroke-width='1.2'/>
      </g>
    `:`
      <g transform='translate(${Math.round(l/2)}, ${Math.round(N)})'>
        <circle cx='0' cy='${Math.round(-S*.35)}' r='${Math.round(S*.12)}' fill='%230f172a' stroke='${h}' stroke-width='1.5'/>
        <path d='M ${Math.round(-S*.22)} ${Math.round(-S*.2)} Q 0 ${Math.round(-S*.28)} ${Math.round(S*.22)} ${Math.round(-S*.2)} L ${Math.round(S*.28)} ${S} L ${Math.round(-S*.28)} ${S} Z' fill='${b}' stroke='${g}' stroke-width='1.2'/>
      </g>
    `}

    <!-- Telemetry -->
    <rect x='24' y='24' width='140' height='26' rx='6' fill='black' opacity='0.7'/>
    <circle cx='36' cy='37' r='4' fill='%23ef4444'/>
    <text x='48' y='42' fill='white' font-family='monospace' font-size='11' font-weight='bold'>REC · ${e}</text>
    
    <rect x='${l-240}' y='24' width='216' height='46' rx='6' fill='black' opacity='0.7'/>
    <text x='${l-34}' y='41' text-anchor='end' fill='${g}' font-family='monospace' font-size='12' font-weight='bold'>${t}</text>
    <text x='${l-34}' y='60' text-anchor='end' fill='white' opacity='0.85' font-family='sans-serif' font-size='10'>${n}</text>

    <rect x='0' y='${i-36}' width='${l}' height='36' fill='black' opacity='0.85'/>
    <text x='24' y='${i-13}' fill='white' font-family='sans-serif' font-size='12' font-weight='bold'>${s}</text>
    <text x='${l-24}' y='${i-13}' text-anchor='end' fill='${h}' font-family='sans-serif' font-size='11'>SCRIPTORA CONCEPT ENGINE · ${(o||"CINEMATIC").toUpperCase()}</text>
  </svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(j)}`}async function ho(e,t,s,n){try{const l=await Z(`/production/${e}/storyboard/${t}/shots/${s}/restore`,{method:"POST",body:JSON.stringify({historyIndex:n})});if(l?.shot)return l.storyboard&&localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(l.storyboard)),l}catch{}const o=await Ht(e,t),a=o.shots.find(l=>l.id===s);if(a&&Array.isArray(a.history)&&a.history[n]){const l=a.history[n];a.history.push({previousImageUrl:a.imageUrl,previousPrompt:a.prompt,provider:a.provider||"scriptora-concept",quality:a.quality||"hd",approvalStatus:a.approvalStatus||"draft",sourceVersion:o.sourceVersion||"Draft 4.2",timestamp:new Date().toISOString(),updatedBy:"Arun Kumar (Owner)"}),a.imageUrl=l.previousImageUrl,l.previousPrompt&&(a.prompt=l.previousPrompt),l.provider&&(a.provider=l.provider),l.approvalStatus&&(a.approvalStatus=l.approvalStatus),a.updatedAt=new Date().toISOString(),o.updatedAt=new Date().toISOString(),localStorage.setItem(`scriptora_storyboard_${e}_${t}`,JSON.stringify(o))}return{storyboard:o,shot:a}}async function Qn(){try{const t=await Z("/production/storyboard/preferences");if(t?.preferences)return localStorage.setItem("scriptora_storyboard_preferences",JSON.stringify(t.preferences)),t.preferences}catch{}const e=localStorage.getItem("scriptora_storyboard_preferences");if(e)try{return JSON.parse(e)}catch{}return{defaultStyle:"Concept Art",defaultAspectRatio:"2.39:1",defaultShotSize:"Medium",defaultCameraAngle:"Eye Level",defaultLens:"50mm",defaultLighting:"Auto / Scene-based",experienceLevel:"Intermediate"}}async function yo(e={}){try{const n=await Z("/production/storyboard/preferences",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(n?.preferences)return localStorage.setItem("scriptora_storyboard_preferences",JSON.stringify(n.preferences)),n.preferences}catch{}const s={...await Qn(),...e};return localStorage.setItem("scriptora_storyboard_preferences",JSON.stringify(s)),s}async function Ds(e="chronicles-of-dust"){try{const s=await Z(`/production/${e}/storyboard/recycle-bin`);if(s?.items)return localStorage.setItem(`scriptora_storyboard_rb_${e}`,JSON.stringify(s.items)),s.items}catch{}const t=localStorage.getItem(`scriptora_storyboard_rb_${e}`);if(t)try{return JSON.parse(t)}catch{}return[]}async function vo(e,t){try{const s=await Z(`/production/${e}/storyboard/recycle-bin/restore`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({itemId:t})});if(s?.success){const o=(await Ds(e)).filter(a=>a.id!==t);return localStorage.setItem(`scriptora_storyboard_rb_${e}`,JSON.stringify(o)),s}}catch{}return{success:!0}}async function wo(e,t){try{const s=await Z(`/production/${e}/storyboard/recycle-bin/${t}`,{method:"DELETE"});if(s?.success){const o=(await Ds(e)).filter(a=>a.id!==t);return localStorage.setItem(`scriptora_storyboard_rb_${e}`,JSON.stringify(o)),s}}catch{}return{success:!0,removedId:t}}async function So(e){try{const t=await Z(`/production/${e}/storyboard/recycle-bin/empty`,{method:"POST"});return localStorage.setItem(`scriptora_storyboard_rb_${e}`,JSON.stringify([])),t||{success:!0}}catch{}return localStorage.setItem(`scriptora_storyboard_rb_${e}`,JSON.stringify([])),{success:!0}}async function Eo(e,t){try{return await Z(`/production/${e}/storyboard/scenes/${t}/soft-delete`,{method:"POST"})}catch{}return{success:!0,removedId:t}}class ko{constructor(){try{sessionStorage.removeItem("scriptora_history_stack")}catch{}this.state={currentUser:null,selectedScriptId:localStorage.getItem("scriptora_selected_script")||"chronicles-of-dust",selectedVersionId:"Draft 4.2",currentSceneId:18,unreadNotifications:3,scripts:[],activeScript:null,screenplay:null,settings:null,historyStack:[]},this.listeners=new Set}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(const t of this.listeners)try{t(this.state)}catch(s){console.error("Store listener error:",s)}}setState(t){this.state={...this.state,...t},t.selectedScriptId&&localStorage.setItem("scriptora_selected_script",t.selectedScriptId),this.notify()}pushHistory(t){if(!t)return;const s=t.trim(),n=this.state.historyStack;(n.length===0||n[n.length-1]!==s)&&(n.push(s),n.length>50&&n.shift())}popHistory(){return this.state.historyStack.pop()}getPreviousRoute(t="/workspace"){return this.popHistory()||t}peekPreviousRoute(t="/workspace"){const s=this.state.historyStack;return s.length>0?s[s.length-1]:t}clearHistory(){this.state.historyStack=[];try{sessionStorage.removeItem("scriptora_history_stack")}catch{}}resetUserSession(){this.setState({currentUser:null,scripts:[],activeScript:null,screenplay:null,historyStack:[],selectedScriptId:"chronicles-of-dust",unreadNotifications:0}),this.clearHistory()}async init(){try{const t=await Jn(),s=await xt(),n=await Bn(),o=await Zn();let a=localStorage.getItem("scriptora_selected_script");const l=s&&s.length>0?s.find(r=>r.isCurrentDraft):null;l?a=l.id:s&&s.length>0?(!a||!s.some(r=>r.id===a))&&(a=s[0].id):a=null,a?localStorage.setItem("scriptora_selected_script",a):localStorage.removeItem("scriptora_selected_script");const i=s&&s.length>0?s.find(r=>r.id===a)||s[0]:null;this.setState({currentUser:t,scripts:s||[],selectedScriptId:a,activeScript:i,unreadNotifications:n,settings:o})}catch(t){console.error("Init store error:",t)}}async selectScript(t){if(!t)return;const s=await ja(t),n=(s||this.state.scripts).find(o=>o.id===t)||await Os(t);this.setState({selectedScriptId:t,activeScript:n,scripts:s||this.state.scripts})}async refreshNotifications(){const t=await Bn();this.setState({unreadNotifications:t})}async refreshScripts(){const t=await xt(),s=t&&t.length>0?t.find(a=>a.isCurrentDraft):null;let n=s?s.id:this.state.selectedScriptId;t&&t.length>0?(!n||!t.some(a=>a.id===n))&&(n=t[0].id):n=null;const o=t&&t.length>0?t.find(a=>a.id===n)||t[0]:null;return n?localStorage.setItem("scriptora_selected_script",n):localStorage.removeItem("scriptora_selected_script"),this.setState({scripts:t||[],selectedScriptId:n,activeScript:o}),t}}const B=new ko,Io="/Scriptora/assets/logo-BG9jZ7UG.png",rn=Io;function ct(e="Workspace",t="Your writing space."){const s=B.state.unreadNotifications,n=B.state.currentUser?.initials||"JD";return`
    <header class="fixed top-0 left-0 right-0 w-full z-40 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-surface-container-high/60 select-none" data-global-header="true">
      <div class="h-14 px-4 flex items-center justify-between max-w-2xl mx-auto">
        <a href="/workspace" class="flex items-center gap-2.5 min-w-0 no-underline text-inherit cursor-pointer active:opacity-80 transition-opacity">
          <img src="${rn}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora" class="w-8 h-8 object-contain shrink-0" />
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
            ${B.state.currentUser?.avatarUrl?`
              <img src="${B.state.currentUser.avatarUrl}" class="w-full h-full object-cover" alt="Profile" />
            `:`
              <span>${n}</span>
            `}
          </a>
        </div>
      </div>
    </header>
  `}function ot(e="workspace"){const t=e==="workspace",s=e==="intelligence",n=e==="chat"||e==="ai-chat",o=e==="production"||e==="pre-production",a=e==="profile";return`
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
  `}function Co(e="workspace"){const t=document.getElementById("scriptora-bottom-nav");return t?(t.outerHTML=ot(e),!0):!1}function w(e,t="success"){const s=document.getElementById("global-toast"),n=document.getElementById("toast-message"),o=document.getElementById("toast-icon");if(!s||!n){console.log(`[Toast ${t}]`,e);return}n.textContent=e,o&&(t==="error"?(o.textContent="error",o.className="material-symbols-outlined text-[18px] text-red-400"):t==="info"?(o.textContent="info",o.className="material-symbols-outlined text-[18px] text-blue-300"):(o.textContent="check_circle",o.className="material-symbols-outlined text-[18px] text-emerald-300")),s.classList.remove("opacity-0","pointer-events-none"),s.classList.add("opacity-100"),clearTimeout(s._timeout),s._timeout=setTimeout(()=>{s.classList.remove("opacity-100"),s.classList.add("opacity-0","pointer-events-none")},2400)}function Ao(){return`
    <main class="flex flex-col relative w-full pt-safe pb-safe bg-surface min-h-screen justify-center items-center px-4">
      <div class="flex flex-col w-full max-w-sm py-8 fade-in">
        <!-- Brand & Logo Header -->
        <header class="flex flex-col items-center justify-center pb-4 text-center">
          <img src="${rn}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-16 h-16 object-contain mb-3 drop-shadow-sm" />
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
  `}function $o(e){const t=document.getElementById("tab-signin"),s=document.getElementById("tab-register"),n=document.getElementById("tab-otp"),o=document.getElementById("flow-signin"),a=document.getElementById("flow-register"),l=document.getElementById("flow-otp");function i(N){[t,s,n].forEach(E=>{E.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 text-on-surface-variant hover:text-on-surface"}),[o,a,l].forEach(E=>E.classList.add("hidden")),N==="signin"?(t.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",o.classList.remove("hidden")):N==="register"?(s.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",a.classList.remove("hidden")):N==="otp"&&(n.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold flex items-center justify-center gap-1",l.classList.remove("hidden"))}t&&(t.onclick=()=>i("signin")),s&&(s.onclick=()=>i("register")),n&&(n.onclick=()=>i("otp"));const r=document.getElementById("toggle-pw-signin"),f=document.getElementById("signin-password");r&&f&&(r.onclick=()=>{const N=f.type==="password";f.type=N?"text":"password",r.innerHTML=`<span class="material-symbols-outlined text-[18px]">${N?"visibility_off":"visibility"}</span>`});function p(N){try{const j=N.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),T=decodeURIComponent(atob(j).split("").map(ce=>"%"+("00"+ce.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(T)}catch{return null}}const d=document.getElementById("btn-google-login"),c="756924881120-0qngpm230nq3k8bb61ttt1de7jv28fui.apps.googleusercontent.com";let m=null;async function g(N){w("Connecting with Google...");try{const E=await La(N);B.setState({currentUser:E}),w(`Welcome back, ${E.displayName||E.name}`),e("/welcome")}catch(E){w(E.message||"Google sign-in error","error")}}function h(){if(window.google?.accounts?.id&&c)try{window.google.accounts.id.initialize({client_id:c,callback:async N=>{if(N&&N.credential){const E=p(N.credential)||{};await g({token:N.credential,email:E.email,name:E.name,displayName:E.name,picture:E.picture,sub:E.sub,provider:"google"})}},auto_select:!1,cancel_on_tap_outside:!0})}catch(N){console.warn("Google One Tap setup note:",N)}if(window.google?.accounts?.oauth2&&c)try{m=window.google.accounts.oauth2.initTokenClient({client_id:c,scope:"email profile openid",callback:async N=>{if(N&&N.access_token){w("Retrieving Google profile...");try{const j=await(await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${N.access_token}`}})).json();await g({token:N.access_token,email:j.email,name:j.name,displayName:j.name,picture:j.picture,sub:j.sub,provider:"google"})}catch(E){console.warn("Google userinfo fetch note:",E),await g({token:N.access_token,provider:"google"})}}}})}catch(N){console.warn("Google OAuth token client setup note:",N)}}h(),d&&(d.onclick=async()=>{if(!m&&window.google&&h(),m)try{m.requestAccessToken({prompt:"select_account"});return}catch(N){console.warn("Token client request error, trying prompt:",N)}if(window.google?.accounts?.id)try{window.google.accounts.id.prompt(N=>{(N.isNotDisplayed()||N.isSkippedMoment())&&(console.log("GIS prompt not displayed:",N.getNotDisplayedReason()),g({email:"arun.kumar@scriptora.studio",name:"Arun Kumar",displayName:"Arun Kumar",provider:"google"}))});return}catch(N){console.warn("GIS prompt error:",N)}await g({email:"arun.kumar@scriptora.studio",name:"Arun Kumar",displayName:"Arun Kumar",provider:"google"})});const b=document.getElementById("form-signin");b&&(b.onsubmit=async N=>{N.preventDefault();const E=document.getElementById("signin-email").value,j=f.value;try{const T=await Pa({email:E,password:j});B.setState({currentUser:T}),w(`Welcome back, ${T.displayName||T.name}`),e("/welcome")}catch(T){w(T.message,"error")}});const y=document.getElementById("form-register");y&&(y.onsubmit=async N=>{N.preventDefault();const E=document.getElementById("reg-name").value,j=document.getElementById("reg-email").value,T=document.getElementById("reg-password").value;try{const ce=await Da({name:E,email:j,password:T});B.setState({currentUser:ce}),w("Account created successfully"),e("/welcome")}catch(ce){w(ce.message,"error")}});const P=document.getElementById("form-otp");P&&(P.onsubmit=async N=>{N.preventDefault();const E=document.getElementById("otp-phone").value;try{const j=await Ra(E);B.setState({currentUser:j}),w("Phone verified successfully"),e("/welcome")}catch(j){w(j.message,"error")}});const S=document.getElementById("btn-forgot-pw");S&&(S.onclick=()=>{w("Password reset link sent to registered email","info")})}function Bo(){return B.state.currentUser,`
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
          <img src="${rn}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-20 h-20 object-contain mb-5 drop-shadow-sm" />

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
  `}function No(e){const t=document.getElementById("welcome-sign-out");t&&(t.onclick=async()=>{await Yn(),B.setState({currentUser:null}),w("Signed out successfully"),e("/auth")})}function ea(){let e=document.getElementById("scriptora-modal-portal");return e||(e=document.createElement("div"),e.id="scriptora-modal-portal",document.body.appendChild(e)),e}function ta(e){if(!e)return;const t=ea();e.parentElement!==t&&t.appendChild(e)}function Rs(){!!document.querySelector("#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)")?(document.documentElement.classList.add("scriptora-modal-open"),document.body.classList.add("scriptora-modal-open")):(document.documentElement.classList.remove("scriptora-modal-open"),document.body.classList.remove("scriptora-modal-open"))}function To(){document.documentElement.classList.add("scriptora-modal-open"),document.body.classList.add("scriptora-modal-open")}function Dn(){Rs()}function pt(e){if(!e)return;ta(e),e.classList.remove("hidden"),e.classList.add("flex"),To(),e.scrollTop=0;const t=e.querySelector(".scriptora-modal-card");if(t){t.scrollTop=0;const s=t.querySelector(".scriptora-modal-body, .overflow-y-auto");s&&(s.scrollTop=0)}}function Be(e){e&&(e.classList.contains("hidden")||(e.classList.add("hidden"),e.classList.remove("flex")),Rs())}function Po(e,t,s={}){if(!e||!t)return null;const{placement:n="auto",offset:o=4,boundaryMargin:a=8,preferPosition:l="bottom"}=s,i=e.getBoundingClientRect(),r=window.visualViewport,f=r?r.width:window.innerWidth,p=r?r.height:window.innerHeight,d=r?r.offsetTop:0,c=r?r.offsetLeft:0,m=!!e.closest(".scriptora-modal-overlay");let g=d+a,h=d+p-a;if(!m){const te=document.getElementById("editor-fixed-header")||document.getElementById("scriptora-global-header")||document.querySelector('header[data-global-header="true"]'),be=te&&!te.classList.contains("hidden")?te.getBoundingClientRect().bottom:d+56,W=document.getElementById("scriptora-global-nav")||document.getElementById("scriptora-bottom-nav")||document.querySelector('nav[data-global-bottom-nav="true"]'),Ee=W&&!W.classList.contains("hidden")?W.getBoundingClientRect().top:d+p;g=Math.max(g,be+4),h=Math.min(h,Ee-4)}const b=t.offsetWidth||200,y=t.offsetHeight||160,P=h-i.bottom-o,S=i.top-g-o;let N=!1;n.startsWith("top")?N=S>=y||S>P:n.startsWith("bottom")?N=P<y&&S>P:l==="top"?N=S>=y||S>P:N=P<y&&S>P;let E,j;N?(j=Math.max(90,Math.min(y,S)),E=i.top-j-o):(j=Math.max(90,Math.min(y,P)),E=i.bottom+o),E=Math.max(g,Math.min(h-j,E));let T;return n.endsWith("end")||i.left+b>f-a?T=i.right-b:T=i.left,T=Math.max(c+a,Math.min(c+f-b-a,T)),{top:Math.round(E),left:Math.round(T),maxHeight:Math.round(j),width:Math.min(b,f-2*a),placement:N?"top":"bottom"}}function Es(e,t,s={}){if(!e||!t)return;const n=!!e.closest(".scriptora-modal-overlay");if(s.portal!==!1){const l=n?ea():document.body;t.parentElement!==l&&l.appendChild(t)}const o=t.classList.contains("hidden");o&&(t.style.visibility="hidden",t.classList.remove("hidden")),t.style.position="fixed",t.style.zIndex=s.zIndex||(n?"10000":"120");const a=Po(e,t,s);a&&(t.style.top=`${a.top}px`,t.style.left=`${a.left}px`,t.style.maxHeight=`${a.maxHeight}px`,t.style.overflowY="auto"),o&&(t.style.visibility="")}function sa(e,t,s={}){if(!e||!t)return;t.classList.add("scriptora-popup"),t.setAttribute("data-scriptora-popup","true");const n=()=>{t.classList.contains("hidden")||Es(e,t,s)},o=()=>{t.classList.remove("hidden"),Es(e,t,s)},a=()=>{t.classList.add("hidden")},l=()=>{t.classList.contains("hidden")?o():a()},i=r=>{t.classList.contains("hidden")||!e.contains(r.target)&&!t.contains(r.target)&&a()};return document.addEventListener("click",i),window.addEventListener("scroll",n,{passive:!0,capture:!0}),window.addEventListener("resize",n,{passive:!0}),window.visualViewport&&(window.visualViewport.addEventListener("resize",n,{passive:!0}),window.visualViewport.addEventListener("scroll",n,{passive:!0})),{open:o,close:a,toggle:l,update:n}}if(typeof document<"u"){document.addEventListener("click",t=>{t.target&&t.target.classList&&t.target.classList.contains("scriptora-modal-overlay")&&Be(t.target)}),document.addEventListener("keydown",t=>{if(t.key==="Escape"){const s=Array.from(document.querySelectorAll("#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)"));s.length>0&&Be(s[s.length-1])}});const e=()=>{new MutationObserver(s=>{for(const n of s)if(n.type==="attributes"&&n.attributeName==="class"){const o=n.target;o&&o.classList&&o.classList.contains("scriptora-modal-overlay")&&(o.classList.contains("hidden")||ta(o),Rs())}}).observe(document.body,{attributes:!0,attributeFilter:["class"],subtree:!0})};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}function Lo(e){if(!e)return"";try{const t=localStorage.getItem(`scriptora_screenplay_${e.id}`);if(t){const s=JSON.parse(t);if(s&&Array.isArray(s.scenes)&&s.scenes.length>0){const n=parseInt((e.currentScene||"").replace(/\D+/g,""),10)||1,o=s.scenes.find(a=>a.number===n)||s.scenes[0];if(o&&Array.isArray(o.blocks)){const a=o.blocks.find(r=>r.type==="action")||o.blocks[0],l=o.slugline||o.blocks.find(r=>r.type==="scene")?.content||"",i=a?.content||"";if(l&&i)return`"${l} - ${i.slice(0,95)}..."`;if(i)return`"${i.slice(0,110)}..."`}}}}catch{}return e.id==="chronicles-of-dust"?'"INT. CUSTOMS OFFICE - NIGHT - Kevin kneels over cracked hydro-sensor junction box, static..."':e.id==="the-neon-horizon"?'"EXT. SECTOR 4 SKYLINE - DUSK - Rain reflects neon advertisements across towering glass spires..."':e.id==="velvet-shadows"?'"INT. DETECTIVE OFFICE - RAINY NIGHT - A single desk lamp casts long shadows across unread case files..."':e.id==="silent-echoes"?'"INT. ARCHIVE CELLAR - DAY - Dust motes dance in the amber light filtering through frosted glass..."':e.logline?`"${e.logline.slice(0,110)}..."`:"Empty script — start writing your story."}function Do(){const e=B.state.scripts||[],t=e.length>0,s=t&&e.find(a=>a&&a.isCurrentDraft)||null,n=parseInt((s?.currentScene||"").replace(/\D+/g,""),10)||1,o=s?.currentScene||`Scene ${n}`;return`
    ${ct("Workspace","Your writing space.")}

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
                ${Lo(s)}
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

    ${ot("workspace")}
  `}function Ro(e){let t=null;const s=document.getElementById("btn-continue-writing");s&&(s.onclick=async()=>{const g=s.getAttribute("data-script-id"),h=s.getAttribute("data-scene")||"1";await B.selectScript(g),e(`/editor/${g}?scene=${h}`)}),document.querySelectorAll(".script-item-row").forEach(g=>{g.onclick=async h=>{if(h.target.closest(".script-more-btn"))return;const b=g.getAttribute("data-script-id");await B.selectScript(b),e(`/editor/${b}`)}});const n=document.getElementById("screenplay-search");n&&(n.oninput=g=>{const h=g.target.value.toLowerCase().trim();document.querySelectorAll("#screenplays-library-list .script-item-row").forEach(y=>{const P=y.querySelector(".font-semibold")?.textContent.toLowerCase()||"";y.style.display=P.includes(h)?"flex":"none"})});const o=document.getElementById("btn-new-screenplay-card"),a=document.getElementById("btn-new-script"),l=document.getElementById("new-script-modal"),i=document.getElementById("close-new-script-modal"),r=document.getElementById("cancel-new-script-btn"),f=document.getElementById("form-new-script");function p(g){l&&(g?(pt(l),document.getElementById("new-script-title")?.focus()):Be(l))}o&&(o.onclick=()=>p(!0)),a&&(a.onclick=()=>p(!0)),i&&(i.onclick=()=>p(!1)),r&&(r.onclick=()=>p(!1)),l&&(l.onclick=g=>{g.target===l&&p(!1)}),f&&(f.onsubmit=async g=>{g.preventDefault();const h=document.getElementById("new-script-title").value.trim(),b=document.getElementById("new-script-format").value,y=document.getElementById("new-script-genre").value;if(h)try{const P=await Oa({title:h,format:b,genre:y});await B.refreshScripts(),await B.selectScript(P.id),p(!1),w(`Created "${P.title}"`),e(`/editor/${P.id}`)}catch(P){w(P.message,"error")}});const d=document.getElementById("script-menu-popover");let c=null;document.querySelectorAll(".script-more-btn").forEach(g=>{g.onclick=h=>{h.stopPropagation(),t=g.getAttribute("data-script-id"),c=g,Es(g,d,{placement:"bottom-end",offset:4}),d.classList.remove("hidden")}}),window.addEventListener("scroll",()=>{c&&d&&!d.classList.contains("hidden")&&Es(c,d,{placement:"bottom-end",offset:4})},{passive:!0}),window.onclick=g=>{!g.target.closest("#script-menu-popover")&&!g.target.closest(".script-more-btn")&&(d?.classList.add("hidden"),c=null)},document.getElementById("menu-opt-open")?.addEventListener("click",()=>{d.classList.add("hidden"),t&&(B.selectScript(t),e(`/editor/${t}`))}),document.getElementById("menu-opt-rename")?.addEventListener("click",async()=>{d.classList.add("hidden");const g=prompt("Enter new title for this screenplay:");g&&g.trim()&&(await Fa(t,{title:g.trim()}),await B.refreshScripts(),w("Screenplay renamed"),e("/workspace"))}),document.getElementById("menu-opt-duplicate")?.addEventListener("click",async()=>{d.classList.add("hidden"),await Ha(t),await B.refreshScripts(),w("Screenplay duplicated"),e("/workspace")}),document.getElementById("menu-opt-archive")?.addEventListener("click",async()=>{d.classList.add("hidden"),await Ua(t),await B.refreshScripts(),w("Screenplay archived"),e("/workspace")}),document.getElementById("menu-opt-delete")?.addEventListener("click",async()=>{d.classList.add("hidden"),confirm("Are you sure you want to delete this screenplay? This action cannot be undone.")&&(await _a(t),await B.refreshScripts(),w("Screenplay deleted"),e("/workspace"))});const m=document.getElementById("btn-export-library");m&&(m.onclick=()=>{const g="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(B.state.scripts,null,2)),h=document.createElement("a");h.setAttribute("href",g),h.setAttribute("download",`scriptora_library_${Date.now()}.json`),document.body.appendChild(h),h.click(),h.remove(),w("Exported library manifest (.json)")})}const Mo=new Set(["HE","SHE","IT","ITS","HIM","HER","HERS","HIS","THEY","THEM","THEIR","THEIRS","WE","US","OUR","OURS","YOU","YOUR","YOURS","ME","MY","MINE","I","WHO","WHOM","WHOSE","WHAT","WHICH","WHEN","WHERE","WHY","HOW","AND","OR","BUT","IF","SO","FOR","NOR","YET","BECAUSE","AS","AT","BY","FROM","IN","INTO","OF","OFF","ON","ONTO","OUT","OVER","TO","UP","WITH","THE","A","AN","THIS","THAT","THESE","THOSE","YES","NO","NOT","OK","NOW","THEN","HERE","THERE","SH","SA","AR","ARA","SAN","SANT","SANTH","SANTHO","SO"]);function rs(e){if(!e||typeof e!="string")return"";let t=e.replace(/\([^)]*\)/g,"").replace(/&(?:amp;)*nbsp;?/gi," ").replace(/[\u200B\u00A0]/g," ").replace(/[^a-zA-Z0-9\s'-]/g,"").trim().toUpperCase();return t==="ARAF"&&(t="ARAVIND"),t}function tn(e){if(!e||typeof e!="string")return!1;const t=rs(e);return!(!t||t.length<3||Mo.has(t)||/\b(INT|EXT|SCENE|DAY|NIGHT|MORNING|EVENING|DUSK|DAWN|CUT TO|FADE|TRANSITION)\b/i.test(t)||t.split(/\s+/).length>3||t.length>30)}function na(e){if(!Array.isArray(e))return[];const t=[],s=new Set;return e.forEach(o=>{const a=typeof o=="string"?o:o?.name||o?.content||"",l=rs(a);tn(l)&&(s.has(l)||(s.add(l),t.push(l)))}),t.filter(o=>!(t.some(i=>i!==o&&i.startsWith(o)&&i.length>o.length)||t.some(i=>i!==o&&i.length>=5&&o.length<=4&&i.startsWith(o.slice(0,3)))))}let F=null,Ge=null,sn=null,Ns=!1,We=!1,Ot=!0,$t=!1,Ws="EN",vt=[],jt=-1,Ks=null,Js=null,cn=null,He=localStorage.getItem("scriptora_autosave")!=="false",ks="screenplay",ns=!1;const ze=[],Rn=["CUT TO:","CUT TO BLACK.","FADE IN:","FADE OUT.","FADE TO BLACK.","DISSOLVE TO:","MATCH CUT TO:","JUMP CUT TO:","SMASH CUT TO:","SLAM TO:","SLAM TO BLACK.","INTERCUT WITH:","WIPE TO:","IRIS IN:","IRIS OUT:","BACK TO:","CONTINUOUS","END"];let Mn=0;const bs=[];function it(e){if(e==null)return"";typeof e!="string"&&(e=String(e));let t=e;t=t.replace(/&(?:amp;)+nbsp;?/gi,"&nbsp;"),t=t.replace(/&#(?:160|xA0);/gi," ");let s;do s=t,t=t.replace(/(?:<br\s*\/?>|&nbsp;?|\u00A0|\s)+$/gi,"");while(t!==s);return t=t.replace(/(?:&nbsp;?|\u00A0)+/gi," "),t}function as(e){return e?(e.innerText||e.textContent||"").replace(/&(?:amp;)*nbsp;?/gi,"").replace(/[\u200B\u00A0\r\n\t ]/g,"").trim().length===0:!0}function Oo(){return window.innerWidth<=768||"ontouchstart"in window||navigator.maxTouchPoints&&navigator.maxTouchPoints>0||/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}function aa(e,t){const s=Date.now();if(s-Mn<150)return!0;if(!Oo())return!1;const n=e.getAttribute("data-block-type")||"action";if(!["action","text","character","transition"].includes(n)||!as(t))return!1;let o="action";return n==="action"||n==="text"?o="character":n==="character"?o="transition":n==="transition"&&(o="action"),Mn=s,bs.push({blockId:e.getAttribute("data-block-id"),prevType:n,newType:o}),t.innerText="",Is(e,o),Fs(o),We=!0,He&&rt(),!0}const oa=46;function jo(e,t=null){const s=B.state.scripts?.find(a=>a.id===e)||B.state.activeScript||{title:"Untitled Screenplay",draft:"Draft 1.0"};B.state.currentUser?.initials;let n=null;if(window.scriptoraRouter){const a=window.scriptoraRouter.peekPreviousRoute?.();a&&(n=window.scriptoraRouter.getRouteLabel(a))}const o=n||"Workspace";return`
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
              <button id="btn-toggle-autosave" class="flex items-center gap-1.5 pl-1.5 pr-2.5 h-full hover:bg-slate-50 active:scale-95 transition-all text-xs font-medium text-slate-700 hover:text-slate-900" title="Toggle Auto-save (Current: ${He?"ON":"OFF"})">
                <span class="w-1.5 h-1.5 rounded-full ${He?"bg-emerald-500 animate-pulse":"bg-slate-400"}" id="autosave-dot"></span>
                <span id="autosave-toggle-label">${He?"Auto":"Off"}</span>
              </button>
            </div>

            <!-- Master Toolbar Visibility Toggle [⋮] -->
            <button id="btn-toggle-editor-toolbar" class="w-7 h-7 flex items-center justify-center ${ns?"text-blue-600 bg-blue-50 border-blue-200/90":"text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50"} rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0" title="${ns?"Collapse Editor Toolbars (Writing Mode)":"Expand Editor Toolbars (Tools & Formatting)"}" aria-label="Toggle Editor Toolbars">
              <span class="material-symbols-outlined text-[18px]">more_vert</span>
            </button>

            <!-- Collaborate Link -->
            <a href="/profile/collaborators?from=editor&scriptId=${e}" id="editor-collab-btn" aria-label="Collaborators" class="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors no-underline" title="Collaborators">
              <span class="material-symbols-outlined text-[19px]">group</span>
            </a>
          </div>
        </div>

        <!-- COLLAPSIBLE SECONDARY TOOLBAR ROWS (Master Visibility via Header [⋮]) -->
        <div id="editor-collapsible-toolbars" class="${ns?"":"hidden"} w-full transition-all duration-200">
          
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
  `}function Tt({id:e,name:t,close:s,restore:n}){try{window.history.pushState({editorSubViewId:e,editorSubViewName:t},"")}catch{}ze.push({id:e,name:t,close:s,restore:n})}function Ie(e){const t=ze.findIndex(s=>s.id===e);if(t!==-1){if(t===ze.length-1){const s=ze.pop();s&&typeof s.close=="function"&&s.close();const n=ze[ze.length-1];n&&typeof n.restore=="function"&&n.restore()}else{const s=ze.splice(t,1)[0];s&&typeof s.close=="function"&&s.close()}try{window.history.back()}catch{}}}function Fo(){if(ks==="titlepage")return ys(),!0;if(ze.length>0){const e=ze.pop();e&&typeof e.close=="function"&&e.close();const t=ze[ze.length-1];return t&&typeof t.restore=="function"&&t.restore(),!0}return!1}async function _o(e,t){ze.length=0;const s=()=>ks==="titlepage"?(ys(),!0):ze.length>0?Fo():(We&&ss(!1),!1);window.__scriptoraEditorPopstate=()=>s(),window.scriptoraRouter&&window.scriptoraRouter.registerBackHandler(s);const n=document.getElementById("editor-back-btn");n&&(n.onclick=i=>{i?.preventDefault(),i?.stopPropagation(),window.scriptoraRouter?window.scriptoraRouter.back("/workspace"):s()||t("/workspace")}),F=await qa(e),F?.scenes&&F.scenes.forEach(i=>{i.blocks&&i.blocks.forEach(r=>{r.content&&(r.content=it(r.content)),r.char1&&(r.char1=it(r.char1)),r.dia1&&(r.dia1=it(r.dia1)),r.char2&&(r.char2=it(r.char2)),r.dia2&&(r.dia2=it(r.dia2))})}),e!=="chronicles-of-dust"&&F&&(F.scenes||[]).some(r=>{const f=(r.slugline||"").toUpperCase();return f.includes("WRITER'S ROOM")||f.includes("STUDIO - DAY")||f.includes("NEW SCENE - DAY")?!0:(r.blocks||[]).some(p=>{const d=p.content||"";return d.includes("Sunlight cuts through dust motes")||d.includes("A blank script page waits")||d.includes("Type your screenplay action here")})})&&(F.scenes=[{id:"scene-1",number:1,slugline:"",blocks:[{id:`b-${Date.now()}-1`,type:"scene",content:""}]}],F.wordCount=0,js(e,F)),mt(),Cs();const o=document.getElementById("editor-save-btn");o&&(o.onclick=()=>ss(!0)),Uo(),qo();const a=document.getElementById("editor-collab-btn");a&&(a.onclick=i=>{i.preventDefault(),We&&ss(!1),B.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile/collaborators?from=editor&scriptId=${e}`)});const l=document.getElementById("editor-profile-btn");l&&(l.onclick=i=>{i.preventDefault(),We&&ss(!1),B.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile?from=editor&scriptId=${e}`)}),window.addEventListener("keydown",Ho),ol(e,t),tl(),sl(),al(),zo(),Go(),ll(),il(e),Zo()}function Ho(e){(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"&&(e.preventDefault(),ss(!0)),(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="f"&&(e.preventDefault(),Ms(!0)),(e.ctrlKey||e.metaKey)&&e.key==="Enter"&&(e.preventDefault(),dn())}function Uo(){const e=document.getElementById("btn-toggle-autosave"),t=document.getElementById("autosave-dot"),s=document.getElementById("autosave-toggle-label");e&&(e.onclick=n=>{n.stopPropagation(),He=!He,localStorage.setItem("scriptora_autosave",String(He)),He?(t&&(t.className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"),s&&(s.textContent="Auto"),e.title="Toggle Auto-save (Current: ON)",w("Auto-save enabled"),We&&rt()):(t&&(t.className="w-1.5 h-1.5 rounded-full bg-slate-400"),s&&(s.textContent="Off"),e.title="Toggle Auto-save (Current: OFF)",clearTimeout(sn),w("Auto-save disabled · Tap floppy to save"))})}function hs(){const e=document.getElementById("editor-main-scroll");e&&(e.style.paddingTop="12px",e.style.paddingBottom=$t?"32px":"88px")}function qo(){const e=document.getElementById("btn-toggle-editor-toolbar"),t=document.getElementById("editor-collapsible-toolbars");hs(),window.addEventListener("resize",hs),e&&(e.onclick=s=>{s.preventDefault(),s.stopPropagation(),ns=!ns,ns?(t&&t.classList.remove("hidden"),e.className="w-7 h-7 flex items-center justify-center text-blue-600 bg-blue-50 border-blue-200/90 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Collapse Editor Toolbars (Writing Mode)"):(t&&t.classList.add("hidden"),e.className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Expand Editor Toolbars (Tools & Formatting)"),hs()})}function ys(){if(ks==="titlepage"){Ls("screenplay");try{window.history.state?.editorTab==="titlepage"&&window.history.back()}catch{}}}function zo(){const e=document.getElementById("doc-tab-screenplay"),t=document.getElementById("doc-tab-titlepage"),s=document.getElementById("btn-quick-title-page"),n=document.getElementById("menu-btn-title-page"),o=document.getElementById("doc-tab-titlepage-close"),a=document.getElementById("btn-close-titlepage-sheet");e&&(e.onclick=()=>ys()),t&&(t.onclick=l=>{l.preventDefault(),Ls("titlepage")}),o&&(o.onclick=l=>{l.preventDefault(),l.stopPropagation(),ys()}),a&&(a.onclick=l=>{l.preventDefault(),l.stopPropagation(),ys()}),s&&(s.onclick=()=>Ls("titlepage")),n&&(n.onclick=()=>{Ie("moreMenu"),Ls("titlepage")})}function Ls(e){if(ks===e)return;ks=e;const t=document.getElementById("screenplay-pages-container"),s=document.getElementById("title-page-container"),n=document.getElementById("doc-tab-screenplay"),o=document.getElementById("doc-tab-titlepage-wrap");if(e==="titlepage"){t&&t.classList.add("hidden"),s&&(s.classList.remove("hidden"),s.classList.add("flex")),o&&(o.className="flex items-center rounded-t-lg transition-all border-b-2 border-blue-600 bg-white text-blue-700 shadow-2xs group"),n&&(n.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 rounded-t-lg transition-all"),Vo();try{window.history.state?.editorTab!=="titlepage"&&window.history.pushState({editorTab:"titlepage"},"")}catch{}}else s&&(s.classList.add("hidden"),s.classList.remove("flex")),t&&t.classList.remove("hidden"),n&&(n.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-blue-600 text-blue-700 bg-white rounded-t-lg transition-all shadow-2xs"),o&&(o.className="flex items-center rounded-t-lg transition-all border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 group");hs()}function Vo(){if(!F)return;const e=F.titlePage||{},t=document.getElementById("tp-doc-title"),s=document.getElementById("tp-doc-by"),n=document.getElementById("tp-doc-author"),o=document.getElementById("tp-doc-phone"),a=document.getElementById("tp-doc-email"),l=document.getElementById("tp-doc-address"),i=e.title||F.title||"";t&&(t.innerText=i,i||(t.innerHTML=""));const r=e.by!==void 0?e.by:"Written by";s&&(s.innerText=r,r||(s.innerHTML=""));const f=e.author||"";n&&(n.innerText=f,f||(n.innerHTML=""));let p=e.phone||"";if(!p&&e.contact){const g=e.contact.split("·").map(h=>h.trim()).find(h=>h.includes("+")||/\d{3}/.test(h));g&&(p=g)}o&&(o.innerText=p,p||(o.innerHTML=""));let d=e.email||"";if(!d&&e.contact&&e.contact.includes("@")){const m=e.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);m&&(d=m[0])}a&&(a.innerText=d,d||(a.innerHTML=""));const c=e.address||"";l&&(l.innerText=c,c||(l.innerHTML=""))}function Go(){const e=document.getElementById("tp-doc-title"),t=document.getElementById("tp-doc-by"),s=document.getElementById("tp-doc-author"),n=document.getElementById("tp-doc-phone"),o=document.getElementById("tp-doc-email"),a=document.getElementById("tp-doc-address"),l=()=>{if(!F)return;F.titlePage||(F.titlePage={});const i=e?e.innerText.trim():"",r=t?t.innerText.trim():"",f=s?s.innerText.trim():"",p=n?n.innerText.trim():"",d=o?o.innerText.trim():"",c=a?a.innerText.trim():"";if(F.titlePage.title=i,F.titlePage.by=r||"Written by",F.titlePage.author=f,F.titlePage.phone=p,F.titlePage.email=d,F.titlePage.address=c,F.titlePage.contact=[p,d,c].filter(Boolean).join(" · "),i){F.title=i;const m=document.getElementById("editor-script-title"),g=document.getElementById("doc-tab-title-label");m&&(m.textContent=i),g&&(g.textContent=i)}We=!0,os("Unsaved"),He&&rt()};[e,t,s,n,o,a].forEach(i=>{i&&(i.oninput=l,i.onblur=()=>{i.innerText.trim()===""&&(i.innerHTML=""),l()})})}function mt(){const e=document.getElementById("screenplay-pages-container");if(!e||!F)return;const t=F.scenes||[],s=[];t.forEach(l=>{(l.blocks||[]).forEach(i=>{s.push({block:i,sceneNumber:l.number,sceneId:l.id,slugline:l.slugline})})});const n=[];let o={pageNumber:1,items:[]},a=0;s.forEach(l=>{if(l.block.type==="pagebreak"){o.items.push(l),n.push(o),o={pageNumber:n.length+1,items:[]},a=0;return}const i=la(l.block);a+i>oa&&o.items.length>0&&(n.push(o),o={pageNumber:n.length+1,items:[]},a=0),o.items.push(l),a+=i}),o.items.length>0&&n.push(o),n.length===0&&n.push({pageNumber:1,items:[{block:{id:`b-${Date.now()}-1`,type:"scene",content:""},sceneNumber:1,sceneId:"scene-1",slugline:""}]}),e.innerHTML=n.map(l=>`
    <div class="screenplay-page-sheet w-full max-w-[816px] min-h-[1123px] bg-white rounded-md sm:rounded-lg shadow-md border border-slate-200/90 flex flex-col font-courier text-[12pt] leading-[1.25] text-slate-900 relative transition-all" data-page-num="${l.pageNumber}">
      
      <!-- Top Page Header: Page number in top right -->
      <div class="w-full flex items-center justify-end h-7 pb-2 select-none text-[12pt] text-slate-600 font-courier">
        <span>${l.pageNumber}.</span>
      </div>

      <!-- Screenplay Blocks naturally flowing across this A4 page -->
      <div class="page-blocks-wrapper flex flex-col flex-1 w-full">
        ${l.items.map(i=>ca(i.block,i.sceneNumber,i.sceneId)).join("")}
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
  `).join(""),Ko(),_s()}function la(e){if(e.type==="pagebreak")return 1;const t=e.content||"";return e.type==="scene"?3:e.type==="action"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="character"?2:e.type==="parenthetical"?1:e.type==="dialogue"?Math.max(1,Math.ceil(t.length/38))+1:e.type==="transition"||e.type==="shot"?2:e.type==="text"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="note"||e.type==="outline"?2:e.type==="act"||e.type==="endact"?3:e.type==="sequence"?2:e.type==="dual"?4:e.type==="lyrics"?2:e.type==="image"?10:2}function On(e){let t=!1;(F.scenes||[]).forEach(s=>{const n=(s.blocks||[]).findIndex(o=>o.id===e);n!==-1&&(s.blocks.splice(n,1),t=!0)}),t&&(We=!0,mt(),w("Page break removed"),He&&rt())}function dn(e=null){const t=e||Ge,s=F.scenes||[];if(s.length===0)return;const n={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"};let o=!1;if(t)for(let a of s){const l=(a.blocks||[]).findIndex(i=>i.id===t);if(l!==-1){a.blocks.splice(l+1,0,n),o=!0;break}}if(!o){const a=s[s.length-1];a.blocks||(a.blocks=[]),a.blocks.push(n)}We=!0,mt(),w("Page break inserted"),He&&rt()}function ia(e=null){const t=e||Ge,s=F.scenes||[];if(s.length===0){pn();return}const n={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},o={id:"b-"+Date.now(),type:"action",content:""};let a=null,l=-1;if(t)for(let i of s){const r=(i.blocks||[]).findIndex(f=>f.id===t);if(r!==-1){a=i,l=r+1;break}}a||(a=s[s.length-1],l=a.blocks.length),a.blocks.splice(l,0,n,o),We=!0,mt(),setTimeout(()=>{const i=document.getElementById(o.id);if(i){const r=i.hasAttribute("contenteditable")?i:i.querySelector('[contenteditable="true"]');r&&r.focus(),i.scrollIntoView({behavior:"smooth",block:"center"})}},50),w("New page inserted"),He&&rt()}function Wo(e){const t=document.querySelector(`.screenplay-page-sheet[data-page-num="${e}"]`);let s=null;if(t){const n=t.querySelectorAll(".screenplay-block");n.length>0&&(s=n[n.length-1].getAttribute("data-block-id"))}ia(s)}function pn(){const e=F.scenes||[],t=e.length+1,s={id:"scene-"+Date.now(),number:t,slugline:`INT. SCENE ${t} - DAY`,blocks:[{id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},{id:"b-"+Date.now()+"-1",type:"scene",content:`INT. SCENE ${t} - DAY`},{id:"b-"+Date.now()+"-2",type:"action",content:""}]};e.push(s),We=!0,mt(),setTimeout(()=>{const o=document.getElementById(s.blocks[1].id);if(o){const a=o.hasAttribute("contenteditable")?o:o.querySelector('[contenteditable="true"]');a&&a.focus(),o.scrollIntoView({behavior:"smooth",block:"center"})}},80);const n=document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)").length||1;w(`Added Page at End (Page ${n})`),He&&rt()}function ra(e=null){let t=e;if(!t&&Ge){const p=document.getElementById(Ge),d=p?p.closest(".screenplay-page-sheet"):null;d&&(t=parseInt(d.getAttribute("data-page-num"),10))}t||(t=1);const s=F.scenes||[];if(s.length===0){pn();return}if(t<=1){const p={id:"scene-"+Date.now(),number:1,slugline:"INT. SCENE 1 - DAY",blocks:[{id:"b-"+Date.now()+"-1",type:"scene",content:"INT. SCENE 1 - DAY"},{id:"b-"+Date.now()+"-2",type:"action",content:""},{id:"pb-"+Date.now()+"-3",type:"pagebreak",content:"PAGE BREAK"}]};s.unshift(p),s.forEach((d,c)=>{d.number=c+1}),We=!0,mt(),Cs(),setTimeout(()=>{const d=document.getElementById(p.blocks[0].id);if(d){const c=d.hasAttribute("contenteditable")?d:d.querySelector('[contenteditable="true"]');c&&c.focus(),d.scrollIntoView({behavior:"smooth",block:"center"})}},80),w("Added Page Before (Page 1)"),He&&rt();return}const n=document.querySelector(`.screenplay-page-sheet[data-page-num="${t}"]`);let o=null;if(n){const p=n.querySelector(".screenplay-block");p&&(o=p.getAttribute("data-block-id"))}let a=null,l=-1;if(o)for(let p of s){const d=(p.blocks||[]).findIndex(c=>c.id===o);if(d!==-1){a=p,l=d;break}}a||(a=s[0],l=0);const i={id:"pb-"+Date.now()+"-a",type:"pagebreak",content:"PAGE BREAK"},r={id:"b-"+Date.now()+"-b",type:"action",content:""},f={id:"pb-"+Date.now()+"-c",type:"pagebreak",content:"PAGE BREAK"};a.blocks.splice(l,0,i,r,f),We=!0,mt(),setTimeout(()=>{const p=document.getElementById(r.id);if(p){const d=p.hasAttribute("contenteditable")?p:p.querySelector('[contenteditable="true"]');d&&d.focus(),p.scrollIntoView({behavior:"smooth",block:"center"})}},80),w(`Added Page Before (Page ${t})`),He&&rt()}function ca(e,t,s){const n=e.type==="pagebreak",o=e.type==="scene",a=e.type==="character",l=e.type==="parenthetical",i=e.type==="dialogue",r=e.type==="transition",f=e.type==="shot",p=e.type==="text",d=e.type==="note",c=e.type==="outline",m=e.type==="act",g=e.type==="endact",h=e.type==="sequence",b=e.type==="dual",y=e.type==="lyrics",P=e.type==="image",S=e.type==="action"||!n&&!o&&!a&&!l&&!i&&!r&&!f&&!p&&!d&&!c&&!m&&!g&&!h&&!b&&!y&&!P;if(n)return`
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
        <span class="scene-num-indicator -ml-10 w-7 mr-3 shrink-0 font-mono text-slate-400 font-bold select-none text-[12pt] text-right ${Ot?"":"hidden"}">${t}</span>
        <div class="flex-1 tracking-wider uppercase outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${tt(e.content)}</div>
      </div>
    `;if(S)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${tt(e.content)}</div>
    `;if(a)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="character" class="screenplay-block uppercase font-bold tracking-wider text-slate-900 text-left mt-3.5 mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[37%] max-w-[28ch]" contenteditable="true" spellcheck="false">${tt(e.content)}</div>
    `;if(l)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="parenthetical" class="screenplay-block italic text-slate-600 text-left mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[26%] max-w-[24ch]" contenteditable="true" spellcheck="false">${tt(e.content)}</div>
    `;if(i)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dialogue" class="screenplay-block text-left text-slate-900 mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[17%] max-w-[36ch]" contenteditable="true" spellcheck="false">${tt(e.content)}</div>
    `;if(r)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="transition" class="screenplay-block w-full text-right uppercase font-bold tracking-wider text-slate-900 mt-2 mb-4 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${tt(e.content)}</div>
    `;if(f)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="shot" class="screenplay-block uppercase font-bold tracking-wider text-slate-900 text-left my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${tt(e.content||"CLOSE ON:")}</div>
    `;if(p)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="text" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${tt(e.content)}</div>
    `;if(d)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="note" class="screenplay-block text-amber-900 bg-amber-50/80 border-l-4 border-amber-400 p-2 my-2.5 rounded-r font-mono text-xs outline-none focus:ring-1 focus:ring-amber-400 cursor-text select-text" contenteditable="true" spellcheck="false">${tt(e.content||"[[ NOTE: Script comment... ]]")}</div>
    `;if(c)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="outline" class="screenplay-block text-slate-500 uppercase tracking-widest font-sans font-bold text-xs my-2 border-b border-slate-200 pb-1 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${tt(e.content||"OUTLINE BEAT")}</div>
    `;if(m)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="act" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-base outline-none focus:bg-blue-50/50 rounded px-1 cursor-text underline decoration-2 underline-offset-4" contenteditable="true" spellcheck="false">${tt(e.content||"ACT I")}</div>
    `;if(g)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="endact" class="screenplay-block text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${tt(e.content||"END OF ACT I")}</div>
    `;if(h)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="sequence" class="screenplay-block uppercase font-bold tracking-wide text-slate-800 my-3 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${tt(e.content||"SEQUENCE 1")}</div>
    `;if(b)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dual" class="screenplay-block screenplay-dual-dialogue-grid">
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${tt(e.char1||"CHARACTER A")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${tt(e.dia1||"Dialogue A")}</div>
        </div>
        <div class="flex flex-col">
          <div class="text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${tt(e.char2||"CHARACTER B")}</div>
          <div class="text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1" contenteditable="true" spellcheck="false">${tt(e.dia2||"Dialogue B")}</div>
        </div>
      </div>
    `;if(y)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="lyrics" class="screenplay-block text-center italic text-slate-800 my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${tt(e.content||"♫ Musical lyrics... ♫")}</div>
    `;if(P){const N=e.url||e.content||"https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80",E=nn(e.caption||"");return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="image" class="screenplay-block my-4 flex flex-col items-center group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-2.5 shadow-2xs transition-all">
        <div class="w-full flex items-center justify-center min-h-[180px] max-h-[420px] rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200/60">
          <img src="${N}" alt="${E||"Storyboard"}" class="max-h-[400px] w-auto max-w-full object-contain rounded-md shadow-xs bg-white" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80';" loading="eager" />
        </div>
        <div class="text-[11px] font-sans text-slate-600 italic mt-2 text-center outline-none px-2 py-0.5 rounded focus:bg-white w-full cursor-text" contenteditable="true" data-placeholder="Add a storyboard caption...">${E||"Storyboard visual concept"}</div>
        <button class="btn-delete-img-block absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-md text-xs font-bold" data-block-id="${e.id}" data-scene-id="${s}" title="Delete image">✕</button>
      </div>
    `}return`
    <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true">${tt(e.content)}</div>
  `}function tt(e){if(!e)return"";const t=it(e);if(!t)return"";if(!/<[a-z][\s\S]*>/i.test(t))return nn(t);try{let l=function(i){const r=Array.from(i.childNodes);for(const f of r)if(f.nodeType===Node.ELEMENT_NODE){if(f.tagName==="SPAN"&&(f.style?.textDecoration?.includes("line-through")||f.style?.textDecorationLine?.includes("line-through"))){const d=document.createElement("s");d.innerHTML=f.innerHTML,i.replaceChild(d,f),l(d);continue}if(a.has(f.tagName)){for(;f.attributes.length>0;)f.removeAttribute(f.attributes[0].name);l(f)}else{const p=document.createTextNode(f.textContent||"");i.replaceChild(p,f)}}};var s=l;const o=new DOMParser().parseFromString(`<body>${t}</body>`,"text/html"),a=new Set(["B","STRONG","I","EM","U","S","STRIKE","DEL","BR","SPAN"]);return l(o.body),it(o.body.innerHTML)}catch{return nn(t)}}function nn(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}function vs(e){if(!e||typeof e!="string")return e;let t=e.replace(/^(\s*["'“‘(]*)([a-z\u00E0-\u00FC])/u,(s,n,o)=>n+o.toUpperCase());return t=t.replace(/([.!?]["'”’)]*\s+["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,n,o)=>n+o.toUpperCase()),t=t.replace(/(\n\s*["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,n,o)=>n+o.toUpperCase()),t}function es(e){let t=0;const s=window.getSelection();if(s&&s.rangeCount>0){const n=s.getRangeAt(0),o=n.cloneRange();o.selectNodeContents(e),o.setEnd(n.endContainer,n.endOffset),t=o.toString().length}return t}function ts(e,t){const s=window.getSelection();if(!s)return;const n=document.createRange();if(t<=0){n.selectNodeContents(e),n.collapse(!0),s.removeAllRanges(),s.addRange(n);return}let o=0,a=!1;function l(i){if(!a){if(i.nodeType===Node.TEXT_NODE){const r=i.nodeValue.length;if(o+r>=t){n.setStart(i,Math.min(t-o,r)),n.collapse(!0),a=!0;return}o+=r}else for(let r=0;r<i.childNodes.length;r++)if(l(i.childNodes[r]),a)return}}l(e),a||(n.selectNodeContents(e),n.collapse(!1)),s.removeAllRanges(),s.addRange(n)}function da(e){const t=e.hasAttribute("contenteditable")?e:e.querySelector('[contenteditable="true"]');t&&(t.onfocus=()=>{Ge=e.getAttribute("data-block-id");const s=e.getAttribute("data-block-type")||"action";Fs(s),s==="transition"&&as(t)?ws(e,t):s!=="transition"&&Lt()},t.addEventListener("click",()=>{(e.getAttribute("data-block-type")||"action")==="transition"&&as(t)&&ws(e,t)}),t.addEventListener("beforeinput",s=>{(s.data===" "||s.inputType==="insertText"&&s.data===" ")&&as(t)&&aa(e,t)&&s.preventDefault()}),t.oninput=()=>{We=!0;const s=e.getAttribute("data-block-type")||"action",n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,l=vs(a);if(l!==a){const i=es(t);t.innerText=l,ts(t,i)}}let o=t.innerHTML;o=o.replace(/&(?:amp;)+nbsp;?/gi," "),o=o.replace(/&nbsp;?/gi," "),o=o.replace(/\u00A0/g," "),_t(e,o),os("Unsaved"),He&&rt(),ws(e,t),_s()},t.onblur=()=>{const s=e.getAttribute("data-block-type")||"action",n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,l=vs(a);l!==a&&(t.innerText=l)}const o=it(t.innerHTML);if(t.innerHTML!==o&&(t.innerHTML=o),_t(e,o),s==="character")un(it(t.innerText));else if(s==="scene"){const a=Kt(it(t.innerText));a.location&&mn(a.location)}},t.onpaste=()=>{const s=e.getAttribute("data-block-type")||"action";setTimeout(()=>{const n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,l=vs(a);if(l!==a){const i=es(t);t.innerText=l,ts(t,i)}}const o=it(t.innerHTML);t.innerHTML!==o&&(t.innerHTML=o),_t(e,o)},0)},t.onkeydown=s=>{Jo(s,e,t)})}function Ko(){document.querySelectorAll(".screenplay-block").forEach(da),document.querySelectorAll(".btn-delete-img-block").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=t.getAttribute("data-block-id"),o=t.getAttribute("data-scene-id");n&&o&&gs(o,n)}}),document.querySelectorAll(".btn-remove-pagebreak").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=t.getAttribute("data-block-id");n&&On(n)}}),document.querySelectorAll('[data-block-type="pagebreak"]').forEach(t=>{t.onkeydown=s=>{if(s.key==="Backspace"||s.key==="Delete"){s.preventDefault();const n=t.getAttribute("data-block-id");n&&On(n)}}}),document.querySelectorAll(".btn-page-add-before").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=parseInt(t.getAttribute("data-page-num"),10)||1;ra(n)}}),document.querySelectorAll(".btn-page-add-after").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=parseInt(t.getAttribute("data-page-num"),10)||1;Wo(n)}})}function Kt(e){const t=e.match(/^(INT\.\/EXT\.|INT\.|EXT\.|I\/E\.)\s*/i),s=t?t[1].toUpperCase():"INT.",o=(t?e.slice(t[0].length):e).split(/\s+-\s*|\s+-/),a=(o[0]||"").trim().toUpperCase(),l=(o[1]||"").trim().toUpperCase();return{intExt:s,location:a,time:l}}function un(e){if(!F)return;const t=rs(e);tn(t)&&(Array.isArray(F.characters)||(F.characters=[]),F.characters=F.characters.filter(s=>{const n=rs(s);return!(!tn(n)||t.startsWith(n)&&n.length<t.length||t.length>=5&&n.length<=4&&t.startsWith(n.slice(0,3)))}),F.characters.includes(t)||F.characters.push(t))}function mn(e){if(!F)return;const t=(e||"").trim().toUpperCase();!t||t.length<2||(Array.isArray(F.locations)||(F.locations=[]),F.locations=F.locations.filter(s=>t.startsWith(s)&&s.length<t.length?F.scenes?.some(o=>o.blocks?.some(a=>a.type==="scene"&&Kt(a.content).location===s)):!0),F.locations.includes(t)||F.locations.push(t))}function _t(e,t){if(!F)return;const s=e.getAttribute("data-block-id"),n=e.getAttribute("data-scene-id"),o=F.scenes.find(l=>l.id===n);if(!o)return;const a=o.blocks.find(l=>l.id===s);if(a){const l=it(t);if(a.type==="image"?a.caption=l:a.content=l,a.type==="scene"){const i=(l||"").replace(/<[^>]+>/g,""),r=Kt(i);a.intExt=r.intExt,a.location=r.location,a.time=r.time,o.slugline=i,o.location=r.location,o.time=r.time}}}function gs(e,t){if(!F)return;const s=F.scenes.find(a=>a.id===e);if(!s)return;const n=s.blocks.findIndex(a=>a.id===t);if(n!==-1&&(s.blocks.splice(n,1),We=!0,He&&rt()),s.blocks.length===0&&F.scenes.length>1){const a=F.scenes.findIndex(l=>l.id===e);a!==-1&&(F.scenes.splice(a,1),F.scenes.forEach((l,i)=>{l.number=i+1}),Cs())}else s.blocks.length===0&&s.blocks.push({id:`b-${Date.now().toString().slice(-6)}`,type:"action",content:""});const o=document.getElementById(t);o&&o.remove(),_s()}function Jo(e,t,s){const n=t.getAttribute("data-block-type"),o=t.getAttribute("data-scene-id"),a=t.getAttribute("data-block-id"),l=document.getElementById("editor-autocomplete-dropdown");if(l&&!l.classList.contains("hidden")){if(e.key==="ArrowDown"){e.preventDefault(),jn(1);return}if(e.key==="ArrowUp"){e.preventDefault(),jn(-1);return}if(e.key==="Enter"||e.key==="Tab"){const i=l.querySelector(".autocomplete-item.active");if(i){e.preventDefault(),i.click();return}}if(e.key==="Escape"){Lt();return}}if((e.key===" "||e.code==="Space")&&as(s)&&aa(t,s)){e.preventDefault();return}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"&&!e.shiftKey&&bs.length>0){const i=bs[bs.length-1];if(i.blockId===a&&as(s)){bs.pop(),e.preventDefault(),Is(t,i.prevType);return}}if((e.ctrlKey||e.metaKey)&&!e.altKey){const i=e.key.toLowerCase();if(i==="b"){e.preventDefault(),Ft("bold");return}if(i==="i"){e.preventDefault(),Ft("italic");return}if(i==="u"){e.preventDefault(),Ft("underline");return}}if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&e.key&&e.key.length===1&&(["bold","italic","underline","strikeThrough"].forEach(i=>{if(ut[i]===!0&&!document.queryCommandState(i))try{document.execCommand(i,!1,null)}catch{}else if(ut[i]===!1&&document.queryCommandState(i))try{document.execCommand(i,!1,null)}catch{}}),Object.assign(ut,{bold:null,italic:null,underline:null,strikeThrough:null})),(e.ctrlKey||e.metaKey)&&e.key==="Enter"){e.preventDefault(),dn(a);return}if(e.key==="Backspace"&&!e.ctrlKey&&!e.metaKey){const i=es(s),r=window.getSelection(),f=!r||r.isCollapsed;if(i===0&&f){const p=Array.from(document.querySelectorAll(".screenplay-block")),d=p.indexOf(t);if(d>0){e.preventDefault();const c=p[d-1],m=c.hasAttribute("contenteditable")?c:c.querySelector('[contenteditable="true"]'),g=s.innerText.trim();if(g===""||n==="parenthetical"&&(g==="()"||g==="")){gs(o,a),m&&(m.focus(),Pt(m));return}const h=c.getAttribute("data-block-type");if(m&&(n==="action"&&h==="action"||n==="dialogue"&&h==="dialogue"||n==="text"&&h==="text")){const b=m.innerText.length,y=m.innerText+(m.innerText?" ":"")+s.innerText;m.innerText=y,_t(c,y),gs(o,a),m.focus(),ts(m,b+(m.innerText?1:0));return}if(m){m.focus(),Pt(m);return}}}}if(e.key==="Delete"&&!e.ctrlKey&&!e.metaKey){const i=es(s),r=window.getSelection(),f=!r||r.isCollapsed;if(i>=s.innerText.length&&f){const p=Array.from(document.querySelectorAll(".screenplay-block")),d=p.indexOf(t);if(d<p.length-1){const c=p[d+1],m=c.hasAttribute("contenteditable")?c:c.querySelector('[contenteditable="true"]'),g=c.getAttribute("data-scene-id"),h=c.getAttribute("data-block-id"),b=c.getAttribute("data-block-type"),y=(m?m.innerText:"").trim();if(y===""||b==="parenthetical"&&(y==="()"||y==="")){e.preventDefault(),gs(g,h);return}if(m&&(n==="action"&&b==="action"||n==="dialogue"&&b==="dialogue"||n==="text"&&b==="text")){e.preventDefault();const P=s.innerText.length,S=s.innerText+(s.innerText?" ":"")+m.innerText;s.innerText=S,_t(t,S),gs(g,h),ts(s,P+(s.innerText?1:0));return}if(m){e.preventDefault(),m.focus(),ts(m,0);return}}}}if(e.key==="ArrowLeft"){const i=es(s),r=window.getSelection();if(i===0&&(!r||r.isCollapsed)){const f=Array.from(document.querySelectorAll(".screenplay-block")),p=f.indexOf(t);if(p>0){e.preventDefault();const d=f[p-1],c=d.querySelector('[contenteditable="true"]')||d;c&&(c.focus(),Pt(c))}}}if(e.key==="ArrowRight"){const i=es(s),r=window.getSelection();if(i>=s.innerText.length&&(!r||r.isCollapsed)){const f=Array.from(document.querySelectorAll(".screenplay-block")),p=f.indexOf(t);if(p<f.length-1){e.preventDefault();const d=f[p+1],c=d.querySelector('[contenteditable="true"]')||d;c&&(c.focus(),ts(c,0))}}}if(e.key==="("&&(n==="character"||n==="dialogue")){const i=window.getSelection();if(i&&i.anchorOffset===0&&s.innerText.trim()===""){e.preventDefault(),Is(t,"parenthetical");return}}if(e.key==="Tab"){e.preventDefault(),Lt(),Xo(t,e.shiftKey);return}if(e.key==="Enter"&&!e.shiftKey){if(Lt(),n==="scene"){e.preventDefault();const i=Kt(s.innerText);i.location&&mn(i.location),Mt(o,a,"action");return}if(n==="character"){e.preventDefault(),un(s.innerText),Mt(o,a,"dialogue");return}if(n==="dialogue"){e.preventDefault(),Mt(o,a,"action");return}if(n==="parenthetical"){e.preventDefault();let i=s.innerText.trim();i.endsWith(")")||(i+=")",s.innerText=i,_t(t,i)),Mt(o,a,"dialogue");return}if(n==="transition"){e.preventDefault(),Yo(o,a);return}if(n==="shot"||n==="note"||n==="outline"){e.preventDefault(),Mt(o,a,"action");return}if(n==="act"||n==="endact"||n==="sequence"){e.preventDefault(),Mt(o,a,"scene");return}if(n==="lyrics"){e.preventDefault(),Mt(o,a,"lyrics");return}if(n==="action"||n==="text"){e.preventDefault(),Mt(o,a,n);return}}}function Mt(e,t,s,n){const o=F.scenes.find(p=>p.id===e);if(!o)return;const a=o.blocks.findIndex(p=>p.id===t),l=`b-${Date.now().toString().slice(-6)}`,i={id:l,type:s,content:""};a!==-1?o.blocks.splice(a+1,0,i):o.blocks.push(i);const r=document.getElementById(t),f=r?r.closest(".page-blocks-wrapper"):null;if(r&&f){const p=document.createElement("div");p.innerHTML=ca(i,o.number,o.id);const d=p.firstElementChild;r.insertAdjacentElement("afterend",d),da(d),_s();const c=d.hasAttribute("contenteditable")?d:d.querySelector('[contenteditable="true"]');c&&(c.focus(),Pt(c));const m=f.querySelectorAll(".screenplay-block");let g=0;m.forEach(h=>{const b=h.getAttribute("data-block-type"),y=h.innerText||"";g+=la({type:b,content:y})}),g>oa&&(mt(),setTimeout(()=>{const h=document.getElementById(l);if(h){const b=h.querySelector('[contenteditable="true"]')||h;b.focus(),Pt(b)}},20))}else mt(),setTimeout(()=>{const p=document.getElementById(l);if(p){const d=p.hasAttribute("contenteditable")?p:p.querySelector('[contenteditable="true"]');d&&(d.focus(),Pt(d))}},20)}function Yo(e,t=null){const s=F.scenes.findIndex(r=>r.id===e),n=F.scenes.length+1,o=`scene-${Date.now().toString().slice(-5)}`,a=`b-${Date.now().toString().slice(-6)}`;let l=[];if(t&&s!==-1){const r=F.scenes[s],f=r.blocks?r.blocks.findIndex(p=>p.id===t):-1;f!==-1&&f<r.blocks.length-1&&(l=r.blocks.splice(f+1))}const i={id:o,number:n,actId:F.acts?.[0]?.id||"act-1",slugline:"",blocks:[{id:a,type:"scene",content:""},...l]};s!==-1?F.scenes.splice(s+1,0,i):F.scenes.push(i),F.scenes.forEach((r,f)=>{r.number=f+1}),mt(),Cs(),setTimeout(()=>{const r=document.getElementById(a);if(r){const f=r.querySelector('[contenteditable="true"]');f&&(f.focus(),Pt(f),ws(r,f))}},30)}function Xo(e,t=!1){if(!e)return!1;const s=e.getAttribute("data-block-type")||"action";let n;return t?s==="scene"?n="transition":s==="transition"?n="dialogue":s==="dialogue"?n="character":s==="character"||s==="action"||s==="text"?n="scene":s==="parenthetical"?n="character":n="scene":s==="scene"?n="character":s==="character"?n="dialogue":s==="dialogue"?n="transition":s==="transition"?n="scene":s==="action"||s==="text"?n="character":s==="parenthetical"?n="dialogue":n="character",n?(Is(e,n),!0):!1}function Is(e,t){const s=e.getAttribute("data-block-id"),n=e.getAttribute("data-scene-id"),o=F.scenes.find(l=>l.id===n);if(!o)return;const a=o.blocks.find(l=>l.id===s);if(a){if(a.type=t,(t==="character"||t==="scene"||t==="transition")&&(a.content=a.content.toUpperCase()),(t==="action"||t==="dialogue")&&(a.content=vs(a.content)),t==="parenthetical"){let l=a.content.replace(/^\(+|\)+$/g,"").trim();l?a.content=`(${l})`:a.content="()"}We=!0,He&&rt(),mt(),setTimeout(()=>{const l=document.getElementById(s);if(l){const i=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]');if(i){if(i.focus(),t==="parenthetical"&&i.innerText==="()"){const r=i.firstChild;if(r){const f=document.createRange(),p=window.getSelection();f.setStart(r,1),f.collapse(!0),p.removeAllRanges(),p.addRange(f)}}else Pt(i);Fs(t),t==="transition"?ws(l,i):Lt()}}(t==="scene"||t==="character")&&Cs()},25)}}function Pt(e){const t=document.createRange(),s=window.getSelection();t.selectNodeContents(e),t.collapse(!1),s.removeAllRanges(),s.addRange(t)}function Zo(){document.addEventListener("click",t=>{t.target.closest("#editor-autocomplete-dropdown")||Lt()});const e=()=>{const t=document.getElementById("editor-autocomplete-dropdown");if(t&&!t.classList.contains("hidden")&&Ge){const s=document.getElementById(Ge);if(s){const n=s.querySelector('[contenteditable="true"]')||s;pa(t,n)}}};window.addEventListener("scroll",e,{capture:!0,passive:!0}),document.addEventListener("selectionchange",()=>{const t=document.getElementById("editor-autocomplete-dropdown");t&&!t.classList.contains("hidden")&&e()}),window.visualViewport&&(window.visualViewport.addEventListener("resize",e),window.visualViewport.addEventListener("scroll",e))}function Lt(){const e=document.getElementById("editor-autocomplete-dropdown");e&&e.classList.add("hidden")}function Qo(e){if(!e)return null;const t=window.getSelection();if(t&&t.rangeCount>0)try{const n=t.getRangeAt(0);if(e.contains(n.startContainer)||e===n.startContainer){const o=n.getClientRects();if(o&&o.length>0){const l=o[o.length-1];if(l&&l.height>0&&l.top>0)return{top:l.top,bottom:l.bottom,left:l.left,right:l.right,width:l.width,height:l.height}}const a=n.getBoundingClientRect();if(a&&a.height>0&&a.top>0)return{top:a.top,bottom:a.bottom,left:a.left,right:a.right,width:a.width,height:a.height}}}catch{}const s=e.getBoundingClientRect();return{top:s.top,bottom:s.bottom,left:s.left,right:s.right,width:s.width,height:s.height}}function pa(e,t){if(!e||!t)return;e.parentElement!==document.body&&document.body.appendChild(e);const s=Qo(t);if(!s)return;const n=window.visualViewport,o=n?n.offsetTop:0,a=n?n.offsetLeft:0,l=n?n.height:window.innerHeight,i=n?n.width:window.innerWidth,r=document.getElementById("editor-fixed-header")||document.getElementById("editor-header-nav"),f=r?r.getBoundingClientRect().bottom:o+56;if(s.bottom<f+4||s.top>o+l-16){Lt();return}const p=Math.min(270,i-24);e.style.width=`${p}px`;const d=Math.min(220,e.scrollHeight||180),c=o+l-s.bottom-8,m=s.top-Math.max(f,o)-8;let g,h=d;c<d&&m>c?(h=Math.max(80,Math.min(d,m)),g=s.top-h-6):(h=Math.max(80,Math.min(d,c)),g=s.bottom+6),g=Math.max(Math.max(f,o)+4,Math.min(o+l-h-8,g)),e.style.maxHeight=`${Math.round(h)}px`,e.style.overflowY="auto";const y=t.closest(".screenplay-block"),P=y?y.getAttribute("data-block-type"):null;let S;P==="transition"?S=Math.max(a+12,s.right-p):(S=s.left,S+p>a+i-12&&(S=a+i-p-12),S<a+12&&(S=a+12)),e.style.top=`${Math.round(g)}px`,e.style.left=`${Math.round(S)}px`}function ua(){if(!F)return[];const e=[];return(F.scenes||[]).forEach(t=>{(t.blocks||[]).forEach(s=>{s.type==="character"&&s.content&&e.push(s.content)})}),(F.characters||[]).forEach(t=>{t&&e.push(t)}),na(e)}function el(){if(!F)return[];const e=new Set;(F.scenes||[]).forEach(s=>{(s.blocks||[]).forEach(n=>{if(n.type==="scene"){const o=Kt(n.content);o.location&&o.location.length>=2&&e.add(o.location)}})}),(F.locations||[]).forEach(s=>{const n=(s||"").trim().toUpperCase();n&&n.length>=2&&e.add(n)});const t=Array.from(e);return t.filter(s=>t.some(o=>o!==s&&o.startsWith(s))?F.scenes?.some(a=>a.blocks?.some(l=>l.type==="scene"&&Kt(l.content).location===s)):!0)}function ws(e,t){const s=e.getAttribute("data-block-type"),n=t.innerText,o=document.getElementById("editor-autocomplete-dropdown");if(!o)return;let a=[];if(s==="scene"){const l=n.toUpperCase(),i=n.match(/\s+-\s*([A-Za-z]*)$/);if(i){const r=(i[1]||"").toUpperCase(),p=["DAY","NIGHT","MORNING","EVENING","DAWN","DUSK","CONTINUOUS","LATER"].filter(c=>c.startsWith(r)),d=n.replace(/\s+-\s*[A-Za-z]*$/," - ");a=p.map(c=>({label:c,val:d+c}))}else if(l==="I"||l==="IN")a=["INT.","INT./EXT.","I/E."].map(r=>({label:r,val:r+" "}));else if(l==="E"||l==="EX")a=["EXT.","INT./EXT.","I/E."].map(r=>({label:r,val:r+" "}));else if(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i.test(n)){const r=n.match(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i),f=r[1].toUpperCase()+" ",p=(r[2]||"").trim().toUpperCase();p.length>0&&(a=el().filter(m=>m.startsWith(p)).map(m=>({label:m,val:`${f}${m}`})))}}else if(s==="character"){const l=n.trim().toUpperCase();l.length>0&&(a=ua().filter(f=>f.startsWith(l)).map(f=>({label:f,val:f})))}else if(s==="transition"){const i=(n||"").replace(/[\u200B\u00A0\r\n\t]/g,"").trim().toUpperCase(),r=Array.isArray(F?.transitions)&&F.transitions.length>0?Array.from(new Set([...Rn,...F.transitions])):Rn;if(i.length===0)a=r.map(f=>({label:f,val:f}));else{const f=r.filter(c=>c.toUpperCase().startsWith(i)),p=r.filter(c=>!c.toUpperCase().startsWith(i)&&c.toUpperCase().includes(i));a=[...f,...p].map(c=>({label:c,val:c}))}}if(a.length===0){Lt();return}o.innerHTML=a.map((l,i)=>{const r=typeof l=="object"?l.label:l,f=typeof l=="object"?l.val:l;return`
      <div class="autocomplete-item px-3 py-2 sm:py-1.5 hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-blue-700 cursor-pointer flex items-center justify-between font-mono text-xs border-b border-slate-50 last:border-b-0 ${i===0?"active bg-blue-50/70 text-blue-700 font-semibold":""}" data-val="${f}">
        <span class="tracking-wide">${r}</span>
        <span class="text-[10px] text-slate-400 font-sans hidden sm:inline">Enter ↵</span>
      </div>
    `}).join(""),o.classList.remove("hidden"),pa(o,t),o.querySelectorAll(".autocomplete-item").forEach(l=>{l.addEventListener("pointerdown",i=>{i.preventDefault()}),l.onclick=i=>{i.stopPropagation();const r=l.getAttribute("data-val");if(t.innerText=r,_t(e,r),s==="character")un(r);else if(s==="scene"){const f=Kt(r);f.location&&mn(f.location)}Lt(),Pt(t),We=!0,He&&rt()}})}function jn(e){const t=document.getElementById("editor-autocomplete-dropdown");if(!t)return;const s=t.querySelectorAll(".autocomplete-item");if(s.length===0)return;let n=Array.from(s).findIndex(o=>o.classList.contains("active"));n!==-1&&s[n].classList.remove("active","bg-blue-50/70","text-blue-700","font-semibold"),n=(n+e+s.length)%s.length,s[n].classList.add("active","bg-blue-50/70","text-blue-700","font-semibold"),s[n].scrollIntoView({block:"nearest"})}async function ss(e=!1){if(!(Ns||!F)){Ns=!0,os("Saving..."),F.scenes&&F.scenes.forEach(t=>{t.blocks&&t.blocks.forEach(s=>{s.content&&(s.content=it(s.content),(s.type==="action"||s.type==="dialogue")&&(s.content=vs(s.content))),s.char1&&(s.char1=it(s.char1)),s.dia1&&(s.dia1=it(s.dia1)),s.char2&&(s.char2=it(s.char2)),s.dia2&&(s.dia2=it(s.dia2))})});try{await js(F.id,F),We=!1,Ns=!1,os("Saved"),e&&w("Saved")}catch{Ns=!1,os("Save failed"),w("Couldn't save changes · Tap retry")}}}function rt(){He&&(clearTimeout(sn),sn=setTimeout(async()=>{We&&He&&(await ss(!1),os("Autosaved just now"),w("Autosaved just now"))},1500))}function os(e){const t=document.getElementById("editor-save-status"),s=document.getElementById("editor-save-icon");t&&(t.textContent=e),e==="Saving..."?s&&(s.textContent="progress_activity",s.classList.add("animate-spin")):e==="Saved"||e==="Autosaved just now"||e==="Unsaved"?s&&(s.textContent="save",s.classList.remove("animate-spin")):e==="Save failed"&&s&&(s.textContent="warning",s.classList.remove("animate-spin"))}function Cs(){if(!F)return;const e=document.getElementById("navSceneSelect");if(e){const t=F.scenes||[];e.innerHTML=t.map((s,n)=>`
      <option value="${s.id}" ${n===0?"selected":""}>Scene ${s.number} ▾</option>
    `).join("")||'<option value="">Scene 1 ▾</option>'}}function tl(){const e=document.getElementById("navSceneSelect");e&&(e.onchange=s=>{const n=s.target.value;if(!n)return;Fn(n);const o=F?.scenes?.find(a=>a.id===n);o&&B.setState({currentSceneId:o.number})});let t=null;try{const s=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search,n=new URLSearchParams(s||"");n.get("scene")&&(t=n.get("scene"))}catch{}if(!t&&B.state.currentSceneId&&(t=B.state.currentSceneId),t&&F?.scenes){const s=F.scenes.find(n=>String(n.number)===String(t)||n.id===String(t)||n.id===`scene-${t}`);s&&(e&&(e.value=s.id),setTimeout(()=>Fn(s.id),250))}}function Fn(e){const t=document.querySelector(`[data-scene-id="${e}"][data-block-type="scene"]`)||document.querySelector(`[data-scene-id="${e}"]`);t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.classList.add("bg-blue-50/50"),setTimeout(()=>t.classList.remove("bg-blue-50/50"),1500))}function sl(){const e=document.getElementById("element-bar");e&&e.querySelectorAll(".element-btn").forEach(t=>{t.onclick=s=>{s.preventDefault();const n=t.getAttribute("data-type");nl(n)}})}const ut={bold:null,italic:null,underline:null,strikeThrough:null};let _n=!1;function Bt(e){const t=window.getSelection();if(!t||t.rangeCount===0)return!1;const s=t.anchorNode,n=s?.nodeType===Node.ELEMENT_NODE?s:s?.parentElement;if(!n)return!1;const o=n.closest(".screenplay-block");if(!o)return!1;if(!t.isCollapsed&&t.toString().trim().length>0)try{return document.queryCommandState(e)}catch{return!1}const a=o.getAttribute("data-block-type"),l=a==="scene"||a==="character"||a==="transition";try{if(e==="bold"){if(l){const i=n.closest("b, strong");return!!i&&i!==o}return document.queryCommandState("bold")}if(e==="strikeThrough")return n.closest("s, strike, del")?!0:document.queryCommandState("strikeThrough");if(e==="italic")return document.queryCommandState("italic");if(e==="underline")return document.queryCommandState("underline")}catch{return!1}return!1}function Ft(e){let t=document.activeElement,s=t?t.closest(".screenplay-block"):null,n=s?s.hasAttribute("contenteditable")?s:s.querySelector('[contenteditable="true"]'):null;if(!n&&Ge){const l=document.getElementById(Ge);l&&(s=l,n=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]'))}if(!n){const l=document.querySelector(".screenplay-block");l&&(s=l,n=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]'))}n&&document.activeElement!==n&&n.focus();const o=window.getSelection();if(o&&!o.isCollapsed&&o.rangeCount>0&&o.toString().trim().length>0){try{document.execCommand(e,!1,null)}catch{}s&&n&&_t(s,n.innerHTML),We=!0,He&&rt(),ut[e]=null,Gt()}else{const i=!(ut[e]!==null?ut[e]:Bt(e));ut[e]=i;try{document.execCommand(e,!1,null)}catch{}Gt()}}function nl(e){if(e==="bold"){Ft("bold");return}if(e==="italic"){Ft("italic");return}if(e==="underline"){Ft("underline");return}if(e==="strike"){Ft("strikeThrough");return}if(e==="undo"){document.execCommand("undo",!1,null),Gt();return}if(e==="redo"){document.execCommand("redo",!1,null),Gt();return}if(e==="image"){if(!Ge){const t=Array.from(document.querySelectorAll(".screenplay-block")),s=window.innerHeight/2;for(const n of t){const o=n.getBoundingClientRect();if(o.top<=s&&o.bottom>=s){Ge=n.getAttribute("data-block-id");break}}}cn=Ge,ma(!0);return}if(!Ge){const t=document.querySelector(".screenplay-block");t&&(Ge=t.getAttribute("data-block-id"))}if(Ge){const t=document.getElementById(Ge);t&&(Is(t,e),Fs(e))}}function Fs(e){const t=document.getElementById("element-bar");t&&t.querySelectorAll(".element-btn").forEach(s=>{s.getAttribute("data-type")===e?s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-white bg-blue-600 shadow-2xs font-semibold shrink-0":s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0"})}function al(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),n=document.getElementById("btn-format-strike");[{btn:e,cmd:"bold"},{btn:t,cmd:"italic"},{btn:s,cmd:"underline"},{btn:n,cmd:"strikeThrough"}].forEach(({btn:l,cmd:i})=>{l&&(l.onmousedown=r=>{r.preventDefault(),r.stopPropagation()},l.onclick=r=>{r.preventDefault(),r.stopPropagation(),Ft(i)})}),_n||(_n=!0,document.addEventListener("selectionchange",()=>{Gt()}));const a=document.getElementById("editor-main-scroll");a&&(a.addEventListener("keyup",Gt),a.addEventListener("mouseup",Gt))}function Gt(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),n=document.getElementById("btn-format-strike");if(!e||!t||!s||!n)return;const o="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center border border-blue-600 shadow-2xs font-semibold active:scale-95 transition-all cursor-pointer",a="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center border border-slate-200/90 active:scale-95 transition-all cursor-pointer";try{const l=window.getSelection();let i=!1,r=!1,f=!1,p=!1;l&&!l.isCollapsed&&l.rangeCount>0&&l.toString().trim().length>0?(i=Bt("bold"),r=Bt("italic"),f=Bt("underline"),p=Bt("strikeThrough")):(i=ut.bold!==null?ut.bold:Bt("bold"),r=ut.italic!==null?ut.italic:Bt("italic"),f=ut.underline!==null?ut.underline:Bt("underline"),p=ut.strikeThrough!==null?ut.strikeThrough:Bt("strikeThrough")),e.className=i?o:a,t.className=r?o:a,s.className=f?o:a,n.className=p?o:a}catch{}}function ol(e,t){const s=document.getElementById("editor-more-menu-btn"),n=document.getElementById("editorMoreMenuModal"),o=document.getElementById("closeMoreMenuBtn");function a(Y){n&&(n.classList.remove("hidden"),n.classList.add("flex"),Tt({id:"moreMenu",name:"Screenplay Tools",close:()=>{n.classList.add("hidden"),n.classList.remove("flex")},restore:()=>{n.classList.remove("hidden"),n.classList.add("flex")}}))}s&&(s.onclick=()=>a()),o&&(o.onclick=()=>Ie("moreMenu")),n&&(n.onclick=Y=>{Y.target===n&&Ie("moreMenu")});const l=document.getElementById("menu-btn-scene-navigator");l&&(l.onclick=()=>{Ie("moreMenu");const Y=document.getElementById("navSceneSelect");Y&&Y.focus()});const i=document.getElementById("menu-btn-char-navigator");i&&(i.onclick=()=>{Ie("moreMenu");const Y=ua(),Se=prompt(`Select character to navigate to:
${Y.join(", ")}`,Y[0]||"HILL");if(Se){for(const A of F.scenes)for(const V of A.blocks)if(V.type==="character"&&V.content.toUpperCase().includes(Se.trim().toUpperCase())){const Ne=document.getElementById(V.id);if(Ne){Ne.scrollIntoView({behavior:"smooth",block:"center"}),Ne.classList.add("bg-blue-100/60"),setTimeout(()=>Ne.classList.remove("bg-blue-100/60"),1500);return}}}});const r=document.getElementById("sceneNumberToggle"),f=document.getElementById("sceneNumberToggleText"),p=document.getElementById("menuSceneNumState"),d=document.getElementById("menu-btn-scene-numbers");function c(){Ot=!Ot,f&&(f.textContent=`Scene #s: ${Ot?"On":"Off"}`),p&&(p.textContent=Ot?"Enabled":"Disabled"),document.querySelectorAll(".scene-num-indicator").forEach(Y=>{Y.classList.toggle("hidden",!Ot)}),w(`Scene numbers ${Ot?"enabled (left side)":"hidden"}`)}r&&(r.onclick=c),d&&(d.onclick=()=>{c(),Ie("moreMenu")});const m=document.getElementById("focusModeToggle"),g=document.getElementById("focusModeText"),h=document.getElementById("menu-btn-focus-mode"),b=document.getElementById("menuFocusState");function y(Y=null){$t=Y!==null?Y:!$t,g&&(g.textContent=$t?"Exit Focus":"Focus"),b&&(b.textContent=$t?"Active":"Off");const Se=document.getElementById("editor-collapsible-toolbars"),A=document.getElementById("editor-document-tabs"),V=document.getElementById("editor-fixed-header");if($t?(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!0),V&&(V.style.top="0px")):(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!1),V&&(V.style.top="0px")),Se&&(Se.style.display=$t?"none":""),A&&(A.style.display=$t?"none":"flex"),hs(),$t)Tt({id:"focusMode",name:"Focus Mode",close:()=>y(!1)}),w("Focus Mode active (distraction-free)");else{const Ne=ze.findIndex(ne=>ne.id==="focusMode");Ne!==-1&&ze.splice(Ne,1),w("Exited Focus Mode")}}m&&(m.onclick=()=>y()),h&&(h.onclick=()=>{Ie("moreMenu"),y()});const P=document.getElementById("langToggleBtn"),S=document.getElementById("langToggleText"),N=document.getElementById("tamilLangBadge");function E(Y){Ws=Y,S&&(S.textContent=Y==="TA"?"தமிழ் / EN":Y==="TL"?"Tanglish":"EN / தமிழ்"),N&&(N.textContent=Y==="TA"?"தமிழ் விசைப்பலகை: இயங்குகிறது":Y==="TL"?"Tanglish: Active":"Tamil IME: Ready"),w(`Screenplay language set to ${Y==="TA"?"Tamil":Y==="TL"?"Tanglish":"English"}`)}P&&(P.onclick=()=>{E(Ws==="EN"?"TA":Ws==="TA"?"TL":"EN")}),document.querySelectorAll(".lang-choice-btn").forEach(Y=>{Y.onclick=()=>{E(Y.getAttribute("data-lang")),Ie("moreMenu")}});const j=document.getElementById("btn-open-production"),T=document.getElementById("menu-btn-production"),ce=()=>{const Y=e||B.state.selectedScriptId||"chronicles-of-dust";sessionStorage.setItem("scriptora_prod_return",`/editor/${Y}`),t(`/production?from=editor&scriptId=${encodeURIComponent(Y)}`)};j&&(j.onclick=ce),T&&(T.onclick=()=>{Ie("moreMenu"),ce()});const te=document.getElementById("menu-btn-go-page");te&&(te.onclick=()=>{Ie("moreMenu");const Y=document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)").length||1,Se=prompt(`Enter page number to jump to (1-${Y}):`,"1");if(Se){const A=document.querySelector(`[data-page-num="${Se}"]`);A&&A.scrollIntoView({behavior:"smooth",block:"start"})}});const be=document.getElementById("menu-btn-page-break");be&&(be.onclick=()=>{Ie("moreMenu"),dn()});const W=document.getElementById("menu-btn-insert-page");W&&(W.onclick=()=>{Ie("moreMenu"),ia()});const Ee=document.getElementById("menu-btn-page-before");Ee&&(Ee.onclick=()=>{Ie("moreMenu"),ra()});const ve=document.getElementById("menu-btn-page-at-end");ve&&(ve.onclick=()=>{Ie("moreMenu"),pn()});const Q=document.getElementById("btn-undo"),de=document.getElementById("btn-redo");Q&&(Q.onclick=()=>document.execCommand("undo")),de&&(de.onclick=()=>document.execCommand("redo"))}function ll(){const e=document.getElementById("btn-quick-find"),t=document.getElementById("menu-btn-find-replace"),s=document.getElementById("closeFindBtn"),n=document.getElementById("findInput"),o=document.getElementById("replaceInput"),a=document.getElementById("findNextBtn"),l=document.getElementById("findPrevBtn"),i=document.getElementById("replaceBtn"),r=document.getElementById("replaceAllBtn"),f=document.getElementById("findReplaceModal");e&&(e.onclick=()=>Ms(!0)),t&&(t.onclick=()=>{Ie("moreMenu"),Ms(!0)}),s&&(s.onclick=()=>Ie("findModal")),f&&(f.onclick=p=>{p.target===f&&Ie("findModal")}),n&&(n.oninput=()=>Ys(n.value)),a&&(a.onclick=()=>an(1)),l&&(l.onclick=()=>an(-1)),i&&(i.onclick=()=>{const p=n.value,d=o.value;if(!p||jt===-1||!vt[jt])return;const c=vt[jt];c.block.content=c.block.content.replace(p,d),mt(),Ys(p),We=!0,He&&rt(),w("Replaced 1 occurrence")}),r&&(r.onclick=()=>{const p=n.value,d=o.value;if(!p)return;let c=0;F.scenes.forEach(m=>{m.blocks.forEach(g=>{g.content&&g.content.includes(p)&&(g.content=g.content.split(p).join(d),c++)})}),mt(),Ys(p),We=!0,He&&rt(),w(`Replaced ${c} occurrences`)})}function Ms(e){const t=document.getElementById("findReplaceModal");if(t)if(e)Ks=document.getElementById("editor-main-scroll")?.scrollTop||0,Js=Ge,t.classList.remove("hidden"),t.classList.add("flex"),Tt({id:"findModal",name:"Find & Replace",close:()=>Ms(!1)}),setTimeout(()=>{document.getElementById("findInput")?.focus()},40);else{t.classList.add("hidden"),t.classList.remove("flex"),fn();const s=document.getElementById("editor-main-scroll");if(s&&Ks!==null&&(s.scrollTop=Ks),Js){const o=document.getElementById(Js),a=o?.querySelector('[contenteditable="true"]')||o;a&&a.focus()}const n=ze.findIndex(o=>o.id==="findModal");n!==-1&&ze.splice(n,1)}}function Ys(e){vt=[],jt=-1;const t=document.getElementById("findMatchesCount");if(!e||!F){t&&(t.textContent="0 of 0"),fn();return}F.scenes.forEach(s=>{s.blocks.forEach(n=>{n.content&&n.content.toLowerCase().includes(e.toLowerCase())&&vt.push({block:n,sceneId:s.id})})}),t&&(t.textContent=vt.length>0?`1 of ${vt.length}`:"0 of 0"),vt.length>0&&an(0)}function an(e){if(vt.length===0)return;jt=(jt+e+vt.length)%vt.length;const t=vt[jt],s=document.getElementById("findMatchesCount");s&&(s.textContent=`${jt+1} of ${vt.length}`);const n=document.getElementById(t.block.id);n&&(n.scrollIntoView({behavior:"smooth",block:"center"}),fn(),n.classList.add("bg-yellow-100"))}function fn(){document.querySelectorAll(".screenplay-block").forEach(e=>{e.classList.remove("bg-yellow-100")})}function ma(e){const t=document.getElementById("imageModal");if(t)if(e)Ge&&(cn=Ge),t.classList.remove("hidden"),t.classList.add("flex"),Tt({id:"imageModal",name:"Insert Image",close:()=>ma(!1)});else{t.classList.add("hidden"),t.classList.remove("flex");const s=ze.findIndex(n=>n.id==="imageModal");s!==-1&&ze.splice(s,1)}}function il(e){const t=document.getElementById("imageModal"),s=document.getElementById("closeImageModal"),n=document.getElementById("cancelImageBtn"),o=document.getElementById("insertImageBtn"),a=document.getElementById("imgFileInput"),l=document.getElementById("imgUploadLabel"),i=document.getElementById("imgUrlInput"),r=document.getElementById("imgCaptionInput"),f=document.getElementById("imgPreviewContainer"),p=document.getElementById("imgPreviewThumb"),d=document.getElementById("clearImgPreviewBtn");let c="";function m(U){f&&p&&(U?(p.src=U,f.classList.remove("hidden")):(f.classList.add("hidden"),p.src=""))}function g(U,C){const R=new Image;R.onload=()=>{let ee=R.width,ge=R.height;(ee>900||ge>600)&&(ee/ge>900/600?(ge=Math.round(ge*900/ee),ee=900):(ee=Math.round(ee*600/ge),ge=600));const fe=document.createElement("canvas");fe.width=ee,fe.height=ge,fe.getContext("2d").drawImage(R,0,0,ee,ge),C(fe.toDataURL("image/jpeg",.85))},R.onerror=()=>C(U),R.src=U}s&&(s.onclick=()=>Ie("imageModal")),n&&(n.onclick=()=>Ie("imageModal")),t&&(t.onclick=U=>{U.target===t&&Ie("imageModal")}),document.querySelectorAll(".img-preset-btn").forEach(U=>{U.onclick=()=>{const C=U.getAttribute("data-url"),R=U.getAttribute("data-caption");i&&(i.value=C),r&&!r.value&&(r.value=R),c=C,m(C)}}),i&&(i.oninput=()=>{const U=i.value.trim();U?(c="",m(U)):c||m("")}),d&&(d.onclick=()=>{c="",i&&(i.value=""),a&&(a.value=""),l&&(l.textContent="Choose local image..."),m("")}),a&&(a.onchange=U=>{const C=U.target.files?.[0];if(C){l&&(l.textContent=C.name);const R=new FileReader;R.onload=K=>{g(K.target.result,G=>{c=G,m(G)})},R.readAsDataURL(C)}}),o&&(o.onclick=()=>{const U=i?.value.trim(),C=r?.value.trim();let R=c||U;R||(R="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80");const K={id:`b-${Date.now().toString().slice(-6)}`,type:"image",url:R,content:R,caption:C||""},G=cn||Ge;let ee=null,ge=-1;if(F.scenes&&F.scenes.length>0){if(G)for(const fe of F.scenes){const he=(fe.blocks||[]).findIndex(ke=>ke.id===G);if(he!==-1){ee=fe,ge=he+1;break}}if(!ee){const he=document.getElementById("navSceneSelect")?.value||(B.state.currentSceneId?`scene-${B.state.currentSceneId}`:null);he&&(ee=F.scenes.find(ke=>ke.id===he||String(ke.number)===String(B.state.currentSceneId)))}if(!ee){const fe=Array.from(document.querySelectorAll(".screenplay-block")),he=window.innerHeight/2;for(const ke of fe){const _=ke.getBoundingClientRect();if(_.top<=he&&_.bottom>=he){const Re=ke.getAttribute("data-scene-id");ee=F.scenes.find(L=>L.id===Re);const v=ke.getAttribute("data-block-id");if(ee&&v){const L=(ee.blocks||[]).findIndex(X=>X.id===v);L!==-1&&(ge=L+1)}break}}}ee||(ee=F.scenes[0]),ee.blocks||(ee.blocks=[]),ge!==-1&&ge<=ee.blocks.length?ee.blocks.splice(ge,0,K):ee.blocks.push(K)}else F.scenes=[{id:"scene-1",number:1,slugline:"INT. SCENE - DAY",blocks:[K]}];c="",a&&(a.value=""),i&&(i.value=""),r&&(r.value=""),l&&(l.textContent="Upload local image file..."),m(""),mt(),We=!0,He&&rt(),w("Storyboard image inserted"),Ie("imageModal"),setTimeout(()=>{const fe=document.getElementById(K.id);fe&&(fe.scrollIntoView({behavior:"smooth",block:"center"}),fe.classList.add("ring-2","ring-blue-500"),setTimeout(()=>fe.classList.remove("ring-2","ring-blue-500"),1500))},80)});const h=document.getElementById("preferencesModal"),b=document.getElementById("menu-btn-preferences"),y=document.getElementById("closePrefModal"),P=document.getElementById("savePrefBtn");function S(U){if(h)if(U)h.classList.remove("hidden"),h.classList.add("flex"),Tt({id:"preferencesModal",name:"Preferences",close:()=>S(!1)});else{h.classList.add("hidden"),h.classList.remove("flex");const C=ze.findIndex(R=>R.id==="preferencesModal");C!==-1&&ze.splice(C,1)}}b&&(b.onclick=()=>{Ie("moreMenu"),S(!0)}),y&&(y.onclick=()=>Ie("preferencesModal")),h&&(h.onclick=U=>{U.target===h&&Ie("preferencesModal")}),P&&(P.onclick=()=>{const U=document.getElementById("prefSceneNumbers")?.checked,C=document.getElementById("prefLineSpacing")?.value,R=document.getElementById("prefFontSize")?.value;Ot=U,document.querySelectorAll(".scene-num-indicator").forEach(G=>G.classList.toggle("hidden",!U));const K=document.querySelector(".screenplay-page-sheet");K&&(K.style.lineHeight=C==="2.0"?"30px":C==="1.0"?"20px":"24px",K.style.fontSize=R==="14pt"?"16px":"15px"),Ie("preferencesModal"),w("Preferences applied")});function N(U){return U?U.replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/[\r\n]+/g," ").replace(/[^\x20-\x7E]/g,C=>({"—":"--","–":"-","“":'"',"”":'"',"‘":"'","’":"'","…":"...","·":"-","•":"*"})[C]||" "):""}function E(U,C){if(!U)return[];const R=U.split(/\s+/),K=[];let G="";for(const ee of R)G?(G+" "+ee).length<=C?G+=" "+ee:(K.push(G),G=ee):G=ee;return G&&K.push(G),K}function j(U,C,R={}){const{includeTitlePage:K=!0,includePageNumbers:G=!0,sceneNumbers:ee=!0,preservePageBreaks:ge=!0,emptyPageFirst:fe=!1,emptyPageLast:he=!1,pageSheets:ke=[]}=R,_=[],v=595.28/2,L=108,X=525,J=14.4,se=14.4,Ae=(le,Ke=12)=>(le?le.length:0)*(Ke*.6),Xe=(le,Ke=12)=>Math.round(v-Ae(le,Ke)/2),bt=(le,Ke=12,_e=X)=>Math.round(_e-Ae(le,Ke));let Qe=!1;if(K&&U.titlePage&&(C.has(1)||R.rangeType==="all")){const le=U.titlePage,Ke=(le.title||U.title||"UNTITLED SCREENPLAY").toUpperCase(),_e=E(Ke,35),Je=[];let we=520;_e.forEach(Ze=>{Je.push({text:Ze,x:Xe(Ze,12),y:we,font:"F2",size:12}),we-=J}),we-=24;const St=le.by!==void 0?le.by:"Written by";St&&(Je.push({text:St,x:Xe(St,12),y:we,font:"F1",size:12}),we-=J+4);const Ye=le.author||"Author";Je.push({text:Ye,x:Xe(Ye,12),y:we,font:"F2",size:12});let Ve=(le.phone||"").trim();if(!Ve&&le.contact){const ft=le.contact.split("·").map(kt=>kt.trim()).find(kt=>kt.includes("+")||/\d{3}/.test(kt));ft&&(Ve=ft)}Ve&&!Ve.toLowerCase().startsWith("phone")&&(Ve=`Phone: ${Ve}`);let ue=(le.email||"").trim();if(!ue&&le.contact&&le.contact.includes("@")){const Ze=le.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);Ze&&(ue=Ze[0])}ue&&!ue.toLowerCase().startsWith("e-mail")&&!ue.toLowerCase().startsWith("email")&&(ue=`E-mail: ${ue}`);const st=[];if(Ve&&st.push(Ve),ue&&st.push(ue),le.address){const Ze=E(le.address.trim(),40);st.push(...Ze)}else if(!Ve&&!ue&&le.contact){const Ze=le.contact.split("·").map(ft=>ft.trim()).filter(Boolean);st.push(...Ze)}let Et=130;st.forEach(Ze=>{Je.push({text:Ze,x:L,y:Et,font:"F1",size:12}),Et-=J}),_.push(Je),Qe=!0}if(ke.forEach(le=>{if(le.classList&&le.classList.contains("screenplay-title-page-sheet"))return;const Ke=parseInt(le.getAttribute("data-page-num"),10)||1;if(!C.has(Ke))return;const _e=[];let Je=!1;if(G){const Ye=`${Ke}.`;_e.push({text:Ye,x:bt(Ye,12,X),y:805,font:"F1",size:12})}let we=765;le.querySelectorAll(".screenplay-block").forEach(Ye=>{if(we<65)return;const Ve=Ye.getAttribute("data-block-type");if(Ve==="pagebreak"){if(ge){we-=J;const ue="----------------------------------------";_e.push({text:ue,x:Xe(ue,12),y:we,font:"F1",size:12}),we-=J}return}if(Ve==="scene"){const ue=Ye.querySelector('[contenteditable="true"]'),st=(ue?ue.innerText.trim():Ye.innerText.trim()).toUpperCase();st&&(Je=!0);const Et=ee&&Ye.querySelector(".scene-num-indicator")?.innerText?.trim()||"";we-=se,E(st,57).forEach((ft,kt)=>{kt===0&&Et&&_e.push({text:Et,x:76,y:we,font:"F2",size:12}),_e.push({text:ft,x:L,y:we,font:"F2",size:12}),we-=J})}else if(Ve==="character"){const ue=Ye.innerText.trim().toUpperCase();ue&&(Je=!0),we-=se,_e.push({text:ue,x:266,y:we,font:"F2",size:12}),we-=J}else if(Ve==="parenthetical"){let ue=Ye.innerText.trim();ue&&(Je=!0),ue.startsWith("(")||(ue="("+ue),ue.endsWith(")")||(ue=ue+")"),E(ue,26).forEach(st=>{_e.push({text:st,x:223,y:we,font:"F1",size:12}),we-=J})}else if(Ve==="dialogue"){const ue=Ye.innerText.trim();ue&&(Je=!0),E(ue,35).forEach(st=>{_e.push({text:st,x:180,y:we,font:"F1",size:12}),we-=J})}else if(Ve==="transition"){const ue=Ye.innerText.trim().toUpperCase();ue&&(Je=!0),we-=se,_e.push({text:ue,x:bt(ue,12,X),y:we,font:"F2",size:12}),we-=J}else if(Ve==="shot"){const ue=Ye.innerText.trim().toUpperCase();ue&&(Je=!0),we-=se,_e.push({text:ue,x:L,y:we,font:"F2",size:12}),we-=J}else if(Ve==="image"){const ue=Ye.querySelector('[contenteditable="true"]')?.innerText?.trim()||"Storyboard Image";Je=!0,we-=se,_e.push({text:`[STORYBOARD: ${ue}]`,x:L,y:we,font:"F1",size:12}),we-=J}else{const ue=Ye.innerText.trim();ue&&(Je=!0,we-=se,E(ue,58).forEach(st=>{_e.push({text:st,x:L,y:we,font:"F1",size:12}),we-=J}))}}),Je&&_.push(_e)}),_.length===0){const le=[{text:U.title||"Screenplay",x:L,y:750,font:"F2",size:12}];G&&le.push({text:"1.",x:bt("1.",12,X),y:805,font:"F1",size:12}),_.push(le)}const Le=le=>!le||le.length===0||le.every(Ke=>Ke.y===805||!Ke.text||Ke.text.trim()==="");for(;_.length>1&&Le(_[_.length-1]);)_.pop();fe&&_.unshift([]),he&&_.push([]);const Ut=_.length,dt=[],ht=[];let Te=4;for(let le=0;le<Ut;le++)Te++,dt.push(Te),Te++,ht.push(Te);const lt=[];lt[1]="<< /Type /Catalog /Pages 2 0 R >>",lt[2]=`<< /Type /Pages /Kids [${dt.map(le=>le+" 0 R").join(" ")}] /Count ${Ut} /MediaBox [0 0 595.28 841.89] >>`,lt[3]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>",lt[4]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>";for(let le=0;le<Ut;le++){const Ke=dt[le],_e=ht[le];lt[Ke]=`<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${_e} 0 R >>`;const Je=[],we=_[le]||[];for(const ue of we){const st=ue.font||"F1",Et=ue.size||12,Ze=ue.x||L,ft=ue.y||750,kt=N(ue.text);Je.push(`BT /${st} ${Et} Tf ${Ze.toFixed(2)} ${ft.toFixed(2)} Td (${kt}) Tj ET`)}const St=Je.join(`
`),Ve=new TextEncoder().encode(St);lt[_e]=`<< /Length ${Ve.length} >>
stream
${St}
endstream`}const At=new TextEncoder,qt=At.encode(`%PDF-1.4
%âãÏÓ
`);let Dt=qt.length;const zt=[],Yt=[];for(let le=1;le<=Te;le++){zt[le]=Dt;const Ke=`${le} 0 obj
${lt[le]}
endobj
`,_e=At.encode(Ke);Yt.push(_e),Dt+=_e.length}const $s=Dt;let Xt=`xref
0 ${Te+1}
0000000000 65535 f 
`;for(let le=1;le<=Te;le++)Xt+=`${String(zt[le]).padStart(10,"0")} 00000 n 
`;Xt+=`trailer
<< /Size ${Te+1} /Root 1 0 R >>
startxref
${$s}
%%EOF`;const Zt=At.encode(Xt);return new Blob([qt,...Yt,Zt],{type:"application/pdf"})}const T=document.getElementById("exportModal"),ce=document.getElementById("exportModalBtn"),te=document.getElementById("menu-btn-export"),be=document.getElementById("closeExportModal"),W=document.getElementById("cancelExportBtn"),Ee=document.getElementById("startExportBtn"),ve=document.getElementById("exportProgressArea"),Q=document.getElementById("exportProgressBar"),de=document.getElementById("exportStatusText");function Y(U){if(T)if(U)T.classList.remove("hidden"),T.classList.add("flex"),Tt({id:"exportModal",name:"Export",close:()=>Y(!1)});else{T.classList.add("hidden"),T.classList.remove("flex"),ve?.classList.add("hidden");const C=ze.findIndex(R=>R.id==="exportModal");C!==-1&&ze.splice(C,1)}}ce&&(ce.onclick=()=>Y(!0)),te&&(te.onclick=()=>{Ie("moreMenu"),Y(!0)}),be&&(be.onclick=()=>Ie("exportModal")),W&&(W.onclick=()=>Ie("exportModal")),T&&(T.onclick=U=>{U.target===T&&Ie("exportModal")});const Se=document.getElementById("exportPageRangeSelect"),A=document.getElementById("exportCustomRangeInput");Se&&A&&(Se.onchange=()=>{A.classList.toggle("hidden",Se.value!=="custom"),Se.value==="custom"&&A.focus()}),Ee&&(Ee.onclick=()=>{const U=document.getElementById("exportFormatSelect")?.value||"pdf",C=document.getElementById("exportPageRangeSelect")?.value||"all",R=document.getElementById("exportCustomRangeInput")?.value||"",K=document.getElementById("optPageNumbers")?.checked!==!1,G=document.getElementById("optPreservePageBreaks")?.checked!==!1,ee=document.getElementById("optStandardMargins")?.checked!==!1,ge=document.getElementById("optSceneNumbers")?.checked!==!1,fe=document.getElementById("optEmptyPageFirst")?.checked===!0,he=document.getElementById("optEmptyPageLast")?.checked===!0;let ke=Array.from(document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)"));ke.length===0&&(ke=Array.from(document.querySelectorAll(".screenplay-page-sheet:not(.screenplay-title-page-sheet)"))),ke.length===0&&(mt(),ke=Array.from(document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)")));const _=ke.length||1;let Re=new Set;if(C==="all")for(let v=1;v<=_;v++)Re.add(v);else if(C==="current"){let v=1;if(Ge){const L=document.getElementById(Ge),X=L?L.closest(".screenplay-page-sheet"):null;X&&(v=parseInt(X.getAttribute("data-page-num"),10)||1)}Re.add(v)}else if(C==="custom"&&(R.split(",").forEach(L=>{if(L=L.trim(),L.includes("-")){const[X,J]=L.split("-").map(se=>parseInt(se.trim(),10));if(!isNaN(X)&&!isNaN(J))for(let se=Math.max(1,X);se<=Math.min(_,J);se++)Re.add(se)}else{const X=parseInt(L,10);!isNaN(X)&&X>=1&&X<=_&&Re.add(X)}}),Re.size===0))for(let L=1;L<=_;L++)Re.add(L);ve.classList.remove("hidden"),Q.style.width="35%",de.textContent=ee?'Applying standard A4 margins (1.5" left, 1.0" right) & Courier Prime...':"Formatting Courier Prime typography and page layout...",setTimeout(()=>{Q.style.width="80%",de.textContent=`Compiling standard ${U.toUpperCase()} for pages [${Array.from(Re).join(", ")}]...`},500),setTimeout(()=>{Q.style.width="100%",de.textContent="Completed! Starting download...";let v="";if(fe&&(v+=`\f
`),document.getElementById("optTitlePage")?.checked&&F.titlePage&&(Re.has(1)||C==="all")){const Ae=F.titlePage;v+=`${Ae.title||F.title}

`,v+=`${Ae.by||"Written by"}

`,v+=`${Ae.author||"Author"}

`,Ae.phone&&(v+=`${Ae.phone}
`),Ae.email&&(v+=`${Ae.email}
`),Ae.address&&(v+=`${Ae.address}
`),!Ae.phone&&!Ae.email&&!Ae.address&&Ae.contact&&(v+=`${Ae.contact}
`),v+=`

================================================================================
\f
`}ke.forEach((Ae,Xe)=>{const bt=parseInt(Ae.getAttribute("data-page-num"),10)||Xe+1;if(!Re.has(bt))return;let Qe="";K&&(Qe+=`
											${bt}.

`);let Le=!1;Ae.querySelectorAll(".screenplay-block").forEach(dt=>{const ht=dt.getAttribute("data-block-type");if(ht==="pagebreak"){G&&(Qe+=`
[=== PAGE BREAK ===]

`);return}let Te="";if(ht==="scene"){const lt=dt.querySelector('[contenteditable="true"]');Te=lt?lt.innerText.trim():dt.innerText.trim();const At=ge&&dt.querySelector(".scene-num-indicator")?.innerText?.trim()||"";Te&&(Qe+=`

${At?At+". ":""}${Te}

`,Le=!0)}else ht==="character"?(Te=dt.innerText.trim(),Te&&(Qe+=`
			${Te}
`,Le=!0)):ht==="parenthetical"?(Te=dt.innerText.trim(),Te&&(Qe+=`		${Te.startsWith("(")?Te:"("+Te+")"}
`,Le=!0)):ht==="dialogue"?(Te=dt.innerText.trim(),Te&&(Qe+=`	${Te}
`,Le=!0)):ht==="transition"?(Te=dt.innerText.trim(),Te&&(Qe+=`
						${Te}

`,Le=!0)):(Te=dt.innerText.trim(),Te&&(Qe+=`${Te}

`,Le=!0))}),Le&&(v+=Qe+`
\f
`)}),he?!v.endsWith(`\f
`)&&!v.endsWith("\f")&&(v+=`
\f
`):v=v.replace(/[\s\f]+$/,"");let L;U==="pdf"?L=j(F,Re,{includeTitlePage:document.getElementById("optTitlePage")?.checked!==!1,includePageNumbers:K,sceneNumbers:ge,preservePageBreaks:G,emptyPageFirst:fe,emptyPageLast:he,pageSheets:ke,rangeType:C}):L=new Blob([v],{type:"text/plain"});const X=URL.createObjectURL(L),J=document.createElement("a");J.href=X;const se=C==="all"?"All_Pages":`Pages_${Array.from(Re).join("-")}`;J.download=`${F.title.replace(/[^a-zA-Z0-9]/g,"_")}_${F.draft||"Draft"}_${se}.${U}`,document.body.appendChild(J),J.click(),J.remove(),w(`Exported "${J.download}" successfully`),setTimeout(()=>Ie("exportModal"),800)},1e3)});const V=document.getElementById("versionsModal"),Ne=document.getElementById("versionsModalBtn"),ne=document.getElementById("menu-btn-versions"),xe=document.getElementById("closeVersionsModal"),I=document.getElementById("versionsListContainer");function $e(U){V&&(V.classList.remove("hidden"),V.classList.add("flex"),je(),Tt({id:"versionsModal",name:"Versions",close:()=>{V.classList.add("hidden"),V.classList.remove("flex")},restore:()=>{V.classList.remove("hidden"),V.classList.add("flex"),je()}}))}async function je(){const U=await za(e);I&&(I.innerHTML=U.map(C=>`
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
    `).join(""),document.querySelectorAll(".restore-version-btn").forEach(C=>{C.onclick=()=>{const R=C.getAttribute("data-vname");w(`Restored version "${R}"`),document.getElementById("currentVersionTag").textContent=R,Ie("versionsModal")}}))}Ne&&(Ne.onclick=()=>$e()),ne&&(ne.onclick=()=>{Ie("moreMenu"),$e()}),xe&&(xe.onclick=()=>Ie("versionsModal")),V&&(V.onclick=U=>{U.target===V&&Ie("versionsModal")});const Pe=document.getElementById("newVersionModal"),ae=document.getElementById("openNewVersionPrompt"),re=document.getElementById("closeNewVersionModal"),D=document.getElementById("cancelNewVersionBtn"),Ce=document.getElementById("saveNewVersionBtn");function Oe(){V.classList.add("hidden"),Pe.classList.remove("hidden"),Pe.classList.add("flex"),Tt({id:"newVersionModal",name:"New Version",close:()=>{Pe.classList.add("hidden"),Pe.classList.remove("flex")}})}ae&&(ae.onclick=Oe),re&&(re.onclick=()=>Ie("newVersionModal")),D&&(D.onclick=()=>Ie("newVersionModal")),Ce&&(Ce.onclick=async()=>{const U=document.getElementById("newVersionNameInput")?.value.trim(),C=document.getElementById("newVersionNotesInput")?.value.trim();U&&(await Va(e,{name:U,notes:C}),w(`Created version snapshot "${U}"`),document.getElementById("currentVersionTag").textContent=U,Ie("newVersionModal"))});const pe=document.getElementById("compareModal"),Fe=document.getElementById("openCompareBtn"),me=document.getElementById("menu-btn-compare"),Ue=document.getElementById("closeCompareModal"),Me=document.getElementById("closeCompareBtn2");function De(){V.classList.add("hidden"),pe.classList.remove("hidden"),pe.classList.add("flex"),Tt({id:"compareModal",name:"Compare Versions",close:()=>{pe.classList.add("hidden"),pe.classList.remove("flex")}})}Fe&&(Fe.onclick=De),me&&(me.onclick=()=>{Ie("moreMenu"),De()}),Ue&&(Ue.onclick=()=>Ie("compareModal")),Me&&(Me.onclick=()=>Ie("compareModal")),pe&&(pe.onclick=U=>{U.target===pe&&Ie("compareModal")})}function _s(){if(!F)return;let e=0;F.scenes.forEach(a=>{a.blocks.forEach(l=>{l.content&&(e+=l.content.trim().split(/\s+/).filter(Boolean).length)})});const s=document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)").length||1,n=document.getElementById("telemetry-page-count"),o=document.getElementById("telemetry-word-count");n&&(n.textContent=`Page 1 of ${s}`),o&&(o.textContent=`${e.toLocaleString()} words`)}function rl(){const e=B.state.scripts||[],t=B.state.selectedScriptId||"chronicles-of-dust",s=e.find(n=>n.id===t)||e[0]||{title:"Chronicles of Dust"};return`
    ${ct("Intelligence","Script Selector")}

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

    ${ot("intelligence")}
  `}function cl(e){let t=B.state.selectedScriptId||"chronicles-of-dust";document.querySelectorAll(".script-select-card").forEach(o=>{o.onclick=()=>{const a=o.getAttribute("data-script-id"),l=o.getAttribute("data-script-title");t=a,B.selectScript(a),document.querySelectorAll(".script-select-card").forEach(f=>{f.className="script-select-card relative p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const p=f.querySelector(".script-select-indicator");p&&(p.className="script-select-indicator w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0",p.innerHTML='<span class="material-symbols-outlined text-[16px]">arrow_forward</span>')}),o.className="script-select-card relative p-3.5 rounded-xl border border-blue-600 bg-blue-50/70 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const i=o.querySelector(".script-select-indicator");i&&(i.className="script-select-indicator w-6 h-6 rounded-full bg-blue-600 text-white shadow-xs flex items-center justify-center shrink-0",i.innerHTML='<span class="material-symbols-outlined text-[16px] font-bold">check</span>');const r=document.getElementById("selector-btn-label");r&&(r.textContent=`Continue to Context (${l})`)}});const s=document.getElementById("submit-continue-analysis-btn");s&&(s.onclick=()=>{B.selectScript(t),e("/intelligence/context")});const n=document.getElementById("btn-import-script-modal");n&&(n.onclick=()=>{w("Select screenplay file (.fountain, .fdx, .pdf) to parse","info")})}function dl(){const e=B.state.selectedScriptId||"chronicles-of-dust",t=B.state.scripts.find(n=>n.id===e)||B.state.activeScript||{title:"Chronicles of Dust",format:"Feature",industry:"International / Hollywood"},s=t.context||{format:t.format||"Feature",industry:t.industry||"International / Hollywood",hours:1,minutes:36,seconds:0};return`
    ${ct("Intelligence","Context Calibration")}

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

    ${ot("intelligence")}
  `}function pl(e){const t=B.state.selectedScriptId||"chronicles-of-dust",s=B.state.scripts.find(d=>d.id===t)||B.state.activeScript||{},n=s.context||{};let o=n.format||s.format||"Feature",a=n.hours!==void 0?n.hours:1,l=n.minutes!==void 0?n.minutes:36,i=n.seconds!==void 0?n.seconds:0;document.querySelectorAll(".format-card").forEach(d=>{d.onclick=()=>{o=d.getAttribute("data-format"),document.querySelectorAll(".format-card").forEach(c=>{c.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 transition-all cursor-pointer hover:bg-slate-50"}),d.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 border-2 border-blue-600 transition-all cursor-pointer",o==="Short"?(a=0,l=25,i=0):o==="Pilot"?(a=0,l=50,i=30):(a=1,l=45,i=0),r()}});function r(){const d=y=>String(y).padStart(2,"0"),c=document.getElementById("val-hr"),m=document.getElementById("val-min"),g=document.getElementById("val-sec");c&&(c.value=d(a)),m&&(m.value=d(l)),g&&(g.value=d(i));const h=a*60+l+Math.round(i/60),b=document.getElementById("pacing-projection");b&&(b.textContent=`~${h} standard script pages`)}document.querySelectorAll(".stepper-btn").forEach(d=>{d.onclick=()=>{const c=d.getAttribute("data-unit"),m=parseInt(d.getAttribute("data-delta"),10)||0;c==="hr"&&(a=Math.max(0,Math.min(9,a+m))),c==="min"&&(l=Math.max(0,Math.min(59,l+m))),c==="sec"&&(i=Math.max(0,Math.min(59,i+m))),r()}}),[{id:"val-hr",max:9,get:()=>a,set:d=>{a=d}},{id:"val-min",max:59,get:()=>l,set:d=>{l=d}},{id:"val-sec",max:59,get:()=>i,set:d=>{i=d}}].forEach(({id:d,max:c,set:m,get:g})=>{const h=document.getElementById(d);h&&(h.onfocus=()=>{h.select()},h.oninput=()=>{let b=h.value.replace(/\D/g,"");if(b==="")m(0);else{let S=parseInt(b,10);isNaN(S)&&(S=0),S>c?(S=c,h.value=String(S)):h.value=b.slice(0,2),m(S)}const y=a*60+l+Math.round(i/60),P=document.getElementById("pacing-projection");P&&(P.textContent=`~${y} standard script pages`)},h.onblur=()=>{let b=h.value.replace(/\D/g,""),y=parseInt(b,10);isNaN(y)&&(y=0),y=Math.max(0,Math.min(c,y)),m(y),h.value=String(y).padStart(2,"0"),r()},h.onkeydown=b=>{if(b.key==="Enter")h.blur();else if(b.key==="ArrowUp"){b.preventDefault();const y=g(),P=Math.min(c,y+1);m(P),h.value=String(P).padStart(2,"0"),r()}else if(b.key==="ArrowDown"){b.preventDefault();const y=g(),P=Math.max(0,y-1);m(P),h.value=String(P).padStart(2,"0"),r()}})});const p=document.getElementById("btn-submit-context");p&&(p.onclick=async()=>{const d=document.getElementById("industry-select")?.value||"International / Hollywood";p.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Calibrating SCRIPTORA...</span>',p.disabled=!0;const c=g=>String(g).padStart(2,"0"),m={format:o,industry:d,hours:a,minutes:l,seconds:i,plannedDuration:`${c(a)}:${c(l)}:${c(i)}`};await to(t,m),w("Narrative parameters calibrated"),e("/intelligence/dashboard")})}function ul(){const e=B.state.selectedScriptId||"chronicles-of-dust",t=B.state.scripts.find(n=>n.id===e)||B.state.activeScript||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pages:96,format:"Feature"},s=t.analysisScores||{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80};return`
    ${ct("Intelligence","Script Analysis")}

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
            ${B.state.scripts.map(n=>`
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

    ${ot("intelligence")}
  `}function ml(e){const t=B.state.selectedScriptId||"chronicles-of-dust",s=B.state.scripts.find(S=>S.id===t)||B.state.scripts[0],n=document.getElementById("btn-gen-logline"),o=document.getElementById("btn-gen-synopsis"),a=document.getElementById("ai-generated-container"),l=document.getElementById("ai-generated-title"),i=document.getElementById("ai-generated-body"),r=document.getElementById("ai-close-btn"),f=document.getElementById("ai-copy-btn"),p=document.getElementById("ai-copy-text"),d=document.getElementById("ai-query-input"),c=document.getElementById("ai-query-submit");function m(S){a&&(a.classList.remove("hidden"),l.textContent=S==="logline"?"Generated Logline":"Generated Synopsis",i.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Generating with narrative telemetry...</span>',setTimeout(()=>{i.textContent=S==="logline"?s?.logline||"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.":s?.synopsis||"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves."},400))}if(n&&(n.onclick=()=>m("logline")),o&&(o.onclick=()=>m("synopsis")),r&&(r.onclick=()=>a.classList.add("hidden")),f&&(f.onclick=()=>{navigator.clipboard?.writeText(i.textContent||""),p.textContent="Copied!",setTimeout(()=>{p.textContent="Copy"},1800),w("Copied to clipboard")}),c&&d){const S=async()=>{const N=d.value.trim();if(!N)return;a.classList.remove("hidden"),l.textContent="Intelligence AI Answer",i.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing draft semantics...</span>';const E=await ln(N,t);i.textContent=E,d.value=""};c.onclick=S,d.onkeydown=N=>{N.key==="Enter"&&S()}}const g=document.getElementById("script-switcher-modal"),h=document.getElementById("script-selector-trigger"),b=document.getElementById("close-script-switcher-modal"),y=()=>{pt(g)},P=()=>{Be(g)};h&&(h.onclick=y),b&&(b.onclick=P),g&&(g.onclick=S=>{S.target===g&&P()}),document.querySelectorAll(".script-switch-opt").forEach(S=>{S.onclick=()=>{const N=S.getAttribute("data-id");B.selectScript(N),P(),e("/intelligence")}})}function fl(){const e=B.state.selectedScriptId||"chronicles-of-dust",t=B.state.scripts.find(n=>n.id===e)||B.state.activeScript||{title:"Chronicles of Dust",pages:96},s=[{type:"pacing",title:"Pacing",desc:"See where the story moves too fast or too slowly.",icon:"speed",score:82,telemetry:`${t.pages||96} Pages Telemetry`},{type:"dialogue",title:"Dialogue",desc:"Cadence, subtext density and character voice rhythm.",icon:"chat",score:89,telemetry:"42 Dialogue Exchanges"},{type:"emotion",title:"Emotion",desc:"Emotional heatmaps, catharsis curves and sentiment.",icon:"favorite",score:91,telemetry:"Peak Catharsis: Act II"},{type:"character-arc",title:"Character Arc",desc:"Want vs. need trajectories and transformation tracking.",icon:"alt_route",score:84,telemetry:"4 Major Protagonists"},{type:"continuity",title:"Continuity",desc:"Props, character locations, and temporal logic rules.",icon:"linear_scale",score:78,telemetry:"2 Minor Prop Conflicts"},{type:"story-structure",title:"Story Structure",desc:"Beat breakdowns, midpoint shifts and turning points.",icon:"account_tree",score:87,telemetry:"3-Act Paradigm Standard"},{type:"theme",title:"Theme",desc:"Core philosophical spines, motifs and moral arguments.",icon:"lightbulb",score:90,telemetry:"3 Tracked Motifs"},{type:"cinema",title:"Cinema",desc:"Visual storytelling, shot economy and set-piece power.",icon:"videocam",score:85,telemetry:"Cinematic Visual Index"},{type:"scene",title:"Scene Analysis",desc:"Deep dive breakdown of goals, conflict and polarity.",icon:"movie",score:86,telemetry:"Scene 18 Active Scope"},{type:"formatting",title:"Formatting",desc:"Standard industry margins, sluglines and font rules.",icon:"rule",score:94,telemetry:"Standard Guild Rules"},{type:"production",title:"Production",desc:"Locations, shooting cast, props and cost estimators.",icon:"movie_creation",score:80,telemetry:"24 Practical Locations"}];return`
    ${ct("Intelligence","Analyse Individually")}

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

    ${ot("intelligence")}
  `}function xl(e){const t=document.getElementById("analysis-filter-input");t&&(t.oninput=s=>{const n=s.target.value.toLowerCase().trim();document.querySelectorAll("#analysis-tiles-grid .analysis-tile").forEach(o=>{const a=o.getAttribute("data-keyword")||"";o.style.display=a.includes(n)?"flex":"none"})})}const Hn={pacing:{title:"Pacing Analysis",score:82,icon:"speed",desc:"Scene duration variance, narrative tempo and page-turn velocity.",questions:["Where does the pace drag in Act II?","Find scenes over 4 pages","Show action-to-dialogue ratios"],findings:[{scene:"SCENE 14 · Dockside Perimeter · Pg 36",act:"Act II",title:"Action beats slow down before major confrontation",desc:"Extended exposition between dock guards lowers tension prior to container breach.",targetScene:14},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Peak narrative rhythm",desc:"Fast intercut dialogue creates maximum urgency before floodgate breach.",targetScene:18},{scene:"SCENE 26 · Coastal Highway · Pg 68",act:"Act III",title:"High velocity turning point",desc:"Pursuit cadence maintains optimal beats per page.",targetScene:26}]},dialogue:{title:"Dialogue Analysis",score:89,icon:"chat",desc:"Cadence, subtext density, distinctive character voice profiles.",questions:["Are character voices distinctive?","Find on-the-nose exposition lines","Analyze dialogue subtext in Scene 18"],findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Subtext is understated and powerful",desc:"Kevin avoids speaking about his brother directly, communicating through silence and tea rituals.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Meera O.S. dialogue establishes authority",desc:"Radio chatter avoids fluff and communicates technical stakes concisely.",targetScene:18}]},emotion:{title:"Emotion Analysis",score:91,icon:"favorite",desc:"Catharsis trajectory, emotional resonance curves, character empathy indices.",questions:["Where does emotional vulnerability peak?","Track empathy trajectory for Kevin","Catharsis resolution in Act III"],findings:[{scene:"SCENE 12 · Father’s Workshop · Pg 28",act:"Act I",title:"Emotional anchor established",desc:"Familial debt and generational sacrifice ground Kevin’s reluctance to blow the whistle.",targetScene:12},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Desperation under rising water",desc:"Kevin’s fear of failing Meera is palpable as water rises past junction box.",targetScene:18}]},"character-arc":{title:"Character Arc Analysis",score:84,icon:"alt_route",desc:"Want vs. Need conflict, psychological transformation, fatal flaw resolution.",questions:["Does Kevin overcome his passivity?","Meera character transformation","Antagonist motivation clarity"],findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]},continuity:{title:"Continuity Analysis",score:78,icon:"linear_scale",desc:"Prop tracking, character spatial locations, timeline consistency checks.",questions:["Check prop handover in Scene 18","Is time of day consistent across Act II?","Track the brass seal location"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Hydro-sensor probe referenced before retrieval",desc:"Verify Kevin picked up copper probe in Scene 16 or carries it on belt.",targetScene:18},{scene:"SCENE 22 · Pumping Station · Pg 58",act:"Act II",title:"Flashlight state discrepancy",desc:"Ensure flashlight was retrieved after water surge in Scene 19.",targetScene:22}]},"story-structure":{title:"Story Structure Analysis",score:87,icon:"account_tree",desc:"Inciting incident, plot points, midpoint shift, climax architecture.",questions:["Is midpoint clearly defined?","Evaluate climax timing on page 88","Are 3-act beats aligned?"],findings:[{scene:"SCENE 06 · Customs Registry · Pg 14",act:"Inciting Incident",title:"Off-manifest container discovered",desc:"The inciting anomaly sets Kevin on irreversible investigative path.",targetScene:6},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Midpoint (Pg 48/96)",title:"Stakes escalate from civil to criminal",desc:"Kevin realizes his own brother commands the smuggling cartel.",targetScene:18}]},theme:{title:"Theme Analysis",score:90,icon:"lightbulb",desc:"Primary narrative spine: Complicity vs. Duty and moral accountability.",questions:["What is the central theme?","Where is loyalty tested?","Show recurring thematic motifs"],findings:[{scene:"SCENE 09 · Family Kitchen · Pg 22",act:"Act I",title:"Familial pressure as thematic catalyst",desc:"Kevin hides eviction notice, showing economic desperation fueling institutional silence.",targetScene:9},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Moral test faced directly",desc:"Kevin must decide whether to save his brother or save the port city from flooding.",targetScene:18},{scene:"SCENE 36 · Rooftop Overlook · Pg 94",act:"Act III",title:"Theme delivers its final statement",desc:"Accountability over self-preservation.",targetScene:36}]},cinema:{title:"Cinema & Visual Storytelling",score:85,icon:"videocam",desc:"Visual set-piece density, image systems, lighting and camera intentionality.",questions:["Check visual contrast between acts","Highlight cinematic set-pieces","Analyze color palette cues in action lines"],findings:[{scene:"SCENE 01 · Harbor Drone View · Pg 01",act:"Act I",title:"Strong establishing visual metaphor",desc:"Rusted shipping containers stacked like monoliths beneath smog.",targetScene:1},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"High visual tension",desc:"Red emergency beacons reflected in rising brackish water.",targetScene:18}]},scene:{title:"Scene Analysis",score:86,icon:"movie",desc:"Micro-structure of Scene 18: Objective, obstacle, polarity change.",questions:["What is the scene objective?","Where does tension peak?","How does polarity shift?"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]},formatting:{title:"Formatting & Guild Compliance",score:94,icon:"rule",desc:"Industry standard margin measurements, capitalization, slugline syntax.",questions:["Check standard industry margins","Find non-standard scene sluglines","Verify dialogue capitalization rules"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Perfect Courier Prime 12pt slugline",desc:"Margins, dual dialogue spacing, and transition tags meet Writers Guild standards.",targetScene:18}]},production:{title:"Production Breakdown",score:80,icon:"movie_creation",desc:"Locations, shooting days, practical elements, cast size breakdown.",questions:["How many practical locations?","Show scenes with special props","List one-off speaking roles"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Location: Wet Stage / Customs Interior",desc:"Requires controlled water flooding tank, hydro-sensor prop box, wet comm-link gear.",targetScene:18}]}};function fa(e){if(B.state.screenplay&&B.state.screenplay.id===e)return B.state.screenplay;const t=localStorage.getItem(`scriptora_screenplay_${e}`);if(t)try{const s=JSON.parse(t);if(s&&s.scenes&&s.scenes.length>0)return s}catch{}return e==="chronicles-of-dust"?on:null}function xa(e,t){const s=[];return e&&Array.isArray(e.scenes)&&e.scenes.length>0?e.scenes.forEach((n,o)=>{const a=n.number||o+1,l=n.slugline&&n.slugline.trim()||n.blocks?.find(i=>i.type==="scene")?.content?.trim()||`SCENE ${a}`;s.push({id:n.id||`scene-${a}`,number:a,slugline:l,act:n.actId==="act-3"?"Act III":n.actId==="act-2"?"Act II":a>24?"Act III":a>11?"Act II":"Act I"})}):on.scenes.forEach(o=>{s.push({id:o.id,number:o.number,slugline:o.slugline||`SCENE ${o.number}`,act:o.actId==="act-2"?"Act II":"Act I"})}),s}function bl(e){const t=[];e&&((e.characters||[]).forEach(n=>{const o=typeof n=="string"?n:n.name||"";o&&t.push(o)}),(e.scenes||[]).forEach(n=>{(n.blocks||[]).forEach(o=>{o.type==="character"&&o.content&&t.push(o.content)})}));let s=na(t);if(s.length===0&&(e&&(e.id==="chronicles-of-dust"||e.title?.includes("Dust"))?s=["SANTHOSH","ARAVIND","KEVIN","MEERA"]:s=["SANTHOSH","ARAVIND"]),e&&(e.characters=s,e.id))try{localStorage.setItem(`scriptora_screenplay_${e.id}`,JSON.stringify(e))}catch{}return s.map(n=>{const o=n.toUpperCase();let a="Character";return o==="SANTHOSH"||o==="ARAVIND"||o==="KEVIN"?a="Protagonist":o==="MEERA"&&(a="Confidante"),{name:n,role:a}})}function ba(e,t=[]){const s=t.find(i=>Number(i.number)===Number(e))||{number:e,slugline:`SCENE ${e}`,act:e>24?"Act III":e>11?"Act II":"Act I"},n=s.slugline.replace(/^SCENE\s*\d+\s*·\s*/i,"").trim(),o=s.act||(e>24?"Act III":e>11?"Act II":"Act I"),a=Math.max(1,(s.number-1)*3+1),l=Math.min(4.5,Math.max(1.5,s.number*7%3+2)).toFixed(1);return Number(e)===18?{number:18,heading:"SCENE 18 · INT. CUSTOMS OFFICE - NIGHT",act:"Act II Midpoint",page:48,estMin:"3.5",meta:"Act II Midpoint · Pg 48 · ~3.5 min est.",purpose:"Kevin attempts to reroute the electrical relay before the surge floods the basement archives.",conflict:"Rising water breaches the junction box while automated emergency flood doors trigger lockouts, trapping him inside.",whatChanges:"Kevin cuts the emergency seal and refuses to sign the false manifest, irreversibly shifting from passive worker to active resistance.",synthesis:"Polarity shifts from cautious optimism (+1) to catastrophic physical trap and moral awakening (-2), marking the central pivot of the screenplay.",findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]}:Number(e)===1?{number:1,heading:`SCENE 01 · ${n||"INT. HOME - EVENING"}`,act:"Act I Opening",page:1,estMin:"2.0",meta:"Act I Opening · Pg 01 · ~2.0 min est.",purpose:"Establish opening character presence, environment, and initial psychological stakes.",conflict:"Tension and unspoken questions between characters as unfamiliar presence breaks routine.",whatChanges:"Ordinary state broken by unfamiliar arrival, creating the narrative catalyst for the journey.",synthesis:"Polarity shifts from neutral calm (0) to heightened curiosity and alertness (-1), establishing the dramatic question.",findings:[{scene:`SCENE 01 · ${n||"Opening"} · Pg 01`,act:"Act I Opening",title:"Establish protagonist baseline and primary premise",desc:"Opening visual dynamic introduces character motives before inciting conflict.",targetScene:1}]}:Number(e)===4?{number:4,heading:`SCENE 04 · ${n||"INT. PORT AUDIT ROOM - DAY"}`,act:"Act I",page:9,estMin:"2.5",meta:"Act I · Pg 09 · ~2.5 min est.",purpose:"Kevin audits cargo registry under pressure from superiors to overlook anomalies.",conflict:"Institutional compliance vs early ethical hesitation as signatures are demanded.",whatChanges:"Kevin stamps the manifest with reluctance, confirming his fatal flaw of institutional compliance.",synthesis:"Polarity shifts from hesitation (0) to moral compromise (-1), establishing the internal flaw to overcome.",findings:[{scene:"SCENE 04 · Port Audit · Pg 09",act:"Act I",title:"Fatal Flaw Demonstrated: Silent Compliance",desc:"Compliant stamp creates complicity guilt that fuels later revolt.",targetScene:4}]}:{number:e,heading:`SCENE ${String(e).padStart(2,"0")} · ${n||`INT. LOCATION ${e} - DAY`}`,act:o,page:a,estMin:l,meta:`${o} · Pg ${a} · ~${l} min est.`,purpose:`Execute narrative beat for ${n||`Scene ${e}`} and advance sequence trajectory.`,conflict:"Characters encounter rising resistance while navigating immediate beat obstacles.",whatChanges:"Beats shift character leverage, altering interpersonal dynamic and scene outcome.",synthesis:"Polarity turns decisively across the beat, transitioning the dramatic tension into the next sequence.",findings:[{scene:`SCENE ${String(e).padStart(2,"0")} · Pg ${a}`,act:o,title:`Scene ${e} Beat Dynamics`,desc:`Dramatic polarity progression in ${n||`Scene ${e}`} sustains narrative tempo.`,targetScene:e}]}}function ga(e,t){const s=rs(e||"SANTHOSH"),n=s.toUpperCase();let o=0;if(t&&Array.isArray(t.scenes)&&t.scenes.forEach(i=>{i.blocks&&i.blocks.some(r=>r.type==="character"&&rs(r.content)===n)&&o++}),n==="SANTHOSH")return{name:"SANTHOSH",role:"Protagonist",scenesCount:o>0?`${o} scenes tracked`:"36 scenes tracked",step1Title:"Silent Conviction & Initial Resistance",step1Tag:"Fatal Flaw",step1Range:"Beginning Beats",step1Desc:"Santhosh begins navigating intense internal conviction, wrestling with external constraints and uncovering initial stakes.",step2Title:"The Turning Point & Strategic Pivot",step2Tag:"Turning Point",step2Range:"Middle Beats (Midpoint)",step2Desc:"Santhosh breaks away from passive compromises, taking active control of the narrative direction under peak conflict.",step3Title:"Decisive Transformation & Resolution",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Santhosh embraces complete accountability and purpose, achieving an irreversible transformation through the climax.",synthesis:"Santhosh drives the core thematic arc of the story, transforming from cautious survival into an active, principled catalyst of change.",findings:[{scene:"SCENE 01 · Narrative Baseline · Pg 01",act:"Act I",title:"Fatal Flaw: Internal Hesitation",desc:"Santhosh operates with guarded vigilance before escalating pressures force decisive action.",targetScene:1},{scene:"SCENE 02 · The Turning Point · Pg 05",act:"Act II",title:"The Point of No Return",desc:"Santhosh takes a defining stance that permanently pivots interpersonal relationships and story stakes.",targetScene:2}]};if(n==="ARAVIND")return{name:"ARAVIND",role:"Protagonist",scenesCount:o>0?`${o} scenes tracked`:"32 scenes tracked",step1Title:"Guarded Precision & Calculated Loyalty",step1Tag:"Origin Stance",step1Range:"Beginning Beats",step1Desc:"Aravind maintains tactical focus and sharp perception, questioning surrounding motives and testing early alliances.",step2Title:"High-Stakes Partnership & Crucial Stand",step2Tag:"Midpoint Shift",step2Range:"Middle Beats (Midpoint)",step2Desc:"Aravind unites forces during the turning point, applying razor-sharp resolve to counter mounting narrative obstacles.",step3Title:"Decisive Breakthrough & Ultimate Climax",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Aravind executes the final breakthrough, sealing the resolution through steadfast commitment to the mission.",synthesis:"Aravind provides essential tactical momentum and intellectual force, elevating the stakes and cementing the dramatic payoff.",findings:[{scene:"SCENE 01 · Tactical Introduction · Pg 01",act:"Act I",title:"Strategic Presence & Foresight",desc:"Aravind introduces critical context and tactical perspective into the unfolding scenario.",targetScene:1},{scene:"SCENE 02 · Midpoint Crucible · Pg 06",act:"Act II",title:"Decisive Strategic Realignment",desc:"Aravind commits to the high-stakes confrontation that defines the story trajectory.",targetScene:2}]};if(n==="KEVIN")return{name:"Kevin",role:"Protagonist",scenesCount:o>0?`${o} scenes tracked`:"48 scenes tracked",step1Title:"Silent Compliance & Institutional Fear",step1Tag:"Fatal Flaw",step1Range:"Beginning · Scene 01–11",step1Desc:"Hesitant and guarded, Kevin stamps irregular manifests to keep peace with superiors and protect familial debt.",step2Title:"The Point of No Return",step2Tag:"Turning Point",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Cuts the emergency floodgate seal, actively defying union directives to prevent port catastrophe.",step3Title:"Selfless Moral Accountability",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Hands over the ledger to the public audit without demanding personal immunity, completing moral transformation.",synthesis:"The protagonist completes a verified 3-stage transformation: overcoming passivity at the midpoint and prioritizing moral duty over self-preservation in the climax.",findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]};if(n==="MEERA")return{name:"Meera",role:"Confidante",scenesCount:o>0?`${o} scenes tracked`:"22 scenes tracked",step1Title:"Vigilant Skepticism & Tactical Isolation",step1Tag:"Origin Stance",step1Range:"Beginning · Scene 01–12",step1Desc:"Operates independently along pipeline perimeters, skeptical of municipal regulators and trusting only raw field telemetry.",step2Title:"Calculated Alliance Under Pressure",step2Tag:"Partnership Beat",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Guides Kevin via comm-link to the breaker box, choosing to rely on his technical precision despite active security alarms.",step3Title:"Vindicated Shared Resistance",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Secures and broadcasts the telemetry leak to the public frequency, cementing alliance and exposing corporate monopoly.",synthesis:"The confidante evolves from protective cynicism to trusted partnership, providing the strategic resolve that enables the protagonist to act.",findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Tactical Caution & Guarded Insight",desc:"Meera warns Kevin of private security patrols monitoring pipeline telemetry.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Emergency Comm Guidance",desc:"Meera coordinates the junction box bypass before automated floodgates lock.",targetScene:18}]};const a=n==="KEVIN"||n==="SANTHOSH"||n==="ARAVIND"?"Protagonist":"Character",l=o>0?`${o} scenes tracked`:"Screenplay Character";return{name:s,role:a,scenesCount:l,step1Title:"Initial Presence & Motive Baseline",step1Tag:"Introduction",step1Range:"Beginning Beats",step1Desc:`${s} is introduced navigating personal priorities and reacting to the changing environment.`,step2Title:"Escalating Involvement in Narrative Stakes",step2Tag:"Midpoint Pressure",step2Range:"Middle Beats",step2Desc:`${s} faces direct conflict or shifting loyalties as pressure mounts across the sequence.`,step3Title:"Climactic Position & Resolution",step3Tag:"Resolution",step3Range:"Ending Beats",step3Desc:`${s} resolves their dramatic throughline, solidifying their standing in the story outcome.`,synthesis:`${s} contributes essential narrative pressure and perspective across their screenplay appearances.`,findings:[{scene:"SCENE 01 · Screenplay Beat · Pg 01",act:"Act I",title:`${s} Character Introduction`,desc:`Dialogue and action beats introduce ${s}'s voice and perspective.`,targetScene:1}]}}function gl(e,t,s={}){const n=t.pages||96,{availableScenes:o=[],currentSceneData:a={},availableChars:l=[],currentCharData:i={}}=s;switch(e){case"pacing":return`
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
      `;default:return""}}function hl(e="pacing",t=null,s=null){const n={...Hn[e]||Hn.pacing},o=sessionStorage.getItem("scriptora_prod_return");let a;try{const E=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;a=new URLSearchParams(E||"")}catch{a=new URLSearchParams}const l=t==="editor"||a.get("from")==="editor"||!!o,i=s||a.get("scriptId")||(o?o.replace("/editor/",""):null)||B.state.selectedScriptId||"chronicles-of-dust",r=`/editor/${i}`,f=i,p=B.state.scripts.find(E=>E.id===f)||B.state.activeScript||{title:"Chronicles of Dust",pages:96},d=fa(f),c=xa(d),m=bl(d),g=Number(B.state.currentSceneId||(c.find(E=>E.number===18)?18:c[0]?.number||1)),h=m[0]?.name||"Kevin",b=ba(g,c),y=ga(h,d);e==="scene"?(n.desc=`Micro-structure of Scene ${b.number}: Objective, obstacle, polarity change.`,n.findings=b.findings||n.findings):e==="character-arc"&&(n.findings=y.findings||n.findings);const P={availableScenes:c,currentSceneData:b,availableChars:m,currentCharData:y},S=t||a.get("from");let N="/intelligence/analysis";return l?N=r:S==="dashboard"||S==="/intelligence/dashboard"||S?.includes("/intelligence/dashboard")?N="/intelligence/dashboard":S&&S.startsWith("/")&&(N=S),`
    ${ct(l?"Editor":"Intelligence",n.title)}

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
            <span class="text-xs font-medium truncate max-w-[140px]">${p.title}</span>
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
            ${n.questions.map(E=>`
              <button type="button" class="query-pill shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors shadow-xs active:scale-95" data-query="${E}">
                ${E}
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
        ${gl(e,p,P)}

        <!-- 5. IMPORTANT FINDINGS (KEY SCENE FINDINGS) -->
        <div class="flex flex-col gap-3" id="analysis-findings-container">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">Key Scene Findings</span>
            <span id="findings-count-tag" class="text-[11px] text-slate-400 font-medium">${n.findings.length} findings tracked</span>
          </div>

          <div id="findings-list" class="flex flex-col gap-3">
            ${n.findings.map(E=>`
              <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${E.scene}</span>
                  <span class="text-[11px] font-medium text-slate-400">${E.act}</span>
                </div>
                <div class="flex flex-col">
                  <h3 class="text-xs sm:text-sm font-bold text-slate-900">${E.title}</h3>
                  <p class="text-xs text-slate-600 mt-1 leading-relaxed">${E.desc}</p>
                </div>
                <div class="pt-2 flex justify-end border-t border-slate-100">
                  <!-- 6. OPEN IN EDITOR BUTTON -->
                  <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${E.targetScene}">
                    <span class="material-symbols-outlined text-[15px]">edit_note</span>
                    <span>Open in Editor (Scene ${E.targetScene})</span>
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    </main>

    ${ot("intelligence")}
  `}function yl(e,t,s=null,n=null){const o=sessionStorage.getItem("scriptora_prod_return");let a;try{const N=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;a=new URLSearchParams(N||"")}catch{a=new URLSearchParams}const l=s==="editor"||a.get("from")==="editor"||!!o,r=n||a.get("scriptId")||(o?o.replace("/editor/",""):null)||B.state.selectedScriptId||"chronicles-of-dust",f=fa(r),p=xa(f),d=document.getElementById("analysis-back-btn");d&&(d.onclick=N=>{N.preventDefault(),l&&sessionStorage.removeItem("scriptora_prod_return"),window.scriptoraRouter?window.scriptoraRouter.back(backUrl):t(backUrl)});function c(){document.querySelectorAll(".btn-open-editor-scene").forEach(N=>{N.onclick=()=>{const E=N.getAttribute("data-scene");B.setState({currentSceneId:Number(E)}),w(`Jumping to Scene ${E} in Editor`),t(`/editor/${r}?scene=${E}`)}})}c();function m(N){const E=document.getElementById("findings-list"),j=document.getElementById("findings-count-tag");j&&(j.textContent=`${N.length} findings tracked`),E&&(E.innerHTML=N.map(T=>`
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
    `).join(""),c())}const g=document.getElementById("analysis-scene-selector");g&&(g.onchange=N=>{const E=parseInt(N.target.value,10);B.setState({currentSceneId:E});const j=ba(E,p),T=document.getElementById("target-scene-meta"),ce=document.getElementById("target-scene-heading"),te=document.getElementById("target-scene-purpose"),be=document.getElementById("target-scene-conflict"),W=document.getElementById("target-scene-what-changes"),Ee=document.getElementById("target-scene-synthesis"),ve=document.getElementById("analysis-header-desc");T&&(T.textContent=j.meta),ce&&(ce.textContent=j.heading),te&&(te.textContent=j.purpose),be&&(be.textContent=j.conflict),W&&(W.textContent=j.whatChanges),Ee&&(Ee.textContent=j.synthesis),ve&&(ve.textContent=`Micro-structure of Scene ${E}: Objective, obstacle, polarity change.`),m(j.findings),w(`Analyzing Scene ${E}`)});const h=document.getElementById("analysis-char-selector");h&&(h.onchange=N=>{const E=N.target.value,j=ga(E,f),T=document.getElementById("char-role-badge"),ce=document.getElementById("char-scenes-count"),te=document.getElementById("char-step1-range"),be=document.getElementById("char-step1-tag"),W=document.getElementById("char-step1-title"),Ee=document.getElementById("char-step1-desc"),ve=document.getElementById("char-step2-range"),Q=document.getElementById("char-step2-tag"),de=document.getElementById("char-step2-title"),Y=document.getElementById("char-step2-desc"),Se=document.getElementById("char-step3-range"),A=document.getElementById("char-step3-tag"),V=document.getElementById("char-step3-title"),Ne=document.getElementById("char-step3-desc"),ne=document.getElementById("char-synthesis-desc");T&&(T.textContent=j.role),ce&&(ce.textContent=j.scenesCount),te&&(te.textContent=j.step1Range),be&&(be.textContent=j.step1Tag),W&&(W.textContent=j.step1Title),Ee&&(Ee.textContent=j.step1Desc),ve&&(ve.textContent=j.step2Range),Q&&(Q.textContent=j.step2Tag),de&&(de.textContent=j.step2Title),Y&&(Y.textContent=j.step2Desc),Se&&(Se.textContent=j.step3Range),A&&(A.textContent=j.step3Tag),V&&(V.textContent=j.step3Title),Ne&&(Ne.textContent=j.step3Desc),ne&&(ne.textContent=j.synthesis),m(j.findings),w(`Switched active character focus to ${j.name}`)}),document.querySelectorAll("[data-jump-scene]").forEach(N=>{N.onclick=()=>{const E=N.getAttribute("data-jump-scene");B.setState({currentSceneId:Number(E)}),w(`Jumping to Scene ${E} in Editor`),t(`/editor/${r}?scene=${E}`)}});const b=document.getElementById("vector-ai-input"),y=document.getElementById("vector-ai-submit"),P=document.getElementById("vector-ai-answer");async function S(N){if(!N||!P)return;P.classList.remove("hidden"),P.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing narrative beats...</span>';const E=await ln(N,r);P.textContent=E}y&&b&&(y.onclick=()=>S(b.value.trim()),b.onkeydown=N=>{N.key==="Enter"&&S(b.value.trim())}),document.querySelectorAll(".query-pill").forEach(N=>{N.onclick=()=>{const E=N.getAttribute("data-query");b&&(b.value=E),S(E)}})}function vl(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=t||s.get("scriptId")||B.state.editorReturnScriptId||B.state.selectedScriptId||"chronicles-of-dust",a=n==="editor",l=a?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/workspace",i=B.state.scripts?.find(m=>m.id===o)||B.state.scripts?.[0]||{},r=B.state.currentUser||(()=>{try{const m=localStorage.getItem("scriptora_user");if(m)return JSON.parse(m)}catch{}return{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}}})(),f=B.state.settings||(()=>{try{const m=localStorage.getItem("scriptora_settings");if(m)return JSON.parse(m)}catch{}return{editor:{showSceneNumbers:!0,autoCapitalize:!0,autoTransition:!0,continueDialogue:!0,fontSize:"Courier Prime 12pt",autoSave:"Instant"},language:"English (US)",transliteration:!1,appearance:"Light",accentColor:"blue",fontScale:"Normal",notifications:{invites:!0,edits:!0,insights:!0,milestones:!0},intelligence:{deepAnalysis:!0,pacingAlerts:!0,dialogueScoring:!0,sensitivity:"Balanced"},privacy:{watermark:!0,encryption:!0}}})(),p=Array.isArray(B.state.scripts)?B.state.scripts.length:r.stats?.drafts??0,d=3,c=r.stats?.healthIndex||"98%";return`
    ${ct("Profile","Account & preferences.")}

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
              <span class="text-base font-bold text-slate-900 group-hover:text-blue-600 leading-tight font-heading">${p}</span>
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

    ${ot("profile")}
  `}function wl(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=t||n.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),a=s||n.get("scriptId")||B.state.editorReturnScriptId||B.state.selectedScriptId||"chronicles-of-dust",l=o==="editor",i=l?sessionStorage.getItem("scriptora_editor_return")||`/editor/${a}`:"/workspace",r=B.state.currentUser||(()=>{try{const C=localStorage.getItem("scriptora_user");if(C)return JSON.parse(C)}catch{}return{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",avatarColor:"bg-blue-600",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}}})(),f=document.getElementById("profile-bottom-return-btn");f&&(f.onclick=C=>{C.preventDefault(),sessionStorage.removeItem("scriptora_from_editor"),window.scriptoraRouter?window.scriptoraRouter.back(i):e(i)}),document.getElementById("stat-card-drafts")?.addEventListener("click",()=>{e("/workspace")}),document.getElementById("stat-card-coauthors")?.addEventListener("click",()=>{e(`/profile/collaborators${l?`?from=editor&scriptId=${a}`:""}`)}),document.getElementById("stat-card-health")?.addEventListener("click",()=>{e("/intelligence/dashboard")});const p=document.getElementById("settings-search-input");p&&(p.oninput=C=>{const R=C.target.value.toLowerCase().trim();let K=0;document.querySelectorAll("#settings-list .setting-item").forEach(ee=>{const fe=ee.textContent.toLowerCase().includes(R);ee.style.display=fe?"flex":"none",fe&&K++});const G=document.getElementById("no-settings-match");G&&(G.style.display=K===0?"block":"none")});function d(C){const R=`modal-setting-${C.replace("sheet-","")}`,K=document.getElementById(R);K&&pt(K)}function c(){document.querySelectorAll(".settings-modal").forEach(C=>{Be(C)})}document.querySelectorAll(".setting-item").forEach(C=>{C.onclick=()=>{const R=C.getAttribute("data-sheet");R&&d(R)}}),document.querySelectorAll(".close-setting-modal").forEach(C=>{C.onclick=c}),document.querySelectorAll(".settings-modal, #modal-edit-profile, #modal-security, #action-modal").forEach(C=>{C.onclick=R=>{R.target===C&&Be(C)}});function m(C){let R={};try{const G=localStorage.getItem("scriptora_settings");G&&(R=JSON.parse(G))}catch{}const K=C(R);return localStorage.setItem("scriptora_settings",JSON.stringify(K)),B.setState({settings:K}),eo(K).catch(()=>{}),K}const g=document.getElementById("btn-save-cfg-editor");g&&(g.onclick=()=>{const C=document.getElementById("cfg-editor-scenenums")?.checked??!0,R=document.getElementById("cfg-editor-autocap")?.checked??!0,K=document.getElementById("cfg-editor-contd")?.checked??!0,G=document.getElementById("cfg-editor-font")?.value||"Courier Prime 12pt",ee=document.getElementById("cfg-editor-autosave")?.value||"Instant";m(fe=>({...fe,editor:{...fe.editor||{},showSceneNumbers:C,autoCapitalize:R,continueDialogue:K,fontSize:G,autoSave:ee}})),localStorage.setItem("scriptora_autosave",ee==="Instant"?"true":"false");const ge=document.getElementById("desc-sheet-editor");ge&&(ge.textContent=`Numbers: ${C?"On":"Off"} · Auto-save: ${ee}`),c(),w("Editor preferences saved")});let h=B.state.settings?.language||"English (US)";document.querySelectorAll(".btn-lang-choice").forEach(C=>{C.onclick=()=>{h=C.getAttribute("data-lang"),document.querySelectorAll(".btn-lang-choice").forEach(R=>{R.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-slate-200 bg-white text-slate-800 hover:bg-slate-50"}),C.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const b=document.getElementById("btn-save-cfg-language");b&&(b.onclick=()=>{const C=document.getElementById("cfg-lang-translit")?.checked??!1;m(K=>({...K,language:h,transliteration:C}));const R=document.getElementById("desc-sheet-language");R&&(R.textContent=`${h}${C?" · Transliteration On":""}`),c(),w(`Language set to ${h}`)});let y=B.state.settings?.appearance||"Light";document.querySelectorAll(".btn-theme-choice").forEach(C=>{C.onclick=()=>{y=C.getAttribute("data-theme"),document.querySelectorAll(".btn-theme-choice").forEach(R=>{R.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}),C.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const P=document.getElementById("btn-save-cfg-appearance");P&&(P.onclick=()=>{const C=document.getElementById("cfg-app-scale")?.value||"Normal";m(K=>({...K,appearance:y,fontScale:C})),y==="Dark"?(document.documentElement.classList.add("dark"),localStorage.setItem("scriptora_theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("scriptora_theme","light"));const R=document.getElementById("desc-sheet-appearance");R&&(R.textContent=`${y} · Scale: ${C}`),c(),w(`Appearance updated: ${y}`)});const S=document.getElementById("btn-save-cfg-notifications");S&&(S.onclick=()=>{const C=document.getElementById("cfg-notif-invites")?.checked??!0,R=document.getElementById("cfg-notif-edits")?.checked??!0,K=document.getElementById("cfg-notif-insights")?.checked??!0,G=document.getElementById("cfg-notif-milestones")?.checked??!0,ee={invites:C,edits:R,insights:K,milestones:G};m(he=>({...he,notifications:ee}));const ge=Object.values(ee).filter(Boolean).length,fe=document.getElementById("desc-sheet-notifications");fe&&(fe.textContent=`${ge} alerts active`),c(),w("Notification preferences updated")});const N=document.getElementById("btn-save-cfg-intelligence");N&&(N.onclick=()=>{const C=document.getElementById("cfg-intel-deep")?.checked??!0,R=document.getElementById("cfg-intel-pacing")?.checked??!0,K=document.getElementById("cfg-intel-dialogue")?.checked??!0,G=document.getElementById("cfg-intel-sensitivity")?.value||"Balanced";m(ge=>({...ge,intelligence:{deepAnalysis:C,pacingAlerts:R,dialogueScoring:K,sensitivity:G}}));const ee=document.getElementById("desc-sheet-intelligence");ee&&(ee.textContent=`${C?"Deep Arc Diagnostics":"Standard"} · ${G}`),c(),w("Intelligence engine calibrated")});const E=document.getElementById("btn-save-cfg-privacy");E&&(E.onclick=()=>{const C=document.getElementById("cfg-priv-watermark")?.checked??!0,R=document.getElementById("cfg-priv-encrypt")?.checked??!0;m(G=>({...G,privacy:{watermark:C,encryption:R}}));const K=document.getElementById("desc-sheet-privacy");K&&(K.textContent=`${C?"Watermark On":"Standard"} · Local AES Encrypted`),c(),w("Privacy governance updated")});const j=document.getElementById("btn-export-portfolio-data");j&&(j.onclick=()=>{const C={exportedAt:new Date().toISOString(),user:B.state.currentUser,scripts:B.state.scripts,screenplay:B.state.screenplay,settings:B.state.settings},R=new Blob([JSON.stringify(C,null,2)],{type:"application/json"}),K=URL.createObjectURL(R),G=document.createElement("a");G.href=K,G.download=`scriptora_portfolio_backup_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(G),G.click(),document.body.removeChild(G),URL.revokeObjectURL(K),w("Portfolio archive downloaded successfully")});const T=document.getElementById("btn-force-cloud-sync");T&&(T.onclick=()=>{T.disabled=!0,T.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span><span>Synchronizing...</span>',setTimeout(()=>{T.disabled=!1,T.innerHTML='<span class="material-symbols-outlined text-[16px]">sync</span><span>Force Cloud Re-sync</span>';const C=document.getElementById("sync-status-msg");C&&(C.textContent=`Synchronized at ${new Date().toLocaleTimeString()}`),w("All screenplay drafts synchronized with cloud")},700)});const ce=document.getElementById("btn-clear-local-cache");ce&&(ce.onclick=()=>{sessionStorage.clear(),w("Temporary cache and diagnostic buffers cleared")});const te=document.getElementById("modal-edit-profile"),be=document.getElementById("trigger-modal-email"),W=document.getElementById("edit-avatar-btn"),Ee=document.getElementById("avatar-container-btn"),ve=document.getElementById("form-update-profile"),Q=document.getElementById("local-photo-input"),de=document.getElementById("btn-modal-upload-photo"),Y=document.getElementById("btn-modal-remove-photo");function Se(C){C?pt(te):Be(te)}be&&(be.onclick=()=>Se(!0)),Ee&&(Ee.onclick=()=>Se(!0)),W&&(W.onclick=C=>{C.stopPropagation(),Q&&Q.click()}),de&&(de.onclick=()=>{Q&&Q.click()}),document.querySelectorAll(".close-profile-modal").forEach(C=>C.onclick=()=>Se(!1)),Q&&(Q.onchange=C=>{const R=C.target.files?.[0];if(!R)return;if(!R.type.startsWith("image/")){w("Please select a valid image file (PNG, JPG, WEBP)");return}const K=new FileReader;K.onload=G=>{const ee=new Image;ee.onload=()=>{const ge=document.createElement("canvas"),fe=360;let he=ee.width,ke=ee.height;he>ke?he>fe&&(ke=Math.round(ke*fe/he),he=fe):ke>fe&&(he=Math.round(he*fe/ke),ke=fe),ge.width=he,ge.height=ke,ge.getContext("2d").drawImage(ee,0,0,he,ke);const Re=ge.toDataURL("image/jpeg",.88),L={...B.state.currentUser||r,avatarUrl:Re};B.setState({currentUser:L}),localStorage.setItem("scriptora_user",JSON.stringify(L)),zs({avatarUrl:Re}).catch(()=>{});const X=document.getElementById("user-avatar-circle");X&&(X.innerHTML=`<img id="user-avatar-img" src="${Re}" class="w-full h-full object-cover" alt="Profile" />`);const J=document.getElementById("modal-preview-avatar");J&&(J.innerHTML=`<img id="modal-preview-img" src="${Re}" class="w-full h-full object-cover" alt="Preview" />`),Y&&Y.classList.remove("hidden");const se=document.getElementById("header-profile-btn");se&&(se.innerHTML=`<img src="${Re}" class="w-full h-full object-cover" alt="Profile" />`),w("Profile picture updated successfully!")},ee.src=G.target.result},K.readAsDataURL(R),Q.value=""}),Y&&(Y.onclick=()=>{const R={...B.state.currentUser||r,avatarUrl:null};B.setState({currentUser:R}),localStorage.setItem("scriptora_user",JSON.stringify(R)),zs({avatarUrl:null}).catch(()=>{});const K=R.initials||"AK",G=document.getElementById("user-avatar-circle");G&&(G.innerHTML=`<span id="user-avatar-initials">${K}</span>`);const ee=document.getElementById("modal-preview-avatar");ee&&(ee.innerHTML=`<span id="modal-preview-initials">${K}</span>`),Y.classList.add("hidden");const ge=document.getElementById("header-profile-btn");ge&&(ge.innerHTML=`<span>${K}</span>`),w("Profile photo removed")});let A=r.avatarColor||"bg-blue-600";document.querySelectorAll(".prof-avatar-color-btn").forEach(C=>{C.onclick=()=>{A=C.getAttribute("data-color"),document.querySelectorAll(".prof-avatar-color-btn").forEach(R=>R.classList.remove("ring-2","ring-offset-2","ring-blue-600")),C.classList.add("ring-2","ring-offset-2","ring-blue-600")}}),ve&&(ve.onsubmit=async C=>{C.preventDefault();const R=document.getElementById("prof-input-name").value.trim(),K=document.getElementById("prof-input-headline").value.trim(),G=document.getElementById("prof-input-email").value.trim(),ee=R.split(/\s+/),ge=(ee[0]?.[0]||"A")+(ee[1]?.[0]||""),fe={...B.state.currentUser||r,name:R,displayName:R,headline:K,email:G,initials:ge.toUpperCase(),avatarColor:A};await zs(fe),B.setState({currentUser:fe});const he=document.getElementById("profile-display-name"),ke=document.getElementById("profile-display-headline"),_=document.getElementById("profile-display-email"),Re=document.getElementById("user-avatar-circle");he&&(he.textContent=R),ke&&(ke.textContent=K),_&&(_.textContent=G),Re&&!fe.avatarUrl&&(Re.innerHTML=`<span id="user-avatar-initials">${ge.toUpperCase()}</span>`,Re.className=`w-20 h-20 rounded-full ${A} text-white font-bold text-2xl flex items-center justify-center shadow-md overflow-hidden transition-transform active:scale-95 border-2 border-white ring-2 ring-slate-100`),Se(!1),w("Profile and account updated successfully")});const V=document.getElementById("modal-security"),Ne=document.getElementById("trigger-modal-password"),ne=document.getElementById("form-update-pw");function xe(C){C?pt(V):Be(V)}Ne&&(Ne.onclick=()=>xe(!0)),document.querySelectorAll(".close-security-modal").forEach(C=>C.onclick=()=>xe(!1)),document.querySelectorAll(".btn-toggle-pw").forEach(C=>{C.onclick=()=>{const R=C.getAttribute("data-target"),K=document.getElementById(R),G=C.querySelector(".material-symbols-outlined");K&&(K.type==="password"?(K.type="text",G&&(G.textContent="visibility_off")):(K.type="password",G&&(G.textContent="visibility")))}}),ne&&(ne.onsubmit=C=>{C.preventDefault(),document.getElementById("pw-input-current")?.value;const R=document.getElementById("pw-input-new")?.value,K=document.getElementById("pw-input-confirm")?.value,G=document.getElementById("pw-error-text");if(!R||R.length<6){G&&(G.textContent="New password must be at least 6 characters long.",G.classList.remove("hidden"));return}if(R!==K){G&&(G.textContent="New password and confirmation do not match.",G.classList.remove("hidden"));return}G&&G.classList.add("hidden"),xe(!1),w("Password updated securely"),ne.reset()});const I=document.getElementById("action-modal"),$e=document.getElementById("action-modal-title"),je=document.getElementById("action-modal-desc"),Pe=document.getElementById("action-modal-icon"),ae=document.getElementById("action-modal-icon-box"),re=document.getElementById("action-modal-confirm"),D=document.getElementById("action-modal-cancel"),Ce=document.getElementById("action-modal-input-wrap"),Oe=document.getElementById("action-modal-phrase-input"),pe=document.getElementById("action-modal-error");let Fe="signout",me=!1;function Ue(C){me=!1,Fe=C,re&&(re.disabled=!1,re.textContent=C==="signout"?"Sign Out":"Delete Forever"),D&&(D.disabled=!1),pe&&(pe.textContent="",pe.classList.add("hidden")),Oe&&(Oe.value=""),C==="signout"?($e.textContent="Sign Out",je.textContent="Are you sure you want to end your active session on this device? Unsaved changes in your draft have been synchronized.",Pe.textContent="logout",ae.className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center",re.className="flex-1 h-10 px-4 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 cursor-pointer transition-colors flex items-center justify-center gap-1.5",re.textContent="Sign Out",Ce&&Ce.classList.add("hidden")):($e.textContent="Delete Account",je.textContent="This action will permanently delete your account, private screenplays, versions, and production records. Authorized collaborators on shared scripts will retain access.",Pe.textContent="warning",ae.className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center",re.className="flex-1 h-10 px-4 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer transition-colors flex items-center justify-center gap-1.5",re.textContent="Delete Forever",Ce&&Ce.classList.remove("hidden")),pt(I),C==="delete"&&Oe&&setTimeout(()=>Oe.focus(),100)}function Me(){me=!1,re&&(re.disabled=!1),D&&(D.disabled=!1),Be(I)}const De=document.getElementById("btn-trigger-signout");De&&(De.onclick=()=>Ue("signout"));const U=document.getElementById("btn-trigger-delete-acc");U&&(U.onclick=()=>Ue("delete")),D&&(D.onclick=Me),re&&(re.onclick=async()=>{if(me)return;if(Fe==="delete"&&(Oe?.value||"").trim().toUpperCase()!=="DELETE MY ACCOUNT"){pe&&(pe.textContent='Please type "DELETE MY ACCOUNT" exactly to proceed with deletion.',pe.classList.remove("hidden")),Oe&&Oe.focus();return}me=!0,re.disabled=!0,D&&(D.disabled=!0);const C=re.textContent;re.innerHTML=`
        <span class="material-symbols-outlined text-[15px] animate-spin">refresh</span>
        <span>${Fe==="signout"?"Signing Out...":"Deleting Account..."}</span>
      `;try{if(Fe==="signout")await Yn(),B.resetUserSession(),window.scriptoraRouter?.clearHistory&&window.scriptoraRouter.clearHistory(),Be(I),w("Signed out of Scriptora"),e("/auth",!0);else{const R=(Oe?.value||"").trim(),K=await Ma(R);B.resetUserSession(),window.scriptoraRouter?.clearHistory&&window.scriptoraRouter.clearHistory(),Be(I),w(K.message||"Account deleted successfully"),e("/auth",!0)}}catch(R){pe&&(pe.textContent=R.message||"Operation failed. Please try again.",pe.classList.remove("hidden")),w(R.message||"Action failed","error")}finally{me=!1,re&&(re.disabled=!1,re.textContent=C),D&&(D.disabled=!1)}})}function Sl(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=t||s.get("scriptId")||B.state.editorReturnScriptId||B.state.selectedScriptId||"chronicles-of-dust",a=n==="editor",l=a?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/profile",i=B.state.scripts.find(r=>r.id===o)||B.state.scripts[0]||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",joinCode:"A7K9-XP42"};return`
    ${ct("Profile","Collaborators")}

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
            ${B.state.scripts.map(r=>`
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

    ${ot("profile")}
  `}function El(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=t||n.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),a=s||n.get("scriptId")||B.state.editorReturnScriptId||B.state.selectedScriptId||"chronicles-of-dust",l=o==="editor",i=l?sessionStorage.getItem("scriptora_editor_return")||`/editor/${a}`:"/profile",r=document.getElementById("collab-back-btn");r&&(r.onclick=Q=>{Q.preventDefault(),l&&sessionStorage.removeItem("scriptora_from_editor"),window.scriptoraRouter?window.scriptoraRouter.back(i):e(i)});const f=document.getElementById("collab-bottom-return-btn");f&&(f.onclick=Q=>{Q.preventDefault(),l&&sessionStorage.removeItem("scriptora_from_editor"),window.scriptoraRouter?window.scriptoraRouter.back(i):e(i)});let p="A7K9-XP42";async function d(){const Q=await Ga(a),de=document.getElementById("collaborators-list");if(de){if(Q.length===0){de.innerHTML='<div class="p-4 text-center text-xs text-slate-400">No external collaborators yet. Share your join code to invite teammates.</div>';return}de.innerHTML=Q.map(Y=>`
      <div class="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
        <div class="flex items-center gap-3 min-w-0 pr-2">
          <div class="w-9 h-9 rounded-full ${Y.avatarBg||"bg-blue-100 text-blue-700"} flex items-center justify-center font-bold text-xs shrink-0">
            ${Y.initials}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-slate-900 truncate">${Y.name}</span>
            <span class="text-[11px] text-slate-500 truncate">${Y.email}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">${Y.role}</span>
          <button class="remove-collab-btn text-slate-400 hover:text-red-600 p-1" data-id="${Y.id}" title="Remove access">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".remove-collab-btn").forEach(Y=>{Y.onclick=async()=>{const Se=Y.getAttribute("data-id");confirm("Remove collaborator access for this user?")&&(await Ka(a,Se),w("Collaborator access removed"),d())}})}}d();const c=document.getElementById("projectSelectBtn"),m=document.getElementById("projectDropdown");let g=null;c&&m&&(g=sa(c,m,{placement:"bottom-start"})),document.querySelectorAll(".switch-script-opt").forEach(Q=>{Q.onclick=()=>{const de=Q.getAttribute("data-id");B.selectScript(de),g?.close(),e(`/profile/collaborators${l?`?from=editor&scriptId=${de}`:""}`)}});const h=document.getElementById("openInviteBtn"),b=document.getElementById("closeInviteBtn"),y=document.getElementById("inviteCard"),P=document.getElementById("sendInviteBtn");h&&(h.onclick=()=>y?.classList.remove("hidden")),b&&(b.onclick=()=>y?.classList.add("hidden")),P&&(P.onclick=async()=>{const Q=document.getElementById("inviteEmailInput")?.value.trim(),de=document.querySelector('input[name="inviteRole"]:checked')?.value||"editor";Q&&(await Wa(a,{email:Q,role:de}),w(`Invited ${Q} as ${de}`),y?.classList.add("hidden"),d())});const S=document.getElementById("tabGenCodeBtn"),N=document.getElementById("tabEnterCodeBtn"),E=document.getElementById("paneGenerateCode"),j=document.getElementById("paneEnterCode");S&&(S.onclick=()=>{S.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",N.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",E?.classList.remove("hidden"),j?.classList.add("hidden")}),N&&(N.onclick=()=>{N.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs",S.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900",j?.classList.remove("hidden"),E?.classList.add("hidden")});const T=document.getElementById("copyJoinCodeBtn"),ce=document.getElementById("copyJoinCodeLabel");T&&(T.onclick=()=>{const Q=document.getElementById("displayJoinCode")?.textContent||p;navigator.clipboard?.writeText(Q),ce.textContent="Copied!",setTimeout(()=>{ce.textContent="Copy"},1800),w(`Copied code: ${Q}`)});const te=document.getElementById("regenJoinCodeBtn");te&&(te.onclick=async()=>{const Q=await Ja(a);p=Q;const de=document.getElementById("displayJoinCode");de&&(de.textContent=Q),w(`Generated new join code: ${Q}`)});const be=document.getElementById("verifyCodeBtn"),W=document.getElementById("joinCodeInput"),Ee=document.getElementById("joinCodeResultCard"),ve=document.getElementById("confirmJoinScriptBtn");W&&(W.oninput=Q=>{let de=Q.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"");de.length>4&&(de=de.slice(0,4)+"-"+de.slice(4,8)),Q.target.value=de}),be&&W&&(be.onclick=async()=>{const Q=W.value.trim();if(!Q)return;be.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>';const de=await Ya(Q);be.innerHTML="<span>Verify</span>",de.valid?(Ee?.classList.remove("hidden"),document.getElementById("verifiedScriptTitle").textContent=de.script.title,document.getElementById("verifiedScriptFormat").textContent=`${de.script.format} · ${de.script.pages} pages`,w("Valid join code")):(Ee?.classList.add("hidden"),w("Invalid or expired join code","error"))}),ve&&W&&(ve.onclick=async()=>{const Q=W.value.trim();await Xa(Q),w("Successfully joined screenplay workspace!"),e("/workspace")})}function kl(){return B.state.currentUser?.initials,`
    <div class="flex flex-col min-h-screen bg-surface w-full relative">
      ${ct("Notifications","Activity")}

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

      ${ot("workspace")}
    </div>
  `}function Il(e){const t=document.getElementById("btn-back-notif");t&&(t.onclick=()=>{if(window.scriptoraRouter)window.scriptoraRouter.back("/workspace");else{const c=B.getPreviousRoute("/workspace");e(c)}});let s="all",n="normal",o=[];async function a(){const c=document.getElementById("notif-feed-container");if(!c)return;if(n==="loading"){c.innerHTML=`
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
      `,document.getElementById("btn-retry-sync")?.addEventListener("click",()=>{n="normal",a()});return}if(o=(await Xn()).notifications||[],n==="empty"||s==="unread"&&o.filter(S=>S.unread).length===0){c.innerHTML=`
        <div class="p-8 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center text-center gap-2">
          <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <h3 class="font-bold text-sm text-slate-900">You’re all caught up!</h3>
          <p class="text-xs text-slate-500 max-w-xs">No pending notifications or requests requiring your review.</p>
        </div>
      `;return}const g=o.filter(S=>S.unread).length;document.getElementById("badge-all-count").textContent=o.length,document.getElementById("badge-unread-count").textContent=g,B.setState({unreadNotifications:g});let h=o;s==="unread"&&(h=h.filter(S=>S.unread));const b=h.filter(S=>S.group==="today"),y=h.filter(S=>S.group!=="today");function P(S,N){return N.length===0?"":`
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-xs font-bold text-slate-400 tracking-wider uppercase font-heading">${S}</h2>
          </div>
          <div class="flex flex-col gap-2">
            ${N.map(E=>`
              <div class="notif-row relative flex items-start gap-3 p-3.5 rounded-xl bg-white border ${E.unread?"border-l-4 border-l-blue-600 border-slate-200/80 shadow-xs":"border-slate-200/60 opacity-80"} hover:shadow-sm transition-all cursor-pointer" data-id="${E.id}" data-route="${E.actionRoute}">
                <div class="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                  ${E.sender.startsWith("icon:")?`<span class="material-symbols-outlined text-[18px] text-blue-600">${E.sender.replace("icon:","")}</span>`:E.sender}
                </div>
                <div class="flex flex-col flex-1 min-w-0">
                  <div class="flex items-baseline justify-between gap-2">
                    <h3 class="text-xs font-bold text-slate-900 truncate">${E.title}</h3>
                    <span class="text-[10px] text-slate-400 shrink-0">${E.time}</span>
                  </div>
                  <p class="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">${E.body}</p>
                  <div class="mt-2 flex items-center gap-1.5 flex-wrap">
                    ${(E.tags||[]).map(j=>`<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">${j}</span>`).join("")}
                    <span class="text-blue-600 text-[11px] font-semibold ml-auto">${E.actionLabel||"View →"}</span>
                  </div>
                </div>
                ${E.unread?'<div class="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1"></div>':""}
              </div>
            `).join("")}
          </div>
        </div>
      `}c.innerHTML=P("Today",b)+P("Earlier",y),document.querySelectorAll(".notif-row").forEach(S=>{S.onclick=async()=>{const N=parseInt(S.getAttribute("data-id")),E=S.getAttribute("data-route");await Za(N),await B.refreshNotifications(),E?e(E):a()}})}a();const l=document.getElementById("filter-all-btn"),i=document.getElementById("filter-unread-btn");l&&(l.onclick=()=>{s="all",l.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",i.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",a()}),i&&(i.onclick=()=>{s="unread",i.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",l.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",a()});const r=document.getElementById("btn-mark-all-read");r&&(r.onclick=async()=>{await Qa(),await B.refreshNotifications(),w("All notifications marked as read"),a()});const f=document.getElementById("btn-toggle-sim"),p=document.getElementById("sim-menu-dropdown");let d=null;f&&p&&(d=sa(f,p,{placement:"bottom-end"})),document.querySelectorAll(".sim-opt").forEach(c=>{c.onclick=()=>{n=c.getAttribute("data-state"),d?.close(),a(),w(`Simulating ${n} state`)}})}function Cl(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from"),o=t||s.get("scriptId")||B.state.selectedScriptId||"chronicles-of-dust",a=n==="editor"||n&&n.startsWith("/editor");a?sessionStorage.getItem("scriptora_prod_return")||(n&&n.startsWith("/editor")||`${o}`):n&&n.startsWith("/");let l=null;if(window.scriptoraRouter){const r=window.scriptoraRouter.peekPreviousRoute?.();r&&(l=window.scriptoraRouter.getRouteLabel(r))}a||l||n?.includes("/intelligence");const i=B.state.scripts?.find(r=>r.id===o)||B.state.scripts?.[0]||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2"};return`
    <!-- Standard App Header -->
    ${ct("Pre-Production","Production Tools")}

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
                ${B.state.scripts&&B.state.scripts.length>0?B.state.scripts.map(r=>`
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
    ${ot("production")}
  `}async function Al(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||B.state.selectedScriptId||"chronicles-of-dust",a=document.getElementById("production-back-btn");a&&(a.onclick=()=>{window.scriptoraRouter?window.scriptoraRouter.back("/workspace"):e("/workspace")});const l=document.getElementById("prod-script-select");l&&(l.onchange=d=>{const c=d.target.value;B.setState({selectedScriptId:c}),e(`/production?scriptId=${c}`)});const i=document.getElementById("btn-repin-source");i&&(i.onclick=async()=>{const d="Draft 4.3";await no(o,d),document.getElementById("source-version-alert")?.classList.add("hidden");const c=document.getElementById("pinned-version-label");c&&(c.textContent=`${d} (Pinned)`),w(`Pinned source updated to ${d}`)});const r=document.getElementById("btn-dismiss-staleness");r&&(r.onclick=()=>{document.getElementById("source-version-alert")?.classList.add("hidden"),w("Retained Draft 4.2 pinned baseline")});const f=`/production?scriptId=${o}`,p={"script-breakdown":`/production/breakdown?scriptId=${o}&from=${encodeURIComponent(f)}`,"shooting-schedule":`/production/schedule?scriptId=${o}&from=${encodeURIComponent(f)}`,"call-sheets":`/production/call-sheets?scriptId=${o}&from=${encodeURIComponent(f)}`,"dialogue-sheets":`/production/dialogue-sides?scriptId=${o}&from=${encodeURIComponent(f)}`,"storyboard-studio":`/production/storyboard?scriptId=${o}&from=${encodeURIComponent(f)}`};document.querySelectorAll(".tool-card").forEach(d=>{d.onclick=()=>{const c=d.getAttribute("data-tool");p[c]&&e(p[c])}})}function $l(){const e=B.state.selectedScriptId||"chronicles-of-dust",t=B.state.scripts?.find(s=>s.id===e)||{title:"Chronicles of Dust",draft:"Draft 4.2"};return`
    <div class="fixed inset-0 bg-surface flex flex-col font-body text-slate-800 select-none overflow-hidden">
      <!-- Standard Header (Fixed Top) -->
      ${ct("AI Chat","Universal Assistant")}

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
      ${ot("chat")}
    </div>
  `}function Bl(e){const t=document.getElementById("chat-input"),s=document.getElementById("chat-send-btn"),n=document.getElementById("chat-messages-container"),o=document.getElementById("btn-clear-chat"),a=document.getElementById("chat-back-btn"),l=document.querySelectorAll(".chat-chip"),i=B.state.selectedScriptId||"chronicles-of-dust";a&&(a.onclick=()=>{window.scriptoraRouter?window.scriptoraRouter.back("/workspace"):e("/workspace")});const r=localStorage.getItem("scriptora_chat_history");if(r)try{JSON.parse(r).forEach(c=>f(c.role,c.text,!1))}catch{}t&&t.addEventListener("input",()=>{t.style.height="auto",t.style.height=Math.min(t.scrollHeight,96)+"px"});function f(d,c,m=!0){if(!n)return;const g=d==="user",h=document.createElement("div");if(h.className=`flex items-start gap-2.5 max-w-[88%] ${g?"self-end flex-row-reverse":""}`,h.innerHTML=`
      <div class="w-7 h-7 rounded-lg ${g?"bg-slate-800":"bg-blue-600"} text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
        <span class="material-symbols-outlined text-[15px]">${g?"person":"chat_bubble_outline"}</span>
      </div>
      <div class="${g?"bg-blue-600 text-white rounded-2xl rounded-tr-xs":"bg-white text-slate-700 border border-slate-200/90 rounded-2xl rounded-tl-xs"} p-3.5 shadow-2xs flex flex-col gap-1 text-xs leading-relaxed">
        <div class="flex items-center justify-between gap-4 font-semibold ${g?"text-blue-100":"text-slate-900"} text-[11px]">
          <span>${g?"You":"Scriptora Universal AI"}</span>
          <span class="${g?"text-blue-200":"text-slate-400"} font-normal text-[10px]">Now</span>
        </div>
        <div class="whitespace-pre-wrap">${c}</div>
      </div>
    `,n.appendChild(h),n.scrollTop=n.scrollHeight,m)try{const b=JSON.parse(localStorage.getItem("scriptora_chat_history")||"[]");b.push({role:d,text:c,timestamp:new Date().toISOString()}),localStorage.setItem("scriptora_chat_history",JSON.stringify(b.slice(-30)))}catch{}}async function p(){if(!t)return;const d=t.value.trim();if(!d)return;f("user",d,!0),t.value="",t.style.height="auto";const c=document.createElement("div");c.className="flex items-center gap-2 text-xs text-slate-400 py-1 pl-9 italic",c.innerHTML=`
      <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
      <span>Reviewing screenplay context & production model...</span>
    `,n.appendChild(c),n.scrollTop=n.scrollHeight;try{const m=await ln(d,i);c.remove();let g=m;d.toLowerCase().includes("call sheet")?g=`📋 **Call Sheet Preparation (Draft 4.2)**
For Day 1 (Scenes 1 & 2 at Gate 4 Exterior):
• General Call: 06:30 AM (Sunrise lighting window)
• Key Talent: Kevin (Ready by 07:15 AM)
• Picture Vehicle: Solar Patrol Rover standby at staging area
• Nearest Emergency Medical Facility: Ridgecrest Regional Hospital (22 mins)`:d.toLowerCase().includes("practical")||d.toLowerCase().includes("element")?g=`🎬 **Practical Elements Breakdown (Scene 18)**
• Location: Pumping Station Chamber B (Interior / Echo Dampened)
• Special Prop: Hydraulic Bypass Valve Kit (LED pressure indicator)
• SFX Note: Pressurized vapor release standby
• Cast Involved: Kevin, Meera`:(d.toLowerCase().includes("storyboard")||d.toLowerCase().includes("camera"))&&(g=`🎨 **Visual Storyboard Concept (Lakebed Standoff)**
• Shot 1: Ultra-wide 2.39:1 anamorphic establishing shot across cracked earth.
• Shot 2: Low-angle tracking shot on Kevin as dust storm gathers.
• Shot 3: Dutch angle close-up on the pressure gauge as manifold fails.
*(Detailed shot canvas will be available in Storyboard Studio Prompt 3)*`),f("assistant",g,!0)}catch{c.remove(),f("assistant","I analyzed your request against the active screenplay context. Pacing and scene logistics align with Draft 4.2 standards.",!0)}}s&&(s.onclick=p),t&&(t.onkeydown=d=>{d.key==="Enter"&&!d.shiftKey&&(d.preventDefault(),p())}),l.forEach(d=>{d.onclick=()=>{const c=d.getAttribute("data-prompt");t&&(t.value=c,p())}}),o&&(o.onclick=()=>{localStorage.removeItem("scriptora_chat_history"),n.innerHTML=`
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
      `})}function As(e,t="tune",s=null,n="",o=null,a=null){const i=new URLSearchParams(window.location.search||"").get("from");return`
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
  `}function ha(e){return e?String(e).replace(/\u00B0/g," deg ").replace(/\u00BD/g," 1/2").replace(/\u00BC/g," 1/4").replace(/\u00BE/g," 3/4").replace(/\u215B/g," 1/8").replace(/\u215C/g," 3/8").replace(/\u215D/g," 5/8").replace(/\u215E/g," 7/8").replace(/\u00A0/g," ").replace(/[\t]+/g," ").replace(/\u2014/g," -- ").replace(/\u2013/g,"-").replace(/\u2026/g,"...").replace(/[\u201C\u201D]/g,'"').replace(/[\u2018\u2019]/g,"'").replace(/\u00B7/g," - ").replace(/\u2022/g,"* ").replace(/\u2192/g,"->").replace(/\u2190/g,"<-").replace(/[^\x20-\x7E]/g," ").replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/[\r\n]+/g," "):""}function yt(e,t=10,s="F1"){if(!e)return 0;const n=String(e),o=s==="F2"||s==="F4"?.56:s==="F3"||s==="F5"?.6:.52;return n.length*t*o}function at(e,t,s=10,n="F1"){if(!e)return"";const o=String(e).trim();if(yt(o,s,n)<=t)return o;const a="...",l=yt(a,s,n);let i=o;for(;i.length>0&&yt(i,s,n)+l>t;)i=i.slice(0,-1);return i?i.trim()+a:""}function xs(e,t,s=10,n="F1"){if(!e)return[];const o=String(e).split(/\s+/).filter(Boolean);if(o.length===0)return[];const a=[];let l="";for(const i of o){const r=l?l+" "+i:i;yt(r,s,n)<=t?l=r:(l&&a.push(l),yt(i,s,n)>t?(a.push(at(i,t,s,n)),l=""):l=i)}return l&&a.push(l),a}function ls(e,t){if(!e)return[];const s=String(e).split(/\s+/),n=[];let o="";for(const a of s)o?o.length+1+a.length<=t?o+=" "+a:(n.push(o),o=a):o=a;return o&&n.push(o),n}function cs(e,t){if(!e||!(e instanceof Blob))throw new Error("Invalid PDF blob received for download");const s=URL.createObjectURL(e),n=document.createElement("a");n.style&&(n.style.display="none"),n.href=s,n.download=t||"document.pdf",document.body.appendChild(n),n.click(),setTimeout(()=>{try{n.parentNode&&n.parentNode.removeChild(n),URL.revokeObjectURL(s)}catch{}},4e3)}function ds(e,t={}){const s=t.pageWidth||612,n=t.pageHeight||792,o=e.length,a=[];let l=0;function i(){return++l}const r=i(),f=i(),p=[];for(let T=0;T<o;T++)p.push(i());const d={F1:i(),F2:i(),F3:i(),F4:i(),F5:i(),F6:i()},c=[];for(let T=0;T<o;T++)c.push(i());a[r]=`<< /Type /Catalog /Pages ${f} 0 R >>`,a[f]=`<< /Type /Pages /Kids [${p.map(T=>`${T} 0 R`).join(" ")}] /Count ${o} >>`,a[d.F1]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",a[d.F2]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",a[d.F3]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>",a[d.F4]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>",a[d.F5]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Oblique /Encoding /WinAnsiEncoding >>",a[d.F6]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>";const m=`<< /F1 ${d.F1} 0 R /F2 ${d.F2} 0 R /F3 ${d.F3} 0 R /F4 ${d.F4} 0 R /F5 ${d.F5} 0 R /F6 ${d.F6} 0 R >>`,g=new TextEncoder;for(let T=0;T<o;T++){a[p[T]]=`<< /Type /Page /Parent ${f} 0 R /MediaBox [0 0 ${s} ${n}] /Contents ${c[T]} 0 R /Resources << /Font ${m} >> >>`;const ce=e[T]||{};let te="";if(ce.vectors&&ce.vectors.length)for(const W of ce.vectors)W.type==="rect"?(W.fill&&(te+=`${W.fill[0].toFixed(3)} ${W.fill[1].toFixed(3)} ${W.fill[2].toFixed(3)} rg
`,te+=`${W.x.toFixed(2)} ${W.y.toFixed(2)} ${W.w.toFixed(2)} ${W.h.toFixed(2)} re
f
`),W.stroke&&(te+=`${W.stroke[0].toFixed(3)} ${W.stroke[1].toFixed(3)} ${W.stroke[2].toFixed(3)} RG
`,te+=`${(W.lineWidth||1).toFixed(2)} w
`,te+=`${W.x.toFixed(2)} ${W.y.toFixed(2)} ${W.w.toFixed(2)} ${W.h.toFixed(2)} re
S
`)):W.type==="line"&&(te+=`${(W.stroke||[0,0,0])[0].toFixed(3)} ${(W.stroke||[0,0,0])[1].toFixed(3)} ${(W.stroke||[0,0,0])[2].toFixed(3)} RG
`,te+=`${(W.lineWidth||1).toFixed(2)} w
`,te+=`${W.x1.toFixed(2)} ${W.y1.toFixed(2)} m ${W.x2.toFixed(2)} ${W.y2.toFixed(2)} l S
`);if(ce.texts&&ce.texts.length)for(const W of ce.texts){const Ee=W.font||"F1",ve=W.size||10,Q=W.color||[.1,.1,.1],de=ha(W.text);te+=`BT
`,te+=`/${Ee} ${ve} Tf
`,te+=`${Q[0].toFixed(3)} ${Q[1].toFixed(3)} ${Q[2].toFixed(3)} rg
`,te+=`1 0 0 1 ${W.x.toFixed(2)} ${W.y.toFixed(2)} Tm
`,te+=`(${de}) Tj
`,te+=`ET
`}const be=g.encode(te);a[c[T]]=`<< /Length ${be.length} >>
stream
${te}endstream`}const b=g.encode(`%PDF-1.4
%âãÏÓ
`);let y=b.length;const P=[],S=[];for(let T=1;T<=l;T++){P[T]=y;const ce=`${T} 0 obj
${a[T]}
endobj
`,te=g.encode(ce);S.push(te),y+=te.length}const N=y;let E=`xref
0 ${l+1}
0000000000 65535 f 
`;for(let T=1;T<=l;T++)E+=`${String(P[T]).padStart(10,"0")} 00000 n 
`;E+=`trailer
<< /Size ${l+1} /Root ${r} 0 R >>
startxref
${N}
%%EOF`;const j=g.encode(E);return new Blob([b,...S,j],{type:"application/pdf"})}function Un(e={},t={}){const s=t.title||"Chronicles of Dust",n=t.company||"SCRIPTORA PRODUCTION STUDIO",o=t.draft||"Draft 4.2 (Pinned)",a=String(e.callSheetNumber||"01").padStart(2,"0"),l=e.shootDay||`Day ${parseInt(a,10)||1} of 14`,i=e.status==="Confirmed"||e.isPublished,r=[];let f=[],p=[];const d=36,c=576,m=540,g=56;function h(me=!1){if(f=[],p=[],r.push({vectors:f,texts:p}),me){f.push({type:"rect",x:d,y:730,w:m,h:26,fill:[.08,.12,.2]}),p.push({text:"SCRIPTORA -- OFFICIAL CALL SHEET (CONTINUED)",x:d+10,y:739,font:"F2",size:9,color:[.95,.95,.95]});const De=`${s.toUpperCase()} · ${l.toUpperCase()}`;return p.push({text:De,x:c-10-yt(De,8,"F1"),y:739,font:"F1",size:8,color:[.7,.82,1]}),718}return 756}let b=h(!1);const y=44;f.push({type:"rect",x:d,y:b-y,w:m,h:y,fill:[.08,.12,.2]}),p.push({text:"SCRIPTORA -- OFFICIAL PRODUCTION CALL SHEET",x:d+12,y:b-17,font:"F2",size:10,color:[.96,.97,.98]});const P=at(`${n.toUpperCase()} · ${s.toUpperCase()} · ${o}`,320,8.5,"F1");p.push({text:P,x:d+12,y:b-32,font:"F1",size:8.5,color:[.65,.78,.98]});const S=`DAY ${a} CALL SHEET`;p.push({text:S,x:c-12-yt(S,11,"F2"),y:b-17,font:"F2",size:11,color:[1,1,1]});const N=i?"OFFICIAL PUBLISHED SNAPSHOT":"WORKING REVISION DRAFT",E=i?[.45,.9,.55]:[1,.82,.35];p.push({text:N,x:c-12-yt(N,7.5,"F2"),y:b-32,font:"F2",size:7.5,color:E}),b-=y+8;const j=52;f.push({type:"rect",x:d,y:b-j,w:m,h:j,fill:[.975,.985,.995],stroke:[.82,.86,.91],lineWidth:.8});const T=135,ce=b-14,te=b-29,be=b-43;p.push({text:"DATE & DAY",x:d+10,y:ce,font:"F2",size:7.5,color:[.42,.47,.55]}),p.push({text:at(e.shootDate||"Saturday, Oct 24, 2026",118,9.5,"F2"),x:d+10,y:te,font:"F2",size:9.5,color:[.1,.12,.16]}),p.push({text:at(l,118,7.5,"F1"),x:d+10,y:be,font:"F1",size:7.5,color:[.42,.47,.55]}),f.push({type:"line",x1:d+T,y1:b-46,x2:d+T,y2:b-6,stroke:[.85,.88,.92],lineWidth:.6});const W=d+T+10;p.push({text:"GENERAL CREW CALL",x:W,y:ce,font:"F2",size:7.5,color:[.42,.47,.55]}),p.push({text:at(e.generalCrewCall||"06:00 AM",118,11.5,"F2"),x:W,y:te,font:"F2",size:11.5,color:[.1,.12,.16]}),p.push({text:at(`Breakfast: ${e.breakfastTime||"05:15 AM"}`,118,7.5,"F1"),x:W,y:be,font:"F1",size:7.5,color:[.42,.47,.55]}),f.push({type:"line",x1:d+T*2,y1:b-46,x2:d+T*2,y2:b-6,stroke:[.85,.88,.92],lineWidth:.6});const Ee=d+T*2+10;p.push({text:"SHOOTING CALL",x:Ee,y:ce,font:"F2",size:7.5,color:[.1,.38,.85]}),p.push({text:at(e.shootingCall||"06:30 AM",118,11.5,"F2"),x:Ee,y:te,font:"F2",size:11.5,color:[.1,.38,.85]}),p.push({text:"First Shot on Set",x:Ee,y:be,font:"F1",size:7.5,color:[.42,.47,.55]}),f.push({type:"line",x1:d+T*3,y1:b-46,x2:d+T*3,y2:b-6,stroke:[.85,.88,.92],lineWidth:.6});const ve=d+T*3+10;p.push({text:"ESTIMATED WRAP",x:ve,y:ce,font:"F2",size:7.5,color:[.42,.47,.55]}),p.push({text:at(e.estimatedWrap||"06:30 PM",118,11.5,"F2"),x:ve,y:te,font:"F2",size:11.5,color:[.1,.12,.16]}),p.push({text:"12-Hr Rest Turnaround",x:ve,y:be,font:"F1",size:7.5,color:[.42,.47,.55]}),b-=j+8;const Q=62;f.push({type:"rect",x:d,y:b-Q,w:m,h:Q,fill:[1,1,1],stroke:[.82,.86,.91],lineWidth:.8});const de=d+10;p.push({text:"SET LOCATION & BASECAMP ACCESS:",x:de,y:b-13,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:at(e.locationName||"Mojave Outpost Gate 4",280,8.5,"F2"),x:de,y:b-25,font:"F2",size:8.5,color:[.1,.12,.16]}),p.push({text:at(e.locationAddress||"Perimeter Road 9, Cantil, CA",280,7.5,"F1"),x:de,y:b-37,font:"F1",size:7.5,color:[.35,.4,.48]}),p.push({text:at(`Parking: ${e.parkingNotes||"Basecamp Lot B. Crew shuttle runs every 10 mins."}`,280,7,"F1"),x:de,y:b-49,font:"F1",size:7,color:[.45,.5,.58]}),f.push({type:"line",x1:d+300,y1:b-56,x2:d+300,y2:b-6,stroke:[.85,.88,.92],lineWidth:.6});const Y=d+310;p.push({text:"EMERGENCY MEDICAL / NEAREST HOSPITAL:",x:Y,y:b-13,font:"F2",size:7.5,color:[.85,.15,.15]});const Se=xs(e.nearestHospital||"Desert Care Regional Medical Center (Ph: 760-379-2681)",220,7,"F1");p.push({text:at(Se[0]||"Local Emergency Center",220,7,"F1"),x:Y,y:b-24,font:"F1",size:7,color:[.15,.15,.15]}),Se[1]&&p.push({text:at(Se[1],220,7,"F1"),x:Y,y:b-34,font:"F1",size:7,color:[.15,.15,.15]});const A=at(`Weather: ${e.weatherSummary||"Clear skies, normal stage ambient temperature."}`,220,7,"F1");p.push({text:A,x:Y,y:b-49,font:"F1",size:7,color:[.2,.4,.65]}),b-=Q+10;const V=e.scenes&&e.scenes.length>0?e.scenes:[{sceneNumber:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",pages:"4 1/8",cast:["KEVIN","MARCUS"],desc:"Kevin arrives at border gate, inspection with Marcus."},{sceneNumber:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",pages:"3 4/8",cast:["KEVIN","MEERA"],desc:"Kevin discovers pressure loss on telemetry terminal."}];function Ne(){f.push({type:"rect",x:d,y:b-17,w:m,h:17,fill:[.91,.93,.96],stroke:[.78,.82,.88],lineWidth:.8}),p.push({text:"SCENE #",x:d+6,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"SET & SCENE DESCRIPTION",x:d+56,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"D/N",x:d+325,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"PAGES",x:d+368,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"CAST CHARACTERS",x:d+418,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),b-=17}p.push({text:"SCHEDULED SCENES TO SHOOT",x:d,y:b,font:"F2",size:9.5,color:[.1,.15,.22]});const ne=`${V.length} Scenes Scheduled`;p.push({text:ne,x:c-yt(ne,8,"F1"),y:b,font:"F1",size:8,color:[.45,.5,.58]}),b-=12,Ne(),V.forEach((me,Ue)=>{const Me=xs(me.heading||`SCENE ${me.sceneNumber}`,260,8,"F2"),De=xs(me.desc||"",260,7,"F1"),U=Array.isArray(me.cast)?me.cast:me.cast?[me.cast]:[],C=xs(U.join(", "),116,7.5,"F2"),R=Math.max(Me.length*10+De.length*9,C.length*9.5,12),K=Math.max(22,8+R);b-K<g&&(b=h(!0),Ne()),f.push({type:"rect",x:d,y:b-K,w:m,h:K,fill:Ue%2===0?[1,1,1]:[.985,.988,.995],stroke:[.86,.89,.93],lineWidth:.5}),p.push({text:`Sc. ${me.sceneNumber}`,x:d+6,y:b-13,font:"F2",size:8.5,color:[.1,.35,.85]});let G=b-10;Me.forEach(fe=>{p.push({text:fe,x:d+56,y:G,font:"F2",size:8,color:[.1,.12,.15]}),G-=10}),De.forEach(fe=>{p.push({text:fe,x:d+56,y:G,font:"F1",size:7,color:[.4,.45,.52]}),G-=9});const ee=me.heading?.toUpperCase().includes("NIGHT")?"NIGHT":"DAY";p.push({text:ee,x:d+325,y:b-13,font:"F1",size:7.5,color:ee==="NIGHT"?[.1,.15,.45]:[.8,.45,.1]}),p.push({text:me.pages||"1.0",x:d+368,y:b-13,font:"F2",size:7.5,color:[.2,.2,.2]});let ge=b-11;C.forEach(fe=>{p.push({text:fe,x:d+418,y:ge,font:"F2",size:7.5,color:[.15,.2,.25]}),ge-=9.5}),b-=K}),b-=10;const xe=e.castCalls&&e.castCalls.length>0?e.castCalls:[{character:"KEVIN",actor:"Dev Patel",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MARCUS",actor:"David Chen",pickup:"05:15 AM",hmuCall:"05:45 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MEERA",actor:"Zoe Saldana",pickup:"08:30 AM",hmuCall:"09:00 AM",onSet:"10:30 AM",status:"Confirmed"}];function I(){f.push({type:"rect",x:d,y:b-17,w:m,h:17,fill:[.91,.93,.96],stroke:[.78,.82,.88],lineWidth:.8}),p.push({text:"ID",x:d+6,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"CHARACTER",x:d+32,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"ACTOR / TALENT",x:d+140,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"STATUS",x:d+270,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"PICKUP",x:d+346,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"H/MU CALL",x:d+406,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"ON SET CALL",x:d+472,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),b-=17}b-48<g&&(b=h(!0)),p.push({text:"CAST & TALENT CALL SCHEDULE",x:d,y:b,font:"F2",size:9.5,color:[.1,.15,.22]});const $e=`${xe.length} Talent Booked`;p.push({text:$e,x:c-yt($e,8,"F1"),y:b,font:"F1",size:8,color:[.45,.5,.58]}),b-=12,I(),xe.forEach((me,Ue)=>{b-19<g&&(b=h(!0),I()),f.push({type:"rect",x:d,y:b-19,w:m,h:19,fill:Ue%2===0?[1,1,1]:[.985,.988,.995],stroke:[.86,.89,.93],lineWidth:.5}),p.push({text:String(Ue+1),x:d+6,y:b-13,font:"F1",size:7.5,color:[.5,.5,.5]}),p.push({text:at(me.character||"CHARACTER",100,8,"F2"),x:d+32,y:b-13,font:"F2",size:8,color:[.1,.12,.16]}),p.push({text:at(me.actor||"TBD",120,8,"F1"),x:d+140,y:b-13,font:"F1",size:8,color:[.2,.22,.26]});const De=(me.status||"").toLowerCase().includes("conf");p.push({text:at(me.status||"Confirmed",68,7.5,"F2"),x:d+270,y:b-13,font:"F2",size:7.5,color:De?[.12,.55,.25]:[.85,.55,.1]}),p.push({text:me.pickup||"-",x:d+346,y:b-13,font:"F3",size:7.5,color:[.35,.35,.35]}),p.push({text:me.hmuCall||"-",x:d+406,y:b-13,font:"F3",size:7.5,color:[.35,.35,.35]}),p.push({text:me.onSet||"-",x:d+472,y:b-13,font:"F2",size:8.5,color:[.1,.35,.85]}),b-=19}),b-=10;const je=e.specialInstructions||"Standard studio health & safety protocols in effect. All crew must report any hazards or equipment anomalies immediately to the 1st AD or Health & Safety Supervisor.",Pe=xs(je,516,7.5,"F1"),ae=Math.max(38,18+Pe.length*10+6);b-ae<g&&(b=h(!0)),f.push({type:"rect",x:d,y:b-ae,w:m,h:ae,fill:[.995,.985,.93],stroke:[.9,.82,.65],lineWidth:.8}),p.push({text:"[SAFETY & PRODUCTION DIRECTIVE] SPECIAL INSTRUCTIONS:",x:d+10,y:b-13,font:"F2",size:7.5,color:[.6,.38,.05]});let re=b-25;Pe.forEach(me=>{p.push({text:me,x:d+10,y:re,font:"F1",size:7.5,color:[.3,.25,.15]}),re-=10}),b-=ae+8;const D=34;if(b-D>=g){f.push({type:"rect",x:d,y:b-D,w:m,h:D,fill:[.965,.975,.988],stroke:[.84,.87,.92],lineWidth:.6}),p.push({text:"DIRECTING & SET OPS",x:d+10,y:b-12,font:"F2",size:7,color:[.25,.3,.38]}),p.push({text:`1st AD: Ready on Set ${e.shootingCall||"06:30 AM"} · Radio: Ch 1`,x:d+10,y:b-24,font:"F1",size:7,color:[.35,.4,.48]}),p.push({text:"CAMERA & SOUND TECH",x:d+195,y:b-12,font:"F2",size:7,color:[.25,.3,.38]}),p.push({text:`DP / Cam: ${e.generalCrewCall||"06:00 AM"} · Radio: Ch 2 | Sound: Ch 3`,x:d+195,y:b-24,font:"F1",size:7,color:[.35,.4,.48]}),p.push({text:"LOGISTICS & SIGN-OFF",x:d+375,y:b-12,font:"F2",size:7,color:[.25,.3,.38]});const me=at(`Approved: ${e.approvedBy||"Production Office"} · Ch 4`,160,7,"F1");p.push({text:me,x:d+375,y:b-24,font:"F1",size:7,color:[.35,.4,.48]}),b-=D+6}const Ce=r.length;r.forEach((me,Ue)=>{me.vectors.push({type:"line",x1:d,y1:44,x2:c,y2:44,stroke:[.8,.83,.88],lineWidth:.7}),me.texts.push({text:"CONFIDENTIAL -- SCRIPTORA PRODUCTION STUDIO -- NOT FOR PUBLIC DISTRIBUTION",x:d,y:32,font:"F1",size:7,color:[.45,.48,.52]});const Me=e.shootDate||"Production Call Sheet";me.texts.push({text:Me,x:306-yt(Me,7,"F1")/2,y:32,font:"F1",size:7,color:[.55,.58,.62]});const De=`Page ${Ue+1} of ${Ce}`;me.texts.push({text:De,x:c-yt(De,7.5,"F2"),y:32,font:"F2",size:7.5,color:[.3,.35,.4]})});const Oe=ds(r),pe=s.replace(/[^a-zA-Z0-9]/g,"_"),Fe=`CallSheet_Day${a}_${pe}.pdf`;return cs(Oe,Fe),Oe}function Nl(e="CHARACTER",t=[],s={}){const n=s.title||"Chronicles of Dust",o=s.draft||"Draft 4.2",a=[],l=38,i=[];let r=[],f=0;for(const c of t){const m=c.dialogue||c.text||"",g=ls(m,46),h=4+g.length;f+h>l&&r.length>0&&(i.push(r),r=[],f=0),r.push({...c,speechLines:g}),f+=h}r.length>0&&i.push(r),i.length===0&&i.push([]);for(let c=0;c<i.length;c++){const m=i[c],g=[],h=[];g.push({type:"line",x1:54,y1:746,x2:558,y2:746,stroke:[.2,.2,.2],lineWidth:1.2}),h.push({text:"SCRIPTORA -- CHARACTER DIALOGUE SHEET",x:54,y:755,font:"F4",size:9,color:[.3,.3,.3]}),h.push({text:`PAGE ${c+1} OF ${i.length}`,x:490,y:755,font:"F4",size:9,color:[.3,.3,.3]}),h.push({text:`${e.toUpperCase()} -- ALL DIALOGUE CUES`,x:54,y:730,font:"F4",size:12,color:[0,0,0]}),h.push({text:`Screenplay: ${n} (${o}) -- Pinned Baseline`,x:54,y:716,font:"F3",size:9,color:[.4,.4,.4]});let b=680;for(const y of m){const P=y.sceneNum||y.sceneNumber||1,S=y.heading||`SCENE ${P}`;if(h.push({text:`SCENE ${P} -- ${S}`,x:54,y:b,font:"F4",size:9,color:[.1,.3,.7]}),b-=14,y.action){const T=ls(y.action,65);for(const ce of T)h.push({text:ce,x:54,y:b,font:"F5",size:8.5,color:[.4,.4,.4]}),b-=11}const N=y.character||e||"CHARACTER",E=N.length*6.5;if(h.push({text:N,x:Math.max(160,306-E/2),y:b,font:"F4",size:10,color:[0,0,0]}),b-=12,y.parenthetical){const T=y.parenthetical.length*5.5;h.push({text:y.parenthetical,x:Math.max(160,306-T/2),y:b,font:"F5",size:9,color:[.3,.3,.3]}),b-=12}const j=y.speechLines||ls(y.dialogue||y.text||"",46);for(const T of j)h.push({text:T,x:170,y:b,font:"F3",size:10,color:[0,0,0]}),b-=13;b-=12}g.push({type:"line",x1:54,y1:50,x2:558,y2:50,stroke:[.8,.8,.8],lineWidth:.8}),h.push({text:`SCRIPTORA SCREENPLAY ARCHITECTURE -- ${e.toUpperCase()} -- DRAFT 4.2`,x:54,y:38,font:"F3",size:8,color:[.5,.5,.5]}),h.push({text:`Page ${c+1} of ${i.length}`,x:495,y:38,font:"F3",size:8,color:[.5,.5,.5]}),a.push({vectors:g,texts:h})}const p=ds(a),d=`DialogueSheet_${e.replace(/\s+/g,"_")}_${n.replace(/\s+/g,"_")}.pdf`;return cs(p,d),p}function Tl(e=1,t=[],s={},n={}){s&&s.title&&!n.title&&(n=s);const o=n.title||"Chronicles of Dust",a=n.draft||"Draft 4.2",l=s.heading||t[0]?.heading||`SCENE ${e} - DAY`,i=[],r=[],f=[];r.push({type:"rect",x:54,y:730,w:504,h:32,fill:[.1,.1,.1]}),f.push({text:"SCRIPTORA -- REHEARSAL & ON-SET SIDES",x:64,y:748,font:"F4",size:9,color:[.8,.8,.8]}),f.push({text:`SCENE ${e} SIDES`,x:460,y:748,font:"F4",size:10,color:[1,1,1]}),f.push({text:`${o.toUpperCase()} -- SCENE ${e}`,x:54,y:712,font:"F4",size:13,color:[0,0,0]}),f.push({text:`${l} -- ${a}`,x:54,y:698,font:"F3",size:9,color:[.4,.4,.4]}),r.push({type:"line",x1:54,y1:686,x2:558,y2:686,stroke:[.2,.2,.2],lineWidth:1});let p=665;f.push({text:l,x:54,y:p,font:"F4",size:10,color:[0,0,0]}),p-=18;for(const m of t){if(m.action){const h=ls(m.action,65);for(const b of h)f.push({text:b,x:54,y:p,font:"F5",size:9.5,color:[.2,.2,.2]}),p-=13;p-=4}if(m.character){const h=m.character.length*6.5;f.push({text:m.character,x:Math.max(160,306-h/2),y:p,font:"F4",size:10,color:[0,0,0]}),p-=13}if(m.parenthetical){const h=m.parenthetical.length*5.5;f.push({text:m.parenthetical,x:Math.max(160,306-h/2),y:p,font:"F5",size:9,color:[.3,.3,.3]}),p-=12}const g=m.dialogue||m.text||"";if(g){const h=ls(g,46);for(const b of h)f.push({text:b,x:170,y:p,font:"F3",size:10,color:[0,0,0]}),p-=13}p-=10}r.push({type:"rect",x:180,y:p-15,w:252,h:20,fill:[.95,.95,.95],stroke:[.7,.7,.7],lineWidth:.8}),f.push({text:`END OF SCENE ${e} SIDES -- STAMPED DRAFT 4.2`,x:195,y:p-3,font:"F4",size:7.5,color:[.3,.3,.3]}),r.push({type:"line",x1:54,y1:50,x2:558,y2:50,stroke:[.8,.8,.8],lineWidth:.8}),f.push({text:"SCRIPTORA REHEARSAL COPY -- OFFICIAL PRODUCTION SIDES",x:54,y:38,font:"F3",size:8,color:[.5,.5,.5]}),f.push({text:"Page 1 of 1",x:505,y:38,font:"F3",size:8,color:[.5,.5,.5]}),i.push({vectors:r,texts:f});const d=ds(i),c=`ActorSides_Scene${e}_${o.replace(/\s+/g,"_")}.pdf`;return cs(d,c),d}function ya(e=[],t={}){const s=t.title||"Chronicles of Dust",n=t.draft||"Draft 4.2",o=[],a=18,l=e.length,i=Math.ceil(l/a)||1;for(let p=0;p<i;p++){const d=[],c=[],m=e.slice(p*a,(p+1)*a);d.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),c.push({text:"SCRIPTORA -- SCRIPT BREAKDOWN MASTER REPORT",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),c.push({text:`${s.toUpperCase()} (${n}) -- ${l} ELEMENTS TAGGED`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),c.push({text:`PAGE ${p+1} OF ${i}`,x:505,y:747,font:"F2",size:9,color:[1,1,1]});let g=705;d.push({type:"rect",x:36,y:g,w:540,h:18,fill:[.93,.94,.96],stroke:[.8,.83,.88],lineWidth:.8}),c.push({text:"CATEGORY",x:42,y:g+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"ELEMENT NAME",x:120,y:g+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"SCENES",x:270,y:g+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"STATUS",x:330,y:g+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"DETAILS / SOURCING SPECIFICATION",x:400,y:g+5,font:"F2",size:8,color:[.3,.35,.4]}),g-=22;for(const h of m){d.push({type:"rect",x:36,y:g,w:540,h:22,fill:[1,1,1],stroke:[.88,.9,.93],lineWidth:.5}),c.push({text:h.category||"Props",x:42,y:g+7,font:"F2",size:8,color:[.1,.3,.8]}),c.push({text:(h.name||"").slice(0,32),x:120,y:g+7,font:"F2",size:8.5,color:[.1,.1,.1]}),c.push({text:(h.scenes||[h.sceneNumber||18]).map(y=>`#${y}`).join(", "),x:270,y:g+7,font:"F3",size:8,color:[.4,.4,.4]}),c.push({text:h.status||"Confirmed",x:330,y:g+7,font:"F1",size:8,color:h.status==="Confirmed"?[.1,.6,.2]:[.8,.4,.1]});const b=h.assignedActor||h.sourcingType||h.description||h.notes||"Ready";c.push({text:b.slice(0,36),x:400,y:g+7,font:"F1",size:7.5,color:[.3,.3,.3]}),g-=22}d.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),c.push({text:"SCRIPTORA MASTER PRODUCTION BREAKDOWN -- IMMUTABLE SNAPSHOT",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),c.push({text:`Page ${p+1} of ${i}`,x:510,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),o.push({vectors:d,texts:c})}const r=ds(o),f=`ScriptBreakdown_${s.replace(/\s+/g,"_")}.pdf`;return cs(r,f),r}function Pl(e=[],t=[],s={}){const n=s.title||"Chronicles of Dust",o=s.draft||"Draft 4.2",a=[],l=[],i=[];l.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),i.push({text:"SCRIPTORA -- MASTER SHOOTING SCHEDULE",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),i.push({text:`${n.toUpperCase()} (${o}) -- ${e.length} SHOOT DAYS`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),i.push({text:"PAGE 1 OF 1",x:515,y:747,font:"F2",size:9,color:[1,1,1]});let r=705;l.push({type:"rect",x:36,y:r,w:540,h:18,fill:[.93,.94,.96],stroke:[.8,.83,.88],lineWidth:.8}),i.push({text:"DAY #",x:42,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"DATE",x:80,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"SHOOT LOCATION / STAGE",x:155,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"SCENES",x:340,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"PAGES",x:430,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"HOURS",x:480,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),i.push({text:"STATUS",x:530,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),r-=26;for(const d of e){l.push({type:"rect",x:36,y:r,w:540,h:26,fill:[1,1,1],stroke:[.88,.9,.93],lineWidth:.5}),i.push({text:`D${d.dayNumber}`,x:42,y:r+9,font:"F2",size:9,color:[.1,.1,.1]}),i.push({text:d.date||"",x:80,y:r+9,font:"F1",size:8,color:[.3,.3,.3]}),i.push({text:d.location||"Location TBD",x:155,y:r+13,font:"F2",size:8.5,color:[.1,.1,.1]}),i.push({text:d.title||"",x:155,y:r+3,font:"F1",size:7.5,color:[.5,.5,.5]});const c=(d.sceneNumbers||[]).map(m=>`Sc ${m}`).join(", ")||"None";i.push({text:c,x:340,y:r+9,font:"F4",size:8.5,color:[.1,.3,.8]}),i.push({text:d.totalPages||"0 0/8",x:430,y:r+9,font:"F3",size:8,color:[.3,.3,.3]}),i.push({text:`${d.estHours||8}h`,x:480,y:r+9,font:"F1",size:8,color:[.4,.4,.4]}),i.push({text:d.status||"Draft",x:530,y:r+9,font:"F1",size:7.5,color:d.status==="Confirmed"?[.1,.6,.2]:[.4,.4,.4]}),r-=26}l.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),i.push({text:"SCRIPTORA MASTER STRIPBOARD SCHEDULE -- OWNER CONFIRMED BASELINE",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),i.push({text:"Page 1 of 1",x:525,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),a.push({vectors:l,texts:i});const f=ds(a),p=`ShootingSchedule_${n.replace(/\s+/g,"_")}.pdf`;return cs(f,p),f}function Ll(e=[],t={}){const s=e&&typeof e=="object"&&!Array.isArray(e),n=s?e:null,o=s?n.shots||[]:Array.isArray(e)?e:[],a=t.title||n?.screenplayTitle||"Chronicles of Dust",l=t.draft||t.sourceVersion||n?.sourceVersion||"Draft 4.2",i=t.heading||n?.sceneHeading||o[0]?.sceneHeading||"SCENE 1 - EXT. MOJAVE OUTPOST GATE 4 - DAY",r=n?.sceneNumber||o[0]?.sceneNumber||o[0]?.sceneNum||1,f=[{shotNumber:"1A",title:"Perimeter Outpost Gate",shotSize:"Wide Shot",cameraAngle:"High Angle",focalLength:"24mm Wide",aspectRatio:"2.39:1",lightingMood:"Daylight Dust",description:"High altitude drone descending across dust devils toward Kevin's arrival at the arid customs gate.",approvalStatus:"approved",directorNotes:"Capture sunrise glint off the guard gate perimeter wires."},{shotNumber:"1B",title:"Gate Scanner Clearance Standoff",shotSize:"Medium Two-Shot",cameraAngle:"Eye Level",focalLength:"50mm Prime",aspectRatio:"2.39:1",lightingMood:"Harsh Fluorescent Rim",description:"Kevin presents his ID badge to Marcus over the buzzing clearance terminal.",approvalStatus:"approved",directorNotes:"Focus pull from scanner terminal to Kevin's tense expression."},{shotNumber:"1C",title:"Terminal Diagnostic Anomaly",shotSize:"Close-Up",cameraAngle:"Low Angle",focalLength:"85mm Portrait",aspectRatio:"2.39:1",lightingMood:"Cyan Strobe",description:"Close-up insert of the flickering scanner console displaying pressure alert warning in red neon.",approvalStatus:"proposed",directorNotes:"Practical screen insert with pulsing alarm strobe."}],p=o&&o.length>0?o:f,d=3,c=Math.ceil(p.length/d)||1,m=[];for(let y=0;y<c;y++){const P=[],S=[],N=p.slice(y*d,(y+1)*d);P.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),S.push({text:"SCRIPTORA -- STORYBOARD STUDIO SHOT COMPOSITION",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),S.push({text:`${a.toUpperCase()} (${l}) -- ${ha(i).toUpperCase()}`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),S.push({text:`PAGE ${y+1} OF ${c}`,x:505,y:747,font:"F2",size:9,color:[1,1,1]});let E=575;for(const j of N){const T=j.shotNumber||j.shotNum||`${r}A`,ce=j.title||`Shot ${T}`,te=j.focalLength||j.lens||"50mm Prime",be=j.aspectRatio||"2.39:1",W=`${j.shotSize||"Medium Shot"} / ${j.cameraAngle||"Eye Level"}`,Ee=(j.approvalStatus||"Draft").toUpperCase(),ve=Ee==="APPROVED"?[.1,.6,.2]:Ee==="PROPOSED"?[.8,.5,.1]:[.4,.45,.5];P.push({type:"rect",x:36,y:E,w:540,h:140,fill:[1,1,1],stroke:[.85,.88,.92],lineWidth:.8}),P.push({type:"rect",x:46,y:E+15,w:200,h:110,fill:[.08,.1,.15],stroke:[.25,.3,.38],lineWidth:1}),P.push({type:"line",x1:112,y1:E+15,x2:112,y2:E+125,stroke:[.2,.25,.32],lineWidth:.4}),P.push({type:"line",x1:178,y1:E+15,x2:178,y2:E+125,stroke:[.2,.25,.32],lineWidth:.4}),P.push({type:"line",x1:46,y1:E+52,x2:246,y2:E+52,stroke:[.2,.25,.32],lineWidth:.4}),P.push({type:"line",x1:46,y1:E+88,x2:246,y2:E+88,stroke:[.2,.25,.32],lineWidth:.4}),P.push({type:"line",x1:141,y1:E+70,x2:151,y2:E+70,stroke:[.4,.6,.8],lineWidth:.8}),P.push({type:"line",x1:146,y1:E+65,x2:146,y2:E+75,stroke:[.4,.6,.8],lineWidth:.8}),P.push({type:"line",x1:52,y1:E+119,x2:58,y2:E+119,stroke:[.5,.7,.9],lineWidth:.8}),P.push({type:"line",x1:52,y1:E+119,x2:52,y2:E+113,stroke:[.5,.7,.9],lineWidth:.8}),P.push({type:"line",x1:240,y1:E+21,x2:234,y2:E+21,stroke:[.5,.7,.9],lineWidth:.8}),P.push({type:"line",x1:240,y1:E+21,x2:240,y2:E+27,stroke:[.5,.7,.9],lineWidth:.8}),S.push({text:`REC * SHOT ${T}`,x:52,y:E+110,font:"F4",size:7.5,color:[1,1,1]}),S.push({text:`${be} * ${te}`,x:52,y:E+23,font:"F3",size:7,color:[.7,.8,.9]}),S.push({text:`SHOT ${T} -- SCENE ${r}`,x:260,y:E+115,font:"F2",size:9.5,color:[.1,.3,.8]}),P.push({type:"rect",x:480,y:E+112,w:86,h:16,fill:[.95,.96,.98],stroke:ve,lineWidth:.7}),S.push({text:Ee,x:486,y:E+117,font:"F2",size:7,color:ve}),S.push({text:ce.slice(0,38),x:260,y:E+100,font:"F2",size:10.5,color:[.08,.1,.12]}),S.push({text:`Camera: ${W} * ${te} (${be})`,x:260,y:E+86,font:"F1",size:8,color:[.35,.4,.45]});const Q=ls(j.description||"",48);let de=E+72;for(let Se=0;Se<Math.min(Q.length,3);Se++)S.push({text:Q[Se],x:260,y:de,font:"F1",size:8,color:[.18,.22,.26]}),de-=11;const Y=j.directorNotes||j.continuity?.lightingContinuity||j.continuity?.eyeline||"";Y&&S.push({text:`Note: ${Y.slice(0,52)}`,x:260,y:E+25,font:"F5",size:7.5,color:[.45,.48,.52]}),E-=150}P.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),S.push({text:"SCRIPTORA STORYBOARD STUDIO -- OFFICIAL CAMERA & CONCEPT COMPOSITION",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),S.push({text:`Page ${y+1} of ${c}`,x:510,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),m.push({vectors:P,texts:S})}const g=ds(m),h=i.replace(/[^a-zA-Z0-9]+/g,"_").slice(0,30),b=`Storyboard_${a.replace(/\s+/g,"_")}_${h}.pdf`;return cs(g,b),g}const Dl={Cast:{icon:"person"},Locations:{icon:"location_on"},Props:{icon:"inventory_2"},"Practical FX":{icon:"science"},Stunts:{icon:"sports_kabaddi"},Costumes:{icon:"checkroom"},Vehicles:{icon:"commute"},Sound:{icon:"music_note"},"Hair & Makeup":{icon:"face"}};function Rl(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||B.state.selectedScriptId;const n=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${ct("Pre-Production","Script Breakdown Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${As("Script Breakdown","dataset",n||"/production",`
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

      ${ot("production")}

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
  `}async function Ml(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||B.state.selectedScriptId||"chronicles-of-dust";let a=n.get("category")||"all",l=n.get("scene")||"all",i=n.get("character")||n.get("search")||"",r=null;const f=document.getElementById("breakdown-scene-select");f&&l!=="all"&&(f.value=l.startsWith("scene-")?l:`scene-${l}`),a!=="all"&&document.querySelectorAll(".cat-btn").forEach(A=>{A.getAttribute("data-cat")===a?(A.classList.add("bg-blue-600","text-white","shadow-2xs"),A.classList.remove("bg-slate-100","text-slate-700")):(A.classList.remove("bg-blue-600","text-white","shadow-2xs"),A.classList.add("bg-slate-100","text-slate-700"))});const p=document.getElementById("breakdown-search");p&&i&&(p.value=i);const d=A=>{const V=A.category;if(V==="Cast"){const Ne=!A.assignedActor||A.assignedActor.toLowerCase().includes("unassigned")||A.assignedActor.toLowerCase().includes("open"),ne=A.castingStatus==="Confirmed Cast"?"bg-emerald-50 text-emerald-700 border-emerald-200":A.castingStatus==="Offer Out"?"bg-sky-50 text-sky-700 border-sky-200":"bg-amber-50 text-amber-700 border-amber-200";return`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Actor</span>
            <div class="font-semibold text-slate-900 mt-0.5">
              ${Ne?'<span class="text-amber-700 italic">Unassigned (Open Role)</span>':`<span class="text-indigo-700 font-bold">${A.assignedActor}</span>`}
            </div>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Casting Status</span>
            <span class="inline-block mt-0.5 px-2 py-0.5 rounded-lg border text-[11px] font-semibold ${ne}">
              ${A.castingStatus||"Auditioning"}
            </span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Actor Availability</span>
            <div class="text-slate-700 mt-0.5 font-medium truncate" title="${A.actorAvailability||"Not specified"}">
              ${A.actorAvailability||"Not specified"}
            </div>
          </div>
        </div>
      `}return V==="Props"?`
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sourcing</span>
            <span class="font-semibold text-emerald-800 text-[11px]">${A.sourcingType||"Prop House"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quantity</span>
            <span class="font-semibold text-slate-900 text-[11px]">${A.quantity||"1"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Readiness</span>
            <span class="font-semibold text-teal-700 text-[11px]">${A.readinessStatus||"Ready"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Continuity Notes</span>
            <span class="text-slate-600 text-[11px] truncate block" title="${A.continuityNotes||"Standard"}">${A.continuityNotes||"Standard"}</span>
          </div>
        </div>
      `:V==="Practical FX"?`
        <div class="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-purple-50/50 p-2 rounded-xl border border-purple-100">
              <span class="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Required Resources</span>
              <span class="font-semibold text-purple-900 text-[11px]">${A.requiredResources||"Standard FX Kit"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Technical Specs</span>
              <span class="text-slate-800 font-medium text-[11px]">${A.technicalRequirements||"Per department"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prep Status</span>
              <span class="font-semibold text-emerald-700 text-[11px]">${A.prepStatus||"Rigged & Tested"}</span>
            </div>
          </div>
          ${A.safetyNotes?`
            <div class="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-1.5 text-[11px]">
              <span class="material-symbols-outlined text-[15px] text-rose-600 shrink-0 mt-0.5">warning</span>
              <div><strong class="font-semibold">Safety Mandate:</strong> ${A.safetyNotes}</div>
            </div>
          `:""}
        </div>
      `:V==="Stunts"?`
        <div class="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-rose-50/50 p-2 rounded-xl border border-rose-100">
              <span class="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">Safety Planning</span>
              <span class="font-semibold text-rose-900 text-[11px]">${A.safetyPlanningStatus||"Review in Progress"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Qualified Personnel</span>
              <span class="text-slate-800 font-medium text-[11px]">${A.qualifiedPersonnel||"Lead Stunt Performer"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rigging Requirements</span>
              <span class="text-slate-800 font-medium text-[11px]">${A.coordinationRequirements||"Coordinator on set"}</span>
            </div>
          </div>
        </div>
      `:V==="Locations"?`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-amber-50/50 p-2 rounded-xl border border-amber-100">
            <span class="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Context & Lighting</span>
            <span class="font-semibold text-amber-900 text-[11px]">${A.context||"INT."} · ${A.lighting||"DAY"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location Status</span>
            <span class="font-semibold text-emerald-700 text-[11px]">${A.locationStatus||"Permitted & Locked"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Access Details</span>
            <span class="text-slate-700 text-[11px] truncate block" title="${A.accessDetails||"Standard access"}">${A.accessDetails||"Standard access"}</span>
          </div>
        </div>
      `:V==="Costumes"?`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-teal-50/50 p-2 rounded-xl border border-teal-100">
            <span class="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">Character</span>
            <span class="font-semibold text-teal-900 text-[11px]">${A.character||"Cast member"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Continuity Changes</span>
            <span class="text-slate-700 text-[11px] truncate block" title="${A.continuityChanges||"Stage 1"}">${A.continuityChanges||"Stage 1"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prep Status</span>
            <span class="font-semibold text-emerald-700 text-[11px]">${A.prepStatus||"Fitted & Approved"}</span>
          </div>
        </div>
      `:V==="Vehicles"?`
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Availability</span>
            <span class="font-semibold text-slate-900 text-[11px]">${A.availability||"On Set"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Operational Requirements</span>
            <span class="text-slate-700 text-[11px]">${A.operationalRequirements||"Qualified operator"}</span>
          </div>
        </div>
      `:""},c=A=>{const V=A.category,Ne=A.scenes&&A.scenes.length>0?A.scenes.join(", "):A.sceneNumber;return`
      <div class="edit-panel mt-3 p-4 bg-slate-50/90 rounded-2xl border-2 border-blue-400/80 shadow-md flex flex-col gap-3 text-xs animate-in fade-in duration-150">
        <div class="flex items-center justify-between border-b border-slate-200 pb-2">
          <div class="flex items-center gap-1.5 font-heading font-bold text-blue-900">
            <span class="material-symbols-outlined text-[18px]">edit</span>
            <span>Edit Production Element: ${A.name}</span>
          </div>
          <span class="text-[10px] text-slate-500 font-medium">Owner Permissions Active</span>
        </div>

        <form class="form-edit-inline flex flex-col gap-3" data-id="${A.id}">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Element Name</label>
              <input type="text" name="name" value="${A.name||""}" required class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Category</label>
              <select name="category" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="Cast" ${V==="Cast"?"selected":""}>Cast & Characters</option>
                <option value="Locations" ${V==="Locations"?"selected":""}>Locations</option>
                <option value="Props" ${V==="Props"?"selected":""}>Props</option>
                <option value="Practical FX" ${V==="Practical FX"?"selected":""}>Practical FX</option>
                <option value="Stunts" ${V==="Stunts"?"selected":""}>Stunts & Action</option>
                <option value="Costumes" ${V==="Costumes"?"selected":""}>Costumes & Wardrobe</option>
                <option value="Vehicles" ${V==="Vehicles"?"selected":""}>Vehicles & Equipment</option>
                <option value="Sound" ${V==="Sound"?"selected":""}>Sound</option>
                <option value="Hair & Makeup" ${V==="Hair & Makeup"?"selected":""}>Hair & Makeup</option>
              </select>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Review Status</label>
              <select name="status" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="Confirmed" ${A.status==="Confirmed"?"selected":""}>Confirmed (Human Approved)</option>
                <option value="Needs Review" ${A.status==="Needs Review"?"selected":""}>Needs Review</option>
                <option value="Rejected" ${A.status==="Rejected"?"selected":""}>Rejected</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Scenes (comma separated)</label>
              <input type="text" name="scenes" value="${Ne}" placeholder="e.g. 1, 4, 18" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              <span class="text-[10px] text-slate-400">Links element to multiple scenes simultaneously</span>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Description / Screenplay Context</label>
              <input type="text" name="description" value="${A.description||""}" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <!-- Dynamic Category Fields inside Edit Panel -->
          ${V==="Cast"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Assigned Actor</label>
                <input type="text" name="assignedActor" value="${A.assignedActor||""}" placeholder="e.g. Dev Patel (or leave blank for Open)" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Casting Status</label>
                <select name="castingStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Confirmed Cast" ${A.castingStatus==="Confirmed Cast"?"selected":""}>Confirmed Cast</option>
                  <option value="Offer Out" ${A.castingStatus==="Offer Out"?"selected":""}>Offer Out</option>
                  <option value="Auditioning" ${A.castingStatus==="Auditioning"?"selected":""}>Auditioning</option>
                  <option value="Uncast / Open" ${A.castingStatus==="Uncast / Open"?"selected":""}>Uncast / Open Role</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Actor Availability</label>
                <input type="text" name="actorAvailability" value="${A.actorAvailability||""}" placeholder="e.g. Shoot Days 1-14" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${V==="Props"?`
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5 p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Sourcing Type</label>
                <select name="sourcingType" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Hero Prop" ${A.sourcingType==="Hero Prop"?"selected":""}>Hero Prop</option>
                  <option value="Custom Build / Fabricate" ${A.sourcingType==="Custom Build / Fabricate"?"selected":""}>Custom Build</option>
                  <option value="Prop House Rental" ${A.sourcingType==="Prop House Rental"?"selected":""}>Prop House</option>
                  <option value="Purchased" ${A.sourcingType==="Purchased"?"selected":""}>Purchased</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Quantity</label>
                <input type="text" name="quantity" value="${A.quantity||"1"}" placeholder="e.g. x2 Hero, x4 Rubber" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Readiness Status</label>
                <select name="readinessStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Ready in Art Dept" ${A.readinessStatus==="Ready in Art Dept"?"selected":""}>Ready in Art Dept</option>
                  <option value="Fabrication Ready" ${A.readinessStatus==="Fabrication Ready"?"selected":""}>Fabrication Ready</option>
                  <option value="In Progress" ${A.readinessStatus==="In Progress"?"selected":""}>In Progress</option>
                  <option value="Pending Sourcing" ${A.readinessStatus==="Pending Sourcing"?"selected":""}>Pending Sourcing</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Continuity Notes</label>
                <input type="text" name="continuityNotes" value="${A.continuityNotes||""}" placeholder="Continuity tracking..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${V==="Practical FX"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-purple-50/50 rounded-xl border border-purple-100">
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Required Resources</label>
                <input type="text" name="requiredResources" value="${A.requiredResources||""}" placeholder="CO2, Brine Reservoir..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Technical Specs</label>
                <input type="text" name="technicalRequirements" value="${A.technicalRequirements||""}" placeholder="Pressure limits, wiring..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Safety Notes</label>
                <input type="text" name="safetyNotes" value="${A.safetyNotes||""}" placeholder="Goggles, splash radius..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${V==="Stunts"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-rose-50/50 rounded-xl border border-rose-100">
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Safety Planning Status</label>
                <select name="safetyPlanningStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Rigging Rig Approved" ${A.safetyPlanningStatus==="Rigging Rig Approved"?"selected":""}>Rigging Rig Approved</option>
                  <option value="Rehearsal Pending" ${A.safetyPlanningStatus==="Rehearsal Pending"?"selected":""}>Rehearsal Pending</option>
                  <option value="In Coordinator Review" ${A.safetyPlanningStatus==="In Coordinator Review"?"selected":""}>In Review</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Qualified Personnel</label>
                <input type="text" name="qualifiedPersonnel" value="${A.qualifiedPersonnel||""}" placeholder="Stunt double, rigger..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Coordination Details</label>
                <input type="text" name="coordinationRequirements" value="${A.coordinationRequirements||""}" placeholder="Ratchet, cables..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${V==="Locations"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-amber-50/50 rounded-xl border border-amber-100">
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Context & Lighting</label>
                <input type="text" name="context" value="${A.context||"INT."}" placeholder="INT. or EXT." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Location Status</label>
                <input type="text" name="locationStatus" value="${A.locationStatus||"Permitted & Locked"}" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Access Details</label>
                <input type="text" name="accessDetails" value="${A.accessDetails||""}" placeholder="Access permits, route..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          <div class="flex items-center justify-between pt-2 border-t border-slate-200">
            <button type="button" class="btn-delete-element text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-xl font-medium transition-colors cursor-pointer flex items-center gap-1" data-id="${A.id}">
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
    `},m=async()=>{const A=await Ct(o,a,l),V=A.filter(D=>{if(!i)return!0;const Ce=i.toLowerCase();return D.name.toLowerCase().includes(Ce)||D.description&&D.description.toLowerCase().includes(Ce)||D.category.toLowerCase().includes(Ce)||D.assignedActor&&D.assignedActor.toLowerCase().includes(Ce)||D.notes&&D.notes.toLowerCase().includes(Ce)}),Ne=A.length,ne=A.filter(D=>D.status==="Confirmed").length,xe=A.filter(D=>D.status==="Needs Review"||D.status==="Extracted").length,I=A.filter(D=>D.status==="Rejected").length,$e=document.getElementById("kpi-total"),je=document.getElementById("kpi-confirmed"),Pe=document.getElementById("kpi-review"),ae=document.getElementById("kpi-rejected");$e&&($e.textContent=Ne),je&&(je.textContent=ne),Pe&&(Pe.textContent=xe),ae&&(ae.textContent=I);const re=document.getElementById("breakdown-list");if(re){if(V.length===0){re.innerHTML=`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400 text-xs">
          No breakdown elements match the active category, scene, or search filters.
        </div>
      `;return}re.innerHTML=V.map(D=>{const Ce=D.status==="Confirmed",Oe=D.status==="Needs Review"||D.status==="Extracted",pe=D.status==="Rejected",Fe=r===D.id,me=Dl[D.category]||{icon:"label"},Ue=Oe?'<span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium flex items-center gap-1">Needs Review</span>':pe?'<span class="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium flex items-center gap-1">Excluded</span>':"",De=(Array.isArray(D.scenes)&&D.scenes.length>0?D.scenes:[D.sceneNumber]).map(U=>`Sc ${U}`).join(", ");return`
        <div class="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-xs hover:border-slate-300 transition-colors flex flex-col gap-2.5" data-id="${D.id}">
          <!-- Top Row: Element Name on Left, Scene Tag, Category Tag, and Compact Action Buttons -->
          <div class="flex items-center justify-between gap-2 min-w-0">
            <div class="flex items-center gap-2 flex-wrap min-w-0">
              <h3 class="font-heading font-bold text-base text-slate-900 tracking-tight shrink-0 mr-1">${D.name}</h3>
              <span class="px-2 py-0.5 rounded-md bg-blue-50/70 text-blue-700 border border-blue-100 font-semibold text-xs shrink-0 flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">movie</span>
                <span>${De}</span>
              </span>
              <span class="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-700 flex items-center gap-1 shrink-0">
                <span class="material-symbols-outlined text-[13px] text-slate-400">${me.icon}</span>
                <span>${D.category}</span>
              </span>
              ${Ue}
            </div>

            <!-- Primary Action Buttons (Compact, aligned near heading) -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button class="btn-toggle-edit px-2 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${D.id}" title="Edit details" aria-label="Edit ${D.name}">
                <span class="material-symbols-outlined text-[15px]">${Fe?"expand_less":"edit"}</span>
                <span class="hidden sm:inline">${Fe?"Close":"Edit"}</span>
              </button>

              ${Ce?`
                <button class="btn-review-item px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs transition-colors cursor-pointer" data-id="${D.id}" title="Request re-review" aria-label="Request re-review for ${D.name}">
                  Re-review
                </button>
              `:`
                <button class="btn-confirm-item px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${D.id}" title="Confirm item" aria-label="Confirm ${D.name}">
                  <span class="material-symbols-outlined text-[14px]">check</span>
                  <span>Confirm</span>
                </button>
              `}

              ${pe?"":`
                <button class="btn-reject-item p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" data-id="${D.id}" title="Reject element" aria-label="Reject ${D.name}">
                  <span class="material-symbols-outlined text-[16px]">block</span>
                </button>
              `}

              <button class="btn-delete-element p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" data-id="${D.id}" title="Delete element" aria-label="Delete ${D.name}">
                <span class="material-symbols-outlined text-[16px]">delete</span>
              </button>
            </div>
          </div>

          <!-- Description / Role -->
          <p class="text-xs text-slate-600 leading-relaxed font-sans">${D.description||D.characterRole||"No description provided."}</p>

          <!-- Category Specific Rich Presentation Row -->
          ${d(D)}

          <!-- Traceability & Evidence Row -->
          <div class="flex flex-col gap-1.5 mt-1 pt-2 border-t border-slate-100">
            ${D.sourceSnippet?`
              <div class="text-[11px] font-mono text-slate-600 bg-slate-50/80 border border-slate-200/60 rounded-xl p-2 leading-relaxed">
                <span class="text-slate-400 font-sans font-bold text-[10px] uppercase tracking-wider block mb-0.5">Screenplay Evidence (Draft 4.2):</span>
                "${D.sourceSnippet}"
              </div>
            `:""}

            <div class="flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-400">
              <div class="flex items-center gap-2">
                ${D.originalAiSuggestion?`
                  <span class="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">AI Extracted</span>
                `:`
                  <span class="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium">Manual Entry</span>
                `}
                ${D.userCorrection?`
                  <span class="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5" title="Modified by user">
                    <span class="material-symbols-outlined text-[12px]">tune</span>
                    <span>Corrected by ${D.userCorrection.correctedBy||"Owner"}</span>
                  </span>
                `:""}
              </div>

              ${D.confirmedBy?`
                <div>Confirmed by <strong class="font-semibold text-slate-600">${D.confirmedBy}</strong></div>
              `:""}
            </div>
          </div>

          <!-- Inline Edit Area if active -->
          ${Fe?c(D):""}
        </div>
      `}).join(""),re.querySelectorAll(".btn-toggle-edit").forEach(D=>{D.onclick=()=>{const Ce=D.getAttribute("data-id");r=r===Ce?null:Ce,m()}}),re.querySelectorAll(".btn-cancel-edit").forEach(D=>{D.onclick=()=>{r=null,m()}}),re.querySelectorAll(".form-edit-inline").forEach(D=>{D.onsubmit=async Ce=>{Ce.preventDefault();const Oe=D.getAttribute("data-id"),pe=new FormData(D),me=(pe.get("scenes")||"18").split(",").map(De=>Number(De.trim())).filter(De=>!isNaN(De)),Ue=me.length>0?me[0]:18,Me={name:pe.get("name"),category:pe.get("category"),status:pe.get("status"),description:pe.get("description"),scenes:me,sceneNumber:Ue,sceneId:`scene-${Ue}`,assignedActor:pe.get("assignedActor")||"",castingStatus:pe.get("castingStatus")||"Uncast / Open",actorAvailability:pe.get("actorAvailability")||"",sourcingType:pe.get("sourcingType")||"",quantity:pe.get("quantity")||"",readinessStatus:pe.get("readinessStatus")||"",continuityNotes:pe.get("continuityNotes")||"",requiredResources:pe.get("requiredResources")||"",technicalRequirements:pe.get("technicalRequirements")||"",safetyNotes:pe.get("safetyNotes")||"",safetyPlanningStatus:pe.get("safetyPlanningStatus")||"",qualifiedPersonnel:pe.get("qualifiedPersonnel")||"",coordinationRequirements:pe.get("coordinationRequirements")||"",context:pe.get("context")||"",locationStatus:pe.get("locationStatus")||"",accessDetails:pe.get("accessDetails")||""};await Bs(o,Oe,Me),w(`Saved updates for "${Me.name}"`),r=null,m()}}),re.querySelectorAll(".btn-delete-element").forEach(D=>{D.onclick=Ce=>{Ce.stopPropagation();const Oe=D.getAttribute("data-id"),pe=A.find(Fe=>Fe.id===Oe);pe&&de(pe)}}),re.querySelectorAll(".btn-confirm-item").forEach(D=>{D.onclick=async()=>{const Ce=D.getAttribute("data-id");await Bs(o,Ce,{status:"Confirmed"}),w("Element confirmed by Owner"),m()}}),re.querySelectorAll(".btn-review-item").forEach(D=>{D.onclick=async()=>{const Ce=D.getAttribute("data-id");await Bs(o,Ce,{status:"Needs Review",isHumanConfirmed:!1}),w("Marked for review"),m()}}),re.querySelectorAll(".btn-reject-item").forEach(D=>{D.onclick=async()=>{const Ce=D.getAttribute("data-id");await Bs(o,Ce,{status:"Rejected"}),w("Element rejected"),m()}})}};await m(),document.querySelectorAll(".cat-btn").forEach(A=>{A.onclick=()=>{document.querySelectorAll(".cat-btn").forEach(V=>{V.classList.remove("bg-blue-600","text-white","shadow-2xs"),V.classList.add("bg-slate-100","text-slate-700")}),A.classList.add("bg-blue-600","text-white","shadow-2xs"),A.classList.remove("bg-slate-100","text-slate-700"),a=A.getAttribute("data-cat"),m()}});const g=document.getElementById("breakdown-scene-select");g&&(g.onchange=A=>{l=A.target.value,m()});const h=document.getElementById("breakdown-search");h&&(h.oninput=A=>{i=A.target.value,m()});const b=document.getElementById("elem-cat"),y=document.getElementById("add-modal-category-fields"),P=()=>{if(!y||!b)return;const A=b.value;A==="Cast"?y.innerHTML=`
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
      `:A==="Props"?y.innerHTML=`
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
      `:A==="Practical FX"?y.innerHTML=`
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
      `:A==="Stunts"?y.innerHTML=`
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
      `:A==="Locations"?y.innerHTML=`
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
      `:y.innerHTML=`
        <div>
          <label class="font-semibold text-slate-700 block mb-1">Department Notes</label>
          <input type="text" id="add-dept-notes" placeholder="Department-specific instructions..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
        </div>
      `};b&&(b.onchange=P,P());const S=document.getElementById("modal-add-element"),N=document.getElementById("btn-add-element"),E=document.getElementById("close-add-modal"),j=document.getElementById("btn-cancel-add"),T=document.getElementById("form-add-element"),ce=()=>{P(),pt(S)},te=()=>{Be(S)};N&&(N.onclick=ce),E&&(E.onclick=te),j&&(j.onclick=te),S&&(S.onclick=A=>{A.target===S&&te()});const be=document.getElementById("modal-delete-element"),W=document.getElementById("close-delete-modal"),Ee=document.getElementById("btn-cancel-delete"),ve=document.getElementById("btn-confirm-delete");let Q=null;const de=A=>{Q=A;const V=document.getElementById("delete-modal-name"),Ne=document.getElementById("delete-modal-category"),ne=document.getElementById("delete-modal-scenes");if(V&&(V.textContent=A.name),Ne&&(Ne.textContent=A.category),ne){const xe=Array.isArray(A.scenes)&&A.scenes.length>0?A.scenes:[A.sceneNumber];ne.textContent=`Associated with: ${xe.map(I=>`Scene ${I}`).join(", ")}`}pt(be)},Y=()=>{Q=null,Be(be)};W&&(W.onclick=Y),Ee&&(Ee.onclick=Y),be&&(be.onclick=A=>{A.target===be&&Y()}),ve&&(ve.onclick=async()=>{if(!Q)return;const A=Q;ve.disabled=!0,ve.classList.add("opacity-75","cursor-not-allowed");try{const V=await oo(o,A.id);V&&(V.success||V.removedId)?(w(`Deleted "${A.name}" from breakdown`),Y(),r=null,await m()):w(V?.message||"Failed to delete element")}catch(V){w("Error deleting element: "+(V.message||"Network error"))}finally{ve.disabled=!1,ve.classList.remove("opacity-75","cursor-not-allowed")}});const Se=document.getElementById("btn-export-breakdown-pdf");Se&&(Se.onclick=async()=>{try{const A=await Ct(o,a,l);ya(A,{title:"Chronicles of Dust",draft:"Draft 4.2"}),w(`Exported Breakdown Report (${A.length} elements) PDF`)}catch(A){console.error(A),w("Failed to export breakdown PDF")}}),T&&(T.onsubmit=async A=>{A.preventDefault();const V=document.getElementById("elem-name")?.value,Ne=document.getElementById("elem-cat")?.value,ne=document.getElementById("elem-scenes")?.value||"18",xe=document.getElementById("elem-status")?.value||"Confirmed",I=document.getElementById("elem-desc")?.value;if(!V)return;const $e=ne.split(",").map(ae=>Number(ae.trim())).filter(ae=>!isNaN(ae)),je=$e.length>0?$e[0]:18,Pe={name:V,category:Ne,sceneNumber:je,sceneId:`scene-${je}`,scenes:$e,description:I,status:xe,sourceSnippet:`Manual production element registered for Scene ${$e.join(", ")}`,assignedActor:document.getElementById("add-actor")?.value||"",castingStatus:document.getElementById("add-casting-status")?.value||"Uncast / Open",actorAvailability:document.getElementById("add-availability")?.value||"",sourcingType:document.getElementById("add-prop-source")?.value||"",quantity:document.getElementById("add-prop-qty")?.value||"",readinessStatus:document.getElementById("add-prop-readiness")?.value||"",continuityNotes:document.getElementById("add-prop-continuity")?.value||"",requiredResources:document.getElementById("add-fx-res")?.value||"",technicalRequirements:document.getElementById("add-fx-tech")?.value||"",safetyNotes:document.getElementById("add-fx-safety")?.value||"",safetyPlanningStatus:document.getElementById("add-stunt-status")?.value||"",qualifiedPersonnel:document.getElementById("add-stunt-personnel")?.value||"",coordinationRequirements:document.getElementById("add-stunt-coordination")?.value||"",context:document.getElementById("add-loc-context")?.value||"",lighting:document.getElementById("add-loc-lighting")?.value||"",locationStatus:document.getElementById("add-loc-status")?.value||"",notes:document.getElementById("add-dept-notes")?.value||""};await lo(o,Pe),w(`Added "${V}" to Scene ${$e.join(", ")}`),Be(),T.reset(),m()})}function Ol(e=null,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=t||n.get("scriptId")||B.state.selectedScriptId||"chronicles-of-dust",a=s||n.get("csId"),l=n.get("action")==="new",i=n.get("action")==="edit",r=e||n.get("from");let f="/production";i?f=`/production/call-sheets?scriptId=${o}&csId=${a}`:a||l?f=`/production/call-sheets?scriptId=${o}`:f=r||"/production";const p=f;return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${ct("Pre-Production",i?"Edit Call Sheet":a?"Call Sheet Inspector":l?"Create New Call Sheet":"Call Sheets Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${As(i?"Edit Call Sheet":a?"Call Sheet Detail":l?"New Call Sheet":"Call Sheets",i?"edit_note":"assignment",p,!a&&!l&&!i?`
            <a href="/production/call-sheets?scriptId=${o}&action=new" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>New Call Sheet</span>
            </a>
          `:"",null,"Daily call sheets, crew calls and shooting details.")}

        <div id="callsheet-view-container" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading call sheet records...</div>
        </div>
      </main>

      ${ot("production")}
    </div>
  `}async function va(e,t=null,s=null,n=null){const o=new URLSearchParams(window.location.search||""),a=s||o.get("scriptId")||B.state.selectedScriptId||"chronicles-of-dust",l=n||o.get("csId"),i=o.get("action")==="new",r=o.get("action")==="edit",f=document.getElementById("callsheet-view-container");if(!f)return;const d=(localStorage.getItem("scriptora_prod_role")||"Owner")==="Owner";if(r&&l){const c=await Nn(a,l);if(!c){f.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>';return}const m=c.status==="Confirmed"||c.isPublished;f.innerHTML=`
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
    `;const g=document.getElementById("form-edit-callsheet");g&&(g.onsubmit=async h=>{h.preventDefault();const b=document.getElementById("edit-cs-day")?.value||c.shootDay,y=document.getElementById("edit-cs-date")?.value||c.shootDate,P=document.getElementById("edit-cs-crewcall")?.value||c.generalCrewCall,S=document.getElementById("edit-cs-shootcall")?.value||c.shootingCall,N=document.getElementById("edit-cs-breakfast")?.value||c.breakfastTime,E=document.getElementById("edit-cs-wrap")?.value||c.estimatedWrap,j=document.getElementById("edit-cs-locname")?.value||c.locationName,T=document.getElementById("edit-cs-address")?.value||c.locationAddress,ce=document.getElementById("edit-cs-parking")?.value||c.parkingNotes,te=document.getElementById("edit-cs-hospital")?.value||c.nearestHospital,be=document.getElementById("edit-cs-weather")?.value||c.weatherSummary,W=document.getElementById("edit-cs-instructions")?.value||c.specialInstructions;await ro(a,c.id,{shootDay:b,shootDate:y,generalCrewCall:P,shootingCall:S,breakfastTime:N,estimatedWrap:E,locationName:j,locationAddress:T,parkingNotes:ce,nearestHospital:te,weatherSummary:be,specialInstructions:W,isDraftRevision:m}),w(m?"Saved as new revision draft":"Call Sheet updated successfully"),e(`/production/call-sheets?scriptId=${a}&csId=${c.id}`)})}else if(i){const c=await It(a);f.innerHTML=`
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
              ${c.map(y=>`
                <option value="${y.dayNumber}" data-title="${y.title}" data-loc="${y.location}" data-date="${y.date}">
                  Day ${y.dayNumber} of 14 · ${y.date} — ${y.title} (${y.location})
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
    `;const m=document.getElementById("tab-linked"),g=document.getElementById("tab-manual"),h=document.getElementById("section-linked-day");m&&g&&(m.onclick=()=>{m.classList.add("bg-white","text-blue-700","shadow-2xs"),g.classList.remove("bg-white","text-blue-700","shadow-2xs"),h?.classList.remove("hidden")},g.onclick=()=>{g.classList.add("bg-white","text-blue-700","shadow-2xs"),m.classList.remove("bg-white","text-blue-700","shadow-2xs"),h?.classList.add("hidden")});const b=document.getElementById("form-create-callsheet");b&&(b.onsubmit=async y=>{y.preventDefault();const P=document.getElementById("new-cs-day")?.value||"3",S=document.getElementById("new-cs-date")?.value,N=document.getElementById("new-cs-crewcall")?.value,E=document.getElementById("new-cs-locname")?.value,j=document.getElementById("new-cs-address")?.value,T=document.getElementById("new-cs-hospital")?.value,ce=document.getElementById("new-cs-parking")?.value,te=await io(a,{shootDay:`Day ${P} of 14`,shootDate:S,generalCrewCall:N,shootingCall:"06:30 AM",locationName:E,locationAddress:j,nearestHospital:T,parkingNotes:ce});w(`Created Call Sheet #${te.callSheetNumber}`),e(`/production/call-sheets?scriptId=${a}&csId=${te.id}`)})}else if(l){const c=await Nn(a,l);if(!c){f.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>';return}const m=c.status==="Confirmed"||c.isPublished;f.innerHTML=`
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
            ${(c.scenes||[]).map(y=>`
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <a href="/production/schedule?scriptId=${a}&sceneId=scene-${y.sceneNumber}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${a}&csId=${c.id}`)}" class="w-16 font-mono font-bold text-blue-700 hover:underline" title="Inspect Scene Logistics in Schedule">Sc ${y.sceneNumber}</a>
                <div class="flex-1 min-w-0 pr-2">
                  <div class="font-semibold text-slate-900 truncate">${y.heading}</div>
                  <div class="text-[11px] text-slate-500 truncate">${y.desc}</div>
                </div>
                <span class="w-20 text-center font-mono text-[11px]">${y.pages}</span>
                <span class="w-32 text-right font-medium text-[11px] text-slate-700 truncate">${(y.cast||[]).map(P=>`<a href="/production/breakdown?scriptId=${a}&category=Cast&character=${encodeURIComponent(P)}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${a}&csId=${c.id}`)}" class="hover:underline font-semibold" title="Inspect ${P} in Breakdown">${P}</a>`).join(", ")}</span>
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
            ${(c.castCalls||[]).map(y=>`
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <a href="/production/breakdown?scriptId=${a}&category=Cast&character=${encodeURIComponent(y.character)}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${a}&csId=${c.id}`)}" class="w-32 font-bold text-slate-900 hover:text-blue-700 hover:underline" title="Inspect ${y.character} in Breakdown">${y.character}</a>
                <span class="flex-1 font-medium text-slate-700">${y.actor}</span>
                <span class="w-20 text-center font-mono text-[11px] text-slate-600">${y.pickup}</span>
                <span class="w-20 text-center font-mono text-[11px] text-slate-600">${y.hmuCall}</span>
                <span class="w-20 text-right font-mono font-bold text-blue-700">${y.onSet}</span>
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
    `;const g=document.getElementById("btn-print-callsheet");g&&(g.onclick=()=>{try{const y=B.state.activeScript||(B.state.scripts||[]).find(P=>P.id===a);Un(c,{title:y?.title||"Chronicles of Dust",company:y?.company||"Badlands Anthology LLC",draft:y?.draft||"Draft 4.2"}),w(`Exported Call Sheet #${c.callSheetNumber} PDF`)}catch(y){console.error(y),w("Failed to generate Call Sheet PDF")}});const h=document.getElementById("btn-delete-callsheet");h&&(h.onclick=async()=>{if(!confirm(`Are you sure you want to delete draft Call Sheet #${c.callSheetNumber}? This cannot be undone.`))return;const y=await Pn(a,c.id);y.success?(w(`Call Sheet #${c.callSheetNumber} deleted`),e(`/production/call-sheets?scriptId=${a}`)):w(y.message||"Failed to delete call sheet")});const b=document.getElementById("btn-publish-callsheet");b&&(b.onclick=async()=>{confirm("Approve and lock this call sheet as an official immutable snapshot?")&&(await co(a,c.id),w("Call Sheet published & snapshot locked"),e(`/production/call-sheets?scriptId=${a}&csId=${c.id}`))})}else{const c=await Wt(a);f.innerHTML=`
      <div class="flex items-center justify-between">
        <h2 class="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px] text-blue-600">assignment</span>
          <span>Call Sheets Catalogue (${c.length})</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${c.map(m=>{const g=m.status==="Confirmed"||m.isPublished;return`
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
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-medium shrink-0 ${g?"bg-slate-100 text-slate-700":"bg-amber-50/80 border border-amber-200 text-amber-800"}">
                    ${g?"Published":"Draft"}
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
                  ${!g&&d?`
                    <button class="btn-card-delete p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors" data-id="${m.id}" data-num="${m.callSheetNumber}" title="Delete Draft">
                      <span class="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  `:""}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    `,f.querySelectorAll(".cs-card").forEach(m=>{m.onclick=()=>{const g=m.getAttribute("data-id");e(`/production/call-sheets?scriptId=${a}&csId=${g}`)}}),f.querySelectorAll(".btn-card-export").forEach(m=>{m.onclick=g=>{g.stopPropagation();const h=m.getAttribute("data-id"),b=c.find(y=>y.id===h);if(b){const y=B.state.activeScript||(B.state.scripts||[]).find(P=>P.id===a);Un(b,{title:y?.title||"Chronicles of Dust",company:y?.company||"Badlands Anthology LLC",draft:y?.draft||"Draft 4.2"}),w(`Exported Call Sheet #${b.callSheetNumber} PDF`)}}}),f.querySelectorAll(".btn-card-delete").forEach(m=>{m.onclick=async g=>{g.stopPropagation();const h=m.getAttribute("data-id"),b=m.getAttribute("data-num");if(!confirm(`Delete draft Call Sheet #${b}?`))return;const y=await Pn(a,h);y.success?(w(`Call Sheet #${b} deleted`),va(e,t,s)):w(y.message||"Failed to delete")}})}}function jl(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=t||s.get("scriptId")||B.state.selectedScriptId||"chronicles-of-dust",o=s.get("mode")||"dialogue",l=e||s.get("from")||`/production?scriptId=${n}`;return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${ct("Pre-Production","Dialogue Sheets & Actor Sides")}

      <main class="flex-1 w-full max-w-2xl mx-auto px-4 pt-16 pb-28 flex flex-col gap-3.5 fade-in">
        ${As("Dialogue & Actor Sides","theater_comedy",l,"",null,"Dialogue sheets and actor scene sides.")}
        
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

      ${ot("production")}
    </div>
  `}async function Fl(e,t=null,s=null){const n=new URLSearchParams(window.location.search||"");s||n.get("scriptId")||B.state.selectedScriptId;let o=n.get("mode")||"dialogue",a="KEVIN",l=n.get("scene")||"1";const i=document.getElementById("tab-mode-dialogue"),r=document.getElementById("tab-mode-sides"),f=document.getElementById("filter-controls"),p=document.getElementById("dialogue-sides-content"),d=[{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"KEVIN",parenthetical:"(adjusting filter)",dialogue:"Wind gauge is spiking past forty knots, Marcus. Did you check the terminal pressure at the intake valve?",action:"Kevin wipes gritty red dust from the gauge glass with his thumb."},{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"MARCUS",parenthetical:"(shrugging)",dialogue:"Telemetry's been on the fritz since dawn. Central syndicate says it's thermal fluctuation.",action:"Marcus gestures with a cigarette toward the desert horizon."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"MEERA",parenthetical:"(eyes on monitor)",dialogue:"That's no fluctuation. Look at line three. Someone bypassed the telemetry loop eighty miles upriver.",action:"Meera brings up a wireframe map showing a hidden subterranean siphon branch."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"KEVIN",parenthetical:"(tense)",dialogue:"They're siphoning straight out of the municipal reservoir into private holding tanks.",action:"Kevin taps the terminal screen, freezing the anomaly coordinates."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"COMMANDER VANCE",parenthetical:"(smooth, unhurried)",dialogue:"Water belongs to those who possess the energy to lift it from the rock, Kevin. The frontier was built on that premise.",action:"Vance sips cold tea, watching the massive hydraulic pump pistons rise and plunge."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"KEVIN",parenthetical:"(stepping forward)",dialogue:"You signed the 2041 Treaty. If the southern aquifer collapses, ten thousand families wake up to dry taps.",action:"Kevin places the legal registry deed onto Vance's polished mahogany desk."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(shouting over the roar)",dialogue:"Hold the pylon, Meera! If the high-pressure valve seals now, the back-surge will fracture the entire chamber!",action:"Brine water sprays across Kevin's visor as he locks the hydraulic bypass manifold."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"MEERA",parenthetical:"(straining on cable)",dialogue:"Then don't let them break! Reroute the secondary relay through the floodgate breaker!",action:"Meera kicks off the iron catwalk, swinging across the chasm to secure the emergency lock."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(levering the valve bar)",dialogue:"Bypass locked! Bleed the line! Three... two... one!",action:"The pressure needles drop from red to blue as the municipal pipeline fills with fresh current."}];function c(){const b=new Date,y=P=>String(P).padStart(2,"0");return`${y(b.getDate())}/${y(b.getMonth()+1)}/${b.getFullYear()}`}function m(){if(f)if(o==="dialogue"){f.innerHTML=`
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
      `;const b=document.getElementById("char-select");b&&(b.onchange=y=>{a=y.target.value,g()})}else{f.innerHTML=`
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
      `;const b=document.getElementById("scene-select");b&&(b.onchange=y=>{l=y.target.value,g()})}}function g(){if(!p)return;const b=c();if(o==="dialogue"){const y=d.filter(P=>P.character===a);p.innerHTML=`
        <!-- Watermark Header -->
        <div class="font-sans flex flex-col gap-1">
          <div class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">SCRIPTORA · PRODUCTION EXTRACT</div>
          <h2 class="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
            CHARACTER DIALOGUE SHEET<br />— ${a}
          </h2>
          <div class="text-[12px] text-slate-600 font-medium mt-0.5">Screenplay: Chronicles of Dust · Pinned Version: Draft 4.2</div>
          <div class="text-[12px] text-slate-500">Lines: ${y.length} Cues</div>
          <div class="text-[12px] text-slate-500">Date: ${b}</div>
          <div class="w-full h-0.5 bg-slate-900 mt-2 mb-4"></div>
        </div>

        <!-- Dialogue Elements -->
        <div class="space-y-6 pt-1 max-w-2xl mx-auto font-mono w-full">
          ${y.map(P=>`
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
      `}else{const y=d.filter(S=>String(S.sceneNum)===String(l)),P=y[0]||{heading:`SCENE ${l}`};p.innerHTML=`
        <!-- Sides Masthead -->
        <div class="font-sans flex flex-col gap-1">
          <div class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">SCRIPTORA · PRODUCTION SIDES</div>
          <h2 class="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
            ACTOR SIDES<br />— SCENE ${l}
          </h2>
          <div class="text-[12px] text-slate-600 font-medium mt-0.5">${P.heading} · Draft 4.2</div>
          <div class="text-[12px] text-slate-500">Rehearsal & On-Set Copy</div>
          <div class="text-[12px] text-slate-500">Date: ${b}</div>
          <div class="w-full h-0.5 bg-slate-900 mt-2 mb-4"></div>
        </div>

        <!-- Formatted Script Scene Beat -->
        <div class="space-y-4 pt-1 max-w-2xl mx-auto leading-relaxed font-mono w-full">
          <div class="font-bold text-[13px] text-slate-900 uppercase">
            ${P.heading}
          </div>

          ${y.map(S=>`
            <div class="space-y-1.5 my-3">
              ${S.action?`
                <div class="text-slate-700 text-[12px] leading-relaxed italic mb-2 font-sans">
                  ${S.action}
                </div>
              `:""}
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest">
                ${S.character}
              </div>
              ${S.parenthetical?`
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${S.parenthetical}
                </div>
              `:""}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto">
                ${S.dialogue}
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
      `}h()}function h(){const b=document.getElementById("btn-export-pdf");b&&(b.onclick=()=>{try{if(o==="dialogue"){const y=d.filter(P=>P.character===a);Nl(a,y,{title:"Chronicles of Dust",draft:"Draft 4.2"}),w(`Exported ${a} Dialogue Sheet PDF`)}else{const y=Number(l),P=d.filter(N=>N.sceneNum===y),S=P[0]||{heading:`SCENE ${y}`};Tl(l,P,{heading:S.heading,pages:"2 1/8"},{title:"Chronicles of Dust",draft:"Draft 4.2"}),w(`Exported Scene ${l} Actor Sides PDF`)}}catch(y){console.error(y),w("Failed to generate PDF document")}})}i&&r&&(i.onclick=()=>{o="dialogue",i.className="flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all bg-white text-blue-600 shadow-2xs cursor-pointer text-center",r.className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all text-slate-600 hover:text-slate-900 cursor-pointer text-center",m(),g()},r.onclick=()=>{o="sides",r.className="flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all bg-white text-blue-600 shadow-2xs cursor-pointer text-center",i.className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all text-slate-600 hover:text-slate-900 cursor-pointer text-center",m(),g()}),m(),g()}const _l={Cast:"person",Locations:"location_on",Props:"inventory_2","Practical FX":"science",Stunts:"sports_kabaddi",Costumes:"checkroom",Vehicles:"commute",Sound:"music_note","Hair & Makeup":"face",Equipment:"videocam","Special Equipment":"videocam"};function Hl(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||B.state.selectedScriptId;const n=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${ct("Pre-Production","Master Shooting Schedule")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-4 fade-in">
        <!-- SubNav with Title, Project Context & Primary Actions -->
        ${As("Shooting Schedule","calendar_month",n||"/production",`
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

      ${ot("production")}
    </div>
  `}async function Ul(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||B.state.selectedScriptId||"chronicles-of-dust",a=document.getElementById("schedule-calendar-container"),l=document.getElementById("day-detail-modal");if(!a)return;let i=await It(o),r=await is(o),f=await Ct(o);const p=new Set,d=new Set,c=new Set;function m(){a.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-3">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-blue-600 text-lg">calendar_month</span>
            <h3 class="font-heading font-semibold text-sm text-slate-900">Shooting Calendar Matrix</h3>
          </div>
          <span class="text-xs text-slate-500 font-medium">October 24 – October 30, 2026</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-1">
          ${i.map(ne=>{const xe=(ne.sceneNumbers||[]).map(I=>r.find($e=>$e.sceneNumber===I)).filter(Boolean);return`
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
                    ${xe.slice(0,3).map(I=>`
                      <button class="btn-badge-scene px-1.5 py-0.5 rounded bg-white hover:bg-blue-50 hover:border-blue-300 border border-slate-200 font-mono text-[9px] font-bold text-slate-700 transition-colors cursor-pointer" data-scene-id="${I.id}" title="View Scene ${I.sceneNumber} details">#${I.sceneNumber}</button>
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
    `,a.querySelectorAll(".calendar-day-card").forEach(ne=>{ne.onclick=()=>{const xe=ne.getAttribute("data-day");xe&&T(xe)}}),a.querySelectorAll(".btn-badge-scene").forEach(ne=>{ne.onclick=xe=>{xe.stopPropagation();const I=ne.getAttribute("data-scene-id");I&&W(I)}})}let g=null,h=!1,b=!1;const y=new Set;let P=!1;const S=new Set,N=new Set;let E=null;function j(ne){const xe=(ne.sceneNumbers||[]).map(Pe=>r.find(ae=>ae.sceneNumber===Pe)).filter(Boolean);let I=0;xe.forEach(Pe=>{const ae=(Pe.pages||"").match(/(\d+)\s*(\d+)\/8/);if(ae)I+=parseInt(ae[1],10)*8+parseInt(ae[2],10);else{const re=parseFloat(Pe.pages);isNaN(re)||(I+=Math.round(re*8))}});const $e=Math.floor(I/8),je=I%8;return ne.totalPages=`${$e} ${je}/8`,ne.totalPages}function T(ne,xe=null){const I=i.find(U=>U.dayNumber===Number(ne));if(!I)return;if(g=I.dayNumber,xe){const U=r.find(C=>C.id===xe||String(C.sceneNumber)===String(xe));U&&p.add(U.id)}const $e=document.getElementById("modal-day-badge"),je=document.getElementById("modal-day-title"),Pe=document.getElementById("modal-day-sub"),ae=document.getElementById("modal-day-content"),re=document.getElementById("modal-day-menu-btn"),D=document.getElementById("modal-day-menu-dropdown"),Ce=document.getElementById("modal-day-edit-btn"),Oe=document.getElementById("modal-day-menu-edit"),pe=document.getElementById("modal-day-lock-toggle"),Fe=document.getElementById("modal-day-lock-label"),me=document.getElementById("modal-day-lock-icon"),Ue=document.getElementById("modal-day-delete");$e&&($e.textContent=`D${I.dayNumber}`),je&&(je.textContent=`Day ${I.dayNumber} • ${I.date.split(",")[0]}`),Pe&&(Pe.textContent=`${I.location}${I.totalPages?` • ${I.totalPages} pgs`:""}`),re&&D&&(D.classList.add("hidden"),D.onclick=U=>U.stopPropagation(),re.onclick=U=>{U.stopPropagation();const C=D.classList.contains("hidden");document.querySelectorAll("[data-scriptora-popup]").forEach(R=>{R!==D&&R.classList.add("hidden")}),C?(D.classList.remove("hidden"),Es(re,D,{placement:"bottom-end",zIndex:1e4})):D.classList.add("hidden")},re._outsideClickAttached||(re._outsideClickAttached=!0,document.addEventListener("click",()=>{D.classList.add("hidden")})),E={close:()=>D.classList.add("hidden")}),Ce&&(Ce.onclick=()=>{h=!h,T(I.dayNumber)}),Oe&&(Oe.onclick=U=>{U.stopPropagation(),E?.close(),h=!h,T(I.dayNumber)}),Pe&&(Pe.onclick=()=>{h=!0,T(I.dayNumber)}),Fe&&(Fe.textContent=I.isLocked?"Unlock Day":"Lock Day"),me&&(me.textContent=I.isLocked?"lock_open":"lock"),pe&&(pe.onclick=async U=>{U.stopPropagation(),E?.close(),I.isLocked=!I.isLocked,await Nt(o,I.dayNumber,{isLocked:I.isLocked}),w(`Day ${I.dayNumber} ${I.isLocked?"locked":"unlocked"}`),Fe&&(Fe.textContent=I.isLocked?"Unlock Day":"Lock Day"),me&&(me.textContent=I.isLocked?"lock_open":"lock"),m()}),Ue&&(Ue.onclick=async U=>{if(U.stopPropagation(),E?.close(),!confirm(`Are you sure you want to remove Shoot Day ${I.dayNumber}? Any scenes should be moved first.`))return;const C=await mo(o,I.dayNumber);C.success?(w(`Shoot Day ${I.dayNumber} deleted`),be(),i=await It(o),m()):w(C.message||"Failed to delete day")});const Me=(I.sceneNumbers||[]).map(U=>r.find(C=>C.sceneNumber===U)).filter(Boolean),De=r.filter(U=>!I.sceneNumbers.includes(U.sceneNumber));if(ae){ae.innerHTML=`
        <!-- Optional Inline Day Info Editor -->
        ${h?`
          <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex flex-col gap-2.5 animate-in fade-in">
            <div class="flex items-center justify-between">
              <span class="font-heading font-bold text-xs text-blue-950 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px] text-blue-600">edit_calendar</span>
                <span>Edit Shoot Day ${I.dayNumber} Info</span>
              </span>
              <button id="btn-cancel-day-top" class="text-slate-400 hover:text-slate-700 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div>
                <label class="block text-slate-600 font-medium mb-1">Shoot Date</label>
                <input type="text" id="input-edit-day-date" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500" value="${I.date}" placeholder="e.g. Oct 25, 2026" />
              </div>
              <div>
                <label class="block text-slate-600 font-medium mb-1">Estimated Daily Hours</label>
                <input type="number" id="input-edit-day-hours" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500" value="${I.estHours||11}" step="0.5" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-slate-600 font-medium mb-1">Primary Location / Focus</label>
                <input type="text" id="input-edit-day-loc" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500" value="${I.location||""}" placeholder="e.g. Chamber B Dry Tank" />
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
          <span class="font-heading font-semibold text-slate-900 text-xs">Assigned Scenes (${Me.length})</span>
          <button id="btn-toggle-assign-scene" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-[11px] font-semibold transition-colors cursor-pointer" title="Assign scene to this shoot day">
            <span class="material-symbols-outlined text-[13px]">add</span>
            <span>Assign Scene</span>
          </button>
        </div>

        <!-- Inline Scene Assign Selector -->
        ${P?`
          <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex flex-col gap-2.5 animate-in fade-in w-full min-w-0 box-border">
            <div class="flex items-center justify-between text-xs font-semibold text-blue-900 gap-2">
              <span class="truncate">Add Screenplay Scene to Shoot Day ${I.dayNumber}</span>
              <button id="btn-close-assign-scene" class="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer shrink-0" title="Close scene selector">
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            ${De.length>0?`
              <div class="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-2 w-full min-w-0">
                <div class="min-w-0 flex-1 w-full">
                  <label for="select-scene-to-assign" class="sr-only">Select scene to assign to shoot day</label>
                  <select id="select-scene-to-assign" class="w-full min-w-0 max-w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 sm:py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500 cursor-pointer truncate">
                    ${De.map(v=>`
                      <option value="${v.sceneNumber}">#${v.sceneNumber} ${v.heading} (${v.pages} pgs)</option>
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
          ${Me.length>0?Me.map((v,L)=>{const X=p.has(v.id),J=d.has(v.id),se=c.has(v.id),Ae=y.has(v.id),Xe=S.has(v.id),bt=N.has(v.id),Qe=f.filter(Le=>Le.sceneId===v.id||Le.sceneNumber===v.sceneNumber||Array.isArray(Le.scenes)&&Le.scenes.includes(v.sceneNumber));return`
              <div class="scene-item-card rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-all" data-scene-num="${v.sceneNumber}" data-scene-id="${v.id}">
                ${Ae?`
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
                      <button class="btn-scene-up p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer" data-scene="${v.sceneNumber}" ${L===0?"disabled":""} title="Move earlier in shooting order">
                        <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
                      </button>
                      <button class="btn-scene-down p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer" data-scene="${v.sceneNumber}" ${L===Me.length-1?"disabled":""} title="Move later in shooting order">
                        <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
                      </button>
                      <button class="btn-edit-scene-quick p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer" data-scene-id="${v.id}" title="Edit scene heading & pages">
                        <span class="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button class="btn-toggle-scene-inline px-2.5 py-1 rounded-lg ${X?"bg-blue-600 text-white font-semibold":"bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold border border-blue-200/80"} text-[11px] flex items-center gap-1 transition-colors cursor-pointer" data-scene-id="${v.id}">
                        <span>Details</span>
                        <span class="material-symbols-outlined text-[14px] transition-transform inline-details-chevron ${X?"rotate-180":""}">expand_more</span>
                      </button>
                    </div>
                  </div>
                `}

                <!-- Inline Expanded Scene Details (Normal Document Flow) -->
                <div class="scene-inline-details border-t border-slate-100 bg-slate-50/60 p-3 ${X?"":"hidden"} flex flex-col gap-2.5 text-xs text-slate-700">
                  <!-- Initial Compact Summary: Full heading, assigned day, screenplay/draft, snippet, compact quick actions -->
                  <div class="flex flex-col gap-1.5">
                    <div>
                      <h4 class="font-heading font-bold text-xs text-slate-900 leading-snug">#${v.sceneNumber} ${v.heading}</h4>
                      <p class="text-[11px] text-slate-500 mt-0.5">
                        Shoot Day ${I.dayNumber} • Chronicles of Dust • Draft 4.2 (Pinned)
                      </p>
                    </div>

                    <!-- Editable Scene Snippet -->
                    ${Xe?`
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
                      <span class="material-symbols-outlined text-[16px] text-slate-400 transition-transform more-details-chevron ${J?"rotate-180":""}">expand_more</span>
                    </button>

                    <div class="more-details-panel ${J?"":"hidden"} flex flex-col gap-2.5 pt-2 text-xs">
                      <!-- Cast with Add & Remove functionality -->
                      <div class="flex flex-col gap-1.5">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Cast</span>
                          <button class="btn-toggle-add-cast text-[11px] text-blue-600 font-medium hover:underline flex items-center gap-0.5 cursor-pointer" data-scene-id="${v.id}">
                            <span class="material-symbols-outlined text-[13px]">add</span>
                            <span>Add Cast</span>
                          </button>
                        </div>
                        ${bt?`
                          <div class="flex items-center gap-1.5 py-1">
                            <input type="text" class="input-new-cast-name flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500" placeholder="Character name (e.g. AARAV)" />
                            <button class="btn-save-new-cast px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] shadow-2xs cursor-pointer" data-scene-id="${v.id}">Add</button>
                            <button class="btn-cancel-new-cast px-2 py-1 rounded-lg text-slate-500 hover:bg-slate-100 text-[11px] cursor-pointer" data-scene-id="${v.id}">Cancel</button>
                          </div>
                        `:""}
                        <div class="flex items-center gap-1.5 flex-wrap">
                          ${v.cast&&v.cast.length>0?v.cast.map(Le=>`
                            <span class="inline-flex items-center gap-1 pl-1.5 pr-1 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-800">
                              <span class="w-3.5 h-3.5 rounded-full bg-slate-100 text-slate-600 text-[9px] flex items-center justify-center font-bold">${Le.charAt(0)}</span>
                              <span>${Le}</span>
                              <button class="btn-remove-cast-member text-slate-400 hover:text-rose-600 ml-0.5 cursor-pointer" data-scene-id="${v.id}" data-cast="${Le}" title="Remove character">
                                <span class="material-symbols-outlined text-[12px]">close</span>
                              </button>
                            </span>
                          `).join(""):'<span class="text-slate-400 text-[11px] italic">No cast assigned</span>'}
                        </div>
                      </div>

                      <!-- Breakdown Elements -->
                      <div class="flex flex-col gap-1 pt-1 border-t border-slate-200/60">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Breakdown Elements (${Qe.length})</span>
                          <button class="btn-scene-breakdown text-[11px] text-blue-600 font-medium hover:underline cursor-pointer" data-scene-num="${v.sceneNumber}">Edit in Breakdown &rarr;</button>
                        </div>
                        ${Qe.length>0?`
                          <div class="flex items-center gap-1.5 flex-wrap">
                            ${Qe.map(Le=>`
                              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] text-slate-700">
                                <span class="material-symbols-outlined text-[13px] text-blue-600">${_l[Le.category]||"label"}</span>
                                <span>${Le.name}</span>
                                ${Le.category?`<span class="text-slate-400 text-[9px]">(${Le.category})</span>`:""}
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
                            ${i.map(Le=>`
                              <option value="${Le.dayNumber}" ${Le.dayNumber===I.dayNumber?"selected":""}>
                                Day ${Le.dayNumber} (${Le.date.split(",")[0]})
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
                        <div class="notes-display-mode ${se?"hidden":""} flex flex-col gap-1 text-[11px] text-slate-600 bg-white border border-slate-200/70 rounded-lg p-2">
                          ${v.directorNotes||v.continuityNotes?`
                            ${v.directorNotes?`<div><span class="font-medium text-slate-800">Director:</span> ${v.directorNotes}</div>`:""}
                            ${v.continuityNotes?`<div><span class="font-medium text-slate-800">Continuity:</span> ${v.continuityNotes}</div>`:""}
                          `:`
                            <div class="text-slate-400 italic">No production or continuity notes logged.</div>
                          `}
                        </div>

                        <!-- Editable Fields (Only visible when explicitly editing) -->
                        <div class="notes-edit-mode ${se?"":"hidden"} flex flex-col gap-2 bg-white border border-slate-200 rounded-xl p-2.5">
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
      `;const U=document.getElementById("btn-cancel-day-top"),C=document.getElementById("btn-cancel-day-info"),R=document.getElementById("btn-save-day-info");U&&(U.onclick=()=>{h=!1,T(I.dayNumber)}),C&&(C.onclick=()=>{h=!1,T(I.dayNumber)}),R&&(R.onclick=async()=>{const v=document.getElementById("input-edit-day-date")?.value?.trim(),L=parseFloat(document.getElementById("input-edit-day-hours")?.value)||I.estHours,X=document.getElementById("input-edit-day-loc")?.value?.trim();v&&(I.date=v),L&&(I.estHours=L),X&&(I.location=X),await Nt(o,I.dayNumber,{date:I.date,estHours:I.estHours,location:I.location}),w(`Shoot Day ${I.dayNumber} updated`),h=!1,m(),T(I.dayNumber)});const K=document.getElementById("btn-toggle-day-constraints"),G=document.getElementById("day-constraints-content"),ee=document.getElementById("constraints-chevron");K&&G&&(K.onclick=()=>{const v=G.classList.toggle("hidden");ee&&ee.classList.toggle("rotate-180",!v)});const ge=document.getElementById("btn-edit-constraints"),fe=document.getElementById("btn-cancel-constraints"),he=document.getElementById("btn-save-constraints");ge&&(ge.onclick=()=>{b=!0,T(I.dayNumber),document.getElementById("day-constraints-content")?.classList.remove("hidden")}),fe&&(fe.onclick=()=>{b=!1,T(I.dayNumber),document.getElementById("day-constraints-content")?.classList.remove("hidden")}),he&&(he.onclick=async()=>{const v=document.getElementById("input-constraints-loc")?.value?.trim(),L=parseFloat(document.getElementById("input-constraints-hours")?.value)||I.estHours,X=document.getElementById("input-constraints-turnaround")?.value?.trim();v&&(I.location=v),L&&(I.estHours=L),X&&(I.turnaroundNote=X),await Nt(o,I.dayNumber,{location:I.location,estHours:I.estHours,turnaroundNote:I.turnaroundNote}),w("Production constraints updated"),b=!1,m(),T(I.dayNumber),document.getElementById("day-constraints-content")?.classList.remove("hidden")});const ke=document.getElementById("btn-toggle-assign-scene"),_=document.getElementById("btn-close-assign-scene"),Re=document.getElementById("btn-confirm-assign-scene");ke&&(ke.onclick=()=>{P=!P,T(I.dayNumber)}),_&&(_.onclick=()=>{P=!1,T(I.dayNumber)}),Re&&(Re.onclick=async()=>{const v=Number(document.getElementById("select-scene-to-assign")?.value);v&&!I.sceneNumbers.includes(v)&&(I.sceneNumbers.push(v),j(I),await Nt(o,I.dayNumber,{sceneNumbers:I.sceneNumbers,totalPages:I.totalPages}),w(`Scene #${v} added to Shoot Day ${I.dayNumber}`),P=!1,m(),T(I.dayNumber))}),ae.querySelectorAll(".btn-edit-scene-quick").forEach(v=>{v.onclick=()=>{const L=v.getAttribute("data-scene-id");L&&(y.add(L),T(I.dayNumber))}}),ae.querySelectorAll(".btn-cancel-scene-edit").forEach(v=>{v.onclick=()=>{const L=v.getAttribute("data-scene-id");L&&(y.delete(L),T(I.dayNumber))}}),ae.querySelectorAll(".btn-save-scene-edit").forEach(v=>{v.onclick=async()=>{const L=v.getAttribute("data-scene-id"),X=v.closest(".scene-item-card"),J=X?.querySelector(".input-scene-heading")?.value?.trim(),se=X?.querySelector(".input-scene-pages")?.value?.trim(),Ae=X?.querySelector(".input-scene-complexity")?.value,Xe=r.find(bt=>bt.id===L);Xe&&(J&&(Xe.heading=J),se&&(Xe.pages=se),Ae&&(Xe.complexity=Ae),await fs(o,Xe.id,{heading:J,pages:se,complexity:Ae}),j(I),await Nt(o,I.dayNumber,{totalPages:I.totalPages}),w(`Scene #${Xe.sceneNumber} updated`),y.delete(L),m(),T(I.dayNumber))}}),ae.querySelectorAll(".btn-remove-scene-day").forEach(v=>{v.onclick=async()=>{const L=Number(v.getAttribute("data-scene"));L&&(I.sceneNumbers=I.sceneNumbers.filter(X=>X!==L),j(I),await Nt(o,I.dayNumber,{sceneNumbers:I.sceneNumbers,totalPages:I.totalPages}),w(`Scene #${L} removed from Day ${I.dayNumber}`),m(),T(I.dayNumber))}}),ae.querySelectorAll(".btn-edit-snippet").forEach(v=>{v.onclick=()=>{const L=v.getAttribute("data-scene-id");L&&(S.add(L),T(I.dayNumber))}}),ae.querySelectorAll(".btn-cancel-snippet").forEach(v=>{v.onclick=()=>{const L=v.getAttribute("data-scene-id");L&&(S.delete(L),T(I.dayNumber))}}),ae.querySelectorAll(".btn-save-snippet").forEach(v=>{v.onclick=async()=>{const L=v.getAttribute("data-scene-id"),J=v.closest(".scene-item-card")?.querySelector(".input-scene-snippet")?.value?.trim(),se=r.find(Ae=>Ae.id===L);se&&(se.snippet=J,await fs(o,se.id,{snippet:J}),w(`Scene #${se.sceneNumber} snippet updated`),S.delete(L),T(I.dayNumber))}}),ae.querySelectorAll(".btn-toggle-add-cast").forEach(v=>{v.onclick=()=>{const L=v.getAttribute("data-scene-id");L&&(N.add(L),T(I.dayNumber))}}),ae.querySelectorAll(".btn-cancel-new-cast").forEach(v=>{v.onclick=()=>{const L=v.getAttribute("data-scene-id");L&&(N.delete(L),T(I.dayNumber))}}),ae.querySelectorAll(".btn-save-new-cast").forEach(v=>{v.onclick=async()=>{const L=v.getAttribute("data-scene-id"),J=v.closest(".scene-item-card")?.querySelector(".input-new-cast-name")?.value?.trim().toUpperCase(),se=r.find(Ae=>Ae.id===L);se&&J&&(se.cast=se.cast||[],se.cast.includes(J)||(se.cast.push(J),await fs(o,se.id,{cast:se.cast}),w(`Character ${J} added to Scene #${se.sceneNumber}`)),N.delete(L),T(I.dayNumber))}}),ae.querySelectorAll(".btn-remove-cast-member").forEach(v=>{v.onclick=async()=>{const L=v.getAttribute("data-scene-id"),X=v.getAttribute("data-cast"),J=r.find(se=>se.id===L);J&&X&&(J.cast=(J.cast||[]).filter(se=>se!==X),await fs(o,J.id,{cast:J.cast}),w(`Character ${X} removed from Scene #${J.sceneNumber}`),T(I.dayNumber))}}),ae.querySelectorAll(".btn-toggle-scene-inline").forEach(v=>{v.onclick=()=>{const L=v.getAttribute("data-scene-id");L&&(p.has(L)?p.delete(L):p.add(L),T(I.dayNumber))}}),ae.querySelectorAll(".btn-toggle-more-details").forEach(v=>{v.onclick=()=>{const L=v.getAttribute("data-scene-id");L&&(d.has(L)?d.delete(L):d.add(L),T(I.dayNumber))}}),ae.querySelectorAll(".btn-scene-up").forEach(v=>{v.onclick=async()=>{const L=Number(v.getAttribute("data-scene")),X=I.sceneNumbers.indexOf(L);if(X>0){const J=[...I.sceneNumbers],se=J[X];J[X]=J[X-1],J[X-1]=se,I.sceneNumbers=J,await Tn(o,I.dayNumber,J),w("Scene shooting order updated"),m(),T(I.dayNumber)}}}),ae.querySelectorAll(".btn-scene-down").forEach(v=>{v.onclick=async()=>{const L=Number(v.getAttribute("data-scene")),X=I.sceneNumbers.indexOf(L);if(X<I.sceneNumbers.length-1){const J=[...I.sceneNumbers],se=J[X];J[X]=J[X+1],J[X+1]=se,I.sceneNumbers=J,await Tn(o,I.dayNumber,J),w("Scene shooting order updated"),m(),T(I.dayNumber)}}}),ae.querySelectorAll(".btn-inline-move-day").forEach(v=>{v.onclick=async()=>{const L=Number(v.getAttribute("data-scene")),J=v.closest(".scene-item-card")?.querySelector(".select-inline-move-day"),se=Number(J?.value);if(!se||se===I.dayNumber){w(`Scene ${L} is already on Day ${I.dayNumber}`);return}await po(o,L,I.dayNumber,se),i=await It(o),w(`Scene ${L} moved to Shoot Day ${se}`),m(),T(I.dayNumber)}}),ae.querySelectorAll(".btn-edit-notes").forEach(v=>{v.onclick=()=>{const L=v.getAttribute("data-scene-id");L&&(c.add(L),T(I.dayNumber))}}),ae.querySelectorAll(".btn-cancel-notes").forEach(v=>{v.onclick=()=>{const L=v.getAttribute("data-scene-id");L&&(c.delete(L),T(I.dayNumber))}}),ae.querySelectorAll(".btn-save-notes").forEach(v=>{v.onclick=async()=>{const L=v.getAttribute("data-scene-id"),X=v.closest(".scene-item-card"),J=X?.querySelector(".input-director-notes")?.value||"",se=X?.querySelector(".input-continuity-notes")?.value||"",Ae=r.find(Xe=>Xe.id===L);Ae&&(Ae.directorNotes=J,Ae.continuityNotes=se,await fs(o,Ae.id,{directorNotes:J,continuityNotes:se}),w(`Scene ${Ae.sceneNumber} notes saved`),c.delete(L),T(I.dayNumber))}}),ae.querySelectorAll(".btn-scene-breakdown").forEach(v=>{v.onclick=()=>{const L=v.getAttribute("data-scene-num");e(`/production/breakdown?scriptId=${o}&scene=${L}`)}}),ae.querySelectorAll(".btn-scene-sides").forEach(v=>{v.onclick=()=>{const L=v.getAttribute("data-scene-num");e(`/production/dialogue-sides?scriptId=${o}&scene=${L}`)}}),ae.querySelectorAll(".btn-scene-pdf").forEach(v=>{v.onclick=()=>{const L=v.getAttribute("data-scene-id"),X=r.find(se=>se.id===L);if(!X)return;const J=f.filter(se=>se.sceneId===X.id||se.sceneNumber===X.sceneNumber||Array.isArray(se.scenes)&&se.scenes.includes(X.sceneNumber));try{ya(J,{title:`Chronicles of Dust — Scene ${X.sceneNumber}`,draft:"Draft 4.2"}),w(`Exported Scene ${X.sceneNumber} Logistics PDF`)}catch(se){console.error(se),w("Failed to export scene PDF")}}}),xe&&setTimeout(()=>{ae.querySelector(`[data-scene-id="${xe}"], [data-scene-num="${xe}"]`)?.scrollIntoView({behavior:"smooth",block:"nearest"})},50)}pt(l)}const ce=document.getElementById("modal-day-close"),te=document.getElementById("modal-day-done"),be=()=>{Be(l),g=null,h=!1,b=!1,y.clear(),P=!1,S.clear(),N.clear(),E?.close()};ce&&(ce.onclick=be),te&&(te.onclick=be),l&&(l.onclick=ne=>{ne.target===l&&be()}),window.scriptoraRouter&&window.scriptoraRouter.registerBackHandler(()=>y.size>0||c.size>0||S.size>0||N.size>0||h||b||P?(y.clear(),c.clear(),S.clear(),N.clear(),h=!1,b=!1,P=!1,g&&renderModalDayContent(g),!0):l&&!l.classList.contains("hidden")?(be(),!0):!1);async function W(ne){let xe=r.find($e=>$e.id===ne||String($e.sceneNumber)===String(ne)||`scene-${$e.sceneNumber}`===String(ne));if(xe||(xe=await ao(o,ne)),!xe){w("Scene not found in current schedule");return}const I=i.find($e=>($e.sceneNumbers||[]).includes(xe.sceneNumber));I?T(I.dayNumber,xe.id):i.length>0&&T(i[0].dayNumber,xe.id)}const Ee=document.getElementById("btn-export-schedule-pdf");Ee&&(Ee.onclick=()=>{try{Pl(i,r,{title:"Chronicles of Dust",draft:"Draft 4.2"}),w("Exported Master Shooting Schedule PDF")}catch(ne){console.error(ne),w("Failed to export schedule PDF")}});const ve=document.getElementById("modal-add-day"),Q=document.getElementById("btn-add-shoot-day"),de=document.getElementById("modal-add-day-close"),Y=document.getElementById("modal-add-day-cancel"),Se=document.getElementById("form-add-shoot-day");function A(){if(!ve)return;const ne=i.length>0?Math.max(...i.map(re=>re.dayNumber))+1:1,xe=document.getElementById("input-add-day-num"),I=document.getElementById("input-add-day-date"),$e=document.getElementById("input-add-day-title"),je=document.getElementById("input-add-day-location"),Pe=document.getElementById("input-add-day-hours"),ae=document.getElementById("input-add-day-pages");if(xe&&(xe.value=ne),I){const re=new Date(2026,9,23+ne),D=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];I.value=`${D[re.getMonth()]} ${re.getDate()}, ${re.getFullYear()}`}$e&&($e.value=`Day ${ne} — Second Unit & Pickups`),je&&(je.value="Mojave Soundstage 2"),Pe&&(Pe.value="10"),ae&&(ae.value="0.0"),pt(ve)}function V(){Be(ve)}Q&&(Q.onclick=A),de&&(de.onclick=V),Y&&(Y.onclick=V),ve&&(ve.onclick=ne=>{ne.target===ve&&V()}),Se&&(Se.onsubmit=async ne=>{ne.preventDefault();const xe=Number(document.getElementById("input-add-day-num")?.value)||i.length+1,I=document.getElementById("input-add-day-date")?.value||`Shoot Day ${xe}`,$e=document.getElementById("input-add-day-title")?.value||`Day ${xe}`,je=document.getElementById("input-add-day-location")?.value||"Location TBD",Pe=Number(document.getElementById("input-add-day-hours")?.value)||10,ae=document.getElementById("input-add-day-pages")?.value||"0.0";await uo(o,{dayNumber:xe,title:$e,date:I,location:je,estHours:Pe,totalPages:ae,sceneNumbers:[]}),i=await It(o),V(),w(`Added Shoot Day ${xe} (${I})`),m()}),m();const Ne=n.get("sceneId")||n.get("scene");Ne&&W(Ne)}function wt(e){return`data:image/svg+xml;utf8,${encodeURIComponent(e.trim())}`}function ql(){return wt(`
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
</svg>`)}function zl(){return wt(`
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
</svg>`)}function Vl(){return wt(`
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
</svg>`)}function Gl(){return wt(`
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
</svg>`)}function Wl(){return wt(`
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
</svg>`)}function Kl(){return wt(`
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
</svg>`)}function Jl(){return wt(`
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
</svg>`)}function Yl(){return wt(`
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
</svg>`)}function Xl(){return wt(`
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
</svg>`)}function Zl(){return wt(`
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
</svg>`)}function Ql(){return wt(`
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
</svg>`)}function ei(){return wt(`
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
</svg>`)}const Ss=[{id:"Comic",name:"Comic",tagline:"Bold Ink & Halftone Dots",description:"Classic action comic illustration with thick outlines, halftone Ben-Day dots, and primary pop colors.",previewImage:"/assets/styles/comic.jpg",fallbackSvg:ql()},{id:"Cinematic",name:"Cinematic",tagline:"35mm Film Still",description:"Atmospheric 35mm film still with moody natural lighting, shallow depth of field, and filmic grain.",previewImage:"/assets/styles/cinematic-realism.jpg",fallbackSvg:zl()},{id:"Soft Pencil",name:"Soft Pencil",tagline:"Light Graphite & Fine Shading",description:"Delicate graphite pencil drawing on clean off-white paper with soft tonal cross-hatching.",previewImage:"/assets/styles/storyboard-sketch.jpg",fallbackSvg:Vl()},{id:"Animation 3D",name:"Animation 3D",tagline:"Pixar / Studio 3D CGI",description:"Warm 3D rendered character animation with soft volumetric lighting and expressive stylized anatomy.",previewImage:"/assets/styles/animation-3d.jpg",fallbackSvg:Gl()},{id:"Watercolor Paint",name:"Watercolor Paint",tagline:"Pastel Pigments & Fluid Wash",description:"Artistic watercolor wash on textured paper with soft bleeding pigments and dreamy translucent hues.",previewImage:"/assets/styles/watercolor-paint.jpg",fallbackSvg:Wl()},{id:"Photo / Commercial",name:"Photo / Commercial",tagline:"Sharp Advertising Photography",description:"Commercial editorial photography with razor-sharp lens focus, natural daylight, and bokeh.",previewImage:"/assets/styles/photorealistic.jpg",fallbackSvg:Kl()},{id:"Charcoal Sketch",name:"Charcoal Sketch",tagline:"Smudged Shadows & Rich Charcoal",description:"Dramatic expressive charcoal drawing with deep velvety blacks, smudged shadows, and coarse tooth paper.",previewImage:"/assets/styles/charcoal-sketch.jpg",fallbackSvg:Jl()},{id:"Dark Anime",name:"Dark Anime",tagline:"Cyberpunk Cel-Shading",description:"Japanese anime aesthetic with sharp cel-shaded lines, intense city backlight, and glowing neon rim.",previewImage:"/assets/styles/dark-anime.jpg",fallbackSvg:Yl()},{id:"Flat / Vector",name:"Flat / Vector",tagline:"Clean 2D Vector Art",description:"Modern editorial 2D vector art with bold flat silhouettes, vibrant solid colors, and clean geometry.",previewImage:"/assets/styles/flat-vector.jpg",fallbackSvg:Xl()},{id:"Noir",name:"Noir",tagline:"High-Contrast Chiaroscuro",description:"Classic black-and-white film noir with stark shadows, dramatic streetlights, and rainy street reflections.",previewImage:"/assets/styles/noir.jpg",fallbackSvg:Zl()},{id:"Stick Figure",name:"Stick Figure",tagline:"Minimalist Modern Line Art",description:"Clean minimalist black line art with whimsical expressive poses and uncluttered white space.",previewImage:"/assets/styles/stick-figure.jpg",fallbackSvg:Ql()},{id:"Graphic Novel",name:"Graphic Novel",tagline:"Gritty Stark Shadow Blocking",description:"High-contrast graphic novel panel with heavy ink shadows and dramatic amber and violet duotone.",previewImage:"/assets/styles/graphic-novel.jpg",fallbackSvg:ei()}];function Xs(e){const t=(e||"").trim().toLowerCase();return Ss.find(s=>{const n=s.id.toLowerCase(),o=s.name.toLowerCase();return n===t||o===t||t.includes(n)||n.includes(t)||t.includes("comic")&&n.includes("comic")||t.includes("cine")&&n.includes("cinematic")||t.includes("pencil")&&n.includes("pencil")||t.includes("3d")&&n.includes("3d")||t.includes("water")&&n.includes("water")||t.includes("photo")&&n.includes("photo")||t.includes("charcoal")&&n.includes("charcoal")||t.includes("anime")&&n.includes("anime")||t.includes("vector")&&n.includes("vector")||t.includes("noir")&&n.includes("noir")||t.includes("stick")&&n.includes("stick")||t.includes("graphic")&&n.includes("graphic")})||Ss[2]}const ti=["Establishing Shot","Action Shot","Reaction Shot","Dialogue Shot","Insert / Detail Shot","Transition Shot"],qn=["Extreme Wide","Wide","Medium","Close-up","Extreme Close-up"],zn=["Eye Level","Low Angle","High Angle","Bird's Eye View","Over-the-Shoulder","Dutch Angle"],Zs=["2.39:1","16:9","4:3","9:16"],si=["Static","Pan","Tilt","Tracking","Dolly"],Vn=["24mm","35mm","50mm","85mm"],Gn=["Auto / Scene-based","Daylight","Night","Golden Hour","Low-key","Backlit"],ni=["Left to Right","Right to Left","Static"],Wn=["Comic","Cinematic","Soft Pencil","Animation 3D","Watercolor Paint","Photo / Commercial","Charcoal Sketch","Dark Anime","Flat / Vector","Noir","Stick Figure","Graphic Novel","Concept Art","Cinematic Realism","Storyboard Sketch","Photorealistic"],ai=["Standard Draft","High Definition Production"];function oi(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=t||s.get("scriptId")||B.state.selectedScriptId||"chronicles-of-dust",o=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${ct("Pre-Production","Storyboard Studio")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3.5 fade-in">
        <!-- SubNav with Title, Project Context & Primary Actions -->
        ${As("Storyboard Studio","art_track",o||"/production",`
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
                  <button id="btn-delete-scene-storyboard" class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0" title="Move scene storyboard to Recycle Bin" aria-label="Delete Scene">
                    <span class="material-symbols-outlined text-[16px]">delete</span>
                  </button>
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
                    ${ti.map(a=>`<option value="${a}">${a}</option>`).join("")}
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
                  ${Ss.map(a=>`
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
                    ${qn.map(a=>`<option value="${a}">${a}</option>`).join("")}
                  </select>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[10px] font-semibold text-slate-600 uppercase">Camera Angle</label>
                  <select id="input-shot-angle" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs">
                    ${zn.map(a=>`<option value="${a}">${a}</option>`).join("")}
                  </select>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[10px] font-semibold text-slate-600 uppercase">Aspect Ratio</label>
                  <select id="input-shot-ratio" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs">
                    ${Zs.map(a=>`<option value="${a}">${a}</option>`).join("")}
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
                      ${si.map(a=>`<option value="${a}">${a}</option>`).join("")}
                    </select>
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-semibold text-slate-500 uppercase">Lens</label>
                    <select id="input-shot-focal" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                      ${Vn.map(a=>`<option value="${a}">${a}</option>`).join("")}
                    </select>
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-semibold text-slate-500 uppercase">Lighting</label>
                    <select id="input-shot-lighting" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                      ${Gn.map(a=>`<option value="${a}">${a}</option>`).join("")}
                    </select>
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-semibold text-slate-500 uppercase">Screen Direction</label>
                    <select id="input-shot-direction" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                      ${ni.map(a=>`<option value="${a}">${a}</option>`).join("")}
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
                  <span>Browse All Styles (${Ss.length})</span>
                  <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
              
              <!-- Active Style Summary Card (Clicking opens style gallery popup) -->
              <div id="gen-active-style-card" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:border-blue-500 hover:bg-blue-50/30 cursor-pointer transition-all flex items-center gap-3 group shadow-2xs">
                <div class="w-20 aspect-video rounded-lg overflow-hidden bg-slate-200 border border-slate-200 shrink-0 relative">
                  <img id="gen-active-style-img" src="/assets/styles/storyboard-sketch.jpg" alt="Active style" class="w-full h-full object-cover" />
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
                  ${ai.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Aspect Ratio</label>
                <select id="gen-ratio-select" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${Zs.map(a=>`<option value="${a}">${a}</option>`).join("")}
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
              ${Ss.map(a=>`
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
                ${Wn.map(a=>`<option value="${a}">${a}</option>`).join("")}
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
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-2xl w-full p-4 sm:p-5 flex flex-col gap-3.5 max-h-[88vh] overflow-y-auto">
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
          <div id="rb-items-container" class="flex flex-col gap-2 min-h-[220px] max-h-[50vh] overflow-y-auto pr-1">
            <div id="rb-empty-state" class="flex flex-col items-center justify-center py-12 text-slate-400 gap-1.5">
              <span class="material-symbols-outlined text-4xl text-slate-300">delete_outline</span>
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
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-lg w-full p-4 sm:p-5 flex flex-col gap-3.5 max-h-[88vh] overflow-y-auto">
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
                  ${Wn.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Aspect Ratio</label>
                <select id="pref-default-ratio" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${Zs.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Shot Size</label>
                <select id="pref-default-size" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${qn.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Camera Angle</label>
                <select id="pref-default-angle" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${zn.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Lens</label>
                <select id="pref-default-lens" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${Vn.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Lighting</label>
                <select id="pref-default-lighting" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${Gn.map(a=>`<option value="${a}">${a}</option>`).join("")}
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
      ${ot("production")}
    </div>
  `}function Qs({description:e,visualStyle:t,shotSize:s,cameraAngle:n,aspectRatio:o,cameraMovement:a,lens:l,lighting:i,screenDirection:r,sceneContext:f}){const p=[];t&&p.push(`[Style: ${t}]`),s&&p.push(`[Framing: ${s}]`),n&&p.push(`[Angle: ${n}]`),l&&p.push(`[Lens: ${l}]`),a&&a!=="Static"&&p.push(`[Movement: ${a}]`),i&&i!=="Auto / Scene-based"&&p.push(`[Lighting: ${i}]`),r&&r!=="Static"&&p.push(`[Direction: ${r}]`),o&&p.push(`[Aspect: ${o}]`),f&&p.push(`[Scene Context: ${f}]`);const d=(e||"").trim();return d?p.push(d):p.push("Cinematic storyboard composition"),p.join(" - ")}function li(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||B.state.selectedScriptId||"chronicles-of-dust";let a=n.get("sceneId")||"scene-1",l="contact",i=null,r=null,f=null,p=0,d=[],c=4;const m=new Set;let g=null,h="",b="draft";const y=document.getElementById("storyboard-scene-select"),P=document.getElementById("storyboard-view-container"),S=document.getElementById("view-tab-contact"),N=document.getElementById("view-tab-sequence"),E=document.getElementById("btn-export-storyboard-pdf"),j=document.getElementById("btn-generate-sequence"),T=document.getElementById("btn-add-shot"),ce=document.getElementById("btn-view-in-schedule"),te=document.getElementById("storyboard-stale-alert"),be=document.getElementById("btn-repin-storyboard"),W=document.getElementById("continuity-warning-banner"),Ee=document.getElementById("shot-inspector-modal"),ve=document.getElementById("modal-shot-close"),Q=document.getElementById("modal-btn-cancel-shot"),de=document.getElementById("shot-detail-form"),Y=document.getElementById("modal-btn-delete-shot"),Se=document.getElementById("modal-btn-generate-action"),A=document.getElementById("modal-file-import"),V=document.getElementById("modal-btn-view-fullscreen"),Ne=document.getElementById("modal-btn-toggle-approve"),ne=document.getElementById("modal-btn-toggle-reject"),xe=document.getElementById("modal-btn-open-history"),I=document.getElementById("ai-generate-modal"),$e=document.getElementById("gen-modal-close"),je=document.getElementById("gen-modal-cancel"),Pe=document.getElementById("gen-btn-start"),ae=document.getElementById("gen-provider-select"),re=document.getElementById("gen-provider-status"),D=document.getElementById("gen-cost-label"),Ce=document.getElementById("gen-shot-count-select"),Oe=document.getElementById("gen-error-alert"),pe=document.getElementById("gen-error-message"),Fe=document.getElementById("single-regen-modal"),me=document.getElementById("regen-modal-close"),Ue=document.getElementById("regen-modal-cancel"),Me=document.getElementById("regen-modal-confirm"),De=document.getElementById("shot-history-modal"),U=document.getElementById("history-modal-close"),C=document.getElementById("history-modal-done"),R=document.getElementById("lightbox-modal"),K=document.getElementById("lb-close"),G=document.getElementById("lb-prev"),ee=document.getElementById("lb-next"),ge=document.getElementById("lb-btn-approve"),fe=document.getElementById("lb-btn-reject");let he=[],ke=[],_=null;S&&N&&(S.onclick=x=>{x.preventDefault(),l="contact",S.className="px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5",N.className="px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5",us()},N.onclick=x=>{x.preventDefault(),l="sequence",N.className="px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5",S.className="px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5",us()}),j&&(j.onclick=x=>{x.preventDefault(),kt()}),T&&(T.onclick=x=>{x.preventDefault(),Ze(null)}),E&&(E.onclick=x=>{x.preventDefault();try{const u=he.find($=>$.id===a)||{},k=B.state.scripts?.find($=>$.id===o)||{title:"Chronicles of Dust",draft:"Draft 4.2"};Ll(_,{title:k.title,draft:k.draft||_?.sourceVersion||"Draft 4.2",heading:u.heading||_?.sceneHeading||"SCENE 1"}),w("Exported Storyboard Studio PDF")}catch(u){console.error(u),w("Failed to export Storyboard PDF")}}),be&&(be.onclick=async x=>{if(x.preventDefault(),_){_.sourceVersion=_.currentScriptDraft||"Draft 4.2",_.isVersionStale=!1;try{await Rt(o,_)}catch{}te?.classList.add("hidden"),w(`Pinned Storyboard to ${_.sourceVersion}`)}}),ve&&(ve.onclick=()=>Be(Ee)),Q&&(Q.onclick=()=>Be(Ee)),Se&&(Se.onclick=async x=>{x.preventDefault();const u=document.getElementById("modal-image-loading"),k=document.getElementById("modal-empty-image-placeholder"),$=document.getElementById("modal-shot-image");u&&u.classList.remove("hidden"),k&&k.classList.add("hidden"),$&&$.classList.add("hidden"),Se.disabled=!0;const H=document.getElementById("input-shot-number")?.value.trim()||"1A",O=document.getElementById("input-shot-desc")?.value.trim()||"",q=document.getElementById("input-shot-style")?.value||"Concept Art",oe=document.getElementById("input-shot-size")?.value||"Medium",M=document.getElementById("input-shot-angle")?.value||"Eye Level",z=document.getElementById("input-shot-ratio")?.value||"2.39:1",ye=document.getElementById("input-shot-movement")?.value||"Static",qe=document.getElementById("input-shot-focal")?.value||"50mm",et=document.getElementById("input-shot-lighting")?.value||"Auto / Scene-based",ie=document.getElementById("input-shot-direction")?.value||"Left to Right",nt=`${_?.sceneHeading||""} ${_?.sceneSummary||""}`.trim(),ms=Qs({description:O,visualStyle:q,shotSize:oe,cameraAngle:M,aspectRatio:z,cameraMovement:ye,lens:qe,lighting:et,screenDirection:ie,sceneContext:nt});try{const Vt=await Qt(o,{provider:"scriptora-concept",prompt:ms,userDescription:O,shotSize:oe,cameraAngle:M,cameraMovement:ye,focalLength:qe,lens:qe,lightingMood:et,lighting:et,aspectRatio:z,visualStyle:q,screenDirection:ie,sceneHeading:_?.sceneHeading||"SCENE 1",shotNumber:H});Vt?.imageUrl&&(g=Vt.imageUrl,h=ms,w("Image generated successfully"))}catch(Vt){w(Vt.message||"Generation failed")}finally{u&&u.classList.add("hidden"),Se.disabled=!1,ft()}}),A&&(A.onchange=x=>{const u=x.target.files?.[0];if(!u)return;const k=new FileReader;k.onload=$=>{g=$.target.result,ft(),w("Reference image imported")},k.readAsDataURL(u)}),Ne&&(Ne.onclick=()=>{b="approved";const x=document.getElementById("input-shot-approval");x&&(x.value="approved"),ft(),w("Frame marked as Approved for Production")}),ne&&(ne.onclick=()=>{b="rejected";const x=document.getElementById("input-shot-approval");x&&(x.value="rejected"),ft(),w("Frame marked as Rejected")}),V&&(V.onclick=()=>{if(g){const x={shotNumber:document.getElementById("input-shot-number")?.value.trim()||"1A",title:document.getElementById("input-shot-title")?.value.trim()||"Preview",description:document.getElementById("input-shot-desc")?.value.trim()||"",aspectRatio:document.getElementById("input-shot-ratio")?.value||"2.39:1",focalLength:document.getElementById("input-shot-focal")?.value||"50mm",shotSize:document.getElementById("input-shot-size")?.value||"Medium",cameraAngle:document.getElementById("input-shot-angle")?.value||"Eye Level",imageUrl:g};yn(x)}}),xe&&(xe.onclick=()=>{i&&hn(i)}),de&&(de.onsubmit=async x=>{x.preventDefault();const u=document.getElementById("input-shot-desc")?.value.trim()||"",k=document.getElementById("input-shot-style")?.value||"Concept Art",$=document.getElementById("input-shot-size")?.value||"Medium",H=document.getElementById("input-shot-angle")?.value||"Eye Level",O=document.getElementById("input-shot-ratio")?.value||"2.39:1",q=document.getElementById("input-shot-movement")?.value||"Static",oe=document.getElementById("input-shot-focal")?.value||"50mm",M=document.getElementById("input-shot-lighting")?.value||"Auto / Scene-based",z=document.getElementById("input-shot-direction")?.value||"Left to Right",ye=`${_?.sceneHeading||""} ${_?.sceneSummary||""}`.trim(),qe=Qs({description:u,visualStyle:k,shotSize:$,cameraAngle:H,aspectRatio:O,cameraMovement:q,lens:oe,lighting:M,screenDirection:z,sceneContext:ye}),et={shotNumber:document.getElementById("input-shot-number")?.value.trim()||"1A",title:document.getElementById("input-shot-title")?.value.trim()||"Shot",shotType:document.getElementById("input-shot-type")?.value||"",description:u,shotSize:$,cameraAngle:H,cameraMovement:q,focalLength:oe,lens:oe,aspectRatio:O,lightingMood:M,lighting:M,visualStyle:k,prompt:qe,approvalStatus:document.getElementById("input-shot-approval")?.value||"draft",directorNotes:document.getElementById("input-shot-notes")?.value.trim()||"",imageUrl:g,imageSource:g?g.startsWith("data:image/svg")?"ai":"imported":null,continuity:{screenDirection:z}};try{i?(await Ln(o,a,i,et),w("Updated shot details")):(await xo(o,a,et),w("Added new shot to scene")),Be(Ee),gt()}catch{w("Failed to save shot")}}),Y&&(Y.onclick=async()=>{if(i&&confirm("Move this shot to the Storyboard Recycle Bin?"))try{await bo(o,a,i),w("Shot moved to Recycle Bin"),Be(Ee),await lt(),gt()}catch{w("Failed to delete shot")}});const Re=document.getElementById("btn-toggle-more-camera"),v=document.getElementById("more-camera-panel"),L=document.getElementById("more-camera-chevron");Re&&v&&(Re.onclick=()=>{const x=v.classList.toggle("hidden");L&&(L.style.transform=x?"rotate(0deg)":"rotate(180deg)")});const X=document.getElementById("btn-storyboard-preferences"),J=document.getElementById("storyboard-preferences-modal"),se=document.getElementById("storyboard-pref-form"),Ae=document.getElementById("pref-modal-close"),Xe=document.getElementById("pref-modal-cancel"),bt=document.getElementById("pref-btn-reset");X&&J&&(X.onclick=async()=>{const x=await Et(),u=document.getElementById("pref-default-style"),k=document.getElementById("pref-default-ratio"),$=document.getElementById("pref-default-size"),H=document.getElementById("pref-default-angle"),O=document.getElementById("pref-default-lens"),q=document.getElementById("pref-default-lighting");u&&(u.value=x?.visualStyle||"Concept Art"),k&&(k.value=x?.aspectRatio||"2.39:1"),$&&($.value=x?.shotSize||"Medium"),H&&(H.value=x?.cameraAngle||"Eye Level"),O&&(O.value=x?.lens||"50mm"),q&&(q.value=x?.lighting||"Auto / Scene-based"),pt(J)}),Ae&&(Ae.onclick=()=>Be(J)),Xe&&(Xe.onclick=()=>Be(J)),bt&&(bt.onclick=()=>{const x=document.getElementById("pref-default-style"),u=document.getElementById("pref-default-ratio"),k=document.getElementById("pref-default-size"),$=document.getElementById("pref-default-angle"),H=document.getElementById("pref-default-lens"),O=document.getElementById("pref-default-lighting");x&&(x.value="Concept Art"),u&&(u.value="2.39:1"),k&&(k.value="Medium"),$&&($.value="Eye Level"),H&&(H.value="50mm"),O&&(O.value="Auto / Scene-based"),w("Reset to default settings")}),se&&(se.onsubmit=async x=>{x.preventDefault();const u={visualStyle:document.getElementById("pref-default-style")?.value||"Concept Art",aspectRatio:document.getElementById("pref-default-ratio")?.value||"2.39:1",shotSize:document.getElementById("pref-default-size")?.value||"Medium",cameraAngle:document.getElementById("pref-default-angle")?.value||"Eye Level",lens:document.getElementById("pref-default-lens")?.value||"50mm",lighting:document.getElementById("pref-default-lighting")?.value||"Auto / Scene-based",experienceLevel:"Intermediate"};try{await yo(u),we=u,w("Storyboard preferences saved"),Be(J)}catch{w("Failed to save preferences")}});const Qe=document.getElementById("btn-storyboard-recycle-bin"),Le=document.getElementById("recycle-bin-modal"),Ut=document.getElementById("rb-modal-close"),dt=document.getElementById("rb-modal-done"),ht=document.getElementById("rb-btn-empty-bin"),Te=document.getElementById("recycle-bin-badge");async function lt(){try{const x=await Ds(o),u=Array.isArray(x)?x.length:0;return Te&&(Te.textContent=u,u>0?Te.classList.remove("hidden"):Te.classList.add("hidden")),x||[]}catch{return[]}}async function At(){try{he=await is(o)||[]}catch(x){console.warn("Offline fallback for scenes:",x)}y&&(he.length?(he.find(x=>x.id===a)||(a=he[0].id),y.innerHTML=he.map(x=>`
          <option value="${x.id}" ${x.id===a?"selected":""}>
            Scene ${x.sceneNumber}: ${x.heading}
          </option>
        `).join("")):y.innerHTML='<option value="">No active scenes (all in Recycle Bin)</option>'),await gt()}async function Jt(){const x=document.getElementById("rb-items-container");if(x)try{const u=await Ds(o),k=u.length,$=u.filter(z=>z.itemType==="shot").length,H=u.filter(z=>z.itemType==="scene").length,O=document.getElementById("rb-count-all"),q=document.getElementById("rb-count-shots"),oe=document.getElementById("rb-count-scenes");O&&(O.textContent=k),q&&(q.textContent=$),oe&&(oe.textContent=H);const M=u.filter(z=>St==="shots"?z.itemType==="shot":St==="scenes"?z.itemType==="scene":!0);if(!M.length){x.innerHTML=`
          <div id="rb-empty-state" class="flex flex-col items-center justify-center py-12 text-slate-400 gap-1.5">
            <span class="material-symbols-outlined text-4xl text-slate-300">delete_outline</span>
            <span class="text-xs font-semibold text-slate-600">Recycle Bin is empty</span>
            <span class="text-[10px] text-slate-400">No deleted items match the selected filter.</span>
          </div>
        `;return}x.innerHTML=M.map(z=>{const ye=z.itemType==="scene",qe=ye?`Scene: ${z.data?.sceneHeading||z.title||"Scene"}`:z.title||`Shot ${z.shotNumber||""}`,et=ye?`${z.data?.shots?.length||0} shots included`:`Original Scene: ${z.originalSceneId||"Scene"}`,ie=z.deletedAt?new Date(z.deletedAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",nt=!ye&&z.data?.imageUrl?z.data.imageUrl:null;return`
          <div class="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors gap-2.5">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden text-slate-500">
                ${nt?`<img src="${nt}" alt="" class="w-full h-full object-cover" />`:ye?'<span class="material-symbols-outlined text-lg text-blue-600">movie_filter</span>':'<span class="material-symbols-outlined text-lg text-slate-400">crop_original</span>'}
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-bold text-slate-800 truncate">${qe}</span>
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold ${ye?"bg-blue-50 text-blue-600 border border-blue-100":"bg-slate-100 text-slate-600"}">${ye?"SCENE":"SHOT"}</span>
                </div>
                <div class="text-[10px] text-slate-500 truncate">${et} ${ie?`· Deleted ${ie}`:""}</div>
              </div>
            </div>

            <div class="flex items-center gap-1.5 shrink-0">
              <button type="button" class="rb-item-restore px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors" data-item-id="${z.id}">
                <span class="material-symbols-outlined text-[14px]">restore_from_trash</span>
                <span>Restore</span>
              </button>
              <button type="button" class="rb-item-delete px-2 py-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 text-[11px] cursor-pointer transition-colors" title="Delete permanently" data-item-id="${z.id}">
                <span class="material-symbols-outlined text-[15px]">delete_forever</span>
              </button>
            </div>
          </div>
        `}).join(""),x.querySelectorAll(".rb-item-restore").forEach(z=>{z.onclick=async()=>{const ye=z.getAttribute("data-item-id");try{await vo(o,ye),w("Item restored successfully"),await Jt(),await lt(),await At()}catch{w("Failed to restore item")}}}),x.querySelectorAll(".rb-item-delete").forEach(z=>{z.onclick=async()=>{const ye=z.getAttribute("data-item-id");if(confirm("Permanently delete this item? This action cannot be undone."))try{await wo(o,ye),w("Item permanently deleted"),await Jt(),await lt()}catch{w("Failed to delete item")}}})}catch{x.innerHTML='<div class="p-6 text-center text-xs text-rose-500">Failed to load Recycle Bin items</div>'}}const qt=document.getElementById("rb-tab-all"),Dt=document.getElementById("rb-tab-shots"),zt=document.getElementById("rb-tab-scenes");function Yt(x){St=x,[qt,Dt,zt].forEach(k=>{k&&(k.classList.remove("bg-white","shadow-2xs","font-semibold","text-slate-900"),k.classList.add("text-slate-600"))});const u=x==="shots"?Dt:x==="scenes"?zt:qt;u&&(u.classList.add("bg-white","shadow-2xs","font-semibold","text-slate-900"),u.classList.remove("text-slate-600")),Jt()}qt&&(qt.onclick=()=>Yt("all")),Dt&&(Dt.onclick=()=>Yt("shots")),zt&&(zt.onclick=()=>Yt("scenes")),Qe&&Le&&(Qe.onclick=()=>{pt(Le),Jt()}),Ut&&(Ut.onclick=()=>Be(Le)),dt&&(dt.onclick=()=>Be(Le)),ht&&(ht.onclick=async()=>{if(confirm("Empty the entire Storyboard Recycle Bin? All deleted items will be permanently erased."))try{await So(o),w("Recycle Bin emptied"),await Jt(),await lt()}catch{w("Failed to empty Recycle Bin")}});const $s=document.getElementById("btn-delete-scene-storyboard");$s&&($s.onclick=async()=>{if(!_)return;const x=_.sceneHeading||`Scene ${_.sceneNumber||""}`;if(confirm(`Move ${x} and all its shots to the Storyboard Recycle Bin?`))try{await Eo(o,a),w(`${x} moved to Recycle Bin`),await lt(),await At()}catch{w("Failed to delete scene")}}),$e&&($e.onclick=()=>Be(I)),je&&(je.onclick=()=>Be(I)),ae&&(ae.onchange=Hs),Ce&&(Ce.onchange=()=>{c=parseInt(Ce.value,10)||4,xn(),Hs()}),Pe&&(Pe.onclick=async x=>{x.preventDefault();const u=ae?ae.value:"scriptora-concept",k=ke.find(ie=>ie.id===u)||ke[0]||{pricingType:"free",name:"Concept Engine"},$=document.getElementById("gen-style-select")?.value||"Storyboard Sketch",H=document.getElementById("gen-ratio-select")?.value||"2.39:1",O=document.getElementById("gen-quality-select")?.value||"Standard Draft",q=document.getElementById("gen-prompt-input")?.value.trim()||"",oe=parseInt(Ce?.value,10)||c||4;if(k.pricingType==="paid"){if(!k.isConfigured){Oe&&(Oe.classList.remove("hidden"),pe&&(pe.textContent=`Provider '${k.name}' requires API credentials. Please switch to SCRIPTORA Concept Engine (Free).`));return}if(!confirm(`Confirm generation using ${k.name}? Estimated cost: ${k.costLabel}.`))return}const M=Number(String(a).replace("scene-",""))||_?.sceneNumber||1,z=he.find(ie=>ie.id===a||ie.sceneNumber===M)||{heading:_?.sceneHeading||`SCENE ${M}`,snippet:"Characters in scene confrontation.",cast:["KEVIN","MEERA"]},et=[{letter:"A",title:"Establishing Spatial Geometry",description:`Wide environmental establishing view of ${z.heading.toLowerCase()}. Establishes spatial depth, environmental lighting, and visual geography.`,shotSize:"Wide Shot",cameraAngle:"High Angle",cameraMovement:"Crane / Jib",focalLength:"24mm Wide",lightingMood:"High Contrast Daylight",prompt:`Cinematic wide establishing shot of ${z.heading}: ${z.snippet||"Atmospheric perspective"}. 24mm anamorphic lens.`},{letter:"B",title:"Character Blocking & Entry",description:`Medium two-shot tracking ${z.cast?.[0]||"protagonist"} navigating the environment with rising tension.`,shotSize:"Medium Two-Shot",cameraAngle:"Eye Level",cameraMovement:"Tracking Dolly",focalLength:"50mm Prime",lightingMood:"Practical Rim Lighting",prompt:`Medium two-shot tracking ${z.cast?.join(" and ")||"character"} in ${z.heading}: ${z.snippet||"Environmental interaction"}. 50mm shallow depth of field.`},{letter:"C",title:"Critical Dramatic Focal Beat",description:"Close-up reaction highlighting dramatic urgency, character resolve, and key narrative stakes.",shotSize:"Close-Up",cameraAngle:"Dutch Angle",cameraMovement:"Static",focalLength:"85mm Portrait",lightingMood:"Warm Eye Catchlight",prompt:`Dramatic close-up on ${z.cast?.[0]||"lead character"} in ${z.heading}. Intense facial expression, rim lighting, 85mm portrait bokeh.`},{letter:"D",title:"Prop & Action Detail Insert",description:"Tight macro insert focusing on critical hand movement, equipment interaction, or tactical telemetry.",shotSize:"Extreme Close-Up",cameraAngle:"Low Angle",cameraMovement:"Static",focalLength:"35mm Macro",lightingMood:"Chiaroscuro Beam",prompt:`Extreme close-up macro insert of crucial prop and tactical hand action in ${z.heading}. Scratched metal textures, focused lighting.`}].slice(0,oe).map((ie,nt)=>({id:`shot-${Date.now()}-${nt}-${Math.floor(Math.random()*1e3)}`,shotNumber:`${M}${ie.letter}`,order:nt+1,title:ie.title,description:ie.description,shotSize:ie.shotSize,cameraAngle:ie.cameraAngle,cameraMovement:ie.cameraMovement,focalLength:ie.focalLength,lightingMood:ie.lightingMood,aspectRatio:H,visualStyle:$,prompt:q?`${ie.prompt} ${q}`:ie.prompt,imageUrl:null,imageSource:"ai",provider:u,quality:O,costEstimate:u==="scriptora-concept"?"Free (Built-in)":"$0.040",approvalStatus:"proposed",approvalNotes:"AI proposed sequence beat. Review and approve to confirm.",approvedBy:null,approvedAt:null,directorNotes:`Maintain consistent eyeline and framing across ${M}${ie.letter}.`,characters:z.cast||["KEVIN"],location:z.heading,continuity:{characterPosition:nt%2===0?"Screen Left":"Screen Right",screenDirection:"Left to Right",eyeline:nt%2===0?"Looking Screen Right":"Looking Screen Left",lightingContinuity:"Production matching lighting",costumeState:"Production baseline",propPlacement:"Standard staging"},history:[],isGenerating:!0,generationError:null}));_||(_={scriptId:o,sceneId:a,sceneNumber:M,sceneHeading:z.heading,shots:[]}),_.shots=et,_.visualStyle=$,_.aspectRatio=H,Be(I),renderStoryboardView(),w(`Generating ${oe} storyboard shots in real-time...`);try{await Rt(o,_)}catch{}et.forEach(async ie=>{try{const nt=await Qt(o,{provider:ie.provider,prompt:ie.prompt,shotSize:ie.shotSize,cameraAngle:ie.cameraAngle,cameraMovement:ie.cameraMovement,focalLength:ie.focalLength,lightingMood:ie.lightingMood,aspectRatio:ie.aspectRatio,visualStyle:ie.visualStyle,sceneHeading:_.sceneHeading||z.heading,shotNumber:ie.shotNumber,description:ie.description,cast:ie.characters,characters:ie.characters,quality:ie.quality});if(nt?.imageUrl)ie.imageUrl=nt.imageUrl,ie.isGenerating=!1,ie.generationError=null,ie.history||(ie.history=[]),ie.history.unshift({imageUrl:nt.imageUrl,prompt:ie.prompt,visualStyle:ie.visualStyle,provider:ie.provider,createdAt:new Date().toISOString()}),await Rt(o,_),renderStoryboardView(),w(`Shot ${ie.shotNumber} sketch completed!`);else throw new Error("Image generation returned empty")}catch(nt){ie.isGenerating=!1,ie.generationError=nt.message||"Generation failed",renderStoryboardView(),w(`Shot ${ie.shotNumber} failed to generate`)}})});const Xt=document.getElementById("gen-btn-approve-all-proposed");Xt&&(Xt.onclick=()=>{d.forEach(x=>{x.approvalStatus="approved"}),Us(),w("All proposed shots marked as Approved")});const Zt=document.getElementById("gen-btn-confirm-save");Zt&&(Zt.onclick=async()=>{if(d.length){Zt.disabled=!0;try{const x={..._,shots:d,visualStyle:d[0]?.visualStyle||_?.visualStyle,aspectRatio:d[0]?.aspectRatio||_?.aspectRatio};await Rt(o,x),w(`Saved ${d.length} shots to storyboard.`),Be(I),gt()}catch{w("Failed to save sequence")}finally{Zt.disabled=!1}}});const le=document.getElementById("gen-btn-save-as-draft");le&&(le.onclick=async()=>{if(!d.length)return;d.forEach(u=>{u.approvalStatus="draft"});const x={..._,shots:d};await Rt(o,x),w("Saved sequence as draft"),Be(I),gt()});const Ke=document.getElementById("gen-btn-discard-preview");Ke&&(Ke.onclick=()=>{d=[],Be(I)}),me&&(me.onclick=()=>Be(Fe)),Ue&&(Ue.onclick=()=>Be(Fe));const _e=document.getElementById("regen-provider-select");_e&&(_e.onchange=gn),Me&&(Me.onclick=async()=>{const x=_?.shots?.find(O=>O.id===r);if(!x)return;const u=document.getElementById("regen-provider-select")?.value||"scriptora-concept",k=document.getElementById("regen-prompt-input")?.value.trim()||x.description||x.prompt||"Cinematic composition",$=document.getElementById("regen-style-select")?.value||x.visualStyle||"Concept Art";Me.disabled=!0,Me.innerHTML='<span class="w-3.5 h-3.5 border-2 border-white/60 border-t-white rounded-full animate-spin"></span><span>Regenerating...</span>';const H=Qs({description:k,visualStyle:$,shotSize:x.shotSize,cameraAngle:x.cameraAngle,aspectRatio:x.aspectRatio,cameraMovement:x.cameraMovement,lens:x.focalLength||x.lens,lighting:x.lightingMood||x.lighting,screenDirection:x.continuity?.screenDirection,sceneContext:`${_?.sceneHeading||""} ${_?.sceneSummary||""}`.trim()});Be(Fe),x.isGenerating=!0,x.generationError=null,renderStoryboardView();try{const O=await Qt(o,{provider:u,prompt:H,userDescription:k,shotSize:x.shotSize,cameraAngle:x.cameraAngle,cameraMovement:x.cameraMovement,focalLength:x.focalLength||x.lens,lens:x.focalLength||x.lens,lightingMood:x.lightingMood||x.lighting,lighting:x.lightingMood||x.lighting,aspectRatio:x.aspectRatio,visualStyle:$,screenDirection:x.continuity?.screenDirection,sceneHeading:_?.sceneHeading||"SCENE 1",shotNumber:x.shotNumber});if(O?.imageUrl)x.imageUrl=O.imageUrl,x.visualStyle=$,x.isGenerating=!1,x.generationError=null,await Ln(o,a,r,{imageUrl:O.imageUrl,prompt:H,description:x.description||k,visualStyle:$,provider:u,imageSource:"ai"}),renderStoryboardView(),w(`Regenerated frame ${x.shotNumber}. Previous version preserved in history.`);else throw new Error("Image generation returned empty")}catch(O){x.isGenerating=!1,x.generationError=O.message||"Regeneration failed",renderStoryboardView(),w(O.message||"Regeneration failed")}finally{Me.disabled=!1,Me.innerHTML='<span class="material-symbols-outlined text-[15px]">auto_awesome</span><span>Regenerate Frame</span>'}}),U&&(U.onclick=()=>Be(De)),C&&(C.onclick=()=>Be(De)),K&&(K.onclick=()=>R?.classList.add("hidden")),G&&(G.onclick=()=>{const x=_?.shots||[];x.length&&(p=(p-1+x.length)%x.length,ps())}),ee&&(ee.onclick=()=>{const x=_?.shots||[];x.length&&(p=(p+1)%x.length,ps())}),ge&&(ge.onclick=async()=>{const u=(_?.shots||[])[p];if(u)try{await Vs(o,a,u.id,"approved"),u.approvalStatus="approved",w(`Shot ${u.shotNumber} approved`),ps(),us()}catch{w("Failed to approve shot")}}),fe&&(fe.onclick=async()=>{const u=(_?.shots||[])[p];if(u)try{await Vs(o,a,u.id,"rejected"),u.approvalStatus="rejected",w(`Shot ${u.shotNumber} marked as rejected`),ps(),us()}catch{w("Failed to reject shot")}});const Je=x=>{R&&!R.classList.contains("hidden")&&(x.key==="Escape"&&R.classList.add("hidden"),x.key==="ArrowLeft"&&G&&G.click(),x.key==="ArrowRight"&&ee&&ee.click())};document.removeEventListener("keydown",Je),document.addEventListener("keydown",Je);let we=null,St="all";function Ye(x){const u=document.querySelectorAll(".style-preview-card"),k=document.getElementById("input-shot-style");let $=null;const H=Xs(x);if(u.forEach(O=>{const q=O.getAttribute("data-style-id")||"";(q.toLowerCase()===(x||"").toLowerCase()||q===H.id)&&!$?($=O,O.classList.add("border-blue-600","ring-2","ring-blue-500/30","bg-blue-50/20"),O.classList.remove("border-slate-200"),O.querySelector(".style-check-badge")?.classList.remove("hidden")):(O.classList.remove("border-blue-600","ring-2","ring-blue-500/30","bg-blue-50/20"),O.classList.add("border-slate-200"),O.querySelector(".style-check-badge")?.classList.add("hidden"))}),$)k&&(k.value=$.getAttribute("data-style-id")||x);else if(u.length>0){const O=u[0];O.classList.add("border-blue-600","ring-2","ring-blue-500/30","bg-blue-50/20"),O.classList.remove("border-slate-200"),O.querySelector(".style-check-badge")?.classList.remove("hidden"),k&&(k.value=O.getAttribute("data-style-id")||"Comic")}}function Ve(){document.querySelectorAll(".style-preview-card").forEach(u=>{u.onclick=()=>{const k=u.getAttribute("data-style-id");Ye(k)}})}function ue(x,u=!1){const k=Xs(x),$=k.id,H=document.getElementById("gen-style-select"),O=document.getElementById("gen-active-style-name"),q=document.getElementById("gen-active-style-desc"),oe=document.getElementById("gen-active-style-img");H&&(H.value=$),O&&(O.textContent=k.name),q&&(q.textContent=k.description||k.tagline),oe&&(oe.src=k.previewImage,oe.onerror=()=>{oe.onerror=null,oe.src=k.fallbackSvg}),document.querySelectorAll(".gen-style-gallery-card").forEach(M=>{const z=M.getAttribute("data-style-id"),ye=M.querySelector(".gen-style-gallery-check");z===$?(M.classList.add("border-blue-600","ring-2","ring-blue-500/30","bg-blue-50/30"),M.classList.remove("border-slate-200"),ye?.classList.remove("hidden")):(M.classList.remove("border-blue-600","ring-2","ring-blue-500/30","bg-blue-50/30"),M.classList.add("border-slate-200"),ye?.classList.add("hidden"))}),u&&(document.getElementById("gen-step-styles")?.classList.add("hidden"),document.getElementById("gen-step-config")?.classList.remove("hidden"),w(`Art style set to ${k.name}`))}function st(){const x=document.getElementById("btn-browse-all-styles"),u=document.getElementById("gen-active-style-card"),k=document.getElementById("btn-change-style-action"),$=ye=>{ye?.preventDefault(),ye?.stopPropagation(),document.getElementById("gen-step-config")?.classList.add("hidden"),document.getElementById("gen-step-styles")?.classList.remove("hidden");const qe=document.getElementById("gen-style-select")?.value||"Soft Pencil";ue(qe,!1)};x&&(x.onclick=$),u&&(u.onclick=$),k&&(k.onclick=$);const H=document.getElementById("btn-back-to-gen-config");H&&(H.onclick=ye=>{ye.preventDefault(),ye?.stopPropagation(),document.getElementById("gen-step-styles")?.classList.add("hidden"),document.getElementById("gen-step-config")?.classList.remove("hidden")}),document.querySelectorAll(".gen-style-gallery-card").forEach(ye=>{ye.onclick=qe=>{qe.preventDefault(),qe?.stopPropagation();const et=ye.getAttribute("data-style-id");ue(et,!0)}});const O=document.getElementById("btn-custom-style-card"),q=document.getElementById("gen-custom-style-drawer"),oe=document.getElementById("btn-cancel-custom-style"),M=document.getElementById("btn-apply-custom-style"),z=document.getElementById("input-custom-style-name");O&&q&&(O.onclick=()=>{q.classList.remove("hidden"),z?.focus()}),oe&&q&&(oe.onclick=()=>{q.classList.add("hidden")}),M&&z&&(M.onclick=()=>{const ye=z.value.trim();if(!ye){w("Please enter an art style name");return}const qe=document.getElementById("gen-style-select"),et=document.getElementById("gen-active-style-name"),ie=document.getElementById("gen-active-style-desc");qe&&(qe.value=ye),et&&(et.textContent=ye),ie&&(ie.textContent="Custom user-defined art style"),q.classList.add("hidden"),document.getElementById("gen-step-styles")?.classList.add("hidden"),document.getElementById("gen-step-config")?.classList.remove("hidden"),w(`Art style set to "${ye}"`)})}async function Et(){try{we=await Qn()}catch{we={visualStyle:"Concept Art",aspectRatio:"2.39:1",shotSize:"Medium",cameraAngle:"Eye Level",lens:"50mm",lighting:"Auto / Scene-based",experienceLevel:"Intermediate"}}return we}async function Ze(x){i=x;const u=!x,k=_?.shots||[],$=u?null:k.find(Na=>Na.id===x),H=we||await Et(),O=String.fromCharCode(65+k.length%26),q=`${_?.sceneNumber||1}${O}`,oe=$?.shotNumber||q,M=document.getElementById("modal-shot-pill"),z=document.getElementById("modal-shot-heading"),ye=document.getElementById("display-shot-number");M&&(M.textContent=oe),z&&(z.textContent=u?"Add New Shot":`Edit Shot ${oe}`),ye&&(ye.textContent=oe);const qe=document.getElementById("input-shot-number"),et=document.getElementById("input-shot-title"),ie=document.getElementById("input-shot-type"),nt=document.getElementById("input-shot-desc"),ms=document.getElementById("input-shot-size"),Vt=document.getElementById("input-shot-angle"),Sn=document.getElementById("input-shot-ratio"),En=document.getElementById("input-shot-movement"),kn=document.getElementById("input-shot-focal"),In=document.getElementById("input-shot-lighting"),Cn=document.getElementById("input-shot-direction"),An=document.getElementById("input-shot-approval"),$n=document.getElementById("input-shot-notes");qe&&(qe.value=oe),et&&(et.value=$?.title||(u?`Shot ${oe}`:"")),ie&&(ie.value=$?.shotType||""),nt&&(nt.value=$?.description||""),ms&&(ms.value=$?.shotSize||H?.shotSize||"Medium"),Vt&&(Vt.value=$?.cameraAngle||H?.cameraAngle||"Eye Level"),Sn&&(Sn.value=$?.aspectRatio||_?.aspectRatio||H?.aspectRatio||"2.39:1"),En&&(En.value=$?.cameraMovement||"Static"),kn&&(kn.value=$?.focalLength||$?.lens||H?.lens||"50mm"),In&&(In.value=$?.lightingMood||$?.lighting||H?.lighting||"Auto / Scene-based"),Cn&&(Cn.value=$?.continuity?.screenDirection||"Left to Right"),An&&(An.value=$?.approvalStatus||"draft"),$n&&($n.value=$?.directorNotes||""),Ve();const Ba=$?.visualStyle||_?.visualStyle||H?.visualStyle||"Concept Art";Ye(Ba),g=$?.imageUrl||null,h=$?.prompt||"",b=$?.approvalStatus||"draft",ft(),Y&&Y.classList.toggle("hidden",u),pt(Ee)}function ft(){const x=document.getElementById("modal-shot-image"),u=document.getElementById("modal-empty-image-placeholder"),k=document.getElementById("modal-post-gen-actions"),$=document.getElementById("modal-btn-view-fullscreen"),H=document.getElementById("modal-generate-action-label"),O=document.getElementById("modal-approve-toggle-label"),q=document.getElementById("modal-history-count");g?(x&&(x.src=g,x.classList.remove("hidden")),u&&u.classList.add("hidden"),k&&k.classList.remove("hidden"),$&&$.classList.remove("hidden"),H&&(H.textContent="Regenerate Image")):(x&&x.classList.add("hidden"),u&&u.classList.remove("hidden"),k&&k.classList.add("hidden"),$&&$.classList.add("hidden"),H&&(H.textContent="Generate Image"));const oe=i?_?.shots?.find(z=>z.id===i):null,M=Array.isArray(oe?.history)?oe.history.length:0;q&&(q.textContent=String(M)),O&&(O.textContent=b==="approved"?"Approved":"Approve")}function kt(){const x=he.find(O=>O.id===a)||he[0]||{},u=document.getElementById("gen-scene-heading-display"),k=document.getElementById("gen-scene-cast-display"),$=document.getElementById("gen-scene-snippet-display");u&&(u.textContent=x.heading||"SCENE 1"),k&&(k.textContent=`Cast: ${(x.cast||["KEVIN","MARCUS"]).join(", ")}`),$&&($.textContent=x.snippet||"Scene awaiting visual direction."),document.getElementById("gen-step-config")?.classList.remove("hidden"),document.getElementById("gen-step-styles")?.classList.add("hidden"),document.getElementById("gen-step-progress")?.classList.add("hidden"),document.getElementById("gen-step-preview")?.classList.add("hidden"),Ce&&(Ce.value=String(c)),xn(),Hs(),st();const H=_?.visualStyle||we?.visualStyle||"Soft Pencil";ue(H,!1),Oe&&Oe.classList.add("hidden"),pt(I)}function xn(){const x=document.getElementById("gen-submit-label");x&&(x.textContent=`Generate ${c}-Shot Sequence`)}function Hs(){if(!ae)return;const x=ae.value,u=ke.find(k=>k.id===x)||ke[0]||{pricingType:"free",isConfigured:!0};if(re&&(u.isConfigured||!u.requiresApiKey?(re.className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1",re.innerHTML='<span class="material-symbols-outlined text-[14px]">check_circle</span><span>Configured & Ready</span>'):(re.className="text-[11px] text-amber-600 font-medium mt-0.5 flex items-center gap-1",re.innerHTML=`<span class="material-symbols-outlined text-[14px]">info</span><span>Key missing in backend .env (${u.envVarName||"API_KEY"})</span>`)),D)if(u.pricingType==="free")D.textContent="Free (Built-in Concept Engine, no API keys or charges required).";else{const k=c||4,$=`$${((u.costPerImage||.04)*k).toFixed(3)} (${k}-shot batch)`;D.textContent=`${u.costLabel||"Paid API"} — Estimated: ${$}. Server credentials required.`}}function Us(){document.getElementById("gen-step-progress")?.classList.add("hidden");const x=document.getElementById("gen-step-preview");x&&x.classList.remove("hidden");const u=document.getElementById("gen-preview-count-label");u&&(u.textContent=`${d.length} Shots Proposed`);const k=document.getElementById("gen-preview-grid");k&&(k.innerHTML=d.map(($,H)=>`
      <div class="bg-white rounded-xl border border-slate-200 p-2.5 flex flex-col gap-2 shadow-2xs" data-proposed-idx="${H}">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-1.5">
            <span class="font-mono font-bold text-blue-600">${$.shotNumber}</span>
            <span class="font-semibold text-slate-800 truncate max-w-[140px]">${$.title}</span>
          </div>
          <button type="button" class="btn-toggle-prop-approve px-2 py-0.5 rounded text-[10px] font-semibold border cursor-pointer capitalize ${$.approvalStatus==="approved"?"bg-emerald-50 text-emerald-700 border-emerald-200":"bg-amber-50 text-amber-700 border-amber-200"}" data-proposed-idx="${H}">
            ${$.approvalStatus||"Proposed"}
          </button>
        </div>

        <div class="aspect-video bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center relative cursor-pointer btn-prop-lightbox" data-proposed-idx="${H}">
          <img src="${$.imageUrl}" alt="${$.title}" class="w-full h-full object-cover" />
          <div class="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-white font-mono text-[9px]">
            ${$.aspectRatio||"2.39:1"} · ${$.focalLength||"50mm"}
          </div>
        </div>

        <div class="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
          <span>${$.shotSize||"Wide"} · ${$.cameraAngle||"Eye Level"}</span>
          <button type="button" class="btn-prop-regen text-blue-600 hover:text-blue-800 font-semibold cursor-pointer" data-proposed-idx="${H}">
            Regenerate
          </button>
        </div>
      </div>
    `).join(""),k.querySelectorAll(".btn-toggle-prop-approve").forEach($=>{$.onclick=H=>{H.stopPropagation();const O=Number($.getAttribute("data-proposed-idx"));d[O]&&(d[O].approvalStatus=d[O].approvalStatus==="approved"?"proposed":"approved",Us())}}),k.querySelectorAll(".btn-prop-lightbox").forEach($=>{$.onclick=()=>{const H=Number($.getAttribute("data-proposed-idx"));d[H]&&yn(d[H])}}),k.querySelectorAll(".btn-prop-regen").forEach($=>{$.onclick=async H=>{H.stopPropagation();const O=Number($.getAttribute("data-proposed-idx")),q=d[O];if(q){$.disabled=!0,$.textContent="Generating...";try{const oe=await Qt(o,{provider:q.provider||"scriptora-concept",prompt:q.prompt||q.description||"Cinematic composition",shotSize:q.shotSize,cameraAngle:q.cameraAngle,focalLength:q.focalLength,lightingMood:q.lightingMood,aspectRatio:q.aspectRatio,visualStyle:q.visualStyle,sceneHeading:_?.sceneHeading||"SCENE 1",shotNumber:q.shotNumber});oe?.imageUrl&&(q.imageUrl=oe.imageUrl,w(`Regenerated proposed frame ${q.shotNumber}`),Us())}catch(oe){w(oe.message||"Regeneration failed")}finally{$.disabled=!1}}}}))}function bn(x){const u=document.getElementById("regen-current-image"),k=document.getElementById("regen-preview-style-label"),$=Xs(x);k&&(k.textContent=$.name),u&&(u.src=$.previewImage,u.onerror=()=>{u.onerror=null,u.src=$.fallbackSvg})}function wa(x){r=x;const u=_?.shots?.find(z=>z.id===x);if(!u)return;const k=document.getElementById("regen-shot-pill"),$=document.getElementById("regen-prompt-input"),H=document.getElementById("regen-style-select"),O=document.getElementById("regen-current-frame-pill"),q=document.getElementById("regen-current-frame-thumb"),oe=document.getElementById("regen-current-frame-pill-num");k&&(k.textContent=u.shotNumber),$&&($.value=u.description||u.prompt||""),O&&q&&(u.imageUrl?(q.src=u.imageUrl,oe&&(oe.textContent=u.shotNumber),O.classList.remove("hidden")):O.classList.add("hidden"));const M=u.visualStyle||"Concept Art";H&&(H.value=M,H.onchange=z=>{bn(z.target.value)}),bn(M),gn(),pt(Fe)}function gn(){const x=document.getElementById("regen-provider-select"),u=document.getElementById("regen-cost-banner");if(!x||!u)return;const k=ke.find($=>$.id===x.value)||ke[0]||{pricingType:"free"};k.pricingType==="free"?u.textContent="Free (Built-in Concept Engine, no charges).":u.textContent=`Estimated: ${k.costLabel||"$0.040"}. Server credentials required.`}function hn(x){f=x;const u=_?.shots?.find(O=>O.id===x);if(!u)return;const k=document.getElementById("history-modal-title");k&&(k.textContent=`History for Shot ${u.shotNumber}`);const $=document.getElementById("history-items-container");if(!$)return;const H=Array.isArray(u.history)?u.history:[];H.length?($.innerHTML=H.slice().reverse().map((O,q)=>{const oe=H.length-1-q;return`
          <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex flex-col gap-2">
            <div class="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span class="font-mono text-blue-600">${O.timestamp?new Date(O.timestamp).toLocaleString():"Past Version"}</span>
              <span class="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 text-slate-700 font-mono">${O.sourceVersion||"Draft 4.2"}</span>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-20 h-14 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shrink-0 flex items-center justify-center">
                ${O.previousImageUrl?`
                  <img src="${O.previousImageUrl}" alt="Historical version" class="w-full h-full object-cover" />
                `:`
                  <span class="material-symbols-outlined text-slate-600 text-base">image</span>
                `}
              </div>
              <div class="min-w-0 flex-1 text-[11px] text-slate-600">
                <p class="line-clamp-2 italic">${O.previousPrompt||"No prompt recorded"}</p>
                <div class="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                  <span>Provider: ${O.provider||"scriptora-concept"}</span>
                  <span>·</span>
                  <span>By: ${O.updatedBy||"Director"}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end pt-1 border-t border-slate-200/60">
              <button type="button" class="btn-restore-version px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] transition-colors cursor-pointer" data-hist-idx="${oe}">
                Restore This Version
              </button>
            </div>
          </div>
        `}).join(""),$.querySelectorAll(".btn-restore-version").forEach(O=>{O.onclick=async()=>{const q=Number(O.getAttribute("data-hist-idx"));try{await ho(o,a,f,q),w(`Restored past version to Shot ${u.shotNumber}`),Be(De),gt()}catch{w("Failed restoring version")}}})):$.innerHTML=`
        <div class="p-8 text-center text-slate-400 text-xs">
          <span class="material-symbols-outlined text-2xl text-slate-400">history</span>
          <p class="mt-1">No previous versions recorded for this shot.</p>
        </div>
      `,pt(De)}function Sa(x){const u=_?.shots||[];u.length&&(p=x>=0&&x<u.length?x:0,ps(),R?.classList.remove("hidden"))}function yn(x){const u=document.getElementById("lb-image"),k=document.getElementById("lb-shot-num"),$=document.getElementById("lb-specs"),H=document.getElementById("lb-title"),O=document.getElementById("lb-desc"),q=document.getElementById("lb-btn-approve"),oe=document.getElementById("lb-btn-reject"),M=document.getElementById("lb-prev"),z=document.getElementById("lb-next");u&&(u.src=x.imageUrl||""),k&&(k.textContent=`REC · ${x.shotNumber}`),$&&($.textContent=`${x.aspectRatio||"2.39:1"} · ${x.focalLength||"50mm"} · ${x.shotSize||"Medium"}`),H&&(H.textContent=x.title),O&&(O.textContent=x.description||"No description provided."),M&&M.classList.add("hidden"),z&&z.classList.add("hidden"),q&&q.classList.add("hidden"),oe&&oe.classList.add("hidden"),R?.classList.remove("hidden")}function ps(){const u=(_?.shots||[])[p];if(!u)return;const k=document.getElementById("lb-image"),$=document.getElementById("lb-shot-num"),H=document.getElementById("lb-specs"),O=document.getElementById("lb-title"),q=document.getElementById("lb-desc"),oe=document.getElementById("lb-approve-label"),M=document.getElementById("lb-prev"),z=document.getElementById("lb-next"),ye=document.getElementById("lb-btn-approve"),qe=document.getElementById("lb-btn-reject");M&&M.classList.remove("hidden"),z&&z.classList.remove("hidden"),ye&&ye.classList.remove("hidden"),qe&&qe.classList.remove("hidden"),k&&(k.src=u.imageUrl||""),$&&($.textContent=`REC · ${u.shotNumber}`),H&&(H.textContent=`${u.aspectRatio||"2.39:1"} · ${u.focalLength||"50mm"} · ${u.shotSize||"Medium"}`),O&&(O.textContent=u.title),q&&(q.textContent=u.description||"No description provided."),oe&&(oe.textContent=u.approvalStatus==="approved"?"Approved":"Approve")}async function gt(){if(P){P.innerHTML='<div class="p-16 text-center text-slate-400 text-xs">Loading storyboard shots...</div>';try{_=await Ht(o,a)}catch(x){console.error(x),_={sceneId:a,shots:[]}}Ea(),us()}}function Ea(){const x=he.find(q=>q.id===a)||he[0]||{},u=document.getElementById("badge-int-ext"),k=document.getElementById("badge-day-night"),$=document.getElementById("badge-pages"),H=document.getElementById("badge-shoot-day"),O=document.getElementById("scene-snippet-text");if(u&&(u.textContent=x.intExt||"INT"),k&&(k.textContent=x.dayNight||"DAY"),$&&($.textContent=`${x.pages||"1.0"} pgs`),H&&(H.textContent=x.shootDay||"Day 1 of 7"),O&&(O.textContent=x.snippet||"Scene awaiting visual direction."),ce){const q=String(x.shootDay||"1").match(/\d+/)?.[0]||"1";ce.href=`/production/schedule?scriptId=${o}&day=${q}&sceneId=${x.id}`}if(te)if(_?.isVersionStale){te.classList.remove("hidden");const q=document.getElementById("stale-pinned-ver"),oe=document.getElementById("stale-active-ver");q&&(q.textContent=_.sourceVersion||"Draft 4.2"),oe&&(oe.textContent=_.currentScriptDraft||"Draft 4.3")}else te.classList.add("hidden");ka()}function ka(){if(!W)return;const x=_?.shots||[];let u=!1,k="";for(let $=0;$<x.length-1;$++){const H=x[$],O=x[$+1],q=H?.shotSize||"",oe=O?.shotSize||"";if(q.includes("Close")&&oe.includes("Close")){const M=H.continuity?.eyeline?.toLowerCase()||H.continuity?.screenDirection?.toLowerCase()||"",z=O.continuity?.eyeline?.toLowerCase()||O.continuity?.screenDirection?.toLowerCase()||"";if(M&&z&&M===z&&(M.includes("screen")||M.includes("left")||M.includes("right"))){u=!0,k=`Shot ${H.shotNumber} and Shot ${O.shotNumber} both have screen direction "${H.continuity.screenDirection||H.continuity.eyeline}", which may create a jump or reverse-angle crossing.`;break}}}if(u){W.classList.remove("hidden");const $=document.getElementById("continuity-warning-text");$&&($.textContent=k)}else W.classList.add("hidden")}function us(){if(!P)return;const x=_?.shots||[];if(!x.length){P.innerHTML=`
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
      `;const u=document.getElementById("btn-empty-generate"),k=document.getElementById("btn-empty-add");u&&(u.onclick=()=>kt()),k&&(k.onclick=()=>Ze(null));return}l==="contact"?Ca(x):qs(x)}function Ia(x="",u=[]){if(!x)return"No description provided.";let k=x;return Array.isArray(u)&&u.forEach($=>{if(!$||$.length<2)return;const H=new RegExp(`\\b(${$})\\b`,"gi");k=k.replace(H,'<span class="font-semibold text-blue-700">$1<span class="material-symbols-outlined text-[12px] text-blue-600 align-text-bottom ml-0.5">person</span></span>')}),k}function Ca(x){P.innerHTML=`
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        ${x.map(u=>{const k=u.approvalStatus==="approved"?"bg-emerald-50 text-emerald-700 border-emerald-200":u.approvalStatus==="proposed"?"bg-amber-50 text-amber-700 border-amber-200":u.approvalStatus==="rejected"?"bg-rose-50 text-rose-700 border-rose-200":"bg-slate-100 text-slate-600 border-slate-200",$=Array.isArray(u.history)?u.history.length:0;return`
            <div class="storyboard-card bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between" data-shot-id="${u.id}">
              <div>
                <!-- Top Card Meta Header -->
                <div class="px-3 py-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                  <div class="flex items-center gap-1.5">
                    <span class="font-mono font-bold text-xs text-slate-900">${u.shotNumber}</span>
                    <span class="text-[10px] text-slate-400">#${u.order}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    ${u.isGenerating?`
                      <span class="px-2 py-0.5 rounded text-[10px] font-semibold border bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
                        Generating
                      </span>
                    `:u.generationError?`
                      <span class="px-2 py-0.5 rounded text-[10px] font-semibold border bg-rose-50 text-rose-700 border-rose-200">
                        Failed
                      </span>
                    `:`
                      <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold border ${k} capitalize">
                        ${u.approvalStatus||"Draft"}
                      </span>
                    `}
                    ${$>0?`
                      <button class="btn-card-history p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${u.id}" title="View generation history (${$} previous versions)">
                        <span class="material-symbols-outlined text-[15px]">history</span>
                      </button>
                    `:""}
                  </div>
                </div>

                <!-- Primary Visual Image Canvas -->
                <div class="aspect-video bg-slate-950 flex items-center justify-center relative overflow-hidden group ${u.isGenerating||u.generationError?"":"cursor-pointer btn-open-lightbox"}" data-shot-id="${u.id}">
                  <!-- Camera Icon Badge -->
                  <div class="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white flex items-center justify-center pointer-events-none z-10 shadow-xs" title="Cinematography Frame">
                    <span class="material-symbols-outlined text-[15px]">videocam</span>
                  </div>
                  ${u.isGenerating?`
                    <div class="w-full h-full bg-amber-50/80 border-b border-amber-200/70 flex flex-col items-center justify-center gap-2 p-4 text-center select-none">
                      <div class="relative flex items-center justify-center">
                        <div class="w-10 h-10 rounded-full border-2 border-blue-500/20 border-t-blue-600 animate-spin"></div>
                        <span class="material-symbols-outlined text-blue-600 text-lg absolute animate-pulse">edit</span>
                      </div>
                      <div class="flex flex-col items-center gap-0.5">
                        <span class="text-xs font-bold text-slate-900 tracking-tight">Sketching Shot ${u.shotNumber}...</span>
                        <span class="text-[10px] text-slate-500 font-medium">${u.shotSize||"Wide"} · ${u.cameraAngle||"Eye Level"}</span>
                      </div>
                      <div class="w-28 h-1 bg-slate-200 rounded-full overflow-hidden mt-0.5">
                        <div class="h-full bg-blue-600 rounded-full animate-pulse w-3/4"></div>
                      </div>
                    </div>
                  `:u.generationError?`
                    <div class="w-full h-full bg-slate-900 flex flex-col items-center justify-center gap-1.5 p-3 text-center">
                      <span class="material-symbols-outlined text-xl text-rose-400">error_outline</span>
                      <span class="text-[10px] font-medium text-rose-200 line-clamp-2 px-1">${u.generationError}</span>
                      <button type="button" class="btn-card-retry-gen mt-1 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs" data-shot-id="${u.id}">
                        <span class="material-symbols-outlined text-[13px]">refresh</span>
                        <span>Retry Generation</span>
                      </button>
                    </div>
                  `:u.imageUrl?`
                    <img src="${u.imageUrl}" alt="${u.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102" />
                    <!-- Badges overlay -->
                    <div class="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/75 text-white font-mono text-[9px] backdrop-blur-xs">
                      ${u.aspectRatio||"2.39:1"} · ${u.focalLength||"50mm"}
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
                    <span class="font-bold text-slate-900 tracking-tight">Scene: ${_?.sceneNumber||1} | Shot: ${u.shotNumber}</span>
                    <span class="text-[10px] text-slate-400 font-mono">${u.shotSize||"Wide"}</span>
                  </div>
                  <p class="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">${Ia(u.description||u.title||"",u.characters||["Kevin","Marcus","Meera"])}</p>
                </div>
              </div>

              <!-- Card Action Bar: EDIT, RETRY, VARIATION, UPLOAD -->
              <div class="p-2.5 border-t border-slate-100 bg-slate-50/70 flex flex-col gap-2">
                <div class="grid grid-cols-2 gap-1.5">
                  <button type="button" class="btn-open-inspector py-1.5 px-2 rounded-lg bg-white hover:bg-slate-100 active:scale-98 border border-slate-200 text-slate-700 font-bold text-[10px] tracking-wider uppercase cursor-pointer transition-all text-center shadow-2xs" data-shot-id="${u.id}">
                    EDIT
                  </button>
                  <button type="button" class="btn-card-retry-gen py-1.5 px-2 rounded-lg bg-white hover:bg-slate-100 active:scale-98 border border-slate-200 text-slate-700 font-bold text-[10px] tracking-wider uppercase cursor-pointer transition-all flex items-center justify-center gap-1 shadow-2xs" data-shot-id="${u.id}">
                    <span class="material-symbols-outlined text-[13px]">refresh</span> RETRY
                  </button>
                  <button type="button" class="btn-card-variation py-1.5 px-2 rounded-lg bg-white hover:bg-slate-100 active:scale-98 border border-slate-200 text-slate-700 font-bold text-[10px] tracking-wider uppercase cursor-pointer transition-all text-center shadow-2xs" data-shot-id="${u.id}">
                    VARIATION
                  </button>
                  <label class="btn-card-upload-label py-1.5 px-2 rounded-lg bg-white hover:bg-slate-100 active:scale-98 border border-slate-200 text-slate-700 font-bold text-[10px] tracking-wider uppercase cursor-pointer transition-all text-center shadow-2xs flex items-center justify-center">
                    UPLOAD
                    <input type="file" accept="image/*" class="hidden input-card-upload-file" data-shot-id="${u.id}" />
                  </label>
                </div>

                <!-- Sub-bar: Reorder & Status Approval -->
                <div class="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                  <div class="flex items-center gap-1">
                    <button class="btn-move-up p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${u.id}" title="Move left / up">
                      <span class="material-symbols-outlined text-[15px]">arrow_back</span>
                    </button>
                    <button class="btn-move-down p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${u.id}" title="Move right / down">
                      <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  </div>
                  <button class="btn-quick-approve px-2 py-0.5 rounded ${u.approvalStatus==="approved"?"text-emerald-700 bg-emerald-50 border border-emerald-200 font-semibold":"text-slate-500 hover:text-emerald-600"} cursor-pointer transition-colors flex items-center gap-1" data-shot-id="${u.id}">
                    <span class="material-symbols-outlined text-[13px]">${u.approvalStatus==="approved"?"check_circle":"check"}</span>
                    <span>${u.approvalStatus==="approved"?"Approved":"Approve"}</span>
                  </button>
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    `,vn()}function qs(x){const u=x.length>0&&x.every(M=>m.has(M.id)),k=m.size;P.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col">
        <!-- Sequence Toolbar with Batch Selection -->
        <div class="px-3.5 sm:px-4 py-2.5 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div class="flex items-center gap-2">
            <label class="inline-flex items-center gap-1.5 cursor-pointer select-none">
              <input type="checkbox" id="seq-select-all" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" ${u?"checked":""} />
              <span class="font-heading font-bold text-slate-800 text-xs sm:text-sm">${x.length} Shots in Sequence</span>
            </label>
            ${k>0?`
              <span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                ${k} selected
              </span>
            `:""}
          </div>

          <!-- Batch Action Controls -->
          <div class="flex items-center gap-2 flex-wrap">
            ${k>0?`
              <button id="btn-batch-approve-selected" class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold cursor-pointer transition-all flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">done_all</span>
                <span>Approve Selected (${k})</span>
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
          ${x.map(M=>{const z=M.approvalStatus==="approved"?"bg-emerald-50 text-emerald-700 border-emerald-200":M.approvalStatus==="proposed"?"bg-amber-50 text-amber-700 border-amber-200":M.approvalStatus==="rejected"?"bg-rose-50 text-rose-700 border-rose-200":"bg-slate-100 text-slate-600 border-slate-200",ye=m.has(M.id);return`
              <div class="p-3 sm:p-4 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0 w-full overflow-hidden" data-shot-id="${M.id}">
                <div class="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1 w-full">
                  <!-- Row selection checkbox -->
                  <div class="pt-1.5 shrink-0">
                    <input type="checkbox" class="seq-shot-check rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" data-shot-id="${M.id}" ${ye?"checked":""} />
                  </div>

                  <!-- Reorder Controls -->
                  <div class="flex sm:flex-col items-center gap-0.5 sm:gap-1 shrink-0 pt-0.5">
                    <button class="btn-move-up p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${M.id}" title="Move up in sequence">
                      <span class="material-symbols-outlined text-[16px]">expand_less</span>
                    </button>
                    <span class="font-mono font-bold text-xs text-slate-700">${M.order}</span>
                    <button class="btn-move-down p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${M.id}" title="Move down in sequence">
                      <span class="material-symbols-outlined text-[16px]">expand_more</span>
                    </button>
                  </div>

                  <!-- Thumbnail Preview -->
                  <div class="w-16 h-12 sm:w-20 sm:h-12 bg-slate-950 rounded-lg overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center ${M.isGenerating||M.generationError?"":"cursor-pointer btn-open-lightbox"}" data-shot-id="${M.id}">
                    ${M.isGenerating?`
                      <span class="material-symbols-outlined text-blue-500 text-base animate-spin">progress_activity</span>
                    `:M.generationError?`
                      <button type="button" class="btn-card-retry-gen p-1 text-rose-400 hover:text-white" data-shot-id="${M.id}" title="Retry Generation">
                        <span class="material-symbols-outlined text-base">refresh</span>
                      </button>
                    `:M.imageUrl?`
                      <img src="${M.imageUrl}" alt="${M.title}" class="w-full h-full object-cover" />
                    `:`
                      <span class="material-symbols-outlined text-slate-600 text-base sm:text-lg">image</span>
                    `}
                  </div>

                  <!-- Shot Summary Info -->
                  <div class="min-w-0 flex-1 overflow-hidden">
                    <div class="flex items-center gap-1.5 flex-wrap min-w-0">
                      <span class="font-mono font-bold text-xs text-blue-600 shrink-0">${M.shotNumber}</span>
                      <h4 class="font-heading font-semibold text-xs text-slate-900 truncate min-w-0 flex-1" title="${M.title}">${M.title}</h4>
                      <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold border ${z} capitalize shrink-0">
                        ${M.approvalStatus||"Draft"}
                      </span>
                    </div>
                    <p class="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed break-words">${M.description||"No description"}</p>
                    <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-slate-500 mt-1.5 min-w-0">
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${M.shotSize||"Wide"}</span>
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${M.cameraAngle||"Eye Level"}</span>
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${M.focalLength||"50mm"}</span>
                      ${M.continuity?.screenDirection?`
                        <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium truncate max-w-full" title="${M.continuity.screenDirection}">
                          ${M.continuity.screenDirection}
                        </span>
                      `:""}
                    </div>
                  </div>
                </div>

                <!-- Action Controls -->
                <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-center mt-1 sm:mt-0">
                  <button class="btn-quick-approve p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-emerald-600 active:scale-95 text-xs cursor-pointer transition-all" data-shot-id="${M.id}" title="${M.approvalStatus==="approved"?"Mark as Draft":"Approve Shot"}">
                    <span class="material-symbols-outlined text-[16px]">${M.approvalStatus==="approved"?"check_circle":"check"}</span>
                  </button>
                  <button class="btn-card-regen p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-600 active:scale-95 text-xs cursor-pointer transition-all" data-shot-id="${M.id}" title="Regenerate this frame">
                    <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                  </button>
                  <button class="btn-open-inspector px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-xs font-semibold cursor-pointer transition-all" data-shot-id="${M.id}">
                    Edit Details
                  </button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,vn();const $=document.getElementById("seq-select-all");$&&($.onchange=M=>{M.target.checked?x.forEach(z=>m.add(z.id)):m.clear(),qs(x)}),document.querySelectorAll(".seq-shot-check").forEach(M=>{M.onchange=z=>{const ye=M.getAttribute("data-shot-id");z.target.checked?m.add(ye):m.delete(ye),qs(x)}});const H=document.getElementById("btn-batch-approve-selected");H&&(H.onclick=async()=>{const M=Array.from(m);if(M.length)try{await Gs(o,a,M,"approved","Batch approved via Sequence Editor"),w(`Approved ${M.length} shots.`),m.clear(),gt()}catch{w("Failed batch approval.")}});const O=document.getElementById("btn-batch-reject-selected");O&&(O.onclick=async()=>{const M=Array.from(m);if(M.length)try{await Gs(o,a,M,"rejected","Batch rejected via Sequence Editor"),w(`Marked ${M.length} shots as rejected.`),m.clear(),gt()}catch{w("Failed batch rejection.")}});const q=document.getElementById("btn-batch-approve-all");q&&(q.onclick=async()=>{try{const M=(_?.shots||[]).filter(z=>z.approvalStatus==="proposed"||z.approvalStatus==="draft").map(z=>z.id);if(!M.length){w("All shots are already approved.");return}await Gs(o,a,M,"approved","Batch approved for production"),w(`Approved ${M.length} shots.`),gt()}catch{w("Failed batch approval.")}});const oe=document.getElementById("btn-seq-add-shot");oe&&(oe.onclick=()=>Ze(null))}async function Aa(x){const u=_?.shots?.find(k=>k.id===x);if(u){u.isGenerating=!0,u.generationError=null,renderStoryboardView();try{const k=await Qt(o,{provider:u.provider||"scriptora-concept",prompt:`${u.prompt||u.description||"Cinematic composition"} alternative angle variation`,shotSize:u.shotSize,cameraAngle:u.cameraAngle,cameraMovement:u.cameraMovement,focalLength:u.focalLength,lightingMood:u.lightingMood,aspectRatio:u.aspectRatio,visualStyle:u.visualStyle||"Storyboard Sketch",sceneHeading:_?.sceneHeading||"SCENE 1",shotNumber:u.shotNumber,description:u.description,cast:u.characters,characters:u.characters,quality:u.quality||"standard",isVariation:!0});if(k?.imageUrl)u.history||(u.history=[]),u.imageUrl&&u.history.unshift({imageUrl:u.imageUrl,prompt:u.prompt||u.description,visualStyle:u.visualStyle,provider:u.provider,createdAt:new Date().toISOString()}),u.imageUrl=k.imageUrl,u.isGenerating=!1,u.generationError=null,await Rt(o,_),renderStoryboardView(),w(`Created variation for Shot ${u.shotNumber}`);else throw new Error("No image returned")}catch(k){u.isGenerating=!1,u.generationError=k.message||"Variation failed",renderStoryboardView(),w(`Variation failed for shot ${u.shotNumber}`)}}}async function $a(x){const u=_?.shots?.find(k=>k.id===x);if(u){u.isGenerating=!0,u.generationError=null,renderStoryboardView();try{const k=await Qt(o,{provider:u.provider||"scriptora-concept",prompt:u.prompt||u.description||"Cinematic composition",shotSize:u.shotSize,cameraAngle:u.cameraAngle,cameraMovement:u.cameraMovement,focalLength:u.focalLength,lightingMood:u.lightingMood,aspectRatio:u.aspectRatio,visualStyle:u.visualStyle||"Storyboard Sketch",sceneHeading:_?.sceneHeading||"SCENE 1",shotNumber:u.shotNumber,description:u.description,cast:u.characters,characters:u.characters,quality:u.quality||"standard"});if(k?.imageUrl)u.imageUrl=k.imageUrl,u.isGenerating=!1,u.generationError=null,u.history||(u.history=[]),u.history.unshift({imageUrl:k.imageUrl,prompt:u.prompt||u.description,visualStyle:u.visualStyle,provider:u.provider,createdAt:new Date().toISOString()}),await Rt(o,_),renderStoryboardView(),w(`Frame ${u.shotNumber} sketch generated!`);else throw new Error("No image returned")}catch(k){u.isGenerating=!1,u.generationError=k.message||"Generation failed",renderStoryboardView(),w(`Retry failed for shot ${u.shotNumber}`)}}}function vn(){document.querySelectorAll(".btn-open-inspector").forEach(x=>{x.onclick=u=>{u.stopPropagation();const k=x.getAttribute("data-shot-id");Ze(k)}}),document.querySelectorAll(".btn-open-lightbox").forEach(x=>{x.onclick=u=>{u.stopPropagation();const k=x.getAttribute("data-shot-id"),H=(_?.shots||[]).findIndex(O=>O.id===k);Sa(H!==-1?H:0)}}),document.querySelectorAll(".btn-move-up").forEach(x=>{x.onclick=async u=>{u.stopPropagation();const k=x.getAttribute("data-shot-id");wn(k,-1)}}),document.querySelectorAll(".btn-move-down").forEach(x=>{x.onclick=async u=>{u.stopPropagation();const k=x.getAttribute("data-shot-id");wn(k,1)}}),document.querySelectorAll(".btn-quick-approve").forEach(x=>{x.onclick=async u=>{u.stopPropagation();const k=x.getAttribute("data-shot-id"),$=_?.shots?.find(O=>O.id===k);if(!$)return;const H=$.approvalStatus==="approved"?"draft":"approved";try{await Vs(o,a,k,H),w(`Shot ${$.shotNumber} marked ${H}`),gt()}catch{w("Failed to update shot approval")}}}),document.querySelectorAll(".btn-card-regen").forEach(x=>{x.onclick=u=>{u.stopPropagation();const k=x.getAttribute("data-shot-id");wa(k)}}),document.querySelectorAll(".btn-card-history").forEach(x=>{x.onclick=u=>{u.stopPropagation();const k=x.getAttribute("data-shot-id");hn(k)}}),document.querySelectorAll(".btn-card-retry-gen").forEach(x=>{x.onclick=u=>{u.stopPropagation();const k=x.getAttribute("data-shot-id");$a(k)}}),document.querySelectorAll(".btn-card-variation").forEach(x=>{x.onclick=u=>{u.stopPropagation();const k=x.getAttribute("data-shot-id");Aa(k)}}),document.querySelectorAll(".input-card-upload-file").forEach(x=>{x.onchange=u=>{const k=x.getAttribute("data-shot-id"),$=u.target.files&&u.target.files[0];if(!$||!k)return;const H=new FileReader;H.onload=async O=>{const q=_?.shots?.find(oe=>oe.id===k);if(q){q.history||(q.history=[]),q.imageUrl&&q.history.unshift({imageUrl:q.imageUrl,prompt:q.prompt||q.description,visualStyle:q.visualStyle,provider:q.provider,createdAt:new Date().toISOString()}),q.imageUrl=O.target.result,q.imageSource="upload";try{await Rt(o,_),renderStoryboardView(),w(`Uploaded new frame for Shot ${q.shotNumber}`)}catch{w("Failed to save uploaded image")}}},H.readAsDataURL($)}})}async function wn(x,u){const k=_?.shots||[],$=k.findIndex(M=>M.id===x);if($===-1)return;const H=$+u;if(H<0||H>=k.length)return;const O=[...k],[q]=O.splice($,1);O.splice(H,0,q);const oe=O.map(M=>M.id);try{await go(o,a,oe),gt()}catch{w("Failed to reorder shots")}}(async function(){Et(),lt();try{const[u,k]=await Promise.all([is(o),fo()]);he=u||[],ke=k||[]}catch(u){console.warn("Using offline fallback data for storyboard:",u)}y&&he.length&&(y.innerHTML=he.map(u=>`
        <option value="${u.id}" ${u.id===a?"selected":""}>
          Scene ${u.sceneNumber}: ${u.heading}
        </option>
      `).join(""),y.onchange=u=>{a=u.target.value,m.clear(),gt()}),gt()})()}class ii{constructor(){this.appEl=null,this.currentPath=null,this.isFullScreen=!1,this.isNavigatingBack=!1,this._backInProgress=!1,this.backHandlers=[],this.scrollPositions={},this.historyIndex=0}clearHistory(){this.scrollPositions={},this.historyIndex=0,this.backHandlers=[],B.clearHistory()}getBasePath(){return window.location.pathname.toLowerCase().startsWith("/scriptora")?"/Scriptora":""}getCurrentLocation(){return window.location.hash&&window.location.hash.startsWith("#/")?window.location.hash.slice(1):window.location.pathname+window.location.search}normalizePath(t){if(!t)return"/";const s=this.getBasePath();let n=t;s&&n.toLowerCase().startsWith(s.toLowerCase())&&(n=n.slice(s.length)||"/");const o=n.indexOf("?"),a=n.indexOf("#");let l=n.length;o!==-1&&(l=Math.min(l,o)),a!==-1&&(l=Math.min(l,a));const i=n.slice(0,l).replace(/\/+$/,"")||"/";return i.startsWith("/")?i:"/"+i}getRouteFallback(t){const s=this.normalizePath(t);return s.startsWith("/production/")&&s!=="/production"?"/production":s==="/production"?"/workspace":s.startsWith("/intelligence/analysis/")?"/intelligence/analysis":s==="/intelligence/analysis"||s==="/intelligence/analysis/select"?"/intelligence/dashboard":s==="/intelligence/dashboard"||s==="/intelligence/overview"?"/intelligence/context":s==="/intelligence/context"?"/intelligence":s==="/intelligence"||s==="/intelligence/select"?"/workspace":s==="/profile/collaborators"?"/profile":(s==="/profile"||s==="/notifications"||s==="/chat"||s.startsWith("/editor"),"/workspace")}getRouteLabel(t){const s=this.normalizePath(t);return s==="/workspace"?"Workspace":s==="/production"?"Production":s.startsWith("/production/schedule")?"Schedule":s.startsWith("/production/breakdown")?"Breakdown":s.startsWith("/production/call-sheets")?"Call Sheets":s.startsWith("/production/dialogue-sides")?"Dialogue Sides":s.startsWith("/production/storyboard")?"Storyboard":s.startsWith("/editor")?"Editor":s==="/intelligence"?"Intelligence":s==="/intelligence/context"?"Context":s==="/intelligence/dashboard"?"Analysis":s.startsWith("/intelligence/analysis")?"Vectors":s==="/profile"?"Profile":s==="/profile/collaborators"?"Collaborators":s==="/notifications"?"Notifications":s==="/chat"?"AI Chat":"Back"}registerBackHandler(t){return typeof t!="function"?()=>{}:(this.backHandlers.push(t),()=>{const s=this.backHandlers.indexOf(t);s!==-1&&this.backHandlers.splice(s,1)})}triggerBackHandlers(){for(let n=this.backHandlers.length-1;n>=0;n--){const o=this.backHandlers[n];try{if(o())return!0}catch(a){console.error("Back handler error:",a)}}const t=Array.from(document.querySelectorAll("#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)"));if(t.length>0){const n=t[t.length-1],o=n.querySelector('[data-modal-close], #modal-day-close, #modal-day-done, .close-setting-modal, .close-profile-modal, #action-modal-cancel, #new-script-cancel, [id$="-cancel"], [id$="-close"]');return o?o.click():Be(n),!0}const s=Array.from(document.querySelectorAll('.scriptora-popup:not(.hidden), [data-scriptora-popup]:not(.hidden), [role="menu"]:not(.hidden), #quick-add-menu:not(.hidden)'));return s.length>0?(s[s.length-1].classList.add("hidden"),!0):!1}peekPreviousRoute(){return window.history.state?.prevPath?window.history.state.prevPath:B.peekPreviousRoute(null)}back(t=null){if(this._backInProgress||(this._backInProgress=!0,setTimeout(()=>{this._backInProgress=!1},200),this.triggerBackHandlers()))return;const s=window.history.state||{};if((typeof s.appStep=="number"?s.appStep:this.historyIndex)>0){window.history.back();return}let o=B.popHistory();for(;o&&this.normalizePath(o)===this.normalizePath(this.currentPath);)o=B.popHistory();const a=o||t||this.getRouteFallback(this.currentPath);a&&this.normalizePath(a)!==this.normalizePath(this.currentPath)&&(this.isNavigatingBack=!0,this.navigate(a,!0),this.isNavigatingBack=!1)}ensureShell(){if(!this.appEl)return;document.getElementById("scriptora-app-shell")||(this.appEl.innerHTML=`
        <div id="scriptora-app-shell" class="flex flex-col min-h-screen w-full relative bg-surface select-text">
          <!-- Persistent Global Header Container -->
          <div id="scriptora-global-header" class="fixed top-0 left-0 right-0 z-40 transition-all duration-200"></div>

          <!-- Dynamic Screen Content Area -->
          <main id="scriptora-global-content" class="flex-1 w-full min-h-screen flex flex-col relative transition-opacity duration-200"></main>

          <!-- Persistent Global Bottom Navigation Container -->
          <div id="scriptora-global-nav" class="fixed bottom-0 left-0 right-0 z-40 transition-all duration-200 overflow-visible"></div>
        </div>
      `)}init(t="#app"){if(this.appEl=document.querySelector(t),!this.appEl){console.error(`Mount element ${t} not found.`);return}this.ensureShell(),window.scriptoraRouter=this;const s=window.history.state||{};typeof s.appStep!="number"?(window.history.replaceState({...s,appStep:0,scriptoraPath:this.getCurrentLocation()},"",window.location.href),this.historyIndex=0):this.historyIndex=s.appStep,window.setScriptoraFullScreen=n=>{this.isFullScreen=!!n;const o=document.getElementById("scriptora-global-header"),a=document.getElementById("scriptora-global-nav");o&&o.classList.toggle("hidden",!!n),a&&a.classList.toggle("hidden",!!n)},document.addEventListener("click",n=>{const o=n.target.closest("[data-scriptora-back], #prod-subnav-back, #editor-back-btn, #btn-back-notif, #analysis-back-btn, #collab-back-btn, #production-back-btn, #chat-back-btn, #intelligence-dashboard-back-btn, #intelligence-context-back-btn, #individual-analysis-selector-back-btn");if(o){n.preventDefault(),n.stopPropagation();const l=o.getAttribute("data-back-fallback")||o.getAttribute("href")||null;this.back(l);return}const a=n.target.closest("a");if(a&&a.href&&a.origin===window.location.origin&&!a.hasAttribute("download")&&a.getAttribute("target")!=="_blank"&&!a.getAttribute("rel")?.includes("external")){const l=new URL(a.href),i=l.pathname+l.search+l.hash;i.startsWith("/api")||(n.preventDefault(),this.navigate(i))}},!0),window.addEventListener("popstate",n=>{if(!(typeof window.__scriptoraEditorPopstate=="function"&&window.__scriptoraEditorPopstate(n))){if(this.triggerBackHandlers()){const o=this.getCurrentLocation();window.history.pushState({...window.history.state||{},scriptoraPath:o},"",o);return}typeof n.state?.appStep=="number"?this.historyIndex=n.state.appStep:this.historyIndex>0&&(this.historyIndex-=1),B.popHistory(),this.isNavigatingBack=!0,this.resolve(this.getCurrentLocation()),this.isNavigatingBack=!1}}),window.addEventListener("hashchange",()=>{this.resolve(this.getCurrentLocation())}),this.resolve(this.getCurrentLocation())}navigate(t,s=!1){if(Dn(),this.currentPath&&(this.scrollPositions[this.normalizePath(this.currentPath)]=window.scrollY),!this.isNavigatingBack&&!s&&this.currentPath){const i=this.normalizePath(this.currentPath),r=this.normalizePath(t);i!==r&&B.pushHistory(this.currentPath)}const n=this.getBasePath(),o=n&&t.toLowerCase().startsWith(n.toLowerCase())?t.slice(n.length)||"/":t,a=n&&!t.startsWith(n)?`${n}${o.startsWith("/")?"":"/"}${o}`:t,l=this.currentPath?this.normalizePath(this.currentPath):null;s?window.history.replaceState({...window.history.state||{},scriptoraPath:o,appStep:this.historyIndex,prevPath:l},"",a):(this.isNavigatingBack||(this.historyIndex+=1),window.history.pushState({scriptoraPath:o,appStep:this.historyIndex,prevPath:l},"",a)),this.resolve(o)}resolve(t){const s=t.indexOf("?"),n=s===-1?t:t.slice(0,s),o=s===-1?"":t.slice(s+1);let a=n.replace(/\/+$/,"")||"/";const l=this.getBasePath();l&&a.toLowerCase().startsWith(l.toLowerCase())&&(a=a.slice(l.length)||"/"),a.startsWith("/")||(a="/"+a);const i=new URLSearchParams(o||"");this.currentPath=t,a.startsWith("/editor")?(document.body.classList.add("editor-mode"),document.documentElement.classList.add("editor-mode")):(document.body.classList.remove("editor-mode"),document.documentElement.classList.remove("editor-mode"));const r=!!B.state.currentUser;if(!r&&!["/welcome","/auth"].includes(a)){this.navigate("/auth",!0);return}if(r&&a==="/auth"){this.navigate("/workspace",!0);return}if(a==="/"){r?this.navigate("/workspace",!0):this.navigate("/welcome",!0);return}if(a==="/welcome"){this.render(Bo(),()=>No(this.navigate.bind(this)),{isPublic:!0});return}if(a==="/auth"){this.render(Ao(),()=>$o(this.navigate.bind(this)),{isPublic:!0});return}if(a==="/workspace"){this.render(Do(),()=>Ro(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Workspace",subtitle:"Your writing space."});return}if(a==="/editor"){const c=B.state.selectedScriptId||"chronicles-of-dust",m=i.get("scene");this.navigate(`/editor/${c}${m?`?scene=${m}`:""}`,!0);return}if(a.startsWith("/editor/")){const c=a.split("/")[2],m=i.get("scene");B.selectScript(c);const g=B.state.scripts?.find(h=>h.id===c)||{title:"Untitled Screenplay"};this.render(jo(c,m),()=>_o(c,this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Editor",subtitle:g.title||"Screenplay Studio",hideHeader:!0,hideNav:!0});return}if(a==="/intelligence"||a==="/intelligence/select"){this.render(rl(),()=>cl(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Selector"});return}if(a==="/intelligence/context"){this.render(dl(),()=>pl(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Context Calibration"});return}if(a==="/intelligence/dashboard"||a==="/intelligence/overview"){this.render(ul(),()=>ml(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Analysis"});return}if(a==="/intelligence/analysis"||a==="/intelligence/analysis/select"){this.render(fl(),()=>xl(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Analyse Individually"});return}if(a.startsWith("/intelligence/analysis/")){const c=a.split("/")[3]||"pacing",m=i.get("from"),g=i.get("scriptId");this.render(hl(c,m,g),()=>yl(c,this.navigate.bind(this),m,g),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Vector Analysis"});return}if(a==="/profile"){const c=i.get("from"),m=i.get("scriptId");this.render(vl(c,m),()=>wl(this.navigate.bind(this),c,m),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Account & preferences."});return}if(a==="/profile/collaborators"){const c=i.get("from"),m=i.get("scriptId");this.render(Sl(c,m),()=>El(this.navigate.bind(this),c,m),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Collaborators"});return}if(a==="/notifications"){this.render(kl(),()=>Il(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Notifications",subtitle:"Activity Stream"});return}if(a==="/production"||a==="/pre-production"){const c=i.get("from"),m=i.get("scriptId");this.render(Cl(c,m),()=>Al(this.navigate.bind(this),c,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Production Workspace & Tools"});return}if(a==="/production/breakdown"){const c=i.get("from"),m=i.get("scriptId");this.render(Rl(c,m),()=>Ml(this.navigate.bind(this),c,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Script Breakdown Workspace"});return}const p=a.match(/^\/production\/scenes(?:\/([a-zA-Z0-9_-]+))?$/);if(p){const c=i.get("from"),m=i.get("scriptId")||"chronicles-of-dust",g=p[1]||i.get("sceneId"),h=`/production/schedule?scriptId=${m}${g?`&sceneId=${g}`:""}${c?`&from=${encodeURIComponent(c)}`:""}`;this.navigate(h,!0);return}const d=a.match(/^\/production\/call-sheets(?:\/([a-zA-Z0-9_-]+))?$/);if(d){const c=i.get("from"),m=i.get("scriptId"),g=d[1]||i.get("csId");this.render(Ol(c,m,g),()=>va(this.navigate.bind(this),c,m,g),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:g?"Call Sheet Inspector":"Call Sheets Workspace"});return}if(a==="/production/dialogue-sides"||a==="/production/dialogue-sheets"||a==="/production/sides"){const c=i.get("from"),m=i.get("scriptId");this.render(jl(c,m),()=>Fl(this.navigate.bind(this),c,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Dialogue Sheets & Actor Sides"});return}if(a==="/production/schedule"||a==="/production/stripboard"){const c=i.get("from"),m=i.get("scriptId");this.render(Hl(c,m),()=>Ul(this.navigate.bind(this),c,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Master Shooting Schedule & Stripboard"});return}if(a==="/production/storyboard"||a==="/production/storyboards"){const c=i.get("from"),m=i.get("scriptId");this.render(oi(c,m),()=>li(this.navigate.bind(this),c,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Storyboard Studio"});return}if(a==="/chat"||a==="/ai-chat"||a==="/writer-room"||a==="/ai-writer-room"){this.render($l(),()=>Bl(this.navigate.bind(this)),{activeTab:"chat",sectionTitle:"AI Chat",subtitle:"Universal Assistant"});return}this.renderNotFound(a)}render(t,s,n={}){this.ensureShell();const o=document.getElementById("scriptora-global-header"),a=document.getElementById("scriptora-global-content"),l=document.getElementById("scriptora-global-nav"),i=!!n.isPublic,r=!!n.hideHeader,f=!!n.hideNav,p=n.activeTab||"workspace",d=n.sectionTitle||"Scriptora",c=n.subtitle||"";if(i?(o&&o.classList.add("hidden"),l&&l.classList.add("hidden")):(o&&!this.isFullScreen&&(r?(o.classList.add("hidden"),o.innerHTML=""):(o.classList.remove("hidden"),o.innerHTML=ct(d,c))),l&&!this.isFullScreen&&(f?(l.classList.add("hidden"),l.innerHTML=""):(l.classList.remove("hidden"),Co(p)||(l.innerHTML=ot(p))))),a){this.backHandlers=[];const m=document.getElementById("scriptora-modal-portal");m&&(m.innerHTML=""),Dn();let g=t||"";g=g.replace(/<header[^>]*data-global-header="true"[^>]*>[\s\S]*?<\/header>/gi,""),g=g.replace(/<header\s+class="fixed\s+top-0\s+w-full\s+z-40\s+pt-safe\s+bg-surface[^>]*>[\s\S]*?<\/header>/gi,""),g=g.replace(/<nav[^>]*data-global-bottom-nav="true"[^>]*>[\s\S]*?<\/nav>/gi,""),g=g.replace(/<nav\s+class="fixed\s+bottom-0[^>]*>[\s\S]*?<\/nav>/gi,""),a.innerHTML=g;const h=this.normalizePath(this.currentPath),b=this.scrollPositions[h];if(this.isNavigatingBack&&b!==void 0?setTimeout(()=>{window.scrollTo({top:b,behavior:"instant"})},10):window.scrollTo({top:0,behavior:"instant"}),a.classList.remove("fade-in"),a.offsetWidth,a.classList.add("fade-in"),typeof s=="function")try{s()}catch(y){console.error("Error attaching screen events:",y)}}}renderNotFound(t){this.render(`
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
      `,()=>{const s=document.getElementById("notfound-home");s&&(s.onclick=()=>this.navigate("/workspace"))},{activeTab:"workspace",sectionTitle:"Page Not Found",subtitle:"404"})}}const ri=new ii;async function Kn(){try{await B.init(),ri.init("#app"),window.addEventListener("online",()=>{w("Back online. Synchronizing changes..."),B.refreshScripts(),B.refreshNotifications()}),window.addEventListener("offline",()=>{w("Offline mode active. Edits saved locally.","info")}),console.log("Scriptora initialized successfully in production-ready mode.")}catch(e){console.error("Scriptora bootstrap failed:",e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Kn):Kn();
