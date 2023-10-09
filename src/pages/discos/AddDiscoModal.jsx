import React from "react";
import { HerramientasSoft, Input, Select, States, SuccessOrFail, TipoDisco, YesOrNo } from "components/fields";

export function AddDiscoModal({ discos, setDiscos, setAddDiscoModal, toast }) {
  React.useEffect(() => {
    return () => {
      localStorage.setItem("currentDisco", null);
    };
  });

  const [disco, setDisco] = React.useState(
    JSON.parse(localStorage.getItem("currentDisco")) || {
      tipoDeDisco: "",
      marca: "",
      modelo: "",
      almacenamiento: "",
      serialNumber: "",
      adquisicion: "",
      herramientaSoftDisco: "",
      herramientaSoftDiscoVersion: "",
      estadoDisco: "",
      discoFallado: "",
      observacionFallaDisco: "",
    }
  );

  const handleDiscoSubmit = (e) => {
    e.preventDefault();
    if (disco.tipoDeDisco && disco.marca && disco.almacenamiento && disco.discoFallado && disco.estadoDisco) {
      setAddDiscoModal(false);
      setDiscos([...discos, disco]);
      setDisco({
        tipoDeDisco: "",
        marca: "",
        modelo: "",
        almacenamiento: "",
        serialNumber: "",
        adquisicion: "",
        herramientaSoftDisco: "",
        herramientaSoftDiscoVersion: "",
        estadoDisco: "",
        discoFallado: "",
        observacionFallaDisco: "",
      });
      if (disco.edit) {
        toast.success("¡Disco Editado con Exito!");
      } else {
        toast.success("¡Disco Guardado con Exito!");
      }
    } else {
      toast.error("¡Faltan datos necesarios para el Elemento!");
    }
  };

  console.log(disco);

  return (
    <>
      <header className="modalHeader">{disco.edit ? "Editar" : "Agregar"} Disco</header>
      <form data-aos="zoom-in" className="flex w-full flex-col justify-center p-5 pt-0" onSubmit={handleDiscoSubmit}>
        <Select
          label={"*Tipo de Disco"}
          options={<TipoDisco />}
          disabled={disco.edit}
          value={disco.tipoDeDisco}
          onChange={(e) => setDisco({ ...disco, tipoDeDisco: e.target.value })}
        />
        <Input
          label={"*Marca"}
          value={disco.marca}
          placeholder="Marca"
          onChange={(e) => setDisco({ ...disco, marca: e.target.value.toUpperCase() })}
        />
        <Input
          label={"Modelo"}
          value={disco.modelo}
          placeholder="Modelo"
          onChange={(e) => setDisco({ ...disco, modelo: e.target.value.toUpperCase() })}
        />
        <Input
          label={"Serial Nº"}
          value={disco.serialNumber}
          placeholder="Serial Nº"
          onChange={(e) => setDisco({ ...disco, serialNumber: e.target.value.toUpperCase() })}
        />
        <Input
          label={"*Almacenamiento"}
          value={disco.almacenamiento}
          placeholder="500 GB / 1 TB"
          onChange={(e) => setDisco({ ...disco, almacenamiento: e.target.value.toUpperCase() })}
        />
        <Select
          label={"Herramienta Soft"}
          options={<HerramientasSoft />}
          value={disco.herramientaSoftDisco}
          onChange={(e) => setDisco({ ...disco, herramientaSoftDisco: e.target.value })}
        />
        {disco.herramientaSoftDisco && (
          <Input
            label={"Versión Herramienta"}
            value={disco.herramientaSoftDiscoVersion}
            placeholder={"V0.00"}
            onChange={(e) => setDisco({ ...disco, herramientaSoftDiscoVersion: e.target.value })}
          />
        )}
        <Select
          label={"*¿El Disco Falla?"}
          options={<YesOrNo />}
          value={disco.discoFallado}
          onChange={(e) => setDisco({ ...disco, discoFallado: e.target.value })}
        />
        {disco.discoFallado === "si" && (
          <Input
            label={"Observacion Falla"}
            value={disco.observacionFallaDisco}
            placeholder="¿Por que Falla?"
            onChange={(e) => setDisco({ ...disco, observacionFallaDisco: e.target.value })}
          />
        )}

        <Select
          label={"*Estado"}
          options={<States />}
          value={disco.estadoDisco}
          onChange={(e) => setDisco({ ...disco, estadoDisco: e.target.value })}
        />

        {disco.herramientaSoftDisco !== "" && disco.discoFallado === "no" && disco.estadoDisco === "completo" && (
          <Select
            label={"Adquisición"}
            options={<SuccessOrFail />}
            value={disco.adquisicion}
            onChange={(e) => setDisco({ ...disco, adquisicion: e.target.value })}
          />
        )}
        <div className="mt-2 flex w-full items-center justify-around">
          <input className="submitBtn" type="submit" value="Guardar" />
        </div>
      </form>
    </>
  );
}
