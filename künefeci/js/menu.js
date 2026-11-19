/* Menü sayfası: kategoriye göre filtreleme */
(function(){
  var dugmeler=document.querySelectorAll('.filtre button');
  var kartlar=document.querySelectorAll('.menu-izgara .kart');
  dugmeler.forEach(function(d){
    d.addEventListener('click',function(){
      var kat=d.getAttribute('data-kat');
      dugmeler.forEach(function(x){x.classList.remove('aktif')});
      d.classList.add('aktif');
      kartlar.forEach(function(k){
        k.classList.toggle('gizle',kat!=='hepsi'&&k.getAttribute('data-kat')!==kat);
      });
    });
  });
})();
