(function(){
  var page=document.body.getAttribute('data-page')||'home';
  function act(p){return page===p?' active':'';}
  var BACKDROP=`<div class="bgfixed">
    <div class="layer" id="day">
      <div style="position:absolute;left:0;right:0;top:0;height:42%;background:linear-gradient(180deg,rgba(255,224,160,.18),transparent)"></div>
      <div style="position:absolute;left:0;right:0;bottom:0;height:34%;background:linear-gradient(0deg,rgba(210,160,80,.07),transparent)"></div>
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 62% 16%,transparent 52%,rgba(80,58,24,.13) 100%)"></div>
    </div>
    <div class="layer" id="golden" style="opacity:0">
      <div style="position:absolute;width:80vw;height:40vw;left:50%;transform:translateX(-50%);bottom:-18vw;border-radius:50%;background:radial-gradient(ellipse,rgba(255,148,52,.5),rgba(255,120,44,.14) 48%,transparent 72%)"></div>
      <div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(255,138,52,.18),transparent 58%)"></div>
    </div>
    <div class="layer" id="night" style="opacity:0">
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,7,5,.5),rgba(10,8,5,.16) 46%,rgba(5,4,2,.46))"></div>
      <div style="position:absolute;left:0;right:0;top:0;height:46%;background:linear-gradient(180deg,rgba(74,92,120,.07),transparent)"></div>
      <div class="glow" style="left:13%;animation-duration:5.5s"></div>
      <div class="glow" style="left:37%;width:30vw;animation-duration:7.2s;animation-delay:-2s"></div>
      <div class="glow" style="left:62%;width:40vw;animation-duration:6.1s;animation-delay:-3.5s"></div>
      <div class="glow" style="left:86%;animation-duration:8s;animation-delay:-1s"></div>
      <div style="position:absolute;inset:0;background:radial-gradient(125% 95% at 50% 34%,transparent 55%,rgba(0,0,0,.6))"></div>
    </div>
    <div class="layer">
      <div id="sundisc"></div>
      <div id="rays">
        <div class="beam" style="--r:-30deg;animation-duration:13s"></div>
        <div class="beam" style="--r:-20deg;animation-duration:17s;animation-delay:-3s"></div>
        <div class="beam" style="--r:-10deg;animation-duration:15s;animation-delay:-6s"></div>
        <div class="beam" style="--r:0deg;animation-duration:19s;animation-delay:-2s"></div>
        <div class="beam" style="--r:10deg;animation-duration:14s;animation-delay:-7s"></div>
        <div class="beam" style="--r:20deg;animation-duration:18s;animation-delay:-4s"></div>
        <div class="beam" style="--r:30deg;animation-duration:16s;animation-delay:-1s"></div>
      </div>
    </div>
    <canvas id="mana"></canvas>
  </div>`;
  var HEADER=`<header id="hdr"><div class="wrap"><nav>
    <a class="logo disp" href="index.html">FIP·PROPS</a>
    <a class="link${act('catalog')}" href="catalog.html">Catalog</a>
    <a class="link" href="#">Productions</a>
    <a class="link${act('about')}" href="about.html">About</a>
    <a class="link${act('contact')}" href="contact.html">Contact</a>
    <span style="flex:1"></span>
    <span class="lang"><b>EN</b> · CZ · DE · HU</span>
    <button class="tbtn" id="toggle" aria-label="Toggle day or night"><i class="ti ti-moon"></i></button>
    <a class="login" href="login.html"><i class="ti ti-user" style="font-size:14px"></i> Client login</a>
    <button class="menu-btn" id="menuBtn" aria-label="Menu"><i class="ti ti-menu-2"></i></button>
    <div class="mmenu" id="mmenu"><a href="catalog.html">Catalog</a><a href="#">Productions</a><a href="about.html">About</a><a href="contact.html">Contact</a></div>
  </nav></div></header>`;
  document.body.insertAdjacentHTML('afterbegin',BACKDROP+HEADER);

  var root=document.documentElement,day=document.getElementById('day'),gold=document.getElementById('golden'),night=document.getElementById('night'),sundisc=document.getElementById('sundisc'),toggle=document.getElementById('toggle'),hdr=document.getElementById('hdr');
  var D={bg:'#E9E1CF',headline:'#33260f',eyebrow:'#9a6618',subtext:'#6a5d45',nav:'#5a4f3b',logo:'#6a4a1c',muted:'#8a7a59',btnbg:'#B5772A',btntext:'#fbf4e6',searchfg:'#9a8a66',cardborder:'#ddd4be',cardtitle:'#33260f',icon:'#B5772A',mote:[255,236,188,0.95],searchbg:[255,255,255,0.72],ray:[255,228,160,0.16],panelbg:[233,225,207,0.5],cardbg:[255,255,255,0.52]};
  var G={bg:'#7c4a22',headline:'#FBEACF',eyebrow:'#FFD27A',subtext:'#F0CFA0',nav:'#F2D9B0',logo:'#FFCF78',muted:'#E5B584',btnbg:'#F2A23A',btntext:'#3a1f0a',searchfg:'#EAC998',cardborder:'#a8682f',cardtitle:'#FBEACF',icon:'#FFC15A',mote:[255,206,128,0.95],searchbg:[60,32,14,0.5],ray:[255,176,86,0.22],panelbg:[124,74,34,0.46],cardbg:[120,70,32,0.5]};
  var N={bg:'#0a0704',headline:'#F5EAD0',eyebrow:'#E8A33D',subtext:'#cdba8e',nav:'#c4b18c',logo:'#E8B85A',muted:'#8a7a55',btnbg:'#E8A33D',btntext:'#1a1206',searchfg:'#9a8358',cardborder:'#3a2c18',cardtitle:'#e7d9b8',icon:'#E8A33D',mote:[250,236,210,0.95],searchbg:[16,11,5,0.55],ray:[245,170,80,0.18],panelbg:[12,9,5,0.5],cardbg:[28,22,13,0.52]};
  function hx(h){h=h.replace('#','');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
  function L(a,b,t){return a+(b-a)*t;}
  function Lr(a,b,t){return Math.round(L(a,b,t));}
  function m2(h1,h2,t){var a=hx(h1),b=hx(h2);return 'rgb('+Lr(a[0],b[0],t)+','+Lr(a[1],b[1],t)+','+Lr(a[2],b[2],t)+')';}
  function tri(d,g,n,t){return t<0.5?m2(d,g,t*2):m2(g,n,(t-0.5)*2);}
  function a4(a,b,t){return [Lr(a[0],b[0],t),Lr(a[1],b[1],t),Lr(a[2],b[2],t),+L(a[3],b[3],t).toFixed(3)];}
  function arr(d,g,n,t){return t<0.5?a4(d,g,t*2):a4(g,n,(t-0.5)*2);}
  function rgba(x){return 'rgba('+x[0]+','+x[1]+','+x[2]+','+x[3]+')';}
  var keys=['bg','headline','eyebrow','subtext','nav','logo','muted','btnbg','btntext','searchfg','cardborder','cardtitle','icon'];
  var DEG=180/Math.PI, cur=0;
  function render(t){
    cur=t;
    root.style.setProperty('--t',t.toFixed(3));
    keys.forEach(function(k){root.style.setProperty('--'+k,tri(D[k],G[k],N[k],t));});
    root.style.setProperty('--searchbg',rgba(arr(D.searchbg,G.searchbg,N.searchbg,t)));
    root.style.setProperty('--raycol',rgba(arr(D.ray,G.ray,N.ray,t)));
    root.style.setProperty('--panelbg',rgba(arr(D.panelbg,G.panelbg,N.panelbg,t)));
    root.style.setProperty('--cardbg',rgba(arr(D.cardbg,G.cardbg,N.cardbg,t)));
    var th=(88*t*t-200*t+90)/DEG;
    var sx=50+72*Math.cos(th), sy=55-92*Math.sin(th);
    var rot=Math.atan2(sx-50,50-sy)*DEG;
    root.style.setProperty('--sunx',sx.toFixed(1)+'%');
    root.style.setProperty('--suny',sy.toFixed(1)+'%');
    root.style.setProperty('--sunrot',rot.toFixed(1)+'deg');
    day.style.opacity=1-t; night.style.opacity=t;
    gold.style.opacity=Math.max(0,1-Math.abs(t-0.5)*2);
    sundisc.style.opacity=t<0.5?1:Math.max(0,1-(t-0.5)*2.4);
    toggle.innerHTML=t<0.5?'<i class="ti ti-moon"></i>':'<i class="ti ti-sun"></i>';
  }
  render(localStorage.getItem('fp-night')==='1'?1:0);
  var raf=null;
  function tween(target){var s=cur,t0=performance.now(),dur=2600;if(raf)cancelAnimationFrame(raf);
    function step(now){var p=Math.min(1,(now-t0)/dur);var e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;render(s+(target-s)*e);if(p<1)raf=requestAnimationFrame(step);}
    raf=requestAnimationFrame(step);}
  toggle.addEventListener('click',function(){var target=cur<0.5?1:0;localStorage.setItem('fp-night',target===1?'1':'0');tween(target);});
  var mb=document.getElementById('menuBtn'),mm=document.getElementById('mmenu');
  mb.addEventListener('click',function(e){e.stopPropagation();mm.classList.toggle('open');});
  document.addEventListener('click',function(){mm.classList.remove('open');});
  function onScroll(){if(window.scrollY>40)hdr.classList.add('scrolled');else hdr.classList.remove('scrolled');}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  /* mana by day, stars by night */
  var cv=document.getElementById('mana'),ctx=cv.getContext('2d'),W=1,H=1,DPR=1,parts=[],scSmooth=0;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function R(a,b){return a+Math.random()*(b-a);}
  function cl(v){return v<0?0:v>1?1:v;}
  function reset(p,init){p.x=R(0,W);p.y=init?R(-0.1*H,H):H+R(4,40);p.r=R(0.9,2.6);p.vy=R(10,24);p.ph=R(0,6.283);p.sa=R(5,16);p.ss=R(.15,.5);p.sfx=Math.random();p.sfy=R(.03,.64);p.tsp=R(.25,.8);p.tph=R(0,6.283);p.depth=R(.5,1.5);}
  function resize(){DPR=Math.min(2,window.devicePixelRatio||1);W=cv.clientWidth;H=cv.clientHeight;cv.width=Math.max(1,W*DPR);cv.height=Math.max(1,H*DPR);ctx.setTransform(DPR,0,0,DPR,0,0);var n=Math.max(45,Math.min(120,Math.round(W/14)));while(parts.length<n){var p={};reset(p,true);parts.push(p);}parts.length=Math.min(parts.length,n);}
  function draw(dt,now){
    ctx.clearRect(0,0,W,H);
    var col=arr(D.mote,G.mote,N.mote,cur),base=col[3],r=col[0],g=col[1],b=col[2];
    var tgt=window.scrollY||window.pageYOffset||0; scSmooth+=(tgt-scSmooth)*Math.min(1,dt*6);
    ctx.globalCompositeOperation='lighter';
    for(var i=0;i<parts.length;i++){var p=parts[i];
      p.y-=p.vy*dt; p.x+=Math.sin(now*p.ss+p.ph)*p.sa*dt;
      if(p.y<-12){p.y=H+R(4,40);p.x=R(0,W);}
      var manaA=Math.min(cl((H-p.y)/(0.12*H)),cl(p.y/(0.22*H)));
      var stx=p.sfx*W,sty=p.sfy*H;
      var tw=0.12+0.4*(0.5+0.5*Math.sin(now*p.tsp+p.tph));
      var px=L(p.x,stx,cur),py=L(p.y,sty,cur)-scSmooth*0.1*p.depth*cur;
      var dx=(px-W*0.40)/(W*0.58),dy=(py-H*0.5)/(H*0.32),d=Math.sqrt(dx*dx+dy*dy);
      var a=L(manaA,tw,cur)*base*L(1,0.14+0.86*cl((d-0.35)/0.6),cur);
      if(a<=0.004)continue;
      ctx.beginPath();
      ctx.shadowColor='rgba('+r+','+g+','+b+','+(a*0.8).toFixed(3)+')';
      ctx.shadowBlur=p.r*5;
      ctx.fillStyle='rgba('+r+','+g+','+b+','+a.toFixed(3)+')';
      ctx.arc(px,py,p.r,0,6.2832);ctx.fill();
    }
    ctx.shadowBlur=0;ctx.globalCompositeOperation='source-over';
  }
  var last=0;
  function loop(now){var dt=Math.min(0.05,(now-last)/1000)||0.016;last=now;draw(dt,now/1000);af=requestAnimationFrame(loop);}
  var af=null;
  resize(); window.addEventListener('resize',resize);
  if(reduce){draw(0,0);} else {af=requestAnimationFrame(loop);}
})();
