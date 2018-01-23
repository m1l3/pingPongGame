const globalWidth = window.innerWidth;
const globalHeight = window.innerHeight;
const grafika = {
    //tuka se iscrtuvaat predmetite, t.e se mapiraat od slikata
    student_desno: { sx: 0, sy: 120, w: 80, h: 100, frames: 1 },
    student_levo: { sx: 80, sy: 120, w: 80, h: 100, frames: 1 },
    topce: { sx: 15, sy: 0, w: 20, h: 20, frames: 1 },
    eksplozija: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
    moliv: { sx: 0, sy: 0, w: 10, h: 30, frame: 1, },

    kniga_rozova: { sx: 37, sy: 0, w: 42, h: 47, frames: 1 },
    kniga_plava: { sx: 79, sy: 0, w: 37, h: 47, frames: 1 },
    kniga_crvena: { sx: 116, sy: 0, w: 42, h: 47, frames: 1 },
    kniga_zolta: { sx: 158, sy: 0, w: 32, h: 37, frames: 1 }
};

const predmeti = {

    predmet3krediti: { x: 0, y: -100, Akter: 'kniga_rozova', kreditiSila: 30, kreditiSilaStatus: "3", B: 75, C: 1, E: 100, molivi: 1, vremeZaPauza: 4 }, //3 krediti
    predmet5krediti: { x: 0, y: -100, Akter: 'kniga_plava', kreditiSila: 50, kreditiSilaStatus: "5", B: 75, C: 1, E: 100, molivi: 1 }, //5 krediti
    predmet6krediti: { x: 0, y: -80, Akter: 'kniga_crvena', kreditiSila: 60, kreditiSilaStatus: "6", B: 75, C: 1, E: 100, molivi: 1, vremeZaPauza: 4 }, //6 krediti
    predmet75krediti: { x: 0, y: -100, Akter: 'kniga_zolta', kreditiSila: 75, kreditiSilaStatus: "7.5", B: 75, C: 1, E: 100, molivi: 2, vremeZaPauza: 4 }   //7.5 krediti  
};

const STUDENT_OBJEKT = 1,
    TOPCE_OBJEKT = 2,
    PREDMET_OBJEKT = 4,
    MOLIV_OBJEKT = 8;


const pocetok = () => {
    FinkiPingPong.postavi(0, new Pozadina(true));
    FinkiPingPong.postavi(3, new Naslov("ФИНКИ Пинг - Понг", "", zapocniIgra));
};

const predmetiPrvSemestarPodatoci = [

    [0, 500, 500, 'predmet3krediti', { x: (globalWidth / 5) - 40, kratkoIme: "Анг1", name: "Англиски" }],
    [0, 500, 500, 'predmet75krediti', { x: ((globalWidth / 5) - 40) * 2, kratkoIme: "Мат1", name: "Математика 1" }],
    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40) * 3, kratkoIme: "СП", name: "Структурирано програмирање" }],
    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40) * 4, kratkoIme: "Физ1", name: "Физика 1" }],
    [0, 500, 500, 'predmet75krediti', { x: ((globalWidth / 5) - 40) * 5, kratkoIme: "ОЕ1", name: "Основи на електротехника 1" }]];

const predmetiVtorSemestarPodatoci = [

    [0, 500, 500, 'predmet3krediti', { x: ((globalWidth / 5) - 40), kratkoIme: "Анг2", name: "Англиски2" }],
    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40) * 2, kratkoIme: "Мат2", name: "Математика 2" }],
    [0, 500, 500, 'predmet75krediti', { x: ((globalWidth / 5) - 40) * 3, kratkoIme: "ООП", name: "Објектно ориентирано програмирање" }],
    [0, 500, 500, 'predmet75krediti', { x: ((globalWidth / 5) - 40) * 4, kratkoIme: "ОЕ2", name: "Основи на електротехника 2" }],
    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40) * 5, kratkoIme: "Физ2", name: "Физика 2" }]];

const predmetiTretSemestarPodatoci = [

    [0, 500, 500, 'predmet75krediti', { x: ((globalWidth / 5) - 40), kratkoIme: "ЛТ", name: "Линеарни трансформации" }],
    [0, 500, 500, 'predmet5krediti', { x: ((globalWidth / 5) - 40) * 2, kratkoIme: "АСП", name: "Алгоритми и структури на податоци" }],
    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40) * 3, kratkoIme: "ЛКДА", name: "Логички кола и дискретни автомати" }],
    [0, 500, 500, 'predmet5krediti', { x: ((globalWidth / 5) - 40) * 4, kratkoIme: "ИП", name: "Интернет програмирање" }],
    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40) * 5, kratkoIme: "ООС", name: "Објектно ориентирани системи" }]];

