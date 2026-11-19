var sayac=0;
function tepsi(ad){
  var id='c'+(sayac++),parca='';
  for(var i=-4;i<=4;i++){
    for(var j=-4;j<=4;j++){
      var x=100+(i*22),y=100+(j*22);
      parca+='<rect x="'+(x-9)+'" y="'+(y-9)+'" width="18" height="18" rx="2" fill="url(#g'+id+')" stroke="#8a6a00" stroke-width="1"/>'+
             '<circle cx="'+x+'" cy="'+y+'" r="2.6" fill="#7aa33a"/>';
    }
  }
  return '<div class="tepsi"><svg viewBox="0 0 200 200" aria-hidden="true">'+
    '<defs>'+
      '<linearGradient id="g'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe066"/><stop offset="1" stop-color="#e0a800"/></linearGradient>'+
      '<clipPath id="'+id+'"><circle cx="100" cy="100" r="76"/></clipPath>'+
    '</defs>'+
    '<circle cx="100" cy="100" r="96" fill="#cfcfcf" stroke="#fff" stroke-width="3"/>'+
    '<circle cx="100" cy="100" r="86" fill="#f5c400"/>'+
    '<circle cx="100" cy="100" r="80" fill="#2a2100"/>'+
    '<g clip-path="url(#'+id+')"><g transform="rotate(45 100 100)">'+parca+'</g></g>'+
    '</svg><span>'+ad+'</span></div>';
}
var isimler=['Fıstıklı Baklava','Cevizli Baklava','Şöbiyet','Dolama','Kuru Baklava','Midye Baklava','Havuç Dilimi','Fıstık Sarma'];
var tek='';isimler.forEach(function(a){tek+=tepsi(a)});
document.getElementById('tepsiHat').innerHTML=tek+tek;
var ANAHTAR='ahmet_yorumlar_v1';
var ornekler=[
  {ad:'Örnek Müşteri',yildiz:5,metin:'Bu bir örnek yorumdur. Gerçek yorumlar geldikçe buraya eklenecek.',tarih:'',ornek:true},
  {ad:'Örnek Müşteri 2',yildiz:5,metin:'Bu da örnek yorumdur; kodundan silebilirsin.',tarih:'',ornek:true}
];
function oku(){try{var v=JSON.parse(localStorage.getItem(ANAHTAR));return Array.isArray(v)?v:[]}catch(e){return[]}}
function yaz(v){try{localStorage.setItem(ANAHTAR,JSON.stringify(v))}catch(e){}}
function kac(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
var gelenler=oku();
function ciz(){
  var liste=gelenler.concat(ornekler);
  document.getElementById('yorumListe').innerHTML=liste.map(function(y){
    return '<div class="yorum"><div class="yorum-ust"><b>'+kac(y.ad)+(y.ornek?'<span class="ornek">örnek</span>':'')+
      '</b><span class="yildiz">'+'★'.repeat(y.yildiz)+'☆'.repeat(5-y.yildiz)+'</span></div>'+
      '<p>'+kac(y.metin)+'</p>'+(y.tarih?'<small>'+kac(y.tarih)+'</small>':'')+'</div>';
  }).join('');
}
ciz();
document.getElementById('yorumForm').addEventListener('submit',function(e){
  e.preventDefault();
  var ad=document.getElementById('isim').value.trim(),
      metin=document.getElementById('metin').value.trim(),
      yildiz=parseInt(document.querySelector('input[name=yildiz]:checked').value,10);
  if(!ad||!metin)return;
  gelenler.unshift({ad:ad,yildiz:yildiz,metin:metin,tarih:new Date().toLocaleDateString('tr-TR')});
  yaz(gelenler);ciz();this.reset();
  document.getElementById('y5').checked=true;
  document.getElementById('mesaj').textContent='Teşekkürler, yorumun eklendi! 🙏';
  setTimeout(function(){document.getElementById('mesaj').textContent=''},3500);
});
