function __td_domReady(e) {
    /in/.test(document.readyState) ? setTimeout("__td_domReady(" + e + ")", 9) : e();
}
document.getElementsByClassName || (document.getElementsByClassName = function(e) {
    var t, n, a, r = document,
        s = [];
    if (r.querySelectorAll) return r.querySelectorAll("." + e);
    if (r.evaluate)
        for (n = ".//*[contains(concat(' ', @class, ' '), ' " + e + " ')]", t = r.evaluate(n, r, null, 0, null); a = t.iterateNext();) s.push(a);
    else
        for (t = r.getElementsByTagName("*"), n = new RegExp("(^|\\s)" + e + "(\\s|$)"), a = 0; a < t.length; a++) n.test(t[a].className) && s.push(t[a]);
    return s;
});
var TDEmbed = {
    width: "100%",
    init: function() {
        this._showTDEmbeds(), this.listenToParentPostMessages();
    },
    _showTDEmbeds: function() {
        for (var e = document.getElementsByClassName("tdwow"), t = e.length - 1; t > -1; t--) {
            var n = this._getParamsFromAttributes(e[t]);
            if (this._paramsHasRequiredAttributes(n)) {
                var a = this._buildURL(n),
                    r = this._buildIFrame(n, a);
                this._addIFrameToPage(e[t], r);
            }
        }
    },
    _paramsHasRequiredAttributes: function(e) {
        return e["slug-id"];
    },
    _getParamsFromAttributes: function(e) {
        for (var t = {}, n = e.attributes, a = 0, r = n.length; r > a; a++) {
            var s = n[a].name;
            0 === s.indexOf("data-") && (t[s.replace("data-", "")] = n[a].value);
        }
        return t;
    },
    _buildURL: function(e) {
        var t = this._getHost(e),
            a = "?" + this._getGetParams(e),
            s = [t, '', e["slug-id"] + a].join("");
        return s.replace(/\/\//g, "//");
    },
    _getHost: function(e) {
        return e.host ? this._getSafeHost(e.host) : "file:" === document.location.protocol ? "http://hungking.cc/" : "//http://hungking.cc/";
    },
    _getSafeHost: function(e) {
        return e.match(/^\/\//) || !e.match(/http:/) ? document.location.protocol + "//" + e : e;
    },
    _getGetParams: function(e) {
        var t = "";
        for (var n in e) "" !== t && (t += "&"), t += n + "=" + encodeURIComponent(e[n]);
        return t;
    },
    _buildIFrame: function(e, t) {
        var n = "";
        "" !== e["class"] && (n = e["class"]);
        var a = {
                id: "td_embed_" + e["slug-id"].replace("/", ""),
                src: 'http://hungking.cc',
                scrolling: "no",
                frameborder: "0",
                height: this._getHeight(e),
                allowTransparency: "true",
                allowfullscreen: "true",
                name: "TD Embed",
                title: "TD Embed",
                "class": "td_embed_iframe " + n,
                style: "width: " + this.width + "; overflow: hidden;"
            },
            r = "<iframe ";
        for (var s in a) r += s + '="' + a[s] + '" ';
        return r += "></iframe>";
    },
    _getHeight: function(e) {
        return e.height ? e.height : 300;
    },
    _addIFrameToPage: function(e, t) {
        if (e.parentNode) {
            var n = document.createElement("div");
            n.innerHTML = t, e.parentNode.replaceChild(n, e);
        } else e.innerHTML = t;
    },
    listenToParentPostMessages: function() {
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent",
            eventListener = window[eventMethod],
            messageEvent = "attachEvent" === eventMethod ? "onmessage" : "message";
        eventListener(messageEvent, function(e) {
            try {
                var dataObj = eval("(" + e.data + ")"),
                    iframe = document.getElementById("td_embed_" + dataObj.hash);
                iframe && (iframe.height = dataObj.height);
            } catch (err) {}
        }, !1);
    }
};
__td_domReady(function() {
    TDEmbed.init();
});