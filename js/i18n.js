/* ===== Idioma: Português (padrão) e English =====
   O site é escrito em português. Quando o idioma é "en", este arquivo traduz o que aparece
   na tela (textos, placeholders, aria-label, alt, title) logo após cada render, sem mexer nos dados salvos.
   Para ajustar um texto em inglês, edite o dicionário D abaixo. */
(function(){
var LS='pvl',LANG='pt';
try{if(localStorage.getItem(LS)=='en')LANG='en'}catch(e){}
window.LANG=LANG;
var T0=document.title;

var D=Object.assign(Object.create(null),{
/* menu e geral */
'Início':'Home','O Projeto':'The Project','Como funciona':'How it works','Nossos óculos':'Our glasses','ODS':'SDGs',
'Meus Pedidos':'My Requests','Oficina de Produção':'Production Workshop','Óticas Parceiras':'Partner Optical Shops',
'Painel Escola':'School Dashboard','Painel da Ótica':'Optical Shop Dashboard','Entrar':'Sign in','Cadastro':'Sign up','Sair':'Sign out',
'Acessibilidade':'Accessibility','Pega a Visão, página inicial':'Pega a Visão, home page',
'Protótipo · os dados ficam salvos apenas neste navegador':'Prototype · data is saved only in this browser',
'IMPRESSÃO':'PRINTING','CONCLUÍDO':'DONE','—':'—',
/* títulos de página */
'Início · Pega a Visão':'Home · Pega a Visão','Entrar · Pega a Visão':'Sign in · Pega a Visão','Cadastro · Pega a Visão':'Sign up · Pega a Visão',
'Oficina de Produção · Pega a Visão':'Production Workshop · Pega a Visão','Painel da Escola · Pega a Visão':'School Dashboard · Pega a Visão',
'Painel da Ótica · Pega a Visão':'Optical Shop Dashboard · Pega a Visão','Painel do Estudante · Pega a Visão':'Student Dashboard · Pega a Visão',
'Perfil da Ótica · Pega a Visão':'Optical Shop Profile · Pega a Visão','Relatórios · Pega a Visão':'Reports · Pega a Visão',
'Solicitar apoio · Pega a Visão':'Request support · Pega a Visão','Óticas Parceiras · Pega a Visão':'Partner Optical Shops · Pega a Visão',
/* home */
'Projeto escolar · STEM · sustentável':'School project · STEM · sustainable',
'Enxergar bem para':'See well to','aprender melhor':'learn better',
'O Pega a Visão fabrica armações ecológicas com filamento de baixo custo, em uma oficina de impressão 3D feita pela própria escola.':'Pega a Visão makes eco-friendly frames from low-cost filament, in a 3D printing workshop run by the school itself.',
'Conheça o projeto':'Discover the project','Área do projeto':'Project area',
'Modelo 3D dos óculos do projeto girando. Arraste para girar.':'Rotating 3D model of the project glasses. Drag to rotate.',
'Óculos do projeto impresso em 3D':'The project’s 3D-printed glasses','Logo do Projeto Pega a Visão':'Pega a Visão project logo',
'O projeto':'The project','Por que o Pega a Visão existe':'Why Pega a Visão exists',
'Estudantes com necessidade de correção visual enfrentam dificuldades para ler, prestar atenção e aprender quando não têm óculos adequados. Para muitas famílias, o custo de uma armação nova é alto e, quando os óculos quebram, o conserto demora ou nem acontece.':'Students who need vision correction struggle to read, pay attention and learn when they do not have suitable glasses. For many families, a new frame is expensive and, when glasses break, repairs take a long time or never happen.',
'O projeto nasce na escola como uma iniciativa de aprendizagem STEM: os próprios estudantes da oficina produzem armações ecológicas, duráveis e ergonômicas com filamento de baixo custo e imprimem peças para consertar os óculos quebrados de quem já tem.':'The project was born at school as a STEM learning initiative: the workshop students themselves produce eco-friendly, durable and ergonomic frames from low-cost filament, and print parts to repair the broken glasses of those who already have them.',
'Nossos objetivos':'Our goals',
'Reduzir o custo':'Reduce the cost','dos óculos novos para as famílias.':'of new glasses for families.',
'Ajudar na manutenção':'Help with maintenance','de estudantes que já têm óculos e estão quebrados.':'for students who already have glasses that are broken.',
'Promover a aprendizagem STEM':'Promote STEM learning','com um problema real da comunidade.':'with a real community problem.',
'Do pedido à entrega':'From request to delivery',
'Todo o acompanhamento fica em um só lugar, e o estudante vê em que etapa está o seu pedido de armação nova ou de conserto.':'All tracking happens in one place, and students can see which stage their new frame or repair request is in.',
'Pedido.':'Request.','O estudante ou o responsável pede uma armação nova ou o conserto de um óculos quebrado.':'The student or guardian requests a new frame or the repair of broken glasses.',
'Aceitação.':'Acceptance.','A equipe avalia o pedido e as medidas informadas.':'The team reviews the request and the measurements provided.',
'Modelagem.':'Modeling.','A armação ou a peça de reparo é ajustada no computador.':'The frame or repair part is adjusted on the computer.',
'Impressão 3D.':'3D printing.','A peça é impressa com filamento de baixo custo.':'The part is printed with low-cost filament.',
'Acabamento.':'Finishing.','A equipe revisa e finaliza a peça.':'The team checks and finishes the part.',
'Entrega.':'Delivery.','A armação vai direto ao estudante ou, se houver interesse em lentes com receita, para uma ótica parceira, com os custos das lentes informados antes.':'The frame goes straight to the student or, if prescription lenses are wanted, to a partner optical shop, with the lens costs shared beforehand.',
'O projeto não faz diagnóstico: estudantes com sinais de dificuldade para enxergar devem ser encaminhados à família e a um profissional de saúde.':'The project does not provide diagnoses: students showing signs of difficulty seeing should be referred to their family and a health professional.',
'Aprender fazendo':'Learning by doing','STEM na prática':'STEM in practice',
'Ciência':'Science','Reciclagem e propriedades do PET como material.':'Recycling and the properties of PET as a material.',
'Tecnologia':'Technology','Modelagem e impressão 3D.':'3D modeling and printing.',
'Engenharia':'Engineering','Projeto de uma armação ergonômica e durável.':'Design of an ergonomic, durable frame.',
'Matemática':'Mathematics','Medidas do rosto, escalas e ajuste de tamanho.':'Face measurements, scales and size adjustment.',
'Armações feitas na oficina':'Frames made in the workshop',
'As armações são impressas em 3D com um mecanismo dobrável que já sai montado da impressora, existe uma versão menor, em 80% do tamanho, para rostos infantis, e há opção de encaixar lentes reais.':'The frames are 3D printed with a folding mechanism that comes out of the printer already assembled, there is a smaller version at 80% of the size for children’s faces, and real lenses can be fitted.',
'Foto do modelo Style Frame Glasses impresso em 3D':'Photo of the 3D-printed Style Frame Glasses model',
'Impacto':'Impact','Resultados até agora':'Results so far',
'armações produzidas para estudantes':'frames produced for students','óculos consertados, que deixaram de virar lixo':'glasses repaired, kept out of the trash',
'garrafas PET recicladas (estimativa)':'PET bottles recycled (estimate)',
/* ODS */
'Agenda 2030':'2030 Agenda','Nossas ODS':'Our SDGs',
'O Pega a Visão contribui com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU, em especial com a':'Pega a Visão contributes to the UN Sustainable Development Goals (SDGs), especially',
'ODS 3 (nosso objetivo principal)':'SDG 3 (our main goal)',', além das ODS 4 e 12.':', in addition to SDGs 4 and 12.',
'ODS principal':'Main SDG','Como contribuímos':'How we contribute','Objetivo:':'Goal:','Meta 12.5:':'Target 12.5:',
'Saúde e Bem-Estar':'Good Health and Well-Being','Educação de Qualidade':'Quality Education','Consumo e Produção Responsáveis':'Responsible Consumption and Production',
'Assegurar uma vida saudável e promover o bem-estar para todos, em todas as idades.':'Ensure healthy lives and promote well-being for all at all ages.',
'Assegurar a educação inclusiva e equitativa e de qualidade, e promover oportunidades de aprendizagem ao longo da vida para todos.':'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.',
'Até 2030, reduzir substancialmente a geração de resíduos por meio da prevenção, redução, reciclagem e reuso.':'By 2030, substantially reduce waste generation through prevention, reduction, recycling and reuse.',
'Armações e consertos gratuitos para que estudantes possam corrigir a visão e cuidar da saúde visual.':'Free frames and repairs so students can correct their vision and look after their eye health.',
'Encaminhamento a óticas parceiras para lentes com receita, com os custos informados antes às famílias.':'Referral to partner optical shops for prescription lenses, with costs shared with families beforehand.',
'Acompanhamento de cada estudante atendido pelo painel da escola.':'Each student supported is tracked through the school dashboard.',
'Armações e consertos gratuitos para estudantes que precisam enxergar bem para aprender.':'Free frames and repairs for students who need to see well in order to learn.',
'Oficina STEM feita pelos próprios estudantes, com um problema real da comunidade.':'A STEM workshop run by the students themselves, tackling a real community problem.',
'Painel da escola para acompanhar cada estudante atendido.':'A school dashboard to follow each student supported.',
'Reciclagem: as armações usam filamento de baixo custo.':'Recycling: the frames use low-cost filament.',
'Reuso: óculos quebrados são consertados com peças impressas em 3D, em vez de irem para o lixo.':'Reuse: broken glasses are repaired with 3D-printed parts instead of going to the trash.',
'Prevenção: a impressão 3D sob demanda produz só o que foi pedido, sem desperdício.':'Prevention: on-demand 3D printing makes only what was requested, with no waste.',
/* login e cadastro */
'Entre para acompanhar pedidos ou gerenciar a oficina.':'Sign in to follow requests or manage the workshop.',
'E-mail':'Email','Senha':'Password','Ainda não tem conta?':'Don’t have an account yet?','Solicitar cadastro':'Request an account',
'Primeiro acesso: a primeira conta criada neste navegador vira a administradora da oficina.':'First access: the first account created in this browser becomes the workshop administrator.',
'O acesso é liberado após o aceite do administrador.':'Access is granted after the administrator approves it.',
'Nome':'Name','Perfil':'Role','Estudante / Responsável':'Student / Guardian','Professor / Escola':'Teacher / School','Ótica Parceira':'Partner Optical Shop',
'Escola ou ótica':'School or optical shop','Enviar solicitação':'Submit request',
/* estudante */
'Painel do Estudante':'Student Dashboard','Consertar meu óculos':'Repair my glasses','Solicitar armação nova':'Request a new frame',
'Custo para a família:':'Cost to the family:','Seu óculos ganhou uma nova vida: menos um resíduo no mundo.':'Your glasses got a new life: one less piece of waste in the world.',
'Descreva um ajuste ou reparo':'Describe an adjustment or repair','Pedir manutenção':'Request maintenance','Nenhum pedido ainda.':'No requests yet.',
'Notificações':'Notifications','Sem notificações.':'No notifications.','Aguardando aceite da equipe.':'Waiting for the team to accept.',
'Manutenções:':'Maintenance:','Concluída':'Done','Aberta':'Open','Concluir':'Mark as done',
'Aceito':'Accepted','Matemática: medidas':'Math: measurements','Modelando':'Modeling','Engenharia: projeto 3D':'Engineering: 3D design',
'Imprimindo 3D':'3D printing','Acabamento':'Finishing','Ciência: materiais':'Science: materials','Solicitado':'Requested','Concluído':'Completed',
'Devolvido ao aluno':'Returned to the student','Entrega direta':'Direct delivery','Destino a definir':'Destination to be defined',
'Armação nova':'New frame','R$ 0,00 · conserto gratuito':'R$ 0,00 · free repair','R$ 0,00 · armação gratuita':'R$ 0,00 · free frame',
/* pedir */
'Solicitar apoio':'Request support','Armação e conserto são gratuitos para estudantes do projeto.':'Frames and repairs are free for students in the project.',
'O que você precisa?':'What do you need?','Armação nova (não tenho óculos ou preciso trocar)':'New frame (I don’t have glasses or need a replacement)',
'Meu óculos quebrou (conserto)':'My glasses broke (repair)','O que quebrou?':'What broke?','Dano':'Damage',
'Haste quebrada':'Broken temple arm','Ponte quebrada':'Broken bridge','Armação rachada':'Cracked frame','Dobradiça ou parafuso solto':'Loose hinge or screw','Outro':'Other',
'Observação (opcional)':'Note (optional)','Entregue o óculos na escola para a oficina avaliar e imprimir a peça.':'Hand the glasses in at school so the workshop can assess them and print the part.',
'Medidas ergonômicas':'Ergonomic measurements','Largura do rosto (mm)':'Face width (mm)','Distância entre os olhos (mm)':'Distance between the eyes (mm)','Comprimento da haste (mm)':'Temple arm length (mm)',
'Lentes com receita (opcional)':'Prescription lenses (optional)','Só a armação (sem custo)':'Frame only (no cost)','Incluir lentes em uma ótica parceira':'Add lenses at a partner optical shop',
'Ótica':'Optical shop','Tipo de lente':'Lens type','Custo das lentes para a família':'Lens cost to the family','Voltar ao painel':'Back to dashboard',
'Monofocal':'Single vision','Multifocal':'Multifocal','Antirreflexo':'Anti-reflective',
/* admin */
'Relatórios':'Reports','Cadastros pendentes':'Pending sign-ups','Aceitar cadastro':'Approve account',
'Pedido':'Request','Estudante':'Student','Etapa':'Stage','Equipe da oficina':'Workshop team','Lentes / custo':'Lenses / cost','Destinação':'Destination',
'Aceitar pedido':'Accept request','Nome da equipe':'Team name','Sem lentes':'No lenses','Devolver ao Aluno':'Return to the Student','Entrega Direta ao Aluno':'Direct Delivery to the Student',
/* relatórios */
'Relatórios e Impacto':'Reports and Impact','Voltar à oficina':'Back to the workshop','Armações novas produzidas':'New frames produced',
'Consertos aceitos / concluídos':'Repairs accepted / completed','Garrafas PET recicladas (estimativa)':'PET bottles recycled (estimate)',
'Equipes da oficina ativas (STEM)':'Active workshop teams (STEM)','Em impressão 3D':'Being 3D printed','Entregas diretas':'Direct deliveries',
'Encaminhados a óticas':'Referred to optical shops','Custo de lentes assumido pelas famílias':'Lens costs covered by families',
'As etiquetas ODS mostram qual objetivo cada indicador ajuda a comprovar.':'The SDG tags show which goal each indicator helps to demonstrate.',
/* escola */
'Painel da Escola':'School Dashboard','Cadastrar estudante com necessidade visual':'Register a student with a vision need','Turma':'Class','Cadastrar':'Register',
'Sem óculos':'No glasses','Óculos quebrado':'Broken glasses','Troca necessária':'Replacement needed','Situação':'Status','Custo para a família':'Cost to the family',
'Entrega':'Delivery','Sem pedido':'No request','Direta':'Direct','[a definir]':'[to be defined]',
/* ótica */
'Painel da Ótica Parceira':'Partner Optical Shop Dashboard','Armações encaminhadas':'Frames referred to you','Lentes':'Lenses','Nenhuma armação encaminhada.':'No frames referred yet.',
'Confirmar Montagem':'Confirm Assembly','Registrar Entrega':'Record Delivery','Valores das lentes (R$)':'Lens prices (R$)','Endereço':'Address','Telefone':'Phone','Salvar dados':'Save details',
'Selo Ótica Parceira Pega a Visão':'Pega a Visão Partner Optical Shop seal',
'pendente':'pending','montada':'assembled','entregue':'delivered',
'Opcionais: apenas para quem precisa de lentes com receita.':'Optional: only for those who need prescription lenses.','Ver perfil':'View profile',
'Ainda não há óticas parceiras cadastradas.':'There are no partner optical shops registered yet.','Tabela de lentes':'Lens price list','Voltar':'Back',
/* acessibilidade */
'Opções de acessibilidade':'Accessibility options','Ativar modo leitura':'Turn on reading mode','Ler esta página':'Read this page','Parar leitura':'Stop reading','Restaurar':'Reset',
'Tamanho do texto:':'Text size:','Diminuir texto':'Decrease text size','Aumentar texto':'Increase text size','Alto contraste':'High contrast',
'Fonte legível, sem maiúsculas':'Readable font, no capitals','Mais espaçamento':'More spacing','Ocultar ilustração':'Hide illustration','Ler em voz alta (mouse e teclado)':'Read aloud (mouse and keyboard)',
', marcado':', checked',', desmarcado':', unchecked',', selecionado:':', selected:',', campo vazio':', empty field',
/* mensagens */
'Conta de administrador criada! Você já pode entrar.':'Administrator account created! You can sign in now.',
'Solicitação enviada! Aguarde o aceite do administrador.':'Request sent! Please wait for the administrator to approve it.',
'Solicitação enviada para a equipe da oficina.':'Request sent to the workshop team.','Faça login para acessar esta página.':'Sign in to access this page.',
'Manutenção solicitada.':'Maintenance requested.','Valores atualizados.':'Prices updated.',
'Sem permissão para esta ação':'You do not have permission for this action','E-mail ou senha inválidos':'Invalid email or password',
'Cadastro aguardando aceite do administrador':'Account waiting for administrator approval','E-mail já cadastrado':'Email already registered',
'Nenhuma ótica parceira disponível':'No partner optical shop available','Informe as três medidas ergonômicas':'Please enter the three ergonomic measurements',
'Pedido sem lentes: apenas entrega direta':'Request without lenses: direct delivery only','Pedido de outra ótica':'Request belongs to another optical shop',
'entrega direta ao aluno':'direct delivery to the student'
});

var ROLE={aluno:'student',escola:'school',otica:'optical shop',admin:'admin'};
var ST='pendente|montada|entregue',DMG='Haste quebrada|Ponte quebrada|Armação rachada|Dobradiça ou parafuso solto|Outro';
var RULES=[
[/^ODS (\d+(?:\.\d+)?)$/,function(m){return 'SDG '+m[1]}],
[/^ODS (\d+): (.+?)( \(ODS principal\))?$/,function(m){return 'SDG '+m[1]+': '+tr(m[2])+(m[3]?' (main SDG)':'')}],
[/^Pedido (P\d+) · (.+)$/,function(m){return 'Request '+m[1]+' · '+tr(m[2])}],
[/^Pedido (P\d+): etapa "(.+)"$/,function(m){return 'Request '+m[1]+': stage "'+tr(m[2])+'"'}],
[/^Pedido (P\d+): encaminhado à (.+)$/,function(m){return 'Request '+m[1]+': referred to '+m[2]}],
[/^Pedido (P\d+): lentes (montada|entregue)$/,function(m){return 'Request '+m[1]+': lenses '+tr(m[2])}],
[/^Pedido (P\d+): entrega direta ao aluno$/,function(m){return 'Request '+m[1]+': direct delivery to the student'}],
[/^Conserto: (.*)$/,function(m){return 'Repair: '+tr(m[1])}],
[new RegExp('^('+DMG+')(: .*)$'),function(m){return tr(m[1])+m[2]}],
[new RegExp('^Ótica: (.+) \\(('+ST+')\\)$'),function(m){return 'Optical shop: '+m[1]+' ('+tr(m[2])+')'}],
[new RegExp('^Ótica \\(('+ST+')\\)$'),function(m){return 'Optical shop ('+tr(m[1])+')'}],
[/^(R\$ [\d,.]+) \(lentes (.+?) · (.+)\)$/,function(m){return m[1]+' (lenses '+tr(m[2])+' · '+m[3]+')'}],
[/^Produzido pela (.*) da oficina\.$/,function(m){return 'Produced by '+m[1]+' of the workshop.'}],
[/^Encaminhar para (.+)$/,function(m){return 'Refer to '+m[1]}],
[/^Logado como (.*) \((aluno|escola|otica|admin)\)$/,function(m){return 'Signed in as '+m[1]+' ('+ROLE[m[2]]+')'}],
[/^(.*) · (aluno|escola|otica|admin) · (.*)$/,function(m){return m[1]+' · '+ROLE[m[2]]+' · '+m[3]}],
[/^de (\d+) estudantes cadastrados já receberam o apoio do projeto\.$/,function(m){return 'of '+m[1]+' registered students have already received the project’s support.'}],
[/^Erro: (.*)$/,function(m){return 'Error: '+m[1]}]
];

function tr(s){
 var m=s.match(/^(\s*)([\s\S]*?)(\s*)$/),core=m[2];
 if(!core)return s;
 var out=D[core];
 if(out===undefined){for(var i=0;i<RULES.length;i++){var r=core.match(RULES[i][0]);if(r){out=RULES[i][1](r);break}}}
 if(out===undefined)out=core;
 out=out.replace(/R\$ (\d+),(\d{2})/g,'R$ $1.$2');
 return m[1]+out+m[3]
}
window.tt=function(s){return LANG=='en'?tr(s):s};

/* ---- tradução do DOM (só no idioma inglês) ---- */
var ATTR=['aria-label','alt','placeholder','title'];
var obs=null,root=null;
function walk(el){
 var w=document.createTreeWalker(el,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,null),n;
 while((n=w.nextNode())){
  if(n.nodeType==3){
   var p=n.parentNode&&n.parentNode.nodeName;if(p=='SCRIPT'||p=='STYLE'||p=='TEXTAREA')continue;
   var v=tr(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v
  }else{
   if(n.nodeName=='OPTION'&&!n.hasAttribute('value'))n.setAttribute('value',n.textContent);
   for(var i=0;i<ATTR.length;i++){var a=n.getAttribute&&n.getAttribute(ATTR[i]);if(a){var t=tr(a);if(t!==a)n.setAttribute(ATTR[i],t)}}
  }
 }
}
function trn(){
 if(LANG!='en')return;
 if(obs)obs.disconnect();
 if(root)walk(root);
 document.title=tr(T0);
 if(obs&&root)obs.observe(root,{childList:true,subtree:true,characterData:true})
}
window.trn=trn;
root=document.getElementById('app');
if(root&&window.MutationObserver)obs=new MutationObserver(function(){trn()});

/* ---- bandeirinhas ---- */
function flag(l){
 if(l=='pt')return '<svg viewBox="0 0 32 22" aria-hidden="true" focusable="false"><rect width="32" height="22" fill="#009B3A"/><path d="M16 2.2 29.6 11 16 19.8 2.4 11Z" fill="#FEDF00"/><circle cx="16" cy="11" r="5.4" fill="#002776"/><path d="M10.9 9.6C14.4 8.7 18.7 9.2 21.4 11.7" fill="none" stroke="#fff" stroke-width="1"/></svg>';
 var h=22/13,s='<svg viewBox="0 0 32 22" aria-hidden="true" focusable="false"><rect width="32" height="22" fill="#fff"/>',i,r,c;
 for(i=0;i<13;i+=2)s+='<rect y="'+(i*h).toFixed(2)+'" width="32" height="'+h.toFixed(2)+'" fill="#B22234"/>';
 s+='<rect width="14" height="'+(7*h).toFixed(2)+'" fill="#3C3B6E"/>';
 for(r=0;r<4;r++)for(c=0;c<(r%2?3:4);c++)s+='<circle cx="'+(1.7+c*3.1+(r%2?1.55:0)).toFixed(2)+'" cy="'+(1.6+r*2.9).toFixed(2)+'" r=".65" fill="#fff"/>';
 return s+'</svg>'
}
window.flags=function(){
 var b=function(l,name){var on=LANG==l;return '<button type="button" class="lgb'+(on?' sel':'')+'" data-lang="'+l+'" aria-pressed="'+on+'" aria-label="'+name+'" title="'+name+'">'+flag(l)+'</button>'};
 return '<span class="lg" role="group" aria-label="Idioma / Language">'+b('pt','Português (Brasil)')+b('en','English (United States)')+'</span>'
};
function setLang(l){
 if(l==LANG)return;
 LANG=l;window.LANG=l;
 try{localStorage.setItem(LS,l)}catch(e){}
 document.documentElement.lang=l=='en'?'en':'pt-BR';
 if(l!='en')document.title=T0;
 if(typeof render=='function')render()
}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-lang]');if(b)setLang(b.getAttribute('data-lang'))});
document.documentElement.lang=LANG=='en'?'en':'pt-BR';
})();
