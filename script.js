window.onload = async () => {
    try {
        let ls = localStorage.getItem('kbs_u');
        if (ls) u = JSON.parse(ls);
    } catch (e) {}
    try { rU(); } catch (e) {}
    let loaded = false;
    let t = setTimeout(() => {
        if (!loaded) {
            $('ldr-msg').style.display = 'inline-flex';
            $('sp-ldr').style.display = 'none';
        }
    }, 1000);
    try {
        let c = new AbortController();
        let i = setTimeout(() => c.abort(), 7500);
        let r = await fetch('data.json?v=' + Date.now(), { signal: c.signal });
        clearTimeout(i);
        if (!r.ok) throw new Error();
        let d = await r.json();
        db = d.items;
        let target = document.querySelector('.nitem') || document.querySelector('[class*="item"]') || document.body;
        sw('games', target);
        loaded = true;
        clearTimeout(t);
        let l = $('ldr');
        if (l) {
            l.style.opacity = '0';
            setTimeout(() => l.style.display = 'none', 400);
        }
    } catch (e) {
        clearTimeout(t);
        if (!loaded) {
            $('ldr-msg').style.display = 'inline-flex';
            $('sp-ldr').style.display = 'none';
        }
        db = [];
        try { rU(); } catch (err) {}
    }
};