import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import template from "../../Assets/template.docx";
import expressions from "angular-expressions";
import { assign } from "lodash";

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

expressions.filters.lower = function (input) {
  // * Make sure that if your input is undefined, your
  // * output will be undefined as well and will not
  // * throw an error
  if (!input) return input;
  return input.toLowerCase();
};
function angularParser(tag) {
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

export const generateDocument = () => {
  loadFile(template, function (error, content) {
    if (error) {
      throw error;
    }
    var zip = new PizZip(content);
    var doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      parser: angularParser,
      // * I passed the options to the library
    });
    try {
      // * render the document (replace all occurences key-value
      doc.render({
        // * Inside here i replace all
        users: [],
      });
    } catch (error) {
      // ! The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
      function replaceErrors(key, value) {
        if (value instanceof Error) {
          return Object.getOwnPropertyNames(value).reduce(function (error, key) {
            error[key] = value[key];
            return error;
          }, {});
        }
        return value;
      }
      console.log(JSON.stringify({ error: error }, replaceErrors));

      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors
          .map(function (error) {
            return error.properties.explanation;
          })
          .join("\n");
        console.log("errorMessages", errorMessages);
        //! errorMessages is a humanly readable message looking like this :
        // ! 'The tag beginning with "foobar" is unopened'
      }
      throw error;
    }
    var out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }); // * Output the document using Data-URI
    saveAs(out, "output.docx"); // * Save the file
  });
};
