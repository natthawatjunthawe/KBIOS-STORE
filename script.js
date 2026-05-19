let db=[],cApp=null,cC='games',sz=6,u={p:[],r:[],n:'Guest',t:'Player',a:'https://placehold.co/100/2563eb/fff?text=U'};
let aiA=['1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png'],aiI=0,cAiS='';

const $=(i)=>document.getElementById(i),vp=navigator.vibrate||function(){};

window.onload = async () => {
    // 1. โหลดข้อมูลผู้ใช้งานจาก LocalStorage เข้ามาก่อน
    try {
        let ls = localStorage.getItem('kbs_u');
        if (ls) u = JSON.parse(ls);
    } catch (e) {
        console.error("LocalStorage Error:", e);
    }

    let loaded = false;
    // ขยายเวลา Timeout เป็น 10 วินาที เพื่อให้โอกาส Network บน GitHub Pages
    let t = setTimeout(() => MesoLoadingError(), 10000);

    function MesoLoadingError() {
        if (!loaded) {
            $('ldr-msg').style.display = 'inline-flex';
            $('sp-ldr').style.display = 'none';
        }
    }

    try {
        let c = new AbortController();
        let i = setTimeout(() => c.abort(), 9000); // ยกเลิกการดึงข้อมูลที่ 9 วินาที
        
        // ใช้คำสั่งหา Path สัมพัทธ์ที่ปลอดภัยสูงสุดในการรันบน Web Server ทุกรูปแบบ
        let r = await fetch('./data.json', { signal: c.signal });
        
        clearTimeout(i);
        if (!r.ok) throw new Error("HTTP error! status: " + r.status);
        
        let d = await r.json();
        
        if (d && d.items) {
            db = d.items;
            loaded = true;
            clearTimeout(t);
            
            // เรียกแสดงผล UI ตามลำดับหลังจากได้ฐานข้อมูล db มาครบถ้วนแล้วเท่านั้น
            rU(); 
            sw('games', document.querySelector('.nitem'));
            
            // ปิดหน้าจอโหลดอย่างนุ่มนวลตาม UI เดิม
            let l = $('ldr');
            l.style.opacity = '0';
            setTimeout(() => l.style.display = 'none', 400);
        } else {
            throw new Error("Invalid JSON structure");
        }

    } catch (e) {
        console.error("Critical Loading Error:", e); // แสดงสาเหตุที่แท้จริงใน Console
        clearTimeout(t);
        MesoLoadingError();
        db = [];
        // รัน UI พื้นฐานเพื่อไม่ให้หน้าเว็บตายสนิท
        rU();
    }
};