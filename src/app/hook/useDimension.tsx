import { useEffect, useState } from "react"

// 🔧 Hook personalizado para capturar as dimensões atuais da janela do navegador (viewport)
const useDimension = () => {
    // 🧩 Estado interno que guarda a largura e altura da janela.
    const [dimension, setDimension] = useState({ width: 0, height: 0 })

    // 📏 Função que lê as dimensões atuais do viewport (window.innerWidth e innerHeight) e atualiza o estado com esses valores.
    const updateDimension = () => {
        const { innerWidth, innerHeight } = window;
        setDimension({ width: innerWidth, height: innerHeight });
    }

    useEffect(() => {
        // ✅ Executa uma vez assim que o componente é montado (client-side)
        // — importante no Next.js, já que o `window` só existe no cliente.
        updateDimension();

        // 🔁 Adiciona um listener que atualiza o estado sempre que a janela é redimensionada.
        // Isso permite que as animações reajam automaticamente se o usuário mudar o tamanho da tela.
        window.addEventListener("resize", updateDimension);

        // 🧹 Remove o listener quando o componente é desmontado,
        // evitando vazamento de memória (boa prática com useEffect).
        return () => {window.removeEventListener("resize", updateDimension)};
    }, [])

    // 📤 Retorna o objeto com { width, height }
    return dimension;
}

export default useDimension;