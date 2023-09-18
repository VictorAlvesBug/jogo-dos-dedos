function createJogador(nome, qtdeMaos) {
  const jogador = {};

  jogador.nome = nome;
  jogador.maos = [];

  for (let i = 0; i < qtdeMaos; i++) {
    const qtdeDedos = 5;
    jogador.maos.push(createMao(qtdeMaos, qtdeDedos));
  }

  jogador.podeDividir = () => {
    const [mao1, mao2] = jogador.maos;

    return (
      (mao1.estaVazia() && mao2.podeDividir()) ||
      (mao2.estaVazia() && mao1.podeDividir())
    );
  };

  jogador.dividir = () => {
    if (jogador.podeDividir()) {
      const [mao1, mao2] = jogador.maos;

      if (mao1.estaVazia()) {
        mao1.dedosLevantados = mao2.dividir();
      } else if (mao2.estaVazia()) {
        mao2.dedosLevantados = mao1.dividir();
      }
    }
  };

  jogador.jogar = (indiceMaoOrigem, jogadorDestino, indiceMaoDestino) => {
    if (!Number.isInteger(indiceMaoOrigem)) {
      throw new Error(
        `Erro ao jogar: ${indiceMaoOrigem} não é um valor inteiro.`
      );
    }

    if (indiceMaoOrigem < 0 || indiceMaoOrigem >= jogador.maos.length) {
      const min = 0;
      const max = jogador.maos.length - 1;
      throw new Error(
        `Erro ao jogar: ${indiceMaoOrigem} não está entre ${min} e ${max}.`
      );
    }

    if (!Number.isInteger(indiceMaoDestino)) {
      throw new Error(
        `Erro ao jogar: ${indiceMaoDestino} não é um valor inteiro.`
      );
    }

    if (
      indiceMaoDestino < 0 ||
      indiceMaoDestino >= jogadorDestino.maos.length
    ) {
      const min = 0;
      const max = jogadorDestino.maos.length - 1;
      throw new Error(
        `Erro ao jogar: ${indiceMaoOrigem} não está entre ${min} e ${max}.`
      );
    }

    const maoOrigem = jogador.maos[indiceMaoOrigem];
    const maoDestino = jogadorDestino.maos[indiceMaoDestino];

    maoDestino.somar(maoOrigem.dedosLevantados);
  };

  jogador.exibir = (iJogador, ehJogadorAtual, jaSelecionouMaoOrigem) => {
    const divJogador = document.querySelector(
      `.jogo .jogador[data-indice="${iJogador}"]`
    );
    const spanNome = divJogador.querySelector('.jogador-nome');
    const btnDividir = divJogador.querySelector('.btn-dividir');

    if (ehJogadorAtual) {
      spanNome.innerText = `> ${jogador.nome}`;
    } else {
      spanNome.innerText = jogador.nome;
    }

    if (ehJogadorAtual && !jaSelecionouMaoOrigem) {
      btnDividir.classList.add('ativo');
    } else {
      btnDividir.classList.remove('ativo');
    }

    jogador.maos.forEach((mao, iMao) => {
      mao.exibir(iJogador, iMao, ehJogadorAtual, jaSelecionouMaoOrigem);
    });
  };

  jogador.perdeu = () => {
    let todasMaosVazia = true;

    jogador.maos.forEach((mao) => {
      if(!mao.estaVazia()){
        todasMaosVazia = false;
      }
    });

    return todasMaosVazia;
  };

  return jogador;
}
