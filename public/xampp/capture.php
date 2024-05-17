<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Webcam Capture</title>
    <style>
        /* CSS to style the image */
        body, html {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #capturedImage {
            width: 100%;
            height: 100%;
            object-fit: contain; /* Ensures the image covers the entire container */
            border-radius: 8px;
        }
        #captureImageTest {
            position: fixed;
            bottom: 20px; /* Adjust this value to control the distance from the bottom */
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999; /* Ensure the button appears in front of other elements */
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        #imageName {
            position: absolute;
            top: 20px;
            left: 20px;
            background-color: lightgray;
            padding: 10px;
        }
    </style>
</head>
<body style="overflow:hidden;">
<video id="video" width="auto" height="auto" autoplay="" style="display: none; object-fit: contain;"></video>
    <button id="captureImageTest" style="width: 80%;font-size: 18px;font-family: monospace; display:none;">Click to capture a new image</button>
    <canvas id="canvas" width="auto" height="auto" style="display:none;"></canvas>
    <img id="capturedImage" src="" alt="Captured Image">
    <p id="imageName" style="
    font-size: 18px;
    font-family: monospace;
    margin: 0px;
    padding: 0;
"></p> <!-- Element to display image name -->

    <script>
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        const captureButton = document.getElementById('captureImageTest');
        const capturedImage = document.getElementById('capturedImage');
        const imageNameDisplay = document.getElementById('imageName'); // Reference to display image name

        // Function to display the latest captured image
        function displayLatestImage() {
            // Fetch the latest image from the server
            fetch('get_latest_image.php')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        capturedImage.src = data.imagePath;
                        imageNameDisplay.textContent = data.fileName; // Display image file name
                    } else {
                        console.error("Error fetching latest image: " + data.message);
                    }
                });
        }

        // Get access to the camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error("Error accessing webcam: " + err);
            });

        // Capture the image when the button is clicked
        captureButton.addEventListener('click', () => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageDataURL = canvas.toDataURL('image/png');

            // Send the image to the server
            fetch('save_image.php', {
                method: 'POST',
                body: JSON.stringify({ image: imageDataURL }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // After saving, display the latest image
                    displayLatestImage();
                } else {
                    console.error("Error saving image: " + data.message);
                }
            });
        });

        // Display the latest captured image when the page loads
        displayLatestImage();
    </script>
    <script>
        // Listen for messages from the parent window
        window.addEventListener("message", function(event) {
            // Check if the message is to trigger a click on button2
            if (event.data === "triggerButton2Click") {
                // Find and click the button in HTML 2
                document.getElementById("captureImageTest").click();
                console.log("Button 2 clicked virtually.");
            }
        });
    </script>
</body>
</html>
