(() => {
  const items = [['あ','a','Hiragana'],['き','ki','Hiragana'],['し','shi','Hiragana'],['ア','a','Katakana'],['コ','ko','Katakana'],['山','yama','Kanji'],['川','kawa','Kanji'],['学生','gakusei','Kanji']];
  const character = document.querySelector('#letterCharacter');
  if (!character) return;
  const type = document.querySelector('#letterType'); const input = document.querySelector('#letterInput'); const form = document.querySelector('#letterForm'); const next = document.querySelector('#letterNext'); const feedback = document.querySelector('#letterFeedback'); const scoreText = document.querySelector('#letterScore'); const remaining = document.querySelector('#letterRemaining'); const game = document.querySelector('#letterGame');
  let round = 0; let score = 0; let current; let answered = false;
  function showNext() { current = items[Math.floor(Math.random() * items.length)]; character.textContent = current[0]; type.textContent = current[2]; input.value = ''; input.focus(); answered = false; next.classList.add('hidden'); feedback.textContent = 'Ketik romaji'; feedback.className = 'text-sakura'; game.classList.remove('ring-4','ring-green-400','ring-red-400'); remaining.textContent = Math.max(0, 10 - round); }
  function advance() { round += 1; if (round >= 10) { remaining.textContent = '0'; feedback.textContent = `Selesai! Skor ${score}/10`; input.disabled = true; form.querySelector('button').disabled = true; next.classList.add('hidden'); return; } showNext(); }
  form.addEventListener('submit', event => { event.preventDefault(); if (answered || round >= 10) return; answered = true; if (input.value.trim().toLowerCase() === current[1]) { score += 1; scoreText.textContent = `${score}/10`; feedback.textContent = 'Benar! ✓'; feedback.className = 'text-green-300'; game.classList.add('ring-4','ring-green-400'); setTimeout(advance, 450); } else { feedback.textContent = `Belum tepat. Jawaban: ${current[1]}`; feedback.className = 'text-red-300'; game.classList.add('ring-4','ring-red-400'); next.classList.remove('hidden'); } });
  next.addEventListener('click', advance); showNext();
})();
