function createJogo(options) {
    const defaultOptions = {
      listaNomeJogadores: ['Jogador1', 'Jogador2'],
      qtdeMaosPorJogador: 2,
    };
  
    options = { defaultOptions, ...options };
  
    const listaJogadores = options.listaNomeJogadores.map((nomeJogador) =>
      createJogador(nomeJogador, options.qtdeMaosPorJogador)
    );
  
    let indiceJogadorAtual = 1;
  
    const jogo = {};
  
    const retornarJogadorAtual = () => {
      return listaJogadores[indiceJogadorAtual];
    };
  
    const retornarOutroJogador = () => {
      const indiceOutroJogador = (indiceJogadorAtual+1) % listaJogadores.length;
      return listaJogadores[indiceOutroJogador];
    };

    jogo.passarVez = () => {
        indiceJogadorAtual += 1;
        indiceJogadorAtual %= listaJogadores.length;
    };
  
    jogo.jogar = (indiceMaoOrigem, indiceMaoDestino) => {
      const jogadorAtual = retornarJogadorAtual();
      const outroJogador = retornarOutroJogador();

      jogadorAtual.jogar(indiceMaoOrigem, outroJogador, indiceMaoDestino);
      jogo.passarVez();
    };
  
    jogo.dividir = () => {
        const jogadorAtual = retornarJogadorAtual();

        if(!jogadorAtual.podeDividir()){
            const listaDedosMao = jogadorAtual.maos.map(mao => 
                mao.dedosLevantados);
            const strListaDedosMao = listaDedosMao.join(', ')
            throw new Error(`Erro ao dividir: Divisão não permitida. Suas mãos: ${strListaDedosMao}.`);
        }

        jogadorAtual.dividir();

        jogo.passarVez();
    };

    jogo.exibir = (jaSelecionouMaoOrigem) => {
      listaJogadores.forEach((jogador, iJogador) => {
        const ehJogadorAtual = iJogador === indiceJogadorAtual;
        jogador.exibir(iJogador, ehJogadorAtual, jaSelecionouMaoOrigem);
      })
    }
  
    jogo.verificarVencedor = () => {
      let iPerdedor = null;
      
      listaJogadores.forEach((jogador, iJogador) => {
        if(jogador.perdeu()){
          iPerdedor = iJogador;
        }
      })

      if(iPerdedor !== null){
        const iVencedor = (iPerdedor + 1) % listaJogadores.length;
        return listaJogadores[iVencedor].nome;
      }

      return null;
    };
  
    return jogo;
  }