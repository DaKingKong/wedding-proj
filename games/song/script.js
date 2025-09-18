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
let bpm = 78; // Default BPM
let bounceInterval = null;
let swingInterval = null;
let popInterval = null;
let animationSwitchTimeout = null;
let fireGridInterval = null;

// Fire grid helpers (for 火)
function createFireGrid() {
    const gridItems = [];
    const cols = 8; // Number of columns
    const rows = 6; // Number of rows

    for (let i = 0; i < cols * rows; i++) {
        const img = document.createElement('img');
        img.src = '火/fire.png';
        img.className = 'fire-grid-item';

        const col = i % cols;
        const row = Math.floor(i / cols);

        // Position items across the screen with some margin
        const marginX = 60;
        const marginY = 80;
        const spacingX = (window.innerWidth - 2 * marginX) / (cols - 1);
        const spacingY = (window.innerHeight - 2 * marginY) / (rows - 1);

        img.style.left = marginX + col * spacingX + 'px';
        img.style.top = marginY + row * spacingY + 'px';

        document.body.appendChild(img);
        gridItems.push(img);
    }

    return gridItems;
}

function startFireGrid() {
    const currentSong = songs[currentSongIndex];
    if (!currentSong || currentSong.title !== "火") return;

    stopFireGrid();

    const fireItems = createFireGrid();
    const songBPM = getSongBPM(currentSong.title);
    const beatInterval = (60 / songBPM) * 1000;

    fireGridInterval = setInterval(() => {
        fireItems.forEach(item => {
            if (item && item.parentNode) {
                item.classList.add('fire-pop');
                setTimeout(() => {
                    item.classList.remove('fire-pop');
                }, 600);
            }
        });
    }, beatInterval);
}

function stopFireGrid() {
    if (fireGridInterval) {
        clearInterval(fireGridInterval);
        fireGridInterval = null;
    }

    const fireItems = document.querySelectorAll('.fire-grid-item');
    fireItems.forEach(item => item.remove());
}

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

    // Update corner images based on current song
    updateCornerImages(song.title);

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

    // Debug: Log the number of words created
    console.log(`Created ${allWords.length} lyric phrases for song: ${song.title}`);

    // Reset play state
    resetPlayState();
    updateNavigationButtons();
}

// Get BPM for specific song
function getSongBPM(songTitle) {
    switch (songTitle) {
        case "你是我的眼":
            return 70;
        case "后来":
            return 78;
        case "八方来财":
            return 85;
        case "双截棍":
            return 90;
        case "火":
            return 95;
        default:
            return 90;
    }
}

