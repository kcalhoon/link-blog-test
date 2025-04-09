// Create and inject our script
const script = document.createElement('script');
script.src = 'https://kcalhoon.github.io/link-blog-test/custom-snippet.js';
document.head.appendChild(script);

// Add our styles
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

console.log('Direct injection script executed'); 