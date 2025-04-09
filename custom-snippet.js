document.addEventListener('DOMContentLoaded', function() {
  console.log('Custom snippet script loaded');
  
  // Function to apply snippets
  function applySnippets() {
    console.log('Applying snippets');
    
    // Target all possible description elements
    const selectors = [
      'p:not([class])',
      '.description',
      'article p',
      'div[class*="content"] p',
      'div p'
    ];
    
    let foundElements = false;
    
    // Try each selector
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      console.log(`Found ${elements.length} elements with selector: ${selector}`);
      
      if (elements.length > 0) {
        elements.forEach(element => {
          // Skip if already processed
          if (element.classList.contains('snippet-processed')) {
            return;
          }
          
          const text = element.textContent.trim();
          
          // Only process elements with substantial text
          if (text.length > 150) {
            console.log('Processing element with text:', text.substring(0, 30) + '...');
            
            // Mark as processed
            element.classList.add('snippet-processed');
            
            // Create snippet
            const snippet = text.substring(0, 150) + '...';
            
            // Create elements
            const snippetElem = document.createElement('p');
            snippetElem.className = 'snippet-text';
            snippetElem.textContent = snippet;
            
            const fullTextElem = document.createElement('div');
            fullTextElem.className = 'full-text';
            fullTextElem.style.display = 'none';
            fullTextElem.innerHTML = text.replace(/\n/g, '<br>');
            
            const button = document.createElement('button');
            button.className = 'more-button';
            button.textContent = 'Read More';
            button.style.marginTop = '5px';
            
            // Replace original element with our new elements
            const parent = element.parentNode;
            parent.replaceChild(snippetElem, element);
            parent.insertBefore(button, snippetElem.nextSibling);
            parent.insertBefore(fullTextElem, button.nextSibling);
            
            // Add click handler
            button.addEventListener('click', function() {
              if (fullTextElem.style.display === 'none') {
                snippetElem.style.display = 'none';
                fullTextElem.style.display = 'block';
                button.textContent = 'Show Less';
              } else {
                snippetElem.style.display = 'block';
                fullTextElem.style.display = 'none';
                button.textContent = 'Read More';
              }
            });
            
            foundElements = true;
          }
        });
      }
      
      if (foundElements) break;
    }
  }
  
  // Try immediately
  applySnippets();
  
  // And also try after a delay to catch dynamically loaded content
  setTimeout(applySnippets, 1000);
  setTimeout(applySnippets, 2000);
}); 