// Update corner images based on current song
function updateCornerImages(songTitle) {
    const cornerImages = document.querySelectorAll('.corner-image');

    if (songTitle === "你是我的眼") {
        // Use images from 你是我的眼 folder
        cornerImages[0].src = "你是我的眼/kd1.png"; // top-left
        cornerImages[1].src = "你是我的眼/cd1.png"; // top-right
        cornerImages[2].src = "你是我的眼/kd2.png"; // bottom-left
        cornerImages[3].src = "你是我的眼/cd2.png"; // bottom-right
    } else if (songTitle === "后来") {
        // Use images from 后来 folder
        cornerImages[0].src = "后来/kd1.png"; // top-left
        cornerImages[1].src = "后来/cd1.png"; // top-right
        cornerImages[2].src = "后来/kd2.png"; // bottom-left
        cornerImages[3].src = "后来/cd2.png"; // bottom-right
    } else if (songTitle === "八方来财") {
        // Use images from 八方来财 folder
        cornerImages[0].src = "八方来财/kd1.png"; // top-left
        cornerImages[1].src = "八方来财/cd1.png"; // top-right
        cornerImages[2].src = "八方来财/kd2.png"; // bottom-left
        cornerImages[3].src = "八方来财/cd2.png"; // bottom-right
    } else if (songTitle === "双截棍") {
        // Use images from 双节棍 folder
        cornerImages[0].src = "双节棍/kd1.png"; // top-left
        cornerImages[1].src = "双节棍/cd1.png"; // top-right
        cornerImages[2].src = "双节棍/kd2.png"; // bottom-left
        cornerImages[3].src = "双节棍/cd2.png"; // bottom-right
    } else if (songTitle === "火") {
        // Use images from 火 folder
        cornerImages[0].src = "火/kd1.png"; // top-left
        cornerImages[1].src = "火/cd1.png"; // top-right
        cornerImages[2].src = "火/kd2.png"; // bottom-left
        cornerImages[3].src = "火/cd2.png"; // bottom-right
    } else if (songTitle === "爱我还是他") {
        // Use the same DT image for all four corners
        cornerImages[0].src = "爱我还是他/DT.PNG"; // top-left
        cornerImages[1].src = "爱我还是他/DT.PNG"; // top-right
        cornerImages[2].src = "爱我还是他/DT.PNG"; // bottom-left
        cornerImages[3].src = "爱我还是他/DT.PNG"; // bottom-right
    } else {
        // Hide images for other songs
        cornerImages.forEach(img => {
            img.style.display = 'none';
        });
        return;
    }

    // Show images for songs that should have them
    cornerImages.forEach(img => {
        img.style.display = 'block';
    });

    // Toggle slow spin only for 爱我还是他
    cornerImages.forEach(img => {
        if (songTitle === "爱我还是他") {
            img.classList.add('spin-slow');
        } else {
            img.classList.remove('spin-slow');
        }
    });
}

// Check if corner images should be shown for a specific song
function shouldShowCornerImages(songTitle) {
    // Show corner images for specific songs
    return songTitle === "后来" || songTitle === "你是我的眼" || songTitle === "八方来财" || songTitle === "双截棍" || songTitle === "爱我还是他" || songTitle === "火";
}

// Start swinging animation for corner images (for 你是我的眼)
function startSwinging() {
    console.log("startSwinging called");
    stopSwinging(); // Clear any existing interval

    const currentSong = songs[currentSongIndex];
    if (currentSong.title !== "你是我的眼") {
        console.log("Not 你是我的眼, skipping swing animation");
        return;
    }

    // Get song-specific BPM
    const songBPM = getSongBPM(currentSong.title);
    const beatInterval = (60 / songBPM) * 1000;

    // Add continuous swing class to all corner images
    const cornerImages = document.querySelectorAll('.corner-image');
    cornerImages.forEach(img => {
        img.classList.add('swing');
    });
}

// Start popping animation for corner images (for 八方来财)
function startPopping() {
    console.log("startPopping called");
    stopPopping(); // Clear any existing interval

    const currentSong = songs[currentSongIndex];
    if (currentSong.title !== "八方来财" && currentSong.title !== "双截棍") {
        console.log("Not 八方来财 or 双截棍, skipping pop animation");
        return;
    }

    // Start animation: add initial delay only for 八方来财
    const initialDelayMs = currentSong.title === "八方来财" ? 1500 : 0;
    setTimeout(() => {
        // Get song-specific BPM
        const songBPM = getSongBPM(currentSong.title);
        const beatInterval = (60 / songBPM) * 1000;

        popInterval = setInterval(() => {
            const cornerImages = document.querySelectorAll('.corner-image');
            cornerImages.forEach(img => {
                if (currentSong.title === "双截棍") {
                    img.classList.add('pop-alt');
                } else {
                    img.classList.add('pop');
                }
                // Remove pop class after animation completes
                setTimeout(() => {
                    img.classList.remove('pop', 'pop-alt');
                }, 600); // Match the CSS animation duration
            });
        }, beatInterval);

        // Timed switch: for 双截棍, switch to continuous shake after threshold
        if (currentSong.title === "双截棍") {
            const switchMs = getAnimationSwitchMs(currentSong.title);
            if (switchMs > 0) {
                if (animationSwitchTimeout) clearTimeout(animationSwitchTimeout);
                animationSwitchTimeout = setTimeout(() => {
                    // stop beat-driven pop
                    stopPopping();
                    // apply screen-wide rolling animation
                    const imgs = document.querySelectorAll('.corner-image');
                    imgs.forEach(img => img.classList.add('roll-screen'));
                }, switchMs);
            }
        }
    }, initialDelayMs);
}

