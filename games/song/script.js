// Song lyrics data with tempo information
const songs = [
    {
        title: "栀子花开",
        lyrics: "栀子花**白**花瓣，落在我**蓝**色百褶裙上。爱你，你轻声说。我低下头，闻见一阵芬芳。",
        tempo: 30 // Moderate tempo, gentle ballad
    },
    {
        title: "你是我的眼",
        lyrics: "眼前的**黑**不是**黑**，你说的**白**是什么**白**。人们说的天空**蓝**，是我记忆中那团**白**云，背后的**蓝**天。",
        tempo: 100 // Slow, emotional ballad
    },
    {
        title: "朋友",
        lyrics: "朋友**一**生**一**起走，那些日子不再有，**一**句话**一**辈子，**一**生情**一**杯酒",
        tempo: 110 // Moderate tempo, nostalgic
    },
    {
        title: "双截棍",
        lyrics: "**一**个马步向前，**一**记左勾拳，右勾拳。**一**句惹毛我的人有危险。**一**再重演，**一**根我不抽的烟，**一**放好多年，它**一**直在身边。怎么该，怎么该，我打开任督**二**脉。怎么该，怎么该，东亚病夫的招牌。怎么该，怎么该，已被我**一**脚踢开。",
        tempo: 140 // Fast tempo, rap style
    },
    {
        title: "火",
        lyrics: "**你**喷的火，是**我**的造型。**I** feeling good，无法喘气。**我**就是火，不论被谁浇息。呜，Baby。",
        tempo: 130 // Upbeat tempo, energetic
    },
    {
        title: "你爱我吗",
        lyrics: "**你**爱**我**还是**他**。是不是真的**他**有比**我**好，**你**为谁在挣扎。**你**爱**我**还是**他**。就说出**你**想说的真心话，**你**到底要跟**我**还是**他**。",
        tempo: 115 // Moderate tempo, questioning tone
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let wordIndex = 0;
let allWords = [];
let playInterval = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    updateSongCounter();
    displaySong();
});

// Display current song
function displaySong() {
    const song = songs[currentSongIndex];
    const songTitle = document.getElementById('song-title');
    const lyricsContainer = document.getElementById('lyrics-container');

    // Update song title
    songTitle.textContent = song.title;

    // Clear previous lyrics
    lyricsContainer.innerHTML = '';

    // Process and display lyrics
    const lyrics = song.lyrics;
    const lines = lyrics.split('。').filter(line => line.trim() !== '');

    allWords = [];

    lines.forEach(line => {
        const lineElement = document.createElement('div');
        lineElement.className = 'lyrics-line';

        // Split line into words and punctuation
        const words = line.split(/([，。！？；：])/).filter(part => part.trim() !== '');

        words.forEach(word => {
            const wordElement = document.createElement('span');
            wordElement.className = 'word';

            // Check if word should be highlighted (marked with **word**)
            if (word.includes('**')) {
                const processedWord = word.replace(/\*\*(.*?)\*\*/g, '<span class="highlighted-word">$1</span>');
                wordElement.innerHTML = processedWord;
            } else {
                wordElement.textContent = word;
            }

            lineElement.appendChild(wordElement);
            allWords.push(wordElement);
        });

        lyricsContainer.appendChild(lineElement);
    });

    // Reset play state
    resetPlayState();
    updateNavigationButtons();
}

// Reset play state
function resetPlayState() {
    isPlaying = false;
    wordIndex = 0;

    if (playInterval) {
        clearInterval(playInterval);
        playInterval = null;
    }

    // Hide all words
    allWords.forEach(word => {
        word.classList.remove('visible');
        const highlightedWord = word.querySelector('.highlighted-word');
        if (highlightedWord) {
            highlightedWord.classList.remove('pop-up', 'continuous-glow');
        }
    });

    // Update play button
    const playBtn = document.getElementById('play-btn');
    playBtn.textContent = '播放';
    playBtn.classList.remove('playing');
}

// Toggle play/pause
function togglePlay() {
    if (isPlaying) {
        pauseLyrics();
    } else {
        playLyrics();
    }
}

// Play lyrics word by word
function playLyrics() {
    if (wordIndex >= allWords.length) {
        resetPlayState();
        return;
    }

    isPlaying = true;
    const playBtn = document.getElementById('play-btn');
    playBtn.textContent = '暂停';
    playBtn.classList.add('playing');

    // Get current song's timing
    const currentSong = songs[currentSongIndex];
    const tempo = currentSong.tempo;

    // Convert tempo (BPM) to word delay (milliseconds)
    // Formula: 60000ms / (tempo * words_per_beat)
    // Assuming roughly 2 words per beat for Chinese lyrics
    const wordsPerBeat = 2;
    const wordDelay = Math.round(60000 / (tempo * wordsPerBeat));

    playInterval = setInterval(() => {
        if (wordIndex < allWords.length) {
            const currentWord = allWords[wordIndex];
            currentWord.classList.add('visible');

            // Check if this word contains a highlighted word
            const highlightedWord = currentWord.querySelector('.highlighted-word');
            if (highlightedWord) {
                // Add pop-up animation
                highlightedWord.classList.add('pop-up');

                // After pop-up animation, add continuous glow
                setTimeout(() => {
                    highlightedWord.classList.remove('pop-up');
                    highlightedWord.classList.add('continuous-glow');
                }, 800);
            }

            wordIndex++;
        } else {
            // Finished playing
            pauseLyrics();
        }
    }, wordDelay); // Use tempo-based timing
}

// Pause lyrics
function pauseLyrics() {
    isPlaying = false;

    if (playInterval) {
        clearInterval(playInterval);
        playInterval = null;
    }

    const playBtn = document.getElementById('play-btn');
    playBtn.textContent = '播放';
    playBtn.classList.remove('playing');
}

// Reset lyrics to beginning
function resetLyrics() {
    resetPlayState();
}

// Update song counter
function updateSongCounter() {
    document.getElementById('current-song').textContent = currentSongIndex + 1;
    document.getElementById('total-songs').textContent = songs.length;
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.disabled = currentSongIndex === 0;
    nextBtn.disabled = currentSongIndex === songs.length - 1;
}

// Navigate to previous song
function previousSong() {
    if (currentSongIndex > 0) {
        currentSongIndex--;
        updateSongCounter();
        displaySong();
    }
}

// Navigate to next song
function nextSong() {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;
        updateSongCounter();
        displaySong();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowLeft':
            previousSong();
            break;
        case 'ArrowRight':
            nextSong();
            break;
        case ' ':
            event.preventDefault();
            togglePlay();
            break;
        case 'r':
        case 'R':
            resetLyrics();
            break;
    }
});