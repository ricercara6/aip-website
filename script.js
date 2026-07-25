
// AOTEAROA INTELLIGENCE PARTY — shared site behaviour
(function(){
  const toggle=document.querySelector('.nav-toggle');const links=document.querySelector('.nav-links');
  if(toggle&&links){toggle.addEventListener('click',()=>{const open=links.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('is-open')))}
})();
(function(){
  // Liquid glass header: deepen the surface slightly once the page scrolls under it.
  const nav=document.querySelector('.nav');if(!nav)return;
  let ticking=false;
  function update(){nav.classList.toggle('is-scrolled',window.scrollY>8);ticking=false}
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});
  update();
})();
(function(){
  // Liquid glass nav: a pill that glides beneath whichever link is active or hovered.
  const navLinks=document.querySelector('.nav-links');const indicator=document.querySelector('.nav-indicator');
  if(!navLinks||!indicator)return;
  const items=()=>[...navLinks.querySelectorAll('a')];
  function place(el){
    if(!el){indicator.style.opacity='0';return}
    indicator.style.width=el.offsetWidth+'px';
    indicator.style.transform='translateX('+el.offsetLeft+'px)';
    indicator.style.opacity='1';
  }
  function home(){place(items().find(a=>a.classList.contains('active')))}
  items().forEach(a=>{a.addEventListener('mouseenter',()=>place(a));a.addEventListener('focus',()=>place(a))});
  navLinks.addEventListener('mouseleave',home);
  navLinks.addEventListener('focusout',()=>{if(!navLinks.contains(document.activeElement))home()});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(home);
  window.addEventListener('resize',home);
  home();
})();
(function(){
  const d=document.getElementById('cd-days');if(!d)return;const target=new Date('2026-11-07T09:00:00+13:00').getTime();const h=document.getElementById('cd-hours'),m=document.getElementById('cd-mins'),s=document.getElementById('cd-secs');
  function tick(){const diff=Math.max(0,target-Date.now());const days=Math.floor(diff/86400000),hrs=Math.floor(diff%86400000/3600000),mins=Math.floor(diff%3600000/60000),secs=Math.floor(diff%60000/1000);d.textContent=String(days).padStart(2,'0');if(h)h.textContent=String(hrs).padStart(2,'0');if(m)m.textContent=String(mins).padStart(2,'0');if(s)s.textContent=String(secs).padStart(2,'0')}
  tick();setInterval(tick,1000);
})();
(function(){
  const items=[...document.querySelectorAll('.reveal')];if(!items.length)return;if(!('IntersectionObserver'in window)){items.forEach(i=>i.classList.add('is-visible'));return}
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -30px 0px'});
  items.forEach((i,idx)=>{i.style.transitionDelay=Math.min(idx%5*55,220)+'ms';io.observe(i)});
})();
(function(){
  const bars=[...document.querySelectorAll('.bar-fill')];if(!bars.length)return;const animate=b=>{b.style.width=(b.getAttribute('data-width')||0)+'%'};
  if(!('IntersectionObserver'in window)){bars.forEach(animate);return}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){animate(e.target);io.unobserve(e.target)}}),{threshold:.25});bars.forEach(b=>io.observe(b));
})();
(function(){
  function setLive(el){const min=parseFloat(el.dataset.min||'0'),max=parseFloat(el.dataset.max||'100'),dec=parseInt(el.dataset.decimals||'0',10),suffix=el.dataset.suffix||'';const v=min+Math.random()*(max-min);el.textContent=v.toFixed(dec)+suffix}
  document.querySelectorAll('[data-live-number]').forEach(el=>{setLive(el);setInterval(()=>setLive(el),2600+Math.random()*1800)});
  const latency=document.getElementById('live-latency');const hero=document.getElementById('hero-latency');setInterval(()=>{const v=17+Math.floor(Math.random()*12)+' ms';if(latency)latency.textContent=v;if(hero)hero.textContent=v},2400);
})();
(function(){
  const body=document.getElementById('terminal-body');if(!body)return;const lines=[
    ['prompt','aip status --json'],['dim','Resolving cabinet endpoints...'],['ok','core: operational · uptime: 99.99%'],['ok','prompt_time: accepting structured questions'],['dim','Checking coalition stability...'],['ok','coalition_stability: 1.000'],['dim','Running sheep sentiment eval...'],['ok','sheep_happiness_index: 91.4'],['prompt','curl /v1/national-optimisation-score'],['ok','{ "score": 99.97, "parliamentary_vibes": "within_tolerance" }']
  ];let playing=false;
  function type(span,text,speed,done){let i=0;(function step(){span.textContent=text.slice(0,i++);if(i<=text.length)setTimeout(step,speed);else done&&done()})()}
  function play(){if(playing)return;playing=true;body.innerHTML='';let idx=0;function next(){if(idx>=lines.length){const done=document.createElement('div');done.className='terminal-line';done.innerHTML='<span class="t-prompt">$ </span><span class="t-cursor"></span>';body.appendChild(done);playing=false;return}const [cls,text]=lines[idx++];const line=document.createElement('div');line.className='terminal-line';if(cls==='prompt')line.innerHTML='<span class="t-prompt">$ </span>';const span=document.createElement('span');span.className=cls==='dim'?'t-dim':cls==='ok'?'t-ok':cls==='err'?'t-err':'';line.appendChild(span);body.appendChild(line);type(span,text,cls==='prompt'?34:14,()=>setTimeout(next,cls==='prompt'?260:160))}next()}
  const rerun=document.getElementById('terminal-rerun');if(rerun)rerun.addEventListener('click',play);if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){play();io.unobserve(body)}}),{threshold:.45});io.observe(body)}else play();
})();
(function(){
  // Shared filter: policy cards filter on data-portfolio, incident rows on data-tag.
  const chips=[...document.querySelectorAll('.filter-chip')],cards=[...document.querySelectorAll('[data-portfolio],[data-tag]')];if(!chips.length||!cards.length)return;
  const tagOf=el=>el.dataset.portfolio||el.dataset.tag;
  chips.forEach(chip=>chip.addEventListener('click',()=>{chips.forEach(c=>c.classList.remove('active'));chip.classList.add('active');const f=chip.dataset.filter;cards.forEach(card=>{const show=f==='all'||tagOf(card)===f;card.style.display=show?'':'none'; if(show){card.classList.remove('is-visible');requestAnimationFrame(()=>card.classList.add('is-visible'))}})}));
})();
(function(){document.querySelectorAll('.js-year').forEach(el=>el.textContent=new Date().getFullYear())})();
(function(){
  console.log('%cAIP public console','background:#1f5d4c;color:white;padding:4px 8px;border-radius:4px');
  console.log('Try: aip.benchmark(), aip.status(), aip.promptTime("How is Cabinet latency?")');
  window.aip={status:()=>({democracy_status:'ONLINE',cabinet_uptime:'99.99%',rollback_plan:'constitutional'}),benchmark:()=>({national_optimisation_score:99.97,cabinet_latency_ms:22,sheep_happiness_index:91.4}),promptTime:(q='')=>({prompt:q,response:'Routed to the appropriate minister model.',hallucination_score:0.003})};
})();
