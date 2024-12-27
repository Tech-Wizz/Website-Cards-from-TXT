async function loadCards() {
  const cardFiles = ['christensen.txt', 'kruize.txt'];  // List of your .txt files
  const container = document.getElementById('cardContainer');
  container.innerHTML = '';  // Clear any existing content

  // Create an array to hold all cards
  const cards = [];

  // Iterate over each file and create cards
  for (let i = 0; i < cardFiles.length; i++) {
    const fileName = cardFiles[i];
    const textFilePath = `cards/${fileName}`;
    
    try {
      const response = await fetch(textFilePath); // Fetch the content of the .txt file
      const text = await response.text();
      const lines = text.split('\n'); // Split content by newlines

      const imagePath = `img/${lines[0]}`;  // First line is the image file name
      const title = lines[1];  // Second line is the title
      const description = lines.slice(2, -1).join(' ');  // The rest is the description
      const tags = lines[lines.length - 1].replace('tags:', '').split(',').map(tag => tag.trim());  // Parse tags from the last line

      // Create the card element
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-tags', tags.join(',')); // Set the tags as a data attribute

      // Create the image element
      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = title;
      card.appendChild(img);

      // Create the title element
      const cardTitle = document.createElement('h3');
      cardTitle.textContent = title;
      card.appendChild(cardTitle);

      // Create the description element
      const cardDescription = document.createElement('p');
      cardDescription.textContent = description;
      card.appendChild(cardDescription);

      // Append the card to the cards array
      cards.push(card);
      
      // Append the card to the container
      container.appendChild(card);
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  }
}

// Function to filter cards based on search input
function filterCards(searchTerm) {
  const container = document.getElementById('cardContainer');
  const cards = container.querySelectorAll('.card');
  
  cards.forEach(card => {
    const tags = card.getAttribute('data-tags').toLowerCase();
    const searchQuery = searchTerm.toLowerCase();
    
    // Check if the tags contain the search term
    if (tags.includes(searchQuery) && searchQuery.trim() !== "") {
      card.style.display = '';  // Show card if search term matches tags
    } else {
      card.style.display = 'none';  // Hide card if search term does not match tags
    }
  });
}

// Add event listener for search input
document.getElementById('searchInput').addEventListener('input', (event) => {
  const searchTerm = event.target.value;
  filterCards(searchTerm);
});

loadCards();  // Load the cards when the page loads
