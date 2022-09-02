// Init speechsynth API
const synth = window.speechSynthesis;

//Dom
const textForm = document.querySelector('form')
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector('#voice-select')
const rate = document.querySelector("#rate");
const rateValue= document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector('#pitch-value')
const body = document.querySelector("body")

//Init voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    
    //create options for Each Voice
    voices.forEach(voice => {
        //create an option element
        const option = document.createElement("option");
        //fill option with voices and language
        option.textContent = voice.name ;

        option.setAttribute("data-lang", voice.lang)
        option.setAttribute("data-name", voice.name);
        voiceSelect.appendChild(option)
    })
};

 
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

//speak
const speak = () => {
    //check if speaking
    if (synth.speaking) {
        console.error('Already speaking ...');
        return
    }
    console.log(textInput.value);
    if(textInput.value !== '') {
        //getSpeak text
        const speakText = new SpeechSynthesisUtterance(textInput.value)
        //Speak end
        speakText.onend = e => {
            console.log("done speaking")
            body.style.background = "#141414"; 
        }
        //speakError
        speakText.onerror = e => {
            console.log("Something went wrong")
        }
        //Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name")
        //Loop through voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        //Set pitch and rate
        speakText.rate = rate.value
        speakText.pitch = pitch.value

        //Speak
        synth.speak(speakText)
        console.log("speaking")

        //run animation
        body.style.background = ' #141414 URL(img/wave.gif)'
        body.style.backgroundRepeat = 'repeat-x'
        body.style.backgroundSize = '100% 100%'
    }
}

//Event-Listeners=>

//Text form submit

textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak()
    textInput.blur();

});

//Rate value Changed= 
rate.addEventListener("change", e => rateValue.textContent = rate.value);
pitch.addEventListener("change", e  => pitchValue.textContent = pitch.value);
 
//voice select chamge
voiceSelect.addEventListener("change", e=> speak())