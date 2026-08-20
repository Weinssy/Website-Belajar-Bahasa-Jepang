(() => {
  const log = document.querySelector('#chatLog');
  if (!log) return;
  const options = document.querySelector('#chatOptions'); const status = document.querySelector('#chatStatus'); let turn = 0;
  const turns = [
    { text: 'おはようございます。宿題はしましたか？', answers: [['はい、しました。','Bagus! Hari ini kita belajar pola baru.',true],['さようなら。','Itu berarti selamat tinggal. Coba balasan sesuai konteks.',false]] },
    { text: 'では、教室へ行きましょう。', answers: [['はい、行きましょう。','Tepat! Ayo pergi bersama.',true],['いいえ、食べます。','Perhatikan bahwa ini berarti “tidak, saya makan”.',false]] }
  ];
  function render() { const current = turns[turn]; log.innerHTML = `<p class="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 text-sm text-ink"><b>Sensei</b><br>${current.text}</p>`; options.innerHTML = current.answers.map((answer, index) => `<button class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-ink hover:border-crimson" data-index="${index}">${answer[0]}</button>`).join(''); status.textContent = 'Pilih balasan paling tepat.'; options.querySelectorAll('button').forEach(button => button.addEventListener('click', () => { const answer = current.answers[Number(button.dataset.index)]; status.textContent = answer[1]; status.className = `mt-3 text-xs font-bold ${answer[2] ? 'text-green-700' : 'text-crimson'}`; if (answer[2] && turn < turns.length - 1) { turn += 1; setTimeout(render, 700); } else if (answer[2]) status.textContent += ' Skenario selesai!'; })); }
  render();
})();
