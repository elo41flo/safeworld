// Importation des fonctions Firebase nécessaires
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onChildAdded } from "firebase/database";

// Configuration Firebase (ton fichier de configuration)
const firebaseConfig = {
  apiKey: "AIzaSyBwpxuSPN2I2Z-cUnh3cz45FLqNJu2d90c",
  authDomain: "safe-world-9475c.firebaseapp.com",
  projectId: "safe-world-9475c",
  storageBucket: "safe-world-9475c.appspot.com",
  messagingSenderId: "348288607278",
  appId: "1:348288607278:web:e9d7db914c81ff0bb9ebbf",
  measurementId: "G-FCE2390XNL",
  databaseURL: "https://safe-world-9475c-default-rtdb.firebaseio.com/"  // Assurez-vous d'ajouter l'URL de la Realtime Database ici
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Référence à l'endroit où les messages seront stockés
const messagesRef = ref(database, 'messages');

// Ajouter un message à la base de données lorsqu'un utilisateur clique sur le bouton d'envoi
document.getElementById('send-button').addEventListener('click', function() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText !== '') {
        // Envoie le message à la Realtime Database
        push(messagesRef, {
            text: messageText,
            timestamp: Date.now()
        });

        // Vide le champ d'entrée après l'envoi
        messageInput.value = '';
    } else {
        alert('Veuillez entrer un message.');
    }
});

// Écoute en temps réel les nouveaux messages ajoutés à la base de données
onChildAdded(messagesRef, (snapshot) => {
    const message = snapshot.val();
    addMessageToDOM(message.text);
});

// Fonction pour ajouter un message au DOM
function addMessageToDOM(messageText) {
    const messagesContainer = document.getElementById('messages-container');
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.textContent = messageText;
    messagesContainer.prepend(newMessage);  // Les nouveaux messages s'affichent en haut
}
