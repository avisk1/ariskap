<?php

    if(!empty($_POST['data'])){
        $data = $_POST['data'];
        $file = fopen($_POST['file'], 'w');
        fwrite($file, $data);
        fclose($file);
    }

?>