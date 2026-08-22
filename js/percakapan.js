(() => {
  const log = document.querySelector('#chatLog');
  if (!log) return;
  const options = document.querySelector('#chatOptions'); const status = document.querySelector('#chatStatus'); let turn = 0;
  const turns = [
    { text: 'おはようございます。宿題はしましたか？', answers: [['はい、しました。','Bagus! Hari ini kita belajar pola baru.',true],['さようなら。','Itu berarti selamat tinggal. Coba balasan sesuai konteks.',false]] },
    { text: 'では、教室へ行きましょう。', answers: [['はい、行きましょう。','Tepat! Ayo pergi bersama.',true],['いいえ、食べます。','Perhatikan bahwa ini berarti “tidak, saya makan”.',false]] },
    { text: '今日の授業は何ですか？', answers: [['日本語です。','Benar, hari ini pelajaran bahasa Jepang.',true],['駅へ行きます。','Itu berarti pergi ke stasiun. Jawab dengan nama pelajaran.',false]] },
    { text: '教科書を持ってきましたか？', answers: [['はい、持ってきました。','Bagus! Kamu siap mengikuti pelajaran.',true],['おいしいです。','Itu berarti enak. Coba jawab tentang membawa buku.',false]] },
    { text: '休み時間に何をしますか？', answers: [['友達と話します。','Tepat! Berbicara dengan teman adalah kegiatan yang wajar.',true],['先生です。','Itu berarti “adalah guru”. Jawab dengan kegiatan.',false]] },
    { text: '図書館で一緒に勉強しませんか？', answers: [['はい、勉強しましょう。','Benar! Ini ajakan belajar yang sopan.',true],['さようなら、先生。','Jawaban ini menutup percakapan, bukan menerima ajakan.',false]] },
    { text: '明日のテストは何時からですか？', answers: [['九時からです。','Tepat! Gunakan から untuk menyebut waktu mulai.',true],['教室を食べます。','Kelas bukan sesuatu yang dimakan. Jawab dengan waktu.',false]] },
    { text: '授業が終わりました。帰りましょう。', answers: [['はい、また明日。','Skenario selesai! Kamu sudah melewati percakapan sekolah.',true],['本をください。','Itu berarti meminta buku. Gunakan salam perpisahan.',false]] }
  ];
  function render() { const current = turns[turn]; log.innerHTML = `<p class="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 text-sm text-ink"><b>Sensei</b><br>${current.text}</p>`; options.innerHTML = current.answers.map((answer, index) => `<button class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-ink hover:border-crimson" data-index="${index}">${answer[0]}</button>`).join(''); status.textContent = 'Pilih balasan paling tepat.'; options.querySelectorAll('button').forEach(button => button.addEventListener('click', () => { const answer = current.answers[Number(button.dataset.index)]; status.textContent = answer[1]; status.className = `mt-3 text-xs font-bold ${answer[2] ? 'text-green-700' : 'text-crimson'}`; if (answer[2] && turn < turns.length - 1) { turn += 1; setTimeout(render, 700); } else if (answer[2]) status.textContent += ' Skenario selesai!'; })); }
  render();
})();
