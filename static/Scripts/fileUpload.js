function displayInputFile() {
    const fileInput = document.getElementById('inputImg');
    const file = fileInput.files[0];
    const filePreview = document.getElementById('inputImgPreview');
    
    if (file) {
        const reader = new FileReader();
        
        
        reader.onload = function(e) {
            // Clear previous content
            filePreview.innerHTML = '';
            

            // Check file type and display accordingly
            if (file.type.startsWith('image/')) {
                // Display image
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
            // Clear previous content
            filePreview.innerHTML = '';
            

            // Check file type and display accordingly
            if (file.type.startsWith('image/')) {

                // Display image
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

function blackAndWhite() {
    document.getElementById('singleUploadForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        // Getting input file
        const fileInput = document.getElementById('inputImg');
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        // Sending file to route
        const response = await fetch('/blackAndWhite', {
            method: 'POST',
            body: formData
        });

        // Respose control
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
    });
}

function waterMark() {
    document.getElementById('doubleUploadForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        // Getting input file
        const fileInput = document.getElementById('inputImg');
        const fileInput2 = document.getElementById('waterMarkImg');
        let positionInput = document.getElementById('position');
        positionInput = positionInput.options[positionInput.selectedIndex].text;

        const formData = new FormData();

        formData.append('file', fileInput.files[0]);
        formData.append('file2', fileInput2.files[0]);
        formData.append('positionInput', positionInput);

        // Sending file to route
        const response = await fetch('/waterMark', {
            method: 'POST',
            body: formData
        });

        // Respose control
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
    });
}