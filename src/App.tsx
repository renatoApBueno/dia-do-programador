// Função para verificar se o ano é bissexto
function isBissexto(ano: number): boolean {
	return (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0
}

// Função para encontrar o Dia do Programador
function encontrarDiaDoProgramador(ano: number): Date {
	const diaProgramador = isBissexto(ano) ? new Date(ano, 8, 12) : new Date(ano, 8, 13)
	return diaProgramador
}

// Função para verificar se o Dia do Programador já passou ou é o dia atual
function verificarDiaDoProgramador(): JSX.Element {
	const anoAtual = new Date().getFullYear()
	const diaProgramador = encontrarDiaDoProgramador(anoAtual)
	const dataAtual = new Date()

	if (dataAtual.getDate() === diaProgramador.getDate() && dataAtual.getMonth() === diaProgramador.getMonth()) {
		// É o Dia do Programador hoje
		return (
			<div style={{ textAlign: "center", backgroundColor: "lightblue", padding: "20px" }}>
				<h1>🚀 Feliz Dia do Programador! 🎉</h1>
				<p>
					Você é incrível e faz parte de um mundo de inovação e criatividade. Continue codando e realizando
					coisas incríveis!
				</p>
			</div>
		)
	} else if (dataAtual > diaProgramador) {
		// Dia do Programador já passou este ano
		const proximoAno = anoAtual + 1
		const proximoDiaProgramador = encontrarDiaDoProgramador(proximoAno)
		return (
			<div style={{ textAlign: "center", backgroundColor: "lightgray", padding: "20px" }}>
				<h1>O Dia do Programador já passou em {diaProgramador.toLocaleDateString()}.</h1>
				<p>Próximo Dia do Programador: {proximoDiaProgramador.toLocaleDateString()}.</p>
			</div>
		)
	} else {
		// O Dia do Programador ainda não chegou este ano
		return (
			<div style={{ textAlign: "center", backgroundColor: "lightgreen", padding: "20px" }}>
				<h1>O Dia do Programador será em {diaProgramador.toLocaleDateString()}.</h1>
				<p>Fique animado para celebrar! 🎉</p>
			</div>
		)
	}
}

function DiaDoProgramadorComponent(): JSX.Element {
	return <div>{verificarDiaDoProgramador()}</div>
}

export default DiaDoProgramadorComponent
