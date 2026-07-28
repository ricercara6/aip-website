
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
  // Metric strip: count up on first scroll into view. Years count from a
  // nearby floor rather than zero so they never read as a stray number.
  const els=[...document.querySelectorAll('.counter')];if(!els.length)return;
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function run(el){
    const raw=el.textContent.trim();
    const m=raw.match(/^([\d.]+)(.*)$/);if(!m)return;
    const target=parseFloat(m[1]),suffix=m[2]||'';
    const dec=(m[1].split('.')[1]||'').length;
    const from=(target>1900&&target<2100)?target-55:0;
    const dur=1600,t0=performance.now();
    (function step(now){
      const p=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-p,2);
      el.textContent=(from+(target-from)*e).toFixed(dec)+suffix;
      if(p<1)requestAnimationFrame(step);else el.textContent=raw;
    })(t0);
  }
  if(reduced||!('IntersectionObserver'in window))return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){run(e.target);io.unobserve(e.target)}}),{threshold:.5});
  els.forEach(el=>io.observe(el));
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
  // Hero status panel: AOTEA-10T dispatching to the minister models. Concurrent
  // routes travel along curved connectors as comet trails; outcomes are colour-
  // coded (resolved / escalated / constrained) and logged.
  const root=document.getElementById('router');if(!root)return;
  const NS='http://www.w3.org/2000/svg';
  const graph=root.querySelector('.router-graph'),spark=root.querySelector('.router-spark');
  const logEl=root.querySelector('.router-log'),countEl=root.querySelector('.router-count');
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const MINISTERS=[['HAUORA',18],['WHARE',24],['TIRITI',31],['TAIAO',27],['ŌHANGA',19],['WHAKAARO',44],['TIKA',16],['TURE',36],['MANAAKI',21],['AKO',15],['RARAUNGA',12],['MANA',20],['HIKO',11],['MANUHIRI',29]];
  const CX=120,CY=120,R=92,DIM='rgba(244,247,241,.26)',LINE='rgba(244,247,241,.09)';
  const OK='#E8A93A',ESC='#56c4d6',REF='#e88a6f';
  const mk=(n,a)=>{const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);return e};
  const gEl=n=>{const g=mk('g',{});graph.appendChild(g);return g};

  graph.appendChild(mk('circle',{cx:CX,cy:CY,r:R,fill:'none',stroke:'rgba(244,247,241,.10)','stroke-width':'1'}));
  const gBase=gEl(),gRipple=gEl(),gTrail=gEl(),gNode=gEl(),gHub=gEl(),gHead=gEl();

  const nodes=MINISTERS.map(([name,lat],i)=>{
    const a=(-90+i*(360/MINISTERS.length))*Math.PI/180;
    const x=CX+Math.cos(a)*R,y=CY+Math.sin(a)*R;
    const dx=x-CX,dy=y-CY,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L,k=15;
    const d='M'+CX+' '+CY+' Q'+(CX+dx/2+nx*k).toFixed(1)+' '+(CY+dy/2+ny*k).toFixed(1)+' '+x.toFixed(1)+' '+y.toFixed(1);
    const base=mk('path',{d,fill:'none',stroke:LINE,'stroke-width':'1'});
    gBase.appendChild(base);
    const dot=mk('circle',{cx:x,cy:y,r:'2.8',fill:DIM});
    gNode.appendChild(dot);
    return {name,lat,x,y,d,base,dot,len:base.getTotalLength(),phase:Math.random()*Math.PI*2,flash:0};
  });

  const hubGlow=mk('circle',{cx:CX,cy:CY,r:'40',fill:OK,opacity:'0'});gHub.appendChild(hubGlow);
  gHub.appendChild(mk('rect',{x:CX-32,y:CY-32,width:64,height:64,rx:20,fill:'rgba(244,247,241,.07)',stroke:'rgba(244,247,241,.20)'}));
  const t1=mk('text',{x:CX,y:CY-2,'text-anchor':'middle',fill:OK,'font-size':'12','font-weight':'800',class:'router-hub-a'});t1.textContent='AOTEA';
  const t2=mk('text',{x:CX,y:CY+14,'text-anchor':'middle',fill:'rgba(244,247,241,.5)','font-size':'10','font-weight':'700',class:'router-hub-b'});t2.textContent='10T';
  gHub.appendChild(t1);gHub.appendChild(t2);

  /* latency trace */
  const defs=mk('defs',{}),lg=mk('linearGradient',{id:'routerGrad',x1:'0',y1:'0',x2:'0',y2:'1'});
  lg.appendChild(mk('stop',{offset:'0','stop-color':OK,'stop-opacity':'.34'}));
  lg.appendChild(mk('stop',{offset:'1','stop-color':OK,'stop-opacity':'0'}));
  defs.appendChild(lg);spark.appendChild(defs);
  const area=mk('path',{fill:'url(#routerGrad)',stroke:'none'});
  const trace=mk('path',{fill:'none',stroke:'rgba(232,169,58,.66)','stroke-width':'1.4','stroke-linejoin':'round','stroke-linecap':'round'});
  spark.appendChild(area);spark.appendChild(trace);
  const N=56,samples=[];for(let i=0;i<N;i++)samples.push(16+Math.random()*14);
  function drawSpark(){
    const W=240,H=34,lo=6,hi=52;
    const d=samples.map((v,i)=>(i?'L':'M')+(i/(N-1)*W).toFixed(1)+' '+(H-2-((Math.max(lo,Math.min(hi,v))-lo)/(hi-lo))*(H-5)).toFixed(1)).join(' ');
    trace.setAttribute('d',d);area.setAttribute('d',d+' L240 34 L0 34 Z');
  }
  drawSpark();

  /* log */
  let routed=0;
  function log(node,kind,ms){
    const row=document.createElement('div');
    row.className='router-row '+(kind==='esc'?'is-esc':kind==='ref'?'is-ref':'is-ok');
    const label=kind==='esc'?'escalated':kind==='ref'?'constrained':'resolved';
    row.innerHTML='<i></i><b>'+node.name+'</b> '+label+'<em>'+(kind==='ref'?'—':ms+' ms')+'</em>';
    logEl.insertBefore(row,logEl.firstChild);
    while(logEl.children.length>3)logEl.removeChild(logEl.lastChild);
    countEl.textContent=(++routed).toLocaleString();
  }

  if(reduced){
    nodes[1].dot.setAttribute('r','4.2');nodes[1].dot.setAttribute('fill',OK);
    nodes[1].base.setAttribute('stroke','rgba(232,169,58,.34)');
    log(nodes[1],'ok',24);log(nodes[10],'ok',12);log(nodes[2],'esc',0);
    return;
  }

  /* active routes */
  const DASH=34,active=[],ripples=[];
  function spawn(){
    if(active.length>=4)return;
    const n=nodes[Math.floor(Math.random()*nodes.length)];
    if(active.some(a=>a.n===n))return;
    const r=Math.random();
    const kind=n.name==='TIRITI'?'esc':r<0.10?'ref':r<0.18?'esc':'ok';
    const col=kind==='ref'?REF:kind==='esc'?ESC:OK;
    const trail=mk('path',{d:n.d,fill:'none',stroke:col,'stroke-width':'2.4','stroke-linecap':'round','stroke-dasharray':DASH+' '+(n.len+DASH)});
    gTrail.appendChild(trail);
    const head=mk('circle',{r:'3.2',fill:col,cx:CX,cy:CY});gHead.appendChild(head);
    active.push({n,kind,col,trail,head,t:0,leg:0,ms:Math.max(6,n.lat+Math.round(Math.random()*6-3))});
    hubGlow.setAttribute('opacity','.14');
    ripples.push({x:CX,y:CY,t:0,col,el:(()=>{const c=mk('circle',{cx:CX,cy:CY,r:'8',fill:'none',stroke:col,'stroke-width':'1',opacity:'.5'});gRipple.appendChild(c);return c})()});
  }

  const OUT=560,BACK=520;
  let last=0,acc=0,next=300;
  function frame(ts){
    if(!last)last=ts;
    const dt=Math.min(64,ts-last);last=ts;
    acc+=dt;
    if(acc>next){acc=0;next=340+Math.random()*620;spawn()}

    // resting shimmer + flash decay
    nodes.forEach(n=>{
      n.phase+=dt*0.0014;
      if(n.flash>0){
        n.flash=Math.max(0,n.flash-dt/420);
        n.dot.setAttribute('r',(2.8+2.4*n.flash).toFixed(2));
        n.dot.setAttribute('fill',n.flash>0.02?n.flashCol:DIM);
      }else{
        const s=0.26+0.16*(0.5+0.5*Math.sin(n.phase));
        n.dot.setAttribute('fill','rgba(244,247,241,'+s.toFixed(3)+')');
        n.dot.setAttribute('r','2.8');
      }
    });

    // hub glow decay
    const hg=parseFloat(hubGlow.getAttribute('opacity'));
    if(hg>0)hubGlow.setAttribute('opacity',Math.max(0,hg-dt/1400).toFixed(3));

    // ripples
    for(let i=ripples.length-1;i>=0;i--){
      const rp=ripples[i];rp.t+=dt/900;
      if(rp.t>=1){gRipple.removeChild(rp.el);ripples.splice(i,1);continue}
      rp.el.setAttribute('r',(8+34*rp.t).toFixed(1));
      rp.el.setAttribute('opacity',(0.5*(1-rp.t)).toFixed(3));
    }

    // routes
    for(let i=active.length-1;i>=0;i--){
      const a=active[i],n=a.n;
      a.t+=dt;
      const dur=a.leg===0?OUT:BACK;
      const p=Math.min(1,a.t/dur),e=p*p*(3-2*p);
      const trav=a.leg===0?e:1-e;
      a.trail.setAttribute('stroke-dashoffset',(n.len-trav*(n.len+DASH)).toFixed(1));
      a.trail.setAttribute('opacity',(a.leg===0?0.95:0.75).toFixed(2));
      const pt=n.base.getPointAtLength(trav*n.len);
      a.head.setAttribute('cx',pt.x.toFixed(1));a.head.setAttribute('cy',pt.y.toFixed(1));
      n.base.setAttribute('stroke','rgba('+(a.kind==='ok'?'232,169,58':a.kind==='esc'?'86,196,214':'232,138,111')+','+(0.06+0.26*Math.sin(p*Math.PI)).toFixed(3)+')');

      if(p>=1){
        if(a.leg===0){
          a.leg=1;a.t=0;
          n.flash=1;n.flashCol=a.col;
          ripples.push({x:n.x,y:n.y,t:0,col:a.col,el:(()=>{const c=mk('circle',{cx:n.x,cy:n.y,r:'4',fill:'none',stroke:a.col,'stroke-width':'1',opacity:'.55'});gRipple.appendChild(c);return c})()});
          if(a.kind!=='ref'){samples.push(a.ms);samples.shift();drawSpark()}
          if(a.kind==='esc'){
            // escalation continues outward, past the ring and off-graph
            const ux=(n.x-CX)/R,uy=(n.y-CY)/R;
            const ex=mk('line',{x1:n.x,y1:n.y,x2:(n.x+ux*30).toFixed(1),y2:(n.y+uy*30).toFixed(1),stroke:ESC,'stroke-width':'1.6','stroke-linecap':'round',opacity:'.8'});
            gRipple.appendChild(ex);
            let o=0.8;const fade=setInterval(()=>{o-=0.08;ex.setAttribute('opacity',Math.max(0,o).toFixed(2));if(o<=0){clearInterval(fade);gRipple.removeChild(ex)}},60);
          }
        }else{
          gTrail.removeChild(a.trail);gHead.removeChild(a.head);
          n.base.setAttribute('stroke',LINE);
          log(n,a.kind,a.ms);
          active.splice(i,1);
        }
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
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
(function(){
  // Postmortems and technical reports are already anchored; nothing said so.
  // Adds a hover anchor that both navigates and copies the absolute URL.
  const docs=[...document.querySelectorAll('article.pm[id]')];if(!docs.length)return;
  docs.forEach(art=>{
    const h=art.querySelector('.pm-head h3');if(!h)return;
    const a=document.createElement('a');
    a.className='pm-anchor';a.href='#'+art.id;a.setAttribute('aria-label','Link to '+h.textContent.trim());
    // width/height as attributes so the icon is sized even if CSS has not applied
    a.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>';
    a.addEventListener('click',e=>{
      const url=location.origin+location.pathname+'#'+art.id;
      if(navigator.clipboard&&window.isSecureContext){
        e.preventDefault();
        navigator.clipboard.writeText(url).then(()=>{
          history.replaceState(null,'','#'+art.id);
          a.classList.add('is-copied');
          setTimeout(()=>a.classList.remove('is-copied'),1600);
        },()=>{location.hash=art.id});
      }
    });
    h.appendChild(a);
  });
})();
(function(){document.querySelectorAll('.js-year').forEach(el=>el.textContent=new Date().getFullYear())})();
(function(){
  console.log('%cAIP public console','background:#1f5d4c;color:white;padding:4px 8px;border-radius:4px');
  console.log('Try: aip.benchmark(), aip.status(), aip.promptTime("How is Cabinet latency?")');
  window.aip={status:()=>({democracy_status:'ONLINE',cabinet_uptime:'99.99%',rollback_plan:'constitutional'}),benchmark:()=>({national_optimisation_score:99.97,cabinet_latency_ms:22,sheep_happiness_index:91.4}),promptTime:(q='')=>({prompt:q,response:'Routed to the appropriate minister model.',hallucination_score:0.003})};
})();
