<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $newProduct = $_POST['newProduct']; 
    $User = $_POST['User']; 

    

    
    $directory = 'Media/' . $User;
    if (!is_dir($directory)) {
        mkdir($directory, 0777, true);
    }

    
    $filenames = [];

    
    $index = 1; 
    foreach ($_FILES as $key => $file) {
        if ($file['error'] === UPLOAD_ERR_OK) {
            $extension = pathinfo($file['name'], PATHINFO_EXTENSION); 
            $filename = "{$newProduct}_" . str_pad($index, 2, '0', STR_PAD_LEFT) . ".{$extension}"; 
            move_uploaded_file($file['tmp_name'], "$directory/{$filename}");
            $filenames[] = $filename; 
            $index++; 
        }
    }

    
    header('Content-Type: application/json');
    echo json_encode($filenames);
} else {
    echo "Invalid request method";
}
?>
