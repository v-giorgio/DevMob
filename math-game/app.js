let numero1 = 0, numero2 = 0, expression = 0, expressionFalse = 0, expressionTrue = 0, opcaoNumber = 0, valorOpcao1 = 0, valorOpcao2 = 0;

/* gerar a expressao */

function gerarExpressao(){
    numero1 = Math.round(Math.random() * 100);
    numero2 = Math.round(Math.random() * 100);
    expression = numero1 + numero2;
    document.getElementById('expression').innerHTML = `${numero1} + ${numero2}`;

    /* mostrar as opcoes */

    expressionFalse = Math.round(expression * 1.05);
    expressionTrue = expression;

    opcaoNumber = 0;

    opcaoNumber = Math.round(Math.random());

    if (opcaoNumber == 0){
        valorOpcao1 = document.getElementById('opcao1').innerHTML = expressionTrue;
        valorOpcao2 = document.getElementById('opcao2').innerHTML = expressionFalse;
    } else if (opcaoNumber == 1){
        valorOpcao1 = document.getElementById('opcao1').innerHTML = expressionFalse;
        valorOpcao2 = document.getElementById('opcao2').innerHTML = expressionTrue;
    }
}

/* selecionar uma opcao */

var score1 = 0, score2 = 0;

function selecionarOpcao1(){
    document.getElementById('opcao1').className = 'click1';
    document.getElementById('opcao2').className = 'options';
    if (score2 != 0 && score1 == 0){
        score2 = 0;
        score1++;
    }
    if (score1 == 0 && score2 == 0) score1++;
}

function selecionarOpcao2(){
    document.getElementById('opcao2').className = 'click2';
    document.getElementById('opcao1').className = 'options';
    if (score1 != 0 && score2 == 0){
        score1 = 0;
        score2++;
    }
    if (score2 == 0 && score1 == 0) score2++;
}

/* registrar score */

function focusConfirm(){
    document.getElementById('confirmButtonStyle').className = 'confirm-button-over';
}

function outConfirm(){
    document.getElementById('confirmButtonStyle').className = 'confirm-button-out';
}

var pontos = 0;
var breakpoint = 0;

function gerarScore(){
    if (score1 == 0 && score2 == 0){
        alert("Selecione uma opção, por favor");
    }
    if (score1 == 1){
        if (valorOpcao1 == expressionTrue){
            pontos++;
        }
        score1 = 0;
        gerarExpressao();
    }
    if (score2 == 1){
        if (valorOpcao2 == expressionTrue){
            pontos++;
        }
        score2 = 0;
        gerarExpressao();
    }
    document.getElementById('opcao1').className = 'options';
    document.getElementById('opcao2').className = 'options';

    breakpoint++;
    if (breakpoint == 10){
        if (pontos >= 8){
            alert(`Parabéns! Sua pontuação foi de ${pontos} pontos.`);
            window.location.reload();
        }
        if (pontos >= 5 && pontos < 8){
            alert(`Sua pontuação foi de ${pontos} pontos. Ainda pode melhorar!`);
            window.location.reload();
        }
        if (pontos < 5){
            alert(`Sua pontuação foi de ${pontos} pontos. Vamos tentar novamente?`);
            window.location.reload();
        }
    }
}