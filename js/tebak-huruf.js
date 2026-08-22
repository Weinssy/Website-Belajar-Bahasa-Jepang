(() => {
  const kana = [
    ['あいうえお', ['a', 'i', 'u', 'e', 'o']], ['かきくけこ', ['ka', 'ki', 'ku', 'ke', 'ko']], ['さしすせそ', ['sa', 'shi', 'su', 'se', 'so']],
    ['たちつてと', ['ta', 'chi', 'tsu', 'te', 'to']], ['なにぬねの', ['na', 'ni', 'nu', 'ne', 'no']], ['はひふへほ', ['ha', 'hi', 'fu', 'he', 'ho']],
    ['まみむめも', ['ma', 'mi', 'mu', 'me', 'mo']], ['やゆよ', ['ya', 'yu', 'yo']], ['らりるれろ', ['ra', 'ri', 'ru', 're', 'ro']],
    ['わをん', ['wa', 'wo', 'n']], ['がぎぐげご', ['ga', 'gi', 'gu', 'ge', 'go']], ['ざじずぜぞ', ['za', 'ji', 'zu', 'ze', 'zo']],
    ['だぢづでど', ['da', 'ji', 'zu', 'de', 'do']], ['ばびぶべぼ', ['ba', 'bi', 'bu', 'be', 'bo']], ['ぱぴぷぺぽ', ['pa', 'pi', 'pu', 'pe', 'po']]
  ];
  const hiragana = kana.flatMap(([characters, readings]) => [...characters].map((character, index) => [character, readings[index], 'Hiragana']));
  const katakana = hiragana.map(([character, reading]) => [String.fromCodePoint(character.codePointAt(0) + 0x60), reading, 'Katakana']);
  const hiraganaWords = [
    ['こんにちは', 'konnichiwa'], ['ありがとう', 'arigatou'], ['せんせい', 'sensei'], ['がっこう', 'gakkou'],
    ['きょうしつ', 'kyoushitsu'], ['ともだち', 'tomodachi'], ['べんきょう', 'benkyou'], ['たべもの', 'tabemono']
  ].map(([word, reading]) => [word, reading, 'Hiragana']);
  const katakanaWords = [
    ['テスト', 'tesuto'], ['クラス', 'kurasu'], ['ノート', 'nooto'], ['ペン', 'pen'],
    ['デスク', 'desuku'], ['センセイ', 'sensei'], ['コンピューター', 'konpyuutaa'], ['スポーツ', 'supootsu']
  ].map(([word, reading]) => [word, reading, 'Katakana']);
  const kanji = [
    ['日', 'hi'], ['月', 'tsuki'], ['火', 'hi'], ['水', 'mizu'], ['木', 'ki'], ['金', 'kane'], ['土', 'tsuchi'],
    ['山', 'yama'], ['川', 'kawa'], ['田', 'ta'], ['天', 'ten'], ['気', 'ki'], ['雨', 'ame'], ['空', 'sora'],
    ['人', 'hito'], ['子', 'ko'], ['女', 'onna'], ['男', 'otoko'], ['父', 'chichi'], ['母', 'haha'], ['友', 'tomo'],
    ['先', 'saki'], ['生', 'sei'], ['学', 'gaku'], ['校', 'kou'], ['本', 'hon'], ['名', 'namae'], ['年', 'toshi'],
    ['上', 'ue'], ['下', 'shita'], ['中', 'naka'], ['大', 'oo'], ['小', 'chiisai'], ['長', 'nagai'], ['高', 'takai'],
    ['新', 'atarashii'], ['古', 'furui'], ['白', 'shiro'], ['赤', 'aka'], ['青', 'ao'], ['食', 'taberu'], ['飲', 'nomu'],
    ['見', 'miru'], ['聞', 'kiku'], ['話', 'hanasu'], ['読', 'yomu'], ['書', 'kaku'], ['行', 'iku'], ['来', 'kuru'], ['電', 'den'],
    ['車', 'kuruma'], ['駅', 'eki'], ['道', 'michi'], ['何', 'nani'], ['毎', 'mai'], ['円', 'en'], ['午', 'go'], ['前', 'mae'], ['後', 'ato'],
    ['学生', 'gakusei'], ['先生', 'sensei'], ['学校', 'gakkou'], ['日本', 'nihon']
  ].map(([character, reading]) => [character, reading, 'Kanji']);
  const items = [...hiragana, ...hiraganaWords, ...katakana, ...katakanaWords, ...kanji];
  const types = ['Hiragana', 'Katakana', 'Kanji'];
  const character = document.querySelector('#letterCharacter');
  if (!character) return;
  const type = document.querySelector('#letterType'); const input = document.querySelector('#letterInput'); const form = document.querySelector('#letterForm'); const next = document.querySelector('#letterNext'); const feedback = document.querySelector('#letterFeedback'); const scoreText = document.querySelector('#letterScore'); const remaining = document.querySelector('#letterRemaining'); const game = document.querySelector('#letterGame');
  let selectedItems = [...items]; let round = 0; let score = 0; let current; let answered = false;

  const setup = document.createElement('section');
  setup.className = 'mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm';
  setup.innerHTML = `<div class="flex flex-wrap items-start justify-between gap-4"><div><h2 class="font-display text-2xl">Atur latihan</h2><p class="mt-1 text-sm text-slate-500">Pilih mode dan karakter yang ingin muncul.</p></div><div class="flex gap-2"><button id="refreshLetterGame" type="button" class="rounded-xl border border-slate-300 px-4 py-3 font-bold text-slate-600 transition hover:border-crimson hover:text-crimson">Refresh</button><button id="startLetterGame" type="button" disabled class="rounded-xl bg-crimson px-5 py-3 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">Mulai latihan</button></div></div><fieldset class="mt-6"><legend class="text-sm font-bold">Menu latihan</legend><div class="mt-3 flex flex-wrap gap-2"><label class="option flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm"><input type="radio" name="letterMode" value="single" checked><span>Satu huruf</span></label><label class="option flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm"><input type="radio" name="letterMode" value="word"><span>Banyak huruf / kosakata</span></label></div></fieldset><div id="letterMenus" class="mt-6 space-y-5"></div><p id="selectionHint" class="mt-4 text-sm text-crimson" aria-live="polite"></p>`;
  game.parentElement.parentElement.insertBefore(setup, game.parentElement);
  game.classList.add('hidden');
  const menus = setup.querySelector('#letterMenus'); const startButton = setup.querySelector('#startLetterGame'); const refreshButton = setup.querySelector('#refreshLetterGame'); const selectionHint = setup.querySelector('#selectionHint'); const modeInputs = setup.querySelectorAll('input[name="letterMode"]');

  function choiceMarkup(id, label, group, checked) { return `<label class="option flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm transition hover:border-crimson"><input type="checkbox" data-group="${group}" data-index="${id}" ${checked ? 'checked' : ''}><span>${label}</span></label>`; }
  function renderMenus() {
    const mode = setup.querySelector('input[name="letterMode"]:checked').value;
    menus.innerHTML = types.map(typeName => {
      const typeItems = items.map((item, index) => ({ item, index })).filter(({ item }) => item[2] === typeName && (mode === 'single' ? [...item[0]].length === 1 : [...item[0]].length > 1));
      if (!typeItems.length) return `<section class="rounded-2xl border border-dashed border-slate-200 p-5"><h3 class="font-display text-xl">${typeName}</h3><p class="mt-2 text-sm text-slate-500">Belum ada kosakata ${typeName.toLowerCase()} yang tersedia.</p></section>`;
      return `<fieldset class="rounded-2xl border border-slate-200 p-5" data-type="${typeName}"><legend class="px-2 font-display text-xl">${typeName}</legend><label class="option mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold transition hover:border-crimson"><input type="checkbox" data-group="type" data-type="${typeName}" checked><span>Pilih semua ${typeName}</span></label><div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">${typeItems.map(({ item, index }) => choiceMarkup(index, `${item[0]} <span class="text-slate-500">${item[1]}</span>`, 'character', true)).join('')}</div></fieldset>`;
    }).join('');
    updateSelection();
  }

  function updateSelection() {
    selectedItems = [...menus.querySelectorAll('input[data-group="character"]')].filter(input => input.checked).map(input => items[Number(input.dataset.index)]);
    startButton.disabled = selectedItems.length === 0;
    selectionHint.textContent = selectedItems.length ? `${selectedItems.length} pilihan dipilih.` : 'Pilih setidaknya satu pilihan.';
  }
  menus.addEventListener('change', event => {
    const typeToggle = event.target.closest('input[data-group="type"]');
    if (typeToggle) menus.querySelectorAll(`fieldset[data-type="${typeToggle.dataset.type}"] input[data-group="character"]`).forEach(input => { input.checked = typeToggle.checked; });
    if (event.target.matches('input[data-group="character"]')) {
      const fieldset = event.target.closest('fieldset[data-type]');
      const characters = [...fieldset.querySelectorAll('input[data-group="character"]')];
      fieldset.querySelector('input[data-group="type"]').checked = characters.every(input => input.checked);
    }
    updateSelection();
  });
  modeInputs.forEach(input => input.addEventListener('change', renderMenus));

  function showNext() { current = selectedItems[Math.floor(Math.random() * selectedItems.length)]; character.textContent = current[0]; type.textContent = current[2]; input.value = ''; input.focus(); answered = false; next.classList.add('hidden'); feedback.textContent = 'Ketik romaji'; feedback.className = 'text-sakura'; game.classList.remove('ring-4','ring-green-400','ring-red-400'); remaining.textContent = Math.max(0, 10 - round); }
  function advance() { round += 1; if (round >= 10) { remaining.textContent = '0'; feedback.textContent = `Selesai! Skor ${score}/10`; input.disabled = true; form.querySelector('button').disabled = true; next.classList.add('hidden'); return; } showNext(); }
  startButton.addEventListener('click', () => { round = 0; score = 0; scoreText.textContent = '0/10'; input.disabled = false; form.querySelector('button').disabled = false; setup.classList.add('hidden'); game.classList.remove('hidden'); showNext(); });
  refreshButton.addEventListener('click', () => window.location.reload());
  const gameActions = document.createElement('div'); gameActions.className = 'mt-3 grid grid-cols-2 gap-2'; gameActions.innerHTML = '<button id="backLetterGame" type="button" class="rounded-xl border border-slate-400 px-4 py-3 font-bold text-slate-300 transition hover:border-white hover:text-white">Kembali</button><button id="refreshActiveLetterGame" type="button" class="rounded-xl border border-slate-400 px-4 py-3 font-bold text-slate-300 transition hover:border-white hover:text-white">Refresh</button>'; game.append(gameActions);
  const backButton = gameActions.querySelector('#backLetterGame');
  const activeRefreshButton = gameActions.querySelector('#refreshActiveLetterGame');
  backButton.addEventListener('click', () => { game.classList.add('hidden'); setup.classList.remove('hidden'); });
  activeRefreshButton.addEventListener('click', () => window.location.reload());
  form.addEventListener('submit', event => { event.preventDefault(); if (answered || round >= 10) return; answered = true; if (input.value.trim().toLowerCase() === current[1]) { score += 1; scoreText.textContent = `${score}/10`; feedback.textContent = 'Benar! ✓'; feedback.className = 'text-green-300'; game.classList.add('ring-4','ring-green-400'); setTimeout(advance, 450); } else { feedback.textContent = `Belum tepat. Jawaban: ${current[1]}`; feedback.className = 'text-red-300'; game.classList.add('ring-4','ring-red-400'); next.classList.remove('hidden'); } });
  next.addEventListener('click', advance); renderMenus();
})();
