export function validateEfecto(efecto) {
  const { bolsa_id, tipoDeDisco, tipoDeElemento, estado, encendido, color, empresa, herramientaSoft, descripcionElemento } = efecto;

  switch (tipoDeElemento) {
    case "no peritable": {
      if (bolsa_id && descripcionElemento) {
        return true;
      }
      break;
    }
    case "sim": {
      if (bolsa_id && estado && empresa && herramientaSoft) {
        return true;
      }
      break;
    }
    case "celular": {
      if (bolsa_id && estado && encendido && color) {
        return true;
      }
      break;
    }
    case "tablet": {
      if (bolsa_id && estado && encendido && color) {
        return true;
      }
      break;
    }
    case "notebook": {
      if (bolsa_id && color) {
        return true;
      }
      break;
    }
    case "gabinete": {
      if (bolsa_id && color) {
        return true;
      }
      break;
    }
    case "unidad de almacenamiento": {
      if (bolsa_id && estado && color) {
        return true;
      }
      break;
    }
    case "dvr": {
      if (bolsa_id && estado) {
        return true;
      }
      break;
    }
    case "disco": {
      if (bolsa_id && tipoDeDisco && estado) {
        return true;
      }
      break;
    }
    default:
      return false;
  }
}
