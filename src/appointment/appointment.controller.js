import Pet from "../pet/pet.model.js";
import Appointment from "../appointment/appointment.model.js";
import { parse } from "date-fns";

export const saveAppointment = async (req, res) => {
  try {
    const data = req.body;

    const isoDate = new Date(data.date);

    if (isNaN(isoDate.getTime())) {
      return res.status(400).json({
        success: false,
        msg: "Fecha inválida",
      });
    }

    const pet = await Pet.findOne({ _id: data.pet });
    if (!pet) {
      return res.status(404).json({ 
        success: false, 
        msg: "No se encontró la mascota" 
      });
    }

    const existAppointment = await Appointment.findOne({
      pet: data.pet,
      user: data.user,
      date: {
        $gte: new Date(isoDate).setHours(0, 0, 0, 0),
        $lt: new Date(isoDate).setHours(23, 59, 59, 999),
      },
    });

    if (existAppointment) {
      return res.status(400).json({
        success: false,
        msg: "El usuario y la mascota ya tienen una cita para este día",
      });
    }

    const appointment = new Appointment({ ...data, date: isoDate });
    await appointment.save();

    return res.status(200).json({
      success: true,
      msg: `Cita creada exitosamente en fecha ${data.date}`,
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: false, 
      msg: "Error al crear la cita", 
      error 
    });
  }
};


export const getAppointments = async (req, res) => {
  try{
    const query = { status: `CREATED` }
  
      const { limite = 5, desde = 0 } = req.query


      const [total, appointment ] = await Promise.all([
          Appointment.countDocuments(query),
          Appointment.find(query)
              .skip(Number(desde))
              .limit(Number(limite))
      ])

      return res.status(200).json({
          success: true,
          total,
          appointment
      })
  }catch(err){
      return res.status(500).json({
          success: false,
          message: "Error al obtener las citas ",
          error: err.message
      })
  }
};

export const cancelAppointment = async (req, res) => {
  try {
      const { id } = req.params;

      // Buscamos la cita por el id 
      const appointment = await Appointment.findById(id);
      if (!appointment) {
          return res.status(404).json({ message: "Cita no encontrada" });
      }

      // Cambiamos el estado a cancelled
      appointment.status = `CANCELLED`;
      await appointment.save();

      res.json({ message: "Cita cancelada correctamente", appointment });
  } catch (error) {
      res.status(500).json({ message: "Error al cancelar la cita", error });
  }
};



export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de la cita desde los parámetros
        const updates = req.body; // Obtener los datos que se actualizarán

        // Buscar la cita por ID
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }

        // Actualizar la cita con los datos enviados
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, updates, { new: true });

        res.json({ message: "Cita actualizada correctamente", updatedAppointment });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la cita", error });
    }
};

