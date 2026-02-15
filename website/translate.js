/**
 * Google Translate Auto-Plugin
 * Automatically translates the page to the user's browser language when it differs from English.
 * Hides the translate widget for a seamless experience.
 */
(function () {
    var PAGE_LANG = 'en';
    var SUPPORTED_LANGS = 'ar,zh-CN,zh-TW,nl,fr,de,hi,it,ja,ko,pt,ru,es,vi,th,pl,tr,id,ms,ro,uk,hu,cs,el,he,sv,da,no,fi';

    function getBrowserLang() {
        var lang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        if (!lang) return null;
        var base = lang.split('-')[0];
        if (base === 'en') return null;
        var map = {
            'zh': lang.indexOf('tw') >= 0 || lang.indexOf('hk') >= 0 ? 'zh-TW' : 'zh-CN',
            'pt': lang.indexOf('br') >= 0 ? 'pt' : 'pt',
            'no': 'no',
            'nb': 'no',
            'nn': 'no'
        };
        return map[base] || base;
    }

    function findOptionIndex(select, targetLang) {
        if (!select || !select.options) return -1;
        for (var i = 0; i < select.options.length; i++) {
            var val = (select.options[i].value || '').toLowerCase();
            if (val === targetLang.toLowerCase() || val.indexOf(targetLang.toLowerCase()) === 0) return i;
        }
        return -1;
    }

    function googleTranslateElementInit() {
        new google.translate.TranslateElement({
            pageLanguage: PAGE_LANG,
            includedLanguages: SUPPORTED_LANGS
        }, 'google_translate_element');

        var targetLang = getBrowserLang();
        if (!targetLang) return;

        function tryTranslate() {
            var select = document.querySelector('.goog-te-combo');
            if (!select) {
                setTimeout(tryTranslate, 100);
                return;
            }
            var idx = findOptionIndex(select, targetLang);
            if (idx > 0) {
                select.selectedIndex = idx;
                select.dispatchEvent(new Event('change'));
            }
        }
        setTimeout(tryTranslate, 300);
    }

    window.googleTranslateElementInit = googleTranslateElementInit;
    var s = document.createElement('script');
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.head.appendChild(s);
})();
