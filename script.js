document.addEventListener('DOMContentLoaded', function () {
    let currentStoryIndex = 0;
    const stories = document.querySelectorAll('.story');
    const indicators = document.querySelectorAll('.indicator span');
    const storyWrapper = document.getElementById('storyWrapper');
    let storyInterval;

    function openStory() {
        storyWrapper.style.display = 'flex';
        currentStoryIndex = 0;
        startStory();
    }

    function startStory() {
        if (storyInterval) clearInterval(storyInterval);
        resetIndicators();
        showStory(currentStoryIndex);

        // Beri delay agar story pertama animasinya berjalan normal
        setTimeout(() => {
            storyInterval = setInterval(nextStory, 8000);
        }, 100);
    }

    

    function showStory(index) {
        resetStories();
        resetIndicators();

        stories[index].classList.add('active');
        // animationIndicator(index, 8000);
        indicators[index].classList.add('active');

        setTimeout(() => {
            indicators[index].style.transition = 'width 8s linear';
            indicators[index].style.width = '100%';
        }, 50);
    }

    function nextStory() {
        if (currentStoryIndex < stories.length - 1) {
            currentStoryIndex++;
            showStory(currentStoryIndex);
        } else {
            closeStory();
        }
    }

    function prevStory() {
        if (currentStoryIndex > 0) {
            currentStoryIndex--;
            showStory(currentStoryIndex);
        }
    }

    function closeStory() {
        storyWrapper.style.display = 'none';
        clearInterval(storyInterval);
        resetIndicators();
    }

    function resetStories() {
        stories.forEach(story => story.classList.remove('active'));
    }

    function resetIndicators() {
        indicators.forEach(indicator => {
            indicator.style.transition = 'none';
            indicator.style.width = '0';
            indicator.classList.remove('active');
        });
    }

    // Event untuk membuka story
    document.querySelector('.wrapped-box').addEventListener('click', openStory);

    // Event klik kanan/kiri untuk skip story
    storyWrapper.addEventListener('click', function (event) {
        const wrapperWidth = storyWrapper.clientWidth;
        const clickX = event.clientX;

        if (clickX < wrapperWidth / 2) {
            prevStory(); // Klik kiri = story sebelumnya
        } else {
            nextStory(); // Klik kanan = story berikutnya
        }
    });

    // Event untuk close story dengan klik di luar
    storyWrapper.addEventListener('click', function (event) {
        if (event.target === storyWrapper) closeStory();
    });
});


// function openPlayer() {
//     const playerBox = document.getElementById('playerBox');
//     playerBox.classList.add('show'); // Menambahkan kelas show untuk memulai animasi
// }

// function openPlayer2() {
//     const playerBox = document.getElementById('playerBox2');
//     playerBox.classList.add('show'); // Menambahkan kelas show untuk memulai animasi
// }

// function closePlayer() {
//     const playerBox = document.getElementById('playerBox');
//     playerBox.classList.remove('show'); // Menghapus kelas show untuk menyembunyikan elemen dengan animasi
// }
// function closePlayer2() {
//     const playerBox = document.getElementById('playerBox2');
//     playerBox.classList.remove('show'); // Menghapus kelas show untuk menyembunyikan elemen dengan animasi
// }

// let progress = document.getElementById('progress'); // Progress slider
// let song = document.getElementById('song');        // Audio element
// let ctrlIcon = document.getElementById('ctrlIcon'); // Play/Pause icon

// // Set progress bar max value based on song duration
// song.onloadeddata = function () {
//     progress.max = song.duration;
//     progress.value = song.currentTime;
// };

// // Update progress slider as the song plays
// song.ontimeupdate = function () {
//     progress.value = song.currentTime;
// };

// // Seek song when progress slider is changed
// progress.oninput = function () {
//     song.currentTime = progress.value;
// };

// progress.onchange = function(){
//     song.play();
//     song.currentTime = progress.value;
//     ctrlIcon.classList.add("bi-pause-fill");
//     ctrlIcon.classList.remove("bi-play-fill");
// }

// // Play/Pause functionality
// function playPause() {
//     if (ctrlIcon.classList.contains("bi-pause-fill")) {
//         song.pause();
//         ctrlIcon.classList.remove("bi-pause-fill");
//         ctrlIcon.classList.add("bi-play-fill");
//     } else {
//         song.play();
//         ctrlIcon.classList.add("bi-pause-fill");
//         ctrlIcon.classList.remove("bi-play-fill");
//     }
// }


let playerBox = document.getElementById('playerBox');
let playerImage = document.getElementById('playerImage');
let playerTitle = document.getElementById('playerTitle');
let playerArtist = document.getElementById('playerArtist');
let playerAudio = document.getElementById('playerAudio');
let playerSource = document.getElementById('playerSource');
let progress = document.getElementById('progress');
let ctrlIcon = document.getElementById('ctrlIcon');

// Fungsi membuka player dan memainkan lagu sesuai card
function openPlayer(card) {
    let song = card.getAttribute("data-song");
    let image = card.getAttribute("data-image");
    let title = card.getAttribute("data-title");
    let artist = card.getAttribute("data-artist");

    // Update UI Player
    playerTitle.textContent = title;
    playerArtist.textContent = artist;
    playerImage.src = image;
    playerSource.src = song;

    // Reload audio agar bisa diputar dari awal
    playerAudio.load();
    playerAudio.play();

    // Update ikon Play/Pause
    ctrlIcon.classList.add("bi-pause-fill");
    ctrlIcon.classList.remove("bi-play-fill");

    // Tampilkan player
    playerBox.classList.add("show");

    // Update progress bar
    playerAudio.onloadeddata = function () {
        progress.max = playerAudio.duration;
        progress.value = playerAudio.currentTime;
    };

    playerAudio.ontimeupdate = function () {
        progress.value = playerAudio.currentTime;
    };

    progress.oninput = function () {
        playerAudio.currentTime = progress.value;
    };
}

// Fungsi menutup player
function closePlayer() {
    playerBox.classList.remove("show");
    playerAudio.pause();
    ctrlIcon.classList.add("bi-play-fill");
    ctrlIcon.classList.remove("bi-pause-fill");
}

// Fungsi Play/Pause
function playPause() {
    if (playerAudio.paused) {
        playerAudio.play();
        ctrlIcon.classList.add("bi-pause-fill");
        ctrlIcon.classList.remove("bi-play-fill");
    } else {
        playerAudio.pause();
        ctrlIcon.classList.add("bi-play-fill");
        ctrlIcon.classList.remove("bi-pause-fill");
    }
}



document.addEventListener("DOMContentLoaded", function () {
    const starContainer = document.querySelector(".stars");

    function createStar() {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = Math.random() * window.innerWidth + "px";
        star.style.animationDuration = 2 + Math.random() * 3 + "s"; // Durasi jatuh 2-5 detik
        starContainer.appendChild(star);

        // Hapus bintang setelah selesai animasi
        setTimeout(() => {
            star.remove();
        }, 5000);
    }

    setInterval(createStar, 300); // Bintang muncul setiap 0.3 detik
});

