/* ===== Telas ===== */
const tl=o=>{const f=o.dest=='otica'?'Ótica: '+opt(o.opt).name+' ('+o.optSt+')':o.dest=='direta'?(o.kind=='reparo'?'Devolvido ao aluno':'Entrega direta'):'Destino a definir';
return`<div class=tl>${[['Aceito','Matemática: medidas'],['Modelando','Engenharia: projeto 3D'],['Imprimindo 3D','Tecnologia'],['Acabamento','Ciência: materiais'],[f,'']].map(([l,t],i)=>`<div class="st ${i<o.stage?'d':''} ${i+1==o.stage?'cu':''}"><i>${i+1}</i>${esc(l)}<br><small class=mu>${t}</small></div>`).join('')}</div>${o.stage?'':'<p class=mu>Aguardando aceite da equipe.</p>'}`};
const cost=o=>o.lens?`${R(o.lens.cost)} (lentes ${o.lens.type} · ${esc(opt(o.lens.opt).name)})`:o.kind=='reparo'?'R$ 0,00 · conserto gratuito':'R$ 0,00 · armação gratuita';
const ttl=o=>o.kind=='reparo'?'Conserto: '+esc(o.dmg):'Armação nova';
const mts=(o,can)=>o.mt.length?`<p><b>Manutenções:</b></p>${o.mt.map((m,i)=>`<div class=row><span>${esc(m.t)} ${m.done?'<span class="bd gr">Concluída</span>':'<span class="bd or">Aberta</span>'}</span>${can&&!m.done?`<button class="b b2" data-a=mt data-id=${o.id} data-i=${i}>Concluir</button>`:''}</div>`).join('')}`:'';
const FT=['a2959bc246296','70715920ab20f8','30b1de04e37988','5e44623d098ae8'],MW='https://makerworld.bblmw.com/makerworld/model/US8c8390e2d6b5fd/design/2025-07-09_',PH='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#EAF2FA"/><g fill="none" stroke="#1769E0" stroke-width="8"><rect x="70" y="110" width="110" height="90" rx="14"/><rect x="220" y="110" width="110" height="90" rx="14"/><path d="M180 135h40M70 130L40 118M330 130l30-12"/></g></svg>');
function fb(im){im.onerror=null;im.src=PH}
const odt=n=>`<span class="odt ods-cor-${n}">ODS ${n==12?'12.5':n}</span>`;
const selo='<img class=selo src="img/selo-otica-parceira.svg" alt="Selo Ótica Parceira Pega a Visão" width=56 height=56>';

/* ===== Conteúdo das páginas =====
   Os textos e a estrutura de cada página ficam no HTML (<template id="pagina">, em cada .html).
   Aqui ficam só os trechos que dependem de dados (listas, tabelas, números).
   SL[página]() devolve esses trechos; no HTML eles entram em <!--nome--> (blocos) e {{nome}} (valores). */
