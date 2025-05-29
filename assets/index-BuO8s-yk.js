(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&d(r)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function d(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const l=document.getElementById("dropZone");l.addEventListener("dragover",i=>{i.preventDefault(),l.classList.add("dragover")});l.addEventListener("dragleave",()=>{l.classList.remove("dragover")});l.addEventListener("drop",async i=>{var e;i.preventDefault(),l.classList.remove("dragover");const n=(e=i.dataTransfer)==null?void 0:e.files[0];if(!n)return;const d=(await n.text()).split(`
`);m(d)});function m(i){const n=new Set(["var","val","defu","if","else","for","match","case","_","obj","class"]),c=new Set(["String","Doub","bol","char","Int","Boolean","Arr"]),d=new Set(["=","+","-","*","/","%","(",")","{","}","[","]",",",";","->","<-",">=","<=","==","!="]),e=`
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
  `;document.body.innerHTML=e;const t=document.getElementById("resultadosBody");let r=0;for(const u of i){if(r++,!u.trim()||u.trim().startsWith("//")){t.innerHTML+=`
      <tr>
        <td>${r}</td>
        <td colspan="4"><em>Línea vacía o comentario ✅</em></td>
      </tr>
      `;continue}const v=u.split(/(\s+|"[^"]*"|'[^']'|[(),;{}[\]])/).filter(o=>o&&o.trim());let f=!0;for(const o of v){let s="",a=!1;n.has(o)?(s="Palabra reservada",a=!0):c.has(o)?(s="Tipo válido",a=!0):d.has(o)?(s="Símbolo válido",a=!0):/^"[^"]*"$/.test(o)?(s="Cadena válida",a=!0):/^'[^']'$/.test(o)?(s="Carácter válido",a=!0):/^[0-9]+(\.[0-9]+)?$/.test(o)?(s="Número válido",a=!0):/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(o)?(s="Identificador válido",a=!0):(s="Token no reconocido",a=!1,f=!1),t.innerHTML+=`
      <tr>
        <td>${r}</td>
        <td>${o}</td>
        <td>${s}</td>
        <td>${a?"✅":"❌"}</td>
        <td>${f?"✅":"❌"}</td>
      </tr>
      `}t.innerHTML+=`
    <tr class="${f?"table-success":"table-danger"}">
      <td>${r}</td>
      <td colspan="3"><strong>Resumen línea ${r}</strong></td>
      <td><strong>${f?"Línea válida ✅":"Línea inválida ❌"}</strong></td>
    </tr>
    `}}
