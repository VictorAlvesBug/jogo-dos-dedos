
(() => {
  const options = {
    listaNomeJogadores: ['Jogador A', 'Jogador B'],
    qtdeMaosPorJogador: 2,
  };
  
  const jogo = createJogo(options);

  const myLoop = setInterval(() => {
    const jaSelecionouMaoOrigem = indiceMaoOrigem !== null && indiceMaoDestino === null;
    jogo.exibir(jaSelecionouMaoOrigem);

    const vencedor = jogo.verificarVencedor();
    if(vencedor){
      alert(`${vencedor} venceu!!!`)
      clearInterval(myLoop);
    }
  }, 100);

  let indiceMaoOrigem = null;
  let indiceMaoDestino = null;

  const listaBtnMao = document.querySelectorAll('.btn-mao');
console.log(listaBtnMao)
  listaBtnMao.forEach(btnMao => {
    btnMao.addEventListener('click', () => {
      const spanMaoFlutuante = document.querySelector('.mao-flutuante');

      if(indiceMaoOrigem === null){
        indiceMaoOrigem = Number(btnMao.getAttribute('data-indice'));
        indiceMaoDestino = null;
        
        spanMaoFlutuante.innerHTML = btnMao.innerHTML;
      }
      else if(indiceMaoDestino === null){
        indiceMaoDestino = Number(btnMao.getAttribute('data-indice'));

        jogo.jogar(indiceMaoOrigem, indiceMaoDestino);
        
      indiceMaoOrigem = null;
      indiceMaoDestino = null;
      spanMaoFlutuante.innerHTML = "";
      }
    });
  });

  const listaBtnDividir = document.querySelectorAll('.btn-dividir');

  listaBtnDividir.forEach(btnDividir => {
    btnDividir.addEventListener('click', () => {
      indiceMaoOrigem = null;
      indiceMaoDestino = null;
      
      jogo.dividir();
    });
  });

  document.addEventListener('mousemove', (event) => {
    const spanMaoFlutuante = document.querySelector('.mao-flutuante');
    const jaSelecionouMaoOrigem = indiceMaoOrigem !== null && indiceMaoDestino === null;

    if(jaSelecionouMaoOrigem) {
      spanMaoFlutuante.style.display = 'block';
      spanMaoFlutuante.style.left = `${event.clientX+10}px`;
      spanMaoFlutuante.style.top = `${event.clientY+10}px`;
    }
    else{
      spanMaoFlutuante.style.display = 'none';
    }
  })

})()