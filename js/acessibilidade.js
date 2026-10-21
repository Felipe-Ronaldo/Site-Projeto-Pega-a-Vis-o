let A={z:0,hc:0,hf:0,sp:0,nb:0,vz:0},ap=0;try{Object.assign(A,JSON.parse(localStorage.getItem('pva')))}catch(e){}
function ay(){const r=document.documentElement;r.style.setProperty('--z',[1,1.25,1.5,2][A.z]);['hc','hf','sp','nb'].forEach(k=>A[k]?r.setAttribute('data-'+k,''):r.removeAttribute('data-'+k));try{localStorage.setItem('pva',JSON.stringify(A))}catch(e){}}
const apv=()=>`<section role=region aria-label="Opções de acessibilidade" style="border-bottom:1px solid var(--bd);padding:20px 32px"><div class=row style="justify-content:flex-start;gap:12px"><button class=b data-a=rd>Ativar modo leitura</button><button class="b b2" data-a=rp>Ler esta página</button><button class="b b2" data-a=vp>Parar leitura</button><button class="b b2" data-a=rs>Restaurar</button></div><p style="margin:14px 0 6px">Tamanho do texto: <b>${[100,125,150,200][A.z]}%</b> <button class="b b2" data-a=zm aria-label="Diminuir texto">A−</button> <button class="b b2" data-a=zp aria-label="Aumentar texto">A+</button></p><div class=row style="justify-content:flex-start;gap:24px">${[['hc','Alto contraste'],['hf','Fonte legível, sem maiúsculas'],['sp','Mais espaçamento'],['nb','Ocultar ilustração'],['vz','Ler em voz alta (mouse e teclado)']].map(([k,l])=>`<label class=r><input type=checkbox data-a=tg data-k=${k} ${A[k]?'checked':''}>${l}</label>`).join('')}</div></section>`;
/* Leitura em voz alta (Web Speech API) */
const VS='h1,h2,h3,p,li,th,td,label,button,a,select,input,img,.st,.al,.ey,.big,.bd,.lk';let vt,vl=null,lv='';
function vc(){return window.speechSynthesis?speechSynthesis.getVoices():[]}
function ut(t){const u=new SpeechSynthesisUtterance(t),vs=vc();u.lang='pt-BR';u.voice=vs.find(x=>x.lang=='pt-BR')||vs.find(x=>x.lang.startsWith('pt'))||null;return u}
function say(t,q){if(!t||!window.speechSynthesis)return;if(!q)speechSynthesis.cancel();speechSynthesis.speak(ut(t))}
function rt(el){if(el.matches('label')){const c=el.querySelector('input,select');if(c)return rt(c)}
 let t;if(el.matches('input,select')){const l=el.closest('label');let n='';if(l){const c=l.cloneNode(true);c.querySelectorAll('input,select').forEach(x=>x.remove());n=c.textContent}else n=el.getAttribute('aria-label')||el.placeholder||el.name||'';n=n.replace(/\s+/g,' ').trim();
  t=el.type=='checkbox'||el.type=='radio'?n+(el.checked?', marcado':', desmarcado'):el.tagName=='SELECT'?n+', selecionado: '+el.selectedOptions[0].text:n+(el.value?': '+el.value:', campo vazio')}
 else{const c=el.cloneNode(true);c.querySelectorAll('select,svg,option').forEach(x=>x.remove());c.querySelectorAll('br,div,p,li,td,th,small,button,span').forEach(x=>x.insertAdjacentText('afterend',' '));t=(el.getAttribute('aria-label')||el.getAttribute('alt')||c.textContent).replace(/\s+/g,' ').trim()}
 return t.slice(0,400)}
function sayAll(){if(!window.speechSynthesis)return;speechSynthesis.cancel();[...$('main').querySelectorAll('h1,h2,h3,p,li,tr,label,.st,.al')].forEach(el=>{if(el.closest('td p,td li'))return;const t=rt(el);if(t)say(t,1)})}
const vo=e=>{if(!A.vz)return;const el=e.target.closest&&e.target.closest(VS);if(!el||el==vl)return;vl=el;clearTimeout(vt);vt=setTimeout(()=>say(rt(el)),e.type=='mouseover'?250:0)};
document.addEventListener('mouseover',vo);document.addEventListener('focusin',vo);document.addEventListener('pointerdown',e=>{if(e.pointerType=='touch')vo(e)});
document.addEventListener('mouseout',e=>{if(!e.relatedTarget||!vl||!vl.contains(e.relatedTarget))vl=null});document.addEventListener('focusout',()=>vl=null);
if(window.speechSynthesis)speechSynthesis.getVoices();
