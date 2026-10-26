// ═══════════════════════════════════════════════════════════════
//  KHO ẢNH CỦA GAME  —  chỉ cần sửa file này khi muốn đổi ảnh/tên
//  Ảnh nằm trong cùng cấp với các file code (không có thư mục con) (không dùng web ngoài).
//  Muốn thay ảnh: giữ NGUYÊN tên file, tải đè lên GitHub là xong.
// ═══════════════════════════════════════════════════════════════
window.GAME_IMAGES = {
    folder: '',

    // Ảnh đại diện nhân vật (ở sảnh chờ, màn chọn thân phận, bảng xếp hạng)
    avatars: {
        gambler:  'avatar-gambler.webp',   // Con Bạc
        madman:   'avatar-madman.webp',    // Gã Điên
        fool:     'avatar-fool.webp',      // Gã Khờ
        guard:    'avatar-guard.webp',     // Bảo Vệ
        scholar:  'avatar-scholar.webp',   // Học Bá
        doraemon: 'avatar-doraemon.webp',  // Doraemon
        random:   'avatar-random.webp'     // Random
    },

    // Quái thường: mỗi phòng mới game bốc NGẪU NHIÊN 1 con trong danh sách này.
    // Quái không có tên. Muốn thêm quái: thêm 1 dòng mới (ảnh bỏ cùng chỗ với các file khác).
    monsters: [
        { file: 'monster-01.webp', aura: 'rgba(251,146,60,0.45)' },
        { file: 'monster-02.webp', aura: 'rgba(148,163,184,0.45)' },
        { file: 'monster-03.webp', aura: 'rgba(56,189,248,0.5)' },
        { file: 'monster-04.webp', aura: 'rgba(236,72,153,0.45)' },
        { file: 'monster-05.webp', aura: 'rgba(250,204,21,0.5)' },
        { file: 'monster-06.webp', aura: 'rgba(239,68,68,0.5)' },
        { file: 'monster-07.webp', aura: 'rgba(217,70,239,0.5)' },
        { file: 'monster-08.webp', aura: 'rgba(34,211,238,0.5)' },
        { file: 'monster-09.webp', aura: 'rgba(168,85,247,0.5)' },
        { file: 'monster-10.webp', aura: 'rgba(16,185,129,0.5)' },
        { file: 'monster-11.webp', aura: 'rgba(59,130,246,0.5)' },
        { file: 'monster-12.webp', aura: 'rgba(251,113,133,0.5)' },
        { file: 'monster-13.webp', aura: 'rgba(14,165,233,0.5)' },
    ],

    // Boss: cứ phòng 10, 20, 30... xuất hiện đúng con này (không đổi màu).
    bossFile: 'boss.webp',
    bossAura: 'rgba(255,40,40,0.7)',

    // Icon trang bị: dùng emoji (không cần file). Muốn dùng ảnh riêng thì ghi
    // đường dẫn file, ví dụ  pistol: 'item-pistol.webp'
    items: {
        short_sword: '⚔️', fishing_rod: '🎣', pistol: '🔫', cursed_mask: '🎭',
        ocean_heart: '💙', lucky_star: '⭐', pumpkin: '🎃'
    }
};
