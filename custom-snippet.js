document.addEventListener('DOMContentLoaded', function() {
  // Wait for the page to fully load
  setTimeout(function() {
    // Find all link descriptions (adjust selector based on your actual site structure)
    const descriptions = document.querySelectorAll('p:not([class]):not(.meta):not(.description)');
    
    descriptions.forEach(desc => {
      // Skip if this element has already been processed or is not a description
      if (desc.classList.contains('processed') || 
          desc.parentNode.querySelector('.more-button')) {
        return;
      }
      
      // Mark as processed
      desc.classList.add('processed');
      
      // Get the original text
      const originalText = desc.textContent;
      
      // If text is longer than 150 characters
      if (originalText.length > 150) {
        // Create snippet
        const snippet = originalText.substring(0, 150) + '...';
        
        // Create full text element (hidden initially)
        const fullTextElem = document.createElement('div');
        fullTextElem.className = 'full-text';
        fullTextElem.style.display = 'none';
        fullTextElem.innerHTML = originalText.replace(/\n/g, '<br>');
        
        // Create read more button
        const moreButton = document.createElement('button');
        moreButton.className = 'more-button';
        moreButton.textContent = 'Read More';
        moreButton.style.marginLeft = '5px';
        moreButton.style.padding = '4px 10px';
        moreButton.style.backgroundColor = '#4285f4';
        moreButton.style.color = 'white';
        moreButton.style.border = 'none';
        moreButton.style.borderRadius = '4px';
        moreButton.style.cursor = 'pointer';
        moreButton.style.fontSize = '14px';
        
        // Set the snippet text
        desc.textContent = snippet;
        
        // Add button and full text after the description
        desc.parentNode.insertBefore(moreButton, desc.nextSibling);
        desc.parentNode.insertBefore(fullTextElem, moreButton.nextSibling);
        
        // Add click event to toggle between snippet and full text
        moreButton.addEventListener('click', function() {
          if (fullTextElem.style.display === 'none') {
            fullTextElem.style.display = 'block';
            desc.style.display = 'none';
            moreButton.textContent = 'Show Less';
          } else {
            fullTextElem.style.display = 'none';
            desc.style.display = 'block';
            moreButton.textContent = 'Read More';
          }
        });
      }
    });
  }, 1000); // Wait 1 second for dynamic content to load
}); 