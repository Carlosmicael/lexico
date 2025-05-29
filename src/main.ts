const dropZone = document.getElementById("dropZone") as HTMLElement;

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault(); 
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", async (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragover");

  const file = event.dataTransfer?.files[0];
  if (!file) return;

  const text = await file.text();
  const lineas = text.split('\n');
  analizadorLexico(lineas);


});





function analizadorLexico(lineas: string[]): void {
  // Definiciones de tokens válidos (igual que antes)
  const palabrasReservadas = new Set(['var', 'val', 'defu', 'if', 'else', 'for', 'match', 'case', '_', 'obj', 'class']);
  const tiposDatos = new Set(['String', 'Doub', 'bol', 'char', 'Int', 'Boolean', 'Arr']);
  const simbolos = new Set(['=', '+', '-', '*', '/', '%', '(', ')', '{', '}', '[', ']', ',', ';', '->', '<-', '>=', '<=', '==', '!=']);
  
  // Crear tabla HTML
  const tablaHTML = `
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <h2 class="text-center mb-4">Resultados del Analizador Léxico</h2>
        <div class="table-responsive" style="max-height: 500px; overflow-y: auto;">
          <table class="table table-bordered table-striped table-hover">
            <thead class="table-dark" style="position: sticky; top: 0; z-index: 1;">
              <tr>
                <th>Línea</th>
                <th>Token</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody id="resultadosBody">
              <!-- Aquí se insertarán los resultados -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  `;

  // Insertar la tabla en el DOM
  document.body.innerHTML = tablaHTML;
  const tbody = document.getElementById('resultadosBody')!;

  let contadorLinea = 0;
  let contadorToken = 0;

  for (const linea of lineas) {
    contadorLinea++;
    //const lineaOriginal = linea;
    
    if (!linea.trim() || linea.trim().startsWith('//')) {
      // Insertar fila para línea vacía o comentario
      tbody.innerHTML += `
      <tr>
        <td>${contadorLinea}</td>
        <td colspan="4"><em>Línea vacía o comentario ✅</em></td>
      </tr>
      `;
      continue;
    }

    // Procesar tokens de la línea
    const tokens = linea.split(/(\s+|"[^"]*"|'[^']'|[(),;{}[\]])/).filter(t => t && t.trim());
    let lineaValida = true;
    //const resultados: TokenResult[] = [];

    for (const token of tokens) {
      contadorToken++;
      let tipo = '';
      let valido = false;

      if (palabrasReservadas.has(token)) {
        tipo = 'Palabra reservada';
        valido = true;
      } else if (tiposDatos.has(token)) {
        tipo = 'Tipo válido';
        valido = true;
      } else if (simbolos.has(token)) {
        tipo = 'Símbolo válido';
        valido = true;
      } else if (/^"[^"]*"$/.test(token)) {
        tipo = 'Cadena válida';
        valido = true;
      } else if (/^'[^']'$/.test(token)) {
        tipo = 'Carácter válido';
        valido = true;
      } else if (/^[0-9]+(\.[0-9]+)?$/.test(token)) {
        tipo = 'Número válido';
        valido = true;
      } else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token)) {
        tipo = 'Identificador válido';
        valido = true;
      } else {
        tipo = 'Token no reconocido';
        valido = false;
        lineaValida = false;
      }

      // Añadir fila por cada token
      tbody.innerHTML += `
      <tr>
        <td>${contadorLinea}</td>
        <td>${token}</td>
        <td>${tipo}</td>
        <td>${valido ? '✅' : '❌'}</td>
        <td>${lineaValida ? '✅' : '❌'}</td>
      </tr>
      `;
    }

    // Añadir fila de resumen para la línea
    tbody.innerHTML += `
    <tr class="${lineaValida ? 'table-success' : 'table-danger'}">
      <td>${contadorLinea}</td>
      <td colspan="3"><strong>Resumen línea ${contadorLinea}</strong></td>
      <td><strong>${lineaValida ? 'Línea válida ✅' : 'Línea inválida ❌'}</strong></td>
    </tr>
    `;
  }
}





