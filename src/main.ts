import { Actor, Collider, CollisionType, Color, Engine, vec } from "excalibur"
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
	x: 100,
	y: 100,

	radius: 10,

	color: Color.Red
})

bolinha.body.collisionType = CollisionType.Passive

// 5 - criar movimentação bolinha

const velocidade = vec(150, 150)

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
	// baixo
	if (bolinha.pos.y + bolinha.height/2 > game.drawHeight){
		bolinha.vel.y = -velocidade.y
	}
})

// *Minha colisão da bolinha com a barra
// bolinha.on("postupdate", () => {
// 	if (bolinha.pos.y + bolinha.height/2 > barra.pos.y-10){
// 		bolinha.vel.y = -velocidade.y
// 	}
// })

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

// inicia o game
game.start()