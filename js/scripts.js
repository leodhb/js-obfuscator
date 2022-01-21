
import HunterObfuscator from "./lib/HunterObfuscator/HunterObfuscator.js";

//selecionar TextAreas
const input  = document.querySelector('#scriptOriginal');
const output = document.querySelector('#scriptOfuscado');


//Carregar editores nos TextAreas
const editorInput = CodeMirror.fromTextArea(input, {
    lineNumbers: true,
    mode: 'javascript',
    autocapitalize: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    lineWrapping: true
});

const editorOutput = CodeMirror.fromTextArea(output, {
    lineNumbers: true,
    mode: 'javascript',
    autocapitalize: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    lineWrapping: true
});


//Setar o editor do Código ofuscado como RO
editorOutput.setOption("readOnly", true);

//Conjunto de funçoes para copiar para o clipboard
new Clipboard('#copiar', {
    text: function(trigger) {
        $('#copiar').text('Copiado!');
        return getCodeMirrorNative('#scriptOfuscado').getDoc().getValue();
    }
});

const getCodeMirrorNative = (target) => {
    let _target = target;
    if (typeof _target === 'string') {
        _target = document.querySelector(_target);
    }
    if (_target === null || !_target.tagName === undefined) {
        throw new Error('Element does not reference a CodeMirror instance.');
    }
    
    if (_target.className.indexOf('CodeMirror') > -1) {
        return _target.CodeMirror;
    }

    if (_target.tagName === 'TEXTAREA') {
        return _target.nextSibling.CodeMirror;
    }
    
    return null;
};

document.querySelector("#ofuscar").onclick = function() {
    editorOutput.setValue('Perai rapidao...');
    const obfuscator = new HunterObfuscator(editorInput.getValue())
    editorOutput.setValue(obfuscator.obfuscate());
}
