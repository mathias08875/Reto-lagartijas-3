let horarios = ["08:00","18:00"];
let reps = 1;

self.addEventListener("install",()=>{self.skipWaiting();});
self.addEventListener("activate",()=>{self.clients.claim();});

self.addEventListener("message", e => {
  if(e.data.type==="CONFIG"){
    horarios = e.data.horarios;
    reps = e.data.reps;
  }
});

function enviarNotificacion(){
  self.registration.showNotification("🔥 Reto Lagartijas 💪",{
    body:`Hoy te tocan ${reps} lagartijas. ¡Vamos!`,
    tag:"lagartijas-diario",
    renotify:true
  });
}

// Chequear la hora cada minuto
setInterval(()=>{
  const ahora = new Date();
  const horaActual = ahora.toTimeString().slice(0,5);
  if(horarios.includes(horaActual)){
    enviarNotificacion();
  }
},60000);