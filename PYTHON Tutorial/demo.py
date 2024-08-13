from flask import Flask, Response, render_template_string
import mss
from PIL import Image
import io
import pytesseract

app = Flask(__name__)

# Define the OCR function
def perform_ocr(image):
    text = pytesseract.image_to_string(image)
    return text

def generate_frames():
    with mss.mss() as sct:
        monitor = sct.monitors[1]  # Use the primary monitor; adjust as needed
        while True:
            # Capture the screen
            img = sct.grab(monitor)
            # Convert to PIL Image
            img = Image.frombytes('RGB', img.size, img.bgra, 'raw', 'BGRX')
            # Save to a bytes buffer
            buffer = io.BytesIO()
            img.save(buffer, format='JPEG')
            buffer.seek(0)
            # Perform OCR
            text = perform_ocr(img)
            # Yield the frame and the captured text
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.read() + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/')
def index():
    return render_template_string('''
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    h1 {
                        text-align: center;
                        color: #333;
                    }
                    .container {
                        display: flex;
                        justify-content: space-between;
                        width: 80%;
                        margin: auto;
                        overflow: hidden;
                        padding: 20px;
                        background-color: #fff;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        border-radius: 8px;
                    }
                    .left {
                        flex: 1;
                        margin: 10px;
                        padding: 10px;
                        background-color: #fafafa;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                    }
                    .left img {
                        width: 100%;
                        border-bottom: 2px solid #ddd;
                    }
                    .left #ocr_text {
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <h1>Screen Mirroring with OCR</h1>
                <div class="container">
                    <div class="left">
                        <img src="/video_feed" width="100%">
                        <div id="ocr_text">Text from screen will appear here...</div>
                    </div>
                </div>
                <script>
                    // Update OCR text periodically
                    setInterval(function() {
                        fetch('/ocr_text')
                            .then(response => response.text())
                            .then(text => document.getElementById('ocr_text').innerText = text);
                    }, 1000); // Update every second
                </script>
            </body>
        </html>
    ''')

@app.route('/ocr_text')
def ocr_text():
    # Capture a single frame for OCR
    with mss.mss() as sct:
        monitor = sct.monitors[1]
        img = sct.grab(monitor)
        img = Image.frombytes('RGB', img.size, img.bgra, 'raw', 'BGRX')
        text = perform_ocr(img)
        return text

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
