document.addEventListener('DOMContentLoaded', function() {
  console.log('Custom snippet script loaded');
  
  // Wait a bit for the page to fully render
  setTimeout(function() {
    // Find all article containers
    const articles = document.querySelectorAll('article, .post, main > div, body > div');
    
    console.log(`Found ${articles.length} potential article containers`);
    
    // Process each article
    articles.forEach(article => {
      // Find all paragraphs in this article
      const paragraphs = article.querySelectorAll('p:not(.meta):not(.processed)');
      
      // Skip if no paragraphs or already processed
      if (paragraphs.length === 0 || article.classList.contains('snippet-processed')) {
        return;
      }
      
      // Mark as processed
      article.classList.add('snippet-processed');
      
      // Remove any existing Read More buttons
      const existingButtons = article.querySelectorAll('.more-button');
      existingButtons.forEach(button => button.remove());
      
      // Find the first paragraph with substantial text (likely the content)
      let contentParagraph = null;
      for (const p of paragraphs) {
        if (p.textContent.trim().length > 100) {
          contentParagraph = p;
          break;
        }
      }
      
      if (!contentParagraph) {
        return; // No suitable paragraph found
      }
      
      // Get the full text
      const fullText = contentParagraph.textContent.trim();
      
      // Only process if text is long enough
      if (fullText.length <= 150) {
        return;
      }
      
      console.log(`Processing article with text: ${fullText.substring(0, 30)}...`);
      
      // Create snippet
      const snippet = fullText.substring(0, 150) + '...';
      
      // Store original text
      contentParagraph.setAttribute('data-full-text', fullText);
      
      // Set to snippet
      contentParagraph.textContent = snippet;
      contentParagraph.classList.add('snippet-text');
      
      // Create Read More button
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
      
      // Insert button after paragraph
      contentParagraph.parentNode.insertBefore(button, contentParagraph.nextSibling);
      
      // Add click handler
      button.addEventListener('click', function() {
        if (contentParagraph.classList.contains('expanded')) {
          // Show snippet
          contentParagraph.textContent = snippet;
          contentParagraph.classList.remove('expanded');
          button.textContent = 'Read More';
        } else {
          // Show full text
          contentParagraph.textContent = contentParagraph.getAttribute('data-full-text');
          contentParagraph.classList.add('expanded');
          button.textContent = 'Show Less';
        }
      });
    });
  }, 500);
}); 