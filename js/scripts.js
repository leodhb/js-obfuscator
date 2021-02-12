
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

        $(document).ready(function() {

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


            //açao do botao ofuscar
            $("#ofuscar").on("click", function() {
                const txt_encoded = Base64.encode(editorInput.getValue());

                editorOutput.setValue('Perai rapidao...');

                //requisiçao ao PHP
                $.ajax({
                    url: "backend/ajax.php",
                    type: "post",
                    data: {
                        code: txt_encoded
                    },
                    success: function (response) {
                        //Tratamento da resposta
                        const txt_decoded = Base64.decode(response);
                        editorOutput.setValue(txt_decoded);
                    },
                    //Se der ruim
                    error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                    }
                });
            });
        });