// Start bouncing animation for corner images (for 后来)
function startBouncing() {
    stopBouncing(); // Clear any existing interval

    const currentSong = songs[currentSongIndex];
    if (currentSong.title !== "后来") {
        return;
    }

    // Get song-specific BPM
    const songBPM = getSongBPM(currentSong.title);
    const beatInterval = (60 / songBPM) * 1000;

    bounceInterval = setInterval(() => {
        const cornerImages = document.querySelectorAll('.corner-image');
        cornerImages.forEach(img => {
            img.classList.add('bounce');
            // Remove bounce class after animation completes
            setTimeout(() => {
                img.classList.remove('bounce');
            }, 600); // Match the CSS animation duration
        });
    }, beatInterval);
}

// Stop swinging animation
function stopSwinging() {
    if (swingInterval) {
        clearInterval(swingInterval);
        swingInterval = null;
    }

    // Remove swing class from all corner images
    const cornerImages = document.querySelectorAll('.corner-image');
    cornerImages.forEach(img => {
        img.classList.remove('swing');
    });
}

// Stop popping animation
function stopPopping() {
    if (popInterval) {
        clearInterval(popInterval);
        popInterval = null;
    }
    if (animationSwitchTimeout) {
        clearTimeout(animationSwitchTimeout);
        animationSwitchTimeout = null;
    }

    // Remove pop/alt/rolling classes from all corner images
    const cornerImages = document.querySelectorAll('.corner-image');
    cornerImages.forEach(img => {
        img.classList.remove('pop', 'pop-alt', 'shake-strong', 'roll-around', 'roll-screen');
    });
}

// Configure when to switch animations (ms)
function getAnimationSwitchMs(songTitle) {
    switch (songTitle) {
        case "双截棍":
            return 11000; // 11 seconds
        default:
            return 0;
    }
}

// Stop bouncing animation
function stopBouncing() {
    if (bounceInterval) {
        clearInterval(bounceInterval);
        bounceInterval = null;
    }

    // Remove bounce class from all corner images
    const cornerImages = document.querySelectorAll('.corner-image');
    cornerImages.forEach(img => {
        img.classList.remove('bounce');
    });
}

// Reset play state
function resetPlayState() {
    isPlaying = false;
    wordIndex = 0;

    // Clear all scheduled timeouts
    scheduledTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    scheduledTimeouts = [];

    // Stop all animations
    stopBouncing();
    stopSwinging();
    stopPopping();
    stopFireGrid();

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

    // Debug: Log current song and word count
    console.log(`Playing song: ${currentSong.title}, ${allWords.length} words available`);

    // Start appropriate animation for corner images based on song
    if (currentSong.title === "你是我的眼") {
        console.log("Starting swing animation");
        startSwinging();
    } else if (currentSong.title === "后来") {
        console.log("Starting bounce animation");
        startBouncing();
    } else if (currentSong.title === "八方来财" || currentSong.title === "双截棍") {
        console.log("Starting pop animation");
        startPopping();
    } else if (currentSong.title === "火") {
        console.log("Starting fire grid");
        startFireGrid();
    }

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

    // Remove the calculated timeout - let the audio 'ended' event handle stopping
    // The audio 'ended' event listener will automatically call resetPlayState()
}

// Pause lyrics
function pauseLyrics() {
    isPlaying = false;

    // Clear all scheduled timeouts
    scheduledTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    scheduledTimeouts = [];

    // Stop all animations
    stopBouncing();
    stopSwinging();
    stopPopping();
    stopFireGrid();

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