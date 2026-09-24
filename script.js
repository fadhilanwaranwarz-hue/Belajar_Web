/**
 * AHMAD FADHIL ANWAR — OFFICIAL PORTFOLIO SCRIPT
 * Jurusan: Rekayasa Perangkat Lunak (RPL) - SMK Telkom Lampung
 * Theme: Bioluminescent Deep-Sea Glassmorphism
 */

document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================================================
       1. PRELOADER & INITIALIZATION
       ========================================================================== */
    const preloader = document.getElementById("preloader");
    const preloaderPct = document.getElementById("preloader-percentage");
    const preloaderBar = document.getElementById("preloader-bar");
    const preloaderStatus = document.getElementById("preloader-status");

    let loadProgress = 0;
    const statusMessages = [
        { at: 15, text: "Menghubungkan ke Sistem SMK Telkom..." },
        { at: 40, text: "Menginisialisasi Modul RPL & Web Developer..." },
        { at: 70, text: "Mengaktifkan Radar Samudra & Proyek Digital..." },
        { at: 92, text: "Menyelam ke Laut Dalam..." },
        { at: 100, text: "Selamat Datang di Portofolio Ahmad Fadhil Anwar!" }
    ];

    const preloaderInterval = setInterval(() => {
        loadProgress += Math.floor(Math.random() * 8) + 4;
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(preloaderInterval);

            if (preloaderPct) preloaderPct.textContent = "100%";
            if (preloaderBar) preloaderBar.style.width = "100%";
            if (preloaderStatus) preloaderStatus.textContent = statusMessages[4].text;

            setTimeout(() => {
                if (preloader) {
                    preloader.classList.add("fade-out");
                    setTimeout(() => {
                        preloader.remove();
                    }, 800);
                }
            }, 500);
        } else {
            if (preloaderPct) preloaderPct.textContent = `${loadProgress}%`;
            if (preloaderBar) preloaderBar.style.width = `${loadProgress}%`;

            const currentStatus = statusMessages.find(s => loadProgress <= s.at);
            if (currentStatus && preloaderStatus) {
                preloaderStatus.textContent = currentStatus.text;
            }
        }
    }, 45);

    /* ==========================================================================
       2. SCROLL PROGRESS BAR, STICKY HEADER & SCROLLSPY
       ========================================================================== */
    const scrollProgressBar = document.getElementById("scroll-progress-bar");
    const mainHeader = document.getElementById("main-header");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    const backToTopBtn = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = docHeight > 0 ? (scrollY / docHeight) : 0;

        // Top scroll bar scale
        if (scrollProgressBar) {
            scrollProgressBar.style.transform = `scaleX(${scrollPercentage})`;
        }

        // Header blur state
        if (mainHeader) {
            if (scrollY > 50) {
                mainHeader.classList.add("scrolled");
            } else {
                mainHeader.classList.remove("scrolled");
            }
        }

        // Back to top button
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        }

        // Scrollspy for active nav link
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ==========================================================================
       3. MOBILE DRAWER NAVIGATION
       ========================================================================== */
    const mobileToggleBtn = document.getElementById("mobile-menu-toggle");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const closeIcon = document.getElementById("close-icon");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (mobileToggleBtn && mobileDrawer) {
        mobileToggleBtn.addEventListener("click", () => {
            const isOpen = mobileDrawer.classList.toggle("open");
            if (hamburgerIcon && closeIcon) {
                hamburgerIcon.classList.toggle("hidden", isOpen);
                closeIcon.classList.toggle("hidden", !isOpen);
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileDrawer.classList.remove("open");
                if (hamburgerIcon && closeIcon) {
                    hamburgerIcon.classList.remove("hidden");
                    closeIcon.classList.add("hidden");
                }
            });
        });
    }

    /* ==========================================================================
       4. HERO TYPEWRITER ANIMATION
       ========================================================================== */
    const typingRoleEl = document.getElementById("typing-role");
    const roles = [
        "Web Developer",
        "Siswa RPL SMK Telkom Lampung",
        "Front-End Engineer",
        "UI/UX Design Explorer",
        "Junior Full-Stack Developer"
    ];

    let currentRoleIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeRole() {
        if (!typingRoleEl) return;

        const currentRole = roles[currentRoleIdx];

        if (isDeleting) {
            typingRoleEl.textContent = currentRole.substring(0, currentCharIdx - 1);
            currentCharIdx--;
            typingSpeed = 45;
        } else {
            typingRoleEl.textContent = currentRole.substring(0, currentCharIdx + 1);
            currentCharIdx++;
            typingSpeed = 90;
        }

        if (!isDeleting && currentCharIdx === currentRole.length) {
            // Pause at full word
            typingSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && currentCharIdx === 0) {
            isDeleting = false;
            currentRoleIdx = (currentRoleIdx + 1) % roles.length;
            typingSpeed = 400;
        }

        setTimeout(typeRole, typingSpeed);
    }
    typeRole();

    /* ==========================================================================
       5. HERO 3D TILT PROFILE CARD
       ========================================================================== */
    const tiltCard = document.getElementById("hero-tilt-card");
    if (tiltCard) {
        tiltCard.addEventListener("mousemove", (e) => {
            const rect = tiltCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        tiltCard.addEventListener("mouseleave", () => {
            tiltCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    }

    /* ==========================================================================
       6. LO-FI SYNTHESIZER AUDIO STATION (Pure Web Audio API)
       ========================================================================== */
    const lofiWidget = document.querySelector(".lofi-widget");
    const lofiPlayBtn = document.getElementById("lofi-play");
    const lofiPlayIcon = document.getElementById("lofi-play-icon");
    const lofiPauseIcon = document.getElementById("lofi-pause-icon");
    const lofiPrevBtn = document.getElementById("lofi-prev");
    const lofiNextBtn = document.getElementById("lofi-next");
    const lofiTrackTitle = document.getElementById("lofi-track-title");
    const lofiTrackArtist = document.getElementById("lofi-track-artist");
    const lofiTrackBadge = document.getElementById("lofi-track-badge");
    const lofiCoverIcon = document.getElementById("lofi-cover-icon");
    const lofiTrackIndex = document.getElementById("lofi-track-index");
    const lofiProgressFill = document.getElementById("lofi-progress-fill");
    const lofiCurrentTime = document.getElementById("lofi-current-time");
    const lofiTotalTime = document.getElementById("lofi-total-time");
    const lofiStatusText = document.getElementById("lofi-status-text");

    const playlist = [
        {
            title: "DJ Anak Kampung (Breakbeat Mengkane)",
            artist: "DJ Desa x Lampung Mengkane • Jedag Jedug",
            badge: "Breakbeat Viral",
            cover: "🔥",
            duration: 120,
            bpm: 132,
            audioSrc: "./anak-kampung.mp3",
            bassNotes: [65.41, 65.41, 77.78, 87.31, 65.41, 73.42, 77.78, 98.00],
            leadNotes: [523.25, 622.25, 698.46, 783.99, 698.46, 622.25, 523.25, 466.16]
        },
        {
            title: "Gemilang (Perunggu)",
            artist: "Perunggu • ",
            badge: "Party 135BPM",
            cover: "⚡",
            duration: 115,
            bpm: 135,
            audioSrc: "./Gemilang-.mp3",
            bassNotes: [73.42, 73.42, 87.31, 98.00, 73.42, 82.41, 87.31, 110.00],
            leadNotes: [587.33, 698.46, 783.99, 880.00, 783.99, 698.46, 587.33, 523.25]
        },
        {
            title: "Ini Abadi(perunggu)",
            artist: "Ini abadi",
            badge: "Slow Bass",
            cover: "🎧",
            duration: 105,
            bpm: 128,
            audioSrc: "./ini-abadi.mp3",
            bassNotes: [58.27, 58.27, 69.30, 77.78, 58.27, 65.41, 69.30, 87.31],
            leadNotes: [466.16, 554.37, 622.25, 698.46, 622.25, 554.37, 466.16, 415.30]
        },
        {
            title: "Dangdut (SMK Telkom)",
            artist: "idol-idol• RPL Mengkane Session",
            badge: "Telkom RPL",
            cover: "💻",
            duration: 95,
            bpm: 130,
            audioSrc: "./idol-idol..mp3",
            bassNotes: [65.41, 77.78, 87.31, 98.00, 77.78, 65.41, 58.27, 65.41],
            leadNotes: [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 523.25, 587.33]
        }
    ];

    let currentTrackIdx = 0;
    let isLofiPlaying = false;
    let audioCtx = null;
    let stepTimer = null;
    let elapsedSeconds = 0;
    let progressTimer = null;
    let currentStep = 0;
    let audioElement = null;
    let usingRealAudio = false;

    function initAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }
    }

    // Breakbeat Sound Synthesis Engine
    function playKick(time) {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(155, time);
        osc.frequency.exponentialRampToValueAtTime(42, time + 0.12);

        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(time);
        osc.stop(time + 0.25);
    }

    function playSnare(time) {
        if (!audioCtx) return;
        // Noise layer
        const bufferSize = audioCtx.sampleRate * 0.15;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
        }

        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;

        const filter = audioCtx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1800, time);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.25, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start(time);
        noise.stop(time + 0.2);

        // Body tone
        const osc = audioCtx.createOscillator();
        const oscGain = audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(190, time);
        oscGain.gain.setValueAtTime(0.2, time);
        oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        osc.connect(oscGain);
        oscGain.connect(audioCtx.destination);
        osc.start(time);
        osc.stop(time + 0.12);
    }

    function playHiHat(time, isOpen) {
        if (!audioCtx) return;
        const dur = isOpen ? 0.2 : 0.05;
        const bufferSize = audioCtx.sampleRate * dur;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1);
        }

        const source = audioCtx.createBufferSource();
        source.buffer = buffer;

        const filter = audioCtx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.setValueAtTime(7500, time);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(isOpen ? 0.18 : 0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        source.start(time);
        source.stop(time + dur);
    }

    function playBreakbeatBass(freq, time) {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const filter = audioCtx.createBiquadFilter();
        const gain = audioCtx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, time);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1100, time);
        filter.frequency.exponentialRampToValueAtTime(180, time + 0.2);

        gain.gain.setValueAtTime(0.28, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(time);
        osc.stop(time + 0.25);
    }

    function playPluckHook(freq, time) {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const filter = audioCtx.createBiquadFilter();
        const gain = audioCtx.createGain();

        osc.type = "square";
        osc.frequency.setValueAtTime(freq, time);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(2200, time);
        filter.Q.setValueAtTime(2, time);

        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(time);
        osc.stop(time + 0.2);
    }

    function startBreakbeatLoop() {
        initAudioContext();
        const track = playlist[currentTrackIdx];

        // Try HTML5 Audio if audio file is provided (e.g. lagu.mp3)
        if (!audioElement) {
            audioElement = new Audio();
            audioElement.addEventListener("ended", () => nextTrack());
            audioElement.addEventListener("timeupdate", () => {
                if (usingRealAudio && audioElement.duration) {
                    elapsedSeconds = Math.floor(audioElement.currentTime);
                    updateLoFiUI();
                }
            });
        }

        audioElement.src = track.audioSrc;
        audioElement.currentTime = 0;
        const playPromise = audioElement.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    usingRealAudio = true;
                })
                .catch(() => {
                    // If local audio file not found, fall back to pure Web Audio Breakbeat Synth!
                    usingRealAudio = false;
                    startSynthSequencer(track);
                });
        } else {
            usingRealAudio = false;
            startSynthSequencer(track);
        }

        // Timer counter
        progressTimer = setInterval(() => {
            if (!usingRealAudio) {
                elapsedSeconds++;
                if (elapsedSeconds >= track.duration) {
                    nextTrack();
                    return;
                }
                updateLoFiUI();
            }
        }, 1000);
    }

    function startSynthSequencer(track) {
        currentStep = 0;
        const stepDuration = 60 / (track.bpm * 4); // 16th note step in seconds

        function step() {
            if (!isLofiPlaying || usingRealAudio) return;
            const now = audioCtx.currentTime;
            const beat = currentStep % 16;
            const bar = Math.floor(currentStep / 16);

            // Bass note & melody note from arrays
            const bassNote = track.bassNotes[bar % track.bassNotes.length];
            const leadNote = track.leadNotes[currentStep % track.leadNotes.length];

            // Breakbeat Kick pattern: 0, 5, 7, 8, 10, 14 (classic Indonesian syncopated bounce)
            if (beat === 0 || beat === 5 || beat === 7 || beat === 8 || beat === 10 || beat === 14) {
                playKick(now);
            }

            // Snare on 4 and 12
            if (beat === 4 || beat === 12) {
                playSnare(now);
            }

            // Hi-Hats
            if (beat === 15) {
                playHiHat(now, true); // Open Hat on upbeat 15
            } else if (beat % 2 === 0) {
                playHiHat(now, false);
            }

            // Bouncing Bassline
            if (beat === 0 || beat === 2 || beat === 6 || beat === 8 || beat === 11 || beat === 14) {
                playBreakbeatBass(bassNote, now);
            }

            // Melodic Pluck Hook
            if (beat === 0 || beat === 3 || beat === 6 || beat === 9 || beat === 12) {
                playPluckHook(leadNote, now);
            }

            currentStep++;
            stepTimer = setTimeout(step, stepDuration * 1000);
        }

        step();
    }

    function stopBreakbeatLoop() {
        clearTimeout(stepTimer);
        clearInterval(progressTimer);
        if (audioElement) {
            try {
                audioElement.pause();
            } catch (err) { }
        }
    }

    function updateLoFiUI() {
        const currentTrack = playlist[currentTrackIdx];
        if (lofiTrackTitle) lofiTrackTitle.textContent = currentTrack.title;
        if (lofiTrackArtist) lofiTrackArtist.textContent = currentTrack.artist;
        if (lofiTrackBadge) lofiTrackBadge.textContent = currentTrack.badge;
        if (lofiCoverIcon) lofiCoverIcon.textContent = currentTrack.cover;
        if (lofiTrackIndex) lofiTrackIndex.textContent = `${currentTrackIdx + 1} / ${playlist.length}`;

        const minutes = Math.floor(elapsedSeconds / 60);
        const seconds = elapsedSeconds % 60;
        if (lofiCurrentTime) {
            lofiCurrentTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }

        const totMin = Math.floor(currentTrack.duration / 60);
        const totSec = currentTrack.duration % 60;
        if (lofiTotalTime) {
            lofiTotalTime.textContent = `${totMin}:${totSec < 10 ? '0' : ''}${totSec}`;
        }

        const pct = (elapsedSeconds / currentTrack.duration) * 100;
        if (lofiProgressFill) {
            lofiProgressFill.style.width = `${Math.min(pct, 100)}%`;
        }
    }

    function toggleLoFi() {
        isLofiPlaying = !isLofiPlaying;

        if (isLofiPlaying) {
            startBreakbeatLoop();
            if (lofiWidget) lofiWidget.classList.add("playing");
            if (lofiPlayIcon) lofiPlayIcon.classList.add("hidden");
            if (lofiPauseIcon) lofiPauseIcon.classList.remove("hidden");
            if (lofiStatusText) lofiStatusText.textContent = "🔊 BREAKBEAT ON: Jedag Jedug Mengkane";
        } else {
            stopBreakbeatLoop();
            if (lofiWidget) lofiWidget.classList.remove("playing");
            if (lofiPlayIcon) lofiPlayIcon.classList.remove("hidden");
            if (lofiPauseIcon) lofiPauseIcon.classList.add("hidden");
            if (lofiStatusText) lofiStatusText.textContent = "⏸ Musik Dijeda";
        }
    }

    function nextTrack() {
        stopBreakbeatLoop();
        currentTrackIdx = (currentTrackIdx + 1) % playlist.length;
        elapsedSeconds = 0;
        updateLoFiUI();
        if (isLofiPlaying) {
            startBreakbeatLoop();
        }
    }

    function prevTrack() {
        stopBreakbeatLoop();
        currentTrackIdx = (currentTrackIdx - 1 + playlist.length) % playlist.length;
        elapsedSeconds = 0;
        updateLoFiUI();
        if (isLofiPlaying) {
            startBreakbeatLoop();
        }
    }

    if (lofiPlayBtn) lofiPlayBtn.addEventListener("click", toggleLoFi);
    if (lofiNextBtn) lofiNextBtn.addEventListener("click", nextTrack);
    if (lofiPrevBtn) lofiPrevBtn.addEventListener("click", prevTrack);

    // Click on progress bar to seek
    const lofiProgressWrapper = document.getElementById("lofi-progress-wrapper");
    if (lofiProgressWrapper) {
        lofiProgressWrapper.addEventListener("click", (e) => {
            const rect = lofiProgressWrapper.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const pct = clickX / rect.width;
            const currentTrack = playlist[currentTrackIdx];
            elapsedSeconds = Math.floor(pct * currentTrack.duration);
            if (usingRealAudio && audioElement) {
                audioElement.currentTime = elapsedSeconds;
            }
            updateLoFiUI();
        });
    }

    /* ==========================================================================
       7. SKILLS FILTERING
       ========================================================================== */
    const skillTabs = document.querySelectorAll(".skill-tab");
    const skillCards = document.querySelectorAll(".skill-card");

    skillTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            skillTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const filter = tab.getAttribute("data-filter");

            skillCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.classList.remove("fade-out");
                } else {
                    card.classList.add("fade-out");
                }
            });
        });
    });

    /* ==========================================================================
       8. PROJECT PREVIEW MODAL DATA & HANDLERS
       ========================================================================== */
    const projectsData = [
        {
            title: "Portal RPL & Smart School SMK Telkom Lampung",
            badge: "SISTEM INFORMASI SEKOLAH",
            desc: "Platform terpadu untuk siswa, guru, dan kaprog Rekayasa Perangkat Lunak SMK Telkom Lampung. Menyajikan galeri pameran karya aplikasi siswa, informasi jadwal praktikum lab komputer, modul materi pemrograman, dan pengumpulan tugas digital.",
            features: [
                "Galeri & Portofolio Karya Digital Siswa RPL",
                "Dashboard Jadwal & Modul Praktikum Lab Komputer",
                "Sistem Pengumpulan Tugas & Penilaian Digital",
                "100% Responsif & Desain Bioluminescent Glassmorphism"
            ],
            tags: ["HTML5", "CSS3", "JavaScript ES6", "PHP", "MySQL", "SMK Telkom"],
            themeClass: "mockup-theme-telkom",
            mockupTitle: "Portal Siswa & Galeri Karya RPL",
            mockupSub: "SMK Telkom Lampung"
        },
        {
            title: "Eksplor Bahari & Wisata Lampung",
            badge: "PORTAL WISATA & BAHARI",
            desc: "Portal panduan wisata bahari dan destinasi eksotis di Provinsi Lampung. Dilengkapi fitur kalkulator estimasi biaya liburan, rute transportasi dari Bandar Lampung, serta galeri visual atraksi lumba-lumba Teluk Kiluan, snorkeling Pahawang, dan pulau karang Gigi Hiu.",
            features: [
                "Kalkulator Estimasi Biaya Liburan Interaktif",
                "Integrasi Peta Interaktif Leaflet & Rute Menuju Lokasi",
                "Panduan Homestay & Kuliner Bahari Lokal",
                "Koleksi Foto & Info Kondisi Ombak Wisata"
            ],
            tags: ["HTML5", "Vanilla CSS", "JavaScript", "Leaflet.js", "Vercel"],
            themeClass: "mockup-theme-ocean",
            mockupTitle: "Eksplor Bahari & Wisata Lampung",
            mockupSub: "Teluk Kiluan • Pahawang • Gigi Hiu"
        },
        {
            title: "TapisCraft Lampung E-Commerce Showcase",
            badge: "E-COMMERCE & UMKM",
            desc: "Platform etalase digital interaktif yang dirancang untuk memberdayakan perajin lokal kain tapis khas Lampung. Menampilkan sistem filter produk berdasarkan motif adat, kalkulator ongkir otomatis, dan direct-order via formulir pesan WhatsApp otomatis.",
            features: [
                "Pemesanan Terintegrasi WhatsApp API Otomatis",
                "Keranjang Belanja Realtime berbasis LocalStorage",
                "Katalog Produk Berdasarkan Kategori Motif Tapis",
                "Tampilan Mobile-First yang Ringan & Cepat"
            ],
            tags: ["HTML5", "CSS Grid", "JavaScript ES6", "LocalStorage"],
            themeClass: "mockup-theme-craft",
            mockupTitle: "TapisCraft Lampung E-Commerce",
            mockupSub: "Tenun Tapis Asli & Suvenir Khas Lampung"
        },
        {
            title: "Aplikasi Jurnal & Presensi PKL Siswa RPL",
            badge: "WEB APP PENDIDIKAN",
            desc: "Sistem web pengelolaan Praktik Kerja Lapangan (PKL) bagi siswa SMK Telkom Lampung. Memfasilitasi siswa untuk mengisi catatan kerja harian, mengunggah dokumentasi aktivitas, serta tervalidasi oleh guru pembimbing secara real-time.",
            features: [
                "Form Logbook Aktivitas Harian Siswa Magang",
                "Dashboard Guru Pembimbing & Verifikasi Catatan",
                "Rekapitulasi Kehadiran & Ekspor Data Laporan Cetak",
                "Autentikasi Siswa & Guru Berbasis Hak Akses"
            ],
            tags: ["HTML5", "CSS3", "JavaScript", "PHP MySQL", "Bootstrap"],
            themeClass: "mockup-theme-system",
            mockupTitle: "Jurnal & Presensi PKL Siswa RPL",
            mockupSub: "Logbook Magang Industri Siswa Telkom"
        }
    ];

    const projectModal = document.getElementById("project-modal");
    const modalBadge = document.getElementById("modal-project-badge");
    const modalTitle = document.getElementById("modal-project-title");
    const modalDesc = document.getElementById("modal-project-desc");
    const modalFeatures = document.getElementById("modal-project-features");
    const modalTags = document.getElementById("modal-project-tags");
    const modalScreen = document.getElementById("modal-project-screen");
    const modalCloseBtn = document.getElementById("modal-close-btn");

    function openProjectModal(index) {
        const data = projectsData[index];
        if (!data || !projectModal) return;

        if (modalBadge) modalBadge.textContent = data.badge;
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalDesc) modalDesc.textContent = data.desc;

        if (modalFeatures) {
            modalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join("");
        }

        if (modalTags) {
            modalTags.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join("");
        }

        if (modalScreen) {
            modalScreen.innerHTML = `
        <div class="mockup-screen-content ${data.themeClass}">
          <div class="mockup-header-bar">
            <span class="dot-red"></span>
            <span class="dot-yellow"></span>
            <span class="dot-green"></span>
            <span class="mockup-url font-mono">${data.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.vercel.app</span>
          </div>
          <div class="mockup-hero-banner" style="margin-top: 1rem;">
            <span class="mockup-badge font-mono">${data.badge}</span>
            <h4 class="mockup-title font-display">${data.mockupTitle}</h4>
            <p class="mockup-desc font-mono">${data.mockupSub}</p>
          </div>
        </div>
      `;
        }

        projectModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    }

    function closeProjectModal() {
        if (projectModal) {
            projectModal.classList.add("hidden");
            document.body.style.overflow = "";
        }
    }

    document.querySelectorAll(".btn-preview-project, .btn-detail-project").forEach(btn => {
        btn.addEventListener("click", () => {
            const projIdx = parseInt(btn.getAttribute("data-proj") || "0", 10);
            openProjectModal(projIdx);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeProjectModal);
    }

    if (projectModal) {
        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeProjectModal();
            const aiModal = document.getElementById("ai-modal");
            if (aiModal) aiModal.classList.add("hidden");
        }
    });

    /* ==========================================================================
       9. FAQ ACCORDION
       ========================================================================== */
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const toggleBtn = item.querySelector(".faq-toggle");
        if (toggleBtn) {
            toggleBtn.addEventListener("click", () => {
                const isActive = item.classList.contains("active");

                // Close other items
                faqItems.forEach(other => {
                    other.classList.remove("active");
                    const otherBtn = other.querySelector(".faq-toggle");
                    if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
                });

                if (!isActive) {
                    item.classList.add("active");
                    toggleBtn.setAttribute("aria-expanded", "true");
                }
            });
        }
    });

    /* ==========================================================================
       10. RETRO CANVAS MINI-GAME: CYBER DIVER (Submarine Odyssey)
       ========================================================================== */
    const toggleGameBtn = document.getElementById("toggle-game-btn");
    const closeGameBtn = document.getElementById("close-game-btn");
    const gameArenaPanel = document.getElementById("game-arena-panel");
    const gameCanvas = document.getElementById("cyber-diver-canvas");
    const startGameBtn = document.getElementById("start-game-btn");
    const gameOverlay = document.getElementById("game-overlay");
    const scoreEl = document.getElementById("game-score");
    const highScoreEl = document.getElementById("game-high-score");

    let gameCtx = null;
    let gameRunning = false;
    let gameScore = 0;
    let gameHighScore = parseInt(localStorage.getItem("fadhil_cyber_diver_hs") || "0", 10);
    if (highScoreEl) highScoreEl.textContent = gameHighScore;

    let player = {
        x: 90,
        y: 180,
        width: 36,
        height: 20,
        vy: 0,
        gravity: 0.35,
        lift: -6.5
    };

    let obstacles = [];
    let pearls = [];
    let particles = [];
    let gameFrame = 0;
    let animationFrameId = null;

    if (toggleGameBtn && gameArenaPanel) {
        toggleGameBtn.addEventListener("click", () => {
            gameArenaPanel.classList.toggle("hidden");
            if (!gameArenaPanel.classList.contains("hidden")) {
                gameArenaPanel.scrollIntoView({ behavior: "smooth" });
                initGameCanvas();
            } else {
                stopGame();
            }
        });
    }

    if (closeGameBtn && gameArenaPanel) {
        closeGameBtn.addEventListener("click", () => {
            gameArenaPanel.classList.add("hidden");
            stopGame();
        });
    }

    function initGameCanvas() {
        if (!gameCanvas) return;
        gameCtx = gameCanvas.getContext("2d");
        renderInitialCanvas();
    }

    function renderInitialCanvas() {
        if (!gameCtx || !gameCanvas) return;
        gameCtx.fillStyle = "#040e1b";
        gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    }

    function jumpPlayer() {
        if (!gameRunning) return;
        player.vy = player.lift;

        // Thruster bubble particles
        for (let i = 0; i < 5; i++) {
            particles.push({
                x: player.x - 5,
                y: player.y + player.height / 2 + (Math.random() * 8 - 4),
                vx: -(Math.random() * 3 + 2),
                vy: Math.random() * 2 - 1,
                radius: Math.random() * 3 + 2,
                alpha: 1
            });
        }
    }

    function startGame() {
        if (!gameCanvas) return;
        gameCtx = gameCanvas.getContext("2d");
        gameRunning = true;
        gameScore = 0;
        if (scoreEl) scoreEl.textContent = "0";

        player.y = 180;
        player.vy = 0;
        obstacles = [];
        pearls = [];
        particles = [];
        gameFrame = 0;

        if (gameOverlay) gameOverlay.classList.add("hidden");
        loopGame();
    }

    function stopGame() {
        gameRunning = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (gameOverlay) gameOverlay.classList.remove("hidden");
    }

    function loopGame() {
        if (!gameRunning || !gameCtx || !gameCanvas) return;

        gameFrame++;
        gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        // Deep sea background
        const bgGrad = gameCtx.createLinearGradient(0, 0, 0, gameCanvas.height);
        bgGrad.addColorStop(0, "#051329");
        bgGrad.addColorStop(1, "#020710");
        gameCtx.fillStyle = bgGrad;
        gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

        // Grid lines
        gameCtx.strokeStyle = "rgba(0, 240, 255, 0.05)";
        gameCtx.lineWidth = 1;
        for (let x = 0; x < gameCanvas.width; x += 40) {
            gameCtx.beginPath();
            gameCtx.moveTo(x, 0);
            gameCtx.lineTo(x, gameCanvas.height);
            gameCtx.stroke();
        }

        // Player physics
        player.vy += player.gravity;
        player.y += player.vy;

        // Floor and Ceiling limits
        if (player.y + player.height > gameCanvas.height) {
            player.y = gameCanvas.height - player.height;
            gameOver();
            return;
        }
        if (player.y < 0) {
            player.y = 0;
            player.vy = 0;
        }

        // Draw Submarine Player
        gameCtx.save();
        gameCtx.translate(player.x, player.y);

        // Hull
        gameCtx.fillStyle = "#00f0ff";
        gameCtx.shadowColor = "#00f0ff";
        gameCtx.shadowBlur = 12;
        gameCtx.beginPath();
        gameCtx.roundRect(0, 0, player.width, player.height, 10);
        gameCtx.fill();

        // Cabin Dome
        gameCtx.fillStyle = "#051930";
        gameCtx.beginPath();
        gameCtx.arc(player.width * 0.65, player.height / 2, 6, 0, Math.PI * 2);
        gameCtx.fill();

        // Propeller
        gameCtx.fillStyle = "#00e5a3";
        gameCtx.fillRect(-5, player.height / 2 - 4, 5, 8);

        gameCtx.restore();

        // Thruster Particles
        particles.forEach((p, idx) => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.03;

            if (p.alpha <= 0) {
                particles.splice(idx, 1);
            } else {
                gameCtx.save();
                gameCtx.globalAlpha = p.alpha;
                gameCtx.fillStyle = "#00f0ff";
                gameCtx.beginPath();
                gameCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                gameCtx.fill();
                gameCtx.restore();
            }
        });

        // Spawn Obstacles (Deep-sea mines)
        if (gameFrame % 90 === 0) {
            const gap = 130;
            const topHeight = Math.floor(Math.random() * (gameCanvas.height - gap - 60)) + 30;
            obstacles.push({
                x: gameCanvas.width,
                topY: 0,
                topHeight: topHeight,
                bottomY: topHeight + gap,
                bottomHeight: gameCanvas.height - (topHeight + gap),
                width: 32,
                passed: false
            });
        }

        // Spawn Data Pearls
        if (gameFrame % 140 === 0) {
            pearls.push({
                x: gameCanvas.width,
                y: Math.floor(Math.random() * (gameCanvas.height - 80)) + 40,
                radius: 9,
                collected: false
            });
        }

        // Draw & Update Obstacles
        obstacles.forEach((obs, index) => {
            obs.x -= 3.2;

            // Obstacle columns
            gameCtx.fillStyle = "rgba(12, 32, 60, 0.9)";
            gameCtx.strokeStyle = "#00bcff";
            gameCtx.lineWidth = 1.5;

            // Top mine pillar
            gameCtx.beginPath();
            gameCtx.roundRect(obs.x, obs.topY, obs.width, obs.topHeight, [0, 0, 8, 8]);
            gameCtx.fill();
            gameCtx.stroke();

            // Bottom mine pillar
            gameCtx.beginPath();
            gameCtx.roundRect(obs.x, obs.bottomY, obs.width, obs.bottomHeight, [8, 8, 0, 0]);
            gameCtx.fill();
            gameCtx.stroke();

            // Collision check
            if (
                player.x + player.width > obs.x &&
                player.x < obs.x + obs.width &&
                (player.y < obs.topHeight || player.y + player.height > obs.bottomY)
            ) {
                gameOver();
                return;
            }

            // Score points
            if (!obs.passed && player.x > obs.x + obs.width) {
                obs.passed = true;
                gameScore += 50;
                if (scoreEl) scoreEl.textContent = gameScore;
            }

            if (obs.x + obs.width < 0) {
                obstacles.splice(index, 1);
            }
        });

        // Draw & Update Pearls
        pearls.forEach((pearl, pIdx) => {
            pearl.x -= 3;

            gameCtx.save();
            gameCtx.fillStyle = "#fde047";
            gameCtx.shadowColor = "#fde047";
            gameCtx.shadowBlur = 15;
            gameCtx.beginPath();
            gameCtx.arc(pearl.x, pearl.y, pearl.radius, 0, Math.PI * 2);
            gameCtx.fill();
            gameCtx.restore();

            // Collision with pearl
            const dist = Math.hypot(
                player.x + player.width / 2 - pearl.x,
                player.y + player.height / 2 - pearl.y
            );

            if (dist < player.width / 2 + pearl.radius) {
                gameScore += 100;
                if (scoreEl) scoreEl.textContent = gameScore;
                pearls.splice(pIdx, 1);
            } else if (pearl.x + pearl.radius < 0) {
                pearls.splice(pIdx, 1);
            }
        });

        animationFrameId = requestAnimationFrame(loopGame);
    }

    function gameOver() {
        stopGame();
        if (gameScore > gameHighScore) {
            gameHighScore = gameScore;
            localStorage.setItem("fadhil_cyber_diver_hs", gameHighScore);
            if (highScoreEl) highScoreEl.textContent = gameHighScore;
        }
    }

    if (startGameBtn) {
        startGameBtn.addEventListener("click", startGame);
    }

    // Key controls
    window.addEventListener("keydown", (e) => {
        if (e.code === "Space" || e.code === "ArrowUp") {
            if (gameArenaPanel && !gameArenaPanel.classList.contains("hidden")) {
                e.preventDefault();
                if (!gameRunning) {
                    startGame();
                } else {
                    jumpPlayer();
                }
            }
        }
    });

    if (gameCanvas) {
        gameCanvas.addEventListener("mousedown", () => {
            if (gameRunning) jumpPlayer();
        });
        gameCanvas.addEventListener("touchstart", (e) => {
            e.preventDefault();
            if (!gameRunning) {
                startGame();
            } else {
                jumpPlayer();
            }
        });
    }

    /* ==========================================================================
       11. CONTACT FORM & EMAIL COPY
       ========================================================================== */
    const copyEmailBtn = document.getElementById("copy-email-btn");
    const copyText = document.getElementById("copy-text");

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", () => {
            const email = "fadhilanwar.dev@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                if (copyText) copyText.textContent = "Tersalin! ✔";
                setTimeout(() => {
                    if (copyText) copyText.textContent = "Salin";
                }, 2000);
            });
        });
    }

    const contactForm = document.getElementById("contact-form");
    const contactToast = document.getElementById("contact-toast");
    const formSubmitBtn = document.getElementById("form-submit-btn");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("contact-name").value;
            const email = document.getElementById("contact-email").value;
            const subject = document.getElementById("contact-subject").value || "Konsultasi Portofolio";
            const message = document.getElementById("contact-message").value;

            if (formSubmitBtn) {
                formSubmitBtn.disabled = true;
                formSubmitBtn.innerHTML = `<span>Mengirim Pesan...</span>`;
            }

            setTimeout(() => {
                if (contactToast) contactToast.classList.remove("hidden");
                contactForm.reset();

                if (formSubmitBtn) {
                    formSubmitBtn.disabled = false;
                    formSubmitBtn.innerHTML = `
            <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            <span>Kirim Pesan Sekarang</span>
          `;
                }

                // WhatsApp redirect fallback option
                setTimeout(() => {
                    const waUrl = `https://wa.me/6285783665905?text=Halo%20Ahmad%20Fadhil%20Anwar,%20saya%20${encodeURIComponent(name)}%20(${encodeURIComponent(email)}).%20Subjek:%20${encodeURIComponent(subject)}.%20Pesan:%20${encodeURIComponent(message)}`;
                    window.open(waUrl, "_blank");
                }, 1200);

                setTimeout(() => {
                    if (contactToast) contactToast.classList.add("hidden");
                }, 6000);
            }, 700);
        });
    }

    /* ==========================================================================
       12. AURA AI ASSISTANT CHATBOT
       ========================================================================== */
    const aiChatToggle = document.getElementById("ai-chat-toggle");
    const aiModal = document.getElementById("ai-modal");
    const aiCloseBtn = document.getElementById("ai-close-btn");
    const aiInputForm = document.getElementById("ai-input-form");
    const aiUserInput = document.getElementById("ai-user-input");
    const aiMessagesContainer = document.getElementById("ai-messages-container");
    const aiChips = document.querySelectorAll(".ai-chip");

    if (aiChatToggle && aiModal) {
        aiChatToggle.addEventListener("click", () => {
            aiModal.classList.toggle("hidden");
            if (!aiModal.classList.contains("hidden") && aiUserInput) {
                aiUserInput.focus();
            }
        });
    }

    if (aiCloseBtn && aiModal) {
        aiCloseBtn.addEventListener("click", () => {
            aiModal.classList.add("hidden");
        });
    }

    function appendAIMessage(sender, text) {
        if (!aiMessagesContainer) return;

        const msgDiv = document.createElement("div");
        msgDiv.className = `ai-msg ${sender === 'user' ? 'ai-msg-user' : 'ai-msg-bot'}`;

        const bubble = document.createElement("div");
        bubble.className = "msg-bubble";
        bubble.innerHTML = text;

        msgDiv.appendChild(bubble);
        aiMessagesContainer.appendChild(msgDiv);
        aiMessagesContainer.scrollTop = aiMessagesContainer.scrollHeight;
    }

    function getAIResponse(query) {
        const q = query.toLowerCase();

        if (q.includes("siapa") || q.includes("profil") || q.includes("fadhil") || q.includes("anwar")) {
            return "<strong>Ahmad Fadhil Anwar</strong> adalah siswa berprestasi di jurusan <strong>Rekayasa Perangkat Lunak (RPL) SMK Telkom Lampung</strong>. Beliau berfokus pada <strong>Web Development</strong> dengan keahlian menciptakan antarmuka web modern, responsif, dan berperforma tinggi.";
        }

        if (q.includes("sekolah") || q.includes("smk") || q.includes("telkom") || q.includes("jurusan") || q.includes("rpl")) {
            return "Fadhil menempuh pendidikan di <strong>SMK Telkom Lampung</strong>, salah satu sekolah kejuruan IT terbaik di Lampung. Di jurusan <strong>Rekayasa Perangkat Lunak (RPL)</strong>, beliau mendalami algoritma, pemrograman web modern (HTML, CSS, JS, PHP, MySQL), dan standar industri perangkat lunak.";
        }

        if (q.includes("keahlian") || q.includes("skill") || q.includes("stack") || q.includes("bahasa") || q.includes("teknologi")) {
            return "Keahlian utama Fadhil meliputi:<br>• <strong>Front-End:</strong> HTML5 (95%), CSS3 & Flexbox/Grid (92%), JavaScript ES6+ (88%), Tailwind CSS (84%)<br>• <strong>Back-End:</strong> PHP (82%), MySQL (85%), RESTful API<br>• <strong>Tools & Kejuruan:</strong> Git & GitHub, Figma UI/UX Design, Bootstrap, Linux.";
        }

        if (q.includes("proyek") || q.includes("project") || q.includes("karya") || q.includes("portofolio")) {
            return "Beberapa proyek unggulan Fadhil antara lain:<br>1. <strong>Portal RPL & Smart School SMK Telkom Lampung</strong> (Akademik & Portofolio Siswa)<br>2. <strong>Eksplor Bahari & Wisata Lampung</strong> (Panduan wisata Kiluan, Pahawang, Gigi Hiu)<br>3. <strong>TapisCraft Lampung E-Commerce</strong> (Katalog UMKM kain tapis)<br>4. <strong>Jurnal & Presensi PKL Siswa RPL</strong>.<br>Anda bisa mengklik tombol 'Detail Proyek' di bagian Portofolio!";
        }

        if (q.includes("kontak") || q.includes("wa") || q.includes("whatsapp") || q.includes("email") || q.includes("hubungi")) {
            return "Anda bisa menghubungi Fadhil langsung via:<br>• <strong>WhatsApp:</strong> <a href='https://wa.me/6285783665905' target='_blank' style='color:#00f0ff; text-decoration:underline;'>0857-8366-5905</a><br>• <strong>Email:</strong> fadhilanwar.dev@gmail.com<br>Fadhil sangat terbuka untuk tawaran proyek freelance maupun PKL/Magang industri!";
        }

        if (q.includes("magang") || q.includes("pkl") || q.includes("kerja") || q.includes("freelance")) {
            return "Ya, Ahmad Fadhil Anwar <strong>siap & terbuka untuk program PKL (Praktik Kerja Lapangan)</strong> maupun proyek freelance! Beliau memiliki pemahaman kode yang rapi, etos kerja tinggi khas siswa Telkom, dan siap bekerja secara remote maupun on-site di area Lampung/Jabodetabek.";
        }

        return "Terima kasih atas pertanyaannya! Fadhil Anwar adalah siswa <strong>SMK Telkom Lampung (RPL)</strong> dan Web Developer. Ada hal spesifik tentang proyek, keahlian coding, atau kontak yang ingin Anda ketahui?";
    }

    function handleAISubmit(text) {
        if (!text.trim()) return;
        appendAIMessage("user", text);

        setTimeout(() => {
            const response = getAIResponse(text);
            appendAIMessage("bot", response);
        }, 400);
    }

    if (aiInputForm && aiUserInput) {
        aiInputForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const val = aiUserInput.value;
            aiUserInput.value = "";
            handleAISubmit(val);
        });
    }

    aiChips.forEach(chip => {
        chip.addEventListener("click", () => {
            const promptText = chip.getAttribute("data-prompt") || chip.textContent;
            handleAISubmit(promptText);
        });
    });
});
