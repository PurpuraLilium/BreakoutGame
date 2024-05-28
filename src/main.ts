import { Actor, Collider, CollisionType, Color, Engine, ExitViewPortEvent, Font, FontUnit, Label, Sound, Text, vec } from "excalibur"
import { vector } from "excalibur/build/dist/Util/DrawUtil"

// 1 - criar uma instancia de Engine, que representa o jogo.
const game = new Engine({
	width: 800,
	height: 600
})

// 2 - criar barra do player
const barra = new Actor({
	x: 150,
	y: game.drawHeight - 40,  //drawHeight = fim da tela

	width: 200,
	height: 20,

	color: Color.Chartreuse
})

// define o tipo de colisão da barra (.fixed significa que ele não se move ao colidir).
barra.body.collisionType = CollisionType.Fixed

// insere o Actor barra - player, no game.
game.add(barra)

//  3- Movimenta a barra de acordo com o mouse.
game.input.pointers.primary.on("move", (event) => {
	barra.pos.x = event.worldPos.x
})

// 4 - criar actor bolinha

const bolinha = new Actor({
	x: 400,
	y: 300,

	radius: 10,

	color: Color.Red
})

// let ponto = 0

// const txtponto = new Text ({
// 	text: "hello world",
// 	font: new Font({size: 30})
// })

// const objtxt = new Actor({
// 	x: game.drawWidth - 80,
// 	y: game.drawHeight - 15
// })

// objtxt.graphics.use(txtponto)

// game.add(objtxt)

bolinha.body.collisionType = CollisionType.Passive

// 5 - criar movimentação bolinha

const velocidade = vec(750, 750)

setTimeout(() => {
	bolinha.vel = velocidade
}, 1000);

// 6- fazer bolinha rebater nas paredes

bolinha.on("postupdate", () => {
	// esquerda
	if (bolinha.pos.x < bolinha.width/2){
		bolinha.vel.x = velocidade.x
	}
	// direita
	if (bolinha.pos.x + bolinha.width/2 > game.drawWidth){
		bolinha.vel.x = -velocidade.x
	}
	// cima
	if (bolinha.pos.y < bolinha.height/2){
		bolinha.vel.y = velocidade.y
	}
})

// insere o Actor bolinha
game.add(bolinha)

// 7 - criar os blocos

const padding = 20

const xoffset = 65
const yoffset = 20

const colunas = 5
const linhas = 3

const corBloco = [Color.Violet, Color.Orange, Color.Yellow]

const largurabloco = (game.drawWidth / colunas) - padding - (padding / colunas) // é igual a 136
const alturaBloco = 30

const listaBlocos: Actor[] = []


// Renderiza 3 linhas
for(let j = 0; j < linhas; j++){

	// renderiza 5 bloquinhos
	for(let i = 0; i < colunas; i++){
		listaBlocos.push(
			new Actor({
				x: xoffset + i * (largurabloco + padding) + padding,
				y: yoffset + j * (alturaBloco + padding) + padding,
				width: largurabloco,
				height: alturaBloco,
	
				color: corBloco[j]
			})
		)
	}
}




listaBlocos.forEach(bloco => {
	// define o tipo de colisão
	bloco.body.collisionType = CollisionType.Active

	game.add(bloco)
})

let pontos = 0

const txtpontos = new Label({
	text: pontos.toString(),
	font: new Font({
		size: 40,
		color:Color.White,
		strokeColor: Color.Black,
		unit: FontUnit.Px
	}),
	pos: vec(750, 550)

})

game.add(txtpontos)

let colidindo: boolean = false

const audio = new Audio('audio.mp3')
const audio3 = new Audio('Win.mp3')

bolinha.on("collisionstart", (event) => {
	if (listaBlocos.includes(event.other)){
		event.other.kill()

		pontos++

		if (pontos == 15){

			audio3.play()

			alert("Você venceu!")
			window.location.reload()
		}

		audio.play()
		
		txtpontos.text = pontos.toString()
	}

let intersec = event.contact.mtv.normalize()

if (!colidindo){
	colidindo = true

	if(Math.abs(intersec.x) > Math.abs(intersec.y)){
		bolinha.vel.x *= -1
	}

	else{
		bolinha.vel.y *= -1
	}
}
}) 

bolinha.on("collisionend", () =>{
	colidindo = false
})

const audio2 = new Audio('gameover.mp3')

bolinha.on("exitviewport", () => {
	audio2.play()

	alert("E morreu")

	window.location.reload()
})



// inicia o game
game.start()