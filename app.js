(function(){
    // Create container div

    const homeUrl = 'https://localhost:5173/bookmarklet/hackathon';

    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 10000;
        width: 200px;
    `;

    // Create and add logo
    const logo = document.createElement('img');
    logo.src = `${homeUrl}/logo.png`;
    logo.alt = 'Logo';
    logo.style.cssText = `
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        margin: 0 auto 15px auto;
        display: block;
    `;
    container.appendChild(logo);

    // Create input fields
    const input1 = document.createElement('textarea');
    input1.placeholder = 'Enter text...';
    input1.style.cssText = `
        width: 100%;
        margin-bottom: 10px;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
        min-height: 60px;
        max-height: 200px;
        resize: none;
        overflow-y: hidden;
    `;

    // Add auto-grow functionality
    input1.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Create submit button
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'SUBMIT';
    submitBtn.style.cssText = `
        width: 100%;
        padding: 8px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    `;

    // Add click handler
    submitBtn.addEventListener('click', async () => {
        console.log("click");

        console.log(input1.value);
        
        
        const url = new URL('https://script.google.com/macros/s/AKfycbyzLtFLiB8aCsqSg1uowAodmzdEON5EYzZAZRN1iadqyGZLDOnW2hXw6LVLjtTNqYUdWw/exec');
        const context = input1.value;
        input1.value = '';
        url.searchParams.set('context', context);
        url.searchParams.set('form', document.body.innerText);
        input1.value = context;
        
        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            const response = await fetch(url);
            console.log(response)
            const data = await response.json();
            console.log(data.result)
            submitBtn.textContent = 'Success!';
            setTimeout(() => {
                submitBtn.textContent = 'SUBMIT';
                submitBtn.disabled = false;
            }, 2000);
            
        } catch (error) {
            console.error('Error:', error);
            submitBtn.textContent = 'Error - Try Again';
            submitBtn.disabled = false;
        }
    });

    // Append elements to container
    container.appendChild(input1);
    container.appendChild(submitBtn);

    // Add container to page
    document.body.appendChild(container);
})();