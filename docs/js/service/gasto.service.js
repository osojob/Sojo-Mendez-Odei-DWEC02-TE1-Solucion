import { GASTOS_DB } from "../data/gasto.data.js";
import { GastoCombustible } from "../model/gasto.model.js";

var gastoAnual = {
  2020 : 0,
  2019 : 0,
  2018 : 0,
  2017 : 0,
  2016 : 0,
  2015 : 0
};

function almacenarGastos() {
  // Recorremos GASTOS_DB y guardamos el id como clave + guardamos como cadena de texto
  for (const gasto of GASTOS_DB) {
    localStorage.setItem(gasto.id, JSON.stringify(gasto));

    // Extraemos el año y guardamos en una constante
    const anio = gasto.date.getFullYear();

    // Sumamos el precio del viaje por año
    gastoAnual[anio] += gasto.precioViaje;
  }

  // Creamos otro bucle para recorrer los años y meterlos en sessionStorage
  for (const anio in gastoAnual) {
    sessionStorage.setItem(anio, gastoAnual[anio].toFixed(2));
  }
}

function procesarGasto(jsonNuevoGasto){
  // Convertimos el JSON a datos JS
  const datosGasto = JSON.parse(jsonNuevoGasto);

  // Pasamos por el constructor de la clase GastoCombustible y creamos un nuevo objeto
  const nuevoGasto = new GastoCombustible(
    datosGasto.id,
    datosGasto.vehicleType,
    datosGasto.date,
    datosGasto.kilometers,
    datosGasto.precioViaje
  );

  // Obtenemos el año y sacamos el dato + convertimos a un decimal. Por defecto ponemos 0 para que no de null
  const anio = nuevoGasto.date.getFullYear();
  let totalActualAnio = parseFloat(sessionStorage.getItem(anio)) || 0;

  // Sumamos el precio del viaje nuevo al total y guardamos el valor
  totalActualAnio += nuevoGasto.precioViaje;

  // Actualizamos en sessionStorage con el nuevo valor para que aparezca con dos decimales
  sessionStorage.setItem(anio, totalActualAnio.toFixed(2));
}

// Agrupamos y exportamos las funciones en el objeto para usarlas en el main
export const GastoService = {
  almacenarGastos,
  procesarGasto
}