const predmetiCetvrtSemestarPodatoci = [

    [0, 500, 500, 'predmet75krediti', { x: ((globalWidth / 5) - 40), kratkoIme: "ДМ", name: "Дискретна математика" }],
    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40) * 2, kratkoIme: "КА", name: "Компјутерски архитектури" }],
    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40) * 3, kratkoIme: "КЕ1", name: "Компјутерска електроника 1" }],
    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40) * 4, kratkoIme: "ННС", name: "Надежност на системи" }],
    [0, 500, 500, 'predmet5krediti', { x: ((globalWidth / 5) - 40) * 5, kratkoIme: "КК", name: "Компјутерски компоненти" }]];

const predmetiPettiSemestarPodatoci = [

    [0, 500, 500, 'predmet75krediti', { x: ((globalWidth / 5) - 40), kratkoIme: "ВИС", name: "Веројатност и статистика" }],
    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40) * 2, kratkoIme: "КМ", name: "Компјутерски мрежи" }],
    [0, 500, 500, 'predmet5krediti', { x: ((globalWidth / 5) - 40) * 3, kratkoIme: "БП", name: "Бази на податоци" }],
    [0, 500, 500, 'predmet5krediti', { x: ((globalWidth / 5) - 40) * 4, kratkoIme: "МОС", name: "Мрежни оперативни системи" }],
    [0, 500, 500, 'predmet5krediti', { x: ((globalWidth / 5) - 40) * 5, kratkoIme: "ПП", name: "Мрежно програмирање" }]];

const predmetiSestiSemestarPodatoci = [

    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40), kratkoIme: "ДПИ", name: "Дигитален пренос на информации" }],
    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40) * 2, kratkoIme: "МПС", name: "Микропроцесорски системи" }],
    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40) * 3, kratkoIme: "СС", name: "Системски софтвер" }],
    [0, 500, 500, 'predmet5krediti', { x: ((globalWidth / 5) - 40) * 4, kratkoIme: "КИ", name: "Кориснички интерфејси" }],
    [0, 500, 500, 'predmet5krediti', { x: ((globalWidth / 5) - 40) * 5, kratkoIme: "ПНО", name: "Препознавање на облици" }]];

const predmetiSedmiSemestarPodatoci = [

    [0, 500, 500, 'predmet5krediti', { x: ((globalWidth / 5) - 40), kratkoIme: "ДКС", name: "Дистрибуирани компјутерски системи" }],
    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40) * 2, kratkoIme: "ВИ", name: "Вештачка интелегенција" }],
    [0, 500, 500, 'predmet5krediti', { x: ((globalWidth / 5) - 40) * 3, kratkoIme: "ПП", name: "Програмски практикум" }],
    [0, 500, 500, 'predmet5krediti', { x: ((globalWidth / 5) - 40) * 4, kratkoIme: "ПВИСЕ", name: "Програмирање на видео игри и специјални ефекти" }],
    [0, 500, 500, 'predmet5krediti', { x: ((globalWidth / 5) - 40) * 5, kratkoIme: "ВД", name: "Веб дизајн" }]];

const predmetiOsmiSemestarPodatoci = [

    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40), kratkoIme: "WAN", name: "WAN мрежи" }],
    [0, 500, 500, 'predmet6krediti', { x: ((globalWidth / 5) - 40) * 2, kratkoIme: "ИС", name: "Информациони системи" }],
    [0, 500, 500, 'predmet5krediti', { x: ((globalWidth / 5) - 40) * 3, kratkoIme: "ЈММ", name: "Јавни мобилни мрежи" }],
    [0, 500, 500, 'predmet5krediti', { x: ((globalWidth / 5) - 40) * 4, kratkoIme: "ГИС", name: "Географски информациони системи" }],
    [0, 500, 500, 'predmet5krediti', { x: ((globalWidth / 5) - 40) * 5, kratkoIme: "КАН", name: "Компјутерска анимација" }]];


const zapocniIgra = () => {
    let tabla = new Finki();
    tabla.dodadiObject(new Student());
    tabla.dodadiObject(new PrvSemestar(predmetiPrvSemestarPodatoci, vtorSemestarNaslov));
    FinkiPingPong.postavi(3, tabla);
    FinkiPingPong.postavi(5, new Krediti(0));
    FinkiPingPong.postavi(6, new PolozeniPredmeti(0));
    FinkiPingPong.postavi(7, new IscistenSemestar(""));

    let snd = new Audio("Sounds/darthvader_anger.wav");
    snd.play();
};

