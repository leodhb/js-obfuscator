<?php
    require_once 'hunter.php';
    $code = $_POST['code'];
    $code_decoded = base64_decode($code);

    $hunter = new HunterObfuscator($code_decoded); 
    $obsfucated = $hunter->Obfuscate();

    echo base64_encode($obsfucated);
