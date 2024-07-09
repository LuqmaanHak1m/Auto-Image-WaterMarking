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
    
        # Process the image (if needed)
        processed_image = image.convert("L")  # Example: You can apply filters or transformations here
        
        # Save the processed image to a BytesIO object
        img_io = io.BytesIO()
        processed_image.save(img_io, 'JPEG')
        img_io.seek(0)
        
        # Send the processed image back as a response
        return send_file(img_io, mimetype='image/jpeg')
    


@app.route('/waterMark', methods= ["POST"])
def waterMark():
    if 'file' not in request.files:
        return "No file part", 400
    
    inputImgFile = request.files['file']

    waterMarkFile = request.files['file2']


    if inputImgFile.filename == '' or waterMarkFile == '':
        return "No selected file", 400
    if inputImgFile or waterMarkFile:

        inputImg = Image.open(inputImgFile.stream)
        waterMark = Image.open(waterMarkFile.stream)

        inputPos = request.form["positionInput"]
    
        # Process the image (if needed)
        # Watermark cropping
        box = (0, 0, waterMark.width, waterMark.height)
        region = waterMark.crop(box)

        # Shrinking the watermark image
        region = region.reduce(8, (0, 0, region.width, region.height))

        match inputPos:

            case "Bottom Right":
                position = (inputImg.width - region.width, inputImg.height - region.height)
            case "Bottom Left":
                position = (0, inputImg.height - region.height)
            case "Top Right":
                position = (inputImg.width - region.width, 0)
            case "Top Left":
                position = (0, 0)
            case _:
                position = (inputImg.width - region.width, inputImg.height - region.height)

        # Pasting the watermark on top of the original image
        inputImg.paste(region, position)



        processed_image = inputImg  
        
        # Save the processed image to a BytesIO object
        img_io = io.BytesIO()
        processed_image.save(img_io, 'JPEG')
        img_io.seek(0)
        
        # Send the processed image back as a response
        return send_file(img_io, mimetype='image/jpeg')



if __name__ == "__main__":
    app.run( debug=True ,host="127.0.0.1", port=5050)