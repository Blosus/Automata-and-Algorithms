let estado = "q0";
let palabra = "";
let indice = 0;
let autoPlay = null;

const nombres = {
  q0: "Apagado", q1: "Encendido", q2: "Ligero", q3: "Medio",
  q4: "Grande", q5: "Suave", q6: "Fuerte", q7: "Drenar y Exprimir"
};

const claseEstado = {
  q0: "s-q0", q1: "s-q1", q2: "s-q2", q3: "s-q3",
  q4: "s-q4", q5: "s-q5", q6: "s-q6", q7: "s-q7"
};

const transiciones = {
  q0: { a: "q1" },
  q1: { a: "q2", b: "q3", c: "q4", d: "q7", e: "q0" },
  q2: { a: "q5", b: "q6" },
  q3: { a: "q5", b: "q6" },
  q4: { a: "q5", b: "q6" },
  q5: { a: "q7" },
  q6: { a: "q7" },
  q7: { a: "q1" }
};

const botonesPorEstado = {
  q0: [{ letra: "a", texto: "Encender (a)" }],
  q1: [
    { letra: "a", texto: "Ligero (a)" },
    { letra: "b", texto: "Medio (b)" },
    { letra: "c", texto: "Grande (c)" },
    { letra: "d", texto: "Drenar/Exprimir (d)" },
    { letra: "e", texto: "Apagar (e)" }
  ],
  q2: [{ letra: "a", texto: "Suave (a)" }, { letra: "b", texto: "Fuerte (b)" }],
  q3: [{ letra: "a", texto: "Suave (a)" }, { letra: "b", texto: "Fuerte (b)" }],
  q4: [{ letra: "a", texto: "Suave (a)" }, { letra: "b", texto: "Fuerte (b)" }],
  q5: [{ letra: "a", texto: "Drenar/Exprimir (a)" }],
  q6: [{ letra: "a", texto: "Drenar/Exprimir (a)" }],
  q7: [{ letra: "a", texto: "Volver a Encendido (a)" }]
};

// Referencias
const circle = document.getElementById("circle");
const circleText = document.getElementById("circleText");
const botonesDiv = document.getElementById("botones");
const estadoActual = document.getElementById("estadoActual");
const mensaje = document.getElementById("mensaje");
const entrada = document.getElementById("entrada");
const tape = document.getElementById("tape");
const sonido = document.getElementById("sound");

// Config sonido
sonido.volume = 0.25;

function playSound() {
  sonido.currentTime = 0;
  sonido.play().catch(() => {}); // el navegador puede bloquear el audio; no es un error
}

function actualizarUI() {
  circle.className = "circle " + claseEstado[estado];
  circleText.textContent = `${nombres[estado]} (${estado})`;
  estadoActual.textContent = `Estado actual: ${estado} (${nombres[estado]})`;

  botonesDiv.innerHTML = "";
  botonesPorEstado[estado].forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op.texto;
    btn.onclick = () => cambiarEstado(op.letra);
    botonesDiv.appendChild(btn);
  });
}

function cambiarEstado(letra) {
  const nuevo = transiciones[estado]?.[letra];
  playSound();

  if (nuevo) {
    estado = nuevo;
    actualizarUI();
    mensaje.textContent = "";
  } else {
    mensaje.textContent = `No se puede aplicar '${letra}' desde ${estado}`;
  }
}

// Cinta visual
function actualizarCinta() {
  tape.innerHTML = "";
  for (let i = 0; i < palabra.length; i++) {
    const c = document.createElement("div");
    c.className = "cell";
    c.textContent = palabra[i];
    if (i < indice) c.classList.add("done");
    if (i === indice) c.classList.add("active");
    tape.appendChild(c);
  }
}

// Procesamiento de palabra
function cargar() {
  const val = entrada.value.trim().toLowerCase();
  if (!val || !/^[abcde]+$/.test(val)) {
    mensaje.textContent = "Solo letras a-e.";
    return;
  }
  detenerAuto(); // evita que un modo Auto anterior siga sobre la palabra nueva
  palabra = val;
  indice = 0;
  estado = "q0";
  mensaje.textContent = "Palabra cargada correctamente.";
  actualizarUI();
  actualizarCinta();
}

function paso() {
  if (!palabra) return mensaje.textContent = "Carga una palabra primero.";
  if (indice >= palabra.length) return verificarFinal();

  const letra = palabra[indice];
  const nuevo = transiciones[estado]?.[letra];
  playSound();

  if (nuevo) {
    estado = nuevo;
    indice++;
    actualizarUI();
    actualizarCinta();

    if (indice >= palabra.length) verificarFinal();
  } else {
    mensaje.textContent = `No hay transición con '${letra}' desde ${estado}`;
    detenerAuto();
  }
}

function auto() {
  if (!palabra) return mensaje.textContent = "Carga una palabra primero.";
  detenerAuto();
  autoPlay = setInterval(() => {
    if (indice >= palabra.length) {
      verificarFinal();
      detenerAuto();
    } else paso();
  }, 600);
}

function detenerAuto() {
  clearInterval(autoPlay);
}

function verificarFinal() {
  if (estado === "q0") {
    mensaje.textContent = "Palabra válida y termina en q0 (Apagado).";
  } else {
    mensaje.textContent = "Palabra válida pero no termina en q0.";
  }
}

function reset() {
  detenerAuto();
  palabra = "";
  indice = 0;
  estado = "q0";
  entrada.value = "";
  mensaje.textContent = "";
  tape.innerHTML = "";
  actualizarUI();
}

// Eventos
document.getElementById("btnCargar").onclick = cargar;
document.getElementById("btnPaso").onclick = paso;
document.getElementById("btnAuto").onclick = auto;
document.getElementById("btnReset").onclick = reset;

actualizarUI();
