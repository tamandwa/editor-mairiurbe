import React, { useState, useMemo } from 'react';

// --- DADOS INICIAIS (Extraídos do seu XML) ---
const INITIAL_DATA = {
  hero: {
    title: "A Amazônia é {urbana}.",
    subtitle: "O Laboratório Urbano do Mairi está preocupado com o futuro das cidades: 72% da população do Norte reside em cidades, no entanto, enfrentamos problemas seculares relacionados à falta de planejamento urbano, saneamento e diretrizes de urbanização adequadas para a região amazônica. Em razão disso, surgimos como um coletivo dedicado a construir espaços urbanos mais justos, sustentáveis e participativos através de pesquisa, ação e advocacy.",
    highlightColor: "#a8d0a8",
  },
  about: {
    text1: "O Mairiurbe é um coletivo formado por Francisco Barbosa, Maria Clara Reis e Matheus Henderson.",
    text2: "Somos três jovens amazônidas unidos pelo objetivo de incidir positivamente nas políticas públicas e no desenvolvimento urbano, buscando um futuro mais justo e sustentável para as cidades da Amazônia.",
    buttonText: "Conheça nossa trajetória →",
    buttonLink: "/p/sobre-nos.html",
  },
  directors: [
    {
      id: 1,
      name: "Francisco Barbosa",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjm1IV_w77XlV5Z5UEEA5O2bJVXSlUm8gGSvWHLvrLN236tcJ3Kp6CFnQk1Qk5PDW-Pnq78abi9pH3KaDfoKccddkoCG97GKn9tEbt_IyT2TLbQM56MdqZhhyphenhyphenWvFcFQU2660HOVtwg5KhQ8lPHYU9gwjDL3pT65UC2TcJe7g33GmwFg-LzIhpXO3wtFEIE2/s800/CHICO.png",
      link: "https://www.linkedin.com/in/franciscomnbarbosa/",
      color: "#1E6533",
      title: "Diretor de Advocacy",
      bio: "Acadêmico de Direito na Universidade Federal do Pará, nascido e domiciliado no Bairro do Mangueirão, na periferia de Belém do Pará. Desenvolve pesquisa na área do direito urbanístico, com ênfase nas suas intersecções com as agendas climáticas internacionais."
    },
    {
      id: 2,
      name: "Maria Clara Reis",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgAePSoTINFmadkkcKdgIaFuabRxLKic3LOLL6A_TUpQKE5piWtsAg-ScCkw8oepU1jTxkk3klKqoLI24RO0Wg32gaQCT1yydsJLyy4qrS1OR48z3QejOPw5_oMMOS3h7F1XpswTtvVVUmFrC8cW_Cw4OOv8dfZfxp2Bj2hK4Lbir_lTZDDcQFQY4LW9tJO/s800/MARIAREIS.png",
      link: "https://www.linkedin.com/in/maria-clara-reis-708459226/",
      color: "#E67E22",
      title: "Diretora de Pesquisa e Comunicação",
      bio: "Acadêmica de Direito na Universidade da Amazônia, é pesquisadora e ativista social, nascida e crescida no Bairro do Telégrafo, na periferia de Belém do Pará. Dedica-se à pesquisa na área de Direitos Humanos e Ambiental."
    },
    {
      id: 3,
      name: "Matheus Henderson",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2OIqAH4aAwgaOnUCIruWktwOhdE-2jlFBIyilhjuqdfNgaIl6lPTYdBGu6nRWpvXqyELGS94U8EfXPj6XIc_mvHqrdu5Mza7RCN06acsYayjVzTxmZ3JhMuGxc7yDDP4sPqQQJogvIN_slatOvsmGsDjyeS5ws5ZMxLJRMJdCTMxYUUPGvUo3XOrQH9Pc/s800/HENDERSON.png",
      link: "https://www.instagram.com/stereomatth/",
      color: "#3498DB",
      title: "Diretor de Eventos",
      bio: "Graduando do curso de Geografia na Universidade do Estado do Pará, é educador e mobilizador social. É residente do Distrito de Icoaraci, em Belém do Pará, e tem pesquisa na área de geografia social urbana. É o responsável por organizar nossos fóruns, debates e ações de engajamento com a comunidade."
    },
  ],
  projects: [
    {
      id: 1,
      title: "Fórum do Catalina - FOCA",
      description: "Uma iniciativa para criar um fórum comunitário permanente, engajando a sociedade civil em discussões pertinentes sobre o desenvolvimento urbano, a sustentabilidade e a justiça social na região.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      link: "#",
      buttonText: "Acompanhar o fórum →"
    },
    {
      id: 2,
      title: "Ações de Incidência Estratégica",
      description: "Participamos ativamente de eventos, audiências públicas e conselhos para fomentar o debate qualificado sobre a Amazônia urbana e influenciar a formulação de políticas públicas mais inclusivas.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop",
      link: "#",
      buttonText: "Ver nossas ações →"
    },
    {
      id: 3,
      title: "Policy Brief sobre Naming Rights",
      description: "Elaboramos uma cartilha e um policy brief para aprofundar a discussão sobre o impacto dos \"naming rights\" nos espaços públicos de Belém, oferecendo subsídios para o debate público.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      buttonText: "Ler o policy brief →"
    }
  ]
};

