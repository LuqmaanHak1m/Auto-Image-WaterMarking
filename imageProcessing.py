import io
import math
from PIL import Image

def convertToBW(file):
    image = Image.open(file.stream)
    
    # Process the image (if needed)
    processed_image = image.convert("L")  # Example: You can apply filters or transformations here
    
    # Save the processed image to a BytesIO object
    img_io = io.BytesIO()
    processed_image.save(img_io, 'JPEG')
    img_io.seek(0)

    return img_io

def converToWaterMark(inputImgFile, waterMarkFile, inputPos, inputSize):
    inputImg = Image.open(inputImgFile.stream)
    waterMark = Image.open(waterMarkFile.stream)

    # Process the image
    # Watermark cropping

    ## TODO If an image is already black and white, the watermark is also black and white???

    box = (0, 0, waterMark.width, waterMark.height)
    region = waterMark.crop(box)

    # Shrinking the watermark image
    match inputSize:

        case "Small":
            region = region.reduce(16, (0, 0, region.width, region.height))
        case "Normal":
            region = region.reduce(8, (0, 0, region.width, region.height))
        case "Large":
            region = region.reduce(4, (0, 0, region.width, region.height))
        case "Extra Large":
            region = region.reduce(2, (0, 0, region.width, region.height))
        case _:
            region = region.reduce(8, (0, 0, region.width, region.height))
    
    # Choosing the position of the watermark image
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
    if region.has_transparency_data:
        inputImg.paste(region, position, region)
    else:
        inputImg.paste(region, position)


    ## Sending the image back
    processed_image = inputImg  
    
    # Save the processed image to a BytesIO object
    img_io = io.BytesIO()
    processed_image.save(img_io, 'PNG')
    img_io.seek(0)

    return img_io