const zavsenaIgra = () => {

    let snd = new Audio("Sounds/darthvader_honored.wav");
    snd.play();
    FinkiPingPong.iscisteniSemestri += "✓ Осми семестар";

    FinkiPingPong.postavi(3, new Naslov("Честитки, дипломиравте!", "", zapocniIgra));
};

const izgubenaIgra = () => {
    let snd = new Audio("Sounds/darthvader_failedme.wav");
    snd.play();
    FinkiPingPong.postavi(3, new Naslov("Изгубивте!",
        "Обидете се повторно.",
        zapocniIgra));
};

const vtorSemestarNaslov = () => {

    FinkiPingPong.postavi(3, new Naslov("Втор семестар!", "", vtorSemestar));
};

const tretSemestarNaslov = () => {

    FinkiPingPong.postavi(3, new Naslov("Трет семестар!", "", tretSemestar));
};

const cetvrtSemestarNaslov = () => {

    FinkiPingPong.postavi(3, new Naslov("Четврт семестар!", "", cetvrtSemestar));
};

const pettiSemestarNaslov = () => {

    FinkiPingPong.postavi(3, new Naslov("Петти семестар!", "", petSemestar));
};

const sestiSemestarNaslov = () => {

    FinkiPingPong.postavi(3, new Naslov("Шести семестар!", "", sestiSemestar));
};

const sedmiSemestarNaslov = () => {

    FinkiPingPong.postavi(3, new Naslov("Седми семестар!", "", sedmiSemestar));
};

const osmiSemestarNaslov = () => {

    FinkiPingPong.postavi(3, new Naslov("Осми семестар!", "", osmiSemestar));
};

const vtorSemestar = () => {
    let snd = new Audio("Sounds/darthvader_anger.wav");
    snd.play();
    FinkiPingPong.iscisteniSemestri += "✓ Прв семестар,";
    let tabla = new Finki();
    tabla.dodadiObject(new Student());
    tabla.dodadiObject(new PrvSemestar(predmetiVtorSemestarPodatoci, tretSemestarNaslov));
    FinkiPingPong.postavi(3, tabla);
}

const tretSemestar = () => {
    let snd = new Audio("Sounds/darthvader_anger.wav");
    snd.play();
    FinkiPingPong.iscisteniSemestri += "✓ Втор семестар,";
    let tabla = new Finki();
    tabla.dodadiObject(new Student());
    tabla.dodadiObject(new PrvSemestar(predmetiTretSemestarPodatoci, cetvrtSemestarNaslov));
    FinkiPingPong.postavi(3, tabla);
}

const cetvrtSemestar = () => {
    let snd = new Audio("Sounds/darthvader_anger.wav");
    snd.play();
    FinkiPingPong.iscisteniSemestri += "✓ Трет семестар,";
    let tabla = new Finki();
    tabla.dodadiObject(new Student());
    tabla.dodadiObject(new PrvSemestar(predmetiCetvrtSemestarPodatoci, pettiSemestarNaslov));
    FinkiPingPong.postavi(3, tabla);
}

const petSemestar = () => {
    let snd = new Audio("Sounds/darthvader_anger.wav");
    snd.play();
    FinkiPingPong.iscisteniSemestri += "✓ Четврт семестар,";
    let tabla = new Finki();
    tabla.dodadiObject(new Student());
    tabla.dodadiObject(new PrvSemestar(predmetiPettiSemestarPodatoci, sedmiSemestarNaslov));
    FinkiPingPong.postavi(3, tabla);
}

const sestiSemestar = () => {
    let snd = new Audio("Sounds/darthvader_anger.wav");
    snd.play();
    FinkiPingPong.iscisteniSemestri += "✓ Петти семестар,";
    let tabla = new Finki();
    tabla.dodadiObject(new Student());
    tabla.dodadiObject(new PrvSemestar(predmetiSestiSemestarPodatoci, sedmiSemestarNaslov));
    FinkiPingPong.postavi(3, tabla);
}

const sedmiSemestar = () => {
    let snd = new Audio("Sounds/darthvader_anger.wav");
    snd.play();
    FinkiPingPong.iscisteniSemestri += "✓ Шести семестар,";
    let tabla = new Finki();
    tabla.dodadiObject(new Student());
    tabla.dodadiObject(new PrvSemestar(predmetiSedmiSemestarPodatoci, osmiSemestarNaslov));
    FinkiPingPong.postavi(3, tabla);
}

