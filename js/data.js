const S=["Solicitado","Aceito","Modelando","Imprimindo 3D","Acabamento","Concluído"],LT=["Monofocal","Multifocal","Antirreflexo"],PET=12;
const seed=()=>({n:1,notes:[],users:[],opticians:[],students:[],orders:[]});
let DB;try{DB=JSON.parse(localStorage.getItem('pv3'))}catch(e){}if(!DB)DB=seed();
const save=()=>{try{localStorage.setItem('pv3',JSON.stringify(DB))}catch(e){}};
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const R=n=>'R$ '+Number(n).toFixed(2).replace('.',','),stu=i=>DB.students.find(s=>s.id==i),opt=i=>DB.opticians.find(o=>o.id==i),ord=i=>DB.orders.find(o=>o.id==i);
let pk=new URLSearchParams(location.search).get('k')||'nova',me=null,v=document.body.dataset.page||'home',msg='';
try{const sid=sessionStorage.getItem('pvs');me=sid?DB.users.find(u=>u.id==sid)||null:null;msg=sessionStorage.getItem('pvm')||'';sessionStorage.removeItem('pvm')}catch(e){}
const chk=(...r)=>{if(!me||!r.includes(me.role))throw'Sem permissão para esta ação'};
const note=(o,t)=>{const s=stu(o.sid);if(s&&s.userId)DB.notes.unshift({to:s.userId,t,d:new Date().toLocaleString('pt-BR')})};
/* ===== "Backend" simulado: regras de negócio e permissões ===== */
const API={
login(e,p){const u=DB.users.find(x=>x.email==e.trim()&&x.pw==p);if(!u)throw'E-mail ou senha inválidos';if(!u.ok)throw'Cadastro aguardando aceite do administrador';return u},
register(d){if(DB.users.some(x=>x.email==d.email))throw'E-mail já cadastrado';const first=!DB.users.length,id='u'+DB.n++,role=first?'admin':d.role;DB.users.push({id,name:d.name,email:d.email,pw:d.pw,role,school:d.org,ok:first?1:0,opt:null});if(role=='aluno')DB.students.push({id:'s'+DB.n++,name:d.name,turma:'[a definir]',sit:'Sem óculos',userId:id,school:d.org||'—'});return first},
approve(id){chk('admin');const u=DB.users.find(x=>x.id==id);u.ok=1;if(u.role=='otica'&&!u.opt){const o='o'+DB.n++;DB.opticians.push({id:o,name:u.school||u.name,addr:'',tel:'',lens:{Monofocal:0,Multifocal:0,Antirreflexo:0}});u.opt=o}},
addStudent(d){chk('escola');DB.students.push({id:'s'+DB.n++,name:d.name,turma:d.turma,sit:d.sit,school:me.school})},
newOrder(d){chk('aluno');if(d.lens=='1'&&d.kind!='reparo'&&!opt(d.op))throw'Nenhuma ótica parceira disponível';const s=DB.students.find(x=>x.userId==me.id),rp=d.kind=='reparo';if(!rp&&!(d.a&&d.b&&d.c))throw'Informe as três medidas ergonômicas';
 const o={id:'P'+String(DB.n++).padStart(3,'0'),sid:s.id,kind:d.kind,team:'',stage:0,lens:null,dest:null,opt:null,optSt:null,mt:[]};
 if(rp)o.dmg=d.dmg+(d.obs?': '+d.obs:'');else{o.m=[d.a,d.b,d.c];if(d.lens=='1')o.lens={type:d.lt,cost:opt(d.op).lens[d.lt],opt:d.op}}DB.orders.push(o)},
team(id,t){chk('admin');ord(id).team=t},
stage(id,st){chk('admin');const o=ord(id);o.stage=+st;note(o,`Pedido ${o.id}: etapa "${S[o.stage]}"`)},
dest(id,d){chk('admin');const o=ord(id);if(d=='otica'&&!o.lens)throw'Pedido sem lentes: apenas entrega direta';o.dest=d;o.opt=d=='otica'?o.lens.opt:null;o.optSt=d=='otica'?'pendente':null;note(o,`Pedido ${o.id}: `+(d=='otica'?'encaminhado à '+opt(o.opt).name:'entrega direta ao aluno'))},
optStep(id){chk('otica');const o=ord(id);if(o.opt!=me.opt)throw'Pedido de outra ótica';o.optSt=o.optSt=='pendente'?'montada':'entregue';note(o,`Pedido ${o.id}: lentes ${o.optSt}`)},
price(d){chk('otica');opt(me.opt).addr=d.addr||'';opt(me.opt).tel=d.tel||'';LT.forEach(t=>opt(me.opt).lens[t]=+d[t])},
maint(id,t){chk('aluno');ord(id).mt.push({t,done:0})},
doneMt(id,i){chk('admin','otica');ord(id).mt[i].done=1},
report(){const a=DB.orders.filter(o=>o.stage>0),n=a.filter(o=>o.kind!='reparo'),r=a.filter(o=>o.kind=='reparo'),op=DB.orders.filter(o=>o.dest=='otica');return{tot:DB.orders.length,acc:a.length,imp:DB.orders.filter(o=>o.stage==3).length,nv:n.length,rp:r.length,rpd:r.filter(o=>o.stage==5).length,pet:n.length*PET+r.length*3,dir:DB.orders.filter(o=>o.dest=='direta').length,ot:op.length,rev:op.reduce((x,o)=>x+o.lens.cost,0),eq:new Set(DB.orders.map(o=>o.team).filter(Boolean)).size}}};

/* Mapa de páginas e perfis permitidos */
const PG={home:'index.html',login:'login.html',reg:'cadastro.html',aluno:'estudante.html',pedir:'pedir.html',admin:'admin.html',rel:'relatorios.html',escola:'escola.html',otica:'otica-painel.html',opts:'oticas.html',optp:'otica-perfil.html'};
const ROLE={aluno:'aluno',pedir:'aluno',admin:'admin',rel:'admin',escola:'escola',otica:'otica'};
const flash=t=>{try{sessionStorage.setItem('pvm',t)}catch(e){}};

/* ===== ODS do projeto (edite os textos aqui) ===== */
const ODS=[
{n:4,c:'#C5192D',f:'#FFFFFF',t:'Educação de Qualidade',lb:'Objetivo',m:'Assegurar a educação inclusiva e equitativa e de qualidade, e promover oportunidades de aprendizagem ao longo da vida para todos.',p:['Armações e consertos gratuitos para estudantes que precisam enxergar bem para aprender.','Oficina STEM feita pelos próprios estudantes, com um problema real da comunidade.','Painel da escola para acompanhar cada estudante atendido.']},
{n:12,meta:'12.5',c:'#BF8B2E',f:'#16222E',t:'Consumo e Produção Responsáveis',lb:'Meta 12.5',m:'Até 2030, reduzir substancialmente a geração de resíduos por meio da prevenção, redução, reciclagem e reuso.',p:['Reciclagem: as armações usam filamento de baixo custo.','Reuso: óculos quebrados são consertados com peças impressas em 3D, em vez de irem para o lixo.','Prevenção: a impressão 3D sob demanda produz só o que foi pedido, sem desperdício.']}];
