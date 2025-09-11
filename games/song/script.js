// Song lyrics data with timestamp information and audio files
const songs = [
    {
        title: "后来",
        lyrics: "栀子花**白**花瓣，落在我**蓝**色百褶裙上。爱你，你轻声说。我低下头，闻见一阵芬芳。",
        timestamps: [
            { phrase: "栀子花**白**花瓣，", time: 1.0 },
            { phrase: "落在我**蓝**色百褶裙上。", time: 6.5 },
            { phrase: "爱你，", time: 11.0 },
            { phrase: "你轻声说。", time: 15.0 },
            { phrase: "我低下头，", time: 19.0 },
            { phrase: "闻见一阵芬芳。", time: 21.0 }
        ],
        audioFile: "后来.mp3"
    },
    {
        title: "你是我的眼",
        lyrics: "眼前的**黑**不是**黑**，你说的**白**是什么**白**。人们说的天空**蓝**，是我记忆中那团**白**云，背后的**蓝**天。",
        timestamps: [
            { phrase: "眼前的**黑**不是**黑**，", time: 1.0 },
            { phrase: "你说的**白**是什么**白**。", time: 5.0 },
            { phrase: "人们说的天空**蓝**，", time: 8.0 },
            { phrase: "是我记忆中那团**白**云，", time: 12.0 },
            { phrase: "背后的**蓝**天。", time: 16.0 }
        ],
        audioFile: "你是我的眼.mp3"
    },
    {
        title: "八方来财",
        lyrics: "我们这的憋佬仔，脖上喜欢挂玉牌。香炉供台上摆，长大才开白黄牌。虔诚拜**三**拜，钱包里多**几百**。易的是**六**合彩，难的是等河牌。来财，来。",
        timestamps: [
            { phrase: "我们这的憋佬仔，", time: 2.0 },
            { phrase: "脖上喜欢挂玉牌。", time: 4.0 },
            { phrase: "香炉供台上摆，", time: 6.0 },
            { phrase: "长大才开白黄牌。", time: 8.0 },
            { phrase: "虔诚拜**三**拜，", time: 10.0 },
            { phrase: "钱包里多**几百**。", time: 12.0 },
            { phrase: "易的是**六**合彩，", time: 14.0 },
            { phrase: "难的是等河牌。", time: 16.0 },
            { phrase: "来财，来。", time: 18.0 }
        ],
        audioFile: "八方来财.mp3"
    },
    {
        title: "双截棍",
        lyrics: "**一**个马步向前，**一**记左勾拳，右勾拳。**一**句惹毛我的人有危险。**一**再重演，**一**根我不抽的烟，**一**放好多年，它**一**直在身边。怎么该，怎么该，我打开任督**二**脉。怎么该，怎么该，东亚病夫的招牌。怎么该，怎么该，已被我**一**脚踢开。",
        timestamps: [
            { phrase: "**一**个马步向前，", time: 1.0 },
            { phrase: "**一**记左勾拳，右勾拳。", time: 2.0 },
            { phrase: "**一**句惹毛我的人有危险。", time: 4.0 },
            { phrase: "**一**再重演，", time: 6.0 },
            { phrase: "**一**根我不抽的烟，", time: 7.0 },
            { phrase: "**一**放好多年，", time: 8.0 },
            { phrase: "它**一**直在身边。", time: 9.0 },
            { phrase: "怎么该，怎么该，", time: 11.0 },
            { phrase: "我打开任督**二**脉。", time: 12.0 },
            { phrase: "怎么该，怎么该，", time: 13.0 },
            { phrase: "东亚病夫的招牌。", time: 14.0 },
            { phrase: "怎么该，怎么该，", time: 15.5 },
            { phrase: "已被我**一**脚踢开。", time: 17.0 }
        ],
        audioFile: "双节棍.mp3"
    },
    {
        title: "火",
        lyrics: "**你**喷的火，是**我**的造型。**I** feeling good，无法喘气。**我**就是火，不论被谁浇息。呜，Baby。",
        timestamps: [
            { phrase: "**你**喷的火，", time: 2.0 },
            { phrase: "是**我**的造型。", time: 5.0 },
            { phrase: "**I** feeling good，", time: 7.0 },
            { phrase: "无法喘气。", time: 9.0 },
            { phrase: "**我**就是火，", time: 11.0 },
            { phrase: "不论被谁浇息。", time: 13.0 },
            { phrase: "呜~Baby。", time: 16.0 }
        ],
        audioFile: "火.mp3"
    },
    {
        title: "爱我还是他",
        lyrics: "**你**爱**我**还是**他**。是不是真的**他**有比**我**好，**你**为谁在挣扎。**你**爱**我**还是**他**。就说出**你**想说的真心话，**你**到底要跟**我**还是**他**。",
        timestamps: [
            { phrase: "**你**爱**我**还是**他**。", time: 9.0 },
            { phrase: "是不是真的**他**有比**我**好，", time: 16.0 },
            { phrase: "**你**为谁在挣扎。", time: 21.0 },
            { phrase: "**你**爱**我**还是**他**。", time: 24.0 },
            { phrase: "就说出**你**想说的真心话，", time: 30.0 },
            { phrase: "**你**到底要跟**我**还是**他**。", time: 35.0 }
        ],
        audioFile: "爱我还是他.mp3"
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let wordIndex = 0;
let allWords = [];
let audioPlayer = null;
let scheduledTimeouts = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    audioPlayer = document.getElementById('audio-player');

    // Add event listeners for audio synchronization
    if (audioPlayer) {
        audioPlayer.addEventListener('play', function () {
            if (!isPlaying) {
                isPlaying = true;
                const playBtn = document.getElementById('play-btn');
                playBtn.textContent = '暂停';
                playBtn.classList.add('playing');
            }
        });

        audioPlayer.addEventListener('pause', function () {
            if (isPlaying) {
                pauseLyrics();
            }
        });

        audioPlayer.addEventListener('ended', function () {
            resetPlayState();
        });
    }

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

    // Update audio source
    if (audioPlayer) {
        const audioSource = document.getElementById('audio-source');
        audioSource.src = song.audioFile;
        audioPlayer.load();
    }

    // Clear previous lyrics
    lyricsContainer.innerHTML = '';

    // Process and display lyrics using timestamps
    allWords = [];

    // Create phrase elements from timestamps
    song.timestamps.forEach((timestampData, index) => {
        const phraseElement = document.createElement('span');
        phraseElement.className = 'word';
        phraseElement.setAttribute('data-timestamp', timestampData.time);

        // Check if phrase should be highlighted (marked with **word**)
        if (timestampData.phrase.includes('**')) {
            const processedPhrase = timestampData.phrase.replace(/\*\*(.*?)\*\*/g, '<span class="highlighted-word">$1</span>');
            phraseElement.innerHTML = processedPhrase;
        } else {
            phraseElement.textContent = timestampData.phrase;
        }

        lyricsContainer.appendChild(phraseElement);
        allWords.push(phraseElement);
    });

    // Reset play state
    resetPlayState();
    updateNavigationButtons();
}

// Reset play state
function resetPlayState() {
    isPlaying = false;
    wordIndex = 0;

    // Clear all scheduled timeouts
    scheduledTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    scheduledTimeouts = [];

    // Pause audio if playing
    if (audioPlayer && !audioPlayer.paused) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }

    // Hide all phrases
    allWords.forEach(phrase => {
        phrase.classList.remove('visible');
        const highlightedWords = phrase.querySelectorAll('.highlighted-word');
        highlightedWords.forEach(highlightedWord => {
            highlightedWord.classList.remove('pop-up', 'continuous-glow');
        });
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

// Play lyrics word by word using timestamps
function playLyrics() {
    if (wordIndex >= allWords.length) {
        resetPlayState();
        return;
    }

    isPlaying = true;
    const playBtn = document.getElementById('play-btn');
    playBtn.textContent = '暂停';
    playBtn.classList.add('playing');

    // Start audio playback
    if (audioPlayer) {
        audioPlayer.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
    }

    // Get current song's timestamps
    const currentSong = songs[currentSongIndex];
    const timestamps = currentSong.timestamps;

    // Clear any existing scheduled timeouts
    scheduledTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    scheduledTimeouts = [];

    // Schedule each phrase to appear at its specific timestamp
    timestamps.forEach((timestampData, index) => {
        const delay = timestampData.time * 1000; // Convert seconds to milliseconds

        const timeoutId = setTimeout(() => {
            if (isPlaying && index < allWords.length) {
                const currentPhrase = allWords[index];
                currentPhrase.classList.add('visible');

                // Check if this phrase contains highlighted words
                const highlightedWords = currentPhrase.querySelectorAll('.highlighted-word');
                highlightedWords.forEach(highlightedWord => {
                    // Add pop-up animation
                    highlightedWord.classList.add('pop-up');

                    // After pop-up animation, add continuous glow
                    setTimeout(() => {
                        highlightedWord.classList.remove('pop-up');
                        highlightedWord.classList.add('continuous-glow');
                    }, 800);
                });
            }
        }, delay);

        scheduledTimeouts.push(timeoutId);
    });

    // Set a timeout to finish playing when the last word should appear
    const lastTimestamp = timestamps[timestamps.length - 1];
    const finishTime = (lastTimestamp.time + 2) * 1000; // Add 2 seconds buffer

    const finishTimeoutId = setTimeout(() => {
        if (isPlaying) {
            pauseLyrics();
        }
    }, finishTime);

    scheduledTimeouts.push(finishTimeoutId);
}

// Pause lyrics
function pauseLyrics() {
    isPlaying = false;

    // Clear all scheduled timeouts
    scheduledTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    scheduledTimeouts = [];

    // Pause audio
    if (audioPlayer && !audioPlayer.paused) {
        audioPlayer.pause();
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
        resetPlayState(); // Stop current playback
        currentSongIndex--;
        updateSongCounter();
        displaySong();
    }
}

// Navigate to next song
function nextSong() {
    if (currentSongIndex < songs.length - 1) {
        resetPlayState(); // Stop current playback
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