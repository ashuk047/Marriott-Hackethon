class AiChatBot {
    constructor() {
        this._recognition = null;
        this.message = '';
        this.previousResponse=[];
        this.index=1;
        this.response = '';
        this.speechSynthesisUtterance = null;
        this.socket=this.initializeSocket();
        this.initSpeechRecognition();
        this.bindEvents();
    }
    initializeSocket() {
        const socket = io(); // Initialize socket.io
    
        // Listen for messages from the staff
        socket.on('staffMessage', (data) => {
            console.log(`Received message in room ${data.room}: ${data.message}`);
        });
    
        return socket;
    }

static_data={
    "user": {
      "name": "John Doe",
      "id":"test123",
      "stayDetails": {
        "checkInDate": "2023-11-15",
        "checkOutDate": "2023-11-20",
        "hotel": {
          "name": "Grand Plaza Hotel",
          "address": "123 Main Street, Anytown, USA",
          "room": {
            "number": 101,
            "type": "Deluxe Suite",
            "preferences": {
              "view": "Ocean View",
              "bedType": "King Size",
              "nonSmoking": true,
              "food":"veg"
            }
          }
        }
      }
    }
  }  

 

  displayTextResponse(text,amenitiesReq=false,message="",isOutgoing=false) {
    const chatbox = document.querySelector('.chatbox');
    if (chatbox) {
        const responseElement = document.createElement('li');
        responseElement.className = `chat ${isOutgoing ? 'outgoing' : 'incoming'}`;
        responseElement.innerHTML = `<p>${text}</p>`;
        chatbox.appendChild(responseElement);
        chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
    } else {
        console.error("Chatbox element not found.");
    }

        if(amenitiesReq){
        this.initializeSocket();
        const roomNumber = localStorage.getItem('roomNumber');
        const guestName = localStorage.getItem('guestName');
        let messageUser = `Guest ${guestName} requesting additional service: ${message}`;
        this.socket.emit('messageFromRoomToStaff', {
            guestName: guestName,
            room: roomNumber,
            message: messageUser
        });

}
}

    initSpeechRecognition() {
        if (!this._recognition) {
            this._recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            this._recognition.lang = 'en-US';
            this._recognition.continuous = true;
            this._recognition.interimResults = false;
            this._recognition.onresult = (event) => {
                const msg = event.results[event.results.length - 1][0].transcript;
                this.message = msg;
                this.displayTextResponse(`You said: ${msg}`);
                this.callAIModel(msg); // Call Gemini API with text
            };
            this._recognition.onerror = (error) => {
                console.error("Speech recognition error detected: ", error.error);
            };
            this._recognition.onend = () => {
                console.log("Speech recognition service stopped");
            };
            this._recognition.onstart = () => {
                console.log("Speech recognition service started");
            };
        }
    }

    toggleChatBotVisibility() {
        const chatBot = document.getElementById('chatBot');
        chatBot.classList.toggle('hidden');
    }

    clearChat() {
        const chatbox = document.getElementById('chatbox');
        chatbox.innerHTML = ''; // Clear chat messages
        this.previousResponse=[];
        this.index=1;
    }

    bindEvents() {
        document.getElementById('clearButton').addEventListener('click', this.clearChat.bind(this));
        document.getElementById('cross').addEventListener('click', this.toggleChatBotVisibility.bind(this));
        document.getElementById('speakButton').addEventListener('click', () => this.handleVoiceInput());
        document.getElementById('stopButton').addEventListener('click', () => this.handleStopRecognition());
        document.getElementById('muteButton').addEventListener('click', () => this.stopTextToSpeech());
        document.getElementById('sendTextButton').addEventListener('click', () => this.handleSendText());
    }

    addMessageToChatbox(message, className) {
        const chatbox = document.querySelector('.chatbox');
        const li = document.createElement('li');
        li.className = `chat ${className}`;
        li.innerHTML = `<p>${message}</p>`;
        chatbox.appendChild(li);
        chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
    }

    handleVoiceInput() {
        if (this._recognition) {
            console.log("Speech recognition has started.");
            this._recognition.start();
        }
    }

    handleSendText() {
        const inputField = document.querySelector('.chat-input textarea');
        const text = inputField.value.trim();
        if (text) {
            this.message = text;
            this.displayTextResponse(`You: ${text}`,"","",true); // Display user message
            this.callAIModel(text, true);  // Assuming callAIModel is used for text to API interaction
            inputField.value = '';  // Clear the input field after sending
        }
    }

    handleStopRecognition() {
        if (this._recognition) {
            console.log("Stopping speech recognition.");
            this._recognition.stop();
        }
    }

    async callAIModel(text, isText = false) {
        try {
            const response = await fetch('https://api.psnext.info/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6NzQ5MSwicm9sZXMiOlsiZGVmYXVsdCJdLCJwYXRpZCI6Ijk4NjlkMmNiLWY0OTktNDJjMC1iZjFkLWVhZWQ3NmRiYTMyNCJ9LCJpYXQiOjE3MjkyMjM2MTksImV4cCI6MTcyOTgyODQxOX0.WUxCrikDKNU2YJxAPDlmAXN7dcWldAI_i-HXlQ2fKew"
                },
                body: JSON.stringify({
                    "message": 'please tell me about: '+text+ 'and You are an intelligent assistant. When the user provides a message, analyze it and donot provide unneccessory details unless asked and to determine if they are requesting any specific amenities such as "water bottle," "room service," "extra pillow," etc.then'+
                    'If you identify such a request, please confirm the request by stating: "I understand you are requesting [amenity]. I will get back to you shortly.'+
                    'If no specific amenities are requested, provide a brief response based on the user question for example if user say hello or hii or any greetings just say his name from statc data and hii how may i assist you not full details and static details are provided just to provide assistant do not provide static details unless specifically asked . If any other language is detected, like Chinese or French, respond in that language. If the user requests amenities like water bottle or room service, please respond with "Sure! I will let staff know about your amenities" and state the amenities name.'+
                   ' Also, I am providing some static data you can use to give a response: and do not provide unneccesory details' +JSON.stringify(this.static_data)+'. The previous conversation with you and the responses were:' +JSON.stringify(this.previousResponse.reverse())+' Please use previous responses to give more accurate details.',
                    "role": "assistant",
                    "content":JSON.stringify(this.previousResponse.reverse()),
                    "options": {
                        "model": "gpt35turbo"
                    },
                    "temperature" : 0.9
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            const assistantMessage = data.data.messages.find(message => message.role === 'assistant');

            if (!assistantMessage) {
                throw new Error("Assistant message not found in response.");
            }
               
            console.log("API response:", assistantMessage);
            const amenityKeywords = ['water bottle', 'room service', 'extra pillow', 'towel', 'blanket'];
            let amenitiesReq = false;
            let amenityRequested = '';
    
            // Check if response contains any amenity requests
            amenityKeywords.forEach(keyword => {
                if (assistantMessage.content.toLowerCase().includes(keyword)) {
                    amenitiesReq = true;
                    amenityRequested = keyword;
                }
            });


            if (isText) {
                this.index++;
                this.displayTextResponse(`AI: ${assistantMessage.content}`, amenitiesReq, amenityRequested);
            } else {

                this.index++;
                this.previousResponse.push(`response ${this.index}: ${assistantMessage.content}`);
                this.convertTextToSpeech(assistantMessage.content);
            }

        } catch (error) {
            console.error("Error calling Gemini API:", error);
        }
    }

    convertTextToSpeech(text) {
        const sanitizedText = text.replace(/[^\w\s]/gi, '').split(' ').slice(0, 50).join(' ').substring(0, 500);
        if (sanitizedText) {
            this.stopTextToSpeech();
            this.speechSynthesisUtterance = new SpeechSynthesisUtterance(sanitizedText);
            speechSynthesis.speak(this.speechSynthesisUtterance);
        }
    }

    stopTextToSpeech() {
        if (window.speechSynthesis.speaking) {
            console.log("Stopping text to speech.");
            window.speechSynthesis.cancel();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AiChatBot();
});