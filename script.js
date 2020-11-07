const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
const tellMe = (joke) => {
  VoiceRSS.speech({
    key: "f71cb1b694ee4931b0bad7d0dc9aca03",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

// Get jokes from JOKES API

const getJokes = async () => {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speach
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
