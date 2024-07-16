window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('singleUploadForm').addEventListener('submit', function(event) {
        checkIfFileInputted(event, blackAndWhite, 'inputImg');
    });

    document.getElementById('doubleUploadForm').addEventListener('submit', function(event) {
        checkIfFileInputted(event, waterMark, 'inputImg', 'waterMarkImg');
    });
});

function displayInputFile() {
    const fileInput = document.getElementById('inputImg');
    const file = fileInput.files[0];
    const filePreview = document.getElementById('inputImgPreview');
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            filePreview.innerHTML = '';

            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxHeight = '300px';
                img.style.maxWidth = '500px';
                filePreview.appendChild(img);
            }
        };
        
        reader.readAsDataURL(file);
    } else {
        filePreview.textContent = 'No file selected';
    }
}

function displayWaterMarkFile() {
    const fileInput = document.getElementById('waterMarkImg');
    const file = fileInput.files[0];
    const filePreview = document.getElementById('waterMarkImgPreview');
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            filePreview.innerHTML = '';

            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxHeight = '300px';
                img.style.maxWidth = '500px';
                filePreview.appendChild(img);
            }
        };
        
        reader.readAsDataURL(file);
    } else {
        filePreview.textContent = 'No file selected';
    }
}

async function blackAndWhite() {
    const fileInput = document.getElementById('inputImg');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const response = await fetch('/blackAndWhite', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const img = document.getElementById('processedImage');
        
        img.src = url;
        img.style.maxHeight = '500px';
        img.style.maxWidth = '1000px';
        img.style.display = 'block';
    } else {
        alert('Failed to upload image');
    }
    
}

function setLink(){
    const img = document.getElementById('processedImage');
    const link = document.getElementById('processedImageLink');

    link.setAttribute("href", img.src);
    link.setAttribute("download", "processedImage.png");
}

async function waterMark() {
    const fileInput = document.getElementById('inputImg');
    const fileInput2 = document.getElementById('waterMarkImg');
    const positionInput = document.getElementById('position').value;

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('file2', fileInput2.files[0]);
    formData.append('positionInput', positionInput);

    const response = await fetch('/waterMark', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const img = document.getElementById('processedImage');
        img.src = url;
        img.style.maxHeight = '500px';
        img.style.maxWidth = '1000px';
        img.style.display = 'block';
    } else {
        alert('Failed to upload image');
    }
}

function checkIfFileInputted(event, func, ...ids) {
    event.preventDefault();
    
    let valid = true;

    for (let id of ids) {
        let fileInput = document.getElementById(id).files;
        if (fileInput.length != 1) {
            alert("Make sure to input the correct number of images!");
            valid = false;
            break;
        }
    }

    if (func && valid) {   
        func();
    } else if (!func) {
        alert(`Function ${func} is undefined`);
    }
}
