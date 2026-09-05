import { DEFAULT_PT } from "@/helpers/fontSize";
import { uid } from "@/helpers/uid";
import type { ResumeData } from "@/types";

export const PRESETS = [
  "#1e2330",
  "#1a3a5c",
  "#7b1f2e",
  "#1a4a2e",
  "#4a1f6b",
  "#8b4a00",
  "#005f73",
  "#3d1c00",
];

export const DEFAULT: ResumeData = {
  name: "Joao Silva",
  title: "Project Manager",
  phone: "+55 11 98765-4321",
  email: "joao.silva@email.com.br",
  website: "www.joaosilva.com.br",
  address: "Av. Paulista, 1000 – São Paulo, SP",
  about:
    "Profissional apaixonada por gestão de projetos com mais de 7 anos de experiência liderando equipes multidisciplinares. Habilidade comprovada em entregar resultados dentro do prazo e orçamento, com foco em inovação e qualidade. Certificada em PMP e Scrum Master.",
  accentColor: "#1e2330",
  fontSizePt: DEFAULT_PT,
  photo: null,
  experiences: [
    {
      id: uid(),
      title: "Gerente de Design de Produto",
      company: "Nexus Industries",
      location: "São Paulo, SP",
      period: "2020 – 2023",
      bullets: [
        {
          id: uid(),
          text: "Liderou equipe de 12 designers entregando projetos com 35% de redução no time-to-market.",
        },
        {
          id: uid(),
          text: "Implementou design system unificado adotado por 8 produtos, reduzindo retrabalho em 60%.",
        },
      ],
    },
    {
      id: uid(),
      title: "Gerente de Marketing",
      company: "Nexus Industries",
      location: "São Paulo, SP",
      period: "2018 – 2020",
      bullets: [
        {
          id: uid(),
          text: "Desenvolveu estratégias de go-to-market para 3 lançamentos com ROI médio de 280%.",
        },
        {
          id: uid(),
          text: "Coordenou equipe de 15 pessoas e gerenciou orçamento de R$ 2M em 4 campanhas.",
        },
      ],
    },
    {
      id: uid(),
      title: "Coordenador de Projetos",
      company: "Valore Consultoria",
      location: "Rio de Janeiro, RJ",
      period: "2016 – 2018",
      bullets: [
        {
          id: uid(),
          text: "Implementou metodologia ágil em 5 clientes, aumentando satisfação em 45%.",
        },
      ],
    },
    {
      id: uid(),
      title: "Analista de Marketing",
      company: "Valore Consultoria",
      location: "Rio de Janeiro, RJ",
      period: "2015 – 2016",
      bullets: [
        {
          id: uid(),
          text: "Criou campanhas digitais que geraram 120% de aumento na geração de leads qualificados.",
        },
      ],
    },
  ],
  education: [
    {
      id: uid(),
      degree: "MBA em Gestão de Projetos",
      institution: "FGV – Fundação Getulio Vargas",
      period: "2020 – 2022",
    },
    {
      id: uid(),
      degree: "Bacharelado em Administração de Empresas",
      institution: "PUC-SP",
      period: "2011 – 2015",
    },
  ],
  skills: [
    { id: uid(), name: "Gestão de Projetos", level: 95 },
    { id: uid(), name: "Liderança", level: 92 },
    { id: uid(), name: "Pensamento Crítico", level: 88 },
    { id: uid(), name: "Marketing Digital", level: 80 },
    { id: uid(), name: "Negociação", level: 85 },
    { id: uid(), name: "Criatividade", level: 82 },
  ],
  languages: [
    { id: uid(), name: "Português (Nativo)" },
    { id: uid(), name: "Inglês (Fluente)" },
    { id: uid(), name: "Espanhol (Intermediário)" },
  ],
  references: [
    {
      id: uid(),
      name: "Carlos Ferreira",
      company: "Nexus Industries",
      phone: "+55 11 3333-4444",
      email: "c.ferreira@nexus.com",
    },
    {
      id: uid(),
      name: "Ana Rodrigues",
      company: "Valore Consultoria",
      phone: "+55 21 2222-3333",
      email: "ana.r@valore.com",
    },
  ],
};
