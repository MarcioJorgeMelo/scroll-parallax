"use client"

import Image from "next/image";
import { useTransform, useScroll, MotionValue, motion } from "framer-motion"
import Lenis from 'lenis'
import { useEffect, useRef } from "react";
import useDimension from "./hook/useDimension";

const images = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
  "11.png",
  "12.png",
]

export default function Home() {
  //"container" é uma referência para o contêiner principal da galeria. É usada para conectar o useScroll ao elemento exato que você quer monitorar.
  const container = useRef(null);
  //Usa o hook "useDimension" para obter a altura da janela atual (innerHeight).
  const { height } = useDimension();
  //🌀 "useScroll" cria um valor reativo (scrollYProgress), faz com que a animação ocorra do topo ao final da viewport e, inversamente.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  })
  //Criando animações diferentes para cada "column".
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 2.25])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  //Iniciamos o loop de atualização, a cada frame, do Lenis para ele ativar o scroll com suavização.
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, [])

  return (
    <main>
      <div className="h-[100vh] bg-white" />
      <div ref={container} className="h-[175vh] bg-[rgb(45, 45, 45)] flex gap-[2vw] p-[2vw] box-border overflow-hidden">
        <Column images={[images[0], images[1], images[2]]} y={y1} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>
      <div className="h-[100vh] bg-white" />
    </main>
  );
}

const Column = ({images, y}:{images: string[], y: MotionValue<number>}) => {
  return (
    <motion.div style={{y}} className="w-1/4 h-full flex flex-col gap-[2vw] min-w-[250px] relative [&:nth-of-type(1)]:top-[-45%] [&:nth-of-type(2)]:top-[-75%] [&:nth-of-type(3)]:top-[-45%] [&:nth-of-type(4)]:top-[-75%]">
      {
        images.map( (src, index) => {
          return <div key={index} className="w-full h-full relative rounded-[1vw] overflow-hidden">
            <Image
              src={`/images/${src}`}
              fill
              alt="image"
              className="object-cover"
            />
          </div>
        })
      }
    </motion.div>
  )
}
