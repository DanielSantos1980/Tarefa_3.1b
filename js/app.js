
(() => {
  'use strict';
  const KEY='animalec.tarefa31b.v1';
  const AUTH='animalec.tarefa31b.session';
  const schemas=window.ANIMALEC_SCHEMAS;
  const initialData=window.ANIMALEC_SEED;
  const $=selector=>document.querySelector(selector);
  const byId=id=>document.getElementById(id);
  const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clone=obj=>JSON.parse(JSON.stringify(obj));
  const pages=['dashboard','animais','utilizadores','quizzes','questoes','sponsors','experts'];
  const storage={get(key){try{return localStorage.getItem(key)}catch{return null}},set(key,val){try{localStorage.setItem(key,val)}catch{  }}};
  const session={get(){try{return sessionStorage.getItem(AUTH)}catch{return null}},set(v){try{v?sessionStorage.setItem(AUTH,'sim'):sessionStorage.removeItem(AUTH)}catch{}}};
  function loadData(){try{const saved=JSON.parse(storage.get(KEY));if(saved&&Object.keys(schemas).every(k=>Array.isArray(saved[k])))return saved}catch{}return clone(initialData)}
  let data=loadData();
  const state={page:'dashboard',editingId:null,deleting:null,query:'',filter:'all',sortKey:'',sortDirection:1,noticeTimeout:null};
  function persist(){storage.set(KEY,JSON.stringify(data))}
  function showToast(message){const t=byId('toast');t.textContent=message;t.hidden=false;clearTimeout(state.noticeTimeout);state.noticeTimeout=setTimeout(()=>{t.hidden=true},3600)}
  const animalName=id=>data.animais.find(a=>a.id===id)?.nome||'(animal removido)';
  function labelFor(item,key){
    const v=item[key];
    if(key==='animalIds')return Array.isArray(v)?v.map(animalName).join(', ')||'Sem associação':'Sem associação';
    return v==null?'—':String(v);
  }
  function cellMarkup(item,key){
    if(key==='estado')return `<span class="pill ${item.estado==='Inativo'?'inactive':''}">${safe(labelFor(item,key))}</span>`;
    if(key==='animalIds')return ((item.animalIds||[]).map(id=>`<span class="chip">${safe(animalName(id))}</span>`).join(' ')||'<span class="muted">Sem associação</span>');
    if(key==='nome'&&item.email)return `${safe(item.nome)}<small>${safe(item.email)}</small>`;
    return safe(labelFor(item,key));
  }
  function menuCounts(){byId('sidebar-count-sponsors').textContent=data.sponsors.length;byId('sidebar-count-experts').textContent=data.experts.length}
  function setMobileMenu(open){byId('sidebar').classList.toggle('open',open);byId('sidebar-overlay').hidden=!open;byId('menu-toggle').setAttribute('aria-expanded',String(open));byId('menu-toggle').setAttribute('aria-label',open?'Fechar menu':'Abrir menu')}
  function routeFromUrl(){const hash=location.hash.slice(1).split('?')[0];return pages.includes(hash)?hash:(document.body.dataset.entryPage||'dashboard')}
  function renderDashboard(){
    const modules=[
      ['utilizadores','Utilizadores','♙','Perfis dos participantes'],
      ['animais','Animais','♞','Catálogo das espécies'],
      ['quizzes','Quizzes','▤','Atividades educativas'],
      ['questoes','Questões','?','Banco de perguntas'],
      ['sponsors','Patrocinadores','♥','Apoios e animais associados'],
      ['experts','Especialistas científicos','✧','Conhecimento científico']
    ];
    byId('dashboard-content').innerHTML=`<section class="admin-home" aria-labelledby="admin-home-title">
      <p class="eyebrow">ÁREA RESERVADA · MODELO DO CAPÍTULO A.3</p>
      <h2 id="admin-home-title">Gestão do Animalec</h2><div class="star-rule" aria-hidden="true"><span>★</span></div>
      <p class="admin-intro">Escolha a entidade que pretende administrar. As quatro primeiras opções correspondem às áreas descritas no livro; as duas últimas são a extensão da Tarefa 3.1b.</p>
      <div class="admin-options">${modules.map(([route,label,icon,description],i)=>`<a class="admin-option ${i>=4?'admin-option-new':''}" href="#${route}" aria-label="Gerir ${safe(label)}"><span class="option-icon" aria-hidden="true">${icon}</span><span class="option-label">${safe(label)}</span><small>${safe(description)}</small><span class="option-count">${data[route].length} registos</span></a>`).join('')}</div>
      <p class="admin-home-note">Gestão de conteúdos · <a href="index.html">Página principal</a> · <a href="design/galeria.html">Wireframes e mockups</a> · <a href="docs.html">Documentação</a> · <a href="testes.html">Testes</a></p>
    </section>`;
  }
  function filteredItems(){return data[state.page].filter(item=>{
    if(state.filter!=='all'&&item.estado!==state.filter)return false;
    const text=Object.keys(item).map(k=>labelFor(item,k)).join(' ').toLocaleLowerCase('pt-PT');
    return text.includes(state.query.toLocaleLowerCase('pt-PT'));
  }).sort((a,b)=>{if(!state.sortKey)return 0;const left=labelFor(a,state.sortKey),right=labelFor(b,state.sortKey);return state.sortDirection*left.localeCompare(right,'pt-PT',{numeric:true,sensitivity:'base'})})}
  function actions(item){return `<div class="action-group"><button type="button" class="action-btn" data-action="view" data-id="${safe(item.id)}" aria-label="Ver ${safe(item.nome||item.titulo||item.pergunta||'registo')}">Ver</button><button type="button" class="action-btn" data-action="edit" data-id="${safe(item.id)}" aria-label="Editar ${safe(item.nome||item.titulo||item.pergunta||'registo')}">Editar</button><button type="button" class="action-btn danger" data-action="delete" data-id="${safe(item.id)}" aria-label="Eliminar ${safe(item.nome||item.titulo||item.pergunta||'registo')}">Eliminar</button></div>`}
  function renderRecords(){
    const schema=schemas[state.page],list=filteredItems();
    byId('entity-heading').textContent=`${data[state.page].length} registos de ${schema.title.toLowerCase()}`;
    byId('entity-desc').textContent=schema.desc;
    byId('table-head').innerHTML=`<tr>${schema.columns.map(([key,label])=>`<th scope="col" aria-sort="${state.sortKey===key?(state.sortDirection>0?'ascending':'descending'):'none'}"><button type="button" class="sort-button" data-sort="${safe(key)}">${safe(label)} <span aria-hidden="true">${state.sortKey===key?(state.sortDirection>0?'▲':'▼'):'↕'}</span></button></th>`).join('')}<th scope="col" style="text-align:right">Ações</th></tr>`;
    byId('table-body').innerHTML=list.length?list.map(item=>`<tr>${schema.columns.map(([key])=>`<td>${cellMarkup(item,key)}</td>`).join('')}<td>${actions(item)}</td></tr>`).join(''):`<tr><td class="empty-state" colspan="${schema.columns.length+1}">Não existem registos para os filtros escolhidos.</td></tr>`;
    byId('mobile-records').innerHTML=list.length?list.map(item=>`<article class="record-card"><h3>${safe(item.nome||item.titulo||item.pergunta)}</h3><dl>${schema.columns.slice(1).map(([key,label])=>`<dt>${safe(label)}</dt><dd>${cellMarkup(item,key)}</dd>`).join('')}</dl>${actions(item)}</article>`).join(''):'<p class="empty-state">Não existem registos para os filtros escolhidos.</p>';
    byId('results-count').textContent=`${list.length} de ${data[state.page].length} registos`;
  }
  function renderPage(){
    if(byId('app-view').hidden)return;
    const page=state.page;
    document.querySelectorAll('.nav-link').forEach(link=>{const on=link.dataset.page===page;link.classList.toggle('active',on);on?link.setAttribute('aria-current','page'):link.removeAttribute('aria-current')});
    const info=page==='dashboard'?{title:'Visão geral',subtitle:'Acompanhe as entidades do Animalec numa única plataforma.'}:schemas[page];
    byId('breadcrumb-title').textContent=page==='dashboard'?'Administração':info.title;
    byId('page-title').textContent=page==='dashboard'?'Administração':`Gestão de ${info.title.toLowerCase()}`;
    byId('page-subtitle').textContent=info.subtitle;
    byId('page-eyebrow').textContent=page==='dashboard'?'PAINEL DE ADMINISTRAÇÃO':page==='sponsors'||page==='experts'?'TAREFA 3.1B · NOVAS ENTIDADES':'GESTÃO DE CONTEÚDOS';
    byId('add-button').hidden=page==='dashboard';
    byId('main-menu-button').hidden=page==='dashboard';
    byId('add-button-text').textContent=page==='dashboard'?'Novo registo':`Adicionar ${schemas[page].singular}`;
    byId('dashboard-content').hidden=page!=='dashboard';byId('entity-content').hidden=page==='dashboard';
    byId('search-input').value=state.query;
    byId('status-filter').value=state.filter;
    if(page==='dashboard')renderDashboard();else renderRecords();menuCounts();setMobileMenu(false);
  }
  function navigate(){state.page=routeFromUrl();state.query='';state.filter='all';state.sortKey='';state.sortDirection=1;renderPage()}
  function fieldMarkup(field,item){
    const v=item?.[field.key]??(field.key==='estado'?'Ativo':'');
    const id=`field-${field.key}`, req=field.required?'required':'',max=field.maxlength?`maxlength="${field.maxlength}"`:'';
    let control;
    if(field.type==='animals'){
      const ids=Array.isArray(v)?v:[];
      control=`<div class="check-animals" role="group" aria-labelledby="${id}-label">${data.animais.map(a=>`<label><input name="animalIds" type="checkbox" value="${safe(a.id)}" ${ids.includes(a.id)?'checked':''}> ${safe(a.nome)}</label>`).join('')||'<p class="muted">Crie primeiro um animal.</p>'}</div>`;
    }else if(field.type==='select'){
      const choices=field.source?data[field.source].map(x=>x[field.sourceLabel]):field.choices;
      control=`<select id="${id}" name="${safe(field.key)}" ${req}><option value="">Selecione…</option>${choices.map(c=>`<option value="${safe(c)}" ${c===v?'selected':''}>${safe(c)}</option>`).join('')}</select>`;
    }else if(field.type==='textarea'){
      control=`<textarea id="${id}" name="${safe(field.key)}" ${max} ${req}>${safe(v)}</textarea>`;
    }else{
      control=`<input id="${id}" name="${safe(field.key)}" type="${field.type==='email'?'email':'text'}" value="${safe(v)}" ${max} ${req}>`;
    }
    return `<div class="field ${field.type==='animals'||field.type==='textarea'?'span-2':''}"><label ${field.type==='animals'?`id="${id}-label"`:`for="${id}"`}>${safe(field.label)} ${field.required?'<span aria-label="obrigatório">*</span>':''}</label>${control}${field.type==='animals'?'<span class="field-hint">Selecione pelo menos um animal para associar.</span>':''}</div>`;
  }
  function openEditor(id=null){
    if(!schemas[state.page])return;
    state.editingId=id;
    const item=id?data[state.page].find(x=>x.id===id):null;
    if(id&&!item)return;
    byId('dialog-title').textContent=id?`Editar ${schemas[state.page].singular}`:`Novo ${schemas[state.page].singular}`;
    byId('form-fields').innerHTML=schemas[state.page].fields.map(f=>fieldMarkup(f,item)).join('');
    byId('form-error').textContent='';
    byId('entity-dialog').showModal();
    byId('form-fields').querySelector('input:not([type="checkbox"]),select,textarea')?.focus();
  }
  function closeEditor(){byId('entity-dialog').close();state.editingId=null}
  function formValues(){
    const result={};const form=byId('entity-form');
    for(const f of schemas[state.page].fields){
      if(f.type==='animals')result[f.key]=Array.from(form.querySelectorAll('[name="animalIds"]:checked'),node=>node.value);
      else result[f.key]=(form.elements.namedItem(f.key)?.value??'').trim();
    }
    return result;
  }
  function validateValues(values){
    for(const f of schemas[state.page].fields){
      const v=values[f.key];
      if(f.required&&(Array.isArray(v)?v.length===0:!v))return `Preencha o campo obrigatório: ${f.label}.`;
      if(f.maxlength&&v.length>f.maxlength)return `${f.label}: máximo de ${f.maxlength} caracteres.`;
      if(f.type==='email'&&v&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))return `O email em «${f.label}» não é válido.`;
      if(f.type==='animals'&&v.some(id=>!data.animais.some(a=>a.id===id)))return 'Existem associações a animais inexistentes.';
    }
    if(['utilizadores','sponsors','experts'].includes(state.page)){
      const duplicate=data[state.page].some(item=>item.id!==state.editingId&&item.email.toLowerCase()===values.email.toLowerCase());
      if(duplicate)return 'Já existe um registo com este endereço de email.';
    }
    return '';
  }
  function saveRecord(event){
    event.preventDefault();
    const values=formValues();const error=validateValues(values);
    if(error){byId('form-error').textContent=error;return}
    if(state.editingId){const index=data[state.page].findIndex(x=>x.id===state.editingId);if(index<0)return;data[state.page][index]={id:state.editingId,...values}}
    else {const id=state.page.slice(0,2)+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);data[state.page].unshift({id,...values})}
    const wasEditing=!!state.editingId;persist();closeEditor();renderPage();showToast(wasEditing?'Registo atualizado.':'Registo guardado.');
  }
  function openDelete(id){
    const item=data[state.page].find(x=>x.id===id);if(!item)return;
    state.deleting={page:state.page,id};
    byId('confirm-message').textContent=`Pretende eliminar «${item.nome||item.titulo||item.pergunta}»?${state.page==='animais'?' As suas associações a patrocinadores e especialistas também serão removidas.':''} Esta ação não pode ser anulada.`;
    byId('confirm-dialog').showModal();
  }
  function confirmDelete(){
    const deleting=state.deleting;if(!deleting)return;
    data[deleting.page]=data[deleting.page].filter(x=>x.id!==deleting.id);
    if(deleting.page==='animais')for(const type of ['sponsors','experts'])for(const item of data[type])item.animalIds=item.animalIds.filter(id=>id!==deleting.id);
    persist();byId('confirm-dialog').close();state.deleting=null;renderPage();showToast('Registo eliminado.');
  }
  function openView(id){
    const item=data[state.page].find(row=>row.id===id);if(!item)return;
    const schema=schemas[state.page];byId('view-title').textContent=`${schema.title} · Ficha`;
    byId('view-details').innerHTML=`<dl>${schema.fields.map(f=>`<div><dt>${safe(f.label)}</dt><dd>${safe(labelFor(item,f.key))}</dd></div>`).join('')}</dl>`;
    byId('view-dialog').showModal();
  }
  function handleRecordClick(event){const button=event.target.closest('[data-action]');if(!button)return;const id=button.dataset.id;if(button.dataset.action==='view')openView(id);if(button.dataset.action==='edit')openEditor(id);if(button.dataset.action==='delete')openDelete(id)}
  function showApp(){byId('login-view').hidden=true;byId('app-view').hidden=false;navigate()}
  function showLogin(){byId('app-view').hidden=true;byId('login-view').hidden=false;byId('login-password').value='';byId('login-error').textContent=''}
  byId('login-form').addEventListener('submit',e=>{e.preventDefault();const email=byId('login-email').value.trim();const pass=byId('login-password').value;if(email==='admin@animalec.pt'&&pass==='animalec31'){session.set(true);showApp()}else{byId('login-error').textContent='Email ou palavra-passe incorretos.'}});
  byId('logout-button').addEventListener('click',()=>{session.set(false);setMobileMenu(false);showLogin()});
  byId('menu-toggle').addEventListener('click',()=>setMobileMenu(!byId('sidebar').classList.contains('open')));
  byId('sidebar-overlay').addEventListener('click',()=>setMobileMenu(false));
  window.addEventListener('hashchange',navigate);
  byId('search-input').addEventListener('input',e=>{state.query=e.target.value;renderRecords()});
  byId('status-filter').addEventListener('change',e=>{state.filter=e.target.value;renderRecords()});
  byId('add-button').addEventListener('click',()=>openEditor());
  byId('table-body').addEventListener('click',handleRecordClick);
  byId('table-head').addEventListener('click',event=>{const btn=event.target.closest('[data-sort]');if(!btn)return;const key=btn.dataset.sort;state.sortDirection=state.sortKey===key?-state.sortDirection:1;state.sortKey=key;renderRecords()});
  byId('mobile-records').addEventListener('click',handleRecordClick);
  byId('entity-form').addEventListener('submit',saveRecord);
  byId('dialog-close').addEventListener('click',closeEditor);
  byId('view-close').addEventListener('click',()=>byId('view-dialog').close());
  byId('view-back').addEventListener('click',()=>byId('view-dialog').close());
  byId('dialog-cancel').addEventListener('click',closeEditor);
  byId('confirm-close').addEventListener('click',()=>byId('confirm-dialog').close());
  byId('confirm-cancel').addEventListener('click',()=>byId('confirm-dialog').close());
  byId('confirm-delete').addEventListener('click',confirmDelete);
  byId('entity-dialog').addEventListener('close',()=>{state.editingId=null});
  byId('confirm-dialog').addEventListener('close',()=>{state.deleting=null});
  window.AnimalecTest={getData:()=>clone(data),reset:()=>{data=clone(initialData);persist();renderPage()}};
  if(session.get())showApp();else showLogin();
})();
