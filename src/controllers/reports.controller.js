const prisma = require("../libs/prisma");
const PDF = require("pdfkit-construct");
const { v4: uuid } = require("uuid");

const patrols = async (req, res) => {
  const fields = [
    { key: "date", label: "Fecha", align: "left" },
    { key: "userName", label: "Nombre", align: "left" },
    { key: "userLastName", label: "Apellido", align: "left" },
    { key: "userEmail", label: "Correo Electronico", align: "left" },
    { key: "mapName", label: "Mapa", align: "left" },
    { key: "totalTime", label: "Tiempo total", align: "left" },
  ];

  const patrols = await prisma.patrol.findMany({
    include: {
      user: true,
      map: true,
      recognitionResult: true,
      ambushResult: true,
      combatResult: true,
    },
  });

  const rows = patrols.map((patrol) => {
    return {
      date: `${patrol.created.getDate()}/${patrol.created.getMonth()}/${patrol.created.getFullYear()}`,
      userName: patrol.user.name,
      userLastName: patrol.user.lastName,
      userEmail: patrol.user.email,
      mapName: patrol.map.name,
      totalTime: patrol.totalSeconds,
    };
  });

  sendPDF(req, res, fields, rows, "REPORTE DE PATRULLAJES");
};

const recognitions = async (req, res) => {
  const fields = [
    { key: "date", label: "Fecha", align: "left" },
    { key: "userName", label: "Nombre", align: "left" },
    { key: "userLastName", label: "Apellido", align: "left" },
    { key: "userEmail", label: "Correo Electronico", align: "left" },
    { key: "mapName", label: "Mapa", align: "left" },
    { key: "totalTime", label: "Tiempo total", align: "left" },
    {
      key: "formationsQualification",
      label: "Calificación de formaciones",
      align: "left",
    },
    {
      key: "techniquesRecognitionsQualifications",
      label: "Calificación de tec. de recon.",
      align: "left",
    },
    { key: "qualification", label: "Calificación final", align: "left" },
  ];

  const recognitions = await prisma.recognitionResult.findMany({
    include: {
      patrol: { include: { user: true, map: true } },
    },
  });
  const rows = recognitions.map((recognition) => {
    return {
      date: `${recognition.patrol.created.getDate()}/${recognition.patrol.created.getMonth()}/${recognition.patrol.created.getFullYear()}`,
      userName: recognition.patrol.user.name,
      userLastName: recognition.patrol.user.lastName,
      userEmail: recognition.patrol.user.email,
      mapName: recognition.patrol.map.name,
      totalTime: recognition.patrol.totalSeconds,
      formationsQualification: recognition.formationsQualification,
      techniquesRecognitionsQualifications:
        recognition.techniquesRecognitionsQualifications,
      qualification: recognition.qualification,
    };
  });

  sendPDF(req, res, fields, rows, "REPORTE DE PATRULLAJES DE RECONOCIMIENTO");
};

const ambushes = async (req, res) => {
  const fields = [
    { key: "date", label: "Fecha", align: "left" },
    { key: "userName", label: "Nombre", align: "left" },
    { key: "userLastName", label: "Apellido", align: "left" },
    { key: "userEmail", label: "Correo Electronico", align: "left" },
    { key: "mapName", label: "Mapa", align: "left" },
    { key: "totalTime", label: "Tiempo total", align: "left" },
    { key: "formation", label: "Formación", align: "left" },
    { key: "qualification", label: "Calificación", align: "left" },
  ];
  const ambushes = await prisma.ambushResult.findMany({
    include: { patrol: { include: { user: true, map: true } } },
  });

  const rows = ambushes.map((ambush) => {
    return {
      date: `${ambush.patrol.created.getDate()}/${ambush.patrol.created.getMonth()}/${ambush.patrol.created.getFullYear()}`,
      userName: ambush.patrol.user.name,
      userLastName: ambush.patrol.user.lastName,
      userEmail: ambush.patrol.user.email,
      mapName: ambush.patrol.map.name,
      totalTime: ambush.patrol.totalSeconds,
      formation: ambush.formation,
      qualification: ambush.qualification,
    };
  });

  sendPDF(req, res, fields, rows, "REPORTE DE PATRULLAJES DE EMBOSCADA");
};

const combats = async (req, res) => {
  const fields = [
    { key: "date", label: "Fecha", align: "left" },
    { key: "userName", label: "Nombre", align: "left" },
    { key: "userLastName", label: "Apellido", align: "left" },
    { key: "userEmail", label: "Correo Electronico", align: "left" },
    { key: "mapName", label: "Mapa", align: "left" },
    { key: "totalTime", label: "Tiempo total", align: "left" },
    { key: "q_enemies", label: "Cant. Enemigos", align: "left" },
    { key: "q_friend_deaths", label: "Cant. Bajas amigas", align: "left" },
    { key: "q_enemy_deaths", label: "Cant. Bajas enemigas", align: "left" },
    { key: "player_dead", label: "Jugador muerto", align: "left" },
    { key: "qualification", label: "Calificación", align: "left" },
  ];

  const combats = await prisma.combatResult.findMany({
    include: { patrol: { include: { user: true, map: true } } },
  });
  const rows = combats.map((combat) => {
    return {
      date: `${combat.patrol.created.getDate()}/${combat.patrol.created.getMonth()}/${combat.patrol.created.getFullYear()}`,
      userName: combat.patrol.user.name,
      userLastName: combat.patrol.user.lastName,
      userEmail: combat.patrol.user.email,
      mapName: combat.patrol.map.name,
      totalTime: combat.patrol.totalSeconds,
      q_enemies: combat.q_enemies,
      q_friend_deaths: combat.q_friend_deaths,
      q_enemy_deaths: combat.q_enemy_deaths,
      player_dead: combat.player_dead ? "Si" : "No",
      qualification: combat.qualification,
    };
  });

  sendPDF(req, res, fields, rows, "REPORTE DE COMBATES");
};

function sendPDF(req, res, fields, rows, title) {
  const doc = new PDF({ bufferPages: true });
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-disposition": `attachment;filename=Reporte ${uuid()}.pdf`,
  });
  doc.on("data", (data) => {
    stream.write(data);
  });
  doc.on("end", () => {
    stream.end();
  });
  doc.setDocumentHeader({}, () => {
    doc.text(title, {
      width: 420,
      align: "center",
    });
  });

  doc.addTable(fields, rows, {
    border: null,
    width: "fill_body",
    striped: true,
    stripedColors: ["#aaaaaa", "#bbbbbb"],
    cellsPadding: 5,
    marginLeft: 30,
    marginRight: 30,
    headAlign: "left",
  });
  doc.render();

  doc.end();
}

module.exports = { patrols, recognitions, ambushes, combats };
