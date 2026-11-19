/* Galeri: fotoğraf listesi, kategori filtresi ve büyütme penceresi.
   Kendi fotoğraflarını img/galeri/ klasörüne koy ve aşağıdaki listeyi düzenle.
   Dosya bulunamazsa yerine emoji'li yer tutucu görünür. */
(function(){
  var FOTOLAR=[
    {src:'img/galeri/kunefe-1.jpg',baslik:'Sıcak künefe',kat:'kunefe',emoji:'🧀'},
    {src:'img/galeri/kunefe-2.jpg',baslik:'Fıstıklı künefe',kat:'kunefe',emoji:'🥜'},
    {src:'img/galeri/kunefe-3.jpg',baslik:'Servise hazır',kat:'kunefe',emoji:'🔥'},
    {src:'img/galeri/baklava-1.jpg',baslik:'Fıstıklı baklava tepsisi',kat:'baklava',emoji:'🍯'},
    {src:'img/galeri/baklava-2.jpg',baslik:'Cevizli baklava',kat:'baklava',emoji:'🥮'},
    {src:'img/galeri/baklava-3.jpg',baslik:'Şöbiyet',kat:'baklava',emoji:'🥐'},
    {src:'img/galeri/mekan-1.jpg',baslik:'Dükkanımız',kat:'mekan',emoji:'🏪'},
    {src:'img/galeri/mekan-2.jpg',baslik:'Çay ve künefe keyfi',kat:'mekan',emoji:'🍵'},
    {src:'img/galeri/mekan-3.jpg',baslik:'Ustamız iş başında',kat:'mekan',emoji:'👨‍🍳'}
  ];

  var izgara=document.getElementById('galeriIzgara');
  var kutu=document.getElementById('kutuAc'),buyuk=document.getElementById('kutuBuyuk'),alt=document.getElementById('kutuYazi');
  var gorunen=[],suan=0;

  function ciz(){
    izgara.innerHTML='';
    FOTOLAR.forEach(function(f,i){
      var b=document.createElement('button');
      b.type='button';b.className='foto';b.setAttribute('data-kat',f.kat);b.setAttribute('aria-label',f.baslik+' fotoğrafını büyüt');
      var yer=document.createElement('div');yer.className='yer';yer.textContent=f.emoji;
      var img=new Image();img.alt=f.baslik;img.loading='lazy';
      img.onload=function(){yer.style.display='none'};
      img.onerror=function(){img.remove()};
      img.src=f.src;
      var cap=document.createElement('figcaption');cap.textContent=f.baslik;
      b.appendChild(yer);b.appendChild(img);b.appendChild(cap);
      b.addEventListener('click',function(){ac(f)});
      izgara.appendChild(b);
    });
  }

  function listele(){
    gorunen=FOTOLAR.filter(function(f){
      var el=izgara.querySelector('[data-kat="'+f.kat+'"]');return el&&!el.classList.contains('gizle');
    });
  }

  function goster(){
    var f=gorunen[suan];
    buyuk.innerHTML='';
    var img=new Image();img.alt=f.baslik;
    img.onerror=function(){buyuk.textContent=f.emoji};
    img.src=f.src;buyuk.appendChild(img);
    alt.textContent=f.baslik;
  }
  function ac(f){listele();suan=Math.max(0,gorunen.indexOf(f));goster();kutu.classList.add('acik');document.body.style.overflow='hidden'}
  function kapat(){kutu.classList.remove('acik');document.body.style.overflow=''}
  function git(n){suan=(suan+n+gorunen.length)%gorunen.length;goster()}

  document.getElementById('kutuKapat').addEventListener('click',kapat);
  document.getElementById('kutuOnceki').addEventListener('click',function(){git(-1)});
  document.getElementById('kutuSonraki').addEventListener('click',function(){git(1)});
  kutu.addEventListener('click',function(e){if(e.target===kutu)kapat()});
  document.addEventListener('keydown',function(e){
    if(!kutu.classList.contains('acik'))return;
    if(e.key==='Escape')kapat();
    if(e.key==='ArrowLeft')git(-1);
    if(e.key==='ArrowRight')git(1);
  });

  var dugmeler=document.querySelectorAll('.filtre button');
  dugmeler.forEach(function(d){
    d.addEventListener('click',function(){
      var kat=d.getAttribute('data-kat');
      dugmeler.forEach(function(x){x.classList.remove('aktif')});
      d.classList.add('aktif');
      izgara.querySelectorAll('.foto').forEach(function(el){
        el.classList.toggle('gizle',kat!=='hepsi'&&el.getAttribute('data-kat')!==kat);
      });
    });
  });

  ciz();
})();
