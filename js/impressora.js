let pc=0,pt=0,pq=0;const E=i=>document.getElementById(i);
function pd(p){const h=102*p,tp=424-h,cx=180+Math.sin(p*70)*85,sa=(a,o)=>{for(const k in o)E(a).setAttribute(k,o[k])};
sa('cr',{y:424-h,height:h+.5});sa('gb',{y:tp-52});sa('cg',{x:cx-18,y:tp-44});sa('nz',{d:`M${cx-8} ${tp-18}L${cx+8} ${tp-18}L${cx} ${tp}Z`});
const m=(54+tp-44)/2;sa('fl',{d:`M270 54C270 ${m} ${cx} ${m} ${cx} ${tp-44}`});E('lb').textContent=p>=.995?'CONCLUÍDO':'IMPRESSÃO '+Math.round(p*100)+'%'}
function pl(){pq=0;pc+=(pt-pc)*.15;if(Math.abs(pt-pc)<.001)pc=pt;pd(pc);if(pc!=pt){pq=1;requestAnimationFrame(pl)}}
function pz(now){const m=document.documentElement.scrollHeight-innerHeight;pt=m>40?Math.min(1,scrollY/m):1;if(now)pc=pt;if(!pq){pq=1;requestAnimationFrame(pl)}}
addEventListener('scroll',()=>pz());addEventListener('resize',()=>pz());
