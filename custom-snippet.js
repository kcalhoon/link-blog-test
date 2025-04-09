document.addEventListener('DOMContentLoaded', function() {
  console.log('Custom snippet script loaded');
  
  // Wait a bit for the page to fully render
  setTimeout(function() {
    console.log('Starting to process snippets');
    
    // Try to find the main content area
    const mainContent = document.querySelector('main') || document.body;
    
    // Find all link items/articles
    const linkItems = mainContent.querySelectorAll('div, article');
    console.log(`Found ${linkItems.length} potential link items`);
    
    linkItems.forEach(item => {
      // Skip if already processed
      if (item.classList.contains('snippet-processed')) {
        return;
      }
      
      // Find paragraphs that might contain content
      const paragraphs = item.querySelectorAll('p');
      if (paragraphs.length === 0) {
        return;
      }
      
      // Find the content paragraph (usually the longest one)
      let contentParagraph = null;
      let maxLength = 0;
      
      paragraphs.forEach(p => {
        const text = p.textContent.trim();
        if (text.length > maxLength && !p.classList.contains('meta') && !p.classList.contains('date')) {
          maxLength = text.length;
          contentParagraph = p;
        }
      });
      
      if (!contentParagraph || maxLength <= 150) {
        return; // No suitable paragraph or text not long enough
      }
      
      // Mark as processed
      item.classList.add('snippet-processed');
      
      console.log('Found content paragraph:', contentParagraph.textContent.substring(0, 30) + '...');
      
      // Get the full text
      const fullText = contentParagraph.textContent;
      
      // Create snippet
      const snippet = fullText.substring(0, 150) + '...';
      
      // Create a wrapper for our content
      const wrapper = document.createElement('div');
      wrapper.className = 'snippet-wrapper';
      
      // Create snippet element
      const snippetElem = document.createElement('p');
      snippetElem.className = 'snippet-text';
      snippetElem.textContent = snippet;
      
      // Create full text element (hidden initially)
      const fullTextElem = document.createElement('p');
      fullTextElem.className = 'full-text';
      fullTextElem.style.display = 'none';
      fullTextElem.textContent = fullText;
      
      // Create button
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
      
      // Add elements to wrapper
      wrapper.appendChild(snippetElem);
      wrapper.appendChild(fullTextElem);
      wrapper.appendChild(button);
      
      // Replace the original paragraph with our wrapper
      contentParagraph.parentNode.replaceChild(wrapper, contentParagraph);
      
      // Add click handler
      button.addEventListener('click', function() {
        console.log('Button clicked');
        if (fullTextElem.style.display === 'none') {
          // Show full text
          snippetElem.style.display = 'none';
          fullTextElem.style.display = 'block';
          button.textContent = 'Show Less';
        } else {
          // Show snippet
          snippetElem.style.display = 'block';
          fullTextElem.style.display = 'none';
          button.textContent = 'Read More';
        }
      });
    });
  }, 1000);
}); 