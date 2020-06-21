"use strict";

function FloatingLogos(e) {
  function t() {
    var e, t, i, n, o;
    r.vertShrink = (e = 1e3, t = 800, (window.innerHeight - e) / (t - e)), r.vertShrink = (i = r.vertShrink, n = 0, o = 1, Math.max(Math.min(i, 1), 0))
  }
  
  function i() {
    var e = r.container.getBoundingClientRect();
    (e.bottom < 0 || e.top > window.innerHeight) && !0 === r.playing ? r.playing = !1 : e.bottom > 0 && e.top < window.innerHeight && !1 === r.playing && (r.playing = !0, requestAnimationFrame(function (e) {
      return r.tick(e)
    }))
  }
  
  function n(e) {
    var t = e.x + e.noiseX + r.scrollX, i = e.y + e.noiseY;
    i = function (e, t, i) {
      return e * (1 - i) + t * i
    }(i, r.containerHeight / 2, r.vertShrink * r.maxShrink), t < -200 && (e.x += r.containerWidth);
    var n = o(e.introProgress) / 20 + .95;
    n *= e.scale, e.el.style.opacity = o(e.introProgress), e.el.style.transform = "translate(".concat(t, "px, ").concat(i, "px) scale(").concat(n, ")")
  }
  
  function o(e) {
    return e < .5 ? 2 * e * e : (4 - 2 * e) * e - 1
  }
  
  var s = this, r = self = this, a = e;
  for (l in a) self[l] = a[l];
  if (this.container = document.querySelector(this.containerSelector), !this.container) return !1;
  this.bubbles = floatingLogosBubbleData, this.noiseT = 0, this.scrollX = 0, function e(t) {
    var i = 0, n = 0, o = null;
    for (i = t.length - 1; i > 0; i -= 1) n = Math.floor(Math.random() * (i + 1)), o = t[i], t[i] = t[n], t[n] = o
  }(this.logos), this.vertShrink = 0, t(), window.addEventListener("resize", t), this.playing = !1, i(), window.addEventListener("scroll", i), this.logosLoaded = !0;
  for (var l = 0; l < this.bubbles.length; l++) {
    var c = this.bubbles[l], d = l % this.logos.length;
    c.scale = c.s || 1, c.seedX = 1e4 * Math.random(), c.seedY = 1e4 * Math.random(), c.noiseX = c.noiseY = 0, c.introDelay = Math.random() * this.introDelay, c.introProgress = 0, c.el = document.createElement("div"), c.el.style.backgroundImage = "url(".concat(this.logos[d].src, ")"), c.el.className = this.classPrefix + " " + this.logos[d].cssClass, c.tagEl = document.createElement("span"), c.tagEl.innerHTML = this.logos[d].name, c.el.appendChild(c.tagEl), n(c), this.container.appendChild(c.el)
  }
  this.firstTick = null, this.lastTick = 0, this.tick = function (e) {
    s.firstTick || (s.firstTick = e);
    var t = (e -= s.firstTick) - s.lastTick;
    s.lastTick = e, s.noiseT += t * s.noiseSpeed, s.scrollX -= t * s.scrollSpeed;
    for (var i = 0; i < s.bubbles.length; i++) {
      var o = r.bubbles[i];
      o.noiseX = noise(o.seedX + s.noiseT) * s.noiseScale - s.noiseScale / 2, o.noiseY = noise(o.seedY + s.noiseT) * s.noiseScale - s.noiseScale / 2, o.introProgress < 1 && e > o.introDelay && (o.introProgress = Math.min(1, o.introProgress + t / s.introDuration)), n(o)
    }
    s.playing && requestAnimationFrame(s.tick)
  }
}

function _objectSpread(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = null != arguments[t] ? arguments[t] : {}, n = Object.keys(i);
    "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function (e) {
      return Object.getOwnPropertyDescriptor(i, e).enumerable
    }))), n.forEach(function (t) {
      _defineProperty(e, t, i[t])
    })
  }
  return e
}

function _defineProperty(e, t, i) {
  return t in e ? Object.defineProperty(e, t, {value: i, enumerable: !0, configurable: !0, writable: !0}) : e[t] = i, e
}

function VGNAnimation(e) {
  function t(e) {
    var t = e.x + e.noiseY + o.scrollX, i = e.y;
    t > o.containerWidth - e.el.clientWidth && (e.x -= o.containerWidth), e.introProgress <= 1 && (e.el.style.opacity = e.introProgress), e.el.style.transform = "translate(".concat(t, "px, ").concat(i, "px)")
  }
  
  function i(e) {
    return e < .5 ? 2 * e * e : (4 - 2 * e) * e - 1
  }
  
  var n = this, o = self = this, s = e;
  for (r in s) self[r] = s[r];
  if (!this.container) return !1;
  this.noiseT = 0, this.scrollX = 0, this.logos = this.bubbles = bubbleNodes.map(function (e, t) {
    return _objectSpread({}, VGNAnimationBubbleData[t], e, {index: t})
  }).filter(function (e) {
    return e.title && e.title.length
  }), function e(t) {
    var i = 0, n = 0, o = null;
    for (i = t.length - 1; i > 0; i -= 1) n = Math.floor(Math.random() * (i + 1)), o = t[i], t[i] = t[n], t[n] = o
  }(this.logos), this.playing = !0, this.logosLoaded = !0;
  for (var r = 0; r < this.bubbles.length; r++) {
    var a = this.bubbles[r], l = r % this.logos.length;
    a.scale = 1, a.seedX = 1e4 * Math.random(), a.seedY = 1e4 * Math.random(), a.noiseX = 0, a.noiseY = 0, a.x += window.innerWidth, a.originalX = a.x, a.originalY = a.y, a.introDelay = Math.random() * this.introDelay, a.introProgress = 0, a.el = document.createElement("div"), a.el.innerHTML = a.title, a.el.className = "vgn__animation-node vgn__animation-node".concat(r, " vgn__animation-node vgn__animation-node--").concat(a.type), t(a), this.container.appendChild(a.el)
  }
  requestAnimationFrame(function (e) {
    return n.tick(e)
  }), this.firstTick = null, this.lastTick = 0, this.tick = function (e) {
    n.firstTick || (n.firstTick = e);
    var i = (e -= n.firstTick) - n.lastTick;
    n.lastTick = e, n.noiseT += i * n.noiseSpeed, n.scrollX += i * n.scrollSpeed;
    for (var s = 0; s < n.bubbles.length; s++) {
      var r = o.bubbles[s];
      r.noiseY = noise(r.seedY + n.noiseT) * n.noiseScale - n.noiseScale / 2, r.introProgress <= 1 && (r.introProgress = Math.min(1, r.introProgress + i / n.introDuration)), t(r)
    }
    n.playing && requestAnimationFrame(n.tick)
  }
}