// --- COMPONENTES AUXILIARES ---

const Input = ({ label, value, onChange, type = "text", ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
      {...props}
    />
  </div>
);

const Textarea = ({ label, value, onChange, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
      rows="4"
      {...props}
    />
  </div>
);

const Card = ({ title, children }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">{title}</h3>
        {children}
    </div>
);

const CodeSnippet = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
        document.body.removeChild(textarea);
    };

    return (
        <div className="bg-gray-900 rounded-lg my-4 relative">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-gray-700 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-600"
            >
                {copied ? 'Copiado!' : 'Copiar'}
            </button>
            <pre className="p-4 text-white text-sm overflow-x-auto">
                <code>{code}</code>
            </pre>
        </div>
    );
};


// --- EDITOR DE CONTEÚDO DO SITE ---

const SiteEditor = ({ data, setData }) => {
    const handleHeroChange = (e) => {
        setData(prev => ({ ...prev, hero: { ...prev.hero, [e.target.name]: e.target.value } }));
    };

    const handleAboutChange = (e) => {
        setData(prev => ({ ...prev, about: { ...prev.about, [e.target.name]: e.target.value } }));
    };
    
    const handleDirectorChange = (index, e) => {
        const newDirectors = [...data.directors];
        newDirectors[index][e.target.name] = e.target.value;
        setData(prev => ({ ...prev, directors: newDirectors }));
    };

    // Funções de gerenciamento de Projetos
    const handleProjectChange = (index, e) => {
        const newProjects = [...data.projects];
        newProjects[index][e.target.name] = e.target.value;
        setData(prev => ({ ...prev, projects: newProjects }));
    };

    const addProject = () => {
        const newProject = {
            id: Date.now(), // ID único simples
            title: "Novo Projeto",
            description: "Descrição do novo projeto.",
            image: "https://placehold.co/800x600/f0f0f0/333333?text=Nova+Imagem",
            link: "#",
            buttonText: "Saiba mais →"
        };
        setData(prev => ({ ...prev, projects: [...prev.projects, newProject]}));
    };

    const removeProject = (indexToRemove) => {
        if (window.confirm('Tem certeza que deseja remover este projeto?')) {
            setData(prev => ({
                ...prev,
                projects: prev.projects.filter((_, index) => index !== indexToRemove)
            }));
        }
    };

    const moveProject = (index, direction) => {
        const newProjects = [...data.projects];
        const newIndex = index + direction;

        if (newIndex < 0 || newIndex >= newProjects.length) return;

        const [movedProject] = newProjects.splice(index, 1);
        newProjects.splice(newIndex, 0, movedProject);
        setData(prev => ({ ...prev, projects: newProjects }));
    };


    return (
        <div>
            <Card title="1. Seção Principal (Hero)">
                <Textarea label="Título (use {texto} para destacar)" name="title" value={data.hero.title} onChange={handleHeroChange} />
                <Input label="Cor do Destaque" name="highlightColor" type="color" value={data.hero.highlightColor} onChange={handleHeroChange} />
                <Textarea label="Subtítulo" name="subtitle" value={data.hero.subtitle} onChange={handleHeroChange} />
            </Card>

            <Card title="2. Seção 'Quem Somos'">
                 <Textarea label="Texto 1" name="text1" value={data.about.text1} onChange={handleAboutChange} />
                 <Textarea label="Texto 2" name="text2" value={data.about.text2} onChange={handleAboutChange} />
                 <Input label="Texto do Botão" name="buttonText" value={data.about.buttonText} onChange={handleAboutChange} />
                 <Input label="Link do Botão" name="buttonLink" value={data.about.buttonLink} onChange={handleAboutChange} />
            </Card>

            <Card title="3. Equipe / Diretores">
                {data.directors.map((director, index) => (
                    <div key={director.id} className="border p-4 rounded-md mb-4 bg-gray-50">
                        <h4 className="font-bold mb-2">Diretor {index + 1}</h4>
                        <Input label="Nome" name="name" value={director.name} onChange={(e) => handleDirectorChange(index, e)} />
                        <Input label="Cargo" name="title" value={director.title} onChange={(e) => handleDirectorChange(index, e)} />
                        <Input label="URL da Imagem" name="image" value={director.image} onChange={(e) => handleDirectorChange(index, e)} />
                        <Input label="Link (LinkedIn, etc.)" name="link" value={director.link} onChange={(e) => handleDirectorChange(index, e)} />
                        <Textarea label="Bio" name="bio" value={director.bio} onChange={(e) => handleDirectorChange(index, e)} />
                        <Input label="Cor de Destaque" name="color" type="color" value={director.color} onChange={(e) => handleDirectorChange(index, e)} />
                    </div>
                ))}
            </Card>

            <Card title="4. Página de Projetos">
                {data.projects.map((project, index) => (
                     <div key={project.id} className="border p-4 rounded-lg mb-4 bg-gray-50 relative">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-lg">Projeto {index + 1}</h4>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => moveProject(index, -1)} disabled={index === 0} className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                                </button>
                                <button onClick={() => moveProject(index, 1)} disabled={index === data.projects.length - 1} className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                <button onClick={() => removeProject(index)} className="p-1 rounded-full hover:bg-red-100">
                                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        </div>
                        
                        <Input label="Título" name="title" value={project.title} onChange={(e) => handleProjectChange(index, e)} />
                        <Textarea label="Descrição" name="description" value={project.description} onChange={(e) => handleProjectChange(index, e)} />
                        <Input label="URL da Imagem de Fundo" name="image" value={project.image} onChange={(e) => handleProjectChange(index, e)} />
                        <Input label="Link do Botão" name="link" value={project.link} onChange={(e) => handleProjectChange(index, e)} />
                        <Input label="Texto do Botão" name="buttonText" value={project.buttonText} onChange={(e) => handleProjectChange(index, e)} />
                    </div>
                ))}
                <button onClick={addProject} className="mt-4 w-full bg-purple-100 text-purple-700 font-semibold py-2 px-4 rounded-lg hover:bg-purple-200 transition-colors">
                    + Adicionar Novo Projeto
                </button>
            </Card>
        </div>
    );
};

