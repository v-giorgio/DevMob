class Atividade {
	constructor(mes, dia, tipo, descricao, hora){
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.hora = hora
	}

	validarDados(){
		for(let i in this){
			if (this[i] === undefined || this[i] == '' || this[i] == null){
				return false
			}
		}
		return true
	}
}

class Armazenamento{

	constructor(){
		let id = localStorage.getItem('id')
		
		if (id === null){
			localStorage.setItem('id', 0)
		}
	}

	getNextId(){
		let nextId = localStorage.getItem('id')
		return parseInt(nextId) + 1
	}

	gravar(d){
		let id = this.getNextId()
		localStorage.setItem(id, JSON.stringify(d))
		localStorage.setItem('id', id)
	}

	recuperarTodasAtividades(){

		let atividades = Array()

		let id = localStorage.getItem('id')

		for (let i = 1; i <= id; i++){
			let atividade = JSON.parse(localStorage.getItem(i))

			if (atividade === null){
				continue
			}
			atividade.id = i
			atividades.push(atividade)
		}
		return atividades
	}

	pesquisar(atividade){

		let atividadesFiltradas = Array()

		atividadesFiltradas = this.recuperarTodasAtividades()

		//mes
		if (atividade.mes != ''){ 
			atividadesFiltradas = atividadesFiltradas.filter(d => d.mes == atividade.mes)
		}

		//dia
		if (atividade.dia != ''){ 
			atividadesFiltradas = atividadesFiltradas.filter(d => d.dia == atividade.dia)
		}

		//tipo
		if (atividade.tipo != ''){ 
			atividadesFiltradas = atividadesFiltradas.filter(d => d.tipo == atividade.tipo)
		}

		//descricao
		if (atividade.descricao != ''){ 
			atividadesFiltradas = atividadesFiltradas.filter(d => d.descricao == atividade.descricao)
		}

		//horario
		if (atividade.hora != ''){ 
			atividadesFiltradas = atividadesFiltradas.filter(d => d.hora == atividade.hora)
		}

		return atividadesFiltradas
	}

	remover(id){
		localStorage.removeItem(id)
	}

}

let armazenamento = new Armazenamento()

function adicionarAtividades(){
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let hora = document.getElementById('hora')

	let atividade =  new Atividade( 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value, 
		hora.value
	)

	if (atividade.validarDados()){
		armazenamento.gravar(atividade)
		document.getElementById('modal_titulo').innerHTML = 'Registro concluído'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_body').innerHTML = 'Atividade inserida com sucesso'
		document.getElementById('modal_button').className = 'btn btn-success'
		document.getElementById('modal_button').innerHTML = 'Concluído'
		$('#modalRegistroAtividade').modal('show')
	} else{
		document.getElementById('modal_titulo').innerHTML = 'Erro no registro'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_body').innerHTML = 'Dados obrigatórios não foram preenchidos'
		document.getElementById('modal_button').className = 'btn btn-danger'
		document.getElementById('modal_button').innerHTML = 'Tente novamente'
		$('#modalRegistroAtividade').modal('show')
	}

	mes.value = ''
	dia.value = ''
	tipo.value = ''
	descricao.value = ''
	hora.value = ''

}

function atualizaListaAtividades(){
	let atividades = Array()
	atividades = armazenamento.recuperarTodasAtividades()

	let listaAtividades = document.getElementById('listaAtividades')

	atividades.forEach(function(d){
		let linha = listaAtividades.insertRow()
	
		switch(d.tipo){
			case '1':
				d.tipo = 'Trabalho'
				break
			case '2':
				d.tipo = 'Estudos'
				break
			case '3':
				d.tipo = 'Lazer'
				break
			case '4':
				d.tipo = 'Saúde'
				break
			case '5':
				d.tipo = 'Família'
				break
            case '6':
                d.tipo = 'Casa'
                break
            case '7':
                d.tipo = 'Outros'
                break
	    }

		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}`
		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.hora

		let btn = document.createElement('button')
		btn.className = 'btn btn-success'
		btn.innerHTML = '<i class="fas fa-check-circle"></i>'
		btn.id = `id_atividade_${d.id}`
		btn.onclick = function(){
			let id = this.id.replace('id_atividade_', '')
			armazenamento.remover(id)
			location.reload()
		}
		linha.insertCell(4).append(btn)
	})
}
