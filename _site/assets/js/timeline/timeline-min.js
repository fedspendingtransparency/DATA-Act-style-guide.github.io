/*
    TimelineJS - ver. 3.3.10 - 2015-12-02
    Copyright (c) 2012-2015 Northwestern University
    a project of the Northwestern University Knight Lab, originally created by Zach Wise
    https://github.com/NUKnightLab/TimelineJS3
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
    If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
function TL_Error(t, e) {
    this.name = "TL.Error", this.message = t || "error", this.message_key = this.message, this.detail = e || "";
    var i = new Error;
    i.hasOwnProperty("stack") && (this.stack = i.stack)
}! function(t) {
    t.TL = {
        VERSION: "0.1",
        _originalL: t.TL
    }
}(this), TL.debug = !1, TL.Bind = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }, trace = function(t) {
        TL.debug && (window.console ? console.log(t) : "undefined" != typeof jsTrace && jsTrace.send(t))
    }, TL_Error.prototype = Object.create(Error.prototype), TL_Error.prototype.constructor = TL_Error, TL.Error = TL_Error, TL.Util = {
        mergeData: function(t, e) {
            var i;
            for (i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
        },
        extend: function(t) {
            for (var e, i = Array.prototype.slice.call(arguments, 1), n = 0, a = i.length; a > n; n++) e = i[n] || {}, TL.Util.mergeData(t, e);
            return t
        },
        isEven: function(t) {
            return t == parseFloat(t) ? !(t % 2) : void 0
        },
        findArrayNumberByUniqueID: function(t, e, i, n) {
            for (var a = n || 0, s = 0; s < e.length; s++) e[s].data[i] == t && (a = s);
            return a
        },
        convertUnixTime: function(t) {
            var e, i, n, a, s, o, r = [],
                l = {
                    ymd: "",
                    time: "",
                    time_array: [],
                    date_array: [],
                    full_array: []
                };
            l.ymd = t.split(" ")[0], l.time = t.split(" ")[1], l.date_array = l.ymd.split("-"), l.time_array = l.time.split(":"), l.full_array = l.date_array.concat(l.time_array);
            for (var h = 0; h < l.full_array.length; h++) r.push(parseInt(l.full_array[h]));
            return e = new Date(r[0], r[1], r[2], r[3], r[4], r[5]), i = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], n = e.getFullYear(), a = i[e.getMonth()], s = e.getDate(), o = a + ", " + s + " " + n
        },
        setData: function(t, e) {
            t.data = TL.Util.extend({}, t.data, e), "" === t.data.unique_id && (t.data.unique_id = TL.Util.unique_ID(6))
        },
        stamp: function() {
            var t = 0,
                e = "_tl_id";
            return function(i) {
                return i[e] = i[e] || ++t, i[e]
            }
        }(),
        isArray: function() {
            if (Array.isArray) return Array.isArray;
            var t = Object.prototype.toString,
                e = t.call([]);
            return function(i) {
                return t.call(i) === e
            }
        }(),
        getRandomNumber: function(t) {
            return Math.floor(Math.random() * t)
        },
        unique_ID: function(t, e) {
            var i = function(t) {
                    return Math.floor(Math.random() * t)
                },
                n = function() {
                    var t = "abcdefghijklmnopqurstuvwxyz";
                    return t.substr(i(32), 1)
                },
                a = function(t) {
                    for (var e = "", i = 0; t > i; i++) e += n();
                    return e
                };
            return e ? e + "-" + a(t) : "tl-" + a(t)
        },
        ensureUniqueKey: function(t, e) {
            if (e || (e = TL.Util.unique_ID(6)), !(e in t)) return e;
            var i = e.match(/^(.+)(-\d+)?$/)[1],
                n = [];
            for (key in t) key.match(/^(.+?)(-\d+)?$/)[1] == i && n.push(key);
            e = i + "-" + (n.length + 1);
            for (var a = n.length; - 1 != n.indexOf(e); a++) e = i + "-" + a;
            return e
        },
        htmlify: function(t) {
            return t.match(/<p>[\s\S]*?<\/p>/) ? t : "<p>" + t + "</p>"
        },
        linkify: function(t) {
            var e = function(t, e, i) {
                    i || (i = "");
                    var n = 30;
                    return e && e.length > n && (e = e.substring(0, n) + "…"), i + "<a class='tl-makelink' href='" + t + "' onclick='void(0)'>" + e + "</a>"
                },
                i = /\b(?:https?|ftp):\/\/([a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|])/gim,
                n = /(^|[^\/>])(www\.[\S]+(\b|$))/gim,
                a = /([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/gim;
            return t.replace(i, function(t, i, n, a) {
                if (n > 0) {
                    var s = a[n - 1];
                    if ('"' == s || "'" == s || "=" == s) return t
                }
                return e(t, i)
            }).replace(n, function(t, i, n) {
                return e("http://" + n, n, i)
            }).replace(a, function(t, i) {
                return e("mailto:" + i, i)
            })
        },
        unlinkify: function(t) {
            return t ? (t = t.replace(/<a\b[^>]*>/i, ""), t = t.replace(/<\/a>/i, "")) : t
        },
        getParamString: function(t) {
            var e = [];
            for (var i in t) t.hasOwnProperty(i) && e.push(i + "=" + t[i]);
            return "?" + e.join("&")
        },
        formatNum: function(t, e) {
            var i = Math.pow(10, e || 5);
            return Math.round(t * i) / i
        },
        falseFn: function() {
            return !1
        },
        requestAnimFrame: function() {
            function t(t) {
                window.setTimeout(t, 1e3 / 60)
            }
            var e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || t;
            return function(i, n, a, s) {
                i = n ? TL.Util.bind(i, n) : i, a && e === t ? i() : e(i, s)
            }
        }(),
        bind: function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        },
        template: function(t, e) {
            return t.replace(/\{ *([\w_]+) *\}/g, function(t, i) {
                var n = e[i];
                if (!e.hasOwnProperty(i)) throw new TL.Error("template_value_err", t);
                return n
            })
        },
        hexToRgb: function(t) {
            TL.Util.css_named_colors[t.toLowerCase()] && (t = TL.Util.css_named_colors[t.toLowerCase()]);
            var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            t = t.replace(e, function(t, e, i, n) {
                return e + e + i + i + n + n
            });
            var i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
            return i ? {
                r: parseInt(i[1], 16),
                g: parseInt(i[2], 16),
                b: parseInt(i[3], 16)
            } : null
        },
        rgbToHex: function(t) {
            var e, i, n;
            if ("object" == typeof t) e = t.r, i = t.g, n = t.b;
            else if ("function" == typeof t.match) {
                var a = t.match(/^rgb\((\d+),(\d+),(\d+)\)$/);
                a && (e = a[1], i = a[2], n = a[3])
            }
            if (isNaN(e) || isNaN(n) || isNaN(i)) throw new TL.Error("invalid_rgb_err");
            return "#" + TL.Util.intToHexString(e) + TL.Util.intToHexString(i) + TL.Util.intToHexString(n)
        },
        colorObjToHex: function(t) {
            var e = [t.r, t.g, t.b];
            return TL.Util.rgbToHex("rgb(" + e.join(",") + ")")
        },
        css_named_colors: {
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#00ffff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000000",
            blanchedalmond: "#ffebcd",
            blue: "#0000ff",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#ff00ff",
            gainsboro: "#dcdcdc",
            ghostwhite: "#f8f8ff",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgray: "#d3d3d3",
            lightgreen: "#90ee90",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#778899",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            limegreen: "#32cd32",
            linen: "#faf0e6",
            magenta: "#ff00ff",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370db",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdf5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#db7093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            rebeccapurple: "#663399",
            red: "#ff0000",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            skyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#ffffff",
            whitesmoke: "#f5f5f5",
            yellow: "#ffff00",
            yellowgreen: "#9acd32"
        },
        ratio: {
            square: function(t) {
                var e = {
                    w: 0,
                    h: 0
                };
                return t.w > t.h && t.h > 0 ? (e.h = t.h, e.w = t.h) : (e.w = t.w, e.h = t.w), e
            },
            r16_9: function(t) {
                return null !== t.w && "" !== t.w ? Math.round(t.w / 16 * 9) : null !== t.h && "" !== t.h ? Math.round(t.h / 9 * 16) : 0
            },
            r4_3: function(t) {
                return null !== t.w && "" !== t.w ? Math.round(t.w / 4 * 3) : null !== t.h && "" !== t.h ? Math.round(t.h / 3 * 4) : void 0
            }
        },
        getObjectAttributeByIndex: function(t, e) {
            if ("undefined" != typeof t) {
                var i = 0;
                for (var n in t) {
                    if (e === i) return t[n];
                    i++
                }
                return ""
            }
            return ""
        },
        getUrlVars: function(t) {
            var e, i, n, a = [];
            e = t.toString(), e.match("&#038;") ? e = e.replace("&#038;", "&") : e.match("&#38;") ? e = e.replace("&#38;", "&") : e.match("&amp;") && (e = e.replace("&amp;", "&")), n = e.slice(e.indexOf("?") + 1).split("&");
            for (var s = 0; s < n.length; s++) i = n[s].split("="), a.push(i[0]), a[i[0]] = i[1];
            return a
        },
        trim: function(t) {
            return t && "function" == typeof t.replace ? t.replace(/^\s+|\s+$/g, "") : ""
        },
        slugify: function(t) {
            t = TL.Util.trim(t), t = t.toLowerCase();
            for (var e = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;", i = "aaaaaeeeeeiiiiooooouuuunc------", n = 0, a = e.length; a > n; n++) t = t.replace(new RegExp(e.charAt(n), "g"), i.charAt(n));
            return t = t.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-"), t = t.replace(/^([0-9])/, "_$1")
        },
        maxDepth: function(t) {
            for (var e = [], i = 0, n = 0; n < t.length; n++) {
                if (e.push(t[n]), e.length > 1) {
                    for (var a = e[e.length - 1], s = -1, o = 0; o < e.length - 1; o++) e[o][1] < a[0] && (s = o);
                    s >= 0 && (e = e.slice(s + 1))
                }
                e.length > i && (i = e.length)
            }
            return i
        },
        pad: function(t, e) {
            for (t = String(t), e = e || 2; t.length < e;) t = "0" + t;
            return t
        },
        intToHexString: function(t) {
            return TL.Util.pad(parseInt(t, 10).toString(16))
        },
        findNextGreater: function(t, e, i) {
            for (var n = 0; n < t.length; n++)
                if (e < t[n]) return t[n];
            return i ? i : e
        },
        findNextLesser: function(t, e, i) {
            for (var n = t.length - 1; n >= 0; n--)
                if (e > t[n]) return t[n];
            return i ? i : e
        },
        isEmptyObject: function(t) {
            var e = [];
            if (Object.keys) e = Object.keys(t);
            else
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && e.push(i);
            for (var n = 0; n < e.length; n++) {
                var a = e[n];
                if (null != t[a] && "string" != typeof t[a]) return !1;
                if (0 != TL.Util.trim(t[a]).length) return !1
            }
            return !0
        },
        parseYouTubeTime: function(t) {
            if ("string" == typeof t) {
                if (parts = t.match(/^\s*(\d+h)?(\d+m)?(\d+s)?\s*/i)) {
                    var e = parseInt(parts[1]) || 0,
                        i = parseInt(parts[2]) || 0,
                        n = parseInt(parts[3]) || 0;
                    return n + 60 * i + 60 * e * 60
                }
            } else if ("number" == typeof t) return t;
            return 0
        },
        transformImageURL: function(t) {
            return t.replace(/(.*)www.dropbox.com\/(.*)/, "$1dl.dropboxusercontent.com/$2")
        },
        base58: function(t) {
            var e = t || "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
                i = e.length;
            return {
                encode: function(t) {
                    if ("number" != typeof t || t !== parseInt(t)) throw '"encode" only accepts integers.';
                    for (var n = ""; t;) {
                        var a = t % i;
                        t = Math.floor(t / i), n = e[a].toString() + n
                    }
                    return n
                },
                decode: function(t) {
                    if ("string" != typeof t) throw '"decode" only accepts strings.';
                    for (var n = 0; t;) {
                        var a = e.indexOf(t[0]);
                        if (0 > a) throw '"decode" can\'t find "' + t[0] + '" in the alphabet: "' + e + '"';
                        var s = t.length - 1;
                        n += a * Math.pow(i, s), t = t.substring(1)
                    }
                    return n
                }
            }
        }()
    },
    function(t) {
        var e = function() {
            function t(t) {
                return null == t ? String(t) : Y[Z.call(t)] || "object"
            }

            function e(e) {
                return "function" == t(e)
            }

            function i(t) {
                return null != t && t == t.window
            }

            function n(t) {
                return null != t && t.nodeType == t.DOCUMENT_NODE
            }

            function a(e) {
                return "object" == t(e)
            }

            function s(t) {
                return a(t) && !i(t) && Object.getPrototypeOf(t) == Object.prototype
            }

            function o(t) {
                return "number" == typeof t.length
            }

            function r(t) {
                return E.call(t, function(t) {
                    return null != t
                })
            }

            function l(t) {
                return t.length > 0 ? $.fn.concat.apply([], t) : t
            }

            function h(t) {
                return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
            }

            function d(t) {
                return t in C ? C[t] : C[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
            }

            function c(t, e) {
                return "number" != typeof e || I[h(t)] ? e : e + "px"
            }

            function u(t) {
                var e, i;
                return N[t] || (e = S.createElement(t), S.body.appendChild(e), i = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == i && (i = "block"), N[t] = i), N[t]
            }

            function m(t) {
                return "children" in t ? M.call(t.children) : $.map(t.childNodes, function(t) {
                    return 1 == t.nodeType ? t : void 0
                })
            }

            function _(t, e, i) {
                for (w in e) i && (s(e[w]) || X(e[w])) ? (s(e[w]) && !s(t[w]) && (t[w] = {}), X(e[w]) && !X(t[w]) && (t[w] = []), _(t[w], e[w], i)) : e[w] !== L && (t[w] = e[w])
            }

            function f(t, e) {
                return null == e ? $(t) : $(t).filter(e)
            }

            function p(t, i, n, a) {
                return e(i) ? i.call(t, n, a) : i
            }

            function g(t, e, i) {
                null == i ? t.removeAttribute(e) : t.setAttribute(e, i)
            }

            function v(t, e) {
                var i = t.className,
                    n = i && i.baseVal !== L;
                return e === L ? n ? i.baseVal : i : void(n ? i.baseVal = e : t.className = e)
            }

            function y(t) {
                var e;
                try {
                    return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? $.parseJSON(t) : t : e) : t
                } catch (i) {
                    return t
                }
            }

            function T(t, e) {
                e(t);
                for (var i in t.childNodes) T(t.childNodes[i], e)
            }
            var L, w, $, b, x, k, D = [],
                M = D.slice,
                E = D.filter,
                S = window.document,
                N = {},
                C = {},
                I = {
                    "column-count": 1,
                    columns: 1,
                    "font-weight": 1,
                    "line-height": 1,
                    opacity: 1,
                    "z-index": 1,
                    zoom: 1
                },
                A = /^\s*<(\w+|!)[^>]*>/,
                U = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                j = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                O = /^(?:body|html)$/i,
                P = /([A-Z])/g,
                z = ["val", "css", "html", "text", "data", "width", "height", "offset"],
                B = ["after", "prepend", "before", "append"],
                R = S.createElement("table"),
                q = S.createElement("tr"),
                H = {
                    tr: S.createElement("tbody"),
                    tbody: R,
                    thead: R,
                    tfoot: R,
                    td: q,
                    th: q,
                    "*": S.createElement("div")
                },
                F = /complete|loaded|interactive/,
                W = /^[\w-]*$/,
                Y = {},
                Z = Y.toString,
                G = {},
                J = S.createElement("div"),
                V = {
                    tabindex: "tabIndex",
                    readonly: "readOnly",
                    "for": "htmlFor",
                    "class": "className",
                    maxlength: "maxLength",
                    cellspacing: "cellSpacing",
                    cellpadding: "cellPadding",
                    rowspan: "rowSpan",
                    colspan: "colSpan",
                    usemap: "useMap",
                    frameborder: "frameBorder",
                    contenteditable: "contentEditable"
                },
                X = Array.isArray || function(t) {
                    return t instanceof Array
                };
            return G.matches = function(t, e) {
                if (!e || !t || 1 !== t.nodeType) return !1;
                var i = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
                if (i) return i.call(t, e);
                var n, a = t.parentNode,
                    s = !a;
                return s && (a = J).appendChild(t), n = ~G.qsa(a, e).indexOf(t), s && J.removeChild(t), n
            }, x = function(t) {
                return t.replace(/-+(.)?/g, function(t, e) {
                    return e ? e.toUpperCase() : ""
                })
            }, k = function(t) {
                return E.call(t, function(e, i) {
                    return t.indexOf(e) == i
                })
            }, G.fragment = function(t, e, i) {
                var n, a, o;
                return U.test(t) && (n = $(S.createElement(RegExp.$1))), n || (t.replace && (t = t.replace(j, "<$1></$2>")), e === L && (e = A.test(t) && RegExp.$1), e in H || (e = "*"), o = H[e], o.innerHTML = "" + t, n = $.each(M.call(o.childNodes), function() {
                    o.removeChild(this)
                })), s(i) && (a = $(n), $.each(i, function(t, e) {
                    z.indexOf(t) > -1 ? a[t](e) : a.attr(t, e)
                })), n
            }, G.Z = function(t, e) {
                return t = t || [], t.__proto__ = $.fn, t.selector = e || "", t
            }, G.isZ = function(t) {
                return t instanceof G.Z
            }, G.init = function(t, i) {
                var n;
                if (!t) return G.Z();
                if ("string" == typeof t)
                    if (t = t.trim(), "<" == t[0] && A.test(t)) n = G.fragment(t, RegExp.$1, i), t = null;
                    else {
                        if (i !== L) return $(i).find(t);
                        n = G.qsa(S, t)
                    } else {
                    if (e(t)) return $(S).ready(t);
                    if (G.isZ(t)) return t;
                    if (X(t)) n = r(t);
                    else if (a(t)) n = [t], t = null;
                    else if (A.test(t)) n = G.fragment(t.trim(), RegExp.$1, i), t = null;
                    else {
                        if (i !== L) return $(i).find(t);
                        n = G.qsa(S, t)
                    }
                }
                return G.Z(n, t)
            }, $ = function(t, e) {
                return G.init(t, e)
            }, $.extend = function(t) {
                var e, i = M.call(arguments, 1);
                return "boolean" == typeof t && (e = t, t = i.shift()), i.forEach(function(i) {
                    _(t, i, e)
                }), t
            }, G.qsa = function(t, e) {
                var i, a = "#" == e[0],
                    s = !a && "." == e[0],
                    o = a || s ? e.slice(1) : e,
                    r = W.test(o);
                return n(t) && r && a ? (i = t.getElementById(o)) ? [i] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : M.call(r && !a ? s ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e))
            }, $.contains = function(t, e) {
                return t !== e && t.contains(e)
            }, $.type = t, $.isFunction = e, $.isWindow = i, $.isArray = X, $.isPlainObject = s, $.isEmptyObject = function(t) {
                var e;
                for (e in t) return !1;
                return !0
            }, $.inArray = function(t, e, i) {
                return D.indexOf.call(e, t, i)
            }, $.camelCase = x, $.trim = function(t) {
                return null == t ? "" : String.prototype.trim.call(t)
            }, $.uuid = 0, $.support = {}, $.expr = {}, $.map = function(t, e) {
                var i, n, a, s = [];
                if (o(t))
                    for (n = 0; n < t.length; n++) i = e(t[n], n), null != i && s.push(i);
                else
                    for (a in t) i = e(t[a], a), null != i && s.push(i);
                return l(s)
            }, $.each = function(t, e) {
                var i, n;
                if (o(t)) {
                    for (i = 0; i < t.length; i++)
                        if (e.call(t[i], i, t[i]) === !1) return t
                } else
                    for (n in t)
                        if (e.call(t[n], n, t[n]) === !1) return t; return t
            }, $.grep = function(t, e) {
                return E.call(t, e)
            }, window.JSON && ($.parseJSON = JSON.parse), $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
                Y["[object " + e + "]"] = e.toLowerCase()
            }), $.fn = {
                forEach: D.forEach,
                reduce: D.reduce,
                push: D.push,
                sort: D.sort,
                indexOf: D.indexOf,
                concat: D.concat,
                map: function(t) {
                    return $($.map(this, function(e, i) {
                        return t.call(e, i, e)
                    }))
                },
                slice: function() {
                    return $(M.apply(this, arguments))
                },
                ready: function(t) {
                    return F.test(S.readyState) && S.body ? t($) : S.addEventListener("DOMContentLoaded", function() {
                        t($)
                    }, !1), this
                },
                get: function(t) {
                    return t === L ? M.call(this) : this[t >= 0 ? t : t + this.length]
                },
                toArray: function() {
                    return this.get()
                },
                size: function() {
                    return this.length
                },
                remove: function() {
                    return this.each(function() {
                        null != this.parentNode && this.parentNode.removeChild(this)
                    })
                },
                each: function(t) {
                    return D.every.call(this, function(e, i) {
                        return t.call(e, i, e) !== !1
                    }), this
                },
                filter: function(t) {
                    return e(t) ? this.not(this.not(t)) : $(E.call(this, function(e) {
                        return G.matches(e, t)
                    }))
                },
                add: function(t, e) {
                    return $(k(this.concat($(t, e))))
                },
                is: function(t) {
                    return this.length > 0 && G.matches(this[0], t)
                },
                not: function(t) {
                    var i = [];
                    if (e(t) && t.call !== L) this.each(function(e) {
                        t.call(this, e) || i.push(this)
                    });
                    else {
                        var n = "string" == typeof t ? this.filter(t) : o(t) && e(t.item) ? M.call(t) : $(t);
                        this.forEach(function(t) {
                            n.indexOf(t) < 0 && i.push(t)
                        })
                    }
                    return $(i)
                },
                has: function(t) {
                    return this.filter(function() {
                        return a(t) ? $.contains(this, t) : $(this).find(t).size()
                    })
                },
                eq: function(t) {
                    return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
                },
                first: function() {
                    var t = this[0];
                    return t && !a(t) ? t : $(t)
                },
                last: function() {
                    var t = this[this.length - 1];
                    return t && !a(t) ? t : $(t)
                },
                find: function(t) {
                    var e, i = this;
                    return e = "object" == typeof t ? $(t).filter(function() {
                        var t = this;
                        return D.some.call(i, function(e) {
                            return $.contains(e, t)
                        })
                    }) : 1 == this.length ? $(G.qsa(this[0], t)) : this.map(function() {
                        return G.qsa(this, t)
                    })
                },
                closest: function(t, e) {
                    var i = this[0],
                        a = !1;
                    for ("object" == typeof t && (a = $(t)); i && !(a ? a.indexOf(i) >= 0 : G.matches(i, t));) i = i !== e && !n(i) && i.parentNode;
                    return $(i)
                },
                parents: function(t) {
                    for (var e = [], i = this; i.length > 0;) i = $.map(i, function(t) {
                        return (t = t.parentNode) && !n(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
                    });
                    return f(e, t)
                },
                parent: function(t) {
                    return f(k(this.pluck("parentNode")), t)
                },
                children: function(t) {
                    return f(this.map(function() {
                        return m(this)
                    }), t)
                },
                contents: function() {
                    return this.map(function() {
                        return M.call(this.childNodes)
                    })
                },
                siblings: function(t) {
                    return f(this.map(function(t, e) {
                        return E.call(m(e.parentNode), function(t) {
                            return t !== e
                        })
                    }), t)
                },
                empty: function() {
                    return this.each(function() {
                        this.innerHTML = ""
                    })
                },
                pluck: function(t) {
                    return $.map(this, function(e) {
                        return e[t]
                    })
                },
                show: function() {
                    return this.each(function() {
                        "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = u(this.nodeName))
                    })
                },
                replaceWith: function(t) {
                    return this.before(t).remove()
                },
                wrap: function(t) {
                    var i = e(t);
                    if (this[0] && !i) var n = $(t).get(0),
                        a = n.parentNode || this.length > 1;
                    return this.each(function(e) {
                        $(this).wrapAll(i ? t.call(this, e) : a ? n.cloneNode(!0) : n)
                    })
                },
                wrapAll: function(t) {
                    if (this[0]) {
                        $(this[0]).before(t = $(t));
                        for (var e;
                            (e = t.children()).length;) t = e.first();
                        $(t).append(this)
                    }
                    return this
                },
                wrapInner: function(t) {
                    var i = e(t);
                    return this.each(function(e) {
                        var n = $(this),
                            a = n.contents(),
                            s = i ? t.call(this, e) : t;
                        a.length ? a.wrapAll(s) : n.append(s)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        $(this).replaceWith($(this).children())
                    }), this
                },
                clone: function() {
                    return this.map(function() {
                        return this.cloneNode(!0)
                    })
                },
                hide: function() {
                    return this.css("display", "none")
                },
                toggle: function(t) {
                    return this.each(function() {
                        var e = $(this);
                        (t === L ? "none" == e.css("display") : t) ? e.show(): e.hide()
                    })
                },
                prev: function(t) {
                    return $(this.pluck("previousElementSibling")).filter(t || "*")
                },
                next: function(t) {
                    return $(this.pluck("nextElementSibling")).filter(t || "*")
                },
                html: function(t) {
                    return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML : null : this.each(function(e) {
                        var i = this.innerHTML;
                        $(this).empty().append(p(this, t, e, i))
                    })
                },
                text: function(t) {
                    return 0 === arguments.length ? this.length > 0 ? this[0].textContent : null : this.each(function() {
                        this.textContent = t === L ? "" : "" + t
                    })
                },
                attr: function(t, e) {
                    var i;
                    return "string" == typeof t && e === L ? 0 == this.length || 1 !== this[0].nodeType ? L : "value" == t && "INPUT" == this[0].nodeName ? this.val() : !(i = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : i : this.each(function(i) {
                        if (1 === this.nodeType)
                            if (a(t))
                                for (w in t) g(this, w, t[w]);
                            else g(this, t, p(this, e, i, this.getAttribute(t)))
                    })
                },
                removeAttr: function(t) {
                    return this.each(function() {
                        1 === this.nodeType && g(this, t)
                    })
                },
                prop: function(t, e) {
                    return t = V[t] || t, e === L ? this[0] && this[0][t] : this.each(function(i) {
                        this[t] = p(this, e, i, this[t])
                    })
                },
                data: function(t, e) {
                    var i = this.attr("data-" + t.replace(P, "-$1").toLowerCase(), e);
                    return null !== i ? y(i) : L
                },
                val: function(t) {
                    return 0 === arguments.length ? this[0] && (this[0].multiple ? $(this[0]).find("option").filter(function() {
                        return this.selected
                    }).pluck("value") : this[0].value) : this.each(function(e) {
                        this.value = p(this, t, e, this.value)
                    })
                },
                offset: function(t) {
                    if (t) return this.each(function(e) {
                        var i = $(this),
                            n = p(this, t, e, i.offset()),
                            a = i.offsetParent().offset(),
                            s = {
                                top: n.top - a.top,
                                left: n.left - a.left
                            };
                        "static" == i.css("position") && (s.position = "relative"), i.css(s)
                    });
                    if (0 == this.length) return null;
                    var e = this[0].getBoundingClientRect();
                    return {
                        left: e.left + window.pageXOffset,
                        top: e.top + window.pageYOffset,
                        width: Math.round(e.width),
                        height: Math.round(e.height)
                    }
                },
                css: function(e, i) {
                    if (arguments.length < 2) {
                        var n = this[0],
                            a = getComputedStyle(n, "");
                        if (!n) return;
                        if ("string" == typeof e) return n.style[x(e)] || a.getPropertyValue(e);
                        if (X(e)) {
                            var s = {};
                            return $.each(X(e) ? e : [e], function(t, e) {
                                s[e] = n.style[x(e)] || a.getPropertyValue(e)
                            }), s
                        }
                    }
                    var o = "";
                    if ("string" == t(e)) i || 0 === i ? o = h(e) + ":" + c(e, i) : this.each(function() {
                        this.style.removeProperty(h(e))
                    });
                    else
                        for (w in e) e[w] || 0 === e[w] ? o += h(w) + ":" + c(w, e[w]) + ";" : this.each(function() {
                            this.style.removeProperty(h(w))
                        });
                    return this.each(function() {
                        this.style.cssText += ";" + o
                    })
                },
                index: function(t) {
                    return t ? this.indexOf($(t)[0]) : this.parent().children().indexOf(this[0])
                },
                hasClass: function(t) {
                    return t ? D.some.call(this, function(t) {
                        return this.test(v(t))
                    }, d(t)) : !1
                },
                addClass: function(t) {
                    return t ? this.each(function(e) {
                        b = [];
                        var i = v(this),
                            n = p(this, t, e, i);
                        n.split(/\s+/g).forEach(function(t) {
                            $(this).hasClass(t) || b.push(t)
                        }, this), b.length && v(this, i + (i ? " " : "") + b.join(" "))
                    }) : this
                },
                removeClass: function(t) {
                    return this.each(function(e) {
                        return t === L ? v(this, "") : (b = v(this), p(this, t, e, b).split(/\s+/g).forEach(function(t) {
                            b = b.replace(d(t), " ")
                        }), void v(this, b.trim()))
                    })
                },
                toggleClass: function(t, e) {
                    return t ? this.each(function(i) {
                        var n = $(this),
                            a = p(this, t, i, v(this));
                        a.split(/\s+/g).forEach(function(t) {
                            (e === L ? !n.hasClass(t) : e) ? n.addClass(t): n.removeClass(t)
                        })
                    }) : this
                },
                scrollTop: function(t) {
                    if (this.length) {
                        var e = "scrollTop" in this[0];
                        return t === L ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function() {
                            this.scrollTop = t
                        } : function() {
                            this.scrollTo(this.scrollX, t)
                        })
                    }
                },
                scrollLeft: function(t) {
                    if (this.length) {
                        var e = "scrollLeft" in this[0];
                        return t === L ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function() {
                            this.scrollLeft = t
                        } : function() {
                            this.scrollTo(t, this.scrollY)
                        })
                    }
                },
                position: function() {
                    if (this.length) {
                        var t = this[0],
                            e = this.offsetParent(),
                            i = this.offset(),
                            n = O.test(e[0].nodeName) ? {
                                top: 0,
                                left: 0
                            } : e.offset();
                        return i.top -= parseFloat($(t).css("margin-top")) || 0, i.left -= parseFloat($(t).css("margin-left")) || 0, n.top += parseFloat($(e[0]).css("border-top-width")) || 0, n.left += parseFloat($(e[0]).css("border-left-width")) || 0, {
                            top: i.top - n.top,
                            left: i.left - n.left
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var t = this.offsetParent || S.body; t && !O.test(t.nodeName) && "static" == $(t).css("position");) t = t.offsetParent;
                        return t
                    })
                }
            }, $.fn.detach = $.fn.remove, ["width", "height"].forEach(function(t) {
                var e = t.replace(/./, function(t) {
                    return t[0].toUpperCase()
                });
                $.fn[t] = function(a) {
                    var s, o = this[0];
                    return a === L ? i(o) ? o["inner" + e] : n(o) ? o.documentElement["scroll" + e] : (s = this.offset()) && s[t] : this.each(function(e) {
                        o = $(this), o.css(t, p(this, a, e, o[t]()))
                    })
                }
            }), B.forEach(function(e, i) {
                var n = i % 2;
                $.fn[e] = function() {
                    var e, a, s = $.map(arguments, function(i) {
                            return e = t(i), "object" == e || "array" == e || null == i ? i : G.fragment(i)
                        }),
                        o = this.length > 1;
                    return s.length < 1 ? this : this.each(function(t, e) {
                        a = n ? e : e.parentNode, e = 0 == i ? e.nextSibling : 1 == i ? e.firstChild : 2 == i ? e : null, s.forEach(function(t) {
                            if (o) t = t.cloneNode(!0);
                            else if (!a) return $(t).remove();
                            T(a.insertBefore(t, e), function(t) {
                                null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                            })
                        })
                    })
                }, $.fn[n ? e + "To" : "insert" + (i ? "Before" : "After")] = function(t) {
                    return $(t)[e](this), this
                }
            }), G.Z.prototype = $.fn, G.uniq = k, G.deserializeValue = y, $.zepto = G, $
        }();
        window.Zepto = e, void 0 === window.$ && (window.$ = e),
            function($) {
                function t(t) {
                    return t._zid || (t._zid = c++)
                }

                function e(e, a, s, o) {
                    if (a = i(a), a.ns) var r = n(a.ns);
                    return (f[t(e)] || []).filter(function(e) {
                        return !(!e || a.e && e.e != a.e || a.ns && !r.test(e.ns) || s && t(e.fn) !== t(s) || o && e.sel != o)
                    })
                }

                function i(t) {
                    var e = ("" + t).split(".");
                    return {
                        e: e[0],
                        ns: e.slice(1).sort().join(" ")
                    }
                }

                function n(t) {
                    return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
                }

                function a(t, e) {
                    return t.del && !g && t.e in v || !!e
                }

                function s(t) {
                    return y[t] || g && v[t] || t
                }

                function o(e, n, o, r, h, c, u) {
                    var m = t(e),
                        _ = f[m] || (f[m] = []);
                    n.split(/\s/).forEach(function(t) {
                        if ("ready" == t) return $(document).ready(o);
                        var n = i(t);
                        n.fn = o, n.sel = h, n.e in y && (o = function(t) {
                            var e = t.relatedTarget;
                            return !e || e !== this && !$.contains(this, e) ? n.fn.apply(this, arguments) : void 0
                        }), n.del = c;
                        var m = c || o;
                        n.proxy = function(t) {
                            if (t = l(t), !t.isImmediatePropagationStopped()) {
                                t.data = r;
                                var i = m.apply(e, t._args == d ? [t] : [t].concat(t._args));
                                return i === !1 && (t.preventDefault(), t.stopPropagation()), i
                            }
                        }, n.i = _.length, _.push(n), "addEventListener" in e && e.addEventListener(s(n.e), n.proxy, a(n, u))
                    })
                }

                function r(i, n, o, r, l) {
                    var h = t(i);
                    (n || "").split(/\s/).forEach(function(t) {
                        e(i, t, o, r).forEach(function(t) {
                            delete f[h][t.i], "removeEventListener" in i && i.removeEventListener(s(t.e), t.proxy, a(t, l))
                        })
                    })
                }

                function l(t, e) {
                    return (e || !t.isDefaultPrevented) && (e || (e = t), $.each(b, function(i, n) {
                        var a = e[i];
                        t[i] = function() {
                            return this[n] = T, a && a.apply(e, arguments)
                        }, t[n] = L
                    }), (e.defaultPrevented !== d ? e.defaultPrevented : "returnValue" in e ? e.returnValue === !1 : e.getPreventDefault && e.getPreventDefault()) && (t.isDefaultPrevented = T)), t
                }

                function h(t) {
                    var e, i = {
                        originalEvent: t
                    };
                    for (e in t) w.test(e) || t[e] === d || (i[e] = t[e]);
                    return l(i, t)
                }
                var d, c = ($.zepto.qsa, 1),
                    u = Array.prototype.slice,
                    m = $.isFunction,
                    _ = function(t) {
                        return "string" == typeof t
                    },
                    f = {},
                    p = {},
                    g = "onfocusin" in window,
                    v = {
                        focus: "focusin",
                        blur: "focusout"
                    },
                    y = {
                        mouseenter: "mouseover",
                        mouseleave: "mouseout"
                    };
                p.click = p.mousedown = p.mouseup = p.mousemove = "MouseEvents", $.event = {
                    add: o,
                    remove: r
                }, $.proxy = function(e, i) {
                    if (m(e)) {
                        var n = function() {
                            return e.apply(i, arguments)
                        };
                        return n._zid = t(e), n
                    }
                    if (_(i)) return $.proxy(e[i], e);
                    throw new TypeError("expected function")
                }, $.fn.bind = function(t, e, i) {
                    return this.on(t, e, i)
                }, $.fn.unbind = function(t, e) {
                    return this.off(t, e)
                }, $.fn.one = function(t, e, i, n) {
                    return this.on(t, e, i, n, 1)
                };
                var T = function() {
                        return !0
                    },
                    L = function() {
                        return !1
                    },
                    w = /^([A-Z]|returnValue$|layer[XY]$)/,
                    b = {
                        preventDefault: "isDefaultPrevented",
                        stopImmediatePropagation: "isImmediatePropagationStopped",
                        stopPropagation: "isPropagationStopped"
                    };
                $.fn.delegate = function(t, e, i) {
                    return this.on(e, t, i)
                }, $.fn.undelegate = function(t, e, i) {
                    return this.off(e, t, i)
                }, $.fn.live = function(t, e) {
                    return $(document.body).delegate(this.selector, t, e), this
                }, $.fn.die = function(t, e) {
                    return $(document.body).undelegate(this.selector, t, e), this
                }, $.fn.on = function(t, e, i, n, a) {
                    var s, l, c = this;
                    return t && !_(t) ? ($.each(t, function(t, n) {
                        c.on(t, e, i, n, a)
                    }), c) : (_(e) || m(n) || n === !1 || (n = i, i = e, e = d), (m(i) || i === !1) && (n = i, i = d), n === !1 && (n = L), c.each(function(d, c) {
                        a && (s = function(t) {
                            return r(c, t.type, n), n.apply(this, arguments)
                        }), e && (l = function(t) {
                            var i, a = $(t.target).closest(e, c).get(0);
                            return a && a !== c ? (i = $.extend(h(t), {
                                currentTarget: a,
                                liveFired: c
                            }), (s || n).apply(a, [i].concat(u.call(arguments, 1)))) : void 0
                        }), o(c, t, n, i, e, l || s)
                    }))
                }, $.fn.off = function(t, e, i) {
                    var n = this;
                    return t && !_(t) ? ($.each(t, function(t, i) {
                        n.off(t, e, i)
                    }), n) : (_(e) || m(i) || i === !1 || (i = e, e = d), i === !1 && (i = L), n.each(function() {
                        r(this, t, i, e)
                    }))
                }, $.fn.trigger = function(t, e) {
                    return t = _(t) || $.isPlainObject(t) ? $.Event(t) : l(t), t._args = e, this.each(function() {
                        "dispatchEvent" in this ? this.dispatchEvent(t) : $(this).triggerHandler(t, e)
                    })
                }, $.fn.triggerHandler = function(t, i) {
                    var n, a;
                    return this.each(function(s, o) {
                        n = h(_(t) ? $.Event(t) : t), n._args = i, n.target = o, $.each(e(o, t.type || t), function(t, e) {
                            return a = e.proxy(n), n.isImmediatePropagationStopped() ? !1 : void 0
                        })
                    }), a
                }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t) {
                    $.fn[t] = function(e) {
                        return e ? this.bind(t, e) : this.trigger(t)
                    }
                }), ["focus", "blur"].forEach(function(t) {
                    $.fn[t] = function(e) {
                        return e ? this.bind(t, e) : this.each(function() {
                            try {
                                this[t]()
                            } catch (e) {}
                        }), this
                    }
                }), $.Event = function(t, e) {
                    _(t) || (e = t, t = e.type);
                    var i = document.createEvent(p[t] || "Events"),
                        n = !0;
                    if (e)
                        for (var a in e) "bubbles" == a ? n = !!e[a] : i[a] = e[a];
                    return i.initEvent(t, n, !0), l(i)
                }
            }(e),
            function($) {
                function t(t, e, i) {
                    var n = $.Event(e);
                    return $(t).trigger(n, i), !n.isDefaultPrevented()
                }

                function e(e, i, n, a) {
                    return e.global ? t(i || g, n, a) : void 0
                }

                function i(t) {
                    t.global && 0 === $.active++ && e(t, null, "ajaxStart")
                }

                function n(t) {
                    t.global && !--$.active && e(t, null, "ajaxStop")
                }

                function a(t, i) {
                    var n = i.context;
                    return i.beforeSend.call(n, t, i) === !1 || e(i, n, "ajaxBeforeSend", [t, i]) === !1 ? !1 : void e(i, n, "ajaxSend", [t, i])
                }

                function s(t, i, n, a) {
                    var s = n.context,
                        o = "success";
                    n.success.call(s, t, o, i), a && a.resolveWith(s, [t, o, i]), e(n, s, "ajaxSuccess", [i, n, t]), r(o, i, n)
                }

                function o(t, i, n, a, s) {
                    var o = a.context;
                    a.error.call(o, n, i, t), s && s.rejectWith(o, [n, i, t]), e(a, o, "ajaxError", [n, a, t || i]), r(i, n, a)
                }

                function r(t, i, a) {
                    var s = a.context;
                    a.complete.call(s, i, t), e(a, s, "ajaxComplete", [i, a]), n(a)
                }

                function l() {}

                function h(t) {
                    return t && (t = t.split(";", 2)[0]), t && (t == w ? "html" : t == L ? "json" : y.test(t) ? "script" : T.test(t) && "xml") || "text"
                }

                function d(t, e) {
                    return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
                }

                function c(t) {
                    t.processData && t.data && "string" != $.type(t.data) && (t.data = $.param(t.data, t.traditional)), !t.data || t.type && "GET" != t.type.toUpperCase() || (t.url = d(t.url, t.data), t.data = void 0)
                }

                function u(t, e, i, n) {
                    var a = !$.isFunction(e);
                    return {
                        url: t,
                        data: a ? e : void 0,
                        success: a ? $.isFunction(i) ? i : void 0 : e,
                        dataType: a ? n || i : i
                    }
                }

                function m(t, e, i, n) {
                    var a, s = $.isArray(e),
                        o = $.isPlainObject(e);
                    $.each(e, function(e, r) {
                        a = $.type(r), n && (e = i ? n : n + "[" + (o || "object" == a || "array" == a ? e : "") + "]"), !n && s ? t.add(r.name, r.value) : "array" == a || !i && "object" == a ? m(t, r, i, e) : t.add(e, r)
                    })
                }
                var _, f, p = 0,
                    g = window.document,
                    v = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                    y = /^(?:text|application)\/javascript/i,
                    T = /^(?:text|application)\/xml/i,
                    L = "application/json",
                    w = "text/html",
                    b = /^\s*$/;
                $.active = 0, $.ajaxJSONP = function(t, e) {
                    if (!("type" in t)) return $.ajax(t);
                    var i, n, r = t.jsonpCallback,
                        l = ($.isFunction(r) ? r() : r) || "jsonp" + ++p,
                        h = g.createElement("script"),
                        d = window[l],
                        c = function(t) {
                            $(h).triggerHandler("error", t || "abort")
                        },
                        u = {
                            abort: c
                        };
                    return e && e.promise(u), $(h).on("load error", function(a, r) {
                        clearTimeout(n), $(h).off().remove(), "error" != a.type && i ? s(i[0], u, t, e) : o(null, r || "error", u, t, e), window[l] = d, i && $.isFunction(d) && d(i[0]), d = i = void 0
                    }), a(u, t) === !1 ? (c("abort"), u) : (window[l] = function() {
                        i = arguments
                    }, h.src = t.url.replace(/\?(.+)=\?/, "?$1=" + l), g.head.appendChild(h), t.timeout > 0 && (n = setTimeout(function() {
                        c("timeout")
                    }, t.timeout)), u)
                }, $.ajaxSettings = {
                    type: "GET",
                    beforeSend: l,
                    success: l,
                    error: l,
                    complete: l,
                    context: null,
                    global: !0,
                    xhr: function() {
                        return new window.XMLHttpRequest
                    },
                    accepts: {
                        script: "text/javascript, application/javascript, application/x-javascript",
                        json: L,
                        xml: "application/xml, text/xml",
                        html: w,
                        text: "text/plain"
                    },
                    crossDomain: !1,
                    timeout: 0,
                    processData: !0,
                    cache: !0
                }, $.ajax = function(t) {
                    var e = $.extend({}, t || {}),
                        n = $.Deferred && $.Deferred();
                    for (_ in $.ajaxSettings) void 0 === e[_] && (e[_] = $.ajaxSettings[_]);
                    i(e), e.crossDomain || (e.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(e.url) && RegExp.$2 != window.location.host), e.url || (e.url = window.location.toString()), c(e), e.cache === !1 && (e.url = d(e.url, "_=" + Date.now()));
                    var r = e.dataType,
                        u = /\?.+=\?/.test(e.url);
                    if ("jsonp" == r || u) return u || (e.url = d(e.url, e.jsonp ? e.jsonp + "=?" : e.jsonp === !1 ? "" : "callback=?")), $.ajaxJSONP(e, n);
                    var m, p = e.accepts[r],
                        g = {},
                        v = function(t, e) {
                            g[t.toLowerCase()] = [t, e]
                        },
                        y = /^([\w-]+:)\/\//.test(e.url) ? RegExp.$1 : window.location.protocol,
                        T = e.xhr(),
                        L = T.setRequestHeader;
                    if (n && n.promise(T), e.crossDomain || v("X-Requested-With", "XMLHttpRequest"), v("Accept", p || "*/*"), (p = e.mimeType || p) && (p.indexOf(",") > -1 && (p = p.split(",", 2)[0]), T.overrideMimeType && T.overrideMimeType(p)), (e.contentType || e.contentType !== !1 && e.data && "GET" != e.type.toUpperCase()) && v("Content-Type", e.contentType || "application/x-www-form-urlencoded"), e.headers)
                        for (f in e.headers) v(f, e.headers[f]);
                    if (T.setRequestHeader = v, T.onreadystatechange = function() {
                            if (4 == T.readyState) {
                                T.onreadystatechange = l, clearTimeout(m);
                                var t, i = !1;
                                if (T.status >= 200 && T.status < 300 || 304 == T.status || 0 == T.status && "file:" == y) {
                                    r = r || h(e.mimeType || T.getResponseHeader("content-type")), t = T.responseText;
                                    try {
                                        "script" == r ? (1, eval)(t) : "xml" == r ? t = T.responseXML : "json" == r && (t = b.test(t) ? null : $.parseJSON(t))
                                    } catch (a) {
                                        i = a
                                    }
                                    i ? o(i, "parsererror", T, e, n) : s(t, T, e, n)
                                } else o(T.statusText || null, T.status ? "error" : "abort", T, e, n)
                            }
                        }, a(T, e) === !1) return T.abort(), o(null, "abort", T, e, n), T;
                    if (e.xhrFields)
                        for (f in e.xhrFields) T[f] = e.xhrFields[f];
                    var w = "async" in e ? e.async : !0;
                    T.open(e.type, e.url, w, e.username, e.password);
                    for (f in g) L.apply(T, g[f]);
                    return e.timeout > 0 && (m = setTimeout(function() {
                        T.onreadystatechange = l, T.abort(), o(null, "timeout", T, e, n)
                    }, e.timeout)), T.send(e.data ? e.data : null), T
                }, $.get = function() {
                    return $.ajax(u.apply(null, arguments))
                }, $.post = function() {
                    var t = u.apply(null, arguments);
                    return t.type = "POST", $.ajax(t)
                }, $.getJSON = function() {
                    var t = u.apply(null, arguments);
                    return t.dataType = "json", $.ajax(t)
                }, $.fn.load = function(t, e, i) {
                    if (!this.length) return this;
                    var n, a = this,
                        s = t.split(/\s/),
                        o = u(t, e, i),
                        r = o.success;
                    return s.length > 1 && (o.url = s[0], n = s[1]), o.success = function(t) {
                        a.html(n ? $("<div>").html(t.replace(v, "")).find(n) : t), r && r.apply(a, arguments)
                    }, $.ajax(o), this
                };
                var x = encodeURIComponent;
                $.param = function(t, e) {
                    var i = [];
                    return i.add = function(t, e) {
                        this.push(x(t) + "=" + x(e))
                    }, m(i, t, e), i.join("&").replace(/%20/g, "+")
                }
            }(e),
            function($) {
                $.fn.serializeArray = function() {
                    var t, e = [];
                    return $([].slice.call(this.get(0).elements)).each(function() {
                        t = $(this);
                        var i = t.attr("type");
                        "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != i && "reset" != i && "button" != i && ("radio" != i && "checkbox" != i || this.checked) && e.push({
                            name: t.attr("name"),
                            value: t.val()
                        })
                    }), e
                }, $.fn.serialize = function() {
                    var t = [];
                    return this.serializeArray().forEach(function(e) {
                        t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
                    }), t.join("&")
                }, $.fn.submit = function(t) {
                    if (t) this.bind("submit", t);
                    else if (this.length) {
                        var e = $.Event("submit");
                        this.eq(0).trigger(e), e.isDefaultPrevented() || this.get(0).submit()
                    }
                    return this
                }
            }(e),
            function($) {
                "__proto__" in {} || $.extend($.zepto, {
                    Z: function(t, e) {
                        return t = t || [], $.extend(t, $.fn), t.selector = e || "", t.__Z = !0, t
                    },
                    isZ: function(t) {
                        return "array" === $.type(t) && "__Z" in t
                    }
                });
                try {
                    getComputedStyle(void 0)
                } catch (t) {
                    var e = getComputedStyle;
                    window.getComputedStyle = function(t) {
                        try {
                            return e(t)
                        } catch (i) {
                            return null
                        }
                    }
                }
            }(e), t.getJSON = e.getJSON, t.ajax = e.ajax
    }(TL), TL.Class = function() {}, TL.Class.extend = function(t) {
        var e = function() {
                this.initialize && this.initialize.apply(this, arguments)
            },
            i = function() {};
        i.prototype = this.prototype;
        var n = new i;
        n.constructor = e, e.prototype = n, e.superclass = this.prototype;
        for (var a in this) this.hasOwnProperty(a) && "prototype" !== a && "superclass" !== a && (e[a] = this[a]);
        return t.statics && (TL.Util.extend(e, t.statics), delete t.statics), t.includes && (TL.Util.extend.apply(null, [n].concat(t.includes)), delete t.includes), t.options && n.options && (t.options = TL.Util.extend({}, n.options, t.options)), TL.Util.extend(n, t), e.extend = TL.Class.extend, e.include = function(t) {
            TL.Util.extend(this.prototype, t)
        }, e
    }, TL.Events = {
        addEventListener: function(t, e, i) {
            var n = this._tl_events = this._tl_events || {};
            return n[t] = n[t] || [], n[t].push({
                action: e,
                context: i || this
            }), this
        },
        hasEventListeners: function(t) {
            var e = "_tl_events";
            return e in this && t in this[e] && this[e][t].length > 0
        },
        removeEventListener: function(t, e, i) {
            if (!this.hasEventListeners(t)) return this;
            for (var n = 0, a = this._tl_events, s = a[t].length; s > n; n++)
                if (a[t][n].action === e && (!i || a[t][n].context === i)) return a[t].splice(n, 1), this;
            return this
        },
        fireEvent: function(t, e) {
            if (!this.hasEventListeners(t)) return this;
            for (var i = TL.Util.mergeData({
                    type: t,
                    target: this
                }, e), n = this._tl_events[t].slice(), a = 0, s = n.length; s > a; a++) n[a].action.call(n[a].context || this, i);
            return this
        }
    }, TL.Events.on = TL.Events.addEventListener, TL.Events.off = TL.Events.removeEventListener, TL.Events.fire = TL.Events.fireEvent,
    function() {
        var t = navigator.userAgent.toLowerCase(),
            e = document.documentElement,
            i = "ActiveXObject" in window,
            n = -1 !== t.indexOf("webkit"),
            a = -1 !== t.indexOf("phantom"),
            s = -1 !== t.search("android [23]"),
            o = "undefined" != typeof orientation,
            r = navigator.msPointerEnabled && navigator.msMaxTouchPoints && !window.PointerEvent,
            l = window.PointerEvent && navigator.pointerEnabled && navigator.maxTouchPoints || r,
            h = i && "transition" in e.style,
            d = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix && !s,
            c = "MozPerspective" in e.style,
            u = "OTransition" in e.style,
            m = (window.opera, "devicePixelRatio" in window && window.devicePixelRatio > 1);
        if (!m && "matchMedia" in window) {
            var _ = window.matchMedia("(min-resolution:144dpi)");
            m = _ && _.matches
        }
        var f = !window.L_NO_TOUCH && !a && (l || "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch);
        TL.Browser = {
            ie: i,
            ua: t,
            ie9: Boolean(i && t.match(/MSIE 9/i)),
            ielt9: i && !document.addEventListener,
            webkit: n,
            firefox: -1 !== t.indexOf("gecko") && !n && !window.opera && !i,
            android: -1 !== t.indexOf("android"),
            android23: s,
            chrome: -1 !== t.indexOf("chrome"),
            edge: -1 !== t.indexOf("edge/"),
            ie3d: h,
            webkit3d: d,
            gecko3d: c,
            opera3d: u,
            any3d: !window.L_DISABLE_3D && (h || d || c || u) && !a,
            mobile: o,
            mobileWebkit: o && n,
            mobileWebkit3d: o && d,
            mobileOpera: o && window.opera,
            touch: !!f,
            msPointer: !!r,
            pointer: !!l,
            retina: !!m,
            orientation: function() {
                var t = window.innerWidth,
                    e = window.innerHeight,
                    i = "portrait";
                return t > e && (i = "landscape"), 90 == Math.abs(window.orientation), trace(i), i
            }
        }
    }(), TL.Load = function() {
        function t(t) {
            var i = 0,
                n = !1;
            for (i = 0; i < e.length; i++) e[i] == t && (n = !0);
            return n ? !0 : (e.push(t), !1)
        }
        var e = [];
        return {
            css: function(e, i, n, a) {
                t(e) ? i() : TL.LoadIt.css(e, i, n, a)
            },
            js: function(e, i, n, a) {
                t(e) ? i() : TL.LoadIt.js(e, i, n, a)
            }
        }
    }(this.document), TL.LoadIt = function(t) {
        function e(e, i) {
            var n, a = t.createElement(e);
            for (n in i) i.hasOwnProperty(n) && a.setAttribute(n, i[n]);
            return a
        }

        function i(t) {
            var e, i, n = h[t];
            n && (e = n.callback, i = n.urls, i.shift(), d = 0, i.length || (e && e.call(n.context, n.obj), h[t] = null, c[t].length && a(t)))
        }

        function n() {
            var e = navigator.userAgent;
            r = {
                async: t.createElement("script").async === !0
            }, (r.webkit = /AppleWebKit\//.test(e)) || (r.ie = /MSIE/.test(e)) || (r.opera = /Opera/.test(e)) || (r.gecko = /Gecko\//.test(e)) || (r.unknown = !0)
        }

        function a(a, d, u, m, _) {
            var f, p, g, v, y, T, L = function() {
                    i(a)
                },
                w = "css" === a,
                b = [];
            if (r || n(), d)
                if (d = "string" == typeof d ? [d] : d.concat(), w || r.async || r.gecko || r.opera) c[a].push({
                    urls: d,
                    callback: u,
                    obj: m,
                    context: _
                });
                else
                    for (f = 0, p = d.length; p > f; ++f) c[a].push({
                        urls: [d[f]],
                        callback: f === p - 1 ? u : null,
                        obj: m,
                        context: _
                    });
            if (!h[a] && (v = h[a] = c[a].shift())) {
                for (l || (l = t.head || t.getElementsByTagName("head")[0]), y = v.urls, f = 0, p = y.length; p > f; ++f) T = y[f], w ? g = r.gecko ? e("style") : e("link", {
                    href: T,
                    rel: "stylesheet"
                }) : (g = e("script", {
                    src: T
                }), g.async = !1), g.className = "lazyload", g.setAttribute("charset", "utf-8"), r.ie && !w ? g.onreadystatechange = function() {
                    /loaded|complete/.test(g.readyState) && (g.onreadystatechange = null, L())
                } : w && (r.gecko || r.webkit) ? r.webkit ? (v.urls[f] = g.href, o()) : (g.innerHTML = '@import "' + T + '";', s(g)) : g.onload = g.onerror = L, b.push(g);
                for (f = 0, p = b.length; p > f; ++f) l.appendChild(b[f])
            }
        }

        function s(t) {
            var e;
            try {
                e = !!t.sheet.cssRules
            } catch (n) {
                return d += 1, void(200 > d ? setTimeout(function() {
                    s(t)
                }, 50) : e && i("css"))
            }
            i("css")
        }

        function o() {
            var t, e = h.css;
            if (e) {
                for (t = u.length; --t >= 0;)
                    if (u[t].href === e.urls[0]) {
                        i("css");
                        break
                    }
                d += 1, e && (200 > d ? setTimeout(o, 50) : i("css"))
            }
        }
        var r, l, h = {},
            d = 0,
            c = {
                css: [],
                js: []
            },
            u = t.styleSheets;
        return {
            css: function(t, e, i, n) {
                a("css", t, e, i, n)
            },
            js: function(t, e, i, n) {
                a("js", t, e, i, n)
            }
        }
    }(this.document), TL.TimelineConfig = TL.Class.extend({
        includes: [],
        initialize: function(t) {
            if (this.title = "", this.scale = "", this.events = [], this.eras = [], this.event_dict = {}, this.messages = {
                    errors: [],
                    warnings: []
                }, "object" == typeof t && t.events) {
                if (this.scale = t.scale, this.events = [], this._ensureValidScale(t.events), t.title) {
                    var e = this._assignID(t.title);
                    this._tidyFields(t.title), this.title = t.title, this.event_dict[e] = this.title
                }
                for (var i = 0; i < t.events.length; i++) try {
                    this.addEvent(t.events[i], !0)
                } catch (n) {
                    this.logError(n)
                }
                if (t.eras)
                    for (var i = 0; i < t.eras.length; i++) try {
                        this.addEra(t.eras[i], !0)
                    } catch (n) {
                        this.logError("Era " + i + ": " + n)
                    }
                TL.DateUtil.sortByDate(this.events), TL.DateUtil.sortByDate(this.eras)
            }
        },
        logError: function(t) {
            trace(t), this.messages.errors.push(t)
        },
        getErrors: function(t) {
            return t ? this.messages.errors.join(t) : this.messages.errors
        },
        validate: function() {
            ("undefined" == typeof this.events || "undefined" == typeof this.events.length || 0 == this.events.length) && this.logError("Timeline configuration has no events.");
            for (var t = 0; t < this.eras.length; t++)
                if ("undefined" == typeof this.eras[t].start_date || "undefined" == typeof this.eras[t].end_date) {
                    var e;
                    e = this.eras[t].text && this.eras[t].text.headline ? this.eras[t].text.headline : "era " + (t + 1), this.logError("All eras must have start and end dates. [" + e + "]")
                }
        },
        isValid: function() {
            return 0 == this.messages.errors.length
        },
        addEvent: function(t, e) {
            var i = this._assignID(t);
            if ("undefined" == typeof t.start_date) throw new TL.Error("missing_start_date_err", i);
            return this._processDates(t), this._tidyFields(t), this.events.push(t), this.event_dict[i] = t, e || TL.DateUtil.sortByDate(this.events), i
        },
        addEra: function(t, e) {
            var i = this._assignID(t);
            if ("undefined" == typeof t.start_date) throw new TL.Error("missing_start_date_err", i);
            return this._processDates(t), this._tidyFields(t), this.eras.push(t), this.event_dict[i] = t, e || TL.DateUtil.sortByDate(this.eras), i
        },
        _assignID: function(t) {
            var e = t.unique_id;
            return TL.Util.trim(e) || (e = t.text ? TL.Util.slugify(t.text.headline) : null), t.unique_id = TL.Util.ensureUniqueKey(this.event_dict, e), t.unique_id
        },
        _makeUniqueIdentifiers: function(t, e) {
            for (var i = [t], n = 0; n < e.length; n++) TL.Util.trim(e[n].unique_id) && (e[n].unique_id = TL.Util.slugify(e[n].unique_id), -1 == i.indexOf(e[n].unique_id) ? i.push(e[n].unique_id) : e[n].unique_id = "");
            if (i.length != e.length + 1)
                for (var n = 0; n < e.length; n++)
                    if (!e[n].unique_id) {
                        var a = e[n].text ? TL.Util.slugify(e[n].text.headline) : null;
                        a || (a = TL.Util.unique_ID(6)), -1 != i.indexOf(a) && (a = a + "-" + n), i.push(a), e[n].unique_id = a
                    }
        },
        _ensureValidScale: function(t) {
            if (!this.scale) {
                trace("Determining scale dynamically"), this.scale = "human";
                for (var e = 0; e < t.length; e++) {
                    if ("cosmological" == t[e].scale) {
                        this.scale = "cosmological";
                        break
                    }
                    if (t[e].start_date && "undefined" != typeof t[e].start_date.year) {
                        var i = new TL.BigDate(t[e].start_date),
                            n = i.data.date_obj.year;
                        if (-271820 > n || n > 275759) {
                            this.scale = "cosmological";
                            break
                        }
                    }
                }
            }
            var a = TL.DateUtil.SCALE_DATE_CLASSES[this.scale];
            a || this.logError("Don't know how to process dates on scale " + this.scale)
        },
        _processDates: function(t) {
            var e = TL.DateUtil.SCALE_DATE_CLASSES[this.scale];
            if (!(t.start_date instanceof e)) {
                var i = t.start_date;
                if (t.start_date = new e(i), "undefined" != typeof t.end_date && !(t.end_date instanceof e)) {
                    var n = t.end_date,
                        a = !0;
                    for (property in i) a = a && i[property] == n[property];
                    a ? (trace("End date same as start date is redundant; dropping end date"), delete t.end_date) : t.end_date = new e(n)
                }
            }
        },
        getEarliestDate: function() {
            var t = this.events[0].start_date;
            return this.eras && this.eras.length > 0 && this.eras[0].start_date.isBefore(t) ? this.eras[0].start_date : t
        },
        getLatestDate: function() {
            for (var t = [], e = 0; e < this.events.length; e++) t.push(this.events[e].end_date ? {
                date: this.events[e].end_date
            } : {
                date: this.events[e].start_date
            });
            for (var e = 0; e < this.eras.length; e++) t.push(this.eras[e].end_date ? {
                date: this.eras[e].end_date
            } : {
                date: this.eras[e].start_date
            });
            return TL.DateUtil.sortByDate(t, "date"), t.slice(-1)[0].date
        },
        _tidyFields: function(t) {
            function e(t, e, i) {
                i || (i = ""), t.hasOwnProperty(e) || (t[e] = i)
            }
            t.group && (t.group = TL.Util.trim(t.group)), t.text || (t.text = {}), e(t.text, "text"), e(t.text, "headline")
        }
    }),
    function(t) {
        function e(t) {
            parts = {
                key: null,
                worksheet: 0
            };
            var e = /\bkey=([-_A-Za-z0-9]+)&?/i;
            if (t.match(e)) parts.key = t.match(e)[1];
            else if (t.match("docs.google.com/spreadsheets/d/")) {
                var i = t.indexOf("docs.google.com/spreadsheets/d/") + "docs.google.com/spreadsheets/d/".length,
                    n = t.substr(i);
                parts.key = n.split("/")[0], t.match(/\?gid=(\d+)/) && (parts.worksheet = t.match(/\?gid=(\d+)/)[1])
            } else t.match(/^\b[-_A-Za-z0-9]+$/) && (parts.key = t);
            return parts.key ? parts : null
        }

        function i(e) {
            var i = {};
            for (k in e) 0 == k.indexOf("gsx$") && (i[k.substr(4)] = e[k].$t);
            if (t.Util.isEmptyObject(i)) return null;
            var n = {
                media: {
                    caption: i.mediacaption || "",
                    credit: i.mediacredit || "",
                    url: i.media || "",
                    thumbnail: i.mediathumbnail || ""
                },
                text: {
                    headline: i.headline || "",
                    text: i.text || ""
                },
                group: i.tag || "",
                type: i.type || ""
            };
            return i.startdate && (n.start_date = t.Date.parseDate(i.startdate)), i.enddate && (n.end_date = t.Date.parseDate(i.enddate)), n
        }

        function n(e) {
            function i(t) {
                return t ? t.replace(/[\s,]+/g, "") : void 0
            }
            var n = {};
            for (k in e) 0 == k.indexOf("gsx$") && (n[k.substr(4)] = t.Util.trim(e[k].$t));
            if (t.Util.isEmptyObject(n)) return null;
            var a = {
                media: {
                    caption: n.mediacaption || "",
                    credit: n.mediacredit || "",
                    url: n.media || "",
                    thumbnail: n.mediathumbnail || ""
                },
                text: {
                    headline: n.headline || "",
                    text: n.text || ""
                },
                start_date: {
                    year: i(n.year),
                    month: i(n.month) || "",
                    day: i(n.day) || ""
                },
                end_date: {
                    year: i(n.endyear) || "",
                    month: i(n.endmonth) || "",
                    day: i(n.endday) || ""
                },
                display_date: n.displaydate || "",
                type: n.type || ""
            };
            if (n.time && t.Util.mergeData(a.start_date, t.DateUtil.parseTime(n.time)), n.endtime && t.Util.mergeData(a.end_date, t.DateUtil.parseTime(n.endtime)), n.group && (a.group = n.group), "" == a.end_date.year) {
                var s = a.end_date;
                if (delete a.end_date, "" != s.month || "" != s.day || "" != s.time) {
                    {
                        a.text.headline || trace("Invalid end date for spreadsheet row. Must have a year if any other date fields are specified.")
                    }
                    trace(e)
                }
            }
            return n.background && (a.background = n.background.match(/^(https?:)?\/\/?/) ? {
                url: n.background
            } : {
                color: n.background
            }), a
        }
        var a = function(e) {
                if ("undefined" == typeof e.feed.entry || 0 == e.feed.entry.length) throw new t.Error("empty_feed_err");
                var a = e.feed.entry[0];
                if ("undefined" != typeof a.gsx$startdate) {
                    for (var s = ["startdate", "enddate", "headline", "text", "media", "mediacredit", "mediacaption", "mediathumbnail", "media", "type", "tag"], o = 0; o < s.length; o++)
                        if ("undefined" == typeof a["gsx$" + s[o]]) throw new t.Error("invalid_data_format_err");
                    return i
                }
                if ("undefined" != typeof a.gsx$year) {
                    for (var r = ["month", "day", "time", "endmonth", "endyear", "endday", "endtime", "displaydate", "headline", "text", "media", "mediacredit", "mediacaption", "mediathumbnail", "type", "group", "background"], o = 0; o < r.length; o++)
                        if ("undefined" == typeof a["gsx$" + r[o]]) throw new t.Error("invalid_data_format_err");
                    return n
                }
            },
            s = function(t) {
                return "https://spreadsheets.google.com/feeds/list/" + t.key + "/1/public/values?alt=json"
            },
            o = function(i) {
                var i = s(e(i)),
                    n = t.ajax({
                        url: i,
                        async: !1
                    });
                return n = JSON.parse(n.responseText), r(n)
            },
            r = function(t) {
                for (var e = {
                        events: [],
                        errors: [],
                        warnings: [],
                        eras: []
                    }, i = a(t), n = 0; n < t.feed.entry.length; n++) try {
                    var s = i(t.feed.entry[n]);
                    if (s) {
                        var o = "event";
                        "undefined" != typeof s.type && (o = s.type, delete s.type), "title" == o ? e.title ? (e.warnings.push("Multiple title slides detected."), e.events.push(s)) : e.title = s : "era" == o ? e.eras.push(s) : e.events.push(s)
                    }
                } catch (r) {
                    r.message && (r = r.message), e.errors.push(r + " [" + n + "]")
                }
                return e
            },
            l = function(i, n) {
                var a, s = e(i);
                if (s) {
                    try {
                        var r = o(i)
                    } catch (l) {
                        return a = new t.TimelineConfig, a.logError("NetworkError" == l.name ? new t.Error("network_err") : "TL.Error" == l.name ? l : new t.Error("unknown_read_err", l.name)), void n(a)
                    }
                    if (a = new t.TimelineConfig(r), r.errors)
                        for (var h = 0; h < r.errors.length; h++) a.logError(r.errors[h]);
                    n(a)
                } else t.getJSON(i, function(e) {
                    try {
                        a = new t.TimelineConfig(e)
                    } catch (i) {
                        a = new t.TimelineConfig, a.logError(i)
                    }
                    n(a)
                })
            };
        t.ConfigFactory = {
            parseGoogleSpreadsheetURL: e,
            googleFeedJSONtoTimelineJSON: r,
            fromGoogle: function(t) {
                return console.warn("TL.ConfigFactory.fromGoogle is deprecated and will be removed soon. Use TL.ConfigFactory.makeConfig(url,callback)"), o(t)
            },
            makeConfig: l
        }
    }(TL), TL.Language = function(t) {
        for (k in TL.Language.languages.en) this[k] = TL.Language.languages.en[k];
        if (t && t.language && "string" == typeof t.language && "en" != t.language) {
            var e = t.language;
            if (!(e in TL.Language.languages)) {
                if (/\.json$/.test(e)) var i = e;
                else {
                    var n = "/locale/" + e + ".json",
                        a = t.script_path || TL.Timeline.source_path;
                    /\/$/.test(a) && (n = n.substr(1));
                    var i = a + n
                }
                var s = TL.ajax({
                    url: i,
                    async: !1
                });
                if (200 != s.status) throw "Could not load language [" + e + "]: " + s.statusText;
                TL.Language.languages[e] = JSON.parse(s.responseText)
            }
            TL.Util.mergeData(this, TL.Language.languages[e])
        }
    }, TL.Language.formatNumber = function(t, e) {
        if (e.match(/%(\.(\d+))?f/)) {
            var i = e.match(/%(\.(\d+))?f/),
                n = i[0];
            return i[2] && (t = t.toFixed(i[2])), e.replace(n, t)
        }
        return e
    }, TL.Language.prototype.mergeData = function(t) {
        for (k in TL.Language.languages.en) t[k] && ("object" == typeof this[k] ? TL.Util.mergeData(t[k], this[k]) : this[k] = t[k])
    }, TL.Language.fallback = {
        messages: {}
    }, TL.Language.prototype.getMessage = function(t) {
        return this.messages[t] || TL.Language.fallback.messages[t] || t
    }, TL.Language.prototype._ = TL.Language.prototype.getMessage, TL.Language.prototype.formatDate = function(t, e) {
        return t.constructor == Date ? this.formatJSDate(t, e) : t.constructor == TL.BigYear ? this.formatBigYear(t, e) : t.data && t.data.date_obj ? this.formatDate(t.data.date_obj, e) : (trace("Unfamiliar date presented for formatting"), t.toString())
    }, TL.Language.prototype.formatBigYear = function(t, e) {
        var i = t.year,
            n = this.bigdateformats[e] || this.bigdateformats.fallback;
        if (n) {
            for (var a = 0; a < n.length; a++) {
                var s = n[a];
                if (Math.abs(i / s[0]) > 1) return TL.Language.formatNumber(Math.abs(i / s[0]), s[1])
            }
            return i.toString()
        }
        return trace("Language file dateformats missing cosmological. Falling back."), TL.Language.formatNumber(i, e)
    }, TL.Language.prototype.formatJSDate = function(t, e) {
        var i = this,
            n = function(t, e) {
                var n = i.period_labels[t];
                if (n) var t = 12 > e ? n[0] : n[1];
                return "<span class='tl-timeaxis-timesuffix'>" + t + "</span>"
            },
            a = !1,
            s = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            o = /[^-+\dA-Z]/g;
        e || (e = "full");
        var r = this.dateformats[e] || TL.Language.fallback.dateformats[e];
        r || (r = e);
        var l = a ? "getUTC" : "get",
            h = t[l + "Date"](),
            d = t[l + "Day"](),
            c = t[l + "Month"](),
            u = t[l + "FullYear"](),
            m = t[l + "Hours"](),
            _ = t[l + "Minutes"](),
            f = t[l + "Seconds"](),
            p = t[l + "Milliseconds"](),
            g = a ? 0 : t.getTimezoneOffset(),
            v = {
                d: h,
                dd: TL.Util.pad(h),
                ddd: this.date.day_abbr[d],
                dddd: this.date.day[d],
                m: c + 1,
                mm: TL.Util.pad(c + 1),
                mmm: this.date.month_abbr[c],
                mmmm: this.date.month[c],
                yy: String(u).slice(2),
                yyyy: 0 > u && this.has_negative_year_modifier() ? Math.abs(u) : u,
                h: m % 12 || 12,
                hh: TL.Util.pad(m % 12 || 12),
                H: m,
                HH: TL.Util.pad(m),
                M: _,
                MM: TL.Util.pad(_),
                s: f,
                ss: TL.Util.pad(f),
                l: TL.Util.pad(p, 3),
                L: TL.Util.pad(p > 99 ? Math.round(p / 10) : p),
                t: n("t", m),
                tt: n("tt", m),
                T: n("T", m),
                TT: n("TT", m),
                Z: a ? "UTC" : (String(t).match(s) || [""]).pop().replace(o, ""),
                o: (g > 0 ? "-" : "+") + TL.Util.pad(100 * Math.floor(Math.abs(g) / 60) + Math.abs(g) % 60, 4),
                S: ["th", "st", "nd", "rd"][h % 10 > 3 ? 0 : (h % 100 - h % 10 != 10) * h % 10]
            },
            y = r.replace(TL.Language.DATE_FORMAT_TOKENS, function(t) {
                return t in v ? v[t] : t.slice(1, t.length - 1)
            });
        return this._applyEra(y, u)
    }, TL.Language.prototype.has_negative_year_modifier = function() {
        return Boolean(this.era_labels.negative_year.prefix || this.era_labels.negative_year.suffix)
    }, TL.Language.prototype._applyEra = function(t, e) {
        var i = 0 > e ? this.era_labels.negative_year : this.era_labels.positive_year,
            n = "";
        return i.prefix && (n += "<span>" + i.prefix + "</span> "), n += t, i.suffix && (n += " <span>" + i.suffix + "</span>"), n
    }, TL.Language.DATE_FORMAT_TOKENS = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, TL.Language.languages = {
        en: {
            name: "English",
            lang: "en",
            api: {
                wikipedia: "en"
            },
            messages: {
                loading: "Loading",
                wikipedia: "From Wikipedia, the free encyclopedia",
                error: "Error",
                contract_timeline: "Contract Timeline",
                return_to_title: "Return to Title",
                loading_content: "Loading Content",
                expand_timeline: "Expand Timeline",
                loading_timeline: "Loading Timeline... ",
                swipe_to_navigate: "Swipe to Navigate<br><span class='tl-button'>OK</span>",
                unknown_read_err: "An unexpected error occurred trying to read your spreadsheet data",
                network_err: "Unable to read your Google Spreadsheet. Make sure you have published it to the web.",
                empty_feed_err: "No data entries found",
                missing_start_date_err: "Missing start_date",
                invalid_data_format_err: "Header row has been modified.",
                date_compare_err: "Can't compare TL.Dates on different scales",
                invalid_scale_err: "Invalid scale",
                invalid_date_err: "Invalid date: month, day and year must be numbers.",
                invalid_separator_error: "Invalid time: misuse of : or . as separator.",
                invalid_hour_err: "Invalid time (hour)",
                invalid_minute_err: "Invalid time (minute)",
                invalid_second_err: "Invalid time (second)",
                invalid_fractional_err: "Invalid time (fractional seconds)",
                invalid_second_fractional_err: "Invalid time (seconds and fractional seconds)",
                invalid_year_err: "Invalid year",
                flickr_notfound_err: "Photo not found or private",
                flickr_invalidurl_err: "Invalid Flickr URL",
                imgur_invalidurl_err: "Invalid Imgur URL",
                twitter_invalidurl_err: "Invalid Twitter URL",
                twitter_load_err: "Unable to load Tweet",
                twitterembed_invalidurl_err: "Invalid Twitter Embed url",
                wikipedia_load_err: "Unable to load Wikipedia entry",
                youtube_invalidurl_err: "Invalid YouTube URL",
                template_value_err: "No value provided for variable",
                invalid_rgb_err: "Invalid RGB argument",
                time_scale_scale_err: "Don't know how to get date from time for scale",
                axis_helper_no_options_err: "Axis helper must be configured with options",
                axis_helper_scale_err: "No AxisHelper available for scale",
                invalid_integer_option: "Invalid option value—must be a whole number."
            },
            date: {
                month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                month_abbr: ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
                day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                day_abbr: ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."]
            },
            era_labels: {
                positive_year: {
                    prefix: "",
                    suffix: ""
                },
                negative_year: {
                    prefix: "",
                    suffix: "BCE"
                }
            },
            period_labels: {
                t: ["a", "p"],
                tt: ["am", "pm"],
                T: ["A", "P"],
                TT: ["AM", "PM"]
            },
            dateformats: {
                year: "yyyy",
                month_short: "mmm",
                month: "mmmm yyyy",
                full_short: "mmm d",
                full: "mmmm d',' yyyy",
                time: "h:MM:ss TT' <small>'mmmm d',' yyyy'</small>'",
                time_short: "h:MM:ss TT",
                time_no_seconds_short: "h:MM TT",
                time_no_minutes_short: "h TT",
                time_no_seconds_small_date: "h:MM TT' <small>'mmmm d',' yyyy'</small>'",
                time_milliseconds: "l",
                full_long: "mmm d',' yyyy 'at' h:MM TT",
                full_long_small_date: "h:MM TT' <small>mmm d',' yyyy'</small>'"
            },
            bigdateformats: {
                fallback: [
                    [1e9, "%.2f billion years ago"],
                    [1e6, "%.1f million years ago"],
                    [1e3, "%.1f thousand years ago"],
                    [1, "%f years ago"]
                ],
                compact: [
                    [1e9, "%.2f bya"],
                    [1e6, "%.1f mya"],
                    [1e3, "%.1f kya"],
                    [1, "%f years ago"]
                ],
                verbose: [
                    [1e9, "%.2f billion years ago"],
                    [1e6, "%.1f million years ago"],
                    [1e3, "%.1f thousand years ago"],
                    [1, "%f years ago"]
                ]
            }
        }
    }, TL.Language.fallback = new TL.Language, TL.I18NMixins = {
        getLanguage: function() {
            return this.options && this.options.language ? this.options.language : (trace("Expected a language option"), TL.Language.fallback)
        },
        _: function(t) {
            return this.getLanguage()._(t)
        }
    }, TL.Easings = {
        ease: [.25, .1, .25, 1],
        linear: [0, 0, 1, 1],
        easein: [.42, 0, 1, 1],
        easeout: [0, 0, .58, 1],
        easeinout: [.42, 0, .58, 1]
    }, TL.Ease = {
        KeySpline: function(t) {
            function e(t, e) {
                return 1 - 3 * e + 3 * t
            }

            function i(t, e) {
                return 3 * e - 6 * t
            }

            function n(t) {
                return 3 * t
            }

            function a(t, a, s) {
                return ((e(a, s) * t + i(a, s)) * t + n(a)) * t
            }

            function s(t, a, s) {
                return 3 * e(a, s) * t * t + 2 * i(a, s) * t + n(a)
            }

            function o(e) {
                for (var i = e, n = 0; 4 > n; ++n) {
                    var o = s(i, t[0], t[2]);
                    if (0 == o) return i;
                    var r = a(i, t[0], t[2]) - e;
                    i -= r / o
                }
                return i
            }
            this.get = function(e) {
                return t[0] == t[1] && t[2] == t[3] ? e : a(o(e), t[1], t[3])
            }
        },
        easeInSpline: function(t) {
            var e = new TL.Ease.KeySpline(TL.Easings.easein);
            return e.get(t)
        },
        easeInOutExpo: function(t) {
            var e = new TL.Ease.KeySpline(TL.Easings.easein);
            return e.get(t)
        },
        easeOut: function(t) {
            return Math.sin(t * Math.PI / 2)
        },
        easeOutStrong: function(t) {
            return 1 == t ? 1 : 1 - Math.pow(2, -10 * t)
        },
        easeIn: function(t) {
            return t * t
        },
        easeInStrong: function(t) {
            return 0 == t ? 0 : Math.pow(2, 10 * (t - 1))
        },
        easeOutBounce: function(t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        },
        easeInBack: function(t) {
            var e = 1.70158;
            return t * t * ((e + 1) * t - e)
        },
        easeOutBack: function(t) {
            var e = 1.70158;
            return (t -= 1) * t * ((e + 1) * t + e) + 1
        },
        bounce: function(t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        },
        bouncePast: function(t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 2 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 2 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 2 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        },
        swingTo: function(t) {
            var e = 1.70158;
            return (t -= 1) * t * ((e + 1) * t + e) + 1
        },
        swingFrom: function(t) {
            var e = 1.70158;
            return t * t * ((e + 1) * t - e)
        },
        elastic: function(t) {
            return -1 * Math.pow(4, -8 * t) * Math.sin(2 * (6 * t - 1) * Math.PI / 2) + 1
        },
        spring: function(t) {
            return 1 - Math.cos(4.5 * t * Math.PI) * Math.exp(6 * -t)
        },
        blink: function(t, e) {
            return Math.round(t * (e || 5)) % 2
        },
        pulse: function(t, e) {
            return -Math.cos(t * ((e || 5) - .5) * 2 * Math.PI) / 2 + .5
        },
        wobble: function(t) {
            return -Math.cos(t * Math.PI * 9 * t) / 2 + .5
        },
        sinusoidal: function(t) {
            return -Math.cos(t * Math.PI) / 2 + .5
        },
        flicker: function(t) {
            var t = t + (Math.random() - .5) / 5;
            return easings.sinusoidal(0 > t ? 0 : t > 1 ? 1 : t)
        },
        mirror: function(t) {
            return easings.sinusoidal(.5 > t ? 2 * t : 1 - 2 * (t - .5))
        },
        easeInQuad: function(t) {
            return t * t
        },
        easeOutQuad: function(t) {
            return t * (2 - t)
        },
        easeInOutQuad: function(t) {
            return .5 > t ? 2 * t * t : -1 + (4 - 2 * t) * t
        },
        easeInCubic: function(t) {
            return t * t * t
        },
        easeOutCubic: function(t) {
            return --t * t * t + 1
        },
        easeInOutCubic: function(t) {
            return .5 > t ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
        },
        easeInQuart: function(t) {
            return t * t * t * t
        },
        easeOutQuart: function(t) {
            return 1 - --t * t * t * t
        },
        easeInOutQuart: function(t) {
            return .5 > t ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
        },
        easeInQuint: function(t) {
            return t * t * t * t * t
        },
        easeOutQuint: function(t) {
            return 1 + --t * t * t * t * t
        },
        easeInOutQuint: function(t) {
            return .5 > t ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
        }
    }, TL.Animate = function(t, e) {
        var i = new tlanimate(t, e);
        return i
    }, window.tlanimate = function() {
        function t(t, e, i) {
            if (Array.prototype.indexOf) return t.indexOf(e);
            for (i = 0; i < t.length; ++i)
                if (t[i] === e) return i
        }

        function e(t) {
            var i, n = P.length;
            for (T && t > 1e12 && (t = L()), b && (t = L()), i = n; i--;) P[i](t);
            P.length && O(e)
        }

        function i(t) {
            1 === P.push(t) && O(e)
        }

        function n(e) {
            var i, n = t(P, e);
            n >= 0 && (i = P.slice(n + 1), P.length = n, P = P.concat(i))
        }

        function a(t, e) {
            var i, n = {};
            return (i = t.match(E)) && (n.rotate = f(i[1], e ? e.rotate : null)), (i = t.match(S)) && (n.scale = f(i[1], e ? e.scale : null)), (i = t.match(N)) && (n.skewx = f(i[1], e ? e.skewx : null), n.skewy = f(i[3], e ? e.skewy : null)), (i = t.match(C)) && (n.translatex = f(i[1], e ? e.translatex : null), n.translatey = f(i[3], e ? e.translatey : null)), n
        }

        function s(t) {
            var e = "";
            return "rotate" in t && (e += "rotate(" + t.rotate + "deg) "), "scale" in t && (e += "scale(" + t.scale + ") "), "translatex" in t && (e += "translate(" + t.translatex + "px," + t.translatey + "px) "), "skewx" in t && (e += "skew(" + t.skewx + "deg," + t.skewy + "deg)"), e
        }

        function o(t, e, i) {
            return "#" + (1 << 24 | t << 16 | e << 8 | i).toString(16).slice(1)
        }

        function r(t) {
            var e = t.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            return (e ? o(e[1], e[2], e[3]) : t).replace(/#(\w)(\w)(\w)$/, "#$1$1$2$2$3$3")
        }

        function l(t) {
            return t.replace(/-(.)/g, function(t, e) {
                return e.toUpperCase()
            })
        }

        function h(t) {
            return "function" == typeof t
        }

        function d(t) {
            return Math.sin(t * Math.PI / 2)
        }

        function c(t, e, a, s, o, r) {
            function l(t) {
                var i = t - _;
                return i > c || f ? (r = isFinite(r) ? r : 1, f ? g && e(r) : e(r), n(l), a && a.apply(u)) : void e(isFinite(r) ? m * s(i / c) + o : s(i / c))
            }
            s = h(s) ? s : p.easings[s] || d;
            var c = t || x,
                u = this,
                m = r - o,
                _ = L(),
                f = 0,
                g = 0;
            return i(l), {
                stop: function(t) {
                    f = 1, g = t, t || (a = null)
                }
            }
        }

        function u(t, e) {
            var i, n, a = t.length,
                s = [];
            for (i = 0; a > i; ++i) s[i] = [t[i][0], t[i][1]];
            for (n = 1; a > n; ++n)
                for (i = 0; a - n > i; ++i) s[i][0] = (1 - e) * s[i][0] + e * s[parseInt(i + 1, 10)][0], s[i][1] = (1 - e) * s[i][1] + e * s[parseInt(i + 1, 10)][1];
            return [s[0][0], s[0][1]]
        }

        function m(t, e, i) {
            var n, a, s, o, r = [];
            for (n = 0; 6 > n; n++) s = Math.min(15, parseInt(e.charAt(n), 16)), o = Math.min(15, parseInt(i.charAt(n), 16)), a = Math.floor((o - s) * t + s), a = a > 15 ? 15 : 0 > a ? 0 : a, r[n] = a.toString(16);
            return "#" + r.join("")
        }

        function _(t, e, i, n, a, s, o) {
            if ("transform" == a) {
                o = {};
                for (var r in i[s][a]) o[r] = r in n[s][a] ? Math.round(((n[s][a][r] - i[s][a][r]) * t + i[s][a][r]) * x) / x : i[s][a][r];
                return o
            }
            return "string" == typeof i[s][a] ? m(t, i[s][a], n[s][a]) : (o = Math.round(((n[s][a] - i[s][a]) * t + i[s][a]) * x) / x, a in I || (o += e[s][a] || "px"), o)
        }

        function f(t, e, i, n, a) {
            return (i = D.exec(t)) ? (a = parseFloat(i[2])) && e + ("+" == i[1] ? 1 : -1) * a : parseFloat(t)
        }

        function p(t, e) {
            var i, n, o, d = t ? d = isFinite(t.length) ? t : [t] : [],
                m = e.complete,
                p = e.duration,
                g = e.easing,
                v = e.bezier,
                y = [],
                T = [],
                L = [],
                w = [];
            for (v && (n = e.left, o = e.top, delete e.right, delete e.bottom, delete e.left, delete e.top), i = d.length; i--;) {
                if (y[i] = {}, T[i] = {}, L[i] = {}, v) {
                    var b = j(d[i], "left"),
                        x = j(d[i], "top"),
                        D = [f(h(n) ? n(d[i]) : n || 0, parseFloat(b)), f(h(o) ? o(d[i]) : o || 0, parseFloat(x))];
                    w[i] = h(v) ? v(d[i], D) : v, w[i].push(D), w[i].unshift([parseInt(b, 10), parseInt(x, 10)])
                }
                for (var E in e) {
                    switch (E) {
                        case "complete":
                        case "duration":
                        case "easing":
                        case "bezier":
                            continue
                    }
                    var S, N = j(d[i], E),
                        C = h(e[E]) ? e[E](d[i]) : e[E];
                    "string" != typeof C || !k.test(C) || k.test(N) ? (y[i][E] = "transform" == E ? a(N) : "string" == typeof C && k.test(C) ? r(N).slice(1) : parseFloat(N), T[i][E] = "transform" == E ? a(C, y[i][E]) : "string" == typeof C && "#" == C.charAt(0) ? r(C).slice(1) : f(C, parseFloat(N)), "string" == typeof C && (S = C.match(M)) && (L[i][E] = S[1])) : delete e[E]
                }
            }
            return c.apply(d, [p, function(t, n, a) {
                for (i = d.length; i--;) {
                    v && (a = u(w[i], t), d[i].style.left = a[0] + "px", d[i].style.top = a[1] + "px");
                    for (var o in e) n = _(t, L, y, T, o, i), "transform" == o ? d[i].style[A] = s(n) : "opacity" != o || U ? d[i].style[l(o)] = n : d[i].style.filter = "alpha(opacity=" + 100 * n + ")"
                }
            }, m, g])
        }
        var g = document,
            v = window,
            y = v.performance,
            T = y && (y.now || y.webkitNow || y.msNow || y.mozNow),
            L = T ? function() {
                return T.call(y)
            } : function() {
                return +new Date
            },
            w = g.documentElement,
            b = !1,
            x = 1e3,
            k = /^rgb\(|#/,
            D = /^([+\-])=([\d\.]+)/,
            M = /^(?:[\+\-]=?)?\d+(?:\.\d+)?(%|in|cm|mm|em|ex|pt|pc|px)$/,
            E = /rotate\(((?:[+\-]=)?([\-\d\.]+))deg\)/,
            S = /scale\(((?:[+\-]=)?([\d\.]+))\)/,
            N = /skew\(((?:[+\-]=)?([\-\d\.]+))deg, ?((?:[+\-]=)?([\-\d\.]+))deg\)/,
            C = /translate\(((?:[+\-]=)?([\-\d\.]+))px, ?((?:[+\-]=)?([\-\d\.]+))px\)/,
            I = {
                lineHeight: 1,
                zoom: 1,
                zIndex: 1,
                opacity: 1,
                transform: 1
            },
            A = function() {
                var t, e = g.createElement("a").style,
                    i = ["webkitTransform", "MozTransform", "OTransform", "msTransform", "Transform"];
                for (t = 0; t < i.length; t++)
                    if (i[t] in e) return i[t]
            }(),
            U = function() {
                return "undefined" != typeof g.createElement("a").style.opacity
            }(),
            j = g.defaultView && g.defaultView.getComputedStyle ? function(t, e) {
                e = "transform" == e ? A : e, e = l(e);
                var i = null,
                    n = g.defaultView.getComputedStyle(t, "");
                return n && (i = n[e]), t.style[e] || i
            } : w.currentStyle ? function(t, e) {
                if (e = l(e), "opacity" == e) {
                    var i = 100;
                    try {
                        i = t.filters["DXImageTransform.Microsoft.Alpha"].opacity
                    } catch (n) {
                        try {
                            i = t.filters("alpha").opacity
                        } catch (a) {}
                    }
                    return i / 100
                }
                var s = t.currentStyle ? t.currentStyle[e] : null;
                return t.style[e] || s
            } : function(t, e) {
                return t.style[l(e)]
            },
            O = function() {
                return v.requestAnimationFrame || v.webkitRequestAnimationFrame || v.mozRequestAnimationFrame || v.msRequestAnimationFrame || v.oRequestAnimationFrame || function(t) {
                    v.setTimeout(function() {
                        t(+new Date)
                    }, 17)
                }
            }(),
            P = [];
        return O(function(t) {
            b = t > 1e12 != L() > 1e12
        }), p.tween = c, p.getStyle = j, p.bezier = u, p.transform = A, p.parseTransform = a, p.formatTransform = s, p.easings = {}, p
    }(), TL.Point = function(t, e, i) {
        this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e
    }, TL.Point.prototype = {
        add: function(t) {
            return this.clone()._add(t)
        },
        _add: function(t) {
            return this.x += t.x, this.y += t.y, this
        },
        subtract: function(t) {
            return this.clone()._subtract(t)
        },
        _subtract: function(t) {
            return this.x -= t.x, this.y -= t.y, this
        },
        divideBy: function(t, e) {
            return new TL.Point(this.x / t, this.y / t, e)
        },
        multiplyBy: function(t) {
            return new TL.Point(this.x * t, this.y * t)
        },
        distanceTo: function(t) {
            var e = t.x - this.x,
                i = t.y - this.y;
            return Math.sqrt(e * e + i * i)
        },
        round: function() {
            return this.clone()._round()
        },
        _round: function() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this
        },
        clone: function() {
            return new TL.Point(this.x, this.y)
        },
        toString: function() {
            return "Point(" + TL.Util.formatNum(this.x) + ", " + TL.Util.formatNum(this.y) + ")"
        }
    }, TL.DomMixins = {
        show: function(t) {
            t || (this._el.container.style.display = "block")
        },
        hide: function() {
            this._el.container.style.display = "none"
        },
        addTo: function(t) {
            t.appendChild(this._el.container), this.onAdd()
        },
        removeFrom: function(t) {
            t.removeChild(this._el.container), this.onRemove()
        },
        animatePosition: function(t, e) {
            var i = {
                duration: this.options.duration,
                easing: this.options.ease
            };
            for (var n in t) t.hasOwnProperty(n) && (i[n] = t[n] + "px");
            this.animator && this.animator.stop(), this.animator = TL.Animate(e, i)
        },
        onLoaded: function() {
            this.fire("loaded", this.data)
        },
        onAdd: function() {
            this.fire("added", this.data)
        },
        onRemove: function() {
            this.fire("removed", this.data)
        },
        setPosition: function(t, e) {
            for (var i in t) t.hasOwnProperty(i) && (e ? e.style[i] = t[i] + "px" : this._el.container.style[i] = t[i] + "px")
        },
        getPosition: function() {
            return TL.Dom.getPosition(this._el.container)
        }
    }, TL.Dom = {
        get: function(t) {
            return "string" == typeof t ? document.getElementById(t) : t
        },
        getByClass: function(t) {
            return t ? document.getElementsByClassName(t) : void 0
        },
        create: function(t, e, i) {
            var n = document.createElement(t);
            return n.className = e, i && i.appendChild(n), n
        },
        createText: function(t, e) {
            var i = document.createTextNode(t);
            return e && e.appendChild(i), i
        },
        getTranslateString: function(t) {
            return TL.Dom.TRANSLATE_OPEN + t.x + "px," + t.y + "px" + TL.Dom.TRANSLATE_CLOSE
        },
        setPosition: function(t, e) {
            t._tl_pos = e, TL.Browser.webkit3d ? (t.style[TL.Dom.TRANSFORM] = TL.Dom.getTranslateString(e), TL.Browser.android && (t.style["-webkit-perspective"] = "1000", t.style["-webkit-backface-visibility"] = "hidden")) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
        },
        getPosition: function(t) {
            for (var e = {
                    x: 0,
                    y: 0
                }; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop);) e.x += t.offsetLeft, e.y += t.offsetTop, t = t.offsetParent;
            return e
        },
        testProp: function(t) {
            for (var e = document.documentElement.style, i = 0; i < t.length; i++)
                if (t[i] in e) return t[i];
            return !1
        }
    }, TL.Util.mergeData(TL.Dom, {
        TRANSITION: TL.Dom.testProp(["transition", "webkitTransition", "OTransition", "MozTransition", "msTransition"]),
        TRANSFORM: TL.Dom.testProp(["transformProperty", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]),
        TRANSLATE_OPEN: "translate" + (TL.Browser.webkit3d ? "3d(" : "("),
        TRANSLATE_CLOSE: TL.Browser.webkit3d ? ",0)" : ")"
    }), TL.DomUtil = {
        get: function(t) {
            return "string" == typeof t ? document.getElementById(t) : t
        },
        getStyle: function(t, e) {
            var i = t.style[e];
            if (!i && t.currentStyle && (i = t.currentStyle[e]), !i || "auto" === i) {
                var n = document.defaultView.getComputedStyle(t, null);
                i = n ? n[e] : null
            }
            return "auto" === i ? null : i
        },
        getViewportOffset: function(t) {
            var e = 0,
                i = 0,
                n = t,
                a = document.body;
            do {
                if (e += n.offsetTop || 0, i += n.offsetLeft || 0, n.offsetParent === a && "absolute" === TL.DomUtil.getStyle(n, "position")) break;
                n = n.offsetParent
            } while (n);
            n = t;
            do {
                if (n === a) break;
                e -= n.scrollTop || 0, i -= n.scrollLeft || 0, n = n.parentNode
            } while (n);
            return new TL.Point(i, e)
        },
        create: function(t, e, i) {
            var n = document.createElement(t);
            return n.className = e, i && i.appendChild(n), n
        },
        disableTextSelection: function() {
            document.selection && document.selection.empty && document.selection.empty(), this._onselectstart || (this._onselectstart = document.onselectstart, document.onselectstart = TL.Util.falseFn)
        },
        enableTextSelection: function() {
            document.onselectstart = this._onselectstart, this._onselectstart = null
        },
        hasClass: function(t, e) {
            return t.className.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(t.className)
        },
        addClass: function(t, e) {
            TL.DomUtil.hasClass(t, e) || (t.className += (t.className ? " " : "") + e)
        },
        removeClass: function(t, e) {
            t.className = t.className.replace(/(\S+)\s*/g, function(t, i) {
                return i === e ? "" : t
            }).replace(/^\s+/, "")
        },
        setOpacity: function(t, e) {
            TL.Browser.ie ? t.style.filter = "alpha(opacity=" + Math.round(100 * e) + ")" : t.style.opacity = e
        },
        testProp: function(t) {
            for (var e = document.documentElement.style, i = 0; i < t.length; i++)
                if (t[i] in e) return t[i];
            return !1
        },
        getTranslateString: function(t) {
            return TL.DomUtil.TRANSLATE_OPEN + t.x + "px," + t.y + "px" + TL.DomUtil.TRANSLATE_CLOSE
        },
        getScaleString: function(t, e) {
            var i = TL.DomUtil.getTranslateString(e),
                n = " scale(" + t + ") ",
                a = TL.DomUtil.getTranslateString(e.multiplyBy(-1));
            return i + n + a
        },
        setPosition: function(t, e) {
            t._tl_pos = e, TL.Browser.webkit3d ? (t.style[TL.DomUtil.TRANSFORM] = TL.DomUtil.getTranslateString(e), TL.Browser.android && (t.style["-webkit-perspective"] = "1000", t.style["-webkit-backface-visibility"] = "hidden")) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
        },
        getPosition: function(t) {
            return t._tl_pos
        }
    }, TL.DomEvent = {
        addListener: function(t, e, i, n) {
            var a = TL.Util.stamp(i),
                s = "_tl_" + e + a;
            if (!t[s]) {
                var o = function(e) {
                    return i.call(n || t, e || TL.DomEvent._getEvent())
                };
                if (TL.Browser.touch && "dblclick" === e && this.addDoubleTapListener) this.addDoubleTapListener(t, o, a);
                else if ("addEventListener" in t)
                    if ("mousewheel" === e) t.addEventListener("DOMMouseScroll", o, !1), t.addEventListener(e, o, !1);
                    else if ("mouseenter" === e || "mouseleave" === e) {
                    var r = o,
                        l = "mouseenter" === e ? "mouseover" : "mouseout";
                    o = function(e) {
                        return TL.DomEvent._checkMouse(t, e) ? r(e) : void 0
                    }, t.addEventListener(l, o, !1)
                } else t.addEventListener(e, o, !1);
                else "attachEvent" in t && t.attachEvent("on" + e, o);
                t[s] = o
            }
        },
        removeListener: function(t, e, i) {
            var n = TL.Util.stamp(i),
                a = "_tl_" + e + n,
                s = t[a];
            s && (TL.Browser.touch && "dblclick" === e && this.removeDoubleTapListener ? this.removeDoubleTapListener(t, n) : "removeEventListener" in t ? "mousewheel" === e ? (t.removeEventListener("DOMMouseScroll", s, !1), t.removeEventListener(e, s, !1)) : "mouseenter" === e || "mouseleave" === e ? t.removeEventListener("mouseenter" === e ? "mouseover" : "mouseout", s, !1) : t.removeEventListener(e, s, !1) : "detachEvent" in t && t.detachEvent("on" + e, s), t[a] = null)
        },
        _checkMouse: function(t, e) {
            var i = e.relatedTarget;
            if (!i) return !0;
            try {
                for (; i && i !== t;) i = i.parentNode
            } catch (n) {
                return !1
            }
            return i !== t
        },
        _getEvent: function() {
            var t = window.event;
            if (!t)
                for (var e = arguments.callee.caller; e && (t = e.arguments[0], !t || window.Event !== t.constructor);) e = e.caller;
            return t
        },
        stopPropagation: function(t) {
            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
        },
        disableClickPropagation: function(t) {
            TL.DomEvent.addListener(t, TL.Draggable.START, TL.DomEvent.stopPropagation), TL.DomEvent.addListener(t, "click", TL.DomEvent.stopPropagation), TL.DomEvent.addListener(t, "dblclick", TL.DomEvent.stopPropagation)
        },
        preventDefault: function(t) {
            t.preventDefault ? t.preventDefault() : t.returnValue = !1
        },
        stop: function(t) {
            TL.DomEvent.preventDefault(t), TL.DomEvent.stopPropagation(t)
        },
        getWheelDelta: function(t) {
            var e = 0;
            return t.wheelDelta && (e = t.wheelDelta / 120), t.detail && (e = -t.detail / 3), e
        }
    }, TL.StyleSheet = TL.Class.extend({
        includes: [TL.Events],
        _el: {},
        initialize: function() {
            this.style = document.createElement("style"), this.style.appendChild(document.createTextNode("")), document.head.appendChild(this.style), this.sheet = this.style.sheet
        },
        addRule: function(t, e, i) {
            var n = 0;
            i && (n = i), "insertRule" in this.sheet ? this.sheet.insertRule(t + "{" + e + "}", n) : "addRule" in this.sheet && this.sheet.addRule(t, e, n)
        },
        onLoaded: function() {
            this._state.loaded = !0, this.fire("loaded", this.data)
        }
    }), TL.Date = TL.Class.extend({
        initialize: function(t, e, i) {
            "number" == typeof t ? this.data = {
                format: "yyyy mmmm",
                date_obj: new Date(t)
            } : Date == t.constructor ? this.data = {
                format: "yyyy mmmm",
                date_obj: t
            } : (this.data = JSON.parse(JSON.stringify(t)), this._createDateObj()), this._setFormat(e, i)
        },
        setDateFormat: function(t) {
            this.data.format = t
        },
        getDisplayDate: function(t, e) {
            if (this.data.display_date) return this.data.display_date;
            t || (t = TL.Language.fallback), t.constructor != TL.Language && (trace("First argument to getDisplayDate must be TL.Language"), t = TL.Language.fallback);
            var i = e || this.data.format;
            return t.formatDate(this.data.date_obj, i)
        },
        getMillisecond: function() {
            return this.getTime()
        },
        getTime: function() {
            return this.data.date_obj.getTime()
        },
        isBefore: function(t) {
            if (!this.data.date_obj.constructor == t.data.date_obj.constructor) throw new TL.Error("date_compare_err");
            return "isBefore" in this.data.date_obj ? this.data.date_obj.isBefore(t.data.date_obj) : this.data.date_obj < t.data.date_obj
        },
        isAfter: function(t) {
            if (!this.data.date_obj.constructor == t.data.date_obj.constructor) throw new TL.Error("date_compare_err");
            return "isAfter" in this.data.date_obj ? this.data.date_obj.isAfter(t.data.date_obj) : this.data.date_obj > t.data.date_obj
        },
        floor: function(t) {
            for (var e = new Date(this.data.date_obj.getTime()), i = 0; i < TL.Date.SCALES.length; i++)
                if (TL.Date.SCALES[i][2](e), TL.Date.SCALES[i][0] == t) return new TL.Date(e);
            throw new TL.Error("invalid_scale_err", t)
        },
        _getDateData: function() {
            var t = {
                year: 0,
                month: 1,
                day: 1,
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0
            };
            TL.Util.mergeData(t, this.data);
            var e = TL.Date.DATE_PARTS;
            for (var i in e) {
                var n = TL.Util.trim(t[e[i]]);
                if (!n.match(/^-?\d*$/)) throw new TL.Error("invalid_date_err", e[i] + " = '" + t[e[i]] + "'");
                var a = parseInt(t[e[i]]);
                isNaN(a) && (a = 4 == i || 5 == i ? 1 : 0), t[e[i]] = a
            }
            return t.month > 0 && t.month <= 12 && (t.month = t.month - 1), t
        },
        _createDateObj: function() {
            var t = this._getDateData();
            this.data.date_obj = new Date(t.year, t.month, t.day, t.hour, t.minute, t.second, t.millisecond), this.data.date_obj.getFullYear() != t.year && this.data.date_obj.setFullYear(t.year)
        },
        findBestFormat: function(t) {
            for (var e = TL.Date.DATE_PARTS, i = 0; i < e.length; i++)
                if (this.data[e[i]]) return t ? t in TL.Date.BEST_DATEFORMATS || (t = "short") : t = "base", TL.Date.BEST_DATEFORMATS[t][e[i]];
            return ""
        },
        _setFormat: function(t, e) {
            t ? this.data.format = t : this.data.format || (this.data.format = this.findBestFormat()), e ? this.data.format_short = e : this.data.format_short || (this.data.format_short = this.findBestFormat(!0))
        }
    }), TL.Date.makeDate = function(t) {
        var e = new TL.Date(t);
        return isNaN(e.getTime()) ? new TL.BigDate(t) : e
    }, TL.BigYear = TL.Class.extend({
        initialize: function(t) {
            if (this.year = parseInt(t), isNaN(this.year)) throw new TL.Error("invalid_year_err", t)
        },
        isBefore: function(t) {
            return this.year < t.year
        },
        isAfter: function(t) {
            return this.year > t.year
        },
        getTime: function() {
            return this.year
        }
    }),
    function(t) {
        t.SCALES = [
            ["millisecond", 1, function() {}],
            ["second", 1e3, function(t) {
                t.setMilliseconds(0)
            }],
            ["minute", 6e4, function(t) {
                t.setSeconds(0)
            }],
            ["hour", 36e5, function(t) {
                t.setMinutes(0)
            }],
            ["day", 864e5, function(t) {
                t.setHours(0)
            }],
            ["month", 2592e6, function(t) {
                t.setDate(1)
            }],
            ["year", 31536e6, function(t) {
                t.setMonth(0)
            }],
            ["decade", 31536e7, function(t) {
                var e = t.getFullYear();
                t.setFullYear(e - e % 10)
            }],
            ["century", 31536e8, function(t) {
                var e = t.getFullYear();
                t.setFullYear(e - e % 100)
            }],
            ["millennium", 31536e9, function(t) {
                var e = t.getFullYear();
                t.setFullYear(e - e % 1e3)
            }]
        ], t.DATE_PARTS = ["millisecond", "second", "minute", "hour", "day", "month", "year"];
        var e = /^([\+-]?\d+?)(-\d{2}?)?(-\d{2}?)?$/,
            i = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
        t.parseISODate = function(t) {
            var e = new Date(t);
            if (isNaN(e)) throw new TL.Error("invalid_date_err", t);
            return {
                year: e.getFullYear(),
                month: e.getMonth() + 1,
                day: e.getDate(),
                hour: e.getHours(),
                minute: e.getMinutes(),
                second: e.getSeconds(),
                millisecond: e.getMilliseconds()
            }
        }, t.parseDate = function(n) {
            if (n.match(e)) {
                var a = n.match(e).slice(1),
                    s = {
                        year: a[0].replace("+", "")
                    };
                return a[1] && (s.month = a[1].replace("-", "")), a[2] && (s.day = a[2].replace("-", "")), s
            }
            if (n.match(i)) return t.parseISODate(n);
            if (n.match(/^\-?\d+$/)) return {
                year: n
            };
            var o = {};
            if (n.match(/\d+\/\d+\/\d+/)) {
                var r = n.match(/\d+\/\d+\/\d+/)[0];
                n = TL.Util.trim(n.replace(r, ""));
                var l = r.split("/");
                o.month = l[0], o.day = l[1], o.year = l[2]
            }
            if (n.match(/\d+\/\d+/)) {
                var r = n.match(/\d+\/\d+/)[0];
                n = TL.Util.trim(n.replace(r, ""));
                var l = r.split("/");
                o.month = l[0], o.year = l[1]
            }
            if (n.match(":")) {
                var h = n.split(":");
                o.hour = h[0], o.minute = h[1], h[2] && (second_parts = h[2].split("."), o.second = second_parts[0], o.millisecond = second_parts[1])
            }
            return o
        }, t.BEST_DATEFORMATS = {
            base: {
                millisecond: "time_short",
                second: "time",
                minute: "time_no_seconds_small_date",
                hour: "time_no_seconds_small_date",
                day: "full",
                month: "month",
                year: "year",
                decade: "year",
                century: "year",
                millennium: "year",
                age: "fallback",
                epoch: "fallback",
                era: "fallback",
                eon: "fallback",
                eon2: "fallback"
            },
            "short": {
                millisecond: "time_short",
                second: "time_short",
                minute: "time_no_seconds_short",
                hour: "time_no_minutes_short",
                day: "full_short",
                month: "month_short",
                year: "year",
                decade: "year",
                century: "year",
                millennium: "year",
                age: "fallback",
                epoch: "fallback",
                era: "fallback",
                eon: "fallback",
                eon2: "fallback"
            }
        }
    }(TL.Date), TL.BigDate = TL.Date.extend({
        initialize: function(t, e, i) {
            TL.BigYear == t.constructor ? this.data = {
                date_obj: t
            } : (this.data = JSON.parse(JSON.stringify(t)), this._createDateObj()), this._setFormat(e, i)
        },
        _createDateObj: function() {
            var t = this._getDateData();
            this.data.date_obj = new TL.BigYear(t.year)
        },
        floor: function(t) {
            for (var e = 0; e < TL.BigDate.SCALES.length; e++)
                if (TL.BigDate.SCALES[e][0] == t) {
                    var i = TL.BigDate.SCALES[e][2](this.data.date_obj);
                    return new TL.BigDate(i)
                }
            throw new TL.Error("invalid_scale_err", t)
        }
    }),
    function(t) {
        var e = 1e6,
            i = 10 * e,
            n = 10 * i,
            a = 10 * n,
            s = function(t) {
                return function(e) {
                    var i = e.getTime();
                    return new TL.BigYear(Math.floor(i / t) * t)
                }
            };
        t.SCALES = [
            ["year", 1, new s(1)],
            ["decade", 10, new s(10)],
            ["century", 100, new s(100)],
            ["millennium", 1e3, new s(1e3)],
            ["age", e, new s(e)],
            ["epoch", i, new s(i)],
            ["era", n, new s(n)],
            ["eon", a, new s(a)]
        ]
    }(TL.BigDate), TL.DateUtil = {
        get: function(t) {
            return "string" == typeof t ? document.getElementById(t) : t
        },
        sortByDate: function(t, e) {
            var e = e || "start_date";
            t.sort(function(t, i) {
                return t[e].isBefore(i[e]) ? -1 : t[e].isAfter(i[e]) ? 1 : 0
            })
        },
        parseTime: function(t) {
            var e = {
                    hour: null,
                    minute: null,
                    second: null,
                    millisecond: null
                },
                i = null,
                n = t.match(/(\s*[AaPp]\.?[Mm]\.?\s*)$/);
            n && (i = TL.Util.trim(n[0]), t = TL.Util.trim(t.substring(0, t.lastIndexOf(i))));
            var a = [],
                s = t.match(/^\s*(\d{1,2})(\d{2})\s*$/);
            if (s ? a = s.slice(1) : (a = t.split(":"), 1 == a.length && (a = t.split("."))), a.length > 4) throw new TL.Error("invalid_separator_error");
            if (e.hour = parseInt(a[0]), i && "p" == i.toLowerCase()[0] && 12 != e.hour ? e.hour += 12 : i && "a" == i.toLowerCase()[0] && 12 == e.hour && (e.hour = 0), isNaN(e.hour) || e.hour < 0 || e.hour > 23) throw new TL.Error("invalid_hour_err", e.hour);
            if (a.length > 1 && (e.minute = parseInt(a[1]), isNaN(e.minute))) throw new TL.Error("invalid_minute_err", e.minute);
            if (a.length > 2) {
                var o = a[2].split(/[\.,]/);
                if (a = o.concat(a.slice(3)), a.length > 2) throw new TL.Error("invalid_second_fractional_err");
                if (e.second = parseInt(a[0]), isNaN(e.second)) throw new TL.Error("invalid_second_err");
                if (2 == a.length) {
                    var r = parseInt(a[1]);
                    if (isNaN(r)) throw new TL.Error("invalid_fractional_err");
                    e.millisecond = 100 * r
                }
            }
            return e
        },
        SCALE_DATE_CLASSES: {
            human: TL.Date,
            cosmological: TL.BigDate
        }
    }, TL.Draggable = TL.Class.extend({
        includes: TL.Events,
        _el: {},
        mousedrag: {
            down: "mousedown",
            up: "mouseup",
            leave: "mouseleave",
            move: "mousemove"
        },
        touchdrag: {
            down: "touchstart",
            up: "touchend",
            leave: "mouseleave",
            move: "touchmove"
        },
        initialize: function(t, e, i) {
            this._el = {
                drag: t,
                move: t
            }, i && (this._el.move = i), this.options = {
                enable: {
                    x: !0,
                    y: !0
                },
                constraint: {
                    top: !1,
                    bottom: !1,
                    left: !1,
                    right: !1
                },
                momentum_multiplier: 2e3,
                duration: 1e3,
                ease: TL.Ease.easeInOutQuint
            }, this.animator = null, this.dragevent = this.mousedrag, TL.Browser.touch && (this.dragevent = this.touchdrag), this.data = {
                sliding: !1,
                direction: "none",
                pagex: {
                    start: 0,
                    end: 0
                },
                pagey: {
                    start: 0,
                    end: 0
                },
                pos: {
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    }
                },
                new_pos: {
                    x: 0,
                    y: 0
                },
                new_pos_parent: {
                    x: 0,
                    y: 0
                },
                time: {
                    start: 0,
                    end: 0
                },
                touch: !1
            }, TL.Util.mergeData(this.options, e)
        },
        enable: function() {
            this.data.pos.start = 0, this._el.move.style.left = this.data.pos.start.x + "px", this._el.move.style.top = this.data.pos.start.y + "px", this._el.move.style.position = "absolute"
        },
        disable: function() {
            TL.DomEvent.removeListener(this._el.drag, this.dragevent.down, this._onDragStart, this), TL.DomEvent.removeListener(this._el.drag, this.dragevent.up, this._onDragEnd, this)
        },
        stopMomentum: function() {
            this.animator && this.animator.stop()
        },
        updateConstraint: function(t) {
            this.options.constraint = t
        },
        _onDragStart: function(t) {
            TL.Browser.touch ? t.originalEvent ? (this.data.pagex.start = t.originalEvent.touches[0].screenX, this.data.pagey.start = t.originalEvent.touches[0].screenY) : (this.data.pagex.start = t.targetTouches[0].screenX, this.data.pagey.start = t.targetTouches[0].screenY) : (this.data.pagex.start = t.pageX, this.data.pagey.start = t.pageY), this.options.enable.x && (this._el.move.style.left = this.data.pagex.start - this._el.move.offsetWidth / 2 + "px"), this.options.enable.y && (this._el.move.style.top = this.data.pagey.start - this._el.move.offsetHeight / 2 + "px"), this.data.pos.start = TL.Dom.getPosition(this._el.drag), this.data.time.start = (new Date).getTime(), this.fire("dragstart", this.data), TL.DomEvent.addListener(this._el.drag, this.dragevent.move, this._onDragMove, this), TL.DomEvent.addListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this)
        },
        _onDragEnd: function() {
            this.data.sliding = !1, TL.DomEvent.removeListener(this._el.drag, this.dragevent.move, this._onDragMove, this), TL.DomEvent.removeListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this), this.fire("dragend", this.data), this._momentum()
        },
        _onDragMove: function(t) {
            t.preventDefault(), this.data.sliding = !0, TL.Browser.touch ? t.originalEvent ? (this.data.pagex.end = t.originalEvent.touches[0].screenX, this.data.pagey.end = t.originalEvent.touches[0].screenY) : (this.data.pagex.end = t.targetTouches[0].screenX, this.data.pagey.end = t.targetTouches[0].screenY) : (this.data.pagex.end = t.pageX, this.data.pagey.end = t.pageY), this.data.pos.end = TL.Dom.getPosition(this._el.drag), this.data.new_pos.x = -(this.data.pagex.start - this.data.pagex.end - this.data.pos.start.x), this.data.new_pos.y = -(this.data.pagey.start - this.data.pagey.end - this.data.pos.start.y), this.options.enable.x && (this._el.move.style.left = this.data.new_pos.x + "px"), this.options.enable.y && (this._el.move.style.top = this.data.new_pos.y + "px"), this.fire("dragmove", this.data)
        },
        _momentum: function() {
            var t = {
                    x: 0,
                    y: 0,
                    time: 0
                },
                e = {
                    x: 0,
                    y: 0,
                    time: 0
                },
                i = !1;
            TL.Browser.touch, t.time = 10 * ((new Date).getTime() - this.data.time.start), e.time = 10 * ((new Date).getTime() - this.data.time.start), e.x = this.options.momentum_multiplier * (Math.abs(this.data.pagex.end) - Math.abs(this.data.pagex.start)), e.y = this.options.momentum_multiplier * (Math.abs(this.data.pagey.end) - Math.abs(this.data.pagey.start)), t.x = Math.round(e.x / e.time), t.y = Math.round(e.y / e.time), this.data.new_pos.x = Math.min(this.data.pos.end.x + t.x), this.data.new_pos.y = Math.min(this.data.pos.end.y + t.y), this.options.enable.x ? this.data.new_pos.x < 0 && (this.data.new_pos.x = 0) : this.data.new_pos.x = this.data.pos.start.x, this.options.enable.y ? this.data.new_pos.y < 0 && (this.data.new_pos.y = 0) : this.data.new_pos.y = this.data.pos.start.y, e.time < 3e3 && (i = !0), Math.abs(e.x) > 1e4 && (this.data.direction = "left", e.x > 0 && (this.data.direction = "right")), Math.abs(e.y) > 1e4 && (this.data.direction = "up", e.y > 0 && (this.data.direction = "down")), this._animateMomentum(), i && this.fire("swipe_" + this.data.direction, this.data)
        },
        _animateMomentum: function() {
            var t = {
                    x: this.data.new_pos.x,
                    y: this.data.new_pos.y
                },
                e = {
                    duration: this.options.duration,
                    easing: TL.Ease.easeOutStrong
                };
            this.options.enable.y && ((this.options.constraint.top || this.options.constraint.bottom) && (t.y > this.options.constraint.bottom ? t.y = this.options.constraint.bottom : t.y < this.options.constraint.top && (t.y = this.options.constraint.top)), e.top = Math.floor(t.y) + "px"), this.options.enable.x && ((this.options.constraint.left || this.options.constraint.right) && (t.x > this.options.constraint.left ? t.x = this.options.constraint.left : t.x < this.options.constraint.right && (t.x = this.options.constraint.right)), e.left = Math.floor(t.x) + "px"), this.animator = TL.Animate(this._el.move, e), this.fire("momentum", this.data)
        }
    }), TL.Swipable = TL.Class.extend({
        includes: TL.Events,
        _el: {},
        mousedrag: {
            down: "mousedown",
            up: "mouseup",
            leave: "mouseleave",
            move: "mousemove"
        },
        touchdrag: {
            down: "touchstart",
            up: "touchend",
            leave: "mouseleave",
            move: "touchmove"
        },
        initialize: function(t, e, i) {
            this._el = {
                drag: t,
                move: t
            }, e && (this._el.move = e), this.options = {
                snap: !1,
                enable: {
                    x: !0,
                    y: !0
                },
                constraint: {
                    top: !1,
                    bottom: !1,
                    left: 0,
                    right: !1
                },
                momentum_multiplier: 2e3,
                duration: 1e3,
                ease: TL.Ease.easeInOutQuint
            }, this.animator = null, this.dragevent = this.mousedrag, TL.Browser.touch && (this.dragevent = this.touchdrag), this.data = {
                sliding: !1,
                direction: "none",
                pagex: {
                    start: 0,
                    end: 0
                },
                pagey: {
                    start: 0,
                    end: 0
                },
                pos: {
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    }
                },
                new_pos: {
                    x: 0,
                    y: 0
                },
                new_pos_parent: {
                    x: 0,
                    y: 0
                },
                time: {
                    start: 0,
                    end: 0
                },
                touch: !1
            }, TL.Util.mergeData(this.options, i)
        },
        enable: function() {
            TL.DomEvent.addListener(this._el.drag, this.dragevent.down, this._onDragStart, this), TL.DomEvent.addListener(this._el.drag, this.dragevent.up, this._onDragEnd, this), this.data.pos.start = 0, this._el.move.style.left = this.data.pos.start.x + "px", this._el.move.style.top = this.data.pos.start.y + "px", this._el.move.style.position = "absolute"
        },
        disable: function() {
            TL.DomEvent.removeListener(this._el.drag, this.dragevent.down, this._onDragStart, this), TL.DomEvent.removeListener(this._el.drag, this.dragevent.up, this._onDragEnd, this)
        },
        stopMomentum: function() {
            this.animator && this.animator.stop()
        },
        updateConstraint: function(t) {
            this.options.constraint = t
        },
        _onDragStart: function(t) {
            this.animator && this.animator.stop(), TL.Browser.touch ? t.originalEvent ? (this.data.pagex.start = t.originalEvent.touches[0].screenX, this.data.pagey.start = t.originalEvent.touches[0].screenY) : (this.data.pagex.start = t.targetTouches[0].screenX, this.data.pagey.start = t.targetTouches[0].screenY) : (this.data.pagex.start = t.pageX, this.data.pagey.start = t.pageY), this.options.enable.x, this.options.enable.y, this.data.pos.start = {
                x: this._el.move.offsetLeft,
                y: this._el.move.offsetTop
            }, this.data.time.start = (new Date).getTime(), this.fire("dragstart", this.data), TL.DomEvent.addListener(this._el.drag, this.dragevent.move, this._onDragMove, this), TL.DomEvent.addListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this)
        },
        _onDragEnd: function() {
            this.data.sliding = !1, TL.DomEvent.removeListener(this._el.drag, this.dragevent.move, this._onDragMove, this), TL.DomEvent.removeListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this), this.fire("dragend", this.data), this._momentum()
        },
        _onDragMove: function(t) {
            var e = {
                x: 0,
                y: 0
            };
            this.data.sliding = !0, TL.Browser.touch ? t.originalEvent ? (this.data.pagex.end = t.originalEvent.touches[0].screenX, this.data.pagey.end = t.originalEvent.touches[0].screenY) : (this.data.pagex.end = t.targetTouches[0].screenX, this.data.pagey.end = t.targetTouches[0].screenY) : (this.data.pagex.end = t.pageX, this.data.pagey.end = t.pageY), e.x = this.data.pagex.start - this.data.pagex.end, e.y = this.data.pagey.start - this.data.pagey.end, this.data.pos.end = {
                x: this._el.drag.offsetLeft,
                y: this._el.drag.offsetTop
            }, this.data.new_pos.x = -(e.x - this.data.pos.start.x), this.data.new_pos.y = -(e.y - this.data.pos.start.y), this.options.enable.x && Math.abs(e.x) > Math.abs(e.y) && (t.preventDefault(), this._el.move.style.left = this.data.new_pos.x + "px"), this.options.enable.y && Math.abs(e.y) > Math.abs(e.y) && (t.preventDefault(), this._el.move.style.top = this.data.new_pos.y + "px"), this.fire("dragmove", this.data)
        },
        _momentum: function() {
            var t = {
                    x: 0,
                    y: 0,
                    time: 0
                },
                e = {
                    x: 0,
                    y: 0,
                    time: 0
                },
                i = {
                    x: !1,
                    y: !1
                },
                n = !1;
            this.data.direction = null, t.time = 10 * ((new Date).getTime() - this.data.time.start), e.time = 10 * ((new Date).getTime() - this.data.time.start), e.x = this.options.momentum_multiplier * (Math.abs(this.data.pagex.end) - Math.abs(this.data.pagex.start)), e.y = this.options.momentum_multiplier * (Math.abs(this.data.pagey.end) - Math.abs(this.data.pagey.start)), t.x = Math.round(e.x / e.time), t.y = Math.round(e.y / e.time), this.data.new_pos.x = Math.min(this.data.new_pos.x + t.x), this.data.new_pos.y = Math.min(this.data.new_pos.y + t.y), this.options.enable.x ? this.options.constraint.left && this.data.new_pos.x > this.options.constraint.left && (this.data.new_pos.x = this.options.constraint.left) : this.data.new_pos.x = this.data.pos.start.x, this.options.enable.y ? this.data.new_pos.y < 0 && (this.data.new_pos.y = 0) : this.data.new_pos.y = this.data.pos.start.y, e.time < 2e3 && (n = !0), this.options.enable.x && this.options.enable.y ? Math.abs(e.x) > Math.abs(e.y) ? i.x = !0 : i.y = !0 : this.options.enable.x ? Math.abs(e.x) > Math.abs(e.y) && (i.x = !0) : Math.abs(e.y) > Math.abs(e.x) && (i.y = !0), i.x && (Math.abs(e.x) > this._el.drag.offsetWidth / 2 && (n = !0), Math.abs(e.x) > 1e4 && (this.data.direction = "left", e.x > 0 && (this.data.direction = "right"))), i.y && (Math.abs(e.y) > this._el.drag.offsetHeight / 2 && (n = !0), Math.abs(e.y) > 1e4 && (this.data.direction = "up", e.y > 0 && (this.data.direction = "down"))), e.time < 1e3 || this._animateMomentum(), n && this.data.direction ? this.fire("swipe_" + this.data.direction, this.data) : this.data.direction ? this.fire("swipe_nodirection", this.data) : this.options.snap && (this.animator.stop(), this.animator = TL.Animate(this._el.move, {
                top: this.data.pos.start.y,
                left: this.data.pos.start.x,
                duration: this.options.duration,
                easing: TL.Ease.easeOutStrong
            }))
        },
        _animateMomentum: function() {
            var t = {
                    x: this.data.new_pos.x,
                    y: this.data.new_pos.y
                },
                e = {
                    duration: this.options.duration,
                    easing: TL.Ease.easeOutStrong
                };
            this.options.enable.y && ((this.options.constraint.top || this.options.constraint.bottom) && (t.y > this.options.constraint.bottom ? t.y = this.options.constraint.bottom : t.y < this.options.constraint.top && (t.y = this.options.constraint.top)), e.top = Math.floor(t.y) + "px"), this.options.enable.x && (this.options.constraint.left && t.x >= this.options.constraint.left && (t.x = this.options.constraint.left), this.options.constraint.right && t.x < this.options.constraint.right && (t.x = this.options.constraint.right), e.left = Math.floor(t.x) + "px"), this.animator = TL.Animate(this._el.move, e), this.fire("momentum", this.data)
        }
    }), TL.MenuBar = TL.Class.extend({
        includes: [TL.Events, TL.DomMixins],
        _el: {},
        initialize: function(t, e, i) {
            this._el = {
                parent: {},
                container: {},
                button_backtostart: {},
                button_zoomin: {},
                button_zoomout: {},
                arrow: {},
                line: {},
                coverbar: {},
                grip: {}
            }, this.collapsed = !1, this._el.container = "object" == typeof t ? t : TL.Dom.get(t), e && (this._el.parent = e), this.options = {
                width: 600,
                height: 600,
                duration: 1e3,
                ease: TL.Ease.easeInOutQuint,
                menubar_default_y: 0
            }, this.animator = {}, TL.Util.mergeData(this.options, i), this._initLayout(), this._initEvents()
        },
        show: function(t) {
            var e = this.options.duration;
            t && (e = t)
        },
        hide: function() {},
        toogleZoomIn: function(t) {
            t ? (this._el.button_zoomin.className = "tl-menubar-button", this._el.button_zoomout.className = "tl-menubar-button") : (this._el.button_zoomin.className = "tl-menubar-button tl-menubar-button-inactive", this._el.button_zoomout.className = "tl-menubar-button")
        },
        toogleZoomOut: function(t) {
            t ? (this._el.button_zoomout.className = "tl-menubar-button", this._el.button_zoomin.className = "tl-menubar-button") : (this._el.button_zoomout.className = "tl-menubar-button tl-menubar-button-inactive", this._el.button_zoomin.className = "tl-menubar-button")
        },
        setSticky: function(t) {
            this.options.menubar_default_y = t
        },
        setColor: function(t) {
            this._el.container.className = t ? "tl-menubar tl-menubar-inverted" : "tl-menubar"
        },
        updateDisplay: function(t, e, i, n) {
            this._updateDisplay(t, e, i, n)
        },
        _onButtonZoomIn: function(t) {
            this.fire("zoom_in", t)
        },
        _onButtonZoomOut: function(t) {
            this.fire("zoom_out", t)
        },
        _onButtonBackToStart: function(t) {
            this.fire("back_to_start", t)
        },
        _initLayout: function() {
            this._el.button_zoomin = TL.Dom.create("span", "tl-menubar-button", this._el.container), this._el.button_zoomout = TL.Dom.create("span", "tl-menubar-button", this._el.container), this._el.button_backtostart = TL.Dom.create("span", "tl-menubar-button", this._el.container), TL.Browser.mobile && this._el.container.setAttribute("ontouchstart", " "), this._el.button_backtostart.innerHTML = "<span class='tl-icon-goback'></span>", this._el.button_zoomin.innerHTML = "<span class='tl-icon-zoom-in'></span>", this._el.button_zoomout.innerHTML = "<span class='tl-icon-zoom-out'></span>"
        },
        _initEvents: function() {
            TL.DomEvent.addListener(this._el.button_backtostart, "click", this._onButtonBackToStart, this), TL.DomEvent.addListener(this._el.button_zoomin, "click", this._onButtonZoomIn, this), TL.DomEvent.addListener(this._el.button_zoomout, "click", this._onButtonZoomOut, this)
        },
        _updateDisplay: function(t, e) {
            t && (this.options.width = t), e && (this.options.height = e)
        }
    }), TL.Message = TL.Class.extend({
        includes: [TL.Events, TL.DomMixins, TL.I18NMixins],
        _el: {},
        initialize: function(t, e, i) {
            this._el = {
                parent: {},
                container: {},
                message_container: {},
                loading_icon: {},
                message: {}
            }, this.options = {
                width: 600,
                height: 600,
                message_class: "tl-message",
                message_icon_class: "tl-loading-icon"
            }, this._add_to_container = i || {}, TL.Util.mergeData(this.data, t), TL.Util.mergeData(this.options, e), this._el.container = TL.Dom.create("div", this.options.message_class), i && (i.appendChild(this._el.container), this._el.parent = i), this.animator = {}, this._initLayout(), this._initEvents()
        },
        updateMessage: function(t) {
            this._updateMessage(t)
        },
        updateDisplay: function(t, e) {
            this._updateDisplay(t, e)
        },
        _updateMessage: function(t) {
            this._el.message.innerHTML = t ? t : this._("loading"), !this._el.parent.atrributes && this._add_to_container.attributes && (this._add_to_container.appendChild(this._el.container), this._el.parent = this._add_to_container)
        },
        _onMouseClick: function() {
            this.fire("clicked", this.options)
        },
        _onRemove: function() {
            this._el.parent = {}
        },
        _initLayout: function() {
            this._el.message_container = TL.Dom.create("div", "tl-message-container", this._el.container), this._el.loading_icon = TL.Dom.create("div", this.options.message_icon_class, this._el.message_container), this._el.message = TL.Dom.create("div", "tl-message-content", this._el.message_container), this._updateMessage()
        },
        _initEvents: function() {
            TL.DomEvent.addListener(this._el.container, "click", this._onMouseClick, this), TL.DomEvent.addListener(this, "removed", this._onRemove, this)
        },
        _updateDisplay: function() {}
    }), TL.MediaType = function(t, e) {
        var i = {},
            n = [{
                type: "youtube",
                name: "YouTube",
                match_str: "^(https?:)?/*(www.)?youtube|youtu.be",
                cls: TL.Media.YouTube
            }, {
                type: "vimeo",
                name: "Vimeo",
                match_str: "^(https?:)?/*(player.)?vimeo.com",
                cls: TL.Media.Vimeo
            }, {
                type: "dailymotion",
                name: "DailyMotion",
                match_str: "^(https?:)?/*(www.)?dailymotion.com",
                cls: TL.Media.DailyMotion
            }, {
                type: "vine",
                name: "Vine",
                match_str: "^(https?:)?/*(www.)?vine.co",
                cls: TL.Media.Vine
            }, {
                type: "soundcloud",
                name: "SoundCloud",
                match_str: "^(https?:)?/*(player.)?soundcloud.com",
                cls: TL.Media.SoundCloud
            }, {
                type: "twitter",
                name: "Twitter",
                match_str: "^(https?:)?/*(www.)?twitter.com",
                cls: TL.Media.Twitter
            }, {
                type: "twitterembed",
                name: "TwitterEmbed",
                match_str: '<blockquote class="twitter-tweet"',
                cls: TL.Media.TwitterEmbed
            }, {
                type: "googlemaps",
                name: "Google Map",
                match_str: /google.+?\/maps\/@([-\d.]+),([-\d.]+),((?:[-\d.]+[zmayht],?)*)|google.+?\/maps\/search\/([\w\W]+)\/@([-\d.]+),([-\d.]+),((?:[-\d.]+[zmayht],?)*)|google.+?\/maps\/place\/([\w\W]+)\/@([-\d.]+),([-\d.]+),((?:[-\d.]+[zmayht],?)*)|google.+?\/maps\/dir\/([\w\W]+)\/([\w\W]+)\/@([-\d.]+),([-\d.]+),((?:[-\d.]+[zmayht],?)*)/,
                cls: TL.Media.GoogleMap
            }, {
                type: "googleplus",
                name: "Google+",
                match_str: "^(https?:)?/*plus.google",
                cls: TL.Media.GooglePlus
            }, {
                type: "flickr",
                name: "Flickr",
                match_str: "^(https?:)?/*(www.)?flickr.com/photos",
                cls: TL.Media.Flickr
            }, {
                type: "flickr",
                name: "Flickr",
                match_str: "^(https?://)?flic.kr/.*",
                cls: TL.Media.Flickr
            }, {
                type: "instagram",
                name: "Instagram",
                match_str: /^(https?:)?\/*(www.)?(instagr.am|^(https?:)?\/*(www.)?instagram.com)\/p\//,
                cls: TL.Media.Instagram
            }, {
                type: "profile",
                name: "Profile",
                match_str: /^(https?:)?\/*(www.)?instagr.am\/[a-zA-Z0-9]{2,}|^(https?:)?\/*(www.)?instagram.com\/[a-zA-Z0-9]{2,}/,
                cls: TL.Media.Profile
            }, {
                type: "documentcloud",
                name: "Document Cloud",
                match_str: /documentcloud.org\//,
                cls: TL.Media.DocumentCloud
            }, {
                type: "image",
                name: "Image",
                match_str: /(jpg|jpeg|png|gif|svg)(\?.*)?$/i,
                cls: TL.Media.Image
            }, {
                type: "imgur",
                name: "Imgur",
                match_str: /^.*imgur.com\/.+$/i,
                cls: TL.Media.Imgur
            }, {
                type: "googledocs",
                name: "Google Doc",
                match_str: "^(https?:)?/*[^.]*.google.com/[^/]*/d/[^/]*/[^/]*?usp=sharing|^(https?:)?/*drive.google.com/open?id=[^&]*&authuser=0|^(https?:)?/*drive.google.com/open?id=[^&]*|^(https?:)?/*[^.]*.googledrive.com/host/[^/]*/",
                cls: TL.Media.GoogleDoc
            }, {
                type: "pdf",
                name: "PDF",
                match_str: /^.*\.pdf(\?.*)?(\#.*)?/,
                cls: TL.Media.PDF
            }, {
                type: "wikipedia",
                name: "Wikipedia",
                match_str: "^(https?:)?/*(www.)?wikipedia.org|^(https?:)?/*([a-z][a-z].)?wikipedia.org",
                cls: TL.Media.Wikipedia
            }, {
                type: "spotify",
                name: "spotify",
                match_str: "spotify",
                cls: TL.Media.Spotify
            }, {
                type: "iframe",
                name: "iFrame",
                match_str: "iframe",
                cls: TL.Media.IFrame
            }, {
                type: "storify",
                name: "Storify",
                match_str: "storify",
                cls: TL.Media.Storify
            }, {
                type: "blockquote",
                name: "Quote",
                match_str: "blockquote",
                cls: TL.Media.Blockquote
            }, {
                type: "imageblank",
                name: "Imageblank",
                match_str: "",
                cls: TL.Media.Image
            }];
        if (e) {
            if (t instanceof Array) return !1;
            for (var a = 0; a < n.length; a++) switch (n[a].type) {
                case "flickr":
                case "image":
                case "imgur":
                case "instagram":
                    if (t.url.match(n[a].match_str)) return i = n[a]
            }
        } else
            for (var a = 0; a < n.length; a++) {
                if (t instanceof Array) return i = {
                    type: "slider",
                    cls: TL.Media.Slider
                };
                if (t.url.match(n[a].match_str)) return i = n[a]
            }
        return !1
    }, TL.Media = TL.Class.extend({
        includes: [TL.Events, TL.I18NMixins],
        _el: {},
        initialize: function(t, e, i) {
            this._el = {
                container: {},
                content_container: {},
                content: {},
                content_item: {},
                content_link: {},
                caption: null,
                credit: null,
                parent: {},
                link: null
            }, this.player = null, this.timer = null, this.load_timer = null, this.message = null, this.media_id = null, this._state = {
                loaded: !1,
                show_meta: !1,
                media_loaded: !1
            }, this.data = {
                unique_id: null,
                url: null,
                credit: null,
                caption: null,
                credit_alternate: null,
                caption_alternate: null,
                link: null,
                link_target: null
            }, this.options = {
                api_key_flickr: "f2cc870b4d233dd0a5bfe73fd0d64ef0",
                api_key_googlemaps: "AIzaSyB9dW8e_iRrATFa8g24qB6BDBGdkrLDZYI",
                api_key_embedly: "",
                credit_height: 0,
                caption_height: 0,
                background: 0
            }, this.animator = {}, TL.Util.mergeData(this.options, e), TL.Util.mergeData(this.data, t), this.options.background || (this._el.container = TL.Dom.create("div", "tl-media"), this.data.unique_id && (this._el.container.id = this.data.unique_id), this._initLayout(), i && (i.appendChild(this._el.container), this._el.parent = i))
        },
        loadMedia: function() {
            var t = this;
            if (!this._state.loaded) try {
                this.load_timer = setTimeout(function() {
                    t.loadingMessage(), t._loadMedia(), t._updateDisplay()
                }, 1200)
            } catch (e) {
                trace("Error loading media for ", this._media), trace(e)
            }
        },
        _updateMessage: function(t) {
            this.message && this.message.updateMessage(t)
        },
        loadingMessage: function() {
            this._updateMessage(this._("loading") + " " + this.options.media_name)
        },
        errorMessage: function(t) {
            t = t ? this._("error") + ": " + t : this._("error"), this._updateMessage(t)
        },
        updateMediaDisplay: function(t) {
            this._state.loaded && !this.options.background && (this._el.content_item.style.maxHeight = TL.Browser.mobile ? this.options.height / 2 + "px" : this.options.height - this.options.credit_height - this.options.caption_height - 30 + "px", this._el.container.style.maxWidth = this.options.width + "px", TL.Browser.firefox && this._el.content_item.offsetWidth > this._el.content_item.offsetHeight, this._updateMediaDisplay(t), this._state.media_loaded && (this._el.credit && (this._el.credit.style.width = this._el.content_item.offsetWidth + "px"), this._el.caption && (this._el.caption.style.width = this._el.content_item.offsetWidth + "px")))
        },
        _loadMedia: function() {
            this.onLoaded()
        },
        _updateMediaDisplay: function() {
            TL.Browser.firefox && (this._el.content_item.style.maxWidth = this.options.width + "px", this._el.content_item.style.width = "auto")
        },
        _getMeta: function() {},
        _getImageURL: function() {
            return ""
        },
        show: function() {},
        hide: function() {},
        addTo: function(t) {
            t.appendChild(this._el.container), this.onAdd()
        },
        removeFrom: function(t) {
            t.removeChild(this._el.container), this.onRemove()
        },
        getImageURL: function(t, e) {
            return this._getImageURL(t, e)
        },
        updateDisplay: function(t, e, i) {
            this._updateDisplay(t, e, i)
        },
        stopMedia: function() {
            this._stopMedia()
        },
        loadErrorDisplay: function(t) {
            try {
                this._el.content.removeChild(this._el.content_item)
            } catch (e) {}
            this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-loaderror", this._el.content), this._el.content_item.innerHTML = "<div class='tl-icon-" + this.options.media_type + "'></div><p>" + t + "</p>", this.onLoaded(!0)
        },
        onLoaded: function(t) {
            this._state.loaded = !0, this.fire("loaded", this.data), this.message && this.message.hide(), t || this.options.background || this.showMeta(), this.updateDisplay()
        },
        onMediaLoaded: function() {
            this._state.media_loaded = !0, this.fire("media_loaded", this.data), this._el.credit && (this._el.credit.style.width = this._el.content_item.offsetWidth + "px"), this._el.caption && (this._el.caption.style.width = this._el.content_item.offsetWidth + "px")
        },
        showMeta: function() {
            this._state.show_meta = !0, this.data.credit && "" != this.data.credit && (this._el.credit = TL.Dom.create("div", "tl-credit", this._el.content_container), this._el.credit.innerHTML = 1 == this.options.autolink ? TL.Util.linkify(this.data.credit) : this.data.credit, this.options.credit_height = this._el.credit.offsetHeight), this.data.caption && "" != this.data.caption && (this._el.caption = TL.Dom.create("div", "tl-caption", this._el.content_container), this._el.caption.innerHTML = 1 == this.options.autolink ? TL.Util.linkify(this.data.caption) : this.data.caption, this.options.caption_height = this._el.caption.offsetHeight), this.data.caption && this.data.credit || this.getMeta()
        },
        getMeta: function() {
            this._getMeta()
        },
        updateMeta: function() {
            !this.data.credit && this.data.credit_alternate && (this._el.credit = TL.Dom.create("div", "tl-credit", this._el.content_container), this._el.credit.innerHTML = this.data.credit_alternate, this.options.credit_height = this._el.credit.offsetHeight), !this.data.caption && this.data.caption_alternate && (this._el.caption = TL.Dom.create("div", "tl-caption", this._el.content_container), this._el.caption.innerHTML = this.data.caption_alternate, this.options.caption_height = this._el.caption.offsetHeight), this.updateDisplay()
        },
        onAdd: function() {
            this.fire("added", this.data)
        },
        onRemove: function() {
            this.fire("removed", this.data)
        },
        _initLayout: function() {
            this.message = new TL.Message({}, this.options), this.message.addTo(this._el.container), this._el.content_container = TL.Dom.create("div", "tl-media-content-container", this._el.container), this.data.link && "" != this.data.link ? (this._el.link = TL.Dom.create("a", "tl-media-link", this._el.content_container), this._el.link.href = this.data.link, this._el.link.target = this.data.link_target && "" != this.data.link_target ? this.data.link_target : "_blank", this._el.content = TL.Dom.create("div", "tl-media-content", this._el.link)) : this._el.content = TL.Dom.create("div", "tl-media-content", this._el.content_container)
        },
        _updateDisplay: function(t, e, i) {
            t && (this.options.width = t), e && (this.options.height = e), i && (this.options.layout = i), this._el.credit && (this.options.credit_height = this._el.credit.offsetHeight), this._el.caption && (this.options.caption_height = this._el.caption.offsetHeight + 5), this.updateMediaDisplay(this.options.layout)
        },
        _stopMedia: function() {}
    }), TL.Media.Blockquote = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-blockquote", this._el.content), this._el.content_container.className = "tl-media-content-container tl-media-content-container-text", this.media_id = this.data.url, this._el.content_item.innerHTML = this.media_id, this.onLoaded()
        },
        updateMediaDisplay: function() {},
        _updateMediaDisplay: function() {}
    }), TL.Media.DailyMotion = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t;
            this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-iframe tl-media-dailymotion", this._el.content), this.media_id = this.data.url.match("video") ? this.data.url.split("video/")[1].split(/[?&]/)[0] : this.data.url.split("embed/")[1].split(/[?&]/)[0], t = "http://www.dailymotion.com/embed/video/" + this.media_id, this._el.content_item.innerHTML = "<iframe autostart='false' frameborder='0' width='100%' height='100%' src='" + t + "'></iframe>", this.onLoaded()
        },
        _updateMediaDisplay: function() {
            this._el.content_item.style.height = TL.Util.ratio.r16_9({
                w: this._el.content_item.offsetWidth
            }) + "px"
        }
    }), TL.Media.DocumentCloud = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t = this;
            this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-documentcloud tl-media-shadow", this._el.content), this._el.content_item.id = TL.Util.unique_ID(7), this.data.url.match(/\.html$/) ? this.data.url = this._transformURL(this.data.url) : this.data.url.match(/.(json|js)$/) || trace("DOCUMENT CLOUD IN URL BUT INVALID SUFFIX"), TL.Load.js(["https://assets.documentcloud.org/viewer/loader.js", "https://assets.documentcloud.org/viewer/viewer.js"], function() {
                t.createMedia()
            })
        },
        _transformURL: function(t) {
            return t.replace(/(.*)\.html$/, "$1.js")
        },
        _updateMediaDisplay: function() {
            this._el.content_item.style.height = this.options.height + "px"
        },
        createMedia: function() {
            DV.load(this.data.url, {
                container: "#" + this._el.content_item.id,
                showSidebar: !1
            }), this.onLoaded()
        }
    }), TL.Media.Flickr = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t, e = this;
            try {
                this.establishMediaID(), t = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + this.options.api_key_flickr + "&photo_id=" + this.media_id + "&format=json&jsoncallback=?", TL.getJSON(t, function(t) {
                    "ok" == t.stat ? (e.sizes = t.sizes.size, e.options.background || e.createMedia(), e.onLoaded()) : e.loadErrorDisplay(e._("flickr_notfound_err"))
                })
            } catch (i) {
                e.loadErrorDisplay(e._(i.message_key))
            }
        },
        establishMediaID: function() {
            if (this.data.url.match(/flic.kr\/.+/i)) {
                var t = this.data.url.split("/").slice(-1)[0];
                this.media_id = TL.Util.base58.decode(t)
            } else {
                var e = "flickr.com/photos/",
                    i = this.data.url.indexOf(e);
                if (-1 == i) throw new TL.Error("flickr_invalidurl_err");
                var n = i + e.length;
                this.media_id = this.data.url.substr(n).split("/")[1]
            }
        },
        createMedia: function() {
            var t = this;
            this._el.content_link = TL.Dom.create("a", "", this._el.content), this._el.content_link.href = this.data.url, this._el.content_link.target = "_blank", this._el.content_item = TL.Dom.create("img", "tl-media-item tl-media-image tl-media-flickr tl-media-shadow", this._el.content_link), this._el.content_item.addEventListener("load", function() {
                t.onMediaLoaded()
            }), this._el.content_item.src = this.getImageURL(this.options.width, this.options.height)
        },
        getImageURL: function(t, e) {
            for (var i = this.size_label(e), n = this.sizes[this.sizes.length - 2].source, a = 0; a < this.sizes.length; a++) this.sizes[a].label == i && (n = this.sizes[a].source);
            return n
        },
        _getMeta: function() {
            var t, e = this;
            t = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=" + this.options.api_key_flickr + "&photo_id=" + this.media_id + "&format=json&jsoncallback=?", TL.getJSON(t, function(t) {
                e.data.credit_alternate = "<a href='" + e.data.url + "' target='_blank'>" + t.photo.owner.realname + "</a>", e.data.caption_alternate = t.photo.title._content + " " + t.photo.description._content, e.updateMeta()
            })
        },
        size_label: function(t) {
            var e = "";
            return e = 75 >= t ? 0 >= t ? "Large" : "Thumbnail" : 180 >= t ? "Small" : 240 >= t ? "Small 320" : 375 >= t ? "Medium" : 480 >= t ? "Medium 640" : 600 >= t ? "Large" : "Large"
        }
    }), TL.Media.GoogleDoc = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t;
            if (this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-iframe", this._el.content), this.data.url.match("open?id=")) this.media_id = this.data.url.split("open?id=")[1], this.data.url.match("&authuser=0") && (t = this.media_id.match("&authuser=0")[0]);
            else if (this.data.url.match(/file\/d\/([^/]*)\/?/)) {
                var e = this.data.url.match(/file\/d\/([^/]*)\/?/)[1];
                t = "https://drive.google.com/file/d/" + e + "/preview"
            } else t = this.data.url;
            this._el.content_item.innerHTML = "<iframe class='doc' frameborder='0' width='100%' height='100%' src='" + t + "'></iframe>", this.onLoaded()
        },
        _updateMediaDisplay: function() {
            this._el.content_item.style.height = this.options.height + "px"
        }
    }), TL.Media.GooglePlus = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t;
            this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-googleplus", this._el.content), this.media_id = this.data.url, t = this.media_id, this._el.content_item.innerHTML = "<iframe frameborder='0' width='100%' height='100%' src='" + t + "'></iframe>", this.onLoaded()
        },
        _updateMediaDisplay: function() {
            this._el.content_item.style.height = this.options.height + "px"
        }
    }), TL.Media.IFrame = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t;
            this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-iframe", this._el.content), this.media_id = this.data.url, t = this.media_id, this._el.content_item.innerHTML = t, this.onLoaded()
        },
        _updateMediaDisplay: function() {
            this._el.content_item.style.height = this.options.height + "px"
        }
    }), TL.Media.Image = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            this.loadingMessage(), this.options.background || this.createMedia(), this.onLoaded()
        },
        createMedia: function() {
            var t = this,
                e = "tl-media-item tl-media-image tl-media-shadow";
            (this.data.url.match(/.png(\?.*)?$/) || this.data.url.match(/.svg(\?.*)?$/)) && (e = "tl-media-item tl-media-image"), this.data.link ? (this._el.content_link = TL.Dom.create("a", "", this._el.content), this._el.content_link.href = this.data.link, this._el.content_link.target = "_blank", this._el.content_item = TL.Dom.create("img", e, this._el.content_link)) : this._el.content_item = TL.Dom.create("img", e, this._el.content), this._el.content_item.addEventListener("load", function() {
                t.onMediaLoaded()
            }), this._el.content_item.src = this.getImageURL()
        },
        getImageURL: function() {
            return TL.Util.transformImageURL(this.data.url)
        },
        _updateMediaDisplay: function() {
            TL.Browser.firefox && (this._el.content_item.style.width = "auto")
        }
    }), TL.Media.Imgur = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            try {
                this.media_id = this.data.url.split("/").slice(-1)[0], this.options.background || this.createMedia(), this.onLoaded()
            } catch (t) {
                this.loadErrorDisplay(self._("imgur_invalidurl_err"))
            }
        },
        createMedia: function() {
            var t = this;
            this._el.content_link = TL.Dom.create("a", "", this._el.content), this._el.content_link.href = this.data.url, this._el.content_link.target = "_blank", this._el.content_item = TL.Dom.create("img", "tl-media-item tl-media-image tl-media-imgur tl-media-shadow", this._el.content_link), this._el.content_item.addEventListener("load", function() {
                t.onMediaLoaded()
            }), this._el.content_item.src = this.getImageURL()
        },
        getImageURL: function() {
            return "https://i.imgur.com/" + this.media_id + ".png"
        }
    }), TL.Media.Instagram = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            this.media_id = this.data.url.split("/p/")[1].split("/")[0], this.options.background || this.createMedia(), this.onLoaded()
        },
        createMedia: function() {
            var t = this;
            this._el.content_link = TL.Dom.create("a", "", this._el.content), this._el.content_link.href = this.data.url, this._el.content_link.target = "_blank", this._el.content_item = TL.Dom.create("img", "tl-media-item tl-media-image tl-media-instagram tl-media-shadow", this._el.content_link), this._el.content_item.addEventListener("load", function() {
                t.onMediaLoaded()
            }), this._el.content_item.src = this.getImageURL(this._el.content.offsetWidth)
        },
        getImageURL: function(t) {
            return "http://instagr.am/p/" + this.media_id + "/media/?size=" + this.sizes(t)
        },
        _getMeta: function() {
            var t, e = this;
            t = "http://api.instagram.com/oembed?url=http://instagr.am/p/" + this.media_id + "&callback=?", TL.getJSON(t, function(t) {
                e.data.credit_alternate = "<a href='" + t.author_url + "' target='_blank'>" + t.author_name + "</a>", e.data.caption_alternate = t.title, e.updateMeta()
            })
        },
        sizes: function(t) {
            var e = "";
            return e = 150 >= t ? "t" : 306 >= t ? "m" : "l"
        }
    }), TL.Media.GoogleMap = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-map tl-media-shadow", this._el.content), this.media_id = this.data.url, this.mapframe = TL.Dom.create("iframe", "", this._el.content_item), window.stash = this, this.mapframe.width = "100%", this.mapframe.height = "100%", this.mapframe.frameBorder = "0", this.mapframe.src = this.makeGoogleMapsEmbedURL(this.media_id, this.options.api_key_googlemaps), this.onLoaded()
        },
        _updateMediaDisplay: function() {
            if (this._state.loaded) {
                var t = TL.Util.ratio.square({
                    w: this._el.content_item.offsetWidth
                });
                this._el.content_item.style.height = t.h + "px"
            }
        },
        makeGoogleMapsEmbedURL: function(t, e) {
            function i(t) {
                function i(e, i) {
                    if ("z" == e.slice(-1)) i.zoom = e;
                    else if ("m" == e.slice(-1)) i.zoom = 14, i.maptype = "satellite";
                    else if ("t" == e.slice(-1)) {
                        if (n = !0, "place" == mapmode) var s = t.match(h.place)[3] + "," + t.match(h.place)[4];
                        else {
                            var s = i.center;
                            delete i.center
                        }
                        i = {}, i.location = s, streetview_params = e.split(",");
                        for (param in a.streetview) {
                            var o = parseInt(param) + 1;
                            i[a.streetview[param]] = "pitch" == a.streetview[param] && "90t" == streetview_params[o] ? 0 : streetview_params[o].slice(0, -1)
                        }
                    }
                    return i
                }

                function s(t, s) {
                    var o = {},
                        r = s[1],
                        l = s[s.length - 1];
                    for (param in a[t]) {
                        var h = parseInt(param) + 2;
                        o[a[t][param]] = "center" == a[t][param] ? s[h] + "," + s[++h] : s[h]
                    }
                    return o = i(l, o), o.key = e, 1 == n && (t = "streetview"), r + "/embed/v1/" + t + TL.Util.getParamString(o)
                }
                return mapmode = "view", t.match(h.place) ? mapmode = "place" : t.match(h.directions) ? mapmode = "directions" : t.match(h.search) && (mapmode = "search"), s(mapmode, t.match(h[mapmode]))
            }
            var n = !1,
                a = {
                    view: ["center"],
                    place: ["q", "center"],
                    directions: ["origin", "destination", "center"],
                    search: ["q", "center"],
                    streetview: ["fov", "heading", "pitch"]
                },
                s = /(https:\/\/.+google.+?\/maps)/,
                o = /@([-\d.]+),([-\d.]+)/,
                r = /([\w\W]+)/,
                l = /,((?:[-\d.]+[zmayht],?)*)/,
                h = {
                    view: new RegExp(s.source + "/" + o.source + l.source),
                    place: new RegExp(s.source + "/place/" + r.source + "/" + o.source + l.source),
                    directions: new RegExp(s.source + "/dir/" + r.source + "/" + r.source + "/" + o.source + l.source),
                    search: new RegExp(s.source + "/search/" + r.source + "/" + o.source + l.source)
                };
            return i(t)
        }
    }), TL.Media.PDF = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t = TL.Util.transformImageURL(this.data.url);
            this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-iframe", this._el.content);
            var e = "";
            e = TL.Browser.ie || TL.Browser.edge || t.match(/dl.dropboxusercontent.com/) ? "<iframe class='doc' frameborder='0' width='100%' height='100%' src='//docs.google.com/viewer?url=" + t + "&amp;embedded=true'></iframe>" : "<iframe class='doc' frameborder='0' width='100%' height='100%' src='" + t + "'></iframe>", this._el.content_item.innerHTML = e, this.onLoaded()
        },
        _updateMediaDisplay: function() {
            this._el.content_item.style.height = this.options.height + "px"
        }
    }), TL.Media.Profile = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            this._el.content_item = TL.Dom.create("img", "tl-media-item tl-media-image tl-media-profile tl-media-shadow", this._el.content), this._el.content_item.src = this.data.url, this.onLoaded()
        },
        _updateMediaDisplay: function() {
            TL.Browser.firefox && (this._el.content_item.style.maxWidth = this.options.width / 2 - 40 + "px")
        }
    }), TL.Media.Slider = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            this._el.content_item = TL.Dom.create("img", "tl-media-item tl-media-image", this._el.content), this._el.content_item.src = this.data.url, this.onLoaded()
        }
    }), TL.Media.SoundCloud = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t, e = this;
            this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-iframe tl-media-soundcloud tl-media-shadow", this._el.content), this.media_id = this.data.url, t = "http://soundcloud.com/oembed?url=" + this.media_id + "&format=js&callback=?", TL.getJSON(t, function(t) {
                e.createMedia(t)
            })
        },
        createMedia: function(t) {
            this._el.content_item.innerHTML = t.html, this.onLoaded()
        }
    }), TL.Media.Spotify = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t;
            if (this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-iframe tl-media-spotify", this._el.content), this.data.url.match("open.spotify.com/track/")) this.media_id = "spotify:track:" + this.data.url.split("open.spotify.com/track/")[1];
            else if (this.data.url.match("spotify:track:")) this.media_id = this.data.url;
            else if (this.data.url.match("/playlist/")) {
                var e = this.data.url.split("open.spotify.com/user/")[1].split("/playlist/")[0];
                this.media_id = "spotify:user:" + e + ":playlist:" + this.data.url.split("/playlist/")[1]
            } else this.data.url.match(":playlist:") && (this.media_id = this.data.url);
            t = "http://embed.spotify.com/?uri=" + this.media_id + "&theme=white&view=coverart", this.player = TL.Dom.create("iframe", "tl-media-shadow", this._el.content_item), this.player.width = "100%", this.player.height = "100%", this.player.frameBorder = "0", this.player.src = t, this.onLoaded()
        },
        _updateMediaDisplay: function() {
            var t = this.options.height,
                e = 0,
                i = 0;
            t = TL.Browser.mobile ? this.options.height / 2 : this.options.height - this.options.credit_height - this.options.caption_height - 30, this._el.content_item.style.maxHeight = "none", trace(t), trace(this.options.width), t > this.options.width ? (trace("height is greater"), e = this.options.width + 80 + "px", i = this.options.width + "px") : (trace("width is greater"), trace(this.options.width), e = t + "px", i = t - 80 + "px"), this.player.style.width = i, this.player.style.height = e, this._el.credit && (this._el.credit.style.width = i), this._el.caption && (this._el.caption.style.width = i)
        },
        _stopMedia: function() {}
    }), TL.Media.Storify = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t;
            this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-iframe tl-media-storify", this._el.content), this.media_id = this.data.url, t = "<iframe frameborder='0' width='100%' height='100%' src='" + this.media_id + "/embed'></iframe>", t += "<script src='" + this.media_id + ".js'></script>", this._el.content_item.innerHTML = t, this.onLoaded()
        },
        _updateMediaDisplay: function() {
            this._el.content_item.style.height = this.options.height + "px"
        }
    }), TL.Media.Text = TL.Class.extend({
        includes: [TL.Events],
        _el: {
            container: {},
            content_container: {},
            content: {},
            headline: {},
            date: {}
        },
        data: {
            unique_id: "",
            headline: "headline",
            text: "text"
        },
        options: {
            title: !1
        },
        initialize: function(t, e, i) {
            TL.Util.setData(this, t), TL.Util.mergeData(this.options, e), this._el.container = TL.Dom.create("div", "tl-text"), this._el.container.id = this.data.unique_id, this._initLayout(), i && i.appendChild(this._el.container)
        },
        show: function() {},
        hide: function() {},
        addTo: function(t) {
            t.appendChild(this._el.container)
        },
        removeFrom: function(t) {
            t.removeChild(this._el.container)
        },
        headlineHeight: function() {
            return this._el.headline.offsetHeight + 40
        },
        addDateText: function(t) {
            this._el.date.innerHTML = t
        },
        onLoaded: function() {
            this.fire("loaded", this.data)
        },
        onAdd: function() {
            this.fire("added", this.data)
        },
        onRemove: function() {
            this.fire("removed", this.data)
        },
        _initLayout: function() {
            if (this._el.content_container = TL.Dom.create("div", "tl-text-content-container", this._el.container), this._el.date = TL.Dom.create("h3", "tl-headline-date", this._el.content_container), "" != this.data.headline) {
                var t = "tl-headline";
                this.options.title && (t = "tl-headline tl-headline-title"), this._el.headline = TL.Dom.create("h2", t, this._el.content_container), this._el.headline.innerHTML = this.data.headline
            }
            if ("" != this.data.text) {
                var e = "";
                e += TL.Util.htmlify(1 == this.options.autolink ? TL.Util.linkify(this.data.text) : this.data.text), this._el.content = TL.Dom.create("div", "tl-text-content", this._el.content_container), this._el.content.innerHTML = e
            }
            this.onLoaded()
        }
    }), TL.Media.Twitter = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t, e = this;
            this._el.content_item = TL.Dom.create("div", "tl-media-twitter", this._el.content), this._el.content_container.className = "tl-media-content-container tl-media-content-container-text", this.media_id = this.data.url.match("status/") ? this.data.url.split("status/")[1] : this.data.url.match("statuses/") ? this.data.url.split("statuses/")[1] : "", t = "https://api.twitter.com/1/statuses/oembed.json?id=" + this.media_id + "&omit_script=true&include_entities=true&callback=?", TL.ajax({
                type: "GET",
                url: t,
                dataType: "json",
                success: function(t) {
                    e.createMedia(t)
                },
                error: function(t, i) {
                    var n = "";
                    n += e._("twitter_load_err") + "<br/>" + e.media_id + "<br/>" + i, e.loadErrorDisplay(n)
                }
            })
        },
        createMedia: function(t) {
            var e = "",
                i = "",
                n = "",
                a = "",
                s = "",
                o = "";
            i = t.html.split("</p>&mdash;")[0] + "</p></blockquote>", n = t.author_url.split("twitter.com/")[1], a = t.html.split("</p>&mdash;")[1].split('<a href="')[1], s = a.split('">')[0], o = a.split('">')[1].split("</a>")[0], i = i.replace(/<a href/gi, '<a class="tl-makelink" target="_blank" href'), e += i, e += "<div class='vcard'>", e += "<a href='" + s + "' class='twitter-date' target='_blank'>" + o + "</a>", e += "<div class='author'>", e += "<a class='screen-name url' href='" + t.author_url + "' target='_blank'>", e += "<span class='avatar'></span>", e += "<span class='fn'>" + t.author_name + " <span class='tl-icon-twitter'></span></span>", e += "<span class='nickname'>@" + n + "<span class='thumbnail-inline'></span></span>", e += "</a>", e += "</div>", e += "</div>", this._el.content_item.innerHTML = e, this.onLoaded()
        },
        updateMediaDisplay: function() {},
        _updateMediaDisplay: function() {}
    }), TL.Media.TwitterEmbed = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t, e = this;
            this._el.content_item = TL.Dom.create("div", "tl-media-twitter", this._el.content), this._el.content_container.className = "tl-media-content-container tl-media-content-container-text";
            var i = this.data.url.match(/(status|statuses)\/(\d+)/);
            return i && i.length > 2 ? (this.media_id = i[2], t = "https://api.twitter.com/1/statuses/oembed.json?id=" + this.media_id + "&omit_script=true&include_entities=true&callback=?", void TL.ajax({
                type: "GET",
                url: t,
                dataType: "json",
                success: function(t) {
                    e.createMedia(t)
                },
                error: function(t, i) {
                    var n = "";
                    n += e._("twitter_load_err") + "<br/>" + e.media_id + "<br/>" + i, e.loadErrorDisplay(n)
                }
            })) : void e.loadErrorDisplay(e._("twitterembed_invalidurl_err"))
        },
        createMedia: function(t) {
            trace("create_media");
            var e = "",
                i = "",
                n = "",
                a = "",
                s = "",
                o = "";
            i = t.html.split("</p>&mdash;")[0] + "</p></blockquote>", n = t.author_url.split("twitter.com/")[1], a = t.html.split("</p>&mdash;")[1].split('<a href="')[1], s = a.split('">')[0], o = a.split('">')[1].split("</a>")[0], i = i.replace(/<a href/gi, '<a target="_blank" href'), e += i, e += "<div class='vcard'>", e += "<a href='" + s + "' class='twitter-date' target='_blank'>" + o + "</a>", e += "<div class='author'>", e += "<a class='screen-name url' href='" + t.author_url + "' target='_blank'>", e += "<span class='avatar'></span>", e += "<span class='fn'>" + t.author_name + " <span class='tl-icon-twitter'></span></span>", e += "<span class='nickname'>@" + n + "<span class='thumbnail-inline'></span></span>", e += "</a>", e += "</div>", e += "</div>", this._el.content_item.innerHTML = e, this.onLoaded()
        },
        updateMediaDisplay: function() {},
        _updateMediaDisplay: function() {}
    }), TL.Media.Vimeo = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t, e = this;
            this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-iframe tl-media-vimeo tl-media-shadow", this._el.content), this.media_id = this.data.url.split(/video\/|\/\/vimeo\.com\//)[1].split(/[?&]/)[0], t = "https://player.vimeo.com/video/" + this.media_id + "?api=1&title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff", this.player = TL.Dom.create("iframe", "", this._el.content_item), this.player.addEventListener("load", function() {
                e.onMediaLoaded()
            }), this.player.width = "100%", this.player.height = "100%", this.player.frameBorder = "0", this.player.src = t, this.onLoaded()
        },
        _updateMediaDisplay: function() {
            this._el.content_item.style.height = TL.Util.ratio.r16_9({
                w: this._el.content_item.offsetWidth
            }) + "px"
        },
        _stopMedia: function() {
            try {
                this.player.contentWindow.postMessage(JSON.stringify({
                    method: "pause"
                }), "https://player.vimeo.com")
            } catch (t) {
                trace(t)
            }
        }
    }), TL.Media.Vine = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t;
            this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-iframe tl-media-vine tl-media-shadow", this._el.content), this.media_id = this.data.url.split("vine.co/v/")[1], t = "https://vine.co/v/" + this.media_id + "/embed/simple", this._el.content_item.innerHTML = "<iframe frameborder='0' width='100%' height='100%' src='" + t + "'></iframe><script async src='http://platform.vine.co/static/scripts/embed.js' charset='utf-8'></script>", this.onLoaded()
        },
        _updateMediaDisplay: function() {
            var t = TL.Util.ratio.square({
                w: this._el.content_item.offsetWidth,
                h: this.options.height
            });
            this._el.content_item.style.height = t.h + "px"
        }
    }), TL.Media.Website = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t = this;
            this.media_id = this.data.url.replace(/.*?:\/\//g, ""), this.options.api_key_embedly ? (api_url = "http://api.embed.ly/1/extract?key=" + this.options.api_key_embedly + "&url=" + this.media_id + "&callback=?", TL.getJSON(api_url, function(e) {
                t.createMedia(e)
            })) : this.createCardContent()
        },
        createCardContent: function() {
            ! function(t, e) {
                var i = "embedly-platform",
                    n = "script";
                if (!e.getElementById(i)) {
                    t.embedly = t.embedly || function() {
                        (t.embedly.q = t.embedly.q || []).push(arguments)
                    };
                    var a = e.createElement(n);
                    a.id = i, a.async = 1, a.src = ("https:" === document.location.protocol ? "https" : "http") + "://cdn.embedly.com/widgets/platform.js";
                    var s = e.getElementsByTagName(n)[0];
                    s.parentNode.insertBefore(a, s)
                }
            }(window, document);
            var t = '<a href="' + this.data.url + '" class="embedly-card">' + this.data.url + "</a>";
            this._setContent(t)
        },
        createMedia: function(t) {
            var e = "";
            e += "<h4><a href='" + this.data.url + "' target='_blank'>" + t.title + "</a></h4>", t.images && t.images[0] && (trace(t.images[0].url), e += "<img src='" + t.images[0].url + "' />"), t.favicon_url && (e += "<img class='tl-media-website-icon' src='" + t.favicon_url + "' />"), e += "<span class='tl-media-website-description'>" + t.provider_name + "</span><br/>", e += "<p>" + t.description + "</p>", this._setContent(e)
        },
        _setContent: function(t) {
            this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-website", this._el.content), this._el.content_container.className = "tl-media-content-container tl-media-content-container-text", this._el.content_item.innerHTML = t, this.onLoaded()
        },
        updateMediaDisplay: function() {},
        _updateMediaDisplay: function() {}
    }), TL.Media.Wikipedia = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t, e, i = this;
            this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-wikipedia", this._el.content), this._el.content_container.className = "tl-media-content-container tl-media-content-container-text", this.media_id = this.data.url.split("wiki/")[1].split("#")[0].replace("_", " "), this.media_id = this.media_id.replace(" ", "%20"), e = this.data.url.split("//")[1].split(".wikipedia")[0], t = "https://" + e + ".wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&redirects=&titles=" + this.media_id + "&exintro=1&format=json&callback=?", TL.ajax({
                type: "GET",
                url: t,
                dataType: "json",
                success: function(t) {
                    i.createMedia(t)
                },
                error: function(t, e) {
                    var n = "";
                    n += i._("wikipedia_load_err") + "<br/>" + i.media_id + "<br/>" + e, i.loadErrorDisplay(n)
                }
            })
        },
        createMedia: function(t) {
            var e = "";
            if (t.query) {
                var i = "",
                    e = {
                        entry: {},
                        title: "",
                        text: "",
                        extract: "",
                        paragraphs: 1,
                        page_image: "",
                        text_array: []
                    };
                e.entry = TL.Util.getObjectAttributeByIndex(t.query.pages, 0), e.extract = e.entry.extract, e.title = e.entry.title, e.page_image = e.entry.thumbnail, e.extract.match("<p>") ? e.text_array = e.extract.split("<p>") : e.text_array.push(e.extract);
                for (var n = 0; n < e.text_array.length; n++) n + 1 <= e.paragraphs && n + 1 < e.text_array.length && (e.text += "<p>" + e.text_array[n + 1]);
                i += "<span class='tl-icon-wikipedia'></span>", i += "<div class='tl-wikipedia-title'><h4><a href='" + this.data.url + "' target='_blank'>" + e.title + "</a></h4>", i += "<span class='tl-wikipedia-source'>" + this._("wikipedia") + "</span></div>", e.page_image, i += e.text, e.extract.match("REDIRECT") || (this._el.content_item.innerHTML = i, this.onLoaded())
            }
        },
        updateMediaDisplay: function() {},
        _updateMediaDisplay: function() {}
    }), TL.Media.YouTube = TL.Media.extend({
        includes: [TL.Events],
        _loadMedia: function() {
            var t, e = this;
            this.youtube_loaded = !1, this._el.content_item = TL.Dom.create("div", "tl-media-item tl-media-youtube tl-media-shadow", this._el.content), this._el.content_item.id = TL.Util.unique_ID(7), t = TL.Util.getUrlVars(this.data.url), this.media_id = {}, this.data.url.match("v=") ? this.media_id.id = t.v : this.data.url.match("/embed/") ? this.media_id.id = this.data.url.split("embed/")[1].split(/[?&]/)[0] : this.data.url.match(/v\/|v=|youtu\.be\//) ? this.media_id.id = this.data.url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0] : trace("YOUTUBE IN URL BUT NOT A VALID VIDEO"), this.media_id.start = TL.Util.parseYouTubeTime(t.t), this.media_id.hd = Boolean("undefined" != typeof t.hd), TL.Load.js("https://www.youtube.com/iframe_api", function() {
                e.createMedia()
            })
        },
        _updateMediaDisplay: function() {
            this._el.content_item.style.height = TL.Util.ratio.r16_9({
                w: this.options.width
            }) + "px", this._el.content_item.style.width = this.options.width + "px"
        },
        _stopMedia: function() {
            if (this.youtube_loaded) try {
                this.player.getPlayerState() == YT.PlayerState.PLAYING && this.player.pauseVideo()
            } catch (t) {
                trace(t)
            }
        },
        createMedia: function() {
            var t = this;
            clearTimeout(this.timer), "undefined" != typeof YT && "undefined" != typeof YT.Player ? this.player = new YT.Player(this._el.content_item.id, {
                playerVars: {
                    enablejsapi: 1,
                    color: "white",
                    autohide: 1,
                    showinfo: 0,
                    theme: "light",
                    start: this.media_id.start,
                    fs: 0,
                    rel: 0
                },
                videoId: this.media_id.id,
                events: {
                    onReady: function() {
                        t.onPlayerReady(), t.onLoaded()
                    },
                    onStateChange: t.onStateChange
                }
            }) : this.timer = setTimeout(function() {
                t.createMedia()
            }, 1e3)
        },
        onPlayerReady: function() {
            this.youtube_loaded = !0, this._el.content_item = document.getElementById(this._el.content_item.id), this.onMediaLoaded()
        },
        onStateChange: function(t) {
            t.data == YT.PlayerState.ENDED && (t.target.seekTo(0), t.target.pauseVideo())
        }
    }), TL.Slide = TL.Class.extend({
        includes: [TL.Events, TL.DomMixins, TL.I18NMixins],
        _el: {},
        initialize: function(t, e, i) {
            this._el = {
                container: {},
                scroll_container: {},
                background: {},
                content_container: {},
                content: {}
            }, this._media = null, this._mediaclass = {}, this._text = {}, this._background_media = null, this._state = {
                loaded: !1
            }, this.has = {
                headline: !1,
                text: !1,
                media: !1,
                title: !1,
                background: {
                    image: !1,
                    color: !1,
                    color_value: ""
                }
            }, this.has.title = i, this.data = {
                unique_id: null,
                background: null,
                start_date: null,
                end_date: null,
                location: null,
                text: null,
                media: null,
                autolink: !0
            }, this.options = {
                duration: 1e3,
                slide_padding_lr: 40,
                ease: TL.Ease.easeInSpline,
                width: 600,
                height: 600,
                skinny_size: 650,
                media_name: ""
            }, this.active = !1, this.animator = {}, TL.Util.mergeData(this.options, e), TL.Util.mergeData(this.data, t), this._initLayout(), this._initEvents()
        },
        show: function() {
            this.animator = TL.Animate(this._el.slider_container, {
                left: -(this._el.container.offsetWidth * n) + "px",
                duration: this.options.duration,
                easing: this.options.ease
            })
        },
        hide: function() {},
        setActive: function(t) {
            this.active = t, this.active ? (this.data.background && this.fire("background_change", this.has.background), this.loadMedia()) : this.stopMedia()
        },
        addTo: function(t) {
            t.appendChild(this._el.container)
        },
        removeFrom: function(t) {
            t.removeChild(this._el.container)
        },
        updateDisplay: function(t, e, i) {
            this._updateDisplay(t, e, i)
        },
        loadMedia: function() {
            var t = this;
            this._media && !this._state.loaded && (this._media.loadMedia(), this._state.loaded = !0), this._background_media && !this._background_media._state.loaded && (this._background_media.on("loaded", function() {
                t._updateBackgroundDisplay()
            }), this._background_media.loadMedia())
        },
        stopMedia: function() {
            this._media && this._state.loaded && this._media.stopMedia()
        },
        getBackground: function() {
            return this.has.background
        },
        scrollToTop: function() {
            this._el.container.scrollTop = 0
        },
        getFormattedDate: function() {
            if (TL.Util.trim(this.data.display_date).length > 0) return this.data.display_date;
            var t = "";
            return this.has.title || (this.data.end_date && (t = " &mdash; " + this.data.end_date.getDisplayDate(this.getLanguage())), this.data.start_date && (t = this.data.start_date.getDisplayDate(this.getLanguage()) + t)), t
        },
        _initLayout: function() {
            if (this._el.container = TL.Dom.create("div", "tl-slide"), this.has.title && (this._el.container.className = "tl-slide tl-slide-titleslide"), this.data.unique_id && (this._el.container.id = this.data.unique_id), this._el.scroll_container = TL.Dom.create("div", "tl-slide-scrollable-container", this._el.container), this._el.content_container = TL.Dom.create("div", "tl-slide-content-container", this._el.scroll_container), this._el.content = TL.Dom.create("div", "tl-slide-content", this._el.content_container), this._el.background = TL.Dom.create("div", "tl-slide-background", this._el.container), this.data.background) {
                if (this.data.background.url) {
                    var t = TL.MediaType(this.data.background, !0);
                    t && (this._background_media = new t.cls(this.data.background, {
                        background: 1
                    }), this.has.background.image = !0, this._el.container.className += " tl-full-image-background", this.has.background.color_value = "#000", this._el.background.style.display = "block")
                }
                this.data.background.color && (this.has.background.color = !0, this._el.container.className += " tl-full-color-background", this.has.background.color_value = this.data.background.color), this.data.background.text_background && (this._el.container.className += " tl-text-background")
            }
            this.data.media && this.data.media.url && "" != this.data.media.url && (this.has.media = !0), this.data.text && this.data.text.text && (this.has.text = !0), this.data.text && this.data.text.headline && (this.has.headline = !0), this.has.media && (this.data.media.mediatype = TL.MediaType(this.data.media), this.options.media_name = this.data.media.mediatype.name, this.options.media_type = this.data.media.mediatype.type, this.options.autolink = this.data.autolink, this._media = new this.data.media.mediatype.cls(this.data.media, this.options)), (this.has.text || this.has.headline) && (this._text = new TL.Media.Text(this.data.text, {
                title: this.has.title,
                language: this.options.language,
                autolink: this.data.autolink
            }), this._text.addDateText(this.getFormattedDate())), this.has.text || this.has.headline || !this.has.media ? this.has.headline && this.has.media && !this.has.text ? (TL.DomUtil.addClass(this._el.container, "tl-slide-media-only"), this._text.addTo(this._el.content), this._media.addTo(this._el.content)) : this.has.text && this.has.media ? (this._media.addTo(this._el.content), this._text.addTo(this._el.content)) : (this.has.text || this.has.headline) && (TL.DomUtil.addClass(this._el.container, "tl-slide-text-only"), this._text.addTo(this._el.content)) : (TL.DomUtil.addClass(this._el.container, "tl-slide-media-only"), this._media.addTo(this._el.content)), this.onLoaded()
        },
        _initEvents: function() {},
        _updateDisplay: function(t, e, i) {
            var n, a = this.options.slide_padding_lr,
                s = this.options.slide_padding_lr;
            this.options.width = t ? t : this._el.container.offsetWidth, n = this.options.width - 2 * this.options.slide_padding_lr, TL.Browser.mobile && this.options.width <= this.options.skinny_size ? (a = 0, s = 0, n = this.options.width) : "landscape" == i || this.options.width <= this.options.skinny_size && (a = 50, s = 50, n = this.options.width - a - s), this._el.content.style.paddingLeft = a + "px", this._el.content.style.paddingRight = s + "px", this._el.content.style.width = n + "px", this.options.height = e ? e : this._el.container.offsetHeight, this._media && (!this.has.text && this.has.headline ? this._media.updateDisplay(n, this.options.height - this._text.headlineHeight(), i) : this.has.text || this.has.headline ? this.options.width <= this.options.skinny_size ? this._media.updateDisplay(n, this.options.height, i) : this._media.updateDisplay(n / 2, this.options.height, i) : this._media.updateDisplay(n, this.options.height, i)), this._updateBackgroundDisplay()
        },
        _updateBackgroundDisplay: function() {
            this._background_media && this._background_media._state.loaded && (this._el.background.style.backgroundImage = "url('" + this._background_media.getImageURL(this.options.width, this.options.height) + "')")
        }
    }), TL.SlideNav = TL.Class.extend({
        includes: [TL.Events, TL.DomMixins],
        _el: {},
        initialize: function(t, e, i) {
            this._el = {
                container: {},
                content_container: {},
                icon: {},
                title: {},
                description: {}
            }, this.mediatype = {}, this.data = {
                title: "Navigation",
                description: "Description",
                date: "Date"
            }, this.options = {
                direction: "previous"
            }, this.animator = null, TL.Util.mergeData(this.options, e), TL.Util.mergeData(this.data, t), this._el.container = TL.Dom.create("div", "tl-slidenav-" + this.options.direction), TL.Browser.mobile && this._el.container.setAttribute("ontouchstart", " "), this._initLayout(), this._initEvents(), i && i.appendChild(this._el.container)
        },
        update: function(t) {
            var e = {
                title: "",
                description: "",
                date: t.getFormattedDate()
            };
            t.data.text && t.data.text.headline && (e.title = t.data.text.headline), this._update(e)
        },
        setColor: function(t) {
            this._el.content_container.className = t ? "tl-slidenav-content-container tl-slidenav-inverted" : "tl-slidenav-content-container"
        },
        _onMouseClick: function() {
            this.fire("clicked", this.options)
        },
        _update: function(t) {
            this.data = TL.Util.mergeData(this.data, t), this._el.title.innerHTML = TL.Util.unlinkify(this.data.title), this._el.description.innerHTML = TL.Util.unlinkify(this.data.date)
        },
        _initLayout: function() {
            this._el.content_container = TL.Dom.create("div", "tl-slidenav-content-container", this._el.container), this._el.icon = TL.Dom.create("div", "tl-slidenav-icon", this._el.content_container), this._el.title = TL.Dom.create("div", "tl-slidenav-title", this._el.content_container), this._el.description = TL.Dom.create("div", "tl-slidenav-description", this._el.content_container), this._el.icon.innerHTML = "&nbsp;", this._update()
        },
        _initEvents: function() {
            TL.DomEvent.addListener(this._el.container, "click", this._onMouseClick, this)
        }
    }), TL.StorySlider = TL.Class.extend({
        includes: [TL.Events, TL.I18NMixins],
        initialize: function(t, e, i, n) {
            this._el = {
                container: {},
                background: {},
                slider_container_mask: {},
                slider_container: {},
                slider_item_container: {}
            }, this._nav = {}, this._nav.previous = {}, this._nav.next = {}, this.slide_spacing = 0, this._slides = [], this._swipable, this.preloadTimer, this._message, this.current_id = "", this.data = {}, this.options = {
                id: "",
                layout: "portrait",
                width: 600,
                height: 600,
                default_bg_color: {
                    r: 255,
                    g: 255,
                    b: 255
                },
                slide_padding_lr: 40,
                start_at_slide: 1,
                slide_default_fade: "0%",
                duration: 1e3,
                ease: TL.Ease.easeInOutQuint,
                dragging: !0,
                trackResize: !0
            }, "object" == typeof t ? (this._el.container = t, this.options.id = TL.Util.unique_ID(6, "tl")) : (this.options.id = t, this._el.container = TL.Dom.get(t)), this._el.container.id || (this._el.container.id = this.options.id), this.animator = null, TL.Util.mergeData(this.options, i), TL.Util.mergeData(this.data, e), n && this.init()
        },
        init: function() {
            this._initLayout(), this._initEvents(), this._initData(), this._updateDisplay(), this.goTo(this.options.start_at_slide), this._onLoaded()
        },
        _addSlide: function(t) {
            t.addTo(this._el.slider_item_container), t.on("added", this._onSlideAdded, this), t.on("background_change", this._onBackgroundChange, this)
        },
        _createSlide: function(t, e, i) {
            var n = new TL.Slide(t, this.options, e);
            this._addSlide(n), 0 > i ? this._slides.push(n) : this._slides.splice(i, 0, n)
        },
        _createSlides: function(t) {
            for (var e = 0; e < t.length; e++) "" == t[e].unique_id && (t[e].unique_id = TL.Util.unique_ID(6, "tl-slide")), this._createSlide(t[e], !1, -1)
        },
        _removeSlide: function(t) {
            t.removeFrom(this._el.slider_item_container), t.off("added", this._onSlideRemoved, this), t.off("background_change", this._onBackgroundChange)
        },
        _destroySlide: function(t) {
            this._removeSlide(this._slides[t]), this._slides.splice(t, 1)
        },
        _findSlideIndex: function(t) {
            var e = t;
            return ("string" == typeof t || t instanceof String) && (e = TL.Util.findArrayNumberByUniqueID(t, this._slides, "unique_id")), e
        },
        updateDisplay: function(t, e, i, n) {
            this._updateDisplay(t, e, i, n)
        },
        createSlide: function(t, e) {
            this._createSlide(t, !1, e)
        },
        createSlides: function(t) {
            this._createSlides(t)
        },
        destroySlide: function(t) {
            this._destroySlide(t)
        },
        destroySlideId: function(t) {
            this.destroySlide(this._findSlideIndex(t))
        },
        goTo: function(t, e, i) {
            t = parseInt(t), isNaN(t) && (t = 0);
            var n = this;
            this.changeBackground({
                color_value: "",
                image: !1
            }), this.preloadTimer && clearTimeout(this.preloadTimer);
            for (var a = 0; a < this._slides.length; a++) this._slides[a].setActive(!1);
            t < this._slides.length && t >= 0 && (this.current_id = this._slides[t].data.unique_id, this.animator && this.animator.stop(), this._swipable && this._swipable.stopMomentum(), e ? (this._el.slider_container.style.left = -(this.slide_spacing * t) + "px", this._onSlideChange(i)) : this.animator = TL.Animate(this._el.slider_container, {
                left: -(this.slide_spacing * t) + "px",
                duration: this.options.duration,
                easing: this.options.ease,
                complete: this._onSlideChange(i)
            }), this._slides[t].setActive(!0), this._slides[t + 1] ? (this.showNav(this._nav.next, !0), this._nav.next.update(this._slides[t + 1])) : this.showNav(this._nav.next, !1), this._slides[t - 1] ? (this.showNav(this._nav.previous, !0), this._nav.previous.update(this._slides[t - 1])) : this.showNav(this._nav.previous, !1), this.preloadTimer = setTimeout(function() {
                n.preloadSlides(t)
            }, this.options.duration))
        },
        goToId: function(t, e, i) {
            this.goTo(this._findSlideIndex(t), e, i)
        },
        preloadSlides: function(t) {
            this._slides[t + 1] && (this._slides[t + 1].loadMedia(), this._slides[t + 1].scrollToTop()), this._slides[t + 2] && (this._slides[t + 2].loadMedia(), this._slides[t + 2].scrollToTop()), this._slides[t - 1] && (this._slides[t - 1].loadMedia(), this._slides[t - 1].scrollToTop()), this._slides[t - 2] && (this._slides[t - 2].loadMedia(), this._slides[t - 2].scrollToTop())
        },
        next: function() {
            var t = this._findSlideIndex(this.current_id);
            this.goTo(t + 1 < this._slides.length ? t + 1 : t)
        },
        previous: function() {
            var t = this._findSlideIndex(this.current_id);
            this.goTo(t - 1 >= 0 ? t - 1 : t)
        },
        showNav: function(t, e) {
            this.options.width <= 500 && TL.Browser.mobile || (e ? t.show() : t.hide())
        },
        changeBackground: function(t) {
            var e, i = {
                r: 256,
                g: 256,
                b: 256
            };
            t.color_value && "" != t.color_value ? (i = TL.Util.hexToRgb(t.color_value), i || (trace("Invalid color value " + t.color_value), i = this.options.default_bg_color)) : (i = this.options.default_bg_color, t.color_value = "rgb(" + i.r + " , " + i.g + ", " + i.b + ")"), e = i.r + "," + i.g + "," + i.b, this._el.background.style.backgroundImage = "none", this._el.background.style.backgroundColor = t.color_value ? t.color_value : "transparent", i.r < 255 || i.g < 255 || i.b < 255 || t.image ? (this._nav.next.setColor(!0), this._nav.previous.setColor(!0)) : (this._nav.next.setColor(!1), this._nav.previous.setColor(!1))
        },
        _updateDisplay: function(t, e, i, n) {
            var a, s;
            s = "undefined" == typeof n ? this.options.layout : n, this.options.layout = s, this.slide_spacing = 2 * this.options.width, this.options.width = t ? t : this._el.container.offsetWidth, this.options.height = e ? e : this._el.container.offsetHeight, a = this.options.height / 2, this._nav.next.setPosition({
                top: a
            }), this._nav.previous.setPosition({
                top: a
            });
            for (var o = 0; o < this._slides.length; o++) this._slides[o].updateDisplay(this.options.width, this.options.height, s), this._slides[o].setPosition({
                left: this.slide_spacing * o,
                top: 0
            });
            this.goToId(this.current_id, !0, !0)
        },
        _updateDrawSlides: function() {
            for (var t = this.options.layout, e = 0; e < this._slides.length; e++) this._slides[e].updateDisplay(this.options.width, this.options.height, t), this._slides[e].setPosition({
                left: this.slide_spacing * e,
                top: 0
            });
            this.goToId(this.current_id, !0, !1)
        },
        _initLayout: function() {
            TL.DomUtil.addClass(this._el.container, "tl-storyslider"), this._el.slider_container_mask = TL.Dom.create("div", "tl-slider-container-mask", this._el.container), this._el.background = TL.Dom.create("div", "tl-slider-background tl-animate", this._el.container), this._el.slider_container = TL.Dom.create("div", "tl-slider-container tlanimate", this._el.slider_container_mask), this._el.slider_item_container = TL.Dom.create("div", "tl-slider-item-container", this._el.slider_container), this.options.width = this._el.container.offsetWidth, this.options.height = this._el.container.offsetHeight, this._nav.previous = new TL.SlideNav({
                title: "Previous",
                description: "description"
            }, {
                direction: "previous"
            }), this._nav.next = new TL.SlideNav({
                title: "Next",
                description: "description"
            }, {
                direction: "next"
            }), this._nav.next.addTo(this._el.container), this._nav.previous.addTo(this._el.container), this._el.slider_container.style.left = "0px", TL.Browser.touch && (this._swipable = new TL.Swipable(this._el.slider_container_mask, this._el.slider_container, {
                enable: {
                    x: !0,
                    y: !1
                },
                snap: !0
            }), this._swipable.enable(), this._message = new TL.Message({}, {
                message_class: "tl-message-full",
                message_icon_class: "tl-icon-swipe-left"
            }), this._message.updateMessage(this._("swipe_to_navigate")), this._message.addTo(this._el.container))
        },
        _initEvents: function() {
            this._nav.next.on("clicked", this._onNavigation, this), this._nav.previous.on("clicked", this._onNavigation, this), this._message && this._message.on("clicked", this._onMessageClick, this), this._swipable && (this._swipable.on("swipe_left", this._onNavigation, this), this._swipable.on("swipe_right", this._onNavigation, this), this._swipable.on("swipe_nodirection", this._onSwipeNoDirection, this))
        },
        _initData: function() {
            this.data.title && this._createSlide(this.data.title, !0, -1), this._createSlides(this.data.events)
        },
        _onBackgroundChange: function(t) {
            var e = this._findSlideIndex(this.current_id),
                i = this._slides[e].getBackground();
            this.changeBackground(t), this.fire("colorchange", i)
        },
        _onMessageClick: function() {
            this._message.hide()
        },
        _onSwipeNoDirection: function() {
            this.goToId(this.current_id)
        },
        _onNavigation: function(t) {
            "next" == t.direction || "left" == t.direction ? this.next() : ("previous" == t.direction || "right" == t.direction) && this.previous(), this.fire("nav_" + t.direction, this.data)
        },
        _onSlideAdded: function() {
            trace("slideadded"), this.fire("slideAdded", this.data)
        },
        _onSlideRemoved: function() {
            this.fire("slideRemoved", this.data)
        },
        _onSlideChange: function(t) {
            t || this.fire("change", {
                unique_id: this.current_id
            })
        },
        _onMouseClick: function() {},
        _fireMouseEvent: function(t) {
            if (this._loaded) {
                var e = t.type;
                e = "mouseenter" === e ? "mouseover" : "mouseleave" === e ? "mouseout" : e, this.hasEventListeners(e) && ("contextmenu" === e && TL.DomEvent.preventDefault(t), this.fire(e, {
                    latlng: "something",
                    layerPoint: "something else"
                }))
            }
        },
        _onLoaded: function() {
            this.fire("loaded", this.data)
        }
    }), TL.TimeNav = TL.Class.extend({
        includes: [TL.Events, TL.DomMixins],
        _el: {},
        initialize: function(t, e, i, n) {
            this._el = {
                parent: {},
                container: {},
                slider: {},
                slider_background: {},
                line: {},
                marker_container_mask: {},
                marker_container: {},
                marker_item_container: {},
                timeaxis: {},
                timeaxis_background: {},
                attribution: {}
            }, this.collapsed = !1, this._el.container = "object" == typeof t ? t : TL.Dom.get(t), this.config = e, this.options = {
                width: 600,
                height: 600,
                duration: 1e3,
                ease: TL.Ease.easeInOutQuint,
                has_groups: !1,
                optimal_tick_width: 50,
                scale_factor: 2,
                marker_padding: 5,
                timenav_height_min: 150,
                marker_height_min: 30,
                marker_width_min: 100,
                zoom_sequence: [.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
            }, this.animator = null, this.ready = !1, this._markers = [], this._eras = [], this.has_eras = !1, this._groups = [], this._calculated_row_height = 100, this.current_id = "", this.timescale = {}, this.timeaxis = {}, this.axishelper = {}, this.max_rows = 6, this.animate_css = !1, this._swipable, TL.Util.mergeData(this.options, i), n && this.init()
        },
        init: function() {
            this._initLayout(), this._initEvents(), this._initData(), this._updateDisplay(), this._onLoaded()
        },
        positionMarkers: function() {
            this._positionMarkers()
        },
        updateDisplay: function(t, e, i, n) {
            this._updateDisplay(t, e, i, n)
        },
        _getTimeScale: function() {
            var t = 0;
            try {
                t = parseInt(this.options.marker_height_min)
            } catch (e) {
                trace("Invalid value for marker_height_min option."), t = 30
            }
            return 0 == t && (trace("marker_height_min option must not be zero."), t = 30), this.max_rows = Math.round((this.options.height - this._el.timeaxis_background.offsetHeight - this.options.marker_padding) / t), this.max_rows < 1 && (this.max_rows = 1), new TL.TimeScale(this.config, {
                display_width: this._el.container.offsetWidth,
                screen_multiplier: this.options.scale_factor,
                max_rows: this.max_rows
            })
        },
        _updateTimeScale: function(t) {
            this.options.scale_factor = t, this._updateDrawTimeline()
        },
        zoomIn: function() {
            var t = TL.Util.findNextGreater(this.options.zoom_sequence, this.options.scale_factor);
            t == this.options.zoom_sequence[this.options.zoom_sequence.length - 1] ? this.fire("zoomtoggle", {
                zoom: "in",
                show: !1
            }) : this.fire("zoomtoggle", {
                zoom: "in",
                show: !0
            }), this.setZoomFactor(t)
        },
        zoomOut: function() {
            var t = TL.Util.findNextLesser(this.options.zoom_sequence, this.options.scale_factor);
            t == this.options.zoom_sequence[0] ? this.fire("zoomtoggle", {
                zoom: "out",
                show: !1
            }) : this.fire("zoomtoggle", {
                zoom: "out",
                show: !0
            }), this.setZoomFactor(t)
        },
        setZoom: function(t) {
            var e = this.options.zoom_sequence[t];
            "number" == typeof e ? this.setZoomFactor(e) : console.warn("Invalid zoom level. Please use a number between 0 and " + (this.options.zoom_sequence.length - 1))
        },
        setZoomFactor: function(t) {
            this.options.scale_factor = t, this.goToId(this.current_id, !this._updateDrawTimeline(!0), !0)
        },
        _createGroups: function() {
            var t = this.timescale.getGroupLabels();
            if (t) {
                this.options.has_groups = !0;
                for (var e = 0; e < t.length; e++) this._createGroup(t[e])
            }
        },
        _createGroup: function(t) {
            var e = new TL.TimeGroup(t);
            this._addGroup(e), this._groups.push(e)
        },
        _addGroup: function(t) {
            t.addTo(this._el.container)
        },
        _positionGroups: function() {
            if (this.options.has_groups)
                for (var t = this.options.height - this._el.timeaxis_background.offsetHeight, e = Math.floor(t / this.timescale.getNumberOfRows() - this.options.marker_padding), i = (this.timescale.getGroupLabels(), 0), n = 0; i < this._groups.length; i++) {
                    var a = Math.floor(n * (e + this.options.marker_padding)),
                        s = !1;
                    a > t - this.options.marker_padding && (s = !0), this._groups[i].setRowPosition(a, this._calculated_row_height + this.options.marker_padding / 2), this._groups[i].setAlternateRowColor(TL.Util.isEven(i), s), n += this._groups[i].data.rows
                }
        },
        _addMarker: function(t) {
            t.addTo(this._el.marker_item_container), t.on("markerclick", this._onMarkerClick, this), t.on("added", this._onMarkerAdded, this)
        },
        _createMarker: function(t, e) {
            var i = new TL.TimeMarker(t, this.options);
            this._addMarker(i), 0 > e ? this._markers.push(i) : this._markers.splice(e, 0, i)
        },
        _createMarkers: function(t) {
            for (var e = 0; e < t.length; e++) this._createMarker(t[e], -1)
        },
        _removeMarker: function(t) {
            t.removeFrom(this._el.marker_item_container)
        },
        _destroyMarker: function(t) {
            this._removeMarker(this._markers[t]), this._markers.splice(t, 1)
        },
        _positionMarkers: function(t) {
            for (var e = 0; e < this._markers.length; e++) {
                var i = this.timescale.getPositionInfo(e);
                this._markers[e].setClass(t ? "tl-timemarker tl-timemarker-fast" : "tl-timemarker"), this._markers[e].setPosition({
                    left: i.start
                }), this._markers[e].setWidth(i.width)
            }
        },
        _calculateMarkerHeight: function(t) {
            return t / this.timescale.getNumberOfRows() - this.options.marker_padding
        },
        _calculateRowHeight: function(t) {
            return t / this.timescale.getNumberOfRows()
        },
        _calculateAvailableHeight: function() {
            return this.options.height - this._el.timeaxis_background.offsetHeight - this.options.marker_padding
        },
        _calculateMinimumTimeNavHeight: function() {
            return this.timescale.getNumberOfRows() * this.options.marker_height_min + this._el.timeaxis_background.offsetHeight + this.options.marker_padding
        },
        getMinimumHeight: function() {
            return this._calculateMinimumTimeNavHeight()
        },
        _assignRowsToMarkers: function() {
            var t = this._calculateAvailableHeight(),
                e = this._calculateMarkerHeight(t);
            this._positionGroups(), this._calculated_row_height = this._calculateRowHeight(t);
            for (var i = 0; i < this._markers.length; i++) {
                this._markers[i].setHeight(e);
                var n = this.timescale.getPositionInfo(i).row,
                    a = Math.floor(n * (e + this.options.marker_padding)) + this.options.marker_padding,
                    s = t - a + this.options.marker_padding;
                this._markers[i].setRowPosition(a, s)
            }
        },
        _resetMarkersActive: function() {
            for (var t = 0; t < this._markers.length; t++) this._markers[t].setActive(!1)
        },
        _findMarkerIndex: function(t) {
            var e = -1;
            return ("string" == typeof t || t instanceof String) && (e = TL.Util.findArrayNumberByUniqueID(t, this._markers, "unique_id", e)), e
        },
        _createEras: function(t) {
            for (var e = 0; e < t.length; e++) this._createEra(t[e], -1)
        },
        _createEra: function(t, e) {
            var i = new TL.TimeEra(t, this.options);
            this._addEra(i), 0 > e ? this._eras.push(i) : this._eras.splice(e, 0, i)
        },
        _addEra: function(t) {
            t.addTo(this._el.marker_item_container), t.on("added", this._onEraAdded, this)
        },
        _removeEra: function(t) {
            t.removeFrom(this._el.marker_item_container)
        },
        _destroyEra: function(t) {
            this._removeEra(this._eras[t]), this._eras.splice(t, 1)
        },
        _positionEras: function(t) {
            for (var e = 0, i = 0; i < this._eras.length; i++) {
                var n = {
                    start: 0,
                    end: 0,
                    width: 0
                };
                n.start = this.timescale.getPosition(this._eras[i].data.start_date.getTime()), n.end = this.timescale.getPosition(this._eras[i].data.end_date.getTime()), n.width = n.end - n.start, this._eras[i].setClass(t ? "tl-timeera tl-timeera-fast" : "tl-timeera"), this._eras[i].setPosition({
                    left: n.start
                }), this._eras[i].setWidth(n.width), e++, e > 5 && (e = 0), this._eras[i].setColor(e)
            }
        },
        createMarker: function(t, e) {
            this._createMarker(t, e)
        },
        createMarkers: function(t) {
            this._createMarkers(t)
        },
        destroyMarker: function(t) {
            this._destroyMarker(t)
        },
        destroyMarkerId: function(t) {
            this.destroyMarker(this._findMarkerIndex(t))
        },
        goTo: function(t, e, i) {
            var n = this.options.ease,
                a = this.options.duration,
                s = 0 > t ? 0 : t;
            this._resetMarkersActive(), t >= 0 && t < this._markers.length && this._markers[t].setActive(!0), this.animator && this.animator.stop(), e ? (this._el.slider.className = "tl-timenav-slider", this._el.slider.style.left = -this._markers[s].getLeft() + this.options.width / 2 + "px") : i ? (this._el.slider.className = "tl-timenav-slider tl-timenav-slider-animate", this.animate_css = !0, this._el.slider.style.left = -this._markers[s].getLeft() + this.options.width / 2 + "px") : (this._el.slider.className = "tl-timenav-slider", this.animator = TL.Animate(this._el.slider, {
                left: -this._markers[s].getLeft() + this.options.width / 2 + "px",
                duration: a,
                easing: n
            })), this.current_id = t >= 0 && t < this._markers.length ? this._markers[t].data.unique_id : ""
        },
        goToId: function(t, e, i) {
            this.goTo(this._findMarkerIndex(t), e, i)
        },
        _onLoaded: function() {
            this.ready = !0, this.fire("loaded", this.config)
        },
        _onMarkerAdded: function() {
            this.fire("dateAdded", this.config)
        },
        _onEraAdded: function() {
            this.fire("eraAdded", this.config)
        },
        _onMarkerRemoved: function() {
            this.fire("dateRemoved", this.config)
        },
        _onMarkerClick: function(t) {
            this.goToId(t.unique_id), this.fire("change", {
                unique_id: t.unique_id
            })
        },
        _onMouseScroll: function(t) {
            var e = 0,
                i = 0,
                n = {
                    right: -(this.timescale.getPixelWidth() - this.options.width / 2),
                    left: this.options.width / 2
                };
            t || (t = window.event), t.originalEvent && (t = t.originalEvent), "undefined" != typeof t.wheelDeltaX && (e = t.wheelDeltaY / 6, e = Math.abs(t.wheelDeltaX) > Math.abs(t.wheelDeltaY) ? t.wheelDeltaX / 6 : 0), e && (t.preventDefault && t.preventDefault(), t.returnValue = !1), i = parseInt(this._el.slider.style.left.replace("px", "")) + e, i > n.left ? i = n.left : i < n.right && (i = n.right), this.animate_css && (this._el.slider.className = "tl-timenav-slider", this.animate_css = !1), this._el.slider.style.left = i + "px"
        },
        _onDragMove: function() {
            this.animate_css && (this._el.slider.className = "tl-timenav-slider", this.animate_css = !1)
        },
        _updateDisplay: function(t, e) {
            t && (this.options.width = t), e && e != this.options.height && (this.options.height = e, this.timescale = this._getTimeScale()), this._assignRowsToMarkers(), this._el.slider_background.style.width = this.timescale.getPixelWidth() + this.options.width + "px", this._el.slider_background.style.left = -(this.options.width / 2) + "px", this._el.slider.style.width = this.timescale.getPixelWidth() + this.options.width + "px", this._swipable.updateConstraint({
                top: !1,
                bottom: !1,
                left: this.options.width / 2,
                right: -(this.timescale.getPixelWidth() - this.options.width / 2)
            }), this.goToId(this.current_id, !0)
        },
        _drawTimeline: function(t) {
            this.timescale = this._getTimeScale(), this.timeaxis.drawTicks(this.timescale, this.options.optimal_tick_width), this._positionMarkers(t), this._assignRowsToMarkers(), this._createGroups(), this._positionGroups(), this.has_eras && this._positionEras(t)
        },
        _updateDrawTimeline: function(t) {
            var e = !1;
            if (t) {
                var i = new TL.TimeScale(this.config, {
                    display_width: this._el.container.offsetWidth,
                    screen_multiplier: this.options.scale_factor,
                    max_rows: this.max_rows
                });
                this.timescale.getMajorScale() == i.getMajorScale() && this.timescale.getMinorScale() == i.getMinorScale() && (e = !0)
            } else e = !0;
            return e ? (this.timescale = this._getTimeScale(), this.timeaxis.positionTicks(this.timescale, this.options.optimal_tick_width), this._positionMarkers(), this._assignRowsToMarkers(), this._positionGroups(), this.has_eras && this._positionEras(), this._updateDisplay()) : this._drawTimeline(!0), e
        },
        _initLayout: function() {
            this._el.attribution = TL.Dom.create("div", "tl-attribution", this._el.container), this._el.line = TL.Dom.create("div", "tl-timenav-line", this._el.container), this._el.slider = TL.Dom.create("div", "tl-timenav-slider", this._el.container), this._el.slider_background = TL.Dom.create("div", "tl-timenav-slider-background", this._el.slider), this._el.marker_container_mask = TL.Dom.create("div", "tl-timenav-container-mask", this._el.slider), this._el.marker_container = TL.Dom.create("div", "tl-timenav-container", this._el.marker_container_mask), this._el.marker_item_container = TL.Dom.create("div", "tl-timenav-item-container", this._el.marker_container), this._el.timeaxis = TL.Dom.create("div", "tl-timeaxis", this._el.slider), this._el.timeaxis_background = TL.Dom.create("div", "tl-timeaxis-background", this._el.container), this._el.attribution.innerHTML = "<a href='http://timeline.knightlab.com' target='_blank'><span class='tl-knightlab-logo'></span>Timeline JS</a>", this.timeaxis = new TL.TimeAxis(this._el.timeaxis, this.options), this._swipable = new TL.Swipable(this._el.slider_background, this._el.slider, {
                enable: {
                    x: !0,
                    y: !1
                },
                constraint: {
                    top: !1,
                    bottom: !1,
                    left: this.options.width / 2,
                    right: !1
                },
                snap: !1
            }), this._swipable.enable()
        },
        _initEvents: function() {
            this._swipable.on("dragmove", this._onDragMove, this), TL.DomEvent.addListener(this._el.container, "mousewheel", this._onMouseScroll, this), TL.DomEvent.addListener(this._el.container, "DOMMouseScroll", this._onMouseScroll, this)
        },
        _initData: function() {
            this._createMarkers(this.config.events), this.config.eras && (this.has_eras = !0, this._createEras(this.config.eras)), this._drawTimeline()
        }
    }), TL.TimeMarker = TL.Class.extend({
        includes: [TL.Events, TL.DomMixins],
        _el: {},
        initialize: function(t, e) {
            this._el = {
                container: {},
                content_container: {},
                media_container: {},
                timespan: {},
                line_left: {},
                line_right: {},
                content: {},
                text: {},
                media: {}
            }, this._text = {}, this._state = {
                loaded: !1
            }, this.data = {
                unique_id: "",
                background: null,
                date: {
                    year: 0,
                    month: 0,
                    day: 0,
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0,
                    thumbnail: "",
                    format: ""
                },
                text: {
                    headline: "",
                    text: ""
                },
                media: null
            }, this.options = {
                duration: 1e3,
                ease: TL.Ease.easeInSpline,
                width: 600,
                height: 600,
                marker_width_min: 100
            }, this.active = !1, this.animator = {}, this.has_end_date = !1, TL.Util.mergeData(this.options, e), TL.Util.mergeData(this.data, t), this._initLayout(), this._initEvents()
        },
        show: function() {},
        hide: function() {},
        setActive: function(t) {
            this.active = t, this._el.container.className = this.active && this.has_end_date ? "tl-timemarker tl-timemarker-with-end tl-timemarker-active" : this.active ? "tl-timemarker tl-timemarker-active" : this.has_end_date ? "tl-timemarker tl-timemarker-with-end" : "tl-timemarker"
        },
        addTo: function(t) {
            t.appendChild(this._el.container)
        },
        removeFrom: function(t) {
            t.removeChild(this._el.container)
        },
        updateDisplay: function(t, e) {
            this._updateDisplay(t, e)
        },
        loadMedia: function() {
            this._media && !this._state.loaded && (this._media.loadMedia(), this._state.loaded = !0)
        },
        stopMedia: function() {
            this._media && this._state.loaded && this._media.stopMedia()
        },
        getLeft: function() {
            return this._el.container.style.left.slice(0, -2)
        },
        getTime: function() {
            return this.data.start_date.getTime()
        },
        getEndTime: function() {
            return this.data.end_date ? this.data.end_date.getTime() : !1
        },
        setHeight: function(t) {
            var e = 12,
                i = 1;
            this._el.content_container.style.height = t + "px", this._el.timespan_content.style.height = t + "px", this._el.content.className = 30 >= t ? "tl-timemarker-content tl-timemarker-content-small" : "tl-timemarker-content", 56 >= t ? TL.DomUtil.addClass(this._el.content_container, "tl-timemarker-content-container-small") : TL.DomUtil.removeClass(this._el.content_container, "tl-timemarker-content-container-small"), TL.Browser.webkit ? (i = Math.floor(t / (e + 2)), 1 > i && (i = 1), this._text.className = "tl-headline", this._text.style.webkitLineClamp = i) : (i = t / e, this._text.className = i > 1 ? "tl-headline tl-headline-fadeout" : "tl-headline", this._text.style.height = i * e + "px")
        },
        setWidth: function(t) {
            this.data.end_date && (this._el.container.style.width = t + "px", t > this.options.marker_width_min ? (this._el.content_container.style.width = t + "px", this._el.content_container.className = "tl-timemarker-content-container tl-timemarker-content-container-long") : (this._el.content_container.style.width = this.options.marker_width_min + "px", this._el.content_container.className = "tl-timemarker-content-container"))
        },
        setClass: function(t) {
            this._el.container.className = t
        },
        setRowPosition: function(t, e) {
            this.setPosition({
                top: t
            }), this._el.timespan.style.height = e + "px"
        },
        _onMarkerClick: function() {
            this.fire("markerclick", {
                unique_id: this.data.unique_id
            })
        },
        _initLayout: function() {
            if (this._el.container = TL.Dom.create("div", "tl-timemarker"), this.data.unique_id && (this._el.container.id = this.data.unique_id + "-marker"), this.data.end_date && (this.has_end_date = !0, this._el.container.className = "tl-timemarker tl-timemarker-with-end"), this._el.timespan = TL.Dom.create("div", "tl-timemarker-timespan", this._el.container), this._el.timespan_content = TL.Dom.create("div", "tl-timemarker-timespan-content", this._el.timespan), this._el.content_container = TL.Dom.create("div", "tl-timemarker-content-container", this._el.container), this._el.content = TL.Dom.create("div", "tl-timemarker-content", this._el.content_container), this._el.line_left = TL.Dom.create("div", "tl-timemarker-line-left", this._el.timespan), this._el.line_right = TL.Dom.create("div", "tl-timemarker-line-right", this._el.timespan), this.data.media)
                if (this._el.media_container = TL.Dom.create("div", "tl-timemarker-media-container", this._el.content), this.data.media.thumbnail && "" != this.data.media.thumbnail) this._el.media = TL.Dom.create("img", "tl-timemarker-media", this._el.media_container), this._el.media.src = TL.Util.transformImageURL(this.data.media.thumbnail);
                else {
                    var t = TL.MediaType(this.data.media).type;
                    this._el.media = TL.Dom.create("span", "tl-icon-" + t, this._el.media_container)
                }
            this._el.text = TL.Dom.create("div", "tl-timemarker-text", this._el.content), this._text = TL.Dom.create("h2", "tl-headline", this._el.text), this.data.text.headline && "" != this.data.text.headline ? this._text.innerHTML = TL.Util.unlinkify(this.data.text.headline) : this.data.text.text && "" != this.data.text.text ? this._text.innerHTML = TL.Util.unlinkify(this.data.text.text) : this.data.media.caption && "" != this.data.media.caption && (this._text.innerHTML = TL.Util.unlinkify(this.data.media.caption)), this.onLoaded()
        },
        _initEvents: function() {
            TL.DomEvent.addListener(this._el.container, "click", this._onMarkerClick, this)
        },
        _updateDisplay: function(t, e) {
            t && (this.options.width = t), e && (this.options.height = e)
        }
    }), TL.TimeEra = TL.Class.extend({
        includes: [TL.Events, TL.DomMixins],
        _el: {},
        initialize: function(t, e) {
            this._el = {
                container: {},
                background: {},
                content_container: {},
                content: {},
                text: {}
            }, this._text = {}, this._state = {
                loaded: !1
            }, this.data = {
                unique_id: "",
                date: {
                    year: 0,
                    month: 0,
                    day: 0,
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0,
                    thumbnail: "",
                    format: ""
                },
                text: {
                    headline: "",
                    text: ""
                }
            }, this.options = {
                duration: 1e3,
                ease: TL.Ease.easeInSpline,
                width: 600,
                height: 600,
                marker_width_min: 100
            }, this.active = !1, this.animator = {}, this.has_end_date = !1, TL.Util.mergeData(this.options, e), TL.Util.mergeData(this.data, t), this._initLayout(), this._initEvents()
        },
        show: function() {},
        hide: function() {},
        setActive: function() {},
        addTo: function(t) {
            t.appendChild(this._el.container)
        },
        removeFrom: function(t) {
            t.removeChild(this._el.container)
        },
        updateDisplay: function(t, e) {
            this._updateDisplay(t, e)
        },
        getLeft: function() {
            return this._el.container.style.left.slice(0, -2)
        },
        getTime: function() {
            return this.data.start_date.getTime()
        },
        getEndTime: function() {
            return this.data.end_date ? this.data.end_date.getTime() : !1
        },
        setHeight: function(t) {
            var e = 12,
                i = 1;
            this._el.content_container.style.height = t + "px", this._el.content.className = "tl-timeera-content", TL.Browser.webkit ? (i = Math.floor(t / (e + 2)), 1 > i && (i = 1), this._text.className = "tl-headline", this._text.style.webkitLineClamp = i) : (i = t / e, this._text.className = i > 1 ? "tl-headline tl-headline-fadeout" : "tl-headline", this._text.style.height = i * e + "px")
        },
        setWidth: function(t) {
            this.data.end_date && (this._el.container.style.width = t + "px", t > this.options.marker_width_min ? (this._el.content_container.style.width = t + "px", this._el.content_container.className = "tl-timeera-content-container tl-timeera-content-container-long") : (this._el.content_container.style.width = this.options.marker_width_min + "px", this._el.content_container.className = "tl-timeera-content-container"))
        },
        setClass: function(t) {
            this._el.container.className = t
        },
        setRowPosition: function(t, e) {
            this.setPosition({
                top: t
            })
        },
        setColor: function(t) {
            this._el.container.className = "tl-timeera tl-timeera-color" + t
        },
        _initLayout: function() {
            this._el.container = TL.Dom.create("div", "tl-timeera"), this.data.unique_id && (this._el.container.id = this.data.unique_id + "-era"), this.data.end_date && (this.has_end_date = !0, this._el.container.className = "tl-timeera tl-timeera-with-end"), this._el.content_container = TL.Dom.create("div", "tl-timeera-content-container", this._el.container), this._el.background = TL.Dom.create("div", "tl-timeera-background", this._el.content_container), this._el.content = TL.Dom.create("div", "tl-timeera-content", this._el.content_container), this._el.text = TL.Dom.create("div", "tl-timeera-text", this._el.content), this._text = TL.Dom.create("h2", "tl-headline", this._el.text), this.data.text.headline && "" != this.data.text.headline && (this._text.innerHTML = TL.Util.unlinkify(this.data.text.headline)), this.onLoaded()
        },
        _initEvents: function() {},
        _updateDisplay: function(t, e) {
            t && (this.options.width = t), e && (this.options.height = e)
        }
    }), TL.TimeGroup = TL.Class.extend({
        includes: [TL.Events, TL.DomMixins],
        _el: {},
        initialize: function(t) {
            this._el = {
                parent: {},
                container: {},
                message: {}
            }, this.options = {
                width: 600,
                height: 600
            }, this.data = {
                label: "",
                rows: 1
            }, this._el.container = TL.Dom.create("div", "tl-timegroup"), TL.Util.mergeData(this.data, t), this.animator = {}, this._initLayout(), this._initEvents()
        },
        updateDisplay: function() {},
        setRowPosition: function(t, e) {
            this.options.height = e * this.data.rows, this.setPosition({
                top: t
            }), this._el.container.style.height = this.options.height + "px"
        },
        setAlternateRowColor: function(t, e) {
            var i = "tl-timegroup";
            t && (i += " tl-timegroup-alternate"), e && (i += " tl-timegroup-hidden"), this._el.container.className = i
        },
        _onMouseClick: function() {
            this.fire("clicked", this.options)
        },
        _initLayout: function() {
            this._el.message = TL.Dom.create("div", "tl-timegroup-message", this._el.container), this._el.message.innerHTML = this.data.label
        },
        _initEvents: function() {
            TL.DomEvent.addListener(this._el.container, "click", this._onMouseClick, this)
        },
        _updateDisplay: function() {}
    }), TL.TimeScale = TL.Class.extend({
        initialize: function(t, e) {
            var i = t.events;
            this._scale = t.scale, e = TL.Util.mergeData({
                display_width: 500,
                screen_multiplier: 3,
                max_rows: null
            }, e), this._display_width = e.display_width, this._screen_multiplier = e.screen_multiplier, this._pixel_width = this._screen_multiplier * this._display_width, this._group_labels = void 0, this._positions = [], this._pixels_per_milli = 0, this._earliest = t.getEarliestDate().getTime(), this._latest = t.getLatestDate().getTime(), this._span_in_millis = this._latest - this._earliest, this._span_in_millis <= 0 && (this._span_in_millis = this._computeDefaultSpan(t)), this._average = this._span_in_millis / i.length, this._pixels_per_milli = this.getPixelWidth() / this._span_in_millis, this._axis_helper = TL.AxisHelper.getBestHelper(this), this._scaled_padding = 1 / this.getPixelsPerTick() * (this._display_width / 2), this._computePositionInfo(i, e.max_rows)
        },
        _computeDefaultSpan: function(t) {
            if ("human" == t.scale) {
                for (var e = {}, i = 0; i < t.events.length; i++) {
                    var n = t.events[i].start_date.findBestFormat();
                    e[n] = e[n] ? e[n] + 1 : 1
                }
                for (var i = TL.Date.SCALES.length - 1; i >= 0; i--)
                    if (e.hasOwnProperty(TL.Date.SCALES[i][0])) {
                        var a = TL.Date.SCALES[TL.Date.SCALES.length - 1];
                        return TL.Date.SCALES[i + 1] && (a = TL.Date.SCALES[i + 1]), a[1]
                    }
                return 31536e6
            }
            return 2e5
        },
        getGroupLabels: function() {
            return this._group_labels || []
        },
        getScale: function() {
            return this._scale
        },
        getNumberOfRows: function() {
            return this._number_of_rows
        },
        getPixelWidth: function() {
            return this._pixel_width
        },
        getPosition: function(t) {
            return (t - this._earliest) * this._pixels_per_milli
        },
        getPositionInfo: function(t) {
            return this._positions[t]
        },
        getPixelsPerTick: function() {
            return this._axis_helper.getPixelsPerTick(this._pixels_per_milli)
        },
        getTicks: function() {
            return {
                major: this._axis_helper.getMajorTicks(this),
                minor: this._axis_helper.getMinorTicks(this)
            }
        },
        getDateFromTime: function(t) {
            if ("human" == this._scale) return new TL.Date(t);
            if ("cosmological" == this._scale) return new TL.BigDate(new TL.BigYear(t));
            throw new TL.Error("time_scale_scale_err", this._scale)
        },
        getMajorScale: function() {
            return this._axis_helper.major.name
        },
        getMinorScale: function() {
            return this._axis_helper.minor.name
        },
        _assessGroups: function(t) {
            for (var e = [], i = !1, n = 0; n < t.length; n++) t[n].group && (e.indexOf(t[n].group) < 0 ? e.push(t[n].group) : i = !0);
            return e.length && i && e.push(""), e
        },
        _computeRowInfo: function(t, e) {
            for (var i = [], n = 0, a = 0; a < t.length; a++) {
                var s = t[a],
                    o = [];
                delete s.row;
                for (var r = 0; r < i.length; r++)
                    if (o.push(i[r].end - s.start), o[r] <= 0) {
                        s.row = r, i[r] = s;
                        break
                    }
                if ("undefined" == typeof s.row)
                    if (null === e) s.row = i.length, i.push(s);
                    else if (e > 0) s.row = i.length, i.push(s), e--;
                else {
                    var l = Math.min.apply(null, o),
                        h = o.indexOf(l);
                    s.row = h, s.end > i[h].end && (i[h] = s), n++
                }
            }
            return {
                n_rows: i.length,
                n_overlaps: n
            }
        },
        _computePositionInfo: function(t, e, i) {
            i = i || 100;
            for (var n = [], a = !1, s = 0; s < t.length; s++) {
                var o = {
                    start: this.getPosition(t[s].start_date.getTime())
                };
                if (this._positions.push(o), "undefined" != typeof t[s].end_date) {
                    var r = this.getPosition(t[s].end_date.getTime());
                    o.width = r - o.start, o.end = o.width > i ? o.start + o.width : o.start + i
                } else o.width = i, o.end = o.start + i;
                t[s].group ? n.indexOf(t[s].group) < 0 && n.push(t[s].group) : a = !0
            }
            if (n.length) {
                a && n.push("");
                for (var l = [], s = 0; s < n.length; s++) l[s] = {
                    label: n[s],
                    idx: s,
                    positions: [],
                    n_rows: 1,
                    n_overlaps: 0
                };
                for (var s = 0; s < this._positions.length; s++) {
                    var o = this._positions[s];
                    o.group = n.indexOf(t[s].group || ""), o.row = 0;
                    for (var h = l[o.group], d = h.positions.length - 1; d >= 0; d--) h.positions[d].end > o.start && h.n_overlaps++;
                    h.positions.push(o)
                }
                for (var c = n.length;;) {
                    var u = Math.max(0, e - c);
                    if (!u) break;
                    if (l.sort(function(t, e) {
                            return t.n_overlaps > e.n_overlaps ? -1 : t.n_overlaps < e.n_overlaps ? 1 : t.idx - e.idx
                        }), !l[0].n_overlaps) break;
                    for (var c = 0, s = 0; s < l.length; s++) {
                        var h = l[s];
                        if (h.n_overlaps && u) {
                            var m = this._computeRowInfo(h.positions, h.n_rows + 1);
                            h.n_rows = m.n_rows, h.n_overlaps = m.n_overlaps, u--
                        }
                        c += h.n_rows
                    }
                }
                this._number_of_rows = c, this._group_labels = [], l.sort(function(t, e) {
                    return t.idx - e.idx
                });
                for (var s = 0, _ = 0; s < l.length; s++) {
                    this._group_labels.push({
                        label: l[s].label,
                        rows: l[s].n_rows
                    });
                    for (var d = 0; d < l[s].positions.length; d++) {
                        var o = l[s].positions[d];
                        o.row += _
                    }
                    _ += l[s].n_rows
                }
            } else {
                var f = this._computeRowInfo(this._positions, e);
                this._number_of_rows = f.n_rows
            }
        }
    }), TL.TimeAxis = TL.Class.extend({
        includes: [TL.Events, TL.DomMixins, TL.I18NMixins],
        _el: {},
        initialize: function(t, e) {
            this._el = {
                container: {},
                content_container: {},
                major: {},
                minor: {}
            }, this._text = {}, this._state = {
                loaded: !1
            }, this.data = {}, this.options = {
                duration: 1e3,
                ease: TL.Ease.easeInSpline,
                width: 600,
                height: 600
            }, this.active = !1, this.animator = {}, this.axis_helper = {}, this.minor_ticks = [], this.major_ticks = [], this.dateformat_lookup = {
                millisecond: "time_milliseconds",
                second: "time_short",
                minute: "time_no_seconds_short",
                hour: "time_no_minutes_short",
                day: "full_short",
                month: "month_short",
                year: "year",
                decade: "year",
                century: "year",
                millennium: "year",
                age: "compact",
                epoch: "compact",
                era: "compact",
                eon: "compact",
                eon2: "compact"
            }, this._el.container = "object" == typeof t ? t : TL.Dom.get(t), TL.Util.mergeData(this.options, e), this._initLayout(), this._initEvents()
        },
        show: function() {},
        hide: function() {},
        addTo: function(t) {
            t.appendChild(this._el.container)
        },
        removeFrom: function(t) {
            t.removeChild(this._el.container)
        },
        updateDisplay: function(t, e) {
            this._updateDisplay(t, e)
        },
        getLeft: function() {
            return this._el.container.style.left.slice(0, -2)
        },
        drawTicks: function(t, e) {
            {
                var i = t.getTicks();
                ({
                    minor: {
                        el: this._el.minor,
                        dateformat: this.dateformat_lookup[i.minor.name],
                        ts_ticks: i.minor.ticks,
                        tick_elements: this.minor_ticks
                    },
                    major: {
                        el: this._el.major,
                        dateformat: this.dateformat_lookup[i.major.name],
                        ts_ticks: i.major.ticks,
                        tick_elements: this.major_ticks
                    }
                })
            }
            this._el.major.className = "tl-timeaxis-major", this._el.minor.className = "tl-timeaxis-minor", this._el.major.style.opacity = 0, this._el.minor.style.opacity = 0, this.major_ticks = this._createTickElements(i.major.ticks, this._el.major, this.dateformat_lookup[i.major.name]), this.minor_ticks = this._createTickElements(i.minor.ticks, this._el.minor, this.dateformat_lookup[i.minor.name], i.major.ticks), this.positionTicks(t, e, !0), this._el.major.className = "tl-timeaxis-major tl-animate-opacity tl-timeaxis-animate-opacity", this._el.minor.className = "tl-timeaxis-minor tl-animate-opacity tl-timeaxis-animate-opacity", this._el.major.style.opacity = 1, this._el.minor.style.opacity = 1
        },
        _createTickElements: function(t, e, i, n) {
            e.innerHTML = "";
            var a = {};
            if (n)
                for (var s = 0; s < n.length; s++) a[n[s].getTime()] = !0;
            for (var o = [], s = 0; s < t.length; s++) {
                var r = t[s];
                if (!(r.getTime() in a)) {
                    var l = TL.Dom.create("div", "tl-timeaxis-tick", e),
                        h = TL.Dom.create("span", "tl-timeaxis-tick-text tl-animate-opacity", l);
                    h.innerHTML = r.getDisplayDate(this.getLanguage(), i), o.push({
                        tick: l,
                        tick_text: h,
                        display_date: r.getDisplayDate(this.getLanguage(), i),
                        date: r
                    })
                }
            }
            return o
        },
        positionTicks: function(t, e, i) {
            i ? (this._el.major.className = "tl-timeaxis-major", this._el.minor.className = "tl-timeaxis-minor") : (this._el.major.className = "tl-timeaxis-major tl-timeaxis-animate", this._el.minor.className = "tl-timeaxis-minor tl-timeaxis-animate"), this._positionTickArray(this.major_ticks, t, e), this._positionTickArray(this.minor_ticks, t, e)
        },
        _positionTickArray: function(t, e, i) {
            if (t[1] && t[0]) {
                var n = e.getPosition(t[1].date.getMillisecond()) - e.getPosition(t[0].date.getMillisecond()),
                    a = 1;
                i > n && (a = Math.round(i / e.getPixelsPerTick()));
                for (var s = 1, o = 0; o < t.length; o++) {
                    var r = t[o];
                    r.tick.style.left = e.getPosition(r.date.getMillisecond()) + "px", r.tick_text.innerHTML = r.display_date, a > 1 ? s >= a ? (s = 1, r.tick_text.style.opacity = 1, r.tick.className = "tl-timeaxis-tick") : (s++, r.tick_text.style.opacity = 0, r.tick.className = "tl-timeaxis-tick tl-timeaxis-tick-hidden") : (r.tick_text.style.opacity = 1, r.tick.className = "tl-timeaxis-tick")
                }
            }
        },
        _initLayout: function() {
            this._el.content_container = TL.Dom.create("div", "tl-timeaxis-content-container", this._el.container), this._el.major = TL.Dom.create("div", "tl-timeaxis-major", this._el.content_container), this._el.minor = TL.Dom.create("div", "tl-timeaxis-minor", this._el.content_container), this.onLoaded()
        },
        _initEvents: function() {},
        _updateDisplay: function(t, e) {
            t && (this.options.width = t), e && (this.options.height = e)
        }
    }), TL.AxisHelper = TL.Class.extend({
        initialize: function(t) {
            if (!t) throw new TL.Error("axis_helper_no_options_err");
            this.scale = t.scale, this.minor = t.minor, this.major = t.major
        },
        getPixelsPerTick: function(t) {
            return t * this.minor.factor
        },
        getMajorTicks: function(t) {
            return this._getTicks(t, this.major)
        },
        getMinorTicks: function(t) {
            return this._getTicks(t, this.minor)
        },
        _getTicks: function(t, e) {
            for (var i = t._scaled_padding * e.factor, n = t._earliest - i, a = t._latest + i, s = [], o = n; a > o; o += e.factor) s.push(t.getDateFromTime(o).floor(e.name));
            return {
                name: e.name,
                ticks: s
            }
        }
    }),
    function(t) {
        var e = {},
            i = function(i, n) {
                e[i] = [];
                for (var a = 0; a < n.length - 1; a++) {
                    var s = n[a],
                        o = n[a + 1];
                    e[i].push(new t({
                        scale: s[3],
                        minor: {
                            name: s[0],
                            factor: s[1]
                        },
                        major: {
                            name: o[0],
                            factor: o[1]
                        }
                    }))
                }
            };
        i("human", TL.Date.SCALES), i("cosmological", TL.BigDate.SCALES), t.HELPERS = e, t.getBestHelper = function(t, i) {
            "number" != typeof i && (i = 100);
            var n = t.getScale(),
                a = e[n];
            if (!a) throw new TL.Error("axis_helper_scale_err", n);
            var s = null;
            for (var o in a) {
                var r = a[o],
                    l = r.getPixelsPerTick(t._pixels_per_milli);
                if (l > i) {
                    if (null == s) return r;
                    var h = Math.abs(i - l),
                        d = Math.abs(i - l);
                    return d > h ? r : s
                }
                s = r
            }
            return a[a.length - 1]
        }
    }(TL.AxisHelper), TL.Timeline = TL.Class.extend({
        includes: [TL.Events, TL.I18NMixins],
        initialize: function(t, e, i) {
            var n = this;
            if (i || (i = {}), this.version = "3.2.6", this.ready = !1, this._el = {
                    container: {},
                    storyslider: {},
                    timenav: {},
                    menubar: {}
                }, this._el.container = "object" == typeof t ? t : TL.Dom.get(t), this._storyslider = {}, this._style_sheet = new TL.StyleSheet, this._timenav = {}, this._menubar = {}, this._loaded = {
                    storyslider: !1,
                    timenav: !1
                }, this.config = null, this.options = {
                    script_path: "",
                    height: this._el.container.offsetHeight,
                    width: this._el.container.offsetWidth,
                    debug: !1,
                    is_embed: !1,
                    is_full_embed: !1,
                    hash_bookmark: !1,
                    default_bg_color: {
                        r: 255,
                        g: 255,
                        b: 255
                    },
                    scale_factor: 2,
                    layout: "landscape",
                    timenav_position: "bottom",
                    optimal_tick_width: 60,
                    base_class: "tl-timeline",
                    timenav_height: null,
                    timenav_height_percentage: 25,
                    timenav_mobile_height_percentage: 40,
                    timenav_height_min: 175,
                    marker_height_min: 30,
                    marker_width_min: 100,
                    marker_padding: 5,
                    start_at_slide: 0,
                    start_at_end: !1,
                    menubar_height: 0,
                    skinny_size: 650,
                    medium_size: 800,
                    relative_date: !1,
                    use_bc: !1,
                    duration: 1e3,
                    ease: TL.Ease.easeInOutQuint,
                    dragging: !0,
                    trackResize: !0,
                    map_type: "stamen:toner-lite",
                    slide_padding_lr: 100,
                    slide_default_fade: "0%",
                    zoom_sequence: [.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
                    language: "en",
                    ga_property_id: null,
                    track_events: ["back_to_start", "nav_next", "nav_previous", "zoom_in", "zoom_out"]
                }, this.animator_timenav = null, this.animator_storyslider = null, this.animator_menubar = null, this.message = new TL.Message({}, {
                    message_class: "tl-message-full"
                }, this._el.container), "string" == typeof i.default_bg_color) {
                var a = TL.Util.hexToRgb(i.default_bg_color);
                a ? i.default_bg_color = a : (delete i.default_bg_color, trace("Invalid default background color. Ignoring."))
            }
            TL.Util.mergeData(this.options, i), window.addEventListener("resize", function() {
                n.updateDisplay()
            }), TL.debug = this.options.debug, TL.DomUtil.addClass(this._el.container, "tl-timeline"), this.options.is_embed && TL.DomUtil.addClass(this._el.container, "tl-timeline-embed"), this.options.is_full_embed && TL.DomUtil.addClass(this._el.container, "tl-timeline-full-embed"), this.options.relative_date ? "undefined" != typeof moment ? n._loadLanguage(e) : TL.Load.js(this.options.script_path + "/library/moment.js", function() {
                n._loadLanguage(e), trace("LOAD MOMENTJS")
            }) : n._loadLanguage(e)
        },
        _translateError: function(t) {
            return t.hasOwnProperty("stack") && trace(t.stack), t.message_key ? this._(t.message_key) + (t.detail ? " [" + t.detail + "]" : "") : t
        },
        _loadLanguage: function(t) {
            try {
                this.options.language = new TL.Language(this.options), this._initData(t)
            } catch (e) {
                this.showMessage(this._translateError(e))
            }
        },
        goToId: function(t) {
            this.current_id != t && (this.current_id = t, this._timenav.goToId(this.current_id), this._storyslider.goToId(this.current_id, !1, !0), this.fire("change", {
                unique_id: this.current_id
            }, this))
        },
        goTo: function(t) {
            this.goToId(this.config.title ? 0 == t ? this.config.title.unique_id : this.config.events[t - 1].unique_id : this.config.events[t].unique_id)
        },
        goToStart: function() {
            this.goTo(0)
        },
        goToEnd: function() {
            var t = this.config.events.length - 1;
            this.goTo(this.config.title ? t + 1 : t)
        },
        goToPrev: function() {
            this.goTo(this._getSlideIndex(this.current_id) - 1)
        },
        goToNext: function() {
            this.goTo(this._getSlideIndex(this.current_id) + 1)
        },
        add: function(t) {
            var e = this.config.addEvent(t),
                i = this._getEventIndex(e),
                n = this.config.events[i];
            this._storyslider.createSlide(n, this.config.title ? i + 1 : i), this._storyslider._updateDrawSlides(), this._timenav.createMarker(n, i), this._timenav._updateDrawTimeline(!1), this.fire("added", {
                unique_id: e
            })
        },
        remove: function(t) {
            if (t >= 0 && t < this.config.events.length) {
                this.config.events[t].unique_id == this.current_id && this.goTo(t < this.config.events.length - 1 ? t + 1 : t - 1);
                var e = this.config.events.splice(t, 1);
                this._storyslider.destroySlide(this.config.title ? t + 1 : t), this._storyslider._updateDrawSlides(), this._timenav.destroyMarker(t), this._timenav._updateDrawTimeline(!1), this.fire("removed", {
                    unique_id: e[0].unique_id
                })
            }
        },
        removeId: function(t) {
            this.remove(this._getEventIndex(t))
        },
        getData: function(t) {
            if (this.config.title) {
                if (0 == t) return this.config.title;
                if (t > 0 && t <= this.config.events.length) return this.config.events[t - 1]
            } else if (t >= 0 && t < this.config.events.length) return this.config.events[t];
            return null
        },
        getDataById: function(t) {
            return this.getData(this._getSlideIndex(t))
        },
        getSlide: function(t) {
            return t >= 0 && t < this._storyslider._slides.length ? this._storyslider._slides[t] : null
        },
        getSlideById: function(t) {
            return this.getSlide(this._getSlideIndex(t))
        },
        getCurrentSlide: function() {
            return this.getSlideById(this.current_id)
        },
        updateDisplay: function() {
            this.ready && this._updateDisplay()
        },
        _calculateTimeNavHeight: function(t, e) {
            var i = 0;
            return t ? i = t : (this.options.timenav_height_percentage || e) && (i = Math.round(e ? this.options.height / 100 * e : this.options.height / 100 * this.options.timenav_height_percentage)), this._timenav.ready && this.options.timenav_height_min < this._timenav.getMinimumHeight() && (this.options.timenav_height_min = this._timenav.getMinimumHeight()), i < this.options.timenav_height_min && (i = this.options.timenav_height_min), i -= 2 * this.options.marker_padding
        },
        _updateDisplay: function(t, e, i) {
            var n = this.options.duration,
                a = this.options.base_class,
                s = 0;
            i && (n = i), this.options.width = this._el.container.offsetWidth, this.options.height = this._el.container.offsetHeight, this.options.width <= this.options.skinny_size ? (a += " tl-skinny", this.options.layout = "portrait") : this.options.width <= this.options.medium_size ? (a += " tl-medium", this.options.layout = "landscape") : this.options.layout = "landscape", TL.Browser.touch && (this.options.layout = TL.Browser.orientation()), TL.Browser.mobile ? (a += " tl-mobile", this.options.timenav_height = this._calculateTimeNavHeight(t, this.options.timenav_mobile_height_percentage)) : this.options.timenav_height = this._calculateTimeNavHeight(t), a += "portrait" == this.options.layout ? " tl-layout-portrait" : " tl-layout-landscape", this.options.storyslider_height = this.options.height - this.options.timenav_height, s = "top" == this.options.timenav_position ? Math.ceil(this.options.timenav_height) / 2 - this._el.menubar.offsetHeight / 2 - 19.5 : Math.round(this.options.storyslider_height + 1 + Math.ceil(this.options.timenav_height) / 2 - this._el.menubar.offsetHeight / 2 - 17.5), e ? (this._el.timenav.style.height = Math.ceil(this.options.timenav_height) + "px", this.animator_storyslider && this.animator_storyslider.stop(), this.animator_storyslider = TL.Animate(this._el.storyslider, {
                height: this.options.storyslider_height + "px",
                duration: n / 2,
                easing: TL.Ease.easeOutStrong
            }), this.animator_menubar && this.animator_menubar.stop(), this.animator_menubar = TL.Animate(this._el.menubar, {
                top: s + "px",
                duration: n / 2,
                easing: TL.Ease.easeOutStrong
            })) : (this._el.timenav.style.height = Math.ceil(this.options.timenav_height) + "px", this._el.storyslider.style.height = this.options.storyslider_height + "px", this._el.menubar.style.top = s + "px"), this.message && this.message.updateDisplay(this.options.width, this.options.height), this._timenav.updateDisplay(this.options.width, this.options.timenav_height, e), this._storyslider.updateDisplay(this.options.width, this.options.storyslider_height, e, this.options.layout), this._el.container.className = a
        },
        _updateHashBookmark: function(t) {
            var e = "#event-" + t.toString();
            "file:" != window.location.protocol && window.history.replaceState(null, "Browsing TimelineJS", e), this.fire("hash_updated", {
                unique_id: this.current_id,
                hashbookmark: "#event-" + t.toString()
            }, this)
        },
        _initData: function(t) {
            var e = this;
            if ("string" == typeof t) {
                var e = this;
                TL.ConfigFactory.makeConfig(t, function(t) {
                    e.setConfig(t)
                })
            } else this.setConfig(TL.TimelineConfig == t.constructor ? t : new TL.TimelineConfig(t))
        },
        setConfig: function(t) {
            if (this.config = t, this.config.validate(), this._validateOptions(), this.config.isValid()) try {
                this._onDataLoaded()
            } catch (e) {
                this.showMessage("<strong>" + this._("error") + ":</strong> " + this._translateError(e))
            } else {
                for (var i = [], n = 0, a = this.config.getErrors(); n < a.length; n++) i.push(this._translateError(a[n]));
                this.showMessage("<strong>" + this._("error") + ":</strong> " + i.join("<br>"))
            }
        },
        _validateOptions: function() {
            for (var t = ["timenav_height", "timenav_height_min", "marker_height_min", "marker_width_min", "marker_padding", "start_at_slide", "slide_padding_lr"], e = 0; e < t.length; e++) {
                var i = t[e],
                    n = this.options[i];
                valid = !0, "number" == typeof n ? valid = n == parseInt(n) : "string" == typeof n && (valid = n.match(/^\s*\-?\d+\s*$/)), valid || this.config.logError({
                    message_key: "invalid_integer_option",
                    detail: i
                })
            }
        },
        _initLayout: function() {
            this.message.removeFrom(this._el.container), this._el.container.innerHTML = "", "top" == this.options.timenav_position ? (this._el.timenav = TL.Dom.create("div", "tl-timenav", this._el.container), this._el.storyslider = TL.Dom.create("div", "tl-storyslider", this._el.container)) : (this._el.storyslider = TL.Dom.create("div", "tl-storyslider", this._el.container), this._el.timenav = TL.Dom.create("div", "tl-timenav", this._el.container)), this._el.menubar = TL.Dom.create("div", "tl-menubar", this._el.container), this.options.width = this._el.container.offsetWidth, this.options.height = this._el.container.offsetHeight, this._el.storyslider.style.top = "1px", this.options.timenav_height = this._calculateTimeNavHeight(this.options.timenav_height), this._timenav = new TL.TimeNav(this._el.timenav, this.config, this.options), this._timenav.on("loaded", this._onTimeNavLoaded, this), this._timenav.on("update_timenav_min", this._updateTimeNavHeightMin, this), this._timenav.options.height = this.options.timenav_height, this._timenav.init(), this.options.initial_zoom && this.setZoom(this.options.initial_zoom), this._storyslider = new TL.StorySlider(this._el.storyslider, this.config, this.options), this._storyslider.on("loaded", this._onStorySliderLoaded, this), this._storyslider.init(), this._menubar = new TL.MenuBar(this._el.menubar, this._el.container, this.options), this.options.storyslider_height = "portrait" == this.options.layout ? this.options.height - this.options.timenav_height - 1 : this.options.height - 1, this._updateDisplay(this._timenav.options.height, !0, 2e3)
        },
        _initEvents: function() {
            this._timenav.on("change", this._onTimeNavChange, this), this._timenav.on("zoomtoggle", this._onZoomToggle, this), this._storyslider.on("change", this._onSlideChange, this), this._storyslider.on("colorchange", this._onColorChange, this), this._storyslider.on("nav_next", this._onStorySliderNext, this), this._storyslider.on("nav_previous", this._onStorySliderPrevious, this), this._menubar.on("zoom_in", this._onZoomIn, this), this._menubar.on("zoom_out", this._onZoomOut, this), this._menubar.on("back_to_start", this._onBackToStart, this)
        },
        _initGoogleAnalytics: function() {
            ! function(t, e, i, n, a, s, o) {
                t.GoogleAnalyticsObject = a, t[a] = t[a] || function() {
                    (t[a].q = t[a].q || []).push(arguments)
                }, t[a].l = 1 * new Date, s = e.createElement(i), o = e.getElementsByTagName(i)[0], s.async = 1, s.src = n, o.parentNode.insertBefore(s, o)
            }(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), ga("create", this.options.ga_property_id, "auto")
        },
        _initAnalytics: function() {
            if (null !== this.options.ga_property_id) {
                this._initGoogleAnalytics(), ga("send", "pageview");
                var t = this.options.track_events;
                for (i = 0; i < t.length; i++) {
                    var e = t[i];
                    this.addEventListener(e, function(t) {
                        ga("send", "event", t.type, "clicked")
                    })
                }
            }
        },
        _onZoomToggle: function(t) {
            "in" == t.zoom ? this._menubar.toogleZoomIn(t.show) : "out" == t.zoom && this._menubar.toogleZoomOut(t.show)
        },
        _getEventIndex: function(t) {
            for (var e = 0; e < this.config.events.length; e++)
                if (t == this.config.events[e].unique_id) return e;
            return -1
        },
        _getSlideIndex: function(t) {
            if (this.config.title && this.config.title.unique_id == t) return 0;
            for (var e = 0; e < this.config.events.length; e++)
                if (t == this.config.events[e].unique_id) return this.config.title ? e + 1 : e;
            return -1
        },
        _onDataLoaded: function() {
            this.fire("dataloaded"), this._initLayout(), this._initEvents(), this._initAnalytics(), this.message && this.message.hide(), this.ready = !0
        },
        showMessage: function(t) {
            this.message ? this.message.updateMessage(t) : (trace("No message display available."), trace(t))
        },
        _onColorChange: function(t) {
            this.fire("color_change", {
                unique_id: this.current_id
            }, this), t.color || t.image
        },
        _onSlideChange: function(t) {
            this.current_id != t.unique_id && (this.current_id = t.unique_id, this._timenav.goToId(this.current_id), this._onChange(t))
        },
        _onTimeNavChange: function(t) {
            this.current_id != t.unique_id && (this.current_id = t.unique_id, this._storyslider.goToId(this.current_id), this._onChange(t))
        },
        _onChange: function() {
            this.fire("change", {
                unique_id: this.current_id
            }, this), this.options.hash_bookmark && this.current_id && this._updateHashBookmark(this.current_id)
        },
        _onBackToStart: function() {
            this._storyslider.goTo(0), this.fire("back_to_start", {
                unique_id: this.current_id
            }, this)
        },
        zoomIn: function() {
            this._timenav.zoomIn()
        },
        zoomOut: function() {
            this._timenav.zoomOut()
        },
        setZoom: function(t) {
            this._timenav.setZoom(t)
        },
        _onZoomIn: function() {
            this._timenav.zoomIn(), this.fire("zoom_in", {
                zoom_level: this._timenav.options.scale_factor
            }, this)
        },
        _onZoomOut: function() {
            this._timenav.zoomOut(), this.fire("zoom_out", {
                zoom_level: this._timenav.options.scale_factor
            }, this)
        },
        _onTimeNavLoaded: function() {
            this._loaded.timenav = !0, this._onLoaded()
        },
        _onStorySliderLoaded: function() {
            this._loaded.storyslider = !0, this._onLoaded()
        },
        _onStorySliderNext: function(t) {
            this.fire("nav_next", t)
        },
        _onStorySliderPrevious: function(t) {
            this.fire("nav_previous", t)
        },
        _onLoaded: function() {
            this._loaded.storyslider && this._loaded.timenav && (this.fire("loaded", this.config), this.options.hash_bookmark && "" != window.location.hash ? this.goToId(window.location.hash.replace("#event-", "")) : ("true" == this.options.start_at_end || this.options.start_at_slide > this.config.events.length ? this.goToEnd() : this.goTo(this.options.start_at_slide), this.options.hash_bookmark && this._updateHashBookmark(this.current_id)))
        }
    }), TL.Timeline.source_path = function() {
        var t = document.getElementsByTagName("script"),
            e = t[t.length - 1].src;
        return e.substr(0, e.lastIndexOf("/"))
    }();