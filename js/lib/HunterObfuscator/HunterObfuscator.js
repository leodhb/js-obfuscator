class HunterObfuscator {
    constructor(code, html = false) {
        if(html) {
            code = this.cleanHtml(code)
            this.code = this.html2js(code)
        } else {
            code = this.cleanJs(code)
            this.code = code;
        }

        this.mask = this.getMask();
        this.interval = this.rand(1, 20);
        this.option = 8;
    }

    getMask() {
        const charset = this.strShuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        return charset.substr(0, 9);
    }

    hashIt(string) {
        for(let i = 0 ; i < this.mask.length ; i++) {
            string = string.replace(`${i}`, this.mask[i]);
        }

        return string;
    }

    encodeIt() {
        let string = "";
        for(let i = 0 ; i < this.code.length ; i++) {
            string += this.hashIt(this.base_convert(this.ord(this.code[i]) + this.interval), 10) + this.mask[this.option]
        }
        return string;
    }

    obfuscate() {
        const rand = this.rand(0, 99);
        const rand1 = this.rand(0, 99);
        return `var _0xc${rand}e=[\"\",\"\x73\x70\x6C\x69\x74\",\"\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A\x2B\x2F\",\"\x73\x6C\x69\x63\x65\",\"\x69\x6E\x64\x65\x78\x4F\x66\",\"\",\"\",\"\x2E\",\"\x70\x6F\x77\",\"\x72\x65\x64\x75\x63\x65\",\"\x72\x65\x76\x65\x72\x73\x65\",\"\x30\"];function _0xe${rand1}c(d,e,f){var g=_0xc${rand}e[2][_0xc${rand}e[1]](_0xc${rand}e[0]);var h=g[_0xc${rand}e[3]](0,e);var i=g[_0xc${rand}e[3]](0,f);var j=d[_0xc${rand}e[1]](_0xc${rand}e[0])[_0xc${rand}e[10]]()[_0xc${rand}e[9]](function(a,b,c){if(h[_0xc${rand}e[4]](b)!==-1)return a+=h[_0xc${rand}e[4]](b)*(Math[_0xc${rand}e[8]](e,c))},0);var k=_0xc${rand}e[0];while(j>0){k=i[j%f]+k;j=(j-(j%f))/f}return k||_0xc${rand}e[11]}eval(function(h,u,n,t,e,r){r=\"\";for(var i=0,len=h.length;i<len;i++){var s=\"\";while(h[i]!==n[e]){s+=h[i];i++}for(var j=0;j<n.length;j++)s=s.replace(new RegExp(n[j],\"g\"),j);r+=String.fromCharCode(_0xe${rand1}c(s,e,10)-t)}return decodeURIComponent(escape(r))}(\"${this.encodeIt()}\",${this.rand(1,100)},\"${this.mask}\",${this.interval},${this.option},${this.rand(1,60)}))`
    }

    /* HTML GOODIES */
    cleanHtml(code) {
        return code.replace('/<!--(.|\s)*?-->/', '');
    }

    html2js(code) {
        const search = [
            '/\>[^\S ]+/s',     // strip whitespaces after tags, except space
            '/[^\S ]+\</s',     // strip whitespaces before tags, except space
            '/(\s)+/s',         // shorten multiple whitespace sequences
            '/<!--(.|\s)*?-->/' // Remove HTML comments
        ]
        
        const replace = [
            '>',
            '<',
            '\\1',
            ''
        ]

        code = code.replace(search, replace);
        return "document.write('" . this.addSlashes(code + " ") + "');";
    }
    
    /* JS GOODIES */
    cleanJs(code) {
        const pattern = '/(?:(?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:(?<!\:|\\\|\')\/\/.*))/';
        code = code.replace(pattern, '');
        
        const search = [
            '/\>[^\S ]+/s',     // strip whitespaces after tags, except space
            '/[^\S ]+\</s',     // strip whitespaces before tags, except space
            '/(\s)+/s',         // shorten multiple whitespace sequences
            '/<!--(.|\s)*?-->/' // Remove HTML comments
        ];
        
        const replace = [
            '>',
            '<',
            '\\1',
            ''
        ];

        return code.replace(search, replace);
    }

    /* UTILITY FUNCTIONS */
    addSlashes(string) {
        return string.replace(/\\/g, '\\\\').
            replace(/\u0008/g, '\\b').
            replace(/\t/g, '\\t').
            replace(/\n/g, '\\n').
            replace(/\f/g, '\\f').
            replace(/\r/g, '\\r').
            replace(/'/g, '\\\'').
            replace(/"/g, '\\"');
    }

    strShuffle (str) {
        //  discuss at: https://locutus.io/php/str_shuffle/
        // original by: Brett Zamir (https://brett-zamir.me)
        //   example 1: var $shuffled = str_shuffle("abcdef")
        //   example 1: var $result = $shuffled.length
        //   returns 1: 6
        if (arguments.length === 0) {
          throw new Error('Wrong parameter count for strShuffle()')
        }
        if (str === null) {
          return ''
        }
        str += ''
        let newStr = ''
        let rand
        let i = str.length
        while (i) {
          rand = Math.floor(Math.random() * i)
          newStr += str.charAt(rand)
          str = str.substring(0, rand) + str.substr(rand + 1)
          i--
        }
        return newStr
    }

    rand(min, max) {
        var min = min || 0,
            max = max || Number.MAX_SAFE_INTEGER;
      
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    base_convert (number, frombase) {
        return parseInt(number, frombase | 0).toString(this.option | 0)
    }

    ord(str){return str.charCodeAt(0);}
}

export default HunterObfuscator;