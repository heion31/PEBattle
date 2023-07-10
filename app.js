const battle = () => {
    let remainingTrainerLives = 5;
    let remainingEnemyLives = 5;
    let overallRounds = 0;

    // BACKGROUND MUSIC
    const battleScreenMusic = () => {
        const battleMusic = document.getElementById('battleScreenMusic');

        battleMusic.volume = 0.5;
        battleMusic.play();
    };
    
    //  RESET THE GAME
    const resetGame = () => {
        const showResetBtn = document.querySelector('.resetBtn')
        const allBtns = document.querySelectorAll('.element-options button');
        const trainerLives = document.querySelector('.trainer-lives p');
        const enemyLives = document.querySelector('.enemy-lives p');
        const roundGame = document.querySelector('.game-rounds p');
        const pokemonImg = document.querySelectorAll('.pokemon-img img');
        const winMessage = document.querySelector('.win-message p');
        const descriptionMessage = document.querySelector('.description-message p');

        // reset to default lives and rounds
        remainingTrainerLives = 5
        remainingEnemyLives = 5;
        overallRounds = 0;

        trainerLives.textContent =  remainingTrainerLives;
        enemyLives.textContent = remainingEnemyLives;
        roundGame.textContent = overallRounds;

        // hide the reset button
        showResetBtn.classList.add('fadeOut');
        showResetBtn.classList.remove('fadeIn');

        // reset the messages
        winMessage.textContent = 'Choose your Skill';
        descriptionMessage.textContent = '';

        // disabled all buttons
        allBtns.forEach(allBtn => {
            allBtn.classList.remove('disabled');
            allBtn.style.backgroundColor = '';
            allBtn.style.color = '';
        });

        // reset pokemon images
        pokemonImg.forEach(img => {
            img.style.filter = 'none';
            img.src = './assets/pokeball.jpg';
        });
    }

    // INTRO SCREEN
    const battleIntro = () => {
        const startBtn = document.querySelector('.start button');
        const startScreen = document.querySelector('.start')
        const battleScreen = document.querySelector('.battle');
        const indicatorsScreen = document.querySelector('.indicators');

        // switch to Battle Screen
        startBtn.addEventListener('click', () => {
            startScreen.classList.add('fadeOut');
            battleScreen.classList.add('fadeIn');
            indicatorsScreen.classList.add('fadeIn');

            // play the bg music
            battleScreenMusic();
        });
    }

    // BATTLE SCREEN
    const battleMatch = () => {
        const elementOptions = document.querySelectorAll('.element-options button')
        const trainerPokemon = document.querySelector('.trainer-pokemon-img');
        const enemyPokemon = document.querySelector('.enemy-pokemon-img');
        const showResetBtn = document.querySelector('.resetBtn button')

        // enemy options
        const enemyOptions = ['squirtle', 'charmander', 'bulbasaur'];

        // add
        elementOptions.forEach(elementOption => {
            elementOption.addEventListener('click', function() {
                // enemy random choice
                const enemyRandomNumber = Math.floor(Math.random() * 3);
                const enemyChoice = enemyOptions[enemyRandomNumber];
                
                setTimeout(() => {
                    let convertTrainerChoice = this.textContent;
                    let trainerChoice;

                    // convert skill name to pokemon name
                    if (convertTrainerChoice === 'Water') {
                        trainerChoice = 'squirtle';
                    } else if (convertTrainerChoice === 'Fire') {
                        trainerChoice = "charmander";
                    } else {
                        trainerChoice = 'bulbasaur';
                    }
                
                    // pass the results of trainer and enemy choice
                    comparePokemons(trainerChoice, enemyChoice);

                    // Change pokemon image based on choosing
                    trainerPokemon.src = `./assets/${trainerChoice}.png`;
                    enemyPokemon.src = `./assets/${enemyChoice}.png`;
                }) 
            })
        });

        // reset the game
        showResetBtn.addEventListener('click', function()  {
            resetGame();
        });
    }

    // PLAYERS LIVES
    const updateLives = () => {
        const trainerLives = document.querySelector('.trainer-lives p');
        const enemyLives = document.querySelector('.enemy-lives p');

        trainerLives.textContent = remainingTrainerLives;
        enemyLives.textContent = remainingEnemyLives;
    }

    // GAME ROUNDS
    const updateRounds = () => {
        const gameRounds = document.querySelector('.game-rounds p');
        const allBtns = document.querySelectorAll('.element-options button');
        const showResetBtn = document.querySelector('.resetBtn')
        const pokemonImg = document.querySelectorAll('.pokemon-img img');

        // Check if there are lost player
        if (remainingTrainerLives === 0 || remainingEnemyLives === 0) {
            allBtns.forEach(allBtn => {
                allBtn.classList.add('disabled');
                allBtn.style.backgroundColor = 'gray';
                allBtn.style.color = 'black';
            });
            pokemonImg.forEach(img => {
                img.style.filter = 'grayscale(80%)';
            })
            showResetBtn.classList.add('fadeIn');
        }

        gameRounds.textContent = overallRounds;
    };

    // COMPARE PLAYERS CHOICE
    const comparePokemons = (trainerChoice, enemyChoice) => {
        const statusMessage = document.querySelector('.win-message p');
        const descriptionMessage = document.querySelector('.description-message p')

        // Draw result
        if (trainerChoice === enemyChoice) {
            statusMessage.textContent = 'Draw';
            descriptionMessage.textContent = 'The battle between the two pokemon resulting in an exciting draw.'
            overallRounds++;
            return;
        }

        // Squirtle choice results
        if (trainerChoice === 'squirtle') {
            if (enemyChoice === 'charmander'){
                statusMessage.textContent = 'Trainer Wins';
                descriptionMessage.textContent = `Squirtle used ${waterSkill()} against the ${fireSkill()} of Charmander`
                remainingEnemyLives--;
                overallRounds++;
                updateLives();
                updateRounds();
                return;
            } else {
                statusMessage.textContent = "Enemy Wins";
                descriptionMessage.textContent = `Squirtle used ${waterSkill()} against the ${grassSkill()} of Bulbasaur`
                remainingTrainerLives--;
                overallRounds++;
                updateLives();
                updateRounds();
                return;
            }
        }

        // Charmander choice results
        if (trainerChoice === 'charmander') {
            if (enemyChoice === 'bulbasaur'){
                statusMessage.textContent = 'Trainer Wins';
                descriptionMessage.textContent = `Charmander used ${fireSkill()} against the ${grassSkill()} of Bulbasaur`
                remainingEnemyLives--;
                overallRounds++;
                updateLives();
                updateRounds();
                return;
            } else {
                statusMessage.textContent = "Enemy Wins";
                descriptionMessage.textContent = `Charmander used ${fireSkill()} against the ${waterSkill()} of Squirtle`
                remainingTrainerLives--;
                overallRounds++;
                updateLives();
                updateRounds();
                return;
            }
        }

        // Bulbasaur choice results
        if (trainerChoice === 'bulbasaur') {
            if (enemyChoice === 'squirtle'){
                statusMessage.textContent = 'Trainer Wins';
                descriptionMessage.textContent = `Bulbasaur used ${grassSkill()} against the ${waterSkill()} of Squirtle`;
                remainingEnemyLives--;
                overallRounds++;
                updateLives();
                updateRounds();
                return;
            } else {
                statusMessage.textContent = "Enemy Wins";
                descriptionMessage.textContent = `Bulbasaur used ${grassSkill()} against the ${fireSkill()} of Charmander`
                remainingTrainerLives--;
                overallRounds++;
                updateLives();
                updateRounds();
                return;
            }
        }
    }

    // RANDOM SKILL FOR WATER POKEMON
    const waterSkill = () => {
        const randomNum = Math.floor(Math.random() * 5);
        const squirtleSkills = ['Hydro Pump', 'Aqua Tail', 'Waterfall', 'Water Pulse', 'Water Gun'];
        const squirtleUsed = squirtleSkills[randomNum];
        return squirtleUsed;
    }

    // RANDOM SKILL FOR FIRE POKEMON
    const fireSkill = () => {
        const randomNum = Math.floor(Math.random() * 5);
        const charmanderSkills = ['Flamethrower', 'Inferno', 'Fire Fang', 'Fire Spin', 'Flare Blitz']
        const charmanderUsed = charmanderSkills[randomNum];
        return charmanderUsed;
    }

    // RANDOM SKILL FOR GRASS POKEMON
    const grassSkill = () => {
        const randomNum = Math.floor(Math.random() * 5);
        const bulbasaurSkills = ['Solar Beam', 'Bullet Seed', 'Razor Leaf', 'Vine Whip', 'Seed Bomb'];
        const bulbasaurUsed = bulbasaurSkills[randomNum];
        return bulbasaurUsed;
    }

    battleIntro();
    battleMatch();
}

battle();