const osmiSemestar = () => {
    let snd = new Audio("Sounds/darthvader_anger.wav");
    snd.play();
    FinkiPingPong.iscisteniSemestri += "✓ Седми семестар,";
    let tabla = new Finki();
    tabla.dodadiObject(new Student());
    tabla.dodadiObject(new PrvSemestar(predmetiOsmiSemestarPodatoci, zavsenaIgra));
    FinkiPingPong.postavi(3, tabla);
}

class Pozadina {
    constructor(clear) {
        let canvas = document.createElement("canvas");
        canvas.width = FinkiPingPong.width;
        canvas.height = FinkiPingPong.height;
        let canvasCtx = canvas.getContext("2d");

        let offset = 0;

        if (clear) {
            canvasCtx.fillStyle = "#000";
        }
    }

    iscrtaj(ctx) {
    }

    step(dt) {
        let c = document.getElementById("finki_canvas");
        let ctx = c.getContext("2d");
        let img = document.getElementById("background");
        ctx.drawImage(img, 0, 0);
    }
}

const Student = function () {

    this.setup('student_levo', { vx: 0, vremeZaPauza: 0.25, maxVel: 900, kreditiSila: 100 });

    this.reload = this.vremeZaPauza;
    this.x = FinkiPingPong.width / 2 - this.w / 2;
    this.y = FinkiPingPong.height - this.h - 20;

    this.step = function (dt) {
        if (FinkiPingPong.kopcina['levo']) {
            this.setup('student_levo', { vx: 0, vremeZaPauza: 0.25, maxVel: 900, kreditiSila: this.kreditiSila });
            this.vx = -this.maxVel;

        }
        else
            if (FinkiPingPong.kopcina['desno']) {
                this.setup('student_desno', { vx: 0, vremeZaPauza: 0.25, maxVel: 900, kreditiSila: this.kreditiSila });
                this.vx = this.maxVel;
            }

            else { this.vx = 0; this.vy = 0; }

        this.x += this.vx * dt;
        this.y += this.vy * dt;


        if (this.x < 30) { this.x = 30; }
        else
            if (this.x > FinkiPingPong.width - this.w - 30) {
                this.x = FinkiPingPong.width - this.w - 30;
            }

        if (this.y < 30) { this.y = 30; }
        else
            if (this.y > FinkiPingPong.height - this.h - 30) {
                this.y = FinkiPingPong.height - this.h - 30;
            }

        this.reload -= dt;


        if (FinkiPingPong.kopcina['puk'] && this.reload < 0) {
            let PlayerProjectile = this.tabla.pronajdiTip(TOPCE_OBJEKT);
            if (!PlayerProjectile) {
                FinkiPingPong.kopcina['puk'] = false;
                this.reload = this.vremeZaPauza;

                this.tabla.dodadiObject(new Topce(this.x + (this.w / 2), this.y));
            }
        }


        if (this.kreditiSila != null) {
            let kreditiSilaString = "";
            let tmpkreditiSila = this.kreditiSila;
            while (tmpkreditiSila >= 10) {
                kreditiSilaString += " |";
                tmpkreditiSila -= 10;
            }
            let c = document.getElementById("finki_canvas");
            let ctx = c.getContext("2d");
            ctx.fillStyle = "#FFF";
            ctx.font = "bold 18px";
            ctx.fillText("Сила: " + kreditiSilaString, 20, 40);
            ctx.restore();
        }
    };
};

Student.prototype = new Akter();
Student.prototype.type = STUDENT_OBJEKT;

Student.prototype.hit = function (steta) {
    this.kreditiSila -= steta;

    if (this.kreditiSila <= 0) {
        if (this.tabla.otstraniObjekt(this)) {
            izgubenaIgra();
        }
    }
};


const Topce = function (x, y) {
    this.setup('topce', { vx: -400, vy: -400, steta: 10 });
    this.x = x - this.w / 2;
    this.y = y - this.h;
};

Topce.prototype = new Akter();
Topce.prototype.type = TOPCE_OBJEKT;

