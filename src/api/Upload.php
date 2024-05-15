<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $newProduct = $_POST['newProduct']; 
    $User = $_POST['User']; 

    

    // Create directory if it doesn't exist based on newProduct
    $directory = 'Media/' . $User;
    if (!is_dir($directory)) {
        mkdir($directory, 0777, true);
    }

    // Initialize array to store filenames
    $filenames = [];

    // Save image files in the directory
    $index = 1; // Initialize index
    foreach ($_FILES as $key => $file) {
        if ($file['error'] === UPLOAD_ERR_OK) {
            $extension = pathinfo($file['name'], PATHINFO_EXTENSION); // Get file extension
            $filename = "{$newProduct}_" . str_pad($index, 2, '0', STR_PAD_LEFT) . ".{$extension}"; // Generate filename with index and newProduct
            move_uploaded_file($file['tmp_name'], "$directory/{$filename}");
            $filenames[] = $filename; // Add filename to array
            $index++; // Increment index for next image
        }
    }

    // Encode filenames array as JSON and send it back to the frontend
    header('Content-Type: application/json');
    echo json_encode($filenames);
} else {
    echo "Invalid request method";
}
?>
