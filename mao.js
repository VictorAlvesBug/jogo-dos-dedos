function createMao(qtdeMaos, qtdeDedos) {
    const mao = {};
  
    mao.qtdeMaos = qtdeMaos;
    mao.totalDedos = qtdeDedos;
    mao.dedosLevantados = 1;
  
    mao.estaVazia = () => {
      return mao.dedosLevantados === 0;
    };
  
    mao.podeDividir = () => {
      return mao.dedosLevantados > 0 && mao.dedosLevantados % mao.qtdeMaos === 0;
    };
  
    mao.dividir = () => {
        if(!mao.podeDividir()){
            throw new Error(`Erro ao dividir mão: Divisão não permitida. Sua mão tem ${mao.dedosLevantados} dedos levantados.`);
        }

        mao.dedosLevantados /= mao.qtdeMaos;
        return mao.dedosLevantados;
    };
  
    mao.somar = (qtdeSomar) => {
        if(!Number.isInteger(qtdeSomar)){
            throw new Error(`Erro ao somar: ${qtdeSomar} não é um valor inteiro.`);
          }
          
        if(qtdeSomar < 0 || qtdeSomar >= mao.totalDedos){
            const min = 0;
            const max = mao.totalDedos - 1;
            throw new Error(`Erro ao somar: ${qtdeSomar} não está entre ${min} e ${max}.`);
          }

      if (mao.estaVazia()) {
        throw new Error('Erro ao somar: A mão de destino está vazia!');
      }
  
      mao.dedosLevantados += qtdeSomar;
      mao.dedosLevantados %= mao.totalDedos;
    };

    mao.exibir = (iJogador, iMao, ehJogadorAtual, jaSelecionouMaoOrigem) => {
      const btnMao = document
      .querySelector(`.jogo .jogador[data-indice="${iJogador}"] .btn-mao[data-indice="${iMao}"]`);

      let podeSelecionar = (ehJogadorAtual && !jaSelecionouMaoOrigem) 
        || (!ehJogadorAtual && jaSelecionouMaoOrigem);

      podeSelecionar &= !mao.estaVazia();

      if(podeSelecionar){
        btnMao.classList.add('ativo');
      }
      else{
        btnMao.classList.remove('ativo');
      }

      const imgCimaOuBaixo = iJogador === 0 ? "cima" : "baixo";
      const imgEsquerdaOuDireita = iMao === 0 ? "esquerda" : "direita";
      const qtdeDedos = mao.dedosLevantados;
      const nomeImg = `mao-${imgEsquerdaOuDireita}-${imgCimaOuBaixo}-${qtdeDedos}-dedos.png`
      btnMao.querySelector('img').setAttribute('src', `./imagens/sem-fundo/${nomeImg}`);
      /*switch(mao.dedosLevantados){
        case 0:
          btnMao.innerText = "vazia";
          break;
          
        case 1:
          btnMao.innerText = "1 dedo";
          break;
          
        default:
          btnMao.innerText = `${mao.dedosLevantados} dedos`;
          break;
      }*/
    };

    mao.exibir2 = (x, y, largura, altura, ehJogadorAtual) => {
      if(ehJogadorAtual){
        fill(255);
      }
      else{
        noFill();
      }
      
      stroke(120);
      rect(x, y, largura, altura);
      noStroke();
      fill(120);
      textSize(30);
      text(`${mao.dedosLevantados} dedos`, x+60, y+100);
    };
  
    return mao;
  }