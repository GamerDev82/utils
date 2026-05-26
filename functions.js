function naqonhand() {
    const bolds = document.getElementsByTagName("b");

    for (const el of bolds) {
        if (el.innerHTML.includes("Naquadah")) {
            return el.innerHTML.replace(/\D/g, "");
        }
    }
}

function newLocation(e, t) {
    const a = document.getElementsByTagName("a")[0];

    a.href = e;
    a.id = "newlink";
    a.setAttribute("target", "_" + t);

    document.getElementById("newlink").click();
}

function getElementsWithAttributeValue(attribute, value) {
    const result = [];

    const all = document.getElementsByTagName('*');

    for (let i = 0; i < all.length; i++) {
        const el = all[i];

        if (el.getAttribute(attribute) === value) {
            result.push(el);
        }
    }

    return result;
}

function gup(e, l) {
    l = l || location.href;

    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

    const n = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(l);

    return n === null ? null : n[1];
}

function linkByContent(e, n) {
    const els = document.getElementsByTagName(e);

    for (const el of els) {
        if (el.textContent.indexOf(n) !== -1) {
            return el;
        }
    }
}

function atsRemaining() {
    const bolds = document.getElementsByTagName("b");

    for (const el of bolds) {
        if (el.innerHTML.indexOf("Turns:") !== -1) {
            return el.innerHTML.replace(/\D/g, "");
        }
    }
}

function nextTC() {
    const bolds = document.getElementsByTagName("b");

    for (const el of bolds) {
        if (el.innerHTML.indexOf("Next Turn:") !== -1) {
            return el.innerHTML.replace(/\D/g, "");
        }
    }
}


function getNumsFromImg(e) {
    var t = ["1b","15","16","17","10","11","12","13","1c","1d"],
        r = ["b","a","9","8","f","e","d","c","3","2"];

    if (e.getElementsByTagName("img").length > 0) {

        var img = e.getElementsByTagName("img")[0],
            n = img.src.split("im.php?display=").pop(),
            a = n.substr(6, 1),
            s = n.substr(8, 2),
            g = n.substr(11, 1),
            p = n.substr(38, 4),
            m = 1;

        m = (parseInt(p) == 1548) ? 10 : m;
        m = (p == "1c48") ? 100 : m;

        var i = 0, f = 0, l = 0;

        for (; l < t.length; l++) {
            if (s.indexOf(t[l]) !== -1) {
                i = 1e11 * l;
                break;
            }
        }

        for (var I = 0; I < r.length; I++) {
            if (g.indexOf(r[I]) !== -1) {
                f = 1e10 * I;
                break;
            }
        }

        if (a == 4 && parseInt(p) == 1548) {
            return parseInt(100 * i);
        }

        if (a == 4 && p == "1c48") {
            return parseInt(1e3 * (i - 1e11));
        }

        if (a == 1 && parseInt(p) == 1548) {
            return parseInt(10 * (i + f));
        }

        return parseInt(i + f);
    }

    if (e.getElementsByTagName("font").length > 0) {
        return parseInt(
            e.getElementsByTagName("font")[0].innerHTML.replace(/\D/g, "")
        );
    }

    return 0;
}

function resetButton(which, right, txt) {
    var o = document.createElement("BUTTON"),
        e = document.createTextNode(txt + " FARMER");

    o.appendChild(e);

    o.style.position = "absolute";
    o.style.right = right + "px";
    o.style.top = "20px";
    o.style.height = "50px";
    o.style.width = "250px";
    o.style.padding = "0.25rem 0.5rem";
    o.style.backgroundColor = "black";
    o.style.borderRadius = "0.2rem";
    o.style.border = "1px solid #ccc";
    o.style.color = "#ccc";

    window.document.body.appendChild(o);

    o.onmouseover = function () {
        o.style.backgroundColor = "#d9534f";
    };

    o.onmouseout = function () {
        o.style.backgroundColor = "#000";
    };

    o.onclick = function () {
        setFookie("emergencyStop", which, 365);
        setFookie("pause", which, 365);
        setFookie("currentNaq", 0, 365);

        if (which == 0) {
            newLocation(document.URL, "self");
            setFookie("msgs", "Farming", 365);
        }
    };
}

function round50(num) {
    return (num - (num % 50)) - 50;
} // Always round down to the nearest multiple of 50

function bankSpace(f) {

    function reverseString(str) {
        return str.split("").reverse().join("");
    }

    var available = document
    .getElementsByClassName('table_lines')[0]
    .getElementsByTagName('tr')[2]
    .getElementsByTagName('b')[3];

    available = reverseString(
        available.innerHTML.replace(/\D/g, "")
    );

    if (available <= naqonhand() && limitBank == 1) {
        return 1;
    } else {
        return 0;
    }
}

async function addIgnoredId(newPlayerId) {
    let ignoreId = await GM.getValue("ignoreId");

    const ids = ignoreId ? ignoreId.split(',') : [];
    ids.push(newPlayerId);

    await GM.setValue("ignoreId", ids.join(','));
}
async function ignoreIds(playerId) {
    const list = await GM.getValue("ignoreId");
    return (list ? list.split(',') : []).includes(String(playerId)) ? 1 : 0;
}

function randomNum(min, max) {return Math.floor(Math.random() * (max - min) + min);}
