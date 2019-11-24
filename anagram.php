<?php

$input = file_get_contents("php://input");
if(!empty($input)){
    parse_str($input, $_POST);
}

if (!empty($_POST['word'])) {

    $word = $_POST['word'];
    $word = str_replace(" ", "", $word);

    $result = [];

    if (preg_match("/[^A-Z]/i", $word)) {
        $result['error'] = 1;
    } else {
        $file = explode("\n", file_get_contents('.\\palavras.82eebac6.txt'));

        $result['data'] = [];
        foreach ($file as $string) {
            if (count_chars($string, 1) == count_chars($word,1)) {
                $result['data'][] = $string;
            }
        }
    }

}
echo json_encode($result);

?>
