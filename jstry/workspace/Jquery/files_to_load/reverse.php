<?php
if (isset($_POST["input"], $_POST["phpname"])) {
    $string = $_POST["input"];
    $name = $_POST["phpname"];
    echo '<strong>',strrev($name),'</strong> says <i>',strrev($string),'</i>';
}
?>