Topce.prototype.step = function (dt) {

    this.y += this.vy * dt;
    this.x -= this.vx * dt;

    if (this.x > (FinkiPingPong.width - 40) || this.x < 40) {
        let snd = new Audio("Sounds/WallHIt.wav");
        snd.play();
        this.vx = -this.vx;
    }

    if (this.y < 40) {
        let snd = new Audio("Sounds/WallHIt.wav");
        snd.play();
        this.vy = -this.vy;
    }

    if (this.y > (FinkiPingPong.height - 40)) {
        let player = this.tabla.pronajdiTip(STUDENT_OBJEKT);
        player.hit(this.steta);
        this.tabla.otstraniObjekt(this);
        this.tabla.dodadiObject(new Sudir(this.x + this.w / 2,
            this.y + this.h / 2));
    }

    let kolizijaStudent = this.tabla.kolizija(this, STUDENT_OBJEKT);
    if (kolizijaStudent) {
        let snd = new Audio("Sounds/WallHIt.wav");
        snd.play();
        this.vx = +this.vx;
        this.vy = -this.vy;
    }

    let kolizijaPredmet = this.tabla.kolizija(this, PREDMET_OBJEKT);
    if (kolizijaPredmet) {
        kolizijaPredmet.hit(this.steta);
        this.vx = +this.vx;
        this.vy = -this.vy;
        this.tabla.otstraniObjekt(this);
        this.tabla.dodadiObject(new Sudir(this.x + this.w / 2,
            this.y + this.h / 2));
    }

};

const Predmet = function (blueprint, override) {
    this.merge(this.baseParameters);
    this.setup(blueprint.Akter, blueprint);
    this.merge(override);
};

Predmet.prototype = new Akter();
Predmet.prototype.type = PREDMET_OBJEKT;

Predmet.prototype.baseParameters = {
    A: 0, B: 0, C: 0, D: 0,
    E: 0, F: 0, G: 0, H: 0,
    t: 0, vremeZaPauza: 0.75,
    reload: 0
};

Predmet.prototype.step = function (dt) {

    this.t += dt;

    this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
    this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);

    this.x += (this.vx * dt) / 6;
    this.y += (this.vy * dt) / 4;

    if (Math.random() < 0.01 && this.reload <= 0) {
        this.reload = this.vremeZaPauza;
        if (this.molivi == 2) {
            this.tabla.dodadiObject(new Moliv(this.x + this.w - 2, this.y + this.h));
            this.tabla.dodadiObject(new Moliv(this.x + 2, this.y + this.h));
        } else if (this.molivi == 1) {
            this.tabla.dodadiObject(new Moliv(this.x + this.w / 2, this.y + this.h));
        }

    }
    this.reload -= dt;


    if (this.y > (FinkiPingPong.height - 10) ||
        this.x < -this.w ||
        this.x > FinkiPingPong.width) {
        this.y = -200;
    }
};

Predmet.prototype.hit = function (steta) {
    if (this.kreditiSila == "5")
        FinkiPingPong.vkupnoKrediti += this.vkupnoKrediti || 0.5;
    else
        FinkiPingPong.vkupnoKrediti += this.vkupnoKrediti || 1;
    this.kreditiSila -= steta;
    this.kreditiSilaStatus = this.kreditiSila / 10;

    if (this.kreditiSila <= 0) {
        if (this.tabla.otstraniObjekt(this)) {
            FinkiPingPong.polozeniPredmeti += this.name + ",";
            this.tabla.dodadiObject(new Sudir(this.x + this.w / 2,
                this.y + this.h / 2));
        }
    }
};

const Moliv = function (x, y) {
    this.setup('moliv', { vy: 200, steta: 10 });
    this.x = x - this.w / 2;
    this.y = y;
};

Moliv.prototype = new Akter();
Moliv.prototype.type = MOLIV_OBJEKT;

Moliv.prototype.step = function (dt) {
    this.y += this.vy * dt;
    let collision = this.tabla.kolizija(this, STUDENT_OBJEKT)
    if (collision) {
        let snd = new Audio("//Sounds/Hit_Hurt7.wav");
        snd.play();
        collision.hit(this.steta);
        this.tabla.otstraniObjekt(this);
    } else if (this.y > FinkiPingPong.height) {
        this.tabla.otstraniObjekt(this);
    }
};

const Sudir = function (centerX, centerY) {
    let snd = new Audio("//Sounds/Explosion.wav");
    snd.play();
    this.setup('eksplozija', { frame: 0 });
    this.x = centerX - this.w / 2;
    this.y = centerY - this.h / 2;
};

Sudir.prototype = new Akter();

Sudir.prototype.step = function (dt) {
    this.frame++;
    if (this.frame >= 12) {
        this.tabla.otstraniObjekt(this);
    }
};

window.addEventListener("load", function () {
    FinkiPingPong.initialize("finki_canvas", grafika, pocetok);
});