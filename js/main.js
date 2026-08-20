(() => {
  const menuButton = document.querySelector('#menuButton'); const nav = document.querySelector('#mainNav');
  if (menuButton) menuButton.addEventListener('click', () => { const closed = nav.classList.toggle('hidden'); menuButton.setAttribute('aria-expanded', String(!closed)); });
  document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => { nav?.classList.add('hidden'); menuButton?.setAttribute('aria-expanded','false'); }));
  const toggle = document.querySelector('#furiganaToggle');
  if (toggle) toggle.addEventListener('click', () => { const off = document.body.classList.toggle('furigana-off'); toggle.setAttribute('aria-checked', String(!off)); document.querySelector('#furiganaState').textContent = off ? 'OFF' : 'ON'; document.querySelector('#furiganaDot').classList.toggle('bg-crimson', !off); document.querySelector('#furiganaDot').classList.toggle('bg-slate-400', off); });
  const entries = [
    { keys:'wa desu は です', title:'~ wa ~ desu', meaning:'Menyatakan identitas atau keadaan dengan sopan.', formula:'A は B です', example:'<ruby>私<rt>わたし</rt></ruby>は<ruby>高校生<rt>こうこうせい</rt></ruby>です。', translation:'Saya siswa SMA.' },
    { keys:'ni ikimasu pergi tujuan に いきます', title:'~ ni ikimasu', meaning:'Menyatakan pergi ke suatu tempat.', formula:'Tempat に 行きます', example:'<ruby>学校<rt>がっこう</rt></ruby>に<ruby>行<rt>い</rt></ruby>きます。', translation:'Saya pergi ke sekolah.' },
    { keys:'masen tidak negasi ません', title:'~ masen', meaning:'Menyatakan kegiatan yang tidak dilakukan.', formula:'Kata kerja masu → masen', example:'<ruby>明日<rt>あした</rt></ruby>は<ruby>勉強<rt>べんきょう</rt></ruby>しません。', translation:'Besok saya tidak belajar.' }
  ];
  const search = document.querySelector('#grammarSearch'); const results = document.querySelector('#grammarResults');
  if (search && results) { const render = () => { const query = search.value.toLowerCase().trim(); const found = entries.filter(entry => !query || `${entry.keys} ${entry.title} ${entry.meaning}`.toLowerCase().includes(query)); results.innerHTML = found.length ? found.map(entry => `<article class="rounded-xl border border-slate-200 bg-white p-4"><div class="flex flex-wrap justify-between gap-2"><strong class="text-crimson">${entry.title}</strong><span class="rounded-full bg-sakura/40 px-3 py-1 text-xs font-bold">${entry.formula}</span></div><p class="mt-2 text-sm text-slate-600">${entry.meaning}</p><p class="mt-3 font-display text-xl">${entry.example}</p><p class="mt-1 text-xs text-slate-500">${entry.translation}</p></article>`).join('') : '<p class="rounded-xl bg-white p-4 text-sm text-slate-500">Pola belum ditemukan.</p>'; }; search.addEventListener('input', render); render(); }
})();