const SL={
aluno(){const s=DB.students.find(x=>x.userId==me.id),os=DB.orders.filter(o=>o.sid==s.id),ns=DB.notes.filter(n=>n.to==me.id);
return{semPedidos:!os.length,semNotas:!ns.length,
notas:ns.map(n=>`<p style="margin:4px 0">${esc(n.t)} <small class=mu>${n.d}</small></p>`).join(''),
pedidos:os.map(o=>`<div class=c><div class=row><h3>Pedido ${o.id} · ${ttl(o)}</h3><span class="bd s${o.stage}">${S[o.stage]}</span></div>${tl(o)}<p><b>Custo para a família:</b> ${cost(o)}</p>${o.stage==5&&o.kind=='reparo'?`<p class=al>${odt(12)} Seu óculos ganhou uma nova vida: menos um resíduo no mundo.</p>`:''}${o.team?`<p class=mu>Produzido pela ${esc(o.team)} da oficina.</p>`:''}${mts(o)}<form class=row data-f=mt data-id=${o.id}><input name=t placeholder="Descreva um ajuste ou reparo" required style="flex:1 1 220px;width:auto"><button class="b b2">Pedir manutenção</button></form></div>`).join('')}},
pedir(){return{oticas:DB.opticians.map(o=>`<option value=${o.id}>${esc(o.name)}</option>`).join(''),lentes:LT.map(t=>`<option>${t}</option>`).join('')}},
admin(){const pend=DB.users.filter(u=>!u.ok);
return{pendentes:pend.map(u=>`<div class=row><span>${esc(u.name)} · ${esc(u.role)} · ${esc(u.email)}</span><button class=b data-a=ok data-id=${u.id}>Aceitar cadastro</button></div>`).join(''),
linhas:DB.orders.map(o=>`<tr><td>${o.id}<br><small class=mu>${ttl(o)}</small></td><td>${esc(stu(o.sid).name)}</td><td>${o.stage?`<select data-a=st data-id=${o.id}>${S.slice(1).map((x,i)=>`<option value=${i+1} ${o.stage==i+1?'selected':''}>${x}</option>`).join('')}</select>`:`<button class=b data-a=acc data-id=${o.id}>Aceitar pedido</button>`}</td><td><input data-a=tm data-id=${o.id} value="${esc(o.team||'')}" placeholder="Nome da equipe" aria-label="Equipe da oficina"></td><td>${o.lens?cost(o):'Sem lentes'}</td><td>${o.stage?`${o.dest?`<p style="margin:0 0 6px"><b>${o.dest=='otica'?'Ótica ('+o.optSt+')':'Entrega direta'}</b></p>`:''}<button class="b b2" data-a=dst data-d=direta data-id=${o.id}>${o.kind=='reparo'?'Devolver ao Aluno':'Entrega Direta ao Aluno'}</button>${o.lens?` <button class="b b2" data-a=dst data-d=otica data-id=${o.id}>Encaminhar para ${esc(opt(o.lens.opt).name)}</button>`:''}`:'—'}${mts(o,1)}</td></tr>`).join('')}},
escola(){const ss=DB.students.filter(s=>s.school==me.school);
return{recebidos:ss.filter(x=>DB.orders.some(o=>o.sid==x.id&&o.stage==5)).length,total:ss.length,
linhas:ss.map(x=>{const o=DB.orders.find(y=>y.sid==x.id);return`<tr><td>${esc(x.name)}</td><td>${esc(x.turma)}</td><td>${esc(x.sit)}</td><td>${o?`${ttl(o)} <span class="bd s${o.stage}">${S[o.stage]}</span>`:'Sem pedido'}</td><td>${o?cost(o):'—'}</td><td>${o&&o.dest?(o.dest=='otica'?'Ótica ('+o.optSt+')':'Direta'):'—'}</td></tr>`}).join('')}},
otica(){const o1=opt(me.opt),os=DB.orders.filter(o=>o.opt==me.opt);
return{semArmacoes:!os.length,addr:esc(o1.addr),tel:esc(o1.tel),
linhas:os.map(o=>`<tr><td>${o.id}</td><td>${esc(stu(o.sid).name)}</td><td>${cost(o)}</td><td>${o.optSt}${mts(o,1)}</td><td>${o.optSt=='entregue'?'':`<button class=b data-a=os data-id=${o.id}>${o.optSt=='pendente'?'Confirmar Montagem':'Registrar Entrega'}</button>`}</td></tr>`).join(''),
precos:LT.map(t=>`<label style="flex:1 1 140px">${t}<input name=${t} type=number min=0 step=0.01 value=${o1.lens[t]}></label>`).join('')}},
opts(){return{semOticas:!DB.opticians.length,oticas:DB.opticians.map(o=>`<div><div class=row style="justify-content:flex-start"><h3 style="margin:0">${esc(o.name)}</h3>${selo}</div><p class=mu>${esc(o.addr)}${o.tel?'<br>'+esc(o.tel):''}</p><button class="b b2" data-a=go data-v=optp data-id=${o.id}>Ver perfil</button></div>`).join('')}},
optp(id){const o=opt(id);return{nome:esc(o.name),contato:[o.addr,o.tel].filter(Boolean).map(esc).join(' · '),lentes:LT.map(t=>`<div class=row><span>${t}</span><b>${R(o.lens[t])}</b></div>`).join('')}}};

/* Monta a página atual: pega o <template id="pagina">, troca as marcas pelos dados e devolve os elementos prontos */
function pagina(){const t=$('#pagina'),sl=(SL[v]||(()=>({})))(pid),r=API.report(),c=Object.assign({},r,sl),tp=document.createElement('template');
tp.innerHTML=(t?t.innerHTML:'').replace(/<!--\s*(\w+)\s*-->/g,(m,k)=>k in sl?sl[k]:m).replace(/\{\{\s*(\w+)\s*\}\}/g,(m,k)=>k in sl?sl[k]:m);
const f=tp.content;
f.querySelectorAll('[data-visitante]').forEach(e=>{if(me)e.remove()});
f.querySelectorAll('[data-se]').forEach(e=>{if(!c[e.dataset.se])e.remove()});
f.querySelectorAll('[data-r]').forEach(e=>{e.textContent=e.dataset.r.replace(/\w+/g,k=>k=='rev'?R(r.rev):k in r?r[k]:k)});
f.querySelectorAll('[data-pre]').forEach(e=>{e.value=pre});
f.querySelectorAll('input[data-pk]').forEach(e=>{e.checked=e.value==pk});
return f}
let pid=new URLSearchParams(location.search).get('id'),pre='';
const menu=()=>{const r=me&&me.role,o=[['home','Início'],['#projeto','O Projeto'],['#como','Como funciona'],['#oculos','Nossos óculos'],['#ods','ODS']];if(r=='aluno')o.push(['aluno','Meus Pedidos']);if(r=='admin')o.push(['admin','Oficina de Produção']);o.push(['opts','Óticas Parceiras']);if(r=='escola')o.push(['escola','Painel Escola']);if(r=='otica')o.push(['otica','Painel da Ótica']);if(!me)o.push(['login','Entrar'],['reg','Cadastro']);else o.push(['out','Sair']);return o};
function render(){const fo=document.activeElement,fk=fo&&fo.dataset&&['ap','zm','zp','tg','rd','rs','th','rp','vp'].includes(fo.dataset.a)?`[data-a=${fo.dataset.a}]${fo.dataset.k?`[data-k=${fo.dataset.k}]`:''}`:null;$('#app').innerHTML=`<header><a class=brand href="index.html" aria-label="Pega a Visão, página inicial"><img src="img/logo.png" alt="" width=48 height=48><b>Pega a Visão</b></a><nav>${menu().map(([k,l])=>k[0]=='#'?`<a href="index.html${k}">${l}</a>`:`<button class="${k==v?'on':''}" data-a=${k=='out'?'out':'go'} data-v=${k}>${l}</button>`).join('')}<button data-a=ap aria-expanded="${!!ap}">Acessibilidade</button>${window.flags?flags():''}</nav></header>${ap?apv():''}<main>${me?`<div class="mu row"><span>Logado como ${esc(me.name)} (${me.role})</span></div>`:''}${msg?`<div class="al ${/Sem|inválid|já|aguard|outra/.test(msg)?'er':''}" role=alert>${esc(msg)}</div>`:''}<div id=pg></div><p class=mu style="text-align:center">Protótipo · os dados ficam salvos apenas neste navegador</p></main>`;$('#pg').replaceWith(pagina());window.trn&&trn();if(v=='pedir')upd();pz(1);window.mount3d&&mount3d();if(fk){const n=$(fk);if(n)n.focus()}const h=$('h1'),tx=[v!=lv&&h?h.innerText:'',msg].filter(Boolean).join('. ');lv=v;if(A.vz&&tx)say(tx)}

