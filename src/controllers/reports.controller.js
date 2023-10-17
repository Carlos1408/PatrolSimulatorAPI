const prisma = require("../libs/prisma");
const PDF = require("pdfkit-construct");
const { v4: uuid } = require("uuid");
const path = require("path");

const date = new Date();

const day = date.getDate();

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const month = months[date.getMonth()];

const year = date.getFullYear();

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
      totalTime: `${Math.trunc(patrol.totalSeconds / 60)}m ${
        patrol.totalSeconds % 60
      }s`,
    };
  });

  sendPDF(req, res, fields, rows, "REPORTE DE PATRULLAJES");
};

const recognitions = async (req, res) => {
  const fields = [
    { key: "date", label: "Fecha", align: "left" },
    { key: "userName", label: "Nombre", align: "left" },
    { key: "userLastName", label: "Apellido", align: "left" },
    //{ key: "userEmail", label: "Correo Electronico", align: "left" },
    { key: "mapName", label: "Mapa", align: "left" },
    { key: "totalTime", label: "Tiempo total", align: "left" },
    {
      key: "formationsQualification",
      label: "Calif. de formaciones",
      align: "left",
    },
    {
      key: "techniquesRecognitionsQualifications",
      label: "Calif. de recon.",
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
      //userEmail: recognition.patrol.user.email,
      mapName: recognition.patrol.map.name,
      totalTime: `${Math.trunc(recognition.patrol.totalSeconds / 60)}m ${
        recognition.patrol.totalSeconds % 60
      }s`,
      formationsQualification: recognition.formationsQualification,
      techniquesRecognitionsQualifications:
        recognition.techniquesRecognitionsQualifications,
      qualification: recognition.qualification.toFixed(1),
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
      totalTime: `${Math.trunc(ambush.patrol.totalSeconds / 60)}m ${
        ambush.patrol.totalSeconds % 60
      }s`,
      formation: ambush.formation,
      qualification: ambush.qualification.toFixed(1),
    };
  });

  sendPDF(req, res, fields, rows, "REPORTE DE PATRULLAJES DE EMBOSCADA");
};

const combats = async (req, res) => {
  const fields = [
    { key: "date", label: "Fecha", align: "left" },
    { key: "userName", label: "Nombre", align: "left" },
    { key: "userLastName", label: "Apellido", align: "left" },
    //{ key: "userEmail", label: "Correo Electronico", align: "left" },
    { key: "mapName", label: "Mapa", align: "left" },
    { key: "totalTime", label: "Tiempo total", align: "left" },
    { key: "q_enemies", label: "Nro. Enemigos", align: "left" },
    { key: "q_friend_deaths", label: "Bajas amigas", align: "left" },
    { key: "q_enemy_deaths", label: "Bajas enemigas", align: "left" },
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
      //userEmail: combat.patrol.user.email,
      mapName: combat.patrol.map.name,
      totalTime: `${Math.trunc(combat.patrol.totalSeconds / 60)}m ${
        combat.patrol.totalSeconds % 60
      }s`,
      q_enemies: combat.q_enemies,
      q_friend_deaths: combat.q_friend_deaths,
      q_enemy_deaths: combat.q_enemy_deaths,
      player_dead: combat.player_dead ? "Si" : "No",
      qualification: combat.qualification.toFixed(1),
    };
  });

  sendPDF(req, res, fields, rows, "REPORTE DE COMBATES");
};

function sendPDF(req, res, fields, rows, title) {
  const doc = new PDF({
    margins: { top: 20, left: 30, right: 30, bottom: 20 },
    bufferPages: true,
  });
  //generateHeader(doc)
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
  // doc.setDocumentHeader({}, () => {
  //   doc.text(title, {
  //     width: 420,
  //     height: 500,
  //     align: "center",
  //   });
  // });

  doc.setDocumentHeader({ height: "15%" }, () => {
    doc
      .image(path.resolve("./src/assets/images/EMI Logo2.jpeg"), 50, 50, {
        width: 100,
      })
      .fontSize(10)
      .text((format2 = `${day} de ${month}, ${year}`), 0, 65, {
        align: "right",
      })
      .text("Lanza entre La Paz y Oruro", 0, 80, { align: "right" })
      .moveDown(2);
  });
  doc
    .font("Helvetica-Bold")
    .text(title, 0, 105, {
      align: "center",
    })
    .fontSize(40);

  doc.addTable(fields, rows, {
    border: null,
    width: "fill_body",
    headHeight: 30,
    striped: true,
    stripedColors: ["#dcdcdc", "#c8c8c8"],
    cellsPadding: 3,
    marginLeft: 0,
    marginRight: 0,
    headAlign: "left",
    cellsMaxWidth: 50,
  });
  doc.render();

  doc.end();
}

function generateHeader(doc) {
  doc
    .image(path.resolve("./src/assets/images/EMI Logo2.jpeg"), 50, 50, {
      width: 150,
    })
    .fontSize(10)
    .text(Date.now(), 200, 65, { align: "right" })
    //.text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

module.exports = { patrols, recognitions, ambushes, combats };
