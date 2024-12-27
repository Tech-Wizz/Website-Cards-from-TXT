async function loadCards() {
    const cardFiles = ['christensen.txt', 'kruize.txt'];  // List of your .txt files
    const container = document.getElementById('cardContainer');
    container.innerHTML = '';  // Clear any existing content
    
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
        const description = lines.slice(2).join(' ');  // The rest is the description
  
        // Create the card element
        const card = document.createElement('div');
        card.classList.add('card');
  
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
  
        // Append the card to the container
        container.appendChild(card);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    }
  }
  
  loadCards();  // Load the cards when the page loads
  