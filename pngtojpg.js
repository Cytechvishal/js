document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Image Converter</title>
<style>
  body {
    font-family: Arial, sans-serif;
    text-align: center;
  }
  canvas {
    display: none; /* Hide the canvas */
  }
</style>
</head>
<body>

<h1>Image Converter</h1>
<input type="file" accept="image/png" id="fileInput">
<br><br>
<button onclick="convertToJPG()">Convert to JPEG</button>

<canvas id="canvas"></canvas>

<script>
function convertToJPG() {
    const fileInput = document.getElementById('fileInput');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file!');
        return;
    }

    if (!file.type.match('image/png')) {
        alert('Please select a PNG image!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/jpeg', 0.9); // Quality set to 0.9
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'converted.jpg';
            link.click();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}
</script>

</body>
</html>
`)