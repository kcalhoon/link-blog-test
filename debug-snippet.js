(function() {
  console.log('Debug snippet script loaded');
  
  // Function to process a paragraph and add Read More functionality
  function processContentParagraph(paragraph) {
    // Skip if already processed
    if (paragraph.classList.contains('snippet-processed')) {
      return;
    }
    
    // Mark as processed
    paragraph.classList.add('snippet-processed');
    
    // Get the text content
    const fullText = paragraph.textContent.trim();
    
    // Only process if text is long enough
    if (fullText.length <= 150) {
      return;
    }
    
    console.log('Processing paragraph:', fullText.substring(0, 30) + '...');
    
    // Create snippet
    const snippet = fullText.substring(0, 150) + '...';
    
    // Create elements
    const container = document.createElement('div');
    container.className = 'snippet-container';
    container.style.position = 'relative';
    
    const snippetElem = document.createElement('span');
    snippetElem.className = 'snippet-text';
    snippetElem.textContent = snippet;
    
    const fullTextElem = document.createElement('span');
    fullTextElem.className = 'full-text';
    fullTextElem.style.display = 'none';
    fullTextElem.textContent = fullText;
    
    const button = document.createElement('button');
    button.className = 'more-button';
    button.textContent = 'Read More';
    button.style.backgroundColor = '#4285f4';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.padding = '8px 16px';
    button.style.margin = '10px 0';
    button.style.cursor = 'pointer';
    button.style.fontSize = '14px';
    button.style.display = 'block';
    
    // Insert our elements
    container.appendChild(snippetElem);
    container.appendChild(fullTextElem);
    container.appendChild(button);
    
    // Replace the paragraph's content with our container
    paragraph.textContent = '';
    paragraph.appendChild(container);
    
    // Add click handler directly to the button
    button.onclick = function(event) {
      event.preventDefault();
      event.stopPropagation();
      
      console.log('Button clicked');
      
      if (fullTextElem.style.display === 'none') {
        // Show full text
        snippetElem.style.display = 'none';
        fullTextElem.style.display = 'inline';
        button.textContent = 'Show Less';
      } else {
        // Show snippet
        snippetElem.style.display = 'inline';
        fullTextElem.style.display = 'none';
        button.textContent = 'Read More';
      }
      
      return false;
    };
  }
  
  // Function to scan the page for content paragraphs
  function scanForContentParagraphs() {
    console.log('Scanning for content paragraphs');
    
    // Find all paragraphs that might contain content
    const paragraphs = document.querySelectorAll('p:not(.meta):not(.date):not(.snippet-processed)');
    
    paragraphs.forEach(p => {
      const text = p.textContent.trim();
      
      // Only process paragraphs with substantial text
      if (text.length > 150) {
        processContentParagraph(p);
      }
    });
  }
  
  // Set up a MutationObserver to watch for changes to the DOM
  const observer = new MutationObserver(function(mutations) {
    scanForContentParagraphs();
  });
  
  // Function to initialize everything
  function initialize() {
    console.log('Initializing debug snippet script');
    
    // Scan for content paragraphs
    scanForContentParagraphs();
    
    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Also scan periodically
    setInterval(scanForContentParagraphs, 2000);
  }
  
  // Wait for the page to fully load
  if (document.readyState === 'complete') {
    initialize();
  } else {
    window.addEventListener('load', initialize);
  }
})(); 