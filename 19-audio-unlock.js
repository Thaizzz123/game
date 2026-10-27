// ─── MỞ KHÓA ÂM THANH TRÊN ĐIỆN THOẠI ───
// Điện thoại (nhất là iPhone) chặn âm thanh cho tới khi người dùng chạm màn hình,
// và công tắc gạt tắt chuông còn làm câm luôn âm thanh của game.
// File này: (1) theo dõi mọi bộ âm thanh của game, mỗi lần chạm thì bật lại,
//           (2) phát 1 đoạn im lặng để điện thoại coi đây là "đang phát nhạc" (không bị tắt tiếng theo công tắc chuông).
(function () {
    const Orig = window.AudioContext || window.webkitAudioContext;
    if (!Orig) return;

    const ctxs = [];
    window.GAME_AUDIO_CTXS = ctxs;   // chỉ để kiểm tra
    function Tracked() { const c = new (Function.prototype.bind.apply(Orig, [null].concat([].slice.call(arguments))))(); ctxs.push(c); return c; }
    Tracked.prototype = Orig.prototype;
    window.AudioContext = Tracked;
    window.webkitAudioContext = Tracked;

    // Đoạn WAV im lặng ~0.5 giây tạo bằng code (không cần file ngoài)
    function silentWavUrl() {
        const rate = 8000, n = rate / 2, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
        const w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
        w(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); w(8, 'WAVE'); w(12, 'fmt ');
        v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
        v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
        w(36, 'data'); v.setUint32(40, n * 2, true);
        return URL.createObjectURL(new Blob([buf], { type: 'audio/wav' }));
    }

    let el = null;
    function unlock() {
        try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) { /* bỏ qua */ }
        if (!el) {
            try {
                el = document.createElement('audio');
                el.src = silentWavUrl(); el.loop = true; el.setAttribute('playsinline', ''); el.volume = 0.01;
            } catch (e) { el = null; }
        }
        if (el) { const p = el.play(); if (p && p.catch) p.catch(function () {}); }
        ctxs.forEach(function (c) { try { if (c.state !== 'running') c.resume(); } catch (e) { /* bỏ qua */ } });
    }

    // Mỗi lần chạm đều thử bật lại (có bộ âm thanh mới được tạo sau đó cũng được bật)
    ['touchstart', 'touchend', 'pointerdown', 'click', 'keydown'].forEach(function (ev) {
        document.addEventListener(ev, unlock, { passive: true, capture: true });
    });
    // Quay lại tab/app thì bật lại
    document.addEventListener('visibilitychange', function () { if (!document.hidden) unlock(); });
})();
