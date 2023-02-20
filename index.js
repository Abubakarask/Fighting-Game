const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.5

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: {
        x:0,
        y:0
    },
    velocity: {
        x: 0,
        y: 10
    }, 
    offset: {
        x: 0,
        y: 0
    },
    color: 'red'
})

const enemy = new Fighter({
    position: {
        x:400,
        y:100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    },
    color: 'yellow'
})

console.log(player)

keys = {
    d : {
        pressed: false
    }, 
    a: {
        pressed: false
    },
    ArrowRight : {
        pressed: false
    }, 
    ArrowLeft: {
        pressed: false
    }
}

decreaseTimer()

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width, canvas.height)

    background.update()
    shop.update()
    player.update();
    enemy.update();

    player.velocity.x = 0
    
    if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    } else if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    }

    enemy.velocity.x = 0

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }

    //detect collision
    if (
     rectangularCollision({ 
        rectangle1: player,
        rectangle2: enemy
     }) && 
      player.isAttacking ) {
        player.isAttacking = false
        //   console.log('go');
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = `${enemy.health}%`
    }

    if (
        rectangularCollision ({ 
            rectangle1: enemy,
            rectangle2: player
        }) && 
        enemy.isAttacking) {
            enemy.isAttacking = false
            // console.log('ho');
            player.health -= 20
            document.querySelector('#playerHealth').style.width = `${player.health}%`
       }

       if (enemy.health <= 0 || player.health <= 0){
            determineWinner(player, enemy);
       }
}

animate()

window.addEventListener('keydown', (event) => {
    console.log(event.key);
    switch(event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break;

        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break;

        case 'w':
            player.velocity.y = -15
            break;
        
        case ' ':
            player.attack()
            break;
        
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break;
    
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break;
    
        case 'ArrowUp':
            enemy.velocity.y = -15
            break;
        
        case 'ArrowDown':
            enemy.attack()
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'd':
            keys.d.pressed = false
            break;

        case 'a':
            keys.a.pressed = false
            break;
        
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;      
    }   

})