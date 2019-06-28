<?php
if (isset($_POST['email'])) {
    $email = $_POST['email'];
    if (!empty($email)) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL) == false){
            echo 'Wait for a second..',$email," doesn't sound nice!";
        } else {
            echo "I love that email address!('∇')";
        }
    }
}
?>