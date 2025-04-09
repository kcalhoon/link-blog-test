document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch and process the links data
  async function fetchLinks() {
    try {
      const response = await fetch('links.json');
      const links = await response.json();
      displayLinks(links);
    } catch (error) {
      console.error('Error fetching links:', error);
      document.getElementById('links-container').innerHTML = '<p>Error loading links. Please try again later.</p>';
    }
  }

  // Function to display links with text snippets
  function displayLinks(links) {
    const container = document.getElementById('links-container');
    container.innerHTML = '';

    links.forEach(link => {
      const linkElement = document.createElement('div');
      linkElement.className = 'link-item';

      // Create the snippet (first 150 characters)
      const fullText = link.full_text;
      const snippet = fullText.substring(0, 150) + (fullText.length > 150 ? '...' : '');

      // Create HTML structure
      linkElement.innerHTML = `
        <h2><a href="${link.url}" target="_blank">${link.title}</a></h2>
        <p class="description">${link.description}</p>
        <div class="text-content">
          <p class="snippet">${snippet}</p>
          <div class="full-text" style="display: none;">${fullText.replace(/\n/g, '<br>')}</div>
          ${fullText.length > 150 ? '<button class="more-button">Read More</button>' : ''}
        </div>
        <p class="meta">Date: ${link.date} | Tags: ${link.tags.join(', ')}</p>
      `;

      container.appendChild(linkElement);

      // Add event listener to the "Read More" button if it exists
      const moreButton = linkElement.querySelector('.more-button');
      if (moreButton) {
        moreButton.addEventListener('click', function() {
          const snippet = linkElement.querySelector('.snippet');
          const fullText = linkElement.querySelector('.full-text');
          
          if (fullText.style.display === 'none') {
            // Show full text
            snippet.style.display = 'none';
            fullText.style.display = 'block';
            moreButton.textContent = 'Show Less';
          } else {
            // Show snippet
            snippet.style.display = 'block';
            fullText.style.display = 'none';
            moreButton.textContent = 'Read More';
          }
        });
      }
    });
  }

  // Initialize
  fetchLinks();
}); 