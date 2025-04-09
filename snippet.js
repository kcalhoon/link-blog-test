document.addEventListener('DOMContentLoaded', function() {
  // Find all link descriptions
  const descriptions = document.querySelectorAll('.link-description, p:not([class])');
  
  descriptions.forEach(desc => {
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
      fullTextElem.textContent = originalText;
      
      // Create read more button
      const moreButton = document.createElement('button');
      moreButton.className = 'more-button';
      moreButton.textContent = 'Read More';
      moreButton.style.marginLeft = '5px';
      moreButton.style.padding = '2px 8px';
      moreButton.style.backgroundColor = '#4285f4';
      moreButton.style.color = 'white';
      moreButton.style.border = 'none';
      moreButton.style.borderRadius = '4px';
      moreButton.style.cursor = 'pointer';
      
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
}); 