// --- EDITOR DE BLOG ---

const BlogEditor = () => {
    const [htmlContent, setHtmlContent] = useState('');
    const editorRef = React.useRef(null);

    const applyFormat = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current.focus();
        updateHtmlContent();
    };
    
    const createLink = () => {
        const url = prompt("Digite a URL do link:");
        if (url) {
            applyFormat('createLink', url);
        }
    };

    const updateHtmlContent = () => {
        if (editorRef.current) {
            setHtmlContent(editorRef.current.innerHTML);
        }
    };

    const ToolbarButton = ({ children, onClick, title }) => (
        <button
            title={title}
            onClick={onClick}
            onMouseDown={e => e.preventDefault()} // Evita que o editor perca o foco
            className="p-2 rounded-md text-gray-700 hover:bg-gray-200"
        >
            {children}
        </button>
    );

    return (
        <div>
            <Card title="Editor de Post para o Blog">
                <div className="border border-gray-300 rounded-t-md p-2 flex items-center space-x-2 bg-gray-100">
                    <ToolbarButton onClick={() => applyFormat('bold')} title="Negrito">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a1 1 0 011-1h5.5a3.5 3.5 0 012.55 5.955 3.5 3.5 0 01-2.55 5.955H6.5A.5.5 0 016 15v-1a.5.5 0 01.5-.5H9.5a2.5 2.5 0 000-5H5a1 1 0 01-1-1V4z" clipRule="evenodd" /></svg>
                    </ToolbarButton>
                     <ToolbarButton onClick={() => applyFormat('italic')} title="Itálico">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.25 3.5a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5H7.633l-2.07 9.55h2.187a.75.75 0 010 1.5H2.25a.75.75 0 01-.74-.845l2.49-11.405h.5a.75.75 0 01.75.75z" clipRule="evenodd" /></svg>
                    </ToolbarButton>
                    <ToolbarButton onClick={() => applyFormat('formatBlock', '<h2>')} title="Título 2">H2</ToolbarButton>
                    <ToolbarButton onClick={() => applyFormat('formatBlock', '<h3>')} title="Título 3">H3</ToolbarButton>
                    <ToolbarButton onClick={() => applyFormat('formatBlock', '<blockquote>')} title="Citação">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM4 11a1 1 0 100 2h4a1 1 0 100-2H4z" /></svg>
                    </ToolbarButton>
                    <ToolbarButton onClick={() => applyFormat('insertUnorderedList')} title="Lista (pontos)">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 5.75A.75.75 0 012.75 5h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 5.75zm0 4A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zm0 4A.75.75 0 012.75 13h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-1.5 0z" clipRule="evenodd" /></svg>
                    </ToolbarButton>
                    <ToolbarButton onClick={createLink} title="Inserir Link">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.665l3-3z" /><path d="M8.603 16.103a4 4 0 005.657-5.657l-1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a2.5 2.5 0 01-3.536-3.536l3-3a2.5 2.5 0 013.536 3.536.75.75 0 001.138-.977 4 4 0 00-5.865-.225l-3 3a4 4 0 005.656 5.656z" /></svg>
                    </ToolbarButton>
                </div>
                <div
                    ref={editorRef}
                    contentEditable={true}
                    onInput={updateHtmlContent}
                    className="post-body-container w-full min-h-[250px] p-4 border border-t-0 border-gray-300 rounded-b-md focus:outline-none"
                    style={{
                        lineHeight: 1.75,
                        color: '#374151',
                    }}
                >
                </div>
                <style>{`
                    .post-body-container h2 { font-size: 1.875rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; }
                    .post-body-container h3 { font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 1.5rem; margin-bottom: 1rem; }
                    .post-body-container p { margin-bottom: 1rem; }
                    .post-body-container a { color: #9333ea; text-decoration: underline; }
                    .post-body-container blockquote { border-left: 4px solid #a855f7; padding-left: 1rem; margin: 1.5rem 0; color: #4b5563; font-style: italic; }
                    .post-body-container ul, .post-body-container ol { list-style-position: inside; margin-bottom: 1.5rem; padding-left: 1rem; }
                `}</style>
            </Card>
            <Card title="Código HTML Gerado para o Blog">
                 <p className="text-sm text-gray-600 mb-2">Copie e cole este código no editor HTML do seu post no Blogger.</p>
                <CodeSnippet code={htmlContent} />
            </Card>
        </div>
    );
};

