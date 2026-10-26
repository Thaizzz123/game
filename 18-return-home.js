// ─── SAU KHI KẾT THÚC TRẬN → VỀ MÀN HÌNH CHÍNH ĐỂ CHƠI VÁN MỚI ───
// Áp dụng cho: hết giờ / hết máu / Admin cưỡng chế kết thúc.
// Bảng xếp hạng vẫn hiện để xem; bấm nút bên dưới thì về màn hình chính với trạng thái sạch (như mới mở game).
(function () {
    const old = document.getElementById('btn-play-again');
    if (!old) return;
    const btn = old.cloneNode(true);          // bỏ các sự kiện cũ
    old.parentNode.replaceChild(btn, old);
    btn.innerText = '🏠 Về màn hình chính';
    btn.addEventListener('click', () => {
        try { if (p2p && p2p.peer) p2p.peer.destroy(); } catch (e) { /* bỏ qua */ }
        location.reload();                      // reset sạch toàn bộ: máu, điểm, phòng, kết nối
    });

    // Khi trận đã KẾT THÚC mà đang xem bảng xếp hạng thì luôn hiện nút (kể cả Admin)
    setInterval(() => {
        const r = document.getElementById('screen-result');
        if (r && r.classList.contains('active') && gameState.status === 'ENDED') {
            if (btn.style.display === 'none') btn.style.display = '';
        }
    }, 400);
})();
