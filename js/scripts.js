
        let input = document.querySelector('#scriptOriginal');
        var editorInput = CodeMirror.fromTextArea(input, {
            lineNumbers: true,
            mode: 'javascript',
            autocapitalize: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            lineWrapping: true
        });

        let output = document.querySelector('#scriptOfuscado');
        var editorOutput = CodeMirror.fromTextArea(output, {
            lineNumbers: true,
            mode: 'javascript',
            autocapitalize: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            lineWrapping: true
        });

        editorOutput.setOption("readOnly", true);


        $(document).ready(function() {

            new Clipboard('#copiar', {
                text: function(trigger) {
                    $('#copiar').text('Copiado!');
                    return getCodeMirrorNative('#scriptOfuscado').getDoc().getValue();
                }
            });

            // Retrieve a CodeMirror Instance via native JavaScript.
            function getCodeMirrorNative(target) {
                var _target = target;
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


            $("#ofuscar").on("click", function() {
                 const txt_encoded = Base64.encode(editorInput.getValue());

                $.ajax({
                    url: "backend/ajax.php",
                    type: "post",
                    data: {
                        code: txt_encoded
                    },
                    success: function (response) {
                        const txt_decoded = Base64.decode(response);
                        editorOutput.setValue(txt_decoded);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                    }
                });
            });
        });