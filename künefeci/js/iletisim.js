/* İletişim formu: mesajı WhatsApp'ta hazır açar.
   NUMARA'yı kendi numaranla değiştir (başında 90, boşluksuz). */
(function(){
  var NUMARA='905013324453';
  var form=document.getElementById('iletisimForm'),mesaj=document.getElementById('iletisimMesaj');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var ad=document.getElementById('ad').value.trim(),
        tel=document.getElementById('tel').value.trim(),
        konu=document.getElementById('konu').value,
        metin=document.getElementById('mesajMetin').value.trim();
    if(!ad||!metin)return;
    var yazi='Merhaba, ben '+ad+(tel?' ('+tel+')':'')+'.\nKonu: '+konu+'\n'+metin;
    window.open('https://wa.me/'+NUMARA+'?text='+encodeURIComponent(yazi),'_blank','noopener');
    mesaj.textContent='WhatsApp açılıyor, mesajını orada gönderebilirsin.';
    form.reset();
    setTimeout(function(){mesaj.textContent=''},5000);
  });
})();
