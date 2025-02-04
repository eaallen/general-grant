(function(){
    // Get configuration from the page context
    const config =  {
        apiEndpoint: window.GRANT_CONFIG.apiEndpoint,
        title: 'GENeral Grant',
        contextData: window.GRANT_CONFIG.contextData
    };

    // Create container div
    const homeUrl = `${window.GRANT_CONFIG.hostUrl}/hackathon`;

    // Create toggle button that stays visible
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '×';
    toggleBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 30px;
        height: 30px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
    `;

    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 60px;
        right: 20px;
        background: white;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 10000;
        min-width: 200px;
        max-width: 800px;
        width: fit-content;
        display: none;
        overflow: visible;
    `;

    // Create a content wrapper to help with sizing
    const contentWrapper = document.createElement('div');
    contentWrapper.style.cssText = `
        width: 300px;
        min-width: 200px;
        max-width: 800px;
    `;
    container.appendChild(contentWrapper);

    // Create and add logo
    const title = document.createElement('h2');
    title.textContent = config.title;
    title.style.cssText = `
        text-align: center;
        margin: 0 0 15px 0;
        color: #333;
        font-family: Arial, sans-serif;
        font-size: 18px;
        cursor: move;
        width: 100%;
    `;
    contentWrapper.appendChild(title);

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
    contentWrapper.appendChild(logo);

    // Create input fields
    const input1 = document.createElement('textarea');
    input1.placeholder = 'Enter text...';
    input1.value = config.contextData || '';
    input1.style.cssText = `
        width: 100%;
        margin-bottom: 10px;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
        min-height: 60px;
        height: 120px;
        resize: vertical;
        overflow-y: auto;
    `;
    contentWrapper.appendChild(input1);

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
    contentWrapper.appendChild(submitBtn);

    // Toggle container visibility
    let isOpen = false;
    toggleBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        container.style.display = isOpen ? 'block' : 'none';
        toggleBtn.textContent = isOpen ? '×' : '+';
    });

    // Make container draggable
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    title.addEventListener('mousedown', dragStart);

    function dragStart(e) {
        initialX = e.clientX - container.offsetLeft;
        initialY = e.clientY - container.offsetTop;
        
        if (e.target === title) {
            isDragging = true;
        }
    }

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            
            // Keep within viewport bounds
            currentX = Math.min(Math.max(0, currentX), window.innerWidth - container.offsetWidth);
            currentY = Math.min(Math.max(0, currentY), window.innerHeight - container.offsetHeight);
            
            container.style.left = currentX + 'px';
            container.style.top = currentY + 'px';
            container.style.right = 'auto';
        }
    }

    function dragEnd() {
        isDragging = false;
    }

    // Add click handler
    submitBtn.addEventListener('click', async () => {
        console.log("click");

        console.log(input1.value);
        
        const url = new URL(config.apiEndpoint);
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

    // Add container and toggle button to page
    document.body.appendChild(container);
    document.body.appendChild(toggleBtn);
    
    // Show container initially
    toggleBtn.click();
})();