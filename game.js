const container = document.querySelector(".container");
        const movesDisplay = document.getElementById("moves");
        const timeDisplay = document.getElementById("time");
        const solutionButton = document.getElementById("solution-button");
        const resetButton = document.getElementById("reset-button");
        const solutionOverlay = document.getElementById("solution-overlay");
        const closeSolutionButton = document.getElementById("close-solution");
        const popup = document.getElementById("popup");
        const popupEmoji = document.getElementById("popup-emoji");
        const popupMessage = document.getElementById("popup-message");
        const closePopupButton = document.getElementById("close-popup");
        const claimRewardsButton = document.getElementById("claim-rewards");

        let movesCount = 0;
        let timeRemaining = 120; // Set countdown duration in seconds
        let interval;

        const baseSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let imagesArr = [...baseSequence];

        // Shuffle the puzzle with controlled moves
        const shufflePuzzle = () => {
            imagesArr = [...baseSequence];
            let emptyIndex = imagesArr.indexOf(9);

            for (let i = 0; i < 10; i++) {
                const possibleMoves = getPossibleMoves(emptyIndex);
                const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                [imagesArr[emptyIndex], imagesArr[randomMove]] = [imagesArr[randomMove], imagesArr[emptyIndex]];
                emptyIndex = randomMove;
            }
        };

        // Get valid moves for a tile
        const getPossibleMoves = (emptyIndex) => {
            const moves = [];
            if (emptyIndex > 2) moves.push(emptyIndex - 3); // Move up
            if (emptyIndex < 6) moves.push(emptyIndex + 3); // Move down
            if (emptyIndex % 3 !== 0) moves.push(emptyIndex - 1); // Move left
            if (emptyIndex % 3 !== 2) moves.push(emptyIndex + 1); // Move right
            return moves;
        };

        // Generate the 3×3 grid
        const gridGenerator = () => {
            container.innerHTML = "";
            imagesArr.forEach((image, index) => {
                const div = document.createElement("div");
                div.classList.add("tile");
                if (image === 9) {
                    div.classList.add("empty"); // Mark the empty tile
                } else {
                    div.style.backgroundImage = `url(image_part_00${image}.png)`;
                }
                div.setAttribute("data-index", index);
                div.addEventListener("click", () => moveTile(index));
                container.appendChild(div);
            });
        };

        // Handle tile movement
        const moveTile = (index) => {
            const emptyIndex = imagesArr.indexOf(9);
            const validMoves = getPossibleMoves(emptyIndex);

            if (validMoves.includes(index)) {
                [imagesArr[index], imagesArr[emptyIndex]] = [imagesArr[emptyIndex], imagesArr[index]];
                movesCount++;
                movesDisplay.textContent = `🧩 Moves: ${movesCount}`;
                gridGenerator();

                if (isPuzzleSolved()) {
                    clearInterval(interval);
                    showPopup("🎉", "Congratulations! You solved the puzzle!");
                    claimRewardsButton.style.display = "block";
                }
            }
        };

        // Check if the puzzle is solved
        const isPuzzleSolved = () => imagesArr.every((val, idx) => val === baseSequence[idx]);

        // Countdown Timer functionality
        const startCountdown = () => {
            timeDisplay.textContent = `⏳ Time: ${formatTime(timeRemaining)}`;
            interval = setInterval(() => {
                timeRemaining--;
                timeDisplay.textContent = `⏳ Time: ${formatTime(timeRemaining)}`;
                if (timeRemaining <= 0) {
                    clearInterval(interval);
                    showPopup("😢", "Time's up! You lost!");
                    claimRewardsButton.style.display = "none";
                }
            }, 1000);
        };

        // Format time in MM:SS
        const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
        };

        // Show the solution image
        solutionButton.addEventListener("click", () => {
            solutionOverlay.style.display = "flex";
        });

        // Hide the solution overlay
        closeSolutionButton.addEventListener("click", () => {
            solutionOverlay.style.display = "none";
        });

        // Reset the game
        resetButton.addEventListener("click", () => {
            clearInterval(interval);
            movesCount = 0;
            timeRemaining = 120; // Reset to 120 seconds
            movesDisplay.textContent = `🧩 Moves: ${movesCount}`;
            timeDisplay.textContent = `⏳ Time: ${formatTime(timeRemaining)}`;
            shufflePuzzle();
            gridGenerator();
            startCountdown();
        });

        // Show Popup
        const showPopup = (emoji, message) => {
            popupEmoji.textContent = emoji;
            popupMessage.textContent = message;
            popup.classList.remove("hidden");
            claimRewardsButton.style.display = "block"; // Show the claim rewards button
        };

        // Close Popup
        closePopupButton.addEventListener("click", () => {
            popup.classList.add("hidden");
        });

        // Claim Rewards Button Functionality
        claimRewardsButton.addEventListener("click", () => {
            window.location.href = "reward.html"; // Replace with the correct path to your rewards.html file
        });

        // Initialize the game
        shufflePuzzle();
        gridGenerator();
        startCountdown();
 