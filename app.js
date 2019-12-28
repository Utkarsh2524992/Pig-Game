/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score,roundScore,isPlaying,activePlayer,prevDice;

function init()
{
    score = [0,0];
    roundScore = 0;
    isPlaying = true;
    activePlayer = 0;
    prevDice = 0;
    
    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player-1';
    document.querySelector('#name-1').textContent = 'Player-2';
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
}

init();

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(isPlaying)
    {
        var dice1 = Math.ceil(Math.random()*6);
        //var dice  = 6;
        var diceDOM1 = document.querySelector('#dice1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-'+dice1+'.png';
        
        var dice2 = Math.ceil(Math.random()*6);
        //var dice  = 6;
        var diceDOM2 = document.querySelector('#dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-'+dice2+'.png';
        if(dice1!==1 && dice2 !==1)
            {
                roundScore += dice1+dice2;
                document.querySelector('#current-'+activePlayer).textContent = roundScore;
            }
        else
            {
               // diceDOM.style.display = 'none';
                roundScore = 0;
                prevDice = 0;
                dice = 0;
                document.querySelector('#current-'+activePlayer).textContent = 0;
                document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
                activePlayer==0?activePlayer=1:activePlayer=0;
                document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
                document.getElementById('dice1').style.display = 'none';
                document.getElementById('dice2').style.display = 'none';
            }
    }
        
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(isPlaying)
    {
            
        score[activePlayer] += roundScore;
        document.querySelector('#dice1').style.display = 'none';
        document.querySelector('#dice2').style.display = 'none';
        document.querySelector('#current-'+activePlayer).textContent = 0;
        var input = document.querySelector('.final-score').value;
        if(!input)
            input = 100;
        if(score[activePlayer]>=input)
            {
                document.querySelector('#score-'+activePlayer).textContent = score[activePlayer];
                document.querySelector('#name-'+activePlayer).textContent = 'WINNER!';
                isPlaying = false;
                document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('winner');
            }
        else
            {
                prevDice = 0;
                document.querySelector('#score-'+activePlayer).textContent = score[activePlayer];
                document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
                document.querySelector('#current-'+activePlayer).textContent = 0;
                activePlayer==0?activePlayer=1:activePlayer=0;
                document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
                roundScore = 0;

            }
    }
    
});

document.querySelector('.btn-new').addEventListener('click',function(){
    init();
    document.querySelector('.dice').style.display = 'none';
})
