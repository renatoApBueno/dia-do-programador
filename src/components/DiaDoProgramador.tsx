import { useEffect, useState, useCallback, useMemo } from "react";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";

import programadorAnim from "../assets/space-boy-developer.json";
import fogueteAnim from "../assets/rocket.json";

import "../styles/DiaDoProgramador.css";

function isBissexto(ano: number): boolean {
  return (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
}

function encontrarDiaDoProgramador(ano: number): Date {
  return new Date(ano, 8, isBissexto(ano) ? 12 : 13);
}

function formatarData(data: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(data);
}

function calcularContagemRegressiva(dataAlvo: Date): string {
  const diff = dataAlvo.getTime() - new Date().getTime();
  if (diff <= 0) return "";
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);
  return `${dias}d ${horas}h ${minutos}min ${segundos}s`;
}

export default function DiaDoProgramador() {
  const hoje = useMemo(() => new Date(), []);
  const ano = hoje.getFullYear();
  const diaProgramador = encontrarDiaDoProgramador(ano);
  const [contador, setContador] = useState("");

  // Função para lançar confetes
  const soltarConfetes = useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  }, []);

  useEffect(() => {
    if (hoje < diaProgramador) {
      // Set contador inicial
      setContador(calcularContagemRegressiva(diaProgramador));

      const intervalo = setInterval(() => {
        setContador(calcularContagemRegressiva(diaProgramador));
      }, 1000); // atualiza a cada segundo
      return () => clearInterval(intervalo);
    }

    // Se for o dia do programador, solta confetes ao montar
    if (
      hoje.getDate() === diaProgramador.getDate() &&
      hoje.getMonth() === diaProgramador.getMonth()
    ) {
      soltarConfetes();
    }
  }, [diaProgramador, hoje, soltarConfetes]);

  const mesmoDia =
    hoje.getDate() === diaProgramador.getDate() &&
    hoje.getMonth() === diaProgramador.getMonth();

  if (mesmoDia) {
    return (
      <div className="container mensagem mensagem--hoje">
        <Lottie
          animationData={programadorAnim}
          loop={true}
          style={{ height: 200, marginBottom: 20 }}
        />
        <h1 className="pulse">🚀 Feliz Dia do Programador! 🎉</h1>
        <p>Continue criando, inovando e mudando o mundo com seu código. 💻❤️</p>
      </div>
    );
  }

  if (hoje > diaProgramador) {
    const proximo = encontrarDiaDoProgramador(ano + 1);
    return (
      <div className="container mensagem mensagem--passou">
        <Lottie
          animationData={fogueteAnim}
          loop={true}
          style={{ height: 200, marginBottom: 20 }}
        />
        <h1>
          😢 O Dia do Programador já passou ({formatarData(diaProgramador)}).
        </h1>
        <p>
          Próximo será em: <strong>{formatarData(proximo)}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="container mensagem mensagem--aguardando">
      <h1>⌛ Faltam {contador} para o Dia do Programador!</h1>
      <p>
        Prepare-se para comemorar no dia{" "}
        <strong>{formatarData(diaProgramador)}</strong>! 🎉
      </p>
    </div>
  );
}
