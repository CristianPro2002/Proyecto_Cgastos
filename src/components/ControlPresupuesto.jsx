import { useState, useEffect } from "react";
import { formatearCantidad } from "../helpers";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(presupuesto);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => total + gasto.cantidad,
      0
    ); //reduce lo que hace es recorrer el array y sumar los valores de la propiedad cantidad
    const totalDisponible = presupuesto - totalGastado;
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);
    setGastado(totalGastado);
    setDisponible(totalDisponible);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1200);
  }, [gastos]);

    const handleResetApp = () => {
        const resultado = confirm("¿Estás seguro de querer resetear la app?");
        if (resultado) {
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);
        }
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "red" : "#00bfa5",
            trailColor: "#d6d6d6",
            textColor: porcentaje > 100 ? "red" : "#00bfa5",
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>Resetear App</button>
        <p>
          <span>Presupuesto: </span>
          {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span>
          {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
