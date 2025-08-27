import { Bloc } from "../types";

export const mockBlocs: Bloc[] = [
  {
    id: 1,
    name: "À Fleur de Peau",
    image: "/web-app-manifest-512x512.png",
    level: "7a",
    startPosition:
      "Assis, main droite sur la prise en réglette, main gauche sur le petit trou",
    description:
      "Un bloc technique avec un départ assis difficile. La séquence demande de la force dans les doigts et une bonne lecture du rocher. Passage obligé par la réglette du milieu.",
    location: {
      lat: 48.4184,
      lng: 2.6739,
      area: "Franchard Isatis",
    },
    comments: [
      {
        id: 1,
        user: "Marie L.",
        text: "Excellent bloc ! Le crux est vraiment dans le passage de la réglette. Prenez votre temps pour bien placer les pieds.",
        date: "2024-08-20",
      },
      {
        id: 2,
        user: "Thomas B.",
        text: "Magnifique ligne, très physique mais logique. À faire absolument !",
        date: "2024-08-18",
      },
    ],
    completed: true,
    completedDate: "15/08/2024",
  },
  {
    id: 2,
    name: "Le Toit de la Tortue",
    image: "/web-app-manifest-512x512.png",
    level: "6b",
    startPosition: "Debout, mains sur les prises du toit",
    description:
      "Bloc en dévers spectaculaire sous un toit rocheux. Demande de la force dans les bras et une bonne technique de rétablissement.",
    location: {
      lat: 48.4156,
      lng: 2.6702,
      area: "Rocher Canon",
    },
    comments: [
      {
        id: 1,
        user: "Julie M.",
        text: "Impressionnant ! La sortie du toit est vraiment engagée, mais quelle satisfaction !",
        date: "2024-08-22",
      },
    ],
    completed: true,
    completedDate: "20/08/2024",
  },
  {
    id: 3,
    name: "La Dalle aux Écureuils",
    image: "/web-app-manifest-512x512.png",
    level: "5c",
    startPosition: "Assis, mains en bas de la dalle",
    description:
      "Belle dalle d'adhérence avec quelques prises délicates. Parfait pour travailler l'équilibre et la confiance sur dalle.",
    location: {
      lat: 48.4201,
      lng: 2.6815,
      area: "Trois Pignons",
    },
    comments: [],
    completed: false,
  },
  {
    id: 4,
    name: "L'Angle Allain",
    image: "/web-app-manifest-512x512.png",
    level: "6a",
    startPosition: "Debout, mains sur l'arête",
    description:
      "Bloc classique de Fontainebleau sur une arête magnifique. Technique d'arête pure avec de beaux mouvements en opposition.",
    location: {
      lat: 48.4167,
      lng: 2.6689,
      area: "Cuvier Rempart",
    },
    comments: [
      {
        id: 1,
        user: "Pierre D.",
        text: "Un grand classique ! L'arête est magnifique et la gestuelle parfaite.",
        date: "2024-08-25",
      },
    ],
    completed: false,
  },
  {
    id: 5,
    name: "Préhension",
    image: "/web-app-manifest-512x512.png",
    level: "8a",
    startPosition: "Assis, mains sur les prises basses",
    description:
      "Bloc d'exception demandant une force maximale. Mouvement de jeté spectaculaire vers la prise finale. Réservé aux grimpeurs confirmés.",
    location: {
      lat: 48.4189,
      lng: 2.6745,
      area: "Franchard Isatis",
    },
    comments: [
      {
        id: 1,
        user: "Alex M.",
        text: "Bloc mythique ! Le jeté final est impressionnant mais il faut vraiment être au top physiquement.",
        date: "2024-08-21",
      },
      {
        id: 2,
        user: "Sophie R.",
        text: "J'ai travaillé ce bloc pendant des mois. La satisfaction quand on l'enchaîne est indescriptible !",
        date: "2024-08-19",
      },
    ],
    completed: false,
  },
];
