"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = require("jsdom");
var axios_1 = require("axios");
var fs_1 = require("fs");
var crypto_1 = require("crypto");
var base_pages = [
    "https://www.resumoporcapitulo.com.br/triste-fim-de-policarpo-quaresma",
    "https://www.resumoporcapitulo.com.br/ang%C3%BAstia"
];
var link_selector = "a._3Bkfb._1lsz7";
var text_selector = "p.mm8Nw._1j-51.roLFQS._1FoOD._78FBa.sk96G9.roLFQS.public-DraftStyleDefault-block-depth0.fixed-tab-size.public-DraftStyleDefault-text-ltr";
var chapter_selector = "p.mm8Nw._1j-51.roLFQS._1FoOD._1oG79.WJlzbz.roLFQS.public-DraftStyleDefault-block-depth0.fixed-tab-size.public-DraftStyleDefault-text-ltr > span._2PHJq.public-DraftStyleDefault-ltr > span:first-child:not(br):not(a)";
var title_selector = "h2.eSWI6._1j-51._1FoOD._1oG79.WJlzbz.roLFQS.public-DraftStyleDefault-block-depth0.fixed-tab-size.public-DraftStyleDefault-text-ltr";
var cache = [];
function getLinksChaptersAndTitle(url) {
    return __awaiter(this, void 0, void 0, function () {
        var res, dom, chapters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Fetching ".concat(url, "..."));
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 1:
                    res = _a.sent();
                    dom = new jsdom_1.JSDOM(res.data);
                    chapters = getChapters(dom);
                    return [2 /*return*/, [Array.from(dom.window.document.querySelectorAll(link_selector)).map(function (link) { return link.href; }), chapters, dom.window.document.title.replace('Resumo Por Capítulo: ', '')]];
            }
        });
    });
}
function getChapters(dom) {
    var query = Array.from(dom.window.document.querySelectorAll(chapter_selector));
    var chapters = query.filter(function (el) { return el.parentElement.parentElement.previousElementSibling.getAttribute('type') === "empty-line" && el.parentElement.parentElement.nextElementSibling.nextElementSibling.textContent !== 'Deixe seu comentário:'; });
    var format = chapters.map(function (el) { return [el.textContent, el.parentElement.parentElement.nextElementSibling.nextElementSibling.textContent]; });
    return chapters.length ? format : false;
}
function getText(url, index) {
    return __awaiter(this, void 0, void 0, function () {
        var res, dom;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Fetching ".concat(url, "..."));
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 1:
                    res = _a.sent();
                    dom = new jsdom_1.JSDOM(res.data);
                    return [2 /*return*/, [index, [
                                Array.from(dom.window.document.querySelectorAll(title_selector)).pop().textContent,
                                Array.from(dom.window.document.querySelectorAll(text_selector)).map(function (text) { return text.textContent; })
                            ]]];
            }
        });
    });
}
function getPage(value) {
    return __awaiter(this, void 0, void 0, function () {
        var link, chapters, textCache, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    link = value[0], chapters = value[1];
                    link.shift();
                    textCache = {};
                    return [4 /*yield*/, Promise.all(link.map(getText))];
                case 1:
                    page = _a.sent();
                    page = page.sort(function (a, b) { return a[0] - b[0]; });
                    if (chapters) {
                        chapters
                            .filter(function (chapter) { return !(page.map(function (x) { return x[1][0]; })
                            .includes(chapter[0])); })
                            .forEach(function (_a) {
                            var chapter = _a[0], link = _a[1];
                            var index = page.findIndex(function (_a) {
                                var index = _a[0], _b = _a[1], title = _b[0], text = _b[1];
                                return link === title;
                            });
                            page.splice(index, 0, [NaN, [chapter, null]]);
                        });
                    }
                    page.forEach(function (_a) {
                        var index = _a[0], _b = _a[1], title = _b[0], text = _b[1];
                        return textCache[title] = text;
                    });
                    return [2 /*return*/, {
                            title: value[2],
                            chapters: textCache
                        }];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var links;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(base_pages.map(getLinksChaptersAndTitle))];
                case 1:
                    links = _a.sent();
                    links.map(getPage).forEach(function (page) {
                        page.then(function (textCache) { return cache.push(textCache); });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main();
process.on("exit", function () {
    var resumes = [];
    (0, fs_1.rmdirSync)("public/articles", { recursive: true });
    (0, fs_1.mkdirSync)("public/articles");
    cache.forEach(function (file) {
        var uuid = (0, crypto_1.randomUUID)();
        (0, fs_1.writeFileSync)("public/articles/".concat(uuid, ".json"), JSON.stringify(file));
        resumes.push({ name: file.title, link: uuid });
    });
    (0, fs_1.writeFileSync)("public/resumes.json", JSON.stringify(resumes));
    console.log("Done!");
});
