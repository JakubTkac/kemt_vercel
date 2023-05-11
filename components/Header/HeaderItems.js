export const katedraDropdownItems = [
  {
    id: 1,
    title: "O nás",
    titleEN: "About us",
    path: "/o-nas",
  },
  {
    id: 2,
    title: "História v skratke",
    titleEN: "History",
    path: "/historia",
  },
  {
    id: 3,
    title: "Výročné správy",
    titleEN: "Annual reports",
    path: "/vyrocne-spravy",
  },
  {
    id: 4,
    title: "Oznamy",
    titleEN: "Notices",
    path: "/oznamy",
  },
  {
    id: 5,
    title: "Udalosti",
    titleEN: "Events",
    path: "/udalosti",
  },
  {
    id: 6,
    title: "Novinky",
    titleEN: "News",
    path: "/novinky",
  },
];
export const studiumDropdownItems = [
  {
    id: 1,
    title: "Študijné programy",
    titleEN: "Study programmes",
    path: "/studijne-programy",
  },
  {
    id: 2,
    title: "Študijné predmety",
    titleEN: "Study subjects",
    path: "/predmety",
  },
  {
    id: 3,
    title: "Bakalárska práca",
    titleEN: "Bachelor's work",
    path: "/studium/bakalarska-praca",
  },
  {
    id: 4,
    title: "Diplomové práce",
    titleEN: "Master's work",
    path: "/studium/diplomova-praca",
  },
];

export const vedaDropdownItems = [
  // {
  //   id: 1,
  //   title: "Výskumné skupiny",
  //   titleEN: "Research groups",
  //   path: "../",
  // },
  {
    id: 2,
    title: "Projekty",
    titleEN: "Projects",
    path: "/projekty",
  },
  {
    id: 3,
    title: "Publikácie",
    titleEN: "Publications",
    path: "/publikacie",
  },
];

export const headerItems = [
  {
    id: 1,
    title: "Katedra",
    titleEN: "Department",
    path: "/o-nas",
    dropdownItems: katedraDropdownItems,
  },
  {
    id: 2,
    title: "Personál",
    titleEN: "The staff",
    path: "/organizacia",
  },
  {
    id: 3,
    title: "Štúdium",
    titleEN: "The study",
    path: "/studijne-programy",
    dropdownItems: studiumDropdownItems,
  },
  {
    id: 4,
    title: "Veda a výskum",
    titleEN: "Science and research",
    path: "/projekty",
    dropdownItems: vedaDropdownItems,
  },
  {
    id: 5,
    title: "Dokumenty",
    titleEN: "Documents",
    path: "/dokumenty",
  },
  {
    id: 6,
    title: "Kontakt",
    titleEN: "Contact",
    path: "/kontakt",
  },
];
