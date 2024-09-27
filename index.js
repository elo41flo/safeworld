// Liste d'insultes à filtrer
const motsInterdits = ['sale pute', 'connasse', 'connard', 'con', 'conne', 'pute', 'putain', 'fils de pute', 'fille de pute']; // Exemple d'insultes

// Charger les messages depuis localStorage lors du chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    // Inverser l'ordre des messages pour afficher les plus récents en haut
    storedMessages.reverse().forEach((message, index) => addMessageToDOM(message, index));
});

// Fonction d'ajout d'un message et stockage dans localStorage
document.getElementById('send-button').addEventListener('click', function() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    // Vérification des insultes avant d'ajouter le message
    if (containsInsult(messageText)) {
        alert('Votre message contient des mots interdits. Veuillez corriger votre message.');
    } else if (messageText !== '') {
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];

        // Ajouter le message à la liste des messages stockés
        storedMessages.push(messageText);
        localStorage.setItem('messages', JSON.stringify(storedMessages));

        // Ajouter le message au DOM en haut
        addMessageToDOM(messageText, storedMessages.length - 1);

        // Vider la zone de texte après envoi
        messageInput.value = '';
    } else {
        alert('Veuillez écrire un message avant de l\'envoyer.');
    }
});

// Ajouter un message au DOM
function addMessageToDOM(messageText, index) {
    const messagesContainer = document.getElementById('messages-container');
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.setAttribute('data-index', index);

    // Ajouter le texte du message avec son numéro
    newMessage.innerHTML = `
        <span>Message ${index + 1}: ${messageText}</span>
        <div class="message-buttons">
            <button class="modify">Modifier</button>
            <button class="delete">Supprimer</button>
        </div>
    `;

    // Ajouter le nouveau message en haut
    messagesContainer.insertBefore(newMessage, messagesContainer.firstChild);

    // Ajouter les événements pour modifier et supprimer
    newMessage.querySelector('.delete').addEventListener('click', function() {
        deleteMessage(index);
    });

    newMessage.querySelector('.modify').addEventListener('click', function() {
        modifyMessage(index);
    });
}

// Vérifier si le message contient une insulte
function containsInsult(message) {
    const messageLowerCase = message.toLowerCase(); // Convertir en minuscule pour comparaison
    return motsInterdits.some(insulte => messageLowerCase.includes(insulte));
}

// Supprimer un message
function deleteMessage(index) {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    storedMessages.splice(index, 1);
    localStorage.setItem('messages', JSON.stringify(storedMessages));
    refreshMessages(); // Rafraîchir l'affichage
}

// Modifier un message
function modifyMessage(index) {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const newMessageText = prompt('Modifier votre message:', storedMessages[index]);

    if (newMessageText !== null && newMessageText.trim() !== '') {
        // Vérifier si le message modifié contient des insultes
        if (containsInsult(newMessageText)) {
            alert('Votre message contient des mots interdits. Veuillez corriger votre message.');
        } else {
            // Mettre à jour le message dans le tableau
            storedMessages[index] = newMessageText;
            localStorage.setItem('messages', JSON.stringify(storedMessages));
            refreshMessages(); // Rafraîchir l'affichage
        }
    }
}

// Rafraîchir l'affichage des messages
function refreshMessages() {
    const messagesContainer = document.getElementById('messages-container');
    messagesContainer.innerHTML = ''; // Vider le conteneur
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    // Inverser l'ordre des messages pour afficher les plus récents en haut
    storedMessages.reverse().forEach((message, index) => addMessageToDOM(message, index));
}

// Ajouter la fonctionnalité de recherche
document.getElementById('search-button').addEventListener('click', function() {
    const searchNumber = parseInt(document.getElementById('search-number').value, 10);
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const messageIndex = searchNumber ? searchNumber - 1 : null; // Convertir en index (0-based)

    // Vider le conteneur et afficher le message recherché
    const messagesContainer = document.getElementById('messages-container');
    messagesContainer.innerHTML = ''; // Vider le conteneur

    if (messageIndex >= 0 && messageIndex < storedMessages.length) {
        addMessageToDOM(storedMessages[messageIndex], messageIndex);
    } else {
        alert('Message non trouvé.');
        // Afficher tous les messages si rien n'est trouvé
        storedMessages.reverse().forEach((message, index) => addMessageToDOM(message, index));
    }
});
