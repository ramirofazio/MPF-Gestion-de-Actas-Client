import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import expressions from "angular-expressions";
import { assign } from "lodash";
import template from "../../Assets/template.docx";

function generateDoc() {
  const currentActa = JSON.parse(localStorage.getItem("finalActa"));
  const actaFlag = localStorage.getItem("actaFlag");
  console.log(currentActa);

  const { Bolsas, Integrantes } = currentActa;
  const { observaciones, solicitante, nro_mpf, nro_coop, nro_causa, caratula, fecha } = currentActa;
  console.log(observaciones);
  console.log(currentActa);
  const Efectos = [];
  Bolsas.map((bolsa) => {
    return bolsa.Efectos.map((efecto) => {
      efecto.nroPrecintoBolsa = bolsa.nroPrecinto;
      Efectos.push(efecto);
    });
  });

  function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
  }

  function replaceErrors(key, value) {
    if (value instanceof Error) {
      return Object.getOwnPropertyNames(value).reduce(function (error, key) {
        error[key] = value[key];
        return error;
      }, {});
    }
    return value;
  }

  expressions.filters.lower = function (input) {
    // * Make sure that if your input is undefined, your
    // * output will be undefined as well and will not
    // * throw an error
    if (!input) return input;
    return input.toLowerCase();
  };
  function angularParser(tag) {
    //eslint-disable-next-line
    tag = tag.replace(/^\.$/, "this").replace(/(’|‘)/g, "'").replace(/(“|”)/g, '"');
    const expr = expressions.compile(tag);
    return {
      get: function (scope, context) {
        let obj = {};
        const scopeList = context.scopeList;
        const num = context.num;
        for (let i = 0, len = num + 1; i < len; i++) {
          obj = assign(obj, scopeList[i]);
        }
        return expr(scope, obj);
      },
    };
  } // ? IDK what this Function do, but its need to the conditions to work...

  loadFile(template, function (error, content) {
    if (error) {
      throw error;
    }
    var zip = new PizZip(content);
    var doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      parser: angularParser,
    });
    doc.setData({
      encabezadoFlag: actaFlag,
      dias: fecha.substring(0, 2),
      mes: fecha.substring(3, 5),
      anio: fecha.substring(6, 10),
      hora: fecha.substring(12, 17),
      solicitante: solicitante,
      nro_mpf: nro_mpf,
      nro_coop: nro_coop,
      nro_causa: nro_causa,
      caratula: caratula,
      integrantes: Integrantes,
      bolsas: Bolsas,
      efectos: Efectos,
      actaObservaciones: observaciones,
    });
    try {
      doc.render();
    } catch (error) {
      console.log(JSON.stringify({ error: error }, replaceErrors));

      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors
          .map(function (error) {
            return error.properties.explanation;
          })
          .join("\n");
        console.log("errorMessages", errorMessages);
        // errorMessages is a humanly readable message looking like this :
        // 'The tag beginning with "foobar" is unopened'
      }
      throw error;
    }
    var out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }); //Output the document using Data-URI
    saveAs(out, `Acta${currentActa.id}.docx`);
    window.location.assign("/");
  });
}

export default generateDoc;
