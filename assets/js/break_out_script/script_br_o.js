
        document.addEventListener('DOMContentLoaded', function() {
            // Game canvas setup
            const canvas = document.getElementById('gameCanvas');
            const ctx = canvas.getContext('2d');
            const startBtn = document.getElementById('startBtn');
            const pauseBtn = document.getElementById('pauseBtn');
            const resetBtn = document.getElementById('resetBtn');
            const scoreElement = document.getElementById('score');
            const livesElement = document.getElementById('lives');
            
            // Game state variables
            let gameRunning = false;
            let gamePaused = false;
            let score = 0;
            let lives = 3;
            let animationId;
            
            // Ball properties
            const ballRadius = 8;
            let x = canvas.width / 2;
            let y = canvas.height - 30;
            let dx = 4;
            let dy = -4;
            
            // Paddle properties
            const paddleHeight = 10;
            const paddleWidth = 80;
            let paddleX = (canvas.width - paddleWidth) / 2;
            const paddleSpeed = 8;
            
            // Brick properties
            const brickRowCount = 5;
            const brickColumnCount = 8;
            const brickWidth = 50;
            const brickHeight = 20;
            const brickPadding = 10;
            const brickOffsetTop = 40;
            const brickOffsetLeft = 25;
            
            // Keyboard controls
            let rightPressed = false;
            let leftPressed = false;
            
            // Brick setup
            const bricks = [];
            for (let c = 0; c < brickColumnCount; c++) {
                bricks[c] = [];
                for (let r = 0; r < brickRowCount; r++) {
                    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                    // Different colors for each row
                    let color;
                    switch(r) {
                        case 0: color = "#FF4136"; break; // Red
                        case 1: color = "#FF851B"; break; // Orange
                        case 2: color = "#FFDC00"; break; // Yellow
                        case 3: color = "#2ECC40"; break; // Green
                        case 4: color = "#0074D9"; break; // Blue
                    }
                    bricks[c][r] = { x: brickX, y: brickY, status: 1, color: color };
                }
            }
            
            // Event listeners
            document.addEventListener("keydown", keyDownHandler, false);
            document.addEventListener("keyup", keyUpHandler, false);
            document.addEventListener("mousemove", mouseMoveHandler, false);
            document.addEventListener("touchmove", touchMoveHandler, false);
            startBtn.addEventListener("click", startGame);
            pauseBtn.addEventListener("click", togglePause);
            resetBtn.addEventListener("click", resetGame);
            
            // Draw the opening screen
            drawOpeningScreen();
            
            // Keyboard event handlers
            function keyDownHandler(e) {
                if (e.key === "Right" || e.key === "ArrowRight") {
                    rightPressed = true;
                } else if (e.key === "Left" || e.key === "ArrowLeft") {
                    leftPressed = true;
                }
            }
            
            function keyUpHandler(e) {
                if (e.key === "Right" || e.key === "ArrowRight") {
                    rightPressed = false;
                } else if (e.key === "Left" || e.key === "ArrowLeft") {
                    leftPressed = false;
                }
            }
            
            // Mouse movement handler
            function mouseMoveHandler(e) {
                if (!gameRunning || gamePaused) return;
                
                const relativeX = e.clientX - canvas.offsetLeft;
                if (relativeX > 0 && relativeX < canvas.width) {
                    paddleX = relativeX - paddleWidth / 2;
                    
                    // Keep paddle within canvas bounds
                    if (paddleX < 0) {
                        paddleX = 0;
                    } else if (paddleX + paddleWidth > canvas.width) {
                        paddleX = canvas.width - paddleWidth;
                    }
                }
            }
            
            // Touch movement handler
            function touchMoveHandler(e) {
                if (!gameRunning || gamePaused) return;
                e.preventDefault();
                
                const relativeX = e.touches[0].clientX - canvas.offsetLeft;
                if (relativeX > 0 && relativeX < canvas.width) {
                    paddleX = relativeX - paddleWidth / 2;
                    
                    // Keep paddle within canvas bounds
                    if (paddleX < 0) {
                        paddleX = 0;
                    } else if (paddleX + paddleWidth > canvas.width) {
                        paddleX = canvas.width - paddleWidth;
                    }
                }
            }
            
            // Collision detection
            function collisionDetection() {
                for (let c = 0; c < brickColumnCount; c++) {
                    for (let r = 0; r < brickRowCount; r++) {
                        const brick = bricks[c][r];
                        if (brick.status === 1) {
                            if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                                dy = -dy;
                                brick.status = 0;
                                score += 10;
                                scoreElement.textContent = score;
                                
                                // Check if player cleared all bricks
                                if (score === brickRowCount * brickColumnCount * 10) {
                                    showVictoryMessage();
                                    gameRunning = false;
                                }
                            }
                        }
                    }
                }
            }
            
            // Draw functions
            function drawBall() {
                ctx.beginPath();
                ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
                ctx.fillStyle = "#FFF";
                ctx.fill();
                ctx.closePath();
            }
            
            function drawPaddle() {
                ctx.beginPath();
                ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
            
            function drawBricks() {
                for (let c = 0; c < brickColumnCount; c++) {
                    for (let r = 0; r < brickRowCount; r++) {
                        if (bricks[c][r].status === 1) {
                            ctx.beginPath();
                            ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
                            ctx.fillStyle = bricks[c][r].color;
                            ctx.fill();
                            ctx.strokeStyle = "#000";
                            ctx.strokeRect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
                            ctx.closePath();
                        }
                    }
                }
            }
            
            function drawOpeningScreen() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = "20px Arial";
                ctx.fillStyle = "#FFF";
                ctx.textAlign = "center";
                ctx.fillText("Classic Breakout", canvas.width / 2, canvas.height / 2 - 30);
                ctx.font = "16px Arial";
                ctx.fillText("Click 'Start Game' to play", canvas.width / 2, canvas.height / 2);
            }
            
            function showGameOverMessage() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = "25px Arial";
                ctx.fillStyle = "#FF0000";
                ctx.textAlign = "center";
                ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 30);
                ctx.font = "18px Arial";
                ctx.fillStyle = "#FFF";
                ctx.fillText("Final Score: " + score, canvas.width / 2, canvas.height / 2);
                ctx.fillText("Click 'Reset' to play again", canvas.width / 2, canvas.height / 2 + 30);
            }
            
            function showVictoryMessage() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = "25px Arial";
                ctx.fillStyle = "#2ECC40";
                ctx.textAlign = "center";
                ctx.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2 - 30);
                ctx.font = "18px Arial";
                ctx.fillStyle = "#FFF";
                ctx.fillText("Final Score: " + score, canvas.width / 2, canvas.height / 2);
                ctx.fillText("Click 'Reset' to play again", canvas.width / 2, canvas.height / 2 + 30);
            }
            
            function showPauseMessage() {
                ctx.font = "20px Arial";
                ctx.fillStyle = "#FFF";
                ctx.textAlign = "center";
                ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
            }
            
            // Game loop
            function draw() {
                if (!gameRunning || gamePaused) return;
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawBricks();
                drawBall();
                drawPaddle();
                collisionDetection();
                
                // Boundary collision detection
                if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                    dx = -dx;
                }
                if (y + dy < ballRadius) {
                    dy = -dy;
                } else if (y + dy > canvas.height - ballRadius - paddleHeight) {
                    if (x > paddleX && x < paddleX + paddleWidth) {
                        // Ball hits paddle
                        dy = -dy;
                        
                        // Add some randomness based on where the ball hits the paddle
                        const hitPosition = (x - paddleX) / paddleWidth;
                        dx = dx * (0.8 + hitPosition * 0.4); // Adjust horizontal speed based on hit position
                        
                        // Ensure dx is not too slow or too fast
                        if (Math.abs(dx) < 2) dx = dx > 0 ? 2 : -2;
                        if (Math.abs(dx) > 5) dx = dx > 0 ? 5 : -5;
                    } else if (y + dy > canvas.height - ballRadius) {
                        // Ball missed the paddle
                        lives--;
                        livesElement.textContent = lives;
                        
                        if (lives <= 0) {
                            showGameOverMessage();
                            gameRunning = false;
                            return;
                        } else {
                            // Reset ball and paddle
                            x = canvas.width / 2;
                            y = canvas.height - 30;
                            dx = 4;
                            dy = -4;
                            paddleX = (canvas.width - paddleWidth) / 2;
                        }
                    }
                }
                
                // Move paddle with keyboard
                if (rightPressed && paddleX < canvas.width - paddleWidth) {
                    paddleX += paddleSpeed;
                } else if (leftPressed && paddleX > 0) {
                    paddleX -= paddleSpeed;
                }
                
                // Move ball
                x += dx;
                y += dy;
                
                animationId = requestAnimationFrame(draw);
            }
            
            // Game control functions
            function startGame() {
                if (gameRunning) return;
                
                resetGame();
                gameRunning = true;
                gamePaused = false;
                draw();
            }
            
            function togglePause() {
                if (!gameRunning) return;
                
                gamePaused = !gamePaused;
                
                if (gamePaused) {
                    cancelAnimationFrame(animationId);
                    showPauseMessage();
                } else {
                    draw();
                }
            }
            
            function resetGame() {
                cancelAnimationFrame(animationId);
                
                // Reset game state
                score = 0;
                lives = 3;
                scoreElement.textContent = score;
                livesElement.textContent = lives;
                
                // Reset ball and paddle
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 4;
                dy = -4;
                paddleX = (canvas.width - paddleWidth) / 2;
                
                // Reset bricks
                for (let c = 0; c < brickColumnCount; c++) {
                    for (let r = 0; r < brickRowCount; r++) {
                        bricks[c][r].status = 1;
                    }
                }
                
                gameRunning = false;
                gamePaused = false;
                drawOpeningScreen();
            }
        });
    