const or = function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
    new MutationObserver(i => {
        for (const o of i)
            if (o.type === "childList")
                for (const l of o.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && r(l)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function n(i) {
        const o = {};
        return i.integrity && (o.integrity = i.integrity), i.referrerpolicy && (o.referrerPolicy = i.referrerpolicy), i.crossorigin === "use-credentials" ? o.credentials = "include" : i.crossorigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o
    }

    function r(i) {
        if (i.ep) return;
        i.ep = !0;
        const o = n(i);
        fetch(i.href, o)
    }
};
or();

function Z() {}
const nt = t => t;

function lr(t, e) {
    for (const n in e) t[n] = e[n];
    return t
}

function Bt(t) {
    return t()
}

function ut() {
    return Object.create(null)
}

function Ae(t) {
    t.forEach(Bt)
}

function it(t) {
    return typeof t == "function"
}

function me(t, e) {
    return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function"
}
let Ne;

function D(t, e) {
    return Ne || (Ne = document.createElement("a")), Ne.href = e, t === Ne.href
}

function sr(t) {
    return Object.keys(t).length === 0
}

function ar(t, ...e) {
    if (t == null) return Z;
    const n = t.subscribe(...e);
    return n.unsubscribe ? () => n.unsubscribe() : n
}

function Te(t, e, n) {
    t.$$.on_destroy.push(ar(e, n))
}

function cr(t, e, n, r) {
    if (t) {
        const i = Dt(t, e, n, r);
        return t[0](i)
    }
}

function Dt(t, e, n, r) {
    return t[1] && r ? lr(n.ctx.slice(), t[1](r(e))) : n.ctx
}

function fr(t, e, n, r) {
    if (t[2] && r) {
        const i = t[2](r(n));
        if (e.dirty === void 0) return i;
        if (typeof i == "object") {
            const o = [],
                l = Math.max(e.dirty.length, i.length);
            for (let a = 0; a < l; a += 1) o[a] = e.dirty[a] | i[a];
            return o
        }
        return e.dirty | i
    }
    return e.dirty
}

function ur(t, e, n, r, i, o) {
    if (i) {
        const l = Dt(e, n, r, o);
        t.p(l, i)
    }
}

function dr(t) {
    if (t.ctx.length > 32) {
        const e = [],
            n = t.ctx.length / 32;
        for (let r = 0; r < n; r++) e[r] = -1;
        return e
    }
    return -1
}
const qt = typeof window != "undefined";
let Gt = qt ? () => window.performance.now() : () => Date.now(),
    ot = qt ? t => requestAnimationFrame(t) : Z;
const ke = new Set;

function Yt(t) {
    ke.forEach(e => {
        e.c(t) || (ke.delete(e), e.f())
    }), ke.size !== 0 && ot(Yt)
}

function Xt(t) {
    let e;
    return ke.size === 0 && ot(Yt), {
        promise: new Promise(n => {
            ke.add(e = {
                c: t,
                f: n
            })
        }),
        abort() {
            ke.delete(e)
        }
    }
}

function c(t, e) {
    t.appendChild(e)
}

function Wt(t) {
    if (!t) return document;
    const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
    return e && e.host ? e : t.ownerDocument
}

function wr(t) {
    const e = d("style");
    return hr(Wt(t), e), e.sheet
}

function hr(t, e) {
    c(t.head || t, e)
}

function $(t, e, n) {
    t.insertBefore(e, n || null)
}

function E(t) {
    t.parentNode.removeChild(t)
}

function pe(t, e) {
    for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e)
}

function d(t) {
    return document.createElement(t)
}

function j(t) {
    return document.createTextNode(t)
}

function x() {
    return j(" ")
}

function Ve() {
    return j("")
}

function Kt(t, e, n, r) {
    return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r)
}

function s(t, e, n) {
    n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n)
}

function pr(t) {
    return Array.from(t.childNodes)
}

function ue(t, e) {
    e = "" + e, t.wholeText !== e && (t.data = e)
}

function b(t, e, n, r) {
    n === null ? t.style.removeProperty(e) : t.style.setProperty(e, n, r ? "important" : "")
}

function gr(t, e, {
    bubbles: n = !1,
    cancelable: r = !1
} = {}) {
    const i = document.createEvent("CustomEvent");
    return i.initCustomEvent(t, n, r, e), i
}
const De = new Map;
let qe = 0;

function vr(t) {
    let e = 5381,
        n = t.length;
    for (; n--;) e = (e << 5) - e ^ t.charCodeAt(n);
    return e >>> 0
}

function br(t, e) {
    const n = {
        stylesheet: wr(e),
        rules: {}
    };
    return De.set(t, n), n
}

function Jt(t, e, n, r, i, o, l, a = 0) {
    const u = 16.666 / r;
    let f = `{
`;
    for (let I = 0; I <= 1; I += u) {
        const ee = e + (n - e) * o(I);
        f += I * 100 + `%{${l(ee,1-ee)}}
`
    }
    const _ = f + `100% {${l(n,1-n)}}
}`,
        w = `__svelte_${vr(_)}_${a}`,
        h = Wt(t),
        {
            stylesheet: v,
            rules: k
        } = De.get(h) || br(h, t);
    k[w] || (k[w] = !0, v.insertRule(`@keyframes ${w} ${_}`, v.cssRules.length));
    const p = t.style.animation || "";
    return t.style.animation = `${p?`${p}, `:""}${w} ${r}ms linear ${i}ms 1 both`, qe += 1, w
}

function Ze(t, e) {
    const n = (t.style.animation || "").split(", "),
        r = n.filter(e ? o => o.indexOf(e) < 0 : o => o.indexOf("__svelte") === -1),
        i = n.length - r.length;
    i && (t.style.animation = r.join(", "), qe -= i, qe || mr())
}

function mr() {
    ot(() => {
        qe || (De.forEach(t => {
            const {
                stylesheet: e
            } = t;
            let n = e.cssRules.length;
            for (; n--;) e.deleteRule(n);
            t.rules = {}
        }), De.clear())
    })
}
let Me;

function Pe(t) {
    Me = t
}

function Qt() {
    if (!Me) throw new Error("Function called outside component initialization");
    return Me
}

function _r(t) {
    Qt().$$.on_mount.push(t)
}

function yr(t) {
    Qt().$$.on_destroy.push(t)
}
const He = [],
    dt = [],
    Oe = [],
    wt = [],
    xr = Promise.resolve();
let et = !1;

function kr() {
    et || (et = !0, xr.then(Zt))
}

function be(t) {
    Oe.push(t)
}
const Qe = new Set;
let Ue = 0;

