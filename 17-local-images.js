// ─── ẢNH LOCAL + ẢNH DỰ PHÒNG ───
// Chạy CUỐI CÙNG: đè mọi link ảnh web ngoài bằng ảnh trong thư mục images/.
// Danh sách ảnh nằm ở 00-image-manifest.js (sửa ở đó, không sửa ở đây).
(function () {
    const G = window.GAME_IMAGES;
    const path = f => G.folder + f;

    // 1. Ảnh dự phòng vẽ bằng code (hiện khi ảnh thật lỗi / thiếu file)
    function svgUri(inner, bg) {
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
            '<rect width="100" height="100" rx="14" fill="' + bg + '"/>' + inner + '</svg>';
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }
    const emojiUri = (e, bg) => svgUri('<text x="50" y="68" font-size="56" text-anchor="middle">' + e + '</text>', bg || '#334155');
    const FALLBACK_AVATAR = emojiUri('🙂', '#475569');
    window.GAME_FALLBACK_IMG = FALLBACK_AVATAR;

    // 2. Avatar nhân vật
    Object.keys(G.avatars).forEach(k => {
        if (typeof characterDefs !== 'undefined' && characterDefs[k]) characterDefs[k].img = path(G.avatars[k]);
    });

    // 3. Icon trang bị
    Object.keys(G.items).forEach(k => {
        if (typeof equipmentDefs === 'undefined' || !equipmentDefs[k]) return;
        const v = G.items[k];
        equipmentDefs[k].img = /\.(webp|png|jpe?g|svg)$/i.test(v) ? path(v) : emojiUri(v);
    });

    // 4. Banner sảnh chờ (trước đây lấy từ placehold.co)
    const banner = document.getElementById('lobby-banner-img');
    if (banner) banner.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200"><defs><linearGradient id="g" x1="0" x2="1">' +
        '<stop offset="0" stop-color="#0f3460"/><stop offset="1" stop-color="#533483"/></linearGradient></defs>' +
        '<rect width="800" height="200" fill="url(#g)"/><text x="400" y="118" font-size="46" font-family="Arial,sans-serif" ' +
        'font-weight="bold" fill="#fff" text-anchor="middle">SẢNH CHỜ ĐẤU TRƯỜNG</text></svg>');

    // 5. Ảnh nào lỗi cũng không bao giờ để trống: tự thay bằng ảnh dự phòng
    document.addEventListener('error', function (e) {
        const el = e.target;
        if (!el || el.tagName !== 'IMG' || el.dataset.fb) return;
        el.dataset.fb = '1';
        if (el.classList.contains('monster-art') && typeof el._fallback === 'function') { el._fallback(); return; }
        el.src = FALLBACK_AVATAR;
    }, true);

    // 6. Tải trước ảnh quái/boss để lúc vào phòng không bị chớp
    [G.bossFile].concat(G.monsters.map(m => m.file)).forEach(f => { new Image().src = path(f); });

    // 7. QUÁI & BOSS bằng ảnh thật (thay cho mô hình CSS khối hộp).
    //    Giữ nguyên id "vector-avatar-mesh" để hiệu ứng trúng đòn cũ vẫn chạy.
    //    Nếu ảnh lỗi → tự quay về mô hình CSS cũ.
    const oldRender = window.renderVectorCharacterHTML;
    const css = document.createElement('style');
    css.textContent = `
        .vector-monster-container.img-mode { height: 300px; width: 100%; max-width: 320px; perspective: none; }
        .vector-monster-container.img-mode.float-idle-active { animation: monsterBob 2.6s ease-in-out infinite; }
        .vector-monster-container.img-mode::before { width: 70%; height: 70%; left: 15%; top: 15%; }
        .monster-art { position: relative; z-index: 2; max-width: 100%; max-height: 100%; object-fit: contain;
                       filter: drop-shadow(0 10px 8px rgba(0,0,0,.45)); user-select: none; -webkit-user-drag: none; }
        .vector-monster-container.img-mode .v-shadow { z-index: 1; }
        .vector-monster-container.img-mode.is-boss { height: 340px; }
        .vector-monster-container.img-mode.is-boss .monster-art { transform: scale(1.18); }
        @keyframes monsterBob { 0%,100% { transform: translateY(0) rotate(-1.5deg); } 50% { transform: translateY(-12px) rotate(1.5deg); } }
    `;
    document.head.appendChild(css);

    window.renderVectorCharacterHTML = function (index, isBoss) {
        let file, aura, hue, boss = !!isBoss;
        if (boss) {
            file = G.bossFile; aura = G.bossAura; hue = 0;
        } else {
            const m = G.monsters[index % G.monsters.length];
            file = m.file; aura = m.aura; hue = m.hue || 0;
        }
        window.__monsterFallback = function (img) {
            const holder = img.closest('.vector-monster-container');
            if (holder && typeof oldRender === 'function') holder.outerHTML = oldRender(index, boss);
        };
        const f = hue ? 'filter: hue-rotate(' + hue + 'deg) drop-shadow(0 10px 8px rgba(0,0,0,.45));' : '';
        const big = '';
        return '<div class="vector-monster-container img-mode float-idle-active' + (boss ? ' is-boss' : '') + '" id="vector-avatar-mesh" style="--monster-aura:' + aura + ';' + big + '">' +
            '<img class="monster-art" src="' + path(file) + '" alt="" draggable="false" style="' + f + '" ' +
            'onerror="this.dataset.fb=1;window.__monsterFallback(this)">' +
            '<div class="v-shadow"></div></div>';
    };
})();
