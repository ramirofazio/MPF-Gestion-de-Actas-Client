export function HerramientasSoft() {
  return (
    <>
      <option value="">Seleccione Herramienta</option>
      <option value="Cellebrite, UFED 4PC">UFED 4PC</option>
      <option value="Cellebrite, UFED PREMIUM">UFED PREMIUM</option>
      <option value="Magnet, AXIOM">AXIOM</option>
      <option value="Opentext, ENCASE">ENCASE</option>
      <option value="Grayshift, GREYKEY">GREYKEY</option>
      <option value="Magnet, DVR EXAMINER">DVR EXAMINER</option>
      <option value="TABLEAU TX1">TABLEAU TX1</option>
      <option value="TABLEAU TD3">TABLEAU TD3</option>
      <option value="TABLEAU FORENSIC BRIDGE (bloqueador de escritura)">TABLEAU FORENSIC BRIDGE (bloqueador de escritura)</option>
    </>
  );
}

export function TipoElemento() {
  return (
    <>
      <option value="">Tipo de Elemento</option>
      <option value="celular">Celular</option>
      <option value="tablet">Tablet</option>
      <option value="notebook">Notebook</option>
      <option value="gabinete">Gabinete</option>
      <option value="unidad de almacenamiento">Unidad de Almacenamiento</option>
      <option value="dvr">DVR</option>
      <option value="disco">Disco</option>
      <option value="sim">Sim</option>
      <option value="no peritable">No Peritable</option>
    </>
  );
}

export function TipoDisco() {
  return (
    <>
      <option value="">Rígido / Solido</option>
      <option value="Disco Rígido">Disco Rígido</option>
      <option value="Disco Solido">Disco Solido</option>
      <option value="Disco Solido en Formato M.2">Disco Solido M.2</option>
      <option value="Disco Solido en Formato NVMe">Disco Solido NVMe</option>
    </>
  );
}

export function DetalleUnidad() {
  return (
    <>
      <option value="">Seleccione</option>
      <option value="Pendrive">Pendrive</option>
      <option value="Tarjeta SD">Tarjeta SD</option>
      <option value="DVD">Disco DVD</option>
      <option value="CD">Disco CD</option>
    </>
  );
}

export function Colors() {
  return (
    <>
      <option value="">Seleccione un Color</option>
      <option value="negro">Negro</option>
      <option value="blanco">Blanco</option>
      <option value="gris">Gris</option>
      <option value="rojo">Rojo</option>
      <option value="azul">Azul</option>
      <option value="celeste">Celeste</option>
      <option value="verde">Verde</option>
      <option value="amarillo">Amarillo</option>
      <option value="naranja">Naranja</option>
      <option value="morado">Morado</option>
      <option value="lila">Lila</option>
      <option value="rosado">Rosado</option>
      <option value="marrón">Marrón</option>
      <option value="turquesa">Turquesa</option>
      <option value="plateado">Plateado</option>
      <option value="dorado">Dorado</option>
    </>
  );
}

export function YesOrNo() {
  return (
    <>
      <option value="">Si / No</option>
      <option value="si">Si</option>
      <option value="no">No</option>
    </>
  );
}

export function TipoSeguridad() {
  return (
    <>
      <option value="">Tipo de Seguridad</option>
      <option value="ninguna">Ninguna</option>
      <option value="patron">Patrón</option>
      <option value="PIN (Numérico)">Pin (Numérico)</option>
      <option value="PIN (Alfanumérico)">Pin (Alfanumérico)</option>
      <option value="Cifrado de Inicio (PIN Numérico)">Cifrado de Inicio (PIN Numérico)</option>
      <option value="Cifrado de Inicio (Patrón)">Cifrado de Inicio (Patrón)</option>
    </>
  );
}

export function TipoExtracciones() {
  return (
    <>
      <option value="">Tipo de Extracción</option>
      <option value="ninguna">Ninguna</option>
      <option value="física">Física</option>
      <option value="lógica">Lógica</option>
      <option value="lógica  avanzada">Logica Avanzada</option>
      <option value="sistema de archivos">Sistema de Archivos</option>
      <option value="sistema de archivos parcial">Sistema de archivos Parcial</option>
      <option value="android backup">Android BackUp</option>
      <option value="apk downgrade">APK Downgrade</option>
    </>
  );
}

export function SuccessOrFail() {
  return (
    <>
      <option value="">Con Exito / Fallo</option>
      <option value="con exito">Con Exito</option>
      <option value="fallo">Fallo</option>
    </>
  );
}

export function States() {
  return (
    <>
      <option value="">Seleccione el Estado</option>
      <option value="completo">Completo</option>
      <option value="en proceso">En Proceso</option>
      <option value="peritado">Peritado</option>
    </>
  );
}