!function (e, t) {
  function i(e) {
    this.callback = e, this.ticking = !1
  }
  
  function n(t) {
    return t && void 0 !== e && (t === e || t.nodeType)
  }
  
  function o(e) {
    if (arguments.length <= 0) throw new Error("Missing arguments in extend function");
    var t, i, s = e || {};
    for (i = 1; i < arguments.length; i++) {
      var r = arguments[i] || {};
      for (t in r) s[t] = "object" != typeof s[t] || n(s[t]) ? s[t] || r[t] : o(s[t], r[t])
    }
    return s
  }
  
  function s(e) {
    return e === Object(e) ? e : {down: e, up: e}
  }
  
  function r(e, t) {
    t = o(t, r.options), this.lastKnownScrollY = 0, this.elem = e, this.debouncer = new i(this.update.bind(this)), this.tolerance = s(t.tolerance), this.classes = t.classes, this.offset = t.offset, this.scroller = t.scroller, this.initialised = !1, this.onPin = t.onPin, this.onUnpin = t.onUnpin, this.onTop = t.onTop, this.onNotTop = t.onNotTop
  }
  
  var a = {
    bind: !!function () {
    }.bind,
    classList: "classList" in t.documentElement,
    rAF: !!(e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame)
  };
  e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame, i.prototype = {
    constructor: i,
    update: function () {
      this.callback && this.callback(), this.ticking = !1
    },
    requestTick: function () {
      this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0)
    },
    handleEvent: function () {
      this.requestTick()
    }
  }, r.prototype = {
    constructor: r, init: function () {
      return r.cutsTheMustard ? (this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this) : void 0
    }, destroy: function () {
      var e = this.classes;
      this.initialised = !1, this.elem.classList.remove(e.unpinned, e.pinned, e.top, e.initial), this.scroller.removeEventListener("scroll", this.debouncer, !1)
    }, attachEvent: function () {
      this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent())
    }, unpin: function () {
      var e = this.elem.classList, t = this.classes;
      (e.contains(t.pinned) || !e.contains(t.unpinned)) && (e.add(t.unpinned), e.remove(t.pinned), this.onUnpin && this.onUnpin.call(this))
    }, pin: function () {
      var e = this.elem.classList, t = this.classes;
      e.contains(t.unpinned) && (e.remove(t.unpinned), e.add(t.pinned), this.onPin && this.onPin.call(this))
    }, top: function () {
      var e = this.elem.classList, t = this.classes;
      e.contains(t.top) || (e.add(t.top), e.remove(t.notTop), this.onTop && this.onTop.call(this))
    }, notTop: function () {
      var e = this.elem.classList, t = this.classes;
      e.contains(t.notTop) || (e.add(t.notTop), e.remove(t.top), this.onNotTop && this.onNotTop.call(this))
    }, getScrollY: function () {
      return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (t.documentElement || t.body.parentNode || t.body).scrollTop
    }, getViewportHeight: function () {
      return e.innerHeight || t.documentElement.clientHeight || t.body.clientHeight
    }, getDocumentHeight: function () {
      var e = t.body, i = t.documentElement;
      return Math.max(e.scrollHeight, i.scrollHeight, e.offsetHeight, i.offsetHeight, e.clientHeight, i.clientHeight)
    }, getElementHeight: function (e) {
      return Math.max(e.scrollHeight, e.offsetHeight, e.clientHeight)
    }, getScrollerHeight: function () {
      return this.scroller === e || this.scroller === t.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
    }, isOutOfBounds: function (e) {
      var t = 0 > e, i = e + this.getViewportHeight() > this.getScrollerHeight();
      return t || i
    }, toleranceExceeded: function (e, t) {
      return Math.abs(e - this.lastKnownScrollY) >= this.tolerance[t]
    }, shouldUnpin: function (e, t) {
      var i = e > this.lastKnownScrollY, n = e >= this.offset;
      return i && n && t
    }, shouldPin: function (e, t) {
      var i = e < this.lastKnownScrollY, n = e <= this.offset;
      return i && t || n
    }, update: function () {
      var e = this.getScrollY(), t = e > this.lastKnownScrollY ? "down" : "up", i = this.toleranceExceeded(e, t);
      this.isOutOfBounds(e) || (e <= this.offset ? this.top() : this.notTop(), this.shouldUnpin(e, i) ? this.unpin() : this.shouldPin(e, i) && this.pin(), this.lastKnownScrollY = e)
    }
  }, r.options = {
    tolerance: {up: 0, down: 0},
    offset: 0,
    scroller: e,
    classes: {
      pinned: "headroom--pinned",
      unpinned: "headroom--unpinned",
      top: "headroom--top",
      notTop: "headroom--not-top",
      initial: "headroom"
    }
  }, r.cutsTheMustard = void 0 !== a && a.rAF && a.bind && a.classList, e.Headroom = r
}(window, document), function (e) {
  e && (e.fn.headroom = function (t) {
    return this.each(function () {
      var i = e(this), n = i.data("headroom"), o = "object" == typeof t && t;
      o = e.extend(!0, {}, Headroom.options, o), n || ((n = new Headroom(this, o)).init(), i.data("headroom", n)), "string" == typeof t && n[t]()
    })
  }, e("[data-headroom]").each(function () {
    var t = e(this);
    t.headroom(t.data())
  }))
}(window.Zepto || window.jQuery), function () {
  var e;
  e = function () {
    function e() {
      this.isUIWebView() && $("html").addClass("uiwebview")
    }
    
    return e.prototype.regex = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i, e.prototype.isUIWebView = function () {
      return this.regex.test(navigator.userAgent)
    }, e
  }(), jQuery(function () {
    return window.UIWebViewDetector = new e
  }), jQuery.isUIWebView = function () {
    return UIWebViewDetector.isUIWebView()
  }
}.call(this), function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function (e) {
  function t(t) {
    return !t.nodeName || -1 !== e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])
  }
  
  function i(t) {
    return e.isFunction(t) || e.isPlainObject(t) ? t : {top: t, left: t}
  }
  
  var n = e.scrollTo = function (t, i, n) {
    return e(window).scrollTo(t, i, n)
  };
  return n.defaults = {axis: "xy", duration: 0, limit: !0}, e.fn.scrollTo = function (o, s, r) {
    "object" == typeof s && (r = s, s = 0), "function" == typeof r && (r = {onAfter: r}), "max" === o && (o = 9e9), r = e.extend({}, n.defaults, r), s = s || r.duration;
    var a = r.queue && 1 < r.axis.length;
    return a && (s /= 2), r.offset = i(r.offset), r.over = i(r.over), this.each(function () {
      function l(t) {
        var i = e.extend({}, r, {
          queue: !0, duration: s, complete: t && function () {
            t.call(d, p, r)
          }
        });
        u.animate(f, i)
      }
      
      if (null !== o) {
        var c = t(this), d = c ? this.contentWindow || window : this, u = e(d), p = o, f = {}, h;
        switch (typeof p) {
          case"number":
          case"string":
            if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(p)) {
              p = i(p);
              break
            }
            p = c ? e(p) : e(p, d);
          case"object":
            if (0 === p.length) return;
            (p.is || p.style) && (h = (p = e(p)).offset())
        }
        var m = e.isFunction(r.offset) && r.offset(d, p) || r.offset;
        e.each(r.axis.split(""), function (e, t) {
          var i = "x" === t ? "Left" : "Top", o = i.toLowerCase(), s = "scroll" + i, g = u[s](), v = n.max(d, t);
          h ? (f[s] = h[o] + (c ? 0 : g - u.offset()[o]), r.margin && (f[s] -= parseInt(p.css("margin" + i), 10) || 0, f[s] -= parseInt(p.css("border" + i + "Width"), 10) || 0), f[s] += m[o] || 0, r.over[o] && (f[s] += p["x" === t ? "width" : "height"]() * r.over[o])) : (i = p[o], f[s] = i.slice && "%" === i.slice(-1) ? parseFloat(i) / 100 * v : i), r.limit && /^\d+$/.test(f[s]) && (f[s] = 0 >= f[s] ? 0 : Math.min(f[s], v)), !e && 1 < r.axis.length && (g === f[s] ? f = {} : a && (l(r.onAfterFirst), f = {}))
        }), l(r.onAfter)
      }
    })
  }, n.max = function (i, n) {
    var o, s = "scroll" + (o = "x" === n ? "Width" : "Height");
    if (!t(i)) return i[s] - e(i)[o.toLowerCase()]();
    var o = "client" + o, r, a = (r = i.ownerDocument || i.document).documentElement, r = r.body;
    return Math.max(a[s], r[s]) - Math.min(a[o], r[o])
  }, e.Tween.propHooks.scrollLeft = e.Tween.propHooks.scrollTop = {
    get: function (t) {
      return e(t.elem)[t.prop]()
    }, set: function (t) {
      var i = this.get(t);
      if (t.options.interrupt && t._last && t._last !== i) return e(t.elem).stop();
      var n = Math.round(t.now);
      i !== n && (e(t.elem)[t.prop](n), t._last = this.get(t))
    }
  }, n
}), function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.AOS = t() : e.AOS = t()
}(this, function () {
  return function (e) {
    function t(n) {
      if (i[n]) return i[n].exports;
      var o = i[n] = {exports: {}, id: n, loaded: !1};
      return e[n].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }
    
    var i = {};
    return t.m = e, t.c = i, t.p = "dist/", t(0)
  }([function (e, t, i) {
    function n(e) {
      return e && e.__esModule ? e : {default: e}
    }
    
    var o = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var i = arguments[t];
          for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
        }
        return e
      }, s, r = (n(i(1)), i(6)), a = n(r), l, c = n(i(7)), d, u = n(i(8)), p, f = n(i(9)), h, m = n(i(10)), g,
      v = n(i(11)), y, b = n(i(14)), w = [], k = !1, S = document.all && !window.atob,
      x = {offset: 120, delay: 0, easing: "ease", duration: 400, disable: !1, once: !1, startEvent: "DOMContentLoaded"},
      T = function (e) {
        var t;
        if (arguments.length > 0 && void 0 !== e && e && (k = !0), k) return w = (0, v.default)(w, x), (0, m.default)(w, x.once), w
      }, C = function () {
        w = (0, b.default)(), T()
      }, $ = function () {
        w.forEach(function (e, t) {
          e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay")
        })
      }, A = function (e) {
        return !0 === e || "mobile" === e && f.default.mobile() || "phone" === e && f.default.phone() || "tablet" === e && f.default.tablet() || "function" == typeof e && !0 === e()
      }, E = function (e) {
        return x = o(x, e), w = (0, b.default)(), A(x.disable) || S ? $() : (document.querySelector("body").setAttribute("data-aos-easing", x.easing), document.querySelector("body").setAttribute("data-aos-duration", x.duration), document.querySelector("body").setAttribute("data-aos-delay", x.delay), "DOMContentLoaded" === x.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ? T(!0) : "load" === x.startEvent ? window.addEventListener(x.startEvent, function () {
          T(!0)
        }) : document.addEventListener(x.startEvent, function () {
          T(!0)
        }), window.addEventListener("resize", (0, c.default)(T, 50, !0)), window.addEventListener("orientationchange", (0, c.default)(T, 50, !0)), window.addEventListener("scroll", (0, a.default)(function () {
          (0, m.default)(w, x.once)
        }, 99)), document.addEventListener("DOMNodeRemoved", function (e) {
          var t = e.target;
          t && 1 === t.nodeType && t.hasAttribute && t.hasAttribute("data-aos") && (0, c.default)(C, 50, !0)
        }), (0, u.default)("[data-aos]", C), w)
      };
    e.exports = {init: E, refresh: T, refreshHard: C}
  }, function (e, t) {
  }, , , , , function (e, t) {
    (function (t) {
      function i(e, t, i) {
        function n(t) {
          var i = m, n = g;
          return m = g = void 0, k = t, y = e.apply(n, i)
        }
        
        function s(e) {
          return k = e, b = setTimeout(d, t), C ? n(e) : y
        }
        
        function r(e) {
          var i, n, o = t - (e - w);
          return $ ? x(o, v - (e - k)) : o
        }
        
        function l(e) {
          var i = e - w, n;
          return void 0 === w || i >= t || i < 0 || $ && e - k >= v
        }
        
        function d() {
          var e = T();
          return l(e) ? u(e) : void (b = setTimeout(d, r(e)))
        }
        
        function u(e) {
          return b = void 0, A && m ? n(e) : (m = g = void 0, y)
        }
        
        function p() {
          void 0 !== b && clearTimeout(b), k = 0, m = w = g = b = void 0
        }
        
        function f() {
          return void 0 === b ? y : u(T())
        }
        
        function h() {
          var e = T(), i = l(e);
          if (m = arguments, g = this, w = e, i) {
            if (void 0 === b) return s(w);
            if ($) return b = setTimeout(d, t), n(w)
          }
          return void 0 === b && (b = setTimeout(d, t)), y
        }
        
        var m, g, v, y, b, w, k = 0, C = !1, $ = !1, A = !0;
        if ("function" != typeof e) throw new TypeError(c);
        return t = a(t) || 0, o(i) && (C = !!i.leading, v = ($ = "maxWait" in i) ? S(a(i.maxWait) || 0, t) : v, A = "trailing" in i ? !!i.trailing : A), h.cancel = p, h.flush = f, h
      }
      
      function n(e, t, n) {
        var s = !0, r = !0;
        if ("function" != typeof e) throw new TypeError(c);
        return o(n) && (s = "leading" in n ? !!n.leading : s, r = "trailing" in n ? !!n.trailing : r), i(e, t, {
          leading: s,
          maxWait: t,
          trailing: r
        })
      }
      
      function o(e) {
        var t = void 0 === e ? "undefined" : l(e);
        return !!e && ("object" == t || "function" == t)
      }
      
      function s(e) {
        return !!e && "object" == (void 0 === e ? "undefined" : l(e))
      }
      
      function r(e) {
        return "symbol" == (void 0 === e ? "undefined" : l(e)) || s(e) && k.call(e) == u
      }
      
      function a(e) {
        if ("number" == typeof e) return e;
        if (r(e)) return d;
        if (o(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;
          e = o(t) ? t + "" : t
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(p, "");
        var i = h.test(e);
        return i || m.test(e) ? g(e.slice(2), i ? 2 : 8) : f.test(e) ? d : +e
      }
      
      var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
          return typeof e
        } : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, c = "Expected a function", d = NaN, u = "[object Symbol]", p = /^\s+|\s+$/g, f = /^[-+]0x[0-9a-f]+$/i,
        h = /^0b[01]+$/i, m = /^0o[0-7]+$/i, g = parseInt,
        v = "object" == (void 0 === t ? "undefined" : l(t)) && t && t.Object === Object && t,
        y = "object" == ("undefined" == typeof self ? "undefined" : l(self)) && self && self.Object === Object && self,
        b = v || y || Function("return this")(), w, k = Object.prototype.toString, S = Math.max, x = Math.min,
        T = function () {
          return b.Date.now()
        };
      e.exports = n
    }).call(t, function () {
      return this
    }())
  }, function (e, t) {
    (function (t) {
      function i(e, t, i) {
        function o(t) {
          var i = m, n = g;
          return m = g = void 0, T = t, y = e.apply(n, i)
        }
        
        function s(e) {
          return T = e, b = setTimeout(d, t), C ? o(e) : y
        }
        
        function a(e) {
          var i, n, o = t - (e - w);
          return $ ? S(o, v - (e - T)) : o
        }
        
        function c(e) {
          var i = e - w, n;
          return void 0 === w || i >= t || i < 0 || $ && e - T >= v
        }
        
        function d() {
          var e = x();
          return c(e) ? u(e) : void (b = setTimeout(d, a(e)))
        }
        
        function u(e) {
          return b = void 0, A && m ? o(e) : (m = g = void 0, y)
        }
        
        function p() {
          void 0 !== b && clearTimeout(b), T = 0, m = w = g = b = void 0
        }
        
        function f() {
          return void 0 === b ? y : u(x())
        }
        
        function h() {
          var e = x(), i = c(e);
          if (m = arguments, g = this, w = e, i) {
            if (void 0 === b) return s(w);
            if ($) return b = setTimeout(d, t), o(w)
          }
          return void 0 === b && (b = setTimeout(d, t)), y
        }
        
        var m, g, v, y, b, w, T = 0, C = !1, $ = !1, A = !0;
        if ("function" != typeof e) throw new TypeError(l);
        return t = r(t) || 0, n(i) && (C = !!i.leading, v = ($ = "maxWait" in i) ? k(r(i.maxWait) || 0, t) : v, A = "trailing" in i ? !!i.trailing : A), h.cancel = p, h.flush = f, h
      }
      
      function n(e) {
        var t = void 0 === e ? "undefined" : a(e);
        return !!e && ("object" == t || "function" == t)
      }
      
      function o(e) {
        return !!e && "object" == (void 0 === e ? "undefined" : a(e))
      }
      
      function s(e) {
        return "symbol" == (void 0 === e ? "undefined" : a(e)) || o(e) && w.call(e) == d
      }
      
      function r(e) {
        if ("number" == typeof e) return e;
        if (s(e)) return c;
        if (n(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;
          e = n(t) ? t + "" : t
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(u, "");
        var i = f.test(e);
        return i || h.test(e) ? m(e.slice(2), i ? 2 : 8) : p.test(e) ? c : +e
      }
      
      var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
          return typeof e
        } : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, l = "Expected a function", c = NaN, d = "[object Symbol]", u = /^\s+|\s+$/g, p = /^[-+]0x[0-9a-f]+$/i,
        f = /^0b[01]+$/i, h = /^0o[0-7]+$/i, m = parseInt,
        g = "object" == (void 0 === t ? "undefined" : a(t)) && t && t.Object === Object && t,
        v = "object" == ("undefined" == typeof self ? "undefined" : a(self)) && self && self.Object === Object && self,
        y = g || v || Function("return this")(), b, w = Object.prototype.toString, k = Math.max, S = Math.min,
        x = function () {
          return y.Date.now()
        };
      e.exports = i
    }).call(t, function () {
      return this
    }())
  }, function (e, t) {
    function i(e, t) {
      r.push({selector: e, fn: t}), !a && s && (a = new s(n)).observe(o.documentElement, {
        childList: !0,
        subtree: !0,
        removedNodes: !0
      }), n()
    }
    
    function n() {
      for (var e, t, i = 0, n = r.length; i < n; i++) {
        e = r[i];
        for (var s, a = 0, l = (t = o.querySelectorAll(e.selector)).length; a < l; a++) (s = t[a]).ready || (s.ready = !0, e.fn.call(s, s))
      }
    }
    
    Object.defineProperty(t, "__esModule", {value: !0});
    var o = window.document, s = window.MutationObserver || window.WebKitMutationObserver, r = [], a = void 0;
    t.default = i
  }, function (e, t) {
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    
    function n() {
      return navigator.userAgent || navigator.vendor || window.opera || ""
    }
    
    Object.defineProperty(t, "__esModule", {value: !0});
    var o = function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
          }
        }
        
        return function (t, i, n) {
          return i && e(t.prototype, i), n && e(t, n), t
        }
      }(),
      s = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
      r = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
      a = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
      l = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
      c = function () {
        function e() {
          i(this, e)
        }
        
        return o(e, [{
          key: "phone", value: function () {
            var e = n();
            return !(!s.test(e) && !r.test(e.substr(0, 4)))
          }
        }, {
          key: "mobile", value: function () {
            var e = n();
            return !(!a.test(e) && !l.test(e.substr(0, 4)))
          }
        }, {
          key: "tablet", value: function () {
            return this.mobile() && !this.phone()
          }
        }]), e
      }();
    t.default = new c
  }, function (e, t) {
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function (e, t, i) {
      var n = e.node.getAttribute("data-aos-once");
      t > e.position ? e.node.classList.add("aos-animate") : void 0 !== n && ("false" === n || !i && "true" !== n) && e.node.classList.remove("aos-animate")
    }, n = function (e, t) {
      var n = window.pageYOffset, o = window.innerHeight;
      e.forEach(function (e, s) {
        i(e, o + n, t)
      })
    };
    t.default = n
  }, function (e, t, i) {
    function n(e) {
      return e && e.__esModule ? e : {default: e}
    }
    
    Object.defineProperty(t, "__esModule", {value: !0});
    var o, s = n(i(12)), r = function (e, t) {
      return e.forEach(function (e, i) {
        e.node.classList.add("aos-init"), e.position = (0, s.default)(e.node, t.offset)
      }), e
    };
    t.default = r
  }, function (e, t, i) {
    function n(e) {
      return e && e.__esModule ? e : {default: e}
    }
    
    Object.defineProperty(t, "__esModule", {value: !0});
    var o, s = n(i(13)), r = function (e, t) {
      var i = 0, n = 0, o = window.innerHeight, r = {
        offset: e.getAttribute("data-aos-offset"),
        anchor: e.getAttribute("data-aos-anchor"),
        anchorPlacement: e.getAttribute("data-aos-anchor-placement")
      };
      switch (r.offset && !isNaN(r.offset) && (n = parseInt(r.offset)), r.anchor && document.querySelectorAll(r.anchor) && (e = document.querySelectorAll(r.anchor)[0]), i = (0, s.default)(e).top, r.anchorPlacement) {
        case"top-bottom":
          break;
        case"center-bottom":
          i += e.offsetHeight / 2;
          break;
        case"bottom-bottom":
          i += e.offsetHeight;
          break;
        case"top-center":
          i += o / 2;
          break;
        case"bottom-center":
          i += o / 2 + e.offsetHeight;
          break;
        case"center-center":
          i += o / 2 + e.offsetHeight / 2;
          break;
        case"top-top":
          i += o;
          break;
        case"bottom-top":
          i += e.offsetHeight + o;
          break;
        case"center-top":
          i += e.offsetHeight / 2 + o
      }
      return r.anchorPlacement || r.offset || isNaN(t) || (n = t), i + n
    };
    t.default = r
  }, function (e, t) {
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function (e) {
      for (var t = 0, i = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), i += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
      return {top: i, left: t}
    };
    t.default = i
  }, function (e, t) {
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function (e) {
      e = e || document.querySelectorAll("[data-aos]");
      var t = [];
      return [].forEach.call(e, function (e, i) {
        t.push({node: e})
      }), t
    };
    t.default = i
  }])
}), function (e) {
  var t = /<(\/?)(html|head|body|title|base|meta)(\s+[^>]*)?>/gi, i = "hd" + +new Date, n;
  e.htmlDoc = function (o) {
    var s = e(), r = o.replace(t, function (t, n, o, r) {
      var a = {};
      return n || (s = s.add("<" + o + "/>"), r && e.each(e("<div" + r + "/>")[0].attributes, function (e, t) {
        a[t.name] = t.value
      }), s.eq(-1).attr(a)), "<" + n + "div" + (n ? "" : ' id="' + i + (s.length - 1) + '"') + ">"
    });
    return s.length ? (n || (n = e("<div/>")), n.html(r), e.each(s, function (e) {
      var t = n.find("#" + i + e).before(s[e]);
      s.eq(e).html(t.contents()), t.remove()
    }), n.children().unwrap()) : e(o)
  }
}(jQuery), function (e, t, i) {
  function n(e, t) {
    return typeof e === t
  }
  
  function o() {
    var e, t, i, o, s, r, a;
    for (var l in w) if (w.hasOwnProperty(l)) {
      if (e = [], (t = w[l]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (i = 0; i < t.options.aliases.length; i++) e.push(t.options.aliases[i].toLowerCase());
      for (o = n(t.fn, "function") ? t.fn() : t.fn, s = 0; s < e.length; s++) 1 === (a = (r = e[s]).split(".")).length ? S[a[0]] = o : (!S[a[0]] || S[a[0]] instanceof Boolean || (S[a[0]] = new Boolean(S[a[0]])), S[a[0]][a[1]] = o), b.push((o ? "" : "no-") + a.join("-"))
    }
  }
  
  function s(e) {
    var t = x.className, i = S._config.classPrefix || "";
    if (T && (t = t.baseVal), S._config.enableJSClass) {
      var n = new RegExp("(^|\\s)" + i + "no-js(\\s|$)");
      t = t.replace(n, "$1" + i + "js$2")
    }
    S._config.enableClasses && (t += " " + i + e.join(" " + i), T ? x.className.baseVal = t : x.className = t)
  }
  
  function r(e) {
    return e.replace(/([a-z])-([a-z])/g, function (e, t, i) {
      return t + i.toUpperCase()
    }).replace(/^-/, "")
  }
  
  function a(e, t) {
    return !!~("" + e).indexOf(t)
  }
  
  function l(e) {
    return "function" != typeof t.createElement ? t.createElement(e) : T ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", e) : t.createElement.apply(t, arguments)
  }
  
  function c(e, t) {
    return function () {
      return e.apply(t, arguments)
    }
  }
  
  function d(e, t, i) {
    var o;
    for (var s in e) if (e[s] in t) return !1 === i ? e[s] : n(o = t[e[s]], "function") ? c(o, i || t) : o;
    return !1
  }
  
  function u(e) {
    return e.replace(/([A-Z])/g, function (e, t) {
      return "-" + t.toLowerCase()
    }).replace(/^ms-/, "-ms-")
  }
  
  function p(t, i, n) {
    var o;
    if ("getComputedStyle" in e) {
      o = getComputedStyle.call(e, t, i);
      var s = e.console;
      if (null !== o) n && (o = o.getPropertyValue(n)); else if (s) {
        var r;
        s[s.error ? "error" : "log"].call(s, "getComputedStyle returning null, its possible modernizr test results are inaccurate")
      }
    } else o = !i && t.currentStyle && t.currentStyle[n];
    return o
  }
  
  function f() {
    var e = t.body;
    return e || ((e = l(T ? "svg" : "body")).fake = !0), e
  }
  
  function h(e, i, n, o) {
    var s, r, a, c, d = "modernizr", u = l("div"), p = f();
    if (parseInt(n, 10)) for (; n--;) (a = l("div")).id = o ? o[n] : d + (n + 1), u.appendChild(a);
    return (s = l("style")).type = "text/css", s.id = "s" + d, (p.fake ? p : u).appendChild(s), p.appendChild(u), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(t.createTextNode(e)), u.id = d, p.fake && (p.style.background = "", p.style.overflow = "hidden", c = x.style.overflow, x.style.overflow = "hidden", x.appendChild(p)), r = i(u, e), p.fake ? (p.parentNode.removeChild(p), x.style.overflow = c, x.offsetHeight) : u.parentNode.removeChild(u), !!r
  }
  
  function m(t, n) {
    var o = t.length;
    if ("CSS" in e && "supports" in e.CSS) {
      for (; o--;) if (e.CSS.supports(u(t[o]), n)) return !0;
      return !1
    }
    if ("CSSSupportsRule" in e) {
      for (var s = []; o--;) s.push("(" + u(t[o]) + ":" + n + ")");
      return h("@supports (" + (s = s.join(" or ")) + ") { #modernizr { position: absolute; } }", function (e) {
        return "absolute" == p(e, null, "position")
      })
    }
    return i
  }
  
  function g(e, t, o, s) {
    function c() {
      u && (delete P.style, delete P.modElem)
    }
    
    if (s = !n(s, "undefined") && s, !n(o, "undefined")) {
      var d = m(e, o);
      if (!n(d, "undefined")) return d
    }
    for (var u, p, f, h, g, v = ["modernizr", "tspan", "samp"]; !P.style && v.length;) u = !0, P.modElem = l(v.shift()), P.style = P.modElem.style;
    for (f = e.length, p = 0; f > p; p++) if (h = e[p], g = P.style[h], a(h, "-") && (h = r(h)), P.style[h] !== i) {
      if (s || n(o, "undefined")) return c(), "pfx" != t || h;
      try {
        P.style[h] = o
      } catch (e) {
      }
      if (P.style[h] != g) return c(), "pfx" != t || h
    }
    return c(), !1
  }
  
  function v(e, t, i, o, s) {
    var r = e.charAt(0).toUpperCase() + e.slice(1), a = (e + " " + $.join(r + " ") + r).split(" ");
    return n(t, "string") || n(t, "undefined") ? g(a, t, o, s) : d(a = (e + " " + E.join(r + " ") + r).split(" "), t, i)
  }
  
  function y(e, t, n) {
    return v(e, i, i, t, n)
  }
  
  var b = [], w = [], k = {
    _version: "3.6.0",
    _config: {classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0},
    _q: [],
    on: function (e, t) {
      var i = this;
      setTimeout(function () {
        t(i[e])
      }, 0)
    },
    addTest: function (e, t, i) {
      w.push({name: e, fn: t, options: i})
    },
    addAsyncTest: function (e) {
      w.push({name: null, fn: e})
    }
  }, S = function () {
  };
  S.prototype = k, S = new S;
  var x = t.documentElement, T = "svg" === x.nodeName.toLowerCase(), C = "Moz O ms Webkit",
    $ = k._config.usePrefixes ? C.split(" ") : [];
  k._cssomPrefixes = $;
  var A = function (t) {
    var n, o = prefixes.length, s = e.CSSRule;
    if (void 0 === s) return i;
    if (!t) return !1;
    if ((n = (t = t.replace(/^@/, "")).replace(/-/g, "_").toUpperCase() + "_RULE") in s) return "@" + t;
    for (var r = 0; o > r; r++) {
      var a = prefixes[r], l;
      if (a.toUpperCase() + "_" + n in s) return "@-" + a.toLowerCase() + "-" + t
    }
    return !1
  };
  k.atRule = A;
  var E = k._config.usePrefixes ? C.toLowerCase().split(" ") : [];
  k._domPrefixes = E;
  var O = {elem: l("modernizr")};
  S._q.push(function () {
    delete O.elem
  });
  var P = {style: O.elem.style};
  S._q.unshift(function () {
    delete P.style
  }), k.testAllProps = v;
  var j = k.prefixed = function (e, t, i) {
    return 0 === e.indexOf("@") ? A(e) : (-1 != e.indexOf("-") && (e = r(e)), t ? v(e, t, i) : v(e, "pfx"))
  };
  S.addTest("objectfit", !!j("objectFit"), {aliases: ["object-fit"]}), k.testAllProps = y, S.addTest("backdropfilter", y("backdropFilter")), o(), s(b), delete k.addTest, delete k.addAsyncTest;
  for (var M = 0; M < S._q.length; M++) S._q[M]();
  e.Modernizr = S
}(window, document);
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
  Prism = function () {
    var e = /\blang(?:uage)?-([\w-]+)\b/i, t = 0, i = _self.Prism = {
      manual: _self.Prism && _self.Prism.manual,
      disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
      util: {
        encode: function (e) {
          return e instanceof n ? new n(e.type, i.util.encode(e.content), e.alias) : "Array" === i.util.type(e) ? e.map(i.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
        }, type: function (e) {
          return Object.prototype.toString.call(e).slice(8, -1)
        }, objId: function (e) {
          return e.__id || Object.defineProperty(e, "__id", {value: ++t}), e.__id
        }, clone: function (e, t) {
          var n = i.util.type(e);
          switch (t = t || {}, n) {
            case"Object":
              if (t[i.util.objId(e)]) return t[i.util.objId(e)];
              var o = {};
              for (var s in t[i.util.objId(e)] = o, e) e.hasOwnProperty(s) && (o[s] = i.util.clone(e[s], t));
              return o;
            case"Array":
              if (t[i.util.objId(e)]) return t[i.util.objId(e)];
              var o = [];
              return t[i.util.objId(e)] = o, e.forEach(function (e, n) {
                o[n] = i.util.clone(e, t)
              }), o
          }
          return e
        }
      },
      languages: {
        extend: function (e, t) {
          var n = i.util.clone(i.languages[e]);
          for (var o in t) n[o] = t[o];
          return n
        }, insertBefore: function (e, t, n, o) {
          var s = (o = o || i.languages)[e], r = {};
          for (var a in s) if (s.hasOwnProperty(a)) {
            if (a == t) for (var l in n) n.hasOwnProperty(l) && (r[l] = n[l]);
            n.hasOwnProperty(a) || (r[a] = s[a])
          }
          var c = o[e];
          return o[e] = r, i.languages.DFS(i.languages, function (t, i) {
            i === c && t != e && (this[t] = r)
          }), r
        }, DFS: function (e, t, n, o) {
          for (var s in o = o || {}, e) e.hasOwnProperty(s) && (t.call(e, s, e[s], n || s), "Object" !== i.util.type(e[s]) || o[i.util.objId(e[s])] ? "Array" !== i.util.type(e[s]) || o[i.util.objId(e[s])] || (o[i.util.objId(e[s])] = !0, i.languages.DFS(e[s], t, s, o)) : (o[i.util.objId(e[s])] = !0, i.languages.DFS(e[s], t, null, o)))
        }
      },
      plugins: {},
      highlightAll: function (e, t) {
        i.highlightAllUnder(document, e, t)
      },
      highlightAllUnder: function (e, t, n) {
        var o = {
          callback: n,
          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };
        i.hooks.run("before-highlightall", o);
        for (var s, r = o.elements || e.querySelectorAll(o.selector), a = 0; s = r[a++];) i.highlightElement(s, !0 === t, o.callback)
      },
      highlightElement: function (t, n, o) {
        for (var s, r, a = t; a && !e.test(a.className);) a = a.parentNode;
        a && (s = (a.className.match(e) || [, ""])[1].toLowerCase(), r = i.languages[s]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + s, t.parentNode && (a = t.parentNode, /pre/i.test(a.nodeName) && (a.className = a.className.replace(e, "").replace(/\s+/g, " ") + " language-" + s));
        var l, c = {element: t, language: s, grammar: r, code: t.textContent}, d = function (e) {
          c.highlightedCode = e, i.hooks.run("before-insert", c), c.element.innerHTML = c.highlightedCode, i.hooks.run("after-highlight", c), i.hooks.run("complete", c), o && o.call(c.element)
        };
        if (i.hooks.run("before-sanity-check", c), c.code) if (i.hooks.run("before-highlight", c), c.grammar) if (n && _self.Worker) {
          var u = new Worker(i.filename);
          u.onmessage = function (e) {
            d(e.data)
          }, u.postMessage(JSON.stringify({language: c.language, code: c.code, immediateClose: !0}))
        } else d(i.highlight(c.code, c.grammar, c.language)); else d(i.util.encode(c.code)); else i.hooks.run("complete", c)
      },
      highlight: function (e, t, o) {
        var s = {code: e, grammar: t, language: o};
        return i.hooks.run("before-tokenize", s), s.tokens = i.tokenize(s.code, s.grammar), i.hooks.run("after-tokenize", s), n.stringify(i.util.encode(s.tokens), s.language)
      },
      matchGrammar: function (e, t, n, o, s, r, a) {
        var l = i.Token;
        for (var c in n) if (n.hasOwnProperty(c) && n[c]) {
          if (c == a) return;
          var d = n[c];
          d = "Array" === i.util.type(d) ? d : [d];
          for (var u = 0; u < d.length; ++u) {
            var p = d[u], f = p.inside, h = !!p.lookbehind, m = !!p.greedy, g = 0, v = p.alias;
            if (m && !p.pattern.global) {
              var y = p.pattern.toString().match(/[imuy]*$/)[0];
              p.pattern = RegExp(p.pattern.source, y + "g")
            }
            p = p.pattern || p;
            for (var b = o, w = s; b < t.length; w += t[b].length, ++b) {
              var k = t[b];
              if (t.length > e.length) return;
              if (!(k instanceof l)) {
                if (m && b != t.length - 1) {
                  var S;
                  if (p.lastIndex = w, !(S = p.exec(e))) break;
                  for (var x = S.index + (h ? S[1].length : 0), T = S.index + S[0].length, C = b, $ = w, A = t.length; A > C && (T > $ || !t[C].type && !t[C - 1].greedy); ++C) x >= ($ += t[C].length) && (++b, w = $);
                  if (t[b] instanceof l) continue;
                  E = C - b, k = e.slice(w, $), S.index -= w
                } else {
                  p.lastIndex = 0;
                  var S = p.exec(k), E = 1
                }
                if (S) {
                  h && (g = S[1] ? S[1].length : 0);
                  var x, S, T = (x = S.index + g) + (S = S[0].slice(g)).length, O = k.slice(0, x), P = k.slice(T),
                    j = [b, E];
                  O && (++b, w += O.length, j.push(O));
                  var M = new l(c, f ? i.tokenize(S, f) : S, v, S, m);
                  if (j.push(M), P && j.push(P), Array.prototype.splice.apply(t, j), 1 != E && i.matchGrammar(e, t, n, b, w, !0, c), r) break
                } else if (r) break
              }
            }
          }
        }
      },
      tokenize: function (e, t) {
        var n = [e], o = t.rest;
        if (o) {
          for (var s in o) t[s] = o[s];
          delete t.rest
        }
        return i.matchGrammar(e, n, t, 0, 0, !1), n
      },
      hooks: {
        all: {}, add: function (e, t) {
          var n = i.hooks.all;
          n[e] = n[e] || [], n[e].push(t)
        }, run: function (e, t) {
          var n = i.hooks.all[e];
          if (n && n.length) for (var o, s = 0; o = n[s++];) o(t)
        }
      }
    }, n = i.Token = function (e, t, i, n, o) {
      this.type = e, this.content = t, this.alias = i, this.length = 0 | (n || "").length, this.greedy = !!o
    };
    if (n.stringify = function (e, t, o) {
      if ("string" == typeof e) return e;
      if ("Array" === i.util.type(e)) return e.map(function (i) {
        return n.stringify(i, t, e)
      }).join("");
      var s = {
        type: e.type,
        content: n.stringify(e.content, t, o),
        tag: "span",
        classes: ["token", e.type],
        attributes: {},
        language: t,
        parent: o
      };
      if (e.alias) {
        var r = "Array" === i.util.type(e.alias) ? e.alias : [e.alias];
        Array.prototype.push.apply(s.classes, r)
      }
      i.hooks.run("wrap", s);
      var a = Object.keys(s.attributes).map(function (e) {
        return e + '="' + (s.attributes[e] || "").replace(/"/g, "&quot;") + '"'
      }).join(" ");
      return "<" + s.tag + ' class="' + s.classes.join(" ") + '"' + (a ? " " + a : "") + ">" + s.content + "</" + s.tag + ">"
    }, !_self.document) return _self.addEventListener ? (i.disableWorkerMessageHandler || _self.addEventListener("message", function (e) {
      var t = JSON.parse(e.data), n = t.language, o = t.code, s = t.immediateClose;
      _self.postMessage(i.highlight(o, i.languages[n], n)), s && _self.close()
    }, !1), _self.Prism) : _self.Prism;
    var o = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
    return o && (i.filename = o.src, i.manual || o.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(i.highlightAll) : window.setTimeout(i.highlightAll, 16) : document.addEventListener("DOMContentLoaded", i.highlightAll))), _self.Prism
  }();
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism), Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: /<!DOCTYPE[\s\S]+?>/i,
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
    greedy: !0,
    inside: {
      tag: {pattern: /^<\/?[^\s>\/]+/i, inside: {punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/}},
      "attr-value": {
        pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
        inside: {punctuation: [/^=/, {pattern: /(^|[^\\])["']/, lookbehind: !0}]}
      },
      punctuation: /\/?>/,
      "attr-name": {pattern: /[^\s>\/]+/, inside: {namespace: /^[^\s>\/:]+:/}}
    }
  },
  entity: /&#?[\da-z]{1,8};/i
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.hooks.add("wrap", function (e) {
  "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"))
}), Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.css = {
  comment: /\/\*[\s\S]*?\*\//,
  atrule: {pattern: /@[\w-]+?[\s\S]*?(?:;|(?=\s*\{))/i, inside: {rule: /@[\w-]+/}},
  url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
  selector: /[^{}\s][^{};]*?(?=\s*\{)/,
  string: {pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0},
  property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
  important: /!important\b/i,
  function: /[-a-z0-9]+(?=\()/i,
  punctuation: /[(){};:,]/
}, Prism.languages.css.atrule.inside.rest = Prism.languages.css, Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
  style: {
    pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
    lookbehind: !0,
    inside: Prism.languages.css,
    alias: "language-css",
    greedy: !0
  }
}), Prism.languages.insertBefore("inside", "attr-value", {
  "style-attr": {
    pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
    inside: {
      "attr-name": {pattern: /^\s*style/i, inside: Prism.languages.markup.tag.inside},
      punctuation: /^\s*=\s*['"]|['"]\s*$/,
      "attr-value": {pattern: /.+/i, inside: Prism.languages.css}
    },
    alias: "language-css"
  }
}, Prism.languages.markup.tag)), Prism.languages.clike = {
  comment: [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: !0
  }, {pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0}],
  string: {pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0},
  "class-name": {
    pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
    lookbehind: !0,
    inside: {punctuation: /[.\\]/}
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/
}, Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [Prism.languages.clike["class-name"], {
    pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
    lookbehind: !0
  }],
  keyword: [{
    pattern: /((?:^|})\s*)(?:catch|finally)\b/,
    lookbehind: !0
  }, /\b(?:as|async|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/],
  number: /\b(?:(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+)n?|\d+n|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
  function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\(|\.(?:apply|bind|call)\()/,
  operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
    lookbehind: !0,
    greedy: !0
  },
  "function-variable": {
    pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
    alias: "function"
  },
  parameter: [{
    pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }, {
    pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
    inside: Prism.languages.javascript
  }, {
    pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }, {
    pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }],
  constant: /\b[A-Z][A-Z\d_]*\b/
}), Prism.languages.insertBefore("javascript", "string", {
  "template-string": {
    pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
    greedy: !0,
    inside: {
      interpolation: {
        pattern: /\${[^}]+}/,
        inside: {
          "interpolation-punctuation": {pattern: /^\${|}$/, alias: "punctuation"},
          rest: Prism.languages.javascript
        }
      }, string: /[\s\S]+/
    }
  }
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
  script: {
    pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
    lookbehind: !0,
    inside: Prism.languages.javascript,
    alias: "language-javascript",
    greedy: !0
  }
}), Prism.languages.js = Prism.languages.javascript, Prism.languages.json = {
  comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
  property: {pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: !0},
  string: {pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0},
  number: /-?\d+\.?\d*(e[+-]?\d+)?/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:true|false)\b/,
  null: {pattern: /\bnull\b/, alias: "keyword"}
}, Prism.languages.jsonp = Prism.languages.json, jQuery(document).ready(function (e) {
  function t(t) {
    t.each(function () {
      var t = e(this);
      e(window).scrollTop() + .5 * e(window).height() > t.offset().top && t.addClass("is-visible")
    }), a = !1
  }
  
  function i(t) {
    t.each(function () {
      var t = e(this);
      s(t.find('.cd-image-label[data-type="modified"]'), t.find(".cd-resize-img"), "left"), s(t.find('.cd-image-label[data-type="original"]'), t.find(".cd-resize-img"), "right")
    }), l = !1
  }
  
  function n(e, t, i, n, s) {
    e.on("mousedown vmousedown", function (a) {
      e.addClass("drag"), t.addClass("resizable");
      var l = e.outerWidth(), c = e.offset().left + l - a.pageX, d = i.offset().left, u = i.outerWidth(), p = d + 10,
        f = d + u - l - 10;
      e.parents().on("mousemove vmousemove", function (e) {
        r || (r = !0, window.requestAnimationFrame ? requestAnimationFrame(function () {
          o(e, c, l, p, f, d, u, t, n, s)
        }) : setTimeout(function () {
          o(e, c, l, p, f, d, u, t, n, s)
        }, 100))
      }).on("mouseup vmouseup", function (i) {
        e.removeClass("drag"), t.removeClass("resizable")
      }), a.preventDefault()
    }).on("mouseup vmouseup", function (i) {
      e.removeClass("drag"), t.removeClass("resizable")
    })
  }
  
  function o(t, i, n, o, a, l, c, d, u, p) {
    var f = t.pageX + i - n;
    f < o ? f = o : f > a && (f = a);
    var h = 100 * (f + n / 2 - l) / c + "%";
    e(".drag").css("left", h).on("mouseup vmouseup", function () {
      e(this).removeClass("drag"), d.removeClass("resizable")
    }), e(".resizable").css("width", h), s(p, d, "left"), s(u, d, "right"), r = !1
  }
  
  function s(e, t, i) {
    "left" == i ? e.offset().left + e.outerWidth() < t.offset().left + t.outerWidth() ? e.removeClass("is-hidden") : e.addClass("is-hidden") : e.offset().left > t.offset().left + t.outerWidth() ? e.removeClass("is-hidden") : e.addClass("is-hidden")
  }
  
  var r = !1, a = !1, l = !1, c = e(".cd-image-container");
  t(c), e(window).on("scroll", function () {
    a || (a = !0, window.requestAnimationFrame ? requestAnimationFrame(function () {
      t(c)
    }) : setTimeout(function () {
      t(c)
    }, 200))
  }), c.each(function () {
    var t = e(this);
    n(t.find(".cd-handle"), t.find(".cd-resize-img"), t, t.find('.cd-image-label[data-type="original"]'), t.find('.cd-image-label[data-type="modified"]'))
  }), e(window).on("resize", function () {
    l || (l = !0, window.requestAnimationFrame ? requestAnimationFrame(function () {
      i(c)
    }) : setTimeout(function () {
      i(c)
    }, 100))
  })
}), function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).cssVars = t()
}(this, function () {
  function e() {
    return (e = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
      }
      return e
    }).apply(this, arguments)
  }
  
  function t(e) {
    return function (e) {
      if (Array.isArray(e)) {
        for (var t = 0, i = new Array(e.length); t < e.length; t++) i[t] = e[t];
        return i
      }
    }(e) || function (e) {
      if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance")
    }()
  }
  
  function i(e, t) {
    function i(e) {
      return !("<" === (arguments.length > 0 && void 0 !== e ? e : "").trim().charAt(0))
    }
    
    function n(e, t) {
      r.onError(e, a[t], t)
    }
    
    function o(e, t) {
      var i = r.onSuccess(e, a[t], t);
      e = !1 === i ? "" : i || e, l[t] = e, -1 === l.indexOf(null) && r.onComplete(l)
    }
    
    var s = arguments.length > 1 && void 0 !== t ? t : {}, r = {
      mimeType: s.mimeType || null,
      onBeforeSend: s.onBeforeSend || Function.prototype,
      onSuccess: s.onSuccess || Function.prototype,
      onError: s.onError || Function.prototype,
      onComplete: s.onComplete || Function.prototype
    }, a = Array.isArray(e) ? e : [e], l = Array.apply(null, Array(a.length)).map(function (e) {
      return null
    }), c = document.createElement("a");
    a.forEach(function (e, t) {
      if (c.setAttribute("href", e), c.href = String(c.href), Boolean(document.all && !window.atob) && c.host.split(":")[0] !== location.host.split(":")[0]) if (c.protocol === location.protocol) {
        var s = new XDomainRequest;
        s.open("GET", e), s.timeout = 0, s.onprogress = Function.prototype, s.ontimeout = Function.prototype, s.onload = function () {
          i(s.responseText) ? o(s.responseText, t) : n(s, t)
        }, s.onerror = function (e) {
          n(s, t)
        }, setTimeout(function () {
          s.send()
        }, 0)
      } else console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(e, ")")), n(null, t); else {
        var a = new XMLHttpRequest;
        a.open("GET", e), r.mimeType && a.overrideMimeType && a.overrideMimeType(r.mimeType), r.onBeforeSend(a, e, t), a.onreadystatechange = function () {
          4 === a.readyState && (200 === a.status && i(a.responseText) ? o(a.responseText, t) : n(a, t))
        }, a.send()
      }
    })
  }
  
  function n(e) {
    function t() {
      if (-1 === c.indexOf(null)) {
        var e = c.join("");
        a.onComplete(e, c, l)
      }
    }
    
    function n(e, n, o, r) {
      var l = a.onSuccess(e, o, r);
      !function e(t, n, o, r, l, c) {
        var d = arguments.length > 4 && void 0 !== l ? l : [], u = arguments.length > 5 && void 0 !== c ? c : [],
          p = s(t, o, u);
        p.rules.length ? i(p.absoluteUrls, {
          onBeforeSend: function (e, t, i) {
            a.onBeforeSend(e, n, t)
          }, onSuccess: function (e, t, i) {
            var o = a.onSuccess(e, n, t), r = s(e = !1 === o ? "" : o || e, t, u);
            return r.rules.forEach(function (t, i) {
              e = e.replace(t, r.absoluteRules[i])
            }), e
          }, onError: function (i, s, a) {
            d.push({xhr: i, url: s}), u.push(p.rules[a]), e(t, n, o, r, d, u)
          }, onComplete: function (i) {
            i.forEach(function (e, i) {
              t = t.replace(p.rules[i], e)
            }), e(t, n, o, r, d, u)
          }
        }) : r(t, d)
      }(e = void 0 !== l && !1 === Boolean(l) ? "" : l || e, o, r, function (e, i) {
        null === c[n] && (i.forEach(function (e) {
          return a.onError(e.xhr, o, e.url)
        }), !a.filter || a.filter.test(e) ? c[n] = e : c[n] = "", t())
      })
    }
    
    function s(e, t, i) {
      var n = arguments.length > 2 && void 0 !== i ? i : [], s = {};
      return s.rules = (e.replace(r.cssComments, "").match(r.cssImports) || []).filter(function (e) {
        return -1 === n.indexOf(e)
      }), s.urls = s.rules.map(function (e) {
        return e.replace(r.cssImports, "$1")
      }), s.absoluteUrls = s.urls.map(function (e) {
        return o(e, t)
      }), s.absoluteRules = s.rules.map(function (e, i) {
        var n = s.urls[i], r = o(s.absoluteUrls[i], t);
        return e.replace(n, r)
      }), s
    }
    
    var r = {
      cssComments: /\/\*[\s\S]+?\*\//g,
      cssImports: /(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g
    }, a = {
      rootElement: e.rootElement || document,
      include: e.include || 'style,link[rel="stylesheet"]',
      exclude: e.exclude || null,
      filter: e.filter || null,
      useCSSOM: e.useCSSOM || !1,
      onBeforeSend: e.onBeforeSend || Function.prototype,
      onSuccess: e.onSuccess || Function.prototype,
      onError: e.onError || Function.prototype,
      onComplete: e.onComplete || Function.prototype
    }, l = Array.apply(null, a.rootElement.querySelectorAll(a.include)).filter(function (e) {
      return t = e, i = a.exclude, !(t.matches || t.matchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector).call(t, i);
      var t, i
    }), c = Array.apply(null, Array(l.length)).map(function (e) {
      return null
    });
    l.length ? l.forEach(function (e, s) {
      var r = e.getAttribute("href"), l = e.getAttribute("rel"),
        d = "LINK" === e.nodeName && r && l && "stylesheet" === l.toLowerCase(), u = "STYLE" === e.nodeName;
      if (d) i(r, {
        mimeType: "text/css", onBeforeSend: function (t, i, n) {
          a.onBeforeSend(t, e, i)
        }, onSuccess: function (t, i, a) {
          var l = o(r, location.href);
          n(t, s, e, l)
        }, onError: function (i, n, o) {
          c[s] = "", a.onError(i, e, n), t()
        }
      }); else if (u) {
        var p = e.textContent;
        a.useCSSOM && (p = Array.apply(null, e.sheet.cssRules).map(function (e) {
          return e.cssText
        }).join("")), n(p, s, e, location.href)
      } else c[s] = "", t()
    }) : a.onComplete("", [])
  }
  
  function o(e, t) {
    var i = arguments.length > 1 && void 0 !== t ? t : location.href,
      n = document.implementation.createHTMLDocument(""), o = n.createElement("base"), s = n.createElement("a");
    return n.head.appendChild(o), n.body.appendChild(s), o.href = i, s.href = e, s.href
  }
  
  function s(e, t, i) {
    e instanceof RegExp && (e = r(e, i)), t instanceof RegExp && (t = r(t, i));
    var n = a(e, t, i);
    return n && {
      start: n[0],
      end: n[1],
      pre: i.slice(0, n[0]),
      body: i.slice(n[0] + e.length, n[1]),
      post: i.slice(n[1] + t.length)
    }
  }
  
  function r(e, t) {
    var i = t.match(e);
    return i ? i[0] : null
  }
  
  function a(e, t, i) {
    var n, o, s, r, a, l = i.indexOf(e), c = i.indexOf(t, l + 1), d = l;
    if (l >= 0 && c > 0) {
      for (n = [], s = i.length; d >= 0 && !a;) d == l ? (n.push(d), l = i.indexOf(e, d + 1)) : 1 == n.length ? a = [n.pop(), c] : ((o = n.pop()) < s && (s = o, r = c), c = i.indexOf(t, d + 1)), d = l < c && l >= 0 ? l : c;
      n.length && (a = [s, r])
    }
    return a
  }
  
  function l(t, i) {
    function n(e) {
      throw new Error("CSS parse error: ".concat(e))
    }
    
    function o(e) {
      var i = e.exec(t);
      if (i) return t = t.slice(i[0].length), i
    }
    
    function s() {
      return o(/^{\s*/)
    }
    
    function r() {
      return o(/^}/)
    }
    
    function a() {
      o(/^\s*/)
    }
    
    function l() {
      if (a(), "/" === t[0] && "*" === t[1]) {
        for (var e = 2; t[e] && ("*" !== t[e] || "/" !== t[e + 1]);) e++;
        if (!t[e]) return n("end of comment is missing");
        var i = t.slice(2, e);
        return t = t.slice(e + 2), {type: "comment", comment: i}
      }
    }
    
    function c() {
      for (var e, t = []; e = l();) t.push(e);
      return y.removeComments ? [] : t
    }
    
    function d() {
      for (a(); "}" === t[0];) n("extra closing bracket");
      var e = o(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);
      if (e) return e[0].trim().replace(/\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*\/+/g, "").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (e) {
        return e.replace(/,/g, "‌")
      }).split(/\s*(?![^(]*\)),\s*/).map(function (e) {
        return e.replace(/\u200C/g, ",")
      })
    }
    
    function u() {
      o(/^([;\s]*)+/);
      var e = /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//g, t = o(/^(\*?[-#\/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
      if (t) {
        if (t = t[0].trim(), !o(/^:\s*/)) return n("property missing ':'");
        var i = o(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/),
          s = {type: "declaration", property: t.replace(e, ""), value: i ? i[0].replace(e, "").trim() : ""};
        return o(/^[;\s]*/), s
      }
    }
    
    function p() {
      if (!s()) return n("missing '{'");
      for (var e, t = c(); e = u();) t.push(e), t = t.concat(c());
      return r() ? t : n("missing '}'")
    }
    
    function h() {
      a();
      for (var e, t = []; e = o(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);) t.push(e[1]), o(/^,\s*/);
      if (t.length) return {type: "keyframe", values: t, declarations: p()}
    }
    
    function m() {
      if (a(), "@" === t[0]) {
        var e = function () {
          var e = o(/^@([-\w]+)?keyframes\s*/);
          if (e) {
            var t = e[1];
            if (!(e = o(/^([-\w]+)\s*/))) return n("@keyframes missing name");
            var i, a = e[1];
            if (!s()) return n("@keyframes missing '{'");
            for (var l = c(); i = h();) l.push(i), l = l.concat(c());
            return r() ? {type: "keyframes", name: a, vendor: t, keyframes: l} : n("@keyframes missing '}'")
          }
        }() || function () {
          var e = o(/^@supports *([^{]+)/);
          if (e) return {type: "supports", supports: e[1].trim(), rules: v()}
        }() || function () {
          if (o(/^@host\s*/)) return {type: "host", rules: v()}
        }() || function () {
          var e = o(/^@media *([^{]+)/);
          if (e) return {type: "media", media: e[1].trim(), rules: v()}
        }() || function () {
          var e = o(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
          if (e) return {type: "custom-media", name: e[1].trim(), media: e[2].trim()}
        }() || function () {
          if (o(/^@page */)) return {type: "page", selectors: d() || [], declarations: p()}
        }() || function () {
          var e = o(/^@([-\w]+)?document *([^{]+)/);
          if (e) return {type: "document", document: e[2].trim(), vendor: e[1] ? e[1].trim() : null, rules: v()}
        }() || function () {
          if (o(/^@font-face\s*/)) return {type: "font-face", declarations: p()}
        }() || function () {
          var e = o(/^@(import|charset|namespace)\s*([^;]+);/);
          if (e) return {type: e[1], name: e[2].trim()}
        }();
        if (e && y.onlyVars) {
          var i = !1;
          return (i = e.declarations ? e.declarations.some(function (e) {
            return /var\(/.test(e.value)
          }) : (e.keyframes || e.rules || []).some(function (e) {
            return (e.declarations || []).some(function (e) {
              return /var\(/.test(e.value)
            })
          })) ? e : {}
        }
        return e
      }
    }
    
    function g() {
      if (y.onlyVars) {
        var e = f("{", "}", t);
        if (e) {
          var i = -1 !== e.pre.indexOf(":root") && /--\S*\s*:/.test(e.body), o = /var\(/.test(e.body);
          if (!i && !o) return t = t.slice(e.end + 1), {}
        }
      }
      var s = d() || [], r = y.onlyVars ? p().filter(function (e) {
        var t = s.some(function (e) {
          return -1 !== e.indexOf(":root")
        }) && /^--\S/.test(e.property), i = /var\(/.test(e.value);
        return t || i
      }) : p();
      return s.length || n("selector missing"), {type: "rule", selectors: s, declarations: r}
    }
    
    function v(e) {
      if (!e && !s()) return n("missing '{'");
      for (var i, o = c(); t.length && (e || "}" !== t[0]) && (i = m() || g());) i.type && o.push(i), o = o.concat(c());
      return e || r() ? o : n("missing '}'")
    }
    
    var y = e({}, {onlyVars: !1, removeComments: !1}, arguments.length > 1 && void 0 !== i ? i : {});
    return {type: "stylesheet", stylesheet: {rules: v(!0), errors: []}}
  }
  
  function c(t, i) {
    var n, o, s = e({}, {
        fixNestedCalc: !0, onlyVars: !1, persist: !1, preserve: !1, variables: {}, onWarning: function () {
        }
      }, arguments.length > 1 && void 0 !== i ? i : {}),
      r = s.persist ? g.dom : g.temp = JSON.parse(JSON.stringify(g.dom)), a = l(t, {onlyVars: s.onlyVars});
    if (a.stylesheet.rules.forEach(function (e) {
      var t = [];
      if ("rule" === e.type && 1 === e.selectors.length && ":root" === e.selectors[0] && (e.declarations.forEach(function (e, i) {
        var n = e.property, o = e.value;
        n && 0 === n.indexOf(h) && (r[n] = o, t.push(i))
      }), !s.preserve)) for (var i = t.length - 1; i >= 0; i--) e.declarations.splice(t[i], 1)
    }), Object.keys(g.user).forEach(function (e) {
      r[e] = g.user[e]
    }), Object.keys(s.variables).length) {
      var c = {declarations: [], selectors: [":root"], type: "rule"};
      Object.keys(s.variables).forEach(function (e) {
        var t = "--".concat(e.replace(/^-+/, "")), i = s.variables[e];
        s.persist && (g.user[t] = i), r[t] !== i && (r[t] = i, c.declarations.push({
          type: "declaration",
          property: t,
          value: i
        }))
      }), s.preserve && c.declarations.length && a.stylesheet.rules.push(c)
    }
    return function e(t, i) {
      t.rules.forEach(function (n) {
        n.rules ? e(n, i) : n.keyframes ? n.keyframes.forEach(function (e) {
          "keyframe" === e.type && i(e.declarations, n)
        }) : n.declarations && i(n.declarations, t)
      })
    }(a.stylesheet, function (e, t) {
      for (var i, n, o, a = 0; a < e.length; a++) o = (i = e[a]).value, "declaration" === i.type && o && -1 !== o.indexOf(m + "(") && (n = d(o, r, s)) !== i.value && (s.preserve ? (e.splice(a, 0, {
        type: i.type,
        property: i.property,
        value: n
      }), a++) : i.value = n)
    }), s.fixNestedCalc && (n = a.stylesheet.rules, o = /(-[a-z]+-)?calc\(/, n.forEach(function (e) {
      e.declarations && e.declarations.forEach(function (e) {
        for (var t = e.value, i = ""; o.test(t);) {
          var n = f("calc(", ")", t || "");
          for (t = t.slice(n.end); o.test(n.body);) {
            var s = f(o, ")", n.body);
            n.body = "".concat(s.pre, "(").concat(s.body, ")").concat(s.post)
          }
          i += "".concat(n.pre, "calc(").concat(n.body), i += o.test(t) ? "" : ")".concat(n.post)
        }
        e.value = i || e.value
      })
    })), function (e, t, i) {
      function n(e) {
        for (var t = "", i = 0; i < e.length; i++) {
          var n = e[i];
          s && s(n);
          var a = r[n.type](n);
          a && (t += a, a.length && n.selectors && (t += o))
        }
        return t
      }
      
      var o = arguments.length > 1 && void 0 !== t ? t : "", s = arguments.length > 2 ? i : void 0, r = {
        charset: function (e) {
          return "@charset " + e.name + ";"
        }, comment: function (e) {
          return 0 === e.comment.indexOf("__CSSVARSPONYFILL") ? "/*" + e.comment + "*/" : ""
        }, "custom-media": function (e) {
          return "@custom-media " + e.name + " " + e.media + ";"
        }, declaration: function (e) {
          return e.property + ":" + e.value + ";"
        }, document: function (e) {
          return "@" + (e.vendor || "") + "document " + e.document + "{" + n(e.rules) + "}"
        }, "font-face": function (e) {
          return "@font-face{" + n(e.declarations) + "}"
        }, host: function (e) {
          return "@host{" + n(e.rules) + "}"
        }, import: function (e) {
          return "@import " + e.name + ";"
        }, keyframe: function (e) {
          return e.values.join(",") + "{" + n(e.declarations) + "}"
        }, keyframes: function (e) {
          return "@" + (e.vendor || "") + "keyframes " + e.name + "{" + n(e.keyframes) + "}"
        }, media: function (e) {
          return "@media " + e.media + "{" + n(e.rules) + "}"
        }, namespace: function (e) {
          return "@namespace " + e.name + ";"
        }, page: function (e) {
          return "@page " + (e.selectors.length ? e.selectors.join(", ") : "") + "{" + n(e.declarations) + "}"
        }, rule: function (e) {
          var t = e.declarations;
          if (t.length) return e.selectors.join(",") + "{" + n(t) + "}"
        }, supports: function (e) {
          return "@supports " + e.supports + "{" + n(e.rules) + "}"
        }
      };
      return n(e.stylesheet.rules)
    }(a)
  }
  
  function d(e, t, i, n) {
    var o = arguments.length > 2 && void 0 !== i ? i : {}, s = arguments.length > 3 ? n : void 0;
    if (-1 === e.indexOf("var(")) return e;
    var r = f("(", ")", e), a = "CSS transform warning:";
    return r ? "var" === r.pre.slice(-3) ? 0 === r.body.trim().length ? (o.onWarning("".concat(a, " var() must contain a non-whitespace string")), e) : r.pre.slice(0, -3) + function (e) {
      var i = e.split(",")[0].replace(/[\s\n\t]/g, ""), n = (e.match(/(?:\s*,\s*){1}(.*)?/) || [])[1],
        r = t.hasOwnProperty(i) ? String(t[i]) : void 0, l = r || (n ? String(n) : void 0), c = s || e;
      return r || o.onWarning("".concat(a, ' variable "').concat(i, '" is undefined')), l && "undefined" !== l && l.length > 0 ? d(l, t, o, c) : "var(".concat(c, ")")
    }(r.body) + d(r.post, t, o) : r.pre + "(".concat(d(r.body, t, o), ")") + d(r.post, t, o) : (-1 !== e.indexOf("var(") && o.onWarning("".concat(a, ' missing closing ")" in the value "').concat(e, '"')), e)
  }
  
  function u(i) {
    function o(e, t, i, n) {
      a.silent || console.error("".concat(e, "\n"), t), a.onError(e, t, i, n)
    }
    
    function s(e) {
      a.silent || console.warn(e), a.onWarning(e)
    }
    
    var r = arguments.length > 0 && void 0 !== i ? i : {}, a = e({}, w, r), l = v;
    if (a.exclude = "#".concat(l) + (a.exclude ? ",".concat(a.exclude) : ""), y) if ("loading" !== document.readyState) {
      var d = a.shadowDOM || a.rootElement.shadowRoot || a.rootElement.host;
      if (b && a.onlyLegacy) {
        if (a.updateDOM) {
          var f = a.rootElement.host || (a.rootElement === document ? document.documentElement : a.rootElement);
          Object.keys(a.variables).forEach(function (e) {
            var t = "--".concat(e.replace(/^-+/, "")), i = a.variables[e];
            f.style.setProperty(t, i)
          })
        }
      } else d && !x ? n({
        rootElement: w.rootElement,
        include: w.include,
        exclude: a.exclude,
        onSuccess: function (e, t, i) {
          return (e.match(k.cssRootRules) || []).join("") || !1
        },
        onComplete: function (e, t, i) {
          c(e, {persist: !0}), x = !0, u(a)
        }
      }) : (a.watch ? function (e, t) {
        if (window.MutationObserver) {
          var i = function (e) {
            return "LINK" === e.tagName && -1 !== (e.getAttribute("rel") || "").indexOf("stylesheet")
          }, n = function (e) {
            return "STYLE" === e.tagName && (!t || e.id !== t)
          }, o = null;
          S && S.disconnect(), e.watch = w.watch, (S = new MutationObserver(function (t) {
            var s = !1;
            t.forEach(function (t) {
              if ("attributes" === t.type) s = i(t.target) || n(t.target); else if ("childList" === t.type) {
                var r = Array.apply(null, t.addedNodes), a = Array.apply(null, t.removedNodes);
                s = [].concat(r, a).some(function (e) {
                  var t = i(e) && !e.disabled, o = n(e) && !e.disabled && k.cssVars.test(e.textContent);
                  return t || o
                })
              }
              s && (clearTimeout(o), o = setTimeout(function () {
                u(e)
              }, 1))
            })
          })).observe(document.documentElement, {
            attributes: !0,
            attributeFilter: ["disabled", "href"],
            childList: !0,
            subtree: !0
          })
        }
      }(a, l) : !1 === a.watch && S && S.disconnect(), n({
        rootElement: a.rootElement,
        include: a.include,
        exclude: a.exclude,
        filter: a.onlyVars ? k.cssVars : null,
        onBeforeSend: a.onBeforeSend,
        onSuccess: function (e, t, i) {
          var n = a.onSuccess(e, t, i);
          return e = void 0 !== n && !1 === Boolean(n) ? "" : n || e, a.updateURLs && (e.replace(k.cssComments, "").match(k.cssUrls) || []).forEach(function (t) {
            var n = t.replace(k.cssUrls, "$1"), o = p(n, i);
            e = e.replace(t, t.replace(n, o))
          }), e
        },
        onError: function (e, t, i) {
          var n = e.responseURL || p(i, location.href),
            s = e.statusText ? "(".concat(e.statusText, ")") : "Unspecified Error" + (0 === e.status ? " (possibly CORS related)" : "");
          o("CSS XHR Error: ".concat(n, " ").concat(e.status, " ").concat(s), t, e, n)
        },
        onComplete: function (i, n, r) {
          var d = null;
          i = n.map(function (e, t) {
            return k.cssVars.test(e) ? e : "/*__CSSVARSPONYFILL-".concat(t, "__*/")
          }).join("");
          try {
            i = c(i, {
              fixNestedCalc: a.fixNestedCalc,
              onlyVars: a.onlyVars,
              persist: a.updateDOM,
              preserve: a.preserve,
              variables: a.variables,
              onWarning: s
            });
            var p = k.cssKeyframes.test(i);
            if (i = i.replace(/\/\*__CSSVARSPONYFILL-(\d+)__\*\//g, function (e, t) {
              return n[t]
            }), a.updateDOM && r && r.length) {
              var f = r[r.length - 1];
              (d = a.rootElement.querySelector("#".concat(l)) || document.createElement("style")).setAttribute("id", l), d.textContent !== i && (d.textContent = i), f.nextSibling !== d && f.parentNode && f.parentNode.insertBefore(d, f.nextSibling), p && function (e) {
                var t = ["animation-name", "-moz-animation-name", "-webkit-animation-name"].filter(function (e) {
                  return getComputedStyle(document.body)[e]
                })[0];
                if (t) {
                  for (var i = e.getElementsByTagName("*"), n = [], o = 0, s = i.length; o < s; o++) {
                    var r = i[o], a;
                    "none" !== getComputedStyle(r)[t] && (r.style[t] += "__CSSVARSPONYFILL-KEYFRAMES__", n.push(r))
                  }
                  document.body.offsetHeight;
                  for (var l = 0, c = n.length; l < c; l++) {
                    var d = n[l].style;
                    d[t] = d[t].replace("__CSSVARSPONYFILL-KEYFRAMES__", "")
                  }
                }
              }(a.rootElement)
            }
          } catch (e) {
            var h = !1;
            n.forEach(function (e, t) {
              try {
                e = c(e, a)
              } catch (e) {
                var i = r[t - 0];
                h = !0, o(e.message, i)
              }
            }), h || o(e.message || e)
          }
          if (a.shadowDOM) for (var m, v = [a.rootElement].concat(t(a.rootElement.querySelectorAll("*"))), y = 0; m = v[y]; ++y) m.shadowRoot && m.shadowRoot.querySelector("style") && u(e({}, a, {
            rootElement: m.shadowRoot,
            variables: g.dom
          }));
          a.onComplete(i, d, JSON.parse(JSON.stringify(a.updateDOM ? g.dom : g.temp)))
        }
      }))
    } else document.addEventListener("DOMContentLoaded", function e(t) {
      u(r), document.removeEventListener("DOMContentLoaded", e)
    })
  }
  
  function p(e, t) {
    var i = arguments.length > 1 && void 0 !== t ? t : location.href,
      n = document.implementation.createHTMLDocument(""), o = n.createElement("base"), s = n.createElement("a");
    return n.head.appendChild(o), n.body.appendChild(s), o.href = i, s.href = e, s.href
  }
  
  var f = s;
  s.range = a;
  var h = "--", m = "var", g = {dom: {}, temp: {}, user: {}}, v = "css-vars-ponyfill", y = "undefined" != typeof window,
    b = y && window.CSS && window.CSS.supports && window.CSS.supports("(--a: 0)"), w = {
      rootElement: y ? document : null,
      include: "style,link[rel=stylesheet]",
      exclude: "",
      fixNestedCalc: !0,
      onlyLegacy: !0,
      onlyVars: !1,
      preserve: !1,
      shadowDOM: !1,
      silent: !1,
      updateDOM: !0,
      updateURLs: !0,
      variables: {},
      watch: null,
      onBeforeSend: function () {
      },
      onSuccess: function () {
      },
      onWarning: function () {
      },
      onError: function () {
      },
      onComplete: function () {
      }
    }, k = {
      cssComments: /\/\*[\s\S]+?\*\//g,
      cssKeyframes: /@(?:-\w*-)?keyframes/,
      cssRootRules: /(?::root\s*{\s*[^}]*})/g,
      cssUrls: /url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,
      cssVars: /(?:(?::root\s*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/
    }, S = null, x = !1;
  return u
}), function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], function (t) {
    return e(t)
  }) : "object" == typeof module && "object" == typeof module.exports ? exports = e(require("jquery")) : e(jQuery)
}(function (e) {
  function t(e) {
    var t = 7.5625, i = 2.75;
    return e < 1 / i ? t * e * e : e < 2 / i ? t * (e -= 1.5 / i) * e + .75 : e < 2.5 / i ? t * (e -= 2.25 / i) * e + .9375 : t * (e -= 2.625 / i) * e + .984375
  }
  
  e.easing.jswing = e.easing.swing;
  var i = Math.pow, n = Math.sqrt, o = Math.sin, s = Math.cos, r = Math.PI, a = 1.70158, l = 1.525 * a, c = a + 1,
    d = 2 * r / 3, u = 2 * r / 4.5;
  e.extend(e.easing, {
    def: "easeOutQuad", swing: function (t) {
      return e.easing[e.easing.def](t)
    }, easeInQuad: function (e) {
      return e * e
    }, easeOutQuad: function (e) {
      return 1 - (1 - e) * (1 - e)
    }, easeInOutQuad: function (e) {
      return e < .5 ? 2 * e * e : 1 - i(-2 * e + 2, 2) / 2
    }, easeInCubic: function (e) {
      return e * e * e
    }, easeOutCubic: function (e) {
      return 1 - i(1 - e, 3)
    }, easeInOutCubic: function (e) {
      return e < .5 ? 4 * e * e * e : 1 - i(-2 * e + 2, 3) / 2
    }, easeInQuart: function (e) {
      return e * e * e * e
    }, easeOutQuart: function (e) {
      return 1 - i(1 - e, 4)
    }, easeInOutQuart: function (e) {
      return e < .5 ? 8 * e * e * e * e : 1 - i(-2 * e + 2, 4) / 2
    }, easeInQuint: function (e) {
      return e * e * e * e * e
    }, easeOutQuint: function (e) {
      return 1 - i(1 - e, 5)
    }, easeInOutQuint: function (e) {
      return e < .5 ? 16 * e * e * e * e * e : 1 - i(-2 * e + 2, 5) / 2
    }, easeInSine: function (e) {
      return 1 - s(e * r / 2)
    }, easeOutSine: function (e) {
      return o(e * r / 2)
    }, easeInOutSine: function (e) {
      return -(s(r * e) - 1) / 2
    }, easeInExpo: function (e) {
      return 0 === e ? 0 : i(2, 10 * e - 10)
    }, easeOutExpo: function (e) {
      return 1 === e ? 1 : 1 - i(2, -10 * e)
    }, easeInOutExpo: function (e) {
      return 0 === e ? 0 : 1 === e ? 1 : e < .5 ? i(2, 20 * e - 10) / 2 : (2 - i(2, -20 * e + 10)) / 2
    }, easeInCirc: function (e) {
      return 1 - n(1 - i(e, 2))
    }, easeOutCirc: function (e) {
      return n(1 - i(e - 1, 2))
    }, easeInOutCirc: function (e) {
      return e < .5 ? (1 - n(1 - i(2 * e, 2))) / 2 : (n(1 - i(-2 * e + 2, 2)) + 1) / 2
    }, easeInElastic: function (e) {
      return 0 === e ? 0 : 1 === e ? 1 : -i(2, 10 * e - 10) * o((10 * e - 10.75) * d)
    }, easeOutElastic: function (e) {
      return 0 === e ? 0 : 1 === e ? 1 : i(2, -10 * e) * o((10 * e - .75) * d) + 1
    }, easeInOutElastic: function (e) {
      return 0 === e ? 0 : 1 === e ? 1 : e < .5 ? -i(2, 20 * e - 10) * o((20 * e - 11.125) * u) / 2 : i(2, -20 * e + 10) * o((20 * e - 11.125) * u) / 2 + 1
    }, easeInBack: function (e) {
      return c * e * e * e - a * e * e
    }, easeOutBack: function (e) {
      return 1 + c * i(e - 1, 3) + a * i(e - 1, 2)
    }, easeInOutBack: function (e) {
      return e < .5 ? i(2 * e, 2) * (7.189819 * e - l) / 2 : (i(2 * e - 2, 2) * ((l + 1) * (2 * e - 2) + l) + 2) / 2
    }, easeInBounce: function (e) {
      return 1 - t(1 - e)
    }, easeOutBounce: t, easeInOutBounce: function (e) {
      return e < .5 ? (1 - t(1 - 2 * e)) / 2 : (1 + t(2 * e - 1)) / 2
    }
  })
}), function (e) {
  function t() {
    var t = window.innerHeight, i = document.compatMode;
    return !i && e.support.boxModel || (t = "CSS1Compat" == i ? document.documentElement.clientHeight : document.body.clientHeight), t
  }
  
  e(window).scroll(function () {
    var i = t(), n = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop,
      o = [];
    e.each(e.cache, function () {
      this.events && this.events.inview && o.push(this.handle.elem)
    }), o.length && e(o).each(function () {
      var t = e(this), o = t.offset().top, s = t.height(), r = t.data("inview") || !1;
      n > o + s || n + i < o ? r && (t.data("inview", !1), t.trigger("inview", [!1])) : n < o + s && (r || (t.data("inview", !0), t.trigger("inview", [!0])))
    })
  }), e(function () {
    e(window).scroll()
  })
}(jQuery), function (e) {
  e.fn.counterUp = function (t) {
    var i = e.extend({time: 400, delay: 10}, t);
    return this.each(function () {
      var t = e(this), n = i, o = function () {
        var e = [], i = n.time / n.delay, o = t.text(), s = /[0-9]+,[0-9]+/.test(o);
        o = o.replace(/,/g, "");
        for (var r = /^[0-9]+$/.test(o), a = /^[0-9]+\.[0-9]+$/.test(o), l = a ? (o.split(".")[1] || []).length : 0, c = i; c >= 1; c--) {
          var d = parseInt(o / i * c);
          if (a && (d = parseFloat(o / i * c).toFixed(l)), s) for (; /(\d+)(\d{3})/.test(d.toString());) d = d.toString().replace(/(\d+)(\d{3})/, "$1,$2");
          e.unshift(d)
        }
        t.data("counterup-nums", e), t.text("0");
        var u = function () {
          t.text(t.data("counterup-nums").shift()), t.data("counterup-nums").length ? setTimeout(t.data("counterup-func"), n.delay) : (t.data("counterup-nums"), t.data("counterup-nums", null), t.data("counterup-func", null))
        };
        t.data("counterup-func", u), setTimeout(t.data("counterup-func"), n.delay)
      };
      t.waypoint(o, {offset: "100%", triggerOnce: !0})
    })
  }
}(jQuery);
var perlin, PERLIN_ZWRAPB, PERLIN_ZWRAP = 1 << (PERLIN_ZWRAPB = 8), PERLIN_SIZE = 4095, perlin_octaves = 4,
  perlin_amp_falloff = .5, scaled_cosine = function e(t) {
    return .5 * (1 - Math.cos(t * Math.PI))
  }, noise = function e(t) {
    if (null == perlin) {
      perlin = new Array(PERLIN_SIZE + 1);
      for (var i = 0; i < PERLIN_SIZE + 1; i++) perlin[i] = Math.random()
    }
    t < 0 && (t = -t);
    for (var n, o, s = Math.floor(t), r = t - s, a = 0, l = .5, c = 0; c < perlin_octaves; c++) n = scaled_cosine(r), o = perlin[s & PERLIN_SIZE], a += (o += n * (perlin[s + 1 & PERLIN_SIZE] - o)) * l, l *= perlin_amp_falloff, s <<= 1, (r *= 2) >= 1 && (s++, r--);
    return a
  }, floatingLogosBubbleData = [{s: .6, x: 1134, y: 45}, {s: .6, x: 1620, y: 271}, {s: .6, x: 1761, y: 372}, {
    s: .6,
    x: 2499,
    y: 79
  }, {s: .6, x: 2704, y: 334}, {s: .6, x: 2271, y: 356}, {s: .6, x: 795, y: 226}, {s: .6, x: 276, y: 256}, {
    s: .6,
    x: 1210,
    y: 365
  }, {s: .6, x: 444, y: 193}, {s: .6, x: 2545, y: 387}, {s: .8, x: 1303, y: 193}, {s: .8, x: 907, y: 88}, {
    s: .8,
    x: 633,
    y: 320
  }, {s: .8, x: 323, y: 60}, {s: .8, x: 129, y: 357}, {s: .8, x: 1440, y: 342}, {s: .8, x: 1929, y: 293}, {
    s: .8,
    x: 2135,
    y: 198
  }, {s: .8, x: 2276, y: 82}, {s: .8, x: 2654, y: 182}, {s: .8, x: 2783, y: 60}, {x: 1519, y: 118}, {
    x: 1071,
    y: 233
  }, {x: 1773, y: 148}, {x: 2098, y: 385}, {x: 2423, y: 244}, {x: 901, y: 385}, {x: 624, y: 111}, {
    x: 75,
    y: 103
  }, {x: 413, y: 367}, {x: 2895, y: 271}, {x: 1990, y: 75}];
window.VGNAnimationBubbleData = [{x: -1134, y: 45}, {x: -1620, y: 271}, {x: -980, y: 155}, {
  x: -1761,
  y: 372
}, {x: -2790, y: 387}, {x: -2539, y: 79}, {x: -2670, y: 314}, {x: -1240, y: 286}, {x: -2271, y: 327}, {
  x: -795,
  y: 226
}, {x: -276, y: 256}, {x: -700, y: 20}, {x: -1210, y: 365}, {x: -424, y: 183}, {x: -2545, y: 387}, {
  x: -1303,
  y: 183
}, {x: -907, y: 88}, {x: -633, y: 320}, {x: -2100, y: 258}, {x: -323, y: 60}, {x: -1500, y: 206}, {
  x: -129,
  y: 357
}, {x: -160, y: 160}, {x: -40, y: 220}, {x: -1929, y: 313}, {x: -2135, y: 198}, {x: -2020, y: 148}, {
  x: -2276,
  y: 82
}, {x: -2654, y: 182}, {x: -960, y: 305}, {x: -2783, y: 60}, {x: -2811, y: 118}, {x: -1519, y: 118}, {
  x: -2310,
  y: 148
}, {x: -1071, y: 233}, {x: -1250, y: 97}, {x: -1773, y: 148}, {x: -1500, y: 30}, {x: -2098, y: 385}, {
  x: -2600,
  y: 8
}, {x: -2423, y: 244}, {x: -1900, y: 20}, {x: -901, y: 385}, {x: -1810, y: 206}, {x: -624, y: 111}, {
  x: -1690,
  y: 70
}, {x: -75, y: 103}, {x: -2200, y: 20}, {x: -413, y: 367}, {x: -520, y: 256}, {x: -2895, y: 271}, {x: -1990, y: 75}];
var perlin, PERLIN_ZWRAPB, PERLIN_ZWRAP = 1 << (PERLIN_ZWRAPB = 8), PERLIN_SIZE = 4095, perlin_octaves = 4,
  perlin_amp_falloff = .5, scaled_cosine = function e(t) {
    return .5 * (1 - Math.cos(t * Math.PI))
  }, noise = function e(t) {
    if (null == perlin) {
      perlin = new Array(PERLIN_SIZE + 1);
      for (var i = 0; i < PERLIN_SIZE + 1; i++) perlin[i] = Math.random()
    }
    t < 0 && (t = -t);
    for (var n, o, s = Math.floor(t), r = t - s, a = 0, l = .5, c = 0; c < perlin_octaves; c++) n = scaled_cosine(r), o = perlin[s & PERLIN_SIZE], a += (o += n * (perlin[s + 1 & PERLIN_SIZE] - o)) * l, l *= perlin_amp_falloff, s <<= 1, (r *= 2) >= 1 && (s++, r--);
    return a
  };
!function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function (e) {
  var t = window.Slick || {};
  (t = function () {
    var t = 0;
    return function (i, n) {
      var o, s = this;
      s.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: e(i),
        appendDots: e(i),
        arrows: !0,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (t, i) {
          return e('<button type="button" />').text(i + 1)
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: .35,
        fade: !1,
        focusOnSelect: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3
      }, s.initials = {
        animating: !1,
        dragging: !1,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: !1,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: !1,
        slideOffset: 0,
        swipeLeft: null,
        swiping: !1,
        $list: null,
        touchObject: {},
        transformsEnabled: !1,
        unslicked: !1
      }, e.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.focussed = !1, s.interrupted = !1, s.hidden = "hidden", s.paused = !0, s.positionProp = null, s.respondTo = null, s.rowCount = 1, s.shouldClick = !0, s.$slider = e(i), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.visibilityChange = "visibilitychange", s.windowWidth = 0, s.windowTimer = null, o = e(i).data("slick") || {}, s.options = e.extend({}, s.defaults, n, o), s.currentSlide = s.options.initialSlide, s.originalSettings = s.options, void 0 !== document.mozHidden ? (s.hidden = "mozHidden", s.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (s.hidden = "webkitHidden", s.visibilityChange = "webkitvisibilitychange"), s.autoPlay = e.proxy(s.autoPlay, s), s.autoPlayClear = e.proxy(s.autoPlayClear, s), s.autoPlayIterator = e.proxy(s.autoPlayIterator, s), s.changeSlide = e.proxy(s.changeSlide, s), s.clickHandler = e.proxy(s.clickHandler, s), s.selectHandler = e.proxy(s.selectHandler, s), s.setPosition = e.proxy(s.setPosition, s), s.swipeHandler = e.proxy(s.swipeHandler, s), s.dragHandler = e.proxy(s.dragHandler, s), s.keyHandler = e.proxy(s.keyHandler, s), s.instanceUid = t++, s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.registerBreakpoints(), s.init(!0)
    }
  }()).prototype.activateADA = function () {
    this.$slideTrack.find(".slick-active").attr({"aria-hidden": "false"}).find("a, input, button, select").attr({tabindex: "0"})
  }, t.prototype.addSlide = t.prototype.slickAdd = function (t, i, n) {
    var o = this;
    if ("boolean" == typeof i) n = i, i = null; else if (i < 0 || i >= o.slideCount) return !1;
    o.unload(), "number" == typeof i ? 0 === i && 0 === o.$slides.length ? e(t).appendTo(o.$slideTrack) : n ? e(t).insertBefore(o.$slides.eq(i)) : e(t).insertAfter(o.$slides.eq(i)) : !0 === n ? e(t).prependTo(o.$slideTrack) : e(t).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function (t, i) {
      e(i).attr("data-slick-index", t)
    }), o.$slidesCache = o.$slides, o.reinit()
  }, t.prototype.animateHeight = function () {
    var e = this;
    if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
      var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
      e.$list.animate({height: t}, e.options.speed)
    }
  }, t.prototype.animateSlide = function (t, i) {
    var n = {}, o = this;
    o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (t = -t), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({left: t}, o.options.speed, o.options.easing, i) : o.$slideTrack.animate({top: t}, o.options.speed, o.options.easing, i) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), e({animStart: o.currentLeft}).animate({animStart: t}, {
      duration: o.options.speed,
      easing: o.options.easing,
      step: function (e) {
        e = Math.ceil(e), !1 === o.options.vertical ? (n[o.animType] = "translate(" + e + "px, 0px)", o.$slideTrack.css(n)) : (n[o.animType] = "translate(0px," + e + "px)", o.$slideTrack.css(n))
      },
      complete: function () {
        i && i.call()
      }
    })) : (o.applyTransition(), t = Math.ceil(t), !1 === o.options.vertical ? n[o.animType] = "translate3d(" + t + "px, 0px, 0px)" : n[o.animType] = "translate3d(0px," + t + "px, 0px)", o.$slideTrack.css(n), i && setTimeout(function () {
      o.disableTransition(), i.call()
    }, o.options.speed))
  }, t.prototype.getNavTarget = function () {
    var t = this, i = t.options.asNavFor;
    return i && null !== i && (i = e(i).not(t.$slider)), i
  }, t.prototype.asNavFor = function (t) {
    var i = this.getNavTarget();
    null !== i && "object" == typeof i && i.each(function () {
      var i = e(this).slick("getSlick");
      i.unslicked || i.slideHandler(t, !0)
    })
  }, t.prototype.applyTransition = function (e) {
    var t = this, i = {};
    !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
  }, t.prototype.autoPlay = function () {
    var e = this;
    e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
  }, t.prototype.autoPlayClear = function () {
    var e = this;
    e.autoPlayTimer && clearInterval(e.autoPlayTimer)
  }, t.prototype.autoPlayIterator = function () {
    var e = this, t = e.currentSlide + e.options.slidesToScroll;
    e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
  }, t.prototype.buildArrows = function () {
    var t = this;
    !0 === t.options.arrows && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
      "aria-disabled": "true",
      tabindex: "-1"
    }))
  }, t.prototype.buildDots = function () {
    var t, i, n = this;
    if (!0 === n.options.dots) {
      for (n.$slider.addClass("slick-dotted"), i = e("<ul />").addClass(n.options.dotsClass), t = 0; t <= n.getDotCount(); t += 1) i.append(e("<li />").append(n.options.customPaging.call(this, n, t)));
      n.$dots = i.appendTo(n.options.appendDots), n.$dots.find("li").first().addClass("slick-active")
    }
  }, t.prototype.buildOut = function () {
    var t = this;
    t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function (t, i) {
      e(i).attr("data-slick-index", t).data("originalStyling", e(i).attr("style") || "")
    }), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), !0 === t.options.draggable && t.$list.addClass("draggable")
  }, t.prototype.buildRows = function () {
    var e, t, i, n, o, s, r, a = this;
    if (n = document.createDocumentFragment(), s = a.$slider.children(), a.options.rows > 1) {
      for (r = a.options.slidesPerRow * a.options.rows, o = Math.ceil(s.length / r), e = 0; e < o; e++) {
        var l = document.createElement("div");
        for (t = 0; t < a.options.rows; t++) {
          var c = document.createElement("div");
          for (i = 0; i < a.options.slidesPerRow; i++) {
            var d = e * r + (t * a.options.slidesPerRow + i);
            s.get(d) && c.appendChild(s.get(d))
          }
          l.appendChild(c)
        }
        n.appendChild(l)
      }
      a.$slider.empty().append(n), a.$slider.children().children().children().css({
        width: 100 / a.options.slidesPerRow + "%",
        display: "inline-block"
      })
    }
  }, t.prototype.checkResponsive = function (t, i) {
    var n, o, s, r = this, a = !1, l = r.$slider.width(), c = window.innerWidth || e(window).width();
    if ("window" === r.respondTo ? s = c : "slider" === r.respondTo ? s = l : "min" === r.respondTo && (s = Math.min(c, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
      for (n in o = null, r.breakpoints) r.breakpoints.hasOwnProperty(n) && (!1 === r.originalSettings.mobileFirst ? s < r.breakpoints[n] && (o = r.breakpoints[n]) : s > r.breakpoints[n] && (o = r.breakpoints[n]));
      null !== o ? null !== r.activeBreakpoint ? (o !== r.activeBreakpoint || i) && (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[o]), !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t)), a = o) : (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[o]), !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t)), a = o) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t), a = o), t || !1 === a || r.$slider.trigger("breakpoint", [r, a])
    }
  }, t.prototype.changeSlide = function (t, i) {
    var n, o, s, r = this, a = e(t.currentTarget);
    switch (a.is("a") && t.preventDefault(), a.is("li") || (a = a.closest("li")), n = (s = r.slideCount % r.options.slidesToScroll != 0) ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, t.data.message) {
      case"previous":
        o = 0 === n ? r.options.slidesToScroll : r.options.slidesToShow - n, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, i);
        break;
      case"next":
        o = 0 === n ? r.options.slidesToScroll : n, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, i);
        break;
      case"index":
        var l = 0 === t.data.index ? 0 : t.data.index || a.index() * r.options.slidesToScroll;
        r.slideHandler(r.checkNavigable(l), !1, i), a.children().trigger("focus");
        break;
      default:
        return
    }
  }, t.prototype.checkNavigable = function (e) {
    var t, i;
    if (i = 0, e > (t = this.getNavigableIndexes())[t.length - 1]) e = t[t.length - 1]; else for (var n in t) {
      if (e < t[n]) {
        e = i;
        break
      }
      i = t[n]
    }
    return e
  }, t.prototype.cleanUpEvents = function () {
    var t = this;
    t.options.dots && null !== t.$dots && (e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)), !0 === t.options.accessibility && t.$dots.off("keydown.slick", t.keyHandler)), t.$slider.off("focus.slick blur.slick"), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow.off("keydown.slick", t.keyHandler))), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition)
  }, t.prototype.cleanUpSlideEvents = function () {
    var t = this;
    t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
  }, t.prototype.cleanUpRows = function () {
    var e, t = this;
    t.options.rows > 1 && ((e = t.$slides.children().children()).removeAttr("style"), t.$slider.empty().append(e))
  }, t.prototype.clickHandler = function (e) {
    !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
  }, t.prototype.destroy = function (t) {
    var i = this;
    i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), e(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
      e(this).attr("style", e(this).data("originalStyling"))
    }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, t || i.$slider.trigger("destroy", [i])
  }, t.prototype.disableTransition = function (e) {
    var t = this, i = {};
    i[t.transitionType] = "", !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
  }, t.prototype.fadeSlide = function (e, t) {
    var i = this;
    !1 === i.cssTransitions ? (i.$slides.eq(e).css({zIndex: i.options.zIndex}), i.$slides.eq(e).animate({opacity: 1}, i.options.speed, i.options.easing, t)) : (i.applyTransition(e), i.$slides.eq(e).css({
      opacity: 1,
      zIndex: i.options.zIndex
    }), t && setTimeout(function () {
      i.disableTransition(e), t.call()
    }, i.options.speed))
  }, t.prototype.fadeSlideOut = function (e) {
    var t = this;
    !1 === t.cssTransitions ? t.$slides.eq(e).animate({
      opacity: 0,
      zIndex: t.options.zIndex - 2
    }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
      opacity: 0,
      zIndex: t.options.zIndex - 2
    }))
  }, t.prototype.filterSlides = t.prototype.slickFilter = function (e) {
    var t = this;
    null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
  }, t.prototype.focusHandler = function () {
    var t = this;
    t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (i) {
      i.stopImmediatePropagation();
      var n = e(this);
      setTimeout(function () {
        t.options.pauseOnFocus && (t.focussed = n.is(":focus"), t.autoPlay())
      }, 0)
    })
  }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function () {
    return this.currentSlide
  }, t.prototype.getDotCount = function () {
    var e = this, t = 0, i = 0, n = 0;
    if (!0 === e.options.infinite) if (e.slideCount <= e.options.slidesToShow) ++n; else for (; t < e.slideCount;) ++n, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow; else if (!0 === e.options.centerMode) n = e.slideCount; else if (e.options.asNavFor) for (; t < e.slideCount;) ++n, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow; else n = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
    return n - 1
  }, t.prototype.getLeft = function (e) {
    var t, i, n, o = this, s = 0;
    return o.slideOffset = 0, i = o.$slides.first().outerHeight(!0), !0 === o.options.infinite ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, s = i * o.options.slidesToShow * -1), o.slideCount % o.options.slidesToScroll != 0 && e + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (e > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (e - o.slideCount)) * o.slideWidth * -1, s = (o.options.slidesToShow - (e - o.slideCount)) * i * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, s = o.slideCount % o.options.slidesToScroll * i * -1))) : e + o.options.slidesToShow > o.slideCount && (o.slideOffset = (e + o.options.slidesToShow - o.slideCount) * o.slideWidth, s = (e + o.options.slidesToShow - o.slideCount) * i), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, s = 0), !0 === o.options.centerMode && o.slideCount <= o.options.slidesToShow ? o.slideOffset = o.slideWidth * Math.floor(o.options.slidesToShow) / 2 - o.slideWidth * o.slideCount / 2 : !0 === o.options.centerMode && !0 === o.options.infinite ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : !0 === o.options.centerMode && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), t = !1 === o.options.vertical ? e * o.slideWidth * -1 + o.slideOffset : e * i * -1 + s, !0 === o.options.variableWidth && (n = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(e) : o.$slideTrack.children(".slick-slide").eq(e + o.options.slidesToShow), t = !0 === o.options.rtl ? n[0] ? -1 * (o.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, !0 === o.options.centerMode && (n = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(e) : o.$slideTrack.children(".slick-slide").eq(e + o.options.slidesToShow + 1), t = !0 === o.options.rtl ? n[0] ? -1 * (o.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, t += (o.$list.width() - n.outerWidth()) / 2)), t
  }, t.prototype.getOption = t.prototype.slickGetOption = function (e) {
    return this.options[e]
  }, t.prototype.getNavigableIndexes = function () {
    var e, t = this, i = 0, n = 0, o = [];
    for (!1 === t.options.infinite ? e = t.slideCount : (i = -1 * t.options.slidesToScroll, n = -1 * t.options.slidesToScroll, e = 2 * t.slideCount); i < e;) o.push(i), i = n + t.options.slidesToScroll, n += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
    return o
  }, t.prototype.getSlick = function () {
    return this
  }, t.prototype.getSlideCount = function () {
    var t, i, n = this;
    return i = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0, !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function (o, s) {
      if (s.offsetLeft - i + e(s).outerWidth() / 2 > -1 * n.swipeLeft) return t = s, !1
    }), Math.abs(e(t).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
  }, t.prototype.goTo = t.prototype.slickGoTo = function (e, t) {
    this.changeSlide({data: {message: "index", index: parseInt(e)}}, t)
  }, t.prototype.init = function (t) {
    var i = this;
    e(i.$slider).hasClass("slick-initialized") || (e(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), t && i.$slider.trigger("init", [i]), !0 === i.options.accessibility && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
  }, t.prototype.initADA = function () {
    var t = this, i = Math.ceil(t.slideCount / t.options.slidesToShow),
      n = t.getNavigableIndexes().filter(function (e) {
        return e >= 0 && e < t.slideCount
      });
    t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
      "aria-hidden": "true",
      tabindex: "-1"
    }).find("a, input, button, select").attr({tabindex: "-1"}), null !== t.$dots && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function (i) {
      var o = n.indexOf(i);
      e(this).attr({
        role: "tabpanel",
        id: "slick-slide" + t.instanceUid + i,
        tabindex: -1
      }), -1 !== o && e(this).attr({"aria-describedby": "slick-slide-control" + t.instanceUid + o})
    }), t.$dots.attr("role", "tablist").find("li").each(function (o) {
      var s = n[o];
      e(this).attr({role: "presentation"}), e(this).find("button").first().attr({
        role: "tab",
        id: "slick-slide-control" + t.instanceUid + o,
        "aria-controls": "slick-slide" + t.instanceUid + s,
        "aria-label": o + 1 + " of " + i,
        "aria-selected": null,
        tabindex: "-1"
      })
    }).eq(t.currentSlide).find("button").attr({"aria-selected": "true", tabindex: "0"}).end());
    for (var o = t.currentSlide, s = o + t.options.slidesToShow; o < s; o++) t.$slides.eq(o).attr("tabindex", 0);
    t.activateADA()
  }, t.prototype.initArrowEvents = function () {
    var e = this;
    !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {message: "previous"}, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {message: "next"}, e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)))
  }, t.prototype.initDotEvents = function () {
    var t = this;
    !0 === t.options.dots && (e("li", t.$dots).on("click.slick", {message: "index"}, t.changeSlide), !0 === t.options.accessibility && t.$dots.on("keydown.slick", t.keyHandler)), !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
  }, t.prototype.initSlideEvents = function () {
    var t = this;
    t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
  }, t.prototype.initializeEvents = function () {
    var t = this;
    t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {action: "start"}, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {action: "move"}, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {action: "end"}, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {action: "end"}, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(t.setPosition)
  }, t.prototype.initUI = function () {
    var e = this;
    !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
  }, t.prototype.keyHandler = function (e) {
    var t = this;
    e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({data: {message: !0 === t.options.rtl ? "next" : "previous"}}) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({data: {message: !0 === t.options.rtl ? "previous" : "next"}}))
  }, t.prototype.lazyLoad = function () {
    function t(t) {
      e("img[data-lazy]", t).each(function () {
        var t = e(this), i = e(this).attr("data-lazy"), n = e(this).attr("data-srcset"),
          o = e(this).attr("data-sizes") || s.$slider.attr("data-sizes"), r = document.createElement("img");
        r.onload = function () {
          t.animate({opacity: 0}, 100, function () {
            n && (t.attr("srcset", n), o && t.attr("sizes", o)), t.attr("src", i).animate({opacity: 1}, 200, function () {
              t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
            }), s.$slider.trigger("lazyLoaded", [s, t, i])
          })
        }, r.onerror = function () {
          t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, t, i])
        }, r.src = i
      })
    }
    
    var i, n, o, s = this;
    if (!0 === s.options.centerMode ? !0 === s.options.infinite ? o = (n = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2 : (n = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), o = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide) : (n = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, o = Math.ceil(n + s.options.slidesToShow), !0 === s.options.fade && (n > 0 && n--, o <= s.slideCount && o++)), i = s.$slider.find(".slick-slide").slice(n, o), "anticipated" === s.options.lazyLoad) for (var r = n - 1, a = o, l = s.$slider.find(".slick-slide"), c = 0; c < s.options.slidesToScroll; c++) r < 0 && (r = s.slideCount - 1), i = (i = i.add(l.eq(r))).add(l.eq(a)), r--, a++;
    t(i), s.slideCount <= s.options.slidesToShow ? t(s.$slider.find(".slick-slide")) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? t(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow)) : 0 === s.currentSlide && t(s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow))
  }, t.prototype.loadSlider = function () {
    var e = this;
    e.setPosition(), e.$slideTrack.css({opacity: 1}), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
  }, t.prototype.next = t.prototype.slickNext = function () {
    this.changeSlide({data: {message: "next"}})
  }, t.prototype.orientationChange = function () {
    var e = this;
    e.checkResponsive(), e.setPosition()
  }, t.prototype.pause = t.prototype.slickPause = function () {
    var e = this;
    e.autoPlayClear(), e.paused = !0
  }, t.prototype.play = t.prototype.slickPlay = function () {
    var e = this;
    e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
  }, t.prototype.postSlide = function (t) {
    var i = this;
    i.unslicked || (i.$slider.trigger("afterChange", [i, t]), i.animating = !1, i.slideCount > i.options.slidesToShow && i.setPosition(), i.swipeLeft = null, i.options.autoplay && i.autoPlay(), !0 === i.options.accessibility && (i.initADA(), i.options.autoplay || e(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()))
  }, t.prototype.prev = t.prototype.slickPrev = function () {
    this.changeSlide({data: {message: "previous"}})
  }, t.prototype.preventDefault = function (e) {
    e.preventDefault()
  }, t.prototype.progressiveLazyLoad = function (t) {
    t = t || 1;
    var i, n, o, s, r, a = this, l = e("img[data-lazy]", a.$slider);
    l.length ? (i = l.first(), n = i.attr("data-lazy"), o = i.attr("data-srcset"), s = i.attr("data-sizes") || a.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function () {
      o && (i.attr("srcset", o), s && i.attr("sizes", s)), i.attr("src", n).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === a.options.adaptiveHeight && a.setPosition(), a.$slider.trigger("lazyLoaded", [a, i, n]), a.progressiveLazyLoad()
    }, r.onerror = function () {
      t < 3 ? setTimeout(function () {
        a.progressiveLazyLoad(t + 1)
      }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, i, n]), a.progressiveLazyLoad())
    }, r.src = n) : a.$slider.trigger("allImagesLoaded", [a])
  }, t.prototype.refresh = function (t) {
    var i, n, o = this;
    n = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > n && (o.currentSlide = n), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), i = o.currentSlide, o.destroy(!0), e.extend(o, o.initials, {currentSlide: i}), o.init(), t || o.changeSlide({
      data: {
        message: "index",
        index: i
      }
    }, !1)
  }, t.prototype.registerBreakpoints = function () {
    var t, i, n, o = this, s = o.options.responsive || null;
    if ("array" === e.type(s) && s.length) {
      for (t in o.respondTo = o.options.respondTo || "window", s) if (n = o.breakpoints.length - 1, s.hasOwnProperty(t)) {
        for (i = s[t].breakpoint; n >= 0;) o.breakpoints[n] && o.breakpoints[n] === i && o.breakpoints.splice(n, 1), n--;
        o.breakpoints.push(i), o.breakpointSettings[i] = s[t].settings
      }
      o.breakpoints.sort(function (e, t) {
        return o.options.mobileFirst ? e - t : t - e
      })
    }
  }, t.prototype.reinit = function () {
    var t = this;
    t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
  }, t.prototype.resize = function () {
    var t = this;
    e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function () {
      t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
    }, 50))
  }, t.prototype.removeSlide = t.prototype.slickRemove = function (e, t, i) {
    var n = this;
    if (e = "boolean" == typeof e ? !0 === (t = e) ? 0 : n.slideCount - 1 : !0 === t ? --e : e, n.slideCount < 1 || e < 0 || e > n.slideCount - 1) return !1;
    n.unload(), !0 === i ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(e).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, n.reinit()
  }, t.prototype.setCSS = function (e) {
    var t, i, n = this, o = {};
    !0 === n.options.rtl && (e = -e), t = "left" == n.positionProp ? Math.ceil(e) + "px" : "0px", i = "top" == n.positionProp ? Math.ceil(e) + "px" : "0px", o[n.positionProp] = e, !1 === n.transformsEnabled ? n.$slideTrack.css(o) : (o = {}, !1 === n.cssTransitions ? (o[n.animType] = "translate(" + t + ", " + i + ")", n.$slideTrack.css(o)) : (o[n.animType] = "translate3d(" + t + ", " + i + ", 0px)", n.$slideTrack.css(o)))
  }, t.prototype.setDimensions = function () {
    var e = this;
    !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({padding: "0px " + e.options.centerPadding}) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({padding: e.options.centerPadding + " 0px"})), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
    var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
    !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
  }, t.prototype.setFade = function () {
    var t, i = this;
    i.$slides.each(function (n, o) {
      t = i.slideWidth * n * -1, !0 === i.options.rtl ? e(o).css({
        position: "relative",
        right: t,
        top: 0,
        zIndex: i.options.zIndex - 2,
        opacity: 0
      }) : e(o).css({position: "relative", left: t, top: 0, zIndex: i.options.zIndex - 2, opacity: 0})
    }), i.$slides.eq(i.currentSlide).css({zIndex: i.options.zIndex - 1, opacity: 1})
  }, t.prototype.setHeight = function () {
    var e = this;
    if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
      var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
      e.$list.css("height", t)
    }
  }, t.prototype.setOption = t.prototype.slickSetOption = function (t, i, n) {
    var o, s, r, a, l, c = this, d = !1;
    if ("object" === e.type(t) ? (r = t, d = i, l = "multiple") : "string" === e.type(t) && (r = t, a = i, d = n, "responsive" === t && "array" === e.type(i) ? l = "responsive" : void 0 !== i && (l = "single")), "single" === l) c.options[r] = a; else if ("multiple" === l) e.each(r, function (e, t) {
      c.options[e] = t
    }); else if ("responsive" === l) for (s in a) if ("array" !== e.type(c.options.responsive)) c.options.responsive = [a[s]]; else {
      for (o = c.options.responsive.length - 1; o >= 0;) c.options.responsive[o].breakpoint === a[s].breakpoint && c.options.responsive.splice(o, 1), o--;
      c.options.responsive.push(a[s])
    }
    d && (c.unload(), c.reinit())
  }, t.prototype.setPosition = function () {
    var e = this;
    e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
  }, t.prototype.setProps = function () {
    var e = this, t = document.body.style;
    e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
  }, t.prototype.setSlideClasses = function (e) {
    var t, i, n, o, s = this;
    i = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), s.$slides.eq(e).addClass("slick-current"), !0 === s.options.centerMode ? (t = Math.floor(s.options.slidesToShow / 2), !0 === s.options.infinite && (e >= t && e <= s.slideCount - 1 - t ? s.$slides.slice(e - t, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (n = s.options.slidesToShow + e, i.slice(n - t + 1, n + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : e === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center")), s.$slides.eq(e).addClass("slick-center")) : e >= 0 && e <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(e, e + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= s.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (o = s.slideCount % s.options.slidesToShow, n = !0 === s.options.infinite ? s.options.slidesToShow + e : e, s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - e < s.options.slidesToShow ? i.slice(n - (s.options.slidesToShow - o), n + o).addClass("slick-active").attr("aria-hidden", "false") : i.slice(n, n + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" !== s.options.lazyLoad && "anticipated" !== s.options.lazyLoad || s.lazyLoad()
  }, t.prototype.setupInfinite = function () {
    var t, i, n, o = this;
    if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (i = null, o.slideCount > o.options.slidesToShow)) {
      for (n = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, t = o.slideCount; t > o.slideCount - n; t -= 1) i = t - 1, e(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
      for (t = 0; t < n + o.slideCount; t += 1) i = t, e(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
      o.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
        e(this).attr("id", "")
      })
    }
  }, t.prototype.interrupt = function (e) {
    var t = this;
    e || t.autoPlay(), t.interrupted = e
  }, t.prototype.selectHandler = function (t) {
    var i = this, n = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
      o = parseInt(n.attr("data-slick-index"));
    o || (o = 0), i.slideCount <= i.options.slidesToShow ? i.slideHandler(o, !1, !0) : i.slideHandler(o)
  }, t.prototype.slideHandler = function (e, t, i) {
    var n, o, s, r, a, l = null, c = this;
    if (t = t || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === e)) if (!1 === t && c.asNavFor(e), n = e, l = c.getLeft(n), r = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? r : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (e < 0 || e > c.getDotCount() * c.options.slidesToScroll)) !1 === c.options.fade && (n = c.currentSlide, !0 !== i ? c.animateSlide(r, function () {
      c.postSlide(n)
    }) : c.postSlide(n)); else if (!1 === c.options.infinite && !0 === c.options.centerMode && (e < 0 || e > c.slideCount - c.options.slidesToScroll)) !1 === c.options.fade && (n = c.currentSlide, !0 !== i ? c.animateSlide(r, function () {
      c.postSlide(n)
    }) : c.postSlide(n)); else {
      if (c.options.autoplay && clearInterval(c.autoPlayTimer), o = n < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + n : n >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : n - c.slideCount : n, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, o]), s = c.currentSlide, c.currentSlide = o, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (a = (a = c.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== i ? (c.fadeSlideOut(s), c.fadeSlide(o, function () {
        c.postSlide(o)
      })) : c.postSlide(o), void c.animateHeight();
      !0 !== i ? c.animateSlide(l, function () {
        c.postSlide(o)
      }) : c.postSlide(o)
    }
  }, t.prototype.startLoad = function () {
    var e = this;
    !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
  }, t.prototype.swipeDirection = function () {
    var e, t, i, n, o = this;
    return e = o.touchObject.startX - o.touchObject.curX, t = o.touchObject.startY - o.touchObject.curY, i = Math.atan2(t, e), (n = Math.round(180 * i / Math.PI)) < 0 && (n = 360 - Math.abs(n)), n <= 45 && n >= 0 ? !1 === o.options.rtl ? "left" : "right" : n <= 360 && n >= 315 ? !1 === o.options.rtl ? "left" : "right" : n >= 135 && n <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? n >= 35 && n <= 135 ? "down" : "up" : "vertical"
  }, t.prototype.swipeEnd = function (e) {
    var t, i, n = this;
    if (n.dragging = !1, n.swiping = !1, n.scrolling) return n.scrolling = !1, !1;
    if (n.interrupted = !1, n.shouldClick = !(n.touchObject.swipeLength > 10), void 0 === n.touchObject.curX) return !1;
    if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
      switch (i = n.swipeDirection()) {
        case"left":
        case"down":
          t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(), n.currentDirection = 0;
          break;
        case"right":
        case"up":
          t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(), n.currentDirection = 1
      }
      "vertical" != i && (n.slideHandler(t), n.touchObject = {}, n.$slider.trigger("swipe", [n, i]))
    } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
  }, t.prototype.swipeHandler = function (e) {
    var t = this;
    if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
      case"start":
        t.swipeStart(e);
        break;
      case"move":
        t.swipeMove(e);
        break;
      case"end":
        t.swipeEnd(e)
    }
  }, t.prototype.swipeMove = function (e) {
    var t, i, n, o, s, r, a = this;
    return s = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!a.dragging || a.scrolling || s && 1 !== s.length) && (t = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== s ? s[0].pageX : e.clientX, a.touchObject.curY = void 0 !== s ? s[0].pageY : e.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && r > 4 ? (a.scrolling = !0, !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = r), i = a.swipeDirection(), void 0 !== e.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0, e.preventDefault()), o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), n = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (n = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = t + n * o : a.swipeLeft = t + n * (a.$list.height() / a.listWidth) * o, !0 === a.options.verticalSwiping && (a.swipeLeft = t + n * o), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
  }, t.prototype.swipeStart = function (e) {
    var t, i = this;
    if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return i.touchObject = {}, !1;
    void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, i.dragging = !0
  }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function () {
    var e = this;
    null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
  }, t.prototype.unload = function () {
    var t = this;
    e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
  }, t.prototype.unslick = function (e) {
    var t = this;
    t.$slider.trigger("unslick", [t, e]), t.destroy()
  }, t.prototype.updateArrows = function () {
    var e = this;
    Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
  }, t.prototype.updateDots = function () {
    var e = this;
    null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
  }, t.prototype.visibility = function () {
    var e = this;
    e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
  }, e.fn.slick = function (e) {
    var i, n, o = this, s = e, r = Array.prototype.slice.call(arguments, 1), a = o.length;
    for (i = 0; i < a; i++) if ("object" == typeof s || void 0 === s ? o[i].slick = new t(o[i], s) : n = o[i].slick[s].apply(o[i].slick, r), void 0 !== n) return n;
    return o
  }
}), function (e, t, i) {
  e(function () {
    function t() {
      Modernizr.objectfit || (e(".cover").each(function () {
        var t = e(this), i = t.find("img").prop("currentSrc");
        i && t.css("backgroundImage", "url(" + i + ")").addClass("compat-object-fit")
      }), e(".contain").each(function () {
        var t = e(this), i = t.find("img").prop("currentSrc");
        i && t.css("backgroundImage", "url(" + i + ")").addClass("contain-object-fit")
      })), p(), f(), a();
      var t = [], c = setInterval(function () {
        t.push(AOS.init({duration: 1200, offset: 0, once: !0})), t.length >= 2 && clearInterval(c)
      }, 1e3);
      if (m(), r(), l(), d(), i(), s(), h(), n(), o(), e(".third-party__companies")[0]) var u = new FloatingLogos({
        logos: window.logos,
        classPrefix: "third-party__companies__item",
        containerSelector: ".third-party__companies",
        containerWidth: 3e3,
        containerHeight: 460,
        maxShrink: 0,
        noiseSpeed: 55e-6,
        noiseScale: 80,
        scrollSpeed: .0175,
        introDelay: 1500,
        introDuration: 1500
      });
      if (e(".vgn__container")[0]) var g = new VGNAnimation({
        container: document.querySelector(".vgn__container"),
        bubbleNodes: bubbleNodes,
        classPrefix: "vgn__animation-node vgn__animation-node",
        containerWidth: 3e3,
        containerHeight: 500,
        noiseSpeed: 55e-6,
        noiseScale: 80,
        scrollSpeed: .0175,
        introDelay: 400,
        introDuration: 1100
      })
    }
    
    function i() {
      var t, i, n, o;
      e("li.mt-cookie-high").click(function () {
        jQuery(this).toggleClass("active"), e("li.mt-cookie-high").not(e(this)).removeClass("active")
      }), e(".hiw .tog-col-2-content li").click(function () {
        t = e(this).data("step"), e('.hiw li[data-step="' + t + '"]').addClass("active"), e(".hiw li").not('[data-step="' + t + '"]').removeClass("active")
      }), e(".legal-blocks > ul > li > div > h3").click(function () {
        e(this).closest("li").toggleClass("active"), i = e(this).closest("li"), e(".legal-blocks > ul > li").not(i).removeClass("active")
      }), e(".legal-blocks > ul > li > div article li > h4").click(function () {
        e(this).closest("li").toggleClass("active"), n = e(this).closest("li"), e(".legal-blocks > ul > li > div article li").not(n).removeClass("active")
      }), e(".faqs  ul  li  h4").click(function () {
        e(this).closest("li").toggleClass("active"), o = e(this).closest("li"), e(".faqs  ul  li").not(o).removeClass("active")
      })
    }
    
    function n() {
      setTimeout(function () {
        e("#scanner-animation").addClass("in-view")
      }, 5e3)
    }
    
    function o() {
      setTimeout(function () {
        e(".hero-devices-ipad-anim").addClass("anim-end")
      }, 6150)
    }
    
    function s() {
      e(".mt-cookie-manager-init").click(function () {
        e(".mt-cookie-manager").toggleClass("aos-animate")
      })
    }
    
    function r() {
      var t;
      e(".hero-content-visitors li").click(function () {
        t = e(this).data("tier"), e(".js-tier").not('[data-tier="' + t + '"]').removeClass("active"), e('.js-tier[data-tier="' + t + '"]').addClass("active")
      }), e("#checkbox1").change(function () {
        var t;
        t = e(".plans").offset().top - 150, e("html, body").animate({scrollTop: t}, 1400), document.getElementById("checkbox1").checked ? (e(".page-template-pricing").addClass("js-yearly"), e(".page-template-pricing").removeClass("js-monthly")) : (e(".page-template-pricing").removeClass("js-yearly"), e(".page-template-pricing").addClass("js-monthly"))
      })
    }
    
    function a() {
      var t;
      e(".mt-dev-tabs li").click(function () {
        t = e(this).data("tab"), console.log(t), e(this).addClass("active"), e(".mt-dev-tabs li").not('[data-tab="' + t + '"]').removeClass("active"), e(".mt-dev-view li").not('[data-tab="' + t + '"]').removeClass("active"), e('.mt-dev-view li[data-tab="' + t + '"]').addClass("active")
      })
    }

    function asdf() {
        e(".counter").each(function () {
          var t = e(this), i = t.attr("data-count");
          e({countNum: t.text()}).animate({countNum: i}, {
            duration: 5e3, easing: "easeInOutQuint", step: function () {
              t.text(Math.floor(this.countNum))
            }, complete: function () {
              t.text(this.countNum)
            }
          })
        })
    }

    function isInViewport(elem) {
      var bounding = elem.getBoundingClientRect();
      return (
          bounding.top >= 0 &&
          bounding.left >= 0 &&
          bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  };
    
    function l() {
      e("#stats").bind("inview", asdf)
      if (e("#stats")[0] && isInViewport(e("#stats")[0])) {
        asdf()
      }
    }
    
    function c() {
      e(function () {
        var i = e("#main"), n = e("html, body"), o = {
          debug: !0,
          prefetch: !0,
          cacheLength: 20,
          forms: ".wpcf",
          blacklist: ".no-smoothState",
          blacklist: ".js-chat",
          onStart: {
            duration: 1e3, render: function (t) {
              i.addClass("is-exiting"), setTimeout(function () {
                n.animate({scrollTop: 0})
              }, 600), s.restartCSSAnimations(), e("body").removeClass("open")
            }
          },
          onReady: {
            duration: 0, render: function (t, n) {
              var o, r, a, l;
              i.html(n);
              var l = s.href, r = s.cache[l].doc;
              o = e.htmlDoc(r), (a = {}).bodyId = o.find("body").attr("id"), a.bodyClasses = o.find("body").attr("class"), a.bodyCSS = o.find("body").attr("style"), e("body").removeClass().addClass(a.bodyClasses), e("body").attr("id", a.bodyId), e("body").attr("style", a.bodyCSS), dataLayer.push({
                event: "virtualPageView",
                virtualUrl: l
              })
            }
          },
          onAfter: function (e, n) {
            t(), setTimeout(function () {
              i.removeClass("is-exiting")
            }, 200)
          }
        }, s = i.smoothState(o).data("smoothState")
      }), function (e, t) {
        var i = !1, n = jQuery.fn.ready;
        e(function () {
          i = !0, e(document).ready()
        }), jQuery.fn.ready = function (t) {
          void 0 !== t ? (i && window.setTimeout(t, 1), e(document).bind("_is_ready", t)) : e(document).trigger("_is_ready")
        }
      }(jQuery), e(document).on("click", 'a[href*="#"]', function (t) {
        t.preventDefault(), e("html, body").animate({scrollTop: e(e.attr(this, "href")).offset().top - 100}, 500)
      })
    }
    
    function d() {
      e('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (t) {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
          var i = e(this.hash);
          (i = i.length ? i : e("[name=" + this.hash.slice(1) + "]")).length && (t.preventDefault(), $top = i.offset().top - 120, e("html, body").animate({scrollTop: $top}, 600, function () {
            var t = e(i);
            if (t.focus(), t.is(":focus")) return !1;
            t.attr("tabindex", "-1"), t.focus()
          }))
        }
      })
    }
    
    function u() {
      return e(window).width() < 739
    }
    
    function p() {
      e(".hamburger").click(function () {
        e("body").hasClass("open") ? (e("body").removeClass("open"), e(this).removeClass("is-active")) : (e("body").addClass("open"), e(this).addClass("is-active"))
      })
    }
    
    function f() {
      var t = 60;
      e(".header").headroom({
        offset: 60,
        tolerance: {up: 5, down: 0},
        classes: {
          initial: "headroom",
          pinned: "header--pinned",
          unpinned: "header--unpinned",
          top: "header--top",
          notTop: "header--not-top",
          bottom: "header--bottom",
          notBottom: "header--not-bottom"
        }
      })
    }
    
    function h() {
      e(".intro .js-slick")[0] && e(".intro .js-slick").slick({
        arrows: !1,
        dots: !0,
        autoplay: !1,
        draggable: !0,
        swipe: !0,
        touchMove: !0,
        fade: !1,
        infinite: !1,
        adaptiveHeight: !0,
        useCSS: !0,
        useTransform: !0,
        mobileFirst: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [{breakpoint: 768, settings: {slidesToShow: 3, slidesToScroll: 3}}]
      }), e(".clients")[0] && (e(".clients").slick({
        speed: 5e3,
        autoplay: !0,
        autoplaySpeed: 0,
        centerMode: !0,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: !0,
        infinite: !0,
        initialSlide: 2,
        arrows: !1,
        mobileFirst: !0,
        buttons: !1,
        draggable: !1,
        pauseOnHover: !1,
        responsive: [{
          breakpoint: 1023,
          settings: {centerMode: !1, variableWidth: !1, slidesToShow: 5, slidesToScroll: 5}
        }]
      }), e(".clients").addClass("active"))
    }
    
    function m() {
      if (e(".contact-map")[0]) {
        var t = e(".contact-map"), i, n;
        i = t.data("lat"), n = t.data("long");
        var o = {
            zoom: 16,
            disableDefaultUI: !0,
            center: new google.maps.LatLng(i, n),
            styles: [{
              featureType: "water",
              elementType: "geometry",
              stylers: [{color: "#e9e9e9"}, {lightness: 17}]
            }, {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{color: "#f5f5f5"}, {lightness: 20}]
            }, {
              featureType: "road.highway",
              elementType: "geometry.fill",
              stylers: [{color: "#ffffff"}, {lightness: 17}]
            }, {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{color: "#ffffff"}, {lightness: 29}, {weight: .2}]
            }, {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [{color: "#ffffff"}, {lightness: 18}]
            }, {
              featureType: "road.local",
              elementType: "geometry",
              stylers: [{color: "#ffffff"}, {lightness: 16}]
            }, {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{color: "#f5f5f5"}, {lightness: 21}]
            }, {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{color: "#dedede"}, {lightness: 21}]
            }, {
              elementType: "labels.text.stroke",
              stylers: [{visibility: "on"}, {color: "#ffffff"}, {lightness: 16}]
            }, {
              elementType: "labels.text.fill",
              stylers: [{saturation: 36}, {color: "#333333"}, {lightness: 40}]
            }, {elementType: "labels.icon", stylers: [{visibility: "off"}]}, {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{color: "#f2f2f2"}, {lightness: 19}]
            }, {
              featureType: "administrative",
              elementType: "geometry.fill",
              stylers: [{color: "#fefefe"}, {lightness: 20}]
            }, {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [{color: "#fefefe"}, {lightness: 17}, {weight: 1.2}]
            }]
          }, s = document.getElementById("map"), r = new google.maps.Map(s, o),
          a = new google.maps.Marker({position: new google.maps.LatLng(i, n), map: r, title: "Metomic"})
      }
    }
    
    e(document).ready(function () {
      if (t(), cssVars(), e("#inputForm")[0]) {
        function i(e) {
          var t = e.getBoundingClientRect(), i = t.top, n = t.bottom, o;
          return i >= 0 && n <= window.innerHeight
        }
        const t = e => {
          document.getElementById('ppm').style.visibility = 'visible'
          if (e < 1e4) {

            return "$25"
          };
          if (e > 1e6) {
            document.getElementById('ppm').style.visibility = 'hidden'
            return "Contact Us"
          }
          if (10001 <= e && e <= 25e3) return "$25";
          let t = 25, i = e - 25e4;
          return 250001 <= e && e <= 1e6 && (t = 137.5 + 1125e-7 * i), i = e - 1e5, 100001 <= e && e <= 25e4 && (t = 81.25 + 375e-6 * i, e -= 1e5), i = e - 25e3, 25001 <= e && e <= 1e5 && (t += 75e-5 * i), "$" + parseInt(Math.ceil(t))
        }
        
        const calc = function () {
          var i = e(this).val();
          console.log(t(i)), e("#custom-price").text(t(i)), i > 1e6 ? (e("#custom-price").addClass("contact"), e(".plans li:nth-child(2) .tog-button-standard").addClass("inactive"), e(".plans li:nth-child(2) .tog-button-contact").addClass("active")) : (e("#custom-price").removeClass("contact"), e(".plans li:nth-child(2) .tog-button-standard").removeClass("inactive"), e(".plans li:nth-child(2) .tog-button-contact").removeClass("active"))
        }
        
        calc.apply(e('#inputForm'))
        
        e("#inputForm").keyup(calc), window.onscroll = function (e) {
          var t = window.scrollY;
          i(document.getElementById("custom-price")) || document.getElementById("inputForm").blur()
        };
        
      }
    }), e(window).resize(function () {
    }), e(window).resize(function () {
      e("body").hasClass("open") && e(".hamburger").click()
    })
  })
}(jQuery, this);


console.log(`%c ___________________________________________________________________
| we're hiring engineers (and more!) https://metomic.io/careers     |
| help us fix the internet                                          |
 -------------------------------------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`, "font-family:monospace, font-size: 16px")