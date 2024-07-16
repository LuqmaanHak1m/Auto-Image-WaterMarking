from flask import Flask, render_template, redirect, url_for, request, flash, session, send_file
from functools import wraps

from PIL import Image
import io

import imageProcessing



app = Flask(__name__)
app.secret_key = "D8)FYha0asf8y8h3f0"




@app.route('/')
def home():
    return render_template("home.html")

@app.route('/blackAndWhite', methods= ["POST"])
def blackAndWhite():

    # Check if there is a files section in the post
    if 'file' not in request.files:
        return "No file part", 400
    
    # Get the data from the post
    file = request.files['file']

    # Check if a file has been selected
    if file.filename == '':
        return "No selected file", 400
    if file:

        # Convert the image to B&W
        img_io = imageProcessing.convertToBW(file)
        
        # Send the processed image back as a response
        return send_file(img_io, mimetype='image/jpeg')
    


@app.route('/waterMark', methods= ["POST"])
def waterMark():

    # Check if there is a files section in the post
    if 'file' not in request.files:
        return "No file part", 400
    
    # Get the data from the post
    inputImgFile = request.files['file']

    waterMarkFile = request.files['file2']

    inputPos = request.form["positionInput"]


    # Check if a file has been selected
    if inputImgFile.filename == '' or waterMarkFile == '':
        return "No selected file", 400
    
    if inputImgFile or waterMarkFile:

        # Convert the image to B&W
        img_io = imageProcessing.converToWaterMark(inputImgFile, waterMarkFile, inputPos)
        
        # Send the processed image back as a response
        return send_file(img_io, mimetype='image/jpeg')



if __name__ == "__main__":
    app.run( debug=True ,host="127.0.0.1", port=5050)