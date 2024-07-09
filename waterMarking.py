from flask import Flask, render_template, redirect, url_for, request, flash, session, send_file
from functools import wraps

from PIL import Image
import io



app = Flask(__name__)
app.secret_key = "D8)FYha0asf8y8h3f0"




@app.route('/')
def home():
    return render_template("home.html")

@app.route('/blackAndWhite', methods= ["POST"])
def blackAndWhite():
    if 'file' not in request.files:
        return "No file part", 400
    
    file = request.files['file']

    print(file)
    print(type(file))

    if file.filename == '':
        return "No selected file", 400
    if file:
        image = Image.open(file.stream)
        # Perform image processing here (e.g., convert to grayscale)
        processed_image = image.convert("L")
        img_io = io.BytesIO()
        processed_image.save(img_io, 'JPEG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/jpeg')


if __name__ == "__main__":
    app.run( debug=True ,host="127.0.0.1", port=5050)