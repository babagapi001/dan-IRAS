<?php
header('Content-Type: application/json');

$folderPath = 'captured_images/';
$latestImage = '';

// Get the latest image file in the directory
$files = glob($folderPath . '*.{jpg,jpeg,png,gif}', GLOB_BRACE);
if (!empty($files)) {
    $latestImage = max($files); // Get the latest image path

    // Extract the file name from the image path
    $imageName = basename($latestImage);

    if (!empty($latestImage)) {
        echo json_encode(['success' => true, 'imagePath' => $latestImage, 'fileName' => $imageName]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No images found.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No images found.']);
}
?>
