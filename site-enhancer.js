(function() {
  // Create a script element for our custom snippet functionality
  const script = document.createElement('script');
  script.src = 'custom-snippet.js';
  document.head.appendChild(script);
  
  // Add the necessary styles
  const style = document.createElement('style');
  style.textContent = `
    .more-button {
      background-color: #4285f4;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 4px 10px;
      font-size: 14px;
      cursor: pointer;
      margin: 5px 0;
    }
    .more-button:hover {
      background-color: #3367d6;
    }
    .full-text {
      margin-top: 10px;
    }
  `;
  document.head.appendChild(style);
})(); 