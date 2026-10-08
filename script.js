const navToggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.nav');
navToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');navToggle.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

let activeRole='creator';
const tabs=[...document.querySelectorAll('.tab')];
tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(x=>x.classList.remove('active'));tab.classList.add('active');activeRole=tab.dataset.role||'';runSearch(false);}));

document.querySelectorAll('.chips button').forEach(chip=>chip.addEventListener('click',()=>{const input=document.getElementById('searchInput');input.value=chip.textContent.trim();runSearch();}));
document.querySelectorAll('.category-card button').forEach(btn=>btn.addEventListener('click',()=>{const role=btn.dataset.target;const tab=tabs.find(t=>t.dataset.role===role);tab?.click();document.querySelector('.members')?.scrollIntoView({behavior:'smooth'});}));

document.querySelector('.search-action')?.addEventListener('click',()=>runSearch(true));
document.getElementById('searchInput')?.addEventListener('keydown',e=>{if(e.key==='Enter')runSearch(true)});
document.getElementById('locationSelect')?.addEventListener('change',()=>runSearch(false));
function runSearch(scroll=true){
  const q=(document.getElementById('searchInput')?.value||'').trim().toLowerCase();
  const loc=(document.getElementById('locationSelect')?.value||'').trim().toLowerCase();
  let shown=0;
  document.querySelectorAll('.member-card').forEach(card=>{const hay=(card.dataset.search||'').toLowerCase();const role=card.dataset.role||'';const roleOk=!activeRole||role===activeRole;const qOk=!q||hay.includes(q);const locOk=!loc||hay.includes(loc);const ok=roleOk&&qOk&&locOk;card.classList.toggle('filtered-out',!ok);if(ok)shown++;});
  document.querySelectorAll('.category-card').forEach(card=>{const hay=(card.dataset.search||'').toLowerCase();const role=card.dataset.role||'';const ok=(!q||hay.includes(q))&&(!activeRole||role===activeRole);card.classList.toggle('search-dim',!ok);});
  const status=document.getElementById('searchStatus');
  if(status) status.textContent=`${shown} matching featured member${shown===1?'':'s'}${loc?' in '+document.getElementById('locationSelect').value:''}.`;
  if(scroll) document.querySelector('.members')?.scrollIntoView({behavior:'smooth',block:'start'});
}

const revealIO=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');revealIO.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealIO.observe(el));
const countIO=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.querySelectorAll('[data-count]').forEach(el=>{const end=Number(el.dataset.count),start=performance.now(),dur=1500;function tick(t){const p=Math.min(1,(t-start)/dur),e=1-Math.pow(1-p,3);el.textContent=Math.round(end*e);if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)});countIO.unobserve(entry.target)}),{threshold:.35});document.querySelectorAll('[data-counter-group]').forEach(g=>countIO.observe(g));

const live=document.getElementById('liveMessage');
live?.querySelector('.live-launch')?.addEventListener('click',()=>{live.classList.toggle('open');live.querySelector('.live-panel').setAttribute('aria-hidden',String(!live.classList.contains('open')))});
live?.querySelector('.live-close')?.addEventListener('click',()=>live.classList.remove('open'));
document.getElementById('chatSend')?.addEventListener('click',sendChat);
document.getElementById('chatInput')?.addEventListener('keydown',e=>{if(e.key==='Enter')sendChat()});
function sendChat(){const input=document.getElementById('chatInput');const txt=input.value.trim();if(!txt)return;const p=document.createElement('p');p.className='reply';p.textContent=txt;live.querySelector('.live-body').appendChild(p);input.value='';live.querySelector('.live-body').scrollTop=live.querySelector('.live-body').scrollHeight;}

const eco=document.querySelector('.ecosystem');if(eco&&matchMedia('(pointer:fine)').matches){const portrait=eco.querySelector('.main-portrait');eco.addEventListener('pointermove',e=>{const r=eco.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;portrait.style.transform=`translate(${x*8}px,${y*8}px)`});eco.addEventListener('pointerleave',()=>portrait.style.transform='')}

const beaconCount=document.getElementById('beaconCount');if(beaconCount)setInterval(()=>{const n=18+Math.floor(Math.random()*8);beaconCount.textContent=n;},2600);
document.querySelectorAll('video[autoplay]').forEach(v=>v.play().catch(()=>{}));
