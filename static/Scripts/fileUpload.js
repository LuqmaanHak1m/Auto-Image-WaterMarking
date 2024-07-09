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
    document.getElementById('blackAndWhiteUploadForm').addEventListener('submit', async function(event) {
        event.preventDefault();
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
            img.style.display = 'block';
        } else {
            alert('Failed to upload image');
        }
    });
}