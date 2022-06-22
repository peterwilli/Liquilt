var app = function() {
    "use strict";

    function t() {}

    function e(t) {
        return t()
    }

    function n() {
        return Object.create(null)
    }

    function o(t) {
        t.forEach(e)
    }

    function r(t) {
        return "function" == typeof t
    }
    let i, c;

    function s(t, e) {
        return i || (i = document.createElement("a")), i.href = e, t === i.href
    }

    function u(t, e) {
        return t != t ? e == e : t !== e
    }

    function l(t, e) {
        t.appendChild(e)
    }

    function a(t, e, n) {
        t.insertBefore(e, n || null)
    }

    function d(t) {
        t.parentNode.removeChild(t)
    }

    function f(t) {
        return document.createElement(t)
    }

    function h() {
        return t = " ", document.createTextNode(t);
        var t
    }

    function p(t, e, n) {
        null == n ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n)
    }

    function m(t) {
        const e = {};
        for (const n of t) e[n.name] = n.value;
        return e
    }

    function $(t) {
        c = t
    }

    function g(t) {
        (function() {
            if (!c) throw new Error("Function called outside component initialization");
            return c
        })().$$.on_mount.push(t)
    }
    const v = [],
        y = [],
        b = [],
        _ = [],
        E = Promise.resolve();
    let x = !1;

    function w(t) {
        b.push(t)
    }
    const k = new Set;
    let L = 0;

    function C() {
        const t = c;
        do {
            for (; L < v.length;) {
                const t = v[L];
                L++, $(t), M(t.$$)
            }
            for ($(null), v.length = 0, L = 0; y.length;) y.pop()();
            for (let t = 0; t < b.length; t += 1) {
                const e = b[t];
                k.has(e) || (k.add(e), e())
            }
            b.length = 0
        } while (v.length);
        for (; _.length;) _.pop()();
        x = !1, k.clear(), $(t)
    }

    function M(t) {
        if (null !== t.fragment) {
            t.update(), o(t.before_update);
            const e = t.dirty;
            t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(w)
        }
    }
    const j = new Set;

    function A(t, e) {
        -1 === t.$$.dirty[0] && (v.push(t), x || (x = !0, E.then(C)), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31
    }

    function T(i, s, u, l, a, f, h, p = [-1]) {
        const m = c;
        $(i);
        const g = i.$$ = {
            fragment: null,
            ctx: null,
            props: f,
            update: t,
            not_equal: a,
            bound: n(),
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(s.context || (m ? m.$$.context : [])),
            callbacks: n(),
            dirty: p,
            skip_bound: !1,
            root: s.target || m.$$.root
        };
        h && h(g.root);
        let v = !1;
        if (g.ctx = u ? u(i, s.props || {}, ((t, e, ...n) => {
                const o = n.length ? n[0] : e;
                return g.ctx && a(g.ctx[t], g.ctx[t] = o) && (!g.skip_bound && g.bound[t] && g.bound[t](o), v && A(i, t)), e
            })) : [], g.update(), v = !0, o(g.before_update), g.fragment = !!l && l(g.ctx), s.target) {
            if (s.hydrate) {
                const t = function(t) {
                    return Array.from(t.childNodes)
                }(s.target);
                g.fragment && g.fragment.l(t), t.forEach(d)
            } else g.fragment && g.fragment.c();
            s.intro && ((y = i.$$.fragment) && y.i && (j.delete(y), y.i(b))),
                function(t, n, i, c) {
                    const {
                        fragment: s,
                        on_mount: u,
                        on_destroy: l,
                        after_update: a
                    } = t.$$;
                    s && s.m(n, i), c || w((() => {
                        const n = u.map(e).filter(r);
                        l ? l.push(...n) : o(n), t.$$.on_mount = []
                    })), a.forEach(w)
                }(i, s.target, s.anchor, s.customElement), C()
        }
        var y, b;
        $(m)
    }
    let N;

    function O(t) {
        let e;
        return {
            c() {
                e = f("span"), e.textContent = "Loading..."
            },
            m(t, n) {
                a(t, e, n)
            },
            d(t) {
                t && d(e)
            }
        }
    }

    function S(e) {
        let n, o, r, i, c, u, m = !e[4] && O();
        return {
            c() {
                var l, a, d, $;
                n = f("main"), o = f("div"), m && m.c(), r = h(), i = f("div"), c = f("video"), this.c = t, l = c, a = "opacity", null === (d = "0") ? l.style.removeProperty(a) : l.style.setProperty(a, d, $ ? "important" : ""), p(c, "oncontextmenu", "return false;"), s(c.src, u = e[0]) || p(c, "src", u), p(i, "class", "video-holder"), p(o, "class", "container")
            },
            m(t, s) {
                a(t, n, s), l(n, o), m && m.m(o, null), l(o, r), l(o, i), l(i, c), e[5](c), e[6](i), e[7](o)
            },
            p(t, [e]) {
                t[4] ? m && (m.d(1), m = null) : m || (m = O(), m.c(), m.m(o, r)), 1 & e && !s(c.src, u = t[0]) && p(c, "src", u)
            },
            i: t,
            o: t,
            d(t) {
                t && d(n), m && m.d(), e[5](null), e[6](null), e[7](null)
            }
        }
    }

    function q(t, e, n) {
        let o, {
                render: r
            } = e,
            i = null,
            c = null,
            s = null,
            u = !1,
            l = null,
            a = [];

        function d(t) {
            let e = o.clientWidth,
                n = 0;
            t && (n = t.layerX);
            let r = n / e,
                i = Math.floor(r * s);
            l != i && (null != l && (a[l].style.opacity = 0), a[i].style.opacity = 1, l = i)
        }

        function f() {
            s = Math.floor(i.duration), i.removeEventListener("canplay", f), a.push(i);
            let t = s - 1;

            function e(o) {
                t--, 0 == t && n(4, u = !0), o.target.removeEventListener("seeked", e)
            }
            for (var o = 1; o < s; o++) {
                let t = document.createElement("video");
                t.src = i.src, t.currentTime = o, t.oncontextmenu = "return false;", t.style.opacity = 0, t.addEventListener("seeked", e), c.appendChild(t), a.push(t)
            }
            c.addEventListener("pointermove", d), d()
        }
        return g((function() {
            i.addEventListener("canplay", f)
        })), t.$$set = t => {
            "render" in t && n(0, r = t.render)
        }, [r, o, i, c, u, function(t) {
            y[t ? "unshift" : "push"]((() => {
                i = t, n(2, i)
            }))
        }, function(t) {
            y[t ? "unshift" : "push"]((() => {
                c = t, n(3, c)
            }))
        }, function(t) {
            y[t ? "unshift" : "push"]((() => {
                o = t, n(1, o)
            }))
        }]
    }
    "function" == typeof HTMLElement && (N = class extends HTMLElement {
        constructor() {
            super(), this.attachShadow({
                mode: "open"
            })
        }
        connectedCallback() {
            const {
                on_mount: t
            } = this.$$;
            this.$$.on_disconnect = t.map(e).filter(r);
            for (const t in this.$$.slotted) this.appendChild(this.$$.slotted[t])
        }
        attributeChangedCallback(t, e, n) {
            this[t] = n
        }
        disconnectedCallback() {
            o(this.$$.on_disconnect)
        }
        $destroy() {
            ! function(t, e) {
                const n = t.$$;
                null !== n.fragment && (o(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = [])
            }(this, 1), this.$destroy = t
        }
        $on(t, e) {
            const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
            return n.push(e), () => {
                const t = n.indexOf(e); - 1 !== t && n.splice(t, 1)
            }
        }
        $set(t) {
            var e;
            this.$$set && (e = t, 0 !== Object.keys(e).length) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1)
        }
    });
    class H extends N {
        constructor(t) {
            super(), this.shadowRoot.innerHTML = "<style>.container{position:absolute;left:0;right:0;top:0;bottom:0;text-align:center}.container video{object-fit:contain;left:0;right:0;width:100%;height:100%;position:absolute}.container .video-holder{touch-action:none;position:relative;height:100%;width:100%}</style>", T(this, {
                target: this.shadowRoot,
                props: m(this.attributes),
                customElement: !0
            }, q, S, u, {
                render: 0
            }, null), t && (t.target && a(t.target, this, t.anchor), t.props && (this.$set(t.props), C()))
        }
        static get observedAttributes() {
            return ["render"]
        }
        get render() {
            return this.$$.ctx[0]
        }
        set render(t) {
            this.$$set({
                render: t
            }), C()
        }
    }
    customElements.define("liquilt-viewer", H);
    const P = {
        version: "0.2.1"
    };

    function z(t) {
        alert(`Error encountered! (Screenshot this in a bug report!):\nLiquilt v${P.version}\n${t.message}[${t.lineNumber}]`)
    }
    return Object.freeze(P), window.addEventListener("unhandledrejection", (function(t) {
        z(t.reason)
    })), window.addEventListener("error", (function(t) {
        return console.log("e", t), z(t.error), !1
    })), H
}();