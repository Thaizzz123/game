// ============================================ //
// ─── ADMIN: MÃ QR CỐ ĐỊNH VÀO GAME ───
//
// File độc lập: chỉ THÊM 1 khối QR vào cuối màn hình Admin.
// - Bấm vào ảnh QR  -> phóng to toàn màn hình (có nút X góc phải trên để đóng)
// - Nút "Lưu ảnh QR" -> tải ảnh QR về máy
// Không đụng vào state, P2P, hay bất kỳ logic game nào.
// Ảnh QR được nhúng thẳng trong file này (không cần upload thêm ảnh).
// Muốn đổi link game: tạo QR mới rồi thay chuỗi QR_DATA_URI bên dưới.
//
(function () {
    'use strict';

    var QR_DATA_URI = 'data:image/png;base64,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';
    var QR_FILE_NAME = 'QR-Dau-Truong-Tri-Thuc.png';

    try {
        var adminScreen = document.getElementById('screen-admin');
        if (!adminScreen || document.getElementById('dttt-qr-box')) return;

        // ── A. CSS (mọi selector đều có tiền tố dttt-qr- hoặc gắn riêng #screen-admin) ──
        var style = document.createElement('style');
        style.textContent = [
            /* Màn hình admin cuộn được trên điện thoại (không ảnh hưởng màn khác) */
            '#screen-admin{overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;}',
            '#screen-admin > *{flex-shrink:0;}',

            '#dttt-qr-box{margin-top:18px;padding:14px;border:1px solid #334155;border-radius:10px;',
            'background:#0f172a;display:flex;align-items:center;gap:16px;flex-wrap:wrap;box-sizing:border-box;}',
            '#dttt-qr-thumb{width:140px;height:140px;border-radius:8px;background:#fff;cursor:pointer;',
            'display:block;flex:0 0 auto;-webkit-tap-highlight-color:transparent;border:0;padding:0;}',
            '#dttt-qr-thumb:hover{box-shadow:0 0 0 3px #1a5b9c;}',
            '#dttt-qr-info{flex:1 1 160px;min-width:0;display:flex;flex-direction:column;align-items:flex-start;}',
            '#dttt-qr-title{font-weight:bold;color:#fbbf24;font-size:15px;margin-bottom:4px;}',
            '#dttt-qr-hint{color:#94a3b8;font-size:13px;line-height:1.4;margin-bottom:6px;}',
            '#dttt-qr-save{margin:0;}',

            /* Lớp phủ toàn màn hình */
            '#dttt-qr-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;',
            'background:rgba(2,6,23,.94);z-index:1000000;align-items:center;justify-content:center;',
            'flex-direction:column;padding:16px;box-sizing:border-box;}',
            '#dttt-qr-overlay.dttt-qr-open{display:flex;}',
            '#dttt-qr-big{width:min(92vw,86vh);height:min(92vw,86vh);max-width:900px;max-height:900px;',
            'background:#fff;border-radius:12px;object-fit:contain;display:block;}',
            '#dttt-qr-big-hint{color:#cbd5e1;font-size:14px;margin-top:12px;text-align:center;}',
            '#dttt-qr-close{position:absolute;top:calc(env(safe-area-inset-top,0px) + 12px);',
            'right:calc(env(safe-area-inset-right,0px) + 12px);margin:0;padding:0;width:46px;height:46px;',
            'border-radius:50%;background:#d90429;color:#fff;font-size:26px;line-height:46px;',
            'text-align:center;font-weight:bold;box-shadow:0 2px 10px rgba(0,0,0,.5);}',
            '#dttt-qr-close:hover{background:#ef233c;}'
        ].join('\n');
        document.head.appendChild(style);

        // ── B. KHỐI QR TRONG MÀN HÌNH ADMIN ──
        var box = document.createElement('div');
        box.id = 'dttt-qr-box';
        box.innerHTML =
            '<img id="dttt-qr-thumb" alt="Mã QR vào game" title="Bấm để phóng to" src="' + QR_DATA_URI + '">' +
            '<div id="dttt-qr-info">' +
                '<div id="dttt-qr-title">📱 Mã QR vào game</div>' +
                '<div id="dttt-qr-hint">Cho người chơi quét để vào thẳng game. Bấm vào ảnh để phóng to.</div>' +
                '<button id="dttt-qr-save" type="button">💾 Lưu ảnh QR</button>' +
            '</div>';
        adminScreen.appendChild(box);

        // ── C. LỚP PHỦ PHÓNG TO (gắn vào body để không bị #app cắt / transform ảnh hưởng) ──
        var overlay = document.createElement('div');
        overlay.id = 'dttt-qr-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-label', 'Mã QR vào game');
        overlay.innerHTML =
            '<button id="dttt-qr-close" type="button" aria-label="Đóng">✕</button>' +
            '<img id="dttt-qr-big" alt="Mã QR vào game" src="' + QR_DATA_URI + '">' +
            '<div id="dttt-qr-big-hint">Chạm ra ngoài hoặc bấm ✕ để đóng</div>';
        document.body.appendChild(overlay);

        function openOverlay() { overlay.classList.add('dttt-qr-open'); }
        function closeOverlay() { overlay.classList.remove('dttt-qr-open'); }

        document.getElementById('dttt-qr-thumb').addEventListener('click', openOverlay);
        document.getElementById('dttt-qr-close').addEventListener('click', function (e) {
            e.stopPropagation();
            closeOverlay();
        });
        // Bấm ra vùng tối bên ngoài ảnh cũng đóng (bấm lên chính ảnh thì không đóng)
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay || e.target.id === 'dttt-qr-big-hint') closeOverlay();
        });
        document.addEventListener('keydown', function (e) {
            if ((e.key === 'Escape' || e.key === 'Esc') && overlay.classList.contains('dttt-qr-open')) closeOverlay();
        });

        // ── D. NÚT LƯU ẢNH ──
        function notify(msg, type) {
            if (typeof window._dttt_toast === 'function') {
                try { window._dttt_toast(msg, type || 'suc', 3000); return; } catch (err) { /* rơi xuống alert */ }
            }
            alert(msg);
        }

        function dataUriToBlob(uri) {
            var parts = uri.split(',');
            var bin = atob(parts[1]);
            var arr = new Uint8Array(bin.length);
            for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
            return new Blob([arr], { type: 'image/png' });
        }

        document.getElementById('dttt-qr-save').addEventListener('click', function () {
            try {
                var blob = dataUriToBlob(QR_DATA_URI);
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = QR_FILE_NAME;
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                setTimeout(function () {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 1500);
                notify('✅ Đã tải ảnh QR về máy!', 'suc');
            } catch (err) {
                // Trình duyệt không cho tải tự động -> mở ảnh to để giữ lâu rồi lưu thủ công
                openOverlay();
                notify('Không tải tự động được. Hãy giữ lâu vào ảnh QR rồi chọn Lưu ảnh.', 'wrn');
            }
        });
    } catch (err) {
        console.error('[QR Admin] Lỗi khởi tạo (không ảnh hưởng game):', err);
    }
})();
