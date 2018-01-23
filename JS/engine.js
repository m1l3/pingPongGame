(function () {
    let vreme1 = 0;
    let vendors = ['ms', 'moz', 'webkit', 'o'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            let currTime = new Date().getTime();
            let timeToCall = Math.max(0, 16 - (currTime - vreme1));
            let id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            vreme1 = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

const FinkiPingPong = new function () {
    let boards = [];

    let snd = new Audio("Sounds/soundtrack.mp3");
    snd.play();
    snd.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

    this.initialize = function (finkiCanvas, grafika, callback) {
        this.canvas = document.getElementById(finkiCanvas);

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
        if (!this.ctx) { return alert("Вашиот прелистуваш не поддржува HTML5."); }

        this.tastatura();

        this.loop();
        slikaAkteri = new SlikaAkteri();

        slikaAkteri.mapiraj(grafika, callback);
    };

    const komandi = { 37: 'levo', 39: 'desno', 38: 'gore', 40: 'dolu', 32: 'puk' };
    this.kopcina = {};

    this.tastatura = () => {
        window.addEventListener('keydown', (e) => {
            if (komandi[e.keyCode]) {
                FinkiPingPong.kopcina[komandi[e.keyCode]] = true;
                e.preventDefault();
            }
        }, false);

        window.addEventListener('keyup', (e) => {
            if (komandi[e.keyCode]) {
                FinkiPingPong.kopcina[komandi[e.keyCode]] = false;
                e.preventDefault();
            }
        }, false);

        window.addEventListener('mousedown', (e) => {
            if (e.pageY > window.innerHeight - 100) {
                if (e.pageX < (window.innerWidth / 2))
                    FinkiPingPong.kopcina['levo'] = true;
            }
            if (e.pageY > window.innerHeight - 100) {
                if (e.pageX > (window.innerWidth / 2))
                    FinkiPingPong.kopcina['desno'] = true;
            }
            else {
                FinkiPingPong.kopcina['puk'] = true;
                e.preventDefault();
            }

        }, false);

        window.addEventListener('mouseup', (e) => {
            if (e.pageY > window.innerHeight - 100) {
                if (e.pageX < (window.innerWidth / 2))
                    FinkiPingPong.kopcina['levo'] = false;
            }
            if (e.pageY > window.innerHeight - 100) {
                if (e.pageX > (window.innerWidth / 2))
                    FinkiPingPong.kopcina['desno'] = false;
            }
            else {
                FinkiPingPong.kopcina['puk'] = false;
                e.preventDefault();
            }

        }, false);

        window.addEventListener('touchstart', (e) => {
            if (e.pageY > window.innerHeight - 100) {
                if (e.pageX < (window.innerWidth / 2))
                    FinkiPingPong.kopcina['levo'] = true;
            }
            if (e.pageY > window.innerHeight - 100) {
                if (e.pageX > (window.innerWidth / 2))
                    FinkiPingPong.kopcina['desno'] = true;
            }
            else {
                FinkiPingPong.kopcina['puk'] = true;
                e.preventDefault();
            }

        }, false);

        window.addEventListener('touchend', (e) => {
            if (e.pageY > window.innerHeight - 100) {
                if (e.pageX < (window.innerWidth / 2))
                    FinkiPingPong.kopcina['levo'] = false;
            }
            if (e.pageY > window.innerHeight - 100) {
                if (e.pageX > (window.innerWidth / 2))
                    FinkiPingPong.kopcina['desno'] = false;
            }
            else {
                FinkiPingPong.kopcina['puk'] = false;
                e.preventDefault();
            }

        }, false);

    };


    let vreme1 = new Date().getTime();
    let maksimalnoVreme = 1 / 30;

    this.loop = () => {
        let momentalnoVreme = new Date().getTime();
        requestAnimationFrame(FinkiPingPong.loop);
        let dt = (momentalnoVreme - vreme1) / 1600;
        if (dt > maksimalnoVreme) { dt = maksimalnoVreme; }

        for (let i = 0, len = boards.length; i < len; i++) {
            if (boards[i]) {
                boards[i].step(dt);
                boards[i].iscrtaj(FinkiPingPong.ctx);
            }
        }
        vreme1 = momentalnoVreme;
    };

    this.postavi = (num, tabla) => { boards[num] = tabla; };
};

class SlikaAkteri{
    constructor(){
        this.siteAkteri = {};
    }

    mapiraj(spriteData,callback){
        this.siteAkteri = spriteData;
        this.akteri = new Image();
        this.akteri.onload = callback;
        this.akteri.src = 'images/actors.png';
    }

    iscrtaj(ctx, Akter, x, y, frame, name, kreditiSilaStatus, nameFontSize, kratkoIme){
        let s = this.siteAkteri[Akter];
        if (!frame) frame = 0;
        ctx.drawImage(this.akteri,
            s.sx + frame * s.w,
            s.sy,
            s.w, s.h,
            Math.floor(x), Math.floor(y),
            s.w, s.h);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold " + nameFontSize + "px bangers";
        if (kratkoIme == null)
            ctx.fillText("", Math.floor(x), Math.floor(y));
        else
            ctx.fillText(kratkoIme, Math.floor(x), Math.floor(y));

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold " + 15 + "px bangers";
        if (kreditiSilaStatus == null)
            ctx.fillText("", Math.floor(x), Math.floor(y));
        else
            ctx.fillText(kreditiSilaStatus, Math.floor(x), Math.floor(y) + 60);
    }
}

class Naslov {
    constructor(prvRed, vtorRed, callback) {
        this.prvRed = prvRed;
        this.vtorRed = vtorRed;
        this.callback = callback;
        this.up = false;
    }

    step(dt) {
        if (!FinkiPingPong.kopcina['puk']) this.up = true;
        if (this.up && FinkiPingPong.kopcina['puk'] && this.callback) this.callback();
    }
    iscrtaj(ctx) {
        ctx.fillStyle = "#FFFFFF";

        ctx.font = "bold 40px bangers";
        let measure = ctx.measureText(this.prvRed);
        ctx.fillText(this.prvRed, FinkiPingPong.width / 2 - measure.width / 2, FinkiPingPong.height / 2);

        ctx.font = "bold 20px bangers";
        let measure2 = ctx.measureText(this.vtorRed);
        ctx.fillText(this.vtorRed, FinkiPingPong.width / 2 - measure2.width / 2, FinkiPingPong.height / 2 + 40);
    }
}

class Finki {

    constructor() {
        this.tabla = this;
        this.kontekst = {};
        this.listaObjekti = [];
    }

    dodadiObject(obj) {
        obj.tabla = this;
        this.listaObjekti.push(obj);
        this.kontekst[obj.type] = (this.kontekst[obj.type] || 0) + 1;
        return obj;
    };


    otstraniObjekt(obj) {
        let idx = this.spremniZaOtsranuvanje.indexOf(obj);
        if (idx == -1) {
            this.spremniZaOtsranuvanje.push(obj);
            return true;
        } else {
            return false;
        }
    };

    otstraniOznaceni() {
        this.spremniZaOtsranuvanje = [];
    };

    otstraniOznaceniKraj() {
        for (let i = 0, len = this.spremniZaOtsranuvanje.length; i < len; i++) {
            let idx = this.listaObjekti.indexOf(this.spremniZaOtsranuvanje[i]);
            if (idx != -1) {
                this.kontekst[this.spremniZaOtsranuvanje[i].type]--;
                this.listaObjekti.splice(idx, 1);
            }
        }
    }

    izmini(funkcija) {
        let args = Array.prototype.slice.call(arguments, 1);
        for (let i = 0, len = this.listaObjekti.length; i < len; i++) {
            let obj = this.listaObjekti[i];
            obj[funkcija].apply(obj, args);
        }
    }

    pronajdi(func) {
        for (let i = 0, val = null, len = this.listaObjekti.length; i < len; i++) {
            if (func.call(this.listaObjekti[i])) return this.listaObjekti[i];
        }
        return false;
    }

    pronajdiTip(Type) {
        for (let i = 0, val = null, len = this.listaObjekti.length; i < len; i++) {
            if (this.listaObjekti[i].type == Type) return this.listaObjekti[i];
        }
        return false;
    }

    step(dt) {
        this.otstraniOznaceni();
        this.izmini('step', dt);
        this.otstraniOznaceniKraj();
    }

    iscrtaj(ctx) {
        this.izmini('iscrtaj', ctx);
    }

    preklopuvanje(o1, o2) {
        return !((o1.y + o1.h < o2.y) || (o1.y > o2.y + o2.h) ||
            (o1.x + o1.w < o2.x) || (o1.x > o2.x + o2.w));
    }

    kolizija(obj, type) {
        return this.pronajdi(function () {
            if (obj != this) {
                var col = (!type || this.type & type) && this.tabla.preklopuvanje(obj, this);
                return col ? this : false;
            }
        });
    }
};

class Akter {
    setup(Akter, props) {
        this.Akter = Akter;
        this.merge(props);
        this.frame = this.frame || 0;
        this.w = slikaAkteri.siteAkteri[Akter].w;
        this.h = slikaAkteri.siteAkteri[Akter].h;
    };

    merge(props) {
        if (props) {
            for (var prop in props) {
                this[prop] = props[prop];
            }
        }
    };

    iscrtaj(ctx) {
        slikaAkteri.iscrtaj(ctx, this.Akter, this.x, this.y, this.frame, this.name, this.kreditiSilaStatus, this.nameFontSize, this.kratkoIme);
    };

    hit(damage) {
        this.tabla.otstraniObjekt(this);
    };
}

class Nivo {

    constructor(vlezniPodatoci, callback) {
        this.podatoci = [];
        this.vlezniPodatoci = vlezniPodatoci;
        this.callback = callback;
    }

    step(dt) {

        let idx = 0
        let otstraniObjekt = []
        let predmet = null;

        this.t += dt * 1000;


        while ((predmet = this.podatoci[idx]) &&
            (predmet[0] < this.t + 2000)) {
            if (this.t > predmet[1]) {
                otstraniObjekt.push(predmet);
            } else if (predmet[0] < this.t) {
                let newPredmet = predmeti[predmet[3]],
                    override = predmet[4];

                this.tabla.dodadiObject(new Predmet(newPredmet, override));

                predmet[0] += predmet[2];
            }
            idx++;
        }

        for (let i = 0, len = otstraniObjekt.length; i < len; i++) {
            let remIdx = this.podatoci.indexOf(otstraniObjekt[i]);
            if (remIdx != -1) this.podatoci.splice(remIdx, 1);
        }

        if (this.podatoci.length === 0 && this.tabla.kontekst[PREDMET_OBJEKT] === 0) {
            if (this.callback) this.callback();
        }
    }

    iscrtaj(ctx) {
    }

};

class PrvSemestar {
    constructor(vlezniPodatoci, callback) {
        this.podatoci = [];
        for (let i = 0; i < vlezniPodatoci.length; i++) {
            this.podatoci.push(Object.create(vlezniPodatoci[i]));
        }
        this.t = 0;
        this.callback = callback;
    }

    step(dt) {
        let idx = 0
        let otstraniObjekt = []
        let predmet = null;

        this.t += dt * 1000;


        while ((predmet = this.podatoci[idx]) &&
            (predmet[0] < this.t + 2000)) {
            if (this.t > predmet[1]) {
                otstraniObjekt.push(predmet);
            } else if (predmet[0] < this.t) {
                let newPredmet = predmeti[predmet[3]],
                    override = predmet[4];

                this.tabla.dodadiObject(new Predmet(newPredmet, override));

                predmet[0] += predmet[2];
            }
            idx++;
        }

        for (let i = 0, len = otstraniObjekt.length; i < len; i++) {
            let remIdx = this.podatoci.indexOf(otstraniObjekt[i]);
            if (remIdx != -1) this.podatoci.splice(remIdx, 1);
        }

        if (this.podatoci.length === 0 && this.tabla.kontekst[PREDMET_OBJEKT] === 0) {

            if (this.callback) this.callback();
        }
    }

    iscrtaj(ctx) {
    }

}

class Krediti {
    constructor() {
        FinkiPingPong.vkupnoKrediti = 0;
    }

    iscrtaj(ctx) {
        ctx.save();
        ctx.font = "bold 18px";
        ctx.fillStyle = "#FFFFFF";

        let txt = "" + FinkiPingPong.vkupnoKrediti;
        let i = 3 - txt.length
        let prefix = "";
        while (i-- > 0) { prefix += "0"; }

        ctx.fillText("Освоени кредити: " + prefix + txt, 20, 20);
        ctx.restore();
    }

    step(dt) {
    }
}

class PolozeniPredmeti{
    constructor(){
        FinkiPingPong.polozeniPredmeti = ",";
    }
    
    iscrtaj(ctx){
        ctx.save();
        ctx.font = "bold 18px";
        ctx.fillStyle = "#FFFFFF";


        let rez = FinkiPingPong.polozeniPredmeti.split(",");

        for (let i = 1; i < rez.length; i++) {

        }
        ctx.restore();
    }

    step(dt){

    }
}

class IscistenSemestar {
    constructor() {
        FinkiPingPong.iscisteniSemestri = ",";
    }

    iscrtaj(ctx) {
        ctx.save();
        ctx.font = "bold 18px";
        ctx.fillStyle = "#FFFFFF";

        ctx.fillText("Исчистени семестри: ", 20, 60);

        let rez = FinkiPingPong.iscisteniSemestri.split(",");

        for (let i = 1; i < rez.length; i++) {
            ctx.fillText(rez[i], 20, (20 * i) + 60);
        }
        ctx.restore();
    }

    step(dt) {
    }
}