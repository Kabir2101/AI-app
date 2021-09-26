const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const ansInput = document.querySelector("#ans")
const h1 = document.querySelector("h1");
const span = document.querySelector("span");
const container = document.querySelector(".container");

const speechBtnDiv = document.querySelector("#speech-btn");
const micBtn = document.querySelector(".btn .fas");
const instruction = document.querySelector(".instruction");

const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const speechSynthesis = window.speechSynthesis;
const recognition = new speechRecognition();

if (speechRecognition && speechSynthesis){
    console.log("Speech recognition and Synthesis supported");
    micBtn.addEventListener("click", micBtnClicked);


    function micBtnClicked(e){
        e.preventDefault();
        if(micBtn.classList.contains("fa-microphone")){
            recognition.start();
        } else{
            recognition.stop();
        }

        // Start speech recognition
        recognition.addEventListener("start", () => {
            // micBtn.classList.remove("fa-microphone");
            // micBtn.classList.add("fa-microphone-slash");
            micBtn.classList.replace("fa-microphone","fa-microphone-slash");
        

            instruction.textContent = "Press Ctrl + M (In Mac OS Cmd + M) on your keyboard or click the Mic icon to stop recording"

            searchInput.focus();
            console.log("Speech recognition enabled");
        });
  }

    // End speech recognition
    recognition.addEventListener("end", () => {
        // micBtn.classList.remove("fa-microphone-slash");
        // micBtn.classList.add("fa-microphone");
        micBtn.classList.replace("fa-microphone-slash","fa-microphone");

        instruction.textContent = "Press Ctrl + X (In Mac OS Cmd + X) on your keyboard or click the Mic icon to start recording"

        searchInput.focus();
        console.log("Speech recognition disabled");
    });

    recognition.continuous = true;
    // const recognitionOn = setInterval(() => {
    //     if (instruction.textContent.includes(start)) {
    //        recognition.start();
    //        micBtn.classList.replace("fa-microphone","fa-microphone-slash");
        
    //         instruction.textContent = "Press Ctrl + M (In Mac OS Cmd + M) on your keyboard or click the Mic icon to stop recording"

    //         searchInput.focus();
    //         console.log("Speech recognition enabled");
    //     }
    // });

    // Keyboard shortcuts
    speechRecognitionKeys();
    loadTranscript();

} else{
    container.style.visibility = "hidden";
    console.log("Speech recognition and Synthesis not supported");
    h1.textContent = "Max the virtual assistant failed to start. Reason: speech recognition / speech synthesis not supported."; 
}

// Shortcut function
function speechRecognitionKeys(){
    // Add keyboard event listener
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key === "x"){
            recognition.start();

            micBtn.classList.replace("fa-microphone","fa-microphone-slash");
        
            instruction.textContent = "Press Ctrl + M (In Mac OS Cmd + M) on your keyboard or click the Mic icon to stop recording"

            searchInput.focus();
            console.log("Speech recognition enabled");
        }

        if (e.ctrlKey && e.key === "m"){
            recognition.stop();

            micBtn.classList.replace("fa-microphone-slash","fa-microphone");

            instruction.textContent = "Press Ctrl + X (In Mac OS Cmd + X) on your keyboard or click the Mic icon to start recording"

            searchInput.focus();
            console.log("Speech recognition disabled");
        }
    })
}

function loadTranscript(){
    recognition.addEventListener("result", (e) => {
        console.log(e)
        const current = e.resultIndex;
        const transcript = e.results[current][0].transcript;
        showTranscript(transcript);

        // content += transcript;
        // searchInput.value = content;
        // searchInput.focus();

        // respond(transcript);

        // Loop
        for (let i = 0; i < lists.length; i++){
            console.log(lists[i].question);
            let askedQuestion = transcript.toLowerCase().trim();
            console.log(askedQuestion);
            if (askedQuestion.toLowerCase().includes(lists[i].question)){
                console.log("match");
                console.log(lists[i].answer);
                respond(lists[i].answer);

                break;
            }
            // if (
            //     askedQuestion.startsWith("what is", 0) && askedQuestion !== lists[i].question && (i = 1)) {
            //     let errorMsg = "Sorry, I don't have enough data to answer this question";
            //     respond(errorMsg);
            //     break;
            // }
        }
    });
}

// Handle response
function respond(res){
    let voices = window.speechSynthesis.getVoices();
    console.log(voices)
    const speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    speech.text = res;
    speech.volume = "2";
    speech.rate = "0.9";
    speech.pitch = "1";
    // speech.voice = speechSynthesis.speak(speech);
    if (voices){
        speech.voice = voices[0];
    } else{
        speech.voice = voices[1];
    }

    window.speechSynthesis.speak(speech);
    
    
}

// Show transcript

function showTranscript(res){
    if (res.toLowerCase().trim() === "stop recording"){
        recognition.stop();
    } else if (!searchInput.value){
        searchInput.value = "";
        searchInput.value = res;
        // ansInput.value = ans;
    } else{
        if (res.toLowerCase().trim() === "search") {
            searchForm.submit();
        } else if(res.toLowerCase().trim() === "reset form"){
            searchInput.value = "";
        } else {
            searchInput.value = "";
            searchInput.value = res;
        }
    }
}