function upd(){const f=$('#of').elements,rp=f.kind.value=='reparo',y=!rp&&f.lens.value=='1';$('#kr').hidden=!rp;$('#kn').hidden=rp;$('#lx').hidden=!y;const op=opt(f.op.value);$('#cost').textContent=y&&op?R(op.lens[f.lt.value]):'R$ 0,00'}
const home=r=>({aluno:'aluno',admin:'admin',escola:'escola',otica:'otica'}[r]);
function act(fn){try{fn();save()}catch(x){msg=typeof x=='string'?x:'Erro: '+x.message}render()}
document.addEventListener('click',e=>{const a=e.target.closest('[data-a]');if(!a)return;const d=a.dataset,k=d.a;if(k=='st'||k=='tm')return;
act(()=>{msg='';if(k=='go'){location.href=PG[d.v]+(d.id?'?id='+d.id:'')+(d.k?(d.id?'&':'?')+'k='+d.k:'')}else if(k=='out'){me=null;try{sessionStorage.removeItem('pvs')}catch(e){}location.href=PG.home}
else if(k=='ap')ap=!ap;else if(k=='zp'||k=='zm'){A.z=Math.max(0,Math.min(3,A.z+(k=='zp'?1:-1)));ay()}else if(k=='tg'){A[d.k]=+!A[d.k];ay();if(d.k=='vz'&&!A.vz&&window.speechSynthesis)speechSynthesis.cancel()}else if(k=='rp')sayAll();else if(k=='vp'){if(window.speechSynthesis)speechSynthesis.cancel()}else if(k=='rd'){A={...A,z:2,hf:1,sp:1,nb:1};ay()}else if(k=='rs'){A={z:0,hc:0,hf:0,sp:0,nb:0,vz:0};ay()}else if(k=='fill'){pre=d.e}else if(k=='ok')API.approve(d.id);else if(k=='acc')API.stage(d.id,1);else if(k=='dst')API.dest(d.id,d.d);else if(k=='os')API.optStep(d.id);else if(k=='mt')API.doneMt(d.id,+d.i)})});
document.addEventListener('change',e=>{if(e.target.closest('#of'))return upd();const a=e.target.dataset.a;if(a=='st')act(()=>API.stage(e.target.dataset.id,e.target.value));if(a=='tm')act(()=>API.team(e.target.dataset.id,e.target.value))});
document.addEventListener('submit',e=>{e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f)),k=f.dataset.f;act(()=>{msg='';
if(k=='login'){me=API.login(d.e,d.p);try{sessionStorage.setItem('pvs',me.id)}catch(e){}location.href=PG[home(me.role)]}else if(k=='reg'){flash(API.register(d)?'Conta de administrador criada! Você já pode entrar.':'Solicitação enviada! Aguarde o aceite do administrador.');location.href=PG.login}
else if(k=='ord'){API.newOrder(d);flash('Solicitação enviada para a equipe da oficina.');location.href=PG.aluno}else if(k=='mt'){API.maint(f.dataset.id,d.t);msg='Manutenção solicitada.'}
else if(k=='stu')API.addStudent(d);else if(k=='price'){API.price(d);msg='Valores atualizados.'}})});
ay();if(ROLE[v]&&(!me||me.role!=ROLE[v])){flash('Faça login para acessar esta página.');location.replace(PG.login)}else{render();if(location.hash){const t=document.getElementById(location.hash.slice(1));if(t)t.scrollIntoView()}}
