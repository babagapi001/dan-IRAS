<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['image'])) {
    $imageData = $data['image'];
    $folderPath = 'captured_images/';

    if (!file_exists($folderPath)) {
        mkdir($folderPath, 0777, true);
    }

    // Remove the base64 part
    $imageData = str_replace('data:image/png;base64,', '', $imageData);
    $imageData = str_replace(' ', '+', $imageData);
    $imageData = base64_decode($imageData);

    // Count existing images in the folder to determine the image number
    $existingImages = glob($folderPath . 'capture_*.png');
    $imageNumber = count($existingImages) + 1;

    // Generate a unique name for the image using the current timestamp and image number
    $timestamp = date('Y_m_d_H_i_s'); // Format: YearMonthDay_HourMinuteSecond
    $fileName = $folderPath . 'capture_' . $timestamp . 's_' . $imageNumber . '.png';

    if (file_put_contents($fileName, $imageData)) {
        echo json_encode(['success' => true, 'imagePath' => $fileName]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save image.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No image data received.']);
}
?>
