import * as THREE from "three";
import "./style.css";

type AuraTier = { id:number; name:string; color:string; accent:string; weight:number };
const tiers:AuraTier[] = [
{id:1,name:"Common",color:"#d9e0df",accent:"#ffffff",weight:50},
{id:2,name:"Uncommon",color:"#79b88b",accent:"#d0f2b0",weight:24},
{id:3,name:"Rare",color:"#5a9fd0",accent:"#b5e8ff",weight:12},
{id:4,name:"Superior",color:"#56c5b6",accent:"#c6fff1",weight:6},
{id:5,name:"Epic",color:"#a88bd0",accent:"#e4c9ff",weight:3},
{id:6,name:"Elite",color:"#c76c68",accent:"#e7d5c9",weight:1.8},
{id:7,name:"Legendary",color:"#d5ae55",accent:"#fff0a8",weight:1},
{id:8,name:"Heroic",color:"#cf7853",accent:"#f4d28b",weight:.6},
{id:9,name:"Mythic",color:"#c45e42",accent:"#a47bb7",weight:.3},
{id:10,name:"Ancient",color:"#a58b58",accent:"#8b9b76",weight:.15},
{id:11,name:"Sacred",color:"#e7dfc5",accent:"#fff4d4",weight:.08},
{id:12,name:"Divine",color:"#f1d58a",accent:"#fff9e5",weight:.04},
{id:13,name:"Celestial",color:"#e7a9bc",accent:"#f9e8d5",weight:.02},
{id:14,name:"Astral",color:"#8b9bd1",accent:"#d3dfff",weight:.01},
{id:15,name:"Ethereal",color:"#9cc9c8",accent:"#e5ffff",weight:.005},
{id:16,name:"Eternal",color:"#d6bd7b",accent:"#fff1b8",weight:.002},
{id:17,name:"Transcendent",color:"#b6a3e0",accent:"#f3eaff",weight:.001},
{id:18,name:"Exalted",color:"#d9bb83",accent:"#fff2cf",weight:.0005},
{id:19,name:"Cosmic",color:"#637ca9",accent:"#d5c8ff",weight:.00025},
{id:20,name:"Primordial",color:"#b8754e",accent:"#dfc58a",weight:.00012},
{id:21,name:"Absolute",color:"#e6e5df",accent:"#242a2b",weight:.00006},
{id:22,name:"Infinite",color:"#8d9ac0",accent:"#f2d9ff",weight:.00003},
{id:23,name:"Omnipotent",color:"#e5d6a5",accent:"#fffefa",weight:.000015},
{id:24,name:"Reality",color:"#8ac6ba",accent:"#f2f0d9",weight:.000007},
{id:25,name:"Paradox",color:"#bd8bc2",accent:"#8dc6c0",weight:.000003},
{id:26,name:"Singularity",color:"#3b3b50",accent:"#c7a6f5",weight:.000001},
{id:27,name:"Genesis",color:"#a6c58c",accent:"#f5e7a7",weight:.0000005},
{id:28,name:"Apex",color:"#e5c16e",accent:"#fff8dc",weight:.0000002},
{id:29,name:"Supreme",color:"#e8e3d7",accent:"#d5bb83",weight:.0000001},
{id:30,name:"Unwritten",color:"#f4f0e8",accent:"#b7d8d1",weight:.00000005}
];
const names=["Quiet Spark","Moss Halo","Blue Drift","Jade Echo","Arcane Bloom","Iron Crest","Solar Crown","Valor Oath","Phoenix Ember","Elder Relic","Hallowed Light","Empyrean Grace","Aurora Orbit","Nebula Veil","Liminal Whisper","Aeon Hourglass","Prismatic Radiance","Sovereign Throne","Galactic Quasar","Titan Origin","Absolute Stillpoint","Endless Mirror","Stormborn Dominion","Reality Fracture","Parallax Reversal","Event Horizon","Worldseed Bloom","Apex Zenith","Supreme Crown","The Unwritten"];
const canvas=document.querySelector<HTMLCanvasElement>("#world")!;
const scene=new THREE.Scene();scene.background=new THREE.Color("#a9c1bc");scene.fog=new THREE.Fog("#a9c1bc",24,70);
const camera=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,.1,150);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:"high-performance"});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
scene.add(new THREE.HemisphereLight("#e9f3e8","#6b7164",2));
const sun=new THREE.DirectionalLight("#fff1d6",3);sun.position.set(-7,12,5);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);scene.add(sun);
const rim=new THREE.DirectionalLight("#a9d7d0",1.2);rim.position.set(5,5,-8);scene.add(rim);
const mat=(color:string,rough=.82)=>new THREE.MeshStandardMaterial({color,roughness:rough});
const box=(parent:THREE.Object3D,size:[number,number,number],pos:[number,number,number],color:string)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(...size),mat(color));m.position.set(...pos);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
const floor=new THREE.Mesh(new THREE.CircleGeometry(25,64),mat("#78958a"));floor.rotation.x=-Math.PI/2;floor.position.y=-.08;floor.receiveShadow=true;scene.add(floor);
const hub=new THREE.Mesh(new THREE.CylinderGeometry(5.6,6.2,.28,12),mat("#d4c7a8"));hub.position.y=.05;hub.receiveShadow=true;scene.add(hub);
const inner=new THREE.Mesh(new THREE.CylinderGeometry(4.2,4.5,.08,12),mat("#8aab9e"));inner.position.y=.22;scene.add(inner);
for(let i=0;i<8;i++){const a=i*Math.PI/4;const path=new THREE.Mesh(new THREE.BoxGeometry(1.2,.06,8),mat("#c4b99d"));path.position.set(Math.sin(a)*8,.01,Math.cos(a)*8);path.rotation.y=-a;scene.add(path);}
const kioskColors=["#d8c8a5","#b8c8b4","#c7a78a","#9eb7b0"];
for(let i=0;i<8;i++){const a=i*Math.PI/4+.15,x=Math.sin(a)*13,z=Math.cos(a)*13,h=1.8+(i%3)*.35,k=new THREE.Group();k.position.set(x,0,z);k.rotation.y=-a+.12;box(k,[2.3,h,2],[0,h/2,0],kioskColors[i%4]);box(k,[2.55,.28,2.25],[0,h+.08,0],"#6e8175");box(k,[.95,.8,.08],[0,h*.55,1.04],"#e7dfc8");scene.add(k);}
for(let i=0;i<14;i++){const a=i*2.399,r=17+(i%3)*1.2,t=new THREE.Group();t.position.set(Math.sin(a)*r,0,Math.cos(a)*r);box(t,[.48,1.5,.48],[0,.75,0],"#806e58");const crown=new THREE.Mesh(new THREE.DodecahedronGeometry(1.05+(i%3)*.12,0),mat(i%2?"#5e806c":"#739078"));crown.position.y=2;t.add(crown);scene.add(t);}
const ring=new THREE.Mesh(new THREE.TorusGeometry(2.25,.055,8,64),new THREE.MeshStandardMaterial({color:"#e3d5ad",roughness:.45,emissive:"#5d6959",emissiveIntensity:.25}));ring.rotation.x=Math.PI/2;ring.position.y=.42;scene.add(ring);
const player=new THREE.Group();const body=new THREE.Group();box(body,[.78,.82,.48],[0,1.15,0],"#d8b995");box(body,[.72,.72,.62],[0,2,0],"#d7c7a9");box(body,[.18,.16,.08],[-.16,2.05,.32],"#34494a");box(body,[.18,.16,.08],[.16,2.05,.32],"#34494a");box(body,[.27,.78,.3],[-.58,1.16,0],"#d8b995");box(body,[.27,.78,.3],[.58,1.16,0],"#d8b995");box(body,[.3,.72,.38],[-.22,.38,0],"#647d78");box(body,[.3,.72,.38],[.22,.38,0],"#647d78");player.add(body);scene.add(player);
const aura=new THREE.Group();scene.add(aura);let auraTier=AuraTierDefault();let auraClock=0;
function AuraTierDefault():AuraTier{return tiers[0];}
function applyAura(t:AuraTier){auraTier=t;aura.clear();const n=Math.min(24,Math.max(5,t.id+3)),orbMat=new THREE.MeshBasicMaterial({color:t.color});for(let i=0;i<n;i++){const a=i/n*Math.PI*2,o=new THREE.Mesh(new THREE.IcosahedronGeometry(t.id<5?.12:.18,0),orbMat);o.position.set(Math.cos(a)*(1.25+t.id*.018),1.35+Math.sin(a*2)*.42,Math.sin(a)*(1+t.id*.018));aura.add(o);}const halo=new THREE.Mesh(new THREE.TorusGeometry(1.15+t.id*.018,.025+Math.min(t.id,20)*.0015,6,48),new THREE.MeshBasicMaterial({color:t.accent}));halo.rotation.x=Math.PI/2;halo.position.y=.18;aura.add(halo);const glow=new THREE.Mesh(new THREE.SphereGeometry(.8+t.id*.025,16,12),new THREE.MeshBasicMaterial({color:t.color,transparent:true,opacity:Math.min(.1+t.id*.006,.22),depthWrite:false,side:THREE.BackSide}));glow.position.y=1.3;aura.add(glow);}
applyAura(auraTier);
let orbit=.45,zoom=10,drag=false,lastX=0;const keys=new Set<string>();
canvas.addEventListener("pointerdown",e=>{drag=true;lastX=e.clientX;});window.addEventListener("pointerup",()=>drag=false);window.addEventListener("pointermove",e=>{if(drag){orbit-=(e.clientX-lastX)*.006;lastX=e.clientX;}});canvas.addEventListener("wheel",e=>{zoom=THREE.MathUtils.clamp(zoom+e.deltaY*.008,6,15);},{passive:true});window.addEventListener("keydown",e=>keys.add(e.key.toLowerCase()));window.addEventListener("keyup",e=>keys.delete(e.key.toLowerCase()));
const clock=new THREE.Clock();function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.04),move=new THREE.Vector3();if(keys.has("w")||keys.has("arrowup"))move.z-=1;if(keys.has("s")||keys.has("arrowdown"))move.z+=1;if(keys.has("a")||keys.has("arrowleft"))move.x-=1;if(keys.has("d")||keys.has("arrowright"))move.x+=1;if(move.lengthSq()){move.normalize().multiplyScalar(dt*4);player.position.add(move);player.rotation.y=Math.atan2(move.x,move.z);}player.position.x=THREE.MathUtils.clamp(player.position.x,-4.5,4.5);player.position.z=THREE.MathUtils.clamp(player.position.z,-4.5,4.5);aura.position.copy(player.position);auraClock+=dt;aura.rotation.y=Math.sin(auraClock*.55)*.18;aura.children.forEach((c,i)=>{if(c instanceof THREE.Mesh&&c.geometry.type==="IcosahedronGeometry"){const a=auraClock*(.55+auraTier.id*.012)+i/Math.max(1,aura.children.length)*Math.PI*2;c.position.y=1.35+Math.sin(a*1.7)*(.18+auraTier.id*.004);}});const target=new THREE.Vector3(player.position.x+Math.sin(orbit)*zoom,5.2,player.position.z+Math.cos(orbit)*zoom);camera.position.lerp(target,1-Math.pow(.001,dt));camera.lookAt(player.position.x,1,player.position.z);renderer.render(scene,camera);}animate();
window.addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
const $=(id:string)=>document.getElementById(id)!;let collection:{name:string;tier:AuraTier}[]=JSON.parse(localStorage.getItem("auraCollection")||"[]");$("count").textContent=String(collection.length);
function chooseTier(){const total=tiers.reduce((s,t)=>s+t.weight,0);let r=Math.random()*total;for(const t of tiers){r-=t.weight;if(r<=0)return t;}return tiers[0];}
function toast(s:string){$("toast").textContent=s;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2200);}
function renderDrawer(tab:string){const body=$("drawerBody");if(tab==="index"){body.innerHTML='<div class="tiergrid">'+tiers.map(t=>'<div class="tier"><i>'+String(t.id).padStart(2,"0")+'</i>'+t.name+'</div>').join("")+'</div>';}else{body.innerHTML=collection.length?collection.slice().reverse().map(x=>'<div class="entry"><span class="dot" style="background:'+x.tier.color+'"></span><div><b>'+x.name+'</b><small>'+x.tier.name+' · TIER '+String(x.tier.id).padStart(2,"0")+'</small></div></div>').join(""):'<p class="empty">Your collection is waiting for its first discovery.</p>';}}
document.querySelectorAll<HTMLButtonElement>(".menu button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".menu button").forEach(x=>x.classList.remove("active"));b.classList.add("active");const tab=b.dataset.tab||"collection";$("drawerTitle").textContent=tab==="index"?"Aura Index":"Collection";renderDrawer(tab);$("drawer").classList.remove("hidden");}));
$("closeDrawer").addEventListener("click",()=>$("drawer").classList.add("hidden"));$("closeReveal").addEventListener("click",()=>$("reveal").classList.add("hidden"));
let rolling=false;$("roll").addEventListener("click",()=>{if(rolling)return;rolling=true;const button=$("roll") as HTMLButtonElement;button.disabled=true;$("status").textContent="RESONANCE BUILDING";$("reveal").classList.add("hidden");const t=chooseTier();const name=names[t.id-1];const wait=Math.min(9000,650+t.id*270);setTimeout(()=>{rolling=false;button.disabled=false;$("status").textContent="READY TO DISCOVER";applyAura(t);collection.push({name,tier:t});localStorage.setItem("auraCollection",JSON.stringify(collection));$("count").textContent=String(collection.length);$("rarity").textContent=t.name.toUpperCase()+" · TIER "+String(t.id).padStart(2,"0");$("rarity").style.color=t.color;$("auraName").textContent=name;$("odds").textContent="AURA TIER "+String(t.id).padStart(2,"0");$("symbol").style.color=t.color;$("symbol").textContent=t.id>24?"✧":"✦";$("reveal").style.setProperty("--rarity",t.color);$("reveal").classList.remove("hidden");if(t.id>=20)toast("RARE DISCOVERY · "+t.name.toUpperCase());},wait);});
