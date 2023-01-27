import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import expressions from "angular-expressions";
import { assign } from "lodash";
import { toast } from "react-toastify";

import template from "../../../Assets/template.docx";

function generateDoc() {
  const currentActa = JSON.parse(localStorage.getItem("finalActa")); //* Nos traemos el acta del local storage
  const actaFlag = localStorage.getItem("actaFlag"); //* Nos traemos la flag del local storage

  const { Bolsas, Peritos, Integrantes, dias, mes, anio, hora } = currentActa; //* Sacamos las bolsas y los integrantes del acta
  const { observaciones, solicitante, nro_mpf, nro_coop, nro_causa, caratula } = currentActa; //* Desestructuramos el acta

  const Efectos = []; //* Array con todos los efectos con sus nroPrecintoBolsa

  Bolsas.map((bolsa) => {
    //* Mapeo de las bolsas
    return bolsa.Efectos.map((efecto) => {
      //* Mapeo de los efectos
      efecto.nroPrecintoBolsa = bolsa.nroPrecinto;
      Efectos.push(efecto);
      /*
       * Inyecto el nroPrecintoBolsa en cada efecto
       */
    });
  });

  if (Bolsas.length === 0 || Peritos.length === 0) {
    return toast.warning("¡Faltan datos para poder imprimir el Acta!");
  }

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
      dias: dias,
      mes: mes,
      anio: anio,
      hora: hora,
      solicitante: solicitante,
      nro_mpf: nro_mpf,
      nro_coop: nro_coop,
      nro_causa: nro_causa,
      caratula: caratula,
      peritos: Peritos,
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
    saveAs(out, `Acta_${currentActa.nro_mpf || currentActa.nro_coop}.docx`);
  });
}

export default generateDoc;
