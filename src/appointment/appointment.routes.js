import { Router } from "express";
import { saveAppointment,getAppointments,cancelAppointment,updateAppointment } from "./appointment.controller.js";
import { createAppointmentValidator } from "../middlewares/appointment-validators.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);
router.get("/", getAppointments);


router.put("/:id", updateAppointment); // Actualizar cita
router.patch("/:id", cancelAppointment); // Cancelar cita
export default router;