function Zt() {
    const t = Me;
    do {
        for (; Ue < He.length;) {
            const e = He[Ue];
            Ue++, Pe(e), Er(e.$$)
        }
        for (Pe(null), He.length = 0, Ue = 0; dt.length;) dt.pop()();
        for (let e = 0; e < Oe.length; e += 1) {
            const n = Oe[e];
            Qe.has(n) || (Qe.add(n), n())
        }
        Oe.length = 0
    } while (He.length);
    for (; wt.length;) wt.pop()();
    et = !1, Qe.clear(), Pe(t)
}

function Er(t) {
    if (t.fragment !== null) {
        t.update(), Ae(t.before_update);
        const e = t.dirty;
        t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(be)
    }
}
let je;

function er() {
    return je || (je = Promise.resolve(), je.then(() => {
        je = null
    })), je
}

function Ge(t, e, n) {
    t.dispatchEvent(gr(`${e?"intro":"outro"}${n}`))
}
const Be = new Set;
let he;

function Ee() {
    he = {
        r: 0,
        c: [],
        p: he
    }
}

function $e() {
    he.r || Ae(he.c), he = he.p
}

function F(t, e) {
    t && t.i && (Be.delete(t), t.i(e))
}

function H(t, e, n, r) {
    if (t && t.o) {
        if (Be.has(t)) return;
        Be.add(t), he.c.push(() => {
            Be.delete(t), r && (n && t.d(1), r())
        }), t.o(e)
    }
}
const tr = {
    duration: 0
};

function rr(t, e, n) {
    let r = e(t, n),
        i = !1,
        o, l, a = 0;

    function u() {
        o && Ze(t, o)
    }

    function f() {
        const {
            delay: w = 0,
            duration: h = 300,
            easing: v = nt,
            tick: k = Z,
            css: p
        } = r || tr;
        p && (o = Jt(t, 0, 1, h, w, v, p, a++)), k(0, 1);
        const I = Gt() + w,
            ee = I + h;
        l && l.abort(), i = !0, be(() => Ge(t, !0, "start")), l = Xt(P => {
            if (i) {
                if (P >= ee) return k(1, 0), Ge(t, !0, "end"), u(), i = !1;
                if (P >= I) {
                    const V = v((P - I) / h);
                    k(V, 1 - V)
                }
            }
            return i
        })
    }
    let _ = !1;
    return {
        start() {
            _ || (_ = !0, Ze(t), it(r) ? (r = r(), er().then(f)) : f())
        },
        invalidate() {
            _ = !1
        },
        end() {
            i && (u(), i = !1)
        }
    }
}

function nr(t, e, n) {
    let r = e(t, n),
        i = !0,
        o;
    const l = he;
    l.r += 1;

    function a() {
        const {
            delay: u = 0,
            duration: f = 300,
            easing: _ = nt,
            tick: w = Z,
            css: h
        } = r || tr;
        h && (o = Jt(t, 1, 0, f, u, _, h));
        const v = Gt() + u,
            k = v + f;
        be(() => Ge(t, !1, "start")), Xt(p => {
            if (i) {
                if (p >= k) return w(0, 1), Ge(t, !1, "end"), --l.r || Ae(l.c), !1;
                if (p >= v) {
                    const I = _((p - v) / f);
                    w(1 - I, I)
                }
            }
            return i
        })
    }
    return it(r) ? er().then(() => {
        r = r(), a()
    }) : a(), {
        end(u) {
            u && r.tick && r.tick(1, 0), i && (o && Ze(t, o), i = !1)
        }
    }
}

function Ce(t) {
    t && t.c()
}

function Fe(t, e, n, r) {
    const {
        fragment: i,
        on_mount: o,
        on_destroy: l,
        after_update: a
    } = t.$$;
    i && i.m(e, n), r || be(() => {
        const u = o.map(Bt).filter(it);
        l ? l.push(...u) : Ae(u), t.$$.on_mount = []
    }), a.forEach(be)
}