// --- GERADOR DE CÓDIGO HTML ---
const CodeExporter = ({ data }) => {
    const heroCode = useMemo(() => {
        const titleHtml = data.hero.title.replace(/\{(.*?)\}/g, `<span style="color:${data.hero.highlightColor}">$1</span>`);
        return `<section class='relative min-h-[70vh] flex items-center' id='inicio'>
  <div class='absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent'/>
  <div class='container relative mx-auto px-6 py-20 text-center'>
    <h1 class='text-4xl md:text-6xl font-extrabold leading-tight text-white' style='text-shadow: 2px 3px 5px rgba(0, 0, 0, 0.55);'>
      ${titleHtml}
    </h1>
    <p class='mt-6 text-lg md:text-xl text-white max-w-3xl mx-auto' style='text-shadow: 2px 2px 4px rgba(0,0,0,0.85);'>
      ${data.hero.subtitle}
    </p>
  </div>
</section>`;
    }, [data.hero]);

    const aboutCode = useMemo(() => {
        return `<div class='md:w-1/2 text-center md:text-left'>
  <p class='text-gray-700 leading-relaxed mb-4'>
    ${data.about.text1}
  </p>
  <p class='text-gray-700 leading-relaxed'>
    ${data.about.text2}
  </p>
  <a class='inline-block mt-8 bg-[#8E44AD] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#7d3c98] transition-transform transform hover:scale-105 shadow-lg' href='${data.about.buttonLink}'>
    ${data.about.buttonText}
  </a>
</div>
<div class='md:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-4'>
  ${data.directors.map(dir => `
  <a class='text-center group block' href='${dir.link}' target='_blank'>
    <img alt='Foto de ${dir.name}' class='w-32 h-32 mx-auto rounded-full object-cover shadow-lg group-hover:ring-4 transition-all duration-300' style='--hover-ring-color: ${dir.color};' src='${dir.image}'/>
    <h4 class='mt-4 font-bold group-hover:text-[var(--hover-ring-color)] transition-colors'>${dir.name}</h4>
  </a>`).join('')}
</div>
<style>
  .group:hover img {
    ring-color: var(--hover-ring-color);
  }
</style>
`;
    }, [data.about, data.directors]);
    
    const directorsPageCode = useMemo(() => {
        return data.directors.map(dir => `
<!-- Card Membro: ${dir.name} -->
<div class='bg-white rounded-lg shadow-md p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-300'>
    <img alt='Foto de ${dir.name}' class='w-32 h-32 mx-auto rounded-full object-cover ring-4 mb-4' style='ring-color: ${dir.color};' src='${dir.image}'/>
    <h3 class='text-xl font-bold text-gray-900'>${dir.name}</h3>
    <p class='font-semibold mb-3' style='color: ${dir.color};'>${dir.title}</p>
    <p class='text-gray-600 text-sm leading-relaxed flex-grow'>${dir.bio}</p>
    <!-- Adicione os links de contato aqui, se necessário -->
</div>
`).join('');
    }, [data.directors]);

    const projectsPageCode = useMemo(() => {
        return data.projects.map(proj => `
<!-- Card do Projeto: ${proj.title} -->
<div class='project-showcase-card' style='background-image: url(${proj.image});'>
    <div class='project-content'>
        <h2 class='text-3xl md:text-4xl font-bold mb-4'>${proj.title}</h2>
        <p class='text-lg mb-6'>
            ${proj.description}
        </p>
        <a class='inline-block bg-yellow-400 text-gray-900 font-bold px-8 py-3 rounded-md hover:bg-yellow-500 transition-transform transform hover:scale-105 shadow-lg text-lg' href='${proj.link}'>
            ${proj.buttonText}
        </a>
    </div>
</div>
`).join('\n\n');
    }, [data.projects]);

    return (
        <div>
            <Card title="Código para a Seção Principal (Hero)">
                <p className="text-sm text-gray-600 mb-2">Substitua o conteúdo dentro da tag <code>&lt;section id='inicio'&gt;...&lt;/section&gt;</code> na sua página inicial.</p>
                <CodeSnippet code={heroCode} />
            </Card>
            <Card title="Código para a Seção 'Quem Somos'">
                <p className="text-sm text-gray-600 mb-2">Substitua o conteúdo dentro do <code>&lt;div class='flex flex-col md:flex-row ...'&gt;</code> na seção 'Quem Somos'.</p>
                <CodeSnippet code={aboutCode} />
            </Card>
             <Card title="Código para a Página 'Sobre Nós' (Equipe)">
                <p className="text-sm text-gray-600 mb-2">Use estes cards para substituir a seção da equipe na página 'Sobre Nós'.</p>
                <CodeSnippet code={directorsPageCode} />
            </Card>
            <Card title="Código para a Página 'Nossos Projetos'">
                <p className="text-sm text-gray-600 mb-2">Use este código para substituir o conteúdo dentro do <code>&lt;div class='space-y-12'&gt;...&lt;/div&gt;</code> na página de projetos.</p>
                <CodeSnippet code={projectsPageCode} />
            </Card>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL (APP) ---

export default function App() {
    const [data, setData] = useState(INITIAL_DATA);
    const [activeTab, setActiveTab] = useState('siteEditor'); // siteEditor, blogEditor, codeExporter

    const renderContent = () => {
        switch (activeTab) {
            case 'siteEditor':
                return <SiteEditor data={data} setData={setData} />;
            case 'blogEditor':
                return <BlogEditor />;
            case 'codeExporter':
                return <CodeExporter data={data} />;
            default:
                return <SiteEditor data={data} setData={setData} />;
        }
    };
    
    const TabButton = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tabName
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Editor Visual Mairiurbe</h1>
                    <div className="flex items-center space-x-2 p-1 bg-gray-200 rounded-lg">
                        <TabButton tabName="siteEditor" label="📝 Editor do Site" />
                        <TabButton tabName="blogEditor" label="✍️ Editor de Blog" />
                        <TabButton tabName="codeExporter" label=" </> Exportar Código" />
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8">
                {renderContent()}
            </main>
        </div>
    );
}
