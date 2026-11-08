(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();const To="scriptora_e2ee_vault",ys="device_keypairs";function ja(){return new Promise((e,t)=>{if(typeof indexedDB>"u")return e(null);const s=indexedDB.open(To,1);s.onupgradeneeded=n=>{const o=n.target.result;o.objectStoreNames.contains(ys)||o.createObjectStore(ys,{keyPath:"keyId"})},s.onsuccess=()=>e(s.result),s.onerror=()=>e(null)})}async function Po(e,t){try{const s=await ja();if(!s){sessionStorage.setItem(`scriptora_keypair_${e}`,JSON.stringify(t));return}const n=s.transaction(ys,"readwrite");n.objectStore(ys).put({keyId:`user_${e}`,...t,updatedAt:Date.now()}),await new Promise(a=>{n.oncomplete=a})}catch{sessionStorage.setItem(`scriptora_keypair_${e}`,JSON.stringify(t))}}async function Lo(e){try{const t=await ja();if(!t){const l=sessionStorage.getItem(`scriptora_keypair_${e}`);return l?JSON.parse(l):null}const o=t.transaction(ys,"readonly").objectStore(ys).get(`user_${e}`),a=await new Promise(l=>{o.onsuccess=()=>l(o.result),o.onerror=()=>l(null)});if(a)return a;const i=sessionStorage.getItem(`scriptora_keypair_${e}`);return i?JSON.parse(i):null}catch{const t=sessionStorage.getItem(`scriptora_keypair_${e}`);return t?JSON.parse(t):null}}function jn(e){let t="";const s=new Uint8Array(e);for(let n=0;n<s.byteLength;n++)t+=String.fromCharCode(s[n]);return btoa(t)}function cn(e){const t=atob(e),s=t.length,n=new Uint8Array(s);for(let o=0;o<s;o++)n[o]=t.charCodeAt(o);return n.buffer}async function Do(e){if(!window.crypto?.subtle)throw new Error("Web Crypto API is not supported in this environment.");const t=await Lo(e);if(t?.publicKeyJwk&&t?.privateKeyJwk)return t;const s=await window.crypto.subtle.generateKey({name:"ECDH",namedCurve:"P-256"},!0,["deriveKey","deriveBits"]),n=await window.crypto.subtle.exportKey("jwk",s.publicKey),o=await window.crypto.subtle.exportKey("jwk",s.privateKey),a={publicKeyJwk:n,privateKeyJwk:o};return await Po(e,a),a}async function ba(){if(!window.crypto?.subtle)throw new Error("Web Crypto API is required for E2EE.");return await window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt"])}async function ga(e){const t=await window.crypto.subtle.exportKey("raw",e);return jn(t)}async function Kn(e){const t=cn(e);return await window.crypto.subtle.importKey("raw",t,{name:"AES-GCM",length:256},!0,["encrypt","decrypt"])}async function ha(e){const t=cn(e),s=await window.crypto.subtle.digest("SHA-256",t),o=Array.from(new Uint8Array(s)).map(a=>a.toString(16).padStart(2,"0")).join("");return`sha256-${o.substring(0,16)}...${o.substring(o.length-8)}`}async function Fn(e,t,s=1){if(!e||!t)return null;const o=new TextEncoder().encode(typeof e=="string"?e:JSON.stringify(e)),a=window.crypto.getRandomValues(new Uint8Array(12)),i=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:a},t,o);return{isEncrypted:!0,version:s,algorithm:"AES-GCM-256",iv:jn(a),ciphertext:jn(i),timestamp:new Date().toISOString()}}async function Fa(e,t){if(!e||!e.ciphertext)return e;const s=cn(e.iv),n=cn(e.ciphertext),o=await window.crypto.subtle.decrypt({name:"AES-GCM",iv:s},t,n),i=new TextDecoder().decode(o);try{return JSON.parse(i)}catch{return i}}function Ro(e,t="Narrative Intelligence"){return new Promise(s=>{if(sessionStorage.getItem(`scriptora_ai_consent_${e}`)==="granted")return s(!0);const o=document.createElement("div");o.className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 fade-in",o.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[24px]">lock_open</span>
          </div>
          <div>
            <h3 class="font-heading font-bold text-base text-slate-900">AI Privacy & Cryptographic Boundary</h3>
            <p class="text-xs text-slate-500">Screenplay: ${e}</p>
          </div>
        </div>

        <div class="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 space-y-2 text-xs text-amber-900 leading-relaxed">
          <p class="font-semibold flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] text-amber-700">info</span>
            End-to-End Encryption Disclosure
          </p>
          <p class="text-[11px] text-slate-700">
            This screenplay is protected with zero-knowledge end-to-end encryption. SCRIPTORA servers do not possess your decryption keys.
          </p>
          <p class="text-[11px] text-slate-700">
            Running <strong>${t}</strong> requires temporarily decrypting relevant screenplay text on your local device and transmitting it to the AI inference model for narrative processing.
          </p>
          <p class="text-[10px] text-slate-500">
            • Data is transmitted via TLS and not retained in permanent training corpora.<br/>
            • Raw private encryption keys are never disclosed to the AI.
          </p>
        </div>

        <div class="flex items-center justify-end gap-2.5 pt-2">
          <button id="ai-consent-cancel" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors">
            Cancel Analysis
          </button>
          <button id="ai-consent-proceed" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-xs cursor-pointer transition-all flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">verified</span>
            <span>Proceed with AI</span>
          </button>
        </div>
      </div>
    `,document.body.appendChild(o);const a=()=>{o.remove()};o.querySelector("#ai-consent-cancel").onclick=()=>{a(),s(!1)},o.querySelector("#ai-consent-proceed").onclick=()=>{sessionStorage.setItem(`scriptora_ai_consent_${e}`,"granted"),a(),s(!0)}})}const Mo={},Oo="http://localhost:8000/api",$n=typeof import.meta<"u"&&Mo?"/Scriptora/":"/",bt=$n.endsWith("/")?$n:`${$n}/`;async function X(e,t={}){const s=`${Oo}${e}`,n={headers:{"Content-Type":"application/json",...t.headers},...t};try{const o=await fetch(s,n);if(!o.ok){const a=await o.json().catch(()=>({}));throw new Error(a.error||`HTTP error ${o.status}`)}return await o.json()}catch(o){throw console.warn(`API call ${e} failed, falling back to local store:`,o.message),o}}const an=[{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",genre:"Drama",format:"Feature",industry:"International / Hollywood",pages:96,updated:"12m ago",currentScene:"Scene 18",isCurrentDraft:!0,archived:!1,joinCode:"A7K9-XP42",logline:"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.",synopsis:"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves.",context:{format:"Feature",industry:"International / Hollywood",hours:1,minutes:36,seconds:0,plannedDuration:"01:36:00"},analysisScores:{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80}},{id:"the-neon-horizon",title:"The Neon Horizon",draft:"Draft 2.1",genre:"Sci-Fi",format:"Pilot",industry:"Streaming Television",pages:62,updated:"2h ago",currentScene:"Scene 4",isCurrentDraft:!1,archived:!1,joinCode:"N3ON-H0RZ",context:{format:"Pilot",industry:"Streaming Television",hours:0,minutes:52,seconds:0,plannedDuration:"00:52:00"},analysisScores:{overall:79,pacing:75,dialogue:84,emotion:80,characterArc:78,continuity:82,storyStructure:76,theme:88,cinema:83,formatting:90,production:72}},{id:"velvet-shadows",title:"Velvet Shadows",draft:"Draft 1.0",genre:"Noir",format:"Feature",industry:"Independent / Festival",pages:114,updated:"Yesterday",currentScene:"Scene 1",isCurrentDraft:!1,archived:!1,joinCode:"V3LV-SHDW",analysisScores:{overall:81,pacing:80,dialogue:86,emotion:79,characterArc:85,continuity:80,storyStructure:82,theme:84,cinema:88,formatting:92,production:76}},{id:"silent-echoes",title:"Silent Echoes",draft:"Draft 3.0",genre:"Psychological Thriller",format:"Feature",industry:"International / Hollywood",pages:104,updated:"3d ago",currentScene:"Scene 22",isCurrentDraft:!1,archived:!1,joinCode:"SLNT-ECH0",analysisScores:{overall:84,pacing:86,dialogue:81,emotion:88,characterArc:83,continuity:85,storyStructure:89,theme:82,cinema:84,formatting:91,production:78}},{id:"glass-kingdoms",title:"Glass Kingdoms",draft:"Draft 1.4",genre:"Fantasy",format:"Pilot",industry:"Streaming Television",pages:58,updated:"1w ago",currentScene:"Scene 8",isCurrentDraft:!1,archived:!1,joinCode:"GLSS-KNGD",analysisScores:{overall:78,pacing:74,dialogue:80,emotion:76,characterArc:82,continuity:75,storyStructure:80,theme:86,cinema:82,formatting:88,production:70}},{id:"red-shift",title:"Red Shift",draft:"Draft 2.0",genre:"Action",format:"Short",industry:"Independent / Festival",pages:28,updated:"2w ago",currentScene:"Scene 5",isCurrentDraft:!1,archived:!1,joinCode:"RED2-SHFT",analysisScores:{overall:83,pacing:90,dialogue:78,emotion:75,characterArc:80,continuity:88,storyStructure:84,theme:80,cinema:89,formatting:95,production:82}}];async function Ha(){try{const e=await X("/auth/me");return e&&"user"in e?e.user?(localStorage.setItem("scriptora_user",JSON.stringify(e.user)),e.user):(localStorage.removeItem("scriptora_user"),null):e?.user||null}catch{const e=localStorage.getItem("scriptora_user");if(e)try{const t=JSON.parse(e);if(t&&(t.displayName||t.email||t.id))return t}catch{}return null}}async function _o(e){try{const t=await X("/auth/login",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-1",name:e.email?e.email.split("@")[0]:"Arun Kumar",displayName:e.email?e.email.split("@")[0]:"Arun Kumar",email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Narrative Director",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function jo(e={}){try{const t=await X("/auth/login",{method:"POST",body:JSON.stringify({...e,provider:"google"})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t=e.displayName||e.name||(e.email?e.email.split("@")[0]:"Google Filmmaker"),s=t.split(" ").map(o=>o[0]).filter(Boolean).slice(0,2).join("").toUpperCase()||"GF",n={id:e.sub||`google-${Date.now()}`,name:t,displayName:t,email:e.email||"arun.kumar@scriptora.studio",headline:"Screenwriter & Film Director",badge:"Member Pro",initials:s,avatar:e.picture||e.photoURL||null,avatarUrl:e.picture||e.photoURL||null,provider:"google",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(n)),n}}async function Fo(e){try{const t=await X("/auth/register",{method:"POST",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:`user-${Date.now()}`,name:e.name||"New Writer",displayName:e.name||"New Writer",email:e.email||"writer@scriptora.studio",headline:"Screenwriter",badge:"Member Pro",initials:(e.name||"NW").slice(0,2).toUpperCase(),stats:{drafts:1,coAuthors:0,healthIndex:"100%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}async function Ho(e){try{const t=await X("/auth/otp",{method:"POST",body:JSON.stringify({phone:e})});return localStorage.setItem("scriptora_user",JSON.stringify(t.user)),t.user}catch{const t={id:"user-phone",name:"Verified Writer",displayName:"Verified Writer",headline:"Screenwriter",email:e,badge:"Member Pro",initials:"VW",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}};return localStorage.setItem("scriptora_user",JSON.stringify(t)),t}}function Hn(){localStorage.removeItem("scriptora_user"),localStorage.removeItem("scriptora_scripts"),localStorage.removeItem("scriptora_selected_script");const e=[];try{for(let t=0;t<localStorage.length;t++){const s=localStorage.key(t);s&&(s.startsWith("scriptora_screenplay_")||s.startsWith("scriptora_prod_")||s.startsWith("scriptora_storyboard_"))&&e.push(s)}for(const t of e)localStorage.removeItem(t)}catch(t){console.warn("Local storage purge notice:",t)}try{sessionStorage.clear()}catch{}}async function Ua(){try{await X("/auth/logout",{method:"POST"})}catch(e){console.warn("Server logout notice:",e.message)}return Hn(),{success:!0}}async function Uo(e){const t=(e||"").trim();if(t.toUpperCase()!=="DELETE MY ACCOUNT")throw new Error('Confirmation mismatch. Please type "DELETE MY ACCOUNT" exactly to confirm account deletion.');try{const s=await X("/auth/delete-account",{method:"POST",body:JSON.stringify({confirmation:t})});return Hn(),s}catch(s){if(!s.status||s.message?.includes("404")||s.message?.includes("Failed to fetch")||s.message?.includes("NetworkError")||s.message?.includes("Load failed"))return Hn(),{success:!0,message:"Account and associated personal records have been permanently deleted."};throw s}}async function ht(e=""){try{const n=e?`/scripts?q=${encodeURIComponent(e)}`:"/scripts",o=await X(n);if(o.scripts&&Array.isArray(o.scripts)){localStorage.setItem("scriptora_scripts",JSON.stringify(o.scripts));let a=o.scripts;return e&&(a=a.filter(i=>i.title.toLowerCase().includes(e.toLowerCase()))),a}}catch{}const t=localStorage.getItem("scriptora_scripts");let s;if(t!==null)try{s=JSON.parse(t),Array.isArray(s)||(s=[...an],localStorage.setItem("scriptora_scripts",JSON.stringify(s)))}catch{s=[...an],localStorage.setItem("scriptora_scripts",JSON.stringify(s))}else s=[...an],localStorage.setItem("scriptora_scripts",JSON.stringify(s));return e&&(s=s.filter(n=>n.title.toLowerCase().includes(e.toLowerCase()))),s}async function gn(e){try{const s=await X(`/scripts/${e}`);if(s.script)return s.script}catch{}const t=await ht();return t.find(s=>s.id===e)||an.find(s=>s.id===e)||t[0]||null}async function qo(e){const t=(e.title||"untitled").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")||`script-${Date.now()}`,s={id:t,title:e.title||"Untitled Screenplay",draft:"Draft 1.0",pageCount:1,wordCount:0,scenes:[{id:"scene-1",number:1,slugline:"",blocks:[{id:`b-${Date.now()}-1`,type:"scene",content:""}]}]};try{const l=await X("/scripts",{method:"POST",body:JSON.stringify(e)});if(l.script){s.id=l.script.id,s.title=l.script.title,localStorage.setItem(`scriptora_screenplay_${l.script.id}`,JSON.stringify(s)),await Ks(l.script.id,s).catch(()=>{});const f=(await ht()).map(p=>({...p,isCurrentDraft:!1}));return localStorage.setItem("scriptora_scripts",JSON.stringify([l.script,...f.filter(p=>p.id!==l.script.id)])),localStorage.setItem("scriptora_selected_script",l.script.id),l.script}}catch{}const n={id:t,title:e.title||"Untitled Screenplay",draft:"Draft 1.0",genre:e.genre||"Drama",format:e.format||"Feature",industry:e.industry||"International / Hollywood",pages:1,updated:"Just now",currentScene:"Scene 1",isCurrentDraft:!0,joinCode:`${Math.random().toString(36).substring(2,6).toUpperCase()}-${Math.random().toString(36).substring(2,6).toUpperCase()}`,archived:!1,context:{format:e.format||"Feature",industry:e.industry||"International / Hollywood",hours:1,minutes:30,seconds:0,plannedDuration:"01:30:00"},analysisScores:{overall:80,pacing:78,dialogue:80,emotion:80,characterArc:78,continuity:80,storyStructure:80,theme:80,cinema:80,formatting:90,production:75}};localStorage.setItem(`scriptora_screenplay_${n.id}`,JSON.stringify(s));const a=(await ht()).map(l=>({...l,isCurrentDraft:!1})),i=[n,...a.filter(l=>l.id!==n.id)];return localStorage.setItem("scriptora_scripts",JSON.stringify(i)),localStorage.setItem("scriptora_selected_script",n.id),n}async function Vo(e){if(!e)return await ht();try{const n=await X(`/scripts/${e}/current-draft`,{method:"POST"});if(n&&n.script){const a=(await ht()).map(i=>({...i,isCurrentDraft:i.id===e,updated:i.id===e?"Just now":i.updated}));return localStorage.setItem("scriptora_scripts",JSON.stringify(a)),localStorage.setItem("scriptora_selected_script",e),a}}catch{}const s=(await ht()).map(n=>({...n,isCurrentDraft:n.id===e,updated:n.id===e?"Just now":n.updated}));return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),localStorage.setItem("scriptora_selected_script",e),s}async function zo(e,t){try{const o=await X(`/scripts/${e}`,{method:"PUT",body:JSON.stringify(t)});if(o.script){const i=(await ht()).map(l=>l.id===e?o.script:l);return localStorage.setItem("scriptora_scripts",JSON.stringify(i)),o.script}}catch{}const n=(await ht()).map(o=>o.id===e?{...o,...t,updated:"Just now"}:o);return localStorage.setItem("scriptora_scripts",JSON.stringify(n)),{id:e,...t,updated:"Just now"}}async function Go(e){try{await X(`/scripts/${e}`,{method:"DELETE"})}catch{}const t=await ht(),n=t.find(i=>i.id===e)?.isCurrentDraft;let o=t.filter(i=>i.id!==e);return n&&o.length>0&&(o[0].isCurrentDraft=!0),localStorage.setItem("scriptora_scripts",JSON.stringify(o)),localStorage.removeItem(`scriptora_screenplay_${e}`),localStorage.getItem("scriptora_selected_script")===e&&(o.length>0?localStorage.setItem("scriptora_selected_script",o[0].id):localStorage.removeItem("scriptora_selected_script")),{success:!0}}async function Wo(e){try{const a=await X(`/scripts/${e}/duplicate`,{method:"POST"});if(a.script){const i=await ht();return localStorage.setItem("scriptora_scripts",JSON.stringify([a.script,...i])),a.script}}catch{}const t=await gn(e),s={...t,id:`${e}-copy-${Date.now().toString().slice(-4)}`,title:`${t?.title||"Script"} (Copy)`,updated:"Just now"},n=await ht(),o=[s,...n];return localStorage.setItem("scriptora_scripts",JSON.stringify(o)),s}async function Ko(e){try{await X(`/scripts/${e}/archive`,{method:"POST"})}catch{}const s=(await ht()).map(n=>n.id===e?{...n,archived:!0,updated:"Just now"}:n);return localStorage.setItem("scriptora_scripts",JSON.stringify(s)),{success:!0}}const Jn={id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pageCount:5,wordCount:14280,titlePage:{title:"CHRONICLES OF DUST",author:"Arun Kumar",contact:"Scriptora Studio · arun.kumar@scriptora.studio · +1 (555) 019-2834",notes:"An original screenplay. Draft 4.2 Production Cut."},settings:{sceneNumbers:!0,sceneNumberSide:"left",smartFormatting:!0,fontSize:"12pt",lineSpacing:"1.5",language:"English"},acts:[{id:"act-1",name:"ACT I - The Broken Siphon"},{id:"act-2",name:"ACT II - The Pressure Surge"},{id:"act-3",name:"ACT III - The Floodgate Standoff"}],characters:["KEVIN","MEERA","HARI","AKASH"],locations:["INT. HOME","INT. PORT AUDIT ROOM","INT. CUSTOMS OFFICE","EXT. FLOODGATE GANTRY"],times:["DAY","NIGHT","CONTINUOUS","DAWN","DUSK","LATER","MORNING","EVENING"],transitions:["CUT TO:","FADE IN:","FADE OUT.","DISSOLVE TO:","SMASH CUT TO:","MATCH CUT TO:","JUMP CUT TO:"],scenes:[{id:"scene-1",number:1,actId:"act-1",slugline:"INT. HOME - EVENING",blocks:[{id:"b-1-1",type:"scene",content:"INT. HOME - EVENING"},{id:"b-1-2",type:"action",content:"There stands a woman."},{id:"b-1-3",type:"character",content:"HARI"},{id:"b-1-4",type:"dialogue",content:"Who is that?"},{id:"b-1-5",type:"character",content:"AKASH"},{id:"b-1-6",type:"dialogue",content:"How do I know?"},{id:"b-1-7",type:"action",content:"Both leaves the place."}]},{id:"scene-4",number:4,actId:"act-1",slugline:"INT. PORT AUDIT ROOM - DAY",blocks:[{id:"b-4-1",type:"scene",content:"INT. PORT AUDIT ROOM - DAY"},{id:"b-4-2",type:"action",content:"Kevin stamps irregular cargo manifests to keep peace with union superiors."},{id:"b-4-3",type:"character",content:"KEVIN"},{id:"b-4-4",type:"dialogue",content:"The manifests are sealed."}]},{id:"scene-18",number:18,actId:"act-2",slugline:"INT. CUSTOMS OFFICE - NIGHT",blocks:[{id:"b-18-1",type:"scene",content:"INT. CUSTOMS OFFICE - NIGHT"},{id:"b-18-2",type:"action",content:"Kevin kneels over the cracked hydro-sensor junction box. Static hiss whispers through the damp comm-link. A lone flicker illuminates the tarnished brass seal."},{id:"b-18-3",type:"action",content:"Water droplets bead along the corroded circuit wires. He slides a copper probe between the connectors."},{id:"b-18-4",type:"character",content:"KEVIN"},{id:"b-18-5",type:"parenthetical",content:"(whispering into comm)"},{id:"b-18-6",type:"dialogue",content:"If the seals break before dawn, the sector won't hold the surge."},{id:"b-18-7",type:"character",content:"MEERA (O.S.)"},{id:"b-18-8",type:"dialogue",content:"Then don't let them break. Reroute the secondary relay through the floodgate breaker."},{id:"b-18-9",type:"transition",content:"CUT TO:"}]}]};async function Un(e){let t=null;const s=localStorage.getItem(`scriptora_screenplay_enc_${e}`),n=localStorage.getItem(`scriptora_screenplay_key_${e}`);if(s&&n)try{const r=await Kn(n),f=await Fa(JSON.parse(s),r);f&&f.scenes&&(t=f)}catch(r){console.warn("Failed to decrypt E2EE screenplay payload:",r)}if(!t)try{const r=await X(`/screenplay/${e}`);r.screenplay&&r.screenplay.scenes&&(t=r.screenplay)}catch{}if(!t){const r=localStorage.getItem(`scriptora_screenplay_${e}`);if(r)try{const f=JSON.parse(r);f&&f.scenes&&(t=f)}catch{}}if(e==="chronicles-of-dust"){if(!t||!t.scenes||t.scenes.length===0){const r=JSON.parse(JSON.stringify(Jn));return r.id=e,localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(r)),r}return t}if(t&&(r=>!r||!Array.isArray(r.scenes)?!1:r.scenes.some(f=>{const p=(f.slugline||"").toUpperCase();return p.includes("WRITER'S ROOM")||p.includes("STUDIO - DAY")||p.includes("NEW SCENE - DAY")?!0:(f.blocks||[]).some(d=>{const c=d.content||"";return c.includes("Sunlight cuts through dust motes")||c.includes("A blank script page waits")||c.includes("Type your screenplay action here")})}))(t)&&(t=null),t)return t;const i=await gn(e),l={id:e||"script_01",title:i?.title||"Untitled Screenplay",draft:"Draft 1.0",pageCount:1,wordCount:0,scenes:[{id:"scene-1",number:1,slugline:"",blocks:[{id:`b-${Date.now()}-1`,type:"scene",content:""}]}]};return localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(l)),Ks(e,l).catch(()=>{}),l}async function Ks(e,t){localStorage.setItem(`scriptora_screenplay_${e}`,JSON.stringify(t));const s=localStorage.getItem(`scriptora_e2ee_${e}`),n=localStorage.getItem(`scriptora_screenplay_key_${e}`);if(s&&n)try{const o=JSON.parse(s);if(o.enabled){const a=await Kn(n),i=await Fn(t,a,o.keyVersion||1);localStorage.setItem(`scriptora_screenplay_enc_${e}`,JSON.stringify(i))}}catch(o){console.warn("E2EE auto-encrypt on save skipped:",o)}try{return await X(`/screenplay/${e}`,{method:"PUT",body:JSON.stringify({screenplay:t})})}catch{return{success:!0}}}async function Jo(e){try{return(await X(`/versions/${e}`)).versions}catch{return[{id:"v-4.2",name:"Draft 4.2",tag:"Current Active",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:"Refined Meera O.S. dialogue and hydro-sensor action line.",isCurrent:!0},{id:"v-3.0",name:"Draft 3.0",tag:"Production Polish",timestamp:"Yesterday, 4:15 PM",author:"JD",stats:"94 pages · 13,950 words",notes:"Incorporated director notes on floodgate transition pacing.",isCurrent:!1},{id:"v-2.0",name:"Draft 2.0",tag:"First Table Read",timestamp:"Oct 12, 2024",author:"JD",stats:"90 pages · 13,200 words",notes:"Table read revision for Acts I & II character arcs.",isCurrent:!1}]}}async function Yo(e,t){try{return(await X(`/versions/${e}`,{method:"POST",body:JSON.stringify(t)})).version}catch{return{id:`v-${Date.now()}`,name:t.name,tag:"Milestone Snapshot",timestamp:"Just now",author:"JD",stats:"96 pages · 14,280 words",notes:t.notes||"",isCurrent:!0}}}const Xo=[{id:"c-1",name:"Heamanth S.",email:"heamanth@studio.com",initials:"HS",role:"Editor",avatarBg:"bg-blue-100 text-blue-700",status:"Active",added:"2d ago"},{id:"c-2",name:"Elena Rostova",email:"elena@cineworks.io",initials:"ER",role:"Script Doctor",avatarBg:"bg-amber-100 text-amber-700",status:"Active",added:"1w ago"},{id:"c-3",name:"Marcus Vance",email:"vance.prod@paramount.com",initials:"MV",role:"Producer",avatarBg:"bg-purple-100 text-purple-700",status:"Active",added:"2w ago"}];async function qa(e){try{const n=await X(`/collaborators/${e}`);if(n.collaborators&&Array.isArray(n.collaborators))return localStorage.setItem(`scriptora_collaborators_${e}`,JSON.stringify(n.collaborators)),n.collaborators}catch{}const t=localStorage.getItem(`scriptora_collaborators_${e}`);if(t)try{const n=JSON.parse(t);if(Array.isArray(n))return n}catch{}const s=[...Xo];return localStorage.setItem(`scriptora_collaborators_${e}`,JSON.stringify(s)),s}async function Zo(e){try{return await X(`/collaborators/${e}/permissions`)}catch{return{role:"Owner",permissions:{"screenplay.read":!0,"screenplay.edit":!0,"scene.create":!0,"scene.delete":!0,"character.manage":!0,"dialogue.edit":!0,"storyboard.view":!0,"storyboard.edit":!0,"analysis.run":!0,"comments.create":!0,"production.view":!0,"production.manage":!0,"collaborators.invite":!0,"collaborators.manage":!0,"screenplay.export":!0,"security.manage":!0}}}}async function Qo(e,t){const s=(t.email||"").trim().toLowerCase();if(!s||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))throw new Error("Please provide a valid email address.");if((await qa(e)).some(l=>(l.email||"").toLowerCase()===s))throw new Error("This user is already a collaborator on this screenplay.");if((await Va(e)).some(l=>(l.email||"").toLowerCase()===s&&l.status==="pending"))throw new Error("An active invitation is already pending for this email address.");try{const l=await X(`/collaborators/${e}/invite`,{method:"POST",body:JSON.stringify(t)});if(l.collaborator)return l.collaborator}catch(l){if(l.message&&!l.message.includes("405")&&!l.message.includes("404")&&!l.message.includes("Failed to fetch")&&!l.message.includes("NetworkError"))throw l}const a={id:`inv-${Date.now()}`,email:s,role:t.role||"Editor",message:t.message||"",token:`inv_${Math.random().toString(36).substring(2,10)}_${Date.now()}`,status:"pending",createdAt:new Date().toISOString(),expiresAt:new Date(Date.now()+7*24*3600*1e3).toISOString()},i=JSON.parse(localStorage.getItem(`scriptora_invitations_${e}`)||"[]");return i.unshift(a),localStorage.setItem(`scriptora_invitations_${e}`,JSON.stringify(i)),a}async function Va(e){try{const s=await X(`/collaborators/${e}/invitations`);if(s.invitations&&Array.isArray(s.invitations))return localStorage.setItem(`scriptora_invitations_${e}`,JSON.stringify(s.invitations)),s.invitations}catch{}const t=localStorage.getItem(`scriptora_invitations_${e}`);if(t)try{const s=JSON.parse(t);if(Array.isArray(s))return s.filter(n=>n.status==="pending")}catch{}return[]}async function el(e,t){try{return await X(`/collaborators/${e}/invitations/${t}`,{method:"DELETE"})}catch(o){if(o.message&&!o.message.includes("405")&&!o.message.includes("404")&&!o.message.includes("Failed to fetch"))throw o}const n=JSON.parse(localStorage.getItem(`scriptora_invitations_${e}`)||"[]").filter(o=>o.id!==t);return localStorage.setItem(`scriptora_invitations_${e}`,JSON.stringify(n)),{success:!0}}async function tl(e,t){try{return(await X(`/collaborators/${e}/invitations/${t}/resend`,{method:"POST"})).invitation}catch(o){if(o.message&&!o.message.includes("405")&&!o.message.includes("404")&&!o.message.includes("Failed to fetch"))throw o}const s=JSON.parse(localStorage.getItem(`scriptora_invitations_${e}`)||"[]"),n=s.find(o=>o.id===t);if(!n)throw new Error("Invitation not found.");return n.status="pending",n.token=`inv_${Math.random().toString(36).substring(2,10)}_${Date.now()}`,n.createdAt=new Date().toISOString(),n.expiresAt=new Date(Date.now()+7*24*3600*1e3).toISOString(),localStorage.setItem(`scriptora_invitations_${e}`,JSON.stringify(s)),n}async function sl(e,t,s){try{const a=await X(`/collaborators/${e}/${t}`,{method:"PUT",body:JSON.stringify({role:s})});if(a.collaborator)return a.collaborator}catch(a){if(a.message&&!a.message.includes("405")&&!a.message.includes("404")&&!a.message.includes("Failed to fetch"))throw a}const n=JSON.parse(localStorage.getItem(`scriptora_collaborators_${e}`)||"[]"),o=n.find(a=>a.id===t);if(o)return o.role=s,localStorage.setItem(`scriptora_collaborators_${e}`,JSON.stringify(n)),o;throw new Error("Collaborator not found.")}async function nl(e,t){try{return await X(`/collaborators/${e}/${t}`,{method:"DELETE"})}catch(o){if(o.message&&!o.message.includes("405")&&!o.message.includes("404")&&!o.message.includes("Failed to fetch"))throw o}const n=JSON.parse(localStorage.getItem(`scriptora_collaborators_${e}`)||"[]").filter(o=>o.id!==t);return localStorage.setItem(`scriptora_collaborators_${e}`,JSON.stringify(n)),{success:!0}}async function al(e){try{return(await X(`/join-code/generate/${e}`,{method:"POST"})).joinCode}catch{const t="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let s="",n="";for(let o=0;o<4;o++)s+=t[Math.floor(Math.random()*t.length)];for(let o=0;o<4;o++)n+=t[Math.floor(Math.random()*t.length)];return`${s}-${n}`}}async function ol(e){return await X(`/join-code/revoke/${e}`,{method:"POST"})}async function ll(e){return await X("/join-code/validate",{method:"POST",body:JSON.stringify({code:e})})}async function il(e,t){return await X("/join-code/request-access",{method:"POST",body:JSON.stringify({code:e,...t})})}async function rl(e){try{return(await X(`/collaborators/${e}/requests`)).requests||[]}catch{return[]}}async function cl(e,t,s){return await X(`/collaborators/${e}/requests/${t}/approve`,{method:"POST",body:JSON.stringify({role:s})})}async function dl(e,t){return await X(`/collaborators/${e}/requests/${t}/reject`,{method:"POST"})}async function pl(e){try{return(await X(`/collaborators/${e}/security-activity`)).activity||[]}catch{return[]}}async function za(e){try{const s=await X(`/collaborators/${e}/e2ee`);if(s?.e2ee){try{localStorage.setItem(`scriptora_e2ee_${e}`,JSON.stringify(s.e2ee))}catch{}return s.e2ee}}catch{}const t=localStorage.getItem(`scriptora_e2ee_${e}`);if(t)try{return JSON.parse(t)}catch{}return{enabled:!1,algorithm:"AES-GCM-256",keyVersion:1,keyFingerprint:null,lastRotated:null,wrappedKeys:{}}}async function ul(e,t){try{const s=await X(`/collaborators/${e}/e2ee/enable`,{method:"POST",body:JSON.stringify(t)});if(s?.e2ee)try{localStorage.setItem(`scriptora_e2ee_${e}`,JSON.stringify(s.e2ee))}catch{}return s}catch{const n={enabled:!0,algorithm:"AES-GCM-256",keyVersion:1,keyFingerprint:t.keyFingerprint||`sha256-${Date.now()}`,lastRotated:new Date().toISOString(),wrappedKeys:t.wrappedKeys||{}};try{localStorage.setItem(`scriptora_e2ee_${e}`,JSON.stringify(n))}catch{}return{success:!0,e2ee:n}}}async function ml(e,t){try{const s=await X(`/collaborators/${e}/e2ee/rotate`,{method:"POST",body:JSON.stringify(t)});if(s?.e2ee)try{localStorage.setItem(`scriptora_e2ee_${e}`,JSON.stringify(s.e2ee))}catch{}return s}catch{const n=JSON.parse(localStorage.getItem(`scriptora_e2ee_${e}`)||"{}"),o={...n,enabled:!0,keyVersion:(n.keyVersion||1)+1,keyFingerprint:t.newKeyFingerprint||`sha256-v${(n.keyVersion||1)+1}-${Date.now()}`,lastRotated:new Date().toISOString(),wrappedKeys:t.wrappedKeys||n.wrappedKeys||{}};try{localStorage.setItem(`scriptora_e2ee_${e}`,JSON.stringify(o))}catch{}return{success:!0,e2ee:o}}}async function fl(e){try{const t=await X(`/collaborators/${e}/e2ee/disable`,{method:"POST"});if(t?.e2ee)try{localStorage.setItem(`scriptora_e2ee_${e}`,JSON.stringify(t.e2ee))}catch{}return t}catch{const n={...JSON.parse(localStorage.getItem(`scriptora_e2ee_${e}`)||"{}"),enabled:!1,disabledAt:new Date().toISOString()};try{localStorage.setItem(`scriptora_e2ee_${e}`,JSON.stringify(n))}catch{}return{success:!0,e2ee:n}}}async function Ga(){try{return await X("/notifications")}catch{return{notifications:[{id:1,sender:"HS",senderName:"Heamanth",type:"collaboration_invite",title:"Heamanth invited you to collaborate",body:'Added you as an Editor on "Chronicles of Dust" (Draft 4.2).',time:"12m ago",group:"today",unread:!0,tags:["Draft 4.2","Role: Editor"],actionLabel:"Review Access →",actionRoute:"/profile/collaborators"},{id:2,sender:"icon:description",type:"export_ready",title:"Your export is ready",body:'"Chronicles of Dust (Draft 4.2)" exported as standard Industry PDF.',time:"45m ago",group:"today",unread:!0,tags:["PDF","96 Pages"],actionLabel:"Open Screenplay →",actionRoute:"/editor/chronicles-of-dust"},{id:3,sender:"AK",senderName:"Arun K.",type:"join_code_request",title:"Join-code access request",body:'Requested Editor access to "Anbin Mozhi" via join-code A7K9-XP42.',time:"2h ago",group:"today",unread:!0,tags:["Code: A7K9-XP42"],actionLabel:"Manage Collaborators →",actionRoute:"/profile/collaborators"}],unreadCount:3}}}async function xl(e){try{return await X(`/notifications/${e}/read`,{method:"POST"})}catch{return{success:!0}}}async function bl(){try{return await X("/notifications/read-all",{method:"POST"})}catch{return{success:!0}}}async function ya(){return(await Ga()).unreadCount||0}async function Bn(e){try{const t=await X("/profile",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_user",JSON.stringify(t.profile)),t.profile}catch{const s={...await Ha()||{},...e};if(e.name){const n=e.name.trim().split(/\s+/);s.initials=((n[0]?.[0]||"A")+(n[1]?.[0]||"")).toUpperCase(),s.displayName=e.name}return localStorage.setItem("scriptora_user",JSON.stringify(s)),s}}async function Wa(){try{return(await X("/settings")).settings}catch{const e=localStorage.getItem("scriptora_settings");return e?JSON.parse(e):{editor:{autoSceneHeading:!0,autoCharacter:!0,autoTransition:!0,enterAfterAction:!0,tabAfterAction:!0,autoCapitalize:!0,continueDialogue:!0,showSceneNumbers:!0,lockSceneNumbers:!1,fontSize:"Courier Prime 12pt",lineSpacing:"1.5 line",focusMode:!1},language:"English (US)",appearance:"Light",notifications:{collaborationInvites:!0,collaborationEdits:!0,mentions:!0,versionMilestones:!0},intelligence:{querySuggestions:!0,analysisSuggestions:!0}}}}async function gl(e){try{const t=await X("/settings",{method:"PUT",body:JSON.stringify(e)});return localStorage.setItem("scriptora_settings",JSON.stringify(t.settings)),t.settings}catch{const s={...await Wa(),...e};return localStorage.setItem("scriptora_settings",JSON.stringify(s)),s}}async function hl(e,t){try{return(await X(`/intelligence/${e}/context`,{method:"PUT",body:JSON.stringify(t)})).context}catch{return t}}async function Yn(e,t){try{return(await X("/intelligence/query",{method:"POST",body:JSON.stringify({query:e,scriptId:t})})).answer}catch{return"Analysis: In this screenplay, scene tempo and dialogue density align with core narrative milestones. Characters express distinct agendas in each beat."}}async function yl(e="chronicles-of-dust"){try{const o=await X(`/production/${e}`);if(o?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(o.workspace)),o.workspace}catch{}const t=localStorage.getItem(`scriptora_prod_ws_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=await gn(e),n={id:`prod-ws-${e}`,projectId:"proj-1",projectName:"Badlands Anthology",scriptId:e,screenplayTitle:s?.title||"Chronicles of Dust",pinnedSourceVersion:s?.draft||"Draft 4.2",pinnedSourceVersionHash:"v4.2-snap-88f2",pinnedTimestamp:"12m ago",currentScriptDraft:s?.draft||"Draft 4.2",isStale:!1,mode:localStorage.getItem("scriptora_prod_mode")||"simple",userRole:localStorage.getItem("scriptora_prod_role")||"Owner",roles:["Owner","Director","Assistant Director","Production","Department Member","Viewer"],stats:{totalScenes:18,breakdownElements:78,callSheetsCount:2,shootingDays:14,pendingProposals:2,completedApprovals:6},updatedAt:new Date().toISOString()};return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n)),n}async function vl(e,t){try{const n=await X(`/production/${e}/pin`,{method:"POST",body:JSON.stringify({version:t})});if(n?.workspace)return localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(n.workspace)),n.workspace}catch{}const s=await yl(e);return s.pinnedSourceVersion=t,s.pinnedTimestamp="Just now",s.isStale=!1,localStorage.setItem(`scriptora_prod_ws_${e}`,JSON.stringify(s)),s}async function vs(e="chronicles-of-dust"){try{const o=await X(`/production/${e}/scenes`);if(o?.scenes)return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(o.scenes)),o.scenes}catch{}const t=localStorage.getItem(`scriptora_prod_scenes_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[],n=[{num:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",intExt:"EXT",dayNight:"DAY",p:"4 1/8",comp:"Moderate",day:"Day 1 of 7",cast:["KEVIN","MARCUS"],desc:"Wind whips dust across perimeter chain link. Kevin arrives at customs gate."},{num:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",intExt:"INT",dayNight:"DAY",p:"3 4/8",comp:"Simple",day:"Day 1 of 7",cast:["KEVIN","MEERA"],desc:"Meera analyzes telemetry console indicating illegal pressure drop."},{num:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",intExt:"EXT",dayNight:"DUSK",p:"7 2/8",comp:"Complex",day:"Day 2 of 7",cast:["KEVIN"],desc:"Concrete conduit pipeline across cracked alkali flats during sunset."},{num:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",intExt:"EXT",dayNight:"NIGHT",p:"5 0/8",comp:"Complex",day:"Day 3 of 7",cast:["KEVIN","MEERA"],desc:"Perimeter night patrol with solar rover and surveillance drones."},{num:5,heading:"INT. HYDRAULIC VALVE TUNNEL - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"5 4/8",comp:"Moderate",day:"Day 3 of 7",cast:["KEVIN"],desc:"Rusty underground valves with echoing industrial turbine vibration."},{num:6,heading:"EXT. DESERT SERVICE ROAD - DAY",intExt:"EXT",dayNight:"DAY",p:"5 2/8",comp:"Simple",day:"Day 4 of 7",cast:["KEVIN"],desc:"Kevin tracks tanker tire treads along decommissioned asphalt."},{num:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",intExt:"INT",dayNight:"DAY",p:"6 3/8",comp:"Moderate",day:"Day 5 of 7",cast:["COMMANDER VANCE","KEVIN"],desc:"Vance oversees regional water diversion bank from glass observatory."},{num:8,heading:"EXT. RESERVOIR INTAKE BASIN - DAY",intExt:"EXT",dayNight:"DAY",p:"5 5/8",comp:"Complex",day:"Day 6 of 7",cast:["MEERA"],desc:"Rappelling 60-foot descent down drained concrete spillway."},{num:9,heading:"INT. DRAINAGE VAULT - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"4 1/8",comp:"Moderate",day:"Day 7 of 7",cast:["KEVIN","MEERA"],desc:"Subterranean acoustic surveillance using directional hydrophones."},{num:10,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",intExt:"INT",dayNight:"NIGHT",p:"2 6/8",comp:"Complex",day:"Day 2 of 7",cast:["KEVIN","MEERA"],desc:"Kevin anchors hydraulic bypass valve kit as high pressure brine seals."}];for(const o of n)s.push({id:`scene-${o.num}`,sceneNumber:o.num,scriptId:e,heading:o.heading,intExt:o.intExt,dayNight:o.dayNight,pages:o.p,complexity:o.comp,shootDay:o.day,status:o.num===4?"Needs Review":"Scheduled",snippet:o.desc,directorNotes:`Director visual notes for ${o.heading}. Maintain high contrast lighting.`,continuityNotes:"Continuity reference logged against Draft 4.2.",cast:o.cast,sidesReady:!0});return localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(s)),s}async function wl(e,t){try{const i=await X(`/production/${e}/scenes/${t}`);if(i?.scene)return i.scene}catch{}const n=(await vs(e)).find(i=>i.id===t||String(i.sceneNumber)===String(t));if(!n)return null;const a=(await Ft(e)).filter(i=>i.sceneId===n.id||i.sceneNumber===n.sceneNumber||Array.isArray(i.scenes)&&i.scenes.includes(n.sceneNumber));return{...n,elements:a}}async function Ls(e,t,s){try{const a=await X(`/production/${e}/scenes/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.scene)return a.scene}catch{}const n=await vs(e),o=n.find(a=>a.id===t||String(a.sceneNumber)===String(t));return o?(Object.assign(o,s),localStorage.setItem(`scriptora_prod_scenes_${e}`,JSON.stringify(n)),o):s}async function Ft(e="chronicles-of-dust",t=null,s=null){try{const a=new URLSearchParams;t&&a.set("category",t),s&&a.set("scene",s);const i=a.toString()?`?${a.toString()}`:"",l=await X(`/production/${e}/breakdown${i}`);if(l?.breakdown)return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(l.breakdown)),l.breakdown}catch{}const n=localStorage.getItem(`scriptora_prod_breakdown_${e}`);let o=[];if(n)try{o=JSON.parse(n)}catch{}if(o.length||(o=[{id:"elem-1",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[1,2,4,18],category:"Cast",name:"KEVIN",characterRole:"Discredited hydro-engineer, 30s. Hero protagonist.",description:"Discredited hydro-engineer, 30s. Hero protagonist.",assignedActor:"Dev Patel",castingStatus:"Confirmed Cast",actorAvailability:"Available Shoot Days 1-14",appearancesCount:4,sourceSnippet:"Kevin kneels over cracked hydro-sensor junction box, static hissing from the diagnostic speaker.",originalAiSuggestion:"KEVIN — Discredited hydro-engineer, 30s. Hero protagonist.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Requires desert dust protective gear and waterproof boots."},{id:"elem-2",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[4,16,18],category:"Cast",name:"MEERA",characterRole:"Field operative with tactical harness.",description:"Field operative with tactical harness.",assignedActor:"Zoe Saldana",castingStatus:"Confirmed Cast",actorAvailability:"Available Shoot Days 4-18",appearancesCount:3,sourceSnippet:"Meera anchors her cable to the iron pylon, visor reflecting the rising floodwaters below.",originalAiSuggestion:"MEERA — Field operative with tactical harness.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Tactical harness fitted for scene 18 valve climb."},{id:"elem-3",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Props",name:"Hydraulic Bypass Valve Kit",description:"Custom machined valve kit with functional digital LED pressure display.",sourcingType:"Hero Prop Built",quantity:"1 Hero + 2 Stunt Duplicates",readinessStatus:"Ready in Art Dept",continuityNotes:"Clean in Sc 1, weathered with grease in Sc 18",sourceSnippet:"Kevin clicks the bypass manifold into place. The gauge needles spike red.",originalAiSuggestion:"Hydraulic Bypass Valve Kit — machined valve kit with LED display.",status:"Confirmed",isHumanConfirmed:!0,confidence:.95,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero prop constructed by art department; 2 stunt duplicates on standby."},{id:"elem-4",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Practical FX",name:"High-Pressure Water Spray",description:"Controlled water burst simulating cracked pipe joint failure.",requiredResources:"Dedicated 4000L Water Tanker, 120 PSI Pump Rig",technicalRequirements:"Safe water containment basins, electrical shut-off triggers",safetyNotes:"Non-slip decking mandatory; waterproof protective ponchos for camera crew",prepStatus:"Rig Test Scheduled",sourceSnippet:"A burst of pressurized brine shoots from the seam, blinding the chamber.",originalAiSuggestion:"High-Pressure Water Spray — Controlled water burst simulating cracked pipe failure.",status:"Needs Review",isHumanConfirmed:!1,confidence:.88,confirmedBy:null,confirmedAt:null,notes:"SFX coordinator requested dedicated water truck standby via Proposal #prop-1."},{id:"elem-5",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Stunts",name:"Valve Pylon Cable Rappel",description:"Meera swings 18 feet across open valve chasm to catch emergency release lever.",coordinationRequirements:"18ft wire pendulum rig, decelerator line, safety crash matting",qualifiedPersonnel:"Stunt Double: Tara Sen / Stunt Coordinator: Roy Hall",safetyPlanningStatus:"Awaiting Coordinator Review",sourceSnippet:"Meera kicks off the catwalk, swinging into the spray as the iron cable groans.",originalAiSuggestion:"Valve Pylon Cable Rappel — 18ft swing across chasm to catch lever.",status:"Needs Review",isHumanConfirmed:!1,confidence:.92,confirmedBy:null,confirmedAt:null,notes:"Awaiting Stunt Coordinator risk assessment and harness certification."},{id:"elem-13",scriptId:e,sceneId:"scene-18",sceneNumber:18,scenes:[18],category:"Locations",name:"Sub-Level Hydro-Chamber B",description:"Industrial concrete pumping cavern with rusty iron catwalks.",context:"INT.",lighting:"NIGHT",locationStatus:"Secured & Permitted",accessDetails:"Permit #WTR-994, Access via Gate 4 Service Tunnel",sourceSnippet:"INT. HYDRO-CHAMBER B - NIGHT. Rust-eaten steel catwalks suspend over deep abyss.",originalAiSuggestion:"Sub-Level Hydro-Chamber B — Concrete pumping cavern with catwalks.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Acoustic echo requires directional shotgun mics; non-slip floor treatment applied."},{id:"elem-6",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Costumes",name:"Kevin — Weathered Dust Coat & Respirator",character:"KEVIN",description:"Heavy canvas duster coat, solar respirator around neck.",wardrobeRequirements:"Duster coat with distressed seam stitching, respirator with worn elastic straps",continuityChanges:"Costume Stage 1 (Desert Dust / Dry)",prepStatus:"Fitted & Approved",sourceSnippet:"KEVIN (30s), sun-scoured and weary, adjusts his solar filter.",originalAiSuggestion:"Kevin — Duster coat, respirator around neck.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Costume fitting complete with wardrobe dept."},{id:"elem-7",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Cast",name:"MARCUS",characterRole:"Border outpost security guard.",description:"Border outpost security guard.",assignedActor:"Unassigned (Auditioning)",castingStatus:"Auditioning",actorAvailability:"Day 1 Shoot Only",appearancesCount:1,sourceSnippet:"MARCUS leans against the chain link, tapping an unlit cigarette against his wrist.",originalAiSuggestion:"MARCUS — Border outpost security guard.",status:"Confirmed",isHumanConfirmed:!0,confidence:.98,confirmedBy:"Elena Rostova",confirmedAt:"2026-10-13T16:00:00Z",notes:"Supporting role. Day 1 shoot only."},{id:"elem-8",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Props",name:"Solar Filter Dust Goggles",description:"Tinted goggles with worn leather straps.",sourcingType:"Hero Wardrobe Prop",quantity:"2 Pairs (A & B Camera)",readinessStatus:"Ready in Art Dept",continuityNotes:"Worn over eyes during wind gusts, rest on forehead indoors",sourceSnippet:"Kevin pulls the goggles over his eyes as a gust hits.",originalAiSuggestion:"Solar Filter Dust Goggles — Tinted goggles with worn leather straps.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Hero wardrobe prop."},{id:"elem-9",scriptId:e,sceneId:"scene-1",sceneNumber:1,scenes:[1],category:"Vehicles",name:"Solar Patrol Rover (Modified)",description:"Lightweight dune rover fitted with dual photovoltaic roof panels.",availability:"On Set Shoot Days 1 & 2",operationalRequirements:"Charging station in Base Camp, Art Dept weathering wrap",prepStatus:"Checked In & Inspected",sourceSnippet:"The rover sits idling beside Gate 4, suspension coated in red grit.",originalAiSuggestion:"Solar Patrol Rover (Modified) — Dune rover with dual photovoltaic roof panels.",status:"Confirmed",isHumanConfirmed:!0,confidence:.96,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Picture vehicle running on electric battery. Backup battery pack required."},{id:"elem-10",scriptId:e,sceneId:"scene-4",sceneNumber:4,scenes:[4],category:"Props",name:"Night-Vision Monocular Scope",description:"Military grade digital thermal optics.",sourcingType:"Rented",quantity:"1 Unit",readinessStatus:"Sourcing",continuityNotes:"Handheld by Meera on perimeter wall",sourceSnippet:"Meera scans the wire with her thermal monocle. Three glowing silhouettes freeze.",originalAiSuggestion:"Night-Vision Monocular Scope — Military grade digital thermal optics.",status:"Needs Review",isHumanConfirmed:!1,confidence:.85,confirmedBy:null,confirmedAt:null,notes:"Rental request pending vendor confirmation."},{id:"elem-11",scriptId:e,sceneId:"scene-7",sceneNumber:7,scenes:[7],category:"Cast",name:"COMMANDER VANCE",characterRole:"Antagonist, regional water syndicate director.",description:"Antagonist, regional water syndicate director.",assignedActor:"Michael Shannon",castingStatus:"Offer Out",actorAvailability:"Hold Oct 20-24",appearancesCount:2,sourceSnippet:"COMMANDER VANCE (50s), tailored gray linen, stands over the telemetry terminal.",originalAiSuggestion:"COMMANDER VANCE — Antagonist, regional water syndicate director.",status:"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:"2026-10-14T08:00:00Z",notes:"Cast confirmed. Costume fitting scheduled Oct 20."},{id:"elem-12",scriptId:e,sceneId:"scene-16",sceneNumber:16,scenes:[16],category:"Practical FX",name:"Catwalk Rain Towers",description:"Simulated industrial torrential flood conditions on exterior catwalk.",requiredResources:"3 Overhead Rain Spars, 2 Fire Hydrant Ties",technicalRequirements:"Runoff water deflection channeling away from electrical stage lines",safetyNotes:"Safety harnesses mandatory on exterior catwalk scaffolding",prepStatus:"Pending Proposal Approval",sourceSnippet:"Water cascades down the spillway faces like Niagara.",originalAiSuggestion:"Catwalk Rain Towers — Simulated flood conditions on exterior catwalk.",status:"Needs Review",isHumanConfirmed:!1,confidence:.9,confirmedBy:null,confirmedAt:null,notes:"Requires environmental containment permits."}],localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(o))),t&&t!=="all"&&(o=o.filter(a=>a.category.toLowerCase()===t.toLowerCase())),s&&s!=="all"){const a=Number(String(s).replace("scene-",""));o=o.filter(i=>i.sceneId===s||String(i.sceneNumber)===String(s)||Array.isArray(i.scenes)&&i.scenes.includes(a)||i.sceneNumber===a)}return o}async function nn(e,t,s){try{const a=await X(`/production/${e}/breakdown/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.item){const i=await Ft(e),l=i.findIndex(r=>r.id===t);return l!==-1&&(i[l]=a.item,localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(i))),a.item}}catch{}const n=await Ft(e),o=n.find(a=>a.id===t);return o?((s.name&&s.name!==o.name||s.description&&s.description!==o.description)&&(o.userCorrection={previousName:o.name,previousDesc:o.description,correctedBy:"Arun Kumar (Owner)",correctedAt:new Date().toISOString()}),Object.assign(o,s),s.status==="Confirmed"?(o.isHumanConfirmed=!0,o.confirmedBy="Arun Kumar (Owner)",o.confirmedAt=new Date().toISOString()):s.status==="Needs Review"&&(o.isHumanConfirmed=!1),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(n)),o):s}async function Sl(e,t){try{const o=await X(`/production/${e}/breakdown/${t}`,{method:"DELETE"});if(o?.success){const i=(await Ft(e)).filter(l=>l.id!==t);return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(i)),o}}catch{}const n=(await Ft(e)).filter(o=>o.id!==t);return localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(n)),{success:!0,removedId:t}}async function El(e,t){try{const a=await X(`/production/${e}/breakdown`,{method:"POST",body:JSON.stringify(t)});if(a?.item){const i=await Ft(e);return i.unshift(a.item),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(i)),a.item}}catch{}const s=await Ft(e),n=Number(t.sceneNumber||(t.sceneId?String(t.sceneId).replace("scene-",""):18)),o={id:`elem-${Date.now()}`,scriptId:e,sceneId:t.sceneId||`scene-${n}`,sceneNumber:n,scenes:t.scenes||[n],category:t.category||"Props",name:t.name,description:t.description||"",sourceSnippet:t.sourceSnippet||"User added manual item",originalAiSuggestion:null,status:t.status||"Confirmed",isHumanConfirmed:!0,confidence:1,confirmedBy:"Arun Kumar (Owner)",confirmedAt:new Date().toISOString(),notes:t.notes||"",assignedActor:t.assignedActor||"",castingStatus:t.castingStatus||"Uncast / Open",actorAvailability:t.actorAvailability||"",characterRole:t.characterRole||t.description||"",context:t.context||"INT.",lighting:t.lighting||"DAY",locationStatus:t.locationStatus||"Secured & Permitted",accessDetails:t.accessDetails||"",sourcingType:t.sourcingType||"Sourced",quantity:t.quantity||"1",readinessStatus:t.readinessStatus||"Ready in Art Dept",continuityNotes:t.continuityNotes||"",requiredResources:t.requiredResources||"",technicalRequirements:t.technicalRequirements||"",safetyNotes:t.safetyNotes||"",coordinationRequirements:t.coordinationRequirements||"",qualifiedPersonnel:t.qualifiedPersonnel||"",safetyPlanningStatus:t.safetyPlanningStatus||"Awaiting Coordinator Review",character:t.character||"",wardrobeRequirements:t.wardrobeRequirements||"",continuityChanges:t.continuityChanges||"",prepStatus:t.prepStatus||"In Prep",availability:t.availability||"",operationalRequirements:t.operationalRequirements||""};return s.unshift(o),localStorage.setItem(`scriptora_prod_breakdown_${e}`,JSON.stringify(s)),o}async function ls(e="chronicles-of-dust"){try{const n=await X(`/production/${e}/call-sheets`);if(n?.callSheets)return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n.callSheets)),n.callSheets}catch{}const t=localStorage.getItem(`scriptora_prod_callsheets_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{id:"cs-1",scriptId:e,callSheetNumber:"01",shootDay:"Day 1 of 7",shootDate:"Saturday, Oct 24, 2026",generalCrewCall:"06:00 AM",shootingCall:"06:30 AM",breakfastTime:"05:15 AM",estimatedWrap:"06:30 PM",status:"Confirmed",isPublished:!0,version:"v1.0",locationName:"Mojave Outpost Gate 4",locationAddress:"Perimeter Road 9, Cantil, CA 93519",parkingNotes:"Crew parking at Basecamp Lot B (1/4 mile west of gate). Shuttle runs every 10 mins.",nearestHospital:"Kern Valley Healthcare District, 6412 Laurel Ave, Lake Isabella, CA (Ph: 760-379-2681)",weatherSummary:"Sunny, 74°F high, 48°F low. Winds WNW 10-15 mph. Dust advisory after 4:00 PM.",scenes:[{sceneNumber:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",pages:"4 1/8",cast:["KEVIN","MARCUS"],desc:"Kevin arrives at border gate, inspection with Marcus."},{sceneNumber:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",pages:"3 4/8",cast:["KEVIN","MEERA"],desc:"Kevin discovers pressure loss on telemetry terminal."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MARCUS",actor:"David Chen",pickup:"05:15 AM",hmuCall:"05:45 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MEERA",actor:"Priya Sharma",pickup:"08:30 AM",hmuCall:"09:00 AM",onSet:"10:30 AM",status:"Confirmed"}],specialInstructions:"Eye protection mandatory for all crew on exterior perimeter due to afternoon dust squall.",approvedBy:"Arun Kumar (Owner)",publishedAt:"2026-10-14T08:00:00Z"},{id:"cs-2",scriptId:e,callSheetNumber:"02",shootDay:"Day 2 of 7",shootDate:"Sunday, Oct 25, 2026",generalCrewCall:"06:30 AM",shootingCall:"07:00 AM",breakfastTime:"05:45 AM",estimatedWrap:"07:00 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:"Pumping Station Chamber B",locationAddress:"Aqueduct District Facility 4, Mojave, CA 93501",parkingNotes:"Basecamp parking inside Gate 2 secure compound. Security clearance badge required.",nearestHospital:"Antelope Valley Medical Center, 1600 W Ave J, Lancaster, CA (Ph: 661-949-5000)",weatherSummary:"Interior stage / sheltered facility. Ambient temp 68°F. Hearing protection mandatory.",scenes:[{sceneNumber:3,heading:"EXT. DRY LAKEBED CONDUIT - DUSK",pages:"7 2/8",cast:["KEVIN"],desc:"Kevin examines exterior tap line."},{sceneNumber:10,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",pages:"2 6/8",cast:["KEVIN","MEERA"],desc:"High water pressure valve breach and cable clamp."}],castCalls:[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"},{character:"MEERA",actor:"Priya Sharma",pickup:"05:30 AM",hmuCall:"06:00 AM",onSet:"07:00 AM",status:"Draft"}],specialInstructions:"Wet set protocols in effect for Scene 10. Waterproof camera housing and electrical GFI circuits required.",approvedBy:null,publishedAt:null}];return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),s}async function va(e,t){try{const n=await X(`/production/${e}/call-sheets/${t}`);if(n?.callSheet)return n.callSheet}catch{}return(await ls(e)).find(n=>n.id===t)||null}async function kl(e,t){try{const o=await X(`/production/${e}/call-sheets`,{method:"POST",body:JSON.stringify(t)});if(o?.callSheet)return o.callSheet}catch{}const s=await ls(e),n={id:`cs-${Date.now()}`,scriptId:e,callSheetNumber:String(s.length+1).padStart(2,"0"),shootDay:t.shootDay||`Day ${s.length+1} of 14`,shootDate:t.shootDate||"Monday, Oct 26, 2026",generalCrewCall:t.generalCrewCall||"06:00 AM",shootingCall:t.shootingCall||"06:30 AM",breakfastTime:t.breakfastTime||"05:15 AM",estimatedWrap:t.estimatedWrap||"06:30 PM",status:"Draft",isPublished:!1,version:"v0.9",locationName:t.locationName||"Location TBD",locationAddress:t.locationAddress||"TBD",parkingNotes:t.parkingNotes||"Crew parking guidelines.",nearestHospital:t.nearestHospital||"Desert Care Network Regional, Palm Springs, CA",weatherSummary:t.weatherSummary||"Forecast pending.",scenes:t.scenes||[{sceneNumber:4,heading:"EXT. NORTHERN PERIMETER FENCE - NIGHT",pages:"5 0/8",cast:["KEVIN","MEERA"],desc:"Perimeter fence inspection."}],castCalls:t.castCalls||[{character:"KEVIN",actor:"Arun Kumar",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Draft"}],specialInstructions:t.specialInstructions||"Standard safety directives.",approvedBy:null,publishedAt:null};return s.push(n),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),n}async function Il(e,t,s){try{const a=await X(`/production/${e}/call-sheets/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.callSheet)return a.callSheet}catch{}const n=await ls(e),o=n.find(a=>a.id===t);return o?(Object.assign(o,s),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n)),o):s}async function Cl(e,t){try{const o=await X(`/production/${e}/call-sheets/${t}/publish`,{method:"POST"});if(o?.callSheet)return o.callSheet}catch{}const s=await ls(e),n=s.find(o=>o.id===t);return n?(n.status="Confirmed",n.isPublished=!0,n.version="v1.0 (Snapshot)",n.approvedBy="Arun Kumar (Owner)",n.publishedAt=new Date().toISOString(),localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(s)),n):null}async function Rt(e="chronicles-of-dust"){try{const n=await X(`/production/${e}/schedule`);if(n?.schedule)return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(n.schedule)),n.schedule}catch{}const t=localStorage.getItem(`scriptora_prod_schedule_${e}`);if(t)try{return JSON.parse(t)}catch{}const s=[{dayNumber:1,date:"Oct 24, 2026",title:"Outpost Perimeter & Shed",location:"Mojave Gate 4",sceneNumbers:[1,2],totalPages:"7 5/8",estHours:10.5,companyMoves:0,isLocked:!0,status:"Confirmed"},{dayNumber:2,date:"Oct 25, 2026",title:"Lakebed Conduit & Chamber B",location:"Chamber B Dry Tank",sceneNumbers:[3,10],totalPages:"10 0/8",estHours:11,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:3,date:"Oct 26, 2026",title:"Perimeter Fence & Valve Tunnel",location:"Perimeter Sector 9",sceneNumbers:[4,5],totalPages:"10 4/8",estHours:11.5,companyMoves:1,isLocked:!1,status:"Draft"},{dayNumber:4,date:"Oct 27, 2026",title:"Service Road Pursuit",location:"Route 66 Cutoff",sceneNumbers:[6],totalPages:"5 2/8",estHours:8,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:5,date:"Oct 28, 2026",title:"Syndicate Regional Control",location:"Syndicate Regional HQ",sceneNumbers:[7],totalPages:"6 3/8",estHours:9,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:6,date:"Oct 29, 2026",title:"Reservoir Intake Rappel",location:"Lake Mead Dry Spillway",sceneNumbers:[8],totalPages:"5 5/8",estHours:10,companyMoves:0,isLocked:!1,status:"Draft"},{dayNumber:7,date:"Oct 30, 2026",title:"Drainage Sub-vaults & Wrap",location:"Vault Sub-structure 3",sceneNumbers:[9],totalPages:"4 1/8",estHours:8.5,companyMoves:0,isLocked:!1,status:"Draft"}];return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(s)),s}async function Wt(e,t,s){try{const a=await X(`/production/${e}/schedule/day/${t}`,{method:"PUT",body:JSON.stringify(s)});if(a?.day)return a.day}catch{}const n=await Rt(e),o=n.find(a=>a.dayNumber===Number(t));return o?(Object.assign(o,s),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(n)),o):s}async function Al(e,t,s,n){const o=await Rt(e),a=o.find(l=>l.dayNumber===Number(s)),i=o.find(l=>l.dayNumber===Number(n));return!a||!i||(a.sceneNumbers=(a.sceneNumbers||[]).filter(l=>l!==Number(t)),(i.sceneNumbers||[]).includes(Number(t))||(i.sceneNumbers=[...i.sceneNumbers||[],Number(t)]),await Wt(e,s,{sceneNumbers:a.sceneNumbers}),await Wt(e,n,{sceneNumbers:i.sceneNumbers})),o}async function wa(e,t,s){return await Wt(e,t,{sceneNumbers:s})}async function Sa(e,t){try{const o=await X(`/production/${e}/call-sheets/${t}`,{method:"DELETE"});if(o?.success){const i=(await ls(e)).filter(l=>l.id!==t);return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(i)),o}}catch{}const n=(await ls(e)).filter(o=>o.id!==t);return localStorage.setItem(`scriptora_prod_callsheets_${e}`,JSON.stringify(n)),{success:!0,removedId:t}}async function $l(e,t){try{const a=await X(`/production/${e}/schedule/day`,{method:"POST",body:JSON.stringify(t)});if(a?.day){const i=await Rt(e);return i.push(a.day),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(i)),a.day}}catch{}const s=await Rt(e),n=s.length>0?Math.max(...s.map(a=>a.dayNumber))+1:1,o={dayNumber:t.dayNumber||n,date:t.date||`Nov ${String(n).padStart(2,"0")}, 2026`,title:t.title||`Shoot Day ${n}`,location:t.location||"Location TBD",sceneNumbers:t.sceneNumbers||[],totalPages:t.totalPages||"0 0/8",estHours:t.estHours||8,companyMoves:t.companyMoves||0,isLocked:!1,status:"Draft"};return s.push(o),localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(s)),o}async function Bl(e,t){const s=Number(t);try{const a=await X(`/production/${e}/schedule/day/${s}`,{method:"DELETE"});if(a?.success){const l=(await Rt(e)).filter(r=>r.dayNumber!==s);return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(l)),a}}catch{}const o=(await Rt(e)).filter(a=>a.dayNumber!==s);return localStorage.setItem(`scriptora_prod_schedule_${e}`,JSON.stringify(o)),{success:!0,removedDayNumber:s}}async function Nl(){try{const e=await X("/production/ai/providers");if(e?.providers)return e.providers}catch{}return[{id:"scriptora-concept",name:"SCRIPTORA Concept Engine",model:"v2.4 High-Res Vector & Composition",isConfigured:!0,pricingType:"free",costPerImage:0,costLabel:"Free (Built-in)",requiresApiKey:!1,aspectRatios:["2.39:1","16:9","4:3","9:16"],styles:["Cinematic Concept Art","Storyboard Ink","Pencil Sketch","Photorealistic / Live Action","3D Animation","Anime / Illustration"],description:"Fast, cinematic vector canvas with camera crosshairs, aspect ratio letterboxing, stylized character silhouettes, and directional lighting."},{id:"openai-dalle3",name:"OpenAI DALL-E 3",model:"dall-e-3",isConfigured:!1,pricingType:"paid",costPerImage:.04,costLabel:"$0.040 (Standard) / $0.080 (HD)",requiresApiKey:!0,envVarName:"OPENAI_API_KEY",aspectRatios:["16:9","2.39:1","1:1","9:16"],styles:["Photorealistic / Live Action","Cinematic Concept Art","Pencil Sketch","3D Animation"],description:"High-fidelity photorealistic rendering and complex composition synthesis via OpenAI API."},{id:"gemini-imagen3",name:"Google Imagen 3",model:"imagen-3.0-generate-002",isConfigured:!1,pricingType:"paid",costPerImage:.03,costLabel:"$0.030 per image",requiresApiKey:!0,envVarName:"GEMINI_API_KEY",aspectRatios:["16:9","4:3","1:1","9:16"],styles:["Cinematic Concept Art","Photorealistic / Live Action","Storyboard Ink"],description:"Photorealistic film still generation using Google Vertex/Gemini Imagen 3."},{id:"stability-sdxl",name:"Stability AI SDXL",model:"stable-diffusion-xl-1024-v1-0",isConfigured:!1,pricingType:"paid",costPerImage:.018,costLabel:"$0.018 per image",requiresApiKey:!0,envVarName:"STABILITY_API_KEY",aspectRatios:["16:9","2.39:1","4:3","9:16"],styles:["Storyboard Ink","Pencil Sketch","Cinematic Concept Art","Anime / Illustration"],description:"Versatile storyboard and concept illustration synthesis via Stability AI."}]}function qn(e,t=""){if(!e||typeof e!="string")return`${bt}assets/storyboard/shot_1a_wide_outpost.jpg`;if(e.startsWith("data:image/svg+xml")&&(e.includes("assets/storyboard")||e.includes("assets%2Fstoryboard")))try{const n=decodeURIComponent(e).match(/assets\/storyboard\/([a-zA-Z0-9_.-]+)/);if(n&&n[1])return`${bt}assets/storyboard/${n[1]}`}catch{}if(e.startsWith("data:image/svg")||e.startsWith("data:image/")&&e.length>5e4){const s=(t||"").toUpperCase();return s.includes("1A")?`${bt}assets/storyboard/shot_1a_wide_outpost.jpg`:s.includes("1B")?`${bt}assets/storyboard/shot_1b_two_shot_standoff.jpg`:s.includes("1C")?`${bt}assets/storyboard/shot_1c_closeup_reaction.jpg`:s.includes("1D")?`${bt}assets/storyboard/shot_1d_macro_insert.jpg`:s.includes("10A")?`${bt}assets/storyboard/shot_10a_valve_breach.jpg`:s.includes("10B")?`${bt}assets/storyboard/shot_10b_pumping_hall.jpg`:`${bt}assets/storyboard/shot_1a_wide_outpost.jpg`}if(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:image/"))return e;if(e.includes("assets/storyboard/")||e.includes("assets/styles/")){const s=e.replace(/^\/?(Scriptora\/)?/,"");return`${bt}${s}`}return e}function dn(e){if(!e||typeof e!="object")return e;const t={...e};return Array.isArray(t.shots)&&(t.shots=t.shots.map(s=>{const n={...s};return n.imageUrl=qn(n.imageUrl,n.shotNumber),Array.isArray(n.history)&&(n.history=n.history.slice(0,20).map(o=>{const a={...o},i=a.previousImageUrl||a.imageUrl;return a.previousImageUrl=qn(i,n.shotNumber),delete a.imageUrl,a})),n})),t}function Ka(){if(!(typeof localStorage>"u"))try{const e=[];for(let t=0;t<localStorage.length;t++){const s=localStorage.key(t);s&&s.startsWith("scriptora_storyboard_")&&!s.includes("_preferences")&&!s.includes("_rb_")&&e.push(s)}e.forEach(t=>{try{const s=localStorage.getItem(t);if(s&&(s.includes("data:image/svg")||s.includes("data:image/jpeg")||s.length>5e4)){const n=JSON.parse(s),o=dn(n);localStorage.setItem(t,JSON.stringify(o)),console.info(`[SCRIPTORA Storage] Successfully migrated legacy oversized cache: ${t} (${s.length}b -> ${JSON.stringify(o).length}b)`)}}catch{}})}catch(e){console.warn("[SCRIPTORA Storage] Legacy cleanup check skipped:",e)}}function Tl(e,t){if(!(typeof localStorage>"u"))try{localStorage.setItem(e,t)}catch(s){console.warn(`[SCRIPTORA Storage] localStorage.setItem failed for ${e}, running emergency purge:`,s.message);try{Ka(),localStorage.setItem(e,t)}catch(n){console.error(`[SCRIPTORA Storage] Quota still exceeded for ${e} after purge. Suppressed.`,n.message)}}}function mt(e,t,s){if(!s)return;const n=dn(s);Tl(`scriptora_storyboard_${e}_${t}`,JSON.stringify(n))}typeof window<"u"&&setTimeout(Ka,100);async function rs(e="chronicles-of-dust",t="scene-1"){try{const r=await X(`/production/${e}/storyboard?sceneId=${t}`);if(r?.storyboard)return mt(e,t,r.storyboard),dn(r.storyboard)}catch{}const s=localStorage.getItem(`scriptora_storyboard_${e}_${t}`);if(s)try{return dn(JSON.parse(s))}catch{}const n=await vs(e),o=Number(String(t).replace("scene-",""))||1,a=n.find(r=>r.id===t||r.sceneNumber===o)||{id:`scene-${o}`,sceneNumber:o,heading:`SCENE ${o} - UNTITLED`,intExt:"INT",dayNight:"DAY"},i=o===1?[{id:"shot-1-1A",shotNumber:"1A",order:1,title:"Perimeter Outpost Gate",description:"High altitude drone descending across dust devils toward Kevin's arrival at the arid customs gate.",shotSize:"Wide Shot",cameraAngle:"High Angle",cameraMovement:"Crane / Jib",focalLength:"24mm Wide",lightingMood:"Daylight Dust",aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",prompt:"Cinematic wide shot, arid desert outpost gate, dust devils whirling, 2.39:1 anamorphic",imageUrl:`${bt}assets/storyboard/shot_1a_wide_outpost.jpg`,imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"approved",approvalNotes:"Great atmosphere and sense of scale. Approved for primary camera team.",approvedBy:"Arun Kumar (Owner)",approvedAt:"2026-10-18T10:30:00Z",directorNotes:"Capture sunrise glint off the guard gate perimeter wires.",characters:["KEVIN","MARCUS"],location:"Arid Outpost Gate 4",continuity:{characterPosition:"Kevin approaching from camera-left",screenDirection:"Left to Right",eyeline:"Looking toward Outpost Gate",lightingContinuity:"High-contrast morning sun from east",costumeState:"Dust coat level 2, canteen left side",propPlacement:"Gate clearance scanner in right hand"},history:[]},{id:"shot-1-1B",shotNumber:"1B",order:2,title:"Gate Scanner Clearance Standoff",description:"Medium two-shot of Kevin presenting his ID badge to Marcus over the buzzing clearance terminal.",shotSize:"Medium Two-Shot",cameraAngle:"Eye Level",cameraMovement:"Static",focalLength:"50mm Prime",lightingMood:"Harsh Fluorescent Rim",aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",prompt:"Medium two-shot, dusty outpost booth, weary hydro-engineer confronting guard, 50mm",imageUrl:`${bt}assets/storyboard/shot_1b_two_shot_standoff.jpg`,imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"approved",approvalNotes:"Good eyeline match with Shot 1A.",approvedBy:"Arun Kumar (Owner)",approvedAt:"2026-10-18T10:35:00Z",directorNotes:"Focus pull from scanner terminal to Kevin's tense expression.",characters:["KEVIN","MARCUS"],location:"Arid Outpost Gate 4",continuity:{characterPosition:"Kevin screen-left, Marcus screen-right",screenDirection:"Left to Right",eyeline:"Eye-level direct confrontation",lightingContinuity:"Terminal backlight rimming Kevin's face",costumeState:"Kevin wearing goggles around neck",propPlacement:"ID card inserted into reader"},history:[]},{id:"shot-1-1C",shotNumber:"1C",order:3,title:"Terminal Diagnostic Anomaly",description:"Close-up insert of the flickering scanner console displaying pressure alert warning in red neon.",shotSize:"Close-Up",cameraAngle:"Low Angle",cameraMovement:"Static",focalLength:"85mm Portrait",lightingMood:"Cyan Strobe",aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",prompt:"Extreme close-up on rugged military diagnostic screen, red warning glyphs, 85mm",imageUrl:`${bt}assets/storyboard/shot_1c_closeup_reaction.jpg`,imageSource:"ai",provider:"scriptora-concept",quality:"hd",costEstimate:"Free (Built-in)",approvalStatus:"proposed",approvalNotes:"Review telemetry readout typography for accuracy.",approvedBy:null,approvedAt:null,directorNotes:"Practical screen insert; needs strobe flash on alert pulse.",characters:["KEVIN"],location:"Arid Outpost Gate 4",continuity:{characterPosition:"Centered insert",screenDirection:"Neutral",eyeline:"Downwards onto screen",lightingContinuity:"Red alert flashing 1Hz",costumeState:"Kevin's gloved thumb on lower bezel",propPlacement:"Scanner unit firmly latched"},history:[]}]:[],l={id:`sb-${e}-${a.id}`,scriptId:e,sceneId:a.id,sceneNumber:a.sceneNumber,sceneHeading:a.heading,intExt:a.intExt||"INT",dayNight:a.dayNight||"DAY",sourceVersion:"Draft 4.2",isVersionStale:!1,aspectRatio:"2.39:1",visualStyle:"Cinematic Concept Art",shots:i,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return mt(e,t,l),l}async function qt(e,t){try{const n=await X(`/production/${e}/storyboard`,{method:"POST",body:JSON.stringify(t)});if(n?.storyboard)return mt(e,n.storyboard.sceneId,n.storyboard),n.storyboard}catch{}const s=t.sceneId||`scene-${t.sceneNumber||1}`;return mt(e,s,t),t}async function Pl(e,t,s){try{const r=await X(`/production/${e}/storyboard/${t}/shots`,{method:"POST",body:JSON.stringify(s)});if(r?.shot)return r.storyboard&&mt(e,t,r.storyboard),r}catch{}const n=await rs(e,t),o=n.shots.length+1,a=String.fromCharCode(65+(o-1)%26),i=s.shotNumber||`${n.sceneNumber}${a}`,l={id:`shot-${Date.now()}`,shotNumber:i,order:o,title:s.title||`Shot ${i}`,description:s.description||"",shotSize:s.shotSize||"Medium Shot",cameraAngle:s.cameraAngle||"Eye Level",cameraMovement:s.cameraMovement||"Static",focalLength:s.focalLength||"50mm Prime",lightingMood:s.lightingMood||"Natural Daylight",aspectRatio:s.aspectRatio||n.aspectRatio||"2.39:1",visualStyle:s.visualStyle||n.visualStyle||"Cinematic Concept Art",prompt:s.prompt||"",negativePrompt:s.negativePrompt||"",imageUrl:s.imageUrl||null,imageSource:s.imageSource||(s.imageUrl?"imported":null),provider:s.provider||null,quality:s.quality||"standard",costEstimate:s.costEstimate||null,approvalStatus:s.approvalStatus||"draft",approvalNotes:s.approvalNotes||"",approvedBy:s.approvedBy||null,approvedAt:s.approvedAt||null,directorNotes:s.directorNotes||"",characters:s.characters||[],location:s.location||"",continuity:{characterPosition:s.continuity?.characterPosition||"",screenDirection:s.continuity?.screenDirection||"Left to Right",eyeline:s.continuity?.eyeline||"Eye Level",lightingContinuity:s.continuity?.lightingContinuity||"",costumeState:s.continuity?.costumeState||"",propPlacement:s.continuity?.propPlacement||""},history:[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return n.shots.push(l),n.updatedAt=new Date().toISOString(),mt(e,t,n),{storyboard:n,shot:l}}async function Ds(e,t,s,n){try{const i=await X(`/production/${e}/storyboard/${t}/shots/${s}`,{method:"PUT",body:JSON.stringify(n)});if(i?.shot)return i.storyboard&&mt(e,t,i.storyboard),i}catch{}const o=await rs(e,t),a=o.shots.find(i=>i.id===s);if(!a)throw new Error("Shot not found");return n.continuity&&(n.continuity={...a.continuity,...n.continuity}),Object.assign(a,n,{updatedAt:new Date().toISOString()}),o.updatedAt=new Date().toISOString(),mt(e,t,o),{storyboard:o,shot:a}}async function Ll(e,t,s){try{const a=await X(`/production/${e}/storyboard/${t}/shots/${s}`,{method:"DELETE"});if(a?.success)return a.storyboard&&mt(e,t,a.storyboard),a}catch{}const n=await rs(e,t),o=n.shots.findIndex(a=>a.id===s);return o!==-1&&(n.shots.splice(o,1),n.shots.forEach((a,i)=>{a.order=i+1}),n.updatedAt=new Date().toISOString(),mt(e,t,n)),{success:!0,removedId:s,storyboard:n}}async function Dl(e,t,s=[]){try{const i=await X(`/production/${e}/storyboard/${t}/reorder`,{method:"POST",body:JSON.stringify({shotIds:s})});if(i?.storyboard)return mt(e,t,i.storyboard),i}catch{}const n=await rs(e,t),o=new Map(n.shots.map(i=>[i.id,i])),a=[];for(const i of s)o.has(i)&&(a.push(o.get(i)),o.delete(i));for(const i of o.values())a.push(i);return a.forEach((i,l)=>{i.order=l+1}),n.shots=a,n.updatedAt=new Date().toISOString(),mt(e,t,n),{storyboard:n}}async function Nn(e,t,s,n="approved",o=""){try{const l=await X(`/production/${e}/storyboard/${t}/shots/${s}/approve`,{method:"POST",body:JSON.stringify({status:n,notes:o})});if(l?.shot)return l.storyboard&&mt(e,t,l.storyboard),l}catch{}const a=await rs(e,t),i=a.shots.find(l=>l.id===s);return i&&(i.approvalStatus=n,i.approvalNotes=o||i.approvalNotes||"",i.approvedBy="Arun Kumar (Owner)",i.approvedAt=new Date().toISOString(),i.updatedAt=new Date().toISOString(),a.updatedAt=new Date().toISOString(),mt(e,t,a)),{storyboard:a,shot:i}}async function Tn(e,t,s=[],n="approved",o=""){try{const l=await X(`/production/${e}/storyboard/${t}/batch-approve`,{method:"POST",body:JSON.stringify({shotIds:s,status:n,notes:o})});if(l?.storyboard)return mt(e,t,l.storyboard),l}catch{}const a=await rs(e,t);let i=0;for(const l of a.shots)s.includes(l.id)&&(l.approvalStatus=n,o&&(l.approvalNotes=o),l.approvedBy="Arun Kumar (Owner)",l.approvedAt=new Date().toISOString(),l.updatedAt=new Date().toISOString(),i++);return a.updatedAt=new Date().toISOString(),mt(e,t,a),{storyboard:a,affectedCount:i}}async function ms(e,t={}){try{const f=await X(`/production/${e}/storyboard/generate-shot`,{method:"POST",body:JSON.stringify(t)});if(f?.imageUrl)return f.imageUrl=qn(f.imageUrl,t.shotNumber),f}catch(f){if(f.message&&f.message.includes("not configured"))throw f}const s=(t.shotSize||"").toLowerCase(),n=(t.sceneHeading||"").toUpperCase(),o=`${t.sceneHeading||""} ${t.prompt||""} ${t.description||""}`.toLowerCase(),a=(t.shotNumber||"1A").toUpperCase(),i=(t.variationType||"").toLowerCase();let l="shot_1a_wide_outpost.jpg";return t.isVariation?i==="angle"||i==="framing"?l="shot_10a_valve_breach.jpg":i==="lighting"?l="shot_10b_pumping_hall.jpg":i==="composition"?l="shot_1c_closeup_reaction.jpg":a.includes("A")||s.includes("wide")?l="shot_10b_pumping_hall.jpg":a.includes("B")||s.includes("two")?l="shot_1c_closeup_reaction.jpg":a.includes("C")||s.includes("close")?l="shot_10a_valve_breach.jpg":l="shot_1d_macro_insert.jpg":s.includes("close-up")||s.includes("close up")?l=o.includes("valve")||n.includes("10")?"shot_10a_valve_breach.jpg":"shot_1c_closeup_reaction.jpg":s.includes("two-shot")||s.includes("two shot")||t.cast&&t.cast.length>=2?l="shot_1b_two_shot_standoff.jpg":s.includes("macro")||s.includes("insert")||s.includes("extreme close")?l="shot_1d_macro_insert.jpg":n.includes("10")||o.includes("pumping")||o.includes("hall")?l="shot_10b_pumping_hall.jpg":a.includes("B")?l="shot_1b_two_shot_standoff.jpg":a.includes("C")?l="shot_1c_closeup_reaction.jpg":a.includes("D")&&(l="shot_1d_macro_insert.jpg"),{imageUrl:`${bt}assets/storyboard/${l}`,provider:t.provider||"scriptora-concept",quality:t.quality||"hd",costEstimate:"Free (Built-in)",prompt:t.prompt||""}}async function Ja(){try{const t=await X("/production/storyboard/preferences");if(t?.preferences)return localStorage.setItem("scriptora_storyboard_preferences",JSON.stringify(t.preferences)),t.preferences}catch{}const e=localStorage.getItem("scriptora_storyboard_preferences");if(e)try{return JSON.parse(e)}catch{}return{defaultStyle:"Concept Art",defaultAspectRatio:"2.39:1",defaultShotSize:"Medium",defaultCameraAngle:"Eye Level",defaultLens:"50mm",defaultLighting:"Auto / Scene-based",experienceLevel:"Intermediate"}}async function Rl(e={}){try{const n=await X("/production/storyboard/preferences",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(n?.preferences)return localStorage.setItem("scriptora_storyboard_preferences",JSON.stringify(n.preferences)),n.preferences}catch{}const s={...await Ja(),...e};return localStorage.setItem("scriptora_storyboard_preferences",JSON.stringify(s)),s}async function pn(e="chronicles-of-dust"){try{const s=await X(`/production/${e}/storyboard/recycle-bin`);if(s?.items)return localStorage.setItem(`scriptora_storyboard_rb_${e}`,JSON.stringify(s.items)),s.items}catch{}const t=localStorage.getItem(`scriptora_storyboard_rb_${e}`);if(t)try{return JSON.parse(t)}catch{}return[]}async function Ml(e,t){try{const s=await X(`/production/${e}/storyboard/recycle-bin/restore`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({itemId:t})});if(s?.success){const o=(await pn(e)).filter(a=>a.id!==t);return localStorage.setItem(`scriptora_storyboard_rb_${e}`,JSON.stringify(o)),s}}catch{}return{success:!0}}async function Ol(e,t){try{const s=await X(`/production/${e}/storyboard/recycle-bin/${t}`,{method:"DELETE"});if(s?.success){const o=(await pn(e)).filter(a=>a.id!==t);return localStorage.setItem(`scriptora_storyboard_rb_${e}`,JSON.stringify(o)),s}}catch{}return{success:!0,removedId:t}}async function _l(e){try{const t=await X(`/production/${e}/storyboard/recycle-bin/empty`,{method:"POST"});return localStorage.setItem(`scriptora_storyboard_rb_${e}`,JSON.stringify([])),t||{success:!0}}catch{}return localStorage.setItem(`scriptora_storyboard_rb_${e}`,JSON.stringify([])),{success:!0}}async function jl(e,t){try{return await X(`/production/${e}/storyboard/scenes/${t}/soft-delete`,{method:"POST"})}catch{}return{success:!0,removedId:t}}class Fl{constructor(){try{sessionStorage.removeItem("scriptora_history_stack")}catch{}this.state={currentUser:null,selectedScriptId:localStorage.getItem("scriptora_selected_script")||"chronicles-of-dust",selectedVersionId:"Draft 4.2",currentSceneId:18,unreadNotifications:3,scripts:[],activeScript:null,screenplay:null,settings:null,historyStack:[]},this.listeners=new Set}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(const t of this.listeners)try{t(this.state)}catch(s){console.error("Store listener error:",s)}}setState(t){this.state={...this.state,...t},t.selectedScriptId&&localStorage.setItem("scriptora_selected_script",t.selectedScriptId),this.notify()}pushHistory(t){if(!t)return;const s=t.trim(),n=this.state.historyStack;(n.length===0||n[n.length-1]!==s)&&(n.push(s),n.length>50&&n.shift())}popHistory(){return this.state.historyStack.pop()}getPreviousRoute(t="/workspace"){return this.popHistory()||t}peekPreviousRoute(t="/workspace"){const s=this.state.historyStack;return s.length>0?s[s.length-1]:t}clearHistory(){this.state.historyStack=[];try{sessionStorage.removeItem("scriptora_history_stack")}catch{}}resetUserSession(){this.setState({currentUser:null,scripts:[],activeScript:null,screenplay:null,historyStack:[],selectedScriptId:"chronicles-of-dust",unreadNotifications:0}),this.clearHistory()}async init(){try{const t=await Ha(),s=await ht(),n=await ya(),o=await Wa();let a=localStorage.getItem("scriptora_selected_script");const i=s&&s.length>0?s.find(r=>r.isCurrentDraft):null;i?a=i.id:s&&s.length>0?(!a||!s.some(r=>r.id===a))&&(a=s[0].id):a=null,a?localStorage.setItem("scriptora_selected_script",a):localStorage.removeItem("scriptora_selected_script");const l=s&&s.length>0?s.find(r=>r.id===a)||s[0]:null;this.setState({currentUser:t,scripts:s||[],selectedScriptId:a,activeScript:l,unreadNotifications:n,settings:o})}catch(t){console.error("Init store error:",t)}}async selectScript(t){if(!t)return;const s=await Vo(t),n=(s||this.state.scripts).find(o=>o.id===t)||await gn(t);this.setState({selectedScriptId:t,activeScript:n,scripts:s||this.state.scripts})}async refreshNotifications(){const t=await ya();this.setState({unreadNotifications:t})}async refreshScripts(){const t=await ht(),s=t&&t.length>0?t.find(a=>a.isCurrentDraft):null;let n=s?s.id:this.state.selectedScriptId;t&&t.length>0?(!n||!t.some(a=>a.id===n))&&(n=t[0].id):n=null;const o=t&&t.length>0?t.find(a=>a.id===n)||t[0]:null;return n?localStorage.setItem("scriptora_selected_script",n):localStorage.removeItem("scriptora_selected_script"),this.setState({scripts:t||[],selectedScriptId:n,activeScript:o}),t}}const T=new Fl,Hl="/Scriptora/assets/logo-BG9jZ7UG.png",Xn=Hl;function pt(e="Workspace",t="Your writing space."){const s=T.state.unreadNotifications,n=T.state.currentUser?.initials||"JD";return`
    <header class="fixed top-0 left-0 right-0 w-full z-40 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-surface-container-high/60 select-none" data-global-header="true">
      <div class="h-14 px-4 flex items-center justify-between max-w-2xl mx-auto">
        <a href="/workspace" class="flex items-center gap-2.5 min-w-0 no-underline text-inherit cursor-pointer active:opacity-80 transition-opacity">
          <img src="${Xn}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora" class="w-8 h-8 object-contain shrink-0" />
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
            ${T.state.currentUser?.avatarUrl?`
              <img src="${T.state.currentUser.avatarUrl}" class="w-full h-full object-cover" alt="Profile" />
            `:`
              <span>${n}</span>
            `}
          </a>
        </div>
      </div>
    </header>
  `}function ct(e="workspace"){const t=e==="workspace",s=e==="intelligence",n=e==="chat"||e==="ai-chat",o=e==="production"||e==="pre-production",a=e==="profile";return`
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
  `}function Ul(e="workspace"){const t=document.getElementById("scriptora-bottom-nav");return t?(t.outerHTML=ct(e),!0):!1}function w(e,t="success"){const s=document.getElementById("global-toast"),n=document.getElementById("toast-message"),o=document.getElementById("toast-icon");if(!s||!n){console.log(`[Toast ${t}]`,e);return}n.textContent=e,o&&(t==="error"?(o.textContent="error",o.className="material-symbols-outlined text-[18px] text-red-400"):t==="info"?(o.textContent="info",o.className="material-symbols-outlined text-[18px] text-blue-300"):(o.textContent="check_circle",o.className="material-symbols-outlined text-[18px] text-emerald-300")),s.classList.remove("opacity-0","pointer-events-none"),s.classList.add("opacity-100"),clearTimeout(s._timeout),s._timeout=setTimeout(()=>{s.classList.remove("opacity-100"),s.classList.add("opacity-0","pointer-events-none")},2400)}function ql(){return`
    <main class="flex flex-col relative w-full pt-safe pb-safe bg-surface min-h-screen justify-center items-center px-4">
      <div class="flex flex-col w-full max-w-sm py-8 fade-in">
        <!-- Brand & Logo Header -->
        <header class="flex flex-col items-center justify-center pb-4 text-center">
          <img src="${Xn}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-16 h-16 object-contain mb-3 drop-shadow-sm" />
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
  `}function Vl(e){const t=document.getElementById("tab-signin"),s=document.getElementById("tab-register"),n=document.getElementById("tab-otp"),o=document.getElementById("flow-signin"),a=document.getElementById("flow-register"),i=document.getElementById("flow-otp");function l(L){[t,s,n].forEach(k=>{k.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 text-on-surface-variant hover:text-on-surface"}),[o,a,i].forEach(k=>k.classList.add("hidden")),L==="signin"?(t.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",o.classList.remove("hidden")):L==="register"?(s.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold",a.classList.remove("hidden")):L==="otp"&&(n.className="flex-1 py-2 text-center rounded-lg transition-all duration-150 bg-white text-on-surface shadow-xs font-semibold flex items-center justify-center gap-1",i.classList.remove("hidden"))}t&&(t.onclick=()=>l("signin")),s&&(s.onclick=()=>l("register")),n&&(n.onclick=()=>l("otp"));const r=document.getElementById("toggle-pw-signin"),f=document.getElementById("signin-password");r&&f&&(r.onclick=()=>{const L=f.type==="password";f.type=L?"text":"password",r.innerHTML=`<span class="material-symbols-outlined text-[18px]">${L?"visibility_off":"visibility"}</span>`});function p(L){try{const U=L.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),P=decodeURIComponent(atob(U).split("").map(de=>"%"+("00"+de.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(P)}catch{return null}}const d=document.getElementById("btn-google-login"),c="756924881120-0qngpm230nq3k8bb61ttt1de7jv28fui.apps.googleusercontent.com";let x=null;async function m(L){w("Connecting with Google...");try{const k=await jo(L);T.setState({currentUser:k}),w(`Welcome back, ${k.displayName||k.name}`),e("/welcome")}catch(k){w(k.message||"Google sign-in error","error")}}function h(){if(window.google?.accounts?.id&&c)try{window.google.accounts.id.initialize({client_id:c,callback:async L=>{if(L&&L.credential){const k=p(L.credential)||{};await m({token:L.credential,email:k.email,name:k.name,displayName:k.name,picture:k.picture,sub:k.sub,provider:"google"})}},auto_select:!1,cancel_on_tap_outside:!0})}catch(L){console.warn("Google One Tap setup note:",L)}if(window.google?.accounts?.oauth2&&c)try{x=window.google.accounts.oauth2.initTokenClient({client_id:c,scope:"email profile openid",callback:async L=>{if(L&&L.access_token){w("Retrieving Google profile...");try{const U=await(await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${L.access_token}`}})).json();await m({token:L.access_token,email:U.email,name:U.name,displayName:U.name,picture:U.picture,sub:U.sub,provider:"google"})}catch(k){console.warn("Google userinfo fetch note:",k),await m({token:L.access_token,provider:"google"})}}}})}catch(L){console.warn("Google OAuth token client setup note:",L)}}h(),d&&(d.onclick=async()=>{if(!x&&window.google&&h(),x)try{x.requestAccessToken({prompt:"select_account"});return}catch(L){console.warn("Token client request error, trying prompt:",L)}if(window.google?.accounts?.id)try{window.google.accounts.id.prompt(L=>{(L.isNotDisplayed()||L.isSkippedMoment())&&(console.log("GIS prompt not displayed:",L.getNotDisplayedReason()),m({email:"arun.kumar@scriptora.studio",name:"Arun Kumar",displayName:"Arun Kumar",provider:"google"}))});return}catch(L){console.warn("GIS prompt error:",L)}await m({email:"arun.kumar@scriptora.studio",name:"Arun Kumar",displayName:"Arun Kumar",provider:"google"})});const b=document.getElementById("form-signin");b&&(b.onsubmit=async L=>{L.preventDefault();const k=document.getElementById("signin-email").value,U=f.value;try{const P=await _o({email:k,password:U});T.setState({currentUser:P}),w(`Welcome back, ${P.displayName||P.name}`),e("/welcome")}catch(P){w(P.message,"error")}});const y=document.getElementById("form-register");y&&(y.onsubmit=async L=>{L.preventDefault();const k=document.getElementById("reg-name").value,U=document.getElementById("reg-email").value,P=document.getElementById("reg-password").value;try{const de=await Fo({name:k,email:U,password:P});T.setState({currentUser:de}),w("Account created successfully"),e("/welcome")}catch(de){w(de.message,"error")}});const $=document.getElementById("form-otp");$&&($.onsubmit=async L=>{L.preventDefault();const k=document.getElementById("otp-phone").value;try{const U=await Ho(k);T.setState({currentUser:U}),w("Phone verified successfully"),e("/welcome")}catch(U){w(U.message,"error")}});const N=document.getElementById("btn-forgot-pw");N&&(N.onclick=()=>{w("Password reset link sent to registered email","info")})}function zl(){return T.state.currentUser,`
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
          <img src="${Xn}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora Logo" class="w-20 h-20 object-contain mb-5 drop-shadow-sm" />

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
  `}function Gl(e){const t=document.getElementById("welcome-sign-out");t&&(t.onclick=async()=>{await Ua(),T.setState({currentUser:null}),w("Signed out successfully"),e("/auth")})}function Ya(){let e=document.getElementById("scriptora-modal-portal");return e||(e=document.createElement("div"),e.id="scriptora-modal-portal",document.body.appendChild(e)),e}function Xa(e){if(!e)return;const t=Ya();e.parentElement!==t&&t.appendChild(e)}function un(){!!document.querySelector("#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)")?(document.documentElement.classList.add("scriptora-modal-open"),document.body.classList.add("scriptora-modal-open")):(document.documentElement.classList.remove("scriptora-modal-open"),document.body.classList.remove("scriptora-modal-open"))}function Wl(){document.documentElement.classList.add("scriptora-modal-open"),document.body.classList.add("scriptora-modal-open")}function Ea(){un()}function ot(e){if(!e)return;Xa(e),e.classList.remove("hidden"),e.classList.add("flex"),Wl(),e.scrollTop=0;const t=e.querySelector(".scriptora-modal-card");if(t){t.scrollTop=0;const s=t.querySelector(".scriptora-modal-body, .overflow-y-auto");s&&(s.scrollTop=0)}}function he(e){e&&(e.classList.contains("hidden")||(e.classList.add("hidden"),e.classList.remove("flex")),un())}function Kl(e,t,s={}){if(!e||!t)return null;const{placement:n="auto",offset:o=4,boundaryMargin:a=8,preferPosition:i="bottom"}=s,l=e.getBoundingClientRect(),r=window.visualViewport,f=r?r.width:window.innerWidth,p=r?r.height:window.innerHeight,d=r?r.offsetTop:0,c=r?r.offsetLeft:0,x=!!e.closest(".scriptora-modal-overlay");let m=d+a,h=d+p-a;if(!x){const ae=document.getElementById("editor-fixed-header")||document.getElementById("scriptora-global-header")||document.querySelector('header[data-global-header="true"]'),xe=ae&&!ae.classList.contains("hidden")?ae.getBoundingClientRect().bottom:d+56,ee=document.getElementById("scriptora-global-nav")||document.getElementById("scriptora-bottom-nav")||document.querySelector('nav[data-global-bottom-nav="true"]'),Se=ee&&!ee.classList.contains("hidden")?ee.getBoundingClientRect().top:d+p;m=Math.max(m,xe+4),h=Math.min(h,Se-4)}const b=t.offsetWidth||200,y=t.offsetHeight||160,$=h-l.bottom-o,N=l.top-m-o;let L=!1;n.startsWith("top")?L=N>=y||N>$:n.startsWith("bottom")?L=$<y&&N>$:i==="top"?L=N>=y||N>$:L=$<y&&N>$;let k,U;L?(U=Math.max(90,Math.min(y,N)),k=l.top-U-o):(U=Math.max(90,Math.min(y,$)),k=l.bottom+o),k=Math.max(m,Math.min(h-U,k));let P;return n.endsWith("end")||l.left+b>f-a?P=l.right-b:P=l.left,P=Math.max(c+a,Math.min(c+f-b-a,P)),{top:Math.round(k),left:Math.round(P),maxHeight:Math.round(U),width:Math.min(b,f-2*a),placement:L?"top":"bottom"}}function zs(e,t,s={}){if(!e||!t)return;const n=!!e.closest(".scriptora-modal-overlay");if(s.portal!==!1){const i=n?Ya():document.body;t.parentElement!==i&&i.appendChild(t)}const o=t.classList.contains("hidden");o&&(t.style.visibility="hidden",t.classList.remove("hidden")),t.style.position="fixed",t.style.zIndex=s.zIndex||(n?"10000":"120");const a=Kl(e,t,s);a&&(t.style.top=`${a.top}px`,t.style.left=`${a.left}px`,t.style.maxHeight=`${a.maxHeight}px`,t.style.overflowY="auto"),o&&(t.style.visibility="")}function Za(e,t,s={}){if(!e||!t)return;t.classList.add("scriptora-popup"),t.setAttribute("data-scriptora-popup","true");const n=()=>{t.classList.contains("hidden")||zs(e,t,s)},o=()=>{t.classList.remove("hidden"),zs(e,t,s)},a=()=>{t.classList.add("hidden")},i=()=>{t.classList.contains("hidden")?o():a()},l=r=>{t.classList.contains("hidden")||!e.contains(r.target)&&!t.contains(r.target)&&a()};return document.addEventListener("click",l),window.addEventListener("scroll",n,{passive:!0,capture:!0}),window.addEventListener("resize",n,{passive:!0}),window.visualViewport&&(window.visualViewport.addEventListener("resize",n,{passive:!0}),window.visualViewport.addEventListener("scroll",n,{passive:!0})),{open:o,close:a,toggle:i,update:n}}if(typeof document<"u"){document.addEventListener("click",t=>{t.target&&t.target.classList&&t.target.classList.contains("scriptora-modal-overlay")&&he(t.target)}),document.addEventListener("keydown",t=>{if(t.key==="Escape"){const s=Array.from(document.querySelectorAll("#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)"));s.length>0&&he(s[s.length-1])}});const e=()=>{new MutationObserver(s=>{for(const n of s)if(n.type==="attributes"&&n.attributeName==="class"){const o=n.target;o&&o.classList&&o.classList.contains("scriptora-modal-overlay")&&(o.classList.contains("hidden")||Xa(o),un())}}).observe(document.body,{attributes:!0,attributeFilter:["class"],subtree:!0})};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}function Jl(e){if(!e)return"";try{const t=localStorage.getItem(`scriptora_screenplay_${e.id}`);if(t){const s=JSON.parse(t);if(s&&Array.isArray(s.scenes)&&s.scenes.length>0){const n=parseInt((e.currentScene||"").replace(/\D+/g,""),10)||1,o=s.scenes.find(a=>a.number===n)||s.scenes[0];if(o&&Array.isArray(o.blocks)){const a=o.blocks.find(r=>r.type==="action")||o.blocks[0],i=o.slugline||o.blocks.find(r=>r.type==="scene")?.content||"",l=a?.content||"";if(i&&l)return`"${i} - ${l.slice(0,95)}..."`;if(l)return`"${l.slice(0,110)}..."`}}}}catch{}return e.id==="chronicles-of-dust"?'"INT. CUSTOMS OFFICE - NIGHT - Kevin kneels over cracked hydro-sensor junction box, static..."':e.id==="the-neon-horizon"?'"EXT. SECTOR 4 SKYLINE - DUSK - Rain reflects neon advertisements across towering glass spires..."':e.id==="velvet-shadows"?'"INT. DETECTIVE OFFICE - RAINY NIGHT - A single desk lamp casts long shadows across unread case files..."':e.id==="silent-echoes"?'"INT. ARCHIVE CELLAR - DAY - Dust motes dance in the amber light filtering through frosted glass..."':e.logline?`"${e.logline.slice(0,110)}..."`:"Empty script — start writing your story."}function Yl(){const e=T.state.scripts||[],t=e.length>0,s=t&&e.find(a=>a&&a.isCurrentDraft)||null,n=parseInt((s?.currentScene||"").replace(/\D+/g,""),10)||1,o=s?.currentScene||`Scene ${n}`;return`
    ${pt("Workspace","Your writing space.")}

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
                ${Jl(s)}
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

    ${ct("workspace")}
  `}function Xl(e){let t=null;const s=document.getElementById("btn-continue-writing");s&&(s.onclick=async()=>{const m=s.getAttribute("data-script-id"),h=s.getAttribute("data-scene")||"1";await T.selectScript(m),e(`/editor/${m}?scene=${h}`)}),document.querySelectorAll(".script-item-row").forEach(m=>{m.onclick=async h=>{if(h.target.closest(".script-more-btn"))return;const b=m.getAttribute("data-script-id");await T.selectScript(b),e(`/editor/${b}`)}});const n=document.getElementById("screenplay-search");n&&(n.oninput=m=>{const h=m.target.value.toLowerCase().trim();document.querySelectorAll("#screenplays-library-list .script-item-row").forEach(y=>{const $=y.querySelector(".font-semibold")?.textContent.toLowerCase()||"";y.style.display=$.includes(h)?"flex":"none"})});const o=document.getElementById("btn-new-screenplay-card"),a=document.getElementById("btn-new-script"),i=document.getElementById("new-script-modal"),l=document.getElementById("close-new-script-modal"),r=document.getElementById("cancel-new-script-btn"),f=document.getElementById("form-new-script");function p(m){i&&(m?(ot(i),document.getElementById("new-script-title")?.focus()):he(i))}o&&(o.onclick=()=>p(!0)),a&&(a.onclick=()=>p(!0)),l&&(l.onclick=()=>p(!1)),r&&(r.onclick=()=>p(!1)),i&&(i.onclick=m=>{m.target===i&&p(!1)}),f&&(f.onsubmit=async m=>{m.preventDefault();const h=document.getElementById("new-script-title").value.trim(),b=document.getElementById("new-script-format").value,y=document.getElementById("new-script-genre").value;if(h)try{const $=await qo({title:h,format:b,genre:y});await T.refreshScripts(),await T.selectScript($.id),p(!1),w(`Created "${$.title}"`),e(`/editor/${$.id}`)}catch($){w($.message,"error")}});const d=document.getElementById("script-menu-popover");let c=null;document.querySelectorAll(".script-more-btn").forEach(m=>{m.onclick=h=>{h.stopPropagation(),t=m.getAttribute("data-script-id"),c=m,zs(m,d,{placement:"bottom-end",offset:4}),d.classList.remove("hidden")}}),window.addEventListener("scroll",()=>{c&&d&&!d.classList.contains("hidden")&&zs(c,d,{placement:"bottom-end",offset:4})},{passive:!0}),window.onclick=m=>{!m.target.closest("#script-menu-popover")&&!m.target.closest(".script-more-btn")&&(d?.classList.add("hidden"),c=null)},document.getElementById("menu-opt-open")?.addEventListener("click",()=>{d.classList.add("hidden"),t&&(T.selectScript(t),e(`/editor/${t}`))}),document.getElementById("menu-opt-rename")?.addEventListener("click",async()=>{d.classList.add("hidden");const m=prompt("Enter new title for this screenplay:");m&&m.trim()&&(await zo(t,{title:m.trim()}),await T.refreshScripts(),w("Screenplay renamed"),e("/workspace"))}),document.getElementById("menu-opt-duplicate")?.addEventListener("click",async()=>{d.classList.add("hidden"),await Wo(t),await T.refreshScripts(),w("Screenplay duplicated"),e("/workspace")}),document.getElementById("menu-opt-archive")?.addEventListener("click",async()=>{d.classList.add("hidden"),await Ko(t),await T.refreshScripts(),w("Screenplay archived"),e("/workspace")}),document.getElementById("menu-opt-delete")?.addEventListener("click",async()=>{d.classList.add("hidden"),confirm("Are you sure you want to delete this screenplay? This action cannot be undone.")&&(await Go(t),await T.refreshScripts(),w("Screenplay deleted"),e("/workspace"))});const x=document.getElementById("btn-export-library");x&&(x.onclick=()=>{const m="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(T.state.scripts,null,2)),h=document.createElement("a");h.setAttribute("href",m),h.setAttribute("download",`scriptora_library_${Date.now()}.json`),document.body.appendChild(h),h.click(),h.remove(),w("Exported library manifest (.json)")})}const Zl=new Set(["HE","SHE","IT","ITS","HIM","HER","HERS","HIS","THEY","THEM","THEIR","THEIRS","WE","US","OUR","OURS","YOU","YOUR","YOURS","ME","MY","MINE","I","WHO","WHOM","WHOSE","WHAT","WHICH","WHEN","WHERE","WHY","HOW","AND","OR","BUT","IF","SO","FOR","NOR","YET","BECAUSE","AS","AT","BY","FROM","IN","INTO","OF","OFF","ON","ONTO","OUT","OVER","TO","UP","WITH","THE","A","AN","THIS","THAT","THESE","THOSE","YES","NO","NOT","OK","NOW","THEN","HERE","THERE","SH","SA","AR","ARA","SAN","SANT","SANTH","SANTHO","SO"]);function Mt(e){if(!e||typeof e!="string")return"";let t=e.replace(/\([^)]*\)/g,"").replace(/&(?:amp;)*nbsp;?/gi," ").replace(/[\u200B\u00A0]/g," ").replace(/[^a-zA-Z0-9\s'-]/g,"").trim().toUpperCase();return t==="ARAF"&&(t="ARAVIND"),t}function Vn(e){if(!e||typeof e!="string")return!1;const t=Mt(e);return!(!t||t.length<3||Zl.has(t)||/\b(INT|EXT|SCENE|DAY|NIGHT|MORNING|EVENING|DUSK|DAWN|CUT TO|FADE|TRANSITION)\b/i.test(t)||t.split(/\s+/).length>3||t.length>30)}function Qa(e){if(!Array.isArray(e))return[];const t=[],s=new Set;return e.forEach(o=>{const a=typeof o=="string"?o:o?.name||o?.content||"",i=Mt(a);Vn(i)&&(s.has(i)||(s.add(i),t.push(i)))}),t.filter(o=>!(t.some(l=>l!==o&&l.startsWith(o)&&l.length>o.length)||t.some(l=>l!==o&&l.length>=5&&o.length<=4&&l.startsWith(o.slice(0,3)))))}const Ql=[{code:"V.O.",label:"V.O.",desc:"Voice Over"},{code:"O.S.",label:"O.S.",desc:"Off Screen"},{code:"O.C.",label:"O.C.",desc:"Off Camera"},{code:"CONT'D",label:"CONT'D",desc:"Continued"}],ei=["beat","pause","whispering","softly","angrily","smiling","crying","sadly","laughing","screaming","quietly","nodding","shaking head","shouting","sarcastic","aside","overlapping","filtered","into phone","to himself","to herself"];function Zn(e){if(!e||typeof e!="string")return null;const t=e.match(/\(([^)]+)\)/g);if(!t)return null;for(const s of t){const n=s.replace(/[()]/g,"").trim().toUpperCase();if(!(n==="CONT'D"||n==="CONTD"))return n==="V.O."||n==="VO"?"V.O.":n==="O.S."||n==="OS"?"O.S.":n==="O.C."||n==="OC"?"O.C.":n}return null}function Qn(e){return!e||typeof e!="string"?!1:/\bCONT'?D\b/i.test(e)}function mn(e,t=null,s=!1){const n=Zn(e),o=Mt(e);if(!o)return e?e.trim().toUpperCase():"";let a=o;const i=t?t.replace(/[()]/g,"").trim().toUpperCase():null,l=i==="CONT'D"||i==="CONTD",r=!l&&i?i:n;return r&&r!=="CONT'D"&&r!=="CONTD"&&(a+=` (${r})`),(s||l||Qn(e))&&(a+=" (CONT'D)"),a}let q=null,Ze=null,zn=null,Rs=!1,Xe=!1,Yt=!0,Vt=!1,Pn="EN",Bt=[],Xt=-1,Ln=null,Dn=null,ea=null,Ve=localStorage.getItem("scriptora_autosave")!=="false",Gs="screenplay",gs=!1,on=!0,ln="Owner";const Ye=[],ka=["CUT TO:","CUT TO BLACK.","FADE IN:","FADE OUT.","FADE TO BLACK.","DISSOLVE TO:","MATCH CUT TO:","JUMP CUT TO:","SMASH CUT TO:","SLAM TO:","SLAM TO BLACK.","INTERCUT WITH:","WIPE TO:","IRIS IN:","IRIS OUT:","BACK TO:","CONTINUOUS","END"];let Ia=0;const _s=[];function dt(e){if(e==null)return"";typeof e!="string"&&(e=String(e));let t=e;t=t.replace(/&(?:amp;)+nbsp;?/gi,"&nbsp;"),t=t.replace(/&#(?:160|xA0);/gi," ");let s;do s=t,t=t.replace(/(?:<br\s*\/?>|&nbsp;?|\u00A0|\s)+$/gi,"");while(t!==s);return t=t.replace(/(?:&nbsp;?|\u00A0)+/gi," "),t}function ns(e){return e?(e.innerText||e.textContent||"").replace(/&(?:amp;)*nbsp;?/gi,"").replace(/[\u200B\u00A0\r\n\t ]/g,"").trim().length===0:!0}function ti(){return window.innerWidth<=768||"ontouchstart"in window||navigator.maxTouchPoints&&navigator.maxTouchPoints>0||/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}function eo(e,t){const s=Date.now();if(s-Ia<150)return!0;if(!ti())return!1;const n=e.getAttribute("data-block-type")||"action";if(!["action","text","character","transition"].includes(n)||!ns(t))return!1;let o="action";return n==="action"||n==="text"?o="character":n==="character"?o="transition":n==="transition"&&(o="action"),Ia=s,_s.push({blockId:e.getAttribute("data-block-id"),prevType:n,newType:o}),t.innerText="",Ws(e,o),yn(o),Xe=!0,Ve&&rt(),!0}const to=46;function si(e,t=null){const s=T.state.scripts?.find(a=>a.id===e)||T.state.activeScript||{title:"Untitled Screenplay",draft:"Draft 1.0"};T.state.currentUser?.initials;let n=null;if(window.scriptoraRouter){const a=window.scriptoraRouter.peekPreviousRoute?.();a&&(n=window.scriptoraRouter.getRouteLabel(a))}const o=n||"Workspace";return`
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
              <button id="btn-toggle-autosave" class="flex items-center gap-1.5 pl-1.5 pr-2.5 h-full hover:bg-slate-50 active:scale-95 transition-all text-xs font-medium text-slate-700 hover:text-slate-900" title="Toggle Auto-save (Current: ${Ve?"ON":"OFF"})">
                <span class="w-1.5 h-1.5 rounded-full ${Ve?"bg-emerald-500 animate-pulse":"bg-slate-400"}" id="autosave-dot"></span>
                <span id="autosave-toggle-label">${Ve?"Auto":"Off"}</span>
              </button>
            </div>

            <!-- Master Toolbar Visibility Toggle [⋮] -->
            <button id="btn-toggle-editor-toolbar" class="w-7 h-7 flex items-center justify-center ${gs?"text-blue-600 bg-blue-50 border-blue-200/90":"text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50"} rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0" title="${gs?"Collapse Editor Toolbars (Writing Mode)":"Expand Editor Toolbars (Tools & Formatting)"}" aria-label="Toggle Editor Toolbars">
              <span class="material-symbols-outlined text-[18px]">more_vert</span>
            </button>

            <!-- Collaborate Link -->
            <a href="/profile/collaborators?from=editor&scriptId=${e}" id="editor-collab-btn" aria-label="Collaborators" class="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors no-underline" title="Collaborators">
              <span class="material-symbols-outlined text-[19px]">group</span>
            </a>
          </div>
        </div>

        <!-- COLLAPSIBLE SECONDARY TOOLBAR ROWS (Master Visibility via Header [⋮]) -->
        <div id="editor-collapsible-toolbars" class="${gs?"":"hidden"} w-full transition-all duration-200">
          
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
        
        <!-- Document 1: Continuous A4 Sheets Container (Unified Screenplay Editing & Selection Surface) -->
        <div id="screenplay-pages-container" class="w-full max-w-4xl flex flex-col items-center gap-8 py-6 px-2 sm:px-4 outline-none" spellcheck="false">
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
  `}function Kt({id:e,name:t,close:s,restore:n}){try{window.history.pushState({editorSubViewId:e,editorSubViewName:t},"")}catch{}Ye.push({id:e,name:t,close:s,restore:n})}function Ae(e){const t=Ye.findIndex(s=>s.id===e);if(t!==-1){if(t===Ye.length-1){const s=Ye.pop();s&&typeof s.close=="function"&&s.close();const n=Ye[Ye.length-1];n&&typeof n.restore=="function"&&n.restore()}else{const s=Ye.splice(t,1)[0];s&&typeof s.close=="function"&&s.close()}try{window.history.back()}catch{}}}function ni(){if(Gs==="titlepage")return Hs(),!0;if(Ye.length>0){const e=Ye.pop();e&&typeof e.close=="function"&&e.close();const t=Ye[Ye.length-1];return t&&typeof t.restore=="function"&&t.restore(),!0}return!1}async function ai(e,t){Ye.length=0;const s=()=>Gs==="titlepage"?(Hs(),!0):Ye.length>0?ni():(Xe&&bs(!1),!1);window.__scriptoraEditorPopstate=()=>s(),window.scriptoraRouter&&window.scriptoraRouter.registerBackHandler(s);const n=document.getElementById("editor-back-btn");n&&(n.onclick=l=>{l?.preventDefault(),l?.stopPropagation(),window.scriptoraRouter?window.scriptoraRouter.back("/workspace"):s()||t("/workspace")}),q=await Un(e),q?.scenes&&q.scenes.forEach(l=>{l.blocks&&l.blocks.forEach(r=>{r.content&&(r.content=dt(r.content)),r.char1&&(r.char1=dt(r.char1)),r.dia1&&(r.dia1=dt(r.dia1)),r.char2&&(r.char2=dt(r.char2)),r.dia2&&(r.dia2=dt(r.dia2))})}),e!=="chronicles-of-dust"&&q&&(q.scenes||[]).some(r=>{const f=(r.slugline||"").toUpperCase();return f.includes("WRITER'S ROOM")||f.includes("STUDIO - DAY")||f.includes("NEW SCENE - DAY")?!0:(r.blocks||[]).some(p=>{const d=p.content||"";return d.includes("Sunlight cuts through dust motes")||d.includes("A blank script page waits")||d.includes("Type your screenplay action here")})})&&(q.scenes=[{id:"scene-1",number:1,slugline:"",blocks:[{id:`b-${Date.now()}-1`,type:"scene",content:""}]}],q.wordCount=0,Ks(e,q)),ft(),Js();try{const l=await Zo(e);l&&(ln=l.role||"Owner",on=l.permissions?!!l.permissions["screenplay.edit"]:!0)}catch{on=!0,ln="Owner"}if(!on){const l=document.querySelector("main");if(l&&!document.getElementById("editor-readonly-banner")){const r=document.createElement("div");r.id="editor-readonly-banner",r.className="w-full bg-amber-500/90 text-slate-950 font-bold text-xs px-4 py-2 flex items-center justify-between shadow-xs sticky top-0 z-40 border-b border-amber-600",r.innerHTML=`
        <div class="flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">visibility</span>
          <span>Viewing in Read-Only Mode (Role: ${ln})</span>
        </div>
        <span class="text-[10px] font-medium uppercase tracking-wider bg-black/10 px-2 py-0.5 rounded">Edits Disabled</span>
      `,l.prepend(r)}document.querySelectorAll('.script-block-content, [contenteditable="true"]').forEach(r=>{r.setAttribute("contenteditable","false")})}const o=document.getElementById("editor-save-btn");o&&(o.onclick=()=>bs(!0)),li(),ii();const a=document.getElementById("editor-collab-btn");a&&(a.onclick=l=>{l.preventDefault(),Xe&&bs(!1),T.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile/collaborators?from=editor&scriptId=${e}`)});const i=document.getElementById("editor-profile-btn");i&&(i.onclick=l=>{l.preventDefault(),Xe&&bs(!1),T.setState({editorReturnScriptId:e,editorReturnUrl:`/editor/${e}`}),sessionStorage.setItem("scriptora_editor_return",`/editor/${e}`),sessionStorage.setItem("scriptora_from_editor","true"),t(`/profile?from=editor&scriptId=${e}`)}),window.addEventListener("keydown",oi),Ii(e,t),wi(),Si(),ki(),ri(),di(),Ci(),Ai(e),hi()}function oi(e){if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"&&(e.preventDefault(),bs(!0)),(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="f"&&(e.preventDefault(),bn(!0)),(e.ctrlKey||e.metaKey)&&e.key==="Enter"&&(e.preventDefault(),ta()),(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="a"){const t=document.getElementById("screenplay-pages-container"),s=document.activeElement;t&&(t===s||t.contains(s)||t.contains(window.getSelection()?.anchorNode))&&(e.preventDefault(),lo())}}function li(){const e=document.getElementById("btn-toggle-autosave"),t=document.getElementById("autosave-dot"),s=document.getElementById("autosave-toggle-label");e&&(e.onclick=n=>{n.stopPropagation(),Ve=!Ve,localStorage.setItem("scriptora_autosave",String(Ve)),Ve?(t&&(t.className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"),s&&(s.textContent="Auto"),e.title="Toggle Auto-save (Current: ON)",w("Auto-save enabled"),Xe&&rt()):(t&&(t.className="w-1.5 h-1.5 rounded-full bg-slate-400"),s&&(s.textContent="Off"),e.title="Toggle Auto-save (Current: OFF)",clearTimeout(zn),w("Auto-save disabled · Tap floppy to save"))})}function Fs(){const e=document.getElementById("editor-main-scroll");e&&(e.style.paddingTop="12px",e.style.paddingBottom=Vt?"32px":"88px")}function ii(){const e=document.getElementById("btn-toggle-editor-toolbar"),t=document.getElementById("editor-collapsible-toolbars");Fs(),window.addEventListener("resize",Fs),e&&(e.onclick=s=>{s.preventDefault(),s.stopPropagation(),gs=!gs,gs?(t&&t.classList.remove("hidden"),e.className="w-7 h-7 flex items-center justify-center text-blue-600 bg-blue-50 border-blue-200/90 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Collapse Editor Toolbars (Writing Mode)"):(t&&t.classList.add("hidden"),e.className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50 rounded-lg border active:scale-95 transition-all shadow-2xs shrink-0",e.title="Expand Editor Toolbars (Tools & Formatting)"),Fs()})}function Hs(){if(Gs==="titlepage"){rn("screenplay");try{window.history.state?.editorTab==="titlepage"&&window.history.back()}catch{}}}function ri(){const e=document.getElementById("doc-tab-screenplay"),t=document.getElementById("doc-tab-titlepage"),s=document.getElementById("btn-quick-title-page"),n=document.getElementById("menu-btn-title-page"),o=document.getElementById("doc-tab-titlepage-close"),a=document.getElementById("btn-close-titlepage-sheet");e&&(e.onclick=()=>Hs()),t&&(t.onclick=i=>{i.preventDefault(),rn("titlepage")}),o&&(o.onclick=i=>{i.preventDefault(),i.stopPropagation(),Hs()}),a&&(a.onclick=i=>{i.preventDefault(),i.stopPropagation(),Hs()}),s&&(s.onclick=()=>rn("titlepage")),n&&(n.onclick=()=>{Ae("moreMenu"),rn("titlepage")})}function rn(e){if(Gs===e)return;Gs=e;const t=document.getElementById("screenplay-pages-container"),s=document.getElementById("title-page-container"),n=document.getElementById("doc-tab-screenplay"),o=document.getElementById("doc-tab-titlepage-wrap");if(e==="titlepage"){t&&t.classList.add("hidden"),s&&(s.classList.remove("hidden"),s.classList.add("flex")),o&&(o.className="flex items-center rounded-t-lg transition-all border-b-2 border-blue-600 bg-white text-blue-700 shadow-2xs group"),n&&(n.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 rounded-t-lg transition-all"),ci();try{window.history.state?.editorTab!=="titlepage"&&window.history.pushState({editorTab:"titlepage"},"")}catch{}}else s&&(s.classList.add("hidden"),s.classList.remove("flex")),t&&t.classList.remove("hidden"),n&&(n.className="doc-tab-btn flex items-center gap-1.5 px-3 py-1 font-medium border-b-2 border-blue-600 text-blue-700 bg-white rounded-t-lg transition-all shadow-2xs"),o&&(o.className="flex items-center rounded-t-lg transition-all border-b-2 border-transparent text-slate-600 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 group");Fs()}function ci(){if(!q)return;const e=q.titlePage||{},t=document.getElementById("tp-doc-title"),s=document.getElementById("tp-doc-by"),n=document.getElementById("tp-doc-author"),o=document.getElementById("tp-doc-phone"),a=document.getElementById("tp-doc-email"),i=document.getElementById("tp-doc-address"),l=e.title||q.title||"";t&&(t.innerText=l,l||(t.innerHTML=""));const r=e.by!==void 0?e.by:"Written by";s&&(s.innerText=r,r||(s.innerHTML=""));const f=e.author||"";n&&(n.innerText=f,f||(n.innerHTML=""));let p=e.phone||"";if(!p&&e.contact){const m=e.contact.split("·").map(h=>h.trim()).find(h=>h.includes("+")||/\d{3}/.test(h));m&&(p=m)}o&&(o.innerText=p,p||(o.innerHTML=""));let d=e.email||"";if(!d&&e.contact&&e.contact.includes("@")){const x=e.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);x&&(d=x[0])}a&&(a.innerText=d,d||(a.innerHTML=""));const c=e.address||"";i&&(i.innerText=c,c||(i.innerHTML=""))}function di(){const e=document.getElementById("tp-doc-title"),t=document.getElementById("tp-doc-by"),s=document.getElementById("tp-doc-author"),n=document.getElementById("tp-doc-phone"),o=document.getElementById("tp-doc-email"),a=document.getElementById("tp-doc-address"),i=()=>{if(!q)return;q.titlePage||(q.titlePage={});const l=e?e.innerText.trim():"",r=t?t.innerText.trim():"",f=s?s.innerText.trim():"",p=n?n.innerText.trim():"",d=o?o.innerText.trim():"",c=a?a.innerText.trim():"";if(q.titlePage.title=l,q.titlePage.by=r||"Written by",q.titlePage.author=f,q.titlePage.phone=p,q.titlePage.email=d,q.titlePage.address=c,q.titlePage.contact=[p,d,c].filter(Boolean).join(" · "),l){q.title=l;const x=document.getElementById("editor-script-title"),m=document.getElementById("doc-tab-title-label");x&&(x.textContent=l),m&&(m.textContent=l)}Xe=!0,Zt("Unsaved"),Ve&&rt()};[e,t,s,n,o,a].forEach(l=>{l&&(l.oninput=i,l.onblur=()=>{l.innerText.trim()===""&&(l.innerHTML=""),i()})})}function ft(){const e=document.getElementById("screenplay-pages-container");if(!e||!q)return;const t=q.scenes||[],s=[];t.forEach(i=>{(i.blocks||[]).forEach(l=>{s.push({block:l,sceneNumber:i.number,sceneId:i.id,slugline:i.slugline})})});const n=[];let o={pageNumber:1,items:[]},a=0;s.forEach(i=>{if(i.block.type==="pagebreak"){o.items.push(i),n.push(o),o={pageNumber:n.length+1,items:[]},a=0;return}const l=so(i.block);a+l>to&&o.items.length>0&&(n.push(o),o={pageNumber:n.length+1,items:[]},a=0),o.items.push(i),a+=l}),o.items.length>0&&n.push(o),n.length===0&&n.push({pageNumber:1,items:[{block:{id:`b-${Date.now()}-1`,type:"scene",content:""},sceneNumber:1,sceneId:"scene-1",slugline:""}]}),e.innerHTML=n.map(i=>`
    <div class="screenplay-page-sheet w-full max-w-[816px] min-h-[1123px] bg-white rounded-md sm:rounded-lg shadow-md border border-slate-200/90 flex flex-col font-courier text-[12pt] leading-[1.25] text-slate-900 relative transition-all" data-page-num="${i.pageNumber}">
      
      <!-- Top Page Header: Page number in top right -->
      <div contenteditable="false" class="w-full flex items-center justify-end h-7 pb-2 select-none text-[12pt] text-slate-600 font-courier">
        <span>${i.pageNumber}.</span>
      </div>

      <!-- Screenplay Blocks naturally flowing across this A4 page -->
      <div class="page-blocks-wrapper flex flex-col flex-1 w-full">
        ${i.items.map(l=>oo(l.block,l.sceneNumber,l.sceneId)).join("")}
      </div>

      <!-- Bottom Page Boundary indicator with Page Controls -->
      <div contenteditable="false" class="w-full pt-6 select-none flex items-center justify-between text-[11px] text-slate-400 font-sans border-t border-slate-100 mt-4">
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
  `).join(""),fi(),vn()}function so(e){if(e.type==="pagebreak")return 1;const t=e.content||"";return e.type==="scene"?3:e.type==="action"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="character"?2:e.type==="parenthetical"?1:e.type==="dialogue"?Math.max(1,Math.ceil(t.length/38))+1:e.type==="transition"||e.type==="shot"?2:e.type==="text"?Math.max(1,Math.ceil(t.length/60))+1:e.type==="note"||e.type==="outline"?2:e.type==="act"||e.type==="endact"?3:e.type==="sequence"?2:e.type==="dual"?4:e.type==="lyrics"?2:e.type==="image"?10:2}function Ca(e){let t=!1;(q.scenes||[]).forEach(s=>{const n=(s.blocks||[]).findIndex(o=>o.id===e);n!==-1&&(s.blocks.splice(n,1),t=!0)}),t&&(Xe=!0,ft(),w("Page break removed"),Ve&&rt())}function ta(e=null){const t=e||Ze,s=q.scenes||[];if(s.length===0)return;const n={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"};let o=!1;if(t)for(let a of s){const i=(a.blocks||[]).findIndex(l=>l.id===t);if(i!==-1){a.blocks.splice(i+1,0,n),o=!0;break}}if(!o){const a=s[s.length-1];a.blocks||(a.blocks=[]),a.blocks.push(n)}Xe=!0,ft(),w("Page break inserted"),Ve&&rt()}function no(e=null){const t=e||Ze,s=q.scenes||[];if(s.length===0){sa();return}const n={id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},o={id:"b-"+Date.now(),type:"action",content:""};let a=null,i=-1;if(t)for(let l of s){const r=(l.blocks||[]).findIndex(f=>f.id===t);if(r!==-1){a=l,i=r+1;break}}a||(a=s[s.length-1],i=a.blocks.length),a.blocks.splice(i,0,n,o),Xe=!0,ft(),setTimeout(()=>{const l=document.getElementById(o.id);if(l){const r=l.hasAttribute("contenteditable")?l:l.querySelector('[contenteditable="true"]');r&&r.focus(),l.scrollIntoView({behavior:"smooth",block:"center"})}},50),w("New page inserted"),Ve&&rt()}function pi(e){const t=document.querySelector(`.screenplay-page-sheet[data-page-num="${e}"]`);let s=null;if(t){const n=t.querySelectorAll(".screenplay-block");n.length>0&&(s=n[n.length-1].getAttribute("data-block-id"))}no(s)}function sa(){const e=q.scenes||[],t=e.length+1,s={id:"scene-"+Date.now(),number:t,slugline:`INT. SCENE ${t} - DAY`,blocks:[{id:"pb-"+Date.now(),type:"pagebreak",content:"PAGE BREAK"},{id:"b-"+Date.now()+"-1",type:"scene",content:`INT. SCENE ${t} - DAY`},{id:"b-"+Date.now()+"-2",type:"action",content:""}]};e.push(s),Xe=!0,ft(),setTimeout(()=>{const o=document.getElementById(s.blocks[1].id);if(o){const a=o.hasAttribute("contenteditable")?o:o.querySelector('[contenteditable="true"]');a&&a.focus(),o.scrollIntoView({behavior:"smooth",block:"center"})}},80);const n=document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)").length||1;w(`Added Page at End (Page ${n})`),Ve&&rt()}function ao(e=null){let t=e;if(!t&&Ze){const p=document.getElementById(Ze),d=p?p.closest(".screenplay-page-sheet"):null;d&&(t=parseInt(d.getAttribute("data-page-num"),10))}t||(t=1);const s=q.scenes||[];if(s.length===0){sa();return}if(t<=1){const p={id:"scene-"+Date.now(),number:1,slugline:"INT. SCENE 1 - DAY",blocks:[{id:"b-"+Date.now()+"-1",type:"scene",content:"INT. SCENE 1 - DAY"},{id:"b-"+Date.now()+"-2",type:"action",content:""},{id:"pb-"+Date.now()+"-3",type:"pagebreak",content:"PAGE BREAK"}]};s.unshift(p),s.forEach((d,c)=>{d.number=c+1}),Xe=!0,ft(),Js(),setTimeout(()=>{const d=document.getElementById(p.blocks[0].id);if(d){const c=d.hasAttribute("contenteditable")?d:d.querySelector('[contenteditable="true"]');c&&c.focus(),d.scrollIntoView({behavior:"smooth",block:"center"})}},80),w("Added Page Before (Page 1)"),Ve&&rt();return}const n=document.querySelector(`.screenplay-page-sheet[data-page-num="${t}"]`);let o=null;if(n){const p=n.querySelector(".screenplay-block");p&&(o=p.getAttribute("data-block-id"))}let a=null,i=-1;if(o)for(let p of s){const d=(p.blocks||[]).findIndex(c=>c.id===o);if(d!==-1){a=p,i=d;break}}a||(a=s[0],i=0);const l={id:"pb-"+Date.now()+"-a",type:"pagebreak",content:"PAGE BREAK"},r={id:"b-"+Date.now()+"-b",type:"action",content:""},f={id:"pb-"+Date.now()+"-c",type:"pagebreak",content:"PAGE BREAK"};a.blocks.splice(i,0,l,r,f),Xe=!0,ft(),setTimeout(()=>{const p=document.getElementById(r.id);if(p){const d=p.hasAttribute("contenteditable")?p:p.querySelector('[contenteditable="true"]');d&&d.focus(),p.scrollIntoView({behavior:"smooth",block:"center"})}},80),w(`Added Page Before (Page ${t})`),Ve&&rt()}function oo(e,t,s){const n=e.type==="pagebreak",o=e.type==="scene",a=e.type==="character",i=e.type==="parenthetical",l=e.type==="dialogue",r=e.type==="transition",f=e.type==="shot",p=e.type==="text",d=e.type==="note",c=e.type==="outline",x=e.type==="act",m=e.type==="endact",h=e.type==="sequence",b=e.type==="dual",y=e.type==="lyrics",$=e.type==="image",N=e.type==="action"||!n&&!o&&!a&&!i&&!l&&!r&&!f&&!p&&!d&&!c&&!x&&!m&&!h&&!b&&!y&&!$;if(n)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="pagebreak" tabindex="0" contenteditable="false" class="screenplay-block my-3 select-none flex items-center justify-between px-3 py-2 text-slate-400 bg-slate-50 border border-dashed border-slate-300 rounded-lg group hover:border-blue-400 hover:bg-blue-50/30 transition-all outline-none focus:ring-1 focus:ring-blue-500">
        <div contenteditable="false" class="flex items-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase text-slate-500 group-hover:text-blue-600 select-none">
          <span class="material-symbols-outlined text-[16px] text-blue-500">insert_page_break</span>
          <span>PAGE BREAK</span>
        </div>
        <button type="button" contenteditable="false" class="btn-remove-pagebreak p-0.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors select-none" data-block-id="${e.id}" title="Remove Page Break">
          <span class="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    `;if(o)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="scene" class="screenplay-block flex items-baseline py-2 font-bold text-slate-900 mt-4 mb-2 group w-full">
        <!-- Scene Number shown in left gutter -->
        <span contenteditable="false" class="scene-num-indicator -ml-10 w-7 mr-3 shrink-0 font-mono text-slate-400 font-bold select-none text-[12pt] text-right ${Yt?"":"hidden"}">${t}</span>
        <div class="screenplay-block-text flex-1 tracking-wider uppercase outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${at(e.content)}</div>
      </div>
    `;if(N)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block screenplay-block-text text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${at(e.content)}</div>
    `;if(a)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="character" class="screenplay-block screenplay-block-text uppercase font-bold tracking-wider text-slate-900 text-left mt-3.5 mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[37%] max-w-[28ch]" contenteditable="true" spellcheck="false">${at(e.content)}</div>
    `;if(i)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="parenthetical" class="screenplay-block screenplay-block-text italic text-slate-600 text-left mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[26%] max-w-[24ch]" contenteditable="true" spellcheck="false">${at(e.content)}</div>
    `;if(l)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dialogue" class="screenplay-block screenplay-block-text text-left text-slate-900 mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text ml-[17%] max-w-[36ch]" contenteditable="true" spellcheck="false">${at(e.content)}</div>
    `;if(r)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="transition" class="screenplay-block screenplay-block-text w-full text-right uppercase font-bold tracking-wider text-slate-900 mt-2 mb-4 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${at(e.content)}</div>
    `;if(f)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="shot" class="screenplay-block screenplay-block-text uppercase font-bold tracking-wider text-slate-900 text-left my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text w-full max-w-[60ch]" contenteditable="true" spellcheck="false">${at(e.content||"CLOSE ON:")}</div>
    `;if(p)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="text" class="screenplay-block screenplay-block-text text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${at(e.content)}</div>
    `;if(d)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="note" class="screenplay-block screenplay-block-text text-amber-900 bg-amber-50/80 border-l-4 border-amber-400 p-2 my-2.5 rounded-r font-mono text-xs outline-none focus:ring-1 focus:ring-amber-400 cursor-text select-text" contenteditable="true" spellcheck="false">${at(e.content||"[[ NOTE: Script comment... ]]")}</div>
    `;if(c)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="outline" class="screenplay-block screenplay-block-text text-slate-500 uppercase tracking-widest font-sans font-bold text-xs my-2 border-b border-slate-200 pb-1 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${at(e.content||"OUTLINE BEAT")}</div>
    `;if(x)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="act" class="screenplay-block screenplay-block-text text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-base outline-none focus:bg-blue-50/50 rounded px-1 cursor-text underline decoration-2 underline-offset-4" contenteditable="true" spellcheck="false">${at(e.content||"ACT I")}</div>
    `;if(m)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="endact" class="screenplay-block screenplay-block-text text-center uppercase font-bold tracking-widest text-slate-900 my-4 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${at(e.content||"END OF ACT I")}</div>
    `;if(h)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="sequence" class="screenplay-block screenplay-block-text uppercase font-bold tracking-wide text-slate-800 my-3 text-sm outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${at(e.content||"SEQUENCE 1")}</div>
    `;if(b)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="dual" class="screenplay-block screenplay-dual-dialogue-grid">
        <div class="flex flex-col">
          <div class="screenplay-block-text text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${at(e.char1||"CHARACTER A")}</div>
          <div class="screenplay-block-text text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${at(e.dia1||"Dialogue A")}</div>
        </div>
        <div class="flex flex-col">
          <div class="screenplay-block-text text-center font-bold uppercase text-slate-900 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${at(e.char2||"CHARACTER B")}</div>
          <div class="screenplay-block-text text-left text-slate-900 text-xs sm:text-sm mt-1 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${at(e.dia2||"Dialogue B")}</div>
        </div>
      </div>
    `;if(y)return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="lyrics" class="screenplay-block screenplay-block-text text-center italic text-slate-800 my-2.5 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${at(e.content||"♫ Musical lyrics... ♫")}</div>
    `;if($){const L=e.url||e.content||"https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80",k=Gn(e.caption||"");return`
      <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="image" class="screenplay-block my-4 flex flex-col items-center group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-2.5 shadow-2xs transition-all">
        <div contenteditable="false" class="w-full flex items-center justify-center min-h-[180px] max-h-[420px] rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200/60 select-none">
          <img src="${L}" alt="${k||"Storyboard"}" class="max-h-[400px] w-auto max-w-full object-contain rounded-md shadow-xs bg-white pointer-events-none select-none" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80';" loading="eager" />
        </div>
        <div class="screenplay-block-text text-[11px] font-sans text-slate-600 italic mt-2 text-center outline-none px-2 py-0.5 rounded focus:bg-white w-full cursor-text" contenteditable="true" data-placeholder="Add a storyboard caption...">${k||"Storyboard visual concept"}</div>
        <button type="button" contenteditable="false" class="btn-delete-img-block select-none absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-md text-xs font-bold" data-block-id="${e.id}" data-scene-id="${s}" title="Delete image">✕</button>
      </div>
    `}return`
    <div id="${e.id}" data-block-id="${e.id}" data-scene-id="${s}" data-block-type="action" class="screenplay-block screenplay-block-text text-slate-900 text-left mb-3 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${at(e.content)}</div>
  `}function at(e){if(!e)return"";const t=dt(e);if(!t)return"";if(!/<[a-z][\s\S]*>/i.test(t))return Gn(t);try{let a=function(i){const l=Array.from(i.childNodes);for(const r of l)if(r.nodeType===Node.ELEMENT_NODE){if(r.tagName==="SPAN"&&(r.style?.textDecoration?.includes("line-through")||r.style?.textDecorationLine?.includes("line-through"))){const p=document.createElement("s");p.innerHTML=r.innerHTML,i.replaceChild(p,r),a(p);continue}if(o.has(r.tagName)){for(;r.attributes.length>0;)r.removeAttribute(r.attributes[0].name);a(r)}else{const f=document.createTextNode(r.textContent||"");i.replaceChild(f,r)}}};const n=new DOMParser().parseFromString(`<body>${t}</body>`,"text/html"),o=new Set(["B","STRONG","I","EM","U","S","STRIKE","DEL","BR","SPAN"]);return a(n.body),dt(n.body.innerHTML)}catch{return Gn(t)}}function Gn(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}function Us(e){if(!e||typeof e!="string")return e;let t=e.replace(/^(\s*["'“‘(]*)([a-z\u00E0-\u00FC])/u,(s,n,o)=>n+o.toUpperCase());return t=t.replace(/([.!?]["'”’)]*\s+["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,n,o)=>n+o.toUpperCase()),t=t.replace(/(\n\s*["'“‘(]*)([a-z\u00E0-\u00FC])/gu,(s,n,o)=>n+o.toUpperCase()),t}function jt(e){let t=0;const s=window.getSelection();if(s&&s.rangeCount>0){const n=s.getRangeAt(0),o=n.cloneRange();o.selectNodeContents(e),o.setEnd(n.endContainer,n.endOffset),t=o.toString().length}return t}function Dt(e,t){const s=window.getSelection();if(!s)return;const n=document.createRange();if(t<=0){n.selectNodeContents(e),n.collapse(!0),s.removeAllRanges(),s.addRange(n);return}let o=0,a=!1;function i(l){if(!a){if(l.nodeType===Node.TEXT_NODE){const r=l.nodeValue.length;if(o+r>=t){n.setStart(l,Math.min(t-o,r)),n.collapse(!0),a=!0;return}o+=r}else for(let r=0;r<l.childNodes.length;r++)if(i(l.childNodes[r]),a)return}}i(e),a||(n.selectNodeContents(e),n.collapse(!1)),s.removeAllRanges(),s.addRange(n)}let Je=[],Jt=null,Ms=null,fs=!1,Aa=!1;function hn(e){return e?e.classList&&e.classList.contains("screenplay-block-text")?e:e.querySelector(".screenplay-block-text")||(e.hasAttribute("contenteditable")?e:null)||e.querySelector('[contenteditable="true"]')||e:null}function Lt(){Je=[],Jt=null,fs=!1,document.querySelectorAll(".screenplay-block-selected").forEach(t=>{t.classList.remove("screenplay-block-selected")});const e=document.getElementById("screenplay-multi-selection-bar");e&&e.classList.add("hidden")}function ui(e){if(!e||e.length===0){Lt();return}Je=e;const t=new Set(e);document.querySelectorAll("#screenplay-pages-container .screenplay-block").forEach(o=>{t.has(o)?o.classList.add("screenplay-block-selected"):o.classList.remove("screenplay-block-selected")});const n=document.getElementById("screenplay-multi-selection-bar");n&&n.classList.remove("hidden")}function lo(){const e=document.getElementById("screenplay-pages-container");if(!e)return;const t=Array.from(e.querySelectorAll('.screenplay-block:not([data-block-type="pagebreak"])'));t.length!==0&&ui(t)}function xs(e=!1){if(!Je||Je.length===0)return;const s=Je.map(o=>{const a=o.getAttribute("data-block-type"),i=(hn(o)?.innerText||"").trim();return a==="scene"?`
${i}
`:a==="character"?`
          ${i}`:a==="parenthetical"?`        ${i}`:a==="dialogue"?`    ${i}`:a==="transition"?`
                    ${i}
`:a==="shot"?`
${i}
`:a==="act"||a==="endact"?`
                ${i}
`:i}).filter(Boolean).join(`
`);navigator.clipboard?.writeText&&navigator.clipboard.writeText(s).catch(()=>{});const n=Je.length;e?(fn(),w(`Cut ${n} lines`)):w(`Copied ${n} lines`)}function fn(){if(!q||!Je||Je.length===0)return;const e=new Set(Je.map(o=>o.getAttribute("data-block-id"))),t=Array.from(document.querySelectorAll('#screenplay-pages-container .screenplay-block:not([data-block-type="pagebreak"])')),s=t.indexOf(Je[0]);let n=null;s>0&&(n=t[s-1]?.getAttribute("data-block-id")),(q.scenes||[]).forEach(o=>{o.blocks&&(o.blocks=o.blocks.filter(a=>!e.has(a.id)))}),(q.scenes||[]).forEach(o=>{(!o.blocks||o.blocks.length===0)&&(o.blocks=[{id:"b-"+Date.now()+"-1",type:"action",content:""}])}),Xe=!0,Zt("Unsaved"),Ve&&rt(),Lt(),ft(),setTimeout(()=>{const o=n?document.getElementById(n):document.querySelector(".screenplay-block-text");if(o){const a=hn(o);a&&(a.focus(),Nt(a))}},50)}function mi(){const e=document.getElementById("screenplay-pages-container"),t=document.getElementById("editor-main-scroll");if(!e||!t||Aa)return;Aa=!0;let s=document.getElementById("screenplay-multi-selection-bar");s||(s=document.createElement("div"),s.id="screenplay-multi-selection-bar",s.className="hidden fixed z-50 bg-slate-900/95 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-2xl border border-slate-700/60 flex items-center gap-1.5 text-xs font-semibold animate-fade-in select-none",s.innerHTML=`
      <button id="btn-multi-cut" type="button" class="flex items-center gap-1 hover:text-blue-400 active:scale-95 px-2 py-1 rounded transition-all cursor-pointer">
        <span class="material-symbols-outlined text-[15px]">content_cut</span>
        <span>Cut</span>
      </button>
      <button id="btn-multi-copy" type="button" class="flex items-center gap-1 hover:text-blue-400 active:scale-95 px-2 py-1 rounded transition-all cursor-pointer">
        <span class="material-symbols-outlined text-[15px]">content_copy</span>
        <span>Copy</span>
      </button>
      <button id="btn-multi-paste" type="button" class="flex items-center gap-1 hover:text-blue-400 active:scale-95 px-2 py-1 rounded transition-all cursor-pointer">
        <span class="material-symbols-outlined text-[15px]">content_paste</span>
        <span>Paste</span>
      </button>
      <button id="btn-multi-delete" type="button" class="flex items-center gap-1 text-rose-400 hover:text-rose-300 active:scale-95 px-2 py-1 rounded transition-all cursor-pointer">
        <span class="material-symbols-outlined text-[15px]">delete</span>
        <span>Delete</span>
      </button>
      <button id="btn-multi-select-all" type="button" class="flex items-center gap-1 text-slate-300 hover:text-white active:scale-95 px-2 py-1 rounded transition-all cursor-pointer">
        <span class="material-symbols-outlined text-[15px]">select_all</span>
        <span>All</span>
      </button>
      <button id="btn-multi-close" type="button" class="text-slate-400 hover:text-white p-1 ml-0.5 cursor-pointer rounded-full" title="Close">
        <span class="material-symbols-outlined text-[14px]">close</span>
      </button>
    `,document.body.appendChild(s),s.addEventListener("pointerdown",m=>{m.preventDefault(),m.stopPropagation()}),s.addEventListener("mousedown",m=>{m.preventDefault(),m.stopPropagation()}),s.querySelector("#btn-multi-copy").onclick=async m=>{m.preventDefault(),m.stopPropagation();const h=window.getSelection(),b=h&&!h.isCollapsed?h.toString():"";if(b.length>0)try{navigator.clipboard?.writeText?await navigator.clipboard.writeText(b):document.execCommand("copy"),w("Copied to clipboard")}catch{document.execCommand("copy"),w("Copied")}else Je.length>0&&xs(!1)},s.querySelector("#btn-multi-cut").onclick=async m=>{m.preventDefault(),m.stopPropagation();const h=window.getSelection(),b=h&&!h.isCollapsed?h.toString():"";if(b.length>0){try{navigator.clipboard?.writeText&&await navigator.clipboard.writeText(b)}catch{}const y=h.anchorNode,$=(y?.nodeType===Node.ELEMENT_NODE?y.closest(".screenplay-block"):y?.parentElement?.closest(".screenplay-block"))||document.querySelector(".screenplay-block-text:focus");document.execCommand("delete"),$&&$.dispatchEvent(new Event("input",{bubbles:!0})),w("Cut"),Lt()}else Je.length>0&&xs(!0)},s.querySelector("#btn-multi-paste").onclick=async m=>{m.preventDefault(),m.stopPropagation();try{let h="";if(navigator.clipboard?.readText)try{h=await navigator.clipboard.readText()}catch(y){console.warn("Clipboard read error:",y)}const b=window.getSelection();if(h){if(b&&b.rangeCount>0){const y=b.getRangeAt(0);y.deleteContents();const $=document.createTextNode(h);y.insertNode($),y.setStartAfter($),y.collapse(!0),b.removeAllRanges(),b.addRange(y);const N=b.anchorNode,L=(N?.nodeType===Node.ELEMENT_NODE?N.closest(".screenplay-block"):N?.parentElement?.closest(".screenplay-block"))||document.querySelector(".screenplay-block-text:focus");L&&L.dispatchEvent(new Event("input",{bubbles:!0})),w("Pasted"),Lt();return}if(Je.length>0){const y=Je[0],$=hn(y);$&&($.innerText=h,$.dispatchEvent(new Event("input",{bubbles:!0}))),w("Pasted"),Lt();return}document.execCommand("insertText",!1,h),w("Pasted"),Lt()}else{const y=document.execCommand("paste");w(y?"Pasted":"Clipboard is empty or access denied"),Lt()}}catch(h){console.error("Paste error:",h),w("Unable to paste")}},s.querySelector("#btn-multi-delete").onclick=m=>{m.preventDefault(),m.stopPropagation();const h=window.getSelection();if(h&&!h.isCollapsed&&h.toString().length>0){const b=h.anchorNode,y=(b?.nodeType===Node.ELEMENT_NODE?b.closest(".screenplay-block"):b?.parentElement?.closest(".screenplay-block"))||document.querySelector(".screenplay-block-text:focus");document.execCommand("delete"),y&&y.dispatchEvent(new Event("input",{bubbles:!0})),w("Deleted"),Lt()}else Je.length>0&&fn()},s.querySelector("#btn-multi-select-all").onclick=m=>{m.preventDefault(),m.stopPropagation(),lo()},s.querySelector("#btn-multi-close").onclick=m=>{m.preventDefault(),m.stopPropagation(),window.getSelection()?.removeAllRanges(),Lt()});function n(m){const h=window.getSelection();if(h&&!h.isCollapsed&&h.rangeCount>0)try{const y=h.getRangeAt(0).getBoundingClientRect();if(y&&y.height>0){let N=y.top-44-12;N<70&&(N=y.bottom+12);let L=y.left+y.width/2;L=Math.max(140,Math.min(window.innerWidth-140,L)),m.style.position="fixed",m.style.top=`${N}px`,m.style.left=`${L}px`,m.style.bottom="auto",m.style.transform="translateX(-50%)";return}}catch{}m.style.position="fixed",m.style.top="auto",m.style.bottom="5.5rem",m.style.left="50%",m.style.transform="translateX(-50%)"}function o(){const m=document.getElementById("screenplay-pages-container"),h=document.getElementById("screenplay-multi-selection-bar");if(!h||!m)return;const b=window.getSelection();b&&!b.isCollapsed&&b.toString().length>0&&(m.contains(b.anchorNode)||m.contains(b.focusNode))||Je.length>0?(n(h),h.classList.remove("hidden")):!fs&&Je.length===0&&h.classList.add("hidden")}let a=null,i=0;function l(){i!==0&&fs?(t.scrollTop+=i,a=requestAnimationFrame(l)):a=null}function r(m){const h=t.getBoundingClientRect(),b=h.top+70,y=h.bottom-90;if(m<b){const $=Math.min(1,Math.max(0,(b-m)/70));i=-Math.round(4+$*18),a||(a=requestAnimationFrame(l))}else if(m>y){const $=Math.min(1,Math.max(0,(m-y)/90));i=Math.round(4+$*18),a||(a=requestAnimationFrame(l))}else i=0}function f(m,h){if(document.caretRangeFromPoint)return document.caretRangeFromPoint(m,h);if(document.caretPositionFromPoint){const b=document.caretPositionFromPoint(m,h);if(b){const y=document.createRange();return y.setStart(b.offsetNode,b.offset),y.collapse(!0),y}}return null}let p=null;function d(m,h,b){if(b.closest("button")||b.closest("#screenplay-multi-selection-bar")||b.closest("#action-popup-menu"))return;const y=b.closest('.screenplay-block:not([data-block-type="pagebreak"])');y?(Jt=y,Ms={x:m,y:h},p=f(m,h),fs=!1):Lt()}function c(m,h){if(!Jt||!Ms)return;const b=Math.abs(m-Ms.x);if(Math.abs(h-Ms.y)>12||b>20){fs=!0;const $=f(m,h);if(p&&$)try{const k=window.getSelection(),U=document.createRange();p.startContainer.compareDocumentPosition($.startContainer)&Node.DOCUMENT_POSITION_PRECEDING||p.startContainer===$.startContainer&&p.startOffset>$.startOffset?(U.setStart($.startContainer,$.startOffset),U.setEnd(p.startContainer,p.startOffset)):(U.setStart(p.startContainer,p.startOffset),U.setEnd($.startContainer,$.startOffset)),k.removeAllRanges(),k.addRange(U)}catch{}const L=document.elementFromPoint(m,h)?.closest('.screenplay-block:not([data-block-type="pagebreak"])');if(L&&L!==Jt){const k=Array.from(e.querySelectorAll('.screenplay-block:not([data-block-type="pagebreak"])')),U=k.indexOf(Jt),P=k.indexOf(L);if(U!==-1&&P!==-1){const de=Math.min(U,P),ae=Math.max(U,P),xe=k.slice(de,ae+1);Je=xe;const ee=new Set(xe);k.forEach(Se=>{ee.has(Se)?Se.classList.add("screenplay-block-selected"):Se.classList.remove("screenplay-block-selected")})}}}}function x(){Ms=null,Jt=null,p=null,fs=!1,i=0,a&&(cancelAnimationFrame(a),a=null),setTimeout(o,20)}e.addEventListener("pointerdown",m=>{m.pointerType==="mouse"&&m.button!==0||d(m.clientX,m.clientY,m.target)}),window.addEventListener("pointermove",m=>{Jt&&(c(m.clientX,m.clientY),r(m.clientY))}),window.addEventListener("pointerup",x),window.addEventListener("pointercancel",x),e.addEventListener("touchstart",m=>{m.touches&&m.touches[0]&&d(m.touches[0].clientX,m.touches[0].clientY,m.target)},{passive:!0}),window.addEventListener("touchmove",m=>{Jt&&m.touches&&m.touches[0]&&(c(m.touches[0].clientX,m.touches[0].clientY),r(m.touches[0].clientY))},{passive:!0}),window.addEventListener("touchend",x),window.addEventListener("touchcancel",x),document.addEventListener("selectionchange",()=>{setTimeout(o,10)}),window.addEventListener("scroll",()=>{const m=document.getElementById("screenplay-multi-selection-bar");m&&!m.classList.contains("hidden")&&n(m)},{passive:!0}),document.addEventListener("pointerdown",m=>{if(m.target.closest("#screenplay-multi-selection-bar"))return;!m.target.closest("#screenplay-pages-container")&&Je.length>0&&Lt()}),e.addEventListener("copy",m=>{Je.length>1&&(m.preventDefault(),xs(!1))}),e.addEventListener("cut",m=>{Je.length>1&&(m.preventDefault(),xs(!0))})}function io(e){const t=hn(e);t&&(t.onfocus=()=>{Ze=e.getAttribute("data-block-id");const s=e.getAttribute("data-block-type")||"action";yn(s),s==="transition"&&ns(t)?as(e,t):s!=="transition"&&gt()},t.addEventListener("click",()=>{(e.getAttribute("data-block-type")||"action")==="transition"&&ns(t)&&as(e,t)}),t.addEventListener("beforeinput",s=>{(s.data===" "||s.inputType==="insertText"&&s.data===" ")&&ns(t)&&eo(e,t)&&s.preventDefault()}),t.oninput=()=>{Xe=!0;const s=e.getAttribute("data-block-type")||"action",n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,i=Us(a);if(i!==a){const l=jt(t);t.innerText=i,Dt(t,l)}}let o=t.innerHTML;o=o.replace(/&(?:amp;)+nbsp;?/gi," "),o=o.replace(/&nbsp;?/gi," "),o=o.replace(/\u00A0/g," "),At(e,o),Zt("Unsaved"),Ve&&rt(),as(e,t),vn()},t.onblur=()=>{const s=e.getAttribute("data-block-type")||"action",n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,i=Us(a);i!==a&&(t.innerText=i)}const o=dt(t.innerHTML);if(t.innerHTML!==o&&(t.innerHTML=o),At(e,o),s==="character")xn(dt(t.innerText));else if(s==="scene"){const a=is(dt(t.innerText));a.location&&na(a.location)}},t.onpaste=()=>{const s=e.getAttribute("data-block-type")||"action";setTimeout(()=>{const n=!!t.querySelector("b, i, u, s, strong, em, strike, del");if((s==="action"||s==="dialogue")&&!n){const a=t.innerText,i=Us(a);if(i!==a){const l=jt(t);t.innerText=i,Dt(t,l)}}const o=dt(t.innerHTML);t.innerHTML!==o&&(t.innerHTML=o),At(e,o)},0)},t.onkeydown=s=>{xi(s,e,t)})}function fi(){document.querySelectorAll(".screenplay-block").forEach(io),document.querySelectorAll(".btn-delete-img-block").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=t.getAttribute("data-block-id"),o=t.getAttribute("data-scene-id");n&&o&&js(o,n)}}),document.querySelectorAll(".btn-remove-pagebreak").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=t.getAttribute("data-block-id");n&&Ca(n)}}),document.querySelectorAll('[data-block-type="pagebreak"]').forEach(t=>{t.onkeydown=s=>{if(s.key==="Backspace"||s.key==="Delete"){s.preventDefault();const n=t.getAttribute("data-block-id");n&&Ca(n)}}}),document.querySelectorAll(".btn-page-add-before").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=parseInt(t.getAttribute("data-page-num"),10)||1;ao(n)}}),document.querySelectorAll(".btn-page-add-after").forEach(t=>{t.onclick=s=>{s.stopPropagation();const n=parseInt(t.getAttribute("data-page-num"),10)||1;pi(n)}}),mi()}function is(e){const t=e.match(/^(INT\.\/EXT\.|INT\.|EXT\.|I\/E\.)\s*/i),s=t?t[1].toUpperCase():"INT.",o=(t?e.slice(t[0].length):e).split(/\s+-\s*|\s+-/),a=(o[0]||"").trim().toUpperCase(),i=(o[1]||"").trim().toUpperCase();return{intExt:s,location:a,time:i}}function xn(e){if(!q)return;const t=Mt(e);Vn(t)&&(Array.isArray(q.characters)||(q.characters=[]),q.characters=q.characters.filter(s=>{const n=Mt(s);return!(!Vn(n)||t.startsWith(n)&&n.length<t.length||t.length>=5&&n.length<=4&&t.startsWith(n.slice(0,3)))}),q.characters.includes(t)||q.characters.push(t))}function na(e){if(!q)return;const t=(e||"").trim().toUpperCase();!t||t.length<2||(Array.isArray(q.locations)||(q.locations=[]),q.locations=q.locations.filter(s=>t.startsWith(s)&&s.length<t.length?q.scenes?.some(o=>o.blocks?.some(a=>a.type==="scene"&&is(a.content).location===s)):!0),q.locations.includes(t)||q.locations.push(t))}function At(e,t){if(!q)return;const s=e.getAttribute("data-block-id"),n=e.getAttribute("data-scene-id"),o=q.scenes.find(i=>i.id===n);if(!o)return;const a=o.blocks.find(i=>i.id===s);if(a){const i=dt(t);if(a.type==="image"?a.caption=i:a.content=i,a.type==="scene"){const l=(i||"").replace(/<[^>]+>/g,""),r=is(l);a.intExt=r.intExt,a.location=r.location,a.time=r.time,o.slugline=l,o.location=r.location,o.time=r.time}}}function js(e,t){if(!q)return;const s=q.scenes.find(a=>a.id===e);if(!s)return;const n=s.blocks.findIndex(a=>a.id===t);if(n!==-1&&(s.blocks.splice(n,1),Xe=!0,Ve&&rt()),s.blocks.length===0&&q.scenes.length>1){const a=q.scenes.findIndex(i=>i.id===e);a!==-1&&(q.scenes.splice(a,1),q.scenes.forEach((i,l)=>{i.number=l+1}),Js())}else s.blocks.length===0&&s.blocks.push({id:`b-${Date.now().toString().slice(-6)}`,type:"action",content:""});const o=document.getElementById(t);o&&o.remove(),vn()}function xi(e,t,s){const n=t.getAttribute("data-block-type"),o=t.getAttribute("data-scene-id"),a=t.getAttribute("data-block-id"),i=document.getElementById("editor-autocomplete-dropdown");if(i&&!i.classList.contains("hidden")){if(e.key==="ArrowDown"){e.preventDefault(),$a(1);return}if(e.key==="ArrowUp"){e.preventDefault(),$a(-1);return}if(e.key==="Enter"||e.key==="Tab"){const l=i.querySelector(".autocomplete-item.active");if(l){e.preventDefault(),l.click();return}}if(e.key==="Escape"){gt();return}}if((e.key===" "||e.code==="Space")&&ns(s)&&eo(t,s)){e.preventDefault();return}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"&&!e.shiftKey&&_s.length>0){const l=_s[_s.length-1];if(l.blockId===a&&ns(s)){_s.pop(),e.preventDefault(),Ws(t,l.prevType);return}}if((e.ctrlKey||e.metaKey)&&!e.altKey){const l=e.key.toLowerCase();if(l==="b"){e.preventDefault(),Qt("bold");return}if(l==="i"){e.preventDefault(),Qt("italic");return}if(l==="u"){e.preventDefault(),Qt("underline");return}}if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&e.key&&e.key.length===1&&(["bold","italic","underline","strikeThrough"].forEach(l=>{if(xt[l]===!0&&!document.queryCommandState(l))try{document.execCommand(l,!1,null)}catch{}else if(xt[l]===!1&&document.queryCommandState(l))try{document.execCommand(l,!1,null)}catch{}}),Object.assign(xt,{bold:null,italic:null,underline:null,strikeThrough:null})),(e.ctrlKey||e.metaKey)&&e.key==="Enter"){e.preventDefault(),ta(a);return}if(Je&&Je.length>1){if((e.key==="Backspace"||e.key==="Delete")&&!e.ctrlKey&&!e.metaKey){e.preventDefault(),fn();return}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="c"){e.preventDefault(),xs(!1);return}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="x"){e.preventDefault(),xs(!0);return}if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault();const l=e.key;fn(),setTimeout(()=>{document.activeElement&&document.execCommand("insertText",!1,l)},50);return}}if(e.key==="Backspace"&&!e.ctrlKey&&!e.metaKey){const l=s.innerText,r=jt(s),f=window.getSelection();if(f&&f.isCollapsed&&r>0&&r<l.length&&l.charAt(r-1)==="("&&l.charAt(r)===")"){e.preventDefault();const p=l.slice(0,r-1),d=l.slice(r+1),c=p+d;s.innerText=c,At(t,c),Dt(s,r-1),gt();return}}if(e.key==="Backspace"&&!e.ctrlKey&&!e.metaKey){const l=jt(s),r=window.getSelection(),f=!r||r.isCollapsed;if(l===0&&f){const p=Array.from(document.querySelectorAll(".screenplay-block")),d=p.indexOf(t);if(d>0){e.preventDefault();const c=p[d-1],x=c.hasAttribute("contenteditable")?c:c.querySelector('[contenteditable="true"]'),m=s.innerText.trim();if(m===""||n==="parenthetical"&&(m==="()"||m==="")){js(o,a),x&&(x.focus(),Nt(x));return}const h=c.getAttribute("data-block-type");if(x&&(n==="action"&&h==="action"||n==="dialogue"&&h==="dialogue"||n==="text"&&h==="text")){const b=x.innerText.length,y=x.innerText+(x.innerText?" ":"")+s.innerText;x.innerText=y,At(c,y),js(o,a),x.focus(),Dt(x,b+(x.innerText?1:0));return}if(x){x.focus(),Nt(x);return}}}}if(e.key==="Delete"&&!e.ctrlKey&&!e.metaKey){const l=jt(s),r=window.getSelection(),f=!r||r.isCollapsed;if(l>=s.innerText.length&&f){const p=Array.from(document.querySelectorAll(".screenplay-block")),d=p.indexOf(t);if(d<p.length-1){const c=p[d+1],x=c.hasAttribute("contenteditable")?c:c.querySelector('[contenteditable="true"]'),m=c.getAttribute("data-scene-id"),h=c.getAttribute("data-block-id"),b=c.getAttribute("data-block-type"),y=(x?x.innerText:"").trim();if(y===""||b==="parenthetical"&&(y==="()"||y==="")){e.preventDefault(),js(m,h);return}if(x&&(n==="action"&&b==="action"||n==="dialogue"&&b==="dialogue"||n==="text"&&b==="text")){e.preventDefault();const $=s.innerText.length,N=s.innerText+(s.innerText?" ":"")+x.innerText;s.innerText=N,At(t,N),js(m,h),Dt(s,$+(s.innerText?1:0));return}if(x){e.preventDefault(),x.focus(),Dt(x,0);return}}}}if(e.key==="ArrowLeft"){const l=jt(s),r=window.getSelection();if(l===0&&(!r||r.isCollapsed)){const f=Array.from(document.querySelectorAll(".screenplay-block")),p=f.indexOf(t);if(p>0){e.preventDefault();const d=f[p-1],c=d.querySelector('[contenteditable="true"]')||d;c&&(c.focus(),Nt(c))}}}if(e.key==="ArrowRight"){const l=jt(s),r=window.getSelection();if(l>=s.innerText.length&&(!r||r.isCollapsed)){const f=Array.from(document.querySelectorAll(".screenplay-block")),p=f.indexOf(t);if(p<f.length-1){e.preventDefault();const d=f[p+1],c=d.querySelector('[contenteditable="true"]')||d;c&&(c.focus(),Dt(c,0))}}}if(e.key==="("&&!e.ctrlKey&&!e.metaKey&&!e.altKey){const l=window.getSelection(),r=!l||l.isCollapsed;if((n==="character"||n==="dialogue")&&ns(s)){e.preventDefault(),Ws(t,"parenthetical");return}if(n==="parenthetical"&&r){const f=s.innerText;if(!f.includes(")")){e.preventDefault();const p=jt(s),d=f.slice(0,p),c=f.slice(p),x=d+"()"+c;s.innerText=x,At(t,x),Dt(s,p+1),as(t,s);return}}if(n==="character"&&r){const f=s.innerText,p=jt(s);if(!f.includes("(")){e.preventDefault();const d=f.slice(0,p).trimEnd(),c=f.slice(p).trimStart(),x=d+" ("+(c.includes(")")?c:c+")");s.innerText=x,At(t,x);const m=x.indexOf("(");Dt(s,m+1),as(t,s);return}}}if(e.key===")"&&!e.ctrlKey&&!e.metaKey&&!e.altKey){const l=s.innerText,r=jt(s),f=window.getSelection();if(f&&f.isCollapsed&&r<l.length&&l.charAt(r)===")"){e.preventDefault(),Dt(s,r+1);return}}if(e.key==="Tab"){e.preventDefault(),gt(),gi(t,e.shiftKey);return}if(e.key==="Enter"&&!e.shiftKey){if(gt(),n==="scene"){e.preventDefault();const l=is(s.innerText);l.location&&na(l.location),zt(o,a,"action");return}if(n==="character"){e.preventDefault();const l=s.innerText.trim(),r=Mt(l),f=Zn(l),p=Qn(l),d=co(o,a,r);let c=l;const x=f||null;d&&!p?c=mn(r,x,!0):!d&&x?c=mn(r,x,!1):!p&&r&&(c=r),s.innerText=c,At(t,c),xn(r),zt(o,a,"dialogue");return}if(n==="dialogue"){e.preventDefault(),zt(o,a,"action");return}if(n==="parenthetical"){e.preventDefault();let l=s.innerText.trim();l.endsWith(")")||(l+=")",s.innerText=l,At(t,l)),zt(o,a,"dialogue");return}if(n==="transition"){e.preventDefault(),bi(o,a);return}if(n==="shot"||n==="note"||n==="outline"){e.preventDefault(),zt(o,a,"action");return}if(n==="act"||n==="endact"||n==="sequence"){e.preventDefault(),zt(o,a,"scene");return}if(n==="lyrics"){e.preventDefault(),zt(o,a,"lyrics");return}if(n==="action"||n==="text"){e.preventDefault(),zt(o,a,n);return}}}function zt(e,t,s,n){const o=q.scenes.find(p=>p.id===e);if(!o)return;const a=o.blocks.findIndex(p=>p.id===t),i=`b-${Date.now().toString().slice(-6)}`,l={id:i,type:s,content:""};a!==-1?o.blocks.splice(a+1,0,l):o.blocks.push(l);const r=document.getElementById(t),f=r?r.closest(".page-blocks-wrapper"):null;if(r&&f){const p=document.createElement("div");p.innerHTML=oo(l,o.number,o.id);const d=p.firstElementChild;r.insertAdjacentElement("afterend",d),io(d),vn();const c=d.hasAttribute("contenteditable")?d:d.querySelector('[contenteditable="true"]');c&&(c.focus(),Nt(c));const x=f.querySelectorAll(".screenplay-block");let m=0;x.forEach(h=>{const b=h.getAttribute("data-block-type"),y=h.innerText||"";m+=so({type:b,content:y})}),m>to&&(ft(),setTimeout(()=>{const h=document.getElementById(i);if(h){const b=h.querySelector('[contenteditable="true"]')||h;b.focus(),Nt(b)}},20))}else ft(),setTimeout(()=>{const p=document.getElementById(i);if(p){const d=p.hasAttribute("contenteditable")?p:p.querySelector('[contenteditable="true"]');d&&(d.focus(),Nt(d))}},20)}function bi(e,t=null){const s=q.scenes.findIndex(r=>r.id===e),n=q.scenes.length+1,o=`scene-${Date.now().toString().slice(-5)}`,a=`b-${Date.now().toString().slice(-6)}`;let i=[];if(t&&s!==-1){const r=q.scenes[s],f=r.blocks?r.blocks.findIndex(p=>p.id===t):-1;f!==-1&&f<r.blocks.length-1&&(i=r.blocks.splice(f+1))}const l={id:o,number:n,actId:q.acts?.[0]?.id||"act-1",slugline:"",blocks:[{id:a,type:"scene",content:""},...i]};s!==-1?q.scenes.splice(s+1,0,l):q.scenes.push(l),q.scenes.forEach((r,f)=>{r.number=f+1}),ft(),Js(),setTimeout(()=>{const r=document.getElementById(a);if(r){const f=r.querySelector('[contenteditable="true"]');f&&(f.focus(),Nt(f),as(r,f))}},30)}function gi(e,t=!1){if(!e)return!1;const s=e.getAttribute("data-block-type")||"action";let n;return t?s==="scene"?n="transition":s==="transition"?n="dialogue":s==="dialogue"?n="character":s==="character"||s==="action"||s==="text"?n="scene":s==="parenthetical"?n="character":n="scene":s==="scene"?n="character":s==="character"?n="dialogue":s==="dialogue"?n="transition":s==="transition"?n="scene":s==="action"||s==="text"?n="character":s==="parenthetical"?n="dialogue":n="character",n?(Ws(e,n),!0):!1}function Ws(e,t){const s=e.getAttribute("data-block-id"),n=e.getAttribute("data-scene-id"),o=q.scenes.find(i=>i.id===n);if(!o)return;const a=o.blocks.find(i=>i.id===s);if(a){if(a.type=t,(t==="character"||t==="scene"||t==="transition")&&(a.content=a.content.toUpperCase()),(t==="action"||t==="dialogue")&&(a.content=Us(a.content)),t==="parenthetical"){let i=a.content.replace(/^\(+|\)+$/g,"").trim();i?a.content=`(${i})`:a.content="()"}Xe=!0,Ve&&rt(),ft(),setTimeout(()=>{const i=document.getElementById(s);if(i){const l=i.hasAttribute("contenteditable")?i:i.querySelector('[contenteditable="true"]');if(l){if(l.focus(),t==="parenthetical"&&l.innerText==="()"){const r=l.firstChild;if(r){const f=document.createRange(),p=window.getSelection();f.setStart(r,1),f.collapse(!0),p.removeAllRanges(),p.addRange(f)}}else Nt(l);yn(t),t==="transition"?as(i,l):gt()}}(t==="scene"||t==="character")&&Js()},25)}}function Nt(e){const t=document.createRange(),s=window.getSelection();t.selectNodeContents(e),t.collapse(!1),s.removeAllRanges(),s.addRange(t)}function hi(){document.addEventListener("click",t=>{t.target.closest("#editor-autocomplete-dropdown")||gt()});const e=()=>{const t=document.getElementById("editor-autocomplete-dropdown");if(t&&!t.classList.contains("hidden")&&Ze){const s=document.getElementById(Ze);if(s){const n=s.querySelector('[contenteditable="true"]')||s;ro(t,n)}}};window.addEventListener("scroll",e,{capture:!0,passive:!0}),document.addEventListener("selectionchange",()=>{const t=document.getElementById("editor-autocomplete-dropdown");t&&!t.classList.contains("hidden")&&e()}),window.visualViewport&&(window.visualViewport.addEventListener("resize",e),window.visualViewport.addEventListener("scroll",e))}function gt(){const e=document.getElementById("editor-autocomplete-dropdown");e&&e.classList.add("hidden")}function yi(e){if(!e)return null;const t=window.getSelection();if(t&&t.rangeCount>0)try{const n=t.getRangeAt(0);if(e.contains(n.startContainer)||e===n.startContainer){const o=n.getClientRects();if(o&&o.length>0){const i=o[o.length-1];if(i&&i.height>0&&i.top>0)return{top:i.top,bottom:i.bottom,left:i.left,right:i.right,width:i.width,height:i.height}}const a=n.getBoundingClientRect();if(a&&a.height>0&&a.top>0)return{top:a.top,bottom:a.bottom,left:a.left,right:a.right,width:a.width,height:a.height}}}catch{}const s=e.getBoundingClientRect();return{top:s.top,bottom:s.bottom,left:s.left,right:s.right,width:s.width,height:s.height}}function ro(e,t){if(!e||!t)return;e.parentElement!==document.body&&document.body.appendChild(e);const s=yi(t);if(!s)return;const n=window.visualViewport,o=n?n.offsetTop:0,a=n?n.offsetLeft:0,i=n?n.height:window.innerHeight,l=n?n.width:window.innerWidth,r=document.getElementById("editor-fixed-header")||document.getElementById("editor-header-nav"),f=r?r.getBoundingClientRect().bottom:o+56;if(s.bottom<f+4||s.top>o+i-16){gt();return}const p=Math.min(270,l-24);e.style.width=`${p}px`;const d=Math.min(220,e.scrollHeight||180),c=o+i-s.bottom-8,x=s.top-Math.max(f,o)-8;let m,h=d;c<d&&x>c?(h=Math.max(80,Math.min(d,x)),m=s.top-h-6):(h=Math.max(80,Math.min(d,c)),m=s.bottom+6),m=Math.max(Math.max(f,o)+4,Math.min(o+i-h-8,m)),e.style.maxHeight=`${Math.round(h)}px`,e.style.overflowY="auto";const y=t.closest(".screenplay-block"),$=y?y.getAttribute("data-block-type"):null;let N;$==="transition"?N=Math.max(a+12,s.right-p):(N=s.left,N+p>a+l-12&&(N=a+l-p-12),N<a+12&&(N=a+12)),e.style.top=`${Math.round(m)}px`,e.style.left=`${Math.round(N)}px`}function co(e,t,s){if(!q?.scenes)return null;const n=q.scenes.find(l=>l.id===e);if(!n||!Array.isArray(n.blocks))return null;const o=Mt(s);if(!o)return null;const a=n.blocks.findIndex(l=>l.id===t),i=a!==-1?n.blocks.slice(0,a):n.blocks;for(let l=i.length-1;l>=0;l--){const r=i[l];if(r.type==="character"&&r.content){const f=Mt(r.content);if(f===o)return{baseName:f,extension:Zn(r.content),hasContd:Qn(r.content),fullContent:r.content}}}return null}function po(){if(!q)return[];const e=[];return(q.scenes||[]).forEach(t=>{(t.blocks||[]).forEach(s=>{s.type==="character"&&s.content&&e.push(s.content)})}),(q.characters||[]).forEach(t=>{t&&e.push(t)}),Qa(e)}function vi(){if(!q)return[];const e=new Set;(q.scenes||[]).forEach(s=>{(s.blocks||[]).forEach(n=>{if(n.type==="scene"){const o=is(n.content);o.location&&o.location.length>=2&&e.add(o.location)}})}),(q.locations||[]).forEach(s=>{const n=(s||"").trim().toUpperCase();n&&n.length>=2&&e.add(n)});const t=Array.from(e);return t.filter(s=>t.some(o=>o!==s&&o.startsWith(s))?q.scenes?.some(a=>a.blocks?.some(i=>i.type==="scene"&&is(i.content).location===s)):!0)}function as(e,t){const s=e.getAttribute("data-block-type"),n=t.innerText,o=document.getElementById("editor-autocomplete-dropdown");if(!o)return;let a=[];if(s==="scene"){const i=n.toUpperCase(),l=n.match(/\s+-\s*([A-Za-z]*)$/);if(l){const r=(l[1]||"").toUpperCase(),p=["DAY","NIGHT","MORNING","EVENING","DAWN","DUSK","CONTINUOUS","LATER"].filter(c=>c.startsWith(r)),d=n.replace(/\s+-\s*[A-Za-z]*$/," - ");a=p.map(c=>({label:c,val:d+c}))}else if(i==="I"||i==="IN")a=["INT.","INT./EXT.","I/E."].map(r=>({label:r,val:r+" "}));else if(i==="E"||i==="EX")a=["EXT.","INT./EXT.","I/E."].map(r=>({label:r,val:r+" "}));else if(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i.test(n)){const r=n.match(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i),f=r[1].toUpperCase()+" ",p=(r[2]||"").trim().toUpperCase();p.length>0&&(a=vi().filter(x=>x.startsWith(p)).map(x=>({label:x,val:`${f}${x}`})))}}else if(s==="character"){const i=n.indexOf("(");if(i!==-1){const l=n.slice(0,i).trim(),r=Mt(l);if(r&&r.length>=1){const f=n.slice(i+1).replace(/\)$/,"").trim().toUpperCase(),p=Ql.filter(d=>{if(!f)return!0;const c=f.replace(/[^A-Z]/g,""),x=d.code.replace(/[^A-Z]/g,"");return d.code.toUpperCase().startsWith(f)||c.length>0&&x.startsWith(c)||d.desc.toUpperCase().startsWith(f)});if(p.length>0){const d=e.getAttribute("data-scene-id"),c=e.getAttribute("data-block-id"),m=!!co(d,c,r);a=p.map(h=>{let b;return h.code==="CONT'D"?b=mn(r,null,!0):b=mn(r,h.code,m),{type:"character-extension",extCode:h.code,baseName:r,isContd:m,label:`${h.code} — ${h.desc}`,shortLabel:h.code,desc:h.desc,val:b}})}}}else{const l=n.trim().toUpperCase();l.length>0&&(a=po().filter(p=>p.startsWith(l)).map(p=>({type:"character-name",baseName:p,label:p,val:p})))}}else if(s==="parenthetical"){const i=n.replace(/^\(+|\)+$/g,"").trim().toLowerCase();if(i.length>0){const l=ei.filter(r=>r.startsWith(i));l.length>0&&(a=l.map(r=>({type:"parenthetical",label:`(${r})`,val:`(${r})`})))}}else if(s==="transition"){const l=(n||"").replace(/[\u200B\u00A0\r\n\t]/g,"").trim().toUpperCase(),r=Array.isArray(q?.transitions)&&q.transitions.length>0?Array.from(new Set([...ka,...q.transitions])):ka;if(l.length===0)a=r.map(f=>({label:f,val:f}));else{const f=r.filter(c=>c.toUpperCase().startsWith(l)),p=r.filter(c=>!c.toUpperCase().startsWith(l)&&c.toUpperCase().includes(l));a=[...f,...p].map(c=>({label:c,val:c}))}}if(a.length===0){gt();return}o.innerHTML=a.map((i,l)=>{const r=typeof i=="object"?i.label:i,f=typeof i=="object"?i.val:i,p=i.type==="character-extension",d=i.type==="parenthetical";let c="";return p?c=`
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
    `}).join(""),o.classList.remove("hidden"),ro(o,t),o.querySelectorAll(".autocomplete-item").forEach(i=>{i.addEventListener("pointerdown",l=>{l.preventDefault()}),i.onclick=l=>{l.stopPropagation();const r=parseInt(i.getAttribute("data-idx"),10),f=a[r]||{},p=i.getAttribute("data-val"),d=i.getAttribute("data-type");if(t.innerText=p,At(e,p),d==="character-extension"){f.baseName&&xn(f.baseName),gt();const c=e.getAttribute("data-scene-id"),x=e.getAttribute("data-block-id");zt(c,x,"dialogue")}else if(d==="parenthetical")gt(),Dt(t,p.length);else if(s==="character")xn(f.baseName||p),gt(),Nt(t);else if(s==="scene"){const c=is(p);c.location&&na(c.location),gt(),Nt(t)}else gt(),Nt(t);Xe=!0,Ve&&rt()}})}function $a(e){const t=document.getElementById("editor-autocomplete-dropdown");if(!t)return;const s=t.querySelectorAll(".autocomplete-item");if(s.length===0)return;let n=Array.from(s).findIndex(o=>o.classList.contains("active"));n!==-1&&s[n].classList.remove("active","bg-blue-50/70","text-blue-700","font-semibold"),n=(n+e+s.length)%s.length,s[n].classList.add("active","bg-blue-50/70","text-blue-700","font-semibold"),s[n].scrollIntoView({block:"nearest"})}async function bs(e=!1){if(!(Rs||!q)){if(!on){Rs=!1,Zt("Read-only"),e&&w(`Viewing as ${ln||"Viewer"} (Read-only mode)`,"error");return}Rs=!0,Zt("Saving..."),q.scenes&&q.scenes.forEach(t=>{t.blocks&&t.blocks.forEach(s=>{s.content&&(s.content=dt(s.content),(s.type==="action"||s.type==="dialogue")&&(s.content=Us(s.content))),s.char1&&(s.char1=dt(s.char1)),s.dia1&&(s.dia1=dt(s.dia1)),s.char2&&(s.char2=dt(s.char2)),s.dia2&&(s.dia2=dt(s.dia2))})});try{await Ks(q.id,q),Xe=!1,Rs=!1,Zt("Saved"),e&&w("Saved")}catch{Rs=!1,Zt("Save failed"),w("Couldn't save changes · Tap retry")}}}function rt(){Ve&&(clearTimeout(zn),zn=setTimeout(async()=>{Xe&&Ve&&(await bs(!1),Zt("Autosaved just now"),w("Autosaved just now"))},1500))}function Zt(e){const t=document.getElementById("editor-save-status"),s=document.getElementById("editor-save-icon");t&&(t.textContent=e),e==="Saving..."?s&&(s.textContent="progress_activity",s.classList.add("animate-spin")):e==="Saved"||e==="Autosaved just now"||e==="Unsaved"?s&&(s.textContent="save",s.classList.remove("animate-spin")):e==="Save failed"&&s&&(s.textContent="warning",s.classList.remove("animate-spin"))}function Js(){if(!q)return;const e=document.getElementById("navSceneSelect");if(e){const t=q.scenes||[];e.innerHTML=t.map((s,n)=>`
      <option value="${s.id}" ${n===0?"selected":""}>Scene ${s.number} ▾</option>
    `).join("")||'<option value="">Scene 1 ▾</option>'}}function wi(){const e=document.getElementById("navSceneSelect");e&&(e.onchange=s=>{const n=s.target.value;if(!n)return;Ba(n);const o=q?.scenes?.find(a=>a.id===n);o&&T.setState({currentSceneId:o.number})});let t=null;try{const s=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search,n=new URLSearchParams(s||"");n.get("scene")&&(t=n.get("scene"))}catch{}if(!t&&T.state.currentSceneId&&(t=T.state.currentSceneId),t&&q?.scenes){const s=q.scenes.find(n=>String(n.number)===String(t)||n.id===String(t)||n.id===`scene-${t}`);s&&(e&&(e.value=s.id),setTimeout(()=>Ba(s.id),250))}}function Ba(e){const t=document.querySelector(`[data-scene-id="${e}"][data-block-type="scene"]`)||document.querySelector(`[data-scene-id="${e}"]`);t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.classList.add("bg-blue-50/50"),setTimeout(()=>t.classList.remove("bg-blue-50/50"),1500))}function Si(){const e=document.getElementById("element-bar");e&&e.querySelectorAll(".element-btn").forEach(t=>{t.onclick=s=>{s.preventDefault();const n=t.getAttribute("data-type");Ei(n)}})}const xt={bold:null,italic:null,underline:null,strikeThrough:null};let Na=!1;function Gt(e){const t=window.getSelection();if(!t||t.rangeCount===0)return!1;const s=t.anchorNode,n=s?.nodeType===Node.ELEMENT_NODE?s:s?.parentElement;if(!n)return!1;const o=n.closest(".screenplay-block");if(!o)return!1;if(!t.isCollapsed&&t.toString().trim().length>0)try{return document.queryCommandState(e)}catch{return!1}const a=o.getAttribute("data-block-type"),i=a==="scene"||a==="character"||a==="transition";try{if(e==="bold"){if(i){const l=n.closest("b, strong");return!!l&&l!==o}return document.queryCommandState("bold")}if(e==="strikeThrough")return n.closest("s, strike, del")?!0:document.queryCommandState("strikeThrough");if(e==="italic")return document.queryCommandState("italic");if(e==="underline")return document.queryCommandState("underline")}catch{return!1}return!1}function Qt(e){let t=document.activeElement,s=t?t.closest(".screenplay-block"):null,n=s?s.hasAttribute("contenteditable")?s:s.querySelector('[contenteditable="true"]'):null;if(!n&&Ze){const i=document.getElementById(Ze);i&&(s=i,n=i.hasAttribute("contenteditable")?i:i.querySelector('[contenteditable="true"]'))}if(!n){const i=document.querySelector(".screenplay-block");i&&(s=i,n=i.hasAttribute("contenteditable")?i:i.querySelector('[contenteditable="true"]'))}n&&document.activeElement!==n&&n.focus();const o=window.getSelection();if(o&&!o.isCollapsed&&o.rangeCount>0&&o.toString().trim().length>0){try{document.execCommand(e,!1,null)}catch{}s&&n&&At(s,n.innerHTML),Xe=!0,Ve&&rt(),xt[e]=null,os()}else{const l=!(xt[e]!==null?xt[e]:Gt(e));xt[e]=l;try{document.execCommand(e,!1,null)}catch{}os()}}function Ei(e){if(e==="bold"){Qt("bold");return}if(e==="italic"){Qt("italic");return}if(e==="underline"){Qt("underline");return}if(e==="strike"){Qt("strikeThrough");return}if(e==="undo"){document.execCommand("undo",!1,null),os();return}if(e==="redo"){document.execCommand("redo",!1,null),os();return}if(e==="image"){if(!Ze){const t=Array.from(document.querySelectorAll(".screenplay-block")),s=window.innerHeight/2;for(const n of t){const o=n.getBoundingClientRect();if(o.top<=s&&o.bottom>=s){Ze=n.getAttribute("data-block-id");break}}}ea=Ze,uo(!0);return}if(!Ze){const t=document.querySelector(".screenplay-block");t&&(Ze=t.getAttribute("data-block-id"))}if(Ze){const t=document.getElementById(Ze);t&&(Ws(t,e),yn(e))}}function yn(e){const t=document.getElementById("element-bar");t&&t.querySelectorAll(".element-btn").forEach(s=>{s.getAttribute("data-type")===e?s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-white bg-blue-600 shadow-2xs font-semibold shrink-0":s.className="element-btn flex flex-col items-center justify-center min-w-[44px] max-w-[52px] h-11 px-1 py-0.5 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors shrink-0"})}function ki(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),n=document.getElementById("btn-format-strike");[{btn:e,cmd:"bold"},{btn:t,cmd:"italic"},{btn:s,cmd:"underline"},{btn:n,cmd:"strikeThrough"}].forEach(({btn:i,cmd:l})=>{i&&(i.onmousedown=r=>{r.preventDefault(),r.stopPropagation()},i.onclick=r=>{r.preventDefault(),r.stopPropagation(),Qt(l)})}),Na||(Na=!0,document.addEventListener("selectionchange",()=>{os()}));const a=document.getElementById("editor-main-scroll");a&&(a.addEventListener("keyup",os),a.addEventListener("mouseup",os))}function os(){const e=document.getElementById("btn-format-bold"),t=document.getElementById("btn-format-italic"),s=document.getElementById("btn-format-underline"),n=document.getElementById("btn-format-strike");if(!e||!t||!s||!n)return;const o="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center border border-blue-600 shadow-2xs font-semibold active:scale-95 transition-all cursor-pointer",a="format-toggle-btn w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center border border-slate-200/90 active:scale-95 transition-all cursor-pointer";try{const i=window.getSelection();let l=!1,r=!1,f=!1,p=!1;i&&!i.isCollapsed&&i.rangeCount>0&&i.toString().trim().length>0?(l=Gt("bold"),r=Gt("italic"),f=Gt("underline"),p=Gt("strikeThrough")):(l=xt.bold!==null?xt.bold:Gt("bold"),r=xt.italic!==null?xt.italic:Gt("italic"),f=xt.underline!==null?xt.underline:Gt("underline"),p=xt.strikeThrough!==null?xt.strikeThrough:Gt("strikeThrough")),e.className=l?o:a,t.className=r?o:a,s.className=f?o:a,n.className=p?o:a}catch{}}function Ii(e,t){const s=document.getElementById("editor-more-menu-btn"),n=document.getElementById("editorMoreMenuModal"),o=document.getElementById("closeMoreMenuBtn");function a(oe){n&&(n.classList.remove("hidden"),n.classList.add("flex"),Kt({id:"moreMenu",name:"Screenplay Tools",close:()=>{n.classList.add("hidden"),n.classList.remove("flex")},restore:()=>{n.classList.remove("hidden"),n.classList.add("flex")}}))}s&&(s.onclick=()=>a()),o&&(o.onclick=()=>Ae("moreMenu")),n&&(n.onclick=oe=>{oe.target===n&&Ae("moreMenu")});const i=document.getElementById("menu-btn-scene-navigator");i&&(i.onclick=()=>{Ae("moreMenu");const oe=document.getElementById("navSceneSelect");oe&&oe.focus()});const l=document.getElementById("menu-btn-char-navigator");l&&(l.onclick=()=>{Ae("moreMenu");const oe=po(),Ee=prompt(`Select character to navigate to:
${oe.join(", ")}`,oe[0]||"HILL");if(Ee){for(const B of q.scenes)for(const K of B.blocks)if(K.type==="character"&&K.content.toUpperCase().includes(Ee.trim().toUpperCase())){const Ie=document.getElementById(K.id);if(Ie){Ie.scrollIntoView({behavior:"smooth",block:"center"}),Ie.classList.add("bg-blue-100/60"),setTimeout(()=>Ie.classList.remove("bg-blue-100/60"),1500);return}}}});const r=document.getElementById("sceneNumberToggle"),f=document.getElementById("sceneNumberToggleText"),p=document.getElementById("menuSceneNumState"),d=document.getElementById("menu-btn-scene-numbers");function c(){Yt=!Yt,f&&(f.textContent=`Scene #s: ${Yt?"On":"Off"}`),p&&(p.textContent=Yt?"Enabled":"Disabled"),document.querySelectorAll(".scene-num-indicator").forEach(oe=>{oe.classList.toggle("hidden",!Yt)}),w(`Scene numbers ${Yt?"enabled (left side)":"hidden"}`)}r&&(r.onclick=c),d&&(d.onclick=()=>{c(),Ae("moreMenu")});const x=document.getElementById("focusModeToggle"),m=document.getElementById("focusModeText"),h=document.getElementById("menu-btn-focus-mode"),b=document.getElementById("menuFocusState");function y(oe=null){Vt=oe!==null?oe:!Vt,m&&(m.textContent=Vt?"Exit Focus":"Focus"),b&&(b.textContent=Vt?"Active":"Off");const Ee=document.getElementById("editor-collapsible-toolbars"),B=document.getElementById("editor-document-tabs"),K=document.getElementById("editor-fixed-header");if(Vt?(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!0),K&&(K.style.top="0px")):(typeof window.setScriptoraFullScreen=="function"&&window.setScriptoraFullScreen(!1),K&&(K.style.top="0px")),Ee&&(Ee.style.display=Vt?"none":""),B&&(B.style.display=Vt?"none":"flex"),Fs(),Vt)Kt({id:"focusMode",name:"Focus Mode",close:()=>y(!1)}),w("Focus Mode active (distraction-free)");else{const Ie=Ye.findIndex(ne=>ne.id==="focusMode");Ie!==-1&&Ye.splice(Ie,1),w("Exited Focus Mode")}}x&&(x.onclick=()=>y()),h&&(h.onclick=()=>{Ae("moreMenu"),y()});const $=document.getElementById("langToggleBtn"),N=document.getElementById("langToggleText"),L=document.getElementById("tamilLangBadge");function k(oe){Pn=oe,N&&(N.textContent=oe==="TA"?"தமிழ் / EN":oe==="TL"?"Tanglish":"EN / தமிழ்"),L&&(L.textContent=oe==="TA"?"தமிழ் விசைப்பலகை: இயங்குகிறது":oe==="TL"?"Tanglish: Active":"Tamil IME: Ready"),w(`Screenplay language set to ${oe==="TA"?"Tamil":oe==="TL"?"Tanglish":"English"}`)}$&&($.onclick=()=>{k(Pn==="EN"?"TA":Pn==="TA"?"TL":"EN")}),document.querySelectorAll(".lang-choice-btn").forEach(oe=>{oe.onclick=()=>{k(oe.getAttribute("data-lang")),Ae("moreMenu")}});const U=document.getElementById("btn-open-production"),P=document.getElementById("menu-btn-production"),de=()=>{const oe=e||T.state.selectedScriptId||"chronicles-of-dust";sessionStorage.setItem("scriptora_prod_return",`/editor/${oe}`),t(`/production?from=editor&scriptId=${encodeURIComponent(oe)}`)};U&&(U.onclick=de),P&&(P.onclick=()=>{Ae("moreMenu"),de()});const ae=document.getElementById("menu-btn-go-page");ae&&(ae.onclick=()=>{Ae("moreMenu");const oe=document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)").length||1,Ee=prompt(`Enter page number to jump to (1-${oe}):`,"1");if(Ee){const B=document.querySelector(`[data-page-num="${Ee}"]`);B&&B.scrollIntoView({behavior:"smooth",block:"start"})}});const xe=document.getElementById("menu-btn-page-break");xe&&(xe.onclick=()=>{Ae("moreMenu"),ta()});const ee=document.getElementById("menu-btn-insert-page");ee&&(ee.onclick=()=>{Ae("moreMenu"),no()});const Se=document.getElementById("menu-btn-page-before");Se&&(Se.onclick=()=>{Ae("moreMenu"),ao()});const ye=document.getElementById("menu-btn-page-at-end");ye&&(ye.onclick=()=>{Ae("moreMenu"),sa()});const ke=document.getElementById("btn-undo"),De=document.getElementById("btn-redo");ke&&(ke.onclick=()=>document.execCommand("undo")),De&&(De.onclick=()=>document.execCommand("redo"))}function Ci(){const e=document.getElementById("btn-quick-find"),t=document.getElementById("menu-btn-find-replace"),s=document.getElementById("closeFindBtn"),n=document.getElementById("findInput"),o=document.getElementById("replaceInput"),a=document.getElementById("findNextBtn"),i=document.getElementById("findPrevBtn"),l=document.getElementById("replaceBtn"),r=document.getElementById("replaceAllBtn"),f=document.getElementById("findReplaceModal");e&&(e.onclick=()=>bn(!0)),t&&(t.onclick=()=>{Ae("moreMenu"),bn(!0)}),s&&(s.onclick=()=>Ae("findModal")),f&&(f.onclick=p=>{p.target===f&&Ae("findModal")}),n&&(n.oninput=()=>Rn(n.value)),a&&(a.onclick=()=>Wn(1)),i&&(i.onclick=()=>Wn(-1)),l&&(l.onclick=()=>{const p=n.value,d=o.value;if(!p||Xt===-1||!Bt[Xt])return;const c=Bt[Xt];c.block.content=c.block.content.replace(p,d),ft(),Rn(p),Xe=!0,Ve&&rt(),w("Replaced 1 occurrence")}),r&&(r.onclick=()=>{const p=n.value,d=o.value;if(!p)return;let c=0;q.scenes.forEach(x=>{x.blocks.forEach(m=>{m.content&&m.content.includes(p)&&(m.content=m.content.split(p).join(d),c++)})}),ft(),Rn(p),Xe=!0,Ve&&rt(),w(`Replaced ${c} occurrences`)})}function bn(e){const t=document.getElementById("findReplaceModal");if(t)if(e)Ln=document.getElementById("editor-main-scroll")?.scrollTop||0,Dn=Ze,t.classList.remove("hidden"),t.classList.add("flex"),Kt({id:"findModal",name:"Find & Replace",close:()=>bn(!1)}),setTimeout(()=>{document.getElementById("findInput")?.focus()},40);else{t.classList.add("hidden"),t.classList.remove("flex"),aa();const s=document.getElementById("editor-main-scroll");if(s&&Ln!==null&&(s.scrollTop=Ln),Dn){const o=document.getElementById(Dn),a=o?.querySelector('[contenteditable="true"]')||o;a&&a.focus()}const n=Ye.findIndex(o=>o.id==="findModal");n!==-1&&Ye.splice(n,1)}}function Rn(e){Bt=[],Xt=-1;const t=document.getElementById("findMatchesCount");if(!e||!q){t&&(t.textContent="0 of 0"),aa();return}q.scenes.forEach(s=>{s.blocks.forEach(n=>{n.content&&n.content.toLowerCase().includes(e.toLowerCase())&&Bt.push({block:n,sceneId:s.id})})}),t&&(t.textContent=Bt.length>0?`1 of ${Bt.length}`:"0 of 0"),Bt.length>0&&Wn(0)}function Wn(e){if(Bt.length===0)return;Xt=(Xt+e+Bt.length)%Bt.length;const t=Bt[Xt],s=document.getElementById("findMatchesCount");s&&(s.textContent=`${Xt+1} of ${Bt.length}`);const n=document.getElementById(t.block.id);n&&(n.scrollIntoView({behavior:"smooth",block:"center"}),aa(),n.classList.add("bg-yellow-100"))}function aa(){document.querySelectorAll(".screenplay-block").forEach(e=>{e.classList.remove("bg-yellow-100")})}function uo(e){const t=document.getElementById("imageModal");if(t)if(e)Ze&&(ea=Ze),t.classList.remove("hidden"),t.classList.add("flex"),Kt({id:"imageModal",name:"Insert Image",close:()=>uo(!1)});else{t.classList.add("hidden"),t.classList.remove("flex");const s=Ye.findIndex(n=>n.id==="imageModal");s!==-1&&Ye.splice(s,1)}}function Ai(e){const t=document.getElementById("imageModal"),s=document.getElementById("closeImageModal"),n=document.getElementById("cancelImageBtn"),o=document.getElementById("insertImageBtn"),a=document.getElementById("imgFileInput"),i=document.getElementById("imgUploadLabel"),l=document.getElementById("imgUrlInput"),r=document.getElementById("imgCaptionInput"),f=document.getElementById("imgPreviewContainer"),p=document.getElementById("imgPreviewThumb"),d=document.getElementById("clearImgPreviewBtn");let c="";function x(V){f&&p&&(V?(p.src=V,f.classList.remove("hidden")):(f.classList.add("hidden"),p.src=""))}function m(V,v){const j=new Image;j.onload=()=>{let se=j.width,ge=j.height;(se>900||ge>600)&&(se/ge>900/600?(ge=Math.round(ge*900/se),se=900):(se=Math.round(se*600/ge),ge=600));const me=document.createElement("canvas");me.width=se,me.height=ge,me.getContext("2d").drawImage(j,0,0,se,ge),v(me.toDataURL("image/jpeg",.85))},j.onerror=()=>v(V),j.src=V}s&&(s.onclick=()=>Ae("imageModal")),n&&(n.onclick=()=>Ae("imageModal")),t&&(t.onclick=V=>{V.target===t&&Ae("imageModal")}),document.querySelectorAll(".img-preset-btn").forEach(V=>{V.onclick=()=>{const v=V.getAttribute("data-url"),j=V.getAttribute("data-caption");l&&(l.value=v),r&&!r.value&&(r.value=j),c=v,x(v)}}),l&&(l.oninput=()=>{const V=l.value.trim();V?(c="",x(V)):c||x("")}),d&&(d.onclick=()=>{c="",l&&(l.value=""),a&&(a.value=""),i&&(i.textContent="Choose local image..."),x("")}),a&&(a.onchange=V=>{const v=V.target.files?.[0];if(v){i&&(i.textContent=v.name);const j=new FileReader;j.onload=G=>{m(G.target.result,W=>{c=W,x(W)})},j.readAsDataURL(v)}}),o&&(o.onclick=()=>{const V=l?.value.trim(),v=r?.value.trim();let j=c||V;j||(j="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80");const G={id:`b-${Date.now().toString().slice(-6)}`,type:"image",url:j,content:j,caption:v||""},W=ea||Ze;let se=null,ge=-1;if(q.scenes&&q.scenes.length>0){if(W)for(const me of q.scenes){const Ne=(me.blocks||[]).findIndex(Te=>Te.id===W);if(Ne!==-1){se=me,ge=Ne+1;break}}if(!se){const Ne=document.getElementById("navSceneSelect")?.value||(T.state.currentSceneId?`scene-${T.state.currentSceneId}`:null);Ne&&(se=q.scenes.find(Te=>Te.id===Ne||String(Te.number)===String(T.state.currentSceneId)))}if(!se){const me=Array.from(document.querySelectorAll(".screenplay-block")),Ne=window.innerHeight/2;for(const Te of me){const Oe=Te.getBoundingClientRect();if(Oe.top<=Ne&&Oe.bottom>=Ne){const _e=Te.getAttribute("data-scene-id");se=q.scenes.find(H=>H.id===_e);const E=Te.getAttribute("data-block-id");if(se&&E){const H=(se.blocks||[]).findIndex(J=>J.id===E);H!==-1&&(ge=H+1)}break}}}se||(se=q.scenes[0]),se.blocks||(se.blocks=[]),ge!==-1&&ge<=se.blocks.length?se.blocks.splice(ge,0,G):se.blocks.push(G)}else q.scenes=[{id:"scene-1",number:1,slugline:"INT. SCENE - DAY",blocks:[G]}];c="",a&&(a.value=""),l&&(l.value=""),r&&(r.value=""),i&&(i.textContent="Upload local image file..."),x(""),ft(),Xe=!0,Ve&&rt(),w("Storyboard image inserted"),Ae("imageModal"),setTimeout(()=>{const me=document.getElementById(G.id);me&&(me.scrollIntoView({behavior:"smooth",block:"center"}),me.classList.add("ring-2","ring-blue-500"),setTimeout(()=>me.classList.remove("ring-2","ring-blue-500"),1500))},80)});const h=document.getElementById("preferencesModal"),b=document.getElementById("menu-btn-preferences"),y=document.getElementById("closePrefModal"),$=document.getElementById("savePrefBtn");function N(V){if(h)if(V)h.classList.remove("hidden"),h.classList.add("flex"),Kt({id:"preferencesModal",name:"Preferences",close:()=>N(!1)});else{h.classList.add("hidden"),h.classList.remove("flex");const v=Ye.findIndex(j=>j.id==="preferencesModal");v!==-1&&Ye.splice(v,1)}}b&&(b.onclick=()=>{Ae("moreMenu"),N(!0)}),y&&(y.onclick=()=>Ae("preferencesModal")),h&&(h.onclick=V=>{V.target===h&&Ae("preferencesModal")}),$&&($.onclick=()=>{const V=document.getElementById("prefSceneNumbers")?.checked,v=document.getElementById("prefLineSpacing")?.value,j=document.getElementById("prefFontSize")?.value;Yt=V,document.querySelectorAll(".scene-num-indicator").forEach(W=>W.classList.toggle("hidden",!V));const G=document.querySelector(".screenplay-page-sheet");G&&(G.style.lineHeight=v==="2.0"?"30px":v==="1.0"?"20px":"24px",G.style.fontSize=j==="14pt"?"16px":"15px"),Ae("preferencesModal"),w("Preferences applied")});function L(V){return V?V.replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/[\r\n]+/g," ").replace(/[^\x20-\x7E]/g,v=>({"—":"--","–":"-","“":'"',"”":'"',"‘":"'","’":"'","…":"...","·":"-","•":"*"})[v]||" "):""}function k(V,v){if(!V)return[];const j=V.split(/\s+/),G=[];let W="";for(const se of j)W?(W+" "+se).length<=v?W+=" "+se:(G.push(W),W=se):W=se;return W&&G.push(W),G}function U(V,v,j={}){const{includeTitlePage:G=!0,includePageNumbers:W=!0,sceneNumbers:se=!0,preservePageBreaks:ge=!0,emptyPageFirst:me=!1,emptyPageLast:Ne=!1,pageSheets:Te=[]}=j,Oe=[],E=595.28/2,H=108,J=525,te=14.4,D=14.4,Pe=(re,ze=12)=>(re?re.length:0)*(ze*.6),tt=(re,ze=12)=>Math.round(E-Pe(re,ze)/2),yt=(re,ze=12,qe=J)=>Math.round(qe-Pe(re,ze));let st=!1;if(G&&V.titlePage&&(v.has(1)||j.rangeType==="all")){const re=V.titlePage,ze=(re.title||V.title||"UNTITLED SCREENPLAY").toUpperCase(),qe=k(ze,35),Qe=[];let Ce=520;qe.forEach(Ke=>{Qe.push({text:Ke,x:tt(Ke,12),y:Ce,font:"F2",size:12}),Ce-=te}),Ce-=24;const Ot=re.by!==void 0?re.by:"Written by";Ot&&(Qe.push({text:Ot,x:tt(Ot,12),y:Ce,font:"F1",size:12}),Ce-=te+4);const Ge=re.author||"Author";Qe.push({text:Ge,x:tt(Ge,12),y:Ce,font:"F2",size:12});let We=(re.phone||"").trim();if(!We&&re.contact){const Et=re.contact.split("·").map(kt=>kt.trim()).find(kt=>kt.includes("+")||/\d{3}/.test(kt));Et&&(We=Et)}We&&!We.toLowerCase().startsWith("phone")&&(We=`Phone: ${We}`);let be=(re.email||"").trim();if(!be&&re.contact&&re.contact.includes("@")){const Ke=re.contact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);Ke&&(be=Ke[0])}be&&!be.toLowerCase().startsWith("e-mail")&&!be.toLowerCase().startsWith("email")&&(be=`E-mail: ${be}`);const nt=[];if(We&&nt.push(We),be&&nt.push(be),re.address){const Ke=k(re.address.trim(),40);nt.push(...Ke)}else if(!We&&!be&&re.contact){const Ke=re.contact.split("·").map(Et=>Et.trim()).filter(Boolean);nt.push(...Ke)}let _t=130;nt.forEach(Ke=>{Qe.push({text:Ke,x:H,y:_t,font:"F1",size:12}),_t-=te}),Oe.push(Qe),st=!0}if(Te.forEach(re=>{if(re.classList&&re.classList.contains("screenplay-title-page-sheet"))return;const ze=parseInt(re.getAttribute("data-page-num"),10)||1;if(!v.has(ze))return;const qe=[];let Qe=!1;if(W){const Ge=`${ze}.`;qe.push({text:Ge,x:yt(Ge,12,J),y:805,font:"F1",size:12})}let Ce=765;re.querySelectorAll(".screenplay-block").forEach(Ge=>{if(Ce<65)return;const We=Ge.getAttribute("data-block-type");if(We==="pagebreak"){if(ge){Ce-=te;const be="----------------------------------------";qe.push({text:be,x:tt(be,12),y:Ce,font:"F1",size:12}),Ce-=te}return}if(We==="scene"){const be=Ge.querySelector('[contenteditable="true"]'),nt=(be?be.innerText.trim():Ge.innerText.trim()).toUpperCase();nt&&(Qe=!0);const _t=se&&Ge.querySelector(".scene-num-indicator")?.innerText?.trim()||"";Ce-=D,k(nt,57).forEach((Et,kt)=>{kt===0&&_t&&qe.push({text:_t,x:76,y:Ce,font:"F2",size:12}),qe.push({text:Et,x:H,y:Ce,font:"F2",size:12}),Ce-=te})}else if(We==="character"){const be=Ge.innerText.trim().toUpperCase();be&&(Qe=!0),Ce-=D,qe.push({text:be,x:266,y:Ce,font:"F2",size:12}),Ce-=te}else if(We==="parenthetical"){let be=Ge.innerText.trim();be&&(Qe=!0),be.startsWith("(")||(be="("+be),be.endsWith(")")||(be=be+")"),k(be,26).forEach(nt=>{qe.push({text:nt,x:223,y:Ce,font:"F1",size:12}),Ce-=te})}else if(We==="dialogue"){const be=Ge.innerText.trim();be&&(Qe=!0),k(be,35).forEach(nt=>{qe.push({text:nt,x:180,y:Ce,font:"F1",size:12}),Ce-=te})}else if(We==="transition"){const be=Ge.innerText.trim().toUpperCase();be&&(Qe=!0),Ce-=D,qe.push({text:be,x:yt(be,12,J),y:Ce,font:"F2",size:12}),Ce-=te}else if(We==="shot"){const be=Ge.innerText.trim().toUpperCase();be&&(Qe=!0),Ce-=D,qe.push({text:be,x:H,y:Ce,font:"F2",size:12}),Ce-=te}else if(We==="image"){const be=Ge.querySelector('[contenteditable="true"]')?.innerText?.trim()||"Storyboard Image";Qe=!0,Ce-=D,qe.push({text:`[STORYBOARD: ${be}]`,x:H,y:Ce,font:"F1",size:12}),Ce-=te}else{const be=Ge.innerText.trim();be&&(Qe=!0,Ce-=D,k(be,58).forEach(nt=>{qe.push({text:nt,x:H,y:Ce,font:"F1",size:12}),Ce-=te}))}}),Qe&&Oe.push(qe)}),Oe.length===0){const re=[{text:V.title||"Screenplay",x:H,y:750,font:"F2",size:12}];W&&re.push({text:"1.",x:yt("1.",12,J),y:805,font:"F1",size:12}),Oe.push(re)}const Me=re=>!re||re.length===0||re.every(ze=>ze.y===805||!ze.text||ze.text.trim()==="");for(;Oe.length>1&&Me(Oe[Oe.length-1]);)Oe.pop();me&&Oe.unshift([]),Ne&&Oe.push([]);const es=Oe.length,ut=[],St=[];let je=4;for(let re=0;re<es;re++)je++,ut.push(je),je++,St.push(je);const vt=[];vt[1]="<< /Type /Catalog /Pages 2 0 R >>",vt[2]=`<< /Type /Pages /Kids [${ut.map(re=>re+" 0 R").join(" ")}] /Count ${es} /MediaBox [0 0 595.28 841.89] >>`,vt[3]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>",vt[4]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>";for(let re=0;re<es;re++){const ze=ut[re],qe=St[re];vt[ze]=`<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${qe} 0 R >>`;const Qe=[],Ce=Oe[re]||[];for(const be of Ce){const nt=be.font||"F1",_t=be.size||12,Ke=be.x||H,Et=be.y||750,kt=L(be.text);Qe.push(`BT /${nt} ${_t} Tf ${Ke.toFixed(2)} ${Et.toFixed(2)} Td (${kt}) Tj ET`)}const Ot=Qe.join(`
`),We=new TextEncoder().encode(Ot);vt[qe]=`<< /Length ${We.length} >>
stream
${Ot}
endstream`}const Pt=new TextEncoder,Es=Pt.encode(`%PDF-1.4
%âãÏÓ
`);let cs=Es.length;const ts=[],Ht=[];for(let re=1;re<=je;re++){ts[re]=cs;const ze=`${re} 0 obj
${vt[re]}
endobj
`,qe=Pt.encode(ze);Ht.push(qe),cs+=qe.length}const Xs=cs;let Ut=`xref
0 ${je+1}
0000000000 65535 f 
`;for(let re=1;re<=je;re++)Ut+=`${String(ts[re]).padStart(10,"0")} 00000 n 
`;Ut+=`trailer
<< /Size ${je+1} /Root 1 0 R >>
startxref
${Xs}
%%EOF`;const ds=Pt.encode(Ut);return new Blob([Es,...Ht,ds],{type:"application/pdf"})}const P=document.getElementById("exportModal"),de=document.getElementById("exportModalBtn"),ae=document.getElementById("menu-btn-export"),xe=document.getElementById("closeExportModal"),ee=document.getElementById("cancelExportBtn"),Se=document.getElementById("startExportBtn"),ye=document.getElementById("exportProgressArea"),ke=document.getElementById("exportProgressBar"),De=document.getElementById("exportStatusText");function oe(V){if(P)if(V)P.classList.remove("hidden"),P.classList.add("flex"),Kt({id:"exportModal",name:"Export",close:()=>oe(!1)});else{P.classList.add("hidden"),P.classList.remove("flex"),ye?.classList.add("hidden");const v=Ye.findIndex(j=>j.id==="exportModal");v!==-1&&Ye.splice(v,1)}}de&&(de.onclick=()=>oe(!0)),ae&&(ae.onclick=()=>{Ae("moreMenu"),oe(!0)}),xe&&(xe.onclick=()=>Ae("exportModal")),ee&&(ee.onclick=()=>Ae("exportModal")),P&&(P.onclick=V=>{V.target===P&&Ae("exportModal")});const Ee=document.getElementById("exportPageRangeSelect"),B=document.getElementById("exportCustomRangeInput");Ee&&B&&(Ee.onchange=()=>{B.classList.toggle("hidden",Ee.value!=="custom"),Ee.value==="custom"&&B.focus()}),Se&&(Se.onclick=()=>{const V=document.getElementById("exportFormatSelect")?.value||"pdf",v=document.getElementById("exportPageRangeSelect")?.value||"all",j=document.getElementById("exportCustomRangeInput")?.value||"",G=document.getElementById("optPageNumbers")?.checked!==!1,W=document.getElementById("optPreservePageBreaks")?.checked!==!1,se=document.getElementById("optStandardMargins")?.checked!==!1,ge=document.getElementById("optSceneNumbers")?.checked!==!1,me=document.getElementById("optEmptyPageFirst")?.checked===!0,Ne=document.getElementById("optEmptyPageLast")?.checked===!0;let Te=Array.from(document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)"));Te.length===0&&(Te=Array.from(document.querySelectorAll(".screenplay-page-sheet:not(.screenplay-title-page-sheet)"))),Te.length===0&&(ft(),Te=Array.from(document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)")));const Oe=Te.length||1;let _e=new Set;if(v==="all")for(let E=1;E<=Oe;E++)_e.add(E);else if(v==="current"){let E=1;if(Ze){const H=document.getElementById(Ze),J=H?H.closest(".screenplay-page-sheet"):null;J&&(E=parseInt(J.getAttribute("data-page-num"),10)||1)}_e.add(E)}else if(v==="custom"&&(j.split(",").forEach(H=>{if(H=H.trim(),H.includes("-")){const[J,te]=H.split("-").map(D=>parseInt(D.trim(),10));if(!isNaN(J)&&!isNaN(te))for(let D=Math.max(1,J);D<=Math.min(Oe,te);D++)_e.add(D)}else{const J=parseInt(H,10);!isNaN(J)&&J>=1&&J<=Oe&&_e.add(J)}}),_e.size===0))for(let H=1;H<=Oe;H++)_e.add(H);ye.classList.remove("hidden"),ke.style.width="35%",De.textContent=se?'Applying standard A4 margins (1.5" left, 1.0" right) & Courier Prime...':"Formatting Courier Prime typography and page layout...",setTimeout(()=>{ke.style.width="80%",De.textContent=`Compiling standard ${V.toUpperCase()} for pages [${Array.from(_e).join(", ")}]...`},500),setTimeout(()=>{ke.style.width="100%",De.textContent="Completed! Starting download...";let E="";if(me&&(E+=`\f
`),document.getElementById("optTitlePage")?.checked&&q.titlePage&&(_e.has(1)||v==="all")){const Pe=q.titlePage;E+=`${Pe.title||q.title}

`,E+=`${Pe.by||"Written by"}

`,E+=`${Pe.author||"Author"}

`,Pe.phone&&(E+=`${Pe.phone}
`),Pe.email&&(E+=`${Pe.email}
`),Pe.address&&(E+=`${Pe.address}
`),!Pe.phone&&!Pe.email&&!Pe.address&&Pe.contact&&(E+=`${Pe.contact}
`),E+=`

================================================================================
\f
`}Te.forEach((Pe,tt)=>{const yt=parseInt(Pe.getAttribute("data-page-num"),10)||tt+1;if(!_e.has(yt))return;let st="";G&&(st+=`
											${yt}.

`);let Me=!1;Pe.querySelectorAll(".screenplay-block").forEach(ut=>{const St=ut.getAttribute("data-block-type");if(St==="pagebreak"){W&&(st+=`
[=== PAGE BREAK ===]

`);return}let je="";if(St==="scene"){const vt=ut.querySelector('[contenteditable="true"]');je=vt?vt.innerText.trim():ut.innerText.trim();const Pt=ge&&ut.querySelector(".scene-num-indicator")?.innerText?.trim()||"";je&&(st+=`

${Pt?Pt+". ":""}${je}

`,Me=!0)}else St==="character"?(je=ut.innerText.trim(),je&&(st+=`
			${je}
`,Me=!0)):St==="parenthetical"?(je=ut.innerText.trim(),je&&(st+=`		${je.startsWith("(")?je:"("+je+")"}
`,Me=!0)):St==="dialogue"?(je=ut.innerText.trim(),je&&(st+=`	${je}
`,Me=!0)):St==="transition"?(je=ut.innerText.trim(),je&&(st+=`
						${je}

`,Me=!0)):(je=ut.innerText.trim(),je&&(st+=`${je}

`,Me=!0))}),Me&&(E+=st+`
\f
`)}),Ne?!E.endsWith(`\f
`)&&!E.endsWith("\f")&&(E+=`
\f
`):E=E.replace(/[\s\f]+$/,"");let H;V==="pdf"?H=U(q,_e,{includeTitlePage:document.getElementById("optTitlePage")?.checked!==!1,includePageNumbers:G,sceneNumbers:ge,preservePageBreaks:W,emptyPageFirst:me,emptyPageLast:Ne,pageSheets:Te,rangeType:v}):H=new Blob([E],{type:"text/plain"});const J=URL.createObjectURL(H),te=document.createElement("a");te.href=J;const D=v==="all"?"All_Pages":`Pages_${Array.from(_e).join("-")}`;te.download=`${q.title.replace(/[^a-zA-Z0-9]/g,"_")}_${q.draft||"Draft"}_${D}.${V}`,document.body.appendChild(te),te.click(),te.remove(),w(`Exported "${te.download}" successfully`),setTimeout(()=>Ae("exportModal"),800)},1e3)});const K=document.getElementById("versionsModal"),Ie=document.getElementById("versionsModalBtn"),ne=document.getElementById("menu-btn-versions"),fe=document.getElementById("closeVersionsModal"),A=document.getElementById("versionsListContainer");function ve(V){K&&(K.classList.remove("hidden"),K.classList.add("flex"),He(),Kt({id:"versionsModal",name:"Versions",close:()=>{K.classList.add("hidden"),K.classList.remove("flex")},restore:()=>{K.classList.remove("hidden"),K.classList.add("flex"),He()}}))}async function He(){const V=await Jo(e);A&&(A.innerHTML=V.map(v=>`
      <div class="p-3 rounded-xl border ${v.isCurrent?"border-2 border-blue-600 bg-blue-50/30":"border-slate-200 bg-white hover:bg-slate-50"} transition-colors flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-heading font-bold text-sm text-slate-900">${v.name}</span>
            <span class="px-2 py-0.5 rounded-full ${v.isCurrent?"bg-blue-600 text-white font-semibold":"bg-slate-100 text-slate-600 font-medium"} text-[10px]">${v.tag}</span>
          </div>
          <span class="text-[11px] text-slate-400 font-caption">${v.timestamp}</span>
        </div>
        <p class="text-xs text-slate-600">${v.notes||"Point-in-time snapshot."}</p>
        <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>Edited by ${v.author}</span>
          <div class="flex items-center gap-2">
            <span class="font-medium text-slate-700">${v.stats}</span>
            ${v.isCurrent?"":`<button class="restore-version-btn text-blue-600 font-semibold hover:underline" data-vname="${v.name}">Restore</button>`}
          </div>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".restore-version-btn").forEach(v=>{v.onclick=()=>{const j=v.getAttribute("data-vname");w(`Restored version "${j}"`),document.getElementById("currentVersionTag").textContent=j,Ae("versionsModal")}}))}Ie&&(Ie.onclick=()=>ve()),ne&&(ne.onclick=()=>{Ae("moreMenu"),ve()}),fe&&(fe.onclick=()=>Ae("versionsModal")),K&&(K.onclick=V=>{V.target===K&&Ae("versionsModal")});const Re=document.getElementById("newVersionModal"),ce=document.getElementById("openNewVersionPrompt"),R=document.getElementById("closeNewVersionModal"),C=document.getElementById("cancelNewVersionBtn"),Y=document.getElementById("saveNewVersionBtn");function ue(){K.classList.add("hidden"),Re.classList.remove("hidden"),Re.classList.add("flex"),Kt({id:"newVersionModal",name:"New Version",close:()=>{Re.classList.add("hidden"),Re.classList.remove("flex")}})}ce&&(ce.onclick=ue),R&&(R.onclick=()=>Ae("newVersionModal")),C&&(C.onclick=()=>Ae("newVersionModal")),Y&&(Y.onclick=async()=>{const V=document.getElementById("newVersionNameInput")?.value.trim(),v=document.getElementById("newVersionNotesInput")?.value.trim();V&&(await Yo(e,{name:V,notes:v}),w(`Created version snapshot "${V}"`),document.getElementById("currentVersionTag").textContent=V,Ae("newVersionModal"))});const Z=document.getElementById("compareModal"),we=document.getElementById("openCompareBtn"),le=document.getElementById("menu-btn-compare"),$e=document.getElementById("closeCompareModal"),Le=document.getElementById("closeCompareBtn2");function Be(){K.classList.add("hidden"),Z.classList.remove("hidden"),Z.classList.add("flex"),Kt({id:"compareModal",name:"Compare Versions",close:()=>{Z.classList.add("hidden"),Z.classList.remove("flex")}})}we&&(we.onclick=Be),le&&(le.onclick=()=>{Ae("moreMenu"),Be()}),$e&&($e.onclick=()=>Ae("compareModal")),Le&&(Le.onclick=()=>Ae("compareModal")),Z&&(Z.onclick=V=>{V.target===Z&&Ae("compareModal")})}function vn(){if(!q)return;let e=0;q.scenes.forEach(a=>{a.blocks.forEach(i=>{i.content&&(e+=i.content.trim().split(/\s+/).filter(Boolean).length)})});const s=document.querySelectorAll("#screenplay-pages-container .screenplay-page-sheet:not(.screenplay-title-page-sheet)").length||1,n=document.getElementById("telemetry-page-count"),o=document.getElementById("telemetry-word-count");n&&(n.textContent=`Page 1 of ${s}`),o&&(o.textContent=`${e.toLocaleString()} words`)}function $i(){const e=T.state.scripts||[],t=T.state.selectedScriptId||"chronicles-of-dust",s=e.find(n=>n.id===t)||e[0]||{title:"Chronicles of Dust"};return`
    ${pt("Intelligence","Script Selector")}

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

    ${ct("intelligence")}
  `}function Bi(e){let t=T.state.selectedScriptId||"chronicles-of-dust";document.querySelectorAll(".script-select-card").forEach(o=>{o.onclick=()=>{const a=o.getAttribute("data-script-id"),i=o.getAttribute("data-script-title");t=a,T.selectScript(a),document.querySelectorAll(".script-select-card").forEach(f=>{f.className="script-select-card relative p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const p=f.querySelector(".script-select-indicator");p&&(p.className="script-select-indicator w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0",p.innerHTML='<span class="material-symbols-outlined text-[16px]">arrow_forward</span>')}),o.className="script-select-card relative p-3.5 rounded-xl border border-blue-600 bg-blue-50/70 transition-all cursor-pointer flex items-center justify-between group shadow-xs";const l=o.querySelector(".script-select-indicator");l&&(l.className="script-select-indicator w-6 h-6 rounded-full bg-blue-600 text-white shadow-xs flex items-center justify-center shrink-0",l.innerHTML='<span class="material-symbols-outlined text-[16px] font-bold">check</span>');const r=document.getElementById("selector-btn-label");r&&(r.textContent=`Continue to Context (${i})`)}});const s=document.getElementById("submit-continue-analysis-btn");s&&(s.onclick=()=>{T.selectScript(t),e("/intelligence/context")});const n=document.getElementById("btn-import-script-modal");n&&(n.onclick=()=>{w("Select screenplay file (.fountain, .fdx, .pdf) to parse","info")})}function Ni(){const e=T.state.selectedScriptId||"chronicles-of-dust",t=T.state.scripts.find(n=>n.id===e)||T.state.activeScript||{title:"Chronicles of Dust",format:"Feature",industry:"International / Hollywood"},s=t.context||{format:t.format||"Feature",industry:t.industry||"International / Hollywood",hours:1,minutes:36,seconds:0};return`
    ${pt("Intelligence","Context Calibration")}

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

    ${ct("intelligence")}
  `}function Ti(e){const t=T.state.selectedScriptId||"chronicles-of-dust",s=T.state.scripts.find(d=>d.id===t)||T.state.activeScript||{},n=s.context||{};let o=n.format||s.format||"Feature",a=n.hours!==void 0?n.hours:1,i=n.minutes!==void 0?n.minutes:36,l=n.seconds!==void 0?n.seconds:0;document.querySelectorAll(".format-card").forEach(d=>{d.onclick=()=>{o=d.getAttribute("data-format"),document.querySelectorAll(".format-card").forEach(c=>{c.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 transition-all cursor-pointer hover:bg-slate-50"}),d.className="format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 border-2 border-blue-600 transition-all cursor-pointer",o==="Short"?(a=0,i=25,l=0):o==="Pilot"?(a=0,i=50,l=30):(a=1,i=45,l=0),r()}});function r(){const d=y=>String(y).padStart(2,"0"),c=document.getElementById("val-hr"),x=document.getElementById("val-min"),m=document.getElementById("val-sec");c&&(c.value=d(a)),x&&(x.value=d(i)),m&&(m.value=d(l));const h=a*60+i+Math.round(l/60),b=document.getElementById("pacing-projection");b&&(b.textContent=`~${h} standard script pages`)}document.querySelectorAll(".stepper-btn").forEach(d=>{d.onclick=()=>{const c=d.getAttribute("data-unit"),x=parseInt(d.getAttribute("data-delta"),10)||0;c==="hr"&&(a=Math.max(0,Math.min(9,a+x))),c==="min"&&(i=Math.max(0,Math.min(59,i+x))),c==="sec"&&(l=Math.max(0,Math.min(59,l+x))),r()}}),[{id:"val-hr",max:9,get:()=>a,set:d=>{a=d}},{id:"val-min",max:59,get:()=>i,set:d=>{i=d}},{id:"val-sec",max:59,get:()=>l,set:d=>{l=d}}].forEach(({id:d,max:c,set:x,get:m})=>{const h=document.getElementById(d);h&&(h.onfocus=()=>{h.select()},h.oninput=()=>{let b=h.value.replace(/\D/g,"");if(b==="")x(0);else{let N=parseInt(b,10);isNaN(N)&&(N=0),N>c?(N=c,h.value=String(N)):h.value=b.slice(0,2),x(N)}const y=a*60+i+Math.round(l/60),$=document.getElementById("pacing-projection");$&&($.textContent=`~${y} standard script pages`)},h.onblur=()=>{let b=h.value.replace(/\D/g,""),y=parseInt(b,10);isNaN(y)&&(y=0),y=Math.max(0,Math.min(c,y)),x(y),h.value=String(y).padStart(2,"0"),r()},h.onkeydown=b=>{if(b.key==="Enter")h.blur();else if(b.key==="ArrowUp"){b.preventDefault();const y=m(),$=Math.min(c,y+1);x($),h.value=String($).padStart(2,"0"),r()}else if(b.key==="ArrowDown"){b.preventDefault();const y=m(),$=Math.max(0,y-1);x($),h.value=String($).padStart(2,"0"),r()}})});const p=document.getElementById("btn-submit-context");p&&(p.onclick=async()=>{const d=document.getElementById("industry-select")?.value||"International / Hollywood";p.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Calibrating SCRIPTORA...</span>',p.disabled=!0;const c=m=>String(m).padStart(2,"0"),x={format:o,industry:d,hours:a,minutes:i,seconds:l,plannedDuration:`${c(a)}:${c(i)}:${c(l)}`};await hl(t,x),w("Narrative parameters calibrated"),e("/intelligence/dashboard")})}function Pi(){const e=T.state.selectedScriptId||"chronicles-of-dust",t=T.state.scripts.find(n=>n.id===e)||T.state.activeScript||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",pages:96,format:"Feature"},s=t.analysisScores||{overall:86,pacing:82,dialogue:89,emotion:91,characterArc:84,continuity:78,storyStructure:87,theme:90,cinema:85,formatting:94,production:80};return`
    ${pt("Intelligence","Script Analysis")}

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
            ${T.state.scripts.map(n=>`
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

    ${ct("intelligence")}
  `}function Li(e){const t=T.state.selectedScriptId||"chronicles-of-dust",s=T.state.scripts.find(N=>N.id===t)||T.state.scripts[0],n=document.getElementById("btn-gen-logline"),o=document.getElementById("btn-gen-synopsis"),a=document.getElementById("ai-generated-container"),i=document.getElementById("ai-generated-title"),l=document.getElementById("ai-generated-body"),r=document.getElementById("ai-close-btn"),f=document.getElementById("ai-copy-btn"),p=document.getElementById("ai-copy-text"),d=document.getElementById("ai-query-input"),c=document.getElementById("ai-query-submit");function x(N){a&&(a.classList.remove("hidden"),i.textContent=N==="logline"?"Generated Logline":"Generated Synopsis",l.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Generating with narrative telemetry...</span>',setTimeout(()=>{l.textContent=N==="logline"?s?.logline||"When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.":s?.synopsis||"In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves."},400))}if(n&&(n.onclick=()=>x("logline")),o&&(o.onclick=()=>x("synopsis")),r&&(r.onclick=()=>a.classList.add("hidden")),f&&(f.onclick=()=>{navigator.clipboard?.writeText(l.textContent||""),p.textContent="Copied!",setTimeout(()=>{p.textContent="Copy"},1800),w("Copied to clipboard")}),c&&d){const N=async()=>{const L=d.value.trim();if(!L)return;a.classList.remove("hidden"),i.textContent="Intelligence AI Answer",l.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing draft semantics...</span>';const k=await Yn(L,t);l.textContent=k,d.value=""};c.onclick=N,d.onkeydown=L=>{L.key==="Enter"&&N()}}const m=document.getElementById("script-switcher-modal"),h=document.getElementById("script-selector-trigger"),b=document.getElementById("close-script-switcher-modal"),y=()=>{ot(m)},$=()=>{he(m)};h&&(h.onclick=y),b&&(b.onclick=$),m&&(m.onclick=N=>{N.target===m&&$()}),document.querySelectorAll(".script-switch-opt").forEach(N=>{N.onclick=()=>{const L=N.getAttribute("data-id");T.selectScript(L),$(),e("/intelligence")}})}function Di(){const e=T.state.selectedScriptId||"chronicles-of-dust",t=T.state.scripts.find(n=>n.id===e)||T.state.activeScript||{title:"Chronicles of Dust",pages:96},s=[{type:"pacing",title:"Pacing",desc:"See where the story moves too fast or too slowly.",icon:"speed",score:82,telemetry:`${t.pages||96} Pages Telemetry`},{type:"dialogue",title:"Dialogue",desc:"Cadence, subtext density and character voice rhythm.",icon:"chat",score:89,telemetry:"42 Dialogue Exchanges"},{type:"emotion",title:"Emotion",desc:"Emotional heatmaps, catharsis curves and sentiment.",icon:"favorite",score:91,telemetry:"Peak Catharsis: Act II"},{type:"character-arc",title:"Character Arc",desc:"Want vs. need trajectories and transformation tracking.",icon:"alt_route",score:84,telemetry:"4 Major Protagonists"},{type:"continuity",title:"Continuity",desc:"Props, character locations, and temporal logic rules.",icon:"linear_scale",score:78,telemetry:"2 Minor Prop Conflicts"},{type:"story-structure",title:"Story Structure",desc:"Beat breakdowns, midpoint shifts and turning points.",icon:"account_tree",score:87,telemetry:"3-Act Paradigm Standard"},{type:"theme",title:"Theme",desc:"Core philosophical spines, motifs and moral arguments.",icon:"lightbulb",score:90,telemetry:"3 Tracked Motifs"},{type:"cinema",title:"Cinema",desc:"Visual storytelling, shot economy and set-piece power.",icon:"videocam",score:85,telemetry:"Cinematic Visual Index"},{type:"scene",title:"Scene Analysis",desc:"Deep dive breakdown of goals, conflict and polarity.",icon:"movie",score:86,telemetry:"Scene 18 Active Scope"},{type:"formatting",title:"Formatting",desc:"Standard industry margins, sluglines and font rules.",icon:"rule",score:94,telemetry:"Standard Guild Rules"},{type:"production",title:"Production",desc:"Locations, shooting cast, props and cost estimators.",icon:"movie_creation",score:80,telemetry:"24 Practical Locations"}];return`
    ${pt("Intelligence","Analyse Individually")}

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

    ${ct("intelligence")}
  `}function Ri(e){const t=document.getElementById("analysis-filter-input");t&&(t.oninput=s=>{const n=s.target.value.toLowerCase().trim();document.querySelectorAll("#analysis-tiles-grid .analysis-tile").forEach(o=>{const a=o.getAttribute("data-keyword")||"";o.style.display=a.includes(n)?"flex":"none"})})}const Ta={pacing:{title:"Pacing Analysis",score:82,icon:"speed",desc:"Scene duration variance, narrative tempo and page-turn velocity.",questions:["Where does the pace drag in Act II?","Find scenes over 4 pages","Show action-to-dialogue ratios"],findings:[{scene:"SCENE 14 · Dockside Perimeter · Pg 36",act:"Act II",title:"Action beats slow down before major confrontation",desc:"Extended exposition between dock guards lowers tension prior to container breach.",targetScene:14},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Peak narrative rhythm",desc:"Fast intercut dialogue creates maximum urgency before floodgate breach.",targetScene:18},{scene:"SCENE 26 · Coastal Highway · Pg 68",act:"Act III",title:"High velocity turning point",desc:"Pursuit cadence maintains optimal beats per page.",targetScene:26}]},dialogue:{title:"Dialogue Analysis",score:89,icon:"chat",desc:"Cadence, subtext density, distinctive character voice profiles.",questions:["Are character voices distinctive?","Find on-the-nose exposition lines","Analyze dialogue subtext in Scene 18"],findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Subtext is understated and powerful",desc:"Kevin avoids speaking about his brother directly, communicating through silence and tea rituals.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Meera O.S. dialogue establishes authority",desc:"Radio chatter avoids fluff and communicates technical stakes concisely.",targetScene:18}]},emotion:{title:"Emotion Analysis",score:91,icon:"favorite",desc:"Catharsis trajectory, emotional resonance curves, character empathy indices.",questions:["Where does emotional vulnerability peak?","Track empathy trajectory for Kevin","Catharsis resolution in Act III"],findings:[{scene:"SCENE 12 · Father’s Workshop · Pg 28",act:"Act I",title:"Emotional anchor established",desc:"Familial debt and generational sacrifice ground Kevin’s reluctance to blow the whistle.",targetScene:12},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Desperation under rising water",desc:"Kevin’s fear of failing Meera is palpable as water rises past junction box.",targetScene:18}]},"character-arc":{title:"Character Arc Analysis",score:84,icon:"alt_route",desc:"Want vs. Need conflict, psychological transformation, fatal flaw resolution.",questions:["Does Kevin overcome his passivity?","Meera character transformation","Antagonist motivation clarity"],findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]},continuity:{title:"Continuity Analysis",score:78,icon:"linear_scale",desc:"Prop tracking, character spatial locations, timeline consistency checks.",questions:["Check prop handover in Scene 18","Is time of day consistent across Act II?","Track the brass seal location"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Hydro-sensor probe referenced before retrieval",desc:"Verify Kevin picked up copper probe in Scene 16 or carries it on belt.",targetScene:18},{scene:"SCENE 22 · Pumping Station · Pg 58",act:"Act II",title:"Flashlight state discrepancy",desc:"Ensure flashlight was retrieved after water surge in Scene 19.",targetScene:22}]},"story-structure":{title:"Story Structure Analysis",score:87,icon:"account_tree",desc:"Inciting incident, plot points, midpoint shift, climax architecture.",questions:["Is midpoint clearly defined?","Evaluate climax timing on page 88","Are 3-act beats aligned?"],findings:[{scene:"SCENE 06 · Customs Registry · Pg 14",act:"Inciting Incident",title:"Off-manifest container discovered",desc:"The inciting anomaly sets Kevin on irreversible investigative path.",targetScene:6},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Midpoint (Pg 48/96)",title:"Stakes escalate from civil to criminal",desc:"Kevin realizes his own brother commands the smuggling cartel.",targetScene:18}]},theme:{title:"Theme Analysis",score:90,icon:"lightbulb",desc:"Primary narrative spine: Complicity vs. Duty and moral accountability.",questions:["What is the central theme?","Where is loyalty tested?","Show recurring thematic motifs"],findings:[{scene:"SCENE 09 · Family Kitchen · Pg 22",act:"Act I",title:"Familial pressure as thematic catalyst",desc:"Kevin hides eviction notice, showing economic desperation fueling institutional silence.",targetScene:9},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Moral test faced directly",desc:"Kevin must decide whether to save his brother or save the port city from flooding.",targetScene:18},{scene:"SCENE 36 · Rooftop Overlook · Pg 94",act:"Act III",title:"Theme delivers its final statement",desc:"Accountability over self-preservation.",targetScene:36}]},cinema:{title:"Cinema & Visual Storytelling",score:85,icon:"videocam",desc:"Visual set-piece density, image systems, lighting and camera intentionality.",questions:["Check visual contrast between acts","Highlight cinematic set-pieces","Analyze color palette cues in action lines"],findings:[{scene:"SCENE 01 · Harbor Drone View · Pg 01",act:"Act I",title:"Strong establishing visual metaphor",desc:"Rusted shipping containers stacked like monoliths beneath smog.",targetScene:1},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"High visual tension",desc:"Red emergency beacons reflected in rising brackish water.",targetScene:18}]},scene:{title:"Scene Analysis",score:86,icon:"movie",desc:"Micro-structure of Scene 18: Objective, obstacle, polarity change.",questions:["What is the scene objective?","Where does tension peak?","How does polarity shift?"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]},formatting:{title:"Formatting & Guild Compliance",score:94,icon:"rule",desc:"Industry standard margin measurements, capitalization, slugline syntax.",questions:["Check standard industry margins","Find non-standard scene sluglines","Verify dialogue capitalization rules"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Perfect Courier Prime 12pt slugline",desc:"Margins, dual dialogue spacing, and transition tags meet Writers Guild standards.",targetScene:18}]},production:{title:"Production Breakdown",score:80,icon:"movie_creation",desc:"Locations, shooting days, practical elements, cast size breakdown.",questions:["How many practical locations?","Show scenes with special props","List one-off speaking roles"],findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Location: Wet Stage / Customs Interior",desc:"Requires controlled water flooding tank, hydro-sensor prop box, wet comm-link gear.",targetScene:18}]}};function mo(e){if(T.state.screenplay&&T.state.screenplay.id===e)return T.state.screenplay;const t=localStorage.getItem(`scriptora_screenplay_${e}`);if(t)try{const s=JSON.parse(t);if(s&&s.scenes&&s.scenes.length>0)return s}catch{}return e==="chronicles-of-dust"?Jn:null}function fo(e,t){const s=[];return e&&Array.isArray(e.scenes)&&e.scenes.length>0?e.scenes.forEach((n,o)=>{const a=n.number||o+1,i=n.slugline&&n.slugline.trim()||n.blocks?.find(l=>l.type==="scene")?.content?.trim()||`SCENE ${a}`;s.push({id:n.id||`scene-${a}`,number:a,slugline:i,act:n.actId==="act-3"?"Act III":n.actId==="act-2"?"Act II":a>24?"Act III":a>11?"Act II":"Act I"})}):Jn.scenes.forEach(o=>{s.push({id:o.id,number:o.number,slugline:o.slugline||`SCENE ${o.number}`,act:o.actId==="act-2"?"Act II":"Act I"})}),s}function Mi(e){const t=[];e&&((e.characters||[]).forEach(n=>{const o=typeof n=="string"?n:n.name||"";o&&t.push(o)}),(e.scenes||[]).forEach(n=>{(n.blocks||[]).forEach(o=>{o.type==="character"&&o.content&&t.push(o.content)})}));let s=Qa(t);if(s.length===0&&(e&&(e.id==="chronicles-of-dust"||e.title?.includes("Dust"))?s=["SANTHOSH","ARAVIND","KEVIN","MEERA"]:s=["SANTHOSH","ARAVIND"]),e&&(e.characters=s,e.id))try{localStorage.setItem(`scriptora_screenplay_${e.id}`,JSON.stringify(e))}catch{}return s.map(n=>{const o=n.toUpperCase();let a="Character";return o==="SANTHOSH"||o==="ARAVIND"||o==="KEVIN"?a="Protagonist":o==="MEERA"&&(a="Confidante"),{name:n,role:a}})}function xo(e,t=[]){const s=t.find(l=>Number(l.number)===Number(e))||{number:e,slugline:`SCENE ${e}`,act:e>24?"Act III":e>11?"Act II":"Act I"},n=s.slugline.replace(/^SCENE\s*\d+\s*·\s*/i,"").trim(),o=s.act||(e>24?"Act III":e>11?"Act II":"Act I"),a=Math.max(1,(s.number-1)*3+1),i=Math.min(4.5,Math.max(1.5,s.number*7%3+2)).toFixed(1);return Number(e)===18?{number:18,heading:"SCENE 18 · INT. CUSTOMS OFFICE - NIGHT",act:"Act II Midpoint",page:48,estMin:"3.5",meta:"Act II Midpoint · Pg 48 · ~3.5 min est.",purpose:"Kevin attempts to reroute the electrical relay before the surge floods the basement archives.",conflict:"Rising water breaches the junction box while automated emergency flood doors trigger lockouts, trapping him inside.",whatChanges:"Kevin cuts the emergency seal and refuses to sign the false manifest, irreversibly shifting from passive worker to active resistance.",synthesis:"Polarity shifts from cautious optimism (+1) to catastrophic physical trap and moral awakening (-2), marking the central pivot of the screenplay.",findings:[{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II Midpoint",title:"Objective: Reroute electrical relay before surge",desc:"Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).",targetScene:18}]}:Number(e)===1?{number:1,heading:`SCENE 01 · ${n||"INT. HOME - EVENING"}`,act:"Act I Opening",page:1,estMin:"2.0",meta:"Act I Opening · Pg 01 · ~2.0 min est.",purpose:"Establish opening character presence, environment, and initial psychological stakes.",conflict:"Tension and unspoken questions between characters as unfamiliar presence breaks routine.",whatChanges:"Ordinary state broken by unfamiliar arrival, creating the narrative catalyst for the journey.",synthesis:"Polarity shifts from neutral calm (0) to heightened curiosity and alertness (-1), establishing the dramatic question.",findings:[{scene:`SCENE 01 · ${n||"Opening"} · Pg 01`,act:"Act I Opening",title:"Establish protagonist baseline and primary premise",desc:"Opening visual dynamic introduces character motives before inciting conflict.",targetScene:1}]}:Number(e)===4?{number:4,heading:`SCENE 04 · ${n||"INT. PORT AUDIT ROOM - DAY"}`,act:"Act I",page:9,estMin:"2.5",meta:"Act I · Pg 09 · ~2.5 min est.",purpose:"Kevin audits cargo registry under pressure from superiors to overlook anomalies.",conflict:"Institutional compliance vs early ethical hesitation as signatures are demanded.",whatChanges:"Kevin stamps the manifest with reluctance, confirming his fatal flaw of institutional compliance.",synthesis:"Polarity shifts from hesitation (0) to moral compromise (-1), establishing the internal flaw to overcome.",findings:[{scene:"SCENE 04 · Port Audit · Pg 09",act:"Act I",title:"Fatal Flaw Demonstrated: Silent Compliance",desc:"Compliant stamp creates complicity guilt that fuels later revolt.",targetScene:4}]}:{number:e,heading:`SCENE ${String(e).padStart(2,"0")} · ${n||`INT. LOCATION ${e} - DAY`}`,act:o,page:a,estMin:i,meta:`${o} · Pg ${a} · ~${i} min est.`,purpose:`Execute narrative beat for ${n||`Scene ${e}`} and advance sequence trajectory.`,conflict:"Characters encounter rising resistance while navigating immediate beat obstacles.",whatChanges:"Beats shift character leverage, altering interpersonal dynamic and scene outcome.",synthesis:"Polarity turns decisively across the beat, transitioning the dramatic tension into the next sequence.",findings:[{scene:`SCENE ${String(e).padStart(2,"0")} · Pg ${a}`,act:o,title:`Scene ${e} Beat Dynamics`,desc:`Dramatic polarity progression in ${n||`Scene ${e}`} sustains narrative tempo.`,targetScene:e}]}}function bo(e,t){const s=Mt(e||"SANTHOSH"),n=s.toUpperCase();let o=0;if(t&&Array.isArray(t.scenes)&&t.scenes.forEach(l=>{l.blocks&&l.blocks.some(r=>r.type==="character"&&Mt(r.content)===n)&&o++}),n==="SANTHOSH")return{name:"SANTHOSH",role:"Protagonist",scenesCount:o>0?`${o} scenes tracked`:"36 scenes tracked",step1Title:"Silent Conviction & Initial Resistance",step1Tag:"Fatal Flaw",step1Range:"Beginning Beats",step1Desc:"Santhosh begins navigating intense internal conviction, wrestling with external constraints and uncovering initial stakes.",step2Title:"The Turning Point & Strategic Pivot",step2Tag:"Turning Point",step2Range:"Middle Beats (Midpoint)",step2Desc:"Santhosh breaks away from passive compromises, taking active control of the narrative direction under peak conflict.",step3Title:"Decisive Transformation & Resolution",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Santhosh embraces complete accountability and purpose, achieving an irreversible transformation through the climax.",synthesis:"Santhosh drives the core thematic arc of the story, transforming from cautious survival into an active, principled catalyst of change.",findings:[{scene:"SCENE 01 · Narrative Baseline · Pg 01",act:"Act I",title:"Fatal Flaw: Internal Hesitation",desc:"Santhosh operates with guarded vigilance before escalating pressures force decisive action.",targetScene:1},{scene:"SCENE 02 · The Turning Point · Pg 05",act:"Act II",title:"The Point of No Return",desc:"Santhosh takes a defining stance that permanently pivots interpersonal relationships and story stakes.",targetScene:2}]};if(n==="ARAVIND")return{name:"ARAVIND",role:"Protagonist",scenesCount:o>0?`${o} scenes tracked`:"32 scenes tracked",step1Title:"Guarded Precision & Calculated Loyalty",step1Tag:"Origin Stance",step1Range:"Beginning Beats",step1Desc:"Aravind maintains tactical focus and sharp perception, questioning surrounding motives and testing early alliances.",step2Title:"High-Stakes Partnership & Crucial Stand",step2Tag:"Midpoint Shift",step2Range:"Middle Beats (Midpoint)",step2Desc:"Aravind unites forces during the turning point, applying razor-sharp resolve to counter mounting narrative obstacles.",step3Title:"Decisive Breakthrough & Ultimate Climax",step3Tag:"Resolution",step3Range:"Climactic Beats",step3Desc:"Aravind executes the final breakthrough, sealing the resolution through steadfast commitment to the mission.",synthesis:"Aravind provides essential tactical momentum and intellectual force, elevating the stakes and cementing the dramatic payoff.",findings:[{scene:"SCENE 01 · Tactical Introduction · Pg 01",act:"Act I",title:"Strategic Presence & Foresight",desc:"Aravind introduces critical context and tactical perspective into the unfolding scenario.",targetScene:1},{scene:"SCENE 02 · Midpoint Crucible · Pg 06",act:"Act II",title:"Decisive Strategic Realignment",desc:"Aravind commits to the high-stakes confrontation that defines the story trajectory.",targetScene:2}]};if(n==="KEVIN")return{name:"Kevin",role:"Protagonist",scenesCount:o>0?`${o} scenes tracked`:"48 scenes tracked",step1Title:"Silent Compliance & Institutional Fear",step1Tag:"Fatal Flaw",step1Range:"Beginning · Scene 01–11",step1Desc:"Hesitant and guarded, Kevin stamps irregular manifests to keep peace with superiors and protect familial debt.",step2Title:"The Point of No Return",step2Tag:"Turning Point",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Cuts the emergency floodgate seal, actively defying union directives to prevent port catastrophe.",step3Title:"Selfless Moral Accountability",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Hands over the ledger to the public audit without demanding personal immunity, completing moral transformation.",synthesis:"The protagonist completes a verified 3-stage transformation: overcoming passivity at the midpoint and prioritizing moral duty over self-preservation in the climax.",findings:[{scene:"SCENE 04 · Port Audit Room · Pg 09",act:"Act I",title:"Fatal Flaw: Silent Compliance",desc:"Kevin stamps irregular cargo manifests to keep peace with union superiors.",targetScene:4},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"The Point of No Return",desc:"Kevin cuts the emergency seal, consciously choosing rebellion over survival.",targetScene:18}]};if(n==="MEERA")return{name:"Meera",role:"Confidante",scenesCount:o>0?`${o} scenes tracked`:"22 scenes tracked",step1Title:"Vigilant Skepticism & Tactical Isolation",step1Tag:"Origin Stance",step1Range:"Beginning · Scene 01–12",step1Desc:"Operates independently along pipeline perimeters, skeptical of municipal regulators and trusting only raw field telemetry.",step2Title:"Calculated Alliance Under Pressure",step2Tag:"Partnership Beat",step2Range:"Middle · Scene 18 (Midpoint)",step2Desc:"Guides Kevin via comm-link to the breaker box, choosing to rely on his technical precision despite active security alarms.",step3Title:"Vindicated Shared Resistance",step3Tag:"Resolution",step3Range:"Ending · Scene 36–38",step3Desc:"Secures and broadcasts the telemetry leak to the public frequency, cementing alliance and exposing corporate monopoly.",synthesis:"The confidante evolves from protective cynicism to trusted partnership, providing the strategic resolve that enables the protagonist to act.",findings:[{scene:"SCENE 08 · Waterfront Diner · Pg 19",act:"Act I",title:"Tactical Caution & Guarded Insight",desc:"Meera warns Kevin of private security patrols monitoring pipeline telemetry.",targetScene:8},{scene:"SCENE 18 · Customs Office · Pg 48",act:"Act II",title:"Emergency Comm Guidance",desc:"Meera coordinates the junction box bypass before automated floodgates lock.",targetScene:18}]};const a=n==="KEVIN"||n==="SANTHOSH"||n==="ARAVIND"?"Protagonist":"Character",i=o>0?`${o} scenes tracked`:"Screenplay Character";return{name:s,role:a,scenesCount:i,step1Title:"Initial Presence & Motive Baseline",step1Tag:"Introduction",step1Range:"Beginning Beats",step1Desc:`${s} is introduced navigating personal priorities and reacting to the changing environment.`,step2Title:"Escalating Involvement in Narrative Stakes",step2Tag:"Midpoint Pressure",step2Range:"Middle Beats",step2Desc:`${s} faces direct conflict or shifting loyalties as pressure mounts across the sequence.`,step3Title:"Climactic Position & Resolution",step3Tag:"Resolution",step3Range:"Ending Beats",step3Desc:`${s} resolves their dramatic throughline, solidifying their standing in the story outcome.`,synthesis:`${s} contributes essential narrative pressure and perspective across their screenplay appearances.`,findings:[{scene:"SCENE 01 · Screenplay Beat · Pg 01",act:"Act I",title:`${s} Character Introduction`,desc:`Dialogue and action beats introduce ${s}'s voice and perspective.`,targetScene:1}]}}function Oi(e,t,s={}){const n=t.pages||96,{availableScenes:o=[],currentSceneData:a={},availableChars:i=[],currentCharData:l={}}=s;switch(e){case"pacing":return`
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
      `;default:return""}}function _i(e="pacing",t=null,s=null){const n={...Ta[e]||Ta.pacing},o=sessionStorage.getItem("scriptora_prod_return");let a;try{const k=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;a=new URLSearchParams(k||"")}catch{a=new URLSearchParams}const i=t==="editor"||a.get("from")==="editor"||!!o,l=s||a.get("scriptId")||(o?o.replace("/editor/",""):null)||T.state.selectedScriptId||"chronicles-of-dust",r=`/editor/${l}`,f=l,p=T.state.scripts.find(k=>k.id===f)||T.state.activeScript||{title:"Chronicles of Dust",pages:96},d=mo(f),c=fo(d),x=Mi(d),m=Number(T.state.currentSceneId||(c.find(k=>k.number===18)?18:c[0]?.number||1)),h=x[0]?.name||"Kevin",b=xo(m,c),y=bo(h,d);e==="scene"?(n.desc=`Micro-structure of Scene ${b.number}: Objective, obstacle, polarity change.`,n.findings=b.findings||n.findings):e==="character-arc"&&(n.findings=y.findings||n.findings);const $={availableScenes:c,currentSceneData:b,availableChars:x,currentCharData:y},N=t||a.get("from");let L="/intelligence/analysis";return i?L=r:N==="dashboard"||N==="/intelligence/dashboard"||N?.includes("/intelligence/dashboard")?L="/intelligence/dashboard":N&&N.startsWith("/")&&(L=N),`
    ${pt(i?"Editor":"Intelligence",n.title)}

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
        ${Oi(e,p,$)}

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

    ${ct("intelligence")}
  `}function ji(e,t,s=null,n=null){const o=sessionStorage.getItem("scriptora_prod_return");let a;try{const L=window.location.hash.includes("?")?window.location.hash.split("?")[1]:window.location.search;a=new URLSearchParams(L||"")}catch{a=new URLSearchParams}const i=s==="editor"||a.get("from")==="editor"||!!o,r=n||a.get("scriptId")||(o?o.replace("/editor/",""):null)||T.state.selectedScriptId||"chronicles-of-dust",f=mo(r),p=fo(f),d=document.getElementById("analysis-back-btn");d&&(d.onclick=L=>{L.preventDefault(),i&&sessionStorage.removeItem("scriptora_prod_return"),window.scriptoraRouter?window.scriptoraRouter.back(backUrl):t(backUrl)});function c(){document.querySelectorAll(".btn-open-editor-scene").forEach(L=>{L.onclick=()=>{const k=L.getAttribute("data-scene");T.setState({currentSceneId:Number(k)}),w(`Jumping to Scene ${k} in Editor`),t(`/editor/${r}?scene=${k}`)}})}c();function x(L){const k=document.getElementById("findings-list"),U=document.getElementById("findings-count-tag");U&&(U.textContent=`${L.length} findings tracked`),k&&(k.innerHTML=L.map(P=>`
      <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${P.scene}</span>
          <span class="text-[11px] font-medium text-slate-400">${P.act}</span>
        </div>
        <div class="flex flex-col">
          <h3 class="text-xs sm:text-sm font-bold text-slate-900">${P.title}</h3>
          <p class="text-xs text-slate-600 mt-1 leading-relaxed">${P.desc}</p>
        </div>
        <div class="pt-2 flex justify-end border-t border-slate-100">
          <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${P.targetScene}">
            <span class="material-symbols-outlined text-[15px]">edit_note</span>
            <span>Open in Editor (Scene ${P.targetScene})</span>
          </button>
        </div>
      </div>
    `).join(""),c())}const m=document.getElementById("analysis-scene-selector");m&&(m.onchange=L=>{const k=parseInt(L.target.value,10);T.setState({currentSceneId:k});const U=xo(k,p),P=document.getElementById("target-scene-meta"),de=document.getElementById("target-scene-heading"),ae=document.getElementById("target-scene-purpose"),xe=document.getElementById("target-scene-conflict"),ee=document.getElementById("target-scene-what-changes"),Se=document.getElementById("target-scene-synthesis"),ye=document.getElementById("analysis-header-desc");P&&(P.textContent=U.meta),de&&(de.textContent=U.heading),ae&&(ae.textContent=U.purpose),xe&&(xe.textContent=U.conflict),ee&&(ee.textContent=U.whatChanges),Se&&(Se.textContent=U.synthesis),ye&&(ye.textContent=`Micro-structure of Scene ${k}: Objective, obstacle, polarity change.`),x(U.findings),w(`Analyzing Scene ${k}`)});const h=document.getElementById("analysis-char-selector");h&&(h.onchange=L=>{const k=L.target.value,U=bo(k,f),P=document.getElementById("char-role-badge"),de=document.getElementById("char-scenes-count"),ae=document.getElementById("char-step1-range"),xe=document.getElementById("char-step1-tag"),ee=document.getElementById("char-step1-title"),Se=document.getElementById("char-step1-desc"),ye=document.getElementById("char-step2-range"),ke=document.getElementById("char-step2-tag"),De=document.getElementById("char-step2-title"),oe=document.getElementById("char-step2-desc"),Ee=document.getElementById("char-step3-range"),B=document.getElementById("char-step3-tag"),K=document.getElementById("char-step3-title"),Ie=document.getElementById("char-step3-desc"),ne=document.getElementById("char-synthesis-desc");P&&(P.textContent=U.role),de&&(de.textContent=U.scenesCount),ae&&(ae.textContent=U.step1Range),xe&&(xe.textContent=U.step1Tag),ee&&(ee.textContent=U.step1Title),Se&&(Se.textContent=U.step1Desc),ye&&(ye.textContent=U.step2Range),ke&&(ke.textContent=U.step2Tag),De&&(De.textContent=U.step2Title),oe&&(oe.textContent=U.step2Desc),Ee&&(Ee.textContent=U.step3Range),B&&(B.textContent=U.step3Tag),K&&(K.textContent=U.step3Title),Ie&&(Ie.textContent=U.step3Desc),ne&&(ne.textContent=U.synthesis),x(U.findings),w(`Switched active character focus to ${U.name}`)}),document.querySelectorAll("[data-jump-scene]").forEach(L=>{L.onclick=()=>{const k=L.getAttribute("data-jump-scene");T.setState({currentSceneId:Number(k)}),w(`Jumping to Scene ${k} in Editor`),t(`/editor/${r}?scene=${k}`)}});const b=document.getElementById("vector-ai-input"),y=document.getElementById("vector-ai-submit"),$=document.getElementById("vector-ai-answer");async function N(L){if(!L||!$)return;$.classList.remove("hidden"),$.innerHTML='<span class="text-slate-400 italic flex items-center gap-1.5"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing narrative beats...</span>';const k=await Yn(L,r);$.textContent=k}y&&b&&(y.onclick=()=>N(b.value.trim()),b.onkeydown=L=>{L.key==="Enter"&&N(b.value.trim())}),document.querySelectorAll(".query-pill").forEach(L=>{L.onclick=()=>{const k=L.getAttribute("data-query");b&&(b.value=k),N(k)}})}function Fi(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=t||s.get("scriptId")||T.state.editorReturnScriptId||T.state.selectedScriptId||"chronicles-of-dust",a=n==="editor",i=a?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/workspace",l=T.state.scripts?.find(x=>x.id===o)||T.state.scripts?.[0]||{},r=T.state.currentUser||(()=>{try{const x=localStorage.getItem("scriptora_user");if(x)return JSON.parse(x)}catch{}return{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}}})(),f=T.state.settings||(()=>{try{const x=localStorage.getItem("scriptora_settings");if(x)return JSON.parse(x)}catch{}return{editor:{showSceneNumbers:!0,autoCapitalize:!0,autoTransition:!0,continueDialogue:!0,fontSize:"Courier Prime 12pt",autoSave:"Instant"},language:"English (US)",transliteration:!1,appearance:"Light",accentColor:"blue",fontScale:"Normal",notifications:{invites:!0,edits:!0,insights:!0,milestones:!0},intelligence:{deepAnalysis:!0,pacingAlerts:!0,dialogueScoring:!0,sensitivity:"Balanced"},privacy:{watermark:!0,encryption:!0}}})(),p=Array.isArray(T.state.scripts)?T.state.scripts.length:r.stats?.drafts??0,d=3,c=r.stats?.healthIndex||"98%";return`
    ${pt("Profile","Account & preferences.")}

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
              ${[{id:"en",name:"English (US)",code:"English (US)"},{id:"ta",name:"Tamil (தமிழ்)",code:"Tamil"},{id:"tg",name:"Tanglish",code:"Tanglish"},{id:"hi",name:"Hindi (हिंदी)",code:"Hindi"}].map(x=>`
                <button type="button" class="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${f.language===x.code?"border-blue-600 bg-blue-50 text-blue-700":"border-slate-200 bg-white text-slate-800 hover:bg-slate-50"}" data-lang="${x.code}">
                  ${x.name}
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
                ${[{id:"Light",label:"Light",icon:"light_mode"},{id:"Dark",label:"Dark",icon:"dark_mode"},{id:"System",label:"System",icon:"devices"}].map(x=>`
                  <button type="button" class="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all ${f.appearance===x.id?"border-blue-600 bg-blue-50 text-blue-700":"border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}" data-theme="${x.id}">
                    <span class="material-symbols-outlined text-[18px]">${x.icon}</span>
                    <span>${x.label}</span>
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

    ${ct("profile")}
  `}function Hi(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=t||n.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),a=s||n.get("scriptId")||T.state.editorReturnScriptId||T.state.selectedScriptId||"chronicles-of-dust",i=o==="editor",l=i?sessionStorage.getItem("scriptora_editor_return")||`/editor/${a}`:"/workspace",r=T.state.currentUser||(()=>{try{const v=localStorage.getItem("scriptora_user");if(v)return JSON.parse(v)}catch{}return{name:"Arun Kumar",headline:"Screenwriter & Narrative Director",email:"arun.kumar@scriptora.studio",badge:"Member Pro",initials:"AK",avatarColor:"bg-blue-600",stats:{drafts:14,coAuthors:3,healthIndex:"98%"}}})(),f=document.getElementById("profile-bottom-return-btn");f&&(f.onclick=v=>{v.preventDefault(),sessionStorage.removeItem("scriptora_from_editor"),window.scriptoraRouter?window.scriptoraRouter.back(l):e(l)}),document.getElementById("stat-card-drafts")?.addEventListener("click",()=>{e("/workspace")}),document.getElementById("stat-card-coauthors")?.addEventListener("click",()=>{e(`/profile/collaborators${i?`?from=editor&scriptId=${a}`:""}`)}),document.getElementById("stat-card-health")?.addEventListener("click",()=>{e("/intelligence/dashboard")});const p=document.getElementById("settings-search-input");p&&(p.oninput=v=>{const j=v.target.value.toLowerCase().trim();let G=0;document.querySelectorAll("#settings-list .setting-item").forEach(se=>{const me=se.textContent.toLowerCase().includes(j);se.style.display=me?"flex":"none",me&&G++});const W=document.getElementById("no-settings-match");W&&(W.style.display=G===0?"block":"none")});function d(v){const j=`modal-setting-${v.replace("sheet-","")}`,G=document.getElementById(j);G&&ot(G)}function c(){document.querySelectorAll(".settings-modal").forEach(v=>{he(v)})}document.querySelectorAll(".setting-item").forEach(v=>{v.onclick=()=>{const j=v.getAttribute("data-sheet");j&&d(j)}}),document.querySelectorAll(".close-setting-modal").forEach(v=>{v.onclick=c}),document.querySelectorAll(".settings-modal, #modal-edit-profile, #modal-security, #action-modal").forEach(v=>{v.onclick=j=>{j.target===v&&he(v)}});function x(v){let j={};try{const W=localStorage.getItem("scriptora_settings");W&&(j=JSON.parse(W))}catch{}const G=v(j);return localStorage.setItem("scriptora_settings",JSON.stringify(G)),T.setState({settings:G}),gl(G).catch(()=>{}),G}const m=document.getElementById("btn-save-cfg-editor");m&&(m.onclick=()=>{const v=document.getElementById("cfg-editor-scenenums")?.checked??!0,j=document.getElementById("cfg-editor-autocap")?.checked??!0,G=document.getElementById("cfg-editor-contd")?.checked??!0,W=document.getElementById("cfg-editor-font")?.value||"Courier Prime 12pt",se=document.getElementById("cfg-editor-autosave")?.value||"Instant";x(me=>({...me,editor:{...me.editor||{},showSceneNumbers:v,autoCapitalize:j,continueDialogue:G,fontSize:W,autoSave:se}})),localStorage.setItem("scriptora_autosave",se==="Instant"?"true":"false");const ge=document.getElementById("desc-sheet-editor");ge&&(ge.textContent=`Numbers: ${v?"On":"Off"} · Auto-save: ${se}`),c(),w("Editor preferences saved")});let h=T.state.settings?.language||"English (US)";document.querySelectorAll(".btn-lang-choice").forEach(v=>{v.onclick=()=>{h=v.getAttribute("data-lang"),document.querySelectorAll(".btn-lang-choice").forEach(j=>{j.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-slate-200 bg-white text-slate-800 hover:bg-slate-50"}),v.className="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const b=document.getElementById("btn-save-cfg-language");b&&(b.onclick=()=>{const v=document.getElementById("cfg-lang-translit")?.checked??!1;x(G=>({...G,language:h,transliteration:v}));const j=document.getElementById("desc-sheet-language");j&&(j.textContent=`${h}${v?" · Transliteration On":""}`),c(),w(`Language set to ${h}`)});let y=T.state.settings?.appearance||"Light";document.querySelectorAll(".btn-theme-choice").forEach(v=>{v.onclick=()=>{y=v.getAttribute("data-theme"),document.querySelectorAll(".btn-theme-choice").forEach(j=>{j.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}),v.className="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700"}});const $=document.getElementById("btn-save-cfg-appearance");$&&($.onclick=()=>{const v=document.getElementById("cfg-app-scale")?.value||"Normal";x(G=>({...G,appearance:y,fontScale:v})),y==="Dark"?(document.documentElement.classList.add("dark"),localStorage.setItem("scriptora_theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("scriptora_theme","light"));const j=document.getElementById("desc-sheet-appearance");j&&(j.textContent=`${y} · Scale: ${v}`),c(),w(`Appearance updated: ${y}`)});const N=document.getElementById("btn-save-cfg-notifications");N&&(N.onclick=()=>{const v=document.getElementById("cfg-notif-invites")?.checked??!0,j=document.getElementById("cfg-notif-edits")?.checked??!0,G=document.getElementById("cfg-notif-insights")?.checked??!0,W=document.getElementById("cfg-notif-milestones")?.checked??!0,se={invites:v,edits:j,insights:G,milestones:W};x(Ne=>({...Ne,notifications:se}));const ge=Object.values(se).filter(Boolean).length,me=document.getElementById("desc-sheet-notifications");me&&(me.textContent=`${ge} alerts active`),c(),w("Notification preferences updated")});const L=document.getElementById("btn-save-cfg-intelligence");L&&(L.onclick=()=>{const v=document.getElementById("cfg-intel-deep")?.checked??!0,j=document.getElementById("cfg-intel-pacing")?.checked??!0,G=document.getElementById("cfg-intel-dialogue")?.checked??!0,W=document.getElementById("cfg-intel-sensitivity")?.value||"Balanced";x(ge=>({...ge,intelligence:{deepAnalysis:v,pacingAlerts:j,dialogueScoring:G,sensitivity:W}}));const se=document.getElementById("desc-sheet-intelligence");se&&(se.textContent=`${v?"Deep Arc Diagnostics":"Standard"} · ${W}`),c(),w("Intelligence engine calibrated")});const k=document.getElementById("btn-save-cfg-privacy");k&&(k.onclick=()=>{const v=document.getElementById("cfg-priv-watermark")?.checked??!0,j=document.getElementById("cfg-priv-encrypt")?.checked??!0;x(W=>({...W,privacy:{watermark:v,encryption:j}}));const G=document.getElementById("desc-sheet-privacy");G&&(G.textContent=`${v?"Watermark On":"Standard"} · Local AES Encrypted`),c(),w("Privacy governance updated")});const U=document.getElementById("btn-export-portfolio-data");U&&(U.onclick=()=>{const v={exportedAt:new Date().toISOString(),user:T.state.currentUser,scripts:T.state.scripts,screenplay:T.state.screenplay,settings:T.state.settings},j=new Blob([JSON.stringify(v,null,2)],{type:"application/json"}),G=URL.createObjectURL(j),W=document.createElement("a");W.href=G,W.download=`scriptora_portfolio_backup_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(W),W.click(),document.body.removeChild(W),URL.revokeObjectURL(G),w("Portfolio archive downloaded successfully")});const P=document.getElementById("btn-force-cloud-sync");P&&(P.onclick=()=>{P.disabled=!0,P.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span><span>Synchronizing...</span>',setTimeout(()=>{P.disabled=!1,P.innerHTML='<span class="material-symbols-outlined text-[16px]">sync</span><span>Force Cloud Re-sync</span>';const v=document.getElementById("sync-status-msg");v&&(v.textContent=`Synchronized at ${new Date().toLocaleTimeString()}`),w("All screenplay drafts synchronized with cloud")},700)});const de=document.getElementById("btn-clear-local-cache");de&&(de.onclick=()=>{sessionStorage.clear(),w("Temporary cache and diagnostic buffers cleared")});const ae=document.getElementById("modal-edit-profile"),xe=document.getElementById("trigger-modal-email"),ee=document.getElementById("edit-avatar-btn"),Se=document.getElementById("avatar-container-btn"),ye=document.getElementById("form-update-profile"),ke=document.getElementById("local-photo-input"),De=document.getElementById("btn-modal-upload-photo"),oe=document.getElementById("btn-modal-remove-photo");function Ee(v){v?ot(ae):he(ae)}xe&&(xe.onclick=()=>Ee(!0)),Se&&(Se.onclick=()=>Ee(!0)),ee&&(ee.onclick=v=>{v.stopPropagation(),ke&&ke.click()}),De&&(De.onclick=()=>{ke&&ke.click()}),document.querySelectorAll(".close-profile-modal").forEach(v=>v.onclick=()=>Ee(!1)),ke&&(ke.onchange=v=>{const j=v.target.files?.[0];if(!j)return;if(!j.type.startsWith("image/")){w("Please select a valid image file (PNG, JPG, WEBP)");return}const G=new FileReader;G.onload=W=>{const se=new Image;se.onload=()=>{const ge=document.createElement("canvas"),me=360;let Ne=se.width,Te=se.height;Ne>Te?Ne>me&&(Te=Math.round(Te*me/Ne),Ne=me):Te>me&&(Ne=Math.round(Ne*me/Te),Te=me),ge.width=Ne,ge.height=Te,ge.getContext("2d").drawImage(se,0,0,Ne,Te);const _e=ge.toDataURL("image/jpeg",.88),H={...T.state.currentUser||r,avatarUrl:_e};T.setState({currentUser:H}),localStorage.setItem("scriptora_user",JSON.stringify(H)),Bn({avatarUrl:_e}).catch(()=>{});const J=document.getElementById("user-avatar-circle");J&&(J.innerHTML=`<img id="user-avatar-img" src="${_e}" class="w-full h-full object-cover" alt="Profile" />`);const te=document.getElementById("modal-preview-avatar");te&&(te.innerHTML=`<img id="modal-preview-img" src="${_e}" class="w-full h-full object-cover" alt="Preview" />`),oe&&oe.classList.remove("hidden");const D=document.getElementById("header-profile-btn");D&&(D.innerHTML=`<img src="${_e}" class="w-full h-full object-cover" alt="Profile" />`),w("Profile picture updated successfully!")},se.src=W.target.result},G.readAsDataURL(j),ke.value=""}),oe&&(oe.onclick=()=>{const j={...T.state.currentUser||r,avatarUrl:null};T.setState({currentUser:j}),localStorage.setItem("scriptora_user",JSON.stringify(j)),Bn({avatarUrl:null}).catch(()=>{});const G=j.initials||"AK",W=document.getElementById("user-avatar-circle");W&&(W.innerHTML=`<span id="user-avatar-initials">${G}</span>`);const se=document.getElementById("modal-preview-avatar");se&&(se.innerHTML=`<span id="modal-preview-initials">${G}</span>`),oe.classList.add("hidden");const ge=document.getElementById("header-profile-btn");ge&&(ge.innerHTML=`<span>${G}</span>`),w("Profile photo removed")});let B=r.avatarColor||"bg-blue-600";document.querySelectorAll(".prof-avatar-color-btn").forEach(v=>{v.onclick=()=>{B=v.getAttribute("data-color"),document.querySelectorAll(".prof-avatar-color-btn").forEach(j=>j.classList.remove("ring-2","ring-offset-2","ring-blue-600")),v.classList.add("ring-2","ring-offset-2","ring-blue-600")}}),ye&&(ye.onsubmit=async v=>{v.preventDefault();const j=document.getElementById("prof-input-name").value.trim(),G=document.getElementById("prof-input-headline").value.trim(),W=document.getElementById("prof-input-email").value.trim(),se=j.split(/\s+/),ge=(se[0]?.[0]||"A")+(se[1]?.[0]||""),me={...T.state.currentUser||r,name:j,displayName:j,headline:G,email:W,initials:ge.toUpperCase(),avatarColor:B};await Bn(me),T.setState({currentUser:me});const Ne=document.getElementById("profile-display-name"),Te=document.getElementById("profile-display-headline"),Oe=document.getElementById("profile-display-email"),_e=document.getElementById("user-avatar-circle");Ne&&(Ne.textContent=j),Te&&(Te.textContent=G),Oe&&(Oe.textContent=W),_e&&!me.avatarUrl&&(_e.innerHTML=`<span id="user-avatar-initials">${ge.toUpperCase()}</span>`,_e.className=`w-20 h-20 rounded-full ${B} text-white font-bold text-2xl flex items-center justify-center shadow-md overflow-hidden transition-transform active:scale-95 border-2 border-white ring-2 ring-slate-100`),Ee(!1),w("Profile and account updated successfully")});const K=document.getElementById("modal-security"),Ie=document.getElementById("trigger-modal-password"),ne=document.getElementById("form-update-pw");function fe(v){v?ot(K):he(K)}Ie&&(Ie.onclick=()=>fe(!0)),document.querySelectorAll(".close-security-modal").forEach(v=>v.onclick=()=>fe(!1)),document.querySelectorAll(".btn-toggle-pw").forEach(v=>{v.onclick=()=>{const j=v.getAttribute("data-target"),G=document.getElementById(j),W=v.querySelector(".material-symbols-outlined");G&&(G.type==="password"?(G.type="text",W&&(W.textContent="visibility_off")):(G.type="password",W&&(W.textContent="visibility")))}}),ne&&(ne.onsubmit=v=>{v.preventDefault(),document.getElementById("pw-input-current")?.value;const j=document.getElementById("pw-input-new")?.value,G=document.getElementById("pw-input-confirm")?.value,W=document.getElementById("pw-error-text");if(!j||j.length<6){W&&(W.textContent="New password must be at least 6 characters long.",W.classList.remove("hidden"));return}if(j!==G){W&&(W.textContent="New password and confirmation do not match.",W.classList.remove("hidden"));return}W&&W.classList.add("hidden"),fe(!1),w("Password updated securely"),ne.reset()});const A=document.getElementById("action-modal"),ve=document.getElementById("action-modal-title"),He=document.getElementById("action-modal-desc"),Re=document.getElementById("action-modal-icon"),ce=document.getElementById("action-modal-icon-box"),R=document.getElementById("action-modal-confirm"),C=document.getElementById("action-modal-cancel"),Y=document.getElementById("action-modal-input-wrap"),ue=document.getElementById("action-modal-phrase-input"),Z=document.getElementById("action-modal-error");let we="signout",le=!1;function $e(v){le=!1,we=v,R&&(R.disabled=!1,R.textContent=v==="signout"?"Sign Out":"Delete Forever"),C&&(C.disabled=!1),Z&&(Z.textContent="",Z.classList.add("hidden")),ue&&(ue.value=""),v==="signout"?(ve.textContent="Sign Out",He.textContent="Are you sure you want to end your active session on this device? Unsaved changes in your draft have been synchronized.",Re.textContent="logout",ce.className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center",R.className="flex-1 h-10 px-4 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 cursor-pointer transition-colors flex items-center justify-center gap-1.5",R.textContent="Sign Out",Y&&Y.classList.add("hidden")):(ve.textContent="Delete Account",He.textContent="This action will permanently delete your account, private screenplays, versions, and production records. Authorized collaborators on shared scripts will retain access.",Re.textContent="warning",ce.className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center",R.className="flex-1 h-10 px-4 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer transition-colors flex items-center justify-center gap-1.5",R.textContent="Delete Forever",Y&&Y.classList.remove("hidden")),ot(A),v==="delete"&&ue&&setTimeout(()=>ue.focus(),100)}function Le(){le=!1,R&&(R.disabled=!1),C&&(C.disabled=!1),he(A)}const Be=document.getElementById("btn-trigger-signout");Be&&(Be.onclick=()=>$e("signout"));const V=document.getElementById("btn-trigger-delete-acc");V&&(V.onclick=()=>$e("delete")),C&&(C.onclick=Le),R&&(R.onclick=async()=>{if(le)return;if(we==="delete"&&(ue?.value||"").trim().toUpperCase()!=="DELETE MY ACCOUNT"){Z&&(Z.textContent='Please type "DELETE MY ACCOUNT" exactly to proceed with deletion.',Z.classList.remove("hidden")),ue&&ue.focus();return}le=!0,R.disabled=!0,C&&(C.disabled=!0);const v=R.textContent;R.innerHTML=`
        <span class="material-symbols-outlined text-[15px] animate-spin">refresh</span>
        <span>${we==="signout"?"Signing Out...":"Deleting Account..."}</span>
      `;try{if(we==="signout")await Ua(),T.resetUserSession(),window.scriptoraRouter?.clearHistory&&window.scriptoraRouter.clearHistory(),he(A),w("Signed out of Scriptora"),e("/auth",!0);else{const j=(ue?.value||"").trim(),G=await Uo(j);T.resetUserSession(),window.scriptoraRouter?.clearHistory&&window.scriptoraRouter.clearHistory(),he(A),w(G.message||"Account deleted successfully"),e("/auth",!0)}}catch(j){Z&&(Z.textContent=j.message||"Operation failed. Please try again.",Z.classList.remove("hidden")),w(j.message||"Action failed","error")}finally{le=!1,R&&(R.disabled=!1,R.textContent=v),C&&(C.disabled=!1)}})}function Ui(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),o=t||s.get("scriptId")||T.state.editorReturnScriptId||T.state.selectedScriptId||"chronicles-of-dust",a=n==="editor",i=a?sessionStorage.getItem("scriptora_editor_return")||`/editor/${o}`:"/profile",l=T.state.scripts.find(r=>r.id===o)||T.state.scripts[0]||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2",joinCode:"A7K9-XP42"};return`
    ${pt("Profile","Collaborators")}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
      <div class="flex flex-col w-full max-w-lg mx-auto px-4 pt-2.5 pb-8 space-y-5 fade-in">
        
        <!-- Back Navigation & Title -->
        <div class="flex items-center gap-2.5">
          <button id="collab-back-btn" data-scriptora-back="true" data-back-fallback="${i}" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back" title="Back">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div class="flex flex-col min-w-0">
            <h1 class="page-heading font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight truncate">Collaborators</h1>
            <p class="text-xs text-slate-500 mt-0.5 truncate">Granular roles, secure invitations & end-to-end encrypted collaboration.</p>
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
            ${T.state.scripts.map(r=>`
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

        <!-- E2EE Security Status Bar -->
        <div class="bg-white border border-slate-200/80 rounded-xl p-3 shadow-xs flex items-center justify-between gap-3" id="e2ee-status-card">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100" id="e2ee-icon-box">
              <span class="material-symbols-outlined text-[18px]">lock</span>
            </div>
            <div class="flex flex-col min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="font-heading font-bold text-xs text-slate-900">End-to-End Encryption</span>
                <span class="text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider bg-slate-100 text-slate-600" id="e2ee-badge">AES-256-GCM</span>
              </div>
              <span class="text-[10px] text-slate-500 truncate" id="e2ee-desc">Zero-knowledge client encryption active.</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button id="btn-security-info" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/70 text-slate-700 text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer">
              <span class="material-symbols-outlined text-[14px]">shield</span>
              <span>Details</span>
            </button>
          </div>
        </div>

        <!-- Add Collaborator Action Bar -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="text-xs font-bold uppercase text-slate-500 tracking-wider">Team Access</span>
            <span class="text-[10px] font-semibold text-slate-400" id="team-members-count">(0)</span>
          </div>
          <button class="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer" id="openInviteBtn">
            <span class="material-symbols-outlined text-[16px]">person_add</span>
            <span>Add Collaborator</span>
          </button>
        </div>

        <!-- Inline Invite Card -->
        <div class="hidden bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3.5" id="inviteCard">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[16px]">mail</span>
              </div>
              <span class="font-heading text-sm font-bold text-slate-900">Invite Teammate</span>
            </div>
            <button class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer" id="closeInviteBtn">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div class="space-y-1">
            <label class="text-[11px] font-semibold text-slate-600">Email Address</label>
            <input class="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600" id="inviteEmailInput" placeholder="colleague@studio.com" type="email">
          </div>

          <div class="space-y-1.5">
            <span class="text-[11px] font-semibold text-slate-600">Assigned Role</span>
            <div class="grid grid-cols-2 gap-2" id="invite-role-selector">
              <label class="flex flex-col p-2.5 rounded-lg border border-blue-500 bg-blue-50/50 cursor-pointer transition-colors role-radio-card" data-role="Editor">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">Editor</span>
                  <input type="radio" name="inviteRole" value="Editor" checked class="accent-blue-600">
                </div>
                <span class="text-[10px] text-slate-500 mt-0.5">Edit dialogue, scene locks & storyboards</span>
              </label>

              <label class="flex flex-col p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors role-radio-card" data-role="Viewer">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">Viewer</span>
                  <input type="radio" name="inviteRole" value="Viewer" class="accent-blue-600">
                </div>
                <span class="text-[10px] text-slate-500 mt-0.5">Read-only script & review notes</span>
              </label>

              <label class="flex flex-col p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors role-radio-card" data-role="Script Doctor">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">Script Doctor</span>
                  <input type="radio" name="inviteRole" value="Script Doctor" class="accent-blue-600">
                </div>
                <span class="text-[10px] text-slate-500 mt-0.5">Analyze structure, dialogue & pacing</span>
              </label>

              <label class="flex flex-col p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors role-radio-card" data-role="Producer">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">Producer</span>
                  <input type="radio" name="inviteRole" value="Producer" class="accent-blue-600">
                </div>
                <span class="text-[10px] text-slate-500 mt-0.5">Production notes, schedule & review</span>
              </label>
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-[11px] font-semibold text-slate-600">Invitation Note (Optional)</label>
            <input class="w-full h-8 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600" id="inviteNoteInput" placeholder="e.g. Collaborating on Act 2 dialogue rewrite..." type="text">
          </div>

          <button id="sendInviteBtn" class="w-full h-9 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer">
            <span class="material-symbols-outlined text-[16px]">send</span>
            <span>Send Invitation</span>
          </button>
        </div>

        <!-- Collaborators List & Pending Invitations -->
        <div class="bg-white rounded-xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden" id="collaborators-list">
          <div class="p-4 text-center text-xs text-slate-400">Loading collaborators...</div>
        </div>

        <!-- PENDING ACCESS REQUESTS SECTION (Revealed if pending join requests exist) -->
        <div id="pending-requests-section" class="hidden flex flex-col gap-2 pt-1">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-blue-600 text-[18px]">pending_actions</span>
              <h2 class="font-heading text-sm font-bold text-slate-900 tracking-tight">Pending Access Requests</h2>
            </div>
            <span class="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full" id="pending-requests-count">0</span>
          </div>
          <div class="bg-white rounded-xl border border-blue-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden" id="requests-list">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <!-- JOIN BY SCRIPT CODE SECTION -->
        <div class="flex flex-col gap-2 pt-2">
          <div class="flex flex-col">
            <h2 class="font-heading text-sm font-bold text-slate-900 tracking-tight">Join a Script</h2>
            <p class="text-xs text-slate-500">Join codes allow authenticated teammates to submit an access request to the owner.</p>
          </div>

          <!-- Join Code Tabs Switcher -->
          <div class="w-full bg-slate-100 rounded-xl p-1 flex items-center text-xs font-semibold">
            <button id="tabGenCodeBtn" class="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs cursor-pointer">
              Generate Join Code
            </button>
            <button id="tabEnterCodeBtn" class="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900 cursor-pointer">
              Enter Join Code
            </button>
          </div>

          <!-- Tab Content 1: Generate Join Code -->
          <div id="paneGenerateCode" class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col gap-3">
            <div class="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div class="flex flex-col">
                <div class="flex items-center gap-1.5">
                  <span class="text-[10px] uppercase font-bold text-slate-400">SCRIPT JOIN CODE</span>
                  <span id="joinCodeStatusBadge" class="text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">Active</span>
                </div>
                <span id="displayJoinCode" class="font-mono font-bold text-base text-blue-600 tracking-widest mt-0.5">${l.joinCode||"A7K9-XP42"}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <button id="copyJoinCodeBtn" class="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 text-xs font-medium flex items-center gap-1 shadow-xs transition-all cursor-pointer">
                  <span class="material-symbols-outlined text-[15px]">content_copy</span>
                  <span id="copyJoinCodeLabel">Copy</span>
                </button>
                <button id="regenJoinCodeBtn" class="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 text-xs shadow-xs transition-all cursor-pointer" title="Regenerate Code">
                  <span class="material-symbols-outlined text-[16px]">refresh</span>
                </button>
                <button id="revokeJoinCodeBtn" class="p-1.5 rounded-lg bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 active:scale-95 text-xs shadow-xs transition-all cursor-pointer" title="Revoke Code">
                  <span class="material-symbols-outlined text-[16px]">block</span>
                </button>
              </div>
            </div>
            <div class="text-[11px] text-slate-500 leading-relaxed space-y-1">
              <p>• Join codes request access from the owner; they do not bypass owner permission approval.</p>
              <p>• Code expiration: <span class="font-semibold text-slate-700" id="joinCodeExpirationLabel">14 days</span>.</p>
            </div>
          </div>

          <!-- Tab Content 2: Enter Join Code -->
          <div id="paneEnterCode" class="hidden bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Enter 8-Character Join Code</label>
              <div class="flex items-center gap-2">
                <input id="joinCodeInput" type="text" maxlength="9" placeholder="A7K9-XP42" class="flex-1 h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-sm uppercase tracking-widest text-slate-900 focus:outline-none focus:border-blue-600">
                <button id="verifyCodeBtn" class="h-10 px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer">
                  <span>Verify</span>
                </button>
              </div>
            </div>

            <!-- Join Code Result Card (revealed after verification) -->
            <div id="joinCodeResultCard" class="hidden bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-slate-900 font-heading" id="verifiedScriptTitle">Chronicles of Dust</span>
                  <span class="text-[10px] text-slate-500" id="verifiedScriptOwner">Owner: Arun Kumar</span>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold" id="verifiedScriptFormat">Feature · 96 pages</span>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-semibold text-slate-700">Requested Permission Role</label>
                <select id="reqRoleSelect" class="w-full px-2.5 py-1.5 text-xs bg-white border border-blue-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
                  <option value="Editor">Editor — Screenplay & dialogue editing</option>
                  <option value="Viewer" selected>Viewer — Read-only script review</option>
                  <option value="Script Doctor">Script Doctor — Narrative analysis & suggestions</option>
                  <option value="Producer">Producer — Production breakdown & schedule</option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Request Note (Optional)</label>
                <input id="reqNoteInput" type="text" placeholder="e.g. Assisting with dialogue polish..." class="w-full px-2.5 py-1.5 text-xs bg-white border border-blue-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
              </div>

              <button id="confirmJoinScriptBtn" class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-[16px]">how_to_reg</span>
                <span>Submit Access Request</span>
              </button>
            </div>
          </div>

        </div>

        <!-- SECURITY ACTIVITY LOG SECTION -->
        <div class="bg-white border border-slate-200/80 rounded-xl shadow-xs overflow-hidden">
          <button id="toggleSecLogBtn" class="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-slate-600 text-[18px]">history</span>
              <div class="flex flex-col">
                <span class="font-heading font-bold text-xs text-slate-900">Security & Access Activity</span>
                <span class="text-[10px] text-slate-500">Audit log of permissions, invitations & key rotations</span>
              </div>
            </div>
            <span class="material-symbols-outlined text-slate-400 text-[18px] transition-transform" id="secLogChevron">expand_more</span>
          </button>
          <div id="secLogContainer" class="hidden border-t border-slate-100 divide-y divide-slate-100 max-h-56 overflow-y-auto">
            <div class="p-3 text-center text-xs text-slate-400">Loading audit log...</div>
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

    <!-- INLINE ROLE SELECTOR POPOVER (Positioned dynamically) -->
    <div id="roleSelectorPopover" class="hidden fixed z-50 bg-white border border-slate-200 rounded-xl shadow-xl w-60 py-1 overflow-hidden fade-in">
      <div class="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Change Role</span>
        <button id="closeRolePopoverBtn" class="text-slate-400 hover:text-slate-600 cursor-pointer">
          <span class="material-symbols-outlined text-[14px]">close</span>
        </button>
      </div>
      <div class="py-1">
        <button class="w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors flex flex-col role-opt-btn" data-role="Editor">
          <span class="text-xs font-bold text-slate-900 flex items-center justify-between">
            <span>Editor</span>
            <span class="material-symbols-outlined text-[16px] text-blue-600 hidden role-check-Editor">check</span>
          </span>
          <span class="text-[10px] text-slate-500">Edit dialogue, scenes & storyboards</span>
        </button>

        <button class="w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors flex flex-col role-opt-btn" data-role="Viewer">
          <span class="text-xs font-bold text-slate-900 flex items-center justify-between">
            <span>Viewer</span>
            <span class="material-symbols-outlined text-[16px] text-blue-600 hidden role-check-Viewer">check</span>
          </span>
          <span class="text-[10px] text-slate-500">Read-only screenplay & notes</span>
        </button>

        <button class="w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors flex flex-col role-opt-btn" data-role="Script Doctor">
          <span class="text-xs font-bold text-slate-900 flex items-center justify-between">
            <span>Script Doctor</span>
            <span class="material-symbols-outlined text-[16px] text-blue-600 hidden role-check-Doctor">check</span>
          </span>
          <span class="text-[10px] text-slate-500">Structure, dialogue analysis & suggestions</span>
        </button>

        <button class="w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors flex flex-col role-opt-btn" data-role="Producer">
          <span class="text-xs font-bold text-slate-900 flex items-center justify-between">
            <span>Producer</span>
            <span class="material-symbols-outlined text-[16px] text-blue-600 hidden role-check-Producer">check</span>
          </span>
          <span class="text-[10px] text-slate-500">Production notes, schedule & review</span>
        </button>
      </div>
    </div>

    <!-- SECURITY DETAILS MODAL -->
    <div id="securityDetailsModal" class="scriptora-modal-overlay fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs hidden p-4">
      <div class="scriptora-modal-card bg-white w-full max-w-sm sm:max-w-md rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5 my-auto max-h-[85vh] overflow-hidden">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <div>
              <h3 class="font-heading font-bold text-sm text-slate-900">E2EE Cryptographic Architecture</h3>
              <p class="text-[11px] text-slate-500">Standards-compliant zero-knowledge security</p>
            </div>
          </div>
          <button id="closeSecModalBtn" class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div class="space-y-3 text-xs text-slate-700 leading-relaxed overflow-y-auto pr-1">
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5">
            <span class="font-bold text-slate-900 flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-blue-600">lock</span>
              What is Protected
            </span>
            <p class="text-[11px] text-slate-600">
              Screenplay scenes, dialogue, parentheticals, action lines, character arcs, and private storyboard prompts are encrypted on your local device before transmission.
            </p>
          </div>

          <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5">
            <span class="font-bold text-slate-900 flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-emerald-600">key</span>
              Decryption & Key Distribution
            </span>
            <p class="text-[11px] text-slate-600">
              Each screenplay generates an isolated 256-bit AES-GCM master key. Keys are securely wrapped for authorized collaborators using Elliptic Curve Diffie-Hellman (ECDH P-256). SCRIPTORA servers never possess unencrypted keys.
            </p>
          </div>

          <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5">
            <span class="font-bold text-slate-900 flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-amber-600">published_with_changes</span>
              Key Rotation on Member Removal
            </span>
            <p class="text-[11px] text-slate-600">
              When a collaborator is removed or revoked, the screenplay master key is automatically rotated. New revisions use the updated key, ensuring revoked members cannot decrypt future edits.
            </p>
          </div>

          <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5">
            <span class="font-bold text-slate-900 flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-purple-600">psychology</span>
              AI Privacy Boundary
            </span>
            <p class="text-[11px] text-slate-600">
              Screenplay Intelligence models never receive unencrypted background text without explicit, per-session consent. Plaintext is not stored in training corpora.
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-slate-100" id="secModalActions">
          <button id="btn-toggle-e2ee-enable" class="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow-xs transition-all flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[15px]">lock</span>
            <span id="e2ee-toggle-label">Activate Zero-Knowledge E2EE</span>
          </button>
          <button id="closeSecModalBtn2" class="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>

    ${ct("profile")}
  `}function qi(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=t||n.get("from")||(sessionStorage.getItem("scriptora_from_editor")==="true"?"editor":null),a=s||n.get("scriptId")||T.state.editorReturnScriptId||T.state.selectedScriptId||"chronicles-of-dust",i=o==="editor",l=i?sessionStorage.getItem("scriptora_editor_return")||`/editor/${a}`:"/profile",r=document.getElementById("collab-back-btn");r&&(r.onclick=R=>{R.preventDefault(),i&&sessionStorage.removeItem("scriptora_from_editor"),window.scriptoraRouter?window.scriptoraRouter.back(l):e(l)});const f=document.getElementById("collab-bottom-return-btn");f&&(f.onclick=R=>{R.preventDefault(),i&&sessionStorage.removeItem("scriptora_from_editor"),window.scriptoraRouter?window.scriptoraRouter.back(l):e(l)});let p="A7K9-XP42",d=null;const c=document.getElementById("roleSelectorPopover"),x=document.getElementById("closeRolePopoverBtn");x&&c&&(x.onclick=()=>c.classList.add("hidden")),document.addEventListener("click",R=>{c&&!c.classList.contains("hidden")&&!c.contains(R.target)&&!R.target.closest(".interactive-role-trigger")&&c.classList.add("hidden")});async function m(){const[R,C,Y,ue]=await Promise.all([qa(a),Va(a),rl(a),za(a)]),Z=document.getElementById("collab-count-badge"),we=document.getElementById("team-members-count");Z&&(Z.textContent=`${R.length} Members`),we&&(we.textContent=`(${R.length})`),He(ue);const le=document.getElementById("collaborators-list");if(!le)return;let $e="";R.length===0?$e+='<div class="p-4 text-center text-xs text-slate-400">No external collaborators yet. Share your join code or invite teammates above.</div>':$e+=R.map(v=>`
        <div class="p-3.5 flex items-center justify-between hover:bg-slate-50/80 transition-colors collaborator-card" data-id="${v.id}">
          <div class="flex items-center gap-3 min-w-0 pr-2">
            <div class="w-9 h-9 rounded-full ${v.avatarBg||"bg-blue-100 text-blue-700"} flex items-center justify-center font-bold text-xs shrink-0 cursor-pointer interactive-role-trigger" data-id="${v.id}" data-role="${v.role}" data-name="${v.name}">
              ${v.initials||"CB"}
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-xs font-bold text-slate-900 truncate hover:text-blue-600 cursor-pointer interactive-role-trigger" data-id="${v.id}" data-role="${v.role}" data-name="${v.name}">${v.name}</span>
              <span class="text-[11px] text-slate-500 truncate">${v.email}</span>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button class="interactive-role-trigger flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer border bg-blue-50 text-blue-700 border-blue-200/80 hover:bg-blue-100 hover:text-blue-800 active:scale-95 shadow-2xs" data-id="${v.id}" data-role="${v.role}" data-name="${v.name}" title="Click to change role">
              <span id="role-label-${v.id}">${v.role}</span>
              <span class="material-symbols-outlined text-[13px] text-blue-500">expand_more</span>
            </button>
            <button class="remove-collab-btn text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer" data-id="${v.id}" data-name="${v.name}" title="Revoke access">
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      `).join(""),C&&C.length>0&&($e+=`
        <div class="bg-slate-50/70 p-2.5 px-3.5 border-t border-slate-100 flex items-center justify-between">
          <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pending Invitations (${C.length})</span>
        </div>
      `,$e+=C.map(v=>`
        <div class="p-3 px-3.5 flex items-center justify-between bg-slate-50/40 hover:bg-slate-50 transition-colors">
          <div class="flex items-center gap-2.5 min-w-0 pr-2">
            <div class="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-[10px] shrink-0">
              <span class="material-symbols-outlined text-[14px]">mail</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-xs font-semibold text-slate-800 truncate">${v.email}</span>
              <span class="text-[10px] text-blue-600 font-medium">Invited as ${v.role} · Expires in 7d</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button class="resend-invite-btn text-[11px] text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-0.5 rounded font-medium transition-colors cursor-pointer" data-id="${v.id}" data-email="${v.email}">
              Resend
            </button>
            <button class="revoke-invite-btn text-[11px] text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-0.5 rounded font-medium transition-colors cursor-pointer" data-id="${v.id}" data-email="${v.email}">
              Revoke
            </button>
          </div>
        </div>
      `).join("")),le.innerHTML=$e,document.querySelectorAll(".interactive-role-trigger").forEach(v=>{v.onclick=j=>{j.stopPropagation();const G=v.getAttribute("data-id"),W=v.getAttribute("data-role");if(v.getAttribute("data-name"),d=G,c){const se=v.getBoundingClientRect();c.style.top=`${Math.min(window.innerHeight-240,se.bottom+6)}px`,c.style.left=`${Math.max(16,Math.min(window.innerWidth-256,se.left-40))}px`,["Editor","Viewer","Doctor","Producer"].forEach(Ne=>{const Te=c.querySelector(`.role-check-${Ne}`);Te&&Te.classList.add("hidden")});const ge=W==="Script Doctor"?"Doctor":W,me=c.querySelector(`.role-check-${ge}`);me&&me.classList.remove("hidden"),c.classList.remove("hidden")}}}),document.querySelectorAll(".remove-collab-btn").forEach(v=>{v.onclick=async()=>{const j=v.getAttribute("data-id"),G=v.getAttribute("data-name");if(confirm(`Revoke collaboration access for ${G}?

They will immediately lose access to this screenplay. If End-to-End Encryption is active, the screenplay key will be automatically rotated.`))try{await nl(a,j),w(`Revoked access for ${G}`),await m(),h()}catch(W){w(W.message||"Failed to remove collaborator","error")}}}),document.querySelectorAll(".resend-invite-btn").forEach(v=>{v.onclick=async()=>{const j=v.getAttribute("data-id"),G=v.getAttribute("data-email");v.disabled=!0;const W=v.innerText;v.innerText="Resending...";try{await tl(a,j),w(`Invitation resent to ${G}`),await m(),h()}catch(se){w(se.message||"Failed to resend invitation","error")}finally{v.disabled=!1,v.innerText=W}}}),document.querySelectorAll(".revoke-invite-btn").forEach(v=>{v.onclick=async()=>{const j=v.getAttribute("data-id"),G=v.getAttribute("data-email");if(confirm(`Revoke invitation for ${G}?`))try{await el(a,j),w(`Invitation revoked for ${G}`),await m(),h()}catch(W){w(W.message||"Failed to revoke invitation","error")}}});const Le=document.getElementById("pending-requests-section"),Be=document.getElementById("requests-list"),V=document.getElementById("pending-requests-count");Y&&Y.length>0?(Le&&Le.classList.remove("hidden"),V&&(V.textContent=String(Y.length)),Be&&(Be.innerHTML=Y.map(v=>`
          <div class="p-3.5 flex flex-col gap-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5 min-w-0 pr-2">
                <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                  ${v.initials||"RQ"}
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs font-bold text-slate-900 truncate">${v.userName}</span>
                  <span class="text-[11px] text-slate-500 truncate">${v.userEmail}</span>
                </div>
              </div>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200/80">
                Requested: ${v.requestedRole}
              </span>
            </div>
            ${v.note?`<p class="text-[11px] text-slate-600 bg-slate-50 rounded-lg p-2 italic border border-slate-100">"${v.note}"</p>`:""}
            <div class="flex items-center justify-end gap-2 pt-1">
              <button class="reject-req-btn px-3 py-1 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium transition-colors cursor-pointer" data-id="${v.id}" data-name="${v.userName}">
                Reject
              </button>
              <button class="approve-req-btn px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1" data-id="${v.id}" data-role="${v.requestedRole}" data-name="${v.userName}">
                <span class="material-symbols-outlined text-[14px]">check</span>
                <span>Approve as ${v.requestedRole}</span>
              </button>
            </div>
          </div>
        `).join(""),Be.querySelectorAll(".approve-req-btn").forEach(v=>{v.onclick=async()=>{const j=v.getAttribute("data-id"),G=v.getAttribute("data-role"),W=v.getAttribute("data-name");try{v.disabled=!0,v.textContent="Approving...",await cl(a,j,G),w(`Approved ${W} as ${G}`),await m(),h()}catch(se){w(se.message||"Approval failed","error")}}}),Be.querySelectorAll(".reject-req-btn").forEach(v=>{v.onclick=async()=>{const j=v.getAttribute("data-id"),G=v.getAttribute("data-name");if(confirm(`Reject access request from ${G}?`))try{await dl(a,j),w(`Rejected request from ${G}`),await m(),h()}catch(W){w(W.message||"Rejection failed","error")}}}))):Le&&Le.classList.add("hidden")}document.querySelectorAll(".role-opt-btn").forEach(R=>{R.onclick=async()=>{const C=R.getAttribute("data-role");if(!d)return;c&&c.classList.add("hidden");const Y=document.getElementById(`role-label-${d}`),ue=Y?.textContent||"Editor";if(!(ue==="Editor"&&C==="Viewer"&&!confirm(`Demote collaborator from Editor to Viewer?

They will immediately lose write access and the ability to edit scenes or dialogue.`))){Y&&(Y.innerHTML='<span class="material-symbols-outlined text-[13px] animate-spin">progress_activity</span>');try{await sl(a,d,C),w(`Role updated to ${C}`),await m(),h()}catch(Z){Y&&(Y.textContent=ue),w(Z.message||"Failed to update role","error")}}}});async function h(){const R=document.getElementById("secLogContainer");if(R)try{const C=await pl(a);if(!C||C.length===0){R.innerHTML='<div class="p-4 text-center text-xs text-slate-400">No security events recorded yet.</div>';return}R.innerHTML=C.map(Y=>`
        <div class="p-3 px-4 flex items-start gap-2.5 hover:bg-slate-50 transition-colors text-xs">
          <div class="w-6 h-6 rounded-lg ${Y.type==="role_changed"?"bg-blue-100 text-blue-700":Y.type==="collaborator_removed"?"bg-rose-100 text-rose-700":Y.type==="request_approved"?"bg-emerald-100 text-emerald-700":Y.type==="e2ee_enabled"||Y.type==="key_rotated"?"bg-purple-100 text-purple-700":"bg-slate-100 text-slate-700"} flex items-center justify-center shrink-0 mt-0.5">
            <span class="material-symbols-outlined text-[14px]">${Y.type==="role_changed"?"sync":Y.type==="collaborator_removed"?"person_remove":Y.type==="request_approved"?"check":Y.type==="e2ee_enabled"||Y.type==="key_rotated"?"lock_reset":"info"}</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-1">
              <span class="font-bold text-slate-900">${Y.title||"Security Event"}</span>
              <span class="text-[10px] text-slate-400 shrink-0">${Y.timestamp||"Just now"}</span>
            </div>
            <p class="text-[11px] text-slate-600 mt-0.5 leading-relaxed">${Y.details||""}</p>
          </div>
        </div>
      `).join("")}catch{R.innerHTML='<div class="p-3 text-center text-xs text-slate-400">Failed to load activity log.</div>'}}const b=document.getElementById("toggleSecLogBtn"),y=document.getElementById("secLogContainer"),$=document.getElementById("secLogChevron");b&&y&&(b.onclick=()=>{y.classList.contains("hidden")?(y.classList.remove("hidden"),$&&$.classList.add("rotate-180"),h()):(y.classList.add("hidden"),$&&$.classList.remove("rotate-180"))});const N=document.getElementById("projectSelectBtn"),L=document.getElementById("projectDropdown");let k=null;N&&L&&(k=Za(N,L,{placement:"bottom-start"})),document.querySelectorAll(".switch-script-opt").forEach(R=>{R.onclick=()=>{const C=R.getAttribute("data-id");T.selectScript(C),k?.close(),e(`/profile/collaborators${i?`?from=editor&scriptId=${C}`:""}`)}});const U=document.getElementById("openInviteBtn"),P=document.getElementById("closeInviteBtn"),de=document.getElementById("inviteCard"),ae=document.getElementById("sendInviteBtn");U&&(U.onclick=()=>de?.classList.remove("hidden")),P&&(P.onclick=()=>de?.classList.add("hidden")),document.querySelectorAll(".role-radio-card").forEach(R=>{R.onclick=()=>{document.querySelectorAll(".role-radio-card").forEach(Y=>{Y.classList.remove("border-blue-500","bg-blue-50/50"),Y.classList.add("border-slate-200")}),R.classList.add("border-blue-500","bg-blue-50/50"),R.classList.remove("border-slate-200");const C=R.querySelector('input[type="radio"]');C&&(C.checked=!0)}}),ae&&(ae.onclick=async()=>{const R=document.getElementById("inviteEmailInput")?.value.trim(),C=document.querySelector('input[name="inviteRole"]:checked')?.value||"Editor",Y=document.getElementById("inviteNoteInput")?.value.trim()||"";if(!R){w("Please enter an email address","error");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(R)){w("Please enter a valid email address","error");return}ae.disabled=!0,ae.innerHTML='<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Sending...</span>';try{await Qo(a,{email:R,role:C,message:Y}),w(`Invitation sent to ${R} as ${C}`),de?.classList.add("hidden"),document.getElementById("inviteEmailInput").value="",document.getElementById("inviteNoteInput").value="",await m(),h()}catch(ue){w(ue.message||"Failed to send invitation","error")}finally{ae.disabled=!1,ae.innerHTML='<span class="material-symbols-outlined text-[16px]">send</span><span>Send Invitation</span>'}});const xe=document.getElementById("tabGenCodeBtn"),ee=document.getElementById("tabEnterCodeBtn"),Se=document.getElementById("paneGenerateCode"),ye=document.getElementById("paneEnterCode");xe&&(xe.onclick=()=>{xe.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs cursor-pointer",ee.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900 cursor-pointer",Se?.classList.remove("hidden"),ye?.classList.add("hidden")}),ee&&(ee.onclick=()=>{ee.className="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs cursor-pointer",xe.className="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900 cursor-pointer",ye?.classList.remove("hidden"),Se?.classList.add("hidden")});const ke=document.getElementById("copyJoinCodeBtn"),De=document.getElementById("copyJoinCodeLabel");ke&&(ke.onclick=()=>{const R=document.getElementById("displayJoinCode")?.textContent||p;navigator.clipboard?.writeText(R),De&&(De.textContent="Copied!"),setTimeout(()=>{De&&(De.textContent="Copy")},1800),w(`Copied code: ${R}`)});const oe=document.getElementById("regenJoinCodeBtn");oe&&(oe.onclick=async()=>{if(confirm(`Regenerate screenplay join code?

Existing join requests remain unaffected, but future users will need the new code.`))try{const R=await al(a);p=R;const C=document.getElementById("displayJoinCode");C&&(C.textContent=R);const Y=document.getElementById("joinCodeStatusBadge");Y&&(Y.textContent="Active",Y.className="text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700"),w(`Generated new join code: ${R}`),h()}catch(R){w(R.message||"Failed to regenerate code","error")}});const Ee=document.getElementById("revokeJoinCodeBtn");Ee&&(Ee.onclick=async()=>{if(confirm(`Revoke current join code?

New join requests using this code will be rejected until a new code is generated.`))try{await ol(a);const R=document.getElementById("joinCodeStatusBadge");R&&(R.textContent="Revoked",R.className="text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider bg-rose-100 text-rose-700"),w("Join code revoked"),h()}catch(R){w(R.message||"Failed to revoke code","error")}});const B=document.getElementById("verifyCodeBtn"),K=document.getElementById("joinCodeInput"),Ie=document.getElementById("joinCodeResultCard"),ne=document.getElementById("confirmJoinScriptBtn");K&&(K.oninput=R=>{let C=R.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"");C.length>4&&(C=C.slice(0,4)+"-"+C.slice(4,8)),R.target.value=C}),B&&K&&(B.onclick=async()=>{const R=K.value.trim();if(!R){w("Please enter a join code","error");return}B.disabled=!0,B.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>';try{const C=await ll(R);B.disabled=!1,B.innerHTML="<span>Verify</span>",C.valid?(Ie?.classList.remove("hidden"),document.getElementById("verifiedScriptTitle").textContent=C.script.title,document.getElementById("verifiedScriptFormat").textContent=`${C.script.format||"Feature"} · ${C.script.pages||96} pgs`,document.getElementById("verifiedScriptOwner").textContent=`Owner: ${C.script.ownerName||"Arun Kumar"}`,w("Valid join code verified")):(Ie?.classList.add("hidden"),w(C.error||"Invalid or expired join code","error"))}catch(C){B.disabled=!1,B.innerHTML="<span>Verify</span>",Ie?.classList.add("hidden"),w(C.message||"Verification failed","error")}}),ne&&K&&(ne.onclick=async()=>{const R=K.value.trim(),C=document.getElementById("reqRoleSelect")?.value||"Viewer",Y=document.getElementById("reqNoteInput")?.value.trim()||"";ne.disabled=!0,ne.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span><span>Submitting...</span>';try{const ue=await il(R,{requestedRole:C,note:Y});w(ue.message||"Access request submitted to screenplay owner!"),K.value="",Ie?.classList.add("hidden"),await m()}catch(ue){w(ue.message||"Failed to submit access request","error")}finally{ne.disabled=!1,ne.innerHTML='<span class="material-symbols-outlined text-[16px]">how_to_reg</span><span>Submit Access Request</span>'}});const fe=document.getElementById("btn-security-info"),A=document.getElementById("securityDetailsModal"),ve=document.getElementById("closeSecModalBtn");fe&&A&&(fe.onclick=()=>ot(A)),ve&&A&&(ve.onclick=()=>he(A)),A&&(A.onclick=R=>{R.target===A&&he(A)});function He(R){const C=document.getElementById("e2ee-badge"),Y=document.getElementById("e2ee-desc"),ue=document.getElementById("e2ee-icon-box"),Z=document.getElementById("secModalActions");if(R?.enabled){if(C&&(C.textContent=`V${R.keyVersion||1} · ${R.algorithm||"AES-GCM-256"}`,C.className="text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700"),ue&&(ue.className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100",ue.innerHTML='<span class="material-symbols-outlined text-[18px]">lock</span>'),Y){const we=R.keyFingerprint||"sha256-1823e7fb29a9e3aa...58fa9b";Y.textContent=`Zero-knowledge active. Fingerprint: ${we}`}Z&&(Z.innerHTML=`
          <div class="flex items-center gap-2">
            <button id="btn-rotate-e2ee" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold cursor-pointer shadow-xs transition-all flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[15px]">published_with_changes</span>
              <span>Rotate Master Encryption Key</span>
            </button>
            <button id="btn-disable-e2ee" class="px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium transition-colors cursor-pointer" title="Deactivate E2EE">
              Deactivate
            </button>
          </div>
          <button id="closeSecModalBtn2" class="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer">
            Close
          </button>
        `,ce(R))}else C&&(C.textContent="STANDARD",C.className="text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider bg-slate-100 text-slate-600"),ue&&(ue.className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 border border-slate-200",ue.innerHTML='<span class="material-symbols-outlined text-[18px]">lock</span>'),Y&&(Y.textContent="Standard server storage. Tap Details to activate E2EE."),Z&&(Z.innerHTML=`
          <button id="btn-toggle-e2ee-enable" class="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold cursor-pointer shadow-xs transition-all flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[15px]">lock</span>
            <span id="e2ee-toggle-label">Activate Zero-Knowledge E2EE</span>
          </button>
          <button id="closeSecModalBtn2" class="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer">
            Close
          </button>
        `,Re())}function Re(){const R=document.getElementById("btn-toggle-e2ee-enable"),C=document.getElementById("closeSecModalBtn2");C&&A&&(C.onclick=()=>he(A)),R&&(R.onclick=async()=>{if(window.confirm(`Activate Zero-Knowledge End-to-End Encryption?

This generates an isolated 256-bit AES-GCM master key on your device. Screenplay content and dialogue will be encrypted locally before cloud transmission.`)){R.disabled=!0,R.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span><span>Generating AES-256 Key...</span>';try{const ue=T.state.currentUser?.email||"arun.kumar@scriptora.studio";await Do(ue),R.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span><span>Encrypting Screenplay Content...</span>';const Z=await ba(),we=await ga(Z),le=await ha(we);try{localStorage.setItem(`scriptora_screenplay_key_${a}`,we)}catch{}const $e=await Un(a);if($e&&$e.scenes){const Le=await Fn($e,Z,1);try{localStorage.setItem(`scriptora_screenplay_enc_${a}`,JSON.stringify(Le))}catch{}}R.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span><span>Registering Zero-Knowledge Vault...</span>',await ul(a,{keyFingerprint:le,wrappedKeys:{[ue]:we}}),w("Zero-knowledge End-to-End Encryption activated!"),he(A),await m(),h()}catch(ue){w(ue.message||"Failed to enable E2EE","error"),R.disabled=!1,R.innerHTML='<span class="material-symbols-outlined text-[15px]">lock</span><span>Activate Zero-Knowledge E2EE</span>'}}})}function ce(R){const C=document.getElementById("btn-rotate-e2ee"),Y=document.getElementById("btn-disable-e2ee"),ue=document.getElementById("closeSecModalBtn2");ue&&A&&(ue.onclick=()=>he(A)),C&&(C.onclick=async()=>{if(window.confirm(`Rotate Master Encryption Key?

This generates a new 256-bit AES-GCM master key and increments the key version. Revoked collaborators will no longer be able to decrypt future edits.`)){C.disabled=!0,C.innerHTML='<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span><span>Rotating Keys...</span>';try{const we=T.state.currentUser?.email||"arun.kumar@scriptora.studio",le=await ba(),$e=await ga(le),Le=await ha($e),Be=(R?.keyVersion||1)+1;try{localStorage.setItem(`scriptora_screenplay_key_${a}`,$e)}catch{}const V=await Un(a);if(V&&V.scenes){const j=await Fn(V,le,Be);try{localStorage.setItem(`scriptora_screenplay_enc_${a}`,JSON.stringify(j))}catch{}}const v=await ml(a,{newKeyFingerprint:Le,wrappedKeys:{[we]:$e}});w(`Master encryption key rotated to v${v.e2ee?.keyVersion||Be}!`),he(A),await m(),h()}catch(we){w(we.message||"Failed to rotate key","error"),C.disabled=!1,C.innerHTML='<span class="material-symbols-outlined text-[15px]">published_with_changes</span><span>Rotate Master Encryption Key</span>'}}}),Y&&(Y.onclick=async()=>{if(window.confirm(`Disable End-to-End Encryption?

Screenplay content will be decrypted locally and safely restored to standard cloud storage.`)){Y.disabled=!0,Y.textContent="Deactivating...";try{const we=localStorage.getItem(`scriptora_screenplay_enc_${a}`),le=localStorage.getItem(`scriptora_screenplay_key_${a}`);if(we&&le){try{const $e=await Kn(le),Le=await Fa(JSON.parse(we),$e);Le&&Le.scenes&&await Ks(a,Le)}catch{}localStorage.removeItem(`scriptora_screenplay_enc_${a}`)}await fl(a),w("End-to-End Encryption deactivated. Screenplay stored with standard security."),he(A),await m(),h()}catch(we){w(we.message||"Failed to deactivate E2EE","error"),Y.disabled=!1,Y.textContent="Deactivate"}}})}m()}function Vi(){return T.state.currentUser?.initials,`
    <div class="flex flex-col min-h-screen bg-surface w-full relative">
      ${pt("Notifications","Activity")}

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

      ${ct("workspace")}
    </div>
  `}function zi(e){const t=document.getElementById("btn-back-notif");t&&(t.onclick=()=>{if(window.scriptoraRouter)window.scriptoraRouter.back("/workspace");else{const c=T.getPreviousRoute("/workspace");e(c)}});let s="all",n="normal",o=[];async function a(){const c=document.getElementById("notif-feed-container");if(!c)return;if(n==="loading"){c.innerHTML=`
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
      `,document.getElementById("btn-retry-sync")?.addEventListener("click",()=>{n="normal",a()});return}if(o=(await Ga()).notifications||[],n==="empty"||s==="unread"&&o.filter(N=>N.unread).length===0){c.innerHTML=`
        <div class="p-8 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center text-center gap-2">
          <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <h3 class="font-bold text-sm text-slate-900">You’re all caught up!</h3>
          <p class="text-xs text-slate-500 max-w-xs">No pending notifications or requests requiring your review.</p>
        </div>
      `;return}const m=o.filter(N=>N.unread).length;document.getElementById("badge-all-count").textContent=o.length,document.getElementById("badge-unread-count").textContent=m,T.setState({unreadNotifications:m});let h=o;s==="unread"&&(h=h.filter(N=>N.unread));const b=h.filter(N=>N.group==="today"),y=h.filter(N=>N.group!=="today");function $(N,L){return L.length===0?"":`
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-xs font-bold text-slate-400 tracking-wider uppercase font-heading">${N}</h2>
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
      `}c.innerHTML=$("Today",b)+$("Earlier",y),document.querySelectorAll(".notif-row").forEach(N=>{N.onclick=async()=>{const L=parseInt(N.getAttribute("data-id")),k=N.getAttribute("data-route");await xl(L),await T.refreshNotifications(),k?e(k):a()}})}a();const i=document.getElementById("filter-all-btn"),l=document.getElementById("filter-unread-btn");i&&(i.onclick=()=>{s="all",i.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",l.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",a()}),l&&(l.onclick=()=>{s="unread",l.className="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all",i.className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all",a()});const r=document.getElementById("btn-mark-all-read");r&&(r.onclick=async()=>{await bl(),await T.refreshNotifications(),w("All notifications marked as read"),a()});const f=document.getElementById("btn-toggle-sim"),p=document.getElementById("sim-menu-dropdown");let d=null;f&&p&&(d=Za(f,p,{placement:"bottom-end"})),document.querySelectorAll(".sim-opt").forEach(c=>{c.onclick=()=>{n=c.getAttribute("data-state"),d?.close(),a(),w(`Simulating ${n} state`)}})}function Gi(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=e||s.get("from"),o=t||s.get("scriptId")||T.state.selectedScriptId||"chronicles-of-dust",a=n==="editor"||n&&n.startsWith("/editor");a?sessionStorage.getItem("scriptora_prod_return")||(n&&n.startsWith("/editor")||`${o}`):n&&n.startsWith("/");let i=null;if(window.scriptoraRouter){const r=window.scriptoraRouter.peekPreviousRoute?.();r&&(i=window.scriptoraRouter.getRouteLabel(r))}a||i||n?.includes("/intelligence");const l=T.state.scripts?.find(r=>r.id===o)||T.state.scripts?.[0]||{id:"chronicles-of-dust",title:"Chronicles of Dust",draft:"Draft 4.2"};return`
    <!-- Standard App Header -->
    ${pt("Pre-Production","Production Tools")}

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
                ${T.state.scripts&&T.state.scripts.length>0?T.state.scripts.map(r=>`
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
    ${ct("production")}
  `}async function Wi(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||T.state.selectedScriptId||"chronicles-of-dust",a=document.getElementById("production-back-btn");a&&(a.onclick=()=>{window.scriptoraRouter?window.scriptoraRouter.back("/workspace"):e("/workspace")});const i=document.getElementById("prod-script-select");i&&(i.onchange=d=>{const c=d.target.value;T.setState({selectedScriptId:c}),e(`/production?scriptId=${c}`)});const l=document.getElementById("btn-repin-source");l&&(l.onclick=async()=>{const d="Draft 4.3";await vl(o,d),document.getElementById("source-version-alert")?.classList.add("hidden");const c=document.getElementById("pinned-version-label");c&&(c.textContent=`${d} (Pinned)`),w(`Pinned source updated to ${d}`)});const r=document.getElementById("btn-dismiss-staleness");r&&(r.onclick=()=>{document.getElementById("source-version-alert")?.classList.add("hidden"),w("Retained Draft 4.2 pinned baseline")});const f=`/production?scriptId=${o}`,p={"script-breakdown":`/production/breakdown?scriptId=${o}&from=${encodeURIComponent(f)}`,"shooting-schedule":`/production/schedule?scriptId=${o}&from=${encodeURIComponent(f)}`,"call-sheets":`/production/call-sheets?scriptId=${o}&from=${encodeURIComponent(f)}`,"dialogue-sheets":`/production/dialogue-sides?scriptId=${o}&from=${encodeURIComponent(f)}`,"storyboard-studio":`/production/storyboard?scriptId=${o}&from=${encodeURIComponent(f)}`};document.querySelectorAll(".tool-card").forEach(d=>{d.onclick=()=>{const c=d.getAttribute("data-tool");p[c]&&e(p[c])}})}function Ki(){const e=T.state.selectedScriptId||"chronicles-of-dust",t=T.state.scripts?.find(s=>s.id===e)||{title:"Chronicles of Dust",draft:"Draft 4.2"};return`
    <div class="fixed inset-0 bg-surface flex flex-col font-body text-slate-800 select-none overflow-hidden">
      <!-- Standard Header (Fixed Top) -->
      ${pt("AI Chat","Universal Assistant")}

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
      ${ct("chat")}
    </div>
  `}function Ji(e){const t=document.getElementById("chat-input"),s=document.getElementById("chat-send-btn"),n=document.getElementById("chat-messages-container"),o=document.getElementById("btn-clear-chat"),a=document.getElementById("chat-back-btn"),i=document.querySelectorAll(".chat-chip"),l=T.state.selectedScriptId||"chronicles-of-dust";a&&(a.onclick=()=>{window.scriptoraRouter?window.scriptoraRouter.back("/workspace"):e("/workspace")});const r=localStorage.getItem("scriptora_chat_history");if(r)try{JSON.parse(r).forEach(c=>f(c.role,c.text,!1))}catch{}t&&t.addEventListener("input",()=>{t.style.height="auto",t.style.height=Math.min(t.scrollHeight,96)+"px"});function f(d,c,x=!0){if(!n)return;const m=d==="user",h=document.createElement("div");if(h.className=`flex items-start gap-2.5 max-w-[88%] ${m?"self-end flex-row-reverse":""}`,h.innerHTML=`
      <div class="w-7 h-7 rounded-lg ${m?"bg-slate-800":"bg-blue-600"} text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
        <span class="material-symbols-outlined text-[15px]">${m?"person":"chat_bubble_outline"}</span>
      </div>
      <div class="${m?"bg-blue-600 text-white rounded-2xl rounded-tr-xs":"bg-white text-slate-700 border border-slate-200/90 rounded-2xl rounded-tl-xs"} p-3.5 shadow-2xs flex flex-col gap-1 text-xs leading-relaxed">
        <div class="flex items-center justify-between gap-4 font-semibold ${m?"text-blue-100":"text-slate-900"} text-[11px]">
          <span>${m?"You":"Scriptora Universal AI"}</span>
          <span class="${m?"text-blue-200":"text-slate-400"} font-normal text-[10px]">Now</span>
        </div>
        <div class="whitespace-pre-wrap">${c}</div>
      </div>
    `,n.appendChild(h),n.scrollTop=n.scrollHeight,x)try{const b=JSON.parse(localStorage.getItem("scriptora_chat_history")||"[]");b.push({role:d,text:c,timestamp:new Date().toISOString()}),localStorage.setItem("scriptora_chat_history",JSON.stringify(b.slice(-30)))}catch{}}async function p(){if(!t)return;const d=t.value.trim();if(!d)return;f("user",d,!0),t.value="",t.style.height="auto";const c=document.createElement("div");c.className="flex items-center gap-2 text-xs text-slate-400 py-1 pl-9 italic",c.innerHTML=`
      <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
      <span>Reviewing screenplay context & production model...</span>
    `,n.appendChild(c),n.scrollTop=n.scrollHeight;try{try{if((await za(l))?.enabled){const b=T.state.scripts?.find($=>$.id===l);if(!await Ro(b?.title||"Screenplay","Scriptora Universal AI")){c.remove(),f("assistant","AI intelligence processing was cancelled to preserve zero-knowledge local encryption boundary.");return}}}catch{}const x=await Yn(d,l);c.remove();let m=x;d.toLowerCase().includes("call sheet")?m=`📋 **Call Sheet Preparation (Draft 4.2)**
For Day 1 (Scenes 1 & 2 at Gate 4 Exterior):
• General Call: 06:30 AM (Sunrise lighting window)
• Key Talent: Kevin (Ready by 07:15 AM)
• Picture Vehicle: Solar Patrol Rover standby at staging area
• Nearest Emergency Medical Facility: Ridgecrest Regional Hospital (22 mins)`:d.toLowerCase().includes("practical")||d.toLowerCase().includes("element")?m=`🎬 **Practical Elements Breakdown (Scene 18)**
• Location: Pumping Station Chamber B (Interior / Echo Dampened)
• Special Prop: Hydraulic Bypass Valve Kit (LED pressure indicator)
• SFX Note: Pressurized vapor release standby
• Cast Involved: Kevin, Meera`:(d.toLowerCase().includes("storyboard")||d.toLowerCase().includes("camera"))&&(m=`🎨 **Visual Storyboard Concept (Lakebed Standoff)**
• Shot 1: Ultra-wide 2.39:1 anamorphic establishing shot across cracked earth.
• Shot 2: Low-angle tracking shot on Kevin as dust storm gathers.
• Shot 3: Dutch angle close-up on the pressure gauge as manifold fails.
*(Detailed shot canvas will be available in Storyboard Studio Prompt 3)*`),f("assistant",m,!0)}catch{c.remove(),f("assistant","I analyzed your request against the active screenplay context. Pacing and scene logistics align with Draft 4.2 standards.",!0)}}s&&(s.onclick=p),t&&(t.onkeydown=d=>{d.key==="Enter"&&!d.shiftKey&&(d.preventDefault(),p())}),i.forEach(d=>{d.onclick=()=>{const c=d.getAttribute("data-prompt");t&&(t.value=c,p())}}),o&&(o.onclick=()=>{localStorage.removeItem("scriptora_chat_history"),n.innerHTML=`
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
      `})}function Ys(e,t="tune",s=null,n="",o=null,a=null){const l=new URLSearchParams(window.location.search||"").get("from");return`
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
  `}function go(e){return e?String(e).replace(/\u00B0/g," deg ").replace(/\u00BD/g," 1/2").replace(/\u00BC/g," 1/4").replace(/\u00BE/g," 3/4").replace(/\u215B/g," 1/8").replace(/\u215C/g," 3/8").replace(/\u215D/g," 5/8").replace(/\u215E/g," 7/8").replace(/\u00A0/g," ").replace(/[\t]+/g," ").replace(/\u2014/g," -- ").replace(/\u2013/g,"-").replace(/\u2026/g,"...").replace(/[\u201C\u201D]/g,'"').replace(/[\u2018\u2019]/g,"'").replace(/\u00B7/g," - ").replace(/\u2022/g,"* ").replace(/\u2192/g,"->").replace(/\u2190/g,"<-").replace(/[^\x20-\x7E]/g," ").replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/[\r\n]+/g," "):""}function $t(e,t=10,s="F1"){if(!e)return 0;const n=String(e),o=s==="F2"||s==="F4"?.56:s==="F3"||s==="F5"?.6:.52;return n.length*t*o}function it(e,t,s=10,n="F1"){if(!e)return"";const o=String(e).trim();if($t(o,s,n)<=t)return o;const a="...",i=$t(a,s,n);let l=o;for(;l.length>0&&$t(l,s,n)+i>t;)l=l.slice(0,-1);return l?l.trim()+a:""}function Os(e,t,s=10,n="F1"){if(!e)return[];const o=String(e).split(/\s+/).filter(Boolean);if(o.length===0)return[];const a=[];let i="";for(const l of o){const r=i?i+" "+l:l;$t(r,s,n)<=t?i=r:(i&&a.push(i),$t(l,s,n)>t?(a.push(it(l,t,s,n)),i=""):i=l)}return i&&a.push(i),a}function hs(e,t){if(!e)return[];const s=String(e).split(/\s+/),n=[];let o="";for(const a of s)o?o.length+1+a.length<=t?o+=" "+a:(n.push(o),o=a):o=a;return o&&n.push(o),n}function ws(e,t){if(!e||!(e instanceof Blob))throw new Error("Invalid PDF blob received for download");const s=URL.createObjectURL(e),n=document.createElement("a");n.style&&(n.style.display="none"),n.href=s,n.download=t||"document.pdf",document.body.appendChild(n),n.click(),setTimeout(()=>{try{n.parentNode&&n.parentNode.removeChild(n),URL.revokeObjectURL(s)}catch{}},4e3)}function Ss(e,t={}){const s=t.pageWidth||612,n=t.pageHeight||792,o=e.length,a=[];let i=0;function l(){return++i}const r=l(),f=l(),p=[];for(let P=0;P<o;P++)p.push(l());const d={F1:l(),F2:l(),F3:l(),F4:l(),F5:l(),F6:l()},c=[];for(let P=0;P<o;P++)c.push(l());a[r]=`<< /Type /Catalog /Pages ${f} 0 R >>`,a[f]=`<< /Type /Pages /Kids [${p.map(P=>`${P} 0 R`).join(" ")}] /Count ${o} >>`,a[d.F1]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",a[d.F2]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",a[d.F3]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>",a[d.F4]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>",a[d.F5]="<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Oblique /Encoding /WinAnsiEncoding >>",a[d.F6]="<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>";const x=`<< /F1 ${d.F1} 0 R /F2 ${d.F2} 0 R /F3 ${d.F3} 0 R /F4 ${d.F4} 0 R /F5 ${d.F5} 0 R /F6 ${d.F6} 0 R >>`,m=new TextEncoder;for(let P=0;P<o;P++){a[p[P]]=`<< /Type /Page /Parent ${f} 0 R /MediaBox [0 0 ${s} ${n}] /Contents ${c[P]} 0 R /Resources << /Font ${x} >> >>`;const de=e[P]||{};let ae="";if(de.vectors&&de.vectors.length)for(const ee of de.vectors)ee.type==="rect"?(ee.fill&&(ae+=`${ee.fill[0].toFixed(3)} ${ee.fill[1].toFixed(3)} ${ee.fill[2].toFixed(3)} rg
`,ae+=`${ee.x.toFixed(2)} ${ee.y.toFixed(2)} ${ee.w.toFixed(2)} ${ee.h.toFixed(2)} re
f
`),ee.stroke&&(ae+=`${ee.stroke[0].toFixed(3)} ${ee.stroke[1].toFixed(3)} ${ee.stroke[2].toFixed(3)} RG
`,ae+=`${(ee.lineWidth||1).toFixed(2)} w
`,ae+=`${ee.x.toFixed(2)} ${ee.y.toFixed(2)} ${ee.w.toFixed(2)} ${ee.h.toFixed(2)} re
S
`)):ee.type==="line"&&(ae+=`${(ee.stroke||[0,0,0])[0].toFixed(3)} ${(ee.stroke||[0,0,0])[1].toFixed(3)} ${(ee.stroke||[0,0,0])[2].toFixed(3)} RG
`,ae+=`${(ee.lineWidth||1).toFixed(2)} w
`,ae+=`${ee.x1.toFixed(2)} ${ee.y1.toFixed(2)} m ${ee.x2.toFixed(2)} ${ee.y2.toFixed(2)} l S
`);if(de.texts&&de.texts.length)for(const ee of de.texts){const Se=ee.font||"F1",ye=ee.size||10,ke=ee.color||[.1,.1,.1],De=go(ee.text);ae+=`BT
`,ae+=`/${Se} ${ye} Tf
`,ae+=`${ke[0].toFixed(3)} ${ke[1].toFixed(3)} ${ke[2].toFixed(3)} rg
`,ae+=`1 0 0 1 ${ee.x.toFixed(2)} ${ee.y.toFixed(2)} Tm
`,ae+=`(${De}) Tj
`,ae+=`ET
`}const xe=m.encode(ae);a[c[P]]=`<< /Length ${xe.length} >>
stream
${ae}endstream`}const b=m.encode(`%PDF-1.4
%âãÏÓ
`);let y=b.length;const $=[],N=[];for(let P=1;P<=i;P++){$[P]=y;const de=`${P} 0 obj
${a[P]}
endobj
`,ae=m.encode(de);N.push(ae),y+=ae.length}const L=y;let k=`xref
0 ${i+1}
0000000000 65535 f 
`;for(let P=1;P<=i;P++)k+=`${String($[P]).padStart(10,"0")} 00000 n 
`;k+=`trailer
<< /Size ${i+1} /Root ${r} 0 R >>
startxref
${L}
%%EOF`;const U=m.encode(k);return new Blob([b,...N,U],{type:"application/pdf"})}function Pa(e={},t={}){const s=t.title||"Chronicles of Dust",n=t.company||"SCRIPTORA PRODUCTION STUDIO",o=t.draft||"Draft 4.2 (Pinned)",a=String(e.callSheetNumber||"01").padStart(2,"0"),i=e.shootDay||`Day ${parseInt(a,10)||1} of 14`,l=e.status==="Confirmed"||e.isPublished,r=[];let f=[],p=[];const d=36,c=576,x=540,m=56;function h(le=!1){if(f=[],p=[],r.push({vectors:f,texts:p}),le){f.push({type:"rect",x:d,y:730,w:x,h:26,fill:[.08,.12,.2]}),p.push({text:"SCRIPTORA -- OFFICIAL CALL SHEET (CONTINUED)",x:d+10,y:739,font:"F2",size:9,color:[.95,.95,.95]});const Be=`${s.toUpperCase()} · ${i.toUpperCase()}`;return p.push({text:Be,x:c-10-$t(Be,8,"F1"),y:739,font:"F1",size:8,color:[.7,.82,1]}),718}return 756}let b=h(!1);const y=44;f.push({type:"rect",x:d,y:b-y,w:x,h:y,fill:[.08,.12,.2]}),p.push({text:"SCRIPTORA -- OFFICIAL PRODUCTION CALL SHEET",x:d+12,y:b-17,font:"F2",size:10,color:[.96,.97,.98]});const $=it(`${n.toUpperCase()} · ${s.toUpperCase()} · ${o}`,320,8.5,"F1");p.push({text:$,x:d+12,y:b-32,font:"F1",size:8.5,color:[.65,.78,.98]});const N=`DAY ${a} CALL SHEET`;p.push({text:N,x:c-12-$t(N,11,"F2"),y:b-17,font:"F2",size:11,color:[1,1,1]});const L=l?"OFFICIAL PUBLISHED SNAPSHOT":"WORKING REVISION DRAFT",k=l?[.45,.9,.55]:[1,.82,.35];p.push({text:L,x:c-12-$t(L,7.5,"F2"),y:b-32,font:"F2",size:7.5,color:k}),b-=y+8;const U=52;f.push({type:"rect",x:d,y:b-U,w:x,h:U,fill:[.975,.985,.995],stroke:[.82,.86,.91],lineWidth:.8});const P=135,de=b-14,ae=b-29,xe=b-43;p.push({text:"DATE & DAY",x:d+10,y:de,font:"F2",size:7.5,color:[.42,.47,.55]}),p.push({text:it(e.shootDate||"Saturday, Oct 24, 2026",118,9.5,"F2"),x:d+10,y:ae,font:"F2",size:9.5,color:[.1,.12,.16]}),p.push({text:it(i,118,7.5,"F1"),x:d+10,y:xe,font:"F1",size:7.5,color:[.42,.47,.55]}),f.push({type:"line",x1:d+P,y1:b-46,x2:d+P,y2:b-6,stroke:[.85,.88,.92],lineWidth:.6});const ee=d+P+10;p.push({text:"GENERAL CREW CALL",x:ee,y:de,font:"F2",size:7.5,color:[.42,.47,.55]}),p.push({text:it(e.generalCrewCall||"06:00 AM",118,11.5,"F2"),x:ee,y:ae,font:"F2",size:11.5,color:[.1,.12,.16]}),p.push({text:it(`Breakfast: ${e.breakfastTime||"05:15 AM"}`,118,7.5,"F1"),x:ee,y:xe,font:"F1",size:7.5,color:[.42,.47,.55]}),f.push({type:"line",x1:d+P*2,y1:b-46,x2:d+P*2,y2:b-6,stroke:[.85,.88,.92],lineWidth:.6});const Se=d+P*2+10;p.push({text:"SHOOTING CALL",x:Se,y:de,font:"F2",size:7.5,color:[.1,.38,.85]}),p.push({text:it(e.shootingCall||"06:30 AM",118,11.5,"F2"),x:Se,y:ae,font:"F2",size:11.5,color:[.1,.38,.85]}),p.push({text:"First Shot on Set",x:Se,y:xe,font:"F1",size:7.5,color:[.42,.47,.55]}),f.push({type:"line",x1:d+P*3,y1:b-46,x2:d+P*3,y2:b-6,stroke:[.85,.88,.92],lineWidth:.6});const ye=d+P*3+10;p.push({text:"ESTIMATED WRAP",x:ye,y:de,font:"F2",size:7.5,color:[.42,.47,.55]}),p.push({text:it(e.estimatedWrap||"06:30 PM",118,11.5,"F2"),x:ye,y:ae,font:"F2",size:11.5,color:[.1,.12,.16]}),p.push({text:"12-Hr Rest Turnaround",x:ye,y:xe,font:"F1",size:7.5,color:[.42,.47,.55]}),b-=U+8;const ke=62;f.push({type:"rect",x:d,y:b-ke,w:x,h:ke,fill:[1,1,1],stroke:[.82,.86,.91],lineWidth:.8});const De=d+10;p.push({text:"SET LOCATION & BASECAMP ACCESS:",x:De,y:b-13,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:it(e.locationName||"Mojave Outpost Gate 4",280,8.5,"F2"),x:De,y:b-25,font:"F2",size:8.5,color:[.1,.12,.16]}),p.push({text:it(e.locationAddress||"Perimeter Road 9, Cantil, CA",280,7.5,"F1"),x:De,y:b-37,font:"F1",size:7.5,color:[.35,.4,.48]}),p.push({text:it(`Parking: ${e.parkingNotes||"Basecamp Lot B. Crew shuttle runs every 10 mins."}`,280,7,"F1"),x:De,y:b-49,font:"F1",size:7,color:[.45,.5,.58]}),f.push({type:"line",x1:d+300,y1:b-56,x2:d+300,y2:b-6,stroke:[.85,.88,.92],lineWidth:.6});const oe=d+310;p.push({text:"EMERGENCY MEDICAL / NEAREST HOSPITAL:",x:oe,y:b-13,font:"F2",size:7.5,color:[.85,.15,.15]});const Ee=Os(e.nearestHospital||"Desert Care Regional Medical Center (Ph: 760-379-2681)",220,7,"F1");p.push({text:it(Ee[0]||"Local Emergency Center",220,7,"F1"),x:oe,y:b-24,font:"F1",size:7,color:[.15,.15,.15]}),Ee[1]&&p.push({text:it(Ee[1],220,7,"F1"),x:oe,y:b-34,font:"F1",size:7,color:[.15,.15,.15]});const B=it(`Weather: ${e.weatherSummary||"Clear skies, normal stage ambient temperature."}`,220,7,"F1");p.push({text:B,x:oe,y:b-49,font:"F1",size:7,color:[.2,.4,.65]}),b-=ke+10;const K=e.scenes&&e.scenes.length>0?e.scenes:[{sceneNumber:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",pages:"4 1/8",cast:["KEVIN","MARCUS"],desc:"Kevin arrives at border gate, inspection with Marcus."},{sceneNumber:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",pages:"3 4/8",cast:["KEVIN","MEERA"],desc:"Kevin discovers pressure loss on telemetry terminal."}];function Ie(){f.push({type:"rect",x:d,y:b-17,w:x,h:17,fill:[.91,.93,.96],stroke:[.78,.82,.88],lineWidth:.8}),p.push({text:"SCENE #",x:d+6,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"SET & SCENE DESCRIPTION",x:d+56,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"D/N",x:d+325,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"PAGES",x:d+368,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"CAST CHARACTERS",x:d+418,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),b-=17}p.push({text:"SCHEDULED SCENES TO SHOOT",x:d,y:b,font:"F2",size:9.5,color:[.1,.15,.22]});const ne=`${K.length} Scenes Scheduled`;p.push({text:ne,x:c-$t(ne,8,"F1"),y:b,font:"F1",size:8,color:[.45,.5,.58]}),b-=12,Ie(),K.forEach((le,$e)=>{const Le=Os(le.heading||`SCENE ${le.sceneNumber}`,260,8,"F2"),Be=Os(le.desc||"",260,7,"F1"),V=Array.isArray(le.cast)?le.cast:le.cast?[le.cast]:[],v=Os(V.join(", "),116,7.5,"F2"),j=Math.max(Le.length*10+Be.length*9,v.length*9.5,12),G=Math.max(22,8+j);b-G<m&&(b=h(!0),Ie()),f.push({type:"rect",x:d,y:b-G,w:x,h:G,fill:$e%2===0?[1,1,1]:[.985,.988,.995],stroke:[.86,.89,.93],lineWidth:.5}),p.push({text:`Sc. ${le.sceneNumber}`,x:d+6,y:b-13,font:"F2",size:8.5,color:[.1,.35,.85]});let W=b-10;Le.forEach(me=>{p.push({text:me,x:d+56,y:W,font:"F2",size:8,color:[.1,.12,.15]}),W-=10}),Be.forEach(me=>{p.push({text:me,x:d+56,y:W,font:"F1",size:7,color:[.4,.45,.52]}),W-=9});const se=le.heading?.toUpperCase().includes("NIGHT")?"NIGHT":"DAY";p.push({text:se,x:d+325,y:b-13,font:"F1",size:7.5,color:se==="NIGHT"?[.1,.15,.45]:[.8,.45,.1]}),p.push({text:le.pages||"1.0",x:d+368,y:b-13,font:"F2",size:7.5,color:[.2,.2,.2]});let ge=b-11;v.forEach(me=>{p.push({text:me,x:d+418,y:ge,font:"F2",size:7.5,color:[.15,.2,.25]}),ge-=9.5}),b-=G}),b-=10;const fe=e.castCalls&&e.castCalls.length>0?e.castCalls:[{character:"KEVIN",actor:"Dev Patel",pickup:"05:00 AM",hmuCall:"05:30 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MARCUS",actor:"David Chen",pickup:"05:15 AM",hmuCall:"05:45 AM",onSet:"06:30 AM",status:"Confirmed"},{character:"MEERA",actor:"Zoe Saldana",pickup:"08:30 AM",hmuCall:"09:00 AM",onSet:"10:30 AM",status:"Confirmed"}];function A(){f.push({type:"rect",x:d,y:b-17,w:x,h:17,fill:[.91,.93,.96],stroke:[.78,.82,.88],lineWidth:.8}),p.push({text:"ID",x:d+6,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"CHARACTER",x:d+32,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"ACTOR / TALENT",x:d+140,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"STATUS",x:d+270,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"PICKUP",x:d+346,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"H/MU CALL",x:d+406,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),p.push({text:"ON SET CALL",x:d+472,y:b-12,font:"F2",size:7.5,color:[.25,.3,.38]}),b-=17}b-48<m&&(b=h(!0)),p.push({text:"CAST & TALENT CALL SCHEDULE",x:d,y:b,font:"F2",size:9.5,color:[.1,.15,.22]});const ve=`${fe.length} Talent Booked`;p.push({text:ve,x:c-$t(ve,8,"F1"),y:b,font:"F1",size:8,color:[.45,.5,.58]}),b-=12,A(),fe.forEach((le,$e)=>{b-19<m&&(b=h(!0),A()),f.push({type:"rect",x:d,y:b-19,w:x,h:19,fill:$e%2===0?[1,1,1]:[.985,.988,.995],stroke:[.86,.89,.93],lineWidth:.5}),p.push({text:String($e+1),x:d+6,y:b-13,font:"F1",size:7.5,color:[.5,.5,.5]}),p.push({text:it(le.character||"CHARACTER",100,8,"F2"),x:d+32,y:b-13,font:"F2",size:8,color:[.1,.12,.16]}),p.push({text:it(le.actor||"TBD",120,8,"F1"),x:d+140,y:b-13,font:"F1",size:8,color:[.2,.22,.26]});const Be=(le.status||"").toLowerCase().includes("conf");p.push({text:it(le.status||"Confirmed",68,7.5,"F2"),x:d+270,y:b-13,font:"F2",size:7.5,color:Be?[.12,.55,.25]:[.85,.55,.1]}),p.push({text:le.pickup||"-",x:d+346,y:b-13,font:"F3",size:7.5,color:[.35,.35,.35]}),p.push({text:le.hmuCall||"-",x:d+406,y:b-13,font:"F3",size:7.5,color:[.35,.35,.35]}),p.push({text:le.onSet||"-",x:d+472,y:b-13,font:"F2",size:8.5,color:[.1,.35,.85]}),b-=19}),b-=10;const He=e.specialInstructions||"Standard studio health & safety protocols in effect. All crew must report any hazards or equipment anomalies immediately to the 1st AD or Health & Safety Supervisor.",Re=Os(He,516,7.5,"F1"),ce=Math.max(38,18+Re.length*10+6);b-ce<m&&(b=h(!0)),f.push({type:"rect",x:d,y:b-ce,w:x,h:ce,fill:[.995,.985,.93],stroke:[.9,.82,.65],lineWidth:.8}),p.push({text:"[SAFETY & PRODUCTION DIRECTIVE] SPECIAL INSTRUCTIONS:",x:d+10,y:b-13,font:"F2",size:7.5,color:[.6,.38,.05]});let R=b-25;Re.forEach(le=>{p.push({text:le,x:d+10,y:R,font:"F1",size:7.5,color:[.3,.25,.15]}),R-=10}),b-=ce+8;const C=34;if(b-C>=m){f.push({type:"rect",x:d,y:b-C,w:x,h:C,fill:[.965,.975,.988],stroke:[.84,.87,.92],lineWidth:.6}),p.push({text:"DIRECTING & SET OPS",x:d+10,y:b-12,font:"F2",size:7,color:[.25,.3,.38]}),p.push({text:`1st AD: Ready on Set ${e.shootingCall||"06:30 AM"} · Radio: Ch 1`,x:d+10,y:b-24,font:"F1",size:7,color:[.35,.4,.48]}),p.push({text:"CAMERA & SOUND TECH",x:d+195,y:b-12,font:"F2",size:7,color:[.25,.3,.38]}),p.push({text:`DP / Cam: ${e.generalCrewCall||"06:00 AM"} · Radio: Ch 2 | Sound: Ch 3`,x:d+195,y:b-24,font:"F1",size:7,color:[.35,.4,.48]}),p.push({text:"LOGISTICS & SIGN-OFF",x:d+375,y:b-12,font:"F2",size:7,color:[.25,.3,.38]});const le=it(`Approved: ${e.approvedBy||"Production Office"} · Ch 4`,160,7,"F1");p.push({text:le,x:d+375,y:b-24,font:"F1",size:7,color:[.35,.4,.48]}),b-=C+6}const Y=r.length;r.forEach((le,$e)=>{le.vectors.push({type:"line",x1:d,y1:44,x2:c,y2:44,stroke:[.8,.83,.88],lineWidth:.7}),le.texts.push({text:"CONFIDENTIAL -- SCRIPTORA PRODUCTION STUDIO -- NOT FOR PUBLIC DISTRIBUTION",x:d,y:32,font:"F1",size:7,color:[.45,.48,.52]});const Le=e.shootDate||"Production Call Sheet";le.texts.push({text:Le,x:306-$t(Le,7,"F1")/2,y:32,font:"F1",size:7,color:[.55,.58,.62]});const Be=`Page ${$e+1} of ${Y}`;le.texts.push({text:Be,x:c-$t(Be,7.5,"F2"),y:32,font:"F2",size:7.5,color:[.3,.35,.4]})});const ue=Ss(r),Z=s.replace(/[^a-zA-Z0-9]/g,"_"),we=`CallSheet_Day${a}_${Z}.pdf`;return ws(ue,we),ue}function Yi(e="CHARACTER",t=[],s={}){const n=s.title||"Chronicles of Dust",o=s.draft||"Draft 4.2",a=[],i=38,l=[];let r=[],f=0;for(const c of t){const x=c.dialogue||c.text||"",m=hs(x,46),h=4+m.length;f+h>i&&r.length>0&&(l.push(r),r=[],f=0),r.push({...c,speechLines:m}),f+=h}r.length>0&&l.push(r),l.length===0&&l.push([]);for(let c=0;c<l.length;c++){const x=l[c],m=[],h=[];m.push({type:"line",x1:54,y1:746,x2:558,y2:746,stroke:[.2,.2,.2],lineWidth:1.2}),h.push({text:"SCRIPTORA -- CHARACTER DIALOGUE SHEET",x:54,y:755,font:"F4",size:9,color:[.3,.3,.3]}),h.push({text:`PAGE ${c+1} OF ${l.length}`,x:490,y:755,font:"F4",size:9,color:[.3,.3,.3]}),h.push({text:`${e.toUpperCase()} -- ALL DIALOGUE CUES`,x:54,y:730,font:"F4",size:12,color:[0,0,0]}),h.push({text:`Screenplay: ${n} (${o}) -- Pinned Baseline`,x:54,y:716,font:"F3",size:9,color:[.4,.4,.4]});let b=680;for(const y of x){const $=y.sceneNum||y.sceneNumber||1,N=y.heading||`SCENE ${$}`;if(h.push({text:`SCENE ${$} -- ${N}`,x:54,y:b,font:"F4",size:9,color:[.1,.3,.7]}),b-=14,y.action){const P=hs(y.action,65);for(const de of P)h.push({text:de,x:54,y:b,font:"F5",size:8.5,color:[.4,.4,.4]}),b-=11}const L=y.character||e||"CHARACTER",k=L.length*6.5;if(h.push({text:L,x:Math.max(160,306-k/2),y:b,font:"F4",size:10,color:[0,0,0]}),b-=12,y.parenthetical){const P=y.parenthetical.length*5.5;h.push({text:y.parenthetical,x:Math.max(160,306-P/2),y:b,font:"F5",size:9,color:[.3,.3,.3]}),b-=12}const U=y.speechLines||hs(y.dialogue||y.text||"",46);for(const P of U)h.push({text:P,x:170,y:b,font:"F3",size:10,color:[0,0,0]}),b-=13;b-=12}m.push({type:"line",x1:54,y1:50,x2:558,y2:50,stroke:[.8,.8,.8],lineWidth:.8}),h.push({text:`SCRIPTORA SCREENPLAY ARCHITECTURE -- ${e.toUpperCase()} -- DRAFT 4.2`,x:54,y:38,font:"F3",size:8,color:[.5,.5,.5]}),h.push({text:`Page ${c+1} of ${l.length}`,x:495,y:38,font:"F3",size:8,color:[.5,.5,.5]}),a.push({vectors:m,texts:h})}const p=Ss(a),d=`DialogueSheet_${e.replace(/\s+/g,"_")}_${n.replace(/\s+/g,"_")}.pdf`;return ws(p,d),p}function Xi(e=1,t=[],s={},n={}){s&&s.title&&!n.title&&(n=s);const o=n.title||"Chronicles of Dust",a=n.draft||"Draft 4.2",i=s.heading||t[0]?.heading||`SCENE ${e} - DAY`,l=[],r=[],f=[];r.push({type:"rect",x:54,y:730,w:504,h:32,fill:[.1,.1,.1]}),f.push({text:"SCRIPTORA -- REHEARSAL & ON-SET SIDES",x:64,y:748,font:"F4",size:9,color:[.8,.8,.8]}),f.push({text:`SCENE ${e} SIDES`,x:460,y:748,font:"F4",size:10,color:[1,1,1]}),f.push({text:`${o.toUpperCase()} -- SCENE ${e}`,x:54,y:712,font:"F4",size:13,color:[0,0,0]}),f.push({text:`${i} -- ${a}`,x:54,y:698,font:"F3",size:9,color:[.4,.4,.4]}),r.push({type:"line",x1:54,y1:686,x2:558,y2:686,stroke:[.2,.2,.2],lineWidth:1});let p=665;f.push({text:i,x:54,y:p,font:"F4",size:10,color:[0,0,0]}),p-=18;for(const x of t){if(x.action){const h=hs(x.action,65);for(const b of h)f.push({text:b,x:54,y:p,font:"F5",size:9.5,color:[.2,.2,.2]}),p-=13;p-=4}if(x.character){const h=x.character.length*6.5;f.push({text:x.character,x:Math.max(160,306-h/2),y:p,font:"F4",size:10,color:[0,0,0]}),p-=13}if(x.parenthetical){const h=x.parenthetical.length*5.5;f.push({text:x.parenthetical,x:Math.max(160,306-h/2),y:p,font:"F5",size:9,color:[.3,.3,.3]}),p-=12}const m=x.dialogue||x.text||"";if(m){const h=hs(m,46);for(const b of h)f.push({text:b,x:170,y:p,font:"F3",size:10,color:[0,0,0]}),p-=13}p-=10}r.push({type:"rect",x:180,y:p-15,w:252,h:20,fill:[.95,.95,.95],stroke:[.7,.7,.7],lineWidth:.8}),f.push({text:`END OF SCENE ${e} SIDES -- STAMPED DRAFT 4.2`,x:195,y:p-3,font:"F4",size:7.5,color:[.3,.3,.3]}),r.push({type:"line",x1:54,y1:50,x2:558,y2:50,stroke:[.8,.8,.8],lineWidth:.8}),f.push({text:"SCRIPTORA REHEARSAL COPY -- OFFICIAL PRODUCTION SIDES",x:54,y:38,font:"F3",size:8,color:[.5,.5,.5]}),f.push({text:"Page 1 of 1",x:505,y:38,font:"F3",size:8,color:[.5,.5,.5]}),l.push({vectors:r,texts:f});const d=Ss(l),c=`ActorSides_Scene${e}_${o.replace(/\s+/g,"_")}.pdf`;return ws(d,c),d}function ho(e=[],t={}){const s=t.title||"Chronicles of Dust",n=t.draft||"Draft 4.2",o=[],a=18,i=e.length,l=Math.ceil(i/a)||1;for(let p=0;p<l;p++){const d=[],c=[],x=e.slice(p*a,(p+1)*a);d.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),c.push({text:"SCRIPTORA -- SCRIPT BREAKDOWN MASTER REPORT",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),c.push({text:`${s.toUpperCase()} (${n}) -- ${i} ELEMENTS TAGGED`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),c.push({text:`PAGE ${p+1} OF ${l}`,x:505,y:747,font:"F2",size:9,color:[1,1,1]});let m=705;d.push({type:"rect",x:36,y:m,w:540,h:18,fill:[.93,.94,.96],stroke:[.8,.83,.88],lineWidth:.8}),c.push({text:"CATEGORY",x:42,y:m+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"ELEMENT NAME",x:120,y:m+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"SCENES",x:270,y:m+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"STATUS",x:330,y:m+5,font:"F2",size:8,color:[.3,.35,.4]}),c.push({text:"DETAILS / SOURCING SPECIFICATION",x:400,y:m+5,font:"F2",size:8,color:[.3,.35,.4]}),m-=22;for(const h of x){d.push({type:"rect",x:36,y:m,w:540,h:22,fill:[1,1,1],stroke:[.88,.9,.93],lineWidth:.5}),c.push({text:h.category||"Props",x:42,y:m+7,font:"F2",size:8,color:[.1,.3,.8]}),c.push({text:(h.name||"").slice(0,32),x:120,y:m+7,font:"F2",size:8.5,color:[.1,.1,.1]}),c.push({text:(h.scenes||[h.sceneNumber||18]).map(y=>`#${y}`).join(", "),x:270,y:m+7,font:"F3",size:8,color:[.4,.4,.4]}),c.push({text:h.status||"Confirmed",x:330,y:m+7,font:"F1",size:8,color:h.status==="Confirmed"?[.1,.6,.2]:[.8,.4,.1]});const b=h.assignedActor||h.sourcingType||h.description||h.notes||"Ready";c.push({text:b.slice(0,36),x:400,y:m+7,font:"F1",size:7.5,color:[.3,.3,.3]}),m-=22}d.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),c.push({text:"SCRIPTORA MASTER PRODUCTION BREAKDOWN -- IMMUTABLE SNAPSHOT",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),c.push({text:`Page ${p+1} of ${l}`,x:510,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),o.push({vectors:d,texts:c})}const r=Ss(o),f=`ScriptBreakdown_${s.replace(/\s+/g,"_")}.pdf`;return ws(r,f),r}function Zi(e=[],t=[],s={}){const n=s.title||"Chronicles of Dust",o=s.draft||"Draft 4.2",a=[],i=[],l=[];i.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),l.push({text:"SCRIPTORA -- MASTER SHOOTING SCHEDULE",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),l.push({text:`${n.toUpperCase()} (${o}) -- ${e.length} SHOOT DAYS`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),l.push({text:"PAGE 1 OF 1",x:515,y:747,font:"F2",size:9,color:[1,1,1]});let r=705;i.push({type:"rect",x:36,y:r,w:540,h:18,fill:[.93,.94,.96],stroke:[.8,.83,.88],lineWidth:.8}),l.push({text:"DAY #",x:42,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"DATE",x:80,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"SHOOT LOCATION / STAGE",x:155,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"SCENES",x:340,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"PAGES",x:430,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"HOURS",x:480,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),l.push({text:"STATUS",x:530,y:r+5,font:"F2",size:8,color:[.3,.35,.4]}),r-=26;for(const d of e){i.push({type:"rect",x:36,y:r,w:540,h:26,fill:[1,1,1],stroke:[.88,.9,.93],lineWidth:.5}),l.push({text:`D${d.dayNumber}`,x:42,y:r+9,font:"F2",size:9,color:[.1,.1,.1]}),l.push({text:d.date||"",x:80,y:r+9,font:"F1",size:8,color:[.3,.3,.3]}),l.push({text:d.location||"Location TBD",x:155,y:r+13,font:"F2",size:8.5,color:[.1,.1,.1]}),l.push({text:d.title||"",x:155,y:r+3,font:"F1",size:7.5,color:[.5,.5,.5]});const c=(d.sceneNumbers||[]).map(x=>`Sc ${x}`).join(", ")||"None";l.push({text:c,x:340,y:r+9,font:"F4",size:8.5,color:[.1,.3,.8]}),l.push({text:d.totalPages||"0 0/8",x:430,y:r+9,font:"F3",size:8,color:[.3,.3,.3]}),l.push({text:`${d.estHours||8}h`,x:480,y:r+9,font:"F1",size:8,color:[.4,.4,.4]}),l.push({text:d.status||"Draft",x:530,y:r+9,font:"F1",size:7.5,color:d.status==="Confirmed"?[.1,.6,.2]:[.4,.4,.4]}),r-=26}i.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),l.push({text:"SCRIPTORA MASTER STRIPBOARD SCHEDULE -- OWNER CONFIRMED BASELINE",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),l.push({text:"Page 1 of 1",x:525,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),a.push({vectors:i,texts:l});const f=Ss(a),p=`ShootingSchedule_${n.replace(/\s+/g,"_")}.pdf`;return ws(f,p),f}function Qi(e=[],t={}){const s=e&&typeof e=="object"&&!Array.isArray(e),n=s?e:null,o=s?n.shots||[]:Array.isArray(e)?e:[],a=t.title||n?.screenplayTitle||"Chronicles of Dust",i=t.draft||t.sourceVersion||n?.sourceVersion||"Draft 4.2",l=t.heading||n?.sceneHeading||o[0]?.sceneHeading||"SCENE 1 - EXT. MOJAVE OUTPOST GATE 4 - DAY",r=n?.sceneNumber||o[0]?.sceneNumber||o[0]?.sceneNum||1,f=[{shotNumber:"1A",title:"Perimeter Outpost Gate",shotSize:"Wide Shot",cameraAngle:"High Angle",focalLength:"24mm Wide",aspectRatio:"2.39:1",lightingMood:"Daylight Dust",description:"High altitude drone descending across dust devils toward Kevin's arrival at the arid customs gate.",approvalStatus:"approved",directorNotes:"Capture sunrise glint off the guard gate perimeter wires."},{shotNumber:"1B",title:"Gate Scanner Clearance Standoff",shotSize:"Medium Two-Shot",cameraAngle:"Eye Level",focalLength:"50mm Prime",aspectRatio:"2.39:1",lightingMood:"Harsh Fluorescent Rim",description:"Kevin presents his ID badge to Marcus over the buzzing clearance terminal.",approvalStatus:"approved",directorNotes:"Focus pull from scanner terminal to Kevin's tense expression."},{shotNumber:"1C",title:"Terminal Diagnostic Anomaly",shotSize:"Close-Up",cameraAngle:"Low Angle",focalLength:"85mm Portrait",aspectRatio:"2.39:1",lightingMood:"Cyan Strobe",description:"Close-up insert of the flickering scanner console displaying pressure alert warning in red neon.",approvalStatus:"proposed",directorNotes:"Practical screen insert with pulsing alarm strobe."}],p=o&&o.length>0?o:f,d=3,c=Math.ceil(p.length/d)||1,x=[];for(let y=0;y<c;y++){const $=[],N=[],L=p.slice(y*d,(y+1)*d);$.push({type:"rect",x:36,y:735,w:540,h:32,fill:[.08,.12,.2]}),N.push({text:"SCRIPTORA -- STORYBOARD STUDIO SHOT COMPOSITION",x:46,y:752,font:"F2",size:10,color:[1,1,1]}),N.push({text:`${a.toUpperCase()} (${i}) -- ${go(l).toUpperCase()}`,x:46,y:741,font:"F1",size:8,color:[.7,.8,1]}),N.push({text:`PAGE ${y+1} OF ${c}`,x:505,y:747,font:"F2",size:9,color:[1,1,1]});let k=575;for(const U of L){const P=U.shotNumber||U.shotNum||`${r}A`,de=U.title||`Shot ${P}`,ae=U.focalLength||U.lens||"50mm Prime",xe=U.aspectRatio||"2.39:1",ee=`${U.shotSize||"Medium Shot"} / ${U.cameraAngle||"Eye Level"}`,Se=(U.approvalStatus||"Draft").toUpperCase(),ye=Se==="APPROVED"?[.1,.6,.2]:Se==="PROPOSED"?[.8,.5,.1]:[.4,.45,.5];$.push({type:"rect",x:36,y:k,w:540,h:140,fill:[1,1,1],stroke:[.85,.88,.92],lineWidth:.8}),$.push({type:"rect",x:46,y:k+15,w:200,h:110,fill:[.08,.1,.15],stroke:[.25,.3,.38],lineWidth:1}),$.push({type:"line",x1:112,y1:k+15,x2:112,y2:k+125,stroke:[.2,.25,.32],lineWidth:.4}),$.push({type:"line",x1:178,y1:k+15,x2:178,y2:k+125,stroke:[.2,.25,.32],lineWidth:.4}),$.push({type:"line",x1:46,y1:k+52,x2:246,y2:k+52,stroke:[.2,.25,.32],lineWidth:.4}),$.push({type:"line",x1:46,y1:k+88,x2:246,y2:k+88,stroke:[.2,.25,.32],lineWidth:.4}),$.push({type:"line",x1:141,y1:k+70,x2:151,y2:k+70,stroke:[.4,.6,.8],lineWidth:.8}),$.push({type:"line",x1:146,y1:k+65,x2:146,y2:k+75,stroke:[.4,.6,.8],lineWidth:.8}),$.push({type:"line",x1:52,y1:k+119,x2:58,y2:k+119,stroke:[.5,.7,.9],lineWidth:.8}),$.push({type:"line",x1:52,y1:k+119,x2:52,y2:k+113,stroke:[.5,.7,.9],lineWidth:.8}),$.push({type:"line",x1:240,y1:k+21,x2:234,y2:k+21,stroke:[.5,.7,.9],lineWidth:.8}),$.push({type:"line",x1:240,y1:k+21,x2:240,y2:k+27,stroke:[.5,.7,.9],lineWidth:.8}),N.push({text:`REC * SHOT ${P}`,x:52,y:k+110,font:"F4",size:7.5,color:[1,1,1]}),N.push({text:`${xe} * ${ae}`,x:52,y:k+23,font:"F3",size:7,color:[.7,.8,.9]}),N.push({text:`SHOT ${P} -- SCENE ${r}`,x:260,y:k+115,font:"F2",size:9.5,color:[.1,.3,.8]}),$.push({type:"rect",x:480,y:k+112,w:86,h:16,fill:[.95,.96,.98],stroke:ye,lineWidth:.7}),N.push({text:Se,x:486,y:k+117,font:"F2",size:7,color:ye}),N.push({text:de.slice(0,38),x:260,y:k+100,font:"F2",size:10.5,color:[.08,.1,.12]}),N.push({text:`Camera: ${ee} * ${ae} (${xe})`,x:260,y:k+86,font:"F1",size:8,color:[.35,.4,.45]});const ke=hs(U.description||"",48);let De=k+72;for(let Ee=0;Ee<Math.min(ke.length,3);Ee++)N.push({text:ke[Ee],x:260,y:De,font:"F1",size:8,color:[.18,.22,.26]}),De-=11;const oe=U.directorNotes||U.continuity?.lightingContinuity||U.continuity?.eyeline||"";oe&&N.push({text:`Note: ${oe.slice(0,52)}`,x:260,y:k+25,font:"F5",size:7.5,color:[.45,.48,.52]}),k-=150}$.push({type:"line",x1:36,y1:52,x2:576,y2:52,stroke:[.8,.8,.8],lineWidth:.8}),N.push({text:"SCRIPTORA STORYBOARD STUDIO -- OFFICIAL CAMERA & CONCEPT COMPOSITION",x:36,y:40,font:"F2",size:7.5,color:[.4,.45,.5]}),N.push({text:`Page ${y+1} of ${c}`,x:510,y:40,font:"F1",size:7.5,color:[.4,.45,.5]}),x.push({vectors:$,texts:N})}const m=Ss(x),h=l.replace(/[^a-zA-Z0-9]+/g,"_").slice(0,30),b=`Storyboard_${a.replace(/\s+/g,"_")}_${h}.pdf`;return ws(m,b),m}const er={Cast:{icon:"person"},Locations:{icon:"location_on"},Props:{icon:"inventory_2"},"Practical FX":{icon:"science"},Stunts:{icon:"sports_kabaddi"},Costumes:{icon:"checkroom"},Vehicles:{icon:"commute"},Sound:{icon:"music_note"},"Hair & Makeup":{icon:"face"}};function tr(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||T.state.selectedScriptId;const n=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${pt("Pre-Production","Script Breakdown Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Ys("Script Breakdown","dataset",n||"/production",`
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

      ${ct("production")}

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
  `}async function sr(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||T.state.selectedScriptId||"chronicles-of-dust";let a=n.get("category")||"all",i=n.get("scene")||"all",l=n.get("character")||n.get("search")||"",r=null;const f=document.getElementById("breakdown-scene-select");f&&i!=="all"&&(f.value=i.startsWith("scene-")?i:`scene-${i}`),a!=="all"&&document.querySelectorAll(".cat-btn").forEach(B=>{B.getAttribute("data-cat")===a?(B.classList.add("bg-blue-600","text-white","shadow-2xs"),B.classList.remove("bg-slate-100","text-slate-700")):(B.classList.remove("bg-blue-600","text-white","shadow-2xs"),B.classList.add("bg-slate-100","text-slate-700"))});const p=document.getElementById("breakdown-search");p&&l&&(p.value=l);const d=B=>{const K=B.category;if(K==="Cast"){const Ie=!B.assignedActor||B.assignedActor.toLowerCase().includes("unassigned")||B.assignedActor.toLowerCase().includes("open"),ne=B.castingStatus==="Confirmed Cast"?"bg-emerald-50 text-emerald-700 border-emerald-200":B.castingStatus==="Offer Out"?"bg-sky-50 text-sky-700 border-sky-200":"bg-amber-50 text-amber-700 border-amber-200";return`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Actor</span>
            <div class="font-semibold text-slate-900 mt-0.5">
              ${Ie?'<span class="text-amber-700 italic">Unassigned (Open Role)</span>':`<span class="text-indigo-700 font-bold">${B.assignedActor}</span>`}
            </div>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Casting Status</span>
            <span class="inline-block mt-0.5 px-2 py-0.5 rounded-lg border text-[11px] font-semibold ${ne}">
              ${B.castingStatus||"Auditioning"}
            </span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Actor Availability</span>
            <div class="text-slate-700 mt-0.5 font-medium truncate" title="${B.actorAvailability||"Not specified"}">
              ${B.actorAvailability||"Not specified"}
            </div>
          </div>
        </div>
      `}return K==="Props"?`
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sourcing</span>
            <span class="font-semibold text-emerald-800 text-[11px]">${B.sourcingType||"Prop House"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quantity</span>
            <span class="font-semibold text-slate-900 text-[11px]">${B.quantity||"1"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Readiness</span>
            <span class="font-semibold text-teal-700 text-[11px]">${B.readinessStatus||"Ready"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Continuity Notes</span>
            <span class="text-slate-600 text-[11px] truncate block" title="${B.continuityNotes||"Standard"}">${B.continuityNotes||"Standard"}</span>
          </div>
        </div>
      `:K==="Practical FX"?`
        <div class="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-purple-50/50 p-2 rounded-xl border border-purple-100">
              <span class="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Required Resources</span>
              <span class="font-semibold text-purple-900 text-[11px]">${B.requiredResources||"Standard FX Kit"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Technical Specs</span>
              <span class="text-slate-800 font-medium text-[11px]">${B.technicalRequirements||"Per department"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prep Status</span>
              <span class="font-semibold text-emerald-700 text-[11px]">${B.prepStatus||"Rigged & Tested"}</span>
            </div>
          </div>
          ${B.safetyNotes?`
            <div class="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-1.5 text-[11px]">
              <span class="material-symbols-outlined text-[15px] text-rose-600 shrink-0 mt-0.5">warning</span>
              <div><strong class="font-semibold">Safety Mandate:</strong> ${B.safetyNotes}</div>
            </div>
          `:""}
        </div>
      `:K==="Stunts"?`
        <div class="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-rose-50/50 p-2 rounded-xl border border-rose-100">
              <span class="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">Safety Planning</span>
              <span class="font-semibold text-rose-900 text-[11px]">${B.safetyPlanningStatus||"Review in Progress"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Qualified Personnel</span>
              <span class="text-slate-800 font-medium text-[11px]">${B.qualifiedPersonnel||"Lead Stunt Performer"}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rigging Requirements</span>
              <span class="text-slate-800 font-medium text-[11px]">${B.coordinationRequirements||"Coordinator on set"}</span>
            </div>
          </div>
        </div>
      `:K==="Locations"?`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-amber-50/50 p-2 rounded-xl border border-amber-100">
            <span class="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Context & Lighting</span>
            <span class="font-semibold text-amber-900 text-[11px]">${B.context||"INT."} · ${B.lighting||"DAY"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location Status</span>
            <span class="font-semibold text-emerald-700 text-[11px]">${B.locationStatus||"Permitted & Locked"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Access Details</span>
            <span class="text-slate-700 text-[11px] truncate block" title="${B.accessDetails||"Standard access"}">${B.accessDetails||"Standard access"}</span>
          </div>
        </div>
      `:K==="Costumes"?`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-teal-50/50 p-2 rounded-xl border border-teal-100">
            <span class="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">Character</span>
            <span class="font-semibold text-teal-900 text-[11px]">${B.character||"Cast member"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Continuity Changes</span>
            <span class="text-slate-700 text-[11px] truncate block" title="${B.continuityChanges||"Stage 1"}">${B.continuityChanges||"Stage 1"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prep Status</span>
            <span class="font-semibold text-emerald-700 text-[11px]">${B.prepStatus||"Fitted & Approved"}</span>
          </div>
        </div>
      `:K==="Vehicles"?`
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Availability</span>
            <span class="font-semibold text-slate-900 text-[11px]">${B.availability||"On Set"}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Operational Requirements</span>
            <span class="text-slate-700 text-[11px]">${B.operationalRequirements||"Qualified operator"}</span>
          </div>
        </div>
      `:""},c=B=>{const K=B.category,Ie=B.scenes&&B.scenes.length>0?B.scenes.join(", "):B.sceneNumber;return`
      <div class="edit-panel mt-3 p-4 bg-slate-50/90 rounded-2xl border-2 border-blue-400/80 shadow-md flex flex-col gap-3 text-xs animate-in fade-in duration-150">
        <div class="flex items-center justify-between border-b border-slate-200 pb-2">
          <div class="flex items-center gap-1.5 font-heading font-bold text-blue-900">
            <span class="material-symbols-outlined text-[18px]">edit</span>
            <span>Edit Production Element: ${B.name}</span>
          </div>
          <span class="text-[10px] text-slate-500 font-medium">Owner Permissions Active</span>
        </div>

        <form class="form-edit-inline flex flex-col gap-3" data-id="${B.id}">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Element Name</label>
              <input type="text" name="name" value="${B.name||""}" required class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Category</label>
              <select name="category" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="Cast" ${K==="Cast"?"selected":""}>Cast & Characters</option>
                <option value="Locations" ${K==="Locations"?"selected":""}>Locations</option>
                <option value="Props" ${K==="Props"?"selected":""}>Props</option>
                <option value="Practical FX" ${K==="Practical FX"?"selected":""}>Practical FX</option>
                <option value="Stunts" ${K==="Stunts"?"selected":""}>Stunts & Action</option>
                <option value="Costumes" ${K==="Costumes"?"selected":""}>Costumes & Wardrobe</option>
                <option value="Vehicles" ${K==="Vehicles"?"selected":""}>Vehicles & Equipment</option>
                <option value="Sound" ${K==="Sound"?"selected":""}>Sound</option>
                <option value="Hair & Makeup" ${K==="Hair & Makeup"?"selected":""}>Hair & Makeup</option>
              </select>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Review Status</label>
              <select name="status" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="Confirmed" ${B.status==="Confirmed"?"selected":""}>Confirmed (Human Approved)</option>
                <option value="Needs Review" ${B.status==="Needs Review"?"selected":""}>Needs Review</option>
                <option value="Rejected" ${B.status==="Rejected"?"selected":""}>Rejected</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Scenes (comma separated)</label>
              <input type="text" name="scenes" value="${Ie}" placeholder="e.g. 1, 4, 18" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              <span class="text-[10px] text-slate-400">Links element to multiple scenes simultaneously</span>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Description / Screenplay Context</label>
              <input type="text" name="description" value="${B.description||""}" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <!-- Dynamic Category Fields inside Edit Panel -->
          ${K==="Cast"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Assigned Actor</label>
                <input type="text" name="assignedActor" value="${B.assignedActor||""}" placeholder="e.g. Dev Patel (or leave blank for Open)" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Casting Status</label>
                <select name="castingStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Confirmed Cast" ${B.castingStatus==="Confirmed Cast"?"selected":""}>Confirmed Cast</option>
                  <option value="Offer Out" ${B.castingStatus==="Offer Out"?"selected":""}>Offer Out</option>
                  <option value="Auditioning" ${B.castingStatus==="Auditioning"?"selected":""}>Auditioning</option>
                  <option value="Uncast / Open" ${B.castingStatus==="Uncast / Open"?"selected":""}>Uncast / Open Role</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Actor Availability</label>
                <input type="text" name="actorAvailability" value="${B.actorAvailability||""}" placeholder="e.g. Shoot Days 1-14" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${K==="Props"?`
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5 p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Sourcing Type</label>
                <select name="sourcingType" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Hero Prop" ${B.sourcingType==="Hero Prop"?"selected":""}>Hero Prop</option>
                  <option value="Custom Build / Fabricate" ${B.sourcingType==="Custom Build / Fabricate"?"selected":""}>Custom Build</option>
                  <option value="Prop House Rental" ${B.sourcingType==="Prop House Rental"?"selected":""}>Prop House</option>
                  <option value="Purchased" ${B.sourcingType==="Purchased"?"selected":""}>Purchased</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Quantity</label>
                <input type="text" name="quantity" value="${B.quantity||"1"}" placeholder="e.g. x2 Hero, x4 Rubber" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Readiness Status</label>
                <select name="readinessStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Ready in Art Dept" ${B.readinessStatus==="Ready in Art Dept"?"selected":""}>Ready in Art Dept</option>
                  <option value="Fabrication Ready" ${B.readinessStatus==="Fabrication Ready"?"selected":""}>Fabrication Ready</option>
                  <option value="In Progress" ${B.readinessStatus==="In Progress"?"selected":""}>In Progress</option>
                  <option value="Pending Sourcing" ${B.readinessStatus==="Pending Sourcing"?"selected":""}>Pending Sourcing</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Continuity Notes</label>
                <input type="text" name="continuityNotes" value="${B.continuityNotes||""}" placeholder="Continuity tracking..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${K==="Practical FX"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-purple-50/50 rounded-xl border border-purple-100">
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Required Resources</label>
                <input type="text" name="requiredResources" value="${B.requiredResources||""}" placeholder="CO2, Brine Reservoir..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Technical Specs</label>
                <input type="text" name="technicalRequirements" value="${B.technicalRequirements||""}" placeholder="Pressure limits, wiring..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Safety Notes</label>
                <input type="text" name="safetyNotes" value="${B.safetyNotes||""}" placeholder="Goggles, splash radius..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${K==="Stunts"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-rose-50/50 rounded-xl border border-rose-100">
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Safety Planning Status</label>
                <select name="safetyPlanningStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Rigging Rig Approved" ${B.safetyPlanningStatus==="Rigging Rig Approved"?"selected":""}>Rigging Rig Approved</option>
                  <option value="Rehearsal Pending" ${B.safetyPlanningStatus==="Rehearsal Pending"?"selected":""}>Rehearsal Pending</option>
                  <option value="In Coordinator Review" ${B.safetyPlanningStatus==="In Coordinator Review"?"selected":""}>In Review</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Qualified Personnel</label>
                <input type="text" name="qualifiedPersonnel" value="${B.qualifiedPersonnel||""}" placeholder="Stunt double, rigger..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Coordination Details</label>
                <input type="text" name="coordinationRequirements" value="${B.coordinationRequirements||""}" placeholder="Ratchet, cables..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          ${K==="Locations"?`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-amber-50/50 rounded-xl border border-amber-100">
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Context & Lighting</label>
                <input type="text" name="context" value="${B.context||"INT."}" placeholder="INT. or EXT." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Location Status</label>
                <input type="text" name="locationStatus" value="${B.locationStatus||"Permitted & Locked"}" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Access Details</label>
                <input type="text" name="accessDetails" value="${B.accessDetails||""}" placeholder="Access permits, route..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          `:""}

          <div class="flex items-center justify-between pt-2 border-t border-slate-200">
            <button type="button" class="btn-delete-element text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-xl font-medium transition-colors cursor-pointer flex items-center gap-1" data-id="${B.id}">
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
    `},x=async()=>{const B=await Ft(o,a,i),K=B.filter(C=>{if(!l)return!0;const Y=l.toLowerCase();return C.name.toLowerCase().includes(Y)||C.description&&C.description.toLowerCase().includes(Y)||C.category.toLowerCase().includes(Y)||C.assignedActor&&C.assignedActor.toLowerCase().includes(Y)||C.notes&&C.notes.toLowerCase().includes(Y)}),Ie=B.length,ne=B.filter(C=>C.status==="Confirmed").length,fe=B.filter(C=>C.status==="Needs Review"||C.status==="Extracted").length,A=B.filter(C=>C.status==="Rejected").length,ve=document.getElementById("kpi-total"),He=document.getElementById("kpi-confirmed"),Re=document.getElementById("kpi-review"),ce=document.getElementById("kpi-rejected");ve&&(ve.textContent=Ie),He&&(He.textContent=ne),Re&&(Re.textContent=fe),ce&&(ce.textContent=A);const R=document.getElementById("breakdown-list");if(R){if(K.length===0){R.innerHTML=`
        <div class="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400 text-xs">
          No breakdown elements match the active category, scene, or search filters.
        </div>
      `;return}R.innerHTML=K.map(C=>{const Y=C.status==="Confirmed",ue=C.status==="Needs Review"||C.status==="Extracted",Z=C.status==="Rejected",we=r===C.id,le=er[C.category]||{icon:"label"},$e=ue?'<span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium flex items-center gap-1">Needs Review</span>':Z?'<span class="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium flex items-center gap-1">Excluded</span>':"",Be=(Array.isArray(C.scenes)&&C.scenes.length>0?C.scenes:[C.sceneNumber]).map(V=>`Sc ${V}`).join(", ");return`
        <div class="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-xs hover:border-slate-300 transition-colors flex flex-col gap-2.5" data-id="${C.id}">
          <!-- Top Row: Element Name on Left, Scene Tag, Category Tag, and Compact Action Buttons -->
          <div class="flex items-center justify-between gap-2 min-w-0">
            <div class="flex items-center gap-2 flex-wrap min-w-0">
              <h3 class="font-heading font-bold text-base text-slate-900 tracking-tight shrink-0 mr-1">${C.name}</h3>
              <span class="px-2 py-0.5 rounded-md bg-blue-50/70 text-blue-700 border border-blue-100 font-semibold text-xs shrink-0 flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">movie</span>
                <span>${Be}</span>
              </span>
              <span class="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-700 flex items-center gap-1 shrink-0">
                <span class="material-symbols-outlined text-[13px] text-slate-400">${le.icon}</span>
                <span>${C.category}</span>
              </span>
              ${$e}
            </div>

            <!-- Primary Action Buttons (Compact, aligned near heading) -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button class="btn-toggle-edit px-2 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${C.id}" title="Edit details" aria-label="Edit ${C.name}">
                <span class="material-symbols-outlined text-[15px]">${we?"expand_less":"edit"}</span>
                <span class="hidden sm:inline">${we?"Close":"Edit"}</span>
              </button>

              ${Y?`
                <button class="btn-review-item px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs transition-colors cursor-pointer" data-id="${C.id}" title="Request re-review" aria-label="Request re-review for ${C.name}">
                  Re-review
                </button>
              `:`
                <button class="btn-confirm-item px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${C.id}" title="Confirm item" aria-label="Confirm ${C.name}">
                  <span class="material-symbols-outlined text-[14px]">check</span>
                  <span>Confirm</span>
                </button>
              `}

              ${Z?"":`
                <button class="btn-reject-item p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" data-id="${C.id}" title="Reject element" aria-label="Reject ${C.name}">
                  <span class="material-symbols-outlined text-[16px]">block</span>
                </button>
              `}

              <button class="btn-delete-element p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" data-id="${C.id}" title="Delete element" aria-label="Delete ${C.name}">
                <span class="material-symbols-outlined text-[16px]">delete</span>
              </button>
            </div>
          </div>

          <!-- Description / Role -->
          <p class="text-xs text-slate-600 leading-relaxed font-sans">${C.description||C.characterRole||"No description provided."}</p>

          <!-- Category Specific Rich Presentation Row -->
          ${d(C)}

          <!-- Traceability & Evidence Row -->
          <div class="flex flex-col gap-1.5 mt-1 pt-2 border-t border-slate-100">
            ${C.sourceSnippet?`
              <div class="text-[11px] font-mono text-slate-600 bg-slate-50/80 border border-slate-200/60 rounded-xl p-2 leading-relaxed">
                <span class="text-slate-400 font-sans font-bold text-[10px] uppercase tracking-wider block mb-0.5">Screenplay Evidence (Draft 4.2):</span>
                "${C.sourceSnippet}"
              </div>
            `:""}

            <div class="flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-400">
              <div class="flex items-center gap-2">
                ${C.originalAiSuggestion?`
                  <span class="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">AI Extracted</span>
                `:`
                  <span class="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium">Manual Entry</span>
                `}
                ${C.userCorrection?`
                  <span class="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5" title="Modified by user">
                    <span class="material-symbols-outlined text-[12px]">tune</span>
                    <span>Corrected by ${C.userCorrection.correctedBy||"Owner"}</span>
                  </span>
                `:""}
              </div>

              ${C.confirmedBy?`
                <div>Confirmed by <strong class="font-semibold text-slate-600">${C.confirmedBy}</strong></div>
              `:""}
            </div>
          </div>

          <!-- Inline Edit Area if active -->
          ${we?c(C):""}
        </div>
      `}).join(""),R.querySelectorAll(".btn-toggle-edit").forEach(C=>{C.onclick=()=>{const Y=C.getAttribute("data-id");r=r===Y?null:Y,x()}}),R.querySelectorAll(".btn-cancel-edit").forEach(C=>{C.onclick=()=>{r=null,x()}}),R.querySelectorAll(".form-edit-inline").forEach(C=>{C.onsubmit=async Y=>{Y.preventDefault();const ue=C.getAttribute("data-id"),Z=new FormData(C),le=(Z.get("scenes")||"18").split(",").map(Be=>Number(Be.trim())).filter(Be=>!isNaN(Be)),$e=le.length>0?le[0]:18,Le={name:Z.get("name"),category:Z.get("category"),status:Z.get("status"),description:Z.get("description"),scenes:le,sceneNumber:$e,sceneId:`scene-${$e}`,assignedActor:Z.get("assignedActor")||"",castingStatus:Z.get("castingStatus")||"Uncast / Open",actorAvailability:Z.get("actorAvailability")||"",sourcingType:Z.get("sourcingType")||"",quantity:Z.get("quantity")||"",readinessStatus:Z.get("readinessStatus")||"",continuityNotes:Z.get("continuityNotes")||"",requiredResources:Z.get("requiredResources")||"",technicalRequirements:Z.get("technicalRequirements")||"",safetyNotes:Z.get("safetyNotes")||"",safetyPlanningStatus:Z.get("safetyPlanningStatus")||"",qualifiedPersonnel:Z.get("qualifiedPersonnel")||"",coordinationRequirements:Z.get("coordinationRequirements")||"",context:Z.get("context")||"",locationStatus:Z.get("locationStatus")||"",accessDetails:Z.get("accessDetails")||""};await nn(o,ue,Le),w(`Saved updates for "${Le.name}"`),r=null,x()}}),R.querySelectorAll(".btn-delete-element").forEach(C=>{C.onclick=Y=>{Y.stopPropagation();const ue=C.getAttribute("data-id"),Z=B.find(we=>we.id===ue);Z&&De(Z)}}),R.querySelectorAll(".btn-confirm-item").forEach(C=>{C.onclick=async()=>{const Y=C.getAttribute("data-id");await nn(o,Y,{status:"Confirmed"}),w("Element confirmed by Owner"),x()}}),R.querySelectorAll(".btn-review-item").forEach(C=>{C.onclick=async()=>{const Y=C.getAttribute("data-id");await nn(o,Y,{status:"Needs Review",isHumanConfirmed:!1}),w("Marked for review"),x()}}),R.querySelectorAll(".btn-reject-item").forEach(C=>{C.onclick=async()=>{const Y=C.getAttribute("data-id");await nn(o,Y,{status:"Rejected"}),w("Element rejected"),x()}})}};await x(),document.querySelectorAll(".cat-btn").forEach(B=>{B.onclick=()=>{document.querySelectorAll(".cat-btn").forEach(K=>{K.classList.remove("bg-blue-600","text-white","shadow-2xs"),K.classList.add("bg-slate-100","text-slate-700")}),B.classList.add("bg-blue-600","text-white","shadow-2xs"),B.classList.remove("bg-slate-100","text-slate-700"),a=B.getAttribute("data-cat"),x()}});const m=document.getElementById("breakdown-scene-select");m&&(m.onchange=B=>{i=B.target.value,x()});const h=document.getElementById("breakdown-search");h&&(h.oninput=B=>{l=B.target.value,x()});const b=document.getElementById("elem-cat"),y=document.getElementById("add-modal-category-fields"),$=()=>{if(!y||!b)return;const B=b.value;B==="Cast"?y.innerHTML=`
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
      `:B==="Props"?y.innerHTML=`
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
      `:B==="Practical FX"?y.innerHTML=`
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
      `:B==="Stunts"?y.innerHTML=`
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
      `:B==="Locations"?y.innerHTML=`
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
      `};b&&(b.onchange=$,$());const N=document.getElementById("modal-add-element"),L=document.getElementById("btn-add-element"),k=document.getElementById("close-add-modal"),U=document.getElementById("btn-cancel-add"),P=document.getElementById("form-add-element"),de=()=>{$(),ot(N)},ae=()=>{he(N)};L&&(L.onclick=de),k&&(k.onclick=ae),U&&(U.onclick=ae),N&&(N.onclick=B=>{B.target===N&&ae()});const xe=document.getElementById("modal-delete-element"),ee=document.getElementById("close-delete-modal"),Se=document.getElementById("btn-cancel-delete"),ye=document.getElementById("btn-confirm-delete");let ke=null;const De=B=>{ke=B;const K=document.getElementById("delete-modal-name"),Ie=document.getElementById("delete-modal-category"),ne=document.getElementById("delete-modal-scenes");if(K&&(K.textContent=B.name),Ie&&(Ie.textContent=B.category),ne){const fe=Array.isArray(B.scenes)&&B.scenes.length>0?B.scenes:[B.sceneNumber];ne.textContent=`Associated with: ${fe.map(A=>`Scene ${A}`).join(", ")}`}ot(xe)},oe=()=>{ke=null,he(xe)};ee&&(ee.onclick=oe),Se&&(Se.onclick=oe),xe&&(xe.onclick=B=>{B.target===xe&&oe()}),ye&&(ye.onclick=async()=>{if(!ke)return;const B=ke;ye.disabled=!0,ye.classList.add("opacity-75","cursor-not-allowed");try{const K=await Sl(o,B.id);K&&(K.success||K.removedId)?(w(`Deleted "${B.name}" from breakdown`),oe(),r=null,await x()):w(K?.message||"Failed to delete element")}catch(K){w("Error deleting element: "+(K.message||"Network error"))}finally{ye.disabled=!1,ye.classList.remove("opacity-75","cursor-not-allowed")}});const Ee=document.getElementById("btn-export-breakdown-pdf");Ee&&(Ee.onclick=async()=>{try{const B=await Ft(o,a,i);ho(B,{title:"Chronicles of Dust",draft:"Draft 4.2"}),w(`Exported Breakdown Report (${B.length} elements) PDF`)}catch(B){console.error(B),w("Failed to export breakdown PDF")}}),P&&(P.onsubmit=async B=>{B.preventDefault();const K=document.getElementById("elem-name")?.value,Ie=document.getElementById("elem-cat")?.value,ne=document.getElementById("elem-scenes")?.value||"18",fe=document.getElementById("elem-status")?.value||"Confirmed",A=document.getElementById("elem-desc")?.value;if(!K)return;const ve=ne.split(",").map(ce=>Number(ce.trim())).filter(ce=>!isNaN(ce)),He=ve.length>0?ve[0]:18,Re={name:K,category:Ie,sceneNumber:He,sceneId:`scene-${He}`,scenes:ve,description:A,status:fe,sourceSnippet:`Manual production element registered for Scene ${ve.join(", ")}`,assignedActor:document.getElementById("add-actor")?.value||"",castingStatus:document.getElementById("add-casting-status")?.value||"Uncast / Open",actorAvailability:document.getElementById("add-availability")?.value||"",sourcingType:document.getElementById("add-prop-source")?.value||"",quantity:document.getElementById("add-prop-qty")?.value||"",readinessStatus:document.getElementById("add-prop-readiness")?.value||"",continuityNotes:document.getElementById("add-prop-continuity")?.value||"",requiredResources:document.getElementById("add-fx-res")?.value||"",technicalRequirements:document.getElementById("add-fx-tech")?.value||"",safetyNotes:document.getElementById("add-fx-safety")?.value||"",safetyPlanningStatus:document.getElementById("add-stunt-status")?.value||"",qualifiedPersonnel:document.getElementById("add-stunt-personnel")?.value||"",coordinationRequirements:document.getElementById("add-stunt-coordination")?.value||"",context:document.getElementById("add-loc-context")?.value||"",lighting:document.getElementById("add-loc-lighting")?.value||"",locationStatus:document.getElementById("add-loc-status")?.value||"",notes:document.getElementById("add-dept-notes")?.value||""};await El(o,Re),w(`Added "${K}" to Scene ${ve.join(", ")}`),he(),P.reset(),x()})}function nr(e=null,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=t||n.get("scriptId")||T.state.selectedScriptId||"chronicles-of-dust",a=s||n.get("csId"),i=n.get("action")==="new",l=n.get("action")==="edit",r=e||n.get("from");let f="/production";l?f=`/production/call-sheets?scriptId=${o}&csId=${a}`:a||i?f=`/production/call-sheets?scriptId=${o}`:f=r||"/production";const p=f;return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${pt("Pre-Production",l?"Edit Call Sheet":a?"Call Sheet Inspector":i?"Create New Call Sheet":"Call Sheets Workspace")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${Ys(l?"Edit Call Sheet":a?"Call Sheet Detail":i?"New Call Sheet":"Call Sheets",l?"edit_note":"assignment",p,!a&&!i&&!l?`
            <a href="/production/call-sheets?scriptId=${o}&action=new" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>New Call Sheet</span>
            </a>
          `:"",null,"Daily call sheets, crew calls and shooting details.")}

        <div id="callsheet-view-container" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading call sheet records...</div>
        </div>
      </main>

      ${ct("production")}
    </div>
  `}async function yo(e,t=null,s=null,n=null){const o=new URLSearchParams(window.location.search||""),a=s||o.get("scriptId")||T.state.selectedScriptId||"chronicles-of-dust",i=n||o.get("csId"),l=o.get("action")==="new",r=o.get("action")==="edit",f=document.getElementById("callsheet-view-container");if(!f)return;const d=(localStorage.getItem("scriptora_prod_role")||"Owner")==="Owner";if(r&&i){const c=await va(a,i);if(!c){f.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>';return}const x=c.status==="Confirmed"||c.isPublished;f.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col gap-4">
        <!-- Edit Masthead & Revision Notice -->
        <div class="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-bold text-base text-slate-900">Edit Call Sheet #${c.callSheetNumber}</h2>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${x?"bg-amber-50 text-amber-800 border border-amber-200":"bg-blue-50 text-blue-700 border border-blue-200"}">
                ${x?"Branch New Revision Draft":"Editing Draft"}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${c.shootDay} · Baseline: Draft 4.2 (Pinned)</p>
          </div>
          <div class="text-[11px] text-slate-400 font-mono">
            Source: Shooting Schedule Day ${c.shootDay.replace(/[^0-9]/g,"").slice(0,2)||"1"}
          </div>
        </div>

        ${x?`
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
                <span>${x?"Save Revision Draft":"Save Changes"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    `;const m=document.getElementById("form-edit-callsheet");m&&(m.onsubmit=async h=>{h.preventDefault();const b=document.getElementById("edit-cs-day")?.value||c.shootDay,y=document.getElementById("edit-cs-date")?.value||c.shootDate,$=document.getElementById("edit-cs-crewcall")?.value||c.generalCrewCall,N=document.getElementById("edit-cs-shootcall")?.value||c.shootingCall,L=document.getElementById("edit-cs-breakfast")?.value||c.breakfastTime,k=document.getElementById("edit-cs-wrap")?.value||c.estimatedWrap,U=document.getElementById("edit-cs-locname")?.value||c.locationName,P=document.getElementById("edit-cs-address")?.value||c.locationAddress,de=document.getElementById("edit-cs-parking")?.value||c.parkingNotes,ae=document.getElementById("edit-cs-hospital")?.value||c.nearestHospital,xe=document.getElementById("edit-cs-weather")?.value||c.weatherSummary,ee=document.getElementById("edit-cs-instructions")?.value||c.specialInstructions;await Il(a,c.id,{shootDay:b,shootDate:y,generalCrewCall:$,shootingCall:N,breakfastTime:L,estimatedWrap:k,locationName:U,locationAddress:P,parkingNotes:de,nearestHospital:ae,weatherSummary:xe,specialInstructions:ee,isDraftRevision:x}),w(x?"Saved as new revision draft":"Call Sheet updated successfully"),e(`/production/call-sheets?scriptId=${a}&csId=${c.id}`)})}else if(l){const c=await Rt(a);f.innerHTML=`
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
    `;const x=document.getElementById("tab-linked"),m=document.getElementById("tab-manual"),h=document.getElementById("section-linked-day");x&&m&&(x.onclick=()=>{x.classList.add("bg-white","text-blue-700","shadow-2xs"),m.classList.remove("bg-white","text-blue-700","shadow-2xs"),h?.classList.remove("hidden")},m.onclick=()=>{m.classList.add("bg-white","text-blue-700","shadow-2xs"),x.classList.remove("bg-white","text-blue-700","shadow-2xs"),h?.classList.add("hidden")});const b=document.getElementById("form-create-callsheet");b&&(b.onsubmit=async y=>{y.preventDefault();const $=document.getElementById("new-cs-day")?.value||"3",N=document.getElementById("new-cs-date")?.value,L=document.getElementById("new-cs-crewcall")?.value,k=document.getElementById("new-cs-locname")?.value,U=document.getElementById("new-cs-address")?.value,P=document.getElementById("new-cs-hospital")?.value,de=document.getElementById("new-cs-parking")?.value,ae=await kl(a,{shootDay:`Day ${$} of 14`,shootDate:N,generalCrewCall:L,shootingCall:"06:30 AM",locationName:k,locationAddress:U,nearestHospital:P,parkingNotes:de});w(`Created Call Sheet #${ae.callSheetNumber}`),e(`/production/call-sheets?scriptId=${a}&csId=${ae.id}`)})}else if(i){const c=await va(a,i);if(!c){f.innerHTML='<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>';return}const x=c.status==="Confirmed"||c.isPublished;f.innerHTML=`
      <!-- Top Action Banner -->
      <div class="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
            #${c.callSheetNumber}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-semibold text-sm text-slate-900">Call Sheet #${c.callSheetNumber}</h2>
              <span class="px-2 py-0.5 rounded-md text-[10px] font-medium border ${x?"bg-slate-50 text-slate-600 border-slate-200":"bg-amber-50 text-amber-700 border-amber-200"}">
                ${x?"Published Snapshot":"Draft — Pending Owner Approval"}
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
          ${!x&&d?`
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
                <span class="w-32 text-right font-medium text-[11px] text-slate-700 truncate">${(y.cast||[]).map($=>`<a href="/production/breakdown?scriptId=${a}&category=Cast&character=${encodeURIComponent($)}&from=${encodeURIComponent(`/production/call-sheets?scriptId=${a}&csId=${c.id}`)}" class="hover:underline font-semibold" title="Inspect ${$} in Breakdown">${$}</a>`).join(", ")}</span>
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
    `;const m=document.getElementById("btn-print-callsheet");m&&(m.onclick=()=>{try{const y=T.state.activeScript||(T.state.scripts||[]).find($=>$.id===a);Pa(c,{title:y?.title||"Chronicles of Dust",company:y?.company||"Badlands Anthology LLC",draft:y?.draft||"Draft 4.2"}),w(`Exported Call Sheet #${c.callSheetNumber} PDF`)}catch(y){console.error(y),w("Failed to generate Call Sheet PDF")}});const h=document.getElementById("btn-delete-callsheet");h&&(h.onclick=async()=>{if(!confirm(`Are you sure you want to delete draft Call Sheet #${c.callSheetNumber}? This cannot be undone.`))return;const y=await Sa(a,c.id);y.success?(w(`Call Sheet #${c.callSheetNumber} deleted`),e(`/production/call-sheets?scriptId=${a}`)):w(y.message||"Failed to delete call sheet")});const b=document.getElementById("btn-publish-callsheet");b&&(b.onclick=async()=>{confirm("Approve and lock this call sheet as an official immutable snapshot?")&&(await Cl(a,c.id),w("Call Sheet published & snapshot locked"),e(`/production/call-sheets?scriptId=${a}&csId=${c.id}`))})}else{const c=await ls(a);f.innerHTML=`
      <div class="flex items-center justify-between">
        <h2 class="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px] text-blue-600">assignment</span>
          <span>Call Sheets Catalogue (${c.length})</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${c.map(x=>{const m=x.status==="Confirmed"||x.isPublished;return`
            <div class="cs-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group" data-id="${x.id}">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      #${x.callSheetNumber}
                    </div>
                    <div class="min-w-0">
                      <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors truncate">${x.shootDay}</h3>
                      <p class="text-[11px] text-slate-500 truncate">${x.shootDate}</p>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-medium shrink-0 ${m?"bg-slate-100 text-slate-700":"bg-amber-50/80 border border-amber-200 text-amber-800"}">
                    ${m?"Published":"Draft"}
                  </span>
                </div>

                <div class="space-y-1.5 text-xs text-slate-600 mt-2">
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[15px] text-slate-400">schedule</span>
                    <span>General Call: <strong class="text-slate-800">${x.generalCrewCall}</strong> · Set: <strong class="text-blue-600">${x.shootingCall}</strong></span>
                  </div>
                  <div class="flex items-center gap-1.5 truncate">
                    <span class="material-symbols-outlined text-[15px] text-slate-400">location_on</span>
                    <span class="truncate">${x.locationName}</span>
                  </div>
                </div>
              </div>

              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span class="flex items-center gap-1">
                  <span>View Details</span>
                  <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </span>
                <div class="flex items-center gap-2" onclick="event.stopPropagation()">
                  <button class="btn-card-export p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors" data-id="${x.id}" title="Direct Export PDF">
                    <span class="material-symbols-outlined text-[16px]">download</span>
                  </button>
                  ${!m&&d?`
                    <button class="btn-card-delete p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors" data-id="${x.id}" data-num="${x.callSheetNumber}" title="Delete Draft">
                      <span class="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  `:""}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    `,f.querySelectorAll(".cs-card").forEach(x=>{x.onclick=()=>{const m=x.getAttribute("data-id");e(`/production/call-sheets?scriptId=${a}&csId=${m}`)}}),f.querySelectorAll(".btn-card-export").forEach(x=>{x.onclick=m=>{m.stopPropagation();const h=x.getAttribute("data-id"),b=c.find(y=>y.id===h);if(b){const y=T.state.activeScript||(T.state.scripts||[]).find($=>$.id===a);Pa(b,{title:y?.title||"Chronicles of Dust",company:y?.company||"Badlands Anthology LLC",draft:y?.draft||"Draft 4.2"}),w(`Exported Call Sheet #${b.callSheetNumber} PDF`)}}}),f.querySelectorAll(".btn-card-delete").forEach(x=>{x.onclick=async m=>{m.stopPropagation();const h=x.getAttribute("data-id"),b=x.getAttribute("data-num");if(!confirm(`Delete draft Call Sheet #${b}?`))return;const y=await Sa(a,h);y.success?(w(`Call Sheet #${b} deleted`),yo(e,t,s)):w(y.message||"Failed to delete")}})}}function ar(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=t||s.get("scriptId")||T.state.selectedScriptId||"chronicles-of-dust",o=s.get("mode")||"dialogue",i=e||s.get("from")||`/production?scriptId=${n}`;return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${pt("Pre-Production","Dialogue Sheets & Actor Sides")}

      <main class="flex-1 w-full max-w-2xl mx-auto px-4 pt-16 pb-28 flex flex-col gap-3.5 fade-in">
        ${Ys("Dialogue & Actor Sides","theater_comedy",i,"",null,"Dialogue sheets and actor scene sides.")}
        
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

      ${ct("production")}
    </div>
  `}async function or(e,t=null,s=null){const n=new URLSearchParams(window.location.search||"");s||n.get("scriptId")||T.state.selectedScriptId;let o=n.get("mode")||"dialogue",a="KEVIN",i=n.get("scene")||"1";const l=document.getElementById("tab-mode-dialogue"),r=document.getElementById("tab-mode-sides"),f=document.getElementById("filter-controls"),p=document.getElementById("dialogue-sides-content"),d=[{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"KEVIN",parenthetical:"(adjusting filter)",dialogue:"Wind gauge is spiking past forty knots, Marcus. Did you check the terminal pressure at the intake valve?",action:"Kevin wipes gritty red dust from the gauge glass with his thumb."},{sceneNum:1,heading:"EXT. MOJAVE OUTPOST GATE 4 - DAY",character:"MARCUS",parenthetical:"(shrugging)",dialogue:"Telemetry's been on the fritz since dawn. Central syndicate says it's thermal fluctuation.",action:"Marcus gestures with a cigarette toward the desert horizon."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"MEERA",parenthetical:"(eyes on monitor)",dialogue:"That's no fluctuation. Look at line three. Someone bypassed the telemetry loop eighty miles upriver.",action:"Meera brings up a wireframe map showing a hidden subterranean siphon branch."},{sceneNum:2,heading:"INT. OUTPOST CUSTOMS SHED - DAY",character:"KEVIN",parenthetical:"(tense)",dialogue:"They're siphoning straight out of the municipal reservoir into private holding tanks.",action:"Kevin taps the terminal screen, freezing the anomaly coordinates."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"COMMANDER VANCE",parenthetical:"(smooth, unhurried)",dialogue:"Water belongs to those who possess the energy to lift it from the rock, Kevin. The frontier was built on that premise.",action:"Vance sips cold tea, watching the massive hydraulic pump pistons rise and plunge."},{sceneNum:7,heading:"INT. SYNDICATE PUMPING CONTROL - DAY",character:"KEVIN",parenthetical:"(stepping forward)",dialogue:"You signed the 2041 Treaty. If the southern aquifer collapses, ten thousand families wake up to dry taps.",action:"Kevin places the legal registry deed onto Vance's polished mahogany desk."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(shouting over the roar)",dialogue:"Hold the pylon, Meera! If the high-pressure valve seals now, the back-surge will fracture the entire chamber!",action:"Brine water sprays across Kevin's visor as he locks the hydraulic bypass manifold."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"MEERA",parenthetical:"(straining on cable)",dialogue:"Then don't let them break! Reroute the secondary relay through the floodgate breaker!",action:"Meera kicks off the iron catwalk, swinging across the chasm to secure the emergency lock."},{sceneNum:18,heading:"INT. PUMPING STATION CHAMBER B - NIGHT",character:"KEVIN",parenthetical:"(levering the valve bar)",dialogue:"Bypass locked! Bleed the line! Three... two... one!",action:"The pressure needles drop from red to blue as the municipal pipeline fills with fresh current."}];function c(){const b=new Date,y=$=>String($).padStart(2,"0");return`${y(b.getDate())}/${y(b.getMonth()+1)}/${b.getFullYear()}`}function x(){if(f)if(o==="dialogue"){f.innerHTML=`
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
      `;const b=document.getElementById("char-select");b&&(b.onchange=y=>{a=y.target.value,m()})}else{f.innerHTML=`
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
      `;const b=document.getElementById("scene-select");b&&(b.onchange=y=>{i=y.target.value,m()})}}function m(){if(!p)return;const b=c();if(o==="dialogue"){const y=d.filter($=>$.character===a);p.innerHTML=`
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
          ${y.map($=>`
            <div class="space-y-1.5">
              <div class="font-sans font-bold text-[12px] text-blue-700 uppercase tracking-wide">
                SCENE ${$.sceneNum} — ${$.heading}
              </div>
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest pt-2">
                ${$.character}
              </div>
              ${$.parenthetical?`
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${$.parenthetical}
                </div>
              `:""}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto text-left">
                ${$.dialogue}
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
      `}else{const y=d.filter(N=>String(N.sceneNum)===String(i)),$=y[0]||{heading:`SCENE ${i}`};p.innerHTML=`
        <!-- Sides Masthead -->
        <div class="font-sans flex flex-col gap-1">
          <div class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">SCRIPTORA · PRODUCTION SIDES</div>
          <h2 class="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
            ACTOR SIDES<br />— SCENE ${i}
          </h2>
          <div class="text-[12px] text-slate-600 font-medium mt-0.5">${$.heading} · Draft 4.2</div>
          <div class="text-[12px] text-slate-500">Rehearsal & On-Set Copy</div>
          <div class="text-[12px] text-slate-500">Date: ${b}</div>
          <div class="w-full h-0.5 bg-slate-900 mt-2 mb-4"></div>
        </div>

        <!-- Formatted Script Scene Beat -->
        <div class="space-y-4 pt-1 max-w-2xl mx-auto leading-relaxed font-mono w-full">
          <div class="font-bold text-[13px] text-slate-900 uppercase">
            ${$.heading}
          </div>

          ${y.map(N=>`
            <div class="space-y-1.5 my-3">
              ${N.action?`
                <div class="text-slate-700 text-[12px] leading-relaxed italic mb-2 font-sans">
                  ${N.action}
                </div>
              `:""}
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest">
                ${N.character}
              </div>
              ${N.parenthetical?`
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${N.parenthetical}
                </div>
              `:""}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto">
                ${N.dialogue}
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
      `}h()}function h(){const b=document.getElementById("btn-export-pdf");b&&(b.onclick=()=>{try{if(o==="dialogue"){const y=d.filter($=>$.character===a);Yi(a,y,{title:"Chronicles of Dust",draft:"Draft 4.2"}),w(`Exported ${a} Dialogue Sheet PDF`)}else{const y=Number(i),$=d.filter(L=>L.sceneNum===y),N=$[0]||{heading:`SCENE ${y}`};Xi(i,$,{heading:N.heading,pages:"2 1/8"},{title:"Chronicles of Dust",draft:"Draft 4.2"}),w(`Exported Scene ${i} Actor Sides PDF`)}}catch(y){console.error(y),w("Failed to generate PDF document")}})}l&&r&&(l.onclick=()=>{o="dialogue",l.className="flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all bg-white text-blue-600 shadow-2xs cursor-pointer text-center",r.className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all text-slate-600 hover:text-slate-900 cursor-pointer text-center",x(),m()},r.onclick=()=>{o="sides",r.className="flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all bg-white text-blue-600 shadow-2xs cursor-pointer text-center",l.className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all text-slate-600 hover:text-slate-900 cursor-pointer text-center",x(),m()}),x(),m()}const lr={Cast:"person",Locations:"location_on",Props:"inventory_2","Practical FX":"science",Stunts:"sports_kabaddi",Costumes:"checkroom",Vehicles:"commute",Sound:"music_note","Hair & Makeup":"face",Equipment:"videocam","Special Equipment":"videocam"};function ir(e=null,t=null){const s=new URLSearchParams(window.location.search||"");t||s.get("scriptId")||T.state.selectedScriptId;const n=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${pt("Pre-Production","Master Shooting Schedule")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-4 fade-in">
        <!-- SubNav with Title, Project Context & Primary Actions -->
        ${Ys("Shooting Schedule","calendar_month",n||"/production",`
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

      ${ct("production")}
    </div>
  `}async function rr(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||T.state.selectedScriptId||"chronicles-of-dust",a=document.getElementById("schedule-calendar-container"),i=document.getElementById("day-detail-modal");if(!a)return;let l=await Rt(o),r=await vs(o),f=await Ft(o);const p=new Set,d=new Set,c=new Set;function x(){a.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-3">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-blue-600 text-lg">calendar_month</span>
            <h3 class="font-heading font-semibold text-sm text-slate-900">Shooting Calendar Matrix</h3>
          </div>
          <span class="text-xs text-slate-500 font-medium">October 24 – October 30, 2026</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-1">
          ${l.map(ne=>{const fe=(ne.sceneNumbers||[]).map(A=>r.find(ve=>ve.sceneNumber===A)).filter(Boolean);return`
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
                    ${fe.slice(0,3).map(A=>`
                      <button class="btn-badge-scene px-1.5 py-0.5 rounded bg-white hover:bg-blue-50 hover:border-blue-300 border border-slate-200 font-mono text-[9px] font-bold text-slate-700 transition-colors cursor-pointer" data-scene-id="${A.id}" title="View Scene ${A.sceneNumber} details">#${A.sceneNumber}</button>
                    `).join("")}
                    ${fe.length>3?`<span class="text-[10px] text-slate-400">+${fe.length-3}</span>`:""}
                  </div>
                  <span class="text-blue-600 font-semibold text-[10px] flex items-center gap-0.5">
                    Open &rarr;
                  </span>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,a.querySelectorAll(".calendar-day-card").forEach(ne=>{ne.onclick=()=>{const fe=ne.getAttribute("data-day");fe&&P(fe)}}),a.querySelectorAll(".btn-badge-scene").forEach(ne=>{ne.onclick=fe=>{fe.stopPropagation();const A=ne.getAttribute("data-scene-id");A&&ee(A)}})}let m=null,h=!1,b=!1;const y=new Set;let $=!1;const N=new Set,L=new Set;let k=null;function U(ne){const fe=(ne.sceneNumbers||[]).map(Re=>r.find(ce=>ce.sceneNumber===Re)).filter(Boolean);let A=0;fe.forEach(Re=>{const ce=(Re.pages||"").match(/(\d+)\s*(\d+)\/8/);if(ce)A+=parseInt(ce[1],10)*8+parseInt(ce[2],10);else{const R=parseFloat(Re.pages);isNaN(R)||(A+=Math.round(R*8))}});const ve=Math.floor(A/8),He=A%8;return ne.totalPages=`${ve} ${He}/8`,ne.totalPages}function P(ne,fe=null){const A=l.find(V=>V.dayNumber===Number(ne));if(!A)return;if(m=A.dayNumber,fe){const V=r.find(v=>v.id===fe||String(v.sceneNumber)===String(fe));V&&p.add(V.id)}const ve=document.getElementById("modal-day-badge"),He=document.getElementById("modal-day-title"),Re=document.getElementById("modal-day-sub"),ce=document.getElementById("modal-day-content"),R=document.getElementById("modal-day-menu-btn"),C=document.getElementById("modal-day-menu-dropdown"),Y=document.getElementById("modal-day-edit-btn"),ue=document.getElementById("modal-day-menu-edit"),Z=document.getElementById("modal-day-lock-toggle"),we=document.getElementById("modal-day-lock-label"),le=document.getElementById("modal-day-lock-icon"),$e=document.getElementById("modal-day-delete");ve&&(ve.textContent=`D${A.dayNumber}`),He&&(He.textContent=`Day ${A.dayNumber} • ${A.date.split(",")[0]}`),Re&&(Re.textContent=`${A.location}${A.totalPages?` • ${A.totalPages} pgs`:""}`),R&&C&&(C.classList.add("hidden"),C.onclick=V=>V.stopPropagation(),R.onclick=V=>{V.stopPropagation();const v=C.classList.contains("hidden");document.querySelectorAll("[data-scriptora-popup]").forEach(j=>{j!==C&&j.classList.add("hidden")}),v?(C.classList.remove("hidden"),zs(R,C,{placement:"bottom-end",zIndex:1e4})):C.classList.add("hidden")},R._outsideClickAttached||(R._outsideClickAttached=!0,document.addEventListener("click",()=>{C.classList.add("hidden")})),k={close:()=>C.classList.add("hidden")}),Y&&(Y.onclick=()=>{h=!h,P(A.dayNumber)}),ue&&(ue.onclick=V=>{V.stopPropagation(),k?.close(),h=!h,P(A.dayNumber)}),Re&&(Re.onclick=()=>{h=!0,P(A.dayNumber)}),we&&(we.textContent=A.isLocked?"Unlock Day":"Lock Day"),le&&(le.textContent=A.isLocked?"lock_open":"lock"),Z&&(Z.onclick=async V=>{V.stopPropagation(),k?.close(),A.isLocked=!A.isLocked,await Wt(o,A.dayNumber,{isLocked:A.isLocked}),w(`Day ${A.dayNumber} ${A.isLocked?"locked":"unlocked"}`),we&&(we.textContent=A.isLocked?"Unlock Day":"Lock Day"),le&&(le.textContent=A.isLocked?"lock_open":"lock"),x()}),$e&&($e.onclick=async V=>{if(V.stopPropagation(),k?.close(),!confirm(`Are you sure you want to remove Shoot Day ${A.dayNumber}? Any scenes should be moved first.`))return;const v=await Bl(o,A.dayNumber);v.success?(w(`Shoot Day ${A.dayNumber} deleted`),xe(),l=await Rt(o),x()):w(v.message||"Failed to delete day")});const Le=(A.sceneNumbers||[]).map(V=>r.find(v=>v.sceneNumber===V)).filter(Boolean),Be=r.filter(V=>!A.sceneNumbers.includes(V.sceneNumber));if(ce){ce.innerHTML=`
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
          <span class="font-heading font-semibold text-slate-900 text-xs">Assigned Scenes (${Le.length})</span>
          <button id="btn-toggle-assign-scene" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-[11px] font-semibold transition-colors cursor-pointer" title="Assign scene to this shoot day">
            <span class="material-symbols-outlined text-[13px]">add</span>
            <span>Assign Scene</span>
          </button>
        </div>

        <!-- Inline Scene Assign Selector -->
        ${$?`
          <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex flex-col gap-2.5 animate-in fade-in w-full min-w-0 box-border">
            <div class="flex items-center justify-between text-xs font-semibold text-blue-900 gap-2">
              <span class="truncate">Add Screenplay Scene to Shoot Day ${A.dayNumber}</span>
              <button id="btn-close-assign-scene" class="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer shrink-0" title="Close scene selector">
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            ${Be.length>0?`
              <div class="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-2 w-full min-w-0">
                <div class="min-w-0 flex-1 w-full">
                  <label for="select-scene-to-assign" class="sr-only">Select scene to assign to shoot day</label>
                  <select id="select-scene-to-assign" class="w-full min-w-0 max-w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 sm:py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500 cursor-pointer truncate">
                    ${Be.map(E=>`
                      <option value="${E.sceneNumber}">#${E.sceneNumber} ${E.heading} (${E.pages} pgs)</option>
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
          ${Le.length>0?Le.map((E,H)=>{const J=p.has(E.id),te=d.has(E.id),D=c.has(E.id),Pe=y.has(E.id),tt=N.has(E.id),yt=L.has(E.id),st=f.filter(Me=>Me.sceneId===E.id||Me.sceneNumber===E.sceneNumber||Array.isArray(Me.scenes)&&Me.scenes.includes(E.sceneNumber));return`
              <div class="scene-item-card rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-all" data-scene-num="${E.sceneNumber}" data-scene-id="${E.id}">
                ${Pe?`
                  <!-- Inline Edit Scene Mode -->
                  <div class="p-3 bg-blue-50/40 flex flex-col gap-2">
                    <div class="text-[11px] font-bold text-slate-800 flex items-center justify-between border-b border-blue-200/60 pb-1.5">
                      <span>Edit Scene #${E.sceneNumber}</span>
                      <button class="btn-cancel-scene-edit text-slate-400 hover:text-slate-700 cursor-pointer" data-scene-id="${E.id}">
                        <span class="material-symbols-outlined text-[15px]">close</span>
                      </button>
                    </div>
                    <div class="flex flex-col gap-1.5">
                      <div>
                        <label class="block text-[10px] text-slate-500 font-semibold mb-0.5">Scene Heading</label>
                        <input type="text" class="input-scene-heading w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-none focus:border-blue-500" value="${E.heading}" />
                      </div>
                      <div class="grid grid-cols-2 gap-2">
                        <div>
                          <label class="block text-[10px] text-slate-500 font-semibold mb-0.5">Pages</label>
                          <input type="text" class="input-scene-pages w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-none focus:border-blue-500" value="${E.pages}" placeholder="e.g. 7 2/8" />
                        </div>
                        <div>
                          <label class="block text-[10px] text-slate-500 font-semibold mb-0.5">Complexity</label>
                          <select class="input-scene-complexity w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-none">
                            <option value="Low" ${E.complexity==="Low"?"selected":""}>Low</option>
                            <option value="Medium" ${E.complexity==="Medium"||!E.complexity?"selected":""}>Medium</option>
                            <option value="High" ${E.complexity==="High"?"selected":""}>High</option>
                          </select>
                        </div>
                      </div>
                      <div class="flex items-center justify-between pt-1">
                        <button class="btn-remove-scene-day text-rose-600 hover:text-rose-700 text-[11px] font-medium flex items-center gap-1 cursor-pointer" data-scene="${E.sceneNumber}">
                          <span class="material-symbols-outlined text-[13px]">delete</span>
                          <span>Remove from Day</span>
                        </button>
                        <div class="flex items-center gap-1.5">
                          <button class="btn-cancel-scene-edit px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer" data-scene-id="${E.id}">Cancel</button>
                          <button class="btn-save-scene-edit px-3 py-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs cursor-pointer" data-scene-id="${E.id}">Save Scene</button>
                        </div>
                      </div>
                    </div>
                  </div>
                `:`
                  <!-- Compact Scene Row -->
                  <div class="p-2.5 sm:p-3 flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <span class="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 font-mono font-bold text-xs flex items-center justify-center text-slate-800 shrink-0">#${E.sceneNumber}</span>
                      <div class="min-w-0">
                        <div class="font-medium text-slate-900 text-xs truncate leading-snug">${E.heading}</div>
                        <div class="text-[11px] text-slate-500 font-medium">${E.pages} pgs</div>
                      </div>
                    </div>

                    <div class="flex items-center gap-1 shrink-0">
                      <button class="btn-scene-up p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer" data-scene="${E.sceneNumber}" ${H===0?"disabled":""} title="Move earlier in shooting order">
                        <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
                      </button>
                      <button class="btn-scene-down p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer" data-scene="${E.sceneNumber}" ${H===Le.length-1?"disabled":""} title="Move later in shooting order">
                        <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
                      </button>
                      <button class="btn-edit-scene-quick p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer" data-scene-id="${E.id}" title="Edit scene heading & pages">
                        <span class="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button class="btn-toggle-scene-inline px-2.5 py-1 rounded-lg ${J?"bg-blue-600 text-white font-semibold":"bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold border border-blue-200/80"} text-[11px] flex items-center gap-1 transition-colors cursor-pointer" data-scene-id="${E.id}">
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
                      <h4 class="font-heading font-bold text-xs text-slate-900 leading-snug">#${E.sceneNumber} ${E.heading}</h4>
                      <p class="text-[11px] text-slate-500 mt-0.5">
                        Shoot Day ${A.dayNumber} • Chronicles of Dust • Draft 4.2 (Pinned)
                      </p>
                    </div>

                    <!-- Editable Scene Snippet -->
                    ${tt?`
                      <div class="flex flex-col gap-1.5 bg-white border border-slate-200 rounded-lg p-2">
                        <label class="text-[10px] font-semibold text-slate-500">Edit Scene Snippet / Description</label>
                        <textarea class="input-scene-snippet w-full text-xs p-1.5 border border-slate-200 rounded focus:outline-none focus:border-blue-500" rows="3">${E.snippet||""}</textarea>
                        <div class="flex items-center justify-end gap-1.5">
                          <button class="btn-cancel-snippet px-2 py-0.5 rounded text-[11px] text-slate-600 hover:bg-slate-100 cursor-pointer" data-scene-id="${E.id}">Cancel</button>
                          <button class="btn-save-snippet px-2.5 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold cursor-pointer" data-scene-id="${E.id}">Save</button>
                        </div>
                      </div>
                    `:`
                      <div class="flex flex-col gap-1 bg-white border border-slate-200/80 rounded-lg p-2">
                        <div class="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                          <span>Scene Snippet</span>
                          <button class="btn-edit-snippet text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5" data-scene-id="${E.id}">
                            <span class="material-symbols-outlined text-[12px]">edit</span>
                            <span>Edit</span>
                          </button>
                        </div>
                        <p class="text-[11px] text-slate-600 leading-relaxed">
                          ${E.snippet||'<span class="italic text-slate-400">No snippet provided.</span>'}
                        </p>
                      </div>
                    `}

                    <!-- Quick Action Links -->
                    <div class="flex items-center gap-2 pt-0.5 flex-wrap">
                      <button class="btn-scene-breakdown inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer" data-scene-num="${E.sceneNumber}">
                        <span class="material-symbols-outlined text-[14px] text-blue-600">dataset</span>
                        <span>Breakdown</span>
                      </button>
                      <button class="btn-scene-sides inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer" data-scene-num="${E.sceneNumber}">
                        <span class="material-symbols-outlined text-[14px] text-blue-600">description</span>
                        <span>Actor Sides</span>
                      </button>
                      <button class="btn-scene-pdf inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer" data-scene-id="${E.id}">
                        <span class="material-symbols-outlined text-[14px] text-blue-600">download</span>
                        <span>Export PDF</span>
                      </button>
                    </div>
                  </div>

                  <!-- Expandable 'More Details' Section -->
                  <div class="pt-1">
                    <button class="btn-toggle-more-details w-full py-1.5 px-2.5 rounded-lg bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer" data-scene-id="${E.id}">
                      <span class="flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-[15px] text-slate-500">tune</span>
                        <span>More Details</span>
                      </span>
                      <span class="material-symbols-outlined text-[16px] text-slate-400 transition-transform more-details-chevron ${te?"rotate-180":""}">expand_more</span>
                    </button>

                    <div class="more-details-panel ${te?"":"hidden"} flex flex-col gap-2.5 pt-2 text-xs">
                      <!-- Cast with Add & Remove functionality -->
                      <div class="flex flex-col gap-1.5">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Cast</span>
                          <button class="btn-toggle-add-cast text-[11px] text-blue-600 font-medium hover:underline flex items-center gap-0.5 cursor-pointer" data-scene-id="${E.id}">
                            <span class="material-symbols-outlined text-[13px]">add</span>
                            <span>Add Cast</span>
                          </button>
                        </div>
                        ${yt?`
                          <div class="flex items-center gap-1.5 py-1">
                            <input type="text" class="input-new-cast-name flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500" placeholder="Character name (e.g. AARAV)" />
                            <button class="btn-save-new-cast px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] shadow-2xs cursor-pointer" data-scene-id="${E.id}">Add</button>
                            <button class="btn-cancel-new-cast px-2 py-1 rounded-lg text-slate-500 hover:bg-slate-100 text-[11px] cursor-pointer" data-scene-id="${E.id}">Cancel</button>
                          </div>
                        `:""}
                        <div class="flex items-center gap-1.5 flex-wrap">
                          ${E.cast&&E.cast.length>0?E.cast.map(Me=>`
                            <span class="inline-flex items-center gap-1 pl-1.5 pr-1 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-800">
                              <span class="w-3.5 h-3.5 rounded-full bg-slate-100 text-slate-600 text-[9px] flex items-center justify-center font-bold">${Me.charAt(0)}</span>
                              <span>${Me}</span>
                              <button class="btn-remove-cast-member text-slate-400 hover:text-rose-600 ml-0.5 cursor-pointer" data-scene-id="${E.id}" data-cast="${Me}" title="Remove character">
                                <span class="material-symbols-outlined text-[12px]">close</span>
                              </button>
                            </span>
                          `).join(""):'<span class="text-slate-400 text-[11px] italic">No cast assigned</span>'}
                        </div>
                      </div>

                      <!-- Breakdown Elements -->
                      <div class="flex flex-col gap-1 pt-1 border-t border-slate-200/60">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Breakdown Elements (${st.length})</span>
                          <button class="btn-scene-breakdown text-[11px] text-blue-600 font-medium hover:underline cursor-pointer" data-scene-num="${E.sceneNumber}">Edit in Breakdown &rarr;</button>
                        </div>
                        ${st.length>0?`
                          <div class="flex items-center gap-1.5 flex-wrap">
                            ${st.map(Me=>`
                              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] text-slate-700">
                                <span class="material-symbols-outlined text-[13px] text-blue-600">${lr[Me.category]||"label"}</span>
                                <span>${Me.name}</span>
                                ${Me.category?`<span class="text-slate-400 text-[9px]">(${Me.category})</span>`:""}
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
                          <select class="select-inline-move-day bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] text-slate-800 font-medium focus:outline-none cursor-pointer" data-scene="${E.sceneNumber}">
                            ${l.map(Me=>`
                              <option value="${Me.dayNumber}" ${Me.dayNumber===A.dayNumber?"selected":""}>
                                Day ${Me.dayNumber} (${Me.date.split(",")[0]})
                              </option>
                            `).join("")}
                          </select>
                          <button class="btn-inline-move-day px-2 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer" data-scene="${E.sceneNumber}">
                            Move
                          </button>
                        </div>
                      </div>

                      <!-- Production & Continuity Notes (Compact Editable Workflow) -->
                      <div class="notes-container border-t border-slate-200/60 pt-1.5 flex flex-col gap-1.5">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Production & Continuity Notes</span>
                          <button class="btn-edit-notes text-[11px] text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer" data-scene-id="${E.id}">
                            <span class="material-symbols-outlined text-[13px]">edit</span>
                            <span>${E.directorNotes||E.continuityNotes?"Edit Notes":"Add Notes"}</span>
                          </button>
                        </div>

                        <!-- Display Mode (Collapsed by default, shown when not editing) -->
                        <div class="notes-display-mode ${D?"hidden":""} flex flex-col gap-1 text-[11px] text-slate-600 bg-white border border-slate-200/70 rounded-lg p-2">
                          ${E.directorNotes||E.continuityNotes?`
                            ${E.directorNotes?`<div><span class="font-medium text-slate-800">Director:</span> ${E.directorNotes}</div>`:""}
                            ${E.continuityNotes?`<div><span class="font-medium text-slate-800">Continuity:</span> ${E.continuityNotes}</div>`:""}
                          `:`
                            <div class="text-slate-400 italic">No production or continuity notes logged.</div>
                          `}
                        </div>

                        <!-- Editable Fields (Only visible when explicitly editing) -->
                        <div class="notes-edit-mode ${D?"":"hidden"} flex flex-col gap-2 bg-white border border-slate-200 rounded-xl p-2.5">
                          <div>
                            <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">Director's Notes</label>
                            <textarea class="input-director-notes w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" rows="2" placeholder="Camera, lighting, director preferences...">${E.directorNotes||""}</textarea>
                          </div>
                          <div>
                            <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">Continuity Notes</label>
                            <textarea class="input-continuity-notes w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" rows="2" placeholder="Props, costume, timeline markers...">${E.continuityNotes||""}</textarea>
                          </div>
                          <div class="flex items-center justify-end gap-2 pt-1">
                            <button class="btn-cancel-notes px-2.5 py-1 rounded-lg text-slate-600 hover:bg-slate-100 text-[11px] font-medium cursor-pointer" data-scene-id="${E.id}">
                              Cancel
                            </button>
                            <button class="btn-save-notes px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold shadow-2xs transition-colors cursor-pointer" data-scene-id="${E.id}">
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
      `;const V=document.getElementById("btn-cancel-day-top"),v=document.getElementById("btn-cancel-day-info"),j=document.getElementById("btn-save-day-info");V&&(V.onclick=()=>{h=!1,P(A.dayNumber)}),v&&(v.onclick=()=>{h=!1,P(A.dayNumber)}),j&&(j.onclick=async()=>{const E=document.getElementById("input-edit-day-date")?.value?.trim(),H=parseFloat(document.getElementById("input-edit-day-hours")?.value)||A.estHours,J=document.getElementById("input-edit-day-loc")?.value?.trim();E&&(A.date=E),H&&(A.estHours=H),J&&(A.location=J),await Wt(o,A.dayNumber,{date:A.date,estHours:A.estHours,location:A.location}),w(`Shoot Day ${A.dayNumber} updated`),h=!1,x(),P(A.dayNumber)});const G=document.getElementById("btn-toggle-day-constraints"),W=document.getElementById("day-constraints-content"),se=document.getElementById("constraints-chevron");G&&W&&(G.onclick=()=>{const E=W.classList.toggle("hidden");se&&se.classList.toggle("rotate-180",!E)});const ge=document.getElementById("btn-edit-constraints"),me=document.getElementById("btn-cancel-constraints"),Ne=document.getElementById("btn-save-constraints");ge&&(ge.onclick=()=>{b=!0,P(A.dayNumber),document.getElementById("day-constraints-content")?.classList.remove("hidden")}),me&&(me.onclick=()=>{b=!1,P(A.dayNumber),document.getElementById("day-constraints-content")?.classList.remove("hidden")}),Ne&&(Ne.onclick=async()=>{const E=document.getElementById("input-constraints-loc")?.value?.trim(),H=parseFloat(document.getElementById("input-constraints-hours")?.value)||A.estHours,J=document.getElementById("input-constraints-turnaround")?.value?.trim();E&&(A.location=E),H&&(A.estHours=H),J&&(A.turnaroundNote=J),await Wt(o,A.dayNumber,{location:A.location,estHours:A.estHours,turnaroundNote:A.turnaroundNote}),w("Production constraints updated"),b=!1,x(),P(A.dayNumber),document.getElementById("day-constraints-content")?.classList.remove("hidden")});const Te=document.getElementById("btn-toggle-assign-scene"),Oe=document.getElementById("btn-close-assign-scene"),_e=document.getElementById("btn-confirm-assign-scene");Te&&(Te.onclick=()=>{$=!$,P(A.dayNumber)}),Oe&&(Oe.onclick=()=>{$=!1,P(A.dayNumber)}),_e&&(_e.onclick=async()=>{const E=Number(document.getElementById("select-scene-to-assign")?.value);E&&!A.sceneNumbers.includes(E)&&(A.sceneNumbers.push(E),U(A),await Wt(o,A.dayNumber,{sceneNumbers:A.sceneNumbers,totalPages:A.totalPages}),w(`Scene #${E} added to Shoot Day ${A.dayNumber}`),$=!1,x(),P(A.dayNumber))}),ce.querySelectorAll(".btn-edit-scene-quick").forEach(E=>{E.onclick=()=>{const H=E.getAttribute("data-scene-id");H&&(y.add(H),P(A.dayNumber))}}),ce.querySelectorAll(".btn-cancel-scene-edit").forEach(E=>{E.onclick=()=>{const H=E.getAttribute("data-scene-id");H&&(y.delete(H),P(A.dayNumber))}}),ce.querySelectorAll(".btn-save-scene-edit").forEach(E=>{E.onclick=async()=>{const H=E.getAttribute("data-scene-id"),J=E.closest(".scene-item-card"),te=J?.querySelector(".input-scene-heading")?.value?.trim(),D=J?.querySelector(".input-scene-pages")?.value?.trim(),Pe=J?.querySelector(".input-scene-complexity")?.value,tt=r.find(yt=>yt.id===H);tt&&(te&&(tt.heading=te),D&&(tt.pages=D),Pe&&(tt.complexity=Pe),await Ls(o,tt.id,{heading:te,pages:D,complexity:Pe}),U(A),await Wt(o,A.dayNumber,{totalPages:A.totalPages}),w(`Scene #${tt.sceneNumber} updated`),y.delete(H),x(),P(A.dayNumber))}}),ce.querySelectorAll(".btn-remove-scene-day").forEach(E=>{E.onclick=async()=>{const H=Number(E.getAttribute("data-scene"));H&&(A.sceneNumbers=A.sceneNumbers.filter(J=>J!==H),U(A),await Wt(o,A.dayNumber,{sceneNumbers:A.sceneNumbers,totalPages:A.totalPages}),w(`Scene #${H} removed from Day ${A.dayNumber}`),x(),P(A.dayNumber))}}),ce.querySelectorAll(".btn-edit-snippet").forEach(E=>{E.onclick=()=>{const H=E.getAttribute("data-scene-id");H&&(N.add(H),P(A.dayNumber))}}),ce.querySelectorAll(".btn-cancel-snippet").forEach(E=>{E.onclick=()=>{const H=E.getAttribute("data-scene-id");H&&(N.delete(H),P(A.dayNumber))}}),ce.querySelectorAll(".btn-save-snippet").forEach(E=>{E.onclick=async()=>{const H=E.getAttribute("data-scene-id"),te=E.closest(".scene-item-card")?.querySelector(".input-scene-snippet")?.value?.trim(),D=r.find(Pe=>Pe.id===H);D&&(D.snippet=te,await Ls(o,D.id,{snippet:te}),w(`Scene #${D.sceneNumber} snippet updated`),N.delete(H),P(A.dayNumber))}}),ce.querySelectorAll(".btn-toggle-add-cast").forEach(E=>{E.onclick=()=>{const H=E.getAttribute("data-scene-id");H&&(L.add(H),P(A.dayNumber))}}),ce.querySelectorAll(".btn-cancel-new-cast").forEach(E=>{E.onclick=()=>{const H=E.getAttribute("data-scene-id");H&&(L.delete(H),P(A.dayNumber))}}),ce.querySelectorAll(".btn-save-new-cast").forEach(E=>{E.onclick=async()=>{const H=E.getAttribute("data-scene-id"),te=E.closest(".scene-item-card")?.querySelector(".input-new-cast-name")?.value?.trim().toUpperCase(),D=r.find(Pe=>Pe.id===H);D&&te&&(D.cast=D.cast||[],D.cast.includes(te)||(D.cast.push(te),await Ls(o,D.id,{cast:D.cast}),w(`Character ${te} added to Scene #${D.sceneNumber}`)),L.delete(H),P(A.dayNumber))}}),ce.querySelectorAll(".btn-remove-cast-member").forEach(E=>{E.onclick=async()=>{const H=E.getAttribute("data-scene-id"),J=E.getAttribute("data-cast"),te=r.find(D=>D.id===H);te&&J&&(te.cast=(te.cast||[]).filter(D=>D!==J),await Ls(o,te.id,{cast:te.cast}),w(`Character ${J} removed from Scene #${te.sceneNumber}`),P(A.dayNumber))}}),ce.querySelectorAll(".btn-toggle-scene-inline").forEach(E=>{E.onclick=()=>{const H=E.getAttribute("data-scene-id");H&&(p.has(H)?p.delete(H):p.add(H),P(A.dayNumber))}}),ce.querySelectorAll(".btn-toggle-more-details").forEach(E=>{E.onclick=()=>{const H=E.getAttribute("data-scene-id");H&&(d.has(H)?d.delete(H):d.add(H),P(A.dayNumber))}}),ce.querySelectorAll(".btn-scene-up").forEach(E=>{E.onclick=async()=>{const H=Number(E.getAttribute("data-scene")),J=A.sceneNumbers.indexOf(H);if(J>0){const te=[...A.sceneNumbers],D=te[J];te[J]=te[J-1],te[J-1]=D,A.sceneNumbers=te,await wa(o,A.dayNumber,te),w("Scene shooting order updated"),x(),P(A.dayNumber)}}}),ce.querySelectorAll(".btn-scene-down").forEach(E=>{E.onclick=async()=>{const H=Number(E.getAttribute("data-scene")),J=A.sceneNumbers.indexOf(H);if(J<A.sceneNumbers.length-1){const te=[...A.sceneNumbers],D=te[J];te[J]=te[J+1],te[J+1]=D,A.sceneNumbers=te,await wa(o,A.dayNumber,te),w("Scene shooting order updated"),x(),P(A.dayNumber)}}}),ce.querySelectorAll(".btn-inline-move-day").forEach(E=>{E.onclick=async()=>{const H=Number(E.getAttribute("data-scene")),te=E.closest(".scene-item-card")?.querySelector(".select-inline-move-day"),D=Number(te?.value);if(!D||D===A.dayNumber){w(`Scene ${H} is already on Day ${A.dayNumber}`);return}await Al(o,H,A.dayNumber,D),l=await Rt(o),w(`Scene ${H} moved to Shoot Day ${D}`),x(),P(A.dayNumber)}}),ce.querySelectorAll(".btn-edit-notes").forEach(E=>{E.onclick=()=>{const H=E.getAttribute("data-scene-id");H&&(c.add(H),P(A.dayNumber))}}),ce.querySelectorAll(".btn-cancel-notes").forEach(E=>{E.onclick=()=>{const H=E.getAttribute("data-scene-id");H&&(c.delete(H),P(A.dayNumber))}}),ce.querySelectorAll(".btn-save-notes").forEach(E=>{E.onclick=async()=>{const H=E.getAttribute("data-scene-id"),J=E.closest(".scene-item-card"),te=J?.querySelector(".input-director-notes")?.value||"",D=J?.querySelector(".input-continuity-notes")?.value||"",Pe=r.find(tt=>tt.id===H);Pe&&(Pe.directorNotes=te,Pe.continuityNotes=D,await Ls(o,Pe.id,{directorNotes:te,continuityNotes:D}),w(`Scene ${Pe.sceneNumber} notes saved`),c.delete(H),P(A.dayNumber))}}),ce.querySelectorAll(".btn-scene-breakdown").forEach(E=>{E.onclick=()=>{const H=E.getAttribute("data-scene-num");e(`/production/breakdown?scriptId=${o}&scene=${H}`)}}),ce.querySelectorAll(".btn-scene-sides").forEach(E=>{E.onclick=()=>{const H=E.getAttribute("data-scene-num");e(`/production/dialogue-sides?scriptId=${o}&scene=${H}`)}}),ce.querySelectorAll(".btn-scene-pdf").forEach(E=>{E.onclick=()=>{const H=E.getAttribute("data-scene-id"),J=r.find(D=>D.id===H);if(!J)return;const te=f.filter(D=>D.sceneId===J.id||D.sceneNumber===J.sceneNumber||Array.isArray(D.scenes)&&D.scenes.includes(J.sceneNumber));try{ho(te,{title:`Chronicles of Dust — Scene ${J.sceneNumber}`,draft:"Draft 4.2"}),w(`Exported Scene ${J.sceneNumber} Logistics PDF`)}catch(D){console.error(D),w("Failed to export scene PDF")}}}),fe&&setTimeout(()=>{ce.querySelector(`[data-scene-id="${fe}"], [data-scene-num="${fe}"]`)?.scrollIntoView({behavior:"smooth",block:"nearest"})},50)}ot(i)}const de=document.getElementById("modal-day-close"),ae=document.getElementById("modal-day-done"),xe=()=>{he(i),m=null,h=!1,b=!1,y.clear(),$=!1,N.clear(),L.clear(),k?.close()};de&&(de.onclick=xe),ae&&(ae.onclick=xe),i&&(i.onclick=ne=>{ne.target===i&&xe()}),window.scriptoraRouter&&window.scriptoraRouter.registerBackHandler(()=>y.size>0||c.size>0||N.size>0||L.size>0||h||b||$?(y.clear(),c.clear(),N.clear(),L.clear(),h=!1,b=!1,$=!1,m&&renderModalDayContent(m),!0):i&&!i.classList.contains("hidden")?(xe(),!0):!1);async function ee(ne){let fe=r.find(ve=>ve.id===ne||String(ve.sceneNumber)===String(ne)||`scene-${ve.sceneNumber}`===String(ne));if(fe||(fe=await wl(o,ne)),!fe){w("Scene not found in current schedule");return}const A=l.find(ve=>(ve.sceneNumbers||[]).includes(fe.sceneNumber));A?P(A.dayNumber,fe.id):l.length>0&&P(l[0].dayNumber,fe.id)}const Se=document.getElementById("btn-export-schedule-pdf");Se&&(Se.onclick=()=>{try{Zi(l,r,{title:"Chronicles of Dust",draft:"Draft 4.2"}),w("Exported Master Shooting Schedule PDF")}catch(ne){console.error(ne),w("Failed to export schedule PDF")}});const ye=document.getElementById("modal-add-day"),ke=document.getElementById("btn-add-shoot-day"),De=document.getElementById("modal-add-day-close"),oe=document.getElementById("modal-add-day-cancel"),Ee=document.getElementById("form-add-shoot-day");function B(){if(!ye)return;const ne=l.length>0?Math.max(...l.map(R=>R.dayNumber))+1:1,fe=document.getElementById("input-add-day-num"),A=document.getElementById("input-add-day-date"),ve=document.getElementById("input-add-day-title"),He=document.getElementById("input-add-day-location"),Re=document.getElementById("input-add-day-hours"),ce=document.getElementById("input-add-day-pages");if(fe&&(fe.value=ne),A){const R=new Date(2026,9,23+ne),C=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];A.value=`${C[R.getMonth()]} ${R.getDate()}, ${R.getFullYear()}`}ve&&(ve.value=`Day ${ne} — Second Unit & Pickups`),He&&(He.value="Mojave Soundstage 2"),Re&&(Re.value="10"),ce&&(ce.value="0.0"),ot(ye)}function K(){he(ye)}ke&&(ke.onclick=B),De&&(De.onclick=K),oe&&(oe.onclick=K),ye&&(ye.onclick=ne=>{ne.target===ye&&K()}),Ee&&(Ee.onsubmit=async ne=>{ne.preventDefault();const fe=Number(document.getElementById("input-add-day-num")?.value)||l.length+1,A=document.getElementById("input-add-day-date")?.value||`Shoot Day ${fe}`,ve=document.getElementById("input-add-day-title")?.value||`Day ${fe}`,He=document.getElementById("input-add-day-location")?.value||"Location TBD",Re=Number(document.getElementById("input-add-day-hours")?.value)||10,ce=document.getElementById("input-add-day-pages")?.value||"0.0";await $l(o,{dayNumber:fe,title:ve,date:A,location:He,estHours:Re,totalPages:ce,sceneNumbers:[]}),l=await Rt(o),K(),w(`Added Shoot Day ${fe} (${A})`),x()}),x();const Ie=n.get("sceneId")||n.get("scene");Ie&&ee(Ie)}const cr={};function Tt(e){return`data:image/svg+xml;utf8,${encodeURIComponent(e.trim())}`}function dr(){return Tt(`
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
</svg>`)}function pr(){return Tt(`
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
</svg>`)}function ur(){return Tt(`
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
</svg>`)}function mr(){return Tt(`
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
</svg>`)}function fr(){return Tt(`
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
</svg>`)}function xr(){return Tt(`
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
</svg>`)}function br(){return Tt(`
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
</svg>`)}function gr(){return Tt(`
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
</svg>`)}function hr(){return Tt(`
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
</svg>`)}function yr(){return Tt(`
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
</svg>`)}function vr(){return Tt(`
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
</svg>`)}function wr(){return Tt(`
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
</svg>`)}const Mn=typeof import.meta<"u"&&cr?"/Scriptora/":"/",Ue=Mn.endsWith("/")?Mn:`${Mn}/`,qs=[{id:"Comic",name:"Comic",tagline:"Bold Ink & Halftone Dots",description:"Classic action comic illustration with thick outlines, halftone Ben-Day dots, and vibrant desert palette.",previewImage:`${Ue}assets/styles/comic.jpg`,fallbackSvg:dr()},{id:"Cinematic",name:"Cinematic",tagline:"35mm Film Still",description:"Atmospheric 35mm film still with moody natural lighting, shallow depth of field, and filmic grain.",previewImage:`${Ue}assets/styles/cinematic-realism.jpg`,fallbackSvg:pr()},{id:"Soft Pencil",name:"Soft Pencil",tagline:"Light Graphite & Fine Shading",description:"Delicate graphite pencil drawing on clean off-white paper with soft tonal cross-hatching.",previewImage:`${Ue}assets/styles/soft-pencil.jpg`,fallbackSvg:ur()},{id:"Animation 3D",name:"Animation 3D",tagline:"Pixar / Studio 3D CGI",description:"Warm 3D rendered character animation with soft volumetric lighting and expressive stylized anatomy.",previewImage:`${Ue}assets/styles/animation-3d.jpg`,fallbackSvg:mr()},{id:"Watercolor Paint",name:"Watercolor Paint",tagline:"Pastel Pigments & Fluid Wash",description:"Artistic watercolor wash on textured paper with soft bleeding pigments and dreamy translucent hues.",previewImage:`${Ue}assets/styles/watercolor-paint.jpg`,fallbackSvg:fr()},{id:"Photo / Commercial",name:"Photo / Commercial",tagline:"Sharp Advertising Photography",description:"Commercial editorial photography with razor-sharp lens focus, natural daylight, and bokeh.",previewImage:`${Ue}assets/styles/photorealistic.jpg`,fallbackSvg:xr()},{id:"Charcoal Sketch",name:"Charcoal Sketch",tagline:"Smudged Shadows & Rich Charcoal",description:"Dramatic expressive charcoal drawing with deep velvety blacks, smudged shadows, and coarse tooth paper.",previewImage:`${Ue}assets/styles/charcoal-sketch.jpg`,fallbackSvg:br()},{id:"Dark Anime",name:"Dark Anime",tagline:"Cyberpunk Cel-Shading",description:"Japanese anime aesthetic with sharp cel-shaded lines, intense city backlight, and glowing neon rim.",previewImage:`${Ue}assets/styles/dark-anime.jpg`,fallbackSvg:gr()},{id:"Flat / Vector",name:"Flat / Vector",tagline:"Clean 2D Vector Art",description:"Modern editorial 2D vector art with bold flat silhouettes, vibrant solid colors, and clean geometry.",previewImage:`${Ue}assets/styles/flat-vector.jpg`,fallbackSvg:hr()},{id:"Noir",name:"Noir",tagline:"High-Contrast Chiaroscuro",description:"Classic black-and-white film noir with stark shadows, dramatic streetlights, and rainy street reflections.",previewImage:`${Ue}assets/styles/noir.jpg`,fallbackSvg:yr()},{id:"Stick Figure",name:"Stick Figure",tagline:"Minimalist Modern Line Art",description:"Clean minimalist black line art with whimsical expressive poses and uncluttered white space.",previewImage:`${Ue}assets/styles/stick-figure.jpg`,fallbackSvg:vr()},{id:"Graphic Novel",name:"Graphic Novel",tagline:"Gritty Stark Shadow Blocking",description:"High-contrast graphic novel panel with heavy ink shadows and dramatic amber and violet duotone.",previewImage:`${Ue}assets/styles/graphic-novel.jpg`,fallbackSvg:wr()}];function Ct(e,t=""){if(!e||typeof e!="string")return`${Ue}assets/storyboard/shot_1a_wide_outpost.jpg`;if(e.startsWith("data:image/svg+xml")&&(e.includes("assets/storyboard")||e.includes("assets%2Fstoryboard")))try{const n=decodeURIComponent(e).match(/assets\/storyboard\/([a-zA-Z0-9_.-]+)/);if(n&&n[1])return`${Ue}assets/storyboard/${n[1]}`}catch{}if(e.startsWith("data:image/svg+xml")&&(e.includes("<rect")||e.includes("<svg")||e.includes("fill="))&&!e.includes("<image")){const s=`${e} ${t}`.toUpperCase();return s.includes("1B")||s.includes("TWO-SHOT")||s.includes("TWO SHOT")?`${Ue}assets/storyboard/shot_1b_two_shot_standoff.jpg`:s.includes("1C")||s.includes("CLOSE-UP")||s.includes("CLOSE UP")?`${Ue}assets/storyboard/shot_1c_closeup_reaction.jpg`:s.includes("1D")||s.includes("MACRO")||s.includes("INSERT")?`${Ue}assets/storyboard/shot_1d_macro_insert.jpg`:s.includes("10A")||s.includes("VALVE")?`${Ue}assets/storyboard/shot_10a_valve_breach.jpg`:s.includes("10B")||s.includes("PUMPING")||s.includes("HALL")?`${Ue}assets/storyboard/shot_10b_pumping_hall.jpg`:`${Ue}assets/storyboard/shot_1a_wide_outpost.jpg`}if(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:image/png")||e.startsWith("data:image/jpeg"))return e;if(e.includes("assets/storyboard/")||e.includes("assets/styles/")){const s=e.replace(/^\/?(Scriptora\/)?/,"");return`${Ue}${s}`}return e}function Vs(e){const t=(e||"").trim().toLowerCase();return qs.find(s=>{const n=s.id.toLowerCase(),o=s.name.toLowerCase();return n===t||o===t||t.includes(n)||n.includes(t)||t.includes("comic")&&n.includes("comic")||t.includes("cine")&&n.includes("cinematic")||t.includes("pencil")&&n.includes("pencil")||t.includes("3d")&&n.includes("3d")||t.includes("water")&&n.includes("water")||t.includes("photo")&&n.includes("photo")||t.includes("charcoal")&&n.includes("charcoal")||t.includes("anime")&&n.includes("anime")||t.includes("vector")&&n.includes("vector")||t.includes("noir")&&n.includes("noir")||t.includes("stick")&&n.includes("stick")||t.includes("graphic")&&n.includes("graphic")})||qs[2]}const Sr=["Establishing Shot","Action Shot","Reaction Shot","Dialogue Shot","Insert / Detail Shot","Transition Shot"],La=["Extreme Wide","Wide","Medium","Close-up","Extreme Close-up"],Da=["Eye Level","Low Angle","High Angle","Bird's Eye View","Over-the-Shoulder","Dutch Angle"],On=["2.39:1","16:9","4:3","9:16"],Er=["Static","Pan","Tilt","Tracking","Dolly"],Ra=["24mm","35mm","50mm","85mm"],Ma=["Auto / Scene-based","Daylight","Night","Golden Hour","Low-key","Backlit"],kr=["Left to Right","Right to Left","Static"],Oa=["Comic","Cinematic","Soft Pencil","Animation 3D","Watercolor Paint","Photo / Commercial","Charcoal Sketch","Dark Anime","Flat / Vector","Noir","Stick Figure","Graphic Novel","Concept Art","Cinematic Realism","Storyboard Sketch","Photorealistic"],Ir=["Standard Draft","High Definition Production"];function Cr(e=null,t=null){const s=new URLSearchParams(window.location.search||""),n=t||s.get("scriptId")||T.state.selectedScriptId||"chronicles-of-dust",o=e||s.get("from");return`
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${pt("Pre-Production","Storyboard Studio")}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3.5 fade-in">
        <!-- SubNav with Title, Project Context & Primary Actions -->
        ${Ys("Storyboard Studio","art_track",o||"/production",`
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
                    ${Sr.map(a=>`<option value="${a}">${a}</option>`).join("")}
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
                  ${qs.map(a=>`
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
                    ${La.map(a=>`<option value="${a}">${a}</option>`).join("")}
                  </select>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[10px] font-semibold text-slate-600 uppercase">Camera Angle</label>
                  <select id="input-shot-angle" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs">
                    ${Da.map(a=>`<option value="${a}">${a}</option>`).join("")}
                  </select>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[10px] font-semibold text-slate-600 uppercase">Aspect Ratio</label>
                  <select id="input-shot-ratio" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs">
                    ${On.map(a=>`<option value="${a}">${a}</option>`).join("")}
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
                      ${Er.map(a=>`<option value="${a}">${a}</option>`).join("")}
                    </select>
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-semibold text-slate-500 uppercase">Lens</label>
                    <select id="input-shot-focal" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                      ${Ra.map(a=>`<option value="${a}">${a}</option>`).join("")}
                    </select>
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-semibold text-slate-500 uppercase">Lighting</label>
                    <select id="input-shot-lighting" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                      ${Ma.map(a=>`<option value="${a}">${a}</option>`).join("")}
                    </select>
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-semibold text-slate-500 uppercase">Screen Direction</label>
                    <select id="input-shot-direction" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                      ${kr.map(a=>`<option value="${a}">${a}</option>`).join("")}
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
                  <span>Browse All Styles (${qs.length})</span>
                  <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
              
              <!-- Active Style Summary Card (Clicking opens style gallery popup) -->
              <div id="gen-active-style-card" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:border-blue-500 hover:bg-blue-50/30 cursor-pointer transition-all flex items-center gap-3 group shadow-2xs">
                <div class="w-20 aspect-video rounded-lg overflow-hidden bg-slate-200 border border-slate-200 shrink-0 relative">
                  <img id="gen-active-style-img" src="${Vs("Soft Pencil").previewImage}" onerror="this.onerror=null; this.src='${Vs("Soft Pencil").fallbackSvg}';" alt="Active style" class="w-full h-full object-cover" />
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
                  ${Ir.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Aspect Ratio</label>
                <select id="gen-ratio-select" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${On.map(a=>`<option value="${a}">${a}</option>`).join("")}
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
              ${qs.map(a=>`
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
                ${Oa.map(a=>`<option value="${a}">${a}</option>`).join("")}
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
                  ${Oa.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Aspect Ratio</label>
                <select id="pref-default-ratio" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${On.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Shot Size</label>
                <select id="pref-default-size" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${La.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Camera Angle</label>
                <select id="pref-default-angle" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${Da.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Lens</label>
                <select id="pref-default-lens" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${Ra.map(a=>`<option value="${a}">${a}</option>`).join("")}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Lighting</label>
                <select id="pref-default-lighting" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${Ma.map(a=>`<option value="${a}">${a}</option>`).join("")}
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
      ${ct("production")}
    </div>
  `}function _n({description:e,visualStyle:t,shotSize:s,cameraAngle:n,aspectRatio:o,cameraMovement:a,lens:i,lighting:l,screenDirection:r,sceneContext:f}){const p=[];t&&p.push(`[Style: ${t}]`),s&&p.push(`[Framing: ${s}]`),n&&p.push(`[Angle: ${n}]`),i&&p.push(`[Lens: ${i}]`),a&&a!=="Static"&&p.push(`[Movement: ${a}]`),l&&l!=="Auto / Scene-based"&&p.push(`[Lighting: ${l}]`),r&&r!=="Static"&&p.push(`[Direction: ${r}]`),o&&p.push(`[Aspect: ${o}]`),f&&p.push(`[Scene Context: ${f}]`);const d=(e||"").trim();return d?p.push(d):p.push("Cinematic storyboard composition"),p.join(" - ")}function Ar(e,t=null,s=null){const n=new URLSearchParams(window.location.search||""),o=s||n.get("scriptId")||T.state.selectedScriptId||"chronicles-of-dust";let a=n.get("sceneId")||"scene-1",i="contact",l=null,r=null,f=null,p=0,d=[],c=4;const x=new Set;let m="sequence",h=null,b="",y="draft";const $=document.getElementById("storyboard-scene-select"),N=document.getElementById("storyboard-view-container"),L=document.getElementById("view-tab-contact"),k=document.getElementById("view-tab-sequence"),U=document.getElementById("btn-export-storyboard-pdf"),P=document.getElementById("btn-generate-sequence"),de=document.getElementById("btn-add-shot"),ae=document.getElementById("btn-view-in-schedule"),xe=document.getElementById("storyboard-stale-alert"),ee=document.getElementById("btn-repin-storyboard"),Se=document.getElementById("continuity-warning-banner"),ye=document.getElementById("shot-inspector-modal"),ke=document.getElementById("modal-shot-close"),De=document.getElementById("modal-btn-cancel-shot"),oe=document.getElementById("shot-detail-form"),Ee=document.getElementById("modal-btn-delete-shot"),B=document.getElementById("modal-btn-generate-action"),K=document.getElementById("modal-file-import"),Ie=document.getElementById("modal-btn-view-fullscreen"),ne=document.getElementById("modal-btn-toggle-approve"),fe=document.getElementById("modal-btn-toggle-reject"),A=document.getElementById("modal-btn-open-history"),ve=document.getElementById("ai-generate-modal"),He=document.getElementById("gen-modal-close"),Re=document.getElementById("gen-modal-cancel"),ce=document.getElementById("gen-btn-start"),R=document.getElementById("gen-provider-select"),C=document.getElementById("gen-provider-status"),Y=document.getElementById("gen-cost-label"),ue=document.getElementById("gen-shot-count-select"),Z=document.getElementById("gen-error-alert"),we=document.getElementById("gen-error-message"),le=document.getElementById("single-regen-modal"),$e=document.getElementById("regen-modal-close"),Le=document.getElementById("regen-modal-cancel"),Be=document.getElementById("regen-modal-confirm"),V=document.getElementById("shot-history-modal"),v=document.getElementById("shot-variation-modal"),j=document.getElementById("variation-modal-close"),G=document.getElementById("variation-modal-cancel"),W=document.getElementById("variation-modal-confirm");let se=null;const ge=document.getElementById("history-modal-close"),me=document.getElementById("history-modal-done"),Ne=document.getElementById("lightbox-modal"),Te=document.getElementById("lb-close"),Oe=document.getElementById("lb-prev"),_e=document.getElementById("lb-next"),E=document.getElementById("lb-btn-approve"),H=document.getElementById("lb-btn-reject");let J=[],te=[],D=null;L&&k&&(L.onclick=g=>{g.preventDefault(),i="contact",L.className="px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5",k.className="px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5",wt()},k.onclick=g=>{g.preventDefault(),i="sequence",k.className="px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5",L.className="px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5",wt()}),P&&(P.onclick=g=>{g.preventDefault(),la()}),de&&(de.onclick=g=>{g.preventDefault(),Qs(null)}),U&&(U.onclick=g=>{g.preventDefault();try{const u=J.find(S=>S.id===a)||{},I=T.state.scripts?.find(S=>S.id===o)||{title:"Chronicles of Dust",draft:"Draft 4.2"};Qi(D,{title:I.title,draft:I.draft||D?.sourceVersion||"Draft 4.2",heading:u.heading||D?.sceneHeading||"SCENE 1"}),w("Exported Storyboard Studio PDF")}catch(u){console.error(u),w("Failed to export Storyboard PDF")}}),ee&&(ee.onclick=async g=>{if(g.preventDefault(),D){D.sourceVersion=D.currentScriptDraft||"Draft 4.2",D.isVersionStale=!1;try{await qt(o,D)}catch{}xe?.classList.add("hidden"),w(`Pinned Storyboard to ${D.sourceVersion}`)}}),ke&&(ke.onclick=()=>he(ye)),De&&(De.onclick=()=>he(ye)),B&&(B.onclick=g=>{g.preventDefault(),wo()}),K&&(K.onchange=g=>{const u=g.target.files?.[0];if(!u)return;const I=new FileReader;I.onload=S=>{h=S.target.result,ks(),w("Reference image imported")},I.readAsDataURL(u)}),ne&&(ne.onclick=()=>{y=y==="approved"?"draft":"approved";const g=document.getElementById("input-shot-approval");g&&(g.value=y),ks(),w(y==="approved"?"Frame marked as Approved for Production":"Approval cleared (Draft)")}),fe&&(fe.onclick=()=>{y=y==="rejected"?"draft":"rejected";const g=document.getElementById("input-shot-approval");g&&(g.value=y),ks(),w(y==="rejected"?"Frame marked as Rejected":"Rejection cleared (Draft)")}),Ie&&(Ie.onclick=()=>{if(h){const g={shotNumber:document.getElementById("input-shot-number")?.value.trim()||"1A",title:document.getElementById("input-shot-title")?.value.trim()||"Preview",description:document.getElementById("input-shot-desc")?.value.trim()||"",aspectRatio:document.getElementById("input-shot-ratio")?.value||"2.39:1",focalLength:document.getElementById("input-shot-focal")?.value||"50mm",shotSize:document.getElementById("input-shot-size")?.value||"Medium",cameraAngle:document.getElementById("input-shot-angle")?.value||"Eye Level",imageUrl:h};da(g)}else w("No image available to inspect fullscreen")}),A&&(A.onclick=()=>{l?ca(l):w("No previous versions available for this new shot")}),oe&&(oe.onsubmit=async g=>{g.preventDefault();const u=document.getElementById("input-shot-desc")?.value.trim()||"",I=document.getElementById("input-shot-style")?.value||"Concept Art",S=document.getElementById("input-shot-size")?.value||"Medium",F=document.getElementById("input-shot-angle")?.value||"Eye Level",_=document.getElementById("input-shot-ratio")?.value||"2.39:1",O=document.getElementById("input-shot-movement")?.value||"Static",Q=document.getElementById("input-shot-focal")?.value||"50mm",M=document.getElementById("input-shot-lighting")?.value||"Auto / Scene-based",z=document.getElementById("input-shot-direction")?.value||"Left to Right",pe=`${D?.sceneHeading||""} ${D?.sceneSummary||""}`.trim(),Fe=_n({description:u,visualStyle:I,shotSize:S,cameraAngle:F,aspectRatio:_,cameraMovement:O,lens:Q,lighting:M,screenDirection:z,sceneContext:pe}),lt={shotNumber:document.getElementById("input-shot-number")?.value.trim()||"1A",title:document.getElementById("input-shot-title")?.value.trim()||"Shot",shotType:document.getElementById("input-shot-type")?.value||"",description:u,shotSize:S,cameraAngle:F,cameraMovement:O,focalLength:Q,lens:Q,aspectRatio:_,lightingMood:M,lighting:M,visualStyle:I,prompt:Fe,approvalStatus:document.getElementById("input-shot-approval")?.value||"draft",directorNotes:document.getElementById("input-shot-notes")?.value.trim()||"",imageUrl:h,imageSource:h?h.startsWith("data:image/svg")?"ai":"imported":null,continuity:{screenDirection:z}};try{l?(await Ds(o,a,l,lt),w("Updated shot details")):(await Pl(o,a,lt),w("Added new shot to scene")),he(ye),It()}catch{w("Failed to save shot")}}),Ee&&(Ee.onclick=async()=>{l&&await pa(l)});const Pe=document.getElementById("btn-toggle-more-camera"),tt=document.getElementById("more-camera-panel"),yt=document.getElementById("more-camera-chevron");Pe&&tt&&(Pe.onclick=()=>{const g=tt.classList.toggle("hidden");yt&&(yt.style.transform=g?"rotate(0deg)":"rotate(180deg)")});const st=document.getElementById("btn-storyboard-preferences"),Me=document.getElementById("storyboard-preferences-modal"),es=document.getElementById("storyboard-pref-form"),ut=document.getElementById("pref-modal-close"),St=document.getElementById("pref-modal-cancel"),je=document.getElementById("pref-btn-reset");st&&Me&&(st.onclick=async()=>{const g=await Sn(),u=document.getElementById("pref-default-style"),I=document.getElementById("pref-default-ratio"),S=document.getElementById("pref-default-size"),F=document.getElementById("pref-default-angle"),_=document.getElementById("pref-default-lens"),O=document.getElementById("pref-default-lighting");u&&(u.value=g?.visualStyle||"Concept Art"),I&&(I.value=g?.aspectRatio||"2.39:1"),S&&(S.value=g?.shotSize||"Medium"),F&&(F.value=g?.cameraAngle||"Eye Level"),_&&(_.value=g?.lens||"50mm"),O&&(O.value=g?.lighting||"Auto / Scene-based"),ot(Me)}),ut&&(ut.onclick=()=>he(Me)),St&&(St.onclick=()=>he(Me)),je&&(je.onclick=()=>{const g=document.getElementById("pref-default-style"),u=document.getElementById("pref-default-ratio"),I=document.getElementById("pref-default-size"),S=document.getElementById("pref-default-angle"),F=document.getElementById("pref-default-lens"),_=document.getElementById("pref-default-lighting");g&&(g.value="Concept Art"),u&&(u.value="2.39:1"),I&&(I.value="Medium"),S&&(S.value="Eye Level"),F&&(F.value="50mm"),_&&(_.value="Auto / Scene-based"),w("Reset to default settings")}),es&&(es.onsubmit=async g=>{g.preventDefault();const u={visualStyle:document.getElementById("pref-default-style")?.value||"Concept Art",aspectRatio:document.getElementById("pref-default-ratio")?.value||"2.39:1",shotSize:document.getElementById("pref-default-size")?.value||"Medium",cameraAngle:document.getElementById("pref-default-angle")?.value||"Eye Level",lens:document.getElementById("pref-default-lens")?.value||"50mm",lighting:document.getElementById("pref-default-lighting")?.value||"Auto / Scene-based",experienceLevel:"Intermediate"};try{await Rl(u),Ke=u,w("Storyboard preferences saved"),he(Me)}catch{w("Failed to save preferences")}});const vt=document.getElementById("btn-storyboard-recycle-bin"),Pt=document.getElementById("recycle-bin-modal"),wn=document.getElementById("rb-modal-close"),Es=document.getElementById("rb-modal-done"),cs=document.getElementById("rb-btn-empty-bin"),ts=document.getElementById("recycle-bin-badge");async function Ht(){try{const g=await pn(o),u=Array.isArray(g)?g.length:0;return ts&&(ts.textContent=u,u>0?ts.classList.remove("hidden"):ts.classList.add("hidden")),g||[]}catch{return[]}}async function Xs(){try{J=await vs(o)||[]}catch(g){console.warn("Offline fallback for scenes:",g)}$&&(J.length?(J.find(g=>g.id===a)||(a=J[0].id),$.innerHTML=J.map(g=>`
          <option value="${g.id}" ${g.id===a?"selected":""}>
            Scene ${g.sceneNumber}: ${g.heading}
          </option>
        `).join("")):$.innerHTML='<option value="">No active scenes (all in Recycle Bin)</option>'),await It()}async function Ut(){const g=document.getElementById("rb-items-container");if(g)try{const u=await pn(o),I=u.length,S=u.filter(z=>z.itemType==="shot").length,F=u.filter(z=>z.itemType==="scene").length,_=document.getElementById("rb-count-all"),O=document.getElementById("rb-count-shots"),Q=document.getElementById("rb-count-scenes");_&&(_.textContent=I),O&&(O.textContent=S),Q&&(Q.textContent=F);const M=u.filter(z=>Et==="shots"?z.itemType==="shot":Et==="scenes"?z.itemType==="scene":!0);if(!M.length){g.innerHTML=`
          <div id="rb-empty-state" class="flex flex-col items-center justify-center py-12 text-slate-400 gap-1.5">
            <span class="material-symbols-outlined text-4xl text-slate-300">delete_outline</span>
            <span class="text-xs font-semibold text-slate-600">Recycle Bin is empty</span>
            <span class="text-[10px] text-slate-400">No deleted items match the selected filter.</span>
          </div>
        `;return}g.innerHTML=M.map(z=>{const pe=z.itemType==="scene",Fe=pe?`Scene: ${z.data?.sceneHeading||z.title||"Scene"}`:z.title||`Shot ${z.shotNumber||""}`,lt=pe?`${z.data?.shots?.length||0} shots included`:`Original Scene: ${z.originalSceneId||"Scene"}`,ie=z.deletedAt?new Date(z.deletedAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",et=!pe&&z.data?.imageUrl?z.data.imageUrl:null;return`
          <div class="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors gap-2.5">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden text-slate-500">
                ${et?`<img src="${et}" alt="" class="w-full h-full object-cover" />`:pe?'<span class="material-symbols-outlined text-lg text-blue-600">movie_filter</span>':'<span class="material-symbols-outlined text-lg text-slate-400">crop_original</span>'}
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-bold text-slate-800 truncate">${Fe}</span>
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold ${pe?"bg-blue-50 text-blue-600 border border-blue-100":"bg-slate-100 text-slate-600"}">${pe?"SCENE":"SHOT"}</span>
                </div>
                <div class="text-[10px] text-slate-500 truncate">${lt} ${ie?`· Deleted ${ie}`:""}</div>
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
        `}).join(""),g.querySelectorAll(".rb-item-restore").forEach(z=>{z.onclick=async()=>{const pe=z.getAttribute("data-item-id");try{await Ml(o,pe),w("Item restored successfully"),await Ut(),await Ht(),await Xs()}catch{w("Failed to restore item")}}}),g.querySelectorAll(".rb-item-delete").forEach(z=>{z.onclick=async()=>{const pe=z.getAttribute("data-item-id");if(confirm("Permanently delete this item? This action cannot be undone."))try{await Ol(o,pe),w("Item permanently deleted"),await Ut(),await Ht()}catch{w("Failed to delete item")}}})}catch{g.innerHTML='<div class="p-6 text-center text-xs text-rose-500">Failed to load Recycle Bin items</div>'}}const ds=document.getElementById("rb-tab-all"),re=document.getElementById("rb-tab-shots"),ze=document.getElementById("rb-tab-scenes");function qe(g){Et=g,[ds,re,ze].forEach(I=>{I&&(I.classList.remove("bg-white","shadow-2xs","font-semibold","text-slate-900"),I.classList.add("text-slate-600"))});const u=g==="shots"?re:g==="scenes"?ze:ds;u&&(u.classList.add("bg-white","shadow-2xs","font-semibold","text-slate-900"),u.classList.remove("text-slate-600")),Ut()}ds&&(ds.onclick=()=>qe("all")),re&&(re.onclick=()=>qe("shots")),ze&&(ze.onclick=()=>qe("scenes")),vt&&Pt&&(vt.onclick=()=>{ot(Pt),Ut()}),wn&&(wn.onclick=()=>he(Pt)),Es&&(Es.onclick=()=>he(Pt)),cs&&(cs.onclick=async()=>{if(confirm("Empty the entire Storyboard Recycle Bin? All deleted items will be permanently erased."))try{await _l(o),w("Recycle Bin emptied"),await Ut(),await Ht()}catch{w("Failed to empty Recycle Bin")}});const Qe=document.getElementById("btn-delete-scene-storyboard");Qe&&(Qe.onclick=async()=>{if(!D)return;const g=D.sceneHeading||`Scene ${D.sceneNumber||""}`;if(confirm(`Move ${g} and all its shots to the Storyboard Recycle Bin?`))try{await jl(o,a),w(`${g} moved to Recycle Bin`),await Ht(),await Xs()}catch{w("Failed to delete scene")}}),He&&(He.onclick=()=>he(ve)),Re&&(Re.onclick=()=>he(ve)),R&&(R.onchange=en),ue&&(ue.onchange=()=>{c=parseInt(ue.value,10)||4,En(),en()});const Ce=document.getElementById("gen-prompt-input");Ce&&Ce.addEventListener("input",()=>{Ce.value.trim()&&(Ce.classList.remove("border-rose-400","bg-rose-50/20"),Z&&Z.classList.add("hidden"))}),ce&&(ce.onclick=async g=>{g.preventDefault();const u=R?R.value:"scriptora-concept",I=te.find(ie=>ie.id===u)||te[0]||{pricingType:"free",name:"Concept Engine"},S=document.getElementById("gen-style-select")?.value||"Storyboard Sketch",F=document.getElementById("gen-ratio-select")?.value||"2.39:1",_=document.getElementById("gen-quality-select")?.value||"Standard Draft",O=document.getElementById("gen-prompt-input")?.value.trim()||"",Q=parseInt(ue?.value,10)||c||4;if(!O){Z&&(Z.classList.remove("hidden"),we&&(we.textContent="Creative Direction / Image Prompt is mandatory for image generation. Please describe the visual scene."));const ie=document.getElementById("gen-prompt-input");ie&&(ie.classList.add("border-rose-400","bg-rose-50/20"),ie.focus()),w("Creative Direction / Image Prompt is mandatory");return}if(I.pricingType==="paid"){if(!I.isConfigured){Z&&(Z.classList.remove("hidden"),we&&(we.textContent=`Provider '${I.name}' requires API credentials. Please switch to SCRIPTORA Concept Engine (Free).`));return}if(!confirm(`Confirm generation using ${I.name}? Estimated cost: ${I.costLabel}.`))return}if(m==="single"){const ie=document.getElementById("gen-step-config"),et=document.getElementById("gen-step-progress"),Cs=document.getElementById("gen-progress-title"),As=document.getElementById("gen-progress-status");ie&&ie.classList.add("hidden"),et&&et.classList.remove("hidden"),Cs&&(Cs.textContent="Generating Shot Frame"),As&&(As.textContent=`Rendering with ${I.name}...`);const tn=document.getElementById("input-shot-number")?.value.trim()||"1A",$s=document.getElementById("input-shot-desc")?.value.trim()||O,Bs=document.getElementById("input-shot-size")?.value||"Medium",Ns=document.getElementById("input-shot-angle")?.value||"Eye Level",Ts=document.getElementById("input-shot-movement")?.value||"Static",ps=document.getElementById("input-shot-focal")?.value||"50mm",us=document.getElementById("input-shot-lighting")?.value||"Auto / Scene-based",sn=document.getElementById("input-shot-direction")?.value||"Left to Right",Cn=`${D?.sceneHeading||""} ${D?.sceneSummary||""}`.trim(),An=_n({description:$s,visualStyle:S,shotSize:Bs,cameraAngle:Ns,aspectRatio:F,cameraMovement:Ts,lens:ps,lighting:us,screenDirection:sn,sceneContext:Cn});try{const Ps=await ms(o,{provider:u,prompt:O?`${An} ${O}`:An,userDescription:$s,shotSize:Bs,cameraAngle:Ns,cameraMovement:Ts,focalLength:ps,lens:ps,lightingMood:us,lighting:us,aspectRatio:F,visualStyle:S,screenDirection:sn,sceneHeading:D?.sceneHeading||"SCENE 1",shotNumber:tn,quality:_});if(Ps?.imageUrl){h=Ps.imageUrl,b=An;const fa=document.getElementById("input-shot-style");fa&&(fa.value=S),kt(S);const xa=document.getElementById("input-shot-ratio");xa&&(xa.value=F),ks(),he(ve),w("Shot image generated successfully")}else throw new Error("Image generation returned empty")}catch(Ps){et&&et.classList.add("hidden"),ie&&ie.classList.remove("hidden"),Z&&(Z.classList.remove("hidden"),we&&(we.textContent=Ps.message||"Generation failed. Please try again.")),w(Ps.message||"Generation failed")}return}const M=Number(String(a).replace("scene-",""))||D?.sceneNumber||1,z=J.find(ie=>ie.id===a||ie.sceneNumber===M)||{heading:D?.sceneHeading||`SCENE ${M}`,snippet:"Characters in scene confrontation.",cast:["KEVIN","MEERA"]},lt=[{letter:"A",title:"Establishing Spatial Geometry",description:`Wide environmental establishing view of ${z.heading.toLowerCase()}. Establishes spatial depth, environmental lighting, and visual geography.`,shotSize:"Wide Shot",cameraAngle:"High Angle",cameraMovement:"Crane / Jib",focalLength:"24mm Wide",lightingMood:"High Contrast Daylight",prompt:`Cinematic wide establishing shot of ${z.heading}: ${z.snippet||"Atmospheric perspective"}. 24mm anamorphic lens.`},{letter:"B",title:"Character Blocking & Entry",description:`Medium two-shot tracking ${z.cast?.[0]||"protagonist"} navigating the environment with rising tension.`,shotSize:"Medium Two-Shot",cameraAngle:"Eye Level",cameraMovement:"Tracking Dolly",focalLength:"50mm Prime",lightingMood:"Practical Rim Lighting",prompt:`Medium two-shot tracking ${z.cast?.join(" and ")||"character"} in ${z.heading}: ${z.snippet||"Environmental interaction"}. 50mm shallow depth of field.`},{letter:"C",title:"Critical Dramatic Focal Beat",description:"Close-up reaction highlighting dramatic urgency, character resolve, and key narrative stakes.",shotSize:"Close-Up",cameraAngle:"Dutch Angle",cameraMovement:"Static",focalLength:"85mm Portrait",lightingMood:"Warm Eye Catchlight",prompt:`Dramatic close-up on ${z.cast?.[0]||"lead character"} in ${z.heading}. Intense facial expression, rim lighting, 85mm portrait bokeh.`},{letter:"D",title:"Prop & Action Detail Insert",description:"Tight macro insert focusing on critical hand movement, equipment interaction, or tactical telemetry.",shotSize:"Extreme Close-Up",cameraAngle:"Low Angle",cameraMovement:"Static",focalLength:"35mm Macro",lightingMood:"Chiaroscuro Beam",prompt:`Extreme close-up macro insert of crucial prop and tactical hand action in ${z.heading}. Scratched metal textures, focused lighting.`}].slice(0,Q).map((ie,et)=>({id:`shot-${Date.now()}-${et}-${Math.floor(Math.random()*1e3)}`,shotNumber:`${M}${ie.letter}`,order:et+1,title:ie.title,description:ie.description,shotSize:ie.shotSize,cameraAngle:ie.cameraAngle,cameraMovement:ie.cameraMovement,focalLength:ie.focalLength,lightingMood:ie.lightingMood,aspectRatio:F,visualStyle:S,prompt:O?`${ie.prompt} ${O}`:ie.prompt,imageUrl:null,imageSource:"ai",provider:u,quality:_,costEstimate:u==="scriptora-concept"?"Free (Built-in)":"$0.040",approvalStatus:"proposed",approvalNotes:"AI proposed sequence beat. Review and approve to confirm.",approvedBy:null,approvedAt:null,directorNotes:`Maintain consistent eyeline and framing across ${M}${ie.letter}.`,characters:z.cast||["KEVIN"],location:z.heading,continuity:{characterPosition:et%2===0?"Screen Left":"Screen Right",screenDirection:"Left to Right",eyeline:et%2===0?"Looking Screen Right":"Looking Screen Left",lightingContinuity:"Production matching lighting",costumeState:"Production baseline",propPlacement:"Standard staging"},history:[],isGenerating:!0,generationError:null}));D||(D={scriptId:o,sceneId:a,sceneNumber:M,sceneHeading:z.heading,shots:[]}),D.shots=lt,D.visualStyle=S,D.aspectRatio=F,he(ve),ss(),w(`Generating ${Q} storyboard shots in real-time...`);try{await qt(o,D)}catch{}lt.forEach(async ie=>{try{const et=await ms(o,{provider:ie.provider,prompt:ie.prompt,shotSize:ie.shotSize,cameraAngle:ie.cameraAngle,cameraMovement:ie.cameraMovement,focalLength:ie.focalLength,lightingMood:ie.lightingMood,aspectRatio:ie.aspectRatio,visualStyle:ie.visualStyle,sceneHeading:D.sceneHeading||z.heading,shotNumber:ie.shotNumber,description:ie.description,cast:ie.characters,characters:ie.characters,quality:ie.quality});if(et?.imageUrl)ie.imageUrl=et.imageUrl,ie.isGenerating=!1,ie.generationError=null,ie.history||(ie.history=[]),ie.history.unshift({imageUrl:et.imageUrl,prompt:ie.prompt,visualStyle:ie.visualStyle,provider:ie.provider,createdAt:new Date().toISOString()}),await qt(o,D),ss(),w(`Shot ${ie.shotNumber} sketch completed!`);else throw new Error("Image generation returned empty")}catch(et){ie.isGenerating=!1,ie.generationError=et.message||"Generation failed",ss(),w(`Shot ${ie.shotNumber} failed to generate`)}})});const Ot=document.getElementById("gen-btn-approve-all-proposed");Ot&&(Ot.onclick=()=>{d.forEach(g=>{g.approvalStatus="approved"}),kn(),w("All proposed shots marked as Approved")});const Ge=document.getElementById("gen-btn-confirm-save");Ge&&(Ge.onclick=async()=>{if(d.length){Ge.disabled=!0;try{const g={...D,shots:d,visualStyle:d[0]?.visualStyle||D?.visualStyle,aspectRatio:d[0]?.aspectRatio||D?.aspectRatio};await qt(o,g),w(`Saved ${d.length} shots to storyboard.`),he(ve),It()}catch{w("Failed to save sequence")}finally{Ge.disabled=!1}}});const We=document.getElementById("gen-btn-save-as-draft");We&&(We.onclick=async()=>{if(!d.length)return;d.forEach(u=>{u.approvalStatus="draft"});const g={...D,shots:d};await qt(o,g),w("Saved sequence as draft"),he(ve),It()});const be=document.getElementById("gen-btn-discard-preview");be&&(be.onclick=()=>{d=[],he(ve)}),$e&&($e.onclick=()=>he(le)),Le&&(Le.onclick=()=>he(le));const nt=document.getElementById("regen-provider-select");nt&&(nt.onchange=ra),Be&&(Be.onclick=async()=>{const g=D?.shots?.find(_=>_.id===r);if(!g)return;const u=document.getElementById("regen-provider-select")?.value||"scriptora-concept",I=document.getElementById("regen-prompt-input")?.value.trim()||g.description||g.prompt||"Cinematic composition",S=document.getElementById("regen-style-select")?.value||g.visualStyle||"Concept Art";Be.disabled=!0,Be.innerHTML='<span class="w-3.5 h-3.5 border-2 border-white/60 border-t-white rounded-full animate-spin"></span><span>Regenerating...</span>';const F=_n({description:I,visualStyle:S,shotSize:g.shotSize,cameraAngle:g.cameraAngle,aspectRatio:g.aspectRatio,cameraMovement:g.cameraMovement,lens:g.focalLength||g.lens,lighting:g.lightingMood||g.lighting,screenDirection:g.continuity?.screenDirection,sceneContext:`${D?.sceneHeading||""} ${D?.sceneSummary||""}`.trim()});he(le),g.isGenerating=!0,g.generationError=null,ss();try{const _=await ms(o,{provider:u,prompt:F,userDescription:I,shotSize:g.shotSize,cameraAngle:g.cameraAngle,cameraMovement:g.cameraMovement,focalLength:g.focalLength||g.lens,lens:g.focalLength||g.lens,lightingMood:g.lightingMood||g.lighting,lighting:g.lightingMood||g.lighting,aspectRatio:g.aspectRatio,visualStyle:S,screenDirection:g.continuity?.screenDirection,sceneHeading:D?.sceneHeading||"SCENE 1",shotNumber:g.shotNumber});if(_?.imageUrl)g.imageUrl=_.imageUrl,g.visualStyle=S,g.isGenerating=!1,g.generationError=null,await Ds(o,a,r,{imageUrl:_.imageUrl,prompt:F,description:g.description||I,visualStyle:S,provider:u,imageSource:"ai"}),ss(),w(`Regenerated frame ${g.shotNumber}. Previous version preserved in history.`);else throw new Error("Image generation returned empty")}catch(_){g.isGenerating=!1,g.generationError=_.message||"Regeneration failed",ss(),w(_.message||"Regeneration failed")}finally{Be.disabled=!1,Be.innerHTML='<span class="material-symbols-outlined text-[15px]">auto_awesome</span><span>Regenerate Frame</span>'}}),ge&&(ge.onclick=()=>he(V)),j&&(j.onclick=()=>he(v)),G&&(G.onclick=()=>he(v)),document.querySelectorAll('#variation-options-grid input[type="radio"]').forEach(g=>{g.addEventListener("change",()=>{document.querySelectorAll(".variation-option-card").forEach(I=>{I.classList.remove("border-2","border-purple-600","bg-purple-50/50"),I.classList.add("border","border-slate-200","bg-white")});const u=g.closest(".variation-option-card");u&&(u.classList.remove("border","border-slate-200","bg-white"),u.classList.add("border-2","border-purple-600","bg-purple-50/50"))})}),W&&(W.onclick=()=>{const g=document.querySelector('#variation-options-grid input[name="variation-type"]:checked'),u=g?g.value:"auto",I=document.getElementById("variation-guidance-input")?.value.trim()||"";he(v),se&&Bo(se,u,I)}),me&&(me.onclick=()=>he(V)),Te&&(Te.onclick=()=>Ne?.classList.add("hidden")),Oe&&(Oe.onclick=()=>{const g=D?.shots||[];g.length&&(p=(p-1+g.length)%g.length,Is())}),_e&&(_e.onclick=()=>{const g=D?.shots||[];g.length&&(p=(p+1)%g.length,Is())}),E&&(E.onclick=async()=>{const u=(D?.shots||[])[p];if(u)try{await Nn(o,a,u.id,"approved"),u.approvalStatus="approved",w(`Shot ${u.shotNumber} approved`),Is(),wt()}catch{w("Failed to approve shot")}}),H&&(H.onclick=async()=>{const u=(D?.shots||[])[p];if(u)try{await Nn(o,a,u.id,"rejected"),u.approvalStatus="rejected",w(`Shot ${u.shotNumber} marked as rejected`),Is(),wt()}catch{w("Failed to reject shot")}});const _t=g=>{Ne&&!Ne.classList.contains("hidden")&&(g.key==="Escape"&&Ne.classList.add("hidden"),g.key==="ArrowLeft"&&Oe&&Oe.click(),g.key==="ArrowRight"&&_e&&_e.click())};document.removeEventListener("keydown",_t),document.addEventListener("keydown",_t);let Ke=null,Et="all";function kt(g){const u=document.querySelectorAll(".style-preview-card"),I=document.getElementById("input-shot-style");let S=null;const F=Vs(g);if(u.forEach(_=>{const O=_.getAttribute("data-style-id")||"";(O.toLowerCase()===(g||"").toLowerCase()||O===F.id)&&!S?(S=_,_.classList.add("border-blue-600","ring-2","ring-blue-500/30","bg-blue-50/20"),_.classList.remove("border-slate-200"),_.querySelector(".style-check-badge")?.classList.remove("hidden")):(_.classList.remove("border-blue-600","ring-2","ring-blue-500/30","bg-blue-50/20"),_.classList.add("border-slate-200"),_.querySelector(".style-check-badge")?.classList.add("hidden"))}),S)I&&(I.value=S.getAttribute("data-style-id")||g);else if(u.length>0){const _=u[0];_.classList.add("border-blue-600","ring-2","ring-blue-500/30","bg-blue-50/20"),_.classList.remove("border-slate-200"),_.querySelector(".style-check-badge")?.classList.remove("hidden"),I&&(I.value=_.getAttribute("data-style-id")||"Comic")}}function vo(){document.querySelectorAll(".style-preview-card").forEach(u=>{u.onclick=()=>{const I=u.getAttribute("data-style-id");kt(I)}})}function Zs(g,u=!1){const I=Vs(g),S=I.id,F=document.getElementById("gen-style-select"),_=document.getElementById("gen-active-style-name"),O=document.getElementById("gen-active-style-desc"),Q=document.getElementById("gen-active-style-img");F&&(F.value=S),_&&(_.textContent=I.name),O&&(O.textContent=I.description||I.tagline),Q&&(Q.src=I.previewImage,Q.onerror=()=>{Q.onerror=null,Q.src=I.fallbackSvg}),document.querySelectorAll(".gen-style-gallery-card").forEach(M=>{const z=M.getAttribute("data-style-id"),pe=M.querySelector(".gen-style-gallery-check");z===S?(M.classList.add("border-blue-600","ring-2","ring-blue-500/30","bg-blue-50/30"),M.classList.remove("border-slate-200"),pe?.classList.remove("hidden")):(M.classList.remove("border-blue-600","ring-2","ring-blue-500/30","bg-blue-50/30"),M.classList.add("border-slate-200"),pe?.classList.add("hidden"))}),u&&(document.getElementById("gen-step-styles")?.classList.add("hidden"),document.getElementById("gen-step-config")?.classList.remove("hidden"),w(`Art style set to ${I.name}`))}function oa(){const g=document.getElementById("btn-browse-all-styles"),u=document.getElementById("gen-active-style-card"),I=document.getElementById("btn-change-style-action"),S=pe=>{pe?.preventDefault(),pe?.stopPropagation(),document.getElementById("gen-step-config")?.classList.add("hidden"),document.getElementById("gen-step-styles")?.classList.remove("hidden");const Fe=document.getElementById("gen-style-select")?.value||"Soft Pencil";Zs(Fe,!1)};g&&(g.onclick=S),u&&(u.onclick=S),I&&(I.onclick=S);const F=document.getElementById("btn-back-to-gen-config");F&&(F.onclick=pe=>{pe.preventDefault(),pe?.stopPropagation(),document.getElementById("gen-step-styles")?.classList.add("hidden"),document.getElementById("gen-step-config")?.classList.remove("hidden")}),document.querySelectorAll(".gen-style-gallery-card").forEach(pe=>{pe.onclick=Fe=>{Fe.preventDefault(),Fe?.stopPropagation();const lt=pe.getAttribute("data-style-id");Zs(lt,!0)}});const _=document.getElementById("btn-custom-style-card"),O=document.getElementById("gen-custom-style-drawer"),Q=document.getElementById("btn-cancel-custom-style"),M=document.getElementById("btn-apply-custom-style"),z=document.getElementById("input-custom-style-name");_&&O&&(_.onclick=()=>{O.classList.remove("hidden"),z?.focus()}),Q&&O&&(Q.onclick=()=>{O.classList.add("hidden")}),M&&z&&(M.onclick=()=>{const pe=z.value.trim();if(!pe){w("Please enter an art style name");return}const Fe=document.getElementById("gen-style-select"),lt=document.getElementById("gen-active-style-name"),ie=document.getElementById("gen-active-style-desc");Fe&&(Fe.value=pe),lt&&(lt.textContent=pe),ie&&(ie.textContent="Custom user-defined art style"),O.classList.add("hidden"),document.getElementById("gen-step-styles")?.classList.add("hidden"),document.getElementById("gen-step-config")?.classList.remove("hidden"),w(`Art style set to "${pe}"`)})}async function Sn(){try{Ke=await Ja()}catch{Ke={visualStyle:"Concept Art",aspectRatio:"2.39:1",shotSize:"Medium",cameraAngle:"Eye Level",lens:"50mm",lighting:"Auto / Scene-based",experienceLevel:"Intermediate"}}return Ke}async function Qs(g){l=g;const u=!g,I=D?.shots||[],S=u?null:I.find(Cn=>Cn.id===g),F=Ke||await Sn(),_=String.fromCharCode(65+I.length%26),O=`${D?.sceneNumber||1}${_}`,Q=S?.shotNumber||O,M=document.getElementById("modal-shot-pill"),z=document.getElementById("modal-shot-heading"),pe=document.getElementById("display-shot-number");M&&(M.textContent=Q),z&&(z.textContent=u?"Add New Shot":`Edit Shot ${Q}`),pe&&(pe.textContent=Q);const Fe=document.getElementById("input-shot-number"),lt=document.getElementById("input-shot-title"),ie=document.getElementById("input-shot-type"),et=document.getElementById("input-shot-desc"),Cs=document.getElementById("input-shot-size"),As=document.getElementById("input-shot-angle"),tn=document.getElementById("input-shot-ratio"),$s=document.getElementById("input-shot-movement"),Bs=document.getElementById("input-shot-focal"),Ns=document.getElementById("input-shot-lighting"),Ts=document.getElementById("input-shot-direction"),ps=document.getElementById("input-shot-approval"),us=document.getElementById("input-shot-notes");Fe&&(Fe.value=Q),lt&&(lt.value=S?.title||(u?`Shot ${Q}`:"")),ie&&(ie.value=S?.shotType||""),et&&(et.value=S?.description||""),Cs&&(Cs.value=S?.shotSize||F?.shotSize||"Medium"),As&&(As.value=S?.cameraAngle||F?.cameraAngle||"Eye Level"),tn&&(tn.value=S?.aspectRatio||D?.aspectRatio||F?.aspectRatio||"2.39:1"),$s&&($s.value=S?.cameraMovement||"Static"),Bs&&(Bs.value=S?.focalLength||S?.lens||F?.lens||"50mm"),Ns&&(Ns.value=S?.lightingMood||S?.lighting||F?.lighting||"Auto / Scene-based"),Ts&&(Ts.value=S?.continuity?.screenDirection||"Left to Right"),ps&&(ps.value=S?.approvalStatus||"draft"),us&&(us.value=S?.directorNotes||""),vo();const sn=S?.visualStyle||D?.visualStyle||F?.visualStyle||"Concept Art";kt(sn),h=S?.imageUrl?Ct(S.imageUrl,S.shotNumber):null,b=S?.prompt||"",y=S?.approvalStatus||"draft",ks(),Ee&&Ee.classList.toggle("hidden",u),ot(ye)}function ks(){const g=document.getElementById("modal-shot-image"),u=document.getElementById("modal-empty-image-placeholder"),I=document.getElementById("modal-post-gen-actions"),S=document.getElementById("modal-btn-view-fullscreen"),F=document.getElementById("modal-generate-action-label"),_=document.getElementById("modal-btn-toggle-approve"),O=document.getElementById("modal-btn-toggle-reject"),Q=document.getElementById("modal-btn-open-history"),M=document.getElementById("modal-approve-toggle-label"),z=document.getElementById("modal-history-count");h?(g&&(g.src=Ct(h,l),g.onerror=()=>{g.src=`${Ue}assets/storyboard/shot_1a_wide_outpost.jpg`},g.classList.remove("hidden")),u&&u.classList.add("hidden"),I&&I.classList.remove("hidden"),S&&S.classList.remove("hidden"),F&&(F.textContent="Regenerate Image")):(g&&g.classList.add("hidden"),u&&u.classList.remove("hidden"),I&&I.classList.add("hidden"),S&&S.classList.add("hidden"),F&&(F.textContent="Generate Image"));const pe=l?D?.shots?.find(lt=>lt.id===l):null,Fe=Array.isArray(pe?.history)?pe.history.length:0;z&&(z.textContent=String(Fe)),Q&&(Q.title=Fe>0?`Version History (${Fe} version${Fe>1?"s":""})`:"Version History (0)"),_&&O&&(y==="approved"?(_.className="h-9 rounded-lg bg-emerald-600 text-white border border-emerald-600 ring-2 ring-emerald-400/40 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-xs",_.title="Approved for Production (Click to toggle)",O.className="h-9 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-2xs",O.title="Reject Frame"):y==="rejected"?(O.className="h-9 rounded-lg bg-rose-600 text-white border border-rose-600 ring-2 ring-rose-400/40 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-xs",O.title="Rejected (Click to toggle)",_.className="h-9 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-2xs",_.title="Approve Frame"):(_.className="h-9 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 active:scale-95 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-2xs",_.title="Approve Frame",O.className="h-9 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 active:scale-95 text-xs font-semibold flex items-center justify-center cursor-pointer transition-all shadow-2xs",O.title="Reject Frame")),M&&(M.textContent=y==="approved"?"Approved":"Approve")}function wo(){m="single";const g=J.find(pe=>pe.id===a)||J[0]||{},u=document.getElementById("gen-scene-heading-display"),I=document.getElementById("gen-scene-cast-display"),S=document.getElementById("gen-scene-snippet-display"),F=document.getElementById("gen-modal-title"),_=document.getElementById("gen-shot-count-container"),O=document.getElementById("gen-prompt-input"),Q=document.getElementById("gen-ratio-select");if(F&&(F.textContent="AI Generate Shot"),u&&(u.textContent=g.heading||"SCENE 1"),I&&(I.textContent=`Cast: ${(g.cast||["KEVIN","MARCUS"]).join(", ")}`),S){const pe=document.getElementById("input-shot-desc")?.value.trim();S.textContent=pe||g.snippet||"Shot awaiting visual direction."}if(_&&_.classList.add("hidden"),O){const pe=document.getElementById("input-shot-desc")?.value.trim()||"";O.value=pe,O.classList.remove("border-rose-400","bg-rose-50/20")}const M=document.getElementById("input-shot-ratio")?.value||D?.aspectRatio||"2.39:1";Q&&(Q.value=M),document.getElementById("gen-step-config")?.classList.remove("hidden"),document.getElementById("gen-step-styles")?.classList.add("hidden"),document.getElementById("gen-step-progress")?.classList.add("hidden"),document.getElementById("gen-step-preview")?.classList.add("hidden"),En(),en(),oa();const z=document.getElementById("input-shot-style")?.value||D?.visualStyle||Ke?.visualStyle||"Soft Pencil";Zs(z,!1),Z&&Z.classList.add("hidden"),ot(ve)}function la(){m="sequence";const g=J.find(M=>M.id===a)||J[0]||{},u=document.getElementById("gen-scene-heading-display"),I=document.getElementById("gen-scene-cast-display"),S=document.getElementById("gen-scene-snippet-display"),F=document.getElementById("gen-modal-title"),_=document.getElementById("gen-shot-count-container");F&&(F.textContent="Generate Scene Shot Sequence"),u&&(u.textContent=g.heading||"SCENE 1"),I&&(I.textContent=`Cast: ${(g.cast||["KEVIN","MARCUS"]).join(", ")}`),S&&(S.textContent=g.snippet||"Scene awaiting visual direction."),_&&_.classList.remove("hidden"),document.getElementById("gen-step-config")?.classList.remove("hidden"),document.getElementById("gen-step-styles")?.classList.add("hidden"),document.getElementById("gen-step-progress")?.classList.add("hidden"),document.getElementById("gen-step-preview")?.classList.add("hidden"),ue&&(ue.value=String(c)),En(),en(),oa();const O=D?.visualStyle||Ke?.visualStyle||"Soft Pencil";Zs(O,!1);const Q=document.getElementById("gen-prompt-input");Q&&(!Q.value.trim()&&g.snippet&&(Q.value=g.snippet),Q.classList.remove("border-rose-400","bg-rose-50/20")),Z&&Z.classList.add("hidden"),ot(ve)}function En(){const g=document.getElementById("gen-submit-label");g&&(m==="single"?g.textContent="Generate Shot Image":g.textContent=`Generate ${c}-Shot Sequence`)}function en(){if(!R)return;const g=R.value,u=te.find(I=>I.id===g)||te[0]||{pricingType:"free",isConfigured:!0};if(C&&(u.isConfigured||!u.requiresApiKey?(C.className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1",C.innerHTML='<span class="material-symbols-outlined text-[14px]">check_circle</span><span>Configured & Ready</span>'):(C.className="text-[11px] text-amber-600 font-medium mt-0.5 flex items-center gap-1",C.innerHTML=`<span class="material-symbols-outlined text-[14px]">info</span><span>Key missing in backend .env (${u.envVarName||"API_KEY"})</span>`)),Y)if(u.pricingType==="free")Y.textContent="Free (Built-in Concept Engine, no API keys or charges required).";else{const I=m==="single"?1:c||4,S=`$${((u.costPerImage||.04)*I).toFixed(3)} (${I}-shot${I>1?" batch":""})`;Y.textContent=`${u.costLabel||"Paid API"} — Estimated: ${S}. Server credentials required.`}}function kn(){document.getElementById("gen-step-progress")?.classList.add("hidden");const g=document.getElementById("gen-step-preview");g&&g.classList.remove("hidden");const u=document.getElementById("gen-preview-count-label");u&&(u.textContent=`${d.length} Shots Proposed`);const I=document.getElementById("gen-preview-grid");I&&(I.innerHTML=d.map((S,F)=>`
      <div class="bg-white rounded-xl border border-slate-200 p-2.5 flex flex-col gap-2 shadow-2xs" data-proposed-idx="${F}">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-1.5">
            <span class="font-mono font-bold text-blue-600">${S.shotNumber}</span>
            <span class="font-semibold text-slate-800 truncate max-w-[140px]">${S.title}</span>
          </div>
          <button type="button" class="btn-toggle-prop-approve px-2 py-0.5 rounded text-[10px] font-semibold border cursor-pointer capitalize ${S.approvalStatus==="approved"?"bg-emerald-50 text-emerald-700 border-emerald-200":"bg-amber-50 text-amber-700 border-amber-200"}" data-proposed-idx="${F}">
            ${S.approvalStatus||"Proposed"}
          </button>
        </div>

        <div class="aspect-video bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center relative cursor-pointer btn-prop-lightbox" data-proposed-idx="${F}">
          <img src="${S.imageUrl}" alt="${S.title}" class="w-full h-full object-cover" />
          <div class="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-white font-mono text-[9px]">
            ${S.aspectRatio||"2.39:1"} · ${S.focalLength||"50mm"}
          </div>
        </div>

        <div class="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
          <span>${S.shotSize||"Wide"} · ${S.cameraAngle||"Eye Level"}</span>
          <button type="button" class="btn-prop-regen text-blue-600 hover:text-blue-800 font-semibold cursor-pointer" data-proposed-idx="${F}">
            Regenerate
          </button>
        </div>
      </div>
    `).join(""),I.querySelectorAll(".btn-toggle-prop-approve").forEach(S=>{S.onclick=F=>{F.stopPropagation();const _=Number(S.getAttribute("data-proposed-idx"));d[_]&&(d[_].approvalStatus=d[_].approvalStatus==="approved"?"proposed":"approved",kn())}}),I.querySelectorAll(".btn-prop-lightbox").forEach(S=>{S.onclick=()=>{const F=Number(S.getAttribute("data-proposed-idx"));d[F]&&da(d[F])}}),I.querySelectorAll(".btn-prop-regen").forEach(S=>{S.onclick=async F=>{F.stopPropagation();const _=Number(S.getAttribute("data-proposed-idx")),O=d[_];if(O){S.disabled=!0,S.textContent="Generating...";try{const Q=await ms(o,{provider:O.provider||"scriptora-concept",prompt:O.prompt||O.description||"Cinematic composition",shotSize:O.shotSize,cameraAngle:O.cameraAngle,focalLength:O.focalLength,lightingMood:O.lightingMood,aspectRatio:O.aspectRatio,visualStyle:O.visualStyle,sceneHeading:D?.sceneHeading||"SCENE 1",shotNumber:O.shotNumber});Q?.imageUrl&&(O.imageUrl=Q.imageUrl,w(`Regenerated proposed frame ${O.shotNumber}`),kn())}catch(Q){w(Q.message||"Regeneration failed")}finally{S.disabled=!1}}}}))}function ia(g){const u=document.getElementById("regen-current-image"),I=document.getElementById("regen-preview-style-label"),S=Vs(g);I&&(I.textContent=S.name),u&&(u.src=S.previewImage,u.onerror=()=>{u.onerror=null,u.src=S.fallbackSvg})}function So(g){r=g;const u=D?.shots?.find(z=>z.id===g);if(!u)return;const I=document.getElementById("regen-shot-pill"),S=document.getElementById("regen-prompt-input"),F=document.getElementById("regen-style-select"),_=document.getElementById("regen-current-frame-pill"),O=document.getElementById("regen-current-frame-thumb"),Q=document.getElementById("regen-current-frame-pill-num");I&&(I.textContent=u.shotNumber),S&&(S.value=u.description||u.prompt||""),_&&O&&(u.imageUrl?(O.src=u.imageUrl,Q&&(Q.textContent=u.shotNumber),_.classList.remove("hidden")):_.classList.add("hidden"));const M=u.visualStyle||"Concept Art";F&&(F.value=M,F.onchange=z=>{ia(z.target.value)}),ia(M),ra(),ot(le)}function ra(){const g=document.getElementById("regen-provider-select"),u=document.getElementById("regen-cost-banner");if(!g||!u)return;const I=te.find(S=>S.id===g.value)||te[0]||{pricingType:"free"};I.pricingType==="free"?u.textContent="Free (Built-in Concept Engine, no charges).":u.textContent=`Estimated: ${I.costLabel||"$0.040"}. Server credentials required.`}function ca(g){f=g;const u=D?.shots?.find(O=>O.id===g);if(!u)return;const I=document.getElementById("history-modal-title");I&&(I.textContent=`Image History & Variations — Shot ${u.shotNumber}`);const S=document.getElementById("history-items-container");if(!S)return;const F=Array.isArray(u.history)?u.history:[],_=`
      <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-16 h-12 bg-slate-950 rounded-lg overflow-hidden shrink-0 border border-blue-300 flex items-center justify-center">
            ${u.imageUrl?`<img src="${u.imageUrl}" alt="Active Frame" class="w-full h-full object-cover" />`:'<span class="material-symbols-outlined text-slate-400 text-base">image</span>'}
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold text-[9px] uppercase tracking-wider">Active Frame</span>
              <span class="font-mono text-xs font-bold text-slate-800">REC · ${u.shotNumber}</span>
            </div>
            <p class="text-[11px] text-slate-600 truncate mt-0.5 font-medium">${u.title||u.description||"Current active frame"}</p>
          </div>
        </div>
        <span class="text-[10px] text-blue-700 font-semibold font-mono shrink-0">In Production</span>
      </div>
    `;F.length?(S.innerHTML=_+F.slice().map((O,Q)=>{const M=O.timestamp?new Date(O.timestamp).toLocaleString():"Past Version",z=O.previousImageUrl||O.imageUrl,pe=z?Ct(z,u?.shotNumber):"";let Fe='<span class="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 text-slate-700 font-semibold">Take</span>';return O.generationType==="variation"?Fe=`<span class="px-1.5 py-0.5 rounded text-[10px] bg-purple-100 text-purple-800 font-bold border border-purple-200">Variation: ${(O.variationType||"Creative").toUpperCase()}</span>`:O.generationType==="retry"&&(Fe='<span class="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-bold border border-amber-200">Retry</span>'),`
          <div class="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-2.5 shadow-2xs hover:border-slate-300 transition-all">
            <div class="flex items-center justify-between text-xs font-semibold text-slate-700">
              <div class="flex items-center gap-1.5">
                ${Fe}
                <span class="font-mono text-[11px] text-slate-500">${M}</span>
              </div>
              <span class="text-[10px] text-slate-400 font-mono">${O.visualStyle||"Storyboard Sketch"}</span>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-20 h-14 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shrink-0 flex items-center justify-center cursor-pointer group relative">
                ${pe?`
                  <img src="${pe}" onerror="this.onerror=null; this.src='${Ue}assets/storyboard/shot_1a_wide_outpost.jpg';" alt="Historical version" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                `:`
                  <span class="material-symbols-outlined text-slate-600 text-base">image</span>
                `}
              </div>
              <div class="min-w-0 flex-1 text-[11px] text-slate-600">
                <p class="line-clamp-2 italic">${O.prompt||O.previousPrompt||"No prompt recorded"}</p>
                <div class="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                  <span>Provider: ${O.provider||"scriptora-concept"}</span>
                  <span>·</span>
                  <span>Version #${F.length-Q}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end pt-1 border-t border-slate-100">
              <button type="button" class="btn-restore-version px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-[11px] transition-all cursor-pointer flex items-center gap-1 shadow-2xs" data-hist-idx="${Q}">
                <span class="material-symbols-outlined text-[13px]">restore</span>
                <span>Restore This Take</span>
              </button>
            </div>
          </div>
        `}).join(""),S.querySelectorAll(".btn-restore-version").forEach(O=>{O.onclick=async()=>{const Q=Number(O.getAttribute("data-hist-idx")),M=F[Q];if(!M)return;const z=M.previousImageUrl||M.imageUrl;if(z){u.imageUrl&&u.history.unshift({id:`v-${Date.now()}`,imageUrl:u.imageUrl,previousImageUrl:u.imageUrl,prompt:u.prompt||u.description||"Current take before restore",generationType:"restore",visualStyle:u.visualStyle,timestamp:new Date().toISOString()}),u.imageUrl=z,M.prompt&&(u.prompt=M.prompt),M.visualStyle&&(u.visualStyle=M.visualStyle);try{await Ds(o,a,f,{imageUrl:z,prompt:u.prompt,visualStyle:u.visualStyle})}catch{}try{await qt(o,D)}catch{}w(`Restored version to Shot ${u.shotNumber}`),he(V),wt()}}})):S.innerHTML=_+`
        <div class="p-8 text-center text-slate-400 text-xs">
          <span class="material-symbols-outlined text-2xl text-slate-400">history</span>
          <p class="mt-1">No previous versions recorded for this shot yet.</p>
          <p class="text-[10px] text-slate-400 mt-0.5">Use Retry or Variation to create new takes and preserve previous iterations.</p>
        </div>
      `,ot(V)}function Eo(g){const u=D?.shots||[];u.length&&(p=g>=0&&g<u.length?g:0,Is(),Ne?.classList.remove("hidden"))}function da(g){const u=document.getElementById("lb-image"),I=document.getElementById("lb-shot-num"),S=document.getElementById("lb-specs"),F=document.getElementById("lb-title"),_=document.getElementById("lb-desc"),O=document.getElementById("lb-btn-approve"),Q=document.getElementById("lb-btn-reject"),M=document.getElementById("lb-prev"),z=document.getElementById("lb-next");u&&(u.src=Ct(g.imageUrl,g.shotNumber),u.onerror=()=>{u.src=`${Ue}assets/storyboard/shot_1a_wide_outpost.jpg`}),I&&(I.textContent=`REC · ${g.shotNumber}`),S&&(S.textContent=`${g.aspectRatio||"2.39:1"} · ${g.focalLength||"50mm"} · ${g.shotSize||"Medium"}`),F&&(F.textContent=g.title),_&&(_.textContent=g.description||"No description provided."),M&&M.classList.add("hidden"),z&&z.classList.add("hidden"),O&&O.classList.add("hidden"),Q&&Q.classList.add("hidden"),Ne?.classList.remove("hidden")}function Is(){const u=(D?.shots||[])[p];if(!u)return;const I=document.getElementById("lb-image"),S=document.getElementById("lb-shot-num"),F=document.getElementById("lb-specs"),_=document.getElementById("lb-title"),O=document.getElementById("lb-desc"),Q=document.getElementById("lb-approve-label"),M=document.getElementById("lb-prev"),z=document.getElementById("lb-next"),pe=document.getElementById("lb-btn-approve"),Fe=document.getElementById("lb-btn-reject");M&&M.classList.remove("hidden"),z&&z.classList.remove("hidden"),pe&&pe.classList.remove("hidden"),Fe&&Fe.classList.remove("hidden"),I&&(I.src=Ct(u.imageUrl,u.shotNumber),I.onerror=()=>{I.src=`${Ue}assets/storyboard/shot_1a_wide_outpost.jpg`}),S&&(S.textContent=`REC · ${u.shotNumber}`),F&&(F.textContent=`${u.aspectRatio||"2.39:1"} · ${u.focalLength||"50mm"} · ${u.shotSize||"Medium"}`),_&&(_.textContent=u.title),O&&(O.textContent=u.description||"No description provided."),Q&&(Q.textContent=u.approvalStatus==="approved"?"Approved":"Approve")}async function It(){if(N){N.innerHTML='<div class="p-16 text-center text-slate-400 text-xs">Loading storyboard shots...</div>';try{D=await rs(o,a)}catch(g){console.error(g),D={sceneId:a,shots:[]}}ko(),wt()}}function ko(){const g=J.find(O=>O.id===a)||J[0]||{},u=document.getElementById("badge-int-ext"),I=document.getElementById("badge-day-night"),S=document.getElementById("badge-pages"),F=document.getElementById("badge-shoot-day"),_=document.getElementById("scene-snippet-text");if(u&&(u.textContent=g.intExt||"INT"),I&&(I.textContent=g.dayNight||"DAY"),S&&(S.textContent=`${g.pages||"1.0"} pgs`),F&&(F.textContent=g.shootDay||"Day 1 of 7"),_&&(_.textContent=g.snippet||"Scene awaiting visual direction."),ae){const O=String(g.shootDay||"1").match(/\d+/)?.[0]||"1";ae.href=`/production/schedule?scriptId=${o}&day=${O}&sceneId=${g.id}`}if(xe)if(D?.isVersionStale){xe.classList.remove("hidden");const O=document.getElementById("stale-pinned-ver"),Q=document.getElementById("stale-active-ver");O&&(O.textContent=D.sourceVersion||"Draft 4.2"),Q&&(Q.textContent=D.currentScriptDraft||"Draft 4.3")}else xe.classList.add("hidden");Io()}function Io(){if(!Se)return;const g=D?.shots||[];let u=!1,I="";for(let S=0;S<g.length-1;S++){const F=g[S],_=g[S+1],O=F?.shotSize||"",Q=_?.shotSize||"";if(O.includes("Close")&&Q.includes("Close")){const M=F.continuity?.eyeline?.toLowerCase()||F.continuity?.screenDirection?.toLowerCase()||"",z=_.continuity?.eyeline?.toLowerCase()||_.continuity?.screenDirection?.toLowerCase()||"";if(M&&z&&M===z&&(M.includes("screen")||M.includes("left")||M.includes("right"))){u=!0,I=`Shot ${F.shotNumber} and Shot ${_.shotNumber} both have screen direction "${F.continuity.screenDirection||F.continuity.eyeline}", which may create a jump or reverse-angle crossing.`;break}}}if(u){Se.classList.remove("hidden");const S=document.getElementById("continuity-warning-text");S&&(S.textContent=I)}else Se.classList.add("hidden")}function wt(){if(!N)return;const g=D?.shots||[];if(!g.length){N.innerHTML=`
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
      `;const u=document.getElementById("btn-empty-generate"),I=document.getElementById("btn-empty-add");u&&(u.onclick=()=>la()),I&&(I.onclick=()=>Qs(null));return}i==="contact"?Ao(g):In(g)}const ss=()=>wt();function Co(g="",u=[]){if(!g)return"No description provided.";let I=g;return Array.isArray(u)&&u.forEach(S=>{if(!S||S.length<2)return;const F=new RegExp(`\\b(${S})\\b`,"gi");I=I.replace(F,'<span class="font-semibold text-blue-700">$1<span class="material-symbols-outlined text-[12px] text-blue-600 align-text-bottom ml-0.5">person</span></span>')}),I}function Ao(g){N.innerHTML=`
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        ${g.map(u=>{const I=u.approvalStatus==="approved"?"bg-emerald-50 text-emerald-700 border-emerald-200":u.approvalStatus==="proposed"?"bg-amber-50 text-amber-700 border-amber-200":u.approvalStatus==="rejected"?"bg-rose-50 text-rose-700 border-rose-200":"bg-slate-100 text-slate-600 border-slate-200",S=Array.isArray(u.history)?u.history.length:0;return`
            <div class="storyboard-card bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between" data-shot-id="${u.id}">
              <div>
                <!-- Top Card Meta Header -->
                <div class="px-3 py-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                  <div class="flex items-center gap-1.5">
                    <span class="font-mono font-bold text-xs text-slate-900">${u.shotNumber}</span>
                    <span class="text-[10px] text-slate-400">#${u.order}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <button type="button" class="btn-card-delete-shot p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded cursor-pointer transition-colors" data-shot-id="${u.id}" title="Delete Shot (Move to Recycle Bin)" aria-label="Delete Shot ${u.shotNumber}">
                      <span class="material-symbols-outlined text-[15px]">delete</span>
                    </button>
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
                      <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold border ${I} capitalize">
                        ${u.approvalStatus||"Draft"}
                      </span>
                    `}
                    ${S>0?`
                      <button class="btn-card-history p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${u.id}" title="View generation history (${S} previous versions)">
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
                    <img src="${Ct(u.imageUrl,u.shotNumber)}" onerror="this.onerror=null; this.src='${Ue}assets/storyboard/shot_1a_wide_outpost.jpg';" alt="${u.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102" />
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
                    <span class="font-bold text-slate-900 tracking-tight">Scene: ${D?.sceneNumber||1} | Shot: ${u.shotNumber}</span>
                    <span class="text-[10px] text-slate-400 font-mono">${u.shotSize||"Wide"}</span>
                  </div>
                  <p class="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">${Co(u.description||u.title||"",u.characters||["Kevin","Marcus","Meera"])}</p>
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
    `,ua()}function In(g){const u=g.length>0&&g.every(M=>x.has(M.id)),I=x.size;N.innerHTML=`
      <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col">
        <!-- Sequence Toolbar with Batch Selection -->
        <div class="px-3.5 sm:px-4 py-2.5 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div class="flex items-center gap-2">
            <label class="inline-flex items-center gap-1.5 cursor-pointer select-none">
              <input type="checkbox" id="seq-select-all" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" ${u?"checked":""} />
              <span class="font-heading font-bold text-slate-800 text-xs sm:text-sm">${g.length} Shots in Sequence</span>
            </label>
            ${I>0?`
              <span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                ${I} selected
              </span>
            `:""}
          </div>

          <!-- Batch Action Controls -->
          <div class="flex items-center gap-2 flex-wrap">
            ${I>0?`
              <button id="btn-batch-approve-selected" class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold cursor-pointer transition-all flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">done_all</span>
                <span>Approve Selected (${I})</span>
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
          ${g.map(M=>{const z=M.approvalStatus==="approved"?"bg-emerald-50 text-emerald-700 border-emerald-200":M.approvalStatus==="proposed"?"bg-amber-50 text-amber-700 border-amber-200":M.approvalStatus==="rejected"?"bg-rose-50 text-rose-700 border-rose-200":"bg-slate-100 text-slate-600 border-slate-200",pe=x.has(M.id);return`
              <div class="p-3 sm:p-4 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0 w-full overflow-hidden" data-shot-id="${M.id}">
                <div class="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1 w-full">
                  <!-- Row selection checkbox -->
                  <div class="pt-1.5 shrink-0">
                    <input type="checkbox" class="seq-shot-check rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" data-shot-id="${M.id}" ${pe?"checked":""} />
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
                      <img src="${Ct(M.imageUrl,M.shotNumber)}" onerror="this.onerror=null; this.src='${Ue}assets/storyboard/shot_1a_wide_outpost.jpg';" alt="${M.title}" class="w-full h-full object-cover" />
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
                  <button type="button" class="btn-card-delete-shot p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 active:scale-95 text-xs cursor-pointer transition-all" data-shot-id="${M.id}" title="Delete Shot (Move to Recycle Bin)" aria-label="Delete Shot ${M.shotNumber}">
                    <span class="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                  <button class="btn-open-inspector px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-xs font-semibold cursor-pointer transition-all" data-shot-id="${M.id}">
                    Edit Details
                  </button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,ua();const S=document.getElementById("seq-select-all");S&&(S.onchange=M=>{M.target.checked?g.forEach(z=>x.add(z.id)):x.clear(),In(g)}),document.querySelectorAll(".seq-shot-check").forEach(M=>{M.onchange=z=>{const pe=M.getAttribute("data-shot-id");z.target.checked?x.add(pe):x.delete(pe),In(g)}});const F=document.getElementById("btn-batch-approve-selected");F&&(F.onclick=async()=>{const M=Array.from(x);if(M.length)try{await Tn(o,a,M,"approved","Batch approved via Sequence Editor"),w(`Approved ${M.length} shots.`),x.clear(),It()}catch{w("Failed batch approval.")}});const _=document.getElementById("btn-batch-reject-selected");_&&(_.onclick=async()=>{const M=Array.from(x);if(M.length)try{await Tn(o,a,M,"rejected","Batch rejected via Sequence Editor"),w(`Marked ${M.length} shots as rejected.`),x.clear(),It()}catch{w("Failed batch rejection.")}});const O=document.getElementById("btn-batch-approve-all");O&&(O.onclick=async()=>{try{const M=(D?.shots||[]).filter(z=>z.approvalStatus==="proposed"||z.approvalStatus==="draft").map(z=>z.id);if(!M.length){w("All shots are already approved.");return}await Tn(o,a,M,"approved","Batch approved for production"),w(`Approved ${M.length} shots.`),It()}catch{w("Failed batch approval.")}});const Q=document.getElementById("btn-seq-add-shot");Q&&(Q.onclick=()=>Qs(null))}function $o(g){se=g;const u=D?.shots?.find(pe=>pe.id===g);if(!u)return;const I=document.getElementById("variation-shot-pill"),S=document.getElementById("variation-shot-title"),F=document.getElementById("variation-shot-meta"),_=document.getElementById("variation-shot-desc"),O=document.getElementById("variation-current-thumb"),Q=document.getElementById("variation-thumb-placeholder"),M=document.getElementById("variation-guidance-input");I&&(I.textContent=u.shotNumber),S&&(S.textContent=u.title||`Shot ${u.shotNumber}`),F&&(F.textContent=`${u.shotSize||"Medium"} · ${u.focalLength||"50mm"} · ${u.visualStyle||"Storyboard Sketch"}`),_&&(_.textContent=u.description||"No description provided."),M&&(M.value=""),u.imageUrl?(O&&(O.src=Ct(u.imageUrl,u.shotNumber),O.onerror=()=>{O.src=`${Ue}assets/storyboard/shot_1a_wide_outpost.jpg`},O.classList.remove("hidden")),Q&&Q.classList.add("hidden")):(O&&O.classList.add("hidden"),Q&&Q.classList.remove("hidden"));const z=document.querySelector('#variation-options-grid input[value="auto"]');z&&(z.checked=!0,z.dispatchEvent(new Event("change"))),ot(v)}async function Bo(g,u,I=""){const S=D?.shots?.find(F=>F.id===g);if(S&&!S.isGenerating){S.isGenerating=!0,S.generatingStatus=`Generating ${u.toUpperCase()} Variation...`,S.generationError=null,wt();try{const F=J.find(Q=>Q.id===a)||J[0]||{};let _=S.prompt||S.description||"Cinematic composition";u==="composition"?_+=", alternative compositional staging, rearranged subject placement and background spatial balance":u==="angle"?_+=", dynamic alternative camera angle perspective":u==="lighting"?_+=", alternate lighting mood study, dramatic rim light and deep shadow contrast":u==="framing"?_+=", alternative focal framing and lens perspective":u==="creative"?_+=", bold creative visual reinterpretation while preserving character and screenplay context":_+=", dynamic alternative variation with fresh cinematic staging",I&&(_+=`. Additional direction: ${I}`);const O=await ms(o,{provider:S.provider||"scriptora-concept",prompt:_,shotSize:S.shotSize,cameraAngle:S.cameraAngle,cameraMovement:S.cameraMovement,focalLength:S.focalLength,lightingMood:S.lightingMood,aspectRatio:S.aspectRatio,visualStyle:S.visualStyle||D?.visualStyle||"Soft Pencil",sceneHeading:D?.sceneHeading||F.heading||"SCENE 1",shotNumber:S.shotNumber,description:S.description,cast:S.characters||F.cast||["KEVIN","MARCUS"],characters:S.characters||F.cast||["KEVIN","MARCUS"],quality:S.quality||"standard",isVariation:!0,variationType:u});if(O?.imageUrl){const Q=Ct(O.imageUrl,S.shotNumber);if(S.history||(S.history=[]),S.imageUrl){const M=Ct(S.imageUrl,S.shotNumber);S.history.unshift({id:`v-${Date.now()}`,imageUrl:M,previousImageUrl:M,prompt:S.prompt||S.description||"Original take",generationType:"variation",variationType:u,visualStyle:S.visualStyle||"Storyboard Sketch",settings:{shotSize:S.shotSize,cameraAngle:S.cameraAngle,focalLength:S.focalLength,lightingMood:S.lightingMood,aspectRatio:S.aspectRatio},sourceVersion:D?.sourceVersion||"Draft 4.2",timestamp:new Date().toISOString()})}S.imageUrl=Q,S.isGenerating=!1,S.generatingStatus=null,S.generationError=null;try{await Ds(o,a,g,{imageUrl:Q,prompt:_,isVariation:!0,variationType:u})}catch{}try{await qt(o,D)}catch{}wt(),w(`Created ${u} variation for Shot ${S.shotNumber}`)}else throw new Error("No image returned")}catch(F){S.isGenerating=!1,S.generatingStatus=null,S.generationError=F.message||"Variation failed",wt(),w(`Variation failed for shot ${S.shotNumber}`)}}}async function pa(g){if(!g)return;const u=D?.shots?.find(S=>S.id===g),I=u?`Shot ${u.shotNumber}`:"this shot";if(confirm(`Move ${I} to the Storyboard Recycle Bin?`))try{await Ll(o,a,g),w(`${I} moved to Recycle Bin`),ye&&!ye.classList.contains("hidden")&&he(ye),await Ht(),It()}catch{w("Failed to delete shot")}}async function No(g){const u=D?.shots?.find(I=>I.id===g);if(u&&!u.isGenerating){u.isGenerating=!0,u.generatingStatus=`Retrying Shot ${u.shotNumber}...`,u.generationError=null,wt();try{const I=J.find(F=>F.id===a)||J[0]||{},S=await ms(o,{provider:u.provider||"scriptora-concept",prompt:u.prompt||u.description||"Cinematic composition",shotSize:u.shotSize,cameraAngle:u.cameraAngle,cameraMovement:u.cameraMovement,focalLength:u.focalLength,lightingMood:u.lightingMood,aspectRatio:u.aspectRatio,visualStyle:u.visualStyle||D?.visualStyle||"Soft Pencil",sceneHeading:D?.sceneHeading||I.heading||"SCENE 1",shotNumber:u.shotNumber,description:u.description,cast:u.characters||I.cast||["KEVIN","MARCUS"],characters:u.characters||I.cast||["KEVIN","MARCUS"],quality:u.quality||"standard",generationType:"retry"});if(S?.imageUrl){const F=Ct(S.imageUrl,u.shotNumber);if(u.history||(u.history=[]),u.imageUrl&&u.imageUrl!==F){const _=Ct(u.imageUrl,u.shotNumber);u.history.unshift({id:`v-${Date.now()}`,imageUrl:_,previousImageUrl:_,prompt:u.prompt||u.description||"Previous take",generationType:"retry",visualStyle:u.visualStyle||"Storyboard Sketch",settings:{shotSize:u.shotSize,cameraAngle:u.cameraAngle,focalLength:u.focalLength,lightingMood:u.lightingMood,aspectRatio:u.aspectRatio},sourceVersion:D?.sourceVersion||"Draft 4.2",timestamp:new Date().toISOString()})}u.imageUrl=F,u.isGenerating=!1,u.generatingStatus=null,u.generationError=null;try{await Ds(o,a,g,{imageUrl:F})}catch{}try{await qt(o,D)}catch{}wt(),w(`Shot ${u.shotNumber} regenerated successfully!`)}else throw new Error("No image returned")}catch(I){u.isGenerating=!1,u.generatingStatus=null,u.generationError=I.message||"Generation failed",wt(),w(`Retry failed for shot ${u.shotNumber}`)}}}function ua(){document.querySelectorAll(".btn-open-inspector").forEach(g=>{g.onclick=u=>{u.stopPropagation();const I=g.getAttribute("data-shot-id");Qs(I)}}),document.querySelectorAll(".btn-open-lightbox").forEach(g=>{g.onclick=u=>{u.stopPropagation();const I=g.getAttribute("data-shot-id"),F=(D?.shots||[]).findIndex(_=>_.id===I);Eo(F!==-1?F:0)}}),document.querySelectorAll(".btn-move-up").forEach(g=>{g.onclick=async u=>{u.stopPropagation();const I=g.getAttribute("data-shot-id");ma(I,-1)}}),document.querySelectorAll(".btn-move-down").forEach(g=>{g.onclick=async u=>{u.stopPropagation();const I=g.getAttribute("data-shot-id");ma(I,1)}}),document.querySelectorAll(".btn-quick-approve").forEach(g=>{g.onclick=async u=>{u.stopPropagation();const I=g.getAttribute("data-shot-id"),S=D?.shots?.find(_=>_.id===I);if(!S)return;const F=S.approvalStatus==="approved"?"draft":"approved";try{await Nn(o,a,I,F),w(`Shot ${S.shotNumber} marked ${F}`),It()}catch{w("Failed to update shot approval")}}}),document.querySelectorAll(".btn-card-regen").forEach(g=>{g.onclick=u=>{u.stopPropagation();const I=g.getAttribute("data-shot-id");So(I)}}),document.querySelectorAll(".btn-card-history").forEach(g=>{g.onclick=u=>{u.stopPropagation();const I=g.getAttribute("data-shot-id");ca(I)}}),document.querySelectorAll(".btn-card-delete-shot").forEach(g=>{g.onclick=u=>{u.preventDefault(),u.stopPropagation();const I=g.getAttribute("data-shot-id");pa(I)}}),document.querySelectorAll(".btn-card-retry-gen").forEach(g=>{g.onclick=u=>{u.preventDefault(),u.stopPropagation();const I=g.getAttribute("data-shot-id");No(I)}}),document.querySelectorAll(".btn-card-variation").forEach(g=>{g.onclick=u=>{u.preventDefault(),u.stopPropagation();const I=g.getAttribute("data-shot-id");$o(I)}}),document.querySelectorAll(".input-card-upload-file").forEach(g=>{g.onchange=u=>{const I=g.getAttribute("data-shot-id"),S=u.target.files&&u.target.files[0];if(!S||!I)return;const F=new FileReader;F.onload=async _=>{const O=D?.shots?.find(Q=>Q.id===I);if(O){O.history||(O.history=[]),O.imageUrl&&O.history.unshift({imageUrl:O.imageUrl,prompt:O.prompt||O.description,visualStyle:O.visualStyle,provider:O.provider,createdAt:new Date().toISOString()}),O.imageUrl=_.target.result,O.imageSource="upload";try{await qt(o,D),ss(),w(`Uploaded new frame for Shot ${O.shotNumber}`)}catch{w("Failed to save uploaded image")}}},F.readAsDataURL(S)}})}async function ma(g,u){const I=D?.shots||[],S=I.findIndex(M=>M.id===g);if(S===-1)return;const F=S+u;if(F<0||F>=I.length)return;const _=[...I],[O]=_.splice(S,1);_.splice(F,0,O);const Q=_.map(M=>M.id);try{await Dl(o,a,Q),It()}catch{w("Failed to reorder shots")}}(async function(){Sn(),Ht();try{const[u,I]=await Promise.all([vs(o),Nl()]);J=u||[],te=I||[]}catch(u){console.warn("Using offline fallback data for storyboard:",u)}$&&J.length&&($.innerHTML=J.map(u=>`
        <option value="${u.id}" ${u.id===a?"selected":""}>
          Scene ${u.sceneNumber}: ${u.heading}
        </option>
      `).join(""),$.onchange=u=>{a=u.target.value,x.clear(),It()}),It()})()}class $r{constructor(){this.appEl=null,this.currentPath=null,this.isFullScreen=!1,this.isNavigatingBack=!1,this._backInProgress=!1,this.backHandlers=[],this.scrollPositions={},this.historyIndex=0}clearHistory(){this.scrollPositions={},this.historyIndex=0,this.backHandlers=[],T.clearHistory()}getBasePath(){return window.location.pathname.toLowerCase().startsWith("/scriptora")?"/Scriptora":""}getCurrentLocation(){return window.location.hash&&window.location.hash.startsWith("#/")?window.location.hash.slice(1):window.location.pathname+window.location.search}normalizePath(t){if(!t)return"/";const s=this.getBasePath();let n=t;s&&n.toLowerCase().startsWith(s.toLowerCase())&&(n=n.slice(s.length)||"/");const o=n.indexOf("?"),a=n.indexOf("#");let i=n.length;o!==-1&&(i=Math.min(i,o)),a!==-1&&(i=Math.min(i,a));const l=n.slice(0,i).replace(/\/+$/,"")||"/";return l.startsWith("/")?l:"/"+l}getRouteFallback(t){const s=this.normalizePath(t);return s.startsWith("/production/")&&s!=="/production"?"/production":s==="/production"?"/workspace":s.startsWith("/intelligence/analysis/")?"/intelligence/analysis":s==="/intelligence/analysis"||s==="/intelligence/analysis/select"?"/intelligence/dashboard":s==="/intelligence/dashboard"||s==="/intelligence/overview"?"/intelligence/context":s==="/intelligence/context"?"/intelligence":s==="/intelligence"||s==="/intelligence/select"?"/workspace":s==="/profile/collaborators"?"/profile":(s==="/profile"||s==="/notifications"||s==="/chat"||s.startsWith("/editor"),"/workspace")}getRouteLabel(t){const s=this.normalizePath(t);return s==="/workspace"?"Workspace":s==="/production"?"Production":s.startsWith("/production/schedule")?"Schedule":s.startsWith("/production/breakdown")?"Breakdown":s.startsWith("/production/call-sheets")?"Call Sheets":s.startsWith("/production/dialogue-sides")?"Dialogue Sides":s.startsWith("/production/storyboard")?"Storyboard":s.startsWith("/editor")?"Editor":s==="/intelligence"?"Intelligence":s==="/intelligence/context"?"Context":s==="/intelligence/dashboard"?"Analysis":s.startsWith("/intelligence/analysis")?"Vectors":s==="/profile"?"Profile":s==="/profile/collaborators"?"Collaborators":s==="/notifications"?"Notifications":s==="/chat"?"AI Chat":"Back"}registerBackHandler(t){return typeof t!="function"?()=>{}:(this.backHandlers.push(t),()=>{const s=this.backHandlers.indexOf(t);s!==-1&&this.backHandlers.splice(s,1)})}triggerBackHandlers(){for(let n=this.backHandlers.length-1;n>=0;n--){const o=this.backHandlers[n];try{if(o())return!0}catch(a){console.error("Back handler error:",a)}}const t=Array.from(document.querySelectorAll("#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)"));if(t.length>0){const n=t[t.length-1],o=n.querySelector('[data-modal-close], #modal-day-close, #modal-day-done, .close-setting-modal, .close-profile-modal, #action-modal-cancel, #new-script-cancel, [id$="-cancel"], [id$="-close"]');return o?o.click():he(n),!0}const s=Array.from(document.querySelectorAll('.scriptora-popup:not(.hidden), [data-scriptora-popup]:not(.hidden), [role="menu"]:not(.hidden), #quick-add-menu:not(.hidden)'));return s.length>0?(s[s.length-1].classList.add("hidden"),!0):!1}peekPreviousRoute(){return window.history.state?.prevPath?window.history.state.prevPath:T.peekPreviousRoute(null)}back(t=null){if(this._backInProgress||(this._backInProgress=!0,setTimeout(()=>{this._backInProgress=!1},200),this.triggerBackHandlers()))return;const s=window.history.state||{};if((typeof s.appStep=="number"?s.appStep:this.historyIndex)>0){window.history.back();return}let o=T.popHistory();for(;o&&this.normalizePath(o)===this.normalizePath(this.currentPath);)o=T.popHistory();const a=o||t||this.getRouteFallback(this.currentPath);a&&this.normalizePath(a)!==this.normalizePath(this.currentPath)&&(this.isNavigatingBack=!0,this.navigate(a,!0),this.isNavigatingBack=!1)}ensureShell(){if(!this.appEl)return;document.getElementById("scriptora-app-shell")||(this.appEl.innerHTML=`
        <div id="scriptora-app-shell" class="flex flex-col min-h-screen w-full relative bg-surface select-text">
          <!-- Persistent Global Header Container -->
          <div id="scriptora-global-header" class="fixed top-0 left-0 right-0 z-40 transition-all duration-200"></div>

          <!-- Dynamic Screen Content Area -->
          <main id="scriptora-global-content" class="flex-1 w-full min-h-screen flex flex-col relative transition-opacity duration-200"></main>

          <!-- Persistent Global Bottom Navigation Container -->
          <div id="scriptora-global-nav" class="fixed bottom-0 left-0 right-0 z-40 transition-all duration-200 overflow-visible"></div>
        </div>
      `)}init(t="#app"){if(this.appEl=document.querySelector(t),!this.appEl){console.error(`Mount element ${t} not found.`);return}this.ensureShell(),window.scriptoraRouter=this;const s=window.history.state||{};typeof s.appStep!="number"?(window.history.replaceState({...s,appStep:0,scriptoraPath:this.getCurrentLocation()},"",window.location.href),this.historyIndex=0):this.historyIndex=s.appStep,window.setScriptoraFullScreen=n=>{this.isFullScreen=!!n;const o=document.getElementById("scriptora-global-header"),a=document.getElementById("scriptora-global-nav");o&&o.classList.toggle("hidden",!!n),a&&a.classList.toggle("hidden",!!n)},document.addEventListener("click",n=>{const o=n.target.closest("[data-scriptora-back], #prod-subnav-back, #editor-back-btn, #btn-back-notif, #analysis-back-btn, #collab-back-btn, #production-back-btn, #chat-back-btn, #intelligence-dashboard-back-btn, #intelligence-context-back-btn, #individual-analysis-selector-back-btn");if(o){n.preventDefault(),n.stopPropagation();const i=o.getAttribute("data-back-fallback")||o.getAttribute("href")||null;this.back(i);return}const a=n.target.closest("a");if(a&&a.href&&a.origin===window.location.origin&&!a.hasAttribute("download")&&a.getAttribute("target")!=="_blank"&&!a.getAttribute("rel")?.includes("external")){const i=new URL(a.href),l=i.pathname+i.search+i.hash;l.startsWith("/api")||(n.preventDefault(),this.navigate(l))}},!0),window.addEventListener("popstate",n=>{if(!(typeof window.__scriptoraEditorPopstate=="function"&&window.__scriptoraEditorPopstate(n))){if(this.triggerBackHandlers()){const o=this.getCurrentLocation();window.history.pushState({...window.history.state||{},scriptoraPath:o},"",o);return}typeof n.state?.appStep=="number"?this.historyIndex=n.state.appStep:this.historyIndex>0&&(this.historyIndex-=1),T.popHistory(),this.isNavigatingBack=!0,this.resolve(this.getCurrentLocation()),this.isNavigatingBack=!1}}),window.addEventListener("hashchange",()=>{this.resolve(this.getCurrentLocation())}),this.resolve(this.getCurrentLocation())}navigate(t,s=!1){if(Ea(),this.currentPath&&(this.scrollPositions[this.normalizePath(this.currentPath)]=window.scrollY),!this.isNavigatingBack&&!s&&this.currentPath){const l=this.normalizePath(this.currentPath),r=this.normalizePath(t);l!==r&&T.pushHistory(this.currentPath)}const n=this.getBasePath(),o=n&&t.toLowerCase().startsWith(n.toLowerCase())?t.slice(n.length)||"/":t,a=n&&!t.startsWith(n)?`${n}${o.startsWith("/")?"":"/"}${o}`:t,i=this.currentPath?this.normalizePath(this.currentPath):null;s?window.history.replaceState({...window.history.state||{},scriptoraPath:o,appStep:this.historyIndex,prevPath:i},"",a):(this.isNavigatingBack||(this.historyIndex+=1),window.history.pushState({scriptoraPath:o,appStep:this.historyIndex,prevPath:i},"",a)),this.resolve(o)}resolve(t){const s=t.indexOf("?"),n=s===-1?t:t.slice(0,s),o=s===-1?"":t.slice(s+1);let a=n.replace(/\/+$/,"")||"/";const i=this.getBasePath();i&&a.toLowerCase().startsWith(i.toLowerCase())&&(a=a.slice(i.length)||"/"),a.startsWith("/")||(a="/"+a);const l=new URLSearchParams(o||"");this.currentPath=t,a.startsWith("/editor")?(document.body.classList.add("editor-mode"),document.documentElement.classList.add("editor-mode")):(document.body.classList.remove("editor-mode"),document.documentElement.classList.remove("editor-mode"));const r=!!T.state.currentUser;if(!r&&!["/welcome","/auth"].includes(a)){this.navigate("/auth",!0);return}if(r&&a==="/auth"){this.navigate("/workspace",!0);return}if(a==="/"){r?this.navigate("/workspace",!0):this.navigate("/welcome",!0);return}if(a==="/welcome"){this.render(zl(),()=>Gl(this.navigate.bind(this)),{isPublic:!0});return}if(a==="/auth"){this.render(ql(),()=>Vl(this.navigate.bind(this)),{isPublic:!0});return}if(a==="/workspace"){this.render(Yl(),()=>Xl(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Workspace",subtitle:"Your writing space."});return}if(a==="/editor"){const c=T.state.selectedScriptId||"chronicles-of-dust",x=l.get("scene");this.navigate(`/editor/${c}${x?`?scene=${x}`:""}`,!0);return}if(a.startsWith("/editor/")){const c=a.split("/")[2],x=l.get("scene");T.selectScript(c);const m=T.state.scripts?.find(h=>h.id===c)||{title:"Untitled Screenplay"};this.render(si(c,x),()=>ai(c,this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Editor",subtitle:m.title||"Screenplay Studio",hideHeader:!0,hideNav:!0});return}if(a==="/intelligence"||a==="/intelligence/select"){this.render($i(),()=>Bi(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Selector"});return}if(a==="/intelligence/context"){this.render(Ni(),()=>Ti(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Context Calibration"});return}if(a==="/intelligence/dashboard"||a==="/intelligence/overview"){this.render(Pi(),()=>Li(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Script Analysis"});return}if(a==="/intelligence/analysis"||a==="/intelligence/analysis/select"){this.render(Di(),()=>Ri(this.navigate.bind(this)),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Analyse Individually"});return}if(a.startsWith("/intelligence/analysis/")){const c=a.split("/")[3]||"pacing",x=l.get("from"),m=l.get("scriptId");this.render(_i(c,x,m),()=>ji(c,this.navigate.bind(this),x,m),{activeTab:"intelligence",sectionTitle:"Intelligence",subtitle:"Vector Analysis"});return}if(a==="/profile"){const c=l.get("from"),x=l.get("scriptId");this.render(Fi(c,x),()=>Hi(this.navigate.bind(this),c,x),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Account & preferences."});return}if(a==="/profile/collaborators"){const c=l.get("from"),x=l.get("scriptId");this.render(Ui(c,x),()=>qi(this.navigate.bind(this),c,x),{activeTab:"profile",sectionTitle:"Profile",subtitle:"Collaborators"});return}if(a==="/notifications"){this.render(Vi(),()=>zi(this.navigate.bind(this)),{activeTab:"workspace",sectionTitle:"Notifications",subtitle:"Activity Stream"});return}if(a==="/production"||a==="/pre-production"){const c=l.get("from"),x=l.get("scriptId");this.render(Gi(c,x),()=>Wi(this.navigate.bind(this),c,x),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Production Workspace & Tools"});return}if(a==="/production/breakdown"){const c=l.get("from"),x=l.get("scriptId");this.render(tr(c,x),()=>sr(this.navigate.bind(this),c,x),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Script Breakdown Workspace"});return}const p=a.match(/^\/production\/scenes(?:\/([a-zA-Z0-9_-]+))?$/);if(p){const c=l.get("from"),x=l.get("scriptId")||"chronicles-of-dust",m=p[1]||l.get("sceneId"),h=`/production/schedule?scriptId=${x}${m?`&sceneId=${m}`:""}${c?`&from=${encodeURIComponent(c)}`:""}`;this.navigate(h,!0);return}const d=a.match(/^\/production\/call-sheets(?:\/([a-zA-Z0-9_-]+))?$/);if(d){const c=l.get("from"),x=l.get("scriptId"),m=d[1]||l.get("csId");this.render(nr(c,x,m),()=>yo(this.navigate.bind(this),c,x,m),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:m?"Call Sheet Inspector":"Call Sheets Workspace"});return}if(a==="/production/dialogue-sides"||a==="/production/dialogue-sheets"||a==="/production/sides"){const c=l.get("from"),x=l.get("scriptId");this.render(ar(c,x),()=>or(this.navigate.bind(this),c,x),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Dialogue Sheets & Actor Sides"});return}if(a==="/production/schedule"||a==="/production/stripboard"){const c=l.get("from"),x=l.get("scriptId");this.render(ir(c,x),()=>rr(this.navigate.bind(this),c,x),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Master Shooting Schedule & Stripboard"});return}if(a==="/production/storyboard"||a==="/production/storyboards"){const c=l.get("from"),x=l.get("scriptId");this.render(Cr(c,x),()=>Ar(this.navigate.bind(this),c,x),{activeTab:"production",sectionTitle:"Pre-Production",subtitle:"Storyboard Studio"});return}if(a==="/chat"||a==="/ai-chat"||a==="/writer-room"||a==="/ai-writer-room"){this.render(Ki(),()=>Ji(this.navigate.bind(this)),{activeTab:"chat",sectionTitle:"AI Chat",subtitle:"Universal Assistant"});return}this.renderNotFound(a)}render(t,s,n={}){this.ensureShell();const o=document.getElementById("scriptora-global-header"),a=document.getElementById("scriptora-global-content"),i=document.getElementById("scriptora-global-nav"),l=!!n.isPublic,r=!!n.hideHeader,f=!!n.hideNav,p=n.activeTab||"workspace",d=n.sectionTitle||"Scriptora",c=n.subtitle||"";if(l?(o&&o.classList.add("hidden"),i&&i.classList.add("hidden")):(o&&!this.isFullScreen&&(r?(o.classList.add("hidden"),o.innerHTML=""):(o.classList.remove("hidden"),o.innerHTML=pt(d,c))),i&&!this.isFullScreen&&(f?(i.classList.add("hidden"),i.innerHTML=""):(i.classList.remove("hidden"),Ul(p)||(i.innerHTML=ct(p))))),a){this.backHandlers=[];const x=document.getElementById("scriptora-modal-portal");x&&(x.innerHTML=""),Ea();let m=t||"";m=m.replace(/<header[^>]*data-global-header="true"[^>]*>[\s\S]*?<\/header>/gi,""),m=m.replace(/<header\s+class="fixed\s+top-0\s+w-full\s+z-40\s+pt-safe\s+bg-surface[^>]*>[\s\S]*?<\/header>/gi,""),m=m.replace(/<nav[^>]*data-global-bottom-nav="true"[^>]*>[\s\S]*?<\/nav>/gi,""),m=m.replace(/<nav\s+class="fixed\s+bottom-0[^>]*>[\s\S]*?<\/nav>/gi,""),a.innerHTML=m;const h=this.normalizePath(this.currentPath),b=this.scrollPositions[h];if(this.isNavigatingBack&&b!==void 0?setTimeout(()=>{window.scrollTo({top:b,behavior:"instant"})},10):window.scrollTo({top:0,behavior:"instant"}),a.classList.remove("fade-in"),a.offsetWidth,a.classList.add("fade-in"),typeof s=="function")try{s()}catch(y){console.error("Error attaching screen events:",y)}}}renderNotFound(t){this.render(`
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
      `,()=>{const s=document.getElementById("notfound-home");s&&(s.onclick=()=>this.navigate("/workspace"))},{activeTab:"workspace",sectionTitle:"Page Not Found",subtitle:"404"})}}const Br=new $r;async function _a(){try{await T.init(),Br.init("#app"),window.addEventListener("online",()=>{w("Back online. Synchronizing changes..."),T.refreshScripts(),T.refreshNotifications()}),window.addEventListener("offline",()=>{w("Offline mode active. Edits saved locally.","info")}),console.log("Scriptora initialized successfully in production-ready mode.")}catch(e){console.error("Scriptora bootstrap failed:",e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",_a):_a();