function Ie(t, e) {
    const n = t.$$;
    n.fragment !== null && (Ae(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = [])
}

function $r(t, e) {
    t.$$.dirty[0] === -1 && (He.push(t), kr(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31
}

function Se(t, e, n, r, i, o, l, a = [-1]) {
    const u = Me;
    Pe(t);
    const f = t.$$ = {
        fragment: null,
        ctx: null,
        props: o,
        update: Z,
        not_equal: i,
        bound: ut(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(e.context || (u ? u.$$.context : [])),
        callbacks: ut(),
        dirty: a,
        skip_bound: !1,
        root: e.target || u.$$.root
    };
    l && l(f.root);
    let _ = !1;
    if (f.ctx = n ? n(t, e.props || {}, (w, h, ...v) => {
            const k = v.length ? v[0] : h;
            return f.ctx && i(f.ctx[w], f.ctx[w] = k) && (!f.skip_bound && f.bound[w] && f.bound[w](k), _ && $r(t, w)), h
        }) : [], f.update(), _ = !0, Ae(f.before_update), f.fragment = r ? r(f.ctx) : !1, e.target) {
        if (e.hydrate) {
            const w = pr(e.target);
            f.fragment && f.fragment.l(w), w.forEach(E)
        } else f.fragment && f.fragment.c();
        e.intro && F(t.$$.fragment), Fe(t, e.target, e.anchor, e.customElement), Zt()
    }
    Pe(u)
}
class ze {
    $destroy() {
        Ie(this, 1), this.$destroy = Z
    }
    $on(e, n) {
        const r = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
        return r.push(n), () => {
            const i = r.indexOf(n);
            i !== -1 && r.splice(i, 1)
        }
    }
    $set(e) {
        this.$$set && !sr(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1)
    }
}

function Ye(t, e) {
    const n = r => {
        const {
            action: i,
            data: o
        } = r.data;
        i === t && e(o)
    };
    _r(() => window.addEventListener("message", n)), yr(() => window.removeEventListener("message", n))
}
const xe = [];

function We(t, e = Z) {
    let n;
    const r = new Set;

    function i(a) {
        if (me(t, a) && (t = a, n)) {
            const u = !xe.length;
            for (const f of r) f[1](), xe.push(f, t);
            if (u) {
                for (let f = 0; f < xe.length; f += 2) xe[f][0](xe[f + 1]);
                xe.length = 0
            }
        }
    }

    function o(a) {
        i(a(t))
    }

    function l(a, u = Z) {
        const f = [a, u];
        return r.add(f), r.size === 1 && (n = e(i) || Z), a(t), () => {
            r.delete(f), r.size === 0 && (n(), n = null)
        }
    }
    return {
        set: i,
        update: o,
        subscribe: l
    }
}
const Fr = We(!0),
    tt = We(!1),
    ir = We(!1),
    lt = We(!1);

function ht(t) {
    let e, n;
    const r = t[2].default,
        i = cr(r, t, t[1], null);
    return {
        c() {
            e = d("main"), i && i.c(), s(e, "class", "svelte-1afztrv")
        },
        m(o, l) {
            $(o, e, l), i && i.m(e, null), n = !0
        },
        p(o, l) {
            i && i.p && (!n || l & 2) && ur(i, r, o, o[1], n ? fr(r, o[1], l, null) : dr(o[1]), null)
        },
        i(o) {
            n || (F(i, o), n = !0)
        },
        o(o) {
            H(i, o), n = !1
        },
        d(o) {
            o && E(e), i && i.d(o)
        }
    }
}

function Ir(t) {
    let e, n, r = t[0] && ht(t);
    return {
        c() {
            r && r.c(), e = Ve()
        },
        m(i, o) {
            r && r.m(i, o), $(i, e, o), n = !0
        },
        p(i, [o]) {
            i[0] ? r ? (r.p(i, o), o & 1 && F(r, 1)) : (r = ht(i), r.c(), F(r, 1), r.m(e.parentNode, e)) : r && (Ee(), H(r, 1, 1, () => {
                r = null
            }), $e())
        },
        i(i) {
            n || (F(r), n = !0)
        },
        o(i) {
            H(r), n = !1
        },
        d(i) {
            r && r.d(i), i && E(e)
        }
    }
}

function Ar(t, e, n) {
    let {
        $$slots: r = {},
        $$scope: i
    } = e, o;
    return tt.subscribe(l => {}), Fr.subscribe(l => {
        n(0, o = l)
    }), Ye("setVisible", l => {
        l.resource === "PLAYERHUDVISABLE" && ir.set(l.state), l.resource === "VEHICLEHUDVISABLE" && lt.set(l.state)
    }), Ye("setBrowserMode", l => {
        tt.set(l), console.log("browser mode enabled")
    }), t.$$set = l => {
        "$$scope" in l && n(1, i = l.$$scope)
    }, [o, i, r]
}
class Sr extends ze {
    constructor(e) {
        super(), Se(this, e, Ar, Ir, me, {})
    }
}
const zr = () => !window.invokeNative,
    rt = (t, e = 0) => {
        if (zr())
            for (const n of t) setTimeout(() => {
                window.dispatchEvent(new MessageEvent("message", {
                    data: {
                        action: n.action,
                        data: n.data
                    }
                }))
            }, e)
    };

function pt(t, e, n) {
    const r = t.slice();
    return r[4] = e[n], r
}

function gt(t, e, n) {
    const r = t.slice();
    return r[7] = e[n], r
}

function vt(t) {
    let e, n = t[1],
        r = [];
    for (let i = 0; i < n.length; i += 1) r[i] = mt(pt(t, n, i));
    return {
        c() {
            e = d("div");
            for (let i = 0; i < r.length; i += 1) r[i].c();
            s(e, "class", "w-fit h-fit bg-gray-600 p-2 ")
        },
        m(i, o) {
            $(i, e, o);
            for (let l = 0; l < r.length; l += 1) r[l].m(e, null)
        },
        p(i, o) {
            if (o & 2) {
                n = i[1];
                let l;
                for (l = 0; l < n.length; l += 1) {
                    const a = pt(i, n, l);
                    r[l] ? r[l].p(a, o) : (r[l] = mt(a), r[l].c(), r[l].m(e, null))
                }
                for (; l < r.length; l += 1) r[l].d(1);
                r.length = n.length
            }
        },
        d(i) {
            i && E(e), pe(r, i)
        }
    }
}

function bt(t) {
    let e, n = t[7].name + "",
        r, i, o;

    function l() {
        return t[3](t[7])
    }
    return {
        c() {
            e = d("button"), r = j(n), s(e, "class", "bg-blue-500 text-white p-2")
        },
        m(a, u) {
            $(a, e, u), c(e, r), i || (o = Kt(e, "click", l), i = !0)
        },
        p(a, u) {
            t = a
        },
        d(a) {
            a && E(e), i = !1, o()
        }
    }
}

function mt(t) {
    let e, n, r = t[4].component + "",
        i, o, l, a = t[4].actions,
        u = [];
    for (let f = 0; f < a.length; f += 1) u[f] = bt(gt(t, a, f));
    return {
        c() {
            e = d("div"), n = d("p"), i = j(r), o = x();
            for (let f = 0; f < u.length; f += 1) u[f].c();
            l = x(), s(n, "class", "text-white"), s(e, "class", "flex flex-row gap-2 items-center m-1")
        },
        m(f, _) {
            $(f, e, _), c(e, n), c(n, i), c(e, o);
            for (let w = 0; w < u.length; w += 1) u[w].m(e, null);
            c(e, l)
        },
        p(f, _) {
            if (_ & 2) {
                a = f[4].actions;
                let w;
                for (w = 0; w < a.length; w += 1) {
                    const h = gt(f, a, w);
                    u[w] ? u[w].p(h, _) : (u[w] = bt(h), u[w].c(), u[w].m(e, l))
                }
                for (; w < u.length; w += 1) u[w].d(1);
                u.length = a.length
            }
        },
        d(f) {
            f && E(e), pe(u, f)
        }
    }
}

function Rr(t) {
    let e, n, r, i, o, l = t[0] && vt(t);
    return {
        c() {
            e = d("div"), n = d("button"), n.textContent = "Show", r = x(), l && l.c(), s(n, "class", "bg-[#70949c] text-[#FFF] p-2 rounded-[0.4vw]"), s(e, "class", "absolute top-0 left-[50%] z-[1000] pt-[0.2vw]")
        },
        m(a, u) {
            $(a, e, u), c(e, n), c(e, r), l && l.m(e, null), i || (o = Kt(n, "click", t[2]), i = !0)
        },
        p(a, [u]) {
            a[0] ? l ? l.p(a, u) : (l = vt(a), l.c(), l.m(e, null)) : l && (l.d(1), l = null)
        },
        i: Z,
        o: Z,
        d(a) {
            a && E(e), l && l.d(), i = !1, o()
        }
    }
}

function Lr(t, e, n) {
    let r = !1;
    return [r, [{
        component: "Show",
        actions: [{
            name: "Show Player Hud",
            action: "setVisible",
            data: {
                resource: "PLAYERHUDVISABLE",
                state: !0,
                data: []
            }
        }, {
            name: "Hide Player Hud",
            action: "setVisible",
            data: {
                resource: "PLAYERHUDVISABLE",
                state: !1,
                data: []
            }
        }, {
            name: "Show Vehicle Hud",
            action: "setVisible",
            data: {
                resource: "VEHICLEHUDVISABLE",
                state: !0
            }
        }, {
            name: "Hide Vehicle Hud",
            action: "setVisible",
            data: {
                resource: "VEHICLEHUDVISABLE",
                state: !1
            }
        }]
    }], () => {
        n(0, r = !r)
    }, a => {
        if (a.custom == !0) {
            a.customFunction();
            return
        }
        rt([{
            action: a.action,
            data: a.data
        }])
    }]
}
class jr extends ze {
    constructor(e) {
        super(), Se(this, e, Lr, Rr, me, {})
    }
}

function Hr(t) {
    return rt([{
        action: "setVisible",
        data: !0
    }]), rt([{
        action: "setBrowserMode",
        data: !0
    }]), []
}
class Pr extends ze {
    constructor(e) {
        super(), Se(this, e, Hr, null, me, {})
    }
}

function Xe(t, {
    delay: e = 0,
    duration: n = 400,
    easing: r = nt
} = {}) {
    const i = +getComputedStyle(t).opacity;
    return {
        delay: e,
        duration: n,
        easing: r,
        css: o => `opacity: ${o*i}`
    }
}
var Mr = "./healtIcon.svg",
    Cr = "./armourIcon.svg",
    Vr = "./hungerIcon.svg",
    Nr = "./thirstIcon.svg",
    Ur = "./stressIcon.svg";

function _t(t, e, n) {
    const r = t.slice();
    return r[7] = e[n], r[9] = n, r
}

function yt(t, e, n) {
    const r = t.slice();
    return r[7] = e[n], r[9] = n, r
}

function xt(t, e, n) {
    const r = t.slice();
    return r[7] = e[n], r[9] = n, r
}

function kt(t, e, n) {
    const r = t.slice();
    return r[7] = e[n], r[9] = n, r
}

function Et(t, e, n) {
    const r = t.slice();
    return r[7] = e[n], r[9] = n, r
}

function $t(t) {
    let e, n, r, i, o, l, a, u, f, _, w, h, v, k, p, I, ee, P, V, Y, ie, de, T, ge, oe, q, le, Re, se, M, te, W, ve, re, Le, ne, K, we, J, G = Array(5),
        S = [];
    for (let m = 0; m < G.length; m += 1) S[m] = Ft(Et(t, G, m));
    let C = t[1] > 0 && It(t),
        ae = Array(5),
        A = [];
    for (let m = 0; m < ae.length; m += 1) A[m] = St(xt(t, ae, m));
    let Q = Array(5),
        R = [];
    for (let m = 0; m < Q.length; m += 1) R[m] = zt(yt(t, Q, m));
    let z = !t[6] && Rt(t);
    return {
        c() {
            e = d("div"), n = d("div"), r = d("img"), o = x(), l = d("div"), a = d("h1"), u = j(t[0]), f = j("%"), _ = x(), w = d("div");
            for (let m = 0; m < S.length; m += 1) S[m].c();
            h = x(), C && C.c(), v = x(), k = d("div"), p = d("img"), ee = x(), P = d("div"), V = d("h1"), Y = j(t[2]), ie = j("%"), de = x(), T = d("div");
            for (let m = 0; m < A.length; m += 1) A[m].c();
            ge = x(), oe = d("div"), q = d("img"), Re = x(), se = d("div"), M = d("h1"), te = j(t[3]), W = j("%"), ve = x(), re = d("div");
            for (let m = 0; m < R.length; m += 1) R[m].c();
            Le = x(), z && z.c(), s(r, "draggable", "false"), D(r.src, i = Mr) || s(r, "src", i), s(r, "class", "w-[2.3vw]"), s(r, "alt", ""), s(a, "class", "text-[0.6vw]"), b(a, "font-family", "'Poppins'"), b(a, "font-style", "normal"), b(a, "font-weight", "500"), b(a, "color", "rgba(255, 255, 255, 0.84)"), b(a, "text-shadow", "0px 0px 8px rgba(0, 0, 0, 0.24)"), s(w, "class", "flex flex-row space-x-[0.07vw]"), s(l, "class", "absolute ml-[1.8vw] flex flex-col justify-start items-start"), s(n, "class", "flex flex-row justify-start items-center"), s(p, "draggable", "false"), D(p.src, I = Vr) || s(p, "src", I), s(p, "class", "w-[2vw]"), s(p, "alt", ""), s(V, "class", "text-[0.6vw]"), b(V, "font-family", "'Poppins'"), b(V, "font-style", "normal"), b(V, "font-weight", "500"), b(V, "color", "rgba(255, 255, 255, 0.84)"), b(V, "text-shadow", "0px 0px 8px rgba(0, 0, 0, 0.24)"), s(T, "class", "flex flex-row space-x-[0.07vw]"), s(P, "class", "absolute ml-[1.6vw] flex flex-col justify-start items-start"), s(k, "class", "flex flex-row justify-start items-center"), s(q, "draggable", "false"), D(q.src, le = Nr) || s(q, "src", le), s(q, "class", "w-[2vw]"), s(q, "alt", ""), s(M, "class", "text-[0.6vw]"), b(M, "font-family", "'Poppins'"), b(M, "font-style", "normal"), b(M, "font-weight", "500"), b(M, "color", "rgba(255, 255, 255, 0.84)"), b(M, "text-shadow", "0px 0px 8px rgba(0, 0, 0, 0.24)"), s(re, "class", "flex flex-row space-x-[0.07vw]"), s(se, "class", "absolute ml-[1.6vw] flex flex-col justify-start items-start"), s(oe, "class", "flex flex-row justify-start items-center"), s(e, "class", ne = "fixed flex " + (t[6] ? "flex-col left-[16.1vw] bottom-[3.3vh]" : "flex-row space-x-[1.1vw] left-[0.4vw] bottom-[0.5vh]")), b(e, "transition", "0.5s")
        },
        m(m, L) {
            $(m, e, L), c(e, n), c(n, r), c(n, o), c(n, l), c(l, a), c(a, u), c(a, f), c(l, _), c(l, w);
            for (let g = 0; g < S.length; g += 1) S[g].m(w, null);
            c(e, h), C && C.m(e, null), c(e, v), c(e, k), c(k, p), c(k, ee), c(k, P), c(P, V), c(V, Y), c(V, ie), c(P, de), c(P, T);
            for (let g = 0; g < A.length; g += 1) A[g].m(T, null);
            c(e, ge), c(e, oe), c(oe, q), c(oe, Re), c(oe, se), c(se, M), c(M, te), c(M, W), c(se, ve), c(se, re);
            for (let g = 0; g < R.length; g += 1) R[g].m(re, null);
            c(e, Le), z && z.m(e, null), J = !0
        },
        p(m, L) {
            if ((!J || L & 1) && ue(u, m[0]), L & 1) {
                G = Array(5);
                let g;
                for (g = 0; g < G.length; g += 1) {
                    const U = Et(m, G, g);
                    S[g] ? S[g].p(U, L) : (S[g] = Ft(U), S[g].c(), S[g].m(w, null))
                }
                for (; g < S.length; g += 1) S[g].d(1);
                S.length = G.length
            }
            if (m[1] > 0 ? C ? C.p(m, L) : (C = It(m), C.c(), C.m(e, v)) : C && (C.d(1), C = null), (!J || L & 4) && ue(Y, m[2]), L & 4) {
                ae = Array(5);
                let g;
                for (g = 0; g < ae.length; g += 1) {
                    const U = xt(m, ae, g);
                    A[g] ? A[g].p(U, L) : (A[g] = St(U), A[g].c(), A[g].m(T, null))
                }
                for (; g < A.length; g += 1) A[g].d(1);
                A.length = ae.length
            }
            if ((!J || L & 8) && ue(te, m[3]), L & 8) {
                Q = Array(5);
                let g;
                for (g = 0; g < Q.length; g += 1) {
                    const U = yt(m, Q, g);
                    R[g] ? R[g].p(U, L) : (R[g] = zt(U), R[g].c(), R[g].m(re, null))
                }
                for (; g < R.length; g += 1) R[g].d(1);
                R.length = Q.length
            }
            m[6] ? z && (z.d(1), z = null) : z ? z.p(m, L) : (z = Rt(m), z.c(), z.m(e, null)), (!J || L & 64 && ne !== (ne = "fixed flex " + (m[6] ? "flex-col left-[16.1vw] bottom-[3.3vh]" : "flex-row space-x-[1.1vw] left-[0.4vw] bottom-[0.5vh]"))) && s(e, "class", ne)
        },
        i(m) {
            J || (be(() => {
                we && we.end(1), K = rr(e, Xe, {}), K.start()
            }), J = !0)
        },
        o(m) {
            K && K.invalidate(), we = nr(e, Xe, {}), J = !1
        },
        d(m) {
            m && E(e), pe(S, m), C && C.d(), pe(A, m), pe(R, m), z && z.d(), m && we && we.end()
        }
    }
}

function Ft(t) {
    let e, n;
    return {
        c() {
            e = d("div"), s(e, "class", "w-[0.18vw] h-[0.23vh] rounded-[0.05vw]"), s(e, "style", n = `transition: 0.5s; background: ${t[9]<Math.ceil(t[0]/20)?"#FFFF":"rgba(255, 255, 255, 0.2)"}`)
        },
        m(r, i) {
            $(r, e, i)
        },
        p(r, i) {
            i & 1 && n !== (n = `transition: 0.5s; background: ${r[9]<Math.ceil(r[0]/20)?"#FFFF":"rgba(255, 255, 255, 0.2)"}`) && s(e, "style", n)
        },
        d(r) {
            r && E(e)
        }
    }
}

function It(t) {
    let e, n, r, i, o, l, a, u, f, _, w = Array(5),
        h = [];
    for (let v = 0; v < w.length; v += 1) h[v] = At(kt(t, w, v));
    return {
        c() {
            e = d("div"), n = d("img"), i = x(), o = d("div"), l = d("h1"), a = j(t[1]), u = j("%"), f = x(), _ = d("div");
            for (let v = 0; v < h.length; v += 1) h[v].c();
            s(n, "draggable", "false"), D(n.src, r = Cr) || s(n, "src", r), s(n, "class", "w-[2.1vw]"), s(n, "alt", ""), s(l, "class", "text-[0.6vw]"), b(l, "font-family", "'Poppins'"), b(l, "font-style", "normal"), b(l, "font-weight", "500"), b(l, "color", "rgba(255, 255, 255, 0.84)"), b(l, "text-shadow", "0px 0px 8px rgba(0, 0, 0, 0.24)"), s(_, "class", "flex flex-row space-x-[0.07vw]"), s(o, "class", "absolute ml-[1.65vw] flex flex-col justify-start items-start"), s(e, "class", "flex flex-row justify-start items-center")
        },
        m(v, k) {
            $(v, e, k), c(e, n), c(e, i), c(e, o), c(o, l), c(l, a), c(l, u), c(o, f), c(o, _);
            for (let p = 0; p < h.length; p += 1) h[p].m(_, null)
        },
        p(v, k) {
            if (k & 2 && ue(a, v[1]), k & 2) {
                w = Array(5);
                let p;
                for (p = 0; p < w.length; p += 1) {
                    const I = kt(v, w, p);
                    h[p] ? h[p].p(I, k) : (h[p] = At(I), h[p].c(), h[p].m(_, null))
                }
                for (; p < h.length; p += 1) h[p].d(1);
                h.length = w.length
            }
        },
        d(v) {
            v && E(e), pe(h, v)
        }
    }
}

function At(t) {
    let e, n;
    return {
        c() {
            e = d("div"), s(e, "class", "w-[0.18vw] h-[0.23vh] rounded-[0.05vw]"), s(e, "style", n = `transition: 0.5s; background: ${t[9]<Math.ceil(t[1]/20)?"#37ECA8":"rgba(55, 236, 168, 0.2)"}`)
        },
        m(r, i) {
            $(r, e, i)
        },
        p(r, i) {
            i & 2 && n !== (n = `transition: 0.5s; background: ${r[9]<Math.ceil(r[1]/20)?"#37ECA8":"rgba(55, 236, 168, 0.2)"}`) && s(e, "style", n)
        },
        d(r) {
            r && E(e)
        }
    }
}

function St(t) {
    let e, n;
    return {
        c() {
            e = d("div"), s(e, "class", "w-[0.18vw] h-[0.23vh] rounded-[0.05vw]"), s(e, "style", n = `transition: 0.5s; background: ${t[9]<Math.ceil(t[2]/20)?"#FFFF":"rgba(255, 255, 255, 0.2)"}`)
        },
        m(r, i) {
            $(r, e, i)
        },
        p(r, i) {
            i & 4 && n !== (n = `transition: 0.5s; background: ${r[9]<Math.ceil(r[2]/20)?"#FFFF":"rgba(255, 255, 255, 0.2)"}`) && s(e, "style", n)
        },
        d(r) {
            r && E(e)
        }
    }
}

function zt(t) {
    let e, n;
    return {
        c() {
            e = d("div"), s(e, "class", "w-[0.18vw] h-[0.23vh] rounded-[0.05vw]"), s(e, "style", n = `transition: 0.5s; background: ${t[9]<Math.ceil(t[3]/20)?"#FFFF":"rgba(255, 255, 255, 0.2)"}`)
        },
        m(r, i) {
            $(r, e, i)
        },
        p(r, i) {
            i & 8 && n !== (n = `transition: 0.5s; background: ${r[9]<Math.ceil(r[3]/20)?"#FFFF":"rgba(255, 255, 255, 0.2)"}`) && s(e, "style", n)
        },
        d(r) {
            r && E(e)
        }
    }
}

function Rt(t) {
    let e, n, r, i, o, l, a, u, f, _, w = Array(5),
        h = [];
    for (let v = 0; v < w.length; v += 1) h[v] = Lt(_t(t, w, v));
    return {
        c() {
            e = d("div"), n = d("img"), i = x(), o = d("div"), l = d("h1"), a = j(t[4]), u = j("%"), f = x(), _ = d("div");
            for (let v = 0; v < h.length; v += 1) h[v].c();
            s(n, "draggable", "false"), D(n.src, r = Ur) || s(n, "src", r), s(n, "class", "w-[2vw]"), s(n, "alt", ""), s(l, "class", "text-[0.6vw]"), b(l, "font-family", "'Poppins'"), b(l, "font-style", "normal"), b(l, "font-weight", "500"), b(l, "color", "rgba(255, 255, 255, 0.84)"), b(l, "text-shadow", "0px 0px 8px rgba(0, 0, 0, 0.24)"), s(_, "class", "flex flex-row space-x-[0.07vw]"), s(o, "class", "absolute ml-[1.6vw] flex flex-col justify-start items-start"), s(e, "class", "flex flex-row justify-start items-center")
        },
        m(v, k) {
            $(v, e, k), c(e, n), c(e, i), c(e, o), c(o, l), c(l, a), c(l, u), c(o, f), c(o, _);
            for (let p = 0; p < h.length; p += 1) h[p].m(_, null)
        },
        p(v, k) {
            if (k & 16 && ue(a, v[4]), k & 16) {
                w = Array(5);
                let p;
                for (p = 0; p < w.length; p += 1) {
                    const I = _t(v, w, p);
                    h[p] ? h[p].p(I, k) : (h[p] = Lt(I), h[p].c(), h[p].m(_, null))
                }
                for (; p < h.length; p += 1) h[p].d(1);
                h.length = w.length
            }
        },
        d(v) {
            v && E(e), pe(h, v)
        }
    }
}

function Lt(t) {
    let e, n;
    return {
        c() {
            e = d("div"), s(e, "class", "w-[0.18vw] h-[0.23vh] rounded-[0.05vw]"), s(e, "style", n = `transition: 0.5s; background: ${t[9]<Math.ceil(t[4]/20)?"#FFFF":"rgba(255, 255, 255, 0.2)"}`)
        },
        m(r, i) {
            $(r, e, i)
        },
        p(r, i) {
            i & 16 && n !== (n = `transition: 0.5s; background: ${r[9]<Math.ceil(r[4]/20)?"#FFFF":"rgba(255, 255, 255, 0.2)"}`) && s(e, "style", n)
        },
        d(r) {
            r && E(e)
        }
    }
}

function Tr(t) {
    let e, n, r = !t[5] && $t(t);
    return {
        c() {
            r && r.c(), e = Ve()
        },
        m(i, o) {
            r && r.m(i, o), $(i, e, o), n = !0
        },
        p(i, [o]) {
            i[5] ? r && (Ee(), H(r, 1, 1, () => {
                r = null
            }), $e()) : r ? (r.p(i, o), o & 32 && F(r, 1)) : (r = $t(i), r.c(), F(r, 1), r.m(e.parentNode, e))
        },
        i(i) {
            n || (F(r), n = !0)
        },
        o(i) {
            H(r), n = !1
        },
        d(i) {
            r && r.d(i), i && E(e)
        }
    }
}

function Or(t, e, n) {
    let r;
    Te(t, lt, _ => n(6, r = _));
    let i = 95,
        o = 50,
        l = 50,
        a = 50,
        u = 50,
        f = !1;
    return Ye("updatePlayerHud", _ => {
        n(0, i = _.USERHEALTH), n(1, o = _.USERARMOR), n(2, l = _.USERHUNGER), n(3, a = _.USERTHIRST), n(4, u = _.USEROXIGEN), n(5, f = _.shouldHideUI)
    }), [i, o, l, a, u, f, r]
}
class Br extends ze {
    constructor(e) {
        super(), Se(this, e, Or, Tr, me, {})
    }
}
var Dr = "./fuelIcon.svg",
    qr = "./gearIcon.svg",
    jt = "./seatbeltOffIcon.svg",
    Ht = "./seatbeltOnIcon.svg",
    Pt = "./vehicleLightsOffIcon.svg",
    Mt = "./vehicleLightsOnIcon.svg",
    Gr = "./spannerIcon.svg",
    Yr = "./engineIcon.svg",
    Xr = "./streetNameIcon.svg";

function Ct(t, e, n) {
    const r = t.slice();
    return r[9] = e[n], r[11] = n, r
}

function Vt(t) {
    let e, n, r, i, o, l = (t[0] ? t[0] : 0) + "",
        a, u, f, _, w, h, v, k, p, I, ee, P, V, Y, ie, de, T, ge, oe, q, le, Re, se, M, te, W, ve, re, Le, ne, K, we, J, G, S, C, ae, A, Q = (t[3] ? t[3] < 1 ? "R" : t[3] : 0) + "",
        R, z, m, L, g, U, st, at, _e, ce, Ke, ct, fe, Je, X, ye = Array(24),
        O = [];
    for (let y = 0; y < ye.length; y += 1) O[y] = Nt(Ct(t, ye, y));
    return {
        c() {
            e = d("div"), n = d("div"), r = d("div"), i = d("div"), o = d("h1"), a = j(l), u = x(), f = d("h1"), f.textContent = "M/PH", _ = x(), w = d("div"), h = d("div"), v = d("div"), k = x(), p = d("img"), ee = x(), P = d("div");
            for (let y = 0; y < O.length; y += 1) O[y].c();
            V = x(), Y = d("div"), ie = d("div"), de = d("div"), T = d("img"), oe = x(), q = d("div"), le = d("img"), se = x(), M = d("div"), te = d("div"), W = d("img"), Le = x(), ne = d("div"), K = d("img"), J = x(), G = d("div"), S = d("img"), ae = x(), A = d("h1"), R = j(Q), L = x(), g = d("div"), U = d("img"), at = x(), _e = d("div"), ce = d("h1"), Ke = j(t[6]), ct = x(), fe = d("h1"), Je = j(t[7]), s(o, "class", "text-[1.6vw]"), b(o, "font-family", "'Poppins'"), b(o, "font-style", "normal"), b(o, "font-weight", "500"), b(o, "color", "#FFFFFF"), b(o, "text-shadow", "0px 0px 8px rgba(0, 0, 0, 0.24)"), s(f, "class", "text-[0.6vw] text-[#FFF] mt-[1.4vh]"), b(f, "font-family", "'Poppins'"), b(f, "font-style", "normal"), b(f, "font-weight", "500"), b(f, "color", "rgba(255, 255, 255, 0.6)"), b(f, "text-shadow", "0px 0px 8px rgba(0, 0, 0, 0.24)"), s(i, "class", "flex flex-row justify-end items-center pl-[0.2vw]"), s(v, "class", "h-[100%] bg-[#37ECA8] rounded-[0.08vw]"), b(v, "transition", "0.5s"), b(v, "width", (t[1] ? t[1] : 0) + "%"), s(h, "class", "flex justify-end items-center w-[5.85vw] h-[0.6vh] rounded-[0.08vw]"), b(h, "background", "rgba(255, 255, 255, 0.2)"), D(p.src, I = Dr) || s(p, "src", I), s(p, "class", "w-[0.75vw] pl-[0.2vw]"), s(p, "alt", ""), s(w, "class", "flex flex-row jusitfy-center items-center"), s(P, "class", "flex flex-row w-[6.6vw] h-[1.9vh] mt-[0.2vh] space-x-[0.08vw]"), b(P, "transform", "rotate(-180deg)"), s(r, "class", "flex flex-col justify-start items-start"), D(T.src, ge = t[5] ? Mt : Pt) || s(T, "src", ge), s(T, "class", "w-[0.4vw]"), s(T, "alt", ""), s(de, "class", "flex justify-center items-center w-[50%] h-[1.7vh] rounded-[0.1vw]"), b(de, "background", "rgba(255, 255, 255, 0.2)"), D(le.src, Re = Yr) || s(le, "src", Re), s(le, "class", "w-[0.55vw]"), s(le, "alt", ""), s(q, "class", "flex justify-center items-center w-[50%] h-[1.7vh] rounded-[0.1vw]"), b(q, "background", "rgba(255, 255, 255, 0.2)"), s(ie, "class", "flex flex-row w-[100%] space-x-[0.2vw]"), D(W.src, ve = t[4] ? Ht : jt) || s(W, "src", ve), s(W, "class", "w-[0.6vw]"), s(W, "alt", ""), s(te, "class", "flex justify-center items-center w-[50%] h-[1.7vh] rounded-[0.1vw]"), s(te, "style", re = `background: ${t[4]?"rgba(55, 236, 168, 0.2)":"rgba(236, 55, 55, 0.2)"};`), D(K.src, we = Gr) || s(K, "src", we), s(K, "class", "w-[0.5vw]"), s(K, "alt", ""), s(ne, "class", "flex justify-center items-center w-[50%] h-[1.7vh] rounded-[0.1vw]"), b(ne, "background", "rgba(255, 255, 255, 0.2)"), s(M, "class", "flex flex-row w-[100%] space-x-[0.2vw]"), D(S.src, C = qr) || s(S, "src", C), s(S, "class", "w-[0.6vw]"), s(S, "alt", ""), s(A, "class", "text-[0.6vw] text-[#000]"), b(A, "font-family", "'Poppins'"), b(A, "font-style", "normal"), b(A, "font-weight", "500"), s(G, "class", "flex flex-row justify-between items-center w-[100%] h-[2.3vh] bg-[#FFF] rounded-[0.12vw] px-[0.3vw]"), s(Y, "class", "flex flex-col justify-end items-center w-[3vw] h-auto space-y-[0.3vh]"), s(n, "class", "flex flex-row items-end w-[8.9vw] h-[7.3vh] space-x-[0.2vw]"), s(e, "class", "fixed right-[2.5vh] bottom-[2.8vh]"), D(U.src, st = Xr) || s(U, "src", st), s(U, "class", "w-[2vw]"), s(U, "alt", ""), s(ce, "class", "text-[0.6vw]"), b(ce, "font-family", "'Poppins'"), b(ce, "font-style", "normal"), b(ce, "font-weight", "600"), b(ce, "color", "#FFFFFF"), b(ce, "text-shadow", "0px 0px 8px rgba(0, 0, 0, 0.24)"), s(fe, "class", "text-[0.6vw]"), b(fe, "font-family", "'Poppins'"), b(fe, "font-style", "normal"), b(fe, "font-weight", "400"), b(fe, "color", "rgba(255, 255, 255, 0.72)"), b(fe, "text-shadow", "0px 0px 8px rgba(0, 0, 0, 0.24)"), s(_e, "class", "flex flex-col justify-center items-start"), s(g, "class", "fixed flex flex-row justify-center items-center left-[0.6vw] bottom-[20vh]")
        },
        m(y, B) {
            $(y, e, B), c(e, n), c(n, r), c(r, i), c(i, o), c(o, a), c(i, u), c(i, f), c(r, _), c(r, w), c(w, h), c(h, v), c(w, k), c(w, p), c(r, ee), c(r, P);
            for (let N = 0; N < O.length; N += 1) O[N].m(P, null);
            c(n, V), c(n, Y), c(Y, ie), c(ie, de), c(de, T), c(ie, oe), c(ie, q), c(q, le), c(Y, se), c(Y, M), c(M, te), c(te, W), c(M, Le), c(M, ne), c(ne, K), c(Y, J), c(Y, G), c(G, S), c(G, ae), c(G, A), c(A, R), $(y, L, B), $(y, g, B), c(g, U), c(g, at), c(g, _e), c(_e, ce), c(ce, Ke), c(_e, ct), c(_e, fe), c(fe, Je), X = !0
        },
        p(y, B) {
            if ((!X || B & 1) && l !== (l = (y[0] ? y[0] : 0) + "") && ue(a, l), (!X || B & 2) && b(v, "width", (y[1] ? y[1] : 0) + "%"), B & 4) {
                ye = Array(24);
                let N;
                for (N = 0; N < ye.length; N += 1) {
                    const ft = Ct(y, ye, N);
                    O[N] ? O[N].p(ft, B) : (O[N] = Nt(ft), O[N].c(), O[N].m(P, null))
                }
                for (; N < O.length; N += 1) O[N].d(1);
                O.length = ye.length
            }(!X || B & 32 && !D(T.src, ge = y[5] ? Mt : Pt)) && s(T, "src", ge), (!X || B & 16 && !D(W.src, ve = y[4] ? Ht : jt)) && s(W, "src", ve), (!X || B & 16 && re !== (re = `background: ${y[4]?"rgba(55, 236, 168, 0.2)":"rgba(236, 55, 55, 0.2)"};`)) && s(te, "style", re), (!X || B & 8) && Q !== (Q = (y[3] ? y[3] < 1 ? "R" : y[3] : 0) + "") && ue(R, Q), (!X || B & 64) && ue(Ke, y[6]), (!X || B & 128) && ue(Je, y[7])
        },
        i(y) {
            X || (be(() => {
                m && m.end(1), z = rr(e, Xe, {}), z.start()
            }), X = !0)
        },
        o(y) {
            z && z.invalidate(), m = nr(e, Xe, {}), X = !1
        },
        d(y) {
            y && E(e), pe(O, y), y && m && m.end(), y && E(L), y && E(g)
        }
    }
}

function Nt(t) {
    let e, n;
    return {
        c() {
            e = d("div"), s(e, "class", "w-[0.29vw] h-[100%] rounded-[0.05vw]"), s(e, "style", n = `transition: 0.5s; ${t[2]&&t[11]<=Math.floor(t[2]/4)?"background: #FFF;":"background: rgba(255, 255, 255, 0.2);"}`)
        },
        m(r, i) {
            $(r, e, i)
        },
        p(r, i) {
            i & 4 && n !== (n = `transition: 0.5s; ${r[2]&&r[11]<=Math.floor(r[2]/4)?"background: #FFF;":"background: rgba(255, 255, 255, 0.2);"}`) && s(e, "style", n)
        },
        d(r) {
            r && E(e)
        }
    }
}

function Wr(t) {
    let e, n, r = !t[8] && Vt(t);
    return {
        c() {
            r && r.c(), e = Ve()
        },
        m(i, o) {
            r && r.m(i, o), $(i, e, o), n = !0
        },
        p(i, [o]) {
            i[8] ? r && (Ee(), H(r, 1, 1, () => {
                r = null
            }), $e()) : r ? (r.p(i, o), o & 256 && F(r, 1)) : (r = Vt(i), r.c(), F(r, 1), r.m(e.parentNode, e))
        },
        i(i) {
            n || (F(r), n = !0)
        },
        o(i) {
            H(r), n = !1
        },
        d(i) {
            r && r.d(i), i && E(e)
        }
    }
}

function Kr(t, e, n) {
    let r = 67,
        i = 70,
        o = 70,
        l = 3,
        a = !1,
        u = !1,
        f = "",
        _ = "",
        w = !1;
    return Ye("updateVehicleHud", h => {
        n(0, r = h.SPEED), n(1, i = h.FUELPERCENT), n(2, o = h.MAXSPEEDPERCENT), n(3, l = h.GEAR), n(4, a = h.SEATBELT), n(5, u = h.LIGHTACTIVE), n(6, f = h.STREETNAME1), n(7, _ = h.STREETNAME2), n(8, w = h.shouldHideUI)
    }), [r, i, o, l, a, u, f, _, w]
}
class Jr extends ze {
    constructor(e) {
        super(), Se(this, e, Kr, Wr, me, {})
    }
}

function Ut(t) {
    let e, n;
    return e = new Br({}), {
        c() {
            Ce(e.$$.fragment)
        },
        m(r, i) {
            Fe(e, r, i), n = !0
        },
        i(r) {
            n || (F(e.$$.fragment, r), n = !0)
        },
        o(r) {
            H(e.$$.fragment, r), n = !1
        },
        d(r) {
            Ie(e, r)
        }
    }
}

function Tt(t) {
    let e, n;
    return e = new Jr({}), {
        c() {
            Ce(e.$$.fragment)
        },
        m(r, i) {
            Fe(e, r, i), n = !0
        },
        i(r) {
            n || (F(e.$$.fragment, r), n = !0)
        },
        o(r) {
            H(e.$$.fragment, r), n = !1
        },
        d(r) {
            Ie(e, r)
        }
    }
}

function Qr(t) {
    let e, n, r, i = t[0] && Ut(),
        o = t[1] && Tt();
    return {
        c() {
            i && i.c(), e = x(), o && o.c(), n = Ve()
        },
        m(l, a) {
            i && i.m(l, a), $(l, e, a), o && o.m(l, a), $(l, n, a), r = !0
        },
        p(l, a) {
            l[0] ? i ? a & 1 && F(i, 1) : (i = Ut(), i.c(), F(i, 1), i.m(e.parentNode, e)) : i && (Ee(), H(i, 1, 1, () => {
                i = null
            }), $e()), l[1] ? o ? a & 2 && F(o, 1) : (o = Tt(), o.c(), F(o, 1), o.m(n.parentNode, n)) : o && (Ee(), H(o, 1, 1, () => {
                o = null
            }), $e())
        },
        i(l) {
            r || (F(i), F(o), r = !0)
        },
        o(l) {
            H(i), H(o), r = !1
        },
        d(l) {
            i && i.d(l), l && E(e), o && o.d(l), l && E(n)
        }
    }
}

function Ot(t) {
    let e, n, r, i;
    return e = new jr({}), {
        c() {
            Ce(e.$$.fragment), n = x(), r = d("div"), s(r, "class", "absolute w-screen h-screen top-0 left-0 dev-image svelte-1lbafqt")
        },
        m(o, l) {
            Fe(e, o, l), $(o, n, l), $(o, r, l), i = !0
        },
        i(o) {
            i || (F(e.$$.fragment, o), i = !0)
        },
        o(o) {
            H(e.$$.fragment, o), i = !1
        },
        d(o) {
            Ie(e, o), o && E(n), o && E(r)
        }
    }
}

function Zr(t) {
    let e, n, r, i, o, l;
    e = new Sr({
        props: {
            $$slots: {
                default: [Qr]
            },
            $$scope: {
                ctx: t
            }
        }
    }), r = new Pr({});
    let a = t[2] && Ot();
    return {
        c() {
            Ce(e.$$.fragment), n = x(), Ce(r.$$.fragment), i = x(), a && a.c(), o = Ve()
        },
        m(u, f) {
            Fe(e, u, f), $(u, n, f), Fe(r, u, f), $(u, i, f), a && a.m(u, f), $(u, o, f), l = !0
        },
        p(u, [f]) {
            const _ = {};
            f & 11 && (_.$$scope = {
                dirty: f,
                ctx: u
            }), e.$set(_), u[2] ? a ? f & 4 && F(a, 1) : (a = Ot(), a.c(), F(a, 1), a.m(o.parentNode, o)) : a && (Ee(), H(a, 1, 1, () => {
                a = null
            }), $e())
        },
        i(u) {
            l || (F(e.$$.fragment, u), F(r.$$.fragment, u), F(a), l = !0)
        },
        o(u) {
            H(e.$$.fragment, u), H(r.$$.fragment, u), H(a), l = !1
        },
        d(u) {
            Ie(e, u), u && E(n), Ie(r, u), u && E(i), a && a.d(u), u && E(o)
        }
    }
}

function en(t, e, n) {
    let r, i, o;
    return Te(t, ir, l => n(0, r = l)), Te(t, lt, l => n(1, i = l)), Te(t, tt, l => n(2, o = l)), [r, i, o]
}
class tn extends ze {
    constructor(e) {
        super(), Se(this, e, en, Zr, me, {})
    }
}
new tn({
    target: document.getElementById("app")
});
