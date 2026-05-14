const cur=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();

/* HAMBURGER */
const hamBtn=document.getElementById('ham'),mobNav=document.getElementById('mobnav');
hamBtn.addEventListener('click',()=>{hamBtn.classList.toggle('open');mobNav.classList.toggle('open');});
mobNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{hamBtn.classList.remove('open');mobNav.classList.remove('open');}));

/* SCROLL REVEAL */
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* COUNT UP */
const cobs=new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,target=+el.dataset.target;
    const lbl=el.closest('.stat-item').querySelector('.stat-label').textContent;
    const sfx=lbl.includes('%')?'%':lbl.includes('Year')||lbl.includes('yr')?'yr':lbl.includes('Hr')?'h':'+';
    let v=0;const step=target/60;
    const t=setInterval(()=>{v=Math.min(v+step,target);el.textContent=Math.floor(v)+(v>=target?sfx:'');if(v>=target)clearInterval(t);},18);
    cobs.unobserve(el);
  });
},{threshold:.5});
document.querySelectorAll('.stat-num[data-target]').forEach(el=>cobs.observe(el));

/* CARD 3D TILT */
document.querySelectorAll('.card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=e.clientX-r.left,y=e.clientY-r.top;
    const rx2=((y-r.height/2)/(r.height/2))*-5;
    const ry2=((x-r.width/2)/(r.width/2))*5;
    card.style.transform=`translateY(-8px) rotateX(${rx2}deg) rotateY(${ry2}deg)`;
    card.style.transformStyle='preserve-3d';
  });
  card.addEventListener('mouseleave',()=>{card.style.transform='';});
});

/* HIDE CURSOR ON MOBILE */
if('ontouchstart' in window){cur.style.display='none';ring.style.display='none';document.body.style.cursor='auto';}