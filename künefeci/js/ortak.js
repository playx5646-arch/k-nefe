var mb=document.getElementById('menuBtn'),ml=document.getElementById('menuListe');
mb.addEventListener('click',function(){ml.classList.toggle('acik')});
ml.addEventListener('click',function(e){if(e.target.tagName==='A')ml.classList.remove('acik')});
var yilEl=document.getElementById('yil');if(yilEl)yilEl.textContent=new Date().getFullYear();

/* ====== Kaydırınca geçişli açılma ======
   Yeni bölüm/sayfa eklerken bir öğeye "rv" sınıfı verirsen o da animasyonlu açılır.
   Yön için: rv-sol, rv-sag, rv-buyu */
(function(){
  if(!('IntersectionObserver' in window))return;
  var sec=['.baslik','.kart','.ozellik','.bilgi','.menu-tum','.sayilar','.rv',
           '.rv-sol','.rv-sag','.rv-buyu','.hakkimizda p','.zaman-oge'].join(',');
  var ogeler=document.querySelectorAll(sec);
  var io=new IntersectionObserver(function(kayitlar){
    kayitlar.forEach(function(k){
      if(!k.isIntersecting)return;
      var el=k.target;
      el.classList.add('goster');
      io.unobserve(el);
      // animasyon bitince sınıfları temizle (hover efektleri bozulmasın)
      setTimeout(function(){
        el.classList.remove('gizli','goster','sol','sag','buyu');
        el.style.transitionDelay='';
      },1600);
    });
  },{threshold:.15,rootMargin:'0px 0px -40px 0px'});
  ogeler.forEach(function(el){
    if(el.classList.contains('rv-sol'))el.classList.add('sol');
    if(el.classList.contains('rv-sag'))el.classList.add('sag');
    if(el.classList.contains('rv-buyu'))el.classList.add('buyu');
    // aynı grup içindeki kartlar sırayla açılsın
    var kardesler=el.parentElement?Array.prototype.filter.call(el.parentElement.children,function(c){return c.className===el.className}):[];
    var sira=kardesler.indexOf(el);
    if(sira>0)el.style.transitionDelay=(sira*0.12)+'s';
    el.classList.add('gizli');
    io.observe(el);
  });
})();
